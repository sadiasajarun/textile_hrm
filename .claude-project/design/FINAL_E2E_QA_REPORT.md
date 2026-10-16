# Textile Institution Management System — Consolidated E2E QA Report

| | |
|---|---|
| **Prototype** | Final end-to-end prototype, Variation H (Phase 1 + Phase 2), 78 pages |
| **Build tested** | `main` @ `bd6f30e`; live site `gh-pages` @ `82a22bc` — the published `prototype/` folder is byte-identical to `main` (78 / 78 files), so the live link and the repository are the same build |
| **Live link** | https://sadiasajarun.github.io/textile_hrm/ (review index) · public site: …/prototype/index.html |
| **Requirement basis** | `Core_Features_Textile_Institution_Management_System.docx` (CF), `Textile_Institution_HRM_License_SOW_v2.pdf` (SOW), `FINAL_CLAUDE_CODE_PROMPT_TEXTILE_HRM.md` (Spec), stakeholder review round 1 (15 Oct 2026) |
| **Inputs merged** | (A) Claude automated + visual E2E QA, 15 Oct 2026 · (B) Independent manual E2E QA on the live site |
| **Date** | 16 Oct 2026 |
| **Repository changes** | None to the prototype. This report is the only file added |
| **Fix round 1** | 16 Oct 2026 · all P2 and P3 findings fixed in `570db89` · regression 163 / 163 PASS · see §12 |

---

## 1. Verdict

> **Update after Fix round 1 (16 Oct 2026):** QA-01 to QA-20 are fixed in `570db89` and the regression suite passes 163 / 163 (§12). D-1 is confirmed (keep the Student / Teacher tabs). The only open item is **D-2**, which is labelled "TBD — Requires Client Confirmation" in the prototype until the client decides. The verdict below is the original pre-fix assessment.

**CONDITIONAL PASS.** The prototype is ready for an internal walkthrough, a stakeholder prototype review and a Ministry demo rehearsal. It is **not yet ready for final UX sign-off**.

Both QA passes agree on the overall picture:
- The public-first Variation H site is coherent and in a government tone.
- The Ministry › Division › District › Institution hierarchy is visible and scoped.
- Every Phase 1 and Phase 2 module is represented.
- The cross-role flows are understandable and clickable end to end.

No P1 defects remain after verification. The independent report's three "must-fix" items were re-tested against the build:
- **Teacher login placement:** a decision conflict between two instructions, not a defect (D-1).
- **Student request history:** confirmed as a gap (QA-04).
- **"Alumni placeholder":** not reproduced. The alumni workspace is functional; one smaller state gap remains (QA-09).

### Exit criteria for final sign-off
1. Confirm decisions **D-1** (where teachers sign in) and **D-2** (Institution Admin vs Principal).
2. Fix the four **P2** findings: QA-01 to QA-04.
3. Re-run the regression suite (`_build/final/qa/qa-final.mjs`) and the page audit, both at 100%.
4. The P3 findings can follow in the design-polish pass. They do not block sign-off.

---

## 2. Scorecard

| Check | Result |
|---|---|
| Pages audited (automated) | 78 / 78 |
| Script errors · broken images · failed requests | 0 · 0 · 0 |
| Dead links · `href="#"` · buttons with no action | 0 · 0 · 0 |
| Form fields without a label | 0 |
| Tabs and dialogs (every one clicked; Escape closes dialogs) | All work |
| Sidebar links leaving their own portal | 0 |
| Logins: Student, Teacher, Candidate, Ministry, Division, District, Institution | 7 / 7 reach the right workspace |
| Bangla mode: visible English on all 78 pages (names and IDs excluded by design) | 0 |
| Page-level sideways scroll / cut-off content at 390 · 1024 · 1440 px | 0 · 0 · 0 |
| Requirements traced (CF §2–3, SOW §3–4, Spec §5–§26) | 67 / 67 present · 2 partly covered (QA-14) |
| Cross-role relation checks | 31 / 40 pass · 7 gaps (QA-01, 05, 06) · 1 false alarm · 1 not a requirement |
| Regression suite (flows A–J, edge cases, Login, Division/District) | 97 / 97 pass |
| **Findings** | **Decisions: 2 · P1: 0 · P2: 4 · P3: 16** |

Severity: **P1** broken / blocks review · **P2** wrong, inconsistent or incomplete; fix before sign-off · **P3** polish; does not block sign-off.
Source: **A** = Claude QA · **B** = independent QA · **A+B** = both.

---

## 3. Decisions required before sign-off

### D-1 — Where do teachers sign in? (B: QA-01 · A: noted)
| | |
|---|---|
| **Conflict** | Spec §7 ("Teacher does NOT use the main public login. Teacher signs in through the Institution Portal.") and the §29 checklist ("Teacher through Institution Portal") put teacher sign-in in the **Institution Portal**. The later stakeholder review round 1 (15 Oct 2026, item 5) asked for **Student and Teacher tabs on the public Login page**. |
| **Current build** | `login.html` has Student / Teacher tabs; `login.html#teacher` opens the Teacher tab; the Institution Portal sign-in shows "Teacher? Sign in on the public website (Login → Teacher)". Officials still use separate portal sign-ins. |
| **Assessment** | Not a defect: the build follows the most recent instruction. The independent QA flagged it against the original spec. The two instructions conflict, so the stakeholder must confirm one. |
| **If kept** | Update Spec §7 / §29 and `FINAL_SCOPE_COVERAGE.md` so the documents match. Fix QA-08 (Teacher breadcrumb). |
| **If reverted** | Remove the Teacher tab from `login.html`, restore the teacher demo account on `portal-institution.html`, restore the Institution Portal label on teacher pages and update docs and the QA script. Small change; no flow logic is affected. |

### D-2 — Institution Admin vs Principal (B: QA-04 · confirmed)
| | |
|---|---|
| **Source** | SOW §3.1 lists **Institution Admin** as a hierarchy tier; SOW §3.3.1 lists **Principal** as the highest institution login; CF §2.2 writes "Institution Admin / Principal". |
| **Current build** | One Institution Portal workspace for the Principal. `ministry-users.html` has separate roles "Institution Admin" and "Principal" that can be assigned to the same person (multi-role). The difference is not explained or labelled TBD. |
| **Decision** | Combined role, or separate roles with defined menus. Until decided, add "TBD — Requires Client Confirmation" next to the two roles in Users & roles. |

---

## 4. Findings

### P2 — fix before sign-off

| ID | Finding | Source | Where | Evidence | Fix |
|---|---|---|---|---|---|
| **QA-01** ✅ Fixed `570db89` | **Issued certificate cannot be verified.** After Flow I the institution page says CERT-2026-00512 is "verifiable at Results / Verification", but both verification pages return "No record found". | A | `verify.html`, `verifier.html`; claim on `inst-certificates.html` | Relation check with `cert=issued`: both lookups return `none` | Add CERT-2026-00512 to both lookup maps, valid when `cert=issued|alumni` (same pattern as licence TX-LIC-2026-000418) |
| **QA-02** ✅ Fixed `570db89` | **Budget unit mismatch.** Division and District *Budget & assets* show allocations in **lakh**; the institution Finance page, Principal dashboard and Ministry Budget show the same allocations in **crore** (Karnaphuli TI: "৳ 3.40 cr" vs "3.40 (৳ lakh)"). | A | `division-resources.html`, `district-resources.html` | Text comparison across 5 pages | Use crore (৳ … cr / কোটি) on both pages |
| **QA-03** ✅ Fixed `570db89` | **"Demo / Illustrative Data" missing in workspaces.** 32 workspace pages (Principal, Teacher, Student and Ministry setup pages) show KPIs, balances and amounts without the label (Spec §10, §29). Public pages are labelled in the footer and on the statistics (B confirms public labelling passes). | A (B: public pass) | 32 `inst-*`, `teacher*`, `student*`, Ministry setup pages | Audit: no demo label on these pages | One persistent "Demo / Illustrative Data" label in the workspace shell (top bar or page foot) |
| **QA-04** ✅ Fixed `570db89` | **No consolidated request history.** All 15 services exist and each request can be tracked. However: the dashboard's "My requests" card lists 3 requests but the rows don't open their tracking pages; *Online services* has no history list; `student-request.html` is reachable only from a "Track request" link while a Testimonial is open; and no menu item is active on that page. | B (QA-03, QA-05) confirmed; A (#9) | `student-services.html`, `student.html`, `student-request.html` | Rows in "My requests" carry no links; no request list on Online services | Add a **My requests** list on Online services (request ID, service, submitted, status, last action, next action, View). Link the dashboard rows to it. Highlight "Online services" on the tracking page. Statuses: Draft · Submitted · Under review · Correction required · Approved · Rejected · Completed. |

### P3 — polish (does not block sign-off)

| ID | Finding | Source | Where | Fix |
|---|---|---|---|---|
| QA-05 ✅ Fixed `570db89` | Dashboards don't show items waiting at that level: District (procurement waiting for review), Division (waiting for recommendation), Ministry (licence application waiting). Spec §18: "What needs my action?" | A | `district.html`, `division.html`, `ministry.html` | Add the item to each action list, shown by flow state |
| QA-06 ✅ Fixed `570db89` | A Ministry migration decision isn't reflected downwards: Division and District still show MG-2026-221 as "Pending" with Recommend / Forward buttons. | A | `division-admissions.html`, `district-admissions.html` | Drive that row from the `mig` state |
| QA-07 ✅ Fixed `570db89` | "Approvals 3" menu badge, but the default list shows 2 rows (the procurement row appears only when the flow reaches that level). | A | Division / District menus | Make the badge follow the state, or show 2 |
| QA-08 ✅ Fixed `570db89` | Teacher pages: the menu says "Teacher workspace", the breadcrumb says "Institution Portal". Depends on D-1. | A | 5 `teacher*` pages | Align to the D-1 decision |
| QA-09 ✅ Fixed `570db89` | **Alumni state before marking.** The alumni workspace is functional: alumni-only menu; employer, position, LinkedIn (URL validated) and directory opt-in; Save with confirmation; certificates card. But before the Principal marks the graduate as alumni (Flow I), the same editable form is already shown, with only an info note. The "restricted until marked" rule isn't demonstrated. | B (QA-02, partly confirmed) | `alumni.html` | Before `cert=alumni`, show a locked "Alumni access opens after the Principal marks you as alumni" state; show the form after |
| QA-10 ✅ Fixed `570db89` | No visible page heading (h1) when no organisation is registered. | A | `verifier.html` (default) | Make the empty-state title an h1 |
| QA-11 ✅ Fixed `570db89` | Duplicate id `ledger` (section and table). | A | `student-payment.html` | Rename the table id |
| QA-12 ✅ Fixed `570db89` | Touch targets: language switch 26 px on public pages and 30 px on portal sign-ins (Spec §25: 44 px for important targets); hero slide dots 12 px; "Forgot password?" and "Mark all present" 23 px (under WCAG 2.2's 24 px). | A | Public header, `index`, `login`, `candidate-login`, `teacher-attendance` | Enlarge hit areas with padding |
| QA-13 ✅ Fixed `570db89` | Flow A: the admitted student appears under "New admissions 2026–27" on the institution's student list, but the tab shows no count, so it is easy to miss. | A | `inst-students.html` | Show a count when `cand=admitted` |
| QA-14 ✅ Fixed `570db89` | Partly covered requirements: (a) teachers ("staff") have no library catalogue view (CF §2.9); (b) SOW §3.3.3 "Teachers can assign classes to students": only the Principal assigns students. B rated class management Pass; A rates it partial. | A | Teacher workspace | Add a library link for teachers. Add "Assign students" to the teacher's own classes, or confirm with the client that it is Principal-only. |
| QA-15 ✅ Fixed `570db89` | Mobile: the public institution directory is a 4-column table that scrolls sideways inside its frame at 390 px (Spec §25: public pages must be strong on mobile). | A | `institutions.html` | Card rows under 720 px |
| QA-16 ✅ Fixed `570db89` | "৳ 22.30 lakh" KPI wraps onto two lines at 1440 px (changes with QA-02). | A | `division-resources.html` | Shorter format or smaller currency KPI |
| QA-17 ✅ Fixed `570db89` | Mobile home: the fifth count ("47 Districts covered") sits alone on its row. | A | `index.html` @ 390 px | Let the last item span both columns |
| QA-18 ✅ Fixed `570db89` | Open client items not labelled TBD in the prototype: per-role dashboard widgets (Customise dialog; SOW §6); library feature set as a proposal for client sign-off (SOW §6); Registration History / Pre-Registration / Course Advising Table placement (SOW §6, only in docs); Institution Admin vs Principal (D-2). | A (from B's TBD list) | `ministry.html`, `inst-library.html`, `student-academics.html`, `ministry-users.html` | Add "TBD — Requires Client Confirmation" or "Proposed — for client sign-off" notes |
| QA-19 ✅ Fixed `570db89` | Urgent notices are marked by a red bold "Urgent" label (plus pinned card), but could stand out more in long lists. | B (minor) | `notices.html`, homepage notices | Optional: urgent badge or left accent on the row |
| QA-20 ✅ Fixed `570db89` | Division and district officials are shown as role cards with "TBD — Requires Client Confirmation". This is required by the project rule (only published officials; never invent names), so keep the TBD tag. The heading wording can be softened ("To be published by the Department of Textiles"). | B (QA-06) | `officials.html`, `about.html` | Optional wording change only |

---

## 5. Reconciliation of the two reports

### 5.1 Independent report (B), re-tested against the build

| B item | B severity | Re-test result | Consolidated as |
|---|---|---|---|
| QA-01 Teacher login on public login page | Must fix | **Decision conflict.** Matches the latest stakeholder instruction (round 1, item 5) but not Spec §7/§29. | D-1 |
| QA-02 Alumni management incomplete / placeholder | Must fix | **Not reproduced as stated.** Alumni-only menu, profile form (employer, position, LinkedIn with validation, directory opt-in), Save with confirmation, certificates card; Principal "Mark as alumni"; Login "sign in as alumnus". **Partly confirmed:** the locked state before marking is missing. | QA-09 (P3) |
| QA-03 No consolidated My Requests history | Must fix | **Confirmed.** Dashboard card lists 3 requests without links; no history list. | QA-04 (P2) |
| QA-04 Institution Admin vs Principal | Should fix | **Confirmed.** Separate roles exist in Users & roles; the relationship is undefined and not marked TBD. | D-2 |
| QA-05 My Requests CTA on Online services | Should fix | **Confirmed.** | Merged into QA-04 |
| QA-06 Officials TBD cards | Should fix | **By design** (project rule). Optional wording polish. | QA-20 (P3, optional) |
| QA-07 Procurement chain must stay visibly Proposed/TBD | Should fix | **Already met.** Labelled on `inst-procurement`, `district-approvals`, `division-approvals`, `ministry-approvals`. | Closed |
| QA-08 Report export/download regression | Should fix | **Covered to prototype limits:** filters, generate, preview, no-data state, scope limits per level, Download PDF/Excel (prototype message). Real files and file names are a build-phase test. | Closed (build-phase test) |
| "Sidebar has Track Request" | Observation | **Not reproduced.** The student menu has no such item; the tracking page has no menu entry. | Part of QA-04 |
| Attendance warning should deep-link | Minor | **Not reproduced.** "See by course" links to `student-results.html#attendance` and opens the attendance tab. | Closed |
| Urgent notices more distinct | Minor | **Partly.** Red bold label and pinned card exist; optional enhancement. | QA-19 |
| Help contact form submit always visible | Minor | **Not reproduced.** `help.html#contact` has a Submit button and returns a reference number. | Closed |
| Hero carousel ARIA labels | Minor | **Not reproduced.** All 6 controls have bilingual labels ("Previous photo", "Photo 1–3", "Next photo", "Pause slideshow"; pause has `aria-pressed`). | Closed |
| Reviewer controls English in Bangla mode | Minor | Agreed: acceptable. It is the prototype review bar, not part of the product. | Accepted |
| Bilingual pass (Home, Student dashboard) | Pass | Extended: all 78 pages verified, 0 visible English strings. | Pass |
| Public data integrity labelled Demo | Pass | Agreed for public pages; workspaces are not labelled. | QA-03 |

### 5.2 Found by A only (not in B)
QA-01 certificate verification · QA-02 budget units · QA-03 workspace demo labels · QA-05 to QA-08 cross-role relations and labels · QA-10 to QA-17 accessibility, responsive and data details · QA-18 TBD labels missing in the prototype.

---

## 6. Requirement coverage

| Section | Requirement | Screens | Status |
|---|---|---|---|
| CF 2.1 · SOW 3.2.1–2 | Categories; institutions linked to division/district; users across the hierarchy; roles with granular permissions; multi-role | `ministry-institutions`, `ministry-users` | Pass (D-2 open) |
| CF 2.2 · SOW 3.1 | RBAC cascade: Ministry (all) › Division (own) › District (own) › Institution › Teacher/Student; access-denied, session, locked, no-assignment states | All portals, `access-denied` | Pass |
| CF 2.3 · SOW 3.2.3, 3.2.6 | Configurable dashboard; reports by institution, division, district and date; download; live attendance at Head Office | `ministry`, `ministry-reports`, `division-reports`, `district-reports`, `ministry-attendance` | Pass (QA-18: per-role widgets TBD) |
| CF 2.4 · SOW 3.2.4 | Cycle setup (eligibility, quota, documents); online application and tracking; result publication; allocation; migration | `ministry-admissions`, `apply`, `candidate`, `admission-result`, `inst-students`, Division/District admissions | Pass (QA-06) |
| CF 2.5 · SOW 3.3.2–3.3.4, 3.3.9 | Teacher and student records; classes; teacher materials; student portal; semester results; grade table, advising, evaluation, curriculum, conduct, calendar | `inst-*`, `teacher-*`, `student-*` | Pass; SOW 3.3.3 partial (QA-14b) |
| CF 2.6 · SOW 3.3.5 | Live attendance: teacher-controlled capture, teacher's own attendance, Head Office view | `teacher-attendance`, `inst-attendance`, District / Division / Ministry | Pass |
| CF 2.7 · SOW 3.3.4(1) | 15 online services; approval workflow; status tracking | `student-services`, `student-request`, `inst-requests` | Pass with gap (QA-04) |
| CF 2.8 · SOW 3.2.5, 3.3.6–7 | Budget per institution; expenses and utilisation; assets assigned to people; status incl. damaged/lost with reason; procurement → PO → LC → gate pass | `ministry-budget`, `inst-finance`, `ministry-assets`, `inst-assets`, `inst-procurement` | Pass (QA-02); approval chain TBD |
| CF 2.9 · SOW 3.3.8 | Catalogue and copies, members, issue/return, due dates, fines, search | `inst-library`, `student-academics#library` | Pass; staff access partial (QA-14a); feature set proposal unlabelled (QA-18) |
| CF 2.10 · SOW 3.3.10 | Leave types CL/SL/EL; apply / approve / reject; balance; broader HRM labelled TBD | `teacher-leave`, `inst-leave`, `inst-teachers` | Pass |
| CF 2.11 · SOW 3.3.12–14 | Certificate application and issue; MY GOV as TBD boundary; mark alumni after final result; alumni-only menu with job and LinkedIn | `student-certificate`, `inst-certificates`, `ministry-integrations`, `alumni` | Pass with gaps (QA-01, QA-09) |
| SOW 3.3.4, 3.3.11 | Student profile (certificate rule TBD); ledger; Principal sets role-based menu access | `student-profile`, `student-payment`, `inst-access` | Pass |
| CF 3.1–3.5 · SOW 4 | Public licence application; Head Office review, approve/reject, unique number; organisation registration; search by number; payment first (pricing TBD) | `license*`, `ministry-licenses`, `verifier-register`, `verifier` | Pass |
| Spec §5–§17, §26 | Nav, utility bar, prominent Login, candidate login under Admissions, portal visibility, homepage sequence, large illustrated stats, public dashboard (not in nav), officials (published only), notices, gallery, help, footer, review index | Public site, `login`, `prototype-index` | Pass (D-1 open) |
| Spec §18–§19 | Role home pages answer: what is happening, what needs my action, what is pending, notices, what next | 7 dashboards | Pass (QA-05) |
| Spec §22–§23 | Flows A–J and the edge-case list | §7 below; `FINAL_EDGE_CASE_MATRIX.md` | Pass |
| Spec §24–§25 | Tables (search, filter, status, pagination, row actions, export); forms (labels, stepper, save draft, inline validation, review, reference number); accessibility; responsive | All | Pass (QA-12, QA-15) |

---

## 7. Flows and cross-role relations

| Flow | Path | Result |
|---|---|---|
| **A** Candidate → Student | Apply → candidate ID → pay → result → final admission → student ID → student portal; student appears in the institution list | Pass (QA-13) |
| **B** Attendance | Teacher submits → Institution 72.4 → 76.9% · District 76.8 → 77.9% · Division 79.2 → 79.6% · National 85.1 → 85.2% | Pass |
| **C** Results | Teacher enters (missing / over-maximum marks blocked) → Principal publishes → student sees the result only after publication | Pass |
| **D** Service request | Submit → return for correction → resubmit → approve → complete; status reaches the student | Pass (QA-04: no history list) |
| **E** Budget | Ministry allocates → institution sees it → records expense → utilisation | Pass (QA-02 units) |
| **F** Assets | Allocate → assign → transfer → return → damaged/lost → recovered, with history | Pass |
| **G** Procurement | Institution → District forwards → Division recommends → Ministry approves → PO → LC → receipt → gate pass; each level sees it only at its turn | Pass (chain labelled TBD; QA-05) |
| **H** Leave | Teacher applies (balance and overlap checks) → Principal approves → balance updates | Pass |
| **I** Certificate → Alumni | Graduate applies → Principal issues → marks alumni → alumni portal | Pass; verification step fails (QA-01); pre-marking state (QA-09) |
| **J** Licence | Apply (duplicate and missing-document checks) → track → Head Office approves and issues TX-LIC-2026-000418 / returns / rejects → organisation registers → search locked until payment → pay (success / pending / failed) → valid / expired / revoked / not found | Pass |
| Logins | Student, Teacher, Candidate, 4 portals; wrong password → error and lock-out rule | Pass (D-1) |
| State coverage | 17 flow states × 59 page/state pairs render a defined view on every page that reacts | Pass |

---

## 8. UI / UX assessment

- **Public website: strong (A+B).** Public-first, not a dashboard; correct 6-item nav; Academic and Admissions separate; public dashboard outside the nav; real institution imagery; large illustrated statistics; notices, gallery and help; Government Portals visible in 4 places; formal government tone.
- **Workspaces: good (A+B).** Role-specific and action-first, with familiar tables and forms and conventional charts; not "AI-dashboard" styled. One shell across portals with the scope box and proposed secure address. Keep grouped navigation and contextual tabs as modules grow (B).
- **Consistency:** shared header, footer and shell on every page; breadcrumbs match their portal except Teacher (QA-08).
- **Data consistency across pages:** 59 institutions (8 + 10 + 41), 38,420 students, 2,146 teachers, Chattogram Division 9 institutions / 6,120 students, Karnaphuli TI 812 students / 72.4%, and every flow reference number agree. Budget units are the exception (QA-02).
- **Accessibility:** labelled fields, visible focus, keyboard tabs, Escape closes dialogs, bilingual ARIA labels on the carousel, one h1 per page (except QA-10), small targets (QA-12).
- **Responsive:** no page-level sideways scroll at 390, 1024 or 1440 px. Public, candidate, student and licence pages stack cleanly on mobile. Wide tables scroll inside their frame (QA-15).
- **Bilingual:** all 78 pages switch fully (A); B confirms Home and Student. Names, IDs and the prototype review bar stay in Latin script by design.
- **Images and officials:** only official institution / Department of Textiles photographs and the 4 published officials; all 58 images on image pages load.

---

## 9. Open client items — correctly TBD, not bugs

| # | Item | Shown in the prototype as TBD? |
|---|---|---|
| 1 | Admission eligibility, quota and document rules | Yes — `admissions`, `ministry-admissions` |
| 2 | MY GOV API use case | Yes — `ministry-integrations` |
| 3 | Dashboard widgets / KPIs per role | Yes — `ministry` Customise dialog (fixed, QA-18) |
| 4 | Library feature set (design proposal for client sign-off) | Yes — `inst-library` "Proposed — for client sign-off" (fixed, QA-18) |
| 5 | Leave types beyond CL/SL/EL and accrual rules | Yes — `inst-leave` |
| 6 | Licence verification pricing (per check vs subscription), gateway, invoicing | Yes — `verifier`, `ministry-licenses` |
| 7 | Link between Phase 1 certificates and Phase 2 licences | Yes — `license`, `license-apply`, `ministry-licenses` |
| 8 | Divisions and districts as official administrative units | Yes — `ministry-institutions` |
| 9 | Student profile vs issued certificate rule | Yes — `student-profile` |
| 10 | Procurement / LC / PO / gate-pass approval chain and fields | Yes — `inst-procurement`, District / Division / Ministry approvals |
| 11 | Broader staff HRM beyond leave | Yes — `inst-teachers` |
| 12 | Registration History / Pre-Registration / Course Advising Table placement | Yes — `student-academics` (fixed, QA-18) |
| 13 | Licence eligibility, validation criteria, validity, renewal, appeal | Yes — `license`, `license-track`, `ministry-licenses#rules` |
| 14 | Approval of third-party organisation accounts; terms of use | Yes — `verifier-register` |
| 15 | Division and district responsible officials | Yes — `officials`, `about` |
| 16 | Production portal domains (`*.tims.gov.bd`) | Yes — "Proposed secure address — prototype only" |
| 17 | Institution Admin vs Principal | Yes — `ministry-users` Roles and Multi-role tabs (D-2 still open) |
| 18 | Teacher sign-in location | Decided — D-1: keep Student / Teacher tabs on the public Login |

---

## 10. Method and evidence

| Pass | What was done |
|---|---|
| A — automated page audit (Playwright, Chromium) | Every page in its default state, checked for: script and console errors; failed requests; h1 count; image alt and load; buttons without a handler; links without a target; unlabelled fields; duplicate ids; target sizes; leftover text (`undefined`, `NaN`, `TODO`); chart unit/source lines; demo labels; active menu item; sidebar portal; sign-out target. Every tab and dialog was clicked. Bangla mode was checked on all 78 pages, and overflow at 390, 1024 and 1440 px. |
| A — relation matrix | 17 flow-state keys set to every value; every page that reacts was loaded; targeted checks on numbers and statuses that must agree across portals; 7 logins |
| A — requirement trace | 67 items from CF, SOW and Spec probed in the built pages; automatic misses checked by hand |
| A — visual review | Full-page screenshots of all 78 pages at 1440 px and 37 public/learner pages at 390 px; contact-sheet review plus spot checks; scroll-through image-load check |
| A — regression | `_build/final/qa/qa-final.mjs`: 97 / 97 |
| B — independent manual QA | Live site walkthrough of the public site, workspaces, flows, Bangla (Home, Student dashboard) and public data labelling |
| Reconciliation | Every B finding re-tested on the same build (live = `main`, verified file by file); result recorded in §5.1 |

---

## 11. Sign-off checklist

- [x] D-1 confirmed by the stakeholder: **keep** the Student / Teacher tabs on the public Login; Teacher breadcrumb aligned (QA-08); docs aligned
- [ ] D-2 confirmed (Institution Admin and Principal combined or separate) — **open**; labelled "TBD — Requires Client Confirmation" in Users & roles (done in `570db89`)
- [x] QA-01 certificate verifiable after issue (public and organisation search) — `570db89`
- [x] QA-02 budget units consistent (crore) — `570db89`
- [x] QA-03 "Demo / Illustrative Data" visible in every workspace — `570db89`
- [x] QA-04 "My requests" history list, linked from the dashboard — `570db89`
- [x] Regression suite 100% (163 / 163) and page audit clean after fixes
- [x] P3 items QA-05 to QA-20 fixed in the same round — `570db89`

---

## 12. Fix round 1 — 16 Oct 2026

**Commit:** `570db89` (generator in `_build/final/`, rebuilt `prototype/` and `assets/final/`). Earlier variations and `DESIGN_SYSTEM_A–F` are unchanged. All new strings are bilingual (the build fails on missing Bangla). No new government data, officials or photos were added; unknown rules are labelled "TBD — Requires Client Confirmation" and proposals "Proposed — for client sign-off".

| ID | What changed | Pages |
|---|---|---|
| QA-01 | CERT-2026-00512 returns "Valid certificate" on both lookups when `cert=issued|alumni`; before issue it returns "No record found" with a prototype note pointing to Flow I | `verify`, `verifier` |
| QA-02 | Division / District budgets in ৳ crore (KPIs and column headers), matching institution Finance, Principal and Ministry Budget | `division-resources`, `district-resources` |
| QA-03 | Workspace shell shows a "Demo / Illustrative Data" chip in the top bar (≥ 1200 px) and a demo note at the foot of every workspace page | all workspace pages |
| QA-04 | *My requests* list on Online services (ID, service, submitted, status, last action, next action, View; search and status filter; SR-2026-01512 follows `req`); dashboard rows link to their tracking views; `student-request.html?id=01467|01310` views; Online services active on the tracking page; record counts follow the demo state | `student`, `student-services`, `student-request` |
| QA-05 | Waiting items by flow state: District (`proc=submitted`), Division (`proc=dforward`), Ministry (`lic=submitted`, LIC-APP-2026-00071) — banner plus action-list / approvals row | `district`, `division`, `ministry` |
| QA-06 | MG-2026-221 shows "Approved by the Ministry" and hides Recommend / Forward when `mig=approved`; it leaves the District approvals queue | `division-admissions`, `district-admissions`, `district-approvals` |
| QA-07 | Approvals menu badge follows the rows shown (Division 2 / 3 with `proc=dforward`; District 1–3 by `proc` and `mig`); District Actions tab count follows `proc` | Division / District menus |
| QA-08 | Teacher breadcrumb starts with "Teacher workspace" (D-1 kept) | 5 `teacher*` pages |
| QA-09 | Alumni page is locked ("Alumni access opens after the Principal marks you as alumni") until `cert=alumni`; the profile form shows after | `alumni` |
| QA-10 | Empty-state title is the page `h1` when no organisation is registered | `verifier` |
| QA-11 | Ledger table id renamed (`ledger-tbl`); no duplicate ids | `student-payment` |
| QA-12 | Language switch 44 px on public pages and portal sign-ins; hero dots 24 px hit area; "Forgot password?" and "Mark all present" ≥ 24 px | public header, `index`, `login`, `portal-*`, `teacher-attendance` |
| QA-13 | "New admissions 2026–27" tab shows a count (1) when `cand=admitted` | `inst-students` |
| QA-14 | Teacher menu "Library catalogue" → catalogue with search and Request / Reserve; "Assign students" on the teacher's classes with a TBD note on whether the Principal approves | `teacher-classes`, teacher menu |
| QA-15 | Institution directory becomes card rows under 720 px (no sideways scroll in the frame) | `institutions` |
| QA-16 | Budget KPIs ("৳ 22.30 cr") stay on one line at 1440 px | `division-resources`, `district-resources` |
| QA-17 | The fifth count ("47 Districts") spans the row on tablet and mobile | `index` |
| QA-18 | TBD / proposal labels: per-role widgets (Customise dialog), library feature set, Registration History / Pre-Registration / Course Advising Table placement, Institution Admin vs Principal (D-2, Roles and Multi-role tabs) | `ministry`, `inst-library`, `student-academics`, `ministry-users` |
| QA-19 | Urgent notices get a red left accent and a tinted "Urgent" badge | `notices`, home notices |
| QA-20 | Division / district official headings read "to be published by the Department of Textiles"; TBD tags kept | `officials` |

### Regression result
- `node build.mjs`: 78 pages, 71 icons, no errors.
- `_build/final/qa/qa-final.mjs`: **163 / 163 PASS**, 0 script errors, 0 failed requests. That is the 97 original checks plus 66 new: at least one check per fix (QA-01 to QA-20), record count vs rows, and Bangla checks on 18 more changed pages.
- Overflow: 0 pages with sideways scroll at 1440 and 390 (all 78 pages) and at 1440 / 1024 / 390 for the 29 changed pages, in the default state and a combined flow state.
- Screenshots of the 29 changed pages at 1440 / 1024 / 390 (2 states, 174 images) were reviewed; no cut-off text. Bangla mode on the changed pages shows no visible English apart from names and IDs.
- The Bangla check in the script now uses rendered boxes (`getClientRects`), so SVG map labels are measured correctly.

### Still open
- **D-2** Institution Admin vs Principal: client decision. The prototype labels both roles TBD until then.
