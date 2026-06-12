"use client";

import { useState } from "react";
import { AccountingScene } from "@/components/prototypes/hcp/accounting/AccountingOverviewScene";
import { UnlockModal } from "@/components/prototypes/hcp/activation/UnlockModal";
import { getUnlockDeck } from "@/components/prototypes/hcp/activation/unlockDecks";
import type { MoneySubNavLabel } from "@/components/prototypes/hcp/HcpGlobalNav";
import { HcpFramedShell } from "@/components/prototypes/hcp/HcpFramedShell";

export default function HcpExpensesActivationPrototypePage() {
  const [unlockOpen, setUnlockOpen] = useState(false);

  const handleMoneySubNavClick = (label: MoneySubNavLabel) => {
    if (label === "Expenses") {
      setUnlockOpen(true);
    }
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
        <AccountingScene />
      </HcpFramedShell>

      {unlockOpen ? (
        <UnlockModal
          open
          deck={getUnlockDeck("expenses")}
          onClose={() => setUnlockOpen(false)}
          onComplete={() => setUnlockOpen(false)}
        />
      ) : null}
    </>
  );
}
