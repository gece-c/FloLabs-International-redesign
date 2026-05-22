import {
  CircleDot,
  Handshake,
  NotebookPen,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  aboutCardRevealProps,
  aboutSectionRevealProps,
  aboutStaggerDelay,
} from "@/components/about/about-reveal-config";
import { ScrollReveal } from "@/components/scroll-reveal";
import { projectPanelShellClass } from "@/components/project-panel";
import { aboutMethodology, aboutMethodologyIntro } from "@/lib/site-data";

const sectionTitleClass =
  "text-center text-2xl font-bold uppercase leading-[1.08] tracking-[0.14em] text-foreground dark:text-white sm:text-3xl sm:tracking-[0.16em] lg:text-4xl [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

const sectionTaglineClass =
  "mt-4 text-center text-base font-normal leading-relaxed text-muted dark:text-white/82 sm:mt-5 sm:text-lg [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

const cardTitleClass =
  "pr-10 text-base font-bold uppercase leading-snug tracking-[0.14em] text-foreground dark:text-white sm:pr-12 sm:text-lg [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

const cardBodyClass =
  "mt-1.5 text-sm font-normal leading-snug text-muted dark:text-white/90 sm:mt-2 sm:text-base sm:leading-relaxed [font-family:var(--font-inter),Arial,Helvetica,sans-serif]";

const methodologyCardClass = `group relative border border-border/80 p-6 transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/40 hover:bg-card/72 hover:shadow-md sm:p-8 dark:border-white/20 dark:hover:border-white/40 dark:hover:bg-[#081e32]/96 dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${projectPanelShellClass}`;

const METHODOLOGY_ICONS: LucideIcon[] = [
  CircleDot,
  NotebookPen,
  Sparkles,
  Handshake,
];

export function AboutMethodologySection() {
  return (
    <section
      aria-labelledby="about-methodology-heading"
      className="w-full overflow-x-clip bg-transparent py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal {...aboutSectionRevealProps} className="mx-auto max-w-3xl">
          <header>
            <h2 id="about-methodology-heading" className={sectionTitleClass}>
              {aboutMethodologyIntro.headline}
            </h2>
            <p className={sectionTaglineClass}>{aboutMethodologyIntro.tagline}</p>
          </header>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2">
          {aboutMethodology.map((item, index) => {
            const Icon = METHODOLOGY_ICONS[index];
            return (
              <ScrollReveal
                key={item.title}
                {...aboutCardRevealProps}
                delay={aboutStaggerDelay(index * 80)}
                className="h-full"
              >
                <article className={methodologyCardClass}>
                  <Icon
                    className="absolute right-6 top-6 size-6 shrink-0 text-foreground/55 transition-colors duration-200 group-hover:text-primary dark:text-white/70 dark:group-hover:text-white/90 sm:right-8 sm:top-8"
                    aria-hidden
                  />
                  <h3 className={cardTitleClass}>{item.title}</h3>
                  <p className={cardBodyClass}>{item.text}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
