# FINAL CLAUDE CODE PROMPT — Textile Institution Management System
## Build the final end-to-end prototype using selected Variation H

You are working in:

`D:\textile_hrm`

Variation H is APPROVED as the single UI/UX direction. Do not create more variations. Preserve previous variation files and build one final clickable prototype.

## 1. Source of truth — read before coding

Read these completely:

1. `C:\Users\Sajarun Sadia\Downloads\Core_Features_Textile_Institution_Management_System.docx`
2. `C:\Users\Sajarun Sadia\Downloads\Textile_Institution_HRM_License_SOW_v2.pdf`

Then read the repo PRD, research, design guide, all Variation H files/screens, i18n/data/build/QA utilities.

Priority:
1. Core Features
2. SOW
3. This stakeholder instruction
4. Variation H
5. Existing repo docs

If a workflow is still undefined, mark it `TBD — Requires Client Confirmation`. Do not silently invent rules.

Before mass implementation, create `FINAL_SCOPE_COVERAGE.md` mapping every Phase 1/2 requirement to role, route, screen/workflow, edge cases, and status.

---

# 2. Keep Variation H, but apply these corrections

Variation H remains the visual baseline for:
- public website
- inner public pages
- dashboards
- tables/forms
- role workspaces

Do not convert it into a generic SaaS/admin template.

Retain H's institutional/premium character, but make the public experience more like a proper Bangladesh government digital platform.

Core product colors:
- Ocean Blue `#356A82`
- Teal `#3A817E`
- Sky Mist `#DCECEF`

Neutrals:
- White `#FFFFFF`
- Background `#F6F8F9`
- Text `#20353D`
- Muted `#687B82`
- Border `#D6E1E4`

No cream/beige heritage palette. No red-heavy branding. Semantic status colors may exist separately.

---

# 3. Official logo

Use the exact stakeholder-supplied official asset:

[Ministry of Textiles and Jute logo](https://motj.gov.bd/site-assets/images/logo.png)

Download it into the repo, e.g. `assets/brand/motj-logo.png`.

Do not redraw/recolor/distort it.

Do not invent additional government logos. Use another official logo only if verified on an official source.

---

# 4. Image direction — important

Current factory/worker visuals are wrong for this product.

Use real textile EDUCATION imagery:
- institution campuses
- classrooms
- textile labs/workshops
- students in academic settings
- libraries
- training/workshops
- institutional events
- academic equipment

Do NOT use generic factory production workers as the main visual.

Preferred official/public sources:
- [Department of Textiles](https://dot.gov.bd/)
- [Pabna Textile Engineering College](https://ptec.college.gov.bd/)
- [Textile Engineering College, Noakhali](https://tecn.edu.bd/)
- [Dinajpur Textile Institute](https://dti.edu.bd/)
- [DTI Gallery](https://dti.edu.bd/public/index.php/gallery)
- [Gopalganj Textile Engineering College](https://tec.gopalganj.gov.bd/)
- [Tangail Textile Engineering College](https://btec.portal.gov.bd/)

Download used images locally; do not hotlink. Create `assets/images/IMAGE_SOURCES.md` with source page, local filename, institution, and purpose.

---

# 5. Public website structure

The public homepage must NOT look like a dashboard.

Main navigation:

- Home
- About Us
- Academic
- Admissions
- Notice
- Help

## Decision: keep Admissions separate from Academic

Admissions is a seasonal, transactional citizen task and should remain a top-level item.

Academic is for:
- programs
- curriculum
- academic calendar
- departments/technologies
- academic regulations
- institution/program information

Admissions is for:
- current cycle
- eligibility
- dates
- documents
- apply
- candidate login
- results
- migration
- admission notices

Do NOT put Public Dashboard in the main navbar.

---

# 6. Top-right utility navigation

Take INFORMATION ARCHITECTURE inspiration from National University, not its visual style.

Use a small top utility area for items such as:

- Results / Verification
- Downloads
- Contact
- Government Portals
- Search
- বাংলা | English

Reference:
[National University Bangladesh](https://www.nu.ac.bd/)

Student Login should be a prominent button in the main header/nav area.

---

# 7. Login architecture — final decision

Do NOT show Ministry, Division, District, Principal, Teacher, Student, Candidate together in one public login.

## Main public website
### Student Login
Prominent visible login CTA.

### Candidate Login
Candidate login comes from Admissions:
- Apply
- Track Application
- Candidate Login

Candidate uses temporary application/candidate ID.

If selected and final admission is completed:
`Candidate ID → Student ID / Student account`

Represent this transition in the prototype.

### Teacher Login
Teacher does NOT use the main public login.
Teacher signs in through the Institution Portal.

---

# 8. Institutional and Government Portals — make them very visible

Create a prominent section and dedicated portal page:

## Institutional and Government Portals
Separate secure access for authorized government/institution users.

Show:
- Ministry Portal
- Division Portal
- District Portal
- Institution Portal

Institution Portal covers authorized institutional roles such as Principal/Institution Admin, Teacher, and relevant staff.

Make these visible in:
1. top utility link `Government Portals`
2. homepage/footer portal block
3. dedicated `/portals` review page

Each portal card needs:
- title
- short purpose
- Open Portal button
- prototype address

Possible labels:
- `ministry.tims.gov.bd`
- `division.tims.gov.bd`
- `district.tims.gov.bd`
- `institution.tims.gov.bd`

If not approved/live, label:
`Proposed secure address — prototype only`

In the prototype, link each card to a working local route.

---

# 9. Public homepage baseline

Primary reference:
[IPEMIS](https://ipemis.dpe.gov.bd/)

Secondary:
[Invest Bangladesh](https://investbangladesh.gov.bd/)
[BIDA QuickServ](https://bidaquickserv.org/)

Keep Variation H identity, but strengthen:
- larger typography
- real hero image
- illustrated icons
- prominent stats
- About section
- Admissions
- Notice
- Photo Gallery
- Help Desk
- public-dashboard CTA inside page
- government ownership

## Homepage sequence
1. government/product header
2. hero image + large headline
3. large public statistics
4. About / Why this platform
5. public services
6. Academic / institution ecosystem
7. Admissions
8. public-dashboard preview
9. categorized notices
10. Responsible Officials preview
11. Photo Gallery
12. Help Desk
13. Government Portals
14. structured footer

Use formal government-service language, not startup marketing copy.

---

# 10. Public statistics visualization

The stakeholder wants the scale/clarity of IPEMIS, not small AI-style KPI cards.

Use:
- large numbers
- large labels
- illustrated/icon support
- strong color areas or a full-width statistics band
- easy at-a-glance reading

Possible metrics:
- Textile Institutions
- Students Enrolled
- Teachers/Instructors
- Graduates

Separate institution breakdown may show:
- Textile Engineering Colleges
- Textile Institutes
- Textile Vocational Institutes

If numbers are not verified, label `Demo / Illustrative Data`.

---

# 11. Public Dashboard

Do not put it in main nav.

Homepage should contain a section explaining public insights with a `View Public Dashboard` CTA.

Public dashboard visual style may borrow from IPEMIS:
- large insight cards
- conventional charts
- precise tables

Preferred charts:
- line/area for trends
- grouped bars for comparison
- horizontal bars for rankings
- donut only for simple composition
- tables for exact values

Every chart needs title, unit, period, legend/labels, and source/demo status.

---

# 12. About Us → Responsible Officials

Add a public `Responsible Officials` area.

Pattern inspiration:
[Invest Bangladesh — Our Officers](https://investbangladesh.gov.bd/invest-bangladesh-officers)

Group by:
1. Ministry / National Level
2. Division Level
3. District Level

Do NOT include:
- Principals
- Teachers
- Students

Where officially published, show:
- portrait
- name
- designation
- jurisdiction/level
- official contact
- View Profile

Use only current official government sources. Never invent personal data.

Create:
`assets/data/OFFICIALS_SOURCES.md`

---

# 13. Notice system

Notice is a first-class content type.

Suggested public categories:
- Admission
- Academic
- Examination
- Result
- Institution
- Teacher / Staff
- Circular / General
- Tender / Procurement
- Urgent

Use ideas from:
- [National University](https://www.nu.ac.bd/)
- [Invest Bangladesh](https://investbangladesh.gov.bd/)

Support:
- category tabs/filters
- pinned notice
- urgent label
- date
- issuing authority
- attachment
- detail page
- related/previous/next
- archive/view all
- search

Internal dashboards should show only relevant scoped notices.

---

# 14. Photo Gallery and Help

## Gallery
Use actual institution/campus/activity imagery with captions and source.

## Help
Take clarity from IPEMIS:
- FAQ
- User Guides
- Video Tutorials
- Forms / Downloads
- Help Desk / Contact

Use illustrated icons.

---

# 15. Footer

Use National University as an information-architecture reference only.

Organize groups such as:
- About
- Academic
- Admissions
- Important Links
- Results / Verification
- Notices
- Government Portals
- Help
- Related Organizations
- Contact

Clearly show system ownership.

---

# 16. Content language / tone

Follow the tone of:
- [Ministry of Textiles and Jute](https://motj.gov.bd/)
- [Department of Textiles](https://dot.gov.bd/)
- [IPEMIS](https://ipemis.dpe.gov.bd/)
- [Invest Bangladesh](https://investbangladesh.gov.bd/)
- official textile institution websites

Tone:
- formal
- factual
- direct
- institutional
- public-service focused

Avoid generic AI marketing phrases and unsupported claims.

---

# 17. Bilingual

Full prototype supports English and বাংলা.

Language toggle must actually change:
- nav
- utility links
- section titles
- buttons
- notice labels
- stat labels
- forms
- statuses
- tables
- dashboards
- empty/error states

Support longer Bangla text properly.

---

# 18. Internal dashboard philosophy

Internal dashboards should feel like:
`familiar government operational software, significantly improved for UX`.

Do not make them feel like generic AI admin dashboards.

Each role homepage must answer:
1. What is happening?
2. What needs my action?
3. What is pending?
4. What notices matter?
5. What do I usually do next?

Use relevant statistics, actions, notices, pending items, recent updates and simple conventional charts.

---

# 19. Role dashboard priorities

## Ministry
- institution/student/teacher summary
- attendance
- admissions
- budget/assets
- reports
- alerts/exceptions
- approvals/escalations
- notices
- drill-down

## Division
- division summary
- districts/institutions
- follow-up issues
- attendance/reporting
- actions
- notices

## District
- institution status
- actions
- attendance/reporting
- notices
- comparison

## Principal / Institution Admin
- student/teacher summary
- attendance
- pending services
- result tasks
- leave approvals
- finance/resource alerts
- notices
- quick actions

## Teacher
- today's classes/schedule
- Take Attendance
- pending results
- materials/tasks
- notices
- leave/services

## Student
- academic status
- classes
- attendance
- results
- notices
- requests
- payment/certificate/profile

## Candidate
- application progress
- missing steps
- payment
- notices
- result
- final admission
- transition to Student

---

# 20. Phase 1 full scope coverage

Follow the source documents and implement prototype coverage for:

### Ministry/Central
- Institution Categories
- Institutions
- Division/District linkage
- Users
- Roles/Permissions
- Multi-role assignment
- Dashboard/Reporting
- Admission setup/oversight
- Budget Allocation
- Asset Allocation
- Live Attendance
- Consolidated Reports

### Admission
- cycle
- eligibility
- quota/seats
- documents
- application
- payment/tracking
- result
- allocation
- migration
- final admission
- candidate→student

### Institution/Academic
- teachers
- students
- classes
- teacher assignment
- student assignment
- class materials

### Student Portal
- classes/content
- attendance
- results
- profile
- ledger
- grade table
- advising
- teaching evaluation
- curriculum analysis
- code of conduct
- academic calendar

### Student Services
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

Use one common service-request framework.

### Attendance
- teacher
- student
- institution
- Ministry live/aggregate view

### Finance
- expenses
- budget utilization

### Asset/Inventory
- allocation
- person assignment
- current holder
- availability
- damaged/lost
- history

### Procurement
- request
- review/approval
- PO
- LC document
- receipt
- Gate Pass

Detailed approval chain remains TBD unless defined.

### Library
- catalogue
- copies
- members
- issue/return
- due
- fine
- search

### Results
- entry
- validation
- calculation
- review/publish
- history/correction

### Leave
- CL/SL/EL/configurable
- apply
- approve/reject
- balance/status

Do not invent broader HRM beyond confirmed scope.

### Certification
- apply after eligibility
- review
- issue
- duplicate/correction/history

### MY GOV
Show integration boundary/placeholder unless exact use case is confirmed.

### Alumni
- transition after final result
- alumni-only access
- professional info/job/LinkedIn

---

# 21. Phase 2 full scope coverage

### Professional License
- public application
- documents
- submit
- track

### Head Office
- review
- approve/reject
- issue unique license/certificate number

### Third-party Organization
- register
- access verification workspace
- pay before verification
- search by license/certificate number
- see result

Pricing model is TBD. Do not invent final subscription/per-check rules.

---

# 22. Critical clickable E2E flows

Make these work in the prototype:

A. Candidate → Application → Payment → Result → Final Admission → Student ID → Student Dashboard

B. Teacher → Take Attendance → Institution View → District/Division/Ministry aggregated view

C. Teacher → Result Entry → Validation/Publish → Student Result

D. Student → Service Request → Review → Correction/Approve/Reject → Completed

E. Ministry Budget Allocation → Institution Expenses → Utilization Report

F. Asset Allocation → Assignment → Transfer/Return → Damaged/Lost → History

G. Procurement Request → Approval → PO → LC if needed → Receive → Inventory → Gate Pass

H. Teacher Leave → Principal Review → Balance Update

I. Graduate → Certificate → Issue → Alumni Transition

J. Professional License Application → Ministry Review → License Issue → Third-party Registration → Payment → Verification

---

# 23. Edge cases

Use reusable UI states for:
- invalid login/session/permission/no assignment
- missing application document
- payment pending/failed
- application closed
- correction required
- selected/not selected
- attendance missing/late/correction
- result validation error/published/corrected
- service request states
- budget insufficiency/revision
- duplicate expense warning
- asset already assigned/transferred/damaged/lost/recovered
- library unavailable/overdue/fine/lost
- leave insufficient/overlap/withdrawn
- certificate not eligible/duplicate/data mismatch
- license duplicate/missing docs/verification not found
- external API unavailable/timeout/mismatch

Do not create separate pages for every edge case; use shared alerts, banners, modals, timelines and empty states.

---

# 24. Tables/forms

Government users will work heavily in tables/forms.

## Tables
- useful columns only
- search/filter/sort
- clear status
- pagination
- row actions
- export where appropriate
- avoid monster horizontal tables

## Forms
- labels above fields
- logical groups
- progressive disclosure
- stepper for long forms
- Save Draft
- inline validation
- review before submit
- confirmation/reference number

---

# 25. Accessibility/responsive

Support:
- contrast
- keyboard
- focus states
- 44px important targets
- accessible status labels
- no hover-only essential info

Verify:
- 1440
- 1024
- 390

Public/Candidate/Student must be strong on mobile.
Government/admin portals are desktop-first but responsive.

---

# 26. Prototype review index

Create an obvious `/prototype-index` for stakeholders with links to:
- Public Website
- Admissions/Candidate
- Student Login
- Government Portals
- Ministry
- Division
- District
- Institution
- Teacher
- Student
- Phase 2 License Application
- Third-party Verification

This index is for prototype review, not public production IA.

---

# 27. Reference links

Primary:
- [IPEMIS](https://ipemis.dpe.gov.bd/)
- [Invest Bangladesh](https://investbangladesh.gov.bd/)
- [BIDA QuickServ](https://bidaquickserv.org/)
- [National University](https://www.nu.ac.bd/)

Officers pattern:
- [Invest Bangladesh Officers](https://investbangladesh.gov.bd/invest-bangladesh-officers)

Government/content:
- [MoTJ](https://motj.gov.bd/)
- [DoT](https://dot.gov.bd/)
- [Official MoTJ logo](https://motj.gov.bd/site-assets/images/logo.png)

Institution imagery:
- [PTEC](https://ptec.college.gov.bd/)
- [TECN](https://tecn.edu.bd/)
- [DTI](https://dti.edu.bd/)
- [DTI Gallery](https://dti.edu.bd/public/index.php/gallery)
- [Gopalganj TEC](https://tec.gopalganj.gov.bd/)
- [Tangail TEC](https://btec.portal.gov.bd/)

Supporting:
- [EMIS](https://apps.emis.gov.bd/portal)
- [BTEB eSheba](https://btebesheba.gov.bd/)
- [BANBEIS Institute Search](https://institute-search.ieims.banbeis.gov.bd/)
- [UDISE+](https://udiseplus.gov.in/)

---

# 28. Required final documentation

Create/update:
- `FINAL_SCOPE_COVERAGE.md`
- `FINAL_DESIGN_SYSTEM.md`
- `FINAL_ROUTE_MAP.md`
- `FINAL_WORKFLOW_MAP.md`
- `FINAL_EDGE_CASE_MATRIX.md`
- `assets/images/IMAGE_SOURCES.md`
- `assets/data/OFFICIALS_SOURCES.md`
- `FINAL_QA_REPORT.md`

---

# 29. Final QA checklist

Verify all:
- H is final baseline
- no new variations
- homepage is public website, not dashboard
- Academic + Admissions separate
- Public Dashboard not in main nav
- Student Login highly visible
- Candidate Login under Admissions
- Teacher through Institution Portal
- government portals highly visible/clickable
- official logo used
- no factory-worker hero
- real institution/campus/lab imagery
- responsible officials section exists
- no principals/teachers in public officials directory
- notice categories work
- gallery/help/footer complete
- large public stats
- role dashboards are functional/action-first
- Phase 1 covered
- Phase 2 covered
- candidate→student flow works
- edge cases represented
- bilingual works
- no dead links
- responsive QA passes
- unverified values labelled Demo / Illustrative
- review index exists

This is the FINAL full end-to-end prototype build. Do not stop after public pages, one dashboard, one role, or Phase 1.
