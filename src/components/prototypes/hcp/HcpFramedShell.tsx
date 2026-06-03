"use client";

import { HcpAppShell } from "./HcpAppShell";
import { PrototypeFrame } from "./PrototypeFrame";

type HcpFramedShellProps = {
  children: React.ReactNode;
};

export function HcpFramedShell({ children }: HcpFramedShellProps) {
  return (
    <PrototypeFrame>
      <HcpAppShell>{children}</HcpAppShell>
    </PrototypeFrame>
  );
}
