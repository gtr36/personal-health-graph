---
schema_version: "0.3.0"
type: state
created: 2025-09-28T19:25:00-06:00
updated: 2026-01-12T18:05:00-07:00
tags: [medications, prescriptions, active, pharmacogenomics, sample]
---

<!-- FICTIONAL DEMO DATA — Sam Rivera is not a real person. -->

# Medications

## Active

### Lisinopril
- **Dose:** 10mg
- **Frequency:** Once daily, morning
- **Route:** Oral
- **Prescriber:** Dr. Elena Chen, internal medicine (PCP)
- **Indication:** Essential hypertension (diagnosed 2025-06-20; confirmed on repeat office readings averaging 138/88)
- **Started:** 2025-06-20
- **Pharmacy:** King Soopers Pharmacy, Denver; auto-refill on
- **PGx notes:** Not yet reviewed
- **Linked labs:** Home BP readings (efficacy: integrations/vitals/); potassium and creatinine (safety: LABS_HISTORY.md)
- **Linked genetics:** Not yet reviewed
- **Notes:** No cough or dizziness observed. No dose changes since start.

### Atorvastatin
- **Dose:** 20mg
- **Frequency:** Once daily, evening
- **Route:** Oral
- **Prescriber:** Dr. Elena Chen, internal medicine (PCP)
- **Indication:** Primary prevention: family history of premature MI (father, age 52) plus lipid panel review at 2026-01-05 visit (LDL-C 128 mg/dL on 2025-10-12 panel)
- **Started:** 2026-01-10
- **Pharmacy:** King Soopers Pharmacy, Denver; auto-refill on
- **PGx notes:** Not yet reviewed
- **Linked labs:** LDL-C and ApoB (efficacy), ALT (safety); see LABS_HISTORY.md
- **Linked genetics:** Not yet reviewed
- **Notes:** No dose changes since start. Repeat lipids drawn 2026-05-15.

## As Needed (PRN)

### Ibuprofen
- **Dose:** 400mg
- **Frequency:** PRN
- **Route:** Oral
- **Prescriber:** OTC
- **Indication:** Migraine attacks; occasional aches
- **Started:** Longstanding
- **Typical usage:** 2-4 times per month, almost always for migraines (see symptoms/)
- **PGx notes:** Not yet reviewed
- **Linked labs:** None
- **Notes:** Works within 1-2 hours for most attacks when taken early.

## Discontinued

- None

## Interactions & Contraindications

<!-- None documented yet. Run an analysis skill to populate, then verify with prescriber or pharmacist. -->

## Notes

- Adherence is good; both prescriptions on the same auto-refill cycle.
- Evening atorvastatin dose is taken with the evening supplement stack (see SUPPLEMENTS.md).
