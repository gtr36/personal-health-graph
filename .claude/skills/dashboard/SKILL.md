---
name: dashboard
description: Render the Personal Health Graph into a single self-contained HTML dashboard. Use when the user wants to see, visualize, or share a visual overview of their health data, or asks for their health dashboard.
---

Read `skills/DASHBOARD.md` and execute the skill as specified. Serialize the graph into the documented PHG_DATA schema, inject it into `templates/dashboard_shell.html` without altering the shell's markup, styles, or code, and save the result to the location specified in its `saves_to:` field. The output must remain fully self-contained with zero network requests, and every value must trace to a source file.
