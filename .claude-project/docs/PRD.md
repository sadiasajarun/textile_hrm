# Textile Institution Management System — Product Requirements Document

**Version:** 1.0
**Date:** 2026-10-14
**Status:** Draft — prototype baseline (drives the UI/UX HTML prototypes)
**Project key:** `textile_hrm`

user_type: [public, ministry, division, district, institution-admin, principal, teacher, student, alumni, verifier]

> **Sources and precedence**
>
> 1. **[SOW]** *Scope of Work — Textile Institution HRM & License Verification System*, Draft v1.1, 08 Sep 2026. File: `.claude-project/requirements/Textile_Institution_HRM_License_SOW_v2.pdf`. **Primary source of truth.**
> 2. **[Brief]** *UI/UX Prototype Requirements & Research Brief*. File: `.claude-project/requirements/textile_ministry_prototype_requirements.md`. It adds the public website, the Ministry demo story, UX rules, edge cases and prototype priorities. **Where the Brief and the SOW differ, the SOW wins.**
>
> **Conventions**
> - Tags such as `[SOW 3.2.4]` or `[Brief §17]` trace each requirement to its source.
> - `[TBD Q-NN]` marks an item that needs client confirmation. `Q-NN` is the question number in §9.
> - Prototype screens show TBD items as clearly labelled placeholders: "TBD / Requires Client Confirmation" [Brief §44].
> - `[Prototype placeholder]` marks UI content invented only so a screen can be drawn. It is not a requirement.
> - Edge-case numbers `#NN` refer to the numbered list in Brief §38.

---

## 0. Project Overview

### Product

| Field | Value |
|---|---|
| **Name** | Textile Institution Management System |
| **Full scope name** | Textile Institution HRM & License Verification System [SOW title] |
| **Client** | Ministry of Textiles and Jute, Bangladesh [Brief header] |
| **Type** | Web platform: a public website plus a role-based, responsive authenticated web application [Brief §3.1, §40.5] |
| **Phases** | Phase 1: Textile Institution Management. Phase 2: Professional License Verification [SOW §1] |
| **Current deliverable** | Clickable HTML prototypes for presentation to Ministry stakeholders. Building the system is out of scope for this engagement. |
| **Deadline** | TBD [TBD Q-43] |
| **Status** | Draft |

### Description

The Textile Institution Management System is a ministry-level platform that connects every textile educational institution in Bangladesh in one system.

- **Institutions** run their operations on it: admissions, academics, attendance, finance, assets, library, leave, certificates and alumni.
- **Data rolls up** through district and division views to the Ministry, which monitors, reports and decides from one dashboard.
- **The public website** gives citizens, students and organizations approved information and digital services.
- **Phase 2** adds professional license issuance and paid third-party verification.

[SOW §2; Brief §1, §48]

**Pitch line:** "From Institution Data to Ministry Decisions — One Connected Textile Education Platform." Alternative: "One Ministry. One Platform. Every Textile Institution Connected." [Brief §1]

**Product principle: Single Source of Truth.** Institution, student, teacher, academic, finance, asset, attendance, certificate, alumni and license information is managed in one connected platform. This replaces disconnected records and repeated reporting [Brief header, §34].

**Positioning.** Present the platform as a unified, modern, ministry-level management and decision platform. It can later integrate or migrate existing services, such as the Department of Textiles' TERP. Do not present it as "the first-ever digital textile system" [Brief §6.5].

### Goals

1. Give the Ministry a centralized, current view of all textile institutions (institutions, students, teachers, attendance, academics, budget, assets and services) for monitoring and decisions. [SOW §2; Brief §1, §48]
2. Standardize workflows across institutions (admission, student services, approvals, certificates) so every request is trackable. [Brief §1, §43 step 7]
3. Enforce hierarchy-based access. Each level (Ministry, Division, District, Institution) works only with its own jurisdiction's data. [SOW 3.1.1]
4. Replace manual consolidation with consolidated, filterable, downloadable reports built from operational data. [SOW 3.2.3, 3.2.6; Brief §1]
5. Give the public transparent access to approved information and digital services. [Brief §1, §7]
6. Issue professional licenses and provide paid third-party verification of licenses and certificates (Phase 2). [SOW §4]

### Target Audience

| Audience | Description |
|---|---|
| **Primary: Ministry decision-makers** | The Minister, senior Ministry stakeholders and Head Office officials. They need to see within seconds where the Ministry must pay attention [Brief §11]. |
| **Primary: Institution operators** | Institution Admin, Principal and Teachers running daily operations [SOW 3.3]. |
| **Primary: Students and alumni** | Self-service portal, online requests, results, certificates [SOW 3.3.4, 3.3.14]. |
| **Secondary: Field administrators** | Division and District Admins monitoring their jurisdiction [SOW 3.1.1]. |
| **Secondary: Public** | Citizens, applicants and guardians looking for institutions, notices, admissions and services [Brief §7]. |
| **Secondary: Professionals and verifiers** | Individual textile professionals applying for licenses; third-party organizations verifying licenses and certificates [SOW §4]. |

### User Types

| Type | Role key | Data scope | Description | Key actions | Home after login |
|---|---|---|---|---|---|
| **Ministry Super Admin (Head Office)** | `ministry` | All divisions, districts and institutions | Top-level role with full system access [SOW 3.1.1, 3.2] | Institution and category setup; users, roles and permissions; admission management; budget and asset allocation; consolidated reports; live attendance monitoring; license review (Phase 2) | Ministry Dashboard [Brief §9] |
| **Division Admin** | `division` | Districts and institutions in the assigned division | [SOW 3.1.1] | Division dashboard and reports; drill-down into districts and institutions [SOW §5; Brief §12] | Division Dashboard |
| **District Admin** | `district` | Institutions in the assigned district | Oversees the Institution Admins of the district [SOW 3.1.1] | District dashboard and reports; institution comparison [SOW §5; Brief §13] | District Dashboard |
| **Institution Admin** | `institution-admin` | One institution | Oversees the institution's Principal, Teacher and Student roles [SOW 3.1.1] | Institution dashboard and reports [SOW §5]. Other powers [TBD Q-22] | Institution Dashboard |
| **Principal** | `principal` | One institution | Highest authority within the institution [SOW 3.3.1] | Manage teachers, students, classes, assets, roles and approvals; finance; procurement; library; leave approval; certificates; mark alumni [SOW 3.3] | Institution Management Dashboard |
| **Teacher** | `teacher` | Assigned classes in one institution | [SOW 3.3.1] | Classes, content, attendance capture, results, leave, library | Teacher Workspace |
| **Student** | `student` | Own records | [SOW 3.3.1, 3.3.4] | Portal, online services, fees, teaching evaluation, library, certificate application | Student Portal |
| **Alumni** | `alumni` | Own alumni profile | Former student marked as alumni by the Principal [SOW 3.3.14] | Update current professional information | Alumni Workspace |
| **Third-Party Organization (Verifier)** | `verifier` | Own membership and checks | External organization registered as a member [SOW 4.3] | Register, pay, verify a license or certificate by number | Verification Workspace [Brief §9] |
| **Public visitor, Applicant, Individual Professional** | `public` | Public data only | No login needed to browse. Admission and license applicants submit applications [SOW 3.2.4, 4.1; Brief §7] | Browse and search institutions, read notices, view admission information and results, apply, track an application, start verification | Public website |

"Head Office" in the SOW refers to the Ministry Super Admin [SOW 3.2]. License review is done by Head Office [SOW 4.2]. Whether a dedicated license-officer role exists is [TBD Q-24].

### User Relationships

- The Ministry has many Divisions (1:N). A Division has many Districts (1:N). A District has many Institutions (1:N) [SOW 3.1.1].
- Each Division Admin is assigned to one division, and each District Admin to one district [SOW 3.1.1].
- A District Admin oversees many Institution Admins, one per institution [SOW 3.1.1 item 5].
- Each institution has one Institution Admin and one Principal. A vacant post is a designed edge case (#12) [SOW 3.1.1, 3.3.1; Brief §38.2].
- An Institution has many Teachers and many Students. A Class has one assigned Teacher [SOW 3.3.3]. Students and Classes are many-to-many [SOW 3.3.3].
- A Student becomes an Alumni through a state change on the same master record. No second profile is created [SOW 3.3.14; Brief §34.1].
- Users and Roles are many-to-many. Each role assignment carries a data scope [SOW 3.2.2; Brief §16].
- A Verifier Organization performs many verification checks. A Professional can submit license applications; duplicates are an edge case (#83) [SOW §4; Brief §38.14].

### Account Status

| Status | Behavior |
|---|---|
| **Active** | Full access within the role and data scope. |
| **Inactive** | Cannot sign in. The login page shows an "account inactive" message with a help contact. All records and history remain [Brief §16, §38.1 #4]. The message text is a prototype placeholder. |
| **Alumni-restricted** (former student accounts) | Login opens only the Alumni Workspace. Student functions show the permission-denied state [SOW 3.3.14; Brief §38.4 #29]. |

### Record Status (all master records)

Records are never hard-deleted once they have transactions or history. They change status instead: **Active, Inactive, Suspended, Archived, Closed** [Brief §34.3, §15].

### Prototype Scope

**The prototype covers [Brief §3.1]:**
- the public-facing website;
- one common login entry;
- role-based authenticated dashboards;
- Ministry-level monitoring and hierarchy drill-down;
- institution-level operations;
- teacher and student experiences;
- student service workflows;
- professional license verification;
- reports and decision support.

**The prototype must prove [Brief §3.2]:**
1. how the ecosystem works;
2. how the hierarchy works;
3. how data flows upward to the Ministry;
4. how actions flow downward and through approvals;
5. how the Ministry gets value from centralized information;
6. how public users find information and services;
7. how internal users do their role-specific work;
8. how edge cases and status changes are handled.

It does not recreate every form and every field of every module [Brief §3.2].

**Priority tiers [Brief §42].** These are used in the §6 page maps.

| Tier | Screens |
|---|---|
| **P0 — must design for presentation** | 1 Public Landing Page · 2 Institution Directory · 3 Public Dashboard · 4 Login · 5 Ministry Super Admin Dashboard · 6 Hierarchy Drill-down · 7 Institution 360° Profile · 8 Live Attendance · 9 Admission Overview / Flow · 10 Student Service Request + Approval Tracking · 11 Assets / Budget Overview · 12 Consolidated Reporting · 13 Professional License Verification · 14 One role-specific institution dashboard · 15 One Student Portal screen |
| **P1 — important supporting screens** | 16 Division Dashboard · 17 District Dashboard · 18 Teacher Dashboard · 19 Result Management · 20 Certificate Flow · 21 Alumni · 22 Library · 23 Leave · 24 Procurement · 25 User / Role Management · 26 Notices / Help Center |
| **P2 — high level only** | Detailed HR service history · final MY GOV integration · complete LC workflow · every individual student service form · all report templates · payment gateway specifics |
| **S — supporting** | Pages that Brief §42 does not rank but a flow needs. Design them after P0 and P1, at the level of detail the flow requires. |

**Ministry demo story.** Prototype navigation must support this path [Brief §43]:

| Step | What is shown |
|---|---|
| 1 | Public Landing |
| 2 | Public Dashboard |
| 3 | Login as Ministry Super Admin, landing on the Ministry Dashboard |
| 4 | Drill-down: National → Division → District → Institution |
| 5 | Institution 360° |
| 6 | Click a low-attendance alert, then institution → class → attendance |
| 7 | Certificate request workflow: Student → Submit → Institution Review → Approval → Certificate → Status Tracking |
| 8 | Consolidated report by institution, district, division and period |
| 9 | License or certificate verification by number, with the result |

### Out of Scope (this engagement)

- Building the system (backend, frontend code, deployment). The current scope ends at HTML prototypes.
- Final approval chains for Procurement, PO, LC and Gate Pass. These are shown as a generic flow labelled "Requires workflow confirmation" [Brief §25].
- A final MY GOV dependency [Brief §31].
- Payment gateway specifics [Brief §42 P2].
- Every field of every form, every individual student service form, and every report template [Brief §3.2, §42 P2].
- Detailed staff HR (service history, appointment, promotion). These are shown only as "Extended HRM — future" placeholders [SOW 3.3.10; Brief §28].

---

## 1. Terminology

### Core Concepts

| Term | Definition |
|---|---|
| **Ministry / Head Office** | The Ministry of Textiles and Jute. In the SOW, "Head Office" means the Ministry-level administration operated by the Ministry Super Admin [SOW 3.2]. |
| **Department of Textiles (DOT)** | A department under the Ministry. It publicly lists TERP among its digital services [Brief §6.5]. |
| **TERP** | Textile Education And Resource Planning, an existing DOT digital service. It is a future integration or migration target [Brief §6.5; TBD Q-19]. |
| **Division** | Top administrative region under the Ministry. Configurable master data [SOW 3.1.1; Brief §4]. |
| **District** | Administrative region inside a division. Configurable master data [SOW 3.1.1; Brief §4]. |
| **Institution** | A textile educational institution, linked to one category, one division and one district [SOW 3.2.1]. |
| **Institution Category (Institution Type)** | Classification of institutions. SOW examples: Government College, Diploma College, Vocational College [SOW 3.2.1]. Brief examples: Engineering Colleges, Textile Institutes, Textile Vocational Institutes [Brief §8 S2]. The final list is master data. |
| **Institution Code** | Unique identifier of an institution [Brief §15]. |
| **Program** | An academic program offered by an institution. Shown in the directory and in program-distribution statistics [Brief §8 S5, S7]. |
| **Data Scope** | The jurisdiction a role assignment covers: All, Division, District or Institution [Brief §16]. |
| **Effective Access** | User + Role + Module Permission + Data Scope [Brief §16]. |
| **Workspace** | The role-specific authenticated area a user lands in after login [Brief §9]. |
| **Institution 360°** | One consolidated institution profile with tabs across all modules [Brief §14]. |
| **Single Source of Truth** | Each entity (student, teacher, institution, asset, budget, certificate, license) has one master record that every module reuses [Brief §34.1]. |
| **Activity Log** | Record of an important change: who, when, old value, new value, and reason where applicable [Brief §34.2]. |
| **Alert** | An exception that needs attention. It shows the issue, institution, responsible role, age/SLA, severity, and View / Take Action [Brief §11.4]. |
| **Demo / Illustrative Data** | Label on every prototype figure that the Ministry has not verified [Brief §8 S2]. |

### Admission and Academics

| Term | Definition |
|---|---|
| **Admission Cycle** | One admission round: eligibility, seat quota, required documents, application window, entrance test, result, allocation, migration and final admission [SOW 3.2.4; Brief §17]. |
| **Eligibility Rules** | Criteria an applicant must meet. Exact rules [TBD Q-01]. |
| **Seat Quota** | Seats available in a cycle. Quota types [TBD Q-01]. |
| **Entrance Test / Admission Result** | The central admission test. Its published result drives institution allocation [SOW 3.2.4, 3.3.2]. |
| **Institution Allocation** | Automatic assignment of a selected applicant to an institution based on the central result. The Principal can modify it [SOW 3.3.2]. |
| **Student Migration** | Transfer of an admitted or enrolled student between institutions [SOW 3.2.4]. |
| **Final Admission** | The step that turns a selected applicant into an admitted student [Brief §17]. |
| **Academic Session** | The academic year or session used to filter data [Brief §11.2]. |
| **Class** | A teaching unit created by the Principal, assigned to one teacher, with assigned students and content [SOW 3.3.3]. |
| **Class Content** | Materials a teacher adds to an assigned class [SOW 3.3.3]. Content versions are an edge case (#34). |
| **Semester Result** | Marks entered per semester, then calculated, reviewed and published. History is retained [SOW 3.3.9; Brief §27]. |
| **Grade Table** | A student's grades by course and semester [SOW 3.3.4]. |
| **Student Ledger** | A consolidated record of a student's academic and financial transactions [SOW 3.3.4]. |
| **Advising Table** | Academic advisor assignment and notes per student [SOW 3.3.4]. |
| **Teaching Evaluation** | Student feedback on, and evaluation of, teachers [SOW 3.3.4]. |
| **Curriculum Analysis** | A student-facing curriculum view. Content [TBD Q-38]. |
| **Code of Conduct** | The institution's conduct policy, viewable by students [SOW 3.3.4]. |
| **Academic Calendar** | The institution calendar of academic dates [SOW 3.3.4]. |

### Student Services

| Term | Definition |
|---|---|
| **Online Service Request** | One of 15 self-service student requests, each with its own approval workflow [SOW 3.3.4(1)]. Fields, fees and approvers for each [TBD Q-03]. |
| **The 15 services** | 1 Admit Card · 2 Waiver · 3 Re-admission · 4 Course Drop · 5 Semester Drop · 6 Online Payment (Fees) · 7 Testimonial · 8 Incomplete Transcript · 9 PVC & Transcript · 10 Certificate & Transcript · 11 Duplicate Certificate & Transcript (original lost) · 12 Medium of Instruction · 13 Transfer Program · 14 Cancel Studentship · 15 Convocation [SOW 3.3.4(1); Brief §22] |
| **Service Catalogue** | The list of services. Each shows eligibility, required documents, fee where applicable, expected processing time if defined, Start Application, and status tracking [Brief §22]. |
| **PVC** | Term used in "PVC & Transcript". Definition [TBD Q-30]. |
| **Approval Inbox** | The approver's queue of submitted requests, with age and status [SOW 3.3.1 "approvals"; Brief §22]. |

### Finance, Assets and Procurement

| Term | Definition |
|---|---|
| **Budget Allocation** | An amount Head Office assigns to an institution [SOW 3.2.5]. |
| **Expense** | An institution spending record: what was spent, where, when and how much [SOW 3.3.6]. |
| **Budget Utilization** | Spending against allocation: Allocated, Used, Remaining, Utilization % [SOW 3.3.6; Brief §23]. |
| **Asset** | An item Head Office provides to an institution, tracked by current holder and status [SOW 3.2.5, 3.3.7]. |
| **Asset Holder** | The person currently assigned an asset. An asset has one current holder [SOW 3.3.7]. |
| **Asset Movement** | A history event: received, assigned, returned, reassigned, transferred, reported damaged, reported lost, recovered, gate pass out/in. History is kept, never overwritten [Brief §24, §38.9]. |
| **Procurement Request** | A request to procure new assets or materials [SOW 3.3.7]. |
| **PO (Purchase Order)** | A purchase order the system generates and tracks [SOW 3.3.7]. |
| **LC (Letter of Credit)** | A document uploaded against a procurement or import record [SOW 3.3.7]. |
| **Gate Pass** | A log of assets or materials moving in and out of institution premises [SOW 3.3.7]. |

### Library, Leave, Certificates and Alumni

| Term | Definition |
|---|---|
| **Library Member** | A student or staff member registered with the library [SOW 3.3.8]. |
| **Copy** | One physical copy of a catalogued book [SOW 3.3.8]. |
| **Issue / Return** | Lending a copy with a due date, and its return [SOW 3.3.8]. |
| **Fine** | A charge for an overdue or lost item. Rates [TBD Q-09]. |
| **Reservation** | A hold on a book with no available copy. Part of the proposed standard library set [SOW §6]; confirmation [TBD Q-09]. |
| **CL / SL / EL** | Casual Leave, Sick Leave, Earned Leave. Other leave types are configurable [SOW 3.3.10]. |
| **Leave Balance** | Remaining days per leave type. Quota and accrual rules [TBD Q-08]. |
| **Certificate** | A document issued to an eligible graduate through the certification workflow, with a unique reference number [SOW 3.3.12; Brief §29]. |
| **Alumni** | A former student marked by the Principal after the final result is published. Their login is restricted to the Alumni menu [SOW 3.3.14]. |

### Phase 2 — License Verification

| Term | Definition |
|---|---|
| **Professional License** | A license issued to an individual textile professional, with a unique license/certificate number [SOW 4.2]. |
| **Individual Professional (Applicant)** | A person who applies for a license through the public application form [SOW 4.1]. |
| **Third-Party Organization (Verifier)** | An external organization registered as a platform member to verify licenses and certificates [SOW 4.3]. |
| **Membership** | A verifier's registration with the platform. Manual approval requirement [TBD Q-13]. |
| **Verification Check** | A paid search by license/certificate number that returns a result [SOW 4.3, 4.4]. |

### User Roles

| Role | Description |
|---|---|
| **Guest (public)** | Browses public pages, applies, tracks applications, starts verification. Sees only approved public data [Brief §39]. |
| **Ministry Super Admin** | Full access across the system [SOW 3.1.1]. |
| **Division Admin / District Admin** | Scoped monitoring of their jurisdiction [SOW 3.1.1]. |
| **Institution Admin / Principal** | Institution-scoped administration and operations [SOW 3.1.1, 3.3.1]. |
| **Teacher / Student / Alumni** | Institution internal roles [SOW 3.3.1, 3.3.14]. |
| **Verifier** | Third-party organization user [SOW 4.3]. |

### Status Values

| Enum | Values | Source |
|---|---|---|
| **StudentLifecycle** | `APPLICANT` → `SELECTED` → `ADMITTED` → `ACTIVE` → `GRADUATED` → `ALUMNI`; alternatives `MIGRATED`, `DROPPED`, `CANCELLED`, `READMITTED` | Brief §45 |
| **ApplicationStatus** (service requests, certificate applications) | `DRAFT` → `SUBMITTED` → `UNDER_REVIEW` → `CORRECTION_REQUIRED` → `APPROVED` / `REJECTED` → `COMPLETED`. Display label for `CORRECTION_REQUIRED`: "Action Required / Correction Needed" | Brief §22, §45 |
| **CertificateStatus** | ApplicationStatus values plus `ISSUED`. `REVOKED` only if policy later permits (#82) [TBD Q-35] | Brief §29, §38.13 |
| **LicenseStatus** | `DRAFT` → `SUBMITTED` → `UNDER_REVIEW` → `APPROVED` / `REJECTED` → `ISSUED`. `EXPIRED`, `SUSPENDED` [TBD Q-14] | Brief §32.2, §45 |
| **VerificationResult** | `VALID`, `INVALID_NOT_FOUND`; `EXPIRED` only if expiry is introduced, `SUSPENDED` only if business rules support it [TBD Q-14] | Brief §32.4 |
| **AssetStatus** | `RECEIVED`, `AVAILABLE`, `ASSIGNED`, `IN_USE`, `UNAVAILABLE`, `DAMAGED`, `LOST` | SOW 3.3.7; Brief §24 |
| **AttendanceStatus** | `PRESENT`, `ABSENT`, `NOT_RECORDED`, `PENDING_SYNC`; `LATE` and `LEAVE` only if approved [TBD Q-27] | Brief §20 |
| **ResultStatus** | `DRAFT` (entered) → `UNDER_REVIEW` (validation/review) → `PUBLISHED`; `CORRECTION_UNDER_REVIEW` for post-publication corrections | Brief §27 |
| **LeaveStatus** | `PENDING`, `APPROVED`, `REJECTED`, `WITHDRAWN` | SOW 3.3.10; Brief §38.12 #74 |
| **PaymentStatus** | `PENDING`, `SUCCESS`, `FAILED` | Brief §36, §38.14 #89–91 |
| **MembershipStatus** | `PENDING_APPROVAL` (only if Q-13 requires approval), `ACTIVE`, `INACTIVE` | Brief §32.3, §38.14 #92 |
| **RecordStatus** | `ACTIVE`, `INACTIVE`, `SUSPENDED`, `ARCHIVED`, `CLOSED` | Brief §34.3 |
| **AlertSeverity** | [Prototype placeholder] `HIGH`, `MEDIUM`, `LOW`. Final levels and thresholds [TBD Q-02] | Brief §11.4 |

Every status renders with a label and an icon or visual indicator. Color is used only in addition to these [Brief §37].

### Technical Terms

| Term | Definition |
|---|---|
| **RBAC** | Role-based access control: permissions come from roles, limited by data scope [SOW 3.1]. |
| **KPI** | A key performance indicator shown on dashboard cards [Brief §11.1]. |
| **SLA** | The expected handling time used to age alerts and requests [Brief §11.4]. Values [TBD Q-03]. |
| **MY GOV API** | The government integration layer. Purpose [TBD Q-06] [SOW 3.3.13]. |
| **Pending Sync** | Attendance captured but not yet received by the server, for example when a teacher has no connectivity [Brief §20, §38.6 #39]. |
| **In-app notification** | A notification shown in the top-bar notification panel, with unread state and click-through to the record [Brief §36]. |

---

## 2. Access Model

### 2.1 Hierarchy [SOW 3.1.1; Brief §4]

```text
Ministry Super Admin
        ↓
Division Admin
        ↓
District Admin
        ↓
Institution Admin
        ↓
Principal
   ┌────┴────┐
Teacher    Student  (→ Alumni)
```

Data rolls upward and actions flow downward through approvals [Brief §3.2].

### 2.2 Effective Access [Brief §16]

```text
User + Role + Module Permission + Data Scope = Effective Access
```

For example, "District Admin + Attendance View + Dhaka District" grants attendance viewing for Dhaka District only. It never grants national data.

### 2.3 Access Rules

1. Each role sees only its own jurisdiction's data. Opening another division's or district's data shows the permission-denied state [SOW 3.1.1; Brief §12, §13, §38.1 #1].
2. The Ministry Super Admin adds users at every level, defines roles with granular permissions, and assigns one or more roles to a user. Each assignment has a data scope [SOW 3.2.2; Brief §16].
3. The Principal assigns and updates role-based menu access within the institution [SOW 3.3.11]. The boundary between this and Super Admin role definition is [TBD Q-25].
4. Menus show only the modules a role permits. Actions without permission are not rendered [SOW 3.3.11].
5. A user with several roles gets either a workspace selector after login, or the highest/default role with a workspace switcher [TBD Q-17]. The prototype shows a workspace selector screen and a workspace switcher in the top bar [Brief §9].
6. Division, District, Institution Type, Institution, Role and reporting relationships are configurable master data, not hard-coded [Brief §4].
7. Alumni accounts are restricted to the Alumni menu [SOW 3.3.14].
8. Head Office sees live attendance of teachers and students [SOW 3.3.5]. Division and District dashboards show attendance for their own scope [Brief §12, §13].

### 2.4 Public and Private Data [Brief §7 S7, §39]

| Public (approved datasets only) | Authenticated / restricted |
|---|---|
| Institution directory | Student personal information |
| Institution public profile | Teacher personal information |
| Aggregated statistics | Attendance detail |
| Notices | Financial transactions and budget details (internal budgets are not public by default) |
| Admission information | Internal asset assignments and asset ownership |
| Results, where officially approved | Internal procurement |
| Certificate / license verification entry | Leave |
| Help and resources | Approval queues and approval history |
| | Internal reports and internal audit findings |
| | Audit logs and role permissions |

The prototype makes this separation visible: public pages use the public layout, and restricted pages use the authenticated layout with a hierarchy breadcrumb [Brief §39].

### 2.5 Access Edge Cases [Brief §38.1]

| # | Case | Required handling |
|---|---|---|
| 1 | User tries to open another division or district | Permission-denied state with a link back to their own scope. |
| 2 | User has multiple roles | Workspace selector and switcher (rule 5). |
| 3 | User is transferred to a different institution | Scope changes. History stays with the original records [Brief §34.2]. |
| 4 | Admin account becomes inactive | Inactive login message. Pending items stay visible to the scope's other authorized users. |
| 5 | Institution is moved or reassigned administratively | Change recorded in the activity log. Reports use the new mapping [Brief §4, §34.2]. |
| 6 | Institution becomes inactive but history must remain | Status changes to Inactive. Records remain [Brief §34.3]. |
| 7 | User role changes while requests are pending | Pending requests are flagged for reassignment. Rule [TBD Q-34]. |

---

## 3. System Modules

### Module 1 — Public Portal and Public Services [Brief §5, §7, §8]

A public website that is useful before login. It shows approved information and services and keeps institutional and personal data private.

#### Main Features

1. **Landing page** with 12 sections: header/navigation, hero, Textile Education at a Glance KPIs, Why the Platform Exists, Institution Network map, Institution Directory, Public Services, Public Dashboard, Admissions, Notices & Circulars, Resources, Help & Support, footer [Brief §8].
2. **Institution directory**: search plus filters (name, type, division, district, program/category, status). Cards show name, type, location, contact, available programs and a public profile button [Brief §8 S5].
3. **Institution network map**: distribution by region, filters (division, district, category), select an institution to open its public profile [Brief §8 S4].
4. **Public dashboard** with aggregated, non-sensitive indicators only [Brief §8 S7].
5. **Admissions**: current cycle, eligibility, approved seat information, dates, documents, notices, admission/entrance result, migration notices/results, instructions, downloads [Brief §8 S8].
6. **Notices & circulars**: category filters. Each notice has a title, date, category, issuing authority, attachment and detail page [Brief §8 S9].
7. **Resources and Help & Support** [Brief §8 S10, S11].
8. **Public services catalogue**: 11 service cards [Brief §8 S6].
9. **Application status tracking** [Brief §6.2, §8 S6].
10. **Verification entry point** for certificate and license verification, Phase 2 [Brief §8 S6; SOW 4.3].
11. **Language toggle** (বাংলা / English), plus accessibility tools and search [Brief §7.1, §40.3].

#### Technical Flow

##### Public discovery (demo steps 1–2)
1. A visitor opens Home and sees the hero, the platform purpose and KPI cards labelled "Demo / Illustrative Data".
2. The visitor opens the Institution Network map or the Directory and filters by division, district or category.
3. The visitor selects an institution and opens its public profile.
4. The visitor opens the Public Dashboard and sees aggregated indicators.
5. When a dataset is not approved for public release, the widget is not shown [TBD Q-16].

##### Application status tracking
1. A visitor opens Track Application and enters an application number.
2. If the application is found, the system shows its type, current status and a status timeline.
3. If not found, an inline error appears: "No application found for this number", with a help link.

### Module 2 — Authentication and Workspace Routing [Brief §9]

#### Main Features

1. One login entry for all roles: Email / Mobile / User ID and Password, with Forgot Password and Help.
2. RBAC-based routing to each role's home (see §0 User Types).
3. Workspace selector and switcher for multi-role users [TBD Q-17].
4. Inactive-account and alumni-restricted handling.
5. Session expiry handling: one "Session expired" message, then back to Login (Known Risk `auth-001`).

#### Technical Flow
1. The user enters an identifier and password, then submits.
2. **Invalid credentials:** a field-level error appears and the user stays on the login page.
3. **Inactive account:** the account-inactive message appears.
4. **One role:** the user is redirected to that role's home.
5. **Multiple roles:** the workspace selector appears, then the chosen workspace opens.
6. **Forgot Password:** the user enters an identifier and receives reset instructions. The reset channel is [TBD Q-18].

### Module 3 — Hierarchy and Institution Master Data [SOW 3.2.1; Brief §4, §15]

#### Main Features

1. Divisions and Districts as configurable master data [Brief §4]. Whether they are seeded from official government regions is [TBD Q-20].
2. Create and edit Institution Categories [SOW 3.2.1].
3. Add and edit Institutions. Link each to a category, division and district. Set institution status and assign the institution administrator [SOW 3.2.1; Brief §15].
4. Safeguards: unique institution code, duplicate institution detection, and Inactive/Closed status instead of deletion when history exists [Brief §15].

#### Technical Flow — Add Institution
1. The Super Admin opens Institution Setup and selects Add Institution.
2. They enter name, institution code, category, division, district, contact and programs.
3. The system checks code uniqueness and similar names.
4. **Duplicate code:** a blocking field error.
5. **Similar name:** a warning lists matching institutions; the admin chooses to continue or cancel.
6. **Missing division or district:** the form shows the required-field error (#9).
7. On save, the institution is Active and the action is recorded in the activity log.
8. The admin assigns the Institution Admin and Principal. If none is assigned, the institution is flagged "No Principal/Admin assigned" (#12).

#### Edge Cases [Brief §38.2]
#5 institution moved administratively · #6 inactive with history · #8 duplicate creation · #9 missing division/district · #10 category changes (logged) · #11 temporarily inactive · #12 no assigned Principal/Admin.

### Module 4 — Users, Roles and Permissions [SOW 3.2.2, 3.3.11; Brief §16]

#### Main Features

1. Create, edit, activate and deactivate users at every hierarchy level [SOW 3.2.2; Brief §16].
2. Create roles and assign granular permissions [SOW 3.2.2].
3. Assign one or more roles to a user, each with a data scope [SOW 3.2.2; Brief §16].
4. Principal-managed role-based menu access within the institution [SOW 3.3.11].

#### Technical Flow — Create User
1. The Super Admin opens Users and selects Create User.
2. They enter name, email, mobile and user ID.
3. They add one or more role assignments, each with a scope (All / Division / District / Institution).
4. On save, the user is Active. Credential delivery channel [TBD Q-18].
5. The action is recorded in the activity log.

#### Technical Flow — Define Role
1. The Super Admin opens Roles and selects Create Role.
2. They enter the role name.
3. They set a permission matrix of modules × actions. [Prototype placeholder] Actions: View, Create, Edit, Approve, Export. The final permission list is [TBD Q-25].
4. On save, the role becomes available for assignment.

#### Technical Flow — Menu Access (Principal)
1. The Principal opens Menu Access and selects an institution role (for example, Teacher).
2. They toggle menu items on or off and save.
3. Menus for users with that role in the institution update.

#### Edge Cases [Brief §38.1]
#1–#7 (see §2.5).

### Module 5 — Dashboards, Hierarchy Drill-down and Alerts [SOW 3.2.3, 3.3.5; Brief §11–§14]

**UX principle:** the Ministry dashboard answers "Where does the Ministry need to pay attention today?" It does not just display many charts [Brief §11.3].

#### Main Features

1. **Ministry Dashboard executive KPI cards** [Brief §11.1]: Total Institutions, Total Students, Total Teachers, Today's Student Attendance, Today's Teacher Attendance, Active Admission Cycle, Budget Utilization, Assets / Equipment, Pending Approvals, Institutions Requiring Attention. Final KPI availability is [TBD Q-02].
2. **Hierarchy / geographic view**: All Bangladesh → Division → District → Institution. Selecting a level updates every widget. Filters: Division, District, Institution, Institution Type, Academic Session, Date Range [Brief §11.2].
3. **Institution performance / health** [Brief §11.3]: map, ranking list, traffic-light status, trend chart and exception cards. Indicators: attendance, result performance, reporting completeness, budget utilization, asset issues, teacher availability.
4. **Action / Alert Center** with 8 alert types [Brief §11.4]: admission approval pending; attendance unusually low; abnormal budget utilization; damaged or lost asset awaiting action; overdue student service requests; missing result publication; certificate approval pending; license application pending. Each alert shows issue, institution, responsible role, age/SLA, severity, and View / Take Action.
5. **Customizable dashboard**: the Super Admin configures widgets [SOW 3.2.3]. Customization rules [TBD Q-02].
6. **Division Dashboard** [Brief §12]: same visual language as the Ministry Dashboard, scoped to the division. Division summary, district breakdown, institution list, comparative performance, attendance, admissions, results, finance/assets summary, pending actions, reports.
7. **District Dashboard** [Brief §13]: institution count, student/teacher summary, attendance, institution comparison, pending requests, asset/budget summary, admission/result status, reports.
8. **Institution 360°** [Brief §14]: a header with institution name, category, division, district, principal, status and academic session, and 14 tabs: Overview, Students, Teachers & Staff, Classes / Academics, Attendance, Results, Finance, Assets, Procurement, Library, Leave / HR, Certificates, Alumni, Reports.
9. **Every major KPI links to its underlying detail** [Brief §46].

#### Technical Flow — Drill-down (demo step 4)
1. The Ministry user is on the Ministry Dashboard with scope "All Bangladesh".
2. They select a division on the map or in the list. All widgets update, and the breadcrumb reads "Ministry > Division".
3. They select a district; the breadcrumb reads "Ministry > Division > District".
4. They select an institution to open Institution 360°; the breadcrumb shows the full path.
5. They open a tab and then a detailed record. The breadcrumb keeps the context, and any level is reachable in one click.
6. **Target:** an institution is reachable in 3–4 interactions [Brief §46].

#### Technical Flow — Alert to Action (demo step 6)
1. The Alert Center shows "Student attendance below threshold — [Institution]". The threshold value is [TBD Q-02].
2. The user selects View. Institution 360° opens on the Attendance tab, filtered to the affected class.
3. The user opens the class attendance detail.
4. The user selects Take Action. The action options are [TBD Q-02]; the prototype shows "Notify Principal" as a [Prototype placeholder].

### Module 6 — Admission Management [SOW 3.2.4, 3.3.2; Brief §8 S8, §17]

#### Main Features

1. Admission cycles: create, configure, open and close [SOW 3.2.4].
2. Eligibility rules, seat quotas and required documents [SOW 3.2.4]. Exact rules [TBD Q-01].
3. Online application submission and tracking [SOW 3.2.4]. How applicants sign in is [TBD Q-39].
4. Application validation [Brief §17]. The validating role is [TBD Q-01].
5. Admission/entrance test result processing and publication [SOW 3.2.4].
6. Automatic institution allocation from the result, with a Principal override [SOW 3.3.2].
7. Student migration between institutions [SOW 3.2.4]. Initiator and approver [TBD Q-36].
8. Final admission [Brief §17].

#### Technical Flow [Brief §17]
1. The Super Admin creates an admission cycle.
2. The Super Admin configures eligibility.
3. The Super Admin configures seats and quotas.
4. The Super Admin opens the application window, and the public Admissions page shows the cycle.
5. The applicant submits an online application with documents and tracks its status.
6. The application is validated: complete and eligible, or returned with Correction Required.
7. The admission/entrance test takes place.
8. Results are processed.
9. The Super Admin publishes the result, and the public result lookup becomes available.
10. Institutions are allocated automatically from the result. Selection rules for applicants qualifying for several choices are [TBD Q-33].
11. Migration happens if applicable.
12. Final admission: the student record becomes `ADMITTED`, then `ACTIVE`.
13. The Principal can modify a student's institution assignment, and the change is logged [SOW 3.3.2].

#### Edge Cases [Brief §38.3]
#13 duplicate application · #14 required document missing · #15 applicant becomes ineligible after validation · #16 seat quota full · #17 result corrected after publication (controlled correction with log) · #18 qualifies for several institution choices · #19 migration after first allocation · #20 final admission not completed · #21 cycle closes while an application is still Draft.

### Module 7 — Teacher and Student Management [SOW 3.3.2; Brief §18]

#### Main Features

1. **Teacher record**: profile, assigned institution, assigned classes, class content, attendance, results, leave [Brief §18].
2. **Student record**: profile, institution, academic session, class/course assignment, attendance, results, service requests, certificate, alumni state [Brief §18]. One master record is used by every module [Brief §34.1].
3. Add Teacher records (Principal) [SOW 3.3.2].
4. Student records are created from admission allocation, and the Principal can modify the institution assignment [SOW 3.3.2].
5. Student lifecycle and history are visible on the profile: Applicant → Selected → Admitted → Active Student → Graduated → Alumni, with Migrated, Dropped, Cancelled and Re-admitted as alternatives [Brief §45].
6. **Extended HRM — future** placeholder on staff profiles: service history, appointment, promotion [SOW 3.3.10; Brief §28]. Not presented as finalized workflows.

#### Edge Cases [Brief §38.4, §38.5]
#22 profile information changes · #23 name/DOB differs from certificate · #24 transfers institution · #25 drops semester or course · #26 cancels studentship · #27 re-admitted · #28 graduates and becomes alumni · #31 teacher leaves or transfers mid-semester.

### Module 8 — Academic and Class Management [SOW 3.3.3; Brief §19]

#### Main Features

1. Create classes (Principal) [SOW 3.3.3].
2. Assign a class to a teacher (Principal) [SOW 3.3.3].
3. Assign students to a class (Teacher) [SOW 3.3.3].
4. Teachers add class content and materials, with version replacement (#34) [SOW 3.3.3; Brief §38.5].
5. Academic records: grade table, advising records, teaching evaluation, curriculum analysis, code of conduct, academic calendar [Brief §19].

#### Technical Flow [Brief §19]
1. The Principal creates a class.
2. The Principal assigns a teacher. The system warns if the teacher has an overlapping class (#30).
3. The Teacher assigns students. A student assigned to the wrong class is reassigned, and the change is logged (#33).
4. The Teacher adds content.
5. Attendance, assessment and results follow (Modules 9 and 12).
6. A class without a teacher is flagged "No teacher assigned" (#32).

#### Edge Cases [Brief §38.5]
#30 overlapping classes · #31 teacher leaves mid-semester · #32 class has no teacher · #33 student in the wrong class · #34 course material needs replacement or a version update.

### Module 9 — Live Attendance [SOW 3.3.5; Brief §20]

#### Main Features

1. Real-time attendance capture for teachers and students [SOW 3.3.5]. The capture method is [TBD Q-26].
2. Teachers control and direct access to student attendance capture [SOW 3.3.5].
3. Head Office sees live teacher and student attendance on its dashboard [SOW 3.3.5]. Principal, District and Division views show their own scope [Brief §12, §13].
4. Views: Today, Institution, Class, Teacher, Student, Trend, Low-attendance alert [Brief §20].
5. Statuses: Present, Absent, Late (if approved), Leave (if approved), Not Recorded / Pending Sync [Brief §20].

#### Technical Flow — Class Attendance
1. The Teacher opens Attendance for today's class.
2. The Teacher either marks each student or opens student self-capture for a time window [SOW 3.3.5]. The method is [TBD Q-26].
3. The Teacher submits.
4. Counts update live on the Principal, District, Division and Ministry views.
5. **No connectivity:** records show Pending Sync until received (#39).
6. **Correction after submission:** the Teacher selects Correct, enters a reason, and the change is recorded in the activity log (who, when, old, new, reason) (#38) [Brief §34.2].

#### Technical Flow — Teacher Attendance
1. The Teacher marks their own attendance for the day. The method is [TBD Q-26].
2. Teacher attendance counts appear on the institution and Head Office views.

#### Edge Cases [Brief §38.6]
#35 attendance not recorded (shown as Not Recorded and counted in alerts) · #36 entered late · #37 student appears in the wrong class · #38 correction after submission · #39 no connectivity / sync delay · #40 student marked both Present and Leave (shown as a conflict for review).

### Module 10 — Student Portal [SOW 3.3.4; Brief §21]

#### Main Features

1. **Home priorities** [Brief §21]: Today's Classes, Attendance, Latest Results, Pending Applications, Notices, Fees / Payment, Academic Calendar, Profile.
2. **Secondary items** [Brief §21]: Grade Table, Advising, Teaching Evaluation, Curriculum, Code of Conduct, Certificate, Alumni transition.
3. Class content, results and attendance that have been assigned or shared with the student [SOW 3.3.4].
4. **Profile self-update**, kept consistent with issued certificate data [SOW 3.3.4]. The rule [TBD Q-07] is either (a) fields lock once a certificate is issued, or (b) edits propagate to the certificate record.
5. Student Ledger, Grade Table, Advising Table, Teaching Evaluation, Curriculum Analysis, Code of Conduct, Academic Calendar [SOW 3.3.4].
6. Registration History, Pre-Registration and Course Advising Table appear in the client sketch. Whether they are separate features is [TBD Q-21].

### Module 11 — Student Online Services [SOW 3.3.4(1); Brief §22]

#### Main Features

1. A service catalogue of the 15 services [SOW 3.3.4(1); Brief §22].
2. Each service card shows eligibility, required documents, fee where applicable, expected processing time if defined, Start Application, and status tracking [Brief §22]. All per-service values are [TBD Q-03].
3. A generic application form pattern with document upload. Individual forms for each service are P2 [Brief §42].
4. Status tracking with a timeline using ApplicationStatus [Brief §22, §45].
5. **Approval inbox.** The Principal manages approvals [SOW 3.3.1]. The full approval chain for each service is [TBD Q-03].
6. **Online Payment (Fees)** is a payment flow inside the catalogue [SOW 3.3.4(1)]. Whether it needs approval is [TBD Q-31], and the gateway is [TBD Q-12].

#### Technical Flow (demo step 7 pattern)
1. The Student opens Services and selects a service.
2. The service detail shows eligibility, documents, fee and processing time.
3. The Student selects Start Application, fills the form and uploads documents.
4. The Student saves a Draft or submits. Status becomes `SUBMITTED` and the student is notified.
5. The request appears in the approver's inbox with its age. Opening it sets status to `UNDER_REVIEW`.
6. The approver chooses one of:
   - **Request correction:** status becomes `CORRECTION_REQUIRED` with a note. The student edits and resubmits.
   - **Approve:** status becomes `APPROVED`.
   - **Reject:** a reason is required, and status becomes `REJECTED`.
7. When the service output is delivered (for example, a document is ready), status becomes `COMPLETED`.
8. Each status change notifies the student. The timeline shows who acted and when.
9. Requests older than their SLA appear as "overdue" alerts on Ministry, Division and District dashboards [Brief §11.4]. SLA values are [TBD Q-03].

#### Edge Cases
#21 cycle closes while Draft · #25 course or semester drop · #26 cancel studentship · #27 re-admission · #78 duplicate certificate request · #90–91 payment failure or duplicate payment [Brief §38].

### Module 12 — Result Management [SOW 3.3.9; Brief §27]

#### Main Features

1. Semester-wise result entry, calculation, publication and history per student [SOW 3.3.9].
2. Validation and review before publication [Brief §27]. The reviewing role is [TBD Q-32].
3. After publication, changes go through a controlled correction review, never silent edits [Brief §27].

#### Technical Flow [Brief §27]
1. The Teacher enters marks per course for the semester.
2. The system calculates results. Grading and calculation rules are [TBD Q-40].
3. **Missing or invalid marks** (#41, #42) are flagged inline, and the result cannot move to review while flags remain.
4. The result moves to Validation / Review.
5. The reviewer publishes, and the student is notified.
6. The student sees the result and grade table.
7. History is retained.
8. **Post-publication correction:** a correction request with a reason moves the result to `CORRECTION_UNDER_REVIEW`. The approved correction publishes a new version, and both versions remain in history (#44, #45).

#### Edge Cases [Brief §38.7]
#41 missing marks · #42 invalid marks · #43 calculation incomplete · #44 published with incorrect data · #45 correction after publication · #46 incomplete result · #47 re-exam/retake if later applicable [TBD Q-40].

### Module 13 — Finance and Budget [SOW 3.2.5, 3.3.6; Brief §23]

#### Main Features

1. Head Office budget allocation per institution [SOW 3.2.5].
2. Institution expense recording: what, where, when, how much, plus an evidence attachment [SOW 3.3.6; Brief §38.8 #51].
3. Budget utilization tracking against the allocation [SOW 3.3.6].
4. Dashboard figures: Allocated, Used, Remaining, Utilization %, institution comparison, period comparison [Brief §23].
5. Internal financial details are not public [Brief §23].

#### Technical Flow
1. The Super Admin allocates a budget to an institution (amount and period). The allocation is logged.
2. The Principal sees the allocation on the Finance page.
3. The Principal records an expense with an evidence attachment. Utilization updates.
4. **Expense exceeds the available budget (#48):** the system flags it. Whether the flag blocks or only warns is [TBD Q-37].
5. **Possible duplicate expense (#50):** a warning lists similar entries.
6. **Missing attachment (#51):** the expense is flagged "Evidence missing".
7. **Additional allocation (#52) or budget revision (#49):** recorded as new allocation entries, with history kept.
8. The Ministry compares utilization across institutions and periods.

### Module 14 — Assets and Inventory [SOW 3.2.5, 3.3.7; Brief §24]

#### Main Features

1. Head Office assigns and tracks assets per institution [SOW 3.2.5].
2. Track assets received from Head Office [SOW 3.3.7].
3. The Principal assigns an asset to a person, and the system shows the current holder [SOW 3.3.7].
4. Current status: In Use, Available, Unavailable, Damaged, Lost [SOW 3.3.7; Brief §24].
5. Damaged or lost assets are recorded with a reason [SOW 3.3.7].
6. Movement history is maintained; previous ownership is never overwritten [Brief §24].

#### Technical Flow [Brief §24]
1. Head Office allocates an asset to an institution.
2. The institution confirms receipt (`RECEIVED`) and the asset becomes `AVAILABLE`.
3. The Principal assigns it to a person (`ASSIGNED`, then `IN_USE`). It has one current holder [SOW 3.3.7]. An asset that is already assigned must be returned or reassigned first (#53).
4. The asset is returned or reassigned, and the movement is logged.
5. **Damaged or lost:** the user reports it with a reason, and status becomes `DAMAGED` or `LOST`. The case appears in the Ministry alert center.
6. **Lost asset recovered (#58):** a recovery is recorded, the status is restored, and history is kept.
7. **Transfer to another institution (#55):** the transfer is recorded. The approver is [TBD Q-42].

#### Edge Cases [Brief §38.9]
#53 assigned to two people · #54 transferred between people · #55 transferred between institutions · #56 damaged · #57 lost · #58 lost asset later recovered · #59 record exists but physical item unavailable (`UNAVAILABLE`) · #60 gate pass created but asset does not return (overdue gate pass flag).

### Module 15 — Procurement, PO, LC and Gate Pass [SOW 3.3.7; Brief §25]

The SOW gives these as keywords only. The prototype shows a generic connected flow, and every screen carries the label **"Requires detailed workflow confirmation"**. No final approval chain is invented [Brief §25; TBD Q-04].

#### Main Features

1. Procurement request: request and track new assets or materials [SOW 3.3.7].
2. PO system: generate and track purchase orders [SOW 3.3.7].
3. LC document upload against a procurement or import record [SOW 3.3.7].
4. Gate Pass: log asset and material movement in and out of premises [SOW 3.3.7].

#### Technical Flow (generic) [Brief §25]
1. Procurement request.
2. Review / approval (chain [TBD Q-04]).
3. Purchase order.
4. LC document, if applicable.
5. Receive item.
6. Asset / inventory update (Module 14).
7. Gate pass whenever the item is moved.

#### Edge Cases [Brief §38.10]
#61 request rejected · #62 PO cancelled · #63 partial delivery · #64 LC or PO document missing · #65 received quantity differs from PO · #66 approval chain not configured (shows a "workflow not configured" state).

### Module 16 — Library [SOW 3.3.8; Brief §26]

The client asked the design team to propose the full standard feature set for sign-off [SOW 3.3.8, §6]. This module is that proposal.

#### Main Features (proposed set)

1. Book catalogue and copy inventory [SOW 3.3.8].
2. Member registration for students and staff [SOW 3.3.8].
3. Issue and return with due dates [SOW 3.3.8].
4. Fines for overdue or lost items [SOW 3.3.8]. Rates [TBD Q-09].
5. Reservations [SOW §6] [TBD Q-09].
6. Search and browse for students and staff [SOW 3.3.8].
7. Views: available books, borrowed, overdue, fines, popular books, member history [Brief §26].

#### Technical Flow — Issue and Return
1. The library operator searches for a member and a book. Who operates the library desk is [TBD Q-41].
2. **No copy available (#67):** a reservation is offered.
3. The operator issues a copy and the due date is set.
4. The member sees the loan in My Loans.
5. **Return:** the copy becomes available.
6. **Overdue (#68):** a fine accrues and the member is notified.
7. **Lost or damaged book (#69):** a fine is charged and the copy's status changes.
8. **Unpaid fine (#70):** the member is flagged.
9. **Student becomes alumni with a book still borrowed (#71):** an outstanding-loan flag appears on the Principal's alumni marking screen [TBD Q-44].

### Module 17 — Leave and Staff HRM [SOW 3.3.10; Brief §28]

#### Main Features

1. Leave types: CL, SL, EL and other configurable types [SOW 3.3.10].
2. Full workflow: application → approval or rejection, with status tracking and balance management [SOW 3.3.10].
3. **Extended HRM** (staff profile, service history, appointment, promotion) is shown only as a "future / requires scoping" area [SOW 3.3.10; Brief §28; TBD Q-05].

#### Technical Flow
1. The Teacher (staff) opens Leave and selects Apply.
2. They choose a leave type, dates and a reason.
3. The system checks the balance and overlaps. **Insufficient balance (#72)** and **overlapping requests (#73)** show blocking messages.
4. On submit, status is `PENDING`.
5. The Principal approves or rejects. A reason is required for rejection [SOW §5: Leave users Teacher, Principal]. The approver for the Principal's own leave is [TBD Q-45].
6. On approval the balance updates and the applicant is notified.
7. **Withdrawal (#74):** the applicant can withdraw a `PENDING` request, and status becomes `WITHDRAWN`.
8. **Approver unavailable (#75):** delegation rule [TBD Q-45].
9. **Leave type disabled after application (#76):** the pending request stays valid and is flagged.

### Module 18 — Certification [SOW 3.3.12; Brief §29]

#### Main Features

1. After graduation, a student applies for a certificate through the system [SOW 3.3.12].
2. The full application and issuance workflow runs in the platform [SOW 3.3.12].
3. Supports status, a unique reference number, duplicate requests, correction scenarios and history [Brief §29].

#### Technical Flow (demo step 7) [Brief §29, §43]
1. An eligible student (status `GRADUATED`) opens Certificate and applies.
2. **Applies before becoming eligible (#77):** the Apply button is disabled with an eligibility message.
3. Institution review follows (`UNDER_REVIEW`).
4. On approval, the certificate is issued with a unique reference number (`ISSUED`).
5. The student sees status and history. The certificate is verifiable through Phase 2 verification [TBD Q-10].
6. **Data differs from the student profile (#79) or needs correction (#80):** a correction request is made, and the old and new values are kept.
7. **Duplicate certificate (#78):** handled through the "Duplicate Certificate & Transcript" service (Module 11).
8. **Profile changes after issue (#81):** follows the rule in [TBD Q-07].

### Module 19 — Alumni [SOW 3.3.14; Brief §30]

#### Technical Flow
1. The final result is published.
2. The Principal opens Alumni, sees students eligible for alumni status, selects them and confirms "Mark as Alumni".
3. The student's status becomes `ALUMNI`, and regular student access is restricted [SOW 3.3.14].
4. On next login, the user lands in the Alumni Workspace.
5. The alumnus updates current profession or job, position, LinkedIn profile link and other approved professional information [SOW 3.3.14; Brief §30].
6. **Alumnus opens a student function (#29):** the permission-denied state appears.

### Module 20 — Government Integration (MY GOV) [SOW 3.3.13; Brief §31]

The prototype represents this as **"Government Integration Layer — Subject to API/use-case confirmation"** [Brief §31; TBD Q-06]. Placeholder use cases: Identity Verification, Certificate Registration, Government Service Integration. No final dependency is designed.

#### Edge Cases [Brief §38.15]
#93 API unavailable · #94 API data conflicts with local data · #95 request timeout · #96 duplicate callback/update · #97 external service temporarily unavailable. The integration status page shows each state with a label and an icon.

### Module 21 — Consolidated Reporting [SOW 3.2.3, 3.2.6; Brief §33]

#### Main Features

1. **Report areas:** Institution, Admission, Student, Teacher, Attendance, Results, Finance, Assets, Library, Leave, Certificates, Alumni, License [Brief §33; SOW 3.2.6].
2. **Common filters:** date range, division, district, institution, institution type, academic session, status [Brief §33; SOW 3.2.3].
3. **Actions:** view, filter, export/download where authorized [Brief §33; SOW 3.2.3].
4. Every role's reports are limited to its own data scope [SOW 3.1.1].
5. Additional or ad-hoc reports can be added as requirements are identified [SOW 3.2.6].
6. Report approval or submission requirements are [TBD Q-15].

#### Technical Flow (demo step 8)
1. The user opens Reports and selects a report area.
2. They set filters for institution, district, division and period.
3. The report table and chart appear, with a summary row.
4. They select Export. The format list is [TBD Q-15]; the prototype shows CSV / Excel / PDF as a [Prototype placeholder].

### Module 22 — Notifications, Global Search and Activity Log [Brief §34–§36]

#### Main Features

1. **In-app notifications** with unread state and click-through to the record [Brief §36]. Events: application submitted, approved, rejected, correction required; new admission notice; result published; leave decision; asset action required; certificate ready; license approved; payment success or failure; upcoming deadline. SMS and email channels are [TBD Q-18].
2. **Global search** for authorized users: institution, student, teacher, asset, application, certificate, license, report. Public search is limited to approved datasets: institution, notice, result/verification where allowed, public service [Brief §35].
3. **View History / Activity Log** on every important record: who, when, old value, new value, reason [Brief §34.2].

### Module 23 — License Application and Review (Phase 2) [SOW 4.1, 4.2; Brief §32.1, §32.2]

#### Technical Flow
1. An individual professional opens the public License Application form.
2. They enter their information, upload documents and submit. Status becomes `SUBMITTED` and an application number is shown.
3. **Duplicate application (#83):** a warning lists the existing application.
4. Head Office opens the license review queue and reviews the application against validation criteria. Status becomes `UNDER_REVIEW`. The validation criteria are [TBD Q-24].
5. **Invalid or missing documents (#84):** Head Office requests correction.
6. **Approve:** the license is issued with a unique license/certificate number (`APPROVED`, then `ISSUED`).
7. **Reject (#85):** a reason is required and status becomes `REJECTED`.
8. The applicant is notified ("License approved") and can track status on Track Application.
9. **License status changes later (#87):** expiry, renewal and suspension rules are [TBD Q-14].

The relationship between Phase 1 certificates and the license application (for example, prefilling from a graduate's certificate) is [TBD Q-10].

### Module 24 — Third-Party Verification and Payment (Phase 2) [SOW 4.3, 4.4; Brief §32.3–§32.5]

#### Main Features

1. Organizations register as platform members [SOW 4.3]. Manual approval is [TBD Q-13].
2. Payment is required before a check [SOW 4.4]. Pricing (per check, subscription, or both) and invoicing are [TBD Q-11], and the gateway is [TBD Q-12]. The prototype shows a generic payment step with pricing labelled "TBD" [Brief §32.5].
3. Search by license/certificate number [SOW 4.3].
4. The result is Valid, or Invalid / Not Found. Expired and Suspended appear only if those rules are introduced [Brief §32.4].
5. The result shows only the minimum personal information needed to confirm validity [Brief §32.4]. The exact field list is [TBD Q-16].

#### Technical Flow (demo step 9)
1. The organization registers. If approval is required, membership is `PENDING_APPROVAL`; otherwise it is `ACTIVE`.
2. **Inactive membership (#92):** the verification search is disabled with a renewal message.
3. The organization pays. Payment is `PENDING`, then `SUCCESS` or `FAILED`.
4. **Payment failed (#90):** a retry message appears.
5. **Duplicate payment (#91):** a warning appears before charging.
6. **Payment succeeded but status not updated (#89):** a "Payment received — updating" state appears with a refresh action.
7. The organization enters a license/certificate number and searches.
8. **Not found or wrong number (#86, #88):** the "Invalid / Not Found" result appears, with guidance to check the number.
9. **Found:** the result card shows Valid, the holder's name, the license/certificate number, the issue date and the issuing authority. The field list is [TBD Q-16].

#### Public verification entry
The public `/verify` page explains verification and directs organizations to register or sign in. The SOW requires payment before checks [SOW 4.4]. Whether a free public lookup exists at all is [TBD Q-16]. The SOW takes precedence over the Brief's listing of verification as a public service.

---

## 4. Global UX and Design Requirements

### 4.1 Layouts

**Public layout** [Brief §7.1, §8 S12]
- **Header navigation:** Home, About, Institutions, Public Dashboard, Admissions, Services, Notices, Results / Verification, Resources, Help & Support, Login, বাংলা / English. Also accessibility tools and search.
- **Footer:** Ministry identity, Department identity, Important Links, Privacy, Terms, Accessibility, Contact, Help Desk, system version / last updated.

**Authenticated layout (desktop)** [Brief §10]

```text
┌─────────────────────────────────────────────────────────────┐
│ Top Bar: Search | Notifications | Language | User Profile  │
├───────────────┬─────────────────────────────────────────────┤
│               │ Breadcrumb / Hierarchy                     │
│ Left Sidebar  │ Ministry > Division > District > Institute │
│               ├─────────────────────────────────────────────┤
│ Modules       │ Main Workspace                              │
└───────────────┴─────────────────────────────────────────────┘
```

- **Global components:** hierarchy breadcrumb, global search, notifications, pending action count, quick actions, contextual filters, date range, export where permitted, role/workspace switch, help, profile [Brief §10].
- **Tablet and mobile:** the sidebar collapses to icons on tablet and to an overlay menu on mobile (Known Risk `responsive-001`).

### 4.2 Component Inventory [Brief §47]

Header · Public navigation · Sidebar · Breadcrumb · Hierarchy selector · KPI card · Trend card · Alert card · Status badge · Data table · Filter drawer · Search · Institution card · Service card · Notice card · Timeline · Approval stepper · Activity log · Profile summary · Empty state · Error state · Confirmation modal · Permission warning · Notification panel · Help card · Map tooltip · Chart container · Download/export action.

Shared components are identical across pages [design phase rules].

### 4.3 Required States [Brief §46]

Every list, dashboard and form has these states designed:
- **Loading:** skeleton.
- **Empty:** message plus the next action.
- **Error:** message plus retry.
- **Permission-denied:** explanation plus a link to the user's own scope.
- **Success and failure feedback:** toast or inline message.

### 4.4 Lists and Tables

- Tables support search, filters and pagination [Brief §46].
- Admin list pages follow the pipeline admin standard: keyword search; status/date/category filters; column sorting; row selection with bulk **status change** and **export**; pagination with 10/25/50/100 per page; an action column (View / Edit / Change status); a detail drawer; and a confirmation dialog for status changes.
- Bulk delete is not offered for records with history [Brief §34.3].
- The "All" filter returns every status, and statistics include zero-value statuses (Known Risk `admin_dashboard-001`).

### 4.5 Status Design [Brief §37]

Every status shows a label plus an icon or visual indicator. Color is added on top and is never the only signal. Status set used across modules: Draft, Submitted, Under Review, Pending, Action Required, Approved, Rejected, Completed, Inactive (plus the module enums in §1).

### 4.6 Language [Brief §40.3]

- Bangla and English from the start, with a toggle showing **বাংলা | English** in the public header and the authenticated top bar.
- Components leave room for longer Bangla labels.
- The default locale is [TBD Q-29].

### 4.7 Accessibility [Brief §40.4]

- Text contrast at least 4.5:1 (WCAG AA).
- Full keyboard navigation and a visible focus ring.
- Readable font sizes.
- A label on every input.
- Status never shown by color alone.
- Screen-reader-friendly heading hierarchy.
- Modals use a focus trap.
- Icon-only buttons have an `aria-label`.

[Brief §40.4; design phase rules; Known Risks `accessibility-001` to `accessibility-003`]

### 4.8 Responsive Behavior [Brief §40.5; design phase rules]

- **Priority:** (1) Desktop for Ministry and admin workflows; (2) Tablet for institution and admin use; (3) Mobile for student, teacher and public services.
- **Breakpoints:** 375 / 768 / 1024 / 1440 px.
- No horizontal page scroll at 375 px.

### 4.9 Visual Direction [Brief §40.1, §40.2, §41]

- **Tone:** Bangladesh Government + Textile Identity + Modern Data Platform. Official, trustworthy, modern, structured, calm, data-driven. Not a commercial SaaS look.
- **Modernize the reference portals:** more whitespace, cleaner hierarchy, a consistent component system, clearer typography, strong dashboard hierarchy, progressive disclosure, fewer competing colors.
- **Palette:** restrained green and red accents tied to national identity, neutral surfaces, light dashboard backgrounds, accessible status colors, consistent iconography.
- **Textile motif:** a subtle weave pattern, used sparingly and never overloading the interface.
- **Hero visual:** a Bangladesh map with connected institution nodes showing the Ministry → Division → District → Institution data flow. No generic education stock photos [Brief §8 S1].
- **Icons:** SVG or Lucide icons only. No emoji used as icons [design phase rules].

### 4.10 Research References [Brief §6, §49, §50]

These are research references only. Do not copy them visually.

| Reference | Use it for |
|---|---|
| IPEMIS (ipemis.dpe.gov.bd) | Public dashboard, public data, help architecture, ministry-to-field feel, accessibility controls |
| BIDA One Stop Service (bidaquickserv.org) | Service catalogue, application workflow, status tracking, one-stop-service thinking |
| EMIS (apps.emis.gov.bd/portal) | Institution directory, module presentation, education-management portal pattern |
| BTEB eSheba (btebesheba.gov.bd) | Student and institution public services, verification, process guidance, notices |
| motj.gov.bd and dot.gov.bd | Ministry and Department identity and existing digital-service context |

**Target:** Public Portal + Ministry Command Dashboard + Hierarchical Management + Institution 360° + Workflow Tracking + Single Source of Truth [Brief §50].

### 4.11 Single Source of Truth Rules [Brief §34]

1. **One record, used everywhere.** The Student Master Record flows through Admission → Class → Attendance → Result → Certificate → Alumni. No module creates its own student profile. The same applies to Institution, Teacher, Asset, Budget, Certificate and License.
2. **Changes are traceable.** Every important record has "View History / Activity Log" showing who, when, old value, new value and reason.
3. **Avoid deleting history.** Use Active / Inactive / Suspended / Archived / Closed.

### 4.12 Demo Data Rule [Brief §8 S2]

Every prototype figure carries the label **"Demo / Illustrative Data"** until the Ministry verifies it [TBD Q-29].

### 4.13 Prototype UX Acceptance Criteria [Brief §46]

1. A first-time visitor understands what the platform does within 10 seconds.
2. Public and authenticated areas are clearly separated.
3. A Ministry user reaches an institution within 3–4 interactions.
4. Hierarchy context is always visible.
5. Every major KPI leads to its underlying detail.
6. Each workflow shows the current status and the next action.
7. Pending work is easy to find.
8. Exceptions and problems stand out more than normal records.
9. The same entity is reused across modules, not visually duplicated.
10. The user never loses context moving from Ministry to institution detail.
11. No sensitive data appears on public pages.
12. Bangla and English layouts are considered.
13. Tables support search, filter and pagination.
14. Empty states are designed.
15. Error states are designed.
16. Permission-denied states are designed.
17. Loading states are designed.
18. Success and failure feedback is clear.
19. Responsive behavior is defined.

### 4.14 Screen Design Rule [Brief, "Working Rule for Prototype Design"]

Do not design a screen only because a module exists. For every screen, answer:
1. Who uses it?
2. What decision or action do they need to make?
3. What information does that decision need?
4. What can go wrong?
5. What is the next step?
6. Who receives the data or action after this?
7. Is this information public or private?

---

## 5. Prototype Navigation Map

Role folders for HTML output (matching `user_type`) and the cross-role links that carry the demo story:

```text
public/        Home → Institutions → Institution Profile → Public Dashboard → Admissions → Verify → Login
                                                                                         │
                     ┌───────────────────────────────────────────────────────────────────┤
                     ▼                                                                   ▼
ministry/      Dashboard → Division → District → Institution 360° → (Attendance tab → class detail)
               Alerts → Institution 360° · Reports · Admissions · Budget & Assets · Licenses
division/      Dashboard → District → Institution 360° (scoped)
district/      Dashboard → Institution 360° (scoped)
institution-admin/  Dashboard → Reports
principal/     Dashboard → Service Requests → Request Review · Certificates · Alumni · Assets · …
teacher/       Workspace → Attendance Capture · Classes · Results · Leave
student/       Portal Home → Services → Apply → My Requests → Request Detail · Certificate
alumni/        Alumni Workspace
verifier/      Verification Workspace → Verify → Result · Payment
```

The Login page links to every role's home. In the prototype, the login form offers a "Demo: sign in as …" role picker so presenters can switch roles. This picker is a [Prototype placeholder].

---

## 6. Page Architecture and Feature Specification

Route groups: **Public** (anyone), **Auth** (signed-out users only), **Protected** (signed-in users, prefixed by role key). Priority: P0 / P1 / P2 / S as defined in §0.

### 6.1 Public — `public`

#### Navigation Menu
Home · About · Institutions · Public Dashboard · Admissions · Services · Notices · Results / Verification · Resources · Help & Support · Login · বাংলা / English

#### Page Map

| Route | Page | Priority | Source |
|---|---|---|---|
| `/` | Home (Landing) | P0 | Brief §8 |
| `/about` | About the Platform | S | Brief §7.1, §8 S3 |
| `/institutions` | Institution Directory and Network Map | P0 | Brief §8 S4, S5 |
| `/institutions/:code` | Institution Public Profile | P0 | Brief §8 S4, S5 |
| `/dashboard` | Public Dashboard | P0 | Brief §8 S7 |
| `/admissions` | Admissions | P0 | Brief §8 S8; SOW 3.2.4 |
| `/admissions/apply` | Admission Application | S | SOW 3.2.4 |
| `/admissions/results` | Admission Result Lookup | S | SOW 3.2.4; Brief §8 S8 |
| `/services` | Public Services | S | Brief §8 S6 |
| `/track` | Track Application | S | Brief §6.2, §8 S6 |
| `/notices` | Notices and Circulars | P1 | Brief §8 S9 |
| `/notices/:id` | Notice Detail | P1 | Brief §8 S9 |
| `/verify` | Certificate / License Verification | P0 | SOW 4.3; Brief §8 S6, §43 step 9 |
| `/license/apply` | Professional License Application | S | SOW 4.1; Brief §32.1 |
| `/verifier/register` | Verifier Organization Registration | S | SOW 4.3; Brief §32.3 |
| `/resources` | Resources | S | Brief §8 S10 |
| `/help` | Help and Support | P1 | Brief §8 S11 |
| `/policies` | Privacy, Terms and Accessibility | S | Brief §8 S12 |
| `/auth/login` | Login | P0 | Brief §9 |
| `/auth/forgot-password` | Forgot Password | S | Brief §9 |
| `/auth/select-workspace` | Workspace Selector | S | Brief §9 [TBD Q-17] |

#### Feature List by Page

##### `/` — Home (Landing) [Brief §8]
- **Hero:**
  - Headline: "Connecting Bangladesh's Textile Institutions Through One Digital Platform".
  - Supporting line: "Centralized institution management, academic services, real-time monitoring, reporting, and professional verification for the Ministry of Textiles and Jute."
  - Primary CTA "Explore Institutions" (→ `/institutions`), secondary CTA "View Public Dashboard" (→ `/dashboard`), utility CTA "Login".
  - Visual: Bangladesh map with connected institution nodes.
- **Textile Education at a Glance:** large KPI cards for Engineering Colleges, Textile Institutes, Textile Vocational Institutes, Students, Teachers and Active Institutions, each labelled "Demo / Illustrative Data".
- **Why the Platform Exists:** a Before → Centralized Platform → After transformation graphic.
  - Before: different institutional records, manual consolidation, delayed reporting, limited cross-institution visibility, repeated data entry.
  - After: one source of truth, live monitoring, standardized workflow, faster decisions, greater accountability.
- **Institution Network:** map/region view with division, district and category filters. Selecting an institution opens its public profile.
- **Institution Directory teaser:** search box plus filters, linking to `/institutions`.
- **Public Services:** 11 service cards (Admission Information, Admission Result, Student Application Status, Certificate Information, Certificate Verification, Professional License Application (Phase 2), Professional License Verification (Phase 2), Institution Directory, Notices / Circulars, Downloads / Forms, Help Desk).
- **Public Dashboard teaser:** aggregated indicators linking to `/dashboard`.
- **Admissions highlight:** current cycle and important dates.
- **Latest notices:** 3–5 notice cards.
- **Resources and help cards.**
- **Footer.**

##### `/about` — About the Platform
- Purpose and pitch line [Brief §1].
- Before → After transformation [Brief §8 S3].
- Hierarchy diagram (Ministry → Division → District → Institution) [Brief §4].
- Phase 1 and Phase 2 overview [SOW §1].

##### `/institutions` — Institution Directory and Network Map [Brief §8 S4, S5]
- Map with distribution by region. Division and district filters zoom the map.
- Search by institution name.
- Filters: Institution Type, Division, District, Program / Category, Status.
- Result cards: name, type, location, contact, available programs, "View Profile" button.
- Pagination and an empty state ("No institutions match these filters" with a Clear filters action).
- No internal operational data.

##### `/institutions/:code` — Institution Public Profile
- Name, type, division, district, address, contact, programs offered [Brief §8 S5].
- Location map.
- Related public notices [Brief §8 S9].
- No internal data such as attendance, budget or assets [Brief §39].

##### `/dashboard` — Public Dashboard [Brief §8 S7]
- Institution count by category.
- Institution distribution by region (map and table).
- Overall student count and overall teacher count.
- Academic program distribution.
- Historical aggregated trends where approved [TBD Q-16].
- Every widget labelled "Demo / Illustrative Data".
- Message: "The public gets transparency; the Ministry gets operational intelligence." [Brief §43 step 2]

##### `/admissions` — Admissions [Brief §8 S8]
- Current admission cycle with an important-dates timeline.
- Eligibility information [TBD Q-01].
- Seat information where approved.
- Required documents.
- Admission notices.
- Admission / entrance result link (→ `/admissions/results`).
- Migration notices and results.
- Instructions (step-by-step) and related downloads.
- Buttons: "Apply Online" (→ `/admissions/apply`) and "Track Application" (→ `/track`).

##### `/admissions/apply` — Admission Application [SOW 3.2.4]
- Steps: Applicant information → Academic information → Documents upload → Review → Submit.
- Shows the applicant sign-in method required before applying [TBD Q-39].
- Document upload states the allowed formats and maximum size (Known Risk `file_upload-002`).
- **Duplicate application:** warning with the existing application number (#13).
- **Missing document:** blocks submission and lists the missing items (#14).
- **Cycle closed:** the form is disabled with a "cycle closed" message (#21).
- On submit: confirmation with the application number and a "Track Application" link.

##### `/admissions/results` — Admission Result Lookup
- Search by application or roll number.
- Result card: status (Selected / Not Selected), allocated institution.
- Not-found state.
- Published-result notice with the date.
- Correction notice when a result was corrected after publication (#17).

##### `/services` — Public Services [Brief §8 S6]
- Service catalogue grouped by user type (Student, Institution, Professional, Organization) [Brief §6.4].
- Each card has a description, a "how it works" link, and a start or open link to the relevant page.

##### `/track` — Track Application [Brief §6.2]
- Input: application number.
- Result: application type (Admission / License), current status badge, status timeline, next action.
- Not-found state.

##### `/notices` — Notices and Circulars [Brief §8 S9]
- Category filters: Admission, Academic, Examination / Result, Institution, Teacher / Staff, Procurement, Certificate, General, License (Phase 2).
- Search, plus date-range sorting (newest first).
- Notice cards: title, date, category, issuing authority, attachment icon.
- Pagination.

##### `/notices/:id` — Notice Detail
- Title, date, category, issuing authority, body, attachment download, related notices.

##### `/verify` — Certificate / License Verification [SOW 4.3, 4.4; Brief §32]
- Explains what can be verified and that organizations verify after registration and payment [SOW 4.4].
- Buttons: "Register as Verifier Organization" (→ `/verifier/register`) and "Sign in to Verify" (→ `/auth/login`).
- Shows the verification result types: Valid, Invalid / Not Found.
- A "Free public lookup — TBD" note [TBD Q-16].

##### `/license/apply` — Professional License Application (Phase 2) [SOW 4.1; Brief §32.1]
- Steps: Applicant information → Professional details → Documents → Review → Submit.
- Duplicate application warning (#83).
- Missing-document validation (#84).
- On submit: confirmation with the application number and a "Track Application" link.

##### `/verifier/register` — Verifier Organization Registration (Phase 2) [SOW 4.3]
- Organization details, contact person, account credentials, terms acceptance.
- On submit: "Pending approval" or "Active" [TBD Q-13], then a link to sign in.

##### `/resources` — Resources [Brief §8 S10]
- Tabs: User Guides, Forms, Policies, Circulars, Academic Calendar, Code of Conduct, FAQ, Video Tutorials / Help Materials.
- Downloadable file cards with file type and size.

##### `/help` — Help and Support [Brief §8 S11]
- FAQ accordion and searchable help topics.
- Support contact.
- User guide links.
- Password and login help.
- Application tracking help.
- Ticket route [TBD Q-46].

##### `/policies` — Privacy, Terms and Accessibility [Brief §8 S12]
- Three tabs. Content is [TBD Q-46]; placeholder text is labelled.

##### `/auth/login` — Login [Brief §9]
- Input: Email / Mobile / User ID, Password (show/hide).
- Links: Forgot Password, Help.
- Validation: field-level errors. The button stays clickable and shows specific errors (Known Risk `auth-002`).
- Inactive account message.
- [Prototype placeholder] "Demo: sign in as …" role picker linking to each role's home page.

##### `/auth/forgot-password` — Forgot Password
- Input: Email / Mobile / User ID.
- Confirmation message. The reset channel is [TBD Q-18].
- Back to Login.

##### `/auth/select-workspace` — Workspace Selector [Brief §9; TBD Q-17]
- Cards listing the user's roles and scopes (for example, "Principal — Institution X", "Teacher — Institution X").
- Choosing a card opens that workspace.
- Option to remember a default.

### 6.2 Ministry Super Admin — `ministry`

#### Navigation Menu
1. Dashboard
2. Hierarchy (Divisions › Districts › Institutions)
3. Alerts
4. Live Attendance
5. Admissions
6. Budget & Assets
7. Reports
8. Licenses (Phase 2)
9. Setup (Institutions, Categories, Divisions & Districts)
10. Users & Roles
11. Integrations

The top bar has search, notifications, language and profile.

#### Page Map

| Route | Page | Priority | Source |
|---|---|---|---|
| `/ministry/dashboard` | Ministry Dashboard | P0 | Brief §11; SOW 3.2.3 |
| `/ministry/divisions/:id` | Division Drill-down | P0 | Brief §11.2, §43 step 4 |
| `/ministry/districts/:id` | District Drill-down | P0 | Brief §11.2, §43 step 4 |
| `/ministry/institutions` | Institution List | P0 | Brief §11.2 |
| `/ministry/institutions/:id` | Institution 360° | P0 | Brief §14, §43 step 5 |
| `/ministry/alerts` | Action / Alert Center | P0 | Brief §11.4, §43 step 6 |
| `/ministry/attendance` | Live Attendance Monitor | P0 | SOW 3.3.5; Brief §20 |
| `/ministry/admissions` | Admission Overview | P0 | SOW 3.2.4; Brief §17 |
| `/ministry/admissions/cycles/:id` | Admission Cycle Detail and Flow | P0 | SOW 3.2.4; Brief §17 |
| `/ministry/admissions/cycles/new` | Admission Cycle Setup | S | SOW 3.2.4 |
| `/ministry/admissions/applications` | Applications and Validation | S | SOW 3.2.4; Brief §17 |
| `/ministry/admissions/results` | Result Publication and Institution Allocation | S | SOW 3.2.4, 3.3.2 |
| `/ministry/admissions/migrations` | Student Migration | S | SOW 3.2.4 |
| `/ministry/budget-assets` | Budget and Asset Overview | P0 | SOW 3.2.5; Brief §23, §24 |
| `/ministry/budget/allocate` | Budget Allocation | S | SOW 3.2.5 |
| `/ministry/assets/allocate` | Asset Allocation | S | SOW 3.2.5 |
| `/ministry/reports` | Consolidated Reports | P0 | SOW 3.2.3, 3.2.6; Brief §33 |
| `/ministry/licenses` | License Applications Queue | S | SOW 4.2 |
| `/ministry/licenses/:id` | License Application Review | S | SOW 4.2; Brief §32.2 |
| `/ministry/verifiers` | Verifier Organizations | S | SOW 4.3, 4.4 |
| `/ministry/setup/institutions` | Institution Setup | S | SOW 3.2.1; Brief §15 |
| `/ministry/setup/categories` | Institution Categories | S | SOW 3.2.1 |
| `/ministry/setup/regions` | Divisions and Districts | S | Brief §4 |
| `/ministry/users` | User Management | P1 | SOW 3.2.2; Brief §16 |
| `/ministry/roles` | Roles and Permissions | P1 | SOW 3.2.2; Brief §16 |
| `/ministry/integrations` | Government Integration (MY GOV) | P2 | SOW 3.3.13; Brief §31 |
| `/ministry/notifications` | Notifications | S | Brief §36 |
| `/ministry/search` | Global Search Results | S | Brief §35 |
| `/ministry/profile` | My Profile | S | Brief §10 |
| `/ministry/access-denied` | Permission Denied | S | Brief §46 |

The notifications, search, profile and access-denied patterns are designed once in the Ministry workspace. Other workspaces use the same top-bar notification panel, search and profile menu.

#### Feature List by Page

##### `/ministry/dashboard` — Ministry Dashboard [Brief §11]
- **Scope bar:** All Bangladesh, plus filters for Division, District, Institution, Institution Type, Academic Session and Date Range. Changing the scope updates every widget.
- **Executive KPI cards (10):** Total Institutions, Total Students, Total Teachers, Today's Student Attendance, Today's Teacher Attendance, Active Admission Cycle, Budget Utilization, Assets / Equipment, Pending Approvals, Institutions Requiring Attention.
  - Each card shows the change against the previous period and links to its detail.
  - Labelled "Demo / Illustrative Data".
- **Hierarchy / geographic view:** Bangladesh map by division with a traffic-light status. Selecting a division opens `/ministry/divisions/:id`.
- **Institution performance / health:** ranking list with traffic-light status per indicator (attendance, result performance, reporting completeness, budget utilization, asset issues, teacher availability), a trend chart, and exception cards.
- **Action / Alert Center panel:** top alerts with issue, institution, responsible role, age/SLA, severity, and View / Take Action. "View all" opens `/ministry/alerts`.
- **Customize Dashboard** button opens a widget configuration drawer [SOW 3.2.3; TBD Q-02].
- KPI cards and detail tables use the same figures (Known Risk `kpi_data_integrity-001`).

##### `/ministry/divisions/:id` — Division Drill-down
- Breadcrumb: Ministry > [Division].
- The same widgets as the dashboard, scoped to the division.
- District breakdown table and map. Selecting a district opens `/ministry/districts/:id`.

##### `/ministry/districts/:id` — District Drill-down
- Breadcrumb: Ministry > [Division] > [District].
- District KPIs.
- Institution comparison table with traffic-light indicators. Selecting an institution opens `/ministry/institutions/:id`.

##### `/ministry/institutions` — Institution List
- Search, plus filters (division, district, type, status, health).
- Table: code, name, type, division, district, principal, students, teachers, today's attendance %, health status.
- Actions: View 360°, Export.

##### `/ministry/institutions/:id` — Institution 360° [Brief §14]
- **Header:** institution name, category, division, district, principal, status, academic session. Breadcrumb shows the full hierarchy path.
- **Tabs:**
  1. **Overview:** KPIs, alerts, pending service requests and approvals.
  2. **Students:** list linking to the student master record.
  3. **Teachers & Staff.**
  4. **Classes / Academics.**
  5. **Attendance:** today, by class, trend, low-attendance flags.
  6. **Results:** publication status by semester.
  7. **Finance:** allocated, used, remaining, utilization %.
  8. **Assets:** status counts, damaged/lost list.
  9. **Procurement:** labelled "Requires workflow confirmation".
  10. **Library.**
  11. **Leave / HR:** with an "Extended HRM — future" placeholder.
  12. **Certificates.**
  13. **Alumni.**
  14. **Reports.**
- Message banner for the demo: "One institution. One complete digital record." [Brief §43 step 5]

##### `/ministry/alerts` — Action / Alert Center [Brief §11.4]
- Filters: alert type (8 types), severity, division, district, institution, responsible role, age.
- Alert rows: issue, institution, responsible role, age/SLA, severity badge (label and icon), and View / Take Action.
- Example: "Student attendance below threshold" → View opens Institution 360° on the Attendance tab, filtered to the class.

##### `/ministry/attendance` — Live Attendance Monitor [SOW 3.3.5; Brief §20]
- View tabs: Today, Institution, Class, Teacher, Student, Trend.
- Live counters for students and teachers: Present, Absent, Late*, Leave*, Not Recorded / Pending Sync (*if approved, TBD Q-27).
- Low-attendance alert list.
- Drill-down by division, district and institution.
- A "Last updated" timestamp with a live indicator.

##### `/ministry/admissions` — Admission Overview [Brief §17]
- Active cycle card with the flow stepper (13 steps of Module 6), the current step highlighted.
- Funnel: applications, validated, tested, selected, allocated, admitted.
- Cycles table: name, session, status, dates, applications. "Create Cycle" button.
- Pending issues: missing documents, seats full, results awaiting publication.

##### `/ministry/admissions/cycles/:id` — Admission Cycle Detail and Flow
- Stepper: Setup → Eligibility → Seat/Quota → Open Application → Applications → Validation → Test → Result Processing → Result Published → Institution Allocation → Migration → Final Admission.
- Each step shows a status, counts and a link to its working page.

##### `/ministry/admissions/cycles/new` — Admission Cycle Setup [SOW 3.2.4]
- Form sections: Cycle details (name, session, dates), Eligibility rules, Seat quotas per institution/program, Required documents.
- Every rule field is labelled [TBD Q-01].

##### `/ministry/admissions/applications` — Applications and Validation
- Table: application number, applicant, choice(s), status, missing documents, eligibility flag.
- Detail drawer: documents with Validate / Request Correction / Mark Ineligible (#15).

##### `/ministry/admissions/results` — Result Publication and Institution Allocation
- Result processing status.
- "Publish Result" with a confirmation modal.
- Allocation table (applicant → allocated institution).
- Seat-full and multi-choice flags (#16, #18).
- "Correct Published Result" opens a correction with reason and a log entry (#17).

##### `/ministry/admissions/migrations` — Student Migration [SOW 3.2.4]
- Migration requests table: student, from-institution, to-institution, status.
- Detail drawer with an approval action [TBD Q-36].

##### `/ministry/budget-assets` — Budget and Asset Overview [Brief §23, §24]
- Budget KPIs: Allocated, Used, Remaining, Utilization %.
- Institution comparison chart and period comparison.
- Abnormal-utilization flags.
- Asset KPIs by status: In Use, Available, Unavailable, Damaged, Lost.
- Damaged/lost assets awaiting action.
- Buttons: "Allocate Budget" and "Allocate Assets".

##### `/ministry/budget/allocate` — Budget Allocation [SOW 3.2.5]
- Select institution, enter amount and period, add a note. An allocation history table shows additional allocations and revisions (#49, #52).

##### `/ministry/assets/allocate` — Asset Allocation [SOW 3.2.5]
- Select institution, enter asset details (name, category, quantity, identifiers). Allocation history.

##### `/ministry/reports` — Consolidated Reports [Brief §33]
- Report area selector (13 areas).
- Filters: date range, division, district, institution, institution type, academic session, status.
- Report table plus chart, and Export (format [TBD Q-15]).
- Message for the demo: "The same operational data becomes Ministry reporting data." [Brief §43 step 8]

##### `/ministry/licenses` — License Applications Queue (Phase 2) [SOW 4.2]
- Table: application number, applicant, submitted date, status, age.
- Filters: status, date.
- Duplicate flag (#83).

##### `/ministry/licenses/:id` — License Application Review
- Applicant information, documents viewer and validation checklist [TBD Q-24].
- Actions: Approve (issues a unique license number), Reject (reason required), Request Correction.
- Timeline and activity log.

##### `/ministry/verifiers` — Verifier Organizations (Phase 2) [SOW 4.3, 4.4]
- Table: organization, membership status, registered date, checks performed, payment status.
- Approve membership [TBD Q-13]. Activate or deactivate.

##### `/ministry/setup/institutions` — Institution Setup [SOW 3.2.1; Brief §15]
- Institution table with search and filters.
- Create/Edit drawer: name, code (unique), category, division, district, contact, programs, status, Institution Admin and Principal assignment.
- Duplicate and missing-region validation (#8, #9).
- Status change instead of delete. Activity log.

##### `/ministry/setup/categories` — Institution Categories [SOW 3.2.1]
- Category list with institution counts. Create/Edit; status change.

##### `/ministry/setup/regions` — Divisions and Districts [Brief §4]
- Division list with district sub-lists. Create/Edit; status. Seed source [TBD Q-20].

##### `/ministry/users` — User Management [SOW 3.2.2; Brief §16]
- Table: name, user ID, email/mobile, roles with scopes, status, last login.
- Filters: role, scope, status.
- Create User drawer with role assignments (role + scope, repeatable).
- Activate / Deactivate. Detail drawer with activity log.

##### `/ministry/roles` — Roles and Permissions [SOW 3.2.2; Brief §16]
- Role list.
- Permission matrix: modules × actions [Prototype placeholder: View, Create, Edit, Approve, Export] [TBD Q-25].
- Effective-access explainer: "User + Role + Module Permission + Data Scope".

##### `/ministry/integrations` — Government Integration (MY GOV) [SOW 3.3.13; Brief §31]
- Banner: "Government Integration Layer — Subject to API/use-case confirmation".
- Placeholder cards: Identity Verification, Certificate Registration, Government Service Integration.
- Status states: Available, Unavailable, Timeout, Data conflict (#93–#97).

##### `/ministry/notifications` — Notifications [Brief §36]
- Notification list with unread state, filters (All / Unread / type), mark-as-read, and click-through to the record. The unread badge supports 99+ (Known Risk `push_notification-001`).

##### `/ministry/search` — Global Search Results [Brief §35]
- Grouped results: Institutions, Students, Teachers, Assets, Applications, Certificates, Licenses, Reports. Empty state.

##### `/ministry/profile` — My Profile
- Name, contact, roles with scopes, change password, language preference.

##### `/ministry/access-denied` — Permission Denied [Brief §46, §38.1 #1]
- Message: "You don't have access to this division/district" with the user's own scope and a "Go to my dashboard" button.

### 6.3 Division Admin — `division`

#### Navigation Menu
Dashboard · Districts · Institutions · Live Attendance · Reports

#### Page Map

| Route | Page | Priority | Source |
|---|---|---|---|
| `/division/dashboard` | Division Dashboard | P1 | Brief §12 |
| `/division/districts/:id` | District View (within division) | P1 | Brief §12 |
| `/division/institutions/:id` | Institution 360° (division scope) | S | Brief §14 |
| `/division/reports` | Division Reports | S | SOW 3.2.3; Brief §12 |

#### Feature List by Page

##### `/division/dashboard` — Division Dashboard [Brief §12]
- Division summary KPIs.
- District breakdown (map and table).
- Institution list.
- Comparative performance.
- Attendance (live).
- Admissions.
- Results.
- Finance/assets summary.
- Pending actions [TBD Q-23].
- Reports shortcut.
- Breadcrumb: [Division]. Opening another division shows the permission-denied state.

##### `/division/districts/:id` — District View
- District KPIs and institution comparison. Selecting an institution opens `/division/institutions/:id`.

##### `/division/institutions/:id` — Institution 360°
- Same layout as the Ministry Institution 360°, read-only and scoped to the division [TBD Q-23].

##### `/division/reports` — Division Reports
- Same pattern as Consolidated Reports, with the division scope fixed.

### 6.4 District Admin — `district`

#### Navigation Menu
Dashboard · Institutions · Live Attendance · Reports

#### Page Map

| Route | Page | Priority | Source |
|---|---|---|---|
| `/district/dashboard` | District Dashboard | P1 | Brief §13 |
| `/district/institutions/:id` | Institution 360° (district scope) | S | Brief §14 |
| `/district/reports` | District Reports | S | SOW 3.2.3; Brief §13 |

#### Feature List by Page

##### `/district/dashboard` — District Dashboard [Brief §13]
- Institution count.
- Student/teacher summary.
- Attendance (live).
- Institution comparison table.
- Pending requests [TBD Q-23].
- Asset/budget summary.
- Admission/result status.
- Reports shortcut.
- Opening another district shows the permission-denied state.

##### `/district/institutions/:id` — Institution 360°
- Same layout, read-only and scoped to the district [TBD Q-23].

##### `/district/reports` — District Reports
- Consolidated Reports pattern with the district scope fixed.

### 6.5 Institution Admin — `institution-admin`

#### Navigation Menu
Dashboard · Reports

#### Page Map

| Route | Page | Priority | Source |
|---|---|---|---|
| `/institution/dashboard` | Institution Dashboard | S | Brief §9; SOW §5 |
| `/institution/reports` | Institution Reports | S | SOW §5 |

#### Feature List by Page

##### `/institution/dashboard` — Institution Dashboard
- Institution KPIs: students, teachers, today's attendance, pending approvals, budget utilization, asset issues.
- Alerts for the institution.
- Link to the Institution 360°-style tabs, read-only.
- Responsibilities beyond monitoring are [TBD Q-22].

##### `/institution/reports` — Institution Reports
- Consolidated Reports pattern with the institution scope fixed.

### 6.6 Principal — `principal`

#### Navigation Menu
1. Dashboard
2. Teachers
3. Students
4. Classes
5. Attendance
6. Results
7. Service Requests
8. Certificates
9. Alumni
10. Finance
11. Assets
12. Procurement
13. Library
14. Leave
15. Menu Access
16. Reports

#### Page Map

| Route | Page | Priority | Source |
|---|---|---|---|
| `/principal/dashboard` | Institution Management Dashboard | P0 (§42 #14 representative institution dashboard) | Brief §9, §42; SOW 3.3.1 |
| `/principal/teachers` | Teachers | S | SOW 3.3.2; Brief §18 |
| `/principal/teachers/:id` | Teacher Profile | S | Brief §18, §28 |
| `/principal/students` | Students | S | SOW 3.3.2; Brief §18 |
| `/principal/students/:id` | Student Master Record | S | Brief §18, §34.1, §45 |
| `/principal/classes` | Classes | S | SOW 3.3.3; Brief §19 |
| `/principal/attendance` | Institution Live Attendance | S | SOW 3.3.5; Brief §20 |
| `/principal/results` | Result Review and Publication | P1 | SOW 3.3.9; Brief §27 |
| `/principal/service-requests` | Service Request Approval Inbox | P0 | SOW 3.3.1, 3.3.4(1); Brief §22 |
| `/principal/service-requests/:id` | Service Request Review | P0 | Brief §22, §43 step 7 |
| `/principal/certificates` | Certificate Applications and Issuance | P1 | SOW 3.3.12; Brief §29 |
| `/principal/alumni` | Alumni Management | P1 | SOW 3.3.14; Brief §30 |
| `/principal/finance` | Finance and Budget Utilization | S | SOW 3.3.6; Brief §23 |
| `/principal/assets` | Asset Inventory | S | SOW 3.3.7; Brief §24 |
| `/principal/assets/:id` | Asset Detail and Movement History | S | SOW 3.3.7; Brief §24 |
| `/principal/procurement` | Procurement, PO, LC and Gate Pass | P1 | SOW 3.3.7; Brief §25 |
| `/principal/library` | Library Management | P1 | SOW 3.3.8; Brief §26 |
| `/principal/leave` | Leave Approvals and Balances | P1 | SOW 3.3.10; Brief §28 |
| `/principal/menu-access` | Role-Based Menu Access | P1 | SOW 3.3.11 |
| `/principal/reports` | Institution Reports | S | SOW §5 |

#### Feature List by Page

##### `/principal/dashboard` — Institution Management Dashboard
- **KPIs:** students, teachers, today's student and teacher attendance, pending approvals (service requests, leave, certificates), budget utilization, asset issues.
- **My Approvals queue:** top pending items with age, linking to the inboxes.
- **Alerts:** low attendance, classes without a teacher (#32), assets damaged or lost, overdue requests.
- **Quick actions:** Add Teacher, Create Class, Record Expense, Assign Asset.

##### `/principal/teachers` — Teachers [SOW 3.3.2]
- Table: name, ID, designation, assigned classes, today's attendance, status.
- "Add Teacher" drawer: name, contact, designation, joining date, subjects.
- Status change (transfer #31, inactive).

##### `/principal/teachers/:id` — Teacher Profile [Brief §18]
- Profile, assigned classes, content count, attendance history, results submitted, leave balance and history, activity log.
- "Extended HRM — future" placeholder: service history, appointment, promotion [Brief §28; TBD Q-05].

##### `/principal/students` — Students [SOW 3.3.2]
- Table: name, student ID, session, program, class, status (lifecycle), attendance %.
- Filters: session, program, status.
- "Allocated from admission" badge.
- "Change Institution Assignment" action with a reason, logged [SOW 3.3.2].

##### `/principal/students/:id` — Student Master Record [Brief §34.1, §45]
- Lifecycle stepper: Applicant → Selected → Admitted → Active → Graduated → Alumni.
- Tabs: Profile, Classes, Attendance, Results, Service Requests, Ledger, Certificate, History.
- Banner: "One record used across Admission, Class, Attendance, Result, Certificate and Alumni".
- Name/DOB mismatch with certificate flag (#23).

##### `/principal/classes` — Classes [SOW 3.3.3; Brief §19]
- Class table: name, course, teacher, students count, schedule, status.
- "Create Class" drawer and "Assign Teacher" with an overlap warning (#30).
- "No teacher assigned" flag (#32).

##### `/principal/attendance` — Institution Live Attendance [SOW 3.3.5]
- Today: classes with status (recorded / not recorded / pending sync), live student and teacher counts.
- Class drill-down.
- Correction requests, with conflicts flagged (#40).

##### `/principal/results` — Result Review and Publication [SOW 3.3.9; Brief §27]
- By semester and course: status (Draft / Under Review / Published), flags for missing or invalid marks.
- Review detail: marks table.
- Actions: Publish (with confirmation) and Return to Teacher.
- Post-publication correction requests with old/new values and reason [TBD Q-32].

##### `/principal/service-requests` — Service Request Approval Inbox [SOW 3.3.1, 3.3.4(1); Brief §22]
- Tabs by status: Submitted, Under Review, Correction Required, Approved, Rejected, Completed.
- Filters: service type (15), date, overdue.
- Rows: request number, student, service, submitted date, age vs SLA, status badge.

##### `/principal/service-requests/:id` — Service Request Review
- Student summary (linked to the master record).
- Service details, submitted form data and documents.
- Status timeline (approval stepper).
- Actions: Approve, Reject (reason required), Request Correction (note), Mark Completed.
- Activity log.
- The approval chain is shown as "Institution approver" [TBD Q-03].

##### `/principal/certificates` — Certificate Applications and Issuance [SOW 3.3.12; Brief §29]
- Applications table: student, program, applied date, status.
- Review detail: data comparison against the student profile with mismatches highlighted (#79).
- Actions: Approve and Issue (generates the unique reference number), Request Correction, Reject.
- Issued certificates list with history. Duplicate requests (#78) are linked from service requests.

##### `/principal/alumni` — Alumni Management [SOW 3.3.14; Brief §30]
- List of students eligible after the final result is published.
- Select students and choose "Mark as Alumni", with a confirmation modal explaining the access restriction.
- Outstanding library loan flag (#71).
- List of alumni with their current professional information.

##### `/principal/finance` — Finance and Budget Utilization [SOW 3.3.6; Brief §23]
- KPIs: Allocated (from Head Office), Used, Remaining, Utilization %.
- Expense table: what, where, when, amount, evidence status.
- "Record Expense" drawer with an evidence upload.
- Over-budget flag (#48) [TBD Q-37]. Duplicate warning (#50).
- Allocation history (#49, #52).

##### `/principal/assets` — Asset Inventory [SOW 3.3.7; Brief §24]
- Status KPI chips: In Use, Available, Unavailable, Damaged, Lost.
- Asset table: asset ID, name, category, status, current holder, location.
- Actions: Assign to Person, Return, Reassign, Report Damaged/Lost (reason required).
- An asset can have only one holder; the Assign action is disabled while an asset is assigned (#53).

##### `/principal/assets/:id` — Asset Detail and Movement History
- Asset details, current holder and status.
- Movement timeline: Received → Assigned → Returned/Reassigned → Damaged/Lost → Recovered.
- Gate pass entries. Reason fields.

##### `/principal/procurement` — Procurement, PO, LC and Gate Pass [SOW 3.3.7; Brief §25]
- Banner: "Requires detailed workflow confirmation" [TBD Q-04].
- Tabs: Procurement Requests, Purchase Orders, LC Documents, Receiving, Gate Pass.
- Generic flow stepper: Request → Review/Approval → PO → LC (if applicable) → Receive → Inventory update → Gate pass.
- States for rejected requests, cancelled POs, partial deliveries, missing documents, quantity mismatches, and approval chains that are not configured (#61–#66).

##### `/principal/library` — Library Management [SOW 3.3.8; Brief §26]
- Tabs: Catalogue (books and copies), Members, Issue/Return, Overdue, Fines, Reservations, Popular, Member History.
- "Issue Book": member search, copy selection, due date.
- "Return": condition check, fine calculation [TBD Q-09].
- No-copy-available state offers a reservation (#67).

##### `/principal/leave` — Leave Approvals and Balances [SOW 3.3.10]
- Pending leave requests: staff, type, dates, days, balance after.
- Actions: Approve, Reject (reason required).
- Overlap and insufficient-balance flags (#72, #73).
- Staff balance table by type (CL, SL, EL, others).
- Leave type configuration [TBD Q-08].

##### `/principal/menu-access` — Role-Based Menu Access [SOW 3.3.11]
- Pick a role (for example, Teacher or Student).
- A menu items checklist grouped by module.
- Save, with an activity log entry.
- Scope boundary note [TBD Q-25].

##### `/principal/reports` — Institution Reports
- Consolidated Reports pattern, scoped to the institution.

### 6.7 Teacher — `teacher`

#### Navigation Menu
Dashboard · My Classes · Attendance · Results · Leave · Library · Profile

#### Page Map

| Route | Page | Priority | Source |
|---|---|---|---|
| `/teacher/dashboard` | Teacher Workspace | P1 | Brief §9, §42 #18 |
| `/teacher/classes` | My Classes | S | SOW 3.3.3 |
| `/teacher/classes/:id` | Class Detail | S | SOW 3.3.3; Brief §19 |
| `/teacher/attendance` | Attendance Capture | P0 (§42 #8) | SOW 3.3.5; Brief §20 |
| `/teacher/results` | Result Entry | P1 | SOW 3.3.9; Brief §27 |
| `/teacher/leave` | My Leave | P1 | SOW 3.3.10; Brief §28 |
| `/teacher/library` | Library | S | SOW 3.3.8 |
| `/teacher/profile` | My Profile | S | Brief §18 |

#### Feature List by Page

##### `/teacher/dashboard` — Teacher Workspace
- Today's classes with an attendance status per class (taken / not taken).
- "Mark my attendance" card [TBD Q-26].
- Results pending entry, leave balance, notices, library loans.

##### `/teacher/classes` — My Classes
- Class cards: course, schedule, student count, content count.

##### `/teacher/classes/:id` — Class Detail [SOW 3.3.3]
- Tabs: Students (with "Assign Students" from the institution list), Content, Attendance, Results.
- Content upload with versions: "Replace" keeps the previous version in history (#34).

##### `/teacher/attendance` — Attendance Capture [SOW 3.3.5; Brief §20]
- Class and session selector.
- Mode toggle: "Teacher marks" or "Open student self-capture" with a time window [TBD Q-26].
- Student roster with status buttons: Present, Absent, Late*, Leave* (*TBD Q-27).
- Submit.
- Status banners: Recorded, Pending Sync (offline, #39), Late entry (#36).
- "Correct attendance" with a required reason, logged (#38).
- Own attendance card.

##### `/teacher/results` — Result Entry [SOW 3.3.9; Brief §27]
- Semester and course selector, and a marks table per student.
- Inline validation for missing or invalid marks (#41, #42). Calculated totals and grades [TBD Q-40].
- Actions: Save Draft and Submit for Review.
- Status of published results, and a correction request for post-publication changes (#45).

##### `/teacher/leave` — My Leave [SOW 3.3.10]
- Balance cards (CL, SL, EL, others).
- "Apply for Leave" form: type, dates, reason.
- Blocking messages for insufficient balance and overlaps (#72, #73).
- Requests list with status. Withdraw a pending request (#74).

##### `/teacher/library` — Library
- Catalogue search, my loans with due dates, fines.

##### `/teacher/profile` — My Profile
- Profile information, assigned classes, change password, language preference.

### 6.8 Student — `student`

#### Navigation Menu
1. Home
2. Classes
3. Attendance
4. Results
5. Services
6. My Requests
7. Payments & Ledger
8. Advising
9. Teaching Evaluation
10. Academics (Curriculum, Code of Conduct, Calendar)
11. Library
12. Certificate
13. Profile

#### Page Map

| Route | Page | Priority | Source |
|---|---|---|---|
| `/student/home` | Student Portal Home | P0 (§42 #15) | SOW 3.3.4; Brief §21 |
| `/student/classes` | My Classes and Content | S | SOW 3.3.4 |
| `/student/attendance` | My Attendance | S | SOW 3.3.4, 3.3.5 |
| `/student/results` | Results and Grade Table | S | SOW 3.3.4, 3.3.9 |
| `/student/services` | Online Services Catalogue | P0 (§42 #10) | SOW 3.3.4(1); Brief §22 |
| `/student/services/:service/apply` | Service Application | P0 (§42 #10) | Brief §22 |
| `/student/requests` | My Requests | P0 (§42 #10) | Brief §22 |
| `/student/requests/:id` | Request Detail and Tracking | P0 (§42 #10) | Brief §22, §43 step 7 |
| `/student/payments` | Fees, Payments and Student Ledger | S | SOW 3.3.4, 3.3.4(1) |
| `/student/advising` | Advising Table | S | SOW 3.3.4 |
| `/student/evaluation` | Teaching Evaluation | S | SOW 3.3.4 |
| `/student/academics` | Curriculum, Code of Conduct and Academic Calendar | S | SOW 3.3.4 |
| `/student/library` | Library | S | SOW 3.3.8 |
| `/student/certificate` | Certificate Application and Status | P1 | SOW 3.3.12; Brief §29 |
| `/student/profile` | My Profile | S | SOW 3.3.4 |

#### Feature List by Page

##### `/student/home` — Student Portal Home [Brief §21]
- **Priority widgets:** Today's Classes, Attendance summary, Latest Results, Pending Applications (with status badges), Notices, Fees / Payment due, Academic Calendar (next dates), Profile card.
- **Secondary links:** Grade Table, Advising, Teaching Evaluation, Curriculum, Code of Conduct, Certificate.
- **Mobile-first layout** [Brief §40.5].

##### `/student/classes` — My Classes and Content
- Assigned classes with teacher, schedule and a content list (downloadable materials).

##### `/student/attendance` — My Attendance
- Attendance % by class, a daily calendar with statuses.
- "Mark attendance" button when the teacher opens self-capture [SOW 3.3.5; TBD Q-26].

##### `/student/results` — Results and Grade Table
- Semester selector; results with published date.
- Grade table across semesters.
- Correction notice when a result was corrected (#45). Incomplete result state (#46).

##### `/student/services` — Online Services Catalogue [Brief §22]
- Search and category grouping for the 15 service cards.
- Each card shows eligibility, required documents, fee where applicable, expected processing time, and a "Start Application" button. Values are [TBD Q-03].

##### `/student/services/:service/apply` — Service Application
- A generic multi-step form: Details → Documents → Fee (if applicable) → Review → Submit.
- Save as Draft.
- Upload limits shown.
- On submit: request number and a link to tracking.
- Individual forms for each service are P2 [Brief §42].

##### `/student/requests` — My Requests
- List with service, request number, submitted date, status badge and next action.
- Filters: status, service.

##### `/student/requests/:id` — Request Detail and Tracking
- Status timeline: Draft → Submitted → Under Review → Correction Required → Approved / Rejected → Completed, with who and when for each step.
- Correction note with "Edit and Resubmit".
- Rejection reason.
- Download output when Completed.
- Message for the demo: "Every request is trackable." [Brief §43 step 7]

##### `/student/payments` — Fees, Payments and Student Ledger [SOW 3.3.4, 3.3.4(1)]
- Fees due, "Pay Online" (gateway [TBD Q-12]).
- Payment states: Pending, Success, Failed with retry (#90). Duplicate payment warning (#91).
- Student Ledger table of academic and financial transactions [TBD Q-47].

##### `/student/advising` — Advising Table [SOW 3.3.4]
- Assigned advisor, advising notes by date.
- Course advising and pre-registration references [TBD Q-21].

##### `/student/evaluation` — Teaching Evaluation [SOW 3.3.4]
- List of teachers and courses to evaluate, an evaluation form, and a submitted state. Questions, anonymity and timing are [TBD Q-48].

##### `/student/academics` — Curriculum, Code of Conduct and Academic Calendar [SOW 3.3.4]
- Tabs: Curriculum Analysis [TBD Q-38], Code of Conduct (document view), Academic Calendar (month and list views).

##### `/student/library` — Library [SOW 3.3.8]
- Catalogue search with availability, my loans with due dates, reservations, fines.

##### `/student/certificate` — Certificate Application and Status [SOW 3.3.12; Brief §29]
- Eligibility status.
- "Apply for Certificate" is disabled with a reason when the student is not eligible (#77).
- Application status timeline.
- Issued certificate with its unique reference number.
- Correction request (#80).

##### `/student/profile` — My Profile [SOW 3.3.4]
- Editable profile fields.
- The lock or propagation rule for certificate-linked fields is shown as [TBD Q-07] (#22, #81).

### 6.9 Alumni — `alumni`

#### Navigation Menu
Alumni Profile · Notices

#### Page Map

| Route | Page | Priority | Source |
|---|---|---|---|
| `/alumni/home` | Alumni Workspace — Professional Profile | P1 (§42 #21) | SOW 3.3.14; Brief §30 |

#### Feature List by Page

##### `/alumni/home` — Alumni Workspace [SOW 3.3.14; Brief §30]
- Alumni identity card: name, institution, program, graduation session.
- Editable professional information: current profession/job, position, LinkedIn profile link, other approved professional information.
- Save with confirmation.
- A notice that student functions are no longer available. Opening them shows the permission-denied state (#29).
- Access to transcripts and certificates after alumni marking is [TBD Q-44].

### 6.10 Third-Party Organization (Verifier) — `verifier`

#### Navigation Menu
Dashboard · Verify · Payments · Organization Profile

#### Page Map

| Route | Page | Priority | Source |
|---|---|---|---|
| `/verifier/dashboard` | Verification Workspace | S | Brief §9, §32.3 |
| `/verifier/verify` | License / Certificate Verification | P0 (§42 #13) | SOW 4.3, 4.4; Brief §32.3, §32.4, §43 step 9 |
| `/verifier/payments` | Payments and Membership | S | SOW 4.4; Brief §32.5 |
| `/verifier/profile` | Organization Profile | S | SOW 4.3 |

#### Feature List by Page

##### `/verifier/dashboard` — Verification Workspace
- Membership status card (Active / Pending approval / Inactive).
- Payment or plan status (pricing TBD).
- "Verify now" call to action.
- Recent checks list [TBD Q-11].

##### `/verifier/verify` — License / Certificate Verification [SOW 4.3; Brief §32.4]
- Input: license/certificate number, then Verify. Requires active membership and completed payment [SOW 4.4].
- **Result card states:**
  - **Valid:** holder name, number, issue date, issuing authority. Field list [TBD Q-16].
  - **Invalid / Not Found:** with "check the number" guidance (#86, #88).
  - **Expired / Suspended:** shown greyed out and labelled "if rules are introduced" [TBD Q-14].
- **Blocked states:** membership inactive (#92), payment required.
- Message for the demo: "Education, certification and professional trust can exist within one connected ecosystem." [Brief §43 step 9]

##### `/verifier/payments` — Payments and Membership [SOW 4.4; Brief §32.5]
- Generic payment step with "Pricing: TBD" (per check / subscription / both) [TBD Q-11].
- Payment states: Pending, Success, Failed. Duplicate warning.
- "Payment received — updating" state (#89).
- Payment history and invoices [TBD Q-11].

##### `/verifier/profile` — Organization Profile
- Organization details, contact person, users, change password.

---

## 7. Known Risks (from the pipeline bug-pattern library)

High-frequency patterns that apply to these screens. Prototypes and later builds must follow the prevention specs.

| Risk ID | Applies to | Prevention spec (summary) |
|---|---|---|
| `stub_button-001` (15×) | All pages | Every button and link does something or goes somewhere. No `href="#"`. Unbuilt targets are disabled and labelled "Coming soon". |
| `rbac_ui-001` (7×), `rbac-001` (8×) | All workspaces, Users & Roles, Menu Access | Menus and buttons are not rendered for roles without permission. Server responses for out-of-scope requests show the permission-denied state. |
| `kpi_data_integrity-001` (5×) | Ministry, Division, District, Principal dashboards; Public Dashboard | KPI cards and their detail tables come from the same dataset and match. |
| `admin_dashboard-001` (6×) | All admin lists and reports | The "All" filter returns every status. Statistics include zero-value statuses. |
| `list_pagination-001` / `-002` | All tables | Pagination with total count. Filters persist when drawers reopen. A clear-filters action is provided. |
| `search_filter-001` (6×) | Directory, global search, all lists | Search is debounced and shows an empty-state UI for zero results. |
| `form_input-001` (7×) | All forms | Real-time field validation with specific messages. Submit buttons stay clickable and show errors. |
| `file_upload-002` (5×), `stub_button-002` (8×) | Admission application, service application, LC upload, expense evidence, class content, license application | Allowed formats and maximum size are stated before upload. The upload control opens a file picker and shows progress and errors. |
| `auth-001` (5×), `auth-002` (10×), `auth-004` (6×) | Login, Forgot Password | One "session expired" message. Clickable login with specific errors. Password rules shown inline. |
| `payment-001` (7×) | Student payments, Verifier payments | Payment status refreshes after completion. Pending, success and failure states are clear (#89). |
| `push_notification-001` (8×) | Notification panel | The unread count is resynced when the panel opens. Badges show 99+. |
| `realtime-001` (5×) | Live Attendance | The live indicator shows connection state. It reconnects and shows "last updated". |
| `accessibility-001` to `-003` | All pages | Visible focus ring, `aria-label` on nav and icon buttons, focus trap in modals, real `<button>` and `<a>` elements. |
| `responsive-001` (5×) | Authenticated layout | Sidebar is fixed on large screens, icon-only or overlay on tablet and mobile, with a toggle. |
| `truncation-001` (5×) | Tables and cards | Truncated text has a tooltip with the full text. |
| `ui_naming-001` (5×), `ui_layout-002` (10×) | All pages | Labels for the same entity are identical everywhere (for example, "Student ID", status names). All text comes from one bilingual string source. |

---

## 8. Tech Stack

### 8.1 Current Deliverable — HTML Prototypes

| Layer | Technology | Purpose |
|---|---|---|
| Markup | Static HTML5 pages, one file per page, in role folders `.claude-project/design/html/<role>/` | Clickable prototypes [pipeline P3] |
| Styling | Tailwind CSS with design tokens from `DESIGN_SYSTEM.md` | Consistent design system [design phase rules] |
| Icons | Lucide / inline SVG | No emoji icons [design phase rules] |
| Charts and map | Static SVG charts and a Bangladesh map illustration | Dashboard storytelling. All figures labelled "Demo / Illustrative Data" |
| Data | Hard-coded demo data inside the prototype pages only | No backend in this engagement |

### 8.2 Target Implementation Stack (for the later build; pipeline default, client confirmation [TBD Q-49])

Architecture: a monorepo with a NestJS API and a React web app serving the public website and all role workspaces.

```text
textile_hrm/
├── backend/    ← NestJS API (RBAC + data scope, modules per §3)
└── frontend/   ← React web app (public site + role workspaces)
```

| Layer | Technology | Purpose |
|---|---|---|
| Backend | NestJS (TypeScript) | API server: four-layer Controller → Service → Repository → Entity [nestjs rules] |
| ORM / Database | TypeORM / PostgreSQL | UUID keys, soft delete (matches the no-deletion rule, Brief §34.3) |
| Auth | JWT in httpOnly cookies, role + scope guards | RBAC with data scope (§2) |
| Real-time | WebSocket gateway (Socket.io) | Live attendance and in-app notifications [backend rule B7] |
| File storage | Storage adapter (S3-compatible or local) | Application documents, LC documents, expense evidence, class content |
| Frontend | React + React Router 7 + Vite + TypeScript (strict) | Web app [react rules] |
| UI | Tailwind CSS v4 + shadcn/ui | Components and tokens |
| State | Redux Toolkit (async thunks) | Server and global state |
| Forms | react-hook-form + zod | Validation |
| i18n | react-i18next (bn, en) | Bangla and English [Brief §40.3] |

### 8.3 Third-Party Integrations

| Service | Purpose | Status |
|---|---|---|
| MY GOV API | Identity verification, certificate registration or another service | [TBD Q-06] |
| Payment gateway | Student fees and verifier payments | [TBD Q-12] |
| SMS / Email | Notifications, password reset, credentials | [TBD Q-18] |
| Map rendering | Institution network map | Library and data source [TBD Q-49] |
| Existing Ministry systems (e.g., TERP) | Data migration and integration | [TBD Q-19] |

### 8.4 Key Decisions

| Decision | Rationale |
|---|---|
| One master record per entity | Single Source of Truth [Brief §34.1] |
| Status-based retention, no hard delete for records with history | Traceability [Brief §34.3] |
| Configurable hierarchy master data | Protects against administrative remapping [Brief §4] |
| Scope-aware RBAC (role + permission + scope) | Jurisdiction isolation [SOW 3.1.1; Brief §16] |
| Bilingual from the start | Government audience [Brief §40.3] |
| Activity log on important records | Accountability [Brief §34.2] |

### 8.5 Environment Variables (planned, for the later build)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection |
| `JWT_SECRET`, `JWT_EXPIRES_IN`, `REFRESH_TOKEN_EXPIRES_IN` | Authentication |
| `FRONTEND_URL` | CORS and links in notifications |
| `STORAGE_DRIVER`, `STORAGE_BUCKET`, `STORAGE_BASE_URL` | Document storage |
| `PAYMENT_GATEWAY_*` | Payment gateway credentials [TBD Q-12] |
| `MYGOV_API_URL`, `MYGOV_API_KEY` | Government integration [TBD Q-06] |
| `SMTP_*`, `SMS_*` | Notification channels [TBD Q-18] |
| `VITE_API_URL` | Frontend API base URL |
| `VITE_DEFAULT_LOCALE` | Default language [TBD Q-29] |

---

## 9. Open Questions (Client Confirmation Required)

Status for all questions: ⏳ Open. Owner: Client (Ministry), with PM to follow up. Sources: SOW §6 (13 items), Brief §44 (23 items), and items found while writing this PRD [Review].

### 9.1 Required Clarifications (block final design decisions)

| # | Question | Context / Impact | Source | Prototype placeholder |
|:-:|---|---|---|---|
| Q-01 | What are the admission eligibility rules, quota types and required documents, and who validates applications? | Admission setup form and validation step | SOW §6; Brief §44 #1 | Fields labelled TBD |
| Q-02 | Which KPIs appear on the Ministry and other dashboards? What are the customization rules, alert thresholds, severity levels and alert actions? | Every dashboard and the alert center | SOW §6; Brief §44 #2, #11 | 10 Brief KPIs, High/Medium/Low severity, "Notify Principal" |
| Q-03 | What is the approval chain for each of the 15 student services: approver roles, steps, fees, documents, processing time and SLA? | Service catalogue, approval inbox, overdue alerts | Brief §44 #3; [Review] | Single "Institution approver" step (Principal) |
| Q-04 | What are the workflows for Procurement, LC, PO and Gate Pass: approval chain, responsible roles and required fields? | Procurement module | SOW §6; Brief §44 #4–#7 | Generic flow with a "Requires workflow confirmation" banner |
| Q-05 | What is the full staff HRM scope beyond leave (staff profile, service history, appointment, promotion)? | "HRM" in the product name; staff screens | SOW 3.3.10, §6; Brief §44 #8 | "Extended HRM — future" placeholders |
| Q-06 | What is the purpose of the MY GOV API integration? | Integration layer and any identity or certificate steps | SOW 3.3.13, §6; Brief §44 #9 | Placeholder integration page |
| Q-07 | Profile vs. certificate ("As Certificate follow"): (a) lock profile fields after a certificate is issued, or (b) propagate profile edits to the certificate? | Student profile edit rules | SOW §6; Brief §44 #10 | Fields marked "rule TBD" |
| Q-10 | How do Phase 1 certificates relate to Phase 2 licenses? Does a graduate certificate feed the license application, and does verification cover institution certificates? | License form and verification scope | SOW §6; Brief §44 #14 | Verification covers "license / certificate number" |
| Q-11 | What is the verification pricing model (per check, subscription or both), and how does invoicing work? | Verifier payment flow | SOW 4.4, §6; Brief §44 #15 | "Pricing: TBD" |
| Q-12 | Which payment gateway is used for student fees and verifier payments? | Payment screens | SOW 4.4; Brief §44 #16 | Generic payment step |
| Q-13 | Do third-party organizations need manual approval before membership is active? | Verifier registration | Brief §44 #17 | Shows "Pending approval or Active" |
| Q-14 | What are the license expiry, renewal and suspension rules? | License status and verification results | Brief §44 #18 | Expired/Suspended greyed "if introduced" |
| Q-16 | Which data can be public (public dashboard indicators, results, a free verification lookup), and which personal fields does a verification result show? | Public pages and verification result | Brief §44 #20; SOW 4.4 vs Brief §8 S6 | Aggregates only; verification behind membership |
| Q-17 | Can one user hold multiple roles or scopes, and if so, is there a workspace selector after login or a default role with a switcher? | Login routing | Brief §9, §44 #21 | Both selector and switcher shown |
| Q-18 | Which notification channels (in-app, SMS, email) are used, including for password reset and credential delivery? | Notifications, Forgot Password | Brief §44 #22 | In-app only |
| Q-19 | What is the approach to data migration and integration with existing Ministry systems (e.g., TERP)? | Positioning; later build | Brief §6.5, §44 #23 | Not shown |
| Q-22 | How are responsibilities split between the Institution Admin and the Principal? Is the Institution Admin a different person? | Institution workspaces | [Review] SOW 3.1.1 vs 3.3.1 | Institution Admin = monitoring; Principal = operations |
| Q-23 | Do Division and District Admins only monitor, or can they also approve or manage? What are their "pending actions"? | Division and District dashboards | [Review] Brief §12, §13 | Read-only drill-down with a pending-actions list |
| Q-24 | Who reviews license applications (Ministry Super Admin or a dedicated license-officer role), and what are the validation criteria? | License review | [Review] SOW 4.2 | Ministry workspace, criteria TBD |
| Q-25 | Who owns permissions? Can the Principal create roles, or only toggle menus for existing roles? What is the final permission/action list? | Roles & Permissions, Menu Access | [Review] SOW 3.2.2 vs 3.3.11 | Module × (View, Create, Edit, Approve, Export) |
| Q-26 | How is real-time attendance captured for students and teachers (manual roll call, QR, device, geofenced mobile)? | Attendance capture UI | [Review] SOW 3.3.5; Brief §20 | Teacher-marks and student self-capture modes |

### 9.2 Recommended Clarifications

| # | Question | Context / Impact | Source |
|:-:|---|---|---|
| Q-08 | What are the leave types beyond CL/SL/EL, and the yearly quota and accrual rules? | Leave balances | SOW §6; Brief §44 #12 |
| Q-09 | Which library rules apply beyond the standard features (loan periods, fine rates, reservations)? Please sign off the proposed set in Module 16. | Library | SOW 3.3.8, §6; Brief §44 #13 |
| Q-15 | Are there report approval or submission requirements? Which export formats are needed? | Reports | Brief §44 #19 |
| Q-20 | Are divisions and districts seeded from the official government administrative regions? They are designed as configurable master data. | Region master data | SOW §6; Brief §4 |
| Q-21 | Are Registration History, Pre-Registration and Course Advising Table separate features, or covered by the Advising Table and Academic Calendar? | Student portal navigation | SOW §6 |
| Q-27 | Are "Late" and "Leave" attendance statuses approved? | Attendance statuses | Brief §20 |
| Q-28 | Who publishes notices, circulars and resources, and at which levels? | Notices and Resources content management (no admin page designed yet) | [Review] Brief §8 S9 |
| Q-29 | What are the verified figures for public KPIs, and what is the default language (Bangla or English)? | Landing and Public Dashboard; locale | Brief §8 S2, §40.3 |
| Q-30 | What does "PVC" mean in "PVC & Transcript"? | Service catalogue text | [Review] SOW 3.3.4(1) |
| Q-31 | Is "Online Payment (Fees)" a request that needs approval, or a direct payment? | Services catalogue | [Review] SOW 3.3.4(1) |
| Q-32 | Who reviews and publishes semester results (Principal or an exam committee)? | Result workflow | [Review] Brief §27 |
| Q-33 | How is an institution allocated when a student qualifies for several choices (merit, preference order)? | Admission allocation | Brief §38.3 #18 |
| Q-34 | When a user's role changes with requests still pending, who takes over the pending items? | Approval continuity | Brief §38.1 #7 |
| Q-35 | Can issued certificates be revoked or cancelled? | Certificate status | Brief §38.13 #82 |
| Q-36 | Who initiates and approves student migration between institutions? | Migration page | [Review] SOW 3.2.4 |
| Q-37 | Does an expense above the available budget get blocked, or only warned about? | Finance | Brief §38.8 #48 |
| Q-38 | What does "Curriculum Analysis" contain? | Student academics page | [Review] SOW 3.3.4 |
| Q-39 | How does an admission applicant sign in or register, and does a public application use an application number? | Admission application and tracking | [Review] SOW 3.2.4; Brief §8 S8 |
| Q-40 | What are the grading scale, result calculation rules and retake policy? | Result entry and grade table | [Review] SOW 3.3.9; Brief §38.7 #47 |
| Q-41 | Who operates the library desk (Principal, a librarian role, a teacher)? | Library permissions | [Review] SOW §5 |
| Q-42 | Who approves asset transfers between institutions? | Asset transfer | Brief §38.9 #55 |
| Q-43 | What are the project timeline and the prototype presentation date? | Planning | [Review] |
| Q-44 | After alumni marking, can the user still request transcripts or certificates? How are outstanding library loans or fines handled? | Alumni restrictions | [Review] SOW 3.3.14; Brief §38.11 #71 |
| Q-45 | Who approves the Principal's own leave, and who delegates when an approver is unavailable? | Leave workflow | Brief §38.12 #75 |
| Q-46 | Is there a support ticket route? What content goes in Privacy, Terms and Accessibility? | Help and Policies pages | Brief §8 S11, S12 |
| Q-47 | What is the student fee structure, and which transactions does the Student Ledger contain? | Payments and Ledger | [Review] SOW 3.3.4 |
| Q-48 | For Teaching Evaluation: what questions, is it anonymous, when does it open, and who sees the results? | Evaluation page | [Review] SOW 3.3.4 |
| Q-49 | Confirm the implementation stack and hosting (government data center vs cloud), and the map library and data source. | Later build | [Review] |

---

## 10. Source Notes and Feature Change Log

### Source Notes
- The Brief names its source as `Core_Features_Textile_Institution_Management_System.docx` [Brief §2]. This PRD treats that document as equivalent to the SOW v2 PDF supplied. Confirm that there are no differences.
- **SOW cross-reference error:** §3.2.5 says "see Section 3.3.10 for institution-level asset tracking". Asset tracking is §3.3.7, and §3.3.10 is Leave Management.
- **SOW version label:** the file is named "v2", but the document header says "Draft v1.1".
- **SOW hierarchy:** §3.1 says access cascades through "five tiers", but item 5 ("Other Institution(s)") describes a District Admin overseeing several institutions; it is not a role. This PRD uses four administrative roles plus the institution roles.
- **SOW and Brief conflict on verification:** the Brief lists certificate/license verification as a public service, while the SOW requires third-party payment before checks. The SOW is followed, and free public lookup is Q-16.

### Feature Change Log

#### Version 1.0 (2026-10-14)

| Change Type | Before | After | Source |
|---|---|---|---|
| **Initial PRD** | — | All modules, pages and open questions | SOW v2 (Draft v1.1); Prototype Requirements & Research Brief |
