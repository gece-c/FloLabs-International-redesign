import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/site-data";

type HomePageProjectsCarouselProps = {
  projects: Project[];
};

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
      {/* Full-bleed width shell (no `relative` here: fade height must not include extra in-flow padding). */}
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
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    layout="carousel"
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
              <div className="w-3 shrink-0 self-stretch sm:w-4" aria-hidden />
              <div className="home-projects-marquee-group" aria-hidden>
                {projects.map((project, index) => (
                  <ProjectCard
                    key={`${project.slug}-dup`}
                    project={project}
                    layout="carousel"
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
