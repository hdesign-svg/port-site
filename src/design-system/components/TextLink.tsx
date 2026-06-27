import type { AnchorHTMLAttributes, ReactNode } from "react";

export type TextLinkProps = {
  children: ReactNode;
  /** Opens in a new tab with noopener noreferrer. */
  external?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function TextLink({
  children,
  external,
  className,
  rel,
  target,
  ...props
}: TextLinkProps) {
  const classes = ["ds-text-link"];
  if (className) classes.push(className);

  const externalProps = external
    ? { target: target ?? "_blank", rel: rel ?? "noopener noreferrer" }
    : { target, rel };

  return (
    <a className={classes.join(" ")} {...externalProps} {...props}>
      {children}
    </a>
  );
}
