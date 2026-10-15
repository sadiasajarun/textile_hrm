// showcase-GHI.html — Phase 1 comparison: screen-by-screen, G vs H vs I, plus summaries and recommendation.
import { SCREENS, VARIANTS, file } from './shared.mjs';

const VAR = {
  g: {
    tag: 'Public Service First', ref: 'IPEMIS structure + BIDA QuickServ service finder',
    concept: 'Every screen answers “what can I do here?”. Large friendly type, a photo hero with a service finder overlapping it, IPEMIS-style coloured statistics, and a step-by-step admission journey that shows the candidate → student ID change. Workspaces use a simple top navigation (no sidebar) and open with task cards (“Needs your decision”, “Happening now — take attendance”).',
    type: 'Public Sans + Hind Siliguri · 17px body · rounded 14px cards',
    nav: 'Public: 5-item top nav · Internal: horizontal role nav, no sidebar',
    dash: 'Task cards first → 4–5 figures → exceptions / drill-down list → notices & reports',
    strengths: ['Closest to the stakeholder’s IPEMIS + BIDA brief: big type, image hero, services first', 'Easiest for first-time candidates, students and teachers', 'Admission journey and candidate → student lifecycle are explicit', 'Task-first dashboards make “what to do next” obvious for every role'],
    weaknesses: ['Least dense: Ministry and Principal see fewer rows per screen', 'Top navigation will get crowded once Phase 2 adds sub-modules', 'Less “premium” first impression than H'],
  },
  h: {
    tag: 'Institutional & Premium', ref: 'Invest Bangladesh composition and polish',
    concept: 'A confident, editorial national-platform look. Full-screen photo slideshow with a statistics strip, serif display headlines (Fraunces / Noto Serif Bengali), an interactive Bangladesh division map for public insights, and an image-led admissions band. Workspaces use a dark ocean sidebar and “briefing” pages led by large figures, maps and charts; teachers mark attendance inline.',
    type: 'Fraunces + Noto Serif Bengali display · Source Sans 3 + Noto Sans Bengali text · square 4–8px corners',
    nav: 'Public: transparent header over hero · Internal: dark left sidebar (5–6 items)',
    dash: 'Briefing header → KPI band → map/chart + exceptions → approvals table → notices & reports',
    strengths: ['Strongest Ministry-level presentation and first impression', 'Map-led drill-down is intuitive for national oversight', 'Distinctive product identity — not a generic portal or template', 'Inline work (attendance register, approve/return) keeps users on one screen'],
    weaknesses: ['Most visual weight: heavier imagery and charts to maintain', 'Serif display style is less conventional for BD government users', 'Slideshow hero hides 2 of 3 messages at any time'],
  },
  i: {
    tag: 'Functional Government Workspace', ref: 'Familiar EMIS / NU portal structure, cleaned up',
    concept: 'Looks like the government portals users already know, but tidier: photo banner beside a notice board, a “Latest” ticker, compact stats strip, quick-service lists, a certificate check form and a notice table. Workspaces use a light grouped sidebar (collapsible sub-modules), filter bars, compact KPI strips and work-queue tables with tabs and bulk approval.',
    type: 'IBM Plex Sans + Noto Sans Bengali · 15px body · 6px corners, borders over shadows',
    nav: 'Public: search header + ocean nav bar · Internal: top bar + grouped collapsible sidebar',
    dash: 'Filter bar → KPI strip → tabbed work queue (bulk actions) → division tree table → side notices/reports',
    strengths: ['Highest information density — best for Ministry, Principal and data-entry work', 'Most familiar to existing government staff (low training cost)', 'Scales to the full Phase 2 module list without redesign', 'Tables, filters and bulk actions map directly to real workflows'],
    weaknesses: ['Public site feels closest to “old portal” — weakest emotional impact', 'Smaller type; less friendly for candidates on phones', 'Dense tables need careful mobile treatment'],
  },
};

const SCORES = [
  ['Homepage feels like a real public government platform (not a dashboard)', 5, 5, 4],
  ['IPEMIS-like structure: hero, stats, about, help, gallery', 5, 4, 4],
  ['Hero / banner strength and image treatment', 4, 5, 3],
  ['Notice handling (categories, pinned, urgent, empty state)', 4, 4, 5],
  ['Public service discoverability (BIDA mindset)', 5, 4, 4],
  ['Login / portal-domain logic (public vs. officials)', 5, 4, 5],
  ['Dashboards practical and action-first', 5, 4, 5],
  ['Ministry-level presentation quality', 4, 5, 3],
  ['Operational efficiency for heavy daily users', 3, 4, 5],
  ['Bangla readiness (long labels, numerals)', 5, 4, 4],
];

export default function showcase() {
  const col = (v, s) => `<figure class="sc-shot">
    <figcaption><span class="b b-${v}">${VARIANTS[v].key}</span>${VARIANTS[v].name}<a href="${file(v, s.id)}">Open live ↗</a></figcaption>
    <a class="sc-frame" href="${file(v, s.id)}"><img src="shots/ghi/${VARIANTS[v].key}-${s.id}.jpg" alt="Variation ${VARIANTS[v].key} — ${s.l[0]}" loading="lazy"></a></figure>`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Design Directions G · H · I — TIMS</title>
<style>
:root{--ocean:#356A82;--teal:#3A817E;--mist:#DCECEF;--ink:#152E3A;--text:#20353D;--muted:#566970;--border:#D6E1E4;--bg:#F6F8F9}
*{box-sizing:border-box}body{margin:0;font:16px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--text);background:var(--bg)}
a{color:var(--ocean)}h1,h2,h3,p{margin:0}
.wrap{max-width:1560px;margin:0 auto;padding:0 24px}
header.top{background:var(--ink);color:#DCE9EC;padding:40px 0 34px}
header.top h1{color:#fff;font-size:2.2rem;line-height:1.2;margin:6px 0 10px}
.kick{font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.8rem;color:#A9D3D0}
.lead{max-width:900px;font-size:1.05rem}
.pill{display:inline-block;margin-top:16px;background:#F2B33D;color:#1c1300;font-weight:700;padding:6px 14px;border-radius:999px;font-size:.9rem}
.shared{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.shared span{border:1px solid rgba(255,255,255,.25);border-radius:6px;padding:4px 10px;font-size:.85rem}
.sw{display:inline-block;width:12px;height:12px;border-radius:3px;vertical-align:-1px;margin-right:4px}
section{padding:36px 0}section h2{font-size:1.5rem;margin-bottom:6px;color:var(--ink)}section > .wrap > p.sub{color:var(--muted);margin-bottom:20px}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.card{background:#fff;border:1px solid var(--border);border-radius:12px;padding:22px;display:flex;flex-direction:column;gap:12px}
.card h3{font-size:1.3rem;display:flex;align-items:center;gap:10px}
.b{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:8px;color:#fff;font-weight:800;flex:none}.b-g{background:#3A817E}.b-h{background:#152E3A}.b-i{background:#5B7F8C}
.card .ref{color:var(--muted);font-size:.9rem}
.card dl{margin:0;display:grid;gap:8px;font-size:.9rem}.card dt{font-weight:700;color:var(--ocean)}.card dd{margin:0}
.card ul{margin:0;padding-left:18px;font-size:.92rem}.card h4{margin:6px 0 2px;font-size:.95rem}
.plus li::marker{content:"+  ";color:#256B42;font-weight:800}.minus li::marker{content:"–  ";color:#A3241B;font-weight:800}
.card .open{display:flex;gap:8px;flex-wrap:wrap;margin-top:auto}.card .open a{font-size:.85rem;border:1px solid var(--border);border-radius:6px;padding:4px 8px;text-decoration:none}
.tabs{display:flex;gap:6px;flex-wrap:wrap;position:sticky;top:0;z-index:5;background:var(--bg);padding:12px 0;border-bottom:1px solid var(--border)}
.tabs button{border:1px solid var(--border);background:#fff;border-radius:999px;padding:8px 16px;font:inherit;font-weight:600;cursor:pointer;min-height:40px}
.tabs button[aria-selected="true"]{background:var(--ocean);color:#fff;border-color:var(--ocean)}
.cmp{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:16px}
.sc-shot{margin:0;background:#fff;border:1px solid var(--border);border-radius:12px;overflow:hidden}
.sc-shot figcaption{display:flex;align-items:center;gap:10px;padding:10px 12px;font-weight:700;border-bottom:1px solid var(--border)}
.sc-shot figcaption a{margin-left:auto;font-size:.85rem;font-weight:600}
.sc-frame{display:block;height:78vh;min-height:520px;overflow-y:auto;background:#e9eef0}
.sc-frame img{width:100%;display:block}
.note{font-size:.9rem;color:var(--muted);margin-top:10px}
table{border-collapse:collapse;width:100%;background:#fff;border:1px solid var(--border);border-radius:12px;overflow:hidden;font-size:.95rem}
th,td{padding:10px 12px;border-bottom:1px solid var(--border);text-align:left}th{background:#EEF4F5}
td.s{text-align:center;font-weight:700;width:90px}td.best{background:#E6F2EA;color:#256B42}
.reco{background:#fff;border:2px solid var(--teal);border-radius:12px;padding:24px;display:grid;grid-template-columns:1fr 1fr;gap:24px}
.reco h3{color:var(--teal);margin-bottom:8px}.reco ul{margin:0;padding-left:20px}
.decide{background:var(--ink);color:#DCE9EC;border-radius:12px;padding:24px}.decide h2{color:#fff}.decide code{background:rgba(255,255,255,.12);padding:2px 6px;border-radius:4px;color:#fff}
.var-nav-bar{position:fixed;right:14px;bottom:14px;z-index:9;background:rgba(16,30,37,.92);border-radius:12px;padding:6px;display:flex;gap:4px}
.var-nav-bar a{color:#fff;text-decoration:none;padding:6px 10px;border-radius:8px;font-weight:700;font-size:.85rem}.var-nav-bar a:hover{background:rgba(255,255,255,.15)}
@media (max-width:1000px){.cards,.cmp,.reco{grid-template-columns:1fr}.sc-frame{height:70vh}}
</style></head><body>
<header class="top"><div class="wrap">
  <p class="kick">Textile Institution Management System · Ministry of Textiles and Jute</p>
  <h1>Phase 1 — Design direction comparison: G · H · I</h1>
  <p class="lead">Three genuinely different UI/UX directions, each shown on the same 7 key screens with the same content, so you can compare them screen by screen. They share the approved scope, the public-first architecture, the 3-colour brand, the government identity rules and full Bangla/English switching. They differ in layout, hierarchy, hero, density, navigation and dashboard composition.</p>
  <p class="pill">Please choose G, H, I — or a hybrid (e.g. “G public website + I workspaces”). Phase 2 starts only after your confirmation.</p>
  <div class="shared"><span><i class="sw" style="background:#356A82"></i>Ocean Blue #356A82</span><span><i class="sw" style="background:#3A817E"></i>Teal #3A817E</span><span><i class="sw" style="background:#DCECEF"></i>Sky Mist #DCECEF</span><span>Public nav: Home · About Us · Admissions · Notice · Help</span><span>Public login: Candidate · Student · Teacher</span><span>Officials: separate portal domains</span><span>বাংলা | English on every screen</span></div>
</div></header>

<section><div class="wrap">
  <h2>The three directions</h2><p class="sub">Summary, strengths and weaknesses.</p>
  <div class="cards">${Object.entries(VAR).map(([k, x]) => `<article class="card">
    <h3><span class="b b-${k}">${VARIANTS[k].key}</span>${x.tag}</h3><p class="ref">${x.ref}</p><p>${x.concept}</p>
    <dl><div><dt>Typography & shape</dt><dd>${x.type}</dd></div><div><dt>Navigation</dt><dd>${x.nav}</dd></div><div><dt>Dashboard composition</dt><dd>${x.dash}</dd></div></dl>
    <div><h4>Strengths</h4><ul class="plus">${x.strengths.map((s) => `<li>${s}</li>`).join('')}</ul></div>
    <div><h4>Weaknesses</h4><ul class="minus">${x.weaknesses.map((s) => `<li>${s}</li>`).join('')}</ul></div>
    <p class="open">${SCREENS.map((s, i) => `<a href="${file(k, s.id)}">${String(i + 1).padStart(2, '0')} ${s.short}</a>`).join('')}</p>
  </article>`).join('')}</div>
</div></section>

<section id="compare"><div class="wrap">
  <h2>Side by side, screen by screen</h2><p class="sub">Pick a screen. Each frame scrolls through the full page; “Open live” opens the clickable prototype (switch language with বাংলা | English).</p>
  <div class="tabs" role="tablist">${SCREENS.map((s, i) => `<button type="button" role="tab" id="t-${s.id}" aria-controls="p-${s.id}" aria-selected="${i === 0}">${String(i + 1).padStart(2, '0')} · ${s.l[0]}</button>`).join('')}</div>
  ${SCREENS.map((s, i) => `<div id="p-${s.id}" role="tabpanel" aria-labelledby="t-${s.id}" ${i ? 'hidden' : ''}><div class="cmp">${['g', 'h', 'i'].map((v) => col(v, s)).join('')}</div></div>`).join('')}
  <p class="note">Screenshots: 1440px desktop, English. All three include the same edge states: overdue approvals, attendance below threshold, attendance not submitted, request returned for correction, result pending publication, approval pending with another office, selected-but-admission-incomplete candidate, empty notice category.</p>
</div></section>

<section><div class="wrap">
  <h2>Evaluation against the knowledge-base criteria</h2><p class="sub">Our assessment, 1–5 (5 = best). Highlighted = strongest for that criterion.</p>
  <table><thead><tr><th>Criterion</th><th>G</th><th>H</th><th>I</th></tr></thead><tbody>
  ${SCORES.map(([c, ...s]) => { const m = Math.max(...s); return `<tr><td>${c}</td>${s.map((x) => `<td class="s ${x === m ? 'best' : ''}">${x}</td>`).join('')}</tr>`; }).join('')}
  <tr><th>Total</th>${[1, 2, 3].map((k) => `<th class="s">${SCORES.reduce((a, r) => a + r[k], 0)}</th>`).join('')}</tr></tbody></table>
</div></section>

<section><div class="wrap">
  <h2>Recommendation</h2>
  <div class="reco">
    <div><h3>Strongest single direction: G — Public Service First</h3>
      <p>G fits the brief most closely: a real public website in the IPEMIS spirit, services first (BIDA), the clearest login/portal logic, and dashboards that open with the user’s next action. It is the safest choice for citizens, candidates, students and teachers.</p></div>
    <div><h3>Recommended hybrid</h3>
      <ul>
        <li><b>Public website: G</b>, with H’s photo quality and its interactive division map in the “Public dashboard” section.</li>
        <li><b>Ministry, Division, District and Principal portals: I’s workspace</b> (grouped sidebar, filter bar, work-queue tables, bulk approval, division tree), opened with G’s “Needs your decision” task cards and H’s map for national drill-down.</li>
        <li><b>Teacher, Student and Candidate: G’s workspace</b> (top navigation, task-first home, large type), with H’s inline attendance register.</li>
      </ul></div>
  </div>
</div></section>

<section><div class="wrap"><div class="decide">
  <h2>How to decide</h2>
  <p>Reply with one of: <code>G</code>, <code>H</code>, <code>I</code>, the recommended hybrid, or your own mix (e.g. <code>G public + H Ministry dashboard + I internal workflows</code>). Phase 2 — the single full prototype (all public pages, candidate flow, every role’s modules, empty/loading/error/permission/correction states, responsive, Bangla and English) — starts only after that confirmation.</p>
</div></div></section>
<nav class="var-nav-bar" aria-label="Prototype navigation"><a href="G-01-landing.html">G</a><a href="H-01-landing.html">H</a><a href="I-01-landing.html">I</a><a href="showcase-DEF.html">D/E/F</a></nav>
<script>
document.addEventListener('click',function(e){var t=e.target.closest('[role=tab]');if(!t)return;document.querySelectorAll('[role=tab]').forEach(function(b){var on=b===t;b.setAttribute('aria-selected',on);document.getElementById(b.getAttribute('aria-controls')).hidden=!on;});});
</script>
</body></html>`;
}
