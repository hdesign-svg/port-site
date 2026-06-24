"use client";

import { Suspense, useState } from "react";
import { AccountingScene } from "@/components/prototypes/hcp/accounting/AccountingOverviewScene";
import { UnlockModal } from "@/components/prototypes/hcp/activation/UnlockModal";
import {
  getUnlockDeck,
  type UnlockTarget,
} from "@/components/prototypes/hcp/activation/unlockDecks";
import type { MoneySubNavLabel } from "@/components/prototypes/hcp/HcpGlobalNav";
import { HcpFramedShell } from "@/components/prototypes/hcp/HcpFramedShell";

export default function HcpAccountingPrototypePage() {
  const [unlockTarget, setUnlockTarget] = useState<UnlockTarget | null>(null);

  const handleMoneySubNavClick = (label: MoneySubNavLabel) => {
    if (label === "Expenses") {
      setUnlockTarget("expenses");
    }
  };

  const handleUnlockComplete = () => {
    setUnlockTarget(null);
  };

  return (
    <>
      <HcpFramedShell
        navProps={{
          activeMoneySubNav: "Accounting",
          lockedMoneySubNav: ["Expenses"],
          onMoneySubNavClick: handleMoneySubNavClick,
        }}
      >
        <Suspense fallback={null}>
          <AccountingScene />
        </Suspense>
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
