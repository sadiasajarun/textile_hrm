# FINAL_DESIGN_SYSTEM — Textile Institution Management System (Variation H, approved)

**Date:** 15 Oct 2026 · **Status:** approved baseline for the final prototype · **Prototype:** `design/prototype/` · **Source:** `design/_build/final/` (+ shared `design/_build/ghi/`)

Variation H ("Institutional & Premium") is the selected direction. This document records the tokens, shells, components and rules that the 71 final prototype screens use. It replaces the earlier per-variation design systems (A–F) for all further work; those files stay as history and were not changed.

---

## 1. Principles

1. **Public website first.** The product opens as an official Government of Bangladesh website. Officials work in separate portals.
2. **Formal, plain government language.** Short sentences, active voice, no marketing tone. Rules that are not confirmed show `TBD — Requires Client Confirmation`. Numbers that are not verified show `Demo / Illustrative Data`.
3. **Bangla and English are equal.** Every visible string, attribute (placeholder, alt, aria-label) and figure has both languages. The build fails if a Bangla string is missing.
4. **Status is always visible.** Every record, request and flow step carries a status tag. Edge cases use shared alerts, timelines and empty states, not separate pages.
5. **Role scope is always visible.** Each workspace shows the signed-in user, the role and the scope (for example "Chattogram Division").

## 2. Tokens

Defined in `assets/ghi/base.css` (`:root`) and refined in `assets/ghi/h.css` and `assets/final/final.css`.

### Colour

| Token | Value | Use |
|---|---|---|
| `--ocean` | `#356A82` | Primary actions, links, active navigation |
| `--ocean-600 / 700 / 800 / 900` | `#2D5D73 / #264F62 / #1D3E4D / #152E3A` | Hover, headers, dark bands, footer |
| `--teal` | `#3A817E` | Completion and "go" actions (submit, approve, pay) |
| `--teal-700 / 800 / 50` | `#2E6E6B / #245855 / #E8F3F2` | Hover, portal band, done states |
| `--mist` | `#DCECEF` | Sky Mist surfaces |
| `--mist-50 / 200` | `#F0F7F8 / #C8E0E4` | Subtle panels, dividers |
| `--bg` | `#F6F8F9` | Page background |
| `--text` / `--muted` | `#20353D` / `#566970` | Body text / secondary text (both ≥ 4.5:1 on white) |
| `--border` / `--border-strong` | `#D6E1E4` / `#B9CBD0` | Card and input borders |
| `--ok`, `--ok-bg` | `#256B42`, `#E6F2EA` | Valid, approved, paid |
| `--warn`, `--warn-bg`, `--warn-line` | `#7A4E00`, `#FFF2D6`, `#D99A1E` | Pending, returned, TBD tags |
| `--danger`, `--danger-bg` | `#A3241B`, `#FCE9E7` | Rejected, failed, revoked |
| `--info`, `--info-bg` | `#264F62`, `#E3EFF3` | Informational alerts |
| `--focus` | `#F2B33D` | Focus ring (keyboard) |

Semantic colours are used for status only, never for decoration.

### Typography

| Role | English | Bangla |
|---|---|---|
| Display / headings (`.h-display`, `.h-h2`, `.h-h3`) | Fraunces 600 | Noto Serif Bengali |
| Body, UI | Source Sans 3 | Noto Sans Bengali |
| IDs, references, licence numbers (`.mono`) | system monospace | (IDs stay in Latin script) |

Base size 16 px (16.5 px in Bangla mode), line height 1.55. Figures switch to Bangla digits through `n()` and dates through `d()`.

### Shape, depth, layout

- Radius: `--radius-sm` 6 px (buttons, inputs), `--radius` 10 px, `--radius-lg` 16 px. Cards and tables use 4–6 px.
- Shadow: `--shadow-sm`, `--shadow`, `--shadow-lg`. Cards are mostly flat with a 1 px border.
- Container 1240 px, gutter 24 px. Breakpoints: 1200, 1024 and 720 px. The prototype is checked at 1440 and 390 px.
- Minimum touch target 44 px (buttons); small buttons (`.btn-sm`) are used only inside tables.

## 3. Shells (`page({ kind })` in `core.mjs`)

| Shell | `kind` | Used by | Parts |
|---|---|---|---|
| Public website | `public` | Home, About, Academic, Admissions, Notice, Help, Verification, licence pages, organisation workspace | Utility bar (Results/Verification · Downloads · Contact · Government Portals · Search · বাংলা/English), header with MoTJ logo and 6-item nav + **Login** (Student / Teacher), Government Portals band, structured footer |
| Workspace | `ministry`, `division`, `district`, `principal`, `teacher`, `student`, `alumni` | All signed-in screens | Left navigation grouped by task, scope box, sign out; top bar with breadcrumb, proposed portal address (`*.tims.gov.bd`, "prototype only"), language toggle, notifications, user and role |
| Bare | `bare` | Portal sign-in pages, access states, review index | No navigation chrome |

All pages also carry the prototype bar (Review index · Public site · Portals · Reset demo data). It is review tooling, not part of the product.

## 4. Components (helpers in `_build/final/core.mjs`)

| Component | Helper / class | Notes |
|---|---|---|
| Bilingual text | `t(en, bn)`, `tt([en, bn])`, `ta(attr, en, bn)`, `n()`, `d()` | Both spans render; CSS shows the active language |
| Button / link button | `btn()`, `a()`; `.btn-primary`, `.btn-teal`, `.btn-outline`, `.btn-ghost`, `.btn-white`, `.btn-danger` | Teal = complete/approve; danger outline = reject |
| Status tag | `st(key)` | Draft, submitted, under review, correction required, approved, rejected, completed, pending, published, overdue, missing, late, recorded, issued, active/inactive, paid/unpaid/failed, in use/available/unavailable, damaged, lost, open/closed, valid/expired/revoked, due, selected/not selected, waiting |
| TBD tag | `tbd()` → `.f-tbd` | Dashed amber tag "TBD — Requires Client Confirmation" |
| Demo tag | `demo()` → `.demo-tag` | "Demo / Illustrative Data" on every unverified figure |
| Alert | `alert(ok|warn|danger|info, title, body, action)` | Left-border alert; action wraps under the text at ≤ 720 px |
| Flow banner | `flowBanner(k, text, link)` | Tells the reviewer where the cross-portal flow continues |
| Empty state | `empty(title, body, action, icon)` | Used for "no data", "not yet", "register first" |
| Timeline | `timeline([...])`, `.f-tl-row` (horizontal) | done / now / todo / warn / fail |
| Progress | `.f-prog` | Short step bar for candidate and organisation journeys |
| Stepper form | `stepper({ steps })` | Per-step validation, review step with "Edit" links, Save draft |
| Field | `field({ l, req, hint, opts, rows, attrs })` | Label, required marker, hint, inline error; `data-pattern`, `data-min`, `data-max`, `data-max-kb` |
| Data table | `table({ search, statusFilter, foot })` | Search, status filter, record count, empty result, pager |
| Tabs | `tabs(id, [...])` | URL hash opens a tab (`page.html#tab`) |
| KPI strip | `kpis([...])` | Label, value, context line; state-aware values via `raw` |
| Charts | `lineChart`, `groupedBars`, `donut`, `hbars`, `chartMeta` | Unit, period and data source under every chart |
| Confirm dialog | `act({ confirm, ctext, reason })` | Optional reason field for return/reject |
| Toast | `act({ toast })`, `dl()` | Result message; downloads say "Prototype only" |
| Statistic illustration | `illus(name)` in `illus.mjs` → `.f-ill` | Two-tone line art in a white circle (college, institute, vocational, divisions, districts) |
| Service card | `.f-svc` in `.f-svc-grid` | One light tint per service (`--svc-bg` / `--svc-ink`), white icon tile, arrow button in flow |
| Role switch | `tabs()` inside `.f-role-tabs` | Segmented Student / Teacher control on the Login page; `#teacher` opens the Teacher tab |
| Portal list | `.f-gp-panel`, `.f-gp` | Government Portals panel on the Login page |
| Escalation chain | `.f-chain` | Institution → District → Division → Ministry, current level highlighted |
| Payment simulator | `.f-proto-ctl` | Success / pending / failed gateway responses; gateway is TBD |
| Lookup | `form[data-lookup]` | Search by number with mapped results and a "locked" state |

## 5. Interaction and state

- Cross-page demo state is kept in `localStorage` (`tims-proto-v1`) by `assets/final/final.js`. Keys and flows: see `FINAL_WORKFLOW_MAP.md`.
- `data-when="key=v1|v2"` shows a block for a state. The build rejects malformed conditions.
- Demo sign-in password for every portal: `demo-pass`.

## 6. Content rules

- Officials: only the four published MoTJ/DoT officials (`assets/data/OFFICIALS_SOURCES.md`). Division and district officials are TBD cards with no name or photo.
- Photographs: only official institution and Department of Textiles photographs (`assets/images/IMAGE_SOURCES.md`). No factory or worker photographs.
- Personal names, organisation names and reference numbers in workspaces are demo data and stay in Latin script in Bangla mode.
- Portal addresses `*.tims.gov.bd` are proposals and are labelled "Proposed secure address — prototype only".

## 7. Accessibility

- Skip link, landmarks, one visible `h1` per page (state variants hide the others), labelled form controls, `aria-current` in navigation, `role="alert"` on errors.
- Visible focus ring (`--focus`). Text contrast ≥ 4.5:1.
- Tables scroll inside `.f-table-wrap` on small screens; the page itself never scrolls sideways (checked at 390 px).
