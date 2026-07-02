"use client";

import { Fragment, useEffect, useState } from "react";

import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioLightbox, type LightboxState } from "@/components/portfolio/PortfolioLightbox";
import { PortfolioProject } from "@/components/portfolio/PortfolioProject";
import {
  Dock,
  DockAnchor,
  dockScrollBehavior,
  type DockFilter,
} from "@/design-system/components/Dock";
import { projects, projectMatchesFilter } from "@/data/projects";

export function PortfolioHome() {
  const [filter, setFilter] = useState<DockFilter>("all");
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    if (filter === "all") {
      return;
    }

    const first = projects.find((project) => projectMatchesFilter(project, filter));

    if (!first) {
      return;
    }

    const target = document.getElementById(first.id);
    target?.scrollIntoView({
      behavior: dockScrollBehavior(),
      block: "start",
    });
  }, [filter]);

  return (
    <>
      <main className="portfolio__main">
        <PortfolioHero />

        {projects.map((project) => (
          <Fragment key={project.id}>
            <hr className="portfolio__divider" />
            <PortfolioProject
              project={project}
              dimmed={!projectMatchesFilter(project, filter)}
              onImageClick={(image, origin) => setLightbox({ image, origin })}
            />
          </Fragment>
        ))}
      </main>

      <PortfolioLightbox state={lightbox} onClose={() => setLightbox(null)} />

      <DockAnchor>
        <Dock filter={filter} onFilterChange={setFilter} />
      </DockAnchor>
    </>
  );
}
