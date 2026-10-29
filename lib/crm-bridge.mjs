// Server-only. CRM is a named Cloudflare service binding, never a public URL.
const schema = `CREATE TABLE IF NOT EXISTS hpi_crm_outbox (
 id TEXT PRIMARY KEY, payload TEXT NOT NULL, state TEXT NOT NULL,
 created_at TEXT NOT NULL, delivered_at TEXT, retry_at TEXT,
 attempts INTEGER NOT NULL DEFAULT 0, last_status TEXT NOT NULL DEFAULT 'pending'
)`;
const initialized = new WeakMap();
export function bridgeEnabled(env) { return Boolean(env?.CRM && env?.DB); }
export async function initializeBridge(db) {
 if (!initialized.has(db)) initialized.set(db, db.prepare(schema).run().catch(error => { initialized.delete(db); throw error; }));
 await initialized.get(db);
}
export function employerPayload(reference, form) {
 return {kind:'opportunity', externalId:reference, name:`Workforce request · ${form.organisation}`,
 organisation:form.organisation, email:form.email, phone:form.phone||'', region:form.location, profession:form.role_types,
 notes:[`Website reference: ${reference}`,`Contact: ${form.contact_name}`,`Workers requested: ${form.workers_required}`,`Urgency: ${form.urgency}`,form.message||''].join('\n')};
}
export function candidatePayload(reference, a) {
 return {kind:'candidate', externalId:reference, name:a.fullName, email:a.email, phone:a.phone, region:a.preferredRegion, profession:a.profession,
 notes:[`Website reference: ${reference}`,`Registration status supplied: ${a.ahpraStatus}`,a.message||'',a.resumeKey?'Résumé uploaded on website; private recruitment transfer queued.':''].filter(Boolean).join('\n')};
}
export function enqueueStatement(db, id, payload, state='ready') {
 return db.prepare('INSERT INTO hpi_crm_outbox (id,payload,state,created_at) VALUES (?,?,?,?) ON CONFLICT(id) DO NOTHING')
 .bind(id,JSON.stringify(payload),state,new Date().toISOString());
}
export async function stageEmployer(env, form) {
 if(!bridgeEnabled(env))return null;
 await initializeBridge(env.DB);
 const id=`employer:${crypto.randomUUID()}`;
 await enqueueStatement(env.DB,id,employerPayload(id,form),'staged').run();
 return id;
}
export async function confirmEmployer(env,id,reference,form) {
 if(!id)return;
 await env.DB.prepare("UPDATE hpi_crm_outbox SET payload=?,state='ready' WHERE id=? AND state='staged'")
 .bind(JSON.stringify(employerPayload(reference,form)),id).run();
}
export async function saveCandidateWithOutbox(env,a) {
 await initializeBridge(env.DB);
 const insert=env.DB.prepare(`INSERT INTO worker_applications
 (reference,full_name,email,phone,profession,ahpra_status,preferred_region,message,resume_key,resume_name,resume_type,resume_size)
 VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`).bind(a.reference,a.fullName,a.email,a.phone,a.profession,a.ahpraStatus,a.preferredRegion,a.message,a.resumeKey,a.resumeName,a.resumeType,a.resumeSize);
 await env.DB.batch([insert,enqueueStatement(env.DB,`candidate:${a.reference}`,candidatePayload(a.reference,a))]);
}
export async function drainBridge(env) {
 if(!bridgeEnabled(env))return {enabled:false};
 await initializeBridge(env.DB);
 const {results}=await env.DB.prepare("SELECT id,payload FROM hpi_crm_outbox WHERE state='ready' AND (retry_at IS NULL OR retry_at<=?) ORDER BY created_at LIMIT 10").bind(new Date().toISOString()).all();
 let delivered=0;
 for(const row of results){
  try{
   const response=await env.CRM.fetch(new Request('https://crm.internal/api/intake',{method:'POST',headers:{'Content-Type':'application/json'},body:row.payload,signal:AbortSignal.timeout(15000)}));
   if(!response.ok)throw new Error('CRM delivery failed');
   const result=await response.json();if(result.ok!==true||typeof result.id!=='string')throw new Error('CRM delivery unconfirmed');
   await env.DB.prepare("UPDATE hpi_crm_outbox SET state='delivered',delivered_at=?,attempts=attempts+1,last_status='delivered' WHERE id=?").bind(new Date().toISOString(),row.id).run();delivered++;
  }catch{
   await env.DB.prepare("UPDATE hpi_crm_outbox SET attempts=attempts+1,retry_at=?,last_status='retry pending' WHERE id=?").bind(new Date(Date.now()+300000).toISOString(),row.id).run();
  }
 }
 const resumes=await drainResumes(env);
 const {pending,review}=await env.DB.prepare("SELECT SUM(CASE WHEN state='ready' THEN 1 ELSE 0 END) AS pending,SUM(CASE WHEN state='staged' THEN 1 ELSE 0 END) AS review FROM hpi_crm_outbox").first();
 const status=await env.CRM.fetch(new Request('https://crm.internal/connection',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pending:(pending||0)+resumes.pending,review:review||0}),signal:AbortSignal.timeout(15000)}));
 if(!status.ok)throw new Error('CRM connection check failed');
 return {enabled:true,attempted:results.length,delivered,pending:pending||0,review:review||0,resumes};
}
export async function drainSafely(env) {
 try{return await drainBridge(env);}catch{console.error('HPI CRM bridge retry pending');return {enabled:bridgeEnabled(env),retryPending:true};}
}

// Only applications already handed to this CRM are eligible; legacy-only records are untouched.
export async function drainResumes(env){
 if(!env.BUCKET)return {pending:0,delivered:0};
 await env.DB.prepare("CREATE TABLE IF NOT EXISTS hpi_crm_resume_delivery (reference TEXT PRIMARY KEY, delivered_at TEXT, retry_at TEXT)").run();
 const source="FROM worker_applications a JOIN hpi_crm_outbox o ON o.id='candidate:'||a.reference LEFT JOIN hpi_crm_resume_delivery d ON d.reference=a.reference WHERE o.state='delivered' AND a.resume_key<>'' AND d.delivered_at IS NULL";
 const {results}=await env.DB.prepare('SELECT a.reference,a.resume_key,a.resume_name,a.resume_type,o.payload '+source+' AND (d.retry_at IS NULL OR d.retry_at<=?) ORDER BY o.created_at LIMIT 5').bind(new Date().toISOString()).all();let delivered=0;
 for(const row of results){try{
  const record=await env.CRM.fetch(new Request('https://crm.internal/api/intake',{method:'POST',headers:{'Content-Type':'application/json'},body:row.payload,signal:AbortSignal.timeout(15000)}));if(!record.ok)throw new Error('Candidate unavailable');const result=await record.json();if(!result.ok||!result.id)throw new Error('Unconfirmed candidate');
  const object=await env.BUCKET.get(row.resume_key);if(!object)throw new Error('Resume unavailable');
  const response=await env.CRM.fetch(new Request('https://crm.internal/api/intake/resume',{method:'POST',headers:{'Content-Type':row.resume_type,'x-record-id':result.id,'x-file-name':encodeURIComponent(row.resume_name)},body:object.body,signal:AbortSignal.timeout(30000)}));
  if(!response.ok||(await response.json()).ok!==true)throw new Error('Resume delivery unconfirmed');
  await env.DB.prepare('INSERT INTO hpi_crm_resume_delivery (reference,delivered_at) VALUES (?,?) ON CONFLICT(reference) DO UPDATE SET delivered_at=excluded.delivered_at,retry_at=NULL').bind(row.reference,new Date().toISOString()).run();delivered++;
 }catch{
  await env.DB.prepare('INSERT INTO hpi_crm_resume_delivery (reference,retry_at) VALUES (?,?) ON CONFLICT(reference) DO UPDATE SET retry_at=excluded.retry_at').bind(row.reference,new Date(Date.now()+300000).toISOString()).run();
 }}
 const count=await env.DB.prepare('SELECT COUNT(*) n '+source).first();return {delivered,pending:count.n};
}
