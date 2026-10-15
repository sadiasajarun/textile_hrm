# Prototype build (P3 design)

Generates the static HTML prototypes under `.claude-project/design/` from Jinja templates, one shared demo dataset, and one Tailwind stylesheet. Every page reuses the same components, so the shared shell (header, sidebar, footer) stays identical across pages, as the design rules require.

| Path | What it is |
|---|---|
| `build.py` | Renders templates, bundles fonts, inlines Lucide icons, compiles `assets/tims.css` |
| `templates/_macros.html` | Shared components: head, headers, footer, sidebar, top bar, KPI card, status tags, review bar |
| `templates/variations/` | P3c: 3 representative pages × 3 design systems + `showcase.html` |
| `css/app.css` | Tailwind v4 source; theme tokens for variations A / B / C via `[data-theme]` |
| `build_def.py` | P3 rework stage (D/E/F): bilingual helpers `t()` / `num()`, role navigation, demo aggregates, maps |
| `templates/def/` | D/E/F: 10 screens × 3 directions (`01-landing` … `10-institution-360`), `_m.html` / `_blocks.html` macros, `showcase.html` |
| `css/def.css` | Tailwind v4 source for D/E/F (separate from `app.css` so A/B/C output never changes) |
| `data/def.json` | D/E/F demo data: Chattogram division detail, services, notices, role dashboards, Institution 360° |
| `data/i18n.json` | English → Bangla strings. The build fails and lists any label passed to `t()` without a translation |
| `data/demo.json` | Demo / Illustrative Data (fictional institutions and people; real divisions and districts) |
| `data/bd_map.json` | Division (8) and district (64) SVG paths made by `geo/make_map.py` from geoBoundaries (CC BY 4.0) |
| `icons/` | Vendored Lucide SVGs actually used (ISC licence) |
| `qa/qa.mjs` | Screenshot QA: console errors, broken links, dead buttons, 375px overflow, review-bar presence |
| `qa/qa-def.mjs` | D/E/F QA at 1440 / 1024 / 390: the same checks plus touch targets, Latin labels left in Bangla mode, click-through of every dialog/tab/drill, and sign-in / lookup / deep-link flows (`--flows`) |

## Rebuild

```bash
npm install --prefix /some/tooling/dir        # installs package.json devDependencies
python -m venv venv && venv/bin/pip install -r requirements.txt
venv/bin/python build.py --node-modules /some/tooling/dir/node_modules            # --stage variations | def | all (default)
node qa/qa.mjs ../variations ../variations/shots /tmp/review --thumbs   # A/B/C; needs Chromium (CHROMIUM_PATH)
node qa/qa-def.mjs ../variations ../variations/shots /tmp/review-def --thumbs --only='^D-'   # D/E/F; --only is a regex on file names
node qa/qa-def.mjs ../variations ../variations/shots /tmp/review-def --only=none --flows  # sign-in and lookup flows
```

`build.py` links `node_modules` into `_build/` (git-ignored) so Tailwind can resolve `@import "tailwindcss"`.

## Output

- `../variations/{A,B,C}-0{1,2,3}-*.html`, `showcase-ALL.html`, `shots/*.jpg` (thumbnails)
- `../variations/{D,E,F}-{01..10}-*.html`, `showcase-DEF.html`, `showcase-DEF.jpg` (contact sheet of the 30 screens)
- `../assets/tims.css`, `../assets/tims.js`, `../assets/fonts/*.woff2` (Public Sans, DM Sans, Fraunces, IBM Plex Sans, Noto Sans/Serif Bengali, OFL)
- `../assets/tims-def.css`, `../assets/tims-def.js` (D/E/F; adds Noto Sans, Source Sans 3, Lexend, Hind Siliguri, Noto Sans Bengali, OFL)

The pages work offline from `file://`: no CDN is needed.
