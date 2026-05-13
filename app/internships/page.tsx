import Link from "next/link";
import { getAllInternships, type Internship } from "@/lib/strapi";

export const revalidate = 60;

function statusBadgeClass(status: string) {
  if (status === "Open") return "bg-green-500/15 text-green-300";
  if (status === "Closed" || status === "Filled") return "bg-rose-500/15 text-rose-300";
  return "bg-amber-500/15 text-amber-300";
}

const statusPriority: Record<string, number> = {
  Open: 0,
  "Closing Soon": 1,
  Pending: 2,
  Closed: 3,
  Filled: 3,
};

type SafeInternship = Internship & { title: string; slug: string };

function sortInternships(list: Internship[]): SafeInternship[] {
  return [...list]
    .filter((item): item is SafeInternship => Boolean(item.title?.trim() && item.slug?.trim()))
    .sort((a, b) => {
      const ap = statusPriority[a.status] ?? 99;
      const bp = statusPriority[b.status] ?? 99;
      if (ap !== bp) return ap - bp;
      return a.title.localeCompare(b.title);
    });
}

export default async function InternshipsListPage() {
  const internships = sortInternships(await getAllInternships());
  const openCount = internships.filter((i) => i.status === "Open").length;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <section
        aria-labelledby="internships-hero-title"
        className="glass-card relative overflow-hidden rounded-2xl border px-6 py-10 text-center sm:px-10 sm:py-12 md:px-14 md:py-14"
        style={{
          backgroundImage:
            "radial-gradient(circle at 88% 12%, color-mix(in srgb, var(--secondary) 20%, transparent), transparent 38%), radial-gradient(circle at 12% 88%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 42%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(120deg, transparent 0%, color-mix(in srgb, var(--foreground) 4%, transparent) 45%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative z-[1] mx-auto max-w-3xl">
          <h1 id="internships-hero-title" className="text-balance">
            <span className="block text-[clamp(2.05rem,5.2vw+0.7rem,3.25rem)] leading-[1.08] text-foreground">
              Internship
            </span>
            <span
              className="block text-[clamp(2.3rem,6vw+0.8rem,3.9rem)] leading-[1.05] font-bold text-primary [font-family:var(--font-display)]"
            >
              Positions
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Browse open roles from industry partners, compare what fits your skills, and apply to
            roles that <strong className="font-semibold text-foreground">accelerate your tech career.</strong>
          </p>

          {internships.length > 0 ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {openCount > 0 ? (
                <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm">
                  <span className="relative flex h-2 w-2 shrink-0 rounded-full bg-green-400" aria-hidden>
                    <span className="absolute inset-0 rounded-full bg-green-400 opacity-40 motion-safe:animate-ping" />
                  </span>
                  <span>
                    <span className="font-semibold text-primary">{openCount}</span>
                    {openCount === 1 ? " role" : " roles"} open now
                    {openCount < internships.length ? (
                      <span className="text-muted">
                        {" "}
                        · {internships.length} listing{internships.length === 1 ? "" : "s"}
                      </span>
                    ) : null}
                  </span>
                </p>
              ) : (
                <p className="inline-flex items-center rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted backdrop-blur-sm">
                  {internships.length} active listing{internships.length === 1 ? "" : "s"}
                </p>
              )}
            </div>
          ) : null}
        </div>
      </section>

      {internships.length === 0 ? (
        <section
          className="glass-card rounded-2xl border p-10 text-center"
          aria-live="polite"
        >
          <p className="text-muted">No internships available at the moment.</p>
        </section>
      ) : (
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Internship listings">
          {internships.map((item) => (
            <article key={String(item.id)} className="h-full min-h-0">
              <Link
                href={`/internships/${item.slug}`}
                className="group glass-card flex h-full min-h-[12rem] flex-col rounded-xl border p-5 transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_28%,transparent),0_12px_40px_-16px_rgba(0,0,0,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-6 dark:hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_28%,transparent),0_12px_40px_-16px_rgba(0,0,0,0.55)]"
                aria-labelledby={`internship-card-${item.id}`}
              >
                <h2
                  id={`internship-card-${item.id}`}
                  className="text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl"
                >
                  {item.title}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span
                    className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(item.status)}`}
                  >
                    {item.status}
                  </span>
                  {item.location ? (
                    <>
                      <span
                        className="size-1 shrink-0 rounded-full bg-primary/35 ring-1 ring-muted/20"
                        aria-hidden
                      />
                      <span className="min-w-0 truncate text-xs text-muted opacity-80">
                        {item.location}
                      </span>
                    </>
                  ) : null}
                </div>

                <div className="mt-3 space-y-1 text-sm text-muted">
                  {item.company ? <p className="truncate">{item.company}</p> : null}
                </div>

                {item.summary ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{item.summary}</p>
                ) : null}

                <span className="mt-auto block w-full pt-6">
                  <span className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition-[color,background-color,border-color,gap] group-hover:border-primary group-hover:bg-primary group-hover:text-white group-hover:gap-3">
                    View role
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </span>
              </Link>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
