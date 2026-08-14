---
schema_version: "0.3.0"
type: skill
name: Timeline
description: Rebuild TIMELINE.md, the derived chronological spine of the health graph. Flattens every dated event from every file onto one timeline with lag annotations.
reads:
  - PROFILE.md (diagnoses, conditions with dates)
  - MEDICATIONS.md (start/stop dates)
  - SUPPLEMENTS.md (start/stop dates)
  - PROTOCOLS.md (protocol changes log)
  - LABS_HISTORY.md (draw dates)
  - DOCTOR_QS.md (visit log)
  - EXPERIMENTS.md (experiment windows)
  - symptoms/*.md (onset and resolution entries)
  - journal/*.md (dated life events)
  - integrations/imaging/*.md (scan dates)
  - integrations/*/  (other dated events as relevant)
writes:
  - TIMELINE.md (full rebuild — this file is derived, source files remain truth)
default_range: all available data
output_format: rebuilt TIMELINE.md plus a short change summary
saves_to: TIMELINE.md (in place; no separate report)
---

# Skill: Timeline

## Purpose

Health data is asynchronous: labs arrive quarterly, wearable data daily, symptoms sporadically, medication changes on no schedule at all. Nearly every interesting question in this system — did the intervention work, what preceded the symptom, why did the biomarker move — is a chronology question. TIMELINE.md is the derived index that makes those questions cheap, and this skill is what builds it.

Run it after INTAKE processes new data, after significant file updates, or via MAINTENANCE, which treats a stale timeline as a maintenance item.

## Instructions for LLM

### Step 1: Harvest events

Sweep every source file in `reads:` for dated events. One row per event:

- **Diagnoses and conditions** (PROFILE) — diagnosis dates
- **Medication starts, stops, dose changes** (MEDICATIONS) — including PRN patterns worth dating
- **Supplement starts and stops** (SUPPLEMENTS)
- **Protocol changes** (PROTOCOLS change log)
- **Lab draws** (LABS_HISTORY) — one event per draw date, not per biomarker
- **Imaging and procedures** (integrations/imaging)
- **Visits** (DOCTOR_QS visit log)
- **Experiment windows** (EXPERIMENTS) — start and end as separate events
- **Symptom onsets and resolutions** (symptoms/) — cluster onset dates, not every entry; a recurring symptom gets an onset event when it first appears and when its pattern visibly changes
- **Life events** (journal/) — moves, job changes, travel, major stressors explicitly dated

### Step 2: Rebuild the Events table

Full rebuild, chronological order, format: `| Date | Type | Event | Source |`. Dates in ISO format. The Source column carries the file path so every event is traceable. On conflicts between files (a start date that differs between MEDICATIONS.md and the visit log), record the discrepancy in the rebuild summary rather than silently choosing one — that conflict is a finding for FACT_AUDIT.

### Step 3: Annotate notable sequences

This is the analytical value-add over a bare event list. Identify and record in the Notable Sequences section:

- **Intervention-to-effect lags:** intervention start → first dated evidence of change (symptom entries, biomarker moves), with the lag in days
- **Chains:** event sequences that read as causal candidates (medication start → symptom onset; protocol change → metric shift)
- **Unexplained inflections:** metric or symptom-pattern changes with no adjacent event — flag them, because the missing event is often an unlogged life change worth asking the user about
- **Collision windows:** periods where multiple things changed at once, which downstream analysis must treat as confounded

### Step 4: Close out

Update the Rebuild Log with date, event count, and source-file count. Report to the user: events added since last rebuild, discrepancies found, and any unexplained inflections worth a journal entry.

## Important notes

- **Derived, never authoritative.** If an event is wrong in the timeline, the fix belongs in the source file, then rebuild. Never hand-patch TIMELINE.md.
- **Onsets, not every entry.** The timeline indexes pattern changes; the monthly files hold the entries. A timeline that duplicates every symptom entry is noise.
- **Discrepancies are findings.** Date conflicts between sources are exactly the class of error FACT_AUDIT exists to catch; surface them, don't smooth them.
- **Analysis skills read this file as an index** and follow Source links into the underlying files. Keeping it lean keeps every downstream skill cheaper.
