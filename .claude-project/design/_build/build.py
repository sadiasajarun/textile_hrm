"""Prototype HTML generator for the Textile Institution Management System.

Renders Jinja templates in _build/templates into static HTML under .claude-project/design/,
bundles fonts and icons, and compiles the Tailwind stylesheet to assets/tims.css.

Usage:
  python _build/build.py --node-modules <path/to/node_modules> [--stage variations]

Requirements: jinja2 (see requirements.txt); Node packages from package.json.
"""
import argparse
import json
import math
import re
import shutil
import subprocess
from pathlib import Path

from jinja2 import Environment, FileSystemLoader, StrictUndefined
from markupsafe import Markup

BUILD = Path(__file__).resolve().parent
DESIGN = BUILD.parent
ASSETS = DESIGN / "assets"
ICON_DIR = BUILD / "icons"

FONT_FAMILIES = {
    # package: (weights, subsets)
    "public-sans": ([400, 500, 600, 700], ["latin"]),
    "dm-sans": ([400, 500, 600, 700], ["latin"]),
    "fraunces": ([500, 600, 700], ["latin"]),
    "ibm-plex-sans": ([400, 500, 600, 700], ["latin"]),
    "noto-sans-bengali": ([400, 500, 600, 700], ["bengali"]),
    "noto-serif-bengali": ([600], ["bengali"]),
}

FONT_FAMILIES_DEF = {
    "noto-sans": ([400, 500, 600, 700], ["latin"]),
    "source-sans-3": ([400, 600, 700], ["latin"]),
    "lexend": ([400, 500, 600], ["latin"]),
    "hind-siliguri": ([400, 500, 600, 700], ["bengali"]),
    "noto-sans-bengali": ([400, 500, 600, 700], ["bengali"]),
}

NODE_MODULES = None


# ---------------------------------------------------------------- icons
def icon(name, cls="w-5 h-5", label=None):
    path = ICON_DIR / f"{name}.svg"
    if not path.exists():
        src = Path(NODE_MODULES or "") / "lucide-static" / "icons" / f"{name}.svg"
        if not src.exists():
            raise FileNotFoundError(f"Lucide icon not found: {name}")
        ICON_DIR.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(src, path)
    svg = path.read_text(encoding="utf-8")
    svg = re.sub(r"<!--.*?-->", "", svg, flags=re.S).strip()
    svg = re.sub(r'\sclass="[^"]*"', "", svg)
    svg = re.sub(r'\s(width|height)="24"', "", svg)
    aria = f' role="img" aria-label="{label}"' if label else ' aria-hidden="true"'
    svg = svg.replace("<svg", f'<svg class="{cls}" focusable="false"{aria}', 1)
    return Markup(svg)


# ---------------------------------------------------------------- charts
def _scale(values, lo, hi, size, pad=0):
    span = (hi - lo) or 1
    return [pad + (size - 2 * pad) * (1 - (v - lo) / span) for v in values]


def sparkline(values, w=96, h=28, stroke="var(--chart-1)", fill=True, responsive=False):
    lo, hi = min(values), max(values)
    ys = _scale(values, lo, hi, h, 2)
    step = w / (len(values) - 1)
    pts = " ".join(f"{i * step:.1f},{y:.1f}" for i, y in enumerate(ys))
    area = f'<polygon points="0,{h} {pts} {w},{h}" fill="{stroke}" opacity=".12"/>' if fill else ""
    size = f'class="block w-full" height="{h}" preserveAspectRatio="none"' if responsive else f'width="{w}" height="{h}" class="block"'
    return Markup(
        f'<svg viewBox="0 0 {w} {h}" {size} aria-hidden="true">{area}'
        f'<polyline points="{pts}" fill="none" stroke="{stroke}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>')


def line_chart(series, labels, lo=70, hi=100, threshold=None, w=640, h=220, area=False, title="Line chart"):
    padl, padr, padt, padb = 36, 12, 12, 26
    iw, ih = w - padl - padr, h - padt - padb
    out = [f'<svg viewBox="0 0 {w} {h}" class="w-full h-auto" role="img" aria-label="{title}">']
    out.append('<g class="chart-grid">')
    for t in range(lo, hi + 1, 5):
        y = padt + ih * (1 - (t - lo) / (hi - lo))
        out.append(f'<line x1="{padl}" x2="{w - padr}" y1="{y:.1f}" y2="{y:.1f}"/>')
        out.append(f'<text class="chart-label" x="{padl - 6}" y="{y + 4:.1f}" text-anchor="end">{t}%</text>')
    out.append("</g>")
    n = len(labels)
    xs = [padl + iw * i / (n - 1) for i in range(n)]
    for i, lab in enumerate(labels):
        if i % 2 == 0 or i == n - 1:
            out.append(f'<text class="chart-label" x="{xs[i]:.1f}" y="{h - 6}" text-anchor="middle">{lab}</text>')
    if threshold is not None:
        y = padt + ih * (1 - (threshold - lo) / (hi - lo))
        out.append(f'<line x1="{padl}" x2="{w - padr}" y1="{y:.1f}" y2="{y:.1f}" stroke="var(--danger)" stroke-width="1.5" stroke-dasharray="5 4"/>')
        out.append(f'<text class="chart-label" x="{w - padr}" y="{y - 6:.1f}" text-anchor="end" style="fill:var(--danger)">Threshold {threshold}%</text>')
    for s in series:
        ys = [padt + ih * (1 - (v - lo) / (hi - lo)) for v in s["values"]]
        pts = " ".join(f"{x:.1f},{y:.1f}" for x, y in zip(xs, ys))
        if area:
            out.append(f'<polygon points="{xs[0]:.1f},{padt + ih} {pts} {xs[-1]:.1f},{padt + ih}" fill="{s["color"]}" opacity=".10"/>')
        dash = ' stroke-dasharray="6 4"' if s.get("dashed") else ""
        out.append(f'<polyline points="{pts}" fill="none" stroke="{s["color"]}" stroke-width="2.2" stroke-linejoin="round"{dash}/>')
        out.append(f'<circle cx="{xs[-1]:.1f}" cy="{ys[-1]:.1f}" r="4" fill="{s["color"]}" stroke="var(--surface)" stroke-width="2"/>')
    out.append("</svg>")
    return Markup("".join(out))


def donut(parts, size=140, stroke=22, title="Donut chart"):
    r = (size - stroke) / 2
    c = 2 * math.pi * r
    out = [f'<svg viewBox="0 0 {size} {size}" width="{size}" height="{size}" role="img" aria-label="{title}">',
           f'<circle cx="{size / 2}" cy="{size / 2}" r="{r}" fill="none" stroke="var(--surface-2)" stroke-width="{stroke}"/>']
    offset = 0
    for p in parts:
        length = c * p["value"] / 100
        out.append(f'<circle cx="{size / 2}" cy="{size / 2}" r="{r}" fill="none" stroke="{p["color"]}" stroke-width="{stroke}" '
                   f'stroke-dasharray="{length:.2f} {c - length:.2f}" stroke-dashoffset="{-offset:.2f}" transform="rotate(-90 {size / 2} {size / 2})"/>')
        offset += length
    out.append("</svg>")
    return Markup("".join(out))


def ring(pct, size=64, stroke=7, color="var(--primary)"):
    r = (size - stroke) / 2
    c = 2 * math.pi * r
    return Markup(
        f'<svg viewBox="0 0 {size} {size}" width="{size}" height="{size}" aria-hidden="true">'
        f'<circle cx="{size / 2}" cy="{size / 2}" r="{r}" fill="none" stroke="var(--surface-2)" stroke-width="{stroke}"/>'
        f'<circle cx="{size / 2}" cy="{size / 2}" r="{r}" fill="none" stroke="{color}" stroke-width="{stroke}" stroke-linecap="round" '
        f'stroke-dasharray="{c * pct / 100:.2f} {c:.2f}" transform="rotate(-90 {size / 2} {size / 2})"/></svg>')


# ---------------------------------------------------------------- map
MAP = json.loads((BUILD / "data" / "bd_map.json").read_text(encoding="utf-8"))


def health_of(att):
    return "good" if att >= 85 else ("watch" if att >= 80 else "attention")


def bd_map(fills=None, values=None, links=None, selected=None, labels=True, districts=False,
           district_fill=None, cls="", title="Map of Bangladesh by division", nodes=None, label_mode="name",
           link_default=None):
    """Inline SVG map. fills: {division_id: css-class}; values: {division_id: text}; links: {division_id: href}.
    link_default: (href, toast) used for divisions without an explicit link."""
    fills = fills or {}
    values = values or {}
    links = links or {}
    out = [f'<svg viewBox="{MAP["viewBox"]}" class="bd-map {cls}" role="img" aria-label="{title}">']
    if districts:
        for d in MAP["districts"]:
            fc = (district_fill or {}).get(d["division"], "r-brand-soft")
            out.append(f'<path class="district {fc}" d="{d["d"]}"><title>{d["name"]} district</title></path>')
    for d in MAP["divisions"]:
        fc = fills.get(d["id"], "r-none" if not districts else "")
        sel = " r-selected" if selected == d["id"] else ""
        tip = f'{d["name"]} Division' + (f' · {values[d["id"]]}' if d["id"] in values else "")
        style = ' style="fill:transparent"' if districts else ""
        path = f'<path class="region {fc}{sel}" d="{d["d"]}"{style}><title>{tip}</title></path>'
        if d["id"] in links:
            out.append(f'<a href="{links[d["id"]]}" aria-label="{tip}">{path}</a>')
        elif link_default:
            out.append(f'<a href="{link_default[0]}" data-toast="{link_default[1]}" aria-label="{tip}">{path}</a>')
        else:
            out.append(path)
    if nodes:
        for d in MAP["divisions"]:
            for k in range(nodes.get(d["id"], 0)):
                ang = k * 2.39996
                rad = 12 + 8 * math.sqrt(k)
                x, y = d["cx"] + rad * math.cos(ang), d["cy"] + 34 + rad * math.sin(ang)
                out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4.6" fill="var(--surface)" stroke="var(--primary)" stroke-width="2"/>')
    if labels:
        for d in MAP["divisions"]:
            out.append(f'<text x="{d["cx"]:.1f}" y="{d["cy"]:.1f}" text-anchor="middle">{d["name"]}</text>')
            if d["id"] in values and label_mode == "value":
                out.append(f'<text class="val" x="{d["cx"]:.1f}" y="{d["cy"] + 22:.1f}" text-anchor="middle">{values[d["id"]]}</text>')
    out.append("</svg>")
    return Markup("".join(out))


# ---------------------------------------------------------------- fonts
def build_fonts(families=None, css_name="fonts.css"):
    """Assemble @font-face rules for latin/bengali subsets and copy woff2 files into assets/fonts."""
    families = families or FONT_FAMILIES
    out_css = BUILD / "css" / css_name
    fonts_dir = ASSETS / "fonts"
    if out_css.exists() and fonts_dir.exists() and any(fonts_dir.iterdir()):
        return
    if not NODE_MODULES:
        raise SystemExit("fonts.css missing: pass --node-modules to bundle fonts")
    fonts_dir.mkdir(parents=True, exist_ok=True)
    rules = []
    for pkg, (weights, subsets) in families.items():
        base = Path(NODE_MODULES) / "@fontsource" / pkg
        for wt in weights:
            css = (base / f"{wt}.css").read_text(encoding="utf-8")
            for block in re.findall(r"/\*[^*]*\*/\s*@font-face\s*{[^}]*}", css):
                subset = re.search(r"/\*\s*[\w-]+-([\w-]+)-\d+-normal\s*\*/", block)
                if not subset or subset.group(1) not in subsets:
                    continue
                woff2 = re.search(r"url\(\./files/([^)]+\.woff2)\)", block).group(1)
                if not (fonts_dir / woff2).exists():
                    shutil.copyfile(base / "files" / woff2, fonts_dir / woff2)
                face = re.search(r"@font-face\s*{[^}]*}", block).group(0)
                face = re.sub(r"src:[^;]+;", f"src: url(fonts/{woff2}) format('woff2');", face)
                rules.append(face)
    out_css.write_text("/* Generated by build.py from @fontsource packages (OFL). */\n" + "\n".join(rules) + "\n", encoding="utf-8")


# ---------------------------------------------------------------- render
def env():
    e = Environment(loader=FileSystemLoader(BUILD / "templates"), autoescape=True, undefined=StrictUndefined,
                    trim_blocks=True, lstrip_blocks=True)
    e.globals.update(icon=icon, sparkline=sparkline, line_chart=line_chart, donut=donut, ring=ring, bd_map=bd_map,
                     health_of=health_of, map_attr=MAP["attribution"], map_data=MAP)
    return e


def load_data():
    data = json.loads((BUILD / "data" / "demo.json").read_text(encoding="utf-8"))
    defaults = {
        "services": {"phase2": False},
        "kpis": {"delta": None, "trend": None, "note": None, "sub": None, "live": False, "spark": None},
        "admission_steps": {"count": None},
    }
    for key, extra in defaults.items():
        for item in data[key]:
            for k, val in extra.items():
                item.setdefault(k, val)
    for k in data["inst360"]["kpis"]:
        k.setdefault("status", None)
    data["by_id"] = {i["id"]: i for i in data["institutions"]}
    data["div_by_id"] = {d["id"]: d for d in data["divisions"]}
    return data


VARIATION_PAGES = [("01", "landing", "Public Home"), ("02", "ministry-dashboard", "Ministry Dashboard"),
                   ("03", "institution-360", "Institution 360°")]
VARIATIONS = {
    "A": {"name": "Civic Clarity", "ref": "GOV.UK Design System + Stripe Docs"},
    "B": {"name": "Heritage Weave", "ref": "Airbnb/Notion warmth + Jamdani heritage"},
    "C": {"name": "Command Center", "ref": "Linear / Datadog operations consoles"},
}


def render_variations(e, data):
    out_dir = DESIGN / "variations"
    out_dir.mkdir(parents=True, exist_ok=True)
    written = []
    for v in VARIATIONS:
        for num, slug, title in VARIATION_PAGES:
            tpl = e.get_template(f"variations/{num}-{slug}.html")
            html = tpl.render(v=v, var=VARIATIONS[v], variations=VARIATIONS, pages=VARIATION_PAGES, page_num=num,
                              page_slug=slug, page_title=title, d=data, asset="../assets/",
                              active={"02": "dash", "03": "inst"}.get(num))
            path = out_dir / f"{v}-{num}-{slug}.html"
            path.write_text(html, encoding="utf-8")
            written.append(path)
    tpl = e.get_template("variations/showcase.html")
    (out_dir / "showcase-ALL.html").write_text(
        tpl.render(variations=VARIATIONS, pages=VARIATION_PAGES, d=data, asset="../assets/"), encoding="utf-8")
    written.append(out_dir / "showcase-ALL.html")
    return written


def compile_css(src="app.css", out="tims.css"):
    link = BUILD / "node_modules"
    if NODE_MODULES and not link.exists():
        link.symlink_to(Path(NODE_MODULES).resolve(), target_is_directory=True)
    cli = Path(NODE_MODULES or "") / ".bin" / "tailwindcss"
    if not cli.exists():
        raise SystemExit(f"Tailwind CLI not found at {cli}")
    subprocess.run([str(cli), "-i", str(BUILD / "css" / src), "-o", str(ASSETS / out), "--minify"],
                   check=True, cwd=BUILD)


def main():
    global NODE_MODULES
    ap = argparse.ArgumentParser()
    ap.add_argument("--node-modules", required=False)
    ap.add_argument("--stage", default="all", choices=["variations", "def", "all"])
    args = ap.parse_args()
    NODE_MODULES = args.node_modules
    ASSETS.mkdir(parents=True, exist_ok=True)
    e = env()
    data = load_data()
    if args.stage in ("variations", "all"):
        build_fonts()
        written = render_variations(e, data)
        compile_css()
        print(f"A/B/C: rendered {len(written)} files; CSS -> {ASSETS / 'tims.css'}")
    if args.stage in ("def", "all"):
        import build_def
        build_fonts(FONT_FAMILIES_DEF, "fonts-def.css")
        written = build_def.render(e, data)
        compile_css("def.css", "tims-def.css")
        print(f"D/E/F: rendered {len(written)} files; CSS -> {ASSETS / 'tims-def.css'}")


if __name__ == "__main__":
    main()
