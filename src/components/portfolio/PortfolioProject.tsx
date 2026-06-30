import Image from "next/image";

import type { Project, ProjectImage } from "@/data/projects";

function mockupScreenClass(image: ProjectImage) {
  return image.device === "desktop"
    ? "portfolio__mockup-screen portfolio__mockup-screen--desktop"
    : "portfolio__mockup-screen portfolio__mockup-screen--phone";
}

type PortfolioProjectProps = {
  project: Project;
  dimmed?: boolean;
  onImageClick: (image: ProjectImage) => void;
};

export function PortfolioProject({
  project,
  dimmed = false,
  onImageClick,
}: PortfolioProjectProps) {
  const classes = ["portfolio-split", "portfolio__project"];
  if (dimmed) {
    classes.push("portfolio__project--dimmed");
  }

  return (
    <section id={project.id} className={classes.join(" ")}>
      <div className="portfolio__copy-col">
        <div className="portfolio__copy">
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
            <ul className="portfolio__outcomes">
              {project.outcomes.map((outcome) => (
                <li key={outcome} className="ds-type-body">
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="portfolio__media-col">
        <div className="portfolio__mockups">
          {project.images.map((image, imageIndex) => (
            <button
              key={`${image.src}-${imageIndex}`}
              type="button"
              className="portfolio__mockup"
              onClick={() => onImageClick(image)}
              aria-label={`View larger: ${image.alt}`}
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
                  sizes="(min-width: 64rem) 46vw, 100vw"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
