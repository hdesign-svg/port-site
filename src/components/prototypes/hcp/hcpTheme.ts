import { hcpHtmlFontSize } from "./hcpTypography";

export const hcpColors = {
  primary: "#0e6fbe",
  primaryDark: "#0d47a1",
  primaryLight: "#bbdefb",
  background: "#fafafa",
  paper: "#ffffff",
  textPrimary: "#212121",
  textSecondary: "#616161",
  textDark: "#424242",
  /** Utility icon buttons — top bar, settings, education (between label and button text) */
  chromeIcon: "#424242",
  /** Shell chrome — rail edges, top bar, nav grouping dividers */
  border: "#ececec",
  /** Interactive outlines — buttons, between hairline and input */
  borderControl: "#e0e0e0",
  /** Hairlines on open/gray surfaces — tab dividers, in-content rules */
  borderSubtle: "#f0f0f0",
  borderInput: "#bdbdbd",
  /** Rail icons — lighter than labels so type leads */
  navIcon: "#9e9e9e",
  /** Open/selected parent section icon + chevron */
  navIconSelected: "#0e6fbe",
  /** Active Money sub-nav — matches tab indicator */
  navSubItemIndicator: "#0e6fbe",
  purple: "#7e57c2",
  avatar: "#bf8600",
  successLight: "#dcf9d7",
  successMain: "#00a344",
  spending: "#d81b60",
  /** Chart — money in (green) / money out (blue); approachable, not alarm red */
  chartDeposit: "#1a9d57",
  chartSpending: "#2b6cb8",
  chartDepositFill: "rgba(26, 157, 87, 0.12)",
  chartSpendingFill: "rgba(43, 108, 184, 0.12)",
  /** Breakdown bar track — lighter tint of chartSpending */
  chartSpendingTrack: "rgba(43, 108, 184, 0.06)",
  /** Chart chrome on paper — axis frame, dashed grid, tick labels */
  chartAxis: "#424242",
  chartGrid: "#c6c6c6",
  chartTickLabel: "#424242",
  textDisabled: "#9e9e9e",
  textMuted: "#757575",
  surfaceMuted: "#eeeeee",
  /** Table/chart/toolbar header bands — subtle lift from white body */
  surfaceHeader: "#f7f7f8",
  /** Top-bar search — low-contrast outline, no fill */
  searchBorder: "#ececec",
  searchPlaceholder: "#9e9e9e",
  tableHeaderBg: "rgba(33, 33, 33, 0.08)",
} as const;

/** Numeric spacing scale — prefer semantic tokens below in page layout */
export const hcpSpacing = {
  xs: 8,
  s: 16,
  m: 24,
  l: 32,
  xl: 40,
} as const;

/**
 * Core content vertical rhythm (best-in-class hierarchy).
 *
 * - inset (16): inside cards, between label and value
 * - block (24): peers in the same tab zone (summary ↔ chart, page insets)
 * - zone (32): new section type or major break (table, promo, second card row)
 */
export const hcpContentSpacing = {
  zoneInset: hcpSpacing.m,
  pageHeaderStack: hcpSpacing.m,
  tabToContent: hcpSpacing.m,
  blockGap: hcpSpacing.m,
  zoneGap: hcpSpacing.l,
  inset: hcpSpacing.s,
  /** Chart cards & data grid surfaces — shared horizontal inset */
  surfaceInsetX: 20,
  /** Chart cards & data grid surfaces — shared vertical inset */
  surfaceInsetY: hcpSpacing.s,
  /** Header border → legend / chart content */
  chartHeaderGap: hcpSpacing.m,
  /** Legend → plot */
  chartLegendGap: hcpSpacing.s,
  /** Plot → card bottom */
  chartBodyBottom: 4,
  /** Space below plot (x-axis / last row) inside the body */
  chartPlotBottom: 12,
  /** @deprecated Use inset — chart card header matches body padding */
  cardHeaderPy: 16,
} as const;

/** Sticky page header — title + tabs (zone A) */
export const hcpPageHeaderZoneSx = {
  pt: `${hcpContentSpacing.zoneInset}px`,
  pb: `${hcpContentSpacing.tabToContent}px`,
} as const;

/** Peer blocks in one tab view — e.g. summary + activity card (zone B ↔ C) */
export const hcpContentBlockStackSx = {
  display: "flex",
  flexDirection: "column",
  gap: `${hcpContentSpacing.blockGap}px`,
} as const;

export const hcpLayout = {
  globalNavWidth: 256,
  /** Shared chrome bar height (top nav, rail header, rail footer) */
  topBarHeight: 68,
  /** Vertical padding inside chrome bars */
  chromePaddingY: 14,
  /** Recording canvas — 16∶10, fits most screens; portfolio cards are taller (1024×704) */
  prototypeWidth: 1440,
  prototypeHeight: 900,
  /** Shared horizontal inset for logo, nav, footer — matches contentMargin */
  railInset: 32,
  /** Equal horizontal margin on both sides — main content column and top bar */
  contentMargin: 32,
  /** Core content column max width (optional cap inside margin field) */
  contentMaxWidth: 1120,
  /** Tab row rhythm */
  tabLabelGap: 24,
  tabIndicatorWidth: 3,
  tabIndicatorInactiveWidth: 1,
  tabLabelToIndicator: 10,
  /** Per-tab inactive underline — visible on #fafafa (Runway-style) */
  tabIndicatorInactive: "rgba(33, 33, 33, 0.14)",
  /** Horizontal gap between summary metric groups */
  metricGroupGap: 40,
  /** Top-bar global search — capped so utility icons breathe */
  searchFieldWidth: 280,
  /** Edge-to-edge distance between icon boxes — horizontal + vertical rhythm */
  iconGlyphGap: 20,
  navItemGap: 4,
  /** Row padding that pairs with navItemGap to yield iconGlyphGap vertically */
  navRowPy: 8,
  /** Rail nav list vertical inset — pairs with navRowPy for tab alignment */
  navListPaddingY: 12,
  /** Icon-to-label gap in rail rows (matches MUI gap: 2) */
  navIconLabelGap: 16,
  /** Where rail nav labels begin — railInset + icon + gap */
  navLabelInset: 56,
  /** Sub-nav label left edge — parent icon (20) + icon-label gap (16) */
  navSubLabelInset: 36,
  /** Hover fill bleeds past row edges into rail padding — does not affect row width */
  navRowHoverBleedX: 12,
  /** Default corner radius — cards, buttons, inputs, chart bars, nav rows */
  controlRadius: 8,
  /** Compact utility chrome — toolbar text buttons, search, pagination */
  chromeControlHeight: 32,
  /** Outlined/contained CTAs — pairs with summary metrics on Overview */
  actionControlHeight: 36,
  /** Icon-only chrome control — education, dismiss */
  chromeIconButtonSize: 34,
  /** Icon-only action chrome — aligns with actionControlHeight */
  actionIconButtonSize: 36,
} as const;

/** Border radius tokens — use instead of magic numbers */
export const hcpRadius = {
  control: `${hcpLayout.controlRadius}px`,
} as const;

/** Equal horizontal margin — both sides of main content column */
export const hcpContentMarginSx = {
  px: `${hcpLayout.contentMargin}px`,
} as const;

/** Top bar + page header + panel horizontal bounds */
export const hcpContentHeaderSx = {
  width: "100%",
  ...hcpContentMarginSx,
  boxSizing: "border-box" as const,
} as const;

/** Core content page column — max width inside equal margins */
export const hcpContentPageSx = {
  width: "100%",
  maxWidth: hcpLayout.contentMaxWidth,
  ...hcpContentMarginSx,
  boxSizing: "border-box" as const,
} as const;

/** Margin before a new content zone (table, teaser, promo — not peer blocks in Overview) */
export const hcpContentSectionGapSx = {
  mb: `${hcpContentSpacing.zoneGap}px`,
} as const;

/** Chart card header band */
export const hcpChartCardHeaderSx = {
  px: `${hcpContentSpacing.surfaceInsetX}px`,
  py: `${hcpContentSpacing.surfaceInsetY}px`,
  bgcolor: hcpColors.surfaceHeader,
} as const;

/** Chart card body — matches header vertical inset */
export const hcpChartCardBodySx = {
  px: `${hcpContentSpacing.surfaceInsetX}px`,
  py: `${hcpContentSpacing.surfaceInsetY}px`,
} as const;

/** @deprecated Use hcpChartCardBodySx */
export const hcpActivityChartCardBodySx = hcpChartCardBodySx;

/** @deprecated Use hcpChartCardBodySx */
export const hcpBreakdownChartCardBodySx = hcpChartCardBodySx;

/** @deprecated Use hcpChartCardHeaderSx / hcpChartCardBodySx */
export const hcpChartCardInsetSx = hcpChartCardHeaderSx;

/** 14px — shared label size for buttons, search, and inline chrome */
export const hcpChromeFontSize = `${hcpHtmlFontSize / 16}rem`;

/** Icon sizes — sm 16px pairs with 14px button labels; md 20px pairs with action controls */
export const hcpIcon = {
  md: 20,
  sm: 16,
  chrome: 14,
  xs: 12,
} as const;

export const hcpFontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
} as const;

/** Filter, export, view-all — same 14px / 600 / textPrimary as all text & outlined buttons */
export const hcpChromeActionButtonSx = {
  typography: "button",
  fontSize: hcpChromeFontSize,
  lineHeight: 1.43,
  fontWeight: hcpFontWeight.semibold,
  minWidth: 0,
  minHeight: hcpLayout.chromeControlHeight,
  px: 1.25,
  "&:hover": {
    bgcolor: "rgba(33, 33, 33, 0.04)",
  },
  "& .MuiButton-startIcon": {
    mr: 0.75,
    color: "inherit",
    "& > svg": {
      width: hcpIcon.sm,
      height: hcpIcon.sm,
    },
  },
  "& .MuiButton-endIcon": {
    ml: 0.5,
    mr: 0,
    color: "inherit",
    "& > svg": {
      width: hcpIcon.sm,
      height: hcpIcon.sm,
    },
  },
} as const;

/** @deprecated Use hcpChromeActionButtonSx */
export const hcpChartHeaderTriggerSx = hcpChromeActionButtonSx;

/** Dropdown / filter menus — shared paper chrome */
export const hcpMenuPaperSx = {
  mt: 0.5,
  minWidth: 188,
  border: `1px solid ${hcpColors.border}`,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
} as const;

/** Anchored popovers — time range custom picker, etc. */
export const hcpPopoverPaperSx = {
  ...hcpMenuPaperSx,
  p: 2,
  width: 280,
} as const;

/** Tab workspace create actions — New card, New bill */
export const hcpWorkspaceCreateButtonSx = {
  borderColor: hcpColors.borderControl,
  bgcolor: hcpColors.paper,
  minHeight: hcpLayout.chromeControlHeight,
  px: 1.25,
  fontSize: "0.875rem",
  lineHeight: 1.43,
  fontWeight: hcpFontWeight.semibold,
  "&:hover": {
    bgcolor: hcpColors.paper,
    borderColor: hcpColors.borderInput,
  },
  "& .MuiButton-startIcon": {
    mr: 0.75,
    "& > svg": {
      width: hcpIcon.sm,
      height: hcpIcon.sm,
    },
  },
} as const;

/** Outlined CTAs — same label color as text buttons; border differentiates */
export const hcpSecondaryButtonSx = {
  borderColor: hcpColors.borderControl,
  bgcolor: hcpColors.paper,
  minHeight: hcpLayout.actionControlHeight,
  px: 2,
  fontSize: hcpChromeFontSize,
  lineHeight: 1.43,
  fontWeight: hcpFontWeight.semibold,
  "&:hover": {
    bgcolor: hcpColors.paper,
    borderColor: hcpColors.borderInput,
  },
} as const;

/** Contained primary — enrollment, add funds, continue */
export const hcpPrimaryButtonSx = {
  bgcolor: hcpColors.primary,
  boxShadow: "none",
  minHeight: hcpLayout.actionControlHeight,
  px: 2,
  fontSize: hcpChromeFontSize,
  lineHeight: 1.43,
  fontWeight: hcpFontWeight.semibold,
  "&:hover": {
    bgcolor: hcpColors.primaryDark,
    boxShadow: "none",
  },
} as const;

/** Bordered icon-only chrome — pairs with action buttons on Overview */
export const hcpChromeIconButtonSx = {
  width: hcpLayout.actionIconButtonSize,
  height: hcpLayout.actionIconButtonSize,
  color: hcpColors.chromeIcon,
  border: `1px solid ${hcpColors.borderControl}`,
  borderRadius: hcpRadius.control,
  bgcolor: hcpColors.paper,
  "&:hover": {
    bgcolor: hcpColors.paper,
    borderColor: hcpColors.borderInput,
  },
} as const;

/** Search fields — same 14px label size as buttons */
export const hcpSearchFieldSx = {
  width: hcpLayout.searchFieldWidth,
  flexShrink: 0,
  "& .MuiOutlinedInput-root": {
    minHeight: hcpLayout.chromeControlHeight,
    bgcolor: hcpColors.paper,
    borderRadius: hcpRadius.control,
    fontSize: hcpChromeFontSize,
    lineHeight: 1.43,
    alignItems: "center",
    transition: "border-color 0.15s ease",
    "& fieldset": {
      borderColor: hcpColors.searchBorder,
    },
    "&:hover fieldset": {
      borderColor: hcpColors.border,
    },
    "&.Mui-focused fieldset": {
      borderColor: hcpColors.border,
      borderWidth: 1,
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "inherit",
    lineHeight: "inherit",
    fontWeight: hcpFontWeight.regular,
    py: 0.75,
    "&::placeholder": {
      fontSize: "inherit",
      lineHeight: "inherit",
      fontWeight: hcpFontWeight.regular,
      color: hcpColors.searchPlaceholder,
      opacity: 1,
    },
  },
} as const;

/** Toolbar band inside a Data Grid card */
export const hcpDataGridToolbarSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  flexWrap: "wrap",
  px: `${hcpContentSpacing.surfaceInsetX}px`,
  py: `${hcpContentSpacing.surfaceInsetY}px`,
  bgcolor: hcpColors.paper,
  borderBottom: `1px solid ${hcpColors.borderSubtle}`,
} as const;

/** MUI X Data Grid — card-embedded tables */
export const hcpDataGridSx = {
  border: 0,
  bgcolor: hcpColors.paper,
  "--DataGrid-containerBackground": hcpColors.paper,
  "--DataGrid-rowBorderColor": hcpColors.borderSubtle,
  fontSize: "0.875rem",
  "& .MuiDataGrid-columnSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeaders": {
    bgcolor: hcpColors.paper,
    borderBottom: `1px solid ${hcpColors.borderSubtle}`,
  },
  "& .MuiDataGrid-columnHeader": {
    px: `${hcpContentSpacing.surfaceInsetX}px`,
    "&:focus, &:focus-within": {
      outline: "none",
    },
  },
  "& .MuiDataGrid-columnHeader--withRightBorder": {
    borderRight: "none",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontSize: "0.875rem",
    lineHeight: 1.43,
    fontWeight: hcpFontWeight.regular,
    color: hcpColors.textSecondary,
  },
  "& .MuiDataGrid-iconButtonContainer": {
    visibility: "visible",
    width: "auto",
    ml: 0.5,
  },
  "& .MuiDataGrid-sortIcon": {
    fontSize: "1rem",
    color: hcpColors.textMuted,
    opacity: 0.45,
  },
  "& .MuiDataGrid-columnHeader--sorted .MuiDataGrid-sortIcon": {
    opacity: 1,
    color: hcpColors.textSecondary,
  },
  "& .MuiDataGrid-row:hover": {
    bgcolor: "rgba(33, 33, 33, 0.02)",
  },
  "& .MuiDataGrid-cell": {
    px: `${hcpContentSpacing.surfaceInsetX}px`,
    display: "flex",
    alignItems: "center",
    whiteSpace: "normal",
    "&:focus, &:focus-within": {
      outline: "none",
    },
  },
  "& .MuiDataGrid-cell--textRight": {
    justifyContent: "flex-end",
  },
  "& .MuiDataGrid-footerContainer": {
    minHeight: 52,
    px: `${hcpContentSpacing.surfaceInsetX}px`,
    py: `${hcpContentSpacing.surfaceInsetY}px`,
    color: hcpColors.textSecondary,
    fontSize: "0.875rem",
    borderTop: "none",
    "& > div": {
      maxHeight: "100%",
    },
  },
  "& .MuiTablePagination-root": {
    color: hcpColors.textSecondary,
  },
  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
    fontSize: "0.875rem",
    color: hcpColors.textSecondary,
  },
  "& .MuiDataGrid-overlay": {
    bgcolor: hcpColors.paper,
  },
} as const;

/** Pagination prev/next — tertiary chrome icon buttons */
export const hcpDataGridPaginationIconButtonSx = {
  width: 32,
  height: 32,
  color: hcpColors.chromeIcon,
  borderRadius: hcpRadius.control,
  "&:hover": {
    bgcolor: "rgba(33, 33, 33, 0.04)",
  },
  "&.Mui-disabled": {
    color: hcpColors.textDisabled,
  },
} as const;

/** Shared chrome bar layout — top nav, rail logo row, rail footer */
export const hcpChromeBarSx = {
  minHeight: hcpLayout.topBarHeight,
  py: `${hcpLayout.chromePaddingY}px`,
  boxSizing: "border-box" as const,
  display: "flex",
  alignItems: "center",
};
