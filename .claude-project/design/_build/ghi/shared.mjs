// Page shell, prototype navigation bar and dialogs shared by G, H and I.
import { t, ta, esc, icon } from './lib.mjs';
import { PORTALS } from './data.mjs';

export const VARIANTS = {
  g: { key: 'G', name: 'Public Service First', bn: 'জনসেবা অগ্রাধিকার', css: 'g.css' },
  h: { key: 'H', name: 'Institutional & Premium', bn: 'প্রাতিষ্ঠানিক ও প্রিমিয়াম', css: 'h.css' },
  i: { key: 'I', name: 'Functional Government Workspace', bn: 'কার্যকর সরকারি ওয়ার্কস্পেস', css: 'i.css' },
};

export const SCREENS = [
  { id: '01-landing', short: 'Landing', l: ['Public landing page', 'পাবলিক হোম পেজ'] },
  { id: '02-notices', short: 'Notices', l: ['Notice board (public inner page)', 'নোটিশ বোর্ড (পাবলিক ভেতরের পাতা)'] },
  { id: '03-login', short: 'Login', l: ['Login and portal entry', 'লগইন ও পোর্টাল প্রবেশ'] },
  { id: '04-ministry-dashboard', short: 'Ministry', l: ['Ministry dashboard', 'মন্ত্রণালয় ড্যাশবোর্ড'] },
  { id: '05-principal-dashboard', short: 'Principal', l: ['Principal dashboard', 'অধ্যক্ষ ড্যাশবোর্ড'] },
  { id: '06-teacher-dashboard', short: 'Teacher', l: ['Teacher dashboard', 'শিক্ষক ড্যাশবোর্ড'] },
  { id: '07-student-dashboard', short: 'Student', l: ['Student dashboard', 'শিক্ষার্থী ড্যাশবোর্ড'] },
];

export const file = (v, screen) => `${VARIANTS[v].key}-${screen}.html`;

/** Link to a built screen of the same variation. */
export const href = (v, screen) => `href="${file(v, screen)}"`;

/** Attributes for a control whose destination belongs to the Phase 2 full prototype. */
export const p2 = (en, bn) => `data-p2="${esc(en)}|${esc(bn)}"`;
export const toast = (en, bn) => `data-toast="${esc(en)}|${esc(bn)}"`;

function varNav(v, screen) {
  const cur = VARIANTS[v];
  const idx = SCREENS.findIndex((s) => s.id === screen);
  return `
<nav class="var-nav-bar" aria-label="Prototype navigation" data-vnb>
  <button type="button" class="vnb-toggle" aria-expanded="true" data-vnb-toggle title="Show or hide the prototype bar">
    <span class="vnb-badge vnb-${v}">${cur.key}</span><span class="vnb-hide-sm">Prototype · ${esc(cur.name)}</span>
  </button>
  <div class="vnb-body">
    <span class="vnb-label">Screen ${idx + 1}/7</span>
    ${SCREENS.map((s, i) => `<a href="${file(v, s.id)}" ${s.id === screen ? 'aria-current="page"' : ''} title="${esc(s.l[0])}">${String(i + 1).padStart(2, '0')}<span class="vnb-hide-sm"> ${s.short}</span></a>`).join('')}
    <span class="vnb-sep" aria-hidden="true"></span>
    <span class="vnb-label">Compare</span>
    ${Object.entries(VARIANTS).map(([k, x]) => `<a href="${file(k, screen)}" class="vnb-var vnb-${k}" ${k === v ? 'aria-current="true"' : ''} title="${esc(x.name)}">${x.key}</a>`).join('')}
    <a href="showcase-GHI.html" class="vnb-show" title="Back to the comparison showcase">Showcase</a>
  </div>
</nav>`;
}

function dialogs() {
  return `
<dialog id="dlg-p2" class="dlg" aria-labelledby="dlg-p2-title">
  <div class="dlg-head"><h2 id="dlg-p2-title">${t('Part of the full prototype', 'পূর্ণ প্রোটোটাইপের অংশ')}</h2>
    <button type="button" class="dlg-x" data-close ${ta('aria-label', 'Close', 'বন্ধ করুন')}>${icon('x')}</button></div>
  <div class="dlg-body">
    <p class="dlg-p2-name" data-p2-name></p>
    <p>${t('This screen is designed in Phase 2, after a design direction is chosen. Phase 1 shows seven key screens per direction so the directions can be compared.', 'একটি ডিজাইন দিক নির্বাচনের পর দ্বিতীয় পর্যায়ে এই স্ক্রিনটি তৈরি হবে। প্রথম পর্যায়ে তুলনার জন্য প্রতিটি দিকের সাতটি মূল স্ক্রিন দেখানো হয়েছে।')}</p>
  </div>
  <div class="dlg-foot"><button type="button" class="btn btn-primary" data-close>${t('OK', 'ঠিক আছে')}</button></div>
</dialog>

<dialog id="dlg-portal" class="dlg dlg-portal" aria-labelledby="dlg-portal-title">
  <div class="portal-urlbar" aria-hidden="true">${icon('lock', 'ico ico-sm')}<span>https://</span><b data-portal-dom></b></div>
  <div class="dlg-head"><h2 id="dlg-portal-title" data-portal-name></h2>
    <button type="button" class="dlg-x" data-close ${ta('aria-label', 'Close', 'বন্ধ করুন')}>${icon('x')}</button></div>
  <form class="dlg-body" data-portal-form novalidate>
    <p class="muted">${t('Dedicated portal for government and institution officials. It is not reachable from the public sign-in.', 'সরকারি ও প্রতিষ্ঠানের কর্মকর্তাদের জন্য আলাদা পোর্টাল। পাবলিক লগইন থেকে এটি পাওয়া যায় না।')}</p>
    <label class="fld"><span>${t('Official ID or email', 'অফিসিয়াল আইডি বা ইমেইল')}</span><input name="u" required autocomplete="username" value="demo.officer"></label>
    <label class="fld"><span>${t('Password', 'পাসওয়ার্ড')}</span><input name="p" type="password" required autocomplete="current-password" value="demo-pass"></label>
    <p class="fld-note">${icon('shield-check', 'ico ico-sm')} ${t('Two-step verification by SMS code is required in production.', 'প্রোডাকশনে এসএমএস কোড দিয়ে দুই ধাপের যাচাই বাধ্যতামূলক।')}</p>
    <div class="dlg-foot"><button type="button" class="btn btn-ghost" data-close>${t('Cancel', 'বাতিল')}</button>
      <button type="submit" class="btn btn-primary">${t('Sign in to portal', 'পোর্টালে লগইন')}</button></div>
    <p class="proto-note">${t('Prototype: demo credentials are filled in.', 'প্রোটোটাইপ: ডেমো তথ্য দেওয়া আছে।')}</p>
  </form>
</dialog>

<dialog id="dlg-confirm" class="dlg" aria-labelledby="dlg-confirm-title">
  <div class="dlg-head"><h2 id="dlg-confirm-title" data-confirm-title></h2>
    <button type="button" class="dlg-x" data-close ${ta('aria-label', 'Close', 'বন্ধ করুন')}>${icon('x')}</button></div>
  <div class="dlg-body">
    <p data-confirm-text></p>
    <label class="fld" data-confirm-note hidden><span>${t('Reason (sent to the applicant)', 'কারণ (আবেদনকারীকে পাঠানো হবে)')}</span>
      <textarea rows="3" ${ta('placeholder', 'Example: attach the signed guardian letter', 'উদাহরণ: অভিভাবকের স্বাক্ষরিত চিঠি সংযুক্ত করুন')}></textarea></label>
  </div>
  <div class="dlg-foot"><button type="button" class="btn btn-ghost" data-close>${t('Cancel', 'বাতিল')}</button>
    <button type="button" class="btn btn-primary" data-confirm-ok>${t('Confirm', 'নিশ্চিত করুন')}</button></div>
</dialog>

<dialog id="dlg-lightbox" class="dlg dlg-lightbox" aria-label="Photo">
  <button type="button" class="dlg-x" data-close ${ta('aria-label', 'Close', 'বন্ধ করুন')}>${icon('x')}</button>
  <img alt="" data-lb-img><p data-lb-cap></p>
</dialog>

<div id="toast" class="toast" popover="manual" role="status" aria-live="polite"></div>
<script type="application/json" id="portal-data">${JSON.stringify(PORTALS.map((p) => ({ k: p.k, dom: p.dom, l: p.l, to: p.to || null })))}</script>`;
}

/** Full HTML document. */
export function page({ v, screen, title, body, bodyClass = '' }) {
  return `<!doctype html>
<html lang="en" data-lang="en" data-v="${v}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title data-en="${esc(title[0])} · TIMS" data-bn="${esc(title[1])} · টিআইএমএস">${esc(title[0])} · TIMS</title>
<meta name="description" content="Variation ${VARIANTS[v].key} (${esc(VARIANTS[v].name)}) — Textile Institution Management System, Phase 1 design direction prototype.">
<script>try{var q=new URLSearchParams(location.search).get('lang'),s=q||localStorage.getItem('tims-lang');if(s==='bn'||s==='en'){document.documentElement.dataset.lang=s;document.documentElement.lang=s;}var z=localStorage.getItem('tims-size');if(z)document.documentElement.dataset.size=z;}catch(e){}</script>
<link rel="stylesheet" href="../assets/ghi/base.css">
<link rel="stylesheet" href="../assets/ghi/${VARIANTS[v].css}">
<script src="../assets/ghi/ghi.js" defer></script>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">${t('Skip to main content', 'মূল বিষয়বস্তুতে যান')}</a>
${body}
${dialogs()}
${varNav(v, screen)}
</body>
</html>
`;
}

/** Language switch: two buttons, current one pressed. */
export const langSwitch = (cls = 'lang') => `<div class="${cls}" role="group" aria-label="Language / ভাষা">
  <button type="button" data-set-lang="bn" lang="bn">বাংলা</button><button type="button" data-set-lang="en" lang="en">English</button></div>`;

/** Demo-data tag shown next to figures. */
export const demoTag = () => `<span class="demo-tag" title="Demo / Illustrative Data">${icon('info', 'ico ico-xs')}${t('Demo data', 'ডেমো তথ্য')}</span>`;

/** Product mark: an original woven-grid logo (not a government emblem). */
export const mark = (cls = 'mark') => `<svg class="${cls}" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
  <rect x="2" y="2" width="44" height="44" rx="12" fill="var(--mark-bg, #356A82)"/>
  <path d="M12 17h24M12 24h24M12 31h24" stroke="var(--mark-fg1, #DCECEF)" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M17 12v24M24 12v24M31 12v24" stroke="var(--mark-fg2, #3A817E)" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="4 3.2"/>
</svg>`;

/** Placeholder for the Government of Bangladesh emblem (the real emblem is supplied by the client). */
export const govSeal = (cls = 'seal') => `<span class="${cls}" title="Government emblem placeholder — official artwork supplied by the Ministry" aria-hidden="true">
  <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/><path d="M20 10c4 4 4 16 0 20c-4-4-4-16 0-20z" fill="currentColor" opacity=".55"/></svg></span>`;
