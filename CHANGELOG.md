# Changelog

All notable changes to the Personal Health Graph template. The `schema_version` in file frontmatter tracks the data schema; releases here track the template as a whole.

## [0.4.0] — 2026-08-14

The visual release: the graph gets a face, without becoming an app.

### Added
- **skills/DASHBOARD.md + templates/dashboard_shell.html** — render the graph into a single self-contained HTML dashboard: current status with trends, the timeline, moving lab trends with reference bands, the active regimen, experiments, symptom frequency, and data freshness. The shell is fixed and versioned (all layout and rendering code); the skill only serializes data into it, so every dashboard from every model looks the same. Zero network requests, opens from disk, verified at phone and desktop widths. Read-only by hard rule: the dashboard renders, it never edits, and it is regenerated rather than maintained.
- **sample/dashboard.html** — the demo patient's rendered page, shipped with the repo so anyone can see the output before running anything.
- **PHILOSOPHY.md** — why the project exists, the beliefs behind it, and the list of things it will never do.
- **README "What living with it looks like"** — the day-to-day rhythm of an established graph.

### Notes
- The dashboard is a document, not an app: no navigation chrome, no inputs, light-only in this version (every surface carries functional color coding, which a mechanical dark remap would break; a designed dark variant is future work).
- The dashboard artifact contains a person's full health picture in one shareable file. It saves to reports/, which is gitignored, and the README's sharing guidance applies to it fully.

## [0.3.0] — 2026-08-14

The epistemics release: try before you commit, test what you find, audit what you conclude. Fully additive — no migration required.

### Added
- **sample/** — a fully populated fictional patient (Sam Rivera: 14 months of labs, wearables, genetics, symptoms, and journal entries) with seven findings deliberately planted in the data and an ANSWER_KEY.md eval rubric. Point any AI at `sample/` and run BASELINE_REPORT to see the system work in five minutes, with zero personal data committed. The answer key doubles as a quality benchmark for whichever model you use.
- **EXPERIMENTS.md + skills/EXPERIMENT.md** — pre-registered N-of-1 self-experiments: baseline and intervention windows, one variable, a pre-committed success criterion, and an evaluation that cannot move its own goalposts. The bridge from "suggested test" at the end of every analysis to an actual answer. Includes a hard safety boundary: no experiments on prescription medications.
- **skills/FACT_AUDIT.md** — adversarial re-verification of a prior report's load-bearing claims against primary sources, using a checklist of the known error classes (strand orientation, units, date attribution, reference ranges), with propagation analysis for anything discrepant and an optional cross-model check.
- **skills/SPECIALIST_TRANSLATOR.md** — specialty-native handoff briefs (immunology, cardiology, OB-GYN, psychiatry, endocrinology, GI, sleep, dermatology, new-PCP) with pertinent negatives, complete medication lists, timeline of the presenting problem, and draft ICD-10 codes via connector.
- **TIMELINE.md + skills/TIMELINE.md** — the derived chronological spine: every dated event from every file on one timeline with lag annotations and conflict detection. Rebuilt by the skill, refreshed by MAINTENANCE, read as an index by the analysis skills.
- **README sections** — running graphs for more than one person (a folder per person, caregiver guidance) and sharing parts of your graph (reports as the unit of sharing, redaction guidance).

### Changed
- PATTERN_DETECTION, SYMPTOM_ANALYSIS, and HEALTH_MEMO read TIMELINE.md as their chronological index and EXPERIMENTS.md so settled hypotheses are not re-reported.
- MAINTENANCE flags overdue experiment evaluations, surfaces untested hypotheses from recent reports, and rebuilds a stale timeline as a safe auto-update.
- Four new native Claude Code skill wrappers (`/experiment`, `/fact_audit`, `/specialist_translator`, `/timeline`).

## [0.2.0] — 2026-08-14

Schema release: one new state file, three new integration types. Fully additive — files created under schema 0.1.0 remain valid.

### Migration (one step)
Move your Active Medications list from PROFILE.md into the new MEDICATIONS.md (PROFILE.md keeps a one-line pointer). INTAKE and QUICKSTART now write medications there automatically. That is the entire migration.

### Added
- **MEDICATIONS.md** — dedicated state file for active, PRN, and discontinued medications with doses, prescribers, indications, start/stop dates, pharmacogenomic notes, and an interactions section. Mirrors the SUPPLEMENTS.md structure. Medication start/stop history is what lets pattern analysis correlate medication changes with symptom and biomarker changes — previously impossible with the flat list in PROFILE.
- **integrations/vitals/** — home measurements: blood pressure (the input every cardiovascular risk calculator needs and almost nobody has as a trend), weight and body composition, ECG events, spot checks. RISK_ASSESSMENT now prefers the BP trend over a single reading.
- **integrations/cgm/** — continuous glucose summaries: daily mean, time-in-range, variability, and annotated excursions with meal context. Covers Dexcom, Libre/Lingo, and Levels.
- **integrations/nutrition/** — macro tracking exports and dietary phase records, deliberately lightweight. Enables food-symptom correlation in SYMPTOM_ANALYSIS and meal-glucose pairing with CGM.
- **PROFILE.md Hearing Health section** — audiologist, testing, devices, noise exposure; completes the dental/vision/hearing trio.

### Changed
- Ten skills updated to read the new files where relevant; MEETING_TO_PROTOCOL now writes medication changes to MEDICATIONS.md; MAINTENANCE cross-references medications from the new file and adds staleness thresholds for the new integrations; BASELINE_REPORT census covers all sources with a dynamic denominator that excludes non-applicable ones.
- INTAKE gains three categories (vitals_export, cgm_export, nutrition_log) with archive routing; .gitignore covers the three new directories.

## [0.1.1] — 2026-08-14

Template release. Schema version remains 0.1.0 — no breaking changes to data files.

### Privacy and security
- `.gitignore` now ignores everything under `integrations/raw/` regardless of file format. The previous rules were extension-based and missed XML (the Apple Health export format), images, DICOM, and fitness-file formats.
- Removed instructions in HEALTH_MEMO, BASELINE_REPORT, and RISK_ASSESSMENT that saved reports to the repo root. All reports save to `reports/`, which `.gitignore` protects.
- README and CLAUDE.md now state plainly that the seven state files are tracked templates and are not gitignore-protected once filled in, with untracking instructions for fork users.
- LICENSE restored to standard MIT text so GitHub license detection works. The medical disclaimer terms live in DISCLAIMER.md, unchanged.

### Methodology
- Added data-density (attention) bias documentation to SCHEMA.md's Methodological Note, PATTERN_DETECTION, SYMPTOM_ANALYSIS, and HEALTH_MEMO: logged data reflects attention, not incidence, and analysis must account for it. (Prompted by community feedback in issue #3.)
- Added a Known Failure Modes section to the README covering plausible-but-wrong narratives — coherent analysis built on a single misread fact — with the mitigations the system carries and their limits.
- Wired `integrations/assessments/` and `integrations/cycle/` into the reads of HEALTH_MEMO, PATTERN_DETECTION, SYMPTOM_ANALYSIS, and BASELINE_REPORT, matching what those directories' READMEs already promised.

### Claude Code native skills
- Added `.claude/skills/<name>/SKILL.md` wrappers for all 14 skills. These register native slash commands, allow Claude Code to auto-invoke the right skill, and load automatically in Claude cloud sessions that clone the repo.
- The older `.claude/commands/` wrappers are kept this release for backward compatibility and will be removed in a future release; skills take precedence on name conflicts.
- Workflow wrappers now state only the truly required connectors; optional connectors are labeled as enhancements.

### Consistency and documentation
- MANIFEST file count and index corrected; SCHEMA directory tree completed (assessments, cycle, INTAKE, template files); raw archive README now documents all fourteen INTAKE routing destinations.
- INTAKE Phase 2 renumbered continuously after earlier insertions; QUICKSTART, MASTER_ANALYSIS, and MEETING_TO_PROTOCOL now declare what they write; BASELINE_REPORT census covers all thirteen data sources.
- MAINTENANCE staleness thresholds added for healthkit, microbiome, imaging, assessments, and cycle; integration template frontmatter normalized (tier, source, tags).
- Evergreen phrasing replaces dated references: model names, database sizes, example dates, and platform menu paths.
- Naming convention clarified: per-event integrations use `[provider]_[YYYY-MM-DD].md`, monthly rollups use `YYYY-MM.md`.
- README refreshed: new hero, a plain-language onboarding path for first-time users, connected-records FAQ, cross-tool compatibility note (community-verified with GPT via Cursor), and an honest token-cost note.

## [0.1.0] — 2026-04-09

- Initial public release: 7 state files, monthly symptom and journal logs, 8 integration types plus raw archive, 11 analysis skills, 3 workflow skills, Claude CLI slash commands (community contribution), full documentation suite.
