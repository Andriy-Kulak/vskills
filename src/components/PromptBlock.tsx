'use client';

import { useState } from 'react';
import { CopyButton } from './CopyButton';
import { ChevronDown } from './icons';

const COLLAPSED_CHARS = 900;

export function PromptBlock({ prompt, kind }: { prompt: string; kind?: string | null }) {
  const [expanded, setExpanded] = useState(false);
  const long = prompt.length > COLLAPSED_CHARS;
  const words = prompt.trim().split(/\s+/).length;

  return (
    <section className="rounded-2xl border border-line bg-surface overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
        <p className="label text-muted">
          Prompt
          {kind && <span className="text-subtle"> · {kind}</span>}
          <span className="text-subtle"> · {words.toLocaleString()} words</span>
        </p>
        <CopyButton text={prompt} label="Copy" />
      </div>
      <div className="relative">
        <pre
          className={`px-5 py-5 font-mono text-[13px] leading-relaxed text-foreground/85 ${
            long && !expanded ? 'max-h-[340px] overflow-hidden' : ''
          }`}
        >
          {prompt}
        </pre>
        {long && !expanded && (
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent" />
        )}
      </div>
      {long && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="label flex w-full items-center justify-center gap-2 border-t border-line py-3 text-muted transition-colors hover:text-foreground"
        >
          {expanded ? 'Collapse' : 'Show full prompt'}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      )}
    </section>
  );
}
