# Domain Research — Textile Institution Management System

**Phase:** P3a Part 1 (pm-3-design) · **Date:** 2026-10-15 · **Input:** `.claude-project/docs/PRD.md` v1

## Industry
Public-sector EdTech / GovTech: a ministry-level education management information system (EMIS) with a citizen-facing service portal and professional license verification. Client: Ministry of Textiles and Jute, Bangladesh.

## Research method and limits
- The Bangladeshi reference portals named in the PRD (IPEMIS, BIDA OSS, EMIS, BTEB eSheba, motj.gov.bd, dot.gov.bd) **could not be fetched live from the research environment**: DNS lookups for the `.gov.bd` and `bidaquickserv.org` hosts failed. Their patterns below come from the PRD/Brief descriptions (Brief §6, §50), supplemented by web search.
- Web search covered comparable national education dashboards (India UDISE+), government design systems (GOV.UK, NHS, Scottish Government), KPI dashboard practice, and Bangla web typography.
- Design-intelligence tool (`analyze-design/scripts/search.py`, BM25): recommended style **"Accessible & Ethical"** (government, education, public; WCAG AAA; high contrast; 3–4px focus rings; 44px targets). Its anti-patterns: ornate design, low contrast, heavy motion, AI purple/pink gradients.

## Products analyzed

| Product | What to take | Source |
|---|---|---|
| **IPEMIS** (DPE, Bangladesh) | Strong public landing with large system statistics; a public dashboard; a clear statement of purpose; public data repository; service and institution search; help desk with video tutorials, downloadable guides and FAQ; separate login; accessibility controls. Developed under PEDP4 with interactive dashboards and analytics. Its support channel in practice is informal (a Facebook group), which argues for a first-class in-product Help Center. | Brief §6.1; Daily Star, teachers.gov.bd |
| **BIDA One Stop Service** | Single-entry service portal; service categories; application status tracking; centralized processing; service-performance figures; manuals. | Brief §6.2 |
| **EMIS (apps.emis.gov.bd)** | Statistics on the landing page; module cards; institute directory and public search; notices; one common login for several user categories; HRM and institution-profile concepts. | Brief §6.3 |
| **BTEB eSheba** | Services grouped by user type (student / guardian / institution); service search; certificate verification; results; application tracking; payment guidance; step-by-step process explanations; notices; FAQ and helpdesk. Certificate forgery cases in the news show why verification matters. | Brief §6.4; Jagonews24, Daily Star |
| **UDISE+ (India)** | Role-based logins per tier (state, district, block, school); a public "Know Your School" report card; standard and query-based reports; comparative charts; a separate GIS module. A very close analogue of our Ministry → Division → District → Institution model. | udiseplus.gov.in; officerspulse.com; iasgyan.in |
| **GOV.UK / NHS / Scottish design systems** | Status **tags are non-interactive adjectives** ("Submitted", "Under review"), never buttons. Task-list rows are fully clickable. Status colors must meet WCAG 2.2 contrast. Lower-case status text since the Dec 2023 revision. | design-system.service.gov.uk; designnotes.blog.gov.uk; designsystem.gov.scot |

## Landing Page — Standard Sections (government service portals)
Utility bar (language বাংলা/English, accessibility A-/A/A+, contrast toggle, search) → official identity header (government emblem, ministry name, platform name) → primary navigation → hero with a purpose statement and 2 CTAs → headline statistics band → "how it works / why" explainer → services grid grouped by audience → interactive map or directory → public dashboard teaser → notices list with dates and categories → help (FAQ, guides, videos, contact) → footer with ministry and department identity, important links, policies, last updated.

## Dashboard — Standard Elements (ministry / EMIS dashboards)
- **Scope selector + breadcrumb** (National › Division › District › Institution); every widget follows the selected scope.
- **4–6 headline KPIs** at the top, with more below the fold. KPI practice warns against building "for display, not decisions"; the PRD's guiding question ("Where does the Ministry need to pay attention today?") fixes this.
- **Exception-first layout:** alert/attention list beside the KPIs; traffic-light status with label and icon.
- **Choropleth map** with labelled regions and a table alternative (chart guidance from the design tool: "include text labels, provide data table alternative, drill on click").
- **Comparison table/ranking** of sub-units with sort and status.
- **Trend line** for attendance; distinct line patterns for colour-blind users.
- **Export, date range, academic-session filter.**

## Institution 360° — Standard Patterns (entity profile)
Identity header (name, code, category, location, head, status, session) → tab bar → overview of KPI tiles + alerts + pending items → tables per module. The breadcrumb keeps the hierarchy path visible. This mirrors UDISE+ "school report card" and EMIS "institution profile".

## Service Catalogue & Tracking — Standard Patterns
Service cards (name, who can apply, documents, fee, processing time, Start) → multi-step form with review page → reference number on submit → status timeline (adjective tags, who/when per step) → action-required banner with "Edit and resubmit".

## Verification — Standard Patterns
A single number input → clear result card (Valid / Not found) with minimum personal data, issuing authority and verification timestamp → guidance on wrong numbers. Paid flows show the price before the search.

## Typography for Bangla + English
- **Hind Siliguri** is built for UI, with Latin glyphs matched to the Bengali, available on Google Fonts. Caveat: some weights reportedly mis-draw "১".
- **Noto Sans Bengali** has full coverage and multiple weights; a UI variant exists.
- **Nikosh** is common in Bangladeshi government documents, but its licence restricts derivatives. **Not used** for the web UI.
- **Decision:** pair the Latin UI font of each variation with **Noto Sans Bengali** (or Noto Serif Bengali for a serif variation) via Google Fonts, which the environment can reach.

## Domain facts for demo content (all prototype numbers labelled "Demo / Illustrative Data")
- Institution categories under the Department of Textiles: **Textile Engineering Colleges** (degree; affiliated to BUTEX; secondary sources say 7–8), **Textile Institutes** (diploma; secondary sources list 8–10), **Textile Vocational Institutes** (no reliable count found). Counts conflict between sources, so the PRD rule "use only verified numbers" applies (Q-29).
- Administrative geography: **8 divisions, 64 districts**. Boundaries come from geoBoundaries gbOpen BGD ADM1/ADM2 (CC BY 4.0, attribution required) and are used for the prototype map.
- Modern official spellings: Chattogram, Barishal, Rajshahi, Cumilla, Jashore, Bogura.

## PRD Reference Analysis

| PRD reference | Actual UI pattern applied | Notes |
|---|---|---|
| IPEMIS public dashboard + help desk | Stats band, public dashboard page, Help Center with FAQ, guides and videos, and an accessibility toolbar | Help is in-product (IPEMIS relies on informal support) |
| BIDA OSS one-stop service + tracking | Service catalogue grouped by audience; status timeline; "Track application" with a reference number | — |
| EMIS institute directory | Directory with filters, cards and a public profile | — |
| BTEB eSheba verification | Verification is a single number input with a result card | SOW: payment before checks (verifier workspace) |
| "Ministry Command Dashboard" | Scope bar + 10 KPIs + division map + institution health ranking + alert center | Exceptions are more visible than normal records (Brief §46) |
| "Single Source of Truth" | Student master record with lifecycle stepper; "View history" on records | — |

## Sources
- [IPEMIS and the future of primary education — The Daily Star](https://thedailystar.net/opinion/views/news/ipemis-and-the-future-primary-education-4190151)
- [teachers.gov.bd IPEMIS FAQ](https://www.teachers.gov.bd/content/details/1244032)
- [How can students verify their certificates online — Dhaka Tribune](https://www.dhakatribune.com/bangladesh/education/367932/how-can-students-verify-their-certificates-online)
- [UDISE+ portal](https://udiseplus.gov.in/ud/homePage/) · [UDISE+ overview — officerspulse](https://officerspulse.com/?p=38466) · [UDISE+ 2025-26 report — iasgyan](https://www.iasgyan.in/daily-current-affairs/udise-2025-26-report-trends-transformations-and-educational-governance)
- [GOV.UK Tag component](https://design-system.service.gov.uk/components/tag/) · [Task list pattern iteration — GOV.UK Design Notes](https://designnotes.blog.gov.uk/2023/12/15/working-as-a-community-to-iterate-the-task-list-pattern/) · [Scottish Government status tag](https://designsystem.gov.scot/components/status-tag)
- [KPI dashboard best practices — ClearPoint](https://www.clearpointstrategy.com/blog/kpi-dashboard-best-practices) · [Dashboard design best practices — FusionCharts](https://www.fusioncharts.com/blog/dashboard-design-best-practices/)
- [Hind Siliguri — Fontsource](https://fontsource.org/fonts/hind-siliguri/about) · [Noto Sans Bengali — Fontsource](https://fontsource.org/fonts/noto-sans-bengali/about) · [Nikosh — maateen.me](https://fonts.maateen.me/nikosh/)
- [Textile Engineering College, Chittagong — Wikipedia](https://en.wikipedia.org/wiki/Textile_Engineering_College,_Chittagong) · [List of textile engineering colleges — textilefashionstudy](https://textilefashionstudy.com/?p=1318)
- [geoBoundaries (BGD ADM1/ADM2, CC BY 4.0)](https://www.geoboundaries.org/)
