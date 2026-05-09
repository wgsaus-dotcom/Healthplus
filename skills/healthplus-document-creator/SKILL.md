---
name: healthplus-document-creator
description: Create branded PDF documents for HealthPlus International — agreements, letters, proposals, reports, invoices, placement confirmations, compliance documents, and any formal correspondence on the HealthPlus letterhead. Use this skill whenever Abhay asks to create, generate, draft, produce, or build ANY formal document, letter, agreement, form, report, proposal, or PDF for HealthPlus International. Trigger for: "create a letter", "generate an agreement", "make a document", "write up a contract", "produce a report", "draft a proposal", "make an invoice", "placement confirmation", "create a staff agreement", or any request to produce a formal document. Always produces professionally branded output using the HealthPlus letterhead with correct footer, logo, colours, and typography. Load healthplus-branding skill for full colour/logo reference.
---

# HealthPlus International — Document Creator Skill

## Overview

All HealthPlus documents are generated with Python + ReportLab. Every document uses the same letterhead canvas, footer, and brand tokens. Output goes to `/mnt/user-data/outputs/HPI_[Type]_[Descriptor].pdf`.

---

## Session Start — Run This First

Before running any ReportLab script, always fetch the logo:

```bash
mkdir -p /home/claude/images
curl -s -o /home/claude/images/logo-healthplus.png "https://healthplusint.com.au/images/logo-healthplus-transparent.png"
pip install reportlab pillow --break-system-packages
```

The `draw_page` function has a try/except fallback to a text wordmark if the file isn't present — but always fetch it first.

---

## Company Identity (Critical — read before any legal or commercial document)

**The Company** = **Westminster Green Solutions Pty Ltd** (ABN 13 155 901 723)
- 12 years operating history across multiple sectors: NDIS labour hire, waste/recycling management
- Sole director: Abhay J Kumar
- **HealthPlus International** is an **early-stage trading name only** — it is not a separate legal entity

In any legal or commercial document:
- Refer to the contracting party as **Westminster Green Solutions Pty Ltd (ABN 13 155 901 723) trading as Health Plus International**
- Never imply HealthPlus International has independent legal standing
- Include a clarifying recital in agreements: *"HealthPlus International is a trading name of Westminster Green Solutions Pty Ltd, a company with 12 years of operating history across health workforce, NDIS labour hire, and environmental services sectors."*

---

## Setup

```bash
pip install reportlab pillow --break-system-packages
```

---

## Core Canvas Template (copy every time)

```python
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.lib import colors
from reportlab.platypus import (
    Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate as PT
from datetime import date

# Brand colours
TEAL=colors.HexColor('#0B6B6E'); TEAL_D=colors.HexColor('#085558')
TEAL_PALE=colors.HexColor('#E1F5EE'); TEAL_MID=colors.HexColor('#9FE1CB')
NAVY=colors.HexColor('#1B3A5C'); NAVY_DEEP=colors.HexColor('#0B3C5D')
NAVY_D=colors.HexColor('#0D1F33'); OFF=colors.HexColor('#F7F8F6')
MUTED=colors.HexColor('#5a6a7a'); WHITE=colors.white
WARN=colors.HexColor('#FFF8E1'); WARN_BRD=colors.HexColor('#F0C030')

W, H = A4
ML=MR=2.2*cm; MT=3.8*cm; MB=3.0*cm
PW = W - ML - MR
```

---

## Letterhead Canvas Function

```python
def draw_page(c, doc):
    c.saveState()
    band = 22*mm

    # ── HEADER BAND ──────────────────────────────────────────────────────────
    c.setFillColor(NAVY_D)
    c.rect(0, H-band, W, band, fill=1, stroke=0)

    # Logo image (preferred — fetched to /home/claude/images/logo-healthplus.png at session start)
    try:
        from reportlab.lib.utils import ImageReader
        logo_img = ImageReader('/home/claude/images/logo-healthplus.png')
        logo_h = 18*mm
        logo_w = logo_h * (824/748)  # maintain aspect ratio
        c.drawImage(logo_img, ML, H-band+(band-logo_h)/2,
                    width=logo_w, height=logo_h, mask='auto')
        contact_x = ML + logo_w + 10
    except:
        # Fallback: text wordmark
        c.setFillColor(WHITE)
        c.setFont('Helvetica-Bold', 13)
        c.drawString(ML+4, H-band/2+3, 'HealthPlus')
        contact_x = ML + 90

    # Contact details (right side)
    c.setFillColor(colors.Color(1,1,1,0.55))
    c.setFont('Helvetica', 7.5)
    c.drawRightString(W-MR, H-10*mm, '+61 411 459 755')
    c.drawRightString(W-MR, H-16*mm, 'connect@healthplusint.com.au')
    c.drawRightString(W-MR, H-21.5*mm, 'healthplusint.com.au')

    # Teal accent strip
    c.setFillColor(TEAL)
    c.rect(0, H-band-3*mm, W, 3*mm, fill=1, stroke=0)

    # ── FOOTER (bottom-up — NEVER change this order) ──────────────────────────
    bw = PW / 3
    # y=8: Aboriginal flag bar
    c.setFillColor(colors.HexColor('#E8A020'))
    c.rect(ML, 8, bw, 5, fill=1, stroke=0)
    c.setFillColor(colors.HexColor('#CC3300'))
    c.rect(ML+bw, 8, bw, 5, fill=1, stroke=0)
    c.setFillColor(colors.HexColor('#111111'))
    c.rect(ML+bw*2, 8, bw, 5, fill=1, stroke=0)
    # y=20: Address + CONFIDENTIAL
    c.setFont('Helvetica', 7); c.setFillColor(MUTED)
    c.drawString(ML, 20, 'Unit 4, 44-46 Keeler Street, Carlingford NSW 2118  |  wgs.aus@gmail.com')
    c.setFillColor(colors.Color(0.55,0.08,0.08,0.5))
    c.setFont('Helvetica-Bold', 7)
    c.drawRightString(W-MR, 20, 'CONFIDENTIAL')
    # y=30: Company name + page number
    c.setFont('Helvetica', 7); c.setFillColor(MUTED)
    c.drawString(ML, 30, 'Westminster Green Solutions ABN 13 155 901 723  T/A Health Plus International')
    c.setFillColor(TEAL); c.setFont('Helvetica-Bold', 8)
    c.drawRightString(W-MR, 30, f'Page {doc.page}')
    # y=41: Teal rule
    c.setStrokeColor(TEAL); c.setLineWidth(0.6)
    c.line(ML, 41, W-MR, 41)

    c.restoreState()
```

---

## Document Builder Boilerplate

```python
def build(story, output_filename):
    doc = BaseDocTemplate(
        f'/mnt/user-data/outputs/{output_filename}',
        pagesize=A4,
        leftMargin=ML, rightMargin=MR,
        topMargin=MT, bottomMargin=MB
    )
    frame = Frame(ML, MB, PW, H-MT-MB, id='body')
    doc.addPageTemplates([PT('all', [frame], onPage=draw_page)])
    doc.build(story)
    print(f'✅ {output_filename}')
```

---

## Style Factory

```python
def mk(name, **kw):
    d = dict(fontName='Helvetica', fontSize=9.5, textColor=colors.HexColor('#1a1a1a'),
             leading=15, spaceAfter=4)
    d.update(kw)
    return ParagraphStyle(name, **d)

ST = {
    'title':   mk('title', fontName='Helvetica-Bold', fontSize=14, textColor=NAVY,
                  alignment=TA_CENTER, leading=20, spaceAfter=3),
    'subtitle':mk('subtitle', textColor=TEAL, alignment=TA_CENTER, leading=14, spaceAfter=2),
    'ref':     mk('ref', fontSize=8, textColor=MUTED, alignment=TA_CENTER, leading=12),
    'section': mk('section', fontName='Helvetica-Bold', fontSize=10, textColor=WHITE, leading=14),
    'clause':  mk('clause', fontName='Helvetica-Bold', textColor=NAVY, leading=14,
                  spaceBefore=10, spaceAfter=4),
    'body':    mk('body', leading=15.5, spaceAfter=5, alignment=TA_JUSTIFY),
    'bullet':  mk('bullet', leftIndent=14, spaceAfter=3, alignment=TA_JUSTIFY),
    'note':    mk('note', fontName='Helvetica-Oblique', fontSize=8.5, textColor=MUTED,
                  leading=13, alignment=TA_JUSTIFY),
    'pty_lbl': mk('pty_lbl', fontName='Helvetica-Bold', fontSize=8.5, textColor=TEAL,
                  leading=12, spaceAfter=5),
    'pty_nm':  mk('pty_nm', fontName='Helvetica-Bold', fontSize=10, textColor=NAVY,
                  leading=15, spaceAfter=2),
    'pty_val': mk('pty_val', fontSize=9.5, leading=14, spaceAfter=2),
    'hl':      mk('hl', fontName='Helvetica-Bold', fontSize=10.5, textColor=NAVY,
                  alignment=TA_CENTER, leading=17),
    'warn_h':  mk('warn_h', fontName='Helvetica-Bold', fontSize=8.5, textColor=NAVY,
                  leading=12, spaceAfter=3),
    'warn_b':  mk('warn_b', fontName='Helvetica-Oblique', fontSize=8.5, textColor=NAVY,
                  leading=13, alignment=TA_JUSTIFY),
    'agree':   mk('agree', fontName='Helvetica-Bold', fontSize=10, textColor=NAVY,
                  alignment=TA_CENTER, leading=14),
    # Counter-proposal styles
    'cp_verdict_accept': mk('cp_verdict_accept', fontName='Helvetica-Bold', fontSize=8.5,
                  textColor=colors.HexColor('#1a6b3c'), leading=12),
    'cp_verdict_partial': mk('cp_verdict_partial', fontName='Helvetica-Bold', fontSize=8.5,
                  textColor=colors.HexColor('#7a4f00'), leading=12),
    'cp_verdict_reject':  mk('cp_verdict_reject', fontName='Helvetica-Bold', fontSize=8.5,
                  textColor=colors.HexColor('#8b1a1a'), leading=12),
    'cp_body': mk('cp_body', fontSize=9, leading=14, spaceAfter=4, alignment=TA_JUSTIFY),
    'cp_label':mk('cp_label', fontName='Helvetica-Bold', fontSize=8, textColor=MUTED,
                  leading=12, spaceAfter=2),
}
```

---

## Reusable Components

```python
def sp(h=6): return Spacer(1, h)
def rule(col=TEAL, w=0.7): return HRFlowable(width='100%', thickness=w, color=col, spaceBefore=3, spaceAfter=3)

def sec_bar(text):
    """Navy section header bar — use for major sections."""
    t = Table([[Paragraph(text, ST['section'])]], colWidths=[PW])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1),NAVY_D),
        ('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),
        ('LEFTPADDING',(0,0),(-1,-1),10),
    ]))
    return t

def highlight_box(text):
    """Teal pale highlight box — use for key terms, important clauses."""
    t = Table([[Paragraph(text, ST['hl'])]], colWidths=[PW])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1),TEAL_PALE),
        ('BOX',(0,0),(-1,-1),1.5,TEAL),
        ('TOPPADDING',(0,0),(-1,-1),14),('BOTTOMPADDING',(0,0),(-1,-1),14),
        ('LEFTPADDING',(0,0),(-1,-1),18),('RIGHTPADDING',(0,0),(-1,-1),18),
    ]))
    return t

def warning_box(heading, body_text):
    """Yellow warning/notice box — legal caveats, important notices."""
    t = Table([[Paragraph(heading, ST['warn_h']),
                Paragraph(body_text, ST['warn_b'])]],
              colWidths=[3.2*cm, PW-3.2*cm])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1),WARN),('BOX',(0,0),(-1,-1),1,WARN_BRD),
        ('VALIGN',(0,0),(-1,-1),'MIDDLE'),
        ('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9),
        ('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),
    ]))
    return t

def party_table(a_lines, b_lines):
    """Two-column party identification table."""
    col = PW/2 - 5
    t = Table([
        [Paragraph('PARTY A', ST['pty_lbl']), Paragraph('PARTY B', ST['pty_lbl'])],
        [a_lines, b_lines]
    ], colWidths=[col, col])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(0,0),TEAL_PALE),
        ('BACKGROUND',(1,0),(1,0),colors.HexColor('#E8EEF5')),
        ('BACKGROUND',(0,1),(0,1),OFF),
        ('BACKGROUND',(1,1),(1,1),colors.HexColor('#F5F8FF')),
        ('BOX',(0,0),(0,-1),0.8,TEAL),('BOX',(1,0),(1,-1),0.8,NAVY),
        ('VALIGN',(0,0),(-1,-1),'TOP'),
        ('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),11),
        ('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),
        ('LINEAFTER',(0,0),(0,-1),0.4,colors.HexColor('#c8dde0')),
    ]))
    return t

def def_row(term, defn):
    """Definition table row for glossary/definitions sections."""
    t = Table([[Paragraph(f'<b>{term}</b>', ST['body']),
                Paragraph(defn, ST['body'])]],
              colWidths=[4.4*cm, PW-4.4*cm])
    t.setStyle(TableStyle([
        ('VALIGN',(0,0),(-1,-1),'TOP'),
        ('TOPPADDING',(0,0),(-1,-1),2),('BOTTOMPADDING',(0,0),(-1,-1),4),
        ('LEFTPADDING',(0,0),(0,0),4),('LEFTPADDING',(1,0),(1,0),8),
        ('RIGHTPADDING',(0,0),(-1,-1),0),
        ('LINEBELOW',(0,0),(-1,-1),0.3,colors.HexColor('#ddecea')),
    ]))
    return t

# ── COUNTER-PROPOSAL COMPONENTS ───────────────────────────────────────────────

ACCEPT_BG  = colors.HexColor('#E8F5E9')
PARTIAL_BG = colors.HexColor('#FFF8E1')
REJECT_BG  = colors.HexColor('#FFEBEE')
ACCEPT_BRD = colors.HexColor('#2e7d52')
PARTIAL_BRD= colors.HexColor('#c89000')
REJECT_BRD = colors.HexColor('#b71c1c')

def cp_item_row(item_no, their_position, verdict, our_position, rationale):
    """
    Single counter-proposal item row.
    verdict: 'ACCEPT' | 'PARTIAL ACCEPT' | 'REJECT'
    """
    v_map = {
        'ACCEPT':        (ST['cp_verdict_accept'],  ACCEPT_BG,  ACCEPT_BRD),
        'PARTIAL ACCEPT':(ST['cp_verdict_partial'], PARTIAL_BG, PARTIAL_BRD),
        'REJECT':        (ST['cp_verdict_reject'],  REJECT_BG,  REJECT_BRD),
    }
    v_style, bg, brd = v_map.get(verdict.upper(), v_map['REJECT'])
    col1 = 1.1*cm; col2 = (PW - col1) / 3; col3 = col2; col4 = PW - col1 - col2 - col3

    data = [[
        Paragraph(f'<b>{item_no}</b>', ST['cp_label']),
        Paragraph(their_position, ST['cp_body']),
        Paragraph(f'<b>{verdict}</b>', v_style),
        Paragraph(our_position, ST['cp_body']),
    ]]
    t = Table(data, colWidths=[col1, col2, col3, col4])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg),
        ('BOX',        (0,0), (-1,-1), 1.2, brd),
        ('LINEAFTER',  (0,0), (2,0),   0.4, brd),
        ('VALIGN',     (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING',(0,0),(-1,-1),8),
        ('LEFTPADDING',(0,0),(-1,-1),  8),
        ('RIGHTPADDING',(0,0),(-1,-1), 8),
    ]))
    return t

def cp_header_row():
    """Column headers for counter-proposal item table."""
    data = [[
        Paragraph('<b>#</b>', ST['cp_label']),
        Paragraph('<b>Their Position</b>', ST['cp_label']),
        Paragraph('<b>Verdict</b>', ST['cp_label']),
        Paragraph('<b>Our Position / Counter</b>', ST['cp_label']),
    ]]
    col1 = 1.1*cm; col2 = (PW - col1) / 3; col3 = col2; col4 = PW - col1 - col2 - col3
    t = Table(data, colWidths=[col1, col2, col3, col4])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), NAVY_D),
        ('TEXTCOLOR',  (0,0), (-1,-1), WHITE),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING',(0,0),(-1,-1),6),
        ('LEFTPADDING',(0,0),(-1,-1),  8),
    ]))
    return t

def variation_clause_box(clause_no, original_text, proposed_text):
    """Box showing original clause vs proposed variation."""
    data = [
        [Paragraph(f'<b>Clause {clause_no} — Proposed Variation</b>', ST['warn_h']), ''],
        [Paragraph('<b>Original:</b>', ST['cp_label']),
         Paragraph(original_text, ST['cp_body'])],
        [Paragraph('<b>Proposed:</b>', ST['cp_label']),
         Paragraph(proposed_text, ST['cp_body'])],
    ]
    t = Table(data, colWidths=[2.8*cm, PW-2.8*cm])
    t.setStyle(TableStyle([
        ('SPAN',       (0,0), (-1,0)),
        ('BACKGROUND', (0,0), (-1,0), NAVY_D),
        ('TEXTCOLOR',  (0,0), (-1,0), WHITE),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#F0F4FF')),
        ('BOX',        (0,0), (-1,-1), 1, NAVY),
        ('LINEBELOW',  (0,0), (-1,0),  0.5, TEAL),
        ('LINEBELOW',  (0,1), (-1,1),  0.3, colors.HexColor('#c8d0e0')),
        ('VALIGN',     (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING',(0,0),(-1,-1),8),
        ('LEFTPADDING',(0,0),(-1,-1),  10),
        ('RIGHTPADDING',(0,0),(-1,-1), 10),
    ]))
    return t

def safeguard_box(title, items):
    """
    Teal safeguard/condition box.
    items: list of strings — each becomes a bullet point.
    """
    bullet_text = '<br/>'.join([f'• {i}' for i in items])
    data = [
        [Paragraph(f'🛡 {title}', ST['warn_h'])],
        [Paragraph(bullet_text, ST['cp_body'])],
    ]
    t = Table(data, colWidths=[PW])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), TEAL_PALE),
        ('BACKGROUND', (0,1), (0,1), colors.HexColor('#F2FAFA')),
        ('BOX',        (0,0), (-1,-1), 1.2, TEAL),
        ('LINEBELOW',  (0,0), (0,0),   0.5, TEAL),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING',(0,0),(-1,-1),8),
        ('LEFTPADDING',(0,0),(-1,-1),  12),
        ('RIGHTPADDING',(0,0),(-1,-1), 12),
    ]))
    return t

def model_comparison_box(col_headers, rows):
    """
    Side-by-side model comparison table.
    col_headers: list of strings e.g. ['Criterion', 'Their Model', 'Our Model']
    rows: list of lists matching col count
    """
    n = len(col_headers)
    col_w = PW / n
    header_row = [Paragraph(f'<b>{h}</b>', ST['cp_label']) for h in col_headers]
    data = [header_row] + [[Paragraph(str(c), ST['cp_body']) for c in r] for r in rows]
    t = Table(data, colWidths=[col_w]*n)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), NAVY_D),
        ('TEXTCOLOR',  (0,0), (-1,0), WHITE),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [OFF, WHITE]),
        ('BOX',        (0,0), (-1,-1), 0.8, NAVY),
        ('INNERGRID',  (0,0), (-1,-1), 0.3, colors.HexColor('#c0ccd8')),
        ('VALIGN',     (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING',(0,0),(-1,-1),7),
        ('LEFTPADDING',(0,0),(-1,-1),  8),
        ('RIGHTPADDING',(0,0),(-1,-1), 8),
    ]))
    return t

def step_block(step_no, title, body):
    """Numbered step block for process/next-steps sections."""
    data = [[
        Paragraph(f'<b>{step_no}</b>', mk('sn', fontName='Helvetica-Bold', fontSize=13,
                  textColor=WHITE, alignment=TA_CENTER, leading=18)),
        [Paragraph(f'<b>{title}</b>', ST['clause']),
         Paragraph(body, ST['cp_body'])]
    ]]
    t = Table(data, colWidths=[1.2*cm, PW-1.2*cm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), TEAL),
        ('BACKGROUND', (1,0), (1,0), TEAL_PALE),
        ('BOX',        (0,0), (-1,-1), 0.8, TEAL),
        ('VALIGN',     (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING',(0,0),(-1,-1),10),
        ('LEFTPADDING',(0,0),(0,0),    0),
        ('LEFTPADDING',(1,0),(1,0),    12),
        ('RIGHTPADDING',(0,0),(-1,-1), 10),
    ]))
    return t
```

---

## Document Types & Templates

### 1. Agreement / Contract
```python
# Story structure:
# sec_bar('PARTIES') → party_table() → sec_bar('BACKGROUND') → recitals
# → rule → 'THE PARTIES AGREE AS FOLLOWS' → numbered clauses
# → PageBreak → sec_bar('EXECUTION') → signature blocks
# IMPORTANT: Always identify the Company as Westminster Green Solutions Pty Ltd
# (ABN 13 155 901 723) T/A Health Plus International. Include trading name recital.
```

### 2. Placement Confirmation Letter
```python
# Structure: title + date + addressed to + body paragraphs
# Sections: Placement Details table, Compliance Checklist, Conditions
# Footer: "People. Care. Compliance." sign-off
```

### 3. Proposal / Tender Document
```python
# Structure: cover page (logo large, title, date, addressee)
# Sections: Executive Summary, Our Approach, Workforce Types, Compliance,
#           Pricing, About Us, Terms
```

### 4. Formal Letter
```python
# Structure: date + addressee block + salutation
# Body: 3-5 paragraphs
# Close: "Yours sincerely" + name + title + tagline
```

### 5. Invoice
```python
# Structure: invoice number, date, billing info
# Line items table: description / qty / rate / amount
# Totals: subtotal, GST (10%), total
# Payment terms + bank details
```

### 6. Counter-Proposal
```python
# A structured multi-part position statement responding to a third-party
# proposal, term sheet, or offer. Full pattern reference: /home/claude/build_v4.py
#
# Story structure:
# doc_header(S, 'COUNTER-PROPOSAL', subtitle, ref, today)
# → highlight_box('Executive Position Summary')
# → sec_bar('SECTION 1 — COMMERCIAL TERMS')
#   → cp_header_row()
#   → cp_item_row('1.1', their_pos, 'ACCEPT', our_pos, rationale)
#   → cp_item_row('1.2', their_pos, 'PARTIAL ACCEPT', our_pos, rationale)
#   → cp_item_row('1.3', their_pos, 'REJECT', our_pos, rationale)
# → sec_bar('SECTION 2 — PROPOSED VARIATIONS')
#   → variation_clause_box('3.2', original_text, proposed_text)
# → sec_bar('SECTION 3 — SAFEGUARDS & CONDITIONS')
#   → safeguard_box('Non-Negotiable Conditions', ['item1', 'item2'])
# → sec_bar('SECTION 4 — MODEL COMPARISON')
#   → model_comparison_box(['Criterion','Their Model','Our Model'], rows)
# → sec_bar('SECTION 5 — NEXT STEPS')
#   → step_block('1', 'Review Period', 'Respond within 5 business days.')
#   → step_block('2', 'Execution', 'Sign and return countersigned copy.')
# → warning_box('⚠ IMPORTANT', 'This counter-proposal expires 14 days from date above.')
# → PageBreak → sec_bar('EXECUTION') → signature blocks
```

---

## Critical Rules

1. **Session start** — Always run the curl logo fetch before any script. Logo URL: `https://healthplusint.com.au/images/logo-healthplus-transparent.png` → `/home/claude/images/logo-healthplus.png`.

2. **Company identity** — In any legal or commercial document, the contracting party is **Westminster Green Solutions Pty Ltd (ABN 13 155 901 723) T/A Health Plus International**. HealthPlus International is an early-stage trading name only — never imply it is an independent legal entity.

3. **Footer is always drawn bottom-up** — flag bar at y=8, then text, then rule at y=41. Never change this order or overlap occurs.

4. **INTERNATIONAL text spacing** — Always use `saveState()`/`restoreState()` around any textObject with `setCharSpace()` to prevent leaking into subsequent drawString calls.

5. **Logo in PDF** — Use `ImageReader` to load `/home/claude/images/logo-healthplus.png`. If file not available, use the text fallback ("HealthPlus" in white on navy-d).

6. **Never use Unicode subscripts/superscripts** — renders as black boxes. Use `<sub>` and `<super>` tags inside Paragraph objects only.

7. **Paragraph-level HTML** — ReportLab Paragraphs support: `<b>`, `<i>`, `<br/>`, `<em>`, `<super>`, `<sub>`. Use `&amp;`, `&lt;`, `&gt;` for special chars.

8. **Output path** — always `/mnt/user-data/outputs/HPI_[Type]_[Name].pdf`

9. **After building** — always call `present_files(['/mnt/user-data/outputs/...pdf'])` to deliver to user.

10. **Personal email** — `wgs.aus@gmail.com` (never `was.aus@gmail.com`).

---

## Standard Document Header Block

```python
def doc_header(S, title, subtitle, ref, today):
    S.append(sp(6))
    S.append(Paragraph(title.upper(), ST['title']))
    S.append(sp(3))
    if subtitle:
        S.append(Paragraph(subtitle, ST['subtitle']))
    S.append(sp(3))
    S.append(Paragraph(f'Ref: {ref} | Date: {today} | HealthPlus International', ST['ref']))
    S.append(sp(10))
    S.append(rule(TEAL, 1.2))
    S.append(sp(10))
```

---

## Company Details (always use exact values)

```python
COMPANY = {
    'legal':    'Westminster Green Solutions Pty Ltd',
    'abn':      '13 155 901 723',
    'trading':  'Health Plus International',
    'brand':    'HealthPlus International',
    'history':  '12 years operating history (NDIS labour hire, waste/recycling management)',
    'tagline':  'People. Care. Compliance.',
    'phone':    '+61 411 459 755',
    'email':    'connect@healthplusint.com.au',
    'director': 'Abhay J Kumar',
    'dir_email':'wgs.aus@gmail.com',
    'address':  'Unit 4, 44-46 Keeler Street, Carlingford NSW 2118',
}
```
