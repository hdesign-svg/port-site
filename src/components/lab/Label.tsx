import type { ReactNode } from "react";

export function Label({ children }: { children: ReactNode }) {
  return (
    <span className="font-[650] text-fg-strong">{children}</span>
  );
}
