import Image from "next/image";
import type { Project } from "@/data/projects";
import { Label } from "@/components/lab/Label";

type LabProjectProps = {
  project: Project;
};

export function LabProject({ project }: LabProjectProps) {
  return (
    <section className="grid grid-cols-1 border-b border-border last:border-b-0 lg:grid-cols-[var(--rail-left)_1fr]">
      {/* Left cell — outer stretches full row height for divider; inner sticky */}
      {/* Cell stretches to mockup row height; sticky child pins inside it */}
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
          <ul className="mt-[1rlh] list-inside list-disc">
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right cell — mockups */}
      <div className="px-[1.5rlh] pb-[1.5rlh] pt-[1.5rlh] lg:pt-10">
        <div className="flex flex-col gap-[1.5rlh]">
          {project.images.map((image, imageIndex) => (
            <div
              key={`${image.src}-${imageIndex}`}
              className="mockup-frame bg-surface p-[1.5rlh]"
            >
              <div className="relative mx-auto w-full max-w-[280px]">
                <div className="mockup-frame__screen relative aspect-[210/477] w-full overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-top"
                    sizes="280px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
