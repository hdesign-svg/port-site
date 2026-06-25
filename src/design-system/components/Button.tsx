import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = ["ds-button", `ds-button--${variant}`, `ds-button--${size}`];
  if (className) classes.push(className);

  return (
    <button type={type} className={classes.join(" ")} {...props}>
      {children}
    </button>
  );
}
