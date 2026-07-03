import Image from "next/image";
import { useEffect, useState } from "react";

import { PortfolioCopy } from "@/components/portfolio/PortfolioCopy";
import type { LightboxOrigin } from "@/components/portfolio/PortfolioLightbox";
import type {
  MockupDevice,
  Project,
  ProjectImage,
} from "@/data/projects";

/** Lightbox is enabled from the tablet breakpoint up (matches 3-up phone grid). */
const LIGHTBOX_MIN_WIDTH = "(min-width: 48rem)";

function useLightboxEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(LIGHTBOX_MIN_WIDTH);
    const update = () => setEnabled(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return enabled;
}

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
  activeSourceId?: string | null;
  onImageClick: (
    image: ProjectImage,
    origin: LightboxOrigin,
    sourceId: string,
  ) => void;
};

function PortfolioShot({
  image,
  sourceId,
  hidden,
  onImageClick,
  interactive,
}: {
  image: ProjectImage;
  sourceId: string;
  hidden: boolean;
  onImageClick: (
    image: ProjectImage,
    origin: LightboxOrigin,
    sourceId: string,
  ) => void;
  interactive: boolean;
}) {
  const device = mockupDevice(image);
  const shotClasses = [
    "portfolio__shot",
    `portfolio__shot--${device}`,
    hidden ? "portfolio__shot--lifted" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const frame = (
    <span className={`portfolio__shot-frame portfolio__shot-frame--${device}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-contain object-top"
        sizes={
          device === "desktop"
            ? "(min-width: 48rem) 58rem, 100vw"
            : "(min-width: 48rem) 19rem, 100vw"
        }
      />
    </span>
  );

  if (!interactive) {
    return <figure className={shotClasses}>{frame}</figure>;
  }

  return (
    <button
      type="button"
      className={shotClasses}
      onClick={(event) => {
        const target = event.currentTarget.querySelector(".portfolio__shot-frame");
        const rect = target?.getBoundingClientRect();

        if (!rect) {
          return;
        }

        onImageClick(
          image,
          {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          },
          sourceId,
        );
      }}
      aria-label={`View larger: ${image.alt}`}
    >
      {frame}
    </button>
  );
}

export function PortfolioProject({
  project,
  activeSourceId = null,
  onImageClick,
}: PortfolioProjectProps) {
  const lightboxEnabled = useLightboxEnabled();
  const mediaBlocks = groupProjectMedia(project.images);

  return (
    <section id={project.id} className="portfolio__section portfolio__project">
      <div className="portfolio__section-inner">
        <div className="portfolio__copy">
          <h2 className="ds-type-lg">{project.title}</h2>

          <div className="portfolio__prose">
            <div className="ds-type-stack">
              {project.description.map((paragraph) => (
                <p key={paragraph} className="ds-type-md">
                  <PortfolioCopy text={paragraph} />
                </p>
              ))}
            </div>
          </div>
        </div>

        {mediaBlocks.length > 0 ? (
          <div
            className="portfolio__media"
            aria-label={`${project.title} work samples`}
          >
            {mediaBlocks.map((block, blockIndex) => {
              if (block.type === "desktop") {
                const sourceId = `${project.id}:${blockIndex}:0`;

                return (
                  <PortfolioShot
                    key={sourceId}
                    image={block.image}
                    sourceId={sourceId}
                    hidden={activeSourceId === sourceId}
                    onImageClick={onImageClick}
                    interactive={lightboxEnabled}
                  />
                );
              }

              return (
                <div
                  key={`phone-row-${blockIndex}`}
                  className="portfolio__phone-grid"
                >
                  {block.images.map((image, imageIndex) => {
                    const sourceId = `${project.id}:${blockIndex}:${imageIndex}`;

                    return (
                      <PortfolioShot
                        key={sourceId}
                        image={image}
                        sourceId={sourceId}
                        hidden={activeSourceId === sourceId}
                        onImageClick={onImageClick}
                        interactive={lightboxEnabled}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
