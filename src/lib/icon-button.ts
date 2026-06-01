/** Icon button scale — 8px inset at every step (Material / Polaris / shadcn pattern). */
export const iconButtonSize = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export type IconButtonSize = keyof typeof iconButtonSize;
