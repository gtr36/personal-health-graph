---
schema_version: "0.1.0"
type: skill
name: Supplement Review
description: Evaluate current supplement stack efficacy against lab results, symptom trends, and protocol goals.
reads:
  - SUPPLEMENTS.md
  - GENETICS.md
  - integrations/labs/*.md
  - integrations/genetics/*.md
  - symptoms/*.md
  - journal/*.md
  - PROTOCOLS.md
  - PROFILE.md
  - integrations/wearable_daily/*.md
  - LABS_HISTORY.md
external_context:
  - Natural Medicines Database (evidence grades)
  - Examine.com (effect size summaries)
  - ConsumerLab (third-party testing, contamination reports)
  - PubMed / Cochrane Library (systematic reviews, RCTs)
default_range: 180 days (or since supplement start date, whichever is shorter)
output_format: efficacy assessment with keep/adjust/drop recommendations and evidence grades
saves_to: reports/supplement_review_YYYY-MM-DD.md (also .html)
---

# Skill: Supplement Review

## Purpose
Assess whether each active supplement is delivering measurable value based on available lab data, symptom trends, wearable metrics, and user observations. Recommend keep, adjust dose, or discontinue for each item.

## Instructions for LLM

### Step 1: Gather data
1. `SUPPLEMENTS.md` — full active stack with doses, start dates, reasons, linked labs
2. `integrations/labs/*.md` — all available lab panels, focusing on markers relevant to each supplement
3. `symptoms/*.md` — symptom entries for the review period, especially types the supplement targets
4. `journal/*.md` — user notes on perceived effects, side effects, or changes
5. `integrations/wearable_daily/*.md` — sleep, HRV, recovery trends for the review period
6. `PROTOCOLS.md` — to understand the user's goals and context for supplementation

### Step 2: Evaluate each supplement
For each active supplement, assess across six evidence dimensions:

**A. Genetic basis (from GENETICS.md):**
- Does the user carry a variant that creates a genetic rationale for this supplement?
- Example: MTHFR C677T heterozygous → methylfolate supplementation has a clear genetic basis
- Example: FADS1 TT → omega-3 supplementation addresses reduced endogenous synthesis
- If no genetic data available, note this as a gap, not a negative

**B. Lab evidence (from LABS_HISTORY.md and integrations/labs/):**
- Is there a relevant biomarker being tracked? (e.g., Vitamin D → 25-OH Vitamin D)
- Has the marker improved since the supplement was started?
- Is the marker at, above, or below the user's stated target?
- When was the marker last tested?
- Is the dose achieving the desired lab response? (e.g., 2,000 IU Vitamin D moved 25-OH from 28 to 35 — may need higher dose to reach 50+ target)

**C. Symptom evidence (from symptoms/):**
- What symptoms was this supplement intended to address?
- Have those symptoms improved, stayed the same, or worsened since starting?
- Are there symptom entries that correlate with missed doses?

**D. Wearable evidence (from integrations/wearable_daily/):**
- For sleep-related supplements (e.g., magnesium): has sleep quality, HRV, or recovery changed?
- For energy-related supplements: has daytime strain or workout performance changed?

**E. User observations (from journal/):**
- Has the user noted any perceived benefits or side effects?
- Has the user expressed doubt or satisfaction about this supplement?

**F. Published evidence (external context):**
For each supplement, assess the quality of the evidence supporting its use for the stated purpose:

**Evidence hierarchy (adapted from GRADE framework):**
- **Level A — Strong:** Supported by ≥ 2 well-designed RCTs or a systematic review/meta-analysis with consistent findings. Effect size is clinically meaningful.
- **Level B — Moderate:** Supported by 1 well-designed RCT, or multiple well-designed observational studies with consistent findings. Effect size is meaningful but may have limitations (small sample, short duration, surrogate endpoints).
- **Level C — Weak:** Supported only by observational studies, case series, mechanistic reasoning, or expert opinion. Effect may be real but evidence is insufficient to be confident.
- **Level D — Insufficient/Conflicting:** No published evidence for the specific use, or evidence is conflicting with no clear direction.

Assign each supplement a level and cite the basis. Example: "Vitamin D for 25-OH optimization: Level A — multiple RCTs confirm dose-response relationship (Bischoff-Ferrari 2006, Holick 2007)."

**Bioavailability and form assessment:**
- Is the user taking the optimal form? (e.g., ubiquinol vs. ubiquinone, methylfolate vs. folic acid, magnesium glycinate vs. oxide)
- Are absorption factors addressed? (fat-soluble vitamins taken with meals, mineral competition avoided, etc.)
- Note if the specific brand/form has third-party testing (NSF, USP, ConsumerLab verified)

**Interaction check:**
- Supplement-supplement interactions (e.g., calcium impairs iron and zinc absorption; vitamin C enhances iron absorption)
- Supplement-medication interactions (check PROFILE.md for active medications)
- Supplement-gene interactions from GENETICS.md (e.g., COMT slow metabolizer + methylfolate = potential overmethylation symptoms)
- Are any supplements redundant (targeting the same pathway at similar doses)?

### Step 3: Generate output

#### Format
```
## Supplement Review
Generated: [date]
Review period: [start] to [end]
Active supplements: [count]

### Stack Summary
[1-2 paragraph overview: what's working, what's unclear, what's potentially unnecessary]

### Per-Supplement Assessment

#### [Supplement Name] — [KEEP / ADJUST / DROP / INSUFFICIENT DATA]
- **Current dose:** [dose, form, brand]
- **Duration on stack:** [X months]
- **Genetic basis:** [relevant variants or "no genetic data"]
- **Lab evidence:** [summary of relevant markers and trends]
- **Symptom evidence:** [summary of relevant symptom trends]
- **Wearable evidence:** [relevant sleep/recovery/strain trends]
- **User observations:** [any relevant notes]
- **Published evidence level:** [A/B/C/D] — [basis]
- **Form/bioavailability:** [optimal / suboptimal — explain]
- **Recommendation:** [specific recommendation with rationale]
- **Next validation point:** [when to reassess — e.g., "recheck 25-OH Vitamin D in ~3 months"]

### Interaction Notes
[Any notable supplement-supplement or supplement-medication interactions]

### Gaps in Evidence
[Supplements that lack lab markers, sufficient time on stack, or relevant symptom data to evaluate]

### Suggested Stack Changes
[Prioritized list of changes the user might consider, with rationale]
```

### Important Notes
- Never recommend starting new supplements. Only assess what's currently active. (For gap identification, use the MASTER_ANALYSIS skill.)
- For "DROP" recommendations, explain clearly why — the user invested money and belief in this supplement.
- "INSUFFICIENT DATA" is a valid and honest assessment. Don't force conclusions.
- Reference specific lab values with dates, not vague trends.
- If a supplement has been active for less than 60 days, default to "INSUFFICIENT DATA" unless lab evidence is clear.
- **Do not confuse mechanism with evidence.** A plausible biochemical mechanism (e.g., "CoQ10 supports mitochondrial electron transport") does not constitute evidence that a supplement works for a specific clinical purpose. Always look for human trial data for the stated purpose and dose range.
- **Dose matters.** Many supplements have evidence at specific doses but not others. 200mg magnesium glycinate is not interchangeable with 400mg magnesium oxide in terms of clinical evidence or bioavailability.
- **Reference databases:** When evidence grades are uncertain, consult Natural Medicines Database (gold standard for evidence grading), Examine.com (accessible effect size summaries), and ConsumerLab (brand testing and contamination reports).
- **Connector enhancements:** If PubMed, Consensus, or Scholar Gateway are connected (see `CONNECTORS.md`), run the RESEARCH_ENRICHMENT workflow to validate evidence grades with primary literature citations. If Notion or Gamma are connected, deliver the review as a formatted report via the PHYSICIAN_REPORT workflow.
