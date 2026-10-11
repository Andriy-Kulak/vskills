# Contributing to vskills

Thank you for your interest in contributing to vskills! This guide will help you add new entries, fix existing data, or improve the project.

## Adding a New Entry

**The full rules (eligibility, where each field comes from, ID format, what never to do) are in [AGENTS.md](AGENTS.md).** It's written for coding agents, but it's the source of truth for everyone.

The short version:

1. Fork the repo and add your entry to the **top** of `data/entries.json`.
2. Get post data from the X API or X's oEmbed endpoint. Never invent values: leave unknown fields `null`.
3. Copy prompts word for word, and only from the creator.
4. Run `npm run validate`, then open a PR titled `Add: <id>`.

Don't want to edit JSON? [Suggest an entry](https://github.com/Andriy-Kulak/vskills/issues/new?template=new-entry.md) instead.

## Fixing Existing Data

If you find an error in existing data:

1. Open an issue describing the problem, OR
2. Submit a PR with the fix

Common fixes:
- Correcting creator attribution
- Updating broken URLs
- Adding missing prompts
- Fixing categorization

## Requesting Content Removal

If you're the creator of content and want it removed:

1. [Open a takedown issue](https://github.com/Andriy-Kulak/vskills/issues/new?template=takedown.md)
2. Provide proof of ownership
3. We'll remove it promptly

## Code Contributions

For code changes (UI, features, bug fixes):

1. Fork and create a feature branch
2. Make your changes
3. Run `npm run build` to ensure it builds
4. Submit a PR with a clear description

### Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/vskills.git
cd vskills
npm install
npm run dev
```

### Code Style

See "Changing code" in [AGENTS.md](AGENTS.md).

## Questions?

Open an issue or start a discussion. We're happy to help!

---

Thank you for helping make vskills better! 🎬
