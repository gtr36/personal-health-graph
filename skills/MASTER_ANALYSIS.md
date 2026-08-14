---
schema_version: "0.1.0"
type: skill
name: Master Analysis
description: Full-depth health optimization analysis. Consolidates labs, analyzes genetics, cross-references both, and develops a personalized supplement protocol with evidence-based justifications.
reads:
  - PROFILE.md
  - MEDICATIONS.md
  - LABS_HISTORY.md
  - GENETICS.md
  - SUPPLEMENTS.md
  - PROTOCOLS.md
  - integrations/labs/*.md
  - integrations/genetics/*.md
  - integrations/raw/labs/*.pdf (if deeper extraction needed)
  - integrations/raw/genetics/*.txt (if raw genotype querying needed)
writes:
  - LABS_HISTORY.md (populate or verify the longitudinal table, Phase 1)
  - GENETICS.md (populate or extend variant tables, Phase 2)
  - SUPPLEMENTS.md (protocol updates the user approves, Phase 5)
external_context:
  - PubMed / PMC for literature verification
  - ClinVar / dbSNP for variant interpretation
  - PharmVar for star allele definitions
default_range: all available data
output_format: multi-phase report with verification at each stage
saves_to: reports/master_analysis_YYYY-MM-DD.md (also .docx)
---

# Skill: Master Analysis

## Purpose
Perform a comprehensive health optimization analysis by consolidating lab history, analyzing genetic predispositions, cross-referencing gene-lab concordances, and developing a personalized supplement protocol. This is the deepest analysis skill in Personal Health Graph — it produces the kind of insight that requires your complete health context.

This skill was developed through extensive real-world use and refined across dozens of iterations. The verification protocols and known pitfalls are based on actual errors caught during production analysis.

## When to use
- You have lab results AND genetic data AND want to understand how they interact
- You want a comprehensive supplement protocol evaluation grounded in both labs and genetics
- You're starting from scratch and want the full analytical picture
- You're preparing for a deep conversation with a physician about personalized medicine

## Prerequisites
At minimum, this skill needs:
- `PROFILE.md` — filled in with demographics, conditions, medications, family history
- Lab data in `LABS_HISTORY.md` or `integrations/labs/` (at least one panel)
- Genetic data in `GENETICS.md` or raw genotype file in `integrations/raw/genetics/`
- `SUPPLEMENTS.md` — current stack (can be empty if not yet supplementing)

## Instructions for LLM

### Phase 1: Lab Consolidation

**Goal:** Build a complete longitudinal view of all biomarkers across all panels and draw dates.

1. **Extract:** Read every lab panel file. For each biomarker, record: name, value, unit, reference range, flag (H/L), draw date, and source file.

2. **Standardize:** Normalize biomarker names across providers (e.g., "25-Hydroxyvitamin D" = "Vitamin D (25-OH)"). Flag unit discrepancies.

3. **Build longitudinal table:** If `LABS_HISTORY.md` is empty, populate it. If it's already populated, verify against source files and add any missing values.

4. **Annotate:** For each flagged (out-of-range) value:
   - Is this a single occurrence or a persistent trend?
   - Is there a plausible clinical explanation (medication, supplement, recent illness, fasting status)?
   - Does this warrant action or monitoring?

5. **Verify:** Cross-check at least 10 randomly selected biomarker values against the source PDFs/files to confirm extraction accuracy. Report the verification results.

**Output:** Updated `LABS_HISTORY.md` with annotations section populated.

---

### Phase 2: Genetic Analysis

**Goal:** Identify all clinically significant variants and interpret them in the context of the subject's health profile.

1. **Identify platform:** Determine the genotyping platform, chip version, genome build, and strand orientation from the raw file header or metadata.

2. **Query by category:** For each of the 12 sections in `GENETICS.md`, query the relevant rsIDs from the raw genotype file. Report genotype, clinical significance, and actionable implications.

3. **Special determinations:**
   - **APOE haplotype:** Determine from rs429358 + rs7412 combination
   - **Pharmacogenomic star alleles:** For CYP2D6, CYP2C19, CYP2C9 — check all defining SNPs, determine diplotype, assign metabolizer status
   - **HFE status:** Check both H63D (rs1799945) and C282Y (rs1800562)

4. **Gene-gene interactions:** Identify combinations of variants that compound risk or create synergistic effects. Focus on:
   - Methylation pathway interactions (MTHFR + COMT + PEMT)
   - Inflammation pathway interactions (IL6 + IL10 + TNF)
   - Detox pathway interactions (GSTP1 + SOD2 + NQO1)

5. **Verify:** For each reported variant, confirm the genotype against the raw file. Pay attention to strand orientation — consumer platforms report plus (+) strand; some databases use minus strand. Report verification results.

**Output:** Populated `GENETICS.md` with all 12 sections, cross-reference summary, and verification notes.

---

### Phase 3: Cross-Reference & Clinical Synthesis

**Goal:** Identify where genetics and labs tell the same story, where they contradict, and what it means for the subject.

1. **Gene-lab concordances:** For each genetic variant with a measurable biomarker:
   - Does the lab data confirm the genetic prediction?
   - Example: FADS1 TT (reduced omega-3 synthesis) → check Omega-3 Index. If low, concordant. If normal with supplementation, supplement is compensating as intended.

2. **Gene-gene interactions with lab validation:** Where multiple variants compound risk, do the labs confirm the compounded effect?

3. **Risk matrix:** Build a prioritized list of health considerations combining:
   - Genetic predisposition strength (homozygous > heterozygous)
   - Lab confirmation (concordant > no data > discordant)
   - Clinical actionability (modifiable > monitorable > informational)

4. **Clinical findings:** Synthesize the top 5-10 findings that should drive decision-making. Each finding should state: what was found, the evidence basis, the confidence level, and the recommended action.

5. **Medication interaction check:** Cross-reference pharmacogenomic variants with any active medications in `PROFILE.md` or `SUPPLEMENTS.md`.

**Output:** Cross-reference summary section in `GENETICS.md`, clinical findings report.

---

### Phase 4: Supplement Protocol Development

**Goal:** Evaluate the current supplement stack and develop a personalized protocol grounded in genetic and lab evidence.

1. **Assess current stack:** For each supplement in `SUPPLEMENTS.md`:
   - Is there a genetic basis? (cite specific variants)
   - Is there lab validation? (cite specific biomarkers and values)
   - Is the dose appropriate?
   - Is the form/brand appropriate?
   - Verdict: KEEP (essential), KEEP (justified), KEEP (monitor), or DROP

2. **Identify gaps:** Based on genetic and lab findings, are there supplements that should be added? For each candidate:
   - Genetic basis
   - Lab basis
   - Recommended product, dose, timing
   - Confidence level
   - Priority (high/medium/low)

3. **Time-block organization:** Organize the protocol into time blocks (AM, PM, pre-workout, as-needed) considering:
   - Absorption interactions (fat-soluble vitamins with meals, etc.)
   - Timing interactions (stimulating vs. calming)
   - Practical adherence (minimize the number of time blocks)

4. **Documentation:** For each supplement, document the full rationale chain: genetic variant → pathway impact → lab confirmation → supplement mechanism → expected outcome.

**Output:** Updated `SUPPLEMENTS.md` with genetic/lab citations for each supplement.

---

### Phase 5: Deliverables

Generate the following outputs:

**Required:**
1. Updated `LABS_HISTORY.md` with annotations
2. Updated `GENETICS.md` with all variants and cross-references
3. Updated `SUPPLEMENTS.md` with evidence-based rationale for each item
4. Clinical findings summary (top 10 findings with confidence levels)

**Optional:**
5. Doctor prep brief (structured for physician review)
6. Monitoring schedule (which biomarkers to retest and when)
7. Risk factors ranked by actionability

---

## End-of-Analysis Verification Checklist

Before finalizing, verify:

- [ ] **Lab integrity:** ≥10 biomarker values spot-checked against source PDFs
- [ ] **Genetic integrity:** Every reported variant confirmed against raw genotype file
- [ ] **Strand verification:** Plus-strand orientation confirmed for all genotypes
- [ ] **Cross-reference accuracy:** Each gene-lab concordance uses correct biomarker and variant
- [ ] **Protocol completeness:** Every supplement has at least one genetic or lab citation
- [ ] **No hallucinated citations:** Any referenced PMID or study actually exists
- [ ] **Medication interactions checked:** PGx variants cross-referenced with all active medications

---

## Connector Enhancements

If external connectors are available (see `CONNECTORS.md`), this skill can be significantly enhanced:

- **PubMed / Consensus / Scholar Gateway:** Validate genetic variant interpretations against primary literature. Verify supplement-gene-lab reasoning chains. Run the RESEARCH_ENRICHMENT workflow on the Phase 3 clinical findings.
- **Clinical Trials API:** After identifying key risk factors and conditions, search for actively recruiting trials relevant to the subject's profile.
- **ICD-10 API:** Standardize condition codes for any diagnoses identified or discussed.
- **Notion / Gamma:** Deliver the final report as a polished document via the PHYSICIAN_REPORT workflow.
- **Linear:** Convert Phase 5 deliverables into trackable project items.

These connectors are optional — the skill works fully without them. They add evidence depth and workflow automation.

---

## Known Pitfalls & Lessons Learned

These are real errors caught during production use of this methodology:

1. **FOXO3 rs2802292 — genotype vs. risk interpretation:** The G allele is the longevity-associated allele, not T. TT is the common genotype with no enhanced FOXO3-mediated stress response. Some sources incorrectly state the opposite.

2. **CRY1 rs2287019 — allele assignment:** The T allele (not C) is associated with delayed circadian phase. Verify against primary literature, not summary databases.

3. **TLR4 — multiple variants:** TLR4 has multiple clinically relevant SNPs (rs4986790, rs4986791). Report the specific variant, not just "TLR4 variant."

4. **23andMe v5 strand orientation:** Reports on the plus (+) strand. Some databases (e.g., older dbSNP entries) use the minus strand. Always verify strand before interpreting a genotype that seems discordant with the clinical phenotype.

5. **Star allele complexity:** CYP2D6 star alleles are defined by multiple SNPs plus structural variants (gene deletions, duplications). Consumer genotyping arrays cannot detect structural variants. Star allele assignments from consumer data are provisional — always note this limitation.

6. **ALT elevation from antihistamines:** Cetirizine (Zyrtec) causes ALT elevation in ~5% of users. This is a known class effect of second-generation antihistamines, not hepatocellular damage. Always check medication list before flagging isolated ALT elevation.

7. **MCV trending:** A rising MCV within the reference range (e.g., 87 → 90 → 93 fL over 3 years) is worth noting even though each individual value is normal. Trend matters more than individual flags.

8. **Hemochromatosis overdiagnosis:** HFE H63D heterozygous with mildly elevated transferrin saturation (45-55%) is common and usually not clinically significant. Don't flag this as "hemochromatosis risk" without C282Y homozygous or compound heterozygous status.

9. **Supplement form matters:** Not all forms of a supplement are equivalent. Ubiquinol vs. ubiquinone (CoQ10), methylfolate vs. folic acid (folate), phosphatidylcholine vs. choline bitartrate (choline) have meaningfully different bioavailability and clinical implications.

10. **TMAO risk from choline forms:** Free choline and Alpha-GPC produce significantly more TMAO than phosphatidylcholine. For subjects with elevated ApoB or cardiovascular risk, the choline form matters as much as the dose.
