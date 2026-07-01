"use client";

import { useState } from "react";

import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioLightbox, type LightboxState } from "@/components/portfolio/PortfolioLightbox";
import { PortfolioProject } from "@/components/portfolio/PortfolioProject";
import { projects } from "@/data/projects";

export function PortfolioHome() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  return (
    <>
      <main className="portfolio__main">
        <PortfolioHero />

        {projects.map((project) => (
          <PortfolioProject
            key={project.id}
            project={project}
            onImageClick={(image, origin) => setLightbox({ image, origin })}
          />
        ))}
      </main>

      <PortfolioLightbox state={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
