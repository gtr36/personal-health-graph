---
schema_version: "0.1.0"
type: skill
subtype: workflow
name: Meeting to Protocol
description: Extract health-relevant information from meeting transcripts, update PHG files, schedule protocols in calendar, and create trackable follow-up items.
reads:
  - PROFILE.md
  - SUPPLEMENTS.md
  - PROTOCOLS.md
  - DOCTOR_QS.md
  - LABS_HISTORY.md
writes:
  - PROFILE.md (medication changes, new diagnoses)
  - SUPPLEMENTS.md (additions, dose adjustments, discontinuations)
  - PROTOCOLS.md (protocol changes log)
  - DOCTOR_QS.md (visit log, lab orders, carried-forward questions)
  - LABS_HISTORY.md (new values discussed in visit)
connectors_required:
  - Granola (meeting transcripts)
connectors_optional:
  - Gmail (provider correspondence, lab notifications)
  - Google Calendar or Fantastical (protocol scheduling)
  - Linear (issue tracking for follow-ups)
  - Apple Reminders (time-based follow-ups)
trigger: after any health-related meeting (doctor visit, health coaching, therapy, wellness consultation)
output: updated PHG files + calendar events + tracked action items
saves_to: reports/meeting_summary_YYYY-MM-DD.md
---

# Workflow Skill: Meeting to Protocol

## Purpose
After a health-related meeting — doctor visit, specialist consultation, health coaching session, therapy appointment — this workflow extracts every actionable piece of information from the transcript, updates the relevant PHG files, schedules new protocols into your calendar, and creates trackable follow-up items so nothing falls through the cracks.

The gap between "doctor said to do X" and "X actually happens" is where most health optimization breaks down. This workflow closes that gap.

## When to use
- After any doctor or specialist appointment
- After a health coaching or nutrition consultation
- After a therapy or mental health session (capture action items, not session content)
- After any meeting where health topics were discussed substantively
- When you receive health-related email correspondence that needs to be actioned

## Instructions for LLM

### Phase 1: Extract from meeting transcript

**Connect to Granola** and retrieve the transcript for the specified meeting.

Parse the transcript for the following categories. Be thorough — physicians often mention important items in passing, not as formal recommendations.

**1. Medication changes:**
- New prescriptions (drug, dose, frequency, duration, rationale)
- Dose adjustments to existing medications
- Medications discontinued
- Medications to taper or wean off

**2. Lab orders:**
- Tests ordered (name, ICD-10 code if mentioned, fasting requirements)
- When to get them done (immediately, in X weeks, at next visit)
- Where to go (specific lab, any lab, hospital lab)
- Whether results will be sent or need follow-up

**3. Supplement recommendations:**
- New supplements suggested (name, dose, form, timing)
- Changes to existing supplements
- Supplements to stop

**4. Protocol changes:**
- Diet modifications
- Exercise adjustments (restrictions, new recommendations)
- Sleep hygiene changes
- New interventions (PT, specialist referrals, procedures)

**5. Follow-up items:**
- Next appointment (when, with whom, purpose)
- Referrals to other providers (specialty, urgency, reason)
- Tests or screenings to schedule
- Items to monitor and report back on
- Questions that weren't answered (carry forward to next visit)

**6. Diagnoses or assessments discussed:**
- New diagnoses
- Working diagnoses or differentials being considered
- Risk factors flagged
- "Watch and wait" items with criteria for escalation

**7. Insurance or administrative items:**
- Prior authorizations needed
- Referral paperwork
- Records to request or send
- Appeals or coverage questions

### Phase 2: Cross-reference with Gmail (if connected)

Search for emails related to this provider or appointment within ±7 days. Look for:
- Appointment confirmation with specific instructions (fasting, medication holds)
- Pre-visit lab results that were referenced during the meeting
- Post-visit summary notes sent by the provider (MyChart messages, portal notifications)
- Prescription confirmations from pharmacy

Merge any additional information from email into the extracted data from Phase 1.

### Phase 3: Update PHG files

For each category extracted, update the appropriate file:

| Extracted Data | PHG File | Action |
|---------------|----------|--------|
| Medication changes | PROFILE.md → Medications section | Add/remove/modify medication entries |
| Lab orders | DOCTOR_QS.md → add to queued items | Document what was ordered and when |
| Supplement changes | SUPPLEMENTS.md | Add new, adjust doses, move to Discontinued |
| Protocol changes | PROTOCOLS.md → Protocol Changes Log | Add dated entry with what changed and why |
| Visit summary | DOCTOR_QS.md → Visit Log | Add full visit summary with date and provider |
| New diagnoses | PROFILE.md → Conditions section | Add with date and diagnosing provider |
| Unresolved questions | DOCTOR_QS.md → Questions queue | Carry forward with context |
| Lab results discussed | LABS_HISTORY.md | Update if new values were mentioned |

**Important:** When updating files, preserve existing data. Append, don't overwrite. Use the Protocol Changes Log in PROTOCOLS.md to document why changes were made — this is critical for future pattern analysis.

### Phase 4: Schedule protocols (if Calendar connected)

For each new protocol or changed protocol, create calendar events:

**Recurring events:**
- New supplement timing → recurring daily event in Health calendar
- New exercise protocol → recurring events at specified frequency
- Medication schedule changes → recurring daily event with dose in title

**One-time events:**
- Lab draw → single event with fasting instructions in notes, scheduled per provider timeline
- Follow-up appointment → single event with "schedule by [date]" if not yet booked
- Referral appointment → single event with "schedule by [date]" and referral details in notes

**Event format:**
```
Title: [Action Type]: [Brief Description]
Calendar: Health (or user's preferred health calendar)
Notes: 
  Source: [Provider name], [Date of meeting]
  PHG Reference: [Which file was updated]
  Details: [Relevant specifics — dose, fasting requirements, etc.]
```

### Phase 5: Create trackable items (if Linear connected)

Create Linear issues for items that need active follow-through:

**Issue categories and suggested labels:**
- `Lab` — lab tests to schedule or results to follow up on
- `Appointment` — appointments to book or referrals to action
- `Insurance` — prior auths, appeals, records requests
- `Protocol` — protocol changes to implement
- `Reorder` — supplements or medications to reorder

**Each issue should include:**
- Clear title: "[Action]: [Specific item]"
- Due date (based on urgency communicated by provider)
- Description with source context (who said it, when, why)
- Link back to the relevant PHG file

### Phase 6: Set reminders (if Apple Reminders connected)

For time-sensitive follow-ups that benefit from push notifications:
- "Schedule follow-up with Dr. [Name]" — reminder set for 1 week before the target window
- "Lab draw: [test name]" — reminder set for the date to get labs done, with fasting note
- "Refill [medication/supplement]" — reminder based on days of supply remaining
- "Check lab results" — reminder set for expected results date (typically 3-7 days post-draw)

### Phase 7: Generate summary

Produce a concise summary of everything that was done:

```
## Meeting-to-Protocol Summary
**Meeting:** [Provider name], [Date]
**Source:** Granola transcript + [Gmail if used]

### Files Updated
- [List each PHG file modified with a one-line description of what changed]

### Calendar Events Created
- [List each event with date/time]

### Linear Issues Created
- [List each issue with due date]

### Reminders Set
- [List each reminder with trigger date]

### Items Requiring Manual Action
- [Anything that couldn't be automated — e.g., "Call insurance to request prior auth for MRI"]

### Open Questions Carried Forward
- [Questions from DOCTOR_QS.md that weren't resolved in this visit]
```

## Important notes
- **Respect meeting privacy.** If the meeting transcript contains sensitive personal content beyond health action items (e.g., therapy session details, personal relationship discussions), extract only the actionable health items. Do not store session content.
- **Verify before creating.** Before creating calendar events or Linear issues, present the proposed items to the user for confirmation. A misinterpreted transcript item becoming a recurring calendar event is disruptive.
- **Degrade gracefully.** If only Granola is connected (no Calendar, no Linear, no Reminders), the workflow still works — it just stops at Phase 3 (PHG file updates) and lists the remaining items as manual actions.
- **Capture uncertainty.** If the transcript is ambiguous about a recommendation ("you might want to consider..." vs. "I'm prescribing..."), note the confidence level. Don't create calendar events for tentative suggestions.
