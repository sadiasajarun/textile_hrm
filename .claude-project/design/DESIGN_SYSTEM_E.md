# DESIGN_SYSTEM_E — "Connected Institution Network"

## 1. Concept
Makes the Ministry immediately *see* that every textile institution is connected to one system. The map of Bangladesh and the National → Division → District → Institution hierarchy are the main navigation. The tone is strategic: comparisons, health and trends, not operational density.

## 2. Why it fits a Bangladesh government ministry
- A Minister's first question is "what is happening across the country?". A real division/district map answers it in one glance and supports the "One Ministry. One Platform. Every Textile Institution Connected." story.
- Hierarchy is always visible, which matches how ministries delegate (Division → District → Institution).
- Ink-blue data colors and deep teal read as institutional and analytical without a fintech look.

## 3. Borrowed from public-sector UX research
| Source | Pattern used |
|---|---|
| UDISE+ | National → state → district → school drill-down; public "know your institution" discovery; statistics from the same source data |
| IPEMIS | Public dashboard and statistics prominence |
| BANBEIS | Filters by division/district/type for institution lookup |
| EMIS | Institute directory and headline numbers |

## 4. How it differs from A/B/C
- **Not B:** no heritage or craft ornament. The only motif is a faint network line in the public hero.
- **Not C:** comfortable density and a light sidebar, built around strategic comparison rather than a dense operations console.
- **Not A:** data- and map-led instead of typographic.
- **New:** the map/list split *is* the Ministry home; drill-down happens in place without leaving the dashboard.

## 5. Public page architecture (01, 02)
1. **Header:** network logomark, small flag + "Ministry of Textiles and Jute", system name; Accessibility · বাংলা|English · **Login**. Navigation sits inline from 1536px and on its own row below that
2. **Hero (faint dot grid):** "59 textile institutions. One connected network." + one sentence + institution search (opens 02 with the query) + 4 figures on an ink rule. Right: **network map**: one dot per institution, dashed links to the Dhaka hub; clicking a division opens 02 filtered to it
3. **Services by who you are:** three audience cards (Applicants and students · Graduates and organizations · Everyone) with compact service rows (steps · time · Start)
4. **Admission 2026–27:** key dates as a bar stepper + Apply / Check result / Track
5. **The network at a glance** (public dashboard): 8 division cards (institutions, students), each opening 02 filtered
6. **Notices** as a date-block list beside a tinted **verification** panel ("Is this certificate genuine?")
7. **Help:** FAQ + guides / tutorials / help desk
8. **Footer** in deep ink

**02 = Network explorer:** sticky map card (click a division) + division chips with counts → live list with name/code and type filters, result count, profile drawer, and an empty state for divisions without demo data. **Track application** and **Verify** cards below (`#track`, `#verify`).

## 6. Internal app architecture (04–10)
- **Light left sidebar** (248px): role groups (4–6); sub-items of the active group appear under it; assigned scope card at the bottom. On phones the sidebar becomes a full-screen menu and the top bar shows a compact logomark.
- **Top bar:** search · Prototype Role Preview · language · notifications · user menu. **Hierarchy bar** below it (`National › Chattogram Division › Chattogram District › Institution`); every level is a link or a drill button.
- **Ministry home (04):** situation strip (4 figures) → **map/list split**: the health map (values on each division) drives the right panel in place: ranked division bars → Chattogram district map + district table → institutions → **Institution 360°**. Below: exceptions by type, 14-day attendance trend (students, teachers, 80% threshold) and the top 3 attention items.
- **Division (05):** district map coloured by health, including grey districts with no institution; clicking a district swaps the panel (institutions, or an empty state). Actions list below.
- **District (06):** location map + institution cards compared against the 80% threshold + actions.
- **Principal (07):** institution header with 6 health domains, class attendance bars, approvals, budget by head, results by semester.
- **Teacher (08):** "My day" timeline; **Student (09):** progress rings + request stepper; **360° (10):** context column (location, facts, health) beside grouped tabs.

## 7. Navigation strategy
Same role groups as D, shown as a light sidebar: Ministry 6 · Division 4 · District 4 · Principal 5 · Teacher 5 · Student 5. Clicking the active group shows its sub-items; other modules open the placeholder dialog.

## 8. Typography
- **Source Sans 3** 400/600/700 (Latin) + **Hind Siliguri** 400/500/600/700 (Bangla, built for UI, Latin-matched metrics).
- Display 46/54 · H1 30/38 · H2 22/30 · H3 18/26 · Body 16/26 · Small 14/22. Figures 700 tabular in ink blue.

## 9. Colors
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F5F7F7` | light neutral canvas |
| `--surface` | `#FFFFFF` | cards |
| `--band` | `#EAF1F2` | tinted bands, selected rows |
| `--ink` / `--ink-2` / `--ink-3` | `#10232A` / `#40535A` / `#56686F` | text (15.1 / 7.5 / 5.4 : 1 on canvas) |
| `--line` | `#DCE3E5` | borders |
| `--primary` | `#0B6E62` | deep teal: actions, active (5.7:1) |
| `--data` | `#1E4E79` | ink blue: hierarchy, figures, chart series 1 |
| status | success `#0E7A4F` · warning `#9A5B00` · danger `#BE3428` · info `#1E4E79` | |
| map | good `#2F8F7A` · watch `#E2A93B` · attention `#CF4B3A` · none `#E3E9EA` | |

## 10. Spacing
4px grid · card padding 24px · section padding 72px · gap 24px · generous whitespace around the map.

## 11. Radius
10px cards · 8px inputs and buttons · 6px tags.

## 12. Borders / shadows
1px `--line`. Shadow `0 1px 3px rgba(16,35,42,.06), 0 8px 24px -12px rgba(16,35,42,.12)` on cards. The hero has a 2% dotted grid only.

## 13. Icon use
Lucide 20px. Hierarchy uses consistent icons: national = landmark, division = layers, district = map-pin, institution = school.

## 14. Status pattern
**Health status:** a colored dot + word (Good / Watch / Attention) + the value that triggered it (e.g. "Attendance 72%"). Workflow statuses use outlined tags with an icon.

## 15. Data visualization rules
- The map always has a list equivalent and value labels.
- Comparisons are horizontal bars sorted by value; trends are 1 line with a threshold.
- No more than 3 visualizations per screen; each has a Demo tag.

## 16. Form rules
Same step pattern as the PRD. Search-first entry: "Find institution by name or code" before any form.

## 17. Bilingual behavior
Toggle in the header. Map labels, nav, titles, statuses, table headings and buttons translate; figures switch to Bangla digits. Hind Siliguri keeps Bangla and Latin glyphs harmonised.

## 18. Accessibility
- Map regions are focusable links with text labels and an equivalent list.
- AA contrast, 3px focus ring, 44px targets, high-contrast toggle, keyboard drill-down (Enter on a region).

## 19. Mobile behavior
- **Public:** the hero map moves below the headline and search; the explorer becomes list-first with a "Show map" toggle.
- **App:** the sidebar becomes a drawer; the map/list split stacks with the list first.

## 20. Do / Don't
- ✅ Make connection and hierarchy visible; drill down without losing context; compare like with like.
- ❌ No ornamental heritage graphics, no dark canvas, no more than 3 charts per screen, no map without a list.
