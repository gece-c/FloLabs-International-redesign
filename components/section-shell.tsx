import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
}: SectionShellProps) {
  const hasHeader = Boolean(eyebrow || title || description);

  return (
    <section id={id} className="border-t border-border/70 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {hasHeader ? (
          <div className="mb-8 max-w-3xl">
            {eyebrow ? (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary sm:text-base [font-family:var(--font-geist-sans)]">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
