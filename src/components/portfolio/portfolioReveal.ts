import type { CSSProperties } from "react";

/** Hero reveal beats: avatar, name, 3 paragraphs, links. */
export const PORTFOLIO_HERO_REVEAL_COUNT = 6;

export function portfolioRevealStyle(index: number): CSSProperties {
  return { "--reveal-index": index } as CSSProperties;
}
