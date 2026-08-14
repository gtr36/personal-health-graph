---
schema_version: "0.2.0"
type: integration
tier: summary
period: # YYYY-MM
source: # e.g., Dexcom Stelo via Clarity, Libre via LibreView, Levels
target_range: # e.g., 70-140 mg/dL (note which convention you use)
tags: [cgm, glucose, YYYY-MM]
---

# CGM — [Month Year]

**Wear period:** <!-- e.g., full month | Aug 3-17 only | not worn (file exists for continuity) -->

## Daily Summary

| Date | Mean | TIR % | CV % | Min | Max | Notes |
|------|------|-------|------|-----|-----|-------|
| | | | | | | |

## Notable Events

<!--
Annotate the excursions worth remembering. Format:

### YYYY-MM-DD — [brief label]
- **Peak/nadir:** [value and time]
- **Context:** [the meal, workout, stress, sleep debt]
- **Pattern note:** [seen before? consistent with prior responses?]
-->

## Monthly Summary

- **Mean glucose:** <!-- month average -->
- **Average TIR:** <!-- month average -->
- **Trend vs prior month:** <!-- improving / stable / worsening, and the suspected driver -->

## Linked Files
<!-- - integrations/nutrition/YYYY-MM.md → meals behind the notable events -->
<!-- - integrations/wearable_daily/YYYY-MM.md → sleep context for volatile days -->
<!-- - LABS_HISTORY.md → HbA1c and fasting glucose concordance -->
