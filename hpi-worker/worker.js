// HPI Onboarding Worker
// Routes:
//   POST /api/apply/worker       — worker application form
//   POST /api/apply/facility     — facility request form
//   POST /api/auth/login         — staff login
//   POST /api/auth/logout        — staff logout
//   GET  /api/portal/applications — list applications (auth required)
//   PATCH /api/portal/applications/:id — update status (auth required)
//   GET  /api/ping               — health check

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

function err(msg, status = 400) {
  return json({ ok: false, error: msg }, status);
}

// ── Simple SHA-256 hash (no bcrypt in Workers) ──────────────────────────────
async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

// ── Session token ────────────────────────────────────────────────────────────
function randomToken() {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2,'0')).join('');
}

// ── Auth middleware ──────────────────────────────────────────────────────────
async function requireAuth(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '').trim();
  if (!token) return null;
  const now = new Date().toISOString();
  const row = await env.DB.prepare(
    'SELECT s.id, s.name, s.email FROM sessions ss JOIN staff s ON ss.staff_id=s.id WHERE ss.token=? AND ss.expires_at>?'
  ).bind(token, now).first();
  return row || null;
}

// ── Resend email ─────────────────────────────────────────────────────────────
async function sendEmail(env, { to, subject, html }) {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `HealthPlus International <${env.FROM_EMAIL}>`,
        to: [to],
        subject,
        html,
      }),
    });
    return res.ok;
  } catch (e) {
    console.error('Resend error:', e);
    return false;
  }
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
    .filter(([k]) => !['type'].includes(k))
    .map(([k,v]) => `<tr><td style="padding:6px 12px;color:#9FE1CB;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:35%">${k.replace(/_/g,' ')}</td><td style="padding:6px 12px;color:#fff;font-size:13px">${v||'—'}</td></tr>`)
    .join('');
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#07101C;color:#fff;border-radius:8px;overflow:hidden">
    <div style="background:#0D1F33;padding:20px 32px;border-bottom:3px solid #F5A623">
      <h2 style="margin:0;color:#F5A623;font-size:16px">New ${type === 'worker' ? 'Worker Application' : 'Facility Request'}</h2>
      <p style="margin:4px 0 0;color:rgba(255,255,255,0.5);font-size:11px">${new Date().toLocaleString('en-AU',{timeZone:'Australia/Sydney'})}</p>
    </div>
    <div style="padding:24px 32px">
      <table style="width:100%;border-collapse:collapse">${rows}</table>
      <div style="margin-top:24px">
        <a href="https://healthplusint.com.au/portal.html" style="background:#0ECECE;color:#000;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:700;font-size:13px">View in Portal →</a>
      </div>
    </div>
  </div>`;
}

// ── Router ────────────────────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (method === 'OPTIONS') return new Response(null, { headers: CORS });

    // Health check
    if (path === '/api/ping') return json({ ok: true, service: 'hpi-onboarding', ts: new Date().toISOString() });

    // ── POST /api/apply/worker ──────────────────────────────────────────────
    if (path === '/api/apply/worker' && method === 'POST') {
      let body;
      try { body = await request.json(); } catch { return err('Invalid JSON'); }

      const { first_name, last_name, email, phone, role, location, lhd,
              availability, visa_status, ahpra_number, qualification, message } = body;

      if (!first_name || !last_name || !email || !phone || !role)
        return err('Missing required fields: first_name, last_name, email, phone, role');

      const result = await env.DB.prepare(
        `INSERT INTO applications (type,first_name,last_name,email,phone,role,location,lhd,availability,visa_status,ahpra_number,qualification,message)
         VALUES ('worker',?,?,?,?,?,?,?,?,?,?,?,?)`
      ).bind(first_name, last_name, email, phone, role, location||'', lhd||'', availability||'', visa_status||'', ahpra_number||'', qualification||'', message||'').run();

      // Emails
      await sendEmail(env, {
        to: email,
        subject: 'Application Received — HealthPlus International',
        html: workerConfirmEmail(`${first_name} ${last_name}`, role),
      });
      await sendEmail(env, {
        to: env.FROM_EMAIL,
        subject: `New Worker Application — ${first_name} ${last_name} (${role})`,
        html: internalNotifyEmail('worker', body),
      });

      return json({ ok: true, id: result.meta.last_row_id, message: 'Application received. We will be in touch within 24 hours.' });
    }

    // ── POST /api/apply/facility ────────────────────────────────────────────
    if (path === '/api/apply/facility' && method === 'POST') {
      let body;
      try { body = await request.json(); } catch { return err('Invalid JSON'); }

      const { first_name, last_name, email, phone, facility_name,
              facility_contact, role, lhd, workers_needed, start_date, message } = body;

      if (!first_name || !last_name || !email || !phone || !facility_name)
        return err('Missing required fields: first_name, last_name, email, phone, facility_name');

      const result = await env.DB.prepare(
        `INSERT INTO applications (type,first_name,last_name,email,phone,facility_name,facility_contact,role,lhd,workers_needed,start_date,message)
         VALUES ('facility',?,?,?,?,?,?,?,?,?,?,?)`
      ).bind(first_name, last_name, email, phone, facility_name, facility_contact||'', role||'', lhd||'', workers_needed||'', start_date||'', message||'').run();

      await sendEmail(env, {
        to: email,
        subject: 'Workforce Request Received — HealthPlus International',
        html: facilityConfirmEmail(`${first_name} ${last_name}`, facility_name),
      });
      await sendEmail(env, {
        to: env.FROM_EMAIL,
        subject: `New Facility Request — ${facility_name} (${role||'unspecified'})`,
        html: internalNotifyEmail('facility', body),
      });

      return json({ ok: true, id: result.meta.last_row_id, message: 'Request received. We will respond within 24 hours.' });
    }

    // ── POST /api/auth/login ────────────────────────────────────────────────
    if (path === '/api/auth/login' && method === 'POST') {
      let body;
      try { body = await request.json(); } catch { return err('Invalid JSON'); }
      const { email, password } = body;
      if (!email || !password) return err('Email and password required');

      const hash = await sha256(password);
      const staff = await env.DB.prepare(
        'SELECT id, name, email FROM staff WHERE email=? AND password_hash=?'
      ).bind(email.toLowerCase(), hash).first();

      if (!staff) return err('Invalid credentials', 401);

      const token = randomToken();
      const expires = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(); // 12h
      await env.DB.prepare(
        'INSERT INTO sessions (token, staff_id, expires_at) VALUES (?,?,?)'
      ).bind(token, staff.id, expires).run();

      return json({ ok: true, token, name: staff.name, email: staff.email, expires_at: expires });
    }

    // ── POST /api/auth/logout ───────────────────────────────────────────────
    if (path === '/api/auth/logout' && method === 'POST') {
      const auth = request.headers.get('Authorization') || '';
      const token = auth.replace('Bearer ', '').trim();
      if (token) await env.DB.prepare('DELETE FROM sessions WHERE token=?').bind(token).run();
      return json({ ok: true });
    }

    // ── GET /api/portal/applications ───────────────────────────────────────
    if (path === '/api/portal/applications' && method === 'GET') {
      const staff = await requireAuth(request, env);
      if (!staff) return err('Unauthorised', 401);

      const status = url.searchParams.get('status') || '';
      const type   = url.searchParams.get('type') || '';
      const page   = parseInt(url.searchParams.get('page') || '1');
      const limit  = 20;
      const offset = (page - 1) * limit;

      let where = [];
      let params = [];
      if (status) { where.push('status=?'); params.push(status); }
      if (type)   { where.push('type=?');   params.push(type); }
      const whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';

      const rows = await env.DB.prepare(
        `SELECT * FROM applications ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`
      ).bind(...params, limit, offset).all();

      const count = await env.DB.prepare(
        `SELECT COUNT(*) as total FROM applications ${whereClause}`
      ).bind(...params).first();

      return json({ ok: true, applications: rows.results, total: count.total, page, limit });
    }

    // ── PATCH /api/portal/applications/:id ─────────────────────────────────
    if (path.startsWith('/api/portal/applications/') && method === 'PATCH') {
      const staff = await requireAuth(request, env);
      if (!staff) return err('Unauthorised', 401);

      const id = path.split('/').pop();
      let body;
      try { body = await request.json(); } catch { return err('Invalid JSON'); }

      const allowed = ['status', 'notes'];
      const updates = Object.entries(body).filter(([k]) => allowed.includes(k));
      if (!updates.length) return err('Nothing to update');

      const set = updates.map(([k]) => `${k}=?`).join(', ');
      const vals = updates.map(([,v]) => v);

      await env.DB.prepare(
        `UPDATE applications SET ${set}, updated_at=datetime('now') WHERE id=?`
      ).bind(...vals, id).run();

      return json({ ok: true });
    }

    // ── POST /api/portal/staff ──────────────────────────────────────────────
    // Create staff account (first run / admin only — no auth check intentionally for bootstrap)
    if (path === '/api/portal/staff' && method === 'POST') {
      let body;
      try { body = await request.json(); } catch { return err('Invalid JSON'); }
      const { name, email, password, bootstrap_key } = body;

      if (bootstrap_key !== env.BOOTSTRAP_KEY) return err('Forbidden', 403);
      if (!name || !email || !password) return err('name, email, password required');

      const hash = await sha256(password);
      try {
        await env.DB.prepare(
          'INSERT INTO staff (name, email, password_hash) VALUES (?,?,?)'
        ).bind(name, email.toLowerCase(), hash).run();
        return json({ ok: true, message: `Staff account created for ${email}` });
      } catch (e) {
        return err('Email already exists');
      }
    }

    return json({ ok: false, error: 'Not found' }, 404);
  }
};
