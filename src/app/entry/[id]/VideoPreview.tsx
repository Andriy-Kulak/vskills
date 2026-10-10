'use client';

import { Entry } from '@/lib/types';
import { useState } from 'react';

interface VideoPreviewProps {
  entry: Entry;
}

export function VideoPreview({ entry }: VideoPreviewProps) {
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const canShowVideo = entry.video_url && !videoError;
  const canShowImage = entry.thumbnail_url && !imageError;
  const isXPost = entry.source_type === 'x';

  if (showEmbed && isXPost) {
    const tweetId = entry.source_url.match(/status\/(\d+)/)?.[1];
    if (tweetId) {
      return (
        <div className="rounded-lg overflow-hidden border border-[var(--card-border)]">
          <div className="aspect-video bg-neutral-900 flex items-center justify-center">
            <iframe
              src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=dark`}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
          <button
            onClick={() => setShowEmbed(false)}
            className="w-full py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--card-bg)]"
          >
            Show video player
          </button>
        </div>
      );
    }
  }

  if (canShowVideo) {
    return (
      <div className="rounded-lg overflow-hidden border border-[var(--card-border)]">
        <video
          src={entry.video_url!}
          controls
          className="w-full aspect-video bg-neutral-900"
          poster={canShowImage ? entry.thumbnail_url! : undefined}
          preload="metadata"
          onError={() => setVideoError(true)}
        />
        {isXPost && (
          <button
            onClick={() => setShowEmbed(true)}
            className="w-full py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--card-bg)]"
          >
            Video not loading? Show embedded post
          </button>
        )}
      </div>
    );
  }

  if (canShowImage) {
    return (
      <div className="rounded-lg overflow-hidden border border-[var(--card-border)]">
        <img
          src={entry.thumbnail_url!}
          alt={entry.title}
          className="w-full aspect-video object-cover bg-neutral-900"
          onError={() => setImageError(true)}
        />
        {isXPost && (
          <button
            onClick={() => setShowEmbed(true)}
            className="w-full py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--card-bg)]"
          >
            View original post
          </button>
        )}
      </div>
    );
  }

  if (isXPost) {
    return (
      <div className="rounded-lg overflow-hidden border border-[var(--card-border)]">
        <div className="aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 flex flex-col items-center justify-center gap-4">
          <span className="text-6xl">🎬</span>
          <p className="text-[var(--muted)]">Media unavailable</p>
          <a
            href={entry.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
          >
            View on 𝕏
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-[var(--card-border)]">
      <div className="aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">🎬</span>
        <p className="text-[var(--muted)]">No preview available</p>
        <a
          href={entry.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
        >
          View Original
        </a>
      </div>
    </div>
  );
}
