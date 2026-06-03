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
 * Weight rule: **400 by default**, **600 for selected/active** (tabs, nav) and buttons.
 * Hierarchy comes from size first, weight second.
 */
export const hcpTypographyRoles = {
  pageTitle: "h4",
  cardTitle: "h5",
  sectionTitle: "h6",
  metricValue: "h6",
  label: "body1",
  labelSecondary: "body1",
  body: "body1",
  bodySecondary: "body2",
  nav: "navLabel",
  tab: "tabLabel",
  button: "button",
  caption: "caption",
  captionBold: "captionSemibold",
  tableHeader: "body1",
  tableCell: "body1",
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
      fontSize: rem(24),
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
