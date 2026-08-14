---
schema_version: "0.3.0"
type: state
created: 2025-12-10T19:45:00-07:00
updated: 2025-12-10T19:45:00-07:00
tags: [genetics, variants, SNPs, pharmacogenomics, sample]
---

<!-- FICTIONAL DEMO DATA — Sam Rivera is not a real person. All genotypes below are invented for demo purposes. -->

# Genetic Profile — Clinically Significant Variants

## Platform Info
- **Service:** 23andMe
- **Test type:** Genotyping array
- **Chip/version:** Illumina GSA v5, ~630K SNPs
- **Genome build:** GRCh37/hg19
- **Strand orientation:** Plus (+) strand
- **Raw file:** integrations/raw/genetics/23andme_v5_sam_rivera_2025-12.txt (not included in this sample)
- **Total SNPs:** 631,842

---

## 1. Methylation & B-Vitamin Metabolism

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| rs1801133 | MTHFR | CT (C677T) | Heterozygous thermolabile variant; roughly 65% of normal enzyme activity | Intermediate methylation capacity. Standard dietary folate is adequate for most CT carriers. Homocysteine worth checking periodically. |

## 2. Cardiovascular

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| rs429358 | APOE | TT | ε4-defining SNP; no ε4 allele present | See haplotype note below |
| rs7412 | APOE | CC | ε2-defining SNP; no ε2 allele present | See haplotype note below |
| rs1333049 | 9p21 (CDKN2B-AS1 region) | GC | One copy of the risk allele (C) | Common variant carried by roughly half the population; modest effect size for coronary artery disease |
| rs6025 | F5 (Factor V Leiden) | GG | Negative; Leiden variant not present | No inherited thrombophilia signal from this variant |

<!--
APOE haplotype (determined from two SNPs):
- rs429358: TT
- rs7412: CC
- Haplotype: ε3/ε3 (most common; average lipid and Alzheimer's risk contribution)
-->

## 3. Inflammation & Immune Function

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

<!-- Not yet extracted from raw file. -->

## 4. Detoxification (Phase I & II)

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

<!-- Not yet extracted from raw file. -->

## 5. Nutrient Metabolism

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

<!-- Not yet extracted from raw file. -->

## 6. Iron Metabolism

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

<!-- Not yet extracted from raw file. -->

## 7. Pharmacogenomics

| Gene | Star Allele / Diplotype | Metabolizer Status | Clinical Implications |
|------|------------------------|-------------------|----------------------|
| CYP2C19 | *1/*17 (rs12248560 CT) | Rapid Metabolizer | Faster metabolism of some PPIs; enhanced activation of clopidogrel; some SSRIs (e.g., citalopram) may clear faster than average. |
| SLCO1B1 | *1/*5 (rs4149056 TC) | Decreased function (one C allele) | Reduced OATP1B1-mediated hepatic uptake of statins, giving higher circulating statin exposure and an increased risk of statin-associated muscle symptoms. Effect is strongest for simvastatin and is dose-dependent for other statins. |

## 8. Connective Tissue & Musculoskeletal

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

<!-- Not yet extracted from raw file. -->

## 9. Sleep & Circadian Rhythm

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

<!-- Not yet extracted from raw file. -->

## 10. Athletic Performance & Recovery

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

<!-- Not yet extracted from raw file. -->

## 11. Neurological & Cognitive

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

<!-- Not yet extracted from raw file. -->

## 12. Longevity

| rsID | Gene | Genotype | Significance | Actionable Implications |
|------|------|----------|-------------|------------------------|
| | | | | |

<!-- Not yet extracted from raw file. -->

---

## Cross-Reference Summary

### Gene-Gene Interactions

<!-- Not yet analyzed. Run MASTER_ANALYSIS or RISK_ASSESSMENT to populate. -->

### Gene-Lab Concordances

<!-- Not yet analyzed. Run MASTER_ANALYSIS or RISK_ASSESSMENT to populate. -->

### Linked Supplements

<!-- Not yet analyzed. Run SUPPLEMENT_REVIEW to populate. -->

---

## Verification Notes
- rs1801133, rs429358, rs7412, rs1333049, rs6025, rs12248560, and rs4149056 were manually checked against the raw file on 2025-12-10.
- Consumer genotyping array; any variant relevant to a medical decision should be confirmed by clinical testing.
- Star allele calls here are based on single defining SNPs and have not been verified against PharmVar.
