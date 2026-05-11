import { HomeScene } from "@/components/home-scene";
import { methodology, projects, verticals } from "@/lib/site-data";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=2400`;

export default function Home() {
  const featuredProjects = projects.slice(0, 4);
  const featuredNames = featuredProjects.map((p) => p.name).join(", ");
  const verticalTitles = verticals.map((v) => v.title).join(", ");
  const methodologyLine = methodology
    .map((item) => item.toLowerCase())
    .join(", ");

  return (
    <>
      <HomeScene
        id="home"
        headline="Advanced AI and robotics for the next generation"
        description="FloLabs International is an incubator launching ambitious projects across AI and robotics—pairing experiential learning with real venture execution."
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
        cta={{ href: "/projects", label: "View all projects" }}
      />

      <HomeScene
        headline="Ambitious, innovative collaboration"
        description="We offer experiential learning—immersive training with real projects, teamwork, and modern workflows. FloLabs Innovations Group incubates ideas through collaboration, brainstorming, and practical AI tooling."
        imageSrc={unsplash("photo-1485827404703-89b55fcc595e")}
        imageAlt="Robotic arm and technology workshop environment"
        cta={{ href: "/about", label: "Learn more" }}
      />

      <HomeScene
        headline="Our verticals"
        description={`We focus on four pillars—${verticalTitles}—so teams can go deep in education, healthcare, travel, and space-related innovation with clear outcomes.`}
        imageSrc={unsplash("photo-1454165804606-c3d57bc86b40")}
        imageAlt="Planning documents and laptop on a wooden desk"
        cta={{ href: "/about", label: "About FloLabs" }}
      />

      <HomeScene
        headline="Long live learning"
        description="We study the future of AI, robotics, and education—and we build while we learn. FloLabs helps you progress on your own path with practical skills and supportive collaboration."
        imageSrc={unsplash("photo-1434030216411-0b793f4b4173")}
        imageAlt="Open notebook and pen on a desk"
        cta={{ href: "/blogs", label: "Read the latest" }}
      />

      <HomeScene
        headline="Built for flexibility and momentum"
        description="Flexibility for busy schedules, affordable pathways, future-facing opportunities in AI and robotics, and expertise shared across teams—so learning stays practical and within reach."
        imageSrc={unsplash("photo-1507679799987-c73779587ccf")}
        imageAlt="Professional looking toward a bright horizon"
        cta={{ href: "/internships", label: "See programs" }}
      />

      <HomeScene
        headline="Collaboration is our methodology"
        description={`We foster creativity through ${methodologyLine}—so meetings become reusable knowledge, ideas move faster, and execution stays grounded in real builds.`}
        imageSrc={unsplash("photo-1531482615713-2afd69097998")}
        imageAlt="Team meeting with people discussing ideas"
        cta={{ href: "/about", label: "Discover how we work" }}
      />
    </>
  );
}
