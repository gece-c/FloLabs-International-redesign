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
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-base font-semibold uppercase tracking-[0.15em] text-secondary">
          What Project Is
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
          {project.details.map((detail) => (
            <li key={detail}>• {detail}</li>
          ))}
        </ul>
      </div>
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
