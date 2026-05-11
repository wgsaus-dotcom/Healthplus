from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.lib import colors
from reportlab.platypus import (
    Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate as PT
from datetime import date
import os

os.makedirs('/home/claude/whitepaper', exist_ok=True)

# ── Brand tokens ──────────────────────────────────────────────────────────────
TEAL      = colors.HexColor('#0B6B6E')
TEAL_D    = colors.HexColor('#085558')
TEAL_PALE = colors.HexColor('#E1F5EE')
TEAL_MID  = colors.HexColor('#9FE1CB')
NAVY      = colors.HexColor('#1B3A5C')
NAVY_D    = colors.HexColor('#0D1F33')
OFF       = colors.HexColor('#F7F8F6')
LIGHT_BG  = colors.HexColor('#F8F9FA')
MUTED     = colors.HexColor('#5a6a7a')
WHITE     = colors.white
BLACK     = colors.HexColor('#1a1a1a')
AMBER     = colors.HexColor('#B45309')
AMBER_L   = colors.HexColor('#FEF3C7')
RED       = colors.HexColor('#991B1B')
RED_L     = colors.HexColor('#FEE2E2')
GREEN     = colors.HexColor('#065F46')
GREEN_L   = colors.HexColor('#D1FAE5')
CORAL     = colors.HexColor('#9A3412')
CORAL_L   = colors.HexColor('#FFEDD5')
PURPLE    = colors.HexColor('#4C1D95')
PURPLE_L  = colors.HexColor('#EDE9FE')
GRAY_L    = colors.HexColor('#F1F0E8')

W, H = A4
ML = MR = 2.2*cm
MT = 3.8*cm
MB = 3.0*cm
PW = W - ML - MR

# ── Page canvas ───────────────────────────────────────────────────────────────
def draw_page(c, doc):
    c.saveState()
    band = 22*mm
    c.setFillColor(NAVY_D)
    c.rect(0, H-band, W, band, fill=1, stroke=0)
    # CURA logo
    try:
        from reportlab.lib.utils import ImageReader
        logo_img = ImageReader('/home/claude/cura_brand_logo.png')
        logo_h = 15*mm
        logo_w = logo_h * (1020/889)
        c.drawImage(logo_img, ML, H-band+(band-logo_h)/2,
                    width=logo_w, height=logo_h, mask='auto')
        sub_x = ML + logo_w + 6
    except:
        c.setFillColor(WHITE)
        c.setFont('Helvetica-Bold', 12)
        c.drawString(ML+4, H-band/2+4, 'CURA')
        sub_x = ML + 80
    c.setFont('Helvetica', 7.5)
    c.setFillColor(colors.Color(1,1,1,0.55))
    c.drawString(sub_x, H-band/2+1, 'Passive Welfare Monitoring Infrastructure')
    # Contact right
    c.setFillColor(colors.Color(1,1,1,0.55))
    c.setFont('Helvetica', 7.5)
    c.drawRightString(W-MR, H-10*mm, '+61 411 459 755')
    c.drawRightString(W-MR, H-16*mm, 'connect@healthplusint.com.au')
    c.drawRightString(W-MR, H-21.5*mm, 'healthplusint.com.au')
    # Teal accent
    c.setFillColor(TEAL)
    c.rect(0, H-band-3*mm, W, 3*mm, fill=1, stroke=0)
    # Footer
    bw = PW/3
    c.setFillColor(colors.HexColor('#E8A020')); c.rect(ML, 8, bw, 5, fill=1, stroke=0)
    c.setFillColor(colors.HexColor('#CC3300')); c.rect(ML+bw, 8, bw, 5, fill=1, stroke=0)
    c.setFillColor(colors.HexColor('#111111')); c.rect(ML+bw*2, 8, bw, 5, fill=1, stroke=0)
    c.setFont('Helvetica', 7); c.setFillColor(MUTED)
    c.drawString(ML, 20, 'Unit 4, 44-46 Keeler Street, Carlingford NSW 2118  |  ABN 13 155 901 723')
    c.setFillColor(colors.Color(0.55,0.08,0.08,0.5)); c.setFont('Helvetica-Bold', 7)
    c.drawRightString(W-MR, 20, 'CONFIDENTIAL — NOT FOR DISTRIBUTION')
    c.setFont('Helvetica', 7); c.setFillColor(MUTED)
    c.drawString(ML, 30, 'Westminster Green Solutions T/A Health Plus International  |  © 2026')
    c.setFillColor(TEAL); c.setFont('Helvetica-Bold', 8)
    c.drawRightString(W-MR, 30, f'Page {doc.page}')
    c.setStrokeColor(TEAL); c.setLineWidth(0.6)
    c.line(ML, 41, W-MR, 41)
    c.restoreState()

# ── Styles ────────────────────────────────────────────────────────────────────
def mk(name, **kw):
    d = dict(fontName='Helvetica', fontSize=9.5, textColor=BLACK,
             leading=15, spaceAfter=5)
    d.update(kw)
    return ParagraphStyle(name, **d)

S = {
    'cov_title': mk('cov_title', fontName='Helvetica-Bold', fontSize=28, textColor=NAVY_D,
                    alignment=TA_CENTER, leading=34, spaceAfter=8),
    'cov_sub':   mk('cov_sub', fontName='Helvetica', fontSize=14, textColor=TEAL,
                    alignment=TA_CENTER, leading=20, spaceAfter=6),
    'cov_meta':  mk('cov_meta', fontSize=9, textColor=MUTED, alignment=TA_CENTER,
                    leading=14, spaceAfter=3),
    'h1':        mk('h1', fontName='Helvetica-Bold', fontSize=13, textColor=WHITE,
                    leading=18, spaceAfter=0, spaceBefore=16),
    'h2':        mk('h2', fontName='Helvetica-Bold', fontSize=11, textColor=NAVY_D,
                    leading=15, spaceAfter=4, spaceBefore=12),
    'h3':        mk('h3', fontName='Helvetica-Bold', fontSize=10, textColor=TEAL_D,
                    leading=14, spaceAfter=4, spaceBefore=8),
    'body':      mk('body', leading=15.5, spaceAfter=6, alignment=TA_JUSTIFY),
    'body_b':    mk('body_b', fontName='Helvetica-Bold', leading=15.5, spaceAfter=6,
                    alignment=TA_JUSTIFY),
    'bul':       mk('bul', leftIndent=14, spaceAfter=4, alignment=TA_JUSTIFY),
    'note':      mk('note', fontName='Helvetica-Oblique', fontSize=8.5, textColor=MUTED,
                    leading=13, alignment=TA_JUSTIFY),
    'warn':      mk('warn', fontName='Helvetica-Oblique', fontSize=9, textColor=RED,
                    leading=14, alignment=TA_JUSTIFY),
    'caption':   mk('caption', fontSize=8, textColor=MUTED, alignment=TA_CENTER,
                    leading=12, spaceAfter=6),
    'tbl_hdr':   mk('tbl_hdr', fontName='Helvetica-Bold', fontSize=8.5, textColor=WHITE,
                    alignment=TA_CENTER, leading=12),
    'tbl_cell':  mk('tbl_cell', fontSize=8.5, leading=12, spaceAfter=2),
    'tbl_cell_c':mk('tbl_cell_c', fontSize=8.5, leading=12, spaceAfter=2, alignment=TA_CENTER),
    'pull':      mk('pull', fontName='Helvetica-Bold', fontSize=12, textColor=TEAL_D,
                    alignment=TA_CENTER, leading=18, spaceAfter=6),
    'patent':    mk('patent', fontName='Helvetica-Bold', fontSize=9, textColor=PURPLE,
                    leading=14, spaceAfter=3),
    'exec_lbl':  mk('exec_lbl', fontName='Helvetica-Bold', fontSize=8, textColor=TEAL,
                    leading=12, spaceAfter=2, allCaps=True if False else False),
    'exec_val':  mk('exec_val', fontName='Helvetica-Bold', fontSize=11, textColor=NAVY_D,
                    leading=15, spaceAfter=4),
}

# ── Helpers ───────────────────────────────────────────────────────────────────
def sp(h=6): return Spacer(1, h)
def rule(col=TEAL, w=0.7): return HRFlowable(width='100%', thickness=w, color=col,
                                              spaceBefore=4, spaceAfter=4)

def h1_bar(text):
    t = Table([[Paragraph(text, S['h1'])]], colWidths=[PW])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), NAVY_D),
        ('TOPPADDING',(0,0),(-1,-1), 8), ('BOTTOMPADDING',(0,0),(-1,-1), 8),
        ('LEFTPADDING',(0,0),(-1,-1), 12),
    ]))
    return t

def teal_box(text):
    t = Table([[Paragraph(text, S['pull'])]], colWidths=[PW])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), TEAL_PALE),
        ('BOX',(0,0),(-1,-1), 1.5, TEAL),
        ('TOPPADDING',(0,0),(-1,-1), 12), ('BOTTOMPADDING',(0,0),(-1,-1), 12),
        ('LEFTPADDING',(0,0),(-1,-1), 16), ('RIGHTPADDING',(0,0),(-1,-1), 16),
    ]))
    return t

def warn_box(title, text):
    rows = []
    if title: rows.append([Paragraph(f'⚠ {title}', mk('wh', fontName='Helvetica-Bold',
                           fontSize=9, textColor=AMBER, leading=13))])
    rows.append([Paragraph(text, mk('wb', fontSize=9, textColor=colors.HexColor('#78350F'),
                            leading=14, alignment=TA_JUSTIFY))])
    t = Table(rows, colWidths=[PW])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), AMBER_L),
        ('BOX',(0,0),(-1,-1), 1, AMBER),
        ('TOPPADDING',(0,0),(-1,-1), 6), ('BOTTOMPADDING',(0,0),(-1,-1), 6),
        ('LEFTPADDING',(0,0),(-1,-1), 10), ('RIGHTPADDING',(0,0),(-1,-1), 10),
    ]))
    return t

def info_box(title, text):
    rows = []
    if title: rows.append([Paragraph(title, mk('ih', fontName='Helvetica-Bold',
                           fontSize=9, textColor=TEAL_D, leading=13))])
    rows.append([Paragraph(text, mk('ib', fontSize=9, textColor=colors.HexColor('#064E3B'),
                            leading=14, alignment=TA_JUSTIFY))])
    t = Table(rows, colWidths=[PW])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), GREEN_L),
        ('BOX',(0,0),(-1,-1), 1, TEAL),
        ('TOPPADDING',(0,0),(-1,-1), 6), ('BOTTOMPADDING',(0,0),(-1,-1), 6),
        ('LEFTPADDING',(0,0),(-1,-1), 10), ('RIGHTPADDING',(0,0),(-1,-1), 10),
    ]))
    return t

def patent_box(ref, title, claims, filed):
    t = Table([[
        Paragraph(f'<b>AU Provisional {ref}</b>', S['patent']),
        Paragraph(f'<b>{claims} claims</b> · Filed {filed}', mk('pr', fontSize=9,
                  textColor=PURPLE, alignment=TA_RIGHT, leading=13))
    ]], colWidths=[PW*0.7, PW*0.3])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), PURPLE_L),
        ('BOX',(0,0),(-1,-1), 1, PURPLE),
        ('TOPPADDING',(0,0),(-1,-1), 5), ('BOTTOMPADDING',(0,0),(-1,-1), 2),
        ('LEFTPADDING',(0,0),(-1,-1), 10), ('RIGHTPADDING',(0,0),(-1,-1), 10),
        ('VALIGN',(0,0),(-1,-1),'MIDDLE'),
    ]))
    title_t = Table([[Paragraph(title, mk('pt', fontSize=8.5, textColor=PURPLE,
                     fontName='Helvetica-Oblique', leading=13, alignment=TA_JUSTIFY))]], colWidths=[PW])
    title_t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), PURPLE_L),
        ('BOTTOMPADDING',(0,0),(-1,-1), 7),
        ('LEFTPADDING',(0,0),(-1,-1), 10), ('RIGHTPADDING',(0,0),(-1,-1), 10),
        ('LINEBELOW',(0,0),(-1,-1), 1, PURPLE),
    ]))
    return [t, title_t]

def two_col(left_items, right_items):
    lw = PW*0.48
    max_r = max(len(left_items), len(right_items))
    rows = []
    for i in range(max_r):
        l = left_items[i] if i < len(left_items) else Paragraph('', S['body'])
        r = right_items[i] if i < len(right_items) else Paragraph('', S['body'])
        rows.append([l, r])
    t = Table(rows, colWidths=[lw, lw])
    t.setStyle(TableStyle([
        ('VALIGN',(0,0),(-1,-1),'TOP'),
        ('LEFTPADDING',(0,0),(-1,-1), 0), ('RIGHTPADDING',(0,0),(-1,-1), 0),
        ('COLPADDING',(1,0),(1,-1), 8, 0),
    ]))
    return t

def data_table(headers, rows, col_widths=None):
    if col_widths is None:
        col_widths = [PW/len(headers)] * len(headers)
    data = [[Paragraph(h, S['tbl_hdr']) for h in headers]]
    for r in rows:
        data.append([Paragraph(str(c), S['tbl_cell']) for c in r])
    t = Table(data, colWidths=col_widths)
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,0), NAVY_D),
        ('ROWBACKGROUNDS',(0,1),(-1,-1), [LIGHT_BG, WHITE]),
        ('GRID',(0,0),(-1,-1), 0.3, colors.HexColor('#DDDDDD')),
        ('TOPPADDING',(0,0),(-1,-1), 5), ('BOTTOMPADDING',(0,0),(-1,-1), 5),
        ('LEFTPADDING',(0,0),(-1,-1), 7), ('RIGHTPADDING',(0,0),(-1,-1), 7),
        ('VALIGN',(0,0),(-1,-1), 'MIDDLE'),
        ('FONTNAME',(0,0),(-1,0), 'Helvetica-Bold'),
    ]))
    return t

# ── Story ─────────────────────────────────────────────────────────────────────
story = []
P = lambda txt, sty='body': Paragraph(txt, S[sty])

# ╔══════════════════════════════════════════════════════════╗
# COVER PAGE
# ╚══════════════════════════════════════════════════════════╝
story += [
    sp(30),
    P('CURA', 'cov_title'),
    P('Continuous Welfare Monitoring', 'cov_sub'),
    sp(4),
    rule(),
    sp(10),
    P('Technical Whitepaper', 'cov_sub'),
    sp(6),
    P('Passive Multi-Modal Wireless Sensing for Individual Vital Sign Monitoring,<br/>'
      'Welfare Compliance Logging, and Longitudinal Health Surveillance<br/>'
      'in Regulated Care, Custodial and Child Supervision Environments', 'cov_meta'),
    sp(20),
]

# Cover summary box
cover_tbl = Table([
    [Paragraph('Version', S['exec_lbl']),
     Paragraph('Classification', S['exec_lbl']),
     Paragraph('Date', S['exec_lbl']),
     Paragraph('Author', S['exec_lbl'])],
    [Paragraph('1.0', S['exec_val']),
     Paragraph('Confidential', S['exec_val']),
     Paragraph('May 2026', S['exec_val']),
     Paragraph('Abhay J Kumar', S['exec_val'])],
], colWidths=[PW/4]*4)
cover_tbl.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,0), TEAL_PALE),
    ('BACKGROUND',(0,1),(-1,1), WHITE),
    ('BOX',(0,0),(-1,-1), 1.5, TEAL),
    ('GRID',(0,0),(-1,-1), 0.5, TEAL_MID),
    ('TOPPADDING',(0,0),(-1,-1), 8), ('BOTTOMPADDING',(0,0),(-1,-1), 8),
    ('LEFTPADDING',(0,0),(-1,-1), 10), ('RIGHTPADDING',(0,0),(-1,-1), 10),
    ('ALIGN',(0,0),(-1,-1), 'CENTER'),
]))
story += [cover_tbl, sp(20)]

# Patent badges on cover
story += [
    P('Protected under three Australian Provisional Patents', 'cov_meta'),
    sp(6),
]
pat_cover = Table([
    [Paragraph('AMCZ-2615743059', mk('pc', fontName='Helvetica-Bold', fontSize=9,
               textColor=PURPLE, alignment=TA_CENTER, leading=13)),
     Paragraph('AMCZ-2615744013', mk('pc', fontName='Helvetica-Bold', fontSize=9,
               textColor=PURPLE, alignment=TA_CENTER, leading=13)),
     Paragraph('AMCZ-2615745256', mk('pc', fontName='Helvetica-Bold', fontSize=9,
               textColor=PURPLE, alignment=TA_CENTER, leading=13))],
    [Paragraph('Local System', mk('ps', fontSize=8, textColor=MUTED, alignment=TA_CENTER, leading=12)),
     Paragraph('Cloud/Federated', mk('ps', fontSize=8, textColor=MUTED, alignment=TA_CENTER, leading=12)),
     Paragraph('Security Hardening', mk('ps', fontSize=8, textColor=MUTED, alignment=TA_CENTER, leading=12))],
], colWidths=[PW/3]*3)
pat_cover.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,-1), PURPLE_L),
    ('BOX',(0,0),(-1,-1), 1, PURPLE),
    ('GRID',(0,0),(-1,-1), 0.5, colors.HexColor('#C4B5FD')),
    ('TOPPADDING',(0,0),(-1,-1), 7), ('BOTTOMPADDING',(0,0),(-1,-1), 7),
    ('ALIGN',(0,0),(-1,-1), 'CENTER'),
]))
story += [pat_cover, sp(20)]
story.append(P('Health Plus International — Westminster Green Solutions ABN 13 155 901 723', 'cov_meta'))
story.append(P('© 2026 All Rights Reserved. This document is confidential and intended for authorised recipients only.', 'cov_meta'))
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# EXECUTIVE SUMMARY
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('1. Executive Summary'), sp(8)]
story.append(teal_box(
    'CURA is a passive welfare monitoring infrastructure platform that continuously monitors vital signs '
    'and individual identity of persons in regulated care environments without cameras, wearables, or internet connectivity. '
    'It generates legally defensible compliance records for aged care, corrections, childcare, hospital, and disability environments.'
))
story.append(sp(8))

exec_metrics = Table([
    [Paragraph('$136.5M AUD', S['exec_val']), Paragraph('122 Patent Claims', S['exec_val']),
     Paragraph('10 Environments', S['exec_val']), Paragraph('0 Cameras', S['exec_val'])],
    [Paragraph('Total Addressable Market', S['exec_lbl']), Paragraph('3 Provisionals Filed', S['exec_lbl']),
     Paragraph('Regulated Care Sectors', S['exec_lbl']), Paragraph('No Wearables. No Cloud.', S['exec_lbl'])],
], colWidths=[PW/4]*4)
exec_metrics.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,0), TEAL_PALE),
    ('BACKGROUND',(0,1),(-1,1), WHITE),
    ('BOX',(0,0),(-1,-1), 1.5, TEAL),
    ('GRID',(0,0),(-1,-1), 0.5, TEAL_MID),
    ('TOPPADDING',(0,0),(-1,-1), 8), ('BOTTOMPADDING',(0,0),(-1,-1), 8),
    ('LEFTPADDING',(0,0),(-1,-1), 8), ('RIGHTPADDING',(0,0),(-1,-1), 8),
    ('ALIGN',(0,0),(-1,-1), 'CENTER'),
]))
story += [exec_metrics, sp(10)]

story.append(P(
    'Australia\'s regulated care sector — spanning residential aged care, correctional facilities, '
    'childcare services, hospital programs, and disability accommodation — faces a persistent welfare '
    'monitoring gap. Manual welfare checks occur every one to two hours, providing momentary observation '
    'separated by long unmonitored intervals during which adverse events including falls, breathing '
    'cessation, and cardiac events occur undetected. Camera-based monitoring is legally prohibited '
    'in sleeping areas. Wearable devices are abandoned by persons with dementia, refused by detained '
    'persons, and unsafe for infants.'
))
story.append(P(
    'CURA addresses this gap through passive radio-frequency sensing. WiFi signals already present '
    'in care environments are perturbed by the breathing movements and cardiac micro-motion of persons '
    'in the monitored space. CURA captures these perturbations using dedicated hardware nodes, processes '
    'them through a multi-layer AI pipeline, identifies individual persons without biometric enrolment, '
    'and continuously records a comprehensive suite of vital signs per individual. All processing '
    'occurs on local hardware within each facility. No data leaves the facility. No internet '
    'connection is required.'
))
story.append(warn_box('Independent Assessment',
    'CURA is at pre-commercial stage. Performance figures cited in this document derive from published '
    'academic research under controlled conditions. Independent clinical validation studies are required '
    'before deployment in clinical care pathways. The system is not a medical device and does not '
    'diagnose disease. TGA regulatory classification is subject to assessment based on specific '
    'deployment configuration.'))
story.append(sp(6))
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# THE PROBLEM
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('2. The Welfare Monitoring Gap'), sp(8)]
story.append(P('2.1 The Scale of the Problem', 'h2'))
story.append(P(
    'Australia\'s regulated care sector is large, legally complex, and chronically under-monitored. '
    'The sector encompasses approximately 3,700 residential aged care facilities housing over 200,000 '
    'residents; 200 correctional facilities holding approximately 40,000 persons in custody; 15,000 '
    'licensed childcare services enrolling 1.4 million children; several thousand hospital-in-the-home '
    'program participants; and tens of thousands of NDIS Supported Independent Living (SIL) residents.'
))
story.append(P(
    'Each sector is subject to specific welfare monitoring obligations under Australian law. The Aged '
    'Care Act 2024 requires 24/7 registered nurse presence and continuous duty of care. State and '
    'Territory Coroners Acts impose welfare monitoring obligations on correctional services that '
    'are subject to coronial inquest when a death in custody occurs. The Education and Care Services '
    'National Regulations 2011 require active supervision of children during sleep periods without '
    'camera installation in sleep rooms.'
))

story.append(P('2.2 Why Existing Solutions Fail', 'h2'))
fail_tbl = data_table(
    ['Approach', 'Why It Fails', 'Affected Sectors'],
    [
        ['Manual welfare checks (every 1-2 hrs)', 'Snapshot only. Events between checks undetected. Staff workload intensive.', 'All sectors'],
        ['Wearable monitors', 'Removed by dementia residents. Refused by detainees. Unsafe for infants. Compliance < 60%.', 'Aged care, corrections'],
        ['Camera-based surveillance', 'Legally prohibited in bedrooms, cells, and sleep rooms under Australian privacy law.', 'All sectors'],
        ['Under-mattress BCG sensors', 'Single bed only. Cannot identify which person is in the bed. No multi-occupancy capability.', 'Aged care, hospital'],
        ['PIR motion sensors', 'Detects movement only. No vital signs. No individual attribution. Cannot detect breathing.', 'Aged care, corrections'],
        ['Cloud-connected platforms', 'Cannot meet health data sovereignty requirements in corrections and high-security aged care.', 'Corrections, aged care'],
    ],
    col_widths=[PW*0.30, PW*0.45, PW*0.25]
)
story += [fail_tbl, sp(8)]

story.append(P('2.3 The Regulatory Stakes', 'h2'))
story.append(P(
    'The consequences of inadequate welfare monitoring are severe and increasing. Every unwitnessed '
    'death in a correctional facility triggers a mandatory coronial inquest. The Royal Commission '
    'into Aged Care Quality and Safety (2021) found systemic failures in overnight monitoring. '
    'SIDS (Sudden Infant Death Syndrome) remains a significant cause of infant mortality during '
    'childcare rest periods. These are not theoretical risks — they are documented, recurring, '
    'and legally consequential.'
))
story.append(P(
    'The specific evidentiary gap is that care facilities cannot currently demonstrate continuous '
    'monitoring. A welfare log showing manual checks every two hours does not prove that a resident '
    'was alive and breathing at 3:17am. CURA\'s timestamped, append-only compliance records do.'
))
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# THE CURA SOLUTION
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('3. The CURA Solution'), sp(8)]
story.append(teal_box(
    '"A manual welfare check every two hours gives you three seconds of observation per resident. '
    'CURA gives you continuous monitoring with instant alerts. '
    '65% accurate and continuous beats 100% accurate but two-hourly."'
))
story.append(sp(8))
story.append(P('3.1 Core Principle', 'h2'))
story.append(P(
    'CURA repurposes WiFi signals already present in care environments as a passive sensing medium. '
    'When a person breathes, their chest wall displaces 1-4 centimetres with each breath. This '
    'displacement alters the phase and amplitude of WiFi signals passing through the space, creating '
    'measurable perturbations across 56 OFDM subcarrier channels. CURA captures these perturbations '
    'using ESP32-S3 microcontroller nodes — consumer-grade hardware costing approximately $20 AUD each '
    'that exposes the raw channel state information (CSI) hidden by standard consumer WiFi chipsets.'
))
story.append(P(
    'The CSI data is processed through a multi-layer AI pipeline running entirely on local hardware. '
    'A dual-branch transformer neural network processes the amplitude and phase streams of the CSI '
    'data in separate branches to produce individual body signature embeddings — unique identifiers '
    'for each person in the monitored space derived from their body geometry and physiological '
    'characteristics, without any biometric enrolment or person cooperation required.'
))

story.append(P('3.2 What Makes CURA Different', 'h2'))
diff_tbl = Table([
    [Paragraph('Feature', S['tbl_hdr']),
     Paragraph('CURA', S['tbl_hdr']),
     Paragraph('Existing Solutions', S['tbl_hdr'])],
    [Paragraph('Cameras required', S['tbl_cell_c']),
     Paragraph('No', mk('g', fontSize=8.5, textColor=GREEN, alignment=TA_CENTER, fontName='Helvetica-Bold', leading=12)),
     Paragraph('Often yes', mk('r', fontSize=8.5, textColor=RED, alignment=TA_CENTER, leading=12))],
    [Paragraph('Wearables required', S['tbl_cell_c']),
     Paragraph('No', mk('g', fontSize=8.5, textColor=GREEN, alignment=TA_CENTER, fontName='Helvetica-Bold', leading=12)),
     Paragraph('Usually yes', mk('r', fontSize=8.5, textColor=RED, alignment=TA_CENTER, leading=12))],
    [Paragraph('Internet required', S['tbl_cell_c']),
     Paragraph('No', mk('g', fontSize=8.5, textColor=GREEN, alignment=TA_CENTER, fontName='Helvetica-Bold', leading=12)),
     Paragraph('Most platforms yes', mk('r', fontSize=8.5, textColor=RED, alignment=TA_CENTER, leading=12))],
    [Paragraph('Individual attribution', S['tbl_cell_c']),
     Paragraph('Yes — self-supervised', mk('g', fontSize=8.5, textColor=GREEN, alignment=TA_CENTER, fontName='Helvetica-Bold', leading=12)),
     Paragraph('Rarely', mk('r', fontSize=8.5, textColor=RED, alignment=TA_CENTER, leading=12))],
    [Paragraph('Non-consenting persons', S['tbl_cell_c']),
     Paragraph('Yes — no enrolment', mk('g', fontSize=8.5, textColor=GREEN, alignment=TA_CENTER, fontName='Helvetica-Bold', leading=12)),
     Paragraph('No', mk('r', fontSize=8.5, textColor=RED, alignment=TA_CENTER, leading=12))],
    [Paragraph('Coronial-grade records', S['tbl_cell_c']),
     Paragraph('Yes — digital signature chain', mk('g', fontSize=8.5, textColor=GREEN, alignment=TA_CENTER, fontName='Helvetica-Bold', leading=12)),
     Paragraph('Not specifically', mk('r', fontSize=8.5, textColor=RED, alignment=TA_CENTER, leading=12))],
    [Paragraph('Infrastructure change', S['tbl_cell_c']),
     Paragraph('None', mk('g', fontSize=8.5, textColor=GREEN, alignment=TA_CENTER, fontName='Helvetica-Bold', leading=12)),
     Paragraph('Often significant', mk('r', fontSize=8.5, textColor=RED, alignment=TA_CENTER, leading=12))],
], colWidths=[PW*0.28, PW*0.36, PW*0.36])
diff_tbl.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,0), NAVY_D),
    ('ROWBACKGROUNDS',(0,1),(-1,-1), [LIGHT_BG, WHITE]),
    ('GRID',(0,0),(-1,-1), 0.3, colors.HexColor('#DDDDDD')),
    ('TOPPADDING',(0,0),(-1,-1), 6), ('BOTTOMPADDING',(0,0),(-1,-1), 6),
    ('LEFTPADDING',(0,0),(-1,-1), 8), ('RIGHTPADDING',(0,0),(-1,-1), 8),
    ('VALIGN',(0,0),(-1,-1), 'MIDDLE'),
]))
story += [diff_tbl, sp(6)]
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# TECHNOLOGY
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('4. Technology Architecture'), sp(8)]
story.append(P('4.1 Seven-Layer Sensing Architecture', 'h2'))
story.append(P(
    'CURA integrates up to seven passive sensing layers. Deployments use a subset of layers '
    'selected based on environment, budget, and monitoring requirements. Layer 1 (WiFi CSI) '
    'is present in all deployments. Additional layers are added for higher accuracy or specific '
    'clinical requirements.'
))

layers_tbl = data_table(
    ['Layer', 'Hardware', 'Primary Function', 'Status', 'Cost (AUD)'],
    [
        ['L1 — WiFi CSI', 'ESP32-S3 microcontroller ×6', 'Breathing, HR, individual ID, presence, falls', 'Proven — validated in simulation', '~$120 per ward'],
        ['L2 — mmWave Radar', 'TI IWR6843AOPEVM', 'HR, HRV, arrhythmia, BP trend, gait', 'Hardware available — integration pending', '~$380 per unit'],
        ['L3 — Thermal IR', 'Melexis MLX90640 (32×24px)', 'Skin temperature, position, person count', 'Drivers available — trivial integration', '~$55 per unit'],
        ['L4 — BCG Mattress', 'Piezoelectric film overlay', 'High-accuracy cardiac waveform, HRV', 'Commercial products available', '~$80-150 per bed'],
        ['L5 — LiDAR', 'ToF ranging sensor', '3D position, posture, fall geometry', 'Open source libraries available', '~$80-200 per unit'],
        ['L6 — Passive Acoustic', 'Microphone array', 'Cough, wheeze, stridor, respiratory sounds', 'Local processing only — no audio stored', '~$20-50 per unit'],
        ['L7 — Floor Pressure', 'Pressure tile array', 'Gait biometrics, fall impact, exit detection', 'Custom integration required', '~$200-500 per zone'],
    ],
    col_widths=[PW*0.14, PW*0.18, PW*0.28, PW*0.22, PW*0.18]
)
story += [layers_tbl, sp(8)]

story.append(warn_box('Honest Assessment — Layer Maturity',
    'Layer 1 (WiFi CSI) is proven in simulation and the literature. Layers 2-4 have validated '
    'hardware and software components but require system integration work. Layers 5-7 are '
    'technically sound but not yet integrated into the CURA stack. The Phase 1 pilot product '
    'uses Layers 1 and 3. Full seven-layer deployment is a 12-24 month build programme.'))
story.append(sp(8))

story.append(P('4.2 WiFi CSI — How It Works', 'h2'))
story.append(P(
    'IEEE 802.11 WiFi operates by transmitting modulated signals across multiple subcarrier '
    'frequencies. The Channel State Information (CSI) describes how the signal was modified '
    'by the environment between transmitter and receiver — encoding information about every '
    'object the signal encountered. Standard consumer WiFi chips discard this information after '
    'decoding the data payload. The ESP32-S3 microcontroller exposes the raw CSI data across '
    '56 subcarrier channels, providing per-subcarrier amplitude and phase measurements at up to '
    '200 packets per second.'
))
story.append(P(
    'Human breathing displaces the chest wall 1-4 millimetres per breath, shifting the phase '
    'of reflected WiFi signals by a measurable fraction of a wavelength. A bandpass filter '
    'isolating the 0.1-0.5 Hz frequency range (corresponding to 6-30 breaths per minute) '
    'extracts the breathing signal from the CSI amplitude time series. Cardiac micro-motion '
    '(approximately 0.1-0.5 mm displacement) produces a weaker signal in the 0.8-2.5 Hz range. '
    'Six nodes positioned around a 10-bed ward create 30 crossing signal paths, each providing '
    'an independent measurement of the breathing and cardiac signals of each person in the space.'
))

story.append(P('4.3 Processing Stack', 'h2'))
stack_tbl = data_table(
    ['Layer', 'Technology', 'Function'],
    [
        ['Firmware', 'ESP32-S3 + esp-csi (Espressif, MIT)', 'CSI data acquisition, UDP transmission to processing unit'],
        ['Sensing server', 'RuView (Rust, Docker, MIT licensed)', 'CSI ingestion, vital sign extraction, pose detection'],
        ['Individual ID', 'Dual-branch transformer (PyTorch)', 'Amplitude + phase stream processing, 128-dim body signature'],
        ['Multi-modal fusion', 'ResNet + spatial-channel attention', 'Combining WiFi, radar, thermal, BCG data streams'],
        ['Vital sign extraction', 'scipy, BioSPPy, NeuroKit2, librosa', 'Breathing patterns, HRV, arrhythmia, sleep stage, acoustics'],
        ['Application API', 'FastAPI (Python)', 'REST and WebSocket API for dashboard and integrations'],
        ['Database', 'PostgreSQL (append-only schema)', 'Compliance records with digital signature chains'],
        ['Staff interface', 'React', 'Ward dashboard, floor plan, alert management'],
        ['Infrastructure', 'Docker Compose', 'One-command deployment, watchdog auto-restart'],
        ['Host hardware', 'Raspberry Pi 5 (8GB) or Beelink NUC', 'All computation on-site, no cloud dependency'],
    ],
    col_widths=[PW*0.18, PW*0.32, PW*0.50]
)
story += [stack_tbl, sp(6)]
story.append(info_box('Entire software stack is open source',
    'All sensing libraries, AI frameworks, and application components are MIT or Apache '
    'licensed. Zero licensing fees. Zero cloud subscriptions. CURA\'s value is in the '
    'integration, training pipeline, and compliance architecture — not in proprietary '
    'sensing algorithms.'))
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# INDIVIDUAL IDENTIFICATION
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('5. Individual Identification System'), sp(8)]
story.append(P(
    'The ability to attribute vital signs to specific named individuals is CURA\'s primary '
    'commercial differentiator. Existing WiFi sensing platforms can detect that breathing is '
    'present and estimate the count of persons, but cannot determine which vital sign reading '
    'belongs to which specific person. CURA\'s individual identification system is built on '
    'published academic research and extends it to address the specific constraints of '
    'regulated care environments.'
))
story.append(P('5.1 Dual-Branch Transformer Architecture', 'h2'))
story.append(P(
    'The identification mechanism is based on the dual-branch transformer architecture published '
    'by Avola et al. (Sapienza University of Rome, IEEE 2023), which demonstrated 99.82% '
    'stationary individual identification accuracy using WiFi CSI amplitude and phase streams '
    'processed in separate neural network branches on ESP32 hardware. CURA implements this '
    'architecture as the identification layer within a regulated care deployment context. '
    'CURA\'s novel contribution is not the architecture itself but its application to '
    'non-consenting, non-cooperative persons in regulated care environments for the purpose '
    'of vital sign attribution and compliance record generation.'
))
story.append(P(
    'The dual-branch transformer processes CSI amplitude and phase streams in separate branches '
    'using multi-head self-attention to extract temporal patterns and cross-subcarrier correlations. '
    'The branches are fused to produce a 128-dimensional individual body signature embedding. '
    'For stationary persons — sleeping aged care residents, hospital inpatients, detained persons '
    'at night — the embedding is highly stable, reflecting consistent body geometry and resting '
    'physiological state.'
))

story.append(P('5.2 Self-Supervised Calibration', 'h2'))
story.append(P(
    'The calibration process requires no staff action and no person cooperation. The system collects '
    'CSI data during a minimum 10-minute rest period, generates embeddings, clusters them using '
    'DBSCAN (with person count validated against thermal array data), and assigns persistent '
    'identifiers to each cluster. Staff may optionally map identifiers to resident names; the system '
    'generates valid compliance records using internal identifiers if names are not provided. This '
    'is specifically designed for populations who cannot cooperate with biometric enrolment procedures.'
))

story.append(P('5.3 Identification Accuracy by Environment', 'h2'))
id_tbl = data_table(
    ['Environment', 'Primary Method', 'Published Accuracy*', 'Calibration Time'],
    [
        ['Aged care beds (overnight)', 'Stationary WiFi CSI dual-branch transformer', '99.82% (stationary)', '10 minutes'],
        ['Childcare sleep room', 'Stationary WiFi CSI dual-branch transformer', '99.82% (stationary)', '10 minutes'],
        ['Corrections single cell', 'mmWave physiological biometric', '96-99%', '24-72 hours'],
        ['Aged care common areas', 'WhoFi + radar gait fusion', '~95% combined', '48-72 hours'],
        ['Corrections dormitory', 'WiFi CSI + radar + thermal fusion', '>99% multi-modal', '72 hours'],
    ],
    col_widths=[PW*0.26, PW*0.32, PW*0.22, PW*0.20]
)
story += [id_tbl, sp(4)]
story.append(P('* Published academic validation under controlled conditions. Independent clinical '
               'validation in real care facilities pending. Real-world accuracy will vary.', 'note'))
story.append(sp(6))

story.append(warn_box('Critical Limitation',
    'Individual identification accuracy in real multi-occupancy care environments has not yet been '
    'independently validated. Published figures derive from controlled laboratory studies with healthy '
    'adult volunteers. Aged care residents may have atypical body composition affecting embedding '
    'stability. Environmental factors including metal bed frames, air conditioning vents, and thick '
    'concrete walls reduce accuracy. The Phase 1 pilot programme will establish real-world baselines.'))
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# VITAL SIGNS
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('6. Individual Vital Sign Suite'), sp(8)]
story.append(P(
    'CURA monitors a comprehensive suite of vital signs and health parameters per identified individual. '
    'Parameters are divided by current technical readiness: those proven in the literature and buildable '
    'now; those requiring additional integration work; and those that are longer-term research objectives.'
))

story.append(P('6.1 Phase 1 — Immediately Buildable', 'h2'))
p1_tbl = data_table(
    ['Parameter', 'Source Layer(s)', 'Alert Threshold', 'Clinical Relevance'],
    [
        ['Breathing rate', 'L1 WiFi CSI', 'Below 8 or above 30 breaths/min', 'Respiratory failure, apnoea, SIDS'],
        ['Breathing presence / apnoea', 'L1 WiFi CSI', 'Cessation >15s adults, >10s infants', 'Emergency alert — cardiac and respiratory'],
        ['Presence / absence', 'L1 WiFi CSI + L3 thermal', 'Absent from expected position', 'Wandering, fall outside room'],
        ['Person count', 'L1 WiFi CSI + L3 thermal', 'Unexpected count change', 'Intrusion, absconding'],
        ['Skin surface temperature', 'L3 thermal', 'Deviation from individual baseline', 'Fever onset, hypothermia'],
        ['Fall detection', 'L1 WiFi CSI + L3 thermal', 'Any detected fall event', 'Immediate staff response'],
        ['Body position', 'L3 thermal + L5 LiDAR', 'Prolonged same position', 'Pressure injury risk'],
    ],
    col_widths=[PW*0.22, PW*0.20, PW*0.28, PW*0.30]
)
story += [p1_tbl, sp(8)]

story.append(P('6.2 Phase 2 — Integration Required (3-6 months)', 'h2'))
p2_tbl = data_table(
    ['Parameter', 'Source Layer(s)', 'Clinical Relevance', 'Build Complexity'],
    [
        ['Heart rate', 'L2 radar, L4 BCG, L1 at 5GHz', 'Tachycardia, bradycardia', 'Moderate — libraries exist'],
        ['Heart rate variability (HRV)', 'L4 BCG + L2 radar', 'Autonomic state, deterioration predictor', 'Moderate — NeuroKit2 covers this'],
        ['Arrhythmia — A-fib, pauses', 'L4 BCG + L2 radar', 'Cardiac safety — critical for dementia', 'Hard — BCG morphology analysis'],
        ['Sleep stage (N1/N2/N3/REM)', 'L1 + L2 + L4 fusion', 'Sleep quality, dementia progression', 'Hard — needs training data'],
        ['Breathing pattern classification', 'L1 + L2', 'Cheyne-Stokes, apnoea classification', 'Moderate — signal processing'],
        ['Gait parameters', 'L5 LiDAR + L7 floor pressure', 'Fall risk, neurological deterioration', 'Moderate — open3d available'],
        ['Respiratory sounds', 'L6 acoustic (local processing)', 'Crackles, wheeze, stridor', 'Hard — model training needed'],
    ],
    col_widths=[PW*0.22, PW*0.22, PW*0.28, PW*0.28]
)
story += [p2_tbl, sp(8)]

story.append(P('6.3 Phase 3 — Research-Grade (12+ months)', 'h2'))
story.append(P(
    'Blood pressure trend estimation from pulse transit time (PTT) across BCG and radar modalities; '
    'tidal volume estimation from WiFi CSI amplitude modulation depth; HRV DFA alpha-1 for '
    'longitudinal deterioration prediction; full polysomnography-equivalent sleep staging with '
    'AHI computation; and swallowing detection from passive acoustic signals. These parameters '
    'are scientifically supported but require independent clinical validation before deployment.'
))
story.append(warn_box('Important Qualification',
    'Blood pressure and tidal volume estimation from passive RF sensing are not clinically validated '
    'at the accuracy required for individual patient management. These remain research objectives. '
    'CURA does not make clinical diagnostic claims for these parameters.'))
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# DEPLOYMENTS
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('7. Deployment Configurations'), sp(8)]

deps = [
    ('Residential Aged Care — General Ward', TEAL_PALE, TEAL,
     'Six ESP32-S3 nodes positioned around a 10-bed ward create 30 crossing signal paths. '
     'The system monitors breathing, presence, and falls per resident continuously overnight. '
     'Individual ID calibrates in 10 minutes. Staff access the dashboard from any LAN browser. '
     'Compliance records meet ACQSC quality indicator requirements.',
     'L1, L3 (Phase 1) + L4, L2 (Phase 2)', '$60-75 per bed per month'),
    ('Residential Aged Care — Memory Care / Dementia', TEAL_PALE, TEAL,
     'Enhanced deployment with LiDAR and floor pressure arrays for wandering detection and '
     'covert exit monitoring. Specifically designed for residents who cannot participate in '
     'biometric enrolment and frequently change bed positions. System tracks individual through '
     'position changes using multi-modal fusion.',
     'L1, L3, L5, L7', '$75-95 per bed per month'),
    ('Correctional Facilities — Single Cell', CORAL_L, CORAL,
     'Single mmWave radar unit per cell provides high-confidence vital sign monitoring and '
     'physiological biometric individual identification without WiFi infrastructure. Generates '
     'continuous per-cell welfare records structured for coronial inquest evidentiary purposes. '
     'No cameras. Processing within facility security perimeter.',
     'L2 (+ L1 where WiFi available)', '$70-80 per cell per month'),
    ('Childcare / Daycare Sleep Rooms', GREEN_L, GREEN,
     'No cameras. Per-child breathing monitoring during rest periods. Alert within 10 seconds '
     'of breathing cessation. Compliance records satisfy Education and Care Services National '
     'Regulations 2011 active supervision requirements. SIDS-pattern breathing detection.',
     'L1, L3', '$50-65 per room per month'),
    ('Hospital-in-the-Home', PURPLE_L, PURPLE,
     'Portable edge node kit for home installation. Full vital sign monitoring without '
     'wearable attachment. Consented encrypted vital sign streams to treating clinician '
     'dashboard via zero-knowledge relay. HL7 FHIR output for EMR integration.',
     'L1, L2, L3 portable kit', '$85-110 per patient per month'),
    ('Disability Group Homes (NDIS SIL)', AMBER_L, AMBER,
     'Overnight welfare monitoring without staff presence in resident bedrooms. NDIS '
     'incident-reporting-compatible event records. Specifically adapted for residents '
     'with intellectual disability who cannot maintain wearable devices.',
     'L1, L3', '$55-70 per resident per month'),
]

for title, bg, bord, desc, layers, price in deps:
    row = Table([
        [Paragraph(title, mk('dt', fontName='Helvetica-Bold', fontSize=10,
                  textColor=colors.HexColor('#1a1a1a'), leading=14)),
         Paragraph(price, mk('dp', fontSize=9, textColor=bord, alignment=TA_RIGHT,
                  fontName='Helvetica-Bold', leading=14))],
        [Paragraph(desc, mk('dd', fontSize=9, leading=14, alignment=TA_JUSTIFY)), ''],
        [Paragraph(f'<b>Sensing layers:</b> {layers}',
                  mk('dl', fontSize=8.5, textColor=MUTED, leading=12)), ''],
    ], colWidths=[PW*0.72, PW*0.28])
    row.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), bg),
        ('BOX',(0,0),(-1,-1), 1, bord),
        ('TOPPADDING',(0,0),(-1,-1), 6), ('BOTTOMPADDING',(0,0),(-1,-1), 6),
        ('LEFTPADDING',(0,0),(-1,-1), 10), ('RIGHTPADDING',(0,0),(-1,-1), 10),
        ('VALIGN',(0,0),(-1,-1), 'TOP'),
        ('SPAN',(0,1),(1,1)), ('SPAN',(0,2),(1,2)),
    ]))
    story += [row, sp(5)]
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# PATENT PORTFOLIO
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('8. Intellectual Property — Patent Portfolio'), sp(8)]
story.append(P(
    'CURA\'s IP is protected by three Australian provisional patent specifications filed at '
    'IP Australia in May 2026. The provisionals lock priority dates for 122 claims across '
    'the full CURA architecture. Standard patents must be filed within 12 months (by May 2027). '
    'All three provisionals were subjected to multiple rounds of independent technical audit '
    'before filing.'
))
story.append(sp(6))

# Patent 1
for item in patent_box(
    'AMCZ-2615743059',
    'System and Method for Passive Multi-Modal Wireless Sensing, Privacy-Preserving Sensor Data '
    'Recording, and Comprehensive Individual-Attributed Vital Sign Monitoring, Identity Verification, '
    'Welfare Compliance Logging, Clinical Early Warning and Longitudinal Health Surveillance in '
    'Regulated Care, Custodial and Child Supervision Environments',
    '45', '11 May 2026'
):
    story.append(item)
story.append(sp(3))
story.append(P(
    'Covers: all 7 sensing layers; dual-branch transformer individual ID without biometric enrolment; '
    'full vital sign suite per individual (breathing, HR, HRV, arrhythmia, sleep stage, falls, '
    'gait, body position, composite health score); privacy-preserving sensor data archival '
    '(thermal sequences, LiDAR point clouds, CSI matrices, radar maps, BCG waveforms, acoustic '
    'features) per individual; longitudinal health profiles; personalised deterioration prediction; '
    'all 10 regulated care environments.', 'note'))
story.append(sp(8))

# Patent 2
for item in patent_box(
    'AMCZ-2615744013',
    'System and Method for Edge-Cloud Partitioned Passive Wireless Vital Sign Monitoring with '
    'Heterogeneous-Environment Federated Model Optimisation, Privacy-Preserving Population Health '
    'Analytics, and Remote Clinical Oversight in Regulated Care Networks',
    '34', '11 May 2026'
):
    story.append(item)
story.append(sp(3))
story.append(P(
    'Covers: CSI feature compression pipeline (93-99% bandwidth reduction); hardware-normalised '
    'federated aggregation across heterogeneous WiFi chipsets; layer-adaptive differential privacy '
    'for physiological model training; HSM identity partitioning (cryptographic, not administrative); '
    'zero-knowledge relay for hospital-in-the-home; population health analytics on de-identified '
    'differentially-private aggregates.', 'note'))
story.append(sp(8))

# Patent 3
for item in patent_box(
    'AMCZ-2615745256',
    'System and Method for Security-Hardened Federated Passive Vital Sign Monitoring Networks '
    'Comprising Physiologically-Calibrated Byzantine Gradient Aggregation with Dynamic Trust Decay '
    'and Server-Side Holdout Validation; Three-Level DP Governance with Multi-Modal Interference '
    'Detection; Zero-Gap Short-Lived Certificate Management with Biometric-Wrapped Persistent '
    'Storage; Mesh-Extended Dual-Path Alert Delivery with TOTP Device Registration; and '
    'Multi-Sensor Quorum-Gated Cryptographic Key Destruction',
    '43', '11 May 2026'
):
    story.append(item)
story.append(sp(3))
story.append(P(
    'Covers: Byzantine poisoning detection calibrated to physiological CSI gradient statistics; '
    'dynamic trust decay replacing binary probationary graduation; server-side gold-standard '
    'holdout validation with permanent node revocation; three-level DP governance (platform '
    'ceiling / regulatory floor / operator config); multi-modal interference detection; '
    'biometric-wrapped certificate persistence; ESP32 mesh secondary alert network; TOTP '
    'device registration; multi-sensor quorum-gated key destruction.', 'note'))
story.append(sp(8))

story.append(P('8.1 Prior Art Landscape', 'h2'))
story.append(P(
    'A comprehensive prior art search was conducted on 11 May 2026 across Google Patents '
    '(including Scholar results), IEEE Xplore, and academic literature. Six targeted patent '
    'searches returned zero results for the combination of WiFi CSI sensing with federated '
    'learning for physiological monitoring. Two significant academic papers were identified '
    'and are documented below with distinction analysis.'
))
prior_tbl = data_table(
    ['Reference', 'Status', 'Relevance to CURA'],
    [
        ['WO2017/156492 (Origin Wireless Inc., 2017)', 'CEASED — no AU national phase', 'WiFi CSI breathing detection — basic method is public domain. Does NOT cover individual attribution, vital sign archival, compliance records, or any CURA-specific claims.'],
        ['AU2023202326 (Hangzhou Normal University)', 'GRANTED', 'BCG under-mattress vital signs only. Not WiFi CSI. No individual identification. Not relevant to CURA WiFi claims.'],
        ['US12279190 (2024)', 'Granted — US only, no AU filing', 'CSI breathing with AGC compensation. US jurisdiction only. Not prior art in Australia.'],
        ['IEEE 10235745 — Avola et al., Sapienza University of Rome (2023)', 'Academic — not patented', 'IMPORTANT: Dual-branch transformer processing CSI amplitude and phase separately — achieves 99.82% stationary identification on ESP32. This is the academic source of CURA\'s 99.82% figure and identification architecture. CURA cannot claim this mechanism broadly. CURA\'s novel ground: self-supervised calibration for non-consenting persons, vital sign attribution per identified individual, regulated care compliance records — none in this paper.'],
        ['SADU — Dave, Patel, Sun (TechRxiv preprint, Sep 2025)', 'Academic — not patented', 'Multi-user WiFi CSI identification using deep unfolding + manifold attention. 95.9-99.9% identity accuracy. Not patented. Does not cover federated learning, vital signs, or care environments. Requires careful claim drafting at standard patent conversion to distinguish architecturally.'],
    ],
    col_widths=[PW*0.30, PW*0.16, PW*0.54]
)
story += [prior_tbl, sp(6)]
story.append(warn_box('Patent Attorney Briefing — Standard Conversion May 2027',
    'At standard patent conversion, the patent attorney must be briefed on IEEE 10235745 (Sapienza 2023). '
    'Independent claims must NOT read as "dual-branch transformer processing amplitude and phase separately" — '
    'that architecture belongs to Sapienza. Claims must be anchored to the novel application context: '
    'self-supervised calibration for non-consenting persons (dementia, infants, detainees), vital sign '
    'attribution per identified individual, and regulated care compliance record generation. '
    'These applications do not appear in any identified prior art.'))
story.append(sp(4))
story.append(info_box('Patent Database Search Result — 11 May 2026',
    'Six targeted Google Patents searches combining WiFi CSI + federated learning + vital signs + '
    'individual identification returned zero results. The 323-patent broad search was entirely '
    'wireless communications patents (Qualcomm, Huawei, LG, Intel) — none in physiological sensing. '
    'The patent field is clear. Academic literature requires careful claim drafting around Sapienza 2023.'))
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# COMPETITIVE ANALYSIS
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('9. Competitive Landscape'), sp(8)]
story.append(P(
    'The passive vital sign monitoring space is early but accelerating. Two direct competitors '
    'are active in the Australian market. Multiple incumbent technology vendors address adjacent '
    'requirements. CURA\'s competitive position is differentiated by its air-isolated architecture '
    'and individual attribution capability.'
))

story.append(P('9.1 Direct Competitors', 'h2'))
story.append(P('<b>Talius Group (ASX: TAL) + Inturai</b>', 'h3'))
story.append(P(
    'Talius Group is the most significant Australian competitive threat. Talius aggregates sensors '
    'for aged care — their clients include Bolton Clarke, Whiddon, Uniting, Anglicare, and Keyton. '
    'In January 2026, Talius signed a non-binding LOI with Inturai Ventures (CSE: URAI) for WiFi '
    'spatial sensing integration — a $2.5M USD target over three years. Inturai uses standard WiFi '
    'signals for health score, sleep monitoring, and presence detection.'
))
story.append(P(
    '<b>Key difference:</b> Inturai/Talius is cloud-based. CURA is local/network-isolated. This is '
    'a genuine differentiator for corrections (data sovereignty requirement), high-security aged '
    'care, and any facility with strict privacy governance requirements. The cloud architecture '
    'also creates per-facility ongoing cloud costs that CURA\'s local model avoids.'
))
story.append(P(
    'Talius is also approaching Inturai for spatial intelligence but their current product '
    'portfolio (PIR sensors, emergency pendants, BCG mattress sensors, ECG smartwatches) does not '
    'include passive individual vital sign attribution from WiFi. Their "Umbrella" wearable and '
    '"Ikarya" WiFi product are both "Coming Soon" as of the date of this document.'
))

story.append(P('<b>CSIRO / HSC Technology</b>', 'h3'))
story.append(P(
    'CSIRO\'s Smarter Safer Homes platform uses PIR and motion sensors (not WiFi CSI) for '
    'behavioural monitoring in residential aged care. Commercialised through HSC Technology '
    '(now Talius). Active ARIIA-funded trials with Whiddon. Motion-sensor based — no vital '
    'signs, no individual attribution.'
))

story.append(P('9.2 Incumbent Technology Vendors', 'h2'))
comp_tbl = data_table(
    ['Vendor', 'Technology', 'CURA Advantage'],
    [
        ['Tunstall / Alarms', 'Emergency pendants, PIR', 'Passive — no wearable, no activation required'],
        ['CardiacSense (via Talius)', 'TGA-approved ECG+PPG watch', 'No wearable compliance required for dementia/corrections'],
        ['Foresite / FallCall', 'Fall detection sensors', 'Breathing + vitals, not just falls; individual attribution'],
        ['Sleep Sense (BCG mattress)', 'WiFi-connected BCG', 'Multi-bed, individual attribution; network-isolated'],
        ['Philips HealthSuite', 'Cloud health data aggregation', 'Local processing; no cloud dependency; corrections-ready'],
    ],
    col_widths=[PW*0.22, PW*0.25, PW*0.53]
)
story += [comp_tbl, sp(6)]
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# CRITICAL ASSESSMENT
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('10. Critical Assessment — Limitations and Risks'), sp(8)]
story.append(teal_box(
    'This section presents an honest assessment of CURA\'s limitations, risks, and unresolved '
    'challenges. It is not marketing material. Any facility, investor, or regulatory body '
    'evaluating CURA should read this section.'
))
story.append(sp(8))

story.append(P('10.1 Technical Limitations', 'h2'))
risks = [
    ('Individual ID accuracy in real care environments is unproven',
     'Published accuracy figures (99.82% stationary WiFi CSI) derive from controlled laboratory '
     'studies with healthy adult volunteers. Aged care residents with atypical body composition, '
     'dementia-related movement patterns, or medical devices may produce less stable embeddings. '
     'Real-world accuracy requires independent validation in actual care facilities. '
     '<b>Mitigation:</b> Phase 1 pilot will establish baseline accuracy data. Claims will be '
     'qualified as "target accuracy under controlled conditions" until independently validated.',
     RED_L, RED),
    ('Blood pressure and tidal volume estimation are research-grade, not clinical-grade',
     'Passive PTT-based blood pressure estimation and WiFi CSI tidal volume estimation are '
     'theoretically sound but have not been demonstrated at clinically useful accuracy in '
     'shared-room passive sensing environments. These remain research objectives, not deployable '
     'features. <b>Mitigation:</b> Phase 1 does not include these parameters. They are in the '
     'patent to stake IP territory for future development.',
     RED_L, RED),
    ('Multi-person cardiac monitoring accuracy degrades with room occupancy',
     'In a 10-person ward, WiFi CSI heart rate attribution accuracy is estimated at 55-65% '
     'compared with 90%+ for breathing. Individual cardiac monitoring requires the mmWave radar '
     'layer (Layer 2) for acceptable accuracy. The Phase 1 product (WiFi CSI + thermal only) '
     'should not be marketed for cardiac monitoring in multi-occupancy environments.',
     AMBER_L, AMBER),
    ('Environmental factors degrade sensing performance',
     'Metal bed frames scatter WiFi signals unpredictably. Air conditioning vents create '
     'periodic motion artifacts. Thick reinforced concrete walls attenuate WiFi signals between '
     'rooms. Each facility deployment requires calibration assessment. Some environments may '
     'not be suitable for WiFi CSI sensing.',
     AMBER_L, AMBER),
    ('The 7-layer stack is a multi-year build programme, not a current product',
     'The full CURA architecture — all 7 sensing layers, all 19 vital sign parameters, all '
     '10 deployment configurations — represents a 3-5 year development roadmap. The Phase 1 '
     'product delivers Layers 1 and 3 with breathing, presence, falls, and basic individual ID. '
     'Investors and partners should evaluate CURA against Phase 1 deliverables, not the '
     'full patent specification.',
     AMBER_L, AMBER),
]
for title, text, bg, bord in risks:
    box = Table([[Paragraph(f'<b>{title}</b>', mk('rt', fontSize=9.5, textColor=bord,
                 fontName='Helvetica-Bold', leading=14))],
                [Paragraph(text, mk('rb', fontSize=9, textColor=BLACK,
                 leading=14, alignment=TA_JUSTIFY))]],
                colWidths=[PW])
    box.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), bg),
        ('BOX',(0,0),(-1,-1), 1, bord),
        ('TOPPADDING',(0,0),(-1,-1), 6), ('BOTTOMPADDING',(0,0),(-1,-1), 6),
        ('LEFTPADDING',(0,0),(-1,-1), 10), ('RIGHTPADDING',(0,0),(-1,-1), 10),
    ]))
    story += [box, sp(5)]

story.append(P('10.2 Regulatory Risks', 'h2'))
story.append(P(
    '<b>TGA classification:</b> If CURA makes clinical outputs — arrhythmia alerts, deterioration '
    'predictions, breathing cessation alerts — it may be classified as Software as a Medical Device '
    '(SaMD) under the Therapeutic Goods Act 1989. SaMD Class IIa or higher requires ARTG listing '
    'before commercial sale to hospitals or aged care facilities making clinical decisions based '
    'on the system output. A TGA regulatory consultant opinion is required before any clinical '
    'marketing claims are made. The intended use statement in the patent specification positions '
    'CURA as welfare monitoring infrastructure, not a medical device — but specific deployment '
    'configurations may cross the SaMD threshold.'
))
story.append(P(
    '<b>Privacy Act 1988:</b> The system identifies individuals and archives per-individual health '
    'data. This is personal information under the Privacy Act regardless of the sensing modality. '
    'A Privacy Impact Assessment is required before handling real resident data. The local '
    'processing architecture substantially reduces privacy risk but does not eliminate '
    'compliance obligations.'
))
story.append(P(
    '<b>Coronial evidence admissibility:</b> CURA generates compliance records claimed to be '
    'suitable for coronial proceedings. Actual admissibility in specific proceedings is determined '
    'by the relevant coroner, not by system design. Chain of custody, calibration records, and '
    'system validation documentation will be required to establish evidential weight.'
))

story.append(P('10.3 Commercial Risks', 'h2'))
story.append(P(
    '<b>Talius/Inturai market timing:</b> Talius is actively signing MSAs with major aged care '
    'operators (Adventist Retirement Plus signed April 2026). If Talius completes Inturai '
    'integration before CURA reaches market, the largest aged care group operators may be '
    'locked in. CURA\'s differentiation (local processing, corrections-ready, individual '
    'attribution) protects it from full displacement, but speed to market matters.'
))
story.append(P(
    '<b>Alien technology adoption risk:</b> Aged care facility managers and corrections '
    'administrators are not technology adopters. Demonstrating that WiFi signals can monitor '
    'breathing without cameras or wearables requires significant education. The first pilot '
    'will be the hardest sale.'
))
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# COMMERCIAL MODEL
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('11. Commercial Model and Market Opportunity'), sp(8)]
story.append(P('11.1 Product Tiers', 'h2'))
tier_tbl = data_table(
    ['Tier', 'Hardware', 'Identification', 'Best For', 'Monthly Fee'],
    [
        ['CURA Standard', 'ESP32-S3 nodes ×6', 'Fixed position assignment', 'Sleep rooms, single cells, budget', '$60 per position'],
        ['CURA Identify', 'ESP32-S3 + MLX90640', 'WiFi CSI dual-branch transformer', 'Aged care overnight, childcare', '$75 per position'],
        ['CURA Precision', 'ESP32-S3 + IWR6843 + MLX90640', '>95% static + moving', 'Corrections, aged care common areas', '$95 per position'],
    ],
    col_widths=[PW*0.14, PW*0.22, PW*0.22, PW*0.24, PW*0.18]
)
story += [tier_tbl, sp(8)]

story.append(P('11.2 Total Addressable Market', 'h2'))
market_tbl = data_table(
    ['Sector', 'Units', 'Price/Unit/Month', 'Annual Revenue (10% penetration)'],
    [
        ['Residential aged care', '200,000 beds', '$70', '$16.8M ARR'],
        ['Correctional facilities', '40,000 cells', '$75', '$3.6M ARR'],
        ['Childcare sleep rooms', '150,000 rooms', '$55', '$9.9M ARR'],
        ['Hospital-in-the-home', '50,000 patients', '$90', '$5.4M ARR'],
        ['NDIS SIL group homes', '30,000 residents', '$65', '$2.3M ARR'],
        ['Mental health step-down', '15,000 beds', '$70', '$1.3M ARR'],
        ['<b>Total TAM (10% penetration)</b>', '', '', '<b>~$39.3M ARR</b>'],
    ],
    col_widths=[PW*0.30, PW*0.18, PW*0.22, PW*0.30]
)
story += [market_tbl, sp(8)]

story.append(P('11.3 Revenue Model and Unit Economics', 'h2'))
story.append(P(
    'CURA is sold as a managed hardware-as-a-service subscription. Health Plus International '
    'supplies and installs the hardware, provides the software platform, and charges a monthly '
    'fee per monitored position. The facility operator has no capital expenditure.'
))
econ_tbl = data_table(
    ['Item', 'Cost'],
    [
        ['Hardware per 10-bed ward (6× ESP32-S3 + 2× thermal)', '~$230 AUD'],
        ['Processing unit (Beelink NUC)', '~$200 AUD'],
        ['Installation and configuration', '~$300 AUD (one-off)'],
        ['Total hardware + setup per 10-bed ward', '~$730 AUD'],
        ['Monthly revenue at $70/bed × 10 beds', '$700/month'],
        ['Hardware recovery period', '< 2 months'],
        ['Gross margin post hardware recovery', '>85%'],
        ['Year 1 target: 10 facilities × 30 positions', '$252,000 ARR'],
        ['Year 2 target: + 5 corrections × 150 cells', '$630,000 additional ARR'],
    ],
    col_widths=[PW*0.65, PW*0.35]
)
story += [econ_tbl, sp(6)]
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# IMPLEMENTATION ROADMAP
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('12. Implementation Roadmap'), sp(8)]
road_tbl = data_table(
    ['Phase', 'Timeline', 'Deliverable', 'Milestone'],
    [
        ['Phase 0 — IP', 'May 2026 ✅', 'Three provisional patents filed\nTrademarks pending', 'AMCZ-2615743059, -44013, -45256'],
        ['Phase 1 — Build', 'Boards arrive → 8 weeks', 'Working prototype: L1+L3\nBreathing, presence, falls, basic ID\nStaff dashboard\nCompliance records', 'Demonstrated working system at Carlingford'],
        ['Phase 2 — Pilot', 'Week 9 → Month 6', 'Free 90-day pilot\n1 aged care facility\nPerformance data\nTestimonial', 'Accuracy validation, regulatory defensibility confirmed'],
        ['Phase 3 — Commercial', 'Month 7 → Month 18', 'First paid deployments\nLayer 2 (mmWave) integration\nSleep stage, arrhythmia\nFederated learning MVP', '10 facilities, $252K ARR target'],
        ['Phase 4 — Scale', 'Month 18 → Month 36', 'Corrections market entry\nQLD priority (Talius active there)\nNSW Justice Health\nHiTH cloud architecture', '$882K ARR target'],
        ['Phase 5 — IP Conversion', 'May 2027', 'Standard patents filed\nAll 3 provisionals converted\nPatent attorney engagement', '122 claims examined and defended'],
    ],
    col_widths=[PW*0.14, PW*0.18, PW*0.38, PW*0.30]
)
story += [road_tbl, sp(8)]

story.append(P('12.1 Immediate Priority Actions', 'h2'))
story.append(P('<b>This week:</b> File CURA trademark (Class 10 + Class 42) — $500 at ipaustralia.gov.au/trade-marks'))
story.append(P('<b>Boards arrive:</b> Flash ESP32-S3 firmware, benchmark breathing detection at home, validate CSI data stream'))
story.append(P('<b>Month 1:</b> Build Phase 1 software stack — FastAPI, PostgreSQL, React dashboard, Docker Compose deployment'))
story.append(P('<b>Month 2:</b> Identify aged care pilot facility. Health Plus already has relationships in regional NSW. Queensland is priority — Talius is active there.'))
story.append(P('<b>Before any clinical marketing:</b> TGA regulatory consultant opinion on SaMD classification. Privacy Impact Assessment. Clinical governance framework.'))
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# REGULATORY PATHWAY
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('13. Regulatory Pathway'), sp(8)]
reg_tbl = data_table(
    ['Requirement', 'Priority', 'Status', 'Action Required'],
    [
        ['Australian provisional patents (×3)', 'DONE', 'Filed ✅', 'Convert to standard by May 2027'],
        ['CURA trademark — Class 10 + 42', 'URGENT', 'Not filed', 'File this week — $500'],
        ['TGA SaMD classification assessment', 'HIGH', 'Not commenced', 'Engage regulatory consultant before clinical marketing'],
        ['Privacy Impact Assessment', 'HIGH', 'Not commenced', 'Required before handling real resident data'],
        ['Clinical governance framework', 'HIGH', 'Not commenced', 'Required before any facility pilot'],
        ['ISO 27001 gap assessment', 'MEDIUM', 'Not commenced', 'Required for government procurement'],
        ['Essential Eight alignment', 'MEDIUM', 'Not commenced', 'Required for NSW Health / Corrections procurement'],
        ['Independent clinical validation study', 'MEDIUM', 'Pending pilot', 'Phase 2 pilot generates this data'],
        ['ACQSC product assessment', 'LOW', 'Pending validation', 'After clinical validation complete'],
        ['IEC 62443 security certification', 'LOW', 'Planned', 'Before corrections market entry'],
    ],
    col_widths=[PW*0.32, PW*0.12, PW*0.16, PW*0.40]
)
story += [reg_tbl, sp(6)]
story.append(PageBreak())

# ╔══════════════════════════════════════════════════════════╗
# CONCLUSION
# ╚══════════════════════════════════════════════════════════╝
story += [h1_bar('14. Conclusion'), sp(8)]
story.append(P(
    'CURA addresses a genuine, large, and legally consequential gap in Australia\'s regulated care '
    'sector. The core technology — passive WiFi sensing for breathing detection and individual '
    'attribution — is proven in academic research and validated in simulation. The hardware is '
    'available, affordable, and orders have been placed. The IP position is established with three '
    'provisional patents covering the full architecture.'
))
story.append(P(
    'The honest assessment is that CURA is a strong concept at pre-commercial stage. The Phase 1 '
    'product — breathing, presence, falls, individual ID, compliance records — is buildable now '
    'and represents a genuine advance over current manual welfare check practices. The broader '
    'vital sign suite, federated learning architecture, and cloud platform are multi-year build '
    'programmes that require pilot data, clinical validation, and progressive investment.'
))
story.append(P(
    'The competitive window is open but closing. Talius/Inturai is moving. The Queensland aged '
    'care market is being actively contested. The first pilot conversation should happen within '
    '60 days of the boards arriving. The first paid deployment should happen within 12 months.'
))
story.append(sp(8))
story.append(teal_box(
    'CURA does not need to be a 19-parameter, 7-layer, federated AI platform to win its first contract. '
    'It needs to be better than a manual welfare check every two hours. '
    'That bar is cleared with Layer 1 alone.'
))
story.append(sp(12))
story.append(rule())
story.append(sp(6))
story.append(P('For enquiries regarding CURA:', 'cov_meta'))
story.append(P('connect@healthplusint.com.au  |  +61 411 459 755  |  healthplusint.com.au', 'cov_meta'))
story.append(P('Westminster Green Solutions ABN 13 155 901 723 T/A Health Plus International', 'cov_meta'))
story.append(P('Unit 4, 44-46 Keeler Street, Carlingford NSW 2118, Australia', 'cov_meta'))

# ── APPENDIX ──────────────────────────────────────────────────────────────────
story.append(PageBreak())
story += [h1_bar('Appendix A: Signal Processing Pipelines — Phase 3 Research Parameters'), sp(8)]
story.append(P(
    'This appendix documents the signal processing pipelines for two Phase 3 research-grade '
    'parameters: blood pressure trend estimation from pulse transit time (PTT) and tidal volume '
    'classification from WiFi CSI amplitude modulation. Both parameters are included in the CURA '
    'patent portfolio and represent longer-term research objectives requiring independent clinical '
    'validation before deployment. Neither is included in the Phase 1 or Phase 2 product.'
))
story.append(warn_box('Research-Grade Parameters',
    'The pipelines described in this appendix target trend monitoring and individual deviation '
    'detection — not absolute clinical measurement. Absolute blood pressure measurement and '
    'spirometry-grade tidal volume measurement require contact sensors. CURA\'s contribution '
    'is detecting clinically significant changes from individual baselines without physical '
    'sensor attachment.'))
story.append(sp(6))

# ── A.1 Blood Pressure ────────────────────────────────────────────────────────
story.append(P('A.1 Blood Pressure Trend Estimation — Pulse Transit Time Method', 'h2'))
story.append(P('A.1.1 Physiological Basis', 'h3'))
story.append(P(
    'Pulse Transit Time (PTT) is the time interval between the mechanical trigger of cardiac '
    'ventricular ejection and the arrival of the resulting pressure wave at a peripheral '
    'measurement site. PTT correlates inversely with arterial blood pressure via the '
    'Moens-Korteweg equation: higher blood pressure produces greater arterial wall tension, '
    'increased pulse wave velocity, and therefore shorter PTT. The relationship is approximately '
    'linear within the physiological range and is stable within an individual over hours to days, '
    'making PTT suitable for individual trend monitoring after personalised calibration.'
))

story.append(P('A.1.2 Hardware Requirements', 'h3'))
bp_hw = data_table(
    ['Component', 'Hardware', 'Signal', 'Timing Precision'],
    [
        ['Cardiac trigger', 'Layer 4 BCG mattress (piezoelectric)', 'J-wave peak of BCG waveform — mechanical correlate of aortic valve opening', '±10-15ms'],
        ['Peripheral pulse', 'Layer 2 mmWave radar (TI IWR6843)', 'Doppler-detected carotid or radial pulse arrival', '±15-25ms'],
        ['Combined PTT precision', 'L4 + L2 fusion', 'Quadrature sum of individual timing uncertainties', '±18-30ms'],
        ['Clinical requirement', 'Contact PPG (for reference)', 'Gold standard PTT for calibration sessions', '±2-5ms'],
    ],
    col_widths=[PW*0.20, PW*0.25, PW*0.35, PW*0.20]
)
story += [bp_hw, sp(6)]

story.append(P('A.1.3 Signal Processing Pipeline', 'h3'))
story.append(P(
    '<b>Step 1 — BCG cardiac trigger extraction.</b> The BCG waveform from the piezoelectric '
    'mattress overlay is sampled at 100-1000 Hz. A bandpass filter (1-40 Hz) removes DC offset '
    'and high-frequency noise. The J-wave peak — the dominant upward deflection corresponding '
    'to aortic valve opening and peak aortic blood flow — is detected using a template-matching '
    'algorithm trained on the individual\'s BCG waveform during baseline collection. '
    'Inter-beat intervals are validated against the expected heart rate range (30-200 bpm) '
    'to reject motion artefacts.'
))
story.append(P(
    '<b>Step 2 — Radar pulse arrival detection.</b> The IWR6843 mmWave radar operates in '
    'continuous wave mode targeting the carotid artery region. Range-Doppler processing isolates '
    'the velocity signature of the carotid pulse wave at the expected anatomical range. '
    'A matched filter tuned to the expected pulse waveform shape detects the arrival time of '
    'each cardiac pulse with sub-frame precision. Frame rate is configured at 50-100 Hz to '
    'achieve the required temporal resolution.'
))
story.append(P(
    '<b>Step 3 — PTT computation.</b> For each cardiac cycle, PTT is computed as the time '
    'interval between the BCG J-wave peak and the radar-detected carotid pulse arrival. '
    'PTT values outside three standard deviations from the 60-second rolling mean are '
    'rejected as artefacts. A Kalman filter smooths the PTT time series to reduce '
    'beat-to-beat variability while preserving trend information.'
))
story.append(P(
    '<b>Step 4 — Individual baseline and trend detection.</b> During an initial 24-72 hour '
    'baseline period, a PTT-to-BP calibration model is fitted for the individual using '
    'simultaneous reference cuff measurements at regular intervals (minimum 6 reference '
    'measurements). The model is a linear regression: BP = a − b×PTT, with coefficients '
    'a and b fitted per individual. The model is updated weekly using overnight PTT '
    'distributions to account for gradual physiological change.'
))
story.append(P(
    '<b>Step 5 — Alert logic.</b> Sustained PTT reduction of >10% from individual 60-minute '
    'baseline triggers a blood pressure trending alert. A 10% PTT reduction corresponds to '
    'approximately 15-25 mmHg systolic BP increase based on published PTT-BP relationships. '
    'The alert does not display an absolute BP value — it displays a trend indicator '
    '(trending up / stable / trending down) and a severity level (watch / alert / urgent) '
    'based on the magnitude and duration of PTT deviation.'
))

story.append(P('A.1.4 Current Accuracy Limitations', 'h3'))
story.append(P(
    'Passive PTT estimation currently achieves RMSE of 8-12 mmHg in controlled single-subject '
    'conditions (published 2023-2025 literature). Multi-person shared environments, motion '
    'artefacts from care activities, and individual anatomical variation (carotid depth, '
    'mattress coupling variation with position changes) all increase measurement uncertainty. '
    'These limitations make absolute BP values clinically unreliable but do not prevent '
    'detection of sustained trend changes exceeding 20 mmHg — which represent clinically '
    'significant hypertensive episodes or hypotensive deterioration.'
))
story.append(P(
    'Required precision for individual trend monitoring is achievable. Required precision for '
    'absolute clinical measurement is not achievable with current passive sensing hardware. '
    'CURA\'s Phase 3 objective is trend monitoring and hypertensive episode detection — '
    'not replacing the sphygmomanometer.'
))
story.append(sp(6))

# PTT pipeline summary table
ptt_tbl = data_table(
    ['Pipeline Stage', 'Input', 'Algorithm', 'Output'],
    [
        ['BCG trigger', 'Piezoelectric waveform 100-1000 Hz', 'Bandpass filter + template matching', 'J-wave timestamps (ms precision)'],
        ['Radar pulse', 'IWR6843 range-Doppler frames 50-100 Hz', 'Matched filter + peak detection', 'Carotid pulse arrival timestamps'],
        ['PTT calculation', 'Paired cardiac + pulse timestamps', 'Interval computation + Kalman filter', 'Smoothed PTT time series (ms)'],
        ['Calibration', 'PTT time series + reference cuff BP', 'Per-individual linear regression', 'Individual PTT→BP coefficients'],
        ['Trend detection', 'PTT time series vs individual baseline', '10% deviation threshold + duration filter', 'Trending alert (watch/alert/urgent)'],
        ['Alert output', 'Trend severity + duration', 'Clinical alert logic', 'Staff dashboard trend indicator'],
    ],
    col_widths=[PW*0.18, PW*0.25, PW*0.28, PW*0.29]
)
story += [ptt_tbl, sp(8)]

story.append(rule())
story.append(sp(8))

# ── A.2 Tidal Volume ──────────────────────────────────────────────────────────
story.append(P('A.2 Tidal Volume Estimation — WiFi CSI Amplitude Modulation Method', 'h2'))
story.append(P('A.2.1 Physiological Basis', 'h3'))
story.append(P(
    'During inspiration, the thorax expands outward by 1-6 mm depending on breathing depth. '
    'This displacement modulates the amplitude and phase of WiFi signals passing through the '
    'chest region. For a single subcarrier, the received signal amplitude varies approximately '
    'sinusoidally with chest displacement for displacements small relative to the signal '
    'wavelength (2.4 GHz WiFi: λ = 12.5 cm; typical chest displacement: 1-6 mm = 0.8-4.8% '
    'of λ). In this regime, CSI amplitude modulation depth is approximately linear with tidal '
    'volume for a given individual at a fixed position.'
))
story.append(P(
    'The key challenges are: (1) position dependence — the amplitude-volume relationship '
    'changes substantially with the person\'s orientation relative to the antenna; '
    '(2) inter-individual variation — body composition, chest wall compliance, and lung '
    'anatomy create significant individual differences; (3) multi-person interference — '
    'in shared rooms, each person\'s breathing modulates signals from all node pairs. '
    'These challenges are addressed through individual calibration baselines, '
    'multi-node averaging, and independent component analysis for person separation.'
))

story.append(P('A.2.2 Hardware Configuration', 'h3'))
story.append(P(
    'Tidal volume estimation uses the Layer 1 WiFi CSI infrastructure already deployed for '
    'breathing rate detection. No additional hardware is required. The six ESP32-S3 nodes '
    'in a standard ward deployment create 15 independent node pairs, each providing '
    'an independent CSI amplitude time series. Multiple node pairs at different angles '
    'relative to each person reduce the position dependence of individual measurements.'
))

story.append(P('A.2.3 Signal Processing Pipeline', 'h3'))
story.append(P(
    '<b>Step 1 — Per-person CSI extraction.</b> Individual identification from the dual-branch '
    'transformer assigns each bed position a persistent identity. For each identified person, '
    'the system selects the 3-4 node pairs with the highest signal-to-noise ratio for that '
    'person\'s position, based on the CSI breathing signal amplitude at the breathing '
    'frequency. Subcarriers in the 0.1-0.5 Hz band are isolated using a bandpass filter.'
))
story.append(P(
    '<b>Step 2 — Amplitude envelope extraction.</b> For each selected node pair and subcarrier, '
    'the CSI amplitude time series is processed using a Hilbert transform to extract the '
    'instantaneous amplitude envelope. The envelope represents the depth of chest displacement '
    'modulation on the WiFi signal. Breath-by-breath peak amplitude values are extracted '
    'for each respiration cycle using peak detection on the filtered envelope.'
))
story.append(P(
    '<b>Step 3 — Multi-node fusion.</b> Amplitude envelope values from the 3-4 selected '
    'node pairs are combined using a weighted average, with weights proportional to the '
    'signal-to-noise ratio of each node pair for that person. This averaging reduces '
    'position-dependent measurement variation and suppresses interference from other '
    'persons\' breathing signals via spatial diversity.'
))
story.append(P(
    '<b>Step 4 — Individual calibration and classification.</b> During baseline collection, '
    'the individual breathes at rest for 15-30 minutes, establishing a reference amplitude '
    'distribution corresponding to their normal tidal volume at rest (~500 mL). Rather than '
    'estimating absolute tidal volume in mL, the system classifies breathing depth into '
    'four categories relative to individual baseline: shallow (<60% baseline amplitude), '
    'reduced (60-85%), normal (85-115%), and deep (>115%). This categorical approach '
    'avoids the position-dependence problem of absolute mL estimation.'
))
story.append(P(
    '<b>Step 5 — Alert logic.</b> Sustained shallow breathing classification (>60 seconds '
    'at <60% baseline amplitude) triggers a reduced tidal volume alert. This threshold '
    'corresponds to clinically significant hypoventilation — breathing depth insufficient '
    'for adequate gas exchange at normal respiratory rate. The alert is combined with '
    'breathing rate data: shallow breathing at normal rate suggests a different clinical '
    'picture than shallow breathing at elevated rate (tachypnoea).'
))

story.append(P('A.2.4 Current Accuracy Limitations', 'h3'))
story.append(P(
    'Published WiFi CSI tidal volume estimation achieves approximately 15% RMSE in '
    'single-subject controlled-position conditions (CMU 2024, ETH Zurich 2024). '
    'In free-position, multi-occupancy conditions this degrades to 25-35% RMSE for '
    'absolute values. Categorical classification (shallow/normal/deep) is more robust — '
    'estimated classification accuracy of 80-85% in multi-occupancy conditions based '
    'on published signal separation performance.'
))
story.append(P(
    'The 15% RMSE limitation means absolute tidal volume values (mL) are clinically unreliable. '
    'However, detecting a sustained reduction from 500 mL to below 300 mL — the clinically '
    'significant hypoventilation threshold — requires only detecting a >40% amplitude '
    'reduction, which is well above the measurement noise floor. CURA\'s Phase 3 objective '
    'is hypoventilation detection and breathing depth trend monitoring, not spirometry.'
))

tv_tbl = data_table(
    ['Pipeline Stage', 'Input', 'Algorithm', 'Output'],
    [
        ['Person isolation', 'CSI from 6 ESP32-S3 nodes', 'Dual-branch transformer ID + node pair selection', '3-4 best node pairs per person'],
        ['Envelope extraction', 'CSI amplitude time series', 'Bandpass 0.1-0.5 Hz + Hilbert transform', 'Breath-by-breath amplitude envelope'],
        ['Multi-node fusion', 'Envelopes from 3-4 node pairs', 'SNR-weighted average', 'Fused amplitude per breath'],
        ['Calibration', 'Resting amplitude distribution', 'Individual baseline percentile model', 'Normal amplitude reference'],
        ['Classification', 'Fused amplitude vs baseline', 'Threshold classifier (60%, 85%, 115%)', 'Depth class: shallow/reduced/normal/deep'],
        ['Alert output', 'Sustained shallow classification', '>60s threshold + rate combination', 'Hypoventilation alert with severity'],
    ],
    col_widths=[PW*0.18, PW*0.25, PW*0.28, PW*0.29]
)
story += [tv_tbl, sp(8)]

story.append(rule())
story.append(sp(8))

# ── A.3 Combined clinical picture ─────────────────────────────────────────────
story.append(P('A.3 Combined Clinical Picture — Deterioration Pattern Detection', 'h2'))
story.append(P(
    'The clinical value of combining PTT-based BP trend monitoring with tidal volume '
    'classification is greater than either parameter alone. Specific deterioration patterns '
    'produce characteristic multi-parameter signatures detectable by CURA before they '
    'become acute emergencies:'
))
combined_tbl = data_table(
    ['Clinical Event', 'Breathing Rate', 'Breathing Depth', 'BP Trend', 'HR', 'Pattern Onset'],
    [
        ['Respiratory failure (early)', 'Elevated (>20)', 'Reduced → shallow', 'Trending up', 'Elevated', '1-4 hours before acute'],
        ['Hypertensive crisis', 'Normal or elevated', 'Normal', 'Trending up rapidly', 'Elevated', '30-90 min before symptoms'],
        ['Sepsis (early)', 'Elevated', 'Shallow', 'Trending down', 'Elevated', '2-6 hours before acute'],
        ['Cardiac decompensation', 'Elevated', 'Shallow (pulmonary oedema)', 'Variable', 'Elevated/irregular', '1-8 hours before acute'],
        ['Opioid overdose', 'Reduced (<10)', 'Very shallow', 'Trending down', 'Reduced', 'Minutes'],
        ['Hypoglycaemia', 'Normal', 'Normal', 'Trending down', 'Elevated', '15-60 min before symptoms'],
    ],
    col_widths=[PW*0.20, PW*0.15, PW*0.18, PW*0.15, PW*0.12, PW*0.20]
)
story += [combined_tbl, sp(6)]
story.append(P(
    'Pattern-based deterioration detection using the composite of all available CURA parameters '
    'is more sensitive and specific than any individual threshold alert. The Composite '
    'Individual Health Score (CIHS) described in the main patent specification implements '
    'this multi-parameter pattern matching, with individual baselines providing the '
    'personalised reference against which deterioration is measured.',
    'note'
))
story.append(sp(8))
story.append(rule())
story.append(sp(6))
story.append(P(
    'Appendix A documents research-stage signal processing pipelines. Neither pipeline is '
    'validated for clinical use. Independent clinical validation studies are required before '
    'these parameters are used in patient care decisions. Patent references: '
    'AMCZ-2615743059 (PTT blood pressure trend, tidal volume estimation). '
    '© 2026 Westminster Green Solutions T/A Health Plus International.', 'note'
))

# ── Build ─────────────────────────────────────────────────────────────────────
def build(story, filename):
    doc = BaseDocTemplate(
        f'/mnt/user-data/outputs/{filename}',
        pagesize=A4,
        leftMargin=ML, rightMargin=MR,
        topMargin=MT, bottomMargin=MB
    )
    frame = Frame(ML, MB, PW, H-MT-MB, id='body')
    doc.addPageTemplates([PT('all', [frame], onPage=draw_page)])
    doc.build(story)
    print(f'✅ {filename}')

build(story, 'CURA_Whitepaper_v1.pdf')
