import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { HeaderSearch } from "@/components/HeaderSearch";
import { GitHubLogo, Logo } from "@/components/icons";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
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

const GITHUB_URL = "https://github.com/Andriy-Kulak/vskills";
const CONTRIBUTE_URL = `${GITHUB_URL}/blob/main/CONTRIBUTING.md`;

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Logo />
          <span className="font-display text-[17px] font-extrabold tracking-tight">vskills</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-muted">
          <Link href="/#browse" className="label hover:text-foreground transition-colors">
            Browse
          </Link>
          <Link href="/#skills" className="label hover:text-foreground transition-colors">
            Skills
          </Link>
          <Link href="/api/entries" className="label hover:text-foreground transition-colors">
            API
          </Link>
          <Link href="/llms.txt" className="label hover:text-foreground transition-colors">
            llms.txt
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <HeaderSearch />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden sm:grid h-9 w-9 place-items-center rounded-full border border-line text-muted hover:text-foreground hover:border-line-strong transition-colors"
          >
            <GitHubLogo />
          </a>
          <a
            href={CONTRIBUTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label h-9 inline-flex items-center rounded-full bg-foreground px-4 text-background font-semibold hover:bg-accent transition-colors"
          >
            Submit
          </a>
        </div>
      </div>
    </header>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  const className = "text-muted hover:text-foreground transition-colors";
  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </li>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-line overflow-hidden">
      <div className="mx-auto max-w-[1400px] grid sm:grid-cols-2 lg:grid-cols-4 border-x border-line">
        <div className="p-6 sm:p-8 border-b lg:border-b-0 sm:border-r border-line">
          <p className="label text-subtle mb-4">About</p>
          <p className="text-sm text-muted leading-relaxed">
            A free, open-source directory of AI-made videos, the prompts behind them, and the agent
            skills that make them. No paywalls, ever.
          </p>
        </div>
        <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-line">
          <p className="label text-subtle mb-4">For AI / LLMs</p>
          <ul className="space-y-2 text-sm font-mono">
            <FooterLink href="/llms.txt">/llms.txt</FooterLink>
            <FooterLink href="/llms-full.txt">/llms-full.txt</FooterLink>
            <FooterLink href="/api/entries">/api/entries</FooterLink>
          </ul>
        </div>
        <div className="p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-line">
          <p className="label text-subtle mb-4">Attribution</p>
          <ul className="space-y-2 text-sm">
            <li className="text-muted">Every prompt and video belongs to its creator.</li>
            <FooterLink href="/sources">Sources & licenses</FooterLink>
            <FooterLink href={`${GITHUB_URL}/issues/new?template=takedown.md`}>
              Request removal
            </FooterLink>
          </ul>
        </div>
        <div className="p-6 sm:p-8">
          <p className="label text-subtle mb-4">Contribute</p>
          <ul className="space-y-2 text-sm">
            <FooterLink href={GITHUB_URL}>GitHub repository</FooterLink>
            <FooterLink href={CONTRIBUTE_URL}>Add an entry</FooterLink>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-4 flex flex-wrap gap-x-6 gap-y-1 justify-between text-xs text-subtle">
          <span>Code MIT. Content rights remain with original creators.</span>
          <span>
            Data from awesome-opus5-5-videos, awesome-ai-motion, awesome-seedance (CC BY 4.0) &amp;
            more.
          </span>
        </div>
      </div>
      <div
        aria-hidden
        className="font-display font-black text-center leading-[0.75] tracking-tighter select-none text-[22vw] bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text text-transparent -mb-[3vw]"
      >
        VSKILLS
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
        className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${instrumentSerif.variable} min-h-screen flex flex-col antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
