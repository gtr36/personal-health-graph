# Nutrition — Integration Guide

Structured nutrition data: macro tracking exports, dietary phase records, and food-symptom context. One file per month.

## What belongs here vs the journal

This directory is for **structured** nutrition data: exports from tracking apps, deliberate dietary experiments with defined windows, and the food context that analysis skills correlate against symptoms and glucose. Casual dietary observations ("ate too much at the wedding") stay in `journal/` — they are already captured there and INTAKE will not move them.

If you do not track macros, this directory can still earn its place with just the Dietary Phases section: knowing you were doing a ketogenic experiment in March and higher-carb training fueling in June is exactly the context that makes lab trends and symptom patterns interpretable later.

## File naming

One file per month: `2026-08.md`, `2026-09.md`

## What to record

### If you track with an app
Weekly averages beat daily logs for the summary tier: average calories, protein, carbohydrates, fat, fiber, and alcohol per week. Archive the full daily export to `integrations/raw/nutrition/`.

### If you do not track
- **Dietary phases** — the framework you were following and when it changed
- **Notable deviations** — the week of travel eating, the elimination experiment
- **Food-symptom observations** — anything you noticed, with dates, so SYMPTOM_ANALYSIS can test it

## Data sources

- **Cronometer** — Settings, then Data Export (CSV; the most complete micronutrient data)
- **MyFitnessPal** — account data export from settings
- **MacroFactor** — in-app export
- Archive raw exports to `integrations/raw/nutrition/`

## Cross-referencing with PHG

- **Food-symptom correlation** — the classic use: SYMPTOM_ANALYSIS tests suspected trigger foods against the symptom log with actual dates instead of memory
- **Dietary phases + lab trends** — a lipid panel drawn mid-keto reads differently than one drawn during carb refeeding; phase context prevents misinterpretation
- **Meals + CGM** — paired with `integrations/cgm/`, this is the highest-resolution feedback loop in the system
- **Protein intake + training load** — recovery context for the wearable data
