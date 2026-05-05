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
**Director:** Abhay J Kumar | was.aus@gmail.com | +61 411 459 755
**Address:** Unit 4, 44–46 Keeler Street, Carlingford NSW 2118
**Founded:** 2026, Sydney NSW
**Model:** Labour hire employer of record — regional and remote NSW
**Tagline:** People. Care. Compliance.

**Staff types placed (in this order):**
1. Healthcare Workers (AINs — Assistants in Nursing)
2. Aged Care Workers
3. Support Workers (community care — NOT NDIS)
4. Allied Health (selected professions)

**NOT in scope:** Nurses/nursing, NDIS, mining, metro, UK/Ireland sourcing

**International sourcing:** Philippines + India ONLY

---

## Credentials

### GitHub
- **Repo:** `wgsaus-dotcom/Healthplus`
- **Branch:** `main` — auto-deploys to Cloudflare Pages on push
- **Token:** `stored-in-claude-memory`

### Cloudflare Pages
- **Project:** `healthplus` | **URL:** `healthplus-3gy.pages.dev`
- **Custom domains:** `healthplusint.com.au` + `www.healthplusint.com.au`
- **Zone ID:** `bf73fdbf81118998720438469aa1d19f`
- **Account ID:** `d2586c55db329e1e12cbaf3285d32f1a`
- **API Token:** `stored-in-claude-memory`
- **Permissions:** Zone Read, DNS Edit, Pages Edit *(does NOT have Workers/R2/KV — needs separate token for worker deploy)*

### Cloudflare Worker (onboarding)
- **Worker name:** `hpi-onboarding` *(script ready at `/home/claude/hpi-worker/worker.js` — NOT yet deployed)*
- **R2 bucket:** `hpi-candidate-docs` ✅ created
- **KV namespace:** `HPI_ONBOARDING_KV` | ID: `5ef5f19fa9f8421bbd4e6f391d0d9f94` ✅ created
- **To deploy:** Create new CF API token with Workers Scripts Edit + R2 Storage Edit + Workers KV Storage Edit → `cd /home/claude/hpi-worker && wrangler deploy`

### DNS
- Root + www CNAME → `healthplus-3gy.pages.dev` (proxied)
- 5× Google Workspace MX records live
- Old VentraIP A record (110.232.143.170) deleted — do NOT re-add

---

## Website Files (all live)

| File | Description |
|------|-------------|
| `index.html` | Homepage — hero, stats, dual entry cards, animated counters, map, how it works, workforce, sourcing, register, section CTAs |
| `allied-health.html` | Allied health — 11 professions (Dental removed), shortage cards, registration form |
| `services-remote.html` | Healthcare & Support Workers page (repurposed from nursing) |
| `how-we-work.html` | EOR model, obligation cards (6 SVG icons), process steps, who we serve |
| `submit-a-request.html` | Facility request form — multi-field |
| `ahpra-verify.html` | AHPRA registration verification tool |
| `about.html` | About Us — story, People.Care.Compliance. pillars, director bio, differentiators |
| `join.html` | Multi-step healthcare worker onboarding — 3 steps, drag-drop uploads, Cloudflare Worker |
| `images/logo-healthplus.png` | New HealthPlus logo — white background (use in nav/light surfaces) |
| `images/logo-healthplus-transparent.png` | Transparent logo — use in footer/dark backgrounds |

---

## Logo

**The mark:** Dual medical cross — navy + teal overlapping crosses with curved flow lines. 3D rendered.
**Wordmark:** `HealthPlus International` (one word, mixed case for brand; two words "Health Plus" in legal/ABN contexts)

### Nav (all pages)
```html
<a href="index.html" class="nav-logo">
  <img src="images/logo-healthplus.png" alt="HealthPlus International" style="height:54px;width:auto;display:block">
</a>
```

### Footer (dark background — use transparent version)
```html
<img src="images/logo-healthplus-transparent.png" alt="HealthPlus International" style="height:52px;width:auto;display:block;margin-bottom:12px">
```

**NEVER** use `logo-healthplus.png` (white bg) in the footer — it creates a white box on dark navy.

---

## Navigation (standard across all pages)

```html
<nav>
  <a href="index.html" class="nav-logo">
    <img src="images/logo-healthplus.png" alt="HealthPlus International" style="height:54px;width:auto;display:block">
  </a>
  <ul class="nav-links">
    <li><a href="index.html#map-sec">Regions</a></li>
    <li><a href="allied-health.html">Allied Health</a></li>
    <li><a href="services-remote.html">Healthcare & Support</a></li>
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

**Nav height:** 72–74px | **Mobile:** hide nav-links below 900px, show mobile bottom nav

---

## Design System

```css
--teal: #0B6B6E       /* Primary — buttons, links, accents */
--teal-d: #085558     /* Hover */
--teal-pale: #E1F5EE  /* Light highlight bg */
--teal-mid: #9FE1CB   /* Text on dark backgrounds */
--navy: #1B3A5C       /* Headings */
--navy-d: #0D1F33     /* Hero/footer/dark sections */
--off: #F7F8F6        /* Alternate section bg */
--border: rgba(11,107,110,0.12)
--muted: #5a6a7a
```

**Font:** Montserrat 400/500/600/700/800 via Google Fonts
**Icons:** Thin-stroke SVG only — 1.6–1.65px stroke, no emojis anywhere
**Readability override CSS:** Injected at end of every `<style>` block — WCAG AA minimum sizes for older readers (body 15px+, labels 12px+, inputs 15px, line-height 1.8)

---

## UX Features (all live)

| Feature | Description |
|---------|-------------|
| **Trust bar** | Fixed below nav — dark navy, 6 trust signals with ✓ marks |
| **Floating FAB** | "Request Staff Now" — teal pill, pulse dot, opens 3-field urgent modal |
| **Urgent modal** | Role + Region + Timeframe + Email → Formspree |
| **Mobile bottom nav** | SVG icons: Home / About / Request⚡ / Join / Call |
| **Animated counters** | Stats bar counts up on scroll (IntersectionObserver) |
| **Dual entry cards** | Below stats: "I need staff" → submit-a-request | "I'm a healthcare worker" → join.html |
| **Section CTAs** | After Why / How It Works / Workforce / Sourcing — contextual CTAs |
| **Map upgrade** | LHD sidebar shows role type pills per region |
| **Multi-step onboarding** | join.html — 3 steps, drag-drop file uploads, posts to Cloudflare Worker |

---

## Interactive Map (Leaflet.js)

- **Library:** Leaflet 1.9.4 (cdnjs)
- **Tiles:** CartoDB light — no API key needed
- **Default:** centre `[-32.5, 147.0]` zoom 6
- **LHD data includes:** `roles` array → rendered as teal pills in sidebar

| ID | LHD | Shortage | Roles |
|----|-----|----------|-------|
| farwest | Far West LHD | Critical | Healthcare Workers, AINs, Support Workers, Allied Health |
| western | Western NSW LHD | Severe | Healthcare Workers, AINs, Aged Care Workers, Allied Health |
| murrumbidgee | Murrumbidgee LHD | High | Healthcare Workers, Support Workers, Aged Care Workers, Allied Health |
| hne | Hunter New England LHD | High | Healthcare Workers, AINs, Support Workers, Allied Health |
| northern | Northern NSW LHD | Moderate | Healthcare Workers, Support Workers, Allied Health |
| mnc | Mid North Coast LHD | Moderate | Healthcare Workers, Aged Care Workers, Allied Health |

---

## Content Rules — LOCKED

### NEVER say
- Nurse / nursing / nurses / enrolled nurse / registered nurse
- NDIS (not an NDIS provider)
- Mining / resources
- FIFO / fly-in fly-out
- Staffing agency / nursing agency
- Police Checked (say **National Police Clearance**)
- "Cert III/IV" (say **"Cert III, Cert IV or equivalent"**)
- UK / Ireland (removed from international sourcing)
- Metro / city placements

### ALWAYS say
- HealthPlus International (one word brand display)
- Healthcare workers / AINs / support workers / allied health
- Strategically place healthcare staff
- Regional and remote NSW communities
- Employer of record
- National Police Clearance
- AHPRA verified (allied health only)
- 24hr response
- People. Care. Compliance.

### International sourcing — ONLY
- 🇵🇭 Philippines → healthcare workers + aged care workers
- 🇮🇳 India → healthcare workers + aged care workers

### International pipeline — HPI covers
- Visa costs ✅
- Vetting costs ✅
- Accommodation ✅
- Client pays only: agreed hourly or negotiated placement rate

### Qualification wording
- "Cert III, Cert IV or equivalent qualification"
- "International qualifications are mapped to AQF Level 3 and gap training is organised prior to placement."

### Pricing terms
- Rotation cover: "Healthcare Worker Award rate + remote loading + margin"
- Sustained contract: "Negotiated rate"
- International pipeline: "Ongoing negotiated rate"

---

## Allied Health Professions (11 — Dental removed)
Physiotherapy · Occupational Therapy · Psychology · Paramedicine · Podiatry · Optometry · Speech Pathology · Aboriginal & TSI Health · Medical Radiation Practice · Dietetics & Nutrition · Exercise Physiology

---

## Footer Structure (all pages)

```html
<footer>
  <div class="ft">  <!-- grid: 2fr 1fr 1fr -->
    <div class="fb">
      <img src="images/logo-healthplus-transparent.png" alt="HealthPlus International" style="height:52px;width:auto;display:block;margin-bottom:12px">
      <p>Description text</p>
      <div class="hpi-tagline">People. Care. Compliance.</div>
    </div>
    <div class="fc"><h4>WORKFORCE</h4>...links...</div>
    <div class="fc"><h4>COMPANY</h4>...links...</div>
  </div>
  <div class="fb-bot">...copyright + email + phone...</div>
  <div class="ack"><div class="ack-bar"></div><p>Acknowledgement of Country</p></div>
</footer>
```

**Critical:** `.fb` must contain logo + `<p>` + tagline all inside — never close `.fb` before the paragraph. Stray `</div>` tags break the grid completely.

**Footer text colours:** minimum rgba(255,255,255,.55) on dark navy background.

---

## Formspree
- Action: `https://formspree.io/f/REPLACE_ME` (not yet activated)
- Replace `REPLACE_ME` in: `index.html`, `allied-health.html`, `submit-a-request.html`
- Urgent modal also uses Formspree — same endpoint

---

## Pending / To Do
1. ⏳ Wire up Formspree — replace `REPLACE_ME` with live endpoint
2. ⏳ Deploy `hpi-onboarding` Worker — needs CF API token with Workers + R2 + KV permissions
3. ⏳ Testimonials — need 2–3 real quotes from facility contacts or placed workers
4. ⏳ WhatsApp link — add wa.me/+61411459755 alongside FAB
5. ⏳ Image WebP conversion — hero images to WebP + lazy loading
6. ⏳ Accessibility — WCAG 2.1 AA: ARIA labels on map, skip-to-content, keyboard nav
7. ⏳ Google Workspace — activate connect@healthplusint.com.au
8. ⏳ AHPRA PIE — apply when operational

---

## Skills stored in GitHub repo (skills/ folder)
- `skills/healthplus-branding/SKILL.md`
- `skills/healthplus-document-creator/SKILL.md`
- `skills/healthplus-policy-procedure/SKILL.md`
