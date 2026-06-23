"use client";

import { CaretDown, CaretRight, DownloadSimple } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { type ReactNode, useMemo, useState } from "react";
import { AccountingExportDialog } from "./AccountingExportDialog";
import { AccountingPeriodMenu } from "./AccountingPeriodMenu";
import { getStragglerUncategorizedCount } from "./accountingCategoryRules";
import { HcpTableToolbarIconButton, HcpTableZoneHeader, hcpTableToolbarActionsSx } from "../HcpTableChrome";
import { HcpSurfaceCard } from "../HcpSurfaceCard";
import { AccountingTabPanel } from "./AccountingTabPanel";
import type { AccountingPeriod } from "./accountingPeriods";
import {
  getAccountingPeriodReviewCount,
  getAccountingPeriodStatus,
  getAccountingReadiness,
} from "./accountingReadiness";
import {
  ACCOUNTING_REPORT_BUSINESS_NAME,
  buildProfitAndLossReport,
  formatReportCurrency,
  type ProfitAndLossLine,
} from "./accountingReportsData";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import { ACCOUNTING_ZONE_TITLES } from "./accountingTabs";
import {
  HCP_DATA_GRID_COLUMN_HEADER_HEIGHT,
  hcpColors,
  hcpContentSpacing,
  hcpFontWeight,
  hcpIcon,
  hcpLayout,
} from "../hcpTheme";
import { hcpTypographyRoles } from "../hcpTypography";

type AccountingReportsTabProps = {
  transactions: AccountingTransactionRow[];
  period: AccountingPeriod;
  onPeriodChange: (period: AccountingPeriod) => void;
  onReviewNow?: () => void;
};

const REPORT_DOCUMENT_MAX_WIDTH = 704;

/** QB-style zebra — muted section bands */
const reportRowMuted = "#f4f5f8";

const reportDividerSx = `1px solid ${hcpColors.borderSubtle}` as const;

const reportInsetX = hcpContentSpacing.surfaceInsetX;

/** Nested line items align under section title (chevron + gap) */
const reportLineIndent = 3;

const reportRowSx = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(6.5rem, auto)",
  alignItems: "center",
  minHeight: HCP_DATA_GRID_COLUMN_HEADER_HEIGHT,
  width: "100%",
  px: `${reportInsetX}px`,
  boxSizing: "border-box",
} as const;

const amountCellSx = {
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
} as const;

const reportCellSx = {
  variant: hcpTypographyRoles.tableCellSecondary,
  component: "span" as const,
  sx: { display: "block", lineHeight: 1.43 },
};

type ReportRowTone = "muted" | "white";

function reportRowSurface(
  tone: ReportRowTone,
  { showDivider = true, doubleDividerTop = false }: { showDivider?: boolean; doubleDividerTop?: boolean } = {},
) {
  return {
    bgcolor: tone === "muted" ? reportRowMuted : hcpColors.paper,
    borderBottom: showDivider ? reportDividerSx : undefined,
    borderTop: doubleDividerTop ? reportDividerSx : undefined,
  };
}

function ReportRow({
  tone = "white",
  showDivider = true,
  doubleDividerTop = false,
  children,
}: {
  tone?: ReportRowTone;
  showDivider?: boolean;
  doubleDividerTop?: boolean;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        ...reportRowSx,
        ...reportRowSurface(tone, { showDivider, doubleDividerTop }),
      }}
    >
      {children}
    </Box>
  );
}

function ReportLabel({
  children,
  indent = false,
  emphasis = false,
  muted = false,
}: {
  children: ReactNode;
  indent?: boolean;
  emphasis?: boolean;
  muted?: boolean;
}) {
  return (
    <Typography
      {...reportCellSx}
      color={muted ? "text.secondary" : "text.primary"}
      sx={{
        ...reportCellSx.sx,
        fontWeight: emphasis ? hcpFontWeight.semibold : hcpFontWeight.regular,
        pl: indent ? reportLineIndent : undefined,
      }}
    >
      {children}
    </Typography>
  );
}

function TableAmount({
  amount,
  emphasis = false,
  positiveAccent = false,
}: {
  amount: number;
  emphasis?: boolean;
  positiveAccent?: boolean;
}) {
  const isPositive = amount >= 0;

  return (
    <Typography
      {...reportCellSx}
      sx={{
        ...reportCellSx.sx,
        ...amountCellSx,
        fontWeight: emphasis ? hcpFontWeight.semibold : hcpFontWeight.regular,
        color:
          positiveAccent && isPositive ? hcpColors.successMain : hcpColors.textPrimary,
      }}
    >
      {formatReportCurrency(amount)}
    </Typography>
  );
}

function TableLineRow({ label, amount }: ProfitAndLossLine) {
  return (
    <ReportRow tone="white">
      <ReportLabel indent muted>
        {label}
      </ReportLabel>
      <TableAmount amount={amount} />
    </ReportRow>
  );
}

type TableSectionProps = {
  sectionId: string;
  title: string;
  lines: ProfitAndLossLine[];
  emptyLabel: string;
  subtotalAmount: number;
  expanded: boolean;
  onToggle: () => void;
};

function CollapsibleTableSection({
  sectionId,
  title,
  lines,
  emptyLabel,
  subtotalAmount,
  expanded,
  onToggle,
}: TableSectionProps) {
  const detailsId = `${sectionId}-details`;
  const totalLabel = `Total for ${title.toLowerCase()}`;

  return (
    <>
      <Box
        component="button"
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={detailsId}
        sx={{
          ...reportRowSx,
          ...reportRowSurface("muted"),
          border: "none",
          margin: 0,
          cursor: "pointer",
          textAlign: "left",
          font: "inherit",
          color: "inherit",
          "&:hover": {
            bgcolor: "#eceef2",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
          {expanded ? (
            <CaretDown size={hcpIcon.sm} weight="bold" color={hcpColors.textSecondary} aria-hidden />
          ) : (
            <CaretRight size={hcpIcon.sm} weight="bold" color={hcpColors.textSecondary} aria-hidden />
          )}
          <ReportLabel emphasis>{title}</ReportLabel>
        </Box>
        {expanded ? <Box /> : <TableAmount amount={subtotalAmount} emphasis />}
      </Box>

      {expanded ? (
        <Box id={detailsId}>
          {lines.length > 0 ? (
            lines.map((line) => <TableLineRow key={line.label} {...line} />)
          ) : (
            <TableLineRow label={emptyLabel} amount={0} />
          )}

          <ReportRow tone="white" doubleDividerTop>
            <ReportLabel indent emphasis>
              {totalLabel}
            </ReportLabel>
            <TableAmount amount={subtotalAmount} emphasis />
          </ReportRow>
        </Box>
      ) : null}
    </>
  );
}

export function AccountingReportsTab({
  transactions,
  period,
  onPeriodChange,
  onReviewNow,
}: AccountingReportsTabProps) {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  const report = useMemo(
    () => buildProfitAndLossReport(transactions, period),
    [transactions, period],
  );

  const footerCaption = useMemo(() => {
    const readiness = getAccountingReadiness(transactions, period);
    const count = readiness.sortedCount;
    const transactionLabel = count === 1 ? "transaction" : "transactions";
    return `${count} ${transactionLabel} included in this report`;
  }, [transactions, period]);

  const reviewCount = useMemo(
    () => getAccountingPeriodReviewCount(transactions, period),
    [transactions, period],
  );

  const stragglerCount = useMemo(
    () => getStragglerUncategorizedCount(transactions, period),
    [transactions, period],
  );

  const taxReady = getAccountingPeriodStatus(transactions, period) === "ready";

  const [expandedSections, setExpandedSections] = useState({
    income: true,
    expenses: true,
  });

  const toggleSection = (section: "income" | "expenses") => {
    setExpandedSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  };

  return (
    <AccountingTabPanel>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: `${hcpContentSpacing.blockGap}px`,
          alignItems: "center",
          width: "100%",
        }}
      >
        {!taxReady ? (
          <Box
            sx={{
              width: "100%",
              maxWidth: REPORT_DOCUMENT_MAX_WIDTH,
              border: `1px solid ${hcpColors.border}`,
              borderRadius: `${hcpLayout.controlRadius}px`,
              bgcolor: hcpColors.paper,
              px: `${hcpContentSpacing.surfaceInsetX}px`,
              py: 2,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold }}>
              Report not tax ready yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {reviewCount > 0
                ? `${reviewCount} transaction${reviewCount === 1 ? "" : "s"} still need review before export.`
                : "Some transactions in this period are still uncategorized."}
            </Typography>
          </Box>
        ) : null}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
        <Box
          component="article"
          aria-label={`${ACCOUNTING_ZONE_TITLES.profitAndLoss}, ${report.periodLabel}`}
          sx={{ width: "100%", maxWidth: REPORT_DOCUMENT_MAX_WIDTH }}
        >
          <HcpSurfaceCard
            flush
            toolbarLeading={<HcpTableZoneHeader label={ACCOUNTING_ZONE_TITLES.profitAndLoss} />}
            toolbarActions={
              <Box sx={hcpTableToolbarActionsSx}>
                <AccountingPeriodMenu
                  period={period}
                  transactions={transactions}
                  onPeriodChange={onPeriodChange}
                />
                <HcpTableToolbarIconButton
                  tooltip={taxReady ? "Export PDF" : "Finish review to export"}
                  aria-label="Export PDF"
                  onClick={() => setExportDialogOpen(true)}
                >
                  <DownloadSimple size={hcpIcon.md} weight="regular" />
                </HcpTableToolbarIconButton>
              </Box>
            }
          >
            <Box
              sx={{
                textAlign: "center",
                px: `${reportInsetX}px`,
                py: `${hcpContentSpacing.surfaceInsetY}px`,
                borderBottom: reportDividerSx,
              }}
            >
              <Typography
                variant={hcpTypographyRoles.labelSecondary}
                sx={{
                  fontWeight: hcpFontWeight.regular,
                  color: hcpColors.textSecondary,
                  lineHeight: 1.43,
                }}
              >
                {ACCOUNTING_REPORT_BUSINESS_NAME}
              </Typography>
              <Typography
                variant={hcpTypographyRoles.caption}
                sx={{
                  mt: 0.5,
                  lineHeight: 1.33,
                  color: hcpColors.textMuted,
                }}
              >
                {report.periodLabel}
              </Typography>
            </Box>

            <Box>
              <ReportRow tone="white">
                <Typography
                  variant={hcpTypographyRoles.tableHeader}
                  color="text.secondary"
                  component="span"
                  sx={{ display: "block", lineHeight: 1.33, textTransform: "none" }}
                >
                  Account
                </Typography>
                <Typography
                  variant={hcpTypographyRoles.tableHeader}
                  color="text.secondary"
                  component="span"
                  sx={{
                    display: "block",
                    lineHeight: 1.33,
                    textTransform: "none",
                    ...amountCellSx,
                  }}
                >
                  Total
                </Typography>
              </ReportRow>

              <CollapsibleTableSection
                sectionId="report-income"
                title={ACCOUNTING_ZONE_TITLES.moneyIn}
                lines={report.income}
                emptyLabel="No income recorded"
                subtotalAmount={report.totalIncome}
                expanded={expandedSections.income}
                onToggle={() => toggleSection("income")}
              />

              <CollapsibleTableSection
                sectionId="report-expenses"
                title={ACCOUNTING_ZONE_TITLES.moneyOut}
                lines={report.expenses}
                emptyLabel="No expenses recorded"
                subtotalAmount={report.totalExpenses}
                expanded={expandedSections.expenses}
                onToggle={() => toggleSection("expenses")}
              />

              <ReportRow tone="muted" showDivider={false}>
                <ReportLabel emphasis>{ACCOUNTING_ZONE_TITLES.netProfit}</ReportLabel>
                <TableAmount amount={report.netProfit} emphasis positiveAccent />
              </ReportRow>
            </Box>

            <Box
              sx={{
                ...reportRowSx,
                justifyContent: "center",
                borderTop: reportDividerSx,
                bgcolor: hcpColors.paper,
              }}
            >
              <Typography
                {...reportCellSx}
                color="text.secondary"
                sx={{ ...reportCellSx.sx, gridColumn: "1 / -1", textAlign: "center" }}
              >
                {footerCaption}
              </Typography>
            </Box>
          </HcpSurfaceCard>
        </Box>
        </Box>
      </Box>

      <AccountingExportDialog
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        reviewCount={reviewCount}
        stragglerCount={stragglerCount}
        onReviewNow={() => {
          setExportDialogOpen(false);
          onReviewNow?.();
        }}
        onExport={() => setExportDialogOpen(false)}
      />
    </AccountingTabPanel>
  );
}
