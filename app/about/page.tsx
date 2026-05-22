import { AboutHero } from "@/components/about/about-hero";
import { AboutInnovationsSection } from "@/components/about/about-innovations-section";
import { AboutMethodologySection } from "@/components/about/about-methodology-section";
import { AboutMissionSection } from "@/components/about/about-mission-section";
import { AboutWhatWeAimSection } from "@/components/about/about-what-we-aim-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | FloLabs International",
  description:
    "A FloLabs company focused on innovation in AI and robotics. FloLabs Innovations Group is an incubator launching innovative projects in AI and Robotics.",
};

export default function AboutPage() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="projects-scene-bg pointer-events-none fixed inset-0 -z-10"
      />
      <AboutHero />
      <AboutInnovationsSection />
      <AboutWhatWeAimSection />
      <AboutMissionSection />
      <AboutMethodologySection />
    </div>
  );
}
