import { getAllEntries } from '@/lib/data';
import { CATEGORY_LABELS, ENGINE_LABELS } from '@/lib/types';

export async function GET() {
  const entries = getAllEntries();
  
  const lines = [
    '# vskills - Full Catalog',
    '',
    '> A free, open-source directory of AI-made videos, video prompts, and video/video-editing agent skills.',
    '> This file contains the full catalog with all prompts.',
    '',
    `Total entries: ${entries.length}`,
    `Entries with prompts: ${entries.filter(e => e.prompt).length}`,
    `Entries with skills: ${entries.filter(e => e.skill_url || e.repo_url).length}`,
    '',
    '## API Endpoints',
    '',
    '- Summary: https://vskills.dev/llms.txt',
    '- JSON API: https://vskills.dev/api/entries',
    '- JSON API with filters: https://vskills.dev/api/entries?q=search&category=explainer&hasPrompt=true',
    '- Individual entry JSON: https://vskills.dev/api/entries/{id}',
    '- Individual entry markdown: https://vskills.dev/entries/{id}.md',
    '',
    '---',
    '',
  ];

  for (const entry of entries) {
    lines.push(`## ${entry.title}`);
    lines.push('');
    lines.push(`- **ID**: ${entry.id}`);
    lines.push(`- **Creator**: @${entry.creator_handle} (${entry.creator_name})`);
    lines.push(`- **Source**: ${entry.source_url}`);
    lines.push(`- **Date**: ${entry.date}`);
    if (entry.model) lines.push(`- **Model**: ${entry.model}`);
    if (entry.engine) lines.push(`- **Engine**: ${ENGINE_LABELS[entry.engine]}`);
    if (entry.category) lines.push(`- **Category**: ${CATEGORY_LABELS[entry.category]}`);
    if (entry.tags && entry.tags.length > 0) {
      lines.push(`- **Tags**: ${entry.tags.join(', ')}`);
    }
    if (entry.needs_assets) lines.push(`- **Needs Assets**: Yes`);
    if (entry.effort) lines.push(`- **Effort**: ${entry.effort}`);
    
    if (entry.repo_url) {
      lines.push(`- **Repository**: ${entry.repo_url}`);
    }
    if (entry.skill_url) {
      lines.push(`- **Skill URL**: ${entry.skill_url}`);
    }
    if (entry.install) {
      lines.push(`- **Install**: \`${entry.install}\``);
    }
    
    lines.push('');

    if (entry.prompt) {
      lines.push('### Prompt');
      lines.push('');
      lines.push('```');
      lines.push(entry.prompt);
      lines.push('```');
      lines.push('');
      if (entry.prompt_kind) {
        lines.push(`_Prompt type: ${entry.prompt_kind}_`);
        lines.push('');
      }
    }

    if (entry.video_url) {
      lines.push(`**Video URL**: ${entry.video_url}`);
      lines.push('');
    }
    if (entry.thumbnail_url) {
      lines.push(`**Thumbnail**: ${entry.thumbnail_url}`);
      lines.push('');
    }

    if (entry.metrics && (entry.metrics.views || entry.metrics.likes)) {
      lines.push(`**Metrics**: ${entry.metrics.views?.toLocaleString() || 0} views, ${entry.metrics.likes?.toLocaleString() || 0} likes (as of ${entry.metrics.checked || 'unknown'})`);
      lines.push('');
    }

    lines.push('---');
    lines.push('');
  }

  lines.push('');
  lines.push('## License');
  lines.push('');
  lines.push('Every prompt and video belongs to its original creator.');
  lines.push('This directory is provided for reference and discovery.');
  lines.push('Code licensed under MIT. See https://github.com/Andriy-Kulak/vskills for details.');

  const content = lines.join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
