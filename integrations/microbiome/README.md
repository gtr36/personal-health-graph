# Microbiome Data — Integration Guide

## What goes here
Results from gut microbiome testing services: Viome, Thorne Gut Health Test, Biomesight, Ombre, Tiny Health, clinical stool analyses (GI-MAP, Genova GI Effects), SIBO breath tests, etc.

## How to structure a microbiome result file

Name the file by provider and date: `viome_2026-03-10.md`, `biomesight_2025-12-01.md`

```markdown
---
schema_version: "0.1.0"
type: integration
tier: summary
source: "[Provider]"
test_date: YYYY-MM-DD
sample_type: stool | breath | other
tags: [microbiome, provider-name, YYYY-MM]
---

# Microbiome Results — [Provider], [Date]

## Test Info
- **Provider:** [Viome, Biomesight, clinical, etc.]
- **Test type:** [16S rRNA, shotgun metagenomic, metatranscriptomic (RNA), breath test, etc.]
- **Sample date:** YYYY-MM-DD
- **Source file:** raw/microbiome/[filename]

## Summary Scores
<!-- Platform-provided summary scores or classifications -->
<!-- Example: Gut Health Score: 72/100, Inflammatory Activity: Low, Digestive Efficiency: Good -->

## Key Findings
<!-- Notable results: low diversity, overgrowth, missing beneficial species, etc. -->

## Dietary Recommendations (from platform)
<!-- What the platform recommended — capture this even if you don't follow it -->

## Supplement Recommendations (from platform)
<!-- Cross-reference with SUPPLEMENTS.md -->

## Linked Files
- SUPPLEMENTS.md → any probiotics or gut-targeted supplements
- PROTOCOLS.md → dietary framework
- symptoms/ → any GI-related symptom entries

## Notes
<!-- Dietary context at time of test, recent antibiotics, travel, illness, etc. -->
```

## How to get your data

### Viome
1. Log in at viome.com
2. Navigate to Results
3. Download or screenshot your results
4. Store raw report in `raw/microbiome/`

### Biomesight
1. Log in at biomesight.com
2. Navigate to Results → Export
3. Download CSV or PDF
4. Store in `raw/microbiome/`

### Clinical stool analysis (GI-MAP, Doctor's Data, Genova)
1. Get the full report from your provider
2. Store the PDF in `raw/microbiome/`
3. Create a markdown summary here

## Sequencing methods — what they actually measure

Understanding the method matters because it determines what your results can tell you:

- **16S rRNA gene sequencing** (Biomesight, Ombre, most clinical labs): Sequences a single bacterial gene to identify which species are present and their relative abundance. Cannot detect fungi, viruses, or assess functional activity. Cost-effective for composition tracking.
- **Shotgun metagenomic sequencing** (some Thorne panels, research-grade): Sequences all DNA in the sample. Identifies bacteria, fungi, viruses, and archaea. Can infer functional pathways (what the microbes *can* do). More comprehensive but more expensive.
- **Metatranscriptomic sequencing** (Viome): Sequences RNA, not DNA. Measures which genes are actively being expressed — what the microbes *are actually doing* right now. This is a fundamentally different measurement than DNA-based methods. Viome results are not directly comparable to 16S or metagenomic results.
- **Culture-based testing** (some clinical stool tests): Grows specific organisms in the lab. Gold standard for identifying specific pathogens but misses the vast majority of gut organisms that don't grow in standard culture conditions.

**Results from different sequencing methods are not interchangeable.** When tracking longitudinally, use the same provider and method each time.

## Notes
- Microbiome composition varies significantly day-to-day and with diet. Single snapshots have limited clinical utility but are valuable for tracking trends over time.
- If you test multiple times, name files chronologically and note dietary context at time of each test.
- Cross-reference findings with symptom logs (especially GI-related entries) for the best analysis.
- uBiome (formerly a popular consumer service) shut down in 2019 and its CEO was indicted for fraud. If you have legacy uBiome data, it can still be stored in `raw/microbiome/` for historical reference, but the company no longer operates.
