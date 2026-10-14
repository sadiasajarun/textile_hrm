# SCOPE OF WORK
## Textile Institution HRM & License Verification System

> Text transcription of `Textile_Institution_HRM_License_SOW_v2.pdf` (7 pages), kept word-for-word.
> The PDF is the source of truth; this copy exists so the pipeline and diffs can read it as text.

- **Prepared for:** Product Design Team
- **Prepared by:** Nasim Redoy
- **Document Type:** Functional Requirements & Scope of Work (Draft v1.1)
- **Date:** 08 September 2026 (Revised — incorporates client feedback on v1.0)

---

## 1. Document Overview

This document consolidates and organizes the client's raw requirements into a structured Scope of Work (SOW) for a two-phase system: (1) a full Human Resource & Institution Management (HRM) platform for textile educational institutions, and (2) a License Verification module for individual textile professionals and third-party checking organizations. The purpose of this document is to give the Product Design Team a clear, ordered reference for wireframing, user-flow mapping, and UI/UX design.

The requirements below have been reorganized by user role and functional module. Where the original requirements were ambiguous, incomplete, or had a numbering conflict, this is flagged in Section 6 ("Assumptions & Open Questions") for client confirmation before design work begins.

## 2. Project Objective

To build a centralized, multi-tier web platform that allows a national Head Office to manage textile educational institutions across divisions and districts — covering admissions, academics, finance, assets, and human resources — and, in a second phase, to provide a public-facing license issuance and verification system for individual textile professionals, including paid verification access for third-party organizations.

## 3. Phase 1 — Textile Institution Management System

### 3.1 User Roles & Access Hierarchy (RBAC)

Per client-approved revision, the administrative hierarchy is structured under a Ministry, with role-based access cascading downward through five tiers before reaching the institution's own internal roles.

#### 3.1.1 Ministry / Administrative Hierarchy

1. **Ministry Super Admin** — top-level role; full system access across all divisions, districts, and institutions.
2. **Division Admin** — scoped access to all districts and institutions within an assigned division.
3. **District Admin** — scoped access to all institutions within an assigned district.
4. **Institution Admin** — scoped access to a single institution; oversees the institution's own Principal, Teacher, and Student roles (see Section 3.3).
5. **Other Institution(s)** — a District Admin oversees multiple Institution Admins, one per institution in that district.

*Design note:* access scope cascades downward (Ministry Super Admin > Division Admin > District Admin > Institution Admin > Principal / Teacher / Student). The Ministry Super Admin has visibility across all divisions, districts, and institutions; each lower tier is restricted to its own jurisdiction's data.

### 3.2 Ministry Super Admin Module

The following functions are available to the Ministry Super Admin role (previously referred to as "Super Admin / Head Office"):

#### 3.2.1 Institution & Category Setup
- Add and manage Institution Categories (e.g., Government College, Diploma College, Vocational College).
- Add and manage Institutions, each linked to a category, and to a division/district for hierarchy scoping.

#### 3.2.2 User & Access Control
- Add system users (across all hierarchy levels: division, district, institution).
- Add Roles and define granular permissions per role.
- Assign one or more roles to a user.

#### 3.2.3 Dashboard & Reporting
- Customizable dashboard (widgets/metrics configurable by the Super Admin).
- Requirement reports: view, filter, and download (e.g., by institution, division, district, date range).

#### 3.2.4 Admission Management
- Full admission process setup (define admission cycles, eligibility rules, seat quotas, required documents, etc.).
- Student Application — online application submission and tracking.
- Result Publication — admission/entrance test result processing and publishing.
- Student Migration — process for transferring an admitted/enrolled student between institutions.

#### 3.2.5 Budget & Asset Allocation
- Assign and track budget on a per-institution basis.
- Assign and track assets on a per-institution basis (see also Section 3.3.10 for institution-level asset tracking).

#### 3.2.6 Consolidated Reporting
- Institution-wise reports across all modules (admissions, finance, assets, attendance, results, etc.).
- Additional/ad-hoc reports as further requirements are identified.

### 3.3 Institution-Level Module

The following functions apply within a single institution's portal.

#### 3.3.1 Institution Login Types
1. **Principal** — highest authority within the institution; can manage teachers, students, classes, assets, roles, and approvals.
2. **Teacher** — manages assigned classes, content, attendance, and results.
3. **Student** — views class content, results, attendance, and manages own profile.

#### 3.3.2 Teacher & Student Management
- Add Teacher records.
- Add Student records. Students are automatically assigned to an institution based on the central admission test result; the Principal can manually modify this assignment if required.

#### 3.3.3 Class Management
- Add classes.
- Assign a class to a teacher.
- Teachers add class content/materials for their assigned classes.
- Teachers can assign classes to students.

#### 3.3.4 Student Portal
- After login, students can view their class content, results, attendance, and any other information based on what has been assigned/shared with them.
- Students can update their own profile information. (Client note: to be kept consistent with issued certificate data — see Section 6.)
- Student Ledger — consolidated record of a student's academic/financial transactions.
- Student Grade Table.
- Advising Table — academic advisor assignment and notes per student.
- Teaching Evaluation — student feedback/evaluation of teachers.
- Curriculum Analysis.
- Code of Conduct — institution's conduct policy, viewable by students.
- Academic Calendar.

#### 3.3.4(1) Online Application (Student Only)
Self-service requests a student can submit online, each with its own approval workflow:
- Admit Card.
- Apply for a Waiver.
- Re-admission.
- Course Drop.
- Semester Drop.
- Online Payment (Fees).
- Testimonial.
- Incomplete Transcript.
- PVC & Transcript.
- Certificate & Transcript.
- Duplicate Certificate & Transcript (if original is lost).
- Medium of Instruction.
- Transfer Program.
- Cancel Studentship.
- Convocation.

#### 3.3.5 Live Attendance System
- Real-time attendance capture for both teachers and students (teachers can control/direct access to student attendance capture).
- Head Office can view live attendance status of both teachers and students directly from its own dashboard after login.

#### 3.3.6 Finance Management
- Track institution-level expenses: what was spent, where, when, and how much.
- Track budget utilization against the amount allocated by Head Office.

#### 3.3.7 Inventory & Asset Management
- Track assets provided by Head Office to the institution.
- Principal can assign a given asset to a specific person, and track which person currently holds it.
- Track current availability status of each asset (in use / available / unavailable).
- Track damaged/lost assets along with the reason for damage or loss.
- Procurement system — request and track procurement of new assets/materials.
- LC (Letter of Credit) document upload — attach and store LC documents against a procurement/import record.
- PO (Purchase Order) system — generate and track purchase orders.
- Gate Pass — log and track movement of assets/materials in and out of the institution premises.
- (Client has flagged these four items only at a high level — detailed workflow, approval chain, and required fields for each need to be confirmed; see Section 6.)

#### 3.3.8 Library Management
- Full library management functionality: book catalog, member registration, issue/return workflow, due-date and fine tracking, inventory of copies, and search/browse for students and staff.
- (Design team to propose the complete standard feature set for a library module — client has requested this be fully fleshed out.)

#### 3.3.9 Result Management
- Semester-wise result management: entry, calculation, publishing, and history per student.

#### 3.3.10 Leave Management
- Leave types: Casual Leave (CL), Sick Leave (SL), Earned Leave (EL), and other configurable types.
- Full leave workflow: application → approval → rejection, with status tracking and leave balance management.
- Client has flagged that Leave Management alone does not cover full staff HR needs — a broader HRM/staff management module (e.g., staff profile & records, service history, appointment/promotion tracking) is currently missing from scope and needs to be defined separately; see Section 6.

#### 3.3.11 Role-Based Menu Access
- Menu/feature access is controlled by role.
- Principal can assign and update role-based menu access within their institution.

#### 3.3.12 Certification System
- After graduation, a student can apply for a certificate through the system.
- The full certificate application and issuance workflow is managed within the web platform.

#### 3.3.13 Government API Integration
- Integration with a government ("MY GOV") API where required (e.g., for identity verification or certificate registration — specific use case to be confirmed with client).

#### 3.3.14 Alumni Management
- After the final exam result is published, the Principal can mark a student as an Alumni.
- Once marked as Alumni, the student's login is restricted to an Alumni-specific menu only.
- Within the Alumni menu, the user can update their current professional information (e.g., current job/position, LinkedIn profile link).

## 4. Phase 2 — License Verification Module

This phase is a fully automated module, separate from but potentially integrated with Phase 1, that manages professional license issuance and third-party verification for individuals in the textile industry.

### 4.1 License Application
- An individual textile professional can apply for a license through a public-facing application form.

### 4.2 License Approval Workflow
- Head Office reviews the application against validation criteria and approves or rejects the license request.
- Approved licenses are issued with a unique license/certificate number.

### 4.3 Third-Party Verification Access
- External organizations can register as members of the platform for the purpose of checking/verifying a license or certificate.
- Verification is performed by searching using the license/certificate number.

### 4.4 Paid Verification
- Third-party organizations must complete a payment before performing a license/certificate check.
- (Payment gateway, pricing model — per-check vs. subscription — and invoicing to be defined with client.)

## 5. Module Summary Matrix

| Phase | Module | Primary Users |
|---|---|---|
| Phase 1 | Institution & Category Setup | Ministry Super Admin |
| Phase 1 | User, Role & Permission Management | Ministry Super Admin, Principal |
| Phase 1 | Dashboard & Reporting | Ministry Super Admin, Division/District/Institution Admin, Principal |
| Phase 1 | Admission (Setup, Apply, Result, Migration) | Ministry Super Admin, Student |
| Phase 1 | Budget & Asset Allocation (Institution-wise) | Ministry Super Admin, Principal |
| Phase 1 | Teacher, Student & Class Management | Principal, Teacher |
| Phase 1 | Student Portal & Profile (incl. Ledger, Grades, Advising, Evaluation) | Student |
| Phase 1 | Online Application (Admit Card, Waiver, Transcript, etc.) | Student |
| Phase 1 | Live Attendance | Teacher, Student, Head Office |
| Phase 1 | Finance Tracking | Principal |
| Phase 1 | Inventory & Asset Management (incl. Procurement, LC, PO, Gate Pass) | Principal |
| Phase 1 | Library Management | Principal, Teacher, Student |
| Phase 1 | Result Management (Semester-wise) | Teacher, Principal, Student |
| Phase 1 | Leave Management | Teacher, Principal |
| Phase 1 | Certification System | Student, Principal |
| Phase 1 | Government API Integration | System / Head Office |
| Phase 1 | Alumni Management | Principal, Alumni (former Student) |
| Phase 2 | License Application | Individual Professional |
| Phase 2 | License Approval | Head Office |
| Phase 2 | Third-Party Verification Membership | 3rd-Party Organization |
| Phase 2 | Paid License/Certificate Check | 3rd-Party Organization |

## 6. Assumptions & Open Questions

The following points were unclear, incomplete, or contained numbering conflicts in the original raw requirements. These should be confirmed with the client before design/development begins.

- Section 3.2.6 ("Institution-wise all report") and the item labeled "others (based on requirement)" were both numbered "12" in the original notes — both are retained here as separate items under different sub-numbering.
- The exact fields/rules for "full admission process setup" (eligibility criteria, quota types, document requirements) need to be specified.
- The specific purpose of the "MY GOV" API integration (identity verification, certificate registration, or another use case) needs clarification.
- Dashboard customization: needs clarification on which widgets/KPIs are required per role.
- Library management was requested at a high level only ("use your brain") — the Design Team should propose a standard feature set (catalog, issue/return, fines, reservations) for client sign-off.
- Leave management: specific leave types beyond CL/SL/EL, and yearly quota/accrual rules, need to be defined.
- License verification payment model (per-check fee vs. subscription/membership fee) needs to be defined with the client.
- Relationship between Phase 1 (institution HRM) and Phase 2 (license verification) — e.g., whether a graduate's certificate from Phase 1 feeds directly into the Phase 2 license application — should be confirmed.
- Division and District entities: need confirmation on whether these are pre-defined administrative regions (e.g., existing government divisions/districts) or client-defined custom entities.
- Student Portal — "Students can update their own profile information" was annotated "As Certificate follow" by the client: needs confirmation on whether this means (a) profile fields should stay locked once a certificate has been issued, or (b) any profile update should also update the corresponding certificate record.
- Inventory & Asset Management — Procurement System, LC Document Upload, PO System, and Gate Pass were noted only as keywords; the approval chain, responsible roles, and required document fields for each need to be defined with the client.
- A broader HRM/staff management module (covering staff records, service history, appointments, etc., beyond Leave Management) was flagged by the client as missing from the current scope and needs to be scoped separately.
- The client's hierarchy sketch also referenced Registration History, Pre-Registration, and Course Advising Table, which are not explicitly listed in the finalized Student Portal / Online Application item lists above — need confirmation on whether these are separate features or already covered under Advising Table / Academic Calendar.
