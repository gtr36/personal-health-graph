---
schema_version: "0.1.0"
created: 2026-04-08
updated: 2026-08-14
file_count: 76
---

# Personal Health Graph — Manifest

## Schema Version
Schema 0.1.0 · Template release 0.1.1 (August 2026). See CHANGELOG.md for release history.

## File Index

### Meta Files

| File | Purpose |
|------|---------|
| README.md | Project overview, quickstart guide, usage instructions |
| SCHEMA.md | Full schema documentation for humans and LLMs |
| MANIFEST.md | This file. Schema version, file index, file counts |
| CHANGELOG.md | Release history for the template |
| CONNECTORS.md | External MCP connectors and APIs catalog (input, research, output) |
| DISCLAIMER.md | Legal disclaimers, liability disclosures, assumption of risk |
| LICENSE | MIT License |
| CONTRIBUTING.md | Guidelines for community contributions |
| CLAUDE.md | Guidance for Claude Code sessions working in this repo |
| .claude/skills/ | 14 thin SKILL.md wrappers — native Claude Code slash commands pointing at skills/ |
| .claude/commands/ | Legacy slash-command wrappers (kept one release for backward compatibility) |
| .gitignore | Prevents accidental commits of personal health data |

### State Files
Files representing current truth. Modified in place when state changes.

| File | Purpose |
|------|---------|
| PROFILE.md | Demographics, conditions, allergies, medications, providers, goals |
| SUPPLEMENTS.md | Active stack with doses, timing, brands, rationale, genetic/lab citations |
| PROTOCOLS.md | Routines, exercise, nutrition, sleep, protocol change log |
| DOCTOR_QS.md | Queued questions for providers, visit summaries |
| EXPENSES.md | Consolidated cost tracking for all health interventions |
| LABS_HISTORY.md | Longitudinal biomarker table across all providers and draw dates |
| GENETICS.md | Clinically significant genetic variants with cross-references |

### Log Files
Append-only files organized by month.

| Directory | Purpose | Naming |
|-----------|---------|--------|
| symptoms/ | Discrete health events with severity scores and clinical context | YYYY-MM.md |
| journal/ | Everything else: observations, patterns, hypotheses, voice notes, mood, dreams | YYYY-MM.md |

### Integration Files
Data from connected services, with README import guides in each directory.

| Directory | Purpose | Tier |
|-----------|---------|------|
| integrations/labs/ | Lab panel summaries from any provider | Summary |
| integrations/genetics/ | Genetic platform summaries | Summary |
| integrations/wearable_daily/ | Daily wearable metrics (WHOOP, Oura, Garmin, etc.) | Summary |
| integrations/healthkit/ | Apple HealthKit daily aggregates | Summary |
| integrations/microbiome/ | Gut microbiome test results | Summary |
| integrations/imaging/ | MRI, DEXA, CT, CAC, ultrasound reports | Summary |
| integrations/assessments/ | Standardized health assessment scores (PHQ-9, GAD-7, PSQI, SF-36, etc.) | Summary |
| integrations/cycle/ | Menstrual and fertility tracking data | Summary |
| integrations/raw/ | Full-resolution raw exports (JSON/CSV/PDF) | Archive |

### Inbox
Drop zone for unprocessed health files.

| Directory | Purpose |
|-----------|---------|
| inbox/ | Drop raw files (PDFs, CSVs, images, exports) here and run INTAKE skill to process them |

### Reports
Generated analysis output — the finished product of skill and workflow runs.

| Directory | Purpose | Naming |
|-----------|---------|--------|
| reports/ | Dated output files from every skill and workflow run: memos, risk assessments, supplement reviews, doctor prep briefs, pattern scans, interactive HTML dashboards, formal .docx/.pdf reports | [type]_YYYY-MM-DD.[ext] |

### Skills
Analysis methodology files that any LLM can execute against your data.

| File | Purpose |
|------|---------|
| skills/SYMPTOM_ANALYSIS.md | Cross-ref symptoms with sleep, supplements, calendar, wearables |
| skills/SUPPLEMENT_REVIEW.md | Evaluate stack efficacy against labs, genetics, and symptom trends |
| skills/DOCTOR_PREP.md | Compile structured visit summary, flag anomalies, format for physician |
| skills/PATTERN_DETECTION.md | Full-history scan for correlations, cascades, and anomalies |
| skills/MASTER_ANALYSIS.md | Comprehensive 5-phase analysis: labs → genetics → cross-ref → protocol |
| skills/HEALTH_MEMO.md | Amazon-style narrative health briefing with calibrated confidence |
| skills/BASELINE_REPORT.md | First-run assessment: baselines, gap analysis, 90-day roadmap |
| skills/RISK_ASSESSMENT.md | Risk factor review using ASCVD, Framingham, PGx, genetic modifiers |
| skills/INTAKE.md | Scan inbox/, classify files, extract data, populate PHG, archive originals |
| skills/QUICKSTART.md | Guided onboarding wizard — 3-tier progressive setup from 15 min to full baseline |
| skills/MAINTENANCE.md | Scheduled review — staleness audit, cross-reference validation, auto-updates |

### Workflow Skills
Multi-step automations that chain PHG analysis with external connectors.

| File | Purpose |
|------|---------|
| skills/workflows/MEETING_TO_PROTOCOL.md | Granola transcript → PHG updates → Calendar events → Linear issues |
| skills/workflows/PHYSICIAN_REPORT.md | PHG analysis → Notion/Gamma/Word report → follow-up reminders |
| skills/workflows/RESEARCH_ENRICHMENT.md | Validate findings via PubMed, Consensus, Clinical Trials, Scholar Gateway |
