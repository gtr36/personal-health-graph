# Changelog

All notable changes to the Personal Health Graph template. The `schema_version` in file frontmatter tracks the data schema; releases here track the template as a whole.

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
