# Design Status — textile_hrm

```yaml
phase: P3-design
current_step: P3d            # client confirmation — paused (rework round 3, Phase 1 G/H/I)
selected_variation: null     # G | H | I | hybrid (A–F kept for reference)
approved: false
approved_at: null
variations_generated: 9      # round 1: A/B/C · round 2: D/E/F · round 3: G/H/I
archetypes: [civic-clarity, heritage-weave, command-center, national-service-portal, connected-institution-network, action-service-hub]
html_files: 39               # A/B/C 9 + D/E/F 30
showcase: .claude-project/design/variations/showcase-GHI.html   # earlier: showcase-ALL.html, showcase-DEF.html
recommendation: G (single) / hybrid G public + I officials' workspaces + G learner workspaces  # see showcase-GHI.html
prd_version_used: v1
```

## Variations

| Key | Name | Reference | Files |
|---|---|---|---|
| A | Civic Clarity | GOV.UK Design System + Stripe Docs | `variations/A-01-landing.html`, `A-02-ministry-dashboard.html`, `A-03-institution-360.html` |
| B | Heritage Weave | Airbnb/Notion warmth + Jamdani textile heritage | `variations/B-01-landing.html`, `B-02-ministry-dashboard.html`, `B-03-institution-360.html` |
| C | Command Center | Linear / Datadog operations consoles | `variations/C-01-landing.html`, `C-02-ministry-dashboard.html`, `C-03-institution-360.html` |

Design systems: `design/DESIGN_SYSTEM_A.md`, `DESIGN_SYSTEM_B.md`, `DESIGN_SYSTEM_C.md`.

### Round 2 — rework (D/E/F)

A/B/C were reviewed and did not meet the brief: they started inside the dashboard rather than from a public government website, showed KPI walls, and did not prove role scoping or real bilingual switching. Analysis: `design/DEF_ANALYSIS.md`. A/B/C files are unchanged.

| Key | Name | Shell | Files |
|---|---|---|---|
| D | National Service Portal | Official seal header, red line, top navigation, no sidebar | `variations/D-01-landing.html` … `D-10-institution-360.html` |
| E | Connected Institution Network | Light sidebar, hierarchy bar, map-led drill-down | `variations/E-01-landing.html` … `E-10-institution-360.html` |
| F | Action & Service Hub | Rail with counts, inbox homes, pill tabs | `variations/F-01-landing.html` … `F-10-institution-360.html` |

Screens per direction: 01 Public Home · 02 Public Institutions & Services · 03 Sign in · 04 Ministry · 05 Division · 06 District · 07 Principal · 08 Teacher · 09 Student · 10 Institution 360°.
Design systems: `design/DESIGN_SYSTEM_D.md`, `DESIGN_SYSTEM_E.md`, `DESIGN_SYSTEM_F.md`. Showcase: `variations/showcase-DEF.html`.

## QA (P3c)
- Blueprint `validate-variations`: **PM_3_DESIGN_VALIDATION_PASSED** (showcase present; every page has `var-nav-bar` and a 1440px frame).
- Screenshot QA (`_build/qa/qa.mjs`, Chromium, 1440px and 375px): **10 pages, 0 issues**. No console errors, no broken links, no `href="#"`, no buttons without an action, no horizontal overflow at 375px.
- Bangla toggle verified on B-01 and C-02 (Noto Sans/Serif Bengali, conjuncts render correctly).

## QA (rework D/E/F)
- `_build/qa/qa-def.mjs`, Chromium, **1440 / 1024 / 390 px**, 31 pages (30 screens + showcase-DEF): no console errors, no failed requests, no broken links, no `href="#"`, no button without an action, no horizontal overflow, no touch target under 24px. Every dialog, tab, drill-down, filter chip and dropdown trigger is clicked on each page without errors.
- Flows (20/20 pass): demo sign-in routes each account to its workspace; a wrong password shows the error; empty fields show field errors; a multi-role account opens the workspace chooser; `?division=` filters the directory (9 Chattogram rows); certificate lookup shows found and not-found; `#drill=` deep links open the drill-down state.
- Bangla toggle: navigation, titles, buttons, KPI labels, service cards, statuses and table headings switch on every page (Bangla digits included). Only personal and institution names stay in Latin script.
- A/B/C unchanged: 32 output files byte-identical to the pre-rework hashes.

## To approve
1. Open `variations/showcase-DEF.html` and choose D, E or F. (Round 1, `showcase-ALL.html`, stays available.)
2. Record it here: `selected_variation: <D|E|F>`, `approved: true`, `approved_at: <ISO8601>`. Or reply to Claude with the choice.
3. Resume: `/fullstack-pm textile_hrm --phase P3-design --resume`. This runs P3e (all 108 pages in role folders), P3f (QA) and P3g (snapshot).

### Round 3 — Phase 1 design directions (G/H/I)

Brief: public-first website (IPEMIS / Invest Bangladesh / BIDA references), 5-item public nav, public login for Candidate/Student/Teacher only, officials on separate portal domains, fixed palette Ocean Blue #356A82 · Teal #3A817E · Sky Mist #DCECEF, real Bangla/English. Phase 1 = 7 key screens per direction; Phase 2 (full prototype) waits for explicit confirmation.

| Key | Name | Files |
|---|---|---|
| G | Public Service First | `variations/G-01-landing.html` … `G-07-student-dashboard.html` |
| H | Institutional & Premium | `variations/H-01-landing.html` … `H-07-student-dashboard.html` |
| I | Functional Government Workspace | `variations/I-01-landing.html` … `I-07-student-dashboard.html` |

Screens: 01 Landing · 02 Notices · 03 Login & portal entry · 04 Ministry · 05 Principal · 06 Teacher · 07 Student. Showcase: `variations/showcase-GHI.html`.
Build: `_build/ghi/` (Node, no dependencies; `node build.mjs`). Photos: Wikimedia Commons, credits in `assets/ghi/img/CREDITS.json`.
QA (partial, stopped at the client's request): 40/40 interaction flows pass in all three directions; open items listed in the hand-off (390px overflow on some pages, a few targets 20–23px, IDs/names stay Latin in Bangla mode).
