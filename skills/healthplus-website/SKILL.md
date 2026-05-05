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
4. Allied Health (7 professions remaining)

**NOT in scope:** Nurses, NDIS, mining, metro, UK/Ireland

**International sourcing:** Philippines, India + Eastern Europe
- HPI covers: visa costs, vetting, accommodation
- Client pays: agreed hourly or negotiated rate only

---

## Credentials

### GitHub
- **Repo:** `wgsaus-dotcom/Healthplus`
- **Token:** stored in Claude memory
- **Branch:** `main` → auto-deploys via Cloudflare Pages

### Cloudflare Pages
- **Project:** `healthplus` → `healthplus-3gy.pages.dev` → healthplusint.com.au
- **Zone ID:** `see-claude-memory-#9`
- **Account ID:** `d2586c55db329e1e12cbaf3285d32f1a`
- **API Token (Pages/DNS):** stored in Claude memory

### Cloudflare Worker — hpi-onboarding ✅ DEPLOYED
- **URL:** `https://hpi-onboarding.wgs-aus.workers.dev`
- **Routes:** `POST /api/onboard` | `GET /api/ping`
- **R2 bucket:** `hpi-candidate-docs` ✅
- **KV namespace:** `HPI_ONBOARDING_KV` | ID: `see-claude-memory-#9` ✅
- **Worker token:** `see-claude-memory-#9`
- **Email:** MailChannels (built into Cloudflare — no external service)
  - Candidate receives: branded HTML confirmation from connect@healthplusint.com.au
  - Abhay receives: plain text notification at wgs.aus@gmail.com

### Formspree
- **Endpoint:** `https://formspree.io/f/xpqbdonv`
- **Used in:** submit-a-request.html, urgent modal (index.html), allied-health.html
- **Account:** wgs.aus@gmail.com

### DNS
- Root + www CNAME → `healthplus-3gy.pages.dev` (proxied)
- Google Workspace MX records live
- Old VentraIP A record deleted — do NOT re-add

---

## Website Files (all live)

| File | Description |
|------|-------------|
| `index.html` | Homepage |
| `allied-health.html` | 7 allied health professions |
| `services-remote.html` | Healthcare & Support Workers page |
| `how-we-work.html` | EOR model, obligation cards |
| `submit-a-request.html` | Facility request form → Formspree |
| `ahpra-verify.html` | AHPRA lookup tool |
| `about.html` | About Us |
| `join.html` | Multi-step worker onboarding → Cloudflare Worker |
| `images/logo-healthplus.png` | White bg — use in nav/light surfaces |
| `images/logo-healthplus-transparent.png` | Transparent — use in footer/dark bg |

---

## Forms Summary

| Form | File | Backend | Auto-reply |
|------|------|---------|------------|
| Worker onboarding | join.html | Cloudflare Worker + R2 + KV | ✅ MailChannels to candidate + Abhay |
| Facility request | submit-a-request.html | Formspree xpqbdonv | Configure in Formspree dashboard |
| Urgent modal | index.html (FAB) | Formspree xpqbdonv | Configure in Formspree dashboard |
| Allied health enquiry | allied-health.html | Formspree xpqbdonv | Configure in Formspree dashboard |

---

## Logo Rules

- **Nav:** `logo-healthplus.png` at `height:54px` — NEVER transparent on white nav
- **Footer:** `logo-healthplus-transparent.png` at `height:52px` — NEVER white-bg on dark footer

## Nav HTML (standard)
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

## Footer HTML (standard)
```html
<footer>
  <div class="ft"> <!-- grid: 2fr 1fr 1fr -->
    <div class="fb">
      <img src="images/logo-healthplus-transparent.png" alt="HealthPlus International" style="height:52px;width:auto;display:block;margin-bottom:12px">
      <p>Description...</p>
      <div class="hpi-tagline">People. Care. Compliance.</div>
    </div>
  </div>
</footer>
```
⚠️ CRITICAL: Never close `.fb` div before the `<p>` — stray `</div>` tags collapse the grid.
Footer text: minimum `rgba(255,255,255,.55)` on dark navy.

---

## Design System

```css
--teal: #0B6B6E    --teal-d: #085558   --teal-pale: #E1F5EE
--teal-mid: #9FE1CB  --navy: #1B3A5C   --navy-d: #0D1F33
--off: #F7F8F6     --muted: #5a6a7a
```
**Font:** Montserrat 400–800 | **Icons:** SVG stroke only — NO emojis
**Readability CSS:** Injected in every page `<style>` block — WCAG AA (body 15px+, labels 12px+, inputs 15px, line-height 1.8)

---

## UX Features (all live)

| Feature | Notes |
|---------|-------|
| Trust bar | Fixed below nav — 6 trust signals |
| Floating FAB | "Request Staff Now" → urgent modal → Formspree |
| Mobile bottom nav | SVG icons: Home/About/Request/Join/Call |
| Animated counters | Stats bar counts up on scroll |
| Dual entry cards | "I need staff" / "I'm a healthcare worker" |
| Section CTAs | After Why / How It Works / Workforce / Sourcing |
| Map role pills | LHD sidebar shows available role types |
| Multi-step onboarding | join.html — 3 steps, file uploads, Worker + MailChannels |

---

## Interactive Map LHD Data

| LHD | Shortage | Roles |
|-----|----------|-------|
| Far West | Critical | Healthcare Workers, AINs, Support Workers, Allied Health |
| Western NSW | Severe | Healthcare Workers, AINs, Aged Care Workers, Allied Health |
| Murrumbidgee | High | Healthcare Workers, Support Workers, Aged Care Workers, Allied Health |
| Hunter New England | High | Healthcare Workers, AINs, Support Workers, Allied Health |
| Northern NSW | Moderate | Healthcare Workers, Support Workers, Allied Health |
| Mid North Coast | Moderate | Healthcare Workers, Aged Care Workers, Allied Health |

---

## Content Rules

### NEVER say
- Nurse / nursing / registered nurse / enrolled nurse
- NDIS | Mining | FIFO | Staffing agency
- Police Checked → **National Police Clearance**
- Cert III/IV → **"Cert III, Cert IV or equivalent"**
- UK / Ireland | Metro | was.aus@gmail.com → **wgs.aus@gmail.com**

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
- Sustained contract: "Negotiated rate"
- International: "Ongoing negotiated rate"

---

## Allied Health Professions (7 remaining)
Occupational Therapy · Psychology · Podiatry · Aboriginal & TSI Health · Medical Radiation Practice · Dietetics & Nutrition · Exercise Physiology

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
4. ⏳ Image WebP — convert heroes to WebP + lazy loading
5. ⏳ Accessibility — ARIA labels on map, skip-to-content (before govt procurement)
6. ⏳ Google Workspace — activate connect@healthplusint.com.au
