export type UnlockTarget = "expenses" | "accounting";

export type UnlockSlide = {
  id: string;
  label: string;
};

export type UnlockDeck = {
  target: UnlockTarget;
  title: string;
  subtitle: string;
  slides: UnlockSlide[];
  enrollTitle: string;
  enrollDescription: string;
};

export const expensesUnlockDeck: UnlockDeck = {
  target: "expenses",
  title: "Control team spending",
  subtitle: "Cards, limits, and bill pay in one place.",
  slides: [
    { id: "overview", label: "Cash flow" },
    { id: "transactions", label: "Every transaction" },
    { id: "cards", label: "Spending limits" },
    { id: "bills", label: "Bill pay" },
  ],
  enrollTitle: "Enter your business information",
  enrollDescription:
    "How many employees do you currently have? If you are an owner/operator with no other employees, enter \"1\". Annual revenue can be an estimate from the previous year.",
};

export const accountingUnlockDeck: UnlockDeck = {
  target: "accounting",
  title: "Books without busywork",
  subtitle: "Categorize spend and sync QuickBooks in HCP.",
  slides: [
    { id: "review", label: "Review faster" },
    { id: "categories", label: "Track spending" },
    { id: "qbo", label: "QuickBooks sync" },
    { id: "statements", label: "Close the month" },
  ],
  enrollTitle: "Enter your business information",
  enrollDescription:
    "How many employees do you currently have? If you are an owner/operator with no other employees, enter \"1\". Annual revenue can be an estimate from the previous year.",
};

export function getUnlockDeck(target: UnlockTarget): UnlockDeck {
  return target === "expenses" ? expensesUnlockDeck : accountingUnlockDeck;
}
