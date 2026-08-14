---
schema_version: "0.3.0"
type: meta
created: 2026-08-14T10:00:00-06:00
updated: 2026-08-14T10:00:00-06:00
tags: [sample, demo, fictional]
---

# Sample Graph — Sam Rivera (Fictional Demo Patient)

**Everything in this directory is synthetic.** Sam Rivera is not a real person. Every lab value, genotype, symptom, provider, and journal entry was invented for demo and evaluation purposes. No real person's data is included, and any resemblance to a real person is coincidental.

## What this is

A fully populated Personal Health Graph for a fictional patient, built so you can:

1. **Demo the system** without exposing anyone's real health data.
2. **Evaluate an AI's analysis quality.** Several findings are deliberately planted in the data. They are recoverable by careful cross-file analysis but never stated outright. A strong analysis finds them; a shallow one misses them or invents patterns that are not there.

## The patient in one paragraph

Sam Rivera, 38, software product manager in Denver. Mild hypertension on lisinopril since June 2025. Father had an MI at 52, so Sam started a statin in January 2026 for primary prevention. Recurring migraines, a WHOOP 4.0, labs through Quest and Function Health, 23andMe genetics, a supplement stack, and a habit of logging much more when anxious. The record runs June 2025 through August 2026.

## How to use it

Point your AI at this `sample/` directory and run any skill from `skills/`. Start with **BASELINE_REPORT**, then try SYMPTOM_ANALYSIS, RISK_ASSESSMENT, SUPPLEMENT_REVIEW, and PATTERN_DETECTION. The file layout mirrors the real graph structure, so every skill's `reads:` list resolves the same way (treat `sample/` as the graph root).

## Spoiler warning

`ANSWER_KEY.md` lists every planted finding and what a strong analysis should surface. **Do not give ANSWER_KEY.md to the AI before running an analysis if you want a fair test.** Run the skill first, then score the output against the key.

## Contents

```
sample/
├── README.md                    ← you are here
├── ANSWER_KEY.md                ← SPOILERS: the planted findings, as an eval rubric
├── PROFILE.md
├── MEDICATIONS.md
├── SUPPLEMENTS.md
├── PROTOCOLS.md
├── LABS_HISTORY.md
├── GENETICS.md
├── DOCTOR_QS.md
├── EXPERIMENTS.md               ← N-of-1 experiment log (one completed, one active)
├── TIMELINE.md                  ← chronological event spine, June 2025 to August 2026
├── symptoms/                    ← 2026-02 through 2026-07
├── journal/                     ← 2026-05 through 2026-07
└── integrations/
    ├── labs/                    ← three panels: Quest, Function Health, Quest
    ├── wearable_daily/          ← WHOOP monthly summaries, 2026-03 through 2026-07
    ├── vitals/                  ← home BP and weight, 2026-06 and 2026-07
    └── assessments/             ← two GAD-7 administrations
```

Directories that exist in a real graph but are intentionally absent here: `inbox/`, `reports/`, `integrations/raw/`, and the integration types Sam does not use (cgm, microbiome, imaging summaries, and so on). Raw exports referenced in frontmatter (`source_file:` fields) are not included.

## Notes for eval use

- Internal consistency is deliberate: symptom timestamps line up with wearable entries, LABS_HISTORY matches the panel files to the digit, and medication start dates match the visit log and protocol change log. If your AI reports a contradiction, it is probably hallucinating.
- Logging density varies on purpose (May 2026 is dense, June is sparse). That is part of the eval.
- Every file carries a fictional-data marker in an HTML comment near the top.
