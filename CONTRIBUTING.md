# Contributing to vskills

Thank you for your interest in contributing to vskills! This guide will help you add new entries, fix existing data, or improve the project.

## Adding a New Entry

### Requirements

Before adding an entry, make sure it:

1. **Is an AI-generated video** or a **video-editing skill/tool** for AI agents
2. **Has a public source** (X post, GitHub repo, etc.)
3. **Has the creator's permission** to be indexed (publicly shared content is generally OK)
4. **Includes proper attribution** to the original creator

### Steps to Add an Entry

1. **Fork this repository**

2. **Edit `data/entries.json`**

   Add your entry to the array. Here's the minimal required structure:

   ```json
   {
     "id": "creatorhandle-short-descriptive-slug",
     "title": "Title of the Video or Skill",
     "creator_name": "Creator Display Name",
     "creator_handle": "creatorhandle",
     "source_url": "https://x.com/creatorhandle/status/...",
     "source_type": "x",
     "date": "2026-10-01"
   }
   ```

3. **Add optional fields as available:**

   ```json
   {
     "model": "Claude Opus 5.5",
     "engine": "hyperframes",
     "category": "explainer",
     "tags": ["tag1", "tag2"],
     "prompt": "The full prompt text...",
     "prompt_kind": "full",
     "video_url": "https://video.twimg.com/...",
     "thumbnail_url": "https://pbs.twimg.com/...",
     "repo_url": "https://github.com/...",
     "install": "npx cursor-tools@latest install skill-name",
     "needs_assets": true,
     "metrics": {
       "views": 50000,
       "likes": 2000,
       "checked": "2026-10-01"
     },
     "license_note": "Prompt and video © the creator."
   }
   ```

4. **Validate your changes:**

   ```bash
   npm run validate
   ```

5. **Submit a Pull Request**

   Use the PR template and fill in the details about what you're adding.

### Field Guidelines

#### `id`
- Lowercase, hyphenated
- Format: `creatorhandle-short-description`
- Must be unique

#### `source_type`
- `"x"` for X/Twitter posts
- `"github"` for GitHub repositories

#### `engine`
- `"hyperframes"` - Hyperframes framework
- `"remotion"` - Remotion framework
- `"seek-t-html"` - HTML/Canvas frame-by-frame rendering
- `"video-model"` - Pure video model generation (Seedance, Kling, etc.)
- `"other"` - Other or unspecified

#### `category`
- `"ad-9x16"` - Vertical ads
- `"brand-showreel"` - Brand showcase reels
- `"character-story"` - Character-driven narratives
- `"data-viz"` - Data visualization
- `"editing-workflow"` - Editing workflows/tools
- `"explainer"` - Educational/explainer content
- `"music-visual"` - Music videos/visualizers
- `"product-launch"` - Product launches
- `"typography"` - Typography/kinetic text
- `"ui-motion"` - UI/UX motion design
- `"other"` - Other

#### `prompt_kind`
- `"full"` - Complete prompt (≥250 chars)
- `"brief"` - Short prompt or one-liner
- `"example"` - Example invocation from a skill README

#### `needs_assets`
- `true` if the prompt requires external assets (images, audio, reference files)
- `false` or `null` if self-contained

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

- TypeScript with strict mode
- Tailwind CSS for styling
- Follow existing patterns

## Questions?

Open an issue or start a discussion. We're happy to help!

---

Thank you for helping make vskills better! 🎬
