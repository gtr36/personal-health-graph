# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Personal Health Graph (PHG) is a structured markdown file system — not a software project. There is no build step, no test suite, no dependencies. The "code" is methodology: structured natural language skill files that instruct LLMs how to analyze health data.

## How to work with this repo

### Running skills

Skills are in `skills/*.md` and `skills/workflows/*.md`. To run a skill, read the skill file and follow its instructions against the relevant data files it specifies in its `reads:` frontmatter field.

**Entry point skills:**
- `skills/INTAKE.md` — process files dropped in `inbox/` into structured PHG files
- `skills/QUICKSTART.md` — guided onboarding wizard; run if the graph is newly set up
- `skills/MAINTENANCE.md` — scheduled audit of staleness and cross-reference validity

**Analysis skills (require populated data first):**
- `skills/SUPPLEMENT_REVIEW.md` — evaluate supplement stack against labs and genetics
- `skills/SYMPTOM_ANALYSIS.md` — correlate symptoms with sleep, wearables, supplements
- `skills/PATTERN_DETECTION.md` — full-history scan for correlations and anomalies
- `skills/DOCTOR_PREP.md` — compile structured visit summary for a provider
- `skills/MASTER_ANALYSIS.md` — comprehensive 5-phase analysis
- `skills/HEALTH_MEMO.md` — Amazon-style narrative health briefing
- `skills/BASELINE_REPORT.md` — first-run assessment with gap analysis
- `skills/RISK_ASSESSMENT.md` — cardiovascular and genetic risk review
- `skills/EXPERIMENT.md` — design and evaluate N-of-1 self-experiments (writes EXPERIMENTS.md)
- `skills/FACT_AUDIT.md` — re-verify a prior report's claims against primary sources
- `skills/SPECIALIST_TRANSLATOR.md` — specialty-native handoff briefs
- `skills/TIMELINE.md` — rebuild TIMELINE.md, the derived chronological event spine

**Demo data:** `sample/` contains a fully populated fictional patient (Sam Rivera) with planted findings documented in `sample/ANSWER_KEY.md`. Use it to demo skills or benchmark analysis quality. Never mix sample data into a real user's graph.

**Workflow skills (chain external connectors):**
- `skills/workflows/MEETING_TO_PROTOCOL.md` — doctor visit transcript → PHG updates
- `skills/workflows/PHYSICIAN_REPORT.md` — PHG analysis → formal physician report
- `skills/workflows/RESEARCH_ENRICHMENT.md` — validate findings via PubMed/Consensus

### Slash commands and native skills (Claude Code)

Every PHG skill is available as a native Claude Code skill. The wrappers live in `.claude/skills/<name>/SKILL.md` and are **thin pointers** — each contains only a short instruction to read and execute the canonical skill file in `skills/`. This means:

- Running `/intake` is equivalent to reading `skills/INTAKE.md` and executing it
- Running `/health_memo` is equivalent to reading `skills/HEALTH_MEMO.md` and executing it
- Running `/physician_report` is equivalent to reading `skills/workflows/PHYSICIAN_REPORT.md` and executing it
- Claude Code can also auto-invoke a skill when the user's request matches its description

Because the wrappers are committed to the repo, they also load in Claude cloud sessions that clone this folder. The older `.claude/commands/*.md` wrappers are kept one release for backward compatibility and will be removed; skills take precedence on any name conflict.

**Naming note:** the human-readable methodology directory `skills/` and the Claude-native wrapper directory `.claude/skills/` are different layers. Canonical content lives only in `skills/`.

**Single source of truth:** the canonical methodology always lives in `skills/`. Wrapper files are pointers, never copies. When a skill is updated, the wrapper does not need to change.

### File modification rules

**State files** (`PROFILE.md`, `MEDICATIONS.md`, `SUPPLEMENTS.md`, `PROTOCOLS.md`, `DOCTOR_QS.md`, `EXPENSES.md`, `LABS_HISTORY.md`, `GENETICS.md`, `EXPERIMENTS.md`, `TIMELINE.md`) — modify in place. They represent current truth. Two exceptions to normal editing: experiment designs in `EXPERIMENTS.md` are never edited after an experiment starts (only status and result fields), and `TIMELINE.md` is derived — fix source files and rebuild via `skills/TIMELINE.md`, never hand-edit events.

**Log files** (`symptoms/YYYY-MM.md`, `journal/YYYY-MM.md`) — append only. Never modify existing entries. One file per month named `YYYY-MM.md`. Copy from the `_TEMPLATE.md` in each directory.

**Integration files** (`integrations/*/`) — create new files per data import. Per-event integrations (labs, genetics, imaging, microbiome, assessments) use `[provider]_[YYYY-MM-DD].md`; monthly-rollup integrations (wearable_daily, healthkit, cycle) use `YYYY-MM.md`. Each subdirectory has a README with format guidance.

**Reports** (`reports/`) — write new dated files, never overwrite. Convention: `[type]_YYYY-MM-DD.[ext]`.

### Schema requirements

Every file must include YAML frontmatter with at minimum:
```yaml
schema_version: "0.1.0"
type: state | log | skill | meta
created: ISO 8601 datetime
updated: ISO 8601 datetime
tags: [array, of, tags]
```

Log entries within monthly files use the separator `---` between entries and follow the structured format in `SCHEMA.md#entry-structure`.

## Architecture

### Data flow

```
inbox/ (raw files)
  → INTAKE skill
    → integrations/*/   (structured summaries)
    → state files       (LABS_HISTORY, GENETICS, PROFILE, SUPPLEMENTS)
    → integrations/raw/ (archived originals)
  → analysis skills
    → reports/          (dated output)
```

### Two integration tiers

- **Summary tier** — markdown summaries in `integrations/labs/`, `integrations/wearable_daily/`, etc. This is what skills read by default. Optimized for LLM context windows.
- **Archive tier** — `integrations/raw/` holds full-resolution exports (JSON/CSV/PDF). Not read by standard skills; preserved for deep-dive access.

### Cross-referencing

Files reference each other via relative file paths in `Linked files:` sections of log entries. `LABS_HISTORY.md` is the single longitudinal biomarker table that skills query instead of reading individual lab panel files — this is the key optimization for context window management.

## Contributing

When adding a new skill, follow the established frontmatter format from `SCHEMA.md` — it must include `reads:`, `output_format:`, and an honest `## Important notes` or limitations section. Skills must be AI-agnostic (work with any current frontier model: Claude, GPT, Gemini, or anything comparable). See `CONTRIBUTING.md` for full guidelines.

**If you add a new skill**, also add a matching thin wrapper at `.claude/skills/<name>/SKILL.md` so Claude Code users get a native slash command for it. The wrapper should be a short pointer file with an auto-trigger `description:` (see existing wrappers for the pattern) — never a duplicate of the skill content.

Never commit real personal health data. The `.gitignore` protects dated log entries, integration data, raw exports, and generated reports — but the seven state files are tracked templates and are NOT protected once filled in. Untrack them (`git rm --cached <file>`) before using a fork as a private working copy, and always verify with `git status` before pushing.
