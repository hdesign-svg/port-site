"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { UnlockTarget } from "./unlockDecks";
import { fadeInSx, fadeUpSx, scaleXSx, scaleYSx, unlockKeyframes } from "./unlockSlideAnimation";
import { HcpStatusTag } from "../HcpStatusTag";
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

function MiniTableHeader({ columns }: { columns: string[] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
        gap: 1,
        px: 1.5,
        py: 1,
        bgcolor: hcpColors.tableHeaderBg,
      }}
    >
      {columns.map((label) => (
        <Typography key={label} variant="caption" sx={{ fontWeight: hcpFontWeight.semibold, color: hcpColors.textSecondary }}>
          {label}
        </Typography>
      ))}
    </Box>
  );
}

function ExpensesTransactionsPreview({ playKey }: { playKey: number }) {
  const rows = [
    { date: "May 28", desc: "Home Depot", category: "Materials", amount: "$142.50" },
    { date: "May 27", desc: "ACH Transfer", category: "Deposit", amount: "$3,200.00" },
    { date: "May 26", desc: "Shell Oil", category: "Fuel", amount: "$68.40" },
  ];

  return (
    <PreviewFrame key={playKey}>
      <PreviewChrome title="Transactions" />
      <Box sx={{ bgcolor: hcpColors.paper, borderRadius: `${hcpLayout.controlRadius}px`, border: `1px solid ${hcpColors.borderSubtle}`, overflow: "hidden" }}>
        <MiniTableHeader columns={["Date", "Description", "Category", "Amount"]} />
        {rows.map((row, index) => (
          <Box
            key={row.desc}
            sx={{
              display: "grid",
              gridTemplateColumns: "56px 1fr 64px 56px",
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
            <Typography variant="caption" noWrap>
              {row.desc}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {row.category}
            </Typography>
            <Typography variant="caption" sx={{ fontVariantNumeric: "tabular-nums" }}>
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
    { name: "Leslie Knope", meta: "Department spend · •••• 2208", status: "Active" },
    { name: "Ron Swanson", meta: "Physical card · •••• 9134", status: "Inactive" },
  ];

  return (
    <PreviewFrame key={playKey}>
      <PreviewChrome title="Expense cards" />
      <Box sx={{ bgcolor: hcpColors.paper, borderRadius: `${hcpLayout.controlRadius}px`, border: `1px solid ${hcpColors.borderSubtle}`, overflow: "hidden" }}>
        <Box sx={{ px: 1.5, py: 1.25, borderBottom: `1px solid ${hcpColors.borderSubtle}` }}>
          <Typography variant="caption" sx={{ fontWeight: hcpFontWeight.semibold }}>
            5 cards
          </Typography>
        </Box>
        <MiniTableHeader columns={["Cardholder", "Purpose", "Status"]} />
        {rows.map((row, index) => (
          <Box
            key={row.name}
            sx={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr 64px",
              gap: 1,
              alignItems: "center",
              px: 1.5,
              py: 1.25,
              borderTop: `1px solid ${hcpColors.borderSubtle}`,
              ...fadeUpSx(100 + index * 160),
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="caption" sx={{ fontWeight: hcpFontWeight.regular, display: "block" }} noWrap>
                {row.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }} noWrap>
                {row.meta.split(" · ")[1]}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" noWrap>
              {row.meta.split(" · ")[0]}
            </Typography>
            <HcpStatusTag
              label={row.status}
              tone={row.status === "Active" ? "success" : "neutral"}
            />
          </Box>
        ))}
      </Box>
    </PreviewFrame>
  );
}

function ExpensesOverviewPreview({ playKey }: { playKey: number }) {
  const months = ["Apr", "May", "Jun"];
  const deposits = [68, 58, 62];
  const spending = [55, 51, 54];

  return (
    <PreviewFrame key={playKey}>
      <PreviewChrome title="Activity" />
      <Box
        sx={{
          bgcolor: hcpColors.paper,
          borderRadius: `${hcpLayout.controlRadius}px`,
          border: `1px solid ${hcpColors.borderSubtle}`,
          p: 1.5,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, mb: 1.5 }}>
          {[
            { label: "Deposits", color: hcpColors.chartDeposit },
            { label: "Spending", color: hcpColors.chartSpending },
          ].map((item, index) => (
            <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 0.5, ...fadeInSx(80 + index * 100, 280) }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "2px", bgcolor: item.color }} />
              <Typography variant="caption" sx={{ fontSize: 10 }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 1.5, px: 0.5, pb: 0.5 }}>
          {months.map((month, index) => (
            <Box key={month} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
              <Box sx={{ display: "flex", alignItems: "flex-end", gap: 0.5, height: 72, width: "100%", justifyContent: "center" }}>
                <Box
                  sx={{
                    width: "38%",
                    height: `${deposits[index]}%`,
                    bgcolor: hcpColors.chartDeposit,
                    borderRadius: `${hcpLayout.controlRadius / 2}px`,
                    ...scaleYSx(120 + index * 100, 520),
                  }}
                />
                <Box
                  sx={{
                    width: "38%",
                    height: `${spending[index]}%`,
                    bgcolor: hcpColors.chartSpending,
                    borderRadius: `${hcpLayout.controlRadius / 2}px`,
                    ...scaleYSx(180 + index * 100, 520),
                  }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
                {month}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </PreviewFrame>
  );
}

function ExpensesBillsPreview({ playKey }: { playKey: number }) {
  return (
    <PreviewFrame key={playKey}>
      <PreviewChrome title="Bills" />
      <Box sx={{ bgcolor: hcpColors.paper, borderRadius: `${hcpLayout.controlRadius}px`, border: `1px solid ${hcpColors.borderSubtle}`, overflow: "hidden", ...fadeUpSx(100) }}>
        <MiniTableHeader columns={["Vendor", "Due", "Status", "Amount"]} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 64px 72px 48px",
            gap: 1,
            alignItems: "center",
            px: 1.5,
            py: 1.25,
            borderTop: `1px solid ${hcpColors.borderSubtle}`,
            ...fadeUpSx(260),
          }}
        >
          <Typography variant="caption" sx={{ display: "block" }} noWrap>
            Very Good Construction
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
            Apr 24
          </Typography>
          <Box sx={{ ...fadeInSx(520, 320) }}>
            <HcpStatusTag label="Submitted" tone="primary" />
          </Box>
          <Typography variant="caption" sx={{ fontVariantNumeric: "tabular-nums" }}>
            $1.00
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
  overview: ExpensesOverviewPreview,
  transactions: ExpensesTransactionsPreview,
  cards: ExpensesCardsPreview,
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
