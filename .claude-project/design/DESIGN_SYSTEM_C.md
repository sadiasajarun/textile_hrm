# DESIGN_SYSTEM_C — "Command Center"

**Archetype:** Data-Dense Operations Console (light canvas, dark navigation)
**Reference company:** Linear and Datadog-style operations consoles (precise, dense, status-forward)
**One-liner:** The Ministry's operations room: everything measurable at a glance, exceptions impossible to miss.
**Generated with:** `analyze-design/scripts/search.py` (operations / data-dense query → "Data-Dense Dashboard"), re-anchored to the national green with a light canvas [PRD §4.9, Brief §41 "light dashboard backgrounds"]

## Style DNA (prefix for every generation prompt)
> Command Center: cool slate canvas #EDF1F5 with crisp white panels, a solid 1px #D3DBE4 border and a crisp small shadow, 8px corners. IBM Plex Sans (700 headings with tight tracking, 400/500 body) with Noto Sans Bengali; tabular figures everywhere. Navy-ink sidebar #0B1B2B with an emerald active bar #2BC48A. Primary green #00744F. Status shown as solid filled badges with white text and an icon. Compact density: 16px panel padding, 40px table rows, KPI cards with sparklines and deltas, a live indicator dot, keyboard-shortcut hints. Red is reserved for exceptions.

## Color Tokens

| Token | Hex | Usage | Contrast |
|---|---|---|---|
| `--bg` | `#EDF1F5` | Page canvas (cool slate tint) | — |
| `--surface` | `#FFFFFF` | Panels | — |
| `--surface-2` | `#F6F8FA` | Table header, inputs, hover | — |
| `--ink` | `#0B1726` | Headings, body | 15.9:1 on bg |
| `--ink-2` | `#3D4B5C` | Secondary | 7.8:1 on bg |
| `--ink-3` | `#55636F` | Captions | 5.4:1 on bg |
| `--line` | `#D3DBE4` | Solid 1px borders | — |
| `--primary` | `#00744F` | CTA, links, active | ≥ 4.9:1 on bg |
| `--primary-hover` | `#005E40` | Hover | — |
| `--primary-tint` | `#E2F3EC` | Selection | — |
| `--live` | `#2BC48A` | Live dot, sidebar active bar (non-text, on navy) | — |
| `--flag-red` | `#F42A41` | Flag mark only | non-text |
| `--success` | `#027A48` | Solid badge background | white text 5.4:1 |
| `--warning` | `#B54708` | Solid badge background | white text 5.4:1 |
| `--danger` | `#C8281C` | Solid badge background, exception rows | white text 5.6:1 |
| `--info` | `#1D4ED8` | Solid badge background | white text 6.7:1 |
| `--neutral` | `#55636F` | Solid badge background | white text 6.2:1 |

**Map choropleth (sequential + exception):** good `#1F9D6F`, watch `#F2B233`, attention `#E0472F`, no data `#DCE3EA`, borders `#FFFFFF`.

## Typography
- **Latin:** IBM Plex Sans 400 / 500 / 600 / 700 · **Bangla:** Noto Sans Bengali 400 / 500 / 600 / 700.
- **Headings:** 700, tracking −0.015em. H1 28/36 · H2 22/30 · H3 18/26 · H4 15/22 (compact product scale). Public display 48/56.
- **Body:** 14/22 (app) and 16/26 (public). Small 13/20 · Caption 12/16.
- **KPI figures:** 28/34, weight 700, tabular-nums. Units in `--ink-3` at 14px.
- **Shortcut hints:** monospace 11px in a 1px bordered key cap (for example `⌘K`).

## Shape, Depth, Spacing
- **Radius:** 8px panels · 6px inputs and buttons · 4px badges.
- **Shadow:** `0 1px 0 rgba(11,23,38,.04), 0 2px 8px rgba(11,23,38,.06)`.
- **Border:** 1px solid `--line` on every panel.
- **Spacing:** panel padding 16px, gap 16px, public section padding 72px.
- **Density:** compact; table row 40px; KPI grid of 5 per row on desktop.

## Components
- **Identity header (public):** navy `#0B1B2B` 40px top strip with flag mark, "Government of the People's Republic of Bangladesh · Ministry of Textiles and Jute", and the language toggle. Below it, a white nav bar.
- **Buttons:**
  - Primary: `--primary` fill, 36px (app) / 44px (public), 6px radius.
  - Secondary: white with a 1px `--line` border.
  - Ghost: icon buttons with tooltips.
- **Status tag:** solid badge with a white icon and white text, 4px radius, 12px/600 (for example `▲ Critical` on `--danger`).
- **KPI card:** compact white panel; label plus an info icon; 28px figure; delta badge; 24px-high sparkline; a "Live" dot for real-time metrics.
- **Sidebar:** `#0B1B2B`, 248px. Group labels are 11px uppercase `#8FA0B3`; items `#C7D2DE`. The active item has a `#13293F` fill and a 3px `#2BC48A` left bar. A collapsed 64px rail on tablet.
- **Top bar:** white, 56px; a command-search field showing `⌘K`, a live clock "Last updated 09:42", bell, language, avatar.
- **Scope bar:** a segmented breadcrumb with chevrons and dropdown carets, plus filter chips.
- **Tables:** dense, sticky header `--surface-2`, monospace IDs, status badges, inline sparkline cells.
- **Tabs:** underline tabs with a count badge (for example "Alerts 12").
- **Alert row:** `--danger`-tinted row background `#FDF1F0` for critical; a solid severity badge; an age counter "3d · SLA 2d" in red when overdue.
- **Map:** choropleth with value labels on each division; selection outline 2px `--ink`; side legend.

## Do / Don't
- ✅ Density with discipline: grid alignment, tabular numbers, and exceptions in red only.
- ❌ No dark page canvas (light content only), no neon glows, no decorative imagery.

## CSS Variables (`[data-theme="C"]`)
```css
--bg:#EDF1F5; --surface:#FFFFFF; --surface-2:#F6F8FA; --ink:#0B1726; --ink-2:#3D4B5C; --ink-3:#55636F;
--line:#D3DBE4; --primary:#00744F; --primary-hover:#005E40; --primary-tint:#E2F3EC; --on-primary:#FFFFFF;
--live:#2BC48A; --flag-red:#F42A41; --success:#027A48; --warning:#B54708; --danger:#C8281C; --info:#1D4ED8; --neutral:#55636F;
--radius:8px; --radius-lg:8px; --shadow:0 1px 0 rgba(11,23,38,.04),0 2px 8px rgba(11,23,38,.06);
--font-sans:"IBM Plex Sans","Noto Sans Bengali",system-ui,sans-serif; --font-display:"IBM Plex Sans","Noto Sans Bengali",system-ui,sans-serif; --heading-weight:700;
--sidebar-bg:#0B1B2B; --sidebar-ink:#C7D2DE; --sidebar-active-bg:#13293F; --sidebar-active-ink:#FFFFFF; --sidebar-marker:#2BC48A;
```

---

## Differentiation Verification (A vs B vs C)

| # | Item | A — Civic Clarity | B — Heritage Weave | C — Command Center | Different? |
|---|---|---|---|---|---|
| 1 | Background theme | Pure white `#FFFFFF` | Warm cream `#FAF6EE` | Cool slate tint `#EDF1F5` | ✅ |
| 2 | Shadow style | None | Soft warm, diffuse | Crisp small | ✅ |
| 3 | Border treatment | Hairline `#DDE3E0` | Warm `#E8DCC6` | Solid 1px slate `#D3DBE4` | ✅ |
| 4 | Corner radius | 4px | 16px + pills | 8px | ✅ |
| 5 | Typography | Public Sans 600 (sans, editorial) | Fraunces 600 serif display + DM Sans | IBM Plex Sans 700 tight (compact) | ✅ |
| 6 | Status expression | Dot + label | Pastel pill + icon | Solid badge + icon | ✅ |
| 7 | Sidebar theme | Light grey, green left border | Deep green + woven texture, gold marker | Navy ink, emerald bar | ✅ |

**Result: 7/7 differ → PASS** (threshold 5/7). PRD primary (national green) is interpreted three ways: sparse meaningful accent (A), a deep heritage green with terracotta and gold (B), and a functional data green with a live emerald (C). All three keep light content backgrounds, as the PRD requires.
