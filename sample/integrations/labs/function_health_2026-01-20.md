---
schema_version: "0.3.0"
type: integration
subtype: lab_panel
tier: summary
provider: Function Health
source: "Function Health (self-ordered membership panel)"
draw_date: 2026-01-20
report_date: 2026-01-26
panel_name: "Function Health member panel (relevant subset)"
fasting: true
source_file: integrations/raw/labs/function_health_2026-01-20.pdf (not included in sample)
created: 2026-01-27T19:15:00-07:00
updated: 2026-01-27T19:15:00-07:00
tags: [labs, function-health, 2026-01, sample]
---

<!-- FICTIONAL DEMO DATA — Sam Rivera is not a real person. -->

# Lab Panel — Function Health — 2026-01-20

## Results

| Biomarker | Value | Unit | Reference Range | Flag |
|-----------|-------|------|-----------------|------|
| Glucose | 94 | mg/dL | 65-99 | ✅ |
| HbA1c | 5.6 | % | <5.7 | ✅ |
| BUN | 17 | mg/dL | 6-20 | ✅ |
| Creatinine | 1.05 | mg/dL | 0.76-1.27 | ✅ |
| eGFR | 90 | mL/min | >60 | ✅ |
| Sodium | 140 | mmol/L | 134-144 | ✅ |
| Potassium | 4.4 | mmol/L | 3.5-5.2 | ✅ |
| ALT | 31 | U/L | 0-44 | ✅ |
| AST | 26 | U/L | 0-40 | ✅ |
| Total cholesterol | 192 | mg/dL | <200 | ✅ |
| LDL-C (calculated) | 118 | mg/dL | <130 | ✅ |
| HDL-C | 50 | mg/dL | >39 | ✅ |
| Triglycerides | 120 | mg/dL | <150 | ✅ |
| ApoB | 101 | mg/dL | 52-135 | ✅ |
| Lp(a) | 78 | nmol/L | <75 | ⚠️ borderline high |
| hs-CRP | 1.4 | mg/L | 0.0-3.0 | ✅ |
| Homocysteine | 9.8 | µmol/L | 0-14.5 | ✅ |
| TSH | 2.1 | µIU/mL | 0.45-4.5 | ✅ |
| Vitamin D (25-OH) | 38 | ng/mL | 30-100 | ✅ |
| WBC | 5.8 | x10³/µL | 3.4-10.8 | ✅ |
| RBC | 5.10 | x10⁶/µL | 4.14-5.80 | ✅ |
| Hemoglobin | 15.4 | g/dL | 12.6-17.7 | ✅ |
| Hematocrit | 45.3 | % | 37.5-51.0 | ✅ |
| MCV | 89 | fL | 79-97 | ✅ |
| Platelets | 238 | x10³/µL | 150-379 | ✅ |

## Notes

- Fasting draw, 8:05am. This summary is the subset relevant to current tracking; the full member panel is in the archived PDF.
- Medications at draw: lisinopril 10mg daily; atorvastatin 20mg started 10 days earlier (2026-01-10).
- First-ever Lp(a) measurement: 78 nmol/L, marked borderline high on the report.
- Reference ranges are as printed on the Function Health report and differ from Quest on some markers.

## Linked Updates

- LABS_HISTORY.md — all rows added for draw date 2026-01-20; Lp(a) row created
- DOCTOR_QS.md — Lp(a) discussed at 2026-06-10 cardiology consult
