const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS }
  });
}

function err(msg, status = 400) {
  return json({ ok: false, error: msg }, status);
}

async function sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function randomToken() {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function requireAuth(request, env) {
  const auth = request.headers.get("Authorization") || "";
  const token = auth.replace("Bearer ", "").trim();
  if (!token) return null;
  const now = new Date().toISOString();
  const row = await env.DB.prepare(
    "SELECT s.id, s.name, s.email FROM sessions ss JOIN staff s ON ss.staff_id=s.id WHERE ss.token=? AND ss.expires_at>?"
  ).bind(token, now).first();
  return row || null;
}

// Send plain email (no attachment)
async function sendEmail(env, { to, subject, html }) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: `HealthPlus International <${env.FROM_EMAIL}>`,
        to: [to],
        subject,
        html
      })
    });
    if (!res.ok) {
      const t = await res.text();
      console.error("Resend error:", t);
    }
    return res.ok;
  } catch (e) {
    console.error("Resend error:", e);
    return false;
  }
}

// Send email with attachment (resume/CV)
async function sendEmailWithAttachment(env, { to, subject, html, attachment }) {
  try {
    const payload = {
      from: `HealthPlus International <${env.FROM_EMAIL}>`,
      to: [to],
      subject,
      html
    };
    if (attachment) {
      payload.attachments = [{
        filename: attachment.filename,
        content: attachment.base64,  // base64 string
        type: attachment.type
      }];
    }
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const t = await res.text();
      console.error("Resend attachment error:", t);
    }
    return res.ok;
  } catch (e) {
    console.error("Resend attachment error:", e);
    return false;
  }
}

// Convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function workerConfirmEmail(name, role) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#07101C;color:#fff;border-radius:8px;overflow:hidden">
    <div style="background:#0D1F33;padding:24px 32px;border-bottom:3px solid #0ECECE">
      <h1 style="margin:0;color:#0ECECE;font-size:22px;letter-spacing:1px">HealthPlus International</h1>
      <p style="margin:4px 0 0;color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:3px">PEOPLE · CARE · COMPLIANCE</p>
    </div>
    <div style="padding:32px">
      <h2 style="color:#fff;margin-top:0">Application Received</h2>
      <p style="color:rgba(255,255,255,0.8)">Hi ${name},</p>
      <p style="color:rgba(255,255,255,0.8)">Thank you for registering with HealthPlus International as a <strong style="color:#0ECECE">${role}</strong>.</p>
      <p style="color:rgba(255,255,255,0.8)">Our team will review your application and be in touch within <strong>24 hours</strong>. We strategically place credentialled healthcare workers across regional and remote NSW — and we look forward to finding the right placement for you.</p>
      <div style="background:#0B1829;border-left:3px solid #0ECECE;padding:16px 20px;margin:24px 0;border-radius:4px">
        <p style="margin:0;color:rgba(255,255,255,0.6);font-size:13px">Questions? Contact us at <a href="mailto:connect@healthplusint.com.au" style="color:#0ECECE">connect@healthplusint.com.au</a></p>
      </div>
      <p style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:32px">People. Care. Compliance.<br>HealthPlus International · healthplusint.com.au</p>
    </div>
  </div>`;
}

function facilityConfirmEmail(name, facility) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#07101C;color:#fff;border-radius:8px;overflow:hidden">
    <div style="background:#0D1F33;padding:24px 32px;border-bottom:3px solid #0ECECE">
      <h1 style="margin:0;color:#0ECECE;font-size:22px;letter-spacing:1px">HealthPlus International</h1>
      <p style="margin:4px 0 0;color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:3px">PEOPLE · CARE · COMPLIANCE</p>
    </div>
    <div style="padding:32px">
      <h2 style="color:#fff;margin-top:0">Workforce Request Received</h2>
      <p style="color:rgba(255,255,255,0.8)">Hi ${name},</p>
      <p style="color:rgba(255,255,255,0.8)">Thank you for submitting a workforce request on behalf of <strong style="color:#0ECECE">${facility}</strong>.</p>
      <p style="color:rgba(255,255,255,0.8)">A member of our team will respond within <strong>24 hours</strong> with suitable candidates. As your Employer of Record, we handle all employment obligations — one all-inclusive invoice, fully credentialled staff, zero admin burden.</p>
      <div style="background:#0B1829;border-left:3px solid #0ECECE;padding:16px 20px;margin:24px 0;border-radius:4px">
        <p style="margin:0;color:rgba(255,255,255,0.6);font-size:13px">Urgent? Call us directly on <a href="tel:+61411459755" style="color:#0ECECE">+61 411 459 755</a></p>
      </div>
      <p style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:32px">People. Care. Compliance.<br>HealthPlus International · healthplusint.com.au</p>
    </div>
  </div>`;
}

function internalNotifyEmail(type, data) {
  const rows = Object.entries(data)
    .filter(([k]) => !["type", "resume_filename"].includes(k))
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#9FE1CB;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:35%">${k.replace(/_/g, " ")}</td><td style="padding:6px 12px;color:#fff;font-size:13px">${v || "—"}</td></tr>`)
    .join("");
  const resumeNote = data.resume_filename
    ? `<p style="color:#F5A623;font-size:13px;margin-top:16px">📎 Resume attached: <strong>${data.resume_filename}</strong></p>`
    : `<p style="color:rgba(255,255,255,0.4);font-size:13px;margin-top:16px">No resume uploaded.</p>`;
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#07101C;color:#fff;border-radius:8px;overflow:hidden">
    <div style="background:#0D1F33;padding:20px 32px;border-bottom:3px solid #F5A623">
      <h2 style="margin:0;color:#F5A623;font-size:16px">New ${type === "worker" ? "Worker Application" : "Facility Request"}</h2>
      <p style="margin:4px 0 0;color:rgba(255,255,255,0.5);font-size:11px">${new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</p>
    </div>
    <div style="padding:24px 32px">
      <table style="width:100%;border-collapse:collapse">${rows}</table>
      ${resumeNote}
      <div style="margin-top:24px">
        <a href="https://healthplusint.com.au/portal.html" style="background:#0ECECE;color:#000;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:700;font-size:13px">View in Portal →</a>
      </div>
    </div>
  </div>`;
}

// ════════════════════════════════════════════════════════════════════════════
// HPI CRM MODULE — pipeline, workflows, tasks, placements (added June 2026)
// ════════════════════════════════════════════════════════════════════════════

let _schemaReady = false;
async function ensureSchema(env) {
  if (_schemaReady) return;
  const stmts = [
    `CREATE TABLE IF NOT EXISTS crm_facilities (
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, lhd TEXT, town TEXT,
      contact_name TEXT, email TEXT, phone TEXT, notes TEXT,
      created_at TEXT DEFAULT (datetime('now')))`,
    `CREATE TABLE IF NOT EXISTS crm_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT, application_id INTEGER, facility_id INTEGER,
      role TEXT, workers_needed TEXT, start_date TEXT,
      status TEXT DEFAULT 'new', owner TEXT, due_at TEXT, notes TEXT,
      created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')))`,
    `CREATE TABLE IF NOT EXISTS crm_credentials (
      id INTEGER PRIMARY KEY AUTOINCREMENT, application_id INTEGER NOT NULL,
      cred_type TEXT NOT NULL, status TEXT DEFAULT 'pending',
      expiry_date TEXT, alerted_30d INTEGER DEFAULT 0, notes TEXT,
      updated_at TEXT DEFAULT (datetime('now')))`,
    `CREATE TABLE IF NOT EXISTS crm_placements (
      id INTEGER PRIMARY KEY AUTOINCREMENT, request_id INTEGER, application_id INTEGER,
      facility_id INTEGER, role TEXT, start_date TEXT, end_date TEXT,
      status TEXT DEFAULT 'active', notes TEXT,
      created_at TEXT DEFAULT (datetime('now')))`,
    `CREATE TABLE IF NOT EXISTS crm_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT, ref_table TEXT, ref_id INTEGER,
      title TEXT NOT NULL, due_at TEXT, status TEXT DEFAULT 'open',
      created_at TEXT DEFAULT (datetime('now')), completed_at TEXT)`,
    `CREATE TABLE IF NOT EXISTS crm_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT, actor TEXT, action TEXT, ref TEXT,
      detail TEXT, ts TEXT DEFAULT (datetime('now')))`,
  ];
  for (const s of stmts) await env.DB.prepare(s).run();
  _schemaReady = true;
}

async function crmLog(env, actor, action, ref, detail) {
  try {
    await env.DB.prepare('INSERT INTO crm_log (actor,action,ref,detail) VALUES (?,?,?,?)')
      .bind(actor, action, ref, (detail || '').slice(0, 500)).run();
  } catch (e) {}
}

// AHPRA-registered roles (others get NRT-qualification track)
const AHPRA_ROLES = /nurse|physio|occupational|psycholog|podiatr|paramedic|dental|aboriginal health/i;

// ── WORKFLOW: facility request received ──────────────────────────────────────
async function wfFacilityRequest(env, applicationId, body) {
  try {
    // 1. Find-or-create facility
    let fac = await env.DB.prepare('SELECT id FROM crm_facilities WHERE lower(name)=lower(?)')
      .bind(body.facility_name).first();
    let facilityId;
    if (fac) { facilityId = fac.id; }
    else {
      const r = await env.DB.prepare(
        'INSERT INTO crm_facilities (name,lhd,contact_name,email,phone) VALUES (?,?,?,?,?)')
        .bind(body.facility_name, body.lhd || '', `${body.first_name} ${body.last_name}`.trim(),
              body.email, body.phone || '').run();
      facilityId = r.meta.last_row_id;
    }
    // 2. Create pipeline request, due in 24h (the brand promise)
    const due = new Date(Date.now() + 24 * 3600 * 1000).toISOString().replace('T', ' ').slice(0, 19);
    const req = await env.DB.prepare(
      `INSERT INTO crm_requests (application_id,facility_id,role,workers_needed,start_date,status,due_at,notes)
       VALUES (?,?,?,?,?,'new',?,?)`)
      .bind(applicationId, facilityId, body.role || '', body.workers_needed || '',
            body.start_date || '', due, body.message || '').run();
    // 3. 24-hour response task
    await env.DB.prepare(
      `INSERT INTO crm_tasks (kind,ref_table,ref_id,title,due_at) VALUES ('respond_24h','crm_requests',?,?,?)`)
      .bind(req.meta.last_row_id, `Respond to ${body.facility_name} — ${body.role || 'workforce'} request`, due).run();
    await crmLog(env, 'workflow', 'request_created', `crm_requests:${req.meta.last_row_id}`,
      `Facility ${body.facility_name} (${body.lhd || 'LHD n/a'}); 24h task set`);
  } catch (e) { console.error('wfFacilityRequest:', e); }
}

// ── WORKFLOW: worker application received ────────────────────────────────────
async function wfWorkerApply(env, applicationId, fields) {
  try {
    const creds = ['National Police Clearance', 'OASV', 'VEVO / Work Rights'];
    if (AHPRA_ROLES.test(fields.role || '')) creds.unshift('AHPRA Registration');
    else creds.unshift('Qualification (NRT)');
    for (const c of creds) {
      await env.DB.prepare(
        'INSERT INTO crm_credentials (application_id,cred_type) VALUES (?,?)')
        .bind(applicationId, c).run();
    }
    await crmLog(env, 'workflow', 'credentials_seeded', `applications:${applicationId}`,
      `${creds.length} credential checks created for ${fields.first_name || ''} (${fields.role || ''})`);
  } catch (e) { console.error('wfWorkerApply:', e); }
}

// ── WORKFLOW: scheduled checks (hourly cron) ─────────────────────────────────
async function wfScheduled(env) {
  await ensureSchema(env);
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const alerts = [];

  // 1. Overdue 24h-response tasks → escalate once
  const overdue = await env.DB.prepare(
    `SELECT t.id, t.title, t.due_at FROM crm_tasks t
     WHERE t.status='open' AND t.due_at < ?`).bind(now).all();
  for (const t of overdue.results) {
    await env.DB.prepare(`UPDATE crm_tasks SET status='escalated' WHERE id=?`).bind(t.id).run();
    alerts.push(`⏰ OVERDUE: ${t.title} (was due ${t.due_at})`);
    await crmLog(env, 'cron', 'task_escalated', `crm_tasks:${t.id}`, t.title);
  }

  // 2. Credentials expiring within 30 days (alert once)
  const expiring = await env.DB.prepare(
    `SELECT c.id, c.cred_type, c.expiry_date, a.first_name, a.last_name
     FROM crm_credentials c JOIN applications a ON a.id=c.application_id
     WHERE c.expiry_date IS NOT NULL AND c.expiry_date != ''
       AND c.alerted_30d=0 AND date(c.expiry_date) <= date('now','+30 days')`).all();
  for (const c of expiring.results) {
    await env.DB.prepare('UPDATE crm_credentials SET alerted_30d=1 WHERE id=?').bind(c.id).run();
    alerts.push(`🪪 EXPIRING: ${c.first_name} ${c.last_name} — ${c.cred_type} expires ${c.expiry_date}`);
    await crmLog(env, 'cron', 'credential_expiry_alert', `crm_credentials:${c.id}`, `${c.cred_type} ${c.expiry_date}`);
  }

  // 3. Stale pipeline: requests untouched 3+ days in new/contacted
  const stale = await env.DB.prepare(
    `SELECT r.id, f.name as facility, r.role, r.status, r.updated_at
     FROM crm_requests r LEFT JOIN crm_facilities f ON f.id=r.facility_id
     WHERE r.status IN ('new','contacted') AND r.updated_at < datetime('now','-3 days')`).all();
  for (const r of stale.results) {
    alerts.push(`🐌 STALE: Request #${r.id} ${r.facility || ''} (${r.role || ''}) — ${r.status} since ${r.updated_at}`);
  }

  if (alerts.length) {
    await sendEmail(env, {
      to: env.FROM_EMAIL,
      subject: `HPI CRM Alerts — ${alerts.length} item${alerts.length > 1 ? 's' : ''} need attention`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#07101C;color:#fff;border-radius:8px;overflow:hidden">
        <div style="background:#0D1F33;padding:20px 32px;border-bottom:3px solid #F5A623">
          <h2 style="margin:0;color:#F5A623;font-size:16px">CRM Workflow Alerts</h2></div>
        <div style="padding:24px 32px">
          ${alerts.map(a => `<p style="color:rgba(255,255,255,.85);font-size:13px;margin:8px 0;padding:10px 14px;background:#0B1829;border-left:3px solid #0ECECE;border-radius:4px">${a}</p>`).join('')}
          <div style="margin-top:20px"><a href="https://hpi-onboarding.wgs-aus.workers.dev/crm" style="background:#0ECECE;color:#000;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:700;font-size:13px">Open CRM →</a></div>
        </div></div>`,
    });
  }
  return alerts.length;
}

// ── CRM API router (returns Response or null to fall through) ───────────────
async function handleCrm(request, env, url, path, method) {
  // Dashboard page (auth happens client-side via token; API enforces server-side)
  if (path === '/crm' && method === 'GET') {
    return new Response(CRM_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
  // Unauthenticated health: table counts only (no data)
  if (path === '/api/crm/health' && method === 'GET') {
    const c = async (t) => { try { return (await env.DB.prepare('SELECT COUNT(*) c FROM ' + t).first()).c; } catch { return -1; } };
    return json({ ok: true,
      facilities: await c('crm_facilities'), requests: await c('crm_requests'),
      credentials: await c('crm_credentials'), placements: await c('crm_placements'),
      tasks: await c('crm_tasks'), log: await c('crm_log') });
  }
  if (!path.startsWith('/api/crm/')) return null;

  const staff = await requireAuth(request, env);
  if (!staff) return err('Unauthorised', 401);
  const actor = staff.email;

  // GET /api/crm/summary
  if (path === '/api/crm/summary' && method === 'GET') {
    const q = async (sql) => (await env.DB.prepare(sql).first());
    const pipeline = await env.DB.prepare(
      `SELECT status, COUNT(*) c FROM crm_requests GROUP BY status`).all();
    return json({ ok: true,
      candidates: (await q(`SELECT COUNT(*) c FROM applications WHERE type='worker'`)).c,
      facilities: (await q(`SELECT COUNT(*) c FROM crm_facilities`)).c,
      open_requests: (await q(`SELECT COUNT(*) c FROM crm_requests WHERE status NOT IN ('placed','closed')`)).c,
      placements: (await q(`SELECT COUNT(*) c FROM crm_placements`)).c,
      open_tasks: (await q(`SELECT COUNT(*) c FROM crm_tasks WHERE status IN ('open','escalated')`)).c,
      escalated_tasks: (await q(`SELECT COUNT(*) c FROM crm_tasks WHERE status='escalated'`)).c,
      pipeline: pipeline.results,
    });
  }

  // GET /api/crm/requests
  if (path === '/api/crm/requests' && method === 'GET') {
    const rows = await env.DB.prepare(
      `SELECT r.*, f.name as facility_name, f.lhd as facility_lhd, f.email as facility_email, f.phone as facility_phone
       FROM crm_requests r LEFT JOIN crm_facilities f ON f.id=r.facility_id
       ORDER BY CASE r.status WHEN 'new' THEN 0 WHEN 'contacted' THEN 1 WHEN 'matching' THEN 2 ELSE 3 END, r.due_at`).all();
    return json({ ok: true, requests: rows.results });
  }

  // PATCH /api/crm/requests/:id  {status?, notes?, owner?}
  const reqMatch = path.match(/^\/api\/crm\/requests\/(\d+)$/);
  if (reqMatch && method === 'PATCH') {
    let body; try { body = await request.json(); } catch { return err('Invalid JSON'); }
    const allowed = ['status', 'notes', 'owner'];
    const updates = Object.entries(body).filter(([k]) => allowed.includes(k));
    if (!updates.length) return err('Nothing to update');
    const set = updates.map(([k]) => `${k}=?`).join(', ');
    await env.DB.prepare(`UPDATE crm_requests SET ${set}, updated_at=datetime('now') WHERE id=?`)
      .bind(...updates.map(([, v]) => v), reqMatch[1]).run();
    // Workflow: status moved off 'new' → close the 24h task
    if (body.status && body.status !== 'new') {
      await env.DB.prepare(
        `UPDATE crm_tasks SET status='done', completed_at=datetime('now')
         WHERE ref_table='crm_requests' AND ref_id=? AND kind='respond_24h' AND status IN ('open','escalated')`)
        .bind(reqMatch[1]).run();
    }
    await crmLog(env, actor, 'request_update', `crm_requests:${reqMatch[1]}`, JSON.stringify(body));
    return json({ ok: true });
  }

  // GET /api/crm/candidates  (workers + credential summary)
  if (path === '/api/crm/candidates' && method === 'GET') {
    const rows = await env.DB.prepare(
      `SELECT a.id, a.first_name, a.last_name, a.email, a.phone, a.role, a.lhd, a.status, a.created_at
       FROM applications a WHERE a.type='worker' ORDER BY a.created_at DESC LIMIT 200`).all();
    const creds = await env.DB.prepare(
      `SELECT id, application_id, cred_type, status, expiry_date FROM crm_credentials`).all();
    return json({ ok: true, candidates: rows.results, credentials: creds.results });
  }

  // PATCH /api/crm/credentials/:id  {status?, expiry_date?, notes?}
  const credMatch = path.match(/^\/api\/crm\/credentials\/(\d+)$/);
  if (credMatch && method === 'PATCH') {
    let body; try { body = await request.json(); } catch { return err('Invalid JSON'); }
    const allowed = ['status', 'expiry_date', 'notes'];
    const updates = Object.entries(body).filter(([k]) => allowed.includes(k));
    if (!updates.length) return err('Nothing to update');
    const set = updates.map(([k]) => `${k}=?`).join(', ');
    await env.DB.prepare(`UPDATE crm_credentials SET ${set}, updated_at=datetime('now') WHERE id=?`)
      .bind(...updates.map(([, v]) => v), credMatch[1]).run();
    await crmLog(env, actor, 'credential_update', `crm_credentials:${credMatch[1]}`, JSON.stringify(body));
    return json({ ok: true });
  }

  // GET /api/crm/facilities
  if (path === '/api/crm/facilities' && method === 'GET') {
    const rows = await env.DB.prepare(`SELECT * FROM crm_facilities ORDER BY created_at DESC`).all();
    return json({ ok: true, facilities: rows.results });
  }

  // POST /api/crm/placements  {request_id, application_id, role, start_date, end_date?, notes?}
  if (path === '/api/crm/placements' && method === 'POST') {
    let body; try { body = await request.json(); } catch { return err('Invalid JSON'); }
    if (!body.request_id || !body.application_id) return err('request_id and application_id required');
    const reqRow = await env.DB.prepare('SELECT facility_id, role FROM crm_requests WHERE id=?')
      .bind(body.request_id).first();
    if (!reqRow) return err('Request not found', 404);
    const r = await env.DB.prepare(
      `INSERT INTO crm_placements (request_id,application_id,facility_id,role,start_date,end_date,notes)
       VALUES (?,?,?,?,?,?,?)`)
      .bind(body.request_id, body.application_id, reqRow.facility_id,
            body.role || reqRow.role || '', body.start_date || '', body.end_date || '', body.notes || '').run();
    // Workflow: mark request placed, close tasks
    await env.DB.prepare(`UPDATE crm_requests SET status='placed', updated_at=datetime('now') WHERE id=?`)
      .bind(body.request_id).run();
    await env.DB.prepare(
      `UPDATE crm_tasks SET status='done', completed_at=datetime('now')
       WHERE ref_table='crm_requests' AND ref_id=? AND status IN ('open','escalated')`)
      .bind(body.request_id).run();
    const count = await env.DB.prepare('SELECT COUNT(*) c FROM crm_placements').first();
    await crmLog(env, actor, 'placement_created', `crm_placements:${r.meta.last_row_id}`,
      `Placement #${count.c} (PSA milestone counter)`);
    return json({ ok: true, id: r.meta.last_row_id, total_placements: count.c });
  }

  // GET /api/crm/placements
  if (path === '/api/crm/placements' && method === 'GET') {
    const rows = await env.DB.prepare(
      `SELECT p.*, f.name as facility_name, a.first_name, a.last_name
       FROM crm_placements p
       LEFT JOIN crm_facilities f ON f.id=p.facility_id
       LEFT JOIN applications a ON a.id=p.application_id
       ORDER BY p.created_at DESC`).all();
    return json({ ok: true, placements: rows.results });
  }

  // GET /api/crm/tasks
  if (path === '/api/crm/tasks' && method === 'GET') {
    const rows = await env.DB.prepare(
      `SELECT * FROM crm_tasks WHERE status IN ('open','escalated') ORDER BY due_at`).all();
    return json({ ok: true, tasks: rows.results });
  }

  // PATCH /api/crm/tasks/:id {status}
  const taskMatch = path.match(/^\/api\/crm\/tasks\/(\d+)$/);
  if (taskMatch && method === 'PATCH') {
    let body; try { body = await request.json(); } catch { return err('Invalid JSON'); }
    if (body.status === 'done') {
      await env.DB.prepare(
        `UPDATE crm_tasks SET status='done', completed_at=datetime('now') WHERE id=?`).bind(taskMatch[1]).run();
    } else if (body.status) {
      await env.DB.prepare(`UPDATE crm_tasks SET status=? WHERE id=?`).bind(body.status, taskMatch[1]).run();
    }
    await crmLog(env, actor, 'task_update', `crm_tasks:${taskMatch[1]}`, JSON.stringify(body));
    return json({ ok: true });
  }

  // GET /api/crm/log
  if (path === '/api/crm/log' && method === 'GET') {
    const rows = await env.DB.prepare(`SELECT * FROM crm_log ORDER BY ts DESC LIMIT 100`).all();
    return json({ ok: true, log: rows.results });
  }

  return err('CRM route not found', 404);
}

const CRM_HTML = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>HPI CRM</title>
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{background:#07101C;color:#fff;font-family:'Barlow',sans-serif;font-size:14px}
h1,h2,h3{font-family:'Big Shoulders Display',sans-serif;text-transform:uppercase;letter-spacing:.04em}
.wrap{max-width:1280px;margin:0 auto;padding:20px}
header{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:20px}
header h1{font-size:24px;color:#0ECECE}header .tag{font-size:8px;letter-spacing:.22em;color:rgba(255,255,255,.45);text-transform:uppercase}
.tabs{display:flex;gap:4px;margin-bottom:20px;flex-wrap:wrap}
.tab{background:#0E1F36;border:none;color:rgba(255,255,255,.6);padding:10px 18px;font-family:'Barlow';font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;border-radius:4px}
.tab.active{background:#0B6B6E;color:#fff}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:24px}
.kpi{background:#0E1F36;padding:18px;border-radius:6px;border-left:3px solid #0ECECE}
.kpi .n{font-family:'Big Shoulders Display';font-size:36px;font-weight:900;color:#0ECECE;line-height:1}
.kpi.warn{border-color:#F5A623}.kpi.warn .n{color:#F5A623}.kpi.bad{border-color:#FF5555}.kpi.bad .n{color:#FF5555}
.kpi .l{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-top:6px}
.card{background:#0E1F36;border-radius:6px;padding:16px;margin-bottom:12px}
.card .meta{color:rgba(255,255,255,.55);font-size:12px;margin:4px 0}
.row{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap}
.badge{display:inline-block;padding:3px 10px;border-radius:99px;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.b-new{background:#FF5555;color:#fff}.b-contacted{background:#F5A623;color:#000}.b-matching{background:#0ECECE;color:#000}
.b-placed{background:#66BB6A;color:#000}.b-closed{background:#444;color:#ccc}
.b-pending{background:#444;color:#ddd}.b-received{background:#F5A623;color:#000}.b-verified{background:#66BB6A;color:#000}
.b-open{background:#0ECECE;color:#000}.b-escalated{background:#FF5555;color:#fff}
.btns{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.btn{background:#0B6B6E;border:none;color:#fff;padding:6px 12px;font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;border-radius:3px}
.btn:hover{background:#0ECECE;color:#000}.btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.25)}
.chip{display:inline-flex;align-items:center;gap:6px;background:#0B1829;padding:5px 10px;border-radius:4px;font-size:11px;margin:3px 4px 0 0;cursor:pointer;border:1px solid rgba(255,255,255,.08)}
input,textarea,select{background:#0B1829;border:1px solid rgba(255,255,255,.15);color:#fff;padding:8px 10px;border-radius:4px;font-family:'Barlow';font-size:13px;width:100%}
label{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);display:block;margin:10px 0 4px}
#login{max-width:360px;margin:12vh auto;background:#0E1F36;padding:32px;border-radius:8px}
#login h1{color:#0ECECE;font-size:26px;margin-bottom:4px}
.err{color:#FF5555;font-size:12px;margin-top:10px;display:none}
.hide{display:none}.muted{color:rgba(255,255,255,.45);font-size:12px}
.due{font-size:11px;color:#F5A623}.overdue{color:#FF5555;font-weight:700}
@media(max-width:640px){.wrap{padding:12px}.tab{padding:8px 12px;font-size:11px}}
</style></head><body>

<div id="login">
  <h1>HPI CRM</h1><div class="tag" style="font-size:8px;letter-spacing:.22em;color:#0B6B6E;text-transform:uppercase">People &middot; Care &middot; Compliance</div>
  <label>Email</label><input id="le" type="email" autocomplete="username">
  <label>Password</label><input id="lp" type="password" autocomplete="current-password">
  <div class="btns" style="margin-top:16px"><button class="btn" style="width:100%;padding:12px" onclick="doLogin()">Sign In</button></div>
  <div class="err" id="lerr">Invalid credentials</div>
</div>

<div id="app" class="hide"><div class="wrap">
  <header><div><h1>HPI CRM</h1><div class="tag">People &middot; Care &middot; Compliance</div></div>
    <button class="btn ghost" onclick="logout()">Sign out</button></header>
  <div class="kpis" id="kpis"></div>
  <div class="tabs">
    <button class="tab active" data-v="pipeline" onclick="show('pipeline',this)">Pipeline</button>
    <button class="tab" data-v="candidates" onclick="show('candidates',this)">Candidates</button>
    <button class="tab" data-v="facilities" onclick="show('facilities',this)">Facilities</button>
    <button class="tab" data-v="placements" onclick="show('placements',this)">Placements</button>
    <button class="tab" data-v="tasks" onclick="show('tasks',this)">Tasks</button>
  </div>
  <div id="view"></div>
</div></div>

<script>
const API='';let TOKEN=localStorage.getItem('hpi_crm_token')||'';
const H=()=>({'Content-Type':'application/json','Authorization':'Bearer '+TOKEN});
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function api(p,opt={}){const r=await fetch(API+p,{...opt,headers:H()});if(r.status===401){logout();throw 0}return r.json()}
async function doLogin(){
  const r=await fetch(API+'/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({email:le.value,password:lp.value})});
  const d=await r.json();
  if(d.ok){TOKEN=d.token;localStorage.setItem('hpi_crm_token',TOKEN);boot()}else lerr.style.display='block';
}
function logout(){localStorage.removeItem('hpi_crm_token');TOKEN='';app.classList.add('hide');login.classList.remove('hide')}
let CUR='pipeline';
function show(v,el){CUR=v;document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t===el));render()}
async function boot(){
  try{await loadKpis()}catch(e){return}
  login.classList.add('hide');app.classList.remove('hide');render();
}
async function loadKpis(){
  const s=await api('/api/crm/summary');
  kpis.innerHTML=
    kpi(s.open_requests,'Open Requests',s.open_requests>0?'warn':'')+
    kpi(s.candidates,'Candidates','')+
    kpi(s.facilities,'Facilities','')+
    kpi(s.placements,'Placements (PSA milestone)','')+
    kpi(s.escalated_tasks,'Overdue Tasks',s.escalated_tasks>0?'bad':'');
}
const kpi=(n,l,c)=>'<div class="kpi '+c+'"><div class="n">'+n+'</div><div class="l">'+l+'</div></div>';
async function render(){
  view.innerHTML='<div class="muted">Loading…</div>';
  if(CUR==='pipeline'){
    const d=await api('/api/crm/requests');
    view.innerHTML=d.requests.length?d.requests.map(r=>{
      const od=r.due_at&&r.status==='new'&&new Date(r.due_at.replace(' ','T')+'Z')<new Date();
      return '<div class="card"><div class="row"><div>'+
      '<strong>'+esc(r.facility_name||'Unknown facility')+'</strong> <span class="badge b-'+r.status+'">'+r.status+'</span>'+
      '<div class="meta">'+esc(r.role||'role n/a')+' &middot; '+esc(r.workers_needed||'?')+' worker(s) &middot; start '+esc(r.start_date||'TBC')+' &middot; '+esc(r.facility_lhd||'')+'</div>'+
      '<div class="meta">'+esc(r.facility_email||'')+' '+esc(r.facility_phone||'')+'</div>'+
      (r.notes?'<div class="meta">📝 '+esc(r.notes)+'</div>':'')+
      (r.due_at&&r.status==='new'?'<div class="due'+(od?' overdue':'')+'">'+(od?'⏰ 24H RESPONSE OVERDUE':'Respond by '+r.due_at)+'</div>':'')+
      '</div><div class="btns">'+
      ['contacted','matching','closed'].map(s=>'<button class="btn ghost" onclick="setReq('+r.id+',\\''+s+'\\')">'+s+'</button>').join('')+
      '<button class="btn" onclick="placeForm('+r.id+')">Place worker</button>'+
      '</div></div><div id="pf'+r.id+'"></div></div>'}).join(''):'<div class="muted">No requests yet. New facility submissions appear here automatically with a 24-hour response timer.</div>';
  }
  if(CUR==='candidates'){
    const d=await api('/api/crm/candidates');
    const byApp={};(d.credentials||[]).forEach(c=>{(byApp[c.application_id]=byApp[c.application_id]||[]).push(c)});
    view.innerHTML=d.candidates.length?d.candidates.map(a=>'<div class="card">'+
      '<strong>'+esc(a.first_name)+' '+esc(a.last_name)+'</strong> <span class="muted">#'+a.id+'</span>'+
      '<div class="meta">'+esc(a.role||'')+' &middot; '+esc(a.lhd||'region n/a')+' &middot; '+esc(a.email)+' &middot; '+esc(a.phone||'')+'</div>'+
      '<div>'+(byApp[a.id]||[]).map(c=>'<span class="chip" title="click to cycle status" onclick="cycleCred('+c.id+',\\''+c.status+'\\')">'+esc(c.cred_type)+' <span class="badge b-'+c.status+'">'+c.status+'</span>'+(c.expiry_date?' <span class="muted">exp '+c.expiry_date+'</span>':'')+'</span>').join('')+
      ' <span class="chip" onclick="setExpiry('+a.id+')">+ expiry date</span></div>'+
      '<div id="ex'+a.id+'"></div></div>').join(''):'<div class="muted">No worker applications yet.</div>';
  }
  if(CUR==='facilities'){
    const d=await api('/api/crm/facilities');
    view.innerHTML=d.facilities.length?d.facilities.map(f=>'<div class="card"><strong>'+esc(f.name)+'</strong>'+
      '<div class="meta">'+esc(f.lhd||'LHD n/a')+' &middot; '+esc(f.contact_name||'')+' &middot; '+esc(f.email||'')+' &middot; '+esc(f.phone||'')+'</div></div>').join(''):'<div class="muted">No facilities yet — created automatically from workforce requests.</div>';
  }
  if(CUR==='placements'){
    const d=await api('/api/crm/placements');
    view.innerHTML=(d.placements.length?('<div class="card" style="border-left:3px solid #66BB6A"><strong>'+d.placements.length+' total placement(s)</strong><div class="meta">Feeds the PSA 6-month Placement Milestone evidence.</div></div>'):'')+
      (d.placements.length?d.placements.map(p=>'<div class="card"><strong>'+esc(p.first_name||'?')+' '+esc(p.last_name||'')+'</strong> → '+esc(p.facility_name||'?')+
      '<div class="meta">'+esc(p.role||'')+' &middot; '+esc(p.start_date||'start TBC')+(p.end_date?' → '+esc(p.end_date):'')+' &middot; logged '+p.created_at+'</div></div>').join(''):'<div class="muted">No placements yet. Use "Place worker" on a pipeline request.</div>');
  }
  if(CUR==='tasks'){
    const d=await api('/api/crm/tasks');
    view.innerHTML=d.tasks.length?d.tasks.map(t=>'<div class="card"><div class="row"><div>'+
      '<span class="badge b-'+t.status+'">'+t.status+'</span> '+esc(t.title)+
      '<div class="meta due'+(t.status==='escalated'?' overdue':'')+'">due '+esc(t.due_at||'—')+'</div></div>'+
      '<button class="btn" onclick="doneTask('+t.id+')">Done</button></div></div>').join(''):'<div class="muted">No open tasks.</div>';
  }
}
async function setReq(id,status){await api('/api/crm/requests/'+id,{method:'PATCH',body:JSON.stringify({status})});await loadKpis();render()}
const credOrder=['pending','received','verified'];
async function cycleCred(id,cur){const nxt=credOrder[(credOrder.indexOf(cur)+1)%3];await api('/api/crm/credentials/'+id,{method:'PATCH',body:JSON.stringify({status:nxt})});render()}
function setExpiry(appId){
  const el=document.getElementById('ex'+appId);
  el.innerHTML='<div class="row" style="margin-top:8px;gap:8px"><input type="number" id="exc'+appId+'" placeholder="credential id (hover chip)" style="max-width:160px"><input type="date" id="exd'+appId+'" style="max-width:170px"><button class="btn" onclick="saveExpiry('+appId+')">Save</button></div><div class="muted">Tip: credential IDs are sequential per candidate — or just click a chip to cycle status.</div>';
}
async function saveExpiry(appId){
  const cid=document.getElementById('exc'+appId).value,d=document.getElementById('exd'+appId).value;
  if(!cid||!d)return;await api('/api/crm/credentials/'+cid,{method:'PATCH',body:JSON.stringify({expiry_date:d})});render();
}
function placeForm(reqId){
  const el=document.getElementById('pf'+reqId);
  el.innerHTML='<div class="row" style="margin-top:10px;gap:8px"><input type="number" id="pa'+reqId+'" placeholder="candidate # (from Candidates tab)" style="max-width:230px"><input type="date" id="ps'+reqId+'" style="max-width:170px"><button class="btn" onclick="doPlace('+reqId+')">Confirm placement</button></div>';
}
async function doPlace(reqId){
  const a=document.getElementById('pa'+reqId).value,s=document.getElementById('ps'+reqId).value;
  if(!a)return;
  const r=await api('/api/crm/placements',{method:'POST',body:JSON.stringify({request_id:reqId,application_id:+a,start_date:s})});
  if(r.ok){await loadKpis();render()}
}
lp&&lp.addEventListener('keydown',e=>{if(e.key==='Enter')doLogin()});
if(TOKEN)boot();
</script></body></html>`;

export default {
  async fetch(request, env) {
    try { await ensureSchema(env); } catch(e) { console.error("schema:", e); }
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (method === "OPTIONS") return new Response(null, { headers: CORS });
    if (path === "/api/ping") return json({ ok: true, service: "hpi-onboarding", ts: new Date().toISOString() });

    // ── WORKER APPLICATION (multipart/form-data with optional resume) ──────────
    if (path === "/api/apply/worker" && method === "POST") {
      let fields = {};
      let attachment = null;

      const contentType = request.headers.get("Content-Type") || "";

      if (contentType.includes("multipart/form-data")) {
        try {
          const formData = await request.formData();
          for (const [key, value] of formData.entries()) {
            if (value instanceof File && value.size > 0) {
              // It's a file
              if (value.size > 10 * 1024 * 1024) return err("Resume file exceeds 10MB limit");
              const allowed = ["application/pdf", "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
              if (!allowed.includes(value.type) && !value.name.match(/\.(pdf|doc|docx)$/i)) {
                return err("Only PDF, DOC, or DOCX files are accepted");
              }
              const buf = await value.arrayBuffer();
              attachment = {
                filename: value.name,
                base64: arrayBufferToBase64(buf),
                type: value.type || "application/octet-stream"
              };
              fields.resume_filename = value.name;
            } else {
              fields[key] = value;
            }
          }
        } catch (e) {
          return err("Failed to parse form data");
        }
      } else {
        // Fallback: JSON (keep backward compat)
        try {
          fields = await request.json();
        } catch {
          return err("Invalid request body");
        }
      }

      // Map single-field name to first_name/last_name if needed
      if (fields.name && !fields.first_name) {
        const parts = (fields.name || "").trim().split(" ");
        fields.first_name = parts[0] || "";
        fields.last_name = parts.slice(1).join(" ") || "";
      }

      const { first_name, last_name, email, phone, role, region, message } = fields;

      if (!first_name || !email || !role) {
        return err("Missing required fields: name, email, role");
      }

      // Save to D1
      try {
        const wres = await env.DB.prepare(
          `INSERT INTO applications (type,first_name,last_name,email,phone,role,lhd,message)
           VALUES ('worker',?,?,?,?,?,?,?)`
        ).bind(
          first_name, last_name || "", email, phone || "",
          role, region || "", message || ""
        ).run();
        if (wres?.meta?.last_row_id) await wfWorkerApply(env, wres.meta.last_row_id, fields);
      } catch (e) {
        console.error("DB insert error:", e);
        // Don't fail the whole request over DB — still send emails
      }

      const fullName = `${first_name} ${last_name || ""}`.trim();

      // Confirmation to applicant
      await sendEmail(env, {
        to: email,
        subject: "Application Received — HealthPlus International",
        html: workerConfirmEmail(fullName, role)
      });

      // Internal notification with resume attached
      await sendEmailWithAttachment(env, {
        to: env.FROM_EMAIL,
        subject: `New Worker Application — ${fullName} (${role})`,
        html: internalNotifyEmail("worker", { ...fields, resume_filename: fields.resume_filename }),
        attachment
      });

      return json({ ok: true, message: "Application received. We will be in touch within 24 hours." });
    }

    // ── FACILITY REQUEST (JSON) ───────────────────────────────────────────────
    if (path === "/api/apply/facility" && method === "POST") {
      let body;
      try { body = await request.json(); } catch { return err("Invalid JSON"); }
      const { first_name, last_name, email, phone, facility_name, facility_contact, role, lhd, workers_needed, start_date, message } = body;
      if (!first_name || !last_name || !email || !phone || !facility_name)
        return err("Missing required fields: first_name, last_name, email, phone, facility_name");
      const result = await env.DB.prepare(
        `INSERT INTO applications (type,first_name,last_name,email,phone,facility_name,facility_contact,role,lhd,workers_needed,start_date,message)
         VALUES ('facility',?,?,?,?,?,?,?,?,?,?,?)`
      ).bind(first_name, last_name, email, phone, facility_name, facility_contact || "", role || "", lhd || "", workers_needed || "", start_date || "", message || "").run();
      await wfFacilityRequest(env, result.meta.last_row_id, body);
      await sendEmail(env, {
        to: email,
        subject: "Workforce Request Received — HealthPlus International",
        html: facilityConfirmEmail(`${first_name} ${last_name}`, facility_name)
      });
      await sendEmail(env, {
        to: env.FROM_EMAIL,
        subject: `New Facility Request — ${facility_name} (${role || "unspecified"})`,
        html: internalNotifyEmail("facility", body)
      });
      return json({ ok: true, id: result.meta.last_row_id, message: "Request received. We will respond within 24 hours." });
    }

    // ── AUTH ──────────────────────────────────────────────────────────────────
    if (path === "/api/auth/login" && method === "POST") {
      let body;
      try { body = await request.json(); } catch { return err("Invalid JSON"); }
      const { email, password } = body;
      if (!email || !password) return err("Email and password required");
      const hash = await sha256(password);
      const staff = await env.DB.prepare(
        "SELECT id, name, email FROM staff WHERE email=? AND password_hash=?"
      ).bind(email.toLowerCase(), hash).first();
      if (!staff) return err("Invalid credentials", 401);
      const token = randomToken();
      const expires = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
      await env.DB.prepare(
        "INSERT INTO sessions (token, staff_id, expires_at) VALUES (?,?,?)"
      ).bind(token, staff.id, expires).run();
      return json({ ok: true, token, name: staff.name, email: staff.email, expires_at: expires });
    }

    if (path === "/api/auth/logout" && method === "POST") {
      const auth = request.headers.get("Authorization") || "";
      const token = auth.replace("Bearer ", "").trim();
      if (token) await env.DB.prepare("DELETE FROM sessions WHERE token=?").bind(token).run();
      return json({ ok: true });
    }

    // ── PORTAL ────────────────────────────────────────────────────────────────
    if (path === "/api/portal/applications" && method === "GET") {
      const staff = await requireAuth(request, env);
      if (!staff) return err("Unauthorised", 401);
      const status = url.searchParams.get("status") || "";
      const type = url.searchParams.get("type") || "";
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = 20;
      const offset = (page - 1) * limit;
      let where = [], params = [];
      if (status) { where.push("status=?"); params.push(status); }
      if (type) { where.push("type=?"); params.push(type); }
      const whereClause = where.length ? "WHERE " + where.join(" AND ") : "";
      const rows = await env.DB.prepare(
        `SELECT * FROM applications ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`
      ).bind(...params, limit, offset).all();
      const count = await env.DB.prepare(
        `SELECT COUNT(*) as total FROM applications ${whereClause}`
      ).bind(...params).first();
      return json({ ok: true, applications: rows.results, total: count.total, page, limit });
    }

    if (path.startsWith("/api/portal/applications/") && method === "PATCH") {
      const staff = await requireAuth(request, env);
      if (!staff) return err("Unauthorised", 401);
      const id = path.split("/").pop();
      let body;
      try { body = await request.json(); } catch { return err("Invalid JSON"); }
      const allowed = ["status", "notes"];
      const updates = Object.entries(body).filter(([k]) => allowed.includes(k));
      if (!updates.length) return err("Nothing to update");
      const set = updates.map(([k]) => `${k}=?`).join(", ");
      const vals = updates.map(([, v]) => v);
      await env.DB.prepare(
        `UPDATE applications SET ${set}, updated_at=datetime('now') WHERE id=?`
      ).bind(...vals, id).run();
      return json({ ok: true });
    }

    if (path === "/api/portal/staff" && method === "POST") {
      let body;
      try { body = await request.json(); } catch { return err("Invalid JSON"); }
      const { name, email, password, bootstrap_key } = body;
      if (bootstrap_key !== env.BOOTSTRAP_KEY) return err("Forbidden", 403);
      if (!name || !email || !password) return err("name, email, password required");
      const hash = await sha256(password);
      try {
        await env.DB.prepare(
          "INSERT INTO staff (name, email, password_hash) VALUES (?,?,?)"
        ).bind(name, email.toLowerCase(), hash).run();
        return json({ ok: true, message: `Staff account created for ${email}` });
      } catch (e) {
        return err("Email already exists");
      }
    }

    const crmResp = await handleCrm(request, env, url, path, method);
    if (crmResp) return crmResp;

    return json({ ok: false, error: "Not found" }, 404);
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(wfScheduled(env));
  }
};
