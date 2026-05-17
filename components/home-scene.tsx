import Image from "next/image";
import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { HomeSceneCtaLink } from "@/components/home-scene-cta-link";

export type HomeSceneCta = {
  href: string;
  label: string;
};

type HomeSceneProps = {
  id?: string;
  headline: string;
  description: ReactNode;
  /** Photo background (default). Use `gradient` for brand CSS gradient (e.g. projects page). */
  background?: "image" | "gradient";
  imageSrc?: string;
  imageAlt?: string;
  cta?: HomeSceneCta;
  /** Rendered below the intro copy (e.g. project rail + CTA). */
  children?: ReactNode;
  priority?: boolean;
  /** Use full content width for rich blocks (e.g. pillar cards) instead of the narrow intro column. */
  wideDescription?: boolean;
  /** Heavier headline weight (e.g. projects listing). */
  boldHeadline?: boolean;
  /** Optional logo shown beside the headline (e.g. project detail). */
  logoSrc?: string;
  logoAlt?: string;
  /** Horizontally center intro + children blocks; text stays left-aligned. */
  centerContent?: boolean;
  /** When `centerContent` is true: Tailwind width class for the intro block (headline / description). */
  centerIntroMaxWidthClass?: string;
  /** Rendered at the end of the headline row (e.g. back link on project detail). */
  headerAside?: ReactNode;
};

export function HomeScene({
  id,
  headline,
  description,
  background = "image",
  imageSrc,
  imageAlt,
  cta,
  children,
  priority = false,
  wideDescription = false,
  boldHeadline = false,
  logoSrc,
  logoAlt,
  centerContent = false,
  centerIntroMaxWidthClass,
  headerAside,
}: HomeSceneProps) {
  const isGradient = background === "gradient";

  return (
    <section
      id={id}
      className={
        isGradient
          ? "relative min-h-[100dvh] w-full overflow-x-clip border-b border-border/70 dark:border-white/10"
          : "relative min-h-[100dvh] w-full overflow-hidden border-b border-border/50 dark:border-white/10"
      }
    >
      {isGradient ? (
        <div
          aria-hidden
          className="projects-scene-bg pointer-events-none fixed inset-0 -z-10"
        />
      ) : imageSrc && imageAlt ? (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover brightness-[1.18] contrast-[0.97] saturate-[1.06] dark:brightness-100 dark:contrast-100 dark:saturate-100"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-background/22 dark:bg-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/28 to-transparent dark:from-black/75 dark:via-black/45 dark:to-black/70"
          />
        </>
      ) : null}
      <div
        className={`relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36${
          centerContent ? " items-center" : ""
        }`}
      >
        <ScrollReveal
          className={
            centerContent
              ? `w-full shrink-0 ${centerIntroMaxWidthClass ?? "max-w-3xl"}`
              : wideDescription
                ? "w-full max-w-5xl shrink-0 lg:max-w-6xl"
                : logoSrc
                  ? "w-full max-w-2xl shrink-0 lg:max-w-3xl"
                  : "max-w-xl shrink-0 lg:max-w-2xl"
          }
        >
          <div
            className={`flex items-center gap-4 sm:gap-5 lg:gap-6${headerAside ? " flex-wrap" : ""}`}
          >
            {logoSrc ? (
              <div className="flex h-12 w-20 shrink-0 items-center justify-start sm:h-14 sm:w-24 lg:h-16 lg:w-28">
                <img
                  src={logoSrc}
                  alt={logoAlt ?? ""}
                  className="max-h-full w-auto max-w-full object-contain object-left opacity-[0.92]"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : null}
            <h2
              className={`min-w-0 flex-1 text-[1.65rem] uppercase leading-[1.08] tracking-[0.14em] sm:text-3xl sm:tracking-[0.16em] lg:text-4xl [font-family:var(--font-inter),Arial,Helvetica,sans-serif] ${
                boldHeadline ? "font-bold" : "font-semibold"
              } text-foreground dark:text-white`}
            >
              {headline}
            </h2>
            {headerAside ? (
              <div className="ml-auto shrink-0 self-center">{headerAside}</div>
            ) : null}
          </div>
          <div
            className={`mt-6 space-y-4 text-base font-normal leading-relaxed sm:text-lg ${
              isGradient ? "text-muted dark:text-white/88" : "text-muted dark:text-white/82"
            }`}
          >
            {typeof description === "string" ? <p>{description}</p> : description}
          </div>
          {cta ? (
            <div className="mt-9">
              <HomeSceneCtaLink href={cta.href} label={cta.label} />
            </div>
          ) : null}
        </ScrollReveal>
        {children ? (
          <div
            className={`mt-10 w-full min-w-0 shrink-0 lg:mt-12${
              centerContent ? " flex flex-col items-center" : ""
            }`}
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
