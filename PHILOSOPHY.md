---
schema_version: "0.3.0"
type: meta
created: 2026-08-14
updated: 2026-08-14
tags: [philosophy, ethos, principles]
---

# Philosophy

## Why this exists

I spent my career building health platforms. Knowledge-engineered decision trees, master databases for genetics and labs and wearables, backends that cost millions before a single user saw value. I watched the industry build walled gardens: subscriptions to access your own information, proprietary databases holding data you paid to generate. And I watched every commercial health AI get quietly limited, because a company that holds your data carries liability for what its AI tells you, and the safe legal answer is an AI that tells you almost nothing.

The result is a system where you pay the premiums, the copays, and the subscriptions, and in return you get a fraction of your own picture, interpreted by a capability-limited model, inside an account you can't leave with.

Then large language models removed the reason any of that complexity existed. The expensive layers, the knowledge engineering and the structured backends, are no longer necessary. A folder of plain text files and a frontier model can out-reason platforms that took a decade and tens of millions to build. Once the infrastructure stopped being the hard part, only one question remained: who holds the canonical copy. This project is my answer.

## What I believe

- **Your health record belongs to you.** The canonical copy lives on your device, in a format you can open, read, and edit without anyone's permission.
- **The person with the most at stake deserves the best available intelligence.** Not the safest version, not the credential-gated version. The best one, reading everything.
- **The qualitative layer is health data.** Why you started something, what you noticed, what changed and when. No institution collects this. Only you can, and it is what makes the rest interpretable.
- **Liability structures should not decide what you are allowed to understand about yourself.**
- **A clinician belongs in the loop for consequential decisions.** The analysis exists to make those conversations better, never to replace them.
- **Coherence is not correctness.** A system that helps you find things must also help you test them and doubt them. That is why the experiments, the fact audits, and the failure-mode documentation are core, not extras.
- **Open source is the trust mechanism.** You can read every line of the methodology that reads your medical history. That is not a distribution strategy; it is the reason this can be trusted at all.
- **No lock-in. Ever.** Plain files, portable everywhere, readable by whatever AI comes next.

## What this project will never do

- **Never become a product.** This is a schema and a methodology. Companies are welcome to build products on top of it, and I hope they do. The substrate stays free.
- **Never collect, transmit, or see your data.** There is no server, no account, no telemetry. There never will be.
- **Never gate capability.** No paywall, no tier, no credential check between you and the full system.
- **Never adopt a proprietary format.** If this repository disappeared tomorrow, every file you created would keep working with any text editor and any AI.
- **Never break your existing files.** Backward compatibility with your data is a contract, not a preference.

## What it asks of you

Honesty in both directions. Assembling your history takes real effort, and the first pass feels like filing ten years of taxes in one sitting. Verification is your job; the system helps you doubt its own output, but only if you use those tools. And the findings that matter belong in front of a clinician before they change what you take or do.

*Doesn't replace your doctor. Makes every AI smarter about you.*
