// Final prototype (Variation H baseline) — page shells and shared components.
import { t, tt, n, d, ta, icon, each, esc, opt, bnDigits } from '../ghi/lib.mjs';

export { t, tt, n, d, ta, icon, each, esc, opt, bnDigits };

export const ORG = {
  gov: ["Government of the People's Republic of Bangladesh", 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার'],
  ministry: ['Ministry of Textiles and Jute', 'বস্ত্র ও পাট মন্ত্রণালয়'],
  dept: ['Department of Textiles', 'বস্ত্র অধিদপ্তর'],
  product: ['Textile Institution Management System', 'টেক্সটাইল প্রতিষ্ঠান ব্যবস্থাপনা সিস্টেম'],
  short: ['TIMS', 'টিআইএমএস'],
  helpline: '16xxx',
  email: 'help@tims.gov.bd',
};

/** Photo from assets/images with bilingual alt text. */
export const photo = (file, alt, cls = '', extra = '') =>
  `<img src="../assets/images/${file}" ${ta('alt', alt[0], alt[1])} class="${cls}" ${extra.includes('loading=') ? '' : 'loading="lazy" '}decoding="async" ${extra}>`;
export const logo = (cls = 'f-logo') => `<img src="../assets/brand/motj-logo.png" class="${cls}" width="56" height="57" ${ta('alt', 'Government of Bangladesh — Ministry of Textiles and Jute', 'বাংলাদেশ সরকার — বস্ত্র ও পাট মন্ত্রণালয়')}>`;

export const demo = () => `<span class="demo-tag" title="Demo / Illustrative Data">${icon('info', 'ico ico-xs')}${t('Demo / Illustrative Data', 'ডেমো / উদাহরণমূলক তথ্য')}</span>`;
export const tbd = (en = 'TBD — Requires Client Confirmation', bn = 'নির্ধারিত হবে — ক্লায়েন্টের নিশ্চিতকরণ প্রয়োজন') => `<span class="f-tbd">${icon('circle-dashed', 'ico ico-xs')}${t(en, bn)}</span>`;

// ---------- status vocabulary ----------
export const ST = {
  draft: [['Draft', 'খসড়া'], 'neutral'], submitted: [['Submitted', 'জমা হয়েছে'], 'info'], review: [['Under review', 'পর্যালোচনাধীন'], 'info'],
  returned: [['Correction required', 'সংশোধন প্রয়োজন'], 'warn'], approved: [['Approved', 'অনুমোদিত'], 'ok'], rejected: [['Rejected', 'প্রত্যাখ্যাত'], 'danger'],
  completed: [['Completed', 'সম্পন্ন'], 'ok'], pending: [['Pending', 'অপেক্ষমাণ'], 'warn'], published: [['Published', 'প্রকাশিত'], 'ok'],
  overdue: [['Overdue', 'মেয়াদোত্তীর্ণ'], 'danger'], missing: [['Not submitted', 'জমা হয়নি'], 'danger'], late: [['Late', 'বিলম্বিত'], 'warn'],
  recorded: [['Recorded', 'লিপিবদ্ধ'], 'ok'], issued: [['Issued', 'ইস্যু হয়েছে'], 'ok'], active: [['Active', 'সক্রিয়'], 'ok'], inactive: [['Inactive', 'নিষ্ক্রিয়'], 'neutral'],
  paid: [['Paid', 'পরিশোধিত'], 'ok'], unpaid: [['Unpaid', 'অপরিশোধিত'], 'warn'], failed: [['Payment failed', 'পরিশোধ ব্যর্থ'], 'danger'],
  inuse: [['In use', 'ব্যবহৃত হচ্ছে'], 'info'], available: [['Available', 'সহজলভ্য'], 'ok'], unavailable: [['Unavailable', 'অনুপলব্ধ'], 'neutral'],
  damaged: [['Damaged', 'ক্ষতিগ্রস্ত'], 'danger'], lost: [['Lost', 'হারানো'], 'danger'], open: [['Open', 'চলমান'], 'ok'], closed: [['Closed', 'বন্ধ'], 'neutral'],
  valid: [['Valid', 'বৈধ'], 'ok'], expired: [['Expired', 'মেয়াদোত্তীর্ণ'], 'warn'], revoked: [['Revoked', 'বাতিল'], 'danger'], due: [['Due', 'বাকি'], 'warn'],
  selected: [['Selected', 'নির্বাচিত'], 'ok'], notselected: [['Not selected', 'নির্বাচিত হয়নি'], 'neutral'], waiting: [['Waiting list', 'অপেক্ষমাণ তালিকা'], 'warn'],
};
export const st = (k) => `<span class="tag tag-${ST[k][1]}">${tt(ST[k][0])}</span>`;

// ---------- small building blocks ----------
export const btn = (label, attrs = '', cls = 'btn-primary', ic = '') => `<button type="button" class="btn ${cls}" ${attrs}>${ic ? icon(ic, 'ico ico-sm') : ''}${label}</button>`;
export const a = (href, label, cls = 'btn btn-primary', ic = '') => `<a class="${cls}" href="${href}">${ic ? icon(ic, 'ico ico-sm') : ''}${label}</a>`;
/** Attributes: on click set prototype state, then toast and/or go. */
export const act = ({ set, toast, go, confirm, ctext, reason } = {}) => [
  set ? `data-set="${set}"` : '', toast ? `data-after-toast="${esc(toast[0])}|${esc(toast[1])}"` : '', go ? `data-after-go="${go}"` : '',
  confirm ? `data-confirm="${esc(confirm[0])}|${esc(confirm[1])}"` : '', ctext ? `data-confirm-text="${esc(ctext[0])}|${esc(ctext[1])}"` : '', reason ? 'data-confirm-reason' : '',
].join(' ');
export const dl = (en, bn) => `data-after-toast="${esc(en || 'Download starts in production. Prototype only.')}|${esc(bn || 'প্রোডাকশনে ডাউনলোড শুরু হবে। শুধু প্রোটোটাইপ।')}" data-set="_=1"`;
export const when = (cond, html, tag = 'div', cls = '') => `<${tag} data-when="${cond}" ${cls ? `class="${cls}"` : ''}>${html}</${tag}>`;

export function field({ l, name = '', type = 'text', value = '', req = false, hint, opts, rows, attrs = '', ph, cls = '' }) {
  const label = `<span>${tt(l)}${req ? ' <i class="f-req" aria-hidden="true">*</i>' : ''}</span>`;
  let ctl;
  if (opts) ctl = `<select name="${name}" ${req ? 'required' : ''} ${attrs}>${opts.map((o) => (Array.isArray(o) ? opt(o[0], o[1], o[2], o[3]) : o)).join('')}</select>`;
  else if (rows) ctl = `<textarea name="${name}" rows="${rows}" ${req ? 'required' : ''} ${attrs} ${ph ? ta('placeholder', ph[0], ph[1]) : ''}>${esc(value)}</textarea>`;
  else ctl = `<input name="${name}" type="${type}" value="${esc(value)}" ${req ? 'required' : ''} ${attrs} ${ph ? ta('placeholder', ph[0], ph[1]) : ''}>`;
  return `<label class="fld ${cls}">${label}${ctl}${hint ? `<span class="hint">${tt(hint)}</span>` : ''}<span class="err" hidden>${t('Please complete this field correctly.', 'ঘরটি সঠিকভাবে পূরণ করুন।')}</span></label>`;
}

export function alert(tone, title, body = '', action = '') {
  const ic = { ok: 'circle-check', warn: 'triangle-alert', danger: 'circle-alert', info: 'info' }[tone];
  return `<div class="f-alert is-${tone}" role="${tone === 'danger' ? 'alert' : 'status'}">${icon(ic, 'ico')}<div><b>${title}</b>${body ? `<p>${body}</p>` : ''}</div>${action}</div>`;
}

export function empty(title, body = '', action = '', ic = 'inbox') {
  return `<div class="f-empty">${icon(ic, 'ico ico-xl')}<b>${title}</b>${body ? `<p>${body}</p>` : ''}${action}</div>`;
}

/** Timeline: steps [{l, who, when, st: done|now|todo|warn|fail, note}] */
export function timeline(steps) {
  return `<ol class="f-tl">${each(steps, (s) => `<li class="is-${s.st || 'todo'}" ${s.when_ ? `data-when="${s.when_}"` : ''}><span class="f-tl-dot">${s.st === 'done' ? icon('check', 'ico ico-xs') : s.st === 'fail' ? icon('x', 'ico ico-xs') : ''}</span>
    <div><b>${tt(s.l)}</b>${s.who ? `<small>${tt(s.who)}${s.at ? ` · ${d(s.at)}` : ''}</small>` : ''}${s.note ? `<p>${tt(s.note)}</p>` : ''}</div></li>`)}</ol>`;
}

export function tabs(id, list) {
  return `<div class="f-tabs" role="tablist" ${ta('aria-label', 'Sections', 'অংশসমূহ')}>${each(list, (x, i) => `<button type="button" role="tab" id="tab-${x.id}" aria-controls="pan-${x.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${tt(x.l)}${x.count !== undefined ? ` <span class="f-count">${n(x.count)}</span>` : ''}</button>`)}</div>
  ${each(list, (x, i) => `<section id="pan-${x.id}" role="tabpanel" aria-labelledby="tab-${x.id}" class="f-panel" ${i ? 'hidden' : ''}>${x.content}</section>`)}`;
}

/** Data table with optional search and status filter. cols: [{l, cls}] rows: [{cells:[], attrs, status}] */
export function table({ id, cols, rows, search, statusFilter, emptyMsg, foot, compact, caption }) {
  const tools = search || statusFilter ? `<div class="f-tools">
    ${search ? `<label class="f-search">${icon('search', 'ico ico-sm')}<span class="sr-only">${t('Search', 'অনুসন্ধান')}</span><input type="search" data-table-filter="${id}" ${ta('placeholder', search[0], search[1])}></label>` : ''}
    ${statusFilter ? `<label class="f-sel"><span>${t('Status', 'অবস্থা')}</span><select data-table-status="${id}">${opt('all', 'All', 'সব')}${statusFilter.map((k) => opt(k, ST[k][0][0], ST[k][0][1])).join('')}</select></label>` : ''}
    <span class="f-tools-count"><b data-table-count="${id}">${n(rows.length)}</b> ${t('records', 'টি রেকর্ড')}</span></div>` : '';
  return `${tools}<div class="f-table-wrap"><table class="f-table ${compact ? 'is-compact' : ''}" id="${id}">${caption ? `<caption class="sr-only">${tt(caption)}</caption>` : ''}
    <thead><tr>${each(cols, (c) => `<th class="${c.cls || ''}" scope="col">${c.l ? tt(c.l) : ''}</th>`)}</tr></thead>
    <tbody>${each(rows, (r) => `<tr ${r.attrs || ''} ${r.status ? `data-status="${r.status}"` : ''}>${each(r.cells, (c, i) => `<td class="${cols[i].cls || ''}">${c}</td>`)}</tr>`)}</tbody></table>
    <div class="f-empty f-table-empty" data-table-empty="${id}" hidden>${icon('search-x', 'ico ico-lg')}<b>${emptyMsg ? tt(emptyMsg) : t('No records match your search.', 'অনুসন্ধানের সাথে কোনো রেকর্ড মেলেনি।')}</b></div></div>
    ${foot ? `<div class="f-tfoot">${foot}</div>` : ''}`;
}
export const pager = (shown, total) => `<span>${t('Showing', 'দেখানো হচ্ছে')} ${n(shown)} ${t('of', '/')} ${n(total)}</span><span class="f-pager"><button type="button" class="btn btn-outline btn-sm" disabled>${t('Previous', 'আগের')}</button><button type="button" class="btn btn-outline btn-sm" ${act({ set: '_=1', toast: ['Next page loads in production. Prototype shows the first page.', 'প্রোডাকশনে পরের পাতা আসবে। প্রোটোটাইপে প্রথম পাতা দেখানো হয়েছে।'] })}>${t('Next', 'পরের')}</button></span>`;

export const card = (title, inner, extra = '', cls = '') => `<section class="h-card ${cls}"><header class="h-card-head"><h2>${title}</h2>${extra}</header>${inner}</section>`;
export const kpis = (list, cls = '') => `<ul class="h-kpis f-kpis ${cls}" style="--n:${list.length}">${each(list, (k) => `<li class="${k.tone ? `is-${k.tone}` : ''}" ${k.when ? `data-when="${k.when}"` : ''}><span>${tt(k.l)}</span><b class="h-num-lg">${k.raw || n(k.v)}</b><small>${tt(k.s)}</small></li>`)}</ul>`;
export const pageHead = ({ eyebrow, title, sub, actions = '' }) => `<div class="h-pagehead"><div>${eyebrow ? `<p class="h-eyebrow">${tt(eyebrow)}</p>` : ''}<h1 class="h-display h-display-app">${title}</h1>${sub ? `<p class="muted">${sub}</p>` : ''}</div>${actions ? `<div class="h-pagehead-act">${actions}</div>` : ''}</div>`;

// ---------- charts ----------
const PALETTE = ['#356A82', '#3A817E', '#8DBCC7', '#1D3E4D', '#B9D3D9'];
export function lineChart({ labels, series, min, max, unit = '', h = 240, w = 640, threshold, aria }) {
  const x = (i) => 46 + (i / (labels.length - 1)) * (w - 66); const y = (v) => 14 + (1 - (v - min) / (max - min)) * (h - 48);
  const ticks = [min, (min + max) / 2, max];
  return `<figure class="f-chart"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(aria || '')}">
    ${ticks.map((g) => `<line x1="46" x2="${w - 16}" y1="${y(g)}" y2="${y(g)}" class="f-grid"/><text x="40" y="${y(g) + 4}" text-anchor="end">${Math.round(g * 10) / 10}${unit}</text>`).join('')}
    ${threshold ? `<line x1="46" x2="${w - 16}" y1="${y(threshold)}" y2="${y(threshold)}" class="f-thr"/>` : ''}
    ${series.map((s, k) => { const pts = s.data.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`); return `${k === 0 ? `<path d="M${pts.join('L')}L${x(s.data.length - 1)},${h - 34}L46,${h - 34}Z" fill="${s.color || PALETTE[k]}" opacity=".1"/>` : ''}<path d="M${pts.join('L')}" fill="none" stroke="${s.color || PALETTE[k]}" stroke-width="2.5"/>${s.data.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="#fff" stroke="${s.color || PALETTE[k]}" stroke-width="2"/>`).join('')}`; }).join('')}
    ${labels.map((l, i) => `<text x="${x(i)}" y="${h - 12}" text-anchor="middle">${esc(l)}</text>`).join('')}
  </svg>${legend(series)}</figure>`;
}
export function groupedBars({ labels, series, max, unit = '', h = 260, w = 640, aria }) {
  const gw = (w - 60) / labels.length; const bw = Math.min(26, (gw - 14) / series.length); const y = (v) => (h - 40) - (v / max) * (h - 60);
  return `<figure class="f-chart"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(aria || '')}">
    ${[0, max / 2, max].map((g) => `<line x1="50" x2="${w - 8}" y1="${y(g)}" y2="${y(g)}" class="f-grid"/><text x="44" y="${y(g) + 4}" text-anchor="end">${g.toLocaleString('en-US')}${unit}</text>`).join('')}
    ${labels.map((l, i) => { const gx = 56 + i * gw + (gw - bw * series.length) / 2; return series.map((s, k) => `<rect x="${gx + k * bw}" y="${y(s.data[i])}" width="${bw - 3}" height="${(h - 40) - y(s.data[i])}" fill="${s.color || PALETTE[k]}" rx="2"><title>${esc(s.name[0])}: ${s.data[i]}</title></rect>`).join('') + `<text x="${56 + i * gw + gw / 2}" y="${h - 22}" text-anchor="middle">${esc(l)}</text>`; }).join('')}
  </svg>${legend(series)}</figure>`;
}
export function donut({ parts, total, center }) {
  const sum = parts.reduce((s, p) => s + p.v, 0); let acc = 0; const R = 70, C = 2 * Math.PI * R;
  return `<figure class="f-chart f-donut"><svg viewBox="0 0 200 200" role="img" aria-label="${esc(parts.map((p) => `${p.l[0]} ${p.v}`).join(', '))}">
    ${parts.map((p, k) => { const len = (p.v / sum) * C; const s = `<circle cx="100" cy="100" r="${R}" fill="none" stroke="${p.color || PALETTE[k]}" stroke-width="30" stroke-dasharray="${len} ${C - len}" stroke-dashoffset="${-acc}" transform="rotate(-90 100 100)"/>`; acc += len; return s; }).join('')}
    <text x="100" y="98" text-anchor="middle" class="f-donut-v">${esc(total)}</text><text x="100" y="120" text-anchor="middle" class="f-donut-l">${esc(center || '')}</text>
  </svg><ul class="f-legend">${each(parts, (p, k) => `<li><i style="background:${p.color || PALETTE[k]}"></i>${tt(p.l)} <b>${n(p.v)}</b></li>`)}</ul></figure>`;
}
export function hbars(list, { max, unit = '', threshold } = {}) {
  const m = max || Math.max(...list.map((x) => x.v));
  return `<ul class="h-bars f-hbars">${each(list, (x) => `<li><span class="h-bars-l"><b>${tt(x.l)}</b>${x.s ? `<small>${tt(x.s)}</small>` : ''}</span>
    <span class="h-bars-track"><i class="${threshold && x.v < threshold ? 'is-low' : ''}" style="width:${(x.v / m) * 100}%"></i>${threshold ? `<em style="left:${(threshold / m) * 100}%"></em>` : ''}</span>
    <span class="h-bars-v">${n(`${x.v}${unit}`)}</span></li>`)}</ul>`;
}
const legend = (series) => `<ul class="f-legend">${each(series, (s, k) => `<li><i style="background:${s.color || PALETTE[k]}"></i>${tt(s.name)}</li>`)}</ul>`;
export const chartMeta = (unit, period, demoFlag = true) => `<p class="f-chart-meta">${t('Unit', 'একক')}: ${tt(unit)} · ${t('Period', 'সময়কাল')}: ${tt(period)} · ${demoFlag ? demo() : t('Source: system records', 'উৎস: সিস্টেম রেকর্ড')}</p>`;

// ---------- public chrome ----------
export const PUB_NAV = [
  ['home', ['Home', 'হোম'], 'index.html'], ['about', ['About Us', 'আমাদের সম্পর্কে'], 'about.html'], ['academic', ['Academic', 'একাডেমিক'], 'academic.html'],
  ['admissions', ['Admissions', 'ভর্তি'], 'admissions.html'], ['notice', ['Notice', 'নোটিশ'], 'notices.html'], ['help', ['Help', 'সহায়তা'], 'help.html'],
];
function publicHeader(active) {
  return `
<div class="f-util"><div class="container f-util-in">
  <p class="f-util-gov">${tt(ORG.gov)}</p>
  <nav class="f-util-nav" ${ta('aria-label', 'Utility', 'প্রয়োজনীয় লিংক')}>
    <a href="verify.html">${icon('badge-check', 'ico ico-sm')}${t('Results / Verification', 'ফলাফল / যাচাই')}</a>
    <a href="help.html#downloads">${icon('download', 'ico ico-sm')}${t('Downloads', 'ডাউনলোড')}</a>
    <a href="help.html#contact">${icon('phone', 'ico ico-sm')}${t('Contact', 'যোগাযোগ')}</a>
    <a href="portals.html" class="f-util-portals">${icon('landmark', 'ico ico-sm')}${t('Government Portals', 'সরকারি পোর্টাল')}</a>
    <button type="button" data-open="dlg-search" ${ta('aria-label', 'Search', 'অনুসন্ধান')}>${icon('search', 'ico ico-sm')}<span class="f-hide-sm">${t('Search', 'অনুসন্ধান')}</span></button>
    <span class="lang f-lang" role="group" aria-label="Language / ভাষা"><button type="button" data-set-lang="bn" lang="bn">বাংলা</button><button type="button" data-set-lang="en" lang="en">English</button></span>
  </nav>
</div></div>
<header class="f-head"><div class="container f-head-in">
  <a class="f-brand" href="index.html">${logo()}<span><small>${tt(ORG.ministry)} · ${tt(ORG.dept)}</small><b>${tt(ORG.product)}</b></span></a>
  <nav class="f-nav" id="f-nav" ${ta('aria-label', 'Main', 'প্রধান মেনু')}><ul>${each(PUB_NAV, ([k, l, h]) => `<li><a href="${h}" ${k === active ? 'aria-current="page"' : ''}>${tt(l)}</a></li>`)}</ul></nav>
  <a class="btn btn-teal f-login-btn" href="student-login.html">${icon('log-in', 'ico ico-sm')}${t('Student Login', 'শিক্ষার্থী লগইন')}</a>
  <button type="button" class="f-menu-btn" data-menu="f-nav" aria-expanded="false" ${ta('aria-label', 'Menu', 'মেনু')}>${icon('menu')}</button>
</div></header>
<dialog id="dlg-search" class="dlg dlg-wide" aria-labelledby="dlg-search-t">
  <div class="dlg-head"><h2 id="dlg-search-t">${t('Search the website', 'ওয়েবসাইটে অনুসন্ধান')}</h2><button type="button" class="dlg-x" data-close ${ta('aria-label', 'Close', 'বন্ধ করুন')}>${icon('x')}</button></div>
  <form class="dlg-body" action="notices.html"><label class="fld"><span>${t('Keyword', 'কীওয়ার্ড')}</span><input type="search" name="q" ${ta('placeholder', 'Notice, institution, service…', 'নোটিশ, প্রতিষ্ঠান, সেবা…')}></label>
    <p class="muted">${t('Frequently searched:', 'বহুল অনুসন্ধানকৃত:')} <a class="link" href="admissions.html">${t('Admission 2026–27', 'ভর্তি ২০২৬–২৭')}</a> · <a class="link" href="verify.html">${t('Certificate verification', 'সনদ যাচাই')}</a> · <a class="link" href="institutions.html">${t('Institution directory', 'প্রতিষ্ঠান ডিরেক্টরি')}</a></p>
    <div class="dlg-foot"><button type="submit" class="btn btn-primary">${icon('search', 'ico ico-sm')}${t('Search notices', 'নোটিশে খুঁজুন')}</button></div></form>
</dialog>`;
}
function publicFooter() {
  const col = (h, items) => `<div><h3>${tt(h)}</h3><ul>${items.map(([l, href]) => `<li><a href="${href}">${tt(l)}</a></li>`).join('')}</ul></div>`;
  return `
<section class="f-portal-strip" aria-labelledby="fps-t"><div class="container f-portal-strip-in">
  <div><h2 id="fps-t">${icon('landmark', 'ico')}${t('Institutional and Government Portals', 'প্রাতিষ্ঠানিক ও সরকারি পোর্টাল')}</h2><p>${t('Separate secure access for authorised government and institution users.', 'অনুমোদিত সরকারি ও প্রতিষ্ঠানের ব্যবহারকারীদের জন্য পৃথক নিরাপদ প্রবেশ।')}</p></div>
  <ul>${each(PORTALS, (p) => `<li><a href="${p.href}">${icon(p.icon, 'ico ico-sm')}${tt(p.l)}</a></li>`)}</ul>
  <a class="btn btn-white" href="portals.html">${t('All portals', 'সব পোর্টাল')}${icon('arrow-right', 'ico ico-sm')}</a>
</div></section>
<footer class="f-foot">
  <div class="container f-foot-own">${logo('f-logo f-logo-inv')}<div><b>${tt(ORG.product)}</b><p>${t('Owned and operated by the Department of Textiles, Ministry of Textiles and Jute, Government of the People’s Republic of Bangladesh.', 'মালিকানা ও পরিচালনা: বস্ত্র অধিদপ্তর, বস্ত্র ও পাট মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার।')}</p></div></div>
  <div class="container f-foot-grid">
    ${col(['About', 'সম্পর্কে'], [[['About the system', 'সিস্টেম সম্পর্কে'], 'about.html'], [['Responsible officials', 'দায়িত্বপ্রাপ্ত কর্মকর্তা'], 'officials.html'], [['Public dashboard', 'পাবলিক ড্যাশবোর্ড'], 'public-dashboard.html'], [['Photo gallery', 'ফটো গ্যালারি'], 'gallery.html']])}
    ${col(['Academic', 'একাডেমিক'], [[['Programmes', 'প্রোগ্রাম'], 'academic.html'], [['Institution directory', 'প্রতিষ্ঠান ডিরেক্টরি'], 'institutions.html'], [['Academic calendar', 'একাডেমিক ক্যালেন্ডার'], 'academic.html#calendar']])}
    ${col(['Admissions', 'ভর্তি'], [[['Admission 2026–27', 'ভর্তি ২০২৬–২৭'], 'admissions.html'], [['Apply online', 'অনলাইনে আবেদন'], 'apply.html'], [['Candidate login', 'প্রার্থী লগইন'], 'candidate-login.html'], [['Admission result', 'ভর্তির ফলাফল'], 'admission-result.html']])}
    ${col(['Results / Verification', 'ফলাফল / যাচাই'], [[['Certificate verification', 'সনদ যাচাই'], 'verify.html'], [['Professional licence', 'পেশাগত লাইসেন্স'], 'license.html'], [['Organisation verification', 'প্রতিষ্ঠানের যাচাই'], 'verifier.html']])}
    ${col(['Notices', 'নোটিশ'], [[['All notices', 'সকল নোটিশ'], 'notices.html'], [['Admission notices', 'ভর্তি নোটিশ'], 'notices.html'], [['Tenders', 'দরপত্র'], 'notices.html']])}
    ${col(['Help', 'সহায়তা'], [[['FAQ', 'সাধারণ জিজ্ঞাসা'], 'help.html#faq'], [['User guides', 'ব্যবহার নির্দেশিকা'], 'help.html#guides'], [['Forms and downloads', 'ফরম ও ডাউনলোড'], 'help.html#downloads'], [['Contact', 'যোগাযোগ'], 'help.html#contact']])}
  </div>
  <div class="container f-foot-links">
    <div><h3>${t('Related organisations', 'সংশ্লিষ্ট প্রতিষ্ঠান')}</h3><p><a href="https://motj.gov.bd/" rel="noopener">${tt(ORG.ministry)}</a> · <a href="https://dot.gov.bd/" rel="noopener">${tt(ORG.dept)}</a> · <a href="https://www.bteb.gov.bd/" rel="noopener">${t('Bangladesh Technical Education Board', 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড')}</a> · <a href="https://bangladesh.gov.bd/" rel="noopener">${t('National Portal', 'জাতীয় তথ্য বাতায়ন')}</a></p></div>
    <div><h3>${t('Contact', 'যোগাযোগ')}</h3><p>${t('Help desk', 'হেল্প ডেস্ক')}: ${n(ORG.helpline)} · ${ORG.email} · ${t('Sun–Thu, 9:00–17:00', 'রবি–বৃহস্পতি, ৯:০০–১৭:০০')}</p></div>
  </div>
  <div class="f-foot-bar"><div class="container f-foot-bar-in"><p>© 2026 ${tt(ORG.dept)}, ${tt(ORG.ministry)}</p><p>${t('Last updated', 'সর্বশেষ হালনাগাদ')}: ${d('15 Oct 2026')} · ${t('Prototype for review — figures are Demo / Illustrative Data', 'পর্যালোচনার জন্য প্রোটোটাইপ — সংখ্যাগুলো ডেমো / উদাহরণমূলক তথ্য')}</p></div></div>
</footer>`;
}
export const PORTALS = [
  { k: 'ministry', icon: 'landmark', l: ['Ministry Portal', 'মন্ত্রণালয় পোর্টাল'], dom: 'ministry.tims.gov.bd', href: 'portal-ministry.html', who: ['Ministry of Textiles and Jute and Department of Textiles officials: national monitoring, approvals, budget, reports, licences.', 'বস্ত্র ও পাট মন্ত্রণালয় ও বস্ত্র অধিদপ্তরের কর্মকর্তা: জাতীয় পর্যবেক্ষণ, অনুমোদন, বাজেট, প্রতিবেদন, লাইসেন্স।'] },
  { k: 'division', icon: 'map', l: ['Division Portal', 'বিভাগীয় পোর্টাল'], dom: 'division.tims.gov.bd', href: 'portal-division.html', who: ['Division administrators: districts and institutions within the assigned division.', 'বিভাগীয় প্রশাসক: নির্ধারিত বিভাগের জেলা ও প্রতিষ্ঠান।'] },
  { k: 'district', icon: 'map-pin', l: ['District Portal', 'জেলা পোর্টাল'], dom: 'district.tims.gov.bd', href: 'portal-district.html', who: ['District administrators: institutions within the assigned district.', 'জেলা প্রশাসক: নির্ধারিত জেলার প্রতিষ্ঠান।'] },
  { k: 'institution', icon: 'building-2', l: ['Institution Portal', 'প্রতিষ্ঠান পোর্টাল'], dom: 'institution.tims.gov.bd', href: 'portal-institution.html', who: ['Principal / Institution Admin, teachers and authorised staff of one institution.', 'একটি প্রতিষ্ঠানের অধ্যক্ষ / প্রতিষ্ঠান অ্যাডমিন, শিক্ষক ও অনুমোদিত কর্মচারী।'] },
];

// ---------- internal workspace chrome ----------
export const NAV = {
  ministry: { portal: PORTALS[0], user: ['Farhana Ahmed', ['System Administrator, Ministry', 'সিস্টেম অ্যাডমিনিস্ট্রেটর, মন্ত্রণালয়'], 'FA'], scope: ['All Bangladesh', 'সমগ্র বাংলাদেশ'], out: 'portals.html',
    groups: [[null, [['ministry', 'layout-dashboard', ['Overview', 'সারসংক্ষেপ']]]],
      [['Institutions & academics', 'প্রতিষ্ঠান ও একাডেমিক'], [['ministry-institutions', 'building-2', ['Institutions', 'প্রতিষ্ঠান']], ['ministry-admissions', 'clipboard-list', ['Admissions', 'ভর্তি']], ['ministry-attendance', 'user-check', ['Live attendance', 'লাইভ হাজিরা']]]],
      [['Resources', 'সম্পদ'], [['ministry-budget', 'wallet', ['Budget', 'বাজেট']], ['ministry-assets', 'package', ['Assets', 'সম্পদ']]]],
      [['Decisions', 'সিদ্ধান্ত'], [['ministry-approvals', 'inbox', ['Approvals', 'অনুমোদন'], 12], ['ministry-licenses', 'badge-check', ['Licences (Phase 2)', 'লাইসেন্স (২য় পর্যায়)']]]],
      [['Administration', 'প্রশাসন'], [['ministry-reports', 'chart-column', ['Reports', 'প্রতিবেদন']], ['ministry-users', 'user-round-cog', ['Users & roles', 'ব্যবহারকারী ও ভূমিকা']], ['ministry-integrations', 'plug', ['Integrations', 'ইন্টিগ্রেশন']]]]] },
  division: { portal: PORTALS[1], user: ['Sharmin Akter', ['Division Administrator', 'বিভাগীয় প্রশাসক'], 'SA'], scope: ['Chattogram Division', 'চট্টগ্রাম বিভাগ'], out: 'portals.html',
    groups: [[null, [['division', 'layout-dashboard', ['Overview', 'সারসংক্ষেপ']], ['division#districts', 'map', ['Districts & institutions', 'জেলা ও প্রতিষ্ঠান']], ['division#attendance', 'user-check', ['Attendance & reporting', 'হাজিরা ও রিপোর্টিং']], ['division#actions', 'inbox', ['Follow-up actions', 'অনুসরণীয় কাজ']], ['ministry-reports', 'chart-column', ['Reports', 'প্রতিবেদন']]]]] },
  district: { portal: PORTALS[2], user: ['Mahmudul Hasan', ['District Administrator', 'জেলা প্রশাসক'], 'MH'], scope: ['Chattogram District', 'চট্টগ্রাম জেলা'], out: 'portals.html',
    groups: [[null, [['district', 'layout-dashboard', ['Overview', 'সারসংক্ষেপ']], ['district#institutions', 'building-2', ['Institutions', 'প্রতিষ্ঠান']], ['district#actions', 'inbox', ['Actions', 'করণীয়']], ['ministry-reports', 'chart-column', ['Reports', 'প্রতিবেদন']]]]] },
  principal: { portal: PORTALS[3], user: ['Md. Saiful Islam', ['Principal', 'অধ্যক্ষ'], 'SI'], scope: ['Karnaphuli Textile Institute', 'কর্ণফুলী টেক্সটাইল ইনস্টিটিউট'], out: 'portals.html',
    groups: [[null, [['principal', 'layout-dashboard', ['Overview', 'সারসংক্ষেপ']]]],
      [['Academics', 'একাডেমিক'], [['inst-students', 'graduation-cap', ['Students', 'শিক্ষার্থী']], ['inst-teachers', 'users', ['Teachers', 'শিক্ষক']], ['inst-classes', 'layers', ['Classes', 'ক্লাস']], ['inst-attendance', 'user-check', ['Attendance', 'হাজিরা']], ['inst-results', 'clipboard-check', ['Results', 'ফলাফল']]]],
      [['Services & approvals', 'সেবা ও অনুমোদন'], [['inst-requests', 'inbox', ['Student requests', 'শিক্ষার্থী আবেদন'], 4], ['inst-leave', 'calendar-days', ['Leave', 'ছুটি']], ['inst-certificates', 'award', ['Certificates & alumni', 'সনদ ও প্রাক্তন শিক্ষার্থী']]]],
      [['Resources', 'সম্পদ'], [['inst-finance', 'wallet', ['Finance', 'অর্থ']], ['inst-assets', 'package', ['Assets', 'সম্পদ']], ['inst-procurement', 'truck', ['Procurement', 'ক্রয়']], ['inst-library', 'library', ['Library', 'লাইব্রেরি']]]],
      [['Administration', 'প্রশাসন'], [['inst-access', 'shield-check', ['Menu access', 'মেনু অ্যাক্সেস']]]]] },
  teacher: { portal: PORTALS[3], user: ['Arif Hossain', ['Instructor (Weaving)', 'ইন্সট্রাক্টর (উইভিং)'], 'AH'], scope: ['Karnaphuli Textile Institute', 'কর্ণফুলী টেক্সটাইল ইনস্টিটিউট'], out: 'portals.html',
    groups: [[null, [['teacher', 'house', ['Home', 'হোম']], ['teacher-classes', 'layers', ['My classes & materials', 'আমার ক্লাস ও উপকরণ']], ['teacher-attendance', 'user-check', ['Attendance', 'হাজিরা']], ['teacher-results', 'clipboard-check', ['Results', 'ফলাফল']], ['teacher-leave', 'calendar-days', ['Leave', 'ছুটি']]]]] },
  student: { portal: null, user: ['Mim Akter', ['Student', 'শিক্ষার্থী'], 'MA'], scope: ['Karnaphuli Textile Institute', 'কর্ণফুলী টেক্সটাইল ইনস্টিটিউট'], out: 'index.html',
    groups: [[null, [['student', 'house', ['Home', 'হোম']], ['student-academics', 'book-open', ['Academics', 'একাডেমিক']], ['student-results', 'chart-column', ['Results & attendance', 'ফলাফল ও উপস্থিতি']], ['student-services', 'file-text', ['Online services', 'অনলাইন সেবা']], ['student-payment', 'wallet', ['Payments & ledger', 'পরিশোধ ও লেজার']], ['student-certificate', 'award', ['Certificate', 'সনদ']], ['student-profile', 'user', ['Profile', 'প্রোফাইল']]]]] },
  alumni: { portal: null, user: ['Rafiul Alam', ['Alumni', 'প্রাক্তন শিক্ষার্থী'], 'RA'], scope: ['Karnaphuli Textile Institute', 'কর্ণফুলী টেক্সটাইল ইনস্টিটিউট'], out: 'index.html',
    groups: [[null, [['alumni', 'graduation-cap', ['Alumni profile', 'প্রাক্তন শিক্ষার্থী প্রোফাইল']]]]] },
};

function appShell(role, active, crumbs, content) {
  const R = NAV[role];
  const nav = each(R.groups, ([h, items]) => `${h ? `<p class="f-side-h">${tt(h)}</p>` : ''}<ul>${each(items, ([href, ic, l, c]) => {
    const [file, hash] = href.split('#'); const cur = active === href;
    return `<li><a href="${file}.html${hash ? `#${hash}` : ''}" ${cur ? 'aria-current="page"' : ''}>${icon(ic)}${tt(l)}${c ? `<span class="h-side-count">${n(c)}</span>` : ''}</a></li>`;
  })}</ul>`);
  return `
<div class="h-app">
  <aside class="h-side f-side" id="h-side" ${ta('aria-label', 'Workspace navigation', 'ওয়ার্কস্পেস মেনু')}>
    <a class="h-side-brand" href="${R.groups[0][1][0][0]}.html">${logo('f-logo f-logo-sm')}<span><b>${tt(ORG.short)}</b><small>${R.portal ? tt(R.portal.l) : role === 'alumni' ? t('Alumni portal', 'প্রাক্তন শিক্ষার্থী পোর্টাল') : t('Student portal', 'স্টুডেন্ট পোর্টাল')}</small></span></a>
    <nav>${nav}</nav>
    <div class="h-side-scope"><small>${t('Your scope', 'আপনার পরিধি')}</small><b>${tt(R.scope)}</b></div>
    <a class="h-side-out" href="${R.out}">${icon('log-out', 'ico ico-sm')}${t('Sign out', 'লগআউট')}</a>
  </aside>
  <div class="h-main">
    <header class="h-top">
      <button type="button" class="h-icon h-side-btn" data-menu="h-side" aria-expanded="false" ${ta('aria-label', 'Menu', 'মেনু')}>${icon('menu')}</button>
      <nav class="h-crumb h-crumb-app" ${ta('aria-label', 'Breadcrumb', 'অবস্থান')}>${crumbs.map((c, i) => (i < crumbs.length - 1 ? `<span>${tt(c)}</span><span aria-hidden="true">/</span>` : `<span aria-current="page">${tt(c)}</span>`)).join('')}</nav>
      ${R.portal ? `<span class="f-domain" title="Proposed secure address — prototype only">${icon('lock', 'ico ico-xs')}${R.portal.dom}</span>` : ''}
      <button type="button" class="h-lang-tg" data-toggle-lang><span class="l-en" lang="bn">বাংলা</span><span class="l-bn" lang="en">English</span></button>
      <a class="h-icon h-bell" href="#notices" ${ta('aria-label', 'Notifications', 'নোটিফিকেশন')}>${icon('bell')}<i></i></a>
      <span class="h-me"><span class="h-avatar">${R.user[2]}</span><span class="h-me-txt"><b>${R.user[0]}</b><small>${tt(R.user[1])}</small></span></span>
    </header>
    <main id="main" class="h-content">${content}</main>
  </div>
</div>`;
}

function dialogs() {
  return `
<dialog id="dlg-confirm" class="dlg" aria-labelledby="dlg-confirm-title">
  <div class="dlg-head"><h2 id="dlg-confirm-title" data-confirm-title></h2><button type="button" class="dlg-x" data-close ${ta('aria-label', 'Close', 'বন্ধ করুন')}>${icon('x')}</button></div>
  <div class="dlg-body"><p data-confirm-text></p>
    <label class="fld" data-confirm-note hidden><span>${t('Reason / instruction (sent to the applicant)', 'কারণ / নির্দেশনা (আবেদনকারীকে পাঠানো হবে)')}</span><textarea rows="3">${t('Photo is not clear. Upload a recent passport-size photo.', 'ছবি অস্পষ্ট। সাম্প্রতিক পাসপোর্ট সাইজের ছবি আপলোড করুন।')}</textarea></label></div>
  <div class="dlg-foot"><button type="button" class="btn btn-ghost" data-close>${t('Cancel', 'বাতিল')}</button><button type="button" class="btn btn-primary" data-confirm-ok>${t('Confirm', 'নিশ্চিত করুন')}</button></div>
</dialog>
<dialog id="dlg-lightbox" class="dlg dlg-lightbox" aria-label="Photo"><button type="button" class="dlg-x" data-close ${ta('aria-label', 'Close', 'বন্ধ করুন')}>${icon('x')}</button><img alt="" data-lb-img><p data-lb-cap></p></dialog>
<div id="toast" class="toast" popover="manual" role="status" aria-live="polite"></div>`;
}

function protoBar(file) {
  return `<nav class="var-nav-bar f-proto" aria-label="Prototype navigation" data-vnb>
  <button type="button" class="vnb-toggle" aria-expanded="true" data-vnb-toggle><span class="vnb-badge vnb-h">H</span><span class="vnb-hide-sm">Final prototype</span></button>
  <div class="vnb-body"><a href="prototype-index.html" ${file === 'prototype-index' ? 'aria-current="page"' : ''}>Review index</a><a href="index.html">Public site</a><a href="portals.html">Portals</a>
  <button type="button" data-reset-state>Reset demo data</button></div></nav>`;
}

/** Full HTML page. kind: 'public' | role key | 'bare' */
export function page({ file, title, kind = 'public', active = '', crumbs = [], body }) {
  const inner = kind === 'public' ? `${publicHeader(active)}<main id="main">${body}</main>${publicFooter()}`
    : kind === 'bare' ? `<main id="main">${body}</main>` : appShell(kind, active, crumbs, body);
  return `<!doctype html>
<html lang="en" data-lang="en" data-v="h">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title data-en="${esc(title[0])} · TIMS" data-bn="${esc(title[1])} · টিআইএমএস">${esc(title[0])} · TIMS</title>
<meta name="description" content="Textile Institution Management System — final prototype (Variation H).">
<link rel="icon" href="../assets/brand/motj-logo.png">
<script>try{var q=new URLSearchParams(location.search).get('lang'),s=q||localStorage.getItem('tims-lang');if(s==='bn'||s==='en'){document.documentElement.dataset.lang=s;document.documentElement.lang=s;}var z=localStorage.getItem('tims-size');if(z)document.documentElement.dataset.size=z;}catch(e){}</script>
<link rel="stylesheet" href="../assets/ghi/base.css"><link rel="stylesheet" href="../assets/ghi/h.css"><link rel="stylesheet" href="../assets/final/final.css">
<script src="../assets/ghi/ghi.js" defer></script><script src="../assets/final/final.js" defer></script>
</head>
<body class="${kind === 'public' ? 'f-public' : kind === 'bare' ? 'f-bare' : 'h-app-page f-app'}">
<a class="skip" href="#main">${t('Skip to main content', 'মূল বিষয়বস্তুতে যান')}</a>
${inner}
${dialogs()}
${protoBar(file)}
</body></html>
`;
}

/** Public inner-page hero band. */
export const pageHero = (img, alt, crumbs, title, sub) => `<section class="h-page-hero f-page-hero">${photo(img, alt, 'h-page-img', 'loading="eager"')}
  <div class="container h-page-in"><nav class="h-crumb" ${ta('aria-label', 'Breadcrumb', 'অবস্থান')}><a href="index.html">${t('Home', 'হোম')}</a>${crumbs.map((c) => `<span aria-hidden="true">/</span>${c[1] ? `<a href="${c[1]}">${tt(c[0])}</a>` : `<span aria-current="page">${tt(c[0])}</span>`}`).join('')}</nav>
  <h1 class="h-display h-display-sm">${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

/** Section heading for public pages. */
export const secHead = (eyebrow, title, extra = '', id = '') => `<div class="h-sec-head"><div><p class="h-eyebrow">${tt(eyebrow)}</p><h2 ${id ? `id="${id}"` : ''} class="h-h2">${title}</h2></div>${extra}</div>`;

/** Stepper (multi-step form). steps: [{l, content}] — last step is review. */
export function stepper({ id, steps, form = '', submitLabel }) {
  return `<form class="f-stepper" data-stepper id="${id}" ${form} novalidate>
  <ol class="f-stp-ind">${each(steps, (s, i) => `<li class="${i === 0 ? 'is-now' : ''}"><span>${n(i + 1)}</span>${tt(s.l)}</li>`)}</ol>
  ${each(steps, (s, i) => `<fieldset class="f-stp" data-step="${i}" ${i ? 'hidden' : ''}><legend class="sr-only">${tt(s.l)}</legend>${s.content}
    <div class="f-stp-nav">${i ? `<button type="button" class="btn btn-outline" data-step-prev>${icon('arrow-left', 'ico ico-sm')}${t('Back', 'পেছনে')}</button>` : '<span></span>'}
    <span class="f-stp-right"><button type="button" class="btn btn-ghost" ${act({ set: '_=1', toast: ['Draft saved on this device.', 'খসড়া এই ডিভাইসে সংরক্ষিত হয়েছে।'] })}>${icon('download', 'ico ico-sm')}${t('Save draft', 'খসড়া সংরক্ষণ')}</button>
    ${i < steps.length - 1 ? `<button type="button" class="btn btn-primary" data-step-next>${t('Continue', 'এগিয়ে যান')}${icon('arrow-right', 'ico ico-sm')}</button>` : `<button type="submit" class="btn btn-teal">${submitLabel}</button>`}</span></div></fieldset>`)}
</form>`;
}
