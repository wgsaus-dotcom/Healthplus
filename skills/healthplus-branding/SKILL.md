---
name: healthplus-branding
description: Complete brand identity and design system for HealthPlus International (healthplusint.com.au). Use this skill whenever creating ANY content, document, design, copy, social post, email, PDF, presentation, or visual asset for HealthPlus International. Trigger for ANY mention of HealthPlus branding, logo, colours, fonts, tone, design system, letterhead, email signature, social media, brand guidelines, or requests like "make this on-brand", "what colour is HPI", "what font does HealthPlus use". Also trigger when writing any HealthPlus copy to ensure correct terminology, voice, and messaging. Load before producing anything for HealthPlus International.
---

# HealthPlus International — Brand Identity Skill

## Brand Essence

**Legal name:** Westminster Green Solutions ABN 13 155 901 723  
**Trading name:** Health Plus International (legal) / HealthPlus International (brand display)  
**Tagline:** People. Care. Compliance.  
**Domain:** healthplusint.com.au  
**Mission:** Strategically place healthcare staff in regional and remote NSW communities.  
**Positioning:** BRIDGE — connecting motivated credentialled healthcare workers to underserved communities.

---

## Logo System

### The Mark (May 2026)
Dual medical cross — navy/deep blue cross overlapping teal cross with flowing curved lines. 3D rendered. Professional corporate style.

### Logo files (GitHub repo: wgsaus-dotcom/Healthplus)
| File | Use |
|------|-----|
| `images/logo-healthplus.png` | White/light backgrounds — nav, documents |
| `images/logo-healthplus-transparent.png` | Dark backgrounds, overlays |

### Name treatment
- Brand display: `HealthPlus International` (one word, mixed case)
- Legal/ABN contexts: `Health Plus International` (two words, as registered)
- Sub-line: `INTERNATIONAL` — uppercase, letter-spacing: 3px

### Tagline display
`— People. Care. Compliance. —` with short teal dashes either side

### Web nav
```html
<a href="index.html" class="logo">
  <img src="images/logo-healthplus.png" alt="HealthPlus International"
       style="height:46px;width:auto;display:block">
</a>
```

### Web footer
```html
<img src="images/logo-healthplus.png" alt="HealthPlus International"
     style="height:52px;width:auto;display:block;margin-bottom:10px">
```

### Logo rules
- Min height: 40px web / 25mm print
- Clear space: height of "H" on all sides
- Never stretch, recolour, rotate, or add shadows
- Light surfaces: logo-healthplus.png | Dark surfaces: logo-healthplus-transparent.png

---

## Colour Palette

### Primary
| Token | Hex | Use |
|-------|-----|-----|
| Teal | `#0B6B6E` | Primary — buttons, links, accents |
| Deep Navy | `#0B3C5D` | Logo navy, trust colour |
| Navy | `#1B3A5C` | Headings, section titles |
| Dark Navy | `#0D1F33` | Hero bg, letterhead, footer |

### Supporting
| Token | Hex | Use |
|-------|-----|-----|
| Teal Dark | `#085558` | Hover |
| Teal Pale | `#E1F5EE` | Highlight boxes, card bg |
| Teal Mid | `#9FE1CB` | Text on dark bg |
| Off White | `#F7F8F6` | Alternate section bg |
| Muted | `#5a6a7a` | Body text |

### CSS Variables
```css
:root {
  --teal:#0B6B6E; --teal-d:#085558; --teal-pale:#E1F5EE; --teal-mid:#9FE1CB;
  --navy:#1B3A5C; --navy-deep:#0B3C5D; --navy-d:#0D1F33;
  --off:#F7F8F6; --border:rgba(11,107,110,0.12); --muted:#5a6a7a;
}
```

### ReportLab (PDF)
```python
TEAL=colors.HexColor('#0B6B6E'); TEAL_PALE=colors.HexColor('#E1F5EE')
TEAL_MID=colors.HexColor('#9FE1CB'); NAVY=colors.HexColor('#1B3A5C')
NAVY_DEEP=colors.HexColor('#0B3C5D'); NAVY_D=colors.HexColor('#0D1F33')
OFF=colors.HexColor('#F7F8F6'); MUTED=colors.HexColor('#5a6a7a')
```

---

## Typography

### Web: Montserrat
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```
| Weight | Use |
|--------|-----|
| 800 | H1, hero headlines |
| 700 | Buttons, section headings, nav |
| 600 | Sub-headings, card titles |
| 500 | Labels, callouts |
| 400 | Body text |
| 300 | Tagline "People. Care. Compliance." |

### PDF: Helvetica / Helvetica-Bold / Helvetica-Oblique
Never use Unicode subscript/superscript in PDFs — renders as black boxes.

---

## Brand Voice

### Tone: Bold · Direct · Community-first · Confident · Compliant

### NEVER say
nursing agency / staffing agency / FIFO / fly-in fly-out / fill your vacancy /
"remote only" (always "regional and remote") / "solutions" / "we care deeply"

### ALWAYS say
strategically place healthcare staff / regional and remote NSW communities /
employer of record / one all-inclusive invoice / AHPRA verified / police checked /
credentialled / 24hr response / specific town names (Broken Hill, Walgett, Bourke)

### Core phrases
- "People. Care. Compliance."
- "The workforce exists. The need is real. We are the bridge."
- "Strategically placing healthcare staff where communities need them most."

---

## Staff Types (this order always)
EN → AIN → Aged Care Workers → Support Workers (NDIS/community) → Allied Health (selected)

## International Sourcing
- Philippines + India = Nurses + Aged Care Workers
- UK + Ireland = Nurses only

## Claims — Cannot Say Yet
No "NSW Health approved supplier" / "government contracted" / "on the panel"
Safe: "Meeting NSW Health credentialling standards" / "all staff verified prior to deployment"

---

## Design Patterns (web)

### Hero: navy-d left panel + CSS background image right (NEVER img tag for hero)
### Stats bar: full-width teal, 4 columns, white numbers
### Cards: white bg, --border, border-radius:14px, hover translateY(-4px)
### Buttons: bg #0B6B6E → hover #085558, border-radius:7px, font-weight:700
### Section labels: 10px / weight 700 / letter-spacing 3px / UPPERCASE / color:teal

---

## PDF Letterhead

### Header band: 22mm, #0D1F33 bg, logo left, contacts right, 3mm teal strip below

### Footer (ALWAYS build bottom-up — never overlap flag bar with text)
```
y=8:   Aboriginal flag bar (5px) — gold #E8A020 / red #CC3300 / black #111111
y=20:  Address line + CONFIDENTIAL (right)
y=30:  Company name + Page N (right, teal)
y=41:  Teal rule 0.6px
```

### Margins: ML=MR=2.2cm · MT=3.8cm · MB=3.0cm

---

## Acknowledgement of Country (always in web footer)
> HealthPlus International acknowledges the Traditional Custodians of Country throughout Australia and recognises their continuing connection to land, waters and community. We pay our respects to Aboriginal and Torres Strait Islander peoples, and to Elders past, present and emerging.

Footer bar: `background:linear-gradient(to bottom,#E8A020,#CC3300,#000)`

---

## Company Details
| | |
|-|-|
| Legal | Westminster Green Solutions ABN 13 155 901 723 |
| Brand | HealthPlus International |
| Tagline | People. Care. Compliance. |
| Phone | +61 411 459 755 |
| Email | connect@healthplusint.com.au |
| Director | Abhay J Kumar — was.aus@gmail.com |
| Address | Unit 4, 44–46 Keeler Street, Carlingford NSW 2118 |
