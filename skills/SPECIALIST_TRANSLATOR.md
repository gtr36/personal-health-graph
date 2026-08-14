---
schema_version: "0.3.0"
type: skill
name: Specialist Translator
description: Render the health graph through a named specialist's lens and produce a handoff brief in the format that specialty actually uses, with ICD-10 codes where appropriate.
reads:
  - PROFILE.md
  - MEDICATIONS.md
  - SUPPLEMENTS.md
  - LABS_HISTORY.md
  - GENETICS.md
  - DOCTOR_QS.md
  - TIMELINE.md
  - symptoms/*.md
  - journal/*.md
  - integrations/* (the subset relevant to the specialty)
external_context:
  - ICD-10 code lookup (via connector, if available)
  - NPI Registry (verify specialist credentials, if available)
default_range: relevant history (specialty-dependent; full history for first visits)
output_format: specialty-formatted handoff brief
saves_to: reports/specialist_brief_[specialty]_YYYY-MM-DD.md (also .docx via connector)
---

# Skill: Specialist Translator

## Purpose

Patients describe symptoms in patient language; specialists consume information in the structure of their specialty. The gap between "I've been getting these weird hives and I'm exhausted all the time" and a usable immunology intake is the reason the first fifteen minutes of most specialist visits are spent reconstructing history instead of using it.

This skill translates. Same graph, different lens per specialty, output in the shape the receiving clinician expects: chief complaint framing, relevant history only, medications with doses, pertinent negatives stated, timeline of the presenting problem, and the patient's actual questions. DOCTOR_PREP produces a general visit brief; this skill produces a specialty-native document.

## Instructions for LLM

### Step 1: Establish the target

- Which specialty, and if known, which specific clinician and visit date
- First visit or follow-up (first visits get fuller history; follow-ups get interval changes)
- The presenting question: what is this visit trying to resolve

### Step 2: Apply the specialty lens

Select data by relevance to the specialty, not by recency alone. The lens table:

| Specialty | Leads with | Pull from | Pertinent negatives to state |
|-----------|-----------|-----------|------------------------------|
| Immunology / Allergy | Symptom episodes with triggers, timing, morphology | symptoms/, journal/ (exposures, foods), labs (IgE, CBC diff, tryptase if present), MEDICATIONS (antihistamine response) | Anaphylaxis, angioedema, family atopy |
| Cardiology | Risk factor profile, lipid trends, BP trend, family history | LABS_HISTORY (lipids, ApoB, Lp(a), hs-CRP), vitals/ (BP trend), GENETICS (cardiovascular section), wearable (resting HR, exercise tolerance) | Chest pain, syncope, dyspnea, palpitations |
| OB-GYN / Fertility | Cycle history, hormonal timeline | cycle/, LABS_HISTORY (hormonal panel with cycle-day context), MEDICATIONS, relevant PROFILE reproductive history | Pregnancy history, contraception, cycle regularity |
| Psychiatry / Psychology | Symptom course, functional impact, treatment response | assessments/ (instrument scores over time), journal/ (mood patterns, sleep), MEDICATIONS (psychiatric history and response), sleep data | Suicidality screen status, prior hospitalizations |
| Endocrinology | Metabolic and hormonal trends | LABS_HISTORY (thyroid, HbA1c, hormones), cgm/, vitals/ (weight trend), MEDICATIONS | Weight change, heat/cold intolerance, fatigue pattern |
| Gastroenterology | Symptom-food-timing relationships | symptoms/ (GI entries), nutrition/, microbiome/, MEDICATIONS (PPI/NSAID history) | Bleeding, weight loss, family GI cancer |
| Sleep medicine | Objective sleep data and its history | wearable_daily/ (duration, consistency, HRV), journal/ (sleep complaints), assessments/ (PSQI/ESS if present), MEDICATIONS/SUPPLEMENTS (sedating agents) | Snoring/apnea report, restless legs, driving drowsiness |
| Dermatology | Lesion/eruption timeline with exposures | symptoms/ (with photos noted if archived in raw/), SUPPLEMENTS and MEDICATIONS (new agents before onset) | Systemic symptoms, photosensitivity |
| New PCP | Complete structured history | Everything, compressed | — |

For specialties not in the table, reason by analogy: what does this specialty treat, which files carry that signal, what would they ask about that the data can answer preemptively.

### Step 3: Build the timeline of the presenting problem

From TIMELINE.md and source files: onset, course, interventions tried and their effect, and every temporal relationship relevant to the specialty (symptom onset vs medication start, episode clustering vs cycle phase, seasonal pattern). Dates, not "a while ago."

### Step 4: Tag with codes (if connector available)

If an ICD-10 connector is available, tag documented diagnoses and presenting symptoms with codes, marked clearly as draft codes for the clinician's confirmation. Never invent diagnoses to make a code fit; symptoms get symptom codes, not disease codes.

### Step 5: Generate the brief

```
# [Specialty] Brief — [Patient name]
Prepared: [date] | For: [clinician if known] | Visit type: [first visit / follow-up]
Prepared by: Personal Health Graph (patient-generated from structured health records)

## Reason for visit
[2-3 sentences: the presenting question, in clinical framing]

## History of presenting problem
[Chronological narrative with dates. Onset, character, frequency, severity, what worsens
and relieves, interventions tried with response. This is the section that saves the visit.]

## Relevant history
[Only what this specialty needs: conditions, surgeries, family history relevant to the lens]

## Current medications & supplements
[Complete list with doses — complete regardless of specialty, because interactions do not
respect specialty boundaries. Flag anything started near symptom onset.]

## Relevant data
[The specialty-lens data: trends, scores, measurements. Tables where the specialty expects
tables. Source and date on every value.]

## Pertinent negatives
[The absences this specialty will ask about, stated explicitly]

## Patient questions
[From DOCTOR_QS.md, prioritized]

## Draft codes (for clinician confirmation)
[ICD-10 tags if connector available, clearly marked as draft]

## Source note
All data patient-reported or patient-collected; sources available on request.
```

## Important notes

- **Respect the reader's time above all.** A specialist brief longer than two pages will not be read. Compress ruthlessly; the full graph exists if they want more.
- **State pertinent negatives.** "No anaphylaxis, no angioedema" saves a specialist three questions. Omitting negatives is the most common patient-summary failure.
- **Complete medication list always.** Specialty filtering applies to history and data, never to the medication and supplement list.
- **Never diagnose in the brief.** The document organizes evidence and asks questions. "Recurrent urticaria episodes" is reporting; "chronic idiopathic urticaria" is a diagnosis and belongs to the clinician unless already formally diagnosed.
- **Consumer data disclaimer where it matters.** Wearable and consumer-genetic data should be labeled as such; clinicians weight data by its source, and honesty about provenance builds trust in the rest of the document.
- **Pair with PHYSICIAN_REPORT** when the output should become a formatted document (Word, Notion, Gamma) rather than markdown.
