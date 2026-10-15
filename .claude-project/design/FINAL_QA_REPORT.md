# FINAL_QA_REPORT — Variation H final prototype

**Date:** 15 Oct 2026 · **Scope:** light QA, as instructed (not an intensive audit) · **Build:** `node build.mjs` in `design/_build/final/` → 78 pages, 70 icons · **Script:** `design/_build/final/qa/qa-final.mjs` (Chromium, served over local HTTP)

## Result

| Check | Method | Result |
|---|---|---|
| Build | `node build.mjs` (fails on any missing Bangla string or malformed `data-when` condition) | **Pass** — 78 pages, 0 missing translations, 0 malformed conditions |
| Reproducible build (hand-off §3b) | `node build.mjs` then `git status --porcelain` on the committed tree | **Pass** — 78 pages, no changed files after a rebuild |
| Dead links and missing assets | Every `href` and `src` in `prototype/*.html` resolved on disk; `href="#"` counted as dead | **Pass** — 0 dead links, 0 missing files |
| Flows A–J click-through | Script drives each flow through the real controls (forms, buttons, confirm dialogs) and checks the shared state after each step | **Pass** — 97 of 97 checks (round 1: 74) |
| Page errors | `pageerror` and console errors on every page visited | **Pass** — none |
| Horizontal overflow | `scrollWidth` vs viewport on all 78 pages at **1440 px** and **390 px** | **Pass** — none (after the fixes below) |
| Bangla toggle | `?lang=bn` on `index`, `login`, `license`, `ministry-licenses`, `verifier`, `student`, `principal`, `division-approvals`, `district-reports`; count visible English spans; screenshots reviewed | **Pass** — 0 visible English spans; Bangla digits and dates switch |
| Layout spot-check | Screenshots of home, login, the six licence pages, review index and the new Division / District pages at 1440 and 390 px | **Pass** after fixes |
| Requirements | Core Features §2–3 and SOW §3–4 checked against `FINAL_SCOPE_COVERAGE.md` | All Phase 1 and Phase 2 items are Built, Built (state) or labelled TBD |
| UX copy tone | Read all new Phase 2 copy; spot-checked public and workspace pages | Formal, plain government tone; unconfirmed rules labelled TBD; unverified figures labelled Demo |

### Flow checks (97)

- **A** apply → pay → selected → admitted → student ID shown on `student.html?new=1`.
- **B** teacher submits attendance; institution, district, division and ministry views open.
- **C** teacher submits marks (the deliberately missing mark is filled first) → Principal publishes → student results.
- **D** submit → return → resubmit → approve → complete.
- **E** allocate → record expense → utilisation.
- **F** ministry allocates → assign → transfer.
- **G** request → Ministry approves → PO → LC → receipt → gate pass.
- **H** apply leave → approve → balance.
- **I** apply certificate → issue → mark alumni → alumni portal.
- **J** apply → track → Head Office approves and issues TX-LIC-2026-000418 → register organisation → search locked before payment → failed payment → successful payment → search: valid / expired / revoked / not found / Phase 1 certificate → usage history.
- **Login:** header button, Student and Teacher sign-in, Teacher wrong-password error, Government Portals panel.
- **Division / District:** all eight scoped pages open in their own portal; Reports menu items open the scoped report; scoped report generates.
- **G (revised):** request → District forwards → Division recommends → Ministry approves → PO → LC → receipt → gate pass.
- **J edge cases:** tracking before submission; unknown reference; duplicate NID; missing documents; duplicate trade licence; return for correction → resubmit; rejection shown on tracking and apply pages; "already applied" alert.

## Stakeholder review round 1 (15 Oct 2026)

| # | Feedback | Change | Check |
|---|---|---|---|
| 1 | Illustrated icons for the five counts on the homepage | Line-art illustrations (college, institute, sewing machine, map, location pins) in white circles, IPEMIS style (`illus.mjs`) | Screenshot 1440 / 390 |
| 2 | Simpler, more human About statement with a light background shape | "One online home for every government textile institution." plus a plain-language sentence, on a soft rounded shape | Screenshot |
| 3 | Different light colour per online service, UX friendly | One light tint per card, white icon tile, arrow kept in flow (no more text under the arrow), clear hover and focus | Screenshot |
| 4 | Button should read "Login" | Header button "Login" → `login.html` | Script |
| 5 | Teacher login missing; Student / Teacher tabs | `login.html` with a Student / Teacher switch; `#teacher` opens the Teacher tab | Script: both tabs sign in; wrong password shows the error |
| 6 | Put Government Portals on the login page | Portals panel on the right of the login card, plus "Which login should I use?"; `portals.html` and `student-login.html` retired and all links repointed | Script + dead-link check |
| 7 | Teacher flow seemed missing | Reachable from Login → Teacher; "Role walkthroughs" in the review index list the teacher path (dashboard → classes → attendance → marks → leave) | Script |
| 8 | Division / District "Reports" opened the Ministry view | `division-reports.html` and `district-reports.html` in their own portal, scope limited | Script |
| 9 | Hierarchy-based access for Division and District | Scoped Admissions, Budget & assets, Approvals and Reports for both levels (Core Features §2.2: access limited to the assigned jurisdiction). Flow G now escalates District (forward) → Division (recommend) → Ministry (final), labelled TBD | Script: Flow G through all four levels |

## Defects found and fixed in round 1

| # | Defect | Fix |
|---|---|---|
| 1 | **Flow G broken:** after a procurement request was submitted, the request card (timeline, PO, LC, receipt, gate pass forms) never appeared. The `from()` helper built `data-when="submitted|approved|…"` without the `proc=` key. | `pages/institution.mjs`: `from()` now returns `proc=…`. |
| 2 | Same defect in the asset history timeline (`after()` without `asset=`): later history steps never showed. | `pages/institution.mjs`: `after()` now returns `asset=…`. |
| 3 | No guard against the defect above. | `build.mjs` now fails on any malformed `data-when` / `data-when-not` condition. |
| 4 | 390 px overflow on `apply` and `license-apply` (stepper labels), `ministry` (page-head actions), `public-dashboard` (chart cards), `student` (KPI tiles), `teacher` (welcome button). | `final.css`: stepper shows only the current step label on small screens; grid items may shrink (`min-width:0`); page-head actions wrap; KPI tiles and the welcome band wrap. |
| 5 | On small screens, alerts and flow banners with an action squeezed the text into a narrow column. | `final.css`: at ≤ 720 px the action wraps under the text. |
| 6 | Missing CSS listed in the hand-off: `.f-inline` (seat inputs), `.f-mark input` (mark entry), `.f-svc-list` (student services list), `.f-tl-row` (horizontal request timeline). | Added to `final.css`, plus `.f-checklist` and `.btn-danger` used by the licence review. |
| 7 | Licence KPI strip reserved columns for hidden state variants (empty space at 1440 px). | Four tiles with state-driven values. |

## Known limitations (accepted for the prototype)

- Personal names, organisation names and reference numbers stay in Latin script in Bangla mode (demo data).
- The prototype navigation bar floats over the bottom of the page. It is review tooling and is not part of the product.
- In the licence queue, the status filter treats the Flow J row as "Under review" whatever its live state.
- Not covered by this light QA: 1024 px, a full keyboard-only walkthrough, screen-reader testing, a touch-target audit, or a full Bangla read-through of every page.

## How to re-run

```bash
cd .claude-project/design/_build/final && node build.mjs
cd .claude-project/design && python3 -m http.server 8765 --bind 127.0.0.1 &
CHROME=/path/to/chrome node _build/final/qa/qa-final.mjs /tmp/qa-final-out   # needs playwright-core
```

Review entry point: `.claude-project/design/prototype/prototype-index.html`.
