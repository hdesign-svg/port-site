import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

const meta = {
  title: "Foundation/Typography",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Specimen({
  label,
  token,
  children,
}: {
  label: string;
  token: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        paddingBlock: "var(--ds-type-gap)",
        borderBottom: "1px solid var(--ds-rule)",
      }}
    >
      <p
        className="ds-type-sm"
        style={{ marginBottom: "var(--ds-type-gap-tight)" }}
      >
        {label}
        <span style={{ opacity: 0.65 }}> · {token}</span>
      </p>
      {children}
    </div>
  );
}

function GalleryPlaceholder({ style }: { style?: CSSProperties }) {
  return (
    <div
      aria-hidden
      style={{
        minHeight: "18rem",
        borderRadius: "var(--ds-radius-xl)",
        background: "var(--ds-bg-subtle)",
        ...style,
      }}
    />
  );
}

function TypographyPage() {
  return (
    <div style={{ maxWidth: "48rem", padding: "1.5rem 0 3rem" }}>
      <header
        className="ds-type-stack"
        style={{ marginBottom: "var(--ds-type-gap)" }}
      >
        <h1 className="ds-type-lg">Typography</h1>
        <p className="ds-type-md ds-type--muted">
          Geist Sans · 3 sizes (lg / md / sm) · muted modifier for secondary color.
          Toggle light/dark in the toolbar.
        </p>
      </header>

      <Specimen label="Large" token="ds-type-lg">
        <p className="ds-type-lg">Harry Howe</p>
      </Specimen>

      <Specimen label="Large muted" token="ds-type-lg ds-type--muted">
        <p className="ds-type-lg ds-type--muted">Role</p>
      </Specimen>

      <Specimen label="Medium muted" token="ds-type-md ds-type--muted">
        <p className="ds-type-md ds-type--muted">Product Designer</p>
      </Specimen>

      <Specimen label="Medium" token="ds-type-md">
        <p className="ds-type-md">
          My approach to craft starts with what&apos;s under the hood. I care
          deeply about creating the systems and models that shape a product and
          translating them into experiences people can understand and trust.
        </p>
      </Specimen>

      <Specimen label="Small" token="ds-type-sm">
        <p className="ds-type-sm">Dock tooltip label</p>
      </Specimen>

      <Specimen label="Text link" token="ds-text-link">
        <p style={{ margin: 0 }}>
          <a href="#linkedin" className="ds-text-link">
            LinkedIn
          </a>
          {" · "}
          <a href="#resume" className="ds-text-link">
            Resume
          </a>
        </p>
      </Specimen>

      <Specimen label="Identity block" token="ds-type-identity">
        <div className="ds-type-identity">
          <p className="ds-type-lg">Harry Howe</p>
          <p className="ds-type-md ds-type--muted">Product Designer</p>
        </div>
      </Specimen>

      <Specimen label="Case header" token="composed">
        <div className="ds-type-identity">
          <p className="ds-type-lg">Basic Accounting</p>
          <p className="ds-type-md ds-type--muted">Housecall Pro · Trades</p>
        </div>
      </Specimen>

      <Specimen label="Hero excerpt" token="ds-type-stack--sectioned">
        <div className="ds-type-stack--sectioned">
          <div className="ds-type-stack">
            <p className="ds-type-md">
              I&apos;ve designed for web and mobile for 8 years.
            </p>
            <p className="ds-type-md">
              I&apos;m passionate about helping products reflect the way people
              already think.
            </p>
          </div>
          <p className="ds-type-md">
            Previously at Housecall Pro, Mad Mobile, and Ibotta.
          </p>
          <p style={{ margin: 0 }}>
            <a href="#linkedin" className="ds-text-link">
              LinkedIn
            </a>
            {" · "}
            <a href="#resume" className="ds-text-link">
              Resume
            </a>
          </p>
        </div>
      </Specimen>

      <Specimen label="Outcomes" token="portfolio__outcomes">
        <ul
          className="ds-type-md ds-type--muted"
          style={{
            margin: 0,
            paddingInlineStart: "1.1em",
            listStyle: "disc",
            listStylePosition: "outside",
          }}
        >
          <li>3% → 12% conversion</li>
          <li>Adopted across product squads</li>
        </ul>
      </Specimen>
    </div>
  );
}

function ColumnWithMockupPage() {
  return (
    <div style={{ padding: "1.5rem clamp(1rem, 3vw, 2.5rem) 3rem" }}>
      <p
        className="ds-type-sm"
        style={{ marginBottom: "var(--ds-type-gap)" }}
      >
        Context · case header beside gallery well
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 22rem) minmax(0, 1fr)",
          gap: "clamp(1.5rem, 4vw, 3rem)",
          alignItems: "start",
        }}
      >
        <div className="ds-type-identity">
          <p className="ds-type-lg">Concierge AI</p>
          <p className="ds-type-md ds-type--muted">Mad Mobile · Retail</p>
          <p className="ds-type-md" style={{ marginTop: "var(--ds-type-gap)" }}>
            Led 0 → 1 design across strategy, system modeling, and delivery for a
            new agent experience.
          </p>
        </div>
        <GalleryPlaceholder style={{ minHeight: "22rem" }} />
      </div>
    </div>
  );
}

export const Scale: Story = {
  render: () => <TypographyPage />,
};

export const BesideMockup: Story = {
  render: () => <ColumnWithMockupPage />,
  parameters: {
    layout: "fullscreen",
  },
};
