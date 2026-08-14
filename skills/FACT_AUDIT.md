---
schema_version: "0.3.0"
type: skill
name: Fact Audit
description: Adversarially re-verify health data accuracy in two modes. Report mode re-derives a prior report's load-bearing claims from primary sources; foundation mode audits the graph's own data (genetics, labs, regimen) against the raw exports it was transcribed from. The defense against plausible-but-wrong narratives, at both the analysis layer and the ingestion layer.
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
writes:
  - GENETICS.md (Verification Log entries — foundation mode only)
  - LABS_HISTORY.md (verification annotations — foundation mode only)
default_range: one report per audit (report mode) or the full graph (foundation mode)
output_format: claim-by-claim or row-by-row audit with verdicts
saves_to: reports/fact_audit_YYYY-MM-DD.md (report mode) | reports/foundation_audit_YYYY-MM-DD.md (foundation mode)
---

# Skill: Fact Audit

## Purpose

The dangerous errors in AI health analysis are not hallucinations. They are coherent narratives built on a single misread fact: a genotype read on the wrong strand, a unit conversion done once and wrong, a lab value attributed to the wrong date. Everything downstream agrees with the upstream mistake, so the narrative reads as internally consistent for as long as nobody re-derives the foundation. (See the Known Failure Modes section of the README for a real example that survived a year.)

This skill is the countermeasure, and it runs in two modes because the errors enter at two layers:

- **Report mode** audits a completed analysis: extract its load-bearing claims and re-derive each one from primary sources as if the original analysis did not exist.
- **Foundation mode** audits the graph itself: the most dangerous errors enter at ingestion, when an AI transcribes a raw genotype file, a lab PDF, or a CSV into the foundation files that every later analysis trusts. Foundation mode re-derives the foundation from the raw exports.

Infer the mode from the request. "Audit this report" is report mode; "verify my genetics," "check the graph," or a first audit after a bulk import is foundation mode. When in doubt after a large intake, foundation mode first — a verified foundation makes every report audit cheaper.

## Mode 1: Report audit

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

## Mode 2: Foundation audit

### Step 1: Scope

Genetics always audits at 100 percent — the file is small and the stakes are the highest in the system. Labs audit fully on a first pass or after a bulk import; on routine passes, audit every flagged row, every row feeding an active concern, and a random 20 percent of the rest. Medications and supplements audit fully (they are short lists). State the scope in the output.

### Step 2: Genetics re-derivation

For every populated row in GENETICS.md:

1. Locate the rsID's verbatim line in the raw genotype file and record it. If the row already carries its verbatim line (the entry convention in GENETICS.md), confirm it matches the file.
2. State the platform's strand convention and, for the position in question, which allele is reference and which is alternate. If this cannot be confirmed from available sources (a research connector, the platform's documentation), mark the interpretation UNVERIFIABLE rather than assuming — this exact assumption is how a genotype reads as wild-type for a year while being homozygous variant.
3. Independently re-call the zygosity and interpretation from the verbatim line, then compare to the recorded row.
4. Star alleles (CYP2D6, CYP2C19, etc.): re-check every defining SNP, not just one, against PharmVar definitions where available.
5. A row whose rsID is absent from the raw file is UNVERIFIABLE and must say "not genotyped," never carry an interpretation.

### Step 3: Labs verification

For each in-scope LABS_HISTORY row: verify value, unit, reference range, flag, and draw date against the panel summary in `integrations/labs/` AND the original document in `integrations/raw/labs/` where archived. Re-derive any unit conversion from the original. Confirm biomarker identity across name normalizations (free vs total, calculated vs direct). A value that appears only in LABS_HISTORY with no panel file and no raw document is UNVERIFIABLE.

### Step 4: Regimen verification

MEDICATIONS.md and SUPPLEMENTS.md entries against their sources: pharmacy records, the visit log in DOCTOR_QS.md, intake reports. Doses and start dates especially — downstream temporal analysis depends on them.

### Step 5: Record the results

- Append a Verification Log entry to GENETICS.md (date, scope, method and model, rows verified, discrepancies, unverifiable rows).
- Annotate verified LABS_HISTORY rows per that file's verification convention.
- **Corrections are proposed, never silently applied.** For every DISCREPANT row, show the user the recorded value, the re-derived value, and the source line, and apply the fix only on their confirmation. A verification pass that silently rewrites the foundation is itself an unaudited ingestion event.
- Save the foundation audit report with the row-level verdict table.

### When to run foundation mode

After any bulk INTAKE. After GENETICS.md is first populated. Before the first MASTER_ANALYSIS. Annually for genetics (re-verification, and separately re-interpretation: the genotype does not change, but what research says about it does). And after any downstream finding that surprises you — surprise is a trigger, not a reassurance.

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
- **Foundation mode is the trust anchor.** The system's assurance is never "the AI read it correctly." It is that every fact in the foundation carries a path back to its primary source, and this mode walks those paths on a schedule. MAINTENANCE tracks when it last ran.
