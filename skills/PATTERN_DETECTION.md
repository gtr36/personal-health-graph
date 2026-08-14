---
schema_version: "0.1.0"
type: skill
name: Pattern Detection
description: Full-history scan for recurring correlations, emerging trends, and anomalies across all data sources.
reads:
  - reports/pattern_detection_*.md (prior scans, to avoid redundant findings)
  - symptoms/*.md
  - journal/*.md
  - integrations/wearable_daily/*.md
  - integrations/labs/*.md
  - integrations/assessments/*.md
  - integrations/cycle/*.md
  - SUPPLEMENTS.md
  - PROTOCOLS.md
  # Voice-captured entries are in journal/*.md with source: voice
external_context:
  - Google Calendar
  - Weather API
default_range: all available data
output_format: pattern report with confidence ratings
saves_to: reports/pattern_detection_YYYY-MM-DD.md (also .html)
---

# Skill: Pattern Detection

## Purpose
Scan the entire Personal Health Graph file system for patterns, correlations, and anomalies that span multiple data sources and time periods. This is the broadest analysis skill — it looks for things the user hasn't thought to ask about.

## Instructions for LLM

### Step 1: Full inventory
Read all available files. Build a mental model of:
- Total data range (first entry to most recent)
- Data completeness (which sources have continuous data, which have gaps)
- Entry volume (how many symptom entries and journal entries exist)
- Major events (supplement starts/stops, protocol changes, lab tests)

### Step 2: Multi-dimensional correlation scan

**Time-based patterns:**
- Do symptoms cluster on specific days of the week?
- Is there a monthly or cyclical pattern?
- Are symptoms more frequent during specific seasons or months?
- Has symptom frequency changed over time (increasing, decreasing)?

**Sleep-symptom correlations:**
- What is the sleep threshold below which symptoms become significantly more likely?
- Does HRV predict next-day symptoms better than sleep duration alone?
- Do recovery scores below a certain threshold predict symptom days?

**Supplement-outcome correlations:**
- When supplements were started or stopped, did symptom patterns change within 14-30 days?
- When doses were adjusted, was there a measurable shift?
- Are there missed-dose patterns that correlate with symptom spikes?

**Activity-recovery correlations:**
- Does high strain on day N predict poor sleep on night N?
- Does high strain + poor sleep create a compounding effect?
- Are rest days actually producing better recovery scores?

**Stress-health correlations:**
- Does calendar density correlate with sleep quality?
- Do stress-related journal entries or stress dreams precede symptom clusters?
- Are there "cascade patterns" (high meetings → poor sleep → symptom → missed workout → poor recovery)?

**Lab-lifestyle correlations:**
- Do lab markers that improved correspond to protocol changes at the right time offset?
- Are there lab markers trending in concerning directions despite no symptom signal?

**Anomalies:**
- Are there symptoms that appear without any of the usual correlating factors?
- Are there days with very poor wearable metrics but no reported symptoms (possible underreporting)?
- Are there sudden changes in baseline metrics (HRV shift, resting HR shift) not explained by protocol changes?

### Step 3: Generate output

#### Format
```
## Pattern Detection Report
Generated: [date]
Data range: [first entry] to [most recent]
Total data points analyzed: [count across all sources]

### Key Findings
[Ranked list of the 3-5 most significant patterns, each with:]
1. **[Pattern name]**
   - Observation: [what was found]
   - Evidence: [specific entries, dates, and data points]
   - Confidence: [high/medium/low] — [why this confidence level]
   - Implication: [what this might mean — framed as hypothesis, not diagnosis]
   - Suggested test: [how the user could validate or invalidate this pattern]

### Emerging Trends
[Patterns that are developing but don't yet have enough data for high confidence]

### Anomalies
[Data points or periods that don't fit any pattern — worth monitoring]

### Cascade Patterns
[Multi-step causal chains identified in the data — e.g., "high meeting density → poor sleep → migraine → skipped workout → low recovery next day"]

### Data Quality Notes
- Coverage: [which data sources have good coverage, which have gaps]
- Recommended: [what additional data capture would improve future analysis]

### Comparison to Prior Report
[If a prior pattern detection report exists, note what changed — new patterns, resolved patterns, strengthened or weakened correlations]
```

### Statistical Framework

**Confidence rating criteria:**
Confidence ratings in this skill must be grounded in specific criteria, not intuition:

- **High confidence:** Pattern observed in ≥ 10 instances, consistent across ≥ 3 time periods, effect size is large (relative risk ≥ 2.0 or absolute difference ≥ 30%), no obvious confounders, biological plausibility exists.
- **Medium confidence:** Pattern observed in 5-9 instances, consistent across ≥ 2 time periods, effect size is moderate (RR 1.5-2.0 or absolute difference 15-30%), some potential confounders identified.
- **Low confidence:** Pattern observed in < 5 instances, or inconsistent across time periods, or small effect size, or significant confounders present, or based on a data source with known gaps.

**Always report:**
- Sample size (N of events and N of comparison days)
- Effect size (relative risk, odds ratio, or absolute percentage difference)
- Direction and magnitude of the pattern
- Potential confounders considered

**Power analysis awareness:**
Different pattern types require different minimum data volumes to detect reliably:

| Pattern Type | Minimum Data | Reason |
|-------------|-------------|--------|
| Sleep-symptom correlation | 30+ days with symptom tracking | Need enough symptom days to compare against non-symptom days |
| Day-of-week clustering | 8+ weeks | Need ≥ 8 instances of each weekday |
| Monthly/cyclical patterns | 3+ months | Need ≥ 3 full cycles |
| Supplement start/stop effects | 14+ days on and off the supplement | Need pre/post comparison |
| Seasonal patterns | 12+ months | Need at least one full year |
| Lab trend analysis | 3+ panels spanning ≥ 6 months | Need sufficient time points to distinguish trend from noise |
| Cascade patterns | 60+ days | Need multiple cascades to distinguish from coincidence |

If the dataset is insufficient for a pattern type, note this explicitly rather than reporting a spurious finding. "Insufficient data to assess seasonal patterns (only 6 weeks of data)" is more useful than a speculative finding.

**Data-density bias (attention bias):**
Logged data reflects attention, not incidence. Users log most heavily where they are most worried: an anxiety-dense month over-generates symptom and journal entries, and a calm month under-generates them, independent of what was actually happening in the body. This biases every correlation downstream — the areas with the most data are the areas of greatest concern, not necessarily the areas of greatest signal.

- Before reporting a pattern, compare it against the logging-density baseline: is the "cluster" a cluster of events, or a cluster of attention?
- Flag any finding where entry density varies sharply across the comparison window.
- Wearable and lab data are less attention-biased than symptom and journal data (they are captured passively or on a schedule); weight accordingly when sources disagree.

**Multiple comparison correction:**
When scanning across many potential patterns (which this skill does by design), apply the following discipline:
- Report the total number of correlation scans performed
- Distinguish between hypothesis-driven findings (testing something the user or a prior analysis identified) and exploratory findings (emerging from a broad scan)
- For exploratory findings, require a larger effect size or more instances before reporting as medium/high confidence
- Never report a "low confidence" exploratory finding as a headline finding — it belongs in the "Emerging Trends" section

### Important Notes
- This is the most computationally expensive skill. Read all files before generating output.
- Distinguish clearly between correlation and causation in all findings.
- Confidence ratings must be grounded in the statistical framework above, not assigned by feel.
- "Suggested test" is the most valuable part of each finding — give the user something actionable to try. Design it as a simple experiment: "For the next 30 days, do X and track Y. If [expected result], the pattern is confirmed."
- If the dataset is small (< 30 days), explicitly note that patterns may not be stable and recommend re-running after 90 days.
- **Avoid narrative fallacy.** It is tempting to construct a compelling story from sparse data. A pattern that feels right but is based on 3 data points is not a finding — it's a hypothesis. Label it accordingly.
