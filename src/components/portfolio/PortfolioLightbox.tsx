"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import type { ProjectImage } from "@/data/projects";

export type LightboxOrigin = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type LightboxState = {
  image: ProjectImage;
  origin: LightboxOrigin;
};

type PortfolioLightboxProps = {
  state: LightboxState | null;
  onClose: () => void;
};

type LightboxPhase = "enter" | "open" | "close";

const LIGHTBOX_MAX_WIDTH = 72 * 16;

function readLightboxMs(
  element: HTMLElement | null,
  property: string,
  fallback: number,
) {
  if (!element) {
    return fallback;
  }

  const raw = getComputedStyle(element).getPropertyValue(property);
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readPageInset() {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    "--portfolio-page-inset",
  );
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 32;
}

function fallbackAspect(image: ProjectImage) {
  return image.device === "desktop" ? 1024 / 704 : 210 / 477;
}

function computeTargetRect(
  image: ProjectImage,
  naturalWidth: number,
  naturalHeight: number,
): LightboxOrigin {
  const inset = readPageInset();
  const maxWidth = Math.min(window.innerWidth - inset * 2, LIGHTBOX_MAX_WIDTH);
  const maxHeight = window.innerHeight - inset * 2;
  const aspect =
    naturalWidth > 0 && naturalHeight > 0
      ? naturalWidth / naturalHeight
      : fallbackAspect(image);

  let width = maxWidth;
  let height = width / aspect;

  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspect;
  }

  return {
    top: (window.innerHeight - height) / 2,
    left: (window.innerWidth - width) / 2,
    width,
    height,
  };
}

function getFlightTransform(origin: LightboxOrigin, target: LightboxOrigin) {
  const originCenterX = origin.left + origin.width / 2;
  const originCenterY = origin.top + origin.height / 2;
  const targetCenterX = target.left + target.width / 2;
  const targetCenterY = target.top + target.height / 2;
  const scaleX = origin.width / target.width;
  const scaleY = origin.height / target.height;

  return `translate(${originCenterX - targetCenterX}px, ${originCenterY - targetCenterY}px) scale(${scaleX}, ${scaleY})`;
}

export function PortfolioLightbox({ state, onClose }: PortfolioLightboxProps) {
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<LightboxPhase>("enter");
  const [target, setTarget] = useState<LightboxOrigin | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const requestClose = useCallback(() => {
    if (!state) {
      return;
    }

    clearCloseTimer();

    if (reduceMotion) {
      onClose();
      return;
    }

    setPhase("close");
    const closeMs = readLightboxMs(
      lightboxRef.current,
      "--portfolio-lightbox-close-ms",
      260,
    );
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onClose();
    }, closeMs);
  }, [clearCloseTimer, onClose, reduceMotion, state]);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!state) {
      setPhase("enter");
      setTarget(null);
      return;
    }

    clearCloseTimer();
    setPhase(reduceMotion ? "open" : "enter");
    setTarget(null);

    const probe = new Image();
    probe.src = state.image.src;

    const resolveTarget = () => {
      setTarget(
        computeTargetRect(
          state.image,
          probe.naturalWidth,
          probe.naturalHeight,
        ),
      );
    };

    resolveTarget();

    if (!probe.complete) {
      probe.onload = resolveTarget;
      probe.onerror = resolveTarget;
    }
  }, [clearCloseTimer, reduceMotion, state]);

  useLayoutEffect(() => {
    if (!state || !target || reduceMotion || phase !== "enter") {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setPhase("open");
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [phase, reduceMotion, state, target]);

  useEffect(() => {
    if (!state) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      clearCloseTimer();
    };
  }, [clearCloseTimer, requestClose, state]);

  if (!state || !target) {
    return null;
  }

  const isOpen = phase === "open";
  const isClosing = phase === "close";
  const flightTransform =
    isOpen || reduceMotion
      ? "none"
      : getFlightTransform(state.origin, target);

  const lightboxClass = [
    "portfolio-lightbox",
    isOpen || reduceMotion ? "portfolio-lightbox--open" : "",
    isClosing ? "portfolio-lightbox--closing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const flightClass = [
    "portfolio-lightbox__flight",
    state.image.device === "desktop"
      ? "portfolio-lightbox__flight--desktop"
      : "portfolio-lightbox__flight--phone",
  ].join(" ");

  return (
    <div
      ref={lightboxRef}
      className={lightboxClass}
      role="dialog"
      aria-modal="true"
      aria-label={state.image.alt}
    >
      <div
        className="portfolio-lightbox__backdrop"
        onClick={requestClose}
        aria-hidden="true"
      />
      <div
        className="portfolio-lightbox__flight-wrap"
        style={{
          top: target.top,
          left: target.left,
          width: target.width,
          height: target.height,
          transform: isClosing
            ? getFlightTransform(state.origin, target)
            : flightTransform,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Native img preserves source aspect in the lightbox */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={state.image.src}
          alt={state.image.alt}
          className={flightClass}
        />
      </div>
    </div>
  );
}
