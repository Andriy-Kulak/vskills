# AGENTS.md

How to work on vskills. This file is the source of truth for adding and editing entries, for coding agents and humans alike. If another doc disagrees with it, this file wins.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run validate   # data rules; CI runs this
npm run lint
npm run build      # CI runs this
```

## Where things live

| Path | What |
|------|------|
| `data/entries.json` | The dataset. Most contributions only touch this file. |
| `scripts/validate.js` | Enforces the rules below. CI runs it on every PR. |
| `data/schema.json` | JSON Schema for an entry |
| `data/SOURCES.md` | Where the data came from, with licenses |
| `src/lib/types.ts`, `src/lib/data.ts` | Entry types, filters, model families |
| `src/app`, `src/components` | Next.js site |

## Add an entry from an X post

### 1. Check it belongs

- It's an AI-made video, or a skill or tool for making video with AI.
- The creator posted it publicly.
- It isn't already listed: search `data/entries.json` for the post's status ID.

### 2. Get the post data through official interfaces only

- **X API (preferred):** `GET /2/tweets/:id` with `expansions=author_id,attachments.media_keys`, `tweet.fields=created_at,public_metrics`, `user.fields=name,username` and `media.fields=preview_image_url,variants`.
- **No API access:** call X's oEmbed endpoint, `https://publish.twitter.com/oembed?url=<post url>&omit_script=true` (no auth needed). It returns the author name, the author URL, and the post text and date inside `html`. Long posts are cut off with "…". oEmbed gives no thumbnail and no metrics, so leave those fields empty.
- **Never** scrape x.com pages, use mirrors (fxtwitter, vxtwitter, nitter and the like), or get around X's hotlink blocking. X's terms forbid all three.

### 3. Fill the fields

Required fields come first. Leave every other field `null`, or omit it, unless you have a source for its value.

| Field | Value | Source |
|-------|-------|--------|
| `id` | `slug(creator_handle)` + `-` + the first 6 words of `slug(title)`. On a collision, append `-2`. Slug rule: lowercase, then each run of characters other than a–z and 0–9 becomes one `-`, trimmed at both ends. So `alexalbert__` becomes `alexalbert-…`. | derived |
| `title` | A short, neutral English description you write: sentence case, 70 characters or fewer, not the post text. Examples: "A pixel wizard casting spells", "One shape, a seamless UI morph loop". | you |
| `creator_name` | The creator's display name | API `user.name` / oEmbed `author_name` |
| `creator_handle` | The handle exactly as on X, case kept, no `@` | API `user.username` / oEmbed `author_url` |
| `source_url` | `https://x.com/<handle>/status/<id>`, with no query string | the post |
| `source_type` | `"x"` | |
| `date` | The day it was posted, `YYYY-MM-DD` in UTC | API `created_at` / oEmbed |
| `model` | Only what the post or prompt says. Use the canonical spellings: `Claude Opus 5.5`, `Seedance 2.5`, `Seedance 2.0`, `Seedance + Kling`. The site groups models into filter families by name: names containing "Opus", names containing "Seedance", and names starting "Any coding agent". A new family needs an entry in `MODEL_FAMILIES` in `src/lib/types.ts`. | post / prompt |
| `engine` | `hyperframes`, `remotion`, `seek-t-html` (code rendered frame by frame on HTML/canvas), `video-model` (a video generation model), or `other` if unclear | post / prompt |
| `category` | The single best fit: `ad-9x16`, `brand-showreel`, `character-story`, `data-viz`, `editing-workflow`, `explainer`, `music-visual`, `product-launch`, `typography`, `ui-motion`, `other` | you |
| `tags` | 2–6 lowercase kebab-case tools or techniques (`elevenlabs`, `three-js`) | post / prompt |
| `prompt` | The **complete prompt, word for word**, taken from the post, the creator's own thread replies, or a page the creator links to. Never take it from cut-off oEmbed text, never paraphrase it, never fill in missing parts. | creator |
| `prompt_kind` | `full` if the prompt is complete and at least 250 characters; `brief` for shorter ones | derived |
| `prompt_source_url` | The URL you copied the prompt from | |
| `prompt_in_source_post` | `true` if the prompt appears in the post itself | |
| `needs_assets` | `true` if the prompt needs files the user must supply (images, audio, references) | prompt |
| `effort` | Only if the post states it (`medium`, `high`, `xhigh`, `max`) | post |
| `thumbnail_url` | The media's `preview_image_url` (on `pbs.twimg.com`) | X API only |
| `video_url` | The highest-bitrate MP4 variant. Stored as data only; the site doesn't play it. | X API only |
| `metrics` | `{ "views", "likes", "checked": "<today>" }` | X API `public_metrics` only |
| `license_note` | `Prompt and video © the creator (shared publicly on X). Prompt text from <where>; post data via <X API \| oEmbed>.` | |

### 4. Insert and validate

- Add the entry at the **top** of the array. Keep the file's format: 2-space indent, raw UTF-8 (no `\u` escapes), no trailing newline.
- `npm run validate` must pass, with no warnings for your entry.
- Title the PR `Add: <id>`, with one entry per PR unless they're closely related.

## Add a GitHub skill entry

- `source_type: "github"`, `source_url` and `repo_url` are the repo URL, `creator_handle` is the repo owner.
- `install`: the install command copied word for word from the README. If the README has an example invocation, put it in `prompt` with `prompt_kind: "example"`.
- `date` may be `null`.
- Add the repo and its license (from the GitHub API) to the skill table in `data/SOURCES.md`.

## Hard rules

1. **Never invent data.** If you can't get a value from a source above, use `null` or leave the field out. This matters most for prompts, metrics, models and dates.
2. **Prompts are copied word for word**, and only from sources the creator shared.
3. **No scraping, no mirrors, no workarounds** for X. The site plays X videos only through X's official embed. Don't add code that loads `video.twimg.com` directly, and don't commit creators' media to the repo.
4. **Removal requests win.** If the creator asks for removal (a takedown issue), delete the entry.
5. **Don't edit other entries** unless you're fixing a verified error.

## Changing code

- Next.js 16 App Router (Cache Components on), React 19, Tailwind CSS v4. Dark-only design.
- Design tokens and utilities live in `src/app/globals.css`: `bg-surface`, `text-muted`, `border-line`, `text-accent`, `.label` (small mono uppercase), `.font-display`. Use them instead of raw colors.
- To add an entry field, update `src/lib/types.ts`, `data/schema.json`, `scripts/validate.js`, the README data table and this file together.
- Run `npm run lint`, `npm run validate` and `npm run build` before opening a PR.
