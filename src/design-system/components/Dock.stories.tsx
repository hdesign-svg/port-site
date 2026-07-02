import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect, useState } from "react";

import {
  Dock,
  DockAnchor,
  dockScrollBehavior,
  type DockFilter,
} from "./Dock";

const meta = {
  title: "Portfolio/Dock",
  component: Dock,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dock>;

export default meta;
type Story = StoryObj<typeof meta>;

type DemoProject = {
  id: string;
  title: string;
  platform: "mobile" | "web";
  company: string;
};

const DEMO_PROJECTS: DemoProject[] = [
  {
    id: "hcp-activation",
    title: "HCP Money Activation",
    platform: "web",
    company: "Housecall Pro",
  },
  {
    id: "basic-accounting",
    title: "Basic Accounting",
    platform: "web",
    company: "Housecall Pro",
  },
  {
    id: "concierge-conversations",
    title: "Concierge Conversations",
    platform: "mobile",
    company: "Mad Mobile",
  },
  {
    id: "concierge-ai",
    title: "Concierge AI",
    platform: "mobile",
    company: "Mad Mobile",
  },
  {
    id: "concierge-platform",
    title: "Concierge Platform",
    platform: "mobile",
    company: "Mad Mobile",
  },
];

function MockupBlock() {
  return (
    <div
      aria-hidden
      style={{
        minHeight: "16rem",
        borderRadius: "var(--ds-radius-md)",
        border: "1px solid var(--ds-border)",
        background:
          "linear-gradient(155deg in srgb, var(--ds-surface-raised) 0%, var(--ds-bg-subtle) 45%, var(--ds-surface) 100%)",
        boxShadow: "var(--ds-shadow-raised)",
      }}
    />
  );
}

function projectMatchesFilter(
  platform: DemoProject["platform"],
  filter: DockFilter,
) {
  return filter === "all" || platform === filter;
}

function DockDemoPage({ initialScroll = 0 }: { initialScroll?: number }) {
  const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);
  const [filter, setFilter] = useState<DockFilter>("all");

  useEffect(() => {
    if (!scrollRoot || initialScroll <= 0) {
      return;
    }

    scrollRoot.scrollTop = initialScroll;
  }, [scrollRoot, initialScroll]);

  useEffect(() => {
    if (!scrollRoot || filter === "all") {
      return;
    }

    const first = DEMO_PROJECTS.find((project) => project.platform === filter);
    if (!first) {
      return;
    }

    const target = scrollRoot.querySelector<HTMLElement>(`#${first.id}`);
    target?.scrollIntoView({
      behavior: dockScrollBehavior(),
      block: "start",
    });
  }, [filter, scrollRoot]);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        ref={setScrollRoot}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "clamp(1.5rem, 4vw, 3rem)",
          paddingBottom: "var(--ds-dock-content-clearance)",
        }}
      >
        <header
          className="ds-type-stack"
          style={{ marginBottom: "var(--ds-type-gap)", maxWidth: "38ch" }}
        >
          <p className="ds-type-lg">Harry Howe</p>
          <p className="ds-type-md ds-type--muted">Product Designer</p>
          <p className="ds-type-md">
            Scroll to fill the progress ring. Filter dims non-matching work and
            scrolls the first match into view.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gap: "var(--ds-type-gap)",
          }}
        >
          {DEMO_PROJECTS.map((project) => {
            const matches = projectMatchesFilter(project.platform, filter);

            return (
              <section
                key={project.id}
                id={project.id}
                className={`ds-dock-story__project${matches ? "" : " ds-dock-story__project--dimmed"}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 22rem) minmax(0, 1fr)",
                  gap: "clamp(1.5rem, 4vw, 3rem)",
                  alignItems: "start",
                  scrollMarginTop: "1.5rem",
                }}
              >
                <div className="ds-type-stack--loose ds-type-stack">
                  <p className="ds-type-sm">
                    {project.company} · 2025 · {project.platform}
                  </p>
                  <p className="ds-type-lg">{project.title}</p>
                  <p className="ds-type-md">
                    Project copy sits in the sticky column beside the mockup rail
                    on the live site.
                  </p>
                </div>
                <MockupBlock />
              </section>
            );
          })}
        </div>
      </div>

      <DockAnchor>
        <Dock
          filter={filter}
          onFilterChange={setFilter}
          scrollRoot={scrollRoot}
        />
      </DockAnchor>
    </div>
  );
}

export const Default: Story = {
  render: () => <DockDemoPage />,
  parameters: {
    docs: {
      description: {
        story:
          "Platform filter dock with text tabs and scroll-to-top.",
      },
    },
  },
};

export const Dark: Story = {
  render: () => <DockDemoPage />,
  globals: {
    theme: "dark",
  },
};

export const Mobile: Story = {
  render: () => <DockDemoPage />,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const ScrolledMidPage: Story = {
  render: () => <DockDemoPage initialScroll={480} />,
  parameters: {
    docs: {
      description: {
        story: "Progress ring partially filled; back-to-top active.",
      },
    },
  },
};

export const Static: Story = {
  parameters: {
    layout: "centered",
  },
  render: function StaticDock() {
    const [filter, setFilter] = useState<DockFilter>("mobile");

    return (
      <div
        className="ds-dock-anchor"
        style={{ position: "static", padding: 0 }}
      >
        <Dock filter={filter} onFilterChange={setFilter} />
      </div>
    );
  },
};
