# FINAL_SCOPE_COVERAGE — Textile Institution Management System (final prototype, Variation H)

**Date:** 15 Oct 2026 · **Status:** final prototype complete (78 routes, flows A–J), light QA passed; stakeholder review round 1 applied · **Baseline:** Variation H (approved) · **Prototype root:** `.claude-project/design/prototype/` · **Review entry:** `prototype/prototype-index.html`

**Sources, in priority order:**
1. `Core_Features_Textile_Institution_Management_System.docx` (CF)
2. `Textile_Institution_HRM_License_SOW_v2.pdf` (SOW)
3. `FINAL_CLAUDE_CODE_PROMPT_TEXTILE_HRM.md` (stakeholder instruction)
4. Variation H and the repo docs

**Status legend:**
- **Built:** a working screen or flow in the prototype.
- **Built (state):** shown as an edge state through a shared banner, timeline or empty state.
- **TBD:** shown as a labelled boundary, `TBD — Requires Client Confirmation`. No rule is invented.

All routes are files in `prototype/`. A route written `x.html#tab` is a tab on that page.

---

## A. Public website and access (stakeholder instruction §3–§17)

| Requirement | Role | Route / screen | Workflow | Edge cases | Status |
|---|---|---|---|---|---|
| Official MoTJ logo, ownership | Public | All public headers (`assets/brand/motj-logo.png`) | — | — | Built |
| Main nav: Home, About Us, Academic, Admissions, Notice, Help | Public | `index.html` header | — | Long Bangla labels | Built |
| Top utility: Results/Verification, Downloads, Contact, Government Portals, Search, বাংলা/English | Public | Header utility bar | Search dialog | No search results | Built |
| Login (prominent header button) with Student / Teacher tabs | Student, Teacher | Header button → `login.html` | Student → `student.html`; Teacher → `teacher.html` | Invalid credentials, account locked (state) | Built |
| Candidate login only from Admissions | Candidate | `admissions.html` → `candidate-login.html` | Sign in → `candidate.html` | Invalid ID/DOB | Built |
| Teacher signs in on the public Login page (Teacher tab) | Teacher | `login.html#teacher` → `teacher.html` | Classes, attendance, results, leave | Wrong password | Built |
| Government Portals: utility link, homepage/footer block, panel on the Login page | Officials | `login.html#portals`, homepage §13, footer | Card → portal sign-in page → workspace | "Proposed secure address — prototype only" label | Built |
| Homepage sequence (14 sections) | Public | `index.html` | — | Demo data labels | Built |
| Large IPEMIS-style statistics | Public | `index.html` hero panels and band | — | Demo / Illustrative label | Built |
| Public Dashboard (not in nav) | Public | `index.html#insights` CTA → `public-dashboard.html` | Filter by division/year | No data for a filter | Built |
| About Us + Responsible Officials (Ministry, Division, District; no principals/teachers) | Public | `about.html`, `officials.html` | View profile dialog | Division/district officials not published → TBD cards | Built / TBD |
| Academic (programmes, technologies, curriculum, calendar, regulations, institutions) | Public | `academic.html`, `institutions.html`, `institution-profile.html` | Directory search/filter | No institution found | Built |
| Notice system (categories, pinned, urgent, authority, attachment, search, archive) | Public | `notices.html` | Filter → detail | Empty category/year | Built |
| Notice detail (related, previous/next) | Public | `notice-detail.html` | — | — | Built |
| Photo Gallery with captions and sources | Public | `gallery.html`, homepage §11 | Lightbox | — | Built |
| Help: FAQ, guides, videos, forms/downloads, help desk/contact | Public | `help.html` (#faq, #guides, #videos, #downloads, #contact) | — | — | Built |
| Results / Verification (public) | Public | `verify.html` | Search by certificate number | Not found, revoked | Built |
| Structured footer (NU IA) | Public | All public pages | — | — | Built |
| Bilingual (EN/বাংলা) everywhere | All | Every page | Persistent toggle | Long text | Built |
| Prototype review index | Reviewer | `prototype-index.html` | — | Reset demo data | Built |

## B. Phase 1 — Central administration (SOW §3.1–3.2, CF §2.1–2.4, 2.8)

| Requirement | Role | Route / screen | Workflow | Edge cases | Status |
|---|---|---|---|---|---|
| Hierarchy RBAC (Ministry › Division › District › Institution › Principal/Teacher/Student) | All | Portal sign-ins, scope chip on every workspace, `access-denied.html` | Scope enforced in UI | Permission denied, no assignment, session expired | Built |
| Institution categories (add/manage) | Ministry | `ministry-institutions.html#categories` | Add category dialog | Duplicate name | Built |
| Institutions (add/manage, link to division/district) | Ministry | `ministry-institutions.html` | Add institution drawer | Missing district | Built |
| Division/District linkage | Ministry | `ministry-institutions.html#geo` | — | District with no institution | Built |
| Users, roles, granular permissions, multi-role | Ministry | `ministry-users.html` (Users / Roles & permissions / Assignments) | Add user, assign roles | Role conflict warning, unassigned user | Built |
| Configurable dashboard (widgets) | Ministry | `ministry.html` Customise dialog | Toggle widgets | — | Built |
| Reports: view, filter, download | Ministry / Division / District / Principal | `ministry-reports.html`, `division-reports.html`, `district-reports.html` (scope-limited) | Filter → preview → download | No data for filter | Built |
| Admission setup (cycle, eligibility, quota/seats, documents) | Ministry | `ministry-admissions.html#setup` | Edit cycle | Cycle closed | Built |
| Application oversight, result publication, allocation | Ministry | `ministry-admissions.html#oversight` | Publish result → allocation | — | Built |
| Student migration | Ministry / Principal | `ministry-admissions.html#migration`, `ministry-approvals.html` | Request → approve | Seat unavailable | Built |
| Budget allocation per institution | Ministry | `ministry-budget.html` | Allocate → institution receives | Insufficient head balance, revision | Built (Flow E) |
| Asset allocation per institution | Ministry | `ministry-assets.html` | Allocate batch → institution | — | Built (Flow F) |
| Consolidated institution-wise reports | Ministry | `ministry-reports.html` | — | — | Built |
| Division and District scoped modules (admissions, budget & assets, approvals, reports) — access cascades down the hierarchy | Division / District | `division-admissions/-resources/-approvals/-reports.html`, `district-…` (same set) | Monitor; District reviews and forwards, Division recommends, Ministry approves | Other jurisdictions not listed; chain TBD | Built / TBD |
| Live attendance on Head Office dashboard | Ministry / Division / District | `ministry-attendance.html`, `division.html`, `district.html` | Teacher submit → aggregate update | Missing, late | Built (Flow B) |
| Approvals / escalations queue | Ministry (final), Division (recommend), District (forward) | `ministry-approvals.html`, `division-approvals.html`, `district-approvals.html` | Forward → recommend → approve / return | Overdue SLA | Built |

## C. Phase 1 — Institution level (SOW §3.3, CF §2.5–2.11)

| Requirement | Role | Route / screen | Workflow | Edge cases | Status |
|---|---|---|---|---|---|
| Teacher records | Principal | `inst-teachers.html` | Add teacher | Duplicate NID/email | Built |
| Student records; auto-assignment from admission; manual change | Principal | `inst-students.html` | Admitted list → confirm; change assignment | Seat full | Built |
| Classes; assign teacher; assign students | Principal / Teacher | `inst-classes.html`, `teacher-classes.html` (Assign students on the teacher's own classes) | Create class, assign | Teacher already at capacity; whether the Principal approves a teacher's change **TBD** | Built / TBD |
| Class content/materials | Teacher | `teacher-classes.html` | Upload material | File type/size error | Built |
| Live attendance (teacher-controlled student capture; teacher attendance) | Teacher / Principal | `teacher-attendance.html`, `inst-attendance.html` | Take → submit → correction | Late, missing, correction request | Built (Flow B) |
| Result entry, validation, calculation, publish, history/correction | Teacher / Principal / Student | `teacher-results.html`, `inst-results.html`, `student-results.html` | Enter → submit → validate → publish → student sees | Mark > max, missing marks, correction after publish | Built (Flow C) |
| Student portal: classes, content, attendance, results, profile | Student | `student.html`, `student-academics.html`, `student-results.html`, `student-profile.html` | — | Profile lock after certificate (TBD) | Built / TBD |
| Ledger, grade table, advising, teaching evaluation, curriculum analysis, code of conduct, academic calendar | Student | `student-academics.html` tabs, `student-payment.html#ledger`, `student-results.html#grades` | Evaluation submit | Evaluation closed | Built |
| 15 online services, one common request framework; *My requests* history (ID, service, submitted, status, last / next action) | Student / Principal | `student-services.html#requests`, `student-request.html`, `inst-requests.html` | Submit → review → correction/approve/reject → completed | Returned, rejected, fee unpaid | Built (Flow D) |
| Online payment (fees) | Student / Candidate | `student-payment.html`, `candidate.html` | Pay → success/failed | Payment failed/pending | Built |
| Finance: expenses, utilisation vs allocation | Principal | `inst-finance.html` | Record expense → utilisation | Duplicate expense, over budget | Built (Flow E) |
| Assets: allocation, assign to person, holder, availability, damaged/lost + reason, history | Principal | `inst-assets.html` | Assign → transfer/return → damaged/lost → recovered | Already assigned | Built (Flow F) |
| Procurement, PO, LC upload, Gate Pass | Principal / District / Division / Ministry | `inst-procurement.html`, `district-approvals.html`, `division-approvals.html`, `ministry-approvals.html` | Request → approval → PO → LC → receive → inventory → gate pass | Approval chain TBD | Built / TBD |
| Library: catalogue, copies, members, issue/return, due, fine, search | Principal (librarian) / Student / Teacher (staff) | `inst-library.html`, `student-academics.html#library`, `teacher-classes.html#library` (feature set labelled *Proposed — for client sign-off*) | Issue → return → fine | Unavailable, overdue, lost | Built |
| Leave: CL/SL/EL + configurable; apply, approve/reject, balance | Teacher / Principal | `teacher-leave.html`, `inst-leave.html` | Apply → review → balance | Insufficient, overlap, withdrawn | Built (Flow H) |
| Broader staff HRM (service history, promotion) | — | Not built | — | — | TBD (SOW §6, out of confirmed scope) |
| Role-based menu access within the institution | Principal | `inst-access.html` | Toggle menus per role | — | Built |
| Certification after graduation | Graduate / Principal | `student-certificate.html`, `inst-certificates.html` | Apply → review → issue | Not eligible, duplicate, data mismatch | Built (Flow I) |
| MY GOV API integration | System | `ministry-integrations.html`, verification step in `student-certificate.html` | Boundary only | API unavailable, timeout, mismatch | TBD (use case unconfirmed) |
| Alumni: mark after final result; alumni-only menu; job/LinkedIn | Principal / Alumni | `inst-certificates.html#alumni`, `alumni.html` | Mark alumni → alumni login | Locked until marked as alumni | Built (Flow I) |

## D. Phase 2 — Professional license verification (SOW §4, CF §3)

| Requirement | Role | Route / screen | Workflow | Edge cases | Status |
|---|---|---|---|---|---|
| Licence overview (who can apply, how it works, documents, fees) | Public | `license.html` | Apply / Track | Eligibility, fees, validity **TBD** | Built / TBD |
| Public license application (form, documents, submit) | Professional | `license-apply.html` | 4-step stepper → submit → reference LIC-APP-2026-00071 | Duplicate application (NID), missing documents, already applied, previously rejected | Built (Flow J) |
| Track application | Professional | `license-track.html` | Find by reference + mobile → status timeline | Not found, not submitted yet, returned (upload + resubmit), rejected with reason, issued | Built (Flow J) |
| Head Office review against validation criteria | Ministry | `ministry-licenses.html` (Applications) | Review panel: details, documents, checklist | Full validation criteria **TBD** | Built / TBD |
| Approve / reject; issue unique number | Ministry | `ministry-licenses.html` | Approve and issue `TX-LIC-2026-000418` · Return for correction · Reject with reason | Returned, rejected | Built (Flow J) |
| Issued licence register | Ministry | `ministry-licenses.html#issued` | Search, status filter | Valid, expired, revoked; renewal/revocation rules **TBD** | Built / TBD |
| Third-party organisation registration | Organisation | `verifier-register.html` | Register → verification workspace | Duplicate trade licence, already registered; account approval **TBD** | Built / TBD |
| Pay before verification | Organisation | `verifier.html` | Pay → search unlocked | Search locked before payment, payment pending, payment failed; pricing model and gateway **TBD** | Built / TBD |
| Search by license/certificate number; result | Organisation | `verifier.html` | Search → valid / expired / revoked / not found; Phase 1 certificates also verifiable | Not found | Built (Flow J) |
| Usage history | Organisation | `verifier.html` | Payment and searches recorded | No checks yet (empty state) | Built |
| Verifier organisations list | Ministry | `ministry-licenses.html#orgs` | — | — | Built (demo data) |
| Link between Phase 1 certificate and Phase 2 license | — | Noted in `license.html`, `license-apply.html`, `ministry-licenses.html#rules` | — | — | TBD |

## E. Critical E2E flows (stakeholder instruction §22)

| Flow | Path |
|---|---|
| **A** Candidate → Student | `admissions` → `apply` (stepper) → `candidate` (pay) → result → final admission → student ID → `student` |
| **B** Attendance | `teacher-attendance` → `inst-attendance` → `district` / `division` / `ministry-attendance` |
| **C** Results | `teacher-results` → `inst-results` → `student-results` |
| **D** Service request | `student-services` → `inst-requests` → `student-request` → completed |
| **E** Budget | `ministry-budget` → `inst-finance` → `ministry-budget#utilisation` |
| **F** Assets | `ministry-assets` → `inst-assets` (assign → transfer/return → damaged/lost → history) |
| **G** Procurement | `inst-procurement` → `district-approvals` → `division-approvals` → `ministry-approvals` → `inst-procurement` (PO → LC → receive → gate pass) |
| **H** Leave | `teacher-leave` → `inst-leave` → `teacher-leave` (balance) |
| **I** Certificate → Alumni | `student-certificate` → `inst-certificates` → `alumni` |
| **J** License | `license-apply` → `ministry-licenses` → `verifier-register` → `verifier` |

Cross-page flow state is kept in browser storage (`final.js`). The prototype index has a **Reset demo data** control. Detailed steps are in `FINAL_WORKFLOW_MAP.md`; edge cases in `FINAL_EDGE_CASE_MATRIX.md`; routes in `FINAL_ROUTE_MAP.md`; QA in `FINAL_QA_REPORT.md`. All ten flows pass the click-through check.

## E2. Stakeholder decisions (recorded 16 Oct 2026)

| # | Decision | Outcome | Effect in the prototype |
|---|---|---|---|
| D-1 | Where do teachers sign in? (Spec §7 / §29 vs. stakeholder review round 1, item 5) | **Decided: keep** the Student / Teacher tabs on the public Login page. This supersedes Spec §7 / §29 for the prototype; the original requirement files are not edited. | `login.html#teacher` → `teacher.html`; teacher pages show "Teacher workspace" in the menu and breadcrumb (QA-08, `570db89`) |
| D-2 | Institution Admin and Principal: one combined role or two separate roles? (SOW §3.1, §3.3.1; CF §2.2) | **Not decided.** | Both roles are shown in `ministry-users.html` (Roles and Multi-role tabs) with "TBD — Requires Client Confirmation" (`570db89`) |

## F. Open items carried as TBD
- Procurement / LC / PO / Gate Pass approval chain and responsible roles (SOW §6)
- MY GOV API use case (SOW §6)
- License pricing: per check vs. subscription; amount; payment gateway; invoicing (SOW §4.4)
- License eligibility and validation criteria; licence categories; licence number format (SOW §4.2)
- License validity, renewal, revocation and appeal after rejection
- Approval of third-party organisation accounts before activation; terms of use and data protection wording
- Student profile vs. certificate data rule, "As Certificate follow" (SOW §6)
- Division/District as predefined government regions (assumed: the 8 divisions and 64 districts)
- Leave types beyond CL/SL/EL; accrual rules
- Broader staff HRM module
- Registration History / Pre-Registration / Course Advising Table placement (labelled on `student-academics.html`)
- Institution Admin vs Principal (D-2, labelled on `ministry-users.html`)
- Dashboard widgets / KPIs per role (labelled in the Ministry *Customise* dialog)
- Library feature set (labelled *Proposed — for client sign-off* on `inst-library.html`); staff borrowing limits
- Whether teachers assign students directly or the Principal approves
- Division- and district-level responsible officials (not published on official sources)
- Production portal domains (`*.tims.gov.bd` are proposed, prototype only)
