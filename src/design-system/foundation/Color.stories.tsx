import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties, ReactNode } from "react";

import { TextLink } from "../components/TextLink";

const meta = {
  title: "Foundation/Color",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const GRAY_SCALE = [
  { stop: 100, token: "--ds-gray-100", label: "Bright Snow" },
  { stop: 200, token: "--ds-gray-200", label: "Platinum" },
  { stop: 300, token: "--ds-gray-300", label: "Alabaster" },
  { stop: 400, token: "--ds-gray-400", label: "Pale Slate" },
  { stop: 500, token: "--ds-gray-500", label: "Pale Slate" },
  { stop: 600, token: "--ds-gray-600", label: "Slate Grey" },
  { stop: 700, token: "--ds-gray-700", label: "Iron Grey" },
  { stop: 800, token: "--ds-gray-800", label: "Gunmetal" },
  { stop: 850, token: "--ds-gray-850", label: "Derived" },
  { stop: 900, token: "--ds-gray-900", label: "Carbon Black" },
] as const;

const SEMANTIC_SWATCHES = [
  { label: "Background", token: "--ds-bg", fill: "var(--ds-bg)" },
  { label: "Gallery well", token: "--ds-bg-subtle", fill: "var(--ds-bg-subtle)" },
  { label: "Surface raised", token: "--ds-surface-raised", fill: "var(--ds-surface-raised)" },
  { label: "Foreground", token: "--ds-fg", fill: "var(--ds-fg)" },
  { label: "Muted", token: "--ds-muted", fill: "var(--ds-muted)" },
  {
    label: "Muted on well",
    token: "--ds-muted-on-subtle",
    fill: "var(--ds-muted-on-subtle)",
  },
  {
    label: "Link underline",
    token: "--ds-link-underline",
    fill: "var(--ds-link-underline)",
  },
  { label: "Rule", token: "--ds-rule", fill: "var(--ds-rule)" },
  { label: "Border", token: "--ds-border", fill: "var(--ds-border)" },
  { label: "Dock bg", token: "--ds-dock-bg", fill: "var(--ds-dock-bg)" },
  { label: "Dock fg", token: "--ds-dock-fg", fill: "var(--ds-dock-fg)" },
  { label: "Dock muted", token: "--ds-dock-muted", fill: "var(--ds-dock-muted)" },
] as const;

function Swatch({
  label,
  token,
  fill,
  hex,
  bordered = false,
}: {
  label: string;
  token: string;
  fill: string;
  hex?: string;
  bordered?: boolean;
}) {
  return (
    <div>
      <div
        style={{
          height: "4.5rem",
          borderRadius: "var(--ds-radius-xl)",
          background: fill,
          border: bordered ? "1px solid var(--ds-border)" : undefined,
        }}
      />
      <p
        className="ds-type-meta"
        style={{ marginTop: "var(--ds-type-gap-tight)" }}
      >
        {label}
        <span style={{ opacity: 0.65 }}>
          {" "}
          · {token}
          {hex ? ` · ${hex}` : ""}
        </span>
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

function MockupCard({ style }: { style?: CSSProperties }) {
  return (
    <div
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "14rem",
        padding: "var(--ds-type-gap)",
        borderRadius: "var(--ds-radius-xl)",
        background: "var(--ds-bg-subtle)",
        ...style,
      }}
    >
      <div
        style={{
          width: "40%",
          aspectRatio: "210 / 477",
          borderRadius: "var(--ds-radius-md)",
          background: "var(--ds-surface-raised)",
        }}
      />
    </div>
  );
}

function PalettePage() {
  return (
    <div style={{ maxWidth: "52rem", padding: "1.5rem 0 3rem" }}>
      <header
        className="ds-type-stack"
        style={{ marginBottom: "var(--ds-type-gap)" }}
      >
        <h1 className="ds-type-strong">Color</h1>
        <p className="ds-type-muted">
          Bootstrap gray primitives (--ds-gray-100–900) mapped to semantic tokens.
          Two type steps on canvas: fg + muted. Toggle light/dark in the toolbar.
        </p>
      </header>

      <Specimen label="Primitive scale" token="--ds-gray-*">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(5.5rem, 1fr))",
            gap: "var(--ds-type-gap-tight)",
          }}
        >
          {GRAY_SCALE.map(({ stop, token, label }) => (
            <Swatch
              key={token}
              label={`${stop} ${label}`}
              token={token}
              fill={`var(${token})`}
            />
          ))}
        </div>
      </Specimen>

      <Specimen label="Semantic tokens" token="--ds-*">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(7rem, 1fr))",
            gap: "var(--ds-type-gap)",
          }}
        >
          {SEMANTIC_SWATCHES.map(({ label, token, fill }) => (
            <Swatch
              key={token}
              label={label}
              token={token}
              fill={fill}
              bordered={token === "--ds-rule"}
            />
          ))}
        </div>
      </Specimen>

      <Specimen label="Canvas vs gallery well" token="--ds-bg · --ds-bg-subtle">
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
              borderTop: "1px solid var(--ds-rule)",
            }}
          >
            <p className="ds-type-meta">Canvas + rule</p>
          </div>
          <div
            style={{
              padding: "var(--ds-type-gap)",
              background: "var(--ds-bg-subtle)",
              borderRadius: "var(--ds-radius-xl)",
            }}
          >
            <p className="ds-type-muted-on-subtle">Muted on well</p>
          </div>
        </div>
      </Specimen>

      <Specimen
        label="Mockup card — shell + screen"
        token="--ds-bg-subtle · --ds-surface-raised"
      >
        <MockupCard />
      </Specimen>

      <Specimen label="Text link" token="--ds-fg · --ds-link-underline">
        <p className="ds-type-body" style={{ maxWidth: "none", margin: 0 }}>
          <TextLink href="#linkedin" external>
            LinkedIn
          </TextLink>
          {" · "}
          <TextLink href="#resume" external>
            Resume
          </TextLink>
        </p>
      </Specimen>

      <Specimen label="Identity + rule" token="composed">
        <div className="ds-type-identity">
          <p className="ds-type-strong">Harry Howe</p>
          <p className="ds-type-subtle">Product Designer</p>
        </div>
        <hr
          style={{
            margin: "var(--ds-type-gap) 0 0",
            border: "none",
            borderTop: "1px solid var(--ds-rule)",
          }}
        />
      </Specimen>

      <Specimen label="Inverted dock" token="--ds-dock-*">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--ds-dock-tab-gap)",
            padding: "var(--ds-dock-tab-inset)",
            borderRadius: "9999px",
            background: "var(--ds-dock-bg)",
            color: "var(--ds-dock-fg)",
            boxShadow: "var(--ds-dock-shadow)",
          }}
        >
          <span
            className="ds-type-meta"
            style={{
              display: "grid",
              placeItems: "center",
              width: "var(--ds-dock-tab-size)",
              height: "var(--ds-dock-tab-size)",
              color: "var(--ds-dock-muted)",
            }}
          >
            ···
          </span>
          <span
            className="ds-type-meta"
            style={{
              display: "grid",
              placeItems: "center",
              width: "var(--ds-dock-tab-size)",
              height: "var(--ds-dock-tab-size)",
              borderRadius: "9999px",
              color: "var(--ds-dock-fg)",
              background: "var(--ds-dock-tab-active-fill)",
            }}
          >
            ●
          </span>
        </div>
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
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              alignItems: "baseline",
              gap: "var(--ds-type-gap)",
              width: "100%",
            }}
          >
            <p className="ds-type-strong">Basic Accounting</p>
            <p className="ds-type-strong ds-type-tabular">2025</p>
          </div>
          <p className="ds-type-subtle">Housecall Pro · Trades</p>
        </div>
        <MockupCard style={{ minHeight: "22rem" }} />
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
