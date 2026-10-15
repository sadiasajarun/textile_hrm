# Textile HRM — UI/UX Knowledge Base for Public-First Prototype Rework

## 1. Purpose
This document defines the updated design direction for the Textile Institution Management System prototype.

It is intended so that another AI, designer, or prototype builder can understand:
- what the product is;
- what the public experience should be;
- how internal portals should behave;
- what references to study;
- what the stakeholder expects;
- what should be avoided;
- how new design variations should be evaluated.

This is not the final PRD. It is a practical design knowledge base and decision guide.


## Reference Links — Design Research Sources

Open and review these before continuing UI/UX work.

### Primary UX Baseline
- **IPEMIS — Integrated Primary Education Management Information System**  
  [IPEMIS — Integrated Primary Education Management Information System](https://ipemis.dpe.gov.bd/)

### Public Landing / Institutional Presentation
- **Invest Bangladesh**  
  [Invest Bangladesh](https://investbangladesh.gov.bd/)

### Public Service / Application UX
- **BIDA QuickServ / One Stop Service**  
  [BIDA QuickServ / One Stop Service](https://bidaquickserv.org/)

### Information Architecture / Notice / Footer Reference
- **National University Bangladesh**  
  [National University Bangladesh](https://www.nu.ac.bd/)

### Supporting Education-System References
- **EMIS — Education Management Information System**  
  [EMIS — Education Management Information System](https://apps.emis.gov.bd/portal)

- **BTEB eSheba**  
  [BTEB eSheba](https://btebesheba.gov.bd/)

- **BANBEIS Institute Search**  
  [BANBEIS Institute Search](https://institute-search.ieims.banbeis.gov.bd/)

- **UDISE+ India**  
  [UDISE+ India](https://udiseplus.gov.in/)

### Textile Government Context
- **Ministry of Textiles and Jute**  
  [Ministry of Textiles and Jute](https://motj.gov.bd/)

- **Department of Textiles**  
  [Department of Textiles](https://dot.gov.bd/)

### Reference priority
1. **IPEMIS** — main public UI/UX baseline
2. **Invest Bangladesh** — hero/banner polish and visual confidence
3. **BIDA QuickServ** — service/application experience
4. **National University** — notice, quick-link, and footer organization only
5. **EMIS / BTEB eSheba / BANBEIS / UDISE+** — supporting education-system patterns
6. **MoTJ / DoT** — official context, naming, authority, and content terminology


## 2. Product context
This system is being designed for the Ministry of Textiles and Jute, Bangladesh, with the operational education ecosystem under the Department of Textiles.

The product should not be reduced to just an HRM tool.

It should be understood as a centralized platform for:
- public information;
- admissions;
- notices;
- help/support;
- teacher/student access;
- candidate services;
- Ministry-level institutional visibility;
- role-based internal management;
- reports, approvals, and operational actions.

Recommended framing:
Textile Institution Management System
or
Integrated Textile Institution Management Platform

Core idea:
The public website provides information and services. Internal users operate through role-based portals. The Ministry receives centralized visibility across the institution ecosystem.

## 3. Key design decision: public website first
A major correction to previous directions is:
The landing page must be a real public website, not a dashboard homepage.

The homepage should look like a government-backed public digital platform with:
- a strong visual banner,
- clear public navigation,
- image-led storytelling,
- system introduction,
- admissions and notices,
- service shortcuts,
- help/support,
- gallery,
- public insights,
- footer with structured links.

This direction is strongly influenced by the stakeholder’s preference and by the IPEMIS public website model.

## 4. Research summary from reference websites

### 4.1 IPEMIS — main baseline
Reference: [IPEMIS — Integrated Primary Education Management Information System](https://ipemis.dpe.gov.bd/)

What matters from IPEMIS:
- strong public identity and platform-specific look;
- clear ownership under government/directorate;
- large public-facing statistics;
- large hero with image and bold text;
- about the system storytelling;
- illustrated/icon-supported content;
- help desk, tutorials, user guides, offline forms, FAQ;
- photo gallery;
- public dashboard access;
- accessibility/public-service orientation.

What to borrow:
- homepage structure;
- larger font sizes;
- bold headline treatment;
- visually clear public statistics;
- clear public utility sections;
- help/tutorial/gallery content types.

What NOT to copy literally:
- exact visual style;
- exact colors;
- exact layout proportions.

### 4.2 Invest Bangladesh — public landing quality reference
Reference: [Invest Bangladesh](https://investbangladesh.gov.bd/)

What matters:
- high-quality image/video-led hero;
- premium first impression;
- strong main headline;
- serious institutional tone;
- clean navigation;
- better visual polish than generic portals;
- modern spacing and composition.

What to borrow:
- quality of the hero/banner feeling;
- seriousness and visual confidence;
- clean top-level layout;
- more premium composition.

### 4.3 BIDA QuickServ — service orientation reference
Reference: [BIDA QuickServ / One Stop Service](https://bidaquickserv.org/)

What matters:
- strong service orientation;
- clear public-service discoverability;
- status/process mindset;
- practical CTAs.

What to borrow:
- service-first thinking;
- application/tracking mindset;
- simpler service-entry UX.

### 4.4 National University — information architecture reference only
Reference: [National University Bangladesh](https://www.nu.ac.bd/)

What matters:
- multiple organization/institution ecosystem logic;
- rich notice structure;
- quick links;
- grouped footer;
- structured content organization.

What to borrow:
- notice categorization logic;
- footer structure ideas;
- grouping of public information.

What NOT to borrow:
- visual style as inspiration;
- old-school content clutter.

## 5. Updated product structure

PUBLIC WEBSITE
- Home
- About Us
- Admissions
- Notice
- Help
- Candidate Login
- Student Login
- Teacher Login
- Public information and services

INTERNAL PORTALS
- Ministry Portal
- Division Portal
- District Portal
- Principal / Institution Admin Portal
- Teacher Workspace
- Student Workspace
- Candidate Workspace

## 6. Important portal decision
The stakeholder does not want a single visible public sign-in point that equally exposes:
- Ministry
- Division
- District
- Principal
- Teacher
- Student
- Candidate

Instead:

Public website login should mainly support:
- Admission Candidate
- Student
- Teacher

Separate/dedicated portals should represent:
- Ministry
- Division
- District
- Principal / Institution Admin

This distinction should be reflected in the prototype.

## 7. Candidate lifecycle rule
A candidate uses a temporary application or candidate identity.

Workflow idea:
Candidate creates application
→ receives temporary candidate ID
→ completes application / payment / tracking
→ if selected and finally admitted
→ candidate identity transitions into student identity

This rule should be visible in the UX logic and can be shown in the candidate dashboard or admission section.

## 8. Public website information architecture

### Main navbar
- Home
- About Us
- Admissions
- Notice
- Help

Optional utility features:
- Language switch
- Search
- Login

Important:
Public Dashboard should not appear in the navbar.
It can appear as a homepage section/CTA only.

### Homepage required sections
1. Government/platform identity header
2. Hero banner with large image and large text
3. Statistics / highlights
4. About the system
5. Public service shortcuts
6. Public dashboard preview
7. Admissions section
8. Notice section
9. Photo gallery
10. Help section
11. Footer

## 9. Public content guidance

### Hero section
Must feel strong and official.
Use a large banner image and bigger typography.
It should explain:
- what the system is,
- who it is for,
- what people can do from here.

### Statistics section
A public, visually attractive highlight area:
- institutions
- students
- teachers
- graduates or programs
- other approved metrics

Use illustrated/icon-supported blocks.

### About section
Must explain:
- why the platform exists,
- how it connects institutions and the Ministry,
- how it helps the public and internal users.

### Public services section
Possible public services:
- admission information
- candidate login
- student login
- teacher login
- result/verification
- certificate/license verification
- help desk
- downloads / forms / guides

### Public dashboard preview
A simple content block introducing public insights.
This should be a section inside the homepage.
Not a top-nav item.

### Admissions section
Publicly show:
- current admission cycle
- key dates
- how to apply
- instructions
- candidate status / login
- related notices

### Notice section
This is a major content area.
Should support categorization.

Suggested categories:
- Admission Notice
- Academic Notice
- Examination Notice
- Result Notice
- Teacher / Staff Notice
- Institution Notice
- Circular / General
- Tender / Procurement
- Urgent

The notice experience should support:
- category filters/tabs,
- date,
- pinned notices,
- view all,
- notice detail page.

### Photo gallery
Should represent:
- institutional ecosystem,
- events,
- activities,
- trainings,
- workshops,
- success moments.

### Help section
Should include:
- FAQ
- user guide
- help desk
- tutorials/videos
- contact/helpline

### Footer
Take structural cues from NU.

Footer may include:
- About
- Admissions
- Notices
- Results / Verification
- Student / Teacher links
- Help Desk
- Important Links
- Related Organizations
- Contact
- System ownership / copyright

## 10. Visual direction

### Overall tone
The design should feel:
- official
- calm
- modern
- practical
- accessible
- public-service oriented
- clearly governmental, but not like a generic portal CMS

### What to avoid
Avoid:
- dashboard-looking homepage
- cluttered old portal feeling
- too many nav items
- too many cards/charts
- overuse of decorative textile motifs
- AI-template-looking dashboards
- red-heavy Bangladesh-flag palette
- cream/beige heritage palette

### Recommended product palette
Core 3-color system:
- Ocean Blue — #356A82
- Teal — #3A817E
- Sky Mist — #DCECEF

Support neutrals:
- White — #FFFFFF
- Background — #F6F8F9
- Text — #20353D
- Muted Text — #687B82
- Border — #D6E1E4

Semantic colors can exist separately for status states.

## 11. Bilingual requirement
The prototype must visibly support বাংলা and English.

The language toggle should not be fake.

At minimum, the following should translate:
- nav labels
- major buttons
- section titles
- dashboard labels
- statuses
- notices
- table headings
- service shortcuts

Layouts must handle longer Bangla labels.

## 12. Internal dashboard design philosophy
Internal dashboards must not look like generic AI-generated admin templates.

They should instead feel like:
- familiar government/admin systems,
- but significantly more usable.

That means:
- clearer hierarchy;
- fewer options shown at once;
- better grouping;
- more actionable first screens;
- easier navigation;
- less clutter;
- more obvious status and workflow.

Common first-page dashboard content pattern:
Each role’s first page should show:
- role-relevant stats;
- pending actions;
- notices;
- recent updates;
- shortcuts to common tasks.

## 13. Role-wise dashboard expectations

### Ministry
- national/institution summary
- alerts and issues
- approvals/escalations
- recent notices
- reporting overview
- drill-down entry points

### Division
- division summary
- district/institution highlights
- pending actions
- relevant notices
- recent changes

### District
- district-level operational picture
- institution list/highlights
- pending items
- notices

### Principal / Institution Admin
- institution summary
- teacher/student numbers
- attendance
- pending approvals
- notices
- quick operations

### Teacher
- my schedule
- classes
- attendance actions
- result/content tasks
- notices
- leave/service shortcuts

### Student
- academic summary
- attendance
- results
- notices
- service requests
- profile/payment/certificate shortcuts

### Candidate
- application status
- instructions
- pending steps
- notices
- tracking information

## 14. Navigation logic inside the system
Main navigation should be simplified by role.

Example:
Ministry:
- Overview
- Institutions
- Operations
- Approvals
- Reports
- Administration

Principal:
- Overview
- Academics
- People
- Services & Approvals
- Resources
- Reports

Teacher:
- Home
- My Classes
- Attendance
- Results
- Services

Student:
- Home
- Academics
- Results & Attendance
- Services
- Profile

Use tabs, sub-navigation, tables, quick actions, and contextual actions instead of large permanent sidebars with too many items.

## 15. Edge cases that prototype design must consider
The prototype should show awareness of edge cases and state changes.

Admission / candidate:
- incomplete application
- missing documents
- payment pending
- rejected / correction required
- selected but admission incomplete
- candidate transitions to student

General dashboard/system states:
- no data
- no notices
- no assigned institution
- no pending actions
- permission-limited state

Service/workflow:
- submitted
- under review
- returned for correction
- approved
- rejected
- completed

Academic/admin:
- attendance not submitted
- result not published
- no classes assigned
- pending approvals

## 16. New variation strategy
The next design iteration should create a new set of variations, separate from earlier ones.

Recommended structure:
- Variation G — Public Service First
- Variation H — Institutional & Premium
- Variation I — Functional Government Workspace

All three should:
- follow the same product rules,
- share the same brand base,
- differ mainly in layout, emphasis, and UX approach.

## 17. Minimum screen set needed in the next variation round
Public:
1. Landing Page
2. About Page
3. Admissions Page
4. Notice Page
5. Help Page
6. Login / Portal Entry
7. Candidate or Student/Teacher Login example

Internal:
8. Ministry Dashboard
9. Division Dashboard
10. District Dashboard
11. Principal Dashboard
12. Teacher Dashboard
13. Student Dashboard
14. Candidate Dashboard
15. Workflow detail page
16. Notice detail page
17. Institution directory/profile page

## 18. Evaluation criteria for future design options
When comparing future prototype variations, evaluate them using these criteria:
1. Does the homepage feel like a real public government digital platform?
2. Does it feel more like IPEMIS in structure, not like a dashboard?
3. Is the hero/banner strong enough?
4. Are typography and image treatment strong enough?
5. Are notices handled well?
6. Is public information/service architecture clean?
7. Is login/domain logic sensible?
8. Do dashboards feel practical and not generic?
9. Does each role dashboard show useful first-page content?
10. Is the design functional and user-friendly?
11. Is it bilingual-friendly?
12. Is it appropriate for Ministry-level presentation?

## 19. Final working principle
The goal is not just to produce beautiful screens.

The goal is to produce a prototype that clearly communicates:
- public information and services,
- structured admissions and notices,
- role-based operations,
- Ministry-level visibility,
- practical usability,
- and a believable path to a real government system.
