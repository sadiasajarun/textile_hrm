# Textile Institution Management System — Design Guide

**Project:** Textile Institution Management System, PRD v1 (2026-10-14)
**Client:** Ministry of Textiles and Jute, Bangladesh
**Designer:** AI pipeline (P3), reviewed by PM and client
**Timeline:** TBD (PRD Q-43)
**Type:** Web platform (public website + role-based web app). Desktop-first for Ministry and admin, tablet for institutions, mobile for student, teacher and public services.
**Inputs:** `docs/PRD.md`, `design/textile_hrm_DomainResearch.md`

---

## Design Philosophy

**Core Inspiration (Must Study):**
1. **IPEMIS** — public landing with large statistics, public dashboard, help desk, accessibility controls.
2. **BIDA One Stop Service** — service catalogue, application tracking, one-stop-service thinking.
3. **BTEB eSheba / EMIS** — services by audience, institution directory, verification, notices.
4. **GOV.UK Design System** — non-interactive status tags, clear forms, check-answers pages, plain language.
5. **UDISE+ dashboards** — tiered roles (national → district → school) and a public report card.

**The Four Pillars:**
- **Public Portal** = IPEMIS + BTEB eSheba: purpose first, statistics, services by audience, help built in.
- **Ministry Command Dashboard** = UDISE+ / ops dashboards, exception first: "Where does the Ministry need to pay attention today?"
- **Institution 360°** = EMIS institution profile: one record, every module, hierarchy context always visible.
- **Workflow Tracking** = BIDA OSS + GOV.UK: every request has a reference number, a status tag, a timeline and a next action.

**Tone:** official, trustworthy, modern, structured, calm, data-driven. Not commercial SaaS and not an old-style government portal [PRD §4.9].

---

## Page Count: 108 Total Pages (10 roles)

| Role folder | Pages | P0 | P1 |
|---|---:|---:|---:|
| `public` | 21 | 7 | 3 |
| `ministry` | 30 | 11 | 2 |
| `division` | 4 | 0 | 2 |
| `district` | 3 | 0 | 1 |
| `institution-admin` | 2 | 0 | 0 |
| `principal` | 20 | 3 | 7 |
| `teacher` | 8 | 1 | 3 |
| `student` | 15 | 5 | 1 |
| `alumni` | 1 | 0 | 1 |
| `verifier` | 4 | 1 | 0 |
| **Total** | **108** | **28** | **20** |

**Representative pages for the 3 variations (P3c):**
1. `01-landing` — Public Home (P0 #1)
2. `02-ministry-dashboard` — Ministry Dashboard (P0 #5, "the most important prototype screen")
3. `03-institution-360` — Institution 360° (P0 #7)

---

## Design System Quick Reference (shared foundations; variations restyle these)

### Colors (functional roles; each variation reinterprets them)
- **National Green** `#006A4E` — the flag green: primary identity, CTA and active states.
- **National Red** `#F42A41` — the flag red: identity accent only (flag mark, critical alert stripe). Body-text red is a darker shade for contrast (≥ 4.5:1).
- **Status (label + icon, color is extra):**
  - Success / Approved / Present — green family.
  - Warning / Under Review / Late — amber family.
  - Danger / Rejected / Absent / Critical — red family.
  - Info / Submitted — blue family.
  - Neutral / Draft / Inactive — gray.
- **Neutrals:** light content backgrounds in every variation [Brief §41: "light dashboard backgrounds"].

### Typography
- **Latin UI font** per variation, paired with **Noto Sans Bengali** (or **Noto Serif Bengali** for serif headings) for বাংলা.
- **Scale:** Display 48 · H1 36 · H2 28 · H3 22 · H4 18 · Body 16 (15 in dense tables) · Small 14 · Caption 12.
- **Tabular figures** (`font-variant-numeric: tabular-nums`) for all KPIs and tables.
- **Bangla line-height** at least 1.6. Components allow +30% label length for Bangla.

### Spacing and Layout
- 4px base grid. Card padding 16–28px depending on variation density. Section padding 48–96px on public pages.
- **Authenticated shell:** top bar 64px · left sidebar 264px (icon rail 72px at tablet) · breadcrumb/scope bar · main content (max 1440px).
- **Breakpoints:** 375 / 768 / 1024 / 1440 [design rules].

### Key Components (all variations)
Header · Public navigation · Utility bar (language, A-/A/A+, contrast) · Sidebar · Breadcrumb · Hierarchy scope selector · KPI card · Trend card · Alert card · Status tag · Data table · Filter drawer · Search · Institution card · Service card · Notice card · Timeline · Approval stepper · Activity log · Profile summary · Empty state · Error state · Confirmation modal · Permission warning · Notification panel · Help card · Map + tooltip · Chart container · Export action [PRD §4.2].

---

## Layout Archetypes

| Code | Archetype | Layout |
|---|---|---|
| **PUB-HOME** | Public landing | Utility bar · identity header + nav · hero (statement + CTAs + map) · stats band · sections stack · footer |
| **PUB-LIST** | Public directory/list | Page header · filter bar (chips + selects) · results grid/list + map toggle · pagination · empty state |
| **PUB-DETAIL** | Public detail | Breadcrumb · title block · 2 columns 8/4 (content / facts card) · related items |
| **PUB-FORM** | Public multi-step application | Stepper (top on mobile, left on desktop) · form card · sticky action bar (Back / Save draft / Next) · review page |
| **PUB-LOOKUP** | Lookup / verification / tracking | Centered card with a single input → result card states (found / not found / blocked) |
| **PUB-CONTENT** | Content/resources/help | Page header · tabs or side index · accordion/cards · help CTA |
| **AUTH** | Authentication | Split 5/7: identity panel (flag, ministry, purpose) / form card. Mobile: stacked |
| **APP-DASH** | Authenticated dashboard | Scope bar + breadcrumb · KPI row · map/primary visual + alert panel · ranking/trend row · tables |
| **APP-LIST** | Management list | Page title + primary action · toolbar (search, filters, export) · table with status tags · pagination · detail drawer |
| **APP-DETAIL** | Entity 360°/record | Identity header (avatar/emblem, key facts, status) · tab bar · tab content (KPI tiles + tables) · history link |
| **APP-INBOX** | Approval inbox / review | Status tabs + queue table → review page: 2 columns (submission + documents / decision panel + timeline) |
| **APP-FORM** | Create/edit/setup | Form card with sections, inline validation, sticky actions; or right drawer for quick create |
| **APP-MOBILE** | Student/teacher mobile-first | Single column cards, bottom tab bar under 768px, sidebar at 1024px and up |

---

## Page-by-Page Design Brief

Priority: P0 / P1 / S (supporting). Features per page: PRD §6.

### PUBLIC (21)
| # | Route | Page | Pri | Arch | Layout brief |
|---:|---|---|:-:|---|---|
| 1 | `/` | Home (Landing) | P0 | PUB-HOME | Hero (headline, supporting line, Explore Institutions / View Public Dashboard, Login) + division map with institution nodes · "Textile Education at a Glance" 6 KPI cards (Demo label) · Before → Platform → After band · Institution Network (map + filters) · Directory teaser · 11 service cards by audience · Public Dashboard teaser · Admissions highlight · Latest notices · Help cards · footer |
| 2 | `/about` | About | S | PUB-CONTENT | Purpose + pitch · transformation band · hierarchy diagram · Phase 1/2 cards |
| 3 | `/institutions` | Directory & Map | P0 | PUB-LIST | Search + filters (type, division, district, program, status) · map/list toggle · institution cards (name, type, location, contact, programs, View Profile) · pagination · empty state |
| 4 | `/institutions/:code` | Institution Public Profile | P0 | PUB-DETAIL | Title + type tag · facts card (division, district, address, contact) · programs list · location map · related notices |
| 5 | `/dashboard` | Public Dashboard | P0 | APP-DASH (public shell) | Aggregates only: count by category (bar), regional distribution (map + table), students/teachers totals, program distribution (donut), trends · Demo labels · transparency message |
| 6 | `/admissions` | Admissions | P0 | PUB-CONTENT | Current cycle card + dates timeline · eligibility, seats, documents · notices · result link · migration · instructions stepper · Apply / Track buttons |
| 7 | `/admissions/apply` | Admission Application | S | PUB-FORM | 5 steps · upload rules · duplicate / missing / closed states · confirmation with number |
| 8 | `/admissions/results` | Admission Result Lookup | S | PUB-LOOKUP | Roll/application number → result card (Selected / Not selected, allocated institution) · not found · correction notice |
| 9 | `/services` | Public Services | S | PUB-CONTENT | Audience tabs (Student, Institution, Professional, Organization) · service cards with "How it works" |
| 10 | `/track` | Track Application | S | PUB-LOOKUP | Number input → type, status tag, timeline, next action · not found |
| 11 | `/notices` | Notices & Circulars | P1 | PUB-LIST | Category chips · search · date sort · notice cards (title, date, category, authority, attachment) |
| 12 | `/notices/:id` | Notice Detail | P1 | PUB-DETAIL | Title, meta, body, attachment download, related notices |
| 13 | `/verify` | Verification | P0 | PUB-LOOKUP | Explainer · result types · Register as Verifier / Sign in to Verify · "free lookup TBD" note |
| 14 | `/license/apply` | License Application | S | PUB-FORM | 5 steps · duplicate warning · confirmation |
| 15 | `/verifier/register` | Verifier Registration | S | PUB-FORM | Organization, contact, credentials, terms → Pending approval / Active |
| 16 | `/resources` | Resources | S | PUB-CONTENT | 8 tabs · file cards (type, size, download) |
| 17 | `/help` | Help & Support | P1 | PUB-CONTENT | Search help · FAQ accordion · topic cards (login, tracking, guides) · contact card |
| 18 | `/policies` | Policies | S | PUB-CONTENT | Tabs: Privacy / Terms / Accessibility (placeholder text labelled) |
| 19 | `/auth/login` | Login | P0 | AUTH | Identifier + password · Forgot / Help · inactive message state · Demo role picker |
| 20 | `/auth/forgot-password` | Forgot Password | S | AUTH | Identifier → confirmation |
| 21 | `/auth/select-workspace` | Workspace Selector | S | AUTH | Role/scope cards · remember default |

### MINISTRY (30)
| # | Route | Page | Pri | Arch | Layout brief |
|---:|---|---|:-:|---|---|
| 22 | `/ministry/dashboard` | Ministry Dashboard | P0 | APP-DASH | Scope bar (All Bangladesh + filters) · 10 KPI cards with deltas · division choropleth (traffic light) + Alert Center panel · institution health ranking + attendance trend · customize button |
| 23 | `/ministry/divisions/:id` | Division Drill-down | P0 | APP-DASH | Breadcrumb Ministry › Division · scoped KPIs · district map + breakdown table |
| 24 | `/ministry/districts/:id` | District Drill-down | P0 | APP-DASH | Breadcrumb … › District · KPIs · institution comparison table (traffic light) |
| 25 | `/ministry/institutions` | Institution List | P0 | APP-LIST | Filters (division, district, type, status, health) · table (code, name, type, location, principal, students, teachers, attendance %, health) |
| 26 | `/ministry/institutions/:id` | Institution 360° | P0 | APP-DETAIL | Header (name, category, division, district, principal, status, session) · 14 tabs · Overview: KPIs + alerts + pending requests |
| 27 | `/ministry/alerts` | Alert Center | P0 | APP-LIST | Filters (type, severity, region, role, age) · alert rows (issue, institution, role, age/SLA, severity, View/Take action) |
| 28 | `/ministry/attendance` | Live Attendance Monitor | P0 | APP-DASH | View tabs (Today, Institution, Class, Teacher, Student, Trend) · live counters · low-attendance list · last-updated indicator |
| 29 | `/ministry/admissions` | Admission Overview | P0 | APP-DASH | Active cycle stepper (13 steps) · funnel · cycles table · pending issues |
| 30 | `/ministry/admissions/cycles/:id` | Admission Cycle Detail | P0 | APP-DETAIL | 12-step stepper with status + counts + links |
| 31 | `/ministry/admissions/cycles/new` | Admission Cycle Setup | S | APP-FORM | Sections: details, eligibility, quotas, documents (TBD labels) |
| 32 | `/ministry/admissions/applications` | Applications & Validation | S | APP-LIST | Table + drawer (documents, validate / request correction / ineligible) |
| 33 | `/ministry/admissions/results` | Result Publication & Allocation | S | APP-LIST | Publish (confirm) · allocation table · seat-full / multi-choice flags · correct result |
| 34 | `/ministry/admissions/migrations` | Student Migration | S | APP-LIST | Requests table · approval drawer (TBD) |
| 35 | `/ministry/budget-assets` | Budget & Asset Overview | P0 | APP-DASH | Budget KPIs (allocated, used, remaining, %) · institution comparison bars · abnormal flags · asset status KPIs · damaged/lost queue |
| 36 | `/ministry/budget/allocate` | Budget Allocation | S | APP-FORM | Institution, amount, period, note · allocation history |
| 37 | `/ministry/assets/allocate` | Asset Allocation | S | APP-FORM | Institution, asset details · history |
| 38 | `/ministry/reports` | Consolidated Reports | P0 | APP-LIST | Report area chooser (13) · filters · table + chart · export |
| 39 | `/ministry/licenses` | License Queue | S | APP-INBOX | Status tabs · table (number, applicant, date, status, age, duplicate flag) |
| 40 | `/ministry/licenses/:id` | License Review | S | APP-INBOX | Applicant + documents · checklist (TBD) · Approve / Reject / Request correction · timeline |
| 41 | `/ministry/verifiers` | Verifier Organizations | S | APP-LIST | Table (org, membership, checks, payment) · approve/deactivate |
| 42 | `/ministry/setup/institutions` | Institution Setup | S | APP-LIST | Table + create/edit drawer (unique code, duplicate warning, region required, admin assignment) |
| 43 | `/ministry/setup/categories` | Categories | S | APP-LIST | Category list + counts · create/edit |
| 44 | `/ministry/setup/regions` | Divisions & Districts | S | APP-LIST | Division → district nested list · status |
| 45 | `/ministry/users` | User Management | P1 | APP-LIST | Table (name, ID, contact, roles+scopes, status, last login) · create drawer with repeatable role+scope |
| 46 | `/ministry/roles` | Roles & Permissions | P1 | APP-FORM | Role list + permission matrix (module × action) · effective-access explainer |
| 47 | `/ministry/integrations` | Gov Integration (MY GOV) | P2 | APP-DETAIL | "Subject to confirmation" banner · 3 placeholder cards · status states |
| 48 | `/ministry/notifications` | Notifications | S | APP-LIST | Filter tabs · notification list (unread, click-through) |
| 49 | `/ministry/search` | Global Search | S | APP-LIST | Grouped results by entity · empty state |
| 50 | `/ministry/profile` | My Profile | S | APP-FORM | Profile, roles+scopes, password, language |
| 51 | `/ministry/access-denied` | Permission Denied | S | PUB-LOOKUP (in shell) | Lock illustration (icon) · message · own scope · Go to my dashboard |

### DIVISION (4) · DISTRICT (3) · INSTITUTION-ADMIN (2)
| # | Route | Page | Pri | Arch | Layout brief |
|---:|---|---|:-:|---|---|
| 52 | `/division/dashboard` | Division Dashboard | P1 | APP-DASH | Scoped Ministry layout: KPIs, district map + breakdown, institution list, pending actions |
| 53 | `/division/districts/:id` | District View | P1 | APP-DASH | District KPIs + institution comparison |
| 54 | `/division/institutions/:id` | Institution 360° (scoped) | S | APP-DETAIL | Read-only 360° |
| 55 | `/division/reports` | Division Reports | S | APP-LIST | Reports with fixed scope |
| 56 | `/district/dashboard` | District Dashboard | P1 | APP-DASH | Institution count, summaries, comparison table, pending requests |
| 57 | `/district/institutions/:id` | Institution 360° (scoped) | S | APP-DETAIL | Read-only 360° |
| 58 | `/district/reports` | District Reports | S | APP-LIST | Reports with fixed scope |
| 59 | `/institution/dashboard` | Institution Dashboard | S | APP-DASH | Institution KPIs, alerts, read-only tabs |
| 60 | `/institution/reports` | Institution Reports | S | APP-LIST | Reports with fixed scope |

### PRINCIPAL (20)
| # | Route | Page | Pri | Arch | Layout brief |
|---:|---|---|:-:|---|---|
| 61 | `/principal/dashboard` | Institution Management Dashboard | P0 | APP-DASH | KPIs · My Approvals queue · alerts (low attendance, no-teacher class, asset issues, overdue) · quick actions |
| 62 | `/principal/teachers` | Teachers | S | APP-LIST | Table + Add Teacher drawer |
| 63 | `/principal/teachers/:id` | Teacher Profile | S | APP-DETAIL | Tabs: profile, classes, attendance, results, leave, activity · Extended HRM placeholder |
| 64 | `/principal/students` | Students | S | APP-LIST | Table (lifecycle tag, allocated badge) · change assignment |
| 65 | `/principal/students/:id` | Student Master Record | S | APP-DETAIL | Lifecycle stepper · tabs · "one record" banner · mismatch flag |
| 66 | `/principal/classes` | Classes | S | APP-LIST | Table + create drawer + assign teacher (overlap warning) |
| 67 | `/principal/attendance` | Institution Attendance | S | APP-DASH | Today by class (recorded / not recorded / pending sync) · counters · corrections |
| 68 | `/principal/results` | Result Review & Publication | P1 | APP-INBOX | By semester/course status · review table · Publish / Return · corrections |
| 69 | `/principal/service-requests` | Approval Inbox | P0 | APP-INBOX | Status tabs · filters (15 services, overdue) · queue rows with age vs SLA |
| 70 | `/principal/service-requests/:id` | Request Review | P0 | APP-INBOX | Student summary · form data + documents · stepper timeline · Approve / Reject / Request correction / Complete |
| 71 | `/principal/certificates` | Certificates | P1 | APP-INBOX | Applications · data comparison with mismatches · Approve & Issue (reference number) |
| 72 | `/principal/alumni` | Alumni Management | P1 | APP-LIST | Eligible list · Mark as Alumni (confirm modal) · outstanding loan flag |
| 73 | `/principal/finance` | Finance | S | APP-DASH | Budget KPIs · expense table · Record Expense drawer · flags |
| 74 | `/principal/assets` | Asset Inventory | S | APP-LIST | Status chips · table (holder, status) · assign/return/report |
| 75 | `/principal/assets/:id` | Asset Detail | S | APP-DETAIL | Details + movement timeline + gate pass entries |
| 76 | `/principal/procurement` | Procurement | P1 | APP-LIST | "Requires workflow confirmation" banner · tabs (Requests, PO, LC, Receiving, Gate Pass) · generic stepper |
| 77 | `/principal/library` | Library | P1 | APP-LIST | Tabs (Catalogue, Members, Issue/Return, Overdue, Fines, Reservations, Popular, History) |
| 78 | `/principal/leave` | Leave Approvals | P1 | APP-INBOX | Pending requests + balances table |
| 79 | `/principal/menu-access` | Menu Access | P1 | APP-FORM | Role picker + grouped menu checklist |
| 80 | `/principal/reports` | Institution Reports | S | APP-LIST | Reports, institution scope |

### TEACHER (8) — APP-MOBILE
| # | Route | Page | Pri | Arch | Layout brief |
|---:|---|---|:-:|---|---|
| 81 | `/teacher/dashboard` | Teacher Workspace | P1 | APP-MOBILE | Today's classes with attendance state · Mark my attendance · results pending · leave balance |
| 82 | `/teacher/classes` | My Classes | S | APP-MOBILE | Class cards |
| 83 | `/teacher/classes/:id` | Class Detail | S | APP-MOBILE | Tabs: Students, Content (versions), Attendance, Results |
| 84 | `/teacher/attendance` | Attendance Capture | P0 | APP-MOBILE | Class/session picker · mode toggle · roster with status buttons · submit · pending-sync and correction states |
| 85 | `/teacher/results` | Result Entry | P1 | APP-MOBILE | Marks table with inline validation · Save draft / Submit for review |
| 86 | `/teacher/leave` | My Leave | P1 | APP-MOBILE | Balance cards · apply form · requests list · withdraw |
| 87 | `/teacher/library` | Library | S | APP-MOBILE | Search · loans · fines |
| 88 | `/teacher/profile` | Profile | S | APP-MOBILE | Profile, classes, password, language |

### STUDENT (15) — APP-MOBILE
| # | Route | Page | Pri | Arch | Layout brief |
|---:|---|---|:-:|---|---|
| 89 | `/student/home` | Student Portal Home | P0 | APP-MOBILE | Today's classes · attendance ring · latest results · pending applications (tags) · notices · fees due · calendar · profile |
| 90 | `/student/classes` | Classes & Content | S | APP-MOBILE | Class list + materials |
| 91 | `/student/attendance` | My Attendance | S | APP-MOBILE | % by class · calendar · Mark attendance (when open) |
| 92 | `/student/results` | Results & Grade Table | S | APP-MOBILE | Semester selector · results · grade table · correction/incomplete states |
| 93 | `/student/services` | Services Catalogue | P0 | APP-MOBILE | Search · 15 service cards (eligibility, documents, fee, time, Start) |
| 94 | `/student/services/:service/apply` | Service Application | P0 | APP-MOBILE | Steps: Details → Documents → Fee → Review → Submit |
| 95 | `/student/requests` | My Requests | P0 | APP-MOBILE | List with status tags + next action |
| 96 | `/student/requests/:id` | Request Tracking | P0 | APP-MOBILE | Vertical timeline (who/when) · correction note → Edit & Resubmit · download when completed |
| 97 | `/student/payments` | Fees & Ledger | S | APP-MOBILE | Fees due · Pay Online (TBD gateway) · payment states · ledger table |
| 98 | `/student/advising` | Advising | S | APP-MOBILE | Advisor card · notes timeline |
| 99 | `/student/evaluation` | Teaching Evaluation | S | APP-MOBILE | Courses to evaluate · form · submitted state |
| 100 | `/student/academics` | Academics | S | APP-MOBILE | Tabs: Curriculum (TBD), Code of Conduct, Calendar |
| 101 | `/student/library` | Library | S | APP-MOBILE | Search · loans · reservations · fines |
| 102 | `/student/certificate` | Certificate | P1 | APP-MOBILE | Eligibility · Apply (disabled reason) · timeline · reference number |
| 103 | `/student/profile` | Profile | S | APP-MOBILE | Editable fields · certificate-linked fields marked "rule TBD" |

### ALUMNI (1) · VERIFIER (4)
| # | Route | Page | Pri | Arch | Layout brief |
|---:|---|---|:-:|---|---|
| 104 | `/alumni/home` | Alumni Workspace | P1 | APP-MOBILE | Alumni identity card · professional info form · restricted notice |
| 105 | `/verifier/dashboard` | Verification Workspace | S | APP-DASH | Membership card · payment/plan (TBD) · Verify now · recent checks |
| 106 | `/verifier/verify` | Verification | P0 | PUB-LOOKUP (in shell) | Number input → Valid / Not found / Expired-Suspended (greyed) · blocked states |
| 107 | `/verifier/payments` | Payments & Membership | S | APP-LIST | Pricing TBD · payment states · history |
| 108 | `/verifier/profile` | Organization Profile | S | APP-FORM | Org details, users, password |

---

## Critical Design Rules

1. **Exceptions first.** On every dashboard, problems (alerts, red/amber states) are more visible than normal records [PRD §4.13 #8].
2. **Hierarchy context always visible.** Breadcrumb or scope bar on every authenticated page: Ministry › Division › District › Institution.
3. **Status = label + icon (+ color).** Never color alone. Status tags are non-interactive adjectives (GOV.UK pattern).
4. **Public and private are visibly different.** Public pages use the public header and footer; authenticated pages use the app shell. No personal data on public pages.
5. **Demo data label.** Every KPI, chart and map shows "Demo / Illustrative Data" until verified (PRD Q-29).
6. **TBD is visible.** Unconfirmed items carry a "TBD — requires client confirmation" tag. They are never presented as final.
7. **Bilingual.** Every header has a বাংলা | English toggle. Layouts survive Bangla labels about 30% longer than English.
8. **Accessible.** 4.5:1 text contrast, 3px visible focus ring, labelled inputs, 44px touch targets, keyboard navigation, `aria-label` on icon buttons.
9. **No dead ends.** Every link resolves to a real page file; buttons without a page show a modal or toast. No `href="#"`.
10. **Every state designed.** Loading (skeleton), empty, error, permission-denied and success/failure feedback.
11. **One record, many views.** The same student, institution or asset card component appears identically in every module.
12. **Icons:** Lucide SVG only, no emoji. 20px inline, 24px standalone.

---

## Component Patterns

### KPI Card
```
┌──────────────────────────────┐
│ [icon] Label           [info]│
│ 12,480                       │  ← 28–32px tabular figure
│ ▲ 2.4% vs last month  ▁▂▃▅▆ │  ← delta (label + arrow) + sparkline
└──────────────────────────────┘
```
Clickable as a whole (links to detail). Demo label in the section header.

### Alert Card / Row
```
[severity tag] Issue title                              [View] [Take action]
Institution · Responsible role · Age 3d (SLA 2d — overdue)
```

### Status Tag
`[icon] Under review` — a non-interactive tag. Variation styles: A = dot + text, B = pastel pill, C = solid badge.

### Hierarchy Scope Bar
`All Bangladesh ▾ › Division ▾ › District ▾ › Institution ▾ | Type ▾ | Session ▾ | Date range ▾ | Export`

### Timeline / Approval Stepper
Vertical list: step icon (done / current / pending), step name, actor and timestamp, note.

### Institution Card (public)
Name · type tag · district, division · contact · programs (chips) · "View profile →".

### Service Card
Icon · service name · who can apply · documents count · fee · processing time · "Start application".

---

## Deliverables Checklist

**P3a–P3c (this stage):**
- [x] Domain research
- [x] Design guide (this file)
- [ ] DESIGN_SYSTEM_A / B / C
- [ ] Variation prompts (3 pages × 3 styles)
- [ ] 9 variation HTML pages + showcase-ALL.html

**P3d:** client picks A / B / C / Mix → `DESIGN_STATUS.md` approved.

**P3e–P3g:** full HTML for all 108 pages in role folders. Build order: P0 → P1 → S. Then QA (links, shared shell, role folders) and the PRD snapshot.

---

## Success Criteria
- ✅ A first-time visitor understands the platform within 10 seconds (hero + stats + purpose).
- ✅ The Ministry dashboard answers "where to pay attention today" at a glance (alerts + traffic-light map).
- ✅ A Ministry user reaches any institution in 3–4 clicks with the breadcrumb intact.
- ✅ Feels official and modern, with a clear Bangladesh identity, without decorative overload.
- ✅ All 108 pages designed, P0 first; responsive at 375 / 768 / 1024 / 1440.

---

**Priority Order:**
1. Public Landing (first impression for the Minister — demo step 1)
2. Ministry Dashboard (most important screen — demo step 3)
3. Hierarchy drill-down + Institution 360° (demo steps 4–5)
4. Alert → attendance (demo step 6), live attendance
5. Student service request + approval tracking, certificate flow (demo step 7)
6. Consolidated reports (demo step 8)
7. License verification (demo step 9)
8. Remaining P0, then P1, then supporting pages
