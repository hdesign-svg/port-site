# Explore: X Analytics UI pattern

Branch: **`explore/x-analytics-ui`**

Restrained layout inspired by X/Twitter Analytics:

- **Detached toolbar** — labels, filters, period, export sit in open space above the box
- **Data container** — `Paper variant="outlined"` holds table or chart body only
- **Metric strip** — thin scorecard row (label + value + active top bar) attached to chart containers

## Primitives

| Component | Role |
|-----------|------|
| `HcpDetachedToolbar` | Actions/filters above container |
| `HcpDataContainer` | Bordered table/document/chart body |
| `HcpMetricStrip` | Chart lens picker (Overview) |
| `HcpChartPanel` | Strip + chart in one container |
| `HcpAnalyticsView` | Toolbar + container wrapper |

Location: `src/components/prototypes/hcp/analytics/`

## Routes (local dev)

- Accounting: http://localhost:3000/prototypes/hcp/accounting
- Expenses: http://localhost:3000/prototypes/hcp/activation

## Compare branches

```bash
git checkout main                    # or your baseline
git checkout explore/object-ui-mui   # pre-scoreboard revert baseline
git checkout explore/x-analytics-ui  # this pass
```
