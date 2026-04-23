import { SectionShell } from "@/components/section-shell";

export default function InternshipsPage() {
  return (
    <>
      <SectionShell
        eyebrow="Internships"
        title="Get Recruited Today"
        description="Join the FloLabs family and kickstart your career in AI and robotic technologies."
      >
        <p className="max-w-4xl text-base leading-7 text-muted">
          We are looking for individuals who are hungry for more growth in
          their experience and knowledge. Gain the experience you desire by
          applying with us on the programs page.
        </p>
      </SectionShell>

      <SectionShell
        eyebrow="Benefits"
        title="What You Get"
        description="A collaborative and practical learning experience."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {[
            "Flexibility: Work at your own pace and on your own schedule.",
            "Affordability: Access meaningful learning opportunities without breaking the bank.",
            "Opportunities: Focused growth in AI and robotics technologies.",
            "Expertise: Learn the latest technologies while solving real-world problems.",
          ].map((benefit) => (
            <article
              key={benefit}
              className="rounded-2xl border border-border bg-card p-5 text-sm leading-6 text-muted"
            >
              {benefit}
            </article>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
