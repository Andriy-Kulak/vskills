import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vskills - Free AI Video Prompts, Skills & Directory",
  description:
    "A free, open-source directory of AI-made videos, video prompts, and video/video-editing agent skills. Browse 115+ curated entries with prompts for Claude Opus, Seedance, and more.",
  keywords: [
    "AI video",
    "video prompts",
    "Claude Opus",
    "Seedance",
    "video generation",
    "AI skills",
    "motion graphics",
    "video editing",
    "hyperframes",
    "remotion",
  ],
  openGraph: {
    title: "vskills - Free AI Video Prompts & Skills Directory",
    description:
      "Browse 115+ AI-generated video prompts and video-editing skills. Free and open-source.",
    type: "website",
    url: "https://vskills.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "vskills - Free AI Video Prompts & Skills Directory",
    description:
      "Browse 115+ AI-generated video prompts and video-editing skills. Free and open-source.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">vskills</span>
          <span className="rounded bg-[var(--accent)] px-1.5 py-0.5 text-xs font-medium text-white">
            FREE
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/llms.txt"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            llms.txt
          </Link>
          <Link
            href="/api/entries"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            API
          </Link>
          <a
            href="https://github.com/Andriy-Kulak/vskills"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--card-bg)] mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold mb-3">vskills</h3>
            <p className="text-sm text-[var(--muted)]">
              A free, open-source directory of AI-made videos, video prompts,
              and video/video-editing agent skills.
            </p>
            <p className="text-sm text-[var(--muted)] mt-2 font-medium">
              Free forever. No paywalls.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">For AI/LLMs</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <Link href="/llms.txt" className="hover:text-[var(--foreground)]">
                  /llms.txt
                </Link>
              </li>
              <li>
                <Link href="/llms-full.txt" className="hover:text-[var(--foreground)]">
                  /llms-full.txt
                </Link>
              </li>
              <li>
                <Link href="/api/entries" className="hover:text-[var(--foreground)]">
                  JSON API
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Legal & Attribution</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                Every prompt and video belongs to its creator.
              </li>
              <li>
                <a
                  href="https://github.com/Andriy-Kulak/vskills/issues/new?template=takedown.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)]"
                >
                  Request content removal
                </a>
              </li>
              <li>
                <Link href="/sources" className="hover:text-[var(--foreground)]">
                  View sources & licenses
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Contribute</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <a
                  href="https://github.com/Andriy-Kulak/vskills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)]"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Andriy-Kulak/vskills/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)]"
                >
                  Add an entry
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[var(--card-border)] text-sm text-[var(--muted)]">
          <p>
            Built with data from{" "}
            <a
              href="https://github.com/yihui-dev/awesome-opus5-5-videos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              awesome-opus5-5-videos
            </a>
            ,{" "}
            <a
              href="https://github.com/guanmo-ai/awesome-ai-motion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              awesome-ai-motion
            </a>
            ,{" "}
            <a
              href="https://github.com/LearnPrompt/awesome-seedance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              awesome-seedance
            </a>{" "}
            (CC BY 4.0), and other sources.{" "}
            <Link href="/sources" className="text-[var(--accent)] hover:underline">
              Full attribution
            </Link>
            .
          </p>
          <p className="mt-2">
            Code licensed under MIT. Content rights remain with original creators.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
