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
          "linear-gradient(145deg, var(--ds-surface-raised) 0%, var(--ds-surface) 55%, color-mix(in oklch, var(--ds-border) 40%, var(--ds-surface)) 100%)",
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
        <h1 className="ds-type-strong">Typography</h1>
        <p className="ds-type-muted">
          Geist Sans · 3-size compressed scale (11 / 13 / 13px roles). Toggle
          light/dark in the toolbar.
        </p>
      </header>

      <Specimen label="Strong" token="ds-type-strong">
        <p className="ds-type-strong">Harry Howe</p>
      </Specimen>

      <Specimen label="Subtle" token="ds-type-subtle">
        <p className="ds-type-subtle">Product Designer</p>
      </Specimen>

      <Specimen label="Body" token="ds-type-body">
        <p className="ds-type-body">
          My approach to craft starts with what&apos;s under the hood. I care
          deeply about creating the systems and models that shape a product and
          translating them into experiences people can understand and trust.
        </p>
      </Specimen>

      <Specimen label="Muted" token="ds-type-muted">
        <p className="ds-type-muted">
          Previously at Housecall Pro, Mad Mobile, and Ibotta.
        </p>
      </Specimen>

      <Specimen label="Meta" token="ds-type-meta">
        <p className="ds-type-meta">Housecall Pro · 2024 · Product design</p>
      </Specimen>

      <Specimen label="Link quiet" token="ds-type-link-quiet">
        <a href="#nav" className="ds-type-link-quiet">
          LinkedIn ↗
        </a>
      </Specimen>

      <Specimen label="Link emphasis" token="ds-type-link-emphasis">
        <p style={{ margin: 0 }}>
          <a href="#link" className="ds-type-link-emphasis">
            LinkedIn
          </a>
          {" · "}
          <a href="#link" className="ds-type-link-emphasis">
            Resume
          </a>
        </p>
      </Specimen>

      <Specimen label="Identity block" token="composed">
        <div className="ds-type-stack">
          <p className="ds-type-strong">Harry Howe</p>
          <p className="ds-type-subtle">Product Designer</p>
        </div>
      </Specimen>

      <Specimen label="Hero excerpt" token="composed">
        <div className="ds-type-stack--loose ds-type-stack">
          <p className="ds-type-body">
            I&apos;ve designed for web and mobile for 8 years.
          </p>
          <p className="ds-type-body">
            I&apos;m passionate about helping products reflect the way people
            already think.
          </p>
          <p className="ds-type-muted">
            Previously at Housecall Pro, Mad Mobile, and Ibotta.
          </p>
          <p style={{ margin: 0 }}>
            <a href="#linkedin" className="ds-type-link-emphasis">
              LinkedIn
            </a>
            {" · "}
            <a href="#resume" className="ds-type-link-emphasis">
              Resume
            </a>
          </p>
        </div>
      </Specimen>

      <Specimen label="Project blurb" token="composed">
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
      </Specimen>
    </div>
  );
}

function ColumnWithMockupPage() {
  return (
    <div style={{ padding: "1.5rem clamp(1rem, 3vw, 2.5rem) 3rem" }}>
      <p
        className="ds-type-meta"
        style={{ marginBottom: "var(--ds-type-gap)" }}
      >
        Context · sticky column beside mockup (~38ch copy width)
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

export const Scale: Story = {
  render: () => <TypographyPage />,
};

export const BesideMockup: Story = {
  render: () => <ColumnWithMockupPage />,
  parameters: {
    layout: "fullscreen",
  },
};
