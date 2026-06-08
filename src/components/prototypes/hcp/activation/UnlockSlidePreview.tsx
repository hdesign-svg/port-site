"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { UnlockTarget } from "./unlockDecks";
import { fadeInSx, fadeUpSx, scaleXSx, scaleYSx, unlockKeyframes } from "./unlockSlideAnimation";
import { hcpColors, hcpFontWeight, hcpLayout } from "../hcpTheme";

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        bgcolor: hcpColors.background,
        borderRadius: `${hcpLayout.controlRadius}px`,
        border: `1px solid ${hcpColors.borderSubtle}`,
        p: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        ...unlockKeyframes,
      }}
    >
      {children}
    </Box>
  );
}

function PreviewChrome({ title }: { title: string }) {
  return (
    <Typography
      variant="caption"
      sx={{
        color: hcpColors.textMuted,
        fontWeight: hcpFontWeight.semibold,
        mb: 1.5,
        display: "block",
      }}
    >
      {title}
    </Typography>
  );
}

function ExpensesTransactionsPreview({ playKey }: { playKey: number }) {
  const rows = [
    { date: "Jun 2", desc: "Amazon Retail", amount: "$89.45", deposit: false },
    { date: "Jun 2", desc: "Inbound transfer", amount: "$54.32", deposit: true },
    { date: "Jun 1", desc: "Home Depot", amount: "$124.00", deposit: false },
  ];

  return (
    <PreviewFrame key={playKey}>
      <PreviewChrome title="Transactions" />
      <Box sx={{ bgcolor: hcpColors.paper, borderRadius: `${hcpLayout.controlRadius}px`, border: `1px solid ${hcpColors.borderSubtle}`, overflow: "hidden" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "72px 1fr 72px", gap: 1, px: 1.5, py: 1, bgcolor: hcpColors.tableHeaderBg }}>
          {["Date", "Description", "Amount"].map((label) => (
            <Typography key={label} variant="caption" sx={{ fontWeight: hcpFontWeight.semibold, color: hcpColors.textSecondary }}>
              {label}
            </Typography>
          ))}
        </Box>
        {rows.map((row, index) => (
          <Box
            key={row.desc}
            sx={{
              display: "grid",
              gridTemplateColumns: "72px 1fr 72px",
              gap: 1,
              px: 1.5,
              py: 1.25,
              borderTop: `1px solid ${hcpColors.borderSubtle}`,
              ...fadeUpSx(80 + index * 120),
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {row.date}
            </Typography>
            <Typography variant="caption">{row.desc}</Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: hcpFontWeight.semibold, color: row.deposit ? hcpColors.chartDeposit : hcpColors.textPrimary }}
            >
              {row.amount}
            </Typography>
          </Box>
        ))}
      </Box>
    </PreviewFrame>
  );
}

function ExpensesCardsPreview({ playKey }: { playKey: number }) {
  const rows = [
    { name: "Leslie Knope", purpose: "Petty Cash", status: "Active", limit: "$650/wk" },
    { name: "Ron Swanson", purpose: "Physical card", status: "Activate", limit: "No limit" },
  ];

  return (
    <PreviewFrame key={playKey}>
      <PreviewChrome title="Expense cards" />
      <Box sx={{ bgcolor: hcpColors.paper, borderRadius: `${hcpLayout.controlRadius}px`, border: `1px solid ${hcpColors.borderSubtle}`, overflow: "hidden" }}>
        {rows.map((row, index) => (
          <Box
            key={row.name}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 1.5,
              py: 1.25,
              borderTop: index === 0 ? "none" : `1px solid ${hcpColors.borderSubtle}`,
              ...fadeUpSx(100 + index * 160),
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="caption" sx={{ fontWeight: hcpFontWeight.semibold, display: "block" }}>
                {row.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {row.purpose}
              </Typography>
            </Box>
            <Box
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: "999px",
                bgcolor: row.status === "Active" ? hcpColors.successLight : hcpColors.chartSpendingFill,
                ...fadeInSx(420 + index * 120, 320),
              }}
            >
              <Typography variant="caption" sx={{ fontSize: 11, fontWeight: hcpFontWeight.semibold }}>
                {row.status}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
              {row.limit}
            </Typography>
          </Box>
        ))}
      </Box>
    </PreviewFrame>
  );
}

function ExpensesOverviewPreview({ playKey }: { playKey: number }) {
  const bars = [
    { label: "Payroll", width: "88%", color: hcpColors.primaryDark },
    { label: "Materials", width: "52%", color: hcpColors.chartSpending },
    { label: "Fuel", width: "24%", color: "#4894d4" },
  ];

  return (
    <PreviewFrame key={playKey}>
      <PreviewChrome title="Spending breakdown" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, flex: 1, justifyContent: "center" }}>
        {bars.map((bar, index) => (
          <Box key={bar.label}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
              {bar.label}
            </Typography>
            <Box sx={{ height: 12, borderRadius: `${hcpLayout.controlRadius / 2}px`, bgcolor: hcpColors.chartSpendingTrack, overflow: "hidden" }}>
              <Box
                sx={{
                  height: "100%",
                  width: bar.width,
                  bgcolor: bar.color,
                  borderRadius: `${hcpLayout.controlRadius / 2}px`,
                  ...scaleXSx(120 + index * 140, 680),
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </PreviewFrame>
  );
}

function ExpensesBillsPreview({ playKey }: { playKey: number }) {
  return (
    <PreviewFrame key={playKey}>
      <PreviewChrome title="Bill Pay" />
      <Box
        sx={{
          bgcolor: hcpColors.paper,
          borderRadius: `${hcpLayout.controlRadius}px`,
          border: `1px solid ${hcpColors.borderSubtle}`,
          p: 1.5,
          ...fadeUpSx(100),
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 1 }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: hcpFontWeight.semibold, display: "block" }}>
              Very Good Construction
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Due Apr 24, 2024
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ fontWeight: hcpFontWeight.semibold }}>
            $1,240.00
          </Typography>
        </Box>
        <Box
          sx={{
            alignSelf: "flex-start",
            display: "inline-flex",
            px: 1,
            py: 0.25,
            borderRadius: "999px",
            bgcolor: hcpColors.chartSpendingFill,
            ...fadeInSx(520, 360),
          }}
        >
          <Typography variant="caption" sx={{ fontSize: 11, fontWeight: hcpFontWeight.semibold, color: hcpColors.chartSpending }}>
            Submitted
          </Typography>
        </Box>
      </Box>
    </PreviewFrame>
  );
}

function AccountingReviewPreview({ playKey }: { playKey: number }) {
  const rows = ["Amazon Retail", "Idaho State Insurance", "Inbound transfer"];

  return (
    <PreviewFrame key={playKey}>
      <PreviewChrome title="Transaction review" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {rows.map((label, index) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              bgcolor: hcpColors.paper,
              border: `1px solid ${hcpColors.borderSubtle}`,
              borderRadius: `${hcpLayout.controlRadius}px`,
              px: 1.5,
              py: 1,
              ...fadeUpSx(80 + index * 130),
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                border: `2px solid ${hcpColors.primary}`,
                flexShrink: 0,
                ...fadeInSx(360 + index * 120, 280),
              }}
            />
            <Typography variant="caption">{label}</Typography>
          </Box>
        ))}
      </Box>
    </PreviewFrame>
  );
}

function AccountingCategoriesPreview({ playKey }: { playKey: number }) {
  const bars = [
    { label: "Payroll", width: "78%" },
    { label: "Materials", width: "46%" },
    { label: "Software", width: "18%" },
  ];

  return (
    <PreviewFrame key={playKey}>
      <PreviewChrome title="Spending by category" />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, flex: 1, justifyContent: "center" }}>
        {bars.map((bar, index) => (
          <Box key={bar.label}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: "block" }}>
              {bar.label}
            </Typography>
            <Box sx={{ height: 10, bgcolor: hcpColors.chartSpendingTrack, borderRadius: `${hcpLayout.controlRadius / 2}px`, overflow: "hidden" }}>
              <Box
                sx={{
                  height: "100%",
                  width: bar.width,
                  bgcolor: hcpColors.chartSpending,
                  borderRadius: `${hcpLayout.controlRadius / 2}px`,
                  ...scaleXSx(100 + index * 150, 620),
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </PreviewFrame>
  );
}

function AccountingQboPreview({ playKey }: { playKey: number }) {
  return (
    <PreviewFrame key={playKey}>
      <PreviewChrome title="QuickBooks Online" />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: `${hcpLayout.controlRadius}px`,
            bgcolor: hcpColors.chartSpendingFill,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...fadeInSx(120, 400),
          }}
        >
          <Typography sx={{ fontWeight: hcpFontWeight.semibold, color: hcpColors.chartSpending, fontSize: 13 }}>
            QBO
          </Typography>
        </Box>
        <Box sx={{ width: "60%", height: 2, bgcolor: hcpColors.borderSubtle, position: "relative", overflow: "hidden" }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: hcpColors.primary,
              ...scaleXSx(400, 720),
            }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={fadeInSx(900, 360)}>
          Syncing transactions…
        </Typography>
      </Box>
    </PreviewFrame>
  );
}

function AccountingStatementsPreview({ playKey }: { playKey: number }) {
  const months = ["July 2022", "June 2022", "May 2022"];

  return (
    <PreviewFrame key={playKey}>
      <PreviewChrome title="Statements" />
      <Box sx={{ bgcolor: hcpColors.paper, borderRadius: `${hcpLayout.controlRadius}px`, border: `1px solid ${hcpColors.borderSubtle}`, overflow: "hidden" }}>
        {months.map((month, index) => (
          <Box
            key={month}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 1.5,
              py: 1.25,
              borderTop: index === 0 ? "none" : `1px solid ${hcpColors.borderSubtle}`,
              ...fadeUpSx(90 + index * 130),
            }}
          >
            <Typography variant="caption">{month}</Typography>
            <Typography variant="caption" sx={{ color: hcpColors.primary, ...fadeInSx(380 + index * 120, 300) }}>
              Download PDF
            </Typography>
          </Box>
        ))}
      </Box>
    </PreviewFrame>
  );
}

const expensesPreviewMap = {
  transactions: ExpensesTransactionsPreview,
  cards: ExpensesCardsPreview,
  overview: ExpensesOverviewPreview,
  bills: ExpensesBillsPreview,
} as const;

const accountingPreviewMap = {
  review: AccountingReviewPreview,
  categories: AccountingCategoriesPreview,
  qbo: AccountingQboPreview,
  statements: AccountingStatementsPreview,
} as const;

type UnlockSlidePreviewProps = {
  target: UnlockTarget;
  slideId: string;
  playKey: number;
};

export function UnlockSlidePreview({ target, slideId, playKey }: UnlockSlidePreviewProps) {
  const Preview =
    target === "expenses"
      ? expensesPreviewMap[slideId as keyof typeof expensesPreviewMap]
      : accountingPreviewMap[slideId as keyof typeof accountingPreviewMap];

  if (!Preview) {
    return (
      <PreviewFrame key={playKey}>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ m: "auto" }}>
          Preview unavailable
        </Typography>
      </PreviewFrame>
    );
  }

  return <Preview playKey={playKey} />;
}
