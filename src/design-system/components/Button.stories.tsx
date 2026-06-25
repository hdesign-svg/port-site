import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { Button } from "./Button";

const meta = {
  title: "Portfolio/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "View project",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "About",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Skip",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    variant: "secondary",
    children: "Small",
  },
};
