import Image from "next/image";
import Link from "next/link";

export type HomeSceneCta = {
  href: string;
  label: string;
};

type HomeSceneProps = {
  id?: string;
  headline: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  cta?: HomeSceneCta;
  priority?: boolean;
};

export function HomeScene({
  id,
  headline,
  description,
  imageSrc,
  imageAlt,
  cta,
  priority = false,
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
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-6xl items-start px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
        <div className="max-w-xl lg:max-w-2xl">
          <h2 className="text-[1.65rem] font-semibold uppercase leading-[1.08] tracking-[0.14em] text-white sm:text-3xl sm:tracking-[0.16em] lg:text-4xl [font-family:var(--font-display),var(--font-geist-sans),sans-serif]">
            {headline}
          </h2>
          <p className="mt-6 text-base font-normal leading-relaxed text-white/88 sm:text-lg">
            {description}
          </p>
          {cta ? (
            <div className="mt-9">
              <Link
                href={cta.href}
                className="inline-flex min-h-11 items-center border border-white/90 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition duration-200 hover:bg-white hover:text-black"
              >
                <span>{cta.label}</span>
                <span aria-hidden className="ml-2 translate-y-px text-sm font-normal">
                  →
                </span>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
