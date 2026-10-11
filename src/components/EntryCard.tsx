'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Entry, CATEGORY_LABELS, shortModel } from '@/lib/types';
import { formatCount, hashHue, repoSlug } from '@/lib/format';
import { EyeIcon, GitHubLogo, PlayIcon, XLogo } from './icons';

interface EntryCardProps {
  entry: Entry;
  className?: string;
}

export function EntryCard({ entry, className = '' }: EntryCardProps) {
  const [imageError, setImageError] = useState(false);

  const hasPrompt = Boolean(entry.prompt);
  const hasSkill = Boolean(entry.skill_url || entry.repo_url);
  const hasVideo = Boolean(entry.video_url);
  const views = formatCount(entry.metrics?.views);
  const model = shortModel(entry.model);

  return (
    <Link href={`/entry/${entry.id}`} className={`group block outline-none ${className}`}>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-surface ring-1 ring-line transition duration-300 group-hover:ring-line-strong group-focus-visible:ring-2 group-focus-visible:ring-accent">
        {entry.thumbnail_url && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.thumbnail_url}
            alt=""
            loading="lazy"
            onError={() => setImageError(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
          />
        ) : (
          <SkillCover entry={entry} />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

        {hasVideo && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
            <span className="flex items-center gap-2 rounded-full bg-accent py-2 pl-3 pr-4 text-[13px] font-semibold text-accent-ink opacity-0 scale-90 transition duration-300 group-hover:opacity-100 group-hover:scale-100">
              <PlayIcon className="w-3 h-3" /> Watch
            </span>
          </div>
        )}

        <div className="absolute left-2.5 top-2.5 flex gap-1.5">
          {hasSkill && (
            <span className="label !text-[10px] !tracking-[0.1em] rounded-full bg-skill px-2 py-[3px] font-semibold text-black">
              Skill
            </span>
          )}
          {hasPrompt && (
            <span className="label !text-[10px] !tracking-[0.1em] rounded-full bg-black/55 px-2 py-[3px] text-white ring-1 ring-white/15 backdrop-blur-md">
              Prompt
            </span>
          )}
        </div>

        <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between text-white">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-black/55 ring-1 ring-white/15 backdrop-blur-md">
            {entry.source_type === 'x' ? <XLogo className="w-3 h-3" /> : <GitHubLogo className="w-3.5 h-3.5" />}
          </span>
          {views && (
            <span className="flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-[3px] font-mono text-[11px] ring-1 ring-white/15 backdrop-blur-md">
              <EyeIcon className="w-3 h-3" />
              {views}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 px-0.5">
        <h3 className="text-[15px] font-medium leading-snug line-clamp-2 text-foreground/90 group-hover:text-foreground">
          {entry.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-muted truncate">
          <span className="truncate">@{entry.creator_handle}</span>
          {model && (
            <>
              <span className="text-subtle">·</span>
              <span className="shrink-0">{model}</span>
            </>
          )}
          {entry.category && entry.category !== 'other' && (
            <>
              <span className="text-subtle">·</span>
              <span className="truncate">{CATEGORY_LABELS[entry.category]}</span>
            </>
          )}
        </p>
      </div>
    </Link>
  );
}

export function SkillCover({ entry, large = false }: { entry: Entry; large?: boolean }) {
  const hue = hashHue(entry.id);
  const repo = repoSlug(entry.repo_url || entry.skill_url || entry.source_url);
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-end overflow-hidden ${large ? "p-8" : "px-4 pt-4 pb-11"}`}
      style={{
        background: `radial-gradient(120% 90% at 85% 0%, hsl(${hue} 70% 45% / 0.55), transparent 60%),
          radial-gradient(90% 80% at 0% 100%, hsl(${(hue + 60) % 360} 70% 40% / 0.4), transparent 60%),
          #101012`,
      }}
    >
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      {entry.source_type === 'x' ? (
        <XLogo className={`absolute right-4 top-4 text-white/25 ${large ? 'w-9 h-9' : 'w-5 h-5'}`} />
      ) : (
        <GitHubLogo className={`absolute right-4 top-4 text-white/25 ${large ? 'w-10 h-10' : 'w-6 h-6'}`} />
      )}
      <div className="relative">
        {repo ? (
          <p className="font-mono text-[11px] text-white/55 truncate">{repo.owner} /</p>
        ) : (
          <p className="font-mono text-[11px] text-white/55 truncate">@{entry.creator_handle}</p>
        )}
        <p
          className={`font-display font-extrabold leading-[1.05] text-white line-clamp-2 ${
            large ? 'text-4xl' : 'text-xl'
          }`}
        >
          {repo?.name ?? entry.title}
        </p>
      </div>
    </div>
  );
}
