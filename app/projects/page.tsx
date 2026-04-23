import Link from "next/link";
import { SectionShell } from "@/components/section-shell";
import { projects } from "@/lib/site-data";

export default function ProjectsPage() {
  return (
    <SectionShell
      eyebrow="Projects"
      title="AI and Robotics Initiatives"
      description="Explore our current projects across emotional intelligence, wearables, design, and travel."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="text-xl font-semibold text-foreground">
              {project.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>
            <Link
              href={`/projects/${project.slug}`}
              className="mt-5 inline-flex min-h-10 items-center text-sm font-semibold text-accent hover:text-primary"
            >
              Open project →
            </Link>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
