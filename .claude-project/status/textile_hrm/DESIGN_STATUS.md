# Design Status — textile_hrm

```yaml
phase: P3-design
current_step: P3d            # client confirmation — paused
selected_variation: null     # A | B | C | Mix
approved: false
approved_at: null
variations_generated: 3
archetypes: [civic-clarity, heritage-weave, command-center]
differentiation_score: 7/7
html_files: 9
showcase: .claude-project/design/variations/showcase-ALL.html
prd_version_used: v1
```

## Variations

| Key | Name | Reference | Files |
|---|---|---|---|
| A | Civic Clarity | GOV.UK Design System + Stripe Docs | `variations/A-01-landing.html`, `A-02-ministry-dashboard.html`, `A-03-institution-360.html` |
| B | Heritage Weave | Airbnb/Notion warmth + Jamdani textile heritage | `variations/B-01-landing.html`, `B-02-ministry-dashboard.html`, `B-03-institution-360.html` |
| C | Command Center | Linear / Datadog operations consoles | `variations/C-01-landing.html`, `C-02-ministry-dashboard.html`, `C-03-institution-360.html` |

Design systems: `design/DESIGN_SYSTEM_A.md`, `DESIGN_SYSTEM_B.md`, `DESIGN_SYSTEM_C.md`.

## QA (P3c)
- Blueprint `validate-variations`: **PM_3_DESIGN_VALIDATION_PASSED** (showcase present; every page has `var-nav-bar` and a 1440px frame).
- Screenshot QA (`_build/qa/qa.mjs`, Chromium, 1440px and 375px): **10 pages, 0 issues**. No console errors, no broken links, no `href="#"`, no buttons without an action, no horizontal overflow at 375px.
- Bangla toggle verified on B-01 and C-02 (Noto Sans/Serif Bengali, conjuncts render correctly).

## To approve
1. Open `variations/showcase-ALL.html` (or `showcase-ALL.png`) and choose A, B, C or a Mix.
2. Record it here: `selected_variation: <A|B|C|Mix>`, `approved: true`, `approved_at: <ISO8601>`. Or reply to Claude with the choice.
3. Resume: `/fullstack-pm textile_hrm --phase P3-design --resume`. This runs P3e (all 108 pages in role folders), P3f (QA) and P3g (snapshot).
