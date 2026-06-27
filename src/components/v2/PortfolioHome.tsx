"use client";

import { useEffect, useState } from "react";

import { PortfolioHero } from "@/components/v2/PortfolioHero";
import { PortfolioProject } from "@/components/v2/PortfolioProject";
import {
  Dock,
  DockAnchor,
  dockScrollBehavior,
  type DockFilter,
} from "@/design-system/components/Dock";
import { projects, projectMatchesFilter } from "@/data/projects";

export function PortfolioHome() {
  const [filter, setFilter] = useState<DockFilter>("all");

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
      <main className="portfolio-v2__main">
        <PortfolioHero />
        {projects.map((project) => (
          <PortfolioProject
            key={project.id}
            project={project}
            dimmed={!projectMatchesFilter(project, filter)}
          />
        ))}
      </main>

      <DockAnchor>
        <Dock filter={filter} onFilterChange={setFilter} />
      </DockAnchor>
    </>
  );
}
