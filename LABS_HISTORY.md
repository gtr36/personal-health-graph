---
schema_version: "0.1.0"
type: state
created:    # YYYY-MM-DDTHH:MM:SS±HH:MM
updated:    # YYYY-MM-DDTHH:MM:SS±HH:MM
tags: [labs, longitudinal, biomarkers, trends]
---

# Lab History — Consolidated Longitudinal Report

<!--
HOW TO USE THIS FILE:
This is the single most powerful file in your Personal Health Graph for AI analysis. It consolidates
every biomarker from every lab panel you've ever had into one longitudinal table, enabling
trend analysis, flag tracking, and cross-referencing with genetics and supplements.

BUILDING THIS FILE:
Option 1 (AI-assisted): Give all your lab PDFs to an LLM and ask it to extract every biomarker
into the table format below. This is the fastest approach.

Option 2 (Manual): Add rows as you get new results. Each row = one biomarker from one draw date.

UPDATING:
When new lab results come in, add new rows to the appropriate biomarker sections.
Never delete old values — the longitudinal history is the whole point.

TIPS:
- Keep units consistent within each biomarker (convert if needed)
- Flag column: H = high, L = low, blank = within range
- Always record the reference range — it varies between labs
- Note the source (provider/lab) since ranges differ between Quest, LabCorp, Function Health, etc.

VERIFICATION:
Values written by an AI from PDFs, CSVs, or portal exports are UNVERIFIED until checked
against the source document — transcription errors at this step silently poison every
downstream analysis while looking coherent.
- Convention: append ✓ to a value once it has been confirmed against the original document
  (value, unit, reference range, AND draw date), either manually or by a FACT_AUDIT
  foundation-mode pass. Unverified flagged values deserve verification first.
- Every unit conversion should be re-derived from the original, not trusted from memory.
- Resolve INTAKE's "verification needed" items promptly — they are this file's known
  weak points, and MAINTENANCE flags them if they age.
- Log verification passes in the Verification Log at the bottom of this file.
-->

## Draw Dates

<!-- List all draw dates for quick reference -->
| # | Date | Provider | Fasting | Source File |
|---|------|----------|---------|-------------|
| | | | | |

## Metabolic Panel

| Biomarker | [Date 1] | [Date 2] | [Date 3] | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| Glucose | | | | mg/dL | 65-99 | | |
| HbA1c | | | | % | <5.7 | | |
| Insulin, fasting | | | | µIU/mL | 2.6-24.9 | | |
| HOMA-IR | | | | | <2.0 | | |
| BUN | | | | mg/dL | 6-20 | | |
| Creatinine | | | | mg/dL | 0.76-1.27 | | |
| eGFR | | | | mL/min | >60 | | |
| Sodium | | | | mmol/L | 134-144 | | |
| Potassium | | | | mmol/L | 3.5-5.2 | | |
| Chloride | | | | mmol/L | 96-106 | | |
| CO2 | | | | mmol/L | 18-29 | | |
| Calcium | | | | mg/dL | 8.7-10.2 | | |
| Uric acid | | | | mg/dL | 3.7-8.6 | | |
| ALT | | | | U/L | 0-44 | | |
| AST | | | | U/L | 0-40 | | |
| ALP | | | | U/L | 44-121 | | |
| Bilirubin, total | | | | mg/dL | 0.1-1.2 | | |
| Albumin | | | | g/dL | 3.8-4.9 | | |
| Total protein | | | | g/dL | 6.0-8.5 | | |

## Lipid Panel

| Biomarker | [Date 1] | [Date 2] | [Date 3] | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| Total cholesterol | | | | mg/dL | 100-199 | | |
| LDL-C | | | | mg/dL | 0-99 | | |
| HDL-C | | | | mg/dL | >39 | | |
| Triglycerides | | | | mg/dL | 0-149 | | |
| ApoB | | | | mg/dL | <90 | | |
| Lp(a) | | | | nmol/L | <75 | | |
| LDL-P | | | | nmol/L | <1000 | | |
| sdLDL-C | | | | mg/dL | <30 | | |
| OxLDL | | | | U/L | <60 | | |
| TC/HDL ratio | | | | | <5.0 | | |

## Complete Blood Count (CBC)

| Biomarker | [Date 1] | [Date 2] | [Date 3] | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| WBC | | | | x10³/µL | 3.4-10.8 | | |
| RBC | | | | x10⁶/µL | 4.14-5.80 | | |
| Hemoglobin | | | | g/dL | 12.6-17.7 | | |
| Hematocrit | | | | % | 37.5-51.0 | | |
| MCV | | | | fL | 79-97 | | |
| MCH | | | | pg | 26.6-33.0 | | |
| MCHC | | | | g/dL | 31.5-35.7 | | |
| RDW | | | | % | 11.7-15.4 | | |
| Platelets | | | | x10³/µL | 150-379 | | |
| MPV | | | | fL | 7.4-10.4 | | |

## Iron Panel

| Biomarker | [Date 1] | [Date 2] | [Date 3] | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| Iron, serum | | | | µg/dL | 38-169 | | |
| Ferritin | | | | ng/mL | 30-400 | | |
| TIBC | | | | µg/dL | 250-370 | | |
| Transferrin sat | | | | % | 15-55 | | |

## Thyroid

| Biomarker | [Date 1] | [Date 2] | [Date 3] | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| TSH | | | | µIU/mL | 0.45-4.5 | | |
| Free T4 | | | | ng/dL | 0.82-1.77 | | |
| Free T3 | | | | pg/mL | 2.0-4.4 | | |
| TPO antibodies | | | | IU/mL | 0-34 | | |

## Inflammation

| Biomarker | [Date 1] | [Date 2] | [Date 3] | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| hs-CRP | | | | mg/L | <1.0 | | |
| ESR | | | | mm/hr | 0-15 | | |
| Homocysteine | | | | µmol/L | 0-14.5 | | |
| Fibrinogen | | | | mg/dL | 193-507 | | |

## Vitamins & Minerals

| Biomarker | [Date 1] | [Date 2] | [Date 3] | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| Vitamin D (25-OH) | | | | ng/mL | 30-100 | | |
| Vitamin B12 | | | | pg/mL | 232-1245 | | |
| Folate | | | | ng/mL | >3.0 | | |
| Magnesium, RBC | | | | mg/dL | 4.2-6.8 | | |
| Zinc | | | | µg/dL | 56-134 | | |
| Selenium | | | | µg/L | 71-183 | | |
| Copper | | | | µg/dL | 72-166 | | |
| Omega-3 Index | | | | % | >8.0 | | |
| EPA | | | | % | — | | |
| DHA | | | | % | — | | |

## Hormones

| Biomarker | [Date 1] | [Date 2] | [Date 3] | Unit | Reference Range | Flag | Notes |
|-----------|----------|----------|----------|------|-----------------|------|-------|
| Testosterone, total | | | | ng/dL | 264-916 | | |
| Testosterone, free | | | | pg/mL | 6.8-21.5 | | |
| SHBG | | | | nmol/L | 16.5-55.9 | | |
| Estradiol | | | | pg/mL | 7.6-42.6 | | |
| DHEA-S | | | | µg/dL | 138-475 | | |
| Cortisol, AM | | | | µg/dL | 6.2-19.4 | | |
| IGF-1 | | | | ng/mL | age-dependent | | |

## Additional Markers
<!-- Add sections for any biomarkers not covered above. -->
<!-- Common additions: heavy metals, food sensitivity panels, allergy panels, -->
<!-- tumor markers, autoimmune panels, coagulation studies, etc. -->

---

## Annotations

<!--
Use this section to add clinical context to specific results. Link to GENETICS.md for
gene-lab concordances, SUPPLEMENTS.md for intervention tracking, and symptoms/ for
symptom correlations.

Example:
- **ALT elevated (52 U/L, Feb 2026):** Likely attributable to daily cetirizine (Zyrtec).
  ALT elevation is a known class effect of second-generation antihistamines in ~5% of users.
  Not hepatocellular — no AST elevation, normal bilirubin, normal albumin.
  Linked: SUPPLEMENTS.md (cetirizine entry), GENETICS.md (no hepatic risk variants).

- **Transferrin saturation 55% (Feb 2026):** Consistent with HFE H63D heterozygous status.
  Not pathological at current ferritin level, but warrants monitoring.
  Linked: GENETICS.md (HFE H63D), PROFILE.md (no hemochromatosis diagnosis).
-->

## Verification Log

<!--
One entry per verification pass (manual or FACT_AUDIT foundation mode):

### YYYY-MM-DD — [full | flagged rows + sample] — [method and model]
- **Rows verified:** N (✓ applied) against [panel files / raw PDFs]
- **Discrepancies:** [none | per row: biomarker, date, recorded vs source value, resolution]
- **Unverifiable:** [rows with no panel file or raw document behind them]
- **Next verification due:** [after next intake / date]
-->
