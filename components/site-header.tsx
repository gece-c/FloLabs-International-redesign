import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks } from "@/lib/site-data";

export function SiteHeader() {
  const applyNowLink = { href: "/internships", label: "Apply Now" };
  const midpoint = Math.ceil(navLinks.length / 2);
  const leftNav = navLinks.slice(0, midpoint);
  const rightNav = navLinks.slice(midpoint);

  return (
    <header className="glass-nav sticky top-0 z-50 border-b">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex items-center justify-between gap-3 md:hidden">
          <Link
            href="/"
            className="inline-flex max-w-[calc(100vw-6.5rem)] items-center gap-2.5 text-lg font-semibold uppercase leading-none tracking-[0.18em] text-foreground"
          >
            <Image
              src="/flolabs-logo.svg"
              alt="FloLabs International logo"
              width={36}
              height={36}
              className="h-9 w-9"
              priority
            />
            <span className="relative top-px truncate">FloLabs</span>
          </Link>
          <ThemeToggle />
        </div>

        <nav className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3 transition duration-200 hover:bg-background/55 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={applyNowLink.href}
            className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full border border-white/25 px-3 font-semibold text-foreground transition duration-200 hover:border-white/55 hover:bg-white/10"
          >
            {applyNowLink.label}
          </Link>
        </nav>

        <div className="hidden items-center md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 md:py-1">
          <nav className="flex flex-wrap items-center justify-start gap-x-7 gap-y-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted">
            {leftNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-10 items-center transition duration-200 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="mx-auto inline-flex flex-col items-center gap-1 text-center [font-family:var(--font-display),var(--font-geist-sans),sans-serif]"
          >
            <Image
              src="/flolabs-logo.svg"
              alt="FloLabs International logo"
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
            <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-foreground lg:inline">
              FloLabs International
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
            {rightNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-10 items-center text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted transition duration-200 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={applyNowLink.href}
              className="inline-flex min-h-10 items-center border border-white/30 px-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-foreground transition duration-200 hover:border-white/60 hover:bg-white/10"
            >
              {applyNowLink.label}
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
