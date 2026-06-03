import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { hcpColors } from "../hcpTheme";

export function LegalDisclaimer() {
  return (
    <Typography
      sx={{
        fontSize: 12,
        lineHeight: 1.33,
        color: hcpColors.textSecondary,
        maxWidth: 477,
      }}
    >
      Housecall Pro Expense Card is a Visa Commercial Credit Card, powered by
      Stripe and issued by Celtic Bank and is subject to approval. Housecall Pro
      partners with{" "}
      <Link
        href="https://stripe.com/"
        target="_blank"
        rel="noopener noreferrer"
        underline="always"
        sx={{ color: hcpColors.textSecondary, fontSize: "inherit" }}
      >
        Stripe Payments Company
      </Link>{" "}
      for money transmission services and account services with funds held at
      Fifth Third Bank, member FDIC.
    </Typography>
  );
}
