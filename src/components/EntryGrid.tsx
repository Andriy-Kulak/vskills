'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Entry, FilterState, DEFAULT_FILTERS, Category, Engine, SortOrder } from '@/lib/types';
import { filterEntries, getUniqueCategories, getUniqueEngines, getCategoryCounts } from '@/lib/data';
import { EntryCard } from './EntryCard';
import { Filters, kindOf } from './Filters';
import { FILTER_EVENT } from './Hero';
import { FOCUS_SEARCH_EVENT } from './HeaderSearch';

interface EntryGridProps {
  entries: Entry[];
}

function readFilters(params: URLSearchParams): FilterState {
  const kind = params.get('kind');
  return {
    search: params.get('q') || '',
    category: (params.get('category') as Category | null) || 'all',
    model: params.get('model') || 'all',
    engine: (params.get('engine') as Engine | null) || 'all',
    hasPrompt: kind === 'prompt' ? true : null,
    hasSkill: kind === 'skill' ? true : null,
    needsAssets: params.get('assets') === 'none' ? false : null,
  };
}

function writeParams(filters: FilterState, sort: SortOrder) {
  const params = new URLSearchParams();
  if (filters.search) params.set('q', filters.search);
  if (filters.category !== 'all') params.set('category', filters.category);
  if (filters.model !== 'all') params.set('model', filters.model);
  if (filters.engine !== 'all') params.set('engine', filters.engine);
  const kind = kindOf(filters);
  if (kind !== 'all') params.set('kind', kind);
  if (filters.needsAssets === false) params.set('assets', 'none');
  if (sort !== 'newest') params.set('sort', sort);
  return params.toString();
}

function isFiltered(filters: FilterState) {
  return (
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.model !== 'all' ||
    filters.engine !== 'all' ||
    filters.hasPrompt !== null ||
    filters.hasSkill !== null ||
    filters.needsAssets !== null
  );
}

export function EntryGrid({ entries }: EntryGridProps) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => readFilters(searchParams));
  const [sort, setSort] = useState<SortOrder>(() =>
    searchParams.get('sort') === 'popular' ? 'popular' : 'newest'
  );
  const searchRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = useMemo(() => getUniqueCategories().filter((c) => c !== 'other'), []);
  const categoryCounts = useMemo(() => getCategoryCounts(), []);
  const engines = useMemo(() => getUniqueEngines(), []);

  const filteredEntries = useMemo(() => {
    const result = filterEntries(filters);
    return sort === 'popular'
      ? result.sort((a, b) => (b.metrics?.views || 0) - (a.metrics?.views || 0))
      : result.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }, [filters, sort]);

  // Keep the URL shareable without a navigation per keystroke.
  useEffect(() => {
    const t = setTimeout(() => {
      const qs = writeParams(filters, sort);
      const url = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`;
      window.history.replaceState(window.history.state, '', url);
    }, 250);
    return () => clearTimeout(t);
  }, [filters, sort]);

  useEffect(() => {
    const focusSearch = () => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      searchRef.current?.focus({ preventScroll: true });
    };
    const applyFilter = (e: Event) => {
      setFilters((prev) => ({ ...prev, ...(e as CustomEvent<Partial<FilterState>>).detail }));
    };
    if (searchParams.get('focus') === 'search') focusSearch();
    window.addEventListener(FOCUS_SEARCH_EVENT, focusSearch);
    window.addEventListener(FILTER_EVENT, applyFilter);
    return () => {
      window.removeEventListener(FOCUS_SEARCH_EVENT, focusSearch);
      window.removeEventListener(FILTER_EVENT, applyFilter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const filtered = isFiltered(filters);

  return (
    <section ref={sectionRef} id="browse" className="pt-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 mb-6">
        <p className="label text-subtle mb-2">03 / The directory</p>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
          Browse everything
        </h2>
      </div>

      <div className="sticky top-14 z-40 border-y border-line bg-background/85 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-3">
          <Filters
            ref={searchRef}
            filters={filters}
            sort={sort}
            onFilterChange={handleFilterChange}
            onSortChange={setSort}
            categories={categories}
            categoryCounts={categoryCounts}
            engines={engines}
            totalCount={entries.length}
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex items-center gap-3 py-5 text-sm text-muted">
          <span>
            <span className="font-mono text-foreground">{filteredEntries.length}</span>
            {filtered ? ` of ${entries.length}` : ''} entries
          </span>
          {filtered && (
            <button
              onClick={() => handleFilterChange(DEFAULT_FILTERS)}
              className="text-accent hover:underline underline-offset-4"
            >
              Clear all
            </button>
          )}
        </div>

        {filteredEntries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line-strong py-24 text-center">
            <p className="font-display text-2xl font-bold">Nothing matches that.</p>
            <p className="mt-2 text-muted">Try a broader search, or clear the filters.</p>
            <button
              onClick={() => handleFilterChange(DEFAULT_FILTERS)}
              className="label mt-6 inline-flex h-10 items-center rounded-full bg-foreground px-5 font-semibold text-background hover:bg-accent"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {filteredEntries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
