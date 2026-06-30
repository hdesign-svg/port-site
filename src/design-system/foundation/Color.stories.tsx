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
  { label: "Gallery well", token: "--ds-bg-subtle", role: "bg-subtle" },
  { label: "Foreground", token: "--ds-fg", role: "fg" },
  { label: "Foreground strong", token: "--ds-fg-strong", role: "fg-strong" },
  { label: "Muted", token: "--ds-muted", role: "muted" },
  { label: "Rule", token: "--ds-rule", role: "rule" },
  { label: "Dock (inverted)", token: "--ds-dock-bg", role: "dock-bg" },
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
          borderRadius: "var(--ds-radius-md)",
          background: fill,
          border: bordered ? "1px solid var(--ds-border)" : undefined,
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
        borderBottom: "1px solid var(--ds-rule)",
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

function GalleryPlaceholder({ style }: { style?: CSSProperties }) {
  return (
    <div
      aria-hidden
      style={{
        minHeight: "18rem",
        borderRadius: "var(--ds-radius-md)",
        background: "var(--ds-bg-subtle)",
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
          Pure neutral tonality · gallery wells · inverted dock · toggle
          light/dark in the toolbar.
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
            fill={
              role === "rule"
                ? "var(--ds-bg)"
                : role === "dock-bg"
                  ? "var(--ds-dock-bg)"
                  : `var(--ds-${role})`
            }
            bordered={role === "rule"}
          />
        ))}
      </div>

      <Specimen label="Canvas vs gallery" token="composed">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--ds-type-gap-tight)",
          }}
        >
          <div
            style={{
              padding: "var(--ds-type-gap)",
              background: "var(--ds-bg)",
              border: "1px solid var(--ds-rule)",
            }}
          >
            <p className="ds-type-meta">Canvas</p>
          </div>
          <div
            style={{
              padding: "var(--ds-type-gap)",
              background: "var(--ds-bg-subtle)",
              borderRadius: "var(--ds-radius-md)",
            }}
          >
            <p className="ds-type-meta">Gallery well</p>
          </div>
        </div>
      </Specimen>

      <Specimen label="Identity + rule" token="composed">
        <div className="ds-type-identity">
          <p className="ds-type-strong">Harry Howe</p>
          <p className="ds-type-subtle">Senior Product Designer</p>
        </div>
        <hr
          style={{
            margin: "var(--ds-type-gap) 0 0",
            border: "none",
            borderTop: "1px solid var(--ds-rule)",
          }}
        />
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "var(--ds-type-gap)",
            }}
          >
            <p className="ds-type-strong">Basic Accounting</p>
            <p className="ds-type-strong ds-type-tabular">2025</p>
          </div>
          <p className="ds-type-subtle">Housecall Pro · Trades</p>
        </div>
        <GalleryPlaceholder style={{ minHeight: "22rem" }} />
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
