---
schema_version: "0.1.0"
type: integration
subtype: lab_panel
tier: summary
provider: # e.g., Function Health, Quest Diagnostics, LabCorp, PCP
source: # provider name, e.g., "Function Health"
draw_date: # YYYY-MM-DD
report_date: # YYYY-MM-DD
panel_name: # e.g., "Comprehensive Panel", "Lipid Panel", "Thyroid Panel"
fasting: # true | false
source_file: # path to raw PDF in integrations/raw/ (if archived)
tags: [labs, provider-name, YYYY-MM]
---

# Lab Panel — [Provider] — [YYYY-MM-DD]

<!--
HOW TO USE THIS FILE:
Copy this template and rename by provider and date:
function_health_2026-02-15.md, quest_2025-11-03.md, pcp_annual_2026-01-20.md, etc.

See README.md in this directory for full import instructions by provider.

IMPORTANT: Always record the reference range from YOUR lab report.
Reference ranges vary between labs, methods, and populations.
Also add key results to LABS_HISTORY.md for longitudinal tracking.
-->

## Results

| Biomarker | Value | Unit | Reference Range | Flag |
|-----------|-------|------|-----------------|------|
| | | | | |

<!--
Flag options: ✅ normal | ⚠️ borderline | 🔴 out of range | ↑ high | ↓ low
-->

## Notes

<!--
Context that matters: fasting status, time of draw, medications at time of draw,
recent illness, exercise prior to draw, etc.
-->

## Linked Updates

<!--
After processing this panel, note which files were updated:
- LABS_HISTORY.md — added rows for [biomarkers]
- SUPPLEMENTS.md — adjusted [supplement] based on [finding]
- DOCTOR_QS.md — added question about [result]
-->
