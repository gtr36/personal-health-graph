---
schema_version: "0.3.0"
type: skill
name: Fact Audit
description: Adversarially re-verify the load-bearing claims of a prior analysis report against primary source files. The defense against plausible-but-wrong narratives.
reads:
  - reports/*.md (the report under audit)
  - LABS_HISTORY.md
  - GENETICS.md
  - MEDICATIONS.md
  - SUPPLEMENTS.md
  - integrations/labs/*.md
  - integrations/raw/** (original documents, when re-derivation requires them)
  - symptoms/*.md
  - journal/*.md
  - TIMELINE.md
writes: []
default_range: one report per audit
output_format: claim-by-claim audit with verdicts
saves_to: reports/fact_audit_YYYY-MM-DD.md
---

# Skill: Fact Audit

## Purpose

The dangerous errors in AI health analysis are not hallucinations. They are coherent narratives built on a single misread fact: a genotype read on the wrong strand, a unit conversion done once and wrong, a lab value attributed to the wrong date. Everything downstream agrees with the upstream mistake, so the narrative reads as internally consistent for as long as nobody re-derives the foundation. (See the Known Failure Modes section of the README for a real example that survived a year.)

This skill is the countermeasure. It takes a completed report, extracts the claims the conclusions actually rest on, and re-derives each one from primary sources as if the original analysis did not exist.

## Instructions for LLM

### Step 1: Extract the load-bearing claims

Read the report under audit. Identify the 5-15 factual claims that, if wrong, would change a conclusion or recommendation. A load-bearing claim is one a decision rests on, not a passing observation. For each claim record: the claim, where in the report it appears, and which conclusion depends on it.

### Step 2: Re-derive each claim from primary sources

Work from the most primary source available, not from the file the report itself cited. The hierarchy: original document in `integrations/raw/` > integration summary file > LABS_HISTORY/GENETICS aggregate > the report's own restatement.

Apply the known error classes as a checklist against every claim where the class applies:

- **Strand orientation (genetics):** re-check the genotype against the raw file, confirm the platform's strand convention, and confirm which allele is reference vs alternate at that position before accepting a zygosity call.
- **Units:** re-derive any converted value (mg/dL vs mmol/L, nmol/L vs mg/dL for Lp(a), ng/mL vs nmol/L for vitamin D). Conversion errors compound silently.
- **Date attribution:** confirm the value belongs to the draw date claimed, especially where multiple panels exist. Trend claims die on one misdated point.
- **Reference ranges:** confirm the range cited is the range from that lab's report, not a generic or remembered one.
- **Biomarker identity:** confirm name normalization was correct (free vs total testosterone, direct vs calculated LDL, ALT vs AST swaps).
- **Temporal ordering:** for any causal or correlational claim, confirm the exposure actually preceded the outcome using TIMELINE.md and source dates.
- **Dose and identity (supplements/medications):** confirm the substance, form, and dose cited match SUPPLEMENTS.md / MEDICATIONS.md.

### Step 3: Verdict per claim

- **VERIFIED** — re-derivation reproduces the claim from primary sources.
- **DISCREPANT** — re-derivation produces a different value, date, genotype, or direction. State both versions and trace where the divergence entered.
- **UNVERIFIABLE** — the primary source is missing or ambiguous. State exactly what document would settle it.

### Step 4: Propagation analysis

For every DISCREPANT claim, trace what else in the report inherits the error. This is the step that distinguishes a typo from a poisoned narrative: one wrong genotype can invalidate a supplement rationale, a risk assessment, and a protocol recommendation simultaneously. List the affected conclusions explicitly.

### Step 5: The cross-model check (recommended)

Because PHG is AI-agnostic, it can offer a defense no single-vendor product can: run this same audit on a different frontier model and diff the verdicts. Claims where two independent models disagree with each other, or where both flag discrepancies, deserve human re-verification first. Note in the report whether a cross-model pass was run.

## Output format

```
## Fact Audit
Audited report: [filename]
Date: [date]
Claims extracted: [N] | Verified: [N] | Discrepant: [N] | Unverifiable: [N]
Cross-model pass: [run with (model) / not run]

### Verdict table
| # | Claim | Verdict | Primary source checked | Note |
|---|-------|---------|------------------------|------|

### Discrepancies
[For each: the claim as reported, the re-derived finding, where the divergence entered, and every downstream conclusion affected]

### Unverifiable claims
[What document or data would settle each]

### Bottom line
[Does the audited report's overall conclusion survive? 2-3 sentences.]
```

## Important notes

- **Audit the report, not the author.** The output is a verdict table, not a critique. Most audits should find most claims VERIFIED; that result is valuable, not wasted effort.
- **Re-derive, don't re-read.** Confirming a claim by re-reading the sentence that made it is the failure mode this skill exists to prevent. Every verification must touch a source file.
- **When to run:** after any MASTER_ANALYSIS or RISK_ASSESSMENT that will inform a real decision; before sharing any report with a clinician; after INTAKE processes a large or messy batch; any time a finding surprises you. Surprise is a trigger, not a reassurance.
- **A clean audit is not a guarantee.** This skill catches transcription and derivation errors. It cannot validate clinical interpretation. Load-bearing findings still need clinical-grade confirmation before they inform medical decisions.
