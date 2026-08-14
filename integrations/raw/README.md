# Raw Data Archive

## What goes here
Full-resolution exports from all data sources. These are the original files — PDFs, CSVs, JSONs, XMLs — before they're summarized into the markdown files that skills read.

## Directory structure

```
raw/
├── labs/           ← Original lab report PDFs
├── genetics/       ← Raw genotype files (.txt, .vcf), clinical panel PDFs
├── wearable/       ← CSV/JSON exports from wearable apps
├── healthkit/      ← Apple Health .xml export
├── microbiome/     ← Microbiome test report PDFs and data files
├── imaging/        ← Radiology reports, DICOM files, scan PDFs
├── medical/        ← Visit notes, discharge summaries, vaccination records, medication lists
├── assessments/    ← Original standardized assessment reports (PHQ-9, GAD-7, etc.)
├── dental/         ← Dental x-rays, periodontal charts, treatment records
├── vision/         ← Eye exam reports, OCT scans, prescriptions
├── cycle/          ← Cycle tracking app exports, fertility records
├── vitals/         ← BP monitor exports, scale data, ECG PDFs
├── cgm/            ← Dexcom Clarity, LibreView, Levels exports
├── nutrition/      ← Cronometer, MyFitnessPal daily exports
├── billing/        ← EOBs, itemized bills, HSA/FSA records
├── environmental/  ← Water quality, mold, air quality, heavy metal reports
└── other/          ← Anything that doesn't fit above
```

Subdirectories are created by INTAKE as needed — the full routing table lives in `skills/INTAKE.md` Phase 3.

## Purpose
- **Portability:** If you switch AI tools or analysis methods, the raw data is always available.
- **Verification:** Any finding from a summary file can be traced back to the original source.
- **Deep analysis:** Some analyses (e.g., full genetic file queries) require the raw data, not the summary.

## When raw data is used
- Specialized skills that require higher resolution than daily summaries
- Data export or migration to another system
- Clinical sharing where original documents are needed
- Longitudinal analysis requiring minute-level granularity
- Full genetic file analysis (querying specific rsIDs)

## Default behavior
Standard skills (SYMPTOM_ANALYSIS, SUPPLEMENT_REVIEW, DOCTOR_PREP, PATTERN_DETECTION) read from the summary tier files in the parent directories. Raw files are only accessed when explicitly requested by a skill or user query.

## Notes
- Name files descriptively: `function_health_2026-02-12.pdf`, not `report.pdf`.
- This directory can get large. That's fine — storage is cheap and these files are irreplaceable.
