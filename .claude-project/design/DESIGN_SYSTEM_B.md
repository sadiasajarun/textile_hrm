# DESIGN_SYSTEM_B — "Heritage Weave"

**Archetype:** Warm Humanist / cultural heritage
**Reference company:** Airbnb and Notion warmth, combined with Bangladesh's textile heritage (Jamdani weave geometry)
**One-liner:** A warm, confident national platform that carries the craft of Bangladeshi textiles, used with restraint.
**Generated with:** `analyze-design/scripts/search.py` (heritage / craft query → deep burgundy + craft gold), re-anchored to the national green [PRD §4.9]

## Style DNA (prefix for every generation prompt)
> Heritage Weave: warm cream canvas #FAF6EE with white cards, 16px rounded corners and pill-shaped buttons, soft warm shadows, warm borders #E8DCC6. Headings in Fraunces 600 (Noto Serif Bengali for Bangla), body in DM Sans (Noto Sans Bengali). Deep bottle green #0E5A43 is the primary colour, with terracotta #B4432F and craft gold #B98A2A as accents. The deep green sidebar #0F3D30 carries a faint diagonal woven texture and a gold active marker. Status tags are pastel pills with an icon. A subtle Jamdani-inspired diamond divider is used sparingly between sections.

## Color Tokens

| Token | Hex | Usage | Contrast |
|---|---|---|---|
| `--bg` | `#FAF6EE` | Page canvas (warm cream) | — |
| `--surface` | `#FFFFFF` | Cards | — |
| `--surface-2` | `#F3ECDF` | Bands, table header, inputs | — |
| `--ink` | `#2A2118` | Headings, body | 14.7:1 on bg |
| `--ink-2` | `#5E5245` | Secondary text | 7.0:1 |
| `--ink-3` | `#6F6151` | Captions | 5.6:1 |
| `--line` | `#E8DCC6` | Warm borders | — |
| `--primary` | `#0E5A43` | CTA, links, active | 7.6:1 |
| `--primary-hover` | `#0A4434` | Hover | — |
| `--primary-tint` | `#E3EFE8` | Selected, chips | — |
| `--accent` | `#B4432F` | Terracotta highlight: section kickers, alert stripe | 5.2:1 |
| `--gold` | `#B98A2A` | Woven motif, active marker (decorative) | non-text |
| `--flag-red` | `#F42A41` | Flag mark only | non-text |
| `--success` / tint | `#1E6B45` / `#E3EFE8` | Approved, present | 5.5:1 on tint |
| `--warning` / tint | `#8F520A` / `#FBEFD9` | Review, late | 5.5:1 on tint |
| `--danger` / tint | `#A3271A` / `#F8E1DC` | Rejected, critical | 5.9:1 on tint |
| `--info` / tint | `#2F5C8A` / `#E2ECF6` | Submitted | 5.8:1 on tint |
| `--neutral` / tint | `#5E5245` / `#EFE9DF` | Draft, inactive | 6.3:1 on tint |

**Map choropleth:** good `#3F8F6B`, watch `#D9A441`, attention `#C2553F`, no data `#EFE7D8`, borders `#FAF6EE`.

## Typography
- **Display / headings:** Fraunces 600 (optical size auto) · Bangla headings: Noto Serif Bengali 600.
- **Body / UI:** DM Sans 400 / 500 / 600 · Bangla: Noto Sans Bengali 400 / 500.
- **Scale:** Display 52/60 · H1 38/46 · H2 30/38 · H3 22/30 · H4 18/26 · Body 16/26 · Small 14/22 · Caption 12/18.
- **KPI figures:** Fraunces 34/40, weight 600, lining tabular numbers.
- **Kicker labels:** DM Sans 13px, 600, `--accent`, with a small diamond glyph before them.

## Shape, Depth, Spacing
- **Radius:** 16px cards and panels · 12px inputs · 999px buttons and status pills.
- **Shadow:** `0 1px 2px rgba(74,52,20,.06), 0 10px 30px -12px rgba(74,52,20,.18)`. Hover lifts the shadow (no scale).
- **Border:** 1px `--line` on cards and inputs.
- **Spacing:** card padding 28px, gap 24px, public section padding 96px vertical.
- **Density:** relaxed; table row 56px.

## Components
- **Identity header:** cream bar; flag mark inside a gold hairline circle; ministry name in Fraunces; a woven band (4px repeating diagonal in green and gold) under the header.
- **Utility bar:** deep-green 36px strip with cream text: language toggle, text size, help.
- **Buttons:**
  - Primary: pill, `--primary` fill, cream text, 48px height, shadow on hover.
  - Secondary: pill outline in `--primary`.
  - Accent link: terracotta with an arrow.
- **Status tag:** pastel pill with a status icon and dark status text (for example `[✓] Approved` on `#E3EFE8`).
- **KPI card:** white, 16px radius, warm shadow; icon in a tinted circle; Fraunces figure; delta pill; soft area sparkline in a tint.
- **Sidebar:** `#0F3D30` plus a woven overlay (`repeating-linear-gradient(45deg, rgba(255,255,255,.03) 0 2px, transparent 2px 8px)`). Text `#F3ECDF`, muted `#B9C9BF`. The active item has a `rgba(255,255,255,.08)` fill and a 3px gold left marker.
- **Top bar (app):** cream with a bottom border; pill search; avatar with a gold ring.
- **Tables:** inside a white rounded card; header `--surface-2`; 56px rows; pills for status.
- **Tabs:** pill segmented control on `--surface-2`.
- **Alert card:** white card with a terracotta left band, severity pill, and Fraunces title.
- **Motif:** Jamdani diamond divider (inline SVG of 3 small diamonds) between public sections. At most one per section.

## Do / Don't
- ✅ Warmth, craft and national pride, with a clear hierarchy and generous spacing.
- ❌ No heavy patterns behind text, no more than one motif per view, no dark page canvas.

## CSS Variables (`[data-theme="B"]`)
```css
--bg:#FAF6EE; --surface:#FFFFFF; --surface-2:#F3ECDF; --ink:#2A2118; --ink-2:#5E5245; --ink-3:#6F6151;
--line:#E8DCC6; --primary:#0E5A43; --primary-hover:#0A4434; --primary-tint:#E3EFE8; --on-primary:#FAF6EE;
--accent:#B4432F; --gold:#B98A2A; --flag-red:#F42A41; --success:#1E6B45; --warning:#8F520A; --danger:#A3271A; --info:#2F5C8A; --neutral:#5E5245;
--radius:16px; --radius-lg:20px; --shadow:0 1px 2px rgba(74,52,20,.06),0 10px 30px -12px rgba(74,52,20,.18);
--font-sans:"DM Sans","Noto Sans Bengali",system-ui,sans-serif; --font-display:"Fraunces","Noto Serif Bengali",Georgia,serif; --heading-weight:600;
--sidebar-bg:#0F3D30; --sidebar-ink:#B9C9BF; --sidebar-active-bg:rgba(255,255,255,.08); --sidebar-active-ink:#FAF6EE; --sidebar-marker:#B98A2A;
```
