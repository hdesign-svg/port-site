import type { ReactNode } from "react";

export type BackdropVariant =
  | "none"
  | "margin-grid"
  | "hero-wash"
  | "noise"
  | "dots";

type PageBackdropProps = {
  children: ReactNode;
  variant?: BackdropVariant;
};

/**
 * Backdrop treatments for optional gutter effects behind the shell.
 */
export function PageBackdrop({
  children,
  variant = "none",
}: PageBackdropProps) {
  return (
    <div className="relative min-h-screen bg-bg">
      {variant === "margin-grid" ? (
        <div
          className="margin-field-grid backdrop-gutter-mask pointer-events-none fixed inset-0 z-0"
          aria-hidden
        />
      ) : null}
      {variant === "noise" ? (
        <div
          className="film-grain backdrop-gutter-mask pointer-events-none fixed inset-0 z-0"
          aria-hidden
        />
      ) : null}
      {variant === "dots" ? (
        <div
          className="dot-grid backdrop-gutter-mask pointer-events-none fixed inset-0 z-0"
          aria-hidden
        />
      ) : null}
      <div className="px-5 lg:px-10">
        <div className="shell-frame relative z-10 mx-auto w-full max-w-[var(--shell-max)] bg-bg">
          {children}
        </div>
      </div>
    </div>
  );
}
