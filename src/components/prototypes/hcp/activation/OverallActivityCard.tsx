"use client";

import { CaretDown } from "@phosphor-icons/react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { hcpColors, hcpFontWeight, hcpIcon } from "../hcpTheme";

type ActivityView = "overall" | "breakdown";

const TIME_RANGES = ["Past 6 months", "Past 3 months", "Year to date"] as const;

const CHART_HEIGHT = 280;
const CHART_MAX = 120_000;

const overallActivity = [
  { month: "April", deposit: 15_100, spending: 120_000 },
  { month: "May", deposit: 2_600, spending: 9_400 },
  { month: "June", deposit: 2_600, spending: 0 },
  { month: "July", deposit: 2_600, spending: 0 },
  { month: "August", deposit: 2_600, spending: 0 },
  { month: "September", deposit: 2_600, spending: 0 },
] as const;

const spendingCategories = [
  { label: "Materials & supplies", amount: 42_800, color: hcpColors.spending },
  { label: "Subcontractors", amount: 58_200, color: hcpColors.primaryDark },
  { label: "Fuel & fleet", amount: 12_400, color: hcpColors.purple },
  { label: "Software & fees", amount: 3_100, color: hcpColors.primaryLight },
  { label: "Other", amount: 8_500, color: hcpColors.textMuted },
] as const;

const yAxisLabels = ["$120K", "$100,000", "$80,000", "$60,000", "$40,000", "$20,000", "0¢"] as const;

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function LegendDot({ color }: { color: string }) {
  return (
    <Box
      aria-hidden
      sx={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        bgcolor: color,
        flexShrink: 0,
      }}
    />
  );
}

function PillTabs({
  value,
  onChange,
}: {
  value: ActivityView;
  onChange: (next: ActivityView) => void;
}) {
  const tabs: { id: ActivityView; label: string }[] = [
    { id: "overall", label: "Overall Activity" },
    { id: "breakdown", label: "Spending breakdown" },
  ];

  return (
    <Box
      role="tablist"
      aria-label="Activity view"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        p: 0.5,
        bgcolor: hcpColors.surfaceMuted,
        borderRadius: 100,
        flexShrink: 0,
      }}
    >
      {tabs.map((tab) => {
        const selected = value === tab.id;

        return (
          <Box
            key={tab.id}
            component="button"
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            sx={{
              appearance: "none",
              border: 0,
              cursor: "pointer",
              minWidth: 95,
              height: 28,
              px: 2,
              borderRadius: 100,
              bgcolor: selected ? hcpColors.paper : "transparent",
              boxShadow: selected ? "0 1px 2px rgba(0, 0, 0, 0.08)" : "none",
              transition: "background-color 150ms ease, box-shadow 150ms ease",
            }}
          >
            <Typography
              variant="button"
              sx={{
                fontSize: "0.875rem",
                color: selected ? hcpColors.textPrimary : hcpColors.textSecondary,
                fontWeight: hcpFontWeight.semibold,
              }}
            >
              {tab.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

function OverallBarChart() {
  return (
    <Box
      role="img"
      aria-label="Monthly deposits and spending from April through September"
      sx={{ position: "relative", pt: 3, pb: 1, minHeight: CHART_HEIGHT + 72 }}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2, pl: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LegendDot color={hcpColors.primary} />
          <Typography variant="caption">Deposits</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LegendDot color={hcpColors.spending} />
          <Typography variant="caption">Spending</Typography>
        </Box>
      </Box>

      <Box sx={{ position: "relative", pl: "76px", pr: 2 }}>
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 16,
            top: 0,
            bottom: 32,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            pointerEvents: "none",
          }}
        >
          {yAxisLabels.map((label, index) => (
            <Box key={label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ width: 68, textAlign: "right", flexShrink: 0, lineHeight: 1 }}
              >
                {label}
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  height: index === yAxisLabels.length - 1 ? "1px" : "1px",
                  bgcolor: index === yAxisLabels.length - 1 ? hcpColors.borderInput : hcpColors.borderSubtle,
                }}
              />
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 1,
            height: CHART_HEIGHT,
            mb: 1,
            pt: 0.5,
          }}
        >
          {overallActivity.map((month) => (
            <Box
              key={month.month}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                flex: 1,
                minWidth: 0,
                maxWidth: 68,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  gap: 0.5,
                  width: "100%",
                  height: CHART_HEIGHT,
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: Math.max(4, (month.deposit / CHART_MAX) * CHART_HEIGHT),
                    bgcolor: hcpColors.primary,
                    borderRadius: "6px",
                  }}
                />
                {month.spending > 0 ? (
                  <Box
                    sx={{
                      width: 32,
                      height: Math.max(4, (month.spending / CHART_MAX) * CHART_HEIGHT),
                      bgcolor: hcpColors.spending,
                      borderRadius: "6px",
                    }}
                  />
                ) : null}
              </Box>
              <Typography variant="body2" color="text.primary" sx={{ textAlign: "center", width: "100%" }}>
                {month.month}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function SpendingBreakdownChart() {
  const maxAmount = Math.max(...spendingCategories.map((item) => item.amount));

  return (
    <Box role="img" aria-label="Spending breakdown by category for the past six months" sx={{ py: 3 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2.5, pl: 0.5 }}>
        Where job-related spend went · past 6 months
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {spendingCategories.map((category) => (
          <Box key={category.label}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 0.75 }}>
              <Typography variant="body2" color="text.primary">
                {category.label}
              </Typography>
              <Typography variant="body1" sx={{ flexShrink: 0, fontWeight: hcpFontWeight.semibold }}>
                {formatCurrency(category.amount)}
              </Typography>
            </Box>
            <Box
              sx={{
                height: 8,
                borderRadius: 100,
                bgcolor: hcpColors.surfaceMuted,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: `${(category.amount / maxAmount) * 100}%`,
                  bgcolor: category.color,
                  borderRadius: 100,
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function OverallActivityCard() {
  const [view, setView] = useState<ActivityView>("overall");
  const [timeRange, setTimeRange] = useState<(typeof TIME_RANGES)[number]>("Past 6 months");

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value as (typeof TIME_RANGES)[number]);
  };

  return (
    <Box
      sx={{
        bgcolor: hcpColors.paper,
        border: `1px solid ${hcpColors.border}`,
        borderRadius: 1.5,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1.5,
          px: 2,
          py: 1.5,
          minHeight: 64,
          borderBottom: `1px solid ${hcpColors.borderControl}`,
        }}
      >
        <Typography variant="body1" sx={{ flex: "1 1 200px", fontWeight: hcpFontWeight.semibold }}>
          Overall activity
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, justifyContent: "flex-end" }}>
          <PillTabs value={view} onChange={setView} />

          <Select
            value={timeRange}
            onChange={handleTimeRangeChange}
            size="small"
            IconComponent={(props) => <CaretDown {...props} size={hcpIcon.md} />}
            sx={{
              minWidth: 156,
              height: 40,
              bgcolor: hcpColors.paper,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: hcpColors.borderInput,
              },
              "& .MuiSelect-select": {
                py: 1,
                pl: 1.5,
                pr: "32px !important",
                color: hcpColors.textSecondary,
                fontSize: "1rem",
              },
              "& .MuiSelect-icon": {
                color: hcpColors.textSecondary,
                right: 8,
              },
            }}
          >
            {TIME_RANGES.map((range) => (
              <MenuItem key={range} value={range}>
                {range}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      <Box sx={{ px: 2, pb: 2 }}>
        {view === "overall" ? <OverallBarChart /> : <SpendingBreakdownChart />}
      </Box>
    </Box>
  );
}
