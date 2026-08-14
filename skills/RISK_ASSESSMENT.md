---
schema_version: "0.1.0"
type: skill
name: Risk Assessment
description: Risk factor review using established medical frameworks (ASCVD, Framingham, polygenic risk) as analytical scaffolding. Maps genetic predispositions against lab trends and lifestyle factors to produce a structured risk profile for discussion with your physician.
reads:
  - PROFILE.md
  - LABS_HISTORY.md
  - GENETICS.md
  - SUPPLEMENTS.md
  - PROTOCOLS.md
  - integrations/labs/*.md
  - integrations/genetics/*.md
  - integrations/wearable_daily/*.md
  - integrations/imaging/*.md
external_context:
  - ASCVD Risk Calculator (Pooled Cohort Equations)
  - Framingham Risk Score
  - Reynolds Risk Score
  - Published polygenic risk score literature
default_range: all available data
output_format: risk stratification report with evidence-based mitigation strategies
saves_to: reports/risk_assessment_YYYY-MM-DD.md (also .docx or .pdf)
---

# Skill: Risk Assessment

## Purpose
Produce a structured risk profile using validated clinical risk frameworks alongside genetic predisposition data and longitudinal lab trends. This applies the same frameworks physicians use (ASCVD, Framingham, Reynolds) to organize your data into a format that supports informed conversation with your care team — augmented by genetic data that most physicians don't routinely have access to.

> **Important:** This output is a structured summary for discussion with your physician, not a clinical assessment. All risk calculations, scores, and pharmacogenomic flags should be verified by a qualified professional before informing clinical decisions. LLM-generated calculations may contain errors.

## When to use
- You have sufficient lab data (lipid panel + metabolic panel at minimum) and want to understand your risk profile
- You have genetic data and want to map predispositions to clinical risk frameworks
- You're preparing for a conversation with a physician about preventive medicine
- You want to prioritize which health interventions will have the highest risk-reduction impact

## Prerequisites
**Minimum required:**
- PROFILE.md with age, sex, blood pressure (if known), smoking status, diabetes status
- At least one lipid panel (total cholesterol, LDL, HDL, triglycerides)

**Significantly enhances analysis:**
- GENETICS.md or raw genotype file (for APOE, MTHFR, PCSK9, FTO, etc.)
- Multiple lab panels (enables trend analysis)
- Imaging (CAC score, DEXA)
- Family history in PROFILE.md

## Instructions for LLM

### Step 1: Gather inputs for risk calculators
Extract from available data:
- Age, sex, race/ethnicity
- Total cholesterol, LDL-C, HDL-C (most recent values with dates)
- Systolic blood pressure (most recent, or ask user if not documented)
- Blood pressure medication status
- Diabetes status (check HbA1c if available: < 5.7% normal, 5.7-6.4% prediabetic, ≥ 6.5% diabetic)
- Smoking status
- Family history of premature CVD (first-degree relative: male < 55, female < 65)
- Statin use
- hs-CRP (if available, for Reynolds Risk Score)
- Lp(a) (if available — independent, causal risk factor for ASCVD)
- ApoB (if available — often better predictor than LDL-C)
- CAC score (if available — most powerful reclassifier for intermediate-risk patients)
- HbA1c and fasting glucose trends

### Step 2: Calculate established risk scores

**2A: ASCVD 10-Year Risk (Pooled Cohort Equations)**
- Applicable to adults 40-79 years
- Inputs: age, sex, race, total cholesterol, HDL-C, systolic BP, BP treatment, diabetes, smoking
- Risk categories: Low (< 5%), Borderline (5-7.5%), Intermediate (7.5-20%), High (≥ 20%)
- Show the calculation inputs and result explicitly

**2B: Framingham Risk Score (if applicable)**
- Broader scope than ASCVD — includes CVD events beyond just atherosclerotic events
- Note where Framingham and ASCVD diverge, as this indicates uncertainty

**2C: Reynolds Risk Score (if hs-CRP and family history available)**
- Adds hs-CRP and family history to the ASCVD model
- Particularly useful for reclassifying intermediate-risk patients

**2D: Risk reclassifiers**
Apply these when available — they frequently move patients between risk categories:

- **CAC score:** 0 = very low risk regardless of calculated score (can often defer statin). > 100 or > 75th percentile for age/sex = likely upgrade risk category. > 300 = high risk.
- **Lp(a):** > 50 mg/dL (> 125 nmol/L) is an independent, causal, genetic risk factor. Not modifiable by lifestyle. May warrant earlier or more aggressive lipid therapy.
- **ApoB:** If discordant with LDL-C (ApoB high, LDL-C normal), ApoB is the better predictor. Common in insulin resistance and metabolic syndrome.
- **Coronary CTA:** Direct visualization of plaque, if available.

### Step 3: Genetic risk integration
For each genetic variant in GENETICS.md (or from raw file analysis), map to clinical risk domains:

**Cardiovascular:**
- APOE: ε4 carriers have increased LDL-C and Alzheimer's risk. ε4/ε4 is high risk. ε2 carriers may have lower LDL but risk of type III hyperlipoproteinemia with high triglycerides.
- PCSK9: Gain-of-function variants increase LDL. Loss-of-function variants are cardioprotective.
- LPA: Variants at 6q25.3 influence Lp(a) levels — often the explanation for elevated Lp(a).
- 9p21: rs1333049, rs10757278 — strongest common genetic risk factor for MI independent of lipids.

**Metabolic:**
- FTO, MC4R: Obesity risk variants. Relevant for metabolic syndrome risk stratification.
- TCF7L2: Strongest common genetic risk factor for type 2 diabetes.
- SLC30A8: Zinc transporter variant affecting insulin secretion.

**Thrombotic:**
- Factor V Leiden (rs6025): 3-8x VTE risk if heterozygous, 50-80x if homozygous.
- Prothrombin G20210A (rs1799963): ~3x VTE risk if heterozygous.
- Relevance: affects decisions about oral contraceptives, HRT, surgery risk.

**Inflammatory:**
- IL6, IL10, TNF variants: modulate baseline inflammatory load. Cross-reference with hs-CRP.

**Cancer screening implications:**
- BRCA1/2 (if clinical testing performed — not reliably detected by consumer arrays)
- APC, MLH1, MSH2 (if clinical testing performed)
- Note: consumer genotyping arrays test a limited number of cancer-associated variants. A "negative" result from 23andMe does NOT rule out hereditary cancer syndromes.

### Step 4: Build integrated risk profile
Combine calculated risk scores with genetic modifiers:

**Risk amplifiers:** Genetic variants that increase risk beyond what clinical calculators predict (e.g., APOE ε4 + high LDL-C + positive family history = risk likely higher than the 10-year score suggests).

**Risk attenuators:** Evidence that risk may be lower than calculated (e.g., CAC score of 0 in a "borderline" risk patient = likely lower actual risk).

**Discordances:** Where different risk indicators disagree (e.g., low ASCVD score but elevated Lp(a) — these patients are underestimated by standard calculators).

### Step 5: Mitigation strategies
For each identified risk, provide evidence-based mitigation:

**Tiered approach:**
1. **Lifestyle interventions** (diet, exercise, sleep, stress management) — cite the expected risk reduction magnitude where evidence exists
2. **Supplement interventions** — only those with RCT-level evidence for the specific risk factor (e.g., omega-3 for triglycerides has REDUCE-IT trial evidence; most supplements do not have equivalent evidence for cardiovascular risk reduction)
3. **Pharmacologic interventions** — when to discuss with a physician (e.g., statin therapy thresholds per ACC/AHA guidelines)
4. **Monitoring schedule** — which biomarkers to retest and when

**Be explicit about evidence quality:**
- RCT evidence for risk reduction: cite the trial name and magnitude (e.g., "REDUCE-IT: icosapent ethyl reduced major cardiovascular events by 25% in patients with elevated triglycerides")
- Observational evidence only: note this clearly
- Genetic association without intervention evidence: note that the variant identifies risk but doesn't necessarily inform treatment

### Step 6: Generate the report

#### Format
```
# Risk Assessment Report
**Subject:** [Name], [Age], [Sex]
**Date:** [date]
**Prepared by:** Personal Health Graph (AI-generated from structured health files)

---

## Risk Score Summary

| Framework | Score | Category | Key Inputs | Notes |
|-----------|-------|----------|------------|-------|
| ASCVD 10-Year | X% | Low/Borderline/Intermediate/High | [key inputs] | |
| Framingham | X% | | | |
| Reynolds | X% | | [if hs-CRP available] | |

### Reclassifiers Applied
[CAC score, Lp(a), ApoB discordance — any factor that moves the patient between categories]

### Adjusted Risk Assessment
[1-2 paragraphs synthesizing the calculated scores with reclassifiers and genetic data into a final risk assessment. Be explicit about uncertainty.]

---

## Cardiovascular Risk Profile
[Detailed section: lipid trends, genetic cardiovascular variants, imaging results, family history, integrated interpretation]

**Risk level:** [Low / Moderate / Elevated / High]
**Confidence:** [High / Medium / Low] — [basis for confidence level]
**Top modifiable risk factors:** [ranked by impact]
**Mitigation strategy:** [specific, evidence-graded recommendations]

---

## Metabolic Risk Profile
[HbA1c trends, fasting glucose, insulin resistance markers, genetic metabolic variants, body composition if available]

---

## Inflammatory Risk Profile
[hs-CRP trends, genetic inflammation variants, lifestyle factors, autoimmune considerations]

---

## [Additional risk domains as warranted by available data: thrombotic, cancer screening, neurological/cognitive]

---

## Monitoring Schedule

| Biomarker / Test | Current Value | Retest Interval | Rationale |
|------------------|---------------|-----------------|-----------|
| | | | |

---

## Discussion Points for Physician
[Specific, prioritized items to discuss at the next medical visit — framed as questions, not recommendations]

---

## Appendix: Calculation Details
[Show the actual inputs used for each risk calculator so the physician can verify]

## Appendix: Genetic Variants Influencing Risk
[Table of all risk-relevant variants with gene, rsID, genotype, clinical significance, and risk domain]

## Appendix: Data Sources
[Complete list of files read]
```

### Important notes
- **This skill produces risk stratification, not medical advice.** Frame all outputs as "data to discuss with your physician," not as clinical recommendations.
- **Use established thresholds, not made-up ones.** ACC/AHA guidelines for statin therapy, ADA criteria for prediabetes, etc. Cite the guideline.
- **Polygenic risk scores from consumer platforms are not validated for clinical decision-making.** If referencing them, note this limitation explicitly. Individual variant associations (APOE, Lp(a) genetics, Factor V Leiden) have stronger clinical evidence than composite PRS.
- **Never overstate genetic risk.** Most genetic variants identified by consumer arrays confer modest relative risk increases (1.1-1.5x). The absolute risk increase depends heavily on baseline risk. A 1.3x relative risk multiplier on a 2% baseline risk is clinically different from the same multiplier on a 15% baseline risk.
- **CAC score of 0 is the most powerful negative risk reclassifier in cardiology.** If available and recent (< 5 years), it should feature prominently in the assessment.
- Save the completed report to `reports/risk_assessment_YYYY-MM-DD.md` (the `saves_to:` location). Reports always go in `reports/`, which the template's `.gitignore` protects from accidental commits. Never save reports to the repo root.
