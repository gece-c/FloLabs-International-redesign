import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionShell } from "@/components/section-shell";
import { projects } from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <SectionShell
      eyebrow="Project Detail"
      title={project.name}
      description={project.summary}
    >
      <div className="glass-card rounded-2xl border p-6">
        <h2 className="text-base font-semibold uppercase tracking-[0.15em] text-primary dark:text-accent">
          What Project Is
        </h2>
        <p className="mt-4 text-sm leading-6 text-muted dark:text-foreground/85">
          {project.whatProjectIs}
        </p>
      </div>

      <div className="glass-card mt-6 rounded-2xl border p-6">
        <h2 className="text-base font-semibold uppercase tracking-[0.15em] text-primary dark:text-accent">
          Current Work
        </h2>
        <p className="mt-4 text-sm leading-6 text-muted dark:text-foreground/85">
          {project.currentWork}
        </p>
      </div>

      {project.focus && project.focus.length > 0 ? (
        <div className="glass-card mt-6 rounded-2xl border p-6">
          <h2 className="text-base font-semibold uppercase tracking-[0.15em] text-primary dark:text-accent">
            Focus
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted dark:text-foreground/85">
            {project.focus.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {project.siteUrl ? (
        <div className="mt-6">
          <Link
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            Visit Site →
          </Link>
        </div>
      ) : null}

      <div className="mt-8">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
        >
          Back to projects
        </Link>
      </div>
    </SectionShell>
  );
}
