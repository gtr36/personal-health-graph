---
schema_version: "0.2.0"
type: integration
tier: summary
period: # YYYY-MM
source: # e.g., Omron Connect, Withings, Apple Health, KardiaMobile, manual
tags: [vitals, blood-pressure, weight, YYYY-MM]
---

# Home Vitals — [Month Year]

## Blood Pressure

<!-- Protocol note: [e.g., "seated, morning, before caffeine and medication"] -->

| Date | Time | Systolic | Diastolic | Pulse | Context |
|------|------|----------|-----------|-------|---------|
| | | | | | |

**Monthly summary:** <!-- mean sys/dia, range, number of readings, trend vs prior month -->

## Weight & Body Composition

| Date | Weight | Body Fat % | Notes |
|------|--------|-----------|-------|
| | | | |

**Monthly summary:** <!-- trend vs prior month -->

## ECG Events

| Date | Device | Classification | Duration | Symptoms at time | Notes |
|------|--------|---------------|----------|------------------|-------|
| | | | | | |

## Spot Checks

| Date | Measurement | Value | Context |
|------|-------------|-------|---------|
| | <!-- SpO2, temp, glucose --> | | |

## Linked Files
<!-- - MEDICATIONS.md → medication changes relevant to BP or weight this month -->
<!-- - integrations/wearable_daily/YYYY-MM.md → resting HR and HRV context -->
<!-- - DOCTOR_QS.md → readings queued for provider discussion -->
