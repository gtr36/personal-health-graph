---
schema_version: "0.3.0"
type: skill
name: Experiment
description: Design, monitor, and evaluate N-of-1 self-experiments with pre-committed criteria. Converts hypotheses from analysis skills into structured tests logged in EXPERIMENTS.md.
reads:
  - EXPERIMENTS.md
  - TIMELINE.md (for scheduling around other changes)
  - PROTOCOLS.md
  - SUPPLEMENTS.md
  - MEDICATIONS.md
  - symptoms/*.md
  - journal/*.md
  - integrations/wearable_daily/*.md
  - integrations/vitals/*.md
  - integrations/cgm/*.md
  - LABS_HISTORY.md
writes:
  - EXPERIMENTS.md (new designs; status and result fields on evaluation)
  - PROTOCOLS.md (protocol changes log entry when a verdict changes a protocol)
default_range: per experiment
output_format: experiment design, status check, or evaluation report
saves_to: reports/experiment_[name]_YYYY-MM-DD.md (evaluations only)
---

# Skill: Experiment

## Purpose

Every PHG analysis skill ends with testable hypotheses. This skill is what catches them. It turns "you get migraines more often after short sleep" into a designed test with a baseline, one changed variable, a pre-committed success criterion, and a scheduled evaluation that cannot move its own goalposts.

This is the strongest available answer to the honest objection that N=1 data cannot support causal claims. Pre-registered single-subject designs with defined windows and, where feasible, reversal are legitimate methodology. What makes them legitimate is the discipline this skill enforces: the criteria are written down before the intervention starts, and the evaluation happens against those criteria and no others.

## Three modes

Infer the mode from the request.

### Mode 1: Design

Input: a hypothesis, from the user or from a prior analysis report.

1. **Sharpen the hypothesis until it is falsifiable.** "Magnesium helps my sleep" becomes "Consolidating to a single 400mg magnesium glycinate dose changes mean sleep duration or sleep latency by a measurable amount within 4 weeks." If the user's hypothesis contains multiple variables, split it into sequential experiments and say so.
2. **Choose the outcome metric and its source.** The metric must be something already captured passively (wearable, vitals, CGM, labs) or cheaply loggable. An experiment whose outcome depends on new manual logging effort will die of friction; flag that risk if it exists.
3. **Establish the baseline.** Compute the current value of the outcome metric from existing data. Minimum baseline window: 14 days for daily metrics, or per the PATTERN_DETECTION minimum-data table for the pattern type. If existing data cannot support a baseline, the first phase of the experiment is collecting one.
4. **Design the windows.** Baseline, intervention, and, where feasible, reversal (return to baseline conditions). Reversal is the strongest causal evidence available at N=1; when it is not feasible (irreversible interventions, safety), say why in the design.
5. **Pre-commit the criteria.** Success criterion with an actual number. Kill criterion for early termination (adverse symptoms, unacceptable disruption). Evaluation date.
6. **Check the calendar.** Read TIMELINE.md and EXPERIMENTS.md for conflicts: no overlapping experiments touching the same outcome metric, no known confounding events (travel, medication changes) inside the windows if avoidable.
7. **Write the entry** to EXPERIMENTS.md (Active section, next EXP number) and confirm the start date with the user.

**Safety boundary:** this skill designs experiments on supplements, timing, sleep, exercise, and diet. It does not design experiments that start, stop, or change the dose of prescription medications. If the hypothesis involves a medication, the output is a set of questions for the prescriber (append to DOCTOR_QS.md), not an experiment.

### Mode 2: Status check

For each Active experiment: where is it in its window, is the data actually being captured, have any kill criteria triggered, is the evaluation date approaching. Flag experiments past their evaluation date as overdue. MAINTENANCE calls this mode.

### Mode 3: Evaluate

When an evaluation date arrives:

1. Compute the outcome metric for each window from the source data.
2. Compare against the pre-committed criterion. The criterion in the file is the only criterion; if the result is interesting in some other way, that observation seeds a new experiment, it does not rescue this one.
3. Inventory confounders that actually occurred during the windows (from journal, TIMELINE, wearable anomalies).
4. Verdict: confirmed, refuted, inconclusive, or aborted. Move the entry to Completed with result, verdict, and decision.
5. If the verdict changes a protocol, log the change in PROTOCOLS.md and note follow-up (e.g., a lab recheck if the intervention should move a biomarker).
6. Save the evaluation report.

## Output format (evaluation report)

```
## Experiment Evaluation: [EXP-NNN name]
Evaluated: [date]

**Hypothesis:** [as pre-registered]
**Pre-committed criterion:** [as written before start]

### Result
[Baseline value] → [intervention value] ([delta], vs criterion of [threshold])
[Reversal value if run]

### Verdict: [confirmed / refuted / inconclusive / aborted]
[2-3 sentences. The numbers against the criterion, nothing else.]

### Confounders that occurred
[What happened during the windows that could contaminate the result, or "none identified"]

### Decision
[What changes: adopt, drop, re-test with a better design]

### What a better version of this experiment would do
[Honest note on design weaknesses discovered in the running]
```

## Important notes

- **The pre-commitment is the product.** An experiment evaluated against criteria invented after seeing the data is a story, not a test. Never soften a criterion at evaluation time.
- **One variable.** If the user changed other things mid-window (new supplement, travel, illness), the verdict is inconclusive, not confirmed. Say so plainly.
- **Effect sizes over feelings.** Report the measured delta with its baseline variability context. A +10 minute sleep change against ±40 minute nightly variance over 14 nights is noise; say so.
- **Negative results are wins.** A refuted hypothesis that stops a $40/month supplement is one of the highest-ROI outputs this system produces. Present refutations with the same energy as confirmations.
- **This is not medical research.** Results inform personal decisions and clinical conversations. Anything involving prescription medications, symptoms of concern, or surprising results belongs in DOCTOR_QS.md for a professional.
