# DESIGN_SYSTEM_A — "Civic Clarity"

**Archetype:** Editorial Minimal / public-service clarity
**Reference company:** GOV.UK Design System + Stripe Docs (clarity, hairlines, plain language)
**One-liner:** A calm, white, typographic government service. The national green appears only where it means something.
**Generated with:** `analyze-design/scripts/search.py` → style "Accessible & Ethical", reinterpreted with the PRD's national identity [PRD §4.9]

## Style DNA (prefix for every generation prompt)
> Civic Clarity: pure white canvas, hairline 1px #DDE3E0 borders, no shadows, 4px corners, Public Sans (600 headings / 400 body) with Noto Sans Bengali, national green #006A4E reserved for primary actions, links and active states. A 4px flag stripe (green + red) under the identity header. Status shown as an 8px dot plus a text label. Light grey sidebar with a 3px green left border on the active item. Generous whitespace, left-aligned editorial layout, tabular numbers, no gradients, no decoration.

## Color Tokens

| Token | Hex | Usage | Contrast |
|---|---|---|---|
| `--bg` | `#FFFFFF` | Page canvas | — |
| `--surface` | `#FFFFFF` | Cards, tables | — |
| `--surface-2` | `#F5F7F6` | Sidebar, section bands, table header | — |
| `--ink` | `#0E1C17` | Headings, body | 17.5:1 |
| `--ink-2` | `#44524C` | Secondary text | 8.2:1 |
| `--ink-3` | `#5F6C66` | Captions, meta | 5.5:1 |
| `--line` | `#DDE3E0` | Hairline borders, dividers | — |
| `--primary` | `#006A4E` | CTA, links, active nav, focus ring | 6.6:1 |
| `--primary-hover` | `#00543E` | Hover | — |
| `--primary-tint` | `#E6F2EE` | Selected row, active chip | — |
| `--flag-red` | `#F42A41` | Flag mark and stripe only (decorative) | 4.0:1 (non-text) |
| `--success` | `#067647` | Approved, present | 5.7:1 |
| `--warning` | `#B54708` | Under review, late, attention | 5.4:1 |
| `--danger` | `#B42318` | Rejected, absent, critical | 6.6:1 |
| `--info` | `#175CD3` | Submitted, info | 6.0:1 |
| `--neutral` | `#5F6C66` | Draft, inactive | 5.5:1 |

**Map choropleth (traffic light, colour-blind safe with labels):** good `#2E8B6A`, watch `#E0A526`, attention `#D1432F`, no data `#E9ECEB`.

## Typography
- **Latin:** Public Sans 400 / 500 / 600 / 700 · **Bangla:** Noto Sans Bengali 400 / 500 / 600.
- **Headings:** weight 600, tracking −0.01em. Display 48/56 · H1 36/44 · H2 28/36 · H3 22/30 · H4 18/26.
- **Body:** 16/26 · Small 14/22 · Caption 12/18 · KPI figures 32/40 weight 600 tabular-nums.
- **Overline labels:** 12px, 600, uppercase, letter-spacing 0.06em, `--ink-3`.

## Shape, Depth, Spacing
- **Radius:** 4px (cards, inputs, buttons, tags); 2px (chips).
- **Shadow:** none. Separation comes from 1px `--line` hairlines and whitespace.
- **Border:** 1px solid `--line`; active and focus states use a 2px `--primary` outline with 2px offset.
- **Spacing:** card padding 24px, grid gap 24px, public section padding 80px vertical.
- **Density:** comfortable; table row 52px.

## Components
- **Identity header:** white bar with flag mark (10:6), "Government of the People's Republic of Bangladesh" overline, "Ministry of Textiles and Jute", platform name. Below it, a 4px stripe (green 85%, red 15%).
- **Utility bar (public):** `--surface-2` 36px band: বাংলা | English toggle, A− A A+, contrast, help link.
- **Primary nav (public):** text links in `--ink-2`; the active link is `--ink` with a 2px green underline.
- **Buttons:**
  - Primary: solid `--primary`, white text, 44px height, 4px radius, hover `--primary-hover`.
  - Secondary: white with 1px `--ink` border.
  - Tertiary: green text link with arrow.
- **Status tag:** `● Label` — 8px dot in the status color plus `--ink` text, no background.
- **KPI card:** white, 1px hairline, overline label, 32px figure, delta row (`▲ 2.4%` in success/danger + "vs last month"), 1.5px sparkline in `--ink-3`.
- **Sidebar:** `--surface-2`, 264px, items 40px, icons 20px `--ink-3`. Active item is white with a 3px `--primary` left border and `--primary` text.
- **Top bar (app):** white, 64px, hairline bottom border; search field (`--surface-2` fill), bell with count, language, avatar.
- **Tables:** header `--surface-2`, 12px uppercase overline headers, hairline row borders, zebra off, numeric columns right-aligned.
- **Tabs:** text tabs with a 2px green underline on the active tab.
- **Alert row:** a 3px left rule in the severity colour, then the text, with "View" and "Take action" as text buttons.
- **Map:** flat fills with white 1px borders between divisions; labels in `--ink`; legend with labels.

## Do / Don't
- ✅ Whitespace and typography carry the hierarchy. Use green only where it means something.
- ❌ No shadows, gradients, rounded pills, or decorative textile patterns.

## CSS Variables (`[data-theme="A"]`)
```css
--bg:#FFFFFF; --surface:#FFFFFF; --surface-2:#F5F7F6; --ink:#0E1C17; --ink-2:#44524C; --ink-3:#5F6C66;
--line:#DDE3E0; --primary:#006A4E; --primary-hover:#00543E; --primary-tint:#E6F2EE; --on-primary:#FFFFFF;
--flag-red:#F42A41; --success:#067647; --warning:#B54708; --danger:#B42318; --info:#175CD3; --neutral:#5F6C66;
--radius:4px; --radius-lg:4px; --shadow:none; --font-sans:"Public Sans","Noto Sans Bengali",system-ui,sans-serif;
--font-display:"Public Sans","Noto Sans Bengali",system-ui,sans-serif; --heading-weight:600;
--sidebar-bg:#F5F7F6; --sidebar-ink:#44524C; --sidebar-active-bg:#FFFFFF; --sidebar-active-ink:#006A4E; --sidebar-marker:#006A4E;
```
