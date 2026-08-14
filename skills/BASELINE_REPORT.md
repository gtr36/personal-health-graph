---
schema_version: "0.1.0"
type: skill
name: Baseline Report
description: First-run comprehensive assessment. Establishes personal baselines, identifies data gaps, and creates a prioritized roadmap for health optimization.
reads:
  - reports/baseline_report_*.md (prior baselines, for tracking trajectory)
  - PROFILE.md
  - LABS_HISTORY.md
  - GENETICS.md
  - SUPPLEMENTS.md
  - PROTOCOLS.md
  - integrations/labs/*.md
  - integrations/genetics/*.md
  - integrations/wearable_daily/*.md
  - integrations/healthkit/*.md
  - integrations/microbiome/*.md
  - integrations/imaging/*.md
  - integrations/assessments/*.md
  - integrations/cycle/*.md
  - symptoms/*.md
  - journal/*.md
  - EXPENSES.md
default_range: all available data
output_format: baseline assessment with gap analysis and 90-day roadmap
saves_to: reports/baseline_report_YYYY-MM-DD.md (also .docx or .pdf)
---

# Skill: Baseline Report

## Purpose
Generate a comprehensive "state of the union" assessment when a user first sets up their Personal Health Graph or when they want a fresh starting point. Unlike ongoing analysis skills (Symptom Analysis, Pattern Detection), this skill is designed for the moment when you're looking at your data for the first time as a complete picture and asking: "Where do I stand, what's missing, and what should I do next?"

## When to use
- First time populating your Personal Health Graph with data
- Starting a new health optimization phase
- Annual reset / comprehensive review
- After a major life change (new diagnosis, significant weight change, medication change, lifestyle shift)

## Instructions for LLM

### Step 1: Data census
Before any analysis, inventory everything that exists and everything that's missing. This is the most important step — an honest assessment of data completeness determines the quality of everything that follows.

**For each data source, assess:**

| Source | Status | Coverage | Quality |
|--------|--------|----------|---------|
| PROFILE.md | Empty / Partial / Complete | — | Are demographics, conditions, meds, family history filled? |
| Lab panels | None / 1 panel / 2+ panels | Date range | Single provider or multiple? Fasting status noted? |
| Genetics | None / Summary only / Raw file available | — | Platform known? Build verified? |
| Wearable data | None / < 30 days / 30-90 days / 90+ days | Date range | Continuous or gaps? Device noted? |
| HealthKit | None / Partial / Daily | Date range | Which metrics populated? |
| Symptoms | None / < 10 entries / 10-30 / 30+ | Date range | Severity tracked? Context included? |
| Observations | None / Sparse / Regular | Date range | — |
| Microbiome | None / 1 test / 2+ tests | — | Method noted? |
| Imaging | None / Available | — | Types? |
| Supplements | None / Listed / Detailed | — | Doses, timing, brands, rationale? |
| Protocols | None / Partial / Detailed | — | Exercise, nutrition, sleep documented? |
| Assessments | None / 1 instrument / Tracked over time | Date range | Which instruments (PHQ-9, GAD-7, PSQI, etc.)? |
| Cycle tracking | None / Partial / Monthly | Date range | Ovulation markers tracked? (if applicable) |

### Step 2: Establish baselines
For every metric with sufficient data (minimum 14 days for wearable data, 1 panel for labs), establish a personal baseline:

**Lab baselines:**
- For each biomarker with at least one measurement: current value, reference range, flag status
- For biomarkers with 2+ measurements: trend direction and rate of change
- Identify biomarkers that are technically "in range" but trending toward a boundary

**Wearable baselines (if ≥ 14 days available):**
- Sleep: mean duration, standard deviation, percentage of nights below 7 hours
- HRV: mean, standard deviation, measurement method (RMSSD vs. SDNN — do NOT mix)
- Resting HR: mean, trend
- Recovery/readiness: mean score, percentage of days in "red" or below threshold
- Activity/strain: mean daily strain, workout frequency

**Symptom baselines (if ≥ 10 entries):**
- Types logged, frequency per week/month
- Average severity by type
- Most common co-occurring factors

**Body composition (if DEXA or equivalent):**
- Body fat %, lean mass, visceral fat, bone density

### Step 3: Risk and opportunity scan
Based on available data, identify:

**Immediate flags (act now):**
- Lab values significantly out of range
- Medications without pharmacogenomic review (if genetic data available)
- Known drug-gene interactions
- Symptoms suggesting undiagnosed conditions

**Monitoring priorities (track closely):**
- Biomarkers trending toward range boundaries
- Wearable metrics trending unfavorably
- Symptoms increasing in frequency or severity

**Optimization opportunities (improve what's already okay):**
- Lab values that are "normal" but could be optimized per longevity-oriented targets
- Sleep metrics with room for improvement
- Supplement stack gaps suggested by genetics or labs
- Protocol improvements supported by the data

### Step 4: Gap analysis
What data is missing that would materially improve the analysis?

Prioritize gaps by impact:
- **Critical gaps:** Data whose absence makes important conclusions impossible (e.g., no lipid panel for someone on a statin, no HbA1c with family history of diabetes)
- **High-value gaps:** Data that would significantly deepen the analysis (e.g., genetics for someone with a complex supplement stack, wearable data for someone tracking sleep-related symptoms)
- **Nice-to-have gaps:** Data that would add nuance but isn't blocking actionable conclusions

### Step 5: Generate the report

#### Format
```
# Baseline Report
**Subject:** [Name], [Age], [Sex]
**Date:** [date]
**Prepared by:** Personal Health Graph (AI-generated from structured health files)

---

## Data Completeness Score
[X / 13] — based on how many of the 13 data sources in the Step 1 census are populated with usable data. (Mark cycle tracking N/A rather than missing when it does not apply, and score out of 12.)

[1-2 sentences explaining the score and its implications for analysis quality.]

### Coverage Matrix
| Source | Status | Coverage | Action Needed |
|--------|--------|----------|---------------|
[Populated from Step 1]

---

## Personal Baselines

### Lab Baselines
[Table of all measured biomarkers with: current value, reference range, flag, trend (if 2+ measurements), and personal target (if applicable)]

### Wearable Baselines
[Table or prose summary of sleep, HRV, resting HR, recovery, activity baselines with means and standard deviations]

### Symptom Baselines
[Summary of symptom types, frequency, severity, and top correlations]

### Body Composition
[If available: current DEXA or equivalent measurements]

---

## Key Findings

### Immediate Flags
[Numbered list with specific values, dates, and recommended actions]

### Monitoring Priorities
[Items to track with suggested retest intervals]

### Optimization Opportunities
[Evidence-based suggestions for improving metrics that are currently acceptable]

---

## Gap Analysis

### Critical Gaps
[What's missing and why it matters]

### High-Value Gaps
[What would significantly improve the analysis]

### Recommended Testing
[Specific tests to order, with rationale and approximate cost where possible]

---

## 90-Day Roadmap

### Month 1: Foundation
[Specific actions: tests to order, data to start tracking, supplements to validate, protocols to establish]

### Month 2: Optimize
[Adjustments based on Month 1 data: dose changes, protocol refinements, follow-up tests]

### Month 3: Assess
[Re-run Baseline Report or Pattern Detection to evaluate progress. Specific milestones to check.]

---

## Appendix: Data Sources
[Complete list of files read]
```

### Important notes
- This skill is designed to be honest about uncertainty. A sparse dataset should produce a short report with a clear gap analysis, not a padded report that overstates confidence.
- The Data Completeness Score should be genuinely informative — a 3/10 should make the user want to add data, not feel judged.
- The 90-Day Roadmap is the most actionable section. Make it specific, time-bound, and achievable.
- Save the completed report to `reports/baseline_report_YYYY-MM-DD.md` (the `saves_to:` location). Reports always go in `reports/`, which the template's `.gitignore` protects from accidental commits. Never save reports to the repo root.
- Recommend re-running this skill at 6-month intervals or after any major health event.
