export const hcpColors = {
  primary: "#0e6fbe",
  primaryDark: "#0d47a1",
  primaryLight: "#bbdefb",
  background: "#fafafa",
  paper: "#ffffff",
  textPrimary: "#212121",
  textSecondary: "#616161",
  textDark: "#424242",
  /** Shell chrome — rail edges, top bar, nav grouping dividers */
  border: "#ececec",
  /** Hairlines on open/gray surfaces — tab dividers, in-content rules */
  borderSubtle: "#f0f0f0",
  borderInput: "#bdbdbd",
  /** Rail icons — lighter than labels so type leads */
  navIcon: "#9e9e9e",
  /** Open/selected parent section icon + chevron */
  navIconSelected: "#0e6fbe",
  expensesActive: "rgba(33, 33, 33, 0.12)",
  purple: "#7e57c2",
  avatar: "#bf8600",
  successLight: "#dcf9d7",
  successMain: "#00a344",
  spending: "#d81b60",
  textDisabled: "#9e9e9e",
  textMuted: "#757575",
  surfaceMuted: "#eeeeee",
  /** Top-bar search — low-contrast outline, no fill */
  searchBorder: "#ececec",
  searchPlaceholder: "#9e9e9e",
  tableHeaderBg: "rgba(33, 33, 33, 0.08)",
} as const;

/**
 * Vertical rhythm — tight within a thought, loose between thoughts.
 * S: inside a group · M: related blocks · L: zone breaks
 */
export const hcpSpacing = {
  s: 16,
  m: 32,
  l: 40,
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
  /** Shared horizontal inset for logo, nav, footer, top bar */
  railInset: 20,
  /** Main content horizontal inset — aligns top-bar search with page column */
  contentInset: 20,
  /** Core content column — Concierge/Clay-style open field with capped width */
  contentMaxWidth: 1120,
  contentPageMargin: 32,
  /** Tab row rhythm */
  tabLabelGap: 24,
  tabIndicatorWidth: 3,
  tabLabelToIndicator: 10,
  /** Page header top — optical sync with first rail nav row (navListPaddingY + navRowPy) */
  contentHeaderSyncTop: 19,
  /** Top-bar search — fits placeholder, not full header width */
  searchFieldWidth: 320,
  /** Edge-to-edge distance between icon boxes — horizontal + vertical rhythm */
  iconGlyphGap: 20,
  navItemGap: 4,
  /** Row padding that pairs with navItemGap to yield iconGlyphGap vertically */
  navRowPy: 7,
  /** Rail nav list vertical inset — pairs with navRowPy for tab alignment */
  navListPaddingY: 12,
  /** Icon-to-label gap in rail rows (matches MUI gap: 2) */
  navIconLabelGap: 16,
  /** Where rail nav labels begin — railInset + icon + gap */
  navLabelInset: 56,
} as const;

/** Horizontal inset shared by top-bar search alignment */
export const hcpContentInsetSx = {
  px: `${hcpLayout.contentInset}px`,
} as const;

/** Top bar + tab bar horizontal bounds — search through utility icons */
export const hcpContentHeaderSx = {
  width: "100%",
  pl: `${hcpLayout.contentInset}px`,
  pr: `${hcpLayout.railInset}px`,
  boxSizing: "border-box" as const,
} as const;

/** Core content page column — max width + margin field (not edge-to-edge) */
export const hcpContentPageSx = {
  width: "100%",
  maxWidth: hcpLayout.contentMaxWidth,
  mx: `${hcpLayout.contentPageMargin}px`,
  boxSizing: "border-box" as const,
} as const;

/** Gap between major content sections (metrics, banner, chart, etc.) */
export const hcpContentSectionGapSx = {
  mb: `${hcpSpacing.l}px`,
} as const;

/** Icon sizes — 20px chrome balances with 400-weight labels */
export const hcpIcon = {
  md: 20,
  sm: 16,
  xs: 12,
} as const;

export const hcpFontWeight = {
  regular: 400,
  semibold: 600,
} as const;

/** Shared chrome bar layout — top nav, rail logo row, rail footer */
export const hcpChromeBarSx = {
  minHeight: hcpLayout.topBarHeight,
  py: `${hcpLayout.chromePaddingY}px`,
  boxSizing: "border-box" as const,
  display: "flex",
  alignItems: "center",
};
