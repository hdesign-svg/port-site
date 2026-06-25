import type { HTMLAttributes, ReactNode } from "react";

export type SurfaceProps = {
  title?: string;
  children: ReactNode;
  raised?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function Surface({
  title,
  children,
  raised = false,
  className,
  ...props
}: SurfaceProps) {
  const classes = ["ds-surface", raised ? "ds-surface--raised" : ""];
  if (className) classes.push(className);

  return (
    <div className={classes.filter(Boolean).join(" ")} {...props}>
      {title ? <h3 className="ds-surface__title">{title}</h3> : null}
      <div className="ds-surface__body">{children}</div>
    </div>
  );
}
