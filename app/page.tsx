import { HomePageProjectsCarousel } from "@/components/home-page-projects-carousel";
import { HomeScene } from "@/components/home-scene";
import { HomeSceneCtaLink } from "@/components/home-scene-cta-link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { methodology, projects, verticals } from "@/lib/site-data";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=2400`;

export default function Home() {
  const featuredProjects = projects.slice(0, 5);
  const featuredNames = featuredProjects.map((p) => p.name).join(", ");
  const methodologyLine = methodology
    .map((item) => item.toLowerCase())
    .join(", ");

  return (
    <>
      <HomeScene
        id="home"
        headline="Advanced AI and robotics for the next generation"
        description="FloLabs International is an incubator launching ambitious projects across AI and robotics, pairing experiential learning with real venture execution."
        imageSrc={unsplash("photo-1451187580459-43490279c0fa")}
        imageAlt="Earth at night from orbit, city lights and atmosphere visible"
        cta={{ href: "/internships", label: "Start your journey" }}
        priority
      />

      <HomeScene
        id="recruited"
        headline="Get recruited today"
        description="Join the FloLabs family and grow through hands-on programs in AI and robotics. We look for curious builders who want real-world experience, mentorship, and momentum."
        imageSrc={unsplash("photo-1522071820081-009f0129c71c")}
        imageAlt="Team collaborating together at a table"
        cta={{ href: "/internships", label: "Apply now" }}
      />

      <HomeScene
        id="projects"
        headline="Explore our projects"
        description={`From ${featuredNames} to a growing portfolio of ventures, we ship products, platforms, and research initiatives that connect learning to launch.`}
        imageSrc={unsplash("photo-1460925895917-afdab827c52f")}
        imageAlt="Laptop on a desk showing charts and analytics"
      >
        <ScrollReveal className="w-full" delay={140} threshold={0.08}>
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
                className="rounded-lg border border-white/15 bg-black/40 p-4 shadow-lg shadow-black/25 backdrop-blur-sm sm:p-5"
              >
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white sm:text-sm">
                  {v.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/85 sm:text-base">{v.text}</p>
              </div>
            ))}
          </div>
        }
        imageSrc={unsplash("photo-1454165804606-c3d57bc86b40")}
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
        imageSrc={unsplash("photo-1434030216411-0b793f4b4173")}
        imageAlt="Open notebook and pen on a desk"
        cta={{ href: "/blogs", label: "Read the latest" }}
      />

      <HomeScene
        headline="Built for flexibility and momentum"
        description="Flexibility for busy schedules, affordable pathways, future-facing opportunities in AI and robotics, and expertise shared across teams, so learning stays practical and within reach."
        imageSrc={unsplash("photo-1507679799987-c73779587ccf")}
        imageAlt="Professional looking toward a bright horizon"
        cta={{ href: "/internships", label: "See programs" }}
      />

      <HomeScene
        headline="Collaboration is our methodology"
        description={`We foster creativity through ${methodologyLine}, so meetings become reusable knowledge, ideas move faster, and execution stays grounded in real builds.`}
        imageSrc={unsplash("photo-1531482615713-2afd69097998")}
        imageAlt="Team meeting with people discussing ideas"
        cta={{ href: "/about", label: "Discover how we work" }}
      />
    </>
  );
}
