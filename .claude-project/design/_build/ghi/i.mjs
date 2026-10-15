// Variation I — Functional Government Workspace.
// Public site: familiar Bangladesh-portal structure (banner + notice board, quick services, notice table),
// cleaned up. Internal: light grouped sidebar, compact KPI strip, work-queue tables with bulk actions.
import { t, tt, n, d, ta, icon, img, each, esc, opt } from './lib.mjs';
import { page, href, p2, toast, langSwitch, demoTag, mark, govSeal, file } from './shared.mjs';
import {
  ORG, PUBLIC_NAV, STATS, ADMISSION, NOTICES, NOTICE_CATS, catLabel, AUTH, SERVICES, GALLERY, FAQ, HELP, PORTALS,
  DIVISIONS, MIN, PRIN, TEACH, STU, STATUS, TODAY, UPDATED,
} from './data.mjs';

const V = 'i';
const tone = (s) => ({ done: 'ok', approved: 'ok', published: 'ok', submitted: 'ok', review: 'info', pending: 'neutral', later: 'neutral', returned: 'warn', due: 'warn', missing: 'danger' }[s] || 'neutral');
const st = (k) => `<span class="tag tag-${tone(k)}">${tt(STATUS[k])}</span>`;
const catTag = (k) => `<span class="i-cat">${tt(catLabel(k))}</span>`;

// ---------- public chrome ----------
function publicHeader(active, onLanding = false) {
  const items = PUBLIC_NAV.map((it) => {
    const cur = it.key === active ? 'aria-current="page"' : '';
    if (it.href) return `<li><a href="${file(V, it.href)}" ${cur}>${tt(it.label)}</a></li>`;
    if (it.anchor) return `<li><a href="${onLanding ? '' : file(V, '01-landing')}#${it.anchor}" ${cur}>${tt(it.label)}</a></li>`;
    return `<li><button type="button" ${p2(it.label[0], it.label[1])}>${tt(it.label)}</button></li>`;
  }).join('');
  return `
<div class="i-gov"><div class="container i-gov-in">
  <p>${govSeal('seal')}<span>${tt(ORG.gov)}</span></p>
  <div class="i-gov-tools">
    <span class="i-hide-sm">${icon('calendar-days', 'ico ico-sm')}${tt(TODAY)}</span>
    <span class="i-size i-hide-sm" role="group" ${ta('aria-label', 'Text size', 'লেখার আকার')}><button type="button" data-textsize="-1">A−</button><button type="button" data-textsize="0">A</button><button type="button" data-textsize="1">A+</button></span>
    ${langSwitch('lang i-lang')}
  </div>
</div></div>
<header class="i-head"><div class="container i-head-in">
  <a class="i-brand" ${href(V, '01-landing')}>${mark()}<span><b>${tt(ORG.product)}</b><small>${tt(ORG.dept)}, ${tt(ORG.ministry)}</small></span></a>
  <form class="i-search i-hide-md" role="search" data-search-demo="Search results open in the full prototype (Phase 2).|অনুসন্ধানের ফলাফল পূর্ণ প্রোটোটাইপে (দ্বিতীয় পর্যায়) খুলবে।">
    <label class="sr-only" for="i-scope">${t('Search in', 'যেখানে খুঁজবেন')}</label>
    <select id="i-scope">${opt('all', 'All', 'সব')}${opt('inst', 'Institutions', 'প্রতিষ্ঠান')}${opt('notice', 'Notices', 'নোটিশ')}${opt('svc', 'Services', 'সেবা')}</select>
    <label class="sr-only" for="i-q">${t('Search', 'অনুসন্ধান')}</label><input id="i-q" type="search" ${ta('placeholder', 'Institution name or code, notice, service…', 'প্রতিষ্ঠানের নাম বা কোড, নোটিশ, সেবা…')}>
    <button type="submit" class="btn btn-primary" ${ta('aria-label', 'Search', 'খুঁজুন')}>${icon('search', 'ico ico-sm')}</button>
  </form>
  <div class="i-hotline i-hide-sm">${icon('headset', 'ico ico-lg')}<span><small>${t('Help desk', 'হেল্প ডেস্ক')}</small><b>${n(ORG.helpline)}</b></span></div>
</div></header>
<nav class="i-nav" ${ta('aria-label', 'Main', 'প্রধান মেনু')}><div class="container i-nav-in">
  <button type="button" class="i-menu" data-menu="i-nav-list" aria-expanded="false">${icon('menu', 'ico ico-sm')}${t('Menu', 'মেনু')}</button>
  <ul id="i-nav-list">${items}</ul>
  <a class="i-nav-login" ${href(V, '03-login')}>${icon('log-in', 'ico ico-sm')}${t('Login', 'লগইন')}</a>
</div></nav>`;
}
function ticker() {
  return `<div class="i-ticker"><div class="container i-ticker-in"><b>${icon('megaphone', 'ico ico-sm')}${t('Latest', 'সর্বশেষ')}</b>
    <ul>${each(NOTICES.slice(0, 3), (x) => `<li><a ${href(V, '02-notices')}>${tt(x.t)}</a> <span>(${d(x.date)})</span></li>`)}</ul></div></div>`;
}
function publicFooter() {
  const col = (h, items) => `<div><h3>${tt(h)}</h3><ul>${items.map(([l, a]) => `<li>${icon('chevron-right', 'ico ico-xs')}${a ? `<a ${a}>${tt(l)}</a>` : `<button type="button" ${p2(l[0], l[1])}>${tt(l)}</button>`}</li>`).join('')}</ul></div>`;
  return `
<footer class="i-foot">
  <div class="container i-foot-grid">
    ${col(['About', 'সম্পর্কে'], [[['About the system', 'সিস্টেম সম্পর্কে']], [['Institution directory', 'প্রতিষ্ঠান ডিরেক্টরি']], [['Public dashboard', 'পাবলিক ড্যাশবোর্ড'], `href="${file(V, '01-landing')}#insights"`], [['Citizen charter', 'সিটিজেন চার্টার']]])}
    ${col(['Admissions & results', 'ভর্তি ও ফলাফল'], [[['Admission 2026–27', 'ভর্তি ২০২৬–২৭'], `href="${file(V, '01-landing')}#admissions"`], [['Admission result', 'ভর্তির ফলাফল']], [['Certificate verification', 'সনদ যাচাই'], `href="${file(V, '01-landing')}#verify"`], [['Track application', 'আবেদনের অবস্থা'], href(V, '03-login')]])}
    ${col(['Notices', 'নোটিশ'], [[['All notices', 'সকল নোটিশ'], href(V, '02-notices')], [['Circulars', 'পরিপত্র'], href(V, '02-notices')], [['Tenders', 'দরপত্র'], href(V, '02-notices')], [['Downloads', 'ডাউনলোড']]])}
    ${col(['Related organisations', 'সংশ্লিষ্ট প্রতিষ্ঠান'], [[['Ministry of Textiles and Jute', 'বস্ত্র ও পাট মন্ত্রণালয়']], [['Department of Textiles', 'বস্ত্র অধিদপ্তর']], [['Bangladesh Technical Education Board', 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড']], [['National portal', 'জাতীয় তথ্য বাতায়ন']]])}
    <div><h3>${t('Contact', 'যোগাযোগ')}</h3><address>${tt(ORG.dept)}<br>${t('Head office, Dhaka (address TBD)', 'প্রধান কার্যালয়, ঢাকা (ঠিকানা নির্ধারিত হবে)')}<br>${t('Help desk', 'হেল্প ডেস্ক')}: ${n(ORG.helpline)}<br>${ORG.email}</address></div>
  </div>
  <div class="i-foot-bar"><div class="container i-foot-bar-in">
    <p>© 2026 ${tt(ORG.dept)}. ${t('All rights reserved.', 'সর্বস্বত্ব সংরক্ষিত।')} ${t('Last updated', 'সর্বশেষ হালনাগাদ')}: ${d(UPDATED)}</p>
    <p><button type="button" ${p2('Privacy policy', 'গোপনীয়তা নীতি')}>${t('Privacy', 'গোপনীয়তা')}</button> · <button type="button" ${p2('Terms of use', 'ব্যবহারের শর্তাবলি')}>${t('Terms', 'শর্তাবলি')}</button> · <a href="../assets/ghi/img/CREDITS.json">${t('Photo credits', 'ছবির কৃতজ্ঞতা')}</a></p>
  </div></div>
</footer>`;
}

// ---------- 01 Landing ----------
function landing() {
  const boardTabs = [['all', ['Latest', 'সর্বশেষ']], ['admission', ['Admission', 'ভর্তি']], ['exam', ['Exam & result', 'পরীক্ষা ও ফল']]];
  const body = `
${publicHeader('home', true)}
${ticker()}
<main id="main">
  <section class="container i-top">
    <div class="i-banner">
      ${img('printing.jpg', ['Apparel students at screen-printing training', 'স্ক্রিন প্রিন্টিং প্রশিক্ষণে অ্যাপারেল শিক্ষার্থীরা'], 'i-banner-img', 'loading="eager" fetchpriority="high"')}
      <div class="i-banner-box">
        <h1>${t('Textile education services and information', 'টেক্সটাইল শিক্ষা সেবা ও তথ্য')}</h1>
        <p>${t('Admissions, results, notices and certificate verification for 59 government textile institutions.', '৫৯টি সরকারি টেক্সটাইল প্রতিষ্ঠানের ভর্তি, ফলাফল, নোটিশ ও সনদ যাচাই।')}</p>
        <div class="i-banner-act"><a class="btn btn-teal" href="#admissions">${t('Admission information', 'ভর্তি তথ্য')}</a><button type="button" class="btn btn-white" ${p2('Institution directory', 'প্রতিষ্ঠান ডিরেক্টরি')}>${t('Explore institutions', 'প্রতিষ্ঠান দেখুন')}</button></div>
      </div>
    </div>
    <section class="i-board" aria-labelledby="i-board-t">
      <header><h2 id="i-board-t">${icon('megaphone', 'ico ico-sm')}${t('Notice board', 'নোটিশ বোর্ড')}</h2></header>
      <div class="i-board-tabs" role="tablist">${each(boardTabs, ([k, l], i) => `<button type="button" role="tab" id="bt-${k}" aria-controls="bp-${k}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${tt(l)}</button>`)}</div>
      ${each(boardTabs, ([k], i) => `<ul id="bp-${k}" role="tabpanel" aria-labelledby="bt-${k}" class="i-board-list" ${i ? 'hidden' : ''}>
        ${each(NOTICES.filter((x) => k === 'all' || x.cat === k).slice(0, 6), (x) => `<li><a ${href(V, '02-notices')}><time>${d(x.date)}</time><span>${x.urgent ? `<em>${t('Urgent', 'জরুরি')}</em> ` : ''}${tt(x.t)}</span></a></li>`)}</ul>`)}
      <a class="i-board-all" ${href(V, '02-notices')}>${t('All notices', 'সকল নোটিশ')}${icon('arrow-right', 'ico ico-sm')}</a>
    </section>
  </section>

  <section class="container" aria-label="Statistics">
    <ul class="i-stats">
      ${each(STATS, (s) => `<li>${icon(s.icon, 'ico ico-lg')}<span><b class="tnum">${n(s.v)}</b><small>${tt(s.l)}</small></span></li>`)}
      <li class="i-stats-meta">${demoTag()}<small>${t('Updated', 'হালনাগাদ')} ${d(UPDATED)}</small></li>
    </ul>
  </section>

  <section class="container i-three" id="services">
    <section class="i-box" aria-labelledby="i-qs-t">
      <h2 id="i-qs-t" class="i-box-t">${t('Quick services', 'দ্রুত সেবা')}</h2>
      <ul class="i-qs">${each(SERVICES, (s) => `<li>${s.to ? `<a ${href(V, s.to)}>` : `<button type="button" ${p2(s.l[0], s.l[1])}>`}${icon(s.icon, 'ico')}<span>${tt(s.l)}</span>${s.to ? '</a>' : '</button>'}</li>`)}</ul>
    </section>
    <section class="i-box" id="admissions" aria-labelledby="i-adm-t">
      <h2 id="i-adm-t" class="i-box-t">${t('Admission 2026–27', 'ভর্তি ২০২৬–২৭')}</h2>
      <table class="i-mini"><caption class="sr-only">${tt(ADMISSION.cycle)}</caption><tbody>
        ${each(ADMISSION.steps.slice(0, 6), (s) => `<tr class="is-${s.st}"><th scope="row">${tt(s.l)}</th><td>${d(s.date)}</td><td>${s.st === 'done' ? `<span class="tag tag-ok no-dot">${t('Done', 'সম্পন্ন')}</span>` : s.st === 'next' ? `<span class="tag tag-info no-dot">${t('Next', 'পরবর্তী')}</span>` : ''}</td></tr>`)}
      </tbody></table>
      <p class="i-note">${icon('id-card', 'ico ico-sm')}${t('Application ID → student ID after final admission.', 'চূড়ান্ত ভর্তির পর আবেদন আইডি → শিক্ষার্থী আইডি।')}</p>
      <div class="i-btns"><button type="button" class="btn btn-primary btn-sm" ${p2('Admission result', 'ভর্তির ফলাফল')}>${t('Check result', 'ফলাফল দেখুন')}</button><button type="button" class="btn btn-teal btn-sm" ${p2('Vocational 2027 application', 'ভোকেশনাল ২০২৭ আবেদন')}>${t('Apply: Vocational 2027', 'আবেদন: ভোকেশনাল ২০২৭')}</button><a class="btn btn-outline btn-sm" ${href(V, '03-login')}>${t('Track', 'ট্র্যাক')}</a></div>
    </section>
    <section class="i-box" id="verify" aria-labelledby="i-ver-t">
      <h2 id="i-ver-t" class="i-box-t">${t('Verify a certificate', 'সনদ যাচাই')}</h2>
      <form data-verify novalidate class="i-verify">
        <label class="fld"><span>${t('Certificate or license number', 'সনদ বা লাইসেন্স নম্বর')}</span><input required value="CERT-2025-00481"><span class="hint">${t('Try CERT-2025-00481 (valid) or any other number.', 'CERT-2025-00481 (বৈধ) বা অন্য যেকোনো নম্বর দিয়ে দেখুন।')}</span><span class="err" hidden>${t('Enter a number', 'একটি নম্বর দিন')}</span></label>
        <button type="submit" class="btn btn-primary">${icon('shield-check', 'ico ico-sm')}${t('Verify', 'যাচাই করুন')}</button>
      </form>
      <div class="i-ver-res is-ok" data-verify-found hidden>${icon('badge-check', 'ico ico-lg')}<div><b>${t('Valid certificate', 'বৈধ সনদ')}</b><small>Diploma in Textile Engineering · 2025 · Karnaphuli Textile Institute</small></div></div>
      <div class="i-ver-res is-bad" data-verify-none hidden>${icon('circle-x', 'ico ico-lg')}<div><b>${t('No record found', 'কোনো রেকর্ড পাওয়া যায়নি')}</b><small>${t('Check the number. Organisations: paid verification is part of Phase 2.', 'নম্বরটি যাচাই করুন। প্রতিষ্ঠানের জন্য ফি-ভিত্তিক যাচাই দ্বিতীয় পর্যায়ে।')}</small></div></div>
    </section>
  </section>

  <section class="container i-two" id="insights">
    <section class="i-box" aria-labelledby="i-about-t">
      <h2 id="i-about-t" class="i-box-t">${t('About the system', 'সিস্টেম সম্পর্কে')}</h2>
      <div class="i-about">${img('loom-workshop.jpg', ['A loom workshop', 'একটি লুম ওয়ার্কশপ'])}
        <div><p>${t('The Textile Institution Management System is the official platform of the Department of Textiles. It connects the Ministry, 8 divisions, 47 districts and 59 institutions in one database.', 'টেক্সটাইল প্রতিষ্ঠান ব্যবস্থাপনা সিস্টেম বস্ত্র অধিদপ্তরের অফিসিয়াল প্ল্যাটফর্ম। এটি মন্ত্রণালয়, ৮ বিভাগ, ৪৭ জেলা ও ৫৯টি প্রতিষ্ঠানকে একটি ডেটাবেসে যুক্ত করে।')}</p>
        <ul class="i-ticks"><li>${icon('check', 'ico ico-sm')}${t('Online admission and results', 'অনলাইনে ভর্তি ও ফলাফল')}</li><li>${icon('check', 'ico ico-sm')}${t('Live attendance from every institution', 'প্রতিটি প্রতিষ্ঠান থেকে লাইভ হাজিরা')}</li><li>${icon('check', 'ico ico-sm')}${t('Student services and approvals online', 'অনলাইনে শিক্ষার্থী সেবা ও অনুমোদন')}</li><li>${icon('check', 'ico ico-sm')}${t('Budget, assets and reports for the Ministry', 'মন্ত্রণালয়ের জন্য বাজেট, সম্পদ ও প্রতিবেদন')}</li></ul>
        <button type="button" class="link" ${p2('About Us', 'আমাদের সম্পর্কে')}>${t('Read more', 'আরও পড়ুন')}${icon('arrow-right', 'ico ico-sm')}</button></div></div>
    </section>
    <section class="i-box" aria-labelledby="i-pd-t">
      <h2 id="i-pd-t" class="i-box-t">${t('Public dashboard', 'পাবলিক ড্যাশবোর্ড')} ${demoTag()}</h2>
      <table class="i-table i-table-sm"><thead><tr><th>${t('Division', 'বিভাগ')}</th><th class="num">${t('Institutions', 'প্রতিষ্ঠান')}</th><th class="num">${t('Students', 'শিক্ষার্থী')}</th><th>${t('Attendance today', 'আজ উপস্থিতি')}</th></tr></thead>
        <tbody>${each(DIVISIONS, (v) => `<tr><td>${tt(v.n)}</td><td class="num">${n(v.inst)}</td><td class="num">${n(v.students)}</td><td><span class="i-attbar"><span class="bar ${v.att < 80 ? 'danger' : ''}"><i style="width:${v.att}%"></i></span>${n(v.att.toFixed(1) + '%')}</span></td></tr>`)}</tbody>
        <tfoot><tr><th>${t('Total', 'মোট')}</th><th class="num">${n(59)}</th><th class="num">${n('38,420')}</th><th>${n('85.1%')}</th></tr></tfoot></table>
      <button type="button" class="btn btn-outline btn-sm" ${p2('Public dashboard', 'পাবলিক ড্যাশবোর্ড')}>${icon('chart-column', 'ico ico-sm')}${t('Open public dashboard', 'পাবলিক ড্যাশবোর্ড খুলুন')}</button>
    </section>
  </section>

  <section class="container i-box i-notices" aria-labelledby="i-nt-t" data-filter-scope>
    <div class="i-box-head"><h2 id="i-nt-t" class="i-box-t">${t('Notices', 'নোটিশ')}</h2><a class="link" ${href(V, '02-notices')}>${t('All notices', 'সকল নোটিশ')}${icon('arrow-right', 'ico ico-sm')}</a></div>
    <div class="i-tabs" role="group" ${ta('aria-label', 'Category', 'বিভাগ')}><button type="button" data-filter="all" aria-pressed="true">${t('All', 'সব')}</button>${each(NOTICE_CATS, (c) => `<button type="button" data-filter="${c.k}" aria-pressed="false">${tt(c.l)}</button>`)}</div>
    <table class="i-table"><thead><tr><th class="num">${t('No.', 'ক্রম')}</th><th>${t('Title', 'শিরোনাম')}</th><th>${t('Category', 'বিভাগ')}</th><th>${t('Published', 'প্রকাশ')}</th><th>${t('File', 'ফাইল')}</th></tr></thead>
      <tbody>${each(NOTICES.slice(0, 8), (x, i) => `<tr data-cat="${x.cat}" data-year="2026"><td class="num">${n(i + 1)}</td><td><a ${href(V, '02-notices')}>${x.urgent ? `<em class="i-urgent">${t('Urgent', 'জরুরি')}</em> ` : ''}${tt(x.t)}</a></td><td>${catTag(x.cat)}</td><td class="nowrap">${d(x.date)}</td><td><button type="button" class="i-dl" ${toast('Download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে ডাউনলোড শুরু হবে।')}>${icon('file-down', 'ico ico-sm')}PDF</button></td></tr>`)}</tbody></table>
    <p class="i-empty" data-filter-empty hidden>${icon('inbox', 'ico')}${t('No notices in this category on the first page. Open “All notices” to search the archive.', 'প্রথম পাতায় এই বিভাগে কোনো নোটিশ নেই। আর্কাইভে খুঁজতে “সকল নোটিশ” খুলুন।')}</p>
  </section>

  <section class="container i-box" aria-labelledby="i-gal-t">
    <div class="i-box-head"><h2 id="i-gal-t" class="i-box-t">${t('Photo gallery', 'ফটো গ্যালারি')}</h2><button type="button" class="link" ${p2('Photo gallery', 'ফটো গ্যালারি')}>${t('All photos', 'সব ছবি')}${icon('arrow-right', 'ico ico-sm')}</button></div>
    <ul class="i-gal">${each(GALLERY.slice(0, 6), (g) => `<li><button type="button" data-lightbox>${img(g.f, g.c)}</button><p>${tt(g.c)}</p></li>`)}</ul>
  </section>

  <section class="container i-help" id="help" aria-labelledby="i-help-t">
    <h2 id="i-help-t" class="i-box-t">${t('Help and support', 'সহায়তা')}</h2>
    <div class="i-help-grid">
      <section class="i-box"><h3>${icon('circle-help', 'ico ico-sm')}${t('Frequently asked questions', 'সাধারণ জিজ্ঞাসা')}</h3>${each(FAQ.slice(0, 3), (f) => `<details><summary>${tt(f.q)}</summary><p>${tt(f.a)}</p></details>`)}</section>
      <section class="i-box"><h3>${icon('book-open', 'ico ico-sm')}${t('User guides', 'ব্যবহার নির্দেশিকা')}</h3><ul class="i-files">${each([['Candidate guide', 'প্রার্থী নির্দেশিকা', '1.4 MB'], ['Student portal guide', 'স্টুডেন্ট পোর্টাল নির্দেশিকা', '2.1 MB'], ['Teacher guide', 'শিক্ষক নির্দেশিকা', '1.8 MB']], ([e, b, s]) => `<li><button type="button" ${toast('Download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে ডাউনলোড শুরু হবে।')}>${icon('file-text', 'ico ico-sm')}${t(e, b)}<small>PDF · ${n(s)}</small></button></li>`)}</ul></section>
      <section class="i-box"><h3>${icon('circle-play', 'ico ico-sm')}${t('Video tutorials', 'ভিডিও টিউটোরিয়াল')}</h3><ul class="i-files">${each([['How to apply online', 'কীভাবে অনলাইনে আবেদন করবেন', '4:20'], ['Paying fees online', 'অনলাইনে ফি পরিশোধ', '3:05'], ['Taking attendance', 'হাজিরা নেওয়া', '2:40']], ([e, b, s]) => `<li><button type="button" ${p2('Video tutorials', 'ভিডিও টিউটোরিয়াল')}>${icon('circle-play', 'ico ico-sm')}${t(e, b)}<small>${n(s)}</small></button></li>`)}</ul></section>
      <section class="i-box"><h3>${icon('headset', 'ico ico-sm')}${t('Help desk', 'হেল্প ডেস্ক')}</h3><p class="i-big">${n(ORG.helpline)}</p><p>${ORG.email}</p><p class="muted">${t('Sunday–Thursday, 9:00–17:00', 'রবিবার–বৃহস্পতিবার, ৯:০০–১৭:০০')}</p></section>
    </div>
  </section>
</main>
${publicFooter()}`;
  return page({ v: V, screen: '01-landing', title: ['Home', 'হোম'], body, bodyClass: 'i-public' });
}

// ---------- 02 Notices ----------
function notices() {
  const counts = Object.fromEntries(NOTICE_CATS.map((c) => [c.k, NOTICES.filter((x) => x.cat === c.k).length]));
  const body = `
${publicHeader('notice')}
<main id="main" data-filter-scope>
  <div class="i-crumbbar"><div class="container"><nav class="i-crumb" ${ta('aria-label', 'Breadcrumb', 'অবস্থান')}><a ${href(V, '01-landing')}>${icon('house', 'ico ico-xs')}${t('Home', 'হোম')}</a>${icon('chevron-right', 'ico ico-xs')}<span aria-current="page">${t('Notice', 'নোটিশ')}</span></nav></div></div>
  <div class="container i-page">
    <aside class="i-page-side">
      <section class="i-box"><h2 class="i-box-t">${t('Categories', 'বিভাগসমূহ')}</h2>
        <ul class="i-catnav">
          <li><button type="button" data-filter="all" aria-pressed="true">${t('All notices', 'সকল নোটিশ')}<span>${n(NOTICES.length)}</span></button></li>
          <li><button type="button" data-filter="urgent" aria-pressed="false">${t('Urgent', 'জরুরি')}<span>${n(2)}</span></button></li>
          ${each(NOTICE_CATS, (c) => `<li><button type="button" data-filter="${c.k}" aria-pressed="false">${tt(c.l)}<span>${n(counts[c.k])}</span></button></li>`)}
        </ul></section>
      <section class="i-box"><h2 class="i-box-t">${t('Quick links', 'দ্রুত লিংক')}</h2>
        <ul class="i-qlinks">${each([['Admission result', 'ভর্তির ফলাফল'], ['Academic calendar', 'একাডেমিক ক্যালেন্ডার'], ['Examination routine', 'পরীক্ষার রুটিন'], ['Forms and downloads', 'ফরম ও ডাউনলোড']], (l) => `<li><button type="button" ${p2(l[0], l[1])}>${icon('chevron-right', 'ico ico-xs')}${tt(l)}</button></li>`)}</ul></section>
    </aside>
    <section class="i-page-main">
      <div class="i-title-row"><h1>${t('Notices and circulars', 'নোটিশ ও পরিপত্র')}</h1>
        <div class="i-btns"><button type="button" class="btn btn-outline btn-sm" ${p2('Notice subscription', 'নোটিশ সাবস্ক্রিপশন')}>${icon('mail-check', 'ico ico-sm')}${t('Subscribe', 'সাবস্ক্রাইব')}</button><button type="button" class="btn btn-outline btn-sm" ${toast('Print opens in the full prototype.', 'পূর্ণ প্রোটোটাইপে প্রিন্ট খুলবে।')}>${icon('file-text', 'ico ico-sm')}${t('Print list', 'তালিকা প্রিন্ট')}</button></div></div>
      <form class="i-filters" data-filter-form>
        <label class="fld"><span>${t('Keyword', 'কীওয়ার্ড')}</span><input type="search" data-filter-q ${ta('placeholder', 'Title or reference no.', 'শিরোনাম বা স্মারক নম্বর')}></label>
        <label class="fld"><span>${t('Category', 'বিভাগ')}</span><select data-filter-select>${opt('all', 'All categories', 'সব বিভাগ')}${opt('urgent', 'Urgent', 'জরুরি')}${each(NOTICE_CATS, (c) => opt(c.k, c.l[0], c.l[1]))}</select></label>
        <label class="fld"><span>${t('Year', 'বছর')}</span><select data-filter-year>${opt('all', 'All', 'সব')}${opt('2026', '2026')}${opt('2025', '2025')}</select></label>
        <label class="fld"><span>${t('Issued by', 'জারিকারী')}</span><select>${opt('all', 'All offices', 'সব দপ্তর')}${opt('ministry', 'Ministry of Textiles and Jute', 'বস্ত্র ও পাট মন্ত্রণালয়')}${opt('dept', 'Department of Textiles', 'বস্ত্র অধিদপ্তর')}</select></label>
        <button type="submit" class="btn btn-primary">${icon('search', 'ico ico-sm')}${t('Search', 'খুঁজুন')}</button>
      </form>
      <p class="i-count">${t('Showing', 'দেখানো হচ্ছে')} <b data-filter-count>${n(NOTICES.length)}</b> ${t('notices', 'টি নোটিশ')} · ${t('sorted by date, newest first', 'তারিখ অনুযায়ী, নতুন আগে')}</p>
      <div class="i-table-wrap"><table class="i-table">
        <thead><tr><th class="num">${t('No.', 'ক্রম')}</th><th>${t('Title', 'শিরোনাম')}</th><th>${t('Category', 'বিভাগ')}</th><th>${t('Issued by', 'জারিকারী')}</th><th>${t('Published', 'প্রকাশ')}</th><th>${t('File', 'ফাইল')}</th></tr></thead>
        <tbody>${each(NOTICES, (x, i) => `<tr data-cat="${x.cat}" data-year="2026" ${x.urgent ? 'data-urgent="1"' : ''} class="${x.pinned ? 'is-pinned' : ''}">
          <td class="num">${n(i + 1)}</td>
          <td><button type="button" class="i-rowlink" data-open="dlg-notice">${x.pinned ? `${icon('pin', 'ico ico-xs')}` : ''}${x.urgent ? `<em class="i-urgent">${t('Urgent', 'জরুরি')}</em> ` : ''}${tt(x.t)}</button><small>${x.id}</small></td>
          <td>${catTag(x.cat)}</td><td>${tt(AUTH[x.by])}</td><td class="nowrap">${d(x.date)}</td>
          <td><button type="button" class="i-dl" ${toast('Download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে ডাউনলোড শুরু হবে।')}>${icon('file-down', 'ico ico-sm')}PDF <small>${n(x.size)}</small></button></td></tr>`)}</tbody>
      </table></div>
      <div class="i-empty" data-filter-empty hidden>${icon('search-x', 'ico ico-lg')}<span><b>${t('No notices found.', 'কোনো নোটিশ পাওয়া যায়নি।')}</b> ${t('Change the filters and search again.', 'ফিল্টার পরিবর্তন করে আবার খুঁজুন।')}</span></div>
      <div class="i-pager"><label>${t('Rows per page', 'প্রতি পাতায়')} <select>${opt('25', '25')}${opt('50', '50')}</select></label><span>${t('Page 1 of 1', 'পাতা ১ / ১')}</span></div>
    </section>
  </div>
</main>
<dialog id="dlg-notice" class="dlg i-drawer" aria-labelledby="dlg-n-t">
  <div class="dlg-head"><div><p class="i-count">${catTag(NOTICES[0].cat)} · ${NOTICES[0].id}</p><h2 id="dlg-n-t">${tt(NOTICES[0].t)}</h2></div><button type="button" class="dlg-x" data-close ${ta('aria-label', 'Close', 'বন্ধ করুন')}>${icon('x')}</button></div>
  <div class="dlg-body">
    <dl class="i-dl-list"><div><dt>${t('Published', 'প্রকাশ')}</dt><dd>${d(NOTICES[0].date)}</dd></div><div><dt>${t('Issued by', 'জারিকারী')}</dt><dd>${tt(AUTH.dept)}</dd></div><div><dt>${t('Valid until', 'মেয়াদ')}</dt><dd>${d('20 Nov 2026')}</dd></div><div><dt>${t('Attachment', 'সংযুক্তি')}</dt><dd>PDF · ${n(NOTICES[0].size)}</dd></div></dl>
    <p>${tt(NOTICES[0].s)}</p>
    <div class="i-pdf">${icon('file-text', 'ico ico-xl')}<span>${t('PDF preview', 'পিডিএফ প্রিভিউ')}</span></div>
    <p class="proto-note">${t('Prototype: every row opens this sample. The full notice detail page is part of Phase 2.', 'প্রোটোটাইপ: প্রতিটি সারিতে এই নমুনা খুলবে। পূর্ণ নোটিশ বিস্তারিত পাতা দ্বিতীয় পর্যায়ে।')}</p>
  </div>
  <div class="dlg-foot"><button type="button" class="btn btn-outline" data-close>${t('Close', 'বন্ধ')}</button><button type="button" class="btn btn-primary" ${toast('Download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে ডাউনলোড শুরু হবে।')}>${icon('download', 'ico ico-sm')}${t('Download PDF', 'পিডিএফ ডাউনলোড')}</button></div>
</dialog>
${publicFooter()}`;
  return page({ v: V, screen: '02-notices', title: ['Notices', 'নোটিশ'], body, bodyClass: 'i-public' });
}

// ---------- 03 Login ----------
function login() {
  const err = `<span class="err" hidden>${t('Required', 'আবশ্যক')}</span>`;
  const captcha = `<div class="i-captcha"><span class="i-captcha-img" aria-hidden="true">7K4Q</span><label class="fld"><span>${t('Security code', 'নিরাপত্তা কোড')}</span><input required value="7K4Q" autocomplete="off">${err}</label></div>`;
  const body = `
${publicHeader('')}
<main id="main" class="container i-login">
  <nav class="i-crumb" ${ta('aria-label', 'Breadcrumb', 'অবস্থান')}><a ${href(V, '01-landing')}>${icon('house', 'ico ico-xs')}${t('Home', 'হোম')}</a>${icon('chevron-right', 'ico ico-xs')}<span aria-current="page">${t('Login', 'লগইন')}</span></nav>
  <div class="i-login-grid">
    <section class="i-box i-login-box" aria-labelledby="i-login-t">
      <h1 id="i-login-t" class="i-box-t">${t('Login — candidates, students and teachers', 'লগইন — প্রার্থী, শিক্ষার্থী ও শিক্ষক')}</h1>
      <div class="i-ftabs" role="tablist">
        ${each([['candidate', ['Admission candidate', 'ভর্তি প্রার্থী'], 'clipboard-list'], ['student', ['Student', 'শিক্ষার্থী'], 'graduation-cap'], ['teacher', ['Teacher', 'শিক্ষক'], 'user-round-cog']], ([k, l, ic], i) => `<button type="button" role="tab" id="it-${k}" aria-controls="ip-${k}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${icon(ic, 'ico ico-sm')}${tt(l)}</button>`)}
      </div>
      <div id="ip-candidate" role="tabpanel" aria-labelledby="it-candidate">
        <form class="i-form" data-candidate="i-cand" novalidate>
          <label class="fld"><span>${t('Application ID', 'আবেদন আইডি')} *</span><input required value="TX-26-0048213"><span class="hint">${t('Format: TX-YY-0000000', 'ফরম্যাট: TX-YY-0000000')}</span>${err}</label>
          <label class="fld"><span>${t('Date of birth', 'জন্মতারিখ')} *</span><input required type="date" value="2009-03-14">${err}</label>
          ${captcha}
          <button type="submit" class="btn btn-primary">${t('View application status', 'আবেদনের অবস্থা দেখুন')}</button>
        </form>
        <div id="i-cand" tabindex="-1" hidden>
          <table class="i-table i-table-sm i-cand-t"><caption>${t('Application TX-26-0048213 — Nusrat Jahan Ria', 'আবেদন TX-26-0048213 — নুসরাত জাহান রিয়া')}</caption><tbody>
            <tr><th>${t('Application', 'আবেদন')}</th><td>${st('submitted')}</td></tr>
            <tr><th>${t('Application fee', 'আবেদন ফি')}</th><td><span class="tag tag-ok">${t('Paid', 'পরিশোধিত')}</span></td></tr>
            <tr><th>${t('Entrance test', 'ভর্তি পরীক্ষা')}</th><td>${t('Passed · 71/100 · merit 1,284', 'উত্তীর্ণ · ৭১/১০০ · মেধাক্রম ১,২৮৪')}</td></tr>
            <tr><th>${t('Allocated institution', 'বরাদ্দকৃত প্রতিষ্ঠান')}</th><td>Karnaphuli Textile Institute</td></tr>
            <tr><th>${t('Final admission', 'চূড়ান্ত ভর্তি')}</th><td><span class="tag tag-warn">${t('Incomplete — due 20 Nov', 'অসম্পূর্ণ — শেষ তারিখ ২০ নভেম্বর')}</span></td></tr>
            <tr><th>${t('Missing', 'বাকি')}</th><td>${t('Admission fee ৳ 4,250 · SSC certificate (PDF)', 'ভর্তি ফি ৳ ৪,২৫০ · এসএসসি সনদ (পিডিএফ)')}</td></tr>
          </tbody></table>
          <div class="i-btns"><button type="button" class="btn btn-teal btn-sm" ${p2('Admission payment', 'ভর্তি ফি পরিশোধ')}>${t('Pay admission fee', 'ভর্তি ফি দিন')}</button><button type="button" class="btn btn-outline btn-sm" ${p2('Upload documents', 'কাগজপত্র আপলোড')}>${t('Upload documents', 'কাগজ আপলোড')}</button></div>
          <p class="proto-note">${t('After admission the candidate record converts to a student record (new student ID).', 'ভর্তির পর প্রার্থীর রেকর্ড শিক্ষার্থীর রেকর্ডে রূপান্তরিত হয় (নতুন শিক্ষার্থী আইডি)।')}</p>
        </div>
      </div>
      <div id="ip-student" role="tabpanel" aria-labelledby="it-student" hidden>
        <form class="i-form" data-demo-login data-go="${file(V, '07-student-dashboard')}" novalidate>
          <label class="fld"><span>${t('Student ID', 'শিক্ষার্থী আইডি')} *</span><input required value="KTI-2024-2401">${err}</label>
          <label class="fld"><span>${t('Password', 'পাসওয়ার্ড')} *</span><input required type="password" value="demo-pass">${err}</label>
          ${captcha}
          <button type="submit" class="btn btn-primary">${t('Login', 'লগইন')}</button>
          <button type="button" class="link" ${p2('Reset password', 'পাসওয়ার্ড রিসেট')}>${t('Forgot password?', 'পাসওয়ার্ড ভুলে গেছেন?')}</button>
        </form>
      </div>
      <div id="ip-teacher" role="tabpanel" aria-labelledby="it-teacher" hidden>
        <form class="i-form" data-demo-login data-go="${file(V, '06-teacher-dashboard')}" novalidate>
          <label class="fld"><span>${t('Teacher ID / email', 'শিক্ষক আইডি / ইমেইল')} *</span><input required value="arif.hossain@kti.edu.bd">${err}</label>
          <label class="fld"><span>${t('Password', 'পাসওয়ার্ড')} *</span><input required type="password" value="demo-pass">${err}</label>
          ${captcha}
          <button type="submit" class="btn btn-primary">${t('Login', 'লগইন')}</button>
          <button type="button" class="link" ${p2('Reset password', 'পাসওয়ার্ড রিসেট')}>${t('Forgot password?', 'পাসওয়ার্ড ভুলে গেছেন?')}</button>
        </form>
      </div>
      <p class="proto-note">${t('Prototype: fields are pre-filled. * required.', 'প্রোটোটাইপ: ঘরগুলো পূরণ করা আছে। * আবশ্যক।')}</p>
    </section>
    <div class="i-login-side">
      <section class="i-box" aria-labelledby="i-port-t">
        <h2 id="i-port-t" class="i-box-t">${icon('landmark', 'ico ico-sm')}${t('Officials’ portals', 'কর্মকর্তাদের পোর্টাল')}</h2>
        <p class="muted">${t('Ministry, division, district and institution officials sign in at their own address, not on this page.', 'মন্ত্রণালয়, বিভাগ, জেলা ও প্রতিষ্ঠানের কর্মকর্তারা নিজস্ব ঠিকানায় লগইন করেন, এই পাতায় নয়।')}</p>
        <table class="i-table i-table-sm"><thead><tr><th>${t('Portal', 'পোর্টাল')}</th><th>${t('Address', 'ঠিকানা')}</th><th><span class="sr-only">${t('Open', 'খুলুন')}</span></th></tr></thead>
          <tbody>${each(PORTALS, (p) => `<tr><td><b>${tt(p.l)}</b><small>${tt(p.who)}</small></td><td><code>${p.dom}</code></td><td><button type="button" class="btn btn-outline btn-sm" data-portal="${p.k}">${t('Open', 'খুলুন')}</button></td></tr>`)}</tbody></table>
      </section>
      <section class="i-box"><h2 class="i-box-t">${t('Instructions', 'নির্দেশনা')}</h2>
        <ol class="i-steps"><li>${t('Candidates use the application ID received by SMS.', 'প্রার্থীরা এসএমএসে পাওয়া আবেদন আইডি ব্যবহার করবেন।')}</li><li>${t('Students use the ID issued by their institution.', 'শিক্ষার্থীরা প্রতিষ্ঠান থেকে দেওয়া আইডি ব্যবহার করবেন।')}</li><li>${t('After 5 wrong attempts the account is locked for 30 minutes.', '৫ বার ভুল চেষ্টায় অ্যাকাউন্ট ৩০ মিনিটের জন্য বন্ধ থাকবে।')}</li><li>${t('Help desk', 'হেল্প ডেস্ক')}: ${n(ORG.helpline)}</li></ol></section>
    </div>
  </div>
</main>
${publicFooter()}`;
  return page({ v: V, screen: '03-login', title: ['Login', 'লগইন'], body, bodyClass: 'i-public' });
}

// ---------- internal shell ----------
const MENU = {
  ministry: [
    ['layout-dashboard', ['Overview', 'সারসংক্ষেপ'], []],
    ['building-2', ['Institutions', 'প্রতিষ্ঠান'], [['Directory', 'ডিরেক্টরি'], ['Categories', 'ধরন'], ['Division / District', 'বিভাগ / জেলা']]],
    ['radio-tower', ['Operations', 'কার্যক্রম'], [['Admissions', 'ভর্তি'], ['Attendance', 'হাজিরা'], ['Budget', 'বাজেট'], ['Assets', 'সম্পদ']]],
    ['inbox', ['Approvals', 'অনুমোদন'], [], 31],
    ['chart-column', ['Reports', 'প্রতিবেদন'], [['Institution reports', 'প্রতিষ্ঠান প্রতিবেদন'], ['Consolidated', 'সমন্বিত']]],
    ['settings-2', ['Administration', 'প্রশাসন'], [['Users & roles', 'ব্যবহারকারী ও ভূমিকা'], ['License administration', 'লাইসেন্স প্রশাসন'], ['Notices', 'নোটিশ']]],
  ],
  principal: [
    ['layout-dashboard', ['Overview', 'সারসংক্ষেপ'], []],
    ['book-open', ['Academics', 'একাডেমিক'], [['Classes', 'ক্লাস'], ['Attendance', 'হাজিরা'], ['Results', 'ফলাফল']]],
    ['users', ['People', 'জনবল'], [['Teachers', 'শিক্ষক'], ['Students', 'শিক্ষার্থী'], ['Alumni', 'প্রাক্তন শিক্ষার্থী']]],
    ['inbox', ['Services & Approvals', 'সেবা ও অনুমোদন'], [['Student requests', 'শিক্ষার্থী আবেদন'], ['Leave', 'ছুটি'], ['Certificates', 'সনদ']], 14],
    ['boxes', ['Resources', 'সম্পদ'], [['Finance', 'অর্থ'], ['Assets', 'সম্পদ'], ['Procurement', 'ক্রয়'], ['Library', 'লাইব্রেরি']]],
    ['chart-column', ['Reports', 'প্রতিবেদন'], []],
  ],
  teacher: [
    ['house', ['Home', 'হোম'], []], ['layers', ['My Classes', 'আমার ক্লাস'], [['Materials', 'উপকরণ'], ['Students', 'শিক্ষার্থী']]],
    ['user-check', ['Attendance', 'হাজিরা'], []], ['clipboard-check', ['Results', 'ফলাফল'], []], ['life-buoy', ['Services', 'সেবা'], [['Leave', 'ছুটি'], ['Library', 'লাইব্রেরি'], ['Profile', 'প্রোফাইল']]],
  ],
  student: [
    ['house', ['Home', 'হোম'], []], ['book-open', ['Academics', 'একাডেমিক'], [['Classes & content', 'ক্লাস ও কনটেন্ট'], ['Academic calendar', 'একাডেমিক ক্যালেন্ডার'], ['Advising', 'অ্যাডভাইজিং'], ['Teaching evaluation', 'শিক্ষক মূল্যায়ন']]],
    ['chart-column', ['Results & Attendance', 'ফলাফল ও উপস্থিতি'], [['Grade table', 'গ্রেড টেবিল'], ['Attendance', 'উপস্থিতি']]],
    ['file-text', ['Services', 'সেবা'], [['Online applications', 'অনলাইন আবেদন'], ['Payments', 'পরিশোধ'], ['Student ledger', 'শিক্ষার্থী লেজার']], 2],
    ['user', ['Profile', 'প্রোফাইল'], []],
  ],
};
const PORTAL = { ministry: ['Ministry portal', 'মন্ত্রণালয় পোর্টাল'], principal: ['Institution portal', 'প্রতিষ্ঠান পোর্টাল'], teacher: ['Teacher workspace', 'শিক্ষক ওয়ার্কস্পেস'], student: ['Student portal', 'স্টুডেন্ট পোর্টাল'] };
function appShell({ role, user, scope, crumbs, title, actions = '', content }) {
  const menu = each(MENU[role], ([ic, l, subs, c], i) => {
    if (i === 0) return `<li><a href="#main" aria-current="page">${icon(ic, 'ico ico-sm')}${tt(l)}</a></li>`;
    if (!subs.length) return `<li><button type="button" ${p2(l[0], l[1])}>${icon(ic, 'ico ico-sm')}${tt(l)}${c ? `<span class="i-badge">${n(c)}</span>` : ''}</button></li>`;
    return `<li><details><summary>${icon(ic, 'ico ico-sm')}${tt(l)}${c ? `<span class="i-badge">${n(c)}</span>` : ''}${icon('chevron-down', 'ico ico-xs i-chev')}</summary>
      <ul>${each(subs, (s) => `<li><button type="button" ${p2(s[0], s[1])}>${tt(s)}</button></li>`)}</ul></details></li>`;
  });
  return `
<header class="i-bar">
  <button type="button" class="i-bar-btn i-side-btn" data-menu="i-side" aria-expanded="false" ${ta('aria-label', 'Menu', 'মেনু')}>${icon('menu')}</button>
  <a class="i-bar-brand" href="#main">${mark()}<span><b>${tt(ORG.short)}</b><small>${tt(PORTAL[role])}</small></span></a>
  <form class="i-bar-search" role="search" data-search-demo="Search opens in the full prototype.|অনুসন্ধান পূর্ণ প্রোটোটাইপে খুলবে।">${icon('search', 'ico ico-sm')}<label class="sr-only" for="ibs">${t('Search', 'অনুসন্ধান')}</label><input id="ibs" type="search" ${ta('placeholder', 'Search by ID, name or reference…', 'আইডি, নাম বা স্মারক দিয়ে খুঁজুন…')}></form>
  <div class="i-bar-tools">
    <button type="button" class="i-bar-btn i-bar-lang" data-toggle-lang><span class="l-en" lang="bn">বাংলা</span><span class="l-bn" lang="en">EN</span></button>
    <button type="button" class="i-bar-btn" ${p2('Help', 'সহায়তা')} ${ta('aria-label', 'Help', 'সহায়তা')}>${icon('circle-help')}</button>
    <button type="button" class="i-bar-btn" ${p2('Notifications', 'নোটিফিকেশন')} ${ta('aria-label', 'Notifications, 3 new', 'নোটিফিকেশন, ৩টি নতুন')}>${icon('bell')}<span class="i-dot">${n(3)}</span></button>
    <span class="i-bar-user"><span class="i-av">${user.initials}</span><span class="i-hide-md"><b>${user.name}</b><small>${tt(user.role)}</small></span></span>
    <a class="i-bar-btn" ${href(V, '01-landing')} ${ta('aria-label', 'Sign out', 'লগআউট')} ${ta('title', 'Sign out', 'লগআউট')}>${icon('log-out')}</a>
  </div>
</header>
<div class="i-shell">
  <aside class="i-side" id="i-side" ${ta('aria-label', 'Menu', 'মেনু')}>
    <div class="i-side-scope"><small>${t('Scope', 'পরিধি')}</small><b>${tt(scope)}</b></div>
    <nav><ul class="i-menu-list">${menu}</ul></nav>
    <p class="i-side-foot">${t('Prototype · Phase 1', 'প্রোটোটাইপ · প্রথম পর্যায়')}</p>
  </aside>
  <main id="main" class="i-work">
    <nav class="i-crumb" ${ta('aria-label', 'Breadcrumb', 'অবস্থান')}>${crumbs.map((c, i) => (i < crumbs.length - 1 ? `<span>${tt(c)}</span>${icon('chevron-right', 'ico ico-xs')}` : `<span aria-current="page">${tt(c)}</span>`)).join('')}</nav>
    <div class="i-title-row"><h1>${title}</h1><div class="i-btns">${actions}</div></div>
    ${content}
  </main>
</div>`;
}
const kpis = (list) => `<ul class="i-kpis">${each(list, (k) => `<li class="${k.tone ? `is-${k.tone}` : ''}"><span>${tt(k.l)}</span><b class="tnum">${n(k.v)}</b><small>${tt(k.s)}</small></li>`)}</ul>`;
const box = (title, inner, extra = '', cls = '') => `<section class="i-box ${cls}"><div class="i-box-head"><h2 class="i-box-t">${title}</h2>${extra}</div>${inner}</section>`;
const nlist = (list) => `<ul class="i-nl">${each(list, (x) => `<li><a ${href(V, '02-notices')}>${tt(x.t)}</a><small>${d(x.date)} · ${tt(catLabel(x.cat))}</small></li>`)}</ul>`;
const actBtns = () => `<span class="i-acts"><button type="button" class="btn btn-teal btn-sm" data-row-action="approve">${t('Approve', 'অনুমোদন')}</button><button type="button" class="btn btn-outline btn-sm" data-row-action="return">${t('Return', 'ফেরত')}</button></span>`;

// ---------- 04 Ministry ----------
function ministry() {
  const content = `
<form class="i-filterbar" data-search-demo="Filters apply in the full prototype.|পূর্ণ প্রোটোটাইপে ফিল্টার কাজ করবে।">
  <label>${t('Division', 'বিভাগ')}<select>${opt('all', 'All divisions', 'সব বিভাগ')}${each(DIVISIONS, (v) => opt(v.id, v.n[0], v.n[1]))}</select></label>
  <label>${t('District', 'জেলা')}<select>${opt('all', 'All districts', 'সব জেলা')}</select></label>
  <label>${t('Institution type', 'প্রতিষ্ঠানের ধরন')}<select>${opt('all', 'All types', 'সব ধরন')}</select></label>
  <label>${t('Date', 'তারিখ')}<select>${opt('today', 'Today', 'আজ')}${opt('7', 'Last 7 days', 'গত ৭ দিন')}${opt('30', 'Last 30 days', 'গত ৩০ দিন')}</select></label>
  <button type="submit" class="btn btn-primary btn-sm">${t('Apply', 'প্রয়োগ')}</button>
</form>
${kpis([...MIN.kpis.slice(0, 4).map((k) => ({ ...k, tone: k.tone === 'warn' ? 'warn' : '' })), { v: '8', l: ['Open exceptions', 'চলমান ব্যতিক্রম'], s: ['2 critical', '২টি গুরুতর'], tone: 'danger' }, MIN.kpis[4]])}
<div class="i-cols">
  <div class="i-col-main">
    <section class="i-box" aria-labelledby="i-q-t" data-bulk>
      <div class="i-box-head"><h2 id="i-q-t" class="i-box-t">${t('Work queue', 'কাজের তালিকা')}</h2><span class="muted i-small">${t('Live · 09:30', 'সরাসরি · ০৯:৩০')}</span></div>
      <div class="i-tabs" role="tablist">
        <button type="button" role="tab" id="q1" aria-controls="qp1" aria-selected="true">${t('Pending approvals', 'অপেক্ষমাণ অনুমোদন')} <span class="i-badge" data-count data-live-num="31">${n(31)}</span></button>
        <button type="button" role="tab" id="q2" aria-controls="qp2" aria-selected="false" tabindex="-1">${t('Exceptions', 'ব্যতিক্রম')} <span class="i-badge is-danger">${n(8)}</span></button>
        <button type="button" role="tab" id="q3" aria-controls="qp3" aria-selected="false" tabindex="-1">${t('Escalated to Ministry', 'মন্ত্রণালয়ে উত্থাপিত')} <span class="i-badge">${n(3)}</span></button>
      </div>
      <div id="qp1" role="tabpanel" aria-labelledby="q1">
        <div class="i-bulkbar" data-bulk-bar hidden><b data-bulk-count>0</b> ${t('selected', 'নির্বাচিত')}<button type="button" class="btn btn-teal btn-sm" ${toast('Bulk approval is confirmed in the full prototype.', 'পূর্ণ প্রোটোটাইপে একসাথে অনুমোদন নিশ্চিত হবে।')}>${t('Approve selected', 'নির্বাচিতগুলো অনুমোদন')}</button></div>
        <div class="i-table-wrap"><table class="i-table">
          <thead><tr><th class="chk"><input type="checkbox" data-check-all ${ta('aria-label', 'Select all', 'সব নির্বাচন')}></th><th>${t('Ref.', 'স্মারক')}</th><th>${t('Request', 'অনুরোধ')}</th><th>${t('Area', 'এলাকা')}</th><th>${t('From', 'প্রেরক')}</th><th class="num">${t('Days', 'দিন')}</th><th>${t('Status', 'অবস্থা')}</th><th>${t('Action', 'কাজ')}</th></tr></thead>
          <tbody>${each(MIN.approvals, (a) => `<tr data-row="${a.ref}"><td class="chk"><input type="checkbox" data-check aria-label="${a.ref}"></td><td class="nowrap mono">${a.ref}</td><td><b>${tt(a.t)}</b><small>${tt(a.type)}</small></td><td>${tt(a.where)}</td><td>${tt(a.from)}</td>
            <td class="num ${a.overdue ? 'i-red' : ''}">${n(a.age)}/${n(a.sla)}</td><td data-row-status>${a.overdue ? `<span class="tag tag-danger">${t('Overdue', 'মেয়াদোত্তীর্ণ')}</span>` : `<span class="tag tag-info">${t('Pending', 'অপেক্ষমাণ')}</span>`}</td><td>${actBtns()}</td></tr>`)}</tbody>
        </table></div>
        <div class="i-tfoot"><span>${t('Showing 4 of 31', '৩১টির ৪টি দেখানো হচ্ছে')}</span><button type="button" class="link" ${p2('Approvals', 'অনুমোদন')}>${t('Open approvals', 'অনুমোদন খুলুন')}${icon('arrow-right', 'ico ico-sm')}</button></div>
      </div>
      <div id="qp2" role="tabpanel" aria-labelledby="q2" hidden>
        <div class="i-table-wrap"><table class="i-table"><thead><tr><th>${t('Type', 'ধরন')}</th><th>${t('Issue', 'সমস্যা')}</th><th>${t('Institution', 'প্রতিষ্ঠান')}</th><th class="num">${t('Value', 'মান')}</th><th>${t('Open for', 'চলছে')}</th><th>${t('Action', 'কাজ')}</th></tr></thead>
          <tbody>${each(MIN.exceptions, (x) => `<tr><td><span class="tag tag-${x.sev === 'danger' ? 'danger' : 'warn'}">${tt(x.type)}</span></td><td>${tt(x.t)}</td><td>${tt(x.where)}</td><td class="num"><b>${n(x.v)}</b></td><td>${tt(x.age)}</td><td><button type="button" class="btn btn-outline btn-sm" ${p2('Institution 360°', 'প্রতিষ্ঠান ৩৬০°')}>${t('View', 'দেখুন')}</button></td></tr>`)}</tbody></table></div>
      </div>
      <div id="qp3" role="tabpanel" aria-labelledby="q3" hidden>
        <div class="i-table-wrap"><table class="i-table"><thead><tr><th>${t('Ref.', 'স্মারক')}</th><th>${t('Issue', 'বিষয়')}</th><th>${t('Escalated by', 'উত্থাপনকারী')}</th><th>${t('Since', 'যখন থেকে')}</th></tr></thead>
          <tbody>
            <tr><td class="mono">ES-2026-014</td><td>${t('Asset write-off above district limit (৳ 6.2 lakh)', 'জেলা সীমার বেশি সম্পদ অবলোপন (৳ ৬.২ লাখ)')}</td><td>${t('Khulna Division', 'খুলনা বিভাগ')}</td><td>${d('09 Oct 2026')}</td></tr>
            <tr><td class="mono">ES-2026-012</td><td>${t('Teacher shortage: 3 posts vacant over 90 days', 'শিক্ষক সংকট: ৯০ দিনের বেশি ৩টি পদ শূন্য')}</td><td>${t('Sylhet Division', 'সিলেট বিভাগ')}</td><td>${d('02 Oct 2026')}</td></tr>
            <tr><td class="mono">ES-2026-011</td><td>${t('Repeated late attendance submission', 'বারবার দেরিতে হাজিরা জমা')}</td><td>${t('Noakhali District', 'নোয়াখালী জেলা')}</td><td>${d('30 Sep 2026')}</td></tr>
          </tbody></table></div>
      </div>
    </section>

    ${box(t('Division summary — today', 'বিভাগ সারসংক্ষেপ — আজ'), `<div class="i-table-wrap"><table class="i-table i-tree">
      <thead><tr><th>${t('Division / District', 'বিভাগ / জেলা')}</th><th class="num">${t('Institutions', 'প্রতিষ্ঠান')}</th><th class="num">${t('Students', 'শিক্ষার্থী')}</th><th>${t('Student attendance', 'শিক্ষার্থী উপস্থিতি')}</th><th class="num">${t('Reported', 'রিপোর্ট')}</th><th class="num">${t('Alerts', 'সতর্কতা')}</th></tr></thead>
      <tbody>${each(DIVISIONS, (v) => `<tr class="lvl-1">
          <td>${v.districts ? `<button type="button" class="i-tree-btn" data-expand="dd-${v.id}" aria-expanded="false">${icon('chevron-right', 'ico ico-xs')}${tt(v.n)}</button>` : `<button type="button" class="i-tree-btn" ${p2(`${v.n[0]} Division`, `${v.n[1]} বিভাগ`)}>${icon('chevron-right', 'ico ico-xs')}${tt(v.n)}</button>`}</td>
          <td class="num">${n(v.inst)}</td><td class="num">${n(v.students)}</td><td><span class="i-attbar"><span class="bar ${v.att < 80 ? 'danger' : ''}"><i style="width:${v.att}%"></i></span><span class="${v.att < 80 ? 'i-red' : ''}">${n(v.att.toFixed(1) + '%')}</span></span></td>
          <td class="num">${n(v.rep)}</td><td class="num">${v.alerts ? `<span class="i-badge is-warn">${n(v.alerts)}</span>` : '—'}</td></tr>
          ${v.districts ? `<tr id="dd-${v.id}" hidden data-expand-group="dd-${v.id}"><td colspan="6" class="i-sub-hd">${t('Districts of', 'জেলাসমূহ:')} ${tt(v.n)}</td></tr>${each(v.districts, (x) => `<tr class="lvl-2" hidden data-expand-group="dd-${v.id}"><td><button type="button" class="i-tree-btn" ${p2(`${x.n[0]} District`, `${x.n[1]} জেলা`)}>${tt(x.n)}</button></td><td class="num">${n(x.inst)}</td><td class="num">—</td><td><span class="${x.att < 80 ? 'i-red' : ''}">${n(x.att.toFixed(1) + '%')}</span></td><td class="num ${x.rep !== `${x.inst}/${x.inst}` ? 'i-red' : ''}">${n(x.rep)}</td><td class="num">${x.alerts ? `<span class="i-badge is-warn">${n(x.alerts)}</span>` : '—'}</td></tr>`)}` : ''}`)}</tbody>
      <tfoot><tr><th>${t('Bangladesh', 'বাংলাদেশ')}</th><th class="num">${n(59)}</th><th class="num">${n('38,420')}</th><th>${n('85.1%')}</th><th class="num">${n('57/59')}</th><th class="num">${n(7)}</th></tr></tfoot></table></div>`,
    `<button type="button" class="btn btn-outline btn-sm" ${toast('Export starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে এক্সপোর্ট শুরু হবে।')}>${icon('download', 'ico ico-sm')}${t('Excel', 'এক্সেল')}</button>`)}
  </div>
  <div class="i-col-side">
    ${box(t('Admission 2026–27', 'ভর্তি ২০২৬–২৭'), `<table class="i-table i-table-sm"><tbody>${each(MIN.funnel, (f) => `<tr><th>${tt(f.l)}</th><td class="num">${n(f.v.toLocaleString('en-US'))}</td></tr>`)}<tr><th>${t('Result publication', 'ফল প্রকাশ')}</th><td class="num">${d('30 Oct')}</td></tr></tbody></table>`)}
    ${box(t('Notices', 'নোটিশ'), nlist(NOTICES.slice(0, 4)), `<button type="button" class="btn btn-outline btn-sm" ${p2('Publish a notice', 'নোটিশ প্রকাশ')}>${icon('megaphone', 'ico ico-sm')}${t('New', 'নতুন')}</button>`)}
    ${box(t('Reports', 'প্রতিবেদন'), `<ul class="i-files">${each(MIN.reports, (r) => `<li><button type="button" ${toast('Report download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে প্রতিবেদন ডাউনলোড হবে।')}>${icon(r.icon, 'ico ico-sm')}${tt(r.l)}<small>${tt(r.s)}</small></button></li>`)}</ul>`)}
  </div>
</div>`;
  const body = appShell({ role: 'ministry', user: MIN.user, scope: ['All Bangladesh', 'সমগ্র বাংলাদেশ'], crumbs: [['Ministry', 'মন্ত্রণালয়'], ['Overview', 'সারসংক্ষেপ']],
    title: t('Overview — all institutions', 'সারসংক্ষেপ — সকল প্রতিষ্ঠান'), actions: `<button type="button" class="btn btn-outline btn-sm" ${p2('Customise dashboard', 'ড্যাশবোর্ড কাস্টমাইজ')}>${icon('settings-2', 'ico ico-sm')}${t('Widgets', 'উইজেট')}</button><button type="button" class="btn btn-primary btn-sm" ${p2('Reports', 'প্রতিবেদন')}>${icon('file-down', 'ico ico-sm')}${t('Export report', 'প্রতিবেদন এক্সপোর্ট')}</button>`, content });
  return page({ v: V, screen: '04-ministry-dashboard', title: ['Ministry dashboard', 'মন্ত্রণালয় ড্যাশবোর্ড'], body, bodyClass: 'i-app' });
}

// ---------- 05 Principal ----------
function principal() {
  const content = `
${kpis([...PRIN.kpis, { v: '1', l: ['Results to publish', 'প্রকাশযোগ্য ফলাফল'], s: ['Semester 3 · validated', 'সেমিস্টার ৩ · যাচাইকৃত'] }])}
<p class="i-alert is-danger">${icon('triangle-alert', 'ico ico-sm')}<span><b>${t('Attendance below threshold:', 'উপস্থিতি সীমার নিচে:')}</b> ${t('72.4% today (threshold 80%). Diploma Y2 · Sec A has not submitted attendance.', 'আজ ৭২.৪% (সীমা ৮০%)। ডিপ্লোমা ২য় বর্ষ · সেকশন এ হাজিরা জমা দেয়নি।')}</span><button type="button" class="btn btn-outline btn-sm" ${toast('Reminder sent to Tahmina Akter.', 'তাহমিনা আক্তারকে রিমাইন্ডার পাঠানো হয়েছে।')}>${t('Send reminder', 'রিমাইন্ডার পাঠান')}</button></p>
<div class="i-cols">
  <div class="i-col-main">
    <section class="i-box" data-bulk aria-labelledby="pq-t">
      <div class="i-box-head"><h2 id="pq-t" class="i-box-t">${t('Requests and approvals', 'আবেদন ও অনুমোদন')}</h2></div>
      <div class="i-tabs" role="tablist">
        <button type="button" role="tab" id="pt1" aria-controls="pp1" aria-selected="true">${t('Waiting for me', 'আমার অপেক্ষায়')} <span class="i-badge" data-count data-live-num="14">${n(14)}</span></button>
        <button type="button" role="tab" id="pt2" aria-controls="pp2" aria-selected="false" tabindex="-1">${t('With other offices', 'অন্য দপ্তরে')} <span class="i-badge">${n(2)}</span></button>
        <button type="button" role="tab" id="pt3" aria-controls="pp3" aria-selected="false" tabindex="-1">${t('Returned', 'ফেরত')} <span class="i-badge">${n(0)}</span></button>
      </div>
      <div id="pp1" role="tabpanel" aria-labelledby="pt1">
        <div class="i-bulkbar" data-bulk-bar hidden><b data-bulk-count>0</b> ${t('selected', 'নির্বাচিত')}<button type="button" class="btn btn-teal btn-sm" ${toast('Bulk approval is confirmed in the full prototype.', 'পূর্ণ প্রোটোটাইপে একসাথে অনুমোদন নিশ্চিত হবে।')}>${t('Approve selected', 'নির্বাচিতগুলো অনুমোদন')}</button></div>
        <div class="i-table-wrap"><table class="i-table">
          <thead><tr><th class="chk"><input type="checkbox" data-check-all ${ta('aria-label', 'Select all', 'সব নির্বাচন')}></th><th>${t('Ref.', 'স্মারক')}</th><th>${t('Request', 'অনুরোধ')}</th><th>${t('Applicant', 'আবেদনকারী')}</th><th class="num">${t('Days / SLA', 'দিন / সীমা')}</th><th>${t('Status', 'অবস্থা')}</th><th>${t('Action', 'কাজ')}</th></tr></thead>
          <tbody>${each(PRIN.approvals, (a) => `<tr data-row="${a.ref}"><td class="chk"><input type="checkbox" data-check aria-label="${a.ref}"></td><td class="mono nowrap">${a.ref}</td><td>${tt(a.type)}</td><td><b>${a.who}</b><small>${tt(a.meta)}</small></td><td class="num ${a.overdue ? 'i-red' : ''}">${n(a.age)} / ${n(a.sla)}</td><td data-row-status>${a.overdue ? `<span class="tag tag-danger">${t('Overdue', 'মেয়াদোত্তীর্ণ')}</span>` : `<span class="tag tag-info">${t('Under review', 'পর্যালোচনাধীন')}</span>`}</td><td>${actBtns()}</td></tr>`)}</tbody>
        </table></div>
        <div class="i-tfoot"><span>${t('Showing 4 of 14', '১৪টির ৪টি দেখানো হচ্ছে')}</span><button type="button" class="link" ${p2('Student requests', 'শিক্ষার্থী আবেদন')}>${t('All requests', 'সব আবেদন')}${icon('arrow-right', 'ico ico-sm')}</button></div>
      </div>
      <div id="pp2" role="tabpanel" aria-labelledby="pt2" hidden>
        <table class="i-table"><thead><tr><th>${t('Item', 'বিষয়')}</th><th>${t('Waiting for', 'যার অপেক্ষায়')}</th><th>${t('Since', 'যখন থেকে')}</th></tr></thead><tbody>${each(PRIN.elsewhere, (x) => `<tr><td>${tt(x.t)}</td><td><span class="tag tag-info">${tt(x.who)}</span></td><td>${tt(x.age)}</td></tr>`)}</tbody></table>
      </div>
      <div id="pp3" role="tabpanel" aria-labelledby="pt3" hidden><p class="i-empty">${icon('inbox', 'ico')}${t('No requests are waiting for correction by applicants.', 'আবেদনকারীর সংশোধনের অপেক্ষায় কোনো আবেদন নেই।')}</p></div>
    </section>
    ${box(t('Class attendance — today', 'ক্লাস হাজিরা — আজ'), `<div class="i-table-wrap"><table class="i-table"><thead><tr><th>${t('Class', 'ক্লাস')}</th><th>${t('Teacher', 'শিক্ষক')}</th><th class="num">${t('Present', 'উপস্থিত')}</th><th>${t('Rate', 'হার')}</th><th>${t('Register', 'রেজিস্টার')}</th></tr></thead>
      <tbody>${each(PRIN.classes, (c) => `<tr><td>${tt(c.c)}</td><td>${c.teacher}</td><td class="num">${c.p !== null ? n(c.p + '/' + c.t) : '—'}</td><td>${c.p !== null ? `<span class="i-attbar"><span class="bar ${c.p / c.t < 0.8 ? 'danger' : ''}"><i style="width:${(c.p / c.t) * 100}%"></i></span><span class="${c.p / c.t < 0.8 ? 'i-red' : ''}">${n(Math.round((c.p / c.t) * 100) + '%')}</span></span>` : '—'}</td><td>${c.st === 'done' ? st('submitted') : c.st === 'missing' ? st('missing') : st('due')}</td></tr>`)}</tbody></table></div>`,
    `<button type="button" class="btn btn-outline btn-sm" ${p2('Attendance', 'হাজিরা')}>${t('Full register', 'সম্পূর্ণ রেজিস্টার')}</button>`)}
  </div>
  <div class="i-col-side">
    ${box(t('Quick actions', 'দ্রুত কাজ'), `<ul class="i-quick">${each(PRIN.quick, (q) => `<li><button type="button" ${p2(q.l[0], q.l[1])}>${icon(q.icon, 'ico ico-sm')}${tt(q.l)}</button></li>`)}</ul>`)}
    ${box(t('Notices', 'নোটিশ'), nlist([NOTICES[5], NOTICES[4], NOTICES[6]]))}
    ${box(t('Institution', 'প্রতিষ্ঠান'), `<table class="i-table i-table-sm"><tbody><tr><th>${t('Code', 'কোড')}</th><td class="mono">${PRIN.inst.code}</td></tr><tr><th>${t('Type', 'ধরন')}</th><td>${t('Textile Institute', 'টেক্সটাইল ইনস্টিটিউট')}</td></tr><tr><th>${t('District', 'জেলা')}</th><td>${t('Chattogram', 'চট্টগ্রাম')}</td></tr><tr><th>${t('Budget used', 'বাজেট ব্যবহার')}</th><td>${n('64%')}</td></tr><tr><th>${t('Asset issues', 'সম্পদ সমস্যা')}</th><td><span class="i-badge is-warn">${n(3)}</span></td></tr></tbody></table>`)}
  </div>
</div>`;
  const body = appShell({ role: 'principal', user: PRIN.user, scope: PRIN.inst.n, crumbs: [['Institution', 'প্রতিষ্ঠান'], ['Overview', 'সারসংক্ষেপ']],
    title: `${tt(PRIN.inst.n)} <small class="i-code">${PRIN.inst.code}</small>`, actions: `<button type="button" class="btn btn-outline btn-sm" ${p2('Post a notice', 'নোটিশ দিন')}>${icon('megaphone', 'ico ico-sm')}${t('Post notice', 'নোটিশ দিন')}</button><button type="button" class="btn btn-primary btn-sm" ${p2('Publish result', 'ফল প্রকাশ')}>${icon('clipboard-check', 'ico ico-sm')}${t('Publish Sem 3 result', 'সেম ৩ ফল প্রকাশ')}</button>`, content });
  return page({ v: V, screen: '05-principal-dashboard', title: ['Principal dashboard', 'অধ্যক্ষ ড্যাশবোর্ড'], body, bodyClass: 'i-app' });
}

// ---------- 06 Teacher ----------
function teacher() {
  const now = TEACH.classes[1];
  const content = `
${kpis([
    { v: '3', l: ['Classes today', 'আজকের ক্লাস'], s: ['1 done · 1 now · 1 later', '১টি শেষ · ১টি চলছে · ১টি পরে'] },
    { v: '1', l: ['Attendance due', 'হাজিরা বাকি'], s: ['Diploma Y2 · Sec B', 'ডিপ্লোমা ২য় বর্ষ · সেকশন বি'], tone: 'warn' },
    { v: '2', l: ['Result tasks', 'ফলাফলের কাজ'], s: ['1 returned for correction', '১টি সংশোধনের জন্য ফেরত'], tone: 'warn' },
    { v: '1', l: ['Materials to upload', 'আপলোডের উপকরণ'], s: ['Week 7 · Weaving I', 'সপ্তাহ ৭ · উইভিং ১'] },
    { v: '6', l: ['Casual leave left', 'অবশিষ্ট নৈমিত্তিক ছুটি'], s: ['of 10 days', '১০ দিনের মধ্যে'] },
  ])}
<div class="i-cols">
  <div class="i-col-main">
    ${box(t('Today’s classes', 'আজকের ক্লাস'), `<div class="i-table-wrap"><table class="i-table"><thead><tr><th>${t('Time', 'সময়')}</th><th>${t('Class', 'ক্লাস')}</th><th>${t('Subject', 'বিষয়')}</th><th>${t('Room', 'কক্ষ')}</th><th>${t('Attendance', 'হাজিরা')}</th><th>${t('Action', 'কাজ')}</th></tr></thead>
      <tbody>${each(TEACH.classes, (c) => `<tr class="${c.st === 'now' ? 'is-now' : ''}"><td class="nowrap"><b>${n(c.time)}</b>–${n(c.end)}</td><td>${tt(c.c)}</td><td>${tt(c.sub)}</td><td>${tt(c.room)}</td>
        <td>${c.st === 'done' ? `<span class="tag tag-ok">${t('Recorded', 'লিপিবদ্ধ')} ${n(c.p + '/' + c.t)}</span>` : c.st === 'now' ? `<span class="tag tag-warn" data-att-state>${t('Not taken', 'নেওয়া হয়নি')}</span>` : st('later')}</td>
        <td>${c.st === 'now' ? `<button type="button" class="btn btn-primary btn-sm" data-open="dlg-att" data-att-hide>${icon('user-check', 'ico ico-sm')}${t('Take attendance', 'হাজিরা নিন')}</button>` : c.st === 'done' ? `<button type="button" class="btn btn-outline btn-sm" ${p2('Attendance register', 'হাজিরা রেজিস্টার')}>${t('View', 'দেখুন')}</button>` : `<button type="button" class="btn btn-outline btn-sm" ${p2('Class material', 'ক্লাসের উপকরণ')}>${t('Materials', 'উপকরণ')}</button>`}</td></tr>`)}</tbody></table></div>`)}
    ${box(t('My tasks', 'আমার কাজ'), `<div class="i-table-wrap"><table class="i-table"><thead><tr><th>${t('Task', 'কাজ')}</th><th>${t('Progress', 'অগ্রগতি')}</th><th>${t('Status', 'অবস্থা')}</th><th>${t('Action', 'কাজ')}</th></tr></thead>
      <tbody>${each(TEACH.tasks, (k) => `<tr><td><b>${tt(k.t)}</b><small>${tt(k.s)}</small></td><td>${k.pct !== null ? `<span class="i-attbar"><span class="bar"><i style="width:${k.pct}%"></i></span>${n(k.pct + '%')}</span>` : '—'}</td><td>${k.warn ? st('returned') : k.pct ? `<span class="tag tag-info">${t('In progress', 'চলমান')}</span>` : `<span class="tag tag-neutral">${t('Not started', 'শুরু হয়নি')}</span>`}</td><td><button type="button" class="btn ${k.warn ? 'btn-teal' : 'btn-outline'} btn-sm" ${p2(k.t[0], k.t[1])}>${tt(k.btn)}</button></td></tr>`)}</tbody></table></div>`)}
  </div>
  <div class="i-col-side">
    ${box(t('Notices', 'নোটিশ'), nlist([NOTICES[4], NOTICES[2], NOTICES[6]]))}
    ${box(t('Leave balance', 'ছুটির হিসাব'), `<table class="i-table i-table-sm"><thead><tr><th>${t('Type', 'ধরন')}</th><th class="num">${t('Used', 'ব্যবহৃত')}</th><th class="num">${t('Left', 'বাকি')}</th></tr></thead><tbody>${each(TEACH.leave, (l) => `<tr><td>${tt(l.l)}</td><td class="num">${n(l.used)}</td><td class="num"><b>${n(l.total - l.used)}</b></td></tr>`)}</tbody></table>
      <button type="button" class="btn btn-outline btn-sm" ${p2('Apply for leave', 'ছুটির আবেদন')}>${icon('calendar-plus', 'ico ico-sm')}${t('Apply for leave', 'ছুটির আবেদন')}</button>`)}
    ${box(t('Shortcuts', 'শর্টকাট'), `<ul class="i-quick">${each([['upload', ['Upload material', 'উপকরণ আপলোড']], ['clipboard-check', ['Enter marks', 'নম্বর দিন']], ['library', ['Library', 'লাইব্রেরি']], ['user', ['My profile', 'আমার প্রোফাইল']]], ([ic, l]) => `<li><button type="button" ${p2(l[0], l[1])}>${icon(ic, 'ico ico-sm')}${tt(l)}</button></li>`)}</ul>`)}
  </div>
</div>
<dialog id="dlg-att" class="dlg dlg-wide" aria-labelledby="ia-t"><div data-att-scope data-total="${now.t}">
  <div class="dlg-head"><div><h2 id="ia-t">${t('Attendance register', 'হাজিরা রেজিস্টার')}</h2><p class="muted">${tt(now.c)} · ${tt(now.sub)} · ${now.time}–${now.end} · ${tt(now.room)}</p></div><button type="button" class="dlg-x" data-close ${ta('aria-label', 'Close', 'বন্ধ করুন')}>${icon('x')}</button></div>
  <div class="dlg-body">
    <p class="i-att-sum">${t('Present', 'উপস্থিত')} <b data-att-p>${n(5)}</b> · ${t('Absent', 'অনুপস্থিত')} <b data-att-a>${n(1)}</b> · ${t('Leave', 'ছুটি')} <b data-att-l>${n(1)}</b> <button type="button" class="link" data-att-all>${t('Mark all present', 'সবাইকে উপস্থিত')}</button></p>
    <table class="i-table i-table-sm"><thead><tr><th>${t('Roll', 'রোল')}</th><th>${t('Name', 'নাম')}</th><th>${t('Present', 'উপস্থিত')}</th><th>${t('Absent', 'অনুপস্থিত')}</th><th>${t('Leave', 'ছুটি')}</th></tr></thead>
      <tbody>${each(TEACH.roster, (r) => `<tr data-att-row><td class="mono">${r.roll}</td><td>${r.name}</td>${['P', 'A', 'L'].map((k) => `<td><input type="radio" name="i${r.roll}" value="${k}" ${r.s === k ? 'checked' : ''} aria-label="${r.name} ${k}"></td>`).join('')}</tr>`)}</tbody></table>
    <p class="proto-note">${t('8 of 60 students shown.', '৬০ জনের ৮ জন দেখানো হয়েছে।')}</p>
  </div>
  <div class="dlg-foot"><button type="button" class="btn btn-outline" data-close>${t('Cancel', 'বাতিল')}</button><button type="button" class="btn btn-primary" data-att-submit>${t('Submit', 'জমা দিন')}</button></div>
</div></dialog>`;
  const body = appShell({ role: 'teacher', user: TEACH.user, scope: PRIN.inst.n, crumbs: [['Teacher', 'শিক্ষক'], ['Home', 'হোম']],
    title: `${t('My day', 'আমার দিন')} <small class="i-code">${tt(TODAY)}</small>`, content });
  return page({ v: V, screen: '06-teacher-dashboard', title: ['Teacher dashboard', 'শিক্ষক ড্যাশবোর্ড'], body, bodyClass: 'i-app' });
}

// ---------- 07 Student ----------
function student() {
  const steps = { returned: ['Correction by student', 'শিক্ষার্থীর সংশোধন'], review: ['Principal’s office', 'অধ্যক্ষের দপ্তর'], done: ['Ready', 'প্রস্তুত'] };
  const content = `
<section class="i-profile">
  <span class="i-av i-av-lg">MA</span>
  <dl>
    <div><dt>${t('Name', 'নাম')}</dt><dd>Mim Akter</dd></div><div><dt>${t('Student ID', 'শিক্ষার্থী আইডি')}</dt><dd class="mono">${STU.id}</dd></div>
    <div><dt>${t('Programme', 'প্রোগ্রাম')}</dt><dd>${tt(STU.prog)}</dd></div><div><dt>${t('Year / semester', 'বর্ষ / সেমিস্টার')}</dt><dd>${tt(STU.year)}</dd></div>
    <div><dt>${t('Advisor', 'অ্যাডভাইজার')}</dt><dd>Nusrat Jahan</dd></div><div><dt>${t('Status', 'অবস্থা')}</dt><dd><span class="tag tag-ok">${t('Regular', 'নিয়মিত')}</span></dd></div>
  </dl>
</section>
${kpis([
    { v: '78%', l: ['Attendance', 'উপস্থিতি'], s: ['80% needed for exams', 'পরীক্ষার জন্য ৮০% প্রয়োজন'], tone: 'warn' },
    { v: '3.30', l: ['CGPA', 'সিজিপিএ'], s: ['2 semesters', '২ সেমিস্টার'] },
    { v: '—', l: ['Semester 3 result', 'সেমিস্টার ৩ ফল'], s: ['Pending publication', 'প্রকাশের অপেক্ষায়'] },
    { v: '৳ 3,500', l: ['Fees due', 'বকেয়া ফি'], s: ['By 31 Oct 2026', '৩১ অক্টোবর ২০২৬-এর মধ্যে'], tone: 'warn' },
    { v: '2', l: ['Open requests', 'চলমান আবেদন'], s: ['1 needs your correction', '১টিতে আপনার সংশোধন প্রয়োজন'], tone: 'danger' },
  ])}
<div class="i-cols">
  <div class="i-col-main">
    <section class="i-box" aria-labelledby="sr-t">
      <div class="i-box-head"><h2 id="sr-t" class="i-box-t">${t('My records', 'আমার রেকর্ড')}</h2><button type="button" class="btn btn-primary btn-sm" ${p2('New online application', 'নতুন অনলাইন আবেদন')}>${icon('file-text', 'ico ico-sm')}${t('New application', 'নতুন আবেদন')}</button></div>
      <div class="i-tabs" role="tablist">
        <button type="button" role="tab" id="s1" aria-controls="sp1" aria-selected="true">${t('Requests', 'আবেদন')} <span class="i-badge">${n(3)}</span></button>
        <button type="button" role="tab" id="s2" aria-controls="sp2" aria-selected="false" tabindex="-1">${t('Results', 'ফলাফল')}</button>
        <button type="button" role="tab" id="s3" aria-controls="sp3" aria-selected="false" tabindex="-1">${t('Attendance by course', 'কোর্সভিত্তিক উপস্থিতি')}</button>
        <button type="button" role="tab" id="s4" aria-controls="sp4" aria-selected="false" tabindex="-1">${t('Payments', 'পরিশোধ')}</button>
      </div>
      <div id="sp1" role="tabpanel" aria-labelledby="s1"><div class="i-table-wrap"><table class="i-table"><thead><tr><th>${t('Ref.', 'স্মারক')}</th><th>${t('Service', 'সেবা')}</th><th>${t('Submitted', 'জমা')}</th><th>${t('Current step', 'বর্তমান ধাপ')}</th><th>${t('Status', 'অবস্থা')}</th><th>${t('Action', 'কাজ')}</th></tr></thead>
        <tbody>${each(STU.requests, (r) => `<tr class="${r.st === 'returned' ? 'is-warn' : ''}"><td class="mono nowrap">${r.ref}</td><td><b>${tt(r.s)}</b><small>${tt(r.note)}</small></td><td class="nowrap">${d(r.date)}</td><td>${tt(steps[r.st])}</td><td>${st(r.st)}</td>
          <td>${r.st === 'returned' ? `<button type="button" class="btn btn-teal btn-sm" ${p2('Fix and resubmit request', 'সংশোধন করে পুনরায় জমা')}>${t('Correct & resubmit', 'সংশোধন করে জমা')}</button>` : r.st === 'done' ? `<button type="button" class="btn btn-outline btn-sm" ${toast('Download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে ডাউনলোড শুরু হবে।')}>${icon('download', 'ico ico-sm')}${t('Download', 'ডাউনলোড')}</button>` : `<button type="button" class="btn btn-outline btn-sm" ${p2('Request tracking', 'আবেদন ট্র্যাকিং')}>${t('Track', 'ট্র্যাক')}</button>`}</td></tr>`)}</tbody></table></div></div>
      <div id="sp2" role="tabpanel" aria-labelledby="s2" hidden><table class="i-table"><thead><tr><th>${t('Semester', 'সেমিস্টার')}</th><th class="num">GPA</th><th>${t('Status', 'অবস্থা')}</th><th>${t('Action', 'কাজ')}</th></tr></thead><tbody>${each(STU.results, (r) => `<tr><td>${tt(r.sem)}</td><td class="num">${r.gpa ? n(r.gpa) : '—'}</td><td>${st(r.st)}</td><td>${r.gpa ? `<button type="button" class="btn btn-outline btn-sm" ${p2('Grade table', 'গ্রেড টেবিল')}>${t('Grade sheet', 'গ্রেড শিট')}</button>` : `<span class="muted i-small">${t('Available after publication', 'প্রকাশের পর পাওয়া যাবে')}</span>`}</td></tr>`)}</tbody></table></div>
      <div id="sp3" role="tabpanel" aria-labelledby="s3" hidden><table class="i-table"><thead><tr><th>${t('Course', 'কোর্স')}</th><th>${t('Attendance', 'উপস্থিতি')}</th><th>${t('Status', 'অবস্থা')}</th></tr></thead><tbody>${each(STU.courses, (c) => `<tr><td>${tt(c.c)}</td><td><span class="i-attbar"><span class="bar ${c.a < 80 ? 'danger' : ''}"><i style="width:${c.a}%"></i></span>${n(c.a + '%')}</span></td><td>${c.a < 80 ? `<span class="tag tag-warn">${t('Below 80%', '৮০%-এর নিচে')}</span>` : `<span class="tag tag-ok">${t('OK', 'ঠিক আছে')}</span>`}</td></tr>`)}</tbody></table></div>
      <div id="sp4" role="tabpanel" aria-labelledby="s4" hidden><table class="i-table"><thead><tr><th>${t('Item', 'বিষয়')}</th><th class="num">${t('Amount', 'পরিমাণ')}</th><th>${t('Due', 'শেষ তারিখ')}</th><th>${t('Status', 'অবস্থা')}</th></tr></thead><tbody>
        <tr><td>${t('Semester 3 tuition fee', 'সেমিস্টার ৩ টিউশন ফি')}</td><td class="num">৳ ${n('3,500')}</td><td>${d('31 Oct 2026')}</td><td><span class="tag tag-warn">${t('Unpaid', 'অপরিশোধিত')}</span> <button type="button" class="btn btn-teal btn-sm" ${p2('Online fee payment', 'অনলাইনে ফি পরিশোধ')}>${t('Pay', 'পরিশোধ')}</button></td></tr>
        <tr><td>${t('Admit card fee — Semester 3', 'প্রবেশপত্র ফি — সেমিস্টার ৩')}</td><td class="num">৳ ${n('200')}</td><td>${d('25 Sep 2026')}</td><td><span class="tag tag-ok">${t('Paid', 'পরিশোধিত')}</span></td></tr></tbody></table></div>
    </section>
    ${box(t('Online applications', 'অনলাইন আবেদন'), `<ul class="i-svcgrid">${each(STU.services, (s) => `<li><button type="button" ${p2(s[0], s[1])}>${icon('file-text', 'ico ico-xs')}${tt(s)}</button></li>`)}</ul>`, `<span class="muted i-small">${t('15 services', '১৫টি সেবা')}</span>`)}
  </div>
  <div class="i-col-side">
    ${box(t('Today’s classes', 'আজকের ক্লাস'), `<table class="i-table i-table-sm"><tbody>${each(STU.classes, (c) => `<tr><th class="nowrap">${n(c.time)}</th><td><b>${tt(c.sub)}</b><small>${c.who} · ${tt(c.room)}</small></td></tr>`)}</tbody></table>`)}
    ${box(t('Notices', 'নোটিশ'), nlist([NOTICES[2], NOTICES[6], NOTICES[10]]))}
    ${box(t('Shortcuts', 'শর্টকাট'), `<ul class="i-quick">${each([['wallet', ['Pay fees', 'ফি পরিশোধ']], ['id-card', ['Admit card', 'প্রবেশপত্র']], ['calendar-days', ['Academic calendar', 'একাডেমিক ক্যালেন্ডার']], ['award', ['Certificate', 'সনদ']]], ([ic, l]) => `<li><button type="button" ${p2(l[0], l[1])}>${icon(ic, 'ico ico-sm')}${tt(l)}</button></li>`)}</ul>`)}
  </div>
</div>`;
  const body = appShell({ role: 'student', user: STU.user, scope: PRIN.inst.n, crumbs: [['Student', 'শিক্ষার্থী'], ['Home', 'হোম']], title: t('Student home', 'শিক্ষার্থী হোম'), content });
  return page({ v: V, screen: '07-student-dashboard', title: ['Student dashboard', 'শিক্ষার্থী ড্যাশবোর্ড'], body, bodyClass: 'i-app' });
}

export default {
  '01-landing': landing, '02-notices': notices, '03-login': login,
  '04-ministry-dashboard': ministry, '05-principal-dashboard': principal,
  '06-teacher-dashboard': teacher, '07-student-dashboard': student,
};
