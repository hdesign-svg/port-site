"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { applyThemeWithTransition, type Theme } from "@/lib/theme";
import { iconButtonSize } from "@/lib/icon-button";

function readThemeFromDom(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState<Theme>("light");

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

    const params = new URLSearchParams(searchParams.toString());
    params.set("theme", nextTheme);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={handleClick}
      className="icon-btn icon-btn--sm icon-btn--ghost"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span
        className="t-icon-swap"
        data-state={isLight ? "a" : "b"}
        aria-hidden
      >
        <span className="t-icon" data-icon="a">
          <Moon size={iconButtonSize.sm} weight="regular" />
        </span>
        <span className="t-icon" data-icon="b">
          <Sun size={iconButtonSize.sm} weight="regular" />
        </span>
      </span>
    </button>
  );
}
