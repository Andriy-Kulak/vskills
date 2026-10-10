# vskills

> A **free**, open-source directory of AI-made videos, video prompts, and video/video-editing agent skills.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Entries](https://img.shields.io/badge/Entries-115-green.svg)](https://vskills.dev)

**[Browse the directory →](https://vskills.dev)**

## What is vskills?

vskills is like [cursor.directory](https://cursor.directory) or [skillry.dev](https://skillry.dev), but:
- **100% free** - No paywalls, no premium tiers, no subscriptions
- **Focused on video** - AI-generated videos, video prompts, and video-editing agent skills only
- **Open source** - All data in the repo, contributions welcome via PR
- **AI/LLM friendly** - Structured for both human browsing and programmatic access

## Features

### For Humans
- Grid of entries with video thumbnails (lazy preview on hover)
- Fast client-side search and filters (category, model, engine, has prompt, has skill, needs assets)
- Shareable filter URLs
- Entry detail pages with one-click prompt copying
- Dark mode support
- Mobile friendly

### For AI/LLMs
- **[/llms.txt](https://vskills.dev/llms.txt)** - Summary index of all entries
- **[/llms-full.txt](https://vskills.dev/llms-full.txt)** - Full catalog with all prompts
- **[/api/entries](https://vskills.dev/api/entries)** - JSON API with search/filter support
- **[/api/entries/{id}](https://vskills.dev/api/entries/example-id)** - Individual entry JSON
- **[/entries/{id}.md](https://vskills.dev/entries/example-id.md)** - Raw markdown per entry
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

# Filter by model
curl "https://vskills.dev/api/entries?model=Claude%20Opus%205.5"

# Multiple filters
curl "https://vskills.dev/api/entries?hasPrompt=true&hasSkill=true"

# Pagination
curl "https://vskills.dev/api/entries?limit=10&offset=20"
```

### Get single entry
```bash
curl https://vskills.dev/api/entries/donaldjewkes-claude-pop
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
| `skill_url` | string? | Related skill/tool URL |
| `repo_url` | string? | GitHub repository |
| `install` | string? | Install command for skills |
| `needs_assets` | boolean? | Whether external assets are needed |
| `video_url` | string? | Direct video URL |
| `thumbnail_url` | string? | Thumbnail image URL |
| `metrics` | object? | View/like counts |

See [`data/schema.json`](data/schema.json) for the full JSON Schema.

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for how to:
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

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Static generation (no database)
- Deployable to [Vercel](https://vercel.com/)

## License

- **Code**: [MIT License](LICENSE)
- **Content**: All prompts and videos belong to their original creators. This directory only indexes publicly shared content with attribution.

See [Sources & Attribution](https://vskills.dev/sources) for upstream data sources and their licenses.

## Credits

Built with data from:
- [awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos) (MIT)
- [awesome-ai-motion](https://github.com/guanmo-ai/awesome-ai-motion) (MIT)
- [awesome-seedance](https://github.com/LearnPrompt/awesome-seedance) (CC BY 4.0)
- And other community sources

See [`data/SOURCES.md`](data/SOURCES.md) for full attribution.

---

**vskills** is free forever. Every prompt and video belongs to its creator.
