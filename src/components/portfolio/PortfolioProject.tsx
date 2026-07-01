import Image from "next/image";

import type { LightboxOrigin } from "@/components/portfolio/PortfolioLightbox";
import type {
  MockupDevice,
  Project,
  ProjectImage,
} from "@/data/projects";

function mockupDevice(image: ProjectImage): MockupDevice {
  return image.device === "desktop" ? "desktop" : "phone";
}

function mockupClass(image: ProjectImage) {
  return `portfolio__mockup portfolio__mockup--${mockupDevice(image)}`;
}

function mockupScreenClass(image: ProjectImage) {
  return `portfolio__mockup-screen portfolio__mockup-screen--${mockupDevice(image)}`;
}

type PortfolioProjectProps = {
  project: Project;
  dimmed?: boolean;
  onImageClick: (image: ProjectImage, origin: LightboxOrigin) => void;
};

export function PortfolioProject({
  project,
  dimmed = false,
  onImageClick,
}: PortfolioProjectProps) {
  const classes = ["portfolio__row", "portfolio__project"];
  if (dimmed) {
    classes.push("portfolio__project--dimmed");
  }

  return (
    <section id={project.id} className={classes.join(" ")}>
      <div className="portfolio__project-meta">
        <div className="portfolio__meta-row">
          <h2 className="ds-type-strong">{project.title}</h2>
          <p className="ds-type-strong ds-type-tabular">{project.year}</p>
        </div>
        <p className="ds-type-subtle">
          {project.company} · {project.domain}
        </p>
      </div>

      <div className="portfolio__prose">
        <div className="ds-type-stack">
          {project.description.map((paragraph) => (
            <p key={paragraph} className="ds-type-body">
              {paragraph}
            </p>
          ))}
        </div>
        <ul className="portfolio__outcomes ds-type-muted">
          {project.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </div>

      <div className="portfolio__mockups">
        {project.images.map((image, imageIndex) => (
          <button
            key={`${image.src}-${imageIndex}`}
            type="button"
            className={mockupClass(image)}
            onClick={(event) => {
              const screen = event.currentTarget.querySelector(
                ".portfolio__mockup-screen",
              );
              const rect = screen?.getBoundingClientRect();

              if (!rect) {
                return;
              }

              onImageClick(image, {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
              });
            }}
            aria-label={`View larger: ${image.alt}`}
          >
            <div className={mockupScreenClass(image)}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={
                  mockupDevice(image) === "desktop"
                    ? "object-contain object-top"
                    : "object-cover object-top"
                }
                sizes={
                  mockupDevice(image) === "desktop"
                    ? "(min-width: 64rem) 80rem, 100vw"
                    : "(min-width: 40rem) 28rem, 50vw"
                }
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
