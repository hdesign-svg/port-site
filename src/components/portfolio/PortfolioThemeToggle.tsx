"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  applyThemeWithTransition,
  DEFAULT_THEME,
  type Theme,
} from "@/lib/theme";

function readThemeFromDom(): Theme {
  if (typeof document === "undefined") {
    return DEFAULT_THEME;
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function PortfolioThemeToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    setTheme(readThemeFromDom());
  }, []);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";

    await applyThemeWithTransition(
      nextTheme,
      event.clientX,
      event.clientY,
      () => setTheme(nextTheme),
    );

    const params = new URLSearchParams(window.location.search);
    params.set("theme", nextTheme);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={handleClick}
      className="portfolio__theme-toggle"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLight ? (
        <Moon size={16} weight="regular" aria-hidden />
      ) : (
        <Sun size={16} weight="regular" aria-hidden />
      )}
    </button>
  );
}
