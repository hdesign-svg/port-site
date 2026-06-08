"use client";

import { HcpAppShell } from "./HcpAppShell";
import type { HcpGlobalNavProps } from "./HcpGlobalNav";
import { PrototypeFrame } from "./PrototypeFrame";

type HcpFramedShellProps = {
  children: React.ReactNode;
  navProps?: HcpGlobalNavProps;
};

export function HcpFramedShell({ children, navProps }: HcpFramedShellProps) {
  return (
    <PrototypeFrame>
      <HcpAppShell navProps={navProps}>{children}</HcpAppShell>
    </PrototypeFrame>
  );
}
