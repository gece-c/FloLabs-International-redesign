import { HomePageProjectsCarousel } from "@/components/home-page-projects-carousel";
import { HomeScene } from "@/components/home-scene";
import { HomeSceneCtaLink } from "@/components/home-scene-cta-link";
import { projectPanelHeroShellClass } from "@/components/project-panel";
import { ScrollReveal } from "@/components/scroll-reveal";
import { methodology, projects, verticals } from "@/lib/site-data";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=2400`;

const homepageBg = (filename: string) => `/homepage/${filename}`;

export default function Home() {
  const featuredProjects = projects.slice(0, 5);
  const featuredNames = featuredProjects.map((p) => p.name).join(", ");
  const methodologyLine = methodology
    .map((item) => item.title.toLowerCase())
    .join(", ");

  return (
    <>
      <HomeScene
        id="home"
        headline="Advanced AI and robotics for the next generation"
        description="FloLabs International is an incubator launching ambitious projects across AI and robotics, pairing experiential learning with real venture execution."
        imageSrc={homepageBg("hero-advanced.jpg")}
        imageAlt="Advanced AI and robotics at FloLabs International"
        cta={{ href: "/internships", label: "Start your journey" }}
        priority
      />

      <HomeScene
        id="recruited"
        headline="Get recruited today"
        description="Join the FloLabs family and grow through hands-on programs in AI and robotics. We look for curious builders who want real-world experience, mentorship, and momentum."
        imageSrc={homepageBg("recruited.jpg")}
        imageAlt="Join the FloLabs team and get recruited"
        cta={{ href: "/internships", label: "Apply now" }}
      />

      <HomeScene
        id="projects"
        headline="Explore our projects"
        description={`From ${featuredNames} to a growing portfolio of ventures, we ship products, platforms, and research initiatives that connect learning to launch.`}
        imageSrc={homepageBg("projects.jpg")}
        imageAlt="FloLabs International project portfolio showcase"
      >
        <ScrollReveal className="w-full" delay={140} threshold={0.08} fade={false}>
          <HomePageProjectsCarousel projects={featuredProjects} />
          <div className="mt-9">
            <HomeSceneCtaLink href="/projects" label="View all projects" />
          </div>
        </ScrollReveal>
      </HomeScene>

      <HomeScene
        headline="Ambitious, innovative collaboration"
        description="We offer experiential learning: immersive training with real projects, teamwork, and modern workflows. FloLabs Innovations Group incubates ideas through collaboration, brainstorming, and practical AI tooling."
        imageSrc={unsplash("photo-1485827404703-89b55fcc595e")}
        imageAlt="Robotic arm and technology workshop environment"
        cta={{ href: "/about", label: "Learn more" }}
      />

      <HomeScene
        wideDescription
        headline="Our verticals"
        description={
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {verticals.map((v) => (
              <div
                key={v.title}
                className={`${projectPanelHeroShellClass} px-5 py-5 sm:px-6 sm:py-6`}
              >
                <h3 className="text-base font-semibold uppercase leading-snug tracking-[0.2em] text-foreground dark:text-white [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm font-normal leading-relaxed text-muted dark:text-white/82 [font-family:var(--font-inter),Arial,Helvetica,sans-serif]">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        }
        imageSrc={homepageBg("verticals.png")}
        imageAlt="Planning documents and laptop on a wooden desk"
        cta={{ href: "/about", label: "About FloLabs" }}
      />

      <HomeScene
        headline="Long live learning"
        description={
          <>
            <p>
              Learn about the latest trends in technology. We are learning about the future of AI,
              robotics, education, and so much more. Every day is a great day to learn, and we want to
              keep learning and expanding.
            </p>
            <p>
              FloLabs Innovations Group wants to prepare you for your own journey in your career. We
              help you learn in the ways that work for you so you can achieve your goals and reach the
              next level.
            </p>
          </>
        }
        imageSrc={homepageBg("long-live-learning.jpg")}
        imageAlt="Open notebook and pen on a desk"
        cta={{ href: "/blogs", label: "Read the latest" }}
      />

      <HomeScene
        headline="Built for flexibility and momentum"
        description="Flexibility for busy schedules, affordable pathways, future-facing opportunities in AI and robotics, and expertise shared across teams, so learning stays practical and within reach."
        imageSrc={homepageBg("flexibility.jpg")}
        imageAlt="Flexible learning pathways in AI and robotics"
        cta={{ href: "/internships", label: "See programs" }}
      />

      <HomeScene
        headline="Collaboration is our methodology"
        description={`We foster creativity through ${methodologyLine}, so meetings become reusable knowledge, ideas move faster, and execution stays grounded in real builds.`}
        imageSrc={homepageBg("momentum.jpg")}
        imageAlt="Collaborative team building momentum on real projects"
        cta={{ href: "/about", label: "Discover how we work" }}
      />
    </>
  );
}
