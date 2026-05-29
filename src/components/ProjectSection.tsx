import type { Project } from "@/data/projects";
import { ProjectCarousel } from "@/components/ProjectCarousel";

type ProjectSectionProps = {
  project: Project;
};

export function ProjectSection({ project }: ProjectSectionProps) {
  return (
    <section className="flex flex-col gap-12 border-b border-border pb-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
        <div className="lg:w-1/2">
          <h2 className="text-[19px] font-medium leading-[30px] text-fg">
            {project.title}
          </h2>
          <p className="text-sm leading-[22px] text-fg-muted">
            {project.company} • {project.year}
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:w-1/2">
          {project.description.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-6 text-fg">
              {paragraph}
            </p>
          ))}
          <ul className="list-disc text-sm text-fg-muted">
            {project.outcomes.map((outcome, index) => (
              <li
                key={outcome}
                className={`ms-[21px] ${index === 0 ? "mb-0" : ""}`}
              >
                <span className="leading-[22px]">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ProjectCarousel images={project.images} />
    </section>
  );
}
