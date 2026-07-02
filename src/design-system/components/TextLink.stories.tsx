import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TextLink } from "./TextLink";

const meta = {
  title: "Portfolio/TextLink",
  component: TextLink,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "#linkedin",
    external: true,
    children: "LinkedIn",
  },
};

export const Pair: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Rest: muted text with link-underline decoration. Hover: underline shifts to fg.",
      },
    },
  },
  render: () => (
    <p className="ds-type-md" style={{ maxWidth: "none", margin: 0 }}>
      <TextLink href="#linkedin" external>
        LinkedIn
      </TextLink>
      {" · "}
      <TextLink href="#resume" external>
        Resume
      </TextLink>
    </p>
  ),
};

export const InHero: Story = {
  render: () => (
    <div className="ds-type-stack--loose ds-type-stack">
      <p className="ds-type-md">
        I&apos;ve designed for web and mobile for 8 years.
      </p>
      <p className="ds-type-md ds-type--muted">
        Previously at Housecall Pro, Mad Mobile, and Ibotta.
      </p>
      <p style={{ margin: 0 }}>
        <TextLink href="#linkedin" external>
          LinkedIn
        </TextLink>
        {" · "}
        <TextLink href="#resume" external>
          Resume
        </TextLink>
      </p>
    </div>
  ),
};

export const Multiline: Story = {
  render: () => (
    <p className="ds-type-md" style={{ maxWidth: "12rem", margin: 0 }}>
      <TextLink href="#resume" external>
        Download my full resume as PDF
      </TextLink>
    </p>
  ),
};
