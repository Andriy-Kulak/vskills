'use client';

import { useRef } from 'react';
import { Entry } from '@/lib/types';
import { EntryCard } from './EntryCard';
import { ChevronLeft, ChevronRight } from './icons';

interface RailProps {
  id?: string;
  index: string;
  title: string;
  subtitle: string;
  entries: Entry[];
}

export function Rail({ id, index, title, subtitle, entries }: RailProps) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section id={id} className="mx-auto max-w-[1400px] pt-16">
      <div className="flex items-end justify-between gap-4 px-4 sm:px-6 mb-5">
        <div>
          <p className="label text-subtle mb-2">{index}</p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h2>
          <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted hover:text-foreground hover:border-line-strong transition-colors"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted hover:text-foreground hover:border-line-strong transition-colors"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div
        ref={scroller}
        className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 sm:scroll-px-6 px-4 sm:px-6 pb-2"
      >
        {entries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            className="w-[78vw] sm:w-[340px] lg:w-[380px] shrink-0 snap-start"
          />
        ))}
      </div>
    </section>
  );
}
