import { SectionShell } from "@/components/section-shell";

export default function AboutPage() {
  return (
    <>
      <SectionShell
        eyebrow="About Us"
        title="FloLabs Innovations Group"
        description="A FloLabs company focused on innovation in AI and robotics."
      >
        <p className="max-w-4xl text-base leading-7 text-muted">
          FloLabs Innovations Group is an incubator launching innovative
          projects in AI and Robotics. We enhance learning and project outcomes
          through teamwork, idea sharing, and innovative methods like
          brainstorming and LLM automation, preparing students with practical
          skills.
        </p>
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
            "Industry Experts: Mentorship and guidance is provided through participants, advisors, and partners.",
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
