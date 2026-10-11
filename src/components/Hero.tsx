'use client';

import Link from 'next/link';
import { Entry, Category, CATEGORY_LABELS } from '@/lib/types';
import { ArrowDown, ArrowRight } from './icons';

export const FILTER_EVENT = 'vskills:filter';

// Slots sit around the edges so the headline stays clear. [left%, top%, rotation]
const SLOTS: [number, number, number][] = [
  [2, 9, -4],
  [21, 1, 3],
  [67, 3, -2],
  [84, 15, 4],
  [-2, 43, 3],
  [87, 47, -3],
  [5, 75, -2],
  [25, 84, 4],
  [61, 81, -4],
  [81, 76, 2],
];

interface HeroProps {
  tiles: Entry[];
  stats: { total: number; withPrompt: number; withSkill: number };
  categories: Category[];
}

export function Hero({ tiles, stats, categories }: HeroProps) {
  const pickCategory = (category: Category) => {
    window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: { category } }));
    document.getElementById('browse')?.scrollIntoView();
  };

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="relative h-[min(86vh,820px)] min-h-[600px]">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />

        <svg
          aria-hidden
          viewBox="0 0 1000 1000"
          className="spin-slow absolute left-1/2 top-1/2 h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-1/2 opacity-70"
        >
          <defs>
            <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#d4ff3f" stopOpacity="0.5" />
              <stop offset="0.35" stopColor="#d4ff3f" stopOpacity="0" />
              <stop offset="0.7" stopColor="#7c5cff" stopOpacity="0" />
              <stop offset="1" stopColor="#7c5cff" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <circle cx="500" cy="500" r="330" fill="none" stroke="url(#ring)" strokeWidth="1.5" />
          <circle cx="500" cy="500" r="470" fill="none" stroke="url(#ring)" strokeWidth="1" transform="rotate(140 500 500)" />
        </svg>

        {tiles.slice(0, SLOTS.length).map((entry, i) => {
          const [left, top, r] = SLOTS[i];
          return (
            <div
              key={entry.id}
              className={`float absolute ${i >= 4 ? 'hidden md:block' : ''}`}
              style={
                {
                  left: `${left}%`,
                  top: `${top}%`,
                  width: 'clamp(130px, 15vw, 240px)',
                  '--r': `${r}deg`,
                  animationDelay: `${-i * 1.3}s`,
                  animationDuration: `${8 + (i % 4)}s`,
                } as React.CSSProperties
              }
            >
              <Link
                href={`/entry/${entry.id}`}
                tabIndex={-1}
                className="rise block aspect-video overflow-hidden rounded-xl bg-surface shadow-2xl shadow-black/60 ring-1 ring-white/15 transition hover:ring-accent hover:scale-[1.04]"
                style={{ animationDelay: `${0.15 + i * 0.07}s` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={entry.thumbnail_url!}
                  alt=""
                  className="kenburns h-full w-full object-cover"
                  style={{ animationDelay: `${-i * 2.1}s` }}
                />
              </Link>
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_42%_44%_at_center,var(--background)_35%,transparent_100%)]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <p className="rise label mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-background/60 px-3 py-1.5 text-muted backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
            {stats.total} entries · free forever
          </p>
          <h1
            className="rise font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(56px,13vw,184px)]"
            style={{ animationDelay: '0.05s' }}
          >
            vskills
          </h1>
          <p
            className="rise mt-5 text-[clamp(24px,3.6vw,44px)] font-semibold tracking-tight leading-tight"
            style={{ animationDelay: '0.12s' }}
          >
            Prompts &amp; skills <span className="font-serif font-normal italic text-accent">for AI video.</span>
          </p>
          <p
            className="rise mt-4 max-w-xl text-base sm:text-lg text-muted leading-relaxed"
            style={{ animationDelay: '0.18s' }}
          >
            Watch what people are making with Opus 5.5, Seedance &amp; friends, then copy the exact
            prompt or install the agent skill behind it.
          </p>
          <div className="rise mt-8 flex flex-wrap justify-center gap-3" style={{ animationDelay: '0.24s' }}>
            <a
              href="#browse"
              className="label inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 font-semibold text-background transition-colors hover:bg-accent"
            >
              Browse the directory <ArrowDown className="w-3.5 h-3.5" />
            </a>
            <a
              href="#skills"
              className="label inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-background/50 px-6 text-foreground backdrop-blur transition-colors hover:border-foreground"
            >
              Install a skill <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="rise label mt-8 text-subtle" style={{ animationDelay: '0.3s' }}>
            {stats.withPrompt} full prompts <span className="mx-2">·</span> {stats.withSkill} agent skills
            <span className="mx-2 hidden sm:inline">·</span>
            <span className="hidden sm:inline">JSON API + llms.txt</span>
          </p>
        </div>
      </div>

      <div className="relative z-10 flex overflow-hidden border-t border-line bg-background/80 py-3 backdrop-blur fade-x">
        <div className="marquee flex shrink-0 gap-8 pr-8">
          {[...categories, ...categories].map((c, i) => (
            <button
              key={`${c}-${i}`}
              onClick={() => pickCategory(c)}
              tabIndex={i < categories.length ? 0 : -1}
              className="label flex shrink-0 items-center gap-8 text-muted transition-colors hover:text-accent"
            >
              {CATEGORY_LABELS[c]}
              <span className="text-accent/60">✦</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
