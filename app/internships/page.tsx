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

function sortInternships(list: Internship[]) {
  return [...list].sort((a, b) => {
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
      <section className="glass-card rounded-2xl border p-6 text-center sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Internship positions
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          Browse open roles across engineering, science, design, marketing, QA, business, and
          operations.
        </p>
        {internships.length > 0 && openCount > 0 ? (
          <p className="mt-4 text-sm font-semibold text-primary">
            {openCount} open {openCount === 1 ? "role" : "roles"}
            {internships.length > openCount ? ` · ${internships.length} listings` : null}
          </p>
        ) : null}
      </section>

      {internships.length === 0 ? (
        <p className="text-center text-muted">No internships available at the moment.</p>
      ) : (
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Internship listings">
          {internships.map((item) => (
            <article
              key={String(item.id)}
              className="glass-card flex h-full flex-col rounded-xl border p-5 sm:p-6"
            >
              <h2 className="text-xl font-semibold leading-tight text-foreground sm:text-2xl">
                {item.title}
              </h2>
              <div className="mt-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(item.status)}`}
                >
                  {item.status}
                </span>
              </div>
              <div className="mt-4 space-y-1 text-sm text-muted">
                {item.company ? <p>{item.company}</p> : null}
                {item.location ? <p>{item.location}</p> : null}
              </div>
              {item.summary ? (
                <p className="mt-4 text-sm leading-6 text-muted">{item.summary}</p>
              ) : null}
              <div className="mt-auto pt-6">
                <Link
                  href={`/internships/${item.slug}`}
                  className="inline-flex min-h-10 items-center text-sm font-semibold text-accent hover:text-primary"
                >
                  More details →
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
