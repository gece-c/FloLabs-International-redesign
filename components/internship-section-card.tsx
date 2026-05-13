import type { ReactNode } from "react";

type InternshipSectionCardProps = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

export function InternshipSectionCard({ title, children, className }: InternshipSectionCardProps) {
  return (
    <article
      className={`glass-card flex h-full flex-col rounded-xl border p-5 sm:p-6 ${className ?? ""}`}
    >
      <h2 className="mb-4 text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="flex-1 text-base leading-7 text-muted">{children}</div>
    </article>
  );
}
