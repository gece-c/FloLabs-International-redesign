import { projects } from "@/lib/site-data";

const FLOLABS_INNOVATIONS_GROUP_CAROUSEL_LOGO =
  "/projects/icons/Flolabs_logo%20Black.png";

const logos = projects.flatMap((project) => {
  if (!project.logoPath || project.slug === "flolabs-international") {
    return [];
  }
  if (project.slug === "flolabs-innovations-group") {
    return [
      {
        slug: project.slug,
        logoPath: FLOLABS_INNOVATIONS_GROUP_CAROUSEL_LOGO,
      },
    ];
  }
  return [{ slug: project.slug, logoPath: project.logoPath }];
});

function LogoSlide({
  logoPath,
  decorative,
  eager,
}: {
  logoPath: string;
  decorative?: boolean;
  eager?: boolean;
}) {
  return (
    <div
      className="flex h-16 w-[5.5rem] shrink-0 items-center justify-center sm:h-[4.5rem] sm:w-28"
      aria-hidden={decorative ? true : undefined}
    >
      <img
        src={logoPath}
        alt=""
        className="max-h-full max-w-full object-contain"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}

/**
 * Infinite horizontal logo strip for the about page (CSS marquee, same model as home projects).
 */
export function AboutProjectLogosMarquee() {
  if (logos.length === 0) return null;

  return (
    <div
      className="w-full [--home-marquee-duration:40s]"
      role="region"
      aria-label="Project logos"
    >
      <div className="home-projects-marquee-viewport relative isolate w-full">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-[#00349b] via-[#00349b]/50 to-transparent sm:w-12"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-[#00349b] via-[#00349b]/50 to-transparent sm:w-12"
        />
        <div className="relative z-[2]">
          <div className="home-projects-marquee-track min-h-16 sm:min-h-[4.5rem]">
            <div className="home-projects-marquee-group gap-6 sm:gap-8">
              {logos.map((item, index) => (
                <LogoSlide
                  key={item.slug}
                  logoPath={item.logoPath}
                  eager={index === 0}
                />
              ))}
            </div>
            <div className="w-6 shrink-0 self-stretch sm:w-8" aria-hidden />
            <div className="home-projects-marquee-group gap-6 sm:gap-8" aria-hidden>
              {logos.map((item, index) => (
                <LogoSlide
                  key={`${item.slug}-dup`}
                  logoPath={item.logoPath}
                  decorative
                  eager={index === 0}
                />
              ))}
            </div>
            <div className="w-6 shrink-0 self-stretch sm:w-8" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
