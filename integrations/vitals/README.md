# Home Vitals — Integration Guide

Home-measured vital signs: blood pressure, weight and body composition, ECG events, SpO2, temperature, and glucose spot checks. One file per month containing dated readings.

## Why this matters

Blood pressure is a required input for every cardiovascular risk calculator the RISK_ASSESSMENT skill runs, yet it is the measurement most often missing from personal health data — a single reading from an annual physical is not a baseline. Home measurements, taken consistently, produce the trend data that makes risk assessment meaningful. The same applies to weight trend (metabolic context), resting ECG events (rhythm context), and morning SpO2 (sleep-quality context).

## File naming

One file per month: `2026-08.md`, `2026-09.md`

## What to track

### Blood pressure (the priority)
- Measure seated, rested for 5 minutes, arm supported, correct cuff size
- Same time of day when possible (morning before caffeine and medication is the common protocol; note your own)
- Record systolic, diastolic, and pulse; note context when a reading is unusual (stress, poor sleep, caffeine)
- Two readings a week beats thirty readings one week and none for three months

### Weight and body composition
- Smart-scale exports (Withings, Renpho, Eufy) or manual entries
- Weight trend matters more than any single reading; log weekly averages if daily noise bothers you
- Body fat percentage from consumer scales is imprecise; track its trend, not its absolute value

### ECG events
- Apple Watch or KardiaMobile recordings: date, device classification (sinus rhythm, AFib detected, inconclusive), duration, symptoms at the time
- Any non-sinus classification belongs in DOCTOR_QS.md as well

### Spot checks
- SpO2, temperature, fingerstick glucose — date, value, context

## Data sources

- **Omron Connect** — export readings as CSV from the app
- **Withings Health Mate** — Settings, then download your data
- **QardioArm** — export from the Qardio app
- **Apple Health** — BP and weight from connected devices flow into HealthKit; the full export includes them
- **KardiaMobile** — email or export PDFs of ECG recordings; archive to `integrations/raw/vitals/`

## Cross-referencing with PHG

- **BP trend + RISK_ASSESSMENT** — replaces the single-reading guess with a real baseline
- **BP + medication changes** — MEDICATIONS.md start/stop dates against BP trend is a core efficacy check
- **Weight trend + nutrition and protocol changes** — PATTERN_DETECTION correlates across all three
- **Morning SpO2 + sleep data** — persistent low morning readings alongside poor sleep metrics is worth a clinical conversation
