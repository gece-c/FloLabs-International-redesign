import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          <Link
            href="/"
            className="inline-flex max-w-[calc(100vw-6.5rem)] items-center gap-2.5 text-lg font-bold leading-none tracking-wide text-foreground sm:max-w-none sm:gap-3 sm:text-xl"
          >
            <Image
              src="/flolabs-logo.svg"
              alt="FloLabs International logo"
              width={36}
              height={36}
              className="h-9 w-9 sm:h-10 sm:w-10"
              priority
            />
            <span className="relative top-px inline-flex h-9 items-center truncate sm:hidden">
              FloLabs
            </span>
            <span className="relative top-px hidden h-10 items-center truncate sm:inline-flex">
              FloLabs International
            </span>
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <nav className="hidden items-center gap-5 text-sm md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-10 items-center text-muted transition hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
        <nav className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3 text-muted transition hover:bg-card hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
