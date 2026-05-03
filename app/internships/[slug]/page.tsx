import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { HubSpotForm } from "@/components/hubspot-form";
import { getInternship } from "@/lib/strapi";

export const revalidate = 60;

function statusBadgeClass(status: string) {
  if (status === "Open") return "bg-green-500/15 text-green-300";
  if (status === "Closed" || status === "Filled") return "bg-rose-500/15 text-rose-300";
  return "bg-amber-500/15 text-amber-300";
}

export default async function InternshipDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "internships") {
    redirect("/internships");
  }

  const internship = await getInternship(slug);
  if (!internship) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <p className="mb-2">
        <Link
          href="/internships"
          className="inline-flex min-h-10 items-center text-sm font-semibold text-muted transition hover:text-primary"
        >
          ← All internship positions
        </Link>
      </p>

      <section className="glass-card rounded-2xl border p-6 sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {internship.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(internship.status)}`}
          >
            {internship.status}
          </span>
          {internship.location ? (
            <span className="text-sm text-muted">{internship.location}</span>
          ) : null}
        </div>
        <div className="mt-4 space-y-1 text-sm text-muted">
          {internship.company ? <p>{internship.company}</p> : null}
          {internship.duration || internship.schedule ? (
            <p>{[internship.duration, internship.schedule].filter(Boolean).join(" · ")}</p>
          ) : null}
        </div>
        {internship.summary ? (
          <p className="mt-6 text-base leading-7 text-muted">{internship.summary}</p>
        ) : null}
        {internship.description ? (
          <div className="mt-6 whitespace-pre-wrap text-base leading-7 text-muted">
            {internship.description}
          </div>
        ) : null}
      </section>

      <section className="glass-card rounded-2xl border p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">Apply</h2>
        <p className="mt-2 text-sm text-muted">
          Complete the form below or reach out via our contact page.
        </p>
        <div className="mt-6 rounded-xl border border-border bg-card p-4 sm:p-6">
          {internship.hubspotFormId ? (
            <HubSpotForm formId={internship.hubspotFormId} />
          ) : (
            <p className="text-sm text-muted">No application form is linked to this role yet.</p>
          )}
        </div>
        <div className="mt-6">
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
