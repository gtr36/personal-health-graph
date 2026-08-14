---
schema_version: "0.1.0"
type: state
created:    # YYYY-MM-DDTHH:MM:SS±HH:MM
updated:    # YYYY-MM-DDTHH:MM:SS±HH:MM
tags: [genetics, variants, SNPs, pharmacogenomics]
---

# Genetic Profile — Clinically Significant Variants

<!--
HOW TO USE THIS FILE:
This file consolidates every clinically significant genetic variant from your raw data into
a structured, AI-readable format. It's the genetic counterpart to LABS_HISTORY.md — together,
they enable cross-referencing that produces genuinely personalized health insights.

BUILDING THIS FILE:
1. Get your raw genetic data file (see integrations/genetics/README.md for export instructions)
2. Give the raw file to an LLM with the analysis prompt below
3. Structure the results into the sections in this file
4. For every rsID you enter, record the VERBATIM line from the raw file (in the row's
   Actionable Implications cell or the Verification Log below). This single habit turns
   every future audit into a lookup instead of a re-parse of a 600K-line file.
5. Before treating this file as analysis-grade, run the FACT_AUDIT skill's foundation mode,
   ideally with a different model than the one that populated it. A single misread genotype
   here propagates into every downstream analysis while looking perfectly coherent.

AI ANALYSIS PROMPT:
"Analyze this raw genetic data file. For each section below, query the relevant rsIDs, report
the genotype found, and provide clinical significance and actionable implications. If an rsID
is not present in the file, note it as 'not genotyped.' Report on the plus (+) strand.
For every rsID found, include the verbatim line from the raw file. Before calling any
genotype's zygosity or clinical meaning, state which allele is reference and which is
alternate at that position and the platform's strand convention; if you cannot confirm
reference vs alternate, mark the call 'unverified' rather than interpreting it."

IMPORTANT NOTES:
- Consumer genotyping (23andMe, Ancestry) tests ~630K-700K specific SNPs, not your full genome.
  "Not genotyped" means the platform didn't test that position, not that you lack the variant.
- Always note the platform, chip version, and genome build (GRCh37 or GRCh38).
- Variants identified by consumer platforms should be confirmed by clinical testing before
  making medical decisions.
- Star allele determinations (CYP2D6, CYP2C19, etc.) require checking multiple defining SNPs
  and should be verified against PharmVar (pharmvar.org).
- Coherence is not correctness. An interpretation that reads consistently across this file
  can still rest on one misread call. The Verification Log below is what separates
  "entered" from "verified" — treat unverified rows as provisional.
-->

## Platform Info
- **Service:**           <!-- 23andMe, AncestryDNA, Nebula, clinical panel, etc. -->
- **Test type:**         <!-- Genotyping array, WGS, WES, clinical panel -->
- **Chip/version:**      <!-- e.g., Illumina GSA v5, ~630K SNPs -->
- **Genome build:**      <!-- GRCh37/hg19 or GRCh38/hg38 -->
- **Strand orientation:** <!-- Plus (+) strand for consumer platforms -->
- **Raw file:**          <!-- integrations/raw/genetics/[filename] -->
- **Total SNPs:**        <!-- e.g., 632,295 -->

---

## 1. Methylation & B-Vitamin Metabolism

<!-- Key genes: MTHFR, COMT, MTR, MTRR, CBS, BHMT, PEMT, MAO-A -->

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

<!--
Example:
| rs1801133 | MTHFR | TT (C677T) | Homozygous thermolabile — ~30% residual enzyme activity | Requires pre-methylated folate (5-MTHF), not folic acid. Monitor homocysteine. |
| rs4680 | COMT | AG (Val/Met) | Intermediate catechol metabolism | Moderate dopamine/estrogen clearance. Balanced stress response. |
| rs12325817 | PEMT | CT | Reduced endogenous phosphatidylcholine synthesis | Elevated exogenous choline requirement. Consider PC supplementation. |
-->

## 2. Cardiovascular

<!-- Key genes: APOE, APOB, PCSK9, LPA, MTHFR, ACE, AGT, NOS3, FV Leiden, FII -->

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

<!--
APOE haplotype (determined from two SNPs):
- rs429358 (APOE ε4 defining): [genotype]
- rs7412 (APOE ε2 defining): [genotype]
- Haplotype: [e.g., ε3/ε3, ε3/ε4, etc.]
-->

## 3. Inflammation & Immune Function

<!-- Key genes: IL6, IL10, TNF-α, IL1B, TLR4, HLA, CRP -->

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

## 4. Detoxification (Phase I & II)

<!-- Key genes: GSTP1, GSTM1, GSTT1, SOD2, CAT, NQO1, NAT2, CYP1A2 -->

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

## 5. Nutrient Metabolism

<!-- Key genes: FADS1, FADS2, BCMO1, VDR, FUT2, SLC23A1, TCN2 -->

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

## 6. Iron Metabolism

<!-- Key genes: HFE (H63D, C282Y), TF, TMPRSS6 -->

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

## 7. Pharmacogenomics

<!-- Key genes: CYP2D6, CYP2C19, CYP2C9, CYP3A4, DPYD, SLCO1B1, VKORC1, UGT1A1 -->
<!-- Star allele nomenclature is standard for PGx variants. Check PharmVar for definitions. -->

| Gene | Star Allele / Diplotype | Metabolizer Status | Clinical Implications |
|------|------------------------|-------------------|----------------------|
| | | | |

<!--
Example:
| CYP2D6 | *1/*4 | Intermediate Metabolizer | Reduced metabolism of codeine, tramadol, tamoxifen, many SSRIs. May need dose adjustment. |
| CYP2C19 | *1/*1 | Normal Metabolizer | Standard metabolism of clopidogrel, PPIs, some SSRIs. |
-->

## 8. Connective Tissue & Musculoskeletal

<!-- Key genes: COL1A1, COL5A1, ELN, MMP1, MMP3, GDF5, TNC -->

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

## 9. Sleep & Circadian Rhythm

<!-- Key genes: CLOCK, CRY1, CRY2, PER2, PER3, ADORA2A, ADA -->

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

## 10. Athletic Performance & Recovery

<!-- Key genes: ACTN3, ACE, PPARGC1A, COL5A1, IL6 (recovery) -->

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

## 11. Neurological & Cognitive

<!-- Key genes: BDNF, KIBRA, APOE (Alzheimer's), COMT (cognitive), DRD2, SLC6A4, OXTR -->

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

## 12. Longevity

<!-- Key genes: FOXO3, TERT, CETP, APOE (longevity association) -->

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

---

## Cross-Reference Summary

<!--
After populating the sections above, use this section to document gene-gene interactions
and gene-lab concordances. This is where the real value emerges.

GENE-GENE INTERACTIONS:
Document combinations of variants that compound risk or benefit.
Example: MTHFR 677TT + PEMT CT = dual impairment of methylation AND choline synthesis,
creating significantly elevated exogenous choline requirement.

GENE-LAB CONCORDANCES:
Document where your lab values confirm or contradict genetic predictions.
Example: FADS1 rs174547 TT predicts impaired EPA/DHA synthesis → Omega-3 Index 7.2%
confirms suboptimal levels despite dietary intake → Preformed omega-3 supplementation justified.
-->

### Gene-Gene Interactions

### Gene-Lab Concordances

### Linked Supplements
<!-- Which supplements in your stack are genetically justified? -->
<!-- Reference specific variants and link to SUPPLEMENTS.md -->

---

## Verification Log

<!--
This log is what separates "entered" from "verified." FACT_AUDIT's foundation mode appends
entries here; manual verification passes should too. Rows without a covering log entry are
provisional.

ENTRY TEMPLATE — one per verification pass:

### YYYY-MM-DD — [full | partial] — [method and model, e.g., "FACT_AUDIT foundation mode, (model name)"]
- **Rows verified:** N of M populated rows (list rsIDs re-derived from the raw file this pass)
- **Verbatim lines recorded:** [yes / added for: list]
- **Discrepancies:** [none | per row: rsID, recorded value vs raw-file value, resolution and date]
- **Unverifiable:** [rows whose rsID is absent from the raw file, or whose ref/alt allele could not be confirmed]
- **Clinical confirmation still needed:** [variants that should be confirmed by clinical-grade testing before informing decisions]
- **Next verification due:** [date or trigger, e.g., "after next raw-file import" / "annual re-interpretation"]
-->
