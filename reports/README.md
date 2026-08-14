# Reports

**Where the analysis lives.**

This directory stores the output of every skill and workflow run against your health data. If the rest of the Personal Health Graph is the raw material, `reports/` is the finished product — interpreted, cross-referenced, and ready to act on or share.

---

## What goes here

Every time you run a skill (SUPPLEMENT_REVIEW, RISK_ASSESSMENT, HEALTH_MEMO, etc.), the output belongs in this directory. Reports are the accumulating record of what the AI found, recommended, and flagged over time. They're also the primary artifact you'd share with a physician, health coach, or anyone else.

**Report types by skill:**

| Skill | Report Name | Format | Description |
|-------|-------------|--------|-------------|
| HEALTH_MEMO | `health_memo_YYYY-MM-DD` | .md, .docx, .pdf | Amazon-style narrative briefing with calibrated confidence |
| BASELINE_REPORT | `baseline_report_YYYY-MM-DD` | .md, .docx, .pdf | First-run assessment: baselines, gap analysis, 90-day roadmap |
| RISK_ASSESSMENT | `risk_assessment_YYYY-MM-DD` | .md, .docx, .pdf | Clinical risk stratification (ASCVD, Framingham, PGx) |
| SUPPLEMENT_REVIEW | `supplement_review_YYYY-MM-DD` | .md, .html | Stack evaluation against labs, genetics, evidence base |
| DOCTOR_PREP | `doctor_prep_YYYY-MM-DD` | .md, .docx | Structured visit brief for a specific appointment |
| PATTERN_DETECTION | `pattern_detection_YYYY-MM-DD` | .md, .html | Correlation scan across symptoms, sleep, supplements, calendar |
| SYMPTOM_ANALYSIS | `symptom_analysis_YYYY-MM-DD` | .md | Focused analysis of a specific symptom or cluster |
| MASTER_ANALYSIS | `master_analysis_YYYY-MM-DD` | .md, .docx | Comprehensive 5-phase analysis across all data |
| MAINTENANCE | `maintenance_YYYY-MM-DD` | .md | Staleness audit, cross-reference validation, action items |
| INTAKE | `intake_YYYY-MM-DD` | .md | Processing log of inbox files: what was extracted, where it went, items needing verification |
| EXPERIMENT | `experiment_[name]_YYYY-MM-DD` | .md | N-of-1 evaluation: result vs pre-committed criterion, verdict, decision |
| FACT_AUDIT | `fact_audit_YYYY-MM-DD` | .md | Claim-by-claim re-verification of a prior report against primary sources |
| SPECIALIST_TRANSLATOR | `specialist_brief_[specialty]_YYYY-MM-DD` | .md, .docx | Specialty-native handoff brief with pertinent negatives and draft codes |

**Workflow skill outputs:**

| Workflow | Report Name | Format | Description |
|----------|-------------|--------|-------------|
| MEETING_TO_PROTOCOL | `meeting_summary_YYYY-MM-DD` | .md | Extracted action items and PHG updates from a provider visit |
| PHYSICIAN_REPORT | `physician_report_YYYY-MM-DD` | .md, .docx, .pptx, Notion, Gamma | Tailored report for a specific provider or specialty |
| RESEARCH_ENRICHMENT | `research_enrichment_YYYY-MM-DD` | .md | Evidence review for a specific claim or set of findings |

---

## Naming convention

```
[report_type]_[YYYY-MM-DD].[ext]
```

Examples:
- `supplement_review_2026-04-08.md`
- `health_memo_2026-04-08.docx`
- `risk_assessment_2026-04-08.pdf`
- `doctor_prep_2026-04-15_cardiology.md` (append specialty or context when useful)
- `pattern_detection_2026-Q1.html` (use quarter for periodic reviews)

---

## Formats

Reports can be generated in multiple formats depending on the use case:

**Markdown (.md)** — Default. Human-readable, version-controllable, and re-ingestable by any LLM for follow-up analysis. Best for internal review and iterative refinement.

**HTML (.html)** — Interactive reports with charts, collapsible sections, and visual dashboards. Best for pattern detection, supplement reviews, and anything with quantitative data that benefits from visualization. These are self-contained single-file HTML — open in any browser, no server needed.

**Word (.docx)** — Formal documents with professional formatting. Best for physician-facing reports, insurance documentation, or anything that needs to look like a medical document.

**PDF (.pdf)** — Exported from Word or HTML when you need a locked, shareable snapshot. Best for sending to providers or keeping a permanent record.

**Presentation (.pptx)** — Slide-based summaries for visual communication. Best for health coach check-ins or presenting to a care team.

**Notion / Gamma** — Published to external platforms via workflow skills. Not stored locally, but the source markdown that generated them lives here.

---

## How reports compound over time

The real power of this directory isn't any single report — it's the longitudinal record.

Run SUPPLEMENT_REVIEW quarterly and you can see how your stack evolved, what was added or dropped and why, and whether lab markers moved in the expected direction. Run RISK_ASSESSMENT annually and you can track whether your cardiovascular risk profile is improving. Run HEALTH_MEMO before and after a major protocol change and you have a before/after narrative.

Skills that read `reports/` for historical context:
- **HEALTH_MEMO** — references prior memos to track what changed since last review
- **BASELINE_REPORT** — compares current state against the original baseline
- **MAINTENANCE** — checks when each report type was last generated and flags overdue reviews
- **PATTERN_DETECTION** — uses prior pattern reports to avoid redundant findings and track whether flagged patterns resolved

---

## Sharing reports

**With your physician:** Export as .docx or .pdf. The DOCTOR_PREP and PHYSICIAN_REPORT skills produce output specifically formatted for clinical review — structured, concise, with flagged items prioritized.

**With a health coach:** Share the full HEALTH_MEMO or SUPPLEMENT_REVIEW. These are written in narrative prose with enough context for a non-physician to understand.

**Publicly (with caution):** If you're sharing de-identified insights (e.g., "here's what my pattern detection found about sleep and HRV"), strip any personally identifiable health information first. Reports contain real health data — treat them accordingly.

---

## Privacy note

Reports contain interpreted personal health data — they are **not** part of the public template. The `.gitignore` excludes all dated report files from version control. Only this README is tracked in the repository.

If you're using this repo as a working copy (not recommended), never commit reports containing your actual health data to a public repository.
