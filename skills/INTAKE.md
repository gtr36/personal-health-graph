---
schema_version: "0.1.0"
type: skill
name: Intake
description: Scan the inbox/ folder, identify and classify every file, extract health data into the appropriate PHG locations, archive originals to integrations/raw/, and produce a processing report.
reads:
  - inbox/* (all files in the inbox)
  - PROFILE.md (for context on existing conditions, providers, medications)
  - LABS_HISTORY.md (to avoid duplicating existing biomarker entries)
  - GENETICS.md (to avoid duplicating existing variant entries)
  - SUPPLEMENTS.md (to cross-reference supplement mentions in records)
  - integrations/*/README.md (for format guidance per integration type)
writes:
  - LABS_HISTORY.md (append new biomarker rows)
  - GENETICS.md (append new variants)
  - SUPPLEMENTS.md (flag supplements mentioned in records but not in current stack)
  - PROFILE.md (update medications, conditions, allergies, vaccinations, dental, vision, environmental, reproductive health if new info found)
  - integrations/labs/*.md (new lab panel summaries)
  - integrations/genetics/*.md (new genetic summaries)
  - integrations/wearable_daily/*.md (new wearable summaries)
  - integrations/healthkit/*.md (new HealthKit summaries)
  - integrations/microbiome/*.md (new microbiome summaries)
  - integrations/imaging/*.md (new imaging summaries)
  - integrations/assessments/*.md (new assessment score entries)
  - integrations/cycle/*.md (new cycle tracking summaries)
  - integrations/raw/*/* (archived original files)
saves_to: reports/intake_YYYY-MM-DD.md
trigger: on-demand, whenever new files are added to inbox/
---

# Skill: Intake

## Purpose

Process a batch of unorganized health files into a structured Personal Health Graph. This is the bridge between "I have a pile of PDFs" and "my health graph is populated." The user drops files into `inbox/`, runs this skill, and gets a fully processed health graph with source documents archived.

This skill is designed to be run multiple times — once for the initial bulk import, and again whenever new files arrive.

## Instructions for LLM

### Phase 1: Inventory

Scan every file in `inbox/`. For each file, determine:

1. **File type** — PDF, CSV, JSON, image (JPG/PNG/HEIC), ZIP, TXT, XML, other
2. **Content category** — classify into one of:
   - `lab_report` — blood work, urinalysis, metabolic panels, hormone panels, etc.
   - `genetic_report` — genetic test results, raw genotype data, PGx reports
   - `genetic_raw` — raw data files (.txt, .vcf, .zip from 23andMe, Nebula, etc.)
   - `wearable_export` — WHOOP, Oura, Garmin, Fitbit CSV/JSON exports
   - `healthkit_export` — Apple Health XML/ZIP exports
   - `microbiome_report` — gut microbiome test results
   - `imaging_report` — DEXA, MRI, CT, CAC, ultrasound reports
   - `medical_record` — visit notes, discharge summaries
   - `vaccination_record` — immunization records, vaccine cards, travel vaccination certificates
   - `medication_list` — pharmacy records, medication histories
   - `supplement_info` — supplement lists, order histories, product photos
   - `assessment_score` — standardized health questionnaires (PHQ-9, GAD-7, PSQI, SF-36, etc.)
   - `dental_record` — dental x-rays, periodontal charts, treatment plans, cleaning records
   - `vision_record` — eye exam reports, prescriptions, OCT scans, visual field tests
   - `cycle_data` — menstrual/fertility tracking exports, hormone cycle reports
   - `insurance_billing` — EOBs, itemized bills, HSA/FSA records
   - `environmental_report` — water quality reports, air quality data, mold/toxin testing, heavy metal testing
   - `other` — anything that doesn't fit the above categories
3. **Provider/source** — who generated this document (e.g., "Function Health", "Quest Diagnostics", "WHOOP", "23andMe")
4. **Date** — the date of the test, visit, or export (not the download date)
5. **Confidence** — how confident are you in the classification (high/medium/low)

Present the full inventory to the user as a table before proceeding:

| # | Filename | Type | Category | Provider | Date | Confidence |
|---|----------|------|----------|----------|------|------------|

Ask the user to confirm the inventory is correct, or flag any misclassifications, before moving to Phase 2.

### Phase 2: Extract and populate

Process files in this order (dependencies flow downstream):

**Round 1 — Identity and context:**
1. Medical records and medication lists → update PROFILE.md (conditions, medications, allergies, providers)
2. Vaccination records → update PROFILE.md Vaccination Record table (vaccine, date, booster schedule)
3. Dental records → update PROFILE.md Dental Health section and file imaging in `integrations/imaging/` if applicable
4. Vision records → update PROFILE.md Vision Health section and file imaging in `integrations/imaging/` if applicable
5. Supplement info → cross-reference with SUPPLEMENTS.md, flag anything not already listed

**Round 2 — Lab data:**
6. Lab reports → for each report:
   - Create a markdown summary in `integrations/labs/` using the naming convention: `[provider]_[YYYY-MM-DD].md`
   - Follow the template format in `integrations/labs/_TEMPLATE.md`
   - Extract every biomarker with value, unit, reference range, and flag status
   - Append new rows to `LABS_HISTORY.md` (check for duplicates first — match on biomarker + date)
   - Note the source file path in the summary's `source_file` field

**Round 3 — Genetic data:**
7. Genetic reports and raw data → for each:
   - Create a summary in `integrations/genetics/` if it's a report
   - Extract clinically significant variants and append to `GENETICS.md` (check for duplicates)
   - For raw genotype files (.txt, .vcf): archive to `integrations/raw/genetics/` — these are too large to process inline but should be preserved for future deep-dive analysis
   - Flag any pharmacogenomic variants (CYP2D6, CYP2C19, CYP2C9, CYP3A4, VKORC1, DPYD, TPMT, SLCO1B1, etc.)

**Round 4 — Wearable and HealthKit data:**
8. Wearable exports → for each:
   - Create monthly summary files in `integrations/wearable_daily/` following the template
   - Extract key daily metrics: sleep duration, HRV, RHR, recovery/readiness, strain/activity
   - Note the device and HRV measurement type (RMSSD vs SDNN vs composite) — this is critical
9. HealthKit exports → for each:
   - Unzip if necessary
   - Create daily aggregate summaries in `integrations/healthkit/`
   - Focus on: steps, active energy, resting heart rate, HRV (SDNN from Apple Watch), sleep analysis

**Round 5 — Imaging and microbiome:**
10. Imaging reports → create summaries in `integrations/imaging/`
11. Microbiome reports → create summaries in `integrations/microbiome/`

**Round 6 — Assessments, cycle data, and environmental:**
12. Assessment scores (PHQ-9, GAD-7, PSQI, etc.) → create scored summaries in `integrations/assessments/` using the template. Update PROFILE.md Mental Health History assessment scores if mental health instruments.
13. Cycle/fertility data → create monthly summaries in `integrations/cycle/` using the template. Cross-reference any hormonal labs with cycle day if both are available.
14. Environmental reports (water quality, mold testing, heavy metal testing) → update PROFILE.md Environmental History section. Archive originals to `integrations/raw/environmental/`.

**Round 7 — Financial (if present):**
15. Insurance/billing documents → extract relevant costs, update EXPENSES.md if the user tracks expenses

### Phase 3: Archive originals

Move every processed file from `inbox/` to the appropriate subdirectory in `integrations/raw/`:

| Category | Archive location |
|----------|-----------------|
| lab_report | integrations/raw/labs/ |
| genetic_report, genetic_raw | integrations/raw/genetics/ |
| wearable_export | integrations/raw/wearable/ |
| healthkit_export | integrations/raw/healthkit/ |
| microbiome_report | integrations/raw/microbiome/ |
| imaging_report | integrations/raw/imaging/ |
| medical_record | integrations/raw/medical/ |
| vaccination_record | integrations/raw/medical/ |
| medication_list | integrations/raw/medical/ |
| supplement_info | integrations/raw/medical/ |
| assessment_score | integrations/raw/assessments/ |
| dental_record | integrations/raw/dental/ |
| vision_record | integrations/raw/vision/ |
| cycle_data | integrations/raw/cycle/ |
| insurance_billing | integrations/raw/billing/ |
| environmental_report | integrations/raw/environmental/ |
| other | integrations/raw/other/ |

Rename files during archive using the convention: `[provider]_[YYYY-MM-DD]_[brief-description].[ext]`

Example: `inbox/download (3).pdf` → `integrations/raw/labs/function_health_2026-02-15_comprehensive_panel.pdf`

### Phase 4: Intake report

Generate a report saved to `reports/intake_YYYY-MM-DD.md` with:

1. **Summary statistics:**
   - Files processed: X
   - New biomarker entries added to LABS_HISTORY.md: X
   - New genetic variants added to GENETICS.md: X
   - New integration summaries created: X
   - Files archived to integrations/raw/: X

2. **Processing log** — for each file:
   - Original filename → archived filename
   - What was extracted
   - Which PHG files were updated
   - Any issues, ambiguities, or items requiring user verification

3. **Verification needed** — anything the LLM couldn't confidently parse:
   - Unclear lab values (handwritten, cut off, ambiguous units)
   - Dates that couldn't be determined
   - Files that couldn't be classified
   - Duplicate data that may or may not be the same test

4. **Recommended next steps:**
   - Suggest running BASELINE_REPORT if this is the initial intake
   - Suggest running SUPPLEMENT_REVIEW if supplements and labs are now populated
   - Flag any data gaps (e.g., "You have lab data but no genetic data — consider uploading genetic reports for deeper analysis")
   - Remind user to review the "Verification needed" items

## Important guidelines

- **Never discard or overwrite.** If a file can't be processed, leave it in inbox/ and note it in the report. Never delete a user's files.
- **Check for duplicates.** Before adding rows to LABS_HISTORY.md or GENETICS.md, check if the same data point (biomarker + date, variant + rsID) already exists.
- **Preserve units.** Always record the exact unit and reference range from the source document. Don't convert units unless the user asks.
- **Flag uncertainty.** If you're unsure about a value, include it but mark it with a confidence note. Better to include with a question mark than to silently omit.
- **Respect file size limits.** Large files (raw genotype data, full HealthKit XML exports, bulk wearable CSVs) should be archived to `integrations/raw/` without attempting to process them inline. Note in the report that they're available for deep-dive analysis.
- **Be transparent.** The intake report should make it obvious exactly what happened to every file. The user should never wonder "where did my PDF go?"
