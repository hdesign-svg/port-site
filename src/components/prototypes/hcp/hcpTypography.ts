import type { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    navLabel: React.CSSProperties;
    tabLabel: React.CSSProperties;
    chromeAction: React.CSSProperties;
    dataPrimary: React.CSSProperties;
    captionSemibold: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    navLabel?: React.CSSProperties;
    tabLabel?: React.CSSProperties;
    chromeAction?: React.CSSProperties;
    dataPrimary?: React.CSSProperties;
    captionSemibold?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    navLabel: true;
    tabLabel: true;
    chromeAction: true;
    dataPrimary: true;
    captionSemibold: true;
  }
}

/** MUI htmlFontSize — 14px base (Polaris, GitHub, Stripe dashboard) */
export const hcpHtmlFontSize = 14;

export const hcpFontFamily =
  '"Open Sans", "Inter", "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

function rem(px: number) {
  return `${px / hcpHtmlFontSize}rem`;
}

/**
 * Type scale — four tiers so tabs and buttons feel related, not competing.
 *
 * | Tier | Role | Variant | Size | Weight | Examples |
 * |------|------|---------|------|--------|----------|
 * | 1 Display | Page & section titles | h4, h6 | 28–18px | 600 | Expenses, $8,742 |
 * | 2 Section chrome | Card titles, action buttons | body1+*, button | 14px | 600 | Recent activity, Add funds |
 * | 3 Data | Table & list cells | body1, body2 | 14–13px | 400 | Description, amount, date |
 * | 5 Chrome utility | Toolbar search, text buttons | button | 14px | 600 | Filter, View all |
 * | 6 Chrome inline | Compact triggers | button | 14px | 600 | Time range picker |
 * | 7 Navigation | Tabs, nav | tabLabel, navLabel | 14px | 400 | Overview tab |
 * | 8 Meta | Labels, headers | caption, body2 | 12–13px | 400 | Available, table headers |
 *
 * Buttons: text & outlined → 14px / 600 / textPrimary. Contained primary → white on fill. Hierarchy via border and fill.
 */
export const hcpTypographyRoles = {
  pageTitle: "h4",
  cardTitle: "body1",
  sectionTitle: "body1",
  metricValue: "h6",
  metricLabel: "caption",
  label: "caption",
  labelSecondary: "body2",
  body: "body1",
  bodySecondary: "body2",
  nav: "navLabel",
  tab: "tabLabel",
  chromeAction: "chromeAction",
  dataPrimary: "dataPrimary",
  button: "button",
  caption: "caption",
  captionBold: "captionSemibold",
  tableHeader: "caption",
  tableCell: "body1",
  tableCellSecondary: "body2",
} as const;

export function createHcpTypography(): NonNullable<ThemeOptions["typography"]> {
  return {
    fontFamily: hcpFontFamily,
    fontSize: hcpHtmlFontSize,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontSize: rem(40),
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: rem(28),
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h5: {
      fontSize: rem(22),
      fontWeight: 600,
      lineHeight: 1.35,
    },
    h6: {
      fontSize: rem(18),
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: rem(14),
      fontWeight: 400,
      lineHeight: 1.43,
    },
    subtitle2: {
      fontSize: rem(14),
      fontWeight: 400,
      lineHeight: 1.43,
    },
    body1: {
      fontSize: rem(14),
      fontWeight: 400,
      lineHeight: 1.43,
    },
    body2: {
      fontSize: rem(13),
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: rem(12),
      fontWeight: 400,
      lineHeight: 1.33,
    },
    button: {
      fontSize: rem(14),
      fontWeight: 600,
      lineHeight: 1.43,
      textTransform: "none",
    },
    navLabel: {
      fontSize: rem(14),
      fontWeight: 400,
      lineHeight: 1.43,
    },
    tabLabel: {
      fontSize: rem(14),
      fontWeight: 400,
      lineHeight: 1.43,
    },
    chromeAction: {
      fontSize: rem(14),
      fontWeight: 400,
      lineHeight: 1.43,
    },
    dataPrimary: {
      fontSize: rem(14),
      fontWeight: 600,
      lineHeight: 1.43,
    },
    captionSemibold: {
      fontSize: rem(12),
      fontWeight: 600,
      lineHeight: 1.33,
    },
  };
}
