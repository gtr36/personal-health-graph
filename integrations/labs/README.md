# Lab Results — Integration Guide

## What goes here
Markdown summaries of individual lab panels from any provider: Function Health, Quest Diagnostics, LabCorp, your PCP's office, specialty panels, etc. One file per panel or per draw date.

For a consolidated longitudinal view across all panels, see `LABS_HISTORY.md` in the root directory.

## How to structure a lab panel file

Name the file by provider and date: `function_health_2026-02-15.md`, `quest_2025-11-03.md`, `pcp_annual_2026-01-20.md`

```markdown
---
schema_version: "0.1.0"
type: integration
tier: summary
source: "[Provider Name]"
draw_date: YYYY-MM-DD
received_date: YYYY-MM-DD
tags: [labs, provider-name, YYYY-MM]
---

# Lab Panel — [Provider], [Date]

## Panel Info
- **Provider:** [Function Health, Quest, LabCorp, etc.]
- **Draw date:** YYYY-MM-DD
- **Fasting:** Yes / No
- **Order type:** [Routine, annual, follow-up, self-ordered]
- **Source PDF:** raw/labs/[filename].pdf

## Results

| Biomarker | Value | Unit | Reference Range | Flag |
|-----------|-------|------|-----------------|------|
| | | | | |

## Flagged Values
<!-- List any out-of-range results with brief context -->

## Notes
<!-- Anything relevant: fasting status, recent illness, medication changes, etc. -->
<!-- Link to SUPPLEMENTS.md or PROTOCOLS.md if a result relates to an intervention -->
```

## How to get your data

### Function Health
1. Log in at functionhealth.com
2. Navigate to Results
3. Download PDF or screenshot each panel
4. Store the PDF in `raw/labs/`
5. Transcribe results into markdown using the template above

### Quest Diagnostics
1. Log in at MyQuest (questdiagnostics.com)
2. Navigate to Results
3. Download or print each panel
4. Store in `raw/labs/`

### LabCorp
1. Log in at patient.labcorp.com
2. Navigate to Test Results
3. Download PDF
4. Store in `raw/labs/`

### InsideTracker
1. Log in at insidetracker.com
2. Navigate to Results → Download
3. Export CSV or PDF
4. Store in `raw/labs/`

### Marek Health
1. Log in at marekhealth.com
2. Navigate to Results
3. Download PDF
4. Store in `raw/labs/`

### Life Extension
1. Log in at lifeextension.com
2. Navigate to My Account → Blood Test Results
3. Download results
4. Store in `raw/labs/`

### Your doctor's patient portal (Epic MyChart, Cerner, etc.)
1. Navigate to Test Results
2. Download or screenshot
3. Store in `raw/labs/`

### Requesting records you don't see online
Under HIPAA (in the US), you have a legal right to obtain copies of all your lab results. If results aren't available through a patient portal, you can submit a medical records request directly to the lab or provider. Most must respond within 30 days.

### Tip: Using AI to extract lab data
If you have a lab PDF, you can give it to any LLM and ask:
> "Extract all biomarker values from this lab report into a markdown table with columns: Biomarker, Value, Unit, Reference Range, Flag (H/L/normal)."

This is often faster than manual transcription.
