type IconProps = { className?: string };

export function XLogo({ className = 'w-3.5 h-3.5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function GitHubLogo({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function Stroke({ className, d }: IconProps & { d: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

export const SearchIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <Stroke className={className} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
);
export const ArrowRight = ({ className = 'w-4 h-4' }: IconProps) => (
  <Stroke className={className} d="M5 12h14M13 6l6 6-6 6" />
);
export const ArrowLeft = ({ className = 'w-4 h-4' }: IconProps) => (
  <Stroke className={className} d="M19 12H5M11 18l-6-6 6-6" />
);
export const ArrowDown = ({ className = 'w-4 h-4' }: IconProps) => (
  <Stroke className={className} d="M12 5v14M6 13l6 6 6-6" />
);
export const ArrowUpRight = ({ className = 'w-4 h-4' }: IconProps) => (
  <Stroke className={className} d="M7 17L17 7M8 7h9v9" />
);
export const CopyIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <Stroke className={className} d="M9 9h10v10H9zM5 15V5h10" />
);
export const CheckIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <Stroke className={className} d="M5 13l4 4L19 7" />
);
export const CloseIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <Stroke className={className} d="M6 6l12 12M18 6L6 18" />
);
export const ChevronDown = ({ className = 'w-3.5 h-3.5' }: IconProps) => (
  <Stroke className={className} d="M6 9l6 6 6-6" />
);
export const ChevronLeft = ({ className = 'w-4 h-4' }: IconProps) => (
  <Stroke className={className} d="M15 18l-6-6 6-6" />
);
export const ChevronRight = ({ className = 'w-4 h-4' }: IconProps) => (
  <Stroke className={className} d="M9 18l6-6-6-6" />
);

export function PlayIcon({ className = 'w-3 h-3' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 4.5v15a1 1 0 001.5.86l12-7.5a1 1 0 000-1.72l-12-7.5A1 1 0 007 4.5z" />
    </svg>
  );
}

export function Logo({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="8" fill="var(--accent)" />
      <path d="M9 9l7 14 7-14" fill="none" stroke="var(--accent-ink)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const EyeIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <Stroke className={className} d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z" />
);
