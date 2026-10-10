# vskills dataset: sources and licenses

Built on 2026-10-10 (America/Mexico_City). `videos.json` has 115 entries. Every X entry's post was fetched from the X API on 2026-10-10 to confirm the post exists, its author handle and name, date, view and like counts, and the attached video. `video_url` and `thumbnail_url` are the direct media URLs from that API response (video.twimg.com / pbs.twimg.com). Videos and prompts belong to their creators; none of the upstream lists grant rights to the creators' content.

## Upstream lists and datasets used

| Source | URL | License | What was used |
|---|---|---|---|
| yihui-dev/awesome-opus5-5-videos (feeds Skillry) | https://github.com/yihui-dev/awesome-opus5-5-videos | MIT | Prompt text (`data/videos.json`, `prompts/*.md`). Partial prompts (`prompt_partial: true`) were excluded. |
| guanmo-ai/awesome-ai-motion | https://github.com/guanmo-ai/awesome-ai-motion | MIT (README defers creator content to THIRD_PARTY.md) | Prompt text (`prompts/*.txt`), English titles (`titleEn`), model attribution |
| LearnPrompt/awesome-seedance (goodcase.ai) | https://github.com/LearnPrompt/awesome-seedance | Code MIT; curation CC BY 4.0 (attribution required); prompts and media stay with creators | Seedance/Kling/Veo/Runway prompts (`promptFull`), English titles, model tags. Only `evidenceLevel: L2` cases with an X source. |
| zhuyansen/awesome-opus-5.5-video (JasonZhu.AI) | https://github.com/zhuyansen/awesome-opus-5.5-video · https://jasonzhu.ai/en/prompts/claude-opus-5-5 | No license file. README says "inclusion grants no license." | Facts only: the `reference_assets` flag (→ `needs_assets`) and help ranking candidates by views. No titles or text copied. |
| athemeroy/awesome-claude-5-5-videos | https://github.com/athemeroy/awesome-claude-5-5-videos | CC BY 4.0 | Background research only; no fields copied |
| joeseesun/opus-video-prompts | https://github.com/joeseesun/opus-video-prompts | No license file | Reviewed only; nothing copied |
| YouMind-OpenLab/awesome-seedance-2-prompts | https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts | CC BY 4.0 | Reviewed only; nothing copied |
| ZeroLu/awesome-seedance | https://github.com/ZeroLu/awesome-seedance | MIT | Reviewed only; nothing copied |
| 0xMovez article "How to build motion design studio with Opus 5.5" | https://x.com/0xMovez/status/2104216919033192746 | Creator content | Used to pick key examples (donaldjewkes, tdinh_me, robj3d3, __morse, twoclipping, verbove, achxvi, pleometric, stephanlivera, himanshutwtxs). Their prompts were copied from the creators' own posts. |

## Skill / repo entries (licenses from the GitHub API, 2026-10-10)

| Repo | License |
|---|---|
| https://github.com/heygen-com/hyperframes | Apache-2.0 |
| https://github.com/heygen-com/hyperframes-launches | Apache-2.0 |
| https://github.com/remotion-dev/skills | none detected by GitHub (check before redistributing) |
| https://github.com/lemomo-ai/lemo-opuscar | MIT |
| https://github.com/iart-ai/motion-skills | MIT |
| https://github.com/buildwithhanif/claude-animation-skill | MIT |
| https://github.com/JohnHeibel/ClaudeAnimationBase | MIT |
| https://github.com/JohnHeibel/PDoomVideo | none (all rights reserved by default) |
| https://github.com/makevoid/motion-graphics-music-video-skill | MIT |
| https://github.com/nateherkai/hyperframes-student-kit | NOASSERTION (custom; read before reuse) |
| https://github.com/Sunwood-ai-labs/hyperframes-motion-reel-skill | MIT |
| https://github.com/tuzhechen2005/opus-video-skills | NOASSERTION (custom; read before reuse) |
| https://github.com/diggerhq/shipvideo | none (all rights reserved by default) |
| https://github.com/adithya-s-k/manim_skill | MIT |
| https://github.com/dexhunter/seedance2-skill | MIT |
| https://github.com/OSideMedia/higgsfield-ai-prompt-skill | MIT |
| https://github.com/zenstory-ai/drama-skills | MIT |
| https://github.com/WinterArc21/Battle-of-Austerlitz-Film (repo_url on the Austerlitz entry) | none (all rights reserved by default) |

## Field notes
- `prompt_kind`: `full` (≥250 chars), `brief` (a shorter prompt or one-liner), `example` (an example invocation from a skill README), or null.
- `prompt_in_source_post`: true if the prompt text was found in the fetched source post. false means the prompt came from a reply, image, or linked page, as recorded by the upstream list; `prompt_source_url` points to where it was taken from. Those prompts were not re-checked word for word against the creator's reply.
- `engine` is inferred from keywords in the prompt and post. `seek-t-html` = custom HTML/JS/canvas code rendered frame by frame (Playwright + ffmpeg style). `other` with the tag `engine-unspecified` = the creator didn't say.
- `needs_assets`: zhuyansen's `reference_assets` flag where available; otherwise true only when the prompt clearly references attachments (attached files, screenshots, folders, "ask me for" inputs); otherwise null.
- `effort`: set only when the post or prompt states it.
- `video_url`s on video.twimg.com are X CDN links. They may expire or block hotlinking, so plan to re-host only with the creator's permission, or embed the X post.
- Model attribution is as the creator stated it; nothing was independently reproduced.
- Extra fields beyond the requested schema: `prompt_kind`, `prompt_in_source_post`, `repo_url`, `install` (skill entries), `metrics.checked`.
