"""Convert geoBoundaries BGD ADM1/ADM2 GeoJSON into compact SVG path data.

Usage: python -I make_map.py <adm1.geojson> <adm2.geojson> <out.json>

Source data: geoBoundaries gbOpen BGD ADM1/ADM2 (CC BY 4.0), https://www.geoboundaries.org
"""
import json
import math
import sys

from shapely.geometry import MultiPolygon, Polygon, shape

DIVISION_NAMES = {
    "Chittagong": "Chattogram", "Rajshani": "Rajshahi", "Rajshahi": "Rajshahi", "Barisal": "Barishal",
    "Dhaka": "Dhaka", "Mymensingh": "Mymensingh", "Rangpur": "Rangpur", "Sylhet": "Sylhet", "Khulna": "Khulna",
}
DISTRICT_NAMES = {
    "Chittagong": "Chattogram", "Comilla": "Cumilla", "Jessore": "Jashore", "Bogra": "Bogura",
    "Barisal": "Barishal", "Brahamanbaria": "Brahmanbaria", "Nawabganj": "Chapai Nawabganj",
    "Maulvibazar": "Moulvibazar",
}
WIDTH = 600.0


def slug(name):
    return name.lower().replace("'", "").replace(" ", "-")


def load(path):
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)["features"]


def clean(geom, min_area):
    polys = list(geom.geoms) if isinstance(geom, MultiPolygon) else [geom]
    kept = [p for p in polys if p.area >= min_area]
    if not kept:
        kept = [max(polys, key=lambda p: p.area)]
    return MultiPolygon(kept) if len(kept) > 1 else kept[0]


def main(adm1_path, adm2_path, out_path):
    adm1 = [(DIVISION_NAMES[f["properties"]["shapeName"]], shape(f["geometry"])) for f in load(adm1_path)]
    adm2 = [(DISTRICT_NAMES.get(f["properties"]["shapeName"], f["properties"]["shapeName"]), shape(f["geometry"]))
            for f in load(adm2_path)]

    minx = min(g.bounds[0] for _, g in adm1)
    miny = min(g.bounds[1] for _, g in adm1)
    maxx = max(g.bounds[2] for _, g in adm1)
    maxy = max(g.bounds[3] for _, g in adm1)
    kx = math.cos(math.radians((miny + maxy) / 2))
    scale = WIDTH / ((maxx - minx) * kx)
    height = round((maxy - miny) * scale, 1)

    def proj(x, y):
        return round((x - minx) * kx * scale, 1), round((maxy - y) * scale, 1)

    def ring_path(coords):
        pts = [proj(x, y) for x, y in coords]
        out, last = [], None
        for p in pts:
            if p != last:
                out.append(p)
            last = p
        return "M" + "L".join(f"{x:g},{y:g}" for x, y in out) + "Z"

    def geom_path(geom):
        polys = list(geom.geoms) if isinstance(geom, MultiPolygon) else [geom]
        parts = []
        for p in polys:
            parts.append(ring_path(p.exterior.coords))
            parts.extend(ring_path(r.coords) for r in p.interiors)
        return "".join(parts)

    divisions = []
    for name, geom in sorted(adm1, key=lambda t: t[0]):
        g = clean(geom.simplify(0.012, preserve_topology=True), 0.002)
        pt = geom.representative_point()
        cx, cy = proj(pt.x, pt.y)
        divisions.append({"id": slug(name), "name": name, "d": geom_path(g), "cx": cx, "cy": cy, "_geom": geom})

    districts = []
    for name, geom in sorted(adm2, key=lambda t: t[0]):
        pt = geom.representative_point()
        parent = next((d for d in divisions if d["_geom"].contains(pt)), None)
        if parent is None:
            parent = min(divisions, key=lambda d: d["_geom"].distance(pt))
        g = clean(geom.simplify(0.008, preserve_topology=True), 0.0008)
        cx, cy = proj(pt.x, pt.y)
        districts.append({"id": slug(name), "name": name, "division": parent["id"], "d": geom_path(g), "cx": cx, "cy": cy})

    for d in divisions:
        del d["_geom"]

    out = {
        "viewBox": f"0 0 {WIDTH:g} {height:g}",
        "width": WIDTH,
        "height": height,
        "attribution": "Boundaries: geoBoundaries gbOpen BGD ADM1/ADM2 (CC BY 4.0)",
        "divisions": divisions,
        "districts": districts,
    }
    with open(out_path, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, separators=(",", ":"))
    counts = {}
    for d in districts:
        counts[d["division"]] = counts.get(d["division"], 0) + 1
    print("viewBox", out["viewBox"], "divisions", len(divisions), "districts", len(districts), counts)


if __name__ == "__main__":
    main(*sys.argv[1:4])
