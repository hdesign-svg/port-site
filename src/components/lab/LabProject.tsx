import Image from "next/image";
import type { Project, ProjectImage } from "@/data/projects";
import { Label } from "@/components/lab/Label";

function mockupScreenClass(image: ProjectImage) {
  return image.device === "desktop"
    ? "mockup-frame__screen mockup-frame__screen--desktop"
    : "mockup-frame__screen mockup-frame__screen--phone";
}

type LabProjectProps = {
  project: Project;
};

export function LabProject({ project }: LabProjectProps) {
  return (
    <section className="grid grid-cols-1 border-b border-border last:border-b-0 lg:grid-cols-[var(--rail-left)_1fr]">
      <div className="border-b border-border pt-[1.5rlh] lg:border-r lg:border-b-0 lg:pt-10">
        <div className="px-[1.5rlh] pb-[1.5rlh] lg:sticky lg:top-10 lg:self-start lg:bg-bg">
          <div className="flex flex-col">
            <Label>{project.title}</Label>
            <p className="text-fg-muted">
              {project.company} · {project.year}
            </p>
          </div>
          <div className="mt-[0.75rlh] [&_p:not(:last-child)]:mb-[1rlh]">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-[1rlh] list-outside list-disc pl-[1.25em]">
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-[1.5rlh] pb-[1.5rlh] pt-[1.5rlh] lg:pt-10">
        <div className="flex flex-col gap-[1.5rlh]">
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
                      ? "(min-width: 1024px) 760px, 100vw"
                      : "210px"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
