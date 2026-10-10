import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEntry, getAllEntries } from '@/lib/data';
import { CATEGORY_LABELS, ENGINE_LABELS } from '@/lib/types';
import { CopyButton } from '@/components/CopyButton';
import { EntryJsonLd } from './EntryJsonLd';
import { VideoPreview } from './VideoPreview';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const entries = getAllEntries();
  return entries.map((entry) => ({ id: entry.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const entry = getEntry(id);
  
  if (!entry) {
    return { title: 'Entry Not Found - vskills' };
  }

  const description = entry.prompt
    ? `${entry.prompt.slice(0, 150)}...`
    : `AI video by @${entry.creator_handle} using ${entry.model || 'AI'}`;

  return {
    title: `${entry.title} - vskills`,
    description,
    openGraph: {
      title: entry.title,
      description,
      type: 'article',
      images: entry.thumbnail_url ? [entry.thumbnail_url] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description,
      images: entry.thumbnail_url ? [entry.thumbnail_url] : undefined,
    },
  };
}

export default async function EntryPage({ params }: Props) {
  const { id } = await params;
  const entry = getEntry(id);

  if (!entry) {
    notFound();
  }

  const hasPrompt = entry.prompt && entry.prompt.length > 0;

  return (
    <>
      <EntryJsonLd entry={entry} />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <nav className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to directory
          </Link>
        </nav>

        <article className="space-y-6">
          <header>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">{entry.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <a
                href={entry.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--accent)] hover:underline"
              >
                {entry.source_type === 'x' ? '𝕏 ' : ''}
                @{entry.creator_handle}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <span className="text-[var(--muted)]">·</span>
              <span className="text-[var(--muted)]">{entry.creator_name}</span>
              {entry.date && (
                <>
                  <span className="text-[var(--muted)]">·</span>
                  <time className="text-[var(--muted)]">{entry.date}</time>
                </>
              )}
            </div>
          </header>

          <VideoPreview entry={entry} />

          <div className="flex flex-wrap gap-2">
            {entry.model && (
              <span className="px-2.5 py-1 text-sm rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {entry.model}
              </span>
            )}
            {entry.category && (
              <span className="px-2.5 py-1 text-sm rounded-full bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border border-neutral-500/20">
                {CATEGORY_LABELS[entry.category]}
              </span>
            )}
            {entry.engine && (
              <span className="px-2.5 py-1 text-sm rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                {ENGINE_LABELS[entry.engine]}
              </span>
            )}
            {entry.effort && (
              <span className="px-2.5 py-1 text-sm rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                Effort: {entry.effort}
              </span>
            )}
            {entry.needs_assets && (
              <span className="px-2.5 py-1 text-sm rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
                Needs Assets
              </span>
            )}
            {entry.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-[var(--card-bg)] text-[var(--muted)] border border-[var(--card-border)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {hasPrompt && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Prompt</h2>
                <CopyButton text={entry.prompt!} label="Copy prompt" />
              </div>
              <div className="relative">
                <pre className="p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-sm overflow-x-auto max-h-[500px] overflow-y-auto">
                  {entry.prompt}
                </pre>
                {entry.prompt_kind && (
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 text-xs rounded bg-[var(--card-border)] text-[var(--muted)]">
                    {entry.prompt_kind}
                  </span>
                )}
              </div>
              {entry.prompt_source_url && entry.prompt_source_url !== entry.source_url && (
                <p className="text-sm text-[var(--muted)]">
                  Prompt source:{' '}
                  <a
                    href={entry.prompt_source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:underline"
                  >
                    {entry.prompt_source_url}
                  </a>
                </p>
              )}
            </section>
          )}

          {entry.install && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Install Command</h2>
                <CopyButton text={entry.install} label="Copy" />
              </div>
              <pre className="p-4 rounded-lg bg-neutral-900 text-green-400 text-sm font-mono overflow-x-auto">
                {entry.install}
              </pre>
            </section>
          )}

          {(entry.repo_url || entry.skill_url) && (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Resources</h2>
              <div className="flex flex-wrap gap-3">
                {entry.repo_url && (
                  <a
                    href={entry.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View Repository
                  </a>
                )}
                {entry.skill_url && (
                  <a
                    href={entry.skill_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    View Skill
                  </a>
                )}
              </div>
            </section>
          )}

          {entry.metrics && (entry.metrics.views || entry.metrics.likes) && (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold">Metrics</h2>
              <div className="flex gap-6 text-sm text-[var(--muted)]">
                {entry.metrics.views && (
                  <span>{entry.metrics.views.toLocaleString()} views</span>
                )}
                {entry.metrics.likes && (
                  <span>{entry.metrics.likes.toLocaleString()} likes</span>
                )}
                {entry.metrics.checked && (
                  <span>as of {entry.metrics.checked}</span>
                )}
              </div>
            </section>
          )}

          <section className="pt-4 border-t border-[var(--card-border)]">
            <div className="flex flex-wrap gap-3">
              <a
                href={entry.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                View Original
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href={`/entries/${entry.id}.md`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)] transition-colors"
              >
                Raw Markdown
              </a>
              <Link
                href={`/api/entries/${entry.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)] transition-colors"
              >
                JSON API
              </Link>
            </div>
          </section>

          {entry.license_note && (
            <p className="text-xs text-[var(--muted)] pt-4">
              {entry.license_note}
            </p>
          )}
        </article>
      </div>
    </>
  );
}
