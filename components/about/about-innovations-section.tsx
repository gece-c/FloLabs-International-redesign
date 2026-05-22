import Image from "next/image";
import {
  aboutSectionRevealProps,
  aboutStaggerDelay,
} from "@/components/about/about-reveal-config";
import { ScrollReveal } from "@/components/scroll-reveal";
import { aboutIntro } from "@/lib/site-data";

const FLOLABS_LOGO = "/projects/icons/Flolabs_logo%20Black.png";

const sectionHeadingClass =
  "text-2xl font-bold uppercase leading-[1.08] tracking-[0.14em] text-foreground dark:text-white sm:text-3xl sm:tracking-[0.16em] lg:text-4xl [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

const sectionBodyClass =
  "text-base font-normal leading-relaxed text-muted dark:text-white/82 [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

export function AboutInnovationsSection() {
  return (
    <section
      aria-labelledby="about-innovations-heading"
      className="w-full bg-transparent py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-11 px-4 sm:gap-[3.3rem] sm:px-6 md:flex-row md:items-start md:gap-[3.85rem] lg:px-8">
        <ScrollReveal
          {...aboutSectionRevealProps}
          direction="left"
          className="flex shrink-0 justify-center md:w-1/4 md:justify-start"
        >
          <Image
            src={FLOLABS_LOGO}
            alt=""
            width={480}
            height={480}
            aria-hidden
            className="h-[21rem] w-[21rem] object-contain transition-transform duration-300 motion-safe:hover:scale-[1.02] sm:h-96 sm:w-96 dark:brightness-0 dark:invert lg:h-[27rem] lg:w-[27rem]"
          />
        </ScrollReveal>

        <ScrollReveal
          {...aboutSectionRevealProps}
          direction="right"
          delay={aboutStaggerDelay(80)}
          className="min-w-0 md:flex-1"
        >
          <div>
            <h2 id="about-innovations-heading" className={sectionHeadingClass}>
              {aboutIntro.headline}
            </h2>
            <div className={`mt-6 space-y-5 sm:mt-8 ${sectionBodyClass}`}>
              {aboutIntro.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
