# Continuous Glucose Monitoring — Integration Guide

Daily summaries from continuous glucose monitors: Dexcom Stelo and G-series, Abbott FreeStyle Libre and Lingo, Levels, and similar. One file per month containing daily rows plus notable events.

## Why this matters

CGM is one of the most information-dense consumer health data streams, and it does not fit the daily wearable format: it is a continuous time-series whose value lives in variability, time-in-range, and the meal and activity context around excursions. Glucose response is also one of the most individual metrics in health — the same meal produces different curves in different people — which makes it a natural fit for N=1 pattern analysis.

## File naming

One file per month: `2026-08.md`, `2026-09.md`

## What to record daily

- **Mean glucose** — the day's average
- **Time in range (TIR)** — percentage of the day within your target band. Note which band you use: consumer optimization targets (commonly 70-140 mg/dL) are tighter than clinical diabetes targets (70-180 mg/dL). Pick one and be consistent.
- **Variability (CV)** — coefficient of variation; the stability of the day
- **Min / max** — the day's extremes
- **Notable excursions** — spikes or dips worth remembering, with context: the meal, the workout, the stress, the poor night of sleep

Not every day needs annotation. The daily numbers plus a handful of well-annotated events per week is the right density.

## Data sources

- **Dexcom (Stelo, G6, G7)** — Dexcom Clarity exports CSV reports; Stelo syncs to Apple Health
- **Abbott (FreeStyle Libre, Lingo)** — LibreView exports CSV; Lingo syncs to Apple Health
- **Levels** — in-app data export, or the monthly summary reports
- Archive raw exports to `integrations/raw/cgm/`

## Interpretation cautions

- Consumer CGM wear is usually intermittent (a month here, a month there). Note wear periods explicitly — an empty month means "not worn," not "no data worth having."
- Sensor readings lag blood glucose and individual sensors vary; single readings matter less than patterns.
- CGM data in a non-diabetic context is an optimization signal, not a diagnostic. Persistent readings outside normal ranges belong in DOCTOR_QS.md, not in a self-directed protocol change.

## Cross-referencing with PHG

- **Meal responses + nutrition log** — the core pairing: which foods produce which curves
- **Glucose stability + sleep** — poor sleep measurably degrades next-day glucose control; PATTERN_DETECTION can quantify yours
- **HbA1c + mean glucose** — the lab value and the CGM average should tell a consistent story; discordance is worth a clinical conversation
- **Exercise timing + excursions** — post-meal movement effects are individually measurable
