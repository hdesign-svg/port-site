import Image from "next/image";

import type { Project, ProjectImage } from "@/data/projects";

function mockupScreenClass(image: ProjectImage) {
  return image.device === "desktop"
    ? "mockup-frame__screen mockup-frame__screen--desktop"
    : "mockup-frame__screen mockup-frame__screen--phone";
}

type PortfolioProjectProps = {
  project: Project;
  dimmed?: boolean;
};

export function PortfolioProject({ project, dimmed = false }: PortfolioProjectProps) {
  const classes = ["portfolio-v2__project"];
  if (dimmed) {
    classes.push("portfolio-v2__project--dimmed");
  }

  return (
    <section id={project.id} className={classes.join(" ")}>
      <div className="portfolio-v2__copy">
        <div className="ds-type-stack--loose ds-type-stack">
          <p className="ds-type-meta">
            {project.company} · {project.year}
          </p>
          <h2 className="ds-type-strong">{project.title}</h2>
          <div className="ds-type-stack">
            {project.description.map((paragraph) => (
              <p key={paragraph} className="ds-type-body">
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="ds-type-body" style={{ margin: 0, paddingLeft: "1.25em" }}>
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="portfolio-v2__mockups">
        {project.images.map((image, imageIndex) => (
          <div
            key={`${image.src}-${imageIndex}`}
            className="mockup-frame bg-surface"
          >
            <div className={mockupScreenClass(image)}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={
                  image.device === "desktop"
                    ? "object-contain object-top"
                    : "object-cover object-top"
                }
                sizes={
                  image.device === "desktop"
                    ? "(min-width: 768px) 760px, 100vw"
                    : "210px"
                }
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
