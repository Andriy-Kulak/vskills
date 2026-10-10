'use client';

import { Entry, CATEGORY_LABELS, ENGINE_LABELS } from '@/lib/types';
import Link from 'next/link';
import { useState, useRef } from 'react';

interface EntryCardProps {
  entry: Entry;
}

export function EntryCard({ entry }: EntryCardProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (entry.video_url && !videoError) {
      hoverTimeoutRef.current = setTimeout(() => {
        setShowVideo(true);
        if (videoRef.current) {
          videoRef.current.play().catch(() => setVideoError(true));
        }
      }, 300);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const hasPrompt = entry.prompt && entry.prompt.length > 0;
  const hasSkill = entry.skill_url || entry.repo_url;

  return (
    <Link href={`/entry/${entry.id}`}>
      <article
        className="entry-card group relative overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="aspect-video relative overflow-hidden bg-neutral-900">
          {entry.thumbnail_url && !imageError ? (
            <img
              src={entry.thumbnail_url}
              alt={entry.title}
              className={`w-full h-full object-cover transition-opacity duration-200 ${
                showVideo && !videoError ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
              <span className="text-4xl">🎬</span>
            </div>
          )}
          
          {entry.video_url && !videoError && (
            <video
              ref={videoRef}
              src={entry.video_url}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                showVideo ? 'opacity-100' : 'opacity-0'
              }`}
              muted
              loop
              playsInline
              preload="none"
              onError={() => setVideoError(true)}
            />
          )}
          
          <div className="absolute top-2 right-2 flex gap-1.5">
            {hasPrompt && (
              <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-green-500/90 text-white">
                Prompt
              </span>
            )}
            {hasSkill && (
              <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-purple-500/90 text-white">
                Skill
              </span>
            )}
          </div>
          
          {entry.source_type === 'x' && (
            <div className="absolute bottom-2 left-2">
              <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-black/70 text-white">
                𝕏
              </span>
            </div>
          )}
          {entry.source_type === 'github' && (
            <div className="absolute bottom-2 left-2">
              <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-black/70 text-white">
                GitHub
              </span>
            </div>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 mb-1.5 group-hover:text-[var(--accent)] transition-colors">
            {entry.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] mb-2">
            <span>@{entry.creator_handle}</span>
            {entry.date && (
              <>
                <span>·</span>
                <span>{entry.date}</span>
              </>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1">
            {entry.model && (
              <span className="px-1.5 py-0.5 text-xs rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 truncate max-w-[120px]">
                {entry.model.replace('Claude Opus 5.5', 'Opus 5.5')}
              </span>
            )}
            {entry.category && (
              <span className="px-1.5 py-0.5 text-xs rounded bg-neutral-500/10 text-neutral-600 dark:text-neutral-400">
                {CATEGORY_LABELS[entry.category]}
              </span>
            )}
            {entry.engine && entry.engine !== 'other' && (
              <span className="px-1.5 py-0.5 text-xs rounded bg-orange-500/10 text-orange-600 dark:text-orange-400">
                {ENGINE_LABELS[entry.engine]}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
