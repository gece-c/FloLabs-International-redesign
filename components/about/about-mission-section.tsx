import Image from "next/image";
import {
  aboutSectionRevealProps,
  aboutStaggerDelay,
} from "@/components/about/about-reveal-config";
import { ScrollReveal } from "@/components/scroll-reveal";
import { aboutMission } from "@/lib/site-data";

const FUTURE_BACKGROUND = "/about/future-background.png";
const FUTURE_BACKGROUND_WIDTH = 1961;
const FUTURE_BACKGROUND_HEIGHT = 494;
const FLOLABS_INTERNATIONAL_LOGO =
  "/projects/icons/FloLabs_logo%20FloLabs%20International.svg";

const missionBodyClass =
  "text-sm font-normal leading-snug text-white/90 sm:text-base sm:leading-relaxed [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

export function AboutMissionSection() {
  return (
    <section
      aria-labelledby="about-mission-heading"
      className="relative mt-[4.8rem] w-full overflow-x-clip sm:mt-[5.4rem] lg:mt-[6rem]"
    >
      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
        <Image
          src={FUTURE_BACKGROUND}
          alt=""
          width={FUTURE_BACKGROUND_WIDTH}
          height={FUTURE_BACKGROUND_HEIGHT}
          sizes="100vw"
          aria-hidden
          className="block h-auto w-full max-w-none"
        />

        <div className="absolute inset-0 bg-black/45" aria-hidden />

        <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-6xl min-h-0 flex-col justify-center gap-4 overflow-x-clip px-4 py-[4%] sm:gap-5 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6 lg:px-8">
          <ScrollReveal
            {...aboutSectionRevealProps}
            direction="left"
            className="min-h-0 min-w-0 md:max-w-[58%] md:flex-1"
          >
            <div>
              <h2
                id="about-mission-heading"
                className="text-[clamp(1rem,2.8vw,1.875rem)] font-bold uppercase leading-[1.08] tracking-[0.14em] text-white sm:tracking-[0.16em] [font-family:var(--font-inter),Arial,Helvetica,sans-serif]"
              >
                {aboutMission.headlineLead}{" "}
                <span className="inline-block bg-white px-2 py-0.5 text-primary dark:text-[#00349b]">
                  {aboutMission.headlineHighlight}
                </span>
              </h2>

              <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                {aboutMission.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className={`${missionBodyClass} text-[clamp(0.8125rem,1.6vw,1rem)]`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            {...aboutSectionRevealProps}
            direction="right"
            delay={aboutStaggerDelay(100)}
            className="flex min-h-0 w-full shrink-0 items-center justify-center md:h-full md:w-[34%] md:justify-end"
          >
            <img
              src={FLOLABS_INTERNATIONAL_LOGO}
              alt=""
              aria-hidden
              className="h-auto w-auto max-w-full object-contain [max-height:min(86%,21.6vw)] md:[max-height:86%]"
              decoding="async"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
