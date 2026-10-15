"""D/E/F prototype stage: bilingual helpers, role navigation model, demo aggregates, rendering.

Called from build.py (`--stage def` or `--stage all`). Templates live in templates/def/.
Every string passed to t()/tb() must exist in data/i18n.json; the build fails and lists missing keys otherwise.
"""
import copy
import json
from pathlib import Path

from markupsafe import Markup, escape

BUILD = Path(__file__).resolve().parent
DESIGN = BUILD.parent

I18N = json.loads((BUILD / "data" / "i18n.json").read_text(encoding="utf-8"))
MISSING = set()


def tb(en):
    """Bangla string for attributes (data-bn-placeholder, aria labels)."""
    if en not in I18N:
        MISSING.add(en)
        return en
    return I18N[en]


def t(en, cls=None):
    """<span data-bn> wrapper so the language toggle swaps the text."""
    c = f' class="{cls}"' if cls else ""
    return Markup(f'<span{c} data-bn="{escape(tb(en))}">{escape(en)}</span>')


def num(value, cls=None):
    """Figure that switches to Bangla digits."""
    c = f' class="{cls}"' if cls else ""
    return Markup(f'<span{c} data-num>{escape(value)}</span>')


STATUS = {
    "Draft": ("neutral", "circle-dashed"), "Submitted": ("info", "send"), "Under review": ("warning", "clock"),
    "Correction required": ("danger", "pen-line"), "Approved": ("success", "circle-check"), "Rejected": ("danger", "circle-x"),
    "Completed": ("success", "badge-check"), "Published": ("success", "circle-check"), "Recorded": ("success", "circle-check"),
    "Not recorded": ("danger", "circle-alert"), "Pending sync": ("info", "refresh-cw"), "Due now": ("warning", "clock"),
    "Upcoming": ("neutral", "clock"), "Active": ("success", "circle-check"), "Inactive": ("neutral", "ban"),
    "Vacant": ("warning", "user-x"), "Overdue": ("danger", "hourglass"), "Ready to publish": ("info", "clipboard-check"),
    "Missing marks": ("danger", "circle-alert"), "Validation error": ("danger", "circle-alert"),
    "Corrected after publication": ("warning", "history"), "Valid": ("success", "shield-check"), "Not found": ("danger", "circle-x"),
    "Payment pending": ("warning", "hourglass"), "In use": ("info", "package"), "Available": ("success", "circle-check"),
    "Damaged": ("warning", "package-x"), "Lost": ("danger", "circle-alert"), "Recovered": ("success", "repeat"),
    "Assigned": ("info", "user-check"), "Transferred": ("neutral", "arrow-right"), "Overdue loan": ("danger", "hourglass"),
    "Withdrawn": ("neutral", "ban"), "Pending": ("warning", "clock"), "Not eligible": ("neutral", "ban"),
    "Phase 2": ("info", "sparkles"), "Issued": ("success", "award"), "High": ("danger", "triangle-alert"),
    "Medium": ("warning", "circle-alert"), "Low": ("info", "info"), "Seat full": ("warning", "users"),
    "Migration": ("info", "arrow-right"),
}


def status_kind(text):
    return STATUS.get(text, ("neutral", "circle"))


# ---------------------------------------------------------------- roles & navigation
PAGES = [
    ("01", "landing", "Public Home", "public"),
    ("02", "public-services", "Public Institutions & Services", "public"),
    ("03", "login", "Sign in", "public"),
    ("04", "ministry-dashboard", "Ministry Dashboard", "ministry"),
    ("05", "division-dashboard", "Division Dashboard", "division"),
    ("06", "district-dashboard", "District Dashboard", "district"),
    ("07", "principal-dashboard", "Institution / Principal Dashboard", "principal"),
    ("08", "teacher-dashboard", "Teacher Dashboard", "teacher"),
    ("09", "student-dashboard", "Student Dashboard", "student"),
    ("10", "institution-360", "Institution 360°", "ministry"),
]
SHORT = {"01": "Landing", "02": "Public", "03": "Login", "04": "Ministry", "05": "Division", "06": "District",
         "07": "Principal", "08": "Teacher", "09": "Student", "10": "Institution 360"}

VARIATIONS = {
    "D": {"name": "National Service Portal", "tag": "Official, public-service-first"},
    "E": {"name": "Connected Institution Network", "tag": "Map + hierarchy, strategic"},
    "F": {"name": "Action & Service Hub", "tag": "Task-first, queue-driven"},
}

# (label, icon, page_num or None, sub-items for placeholder, count)
NAV = {
    "ministry": [
        ("Overview", "house", "04", [], None),
        ("Institutions", "school", "10", ["Institution list", "Institution 360°", "Institution setup"], None),
        ("Operations", "clipboard-list", None, ["Admissions", "Live attendance", "Budget & assets", "Procurement", "Library"], None),
        ("Approvals", "inbox", None, ["Admission results", "Budget revisions", "Professional licenses (Phase 2)"], "31"),
        ("Reports", "file-text", None, ["Consolidated reports", "Scheduled reports"], None),
        ("Administration", "settings-2", None, ["Users & roles", "Institution categories", "Divisions & districts", "MY GOV integration"], None),
    ],
    "division": [
        ("Overview", "house", "05", [], None),
        ("Districts & Institutions", "layers", None, ["District list", "Institution list", "Institution 360°"], None),
        ("Actions", "inbox", None, ["Follow-ups", "Pending reports"], "4"),
        ("Reports", "file-text", None, ["Division reports"], None),
    ],
    "district": [
        ("Overview", "house", "06", [], None),
        ("Institutions", "school", None, ["Institution list", "Institution 360°"], None),
        ("Actions", "inbox", None, ["Follow-ups", "Pending reports"], "4"),
        ("Reports", "file-text", None, ["District reports"], None),
    ],
    "principal": [
        ("Overview", "house", "07", [], None),
        ("People & Academics", "users", None, ["Teachers", "Students", "Classes", "Results", "Academic calendar"], None),
        ("Services & Approvals", "inbox", None, ["Student services", "Leave", "Certificates", "Alumni"], "14"),
        ("Resources", "wallet", None, ["Finance", "Assets", "Procurement / LC / PO / Gate pass", "Library"], None),
        ("Reports", "file-text", None, ["Institution reports"], None),
    ],
    "teacher": [
        ("Home", "house", "08", [], None),
        ("My Classes", "book-open", None, ["Class list", "Class materials", "Students"], None),
        ("Attendance", "user-check", None, ["Take attendance", "Corrections"], "1"),
        ("Results", "clipboard-check", None, ["Result entry", "Published results"], "1"),
        ("Leave / Services", "calendar-off", None, ["Apply for leave", "Leave balance", "Library"], None),
    ],
    "student": [
        ("Home", "house", "09", [], None),
        ("Academics", "book-open", None, ["Classes & materials", "Advising", "Curriculum", "Code of conduct", "Academic calendar", "Teaching evaluation"], None),
        ("Results & Attendance", "clipboard-check", None, ["Results & grade table", "Attendance"], None),
        ("Services", "inbox", None, ["Online services (15)", "My requests", "Payments & ledger", "Certificate", "Library"], "1"),
        ("Profile", "user", None, ["My profile"], None),
    ],
}

USERS = {
    "ministry": {"name": "Farhana Ahmed", "role": "Ministry Super Admin", "scope": "All Bangladesh", "initials": "FA"},
    "division": {"name": "Kazi Rezaul Karim", "role": "Division Admin", "scope": "Chattogram Division", "initials": "KR"},
    "district": {"name": "Nasrin Sultana", "role": "District Admin", "scope": "Chattogram District", "initials": "NS"},
    "principal": {"name": "Md. Saiful Islam", "role": "Principal", "scope": "Karnaphuli Textile Institute", "initials": "SI"},
    "teacher": {"name": "Arif Hossain", "role": "Teacher", "scope": "Karnaphuli Textile Institute", "initials": "AH"},
    "student": {"name": "Mim Akter", "role": "Student", "scope": "Karnaphuli Textile Institute", "initials": "MA"},
}

ROLE_PREVIEW = [
    ("Ministry Super Admin", "All Bangladesh", "04"),
    ("Division Admin", "Chattogram Division", "05"),
    ("District Admin", "Chattogram District", "06"),
    ("Institution Admin / Principal", "Karnaphuli Textile Institute", "07"),
    ("Teacher", "Arif Hossain", "08"),
    ("Student", "Mim Akter", "09"),
    ("Alumni", "Alumni workspace", None),
    ("Third-party verifier", "Phase 2", None),
]


# ---------------------------------------------------------------- data
def health_of(att):
    if att is None:
        return "none"
    return "good" if att >= 85 else ("watch" if att >= 80 else "attention")


def load_def(demo):
    x = json.loads((BUILD / "data" / "def.json").read_text(encoding="utf-8"))
    ctg = x["chattogram"]
    for i in ctg["institutions"]:
        i["health_calc"] = health_of(i["attendance"])
    for dist in ctg["districts"]:
        insts = [i for i in ctg["institutions"] if i["district"] == dist["name"]]
        dist["institutions"] = len(insts)
        dist["students"] = sum(i["students"] for i in insts)
        dist["attendance"] = round(sum(i["students"] * i["attendance"] for i in insts) / dist["students"], 1) if insts else None
        dist["health"] = health_of(dist["attendance"])
        dist["attention"] = sum(1 for i in insts if i["health"] == "attention")
    ctg_students = sum(i["students"] for i in ctg["institutions"])
    ctg_att = round(sum(i["students"] * i["attendance"] for i in ctg["institutions"]) / ctg_students, 1)
    ctg["students"] = ctg_students
    ctg["attendance"] = ctg_att
    ctg["teachers"] = sum(i["teachers"] for i in ctg["institutions"])

    # national figures consistent with the Chattogram detail
    divisions = copy.deepcopy(demo["divisions"])
    for dv in divisions:
        if dv["id"] == "chattogram":
            dv["attendance"] = ctg_att
        dv["health"] = health_of(dv["attendance"])
    total = sum(dv["students"] for dv in divisions)
    x["national_att"] = round(sum(dv["students"] * dv["attendance"] for dv in divisions) / total, 1)
    x["divisions"] = divisions
    x["div_by_id"] = {dv["id"]: dv for dv in divisions}
    x["ministry_institutions"] = [i for i in demo["institutions"] if i.get("health")]
    for s in x["services"]:
        s.setdefault("phase2", False)
    # public directory: Chattogram detail + other demo institutions (public fields only)
    names = {dv["id"]: dv["name"] for dv in divisions}
    directory = []
    for i in ctg["institutions"]:
        directory.append(dict(id=i["id"], name=i["name"], code=i["code"], type=i["type"], district=i["district"],
                              division="Chattogram", phone=i["phone"], programs=i["programs"], principal=i["principal"]))
    seen = {i["id"] for i in directory}
    for i in demo["institutions"]:
        if i["id"] in seen:
            continue
        directory.append(dict(id=i["id"], name=i["name"], code=i["code"], type=i["type"], district=i["district"],
                              division=names[i["division"]], phone="+880 2-000-" + i["code"][-3:], programs=i["programs"],
                              principal=i["principal"]))
    x["directory"] = sorted(directory, key=lambda r: (r["division"], r["district"], r["name"]))
    x["district_ids"] = {dist["name"]: dist["id"] for dist in ctg["districts"]}
    x["div_bn"] = {dv["id"]: dv["bn"] for dv in divisions}
    x["dist_bn"] = {dist["id"]: dist["bn"] for dist in ctg["districts"]}
    x["div_nodes"] = {dv["id"]: dv["institutions"] for dv in divisions}
    x["div_health_fill"] = {dv["id"]: "r-" + dv["health"] for dv in divisions}
    x["div_att"] = {dv["id"]: f'{dv["attendance"]}%' for dv in divisions}
    x["dist_health_fill"] = {dist["id"]: "r-" + dist["health"] for dist in ctg["districts"]}
    x["attention_total"] = sum(1 for i in demo["institutions"] if i.get("overall") == "attention")
    return x


# ---------------------------------------------------------------- district map
def _bounds(d):
    import re
    nums = [float(n) for n in re.findall(r"-?\d+(?:\.\d+)?", d)]
    xs, ys = nums[0::2], nums[1::2]
    return min(xs), min(ys), max(xs), max(ys)


def nat_map(map_data, fills=None, links=None, values=None, nodes=None, bn=None, labels=True, selected=None,
            title="Map of Bangladesh by division", cls=""):
    """Division map for D/E/F (bilingual labels). links: {division_id: (href, extra_attrs)}; nodes: {division_id: count}."""
    import math
    fills, links, values, nodes, bn = fills or {}, links or {}, values or {}, nodes or {}, bn or {}
    out = [f'<svg viewBox="{map_data["viewBox"]}" class="bd-map {cls}" role="img" aria-label="{escape(title)}">']
    for d in map_data["divisions"]:
        fc = fills.get(d["id"], "r-none")
        sel = " r-selected" if selected == d["id"] else ""
        tip = f'{d["name"]} Division' + (f' · {values[d["id"]]}' if d["id"] in values else "")
        path = f'<path class="region {fc}{sel}" d="{d["d"]}"><title>{escape(tip)}</title></path>'
        if d["id"] in links:
            href, extra = links[d["id"]]
            out.append(f'<a href="{href}" {extra} aria-label="{escape(tip)}">{path}</a>')
        else:
            out.append(path)
    hub = next(d for d in map_data["divisions"] if d["id"] == "dhaka")
    if nodes:
        for d in map_data["divisions"]:
            if d["id"] != "dhaka":
                out.append(f'<line class="net-line" x1="{hub["cx"]:.1f}" y1="{hub["cy"]:.1f}" x2="{d["cx"]:.1f}" y2="{d["cy"]:.1f}"/>')
        for d in map_data["divisions"]:
            for k in range(nodes.get(d["id"], 0)):
                ang = k * 2.39996
                rad = 10 + 7.5 * math.sqrt(k)
                x, y = d["cx"] + rad * math.cos(ang), d["cy"] + 30 + rad * math.sin(ang)
                out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4.2" fill="var(--surface)" stroke="var(--data)" stroke-width="2"/>')
    if labels:
        for d in map_data["divisions"]:
            b = f' data-bn="{escape(bn[d["id"]])}"' if d["id"] in bn else ""
            out.append(f'<text x="{d["cx"]:.1f}" y="{d["cy"]:.1f}" text-anchor="middle"{b}>{escape(d["name"])}</text>')
            if d["id"] in values:
                out.append(f'<text class="val" x="{d["cx"]:.1f}" y="{d["cy"] + 22:.1f}" text-anchor="middle" data-num>{escape(values[d["id"]])}</text>')
    out.append("</svg>")
    return Markup("".join(out))


def district_map(map_data, division, fills=None, links=None, labels=True, title="District map", selected=None, pins=None, bn=None):
    """Inline SVG of one division's districts. fills/links keyed by district id; bn: {district_id: Bangla name}."""
    fills, links, bn = fills or {}, links or {}, bn or {}
    ds = [d for d in map_data["districts"] if d["division"] == division]
    bx = [_bounds(d["d"]) for d in ds]
    x0, y0 = min(b[0] for b in bx) - 6, min(b[1] for b in bx) - 6
    x1, y1 = max(b[2] for b in bx) + 6, max(b[3] for b in bx) + 6
    out = [f'<svg viewBox="{x0:.1f} {y0:.1f} {x1 - x0:.1f} {y1 - y0:.1f}" class="bd-map w-full h-auto" role="img" aria-label="{escape(title)}">']
    scale = (x1 - x0) / 300
    for d in ds:
        fc = fills.get(d["id"], "r-none")
        sel = " r-selected" if selected == d["id"] else ""
        path = f'<path class="region {fc}{sel}" d="{d["d"]}" style="stroke-width:{1.2 * scale:.2f}"><title>{escape(d["name"])} District</title></path>'
        if d["id"] in links:
            href, extra = links[d["id"]]
            out.append(f'<a href="{href}" {extra} aria-label="{escape(d["name"])} District">{path}</a>')
        else:
            out.append(path)
    if labels:
        for d in ds:
            b = f' data-bn="{escape(bn[d["id"]])}"' if d["id"] in bn else ""
            out.append(f'<text x="{d["cx"]:.1f}" y="{d["cy"]:.1f}" text-anchor="middle" style="font-size:{11 * scale:.1f}px;stroke-width:{3 * scale:.1f}px"{b}>{escape(d["name"])}</text>')
    out.append("</svg>")
    return Markup("".join(out))


# ---------------------------------------------------------------- render
def render(e, demo):
    e.globals.update(t=t, tb=tb, num=num, status_kind=status_kind, health_of=health_of, district_map=district_map, nat_map=nat_map)
    x = load_def(demo)
    out_dir = DESIGN / "variations"
    written = []
    ctx_common = dict(d=demo, x=x, variations=VARIATIONS, pages=PAGES, short=SHORT, nav_model=NAV, users=USERS,
                      role_preview=ROLE_PREVIEW, asset="../assets/")
    for v in VARIATIONS:
        for num_, slug, title, role in PAGES:
            tpl = e.get_template(f"def/{num_}-{slug}.html")
            pf = {n: f"{v}-{n}-{s}.html" for n, s, _, _ in PAGES}
            html = tpl.render(v=v, var=VARIATIONS[v], page_num=num_, page_slug=slug, page_title=title, role=role,
                              user=USERS.get(role), nav=NAV.get(role, []), pf=pf, **ctx_common)
            path = out_dir / f"{v}-{num_}-{slug}.html"
            path.write_text(html, encoding="utf-8")
            written.append(path)
    tpl = e.get_template("def/showcase.html")
    (out_dir / "showcase-DEF.html").write_text(tpl.render(**ctx_common), encoding="utf-8")
    written.append(out_dir / "showcase-DEF.html")
    if MISSING:
        raise SystemExit("Missing Bangla translations in data/i18n.json:\n" + "\n".join(sorted(MISSING)))
    return written
