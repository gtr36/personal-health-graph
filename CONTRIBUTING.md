# Contributing to Personal Health Graph

Thanks for your interest in improving PHG. This is a community project — contributions that make the template more useful, more accurate, or more accessible are welcome.

## How to contribute

1. **Fork the repository** to your own GitHub account.
2. **Create a branch** for your change (`git checkout -b my-improvement`).
3. **Make your changes** and test them by running the relevant skills against sample data.
4. **Submit a pull request** with a clear description of what you changed and why.

## What we're looking for

**New skills** — analysis methodologies that produce useful insights from PHG data. A good skill has: a clear purpose statement, explicit file reads, structured output format, and honest notes about limitations.

**New integration READMEs** — export guides for health platforms not yet covered. If you use a wearable, lab service, genetic testing platform, or health tool that doesn't have a README in `integrations/`, write one.

**Accuracy improvements** — corrections to medical terminology, clinical reference ranges, genetic variant interpretations, risk calculator descriptions, or platform export instructions. Cite your source.

**Connector additions** — MCP connectors or API integrations that extend PHG capabilities. Document them in `CONNECTORS.md` with: what it provides, how it integrates, setup instructions, and example prompts.

**Accessibility improvements** — making the template easier to understand and use for non-technical users. Clearer instructions, better examples, simplified onboarding.

## Guidelines

**Be accurate.** Health information must be correct. If you're adding clinical content, cite a primary source (peer-reviewed publication, clinical guideline, or authoritative database). Do not add health claims without evidence.

**Be honest about limitations.** Every skill, integration, and connector has limitations. Document them. "This doesn't work for X" is more valuable than silence.

**Don't add personal data.** Pull requests should never contain real health information — no real lab values, no real genetic data, no real patient information. Use placeholder values in examples.

**Keep it portable.** PHG is plain markdown with no dependencies. Don't introduce requirements for specific tools, platforms, or paid services. Everything should work with any text editor and any LLM.

**Keep it AI-agnostic.** Skills should work with Claude, ChatGPT, Gemini, or any capable LLM. Don't write skills that depend on features specific to one model.

**AI-specific on-ramps are welcome — as thin wrappers only.** Some AI systems support native skill or command structures (Claude Code's `.claude/skills/`, Cursor's commands, etc.). These can be added at the repo root as convenience layers for users of that specific system. The rule is simple: **the canonical skill always lives in `skills/`, and the AI-specific directory contains only thin pointer files that reference the canonical skill.** Never duplicate skill content across directories. This keeps the core template AI-agnostic while letting each AI system provide its best native UX. See `.claude/skills/` for the pattern (each wrapper is a `SKILL.md` with a one-line description and a pointer to the canonical file).

**Follow the existing schema.** New files should include YAML frontmatter consistent with `SCHEMA.md`. New skills should follow the established format: frontmatter with reads/output_format, clear instructions for the LLM, structured output template, and important notes. When you add a new skill, add a matching thin wrapper at `.claude/skills/<name>/SKILL.md` (and in any other AI on-ramp directories that exist).

## What we're not looking for

- Features that require a server, database, or cloud service to function
- Integrations with specific commercial products that require paid subscriptions (referencing them in READMEs is fine; requiring them is not)
- Content that constitutes medical advice or clinical recommendations
- Changes that break backward compatibility with existing user data

## Reporting issues

Use GitHub Issues for:
- Inaccurate medical or technical information
- Broken cross-references between files
- Missing or outdated platform export instructions
- Suggestions for new skills or integrations

## Code of conduct

Be respectful. Health is personal. People contributing to and using this project are managing real health concerns. Approach every interaction with that in mind.

## License

By contributing, you agree that your contributions will be licensed under the MIT License that covers this project.
