# vskills

> A **free**, open-source directory of AI-made videos, video prompts, and video/video-editing agent skills.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Entries](https://img.shields.io/badge/Entries-131-green.svg)](https://vskills.dev)

**[Browse the directory →](https://vskills.dev)**

## What is vskills?

vskills is like [cursor.directory](https://cursor.directory) or [skillry.dev](https://skillry.dev), but:
- **100% free** - No paywalls, no premium tiers, no subscriptions
- **Focused on video** - AI-generated videos, video prompts, and video-editing agent skills only
- **Open source** - All data in the repo, contributions welcome via PR
- **AI/LLM friendly** - Structured for both human browsing and programmatic access

## Features

### For Humans
- Media-first grid plus curated rails (most watched, installable skills)
- Entry pages play videos through X's official post embed
- Fast client-side search (⌘K or `/`), category chips, prompt/skill toggle, model family, engine, and sort by newest or most watched
- Shareable filter URLs
- Entry detail pages with one-click prompt copying
- Dark, cinematic UI
- Mobile friendly

### For AI/LLMs
- **[/llms.txt](https://vskills.dev/llms.txt)** - Summary index of all entries
- **[/llms-full.txt](https://vskills.dev/llms-full.txt)** - Full catalog with all prompts
- **[/api/entries](https://vskills.dev/api/entries)** - JSON API with search/filter support
- **[/api/entries/{id}](https://vskills.dev/api/entries/twoclipping-one-shape-a-seamless-ui-morph)** - Individual entry JSON
- **[/entries/{id}.md](https://vskills.dev/entries/twoclipping-one-shape-a-seamless-ui-morph.md)** - Raw markdown per entry
- JSON-LD structured data on all entry pages

## API Usage

### List all entries
```bash
curl https://vskills.dev/api/entries
```

### Search and filter
```bash
# Search by keyword
curl "https://vskills.dev/api/entries?q=music"

# Filter by category
curl "https://vskills.dev/api/entries?category=explainer"

# Filter by model family (opus, seedance, any-agent) or an exact model string
curl "https://vskills.dev/api/entries?model=seedance"

# Multiple filters
curl "https://vskills.dev/api/entries?hasPrompt=true&hasSkill=true"

# Pagination
curl "https://vskills.dev/api/entries?limit=10&offset=20"
```

### Get single entry
```bash
curl https://vskills.dev/api/entries/twoclipping-one-shape-a-seamless-ui-morph
```

### Response format
```json
{
  "total": 115,
  "offset": 0,
  "limit": 115,
  "entries": [
    {
      "id": "example-id",
      "title": "Example Video",
      "creator_name": "Creator Name",
      "creator_handle": "creator_handle",
      "source_url": "https://x.com/...",
      "source_type": "x",
      "date": "2026-10-01",
      "model": "Claude Opus 5.5",
      "engine": "hyperframes",
      "category": "explainer",
      "tags": ["tag1", "tag2"],
      "prompt": "The full prompt...",
      "prompt_kind": "full",
      "video_url": "https://...",
      "thumbnail_url": "https://...",
      "metrics": { "views": 100000, "likes": 5000 }
    }
  ]
}
```

## Data Structure

All entries are stored in [`data/entries.json`](data/entries.json). Each entry has:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | URL-safe unique identifier |
| `title` | string | Title/description of the video |
| `creator_name` | string | Creator's display name |
| `creator_handle` | string | X username or GitHub username |
| `source_url` | string | Link to original post/repo |
| `source_type` | `"x"` \| `"github"` | Source platform |
| `date` | string | YYYY-MM-DD format |
| `model` | string? | AI model used |
| `engine` | string? | Rendering engine (hyperframes, remotion, etc.) |
| `category` | string? | Content category |
| `tags` | string[]? | Relevant tags |
| `prompt` | string? | The prompt used |
| `prompt_kind` | `"full"` \| `"brief"` \| `"example"`? | Prompt completeness |
| `prompt_source_url` | string? | Where the prompt text was taken from |
| `prompt_in_source_post` | boolean? | Whether the prompt appears in the original post |
| `skill_url` | string? | Related skill/tool URL |
| `repo_url` | string? | GitHub repository |
| `install` | string? | Install command for skills |
| `needs_assets` | boolean? | Whether external assets are needed |
| `effort` | string? | Reported effort / reasoning level |
| `video_url` | string? | Media URL from the source API (the site plays X videos via the official embed, not this URL) |
| `thumbnail_url` | string? | Thumbnail image URL |
| `metrics` | object? | View/like counts |
| `license_note` | string? | Per-entry attribution and license notes |

See [`data/schema.json`](data/schema.json) for the full JSON Schema.

## Contributing

We welcome contributions, from people and coding agents alike. **[AGENTS.md](AGENTS.md)** is the source of truth for adding entries: where each field comes from, the ID format, and the rules (never invent data, copy prompts word for word). See [CONTRIBUTING.md](CONTRIBUTING.md) for how to:
- Add a new entry
- Fix or improve existing data
- Report issues

## Local Development

```bash
# Clone the repo
git clone https://github.com/Andriy-Kulak/vskills.git
cd vskills

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Validate data
npm run validate
```

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Cache Components)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Static generation (no database)
- Deployable to [Vercel](https://vercel.com/)

## License

- **Code**: [MIT License](LICENSE)
- **Content**: All prompts and videos belong to their original creators. This directory only indexes publicly shared content with attribution.

See [Sources & Attribution](https://vskills.dev/sources) for upstream data sources and their licenses.

### Creators: removal and corrections

X videos are shown through X's official post embed, so they're served by X and disappear here if you delete the post. If you'd like an entry removed or corrected, use the **Request removal** link on its page or [open a takedown issue](https://github.com/Andriy-Kulak/vskills/issues/new?template=takedown.md).

## Credits

Built with data from:
- [awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos) (MIT)
- [awesome-ai-motion](https://github.com/guanmo-ai/awesome-ai-motion) (MIT)
- [awesome-seedance](https://github.com/LearnPrompt/awesome-seedance) (CC BY 4.0)
- And other community sources

See [`data/SOURCES.md`](data/SOURCES.md) for full attribution.

---

**vskills** is free forever. Every prompt and video belongs to its creator.
