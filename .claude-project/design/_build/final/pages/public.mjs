// Public website pages (Variation H baseline + stakeholder corrections).
import {
  t, tt, n, d, ta, icon, each, esc, opt, page, photo, demo, tbd, st, a, btn, act, dl, field, alert, empty, table, tabs, card,
  secHead, pageHero, lineChart, groupedBars, donut, hbars, chartMeta, PORTALS, ORG, bnDigits,
} from '../core.mjs';
import { illus } from '../illus.mjs';
import { STATS, ADMISSION, NOTICES, NOTICE_CATS, catLabel, AUTH, OFFICIALS, GALLERY, PROGRAMMES, INSTITUTIONS, TYPES, SERVICES, DIVISIONS, FAQ, CATEGORIES } from '../data.mjs';

const catTag = (k) => `<span class="h-cat">${tt(catLabel(k))}</span>`;
const official = (o) => `<article class="f-off">
  <img src="../assets/images/officials/${o.img}" ${ta('alt', `Portrait of ${o.n[0]}`, `${o.n[1]}-এর প্রতিকৃতি`)} loading="lazy">
  <div><p class="f-off-r">${tt(o.r)}</p><h3>${tt(o.n)}</h3><p class="muted">${tt(o.o)}</p>
  <a class="h-arrow-link" href="${o.src}" rel="noopener">${t('View profile on official website', 'অফিসিয়াল ওয়েবসাইটে প্রোফাইল দেখুন')}${icon('arrow-up-right', 'ico ico-sm')}</a></div></article>`;
const portalCard = (p, big = false) => `<article class="f-portal ${big ? 'is-big' : ''}">
  <span class="f-portal-ico">${icon(p.icon, 'ico ico-xl')}</span>
  <h3>${tt(p.l)}</h3><p>${tt(p.who)}</p>
  <p class="f-portal-dom">${icon('lock', 'ico ico-xs')}<code>${p.dom}</code></p>
  <p class="f-portal-note">${t('Proposed secure address — prototype only', 'প্রস্তাবিত নিরাপদ ঠিকানা — শুধু প্রোটোটাইপ')}</p>
  <a class="btn btn-primary" href="${p.href}">${t('Open Portal', 'পোর্টাল খুলুন')}${icon('arrow-right', 'ico ico-sm')}</a></article>`;
const noticeRow = (x) => `<li data-cat="${x.cat}" data-year="2026" ${x.urgent ? 'data-urgent="1"' : ''}><a href="notice-detail.html"><time>${d(x.date)}</time>${catTag(x.cat)}${x.urgent ? `<span class="h-urgent"> · ${t('Urgent', 'জরুরি')}</span>` : ''}<b>${tt(x.t)}</b></a></li>`;
const helpTiles = () => `<ul class="f-helptiles">${each([
  ['circle-play', ['Watch video tutorials', 'ভিডিও টিউটোরিয়াল দেখুন'], 'help.html#videos', 'c1'], ['circle-help', ['Frequently asked questions', 'সাধারণ জিজ্ঞাসা'], 'help.html#faq', 'c2'],
  ['book-open', ['Download user guides', 'ব্যবহার নির্দেশিকা ডাউনলোড'], 'help.html#guides', 'c3'], ['file-down', ['Download forms', 'ফরম ডাউনলোড'], 'help.html#downloads', 'c4']], ([ic, l, h, c]) =>
  `<li><a href="${h}"><span class="f-ht-ico ${c}">${icon(ic, 'ico ico-xl')}</span><b>${tt(l)}</b></a></li>`)}</ul>`;

// ================= HOME =================
function home() {
  const slides = [
    ['campus-gtec-academic.jpg', ['Academic building, Gopalganj Textile Engineering College', 'একাডেমিক ভবন, গোপালগঞ্জ টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ']],
    ['campus-tecn.jpg', ['Campus, Textile Engineering College, Noakhali', 'ক্যাম্পাস, টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ, নোয়াখালী']],
    ['ev-dti-orientation.jpg', ['Orientation class, Dinajpur Textile Institute', 'ওরিয়েন্টেশন ক্লাস, দিনাজপুর টেক্সটাইল ইনস্টিটিউট']],
  ];
  const body = `
<section class="f-hero" aria-labelledby="hero-t">
  <div class="f-hero-media" data-slides aria-roledescription="carousel" ${ta('aria-label', 'Institution photographs', 'প্রতিষ্ঠানের ছবি')}>
    ${each(slides, ([f, alt], i) => `<div class="slide ${i ? '' : 'is-active'}" role="group" aria-roledescription="slide" aria-label="${i + 1} / 3">${photo(f, alt, 'f-hero-img', i ? '' : 'loading="eager" fetchpriority="high"')}<p class="f-hero-cap">${icon('camera', 'ico ico-xs')}${tt(alt)}</p></div>`)}
    <div class="f-hero-text">
      <p class="h-kick">${tt(ORG.dept)} · ${tt(ORG.ministry)}</p>
      <h1 id="hero-t" class="h-display">${tt(ORG.product)}</h1>
      <p>${t('Integrated digital platform for admission, academic administration, services and monitoring of government textile institutions of Bangladesh.', 'বাংলাদেশের সরকারি টেক্সটাইল প্রতিষ্ঠানসমূহের ভর্তি, একাডেমিক প্রশাসন, সেবা ও পরিবীক্ষণের সমন্বিত ডিজিটাল প্ল্যাটফর্ম।')}</p>
      <div class="h-hero-cta"><a class="btn btn-white btn-lg" href="admissions.html">${t('Admission information', 'ভর্তি তথ্য')}</a><a class="btn btn-onimg btn-lg" href="institutions.html">${t('Find an institution', 'প্রতিষ্ঠান খুঁজুন')}</a></div>
      <div class="f-hero-ctl"><button type="button" data-slide-prev ${ta('aria-label', 'Previous photo', 'আগের ছবি')}>${icon('arrow-left', 'ico ico-sm')}</button>${[0, 1, 2].map((k) => `<button type="button" class="h-dot" data-slide-dot="${k}" ${ta('aria-label', `Photo ${k + 1}`, `ছবি ${bnDigits(k + 1)}`)}></button>`).join('')}<button type="button" data-slide-next ${ta('aria-label', 'Next photo', 'পরের ছবি')}>${icon('arrow-right', 'ico ico-sm')}</button><button type="button" data-slide-pause aria-pressed="false" ${ta('aria-label', 'Pause slideshow', 'স্লাইড থামান')}>${icon('circle-play', 'ico ico-sm')}</button></div>
    </div>
  </div>
  <ul class="f-hero-stats" ${ta('aria-label', 'Public statistics', 'পাবলিক পরিসংখ্যান')}>${each(STATS, (s, i) => `<li class="f-hs f-hs-${i}"><span class="f-hs-ico">${icon(s.icon, 'ico')}</span><b>${n(s.v)}</b><span class="f-hs-l">${tt(s.l)}</span><small>${tt(s.s)}</small></li>`)}</ul>
</section>
<p class="container f-hero-meta">${t('As per academic session 2026–27', 'একাডেমিক সেশন ২০২৬–২৭ অনুযায়ী')} · ${demo()} · ${t('Last updated: 15 October 2026, 09:30', 'সর্বশেষ হালনাগাদ: ১৫ অক্টোবর ২০২৬, ০৯:৩০')}</p>

<section class="f-band" aria-labelledby="band-t"><div class="container f-band-in">
  <h2 id="band-t" class="sr-only">${t('Institutions by type', 'ধরন অনুযায়ী প্রতিষ্ঠান')}</h2>
  ${each(CATEGORIES, (c, i) => `<div>${illus(['college', 'institute', 'vocational'][i])}<b>${n(c.v)}</b><span>${tt(c.l)}</span></div>`)}
  <div>${illus('divisions')}<b>${n(8)}</b><span>${t('Divisions covered', 'আওতাভুক্ত বিভাগ')}</span></div><div>${illus('districts')}<b>${n(47)}</b><span>${t('Districts covered', 'আওতাভুক্ত জেলা')}</span></div>
</div></section>

<section class="container h-intro" aria-labelledby="why-t">
  <div class="f-intro-card">
    <p class="h-eyebrow">${t('About the system', 'সিস্টেম সম্পর্কে')}</p>
    <h2 id="why-t" class="h-statement f-statement">${t('One online home for every government textile institution.', 'সব সরকারি টেক্সটাইল প্রতিষ্ঠানের জন্য একটি অনলাইন ঠিকানা।')}</h2>
    <p class="f-intro-lead">${t('Students apply and follow their studies, teachers run their classes, and the Department of Textiles and the Ministry can see how every institution is doing — with less paperwork and fewer office visits.', 'শিক্ষার্থীরা আবেদন করে ও পড়াশোনার খোঁজ রাখে, শিক্ষকরা ক্লাস পরিচালনা করেন, আর বস্ত্র অধিদপ্তর ও মন্ত্রণালয় প্রতিটি প্রতিষ্ঠানের অবস্থা দেখতে পায় — কম কাগজপত্রে, কম অফিস-যাতায়াতে।')}</p>
  </div>
  <ol class="h-pillars">
    <li><span class="h-num">${n('01')}</span>${icon('globe', 'ico ico-lg')}<h3>${t('Public information and services', 'পাবলিক তথ্য ও সেবা')}</h3><p>${t('Admission, notices, results and certificate verification for citizens.', 'নাগরিকদের জন্য ভর্তি, নোটিশ, ফলাফল ও সনদ যাচাই।')}</p></li>
    <li><span class="h-num">${n('02')}</span>${icon('school', 'ico ico-lg')}<h3>${t('Institutional administration', 'প্রাতিষ্ঠানিক প্রশাসন')}</h3><p>${t('Classes, attendance, results, finance, assets, library and student services within each institution.', 'প্রতিটি প্রতিষ্ঠানের ক্লাস, হাজিরা, ফলাফল, অর্থ, সম্পদ, লাইব্রেরি ও শিক্ষার্থী সেবা।')}</p></li>
    <li><span class="h-num">${n('03')}</span>${icon('landmark', 'ico ico-lg')}<h3>${t('National monitoring', 'জাতীয় পরিবীক্ষণ')}</h3><p>${t('Ministry, division and district monitoring with approvals and consolidated reports.', 'অনুমোদন ও সমন্বিত প্রতিবেদনসহ মন্ত্রণালয়, বিভাগ ও জেলা পর্যায়ের পরিবীক্ষণ।')}</p></li>
  </ol>
  <a class="h-arrow-link" href="about.html">${t('About us', 'আমাদের সম্পর্কে')}${icon('arrow-right', 'ico')}</a>
</section>

<section class="h-services" id="services" aria-labelledby="svc-t"><div class="container">
  ${secHead(['Public services', 'পাবলিক সেবা'], t('Online services', 'অনলাইন সেবাসমূহ'), `<p class="muted">${t('Apply, track and verify online without visiting an office.', 'অফিসে না গিয়ে অনলাইনে আবেদন, ট্র্যাক ও যাচাই করুন।')}</p>`, 'svc-t')}
  <ul class="h-svc-grid f-svc-grid">${each(SERVICES, (s) => `<li><a class="h-svc f-svc" href="${s.href}"><span class="f-svc-ico">${icon(s.icon, 'ico ico-lg')}</span><h3>${tt(s.l)}</h3><p>${tt(s.s)}</p><span class="h-svc-go">${icon('arrow-up-right', 'ico')}</span></a></li>`)}</ul>
</div></section>

<section class="h-about f-eco" aria-labelledby="eco-t">
  <div class="h-about-media">${photo('lab-dti-computer.jpg', ['Computer laboratory, Dinajpur Textile Institute', 'কম্পিউটার ল্যাবরেটরি, দিনাজপুর টেক্সটাইল ইনস্টিটিউট'])}</div>
  <div class="h-about-text">
    <p class="h-eyebrow">${t('Academic', 'একাডেমিক')}</p>
    <h2 id="eco-t" class="h-h2">${t('Programmes and institutions', 'প্রোগ্রাম ও প্রতিষ্ঠান')}</h2>
    <p>${t('Government textile education is offered at three levels across all eight divisions.', 'সরকারি টেক্সটাইল শিক্ষা আট বিভাগে তিনটি স্তরে প্রদান করা হয়।')}</p>
    <ul class="h-cats">${each(PROGRAMMES, (p, i) => `<li><b>${n(CATEGORIES[i].v)}</b><span><strong>${tt(p.l)}</strong><br><small class="muted">${tt(p.where)} · ${tt(p.dur)}</small></span></li>`)}</ul>
    <p class="f-links"><a class="h-arrow-link" href="academic.html">${t('Academic information', 'একাডেমিক তথ্য')}${icon('arrow-right', 'ico')}</a><a class="h-arrow-link" href="institutions.html">${t('Institution directory', 'প্রতিষ্ঠান ডিরেক্টরি')}${icon('arrow-right', 'ico')}</a></p>
  </div>
</section>

<section class="h-adm" id="admissions" aria-labelledby="adm-t">
  ${photo('ev-gtec-orientation.jpg', ['Orientation ceremony for new students, Gopalganj Textile Engineering College', 'নবীন শিক্ষার্থীদের ওরিয়েন্টেশন, গোপালগঞ্জ টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], 'h-adm-img')}
  <div class="container h-adm-in"><div class="h-adm-card">
    <p class="h-eyebrow">${t('Admissions', 'ভর্তি')}</p>
    <h2 id="adm-t" class="h-h2">${t('Admission 2026–27', 'ভর্তি ২০২৬–২৭')}</h2><p>${tt(ADMISSION.cycle)}</p>
    <ol class="h-dates">${each(ADMISSION.steps, (s) => `<li class="is-${s.st === 'now' ? 'next' : s.st}"><span>${d(s.date)}</span><b>${tt(s.l)}</b>${s.st === 'now' ? `<em>${t('Open', 'চলছে')}</em>` : ''}</li>`)}</ol>
    <p class="h-adm-note">${icon('id-card', 'ico')}${t('Candidates sign in with a temporary application ID. After final admission, the account becomes a student account with a student ID.', 'প্রার্থীরা অস্থায়ী আবেদন আইডি দিয়ে লগইন করেন। চূড়ান্ত ভর্তির পর অ্যাকাউন্টটি শিক্ষার্থী আইডিসহ শিক্ষার্থী অ্যাকাউন্টে রূপান্তরিত হয়।')}</p>
    <div class="h-adm-act">${a('apply.html', t('Apply online', 'অনলাইনে আবেদন'), 'btn btn-teal')}${a('candidate-login.html', t('Candidate login / Track', 'প্রার্থী লগইন / ট্র্যাক'), 'btn btn-primary')}${a('admissions.html', t('Admission details', 'ভর্তির বিস্তারিত'), 'btn btn-outline')}</div>
  </div></div>
</section>

<section class="f-insights" id="insights" aria-labelledby="ins-t"><div class="container">
  ${secHead(['Public dashboard', 'পাবলিক ড্যাশবোর্ড'], t('Public insights on textile education', 'টেক্সটাইল শিক্ষার পাবলিক তথ্য'), a('public-dashboard.html', t('View Public Dashboard', 'পাবলিক ড্যাশবোর্ড দেখুন') + icon('arrow-right', 'ico ico-sm'), 'btn btn-primary'), 'ins-t')}
  <div class="f-ins-cards">
    ${each([['campus-gtec-panorama.jpg', '59', ['Institutions', 'প্রতিষ্ঠান'], [[['Textile Engineering Colleges', 'টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], '8'], [['Textile Institutes', 'টেক্সটাইল ইনস্টিটিউট'], '10'], [['Textile Vocational Institutes', 'টেক্সটাইল ভোকেশনাল ইনস্টিটিউট'], '41']]],
      ['ev-gtec-seminar.jpg', '2,146', ['Teachers / Instructors', 'শিক্ষক / ইন্সট্রাক্টর'], [[['Male', 'পুরুষ'], '64.2%'], [['Female', 'নারী'], '35.8%']]],
      ['ev-dti-assembly.jpg', '38,420', ['Students', 'শিক্ষার্থী'], [[['Male', 'পুরুষ'], '58.6%'], [['Female', 'নারী'], '41.4%']]]], ([img, v, l, rows]) =>
      `<article class="f-ic">${photo(img, l, 'f-ic-img')}<div class="f-ic-in"><b>${n(v)}</b><h3>${tt(l)}</h3><dl>${each(rows, ([k, x]) => `<div><dt>${tt(k)}</dt><dd>${n(x)}</dd></div>`)}</dl></div></article>`)}
  </div>
  <p class="f-chart-meta">${t('As per academic session 2026–27', 'একাডেমিক সেশন ২০২৬–২৭ অনুযায়ী')} · ${demo()}</p>
</div></section>

<section class="container h-news" aria-labelledby="news-t" data-filter-scope>
  ${secHead(['Notice', 'নোটিশ'], t('Notices and circulars', 'নোটিশ ও পরিপত্র'), `<a class="h-arrow-link" href="notices.html">${t('All notices', 'সকল নোটিশ')}${icon('arrow-right', 'ico')}</a>`, 'news-t')}
  <div class="h-tabs" role="group" ${ta('aria-label', 'Filter by category', 'বিভাগ অনুযায়ী')}><button type="button" data-filter="all" aria-pressed="true">${t('All', 'সব')}</button><button type="button" data-filter="urgent" aria-pressed="false">${t('Urgent', 'জরুরি')}</button>${each(NOTICE_CATS.slice(0, 6), (c) => `<button type="button" data-filter="${c.k}" aria-pressed="false">${tt(c.l)}</button>`)}</div>
  <div class="h-news-grid">
    <a class="h-feature" href="notice-detail.html"><span class="h-feature-date"><b>${n('14')}</b><span>${d('Oct 2026')}</span></span>
      <span class="h-feature-body"><span class="h-feature-tags">${icon('pin', 'ico ico-sm')}${catTag('admission')}<span class="tag tag-danger">${t('Urgent', 'জরুরি')}</span></span><b class="h-feature-t">${tt(NOTICES[0].t)}</b><span>${tt(NOTICES[0].s)}</span><span class="h-feature-by">${tt(AUTH.dept)} · PDF ${n(NOTICES[0].size)}</span></span></a>
    <ul class="h-news-list">${each(NOTICES.slice(1, 9), noticeRow)}</ul>
  </div>
  <div class="h-empty" data-filter-empty hidden>${t('No recent notice in this category. See the notice archive.', 'এই বিভাগে সাম্প্রতিক কোনো নোটিশ নেই। নোটিশ আর্কাইভ দেখুন।')}</div>
</section>

<section class="f-officials-pre" aria-labelledby="off-t"><div class="container">
  ${secHead(['Responsible officials', 'দায়িত্বপ্রাপ্ত কর্মকর্তা'], t('Ministry and Department leadership', 'মন্ত্রণালয় ও অধিদপ্তরের নেতৃত্ব'), `<a class="h-arrow-link" href="officials.html">${t('All responsible officials', 'সকল দায়িত্বপ্রাপ্ত কর্মকর্তা')}${icon('arrow-right', 'ico')}</a>`, 'off-t')}
  <div class="f-off-grid">${each(OFFICIALS, official)}</div>
  <p class="f-chart-meta">${t('Source: official websites of the Ministry of Textiles and Jute and the Department of Textiles, checked 15 October 2026.', 'উৎস: বস্ত্র ও পাট মন্ত্রণালয় ও বস্ত্র অধিদপ্তরের অফিসিয়াল ওয়েবসাইট, ১৫ অক্টোবর ২০২৬ তারিখে যাচাইকৃত।')}</p>
</div></section>

<section class="h-gallery" aria-labelledby="gal-t">
  <div class="container h-sec-head"><div><p class="h-eyebrow">${t('Photo gallery', 'ফটো গ্যালারি')}</p><h2 id="gal-t" class="h-h2">${t('Our institutions', 'আমাদের প্রতিষ্ঠান')}</h2></div>
    <div class="h-gal-ctl"><button type="button" data-scroll="h-gal|-1" ${ta('aria-label', 'Scroll left', 'বামে সরান')}>${icon('arrow-left', 'ico')}</button><button type="button" data-scroll="h-gal|1" ${ta('aria-label', 'Scroll right', 'ডানে সরান')}>${icon('arrow-right', 'ico')}</button><a class="h-arrow-link" href="gallery.html">${t('Full gallery', 'সম্পূর্ণ গ্যালারি')}${icon('arrow-right', 'ico ico-sm')}</a></div></div>
  <ul class="h-gal" id="h-gal" tabindex="0" ${ta('aria-label', 'Photo gallery', 'ফটো গ্যালারি')}>${each(GALLERY.slice(0, 8), (g) => `<li><button type="button" data-lightbox>${photo(g.f, g.c)}</button><p>${tt(g.c)}</p></li>`)}</ul>
</section>

<section class="container f-helpdesk" id="help" aria-labelledby="help-t">
  <div><p class="h-eyebrow">${t('Help desk', 'হেল্প ডেস্ক')}</p><h2 id="help-t" class="h-h2">${t('Help desk for all users of the system', 'সিস্টেমের সকল ব্যবহারকারীর জন্য হেল্প ডেস্ক')}</h2>
    <p>${t('Video tutorials in Bangla, user guides and forms are available for candidates, students, teachers and officials. The help desk responds on working days.', 'প্রার্থী, শিক্ষার্থী, শিক্ষক ও কর্মকর্তাদের জন্য বাংলায় ভিডিও টিউটোরিয়াল, ব্যবহার নির্দেশিকা ও ফরম রয়েছে। কর্মদিবসে হেল্প ডেস্ক সাড়া দেয়।')}</p>
    <p class="h-help-call">${icon('headset', 'ico ico-xl')}<span><small>${t('Help desk (Sun–Thu, 9:00–17:00)', 'হেল্প ডেস্ক (রবি–বৃহস্পতি, ৯:০০–১৭:০০)')}</small><b>${n(ORG.helpline)}</b></span></p>
    <a class="btn btn-outline btn-lg" href="help.html">${t('Go to Help Desk', 'হেল্প ডেস্কে যান')}</a></div>
  ${helpTiles()}
</section>

<section class="f-portals-sec" id="portals" aria-labelledby="port-t"><div class="container">
  <div class="f-portals-head"><p class="h-eyebrow h-eyebrow-inv">${t('For authorised officials only', 'শুধু অনুমোদিত কর্মকর্তাদের জন্য')}</p>
    <h2 id="port-t" class="h-h2">${t('Institutional and Government Portals', 'প্রাতিষ্ঠানিক ও সরকারি পোর্টাল')}</h2>
    <p>${t('Separate secure access for authorised government and institution users. These portals are not part of the public sign-in. Teachers sign in through the Institution Portal.', 'অনুমোদিত সরকারি ও প্রতিষ্ঠানের ব্যবহারকারীদের জন্য পৃথক নিরাপদ প্রবেশ। এই পোর্টালগুলো পাবলিক লগইনের অংশ নয়। শিক্ষকরা প্রতিষ্ঠান পোর্টাল থেকে লগইন করেন।')}</p></div>
  <div class="f-portal-grid">${each(PORTALS, (p) => portalCard(p))}</div>
</div></section>`;
  return page({ file: 'index', title: ['Home', 'হোম'], active: 'home', body });
}

// ================= ABOUT =================
function about() {
  const body = `${pageHero('campus-tecn.jpg', ['Campus, Textile Engineering College, Noakhali', 'ক্যাম্পাস, টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ, নোয়াখালী'], [[['About Us', 'আমাদের সম্পর্কে']]], t('About the system', 'সিস্টেম সম্পর্কে'), t('Textile Institution Management System of the Department of Textiles, Ministry of Textiles and Jute', 'বস্ত্র ও পাট মন্ত্রণালয়ের বস্ত্র অধিদপ্তরের টেক্সটাইল প্রতিষ্ঠান ব্যবস্থাপনা সিস্টেম'))}
<div class="container f-prose-grid">
  <article class="f-prose">
    <h2 class="h-h3">${t('Background', 'পটভূমি')}</h2>
    <p>${t('The Department of Textiles under the Ministry of Textiles and Jute operates government textile engineering colleges, textile institutes and textile vocational institutes across the country. The Textile Institution Management System brings their admission, academic, administrative and financial work into one official system.', 'বস্ত্র ও পাট মন্ত্রণালয়ের অধীন বস্ত্র অধিদপ্তর সারা দেশে সরকারি টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ, টেক্সটাইল ইনস্টিটিউট ও টেক্সটাইল ভোকেশনাল ইনস্টিটিউট পরিচালনা করে। টেক্সটাইল প্রতিষ্ঠান ব্যবস্থাপনা সিস্টেম এসব প্রতিষ্ঠানের ভর্তি, একাডেমিক, প্রশাসনিক ও আর্থিক কাজ একটি অফিসিয়াল সিস্টেমে নিয়ে আসে।')}</p>
    <h2 class="h-h3">${t('Objectives', 'উদ্দেশ্য')}</h2>
    <ul class="f-list">
      <li>${t('Provide admission, notices, results and certificate verification to citizens online.', 'নাগরিকদের অনলাইনে ভর্তি, নোটিশ, ফলাফল ও সনদ যাচাই সেবা প্রদান।')}</li>
      <li>${t('Maintain one official record of institutions, teachers, students, attendance and results.', 'প্রতিষ্ঠান, শিক্ষক, শিক্ষার্থী, হাজিরা ও ফলাফলের একটি অফিসিয়াল রেকর্ড সংরক্ষণ।')}</li>
      <li>${t('Enable the Ministry, divisions and districts to monitor institutions and approve requests within their jurisdiction.', 'মন্ত্রণালয়, বিভাগ ও জেলাকে নিজ এখতিয়ারের প্রতিষ্ঠান পরিবীক্ষণ ও অনুরোধ অনুমোদনে সক্ষম করা।')}</li>
      <li>${t('Track budget, assets, procurement and library resources of each institution.', 'প্রতিটি প্রতিষ্ঠানের বাজেট, সম্পদ, ক্রয় ও লাইব্রেরি সম্পদের হিসাব রাখা।')}</li>
      <li>${t('Issue and verify professional licences for textile professionals (Phase 2).', 'টেক্সটাইল পেশাজীবীদের পেশাগত লাইসেন্স ইস্যু ও যাচাই (২য় পর্যায়)।')}</li>
    </ul>
    <h2 class="h-h3">${t('Administrative structure', 'প্রশাসনিক কাঠামো')}</h2>
    <ol class="f-hier">${each([[['Ministry of Textiles and Jute / Department of Textiles', 'বস্ত্র ও পাট মন্ত্রণালয় / বস্ত্র অধিদপ্তর'], ['National oversight of all institutions', 'সকল প্রতিষ্ঠানের জাতীয় তত্ত্বাবধান']], [['Division administration (8)', 'বিভাগীয় প্রশাসন (৮)'], ['Districts and institutions within a division', 'বিভাগের জেলা ও প্রতিষ্ঠান']], [['District administration', 'জেলা প্রশাসন'], ['Institutions within a district', 'জেলার প্রতিষ্ঠান']], [['Institution (59)', 'প্রতিষ্ঠান (৫৯)'], ['Principal / Institution Admin, teachers, students', 'অধ্যক্ষ / প্রতিষ্ঠান অ্যাডমিন, শিক্ষক, শিক্ষার্থী']]], ([h, s]) => `<li><b>${tt(h)}</b><span>${tt(s)}</span></li>`)}</ol>
  </article>
  <aside class="f-aside">
    <section class="h-aside-card">${icon('users', 'ico ico-lg')}<h2 class="h-h4">${t('Responsible officials', 'দায়িত্বপ্রাপ্ত কর্মকর্তা')}</h2><p>${t('Ministry, division and district officials responsible for the system.', 'সিস্টেমের দায়িত্বপ্রাপ্ত মন্ত্রণালয়, বিভাগ ও জেলা কর্মকর্তা।')}</p>${a('officials.html', t('View officials', 'কর্মকর্তা দেখুন'), 'btn btn-outline btn-sm')}</section>
    <section class="h-aside-card">${icon('chart-column', 'ico ico-lg')}<h2 class="h-h4">${t('Public dashboard', 'পাবলিক ড্যাশবোর্ড')}</h2><p>${t('Aggregate figures on institutions, students and teachers.', 'প্রতিষ্ঠান, শিক্ষার্থী ও শিক্ষকের সমষ্টিগত তথ্য।')}</p>${a('public-dashboard.html', t('View Public Dashboard', 'পাবলিক ড্যাশবোর্ড দেখুন'), 'btn btn-outline btn-sm')}</section>
    <section class="h-aside-card">${icon('landmark', 'ico ico-lg')}<h2 class="h-h4">${t('Owned by', 'মালিকানা')}</h2><p>${tt(ORG.dept)}, ${tt(ORG.ministry)}</p><a class="link" href="https://dot.gov.bd/" rel="noopener">dot.gov.bd</a></section>
  </aside>
</div>
<section class="f-officials-pre" aria-labelledby="ab-off"><div class="container">${secHead(['Responsible officials', 'দায়িত্বপ্রাপ্ত কর্মকর্তা'], t('Ministry / National level', 'মন্ত্রণালয় / জাতীয় পর্যায়'), `<a class="h-arrow-link" href="officials.html">${t('All levels', 'সকল পর্যায়')}${icon('arrow-right', 'ico')}</a>`, 'ab-off')}<div class="f-off-grid">${each(OFFICIALS, official)}</div></div></section>`;
  return page({ file: 'about', title: ['About Us', 'আমাদের সম্পর্কে'], active: 'about', body });
}

function officials() {
  const divs = DIVISIONS.map((x) => x.n);
  const body = `${pageHero('dot-office.jpg', ['Department of Textiles', 'বস্ত্র অধিদপ্তর'], [[['About Us', 'আমাদের সম্পর্কে'], 'about.html'], [['Responsible officials', 'দায়িত্বপ্রাপ্ত কর্মকর্তা']]], t('Responsible officials', 'দায়িত্বপ্রাপ্ত কর্মকর্তা'), t('Officials responsible for the Textile Institution Management System, by administrative level.', 'প্রশাসনিক পর্যায় অনুযায়ী টেক্সটাইল প্রতিষ্ঠান ব্যবস্থাপনা সিস্টেমের দায়িত্বপ্রাপ্ত কর্মকর্তা।'))}
<div class="container f-sec">
  <nav class="f-anchors">${a('#national', t('Ministry / National level', 'মন্ত্রণালয় / জাতীয় পর্যায়'), 'link')}${a('#division', t('Division level', 'বিভাগীয় পর্যায়'), 'link')}${a('#district', t('District level', 'জেলা পর্যায়'), 'link')}</nav>
  <h2 class="h-h3" id="national">${t('1. Ministry / National level', '১. মন্ত্রণালয় / জাতীয় পর্যায়')}</h2>
  <div class="f-off-grid">${each(OFFICIALS, official)}</div>
  <p class="f-chart-meta">${t('Names and designations as published on motj.gov.bd and dot.gov.bd (checked 15 Oct 2026). English spellings are transliterations', 'নাম ও পদবি motj.gov.bd ও dot.gov.bd-তে প্রকাশিত অনুযায়ী (১৫ অক্টোবর ২০২৬ যাচাইকৃত)। ইংরেজি বানান প্রতিবর্ণীকৃত')} — ${tbd()}</p>
  <h2 class="h-h3" id="division">${t('2. Division level', '২. বিভাগীয় পর্যায়')}</h2>
  ${alert('info', t('Division-level officials are not yet published.', 'বিভাগীয় পর্যায়ের কর্মকর্তাদের তথ্য এখনও প্রকাশিত হয়নি।'), t('Each division will have a Division Administrator designated by the Department of Textiles. Names and contacts will be shown after official designation.', 'প্রতিটি বিভাগে বস্ত্র অধিদপ্তর কর্তৃক মনোনীত একজন বিভাগীয় প্রশাসক থাকবেন। অফিসিয়াল মনোনয়নের পর নাম ও যোগাযোগ দেখানো হবে।'))}
  <ul class="f-tbd-grid">${each(divs, (v) => `<li><span class="f-tbd-ava">${icon('user', 'ico ico-lg')}</span><div><b>${t('Division Administrator', 'বিভাগীয় প্রশাসক')}</b><span>${tt(v)} ${t('Division', 'বিভাগ')}</span>${tbd()}</div></li>`)}</ul>
  <h2 class="h-h3" id="district">${t('3. District level', '৩. জেলা পর্যায়')}</h2>
  ${alert('info', t('District-level officials are not yet published.', 'জেলা পর্যায়ের কর্মকর্তাদের তথ্য এখনও প্রকাশিত হয়নি।'), t('District Administrators will be listed by division after designation. Principals and teachers are not listed in this directory.', 'মনোনয়নের পর বিভাগ অনুযায়ী জেলা প্রশাসকদের তালিকা দেখানো হবে। অধ্যক্ষ ও শিক্ষকরা এই তালিকায় অন্তর্ভুক্ত নন।'))}
  ${table({ id: 'dist-off', search: ['Search district', 'জেলা খুঁজুন'], cols: [{ l: ['District', 'জেলা'] }, { l: ['Division', 'বিভাগ'] }, { l: ['Post', 'পদ'] }, { l: ['Name', 'নাম'] }],
    rows: [['Chattogram', 'চট্টগ্রাম', 'Chattogram', 'চট্টগ্রাম'], ['Noakhali', 'নোয়াখালী', 'Chattogram', 'চট্টগ্রাম'], ['Dhaka', 'ঢাকা', 'Dhaka', 'ঢাকা'], ['Gopalganj', 'গোপালগঞ্জ', 'Dhaka', 'ঢাকা'], ['Rajshahi', 'রাজশাহী', 'Rajshahi', 'রাজশাহী'], ['Khulna', 'খুলনা', 'Khulna', 'খুলনা']].map((r) => ({ cells: [t(r[0], r[1]), t(r[2], r[3]), t('District Administrator', 'জেলা প্রশাসক'), tbd()] })),
    foot: `<span>${t('Showing 6 of 47 districts with institutions', 'প্রতিষ্ঠানসহ ৪৭টি জেলার ৬টি দেখানো হচ্ছে')}</span>` })}
</div>`;
  return page({ file: 'officials', title: ['Responsible officials', 'দায়িত্বপ্রাপ্ত কর্মকর্তা'], active: 'about', body });
}

// ================= ACADEMIC =================
function academic() {
  const cal = [['05 Jan 2027', ['Classes begin — semesters 1, 3, 5, 7', 'ক্লাস শুরু — ১ম, ৩য়, ৫ম, ৭ম সেমিস্টার']], ['21 Feb 2027', ['International Mother Language Day (holiday)', 'আন্তর্জাতিক মাতৃভাষা দিবস (ছুটি)']], ['15–25 Mar 2027', ['Mid-semester examinations', 'মধ্য-সেমিস্টার পরীক্ষা']], ['01–30 Jun 2027', ['Semester final examinations', 'সেমিস্টার সমাপনী পরীক্ষা']], ['31 Jul 2027', ['Result publication', 'ফলাফল প্রকাশ']]];
  const body = `${pageHero('tecn-museum.jpg', ['Textile museum, Textile Engineering College, Noakhali', 'টেক্সটাইল জাদুঘর, টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ, নোয়াখালী'], [[['Academic', 'একাডেমিক']]], t('Academic', 'একাডেমিক'), t('Programmes, technologies, curriculum, academic calendar and regulations of government textile institutions.', 'সরকারি টেক্সটাইল প্রতিষ্ঠানসমূহের প্রোগ্রাম, টেকনোলজি, কারিকুলাম, একাডেমিক ক্যালেন্ডার ও বিধিমালা।'))}
<div class="container f-sec">
  ${tabs('acad', [
    { id: 'programmes', l: ['Programmes', 'প্রোগ্রাম'], content: `<div class="f-prog-grid">${each(PROGRAMMES, (p, i) => `<article class="h-card f-prog"><p class="h-eyebrow">${tt(p.where)}</p><h3 class="h-h3">${tt(p.l)}</h3>
      <dl class="f-dl"><div><dt>${t('Duration', 'মেয়াদ')}</dt><dd>${tt(p.dur)}</dd></div><div><dt>${t('Entry requirement', 'ভর্তির যোগ্যতা')}</dt><dd>${tt(p.entry)}</dd></div><div><dt>${t('Institutions', 'প্রতিষ্ঠান')}</dt><dd>${n(CATEGORIES[i].v)}</dd></div></dl>
      <h4>${t('Technologies / departments', 'টেকনোলজি / বিভাগ')}</h4><ul class="f-chips">${each(p.tech, (x) => `<li>${tt(x)}</li>`)}</ul></article>`)}</div>
      <p class="f-chart-meta">${demo()} ${t('Programme list to be confirmed with the Department of Textiles', 'প্রোগ্রাম তালিকা বস্ত্র অধিদপ্তরের সাথে নিশ্চিত করতে হবে')} — ${tbd()}</p>` },
    { id: 'curriculum', l: ['Curriculum', 'কারিকুলাম'], content: `${table({ id: 'curr', cols: [{ l: ['Semester', 'সেমিস্টার'] }, { l: ['Core subjects (Diploma in Textile Engineering)', 'মূল বিষয় (ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং)'] }, { l: ['Credits', 'ক্রেডিট'], cls: 'num' }],
      rows: [['1', ['Textile Raw Materials, Engineering Drawing, Mathematics I', 'টেক্সটাইল কাঁচামাল, ইঞ্জিনিয়ারিং ড্রয়িং, গণিত ১'], '20'], ['2', ['Yarn Manufacturing I, Weaving I, Physics', 'ইয়ার্ন ম্যানুফ্যাকচারিং ১, উইভিং ১, পদার্থবিজ্ঞান'], '21'], ['3', ['Fabric Structure, Yarn Manufacturing II, Textile Mathematics', 'ফেব্রিক স্ট্রাকচার, ইয়ার্ন ম্যানুফ্যাকচারিং ২, টেক্সটাইল গণিত'], '22'], ['4', ['Knitting, Wet Processing I, Textile Testing', 'নিটিং, ওয়েট প্রসেসিং ১, টেক্সটাইল টেস্টিং'], '22']].map((r) => ({ cells: [n(r[0]), tt(r[1]), n(r[2])] })) })}
      <p class="f-chart-meta">${t('Excerpt. Full curriculum is published by the Bangladesh Technical Education Board.', 'আংশিক। সম্পূর্ণ কারিকুলাম বাংলাদেশ কারিগরি শিক্ষা বোর্ড প্রকাশ করে।')} ${demo()}</p>` },
    { id: 'calendar', l: ['Academic calendar', 'একাডেমিক ক্যালেন্ডার'], content: `<ul class="h-keydates f-cal">${each(cal, ([dt, l]) => `<li><time>${d(dt)}</time><span>${tt(l)}</span></li>`)}</ul><p><a class="h-arrow-link" href="notice-detail.html">${t('Academic calendar 2027 notice (PDF)', 'একাডেমিক ক্যালেন্ডার ২০২৭ নোটিশ (পিডিএফ)')}${icon('arrow-right', 'ico ico-sm')}</a></p>` },
    { id: 'regulations', l: ['Regulations', 'বিধিমালা'], content: `<ul class="f-docs">${each([[['Attendance policy: minimum 80% to sit semester examinations', 'হাজিরা নীতি: সেমিস্টার পরীক্ষায় অংশগ্রহণে ন্যূনতম ৮০%'], '120 KB'], [['Code of conduct for students', 'শিক্ষার্থীদের আচরণবিধি'], '210 KB'], [['Examination and result regulations', 'পরীক্ষা ও ফলাফল বিধিমালা'], '340 KB'], [['Credit transfer and programme transfer rules', 'ক্রেডিট ও প্রোগ্রাম পরিবর্তন বিধি'], '160 KB']], ([l, s]) => `<li>${icon('file-text', 'ico')}<span><b>${tt(l)}</b><small>PDF · ${n(s)}</small></span><button type="button" class="btn btn-outline btn-sm" ${dl()}>${icon('download', 'ico ico-sm')}${t('Download', 'ডাউনলোড')}</button></li>`)}</ul>` },
  ])}
  <section class="f-sec">${secHead(['Institutions', 'প্রতিষ্ঠান'], t('Find an institution', 'প্রতিষ্ঠান খুঁজুন'), a('institutions.html', t('Open directory', 'ডিরেক্টরি খুলুন'), 'btn btn-primary'))}
    <div class="f-gal-row">${each(['lab-dti-computer.jpg', 'ev-dti-orientation.jpg', 'tecn-fabric-day.jpg'], (f) => { const g = GALLERY.find((x) => x.f === f); return `<figure>${photo(f, g.c)}<figcaption>${tt(g.c)}</figcaption></figure>`; })}</div></section>
</div>`;
  return page({ file: 'academic', title: ['Academic', 'একাডেমিক'], active: 'academic', body });
}

function institutions() {
  const body = `${pageHero('campus-gtec-blocks.jpg', ['Gopalganj Textile Engineering College', 'গোপালগঞ্জ টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], [[['Academic', 'একাডেমিক'], 'academic.html'], [['Institution directory', 'প্রতিষ্ঠান ডিরেক্টরি']]], t('Institution directory', 'প্রতিষ্ঠান ডিরেক্টরি'), t('Search government textile institutions by name, code, division or type.', 'নাম, কোড, বিভাগ বা ধরন অনুযায়ী সরকারি টেক্সটাইল প্রতিষ্ঠান খুঁজুন।'))}
<div class="container f-sec">
  ${table({ id: 'inst-dir', search: ['Institution name, code or district', 'প্রতিষ্ঠানের নাম, কোড বা জেলা'], cols: [{ l: ['Institution', 'প্রতিষ্ঠান'] }, { l: ['Type', 'ধরন'] }, { l: ['District / Division', 'জেলা / বিভাগ'] }, { l: ['Students', 'শিক্ষার্থী'], cls: 'num' }, {}],
    rows: INSTITUTIONS.map((x) => ({ cells: [`<b>${tt(x.n)}</b><small class="mono">${x.code}</small>`, tt(TYPES[x.type]), `${tt(x.dist)} · ${tt(x.div)}`, n(x.students), a('institution-profile.html', t('Profile', 'প্রোফাইল'), 'btn btn-outline btn-sm')] })),
    emptyMsg: ['No institution matches your search. Check the spelling or search by district.', 'অনুসন্ধানের সাথে কোনো প্রতিষ্ঠান মেলেনি। বানান যাচাই করুন বা জেলা দিয়ে খুঁজুন।'],
    foot: `<span>${t('Showing 12 of 59 institutions', '৫৯টির ১২টি প্রতিষ্ঠান দেখানো হচ্ছে')} · ${demo()}</span>` })}
</div>`;
  return page({ file: 'institutions', title: ['Institution directory', 'প্রতিষ্ঠান ডিরেক্টরি'], active: 'academic', body });
}

function institutionProfile() {
  const x = INSTITUTIONS[0];
  const body = `<section class="f-inst-head"><div class="container">
  <nav class="h-crumb f-crumb-dark"><a href="index.html">${t('Home', 'হোম')}</a><span>/</span><a href="institutions.html">${t('Institution directory', 'প্রতিষ্ঠান ডিরেক্টরি')}</a><span>/</span><span aria-current="page">${tt(x.n)}</span></nav>
  <p class="h-eyebrow">${tt(TYPES[x.type])} · ${x.code}</p><h1 class="h-display h-display-sm">${tt(x.n)}</h1><p>${tt(x.dist)}, ${tt(x.div)} ${t('Division', 'বিভাগ')} · ${t('Established 1978 (demo)', 'প্রতিষ্ঠা ১৯৭৮ (ডেমো)')}</p></div></section>
<div class="container f-sec f-prose-grid">
  <div>${card(t('At a glance', 'এক নজরে'), `<dl class="f-dl f-dl-4"><div><dt>${t('Students', 'শিক্ষার্থী')}</dt><dd>${n(x.students)}</dd></div><div><dt>${t('Teachers', 'শিক্ষক')}</dt><dd>${n(x.teachers)}</dd></div><div><dt>${t('Programmes', 'প্রোগ্রাম')}</dt><dd>${n(2)}</dd></div><div><dt>${t('Seats 2026–27', 'আসন ২০২৬–২৭')}</dt><dd>${n(240)}</dd></div></dl><p class="f-chart-meta">${demo()}</p>`)}
    ${card(t('Programmes offered', 'চালু প্রোগ্রাম'), `<ul class="f-list"><li>${t('Diploma in Textile Engineering — Textile Technology', 'ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং — টেক্সটাইল টেকনোলজি')}</li><li>${t('Diploma in Textile Engineering — Garments Design & Pattern Making', 'ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং — গার্মেন্টস ডিজাইন অ্যান্ড প্যাটার্ন মেকিং')}</li></ul>`)}
    ${card(t('Notices from this institution', 'এই প্রতিষ্ঠানের নোটিশ'), `<ul class="h-nlist">${each(NOTICES.slice(4, 7), (y) => `<li><a href="notice-detail.html"><time>${d(y.date.slice(0, 6))}</time><span>${tt(y.t)}</span></a></li>`)}</ul>`)}</div>
  <aside class="f-aside"><section class="h-aside-card">${icon('map-pin', 'ico ico-lg')}<h2 class="h-h4">${t('Contact', 'যোগাযোগ')}</h2><p>${t('Address and phone: published by the institution', 'ঠিকানা ও ফোন: প্রতিষ্ঠান কর্তৃক প্রকাশিত')} — ${tbd()}</p></section>
  <section class="h-aside-card">${icon('clipboard-list', 'ico ico-lg')}<h2 class="h-h4">${t('Admission', 'ভর্তি')}</h2><p>${t('This institution takes Diploma admissions through the central admission system.', 'এই প্রতিষ্ঠান কেন্দ্রীয় ভর্তি সিস্টেমের মাধ্যমে ডিপ্লোমায় ভর্তি নেয়।')}</p>${a('admissions.html', t('Admission information', 'ভর্তি তথ্য'), 'btn btn-outline btn-sm')}</section></aside>
</div>`;
  return page({ file: 'institution-profile', title: ['Institution profile', 'প্রতিষ্ঠান প্রোফাইল'], active: 'academic', body });
}

// ================= NOTICES =================
function notices() {
  const counts = Object.fromEntries(NOTICE_CATS.map((c) => [c.k, NOTICES.filter((x) => x.cat === c.k).length]));
  const p = NOTICES[0];
  const body = `${pageHero('campus-gtec-grounds.jpg', ['Campus, Gopalganj Textile Engineering College', 'ক্যাম্পাস, গোপালগঞ্জ টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], [[['Notice', 'নোটিশ']]], t('Notices and circulars', 'নোটিশ ও পরিপত্র'), t('Official notices of the Ministry of Textiles and Jute and the Department of Textiles.', 'বস্ত্র ও পাট মন্ত্রণালয় এবং বস্ত্র অধিদপ্তরের অফিসিয়াল নোটিশ।'))}
<div data-filter-scope>
<div class="h-tabbar"><div class="container h-tabbar-in">
  <div class="h-tabs h-tabs-lg" role="group" ${ta('aria-label', 'Filter by category', 'বিভাগ অনুযায়ী')}><button type="button" data-filter="all" aria-pressed="true">${t('All', 'সব')} (${n(NOTICES.length)})</button><button type="button" data-filter="urgent" aria-pressed="false">${t('Urgent', 'জরুরি')}</button>${each(NOTICE_CATS, (c) => `<button type="button" data-filter="${c.k}" aria-pressed="false">${tt(c.l)} (${n(counts[c.k])})</button>`)}</div>
  <form class="h-search" role="search" data-filter-form><label class="sr-only" for="nq">${t('Search notices', 'নোটিশ খুঁজুন')}</label>${icon('search', 'ico ico-sm')}<input id="nq" type="search" data-filter-q ${ta('placeholder', 'Search title or memo no.', 'শিরোনাম বা স্মারক নম্বর')}></form>
</div></div>
<div class="container h-not-grid">
  <section aria-labelledby="nl-t">
    <article class="h-pin"><div class="h-pin-date"><b>${n('14')}</b><span>${d('Oct')}</span><small>${n('2026')}</small></div>
      <div class="h-pin-body"><p class="h-pin-tags">${icon('pin', 'ico ico-sm')}${t('Pinned', 'পিন করা')} · ${catTag(p.cat)} · <span class="h-urgent">${t('Urgent', 'জরুরি')}</span></p><h2>${tt(p.t)}</h2><p>${tt(p.s)}</p>
      <div class="h-pin-act">${a('notice-detail.html', t('Read notice', 'নোটিশ পড়ুন'), 'btn btn-primary')}<button type="button" class="btn btn-outline" ${dl()}>${icon('download', 'ico ico-sm')}PDF · ${n(p.size)}</button></div></div></article>
    <div class="h-list-head"><h2 id="nl-t" class="h-h3">${t('All notices', 'সকল নোটিশ')}</h2><span class="muted"><span data-filter-count>${n(NOTICES.length)}</span> ${t('results', 'টি ফলাফল')}</span>
      <label class="h-year"><span>${t('Year', 'বছর')}</span><select data-filter-year>${opt('all', 'All', 'সব')}${opt('2026', '2026')}${opt('2025', '2025')}</select></label></div>
    <ul class="h-rows">${each(NOTICES, (x) => `<li data-cat="${x.cat}" data-year="2026" ${x.urgent ? 'data-urgent="1"' : ''}>
      <time class="h-row-date"><b>${n(x.date.slice(0, 2))}</b><span>${d(x.date.slice(3))}</span></time>
      <div class="h-row-body"><p class="h-row-meta">${catTag(x.cat)}${x.urgent ? ` · <span class="h-urgent">${t('Urgent', 'জরুরি')}</span>` : ''} · ${tt(AUTH[x.by])} · <span class="mono">${x.id}</span></p><h3><a href="notice-detail.html">${tt(x.t)}</a></h3><p>${tt(x.s)}</p></div>
      <button type="button" class="h-row-dl" ${dl()} ${ta('aria-label', 'Download PDF', 'পিডিএফ ডাউনলোড')}>${icon('file-down', 'ico')}<small>${n(x.size)}</small></button></li>`)}</ul>
    <div class="h-empty" data-filter-empty hidden>${icon('search-x', 'ico ico-xl')}<p><b>${t('No notice found', 'কোনো নোটিশ পাওয়া যায়নি')}</b><br>${t('There is no notice for the selected category and year. Change the filter or clear the search.', 'নির্বাচিত বিভাগ ও বছরে কোনো নোটিশ নেই। ফিল্টার পরিবর্তন করুন বা অনুসন্ধান মুছুন।')}</p></div>
    <nav class="h-pager" ${ta('aria-label', 'Pages', 'পাতা')}><span aria-current="page">${n(1)}</span><button type="button" ${act({ set: '_=1', toast: ['Archive pages load in production.', 'প্রোডাকশনে আর্কাইভ পাতা আসবে।'] })}>${n(2)}</button><button type="button" ${act({ set: '_=1', toast: ['Archive pages load in production.', 'প্রোডাকশনে আর্কাইভ পাতা আসবে।'] })}>${t('Next', 'পরের')}</button></nav>
  </section>
  <aside class="h-aside">
    <section><h2 class="h-h4">${t('Important dates', 'গুরুত্বপূর্ণ তারিখ')}</h2><ul class="h-keydates">${each([['19–22 Oct', ['Durga Puja holidays', 'দুর্গাপূজার ছুটি']], ['20 Oct', ['Diploma application closes', 'ডিপ্লোমা আবেদনের শেষ দিন']], ['05 Nov', ['Tender submission closes', 'দরপত্র দাখিলের শেষ দিন']], ['08 Nov', ['Admission test', 'ভর্তি পরীক্ষা']]], ([dt, l]) => `<li><time>${d(dt)}</time><span>${tt(l)}</span></li>`)}</ul></section>
    <section><h2 class="h-h4">${t('Archive', 'আর্কাইভ')}</h2><ul class="h-archive">${each([['October 2026', 'অক্টোবর ২০২৬', 8], ['September 2026', 'সেপ্টেম্বর ২০২৬', 4], ['August 2026', 'আগস্ট ২০২৬', 11]], ([e, b, c]) => `<li><button type="button" ${act({ set: '_=1', toast: ['Archive pages load in production.', 'প্রোডাকশনে আর্কাইভ পাতা আসবে।'] })}>${t(e, b)}<span>${n(c)}</span></button></li>`)}</ul></section>
    <section class="h-aside-card">${icon('mail-check', 'ico ico-lg')}<h2 class="h-h4">${t('Notice alerts', 'নোটিশ অ্যালার্ট')}</h2><p>${t('Receive admission and examination notices by SMS.', 'ভর্তি ও পরীক্ষার নোটিশ এসএমএসে পান।')}</p><button type="button" class="btn btn-outline btn-sm" ${act({ set: '_=1', toast: ['Subscription is confirmed by SMS in production.', 'প্রোডাকশনে এসএমএসে সাবস্ক্রিপশন নিশ্চিত হবে।'] })}>${t('Subscribe', 'সাবস্ক্রাইব')}</button></section>
  </aside>
</div></div>`;
  return page({ file: 'notices', title: ['Notices', 'নোটিশ'], active: 'notice', body });
}

function noticeDetail() {
  const x = NOTICES[0];
  const body = `<div class="container f-sec f-narrow">
  <nav class="h-crumb f-crumb-dark"><a href="index.html">${t('Home', 'হোম')}</a><span>/</span><a href="notices.html">${t('Notice', 'নোটিশ')}</a><span>/</span><span aria-current="page">${x.id}</span></nav>
  <article class="f-notice">
    <p class="h-pin-tags">${icon('pin', 'ico ico-sm')}${t('Pinned', 'পিন করা')} · ${catTag(x.cat)} · <span class="h-urgent">${t('Urgent', 'জরুরি')}</span></p>
    <h1 class="h-h2">${tt(x.t)}</h1>
    <dl class="f-dl f-dl-4"><div><dt>${t('Memo no.', 'স্মারক নং')}</dt><dd class="mono">${x.id}</dd></div><div><dt>${t('Date', 'তারিখ')}</dt><dd>${d(x.date)}</dd></div><div><dt>${t('Issued by', 'জারিকারী')}</dt><dd>${tt(AUTH[x.by])}</dd></div><div><dt>${t('Valid until', 'মেয়াদ')}</dt><dd>${d('20 Oct 2026')}</dd></div></dl>
    <div class="f-notice-body"><p>${tt(x.s)}</p><p>${t('Candidates must upload a recent photograph and SSC/equivalent certificate. Applications with missing documents will be marked incomplete. For assistance, contact the help desk at 16xxx.', 'প্রার্থীদের সাম্প্রতিক ছবি ও এসএসসি/সমমান সনদ আপলোড করতে হবে। কাগজপত্র অসম্পূর্ণ থাকলে আবেদন অসম্পূর্ণ হিসেবে চিহ্নিত হবে। সহায়তার জন্য হেল্প ডেস্ক ১৬xxx-এ যোগাযোগ করুন।')}</p>
      <p class="f-sign">${t('Director (Education), Department of Textiles', 'পরিচালক (শিক্ষা), বস্ত্র অধিদপ্তর')}</p></div>
    <div class="f-attach">${icon('file-text', 'ico ico-xl')}<div><b>${x.id.replace(/\//g, '-')}.pdf</b><small>PDF · ${n(x.size)} · ${t('2 pages', '২ পৃষ্ঠা')}</small></div><button type="button" class="btn btn-primary btn-sm" ${dl()}>${icon('download', 'ico ico-sm')}${t('Download', 'ডাউনলোড')}</button></div>
    <nav class="f-prevnext"><span class="muted">${t('Previous: none (latest notice)', 'আগের: নেই (সর্বশেষ নোটিশ)')}</span><a class="h-arrow-link" href="notices.html">${t('Next', 'পরের')}: ${tt(NOTICES[1].t)}${icon('arrow-right', 'ico ico-sm')}</a></nav>
  </article>
  <section class="f-sec"><h2 class="h-h3">${t('Related notices', 'সম্পর্কিত নোটিশ')}</h2><ul class="h-news-list">${each([NOTICES[1], NOTICES[10]], noticeRow)}</ul><a class="btn btn-outline" href="notices.html">${t('Back to all notices', 'সকল নোটিশে ফিরুন')}</a></section>
</div>`;
  return page({ file: 'notice-detail', title: ['Notice detail', 'নোটিশ বিস্তারিত'], active: 'notice', body });
}

// ================= GALLERY / HELP / VERIFY =================
function gallery() {
  const body = `${pageHero('campus-gtec-panorama.jpg', ['Campus panorama, Gopalganj Textile Engineering College', 'ক্যাম্পাস প্যানোরামা, গোপালগঞ্জ টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], [[['About Us', 'আমাদের সম্পর্কে'], 'about.html'], [['Photo gallery', 'ফটো গ্যালারি']]], t('Photo gallery', 'ফটো গ্যালারি'), t('Campuses, laboratories, academic events and student activities of government textile institutions.', 'সরকারি টেক্সটাইল প্রতিষ্ঠানের ক্যাম্পাস, ল্যাবরেটরি, একাডেমিক অনুষ্ঠান ও শিক্ষার্থী কার্যক্রম।'))}
<div class="container f-sec"><ul class="f-gallery">${each(GALLERY, (g) => `<li><button type="button" data-lightbox>${photo(g.f, g.c)}</button><p><b>${tt(g.c)}</b><small>${t('Source', 'উৎস')}: ${esc(g.src)}</small></p></li>`)}</ul>
<p class="f-chart-meta">${t('Photographs from official institution websites, used for prototype review. See IMAGE_SOURCES.md.', 'অফিসিয়াল প্রতিষ্ঠানের ওয়েবসাইট থেকে নেওয়া ছবি, প্রোটোটাইপ পর্যালোচনার জন্য ব্যবহৃত। IMAGE_SOURCES.md দেখুন।')}</p></div>`;
  return page({ file: 'gallery', title: ['Photo gallery', 'ফটো গ্যালারি'], active: 'about', body });
}

function help() {
  const docs = [[['Admission guideline 2026–27', 'ভর্তি নির্দেশিকা ২০২৬–২৭'], '640 KB'], [['Student service request forms (offline)', 'শিক্ষার্থী সেবা আবেদন ফরম (অফলাইন)'], '320 KB'], [['Leave application form', 'ছুটির আবেদন ফরম'], '84 KB'], [['Certificate application form', 'সনদের আবেদন ফরম'], '96 KB'], [['Licence application guideline (Phase 2)', 'লাইসেন্স আবেদন নির্দেশিকা (২য় পর্যায়)'], '410 KB']];
  const body = `${pageHero('lab-dti-computer.jpg', ['Computer laboratory, Dinajpur Textile Institute', 'কম্পিউটার ল্যাবরেটরি, দিনাজপুর টেক্সটাইল ইনস্টিটিউট'], [[['Help', 'সহায়তা']]], t('Help desk', 'হেল্প ডেস্ক'), t('Guides, tutorials, forms and contact for all users of the system.', 'সিস্টেমের সকল ব্যবহারকারীর জন্য নির্দেশিকা, টিউটোরিয়াল, ফরম ও যোগাযোগ।'))}
<div class="container f-sec">${helpTiles()}
  <section id="faq" class="f-sec"><h2 class="h-h3">${t('Frequently asked questions', 'সাধারণ জিজ্ঞাসা')}</h2><div class="h-faq f-faq">${each(FAQ, (f) => `<details><summary>${tt(f.q)}<span class="h-plus" aria-hidden="true"></span></summary><p>${tt(f.a)}</p></details>`)}
    <details><summary>${t('Where do teachers sign in?', 'শিক্ষকরা কোথায় লগইন করবেন?')}<span class="h-plus" aria-hidden="true"></span></summary><p>${t('On this website: Login → Teacher. Students use Login → Student, candidates sign in from Admissions, and officials use their Government Portal.', 'এই ওয়েবসাইটে: লগইন → শিক্ষক। শিক্ষার্থীরা লগইন → শিক্ষার্থী ব্যবহার করে, প্রার্থীরা ভর্তি অংশ থেকে লগইন করে, আর কর্মকর্তারা নিজ সরকারি পোর্টাল ব্যবহার করেন।')}</p></details></div></section>
  <section id="guides" class="f-sec"><h2 class="h-h3">${t('User guides', 'ব্যবহার নির্দেশিকা')}</h2><ul class="f-docs">${each([['Candidate', 'প্রার্থী'], ['Student', 'শিক্ষার্থী'], ['Teacher', 'শিক্ষক'], ['Principal / Institution Admin', 'অধ্যক্ষ / প্রতিষ্ঠান অ্যাডমিন'], ['Division / District / Ministry officials', 'বিভাগ / জেলা / মন্ত্রণালয় কর্মকর্তা']], (r) => `<li>${icon('book-open', 'ico')}<span><b>${t(`User guide — ${r[0]}`, `ব্যবহার নির্দেশিকা — ${r[1]}`)}</b><small>PDF · ${n('1.6 MB')}</small></span><button type="button" class="btn btn-outline btn-sm" ${dl()}>${icon('download', 'ico ico-sm')}${t('Download', 'ডাউনলোড')}</button></li>`)}</ul></section>
  <section id="videos" class="f-sec"><h2 class="h-h3">${t('Video tutorials (Bangla)', 'ভিডিও টিউটোরিয়াল (বাংলা)')}</h2><ul class="f-videos">${each([[['How to apply for admission online', 'কীভাবে অনলাইনে ভর্তির আবেদন করবেন'], '4:20'], [['How to pay fees online', 'কীভাবে অনলাইনে ফি পরিশোধ করবেন'], '3:05'], [['Taking attendance (teachers)', 'হাজিরা নেওয়া (শিক্ষক)'], '2:40'], [['Submitting a service request (students)', 'সেবার আবেদন জমা (শিক্ষার্থী)'], '3:30']], ([l, m]) => `<li><button type="button" ${act({ set: '_=1', toast: ['Videos play from the official channel in production.', 'প্রোডাকশনে অফিসিয়াল চ্যানেল থেকে ভিডিও চলবে।'] })}><span class="f-vid">${icon('circle-play', 'ico ico-xl')}</span><b>${tt(l)}</b><small>${n(m)}</small></button></li>`)}</ul></section>
  <section id="downloads" class="f-sec"><h2 class="h-h3">${t('Forms and downloads', 'ফরম ও ডাউনলোড')}</h2><ul class="f-docs">${each(docs, ([l, s]) => `<li>${icon('file-down', 'ico')}<span><b>${tt(l)}</b><small>PDF · ${n(s)}</small></span><button type="button" class="btn btn-outline btn-sm" ${dl()}>${icon('download', 'ico ico-sm')}${t('Download', 'ডাউনলোড')}</button></li>`)}</ul></section>
  <section id="contact" class="f-sec f-contact"><div><h2 class="h-h3">${t('Contact the help desk', 'হেল্প ডেস্কে যোগাযোগ')}</h2>
    <dl class="f-dl"><div><dt>${t('Phone', 'ফোন')}</dt><dd>${n(ORG.helpline)}</dd></div><div><dt>${t('Email', 'ইমেইল')}</dt><dd>${ORG.email}</dd></div><div><dt>${t('Hours', 'সময়')}</dt><dd>${t('Sunday–Thursday, 9:00–17:00', 'রবিবার–বৃহস্পতিবার, ৯:০০–১৭:০০')}</dd></div><div><dt>${t('Office', 'অফিস')}</dt><dd>${tt(ORG.dept)} — ${tbd()}</dd></div></dl></div>
    <form class="h-form f-card-form" data-flow ${act({ set: '_=1', toast: ['Your query has been received. Reference: HD-2026-10482.', 'আপনার প্রশ্ন গৃহীত হয়েছে। রেফারেন্স: HD-2026-10482।'] })} novalidate><h3>${t('Send a query', 'প্রশ্ন পাঠান')}</h3>
      ${field({ l: ['Name', 'নাম'], name: 'nm', req: true })}${field({ l: ['Mobile', 'মোবাইল'], name: 'mb', req: true, attrs: 'inputmode="tel" data-pattern="^01[3-9]\\d{8}$"', hint: ['11 digits, e.g. 01711000000', '১১ সংখ্যা, যেমন 01711000000'] })}
      ${field({ l: ['Topic', 'বিষয়'], name: 'tp', opts: [['adm', 'Admission', 'ভর্তি'], ['stu', 'Student services', 'শিক্ষার্থী সেবা'], ['lic', 'Licence', 'লাইসেন্স'], ['oth', 'Other', 'অন্যান্য']] })}${field({ l: ['Message', 'বার্তা'], name: 'msg', rows: 3, req: true })}
      <button type="submit" class="btn btn-primary">${t('Submit', 'জমা দিন')}</button></form></section>
</div>`;
  return page({ file: 'help', title: ['Help', 'সহায়তা'], active: 'help', body });
}

function verify() {
  const body = `${pageHero('campus-gtec-academic.jpg', ['Academic building, Gopalganj Textile Engineering College', 'একাডেমিক ভবন, গোপালগঞ্জ টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], [[['Results / Verification', 'ফলাফল / যাচাই']]], t('Results and verification', 'ফলাফল ও যাচাই'), t('Check admission results and verify certificates issued through the system.', 'ভর্তির ফলাফল দেখুন এবং সিস্টেমের মাধ্যমে ইস্যুকৃত সনদ যাচাই করুন।'))}
<div class="container f-sec f-verify-grid">
  <section class="h-card" id="cert-verify"><h2 class="h-h3">${t('Verify a certificate', 'সনদ যাচাই')}</h2>
    <p class="muted">${t('Enter the certificate number printed on the certificate.', 'সনদে মুদ্রিত সনদ নম্বর লিখুন।')}</p>
    <form class="h-form" data-lookup="cert-verify" data-lookup-map='{"CERT-2025-00481":"valid","CERT-2024-00113":"revoked"}' novalidate>
      ${field({ l: ['Certificate number', 'সনদ নম্বর'], name: 'c', req: true, value: 'CERT-2025-00481', hint: ['Try CERT-2025-00481 (valid), CERT-2024-00113 (revoked) or any other number.', 'CERT-2025-00481 (বৈধ), CERT-2024-00113 (বাতিল) বা অন্য যেকোনো নম্বর দিয়ে দেখুন।'] })}
      <button type="submit" class="btn btn-primary">${icon('shield-check', 'ico ico-sm')}${t('Verify', 'যাচাই করুন')}</button></form>
    <div data-lookup-res="valid" hidden>${alert('ok', t('Valid certificate', 'বৈধ সনদ'), t('Rafiul Alam · Diploma in Textile Engineering · Karnaphuli Textile Institute · Issued 12 Mar 2026', 'রাফিউল আলম · ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং · কর্ণফুলী টেক্সটাইল ইনস্টিটিউট · ইস্যু ১২ মার্চ ২০২৬'))}</div>
    <div data-lookup-res="revoked" hidden>${alert('danger', t('Certificate revoked', 'সনদ বাতিল'), t('This certificate was revoked on 03 Feb 2025 and replaced by a duplicate certificate. Contact the issuing institution.', 'এই সনদ ০৩ ফেব্রুয়ারি ২০২৫ তারিখে বাতিল হয়ে অনুলিপি দ্বারা প্রতিস্থাপিত হয়েছে। ইস্যুকারী প্রতিষ্ঠানে যোগাযোগ করুন।'))}</div>
    <div data-lookup-res="none" hidden>${alert('warn', t('No record found', 'কোনো রেকর্ড পাওয়া যায়নি'), t('Check the number and try again. Certificates issued before the system was introduced may not be listed.', 'নম্বরটি যাচাই করে আবার চেষ্টা করুন। সিস্টেম চালুর আগে ইস্যুকৃত সনদ তালিকায় না-ও থাকতে পারে।'))}</div>
    <p class="f-note">${icon('info', 'ico ico-sm')}${t('Employers and organisations can register for licence and certificate verification.', 'নিয়োগকর্তা ও প্রতিষ্ঠান লাইসেন্স ও সনদ যাচাইয়ের জন্য নিবন্ধন করতে পারে।')} <a class="link" href="verifier.html">${t('Organisation verification', 'প্রতিষ্ঠানের যাচাই')}</a></p></section>
  <section class="h-card"><h2 class="h-h3">${t('Admission result', 'ভর্তির ফলাফল')}</h2><p class="muted">${t('Diploma 2026–27 results will be published on 25 November 2026.', 'ডিপ্লোমা ২০২৬–২৭-এর ফলাফল ২৫ নভেম্বর ২০২৬ তারিখে প্রকাশিত হবে।')}</p>${a('admission-result.html', t('Check admission result', 'ভর্তির ফলাফল দেখুন'), 'btn btn-outline')}
    <h2 class="h-h3 f-mt">${t('Semester results', 'সেমিস্টার ফলাফল')}</h2><p class="muted">${t('Students view semester results in the student portal.', 'শিক্ষার্থীরা স্টুডেন্ট পোর্টালে সেমিস্টার ফলাফল দেখে।')}</p>${a('login.html', t('Login', 'লগইন'), 'btn btn-teal')}
    <h2 class="h-h3 f-mt">${t('Professional licence', 'পেশাগত লাইসেন্স')}</h2><p class="muted">${t('Licence verification is available to registered organisations (Phase 2).', 'নিবন্ধিত প্রতিষ্ঠানের জন্য লাইসেন্স যাচাই (২য় পর্যায়)।')}</p>${a('license.html', t('Professional licence', 'পেশাগত লাইসেন্স'), 'btn btn-outline')}</section>
</div>`;
  return page({ file: 'verify', title: ['Results / Verification', 'ফলাফল / যাচাই'], body });
}

// ================= PUBLIC DASHBOARD =================
function publicDashboard() {
  const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026'];
  const body = `<div class="container f-sec">
  <nav class="h-crumb f-crumb-dark"><a href="index.html">${t('Home', 'হোম')}</a><span>/</span><span aria-current="page">${t('Public dashboard', 'পাবলিক ড্যাশবোর্ড')}</span></nav>
  <div class="f-pd-head"><div><h1 class="h-h2">${t('Public dashboard', 'পাবলিক ড্যাশবোর্ড')}</h1><p class="muted">${t('Aggregate figures only. No personal data is published.', 'শুধু সমষ্টিগত তথ্য। কোনো ব্যক্তিগত তথ্য প্রকাশ করা হয় না।')}</p></div>
    <form class="f-filterbar" data-flow ${act({ set: '_=1', toast: ['Filters apply to all charts in production. Prototype shows national figures.', 'প্রোডাকশনে ফিল্টার সব চার্টে প্রযোজ্য হবে। প্রোটোটাইপে জাতীয় তথ্য দেখানো হয়েছে।'] })} novalidate>
      ${field({ l: ['Division', 'বিভাগ'], name: 'dv', opts: [['all', 'All divisions', 'সব বিভাগ'], ...DIVISIONS.map((v) => [v.id, v.n[0], v.n[1]])] })}${field({ l: ['Session', 'সেশন'], name: 'yr', opts: [['2026', '2026–27', '২০২৬–২৭'], ['2025', '2025–26', '২০২৫–২৬']] })}<button type="submit" class="btn btn-primary">${t('Apply', 'প্রয়োগ')}</button></form></div>
  <div class="f-ins-cards">${each([['campus-gtec-panorama.jpg', '59', ['Institutions', 'প্রতিষ্ঠান'], [[['Textile Engineering Colleges', 'টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], '8'], [['Textile Institutes', 'টেক্সটাইল ইনস্টিটিউট'], '10'], [['Textile Vocational Institutes', 'টেক্সটাইল ভোকেশনাল ইনস্টিটিউট'], '41']]], ['ev-gtec-seminar.jpg', '2,146', ['Teachers / Instructors', 'শিক্ষক / ইন্সট্রাক্টর'], [[['Male', 'পুরুষ'], '64.2%'], [['Female', 'নারী'], '35.8%']]], ['ev-dti-assembly.jpg', '38,420', ['Students', 'শিক্ষার্থী'], [[['Male', 'পুরুষ'], '58.6%'], [['Female', 'নারী'], '41.4%']]]], ([img, v, l, rows]) => `<article class="f-ic">${photo(img, l, 'f-ic-img')}<div class="f-ic-in"><b>${n(v)}</b><h3>${tt(l)}</h3><dl>${each(rows, ([k, x]) => `<div><dt>${tt(k)}</dt><dd>${n(x)}</dd></div>`)}</dl></div></article>`)}</div>
  <p class="f-chart-meta">${t('As per academic session 2026–27', 'একাডেমিক সেশন ২০২৬–২৭ অনুযায়ী')} · ${t('Last updated: 15 October 2026', 'সর্বশেষ হালনাগাদ: ১৫ অক্টোবর ২০২৬')} · ${demo()}</p>
  <h2 class="f-rule"><span>${t('Dashboard', 'ড্যাশবোর্ড')}</span></h2>
  <div class="f-pd-grid">
    ${card(t('Student enrolment trend', 'শিক্ষার্থী ভর্তির প্রবণতা'), `${lineChart({ labels: years, series: [{ name: ['Students enrolled', 'অধ্যয়নরত শিক্ষার্থী'], data: [29.8, 31.2, 32.0, 33.9, 35.6, 37.1, 38.4] }], min: 28, max: 40, unit: 'k', aria: 'Students enrolled 2020 to 2026, rising from 29,800 to 38,400' })}${chartMeta(['thousand students', 'হাজার শিক্ষার্থী'], ['2020–2026', '২০২০–২০২৬'])}`, '', 'f-span-2')}
    ${card(t('Institutions by type', 'ধরন অনুযায়ী প্রতিষ্ঠান'), `${donut({ parts: CATEGORIES.map((c) => ({ l: c.l, v: c.v })), total: '59', center: 'TOTAL' })}${chartMeta(['institutions', 'প্রতিষ্ঠান'], ['2026–27', '২০২৬–২৭'])}`)}
    ${card(t('Students by division and gender', 'বিভাগ ও লিঙ্গভিত্তিক শিক্ষার্থী'), `${groupedBars({ labels: DIVISIONS.map((v) => v.n[0].slice(0, 3)), series: [{ name: ['Male', 'পুরুষ'], data: [5760, 3590, 3050, 2570, 1730, 1250, 2720, 1830] }, { name: ['Female', 'নারী'], data: [4080, 2530, 2160, 1810, 1230, 890, 1930, 1290] }], max: 6000, aria: 'Students by division, male and female' })}${chartMeta(['students', 'শিক্ষার্থী'], ['2026–27', '২০২৬–২৭'])}`, '', 'f-span-2')}
    ${card(t('Average student attendance by division', 'বিভাগভিত্তিক গড় শিক্ষার্থী উপস্থিতি'), `${hbars([...DIVISIONS].sort((x, y) => y.att - x.att).map((v) => ({ l: v.n, v: v.att })), { max: 100, unit: '%', threshold: 80 })}${chartMeta(['percent; marker = 80% requirement', 'শতাংশ; চিহ্ন = ৮০% প্রয়োজনীয়তা'], ['September 2026', 'সেপ্টেম্বর ২০২৬'])}`)}
    ${card(t('Enrolment by programme', 'প্রোগ্রামভিত্তিক শিক্ষার্থী'), `${table({ id: 'pd-prog', compact: true, cols: [{ l: ['Programme', 'প্রোগ্রাম'] }, { l: ['Institutions', 'প্রতিষ্ঠান'], cls: 'num' }, { l: ['Students', 'শিক্ষার্থী'], cls: 'num' }, { l: ['Female %', 'নারী %'], cls: 'num' }], rows: [[PROGRAMMES[0].l, '8', '7,420', '29.4%'], [PROGRAMMES[1].l, '10', '12,880', '38.1%'], [PROGRAMMES[2].l, '41', '18,120', '47.9%']].map((r) => ({ cells: [tt(r[0]), n(r[1]), n(r[2]), n(r[3])] })) })}${chartMeta(['students', 'শিক্ষার্থী'], ['2026–27', '২০২৬–২৭'])}`)}
    ${card(t('Graduates by year', 'বছরভিত্তিক উত্তীর্ণ'), `${table({ id: 'pd-grad', compact: true, cols: [{ l: ['Year', 'বছর'] }, { l: ['Graduates', 'উত্তীর্ণ'], cls: 'num' }, { l: ['Certificates issued online', 'অনলাইনে সনদ ইস্যু'], cls: 'num' }], rows: [['2023', '5,980', '—'], ['2024', '6,402', '1,120'], ['2025', '6,815', '6,815']].map((r) => ({ cells: [n(r[0]), n(r[1]), n(r[2])] })) })}${chartMeta(['persons', 'জন'], ['2023–2025', '২০২৩–২০২৫'])}`)}
  </div>
</div>`;
  return page({ file: 'public-dashboard', title: ['Public dashboard', 'পাবলিক ড্যাশবোর্ড'], body });
}

export default { index: home, about, officials, academic, institutions, 'institution-profile': institutionProfile, notices, 'notice-detail': noticeDetail, gallery, help, verify, 'public-dashboard': publicDashboard };
