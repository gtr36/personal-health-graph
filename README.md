# Personal Health Graph (PHG)

**A portable, structured health context system that makes every AI smarter about you.**

> **Important:** Personal Health Graph is an organizational tool, not a medical product. It does not provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before making health decisions. See [DISCLAIMER.md](DISCLAIMER.md) for full terms.

Your health data is scattered across a dozen systems that don't talk to each other. Your wearable has your sleep. Your lab provider has your bloodwork. Your genetics platform has your SNPs. Your supplement stack lives in a note on your phone. Your symptom history lives in your memory.

None of these systems capture the thing that actually matters: how you feel, what you noticed, what changed, and why you think it happened. The qualitative layer — the context that makes all the quantitative data interpretable — lives nowhere today.

Personal Health Graph is a set of structured markdown files that consolidate your complete health picture into one place, readable by any AI. Point Claude, ChatGPT, Gemini, or any LLM at this folder, and it can reason across your full history instead of starting from zero every conversation.

---

## What's in the box

```
personal_health_graph/
├── README.md               ← You are here
├── SCHEMA.md               ← Full schema reference for humans and LLMs
├── MANIFEST.md             ← File index and version tracking
├── DISCLAIMER.md           ← Legal disclaimers and disclosures
├── LICENSE                 ← MIT License
├── CONTRIBUTING.md         ← Guidelines for community contributions
├── .gitignore              ← Protects personal data from accidental commits
│
├── PROFILE.md              ← Demographics, conditions, meds, providers
├── SUPPLEMENTS.md          ← Active stack: doses, timing, brands, rationale
├── PROTOCOLS.md            ← Routines, exercise, nutrition, sleep
├── DOCTOR_QS.md            ← Queued questions for providers, visit log
├── EXPENSES.md             ← Cost tracking across all health interventions
├── LABS_HISTORY.md         ← Longitudinal lab results across all providers
├── GENETICS.md             ← Genetic variants, interpretations, linked actions
│
├── symptoms/               ← Monthly symptom logs (append-only)
├── journal/                ← Notes, patterns, hypotheses, voice memos, mood
│
├── integrations/           ← Data from connected services
│   ├── labs/               ← Lab panel summaries (Function Health, Quest, etc.)
│   ├── genetics/           ← Genetic platform exports and summaries
│   ├── wearable_daily/     ← Daily wearable summaries (WHOOP, Oura, Garmin, etc.)
│   ├── healthkit/          ← Apple HealthKit daily aggregates
│   ├── microbiome/         ← Gut microbiome test results
│   ├── imaging/            ← MRI, DEXA, CT, ultrasound reports
│   ├── assessments/        ← Standardized health assessments (PHQ-9, GAD-7, PSQI, etc.)
│   ├── cycle/              ← Menstrual and fertility tracking
│   └── raw/                ← Full-resolution raw exports (JSON/CSV/PDF)
│
├── CONNECTORS.md           ← External tool integrations (MCPs, APIs)
│
├── inbox/                  ← Drop your files here (PDFs, CSVs, images, exports)
│   └── README.md           ← What to gather and how intake works
│
├── reports/                ← Generated analysis output (memos, reviews, dashboards)
│   └── README.md           ← Naming conventions, formats, sharing guide
│
└── skills/                 ← Analysis methodologies any LLM can run
    ├── SYMPTOM_ANALYSIS.md
    ├── SUPPLEMENT_REVIEW.md
    ├── DOCTOR_PREP.md
    ├── PATTERN_DETECTION.md
    ├── MASTER_ANALYSIS.md
    ├── HEALTH_MEMO.md      ← Amazon-style narrative health briefing
    ├── BASELINE_REPORT.md  ← First-run assessment with gap analysis
    ├── RISK_ASSESSMENT.md  ← Risk factor review (ASCVD, Framingham, PGx)
    ├── INTAKE.md           ← Bulk file processor (inbox/ → structured data)
    ├── QUICKSTART.md       ← Guided onboarding wizard
    ├── MAINTENANCE.md      ← Scheduled review and auto-update
    └── workflows/          ← Multi-step automations with external tools
        ├── MEETING_TO_PROTOCOL.md
        ├── PHYSICIAN_REPORT.md
        └── RESEARCH_ENRICHMENT.md
```

---

## Quickstart

### Step 1: Gather your files

Before anything else, collect whatever health documents you already have — lab PDFs, genetic reports, wearable exports, medical records, supplement lists, screenshots. Don't organize them. Just drop everything into the `inbox/` folder.

### Step 2: Run Intake

Give `skills/INTAKE.md` to any LLM with access to your files. It will scan the inbox, identify every document, extract the data into the right places, and archive the originals. One skill run can populate most of your health graph automatically.

### Step 3: Fill the gaps

After Intake, give `skills/QUICKSTART.md` to the same LLM. It detects what's already populated and walks you through whatever's missing:

**Tier 1 (~15 min):** Your health profile and supplement stack — enough to run basic analysis immediately.
**Tier 2 (~30-60 min):** Lab results import — upload a PDF and the AI extracts everything. This is where it gets powerful.
**Tier 3 (~1-3 hours):** Genetics, wearable data, imaging, microbiome — full depth.

You get value at every tier. A user who completes only Tier 1 can immediately run SUPPLEMENT_REVIEW and DOCTOR_PREP. You don't need everything on day one.

### If you prefer to set up manually:

1. **Fill in `PROFILE.md`** — demographics, conditions, medications, allergies, providers, goals.
2. **Log your supplement stack in `SUPPLEMENTS.md`** — dose, timing, brand, reason. "General health" is fine as a starting reason.
3. **Import lab work** — upload PDFs to `integrations/labs/` and create markdown summaries, or populate `LABS_HISTORY.md` directly for a longitudinal view.
4. **Add genetic data (optional)** — follow instructions in `GENETICS.md` to structure your variants. Dramatically improves supplement and risk analysis.
5. **Start logging** — create entries in `symptoms/` and `journal/`. Even one entry per week compounds.
6. **Run a skill** — paste any skill file from `skills/` into your preferred AI. Start with SUPPLEMENT_REVIEW if you have labs and a stack.

### Keeping it current

Run `skills/MAINTENANCE.md` weekly or monthly. It audits file staleness, validates cross-references, flags upcoming retest dates, and identifies new data to import. If connectors are set up (see `CONNECTORS.md`), it can detect new lab results in your email, upcoming appointments, and unprocessed meeting transcripts automatically.

---

## How to use this with an AI

### Claude (Projects)
Create a new Project in Claude. Add your Personal Health Graph files as project knowledge. Now every conversation in that project has your full health context. Paste a skill file to run structured analysis.

### Claude (Claude Code / Cowork)
Point Claude Code at the folder, or select it in Cowork. Claude can read, cross-reference, and analyze all files directly. Skills run natively.

### Claude CLI

From the Personal Health Graph repo root, start the CLI:

```bash
cd /path/to/personal-health-graph
claude
```

Skills/commands are loaded from `./claude`.

### ChatGPT
Upload your key files (PROFILE.md, SUPPLEMENTS.md, LABS_HISTORY.md, GENETICS.md) to a conversation or a Custom GPT. Paste a skill file to run analysis.

### Any MCP-compatible AI
If you have a Personal Health Graph MCP server configured, any MCP-compatible client gets structured read access to your files automatically.

### General approach
The files are plain markdown. Any LLM that accepts text input can read them. The more files you provide, the richer the analysis. At minimum, provide PROFILE.md + the relevant data files for whatever question you're asking.

---

## Design principles

**Local-first.** Your files live on your device. The canonical copy is always local. No server required.

**Plain markdown.** Every file is human-readable and editable in any text editor. No proprietary formats.

**Portable.** The entire folder is self-contained. Copy it, move it, back it up, sync it however you want. Nothing references external paths.

**Zero lock-in.** This is a file format, not a product. Use it with any AI, any tool, any workflow. If something better comes along, your data is already in the most portable format possible.

**AI-agnostic.** We don't build the intelligence. We make every AI's intelligence more useful by giving it structured context.

---

## File types explained

### State files (modified in place)
`PROFILE.md`, `SUPPLEMENTS.md`, `PROTOCOLS.md`, `DOCTOR_QS.md`, `EXPENSES.md`, `LABS_HISTORY.md`, `GENETICS.md`

These represent current truth. When your supplement stack changes, you update `SUPPLEMENTS.md`. When you get new lab results, you add rows to `LABS_HISTORY.md`. The file always reflects the latest state.

### Log files (append-only)
`symptoms/`, `journal/`

One file per month. New entries are appended chronologically. Existing entries are never modified (except to add resolution notes). This creates an audit trail of your health over time.

**symptoms/** is for discrete health events with severity scores — things you'd tell a doctor about. **journal/** is for everything else — observations, patterns, hypotheses, dietary notes, mood, voice-captured notes. If in doubt, put it in the journal. Each entry includes a `source` field (text, voice, image, integration) so you never lose provenance of how something was captured.

### Integration files (imported data)
`integrations/`

Data from external services, stored as markdown summaries. Each subdirectory has its own README explaining how to import and structure data from common sources. Raw exports go in `integrations/raw/` for archival.

### Skills (analysis methodologies)
`skills/`

Markdown instruction files that tell any LLM exactly how to analyze your data. Which files to read, what patterns to look for, what output format to produce. These are the analytical engine of Personal Health Graph.

### Workflow skills (multi-tool automations)
`skills/workflows/`

A layer above analysis skills. Workflow skills chain external connectors (meeting transcripts, research APIs, calendars, project trackers) with PHG analysis to automate end-to-end health workflows — from doctor visit transcript to updated files to scheduled follow-ups.

### Reports (generated output)
`reports/`

The finished product. Every time you run a skill, the output goes here — dated and named by type. Supplement reviews, risk assessments, health memos, doctor prep briefs, pattern detection scans. Reports can be markdown (for internal review and re-analysis), HTML (interactive dashboards with charts), Word/PDF (physician-ready formal documents), or presentations.

Reports compound over time. Run SUPPLEMENT_REVIEW quarterly and you can track how your stack evolved and whether biomarkers moved. Run RISK_ASSESSMENT annually and you can see your cardiovascular trajectory. Run HEALTH_MEMO before and after a protocol change and you have a before/after narrative. Several skills read prior reports to avoid redundant findings and track what changed.

### Connectors (external integrations)
`CONNECTORS.md`

Catalog of external tools and APIs that extend PHG: input sources (Granola, Gmail, HealthKit), research APIs (PubMed, Consensus, Clinical Trials, Scholar Gateway, ICD-10, NPI), and output destinations (Notion, Gamma, Linear, Calendar, Reminders). None are required — each one you connect adds new capabilities.

---

## What makes this work

The value isn't in the folder structure. It's in what happens when a capable LLM has access to all of this simultaneously:

- Your **lab trends** cross-referenced with your **genetic predispositions** reveal whether a biomarker is concerning for *you specifically* or just a population-level flag.
- Your **supplement stack** evaluated against your **labs and genetics** reveals whether each supplement has a real justification or is just noise.
- Your **symptom log** correlated with your **sleep data, calendar density, and supplement adherence** surfaces patterns you couldn't see yourself.
- Your **doctor prep** pulls from everything — symptoms, labs, journal entries, medications — and produces a structured brief that saves the first 10 minutes of every appointment.

None of this requires a special app. It requires structured data and a good LLM.

---

## Frequently asked questions

### "Why not FHIR?"

FHIR (Fast Healthcare Interoperability Resources) is designed for system-to-system data exchange between EHRs, insurance platforms, and health IT infrastructure. It solves interoperability between machines. PHG is designed for a different problem: human-and-AI readability on a local device. Nobody opens a FHIR bundle in a text editor. These solve different problems and coexist naturally — a FHIR adapter that reads/writes PHG files would be a welcome community contribution.

### "The skills are just prompts, not code."

Correct. Skills are methodology files — structured natural language instructions that tell an LLM what to read, how to reason, and what to produce. This is intentional: no dependencies, no runtime, no build step, no API keys. A methodology file works with any model that can read text. The tradeoff is that output quality depends on model capability. Skills are optimized for frontier models (Claude, GPT-4-class, Gemini Pro) and may produce weaker results on smaller models.

### "How do you know the output is correct?"

You don't — and the system doesn't claim to. PHG generates structured hypotheses and summaries for clinical discussion, not autonomous clinical decisions. The RESEARCH_ENRICHMENT workflow exists specifically to validate findings against primary literature (PubMed, Consensus, Clinical Trials). Every analysis skill notes that its output should be reviewed by a qualified professional. The goal is to make health conversations more productive, not to replace them.

### "N=1 data can't support causal claims."

Agreed. See the [Methodological Note](SCHEMA.md#methodological-note) in SCHEMA.md. PHG adapts population-level frameworks (Bradford Hill, GRADE, ASCVD) as analytical scaffolding for individual data. Pattern detection identifies candidates for clinical conversation, not confirmed causal relationships. The system includes minimum data thresholds and multiple comparison awareness to reduce false pattern identification.

---

## Security considerations

Your health data is sensitive. A few things to keep in mind:

PHG files live on your local device — they're as secure as anything else on your computer. If you use full-disk encryption (FileVault on Mac, BitLocker on Windows), your health files are encrypted at rest. We recommend enabling this if you haven't already.

If you fork this repo and use it as a working copy with git, the `.gitignore` is configured to prevent accidental commits of personal health data (dated entries, filled-in profiles, generated reports). **Always verify before pushing** — run `git status` and review what's staged. If your fork is public, anything you push is visible to the world.

Most users will simply download the ZIP, unzip it, and fill in their data locally — in that case, git is not involved and there's no risk of accidental exposure.

The MIT license applies to the template schema and skill files. It does not grant anyone rights to your personal health data.

---

## Contributing

This schema is open. If you build something useful on top of it — a new skill, a better integration format, a tool that writes to these files — share it. The system gets better as more people use it and refine it.

---

## Disclaimer

Personal Health Graph is a personal project shared as a public resource. It is not a medical device, clinical decision support system, or healthcare product. Nothing in this repository constitutes medical advice. AI-generated analysis from these files is informational only — it has not been clinically validated and may contain errors. Always consult qualified healthcare professionals before making decisions about your health.

See [DISCLAIMER.md](DISCLAIMER.md) for complete terms, and [LICENSE](LICENSE) for the MIT license.

## Credits

Built by [Garrett Ruhland](https://www.linkedin.com/in/garrettruhland/). Born from the frustration of having a decade of health data scattered across a dozen systems, and the realization that the most useful thing I could build for my own health was a set of files on my local drive.

*Doesn't replace your doctor. Makes every AI smarter about you.*
