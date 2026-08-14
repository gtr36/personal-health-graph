# Imaging & Scans — Integration Guide

## What goes here
Results from any medical imaging or body composition testing: DEXA scans, MRI, CT, ultrasound, X-rays, coronary calcium scoring (CAC), full-body scans (Prenuvo, etc.), retinal imaging, etc.

## How to structure an imaging result file

Name the file by type and date: `dexa_2026-01-15.md`, `cac_score_2025-11-20.md`, `prenuvo_2026-03-08.md`

```markdown
---
schema_version: "0.1.0"
type: integration
tier: summary
source: "[Provider / Facility]"
scan_date: YYYY-MM-DD
scan_type: DEXA | MRI | CT | ultrasound | X-ray | CAC | retinal | other
tags: [imaging, scan-type, YYYY-MM]
---

# [Scan Type] — [Facility], [Date]

## Scan Info
- **Type:** [DEXA, MRI, CT, CAC, full-body MRI, retinal scan, etc.]
- **Facility:** [Name and location]
- **Ordering provider:** [If applicable]
- **Reason:** [Screening, follow-up, symptom investigation, baseline]
- **Source file:** raw/imaging/[filename].pdf

## Results

### [Category — e.g., Body Composition (DEXA)]
<!-- Structure depends on scan type. Examples below. -->

#### DEXA Scan
| Metric | Value | Prior | Change |
|--------|-------|-------|--------|
| Total body fat % | | | |
| Lean mass (lbs) | | | |
| Bone mineral density (g/cm²) | | | |
| T-score (spine) | | | |
| T-score (hip) | | | |
| Visceral fat (g) | | | |
| Android/Gynoid ratio | | | |

#### Coronary Calcium Score (CAC)
- **Agatston score:**
- **Percentile for age/sex:**
- **Clinical interpretation:**

#### MRI / CT / Ultrasound
- **Area scanned:**
- **Findings:** [Radiologist's summary]
- **Incidental findings:** [If any]
- **Recommendations:** [Follow-up imaging, referrals, etc.]

## Linked Files
- PROFILE.md → relevant conditions
- integrations/labs/ → related lab work
- DOCTOR_QS.md → follow-up questions

## Notes
<!-- Context: symptoms at time of scan, reason for ordering, comparison to prior imaging -->
```

## How to get your data

### DEXA scan providers (DexaFit, BodySpec, etc.)
1. Request your full report (not just the summary card)
2. Most providers email a PDF — store in `raw/imaging/`

### Prenuvo / full-body MRI
1. Log in to your Prenuvo portal
2. Download the full radiology report
3. Store in `raw/imaging/`

### Hospital / clinic imaging (Epic MyChart, etc.)
1. Navigate to Imaging Results in your patient portal
2. Download the radiology report
3. For DICOM images, request a CD or digital transfer
4. Store reports in `raw/imaging/`

### Coronary Calcium Scoring
1. Get the report from the ordering cardiologist or imaging center
2. The key number is the Agatston score — capture this prominently

## Notes
- Imaging results often require radiologist interpretation. Always capture both the raw measurements and the radiologist's clinical interpretation.
- For serial monitoring (e.g., annual DEXA), include prior values in the table so trends are immediately visible.
- Store actual DICOM images in `raw/imaging/` if you have them — they can be useful for second opinions.
