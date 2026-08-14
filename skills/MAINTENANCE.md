---
schema_version: "0.1.0"
type: skill
name: Maintenance
description: Periodic review and auto-update of the Personal Health Graph. Audits file staleness, validates cross-references, updates derived data, identifies new data to import, and keeps the system current.
reads:
  - "**all files**"
connectors_optional:
  - Gmail (detect new lab results, provider messages)
  - Google Calendar / Fantastical (upcoming appointments → trigger DOCTOR_PREP)
  - Apple Reminders (create follow-up reminders)
  - Granola (detect new health-related meetings → trigger MEETING_TO_PROTOCOL)
  - Linear (create/update issues for maintenance tasks)
frequency: weekly recommended, monthly minimum
trigger: scheduled or on-demand
output: maintenance report + updated files + queued actions
saves_to: reports/maintenance_YYYY-MM-DD.md
---

# Skill: Maintenance

## Purpose
Keep the Personal Health Graph current without requiring the user to manually audit 30+ files. This skill is designed to run on a recurring schedule (weekly or monthly) or on-demand. It reads every file, identifies what's stale or incomplete, makes safe auto-updates where possible, and surfaces everything else as a concise action list.

A health graph that's 6 months out of date is worse than no health graph at all — it gives false confidence. This skill prevents that.

## When to use
- **Weekly (recommended):** Quick check. Takes 2-3 minutes. Catches stale data, flags upcoming retest dates, reminds about logging gaps.
- **Monthly:** Deeper audit. Reviews all cross-references, recalculates expense totals, identifies emerging data gaps.
- **After a health event:** New lab results, doctor visit, medication change, new diagnosis, supplement stack change.
- **Before running a major analysis skill:** Run MAINTENANCE first to ensure MASTER_ANALYSIS, HEALTH_MEMO, or RISK_ASSESSMENT are working with current data.

## Instructions for LLM

### Phase 1: File Staleness Audit

Read every file's frontmatter (specifically `updated` timestamps and entry dates). Build a staleness report:

**Staleness thresholds:**

| File / Directory | Fresh | Aging | Stale | Critical |
|-----------------|-------|-------|-------|----------|
| PROFILE.md | < 90 days | 90-180 days | 180-365 days | > 365 days |
| MEDICATIONS.md | < 90 days | 90-180 days | 180-365 days | > 365 days |
| SUPPLEMENTS.md | < 30 days | 30-90 days | 90-180 days | > 180 days |
| PROTOCOLS.md | < 60 days | 60-180 days | 180-365 days | > 365 days |
| LABS_HISTORY.md | < 90 days | 90-180 days | 180-365 days | > 365 days |
| GENETICS.md | < 365 days | 1-2 years | 2-3 years | > 3 years* |
| symptoms/ | < 7 days | 7-30 days | 30-90 days | > 90 days |
| journal/ | < 7 days | 7-30 days | 30-90 days | > 90 days |
| integrations/wearable_daily/ | < 7 days | 7-30 days | 30-60 days | > 60 days |
| integrations/healthkit/ | < 7 days | 7-30 days | 30-60 days | > 60 days |
| integrations/labs/ | < 90 days | 90-180 days | 180-365 days | > 365 days |
| integrations/assessments/ | < 45 days | 45-90 days | 90-180 days | > 180 days |
| integrations/cycle/ | < 45 days | 45-90 days | 90-180 days | > 180 days |
| integrations/vitals/ | < 30 days | 30-90 days | 90-180 days | > 180 days |
| integrations/cgm/ | (wear-period based — flag only if a wear period ended > 6 months ago with no note) | | | |
| integrations/nutrition/ | < 30 days | 30-90 days | 90-180 days | > 180 days |
| integrations/microbiome/ | < 1 year | 1-2 years | 2-3 years | > 3 years |
| integrations/imaging/ | < 1 year | 1-2 years | 2-3 years | > 3 years |
| DOCTOR_QS.md | < 30 days | 30-90 days | 90-180 days | > 180 days |
| EXPENSES.md | < 90 days | 90-180 days | 180-365 days | > 365 days |

*Genetics data doesn't go stale in the same way — your genotype doesn't change. But interpretation evolves as new research is published. Re-running MASTER_ANALYSIS Phase 2 annually can surface new clinically significant findings from the same raw data.

**For each stale or critical file, note:**
- Last updated date
- What specific data might have changed
- Recommended action (update, verify, reimport)

### Phase 2: Cross-Reference Validation

Check that cross-references between files are consistent:

**2A: Supplement ↔ Lab concordance**
- Every supplement in SUPPLEMENTS.md with a "Linked labs" field → verify those biomarkers exist in LABS_HISTORY.md
- Every supplement with a "Linked genetics" field → verify those variants exist in GENETICS.md
- Flag: supplements that have been active > 90 days with no linked lab marker being tracked

**2B: Medication ↔ Pharmacogenomics**
- Every medication in MEDICATIONS.md (Active and PRN) → check against pharmacogenomic data in GENETICS.md
- Flag: medications without PGx review, especially CYP2D6/CYP2C19/CYP2C9 substrates
- Flag: medications with a "Linked labs" safety marker (e.g., ALT for hepatically cleared drugs) that has no recent value in LABS_HISTORY.md

**2C: Protocol Changes Log ↔ Lab Timeline**
- Protocol changes in PROTOCOLS.md → check whether relevant labs were drawn before and after the change
- Flag: protocol changes with no follow-up lab validation (e.g., "Started high-dose Vitamin D in January, no 25-OH recheck scheduled")

**2D: DOCTOR_QS.md ↔ Visit History**
- Questions marked as queued → have they been asked? (check visit log for subsequent visits)
- Action items from prior visits → have they been completed?
- Flag: questions queued for > 90 days without a visit, overdue follow-ups

**2E: EXPENSES.md ↔ SUPPLEMENTS.md**
- Supplements active in SUPPLEMENTS.md → do they appear in EXPENSES.md?
- Cost per month in EXPENSES.md → does it match the individual costs in SUPPLEMENTS.md?
- Flag: discrepancies, missing items

### Phase 3: Data Completeness Check

Compare current state against the BASELINE_REPORT data completeness framework:

- Has the data completeness score improved since last maintenance run?
- Are there critical gaps that were flagged in the last BASELINE_REPORT that are still unresolved?
- Are there new data sources the user has mentioned (in journal/ or observations) that haven't been formally imported?

### Phase 4: Connector-Driven Updates (if connectors available)

**Gmail scan (if connected):**
- Search for new lab result notifications since last maintenance
- Search for provider messages that might contain action items
- Search for appointment confirmations (upcoming appointments to prep for)
- Flag: "I found 2 new lab result emails from Function Health. Want me to import them?"

**Calendar scan (if connected):**
- Check for upcoming medical appointments in the next 30 days
- Flag: "You have a cardiology appointment on [date]. Want me to run DOCTOR_PREP?"
- Check for overdue health events (lab draws, follow-ups that should have happened)

**Granola scan (if connected):**
- Check for recent health-related meetings that haven't been processed through MEETING_TO_PROTOCOL
- Flag: "I found a meeting with Dr. [Name] on [date] that hasn't been captured. Want me to process it?"

### Phase 5: Safe Auto-Updates

The following updates can be made automatically (without user confirmation):

- **Frontmatter timestamps:** Update `updated` fields on any file modified during this maintenance run
- **Entry counts:** Recalculate `entry_count` in log file frontmatter
- **MANIFEST.md:** Update `file_count` if new files have been added
- **EXPENSES.md:** Recalculate monthly totals from SUPPLEMENTS.md if individual supplement costs are documented

All other updates require user confirmation before execution.

### Phase 6: Generate Maintenance Report

```
# PHG Maintenance Report
**Date:** [date]
**Frequency:** [weekly / monthly / ad hoc]
**Last maintenance:** [date of prior run, or "first run"]

---

## File Health Dashboard

| File | Status | Last Updated | Action Needed |
|------|--------|-------------|---------------|
[One row per file/directory — status: ✅ Fresh, ⚠️ Aging, 🔴 Stale, ⛔ Critical]

**Overall health score:** [X / 10] (based on proportion of files that are Fresh or Aging)

---

## Cross-Reference Issues
[List any broken or inconsistent cross-references found in Phase 2]

## Data Gaps
[Gaps identified that would meaningfully improve analysis quality]

## Connector Findings
[New data detected via Gmail, Calendar, Granola — if connectors available]

---

## Action Items

### Auto-completed (no action needed)
- [List any safe auto-updates performed]

### Quick updates (< 5 min each)
- [Things the user can update quickly — e.g., "Verify supplement stack is still current"]

### Data imports needed (15-60 min)
- [New lab results to import, wearable data to export, etc.]

### Analysis recommended
- [Skills that should be re-run based on new data or staleness — e.g., "RISK_ASSESSMENT hasn't been run since new lipid panel was added"]

### Upcoming triggers
- [Appointments in the next 30 days that should trigger DOCTOR_PREP]
- [Lab retest dates approaching]
- [Supplement reorder dates approaching]

---

## Recommended Next Maintenance
**Date:** [1 week from now for weekly, 1 month for monthly]
**Priority items for next run:** [anything deferred from this run]
```

## Scheduling this skill

### In Claude (Cowork mode)
This skill can be set up as a scheduled task that runs automatically:
- Weekly quick audit (Phase 1 + Phase 6 summary only)
- Monthly deep audit (all phases)
- Trigger on specific events (new file detected in integrations/)

### In any LLM
Paste this skill and say: "Run a maintenance check on my Personal Health Graph." The LLM will read all files and produce the report.

### Calendar reminder approach
If scheduling isn't available, create a recurring calendar event:
- Weekly: "PHG Quick Check" — open your LLM, paste MAINTENANCE.md, review the report
- Monthly: "PHG Deep Audit" — same, but allocate 30 minutes for follow-up actions

## Important notes
- **This skill reads everything.** It needs access to all PHG files to do its job. If running in a context-limited environment, prioritize: PROFILE.md, SUPPLEMENTS.md, LABS_HISTORY.md, PROTOCOLS.md, DOCTOR_QS.md.
- **Don't over-maintain.** Weekly is enough for most people. The goal is to prevent decay, not to create busywork. If all files are Fresh and no cross-reference issues exist, the report should say: "Everything looks good. No action needed."
- **The action items are the output.** A maintenance report that identifies 12 issues but the user never acts on them is worse than no report — it creates anxiety without progress. Keep the action list short and prioritized. Top 3 items, max.
- **Staleness ≠ error.** A GENETICS.md file that hasn't been updated in 11 months is Aging, not wrong. The genotype hasn't changed. But the interpretation might benefit from a refresh.
- **First maintenance run doubles as a quality check.** After initial setup via QUICKSTART, running MAINTENANCE immediately catches any data quality issues from the onboarding process.
