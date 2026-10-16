# FINAL_ROUTE_MAP — Textile Institution Management System (Variation H)

**Date:** 15 Oct 2026 · **Routes:** 78 HTML files (`ministry-licenses.html` is listed in §4 and §9) in `design/prototype/` · **Review entry:** `prototype/prototype-index.html`

Every route is a static file. `page.html#id` opens a tab or section on that page. `?lang=bn` opens the page in Bangla. Every sign-in (Login page and portals) accepts the listed demo account with the password `demo-pass`.

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
| `login.html` | Login | Public | Student / Teacher tabs (`#teacher` opens the Teacher tab), Government Portals panel (`#portals`), "Which login should I use?" guide | Header "Login" button, utility "Government Portals", footer |
| `portal-ministry.html` | Ministry Portal sign-in | Bare | Ministry officials | `portal-division.html` | Division Portal sign-in | Bare | Division administrators | `portal-district.html` | District Portal sign-in | Bare | District administrators | `portal-institution.html` | Institution Portal sign-in | Bare | Principal, institution admin and office staff (teachers use Login → Teacher) | `login.html#portals` |

## 4. Ministry Portal (Head Office)

| Route | Screen | Purpose |
|---|---|---|
| `ministry.html` | Dashboard | Attendance by division (map), exceptions, approvals waiting, admissions, notices, reports; customisable widgets |
| `ministry-institutions.html` | Institutions | Institutions, categories (`#categories`), divisions and districts (`#geo`) |
| `ministry-admissions.html` | Admission management | Cycle setup (`#setup`), oversight and result publication (`#oversight`), migration (`#migration`) |
| `ministry-attendance.html` | Live attendance | National attendance by division, district and institution |
| `ministry-budget.html` | Budget | Allocation per institution; utilisation (`#utilisation`) |
| `ministry-assets.html` | Assets | Asset allocation per institution; damaged and lost summary |
| `ministry-approvals.html` | Approvals | Final approval of escalations (procurement after District and Division, migration, revisions); SLA |
| `ministry-licenses.html` | Licences (Phase 2) | Licence review queue, issued register, verifier organisations, rules and fees (TBD) — see §9 |
| `ministry-reports.html` | Reports | Build, preview and download reports; no-data state |
| `ministry-users.html` | Users and roles | Users, role permission matrix, multi-role assignment; Institution Admin vs Principal labelled TBD (D-2) |
| `ministry-integrations.html` | Integrations | MY GOV and other services as boundaries; unavailable, timeout, mismatch |

## 5. Division and District Portals

Access cascades down the hierarchy: each level sees only its own jurisdiction. Setup and final approval stay with the Ministry.

| Route | Screen | Purpose |
|---|---|---|
| `division.html` | Division dashboard | Districts and institutions (`#districts`), attendance and reporting (`#attendance`), follow-up actions (`#actions`) |
| `division-admissions.html` | Admissions (division) | Applications and seats by district; admission cycle (read only); recommend migration requests |
| `division-resources.html` | Budget and assets (division) | Allocation, spending and damaged/lost assets by district; request a budget revision from the Ministry |
| `division-approvals.html` | Approvals — recommend | Escalation chain; recommend district-forwarded requests (Flow G step 3) to the Ministry |
| `division-reports.html` | Reports (division) | Report builder limited to the division and its districts; scheduled reports |
| `district.html` | District dashboard | Institutions and attendance (`#institutions`), actions (`#actions`) |
| `district-admissions.html` | Admissions (district) | Applications and seats by institution; admission cycle (read only); forward migration requests |
| `district-resources.html` | Budget and assets (district) | Allocation, spending and damaged/lost assets by institution; ask an institution to explain spending |
| `district-approvals.html` | Approvals — review and forward | Escalation chain; review institution requests and forward them (Flow G step 2) to the Division |
| `district-reports.html` | Reports (district) | Report builder limited to the district and its institutions; scheduled reports |

## 6. Institution Portal — Principal / institution admin

| Route | Screen | Purpose |
|---|---|---|
| `principal.html` | Dashboard | Items needing action, class attendance today, resource alerts, notices, quick actions |
| `inst-students.html` | Students | Student records, admitted list from central admission (tab count after Flow A) |
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

## 7. Teacher workspace (Login → Teacher)

| Route | Screen | Purpose |
|---|---|---|
| `teacher.html` | Dashboard (after Login → Teacher) | Next class, today's schedule, tasks (attendance, marks), notices, leave balance |
| `teacher-classes.html` | My classes and materials | Class list, Assign students (TBD approval), upload materials, library catalogue (`#library`, menu "Library catalogue") |
| `teacher-attendance.html` | Take attendance | Register, submit, correction request |
| `teacher-results.html` | Result entry | Enter marks, validation, submit to Principal |
| `teacher-leave.html` | Leave | Apply, balance, withdraw |

## 8. Student and alumni

| Route | Screen | Purpose |
|---|---|---|
| `student.html` | Dashboard | Today's classes, requests, notices, payments; `?new=1` shows "Before classes begin" after admission |
| `student-academics.html` | Academics | Courses, materials, advising, evaluation, curriculum, code of conduct, calendar, library |
| `student-results.html` | Results and attendance | Semester results, grade table (`#grades`), attendance |
| `student-services.html` | Online services | 15 services through one request form; *My requests* history (`#requests`) with search and status filter |
| `student-request.html` | Request tracking | Status timeline, correction and resubmission; `?id=01467` and `?id=01310` open the other requests; menu: Online services |
| `student-payment.html` | Payments and ledger | Pay fees, ledger (`#ledger`) |
| `student-certificate.html` | Certificate | Graduate applies for certificate; eligibility, duplicate, data mismatch |
| `student-profile.html` | Profile | Profile and correction request |
| `alumni.html` | Alumni | Locked until the Principal marks the graduate as alumni; then alumni-only menu: current professional information (job, LinkedIn), certificates |

## 9. Phase 2 — Professional licence and verification (Flow J)

| Route | Screen | Shell | Purpose |
|---|---|---|---|
| `license.html` | Professional licence | Public | Who can apply, how it works, documents, fees and validity (TBD), Phase 1 link (TBD), Apply / Track |
| `license-apply.html` | Licence application | Public | 4-step application: personal, qualification, documents, review |
| `license-track.html` | Track licence application | Public | Find by reference and mobile; status timeline; resubmit a correction; issued licence details |
| `ministry-licenses.html` | Licences (Phase 2) | Workspace (Ministry) | Review, approve and issue number, return, reject; issued register; organisations; rules (TBD) |
| `verifier-register.html` | Organisation registration | Public | Organisation, trade licence, contact person, terms |
| `verifier.html` | Organisation verification | Public | Pay for access, search by licence or certificate number (incl. CERT-2026-00512 after Flow I), usage history |

## 10. Review tooling

| Route | Purpose |
|---|---|
| `prototype-index.html` | Review entry: flows A–J, role walkthroughs (Teacher, Student, Principal, District, Division, Ministry), all screens by area, documentation list, language switch, Reset demo data |

_Updated 16 Oct 2026 (Fix round 1, `570db89`): no routes added or removed; 78 pages. Teacher pages use the breadcrumb "Teacher workspace" (D-1)._
