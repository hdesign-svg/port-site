import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Surface } from "./Surface";

const meta = {
  title: "Portfolio/Surface",
  component: Surface,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "min(24rem, 90vw)", padding: "1.5rem" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Project context",
    children:
      "Sticky left column copy lives here. Spacing over rules — no shell frame.",
  },
};

export const Raised: Story = {
  args: {
    title: "Raised surface",
    raised: true,
    children: "Use for cards and grouped content on the portfolio canvas.",
  },
};
