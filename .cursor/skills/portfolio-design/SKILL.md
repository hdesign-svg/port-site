---
name: portfolio-design
description: >-
  Portfolio site (port-site) layout and product rules. Use when working on the
  portfolio home, about, case study sections, project rows, hero, media mockups,
  or portfolio design system / Storybook. Complements the personal elite-ui
  skill with repo-specific layout direction.
---

# Portfolio design (port-site)

Apply **elite-ui** first (`~/.cursor/skills/elite-ui/`). This skill adds portfolio-specific decisions.

## Layout direction (v2)

**Balanced two-column (Direction C refined)** — not asymmetric sidebar.

| Behavior | Rule |
|----------|------|
| Columns | ~50/50 (48/52 max); peers, not rail + content |
| Per project | Left sticky context; right scrolls media until next project |
| Canvas | Wider than v1; no bordered shell frame; full-width with outer gutter |
| Dividers | No vertical column rules; horizontal rules optional (prefer zone spacing) |
| Media | Larger mockup slots than v1 (210px phone was too small) |
| Hero | Same grid language as project rows |

## v1 archive

- Git tag: `portfolio-v1`
- Figma/screenshots for reference only — not source of truth
- Do not inherit Manuel Moreale type/color as v2 defaults

## Stack notes

- Next.js + Tailwind 4
- **Portfolio DS (v2):** `src/design-system/` — Storybook is source of truth
- **Storybook:** `npm run storybook` (port 6006); preview uses `storybook.css`, not v1 `globals.css`
- v1 tokens in `src/styles/tokens/` are archive reference only
- Light + dark via Storybook theme toolbar
- shadcn vs custom primitives: decide as components grow

## When implementing

1. Load elite-ui + this skill
2. Prefer `@portfolio/ui` / Storybook primitives once they exist
3. See `docs/portfolio-direction.md` when created (consolidated after content dumps)
