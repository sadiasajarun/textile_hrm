# DESIGN_SYSTEM_D — "National Service Portal"

## 1. Concept
The most credible, public-service-first direction. It looks and behaves like a complete national digital service platform: an official gateway first, with a calm role-based workspace behind the login. Every screen leads with **plain-language orientation** ("what this is / what you can do here") and keeps the green government identity functional rather than decorative.

## 2. Why it fits a Bangladesh government ministry
- Mirrors the trusted structure Bangladeshi citizens already know from IPEMIS, EMIS and eSheba: identity bar → statistics → services → notices → help → sign-in.
- One harmonised type family (Noto Sans + Noto Sans Bengali), so English and Bangla carry equal visual weight. Bangla is never a second-class fallback.
- Calm, authoritative and printable. Tables and summaries read like official reports, which suits senior officers and audit trails.

## 3. Borrowed from public-sector UX research
| Source | Pattern used |
|---|---|
| IPEMIS | Public KPIs high on the page, public dashboard, help centre with guides/FAQ/tutorials, login connected to the portal, accessibility menu |
| EMIS | Headline statistics, institute directory, notice board, centralised sign-in |
| BANBEIS institute search | Look up an institution by **code or name**, with division/district/type filters |
| BTEB eSheba | Services grouped by need, verification, application status |
| GOV.UK / NHS | Status tags as non-interactive adjectives; check-answers before submit |

## 4. How it differs from A/B/C
- **Not A:** A was editorial and typographic with a sidebar app. D is a full **portal**: green identity band, service tiles, statistics panel, a directory search form, and a **top-navigation application with no sidebar**.
- **Not B/C:** no heritage motif and no dark console. Medium density with summary + action + tables.
- **New:** login + role preview, 6 role dashboards with scoped navigation, bilingual statuses and tables.

## 5. Public page architecture (01, 02)
1. **Utility bar** (deep green): "Government of the People's Republic of Bangladesh" · Accessibility menu (text size, high contrast) · Help desk · বাংলা | English
2. **Identity header:** circular seal (flag mark), "Ministry of Textiles and Jute · Department of Textiles", system name, quick search, **Login**; a 3px red identity line underneath
3. **Navigation** (8 items + Login, one row, active underline, scrolls sideways on phones)
4. **Hero (off-white band):** purpose headline + one sentence + large institution search + four "popular services" chips. Right: **Admission 2026–27** card with the key-date timeline and Apply / Check result / Track
5. **Public statistics:** 5 figures in one ruled grid, Demo tag and "last updated"
6. **Public services:** 9 tiles in a 3-column grid (icon, name, one line, Open); Phase 2 items tagged
7. **Find an institution** (BANBEIS-style form: name/code, division, type → opens 02 with the filters applied) beside **Textile institutions by division** (bar list, each row links to 02 filtered)
8. **Notices and circulars:** category filter + dated table (empty state when a category has none) beside **Verify a certificate or license**
9. **Help:** FAQ accordion + User guides / Video tutorials / Help desk cards
10. **Official footer** (deep green): ministry and department, important links, public services, help, policies (TBD), last updated

**02 = Institution Directory:** breadcrumb + title band; filter card (name/code, division, district, type; live) with result count, Clear filters and Download; register-style table with public fields only; public-profile drawer; empty state "No institution matches your search". Below: **Track application** and **Verify a certificate or license** side by side (anchors `#track`, `#verify`).

## 6. Internal app architecture (04–10)
- **Header band** (deep green): identity + system name · **Prototype Role Preview** · language · notifications · user menu (authorized workspaces only).
- **Primary navigation as horizontal tabs** under the band (4–6 groups per role). Groups that are not part of the 10 screens open a labelled placeholder listing their sub-modules. On phones the navigation becomes a full-screen menu.
- **Scope bar** (off-white): breadcrumb (National › Division › District › Institution) + "Scope: … (assigned)" chip. Levels outside the user's scope open **Permission denied**.
- **Page pattern:** greeting or title + one-line question → **Situation summary** (4 figures in one card with dividers) → **Needs attention / My actions** (table or list with SLA) + **Pending for me** → one supporting table (division → district → institution drill-down on 04, districts incl. empty ones on 05) → activity.
- **Principal (07):** threshold banner, pending-actions table (review drawer with timeline and confirm dialogs), class attendance, resources. **Teacher (08):** attendance-due banner, classes table, result entry, leave. **Student (09):** profile header, attendance warning, status cards, request timeline. **360° (10):** official record header with 6 health domains, underlined grouped tabs, More menu.

## 7. Navigation strategy
| Role | Primary groups |
|---|---|
| Ministry | Overview · Institutions · Operations · Approvals · Reports · Administration |
| Division | Overview · Districts & Institutions · Actions · Reports |
| District | Overview · Institutions · Actions · Reports |
| Principal | Overview · People & Academics · Services & Approvals · Resources · Reports |
| Teacher | Home · My Classes · Attendance · Results · Leave / Services |
| Student | Home · Academics · Results & Attendance · Services · Profile |
Sub-modules live in each group's dropdown. Destinations outside the 10-screen set open the **placeholder dialog** (screen name, route, PRD reference).

## 8. Typography
- **Noto Sans** 400/500/600/700 (Latin) + **Noto Sans Bengali** 400/500/600/700.
- Display 44/52 · H1 32/40 · H2 24/32 · H3 19/28 · Body 16/26 · Small 14/22 · Caption 12/18. Bangla line-height ≥ 1.65.
- Figures: 600, tabular. Section labels: 13px, 600, sentence case.

## 9. Colors
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | canvas |
| `--band` | `#F6F7F5` | off-white bands, scope bar, table header |
| `--ink` / `--ink-2` / `--ink-3` | `#13201B` / `#4A5752` / `#5E6A65` | text (16.8 / 7.6 / 5.6 : 1) |
| `--line` | `#E2E6E3` | soft borders |
| `--primary` | `#00684A` | actions, links, active (6.8:1) |
| `--primary-dark` | `#004D37` | utility bar, app header band |
| `--primary-tint` | `#E8F3EE` | selected, info panels |
| `--red` | `#C8102E` | a 3px identity line under the header and critical status only |
| status | success `#0B7A45` · warning `#9E5B00` · danger `#C21F32` · info `#1F5FAD` · neutral `#5E6A65` | |

## 10. Spacing
4px grid · card padding 20px · section padding 64px (public) · gap 20px · table row 48px.

## 11. Radius
6px for cards, inputs and buttons · 4px for tags · 999px only for avatar and count badges.

## 12. Borders / shadows
1px `--line` on cards. Shadow `0 1px 2px rgba(16,24,20,.05)` on cards only. No gradients and no glass effects.

## 13. Icon use
Lucide, 20px inline / 24px standalone, `--ink-3` by default and `--primary` in action tiles. Icon-only buttons always carry `aria-label`.

## 14. Status pattern
**Tinted tag with icon + label** (e.g. `[clock] Under review` on an amber tint). Tags are never the only signal: the row also carries text (age, SLA).

## 15. Data visualization rules
- At most 2 charts per screen. Bars and lines only, no pies.
- Every chart has a table equivalent, axis labels and a Demo tag.
- Thresholds are dashed lines with a text label.

## 16. Form rules
- Steps: Start → Basic information → Required documents → Review → Submit → Track.
- Labels above fields. Errors under the field in danger color with an icon. "Save draft" is always available.

## 17. Bilingual behavior
- Toggle `বাংলা | English` in the utility bar and the app header; the choice is remembered.
- Nav, titles, buttons, KPI labels, service cards, statuses and table headings switch; key figures switch to Bangla digits.
- Layouts allow ~30% longer labels: buttons grow, nav wraps to two lines at narrow widths.

## 18. Accessibility
- WCAG AA contrast throughout; 3px focus ring in `--primary` with 2px offset; 44px targets.
- Accessibility menu: text size A−/A/A+ and high-contrast mode; skip link.
- Native `<dialog>` for modals; nothing essential is shown only on hover.

## 19. Mobile behavior
- **Public:** utility bar collapses to language + accessibility; nav becomes a menu button; hero stats stack 2×2; service tiles go to 2 columns.
- **App:** the top tabs scroll horizontally; tables become stacked rows.

## 20. Do / Don't
- ✅ Lead with orientation and services; use official, plain-language headings; show scope everywhere.
- ✅ Use green for actions and identity only; keep red to the identity line and critical states.
- ❌ No sidebars in the app; no 10-card KPI walls; no gradients, patterns or illustrations unrelated to the service.
