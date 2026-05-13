import Link from "next/link";
import type { Project } from "@/lib/site-data";

type HomePageProjectsCarouselProps = {
  projects: Project[];
};

function CarouselSlide({
  project,
  decorative,
  eagerImage,
}: {
  project: Project;
  decorative: boolean;
  eagerImage: boolean;
}) {
  return (
    <article
      className="group flex h-full min-h-[19.5rem] w-[min(19.5rem,calc(100vw-2.75rem))] shrink-0 flex-col self-stretch border border-white/22 bg-black/28 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-[border-color,background-color] duration-300 hover:border-white/40 hover:bg-black/36 sm:min-h-[20.5rem] sm:w-[21.5rem] sm:px-6 sm:py-6"
    >
      {project.logoPath ? (
        <div className="mb-5 min-w-0 shrink-0 border-b border-white/10 pb-4">
          <div className="flex h-14 w-full min-w-0 max-w-full items-center justify-start overflow-hidden">
            <img
              src={project.logoPath}
              alt={decorative ? "" : `${project.name} logo`}
              className="max-h-full w-auto max-w-full object-contain object-left opacity-[0.92] transition-opacity duration-300 group-hover:opacity-100"
              loading={eagerImage ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        </div>
      ) : null}

      <h3 className="min-w-0 text-[0.7rem] font-semibold uppercase leading-snug tracking-[0.18em] text-white sm:text-xs sm:tracking-[0.2em] [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
        {project.name}
      </h3>
      <p className="mt-3 min-w-0 flex-1 text-sm font-normal leading-relaxed text-white/82 [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
        <span className="line-clamp-4">{project.summary}</span>
      </p>

      <div className="mt-6 border-t border-white/10 pt-5">
        <Link
          href={`/projects/${project.slug}`}
          tabIndex={decorative ? -1 : undefined}
          className="inline-flex min-h-10 items-center text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-200 hover:text-white/90"
        >
          <span>View project</span>
          <span
            aria-hidden
            className="ml-2 translate-y-px text-sm font-normal normal-case tracking-normal"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

/**
 * Full-bleed horizontal showcase for the home `#projects` scene only.
 * Motion is a CSS marquee: two flex groups + `translateX(-50%)` loop.
 * Not driven by `scrollLeft` or `requestAnimationFrame`, so page scroll /
 * wheel / touch do not stop it. Second copy is `aria-hidden` for AT.
 */
export function HomePageProjectsCarousel({ projects }: HomePageProjectsCarouselProps) {
  if (projects.length === 0) return null;

  return (
    <div
      className="w-full [--home-marquee-duration:52s]"
      role="region"
      aria-label="Featured projects"
    >
      {/* Full-bleed width shell (no `relative` here — fade height must not include extra in-flow padding). */}
      <div className="-mx-4 w-[calc(100%+2rem)] sm:-mx-6 sm:w-[calc(100%+3rem)] lg:-mx-8 lg:w-[calc(100%+4rem)]">
        {/*
          Fades are positioned on this box; its only in-flow content is the padded track row,
          so `inset-y-0` matches the cards exactly (no extra padding below the marquee).
        */}
        <div className="home-projects-marquee-viewport relative isolate w-full">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r from-black/85 via-black/40 to-transparent sm:w-12"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-black/85 via-black/40 to-transparent sm:w-12"
          />
          <div className="relative z-[2] px-4 sm:px-6 lg:px-8">
            <div className="home-projects-marquee-track min-h-[19.5rem] sm:min-h-[20.5rem]">
              <div className="home-projects-marquee-group">
                {projects.map((project, index) => (
                  <CarouselSlide
                    key={project.slug}
                    project={project}
                    decorative={false}
                    eagerImage={index === 0}
                  />
                ))}
              </div>
              {/*
                Same width as gap inside groups (0.75rem / 1rem). Flex `gap` does not apply between
                these two sibling groups, so without spacers the last card of copy A touches the first
                of copy B (e.g. Bootcamp University | MoodChanger). Trailing spacer keeps translateX(-50%) aligned with one full loop segment.
              */}
              <div
                className="w-3 shrink-0 self-stretch sm:w-4"
                aria-hidden
              />
              <div className="home-projects-marquee-group" aria-hidden>
                {projects.map((project, index) => (
                  <CarouselSlide
                    key={`${project.slug}-dup`}
                    project={project}
                    decorative
                    eagerImage={index === 0}
                  />
                ))}
              </div>
              <div className="w-3 shrink-0 self-stretch sm:w-4" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
