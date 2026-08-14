# Genetic Data — Integration Guide

## What goes here
Summaries and structured extracts from genetic testing platforms: 23andMe, AncestryDNA, Nebula Genomics, whole genome/exome sequencing, clinical genetic panels, pharmacogenomic reports, etc.

For a consolidated view of clinically significant variants, see `GENETICS.md` in the root directory.

## Data types

### Raw genotype data
Store in `raw/genetics/`. This is the file you download from your platform:
- **23andMe:** `genome_[Name]_v5_Full_[date].txt` (tab-separated, ~630K SNPs)
- **AncestryDNA:** `AncestryDNA.txt` (tab-separated, ~700K SNPs)
- **Nebula Genomics:** VCF or BAM files (whole genome)
- **Clinical panels:** PDF reports from genetic counselors

### Summary files (this directory)
Create markdown summaries of key findings. One file per platform or analysis type.

## How to structure a genetic summary file

```markdown
---
schema_version: "0.1.0"
type: integration
tier: summary
source: "[Platform] ([chip version or sequencing type])"
test_date: YYYY-MM-DD
genome_build: GRCh37 | GRCh38
tags: [genetics, platform-name]
---

# Genetic Summary — [Platform]

## Platform Info
- **Service:** [23andMe, AncestryDNA, Nebula, clinical, etc.]
- **Test type:** [Genotyping array, WGS, WES, clinical panel]
- **Chip/version:** [e.g., Illumina GSA v5, 630K SNPs]
- **Genome build:** [GRCh37/hg19 or GRCh38/hg38]
- **Raw file:** raw/genetics/[filename]

## Key Findings
<!-- High-level summary of clinically significant results -->

## Pharmacogenomics
<!-- Drug metabolism variants — critical for medication safety -->
<!-- Example: CYP2D6 *1/*4 — Intermediate metabolizer -->

## Carrier Status
<!-- Recessive disease carrier variants, if tested -->

## Notes
<!-- Anything relevant: known limitations of the platform, variants that need clinical confirmation -->
```

## How to get your data

### 23andMe
1. Log in and find the raw data download under your account or data settings (currently Settings, then 23andMe Data, then Download Your Data)
2. Submit the download request, confirm via email, then download the .txt file
3. Store in `raw/genetics/`
4. The raw file can be analyzed by any LLM to extract clinically significant variants

> **Note:** Consumer genetic platforms may change ownership, pricing, or data access policies over time. As a general best practice, download your raw data file as soon as it's available — once you have it locally, it's yours regardless of what happens to the platform. Archive the file in `integrations/raw/genetics/` promptly; that local archive is the durable copy. Third-party tools like Promethease, SelfDecode, and Genetic Genie can also analyze raw genotype files from most consumer platforms.

### AncestryDNA
1. Log in and find the raw data download under your DNA settings (currently DNA, then Settings, then Download Raw DNA Data)
2. Confirm via email, download the .txt file
3. Store in `raw/genetics/`

### Nebula Genomics
1. Log in at nebula.org and find the download option in your results or account area (currently Results, then Download)
2. Download VCF or report files
3. Store in `raw/genetics/`

### SelfDecode
1. Upload your raw genotype file from 23andMe, AncestryDNA, or other platforms
2. Download health reports and raw analysis
3. Store in `raw/genetics/`

### Dante Labs / Sequencing.com
1. If you ordered WGS through Dante Labs or Sequencing.com, download VCF files
2. These are full genome sequences (~3 billion base pairs vs. ~630K SNPs from arrays)
3. Store in `raw/genetics/`

### Clinical genetic testing (Invitae, Color, Myriad, etc.)
1. Request your full report from your genetic counselor or the testing company
2. Store the PDF in `raw/genetics/`
3. Summarize key findings in a markdown file here

## How to analyze raw genetic data with AI

Give your raw genotype file to an LLM along with this prompt:

> "Analyze this raw genetic data file. Identify clinically significant variants across these categories: methylation (MTHFR, COMT, etc.), cardiovascular (APOE, APOB, PCSK9, etc.), inflammation (IL6, IL10, TNF, etc.), detoxification (GST, CYP, NAT, etc.), nutrient metabolism (FADS, BCMO1, VDR, etc.), pharmacogenomics (CYP2D6, CYP2C19, etc.), connective tissue (COL, ELN, MMP, etc.), sleep/circadian (CLOCK, CRY, PER, etc.), athletic performance (ACTN3, ACE, etc.), neurological (BDNF, KIBRA, etc.), immune function (HLA, TLR, etc.), and longevity (FOXO3, TERT, etc.). For each variant found, provide: rsID, gene, genotype, clinical significance, and any actionable implications. Include the verbatim line from the raw file for every rsID you report. Before calling any genotype's zygosity or clinical meaning, state which allele is reference and which is alternate at that position and the platform's strand convention; if you cannot confirm reference vs alternate, mark the call 'unverified' rather than interpreting it."

The output should be structured into `GENETICS.md` in the root directory. Before treating those entries as analysis-grade, run the FACT_AUDIT skill's foundation mode (ideally with a different model than the one that populated them) — a single misread call at this step propagates into every downstream analysis while looking perfectly coherent.

## Important notes
- Raw genotype files from consumer platforms (23andMe, Ancestry) use genotyping arrays, not sequencing. They test specific known variants, not your full genome. Absence of a variant in the raw file means it wasn't tested, not that you don't have it.
- Consumer platforms report on the plus (+) strand by convention. Clinical databases (ClinVar, dbSNP) may use different strand orientations. Verify strand before interpreting.
- Variants identified by consumer platforms should be confirmed by clinical-grade testing before making medical decisions.
