import { NextRequest } from 'next/server';
import { getEntry, getAllEntries } from '@/lib/data';
import { CATEGORY_LABELS, ENGINE_LABELS } from '@/lib/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const entries = getAllEntries();
  return entries.map((entry) => ({ id: entry.id + '.md' }));
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id: rawId } = await params;
  const id = rawId.replace(/\.md$/, '');
  const entry = getEntry(id);

  if (!entry) {
    return new Response(`# Entry Not Found\n\nNo entry with ID: ${id}`, {
      status: 404,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
  }

  const lines = [
    `# ${entry.title}`,
    '',
    `**Creator**: [@${entry.creator_handle}](${entry.source_url}) (${entry.creator_name})`,
  ];
  
  if (entry.date) lines.push(`**Date**: ${entry.date}`);
  if (entry.model) lines.push(`**Model**: ${entry.model}`);
  if (entry.engine) lines.push(`**Engine**: ${ENGINE_LABELS[entry.engine]}`);
  if (entry.category) lines.push(`**Category**: ${CATEGORY_LABELS[entry.category]}`);
  if (entry.tags && entry.tags.length > 0) {
    lines.push(`**Tags**: ${entry.tags.join(', ')}`);
  }
  if (entry.needs_assets) lines.push(`**Needs Assets**: Yes`);
  if (entry.effort) lines.push(`**Effort**: ${entry.effort}`);

  lines.push('');

  if (entry.prompt) {
    lines.push('## Prompt');
    lines.push('');
    lines.push('```');
    lines.push(entry.prompt);
    lines.push('```');
    lines.push('');
    if (entry.prompt_kind) {
      lines.push(`_Prompt type: ${entry.prompt_kind}_`);
      lines.push('');
    }
    if (entry.prompt_source_url && entry.prompt_source_url !== entry.source_url) {
      lines.push(`_Prompt source: ${entry.prompt_source_url}_`);
      lines.push('');
    }
  }

  if (entry.install) {
    lines.push('## Install');
    lines.push('');
    lines.push('```bash');
    lines.push(entry.install);
    lines.push('```');
    lines.push('');
  }

  if (entry.repo_url || entry.skill_url) {
    lines.push('## Resources');
    lines.push('');
    if (entry.repo_url) lines.push(`- [Repository](${entry.repo_url})`);
    if (entry.skill_url) lines.push(`- [Skill](${entry.skill_url})`);
    lines.push('');
  }

  if (entry.video_url || entry.thumbnail_url) {
    lines.push('## Media');
    lines.push('');
    if (entry.video_url) lines.push(`- Video: ${entry.video_url}`);
    if (entry.thumbnail_url) lines.push(`- Thumbnail: ${entry.thumbnail_url}`);
    lines.push('');
  }

  if (entry.metrics && (entry.metrics.views || entry.metrics.likes)) {
    lines.push('## Metrics');
    lines.push('');
    lines.push(`- Views: ${entry.metrics.views?.toLocaleString() || 0}`);
    lines.push(`- Likes: ${entry.metrics.likes?.toLocaleString() || 0}`);
    if (entry.metrics.checked) lines.push(`- Checked: ${entry.metrics.checked}`);
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push(`[View on vskills](https://vskills.dev/entry/${entry.id}) | [Original source](${entry.source_url}) | [JSON API](https://vskills.dev/api/entries/${entry.id})`);
  lines.push('');
  if (entry.license_note) {
    lines.push(`_${entry.license_note}_`);
  }

  const content = lines.join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
