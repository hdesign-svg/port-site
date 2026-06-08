"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExpensesOverviewScene } from "@/components/prototypes/hcp/activation/ExpensesOverviewScene";
import { UnlockModal } from "@/components/prototypes/hcp/activation/UnlockModal";
import {
  getUnlockDeck,
  type UnlockTarget,
} from "@/components/prototypes/hcp/activation/unlockDecks";
import type { MoneySubNavLabel } from "@/components/prototypes/hcp/HcpGlobalNav";
import { HcpFramedShell } from "@/components/prototypes/hcp/HcpFramedShell";

export default function HcpActivationPrototypePage() {
  const router = useRouter();
  const [unlockTarget, setUnlockTarget] = useState<UnlockTarget | null>(null);

  const handleMoneySubNavClick = (label: MoneySubNavLabel) => {
    if (label === "Accounting") {
      setUnlockTarget("accounting");
    }
  };

  const handleUnlockComplete = () => {
    setUnlockTarget(null);
    router.push("/prototypes/hcp/accounting");
  };

  return (
    <>
      <HcpFramedShell
        navProps={{
          activeMoneySubNav: "Expenses",
          lockedMoneySubNav: ["Accounting"],
          onMoneySubNavClick: handleMoneySubNavClick,
        }}
      >
        <ExpensesOverviewScene />
      </HcpFramedShell>

      {unlockTarget ? (
        <UnlockModal
          open
          deck={getUnlockDeck(unlockTarget)}
          onClose={() => setUnlockTarget(null)}
          onComplete={handleUnlockComplete}
        />
      ) : null}
    </>
  );
}
