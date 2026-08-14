---
schema_version: "0.3.0"
type: state
created: 2025-10-18T21:00:00-06:00
updated: 2026-05-18T20:30:00-06:00
tags: [labs, longitudinal, biomarkers, trends, sample]
---

<!-- FICTIONAL DEMO DATA — Sam Rivera is not a real person. -->

# Lab History — Consolidated Longitudinal Report

<!-- Reference ranges below are as stated on each lab report. Where labs differ, the Notes column says so. -->

## Draw Dates

| # | Date | Provider | Fasting | Source File |
|---|------|----------|---------|-------------|
| 1 | 2025-10-12 | Quest Diagnostics (ordered by Dr. Chen) | Yes | integrations/labs/quest_2025-10-12.md |
| 2 | 2026-01-20 | Function Health (self-ordered) | Yes | integrations/labs/function_health_2026-01-20.md |
| 3 | 2026-05-15 | Quest Diagnostics (ordered by Dr. Chen) | Yes | integrations/labs/quest_2026-05-15.md |

## Metabolic Panel

| Biomarker | 2025-10-12 (Quest) | 2026-01-20 (Function) | 2026-05-15 (Quest) | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| Glucose | 92 | 94 | 91 | mg/dL | 65-99 | | Fasting all three draws |
| HbA1c | 5.5 | 5.6 | 5.6 | % | <5.7 | | |
| BUN | 16 | 17 | 16 | mg/dL | 6-20 | | |
| Creatinine | 1.02 | 1.05 | 1.03 | mg/dL | 0.76-1.27 | | Daily creatine 5g since 2025-08 |
| eGFR | 92 | 90 | 91 | mL/min | >60 | | |
| Sodium | 139 | 140 | 139 | mmol/L | 134-144 | | |
| Potassium | 4.3 | 4.4 | 4.3 | mmol/L | 3.5-5.2 | | Monitored on lisinopril |
| ALT | 28 | 31 | 30 | U/L | 0-44 | | |
| AST | 24 | 26 | 25 | U/L | 0-40 | | |

## Lipid Panel

| Biomarker | 2025-10-12 (Quest) | 2026-01-20 (Function) | 2026-05-15 (Quest) | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| Total cholesterol | 198 | 192 | 192 | mg/dL | <200 | | |
| LDL-C | 128 | 118 | 122 | mg/dL | <130 (calc, lab-stated) | | |
| HDL-C | 52 | 50 | 51 | mg/dL | >39 | | |
| Triglycerides | 90 | 120 | 95 | mg/dL | <150 | | |
| ApoB | 92 | 101 | 108 | mg/dL | <130 (Quest); 52-135 (Function) | | Ranges as stated on each report |
| Lp(a) | — | 78 | — | nmol/L | <75 | H (mild) | Measured once, Function Health only |
| TC/HDL ratio | 3.8 | 3.8 | 3.8 | | <5.0 | | |

## Complete Blood Count (CBC)

| Biomarker | 2025-10-12 (Quest) | 2026-01-20 (Function) | 2026-05-15 (Quest) | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| WBC | 6.1 | 5.8 | 6.0 | x10³/µL | 3.4-10.8 | | |
| RBC | 5.02 | 5.10 | 5.05 | x10⁶/µL | 4.14-5.80 | | |
| Hemoglobin | 15.2 | 15.4 | 15.3 | g/dL | 12.6-17.7 | | High-normal; see Annotations |
| Hematocrit | 44.8 | 45.3 | 45.0 | % | 37.5-51.0 | | |
| MCV | 89 | 89 | 90 | fL | 79-97 | | |
| Platelets | 242 | 238 | 245 | x10³/µL | 150-379 | | |

## Thyroid

| Biomarker | 2025-10-12 (Quest) | 2026-01-20 (Function) | 2026-05-15 (Quest) | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| TSH | 1.8 | 2.1 | 2.0 | µIU/mL | 0.45-4.5 | | |

## Inflammation

| Biomarker | 2025-10-12 (Quest) | 2026-01-20 (Function) | 2026-05-15 (Quest) | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| hs-CRP | 1.9 | 1.4 | 1.6 | mg/L | 0.0-3.0 (lab-stated) | | |
| Homocysteine | — | 9.8 | — | µmol/L | 0-14.5 | | Function Health only |

## Vitamins & Minerals

| Biomarker | 2025-10-12 (Quest) | 2026-01-20 (Function) | 2026-05-15 (Quest) | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| Vitamin D (25-OH) | 24 | 38 | 44 | ng/mL | 30-100 | L (2025-10) | D3 5000 IU started 2025-11-01 |

---

## Annotations

- **Hemoglobin/hematocrit high-normal (all draws):** Consistent with Denver residence (~5,280 ft altitude). No polycythemia workup indicated per Dr. Chen.
