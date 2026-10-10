import { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Sources & Attribution - vskills',
  description: 'Data sources, licenses, and attribution for the vskills directory.',
};

export default function SourcesPage() {
  const sourcesPath = path.join(process.cwd(), 'data', 'SOURCES.md');
  const sourcesContent = fs.readFileSync(sourcesPath, 'utf-8');

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <nav className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to directory
        </Link>
      </nav>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>Sources & Attribution</h1>
        
        <div className="not-prose bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
          <p className="text-sm">
            <strong>Important:</strong> Every prompt and video in this directory belongs to its
            original creator. This project only curates and indexes existing public content.
            We do not claim ownership or grant any license to the creators&apos; content.
          </p>
        </div>

        <MarkdownContent content={sourcesContent} />
      </article>
    </div>
  );
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[] = [];
  let tableHeaders: string[] = [];

  const processLine = (line: string, index: number) => {
    if (line.startsWith('# ')) {
      return <h1 key={index} className="text-2xl font-bold mt-8 mb-4">{line.slice(2)}</h1>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={index} className="text-xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>;
    }
    if (line.startsWith('- ')) {
      const content = line.slice(2);
      return (
        <li key={index} className="ml-4">
          <InlineContent text={content} />
        </li>
      );
    }
    if (line.trim() === '') {
      return <br key={index} />;
    }
    return (
      <p key={index} className="mb-2">
        <InlineContent text={line} />
      </p>
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHeaders = line.split('|').filter(cell => cell.trim()).map(cell => cell.trim());
        continue;
      }
      if (line.includes('---')) {
        continue;
      }
      tableRows.push(line);
    } else {
      if (inTable && tableRows.length > 0) {
        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-4">
            <table className="min-w-full border border-[var(--card-border)] rounded-lg overflow-hidden">
              <thead className="bg-[var(--card-bg)]">
                <tr>
                  {tableHeaders.map((header, j) => (
                    <th key={j} className="px-4 py-2 text-left text-sm font-semibold border-b border-[var(--card-border)]">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, j) => (
                  <tr key={j} className="border-b border-[var(--card-border)] last:border-0">
                    {row.split('|').filter(cell => cell.trim()).map((cell, k) => (
                      <td key={k} className="px-4 py-2 text-sm">
                        <InlineContent text={cell.trim()} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableRows = [];
        tableHeaders = [];
      }
      elements.push(processLine(line, i));
    }
  }

  return <div>{elements}</div>;
}

function InlineContent({ text }: { text: string }) {
  const parts = text.split(/(\[.*?\]\(.*?\)|`.*?`)/g);
  
  return (
    <>
      {parts.map((part, i) => {
        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          return (
            <a
              key={i}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              {linkMatch[1]}
            </a>
          );
        }
        const codeMatch = part.match(/`(.*?)`/);
        if (codeMatch) {
          return (
            <code key={i} className="px-1 py-0.5 bg-[var(--card-bg)] rounded text-sm">
              {codeMatch[1]}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
