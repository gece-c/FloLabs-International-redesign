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
  imageSrc: string;
  imageAlt: string;
  cta?: HomeSceneCta;
  /** Rendered below the intro copy (e.g. project rail + CTA). */
  children?: ReactNode;
  priority?: boolean;
  /** Use full content width for rich blocks (e.g. pillar cards) instead of the narrow intro column. */
  wideDescription?: boolean;
};

export function HomeScene({
  id,
  headline,
  description,
  imageSrc,
  imageAlt,
  cta,
  children,
  priority = false,
  wideDescription = false,
}: HomeSceneProps) {
  return (
    <section
      id={id}
      className="relative min-h-[100dvh] w-full overflow-hidden border-b border-white/10"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/70"
      />
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
        <ScrollReveal
          className={
            wideDescription
              ? "w-full max-w-5xl shrink-0 lg:max-w-6xl"
              : "max-w-xl shrink-0 lg:max-w-2xl"
          }
        >
          <h2 className="text-[1.65rem] font-semibold uppercase leading-[1.08] tracking-[0.14em] text-white sm:text-3xl sm:tracking-[0.16em] lg:text-4xl [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
            {headline}
          </h2>
          <div className="mt-6 space-y-4 text-base font-normal leading-relaxed text-white/88 sm:text-lg">
            {typeof description === "string" ? <p>{description}</p> : description}
          </div>
          {cta ? (
            <div className="mt-9">
              <HomeSceneCtaLink href={cta.href} label={cta.label} />
            </div>
          ) : null}
        </ScrollReveal>
        {children ? (
          <div className="mt-10 w-full min-w-0 shrink-0 lg:mt-12">{children}</div>
        ) : null}
      </div>
    </section>
  );
}
