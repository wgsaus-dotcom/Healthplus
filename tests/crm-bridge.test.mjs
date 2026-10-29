import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFile} from 'node:fs/promises';
const require=createRequire(import.meta.url),runtime=createRequire(require.resolve('wrangler')),{Miniflare}=runtime('miniflare');
const bridge=await readFile(new URL('../lib/crm-bridge.mjs',import.meta.url),'utf8');
let outage=false,resumeOutage=true,calls=[],health=[],resumeCalls=[];
const mf=new Miniflare({modules:true,script:bridge+`
export default {async fetch(request,env){const {operation,...data}=await request.json();
 if(operation==='candidate'){await saveCandidateWithOutbox(env,data);return Response.json({ok:true});}
 if(operation==='stage')return Response.json({id:await stageEmployer(env,data)});
 if(operation==='confirm'){await confirmEmployer(env,data.id,data.reference,data.form);return Response.json({ok:true});}
 return Response.json(await drainBridge(env));}}
`,compatibilityDate:'2026-05-15',d1Databases:['DB'],r2Buckets:['BUCKET'],serviceBindings:{CRM:async request=>{
 if(new URL(request.url).pathname==='/api/intake/resume'){resumeCalls.push({headers:Object.fromEntries(request.headers),body:await request.text()});return resumeOutage?new Response('Unavailable',{status:503}):Response.json({ok:true});}
 if(new URL(request.url).pathname==='/connection'){health.push(await request.json());return Response.json({ok:true});}
 const payload=await request.json();calls.push(payload);return outage?new Response('Unavailable',{status:503}):Response.json({ok:true,id:'web-'+payload.externalId});
}}});
const candidate={reference:'HPI-UNIT',fullName:'Synthetic Candidate',email:'synthetic@example.test',phone:'0400000000',profession:'Registered Nurse',ahpraStatus:'Not verified',preferredRegion:'NSW',message:'Synthetic',resumeKey:'private/test.pdf',resumeName:'test.pdf',resumeType:'application/pdf',resumeSize:100};
const call=async(operation,data={})=>{const r=await mf.dispatchFetch('https://website.test',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({operation,...data})});return r;};
try{
 const bucket=await mf.getR2Bucket('BUCKET');await bucket.put('private/test.pdf','%PDF synthetic resume');
 const db=await mf.getD1Database('DB');for(const sql of (await readFile(new URL('../drizzle/0000_strange_madame_masque.sql',import.meta.url),'utf8')).split('--> statement-breakpoint').filter(x=>x.trim()))await db.prepare(sql).run();
 await test('candidate and queued CRM event commit atomically; duplicate application rolls back',async()=>{
  assert.equal((await call('candidate',candidate)).status,200);
  assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM worker_applications').first()).n,1);
  assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM hpi_crm_outbox').first()).n,1);
  assert.equal((await call('candidate',candidate)).status,500);
  assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM hpi_crm_outbox').first()).n,1);
 });
 await test('downstream outage retains queued record and retries original reference',async()=>{
  outage=true;const failed=await(await call('drain')).json();assert.equal(failed.delivered,0);assert.equal(failed.pending,1);
  const row=await db.prepare('SELECT * FROM hpi_crm_outbox').first();assert.equal(row.state,'ready');assert.equal(row.attempts,1);
  outage=false;await db.prepare('UPDATE hpi_crm_outbox SET retry_at=NULL').run();
  const success=await(await call('drain')).json();assert.equal(success.delivered,1);assert.equal(success.pending,0);assert.equal(calls[0].externalId,calls[1].externalId);
  assert.equal(calls[1].profession,candidate.profession);assert.ok(!('resumeKey' in calls[1]));
  assert.equal((await(await call('drain')).json()).attempted,0);
 });
 await test('employer is delivered only after legacy confirmation and preserves reference',async()=>{
  const form={organisation:'Synthetic Employer',contact_name:'Test',email:'synthetic@example.test',location:'NSW',role_types:'RN',urgency:'Planning',workers_required:1,privacy_consent:true};
  const {id}=await(await call('stage',form)).json();const staged=await(await call('drain')).json();assert.equal(staged.review,1);assert.equal(staged.delivered,0);
  await call('confirm',{id,reference:'HPI-LEGACY-REF',form});const result=await(await call('drain')).json();assert.equal(result.delivered,1);assert.equal(result.review,0);assert.equal(calls.at(-1).externalId,'HPI-LEGACY-REF');assert.equal(calls.at(-1).kind,'opportunity');assert.equal(health.at(-1).pending,1);
 });
 await test('private resume delivery retries without duplicate candidates and leaves original storage intact',async()=>{
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM hpi_crm_resume_delivery WHERE delivered_at IS NOT NULL').first()).n,0);
  resumeOutage=false;await db.prepare('UPDATE hpi_crm_resume_delivery SET retry_at=NULL').run();const result=await(await call('drain')).json();assert.equal(result.resumes.delivered,1);assert.equal(result.resumes.pending,0);assert.equal(health.at(-1).pending,0);
  assert.equal(resumeCalls.at(-1).body,'%PDF synthetic resume');assert.equal(resumeCalls.at(-1).headers['x-record-id'],'web-HPI-UNIT');assert.equal(resumeCalls.at(-1).headers['content-type'],'application/pdf');
  const before=resumeCalls.length;await call('drain');assert.equal(resumeCalls.length,before);assert.ok(await bucket.get('private/test.pdf'));assert.equal((await db.prepare('SELECT COUNT(*) n FROM worker_applications').first()).n,1);
 });
}finally{await mf.dispose();}
