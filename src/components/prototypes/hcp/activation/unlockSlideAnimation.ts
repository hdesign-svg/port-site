/** One-shot animation helpers for unlock modal slide previews */

export const unlockKeyframes = {
  "@keyframes unlockFadeUp": {
    from: { opacity: 0, transform: "translateY(8px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "@keyframes unlockScaleX": {
    from: { transform: "scaleX(0)" },
    to: { transform: "scaleX(1)" },
  },
  "@keyframes unlockScaleY": {
    from: { transform: "scaleY(0)" },
    to: { transform: "scaleY(1)" },
  },
  "@keyframes unlockFadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
} as const;

export function fadeUpSx(delayMs: number, durationMs = 480) {
  return {
    opacity: 0,
    animation: `unlockFadeUp ${durationMs}ms ease-out forwards`,
    animationDelay: `${delayMs}ms`,
  };
}

export function scaleXSx(delayMs: number, durationMs = 640) {
  return {
    transform: "scaleX(0)",
    transformOrigin: "left center",
    animation: `unlockScaleX ${durationMs}ms ease-out forwards`,
    animationDelay: `${delayMs}ms`,
  };
}

export function scaleYSx(delayMs: number, durationMs = 560) {
  return {
    transform: "scaleY(0)",
    transformOrigin: "bottom center",
    animation: `unlockScaleY ${durationMs}ms ease-out forwards`,
    animationDelay: `${delayMs}ms`,
  };
}

export function fadeInSx(delayMs: number, durationMs = 400) {
  return {
    opacity: 0,
    animation: `unlockFadeIn ${durationMs}ms ease-out forwards`,
    animationDelay: `${delayMs}ms`,
  };
}
