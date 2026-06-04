import type { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    navLabel: React.CSSProperties;
    tabLabel: React.CSSProperties;
    captionSemibold: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    navLabel?: React.CSSProperties;
    tabLabel?: React.CSSProperties;
    captionSemibold?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    navLabel: true;
    tabLabel: true;
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
 * Weight rule: **400 by default**. **600 for display** (page title, metric values, primary data, buttons).
 * Chrome (nav, tabs) stays 400 — active state via color, icon, underline, or background.
 *
 * Mercury-style mapping (structure → our variant):
 * | Mercury role              | Variant        | Size | Weight   | Color token    |
 * |---------------------------|----------------|------|----------|----------------|
 * | Page title                | h4             | 28px | semibold | textPrimary    |
 * | Tab / nav chrome          | tabLabel/navLabel | 14px | 400      | textMuted → textPrimary |
 * | Summary metric value      | h6             | 18px | semibold | textPrimary    |
 * | Body / table primary      | body1          | 14px | semibold | textPrimary    |
 * | Body secondary / metadata | body2          | 13px | regular  | textSecondary  |
 * | Metric / table / meta labels | caption     | 12px | regular  | textDisabled   |
 * | Buttons                   | button         | 14px | semibold | —              |
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
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: rem(40),
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: rem(28),
      fontWeight: 400,
      lineHeight: 1.25,
    },
    h5: {
      fontSize: rem(22),
      fontWeight: 400,
      lineHeight: 1.35,
    },
    h6: {
      fontSize: rem(18),
      fontWeight: 400,
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
      lineHeight: 1.15,
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
      lineHeight: 1.15,
    },
    captionSemibold: {
      fontSize: rem(12),
      fontWeight: 600,
      lineHeight: 1.33,
    },
  };
}
