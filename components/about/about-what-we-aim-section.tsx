import Image from "next/image";
import { AboutProjectLogosMarquee } from "@/components/about/about-project-logos-marquee";
import {
  aboutCardRevealProps,
  aboutSectionRevealProps,
  aboutStaggerDelay,
} from "@/components/about/about-reveal-config";
import { ScrollReveal } from "@/components/scroll-reveal";
import { aboutObjectives } from "@/lib/site-data";

const WHAT_WE_AIM_BACKGROUND = "/about/what-we-aim-background.png";
const WHAT_WE_AIM_BACKGROUND_WIDTH = 1961;
const WHAT_WE_AIM_BACKGROUND_HEIGHT = 361;

const sectionTitleClass =
  "text-center text-2xl font-bold uppercase leading-[1.08] tracking-[0.14em] text-foreground dark:text-white sm:text-3xl sm:tracking-[0.16em] lg:text-4xl [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

const pillarTitleClass =
  "text-base font-bold uppercase leading-snug tracking-[0.14em] text-white sm:text-lg [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

const pillarBodyClass =
  "mt-1.5 text-sm font-normal leading-snug text-white/90 sm:mt-2 sm:text-base sm:leading-relaxed [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

export function AboutWhatWeAimSection() {
  return (
    <section
      aria-labelledby="about-what-we-aim-heading"
      className="w-full overflow-x-clip bg-transparent"
    >
      <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20 lg:px-8 lg:pt-24">
        <ScrollReveal {...aboutSectionRevealProps} className="w-full">
          <h2 id="about-what-we-aim-heading" className={sectionTitleClass}>
            What we aim to deliver
          </h2>
        </ScrollReveal>
      </div>

      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
        <Image
          src={WHAT_WE_AIM_BACKGROUND}
          alt=""
          width={WHAT_WE_AIM_BACKGROUND_WIDTH}
          height={WHAT_WE_AIM_BACKGROUND_HEIGHT}
          sizes="100vw"
          aria-hidden
          className="block h-auto w-full max-w-none"
        />

        <div className="absolute inset-0 z-10 flex flex-col justify-center gap-4 overflow-hidden px-4 py-5 sm:gap-5 sm:px-8 sm:py-6 md:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-6xl overflow-hidden px-[1.5%] sm:px-[4%] md:px-[6.5%] lg:px-[8%]">
            <ScrollReveal
              {...aboutSectionRevealProps}
              delay={aboutStaggerDelay(100)}
              className="w-full"
            >
              <AboutProjectLogosMarquee />
            </ScrollReveal>
          </div>

          <div className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-2 md:justify-items-center md:gap-x-7 md:gap-y-0 lg:gap-x-10">
            {aboutObjectives.map((objective, index) => (
              <ScrollReveal
                key={objective.title}
                {...aboutCardRevealProps}
                delay={aboutStaggerDelay(index * 80)}
                className="min-w-0 w-full max-w-md"
              >
                <div>
                  <h3 className={pillarTitleClass}>{objective.title}</h3>
                  <p className={pillarBodyClass}>{objective.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
