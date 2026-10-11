'use client';

import { Entry } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';
import { SkillCover } from '@/components/EntryCard';
import { ArrowUpRight, XLogo } from '@/components/icons';

interface VideoPreviewProps {
  entry: Entry;
}

const frame = 'relative overflow-hidden rounded-2xl bg-black ring-1 ring-line';

export function VideoPreview({ entry }: VideoPreviewProps) {
  const tweetId = entry.source_type === 'x' ? entry.source_url.match(/status\/(\d+)/)?.[1] : undefined;
  if (tweetId) return <XEmbed entry={entry} tweetId={tweetId} />;
  return <NativePreview entry={entry} />;
}

type TwttrWidgets = {
  widgets: {
    createTweet: (id: string, el: HTMLElement, options: Record<string, unknown>) => Promise<HTMLElement | undefined>;
  };
};

let widgetsPromise: Promise<TwttrWidgets> | null = null;

function loadWidgets(): Promise<TwttrWidgets> {
  const w = window as Window & { twttr?: TwttrWidgets };
  if (w.twttr?.widgets) return Promise.resolve(w.twttr);
  widgetsPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.onload = () => (w.twttr?.widgets ? resolve(w.twttr) : reject(new Error('widgets unavailable')));
    script.onerror = () => {
      widgetsPromise = null;
      reject(new Error('widgets failed to load'));
    };
    document.head.appendChild(script);
  });
  return widgetsPromise;
}

// Plays the video through X's official post embed, so the media is served by X itself
// and disappears here if the creator deletes the post.
function XEmbed({ entry, tweetId }: { entry: Entry; tweetId: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');

  useEffect(() => {
    const el = container.current;
    if (!el) return;
    let cancelled = false;
    el.innerHTML = '';
    loadWidgets()
      .then((twttr) =>
        twttr.widgets.createTweet(tweetId, el, { theme: 'dark', align: 'center', dnt: true, conversation: 'none' })
      )
      .then((tweet) => {
        if (cancelled) tweet?.remove();
        else setStatus(tweet ? 'ready' : 'unavailable');
      })
      .catch(() => !cancelled && setStatus('unavailable'));
    return () => {
      cancelled = true;
    };
  }, [tweetId]);

  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-4 sm:p-6">
      {status === 'loading' && (
        <div className="mx-auto max-w-[550px] space-y-3" aria-label="Loading post">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-surface-2 animate-pulse" />
            <div className="h-4 w-40 rounded bg-surface-2 animate-pulse" />
          </div>
          <div className="aspect-video rounded-xl bg-surface-2 animate-pulse" />
        </div>
      )}
      {status === 'unavailable' && (
        <div className="mx-auto flex aspect-video max-w-[550px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-line-strong text-center">
          <XLogo className="w-8 h-8 text-subtle" />
          <p className="text-muted">This post couldn&apos;t be loaded from X.</p>
          <a
            href={entry.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="label inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-5 font-semibold text-background hover:bg-accent"
          >
            Open on X <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
      <div ref={container} className={status === 'ready' ? '[&_.twitter-tweet]:!my-0' : 'h-0 overflow-hidden'} />
    </div>
  );
}

function NativePreview({ entry }: { entry: Entry }) {
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (entry.video_url && !videoError) {
    return (
      <div className={frame}>
        <video
          src={entry.video_url}
          poster={entry.thumbnail_url && !imageError ? entry.thumbnail_url : undefined}
          controls
          playsInline
          preload="metadata"
          onError={() => setVideoError(true)}
          className="block max-h-[78vh] w-full bg-black object-contain"
        />
      </div>
    );
  }

  if (entry.thumbnail_url && !imageError) {
    return (
      <div className={frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entry.thumbnail_url}
          alt={entry.title}
          className="block w-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${frame} aspect-video`}>
      <SkillCover entry={entry} large />
    </div>
  );
}
