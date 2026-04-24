import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-card/60">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-7 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-sm font-semibold tracking-wide text-foreground break-words">
            FloLabs International
          </p>
          <p className="mt-3 text-sm text-muted break-words">
            A FloLabs Innovations Group Company
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Our Projects
          </p>
          <div className="mt-2 space-y-1 text-sm">
            <Link
              href="/projects/caipo"
              className="flex min-h-8 w-full items-center text-muted transition hover:text-foreground"
            >
              CAIPO
            </Link>
            <Link
              href="/projects"
              className="flex min-h-8 w-full items-center text-muted transition hover:text-foreground"
            >
              Moodchanger.ai
            </Link>
            <Link
              href="/projects"
              className="flex min-h-8 w-full items-center text-muted transition hover:text-foreground"
            >
              Moodchanger for Pets
            </Link>
            <Link
              href="/projects/flo-travel"
              className="flex min-h-8 w-full items-center text-muted transition hover:text-foreground"
            >
              Flo Travel
            </Link>
            <Link
              href="/about"
              className="flex min-h-8 w-full items-center text-muted transition hover:text-foreground"
            >
              FloLabs Innovations Group
            </Link>
            <Link
              href="/projects/flo-studios"
              className="flex min-h-8 w-full items-center text-muted transition hover:text-foreground"
            >
              Flo Studios
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Follow Us
          </p>
          <a
            href="https://www.linkedin.com/company/flolabs-innovation/"
            className="mt-2 inline-flex min-h-9 items-center gap-2 rounded-full border border-border/60 px-3 text-sm text-muted transition hover:border-primary hover:text-foreground"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5ZM.5 8h4V23h-4V8Zm7 0h3.83v2.05h.05c.53-1.01 1.84-2.08 3.79-2.08C19.23 7.97 24 10.6 24 16.08V23h-4v-6.1c0-2.03-.04-4.64-2.83-4.64-2.84 0-3.27 2.22-3.27 4.5V23h-4V8Z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
      <div className="border-t border-border/80 px-4 py-4 text-center text-xs text-muted sm:px-6 lg:px-8">
        © 2026 FloLabs Innovations Group. All rights reserved.
      </div>
    </footer>
  );
}
