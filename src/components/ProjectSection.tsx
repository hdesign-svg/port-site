import type { Project } from "@/data/projects";
import { ProjectCarousel } from "@/components/ProjectCarousel";

type ProjectSectionProps = {
  project: Project;
};

export function ProjectSection({ project }: ProjectSectionProps) {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
        <div className="w-full shrink-0 lg:w-[260px]">
          <h2 className="text-sm font-medium leading-5 text-fg">
            {project.title}
          </h2>
          <p className="mt-0.5 text-xs leading-5 text-fg-muted">
            {project.company} • {project.year}
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-col gap-3 text-sm leading-5 text-fg">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="list-disc text-[13px] text-fg-muted">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="ms-[19.5px]">
                <span className="leading-5">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ProjectCarousel images={project.images} />
    </section>
  );
}
