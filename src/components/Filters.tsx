'use client';

import { forwardRef } from 'react';
import {
  FilterState,
  Category,
  Engine,
  SortOrder,
  CATEGORY_LABELS,
  ENGINE_LABELS,
  MODEL_FAMILIES,
} from '@/lib/types';
import { ChevronDown, CloseIcon, SearchIcon } from './icons';

export type Kind = 'all' | 'prompt' | 'skill';

interface FiltersProps {
  filters: FilterState;
  sort: SortOrder;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onSortChange: (sort: SortOrder) => void;
  categories: Category[];
  categoryCounts: Record<string, number>;
  engines: Engine[];
  totalCount: number;
}

export function kindOf(filters: FilterState): Kind {
  if (filters.hasSkill) return 'skill';
  if (filters.hasPrompt) return 'prompt';
  return 'all';
}

const KIND_OPTIONS: { id: Kind; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'prompt', label: 'Prompts' },
  { id: 'skill', label: 'Skills' },
];

export const Filters = forwardRef<HTMLInputElement, FiltersProps>(function Filters(
  { filters, sort, onFilterChange, onSortChange, categories, categoryCounts, engines, totalCount },
  searchRef
) {
  const kind = kindOf(filters);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative w-full sm:w-auto sm:flex-1 sm:min-w-[220px]">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            ref={searchRef}
            type="search"
            placeholder="Search prompts, creators, tags…"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="h-11 w-full rounded-full border border-line bg-surface pl-11 pr-12 text-[15px] text-foreground placeholder:text-subtle transition-colors focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {filters.search ? (
            <button
              onClick={() => onFilterChange({ search: '' })}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-foreground"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle">
              /
            </kbd>
          )}
        </label>

        <div className="hide-scrollbar -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 sm:mx-0 sm:w-auto sm:overflow-visible sm:px-0 [&>*]:shrink-0">
          <div className="flex h-11 rounded-full border border-line bg-surface p-1" role="radiogroup" aria-label="Entry type">
            {KIND_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                role="radio"
                aria-checked={kind === opt.id}
                onClick={() =>
                  onFilterChange({
                    hasPrompt: opt.id === 'prompt' ? true : null,
                    hasSkill: opt.id === 'skill' ? true : null,
                  })
                }
                className={`rounded-full px-4 text-sm font-medium transition-colors ${
                  kind === opt.id ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <PillSelect
            label="Model"
            value={filters.model}
            onChange={(model) => onFilterChange({ model })}
            options={MODEL_FAMILIES.map((f) => ({ value: f.id, label: f.label }))}
          />
          <PillSelect
            label="Engine"
            value={filters.engine}
            onChange={(engine) => onFilterChange({ engine: engine as Engine | 'all' })}
            options={engines.filter((e) => e !== 'other').map((e) => ({ value: e, label: ENGINE_LABELS[e] }))}
          />
          <PillSelect
            label="Sort"
            value={sort}
            allLabel={null}
            onChange={(v) => onSortChange(v as SortOrder)}
            options={[
              { value: 'newest', label: 'Newest' },
              { value: 'popular', label: 'Most watched' },
            ]}
          />

        </div>
      </div>

      <div className="hide-scrollbar fade-x -mx-4 flex gap-2 overflow-x-auto px-4 sm:-mx-6 sm:px-6">
        <CategoryChip
          label="Everything"
          count={totalCount}
          active={filters.category === 'all'}
          onClick={() => onFilterChange({ category: 'all' })}
        />
        {categories.map((c) => (
          <CategoryChip
            key={c}
            label={CATEGORY_LABELS[c]}
            count={categoryCounts[c] || 0}
            active={filters.category === c}
            onClick={() => onFilterChange({ category: filters.category === c ? 'all' : c })}
          />
        ))}
        <span className="mx-1 w-px shrink-0 bg-line" />
        <CategoryChip
          label="No assets needed"
          active={filters.needsAssets === false}
          onClick={() => onFilterChange({ needsAssets: filters.needsAssets === false ? null : false })}
        />
      </div>
    </div>
  );
});

function CategoryChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[13px] transition-colors ${
        active
          ? 'border-accent bg-accent text-accent-ink font-medium'
          : 'border-line text-muted hover:border-line-strong hover:text-foreground'
      }`}
    >
      {label}
      {count !== undefined && (
        <span className={`font-mono text-[11px] ${active ? 'text-accent-ink/60' : 'text-subtle'}`}>{count}</span>
      )}
    </button>
  );
}

function PillSelect({
  label,
  value,
  onChange,
  options,
  allLabel = 'Any',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  allLabel?: string | null;
}) {
  const active = allLabel !== null && value !== 'all';
  return (
    <label
      className={`relative inline-flex h-11 items-center rounded-full border pl-4 pr-9 text-sm transition-colors ${
        active ? 'border-accent text-foreground' : 'border-line bg-surface text-muted hover:text-foreground'
      }`}
    >
      <span className="mr-1.5 text-subtle">{label}</span>
      <span className="font-medium text-foreground">
        {value === 'all' ? allLabel : options.find((o) => o.value === value)?.label}
      </span>
      <ChevronDown className="pointer-events-none absolute right-3.5 h-3.5 w-3.5" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {allLabel !== null && <option value="all">{allLabel}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
