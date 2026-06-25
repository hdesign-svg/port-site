# Portfolio direction

Consolidated after reference review and content dumps. See also `.cursor/skills/portfolio-design/SKILL.md`.

## References (inspiration, not copy)

| Source | Steal |
|--------|--------|
| Carl Barenbrug | Sticky left / scroll right; wider media |
| Shawn Farsai | Balanced columns; spacing over rules; crafted centering |
| Noah Buscher | Column proportions; full viewport feel |
| Interface Craft | Case study layout; essay layout for long-form later |
| Manuel Moreale | v1 only — do not carry type/color forward by default |

## Layout

Balanced two-column (~50/50). Sticky left per project. No vertical dividers. Wider canvas than 1200px shell.

## Design system (in progress)

- **Storybook:** `npm run storybook` → http://localhost:6006
- **Tokens + primitives:** `src/design-system/` (fresh v2 tokens; not v1 Manu/Slate)
- **Stories:** `src/design-system/components/*.stories.tsx`

## Pending

- Typography, color, motion: refine from elite-ui references
- Extract `@portfolio/ui` package when primitives stabilize
