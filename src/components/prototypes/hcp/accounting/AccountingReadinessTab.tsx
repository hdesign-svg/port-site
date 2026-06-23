"use client";

import { ArrowRight, CheckCircle, CircleHalf } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import { HcpAnalyticsView, HcpDataContainer, HcpDetachedToolbar } from "../analytics";
import { HcpSegmentControl } from "../HcpSegmentControl";
import { HcpStatusTag } from "../HcpStatusTag";
import { HcpTableZoneHeader } from "../HcpTableChrome";
import { AccountingTabPanel } from "./AccountingTabPanel";
import { buildReviewGroups } from "./accountingReviewGroups";
import type { AccountingPeriod } from "./accountingPeriods";
import {
  getAccountingPeriodStatus,
  getAccountingReadiness,
  getTaxYearReadiness,
  type AccountingPeriodSummary,
} from "./accountingReadiness";
import { buildProfitAndLossReport, formatReportCurrency } from "./accountingReportsData";
import type { AccountingTransactionRow } from "./accountingTransactionData";
import {
  hcpColors,
  hcpContentSpacing,
  hcpFontWeight,
  hcpIcon,
  hcpPrimaryButtonSx,
  hcpRadius,
  hcpSecondaryButtonSx,
} from "../hcpTheme";

type ReadinessScope = "year" | "month";

type AccountingReadinessTabProps = {
  transactions: AccountingTransactionRow[];
  selectedPeriod: AccountingPeriod;
  onPeriodChange: (period: AccountingPeriod) => void;
  onOpenToReview: (period: AccountingPeriod, focus?: boolean) => void;
  onOpenLedger: (period: AccountingPeriod) => void;
  onOpenReports: (period: AccountingPeriod) => void;
};

function ReadinessMeter({
  percent,
  taxReady,
  label,
}: {
  percent: number;
  taxReady: boolean;
  label: string;
}) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: hcpColors.textMuted, display: "block", mb: 0.5 }}>
        {label}
      </Typography>
      <Typography
        variant="h3"
        sx={{ fontWeight: hcpFontWeight.semibold, fontVariantNumeric: "tabular-nums", lineHeight: 1.1 }}
      >
        {percent}%
      </Typography>
      <LinearProgress
        variant="determinate"
        value={percent}
        aria-label={`${percent} percent categorized`}
        sx={{
          mt: 1.5,
          height: 8,
          borderRadius: 999,
          bgcolor: hcpColors.borderSubtle,
          "& .MuiLinearProgress-bar": {
            borderRadius: 999,
            bgcolor: taxReady ? hcpColors.successMain : hcpColors.primary,
          },
        }}
      />
    </Box>
  );
}

function StatBlock({ label, value }: { label: string; value: string | number }) {
  return (
    <Box>
      <Typography variant="caption" sx={{ color: hcpColors.textMuted, display: "block" }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: hcpFontWeight.semibold, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </Typography>
    </Box>
  );
}

function PeriodStatusTag({ summary }: { summary: AccountingPeriodSummary }) {
  if (summary.status === "ready") {
    return (
      <HcpStatusTag
        label="Tax ready"
        tone="success"
        icon={<CheckCircle size={hcpIcon.sm} weight="fill" aria-hidden />}
      />
    );
  }

  if (summary.reviewCount > 0) {
    return (
      <HcpStatusTag
        label={`${summary.reviewCount} to review`}
        tone="primary"
        icon={<CircleHalf size={hcpIcon.sm} weight="fill" aria-hidden />}
      />
    );
  }

  return <HcpStatusTag label="Needs categories" tone="neutral" />;
}

function PeriodMonthCard({
  summary,
  selected,
  onSelect,
}: {
  summary: AccountingPeriodSummary;
  selected: boolean;
  onSelect: () => void;
}) {
  const { period, readiness } = summary;

  return (
    <Box
      component="button"
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      sx={{
        display: "block",
        width: "100%",
        textAlign: "left",
        p: 2,
        border: `1px solid ${selected ? hcpColors.primary : hcpColors.border}`,
        borderRadius: hcpRadius.control,
        bgcolor: selected ? "rgba(14, 111, 190, 0.04)" : hcpColors.paper,
        cursor: "pointer",
        transition: "border-color 0.15s ease, background-color 0.15s ease",
        "&:hover": {
          borderColor: hcpColors.primary,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1, mb: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold }}>
          {period.shortLabel}
        </Typography>
        <PeriodStatusTag summary={summary} />
      </Box>
      <LinearProgress
        variant="determinate"
        value={readiness.readyPercent}
        aria-hidden
        sx={{
          height: 4,
          borderRadius: 999,
          bgcolor: hcpColors.borderSubtle,
          "& .MuiLinearProgress-bar": {
            borderRadius: 999,
            bgcolor: summary.status === "ready" ? hcpColors.successMain : hcpColors.primary,
          },
        }}
      />
      <Typography variant="caption" sx={{ color: hcpColors.textMuted, mt: 0.75, display: "block" }}>
        {readiness.sortedCount} of {readiness.periodTotal} categorized
      </Typography>
    </Box>
  );
}

function ActionRow({
  title,
  detail,
  actionLabel,
  onAction,
}: {
  title: string;
  detail: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 2,
        py: 1.5,
        borderBottom: `1px solid ${hcpColors.borderSubtle}`,
        "&:last-of-type": { borderBottom: 0 },
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold }}>
          {title}
        </Typography>
        <Typography variant="caption" sx={{ color: hcpColors.textMuted, display: "block", mt: 0.25 }}>
          {detail}
        </Typography>
      </Box>
      <Button
        size="small"
        variant="text"
        endIcon={<ArrowRight size={hcpIcon.sm} weight="regular" />}
        onClick={onAction}
        sx={{ textTransform: "none", flexShrink: 0, color: hcpColors.primary }}
      >
        {actionLabel}
      </Button>
    </Box>
  );
}

export function AccountingReadinessTab({
  transactions,
  selectedPeriod,
  onPeriodChange,
  onOpenToReview,
  onOpenLedger,
  onOpenReports,
}: AccountingReadinessTabProps) {
  const [scope, setScope] = useState<ReadinessScope>("year");
  const [focusedPeriod, setFocusedPeriod] = useState<AccountingPeriod>(selectedPeriod);

  const taxYear = useMemo(() => getTaxYearReadiness(transactions), [transactions]);
  const monthReadiness = useMemo(
    () => getAccountingReadiness(transactions, focusedPeriod),
    [focusedPeriod, transactions],
  );
  const monthStatus = useMemo(
    () => getAccountingPeriodStatus(transactions, focusedPeriod),
    [focusedPeriod, transactions],
  );
  const monthGroups = useMemo(
    () => buildReviewGroups(transactions, focusedPeriod),
    [focusedPeriod, transactions],
  );
  const monthReport = useMemo(
    () => buildProfitAndLossReport(transactions, focusedPeriod),
    [focusedPeriod, transactions],
  );

  const taxYearReady = taxYear.periodsReady === taxYear.periodsTotal && taxYear.periodTotal > 0;
  const monthTaxReady = monthStatus === "ready";
  const attentionMonths = taxYear.periodSummaries.filter((item) => item.status !== "ready");

  const handleScopeChange = (nextScope: ReadinessScope) => {
    setScope(nextScope);
    if (nextScope === "month") {
      setFocusedPeriod(selectedPeriod);
    }
  };

  const handleSelectMonth = (period: AccountingPeriod) => {
    setFocusedPeriod(period);
    onPeriodChange(period);
    setScope("month");
  };

  return (
    <AccountingTabPanel>
      <Box sx={{ display: "flex", flexDirection: "column", gap: `${hcpContentSpacing.blockGap}px` }}>
        <HcpDetachedToolbar
          leading={
            <Box>
              <Typography variant="body2" sx={{ fontWeight: hcpFontWeight.semibold }}>
                {scope === "year" ? taxYear.label : focusedPeriod.label}
              </Typography>
              <Typography variant="caption" sx={{ color: hcpColors.textMuted }}>
                {scope === "year"
                  ? "Your books health across the year — pick a month or jump to work."
                  : "Month detail — categorize and close, then check the report."}
              </Typography>
            </Box>
          }
          actions={
            <HcpSegmentControl
              value={scope}
              onChange={handleScopeChange}
              aria-label="Readiness scope"
              options={[
                { value: "year", label: "Tax year" },
                { value: "month", label: focusedPeriod.shortLabel },
              ]}
            />
          }
        />

        {scope === "year" ? (
          <>
            <HcpAnalyticsView leading={<HcpTableZoneHeader label="Year health" />}>
              <HcpDataContainer sx={{ px: `${hcpContentSpacing.surfaceInsetX}px`, py: 2.5 }}>
                <ReadinessMeter percent={taxYear.readyPercent} taxReady={taxYearReady} label="Categorized" />
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 2,
                    mt: 3,
                  }}
                >
                  <StatBlock label="Periods tax ready" value={`${taxYear.periodsReady}/${taxYear.periodsTotal}`} />
                  <StatBlock label="To review now" value={taxYear.needsYouCount} />
                  <StatBlock label="Transactions sorted" value={taxYear.sortedCount} />
                  <StatBlock label="In tax year" value={taxYear.periodTotal} />
                </Box>
                {taxYearReady ? (
                  <Box sx={{ mt: 2.5 }}>
                    <HcpStatusTag
                      label="Tax year ready to export"
                      tone="success"
                      icon={<CheckCircle size={hcpIcon.sm} weight="fill" aria-hidden />}
                    />
                  </Box>
                ) : null}
              </HcpDataContainer>
            </HcpAnalyticsView>

            <HcpAnalyticsView leading={<HcpTableZoneHeader label="By month" />}>
              <HcpDataContainer sx={{ px: `${hcpContentSpacing.surfaceInsetX}px`, py: 2.5 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" },
                    gap: 1.5,
                  }}
                >
                  {taxYear.periodSummaries.map((summary) => (
                    <PeriodMonthCard
                      key={summary.period.prefix}
                      summary={summary}
                      selected={focusedPeriod.prefix === summary.period.prefix}
                      onSelect={() => handleSelectMonth(summary.period)}
                    />
                  ))}
                </Box>
              </HcpDataContainer>
            </HcpAnalyticsView>

            <HcpAnalyticsView leading={<HcpTableZoneHeader label="What needs you" />}>
              <HcpDataContainer sx={{ px: `${hcpContentSpacing.surfaceInsetX}px`, py: 2.5 }}>
                <Box>
                  {attentionMonths.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                      Every month is tax ready. View reports or browse transactions anytime.
                    </Typography>
                  ) : (
                    attentionMonths.map((summary) => (
                      <ActionRow
                        key={summary.period.prefix}
                        title={summary.period.label}
                        detail={
                          summary.reviewCount > 0
                            ? `${summary.reviewCount} in review window · ${summary.readiness.readyPercent}% categorized`
                            : `${summary.readiness.periodTotal - summary.readiness.sortedCount} uncategorized outside review`
                        }
                        actionLabel="Review"
                        onAction={() => {
                          handleSelectMonth(summary.period);
                          onOpenToReview(summary.period, summary.reviewCount > 0);
                        }}
                      />
                    ))
                  )}
                </Box>
                <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                  <Button
                    variant="contained"
                    disabled={taxYear.needsYouCount === 0}
                    onClick={() => {
                      const current = taxYear.periodSummaries.find((item) => item.period.isCurrent);
                      if (current) {
                        onOpenToReview(current.period, true);
                      }
                    }}
                    sx={{ ...hcpPrimaryButtonSx, textTransform: "none" }}
                  >
                    {taxYear.needsYouCount > 0 ? `Resolve ${taxYear.needsYouCount} items` : "All caught up"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => onOpenReports(selectedPeriod)}
                    sx={{ ...hcpSecondaryButtonSx, textTransform: "none" }}
                  >
                    View profit & loss
                  </Button>
                </Box>
              </HcpDataContainer>
            </HcpAnalyticsView>
          </>
        ) : (
          <>
            <HcpAnalyticsView leading={<HcpTableZoneHeader label={focusedPeriod.label} />}>
              <HcpDataContainer sx={{ px: `${hcpContentSpacing.surfaceInsetX}px`, py: 2.5 }}>
                <ReadinessMeter
                  percent={monthReadiness.readyPercent}
                  taxReady={monthTaxReady}
                  label="Month categorized"
                />
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 2,
                    mt: 3,
                  }}
                >
                  <StatBlock label="To review" value={monthReadiness.needsYouCount} />
                  <StatBlock label="Vendor groups" value={monthGroups.length} />
                  <StatBlock label="Sorted" value={monthReadiness.sortedCount} />
                  <StatBlock label="In month" value={monthReadiness.periodTotal} />
                </Box>
                {monthTaxReady ? (
                  <Box sx={{ mt: 2.5 }}>
                    <HcpStatusTag
                      label="Tax ready"
                      tone="success"
                      icon={<CheckCircle size={hcpIcon.sm} weight="fill" aria-hidden />}
                    />
                  </Box>
                ) : null}
              </HcpDataContainer>
            </HcpAnalyticsView>

            <HcpAnalyticsView leading={<HcpTableZoneHeader label="This month" />}>
              <HcpDataContainer sx={{ px: `${hcpContentSpacing.surfaceInsetX}px`, py: 2.5 }}>
                <Typography variant="caption" sx={{ color: hcpColors.textMuted }}>
                  Net profit preview
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: hcpFontWeight.semibold,
                    fontVariantNumeric: "tabular-nums",
                    color: monthReport.netProfit >= 0 ? hcpColors.successMain : hcpColors.spending,
                    mt: 0.5,
                  }}
                >
                  {formatReportCurrency(monthReport.netProfit)}
                </Typography>
                <Typography variant="caption" sx={{ color: hcpColors.textMuted, display: "block", mt: 2, mb: 1 }}>
                  Next steps
                </Typography>
                {monthReadiness.needsYouCount > 0 ? (
                  <ActionRow
                    title={`${monthGroups.length} vendor group${monthGroups.length === 1 ? "" : "s"} to categorize`}
                    detail={`${monthReadiness.needsYouCount} transactions in the review window`}
                    actionLabel="Start review"
                    onAction={() => onOpenToReview(focusedPeriod, true)}
                  />
                ) : null}
                <ActionRow
                  title="Ledger"
                  detail={`${monthReadiness.periodTotal} in ${focusedPeriod.shortLabel}`}
                  actionLabel="Open ledger"
                  onAction={() => onOpenLedger(focusedPeriod)}
                />
                <ActionRow
                  title="Profit & loss"
                  detail={monthTaxReady ? "Ready to export" : "Finish categorizing to export"}
                  actionLabel="View report"
                  onAction={() => onOpenReports(focusedPeriod)}
                />
                {monthReadiness.needsYouCount > 0 ? (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => onOpenToReview(focusedPeriod, true)}
                    sx={{ ...hcpPrimaryButtonSx, textTransform: "none", mt: 2 }}
                  >
                    Resolve {monthGroups.length} group{monthGroups.length === 1 ? "" : "s"}
                  </Button>
                ) : null}
              </HcpDataContainer>
            </HcpAnalyticsView>
          </>
        )}
      </Box>
    </AccountingTabPanel>
  );
}
