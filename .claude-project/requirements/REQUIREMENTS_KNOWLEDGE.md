# Requirements Knowledge — Textile Institution HRM & License Verification

| | |
|---|---|
| **Source** | `Textile_Institution_HRM_License_SOW_v2.pdf` (text copy: `Textile_Institution_HRM_License_SOW_v2.md`) |
| **SOW version** | Draft v1.1, 08 Sep 2026, prepared by Nasim Redoy for the Product Design Team |
| **Project key** | `textile_hrm` |
| **Work scope** | Requirements → R&D → PRD → HTML prototypes (`/fullstack-pm` P1–P3). **No build.** |
| **Status** | Both sources learned. PRD v1 generated: `.claude-project/docs/PRD.md`, which is now the consolidated reference with 49 open questions in its §9. |
| **Second source** | `textile_ministry_prototype_requirements.md` (UI/UX Prototype Requirements & Research Brief). Supplementary: where it differs from the SOW, the SOW wins. See §11. |

This file is a structured digest of the SOW for the PM pipeline. Anything marked **[SOW]** is stated in the document. Anything marked **[Inferred]** or **[Review]** is my reading of it and must be confirmed with the client.

Do **not** move the SOW into `.claude-project/prd/` or `docs/PRD.md`: P2-prd treats any file there as a finished PRD and skips PRD generation.

The SOW is a requirements input, not a PRD. It has no Pages or Tech Stack sections, and P3 builds its page list from the PRD. The pipeline also behaves differently depending on where `--prd` is passed:

- **P1-spec with `--prd`:** runs a gap-analysis interview on the missing parts only (see Open Questions), then writes the seed.
- **P2-prd with `--prd`:** copies the file as-is to become the PRD. It does **not** generate one.

So the planned sequence is:

```
/fullstack-pm textile_hrm --phase P1-spec --prd .claude-project/requirements/Textile_Institution_HRM_License_SOW_v2.md
/fullstack-pm textile_hrm --phase P2-prd      # no --prd, so a full PRD is generated from the seed
/fullstack-pm textile_hrm --phase P3-design
```

---

## 1. Product in one paragraph

A centralized, multi-tier web platform for a national **Head Office** (under a Ministry) to manage **textile educational institutions** across **divisions** and **districts**: admissions, academics, finance, assets, library, leave and alumni. **Phase 2** adds a public **license issuance and paid verification** system for individual textile professionals, where third-party organizations pay to verify a license or certificate number. [SOW §1–2]

## 2. Glossary (ontology)

| Term | Meaning |
|---|---|
| Ministry / Head Office | The top administrative body. "Head Office" and "Ministry Super Admin" are used interchangeably in the SOW (§3.2). |
| Division → District → Institution | The geographic and administrative hierarchy that scopes all data access. |
| Institution Category | A type of institution, e.g. Government College, Diploma College, Vocational College. |
| Admission cycle | A central admission round with eligibility rules, seat quotas, required documents, an entrance test and a result. |
| Student Migration | Transfer of an admitted or enrolled student between institutions. |
| Online Application | One of 15 self-service student requests, each with its own approval workflow (§4.3 below). |
| Student Ledger | A consolidated record of a student's academic and financial transactions. |
| Advising Table | Academic advisor assignment and notes per student. |
| PVC | Listed as "PVC & Transcript" with no definition. **[Inferred]** Likely a PVC-card (plastic) certificate. Confirm. |
| LC | Letter of Credit: an import/procurement document uploaded against a procurement record. |
| PO | Purchase Order: generated and tracked. |
| Gate Pass | A log of assets or materials moving in and out of institution premises. |
| Alumni | A former student marked by the Principal after the final result. Their login is restricted to the alumni menu. |
| License | A professional license issued to an individual textile professional, with a unique license/certificate number (Phase 2). |
| Verifier organization | A third-party organization registered as a member, which pays to check a license or certificate. |

## 3. Actors, roles and data scope

### 3.1 Phase 1 — administrative hierarchy [SOW §3.1.1]

| # | Role | Data scope | Key powers |
|---|---|---|---|
| A1 | Ministry Super Admin (Head Office) | Everything | Institution and category setup, users and roles, admission, budget and asset allocation, consolidated reports, live attendance view, license approval (Phase 2) |
| A2 | Division Admin | All districts and institutions in their division | Dashboard and reporting (§5 matrix); other powers unspecified |
| A3 | District Admin | All institutions in their district | Dashboard and reporting; oversees multiple Institution Admins |
| A4 | Institution Admin | One institution | Dashboard and reporting; "oversees" the institution's Principal, Teacher and Student roles |

The access cascade is Ministry Super Admin > Division Admin > District Admin > Institution Admin > Principal / Teacher / Student. Each tier sees only its own jurisdiction.

### 3.2 Phase 1 — institution roles [SOW §3.3.1, §3.3.14]

| # | Role | Key powers |
|---|---|---|
| I1 | Principal | Highest authority in the institution. Manages teachers, students, classes, assets, roles, menu access and approvals. Can override student-to-institution assignment, assign assets to people, and mark students as alumni. |
| I2 | Teacher | Assigned classes, class content, attendance (controls student attendance capture), results, leave, library |
| I3 | Student | Portal views, own profile, the 15 online applications, fee payment, teaching evaluation, library, certificate application |
| I4 | Alumni | A former student. Alumni-only menu: update professional info (current job and position, LinkedIn). |

### 3.3 Phase 2 actors [SOW §4]

| # | Actor | Key powers |
|---|---|---|
| L1 | Individual textile professional (public) | Applies for a license through a public form |
| L2 | Head Office reviewer | Reviews the application against validation criteria; approves (issues a unique number) or rejects |
| L3 | Third-party verifier organization | Registers as a member, pays, then searches by license/certificate number |

## 4. Module inventory

### 4.1 Phase 1 modules

| ID | Module | SOW | Primary users | Capabilities | Open Qs |
|---|---|---|---|---|---|
| P1-M01 | Institution & Category Setup | 3.2.1 | Super Admin | CRUD categories; CRUD institutions linked to a category and a division/district | OQ-09 |
| P1-M02 | User, Role & Permission Management | 3.2.2, 3.3.11 | Super Admin, Principal | Users at every level; roles with granular permissions; many roles per user; Principal manages role-based menu access in their institution | OQ-17 |
| P1-M03 | Dashboard & Reporting | 3.2.3, 3.2.6 | Super Admin, Division/District/Institution Admin, Principal | Customizable widget dashboard; reports filtered by institution, division, district or date and downloadable; institution-wise reports across all modules; ad-hoc reports | OQ-04 |
| P1-M04 | Admission Management | 3.2.4 | Super Admin, Student (applicant) | Admission cycle setup (eligibility, quotas, documents); online application and tracking; entrance result processing and publishing; auto-assignment to an institution by result; migration between institutions | OQ-02, OQ-13 |
| P1-M05 | Budget & Asset Allocation | 3.2.5 | Super Admin, Principal | Allocate and track budget and assets per institution | — |
| P1-M06 | Teacher & Student Management | 3.3.2 | Principal | Add teachers; add students (auto-assigned from admission result, Principal can override) | OQ-12 |
| P1-M07 | Class Management | 3.3.3 | Principal, Teacher | Add classes; assign class to teacher; teacher uploads content; teacher assigns class to students | — |
| P1-M08 | Student Portal | 3.3.4 | Student | Class content, results, attendance; self-profile update; Ledger; Grade Table; Advising Table; Teaching Evaluation; Curriculum Analysis; Code of Conduct; Academic Calendar | OQ-10, OQ-13 |
| P1-M09 | Online Applications | 3.3.4(1) | Student, approvers | The 15 request types with approval workflows (§5.2 below) | OQ-18 |
| P1-M10 | Live Attendance | 3.3.5 | Teacher, Student, Head Office | Real-time capture for teachers and students; teachers control student capture; Head Office live view on its dashboard | OQ-19 |
| P1-M11 | Finance Management | 3.3.6 | Principal | Expense tracking (what, where, when, how much); budget utilization vs. Head Office allocation | — |
| P1-M12 | Inventory & Asset Management | 3.3.7 | Principal | Track Head Office-provided assets; assign to a person and see the current holder; status in use / available / unavailable; damaged or lost with reason; Procurement, LC upload, PO, Gate Pass | OQ-11 |
| P1-M13 | Library Management | 3.3.8 | Principal, Teacher, Student | Catalog, member registration, issue and return, due dates and fines, copy inventory, search and browse. **The design team must propose the full feature set.** | OQ-05 |
| P1-M14 | Result Management | 3.3.9 | Teacher, Principal, Student | Semester-wise entry, calculation, publishing, history per student | — |
| P1-M15 | Leave Management | 3.3.10 | Teacher, Principal | CL, SL, EL plus configurable types; apply → approve/reject; status; balances | OQ-06, OQ-12 |
| P1-M16 | Certification System | 3.3.12 | Student, Principal | Graduate applies for a certificate; full issuance workflow in the platform | OQ-08, OQ-10 |
| P1-M17 | Government API ("MY GOV") | 3.3.13 | System, Head Office | Integration such as identity verification or certificate registration; use case to be confirmed | OQ-03 |
| P1-M18 | Alumni Management | 3.3.14 | Principal, Alumni | Mark as alumni after the final result; restricted alumni menu; professional info update | — |

### 4.2 Phase 2 modules

| ID | Module | SOW | Primary users | Capabilities | Open Qs |
|---|---|---|---|---|---|
| P2-M01 | License Application | 4.1 | Individual professional | Public application form | OQ-08 |
| P2-M02 | License Approval | 4.2 | Head Office | Review against validation criteria; approve with a unique number, or reject | OQ-15 |
| P2-M03 | Verifier Membership | 4.3 | Third-party organization | Organization registration as a member | — |
| P2-M04 | Paid Verification | 4.3, 4.4 | Third-party organization | Payment before check; search by license/certificate number; invoicing | OQ-07 |

The SOW calls Phase 2 "fully automated", "separate from but potentially integrated with Phase 1".

## 5. Workflows implied by the SOW

### 5.1 Lifecycles

| Flow | Steps |
|---|---|
| Admission → enrolment | Super Admin sets up the cycle → applicant applies online and tracks it → entrance test result is processed and published → student is **auto-assigned to an institution by result** → Principal may override → student is enrolled (migration between institutions possible later) |
| Class | Principal adds a class → assigns it to a teacher → teacher uploads content → teacher assigns the class to students → students view content |
| Attendance | Teacher opens or controls capture → teachers and students mark attendance in real time → Head Office (and, by cascade, lower admins) view live status |
| Result | Teacher enters marks → system calculates → published per semester → student sees grade table and history |
| Leave | Staff applies → approver approves or rejects → balance updated, status tracked |
| Asset | Head Office allocates to an institution → Principal assigns to a person → status in use / available / unavailable → damaged or lost with reason. Procurement → PO → LC upload → gate pass for movement. |
| Certificate | Student graduates → applies for a certificate → issuance workflow → certificate issued |
| Alumni | Final exam result published → Principal marks the student as alumni → login switches to the alumni-only menu |
| License | Professional applies on the public form → Head Office validates → approves (unique number) or rejects |
| Verification | Organization registers as a member → pays (per check or subscription, TBD) → searches by number → sees the result |

### 5.2 The 15 student online applications [SOW §3.3.4(1)]

1. Admit Card
2. Apply for a Waiver
3. Re-admission
4. Course Drop
5. Semester Drop
6. Online Payment (Fees)
7. Testimonial
8. Incomplete Transcript
9. PVC & Transcript
10. Certificate & Transcript
11. Duplicate Certificate & Transcript (if original is lost)
12. Medium of Instruction
13. Transfer Program
14. Cancel Studentship
15. Convocation

The SOW says each has "its own approval workflow" but gives no approver, steps, fees or documents for any of them.

## 6. Cross-cutting requirements

- **RBAC with jurisdiction scoping.** Every list, report and dashboard is filtered by the viewer's division, district or institution.
- **Dynamic roles and permissions.** Users can hold multiple roles. Menus are role-driven, and the Principal can edit them within the institution.
- **Customizable dashboards** with configurable widgets.
- **Report export** (view, filter, download).
- **Payments** in two places: student fees (P1-M09) and verifier checks (P2-M04). No gateway is chosen.
- **Real-time** live attendance.
- **Document upload**: LC documents, admission documents, and likely application attachments.
- **External integration**: the "MY GOV" API.

## 7. Open questions

OQ-01 to OQ-13 come from SOW §6. OQ-14 to OQ-20 are **[Review]** items I found while reading. All are open.

| ID | Topic | Question | Why it matters for prototypes |
|---|---|---|---|
| OQ-01 | Numbering | §3.2.6 "Institution-wise all report" and "others" were both numbered 12 in the raw notes. The SOW resolved this by keeping both items. | Informational only |
| OQ-02 | Admission setup | Exact fields and rules: eligibility criteria, quota types, required documents | Admission setup forms |
| OQ-03 | MY GOV API | Purpose: identity verification, certificate registration, or something else | Where verification steps appear in flows |
| OQ-04 | Dashboards | Which widgets and KPIs per role | Dashboard pages for every admin tier |
| OQ-05 | Library | Design team proposes a standard set (catalog, issue/return, fines, reservations) for client sign-off | Library pages are our proposal |
| OQ-06 | Leave rules | Leave types beyond CL/SL/EL; yearly quota and accrual rules | Leave balance screens |
| OQ-07 | Verification pricing | Per-check fee or subscription/membership; invoicing | Verifier payment and checkout flow |
| OQ-08 | Phase 1 ↔ 2 link | Does a Phase 1 graduate certificate feed the Phase 2 license application? | License form prefill; whether verification covers institution certificates |
| OQ-09 | Divisions and districts | Pre-defined government regions, or client-defined custom entities? | Seeded dropdowns vs. a region-management screen |
| OQ-10 | Profile vs. certificate | "As Certificate follow": (a) lock profile fields after a certificate is issued, or (b) profile edits update the certificate record? | Student profile edit screen |
| OQ-11 | Procurement / LC / PO / Gate Pass | Approval chain, responsible roles, required document fields | Four sub-modules are keywords only |
| OQ-12 | Staff HRM | A broader staff module (records, service history, appointment, promotion) is missing from scope and must be scoped separately | The product is named "HRM" but staff HR is mostly undefined |
| OQ-13 | Missing student items | Registration History, Pre-Registration and Course Advising Table appeared in the client sketch. Separate features, or covered by Advising Table / Academic Calendar? | Student portal navigation |
| OQ-14 | **[Review]** Institution Admin vs. Principal | Both sit at the top of one institution and both "oversee" Principal/Teacher/Student. Who does what? Is Institution Admin a different person from the Principal? | Whether these are two separate role folders and dashboards |
| OQ-15 | **[Review]** Head Office reviewer | Is license approval done by the Ministry Super Admin, or by a dedicated license-officer role? | Phase 2 admin screens |
| OQ-16 | **[Review]** Division and District Admin powers | The SOW only lists dashboards and reports for them. Read-only, or can they approve or manage anything? | Their menus and pages |
| OQ-17 | **[Review]** Permission ownership | The Super Admin defines roles and permissions (§3.2.2) and the Principal edits menu access (§3.3.11). Can a Principal create roles, or only toggle menus for existing ones? | Role-management screens at two levels |
| OQ-18 | **[Review]** Application approvers | Who approves each of the 15 online applications (Teacher, advisor, Principal, accounts, Head Office)? Which ones carry a fee? | Approval inbox design |
| OQ-19 | **[Review]** Attendance capture method | Is "real-time" capture manual roll-call, QR, geofenced mobile, biometric device or something else? Do lower admins also see live attendance? | Attendance UI looks very different per method |
| OQ-20 | **[Review]** Language and platforms | Bangla/English bilingual UI? Mobile app or responsive web only? | Every prototype page |

## 8. Problems in the SOW itself

- **Wrong cross-reference.** §3.2.5 says "see also Section 3.3.10 for institution-level asset tracking", but §3.3.10 is Leave Management. Asset tracking is §3.3.7.
- **Version mismatch.** The file is named "v2", but the document says "Draft v1.1".
- **Five tiers vs. four roles.** §3.1 says access cascades through "five tiers", but item 5 ("Other Institution(s)") describes a District Admin overseeing several institutions; it is not a role. There are four admin roles.
- **Matrix missing Alumni.** §3.3.1 lists three institution login types, but Alumni (§3.3.14) is effectively a fourth.
- **Fees listed as a request.** "Online Payment (Fees)" is in the online-application list (which implies an approval workflow), but it is a payment flow.

## 9. Context inferences to confirm [Inferred]

These are not in the SOW. They shape the R&D phase, so confirm them early.

- **Country.** "Ministry", "Division → District", "MY GOV" and the categories Government / Diploma / Vocational College strongly suggest **Bangladesh**. That would mean the textile institutions run under the Ministry of Textiles & Jute (Department of Textiles), divisions and districts are the official 8 divisions and 64 districts, and "MY GOV" is the national *MyGov* service platform. If true, OQ-09 is likely "pre-defined", and Bangla/English language support (OQ-20) matters.
- **Institution types.** These likely map to textile engineering colleges (degree), textile institutes (diploma) and textile vocational institutes.
- **Payment gateways.** A Bangladesh deployment would likely use local gateways and mobile financial services for fees and verification payments. Not specified.

## 10. Prototype planning notes [Inferred]

P3-design writes HTML into one folder per role: `.claude-project/design/html/<role>/`. These are candidate role folders, pending OQ-14, OQ-15 and OQ-16:

| Role folder | Covers |
|---|---|
| `ministry-admin` | Super Admin / Head Office, Phase 1 and Phase 2 license review |
| `division-admin` | Division-scoped dashboard and reports |
| `district-admin` | District-scoped dashboard and reports |
| `institution-admin` | Institution-scoped admin (may merge with `principal`, see OQ-14) |
| `principal` | Institution management, approvals, assets, finance, library, alumni marking |
| `teacher` | Classes, content, attendance, results, leave, library |
| `student` | Portal, online applications, payments, library, certificate |
| `alumni` | Restricted alumni menu |
| `public` | Admission application, license application, verifier sign-up, login |
| `verifier` | Third-party organization: membership, payment, license search |

Phase 1 and Phase 2 can be prototyped together or Phase 1 first. That is a scope decision for the client and PM.

## 11. Second source: Prototype Requirements & Research Brief

`textile_ministry_prototype_requirements.md` is the UI/UX brief for the Ministry prototype. **The SOW stays the primary source of truth**, and the brief says so itself in its §2.

### What the brief adds
- **A public website**, not mentioned in the SOW. It has a landing page with 12 sections, an institution directory and network map, a public dashboard (aggregates only), admissions, notices, services, resources, help, and verification entry.
- **Ministry demo story** (9 steps): Landing → Public Dashboard → Ministry login → drill-down → Institution 360° → alert → certificate workflow → reports → license verification.
- **Prototype priorities**: P0 (15 screens), P1 (11), P2 (high level only).
- **Ministry dashboard design**: 10 KPI cards, a hierarchy/map view, institution health, and an action/alert center. The guiding question is "Where does the Ministry need to pay attention today?"
- **Institution 360°** with 14 tabs; Single Source of Truth UX rules (one master record, activity log, no deletion).
- **Status models** for student, application, asset and license lifecycles.
- **97 numbered edge cases** (§38).
- **19 UX acceptance criteria** (§46) and a 28-item component inventory (§47).
- **Research references**: IPEMIS, BIDA OSS, EMIS, BTEB eSheba, MoTJ/DOT. Use them for ideas only; do not copy them visually.
- **23 open questions** (§44), merged with the SOW's into PRD §9.

### What it settles from §7 and §9 of this file
| Item | Resolution |
|---|---|
| §9 Country inference | **Confirmed:** Ministry of Textiles and Jute, Bangladesh. The Department of Textiles already runs TERP, so do not present the platform as "first-ever". |
| OQ-09 Divisions and districts | **Design decision:** configurable master data, not hard-coded. Seeding from official regions is still to confirm (PRD Q-20). |
| OQ-20 Language and platforms | **Bangla + English from the start.** Responsive web: desktop for admin, tablet for institutions, mobile for students, teachers and the public. |
| OQ-17 Permission model | Framed as User + Role + Module Permission + Data Scope = Effective Access. Ownership is still open (PRD Q-25). |
| Multi-role users | Workspace selector or default role with a switcher, to be validated (PRD Q-17). |
| Prototype figures | Must be labelled "Demo / Illustrative Data" until verified. |

### Where it differs from the SOW (the SOW is followed)
- **Verification:** the brief lists certificate/license verification as a public service, but SOW 4.4 requires third-party organizations to pay before any check. The PRD keeps verification behind membership and payment. A free public lookup is PRD Q-16.
