'use client';

import { FilterState, Category, Engine, CATEGORY_LABELS, ENGINE_LABELS } from '@/lib/types';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  models: string[];
  categories: Category[];
  engines: Engine[];
  resultCount: number;
  totalCount: number;
}

export function Filters({
  filters,
  onFilterChange,
  models,
  categories,
  engines,
  resultCount,
  totalCount,
}: FiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search prompts, creators, tags..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="w-full px-4 py-2.5 pl-10 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          value={filters.category}
          onChange={(e) =>
            onFilterChange({ category: e.target.value as Category | 'all' })
          }
          className="px-3 py-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>

        <select
          value={filters.model}
          onChange={(e) => onFilterChange({ model: e.target.value })}
          className="px-3 py-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          <option value="all">All Models</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        <select
          value={filters.engine}
          onChange={(e) =>
            onFilterChange({ engine: e.target.value as Engine | 'all' })
          }
          className="px-3 py-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          <option value="all">All Engines</option>
          {engines.map((engine) => (
            <option key={engine} value={engine}>
              {ENGINE_LABELS[engine]}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <ToggleButton
            label="Has Prompt"
            value={filters.hasPrompt}
            onChange={(v) => onFilterChange({ hasPrompt: v })}
          />
          <ToggleButton
            label="Has Skill"
            value={filters.hasSkill}
            onChange={(v) => onFilterChange({ hasSkill: v })}
          />
          <ToggleButton
            label="Needs Assets"
            value={filters.needsAssets}
            onChange={(v) => onFilterChange({ needsAssets: v })}
          />
        </div>
      </div>

      <div className="text-sm text-[var(--muted)]">
        Showing {resultCount} of {totalCount} entries
        {filters.search ||
        filters.category !== 'all' ||
        filters.model !== 'all' ||
        filters.engine !== 'all' ||
        filters.hasPrompt !== null ||
        filters.hasSkill !== null ||
        filters.needsAssets !== null ? (
          <button
            onClick={() =>
              onFilterChange({
                search: '',
                category: 'all',
                model: 'all',
                engine: 'all',
                hasPrompt: null,
                hasSkill: null,
                needsAssets: null,
              })
            }
            className="ml-2 text-[var(--accent)] hover:underline"
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </div>
  );
}

function ToggleButton({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean | null;
  onChange: (value: boolean | null) => void;
}) {
  const handleClick = () => {
    if (value === null) {
      onChange(true);
    } else if (value === true) {
      onChange(false);
    } else {
      onChange(null);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
        value === true
          ? 'bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30'
          : value === false
          ? 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30'
          : 'bg-[var(--card-bg)] text-[var(--muted)] border border-[var(--card-border)]'
      }`}
    >
      {value === true && '✓ '}
      {value === false && '✗ '}
      {label}
    </button>
  );
}
