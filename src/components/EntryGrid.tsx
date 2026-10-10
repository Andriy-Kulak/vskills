'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Entry, FilterState, DEFAULT_FILTERS, Category, Engine } from '@/lib/types';
import { filterEntries, getUniqueModels, getUniqueCategories, getUniqueEngines } from '@/lib/data';
import { EntryCard } from './EntryCard';
import { Filters } from './Filters';

interface EntryGridProps {
  entries: Entry[];
}

export function EntryGrid({ entries }: EntryGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<FilterState>(() => {
    return {
      search: searchParams.get('q') || '',
      category: (searchParams.get('category') as Category | 'all') || 'all',
      model: searchParams.get('model') || 'all',
      engine: (searchParams.get('engine') as Engine | 'all') || 'all',
      hasPrompt: searchParams.get('hasPrompt') === 'true' ? true : searchParams.get('hasPrompt') === 'false' ? false : null,
      hasSkill: searchParams.get('hasSkill') === 'true' ? true : searchParams.get('hasSkill') === 'false' ? false : null,
      needsAssets: searchParams.get('needsAssets') === 'true' ? true : searchParams.get('needsAssets') === 'false' ? false : null,
    };
  });

  const models = useMemo(() => getUniqueModels(), []);
  const categories = useMemo(() => getUniqueCategories(), []);
  const engines = useMemo(() => getUniqueEngines(), []);

  const filteredEntries = useMemo(() => {
    return filterEntries(filters);
  }, [filters]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('q', filters.search);
    if (filters.category !== 'all') params.set('category', filters.category);
    if (filters.model !== 'all') params.set('model', filters.model);
    if (filters.engine !== 'all') params.set('engine', filters.engine);
    if (filters.hasPrompt !== null) params.set('hasPrompt', String(filters.hasPrompt));
    if (filters.hasSkill !== null) params.set('hasSkill', String(filters.hasSkill));
    if (filters.needsAssets !== null) params.set('needsAssets', String(filters.needsAssets));

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : '/';
    router.replace(newUrl, { scroll: false });
  }, [filters, router]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="space-y-6">
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        models={models}
        categories={categories}
        engines={engines}
        resultCount={filteredEntries.length}
        totalCount={entries.length}
      />

      {filteredEntries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[var(--muted)] text-lg">No entries found matching your filters.</p>
          <button
            onClick={() => handleFilterChange(DEFAULT_FILTERS)}
            className="mt-4 text-[var(--accent)] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
