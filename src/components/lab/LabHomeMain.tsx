"use client";

import { useEffect, useState } from "react";
import { LabHero } from "@/components/lab/LabHero";
import { LabProject } from "@/components/lab/LabProject";
import { PageBackdrop, type BackdropVariant } from "@/components/lab/PageBackdrop";
import { projects } from "@/data/projects";

function backdropFromParam(bg: string | null): BackdropVariant {
  if (
    bg === "none" ||
    bg === "margin-grid" ||
    bg === "hero-wash" ||
    bg === "noise" ||
    bg === "dots"
  ) {
    return bg;
  }
  return "none";
}

type LabHomeMainProps = {
  variant: BackdropVariant;
};

export function LabHomeMain({ variant }: LabHomeMainProps) {
  return (
    <PageBackdrop variant={variant}>
      <main>
        {variant === "hero-wash" ? (
          <div className="hero-wash-band">
            <LabHero />
          </div>
        ) : (
          <LabHero />
        )}

        {projects.map((project) => (
          <LabProject key={project.id} project={project} />
        ))}
      </main>
    </PageBackdrop>
  );
}

export function LabHomeMainFromQuery() {
  const [variant, setVariant] = useState<BackdropVariant>("none");

  useEffect(() => {
    setVariant(
      backdropFromParam(new URLSearchParams(window.location.search).get("bg")),
    );
  }, []);

  return <LabHomeMain variant={variant} />;
}
