# DESIGN_SYSTEM_F — "Action & Service Hub"

## 1. Concept
Built for the person who has to *get something done*. Citizens are greeted with "What do you need to do today?", and officers land on **their queue**: Needs attention, My pending actions, Quick actions, Recently updated. Analytics are compact and secondary. Every row carries a clear next action.

## 2. Why it fits a Bangladesh government ministry
- Most daily users are not analysts. Principals, teachers, students and district officers need to approve, record, submit and track. A queue-first design lowers training cost.
- It mirrors the citizen-service model of BIDA OSS and eSheba (find service → apply → track), which the public already uses.
- It supports the Ministry's goal of **faster approvals and follow-up** by making ageing and SLA visible on every item.

## 3. Borrowed from public-sector UX research
| Source | Pattern used |
|---|---|
| BIDA One Stop Service | Single service entry, status tracking, processing time per service |
| BTEB eSheba | Services by user need, verification, application status, payment guidance |
| GOV.UK task list | Clear status per task, adjectives as status, whole row clickable |
| IPEMIS | Help centre and login connected to the portal |

## 4. How it differs from A/B/C
- **Not C:** calm and low-density. The queue replaces the console; there's no navy sidebar, no live clocks and at most one small chart.
- **Not A/B:** task-led instead of content-led or heritage-led; inbox and drawer patterns everywhere.
- **New:** a public **service search + status checker**; internal **drawers with timeline + decision buttons**; counts on every nav item.

## 5. Public page architecture (01, 02)
1. **Header:** flag + "Ministry of Textiles and Jute" + "Textile Institution Services"; Accessibility · বাংলা|English · **Login**; navigation row below
2. **Hero:** "What do you need to do today?" + a large task search that filters the service list live + 4 task chips
3. **Public services:** 9 list rows (who it is for · steps · typical time · Start) with a live count and a "no service matches" state. Right column: **Track application** (working lookup with timeline) and **Admission 2026–27** key dates + Apply
4. **Notices** (category dot, title, date) beside **Verify a certificate or license**
5. **Need help?** guide / tutorial / help-desk cards + FAQ
6. Light footer

**02 = Service Centre:** a section index (All services · Find an institution · Track application · Verify) beside one page of task sections: service search list, institution finder (filters, list, profile drawer, empty state), tracking and verification.

## 6. Internal app architecture (04–10)
- **Compact left rail** (224px): 4–6 role groups with red **counts** (e.g. "Approvals 31"); scope at the bottom. On phones it becomes a full-screen menu.
- **Top bar:** breadcrumb · Prototype Role Preview · language · notifications · user menu.
- **Home pattern for every role:** a headline that states the workload ("14 items need your decision") → **queue** of actions, each with severity bar, type tag, age vs SLA and one primary button → right column with **Today's situation** (figures as a list) and **Quick actions**.
- **Ministry (04):** pill tabs Needs attention / Pending for me / Recently updated; type chips (Attendance · Approvals · Reports & results · Budget & assets) filter the queue; "By division" opens a **drawer** that drills Chattogram → districts → institutions → 360°.
- **Division / District (05, 06):** action queue first; districts and institutions as tabs or a list; a scope card that demonstrates permission denied; report submission dialog.
- **Principal (07):** decision queue filtered by chips; review drawer (timeline, Approve / Request correction / Reject → confirm); class attendance table.
- **Teacher (08):** 3 tasks for today, then the schedule; **Student (09):** things to do, then a searchable launcher for all 15 services; **360° (10):** open items for the institution first, pill tabs below.

## 7. Navigation strategy
Same role groups as D/E, shown as a rail with counts. Common actions are on the home page, so users rarely need the menu.

## 8. Typography
- **Lexend** 400/500/600 (Latin, designed for reading ease) + **Noto Sans Bengali** 400/500/600.
- H1 28/36 · H2 20/28 · H3 17/24 · Body 15/24 (app) and 16/26 (public) · Small 13/20.

## 9. Colors
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F4F5F4` | light grey canvas |
| `--surface` | `#FFFFFF` | cards |
| `--band` | `#EAF4EE` | hero tint, selected |
| `--ink` / `--ink-2` / `--ink-3` | `#1A1F1C` / `#4A524E` / `#5D6661` | text (15.3 / 7.4 / 5.4 : 1 on canvas) |
| `--line` | `#E1E4E2` | borders |
| `--primary` | `#0A7A4B` | government green: actions (4.9:1 on canvas, 5.4:1 on white) |
| status | success `#137A3F` · warning `#995700` · danger `#BE2830` · info `#2557A7` · neutral `#5D6661` | |

## 10. Spacing
4px grid · card padding 16px · row height 56px (queue) · gap 16px · public section padding 56px.

## 11. Radius
8px cards and inputs · 8px buttons · 999px only for count badges.

## 12. Borders / shadows
1px `--line`, no resting shadow. Hover shows a 1px `--primary` border; drawers get `0 10px 40px rgba(0,0,0,.18)`.

## 13. Icon use
Lucide 20px. Each queue item type has a fixed icon (approval = inbox, attendance = user-check, report = file-text, asset = package, result = clipboard-check).

## 14. Status pattern
**Solid-dot + bold label + age**, e.g. `● Under review · 4 days (SLA 3) — overdue`. Overdue is always written out in words, not just colored.

## 15. Data visualization rules
At most one chart per page, small and secondary (sparkline or one bar list). Numbers come first.

## 16. Form rules
One question per step on mobile; save draft; review page; the reference number is shown on submit; tracking timeline afterwards.

## 17. Bilingual behavior
Toggle in the header and the public utility row. Service names, queue labels, statuses, buttons, headings and table headers translate; figures use Bangla digits.

## 18. Accessibility
- Queue rows are full-width buttons with a visible focus state; drawers use `<dialog>` with focus return.
- AA contrast, 44px targets, high-contrast option, plain language.

## 19. Mobile behavior
- **Public:** the search-first hero works one-handed; services become full-width rows.
- **App:** the rail becomes a bottom bar of 5 groups; the queue is the home screen; drawers open full-screen.

## 20. Do / Don't
- ✅ Every row has a next action; age and SLA are visible; quick actions sit on the home page.
- ❌ No analytics walls, no dense tables on home, no hidden actions in menus, no dark sidebar.

---

## D / E / F at a glance

| | D National Service Portal | E Connected Institution Network | F Action & Service Hub |
|---|---|---|---|
| Public hero | Official title + services + statistics panel | Network map + institution search | Task search + top tasks + status checker |
| App shell | Top tabs, green band, no sidebar | Light sidebar + hierarchy bar | Compact rail with counts |
| Ministry home | Summary + attention table + pending | Map/list drill-down + comparison + trend | Attention queue + quick actions + recent |
| Fonts | Noto Sans + Noto Sans Bengali | Source Sans 3 + Hind Siliguri | Lexend + Noto Sans Bengali |
| Canvas | White / off-white | Light neutral | Light grey |
| Accent | Government green, red line | Deep teal + ink blue | Government green |
| Status | Tinted tag + icon | Health dot + word + value | Dot + bold label + age |
| Radius | 6px | 10px | 8px |
