---
name: healthplus-website
description: Complete build, update and deployment skill for the HealthPlus International website (healthplusint.com.au). Use this skill whenever Abhay mentions HealthPlus International, the healthcare workforce site, updating the site, adding pages, fixing content, changing the map, updating forms, pushing to GitHub, or deploying to Cloudflare. Also trigger when asked to work on the homepage, allied health page, about page, join page, AHPRA verify tool, services page, map, forms, footer, logo, colours, DNS, or any content on healthplusint.com.au.
---

# HealthPlus International — Website Skill

## Business Context

**Legal name:** Westminster Green Solutions Pty Ltd ABN 13 155 901 723
**Brand:** HealthPlus International | **Tagline:** People. Care. Compliance.
**Domain:** healthplusint.com.au | **Email:** connect@healthplusint.com.au
**Director:** Abhay J Kumar | wgs.aus@gmail.com | +61 411 459 755
**Address:** Unit 4, 44–46 Keeler Street, Carlingford NSW 2118

**Staff placed:** AINs · Aged Care Workers · Support Workers (community NOT NDIS) · Allied Health (7 professions)
**Allied Health (7):** OT · Psychology · Podiatry · Aboriginal & TSI Health · Medical Radiation · Dietetics & Nutrition · Exercise Physiology
**REMOVED professions:** Physiotherapy · Optometry · Speech Pathology · Paramedicine · Dental
**International sourcing:** Philippines 🇵🇭 · India 🇮🇳 · Eastern Europe 🇪🇺 (Romania, Poland, Bulgaria)
**HPI covers:** visa costs · vetting · accommodation | **Client pays:** agreed hourly or negotiated rate only
**NOT in scope:** Nurses · NDIS · Mining · FIFO · UK/Ireland · Metro

---

## Credentials (all tokens in Claude memory — redacted here for GitHub secret scanning)

### GitHub
- **Repo:** `wgsaus-dotcom/Healthplus` | Token: `GH_TOKEN` (Claude memory #5)
- **Branch:** `main` → auto-deploys via Cloudflare Pages

### Cloudflare Pages
- **Project:** `healthplus` → `healthplus-3gy.pages.dev` → healthplusint.com.au
- **Zone ID:** `ZONE_ID` (Claude memory) | **Account ID:** `d2586c55db329e1e12cbaf3285d32f1a`
- **Pages API Token:** `CF_PAGES_TOKEN` (Claude memory #5)

### Cloudflare Worker ✅ DEPLOYED
- **Name:** `hpi-onboarding` | **URL:** `https://hpi-onboarding.wgs-aus.workers.dev`
- **Worker token:** `CF_WORKER_TOKEN` = `CF_WORKER_TOKEN_see_claude_memory_9` (Claude memory #9)
- **R2 bucket:** `hpi-candidate-docs` ✅
- **KV namespace:** `HPI_ONBOARDING_KV` | ID: `e34cac0c7a584a3189714ed5b0220e8a` ✅
- **Email:** MailChannels (built into CF — free, no external service)
  - Candidate → branded HTML from connect@healthplusint.com.au
  - Abhay → plain text to wgs.aus@gmail.com, reply-to = candidate

### Formspree
- **Endpoint:** `https://formspree.io/f/xpqbdonv` | **Account:** wgs.aus@gmail.com
- **Used in:** submit-a-request.html · urgent modal (index.html) · allied-health.html

### GitHub Secrets (Settings → Secrets → Actions)
| Secret | Purpose |
|--------|---------|
| `CF_WORKER_TOKEN` | Deploy hpi-onboarding worker |
| `CF_PAGES_TOKEN` | Cloudflare Pages + DNS |
| `CF_ACCOUNT_ID` | Cloudflare account |
| `CF_ZONE_ID` | healthplusint.com.au zone |
| `KV_NAMESPACE_ID` | HPI_ONBOARDING_KV |

### GitHub Actions
- `.github/workflows/deploy-worker.yml` — auto-deploys worker on push to `hpi-worker/worker.js`
- Manual trigger available from GitHub UI → Actions tab

---

## Deployment Code

### Push file to GitHub
```python
import base64, json, urllib.request, time

TOKEN = "GH_TOKEN_see_claude_memory_5"  # from Claude memory
REPO = "wgsaus-dotcom/Healthplus"

def deploy(filename, commit_msg):
    req = urllib.request.Request(
        f'https://api.github.com/repos/{REPO}/contents/{filename}',
        headers={'Authorization': f'token {TOKEN}'}
    )
    with urllib.request.urlopen(req) as r:
        sha = json.loads(r.read())['sha']
    with open(f'/home/claude/{filename}', 'rb') as f:
        content = base64.b64encode(f.read()).decode()
    data = json.dumps({"message": commit_msg, "content": content, "sha": sha}).encode()
    req = urllib.request.Request(
        f'https://api.github.com/repos/{REPO}/contents/{filename}',
        data=data, method='PUT',
        headers={'Authorization': f'token {TOKEN}', 'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req) as r:
        d = json.loads(r.read())
        print(f'✅ {filename} → {d["commit"]["sha"][:7]}')
    time.sleep(1.2)
```

### Deploy Cloudflare Worker
```python
import urllib.request, json

CF_TOKEN = "CF_WORKER_TOKEN_see_claude_memory_9"
ACCOUNT_ID = "d2586c55db329e1e12cbaf3285d32f1a"
KV_ID = "e34cac0c7a584a3189714ed5b0220e8a"

with open('/home/claude/hpi-worker/worker.js', 'r') as f:
    script = f.read()

boundary = "----HPIWorkerBoundary99"
meta = json.dumps({
    "main_module": "worker.js",
    "bindings": [
        {"type": "r2_bucket",    "name": "HPI_CANDIDATE_DOCS", "bucket_name": "hpi-candidate-docs"},
        {"type": "kv_namespace", "name": "HPI_ONBOARDING_KV",  "namespace_id": KV_ID}
    ],
    "compatibility_date": "2024-01-01"
})
body = (
    f'--{boundary}\r\nContent-Disposition: form-data; name="metadata"\r\n'
    f'Content-Type: application/json\r\n\r\n{meta}\r\n'
    f'--{boundary}\r\nContent-Disposition: form-data; name="worker.js"; '
    f'filename="worker.js"\r\nContent-Type: application/javascript+module\r\n\r\n'
    f'{script}\r\n--{boundary}--\r\n'
).encode('utf-8')

req = urllib.request.Request(
    f'https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/workers/scripts/hpi-onboarding',
    data=body, method='PUT',
    headers={'Authorization': f'Bearer {CF_TOKEN}',
             'Content-Type': f'multipart/form-data; boundary={boundary}'}
)
with urllib.request.urlopen(req) as r:
    result = json.loads(r.read())
    print('✅ Worker deployed' if result.get('success') else f'❌ {result.get("errors")}')
```

### wrangler.toml
```toml
name = "hpi-onboarding"
main = "worker.js"
compatibility_date = "2024-01-01"
account_id = "d2586c55db329e1e12cbaf3285d32f1a"

[[r2_buckets]]
binding = "HPI_CANDIDATE_DOCS"
bucket_name = "hpi-candidate-docs"

[[kv_namespaces]]
binding = "HPI_ONBOARDING_KV"
id = "e34cac0c7a584a3189714ed5b0220e8a"
```

---

## Live Website Files

| File | Description |
|------|-------------|
| `index.html` | Homepage — hero, animated counters, dual entry cards, map, section CTAs |
| `allied-health.html` | 7 allied health professions |
| `services-remote.html` | Healthcare & Support Workers — pricing cards (Rotation / Sustained / International) |
| `how-we-work.html` | EOR model, 6 obligation cards (SVG icons) |
| `submit-a-request.html` | Facility request form → Formspree |
| `ahpra-verify.html` | AHPRA lookup tool |
| `about.html` | About Us — story, director bio, differentiators |
| `join.html` | Multi-step worker onboarding → CF Worker + MailChannels |
| `images/logo-healthplus.png` | White bg — nav/light surfaces ONLY |
| `images/logo-healthplus-transparent.png` | Transparent — footer/dark bg ONLY |

## Forms Summary

| Form | Backend | Auto-reply |
|------|---------|------------|
| join.html onboarding | CF Worker + R2 + KV | ✅ MailChannels — candidate HTML + Abhay plain text |
| submit-a-request.html | Formspree xpqbdonv | Configure in Formspree dashboard |
| Urgent modal (FAB) | Formspree xpqbdonv | Configure in Formspree dashboard |
| allied-health.html enquiry | Formspree xpqbdonv | Configure in Formspree dashboard |

---

## Design System

```css
--teal:#0B6B6E  --teal-d:#085558  --teal-pale:#E1F5EE  --teal-mid:#9FE1CB
--navy:#1B3A5C  --navy-d:#0D1F33  --off:#F7F8F6  --muted:#5a6a7a
```

**Font:** Montserrat 400–800 | **Icons:** SVG stroke only (1.6–1.65px) — NO emojis anywhere
**Readability CSS:** Injected at `</style>` on every page — WCAG AA (body 15px+, labels 12px+, inputs 15px, line-height 1.8)

---

## Nav HTML (standard — all pages)

```html
<nav> <!-- height: 72-74px -->
  <a href="index.html" class="nav-logo">
    <img src="images/logo-healthplus.png" alt="HealthPlus International" style="height:54px;width:auto;display:block">
  </a>
  <ul class="nav-links">
    <li><a href="index.html#map-sec">Regions</a></li>
    <li><a href="allied-health.html">Allied Health</a></li>
    <li><a href="services-remote.html">Healthcare &amp; Support</a></li>
    <li><a href="how-we-work.html">How We Work</a></li>
    <li><a href="about.html">About Us</a></li>
    <li><a href="submit-a-request.html" class="nav-cta">Submit a Request</a></li>
  </ul>
  <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0;margin-left:1.5rem">
    <a href="tel:+61411459755" style="font-size:11.5px;font-weight:500;color:#5a6a7a!important;text-decoration:none!important;white-space:nowrap;line-height:1.35;font-family:inherit">
      <strong style="font-weight:700;color:#1B3A5C;margin-right:3px">Phone:</strong>+61 411 459 755</a>
    <a href="mailto:connect@healthplusint.com.au" style="font-size:11.5px;font-weight:500;color:#5a6a7a!important;text-decoration:none!important;white-space:nowrap;line-height:1.35;font-family:inherit">
      <strong style="font-weight:700;color:#1B3A5C;margin-right:3px">Email:</strong>connect@healthplusint.com.au</a>
  </div>
</nav>
```

## Footer HTML (standard — all pages)

```html
<footer>
  <div class="ft"> <!-- grid: 2fr 1fr 1fr -->
    <div class="fb">
      <!-- MUST use transparent logo in footer -->
      <img src="images/logo-healthplus-transparent.png" alt="HealthPlus International"
           style="height:52px;width:auto;display:block;margin-bottom:12px">
      <p>Description text.</p>
      <div class="hpi-tagline">People. Care. Compliance.</div>
    </div>
    <div class="fc"><h4>FOR FACILITIES</h4>...links...</div>
    <div class="fc"><h4>FOR HEALTHCARE WORKERS</h4>...links...</div>
  </div>
</footer>
```

⚠️ **CRITICAL:** NEVER close `.fb` div before the `<p>` tag — stray `</div>` collapses the entire footer grid.
**Footer text:** minimum `rgba(255,255,255,.55)` on dark navy or text is invisible.

---

## UX Features (all live)

| Feature | Notes |
|---------|-------|
| Trust bar | Fixed below nav — 6 trust signals |
| Floating FAB | "Request Staff Now" → urgent modal → Formspree |
| Mobile bottom nav | SVG icons: Home / About / Request / Join / Call |
| Animated counters | Stats bar counts up on IntersectionObserver scroll |
| Dual entry cards | "I need staff" → submit-a-request | "I'm a worker" → join.html |
| Section CTAs | After Why / How It Works / Workforce / Sourcing |
| Interactive map | Leaflet.js — LHD sidebar: shortage level, facilities, towns, role pills |
| Multi-step onboarding | join.html — 3 steps, drag-drop uploads, Worker + MailChannels |

---

## Interactive Map LHD Data

| LHD | Shortage | Roles | Towns |
|-----|----------|-------|-------|
| Far West | Critical | Healthcare Workers, AINs, Support Workers, Allied Health | Broken Hill, Wilcannia, Bourke, Cobar |
| Western NSW | Severe | Healthcare Workers, AINs, Aged Care Workers, Allied Health | Dubbo, Orange, Bathurst, Parkes |
| Murrumbidgee | High | Healthcare Workers, Support Workers, Aged Care Workers, Allied Health | Wagga Wagga, Griffith, Albury |
| Hunter New England | High | Healthcare Workers, AINs, Support Workers, Allied Health | Tamworth, Armidale, Moree |
| Northern NSW | Moderate | Healthcare Workers, Support Workers, Allied Health | Lismore, Grafton, Ballina |
| Mid North Coast | Moderate | Healthcare Workers, Aged Care Workers, Allied Health | Port Macquarie, Coffs Harbour |

---

## Content Rules

### NEVER say
- Nurse / nursing / registered nurse / enrolled nurse
- NDIS | Mining | FIFO | Staffing agency | Nursing agency
- Police Checked → **National Police Clearance**
- Cert III/IV → **"Cert III, Cert IV or equivalent"**
- UK / Ireland | Metro | was.aus@gmail.com → **wgs.aus@gmail.com**
- Physiotherapy / Optometry / Speech Pathology / Paramedicine / Dental (all removed)

### ALWAYS say
- HealthPlus International (one word brand)
- Strategically place healthcare staff in regional and remote NSW
- Employer of record · One all-inclusive invoice
- National Police Clearance · AHPRA verified (allied health only)
- 24hr response · People. Care. Compliance.

### Qualification wording
- "Cert III, Cert IV or equivalent qualification"
- "International qualifications mapped to AQF Level 3 — gap training arranged prior to placement"

### Pricing
- Rotation: "Healthcare Worker Award rate + remote loading + margin"
- Sustained: "Negotiated rate"
- International: "Ongoing negotiated rate"

---

## Submit-a-Request Dropdown (clean version)
```html
<optgroup label="Care Workers">
  <option>Healthcare Worker (Cert III, Cert IV or equivalent)</option>
  <option>AIN (Assistant in Nursing)</option>
  <option>Aged Care Worker</option>
  <option>Support Worker (Community Care)</option>
</optgroup>
<optgroup label="Allied Health">
  <option>Occupational Therapist</option>
  <option>Psychologist</option>
  <option>Podiatrist</option>
  <option>Aboriginal &amp; Torres Strait Islander Health Practitioner</option>
  <option>Medical Radiation Practitioner</option>
  <option>Dietitian / Nutritionist</option>
  <option>Exercise Physiologist</option>
</optgroup>
<option>Other (specify in notes)</option>
```

---

## Governance Documents (built May 2026)

| Document | Status | File |
|----------|--------|------|
| Company Constitution (14 parts) | ✅ Drafted — needs lawyer review + deed execution | HPI_Constitution_WestminsterGreenSolutions.pdf |

### Next governance documents to build:
1. Board Charter
2. Conflict of Interest Policy + Register
3. Employment Contract — Healthcare Worker (Health Professionals Award)
4. Employment Contract — Aged Care Worker (Aged Care Award)
5. Employment Contract — Support Worker (SCHADS Award)
6. On-Hire / Labour Hire Agreement
7. Client Service Agreement
8. Host Employer WHS Agreement
9. Privacy Policy
10. Whistleblower Policy

---

## Skills in GitHub (skills/ folder)
- `skills/healthplus-branding/SKILL.md`
- `skills/healthplus-document-creator/SKILL.md`
- `skills/healthplus-policy-procedure/SKILL.md`
- `skills/healthplus-website/SKILL.md` ← this file

---

## Pending
1. ⏳ Formspree auto-reply for facility forms (configure in dashboard)
2. ⏳ Testimonials — 2–3 real quotes from facilities or placed workers
3. ⏳ WhatsApp link alongside FAB (wa.me/+61411459755)
4. ⏳ Image WebP conversion + lazy loading
5. ⏳ WCAG 2.1 AA — ARIA labels on map, skip-to-content
6. ⏳ Google Workspace — activate connect@healthplusint.com.au
7. ⏳ Build Tier 3 governance — employment contracts (3 versions)
