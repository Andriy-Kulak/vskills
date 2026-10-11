import { Suspense } from 'react';
import {
  getAllEntries,
  getEntry,
  getMostWatched,
  getSkills,
  getStats,
  getUniqueCategories,
} from '@/lib/data';
import { Entry } from '@/lib/types';
import { EntryGrid } from '@/components/EntryGrid';
import { Hero } from '@/components/Hero';
import { Rail } from '@/components/Rail';

// Visually varied stills for the hero collage.
const HERO_TILE_IDS = [
  'twoclipping-one-shape-a-seamless-ui-morph',
  'majidmanzarpour-a-pixel-wizard-casting-spells',
  'aiwithkhan-seoul-summer-night-vlog',
  'itswsm105f-luxury-skincare-commercial',
  'alexalbert-rebuilding-a-1906-san-francisco-street',
  'aqsahere-cyberpunk-holographic-dance-performance',
  'noorwithwifi-erling-haaland-claymation-gardening',
  'techhalla-20-second-kinetic-identity-bumper-for',
  'techiebysa-french-croissant-making-process',
  'deedydas-a-one-line-prompt-for-an',
];

export default function Home() {
  const entries = getAllEntries();
  const stats = getStats();
  const heroTiles = HERO_TILE_IDS.map(getEntry).filter((e): e is Entry => Boolean(e?.thumbnail_url));
  const categories = getUniqueCategories().filter((c) => c !== 'other');

  return (
    <>
      <Hero tiles={heroTiles} stats={stats} categories={categories} />

      <Rail
        index="01 / Trending"
        title="Most watched"
        subtitle="The clips everyone's sharing, with the prompts that made them."
        entries={getMostWatched(12)}
      />
      <Rail
        id="skills"
        index="02 / Agent skills"
        title="Skills you can install"
        subtitle="Drop these into Claude Code, Codex or Cursor and render video yourself."
        entries={getSkills()}
      />

      <Suspense fallback={<GridSkeleton />}>
        <EntryGrid entries={entries} />
      </Suspense>
    </>
  );
}

function GridSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-20 space-y-6">
      <div className="h-24 rounded-2xl bg-surface animate-pulse" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-video rounded-xl bg-surface animate-pulse" />
        ))}
      </div>
    </div>
  );
}
