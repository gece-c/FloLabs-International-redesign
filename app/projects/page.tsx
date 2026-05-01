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
            className="glass-card rounded-2xl border p-6"
          >
            {project.logoPath ? (
              <div className="mb-4 h-16 w-full">
                <img
                  src={project.logoPath}
                  alt={`${project.name} logo`}
                  className="block !h-full !w-full object-contain object-left opacity-85"
                  loading="lazy"
                />
              </div>
            ) : null}
            <h2 className="text-xl font-semibold text-foreground">
              {project.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>
            <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              {project.siteUrl ? (
                <Link
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-foreground/90 shadow-[0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition hover:bg-white/15 hover:text-foreground"
                >
                  ↗ Visit site
                </Link>
              ) : (
                <span />
              )}
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex min-h-10 items-center text-sm font-semibold text-accent hover:text-primary"
              >
                Open project →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
