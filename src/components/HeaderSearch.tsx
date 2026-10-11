'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SearchIcon } from './icons';

export const FOCUS_SEARCH_EVENT = 'vskills:focus-search';

export function HeaderSearch() {
  const pathname = usePathname();
  const router = useRouter();

  const open = () => {
    if (pathname === '/') {
      window.dispatchEvent(new Event(FOCUS_SEARCH_EVENT));
    } else {
      router.push('/?focus=search#browse');
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <button
      onClick={open}
      className="h-9 inline-flex items-center gap-2 rounded-full border border-line pl-3 pr-2 text-sm text-muted hover:text-foreground hover:border-line-strong transition-colors"
    >
      <SearchIcon />
      <span className="hidden lg:inline">Search entries</span>
      <kbd className="hidden sm:inline font-mono text-[10px] rounded border border-line px-1.5 py-0.5 text-subtle">
        ⌘K
      </kbd>
    </button>
  );
}
