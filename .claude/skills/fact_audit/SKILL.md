---
name: fact_audit
description: Adversarially verify health data accuracy. Report mode re-checks a prior analysis report's claims against primary sources; foundation mode audits the graph itself, re-deriving every genetic call from the raw file and every lab row from the original document. Use when the user wants anything audited, verified, or double-checked, after a bulk data import, before trusting the graph for a major analysis, or after a surprising finding.
---

Read `skills/FACT_AUDIT.md` and execute the skill as specified. Infer the mode: "audit this report" is report mode; "verify my genetics," "check the graph," or a first audit after bulk intake is foundation mode. Follow the error-class checklist, record results in the Verification Logs, propose corrections rather than silently applying them, and save the audit to the location specified in its `saves_to:` field.
