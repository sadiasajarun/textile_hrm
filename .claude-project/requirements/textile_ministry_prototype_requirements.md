# Textile Institution Management System
## UI/UX Prototype Requirements & Research Brief

**Client / Domain:** Ministry of Textiles and Jute, Bangladesh  
**Prototype Purpose:** Design a ministry-level centralized digital platform for management of textile institutions and professional license verification.  
**Primary Product Principle:** **Single Source of Truth** — institution, student, teacher, academic, finance, asset, attendance, certificate, alumni, and license information should be managed from one connected platform instead of disconnected records and repeated reporting.

---

# 1. Why This Product Should Exist

The prototype should not feel like only an HRM or student management application.

It should communicate a bigger ministry-level purpose:

> **One centralized platform through which the Ministry can monitor, manage, and make decisions across all textile institutions, while each authorized level works only with the data and services relevant to them.**

The platform should help the Ministry move from fragmented/manual reporting toward:

- one trusted institution database;
- standardized workflows across institutions;
- real-time or near-real-time visibility;
- faster approvals and service delivery;
- institution-wise accountability;
- hierarchy-based monitoring;
- consolidated reporting;
- traceable actions and decisions;
- easier citizen/student access to public information and services;
- digital verification of certificates/licenses.

### Suggested pitch line

> **From Institution Data to Ministry Decisions — One Connected Textile Education Platform.**

Alternative:

> **One Ministry. One Platform. Every Textile Institution Connected.**

---

# 2. Scope Source

The prototype must follow the approved SOW/core feature requirement as the primary source of truth.

The supplied scope defines two phases:

1. **Phase 1 — Textile Institution HRM & Institution Management**
2. **Phase 2 — Professional License Verification**

The system is expected to cover central administration, RBAC, dashboards/reporting, admission, teachers/students, academic management, attendance, student online services, finance, budget, assets, library, leave/HRM, certification, government API integration, alumni, and professional license verification.

**Source file:** `Core_Features_Textile_Institution_Management_System.docx`

---

# 3. Prototype Boundary

## 3.1 What This Prototype IS

A prototype for a **centralized Textile Ministry institution-management ecosystem**.

It should include:

- public-facing website;
- common login entry;
- role-based authenticated dashboards;
- ministry-level monitoring;
- hierarchy drill-down;
- institution-level operations;
- teacher/student experiences;
- student service workflows;
- professional license verification;
- reports and decision-support experience.

## 3.2 What This Prototype IS NOT

It is not necessary to recreate every form and every field of every module.

The prototype should prove:

1. **How the ecosystem works**
2. **How the hierarchy works**
3. **How data flows upward to the Ministry**
4. **How actions flow downward / through approvals**
5. **How the Ministry gets value from centralized information**
6. **How public users find information and services**
7. **How internal users perform their role-specific work**
8. **How edge cases and status changes are handled**

---

# 4. Main Information Architecture

The prototype should follow the hierarchy stated in the requirement:

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
Teacher    Student
```

### Important implementation/design note

The SOW hierarchy remains the prototype source of truth.

However, **Division, District, Institution Type, Institution, Role, and reporting relationship should be configurable master data**, not hard-coded. This protects the product if the Ministry later changes administrative mappings.

---

# 5. Product Experience Model

The platform should feel like two connected layers.

```text
PUBLIC WEBSITE
│
├── Public information
├── Institution directory
├── Public dashboard
├── Notices
├── Admissions information/results
├── Public services
├── Certificate / license verification
├── Help / guides
└── Login
       │
       ▼
AUTHENTICATED PLATFORM
│
├── Ministry dashboard
├── Division dashboard
├── District dashboard
├── Institution workspace
├── Principal workspace
├── Teacher workspace
├── Student portal
└── License administration / third-party portal
```

---

# 6. UI/UX Inspiration Systems

The following products should be used as **research references**, not copied visually.

## 6.1 IPEMIS

**Link:** https://ipemis.dpe.gov.bd/

### Useful ideas to borrow

- strong public landing page;
- large system statistics;
- public dashboard;
- clear explanation of why the platform exists;
- public data repository;
- institution/service search;
- help desk;
- video tutorials;
- downloadable user guides;
- FAQ;
- separate login;
- accessibility controls;
- public and authenticated experiences connected from one ecosystem.

### Why it matters

IPEMIS demonstrates how a ministry/directorate-level platform can expose useful aggregated information publicly while keeping operational functions behind authentication.

---

## 6.2 BIDA One Stop Service / Quick Service

**Link:** https://bidaquickserv.org/

### Useful ideas to borrow

- single-entry service portal;
- clear service categories;
- user/application status tracking;
- centralized application processing;
- progress/status visibility;
- public service performance information;
- dashboard approach;
- one-stop-service concept;
- help/support;
- documents and user manuals.

### Why it matters

The BIDA model is useful for designing student requests, approvals, license applications, third-party verification, and status tracking.

---

## 6.3 Education Management Information System — EMIS

**Link:** https://apps.emis.gov.bd/portal

### Useful ideas to borrow

- system statistics on the landing page;
- module cards;
- institute directory;
- public institute search;
- notices;
- common login;
- multiple user categories;
- HRM and institution-profile concepts;
- simple service/module discovery.

### Why it matters

EMIS is useful for understanding how education-sector public information and authenticated management modules can sit inside one platform.

---

## 6.4 BTEB eSheba

**Link:** https://btebesheba.gov.bd/

### Useful ideas to borrow

- services grouped by user type;
- service search;
- student/guardian/institution pathways;
- certificate verification;
- results;
- institution login;
- application tracking;
- payment guidance;
- step-by-step process explanation;
- notices;
- FAQ and helpdesk.

### Why it matters

This is a strong reference for the public service side of the proposed platform.

---

## 6.5 Official Textile Ministry / Department Sources

**Ministry of Textiles and Jute:**  
https://motj.gov.bd/

**Department of Textiles:**  
https://dot.gov.bd/

### Existing digital-service context

The Department of Textiles publicly lists **Textile Education And Resource Planning (TERP)** among its digital services.

Reference:  
https://dot.gov.bd/

The Ministry also has a Central Service Dashboard listing multiple ministry/department digital systems.

Reference:  
https://motj.gov.bd/pages/static-pages/694032cd35ce18e1c0562afc

### Prototype implication

Do **not** position the prototype as “the first-ever digital textile system.”

Position it as a **unified, modern, ministry-level management and decision platform** that can become the single source of truth and can later integrate/migrate existing services as required.

---

# 7. Public Website Requirements

The landing website should be useful even before login.

It should provide publicly appropriate information while keeping sensitive institutional and personal information private.

## 7.1 Header / Navigation

Recommended navigation:

- Home
- About
- Institutions
- Public Dashboard
- Admissions
- Services
- Notices
- Results / Verification
- Resources
- Help & Support
- Login
- বাংলা / English

### Optional

- Accessibility tools
- Search

---

# 8. Landing Page Structure

## Section 1 — Hero

### Purpose

Immediately explain the system.

### Suggested headline

> **Connecting Bangladesh's Textile Institutions Through One Digital Platform**

Supporting line:

> Centralized institution management, academic services, real-time monitoring, reporting, and professional verification for the Ministry of Textiles and Jute.

Primary CTA:

**Explore Institutions**

Secondary CTA:

**View Public Dashboard**

Utility CTA:

**Login**

### Visual direction

Use a clean government-tech visual rather than a generic education stock image.

Possible visual:

- Bangladesh map;
- connected institution nodes;
- ministry → division → district → institution data flow;
- subtle textile-pattern visual language.

---

## Section 2 — Textile Education at a Glance

Large KPI cards.

Examples:

- Engineering Colleges
- Textile Institutes
- Textile Vocational Institutes
- Students
- Teachers
- Active Institutions

### Important

Only use verified numbers in the final ministry presentation.

Until confirmed, prototype figures must be labelled:

> **Demo / Illustrative Data**

---

## Section 3 — Why the Platform Exists

Show the transformation:

```text
Before
Different institutional records
Manual consolidation
Delayed reporting
Limited cross-institution visibility
Repeated data entry

        ↓

Centralized Platform

        ↓

One source of truth
Live monitoring
Standardized workflow
Faster decisions
Greater accountability
```

This is an important minister-level storytelling section.

---

## Section 4 — Institution Network

Interactive map / region view.

Users should be able to:

- see institution distribution;
- filter by division;
- filter by district;
- filter by institution category;
- select an institution;
- open public institution profile.

---

## Section 5 — Institution Directory

Search + filters.

Suggested filters:

- Institution Name
- Institution Type
- Division
- District
- Program / Category
- Status

Institution card/list may show:

- name;
- type;
- location;
- contact;
- available programs;
- public profile button.

Do not expose internal operational data publicly.

---

## Section 6 — Public Services

Service cards can include:

- Admission Information
- Admission Result
- Student Application Status
- Certificate Information
- Certificate Verification
- Professional License Application — Phase 2
- Professional License Verification — Phase 2
- Institution Directory
- Notices / Circulars
- Downloads / Forms
- Help Desk

Design inspiration:

- BTEB eSheba service cards
- BIDA OSS service discovery

---

## Section 7 — Public Dashboard

Expose only aggregated/non-sensitive information.

Potential public indicators:

- institution count by category;
- institution distribution by region;
- overall student count;
- overall teacher count;
- academic program distribution;
- historical aggregated trends where approved.

### Do not publicly expose

- individual attendance;
- student personal data;
- teacher personal data;
- internal budgets by default;
- internal procurement;
- asset ownership;
- approval queues;
- internal audit findings;
- role permissions.

---

## Section 8 — Admissions

Public area should support:

- current admission cycle;
- eligibility information;
- seat information where approved;
- important dates;
- required documents;
- notices;
- admission/entrance result;
- migration notices/results;
- instructions;
- related downloads.

Authenticated student/application flows may be entered from here.

---

## Section 9 — Notices & Circulars

Filters:

- Admission
- Academic
- Examination / Result
- Institution
- Teacher / Staff
- Procurement
- Certificate
- General
- License — Phase 2

Each notice:

- title;
- date;
- category;
- issuing authority;
- attachment;
- detail page.

---

## Section 10 — Resources

Include:

- User Guides
- Forms
- Policies
- Circulars
- Academic Calendar
- Code of Conduct
- FAQ
- Video Tutorials / Help Materials

Reference pattern: IPEMIS Help Desk.

---

## Section 11 — Help & Support

Include:

- FAQ;
- searchable help topics;
- support contact;
- user guide;
- password/login help;
- application tracking help;
- issue/ticket route if introduced.

---

## Section 12 — Footer

Include:

- Ministry identity;
- Department identity;
- Important Links;
- Privacy;
- Terms;
- Accessibility;
- Contact;
- Help Desk;
- System version / last updated if useful.

---

# 9. Login & Authentication UX

Use one clear login entry.

Suggested login options:

- Email / Mobile / User ID
- Password
- Forgot Password
- Help

After authentication, the system determines access based on RBAC.

### Role-based destination

```text
Ministry Super Admin → Ministry Dashboard
Division Admin        → Division Dashboard
District Admin        → District Dashboard
Institution Admin     → Institution Dashboard
Principal             → Institution Management Dashboard
Teacher               → Teacher Workspace
Student               → Student Portal
3rd Party Organization→ Verification Workspace
```

If one user has multiple roles, the system should either:

- show a role/workspace selector after login, or
- open the highest/default role and provide a workspace switcher.

This should be validated before final implementation.

---

# 10. Authenticated Global Layout

Recommended desktop structure:

```text
┌─────────────────────────────────────────────────────────────┐
│ Top Bar: Search | Notifications | Language | User Profile  │
├───────────────┬─────────────────────────────────────────────┤
│               │ Breadcrumb / Hierarchy                     │
│ Left Sidebar  │ Ministry > Division > District > Institute │
│               ├─────────────────────────────────────────────┤
│ Modules       │                                             │
│               │ Main Workspace                              │
│               │                                             │
└───────────────┴─────────────────────────────────────────────┘
```

Global components:

- hierarchy breadcrumb;
- global search;
- notifications;
- pending action count;
- quick actions;
- contextual filters;
- date range;
- export where permitted;
- role/workspace switch;
- help;
- profile.

---

# 11. Ministry Super Admin Dashboard

This is the **most important prototype screen**.

The Minister / senior Ministry stakeholder should understand the value of the system within seconds.

## 11.1 Executive KPI Layer

Recommended cards:

- Total Institutions
- Total Students
- Total Teachers
- Today's Student Attendance
- Today's Teacher Attendance
- Active Admission Cycle
- Budget Utilization
- Assets / Equipment
- Pending Approvals
- Institutions Requiring Attention

Actual KPI availability depends on data and final approval.

---

## 11.2 Hierarchy / Geographic View

Support:

```text
All Bangladesh
     ↓
Division
     ↓
District
     ↓
Institution
```

Selecting a level should update all relevant dashboard widgets.

Filters:

- Division
- District
- Institution
- Institution Type
- Academic Session
- Date Range

---

## 11.3 Institution Performance / Health

Recommended UI:

- map;
- ranking/list;
- traffic-light status;
- trend chart;
- exception cards.

Potential indicators:

- attendance;
- result performance;
- reporting completeness;
- budget utilization;
- asset issues;
- teacher availability.

### Important UX principle

The dashboard should answer:

> **“Where does the Ministry need to pay attention today?”**

not simply display many charts.

---

## 11.4 Action / Alert Center

Examples:

- admission approval pending;
- attendance unusually low;
- budget utilization abnormal;
- damaged/lost asset awaiting action;
- student service requests overdue;
- missing result publication;
- certificate approval pending;
- license application pending.

Each alert should have:

- issue;
- institution;
- responsible role;
- age / SLA;
- severity;
- View / Take Action.

---

# 12. Division Dashboard

Same core visual language as Ministry Dashboard, but scoped to assigned division.

Show:

- division summary;
- district breakdown;
- institution list;
- comparative performance;
- attendance;
- admissions;
- results;
- finance/assets summary;
- pending actions;
- reports.

User must not access another division unless authorized.

---

# 13. District Dashboard

Scoped to district.

Show:

- institution count;
- student/teacher summary;
- attendance;
- institution comparison;
- pending requests;
- asset/budget summary;
- admission/result status;
- reports.

User must not access another district unless authorized.

---

# 14. Institution 360° Dashboard

A single institution should have one consolidated profile.

Recommended tabs:

1. Overview
2. Students
3. Teachers & Staff
4. Classes / Academics
5. Attendance
6. Results
7. Finance
8. Assets
9. Procurement
10. Library
11. Leave / HR
12. Certificates
13. Alumni
14. Reports

Header should show:

- institution name;
- category;
- division;
- district;
- principal;
- status;
- academic session.

### Core UX objective

A Ministry user should be able to go:

> National Dashboard → Division → District → Institution → Detailed Record

without losing context.

---

# 15. Institution & Category Setup

Required:

- Create Institution Category
- Edit Institution Category
- Add Institution
- Edit Institution
- Link Institution to Division
- Link Institution to District
- Institution status
- Institution administrator assignment

Recommended safeguards:

- unique institution code;
- duplicate institution detection;
- inactive/closed status instead of deletion where historical data exists.

---

# 16. User, Role & Permission Management

Required:

- create user;
- edit user;
- activate/deactivate user;
- create role;
- assign permissions;
- assign one or more roles;
- define scope.

Permission dimensions should conceptually include:

```text
User
+ Role
+ Module Permission
+ Data Scope
= Effective Access
```

Example:

> District Admin + Attendance View + Dhaka District

should not automatically mean access to national data.

---

# 17. Admission Management

Core flow:

```text
Create Admission Cycle
        ↓
Configure Eligibility
        ↓
Configure Seat / Quota
        ↓
Open Application
        ↓
Student Applies
        ↓
Validation
        ↓
Admission / Entrance Test
        ↓
Result Processing
        ↓
Result Published
        ↓
Institution Allocation
        ↓
Migration if applicable
        ↓
Final Admission
```

Required management areas:

- admission cycles;
- eligibility;
- seat quota;
- documents;
- applications;
- result publication;
- institution assignment;
- migration.

---

# 18. Teacher & Student Management

## Teacher

- teacher profile;
- assigned institution;
- assigned classes;
- class content;
- attendance;
- results;
- leave where applicable.

## Student

- student profile;
- institution;
- academic session;
- class/course assignment;
- attendance;
- results;
- service requests;
- certificate;
- alumni state.

---

# 19. Academic / Class Management

Required flow:

```text
Create Class
    ↓
Assign Teacher
    ↓
Assign Students
    ↓
Teacher Adds Content
    ↓
Attendance / Assessment / Result
```

Support:

- classes;
- teacher assignment;
- student assignment;
- content/material;
- grade table;
- advising records;
- teaching evaluation;
- curriculum analysis;
- code of conduct;
- academic calendar.

---

# 20. Live Attendance

Required:

- teacher attendance;
- student attendance;
- teacher-controlled attendance capture;
- Head Office visibility.

Recommended dashboard views:

- Today;
- Institution;
- Class;
- Teacher;
- Student;
- Trend;
- Low-attendance alert.

Attendance data should show:

- Present
- Absent
- Late — if approved
- Leave — if approved
- Not Recorded / Pending Sync where needed

---

# 21. Student Portal

Student homepage should prioritize:

- Today's Classes
- Attendance
- Latest Results
- Pending Applications
- Notices
- Fees / Payment
- Academic Calendar
- Profile

Secondary:

- Grade Table
- Advising
- Teaching Evaluation
- Curriculum
- Code of Conduct
- Certificate
- Alumni transition

---

# 22. Student Online Service Requests

Required services:

- Admit Card
- Waiver
- Re-admission
- Course Drop
- Semester Drop
- Online Payment
- Testimonial
- Incomplete Transcript
- PVC & Transcript
- Certificate & Transcript
- Duplicate Certificate & Transcript
- Medium of Instruction
- Transfer Program
- Cancel Studentship
- Convocation

Use a **service catalogue pattern**.

Each service should show:

- eligibility;
- required documents;
- fee where applicable;
- expected processing time if defined;
- Start Application;
- status tracking.

Common status model:

```text
Draft
↓
Submitted
↓
Under Review
↓
Action Required / Correction Needed
↓
Approved / Rejected
↓
Completed
```

Inspiration:

- BIDA OSS
- BTEB eSheba

---

# 23. Finance & Budget

Required:

- Head Office budget allocation by institution;
- expense recording;
- budget utilization tracking.

Recommended dashboard:

- Allocated
- Used
- Remaining
- Utilization %
- Institution comparison
- Period comparison

Do not expose internal financial details publicly unless specifically approved.

---

# 24. Asset & Inventory

Required:

- asset received from Head Office;
- asset assigned to institution;
- asset assigned to individual;
- current holder;
- current status;
- damaged/lost reason.

Core status values from scope:

- In Use
- Available
- Unavailable
- Damaged
- Lost

Recommended lifecycle:

```text
Received
↓
Available
↓
Assigned
↓
In Use
↓
Returned / Reassigned
or
Damaged / Lost
```

Maintain movement/history rather than overwriting previous ownership.

---

# 25. Procurement / LC / PO / Gate Pass

The SOW mentions these at high level.

Prototype can demonstrate a generic connected flow:

```text
Procurement Request
        ↓
Review / Approval
        ↓
Purchase Order
        ↓
LC Document if applicable
        ↓
Receive Item
        ↓
Asset / Inventory Update
        ↓
Gate Pass when moved
```

### Must be marked as an area requiring detailed workflow confirmation

Do not invent a final approval chain in the prototype.

---

# 26. Library

Required:

- book catalogue;
- copy inventory;
- members;
- issue;
- return;
- due date;
- fine;
- search/browse.

Useful views:

- available books;
- borrowed;
- overdue;
- fines;
- popular books;
- member history.

---

# 27. Result Management

Core flow:

```text
Teacher Enters Result
       ↓
Validation / Review
       ↓
Publish
       ↓
Student Views Result
       ↓
Result History Retained
```

Required:

- semester-wise entry;
- calculation;
- publication;
- history.

After publication, changes should require controlled correction/review rather than silent editing.

---

# 28. Leave & Staff HRM

Required from current scope:

- Casual Leave
- Sick Leave
- Earned Leave
- configurable leave type;
- application;
- approval/rejection;
- status;
- balance.

### Scope gap

Broader HRM is explicitly not fully defined.

Examples needing future definition:

- staff profile;
- service history;
- appointment;
- promotion.

Prototype may show these as future/extended HRM areas but must not present unconfirmed workflows as finalized requirements.

---

# 29. Certification

Core flow:

```text
Eligible Student
      ↓
Certificate Application
      ↓
Institution Review
      ↓
Approval
      ↓
Certificate Issued
      ↓
Verification / History
```

Must support:

- certificate application;
- issuance;
- status;
- unique reference/number;
- duplicate request;
- correction scenario;
- history.

---

# 30. Alumni

Flow:

```text
Final Result Published
       ↓
Principal Marks Student as Alumni
       ↓
Regular Student Access Restricted
       ↓
Alumni Workspace Enabled
```

Alumni can update:

- current profession/job;
- position;
- LinkedIn;
- other approved professional information.

---

# 31. Government / MY GOV Integration

The requirement states MY GOV integration but the exact purpose is not yet confirmed.

Prototype should represent this as:

> **Government Integration Layer — Subject to API/use-case confirmation**

Possible visual placeholder:

- Identity Verification
- Certificate Registration
- Government Service Integration

Do not design a final dependency until confirmed.

---

# 32. Phase 2 — Professional License Verification

## 32.1 Public License Application

Flow:

```text
Professional
    ↓
Application
    ↓
Documents / Information
    ↓
Submit
```

## 32.2 Head Office Review

```text
Submitted
    ↓
Under Review
    ↓
Approved / Rejected
    ↓
Unique License / Certificate Number
```

## 32.3 Third-Party Organization

Third party should be able to:

- register;
- become approved member if required;
- make payment;
- search using license/certificate number;
- receive verification result.

## 32.4 Verification Result

Recommended public/third-party response:

- Valid
- Invalid / Not Found
- Expired — if license expiry is introduced
- Suspended — only if business rules later support it

Do not expose unnecessary personal information.

## 32.5 Payment

Requirement confirms payment but not pricing model.

Pending decision:

- per verification;
- subscription/membership;
- both.

Prototype can show a generic payment step and label pricing as **TBD**.

---

# 33. Reporting

The platform should support consolidated reports across:

- Institution
- Admission
- Student
- Teacher
- Attendance
- Results
- Finance
- Assets
- Library
- Leave
- Certificates
- Alumni
- License

Common report filters:

- date range;
- division;
- district;
- institution;
- institution type;
- academic session;
- status.

Common actions:

- view;
- filter;
- export/download where authorized.

---

# 34. Single Source of Truth — UX Rules

This principle must be visible throughout the design.

## 34.1 One Record, Used Everywhere

Example:

```text
Student Master Record
      ↓
Admission
      ↓
Class
      ↓
Attendance
      ↓
Result
      ↓
Certificate
      ↓
Alumni
```

Do not create a different student profile independently inside every module.

The same logic applies to:

- Institution
- Teacher
- Asset
- Budget
- Certificate
- License

---

## 34.2 Changes Must Be Traceable

Important changes should retain:

- who changed it;
- when;
- old value;
- new value;
- reason where applicable.

Recommended UX:

**View History / Activity Log**

---

## 34.3 Avoid Deleting Historical Records

Prefer:

- Active
- Inactive
- Suspended
- Archived
- Closed

over permanent deletion when records already have transactions/history.

---

# 35. Search Requirements

Global search should help authorized users find:

- institution;
- student;
- teacher;
- asset;
- application;
- certificate;
- license;
- report.

Public search should be restricted to approved public datasets such as:

- institution;
- notice;
- result/verification where allowed;
- public service.

---

# 36. Notifications

Examples:

- Application submitted
- Application approved
- Application rejected
- Correction required
- New admission notice
- Result published
- Leave decision
- Asset action required
- Certificate ready
- License approved
- Payment success/failure
- Upcoming deadline

Channels for final implementation are TBD.

Prototype should at minimum demonstrate:

- in-app notification;
- unread state;
- click-through to relevant record.

---

# 37. UX Status Design

Do not rely on color only.

Every status must have:

- label;
- icon or visual indicator;
- optional color.

Examples:

- Draft
- Submitted
- Under Review
- Pending
- Action Required
- Approved
- Rejected
- Completed
- Inactive

---

# 38. Edge Cases to Cover in Prototype / Flow Design

These are critical during UI/UX design.

## 38.1 Access & Hierarchy

1. User tries to access another division/district.
2. User has multiple roles.
3. User is transferred to a different institution.
4. Admin account becomes inactive.
5. Institution is moved/reassigned administratively.
6. Institution becomes inactive but historical records must remain.
7. User role changes while requests are still pending.

---

## 38.2 Institution

8. Duplicate institution creation.
9. Institution missing division/district.
10. Institution category changes.
11. Institution is temporarily inactive.
12. Institution has no assigned Principal/Admin.

---

## 38.3 Admission

13. Duplicate student application.
14. Required document missing.
15. Applicant becomes ineligible after validation.
16. Seat quota becomes full.
17. Result corrected after publication.
18. Student qualifies for multiple institution choices.
19. Student migration happens after first allocation.
20. Student does not complete final admission.
21. Admission cycle closes while application is still draft.

---

## 38.4 Student

22. Student profile information changes.
23. Name/DOB differs from certificate information.
24. Student transfers institution.
25. Student drops semester/course.
26. Student cancels studentship.
27. Student is readmitted.
28. Student graduates and becomes alumni.
29. Alumni tries to access restricted student functions.

---

## 38.5 Teacher / Academic

30. Teacher is assigned overlapping classes.
31. Teacher leaves/transfers mid-semester.
32. Class has no teacher.
33. Student is assigned to wrong class.
34. Course material needs replacement/version update.

---

## 38.6 Attendance

35. Attendance is not recorded.
36. Attendance entered late.
37. Student appears in wrong class.
38. Attendance requires correction after submission.
39. Teacher has no connectivity / sync delay.
40. Student marked both Present and Leave due to conflicting records.

---

## 38.7 Result

41. Missing marks.
42. Invalid marks.
43. Result calculation incomplete.
44. Result published with incorrect data.
45. Result needs correction after publication.
46. Student has incomplete result.
47. Re-exam / retake scenario if later applicable.

---

## 38.8 Finance

48. Expense exceeds available budget.
49. Budget revised after expenditure.
50. Duplicate expense entry.
51. Expense has missing attachment/evidence.
52. Institution receives additional allocation.

---

## 38.9 Assets

53. Asset assigned to two people.
54. Asset transferred between people.
55. Asset transferred between institutions.
56. Asset damaged.
57. Asset lost.
58. Lost asset later recovered.
59. Asset record exists but physical item unavailable.
60. Gate pass created but asset does not return.

---

## 38.10 Procurement

61. Procurement request rejected.
62. PO cancelled.
63. Partial delivery.
64. LC/PO document missing.
65. Received quantity differs from PO.
66. Approval chain not configured.

---

## 38.11 Library

67. Book has no available copy.
68. Overdue item.
69. Lost/damaged library book.
70. Fine unpaid.
71. Student becomes alumni while book remains borrowed.

---

## 38.12 Leave

72. Leave balance insufficient.
73. Overlapping leave requests.
74. Leave withdrawn.
75. Approver unavailable.
76. Leave type disabled after application.

---

## 38.13 Certificate

77. Student applies before becoming eligible.
78. Duplicate certificate request.
79. Certificate data differs from student profile.
80. Certificate requires correction.
81. Certificate already issued but student profile changes.
82. Certificate record revoked/cancelled if policy later permits.

---

## 38.14 License

83. Duplicate professional application.
84. Invalid/missing documents.
85. License rejected.
86. License number not found.
87. License status changes.
88. Third-party user searches wrong number.
89. Payment succeeds but verification status does not update.
90. Payment fails.
91. Duplicate payment.
92. Third-party membership is inactive.

---

## 38.15 Integration

93. MY GOV API unavailable.
94. Data returned by government API conflicts with local data.
95. Request timeout.
96. Duplicate callback/update.
97. External service is temporarily unavailable.

---

# 39. Public vs Private Data Rules

## Public

Potentially:

- institution directory;
- institution public profile;
- aggregated statistics;
- notices;
- admission information;
- results where officially approved;
- certificate/license verification;
- help/resources.

## Authenticated / Restricted

- student personal information;
- teacher personal information;
- attendance detail;
- financial transactions;
- budget details;
- internal asset assignments;
- internal procurement;
- leave;
- approval history;
- internal reports;
- audit logs;
- role permissions.

Prototype should visually communicate this separation.

---

# 40. Design Principles

## 40.1 Government Credibility

The interface should feel:

- official;
- trustworthy;
- modern;
- structured;
- calm;
- data-driven.

Avoid a commercial SaaS aesthetic that feels disconnected from a government platform.

---

## 40.2 Modern, Not Old-Style Government Portal

Use inspiration from the referenced systems but modernize:

- more whitespace;
- cleaner information hierarchy;
- consistent component system;
- clearer typography;
- strong dashboard hierarchy;
- progressive disclosure;
- fewer competing colors;
- better mobile/responsive behavior.

---

## 40.3 Bangla + English

Recommended from the beginning.

UI must allow:

**বাংলা | English**

Design components should accommodate longer Bangla labels.

---

## 40.4 Accessibility

Borrow the principle from IPEMIS.

Consider:

- adequate contrast;
- keyboard navigation;
- visible focus;
- readable font size;
- clear labels;
- status not communicated by color alone;
- screen-reader-friendly information hierarchy.

---

## 40.5 Responsive Design

Priority:

1. Desktop — Ministry/admin workflows
2. Tablet — institution/admin use
3. Mobile — student/teacher/public services

---

# 41. Recommended Design System Direction

### Visual tone

**Bangladesh Government + Textile Identity + Modern Data Platform**

Potential inspiration:

- restrained green/red accents tied to national identity;
- neutral surfaces;
- subtle textile pattern / weave motif;
- strong data cards;
- accessible status colors;
- light dashboard backgrounds;
- consistent iconography.

Do not overload the interface with decorative textile imagery.

---

# 42. Prototype Priority

Because the purpose is to present to Ministry stakeholders, do not spend equal design effort on every module.

## P0 — Must Design for Presentation

1. Public Landing Page
2. Institution Directory
3. Public Dashboard
4. Login
5. Ministry Super Admin Dashboard
6. Hierarchy Drill-down
7. Institution 360° Profile
8. Live Attendance
9. Admission Overview / Flow
10. Student Service Request + Approval Tracking
11. Assets / Budget Overview
12. Consolidated Reporting
13. Professional License Verification
14. One role-specific institution dashboard
15. One Student Portal screen

---

## P1 — Important Supporting Screens

16. Division Dashboard
17. District Dashboard
18. Teacher Dashboard
19. Result Management
20. Certificate Flow
21. Alumni
22. Library
23. Leave
24. Procurement
25. User / Role Management
26. Notices / Help Center

---

## P2 — Can Be Represented at High Level

- detailed HR service history;
- final MY GOV integration;
- complete LC workflow;
- every individual student service form;
- all report templates;
- payment gateway specifics.

---

# 43. Recommended Ministry Demo Story

This should drive the prototype navigation.

## Step 1 — Public Landing

Minister sees:

> The entire textile institution ecosystem connected through one platform.

---

## Step 2 — Public Dashboard

Show:

- institution network;
- students;
- teachers;
- public aggregated insights.

Message:

> **The public gets transparency; the Ministry gets operational intelligence.**

---

## Step 3 — Login as Ministry Super Admin

Enter centralized Ministry Dashboard.

Immediately show:

- national overview;
- alerts;
- trends;
- institution performance.

---

## Step 4 — Drill Down

```text
National
→ Division
→ District
→ Institution
```

Message:

> **Any institution can be reached from one Ministry view.**

---

## Step 5 — Open Institution 360°

Show:

- students;
- teachers;
- attendance;
- results;
- finance;
- assets;
- services.

Message:

> **One institution. One complete digital record.**

---

## Step 6 — Show a Real Operational Issue

Example:

> Student attendance below threshold.

Click alert.

See institution → class → attendance.

Message:

> **The Ministry can identify issues without waiting for manually consolidated reports.**

---

## Step 7 — Show Workflow

Student requests certificate.

```text
Student
→ Submit
→ Institution Review
→ Approval
→ Certificate
→ Status Tracking
```

Message:

> **Every request is trackable.**

---

## Step 8 — Show Reporting

Generate consolidated report by:

- institution;
- district;
- division;
- period.

Message:

> **The same operational data becomes Ministry reporting data.**

---

## Step 9 — Show License Verification

Enter license/certificate number → verification result.

Message:

> **Education, certification and professional trust can exist within one connected ecosystem.**

---

# 44. Critical Open Questions / Requirement Gaps

These should be kept visible during UI/UX design.

1. Exact admission eligibility and quota rules.
2. Exact Ministry dashboard KPIs.
3. Actual approval chain for each student online service.
4. Detailed procurement approval workflow.
5. Detailed LC workflow.
6. Detailed PO workflow.
7. Detailed Gate Pass workflow.
8. Full staff HRM scope beyond leave.
9. MY GOV API purpose.
10. Student profile vs certificate update rule.
11. Dashboard customization rules.
12. Leave accrual/quota rules.
13. Exact library rules beyond standard features.
14. Phase 1 certificate → Phase 2 license relationship.
15. Third-party verification pricing model.
16. Payment gateway.
17. Whether third-party organizations require manual approval.
18. License expiry/renewal/suspension rules.
19. Report approval/submission requirements.
20. Which data can be made publicly visible.
21. Whether one user can operate multiple roles/scopes.
22. Whether notifications are SMS/email/in-app.
23. Exact data migration/integration approach with existing Ministry systems.

For prototype purposes, use **reasonable UX placeholders** but clearly mark these as **TBD / Requires Client Confirmation**.

---

# 45. Data / Status Consistency Rules

These rules should guide UI flows.

### Student lifecycle

```text
Applicant
→ Selected
→ Admitted
→ Active Student
→ Graduated
→ Alumni
```

Alternative states may include:

- Migrated
- Dropped
- Cancelled
- Re-admitted

---

### Application lifecycle

```text
Draft
→ Submitted
→ Under Review
→ Correction Required
→ Approved / Rejected
→ Completed
```

---

### Asset lifecycle

```text
Received
→ Available
→ Assigned
→ In Use
→ Returned / Reassigned
→ Damaged / Lost
```

---

### License lifecycle — proposed

```text
Draft
→ Submitted
→ Under Review
→ Approved / Rejected
→ Issued
```

Expiry/renewal/suspension remain TBD.

---

# 46. Prototype UX Acceptance Criteria

The prototype should satisfy the following:

- A first-time visitor can understand what the platform does within 10 seconds.
- Public and authenticated areas are clearly separated.
- Ministry user can reach an institution within 3–4 interactions.
- Hierarchy context is always visible.
- Every major KPI can lead to underlying detail where meaningful.
- Each workflow clearly communicates current status and next action.
- Pending work is easy to find.
- Exceptions/problems are more visible than normal records.
- The same entity is reused across modules rather than visually duplicated.
- User never loses context when moving from Ministry → institution detail.
- No sensitive data appears on public pages.
- Bangla and English layouts are considered.
- Tables support search/filter/pagination.
- Empty states are designed.
- Error states are designed.
- Permission-denied states are designed.
- Loading states are designed.
- Success/failure feedback is clear.
- Responsive behavior is defined.

---

# 47. Prototype Component Inventory

Create reusable components for:

- Header
- Public navigation
- Sidebar
- Breadcrumb
- Hierarchy selector
- KPI card
- Trend card
- Alert card
- Status badge
- Data table
- Filter drawer
- Search
- Institution card
- Service card
- Notice card
- Timeline
- Approval stepper
- Activity log
- Profile summary
- Empty state
- Error state
- Confirmation modal
- Permission warning
- Notification panel
- Help card
- Map tooltip
- Chart container
- Download/export action

---

# 48. Final Product Story

The entire prototype should support this narrative:

> **Every textile institution creates and maintains its operational data in one connected platform. Authorized users work through role-based workflows. Institution data automatically rolls up through district and division views to the Ministry. The Ministry receives a centralized, current view of institutions, students, teachers, attendance, academics, budget, assets and services — allowing faster monitoring, reporting and decisions. Public users receive transparent access to approved information and digital services, while professional certification and verification extend the platform beyond graduation.**

---

# 49. Research / Inspiration Links

### Primary UI/UX References

- IPEMIS — https://ipemis.dpe.gov.bd/
- BIDA One Stop Service — https://bidaquickserv.org/
- EMIS — https://apps.emis.gov.bd/portal
- BTEB eSheba — https://btebesheba.gov.bd/

### Textile Ministry References

- Ministry of Textiles and Jute — https://motj.gov.bd/
- Department of Textiles — https://dot.gov.bd/
- MoTJ Central Service Dashboard — https://motj.gov.bd/pages/static-pages/694032cd35ce18e1c0562afc

### Useful Specific Reference Patterns

- IPEMIS Help Desk — https://ipemis.dpe.gov.bd/help-desk?lang=en_EN
- IPEMIS Citizen/Public Services — https://ipemis.dpe.gov.bd/citizen-service?lang=en_EN
- IPEMIS Login — https://login.ipemis.dpe.gov.bd/login?lang=en_EN
- BIDA Service Tracking — https://bidaquickserv.org/service-tracking
- BIDA One Stop Service Overview — https://bidaquickserv.org/articles/one-stop-service
- BIDA OSS Concept — https://bidaquickserv.org/articles/about-quick-service-portal

---

# 50. Design Decision Summary

For the prototype:

**Use IPEMIS for**  
Public dashboard + public data + help architecture + ministry-to-field feel.

**Use BIDA OSS for**  
Service catalogue + application workflow + tracking + one-stop-service thinking.

**Use EMIS for**  
Institution directory + module presentation + education-management portal pattern.

**Use BTEB eSheba for**  
Student/institution public services + verification + process guidance + notices.

**Make this product stronger than all four references by combining:**

> **Public Portal + Ministry Command Dashboard + Hierarchical Management + Institution 360° + Workflow Tracking + Single Source of Truth.**

---

## Working Rule for Prototype Design

**Do not design screens only because a module exists.**

For every screen ask:

1. Who is using it?
2. What decision or action do they need to make?
3. What information is required for that decision?
4. What can go wrong?
5. What is the next step?
6. Who receives the data/action after this?
7. Should this information be public or private?

That approach should drive the entire prototype.
