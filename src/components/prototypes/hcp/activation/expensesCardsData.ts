export type ExpenseCardType = "physical" | "virtual";

export type ExpenseCardStatus = "active" | "needs_activation" | "inactive";

export type ExpenseCardRow = {
  id: string;
  cardholder: string;
  purpose: string;
  cardNumber: string;
  cardType: ExpenseCardType;
  status: ExpenseCardStatus;
  spendingLimit: string;
};

export const CARD_TYPE_FILTERS = ["all", "physical", "virtual"] as const;

export type CardTypeFilter = (typeof CARD_TYPE_FILTERS)[number];

export const CARD_TYPE_FILTER_LABELS: Record<CardTypeFilter, string> = {
  all: "All Cards",
  physical: "Physical Cards",
  virtual: "Virtual Cards",
};

export const expenseCards: ExpenseCardRow[] = [
  {
    id: "card-1",
    cardholder: "April Ludgate",
    purpose: "Petty cash",
    cardNumber: "•••• 4821",
    cardType: "virtual",
    status: "active",
    spendingLimit: "$500/wk",
  },
  {
    id: "card-2",
    cardholder: "Ron Swanson",
    purpose: "Physical card",
    cardNumber: "•••• 9134",
    cardType: "physical",
    status: "needs_activation",
    spendingLimit: "No limit",
  },
  {
    id: "card-3",
    cardholder: "Leslie Knope",
    purpose: "Department spend",
    cardNumber: "•••• 2208",
    cardType: "physical",
    status: "active",
    spendingLimit: "$650/wk",
  },
  {
    id: "card-4",
    cardholder: "Leslie Knope",
    purpose: "Events",
    cardNumber: "•••• 7712",
    cardType: "virtual",
    status: "active",
    spendingLimit: "$1,200/mo",
  },
  {
    id: "card-5",
    cardholder: "Leslie Knope",
    purpose: "Travel",
    cardNumber: "•••• 3390",
    cardType: "virtual",
    status: "inactive",
    spendingLimit: "$300/wk",
  },
  {
    id: "card-6",
    cardholder: "Leslie Knope",
    purpose: "Supplies",
    cardNumber: "•••• 8844",
    cardType: "physical",
    status: "needs_activation",
    spendingLimit: "$400/wk",
  },
  {
    id: "card-7",
    cardholder: "Tom Haverford",
    purpose: "Marketing",
    cardNumber: "•••• 5516",
    cardType: "virtual",
    status: "active",
    spendingLimit: "$750/wk",
  },
  {
    id: "card-8",
    cardholder: "Tom Haverford",
    purpose: "Physical card",
    cardNumber: "•••• 1029",
    cardType: "physical",
    status: "needs_activation",
    spendingLimit: "No limit",
  },
  {
    id: "card-9",
    cardholder: "Donna Meagle",
    purpose: "Operations",
    cardNumber: "•••• 6673",
    cardType: "physical",
    status: "active",
    spendingLimit: "$900/wk",
  },
  {
    id: "card-10",
    cardholder: "Donna Meagle",
    purpose: "Virtual card",
    cardNumber: "•••• 2945",
    cardType: "virtual",
    status: "active",
    spendingLimit: "$500/wk",
  },
];

export function filterCardsByType(rows: ExpenseCardRow[], filter: CardTypeFilter) {
  if (filter === "all") {
    return rows;
  }

  return rows.filter((row) => row.cardType === filter);
}

export function formatCardTypeLabel(cardType: ExpenseCardType) {
  return cardType === "physical" ? "Physical" : "Virtual";
}
