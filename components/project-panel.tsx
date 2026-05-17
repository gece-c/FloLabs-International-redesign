import Link from "next/link";
import type { ReactNode } from "react";

/** Shared with project listing cards: opaque panels on projects gradient pages. */
export const projectPanelShellClass =
  "border border-border/80 bg-card/62 shadow-sm dark:border-white/22 dark:bg-[#061626]/94 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";

/** Same look as project panels, lower opacity for copy over photo heroes. */
export const projectPanelHeroShellClass =
  "border border-border/55 bg-card/30 shadow-sm backdrop-blur-[6px] dark:border-white/16 dark:bg-[#061626]/45 dark:backdrop-blur-[6px] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

export const projectPanelHeadingClass =
  "text-base font-semibold uppercase leading-snug tracking-[0.2em] text-foreground dark:text-white [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

export const projectPanelBodyClass =
  "text-sm font-normal leading-relaxed text-muted dark:text-white/82 [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

export const projectDetailLinkClass =
  "inline-flex min-h-10 items-center justify-center border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors duration-200 hover:border-primary hover:bg-primary/8 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50 dark:border-white/35 dark:bg-white/5 dark:text-white dark:hover:border-white/65 dark:hover:bg-white/15 dark:hover:text-white dark:focus-visible:outline-white/50";

type ProjectPanelProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function ProjectPanel({ title, children, className }: ProjectPanelProps) {
  return (
    <section
      className={`${projectPanelShellClass} px-5 py-5 text-left sm:px-6 sm:py-6 ${className ?? ""}`}
    >
      <h2 className={projectPanelHeadingClass}>{title}</h2>
      <div className={`mt-4 ${projectPanelBodyClass}`}>{children}</div>
    </section>
  );
}

type ProjectDetailLinkProps = {
  href: string;
  label: string;
  external?: boolean;
  className?: string;
};

export function ProjectDetailLink({ href, label, external, className }: ProjectDetailLinkProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${projectDetailLinkClass}${className ? ` ${className}` : ""}`}
    >
      <span>{label}</span>
      <span aria-hidden className="ml-2 translate-y-px text-sm font-normal normal-case tracking-normal">
        →
      </span>
    </Link>
  );
}

const projectDetailExitLinkClass =
  "inline-flex shrink-0 items-center justify-center p-1 text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50 dark:text-white dark:hover:text-white/85 dark:focus-visible:outline-white/50";

function BackArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-6 w-6"}
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

type ProjectDetailExitLinkProps = {
  href: string;
  /** Accessible label (visible text is hidden). */
  label?: string;
  className?: string;
};

export function ProjectDetailExitLink({
  href,
  label = "Back to projects",
  className,
}: ProjectDetailExitLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`${projectDetailExitLinkClass}${className ? ` ${className}` : ""}`}
    >
      <BackArrowIcon />
    </Link>
  );
}

/** FloLabs logo navy: primary CTA on project detail pages. */
export const projectVisitSiteButtonClass =
  "inline-flex min-h-14 w-full items-center justify-center border border-[#00349b] bg-[#00349b] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:border-[#002a7a] hover:bg-[#002a7a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00349b] sm:min-h-[3.75rem] sm:text-base";

type ProjectVisitSiteLinkProps = {
  href: string;
  label?: string;
  className?: string;
};

export function ProjectVisitSiteLink({
  href,
  label = "Visit site",
  className,
}: ProjectVisitSiteLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${projectVisitSiteButtonClass}${className ? ` ${className}` : ""}`}
    >
      <span>{label}</span>
      <span aria-hidden className="ml-2.5 translate-y-px text-base font-normal normal-case tracking-normal">
        →
      </span>
    </Link>
  );
}
