---
name: healthplus-website
description: Complete build, update and deployment skill for the HealthPlus International website (healthplusint.com.au). Use this skill whenever Abhay mentions HealthPlus International, the healthcare workforce site, updating the site, adding pages, fixing content, changing the map, updating forms, pushing to GitHub, or deploying to Cloudflare. Also trigger when asked to work on the homepage, allied health page, about page, join page, AHPRA verify tool, services page, map, forms, footer, logo, colours, DNS, or any content on healthplusint.com.au. This skill contains the full technical context, credentials, design system, content rules, and deployment workflow so work can resume immediately without re-explaining anything.
---

# HealthPlus International — Website Skill

## Business Context

**Legal name:** Westminster Green Solutions ABN 13 155 901 723
**Trading name:** Health Plus International (legal) / HealthPlus International (brand)
**Domain:** healthplusint.com.au
**Email:** connect@healthplusint.com.au
**Director:** Abhay J Kumar | wgs.aus@gmail.com | +61 411 459 755
**Address:** Unit 4, 44–46 Keeler Street, Carlingford NSW 2118
**Tagline:** People. Care. Compliance.

**Staff types placed:**
1. Healthcare Workers (AINs)
2. Aged Care Workers
3. Support Workers (community care — NOT NDIS)
4. Allied Health (7 professions)

**NOT in scope:** Nurses, NDIS, mining, metro, UK/Ireland

**International sourcing:** Philippines 🇵🇭 + India 🇮🇳 + Eastern Europe 🇪🇺
- HPI covers: visa costs, vetting, accommodation
- Client pays: agreed hourly or negotiated rate only

---

## Credentials

### GitHub
- **Repo:** `wgsaus-dotcom/Healthplus`
- **Token:** `${{ secrets.GH_TOKEN }}`
- **Branch:** `main` → auto-deploys via Cloudflare Pages

### Cloudflare Pages (website hosting)
- **Project:** `healthplus` → `healthplus-3gy.pages.dev` → healthplusint.com.au
- **Zone ID:** `${{ secrets.CF_ZONE_ID }}`
- **Account ID:** `${{ secrets.CF_ACCOUNT_ID }}`
- **API Token:** `${{ secrets.CF_PAGES_TOKEN }}`

### Cloudflare Worker (onboarding) ✅ DEPLOYED
- **Name:** `hpi-onboarding`
- **URL:** `https://hpi-onboarding.wgs-aus.workers.dev`
- **API Token:** `${{ secrets.CF_WORKER_TOKEN }}`
- **R2 bucket:** `hpi-candidate-docs` ✅
- **KV namespace:** `HPI_ONBOARDING_KV` | ID: `${{ secrets.KV_NAMESPACE_ID }}` ✅
- **Email:** MailChannels (built into CF — no external service needed)
  - Candidate → branded HTML from `connect@healthplusint.com.au`
  - Abhay → plain text to `wgs.aus@gmail.com` with all details + reply-to candidate

### Formspree
- **Endpoint:** `https://formspree.io/f/xpqbdonv`
- **Used in:** submit-a-request.html, urgent modal (index.html), allied-health.html
- **Account:** wgs.aus@gmail.com


---

## GitHub Secrets (Settings → Secrets → Actions)

All sensitive credentials are stored as encrypted GitHub Actions secrets:

| Secret Name | Used for |
|-------------|----------|
| `CF_WORKER_TOKEN` | Deploy hpi-onboarding Cloudflare Worker |
| `CF_PAGES_TOKEN` | Cloudflare Pages + DNS management |
| `CF_ACCOUNT_ID` | Cloudflare account ID |
| `CF_ZONE_ID` | healthplusint.com.au zone |
| `KV_NAMESPACE_ID` | HPI_ONBOARDING_KV namespace |

Reference in GitHub Actions workflows as `${{ secrets.CF_WORKER_TOKEN }}` etc.

---

## Deployment Code

### Push file to GitHub
```python
import base64, json, urllib.request, time

TOKEN = "${{ secrets.GH_TOKEN }}"
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

# Deploy single file
deploy("index.html", "Your commit message here")

# Deploy multiple files
for f in ["index.html", "allied-health.html", "services-remote.html"]:
    deploy(f, "Batch update")
```

### Deploy Cloudflare Worker
```python
import urllib.request, json

CF_TOKEN = "${{ secrets.CF_WORKER_TOKEN }}"
ACCOUNT_ID = "${{ secrets.CF_ACCOUNT_ID }}"
KV_ID = "${{ secrets.KV_NAMESPACE_ID }}"

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
    f'--{boundary}\r\nContent-Disposition: form-data; name="metadata"\r\nContent-Type: application/json\r\n\r\n'
    f'{meta}\r\n'
    f'--{boundary}\r\nContent-Disposition: form-data; name="worker.js"; filename="worker.js"\r\nContent-Type: application/javascript+module\r\n\r\n'
    f'{script}\r\n'
    f'--{boundary}--\r\n'
).encode('utf-8')

req = urllib.request.Request(
    f'https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/workers/scripts/hpi-onboarding',
    data=body, method='PUT',
    headers={'Authorization': f'Bearer {CF_TOKEN}', 'Content-Type': f'multipart/form-data; boundary={boundary}'}
)
with urllib.request.urlopen(req) as r:
    result = json.loads(r.read())
    print('✅ Worker deployed' if result.get('success') else f'❌ {result.get("errors")}')
```

### Alternative: Deploy worker via wrangler CLI
```bash
cd /home/claude/hpi-worker
CLOUDFLARE_API_TOKEN="${{ secrets.CF_WORKER_TOKEN }}" \
CLOUDFLARE_ACCOUNT_ID="${{ secrets.CF_ACCOUNT_ID }}" \
wrangler deploy
```

### wrangler.toml (reference)
```toml
name = "hpi-onboarding"
main = "worker.js"
compatibility_date = "2024-01-01"
account_id = "${{ secrets.CF_ACCOUNT_ID }}"

[[r2_buckets]]
binding = "HPI_CANDIDATE_DOCS"
bucket_name = "hpi-candidate-docs"

[[kv_namespaces]]
binding = "HPI_ONBOARDING_KV"
id = "${{ secrets.KV_NAMESPACE_ID }}"
```

---

## Website Files (all live)

| File | Description |
|------|-------------|
| `index.html` | Homepage — hero, stats, dual entry cards, animated counters, map, how it works, workforce, sourcing, register, section CTAs |
| `allied-health.html` | 7 allied health professions, shortage callouts, registration form |
| `services-remote.html` | Healthcare & Support Workers page |
| `how-we-work.html` | EOR model, obligation cards (6 SVG icons), process steps |
| `submit-a-request.html` | Facility request form → Formspree |
| `ahpra-verify.html` | AHPRA lookup tool |
| `about.html` | About Us — story, director bio, differentiators |
| `join.html` | Multi-step worker onboarding → Cloudflare Worker + MailChannels |
| `images/logo-healthplus.png` | White bg — nav/light surfaces |
| `images/logo-healthplus-transparent.png` | Transparent — footer/dark backgrounds |

---

## Forms Summary

| Form | File | Backend | Auto-reply |
|------|------|---------|------------|
| Worker onboarding | join.html | CF Worker + R2 + KV | ✅ MailChannels — candidate HTML + Abhay plain text |
| Facility request | submit-a-request.html | Formspree xpqbdonv | Configure in Formspree dashboard |
| Urgent modal | index.html FAB | Formspree xpqbdonv | Configure in Formspree dashboard |
| Allied health enquiry | allied-health.html | Formspree xpqbdonv | Configure in Formspree dashboard |

---

## Logo Rules

- **Nav:** `logo-healthplus.png` at `height:54px` — NEVER transparent on white nav
- **Footer:** `logo-healthplus-transparent.png` at `height:52px` — NEVER white-bg on dark footer

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
    <a href="tel:+61411459755" style="font-size:11.5px;font-weight:500;color:#5a6a7a!important;text-decoration:none!important;white-space:nowrap;line-height:1.35;font-family:inherit"><strong style="font-weight:700;color:#1B3A5C;margin-right:3px">Phone:</strong>+61 411 459 755</a>
    <a href="mailto:connect@healthplusint.com.au" style="font-size:11.5px;font-weight:500;color:#5a6a7a!important;text-decoration:none!important;white-space:nowrap;line-height:1.35;font-family:inherit"><strong style="font-weight:700;color:#1B3A5C;margin-right:3px">Email:</strong>connect@healthplusint.com.au</a>
  </div>
</nav>
```

---

## Footer HTML (standard — all pages)

```html
<footer>
  <div class="ft"> <!-- grid: 2fr 1fr 1fr -->
    <div class="fb">
      <img src="images/logo-healthplus-transparent.png" alt="HealthPlus International" style="height:52px;width:auto;display:block;margin-bottom:12px">
      <p>Description text here.</p>
      <div class="hpi-tagline">People. Care. Compliance.</div>
    </div>
    <div class="fc"><h4>FOR FACILITIES</h4>...links...</div>
    <div class="fc"><h4>FOR HEALTHCARE WORKERS</h4>...links...</div>
  </div>
  <div class="fb-bot">
    <p>© 2026 HealthPlus International Pty Ltd · ABN 13 155 901 723 · Sydney, NSW</p>
    <a href="mailto:connect@healthplusint.com.au">connect@healthplusint.com.au</a>
    <a href="tel:+61411459755">+61 411 459 755</a>
  </div>
  <div class="ack">
    <div class="ack-bar"></div>
    <p>HealthPlus International acknowledges the Traditional Custodians...</p>
  </div>
</footer>
```

⚠️ **CRITICAL:** Never close `.fb` div before the `<p>` tag — stray `</div>` tags collapse the entire footer grid.
**Footer text:** minimum `rgba(255,255,255,.55)` on dark navy.

---

## Design System

```css
--teal: #0B6B6E        /* Primary — buttons, links, accents */
--teal-d: #085558      /* Hover */
--teal-pale: #E1F5EE   /* Light highlight bg */
--teal-mid: #9FE1CB    /* Text on dark backgrounds */
--navy: #1B3A5C        /* Headings */
--navy-d: #0D1F33      /* Hero/footer/dark sections */
--off: #F7F8F6         /* Alternate section bg */
--muted: #5a6a7a
```

**Font:** Montserrat 400–800 (Google Fonts)
**Icons:** Thin-stroke SVG only — 1.6–1.65px stroke, `round` linecap/linejoin. NO emojis anywhere.
**Readability CSS:** Injected at end of every `<style>` block — WCAG AA (body 15px+, labels 12px+, inputs 15px, line-height 1.8)

---

## UX Features (all live)

| Feature | Notes |
|---------|-------|
| Trust bar | Fixed below nav — dark navy, 6 trust signals |
| Floating FAB | "Request Staff Now" → 3-field urgent modal → Formspree |
| Mobile bottom nav | SVG icons: Home/About/Request/Join/Call |
| Animated counters | Stats bar counts up on IntersectionObserver scroll |
| Dual entry cards | "I need staff" → submit-a-request | "I'm a healthcare worker" → join.html |
| Section CTAs | After Why / How It Works / Workforce / Sourcing |
| Map with stats | LHD sidebar: shortage level, facility count, towns, role pills |
| Multi-step onboarding | join.html — 3 steps, drag-drop uploads, Worker + MailChannels |

---

## Interactive Map — LHD Data

```javascript
farwest:  { name:'Far West LHD', shortage:'Critical',
  towns:['Broken Hill','Wilcannia','Bourke','Cobar','White Cliffs','Tibooburra'],
  stats:[{l:'Workforce shortage',v:'Critical'},{l:'Health facilities',v:'12 sites'},
         {l:'Response time',v:'Same day'},{l:'Distance from Sydney',v:'1,100+ km'}],
  roles:['Healthcare Workers','AINs','Support Workers','Allied Health'],
  center:[-31.5,143.0], zoom:7 }

western:  { name:'Western NSW LHD', shortage:'Severe',
  towns:['Dubbo','Orange','Bathurst','Parkes','Forbes','Mudgee'],
  stats:[{l:'Workforce shortage',v:'Severe'},{l:'Health facilities',v:'22 sites'},
         {l:'Response time',v:'24 hours'},{l:'Distance from Sydney',v:'380–900 km'}],
  roles:['Healthcare Workers','AINs','Aged Care Workers','Allied Health'],
  center:[-32.5,148.2], zoom:7 }

murrumbidgee: { name:'Murrumbidgee LHD', shortage:'High',
  towns:['Wagga Wagga','Griffith','Albury','Deniliquin','Tumut'],
  stats:[{l:'Workforce shortage',v:'High'},{l:'Health facilities',v:'18 sites'},
         {l:'Response time',v:'24 hours'},{l:'Distance from Sydney',v:'450–650 km'}],
  roles:['Healthcare Workers','Support Workers','Aged Care Workers','Allied Health'],
  center:[-35.2,146.8], zoom:7 }

hne:      { name:'Hunter New England LHD', shortage:'High',
  towns:['Tamworth','Armidale','Moree','Inverell','Gunnedah'],
  stats:[{l:'Workforce shortage',v:'High'},{l:'Health facilities',v:'28 sites'},
         {l:'Response time',v:'24 hours'},{l:'Distance from Sydney',v:'300–700 km'}],
  roles:['Healthcare Workers','AINs','Support Workers','Allied Health'],
  center:[-30.5,150.5], zoom:7 }

northern: { name:'Northern NSW LHD', shortage:'Moderate',
  towns:['Lismore','Grafton','Ballina','Casino','Kyogle'],
  stats:[{l:'Workforce shortage',v:'Moderate'},{l:'Health facilities',v:'14 sites'},
         {l:'Response time',v:'24 hours'},{l:'Distance from Sydney',v:'700–900 km'}],
  roles:['Healthcare Workers','Support Workers','Allied Health'],
  center:[-29.0,152.8], zoom:8 }

mnc:      { name:'Mid North Coast LHD', shortage:'Moderate',
  towns:['Port Macquarie','Coffs Harbour','Kempsey','Taree'],
  stats:[{l:'Workforce shortage',v:'Moderate'},{l:'Health facilities',v:'11 sites'},
         {l:'Response time',v:'24 hours'},{l:'Distance from Sydney',v:'380–550 km'}],
  roles:['Healthcare Workers','Aged Care Workers','Allied Health'],
  center:[-31.0,152.7], zoom:8 }
```

---

## Content Rules

### NEVER say
- Nurse / nursing / registered nurse / enrolled nurse
- NDIS | Mining | FIFO | Staffing agency
- Police Checked → **National Police Clearance**
- Cert III/IV → **"Cert III, Cert IV or equivalent"**
- UK / Ireland sourcing | Metro | was.aus@gmail.com → **wgs.aus@gmail.com**

### ALWAYS say
- HealthPlus International (one word brand)
- Healthcare workers / AINs / support workers / allied health
- Strategically place healthcare staff
- Regional and remote NSW communities
- Employer of record / one all-inclusive invoice
- National Police Clearance
- AHPRA verified (allied health only)
- 24hr response | People. Care. Compliance.

### Qualification wording
- "Cert III, Cert IV or equivalent qualification"
- "International qualifications mapped to AQF Level 3 — gap training arranged prior to placement"

### Pricing
- Rotation: "Healthcare Worker Award rate + remote loading + margin"
- Sustained: "Negotiated rate"
- International: "Ongoing negotiated rate"

---

## Allied Health Professions (7 remaining)
Occupational Therapy · Psychology · Podiatry · Aboriginal & TSI Health · Medical Radiation Practice · Dietetics & Nutrition · Exercise Physiology

**Removed:** Physiotherapy · Optometry · Speech Pathology · Paramedicine · Dental

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

## Skills in GitHub (skills/ folder)
- `skills/healthplus-branding/SKILL.md`
- `skills/healthplus-document-creator/SKILL.md`
- `skills/healthplus-policy-procedure/SKILL.md`
- `skills/healthplus-website/SKILL.md`

---

## Pending
1. ⏳ Formspree auto-reply — configure in dashboard for facility request forms
2. ⏳ Testimonials — need 2–3 real quotes from facility contacts or placed workers
3. ⏳ WhatsApp — add wa.me/+61411459755 alongside FAB
4. ⏳ Image WebP — convert heroes to WebP + lazy loading (regional users on slow connections)
5. ⏳ Accessibility — ARIA labels on map, skip-to-content (before govt procurement)
6. ⏳ Google Workspace — activate connect@healthplusint.com.au
