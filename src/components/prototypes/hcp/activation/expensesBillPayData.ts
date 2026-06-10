export type BillPayStatus = "submitted" | "scheduled" | "paid" | "failed";

export type BillPayRow = {
  id: string;
  created: string;
  vendor: string;
  invoiceNumber: string;
  due: string;
  submitted: string;
  status: BillPayStatus;
  amount: number;
};

export const expenseBills: BillPayRow[] = [
  {
    id: "bill-1",
    created: "2024-04-06",
    vendor: "Very Good Construction",
    invoiceNumber: "HCPTestInvoice123",
    due: "2024-04-24",
    submitted: "2024-04-06",
    status: "submitted",
    amount: 1,
  },
  {
    id: "bill-2",
    created: "2024-05-14",
    vendor: "Home Depot Pro",
    invoiceNumber: "INV-88421",
    due: "2024-05-28",
    submitted: "2024-05-14",
    status: "scheduled",
    amount: 1842.5,
  },
  {
    id: "bill-3",
    created: "2024-05-02",
    vendor: "City Electric Supply",
    invoiceNumber: "CES-2024-1190",
    due: "2024-05-17",
    submitted: "2024-05-02",
    status: "paid",
    amount: 3260,
  },
  {
    id: "bill-4",
    created: "2024-05-20",
    vendor: "Grainger Industrial",
    invoiceNumber: "GR-556102",
    due: "2024-06-04",
    submitted: "2024-05-20",
    status: "submitted",
    amount: 487.35,
  },
  {
    id: "bill-5",
    created: "2024-04-28",
    vendor: "Southwest Plumbing Supply",
    invoiceNumber: "SPS-44102",
    due: "2024-05-12",
    submitted: "2024-04-28",
    status: "paid",
    amount: 912.8,
  },
  {
    id: "bill-6",
    created: "2024-05-18",
    vendor: "Fleet Fuel Services",
    invoiceNumber: "FFS-MAY-018",
    due: "2024-06-01",
    submitted: "2024-05-18",
    status: "scheduled",
    amount: 624.15,
  },
  {
    id: "bill-7",
    created: "2024-05-09",
    vendor: "Pawnee HVAC Wholesale",
    invoiceNumber: "PHW-9034",
    due: "2024-05-23",
    submitted: "2024-05-09",
    status: "failed",
    amount: 2150,
  },
  {
    id: "bill-8",
    created: "2024-05-22",
    vendor: "Midwest Tool & Fastener",
    invoiceNumber: "MTF-77201",
    due: "2024-06-07",
    submitted: "2024-05-22",
    status: "submitted",
    amount: 156.99,
  },
];

export const BILL_PAY_FILTER_OPTIONS = [
  { id: "all", label: "All bills" },
  { id: "created", label: "Created" },
  { id: "due", label: "Due date" },
  { id: "status", label: "Status" },
] as const;

export type BillPayFilterOption = (typeof BILL_PAY_FILTER_OPTIONS)[number]["id"];

export function formatBillPayDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export function formatBillPayAmount(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatBillPayStatus(status: BillPayStatus) {
  switch (status) {
    case "submitted":
      return "Submitted";
    case "scheduled":
      return "Scheduled";
    case "paid":
      return "Paid";
    case "failed":
      return "Failed";
  }
}
