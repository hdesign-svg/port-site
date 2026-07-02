"use client";

import { ArrowUp, Moon, Sun } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  applyThemeWithTransition,
  DEFAULT_THEME,
  type Theme,
} from "@/lib/theme";

export type DockFilter = "all" | "mobile" | "web";

export const DOCK_FILTERS: { id: DockFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
];

export const DOCK_THEMES: {
  id: Theme;
  label: string;
  icon: Icon;
}[] = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
];

const DOCK_ICON_SIZE = 18;
const SCROLL_ICON_SIZE = 18;

const SCROLL_RING_RADIUS = 15;
const SCROLL_RING_CIRCUMFERENCE = 2 * Math.PI * SCROLL_RING_RADIUS;

function readThemeFromDom(): Theme {
  if (typeof document === "undefined") {
    return DEFAULT_THEME;
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function dockScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") {
    return "auto";
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

function getScrollMetrics(root: HTMLElement | Window) {
  if (root instanceof Window) {
    const scrollTop = root.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = root.innerHeight;
    return { scrollTop, scrollHeight, clientHeight };
  }

  return {
    scrollTop: root.scrollTop,
    scrollHeight: root.scrollHeight,
    clientHeight: root.clientHeight,
  };
}

function scrollProgress(root: HTMLElement | Window) {
  const { scrollTop, scrollHeight, clientHeight } = getScrollMetrics(root);
  const maxScroll = scrollHeight - clientHeight;

  if (maxScroll <= 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, scrollTop / maxScroll));
}

function scrollToTop(root: HTMLElement | Window) {
  root.scrollTo({ top: 0, behavior: dockScrollBehavior() });
}

function handleRadioKeyDown(
  event: KeyboardEvent<HTMLButtonElement>,
  index: number,
  length: number,
  onSelect: (index: number) => void,
) {
  let nextIndex: number | null = null;

  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown":
      nextIndex = (index + 1) % length;
      break;
    case "ArrowLeft":
    case "ArrowUp":
      nextIndex = (index - 1 + length) % length;
      break;
    case "Home":
      nextIndex = 0;
      break;
    case "End":
      nextIndex = length - 1;
      break;
    default:
      return;
  }

  event.preventDefault();
  onSelect(nextIndex);
}

type ScrollToTopProps = {
  scrollRoot?: HTMLElement | null;
  className?: string;
};

function ScrollToTop({ scrollRoot, className }: ScrollToTopProps) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const resolveScrollRoot = useCallback((): HTMLElement | Window => {
    return scrollRoot ?? window;
  }, [scrollRoot]);

  useEffect(() => {
    const root = resolveScrollRoot();

    const update = () => {
      setProgress(scrollProgress(root));
    };

    const onScroll = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    update();
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [resolveScrollRoot, scrollRoot]);

  const dashOffset = SCROLL_RING_CIRCUMFERENCE * (1 - progress);
  const scrolled = progress > 0.05;
  const classes = ["ds-dock-surface", "ds-scroll-to-top"];
  if (scrolled) {
    classes.push("ds-scroll-to-top--scrolled");
  }
  if (className) {
    classes.push(className);
  }

  return (
    <button
      type="button"
      className={classes.join(" ")}
      aria-label="Back to top"
      onClick={() => scrollToTop(resolveScrollRoot())}
    >
      <svg className="ds-scroll-to-top__ring" viewBox="0 0 36 36" aria-hidden>
        <circle
          className="ds-scroll-to-top__progress"
          cx="18"
          cy="18"
          r={SCROLL_RING_RADIUS}
          strokeDasharray={SCROLL_RING_CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <ArrowUp
        className="ds-scroll-to-top__icon"
        size={SCROLL_ICON_SIZE}
        weight="regular"
        aria-hidden
      />
    </button>
  );
}

type DockProps = {
  filter: DockFilter;
  onFilterChange: (filter: DockFilter) => void;
  scrollRoot?: HTMLElement | null;
  className?: string;
};

/** Unified filter + theme dock and scroll-to-top — use inside DockAnchor. */
export function Dock({
  filter,
  onFilterChange,
  scrollRoot,
  className,
}: DockProps) {
  const router = useRouter();
  const pathname = usePathname();
  const filterGroupId = useId();
  const themeGroupId = useId();
  const filterRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const themeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    setTheme(readThemeFromDom());
  }, []);

  const focusFilterAt = (index: number) => {
    const next = DOCK_FILTERS[index];
    if (!next) {
      return;
    }

    onFilterChange(next.id);
    filterRefs.current[index]?.focus();
  };

  const applyThemeChoice = async (
    nextTheme: Theme,
    x: number,
    y: number,
  ) => {
    if (nextTheme === theme) {
      return;
    }

    await applyThemeWithTransition(nextTheme, x, y, () => setTheme(nextTheme));

    const params = new URLSearchParams(window.location.search);
    params.set("theme", nextTheme);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const selectThemeAt = (
    index: number,
    pointer?: { clientX: number; clientY: number },
  ) => {
    const next = DOCK_THEMES[index];
    const button = themeRefs.current[index];

    if (!next || !button) {
      return;
    }

    const rect = button.getBoundingClientRect();
    const clientX = pointer?.clientX ?? rect.left + rect.width / 2;
    const clientY = pointer?.clientY ?? rect.top + rect.height / 2;

    void applyThemeChoice(next.id, clientX, clientY);
    button.focus();
  };

  const dockClasses = ["ds-dock-surface", "ds-dock"];
  if (className) {
    dockClasses.push(className);
  }

  return (
    <>
      <div className={dockClasses.join(" ")}>
        <div
          className="ds-dock__group"
          role="radiogroup"
          aria-label="Filter projects by platform"
        >
          {DOCK_FILTERS.map(({ id, label }, index) => {
            const active = filter === id;

            return (
              <button
                key={id}
                ref={(node) => {
                  filterRefs.current[index] = node;
                }}
                type="button"
                role="radio"
                id={`${filterGroupId}-${id}`}
                aria-checked={active}
                tabIndex={active ? 0 : -1}
                className={`ds-dock__option ds-dock__text-option${active ? " ds-dock__option--active" : ""}`}
                onClick={() => onFilterChange(id)}
                onKeyDown={(event) =>
                  handleRadioKeyDown(
                    event,
                    index,
                    DOCK_FILTERS.length,
                    focusFilterAt,
                  )
                }
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="ds-dock__divider" aria-hidden />

        <div
          className="ds-dock__group"
          role="radiogroup"
          aria-label="Color theme"
        >
          {DOCK_THEMES.map(({ id, label, icon: Icon }, index) => {
            const active = theme === id;
            const position = index === 0 ? "start" : "end";

            return (
              <button
                key={id}
                ref={(node) => {
                  themeRefs.current[index] = node;
                }}
                type="button"
                role="radio"
                id={`${themeGroupId}-${id}`}
                aria-checked={active}
                aria-label={label}
                tabIndex={active ? 0 : -1}
                className={`ds-dock__option ds-dock__icon-option${active ? " ds-dock__option--active" : ""}`}
                onClick={(event) => selectThemeAt(index, event)}
                onKeyDown={(event) =>
                  handleRadioKeyDown(
                    event,
                    index,
                    DOCK_THEMES.length,
                    selectThemeAt,
                  )
                }
              >
                <Icon
                  size={DOCK_ICON_SIZE}
                  weight={active ? "fill" : "regular"}
                  aria-hidden
                />
                <span
                  className={`ds-dock__tooltip ds-dock__tooltip--${position}`}
                  aria-hidden
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <ScrollToTop scrollRoot={scrollRoot} className={className} />
    </>
  );
}

export function DockAnchor({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const classes = ["ds-dock-anchor"];
  if (className) {
    classes.push(className);
  }

  return <div className={classes.join(" ")}>{children}</div>;
}
