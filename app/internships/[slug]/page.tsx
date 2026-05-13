import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { HubSpotForm } from "@/components/hubspot-form";
import { InternshipSectionCard } from "@/components/internship-section-card";
import {
  isParsedInternshipDescriptionEmpty,
  parseInternshipContent,
  splitWhyJoinItem,
} from "@/lib/internship-description";
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

  const parsed = parseInternshipContent(internship.description);
  const useStructuredBody =
    internship.description && !isParsedInternshipDescriptionEmpty(parsed);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <p className="mb-2">
        <Link
          href="/internships"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs font-semibold text-muted transition hover:border-primary/45 hover:bg-card hover:text-primary"
        >
          <span aria-hidden className="text-primary/90">
            ←
          </span>
          All internship positions
        </Link>
      </p>

      <section
        aria-labelledby="internship-detail-title"
        className="glass-card relative overflow-hidden rounded-2xl border p-6 text-left sm:p-10 md:p-12"
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

        <div className="relative z-[1] max-w-4xl">
          <h1
            id="internship-detail-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {internship.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span
              className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(internship.status)}`}
            >
              {internship.status}
            </span>
            {internship.location ? (
              <>
                <span
                  className="size-1 shrink-0 rounded-full bg-primary/35 ring-1 ring-muted/25"
                  aria-hidden
                />
                <span className="min-w-0 truncate text-xs text-muted opacity-90">
                  {internship.location}
                </span>
              </>
            ) : null}
          </div>

          <div className="mt-4 space-y-1 text-sm text-muted">
            {internship.company ? <p>{internship.company}</p> : null}
            {internship.duration || internship.schedule ? (
              <p>{[internship.duration, internship.schedule].filter(Boolean).join(" · ")}</p>
            ) : null}
          </div>

          {internship.summary ? (
            <p className="mt-6 text-pretty text-base leading-7 text-muted">{internship.summary}</p>
          ) : null}
        </div>
      </section>

      {useStructuredBody ? (
        <div className="space-y-6">
          {parsed.overview.length > 0 ? (
            <InternshipSectionCard title="Overview">
              <div className="space-y-4">
                {parsed.overview.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </InternshipSectionCard>
          ) : null}

          {parsed.responsibilities.length > 0 ? (
            <InternshipSectionCard title="Key responsibilities">
              <ul className="list-inside list-disc space-y-2">
                {parsed.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </InternshipSectionCard>
          ) : null}

          {parsed.qualifications.length > 0 ? (
            <InternshipSectionCard title="Qualifications and skills">
              <ul className="list-inside list-disc space-y-2">
                {parsed.qualifications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </InternshipSectionCard>
          ) : null}

          {parsed.whyJoinUs.length > 0 ? (
            <InternshipSectionCard title="Why join us?">
              <div className="space-y-6">
                {parsed.whyJoinUs.map((item, index) => {
                  const entry = splitWhyJoinItem(item);
                  return (
                    <div key={index}>
                      {entry.title ? (
                        <>
                          <p className="mb-2 font-semibold text-foreground">{entry.title}</p>
                          <p>{entry.description}</p>
                        </>
                      ) : (
                        <p>{entry.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </InternshipSectionCard>
          ) : null}
        </div>
      ) : internship.description ? (
        <section className="glass-card rounded-2xl border p-6 sm:p-8" aria-label="Role description">
          <div className="whitespace-pre-wrap text-base leading-7 text-muted">
            {internship.description}
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="internship-apply-title"
        className="glass-card relative overflow-hidden rounded-2xl border px-6 py-10 text-center sm:px-10 sm:py-12"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 16%, color-mix(in srgb, var(--primary) 12%, transparent), transparent 46%), radial-gradient(circle at 86% 82%, color-mix(in srgb, var(--secondary) 10%, transparent), transparent 44%)",
        }}
      >
        <div className="relative z-[1]">
          <h2
            id="internship-apply-title"
            className="text-2xl font-bold text-primary md:text-3xl"
          >
            Apply for this position
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Ready to join the team? Complete the application form below.
          </p>

          <div className="mt-8 rounded-2xl border border-border/80 bg-card/80 p-5 shadow-sm backdrop-blur-sm sm:p-7">
            {internship.hubspotFormId ? (
              <HubSpotForm key={internship.slug} formId={internship.hubspotFormId} />
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
        </div>
      </section>
    </div>
  );
}
