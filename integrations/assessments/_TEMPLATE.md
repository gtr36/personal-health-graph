---
schema_version: "0.1.0"
type: integration
tier: summary
instrument: # e.g., PHQ-9, GAD-7, PSQI, ESS, SF-36
date: # YYYY-MM-DD
administered_by: # self, provider name, clinical setting
source: # e.g., self-administered, provider name, screening portal
tags: [assessment, instrument-name]
---

# [Instrument Name] — [Date]

## Score Summary
- **Total score:** 
- **Severity/category:** <!-- e.g., mild, moderate, severe — per instrument cutoffs -->
- **Prior score:** <!-- last administration date and score for quick comparison -->
- **Trend:** <!-- improving, stable, worsening, first administration -->

## Item Responses
<!-- Record individual item responses if available. This enables more granular analysis. -->
<!-- Most instruments use a 0-3 or 0-4 Likert scale per item. -->

| Item | Description | Score |
|------|------------|-------|
| | | |

## Context
- **Administered by:** <!-- self-report, PCP, psychiatrist, psychologist, screening portal -->
- **Setting:** <!-- routine visit, intake, follow-up, self-administered at home -->
- **Relevant context:** <!-- recent life events, medication changes, protocol changes, sleep disruption -->

## Clinical Notes
<!-- Provider interpretation, recommendations, or follow-up plan if administered clinically. -->
<!-- If self-administered: your own observations about what might be driving the score. -->

## Linked Files
<!-- Cross-reference related data that provides context for this score. -->
<!-- - SUPPLEMENTS.md → recent changes to mood-affecting supplements -->
<!-- - symptoms/YYYY-MM.md → recent symptom entries -->
<!-- - integrations/wearable_daily/ → sleep and HRV trends around this date -->
<!-- - journal/YYYY-MM.md → relevant observations -->
