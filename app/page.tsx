import Link from "next/link";
import { SectionShell } from "@/components/section-shell";
import { projects } from "@/lib/site-data";

export default function Home() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <>
      <SectionShell
        id="home"
        eyebrow="FloLabs International"
        title="Advanced AI and Robotics Program"
      >
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          Get Recruited Today
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-7 text-muted">
          Join the FloLabs family and kickstart your career in AI and robotic
          technologies. We are on a mission to bring the world together with the
          latest trends in AI and robotics. We are looking for individuals who
          are hungry for more growth in their experience and knowledge. Gain the
          experience you desire by applying with us on the programs page.
        </p>
      </SectionShell>

      <SectionShell
        id="projects"
        eyebrow="Our Projects"
        title="Explore a few of our most exciting projects."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <article key={project.slug} className="glass-card rounded-2xl border p-5 sm:p-6">
              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{project.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-4 inline-flex min-h-10 items-center text-sm font-semibold text-accent hover:text-primary"
              >
                Learn More →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-6 flex">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            Explore All Projects
          </Link>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Ambitious Innovative Projects"
        title="Enjoy collaborating with other thoughtful professionals that are passionate about bringing a vision to life!"
      >
        <p className="text-base leading-7 text-muted">
          We offer experiential learning, a unique and immersive educational
          training program with hands-on, real world experience.
        </p>
        <p className="mt-4 text-base leading-7 text-muted">
          FloLabs Innovations Group is an incubator launching innovative
          projects in AI and Robotics. We enhance learning and project outcomes
          through teamwork, idea sharing, and innovative methods like
          brainstorming and LLM automation, preparing students with practical
          skills.
        </p>
      </SectionShell>

      <SectionShell
        eyebrow="Our Verticals"
        title="We focus on four main verticals in our expertise."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article className="glass-card rounded-2xl border p-5">
            <h3 className="text-xl font-semibold text-foreground">Education</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Experiential learning through cutting-edge programs and
              internships that equip students with real-world skills to thrive
              in a global and dynamic economy.
            </p>
          </article>
          <article className="glass-card rounded-2xl border p-5">
            <h3 className="text-xl font-semibold text-foreground">Healthcare</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Empowering healthcare innovation with AI-driven insights,
              advancing global well-being through smarter diagnostics and
              personalized care solutions.
            </p>
          </article>
          <article className="glass-card rounded-2xl border p-5">
            <h3 className="text-xl font-semibold text-foreground">Travel</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Revolutionizing travel with a personalized, AI-powered travel
              platform and chatbot that creates unforgettable experiences
              tailored to your unique journey.
            </p>
          </article>
          <article className="glass-card rounded-2xl border p-5">
            <h3 className="text-xl font-semibold text-foreground">Space</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Expanding the boundaries of innovation with AI solutions for space
              exploration, education, research, and sustainable development in
              the space sector.
            </p>
          </article>
        </div>
      </SectionShell>

      <SectionShell eyebrow="Long Live Learning">
        <p className="text-base leading-7 text-muted">
          Learn about the latest trends in technology. We are learning about the
          future of AI, robotics, education, and so much more. Every day is a
          great day to learn and we want to continuously learn and we expand.
        </p>
        <p className="mt-4 text-base leading-7 text-muted">
          FloLabs Innovations Group wants to prepare you for your own journey in
          your career. We help you learn the way you want to learn so you can
          achieve your goals of getting to the next level.
        </p>
      </SectionShell>

      <SectionShell eyebrow="Our Benefits">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article className="glass-card rounded-2xl border p-5">
            <h3 className="text-xl font-semibold text-foreground">Flexibility</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              We offer you the flexibility you need to complete your tasks. We
              know you have a busy schedule and we offer you the ability to work
              at your own pace on your own time.
            </p>
          </article>
          <article className="glass-card rounded-2xl border p-5">
            <h3 className="text-xl font-semibold text-foreground">
              Affordability
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              We can provide the learning experience needed for your success
              without breaking the bank.
            </p>
          </article>
          <article className="glass-card rounded-2xl border p-5">
            <h3 className="text-xl font-semibold text-foreground">
              Opportunities
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              We focus on AI and robotic technologies because this is the future
              for humanity. The opportunities here will lead you to greater
              opportunities of the future. We want to see you succeed in
              creating better technology for the future.
            </p>
          </article>
          <article className="glass-card rounded-2xl border p-5">
            <h3 className="text-xl font-semibold text-foreground">Expertise</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Learn with us as we discover the latest trends in AI and robotics.
              We want you to learn and know the best technologies available as
              we improve the world around us technologically.
            </p>
          </article>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="HELPING PEOPLE LEARN BETTER."
        title="Our methodology is to foster collaboration and creativity."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <article className="glass-card rounded-xl border p-4">
            <h3 className="text-base font-semibold text-foreground">
              Recorded Meetings
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              We record and transcribe every meeting so you can easily review
              information when necessary.
            </p>
          </article>
          <article className="glass-card rounded-xl border p-4">
            <h3 className="text-base font-semibold text-foreground">
              Brainwriting Exercises
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Brain writing is an exercise to help the brain get into a creative
              and productive state.
            </p>
          </article>
          <article className="glass-card rounded-xl border p-4">
            <h3 className="text-base font-semibold text-foreground">
              Advanced AI Tools
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Language Learning Models (LLMs) help automate workflow,
              brainstorm and advise work production.
            </p>
          </article>
          <article className="glass-card rounded-xl border p-4">
            <h3 className="text-base font-semibold text-foreground">
              Industry Experts
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Mentorship and guidance is provided through a variety of
              participants, advisors, and partners.
            </p>
          </article>
          <article className="glass-card rounded-xl border p-4">
            <h3 className="text-base font-semibold text-foreground">
              Hands-on Projects
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              We work on interesting AI projects that create a better future for
              humanity.
            </p>
          </article>
        </div>
      </SectionShell>
    </>
  );
}
