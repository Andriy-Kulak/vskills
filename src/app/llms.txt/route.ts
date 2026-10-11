import { getAllEntries } from '@/lib/data';

export async function GET() {
  const entries = getAllEntries();
  
  const lines = [
    '# vskills - AI Video Prompts & Skills Directory',
    '',
    '> A free, open-source directory of AI-made videos, video prompts, and video/video-editing agent skills.',
    '',
    `Total entries: ${entries.length}`,
    `Entries with prompts: ${entries.filter(e => e.prompt).length}`,
    `Entries with skills: ${entries.filter(e => e.skill_url || e.repo_url).length}`,
    '',
    '## Quick Links',
    '',
    '- Full catalog with prompts: https://vskills.dev/llms-full.txt',
    '- JSON API: https://vskills.dev/api/entries',
    '- Individual entry API: https://vskills.dev/api/entries/{id}',
    '- Individual entry markdown: https://vskills.dev/entries/{id}.md',
    '- Website: https://vskills.dev',
    '- GitHub: https://github.com/Andriy-Kulak/vskills',
    '- Contributing (agents and humans): https://github.com/Andriy-Kulak/vskills/blob/main/AGENTS.md',
    '',
    '## Entry Index',
    '',
  ];

  for (const entry of entries) {
    const hasPrompt = entry.prompt ? '✓' : ' ';
    const hasSkill = entry.skill_url || entry.repo_url ? '✓' : ' ';
    lines.push(
      `- [${hasPrompt}prompt][${hasSkill}skill] ${entry.id} | ${entry.title} | @${entry.creator_handle} | ${entry.model || 'unknown'}`
    );
  }

  lines.push('');
  lines.push('## Models');
  lines.push('');
  const models = [...new Set(entries.map(e => e.model).filter(Boolean))];
  for (const model of models) {
    const count = entries.filter(e => e.model === model).length;
    lines.push(`- ${model}: ${count} entries`);
  }

  lines.push('');
  lines.push('## Categories');
  lines.push('');
  const categories = [...new Set(entries.map(e => e.category).filter(Boolean))];
  for (const category of categories) {
    const count = entries.filter(e => e.category === category).length;
    lines.push(`- ${category}: ${count} entries`);
  }

  lines.push('');
  lines.push('---');
  lines.push('Generated from https://vskills.dev');
  lines.push('Content rights remain with original creators.');

  const content = lines.join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
