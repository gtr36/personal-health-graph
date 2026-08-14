---
schema_version: "0.1.0"
type: skill
name: Symptom Analysis
description: Cross-reference symptoms with sleep, supplements, calendar, and wearable data to identify correlations and recurring patterns.
reads:
  - symptoms/*.md
  - integrations/wearable_daily/*.md
  - integrations/assessments/*.md
  - integrations/cycle/*.md
  - SUPPLEMENTS.md
  - PROTOCOLS.md
  - journal/*.md
  # Voice-captured entries are in journal/*.md with source: voice
external_context:
  - Google Calendar (meeting density, event types)
  - Weather API (barometric pressure, temperature)
default_range: 90 days
output_format: correlation report
saves_to: reports/symptom_analysis_YYYY-MM-DD.md
---

# Skill: Symptom Analysis

## Purpose
Analyze symptom entries across all available data sources to identify correlations, recurring patterns, triggers, and trends that the user may not see themselves.

## Instructions for LLM

### Step 1: Gather data
Read the following files for the specified time range (default: 90 days):
1. `symptoms/*.md` — all symptom entries with metadata, severity, tags, and linked files
2. `integrations/wearable_daily/*.md` — sleep duration, HRV, recovery, strain for each day
3. `SUPPLEMENTS.md` — current stack, doses, any noted skips or changes
4. `PROTOCOLS.md` — exercise schedule, routines, recent protocol changes
5. `journal/*.md` — user-noted patterns, dreams, dietary changes, voice-captured observations
6. If available: Google Calendar data for meeting/event density per day
7. If available: weather data for barometric pressure on symptom days

### Step 2: Identify symptom clusters
Group symptom entries by:
- **Type** (migraine, fatigue, GI, tension, etc.)
- **Frequency** (how often in the time range)
- **Severity trend** (getting worse, stable, improving)
- **Temporal patterns** (day of week, time of day, cyclical)
- **Recurrence interval** (days between similar entries)

### Step 3: Cross-reference correlations
For each symptom cluster, check:
- **Sleep on the prior night:** Duration, HRV, recovery score. Flag if consistently below personal baseline.
- **Sleep on the night of the symptom:** Was it disrupted?
- **Supplement adherence:** Were any supplements skipped in the 24-48hr window before the symptom?
- **Calendar density:** How many meetings/events on the symptom day and the day prior?
- **Exercise:** Was there a workout the day before? Was strain unusually high or low?
- **Weather:** Was barometric pressure dropping? Was it unusually hot/cold/humid?
- **Protocol changes:** Did the symptom appear within 14 days of a protocol change?
- **Other symptoms:** Did other symptom types co-occur within a 48hr window?
- **Observations:** Did the user note anything relevant (dietary change, stress, dreams)?
- **Voice biomarkers (if available):** Check journal/ entries with `source: voice` for acoustic biomarker data. Was there a notable deviation from baseline on the symptom day?

### Step 4: Generate output

#### Format
```
## Symptom Analysis Report
Generated: [date]
Range: [start] to [end]
Data sources: [list files read]

### Summary
[2-3 sentence overview of findings]

### Symptom Clusters

#### [Symptom Type 1]
- Frequency: X occurrences in [range]
- Average severity: X/10
- Trend: [improving/stable/worsening]
- Strongest correlations:
  - [Correlation 1] (confidence: high/medium/low)
  - [Correlation 2] (confidence: high/medium/low)
- Notable: [anything unusual or new]

### Cross-Source Patterns
[Patterns that span multiple symptom types or data sources]

### Suggested Actions
[Specific, actionable recommendations based on the data — not medical advice]

### Questions to Explore
[Open questions the data raises but cannot answer]

### Data Gaps
[Missing data that would improve analysis — e.g., "no calendar data connected," "supplement adherence not tracked daily"]
```

### Step 5: Assess causality strength (Bradford Hill Criteria)
For each identified correlation, evaluate how likely it is to represent a causal relationship using the Bradford Hill criteria. Not all criteria must be met — they are a framework for reasoning, not a checklist.

1. **Strength of association:** How large is the effect? A symptom that occurs 80% of the time when sleep < 6 hours vs. 10% otherwise is a stronger association than 30% vs. 20%.
2. **Consistency:** Does the pattern repeat across different time periods, or is it concentrated in one week?
3. **Specificity:** Is the exposure specifically associated with this symptom, or does it correlate with everything?
4. **Temporality:** Does the exposure reliably precede the symptom? (This is the one non-negotiable criterion.)
5. **Biological gradient (dose-response):** Does worse sleep → worse symptoms proportionally? Does higher strain → more symptoms?
6. **Plausibility:** Is there a known biological mechanism? (e.g., sleep deprivation → lowered migraine threshold is well-established)
7. **Coherence:** Does the pattern fit with what's known from labs, genetics, and journal entries?
8. **Experiment:** Has the user inadvertently or deliberately tested this? (e.g., a protocol change that removed the exposure — did symptoms resolve?)
9. **Analogy:** Is this pattern similar to well-known clinical relationships?

**For each major finding, note which Bradford Hill criteria are met and which are not.** This converts a vague "correlation found" into a calibrated causal assessment.

### Statistical Rigor Notes
Apply these principles when analyzing symptom data:

**Minimum sample sizes:**
- Don't report correlations based on fewer than 5 co-occurring instances. Note the sample size for every reported pattern.
- For frequency claims (e.g., "migraines occur 3x more often after poor sleep"), report the actual numbers: "7 of 9 migraine days (78%) were preceded by sleep < 6.5 hours, compared to 12 of 52 non-migraine days (23%)."

**Effect sizes over p-values:**
- In a personal health dataset, traditional statistical significance (p < 0.05) is often not meaningful due to small sample sizes and multiple comparisons. Focus on effect size (how big is the difference?) and practical significance (does it matter to the user?).
- Report relative risk or odds ratios where possible: "Poor sleep was associated with a 3.4x higher odds of migraine the following day."

**Multiple comparison awareness:**
- When scanning many potential correlations (sleep × symptom type, strain × symptom type, supplement × symptom type, etc.), some will appear significant by chance. If you test 20 correlations, expect 1 to look significant at the 5% level purely by chance.
- Flag findings that emerge from a broad scan vs. those that test a specific hypothesis the user already had.

**Confounders:**
- Always consider what else might explain the pattern. Poor sleep and high strain often co-occur — is the symptom related to sleep, strain, or both?
- Note potential confounders for each finding.

**Data-density bias (attention bias):**
- Logged data reflects attention, not incidence. Users log most where they are most worried, so symptom and journal density is itself biased toward areas of concern.
- Before reporting a correlation, check whether it could be an artifact of differential logging: were entries dense in that period because more was happening, or because the user was watching more closely?
- Prefer passively captured sources (wearables, labs) as the denominator when comparing symptomatic and non-symptomatic periods.

### Important Notes
- Never provide medical diagnoses. Frame all findings as observed correlations, not causal claims.
- Use the user's personal baselines (from wearable averages), not population norms.
- When confidence in a correlation is low, say so explicitly.
- If the linked_files field on a symptom entry points to relevant context, follow those links.
- Prioritize findings by actionability: what can the user change or test?
- **The most valuable output is a testable hypothesis.** "You get migraines more often after nights with < 6.5 hours of sleep (7 of 9 episodes). Test this by prioritizing 7+ hour nights for the next 30 days and tracking whether migraine frequency drops."
