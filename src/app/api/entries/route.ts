import { NextRequest } from 'next/server';
import { filterEntries, getAllEntries } from '@/lib/data';
import { Category, Engine } from '@/lib/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const filters = {
    search: searchParams.get('q') || searchParams.get('search') || '',
    category: (searchParams.get('category') as Category | 'all') || 'all',
    model: searchParams.get('model') || 'all',
    engine: (searchParams.get('engine') as Engine | 'all') || 'all',
    hasPrompt: searchParams.get('hasPrompt') === 'true' ? true : searchParams.get('hasPrompt') === 'false' ? false : null,
    hasSkill: searchParams.get('hasSkill') === 'true' ? true : searchParams.get('hasSkill') === 'false' ? false : null,
    needsAssets: searchParams.get('needsAssets') === 'true' ? true : searchParams.get('needsAssets') === 'false' ? false : null,
  };

  const hasFilters = 
    filters.search ||
    filters.category !== 'all' ||
    filters.model !== 'all' ||
    filters.engine !== 'all' ||
    filters.hasPrompt !== null ||
    filters.hasSkill !== null ||
    filters.needsAssets !== null;

  const entries = hasFilters ? filterEntries(filters) : getAllEntries();
  
  const limit = parseInt(searchParams.get('limit') || '0', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);
  
  let paginatedEntries = entries;
  if (offset > 0) {
    paginatedEntries = paginatedEntries.slice(offset);
  }
  if (limit > 0) {
    paginatedEntries = paginatedEntries.slice(0, limit);
  }

  const response = {
    total: entries.length,
    offset,
    limit: limit || entries.length,
    entries: paginatedEntries,
  };

  return Response.json(response, {
    headers: {
      'Cache-Control': 'public, max-age=60',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
