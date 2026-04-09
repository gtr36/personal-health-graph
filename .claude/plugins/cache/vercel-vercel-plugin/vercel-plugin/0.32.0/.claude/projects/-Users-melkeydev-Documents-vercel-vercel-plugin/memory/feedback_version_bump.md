---
name: version-bump-on-changes
description: Always bump patch version across all version files when making changes to the plugin
type: feedback
---

Always bump the patch version when making changes to vercel-plugin.

**Why:** The user expects version bumps with every change. There are 3 files that contain the version and all must be updated together: `package.json`, `.cursor-plugin/plugin.json`, `.plugin/plugin.json`.

**How to apply:** Before committing, bump the patch version in all 3 files. Search for the current version string to find them all.
