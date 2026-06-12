"use client";

import { useState } from "react";
import { ExpensesScene } from "@/components/prototypes/hcp/activation/ExpensesScene";
import type { ExpensesTab } from "@/components/prototypes/hcp/activation/expensesTabs";
import { UnlockModal } from "@/components/prototypes/hcp/activation/UnlockModal";
import {
  getUnlockDeck,
  type UnlockTarget,
} from "@/components/prototypes/hcp/activation/unlockDecks";
import type { MoneySubNavLabel } from "@/components/prototypes/hcp/HcpGlobalNav";
import { HcpFramedShell } from "@/components/prototypes/hcp/HcpFramedShell";

export default function HcpActivationPrototypePage() {
  const [unlockTarget, setUnlockTarget] = useState<UnlockTarget | null>(null);
  const [expensesTab, setExpensesTab] = useState<ExpensesTab>("Overview");

  const handleMoneySubNavClick = (label: MoneySubNavLabel) => {
    if (label === "Accounting") {
      setUnlockTarget("accounting");
    }
  };

  const handleUnlockComplete = () => {
    setUnlockTarget(null);
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
        <ExpensesScene activeTab={expensesTab} onTabChange={setExpensesTab} />
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
