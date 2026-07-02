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

type MediaBlock =
  | { type: "desktop"; image: ProjectImage }
  | { type: "phone-row"; images: ProjectImage[] };

function groupProjectMedia(images: ProjectImage[]): MediaBlock[] {
  const blocks: MediaBlock[] = [];
  let phoneBuffer: ProjectImage[] = [];

  const flushPhones = () => {
    if (phoneBuffer.length === 0) {
      return;
    }

    blocks.push({ type: "phone-row", images: [...phoneBuffer] });
    phoneBuffer = [];
  };

  for (const image of images) {
    if (mockupDevice(image) === "desktop") {
      flushPhones();
      blocks.push({ type: "desktop", image });
      continue;
    }

    phoneBuffer.push(image);
  }

  flushPhones();
  return blocks;
}

type PortfolioProjectProps = {
  project: Project;
  dimmed?: boolean;
  onImageClick: (image: ProjectImage, origin: LightboxOrigin) => void;
};

function PortfolioShot({
  image,
  onImageClick,
}: {
  image: ProjectImage;
  onImageClick: (image: ProjectImage, origin: LightboxOrigin) => void;
}) {
  const device = mockupDevice(image);

  return (
    <button
      type="button"
      className={`portfolio__shot portfolio__shot--${device}`}
      onClick={(event) => {
        const frame = event.currentTarget.querySelector(".portfolio__shot-frame");
        const rect = frame?.getBoundingClientRect();

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
      <span className={`portfolio__shot-frame portfolio__shot-frame--${device}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-contain object-top"
          sizes={
            device === "desktop"
              ? "(min-width: 48rem) 52rem, 100vw"
              : "(min-width: 48rem) 16rem, 100vw"
          }
        />
      </span>
    </button>
  );
}

export function PortfolioProject({
  project,
  dimmed = false,
  onImageClick,
}: PortfolioProjectProps) {
  const mediaBlocks = groupProjectMedia(project.images);
  const classes = ["portfolio__section", "portfolio__project"];

  if (dimmed) {
    classes.push("portfolio__project--dimmed");
  }

  return (
    <section id={project.id} className={classes.join(" ")}>
      <div className="portfolio__section-inner">
        <div className="portfolio__copy">
          <h2 className="ds-type-lg">{project.title}</h2>

          <div className="portfolio__prose">
            <div className="ds-type-stack">
              {project.description.map((paragraph) => (
                <p key={paragraph} className="ds-type-md">
                  {paragraph}
                </p>
              ))}
            </div>
            <ul className="portfolio__outcomes ds-type-md">
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>
        </div>

        {mediaBlocks.length > 0 ? (
          <div
            className="portfolio__media"
            aria-label={`${project.title} work samples`}
          >
            {mediaBlocks.map((block, blockIndex) => {
              if (block.type === "desktop") {
                return (
                  <PortfolioShot
                    key={`${block.image.src}-desktop-${blockIndex}`}
                    image={block.image}
                    onImageClick={onImageClick}
                  />
                );
              }

              return (
                <div
                  key={`phone-row-${blockIndex}`}
                  className="portfolio__phone-grid"
                >
                  {block.images.map((image, imageIndex) => (
                    <PortfolioShot
                      key={`${image.src}-${blockIndex}-${imageIndex}`}
                      image={image}
                      onImageClick={onImageClick}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
