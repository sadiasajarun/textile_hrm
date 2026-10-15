# HANDOFF — Final prototype build (Variation H), continue on another device

**Last updated:** 15 Oct 2026 · **Branch:** `main` · **Status:** about 85% built. **65 of about 71 pages** generate cleanly with full English/বাংলা coverage. The remaining work is listed in §4.

## 1. Read these first (all are in the repo)

| File | What it is |
|---|---|
| `.claude-project/requirements/final/FINAL_CLAUDE_CODE_PROMPT_TEXTILE_HRM.md` | **The build specification.** Follow it. |
| `.claude-project/requirements/final/STAKEHOLDER_FEEDBACK_FINAL.md` | Stakeholder's own feedback (H chosen; logo, images, nav, login, portals, officials, tone) |
| `.claude-project/requirements/final/REFERENCE_IMAGES.md` + `reference-images/*.png` | 12 reference screenshots: IPEMIS hero/stats/help/dashboard, NU utility nav, current H blocks. **View them.** |
| `.claude-project/requirements/final/Core_Features_Textile_Institution_Management_System.docx` | Source of truth #1 (Phase 1 and 2 features) |
| `.claude-project/requirements/Textile_Institution_HRM_License_SOW_v2.pdf` (+ `.md` transcript) | Source of truth #2 |
| `.claude-project/design/FINAL_SCOPE_COVERAGE.md` | Requirement → role → route → workflow → edge case → status matrix (written before coding) |
| `.claude-project/design/assets/images/IMAGE_SOURCES.md` | Image sources (official institution sites + 2 Commons photos) |
| `.claude-project/design/assets/data/OFFICIALS_SOURCES.md` | Published officials (MoTJ/DoT) and the TBD rule for division/district |

Decisions already made. Don't change them.
- Variation H is the baseline. Earlier variations (A–I) stay untouched in `design/variations/`.
- Main nav: Home · About Us · Academic · Admissions · Notice · Help.
  - Admissions stays separate from Academic.
  - Public Dashboard is not in the nav.
- Top utility bar (NU information architecture): Results/Verification · Downloads · Contact · **Government Portals** · Search · বাংলা|English.
- **Student Login** is a prominent header button.
  - Candidates sign in from Admissions.
  - Teachers sign in through the Institution Portal.
- Government Portals are shown in three places: the utility link, a homepage section plus footer strip, and `portals.html`.
  - Each portal (Ministry, Division, District, Institution) has its own sign-in page with a proposed address `*.tims.gov.bd`, labelled "prototype only".
- Officials are only those published on motj.gov.bd and dot.gov.bd: Minister, State Minister, Secretary, and the DG of the Department of Textiles.
  - Division and district officials are shown as TBD cards (role only, no names).
- Images come from official institution sites (GTEC Gopalganj, TECN Noakhali, DTI Dinajpur, DoT). No factory or worker photos.
- Unverified figures carry the "Demo / Illustrative Data" tag. Undefined rules carry "TBD — Requires Client Confirmation".

## 2. How the build works

```
.claude-project/design/_build/final/
  build.mjs            node build.mjs  → writes design/prototype/*.html, assets/final/*, re-copies ghi css/js
  core.mjs             page shells (public header/footer, portal workspace shell), components:
                       t()/tt()/n()/d() bilingual helpers, field(), table(), tabs(), alert(), timeline(), stepper(),
                       kpis(), card(), charts (lineChart, groupedBars, donut, hbars), act() for flow buttons
  data.mjs             demo data (+ re-exports from ../ghi/data.mjs)
  pages/public.mjs     index, about, officials, academic, institutions, institution-profile, notices, notice-detail,
                       gallery, help, verify, public-dashboard, portals
  pages/access.mjs     student-login, portal-ministry/division/district/institution, access-denied, prototype-index
  pages/admission.mjs  admissions, apply (stepper), candidate-login, candidate (Flow A), admission-result
  pages/ministry.mjs   ministry, ministry-institutions/-admissions/-attendance/-budget/-assets/-approvals/-reports/-users/-integrations
  pages/regional.mjs   division, district
  pages/institution.mjs principal, inst-students/-teachers/-classes/-attendance/-results/-requests/-leave/-certificates/
                       -finance/-assets/-procurement/-library/-access
  pages/teacher.mjs    teacher, teacher-attendance, teacher-results, teacher-classes, teacher-leave
  pages/student.mjs    student (?new=1 = newly admitted), student-academics/-results/-services/-request/-payment/
                       -certificate/-profile, alumni
  pages/license.mjs    ← NOT WRITTEN YET (see §4)
  css/final.css        styles on top of ../ghi/css/base.css + h.css (Variation H)
  js/final.js          cross-page demo state (localStorage "tims-proto-v1"): data-when="key=v1|v2", data-set="k=v",
                       data-confirm, data-after-toast, data-after-go, form[data-flow], data-stepper, table filters,
                       form[data-lookup] (+ data-lookup-require), ?reason= / ?new=1 params, "Reset demo data"
```
- Every user-facing string uses `t('English', 'বাংলা')`. **The build fails if any Bangla translation is missing.**
- Icons: Lucide SVGs from `_build/icons` and `_build/ghi/icons`. A new icon needs `npm i lucide-static@0.460.0` in a temporary folder, then `node build.mjs --lucide <that>/node_modules/lucide-static/icons`. The build copies it into `ghi/icons`.
- Flow buttons use `act({ set:'k=v', toast:[en,bn], go:'file.html', confirm:[en,bn], ctext:[en,bn], reason:true })`.
- `when('k=v1|v2', html, tag)` shows a block only in that state.
- Demo state keys and defaults are in `js/final.js` `DEFAULTS`: cand, att, res, req, bud, exp, asset, proc, rep, leave, cert, lic, org, orgpaid, lib, mig, pay, eval.

Run:
```bash
cd .claude-project/design/_build/final
node build.mjs
# open .claude-project/design/prototype/prototype-index.html in a browser
```
Requirements: Node 18 or later. No npm install is needed unless you add new icons.

## 3. Done so far (verified to build)
- Public site: all 13 pages, including the IPEMIS-style hero with large stat panels, insight cards, officials, help tiles and the prominent portals band. The homepage was checked visually.
- Access: student login, 4 portal sign-ins with demo accounts and the invalid-password state, access-denied (permission / noassign / session / locked), prototype index.
- Admissions: Flow A end to end (apply stepper → submitted → pay success/fail → simulated result selected/not selected → final admission → student ID → `student.html?new=1`).
- Ministry (10 pages), Division, District, Institution (14 pages), Teacher (5), Student (8 + alumni).
- Flows B–I are wired through the shared state across these pages.

## 4. Remaining work (do in this order)
1. **Write `pages/license.mjs` (Phase 2, Flow J).** These pages are linked already and are currently dead links:
   - `license.html`: overview, eligibility, fees TBD, Apply / Track buttons, note that the link to Phase 1 certificates is TBD.
   - `license-apply.html`: stepper (personal → qualification → documents → review).
     - Missing-documents error.
     - Duplicate-application edge: a pattern on NID 1990123456789 shows the error.
     - On submit: `lic=submitted`, toast with ref `LIC-APP-2026-00071`, go to `license-track.html`.
   - `license-track.html`: timeline driven by `lic` (none / submitted / approved / issued / rejected). Show `TX-LIC-2026-000418` once issued.
   - `ministry-licenses.html`: page kind `'ministry'`, active `'ministry-licenses'`. Review queue using `LICENSE_APPS` from `data.mjs`. Flow row → Approve & issue number → `lic=issued`; also Reject with reason; returned row. Already in the Ministry sidebar NAV.
   - `verifier-register.html`: organisation registration form (trade licence no., contact, email).
     - Duplicate registration edge.
     - On submit: `org=registered`, go to `verifier.html`.
   - `verifier.html`:
     - If `org=none`, prompt to register.
     - Pay before verifying, with pricing model TBD: success → `orgpaid=yes`; fail → `orgpaid=failed`.
     - Search form `data-lookup` with `data-lookup-require="orgpaid=yes"`. Map `TX-LIC-2026-000418` → valid (only when `lic=issued`; otherwise show "not found"), `TX-LIC-2024-000102` → expired, `TX-LIC-2023-000057` → revoked, else not found. Also include a `locked` result for the unpaid case.
     - Usage history table.
   - Add `'license'` pages to the export map (`build.mjs` already loads `pages/license.mjs` if it exists).
2. Rebuild, then screenshot-check a few pages per role at 1440 and 390 px.
   - Fix layout issues seen: H sidebar active item, any 390 px overflow (wide tables are inside `.f-table-wrap`, which scrolls).
   - Add `.f-inline{width:90px;min-height:36px;border:1px solid var(--border-strong);border-radius:4px;padding:0 8px}` and `.f-mark input{max-width:110px}`, `.f-svc-list` and `.f-tl-row` styles to `final.css` (used in pages but not styled yet).
3. **Light QA**, as the stakeholder asked: not intense. Check core requirements, click through flows A–J from `prototype-index.html`, review UX copy and tone, check the Bangla toggle on a few pages, and confirm there are no dead links. The QA scripts in `_build/ghi/qa/` (`qa-ghi.cjs`, `fshots.cjs`) can be adapted; they need playwright-core and Chrome.
4. **Write the remaining docs** in `.claude-project/design/`:
   - `FINAL_DESIGN_SYSTEM.md`
   - `FINAL_ROUTE_MAP.md` (all `prototype/*.html` with role and purpose)
   - `FINAL_WORKFLOW_MAP.md` (flows A–J step by step with state keys)
   - `FINAL_EDGE_CASE_MATRIX.md` (edge case → where shown)
   - `FINAL_QA_REPORT.md`
   - Then update `FINAL_SCOPE_COVERAGE.md` statuses and `status/textile_hrm/DESIGN_STATUS.md` (selected_variation: H, approved).
5. Commit and push to `main`.

## 5. Final report the stakeholder expects
1. Routes/screens implemented
2. Requirement coverage summary
3. Clickable E2E flows
4. Edge cases handled
5. Remaining TBDs
6. Image/data sources
7. QA results
8. Exact review entry point: `.claude-project/design/prototype/prototype-index.html`
