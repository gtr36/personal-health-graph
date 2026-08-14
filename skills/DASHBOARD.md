---
schema_version: "0.3.0"
type: skill
name: Dashboard
description: Render the health graph into a single self-contained HTML dashboard. Serializes the graph into the shell template's data schema and saves a read-only visual artifact.
reads:
  - PROFILE.md
  - MEDICATIONS.md
  - SUPPLEMENTS.md
  - LABS_HISTORY.md
  - EXPERIMENTS.md
  - TIMELINE.md
  - DOCTOR_QS.md
  - symptoms/*.md
  - integrations/wearable_daily/*.md
  - integrations/vitals/*.md
  - integrations/assessments/*.md
  - integrations/cgm/*.md
  - templates/dashboard_shell.html (the rendering shell)
writes: []
default_range: all available data
output_format: single self-contained HTML file
saves_to: reports/dashboard_YYYY-MM-DD.html
---

# Skill: Dashboard

## Purpose

Render the graph as a page a person can look at. The markdown files are the truth; this skill produces the map: current status, the timeline, moving lab trends, the active regimen, experiments in flight, symptom frequency, and data freshness, in one self-contained HTML file that opens from disk in any browser.

The architecture is deliberately split: the shell (`templates/dashboard_shell.html`) is fixed, versioned, and contains all layout, styling, and rendering code. This skill's job is only to read the graph and produce the data. Never redesign the page, never add scripts or styles, never introduce external resources. The value of the split is that every dashboard, from every model, on every run, looks the same.

## Hard rules

- **Read-only.** This skill modifies no graph files. It produces one artifact in `reports/`.
- **Zero network.** The shell makes no external requests and the output must keep it that way. If you add anything (you should not need to), nothing may reference a URL.
- **The shell is not yours to edit.** Copy it verbatim; replace only the `PHG_DATA` object between the `PHG_DATA` markers.
- **The map, not the territory.** Select what orients the reader. Detail lives in the files.

## Instructions for LLM

### Step 1: Read and select

Read the graph. Then select, using these rules:

- **Status strip (6-10 items):** the metrics a person would check first. Latest value plus trend. Prioritize: markers that are flagged or moving (from LABS_HISTORY), sleep and HRV averages for the most recent month (wearable), latest BP (vitals), latest relevant assessment score. Skip anything stable and unremarkable.
- **Timeline (10-25 events):** from TIMELINE.md if current, else assemble from source files. Diagnoses, medication and supplement starts/stops, lab draws, visits, experiment windows, major symptom onsets. Not every entry — the events that shape the story.
- **Labs (4-8 markers):** markers with 2 or more values where the trend matters: flagged, moving, near a boundary, or tied to an active intervention. Include the reference range when the source files state one.
- **Regimen:** all active medications (name, dose, since; chip for anything needing attention such as an unreviewed PGx flag) and active supplements (name, dose, since).
- **Experiments:** every active experiment (status, evaluation date) and recent completed ones (verdict).
- **Symptoms:** monthly counts per symptom type across the covered months. Counts come from actual entries; do not smooth.
- **Assessments and vitals:** score trends per instrument; home BP series if tracked.
- **Freshness:** last-updated per source, from file frontmatter and latest entry dates.

### Step 2: Serialize into the schema

Build one JSON object. All sections optional; omit what the graph does not have — the shell hides empty sections gracefully.

```
{
  "meta": { "name": str, "generated": "YYYY-MM-DD", "range": "MMM YYYY – MMM YYYY",
            "fictional": bool  // true ONLY for the sample graph; shows the demo banner
  },
  "status": [ { "label": str, "value": str|num, "unit": str, "domain": "cardio|neuro|metab|inflam|status",
                "trend": "up|down|flat", "tone": "watch|good|", "trendLabel": str } ],
  "timeline": [ { "date": "YYYY-MM-DD", "label": str (short, <=20 chars), "domain": domain } ],
  "labs": [ { "name": str, "unit": str, "domain": domain, "flag": "watch|low|ok"|null, "flagLabel": str,
              "range": {"low": num, "high": num}|null, "note": str|null,
              "points": [ {"date": "YYYY-MM-DD", "value": num} ] } ],
  "medications": [ { "name": str, "sub": "dose · since YYYY-MM", "chip": str|null, "chipTone": "note|active|", "right": str } ],
  "supplements": [ same shape as medications ],
  "experiments": [ { "id": "EXP-001", "name": str, "status": "active|confirmed|refuted|inconclusive",
                     "statusLabel": str, "detail": one-line design or result summary } ],
  "symptoms": { "months": ["Mar","Apr",...], "types": [ { "name": str, "domain": domain, "counts": [int per month] } ] },
  "assessments": [ { "name": "GAD-7", "points": [ {"date": "YYYY-MM-DD", "score": num, "band": str} ] } ],
  "vitals": { "bp": [ {"date": "YYYY-MM-DD", "sys": num, "dia": num} ] },
  "freshness": [ { "source": str, "last": "YYYY-MM-DD" } ]
}
```

Domain mapping guidance: lipids, BP, and cardiovascular genetics are `cardio`; glucose, weight, nutrition, and energy metabolism are `metab`; inflammatory markers, immune symptoms, and medication-reaction concerns are `inflam`; sleep, mood, assessments, and cognition are `neuro`; protocols, recovery, and general wellness are `status`.

Serialization conventions (follow these; they remove the judgment calls):
- **One-sided reference ranges** ("< 130", "< 5.7"): use `{"low": null, "high": 130}` (or the reverse). Never fabricate a missing bound. The shell tolerates null bounds.
- **Conflicting ranges across labs:** use the most recent lab's stated range for the band; mention the conflict in the marker's `note` (e.g., "ranges differ: Quest < 130, Function 52-135").
- **Single-measurement status items:** omit `trend` and use `trendLabel` alone (e.g., "mildly high · 1 draw"). The shell renders a label without an arrow.
- **Experiment ids:** use them only if EXPERIMENTS.md assigns them; otherwise omit the field. Never invent identifiers.
- **Monthly means the source does not compute** (e.g., wearable files with only weekly averages): derive as the day-weighted mean of the weekly rows and say so in the trendLabel or note if it materially matters.
- **Freshness dates:** use the latest data date the source actually covers (last entry, last draw), falling back to frontmatter `updated` only when no data date exists.

### Step 3: Inject and save

1. Copy `templates/dashboard_shell.html` in full.
2. Replace the `const PHG_DATA = {...};` assignment between the `PHG_DATA` markers with the serialized object. Valid JSON, no trailing commas, no functions.
3. Save as `reports/dashboard_YYYY-MM-DD.html` (for the sample graph: `sample/dashboard.html`).
4. Tell the user the path and that it opens by double-clicking, offline.

### Step 4: Sanity pass

Before finishing, verify: every date is real and sourced from the files (never invented); every lab value matches its source to the digit; the JSON parses; no external URLs anywhere in the output; the fictional flag is set if and only if the source is the sample graph.

## Important notes

- **Accuracy over completeness.** A dashboard with six correct panels beats one with ten panels and a transcription error. Every number on the page must trace to a file.
- **This artifact is the most shareable file the system produces.** It is one HTML file containing a person's health picture. It lives in `reports/`, which is gitignored, and the sharing guidance in the README applies to it fully.
- **Regenerate, never edit.** The dashboard is derived and disposable. When data changes, run the skill again.
- **If the shell is missing** (a fork stripped `templates/`), stop and say so rather than improvising a page; the fixed shell is what guarantees consistent output.
