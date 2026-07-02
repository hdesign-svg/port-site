export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: Theme = "light";

export function parseTheme(value: string | null | undefined): Theme | null {
  if (value === "light" || value === "dark") return value;
  return null;
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function applyThemeWithTransition(
  theme: Theme,
  x: number,
  y: number,
  onApply?: () => void,
): Promise<void> {
  const root = document.documentElement;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  root.style.setProperty("--theme-transition-x", `${x}px`);
  root.style.setProperty("--theme-transition-y", `${y}px`);
  root.style.setProperty("--theme-transition-radius", `${radius}px`);

  const update = () => {
    applyTheme(theme);
    onApply?.();
  };

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("startViewTransition" in document)
  ) {
    update();
    return Promise.resolve();
  }

  return document.startViewTransition(update).finished.then(() => undefined);
}

export const themeInitScript = `
(function () {
  document.documentElement.dataset.theme = "light";
})();
`;
