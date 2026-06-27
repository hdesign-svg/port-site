import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

const meta = {
  title: "Foundation/Color",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SWATCHES = [
  { label: "Background", token: "--ds-bg", role: "bg" },
  { label: "Background subtle", token: "--ds-bg-subtle", role: "bg-subtle" },
  { label: "Foreground", token: "--ds-fg", role: "fg" },
  { label: "Foreground strong", token: "--ds-fg-strong", role: "fg-strong" },
  { label: "Muted", token: "--ds-muted", role: "muted" },
  { label: "Surface", token: "--ds-surface", role: "surface" },
  { label: "Surface raised", token: "--ds-surface-raised", role: "surface-raised" },
  { label: "Border", token: "--ds-border", role: "border" },
] as const;

function Swatch({
  label,
  token,
  fill,
  bordered = false,
}: {
  label: string;
  token: string;
  fill: string;
  bordered?: boolean;
}) {
  return (
    <div>
      <div
        style={{
          height: "4.5rem",
          borderRadius: "var(--ds-radius-sm)",
          background: fill,
          border: bordered ? "1px solid var(--ds-border)" : undefined,
          boxShadow: bordered ? undefined : "inset 0 0 0 1px color-mix(in oklch, var(--ds-fg-strong) 8%, transparent)",
        }}
      />
      <p
        className="ds-type-meta"
        style={{ marginTop: "var(--ds-type-gap-tight)" }}
      >
        {label}
        <span style={{ opacity: 0.65 }}> · {token}</span>
      </p>
    </div>
  );
}

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
        borderBottom: "1px solid var(--ds-border)",
      }}
    >
      <p
        className="ds-type-meta"
        style={{ marginBottom: "var(--ds-type-gap-tight)" }}
      >
        {label}
        <span style={{ opacity: 0.65 }}> · {token}</span>
      </p>
      {children}
    </div>
  );
}

function MockupPlaceholder({ style }: { style?: CSSProperties }) {
  return (
    <div
      aria-hidden
      style={{
        minHeight: "18rem",
        borderRadius: "var(--ds-radius-md)",
        border: "1px solid var(--ds-border)",
        background:
          "linear-gradient(155deg, var(--ds-surface-raised) 0%, var(--ds-bg-subtle) 45%, var(--ds-surface) 100%)",
        boxShadow: "var(--ds-shadow-raised)",
        ...style,
      }}
    />
  );
}

function PalettePage() {
  return (
    <div style={{ maxWidth: "48rem", padding: "1.5rem 0 3rem" }}>
      <header
        className="ds-type-stack"
        style={{ marginBottom: "var(--ds-type-gap)" }}
      >
        <h1 className="ds-type-strong">Color</h1>
        <p className="ds-type-muted">
          Blue-gray precision · chromatic paper and ink · toggle light/dark in
          the toolbar.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(7rem, 1fr))",
          gap: "var(--ds-type-gap)",
          marginBottom: "var(--ds-type-gap)",
        }}
      >
        {SWATCHES.map(({ label, token, role }) => (
          <Swatch
            key={token}
            label={label}
            token={token}
            fill={role === "border" ? "var(--ds-bg)" : `var(--ds-${role})`}
            bordered={role === "border"}
          />
        ))}
      </div>

      <Specimen label="Text on background" token="composed">
        <div className="ds-type-stack--loose ds-type-stack">
          <p className="ds-type-strong">Harry Howe</p>
          <p className="ds-type-subtle">Product Designer</p>
          <p className="ds-type-body">
            Hierarchy comes from weight and color — not hue. Muted copy stays
            secondary; strong foreground anchors names and links.
          </p>
          <p className="ds-type-muted">Previously at Housecall Pro.</p>
        </div>
      </Specimen>

      <Specimen label="Text links" token="ds-text-link">
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

      <Specimen label="Raised surface" token="--ds-shadow-raised">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "9999px",
            border: "1px solid var(--ds-border)",
            background: "var(--ds-bg)",
            color: "var(--ds-fg-strong)",
            boxShadow: "var(--ds-shadow-raised)",
          }}
          aria-hidden
        >
          ↑
        </div>
        <p className="ds-type-muted" style={{ marginTop: "var(--ds-type-gap-tight)" }}>
          Back-to-top icon button elevation
        </p>
      </Specimen>
    </div>
  );
}

function BesideMockupPage() {
  return (
    <div style={{ padding: "1.5rem clamp(1rem, 3vw, 2.5rem) 3rem" }}>
      <p
        className="ds-type-meta"
        style={{ marginBottom: "var(--ds-type-gap)" }}
      >
        Context · type + color beside mockup
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 22rem) minmax(0, 1fr)",
          gap: "clamp(1.5rem, 4vw, 3rem)",
          alignItems: "start",
        }}
      >
        <div className="ds-type-stack--loose ds-type-stack">
          <p className="ds-type-meta">Housecall Pro · 2024 · Product design</p>
          <p className="ds-type-strong">Accounting activation</p>
          <p className="ds-type-body">
            Onboarding and money surfaces for small business owners — from
            linked accounts through categorization, review, and close readiness.
          </p>
          <p className="ds-type-muted">
            Design systems, prototypes, and production UI in React.
          </p>
        </div>
        <MockupPlaceholder style={{ minHeight: "22rem" }} />
      </div>
    </div>
  );
}

export const Palette: Story = {
  render: () => <PalettePage />,
};

export const BesideMockup: Story = {
  render: () => <BesideMockupPage />,
  parameters: {
    layout: "fullscreen",
  },
};
