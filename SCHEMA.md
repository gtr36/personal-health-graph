---
schema_version: "0.3.0"
created: 2026-04-08
updated: 2026-08-14
author: Garrett Ruhland
---

# Personal Health Graph — Schema Reference

## Design Principles

**Local-first.** All files live on the user's device. The canonical copy is always local.

**Plain markdown.** Every file is human-readable and editable in any text editor. No proprietary formats. No binary data in core files.

**Portable.** The entire `personal_health_graph/` folder is self-contained. Copy it, move it, back it up. Every integration writes inside the folder. Nothing references external paths.

**Zero lock-in.** The schema is open. Any tool can read or write to it. If you stop using this tomorrow, you keep every file unchanged.

**AI-agnostic.** These files work with any LLM: Claude, ChatGPT, Gemini, local models, or anything that comes next.

**Rich by default.** When you log a symptom, the system should capture everything available at that moment: timestamp, sleep data, supplement adherence, calendar density, weather, and cross-references to prior entries. The gap between input effort and stored context is where the value lives.

## File Types

### State Files
Represent current truth. Modified in place when state changes.
- `PROFILE.md` — demographics, conditions, allergies, providers, insurance, goals (medications live in MEDICATIONS.md; PROFILE keeps a pointer)
- `MEDICATIONS.md` — active, PRN, and discontinued medications with doses, prescribers, indications, start/stop dates, pharmacogenomic notes, and interactions
- `SUPPLEMENTS.md` — active stack with doses, timing, brands, purchase links, costs, start dates, reasons, genetic/lab citations; discontinued supplements with stop dates and reasons
- `PROTOCOLS.md` — routines, exercise schedules, nutrition framework, supplement cycling, protocol change log
- `DOCTOR_QS.md` — queued questions for providers, visit summaries with dates and action items
- `EXPENSES.md` — consolidated cost tracking: supplements, wearable subscriptions, lab memberships, services
- `LABS_HISTORY.md` — longitudinal biomarker table across all providers and draw dates, with annotations
- `GENETICS.md` — clinically significant genetic variants organized by category, with cross-references to labs and supplements
- `EXPERIMENTS.md` — pre-registered N-of-1 self-experiments: designs are written before interventions start and never edited afterward; only status and result fields update
- `TIMELINE.md` — derived chronological spine of all dated events; rebuilt from source files by the TIMELINE skill, never hand-edited

### Log Files
Append-only. One file per month. New entries added chronologically. Existing entries are never modified except to append resolution notes.
- `symptoms/YYYY-MM.md` — timestamped symptom entries with severity, context, and cross-references. Use for discrete health events you'd tell a doctor about.
- `journal/YYYY-MM.md` — everything else: observations, patterns noticed, dietary notes, hypotheses, dreams, mood, voice-captured notes, life events. Each entry includes a `source` field (text, voice, image, integration) to preserve capture provenance. Voice entries can optionally include acoustic biomarker data.

### Integration Files
Data from connected services. Two tiers:
- **Summary tier** — daily or per-event summaries in markdown. This is what LLMs read by default.
  - `integrations/labs/` — lab panel summaries from any provider
  - `integrations/genetics/` — genetic platform summaries
  - `integrations/wearable_daily/` — daily wearable metrics
  - `integrations/healthkit/` — Apple HealthKit daily aggregates
  - `integrations/microbiome/` — gut microbiome test results
  - `integrations/imaging/` — MRI, DEXA, CT, ultrasound, CAC reports
  - `integrations/assessments/` — standardized health assessment scores (PHQ-9, GAD-7, PSQI, SF-36, etc.)
  - `integrations/cycle/` — menstrual and fertility tracking data
  - `integrations/vitals/` — home measurements: blood pressure, weight, ECG events, spot checks
  - `integrations/cgm/` — continuous glucose monitoring summaries with meal context
  - `integrations/nutrition/` — macro tracking exports and dietary phase records
- **Archive tier** (`integrations/raw/`) — full-resolution exports (JSON, CSV, PDF). Exists for portability and deep-dive analysis. Not read by standard skills.

Each integration subdirectory contains a README with import instructions for common platforms.

### Inbox
- `inbox/` — drop zone for unprocessed health files. Users place raw documents (PDFs, CSVs, images, exports) here and run the INTAKE skill, which scans, classifies, extracts data into the appropriate PHG files, and archives originals to `integrations/raw/`. Designed to be used repeatedly — any time new files arrive, drop them in and run INTAKE again.

### Reports
Generated analysis output. Every skill and workflow run produces a report stored in `reports/`.
- `reports/` — dated output files (.md, .html, .docx, .pdf, .pptx) from skill and workflow runs. The accumulating record of AI-generated analysis, recommendations, and risk assessments. Reports compound over time — quarterly supplement reviews show stack evolution, annual risk assessments track trajectory, before/after memos bracket protocol changes. Interactive HTML reports provide visual dashboards. Formal .docx/.pdf reports are physician-ready. See `reports/README.md` for naming conventions and format guidance.

### Meta Files
- `README.md` — project overview, quickstart guide, usage instructions
- `MANIFEST.md` — schema version, file index, file counts
- `SCHEMA.md` — this file. Full schema documentation for humans and LLMs.
- `CONNECTORS.md` — catalog of external MCP connectors and APIs, grouped by function (input sources, research APIs, output destinations)

### Skills
- `skills/*.md` — analysis methodology files. Each skill specifies which files it reads, what analysis it performs, and what output format it produces. Skills are the analytical engine — they turn structured data into actionable insight.

### Workflow Skills
- `skills/workflows/*.md` — multi-step automation skills that chain external connectors with PHG analysis. Unlike analysis skills (which read local files and produce reports), workflow skills orchestrate data flow across external tools — pulling from meeting transcripts, validating against research databases, and pushing outputs to calendars, project trackers, and formatted reports.

## YAML Frontmatter

Data files (state, log, and integration files) include YAML frontmatter with consistent metadata. Meta files (README, documentation) and skill files require only `schema_version` and `type`; the full field set below applies to data files.

### Required fields (data files)
```yaml
schema_version: "0.3.0"    # Schema version for forward compatibility
type: state | log | integration | skill | meta
created: ISO 8601 datetime  # When the file was created
updated: ISO 8601 datetime  # When the file was last modified
tags: [array, of, tags]     # For search and filtering
```

### Additional fields by file type

**Log files:**
```yaml
period: YYYY-MM             # For monthly logs
entry_count: integer         # Number of entries in the file
```

**Log entry metadata (per entry, not per file):**
```yaml
source: text | voice | image | integration  # How the entry was captured
confidence: 0.0-1.0          # 1.0 for manual/text; lower for AI-parsed voice/image entries
```

**Integration files:**
```yaml
tier: summary | archive
source: "WHOOP 4.0 (via Terra API)"  # Data source with method
sync_frequency: daily | on-demand | manual
```

**Skill files:**
```yaml
name: "Skill Name"
description: "What this skill does"
reads: [list of files/directories this skill needs]
writes: [optional — files the skill modifies, for skills that update the graph]
external_context: [optional external data sources]
connectors_required: [workflow skills only — connectors that must be present]
connectors_optional: [workflow skills only — connectors that enhance the run]
default_range: "90 days"
output_format: "description of output"
saves_to: "reports/[type]_YYYY-MM-DD.md — where the output report lands"
trigger: "optional — when the skill should run"
```

## Intervention Cost Tracking

Any file that represents a purchasable intervention includes two optional fields:

```markdown
- **Purchase:** [StoreName](URL) | [AlternateName](URL)
- **Cost:** $X/unit (Y-day supply) → ~$Z/month
```

`EXPENSES.md` is the consolidated roll-up. Individual files retain their own Purchase and Cost fields for quick reorder access.

## Entry Structure (Log Files)

Each entry in a log file follows this structure:

```markdown
---

### Entry: YYYY-MM-DDTHH:MM:SS±HH:MM
- **Source:** voice | text | image | integration | manual
- **Confidence:** 0.0-1.0 (for AI-parsed entries; 1.0 for manual/text)
- **Type:** [symptom type, observation category, etc.]
- **Severity:** X/10 (where applicable)
- [Additional fields specific to entry type]
- **Context captured at log time:**
  - Sleep (source): [summary]
  - Supplement adherence: [status]
  - Calendar density: [summary]
  - Weather: [conditions]
  - Geolocation: [location]
  - Last similar entry: [date and gap]
- **Linked files:**
  - [file path] → [what's linked and why]
- **Tags:** #tag1 #tag2
```

### Key design decisions

**Horizontal rule (`---`) separates entries** within a log file. Clear visual boundaries, parseable by any markdown reader.

**Linked files create a knowledge graph.** Every entry can reference other files. Over time, these cross-references form a navigable web of health relationships.

**Context is captured at log time, not reconstructed later.** This preserves temporal accuracy — what was true when the entry was logged, not what might be true when it's later analyzed.

**Confidence scores track AI parsing quality.** Voice-parsed entries get a confidence score. Text entries default to 1.0.

**Tags enable cross-file search.** A tag like `#migraine` or `#sleep-deficit` can be searched across all log files without reading entire files.

## Methodological Note

PHG adapts established epidemiological and evidence-grading frameworks — Bradford Hill criteria, GRADE, ASCVD Pooled Cohort Equations, Framingham Risk Score — as structured reasoning tools for individual health data. These frameworks were originally designed for population-level inference and bodies of evidence. When applied to N=1 data, they serve as analytical scaffolding: they organize thinking, surface relevant considerations, and generate hypotheses worth discussing with a clinician. They do not produce population-level statistical conclusions.

Pattern detection on one person's data identifies *candidates for clinical conversation*, not confirmed causal relationships. Confidence ratings in skills like PATTERN_DETECTION reflect data consistency and temporal coherence, not statistical significance in the epidemiological sense. The system includes multiple comparison awareness and minimum data thresholds specifically to reduce false pattern identification, but no N=1 analysis can fully eliminate it.

One further limitation deserves explicit attention: **logged data reflects attention, not incidence.** Users log most heavily where they are most worried. An anxiety-dense period over-generates symptom and journal entries; a calm period under-generates them, independent of what was actually happening physiologically. Data density is therefore itself biased toward areas of concern, and that bias propagates into every downstream correlation. Analysis skills are instructed to compare findings against logging-density baselines, to prefer passively captured sources (wearables, scheduled labs) as denominators, and to flag conclusions that may be artifacts of differential logging rather than differential health.

This is a feature of the design, not a limitation to be solved: the goal is structured reasoning that makes health conversations more productive, not autonomous clinical decision-making.

## Context Window Strategy

Skills are designed to work within practical context window limits. The architecture handles this in three ways:

**Summary-tier integration files.** Wearable data, lab panels, and genetic reports are stored as markdown summaries, not raw JSON/CSV. A month of daily wearable summaries is ~2-3K tokens; the raw data would be 50-100K. Skills read summaries by default and only request raw data for deep-dive analysis.

**Scoped reads.** Each skill specifies exactly which files it needs. SYMPTOM_ANALYSIS reads symptoms, wearables, supplements, and protocols — it doesn't load genetics or imaging. This keeps most skill runs well within context limits even with months of data.

**Temporal windowing.** Skills specify a `default_range` (typically 90-180 days). For longitudinal analysis, skills read LABS_HISTORY.md (one file with all historical biomarker values) rather than every individual lab panel file.

For heavily populated graphs (12+ months of daily data across all categories), users may need to specify a narrower time window or run skills on subsets of their data. Model capability matters — larger context windows produce richer cross-referencing.

## Versioning

The `schema_version` field enables forward compatibility:
- Patch (0.1.0 → 0.1.1): add optional fields. Existing files remain valid.
- Minor (0.1.0 → 0.2.0): new file types or directory restructuring. Migration guide provided.
- Major (0.x → 1.0): stable, production-ready schema.

**Version history:**
- **0.1.0 (April 2026):** initial schema.
- **0.2.0 (August 2026):** added the MEDICATIONS.md state file and three integration types (vitals, cgm, nutrition); added Hearing Health to PROFILE.md. Fully additive — files created under 0.1.0 remain valid. Migration: move the Active Medications list from PROFILE.md into MEDICATIONS.md; PROFILE.md keeps a one-line pointer. INTAKE and QUICKSTART handle this automatically for new imports.
- **0.3.0 (August 2026):** added EXPERIMENTS.md (pre-registered N-of-1 experiments) and TIMELINE.md (derived chronological spine), four skills (EXPERIMENT, FACT_AUDIT, SPECIALIST_TRANSLATOR, TIMELINE), and the sample/ demo patient. Fully additive — no migration required.

## Directory Structure

```
personal_health_graph/
├── README.md
├── SCHEMA.md
├── MANIFEST.md
├── CHANGELOG.md
├── CLAUDE.md             (guidance for Claude Code sessions)
├── .claude/skills/       (thin wrappers: native Claude Code slash commands)
│
├── PROFILE.md
├── MEDICATIONS.md
├── SUPPLEMENTS.md
├── PROTOCOLS.md
├── DOCTOR_QS.md
├── EXPENSES.md
├── LABS_HISTORY.md
├── GENETICS.md
├── EXPERIMENTS.md
├── TIMELINE.md
│
├── sample/               (fictional demo patient with answer key — try before importing)
│
├── symptoms/
│   └── _TEMPLATE.md      (copy and rename to YYYY-MM.md)
├── journal/
│   └── _TEMPLATE.md      (copy and rename to YYYY-MM.md)
│
├── integrations/
│   ├── labs/
│   │   ├── README.md
│   │   └── _TEMPLATE.md
│   ├── genetics/
│   │   └── README.md
│   ├── wearable_daily/
│   │   ├── README.md
│   │   └── _TEMPLATE.md
│   ├── healthkit/
│   │   └── README.md
│   ├── microbiome/
│   │   └── README.md
│   ├── imaging/
│   │   └── README.md
│   ├── assessments/
│   │   ├── README.md
│   │   └── _TEMPLATE.md
│   ├── cycle/
│   │   ├── README.md
│   │   └── _TEMPLATE.md
│   ├── vitals/
│   │   ├── README.md
│   │   └── _TEMPLATE.md
│   ├── cgm/
│   │   ├── README.md
│   │   └── _TEMPLATE.md
│   ├── nutrition/
│   │   ├── README.md
│   │   └── _TEMPLATE.md
│   └── raw/
│       └── README.md     (subdirectories created by INTAKE as needed)
│
├── CONNECTORS.md
│
├── inbox/
│   └── README.md         (drop files here → run INTAKE skill)
│
├── reports/
│   └── README.md         (naming: [type]_YYYY-MM-DD.[ext])
│
└── skills/
    ├── SYMPTOM_ANALYSIS.md
    ├── SUPPLEMENT_REVIEW.md
    ├── DOCTOR_PREP.md
    ├── PATTERN_DETECTION.md
    ├── MASTER_ANALYSIS.md
    ├── HEALTH_MEMO.md
    ├── BASELINE_REPORT.md
    ├── RISK_ASSESSMENT.md
    ├── INTAKE.md
    ├── QUICKSTART.md
    ├── MAINTENANCE.md
    ├── EXPERIMENT.md
    ├── FACT_AUDIT.md
    ├── SPECIALIST_TRANSLATOR.md
    ├── TIMELINE.md
    └── workflows/
        ├── MEETING_TO_PROTOCOL.md
        ├── PHYSICIAN_REPORT.md
        └── RESEARCH_ENRICHMENT.md
```
