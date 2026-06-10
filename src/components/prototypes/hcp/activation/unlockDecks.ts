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
  title: "Unlock Expenses",
  subtitle: "Take control of team spending with cards, limits, and real-time visibility.",
  slides: [
    { id: "overview", label: "Understand cash flow" },
    { id: "transactions", label: "See every transaction" },
    { id: "cards", label: "Control team spending" },
    { id: "bills", label: "Pay and track bills" },
  ],
  enrollTitle: "Enter your business information",
  enrollDescription:
    "How many employees do you currently have? If you are an owner/operator with no other employees, enter \"1\". Annual revenue can be an estimate from the previous year.",
};

export const accountingUnlockDeck: UnlockDeck = {
  target: "accounting",
  title: "Unlock Accounting",
  subtitle: "Review transactions, categorize spend, and close the books without leaving Housecall Pro.",
  slides: [
    { id: "review", label: "Review transactions faster" },
    { id: "categories", label: "See where money goes" },
    { id: "qbo", label: "Reconcile with QuickBooks" },
    { id: "statements", label: "Close the books" },
  ],
  enrollTitle: "Enter your business information",
  enrollDescription:
    "How many employees do you currently have? If you are an owner/operator with no other employees, enter \"1\". Annual revenue can be an estimate from the previous year.",
};

export function getUnlockDeck(target: UnlockTarget): UnlockDeck {
  return target === "expenses" ? expensesUnlockDeck : accountingUnlockDeck;
}
