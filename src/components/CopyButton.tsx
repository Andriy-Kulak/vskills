'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon } from './icons';

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: 'ghost' | 'primary';
  className?: string;
}

export function CopyButton({ text, label = 'Copy', variant = 'ghost', className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const styles =
    variant === 'primary'
      ? `h-12 w-full justify-center rounded-full text-[15px] font-semibold ${
          copied ? 'bg-foreground text-background' : 'bg-accent text-accent-ink hover:brightness-110'
        }`
      : `h-8 rounded-full border px-3 text-[13px] font-medium ${
          copied
            ? 'border-accent text-accent'
            : 'border-line text-muted hover:border-line-strong hover:text-foreground'
        }`;

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 transition active:scale-[0.97] ${styles} ${className}`}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? 'Copied!' : label}
    </button>
  );
}
