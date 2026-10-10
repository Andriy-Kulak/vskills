import { Entry, FilterState, Category, Engine } from './types';
import entriesData from '../../data/entries.json';

export const entries: Entry[] = entriesData as Entry[];

export function getEntry(id: string): Entry | undefined {
  return entries.find((entry) => entry.id === id);
}

export function getAllEntries(): Entry[] {
  return entries;
}

export function filterEntries(filters: Partial<FilterState>): Entry[] {
  let result = [...entries];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter((entry) => {
      return (
        entry.title.toLowerCase().includes(searchLower) ||
        entry.creator_name.toLowerCase().includes(searchLower) ||
        entry.creator_handle.toLowerCase().includes(searchLower) ||
        (entry.prompt && entry.prompt.toLowerCase().includes(searchLower)) ||
        (entry.tags && entry.tags.some((tag) => tag.toLowerCase().includes(searchLower))) ||
        (entry.model && entry.model.toLowerCase().includes(searchLower))
      );
    });
  }

  if (filters.category && filters.category !== 'all') {
    result = result.filter((entry) => entry.category === filters.category);
  }

  if (filters.model && filters.model !== 'all') {
    result = result.filter((entry) => entry.model === filters.model);
  }

  if (filters.engine && filters.engine !== 'all') {
    result = result.filter((entry) => entry.engine === filters.engine);
  }

  if (filters.hasPrompt === true) {
    result = result.filter((entry) => entry.prompt && entry.prompt.length > 0);
  } else if (filters.hasPrompt === false) {
    result = result.filter((entry) => !entry.prompt || entry.prompt.length === 0);
  }

  if (filters.hasSkill === true) {
    result = result.filter((entry) => entry.skill_url || entry.repo_url);
  } else if (filters.hasSkill === false) {
    result = result.filter((entry) => !entry.skill_url && !entry.repo_url);
  }

  if (filters.needsAssets === true) {
    result = result.filter((entry) => entry.needs_assets === true);
  } else if (filters.needsAssets === false) {
    result = result.filter((entry) => entry.needs_assets === false || entry.needs_assets === null);
  }

  return result;
}

export function getUniqueModels(): string[] {
  const models = new Set<string>();
  entries.forEach((entry) => {
    if (entry.model) {
      models.add(entry.model);
    }
  });
  return Array.from(models).sort();
}

export function getUniqueCategories(): Category[] {
  const categories = new Set<Category>();
  entries.forEach((entry) => {
    if (entry.category) {
      categories.add(entry.category);
    }
  });
  return Array.from(categories).sort();
}

export function getUniqueEngines(): Engine[] {
  const engines = new Set<Engine>();
  entries.forEach((entry) => {
    if (entry.engine) {
      engines.add(entry.engine);
    }
  });
  return Array.from(engines).sort();
}

export function getStats() {
  return {
    total: entries.length,
    withPrompt: entries.filter((e) => e.prompt && e.prompt.length > 0).length,
    withSkill: entries.filter((e) => e.skill_url || e.repo_url).length,
    fromX: entries.filter((e) => e.source_type === 'x').length,
    fromGitHub: entries.filter((e) => e.source_type === 'github').length,
  };
}
