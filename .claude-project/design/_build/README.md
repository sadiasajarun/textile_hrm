# Prototype build (P3 design)

Generates the static HTML prototypes under `.claude-project/design/` from Jinja templates, one shared demo dataset, and one Tailwind stylesheet. Every page reuses the same components, so the shared shell (header, sidebar, footer) stays identical across pages, as the design rules require.

| Path | What it is |
|---|---|
| `build.py` | Renders templates, bundles fonts, inlines Lucide icons, compiles `assets/tims.css` |
| `templates/_macros.html` | Shared components: head, headers, footer, sidebar, top bar, KPI card, status tags, review bar |
| `templates/variations/` | P3c: 3 representative pages × 3 design systems + `showcase.html` |
| `css/app.css` | Tailwind v4 source; theme tokens for variations A / B / C via `[data-theme]` |
| `data/demo.json` | Demo / Illustrative Data (fictional institutions and people; real divisions and districts) |
| `data/bd_map.json` | Division (8) and district (64) SVG paths made by `geo/make_map.py` from geoBoundaries (CC BY 4.0) |
| `icons/` | Vendored Lucide SVGs actually used (ISC licence) |
| `qa/qa.mjs` | Screenshot QA: console errors, broken links, dead buttons, 375px overflow, review-bar presence |

## Rebuild

```bash
npm install --prefix /some/tooling/dir        # installs package.json devDependencies
python -m venv venv && venv/bin/pip install -r requirements.txt
venv/bin/python build.py --node-modules /some/tooling/dir/node_modules
node qa/qa.mjs ../variations ../variations/shots /tmp/review --thumbs   # needs Chromium (CHROMIUM_PATH)
```

`build.py` links `node_modules` into `_build/` (git-ignored) so Tailwind can resolve `@import "tailwindcss"`.

## Output

- `../variations/{A,B,C}-0{1,2,3}-*.html`, `showcase-ALL.html`, `shots/*.jpg` (thumbnails)
- `../assets/tims.css`, `../assets/tims.js`, `../assets/fonts/*.woff2` (Public Sans, DM Sans, Fraunces, IBM Plex Sans, Noto Sans/Serif Bengali, OFL)

The pages work offline from `file://`: no CDN is needed.
