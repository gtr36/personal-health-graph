---
schema_version: "0.3.0"
type: state
created: 2025-09-28T20:15:00-06:00
updated: 2026-06-10T17:30:00-06:00
tags: [doctor, questions, visits, providers, sample]
---

<!-- FICTIONAL DEMO DATA — Sam Rivera is not a real person. -->

# Doctor Questions & Visit Log

## Queued Questions

### For PCP (next visit)
- [ ] ApoB has gone up on every panel despite the statin (92 → 101 → 108). Should we switch statins or add something? (added 2026-05-19)
- [ ] Muscle aches on and off since February, both legs, not tied to workouts. Could these be statin-related? (added 2026-05-19)

### For Cardiology (Dr. Webb, follow-up after CAC result)
- [x] Should I get a CAC score? (added 2026-05-24; asked 2026-06-10; CAC scan ordered, result pending)
- [ ] If the CAC comes back non-zero, what changes? (added 2026-06-10)

## Visit Log

### 2025-06-20 — Dr. Elena Chen, New Patient Physical
- **Provider:** Dr. Elena Chen, internal medicine
- **Type:** New patient physical
- **Key findings:** Office BP elevated (138/88 average across the visit, similar at a prior nurse visit). Diagnosed mild essential hypertension. Discussed recurring migraines (1-3/month); no preventive therapy for now, PRN ibuprofen. Family history of premature MI noted.
- **Labs ordered:** Fasting metabolic, lipid, CBC, TSH, vitamin D (drawn 2025-10-12 after some procrastination)
- **Imaging ordered:** None
- **Prescriptions:** Lisinopril 10mg daily, started same day
- **Referrals:** None
- **Action items:** Buy a home BP cuff and log readings (not started until June 2026); get labs drawn
- **Follow-up:** Lab review visit once results in
- **Linked files:** integrations/labs/quest_2025-10-12.md, MEDICATIONS.md

### 2026-01-05 — Dr. Elena Chen, Lab Review / Lipid Discussion
- **Provider:** Dr. Elena Chen, internal medicine
- **Type:** Follow-up (telehealth)
- **Key findings:** Reviewed October panel. LDL-C 128, ApoB 92, vitamin D low (already supplementing since November). Given family history of premature MI, shared decision to start a moderate-intensity statin. BP doing well on lisinopril per office check in December.
- **Labs ordered:** Repeat lipids plus ALT in ~4 months (drawn 2026-05-15)
- **Imaging ordered:** None
- **Prescriptions:** Atorvastatin 20mg daily, evening (filled and started 2026-01-10)
- **Referrals:** Cardiology mentioned as an option if we want a more aggressive prevention workup
- **Action items:** Start atorvastatin; continue D3; recheck labs in spring
- **Follow-up:** After spring labs
- **Linked files:** integrations/labs/quest_2025-10-12.md, MEDICATIONS.md, integrations/labs/quest_2026-05-15.md

### 2026-06-10 — Dr. Marcus Webb, Cardiology Consult
- **Provider:** Dr. Marcus Webb, cardiology (Rocky Mountain Cardiology)
- **Type:** Specialist consult (first visit; self-requested referral via Dr. Chen's office in May)
- **Key findings:** Reviewed full lipid history, family history (father MI at 52), and the January Lp(a) of 78 nmol/L. Agreed a coronary artery calcium score would clarify risk before intensifying therapy. Discussed possible next steps depending on result (higher-intensity statin, ezetimibe). Emphasized starting a consistent home BP log.
- **Labs ordered:** None new
- **Imaging ordered:** CAC scan (scheduled late June; result pending as of last update)
- **Prescriptions:** No changes
- **Referrals:** None
- **Action items:** Get CAC scan done; log home BP 2-3x/week (started 2026-06-01 in anticipation); bring wearable sleep data to follow-up
- **Follow-up:** After CAC result, target September 2026
- **Linked files:** LABS_HISTORY.md, integrations/vitals/2026-06.md, PROFILE.md
