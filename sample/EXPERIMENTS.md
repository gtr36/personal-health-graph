---
schema_version: "0.3.0"
type: state
created: 2026-06-01T21:00:00-06:00
updated: 2026-08-01T09:10:00-06:00
tags: [experiments, n-of-1, sleep, supplements, sample]
---

<!-- FICTIONAL DEMO DATA — Sam Rivera is not a real person. -->

# N-of-1 Experiments

<!--
One entry per experiment. Design is written down BEFORE the intervention starts,
including the success criterion, so the verdict can't be moved after the fact.
-->

## Active

### Magnesium consolidation: pause NightWell, keep glycinate
- **Status:** Open
- **Designed:** 2026-07-30
- **Hypothesis:** Sleep metrics will hold without NightWell Sleep Complex; magnesium glycinate 400mg alone is enough. If true, that is $34/month and two fewer capsules a night.
- **Design:**
  - Baseline window: 2026-07-01 to 2026-07-31 (both products in use; WHOOP monthly mean sleep 7.15h, mean latency ~17 min)
  - Intervention window: 2026-08-01 to 2026-08-31 (NightWell paused; everything else unchanged)
- **Outcome metric + source:** Mean sleep duration and mean sleep latency (WHOOP 4.0, integrations/wearable_daily/); subjective sleep quality notes in journal/
- **Pre-committed success criterion:** August mean sleep duration within 15 minutes of the July baseline AND mean latency within 5 minutes → discontinue NightWell permanently
- **Evaluation date:** 2026-09-01
- **Result:** —
- **Verdict:** —

## Completed

### No caffeine after 12pm
- **Status:** Completed
- **Designed:** 2026-06-01
- **Hypothesis:** The second coffee (often 2-3pm) is stretching sleep latency and shortening total sleep.
- **Design:**
  - Baseline window: 2026-06-01 to 2026-06-14, usual pattern (second coffee ~2-3pm)
  - Intervention window: 2026-06-15 to 2026-06-28, no caffeine after 12pm; everything else unchanged
- **Outcome metric + source:** Mean sleep duration (WHOOP 4.0, integrations/wearable_daily/2026-06.md); sleep latency secondary
- **Pre-committed success criterion:** Intervention mean sleep duration at least 20 minutes longer than baseline → adopt the cutoff permanently
- **Evaluation date:** 2026-06-29
- **Result:** Baseline mean sleep 6.8h, mean latency 28 min. Intervention mean sleep 7.2h, mean latency 16 min. Difference: +24 minutes mean sleep. Criterion met.
- **Verdict:** Adopted 2026-06-29. Logged in PROTOCOLS.md change log.
