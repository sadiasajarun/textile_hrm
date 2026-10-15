# Textile Institution Management System — Variation Prompts (P3b)

Three representative pages × three design systems = 9 preview screens. Each prompt is the **Style DNA prefix** (from `DESIGN_SYSTEM_{A,B,C}.md`) plus the shared **page content contract** below, plus the variation-specific layout notes.

**Global rules for all 9 screens**
- Desktop frame: root wrapper `max-width: 1440px`, centered.
- Floating `var-nav-bar` (fixed, top right): links to A/B/C of the same page, 01/02/03 of the same variation, and a close (X) link to `showcase-ALL.html`.
- Lucide SVG icons only. No emoji. Every clickable element has `cursor-pointer` and a visible focus ring.
- Every figure, chart and map shows a **"Demo / Illustrative Data"** tag. Unconfirmed items carry a **TBD** tag.
- A বাংলা | English toggle works on key labels (nav, hero, KPI labels, sidebar). Layout allows longer Bangla strings.
- Institution and person names are fictional (institutions are named after rivers). Divisions and districts are real.
- The map uses real division and district boundaries (geoBoundaries, CC BY 4.0), credited in the footer.

---

## Page Content Contracts

### Page 01 — `01-landing` (Public Home) · PRD §6.1 `/` · P0 #1 · demo step 1
1. **Utility bar:** language toggle, A− A A+, contrast, Help, Login.
2. **Identity header:** flag mark, "Government of the People's Republic of Bangladesh", "Ministry of Textiles and Jute", platform name "Textile Institution Management System".
3. **Primary nav:** Home · About · Institutions · Public Dashboard · Admissions · Services · Notices · Results / Verification · Resources · Help & Support · Login.
4. **Hero:**
   - Headline: "Connecting Bangladesh's Textile Institutions Through One Digital Platform".
   - Supporting line from the PRD.
   - CTAs: Explore Institutions (primary), View Public Dashboard (secondary).
   - Visual: Bangladesh division map with institution nodes and a "Ministry → Division → District → Institution" flow.
5. **Textile Education at a Glance:** 6 KPI cards (Engineering Colleges, Textile Institutes, Textile Vocational Institutes, Students, Teachers, Active Institutions), each tagged Demo.
6. **Why the Platform Exists:** Before (5 items) → Centralized Platform → After (5 items).
7. **Institution Network:** map with division filter chips plus a category filter; a selected-division panel listing institutions with "View profile".
8. **Public Services:** 11 service cards grouped by audience (Students & Applicants · Institutions · Professionals & Organizations (Phase 2) · Everyone).
9. **Public Dashboard teaser:** institutions by category, students by division, programs; "Open public dashboard".
10. **Admissions highlight:** cycle 2026–27, key dates, Apply / Track.
11. **Latest notices:** 4 notice cards (title, date, category, issuing authority, attachment).
12. **Help & Support cards:** FAQ, User guides, Video tutorials, Contact help desk.
13. **Footer:** ministry and department identity, important links, privacy, terms, accessibility, contact, version and last updated, map data credit.

### Page 02 — `02-ministry-dashboard` (Ministry Super Admin) · PRD §6.2 `/ministry/dashboard` · P0 #5 · demo step 3
1. **App shell:** Ministry sidebar (Dashboard, Hierarchy, Alerts, Live Attendance, Admissions, Budget & Assets, Reports, Licenses, Setup, Users & Roles, Integrations) and a top bar (search, notifications with count, language, profile "Farhana Ahmed — Ministry Super Admin").
2. **Scope bar:** All Bangladesh › Division › District › Institution, plus Type, Session 2026–27, Date: Today, Export, Customize dashboard.
3. **Headline question:** "Where does the Ministry need to pay attention today?" with a summary sentence.
4. **10 KPI cards:** Total Institutions, Total Students, Total Teachers, Today's Student Attendance, Today's Teacher Attendance, Active Admission Cycle, Budget Utilization, Assets / Equipment, Pending Approvals, Institutions Requiring Attention. Each has a delta and links to detail.
5. **Division map:** choropleth by attendance health (traffic light with labels), value labels, legend, selected-division callout with "Open division".
6. **Alert Center panel:** 6 alerts with severity, issue, institution, responsible role, age/SLA, View / Take action. Link "View all alerts".
7. **Institution health ranking:** "Institutions requiring attention" table with indicators (attendance, results, reporting, budget, assets, teachers) as traffic-light cells, plus an overall status.
8. **Attendance trend:** 14 days, students vs teachers, with an 80% threshold line.
9. **Admission cycle progress:** stepper plus counts. **Budget utilization by division:** bars.

### Page 03 — `03-institution-360` (Institution 360°, Ministry view) · PRD §6.2 `/ministry/institutions/:id` · P0 #7 · demo step 5
1. **App shell:** same as 02, with "Hierarchy" active.
2. **Breadcrumb:** Ministry › Chattogram Division › Chattogram District › Karnaphuli Textile Institute.
3. **Identity header:** emblem/initials, name, code TI-CTG-014, category Textile Institute, division, district, principal "Md. Saiful Islam", status Active, session 2026–27, actions (View history, Export profile, Contact principal).
4. **14 tabs:** Overview (active) · Students · Teachers & Staff · Classes · Attendance · Results · Finance · Assets · Procurement · Library · Leave / HR · Certificates · Alumni · Reports.
5. **"One institution. One complete digital record."** banner.
6. **Overview:**
   - KPI tiles: Students, Teachers, Today's attendance (below the 80% threshold), Budget utilization, Asset issues, Pending requests.
   - Alerts for this institution.
   - Attendance by class today (table with recorded / not recorded / pending sync).
   - Pending student service requests (status tags, age vs SLA).
   - Budget allocated / used / remaining.
   - Results publication by semester.
   - Assets by status.
   - Recent activity log (who, what, when).

---

## Variation Prompts

### A — Civic Clarity (GOV.UK + Stripe Docs)
**Style DNA:** see DESIGN_SYSTEM_A.md.
- **A-01-landing:** Editorial left-aligned hero (7/5 split): large Public Sans headline left, flat green division map right. The stats band is a hairline-divided row with numbers only, no cards. Before/After as two plain lists with an arrow column. Services in a 3-column list of hairline-separated rows (icon, name, one line, arrow), grouped under overline headings. Notices as a dated list. The 4px flag stripe sits under the header.
- **A-02-ministry-dashboard:** Light sidebar. The page title is the headline question in H1 600. KPIs are a 5×2 grid of hairline cards. The map (left, 7 cols) beside the alert list (right, 5 cols) as hairline rows with a severity dot. The ranking table uses dot status cells. Trend line in ink with a dashed threshold.
- **A-03-institution-360:** Identity header as a plain block with a facts definition list in 4 columns. Underline tabs. Overview in a 12-col grid with hairline panels and dot status tags.

### B — Heritage Weave (warm national craft)
**Style DNA:** see DESIGN_SYSTEM_B.md.
- **B-01-landing:** Centered hero on cream: kicker "বস্ত্র ও পাট মন্ত্রণালয়", Fraunces display headline, pill CTAs, and a large rounded map card with a woven band below. Stats as 6 rounded cards with tinted icon circles. Before/After as two rounded cards with a central green "Platform" medallion. Services as rounded cards with pastel icon tiles in audience groups. Jamdani diamond dividers between sections.
- **B-02-ministry-dashboard:** Deep green woven sidebar with a gold active marker. Fraunces page title. KPI cards rounded with warm shadow; deltas as pastel pills. The map card and alert cards each have a terracotta left band. The ranking table sits in a rounded card with pastel pill statuses. Trend as soft area charts.
- **B-03-institution-360:** Rounded hero card for the identity: emblem medallion, Fraunces name, chip facts. Pill segmented tabs (scrollable). Overview cards with warm shadow and pastel pills; the "one record" banner uses a woven edge.

### C — Command Center (ops console)
**Style DNA:** see DESIGN_SYSTEM_C.md.
- **C-01-landing:** Navy top identity strip. White nav with a command-style search. Hero split: headline left; right a live-looking "national status" panel (map with value labels and a 3-row mini table) inside a crisp bordered panel with a Live dot. Stats as a dense 6-column metric strip. Before/After as a comparison table. Services as a compact 4-column grid with badges. Notices as a dense table.
- **C-02-ministry-dashboard:** Navy sidebar with an emerald bar. Top bar with `⌘K` search and "Last updated". KPI strip 5×2 with sparklines and solid delta badges. The map panel shows numeric labels. The alerts panel uses solid badges and red-tinted critical rows with an overdue counter. The dense ranking table has solid badge cells. Trend with grid lines.
- **C-03-institution-360:** Compact identity bar with a monospace code and solid status badge. Underline tabs with count badges. Dense 3-column panel grid; tables with sticky headers; activity log as a monospace-timestamp list.
