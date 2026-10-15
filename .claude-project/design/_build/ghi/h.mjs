// Variation H — Institutional & Premium.
// Public site: Invest Bangladesh-style cinematic slideshow hero, editorial serif headlines, map-led public insights.
// Internal: dark ocean sidebar, "briefing" pages led by figures, maps and charts; inline work (e.g. attendance register).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { t, tt, n, d, ta, icon, img, each, esc, opt, bnDigits } from './lib.mjs';
import { page, href, p2, toast, langSwitch, demoTag, mark, govSeal, file } from './shared.mjs';
import {
  ORG, PUBLIC_NAV, STATS, ADMISSION, NOTICES, NOTICE_CATS, catLabel, AUTH, SERVICES, GALLERY, FAQ, HELP, PORTALS,
  DIVISIONS, MIN, PRIN, TEACH, STU, STATUS, TODAY, UPDATED, CATEGORIES,
} from './data.mjs';

const V = 'h';
const here = path.dirname(fileURLToPath(import.meta.url));
const MAP = JSON.parse(fs.readFileSync(path.join(here, '..', 'data', 'bd_map.json'), 'utf8'));

// ---------- map ----------
function centroid(dPath) {
  const nums = dPath.match(/-?\d+(\.\d+)?/g).map(Number);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i < nums.length; i += 2) { x0 = Math.min(x0, nums[i]); x1 = Math.max(x1, nums[i]); y0 = Math.min(y0, nums[i + 1]); y1 = Math.max(y1, nums[i + 1]); }
  return [(x0 + x1) / 2, (y0 + y1) / 2];
}
const LABEL_NUDGE = { chattogram: [-20, -60], khulna: [0, -30], barishal: [5, 0], dhaka: [-8, 10], sylhet: [0, 0], mymensingh: [0, 8], rajshahi: [10, 0], rangpur: [0, 10] };
/** Division choropleth. metric: 'inst' or 'att'. Each division is a keyboard-operable button. */
function divisionMap(metric, selected) {
  const fill = (v) => {
    if (metric === 'inst') { const k = v.inst / 13; return `color-mix(in srgb, var(--teal) ${Math.round(25 + k * 75)}%, var(--mist))`; }
    return v.att < 80 ? '#C7685E' : v.att < 85 ? '#7FB3B0' : 'var(--teal-700)';
  };
  return `<svg class="h-map" viewBox="${MAP.viewBox}" role="group" ${ta('aria-label', 'Map of Bangladesh by division', 'বিভাগভিত্তিক বাংলাদেশের মানচিত্র')}>
    ${each(MAP.divisions, (m) => {
      const v = DIVISIONS.find((x) => x.id === m.id);
      const [cx, cy] = centroid(m.d); const [nx, ny] = LABEL_NUDGE[m.id] || [0, 0];
      const val = metric === 'inst' ? String(v.inst) : `${v.att.toFixed(1)}%`;
      return `<g class="h-map-div" data-map-div="${m.id}" tabindex="0" role="button" aria-pressed="${m.id === selected}" aria-label="${esc(v.n[0])}: ${esc(val)}">
        <path d="${m.d}" style="fill:${fill(v)}"/>
        <text x="${cx + nx}" y="${cy + ny}" class="h-map-name"><tspan class="l-en">${esc(v.n[0])}</tspan><tspan class="l-bn">${esc(v.n[1])}</tspan></text>
        <text x="${cx + nx}" y="${cy + ny + 24}" class="h-map-val"><tspan class="l-en">${esc(val)}</tspan><tspan class="l-bn">${esc(bnDigits(val))}</tspan></text>
      </g>`;
    })}
  </svg>`;
}
const divJson = () => `<script type="application/json" id="div-data">${JSON.stringify(Object.fromEntries(DIVISIONS.map((v) => [v.id, {
  name: v.n, inst: v.inst, students: v.students, att: v.att, attTxt: `${v.att.toFixed(1)}%`, rep: v.rep, alerts: v.alerts,
  status: v.att < 80 ? ['Below the 80% threshold', '৮০% সীমার নিচে'] : ['Within target', 'লক্ষ্যমাত্রার মধ্যে'],
}])))}</script>`;

// ---------- public chrome ----------
function navLinks(active, onLanding) {
  return PUBLIC_NAV.map((it) => {
    const cur = it.key === active ? 'aria-current="page"' : '';
    if (it.href) return `<li><a href="${file(V, it.href)}" ${cur}>${tt(it.label)}</a></li>`;
    if (it.anchor) return `<li><a href="${onLanding ? '' : file(V, '01-landing')}#${it.anchor}" ${cur}>${tt(it.label)}</a></li>`;
    return `<li><button type="button" ${p2(it.label[0], it.label[1])}>${tt(it.label)}</button></li>`;
  }).join('');
}
function publicHeader(active, { overlay = false, onLanding = false } = {}) {
  return `
<div class="h-gov"><div class="container h-gov-in">
  <p>${govSeal('seal')}${tt(ORG.gov)}</p>
  <div class="h-gov-tools"><a href="tel:16000">${icon('headset', 'ico ico-sm')}${n(ORG.helpline)}</a>${langSwitch('lang h-lang')}</div>
</div></div>
<header class="h-head ${overlay ? 'is-overlay' : ''}">
  <div class="container h-head-in">
    <a class="h-brand" ${href(V, '01-landing')}>${mark()}<span><small>${tt(ORG.ministry)}</small><b>${tt(ORG.product)}</b></span></a>
    <nav class="h-nav" id="h-nav" ${ta('aria-label', 'Main', 'প্রধান মেনু')}><ul>${navLinks(active, onLanding)}</ul></nav>
    <div class="h-head-act">
      <button type="button" class="h-icon" ${p2('Site search', 'সাইট অনুসন্ধান')} ${ta('aria-label', 'Search', 'অনুসন্ধান')}>${icon('search')}</button>
      <a class="h-login" ${href(V, '03-login')}>${t('Login', 'লগইন')}${icon('arrow-right', 'ico ico-sm')}</a>
      <button type="button" class="h-icon h-menu" data-menu="h-nav" aria-expanded="false" ${ta('aria-label', 'Menu', 'মেনু')}>${icon('menu')}</button>
    </div>
  </div>
</header>`;
}
function publicFooter() {
  const col = (h, items) => `<div><h3>${tt(h)}</h3><ul>${items.map(([l, a]) => `<li>${a ? `<a ${a}>${tt(l)}</a>` : `<button type="button" ${p2(l[0], l[1])}>${tt(l)}</button>`}</li>`).join('')}</ul></div>`;
  return `
<footer class="h-foot">
  <div class="container">
    <div class="h-foot-top">
      <a class="h-brand h-brand-inv" ${href(V, '01-landing')}>${mark()}<span><small>${tt(ORG.ministry)}</small><b>${tt(ORG.product)}</b></span></a>
      <p class="h-foot-line">${t('One platform for public information, institutional operations and national oversight of textile education.', 'টেক্সটাইল শিক্ষার পাবলিক তথ্য, প্রাতিষ্ঠানিক কার্যক্রম ও জাতীয় তত্ত্বাবধানের একটি প্ল্যাটফর্ম।')}</p>
    </div>
    <div class="h-foot-grid">
      ${col(['The system', 'সিস্টেম'], [[['About us', 'আমাদের সম্পর্কে']], [['Institutions', 'প্রতিষ্ঠানসমূহ']], [['Public insights', 'পাবলিক তথ্য'], `href="${file(V, '01-landing')}#insights"`]])}
      ${col(['Admissions', 'ভর্তি'], [[['Admission 2026–27', 'ভর্তি ২০২৬–২৭'], `href="${file(V, '01-landing')}#admissions"`], [['Candidate login', 'প্রার্থী লগইন'], href(V, '03-login')], [['Admission notices', 'ভর্তি নোটিশ'], href(V, '02-notices')]])}
      ${col(['Services', 'সেবা'], [[['Verify a certificate', 'সনদ যাচাই']], [['Student login', 'শিক্ষার্থী লগইন'], href(V, '03-login')], [['Teacher login', 'শিক্ষক লগইন'], href(V, '03-login')]])}
      ${col(['Related organisations', 'সংশ্লিষ্ট প্রতিষ্ঠান'], [[['Ministry of Textiles and Jute', 'বস্ত্র ও পাট মন্ত্রণালয়']], [['Department of Textiles', 'বস্ত্র অধিদপ্তর']], [['Bangladesh Technical Education Board', 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড']]])}
      <div><h3>${t('Contact', 'যোগাযোগ')}</h3><p class="h-foot-big">${n(ORG.helpline)}</p><p>${ORG.email}</p><p>${t('Sun–Thu, 9:00–17:00', 'রবি–বৃহস্পতি, ৯:০০–১৭:০০')}</p></div>
    </div>
    <div class="h-foot-bar"><p>© 2026 ${tt(ORG.dept)} · ${tt(ORG.ministry)} · ${t('Last updated', 'সর্বশেষ হালনাগাদ')} ${d(UPDATED)}</p>
      <p>${t('Photos: Wikimedia Commons, illustrative —', 'ছবি: উইকিমিডিয়া কমন্স, উদাহরণস্বরূপ —')} <a href="../assets/ghi/img/CREDITS.json">${t('credits', 'কৃতজ্ঞতা')}</a></p></div>
  </div>
</footer>`;
}
const catLbl = (k) => `<span class="h-cat">${tt(catLabel(k))}</span>`;

// ---------- 01 Landing ----------
function landing() {
  const slides = [
    { img: 'jamdani-hands.jpg', alt: ['Hands weaving Jamdani on a loom', 'তাঁতে জামদানি বুনন'],
      kick: ['Textile Institution Management System', 'টেক্সটাইল প্রতিষ্ঠান ব্যবস্থাপনা সিস্টেম'],
      h: ['Building Bangladesh’s textile talent, institution by institution', 'প্রতিটি প্রতিষ্ঠানের মাধ্যমে বাংলাদেশের টেক্সটাইল দক্ষতা গড়ে তোলা'],
      s: ['59 government textile institutions, one connected platform for admissions, academics and oversight.', '৫৯টি সরকারি টেক্সটাইল প্রতিষ্ঠান, ভর্তি, শিক্ষা ও তত্ত্বাবধানের জন্য একটি সংযুক্ত প্ল্যাটফর্ম।'],
      cta: [[['Explore institutions', 'প্রতিষ্ঠান দেখুন'], p2('Institution directory', 'প্রতিষ্ঠান ডিরেক্টরি')], [['Admission information', 'ভর্তি তথ্য'], 'href="#admissions"']] },
    { img: 'weaving-lab.jpg', alt: ['Weaving machines in an institute laboratory', 'ইনস্টিটিউটের ল্যাবে বয়ন যন্ত্র'],
      kick: ['Admission 2026–27', 'ভর্তি ২০২৬–২৭'],
      h: ['Diploma entrance results will be published on 30 October', 'ডিপ্লোমা ভর্তি পরীক্ষার ফল ৩০ অক্টোবর প্রকাশিত হবে'],
      s: ['Vocational (SSC Vocational) 2027 applications are open until 15 November.', 'ভোকেশনাল (এসএসসি ভোকেশনাল) ২০২৭-এর আবেদন ১৫ নভেম্বর পর্যন্ত চলবে।'],
      cta: [[['How to apply', 'কীভাবে আবেদন করবেন'], 'href="#admissions"'], [['Admission notices', 'ভর্তি নোটিশ'], href(V, '02-notices')]] },
    { img: 'fabric-day.jpg', alt: ['Students’ fabric exhibition', 'শিক্ষার্থীদের ফেব্রিক প্রদর্শনী'],
      kick: ['Public insights', 'পাবলিক তথ্য'],
      h: ['Open figures on textile education, by division', 'বিভাগভিত্তিক টেক্সটাইল শিক্ষার উন্মুক্ত তথ্য'],
      s: ['Enrolment, institutions and attendance — aggregated, with no personal data.', 'ভর্তি, প্রতিষ্ঠান ও উপস্থিতি — সমষ্টিগত, কোনো ব্যক্তিগত তথ্য ছাড়া।'],
      cta: [[['View public insights', 'পাবলিক তথ্য দেখুন'], `href="${file(V, '01-landing')}#insights"`]] },
  ];
  const body = `
${publicHeader('home', { overlay: true, onLanding: true })}
<main id="main">
  <section class="h-hero" data-slides aria-roledescription="carousel" ${ta('aria-label', 'Highlights', 'প্রধান খবর')}>
    ${each(slides, (s, i) => `<div class="slide ${i === 0 ? 'is-active' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} / 3">
      ${img(s.img, s.alt, 'h-hero-img', i === 0 ? 'loading="eager" fetchpriority="high"' : '')}
      <div class="container h-hero-in">
        <p class="h-kick">${tt(s.kick)}</p>
        <h1 class="h-display">${tt(s.h)}</h1>
        <p class="h-hero-sub">${tt(s.s)}</p>
        <div class="h-hero-cta">${s.cta.map(([l, a], k) => (a.startsWith('href') ? `<a class="btn ${k === 0 ? 'btn-white' : 'btn-onimg'} btn-lg" ${a}>${tt(l)}</a>` : `<button type="button" class="btn ${k === 0 ? 'btn-white' : 'btn-onimg'} btn-lg" ${a}>${tt(l)}</button>`)).join('')}</div>
      </div></div>`)}
    <div class="h-hero-bar"><div class="container h-hero-bar-in">
      <ul class="h-hero-stats">${each(STATS.slice(0, 4), (s) => `<li><b>${n(s.v)}</b><span>${tt(s.l)}</span></li>`)}</ul>
      <div class="h-slide-ctl">
        <button type="button" data-slide-prev ${ta('aria-label', 'Previous slide', 'আগের স্লাইড')}>${icon('arrow-left', 'ico ico-sm')}</button>
        ${[0, 1, 2].map((k) => `<button type="button" class="h-dot" data-slide-dot="${k}" ${ta('aria-label', `Slide ${k + 1}`, `স্লাইড ${bnDigits(k + 1)}`)}></button>`).join('')}
        <button type="button" data-slide-next ${ta('aria-label', 'Next slide', 'পরের স্লাইড')}>${icon('arrow-right', 'ico ico-sm')}</button>
        <button type="button" data-slide-pause aria-pressed="false" ${ta('aria-label', 'Pause slideshow', 'স্লাইড থামান')}>${icon('circle-play', 'ico ico-sm')}</button>
      </div>
    </div></div>
  </section>

  <section class="container h-intro" aria-labelledby="h-intro-t">
    <p class="h-eyebrow">${t('Why this platform', 'কেন এই প্ল্যাটফর্ম')}</p>
    <h2 id="h-intro-t" class="h-statement">${t('One source of truth connecting every textile institution with the Ministry — and with the people they serve.', 'একটি একক তথ্যভান্ডার, যা প্রতিটি টেক্সটাইল প্রতিষ্ঠানকে মন্ত্রণালয় ও সেবাগ্রহীতাদের সঙ্গে যুক্ত করে।')}</h2>
    <ol class="h-pillars">
      <li><span class="h-num">${n('01')}</span>${icon('globe', 'ico ico-lg')}<h3>${t('Public information', 'পাবলিক তথ্য')}</h3><p>${t('Admissions, notices, results and certificate verification for every citizen.', 'প্রত্যেক নাগরিকের জন্য ভর্তি, নোটিশ, ফলাফল ও সনদ যাচাই।')}</p></li>
      <li><span class="h-num">${n('02')}</span>${icon('school', 'ico ico-lg')}<h3>${t('Institutional operations', 'প্রাতিষ্ঠানিক কার্যক্রম')}</h3><p>${t('Classes, attendance, results, finance, assets and requests — inside each institution.', 'প্রতিটি প্রতিষ্ঠানের ক্লাস, হাজিরা, ফলাফল, অর্থ, সম্পদ ও আবেদন।')}</p></li>
      <li><span class="h-num">${n('03')}</span>${icon('landmark', 'ico ico-lg')}<h3>${t('National oversight', 'জাতীয় তত্ত্বাবধান')}</h3><p>${t('Ministry, division and district views with approvals and consolidated reports.', 'অনুমোদন ও সমন্বিত প্রতিবেদনসহ মন্ত্রণালয়, বিভাগ ও জেলা পর্যায়ের দৃশ্য।')}</p></li>
    </ol>
  </section>

  <section class="h-about" aria-labelledby="h-about-t">
    <div class="h-about-media">${img('museum.jpg', ['Textile museum and learning resource centre', 'টেক্সটাইল জাদুঘর ও শিখন সম্পদ কেন্দ্র'])}</div>
    <div class="h-about-text">
      <p class="h-eyebrow">${t('About us', 'আমাদের সম্পর্কে')}</p>
      <h2 id="h-about-t" class="h-h2">${t('Under the Department of Textiles, for the Ministry of Textiles and Jute', 'বস্ত্র অধিদপ্তরের অধীনে, বস্ত্র ও পাট মন্ত্রণালয়ের জন্য')}</h2>
      <p>${t('The platform covers three types of government textile institutions across all eight divisions. Each institution manages its own work; the Ministry sees the whole picture.', 'প্ল্যাটফর্মটি আট বিভাগের তিন ধরনের সরকারি টেক্সটাইল প্রতিষ্ঠানকে অন্তর্ভুক্ত করে। প্রতিটি প্রতিষ্ঠান নিজের কাজ পরিচালনা করে; মন্ত্রণালয় পূর্ণ চিত্র দেখে।')}</p>
      <ul class="h-cats">${each(CATEGORIES, (c) => `<li><b>${n(c.v)}</b><span>${tt(c.l)}</span></li>`)}</ul>
      <button type="button" class="h-arrow-link" ${p2('About Us', 'আমাদের সম্পর্কে')}>${t('More about the system', 'সিস্টেম সম্পর্কে আরও')}${icon('arrow-right', 'ico')}</button>
    </div>
  </section>

  <section class="h-services" id="services" aria-labelledby="h-svc-t">
    <div class="container">
      <div class="h-sec-head"><div><p class="h-eyebrow">${t('Public services', 'পাবলিক সেবা')}</p><h2 id="h-svc-t" class="h-h2">${t('How can we help you?', 'আমরা কীভাবে সাহায্য করতে পারি?')}</h2></div>
        <p class="muted">${t('Apply, track and verify online — without visiting an office.', 'অফিসে না গিয়ে অনলাইনে আবেদন, ট্র্যাক ও যাচাই করুন।')}</p></div>
      <ul class="h-svc-grid">
        ${each(SERVICES.slice(0, 6), (s) => `<li>${s.to ? `<a class="h-svc" ${href(V, s.to)}>` : `<button type="button" class="h-svc" ${p2(s.l[0], s.l[1])}>`}
          ${icon(s.icon, 'ico ico-xl')}<h3>${tt(s.l)}</h3><p>${tt(s.s)}</p><span class="h-svc-go">${icon('arrow-up-right', 'ico')}</span>${s.to ? '</a>' : '</button>'}</li>`)}
      </ul>
    </div>
  </section>

  <section class="h-insights" id="insights" aria-labelledby="h-ins-t">
    <div class="container h-ins-grid">
      <div class="h-ins-text">
        <p class="h-eyebrow h-eyebrow-inv">${t('Public insights', 'পাবলিক তথ্য')}</p>
        <h2 id="h-ins-t" class="h-h2">${t('Where textile education happens', 'টেক্সটাইল শিক্ষা কোথায় হয়')}</h2>
        <p>${t('Select a division on the map to see its institutions, students and today’s attendance. Public figures are aggregated.', 'মানচিত্রে একটি বিভাগ বেছে নিয়ে তার প্রতিষ্ঠান, শিক্ষার্থী ও আজকের উপস্থিতি দেখুন। পাবলিক তথ্য সমষ্টিগত।')}</p>
        <div class="h-ins-panel" aria-live="polite">
          <p class="h-ins-name" data-div-field="name">${tt(DIVISIONS[1].n)}</p>
          <dl>
            <div><dt>${t('Institutions', 'প্রতিষ্ঠান')}</dt><dd data-div-field="inst">${n(DIVISIONS[1].inst)}</dd></div>
            <div><dt>${t('Students', 'শিক্ষার্থী')}</dt><dd data-div-field="students">${n(DIVISIONS[1].students)}</dd></div>
            <div><dt>${t('Attendance today', 'আজ উপস্থিতি')}</dt><dd data-div-field="attTxt">${n(DIVISIONS[1].att + '%')}</dd></div>
          </dl>
        </div>
        <button type="button" class="btn btn-white" ${p2('Public dashboard', 'পাবলিক ড্যাশবোর্ড')}>${t('Open the public dashboard', 'পাবলিক ড্যাশবোর্ড খুলুন')}${icon('arrow-right', 'ico ico-sm')}</button>
        <p class="h-ins-note">${demoTag()} ${t('Shading: number of institutions.', 'রঙের গাঢ়তা: প্রতিষ্ঠানের সংখ্যা।')} <span class="h-attr">${MAP.attribution}</span></p>
      </div>
      <div class="h-ins-map">${divisionMap('inst', 'chattogram')}</div>
    </div>
    ${divJson()}
  </section>

  <section class="h-adm" id="admissions" aria-labelledby="h-adm-t">
    ${img('sewing-class.jpg', ['Students in a vocational sewing class', 'ভোকেশনাল সেলাই ক্লাসে শিক্ষার্থীরা'], 'h-adm-img')}
    <div class="container h-adm-in">
      <div class="h-adm-card">
        <p class="h-eyebrow">${t('Admissions', 'ভর্তি')}</p>
        <h2 id="h-adm-t" class="h-h2">${t('Admission 2026–27', 'ভর্তি ২০২৬–২৭')}</h2>
        <p>${tt(ADMISSION.cycle)}</p>
        <ol class="h-dates">${each(ADMISSION.steps, (s) => `<li class="is-${s.st}"><span>${d(s.date)}</span><b>${tt(s.l)}</b>${s.st === 'done' ? icon('check', 'ico ico-sm') : s.st === 'next' ? `<em>${t('Next', 'পরবর্তী')}</em>` : ''}</li>`)}</ol>
        <p class="h-adm-note">${icon('id-card', 'ico')}${t('Your temporary application ID becomes your student ID once final admission is complete.', 'চূড়ান্ত ভর্তি সম্পন্ন হলে আপনার অস্থায়ী আবেদন আইডি শিক্ষার্থী আইডিতে রূপান্তরিত হয়।')}</p>
        <div class="h-adm-act"><button type="button" class="btn btn-primary" ${p2('Admission result', 'ভর্তির ফলাফল')}>${t('Check result', 'ফলাফল দেখুন')}</button>
          <button type="button" class="btn btn-teal" ${p2('Vocational 2027 application', 'ভোকেশনাল ২০২৭ আবেদন')}>${t('Apply: Vocational 2027', 'আবেদন: ভোকেশনাল ২০২৭')}</button>
          <a class="btn btn-outline" ${href(V, '03-login')}>${t('Candidate login', 'প্রার্থী লগইন')}</a></div>
      </div>
    </div>
  </section>

  <section class="container h-news" aria-labelledby="h-news-t" data-filter-scope>
    <div class="h-sec-head"><div><p class="h-eyebrow">${t('Notice', 'নোটিশ')}</p><h2 id="h-news-t" class="h-h2">${t('Notices and announcements', 'নোটিশ ও ঘোষণা')}</h2></div>
      <a class="h-arrow-link" ${href(V, '02-notices')}>${t('All notices', 'সকল নোটিশ')}${icon('arrow-right', 'ico')}</a></div>
    <div class="h-tabs" role="group" ${ta('aria-label', 'Filter by category', 'বিভাগ অনুযায়ী')}>
      <button type="button" data-filter="all" aria-pressed="true">${t('All', 'সব')}</button>
      ${each(NOTICE_CATS.slice(0, 5), (c) => `<button type="button" data-filter="${c.k}" aria-pressed="false">${tt(c.l)}</button>`)}
    </div>
    <div class="h-news-grid">
      ${(() => { const x = NOTICES[0]; return `<a class="h-feature" ${href(V, '02-notices')}>
        <span class="h-feature-date"><b>${n('14')}</b><span>${d('Oct 2026')}</span></span>
        <span class="h-feature-body"><span class="h-feature-tags">${catLbl(x.cat)}<span class="tag tag-danger">${t('Urgent', 'জরুরি')}</span></span>
        <b class="h-feature-t">${tt(x.t)}</b><span>${tt(x.s)}</span><span class="h-feature-by">${tt(AUTH[x.by])} · PDF ${n(x.size)}</span></span></a>`; })()}
      <ul class="h-news-list">
        ${each(NOTICES.slice(1, 9), (x) => `<li data-cat="${x.cat}" data-year="2026"><a ${href(V, '02-notices')}><time>${d(x.date)}</time>${catLbl(x.cat)}<b>${tt(x.t)}</b></a></li>`)}
      </ul>
    </div>
    <p class="h-empty" data-filter-empty hidden>${t('No other notices in this category this month.', 'এই মাসে এই বিভাগে আর কোনো নোটিশ নেই।')}</p>
  </section>

  <section class="h-gallery" aria-labelledby="h-gal-t">
    <div class="container h-sec-head"><div><p class="h-eyebrow">${t('Gallery', 'গ্যালারি')}</p><h2 id="h-gal-t" class="h-h2">${t('Life in our institutions', 'আমাদের প্রতিষ্ঠানের জীবন')}</h2></div>
      <div class="h-gal-ctl"><button type="button" data-scroll="h-gal|-1" ${ta('aria-label', 'Scroll left', 'বামে সরান')}>${icon('arrow-left', 'ico')}</button><button type="button" data-scroll="h-gal|1" ${ta('aria-label', 'Scroll right', 'ডানে সরান')}>${icon('arrow-right', 'ico')}</button></div></div>
    <ul class="h-gal" id="h-gal" tabindex="0" ${ta('aria-label', 'Photo gallery', 'ফটো গ্যালারি')}>
      ${each(GALLERY, (g) => `<li><button type="button" data-lightbox>${img(g.f, g.c)}</button><p>${tt(g.c)}</p></li>`)}
    </ul>
  </section>

  <section class="container h-help" id="help" aria-labelledby="h-help-t">
    <div>
      <p class="h-eyebrow">${t('Help', 'সহায়তা')}</p>
      <h2 id="h-help-t" class="h-h2">${t('Support in Bangla, every working day', 'প্রতি কর্মদিবসে বাংলায় সহায়তা')}</h2>
      <p class="h-help-call">${icon('headset', 'ico ico-xl')}<span><small>${t('Call the help desk', 'হেল্প ডেস্কে কল করুন')}</small><b>${n(ORG.helpline)}</b></span></p>
    </div>
    <ul class="h-help-list">${each(HELP, (h) => `<li><button type="button" ${p2(h.l[0], h.l[1])}>${icon(h.icon, 'ico ico-lg')}<span><b>${tt(h.l)}</b><small>${tt(h.s)}</small></span>${icon('arrow-right', 'ico')}</button></li>`)}</ul>
    <div class="h-faq">${each(FAQ.slice(0, 3), (f) => `<details><summary>${tt(f.q)}<span class="h-plus" aria-hidden="true"></span></summary><p>${tt(f.a)}</p></details>`)}</div>
  </section>
</main>
${publicFooter()}`;
  return page({ v: V, screen: '01-landing', title: ['Home', 'হোম'], body, bodyClass: 'h-public' });
}

// ---------- 02 Notices ----------
function notices() {
  const pinned = NOTICES[0];
  const body = `
${publicHeader('notice')}
<main id="main" data-filter-scope>
  <section class="h-page-hero">
    ${img('fabric-rolls.jpg', ['Rolls of coloured fabric', 'রঙিন কাপড়ের রোল'], 'h-page-img', 'loading="eager"')}
    <div class="container h-page-in">
      <nav class="h-crumb" ${ta('aria-label', 'Breadcrumb', 'অবস্থান')}><a ${href(V, '01-landing')}>${t('Home', 'হোম')}</a><span aria-hidden="true">/</span><span aria-current="page">${t('Notice', 'নোটিশ')}</span></nav>
      <h1 class="h-display h-display-sm">${t('Notices and circulars', 'নোটিশ ও পরিপত্র')}</h1>
      <p>${t('Official announcements of the Ministry of Textiles and Jute and the Department of Textiles.', 'বস্ত্র ও পাট মন্ত্রণালয় এবং বস্ত্র অধিদপ্তরের অফিসিয়াল ঘোষণা।')}</p>
    </div>
  </section>
  <div class="h-tabbar"><div class="container h-tabbar-in">
    <div class="h-tabs h-tabs-lg" role="group" ${ta('aria-label', 'Filter by category', 'বিভাগ অনুযায়ী')}>
      <button type="button" data-filter="all" aria-pressed="true">${t('All', 'সব')}</button>
      <button type="button" data-filter="urgent" aria-pressed="false">${t('Urgent', 'জরুরি')}</button>
      ${each(NOTICE_CATS, (c) => `<button type="button" data-filter="${c.k}" aria-pressed="false">${tt(c.l)}</button>`)}
    </div>
    <form class="h-search" role="search" data-filter-form><label class="sr-only" for="hq">${t('Search notices', 'নোটিশ খুঁজুন')}</label>${icon('search', 'ico ico-sm')}<input id="hq" type="search" data-filter-q ${ta('placeholder', 'Search notices', 'নোটিশ খুঁজুন')}></form>
  </div></div>

  <div class="container h-not-grid">
    <section aria-labelledby="h-list-t">
      <article class="h-pin">
        <div class="h-pin-date"><b>${n('14')}</b><span>${d('Oct')}</span><small>${n('2026')}</small></div>
        <div class="h-pin-body">
          <p class="h-pin-tags">${icon('pin', 'ico ico-sm')}${t('Pinned', 'পিন করা')} · ${catLbl(pinned.cat)} · <span class="h-urgent">${t('Urgent', 'জরুরি')}</span></p>
          <h2>${tt(pinned.t)}</h2><p>${tt(pinned.s)}</p>
          <div class="h-pin-act"><button type="button" class="btn btn-primary" data-open="dlg-notice">${t('Read notice', 'নোটিশ পড়ুন')}</button>
            <button type="button" class="btn btn-outline" ${toast('Download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে ডাউনলোড শুরু হবে।')}>${icon('download', 'ico ico-sm')}PDF · ${n(pinned.size)}</button></div>
        </div>
      </article>
      <div class="h-list-head"><h2 id="h-list-t" class="h-h3">${t('All notices', 'সকল নোটিশ')}</h2><span class="muted"><span data-filter-count>${n(NOTICES.length)}</span> ${t('results', 'টি ফলাফল')}</span>
        <label class="h-year"><span>${t('Year', 'বছর')}</span><select data-filter-year>${opt('all', 'All', 'সব')}${opt('2026', '2026')}${opt('2025', '2025')}</select></label></div>
      <ul class="h-rows">
        ${each(NOTICES, (x) => `<li data-cat="${x.cat}" data-year="2026" ${x.urgent ? 'data-urgent="1"' : ''}>
          <time class="h-row-date"><b>${n(x.date.slice(0, 2))}</b><span>${d(x.date.slice(3))}</span></time>
          <div class="h-row-body"><p class="h-row-meta">${catLbl(x.cat)}${x.urgent ? ` · <span class="h-urgent">${t('Urgent', 'জরুরি')}</span>` : ''} · ${tt(AUTH[x.by])}</p>
            <h3><button type="button" data-open="dlg-notice">${tt(x.t)}</button></h3><p>${tt(x.s)}</p></div>
          <button type="button" class="h-row-dl" ${toast('Download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে ডাউনলোড শুরু হবে।')} ${ta('aria-label', 'Download PDF', 'পিডিএফ ডাউনলোড')}>${icon('file-down', 'ico')}<small>${n(x.size)}</small></button>
        </li>`)}
      </ul>
      <div class="h-empty" data-filter-empty hidden>${icon('search-x', 'ico ico-xl')}<p><b>${t('No notices match', 'কোনো নোটিশ মেলেনি')}</b><br>${t('Change the category or year, or clear the search.', 'বিভাগ বা বছর পরিবর্তন করুন অথবা অনুসন্ধান মুছুন।')}</p></div>
      <nav class="h-pager" ${ta('aria-label', 'Pages', 'পাতা')}><span aria-current="page">1</span><button type="button" ${p2('Notice archive, page 2', 'নোটিশ আর্কাইভ, পাতা ২')}>2</button><button type="button" ${p2('Notice archive, page 3', 'নোটিশ আর্কাইভ, পাতা ৩')}>3</button><button type="button" ${p2('Notice archive', 'নোটিশ আর্কাইভ')}>${t('Next', 'পরের')}${icon('arrow-right', 'ico ico-sm')}</button></nav>
    </section>
    <aside class="h-aside">
      <section><h2 class="h-h4">${t('Key dates', 'গুরুত্বপূর্ণ তারিখ')}</h2>
        <ul class="h-keydates">
          <li><time>${d('19–22 Oct')}</time><span>${t('Durga Puja holidays', 'দুর্গাপূজার ছুটি')}</span></li>
          <li><time>${d('30 Oct')}</time><span>${t('Diploma admission result', 'ডিপ্লোমা ভর্তির ফল')}</span></li>
          <li><time>${d('05 Nov')}</time><span>${t('Tender submission closes', 'দরপত্র দাখিলের শেষ দিন')}</span></li>
          <li><time>${d('15 Nov')}</time><span>${t('Vocational 2027 applications close', 'ভোকেশনাল ২০২৭ আবেদনের শেষ দিন')}</span></li>
        </ul></section>
      <section><h2 class="h-h4">${t('Archive', 'আর্কাইভ')}</h2>
        <ul class="h-archive">${each([['October 2026', 'অক্টোবর ২০২৬', 8], ['September 2026', 'সেপ্টেম্বর ২০২৬', 4], ['August 2026', 'আগস্ট ২০২৬', 11], ['July 2026', 'জুলাই ২০২৬', 9]], ([e, b, c]) => `<li><button type="button" ${p2(`Notices — ${e}`, `নোটিশ — ${b}`)}>${t(e, b)}<span>${n(c)}</span></button></li>`)}</ul></section>
      <section class="h-aside-card">${icon('mail-check', 'ico ico-lg')}<h2 class="h-h4">${t('Notice alerts', 'নোটিশ অ্যালার্ট')}</h2><p>${t('Receive admission and examination notices by SMS or email.', 'ভর্তি ও পরীক্ষার নোটিশ এসএমএস বা ইমেইলে পান।')}</p>
        <button type="button" class="btn btn-outline btn-sm" ${p2('Notice subscription', 'নোটিশ সাবস্ক্রিপশন')}>${t('Subscribe', 'সাবস্ক্রাইব')}</button></section>
    </aside>
  </div>
</main>
<dialog id="dlg-notice" class="dlg dlg-wide" aria-labelledby="dlg-n-t">
  <div class="dlg-head"><div><p class="h-row-meta">${catLbl(pinned.cat)} · ${d(pinned.date)} · ${pinned.id}</p><h2 id="dlg-n-t">${tt(pinned.t)}</h2></div><button type="button" class="dlg-x" data-close ${ta('aria-label', 'Close', 'বন্ধ করুন')}>${icon('x')}</button></div>
  <div class="dlg-body"><p>${tt(pinned.s)}</p><p class="muted">${tt(AUTH[pinned.by])}</p>
    <p class="proto-note">${t('Prototype: every notice opens this sample. The notice detail page is part of Phase 2.', 'প্রোটোটাইপ: প্রতিটি নোটিশে এই নমুনা খুলবে। নোটিশ বিস্তারিত পাতা দ্বিতীয় পর্যায়ে।')}</p></div>
</dialog>
${publicFooter()}`;
  return page({ v: V, screen: '02-notices', title: ['Notices', 'নোটিশ'], body, bodyClass: 'h-public' });
}

// ---------- 03 Login ----------
function login() {
  const err = `<span class="err" hidden>${t('This field is required', 'এই তথ্যটি দিতে হবে')}</span>`;
  const body = `
<main id="main" class="h-signin">
  <section class="h-login-art">
    ${img('loom-workshop.jpg', ['A loom workshop', 'একটি লুম ওয়ার্কশপ'], 'h-login-img', 'loading="eager"')}
    <div class="h-login-art-in">
      <a class="h-brand h-brand-inv" ${href(V, '01-landing')}>${mark()}<span><small>${tt(ORG.ministry)}</small><b>${tt(ORG.product)}</b></span></a>
      <blockquote class="h-display h-display-sm">${t('One account for every step — from application to graduation.', 'আবেদন থেকে স্নাতক পর্যন্ত — প্রতিটি ধাপে একটি অ্যাকাউন্ট।')}</blockquote>
      <p>${t('Candidates, students and teachers sign in here. Officials use their dedicated portals.', 'প্রার্থী, শিক্ষার্থী ও শিক্ষকরা এখানে লগইন করেন। কর্মকর্তারা নিজস্ব পোর্টাল ব্যবহার করেন।')}</p>
    </div>
  </section>
  <section class="h-login-panel">
    <div class="h-login-top"><a class="h-back" ${href(V, '01-landing')}>${icon('arrow-left', 'ico ico-sm')}${t('Back to website', 'ওয়েবসাইটে ফিরুন')}</a>${langSwitch('lang h-lang-dark')}</div>
    <div class="h-login-box">
      <h1 class="h-h2">${t('Sign in', 'লগইন')}</h1>
      <p class="muted">${t('Choose your account type.', 'আপনার অ্যাকাউন্টের ধরন বেছে নিন।')}</p>
      <div class="h-seg" role="tablist" ${ta('aria-label', 'Account type', 'অ্যাকাউন্টের ধরন')}>
        ${each([['candidate', ['Candidate', 'প্রার্থী']], ['student', ['Student', 'শিক্ষার্থী']], ['teacher', ['Teacher', 'শিক্ষক']]], ([k, l], i) => `<button type="button" role="tab" id="ht-${k}" aria-controls="hp-${k}" aria-selected="${i === 1}" tabindex="${i === 1 ? 0 : -1}">${tt(l)}</button>`)}
      </div>
      <div id="hp-candidate" role="tabpanel" aria-labelledby="ht-candidate" hidden>
        <form class="h-form" data-candidate="h-cand" novalidate>
          <label class="fld"><span>${t('Application ID', 'আবেদন আইডি')}</span><input required value="TX-26-0048213">${err}</label>
          <label class="fld"><span>${t('Mobile number used to apply', 'আবেদনে ব্যবহৃত মোবাইল নম্বর')}</span><input required inputmode="tel" value="01711-000000"><span class="hint">${t('We send a one-time code to this number.', 'এই নম্বরে একটি ওটিপি পাঠানো হবে।')}</span>${err}</label>
          <button type="submit" class="btn btn-primary btn-lg">${t('Continue', 'এগিয়ে যান')}</button>
        </form>
        <div id="h-cand" class="h-cand" tabindex="-1" hidden>
          <p class="h-cand-k">${t('Application status', 'আবেদনের অবস্থা')}</p>
          <p class="h-cand-n">Nusrat Jahan Ria</p>
          <ul>
            <li>${icon('circle-check', 'ico ico-sm')}${t('Entrance test passed — merit position 1,284', 'ভর্তি পরীক্ষায় উত্তীর্ণ — মেধাক্রম ১,২৮৪')}</li>
            <li>${icon('circle-check', 'ico ico-sm')}${t('Allocated: Karnaphuli Textile Institute', 'বরাদ্দ: কর্ণফুলী টেক্সটাইল ইনস্টিটিউট')}</li>
            <li class="is-warn">${icon('circle-alert', 'ico ico-sm')}${t('Admission incomplete — fee ৳ 4,250 and SSC certificate due by 20 Nov', 'ভর্তি অসম্পূর্ণ — ২০ নভেম্বরের মধ্যে ৳ ৪,২৫০ ফি ও এসএসসি সনদ জমা দিন')}</li>
          </ul>
          <button type="button" class="btn btn-teal" ${p2('Complete admission', 'ভর্তি সম্পন্ন করুন')}>${t('Complete admission', 'ভর্তি সম্পন্ন করুন')}</button>
          <p class="proto-note">${t('When admission is complete, this candidate account becomes a student account with a new student ID.', 'ভর্তি সম্পন্ন হলে এই প্রার্থী অ্যাকাউন্টটি নতুন শিক্ষার্থী আইডিসহ শিক্ষার্থী অ্যাকাউন্টে রূপান্তরিত হবে।')}</p>
        </div>
      </div>
      <div id="hp-student" role="tabpanel" aria-labelledby="ht-student">
        <form class="h-form" data-demo-login data-go="${file(V, '07-student-dashboard')}" novalidate>
          <label class="fld"><span>${t('Student ID', 'শিক্ষার্থী আইডি')}</span><input required value="KTI-2024-2401" autocomplete="username">${err}</label>
          <label class="fld"><span>${t('Password', 'পাসওয়ার্ড')}</span><input required type="password" value="demo-pass" autocomplete="current-password">${err}</label>
          <div class="h-form-row"><label class="h-check"><input type="checkbox">${t('Keep me signed in', 'লগইন থাকুক')}</label><button type="button" class="link" ${p2('Reset password', 'পাসওয়ার্ড রিসেট')}>${t('Forgot password?', 'পাসওয়ার্ড ভুলে গেছেন?')}</button></div>
          <button type="submit" class="btn btn-primary btn-lg">${t('Sign in', 'লগইন')}</button>
        </form>
      </div>
      <div id="hp-teacher" role="tabpanel" aria-labelledby="ht-teacher" hidden>
        <form class="h-form" data-demo-login data-go="${file(V, '06-teacher-dashboard')}" novalidate>
          <label class="fld"><span>${t('Teacher ID or official email', 'শিক্ষক আইডি বা অফিসিয়াল ইমেইল')}</span><input required value="arif.hossain@kti.edu.bd" autocomplete="username">${err}</label>
          <label class="fld"><span>${t('Password', 'পাসওয়ার্ড')}</span><input required type="password" value="demo-pass" autocomplete="current-password">${err}</label>
          <div class="h-form-row"><span></span><button type="button" class="link" ${p2('Reset password', 'পাসওয়ার্ড রিসেট')}>${t('Forgot password?', 'পাসওয়ার্ড ভুলে গেছেন?')}</button></div>
          <button type="submit" class="btn btn-primary btn-lg">${t('Sign in', 'লগইন')}</button>
        </form>
      </div>
      <p class="proto-note">${t('Prototype: demo details are filled in.', 'প্রোটোটাইপ: ডেমো তথ্য দেওয়া আছে।')}</p>
    </div>
    <section class="h-portals" aria-labelledby="h-port-t">
      <h2 id="h-port-t">${t('Institutional and government portals', 'প্রাতিষ্ঠানিক ও সরকারি পোর্টাল')}</h2>
      <p>${t('Separate secure addresses — not part of the public sign-in.', 'আলাদা সুরক্ষিত ঠিকানা — পাবলিক লগইনের অংশ নয়।')}</p>
      <ul>${each(PORTALS, (p) => `<li><button type="button" data-portal="${p.k}"><span><b>${tt(p.l)}</b><small>${p.dom}</small></span>${icon('arrow-up-right', 'ico ico-sm')}</button></li>`)}</ul>
    </section>
  </section>
</main>`;
  return page({ v: V, screen: '03-login', title: ['Login', 'লগইন'], body, bodyClass: 'h-login-page' });
}

// ---------- internal shell ----------
const SIDENAV = {
  ministry: [['layout-dashboard', ['Overview', 'সারসংক্ষেপ']], ['building-2', ['Institutions', 'প্রতিষ্ঠান']], ['radio-tower', ['Operations', 'কার্যক্রম']], ['inbox', ['Approvals', 'অনুমোদন'], 31], ['chart-column', ['Reports', 'প্রতিবেদন']], ['settings-2', ['Administration', 'প্রশাসন']]],
  principal: [['layout-dashboard', ['Overview', 'সারসংক্ষেপ']], ['book-open', ['Academics', 'একাডেমিক']], ['users', ['People', 'জনবল']], ['inbox', ['Services & Approvals', 'সেবা ও অনুমোদন'], 14], ['boxes', ['Resources', 'সম্পদ']], ['chart-column', ['Reports', 'প্রতিবেদন']]],
  teacher: [['house', ['Home', 'হোম']], ['layers', ['My Classes', 'আমার ক্লাস']], ['user-check', ['Attendance', 'হাজিরা']], ['clipboard-check', ['Results', 'ফলাফল']], ['life-buoy', ['Services', 'সেবা']]],
  student: [['house', ['Home', 'হোম']], ['book-open', ['Academics', 'একাডেমিক']], ['chart-column', ['Results & Attendance', 'ফলাফল ও উপস্থিতি']], ['file-text', ['Services', 'সেবা']], ['user', ['Profile', 'প্রোফাইল']]],
};
const PORTAL = { ministry: ['Ministry portal', 'মন্ত্রণালয় পোর্টাল'], principal: ['Institution portal', 'প্রতিষ্ঠান পোর্টাল'], teacher: ['Teacher workspace', 'শিক্ষক ওয়ার্কস্পেস'], student: ['Student portal', 'স্টুডেন্ট পোর্টাল'] };
function appShell({ role, user, scope, crumbs, content }) {
  return `
<div class="h-app">
  <aside class="h-side" id="h-side" ${ta('aria-label', 'Workspace navigation', 'ওয়ার্কস্পেস মেনু')}>
    <a class="h-side-brand" href="#main">${mark()}<span><b>${tt(ORG.short)}</b><small>${tt(PORTAL[role])}</small></span></a>
    <nav><ul>${each(SIDENAV[role], ([ic, l, c], i) => `<li>${i === 0 ? `<a href="#main" aria-current="page">${icon(ic)}${tt(l)}</a>` : `<button type="button" ${p2(l[0], l[1])}>${icon(ic)}${tt(l)}${c ? `<span class="h-side-count">${n(c)}</span>` : ''}</button>`}</li>`)}</ul></nav>
    <div class="h-side-scope"><small>${t('Your scope', 'আপনার পরিধি')}</small><b>${tt(scope)}</b></div>
    <a class="h-side-out" ${href(V, '01-landing')}>${icon('log-out', 'ico ico-sm')}${t('Sign out', 'লগআউট')}</a>
  </aside>
  <div class="h-main">
    <header class="h-top">
      <button type="button" class="h-icon h-side-btn" data-menu="h-side" aria-expanded="false" ${ta('aria-label', 'Menu', 'মেনু')}>${icon('menu')}</button>
      <nav class="h-crumb h-crumb-app" ${ta('aria-label', 'Breadcrumb', 'অবস্থান')}>${crumbs.map((c, i) => (i < crumbs.length - 1 ? `<span>${tt(c)}</span><span aria-hidden="true">/</span>` : `<span aria-current="page">${tt(c)}</span>`)).join('')}</nav>
      <form class="h-top-search" role="search" data-search-demo="Search opens in the full prototype.|অনুসন্ধান পূর্ণ প্রোটোটাইপে খুলবে।"><label class="sr-only" for="hs">${t('Search', 'অনুসন্ধান')}</label>${icon('search', 'ico ico-sm')}<input id="hs" type="search" ${ta('placeholder', 'Search institutions, people, requests', 'প্রতিষ্ঠান, ব্যক্তি, আবেদন খুঁজুন')}></form>
      <button type="button" class="h-lang-tg" data-toggle-lang><span class="l-en" lang="bn">বাংলা</span><span class="l-bn" lang="en">English</span></button>
      <button type="button" class="h-icon h-bell" ${p2('Notifications', 'নোটিফিকেশন')} ${ta('aria-label', 'Notifications, 3 new', 'নোটিফিকেশন, ৩টি নতুন')}>${icon('bell')}<i></i></button>
      <span class="h-me"><span class="h-avatar">${user.initials}</span><span class="h-me-txt"><b>${user.name}</b><small>${tt(user.role)}</small></span></span>
    </header>
    <main id="main" class="h-content">${content}</main>
  </div>
</div>`;
}
const tone = (s) => ({ done: 'ok', approved: 'ok', published: 'ok', review: 'info', pending: 'neutral', later: 'neutral', returned: 'warn', due: 'warn', missing: 'danger' }[s] || 'neutral');
const st = (k) => `<span class="tag tag-${tone(k)}">${tt(STATUS[k])}</span>`;
const card = (title, inner, extra = '', cls = '') => `<section class="h-card ${cls}"><header class="h-card-head"><h2>${title}</h2>${extra}</header>${inner}</section>`;
function lineChart(arr, w = 560, h = 180, threshold = 80) {
  const min = 78, max = 90; const x = (i) => 36 + (i / (arr.length - 1)) * (w - 46); const y = (v) => 10 + (1 - (v - min) / (max - min)) * (h - 36);
  const pts = arr.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);
  return `<svg class="h-line" viewBox="0 0 ${w} ${h}" role="img" ${ta('aria-label', 'Student attendance, last 30 days, between 82% and 86%', 'গত ৩০ দিনের শিক্ষার্থী উপস্থিতি, ৮২% থেকে ৮৬%')}>
    ${[80, 85, 90].map((g) => `<line x1="36" x2="${w - 10}" y1="${y(g)}" y2="${y(g)}" class="${g === threshold ? 'h-thr' : 'h-grid'}"/><text x="30" y="${y(g) + 4}" text-anchor="end">${g}%</text>`).join('')}
    <path d="M${pts.join('L')} L${x(arr.length - 1)},${h - 26} L36,${h - 26}Z" class="h-area"/>
    <path d="M${pts.join('L')}" class="h-stroke"/>
    <circle cx="${x(arr.length - 1)}" cy="${y(arr[arr.length - 1])}" r="5" class="h-pt"/>
    <text x="36" y="${h - 6}">16 Sep</text><text x="${w - 10}" y="${h - 6}" text-anchor="end">15 Oct</text>
  </svg>`;
}
const ring = (pct, label, toneCls = '') => `<span class="h-ring ${toneCls}" style="--p:${pct}"><b>${n(pct + '%')}</b>${label ? `<small>${label}</small>` : ''}</span>`;
const noticeList = (list) => `<ul class="h-nlist">${each(list, (x) => `<li><a ${href(V, '02-notices')}><time>${d(x.date.slice(0, 6))}</time><span>${tt(x.t)}</span></a></li>`)}</ul>`;

// ---------- 04 Ministry ----------
function ministry() {
  const sel = DIVISIONS.find((x) => x.id === 'chattogram');
  const content = `
<div class="h-pagehead">
  <div><p class="h-eyebrow">${tt(TODAY)}</p><h1 class="h-display h-display-app">${t('National briefing', 'জাতীয় ব্রিফিং')}</h1>
    <p class="muted">${t('59 institutions · 8 divisions · 47 districts · live since 08:00', '৫৯টি প্রতিষ্ঠান · ৮ বিভাগ · ৪৭ জেলা · সকাল ৮:০০ থেকে সরাসরি')} ${demoTag()}</p></div>
  <div class="h-pagehead-act"><button type="button" class="btn btn-outline" ${p2('Customise dashboard', 'ড্যাশবোর্ড কাস্টমাইজ')}>${icon('settings-2', 'ico ico-sm')}${t('Customise', 'কাস্টমাইজ')}</button>
    <button type="button" class="btn btn-primary" ${p2('Reports', 'প্রতিবেদন')}>${icon('file-down', 'ico ico-sm')}${t('Export briefing', 'ব্রিফিং এক্সপোর্ট')}</button></div>
</div>
<ul class="h-kpis">
  ${each(MIN.kpis, (k) => `<li><span>${tt(k.l)}</span><b class="h-num-lg">${n(k.v)}</b><small class="${k.tone === 'warn' ? 'is-warn' : ''}">${tt(k.s)}</small></li>`)}
</ul>
<div class="h-grid-main">
  ${card(t('Attendance today, by division', 'বিভাগভিত্তিক আজকের উপস্থিতি'), `<div class="h-mapwrap">
      <div class="h-map-box">${divisionMap('att', 'chattogram')}
        <ul class="h-legend"><li><i style="background:var(--teal-700)"></i>${t('85% and above', '৮৫% ও বেশি')}</li><li><i style="background:#7FB3B0"></i>${t('80–85%', '৮০–৮৫%')}</li><li><i style="background:#C7685E"></i>${t('Below 80%', '৮০%-এর নিচে')}</li></ul></div>
      <div class="h-div-panel" aria-live="polite">
        <p class="h-eyebrow">${t('Selected division', 'নির্বাচিত বিভাগ')}</p>
        <h3 class="h-h3" data-div-field="name">${tt(sel.n)}</h3>
        <p class="h-div-status" data-div-field="status">${t('Below the 80% threshold', '৮০% সীমার নিচে')}</p>
        <dl>
          <div><dt>${t('Attendance', 'উপস্থিতি')}</dt><dd data-div-field="attTxt">${n(sel.att + '%')}</dd></div>
          <div><dt>${t('Institutions', 'প্রতিষ্ঠান')}</dt><dd data-div-field="inst">${n(sel.inst)}</dd></div>
          <div><dt>${t('Students', 'শিক্ষার্থী')}</dt><dd data-div-field="students">${n(sel.students)}</dd></div>
          <div><dt>${t('Reported', 'রিপোর্ট')}</dt><dd data-div-field="rep">${n(sel.rep)}</dd></div>
          <div><dt>${t('Open alerts', 'চলমান সতর্কতা')}</dt><dd data-div-field="alerts">${n(sel.alerts)}</dd></div>
        </dl>
        <div class="bar"><i data-div-bar style="width:${sel.att}%"></i></div>
        <button type="button" class="btn btn-primary" ${p2('Division dashboard', 'বিভাগ ড্যাশবোর্ড')}>${t('Open division', 'বিভাগ খুলুন')}${icon('arrow-right', 'ico ico-sm')}</button>
        <p class="h-small">${t('Select any division on the map.', 'মানচিত্রে যেকোনো বিভাগ বেছে নিন।')}</p>
      </div></div>`, `<span class="muted h-small">${MAP.attribution}</span>`, 'h-span-8')}
  ${card(t('Exceptions', 'ব্যতিক্রম'), `<ul class="h-exc">${each(MIN.exceptions, (x) => `<li class="sev-${x.sev}"><div><p class="h-exc-type">${tt(x.type)} · ${tt(x.age)}</p><b>${tt(x.t)}</b><small>${tt(x.where)}</small></div><span class="h-exc-v">${n(x.v)}</span></li>`)}</ul>
    <button type="button" class="h-arrow-link" ${p2('All exceptions', 'সব ব্যতিক্রম')}>${t('View all exceptions', 'সব ব্যতিক্রম দেখুন')}${icon('arrow-right', 'ico ico-sm')}</button>`, `<span class="tag tag-danger">${n(5)}</span>`, 'h-span-4')}
</div>
<div class="h-grid-main">
  ${card(t('Awaiting your approval', 'আপনার অনুমোদনের অপেক্ষায়'), `<div class="h-table-wrap"><table class="h-table">
      <thead><tr><th>${t('Request', 'অনুরোধ')}</th><th>${t('From', 'প্রেরক')}</th><th>${t('Waiting', 'অপেক্ষা')}</th><th>${t('Status', 'অবস্থা')}</th><th><span class="sr-only">${t('Actions', 'কাজ')}</span></th></tr></thead>
      <tbody>${each(MIN.approvals, (a) => `<tr data-row="${a.ref}"><td><b>${tt(a.t)}</b><small>${tt(a.type)} · ${a.ref} · ${tt(a.where)}</small></td><td>${tt(a.from)}</td>
        <td class="nowrap">${n(a.age)} ${t('days', 'দিন')}<small>SLA ${n(a.sla)}</small></td>
        <td data-row-status>${a.overdue ? `<span class="tag tag-danger">${t('Overdue', 'মেয়াদোত্তীর্ণ')}</span>` : `<span class="tag tag-info">${t('In time', 'সময়মতো')}</span>`}</td>
        <td class="h-actions"><button type="button" class="btn btn-teal btn-sm" data-row-action="approve">${t('Approve', 'অনুমোদন')}</button><button type="button" class="btn btn-outline btn-sm" data-row-action="return">${t('Return', 'ফেরত')}</button></td></tr>`)}</tbody></table></div>`,
  `<span class="h-small muted">${t('4 of', 'মোট')} <b data-count data-live-num="31">${n(31)}</b> ${t('pending', 'অপেক্ষমাণ')}</span>`, 'h-span-8')}
  ${card(t('Student attendance, 30 days', '৩০ দিনের শিক্ষার্থী উপস্থিতি'), `${lineChart(MIN.att30, 360, 280)}<p class="h-small muted">${t('Dashed line: 80% national threshold.', 'ড্যাশ রেখা: ৮০% জাতীয় সীমা।')}</p>`, '', 'h-span-4')}
</div>
<div class="h-grid-3">
  ${card(t('Admission 2026–27', 'ভর্তি ২০২৬–২৭'), `<ul class="h-funnel">${each(MIN.funnel, (f) => `<li><span>${tt(f.l)}</span><b>${n(f.v.toLocaleString('en-US'))}</b><span class="bar"><i style="width:${(f.v / 41260) * 100}%"></i></span></li>`)}</ul>`)}
  ${card(t('Recent notices', 'সাম্প্রতিক নোটিশ'), noticeList(NOTICES.slice(0, 4)), `<button type="button" class="h-arrow-link" ${p2('Publish a notice', 'নোটিশ প্রকাশ')}>${t('Publish', 'প্রকাশ')}</button>`)}
  ${card(t('Reports', 'প্রতিবেদন'), `<ul class="h-reports">${each(MIN.reports, (r) => `<li><button type="button" ${toast('Report download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে প্রতিবেদন ডাউনলোড হবে।')}><span><b>${tt(r.l)}</b><small>${tt(r.s)}</small></span>${icon('download', 'ico ico-sm')}</button></li>`)}</ul>`)}
</div>
${divJson()}`;
  const body = appShell({ role: 'ministry', user: MIN.user, scope: ['All Bangladesh', 'সমগ্র বাংলাদেশ'], crumbs: [['Ministry', 'মন্ত্রণালয়'], ['Overview', 'সারসংক্ষেপ']], content });
  return page({ v: V, screen: '04-ministry-dashboard', title: ['Ministry dashboard', 'মন্ত্রণালয় ড্যাশবোর্ড'], body, bodyClass: 'h-app-page' });
}

// ---------- 05 Principal ----------
function principal() {
  const content = `
<section class="h-inst">
  ${img('weaving-lab.jpg', ['Institute weaving laboratory', 'ইনস্টিটিউটের বয়ন ল্যাব'], 'h-inst-img', 'loading="eager"')}
  <div class="h-inst-in">
    <p class="h-eyebrow h-eyebrow-inv">${tt(TODAY)}</p>
    <h1 class="h-display h-display-app">${tt(PRIN.inst.n)}</h1>
    <p>${PRIN.inst.code} · ${tt(PRIN.inst.place)} · ${t('Principal', 'অধ্যক্ষ')}: Md. Saiful Islam</p>
  </div>
</section>
<ul class="h-kpis h-kpis-4 h-kpis-over">
  ${each(PRIN.kpis, (k) => `<li class="${k.tone ? `is-${k.tone}` : ''}"><span>${tt(k.l)}</span><b class="h-num-lg">${n(k.v)}</b><small>${tt(k.s)}</small></li>`)}
</ul>
<div class="h-grid-main">
  ${card(t('Attendance by class, today', 'ক্লাসভিত্তিক আজকের হাজিরা'), `<ul class="h-bars">${each(PRIN.classes, (c) => {
    const pct = c.p !== null ? Math.round((c.p / c.t) * 100) : 0;
    return `<li><span class="h-bars-l"><b>${tt(c.c)}</b><small>${c.teacher}</small></span>
      <span class="h-bars-track">${c.p !== null ? `<i class="${pct < 80 ? 'is-low' : ''}" style="width:${pct}%"></i>` : ''}<em style="left:80%"></em></span>
      <span class="h-bars-v">${c.p !== null ? n(pct + '%') : c.st === 'missing' ? `<span class="tag tag-danger">${t('Not submitted', 'জমা হয়নি')}</span>` : `<span class="tag tag-warn">${t('Due', 'বাকি')}</span>`}</span></li>`;
  })}</ul><p class="h-small muted">${t('Marker: 80% threshold. Overall today 72.4%.', 'চিহ্ন: ৮০% সীমা। আজ সামগ্রিক ৭২.৪%।')}</p>`,
  `<button type="button" class="btn btn-outline btn-sm" ${toast('Reminder sent to Tahmina Akter.', 'তাহমিনা আক্তারকে রিমাইন্ডার পাঠানো হয়েছে।')}>${t('Remind missing', 'বাকিদের মনে করান')}</button>`, 'h-span-7')}
  ${card(t('Requests for your decision', 'আপনার সিদ্ধান্তের অনুরোধ'), `<ul class="h-appr">${each(PRIN.approvals, (a) => `<li data-row="${a.ref}">
      <div><p class="h-exc-type">${tt(a.type)} · ${a.ref}</p><b>${a.who}</b><small>${tt(a.meta)} · ${n(a.age)} ${t('days', 'দিন')}${a.overdue ? ` · <span class="h-urgent">${t('Overdue', 'মেয়াদোত্তীর্ণ')}</span>` : ''}</small><span data-row-status></span></div>
      <div class="h-appr-act"><button type="button" class="h-round ok" data-row-action="approve" ${ta('aria-label', `Approve ${a.ref}`, `${a.ref} অনুমোদন`)} ${ta('title', 'Approve', 'অনুমোদন')}>${icon('check', 'ico ico-sm')}</button>
        <button type="button" class="h-round" data-row-action="return" ${ta('aria-label', `Return ${a.ref}`, `${a.ref} ফেরত`)} ${ta('title', 'Return for correction', 'সংশোধনের জন্য ফেরত')}>${icon('rotate-ccw', 'ico ico-sm')}</button></div></li>`)}</ul>
    <button type="button" class="h-arrow-link" ${p2('Services & Approvals', 'সেবা ও অনুমোদন')}>${t('All 14 requests', 'সব ১৪টি অনুরোধ')}${icon('arrow-right', 'ico ico-sm')}</button>`,
  `<span class="tag tag-warn"><span data-count data-live-num="4">${n(4)}</span></span>`, 'h-span-5')}
</div>
<div class="h-grid-3">
  ${card(t('Pending with other offices', 'অন্য দপ্তরে অপেক্ষমাণ'), `<ul class="h-else">${each(PRIN.elsewhere, (x) => `<li><b>${tt(x.t)}</b><small>${icon('hourglass', 'ico ico-xs')}${tt(x.who)} · ${tt(x.age)}</small></li>`)}</ul>`)}
  ${card(t('Notices', 'নোটিশ'), noticeList([NOTICES[5], NOTICES[4], NOTICES[6]]))}
  ${card(t('Quick actions', 'দ্রুত কাজ'), `<ul class="h-quick">${each(PRIN.quick.slice(0, 6), (q) => `<li><button type="button" ${p2(q.l[0], q.l[1])}>${icon(q.icon, 'ico')}${tt(q.l)}${icon('chevron-right', 'ico ico-sm')}</button></li>`)}</ul>`)}
</div>`;
  const body = appShell({ role: 'principal', user: PRIN.user, scope: PRIN.inst.n, crumbs: [['Institution', 'প্রতিষ্ঠান'], ['Overview', 'সারসংক্ষেপ']], content });
  return page({ v: V, screen: '05-principal-dashboard', title: ['Principal dashboard', 'অধ্যক্ষ ড্যাশবোর্ড'], body, bodyClass: 'h-app-page' });
}

// ---------- 06 Teacher ----------
function teacher() {
  const now = TEACH.classes[1];
  const content = `
<div class="h-pagehead">
  <div><p class="h-eyebrow">${tt(TODAY)}</p><h1 class="h-display h-display-app">${t('Today, Arif', 'আজ, আরিফ')}</h1>
    <p class="muted">${t('3 classes · 1 attendance due now · 1 result returned for correction', '৩টি ক্লাস · ১টি হাজিরা এখন বাকি · ১টি ফলাফল সংশোধনের জন্য ফেরত')}</p></div>
</div>
<div class="h-grid-main">
  <section class="h-card h-span-7" aria-labelledby="h-sched-t">
    <header class="h-card-head"><h2 id="h-sched-t">${t('Schedule', 'সময়সূচি')}</h2></header>
    <ol class="h-sched">
      ${each(TEACH.classes, (c) => `<li class="is-${c.st}">
        <time><b>${n(c.time)}</b><small>${n(c.end)}</small></time>
        <div class="h-sched-body">
          <p class="h-sched-t"><b>${tt(c.sub)}</b>${c.st === 'done' ? `<span class="tag tag-ok">${t('Recorded', 'লিপিবদ্ধ')} ${n(c.p + '/' + c.t)}</span>` : c.st === 'now' ? `<span class="tag tag-warn" data-att-state>${t('Now · attendance due', 'এখন · হাজিরা বাকি')}</span>` : st('later')}</p>
          <small>${tt(c.c)} · ${tt(c.room)}</small>
          ${c.st === 'now' ? `<div class="h-reg" data-att-scope data-total="${c.t}" data-att-hide>
            <div class="h-reg-head"><b>${t('Attendance register', 'হাজিরা রেজিস্টার')}</b><span>${t('Present', 'উপস্থিত')} <b data-att-p>${n(5)}</b> · ${t('Absent', 'অনুপস্থিত')} <b data-att-a>${n(1)}</b> · ${t('Leave', 'ছুটি')} <b data-att-l>${n(1)}</b></span><button type="button" class="link" data-att-all>${t('All present', 'সবাই উপস্থিত')}</button></div>
            <table class="h-table h-reg-t"><thead><tr><th>${t('Roll', 'রোল')}</th><th>${t('Student', 'শিক্ষার্থী')}</th><th>${t('Status', 'অবস্থা')}</th></tr></thead><tbody>
            ${each(TEACH.roster.slice(0, 6), (r) => `<tr data-att-row><td class="tnum">${r.roll}</td><td>${r.name}</td><td><span class="h-pal" role="radiogroup" aria-label="${r.name}">${['P', 'A', 'L'].map((k) => `<label><input type="radio" name="h${r.roll}" value="${k}" ${r.s === k ? 'checked' : ''}><span>${k === 'P' ? t('P', 'উ') : k === 'A' ? t('A', 'অ') : t('L', 'ছু')}</span></label>`).join('')}</span></td></tr>`)}
            </tbody></table>
            <div class="h-reg-foot"><span class="h-small muted">${t('6 of 60 shown · P present, A absent, L leave', '৬০ জনের ৬ জন · উ উপস্থিত, অ অনুপস্থিত, ছু ছুটি')}</span><button type="button" class="btn btn-primary" data-att-submit>${t('Submit attendance', 'হাজিরা জমা দিন')}</button></div>
          </div>
          <p class="h-reg-done" data-att-show hidden>${icon('circle-check', 'ico ico-sm')}${t('Submitted. The Principal’s and Head Office dashboards now show this class.', 'জমা হয়েছে। অধ্যক্ষ ও প্রধান কার্যালয়ের ড্যাশবোর্ডে এই ক্লাস দেখা যাচ্ছে।')}</p>` : ''}
        </div></li>`)}
    </ol>
  </section>
  <div class="h-span-5 h-col">
    ${card(t('Tasks', 'কাজ'), `<ul class="h-tasks">${each(TEACH.tasks, (k) => `<li class="${k.warn ? 'is-warn' : ''}"><div><b>${tt(k.t)}</b><small>${tt(k.s)}</small>${k.pct !== null ? `<span class="bar"><i style="width:${k.pct}%"></i></span>` : ''}</div><button type="button" class="h-arrow-link" ${p2(k.t[0], k.t[1])}>${tt(k.btn)}${icon('arrow-right', 'ico ico-sm')}</button></li>`)}</ul>`)}
    ${card(t('Leave balance', 'ছুটির হিসাব'), `<div class="h-rings">${each(TEACH.leave, (l) => `<div>${ring(Math.round(((l.total - l.used) / l.total) * 100), '')}<b>${tt(l.l)}</b><small>${n(l.total - l.used)} ${t('of', '/')} ${n(l.total)} ${t('days left', 'দিন বাকি')}</small></div>`)}</div>
      <button type="button" class="btn btn-outline" ${p2('Apply for leave', 'ছুটির আবেদন')}>${icon('calendar-plus', 'ico ico-sm')}${t('Apply for leave', 'ছুটির আবেদন')}</button>`)}
    ${card(t('Notices', 'নোটিশ'), noticeList([NOTICES[4], NOTICES[2], NOTICES[6]]))}
  </div>
</div>`;
  const body = appShell({ role: 'teacher', user: TEACH.user, scope: PRIN.inst.n, crumbs: [['Teacher', 'শিক্ষক'], ['Home', 'হোম']], content });
  return page({ v: V, screen: '06-teacher-dashboard', title: ['Teacher dashboard', 'শিক্ষক ড্যাশবোর্ড'], body, bodyClass: 'h-app-page' });
}

// ---------- 07 Student ----------
function student() {
  const content = `
<section class="h-profile">
  <div class="h-profile-id"><span class="h-avatar h-avatar-lg">MA</span><div><p class="h-eyebrow h-eyebrow-inv">${tt(TODAY)}</p><h1 class="h-display h-display-app">Mim Akter</h1>
    <p>${STU.id} · ${tt(STU.prog)}</p><p>${tt(STU.year)} · ${tt(PRIN.inst.n)}</p></div></div>
  <dl class="h-profile-fig">
    <div><dt>${t('CGPA', 'সিজিপিএ')}</dt><dd class="h-num-lg">${n(STU.cgpa)}</dd></div>
    <div><dt>${t('Attendance', 'উপস্থিতি')}</dt><dd>${ring(STU.att, '', 'is-warn')}</dd></div>
    <div><dt>${t('Fees due', 'বকেয়া ফি')}</dt><dd class="h-num-lg">৳ ${n(STU.fees)}</dd><dd><button type="button" class="btn btn-white btn-sm" ${p2('Online fee payment', 'অনলাইনে ফি পরিশোধ')}>${t('Pay by 31 Oct', '৩১ অক্টোবরের মধ্যে দিন')}</button></dd></div>
  </dl>
</section>
<div class="h-notice-bar">${icon('circle-alert', 'ico')}<p><b>${t('Returned for correction:', 'সংশোধনের জন্য ফেরত:')}</b> ${t('Testimonial', 'প্রশংসাপত্র')} (SR-2026-01398) — ${tt(STU.requests[0].note)}</p><button type="button" class="btn btn-teal btn-sm" ${p2('Fix and resubmit request', 'সংশোধন করে পুনরায় জমা')}>${t('Fix and resubmit', 'ঠিক করে আবার জমা দিন')}</button></div>
<div class="h-notice-bar is-soft">${icon('info', 'ico')}<p>${t('Your attendance is 78%. You need 80% to sit the Semester 3 examination.', 'আপনার উপস্থিতি ৭৮%। সেমিস্টার ৩ পরীক্ষায় বসতে ৮০% প্রয়োজন।')}</p></div>
<div class="h-grid-main">
  ${card(t('Academic progress', 'একাডেমিক অগ্রগতি'), `<div class="h-gpa">${each([...STU.results].reverse(), (r) => `<div class="h-gpa-col ${r.gpa ? '' : 'is-pending'}"><span class="h-gpa-bar" style="height:${r.gpa ? (parseFloat(r.gpa) / 4) * 160 : 160}px">${r.gpa ? n(r.gpa) : ''}</span><b>${tt(r.sem)}</b><small>${r.gpa ? tt(STATUS.published) : tt(STATUS.pending)}</small></div>`)}</div>`, `<span class="muted h-small">GPA / 4.00</span>`, 'h-span-6')}
  ${card(t('Attendance by course', 'কোর্সভিত্তিক উপস্থিতি'), `<ul class="h-bars">${each(STU.courses, (c) => `<li><span class="h-bars-l"><b>${tt(c.c)}</b></span><span class="h-bars-track"><i class="${c.a < 80 ? 'is-low' : ''}" style="width:${c.a}%"></i><em style="left:80%"></em></span><span class="h-bars-v">${n(c.a + '%')}</span></li>`)}</ul>`, '', 'h-span-6')}
</div>
<div class="h-grid-main">
  ${card(t('My requests', 'আমার আবেদন'), `<div class="h-table-wrap"><table class="h-table"><thead><tr><th>${t('Service', 'সেবা')}</th><th>${t('Submitted', 'জমা')}</th><th>${t('Status', 'অবস্থা')}</th><th><span class="sr-only">${t('Action', 'কাজ')}</span></th></tr></thead><tbody>
    ${each(STU.requests, (r) => `<tr><td><b>${tt(r.s)}</b><small>${r.ref} · ${tt(r.note)}</small></td><td class="nowrap">${d(r.date)}</td><td>${st(r.st)}</td><td>${r.st === 'returned' ? `<button type="button" class="btn btn-teal btn-sm" ${p2('Fix and resubmit request', 'সংশোধন করে পুনরায় জমা')}>${t('Fix', 'ঠিক করুন')}</button>` : r.st === 'done' ? `<button type="button" class="btn btn-outline btn-sm" ${toast('Download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে ডাউনলোড শুরু হবে।')}>${t('Download', 'ডাউনলোড')}</button>` : `<button type="button" class="btn btn-ghost btn-sm" ${p2('Request tracking', 'আবেদন ট্র্যাকিং')}>${t('Track', 'ট্র্যাক')}</button>`}</td></tr>`)}
  </tbody></table></div>`, '', 'h-span-7')}
  <div class="h-span-5 h-col">
    ${card(t('Today’s classes', 'আজকের ক্লাস'), `<ul class="h-today">${each(STU.classes, (c) => `<li><time>${n(c.time)}</time><span><b>${tt(c.sub)}</b><small>${c.who} · ${tt(c.room)}</small></span></li>`)}</ul>`)}
    ${card(t('Notices', 'নোটিশ'), noticeList([NOTICES[2], NOTICES[6], NOTICES[10]]))}
  </div>
</div>
${card(t('Online services', 'অনলাইন সেবা'), `<ul class="h-svc-list">${each(STU.services, (s) => `<li><button type="button" ${p2(s[0], s[1])}>${tt(s)}${icon('arrow-up-right', 'ico ico-sm')}</button></li>`)}</ul>`, `<span class="muted h-small">${t('15 services, each with its own approval steps', '১৫টি সেবা, প্রতিটির আলাদা অনুমোদন ধাপ')}</span>`)}`;
  const body = appShell({ role: 'student', user: STU.user, scope: PRIN.inst.n, crumbs: [['Student', 'শিক্ষার্থী'], ['Home', 'হোম']], content });
  return page({ v: V, screen: '07-student-dashboard', title: ['Student dashboard', 'শিক্ষার্থী ড্যাশবোর্ড'], body, bodyClass: 'h-app-page' });
}

export default {
  '01-landing': landing, '02-notices': notices, '03-login': login,
  '04-ministry-dashboard': ministry, '05-principal-dashboard': principal,
  '06-teacher-dashboard': teacher, '07-student-dashboard': student,
};
