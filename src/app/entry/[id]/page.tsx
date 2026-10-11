import { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEntry, getAllEntries, getRelated } from '@/lib/data';
import { CATEGORY_LABELS, ENGINE_LABELS } from '@/lib/types';
import { formatCount, formatDate } from '@/lib/format';
import { CopyButton } from '@/components/CopyButton';
import { EntryCard } from '@/components/EntryCard';
import { PromptBlock } from '@/components/PromptBlock';
import { ArrowLeft, ArrowUpRight, GitHubLogo, XLogo } from '@/components/icons';
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

export default function EntryPage({ params }: Props) {
  return (
    <Suspense fallback={<EntrySkeleton />}>
      <EntryContent params={params} />
    </Suspense>
  );
}

function EntrySkeleton() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
      <div className="aspect-video rounded-2xl bg-surface animate-pulse" />
      <div className="space-y-4">
        <div className="h-20 rounded-2xl bg-surface animate-pulse" />
        <div className="h-12 rounded-full bg-surface animate-pulse" />
        <div className="h-48 rounded-2xl bg-surface animate-pulse" />
      </div>
    </div>
  );
}

async function EntryContent({ params }: Props) {
  const { id } = await params;
  const entry = getEntry(id);

  if (!entry) {
    notFound();
  }

  const related = getRelated(entry, 4);
  const views = formatCount(entry.metrics?.views);
  const likes = formatCount(entry.metrics?.likes);
  const sourceLabel = entry.source_type === 'x' ? 'View on X' : 'View on GitHub';

  const specs: [string, React.ReactNode][] = [
    ['Model', entry.model],
    ['Engine', entry.engine && entry.engine !== 'other' ? ENGINE_LABELS[entry.engine] : null],
    ['Category', entry.category ? CATEGORY_LABELS[entry.category] : null],
    ['Effort', entry.effort],
    ['Assets', entry.needs_assets ? 'Brings its own assets' : entry.needs_assets === false ? 'None needed' : null],
    ['Published', formatDate(entry.date)],
  ];

  return (
    <>
      <EntryJsonLd entry={entry} />
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-6">
        <nav className="label flex items-center gap-2 text-subtle">
          <Link href="/#browse" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> All entries
          </Link>
          {entry.category && (
            <>
              <span>/</span>
              <span className="text-muted">{CATEGORY_LABELS[entry.category]}</span>
            </>
          )}
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
          <div className="min-w-0 space-y-6">
            <VideoPreview entry={entry} />
            {entry.prompt && <PromptBlock prompt={entry.prompt} kind={entry.prompt_kind} />}
            {entry.prompt_source_url && entry.prompt_source_url !== entry.source_url && (
              <p className="text-sm text-muted">
                Prompt source:{' '}
                <a
                  href={entry.prompt_source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline decoration-line-strong underline-offset-4 hover:decoration-accent break-all"
                >
                  {entry.prompt_source_url.replace(/^https?:\/\//, '')}
                </a>
              </p>
            )}
          </div>

          <aside className="lg:sticky lg:top-20 lg:self-start space-y-6">
            <div>
              <h1 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight">{entry.title}</h1>
              <a
                href={entry.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 flex items-center gap-3"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface-2 ring-1 ring-line font-display font-bold uppercase text-muted">
                  {entry.creator_name.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-medium group-hover:text-accent transition-colors">
                    {entry.creator_name}
                  </span>
                  <span className="block truncate text-sm text-muted">@{entry.creator_handle}</span>
                </span>
              </a>
            </div>

            {(views || likes) && (
              <div className="grid grid-cols-2 rounded-2xl border border-line">
                {views && (
                  <div className="p-4 border-r border-line">
                    <p className="font-display text-2xl font-extrabold">{views}</p>
                    <p className="label mt-1 text-subtle">Views</p>
                  </div>
                )}
                {likes && (
                  <div className="p-4">
                    <p className="font-display text-2xl font-extrabold">{likes}</p>
                    <p className="label mt-1 text-subtle">Likes</p>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2.5">
              {entry.prompt && <CopyButton text={entry.prompt} label="Copy prompt" variant="primary" />}
              {entry.install && (
                <div className="rounded-2xl border border-line bg-surface">
                  <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                    <p className="label text-muted">Install</p>
                    <CopyButton text={entry.install} label="Copy" />
                  </div>
                  <pre className="px-4 py-3 font-mono text-[13px] text-accent">{entry.install}</pre>
                </div>
              )}
              {entry.repo_url && (
                <ActionLink href={entry.repo_url} primary={!entry.prompt}>
                  <GitHubLogo /> Open repository
                </ActionLink>
              )}
              {entry.skill_url && entry.skill_url !== entry.repo_url && (
                <ActionLink href={entry.skill_url}>
                  <GitHubLogo /> View skill
                </ActionLink>
              )}
              <ActionLink href={entry.source_url}>
                {entry.source_type === 'x' ? <XLogo /> : <GitHubLogo />} {sourceLabel}
              </ActionLink>
            </div>

            <dl className="rounded-2xl border border-line divide-y divide-line">
              {specs
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-3">
                    <dt className="label text-subtle shrink-0">{k}</dt>
                    <dd className="text-sm text-right">{v}</dd>
                  </div>
                ))}
            </dl>

            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/?q=${encodeURIComponent(tag)}#browse`}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted hover:border-line-strong hover:text-foreground transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            <div className="label flex gap-4 text-subtle">
              <a href={`/entries/${entry.id}.md`} className="hover:text-foreground">Raw .md</a>
              <Link href={`/api/entries/${entry.id}`} className="hover:text-foreground">JSON</Link>
            </div>

            {entry.license_note && <p className="text-xs text-subtle">{entry.license_note}</p>}

            <p className="text-xs text-subtle leading-relaxed">
              Video and prompt belong to @{entry.creator_handle}. Is this yours?{' '}
              <a
                href={`https://github.com/Andriy-Kulak/vskills/issues/new?template=takedown.md&title=${encodeURIComponent(
                  `Removal request: ${entry.id}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted underline decoration-line-strong underline-offset-4 hover:text-foreground"
              >
                Request removal or a correction
              </a>
              .
            </p>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-line pt-10">
            <p className="label text-subtle mb-2">Keep watching</p>
            <h2 className="font-display text-2xl font-extrabold tracking-tight mb-6">
              More {entry.category ? CATEGORY_LABELS[entry.category] : ''}
            </h2>
            <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((e) => (
                <EntryCard key={e.id} entry={e} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function ActionLink({
  href,
  primary = false,
  children,
}: {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex h-12 items-center justify-center gap-2 rounded-full text-[15px] font-medium transition-colors ${
        primary
          ? 'bg-accent text-accent-ink font-semibold hover:brightness-110'
          : 'border border-line text-foreground hover:border-line-strong hover:bg-surface'
      }`}
    >
      {children}
      <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
    </a>
  );
}
