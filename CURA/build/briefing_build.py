import os, urllib.request
os.makedirs('/home/claude/briefing', exist_ok=True)

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

# ── Brand ──────────────────────────────────────────────────────────────────────
NAVY_D  = colors.HexColor('#0D1F33')
NAVY    = colors.HexColor('#1B3A5C')
TEAL    = colors.HexColor('#0B6B6E')
TEAL_D  = colors.HexColor('#085558')
TEAL_P  = colors.HexColor('#E1F5EE')
TEAL_M  = colors.HexColor('#9FE1CB')
MUTED   = colors.HexColor('#5a6a7a')
BLACK   = colors.HexColor('#1a1a1a')
WHITE   = colors.white
AMBER   = colors.HexColor('#B45309')
AMBER_L = colors.HexColor('#FEF3C7')
RED     = colors.HexColor('#991B1B')
RED_L   = colors.HexColor('#FEE2E2')
GREEN   = colors.HexColor('#065F46')
GREEN_L = colors.HexColor('#D1FAE5')
PURPLE  = colors.HexColor('#4C1D95')
PURPLE_L= colors.HexColor('#EDE9FE')
LIGHT   = colors.HexColor('#F8F9FA')
GRAY_L  = colors.HexColor('#F1F0E8')

W, H = A4
ML = MR = 2.2*cm
MT = 3.8*cm
MB = 3.0*cm
PW = W - ML - MR

# ── Logo ───────────────────────────────────────────────────────────────────────
LOGO_URL = 'https://raw.githubusercontent.com/wgsaus-dotcom/Healthplus/main/images/logo-cura.png'
LOGO_PATH = '/home/claude/briefing/cura_logo.png'
if not os.path.exists(LOGO_PATH):
    urllib.request.urlretrieve(LOGO_URL, LOGO_PATH)

# ── Canvas ─────────────────────────────────────────────────────────────────────
def draw_page(c, doc):
    c.saveState()
    band = 22*mm
    c.setFillColor(NAVY_D)
    c.rect(0, H-band, W, band, fill=1, stroke=0)
    try:
        from reportlab.lib.utils import ImageReader
        logo = ImageReader(LOGO_PATH)
        lh = 14*mm; lw = lh*(1020/889)
        c.drawImage(logo, ML, H-band+(band-lh)/2, width=lw, height=lh, mask='auto')
        sx = ML+lw+6
    except:
        c.setFillColor(WHITE); c.setFont('Helvetica-Bold',12)
        c.drawString(ML+4, H-band/2+4, 'CURA'); sx = ML+60
    c.setFont('Helvetica', 7.5)
    c.setFillColor(colors.Color(1,1,1,0.55))
    c.drawString(sx, H-band/2+1, 'Passive Welfare Monitoring Infrastructure')
    c.setFillColor(colors.Color(1,1,1,0.6))
    c.setFont('Helvetica', 7.5)
    c.drawRightString(W-MR, H-10*mm, '+61 411 459 755')
    c.drawRightString(W-MR, H-16*mm, 'connect@healthplusint.com.au')
    c.drawRightString(W-MR, H-21.5*mm, 'healthplusint.com.au')
    c.setFillColor(TEAL)
    c.rect(0, H-band-3*mm, W, 3*mm, fill=1, stroke=0)
    bw = PW/3
    c.setFillColor(colors.HexColor('#E8A020')); c.rect(ML, 8, bw, 5, fill=1, stroke=0)
    c.setFillColor(colors.HexColor('#CC3300')); c.rect(ML+bw, 8, bw, 5, fill=1, stroke=0)
    c.setFillColor(colors.HexColor('#111111')); c.rect(ML+bw*2, 8, bw, 5, fill=1, stroke=0)
    c.setFont('Helvetica', 7); c.setFillColor(MUTED)
    c.drawString(ML, 20, 'Unit 4, 44-46 Keeler Street, Carlingford NSW 2118  |  ABN 13 155 901 723')
    c.setFillColor(colors.Color(0.55,0.08,0.08,0.5)); c.setFont('Helvetica-Bold', 7)
    c.drawRightString(W-MR, 20, 'PRIVILEGED & CONFIDENTIAL — PATENT ATTORNEY BRIEFING')
    c.setFont('Helvetica', 7); c.setFillColor(MUTED)
    c.drawString(ML, 30, 'Westminster Green Solutions T/A Health Plus International  |  © 2026')
    c.setFillColor(TEAL); c.setFont('Helvetica-Bold', 8)
    c.drawRightString(W-MR, 30, f'Page {doc.page}')
    c.setStrokeColor(TEAL); c.setLineWidth(0.6)
    c.line(ML, 41, W-MR, 41)
    c.restoreState()

# ── Styles ─────────────────────────────────────────────────────────────────────
def mk(name, **kw):
    d = dict(fontName='Helvetica', fontSize=9.5, textColor=BLACK, leading=15, spaceAfter=4)
    d.update(kw)
    return ParagraphStyle(name, **d)

S = {
    'title': mk('title', fontName='Helvetica-Bold', fontSize=18, textColor=NAVY_D,
                alignment=TA_CENTER, leading=24, spaceAfter=4),
    'sub':   mk('sub', fontSize=11, textColor=TEAL, alignment=TA_CENTER, leading=16, spaceAfter=3),
    'meta':  mk('meta', fontSize=8.5, textColor=MUTED, alignment=TA_CENTER, leading=13, spaceAfter=2),
    'h1':    mk('h1', fontName='Helvetica-Bold', fontSize=11, textColor=WHITE, leading=16),
    'h2':    mk('h2', fontName='Helvetica-Bold', fontSize=10, textColor=NAVY_D,
                spaceBefore=10, spaceAfter=4, leading=15),
    'h3':    mk('h3', fontName='Helvetica-Bold', fontSize=9.5, textColor=TEAL_D,
                spaceBefore=8, spaceAfter=3, leading=14),
    'body':  mk('body', leading=15.5, spaceAfter=5, alignment=TA_JUSTIFY),
    'bul':   mk('bul', leftIndent=14, spaceAfter=3, alignment=TA_JUSTIFY),
    'note':  mk('note', fontName='Helvetica-Oblique', fontSize=8.5, textColor=MUTED,
                leading=13, alignment=TA_JUSTIFY),
    'tbl_h': mk('tbl_h', fontName='Helvetica-Bold', fontSize=8.5, textColor=WHITE,
                alignment=TA_CENTER, leading=12),
    'tbl_c': mk('tbl_c', fontSize=8.5, leading=12, spaceAfter=2),
    'tbl_cc':mk('tbl_cc', fontSize=8.5, leading=12, spaceAfter=2, alignment=TA_CENTER),
    'ref':   mk('ref', fontName='Helvetica-Bold', fontSize=9, textColor=PURPLE, leading=13),
    'warn_h':mk('warn_h', fontName='Helvetica-Bold', fontSize=9, textColor=AMBER, leading=13),
    'warn_b':mk('warn_b', fontSize=8.5, textColor=colors.HexColor('#78350F'),
                leading=14, alignment=TA_JUSTIFY),
    'crit_h':mk('crit_h', fontName='Helvetica-Bold', fontSize=9, textColor=RED, leading=13),
    'crit_b':mk('crit_b', fontSize=8.5, textColor=colors.HexColor('#7F1D1D'),
                leading=14, alignment=TA_JUSTIFY),
    'ok_h':  mk('ok_h', fontName='Helvetica-Bold', fontSize=9, textColor=GREEN, leading=13),
    'ok_b':  mk('ok_b', fontSize=8.5, textColor=colors.HexColor('#064E3B'),
                leading=14, alignment=TA_JUSTIFY),
}

def P(t, s='body'): return Paragraph(t, S[s])
def sp(h=6): return Spacer(1, h)
def rule(): return HRFlowable(width='100%', thickness=0.5,
                               color=colors.HexColor('#CCCCCC'), spaceAfter=4, spaceBefore=4)

def h1_bar(text):
    t = Table([[Paragraph(text, S['h1'])]], colWidths=[PW])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), NAVY_D),
        ('TOPPADDING',(0,0),(-1,-1), 8), ('BOTTOMPADDING',(0,0),(-1,-1), 8),
        ('LEFTPADDING',(0,0),(-1,-1), 12),
    ]))
    return t

def box(title, body_text, bg, border, th_style='warn_h', tb_style='warn_b'):
    rows = []
    if title:
        rows.append([Paragraph(title, S[th_style])])
    rows.append([Paragraph(body_text, S[tb_style])])
    t = Table(rows, colWidths=[PW])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), bg),
        ('BOX',(0,0),(-1,-1), 1.2, border),
        ('TOPPADDING',(0,0),(-1,-1), 7), ('BOTTOMPADDING',(0,0),(-1,-1), 7),
        ('LEFTPADDING',(0,0),(-1,-1), 12), ('RIGHTPADDING',(0,0),(-1,-1), 12),
    ]))
    return t

def tbl(headers, rows, widths=None):
    if widths is None: widths = [PW/len(headers)]*len(headers)
    data = [[Paragraph(h, S['tbl_h']) for h in headers]]
    for r in rows:
        data.append([Paragraph(str(c), S['tbl_c']) for c in r])
    t = Table(data, colWidths=widths)
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,0), NAVY_D),
        ('ROWBACKGROUNDS',(0,1),(-1,-1), [LIGHT, WHITE]),
        ('GRID',(0,0),(-1,-1), 0.3, colors.HexColor('#DDDDDD')),
        ('TOPPADDING',(0,0),(-1,-1), 5), ('BOTTOMPADDING',(0,0),(-1,-1), 5),
        ('LEFTPADDING',(0,0),(-1,-1), 7), ('RIGHTPADDING',(0,0),(-1,-1), 7),
        ('VALIGN',(0,0),(-1,-1), 'TOP'),
    ]))
    return t

# ── Story ──────────────────────────────────────────────────────────────────────
story = []

# ── COVER ──────────────────────────────────────────────────────────────────────
story += [sp(24),
    P('CURA', 'title'),
    P('Patent Attorney Briefing Paper', 'sub'),
    P('Standard Patent Conversion — May 2027', 'sub'),
    sp(6), rule(), sp(6),
    P('Prepared by: Abhay J Kumar, Health Plus International', 'meta'),
    P('Westminster Green Solutions ABN 13 155 901 723 T/A Health Plus International', 'meta'),
    P('Date: 11 May 2026  |  Classification: Privileged & Confidential', 'meta'),
    sp(16),
]

# Cover summary table
cov = Table([
    [Paragraph('3', mk('cv', fontName='Helvetica-Bold', fontSize=22, textColor=NAVY_D, alignment=TA_CENTER, leading=26)),
     Paragraph('122', mk('cv2', fontName='Helvetica-Bold', fontSize=22, textColor=NAVY_D, alignment=TA_CENTER, leading=26)),
     Paragraph('$300', mk('cv3', fontName='Helvetica-Bold', fontSize=22, textColor=NAVY_D, alignment=TA_CENTER, leading=26)),
     Paragraph('May 2027', mk('cv4', fontName='Helvetica-Bold', fontSize=22, textColor=NAVY_D, alignment=TA_CENTER, leading=26))],
    [Paragraph('Provisional Patents', mk('cl', fontSize=8.5, textColor=TEAL, alignment=TA_CENTER, leading=12)),
     Paragraph('Total Claims', mk('cl2', fontSize=8.5, textColor=TEAL, alignment=TA_CENTER, leading=12)),
     Paragraph('Total Spend to Date', mk('cl3', fontSize=8.5, textColor=TEAL, alignment=TA_CENTER, leading=12)),
     Paragraph('Conversion Deadline', mk('cl4', fontSize=8.5, textColor=TEAL, alignment=TA_CENTER, leading=12))],
], colWidths=[PW/4]*4)
cov.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,0), TEAL_P),
    ('BACKGROUND',(0,1),(-1,1), WHITE),
    ('BOX',(0,0),(-1,-1), 1.5, TEAL),
    ('GRID',(0,0),(-1,-1), 0.5, TEAL_M),
    ('TOPPADDING',(0,0),(-1,-1), 10), ('BOTTOMPADDING',(0,0),(-1,-1), 8),
    ('ALIGN',(0,0),(-1,-1), 'CENTER'),
]))
story += [cov, sp(16)]

# Patent reference badges
pat_tbl = Table([
    [Paragraph('AMCZ-2615743059', S['ref']), Paragraph('AMCZ-2615744013', S['ref']), Paragraph('AMCZ-2615745256', S['ref'])],
    [Paragraph('Local System — 45 claims', mk('ps', fontSize=8, textColor=MUTED, alignment=TA_CENTER, leading=12)),
     Paragraph('Cloud/Federated — 34 claims', mk('ps2', fontSize=8, textColor=MUTED, alignment=TA_CENTER, leading=12)),
     Paragraph('Security Hardening — 43 claims', mk('ps3', fontSize=8, textColor=MUTED, alignment=TA_CENTER, leading=12))],
], colWidths=[PW/3]*3)
pat_tbl.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,-1), PURPLE_L),
    ('BOX',(0,0),(-1,-1), 1, PURPLE),
    ('GRID',(0,0),(-1,-1), 0.4, colors.HexColor('#C4B5FD')),
    ('TOPPADDING',(0,0),(-1,-1), 8), ('BOTTOMPADDING',(0,0),(-1,-1), 8),
    ('ALIGN',(0,0),(-1,-1), 'CENTER'),
]))
story += [pat_tbl, sp(12)]
story += [P('All three provisionals filed 11 May 2026 at IP Australia. Standard patent conversion required by 11 May 2027.', 'note')]
story.append(PageBreak())

# ── SECTION 1: PURPOSE ─────────────────────────────────────────────────────────
story += [h1_bar('1. Purpose of This Briefing'), sp(8)]
story.append(P(
    'This briefing paper prepares the patent attorney engaged for standard patent conversion of three '
    'provisional patents filed at IP Australia on 11 May 2026 by Westminster Green Solutions '
    'T/A Health Plus International. The inventor is Abhay J Kumar, Carlingford NSW 2118.'
))
story.append(P(
    'The paper documents: the technology and its commercial context; the three provisional patent '
    'specifications and their coverage; a complete prior art search record conducted on the filing date; '
    'critical prior art findings requiring specific claim drafting guidance; and the novel ground that '
    'is defensible and commercially valuable. The attorney should read Section 4 (Prior Art) and '
    'Section 5 (Critical Claim Guidance) before drafting any standard patent claims.'
))
story.append(sp(4))
story.append(box('Conversion Deadline',
    'Standard patents must be filed at IP Australia by 11 May 2027 (12 months from provisional filing date). '
    'Missing this deadline permanently forfeits the 11 May 2026 priority date for all claims.',
    AMBER_L, AMBER, 'warn_h', 'warn_b'))
story.append(PageBreak())

# ── SECTION 2: TECHNOLOGY ──────────────────────────────────────────────────────
story += [h1_bar('2. Technology Overview'), sp(8)]
story.append(P('2.1 What CURA Is', 'h2'))
story.append(P(
    'CURA is a passive welfare monitoring infrastructure platform. It uses WiFi signals already present '
    'in care environments as a sensing medium. When a person breathes, their chest wall displaces '
    '1-4 millimetres per breath, perturbing the WiFi Channel State Information (CSI) across 56 OFDM '
    'subcarrier channels. Dedicated ESP32-S3 microcontroller nodes capture this CSI data. An AI pipeline '
    'running on local hardware identifies individual persons, extracts vital signs, generates compliance '
    'records, and delivers alerts — all without cameras, wearables, or internet connectivity.'
))
story.append(P(
    'Target markets: residential aged care, correctional facilities, childcare services, '
    'hospital-in-the-home programs, and NDIS Supported Independent Living accommodation. '
    'Total addressable market (Australian): approximately $136.5M AUD annual recurring revenue '
    'at 10% penetration. Hardware cost per 10-bed ward: approximately $730 AUD. '
    'Monthly revenue at $70/bed: $700/month. Gross margin post-hardware recovery: >85%.'
))

story.append(P('2.2 Why the Combination is Novel', 'h2'))
story.append(P(
    'WiFi CSI breathing detection has been in academic literature since 2013. Individual identification '
    'via WiFi CSI has been demonstrated academically since 2019. Federated learning is a known '
    'machine learning paradigm. None of these individually are CURA\'s invention. '
    'CURA\'s invention is the specific combination applied to a specific problem: '
    'continuous individual-attributed vital sign monitoring of non-consenting persons in '
    'regulated care environments for welfare compliance record generation — a problem '
    'that no prior work addresses and that creates specific non-obvious technical requirements.'
))

novel_tbl = tbl(
    ['Novel Application Constraint', 'Why It Creates Non-Obvious Technical Problem'],
    [
        ['Non-consenting, non-cooperative persons (dementia residents, infants, detained persons)',
         'Cannot use biometric enrolment, active cooperation, or labelled training data. Requires self-supervised calibration from rest data — not in any identified prior art.'],
        ['Shared care rooms (multiple persons simultaneously)',
         'Individual identity attribution in multi-person environments with overlapping CSI signals. Vital sign extraction per named individual, not aggregate.'],
        ['Regulated care compliance evidence',
         'Records must meet coronial inquest, ACQSC quality indicator, NDIS Practice Standards, and childcare regulation evidential standards. Digital signature chains, append-only storage, tamper-evident architecture.'],
        ['Network-isolated deployment (corrections, aged care)',
         'No internet, no cloud. All processing on local hardware. Federated learning across facilities without individual data leaving each facility. Architecture constraint not in any prior art.'],
        ['Heterogeneous WiFi chipsets across facilities',
         'Different ESP32 firmware versions produce incompatible CSI feature spaces. Normalisation transform required before federated aggregation — novel technical solution with no identified patent prior art.'],
    ],
    widths=[PW*0.35, PW*0.65]
)
story += [novel_tbl, sp(6)]
story.append(PageBreak())

# ── SECTION 3: PATENT PORTFOLIO ────────────────────────────────────────────────
story += [h1_bar('3. Patent Portfolio — Three Provisionals'), sp(8)]

for ref, title, claims, covers in [
    ('AMCZ-2615743059',
     'System and Method for Passive Multi-Modal Wireless Sensing, Privacy-Preserving Sensor Data Recording, and Comprehensive Individual-Attributed Vital Sign Monitoring, Identity Verification, Welfare Compliance Logging, Clinical Early Warning and Longitudinal Health Surveillance in Regulated Care, Custodial and Child Supervision Environments',
     '45 claims',
     'Seven-layer sensing architecture (WiFi CSI, mmWave radar, thermal IR, BCG mattress, LiDAR, passive acoustic, floor pressure); self-supervised individual identification without biometric enrolment for non-consenting persons; full vital sign suite per identified individual (breathing, HR, HRV, arrhythmia, sleep stage, falls, gait, body position, composite health score); privacy-preserving sensor data archival (thermal sequences, LiDAR point clouds, CSI matrices, radar maps, BCG waveforms, acoustic features) per individual; coronial and regulatory compliance record generation with digital signature chains; all 10 regulated care deployment configurations.'),
    ('AMCZ-2615744013',
     'System and Method for Edge-Cloud Partitioned Passive Wireless Vital Sign Monitoring with Heterogeneous-Environment Federated Model Optimisation, Privacy-Preserving Population Health Analytics, and Remote Clinical Oversight in Regulated Care Networks',
     '34 claims',
     'CSI feature compression pipeline (93-99% bandwidth reduction); hardware-normalised federated aggregation across heterogeneous WiFi chipsets (ESP32, Qualcomm, Intel) — solves chipset incompatibility in cross-facility federated learning; layer-adaptive differential privacy calibrated to physiological model accuracy sensitivity; HSM identity partitioning (cryptographic enforcement, not administrative policy); zero-knowledge relay for hospital-in-the-home vital sign streaming; population health analytics on de-identified differentially-private aggregates.'),
    ('AMCZ-2615745256',
     'System and Method for Security-Hardened Federated Passive Vital Sign Monitoring Networks Comprising Byzantine-Robust Physiologically-Calibrated Gradient Aggregation with Dynamic Trust Decay and Server-Side Holdout Validation; Three-Level Platform-Enforced Differential Privacy Governance; Zero-Gap Short-Lived Certificate Management; Independent Mesh-Extended Dual-Path Alert Delivery; and Multi-Sensor Quorum-Gated Cryptographic Key Destruction',
     '43 claims',
     'Byzantine-robust gradient aggregation calibrated to physiological CSI gradient statistics with dynamic trust decay and server-side gold-standard holdout validation; three-level DP governance (platform ceiling / regulatory floor / operator config) with multi-modal interference detection and rate-limited epsilon throttling; zero-gap short-lived certificate PKI with biometric-wrapped persistence for hospital-in-the-home; ESP32 mesh-extended dual-path alert delivery with TOTP device registration; multi-sensor quorum-gated cryptographic key destruction distinguishing soft lock from hard wipe.'),
]:
    ref_tbl = Table([[
        Paragraph(f'<b>AU Provisional {ref}</b>', mk('r1', fontName='Helvetica-Bold', fontSize=10, textColor=PURPLE, leading=14)),
        Paragraph(f'<b>{claims}</b> · Filed 11 May 2026', mk('r2', fontSize=9, textColor=PURPLE, alignment=TA_RIGHT, leading=14))
    ]], colWidths=[PW*0.65, PW*0.35])
    ref_tbl.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), PURPLE_L),
        ('TOPPADDING',(0,0),(-1,-1), 6), ('BOTTOMPADDING',(0,0),(-1,-1), 3),
        ('LEFTPADDING',(0,0),(-1,-1), 10), ('RIGHTPADDING',(0,0),(-1,-1), 10),
        ('LINEABOVE',(0,0),(-1,0), 1.5, PURPLE),
        ('VALIGN',(0,0),(-1,-1), 'MIDDLE'),
    ]))
    title_tbl = Table([[Paragraph(title, mk('rt', fontName='Helvetica-Oblique', fontSize=8.5, textColor=PURPLE, leading=13))]], colWidths=[PW])
    title_tbl.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), PURPLE_L),
        ('BOTTOMPADDING',(0,0),(-1,-1), 3),
        ('LEFTPADDING',(0,0),(-1,-1), 10), ('RIGHTPADDING',(0,0),(-1,-1), 10),
    ]))
    covers_tbl = Table([[Paragraph(f'<b>Covers:</b> {covers}', mk('rc', fontSize=8.5, textColor=MUTED, leading=13, alignment=TA_JUSTIFY))]], colWidths=[PW])
    covers_tbl.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1), PURPLE_L),
        ('BOTTOMPADDING',(0,0),(-1,-1), 8),
        ('LEFTPADDING',(0,0),(-1,-1), 10), ('RIGHTPADDING',(0,0),(-1,-1), 10),
        ('LINEBELOW',(0,0),(-1,-1), 1, PURPLE),
    ]))
    story += [ref_tbl, title_tbl, covers_tbl, sp(6)]

story.append(PageBreak())

# ── SECTION 4: PRIOR ART ───────────────────────────────────────────────────────
story += [h1_bar('4. Prior Art Search Record — 11 May 2026'), sp(8)]
story.append(P(
    'A comprehensive prior art search was conducted on the date of provisional filing across '
    'Google Patents (including Scholar integration), IEEE Xplore references, and academic preprint '
    'literature. All search queries, result counts, and screenshots are retained in the '
    '"CURA Prior Art Search — 11 May 2026" folder to be provided to the attorney.'
))

story.append(P('4.1 Patent Database Searches', 'h2'))
search_tbl = tbl(
    ['Search Query', 'Results', 'Assessment'],
    [
        ['"channel state information" + "federated learning" + "heterogeneous"',
         '323 patents', 'All wireless comms / 5G optimisation patents (Qualcomm, Huawei, LG, Intel). Zero in physiological sensing. Entire field is about CSI as communication channel descriptor — completely different application.'],
        ['WiFi CSI + "vital signs" + "federated" + "heterogeneous"', '0', 'Field clear'],
        ['"channel state information" + "breathing detection" + "federated"', '0', 'Field clear'],
        ['"WiFi sensing" + "vital signs" + "federated learning"', '0', 'Field clear'],
        ['"passive sensing" + "CSI" + "individual identification" + "federated"', '0', 'Field clear'],
        ['"WiFi CSI" + "individual identification" + "multi-user"', '0', 'Field clear'],
    ],
    widths=[PW*0.42, PW*0.10, PW*0.48]
)
story += [search_tbl, sp(8)]

story.append(P('4.2 Key Patent Prior Art', 'h2'))
patent_prior_tbl = tbl(
    ['Reference', 'Status', 'Relevance'],
    [
        ['WO2017/156492\nOrigin Wireless Inc. (2017)',
         'CEASED\nNo AU national phase',
         'WiFi CSI breathing detection — basic method is now public domain. Does NOT cover individual attribution, vital sign archival, compliance records, multi-person separation, or any CURA-specific claim.'],
        ['AU2023202326\nHangzhou Normal University',
         'GRANTED',
         'BCG under-mattress vital signs only. Not WiFi CSI. No individual identification. Not relevant to CURA WiFi sensing claims.'],
        ['US12279190 (2024)',
         'US only\nNo AU filing',
         'CSI breathing with AGC compensation. US jurisdiction only. Not Australian prior art. Does not cover individual identification or federated learning.'],
    ],
    widths=[PW*0.22, PW*0.16, PW*0.62]
)
story += [patent_prior_tbl, sp(8)]

story.append(P('4.3 Academic Prior Art — Two Papers Requiring Claim Drafting Attention', 'h2'))
story.append(box(
    '⚠  CRITICAL — IEEE 10235745 (Avola et al., Sapienza University of Rome, 2023)',
    'Title: "Transformer-Based Person Identification via Wi-Fi CSI Amplitude and Phase Perturbations"\n\n'
    'Published IEEE 2023. This paper describes a dual-branch transformer architecture that processes '
    'WiFi CSI amplitude and phase modalities in separate neural network branches using ESP32 hardware, '
    'achieving 99.82% stationary individual identification accuracy. This is the academic source of '
    'CURA\'s 99.82% identification accuracy figure and the architectural basis for CURA\'s identification layer.\n\n'
    'IMPACT: The specific mechanism — dual-branch transformer, separate amplitude and phase processing, '
    'ESP32 hardware, stationary identification — IS prior art. Standard patent independent claims '
    'must NOT read as "a dual-branch transformer processing CSI amplitude and phase separately." '
    'Claims must be anchored to the novel application context described in Section 5 below.',
    AMBER_L, AMBER, 'warn_h', 'warn_b'))
story.append(sp(5))
story.append(box(
    'SADU Preprint — Dave, Patel, Sun (TechRxiv, September 2025)',
    'Title: "Self Attention with Deep Unfolding (SADU) for Multi-User Cross Environment Wi-Fi Sensing"\n\n'
    'Northwestern University / Ahmedabad University / A*STAR Singapore. NOT PATENTED — academic preprint only. '
    'Describes multi-user WiFi CSI individual identification using deep unfolding + manifold attention '
    'architecture achieving 95.9-99.9% identity accuracy across multiple simultaneous users and multiple '
    'environments. Different architecture from CURA (deep unfolding vs dual-branch transformer). '
    'Does not cover: federated learning, vital sign extraction, regulated care environments, '
    'compliance records, non-consenting persons.\n\n'
    'IMPACT: Moderate. Requires architectural distinction in claim drafting. CURA\'s claims must specify '
    'the regulated care application context and vital sign attribution purpose, not just the '
    'identification mechanism.',
    AMBER_L, AMBER, 'warn_h', 'warn_b'))
story.append(sp(5))
story.append(box(
    'Search Conclusion',
    'The patent database is clear for all of CURA\'s core claims. No patent anywhere combines WiFi CSI '
    'physiological sensing with federated learning. The academic literature contains two relevant papers '
    'for the identification mechanism (Sapienza 2023, SADU 2025) but neither is patented and neither '
    'covers CURA\'s novel application context. With correct claim drafting as described in Section 5, '
    'all three provisionals have strong prospects at standard examination.',
    GREEN_L, TEAL, 'ok_h', 'ok_b'))
story.append(PageBreak())

# ── SECTION 5: CLAIM GUIDANCE ─────────────────────────────────────────────────
story += [h1_bar('5. Critical Claim Drafting Guidance'), sp(8)]
story.append(box(
    'Read Before Drafting Any Claims',
    'The identification mechanism in Patent 1 (AMCZ-2615743059) is based on the Sapienza University '
    '2023 dual-branch transformer (IEEE 10235745). CURA cannot claim that architecture broadly. '
    'Every independent claim touching individual identification MUST be anchored to the specific '
    'non-obvious application context below. The attorney must distinguish from Sapienza 2023 '
    'in the claims, description, and prosecution arguments.',
    RED_L, RED, 'crit_h', 'crit_b'))
story.append(sp(6))

story.append(P('5.1 What CANNOT Be Claimed (Prior Art)', 'h2'))
story.append(box(None,
    '• Dual-branch transformer processing WiFi CSI amplitude and phase separately (Sapienza 2023)\n'
    '• Basic WiFi CSI breathing detection (Origin Wireless 2017 — public domain)\n'
    '• Generic individual identification via WiFi CSI (various prior art)\n'
    '• Generic federated learning (Krum, FedAvg, and variants — well established)\n'
    '• Generic differential privacy (Dwork 2006 — public domain)\n'
    '• Multi-user WiFi CSI activity recognition (SADU 2025, WiMANS literature)\n'
    '• BCG mattress vital signs (AU2023202326 granted to Hangzhou Normal University)',
    RED_L, RED, 'crit_h', 'crit_b'))
story.append(sp(6))

story.append(P('5.2 What CAN Be Claimed — Novel Ground (No Identified Prior Art)', 'h2'))
can_tbl = tbl(
    ['Novel Claim Territory', 'Why Patentable', 'Relevant Provisional'],
    [
        ['Self-supervised individual identification of non-consenting, non-cooperative persons (dementia residents, infants, detained persons) without biometric enrolment',
         'Specific operational constraint — non-consenting population — creates non-obvious technical requirement for fully self-supervised calibration from rest data. Not in Sapienza (cooperative subjects), not in SADU (HAR context), not in any identified prior art.',
         'AMCZ-2615743059'],
        ['Individual-attributed vital sign waveform archival per named identified person in shared multi-occupancy care rooms',
         'Attribution of continuous vital sign records to specific named individuals across 10+ simultaneous persons in a shared room for regulatory evidence purposes. No prior art.',
         'AMCZ-2615743059'],
        ['Compliance record generation with digital signature chains meeting coronial inquest and aged care regulatory evidentiary standards',
         'Specific evidentiary standard application. No prior art in passive sensing context.',
         'AMCZ-2615743059'],
        ['CSI hardware normalisation transform for federated learning across heterogeneous WiFi chipsets (ESP32, Qualcomm, Intel)',
         'Six targeted patent searches returned zero results. No identified academic prior art. Solves a specific technical problem — incompatible CSI feature spaces from different chipsets — that does not appear in any federated learning literature.',
         'AMCZ-2615744013'],
        ['Layer-adaptive differential privacy calibrated to physiological model accuracy sensitivity',
         'Dual-failure-mode problem (privacy under-protection AND clinical accuracy degradation) specific to health monitoring with non-expert administrators. Not in general DP literature.',
         'AMCZ-2615744013'],
        ['Corrections custodial welfare record generation meeting coronial inquest evidentiary requirements from passive WiFi sensing',
         'Specific regulated application. No prior art.',
         'AMCZ-2615743059'],
        ['Childcare sleep-period monitoring without cameras satisfying Education and Care Services National Regulations 2011',
         'Specific regulated application. No prior art.',
         'AMCZ-2615743059'],
        ['All security mechanisms in Patent 3 (Byzantine aggregation, DP governance, PKI lifecycle, dual-path alerts, quorum key destruction)',
         'Five targeted searches returned zero results. All five mechanisms are novel adaptations to care facility operational constraints. See Patent 3 specification for full prior art analysis.',
         'AMCZ-2615745256'],
    ],
    widths=[PW*0.33, PW*0.43, PW*0.24]
)
story += [can_tbl, sp(8)]

story.append(P('5.3 Recommended Claim Structure for Patent 1', 'h2'))
story.append(P(
    'Independent Claim 1 should be structured as a system claim anchored to the novel application '
    'context, not the sensing mechanism. The recommended structure is:'
))
claim_box = Table([[Paragraph(
    '<b>Claim 1 anchor (recommended):</b> "A welfare monitoring system for regulated care facility '
    'environments comprising non-consenting monitored persons, the system comprising: [sensing hardware]; '
    '[individual identification module configured to perform self-supervised calibration from rest period '
    'data without biometric enrolment or monitored person cooperation]; [vital sign extraction module '
    'configured to attribute continuously monitored vital sign parameters to each identified individual]; '
    '[compliance record generation module configured to generate append-only digitally-signed welfare '
    'records per identified individual meeting [specific regulatory standard] evidentiary requirements]."',
    mk('cb', fontSize=9, textColor=colors.HexColor('#1E3A5F'), leading=14, alignment=TA_JUSTIFY)
)]], colWidths=[PW])
claim_box.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,-1), colors.HexColor('#EFF6FF')),
    ('BOX',(0,0),(-1,-1), 1.5, NAVY),
    ('TOPPADDING',(0,0),(-1,-1), 10), ('BOTTOMPADDING',(0,0),(-1,-1), 10),
    ('LEFTPADDING',(0,0),(-1,-1), 12), ('RIGHTPADDING',(0,0),(-1,-1), 12),
]))
story += [claim_box, sp(6)]
story.append(P(
    'The dual-branch transformer architecture should appear in dependent claims and the detailed '
    'description as the specific implementation, not as an independent claim element. '
    'This structure survives even if the Sapienza 2023 dual-branch transformer is cited as prior art '
    'against any broad identification claim — the independent claim survives because it is anchored '
    'to the application context, not the architecture.'
))
story.append(PageBreak())

# ── SECTION 6: COMMERCIAL CONTEXT ─────────────────────────────────────────────
story += [h1_bar('6. Commercial Context and Urgency'), sp(8)]
story.append(P('6.1 Market Position', 'h2'))
story.append(P(
    'The passive vital sign monitoring market in Australian regulated care is early but accelerating. '
    'Talius Group (ASX: TAL) signed a Letter of Intent with Inturai Ventures in January 2026 '
    'for WiFi spatial sensing integration ($2.5M USD, 3 years). Inturai signed a Master Services '
    'Agreement with Adventist Retirement Plus Queensland in April 2026. '
    'Talius/Inturai is cloud-based. CURA\'s differentiation is network-isolated architecture '
    'and individual vital sign attribution — capabilities Inturai does not currently offer.'
))
story.append(P('6.2 Build Roadmap and Evidence Timeline', 'h2'))
road_tbl = tbl(
    ['Phase', 'Timeline', 'Patent Relevance'],
    [
        ['Phase 1 — Hardware build', 'Boards in transit — 8 weeks post-arrival',
         'Breathing detection, presence, falls, basic individual ID, staff dashboard, compliance records. Generates first real-world performance data.'],
        ['Phase 2 — Pilot facility', 'Month 3-6',
         'First 90-day free pilot in aged care or corrections. Generates independent accuracy validation data. Critical for enablement defence at standard patent examination.'],
        ['Phase 3 — Prior art search (academic)', 'Month 10',
         'Commission formal prior art search on CSI harmonisation and multi-user identification from specialist patent search firm ($500-2,000). Confirm academic literature landscape before conversion.'],
        ['Phase 4 — Standard patent conversion', 'By 11 May 2027',
         'Engage attorney by February 2027 to allow adequate drafting time. Pilot data supports all enablement arguments. Three provisionals consolidated into standard patents.'],
    ],
    widths=[PW*0.18, PW*0.20, PW*0.62]
)
story += [road_tbl, sp(8)]

story.append(P('6.3 Funding Applications', 'h2'))
story.append(P(
    'Active grant applications are being prepared for: MedTech Growth Fund; NSW Health Innovation; '
    'Department of Justice Innovation Fund. The patent portfolio and this briefing paper form part '
    'of the IP evidence package for funding applications. Standard patent conversion by May 2027 '
    'is required for the IP component of grant applications.'
))
story.append(PageBreak())

# ── SECTION 7: DOCUMENTS ──────────────────────────────────────────────────────
story += [h1_bar('7. Documents Provided to Attorney'), sp(8)]
docs_tbl = tbl(
    ['Document', 'Description', 'Critical For'],
    [
        ['CURA_Provisional_Patent_Specification_v3.pdf', 'Local system — 20 pages, 45 claims', 'Patent 1 standard conversion'],
        ['CURA_Cloud_Provisional_Patent_Specification_v2.pdf', 'Cloud/federated — 16 pages, 34 claims', 'Patent 2 standard conversion'],
        ['CURA_Security_Provisional_Patent_v3.pdf', 'Security hardening — 21 pages, 43 claims', 'Patent 3 standard conversion'],
        ['CURA_Whitepaper_v1.pdf', '28-page technical whitepaper with full prior art section', 'Commercial context, claim scope'],
        ['CURA_Local_Network_Architecture.pdf', 'Local architecture evaluation document', 'Patent 1 technical context'],
        ['CURA_Cloud_Network_Architecture.pdf', 'Cloud architecture evaluation document', 'Patent 2 technical context'],
        ['CURA Prior Art Search — 11 May 2026 (folder)', 'All patent search CSVs, screenshots, IEEE 10235745 paper, SADU preprint', 'Prior art prosecution file'],
        ['This briefing paper', 'Complete attorney briefing with claim guidance', 'Read before drafting'],
    ],
    widths=[PW*0.35, PW*0.38, PW*0.27]
)
story += [docs_tbl, sp(8)]
story.append(rule())
story.append(sp(6))
story.append(P('7.1 Key Contact', 'h2'))
story.append(P('Abhay J Kumar — Inventor and Director, Health Plus International'))
story.append(P('connect@healthplusint.com.au  |  +61 411 459 755'))
story.append(P('Unit 4, 44-46 Keeler Street, Carlingford NSW 2118, Australia'))
story.append(sp(6))
story.append(P(
    'Westminster Green Solutions ABN 13 155 901 723 T/A Health Plus International. '
    'This document is privileged and confidential, prepared for the purpose of obtaining legal advice. '
    '© 2026 All rights reserved.', 'note'))

# ── BUILD ──────────────────────────────────────────────────────────────────────
def build(story, filename):
    doc = BaseDocTemplate(
        f'/mnt/user-data/outputs/{filename}',
        pagesize=A4, leftMargin=ML, rightMargin=MR, topMargin=MT, bottomMargin=MB
    )
    frame = Frame(ML, MB, PW, H-MT-MB, id='body')
    doc.addPageTemplates([PT('all', [frame], onPage=draw_page)])
    doc.build(story)
    print(f'✅ {filename}')

build(story, 'CURA_Patent_Attorney_Briefing.pdf')
