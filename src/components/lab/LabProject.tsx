import Image from "next/image";
import type { Project } from "@/data/projects";
import { Label } from "@/components/lab/Label";

type LabProjectProps = {
  project: Project;
  index: number;
};

export function LabProject({ project, index }: LabProjectProps) {
  return (
    <section className="grid grid-cols-1 border-b border-border last:border-b-0 lg:grid-cols-[var(--rail-left)_1fr]">
      {/* Left cell — outer stretches full row height for divider; inner sticky */}
      <div className="border-b border-border lg:border-r lg:border-b-0">
        <div className="p-[1.5rlh] lg:sticky lg:top-[1.5rlh]">
          <p className="mb-[1rlh] text-fg-muted">
            {String(index + 1).padStart(2, "0")}
          </p>
          <Label>{project.title}</Label>
          <p className="mt-[0.5rlh] text-fg-muted">
            {project.company} · {project.year}
          </p>
          <div className="mt-[1.5rlh] [&_p:not(:last-child)]:mb-[1rlh]">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-[1rlh] list-disc text-fg-muted">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="ms-[1.5rlh]">
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right cell */}
      <div className="p-[1.5rlh]">
        <p className="mb-[1.5rlh] font-[550] text-fg-strong">
          Product design · {project.year}
        </p>

        <div className="flex flex-col gap-[1.5rlh]">
          {project.images.map((image, imageIndex) => (
            <div
              key={`${image.src}-${imageIndex}`}
              className="border border-border bg-surface p-[1.5rlh]"
            >
              <div className="relative mx-auto w-full max-w-[280px]">
                <div className="relative aspect-[210/477] w-full overflow-hidden">
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
