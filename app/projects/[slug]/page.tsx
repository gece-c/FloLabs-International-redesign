import { notFound } from "next/navigation";
import { HomeScene } from "@/components/home-scene";
import {
  ProjectDetailExitLink,
  ProjectPanel,
  ProjectVisitSiteLink,
} from "@/components/project-panel";
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
    <HomeScene
      id={`project-${project.slug}`}
      background="gradient"
      boldHeadline
      headline={project.name}
      description={project.summary}
      logoSrc={project.logoPath}
      logoAlt={`${project.name} logo`}
      centerContent
      headerAside={<ProjectDetailExitLink href="/projects" />}
    >
      <div className="flex w-full max-w-3xl flex-col gap-4 text-left md:gap-5">
        <ProjectPanel title="What Project Is">
          <p>{project.whatProjectIs}</p>
        </ProjectPanel>

        <ProjectPanel title="Current Work">
          <p>{project.currentWork}</p>
        </ProjectPanel>

        {project.focus && project.focus.length > 0 ? (
          <ProjectPanel title="Focus">
            <ul className="space-y-3">
              {project.focus.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </ProjectPanel>
        ) : null}

        {project.siteUrl ? (
          <div className="pt-1">
            <ProjectVisitSiteLink href={project.siteUrl} />
          </div>
        ) : null}
      </div>
    </HomeScene>
  );
}
