# FINAL_ROUTE_MAP — Textile Institution Management System (Variation H)

**Date:** 15 Oct 2026 · **Routes:** 71 HTML files (`ministry-licenses.html` is listed in §4 and §9) in `design/prototype/` · **Review entry:** `prototype/prototype-index.html`

Every route is a static file. `page.html#id` opens a tab or section on that page. `?lang=bn` opens the page in Bangla. Workspace sign-ins accept any listed demo account with the password `demo-pass`.

Shells: **Public** = public website header and footer · **Workspace** = portal sidebar and top bar for the named role · **Bare** = no navigation.

## 1. Public website (no sign-in)

| Route | Screen | Shell | Purpose | Reached from |
|---|---|---|---|---|
| `index.html` | Home | Public | Official homepage: hero with statistics, services, notices, admissions, institutions, officials, gallery, Government Portals, help | Logo, "Home" |
| `about.html` | About Us | Public | Mandate, ownership (MoTJ / Department of Textiles), structure | Main nav |
| `officials.html` | Responsible officials | Public | Published Ministry and DoT officials; division and district roles as TBD cards | About Us |
| `academic.html` | Academic | Public | Programmes, technologies, curriculum, academic calendar, regulations | Main nav |
| `institutions.html` | Institution directory | Public | Search and filter institutions by type, division and district | Academic, homepage |
| `institution-profile.html` | Institution profile | Public | One institution at a glance: programmes, notices, contact, admission | Directory |
| `notices.html` | Notices | Public | Categories, pinned and urgent notices, search, archive | Main nav |
| `notice-detail.html` | Notice detail | Public | Notice with issuing authority, attachment, related and previous/next | Notices |
| `public-dashboard.html` | Public dashboard | Public | Aggregate statistics with filters (demo data) | Homepage "insights" link (not in nav) |
| `gallery.html` | Photo gallery | Public | Captioned photographs from official institution sites, lightbox | Homepage, footer |
| `help.html` | Help | Public | FAQ, user guides, videos, forms and downloads, help desk form | Main nav, utility bar |
| `verify.html` | Results / Verification | Public | Certificate verification by number; links to admission result and licence verification | Utility bar |
| `portals.html` | Government Portals | Public | Ministry, Division, District and Institution portal cards with proposed addresses | Utility bar, portals band, footer |

## 2. Admissions and candidate (Flow A)

| Route | Screen | Shell | Purpose | Reached from |
|---|---|---|---|---|
| `admissions.html` | Admissions 2026–27 | Public | Dates, eligibility, seats and quota, documents, how to apply | Main nav |
| `apply.html` | Apply online | Public | 5-step application (programme, personal, academic, documents, review) | Admissions |
| `candidate-login.html` | Candidate login | Public | Sign in with application ID and date of birth | Admissions only |
| `candidate.html` | Candidate workspace | Public | Pay fee, admit card, result, final admission, student ID | After apply / sign-in |
| `admission-result.html` | Admission result | Public | Look up result by application ID | Admissions, Verification |

## 3. Sign-in and access

| Route | Screen | Shell | Purpose | Reached from |
|---|---|---|---|---|
| `student-login.html` | Student Login | Public | Student sign-in (prominent header button) | Header "Student Login" |
| `portal-ministry.html` | Ministry Portal sign-in | Bare | Ministry officials | `portals.html` |
| `portal-division.html` | Division Portal sign-in | Bare | Division administrators | `portals.html` |
| `portal-district.html` | District Portal sign-in | Bare | District administrators | `portals.html` |
| `portal-institution.html` | Institution Portal sign-in | Bare | Principal, institution admin, teachers (role resolved by account) | `portals.html` |
| `access-denied.html` | Access states | Bare | `?reason=permission` · `session` · `locked` · `noassign` | Portal sign-ins, Users & roles |

## 4. Ministry Portal (Head Office)

| Route | Screen | Purpose |
|---|---|---|
| `ministry.html` | Dashboard | Attendance by division (map), exceptions, approvals waiting, admissions, notices, reports; customisable widgets |
| `ministry-institutions.html` | Institutions | Institutions, categories (`#categories`), divisions and districts (`#geo`) |
| `ministry-admissions.html` | Admission management | Cycle setup (`#setup`), oversight and result publication (`#oversight`), migration (`#migration`) |
| `ministry-attendance.html` | Live attendance | National attendance by division, district and institution |
| `ministry-budget.html` | Budget | Allocation per institution; utilisation (`#utilisation`) |
| `ministry-assets.html` | Assets | Asset allocation per institution; damaged and lost summary |
| `ministry-approvals.html` | Approvals | Escalations: procurement, migration, revisions; SLA |
| `ministry-licenses.html` | Licences (Phase 2) | Licence review queue, issued register, verifier organisations, rules and fees (TBD) — see §9 |
| `ministry-reports.html` | Reports | Build, preview and download reports; no-data state |
| `ministry-users.html` | Users and roles | Users, role permission matrix, multi-role assignment |
| `ministry-integrations.html` | Integrations | MY GOV and other services as boundaries; unavailable, timeout, mismatch |

## 5. Division and District Portals

| Route | Screen | Purpose |
|---|---|---|
| `division.html` | Division dashboard | Districts and institutions (`#districts`), attendance and reporting (`#attendance`), follow-up actions (`#actions`) |
| `district.html` | District dashboard | Institutions (`#institutions`), actions (`#actions`) |

## 6. Institution Portal — Principal / institution admin

| Route | Screen | Purpose |
|---|---|---|
| `principal.html` | Dashboard | Items needing action, class attendance today, resource alerts, notices, quick actions |
| `inst-students.html` | Students | Student records, admitted list from central admission |
| `inst-teachers.html` | Teachers | Teacher records |
| `inst-classes.html` | Classes | Classes, teacher and student assignment |
| `inst-attendance.html` | Attendance | Institution attendance, correction approval |
| `inst-results.html` | Results | Validate, publish, return, correct published marks |
| `inst-requests.html` | Student requests | Service request queue: approve, return, reject, complete |
| `inst-leave.html` | Leave | Teacher leave approvals and balances |
| `inst-certificates.html` | Certificates and alumni | Issue certificates, duplicates, mark alumni |
| `inst-finance.html` | Finance | Expenses against allocation, utilisation |
| `inst-assets.html` | Assets | Assign, transfer, return, damaged/lost, recovered, history |
| `inst-procurement.html` | Procurement | Request → approval → PO → LC → receipt → gate pass |
| `inst-library.html` | Library | Catalogue, issue/return, overdue, fines, lost |
| `inst-access.html` | Menu access | Role-based menu access within the institution |

## 7. Institution Portal — Teacher

| Route | Screen | Purpose |
|---|---|---|
| `teacher.html` | Dashboard | Next class, today's schedule, tasks (attendance, marks), notices, leave balance |
| `teacher-classes.html` | My classes and materials | Class list, upload materials |
| `teacher-attendance.html` | Take attendance | Register, submit, correction request |
| `teacher-results.html` | Result entry | Enter marks, validation, submit to Principal |
| `teacher-leave.html` | Leave | Apply, balance, withdraw |

## 8. Student and alumni

| Route | Screen | Purpose |
|---|---|---|
| `student.html` | Dashboard | Today's classes, requests, notices, payments; `?new=1` shows "Before classes begin" after admission |
| `student-academics.html` | Academics | Courses, materials, advising, evaluation, curriculum, code of conduct, calendar, library |
| `student-results.html` | Results and attendance | Semester results, grade table (`#grades`), attendance |
| `student-services.html` | Online services | 15 services through one request form |
| `student-request.html` | Request tracking | Status timeline, correction and resubmission |
| `student-payment.html` | Payments and ledger | Pay fees, ledger (`#ledger`) |
| `student-certificate.html` | Certificate | Graduate applies for certificate; eligibility, duplicate, data mismatch |
| `student-profile.html` | Profile | Profile and correction request |
| `alumni.html` | Alumni | Alumni-only menu: current professional information (job, LinkedIn), certificates |

## 9. Phase 2 — Professional licence and verification (Flow J)

| Route | Screen | Shell | Purpose |
|---|---|---|---|
| `license.html` | Professional licence | Public | Who can apply, how it works, documents, fees and validity (TBD), Phase 1 link (TBD), Apply / Track |
| `license-apply.html` | Licence application | Public | 4-step application: personal, qualification, documents, review |
| `license-track.html` | Track licence application | Public | Find by reference and mobile; status timeline; resubmit a correction; issued licence details |
| `ministry-licenses.html` | Licences (Phase 2) | Workspace (Ministry) | Review, approve and issue number, return, reject; issued register; organisations; rules (TBD) |
| `verifier-register.html` | Organisation registration | Public | Organisation, trade licence, contact person, terms |
| `verifier.html` | Organisation verification | Public | Pay for access, search by licence or certificate number, usage history |

## 10. Review tooling

| Route | Purpose |
|---|---|
| `prototype-index.html` | Review entry: flows A–J, all screens by area, documentation list, language switch, Reset demo data |
