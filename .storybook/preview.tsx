import type { Preview } from "@storybook/nextjs-vite";

import "../src/design-system/storybook.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Portfolio color theme",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, { globals }) => {
      const theme = globals.theme === "dark" ? "dark" : "light";

      return (
        <div
          data-theme={theme}
          style={{
            minHeight: "100vh",
            background: "var(--ds-bg)",
            color: "var(--ds-fg)",
            fontFamily: "var(--ds-font-family)",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
