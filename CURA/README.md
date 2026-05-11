# CURA — Passive Welfare Monitoring Infrastructure

**By Health Plus International**
Westminster Green Solutions ABN 13 155 901 723 T/A Health Plus International
Unit 4, 44-46 Keeler Street, Carlingford NSW 2118, Australia
connect@healthplusint.com.au | +61 411 459 755

---

## What Is CURA?

CURA monitors vital signs and identifies individuals in regulated care environments using WiFi signals — no cameras, no wearables, no internet required.

Continuous passive monitoring of breathing, heart rate, falls, and individual identification for:
- Residential aged care
- Correctional facilities  
- Childcare services
- Hospital-in-the-home
- NDIS Supported Independent Living

---

## IP Portfolio

| Reference | Coverage | Claims | Filed |
|---|---|---|---|
| AMCZ-2615743059 | Local system — 7 sensing layers, all vital signs, individual ID | 45 | 11 May 2026 |
| AMCZ-2615744013 | Cloud/federated — edge-cloud partition, federated learning, zero-knowledge relay | 34 | 11 May 2026 |
| AMCZ-2615745256 | Security hardening — Byzantine aggregation, DP governance, PKI, mesh alerts, quorum key destruction | 43 | 11 May 2026 |

**Standard patent conversion deadline: 11 May 2027**

---

## Repository Structure

```
/
├── images/
│   ├── logo-healthplus.png       HealthPlus International logo
│   └── logo-cura.png             CURA brand logo (WiFi arc design)
│
└── CURA/
    ├── README.md                 This file
    │
    ├── patents/
    │   ├── AMCZ-2615743059_local_v3.pdf
    │   ├── AMCZ-2615744013_cloud_v2.pdf
    │   ├── AMCZ-2615745256_security_v3.pdf
    │   └── prior-art/
    │       ├── SEARCH_RECORD.md
    │       ├── IEEE_10235745_Sapienza_2023.pdf
    │       └── SADU_TechRxiv_2025.pdf
    │
    ├── documents/
    │   ├── CURA_Whitepaper_v1.pdf
    │   ├── CURA_Patent_Attorney_Briefing.pdf
    │   ├── CURA_Local_Network_Architecture.pdf
    │   └── CURA_Cloud_Network_Architecture.pdf
    │
    └── build/
        ├── whitepaper/build.py
        └── briefing/build_briefing.py
```

---

## Key Dates

| Date | Event |
|---|---|
| 11 May 2026 | All three provisional patents filed at IP Australia |
| 11 May 2026 | Prior art search conducted — records in patents/prior-art/ |
| May 2026 | CURA logo and HealthPlus logo uploaded to /images/ |
| **11 May 2027** | **Standard patent conversion deadline — MUST NOT MISS** |

---

## Technology Stack

- **Hardware:** ESP32-S3 (×8 ordered), TI IWR6843AOPEVM, MLX90640, Raspberry Pi 5 8GB
- **Software:** Python / FastAPI / PostgreSQL / React / Docker
- **Sensing engine:** RuView (MIT licensed, Docker validated)
- **Identification:** Dual-branch transformer on WiFi CSI (Sapienza 2023 academic basis)
- **Processing:** All on-site — no cloud dependency for core product

---

## Critical Prior Art Note

The dual-branch transformer identification architecture is based on:
> Avola et al., "Transformer-Based Person Identification via Wi-Fi CSI Amplitude and Phase Perturbations," IEEE 2023 (document 10235745)

CURA's novel ground is the **application** to regulated care environments for vital sign attribution to non-consenting persons — not the identification architecture itself. Patent attorney must be briefed on this before standard patent conversion.

See `patents/prior-art/SEARCH_RECORD.md` for full prior art search record.

---

© 2026 Westminster Green Solutions T/A Health Plus International. All rights reserved.
