"use client";

import { ArrowUp } from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type DockFilter = "all" | "mobile" | "web";

export const DOCK_FILTERS: { id: DockFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
];

const SCROLL_ICON_SIZE = 18;

const SCROLL_RING_RADIUS = 15;
const SCROLL_RING_CIRCUMFERENCE = 2 * Math.PI * SCROLL_RING_RADIUS;

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

/** Platform filter dock and scroll-to-top — use inside DockAnchor. */
export function Dock({
  filter,
  onFilterChange,
  scrollRoot,
  className,
}: DockProps) {
  const filterGroupId = useId();
  const filterRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusFilterAt = (index: number) => {
    const next = DOCK_FILTERS[index];
    if (!next) {
      return;
    }

    onFilterChange(next.id);
    filterRefs.current[index]?.focus();
  };

  const dockClasses = ["ds-dock-surface", "ds-dock"];
  if (className) {
    dockClasses.push(className);
  }

  return (
    <>
      <div
        className={dockClasses.join(" ")}
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
