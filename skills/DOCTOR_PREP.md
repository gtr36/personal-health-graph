---
schema_version: "0.1.0"
type: skill
name: Doctor Prep
description: Compile a structured visit summary from recent entries, flag anomalies, prepare queued questions, and format for physician review.
reads:
  - PROFILE.md
  - MEDICATIONS.md
  - SUPPLEMENTS.md
  - GENETICS.md
  - LABS_HISTORY.md
  - DOCTOR_QS.md
  - symptoms/*.md
  - journal/*.md
  - integrations/labs/*.md
  - integrations/wearable_daily/*.md
  - integrations/vitals/*.md
  - integrations/imaging/*.md
  # Voice-captured entries are in journal/*.md with source: voice
default_range: 90 days (or since last visit, whichever is shorter)
output_format: structured visit brief with pharmacogenomic alerts and preventive care review
saves_to: reports/doctor_prep_YYYY-MM-DD.md (also .docx)
---

# Skill: Doctor Prep

## Purpose
Generate a concise, structured summary of the user's health data for an upcoming physician visit. The output should save the first 10 minutes of the appointment by replacing "so what's been going on?" with a complete, timestamped, data-backed brief — making the visit more productive for both patient and physician.

> **Important:** This output organizes your existing health data for clinical discussion. It does not constitute medical advice. All flagged items, suggested questions, and pharmacogenomic alerts should be reviewed and verified by your physician.

## Instructions for LLM

### Step 1: Determine scope
- Check `DOCTOR_QS.md` for the most recent visit date. Use that as the start of the review window.
- If no prior visit is logged, default to 90 days.
- Identify which provider the visit is with (PCP, specialist, etc.) and tailor relevance accordingly.

### Step 2: Gather and prioritize
Read all files for the review window. Prioritize:
1. **Symptoms:** Frequency, severity, patterns. Lead with anything recurring or worsening.
2. **Medication/supplement changes:** Anything started, stopped, or dose-adjusted.
3. **Lab results:** Most recent panel, flagged values, trends from prior panels.
4. **Wearable trends:** Sleep duration and quality trends, HRV trend, recovery trend.
5. **Observations:** User-noted patterns, concerns, hypotheses.
6. **Queued questions:** From DOCTOR_QS.md.

### Step 3: Generate output

#### Format
```
## Visit Brief
Patient: [name]
Provider: [provider name, if known]
Visit date: [date]
Prepared by: Personal Health Graph (AI-generated from structured health files)
Review period: [start] to [end]

---

### Chief Concerns
[Bulleted list of the top 2-3 things the patient wants to discuss, derived from symptoms + queued questions]

### Symptom Summary
| Symptom | Frequency | Avg Severity | Trend | Key Correlations |
|---------|-----------|-------------|-------|------------------|
[Table of symptom types with frequency, severity, trend, and strongest correlations]

### Medication & Supplement Status
**Active medications:** [list or "none"]
**Active supplements:** [list with doses]
**Changes since last visit:**
- [Started/stopped/adjusted items with dates and reasons]

### Lab Summary
**Most recent panel:** [date, source]
**Flagged values:**
[Table of out-of-range or trending markers]
**Changes from prior panel:**
[Notable improvements or declines]

### Vitals & Wearable Trends (90-day averages)
- Avg sleep: [duration]
- Avg HRV: [value] (trend: [up/down/stable])
- Avg resting HR: [value]
- Avg recovery: [value]
- Days in red recovery: [count]

### Patient Observations
[Relevant journal entries the patient has logged — patterns noticed, dietary changes, lifestyle factors, voice-captured observations]

### Pharmacogenomic Alerts
[If GENETICS.md contains pharmacogenomic data, flag any relevant drug-gene interactions:]
- **Active medications with PGx relevance:** [List any current medications where the patient carries a variant affecting metabolism — e.g., "Patient carries CYP2D6 *1/*4 (intermediate metabolizer). This may affect metabolism of: codeine, tramadol, metoprolol, fluoxetine, tamoxifen."]
- **If prescribing new medications:** [Flag drug classes where PGx status should be considered before prescribing]
- **If no PGx data available:** Note "Pharmacogenomic testing not yet performed. Consider ordering if prescribing medications metabolized by CYP2D6, CYP2C19, or CYP2C9."

### Preventive Care Review
[Based on age, sex, and risk factors from PROFILE.md and GENETICS.md, flag any preventive care gaps:]

**Age/sex-appropriate screenings due or overdue:**
<!-- Cross-reference against USPSTF recommendations for the patient's demographic:
  - Lipid panel frequency
  - HbA1c / fasting glucose (if risk factors present)
  - Blood pressure screening
  - Colorectal cancer screening (age 45+)
  - Cervical cancer screening (if applicable)
  - Breast cancer screening (if applicable)
  - Lung cancer screening (if applicable — heavy smoking history)
  - Skin cancer screening (based on risk factors)
  - Bone density screening (if applicable)
  - AAA screening (males 65-75 who have ever smoked)
  - Hepatitis C screening (if not previously done)
-->

**Genetic risk-informed screening considerations:**
<!-- If GENETICS.md shows elevated genetic risk in any domain, flag relevant screening:
  - APOE ε4 carrier → discuss cognitive screening, lipid management strategy
  - BRCA carrier (if clinically tested) → discuss enhanced screening schedule
  - Factor V Leiden → note for any surgical planning, VTE risk assessment
  - HFE variants → periodic iron panel monitoring
-->

**Immunization status:**
<!-- Flag any vaccines due based on age and schedule — influenza, Tdap, shingles (50+), pneumococcal (65+), COVID boosters -->

### Questions for Provider
[Numbered list from DOCTOR_QS.md, with context for each]

### Data Sources
[List of all files read to generate this brief]
```

### Important Notes
- This document is for the patient to share with their physician. Write in third person ("patient reports...") not first person.
- Do not interpret lab results clinically. Present the data; let the physician interpret.
- Do not make diagnostic suggestions. Present correlations and let the physician assess.
- Include the "Data Sources" section so the physician understands where this information came from.
- If any section has insufficient data, note it explicitly rather than omitting the section.
- Format for easy scanning — physicians have limited time. Tables over paragraphs where possible.
- **Pharmacogenomic alerts are high-value additions.** Many physicians are not routinely checking PGx status before prescribing. Presenting this data proactively can prevent adverse drug reactions and optimize dosing.
- **Preventive care screening recommendations should reference USPSTF guidelines** (the standard evidence-based framework used in primary care). Only flag screenings rated A or B by USPSTF, and cite the recommendation. Do not recommend screening tests that lack evidence of net benefit.
- **Tailor to the provider type.** If visiting a cardiologist, emphasize cardiovascular data, lipid trends, imaging, and relevant genetic variants. If visiting a PCP, provide the full picture. If visiting a specialist, filter to their domain.
- **Connector enhancements:** If output connectors are available (see `CONNECTORS.md`), run the PHYSICIAN_REPORT workflow to deliver this brief as a polished Notion page, Gamma presentation, or Word document. If ICD-10 and NPI connectors are available, enrich the brief with diagnostic codes and verified provider credentials. If Google Calendar or Fantastical is connected, pull appointment context automatically.
