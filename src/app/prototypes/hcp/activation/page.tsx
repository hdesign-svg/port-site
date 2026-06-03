"use client";

import { ExpensesOverviewScene } from "@/components/prototypes/hcp/activation/ExpensesOverviewScene";
import { HcpFramedShell } from "@/components/prototypes/hcp/HcpFramedShell";

export default function HcpActivationPrototypePage() {
  return (
    <HcpFramedShell>
      <ExpensesOverviewScene />
    </HcpFramedShell>
  );
}
