"use client";

import { useEffect, useMemo, useState } from "react";

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
import { PortfolioTestimonials } from "@/components/portfolio/PortfolioTestimonials";
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

  const visibleProjects = useMemo(
    () => projects.filter((project) => projectMatchesFilter(project, filter)),
    [filter],
  );

  const filterStatus = useMemo(() => {
    const count = visibleProjects.length;
    const noun = count === 1 ? "project" : "projects";
    if (filter === "all") {
      return `Showing all ${count} ${noun}`;
    }
    return `Showing ${count} ${filter} ${noun}`;
  }, [filter, visibleProjects.length]);

  useEffect(() => {
    if (filter === "all" || visibleProjects.length === 0) {
      return;
    }

    const first = visibleProjects[0];

    if (!first) {
      return;
    }

    const target = document.getElementById(first.id);
    target?.scrollIntoView({
      behavior: dockScrollBehavior(),
      block: "start",
    });
  }, [filter, visibleProjects]);

  return (
    <>
      <main className="portfolio__main">
        <PortfolioHero />

        {/* Hero → case studies */}
        <hr
          className="portfolio__divider portfolio__reveal"
          style={portfolioRevealStyle(PORTFOLIO_HERO_REVEAL_COUNT)}
        />

        {visibleProjects.map((project) => {
          const projectIndex = projects.findIndex((entry) => entry.id === project.id);
          const revealBase =
            PORTFOLIO_HERO_REVEAL_COUNT + 1 + Math.max(projectIndex, 0);

          return (
            <div
              key={project.id}
              className="portfolio__project-block portfolio__reveal"
              style={portfolioRevealStyle(revealBase)}
            >
              <PortfolioProject
                project={project}
                activeSourceId={lightbox?.sourceId ?? null}
                onImageClick={(image, origin, sourceId) =>
                  setLightbox({ image, origin, sourceId })
                }
              />
            </div>
          );
        })}

        {/* Case studies → testimonials */}
        <hr
          className="portfolio__divider portfolio__reveal"
          style={portfolioRevealStyle(
            PORTFOLIO_HERO_REVEAL_COUNT + 1 + visibleProjects.length,
          )}
        />

        <PortfolioTestimonials
          revealOffset={PORTFOLIO_HERO_REVEAL_COUNT + 2 + visibleProjects.length}
        />
      </main>

      <PortfolioLightbox state={lightbox} onClose={() => setLightbox(null)} />

      <p className="portfolio__sr-status" role="status" aria-live="polite">
        {filterStatus}
      </p>

      <DockAnchor>
        <Dock
          filter={filter}
          onFilterChange={setFilter}
          endorsementsTargetId="testimonials"
        />
      </DockAnchor>
    </>
  );
}
