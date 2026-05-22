import Link from "next/link";
import { projectDetailLinkClass, projectPanelShellClass } from "@/components/project-panel";
import type { Project } from "@/lib/site-data";

/** Opaque frosted shell: no backdrop-filter (marquee transform + scroll reveal break blur). */
const cardShellCarouselClass =
  "group flex h-full flex-col border border-white/22 bg-[#061626]/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[border-color,background-color] duration-300 hover:border-white/40 hover:bg-[#081e32]/92 px-5 py-5 sm:px-6 sm:py-6";

/** Opaque shell for listing: no backdrop-filter (scroll perf). */
const cardShellGridClass = `group flex h-full flex-col ${projectPanelShellClass} transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/40 hover:bg-card/72 hover:shadow-md px-5 py-5 dark:hover:border-white/40 dark:hover:bg-[#081e32]/96 dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-6 sm:py-6`;

const layoutClass = {
  carousel:
    "min-h-[19.5rem] w-[min(19.5rem,calc(100vw-2.75rem))] shrink-0 self-stretch sm:min-h-[20.5rem] sm:w-[21.5rem]",
  grid: "w-full min-h-[19.5rem] sm:min-h-[20.5rem]",
} as const;

const ctaButtonCarouselClass =
  "inline-flex min-h-10 items-center justify-center border border-white/35 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:border-white/65 hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50";

type ProjectCardProps = {
  project: Project;
  layout: "carousel" | "grid";
  /** Marquee duplicate slides: hide from tab order and logo alt text. */
  decorative?: boolean;
  eagerImage?: boolean;
  /** Grid listing: show external site link when `project.siteUrl` is set. */
  showExternalLink?: boolean;
};

function ProjectCardCta({
  href,
  label,
  decorative,
  external,
  className,
  layout,
}: {
  href: string;
  label: string;
  decorative?: boolean;
  external?: boolean;
  className?: string;
  layout: "carousel" | "grid";
}) {
  const buttonClass = layout === "grid" ? projectDetailLinkClass : ctaButtonCarouselClass;

  return (
    <Link
      href={href}
      tabIndex={decorative ? -1 : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${buttonClass}${className ? ` ${className}` : ""}`}
    >
      <span>{label}</span>
      <span aria-hidden className="ml-2 translate-y-px text-sm font-normal normal-case tracking-normal">
        →
      </span>
    </Link>
  );
}

export function ProjectCard({
  project,
  layout,
  decorative = false,
  eagerImage = false,
  showExternalLink = false,
}: ProjectCardProps) {
  return (
    <article
      className={`${layout === "grid" ? cardShellGridClass : cardShellCarouselClass} ${layoutClass[layout]}`}
    >
      {project.logoPath ? (
        <div
          className={`mb-5 min-w-0 shrink-0 border-b pb-4 ${
            layout === "grid" ? "border-border dark:border-white/10" : "border-white/10"
          }`}
        >
          <div className="flex h-14 w-full min-w-0 max-w-full items-center justify-start overflow-hidden">
            <img
              src={project.logoPath}
              alt={decorative ? "" : `${project.name} logo`}
              className={`max-h-full w-auto max-w-full object-contain object-left opacity-[0.92] ${
                layout === "carousel"
                  ? "transition-opacity duration-300 group-hover:opacity-100"
                  : ""
              }`}
              loading={eagerImage ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        </div>
      ) : null}

      <h3
        className={`min-w-0 text-base font-semibold uppercase leading-snug tracking-[0.2em] [font-family:var(--font-inter),Arial,Helvetica,sans-serif] ${
          layout === "grid" ? "text-foreground dark:text-white" : "text-white"
        }`}
      >
        {project.name}
      </h3>
      <p
        className={`mt-3 min-w-0 flex-1 text-sm font-normal leading-relaxed [font-family:var(--font-inter),Arial,Helvetica,sans-serif] ${
          layout === "grid" ? "text-muted dark:text-white/82" : "text-white/82"
        }`}
      >
        <span className="line-clamp-4">{project.summary}</span>
      </p>

      <div className="mt-6">
        <div
          className={
            showExternalLink && project.siteUrl
              ? "flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              : "flex flex-wrap gap-3"
          }
        >
          <ProjectCardCta
            href={`/projects/${project.slug}`}
            label="View project"
            decorative={decorative}
            layout={layout}
          />
          {showExternalLink && project.siteUrl ? (
            <ProjectCardCta
              href={project.siteUrl}
              label="Visit site"
              decorative={decorative}
              external
              layout={layout}
              className="self-end sm:ml-auto"
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
