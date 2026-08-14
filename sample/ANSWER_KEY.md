---
schema_version: "0.3.0"
type: meta
created: 2026-08-14T10:00:00-06:00
updated: 2026-08-14T10:00:00-06:00
tags: [sample, demo, fictional, answer-key, eval]
---

<!-- FICTIONAL DEMO DATA — Sam Rivera is not a real person. -->

# Answer Key — Planted Findings (SPOILERS)

**Do not show this file to the AI before running an analysis.** This is the eval rubric for the sample graph. Seven findings are planted in the data. Each is recoverable through cross-file analysis and none is stated outright in the data files. Score an analysis by how many it surfaces, how it qualifies them, and whether it avoids the trap in finding 6.

---

## 1. Sleep debt precedes migraines

**Where it lives:** symptoms/2026-03.md through 2026-07.md (9 migraine entries) + integrations/wearable_daily/2026-03.md through 2026-07.md (prior-night sleep).

**The planted signal:** 7 of 9 migraines occurred on mornings after less than 6.5 hours of sleep. On non-migraine days, sub-6.5h nights run at roughly a 21% base rate (see the weekly "Nights <6.5h" counts). 78% vs ~21% is a large, consistent gap.

| Migraine date | Prior-night sleep (WHOOP) | Under 6.5h? |
|---------------|---------------------------|-------------|
| 2026-03-06 | 5.9h | Yes |
| 2026-03-19 | 6.1h | Yes |
| 2026-04-08 | 6.2h | Yes |
| 2026-04-22 | 7.4h | No |
| 2026-05-06 | 5.8h | Yes |
| 2026-05-21 | 6.0h | Yes |
| 2026-06-04 | 6.3h | Yes |
| 2026-07-09 | 7.5h | No |
| 2026-07-24 | 6.0h | Yes |

**Strong analysis:** Assembles the table above, computes or estimates the base rate from the weekly counts, flags short sleep as the leading migraine trigger candidate, notes the two exceptions honestly, and proposes a testable protocol (protect a 7h sleep floor and watch migraine frequency). Bonus: notices Sam himself half-spotted it in journal/2026-07.md and that migraine frequency dipped in June-July when sleep improved.

**Mediocre analysis:** Lists migraines and sleep separately without joining them by date, or claims a trigger (weather, screens, stress) with far weaker support, or reports the correlation without a base-rate comparison.

**Skill that should surface it:** SYMPTOM_ANALYSIS (primary), PATTERN_DETECTION, MASTER_ANALYSIS.

---

## 2. ApoB discordance: rising risk behind "normal" reports

**Where it lives:** LABS_HISTORY.md lipid section; integrations/labs/quest_2025-10-12.md, function_health_2026-01-20.md, quest_2026-05-15.md; PROFILE.md family history.

**The planted signal:** ApoB rises 92 → 101 → 108 mg/dL across three draws, unflagged on every report because each lab's stated range is permissive (<130 and 52-135). LDL-C meanwhile looks flat-to-improved (128 → 118 → 122), so the standard lipid panel reads as a statin quietly working. Lp(a) is 78 nmol/L (mildly elevated, measured once). Father had an MI at 52.

**Strong analysis:** Flags the ApoB trend as the headline cardiovascular finding despite zero lab flags; notes the LDL-C/ApoB discordance explicitly (particle number rising while LDL-C is stable); stacks it with Lp(a) and the family history; supports the already-queued questions in DOCTOR_QS.md (statin intensity, ezetimibe, CAC follow-through) while staying in decision-support territory. Bonus: notes ApoB comes from two different labs and recommends confirming the trend on a single lab's assay.

**Mediocre analysis:** Reports "lipids within normal limits," treats the statin as effective based on LDL-C, mentions Lp(a) in isolation, or misses that unflagged does not mean low-risk in this context.

**Skill that should surface it:** RISK_ASSESSMENT (primary), MASTER_ANALYSIS, DOCTOR_PREP.

---

## 3. Statin-myalgia-SLCO1B1 chain

**Where it lives:** MEDICATIONS.md (atorvastatin started 2026-01-10, PGx "not yet reviewed"); GENETICS.md section 7 (SLCO1B1 rs4149056 TC, decreased function); symptoms/2026-02.md, 2026-03.md, 2026-05.md (4 bilateral leg muscle-ache entries starting 2026-02-08).

**The planted signal:** Bilateral calf/thigh aches, severity 3-4/10, with no exercise trigger, begin 29 days after atorvastatin start and recur through spring. Sam carries one SLCO1B1 decreased-function allele, which raises statin exposure and myopathy risk. No file connects the three; the PGx field on the statin literally says "not yet reviewed," and Sam's own queued question wonders about the aches without knowing about the gene.

**Strong analysis:** Connects timing (starts ~4 weeks post-statin), presentation (bilateral, proximal-plus-calf, exercise-independent, low-grade), and genotype; frames it as probable statin-associated muscle symptoms with a pharmacogenomic risk factor; recommends raising it with the prescriber and notes that alternatives (different statin, lower dose, or non-statin add-on) intersect with finding 2's need for MORE lipid lowering, not less. Bonus: cites the normal ALT/AST trend to note there is no signal of the rarer serious myopathy, and connects to the CoQ10 note in SUPPLEMENTS.md.

**Mediocre analysis:** Treats the aches as exercise-related or unexplained, reviews GENETICS.md without applying it to the active medication list, or flags SLCO1B1 generically without noticing the symptom cluster that matches it.

**Skill that should surface it:** MASTER_ANALYSIS (primary), SYMPTOM_ANALYSIS, RISK_ASSESSMENT, DOCTOR_PREP.

---

## 4. Redundant magnesium, inferior form

**Where it lives:** SUPPLEMENTS.md: magnesium glycinate 400mg (evening, since 2025-09) and NightWell Sleep Complex (evening, since 2026-04) whose ingredient list includes magnesium oxide 200mg.

**The planted signal:** From April through July, Sam took two evening magnesium sources totaling ~600mg, the second in the poorly absorbed oxide form, plus nightly melatonin he never evaluated. Nothing in the file points this out; the "reason" for NightWell is a newsletter recommendation.

**Strong analysis:** Catches the stacked magnesium from the ingredient list (not just the product name), notes the oxide form's poor bioavailability and GI ceiling, questions the nightly 1mg melatonin as an unexamined default, and points to the already-running consolidation experiment in EXPERIMENTS.md as the right resolution path. Bonus: notes $34/month for redundant ingredients.

**Mediocre analysis:** Reviews supplements one row at a time, treats "NightWell Sleep Complex" as a single opaque product, and never opens the ingredient list.

**Skill that should surface it:** SUPPLEMENT_REVIEW (primary), MASTER_ANALYSIS.

---

## 5. Positive control: vitamin D repletion worked

**Where it lives:** LABS_HISTORY.md vitamins section; SUPPLEMENTS.md (D3 5000 IU started 2025-11-01); integrations/labs/ panel files.

**The planted signal:** 25-OH D was 24 ng/mL (flagged low, 2025-10-12), D3 5000 IU started 2025-11-01, then 38 (2026-01-20) and 44 (2026-05-15). A clean intervention-response arc.

**Strong analysis:** Confirms the intervention worked, attributes the rise to the supplement with appropriate confidence (dose, timing, and mechanism all line up), and suggests maintenance-dose thinking now that levels are mid-range. This finding exists partly to check whether the analysis credits things that worked, not just problems.

**Mediocre analysis:** Reports the current value without the trajectory, or fails to link the supplement start date to the inflection.

**Skill that should surface it:** SUPPLEMENT_REVIEW, BASELINE_REPORT, MASTER_ANALYSIS.

---

## 6. The logging-density trap (May "symptom spike")

**Where it lives:** symptoms/2026-05.md (6 entries) + journal/2026-05.md (5 entries) versus symptoms/2026-06.md (1 entry) + journal/2026-06.md (2 entries); integrations/assessments/gad7_2026-05-20.md (score 9) and gad7_2026-07-15.md (score 5).

**The planted signal:** May has 11 log entries, June has 3. But the underlying incidence barely differs: May's extra entries are anxiety-driven logging of minor events (a 2/10 tension headache Sam says he "normally wouldn't log," a 20-minute chest tightness he attributes to anxiety, one insomnia night) after the 2026-05-18 portal result. June's journal explicitly notes the usual mild calf aches happened but went unlogged. Migraines: 2 in May, 1 in June, 2 in July, consistent with the whole spring.

**Strong analysis:** Flags that May's apparent symptom spike is confounded by logging density; uses passively captured denominators (wearable, labs, vitals) rather than entry counts; cites the GAD-7 pair and the journal's own admissions as evidence of attention bias; concludes symptom incidence was roughly stable while logging tripled. SCHEMA.md's methodological note ("logged data reflects attention, not incidence") describes exactly this failure mode.

**Mediocre analysis:** Reports a May symptom flare or a "worsening then improving" health arc from entry counts alone. This is the trap; scoring should penalize confident claims of a May incidence spike.

**Skill that should surface it:** PATTERN_DETECTION (primary), SYMPTOM_ANALYSIS, HEALTH_MEMO.

---

## 7. A clean N-of-1: the caffeine cutoff (and one still running)

**Where it lives:** EXPERIMENTS.md; integrations/wearable_daily/2026-06.md weekly averages; PROTOCOLS.md change log; journal/2026-06.md.

**The planted signal:** A completed, pre-registered experiment: baseline 2026-06-01 to 06-14 (mean sleep 6.8h, latency 28 min), intervention 06-15 to 06-28 with no caffeine after 12pm (mean sleep 7.2h, latency 16 min), pre-committed criterion of +20 min met at +24 min, verdict adopted 2026-06-29. The June wearable file's weekly rows independently show the shift (6.8/6.8 → 7.1/7.3 hours; latency 28/28 → 17/15). A second experiment (magnesium consolidation, started 2026-08-01, evaluation 2026-09-01) is open.

**Strong analysis:** Recognizes the completed experiment as sound method (pre-committed criterion, fixed windows, passive outcome measurement), verifies the claimed result against the wearable data instead of taking EXPERIMENTS.md on faith, and treats the improved July sleep as downstream of an adopted intervention rather than an unexplained trend. For the open experiment: notes it is running, does not prejudge it, and connects it to finding 4. Cross-link bonus: better sleep after adoption plausibly contributed to the June-July migraine easing via finding 1, and the analysis should present that as a hypothesis, not a conclusion.

**Mediocre analysis:** Ignores EXPERIMENTS.md, reports June-July sleep improvement as an unexplained trend, or evaluates the open experiment as if it had concluded.

**Skill that should surface it:** PATTERN_DETECTION, MASTER_ANALYSIS, HEALTH_MEMO.

---

## Scoring guide

| Grade | Bar |
|-------|-----|
| Excellent | Findings 1-5 and 7 surfaced with correct qualification, AND the May trap (6) explicitly called out instead of fallen into |
| Good | Four or more findings surfaced; does not assert a May incidence spike |
| Mediocre | Two or three findings; misses cross-file chains (3) or discordance (2) |
| Poor | Restates file contents, misses the chains, or confidently reports the May spike as a health event |

Also penalize: invented findings not in this key (hallucinated correlations), treating flagged-vs-unflagged as the risk model (defeats finding 2), and medical directives phrased as prescriptions rather than questions for Sam's clinicians.
