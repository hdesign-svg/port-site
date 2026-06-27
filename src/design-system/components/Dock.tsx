"use client";

import {
  ArrowUp,
  Desktop,
  DeviceMobile,
  Stack,
} from "@phosphor-icons/react";
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

export type DockFilter = "all" | "mobile" | "web";

export const DOCK_FILTERS: {
  id: DockFilter;
  label: string;
  icon: Icon;
}[] = [
  { id: "all", label: "All", icon: Stack },
  { id: "mobile", label: "Mobile", icon: DeviceMobile },
  { id: "web", label: "Web", icon: Desktop },
];

const FILTER_ICON_SIZE = 16;
const SCROLL_ICON_SIZE = 16;

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

type PlatformFilterProps = {
  filter: DockFilter;
  onFilterChange: (filter: DockFilter) => void;
  className?: string;
};

export function PlatformFilter({
  filter,
  onFilterChange,
  className,
}: PlatformFilterProps) {
  const groupId = useId();
  const filterRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusFilterAt = (index: number) => {
    const next = DOCK_FILTERS[index];
    if (!next) {
      return;
    }

    onFilterChange(next.id);
    filterRefs.current[index]?.focus();
  };

  const handleFilterKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % DOCK_FILTERS.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + DOCK_FILTERS.length) % DOCK_FILTERS.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = DOCK_FILTERS.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    focusFilterAt(nextIndex);
  };

  const classes = ["ds-dock-surface", "ds-platform-filter"];
  if (className) {
    classes.push(className);
  }

  return (
    <div
      className={classes.join(" ")}
      role="radiogroup"
      aria-label="Filter projects by platform"
    >
      {DOCK_FILTERS.map(({ id, label, icon: Icon }, index) => {
        const active = filter === id;
        const position =
          index === 0
            ? "start"
            : index === DOCK_FILTERS.length - 1
              ? "end"
              : "middle";

        return (
          <button
            key={id}
            ref={(node) => {
              filterRefs.current[index] = node;
            }}
            type="button"
            role="radio"
            id={`${groupId}-${id}`}
            aria-checked={active}
            aria-label={label}
            tabIndex={active ? 0 : -1}
            className={`ds-platform-filter__option${active ? " ds-platform-filter__option--active" : ""}`}
            onClick={() => onFilterChange(id)}
            onKeyDown={(event) => handleFilterKeyDown(event, index)}
          >
            <Icon
              size={FILTER_ICON_SIZE}
              weight={active ? "fill" : "regular"}
              aria-hidden
            />
            <span
              className={`ds-platform-filter__tooltip ds-platform-filter__tooltip--${position}`}
              aria-hidden
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

type ScrollToTopProps = {
  /** Scroll root for progress + back-to-top. Defaults to window. */
  scrollRoot?: HTMLElement | null;
  className?: string;
};

export function ScrollToTop({ scrollRoot, className }: ScrollToTopProps) {
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

/** Side-by-side platform filter + scroll-to-top — use inside DockAnchor. */
export function Dock({
  filter,
  onFilterChange,
  scrollRoot,
  className,
}: DockProps) {
  return (
    <>
      <PlatformFilter
        filter={filter}
        onFilterChange={onFilterChange}
        className={className}
      />
      <ScrollToTop scrollRoot={scrollRoot} />
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
