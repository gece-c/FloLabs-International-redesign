import { SectionShell } from "@/components/section-shell";

export default function AboutPage() {
  return (
    <>
      <SectionShell
        eyebrow="About Us"
        title="FloLabs Innovations Group"
        description="A FloLabs company focused on innovation in AI and robotics."
      >
        <div className="space-y-4 max-w-4xl text-base leading-7 text-muted">
          <p>
            FloLabs Innovations Group is an incubator launching innovative
            projects in AI and Robotics. We enhance learning and project
            outcomes through teamwork, idea sharing, and innovative methods
            like brainstorming and LLM automation, preparing students with
            practical skills.
          </p>
          <p>
            We provide students, career changers, and professionals with a remote, unique, powerful, and immersive
            hands-on educational experience where they learn what they will use in the real world. We are not just a school, we are a community of learners who are passionate about learning and growing.
          </p>
        </div>
      </SectionShell>

      <SectionShell eyebrow="Objectives" title="What We Aim to Deliver">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            "Experiential Learning: Unique and immersive educational training with hands-on, real world experience.",
            "Practical Experience: Work on innovative, marketable projects with real-world impact.",
          ].map((item) => (
            <article
              key={item}
              className="glass-card rounded-2xl border p-5 text-sm leading-6 text-muted"
            >
              {item}
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Mission"
        title="Inspire, Empower, and Build the Future"
      >
        <div className="space-y-4 max-w-4xl text-base leading-7 text-muted">
          <p>
            Inspire and empower individuals through transformative educational
            experiences that foster global perspectives, innovative thinking,
            and practical skills.
          </p>
          <p>
            We aim to cultivate a culture of curiosity and creativity, create
            jobs of the future, and build innovative solutions for a rapidly
            changing world.
          </p>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Methodology"
        title="Helping People Learn Better"
        description="Our methodology is to foster collaboration and creativity."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {[
            "Recorded Meetings: We record and transcribe every meeting so you can review information when necessary.",
            "Brainwriting Exercises: Brain writing is an exercise to help the brain get into a creative and productive state.",
            "Advanced AI Tools: Language Learning Models help automate workflow, brainstorm, and advise work production.",
            "Collaborative Learning: We teach each other and learn together through peer support, shared practice, and active teamwork.",
          ].map((item) => (
            <article
              key={item}
              className="glass-card rounded-2xl border p-5 text-sm leading-6 text-muted"
            >
              {item}
            </article>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
