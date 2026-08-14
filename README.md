# Personal Health Graph (PHG)

**Your complete health history, structured in one folder you own. Readable by any AI, locked into none.**

> **Important:** Personal Health Graph is an organizational tool, not a medical product. It does not provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before making health decisions. See [DISCLAIMER.md](DISCLAIMER.md) for full terms.

Your health data is scattered across a dozen systems that don't talk to each other. Your wearable has your sleep. Your lab provider has your bloodwork. Your genetics platform has your SNPs. Your supplement stack lives in a note on your phone. Your symptom history lives in your memory.

None of these systems capture the thing that actually matters: how you feel, what you noticed, what changed, and why you think it happened. The qualitative layer — the context that makes all the quantitative data interpretable — lives nowhere today.

Personal Health Graph is a set of structured markdown files that consolidate your complete health picture into one place, readable by any AI. Point Claude, ChatGPT, Gemini, or any LLM at this folder, and it can reason across your full history instead of starting from zero every conversation. Think of it as a headless health brain: no app, no server, no subscription. Structured files plus whatever frontier AI you point at them.

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
├── PHILOSOPHY.md           ← Why this exists and what it will never do
├── CHANGELOG.md            ← Release history
├── CLAUDE.md               ← Guidance for Claude Code sessions
├── .claude/skills/         ← Native Claude Code slash commands (thin wrappers)
├── .gitignore              ← Protects personal data from accidental commits
│
├── PROFILE.md              ← Demographics, conditions, providers
├── MEDICATIONS.md          ← Prescriptions: active, discontinued, interactions
├── SUPPLEMENTS.md          ← Active stack: doses, timing, brands, rationale
├── PROTOCOLS.md            ← Routines, exercise, nutrition, sleep
├── DOCTOR_QS.md            ← Queued questions for providers, visit log
├── EXPENSES.md             ← Cost tracking across all health interventions
├── LABS_HISTORY.md         ← Longitudinal lab results across all providers
├── GENETICS.md             ← Genetic variants, interpretations, linked actions
├── EXPERIMENTS.md          ← Pre-registered N-of-1 self-experiments
├── TIMELINE.md             ← Derived chronological spine of all dated events
│
├── sample/                 ← Fictional demo patient — try the system in 5 minutes
├── templates/              ← Dashboard shell (self-contained HTML rendering)
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
│   ├── vitals/             ← Home BP, weight, ECG events, spot checks
│   ├── cgm/                ← Continuous glucose monitoring summaries
│   ├── nutrition/          ← Macro tracking and dietary phases
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
    ├── EXPERIMENT.md       ← Design and evaluate N-of-1 self-experiments
    ├── FACT_AUDIT.md       ← Re-verify a report's claims against source files
    ├── SPECIALIST_TRANSLATOR.md ← Specialty-native handoff briefs (ICD-10 tagged)
    ├── TIMELINE.md         ← Rebuild the chronological event spine
    ├── DASHBOARD.md        ← Render the graph as a self-contained HTML page
    └── workflows/          ← Multi-step automations with external tools
        ├── MEETING_TO_PROTOCOL.md
        ├── PHYSICIAN_REPORT.md
        └── RESEARCH_ENRICHMENT.md
```

---

## Quickstart

### Never used a tool like this? Start here.

1. **Get the folder.** Click the green **Code** button on this page, choose **Download ZIP**, and unzip it somewhere you'll find it (your Documents folder is fine). That folder is your health graph — it lives on your computer, and nothing in it ever gets uploaded unless you choose to share it.
2. **Pick your AI.** Claude (claude.ai, the desktop app, or Claude Code in a terminal) or ChatGPT both work. If you're not sure, Claude's Cowork mode is the easiest: it can open the folder directly and read and write the files for you.
3. **Let the AI drive.** Point your AI at the folder and say: *"Read skills/QUICKSTART.md and help me set up my Personal Health Graph."* It will walk you through everything from there, one question at a time.
4. **See your first result.** Once some data is in, say: *"Run skills/BASELINE_REPORT.md."* That first report — where you stand, what's missing, what to do next — is the moment the system starts paying for itself.

**Want to see it work before adding any of your own data?** Point your AI at the `sample/` folder — a fully populated fictional patient — and say: *"Run skills/BASELINE_REPORT.md against the sample/ directory."* Five minutes, zero commitment, and `sample/ANSWER_KEY.md` tells you afterward what a strong analysis should have found (it doubles as a quality benchmark for whichever AI you're using).

The detailed version:

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
Point Claude Code at the folder, or select it in Cowork (available on all paid Claude plans). Claude can read, cross-reference, and analyze all files directly, and the wrappers in `.claude/skills/` register every PHG skill natively, so Claude can invoke the right one on its own when your request matches.

### Claude (CLI)
From this folder, launch Claude in your terminal and run any skill as a slash command.

```bash
claude
```

Type `/` to see the full list (`/intake`, `/quickstart`, `/health_memo`, `/supplement_review`, and the rest). The commands come from thin wrappers in `.claude/skills/` that point at the canonical skill files in `skills/`, so the methodology lives in one place and every AI system runs the same version. Because the wrappers ship inside the repo, they also load automatically in Claude cloud sessions that clone the folder.

### ChatGPT
Upload your key files (PROFILE.md, SUPPLEMENTS.md, LABS_HISTORY.md, GENETICS.md) to a conversation or a Custom GPT. Paste a skill file to run analysis. If you use ChatGPT Health's connected records, PHG complements it: your canonical copy stays local and portable, and the same files remain readable by every other AI.

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

The longer version, including what this project will never do, lives in [PHILOSOPHY.md](PHILOSOPHY.md).

---

## File types explained

### State files (modified in place)
`PROFILE.md`, `MEDICATIONS.md`, `SUPPLEMENTS.md`, `PROTOCOLS.md`, `DOCTOR_QS.md`, `EXPENSES.md`, `LABS_HISTORY.md`, `GENETICS.md`, `EXPERIMENTS.md`, `TIMELINE.md`

Two of these have special rules. `EXPERIMENTS.md` is append-only in spirit: experiment designs are never edited after the experiment starts, only their status and results fields. `TIMELINE.md` is derived: it is rebuilt from the other files by the TIMELINE skill, and corrections belong in the source files, never in the timeline itself.

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

## What living with it looks like

The setup is the heavy part. After that, this is not a system you work on; it is a system that mostly runs in the background of your life, with a few minutes of attention at the moments where minutes have leverage.

**Most days: nothing.** Your wearable syncs, your life happens, the passive sources accumulate. The graph does not need you.

**When a lab result lands:** drop the PDF in `inbox/`, run INTAKE. Two minutes, and the longitudinal table has the new rows.

**Ten minutes on a Sunday:** run MAINTENANCE. It tells you what went stale, whether an experiment hit its evaluation date, and what is coming up. Most weeks the answer is "everything looks good."

**Before a doctor visit:** run DOCTOR_PREP, or a SPECIALIST_TRANSLATOR brief if it is a specialist. Walk in with the document that replaces the first ten minutes of "so what's been going on?"

**When something feels off:** log it in a sentence, then ask. The answer draws on everything: the sleep data, the medication start dates, the last time this happened.

**When you are curious whether something works:** design an experiment. The evaluation date arrives on its own schedule, with criteria you set before you started.

**Quarterly and annually:** a supplement review each quarter, a risk assessment and health memo each year. Each one reads the last one, so the record compounds.

**When you want to see it:** run DASHBOARD. One self-contained HTML page — your status, timeline, trends, regimen, and experiments — generated locally, opens from disk, makes zero network requests. Regenerate it whenever the data changes. (Curious what it looks like? Open `sample/dashboard.html` — the demo patient's rendered page ships with the repo.)

---

## Frequently asked questions

### "Why not FHIR?"

FHIR (Fast Healthcare Interoperability Resources) is designed for system-to-system data exchange between EHRs, insurance platforms, and health IT infrastructure. It solves interoperability between machines. PHG is designed for a different problem: human-and-AI readability on a local device. Nobody opens a FHIR bundle in a text editor. These solve different problems and coexist naturally — a FHIR adapter that reads/writes PHG files would be a welcome community contribution.

### "The skills are just prompts, not code."

Correct. Skills are methodology files — structured natural language instructions that tell an LLM what to read, how to reason, and what to produce. This is intentional: no dependencies, no runtime, no build step, no API keys. A methodology file works with any model that can read text. The tradeoff is that output quality depends on model capability. Skills are optimized for current frontier models (the latest Claude, GPT, and Gemini releases) and may produce weaker results on smaller or older models.

### "How do you know the output is correct?"

You don't — and the system doesn't claim to. PHG generates structured hypotheses and summaries for clinical discussion, not autonomous clinical decisions. The RESEARCH_ENRICHMENT workflow exists specifically to validate findings against primary literature (PubMed, Consensus, Clinical Trials). Every analysis skill notes that its output should be reviewed by a qualified professional. The goal is to make health conversations more productive, not to replace them.

### "N=1 data can't support causal claims."

Agreed. See the [Methodological Note](SCHEMA.md#methodological-note) in SCHEMA.md. PHG adapts population-level frameworks (Bradford Hill, GRADE, ASCVD) as analytical scaffolding for individual data. Pattern detection identifies candidates for clinical conversation, not confirmed causal relationships. The system includes minimum data thresholds, multiple comparison awareness, and data-density bias checks to reduce false pattern identification.

### "Why not just connect my records to ChatGPT Health or another AI health service?"

Connected-records products are useful, and PHG doesn't ask you to give them up. The difference is where the canonical copy lives. When your records sync into one vendor's account, your health context sits inside that vendor's walls: readable only by that vendor's AI, governed by that vendor's terms, and generally outside HIPAA once connected (consumer AI apps are not covered entities). PHG keeps the canonical copy on your device, in plain markdown any AI can read. Connect vendor products on top when they're useful. You never depend on them, and you take everything with you when you leave.

### "Does this only work with Claude?"

No. The files are plain markdown and the skills are plain-language methodology, so any capable LLM can run the system. Community users have run it end-to-end with GPT models via Cursor. The Claude-specific layer (`.claude/skills/`) is a thin convenience wrapper, not a dependency. One honest cost note: the analysis skills read a lot of context and are at their best on frontier models, so heavy use consumes meaningful tokens on whatever AI subscription you bring.

---

## Known failure modes

Structured data plus a capable LLM is powerful, and it fails in a specific way worth understanding before you rely on it.

**Plausible-but-wrong narratives.** The dangerous errors in AI health analysis are not hallucinations. They are coherent stories built on a single misread fact. One reviewer of this project reported a year-old AI-written genetics summary that misread strand orientation at a single MTHFR position: the genotype was reported as wild-type, and everything downstream (methylation status, supplement plan, lab interpretation) followed logically from the wrong call. The narrative stayed internally consistent for a year. Coherence is not evidence of correctness.

**What the system does about it.** The metadata requirements in GENETICS.md (platform, chip version, genome build, strand orientation) force the assumptions that normally live inside the AI's reasoning to be written down where they can be audited. MASTER_ANALYSIS carries a verification checklist and a Known Pitfalls section built from real production errors. RESEARCH_ENRICHMENT validates claims against primary literature. Triangulation helps most of all: genotype predictions, lab values, and symptoms should converge, and discordance is a signal to re-verify, never a detail to explain away.

**What it cannot do.** Verification checklists catch transcription errors; they are much weaker against coherent wrong narratives, because every downstream fact agrees with the upstream mistake. Anything load-bearing — a finding you would change a medication, supplement, or screening decision over — should be confirmed with clinical-grade testing and reviewed with a clinician before you act on it.

---

## Security considerations

Your health data is sensitive. A few things to keep in mind:

PHG files live on your local device — they're as secure as anything else on your computer. If you use full-disk encryption (FileVault on Mac, BitLocker on Windows), your health files are encrypted at rest. We recommend enabling this if you haven't already.

If you fork this repo and use it as a working copy with git, the `.gitignore` protects dated log entries, integration data files, raw exports, and generated reports from accidental commits. One important exception: the seven state files (PROFILE.md, SUPPLEMENTS.md, and the rest) are tracked templates, so git treats your filled-in edits as normal changes. Before using a fork as a working copy, untrack them first (`git rm --cached PROFILE.md`, then uncomment the matching lines in `.gitignore`). **Always verify before pushing** — run `git status` and review what's staged. If your fork is public, anything you push is visible to the world.

Most users will simply download the ZIP, unzip it, and fill in their data locally — in that case, git is not involved and there's no risk of accidental exposure.

The MIT license applies to the template schema and skill files. It does not grant anyone rights to your personal health data.

### Sharing parts of your graph

The unit of sharing is the report, never the raw graph. When a clinician, family member, or coach needs something, generate the scoped artifact (a SPECIALIST_TRANSLATOR brief, a DOCTOR_PREP summary, a HEALTH_MEMO) and share that. Before sharing anything, strip what the recipient does not need: insurance IDs, other providers' names if irrelevant, and anything about family members that is their story rather than yours. A quick pass with your AI ("review this brief for anything the recipient doesn't need") is cheap insurance. And remember that anything sent through a portal, email, or messaging app is governed by that channel's retention, not yours.

---

## Running graphs for more than one person

A health graph per person, a folder per graph. That is the entire architecture: copy the template again for your partner, your child, or a parent you help care for, and keep each copy in its own folder. The skills work identically on every copy, and nothing cross-contaminates because nothing is shared except the methodology.

Two practices matter for caregivers. First, keep each person's folder clearly named and point your AI at exactly one at a time; a model with two people's labs in context will eventually blend them. Second, respect that a graph you maintain for someone else is still their record: pregnancy monitoring, a child's growth data, or an aging parent's medication list deserve the same sharing discipline you apply to your own, and more consent, not less, as they become able to hold it themselves.

---

## If you're building a health company

The substrate problem is solved here, and it is MIT licensed: commercial use is free, no permission needed. If you are building a health product, the schema, the intake methodology, the analysis skills, and the dashboard shell are undifferentiated plumbing you no longer have to design, debate, or maintain. Fork it and ship sooner.

Your differentiation was never going to live in the plumbing. It lives in three places:

- **Novel data collection.** A sensor, assay, or diagnostic that produces a measurement nobody else has. Give it an integration format (a README and a _TEMPLATE, following the pattern of any `integrations/` directory here) and every AI your customer uses can reason over your data alongside everything else about them. Data that lands in a customer's graph is worth more to them than data trapped in your app, and they will know the difference.
- **Novel interpretation.** Models or clinical expertise that read data only you understand. Ship the methodology as a skill: your analysis, their graph, any AI.
- **Novel interventions.** The product, service, or care you actually deliver. The graph gives your intervention the longitudinal context that shows whether it works, which is the evidence your retention and your renewals depend on.

What building on an open substrate buys you is the thing you cannot manufacture: trust. "Export your complete data as a Personal Health Graph" is a one-line feature that tells customers they are not hostages, and it costs you nothing if your product is good.

Two norms, not obligations: keep the export path real (a PHG folder that actually works after a customer leaves), and send format improvements upstream so the substrate stays coherent for everyone. The FHIR adapter remains an open invitation.

---

## Contributing

This schema is open. If you build something useful on top of it — a new skill, a better integration format, a tool that writes to these files — share it. The system gets better as more people use it and refine it.

---

## Disclaimer

Personal Health Graph is a personal project shared as a public resource. It is not a medical device, clinical decision support system, or healthcare product. Nothing in this repository constitutes medical advice. AI-generated analysis from these files is informational only — it has not been clinically validated and may contain errors. Always consult qualified healthcare professionals before making decisions about your health.

See [DISCLAIMER.md](DISCLAIMER.md) for complete terms, and [LICENSE](LICENSE) for the MIT license.

## Credits

Built by [Garrett Ruhland](https://www.linkedin.com/in/garrett-ruhland). Born from the frustration of having a decade of health data scattered across a dozen systems, and the realization that the most useful thing I could build for my own health was a set of files on my local drive.

*Doesn't replace your doctor. Makes every AI smarter about you.*
