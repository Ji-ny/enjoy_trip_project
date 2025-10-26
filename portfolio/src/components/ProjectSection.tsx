import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./SectionHeader";

export function ProjectSection() {
  return (
    <section id="projects" className="space-y-8">
      <SectionHeader
        eyebrow="업무 프로젝트"
        title="데이터 기반 대시보드 & 반응형 서비스 경험"
        description="실제 사용자와 현장의 요구를 반영한 프로젝트를 중심으로 기획부터 UI/UX, 데이터 연동까지 전 과정을 주도한 사례들입니다."
      />
      <div className="space-y-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
