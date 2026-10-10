import { Suspense } from 'react';
import { getAllEntries, getStats } from '@/lib/data';
import { EntryGrid } from '@/components/EntryGrid';

export default function Home() {
  const entries = getAllEntries();
  const stats = getStats();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-3">
          AI Video Prompts & Skills Directory
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl">
          {stats.total} curated entries featuring AI-generated videos, video prompts,
          and video-editing agent skills. {stats.withPrompt} with full prompts,{' '}
          {stats.withSkill} with installable skills. All free, forever.
        </p>
      </section>

      <Suspense fallback={<GridSkeleton />}>
        <EntryGrid entries={entries} />
      </Suspense>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 bg-[var(--card-bg)] rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-video bg-[var(--card-bg)] rounded-lg animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
