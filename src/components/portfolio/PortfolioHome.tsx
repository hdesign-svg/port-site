"use client";

import { Fragment, useEffect, useState } from "react";

import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import {
  PORTFOLIO_HERO_REVEAL_COUNT,
  portfolioRevealStyle,
} from "@/components/portfolio/portfolioReveal";
import {
  PortfolioLightbox,
  type LightboxState,
} from "@/components/portfolio/PortfolioLightbox";
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

        {projects.map((project, index) => {
          const revealBase = PORTFOLIO_HERO_REVEAL_COUNT + index * 2;

          return (
            <Fragment key={project.id}>
              <hr
                className="portfolio__divider portfolio__reveal"
                style={portfolioRevealStyle(revealBase)}
              />
              <div
                className="portfolio__reveal"
                style={portfolioRevealStyle(revealBase + 1)}
              >
                <PortfolioProject
                  project={project}
                  dimmed={!projectMatchesFilter(project, filter)}
                  activeSourceId={lightbox?.sourceId ?? null}
                  onImageClick={(image, origin, sourceId) =>
                    setLightbox({ image, origin, sourceId })
                  }
                />
              </div>
            </Fragment>
          );
        })}
      </main>

      <PortfolioLightbox state={lightbox} onClose={() => setLightbox(null)} />

      <DockAnchor>
        <Dock filter={filter} onFilterChange={setFilter} />
      </DockAnchor>
    </>
  );
}
