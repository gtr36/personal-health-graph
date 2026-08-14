---
schema_version: "0.2.0"
type: state
created:    # YYYY-MM-DDTHH:MM:SS±HH:MM
updated:    # YYYY-MM-DDTHH:MM:SS±HH:MM
tags: [profile, demographics, conditions, medications, providers]
---

# Health Profile

## Demographics
- **Name:**
- **DOB:**
- **Sex:**
- **Blood type:**
- **Location:**
- **Timezone:**
- **Emergency contact:**

## Active Conditions
<!-- List any diagnosed conditions. Include date of diagnosis and managing provider if known. -->
<!-- Example: Chronic idiopathic urticaria (diagnosed 2023, managed by Dr. Smith, allergist) -->
- None diagnosed

## Allergies
<!-- Include drug allergies, food allergies, and environmental allergies with reaction type. -->
<!-- Example: Penicillin (anaphylaxis), Shellfish (hives), Ragweed (seasonal rhinitis) -->
- None known

## Active Medications
<!-- Full detail lives in MEDICATIONS.md: doses, prescribers, indications, start/stop history, -->
<!-- PGx notes, and interactions. Keep this as a quick-reference pointer. -->
- See MEDICATIONS.md

## Active Supplements
<!-- Brief list here for quick reference. Full detail lives in SUPPLEMENTS.md. -->
- See SUPPLEMENTS.md

## Surgical History
<!-- Include date, procedure, facility, and any ongoing implications. -->
- None

## Family History
<!-- Focus on first-degree relatives. Note conditions, age of onset, and cause of death if known. -->
<!-- This is critical context for genetic risk interpretation and screening decisions. -->
- **Father:**
- **Mother:**
- **Siblings:**
- **Paternal lineage:**
- **Maternal lineage:**

## Mental Health History
<!-- Include diagnosed conditions, treatment history, and current providers. -->
<!-- This section is critical for holistic analysis — mental and physical health are deeply interconnected. -->
<!-- Psychiatric medications are also listed under Active Medications above for drug interaction checks. -->

### Diagnosed Conditions
<!-- Example: Generalized anxiety disorder (diagnosed 2021, managed by Dr. Lee, psychiatrist) -->
<!-- Example: ADHD, inattentive type (diagnosed 2019, managed with medication + coaching) -->
- None diagnosed

### Current Treatment
- **Therapy:** <!-- type (CBT, DBT, EMDR, psychodynamic, etc.), frequency, provider -->
- **Psychiatric medications:** <!-- listed in Active Medications above; note here for context -->
- **Other interventions:** <!-- meditation, support groups, neurofeedback, etc. -->

### Assessment Scores
<!-- Track standardized scores over time. Full assessment history lives in integrations/assessments/. -->
<!-- Example: PHQ-9: 6 (mild, 2026-03-15) | GAD-7: 4 (minimal, 2026-03-15) -->

### History
<!-- Significant history: prior diagnoses, hospitalizations, medication trials, trauma history (as comfortable). -->
<!-- This context shapes how skills interpret symptoms, sleep disruption, and stress-related biomarker changes. -->

## Dental Health
- **Dentist:**
- **Practice:**
- **Last cleaning:**
- **Last x-rays:**
- **Active issues:** <!-- cavities, periodontal disease, TMJ, bruxism, etc. -->
- **Significant history:** <!-- root canals, extractions, implants, orthodontics, amalgam fillings -->
- **Notes:** <!-- grinding/clenching, sensitivity, whitening, etc. -->

## Vision Health
- **Optometrist/Ophthalmologist:**
- **Practice:**
- **Last exam:**
- **Current prescription:** <!-- glasses, contacts, or N/A -->
- **Conditions:** <!-- myopia, astigmatism, dry eye, glaucoma risk, etc. -->
- **Significant history:** <!-- LASIK, cataract surgery, retinal issues, etc. -->
- **Notes:** <!-- screen time habits, blue light management, etc. -->

## Hearing Health
- **Audiologist/ENT:**
- **Last hearing test:**
- **Conditions:** <!-- hearing loss, tinnitus, frequent ear infections, etc. -->
- **Devices:** <!-- hearing aids, custom ear protection, or N/A -->
- **Noise exposure:** <!-- occupational, recreational (concerts, shooting, motorcycles), headphone habits -->
- **Notes:** <!-- HealthKit noise-exposure data lives in integrations/healthkit/ if tracked -->

## Vaccination Record
<!-- Core immunization history. Keep this updated for travel, provider visits, and public health context. -->

| Vaccine | Date | Booster Due | Provider/Location | Notes |
|---------|------|-------------|-------------------|-------|
| <!-- COVID-19 --> | | | | <!-- brand, dose # --> |
| <!-- Influenza --> | | | | <!-- annual --> |
| <!-- Tdap --> | | | | <!-- every 10 years --> |
| <!-- Shingles (Shingrix) --> | | | | <!-- 50+ or immunocompromised --> |
| <!-- Pneumococcal --> | | | | |
| <!-- Hepatitis A --> | | | | |
| <!-- Hepatitis B --> | | | | |
| <!-- MMR --> | | | | |
| <!-- HPV --> | | | | |
| <!-- Meningococcal --> | | | | |
| <!-- Other --> | | | | |

## Reproductive Health
<!-- Relevant for approximately half of all users. Skip or delete if not applicable. -->
<!-- Hormonal data (estradiol, progesterone, LH, FSH, AMH, testosterone) lives in LABS_HISTORY.md. -->
<!-- Cycle tracking data lives in integrations/cycle/ for detailed monthly logs. -->

- **Status:** <!-- premenopausal, perimenopausal, postmenopausal, N/A -->
- **Cycle tracking:** <!-- app or method used (Clue, Flo, Oura, Natural Cycles, BBT, none) -->
- **Average cycle length:** <!-- e.g., 28 days -->
- **Average period duration:** <!-- e.g., 5 days -->
- **Contraception:** <!-- type, brand, start date -->
- **Fertility goals:** <!-- actively trying, future planning, not applicable -->
- **Fertility history:** <!-- pregnancies, births, losses, IVF/IUI, if relevant -->
- **HRT/Hormone therapy:** <!-- type, dose, provider, start date — also listed in Active Medications -->
- **Significant history:** <!-- PCOS, endometriosis, fibroids, ovarian cysts, etc. -->
- **Notes:**

## Environmental History
<!-- Environmental exposures shape long-term health outcomes. This section captures context that -->
<!-- lab trends, symptom patterns, and risk assessments should factor in. -->

### Residential History
<!-- Where you've lived, duration, and any known environmental factors. -->
<!-- Example: Phoenix, AZ (2018-present) — municipal water, high UV exposure, wildfire smoke season -->
| Location | Period | Water Source | Known Factors |
|----------|--------|-------------|---------------|
| | | | |

### Occupational Exposure
<!-- Current and past workplace exposures. -->
- **Current occupation:**
- **Work environment:** <!-- office/remote, clinical, industrial, outdoor, etc. -->
- **Known exposures:** <!-- chemicals, dust, noise, radiation, shift work, high stress -->
- **PPE used:** <!-- if applicable -->
- **Past occupational exposures:** <!-- prior jobs with notable exposures -->

### Home Environment
- **Air quality:** <!-- AQI typical range, air purifier use, proximity to highways/industry -->
- **Water:** <!-- municipal, well, filtration type, known contaminants -->
- **Mold history:** <!-- exposure, remediation, testing results -->
- **Building age:** <!-- relevant for lead paint, asbestos in older construction -->

### Chemical & Toxin Exposure
- **Dental amalgams:** <!-- number, removal history — relevant for mercury exposure -->
- **Heavy metal exposure:** <!-- occupational, geographic, dietary (high fish consumption, etc.) -->
- **Pesticide/herbicide exposure:** <!-- residential, occupational, dietary preferences (organic, etc.) -->
- **Personal care products:** <!-- notable exposures, clean product preferences -->
- **Tobacco/smoke exposure:** <!-- current, past, secondhand -->

### Geographic & Climate Factors
- **Latitude:** <!-- relevant for vitamin D synthesis, SAD risk, UV exposure -->
- **Altitude:** <!-- relevant for RBC, hemoglobin, exercise adaptation -->
- **Climate:** <!-- hot/dry, humid, seasonal variation -->
- **UV index (typical):** <!-- relevant for skin health, vitamin D -->
- **Seasonal patterns:** <!-- allergies, SAD, weather-related symptoms -->

### Travel
<!-- International travel relevant to endemic disease exposure, altitude acclimatization, etc. -->
<!-- Example: Southeast Asia (2024-01, 2 weeks) — antimalarials taken -->

## Providers

### Primary Care
- **Name:**
- **Practice:**
- **Phone:**
- **Patient portal:**
- **Last visit:**

### Specialists
<!-- Add a subsection for each specialist. Include type, name, practice, reason for care. -->
<!--
### Allergist
- **Name:**
- **Practice:**
- **Reason:**
- **Last visit:**
-->

## Insurance
- **Carrier:**
- **Plan:**
- **Member ID:**
- **Group:**

## Connected Services
<!-- List every platform you pull health data from. This helps skills know what data is available. -->
- **Wearable:**          <!-- WHOOP, Oura, Garmin, Apple Watch, etc. -->
- **Labs:**              <!-- Function Health, Quest, LabCorp, etc. -->
- **Genetics:**          <!-- 23andMe, AncestryDNA, Nebula, etc. -->
- **HealthKit:**         <!-- Apple Health, Google Fit, etc. -->
- **Microbiome:**        <!-- Viome, Thorne Gut Health, etc. -->
- **Imaging:**           <!-- Provider / facility for MRI, DEXA, etc. -->

## Goals
<!-- What are you optimizing for? This guides skill analysis and recommendations. -->
<!-- Examples: longevity, athletic performance, cognitive performance, disease prevention, -->
<!-- weight management, sleep quality, stress resilience, specific condition management -->

## Notes
<!-- Anything else an AI should know about you to give better health advice. -->
<!-- Relevant context: dietary approach, competitive athlete, caregiver stress, -->
<!-- recent major life changes, health anxiety level, risk tolerance, -->
<!-- neurodivergence, trauma-informed care preferences, etc. -->
