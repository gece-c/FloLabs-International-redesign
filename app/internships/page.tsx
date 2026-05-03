import Link from "next/link";
import { opportunityPages } from "@/lib/site-data";

export default function OpportunitiesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Opportunities
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-muted sm:text-lg">
          Opportunities are currently focused on internship-based pathways across technical and
          non-technical fields.
        </p>
      </section>

      <section aria-label="Opportunity categories" className="grid gap-4 md:grid-cols-2">
        {opportunityPages.map((item) => (
          <article
            key={item.slug}
            className="glass-card flex h-full flex-col rounded-2xl border p-5 sm:p-6"
          >
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{item.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-muted sm:text-base">{item.summary}</p>
            <Link
              href={`/internships/${item.slug}`}
              className="mt-6 inline-flex min-h-11 items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              {item.ctaLabel}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
