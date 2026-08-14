# Inbox

**Drop everything here. The AI sorts it out.**

This is your starting point. Before you organize anything, before you fill in any templates — just gather your health files and put them in this folder. PDFs, CSVs, screenshots, exports, whatever format they're in.

---

## What to put here

Anything health-related you have digitized or can digitize:

**Lab results** — PDFs from your patient portal, Function Health, Quest, LabCorp, Inside Tracker, or any provider. Screenshots of results pages work too.

**Genetic reports** — Downloads from 23andMe, Nebula Genomics, SelfDecode, Dante Labs, or any genetic testing service. Raw data files (.txt, .vcf, .zip) and/or the PDF summary reports.

**Wearable exports** — CSV or JSON exports from WHOOP, Oura, Apple Health, Garmin, Fitbit, etc. Monthly or bulk exports are ideal.

**Imaging reports** — DEXA scan PDFs, MRI/CT reports, CAC score reports, ultrasound results. The radiology report PDF, not the DICOM images themselves (those are too large).

**Microbiome results** — PDFs or data exports from Viome, Thorne, Tiny Health, or similar.

**Supplement receipts or lists** — Screenshots of your supplement shelf, order histories from Amazon or supplement retailers, any existing list you've maintained.

**Medical records** — Discharge summaries, visit notes, allergy documentation, medication lists from your pharmacy or patient portal.

**Vaccination records** — Immunization cards, travel vaccination certificates, records from your patient portal. Most portals list your full vaccine history under a dedicated section.

**Mental health assessments** — PHQ-9, GAD-7, or other standardized questionnaire results from your provider. Therapy intake summaries or treatment plans, if you have them.

**Dental records** — X-rays, periodontal charts, treatment summaries. Request from your dentist's office if not available online.

**Vision records** — Eye exam reports, prescriptions, OCT scans, visual field tests. Request from your optometrist or ophthalmologist.

**Cycle/fertility data** — Exports from Clue, Flo, Natural Cycles, or other cycle tracking apps. Fertility treatment records or hormone monitoring logs.

**Environmental reports** — Home water quality test results, mold/air quality assessments, occupational exposure records, heavy metal testing.

**Insurance / billing** — EOBs, itemized bills, HSA/FSA receipts (if you want to track expenses).

**Anything else** — Doctor's notes you photographed, health app screenshots, food logs, workout logs, sleep diaries. If it's health-related and digital, it belongs here.

---

## What happens next

Once you've gathered your files here, give an AI the `skills/INTAKE.md` skill. It will:

1. **Scan this folder** and identify every file by type (lab report, genetic data, wearable export, etc.)
2. **Extract the relevant data** from each file into the appropriate PHG format
3. **Populate your health graph** — create markdown summaries in the right integration folders, add biomarkers to LABS_HISTORY.md, populate GENETICS.md, etc.
4. **Move the originals** to `integrations/raw/` organized by category, so you always have the source documents
5. **Report what it did** — a summary of every file processed, where the data went, and anything it couldn't parse or needs you to verify

You don't need to organize the files before dropping them here. Name them whatever you want. Mix formats. The AI figures out what's what.

---

## Tips for gathering your files

**Patient portals** — Log in to MyChart, Quest, LabCorp, or whatever portal your providers use. Most have a "Download" or "Export" option for lab results. Download as PDF.

**Apple Health** — Open the Health app → profile icon (top right) → Export All Health Data. This creates a ZIP file. Drop the whole ZIP here.

**WHOOP** — Log in to app.whoop.com → navigate to any month → export. CSV format is best.

**Oura** — Log in to cloud.ouraring.com → Trends → Export (bottom of page). CSV format.

**23andMe** — find the raw data download under your account settings (currently Settings → 23andMe Data). You'll get your raw genotype file.

**Insurance / pharmacy** — Most pharmacy apps (CVS, Walgreens, Express Scripts) let you view and download medication history. Most insurance portals have EOBs available as PDFs.

**Photos of documents** — If you have paper records, photograph them with your phone. The AI can read images. Name them descriptively if possible (e.g., "bloodwork-jan-2024.jpg") but it's not required.

---

## After intake

Once INTAKE has processed everything, this folder should be empty (originals moved to `integrations/raw/`). You can continue to use it as a drop zone for new files — run INTAKE again whenever you have new data to process.

Think of this folder as a permanent inbox: new lab results, updated wearable exports, new genetic reports — drop them here, run INTAKE, and your health graph stays current.
