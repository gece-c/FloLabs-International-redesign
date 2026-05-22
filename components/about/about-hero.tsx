import Image from "next/image";
import { ScrollReveal } from "@/components/scroll-reveal";
import { aboutIntro } from "@/lib/site-data";

const FLOLABS_LOGO = "/flolabs-logo.svg";
const HERO_BACKGROUND = "/about/about-header-background.png";

const heroRevealClass = "flex w-full flex-col items-center";

export function AboutHero() {
  return (
    <header
      id="about"
      className="relative w-full overflow-hidden border-b border-border/50 dark:border-white/10"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={HERO_BACKGROUND}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(50vh,32rem)] w-full max-w-6xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center sm:min-h-[min(55vh,36rem)] sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pt-36">
        <ScrollReveal
          direction="popup"
          duration={500}
          revealOnScroll={false}
          className={heroRevealClass}
        >
          <Image
            src={FLOLABS_LOGO}
            alt="FloLabs logo"
            width={216}
            height={216}
            className="h-[10.5rem] w-[10.5rem] shrink-0 sm:h-48 sm:w-48 lg:h-[13.5rem] lg:w-[13.5rem]"
            priority
          />
        </ScrollReveal>
        <ScrollReveal
          delay={80}
          duration={500}
          revealOnScroll={false}
          className={heroRevealClass}
        >
          <h1 className="mt-6 text-[1.65rem] font-bold uppercase leading-[1.08] tracking-[0.14em] text-black dark:text-white sm:mt-7 sm:text-3xl sm:tracking-[0.16em] lg:text-4xl [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
            About
          </h1>
        </ScrollReveal>
        <ScrollReveal
          delay={160}
          duration={500}
          revealOnScroll={false}
          className={heroRevealClass}
        >
          <p className="mx-auto mt-4 max-w-2xl text-center text-base font-normal leading-relaxed text-black/88 dark:text-white/88 sm:mt-5 sm:text-lg [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
            {aboutIntro.tagline}
          </p>
        </ScrollReveal>
      </div>
    </header>
  );
}
