import Image from "next/image";
import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="grid gap-8 rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-lg shadow-primary-100/40 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-4">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary-500">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-600">
            {index + 1}
          </span>
          {project.period}
        </span>
        <h3 className="font-display text-2xl font-bold text-slate-900">{project.title}</h3>
        <p className="text-sm text-slate-600">{project.subtitle}</p>
        <div className="flex flex-wrap gap-2 text-[13px] text-primary-600">
          {project.stacks.map((stack) => (
            <span key={stack} className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1">
              {stack}
            </span>
          ))}
        </div>
        {project.highlight && (
          <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-accent">
            {project.highlight}
          </div>
        )}
        <div className="grid gap-3 text-sm text-slate-600">
          <SectionList title="주요 기여" items={project.roles} />
          <SectionList title="문제 상황" items={project.problems} variant="muted" />
          <SectionList title="해결 접근" items={project.solutions} />
          <SectionList title="성과" items={project.achievements} variant="accent" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {project.images.map((image) => (
            <figure key={image.src} className={styles.figure}>
              <Image
                src={image.src}
                alt={image.alt}
                width={560}
                height={320}
                className="h-full w-full rounded-2xl object-cover"
              />
              <figcaption className="text-xs text-slate-500">{image.title}</figcaption>
            </figure>
          ))}
        </div>
        <p className="text-xs text-slate-500">{project.organization}</p>
      </div>
    </article>
  );
}

type SectionListProps = {
  title: string;
  items: string[];
  variant?: "default" | "muted" | "accent";
};

function SectionList({ title, items, variant = "default" }: SectionListProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-primary-500">{title}</p>
      <ul className={`mt-2 space-y-2 text-sm leading-relaxed ${styles[variant]}`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
