# CURA Prior Art Search Record

**Date conducted:** 11 May 2026
**Conducted by:** Abhay J Kumar, Health Plus International
**Purpose:** Prior art search in preparation for standard patent conversion (deadline 11 May 2027)

---

## Patent Database Searches (Google Patents + Scholar)

All searches conducted at patents.google.com with &scholar parameter (includes academic results).

| # | Search Query | Results | Assessment |
|---|---|---|---|
| 1 | "channel state information" "federated learning" "heterogeneous" | 323 patents | All wireless comms/5G — none in physiological sensing |
| 2 | WiFi CSI "federated learning" "heterogeneous" "vital signs" OR "breathing" OR "health monitoring" | 0 | Clear |
| 3 | "channel state information" "breathing detection" "federated" | 0 | Clear |
| 4 | "WiFi sensing" "vital signs" "federated learning" | 0 | Clear |
| 5 | "passive sensing" "CSI" "individual identification" "federated" | 0 | Clear |
| 6 | "WiFi CSI" "individual identification" "multi-user" | 0 | Clear |

**Conclusion:** Patent field is completely clear for all CURA core claims.

---

## Key Patent Prior Art

| Reference | Status | Relevance |
|---|---|---|
| WO2017/156492 (Origin Wireless, 2017) | CEASED — no AU national phase | Basic WiFi CSI breathing detection — public domain. Does NOT cover individual attribution, vital signs, compliance records. |
| AU2023202326 (Hangzhou Normal University) | GRANTED | BCG under-mattress only — not WiFi, no individual ID |
| US12279190 (2024) | US only, no AU filing | CSI breathing with AGC — US jurisdiction only |

---

## Critical Academic Prior Art

### ⚠️ IEEE 10235745 — Avola et al., Sapienza University of Rome (2023)

**Title:** "Transformer-Based Person Identification via Wi-Fi CSI Amplitude and Phase Perturbations"

**What it describes:**
- Dual-branch transformer processing WiFi CSI amplitude and phase modalities separately
- Uses ESP32 devices in controlled indoor environment
- 6 participants, stationary identification
- Achieves **99.82% classification accuracy**
- Published IEEE 2023 — BEFORE CURA's priority date

**Impact on CURA:**
- This is the **source of CURA's 99.82% accuracy figure**
- The dual-branch transformer architecture IS prior art
- CURA CANNOT claim "dual-branch transformer processing amplitude and phase separately" as its own invention

**How CURA is distinguished:**
- Self-supervised calibration for non-consenting, non-cooperative persons (dementia, infants, detainees)
- Vital sign attribution per identified individual
- Regulated care compliance record generation
- None of these appear in the Sapienza paper

**Action required at standard patent conversion:** Brief patent attorney on this paper. Independent claims must be anchored to regulated care application context, not the identification architecture.

---

### SADU — Dave, Patel, Sun (TechRxiv preprint, September 2025)

**Title:** "Self Attention with Deep Unfolding (SADU) for Multi-User Cross Environment Wi-Fi Sensing"

**Institutions:** Northwestern University / Ahmedabad University / A*STAR Singapore

**What it describes:**
- Multi-user WiFi CSI individual identification using deep unfolding + manifold attention
- 95.9-99.9% identity accuracy, multiple simultaneous users, multiple environments
- NOT PATENTED — academic preprint only
- Different architecture from CURA (deep unfolding vs dual-branch transformer)

**Impact on CURA:**
- Does not cover federated learning, vital signs, care environments, compliance records
- Requires architectural distinction in claim language
- CURA's application context (regulated care, vital sign attribution, non-consenting persons) is entirely distinct

---

## What This Means for Standard Patent Conversion

**Cannot claim broadly:**
- Dual-branch transformer for WiFi CSI identification (Sapienza 2023)
- Basic WiFi CSI breathing detection (public domain)
- Generic federated learning
- Generic differential privacy
- Multi-user WiFi CSI activity recognition

**Can claim (no prior art):**
- Self-supervised ID of non-consenting persons without biometric enrolment
- Individual-attributed vital sign archival in shared care rooms
- Compliance records meeting coronial/ACQSC/NDIS evidentiary standards
- CSI hardware normalisation across heterogeneous chipsets for federated learning
- Layer-adaptive DP for physiological model accuracy preservation
- All security mechanisms in Patent 3 (AMCZ-2615745256)

---

## Search Evidence Files

- Screenshots of all 6 patent searches (zero results): stored in this folder
- CSV exports from Google Patents: stored in this folder
- IEEE 10235745 full paper PDF: IEEE_10235745_Sapienza_2023.pdf
- SADU preprint PDF: SADU_TechRxiv_2025.pdf

---

*Prepared by Abhay J Kumar, Health Plus International, 11 May 2026*
*© 2026 Westminster Green Solutions T/A Health Plus International*
