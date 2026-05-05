# Health Plus International — Website

**Domain:** healthplusint.com.au  
**Hosting:** Cloudflare Pages (`healthplus-3gy.pages.dev`)  
**Repo:** `wgsaus-dotcom/Healthplus`  
**ABN:** 13 155 901 723

---

## What We Do

Health Plus International strategically places healthcare staff in regional and remote NSW communities — connecting motivated, credentialled workers to the facilities and services that need them most. We are the employer of record.

**Staff we place:**
- Enrolled Nurses (EN)
- AIN (Assistant in Nursing)
- Aged Care Workers (Cert III/IV)
- Support Workers (NDIS / Community Care)
- Allied Health — selected professions

**International sourcing:**
- Philippines & India → Nurses + Aged Care Workers
- UK & Ireland → Nurses only

---

## Site Pages

| File | Page | Status |
|------|------|--------|
| `index.html` | Homepage | ✅ Live |
| `services-remote.html` | Nursing & Clinical Workforce | ✅ Live |
| `allied-health.html` | Allied Health | ✅ Live |
| `how-we-work.html` | How We Work (EOR model) | ✅ Live |
| `submit-a-request.html` | Submit a Workforce Request | ✅ Live |
| `ahpra-verify.html` | AHPRA Verification Tool | ✅ Live |
| `regions/far-west-nsw.html` | Far West LHD Region Page | ✅ Live |

**Removed:** `mining-resources.html` — mining/resources scope removed May 2026.

**To build:**
- `about.html`
- `aged-care.html`
- `nurses.html`
- `contact.html`

---

## Deployment

Every push to `main` auto-deploys via Cloudflare Pages.

**Images:** `/images/` — hero-nurse.jpg, hero-nurse2.jpg, hero-outback.jpg, banner-outback.jpg

**Forms:** Formspree — replace `REPLACE_ME` in index.html, allied-health.html, submit-a-request.html once Formspree endpoint is activated.

---

## Brand Rules

- Brand = **BRIDGE** — not agency, not vendor
- Never: "nursing agency", "staffing agency", "FIFO", "fly-in fly-out", "fill your vacancy"
- Always: "strategically place healthcare staff", "regional and remote", "employer of record", "credentialled and verified"
- Cannot claim NSW Health supplier status yet
- Tone: bold, direct, community mission — not a vendor pitch

---

## Design System

| Token | Value | Use |
|-------|-------|-----|
| `--teal` | `#0B6B6E` | Primary |
| `--teal-d` | `#085558` | Hover |
| `--teal-pale` | `#E1F5EE` | Light bg |
| `--teal-mid` | `#9FE1CB` | On dark |
| `--navy` | `#1B3A5C` | Headings |
| `--navy-d` | `#0D1F33` | Hero / footer |
| `--off` | `#F7F8F6` | Section bg |
| `--muted` | `#5a6a7a` | Body text |

**Font:** Montserrat (400–800) via Google Fonts  
**Map:** Leaflet 1.9.4 — CartoDB light tiles, no API key required

---

*Last updated: May 2026*
