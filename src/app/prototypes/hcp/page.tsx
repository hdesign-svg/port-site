import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const flows = [
  {
    href: "/prototypes/hcp/activation",
    title: "Activation · Expenses",
    shots: "X Analytics UI — Overview charts + Transactions · Cards · Bills",
    branch: "explore/x-analytics-ui",
  },
  {
    href: "/prototypes/hcp/activation/expenses",
    title: "Activation · Accounting",
    shots: "Unlock modal → business info → Plaid connect → done",
    branch: null,
  },
  {
    href: "/prototypes/hcp/accounting",
    title: "Basic Accounting",
    shots: "X Analytics UI — Readiness · To review · Ledger · Reports",
    branch: "explore/x-analytics-ui",
  },
  {
    href: "/prototypes/close",
    title: "Close · Self-serve accounting (explore)",
    shots: "Independent UX vision — Plaid → resolve → ledger → tax-ready → P&L",
    branch: null,
  },
];

export default function HcpPrototypesIndexPage() {
  return (
    <Box sx={{ maxWidth: 640, mx: "auto", py: 6, px: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
        HCP prototypes
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Branch: <strong>explore/x-analytics-ui</strong> — detached toolbar + data container pattern.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Run <code>git checkout explore/x-analytics-ui</code> then <code>npm run dev</code>.
      </Typography>
      <Stack spacing={2}>
        {flows.map((flow) => (
          <Link
            key={flow.href}
            href={flow.href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>{flow.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {flow.shots}
              </Typography>
            </Box>
          </Link>
        ))}
      </Stack>
    </Box>
  );
}
