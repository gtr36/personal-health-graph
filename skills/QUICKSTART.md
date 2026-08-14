---
schema_version: "0.1.0"
type: skill
name: Quickstart
description: Guided onboarding wizard. Walks a new user through populating their Personal Health Graph in three progressive tiers — from a 15-minute quick start to a full baseline build.
reads:
  - PROFILE.md
  - SUPPLEMENTS.md
  - PROTOCOLS.md
  - DOCTOR_QS.md
  - LABS_HISTORY.md
  - GENETICS.md
  - EXPENSES.md
writes:
  - PROFILE.md
  - SUPPLEMENTS.md
  - PROTOCOLS.md
  - DOCTOR_QS.md
  - LABS_HISTORY.md
  - GENETICS.md
  - EXPENSES.md
  - integrations/labs/*.md
  - integrations/genetics/*.md
  - integrations/wearable_daily/*.md
  - integrations/imaging/*.md
  - integrations/microbiome/*.md
  - integrations/assessments/*.md
  - integrations/cycle/*.md
  - symptoms/*.md
  - journal/*.md
trigger: first time using Personal Health Graph, or when PROFILE.md is empty
output: populated PHG files at the user's chosen depth level
---

# Skill: Quickstart (Guided Onboarding)

## Purpose
Walk a new user through setting up their Personal Health Graph interactively. Instead of staring at 30+ blank template files and wondering where to start, the user pastes this skill into any LLM and has a guided conversation that fills their files progressively.

**The cold start problem is real.** Consolidating a health history takes effort. This skill makes that effort efficient by asking the right questions in the right order, writing files in real time, and delivering value at each stage so the user is motivated to continue.

## Before you start: gather your files

If you have existing health documents (lab PDFs, genetic reports, wearable exports, medical records), drop them all into the `inbox/` folder first. Then run `skills/INTAKE.md` — it will scan, classify, extract, and file everything automatically. This can populate a large portion of your health graph before you answer a single question.

After INTAKE has run, come back to this skill. It will detect what's already populated and skip those sections, picking up wherever gaps remain.

If you don't have files ready, that's fine — start here and the guided conversation will build your graph from scratch.

## Design principles
- **Value at every stop.** Each tier produces a usable output. A user who completes only Tier 1 still has a functional PHG that powers SUPPLEMENT_REVIEW and DOCTOR_PREP.
- **Don't ask what you can infer.** If the user uploads a lab PDF, extract everything — don't ask them to transcribe it.
- **Progressive depth, not progressive complexity.** Tier 3 asks for more data, not harder questions.
- **Conversational, not form-like.** Ask questions naturally. Group related questions. Don't make it feel like a medical intake form.

## Instructions for LLM

When a user initiates this skill (or when you detect that PROFILE.md is empty), begin with this introduction:

---

**Say to the user:**

> "Let's set up your Personal Health Graph. I'll walk you through this in stages — you can stop at any point and pick up later. Everything we build is stored locally in your files.
>
> **Tier 1 (~15 min):** Your health profile and supplement stack. Enough to run basic analysis.
> **Tier 2 (~30-60 min):** Lab results import. This is where it gets powerful.
> **Tier 3 (~1-3 hours):** Genetics, wearable data, imaging, microbiome. Full depth.
>
> Ready to start with Tier 1?"

---

### Tier 1: Profile & Supplements (~15 minutes)

**Goal:** Populate PROFILE.md and SUPPLEMENTS.md from conversation. These two files alone enable SUPPLEMENT_REVIEW, DOCTOR_PREP, and partial HEALTH_MEMO.

#### 1A: Demographics & basics
Ask conversationally (group these, don't ask one at a time):
- Age / date of birth
- Sex (biological — relevant for reference ranges and risk calculators)
- Height, weight
- Location (city/state — relevant for provider searches and environmental factors)

**Write to:** PROFILE.md → Demographics section

#### 1B: Medical history
Ask in natural language, then structure the answers:
- "Do you have any diagnosed medical conditions? This includes anything a doctor has formally diagnosed — chronic conditions, past surgeries, mental health diagnoses, resolved conditions."
- "Any allergies? Medications, foods, environmental."
- "What medications are you currently taking? Include dose and frequency if you know them."
- "Any significant family medical history? Parents, siblings, grandparents — particularly heart disease, cancer, diabetes, autoimmune conditions, neurological conditions."

**Write to:** PROFILE.md → Conditions, Allergies, Medications, Family History sections

#### 1C: Providers
- "Who are your current healthcare providers? Primary care doctor, specialists, therapists, dentist — anyone you see regularly."

**Write to:** PROFILE.md → Providers section

#### 1D: Supplements
Walk through the current stack:
- "What supplements do you currently take? Let's go through them one at a time. For each one, I'll ask: the dose, when you take it, the brand if you know it, and why you started taking it."

For each supplement:
- Name → if the user gives a vague name (e.g., "fish oil"), ask for the specific form and dose (e.g., "EPA/DHA? What mg?")
- Dose and timing
- Brand (okay to leave blank)
- Reason for taking (okay to say "general health" or "someone recommended it")
- How long they've been taking it

**Write to:** SUPPLEMENTS.md → appropriate time block (Morning, Evening, etc.)

#### 1E: Goals
- "What are you trying to optimize for? Common goals include: longevity, athletic performance, cognitive performance, managing a specific condition, general wellness, weight management, sleep quality. What matters most to you?"

**Write to:** PROFILE.md → Goals section

#### Tier 1 checkpoint

**Say to the user:**

> "Your health profile and supplement stack are set up. Here's what you can do right now:
>
> - **SUPPLEMENT_REVIEW** — I can evaluate your current stack and flag anything that's unsupported, redundant, or potentially interacting.
> - **DOCTOR_PREP** — Before your next appointment, I can generate a structured brief with your full medication list, supplement stack, and queued questions.
>
> Want to run either of those now, or continue to Tier 2 (lab import)?"

---

### Tier 2: Lab Results (~30-60 minutes)

**Goal:** Import at least one lab panel into LABS_HISTORY.md. This unlocks MASTER_ANALYSIS, RISK_ASSESSMENT, and evidence-based SUPPLEMENT_REVIEW.

#### 2A: Identify available lab data
- "Do you have lab results available? This could be PDFs from your doctor's patient portal (Epic MyChart, etc.), results from Function Health, Quest, LabCorp, InsideTracker, or any other source. Even a photo or screenshot of a printout works."
- "How many separate lab panels do you have? Don't worry about getting them all now — even one panel is valuable. We can add more later."

#### 2B: Import labs
**If the user can upload a PDF or image:**
- Extract all biomarker values automatically
- Confirm extraction accuracy with the user: "I found [X] biomarkers from this panel. Here are the flagged values: [list]. Does this look correct?"
- Create an integration file: `integrations/labs/[provider]_[date].md`
- Populate LABS_HISTORY.md with the values

**If the user can paste text or read values aloud:**
- Walk through a structured extraction: "Read me the biomarker name, value, and whether it's flagged high or low. I'll capture the reference ranges."
- Write to the same files

**If the user has multiple panels:**
- Import them chronologically (oldest first) to build the longitudinal table
- After each panel: "Got it. [X] biomarkers captured. I can see [summary of trends]. Want to add another panel?"

#### 2C: Quick annotation
After import, scan for:
- Any out-of-range values → ask the user: "Your [biomarker] is [value], which is [high/low]. Do you know why this might be? Any relevant context — medication, recent illness, fasting status?"
- Add context to LABS_HISTORY.md annotations

#### 2D: Current protocols
Now that we have health data flowing, capture routines:
- "Let's quickly capture your current routines. What does a typical day look like for exercise? Nutrition approach? Sleep habits?"
- Brief, not exhaustive — enough for PATTERN_DETECTION to have context

**Write to:** PROTOCOLS.md

#### Tier 2 checkpoint

**Say to the user:**

> "Lab data imported. Here's what's now available:
>
> - **RISK_ASSESSMENT** — I can calculate your cardiovascular risk scores (ASCVD, Framingham) and flag any biomarker trends that need attention.
> - **MASTER_ANALYSIS** — If you add genetic data (Tier 3), I can cross-reference your labs with genetic predispositions for a comprehensive analysis.
> - **BASELINE_REPORT** — I can generate a full baseline assessment with gap analysis and a 90-day roadmap.
>
> Want to run BASELINE_REPORT now? It'll show you exactly what data you have, what's missing, and what to prioritize next."

**Recommendation:** Run BASELINE_REPORT at this point. It gives the user a clear picture of their data completeness and creates natural motivation to continue to Tier 3.

---

### Tier 3: Full Depth (~1-3 hours)

**Goal:** Import genetic data, connect wearable history, add imaging and microbiome results. This is the long session — most users will do this in multiple sittings.

#### 3A: Genetic data
- "Do you have genetic data? Common sources: 23andMe, AncestryDNA, Nebula Genomics, or clinical genetic testing."

**If raw genotype file available:**
- Analyze the raw file directly using the methodology in MASTER_ANALYSIS Phase 2
- Query all 12 categories in GENETICS.md
- Determine APOE haplotype, pharmacogenomic star alleles, HFE status
- Write to GENETICS.md and create integration summary in `integrations/genetics/`

**If only platform summary available:**
- Extract key findings from the platform report
- Note that raw file analysis would provide deeper insights
- Write what's available to GENETICS.md

**If no genetic data:**
- Note in GENETICS.md that testing hasn't been performed
- Recommend specific platforms based on the user's goals:
  - General health optimization: 23andMe or AncestryDNA (affordable, broad coverage)
  - Deep analysis: Nebula Genomics (whole genome)
  - Pharmacogenomics specifically: clinical PGx panel via provider
- Note: consumer genetics platforms change ownership and access policies over time. Whatever platform you use, download your raw data file promptly and archive it in integrations/raw/genetics/ (see integrations/genetics/README.md).

#### 3B: Wearable data
- "Do you use a wearable? WHOOP, Oura Ring, Apple Watch, Garmin, Fitbit?"

**If yes:**
- Guide export (platform-specific instructions in `integrations/wearable_daily/README.md`)
- Import available data into `integrations/wearable_daily/`
- Establish baselines (sleep, HRV, resting HR, recovery)
- Note the HRV measurement method (RMSSD vs. SDNN)

**If no:**
- Note in PROFILE.md under Connected Services
- Suggest options if the user is interested, matched to their goals:
  - Sleep optimization: Oura Ring
  - Training load: WHOOP
  - General health + ecosystem: Apple Watch

#### 3C: Imaging
- "Do you have any imaging results? DEXA scans (body composition), coronary artery calcium (CAC) score, MRI, CT, ultrasound?"

**If yes:**
- Import into `integrations/imaging/` following the README template
- DEXA body composition is particularly valuable for BASELINE_REPORT

#### 3D: Microbiome
- "Have you done any gut microbiome testing? Viome, Biomesight, Thorne, or clinical stool analysis?"

**If yes:**
- Import into `integrations/microbiome/` following the README template
- Note the sequencing method (16S, metagenomic, metatranscriptomic)

#### 3E: Mental health history
- "Have you worked with a therapist, psychiatrist, or counselor? Any diagnosed conditions like anxiety, depression, ADHD, or others? Have you done any standardized assessments like the PHQ-9 or GAD-7 — either at a provider visit or on your own?"

**If yes:**
- Update PROFILE.md Mental Health History section
- If assessment scores are available, create entries in `integrations/assessments/`
- Note current treatment (therapy type, frequency, medications)

**If no or prefer not to share:**
- That's completely fine. Note in PROFILE.md that the section was offered. The user can return to it anytime.

#### 3F: Menstrual and fertility tracking
- "Do you track your menstrual cycle? This could be through an app like Clue or Flo, wearable-detected (Oura has cycle tracking), or just mental notes on timing. Cycle data is one of the most information-rich health signals when cross-referenced with labs and wearable data."

**If yes:**
- Guide export from their tracking app (platform-specific instructions in `integrations/cycle/README.md`)
- Create monthly summaries in `integrations/cycle/`
- Update PROFILE.md Reproductive Health section
- Note which hormonal labs should be interpreted relative to cycle day

**If not applicable or no:**
- Skip. Update PROFILE.md Reproductive Health section as N/A if the user confirms.

#### 3G: Dental and vision
- "When was your last dental cleaning and eye exam? Any active issues — cavities, periodontal concerns, prescription changes, dry eye? These are easy to forget but round out your full health picture."

**Write to:** PROFILE.md Dental Health and Vision Health sections

#### 3H: Vaccination record
- "Do you have your vaccination records handy? COVID boosters, flu shots, Tdap, travel vaccines — whatever you have. If not, your doctor's portal (MyChart, etc.) often has this."

**Write to:** PROFILE.md Vaccination Record table

#### 3I: Environmental history
- "A few quick environmental questions: Where have you lived long-term? Any known exposures at work or home — mold, chemicals, heavy metals, old building materials? Do you know your home's water source and air quality?"

**Write to:** PROFILE.md Environmental History section

#### 3J: Historical symptoms and observations
- "Are there any recurring health patterns you've noticed? Things like: 'I always get headaches on Mondays,' 'My energy crashes around 2pm,' 'I sleep poorly after late workouts.' These are the observations that make pattern detection powerful."

**Write to:** `journal/` and/or `symptoms/` as appropriate

#### 3K: Doctor questions
- "Is there anything you've been meaning to ask a doctor but haven't? Questions about your labs, symptoms, medications, family history, anything."

**Write to:** DOCTOR_QS.md

#### Tier 3 checkpoint

**Say to the user:**

> "Your Personal Health Graph is built. Here's your data completeness:
> [Run a quick inventory — list what's populated and what's still empty]
>
> You're now set up for the full suite of analysis skills:
> - **MASTER_ANALYSIS** — comprehensive cross-referencing of labs, genetics, and supplements
> - **HEALTH_MEMO** — narrative health briefing you can share with anyone
> - **RISK_ASSESSMENT** — clinical risk stratification with genetic modifiers
> - **PATTERN_DETECTION** — correlations across all your data sources
>
> Which would you like to run first?"

---

## Resuming an incomplete setup

If the user returns after completing only Tier 1 or Tier 2:

1. Read all existing files to determine what's already populated
2. Identify the next incomplete tier
3. Say: "Welcome back. Last time we completed [Tier X]. You have [summary of what's populated]. Ready to continue with [next tier]?"
4. Pick up where they left off — don't re-ask questions already answered

## Important notes
- **Don't overwhelm.** If the user seems fatigued or uncertain, suggest stopping at the current tier checkpoint and returning later. "You've got a solid foundation. Come back when you're ready for the next level."
- **Validate as you go.** After writing each file, confirm key details: "I've recorded you're taking 5,000 IU Vitamin D3 daily, brand Thorne. That right?"
- **Be honest about data quality.** If the user gives vague answers ("I take some fish oil"), note the vagueness in the file and flag it for follow-up: "I've noted fish oil but without a specific EPA/DHA dose or brand. When you have a chance, check the bottle and we'll update it."
- **Celebrate progress.** After each tier, tell the user what they've unlocked. The transition from "blank files" to "I can run a risk assessment" should feel like a meaningful step.
- **Time estimates are real.** Don't let the conversation balloon. If Tier 1 is taking 30+ minutes, the questions are too granular. Keep it conversational.
- **The first analysis is the hook.** The single best thing you can do after Tier 1 is run SUPPLEMENT_REVIEW and show the user something they didn't know about their own stack. That's what makes them come back for Tier 2.
