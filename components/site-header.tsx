import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks } from "@/lib/site-data";

const navTabClass =
  "text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted";

function BrandLink() {
  return (
    <Link
      href="/"
      className="grid min-w-0 max-w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-2.5 text-foreground transition hover:opacity-90 sm:gap-3 [font-family:var(--font-inter),Arial,Helvetica,sans-serif]"
    >
      <Image
        src="/flolabs-logo.svg"
        alt="FloLabs International logo"
        width={40}
        height={40}
        className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
        priority
      />
      <span className="max-w-[11rem] text-left text-sm font-semibold leading-none tracking-tight text-foreground sm:max-w-none sm:text-base md:text-lg">
        FloLabs International
      </span>
    </Link>
  );
}

const applyNowLink = { href: "/internships", label: "Apply Now" };

const applyNowDesktopClass =
  "inline-flex h-11 shrink-0 items-center border border-border px-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground/35 hover:bg-foreground/5";

const applyNowMobileClass =
  "inline-flex h-11 shrink-0 items-center whitespace-nowrap border border-border px-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-foreground transition hover:border-foreground/35 hover:bg-foreground/5";

export function SiteHeader() {
  return (
    <header className="glass-nav sticky top-0 z-50 border-b">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex items-center justify-between gap-3 md:hidden">
          <BrandLink />
          <div className="flex shrink-0 items-center gap-1.5">
            <Link href={applyNowLink.href} className={applyNowMobileClass}>
              {applyNowLink.label}
            </Link>
            <ThemeToggle />
          </div>
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
        </nav>

        <div className="hidden w-full flex-wrap items-center gap-x-6 gap-y-2 md:flex md:py-1 lg:gap-x-8">
          <div className="shrink-0">
            <BrandLink />
          </div>
          <nav
            className={`flex min-w-0 flex-1 flex-wrap items-center justify-start gap-x-6 gap-y-2 lg:gap-x-7 ${navTabClass}`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-10 items-center transition duration-200 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2 lg:gap-3">
            <Link href={applyNowLink.href} className={applyNowDesktopClass}>
              {applyNowLink.label}
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
