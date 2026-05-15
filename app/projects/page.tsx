import { HomeScene } from "@/components/home-scene";
import { ProjectCard } from "@/components/project-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { projects } from "@/lib/site-data";

export default function ProjectsPage() {
  return (
    <HomeScene
      id="projects"
      background="gradient"
      boldHeadline
      headline="AI and Robotics Initiatives"
      description="Explore our current projects across emotional intelligence, wearables, design, and travel."
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {projects.map((project, index) => (
          <ScrollReveal
            key={project.slug}
            className="h-full"
            duration={300}
            translateY={6}
            threshold={0.01}
            rootMargin="0px 0px 10% 0px"
          >
            <ProjectCard
              project={project}
              layout="grid"
              showExternalLink
              eagerImage={index < 2}
            />
          </ScrollReveal>
        ))}
      </div>
    </HomeScene>
  );
}
