---
schema_version: "0.1.0"
type: skill
name: Health Memo
description: Amazon-style 6-pager health briefing. Narrative synthesis of all health data into a structured decision document with hypotheses, evidence, and action plan.
reads:
  - reports/health_memo_*.md (prior memos, for tracking what changed)
  - PROFILE.md
  - MEDICATIONS.md
  - LABS_HISTORY.md
  - GENETICS.md
  - SUPPLEMENTS.md
  - PROTOCOLS.md
  - symptoms/*.md
  - journal/*.md
  - integrations/labs/*.md
  - integrations/genetics/*.md
  - integrations/wearable_daily/*.md
  - integrations/healthkit/*.md
  - integrations/microbiome/*.md
  - integrations/imaging/*.md
  - integrations/assessments/*.md
  - integrations/cycle/*.md
  - integrations/vitals/*.md
  - integrations/cgm/*.md
  - integrations/nutrition/*.md
  - DOCTOR_QS.md
  - EXPENSES.md
default_range: all available data
output_format: narrative memo (6-page equivalent)
saves_to: reports/health_memo_YYYY-MM-DD.md (also .docx or .pdf)
---

# Skill: Health Memo

## Purpose
Generate a comprehensive narrative health briefing modeled after the Amazon 6-pager format: a structured, data-dense document written in complete prose (no bullet points in the body) that synthesizes all available health data into a coherent story. The memo should be the kind of document you could hand to a new physician, a health advisor, or a trusted friend and they would understand your complete health picture without asking follow-up questions.

## When to use
- Annual or semi-annual health review
- Before a major health decision (starting a new intervention, changing providers, considering a procedure)
- When onboarding a new physician or health advisor
- When you want to step back and see the full picture rather than individual data points

## Design principles
- **Narrative, not tabular.** The body of the memo is written in complete paragraphs. Data is woven into the narrative, not dumped in tables. Tables are reserved for appendices.
- **Hypothesis-driven.** Each section advances a claim supported by evidence from the data. Not a data dump — a story.
- **Calibrated confidence.** Every major claim is tagged with a confidence level and the reasoning behind it.
- **Decision-oriented.** The memo ends with specific decisions to make, not vague observations.

## Instructions for LLM

### Step 1: Full data inventory
Read all available files. Before writing anything, build an internal inventory:
- Data range (earliest to most recent entry across all sources)
- Data density (which sources have rich data, which are sparse)
- Major inflection points (supplement starts/stops, protocol changes, new diagnoses, imaging milestones)
- Unresolved questions (from DOCTOR_QS.md, journal entries, prior analyses)

### Step 2: Identify the 4-6 most important themes
Do not try to cover everything. Identify the themes that:
- Have the strongest evidence base (multiple data sources converging)
- Have the highest clinical significance (affect health trajectory)
- Are the most actionable (something can be done about them)
- Represent the most meaningful changes since the last memo (if one exists)

### Step 3: Generate the memo

#### Format
```
# Health Memo

**Subject:** [Name], [Age], [Sex]
**Date:** [date]
**Data range:** [first entry] to [most recent]
**Prepared by:** Personal Health Graph (AI-generated from structured health files)
**Version:** [1.0 or increment if prior memo exists]

---

## Executive Summary
[One paragraph. Maximum 150 words. The single most important thing a reader should take away from this memo. Written for someone who will only read this section.]

---

## Section 1: [Theme Title]

[2-4 paragraphs of narrative prose. Each paragraph advances the argument with specific data points cited inline — dates, values, trends. No bullet points. The writing should feel like a well-constructed case study, not a lab report.]

**Confidence:** [High / Medium / Low] — [One sentence explaining why this confidence level.]

**Key question:** [The single most important unresolved question related to this theme.]

---

## Section 2: [Theme Title]
[Same structure as Section 1]

---

## Section 3: [Theme Title]
[Same structure]

---

## Section 4: [Theme Title]
[Same structure]

---

## [Optional: Sections 5-6 if warranted by the data]

---

## What's Working
[1-2 paragraphs on interventions, habits, or protocols that the data suggests are producing positive outcomes. Be specific — cite the evidence.]

## What's Not Working or Unclear
[1-2 paragraphs on interventions, habits, or areas where the data is ambiguous, concerning, or suggests no effect. Distinguish between "not working" and "insufficient data to evaluate."]

## Open Questions
[Numbered list of the 5-10 most important unresolved questions, each with a brief note on what data or action would resolve it.]

## Decision Register
[A table of specific decisions to be made, with the relevant evidence summary and a recommended action.]

| Decision | Evidence Summary | Recommended Action | Priority |
|----------|------------------|--------------------|----------|
| | | | |

## Appendix A: Data Sources
[Complete list of every file read to produce this memo, with date ranges.]

## Appendix B: Key Metrics at a Glance
[THIS is where tables go. Summary tables of: recent labs (flagged values only), wearable averages, supplement stack, active protocols.]

## Appendix C: Comparison to Prior Memo
[If a prior memo exists: what changed, what resolved, what emerged, what was wrong in the prior memo.]
```

### Writing standards
- **Prose quality:** Write at the level of a well-edited case study in a medical journal's "Clinical Problem-Solving" series. Clear, precise, no filler.
- **Data citation:** When referencing a specific value, include the date and source. Example: "Vitamin D (25-OH) rose from 28 ng/mL (Feb 2026, Function Health) to 48 ng/mL (Aug 2026, Quest), consistent with the 5,000 IU daily supplementation started in January."
- **Confidence calibration:** High = multiple independent data sources converge, consistent over time, plausible mechanism. Medium = supported by data but with confounders, limited time window, or single data source. Low = suggestive pattern but insufficient data, or contradicted by some evidence.
- **No diagnosis.** The memo describes observations, patterns, and evidence-based hypotheses. It does not diagnose. Phrases like "consistent with," "suggestive of," and "warrants investigation for" are appropriate. "You have X" is not.
- **Intellectual honesty.** If the data doesn't support a conclusion, say so. If a prior hypothesis was wrong, say so. The memo's credibility depends on its willingness to say "I don't know" or "I was wrong."

### Important notes
- This is the highest-effort skill in Personal Health Graph. Read every file before writing.
- The memo should be readable in 15-20 minutes — roughly 2,500-4,000 words for the body (excluding appendices).
- If data is sparse (< 90 days, < 2 lab panels, no genetics), state this upfront and adjust the scope accordingly. A shorter, honest memo is better than a padded one.
- **Account for data-density bias.** Users log most heavily where they are most worried. Dense data in one area reflects attention, not necessarily incidence — weigh themes against logging density, and flag conclusions that may be artifacts of differential logging.
- Save the completed memo to `reports/health_memo_YYYY-MM-DD.md` (the `saves_to:` location). Reports always go in `reports/`, which the template's `.gitignore` protects from accidental commits. Never save reports to the repo root.
