import { CareerSection } from "@/components/CareerSection";
import { Hero } from "@/components/Hero";
import { ProjectSection } from "@/components/ProjectSection";
import { SkillSection } from "@/components/SkillSection";
import { SummarySection } from "@/components/SummarySection";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <SummarySection />
      <ProjectSection />
      <SkillSection />
      <CareerSection />
    </div>
  );
}
