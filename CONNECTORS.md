---
schema_version: "0.1.0"
type: meta
created: 2026-04-08
updated: 2026-08-14
tags: [connectors, mcp, integrations, workflows]
---

# Personal Health Graph — Connectors & MCPs

## What this file is

The Personal Health Graph stores your data in plain markdown files. That's the foundation. But the real power emerges when you connect it to external tools — pulling in data from meetings, email, and research APIs, and pushing analysis out to calendars, project trackers, reports, and reminders.

This file catalogs the external connectors (MCPs, APIs, and tools) that enhance what PHG can do. Each connector is categorized by function, with setup instructions and examples of how it integrates with PHG skills.

**You don't need any of these to use PHG.** The core files and skills work with nothing but a local folder and an LLM. Connectors are force multipliers — each one you add creates new capabilities.

---

## How connectors work with PHG

PHG skills (in `skills/`) define *what* analysis to perform. Connectors define *where* data comes from and *where* outputs go. Workflow skills (in `skills/workflows/`) chain multiple connectors together into multi-step automations.

```
[Input Connectors] → [PHG Files] → [Analysis Skills] → [Output Connectors]
                                         ↑
                                  [Research APIs]
```

---

## Input Sources

Connectors that bring data *into* your Personal Health Graph.

### Granola (Meeting Transcripts)
- **What it provides:** Transcripts and structured notes from meetings — including doctor appointments, health coaching sessions, and any conversation where health was discussed.
- **PHG integration:** Extract action items, prescriptions discussed, lab orders requested, and follow-up tasks from meeting transcripts. Write relevant findings into `journal/`, `DOCTOR_QS.md`, or `PROTOCOLS.md`.
- **Setup:** Install the Granola MCP connector. Grant access to meeting folders containing health-related meetings.
- **Example prompt:** *"Pull my last appointment with Dr. [Name] from Granola. Extract any lab orders, medication changes, and follow-up instructions. Update DOCTOR_QS.md with the visit summary and add any new action items."*

### Gmail
- **What it provides:** Email content — lab result notifications, appointment confirmations, prescription alerts, provider correspondence, insurance communications.
- **PHG integration:** Extract lab result PDFs from email attachments, capture appointment scheduling details, identify provider communications that need follow-up.
- **Setup:** Install the Gmail MCP connector. Grant read access.
- **Example prompt:** *"Search my Gmail for emails from Function Health or Quest Diagnostics in the last 30 days. If there are new lab results, extract the data and update LABS_HISTORY.md."*

### Apple HealthKit / Health App
- **What it provides:** Daily aggregates from Apple Watch and connected devices — steps, heart rate, HRV (SDNN), sleep, blood oxygen, respiratory rate, noise exposure, cardio fitness (VO2 max estimate).
- **PHG integration:** Populate `integrations/healthkit/` files with daily metrics. Cross-reference with wearable data from other devices.
- **Setup:** Export from the Apple Health app, or run a HealthKit-compatible MCP server. Community-built options exist that unify Apple Health with Garmin, WHOOP, Polar, Strava, and other platforms behind one self-hosted MCP server, replacing manual exports with continuous sync — search the MCP registry for current options.
- **Caution:** community MCP servers handle sensitive health data. Prefer self-hosted deployments and review the project before granting access.
- **Note:** Apple Watch HRV is SDNN, not RMSSD. See `integrations/wearable_daily/README.md` for why this matters.

### Apple Reminders
- **What it provides:** Read existing reminders; create new ones on schedule.
- **PHG integration:** Set follow-up reminders for supplement reorders, lab retest dates, doctor appointment scheduling, protocol review dates.
- **Setup:** Install the Reminders MCP connector.

### Apple Notes
- **What it provides:** Read and write Apple Notes.
- **PHG integration:** Quick-capture health notes on mobile that can later be formalized into PHG journal entries.
- **Setup:** Install the Apple Notes MCP connector.

### iMessages
- **What it provides:** Read and send iMessages.
- **PHG integration:** Send yourself protocol reminders, share health summaries with family members or providers.
- **Setup:** Install the iMessages MCP connector.

### Google Calendar / Fantastical
- **What it provides:** Calendar events — appointment times, meeting context, schedule density.
- **PHG integration:** Correlate calendar density with symptom patterns (the SYMPTOM_ANALYSIS skill references this). Create health protocol events (supplement timing, workout schedule, lab appointments). Check for scheduling conflicts when booking health appointments.
- **Setup:** Install Google Calendar MCP or Fantastical MCP connector.
- **Example prompt:** *"Take my supplement protocol from PROTOCOLS.md and create recurring events in my Health calendar: morning stack at 7am, evening stack at 9pm, pre-workout stack at 5pm on MWF."*

---

## Research APIs

Connectors that provide scientific evidence and clinical data to enhance analysis quality. These turn PHG skills from "smart pattern matching" into "evidence-grounded clinical reasoning."

### PubMed / PMC
- **What it provides:** Access to tens of millions of biomedical literature citations and full-text articles.
- **PHG integration:** Validate supplement efficacy claims, research gene-nutrient interactions, find primary literature for genetic variant interpretations, verify clinical recommendations.
- **Which skills use it:** MASTER_ANALYSIS (variant interpretation), SUPPLEMENT_REVIEW (evidence grading), RISK_ASSESSMENT (clinical guideline citations), HEALTH_MEMO (hypothesis validation), RESEARCH_ENRICHMENT workflow.
- **Setup:** Install a PubMed MCP connector or use the NCBI E-utilities API.
- **Example prompt:** *"For each supplement in my stack, search PubMed for the most recent systematic review or meta-analysis supporting its use for the stated purpose. Update the evidence grade in SUPPLEMENT_REVIEW output."*

### Consensus API
- **What it provides:** AI-powered scientific literature search that returns evidence-based answers with citation counts and consensus meters.
- **PHG integration:** Rapid evidence checks — "Does magnesium glycinate improve sleep quality?" returns a synthesized answer with supporting papers, faster than manual PubMed searches.
- **Which skills use it:** SUPPLEMENT_REVIEW, SYMPTOM_ANALYSIS, HEALTH_MEMO, RESEARCH_ENRICHMENT workflow.
- **Setup:** Install the Consensus MCP connector.
- **Example prompt:** *"For each finding in my HEALTH_MEMO, run a Consensus search to verify the claim. Flag any finding where the scientific consensus contradicts my data-driven hypothesis."*

### Clinical Trials API (ClinicalTrials.gov)
- **What it provides:** Registry of hundreds of thousands of clinical trials — recruiting status, eligibility criteria, endpoints, sponsors, investigators, results.
- **PHG integration:** Identify relevant trials for conditions or interventions in your profile. Particularly valuable for people with conditions where standard-of-care is evolving or where novel interventions are being studied.
- **Which skills use it:** RISK_ASSESSMENT (emerging interventions), DOCTOR_PREP (trial options to discuss with physician), RESEARCH_ENRICHMENT workflow.
- **Setup:** Install the Clinical Trials MCP connector.
- **Example prompt:** *"Based on my PROFILE.md and GENETICS.md, search for actively recruiting clinical trials within 50 miles that I might be eligible for. Focus on trials related to [specific condition or biomarker]."*

### Scholar Gateway
- **What it provides:** Cross-platform academic search spanning multiple databases and preprint servers.
- **PHG integration:** Broader literature search than PubMed alone — captures preprints, conference proceedings, and interdisciplinary research that PubMed may miss.
- **Which skills use it:** RESEARCH_ENRICHMENT workflow, MASTER_ANALYSIS.
- **Setup:** Install the Scholar Gateway MCP connector.

### ICD-10 Code Lookup
- **What it provides:** International Classification of Diseases codes — the standardized coding system used by healthcare providers and insurers.
- **PHG integration:** Translate between clinical terminology and ICD-10 codes for insurance claims, medical records requests, and provider communications. Useful when requesting specific lab panels or understanding diagnosis codes on EOBs.
- **Which skills use it:** DOCTOR_PREP (ensuring correct diagnostic codes), PHYSICIAN_REPORT workflow.
- **Example prompt:** *"Look up the ICD-10 codes for the conditions in my PROFILE.md. Add them as a reference so I can verify they match what's on my medical records."*

### NPI Registry
- **What it provides:** National Provider Identifier lookup — verify provider credentials, specialties, and practice locations.
- **PHG integration:** Verify provider information in PROFILE.md, find specialists by specialty and location, confirm credentials before appointments.
- **Which skills use it:** DOCTOR_PREP, PHYSICIAN_REPORT workflow.
- **Example prompt:** *"Look up Dr. [Name]'s NPI to confirm their specialty and board certification status before my appointment."*

---

## Output Destinations

Connectors that push PHG analysis outputs to external tools for action, presentation, or tracking.

### Notion
- **What it provides:** Structured documents, databases, and wikis.
- **PHG integration:** Publish formatted health reports (HEALTH_MEMO, BASELINE_REPORT, RISK_ASSESSMENT outputs) as polished Notion pages. Create a Notion database tracking supplements, lab results, or protocol changes with richer formatting than markdown. Share specific pages with providers or health coaches.
- **Setup:** Install the Notion MCP connector. Create a dedicated PHG workspace or database.
- **Example prompt:** *"Take my latest HEALTH_MEMO and publish it as a Notion page in my Health workspace. Format it with proper headers, callout blocks for key findings, and a linked database for the decision register."*

### Gamma
- **What it provides:** AI-powered presentation and document generation.
- **PHG integration:** Transform PHG analysis outputs into visual presentations — ideal for physician visits, health coaching sessions, or personal review. Gamma can take the structured data from a DOCTOR_PREP or HEALTH_MEMO output and produce a polished visual document.
- **Setup:** Install the Gamma MCP connector.
- **Example prompt:** *"Take my DOCTOR_PREP output for tomorrow's cardiology appointment and create a Gamma presentation: one slide per section, with lab trend charts and key findings highlighted."*
- **Alternative:** Claude users can also paste DOCTOR_PREP or HEALTH_MEMO output into Claude Design (claude.ai) for a visual one-pager — an in-app surface, no connector required.

### Linear
- **What it provides:** Project and issue tracking.
- **PHG integration:** Turn health optimization into a managed project. Create issues for: lab tests to schedule, supplements to reorder, protocol changes to implement, follow-up items from doctor visits. Track completion status and deadlines.
- **Setup:** Install the Linear MCP connector. Create a dedicated Health project.
- **Example prompt:** *"From my BASELINE_REPORT 90-day roadmap, create Linear issues for each action item. Set due dates based on the month they belong to. Tag them by category (labs, supplements, protocols, appointments)."*

### Google Calendar / Fantastical (as output)
- **What it provides:** Scheduled events and reminders.
- **PHG integration:** Convert protocols into calendar events (supplement timing, workout schedule, meal prep), schedule lab retest dates, block time for health reviews.
- **Setup:** Same connector as Input Sources above — bidirectional.
- **Example prompt:** *"My SUPPLEMENT_REVIEW recommended retesting Vitamin D (25-OH) in August. Create a calendar event for the week of August 10 titled 'Lab Draw: Vitamin D recheck' with notes from the review."*

### Apple Reminders (as output)
- **What it provides:** Scheduled reminders with due dates and recurrence.
- **PHG integration:** Create recurring reminders for supplement reorders (based on supply duration in SUPPLEMENTS.md), lab scheduling, protocol review dates, doctor follow-up items.
- **Setup:** Same connector as Input Sources above.
- **Example prompt:** *"Based on SUPPLEMENTS.md, create a recurring reminder for each supplement that needs reordering. Calculate the reorder date from the supply duration and start date."*

### Word / PowerPoint (via native MCP)
- **What it provides:** Professional document and presentation creation.
- **PHG integration:** Generate formal physician reports in Word format, create health review presentations in PowerPoint. These are useful when you need documents in standard professional formats rather than markdown.
- **Setup:** Install the Word or PowerPoint MCP connector.

---

## Connector Combinations (Workflow Patterns)

The real power isn't in any single connector — it's in chaining them. Here are the primary workflow patterns. Each has a dedicated workflow skill in `skills/workflows/`.

### Pattern 1: Meeting → Protocol → Calendar → Tracker
**Connectors:** Granola + Gmail + Google Calendar + Linear
**Skill:** `skills/workflows/MEETING_TO_PROTOCOL.md`
**Flow:** Doctor appointment transcript → extract action items and protocol changes → update PHG files → create calendar events for new protocols → create Linear issues for follow-ups.

### Pattern 2: Analysis → Report → Delivery → Follow-up
**Connectors:** Notion or Gamma + Apple Reminders
**Skill:** `skills/workflows/PHYSICIAN_REPORT.md`
**Flow:** Run any PHG analysis skill → format output as a polished Notion page or Gamma presentation → set reminders for follow-up actions from the report.

### Pattern 3: Question → Literature → Validation → Synthesis
**Connectors:** PubMed + Consensus + Clinical Trials + Scholar Gateway
**Skill:** `skills/workflows/RESEARCH_ENRICHMENT.md`
**Flow:** Take a hypothesis or finding from any PHG analysis → search across all research APIs → synthesize evidence quality → update the original finding with citations and confidence adjustment.

---

## Adding New Connectors

PHG is designed to be extended. If you use a tool not listed here:

1. **Check for an MCP connector.** Many tools have MCP server implementations. Search the official MCP Registry (https://registry.modelcontextprotocol.io) and your AI client's connector directory.
2. **Determine the category.** Is this tool an input source, a research API, or an output destination?
3. **Add it to this file** under the appropriate section with: what it provides, how it integrates with PHG, which skills use it, and setup instructions.
4. **Update relevant skills** if the new connector adds a data source they should read or an output option they should support.

The connector ecosystem is evolving rapidly. This file should be updated as new integrations become available.
