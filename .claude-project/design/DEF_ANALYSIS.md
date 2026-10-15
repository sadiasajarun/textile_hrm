# D/E/F Rework — Analysis Note

**Date:** 2026-10-15 · **Trigger:** stakeholders rejected A/B/C. The rework brief is `requirements/` input #3, after the SOW and the core feature list.
**Sources re-read:** SOW v2, research brief, PRD v1, DesignGuide, DomainResearch, VariationPrompts, DESIGN_SYSTEM_A/B/C, the 9 A/B/C pages, and the `_build/` generator (templates, CSS tokens, demo data, map, icons, QA).

## 1. What A/B/C actually do

| | A — Civic Clarity | B — Heritage Weave | C — Command Center |
|---|---|---|---|
| Screens built | Landing, Ministry dashboard, Institution 360 | same | same |
| Public site | Editorial, typographic, 12-item nav | Centered hero, craft motif, 12-item nav | Split hero with a "live" panel, 12-item nav |
| Internal shell | Light sidebar with 11 module items | Woven green sidebar with 11 items | Navy sidebar with 11 items, `⌘K` |
| Ministry dashboard | 10 KPI cards + map + alerts + ranking + trend + admission + budget | same content, warm style | same content, dense style |
| Roles shown | Ministry only | Ministry only | Ministry only |

**Why they missed expectations** (from the rework brief and our own review):
1. **They start inside the system.** Only one public page; no login, no role logic, no path from citizen to officer.
2. **Only the Ministry role was visible.** Nothing showed that Division, District, Principal, Teacher and Student see different things.
3. **The three are the same IA in three costumes.** Identical layout skeleton, identical 10-KPI wall, 11-item sidebar. The differences were mostly cosmetic.
4. **Dashboard-for-dashboard's-sake.** 10 KPIs + 5 panels on the first screen. "What do I do next?" was not the organizing idea.
5. **Navigation overload.** 12 public nav items and 11 permanent sidebar modules.
6. **Bangla only on a few labels.** No statuses, table headings or buttons were translated.
7. **Decorative risk.** B's Jamdani motif and C's console aesthetic read as "theme", not "government service".

## 2. Why D/E/F are different
D/E/F share one **information architecture** (below) but differ in **what the product leads with**:

| | D — National Service Portal | E — Connected Institution Network | F — Action & Service Hub |
|---|---|---|---|
| Leads with | Official identity + public information and services | The network itself: map, hierarchy, comparison | The user's task: "what do you need to do?" / "what needs you?" |
| Public hero | Official title + purpose + institution search + popular services + admission key dates; public statistics below | Network map of 59 institutions connected to the Ministry + institution search | Task search + top tasks + application-status checker |
| Internal shell | **Top horizontal navigation** (no sidebar), green header band, scope bar | **Light left sidebar** + persistent hierarchy bar; map/list split | **Compact left rail** with counts; inbox-style home |
| Ministry home | Situation summary (4 numbers) + Needs-attention table + Pending-for-me | National → Division → District drill-down on a map/list split + health and trends | "Needs attention" queue with filters + quick actions + recently updated |
| Density | Medium | Comfortable, strategic | Compact cards, low cognitive load |
| Typography | Noto Sans + Noto Sans Bengali (one harmonised family) | Source Sans 3 + Hind Siliguri | Lexend (readability-first) + Noto Sans Bengali |
| Visual signature | White/off-white, functional green, a red identity line only | Light neutral, deep teal + ink blue, a faint network-line motif in the hero only | White + light grey, government green, simple status colors |

None of them reuses A's editorial minimalism, B's heritage craft or C's dark console. All of them use light backgrounds, have no decorative textile art, have no dark-mode-first admin, and show no more than 4–5 summary numbers on any dashboard.

## 3. Information architecture retained (from PRD v1)
- The **role hierarchy** and **downward scope**: Ministry → Division → District → Institution Admin/Principal → Teacher / Student (→ Alumni), plus Verifier (Phase 2).
- **Public / private data separation** (PRD §2.4). Public pages show aggregates only.
- **Institution 360°** as one record across modules; **Single Source of Truth** with View History / Activity Timeline.
- **Status models**: application, result, attendance, asset, leave, certificate, license.
- All **24 PRD modules** stay reachable. Modules not in the 10-screen set open a labelled placeholder ("Part of the full build — route, PRD reference"), never a dead link.

## 4. What is simplified
- **Public nav: 12 → 9 items** (Home, Institutions, Admissions, Services, Public Dashboard, Notices, Results/Verification, Resources/Help, Login + বাংলা|English).
- **Internal nav: 11 modules → 4–6 groups per role** (from the rework brief §11). Sub-modules live inside groups, tabs and quick actions.
- **Ministry dashboard: 10 KPIs → 4–5 summary figures.** The rest moves into "Needs attention" and drill-down.
- **Institution 360°: 14 tabs → 5 grouped tabs + "More".**
- **Forms:** only the fields needed to explain the flow; steps, review, draft.

## 5. Public → Login → Role flow
```text
Public website (01) ──► Public institutions/services (02)
        │                        │
        └──────► Login (03) ◄────┘
                    │  production: credentials → system resolves assigned role(s) + scope
                    │  multiple roles → choose among *authorized* workspaces only
                    │  prototype only: "Prototype Role Preview" panel (clearly labelled)
                    ▼
  Ministry (04) ─drill─► Division view ─► District view ─► Institution 360° (10)
  Division Admin (05) · District Admin (06) · Principal (07) · Teacher (08) · Student (09)
```
- Every authenticated page shows **who you are** and **your scope** ("Scope: Chattogram Division — assigned").
- Trying another scope shows the **permission-denied** state.
- The header's **Prototype Role Preview** menu (labelled, dashed outline) lets presenters switch roles. The login page explains that production users cannot pick roles.

## 6. Build approach
- Reuse the `_build/` generator (Jinja + Tailwind v4 + bundled fonts + Lucide + real geoBoundaries map).
- **A/B/C stay byte-identical.** D/E/F use separate templates (`templates/def/`), a separate stylesheet (`assets/tims-def.css` from `css/def.css`), a separate script (`assets/tims-def.js`) and separate font rules.
- **Bilingual:** a build-time dictionary (`data/i18n.json`). The build **fails** if a string passed to `t()` has no Bangla translation. That covers navigation, page titles, buttons, KPI labels, service cards, statuses and table headings; digits switch to Bangla numerals in key figures.
