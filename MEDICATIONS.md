---
schema_version: "0.2.0"
type: state
created:    # YYYY-MM-DDTHH:MM:SS±HH:MM
updated:    # YYYY-MM-DDTHH:MM:SS±HH:MM
tags: [medications, prescriptions, active, pharmacogenomics]
---

# Medications

<!--
HOW TO USE THIS FILE:
Copy the template below for each medication. Be as specific as possible — exact dose, frequency,
prescriber, and WHY it was prescribed. The indication is what enables AI analysis to evaluate
whether the medication is doing its job, cross-reference it against your pharmacogenomics, and
catch interactions with your supplement stack.

The Discontinued section matters as much as the Active one. Start and stop dates are what let
pattern analysis correlate medication changes with symptom and biomarker changes over time —
that longitudinal record is where findings live.

Quick-reference allergies live in PROFILE.md → Allergies. Drug-gene flags live in GENETICS.md
→ Pharmacogenomics. This file cross-references both.
-->

## Active

<!--
TEMPLATE — copy this block for each medication:

### [Medication Name (generic name)]
- **Dose:** [amount and unit, e.g., 10mg]
- **Frequency:** [e.g., once daily, twice daily with food, every other day]
- **Route:** [oral, topical, injection, inhaled, etc.]
- **Prescriber:** [provider name and specialty]
- **Indication:** [what it was prescribed for]
- **Started:** YYYY-MM-DD
- **Pharmacy:** [where filled, auto-refill status]
- **PGx notes:** [relevant pharmacogenomic context from GENETICS.md, e.g., "CYP2D6 substrate — I am an intermediate metabolizer" — or "not yet reviewed"]
- **Linked labs:** [biomarkers this medication should move or that monitor its safety, e.g., "LDL-C (efficacy), ALT/AST (safety)"]
- **Linked genetics:** [rsID or gene name, if relevant]
- **Notes:** [side effects observed, dose changes, anything relevant]
-->

## As Needed (PRN)

<!--
Medications taken occasionally: rescue inhalers, antihistamines, pain relievers, sleep aids.
Use the same template. Add a "Typical usage" line (e.g., "2-3 times per month during allergy season").
Frequency-of-use patterns are analytically valuable — log notable usage in symptoms/ or journal/.
-->

## Discontinued

<!--
TEMPLATE — copy this block for each discontinued medication:

### [Medication Name (generic name)]
- **Dose was:** [amount]
- **Frequency was:** [schedule]
- **Prescriber:** [provider]
- **Indication:** [what it was for]
- **Started:** YYYY-MM-DD
- **Stopped:** YYYY-MM-DD
- **Reason for stopping:** [resolved, side effects, replaced by X, ineffective, provider decision]
- **Linked entries:** [path to relevant symptoms/ or journal/ entries, if any]
-->

## Interactions & Contraindications

<!--
Documented interactions relevant to YOUR current regimen — medication-medication,
medication-supplement, and medication-gene. Populated by analysis skills and verified
with your prescriber or pharmacist.

Example:
- [Medication] + [Supplement]: [interaction mechanism and what to do about it — source]
-->

## Notes

<!--
Anything else: adherence patterns, timing constraints, insurance/prior-auth context,
questions for the prescriber (also queue those in DOCTOR_QS.md).
-->
