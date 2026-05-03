import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { HubSpotForm } from "@/components/hubspot-form";
import { getInternship } from "@/lib/strapi";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ParsedInternshipContent = {
  overview: string[];
  responsibilities: string[];
  qualifications: string[];
  whyJoinUs: string[];
};

export const revalidate = 60;

function ContentSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="glass-card rounded-2xl border p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const normalizeText = (value: string) => value.replace(/\r/g, "").replace(/\u00A0/g, " ").trim();

const cleanItem = (value: string) =>
  normalizeText(value)
    .replace(/^[-\u2022\u25CF\u25A0\u25AA\u25E6]+\s*/, "")
    .trim();

const isOverviewHeading = (value: string) => /^overview$/i.test(value);
const isResponsibilitiesHeading = (value: string) => /^key responsibilities$/i.test(value);
const isQualificationsHeading = (value: string) =>
  /^qualifications and skills$/i.test(value) || /^qualifications\s*&\s*skills$/i.test(value);
const isWhyJoinUsHeading = (value: string) => /^why join us\??$/i.test(value);

function parseInternshipContent(raw?: string): ParsedInternshipContent {
  const result: ParsedInternshipContent = {
    overview: [],
    responsibilities: [],
    qualifications: [],
    whyJoinUs: [],
  };

  if (!raw) return result;

  const blocks = raw
    .split(/\n\s*\n+/)
    .map(normalizeText)
    .filter(Boolean);

  let currentSection: keyof ParsedInternshipContent = "overview";

  for (const block of blocks) {
    if (isOverviewHeading(block)) {
      currentSection = "overview";
      continue;
    }

    if (isResponsibilitiesHeading(block)) {
      currentSection = "responsibilities";
      continue;
    }

    if (isQualificationsHeading(block)) {
      currentSection = "qualifications";
      continue;
    }

    if (isWhyJoinUsHeading(block)) {
      currentSection = "whyJoinUs";
      continue;
    }

    result[currentSection].push(cleanItem(block));
  }

  return result;
}

function splitWhyJoinItem(item: string) {
  const cleaned = cleanItem(item);
  const match = cleaned.match(/^([^:]+):\s*(.+)$/);

  if (!match) {
    return {
      title: "",
      description: cleaned,
    };
  }

  return {
    title: `${match[1].trim()}:`,
    description: match[2].trim(),
  };
}

function statusBadgeClass(status: string) {
  if (status === "Open") {
    return "bg-green-500/15 text-green-300";
  }
  if (status === "Closed" || status === "Filled") {
    return "bg-rose-500/15 text-rose-300";
  }
  return "bg-amber-500/15 text-amber-300";
}

export default async function InternshipDataDetailPage(props: PageProps) {
  const { slug } = await props.params;

  const internship = await getInternship(slug);

  if (!internship) {
    notFound();
  }

  const parsed = parseInternshipContent(internship.description);

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

      <section
        aria-labelledby="internship-detail-title"
        className="glass-card relative overflow-hidden rounded-2xl border px-6 py-8 text-left sm:px-10 sm:py-10 md:px-12 md:py-12"
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
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
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
                  className="size-1 shrink-0 rounded-full bg-primary/35 ring-1 ring-muted/30"
                  aria-hidden
                />
                <span className="min-w-0 truncate text-xs font-normal text-muted opacity-90">
                  {internship.location}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {parsed.overview.length > 0 ? (
        <ContentSection title="Overview">
          <div className="space-y-4 text-muted">
            {parsed.overview.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </ContentSection>
      ) : null}

      {parsed.responsibilities.length > 0 ? (
        <ContentSection title="Key responsibilities">
          <ul className="list-inside list-disc space-y-2 text-muted">
            {parsed.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </ContentSection>
      ) : null}

      {parsed.qualifications.length > 0 ? (
        <ContentSection title="Qualifications and skills">
          <ul className="list-inside list-disc space-y-2 text-muted">
            {parsed.qualifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </ContentSection>
      ) : null}

      {parsed.whyJoinUs.length > 0 ? (
        <ContentSection title="Why join us?">
          <div className="space-y-6 text-muted">
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
        </ContentSection>
      ) : null}

      <section
        aria-labelledby="internship-apply-title"
        className="glass-card rounded-2xl border p-6 text-center sm:p-10"
      >
        <h2
          id="internship-apply-title"
          className="text-xl font-bold text-primary sm:text-2xl md:text-3xl"
        >
          Apply for this position
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          Ready to join the team? Complete the application form below.
        </p>

        <div className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-7">
          {internship.hubspotFormId ? (
            <HubSpotForm formId={internship.hubspotFormId} />
          ) : (
            <p className="text-sm text-muted">The application form is not available yet.</p>
          )}
        </div>

        <div className="mt-6">
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
