---
schema_version: "0.1.0"
type: integration
subtype: wearable_daily
tier: summary
period: # YYYY-MM
device: # e.g., WHOOP 4.0, Oura Gen 3, Apple Watch Ultra 2, Garmin Fenix 7
source: # e.g., "WHOOP 4.0 (via app export)"
created: # YYYY-MM-DDTHH:MM:SS±HH:MM
updated: # YYYY-MM-DDTHH:MM:SS±HH:MM
entry_count: 0
tags: [wearable, device-name, YYYY-MM]
---

# Wearable Daily — [Month Year]

<!--
HOW TO USE THIS FILE:
Copy this template and rename by month: 2026-01.md, 2026-02.md, etc.

See README.md in this directory for device-specific export instructions.

CRITICAL: HRV measurements are NOT comparable across devices.
- WHOOP/Oura: report RMSSD (parasympathetic, short-term variability)
- Apple Watch: reports SDNN (total variability, different scale)
- Garmin: reports a composite "HRV Status" (7-day rolling)
Never mix HRV values from different devices in the same trend analysis.
-->

## Daily Metrics

| Date | Sleep (hr) | HRV (ms) | HRV Type | RHR (bpm) | Recovery | Strain/Activity | SpO2 (%) | Skin Temp (°F) | Notes |
|------|-----------|-----------|----------|-----------|----------|-----------------|----------|----------------|-------|
| | | | | | | | | | |

<!--
HRV Type: RMSSD | SDNN | composite (record which metric your device reports)
Recovery: device-specific score (e.g., WHOOP 0-100%, Oura "Optimal/Good/Pay Attention")
Strain: device-specific (e.g., WHOOP 0-21, Oura Activity Score, Garmin Body Battery)
Notes: illness, travel, alcohol, poor sensor contact, unusual day, etc.
-->
