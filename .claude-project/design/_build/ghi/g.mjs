// Variation G — Public Service First.
// Public site: IPEMIS structure + BIDA-style service finder. Internal: top navigation, no sidebar,
// "what do I need to do now?" task cards first, then figures.
import { t, tt, n, d, ta, icon, img, each, esc, opt } from './lib.mjs';
import { page, href, p2, toast, langSwitch, demoTag, mark, govSeal, file } from './shared.mjs';
import {
  ORG, PUBLIC_NAV, STATS, ADMISSION, NOTICES, NOTICE_CATS, catLabel, AUTH, SERVICES, GALLERY, FAQ, HELP, PORTALS,
  DIVISIONS, MIN, PRIN, TEACH, STU, STATUS, TODAY, UPDATED, CATEGORIES,
} from './data.mjs';

const V = 'g';

// ---------- public chrome ----------
function navHref(item, onLanding) {
  if (item.href) return `href="${file(V, item.href)}"`;
  if (item.anchor) return `href="${onLanding ? '' : file(V, '01-landing')}#${item.anchor}"`;
  return null;
}
function publicHeader(active, onLanding = false) {
  const items = PUBLIC_NAV.map((it) => {
    const h = navHref(it, onLanding);
    const cur = it.key === active ? 'aria-current="page"' : '';
    return h ? `<li><a ${h} ${cur}>${tt(it.label)}</a></li>`
      : `<li><button type="button" ${p2(it.label[0], it.label[1])}>${tt(it.label)}</button></li>`;
  }).join('');
  return `
<div class="g-gov">
  <div class="container g-gov-in">
    <p class="g-gov-id">${govSeal('seal')}<span>${tt(ORG.gov)}</span><span class="g-dot" aria-hidden="true"></span><span class="g-hide-sm">${tt(ORG.ministry)}</span></p>
    <div class="g-gov-tools">
      <a class="g-hide-sm" href="tel:16000">${icon('headset', 'ico ico-sm')}${t('Help desk', 'হেল্প ডেস্ক')} <b>${n(ORG.helpline)}</b></a>
      <div class="g-size g-hide-sm" role="group" ${ta('aria-label', 'Text size', 'লেখার আকার')}>
        <button type="button" data-textsize="-1" ${ta('aria-label', 'Smaller text', 'ছোট লেখা')}>A−</button><button type="button" data-textsize="0" ${ta('aria-label', 'Default text size', 'স্বাভাবিক লেখা')}>A</button><button type="button" data-textsize="1" ${ta('aria-label', 'Larger text', 'বড় লেখা')}>A+</button>
      </div>
      ${langSwitch('lang g-lang')}
    </div>
  </div>
</div>
<header class="g-head">
  <div class="container g-head-in">
    <a class="g-brand" ${href(V, '01-landing')}>${mark()}<span><b>${tt(ORG.product)}</b><small>${tt(ORG.dept)} · ${tt(ORG.ministry)}</small></span></a>
    <nav class="g-nav" id="g-nav" ${ta('aria-label', 'Main', 'প্রধান মেনু')}><ul>${items}</ul></nav>
    <div class="g-head-act">
      <button type="button" class="g-icon-btn" data-open="dlg-search" ${ta('aria-label', 'Search', 'অনুসন্ধান')}>${icon('search')}</button>
      <a class="btn btn-primary" ${href(V, '03-login')}>${icon('log-in', 'ico ico-sm')}${t('Login', 'লগইন')}</a>
      <button type="button" class="g-icon-btn g-menu-btn" data-menu="g-nav" aria-expanded="false" ${ta('aria-label', 'Menu', 'মেনু')}>${icon('menu')}</button>
    </div>
  </div>
</header>
<dialog id="dlg-search" class="dlg dlg-wide" aria-labelledby="dlg-search-t">
  <div class="dlg-head"><h2 id="dlg-search-t">${t('Search the website', 'ওয়েবসাইটে খুঁজুন')}</h2><button type="button" class="dlg-x" data-close ${ta('aria-label', 'Close', 'বন্ধ করুন')}>${icon('x')}</button></div>
  <form class="dlg-body" data-search-demo="Search results open in the full prototype (Phase 2).|অনুসন্ধানের ফলাফল পূর্ণ প্রোটোটাইপে (দ্বিতীয় পর্যায়) খুলবে।">
    <label class="fld"><span class="sr-only">${t('Search', 'অনুসন্ধান')}</span><input type="search" ${ta('placeholder', 'Institutions, services, notices…', 'প্রতিষ্ঠান, সেবা, নোটিশ…')}></label>
    <p class="muted">${t('Popular:', 'জনপ্রিয়:')} <a class="link" ${href(V, '02-notices')}>${t('Admission result', 'ভর্তির ফলাফল')}</a> · <a class="link" href="#services">${t('Verify a certificate', 'সনদ যাচাই')}</a> · <a class="link" ${href(V, '03-login')}>${t('Track application', 'আবেদনের অবস্থা')}</a></p>
    <div class="dlg-foot"><button type="submit" class="btn btn-primary">${icon('search', 'ico ico-sm')}${t('Search', 'খুঁজুন')}</button></div>
  </form>
</dialog>`;
}

function publicFooter() {
  const col = (h, links) => `<div><h3>${tt(h)}</h3><ul>${links.join('')}</ul></div>`;
  const a = (l, attr) => `<li><a ${attr}>${tt(l)}</a></li>`;
  const b = (l) => `<li><button type="button" ${p2(l[0], l[1])}>${tt(l)}</button></li>`;
  return `
<footer class="g-foot">
  <div class="container g-foot-grid">
    <div class="g-foot-brand">
      <a class="g-brand g-brand-inv" ${href(V, '01-landing')}>${mark()}<span><b>${tt(ORG.product)}</b><small>${tt(ORG.dept)}</small></span></a>
      <p>${t('A service of the Department of Textiles under the Ministry of Textiles and Jute, connecting 59 textile institutions with the Ministry and the public.', 'বস্ত্র ও পাট মন্ত্রণালয়ের অধীন বস্ত্র অধিদপ্তরের একটি সেবা, যা ৫৯টি টেক্সটাইল প্রতিষ্ঠানকে মন্ত্রণালয় ও জনগণের সঙ্গে যুক্ত করে।')}</p>
      <p class="g-foot-contact"><span>${icon('headset', 'ico ico-sm')}${t('Help desk', 'হেল্প ডেস্ক')}: <b>${n(ORG.helpline)}</b></span><span>${icon('mail', 'ico ico-sm')}${ORG.email}</span></p>
    </div>
    ${col(['About', 'সম্পর্কে'], [b(['About the system', 'সিস্টেম সম্পর্কে']), b(['Institutions', 'প্রতিষ্ঠানসমূহ']), a(['Public dashboard', 'পাবলিক ড্যাশবোর্ড'], `href="${file(V, '01-landing')}#insights"`), b(['Citizen charter', 'সিটিজেন চার্টার'])])}
    ${col(['Services', 'সেবা'], [a(['Admissions', 'ভর্তি'], `href="${file(V, '01-landing')}#admissions"`), a(['Track application', 'আবেদনের অবস্থা'], href(V, '03-login')), b(['Verify a certificate', 'সনদ যাচাই']), b(['Forms and guides', 'ফরম ও নির্দেশিকা'])])}
    ${col(['Notices', 'নোটিশ'], [a(['All notices', 'সকল নোটিশ'], href(V, '02-notices')), a(['Admission notices', 'ভর্তি নোটিশ'], href(V, '02-notices')), a(['Examination & result', 'পরীক্ষা ও ফলাফল'], href(V, '02-notices')), a(['Tenders', 'দরপত্র'], href(V, '02-notices'))])}
    ${col(['Important links', 'গুরুত্বপূর্ণ লিংক'], [b(['Ministry of Textiles and Jute', 'বস্ত্র ও পাট মন্ত্রণালয়']), b(['Department of Textiles', 'বস্ত্র অধিদপ্তর']), b(['Bangladesh Technical Education Board', 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড']), b(['National portal', 'জাতীয় তথ্য বাতায়ন'])])}
  </div>
  <div class="g-foot-bar"><div class="container g-foot-bar-in">
    <p>© 2026 ${tt(ORG.dept)}, ${tt(ORG.ministry)}. ${t('Last updated', 'সর্বশেষ হালনাগাদ')}: ${d(UPDATED)}</p>
    <p>${t('Photos: Wikimedia Commons (CC BY / CC BY-SA / CC0), illustrative only — see', 'ছবি: উইকিমিডিয়া কমন্স (CC BY / CC BY-SA / CC0), শুধু উদাহরণ হিসেবে — দেখুন')} <a href="../assets/ghi/img/CREDITS.json">${t('credits', 'কৃতজ্ঞতা')}</a></p>
  </div></div>
</footer>`;
}

const catTag = (k) => `<span class="g-cat g-cat-${k}">${tt(catLabel(k))}</span>`;

// ---------- 01 Landing ----------
function landing() {
  const finder = SERVICES.slice(0, 6);
  const body = `
${publicHeader('home', true)}
<main id="main">
  <section class="g-hero" aria-labelledby="g-hero-t">
    ${img('training-floor.jpg', ['Students in a textile training workshop', 'টেক্সটাইল প্রশিক্ষণ কর্মশালায় শিক্ষার্থীরা'], 'g-hero-img', 'loading="eager" fetchpriority="high"')}
    <div class="container g-hero-in">
      <p class="g-kicker">${tt(ORG.dept)} · ${tt(ORG.ministry)}</p>
      <h1 id="g-hero-t">${t('Textile education and public services, in one place', 'টেক্সটাইল শিক্ষা ও জনসেবা, এক জায়গায়')}</h1>
      <p class="g-hero-sub">${t('Find a textile institution, apply for admission, check results, verify a certificate and read official notices — from the Ministry down to every institute.', 'টেক্সটাইল প্রতিষ্ঠান খুঁজুন, ভর্তির আবেদন করুন, ফলাফল দেখুন, সনদ যাচাই করুন এবং অফিসিয়াল নোটিশ পড়ুন — মন্ত্রণালয় থেকে প্রতিটি প্রতিষ্ঠান পর্যন্ত।')}</p>
      <div class="g-hero-cta">
        <a class="btn btn-white btn-lg" href="#admissions">${icon('graduation-cap', 'ico')}${t('Admission information', 'ভর্তি তথ্য')}</a>
        <button type="button" class="btn btn-onimg btn-lg" ${p2('Institution directory', 'প্রতিষ্ঠান ডিরেক্টরি')}>${icon('school', 'ico')}${t('Explore institutions', 'প্রতিষ্ঠান দেখুন')}</button>
      </div>
    </div>
  </section>

  <section class="container g-finder" aria-labelledby="g-finder-t">
    <div class="g-finder-card">
      <div class="g-finder-top">
        <h2 id="g-finder-t">${t('What do you want to do today?', 'আজ আপনি কী করতে চান?')}</h2>
        <form class="g-finder-search" role="search" data-search-demo="Search results open in the full prototype (Phase 2).|অনুসন্ধানের ফলাফল পূর্ণ প্রোটোটাইপে (দ্বিতীয় পর্যায়) খুলবে।">
          ${icon('search', 'ico')}<label class="sr-only" for="g-q">${t('Search services', 'সেবা খুঁজুন')}</label>
          <input id="g-q" type="search" ${ta('placeholder', 'Search a service, institution or notice', 'সেবা, প্রতিষ্ঠান বা নোটিশ খুঁজুন')}>
          <button class="btn btn-teal" type="submit">${t('Search', 'খুঁজুন')}</button>
        </form>
      </div>
      <ul class="g-finder-grid">
        ${each(finder, (s) => { const inner = `<span class="g-svc-ico">${icon(s.icon, 'ico ico-lg')}</span><span><b>${tt(s.l)}</b><small>${tt(s.s)}</small></span>`;
          return `<li>${s.to ? `<a class="g-svc" ${href(V, s.to)}>${inner}</a>` : `<button type="button" class="g-svc" ${p2(s.l[0], s.l[1])}>${inner}</button>`}</li>`; })}
      </ul>
    </div>
  </section>

  <section class="g-stats" aria-labelledby="g-stats-t">
    <div class="container">
      <div class="g-sec-head g-center"><h2 id="g-stats-t">${t('Textile education at a glance', 'এক নজরে টেক্সটাইল শিক্ষা')}</h2>
        <p class="muted">${t('Session 2026–27', 'সেশন ২০২৬–২৭')} · ${t('Updated', 'হালনাগাদ')} ${d(UPDATED)} ${demoTag()}</p></div>
      <ul class="g-stat-grid">
        ${each(STATS, (s, i) => `<li class="g-stat g-stat-${i}"><span class="g-stat-ico">${icon(s.icon, 'ico ico-xl')}</span><b class="tnum">${n(s.v)}</b><span>${tt(s.l)}</span><small>${tt(s.s)}</small></li>`)}
      </ul>
    </div>
  </section>

  <section class="container g-about" aria-labelledby="g-about-t">
    <div class="g-about-media">
      ${img('weaving-lab.jpg', ['Weaving machines in an institute laboratory', 'ইনস্টিটিউটের ল্যাবে বয়ন যন্ত্র'], 'g-about-a')}
      ${img('fabric-day.jpg', ['Student fabric exhibition', 'শিক্ষার্থীদের ফেব্রিক প্রদর্শনী'], 'g-about-b')}
      <p class="g-about-badge"><b>${n('59')}</b><span>${t('institutions connected', 'প্রতিষ্ঠান যুক্ত')}</span></p>
    </div>
    <div class="g-about-text">
      <p class="g-eyebrow">${t('About the system', 'সিস্টেম সম্পর্কে')}</p>
      <h2 id="g-about-t">${t('One connected system for every textile institution', 'প্রতিটি টেক্সটাইল প্রতিষ্ঠানের জন্য একটি সংযুক্ত সিস্টেম')}</h2>
      <p>${t('The Textile Institution Management System links the Ministry, divisions, districts and all 59 government textile institutions. Admissions, attendance, results, finance and assets are recorded once and seen by everyone who needs them.', 'টেক্সটাইল প্রতিষ্ঠান ব্যবস্থাপনা সিস্টেম মন্ত্রণালয়, বিভাগ, জেলা ও ৫৯টি সরকারি টেক্সটাইল প্রতিষ্ঠানকে যুক্ত করে। ভর্তি, হাজিরা, ফলাফল, অর্থ ও সম্পদের তথ্য একবার লিপিবদ্ধ হয় এবং প্রয়োজনীয় সবাই তা দেখতে পান।')}</p>
      <ul class="g-points">
        <li>${icon('users', 'ico')}<span><b>${t('For the public', 'জনগণের জন্য')}</b>${t('Admissions, results, notices and certificate verification without visiting an office.', 'অফিসে না গিয়েই ভর্তি, ফলাফল, নোটিশ ও সনদ যাচাই।')}</span></li>
        <li>${icon('school', 'ico')}<span><b>${t('For institutions', 'প্রতিষ্ঠানের জন্য')}</b>${t('Teachers and students work online: classes, attendance, results and requests.', 'শিক্ষক ও শিক্ষার্থীরা অনলাইনে কাজ করেন: ক্লাস, হাজিরা, ফলাফল ও আবেদন।')}</span></li>
        <li>${icon('landmark', 'ico')}<span><b>${t('For the Ministry', 'মন্ত্রণালয়ের জন্য')}</b>${t('Live visibility from national level down to each institute, with approvals and reports.', 'জাতীয় স্তর থেকে প্রতিটি প্রতিষ্ঠান পর্যন্ত সরাসরি তথ্য, অনুমোদন ও প্রতিবেদন।')}</span></li>
      </ul>
      <button type="button" class="btn btn-outline" ${p2('About Us', 'আমাদের সম্পর্কে')}>${t('Read more about the system', 'সিস্টেম সম্পর্কে আরও পড়ুন')}${icon('arrow-right', 'ico ico-sm')}</button>
    </div>
  </section>

  <section class="g-services" id="services" aria-labelledby="g-svc-t">
    <div class="container">
      <div class="g-sec-head"><div><p class="g-eyebrow">${t('Public services', 'পাবলিক সেবা')}</p><h2 id="g-svc-t">${t('Online services for citizens, students and teachers', 'নাগরিক, শিক্ষার্থী ও শিক্ষকদের জন্য অনলাইন সেবা')}</h2></div></div>
      <ul class="g-svc-grid">
        ${each(SERVICES, (s) => `<li class="g-svc-card">
          <span class="g-svc-ico">${icon(s.icon, 'ico ico-lg')}</span>
          <h3>${tt(s.l)}</h3><p>${tt(s.s)}</p>
          ${s.to ? `<a class="link" ${href(V, s.to)}>${t('Start', 'শুরু করুন')}${icon('arrow-right', 'ico ico-sm')}</a>` : `<button type="button" class="link" ${p2(s.l[0], s.l[1])}>${t('Start', 'শুরু করুন')}${icon('arrow-right', 'ico ico-sm')}</button>`}
        </li>`)}
      </ul>
    </div>
  </section>

  <section class="container g-insights" id="insights" aria-labelledby="g-ins-t">
    <div class="g-ins-text">
      <p class="g-eyebrow">${t('Public dashboard', 'পাবলিক ড্যাশবোর্ড')}</p>
      <h2 id="g-ins-t">${t('Open data on textile education', 'টেক্সটাইল শিক্ষার উন্মুক্ত তথ্য')}</h2>
      <p>${t('See enrolment, institutions and attendance by division. Figures are aggregated: no personal data is shown publicly.', 'বিভাগভিত্তিক ভর্তি, প্রতিষ্ঠান ও উপস্থিতির তথ্য দেখুন। সব তথ্য সমষ্টিগত: কোনো ব্যক্তিগত তথ্য প্রকাশ করা হয় না।')}</p>
      <button type="button" class="btn btn-primary" ${p2('Public dashboard', 'পাবলিক ড্যাশবোর্ড')}>${icon('chart-column', 'ico ico-sm')}${t('View public insights', 'পাবলিক তথ্য দেখুন')}</button>
    </div>
    <div class="g-ins-card">
      <div class="g-ins-head"><h3>${t('Institutions by division', 'বিভাগভিত্তিক প্রতিষ্ঠান')}</h3>${demoTag()}</div>
      <ul class="g-ins-bars">
        ${each(DIVISIONS, (v) => `<li><span>${tt(v.n)}</span><span class="bar"><i style="width:${(v.inst / 13) * 100}%"></i></span><b class="tnum">${n(v.inst)}</b></li>`)}
      </ul>
      <div class="g-ins-foot">
        ${each(CATEGORIES, (c) => `<p><b class="tnum">${n(c.v)}</b><span>${tt(c.l)}</span></p>`)}
      </div>
    </div>
  </section>

  <section class="g-adm" id="admissions" aria-labelledby="g-adm-t">
    <div class="container">
      <div class="g-sec-head"><div><p class="g-eyebrow">${t('Admissions', 'ভর্তি')}</p><h2 id="g-adm-t">${t('Admission 2026–27: your path from applicant to student', 'ভর্তি ২০২৬–২৭: আবেদনকারী থেকে শিক্ষার্থী হওয়ার পথ')}</h2></div>
        <a class="link" ${href(V, '02-notices')}>${t('Admission notices', 'ভর্তি নোটিশ')}${icon('arrow-right', 'ico ico-sm')}</a></div>
      <ol class="g-journey">
        ${each(ADMISSION.steps, (s, i) => `<li class="is-${s.st}"><span class="g-j-num">${s.st === 'done' ? icon('check', 'ico ico-sm') : n(i + 1)}</span><b>${tt(s.l)}</b><small>${d(s.date)}</small>${s.st === 'next' ? `<span class="tag tag-info">${t('Next', 'পরবর্তী')}</span>` : ''}</li>`)}
      </ol>
      <p class="g-id-note">${icon('id-card', 'ico')}<span>${t('You sign in with a temporary <b>application ID</b> while you apply. When final admission is complete, the same account becomes your <b>student ID</b>.', 'আবেদনের সময় আপনি একটি অস্থায়ী <b>আবেদন আইডি</b> দিয়ে লগইন করবেন। চূড়ান্ত ভর্তি সম্পন্ন হলে একই অ্যাকাউন্ট আপনার <b>শিক্ষার্থী আইডি</b> হয়ে যাবে।')}</span></p>
      <div class="g-adm-grid">
        ${each(ADMISSION.streams, (s) => `<article class="g-adm-card">
          <div class="g-adm-top"><h3>${tt(s.name)}</h3><span class="tag tag-${s.tone}">${tt(s.status)}</span></div>
          <dl><div><dt>${t('Session', 'সেশন')}</dt><dd>${n(s.session)}</dd></div><div><dt>${t('Seats', 'আসন')}</dt><dd>${n(s.seats)}</dd></div><div><dt>${t('Applications', 'আবেদন')}</dt><dd>${n(s.apps)}</dd></div></dl>
          <div class="g-adm-act"><button type="button" class="btn btn-teal" ${p2(s.cta[0], s.cta[1])}>${tt(s.cta)}</button>
          <a class="btn btn-outline" ${href(V, '03-login')}>${t('Track my application', 'আমার আবেদনের অবস্থা')}</a></div>
        </article>`)}
      </div>
    </div>
  </section>

  <section class="container g-notices" aria-labelledby="g-not-t" data-filter-scope>
    <div class="g-sec-head"><div><p class="g-eyebrow">${t('Notice', 'নোটিশ')}</p><h2 id="g-not-t">${t('Latest notices', 'সর্বশেষ নোটিশ')}</h2></div>
      <a class="btn btn-outline" ${href(V, '02-notices')}>${t('View all notices', 'সকল নোটিশ দেখুন')}${icon('arrow-right', 'ico ico-sm')}</a></div>
    <div class="g-chips" role="group" ${ta('aria-label', 'Filter notices by category', 'বিভাগ অনুযায়ী নোটিশ')}>
      <button type="button" class="g-chip" data-filter="all" aria-pressed="true">${t('All', 'সব')}</button>
      ${each(NOTICE_CATS, (c) => `<button type="button" class="g-chip" data-filter="${c.k}" aria-pressed="false">${tt(c.l)}</button>`)}
    </div>
    <ul class="g-notice-list">
      ${each(NOTICES.slice(0, 8), (x) => `<li data-cat="${x.cat}" data-year="2026" ${x.urgent ? 'data-urgent="1"' : ''}>
        <a class="g-notice" ${href(V, '02-notices')}>
          <span class="g-date"><b>${n(x.date.slice(0, 2))}</b><span>${d(x.date.slice(3, 6))}</span></span>
          <span class="g-notice-main"><span class="g-notice-tags">${catTag(x.cat)}${x.pinned ? `<span class="tag tag-info no-dot">${icon('pin', 'ico ico-xs')}${t('Pinned', 'পিন করা')}</span>` : ''}${x.urgent ? `<span class="tag tag-danger">${t('Urgent', 'জরুরি')}</span>` : ''}</span>
          <b>${tt(x.t)}</b><small>${tt(AUTH[x.by])} · ${icon('file-text', 'ico ico-xs')} PDF ${n(x.size)}</small></span>
          ${icon('chevron-right', 'ico g-notice-arr')}
        </a></li>`)}
    </ul>
    <p class="g-empty" data-filter-empty hidden>${icon('inbox', 'ico ico-lg')}${t('No notices in this category yet. New notices appear here as soon as they are published.', 'এই বিভাগে এখনও কোনো নোটিশ নেই। প্রকাশিত হলেই এখানে দেখা যাবে।')}</p>
  </section>

  <section class="g-gallery" aria-labelledby="g-gal-t">
    <div class="container">
      <div class="g-sec-head g-center"><h2 id="g-gal-t">${t('Photo gallery', 'ফটো গ্যালারি')}</h2><p class="muted">${t('Learning, practicals and events across textile institutions', 'টেক্সটাইল প্রতিষ্ঠানগুলোর শিক্ষা, ব্যবহারিক ও অনুষ্ঠান')}</p></div>
      <ul class="g-gal-grid">
        ${each(GALLERY.slice(0, 7), (g, i) => `<li class="g-gal-${i}"><button type="button" class="g-gal-btn" data-lightbox>${img(g.f, g.c)}<span>${tt(g.c)}</span></button></li>`)}
      </ul>
      <p class="g-center"><button type="button" class="btn btn-outline" ${p2('Photo gallery', 'ফটো গ্যালারি')}>${icon('images', 'ico ico-sm')}${t('More photos', 'আরও ছবি')}</button></p>
    </div>
  </section>

  <section class="container g-help" id="help" aria-labelledby="g-help-t">
    <div class="g-help-intro">
      <p class="g-eyebrow">${t('Help', 'সহায়তা')}</p>
      <h2 id="g-help-t">${t('Help is always close by', 'সহায়তা সবসময় কাছেই')}</h2>
      <p>${t('Guides, short videos and a help desk in Bangla make the system easy for every user, including first-time applicants.', 'বাংলায় নির্দেশিকা, ছোট ভিডিও ও হেল্প ডেস্ক প্রথমবারের আবেদনকারীসহ সবার জন্য সিস্টেম সহজ করে।')}</p>
      <div class="g-helpline">${icon('headset', 'ico ico-xl')}<div><small>${t('Help desk (Sun–Thu, 9:00–17:00)', 'হেল্প ডেস্ক (রবি–বৃহস্পতি, ৯:০০–১৭:০০)')}</small><b>${n(ORG.helpline)}</b></div></div>
    </div>
    <ul class="g-help-grid">
      ${each(HELP, (h) => `<li><button type="button" class="g-help-card" ${p2(h.l[0], h.l[1])}><span class="g-help-ico">${icon(h.icon, 'ico ico-xl')}</span><b>${tt(h.l)}</b><small>${tt(h.s)}</small></button></li>`)}
    </ul>
    <div class="g-faq">
      <h3>${t('Frequently asked questions', 'সাধারণ জিজ্ঞাসা')}</h3>
      ${each(FAQ, (f, i) => `<details ${i === 0 ? 'open' : ''}><summary>${tt(f.q)}${icon('chevron-down', 'ico ico-sm')}</summary><p>${tt(f.a)}</p></details>`)}
    </div>
  </section>
</main>
${publicFooter()}`;
  return page({ v: V, screen: '01-landing', title: ['Home', 'হোম'], body, bodyClass: 'g-public' });
}

// ---------- 02 Notices ----------
function notices() {
  const counts = Object.fromEntries(NOTICE_CATS.map((c) => [c.k, NOTICES.filter((x) => x.cat === c.k).length]));
  const pinned = NOTICES.find((x) => x.pinned);
  const body = `
${publicHeader('notice')}
<main id="main" data-filter-scope>
  <section class="g-page-head">
    <div class="container">
      <nav class="g-crumb" ${ta('aria-label', 'Breadcrumb', 'অবস্থান')}><a ${href(V, '01-landing')}>${t('Home', 'হোম')}</a>${icon('chevron-right', 'ico ico-xs')}<span aria-current="page">${t('Notice', 'নোটিশ')}</span></nav>
      <h1>${t('Notices and circulars', 'নোটিশ ও পরিপত্র')}</h1>
      <p>${t('Official notices from the Ministry of Textiles and Jute and the Department of Textiles. Every notice has a date, an issuing office and a downloadable PDF.', 'বস্ত্র ও পাট মন্ত্রণালয় এবং বস্ত্র অধিদপ্তরের অফিসিয়াল নোটিশ। প্রতিটি নোটিশে তারিখ, জারিকারী দপ্তর ও ডাউনলোডযোগ্য পিডিএফ থাকে।')}</p>
      <form class="g-finder-search g-page-search" role="search" data-filter-form>
        ${icon('search', 'ico')}<label class="sr-only" for="nq">${t('Search notices', 'নোটিশ খুঁজুন')}</label>
        <input id="nq" type="search" data-filter-q ${ta('placeholder', 'Search notices by title or number', 'শিরোনাম বা নম্বর দিয়ে নোটিশ খুঁজুন')}>
        <button class="btn btn-teal" type="submit">${t('Search', 'খুঁজুন')}</button>
      </form>
    </div>
  </section>

  <div class="container g-not-layout">
    <aside class="g-not-side" ${ta('aria-label', 'Notice categories', 'নোটিশের বিভাগ')}>
      <h2>${t('Categories', 'বিভাগসমূহ')}</h2>
      <ul class="g-catlist">
        <li><button type="button" data-filter="all" aria-pressed="true">${icon('layout-list', 'ico ico-sm')}${t('All notices', 'সকল নোটিশ')}<b>${n(NOTICES.length)}</b></button></li>
        <li><button type="button" data-filter="urgent" aria-pressed="false">${icon('siren', 'ico ico-sm')}${t('Urgent', 'জরুরি')}<b>${n(NOTICES.filter((x) => x.urgent).length)}</b></button></li>
        ${each(NOTICE_CATS, (c) => `<li><button type="button" data-filter="${c.k}" aria-pressed="false"><span class="g-cat-dot g-cat-${c.k}"></span>${tt(c.l)}<b>${n(counts[c.k])}</b></button></li>`)}
      </ul>
      <label class="fld g-year"><span>${t('Year', 'বছর')}</span>
        <select data-filter-year>${opt('all', 'All years', 'সব বছর')}${opt('2026', '2026')}${opt('2025', '2025')}</select></label>
      <div class="g-side-card">${icon('mail-check', 'ico ico-lg')}<b>${t('Get notices by SMS', 'এসএমএসে নোটিশ পান')}</b><p>${t('Subscribe to admission or examination notices.', 'ভর্তি বা পরীক্ষার নোটিশে সাবস্ক্রাইব করুন।')}</p>
        <button type="button" class="btn btn-outline btn-sm" ${p2('Notice subscription', 'নোটিশ সাবস্ক্রিপশন')}>${t('Subscribe', 'সাবস্ক্রাইব')}</button></div>
    </aside>

    <section class="g-not-main" aria-labelledby="g-not-list-t">
      <article class="g-pinned">
        <div class="g-pinned-tags"><span class="tag tag-info no-dot">${icon('pin', 'ico ico-xs')}${t('Pinned', 'পিন করা')}</span>${catTag(pinned.cat)}<span class="tag tag-danger">${t('Urgent', 'জরুরি')}</span></div>
        <h2>${tt(pinned.t)}</h2>
        <p>${tt(pinned.s)}</p>
        <p class="g-meta">${icon('calendar-days', 'ico ico-sm')}${d(pinned.date)} · ${icon('landmark', 'ico ico-sm')}${tt(AUTH[pinned.by])} · ${t('Ref.', 'স্মারক')} ${pinned.id}</p>
        <div class="g-pinned-act"><button type="button" class="btn btn-primary" data-open="dlg-notice">${t('Read notice', 'নোটিশ পড়ুন')}</button>
          <button type="button" class="btn btn-outline" ${toast('Download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে ডাউনলোড শুরু হবে।')}>${icon('download', 'ico ico-sm')}PDF ${n(pinned.size)}</button></div>
      </article>

      <div class="g-list-head"><h2 id="g-not-list-t">${t('All notices', 'সকল নোটিশ')}</h2><p class="muted"><span data-filter-count>${n(NOTICES.length)}</span> ${t('notices', 'টি নোটিশ')}</p></div>
      <ul class="g-notice-list">
        ${each(NOTICES, (x) => `<li data-cat="${x.cat}" data-year="2026" ${x.urgent ? 'data-urgent="1"' : ''}>
          <button type="button" class="g-notice" data-open="dlg-notice">
            <span class="g-date"><b>${n(x.date.slice(0, 2))}</b><span>${d(x.date.slice(3, 6))}</span></span>
            <span class="g-notice-main"><span class="g-notice-tags">${catTag(x.cat)}${x.urgent ? `<span class="tag tag-danger">${t('Urgent', 'জরুরি')}</span>` : ''}</span>
            <b>${tt(x.t)}</b><small>${tt(x.s)}</small><small>${tt(AUTH[x.by])} · ${x.id} · PDF ${n(x.size)}</small></span>
            ${icon('chevron-right', 'ico g-notice-arr')}
          </button></li>`)}
      </ul>
      <div class="g-empty" data-filter-empty hidden>${icon('search-x', 'ico ico-xl')}<b>${t('No notices found', 'কোনো নোটিশ পাওয়া যায়নি')}</b>
        <p>${t('There are no notices for this category and year. Try “All notices” or another year.', 'এই বিভাগ ও বছরে কোনো নোটিশ নেই। “সকল নোটিশ” বা অন্য বছর বেছে দেখুন।')}</p></div>
      <nav class="g-pager" ${ta('aria-label', 'Pages', 'পাতা')}><button type="button" class="btn btn-outline btn-sm" disabled>${icon('arrow-left', 'ico ico-sm')}${t('Previous', 'আগের')}</button><span>${t('Page 1 of 4', 'পাতা ১ / ৪')}</span><button type="button" class="btn btn-outline btn-sm" ${p2('Notice archive, page 2', 'নোটিশ আর্কাইভ, পাতা ২')}>${t('Next', 'পরের')}${icon('arrow-right', 'ico ico-sm')}</button></nav>
    </section>
  </div>
</main>
<dialog id="dlg-notice" class="dlg dlg-wide" aria-labelledby="dlg-notice-t">
  <div class="dlg-head"><div><p class="g-notice-tags">${catTag(pinned.cat)}<span class="tag tag-danger">${t('Urgent', 'জরুরি')}</span></p><h2 id="dlg-notice-t">${tt(pinned.t)}</h2></div>
    <button type="button" class="dlg-x" data-close ${ta('aria-label', 'Close', 'বন্ধ করুন')}>${icon('x')}</button></div>
  <div class="dlg-body">
    <p class="g-meta">${d(pinned.date)} · ${tt(AUTH[pinned.by])} · ${t('Ref.', 'স্মারক')} ${pinned.id}</p>
    <p>${tt(pinned.s)}</p>
    <div class="g-pdf">${icon('file-text', 'ico ico-xl')}<div><b>${pinned.id}.pdf</b><small>PDF · ${n(pinned.size)} · ${t('2 pages', '২ পৃষ্ঠা')}</small></div>
      <button type="button" class="btn btn-outline btn-sm" ${toast('Download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে ডাউনলোড শুরু হবে।')}>${icon('download', 'ico ico-sm')}${t('Download', 'ডাউনলোড')}</button></div>
    <p class="proto-note">${t('Prototype: every notice opens this sample. The full notice detail page is part of Phase 2.', 'প্রোটোটাইপ: প্রতিটি নোটিশে এই নমুনা খুলবে। পূর্ণ নোটিশ বিস্তারিত পাতা দ্বিতীয় পর্যায়ে।')}</p>
  </div>
</dialog>
${publicFooter()}`;
  return page({ v: V, screen: '02-notices', title: ['Notices', 'নোটিশ'], body, bodyClass: 'g-public' });
}

// ---------- 03 Login ----------
function login() {
  const roles = [
    { k: 'candidate', icon: 'clipboard-list', l: ['Admission candidate', 'ভর্তি প্রার্থী'], s: ['Use your application ID', 'আবেদন আইডি ব্যবহার করুন'] },
    { k: 'student', icon: 'graduation-cap', l: ['Student', 'শিক্ষার্থী'], s: ['Use your student ID', 'শিক্ষার্থী আইডি ব্যবহার করুন'] },
    { k: 'teacher', icon: 'user-round-cog', l: ['Teacher', 'শিক্ষক'], s: ['Use your teacher ID or email', 'শিক্ষক আইডি বা ইমেইল ব্যবহার করুন'] },
  ];
  const err = `<span class="err" hidden>${t('This field is required', 'এই তথ্যটি দিতে হবে')}</span>`;
  const body = `
${publicHeader('')}
<main id="main" class="g-login">
  <div class="container">
    <div class="g-login-head">
      <nav class="g-crumb" ${ta('aria-label', 'Breadcrumb', 'অবস্থান')}><a ${href(V, '01-landing')}>${t('Home', 'হোম')}</a>${icon('chevron-right', 'ico ico-xs')}<span aria-current="page">${t('Login', 'লগইন')}</span></nav>
      <h1>${t('Sign in to your service account', 'আপনার সেবা অ্যাকাউন্টে লগইন করুন')}</h1>
      <p>${t('Step 1: choose who you are. Step 2: sign in with the ID you were given.', 'ধাপ ১: আপনি কে তা বেছে নিন। ধাপ ২: আপনাকে দেওয়া আইডি দিয়ে লগইন করুন।')}</p>
    </div>
    <div class="g-who" role="tablist" ${ta('aria-label', 'Who are you?', 'আপনি কে?')}>
      ${each(roles, (r, i) => `<button type="button" role="tab" id="tab-${r.k}" aria-controls="pan-${r.k}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" class="g-who-card">
        <span class="g-who-ico">${icon(r.icon, 'ico ico-xl')}</span><b>${tt(r.l)}</b><small>${tt(r.s)}</small><span class="g-who-check">${icon('circle-check', 'ico')}</span></button>`)}
    </div>
    <div class="g-login-grid">
      <div class="g-login-card">
        <section id="pan-candidate" role="tabpanel" aria-labelledby="tab-candidate">
          <h2>${t('Admission candidate sign-in', 'ভর্তি প্রার্থী লগইন')}</h2>
          <form data-candidate="cand-result" novalidate>
            <label class="fld"><span>${t('Application ID', 'আবেদন আইডি')}</span><input required value="TX-26-0048213" autocomplete="username"><span class="hint">${t('Sent by SMS when you applied, e.g. TX-26-0048213', 'আবেদনের সময় এসএমএসে পাঠানো, যেমন TX-26-0048213')}</span>${err}</label>
            <label class="fld"><span>${t('Date of birth', 'জন্মতারিখ')}</span><input required type="date" value="2009-03-14">${err}</label>
            <button type="submit" class="btn btn-primary btn-lg g-full">${t('Check my application', 'আমার আবেদন দেখুন')}</button>
            <p class="g-login-links"><button type="button" class="link" ${p2('Recover application ID', 'আবেদন আইডি উদ্ধার')}>${t('Forgot application ID?', 'আবেদন আইডি ভুলে গেছেন?')}</button> · <a class="link" href="${file(V, '01-landing')}#admissions">${t('Apply for admission', 'ভর্তির আবেদন')}</a></p>
          </form>
          <div id="cand-result" class="g-cand" tabindex="-1" hidden>
            <div class="g-cand-head"><div><small>${t('Candidate', 'প্রার্থী')}</small><b>Nusrat Jahan Ria · TX-26-0048213</b></div><span class="tag tag-ok">${t('Selected', 'নির্বাচিত')}</span></div>
            <ol class="g-cand-steps">
              <li class="is-done">${icon('check', 'ico ico-sm')}${t('Application submitted', 'আবেদন জমা')}</li>
              <li class="is-done">${icon('check', 'ico ico-sm')}${t('Fee paid', 'ফি পরিশোধ')}</li>
              <li class="is-done">${icon('check', 'ico ico-sm')}${t('Entrance test: 71/100', 'ভর্তি পরীক্ষা: ৭১/১০০')}</li>
              <li class="is-now">${icon('circle-dashed', 'ico ico-sm')}${t('Admission not completed', 'ভর্তি সম্পন্ন হয়নি')}</li>
              <li>${icon('id-card', 'ico ico-sm')}${t('Student ID', 'শিক্ষার্থী আইডি')}</li>
            </ol>
            <p class="g-cand-next">${icon('circle-alert', 'ico')}<span><b>${t('Next step:', 'পরবর্তী ধাপ:')}</b> ${t('Allocated to Karnaphuli Textile Institute. Pay the admission fee of ৳ 4,250 and upload your SSC certificate by 20 Nov 2026.', 'কর্ণফুলী টেক্সটাইল ইনস্টিটিউটে বরাদ্দ। ২০ নভেম্বর ২০২৬-এর মধ্যে ৳ ৪,২৫০ ভর্তি ফি দিন ও এসএসসি সনদ আপলোড করুন।')}</span></p>
            <div class="g-cand-act"><button type="button" class="btn btn-teal" ${p2('Admission payment', 'ভর্তি ফি পরিশোধ')}>${t('Pay admission fee', 'ভর্তি ফি দিন')}</button>
              <button type="button" class="btn btn-outline" ${p2('Upload documents', 'কাগজপত্র আপলোড')}>${t('Upload documents', 'কাগজ আপলোড')}</button></div>
            <p class="proto-note">${t('After admission, this account becomes student ID KTI-2026-…, and you sign in as a Student.', 'ভর্তির পর এই অ্যাকাউন্টটি শিক্ষার্থী আইডি KTI-2026-… হবে এবং আপনি শিক্ষার্থী হিসেবে লগইন করবেন।')}</p>
          </div>
        </section>
        <section id="pan-student" role="tabpanel" aria-labelledby="tab-student" hidden>
          <h2>${t('Student sign-in', 'শিক্ষার্থী লগইন')}</h2>
          <form data-demo-login data-go="${file(V, '07-student-dashboard')}" novalidate>
            <label class="fld"><span>${t('Student ID', 'শিক্ষার্থী আইডি')}</span><input required value="KTI-2024-2401" autocomplete="username">${err}</label>
            <label class="fld"><span>${t('Password', 'পাসওয়ার্ড')}</span><input required type="password" value="demo-pass" autocomplete="current-password">${err}</label>
            <button type="submit" class="btn btn-primary btn-lg g-full">${t('Sign in', 'লগইন')}</button>
            <p class="g-login-links"><button type="button" class="link" ${p2('Reset password', 'পাসওয়ার্ড রিসেট')}>${t('Forgot password?', 'পাসওয়ার্ড ভুলে গেছেন?')}</button></p>
          </form>
        </section>
        <section id="pan-teacher" role="tabpanel" aria-labelledby="tab-teacher" hidden>
          <h2>${t('Teacher sign-in', 'শিক্ষক লগইন')}</h2>
          <form data-demo-login data-go="${file(V, '06-teacher-dashboard')}" novalidate>
            <label class="fld"><span>${t('Teacher ID or email', 'শিক্ষক আইডি বা ইমেইল')}</span><input required value="arif.hossain@kti.edu.bd" autocomplete="username">${err}</label>
            <label class="fld"><span>${t('Password', 'পাসওয়ার্ড')}</span><input required type="password" value="demo-pass" autocomplete="current-password">${err}</label>
            <button type="submit" class="btn btn-primary btn-lg g-full">${t('Sign in', 'লগইন')}</button>
            <p class="g-login-links"><button type="button" class="link" ${p2('Reset password', 'পাসওয়ার্ড রিসেট')}>${t('Forgot password?', 'পাসওয়ার্ড ভুলে গেছেন?')}</button></p>
          </form>
        </section>
        <p class="proto-note">${t('Prototype: demo details are filled in. Press the button to continue.', 'প্রোটোটাইপ: ডেমো তথ্য দেওয়া আছে। এগোতে বোতাম চাপুন।')}</p>
      </div>
      <aside class="g-login-help">
        <h2>${t('Need help signing in?', 'লগইনে সহায়তা দরকার?')}</h2>
        <ul>
          <li>${icon('circle-help', 'ico')}<span>${t('Candidates get an application ID by SMS after applying.', 'আবেদনের পর প্রার্থীরা এসএমএসে আবেদন আইডি পান।')}</span></li>
          <li>${icon('id-card', 'ico')}<span>${t('Students get a student ID from their institution after admission.', 'ভর্তির পর শিক্ষার্থীরা প্রতিষ্ঠান থেকে শিক্ষার্থী আইডি পান।')}</span></li>
          <li>${icon('shield-check', 'ico')}<span>${t('Never share your password or OTP with anyone.', 'পাসওয়ার্ড বা ওটিপি কারও সঙ্গে শেয়ার করবেন না।')}</span></li>
        </ul>
        <div class="g-helpline">${icon('headset', 'ico ico-xl')}<div><small>${t('Help desk', 'হেল্প ডেস্ক')}</small><b>${n(ORG.helpline)}</b></div></div>
      </aside>
    </div>

    <section class="g-officials" aria-labelledby="g-off-t">
      <div class="g-off-head">${icon('landmark', 'ico ico-xl')}<div><h2 id="g-off-t">${t('Government and institution officials', 'সরকারি ও প্রতিষ্ঠানের কর্মকর্তা')}</h2>
        <p>${t('Officials do not sign in here. Each office uses its own secure portal address.', 'কর্মকর্তারা এখানে লগইন করেন না। প্রতিটি দপ্তর নিজস্ব সুরক্ষিত পোর্টাল ঠিকানা ব্যবহার করে।')}</p></div></div>
      <ul class="g-off-grid">
        ${each(PORTALS, (p) => `<li><button type="button" class="g-off-card" data-portal="${p.k}">${icon(p.icon, 'ico ico-lg')}<span><b>${tt(p.l)}</b><small>${tt(p.who)}</small><code>${p.dom}</code></span>${icon('arrow-up-right', 'ico ico-sm')}</button></li>`)}
      </ul>
    </section>
  </div>
</main>
${publicFooter()}`;
  return page({ v: V, screen: '03-login', title: ['Login', 'লগইন'], body, bodyClass: 'g-public' });
}

// ---------- internal shell ----------
const NAVS = {
  ministry: [['Overview', 'সারসংক্ষেপ'], ['Institutions', 'প্রতিষ্ঠান'], ['Operations', 'কার্যক্রম'], ['Approvals', 'অনুমোদন'], ['Reports', 'প্রতিবেদন'], ['Administration', 'প্রশাসন']],
  principal: [['Overview', 'সারসংক্ষেপ'], ['Academics', 'একাডেমিক'], ['People', 'জনবল'], ['Services & Approvals', 'সেবা ও অনুমোদন'], ['Resources', 'সম্পদ'], ['Reports', 'প্রতিবেদন']],
  teacher: [['Home', 'হোম'], ['My Classes', 'আমার ক্লাস'], ['Attendance', 'হাজিরা'], ['Results', 'ফলাফল'], ['Services', 'সেবা']],
  student: [['Home', 'হোম'], ['Academics', 'একাডেমিক'], ['Results & Attendance', 'ফলাফল ও উপস্থিতি'], ['Services', 'সেবা'], ['Profile', 'প্রোফাইল']],
};
const PORTAL_NAME = {
  ministry: ['Ministry portal', 'মন্ত্রণালয় পোর্টাল'], principal: ['Institution portal', 'প্রতিষ্ঠান পোর্টাল'],
  teacher: ['Teacher workspace', 'শিক্ষক ওয়ার্কস্পেস'], student: ['Student portal', 'স্টুডেন্ট পোর্টাল'],
};
function appShell({ role, user, scope, crumbs, content, badge }) {
  const nav = NAVS[role].map((l, i) => i === 0
    ? `<li><a href="#main" aria-current="page">${tt(l)}</a></li>`
    : `<li><button type="button" ${p2(l[0], l[1])}>${tt(l)}${badge && badge[i] ? `<span class="g-nav-count">${n(badge[i])}</span>` : ''}</button></li>`).join('');
  return `
<header class="g-app-head">
  <div class="g-app-in">
    <a class="g-brand g-brand-sm" href="#main">${mark()}<span><b>${tt(ORG.short)}</b><small>${tt(PORTAL_NAME[role])}</small></span></a>
    <nav class="g-app-nav" id="g-app-nav" ${ta('aria-label', 'Main', 'প্রধান মেনু')}><ul>${nav}</ul></nav>
    <div class="g-app-tools">
      <button type="button" class="g-lang-toggle" data-toggle-lang ${ta('aria-label', 'Switch to Bangla', 'ইংরেজিতে দেখুন')}><span class="l-en" lang="bn">বাংলা</span><span class="l-bn" lang="en">English</span></button>
      <button type="button" class="g-icon-btn g-bell" ${p2('Notifications', 'নোটিফিকেশন')} ${ta('aria-label', 'Notifications, 3 new', 'নোটিফিকেশন, ৩টি নতুন')}>${icon('bell')}<span class="g-bell-dot">${n(3)}</span></button>
      <div class="g-user"><span class="g-avatar">${user.initials}</span><span class="g-hide-md"><b>${user.name}</b><small>${tt(user.role)}</small></span></div>
      <a class="g-icon-btn" ${href(V, '01-landing')} ${ta('aria-label', 'Sign out', 'লগআউট')} ${ta('title', 'Sign out', 'লগআউট')}>${icon('log-out')}</a>
      <button type="button" class="g-icon-btn g-menu-btn" data-menu="g-app-nav" aria-expanded="false" ${ta('aria-label', 'Menu', 'মেনু')}>${icon('menu')}</button>
    </div>
  </div>
</header>
<div class="g-scope"><div class="g-app-in">
  <nav class="g-crumb" ${ta('aria-label', 'Breadcrumb', 'অবস্থান')}>${crumbs.map((c, i) => (i < crumbs.length - 1 ? `<span>${tt(c)}</span>${icon('chevron-right', 'ico ico-xs')}` : `<span aria-current="page">${tt(c)}</span>`)).join('')}</nav>
  <span class="g-scope-chip">${icon('map-pin', 'ico ico-sm')}${t('Scope', 'পরিধি')}: <b>${tt(scope)}</b></span>
</div></div>
<main id="main" class="g-app-main"><div class="g-app-in">${content}</div></main>`;
}

const tone = (s) => ({ done: 'ok', approved: 'ok', published: 'ok', recorded: 'ok', review: 'info', submitted: 'info', pending: 'neutral', later: 'neutral', returned: 'warn', due: 'warn', overdue: 'danger', missing: 'danger', rejected: 'danger' }[s] || 'neutral');
const st = (k) => `<span class="tag tag-${tone(k)}">${tt(STATUS[k])}</span>`;
const spark = (arr, w = 120, h = 36) => {
  const min = Math.min(...arr) - 1, max = Math.max(...arr) + 1;
  const pts = arr.map((v, i) => `${(i / (arr.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`);
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><path d="M${pts.join('L')}"/></svg>`;
};
const panel = (title, inner, extra = '', cls = '') => `<section class="g-panel ${cls}"><div class="g-panel-head"><h2>${title}</h2>${extra}</div>${inner}</section>`;

function noticeMini(list) {
  return `<ul class="g-mini-notices">${each(list, (x) => `<li><a ${href(V, '02-notices')}><span class="g-mini-date">${d(x.date.slice(0, 6))}</span><span>${tt(x.t)}</span></a></li>`)}</ul>`;
}

// ---------- 04 Ministry ----------
function ministry() {
  const ch = DIVISIONS.find((x) => x.id === 'chattogram');
  const content = `
<div class="g-greet">
  <div><p class="g-date-line">${tt(TODAY)}</p><h1>${t('Good morning, Farhana. Here is what needs the Ministry today.', 'শুভ সকাল, ফারহানা। আজ মন্ত্রণালয়ের যা দেখা প্রয়োজন।')}</h1></div>
  <div class="g-greet-act"><button type="button" class="btn btn-outline" ${p2('Publish a notice', 'নোটিশ প্রকাশ')}>${icon('megaphone', 'ico ico-sm')}${t('Publish notice', 'নোটিশ প্রকাশ')}</button>
    <button type="button" class="btn btn-primary" ${p2('Reports', 'প্রতিবেদন')}>${icon('file-down', 'ico ico-sm')}${t('Download report', 'প্রতিবেদন ডাউনলোড')}</button></div>
</div>

<section class="g-block" aria-labelledby="g-dec-t">
  <div class="g-block-head"><h2 id="g-dec-t">${t('Needs your decision', 'আপনার সিদ্ধান্ত প্রয়োজন')} <span class="g-count" data-count data-live-num="4">${n(4)}</span></h2>
    <button type="button" class="link" ${p2('Approvals', 'অনুমোদন')}>${t('All 31 pending approvals', 'অপেক্ষমাণ ৩১টি অনুমোদন')}${icon('arrow-right', 'ico ico-sm')}</button></div>
  <ul class="g-task-grid">
    ${each(MIN.approvals, (a) => `<li class="g-task ${a.overdue ? 'is-overdue' : ''}" data-row="${a.ref}">
      <div class="g-task-top"><span class="g-task-kind">${tt(a.type)}</span>${a.overdue ? `<span class="tag tag-danger">${t('Overdue', 'মেয়াদোত্তীর্ণ')}</span>` : `<span class="tag tag-neutral">${t('Due in', 'বাকি')} ${n(+a.sla - +a.age + 1)} ${t('days', 'দিন')}</span>`}</div>
      <h3>${tt(a.t)}</h3>
      <p class="muted">${tt(a.where)} · ${t('from', 'প্রেরক')} ${tt(a.from)}</p>
      <p class="g-task-meta">${a.ref} · ${t('waiting', 'অপেক্ষা')} ${n(a.age)} ${t('days', 'দিন')} · SLA ${n(a.sla)}</p>
      <div data-row-status></div>
      <div class="g-task-act"><button type="button" class="btn btn-teal btn-sm" data-row-action="approve">${t('Approve', 'অনুমোদন')}</button>
        <button type="button" class="btn btn-outline btn-sm" data-row-action="return">${t('Return', 'ফেরত')}</button>
        <button type="button" class="btn btn-ghost btn-sm" ${p2('Approval detail', 'অনুমোদনের বিস্তারিত')}>${t('Details', 'বিস্তারিত')}</button></div>
    </li>`)}
  </ul>
</section>

<section class="g-block" aria-labelledby="g-glance-t">
  <div class="g-block-head"><h2 id="g-glance-t">${t('Today at a glance', 'আজ এক নজরে')}</h2><span class="muted">${t('Live · updated 09:30', 'সরাসরি · হালনাগাদ ০৯:৩০')} ${demoTag()}</span></div>
  <ul class="g-glance">
    ${each(MIN.kpis, (k) => `<li class="g-glance-card tone-${k.tone}"><span>${tt(k.l)}</span><b class="tnum">${n(k.v)}</b><small>${tt(k.s)}</small>${k.trend ? spark(k.trend) : ''}</li>`)}
  </ul>
</section>

<div class="g-two">
  ${panel(t('Exceptions to follow up', 'যেসব বিষয় অনুসরণ করতে হবে'), `<ul class="g-exc">${each(MIN.exceptions, (x) => `<li class="sev-${x.sev}">
      <span class="g-exc-v tnum">${n(x.v)}</span>
      <div><span class="g-exc-type">${tt(x.type)} · ${tt(x.age)}</span><b>${tt(x.t)}</b><small>${tt(x.where)}</small></div>
      <button type="button" class="btn btn-outline btn-sm" ${p2('Institution 360°', 'প্রতিষ্ঠান ৩৬০°')}>${t('Open', 'খুলুন')}</button></li>`)}</ul>`,
  `<span class="tag tag-danger">${n(5)} ${t('open', 'চলমান')}</span>`)}

  ${panel(t('Divisions — drill down', 'বিভাগ — বিস্তারিত দেখুন'), `<ul class="g-div">${each(DIVISIONS, (v) => `<li>
      <button type="button" class="g-div-row" ${v.districts ? `data-expand="dist-${v.id}" aria-expanded="false"` : p2(`${v.n[0]} Division dashboard`, `${v.n[1]} বিভাগ ড্যাশবোর্ড`)}>
        <b>${tt(v.n)}</b><span class="muted">${n(v.inst)} ${t('inst.', 'প্রতি.')}</span>
        <span class="g-div-att ${v.att < 80 ? 'is-low' : ''}"><span class="bar ${v.att < 80 ? 'danger' : ''}"><i style="width:${v.att}%"></i></span><span class="tnum">${n(v.att.toFixed(1) + '%')}</span></span>
        ${v.alerts ? `<span class="tag tag-warn no-dot">${n(v.alerts)}</span>` : '<span class="g-div-ok">' + icon('circle-check', 'ico ico-sm') + '</span>'}
        ${icon(v.districts ? 'chevron-down' : 'chevron-right', 'ico ico-sm')}
      </button>
      ${v.districts ? `<ul class="g-dist" id="dist-${v.id}" hidden>${each(v.districts, (x) => `<li><button type="button" ${p2(`${x.n[0]} District dashboard`, `${x.n[1]} জেলা ড্যাশবোর্ড`)}><span>${tt(x.n)}</span><span class="muted">${n(x.inst)} ${t('inst.', 'প্রতি.')} · ${t('reported', 'রিপোর্ট')} ${n(x.rep)}</span><span class="tnum ${x.att < 80 ? 'g-low' : ''}">${n(x.att.toFixed(1) + '%')}</span></button></li>`)}</ul>` : ''}
    </li>`)}</ul><p class="g-panel-note">${t('Attendance today. Red: below the 80% threshold.', 'আজকের উপস্থিতি। লাল: ৮০% সীমার নিচে।')}</p>`,
  `<span class="muted">${t('Student attendance', 'শিক্ষার্থী উপস্থিতি')}</span>`)}
</div>

<div class="g-three">
  ${panel(t('Admission 2026–27', 'ভর্তি ২০২৬–২৭'), `<ul class="g-funnel">${each(MIN.funnel, (f) => `<li><span>${tt(f.l)}</span><span class="bar"><i style="width:${(f.v / 41260) * 100}%"></i></span><b class="tnum">${n(f.v.toLocaleString('en-US'))}</b></li>`)}</ul>
    <p class="g-panel-note">${icon('calendar-days', 'ico ico-sm')}${t('Result publication: 30 Oct · then institution allocation', 'ফল প্রকাশ: ৩০ অক্টোবর · এরপর প্রতিষ্ঠান বরাদ্দ')}</p>`)}
  ${panel(t('Recent notices', 'সাম্প্রতিক নোটিশ'), noticeMini(NOTICES.slice(0, 4)), `<button type="button" class="link" ${p2('Publish a notice', 'নোটিশ প্রকাশ')}>${icon('megaphone', 'ico ico-sm')}${t('New', 'নতুন')}</button>`)}
  ${panel(t('Reports', 'প্রতিবেদন'), `<ul class="g-reports">${each(MIN.reports, (r) => `<li><button type="button" ${toast('Report download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে প্রতিবেদন ডাউনলোড হবে।')}>${icon(r.icon, 'ico')}<span><b>${tt(r.l)}</b><small>${tt(r.s)}</small></span>${icon('download', 'ico ico-sm')}</button></li>`)}</ul>`)}
</div>`;
  const body = appShell({ role: 'ministry', user: MIN.user, scope: ['All Bangladesh (national)', 'সমগ্র বাংলাদেশ (জাতীয়)'], crumbs: [['Ministry', 'মন্ত্রণালয়'], ['Overview', 'সারসংক্ষেপ']], content, badge: { 3: 31 } });
  return page({ v: V, screen: '04-ministry-dashboard', title: ['Ministry dashboard', 'মন্ত্রণালয় ড্যাশবোর্ড'], body, bodyClass: 'g-app' });
}

// ---------- 05 Principal ----------
function principal() {
  const content = `
<div class="g-greet">
  <div><p class="g-date-line">${tt(TODAY)}</p><h1>${t('Good morning, Saiful Islam', 'শুভ সকাল, সাইফুল ইসলাম')}</h1>
    <p class="g-inst-line">${icon('school', 'ico ico-sm')}${tt(PRIN.inst.n)} · ${PRIN.inst.code} · ${tt(PRIN.inst.place)}</p></div>
  <div class="g-greet-act"><button type="button" class="btn btn-outline" ${p2('Post a notice', 'নোটিশ দিন')}>${icon('megaphone', 'ico ico-sm')}${t('Post notice', 'নোটিশ দিন')}</button></div>
</div>

<div class="g-alert g-alert-danger" role="alert">${icon('triangle-alert', 'ico ico-lg')}
  <div><b>${t('Student attendance today is 72.4% — below the 80% threshold', 'আজ শিক্ষার্থী উপস্থিতি ৭২.৪% — ৮০% সীমার নিচে')}</b>
  <p>${t('Diploma Y2 · Sec A has not recorded attendance yet (class started 10:00). The District Admin can see this alert.', 'ডিপ্লোমা ২য় বর্ষ · সেকশন এ এখনও হাজিরা দেয়নি (ক্লাস শুরু ১০:০০)। জেলা অ্যাডমিন এই সতর্কতা দেখতে পাচ্ছেন।')}</p></div>
  <button type="button" class="btn btn-outline btn-sm" ${toast('Reminder sent to Tahmina Akter.', 'তাহমিনা আক্তারকে রিমাইন্ডার পাঠানো হয়েছে।')}>${t('Remind teacher', 'শিক্ষককে মনে করান')}</button>
</div>

<section class="g-block" aria-labelledby="g-wait-t">
  <div class="g-block-head"><h2 id="g-wait-t">${t('Waiting for your approval', 'আপনার অনুমোদনের অপেক্ষায়')} <span class="g-count" data-count data-live-num="4">${n(4)}</span></h2>
    <button type="button" class="link" ${p2('Services & Approvals', 'সেবা ও অনুমোদন')}>${t('All 14 requests', 'সব ১৪টি অনুরোধ')}${icon('arrow-right', 'ico ico-sm')}</button></div>
  <ul class="g-task-grid">
    ${each(PRIN.approvals, (a) => `<li class="g-task ${a.overdue ? 'is-overdue' : ''}" data-row="${a.ref}">
      <div class="g-task-top"><span class="g-task-kind">${tt(a.type)}</span>${a.overdue ? `<span class="tag tag-danger">${t('Overdue', 'মেয়াদোত্তীর্ণ')}</span>` : `<span class="tag tag-info">${t('New', 'নতুন')}</span>`}</div>
      <h3>${a.who}</h3><p class="muted">${tt(a.meta)}</p>
      <p class="g-task-meta">${a.ref} · ${t('waiting', 'অপেক্ষা')} ${n(a.age)} ${t('days', 'দিন')} · SLA ${n(a.sla)}</p>
      <div data-row-status></div>
      <div class="g-task-act"><button type="button" class="btn btn-teal btn-sm" data-row-action="approve">${t('Approve', 'অনুমোদন')}</button>
        <button type="button" class="btn btn-outline btn-sm" data-row-action="return">${t('Return', 'ফেরত')}</button></div>
    </li>`)}
  </ul>
</section>

<ul class="g-glance g-glance-4">
  ${each(PRIN.kpis, (k) => `<li class="g-glance-card tone-${k.tone || 'ok'}"><span>${tt(k.l)}</span><b class="tnum">${n(k.v)}</b><small>${tt(k.s)}</small></li>`)}
</ul>

<div class="g-two">
  ${panel(t('Class attendance today', 'আজকের ক্লাস হাজিরা'), `<ul class="g-classes">${each(PRIN.classes, (c) => `<li>
      <div><b>${tt(c.c)}</b><small>${c.teacher}</small></div>
      ${c.p !== null ? `<span class="g-cls-bar"><span class="bar ${c.p / c.t < 0.8 ? 'danger' : ''}"><i style="width:${(c.p / c.t) * 100}%"></i></span><span class="tnum">${n(c.p + '/' + c.t)}</span></span>` : `<span class="g-cls-bar"><span class="muted">—</span></span>`}
      ${c.st === 'done' ? st('submitted') : c.st === 'missing' ? st('missing') : st('due')}</li>`)}</ul>`,
  `<button type="button" class="link" ${p2('Attendance', 'হাজিরা')}>${t('Full register', 'সম্পূর্ণ রেজিস্টার')}</button>`)}
  <div class="g-stack">
    ${panel(t('Pending with other offices', 'অন্য দপ্তরে অপেক্ষমাণ'), `<ul class="g-else">${each(PRIN.elsewhere, (x) => `<li>${icon('hourglass', 'ico')}<div><b>${tt(x.t)}</b><small>${tt(x.who)} · ${tt(x.age)}</small></div></li>`)}</ul>`)}
    ${panel(t('Notices', 'নোটিশ'), noticeMini([NOTICES[5], NOTICES[4], NOTICES[6]]))}
  </div>
</div>

<section class="g-block" aria-labelledby="g-quick-t">
  <div class="g-block-head"><h2 id="g-quick-t">${t('Quick actions', 'দ্রুত কাজ')}</h2></div>
  <ul class="g-quick">${each(PRIN.quick, (q) => `<li><button type="button" ${p2(q.l[0], q.l[1])}><span class="g-svc-ico">${icon(q.icon, 'ico ico-lg')}</span>${tt(q.l)}</button></li>`)}</ul>
</section>`;
  const body = appShell({ role: 'principal', user: PRIN.user, scope: PRIN.inst.n, crumbs: [['Institution', 'প্রতিষ্ঠান'], ['Overview', 'সারসংক্ষেপ']], content, badge: { 3: 14 } });
  return page({ v: V, screen: '05-principal-dashboard', title: ['Principal dashboard', 'অধ্যক্ষ ড্যাশবোর্ড'], body, bodyClass: 'g-app' });
}

// ---------- attendance dialog (shared by teacher screens in G) ----------
function attendanceDialog(cls) {
  return `<dialog id="dlg-att" class="dlg dlg-wide" aria-labelledby="dlg-att-t">
  <div data-att-scope data-total="${cls.t}">
  <div class="dlg-head"><div><h2 id="dlg-att-t">${t('Take attendance', 'হাজিরা নিন')}</h2><p class="muted">${tt(cls.c)} · ${tt(cls.sub)} · ${cls.time}</p></div>
    <button type="button" class="dlg-x" data-close ${ta('aria-label', 'Close', 'বন্ধ করুন')}>${icon('x')}</button></div>
  <div class="dlg-body">
    <div class="g-att-sum"><span>${t('Present', 'উপস্থিত')} <b data-att-p>${n(5)}</b></span><span>${t('Absent', 'অনুপস্থিত')} <b data-att-a>${n(1)}</b></span><span>${t('Leave', 'ছুটি')} <b data-att-l>${n(1)}</b></span>
      <button type="button" class="link" data-att-all>${t('Mark all present', 'সবাইকে উপস্থিত')}</button></div>
    <ul class="g-roster">${each(TEACH.roster, (r) => `<li data-att-row><span class="tnum">${r.roll}</span><b>${r.name}</b>
      <span class="g-pal" role="radiogroup" aria-label="${r.name}">${['P', 'A', 'L'].map((k) => `<label><input type="radio" name="a${r.roll}" value="${k}" ${r.s === k ? 'checked' : ''}><span>${k === 'P' ? t('Present', 'উপস্থিত') : k === 'A' ? t('Absent', 'অনুপস্থিত') : t('Leave', 'ছুটি')}</span></label>`).join('')}</span></li>`)}</ul>
    <p class="proto-note">${t('Showing 8 of 60 students. Live attendance is sent to the Principal and Head Office as soon as you submit.', '৬০ জনের ৮ জন দেখানো হয়েছে। জমা দিলেই লাইভ হাজিরা অধ্যক্ষ ও প্রধান কার্যালয়ে যায়।')}</p>
  </div>
  <div class="dlg-foot"><button type="button" class="btn btn-ghost" data-close>${t('Cancel', 'বাতিল')}</button><button type="button" class="btn btn-primary" data-att-submit>${t('Submit attendance', 'হাজিরা জমা দিন')}</button></div>
  </div></dialog>`;
}

// ---------- 06 Teacher ----------
function teacher() {
  const now = TEACH.classes[1];
  const content = `
<div class="g-greet">
  <div><p class="g-date-line">${tt(TODAY)}</p><h1>${t('Good morning, Arif', 'শুভ সকাল, আরিফ')}</h1><p class="g-inst-line">${icon('school', 'ico ico-sm')}${tt(TEACH.user.role)} · ${tt(PRIN.inst.n)}</p></div>
</div>

<section class="g-now" aria-labelledby="g-now-t">
  <div class="g-now-text">
    <p class="g-now-kick"><span class="g-pulse" aria-hidden="true"></span>${t('Happening now · 11:00–12:30', 'এখন চলছে · ১১:০০–১২:৩০')}</p>
    <h2 id="g-now-t">${tt(now.sub)} — ${tt(now.c)}</h2>
    <p>${icon('map-pin', 'ico ico-sm')}${tt(now.room)} · ${n(now.t)} ${t('students', 'শিক্ষার্থী')}</p>
  </div>
  <div class="g-now-act">
    <span class="tag tag-warn" data-att-state>${t('Attendance not taken', 'হাজিরা নেওয়া হয়নি')}</span>
    <button type="button" class="btn btn-white btn-lg" data-open="dlg-att" data-att-hide>${icon('user-check', 'ico')}${t('Take attendance', 'হাজিরা নিন')}</button>
    <button type="button" class="btn btn-onimg" ${p2('Class material', 'ক্লাসের উপকরণ')}>${icon('upload', 'ico ico-sm')}${t('Share material', 'উপকরণ দিন')}</button>
  </div>
</section>

<div class="g-two">
  ${panel(t('Today’s schedule', 'আজকের সময়সূচি'), `<ol class="g-timeline">${each(TEACH.classes, (c) => `<li class="is-${c.st}">
      <span class="g-tl-time tnum">${n(c.time)}<small>${n(c.end)}</small></span>
      <div><b>${tt(c.sub)}</b><small>${tt(c.c)} · ${tt(c.room)}</small></div>
      ${c.st === 'done' ? `<span class="tag tag-ok">${t('Recorded', 'লিপিবদ্ধ')} ${n(c.p + '/' + c.t)}</span>` : c.st === 'now' ? `<span class="tag tag-warn" data-att-state>${t('Attendance due', 'হাজিরা বাকি')}</span>` : st('later')}
    </li>`)}</ol>`)}
  ${panel(t('Your tasks', 'আপনার কাজ'), `<ul class="g-todo">${each(TEACH.tasks, (k) => `<li class="${k.warn ? 'is-warn' : ''}">
      <span class="g-svc-ico">${icon(k.icon, 'ico')}</span>
      <div><b>${tt(k.t)}</b><small>${tt(k.s)}</small>${k.pct !== null ? `<span class="bar"><i style="width:${k.pct}%"></i></span>` : ''}</div>
      <button type="button" class="btn ${k.warn ? 'btn-teal' : 'btn-outline'} btn-sm" ${p2(k.t[0], k.t[1])}>${tt(k.btn)}</button></li>`)}</ul>`, `<span class="tag tag-warn">${n(1)} ${t('returned', 'ফেরত')}</span>`)}
</div>

<div class="g-two">
  ${panel(t('Notices', 'নোটিশ'), noticeMini([NOTICES[4], NOTICES[2], NOTICES[6]]))}
  ${panel(t('Leave balance and services', 'ছুটির হিসাব ও সেবা'), `<ul class="g-leave">${each(TEACH.leave, (l) => `<li><span>${tt(l.l)}</span><span class="bar"><i style="width:${(l.used / l.total) * 100}%"></i></span><b class="tnum">${n(l.total - l.used)}</b><small>${t('left of', 'বাকি, মোট')} ${n(l.total)}</small></li>`)}</ul>
    <div class="g-short">${each([['calendar-plus', ['Apply for leave', 'ছুটির আবেদন']], ['book-open', ['Library', 'লাইব্রেরি']], ['user', ['My profile', 'আমার প্রোফাইল']], ['clipboard-check', ['Enter results', 'ফলাফল দিন']]], ([ic, l]) => `<button type="button" ${p2(l[0], l[1])}>${icon(ic, 'ico')}${tt(l)}</button>`)}</div>`)}
</div>
${attendanceDialog(now)}`;
  const body = appShell({ role: 'teacher', user: TEACH.user, scope: PRIN.inst.n, crumbs: [['Teacher', 'শিক্ষক'], ['Home', 'হোম']], content });
  return page({ v: V, screen: '06-teacher-dashboard', title: ['Teacher dashboard', 'শিক্ষক ড্যাশবোর্ড'], body, bodyClass: 'g-app' });
}

// ---------- 07 Student ----------
function student() {
  const ret = STU.requests[0];
  const steps = { returned: 1, review: 1, done: 3 };
  const content = `
<div class="g-greet">
  <div><p class="g-date-line">${tt(TODAY)}</p><h1>${t('Hello, Mim', 'হ্যালো, মীম')}</h1>
    <p class="g-inst-line">${icon('id-card', 'ico ico-sm')}${STU.id} · ${tt(STU.prog)} · ${tt(STU.year)}</p></div>
</div>

<div class="g-alert g-alert-warn" role="status">${icon('circle-alert', 'ico ico-lg')}
  <div><b>${t('Action needed: your Testimonial request was returned for correction', 'করণীয়: আপনার প্রশংসাপত্রের আবেদন সংশোধনের জন্য ফেরত এসেছে')}</b><p>${tt(ret.note)} · ${ret.ref}</p></div>
  <button type="button" class="btn btn-teal btn-sm" ${p2('Fix and resubmit request', 'সংশোধন করে পুনরায় জমা')}>${t('Fix and resubmit', 'ঠিক করে আবার জমা দিন')}</button>
</div>

<ul class="g-glance g-glance-4">
  <li class="g-glance-card tone-warn"><span>${t('My attendance', 'আমার উপস্থিতি')}</span><b class="tnum">${n(STU.att + '%')}</b><small>${t('You need 80% to sit the semester exam', 'সেমিস্টার পরীক্ষায় বসতে ৮০% প্রয়োজন')}</small></li>
  <li class="g-glance-card tone-ok"><span>${t('CGPA', 'সিজিপিএ')}</span><b class="tnum">${n(STU.cgpa)}</b><small>${t('After 2 semesters', '২ সেমিস্টার শেষে')}</small></li>
  <li class="g-glance-card tone-warn"><span>${t('Fees due', 'বকেয়া ফি')}</span><b class="tnum">৳ ${n(STU.fees)}</b><small>${t('Pay by 31 Oct 2026', '৩১ অক্টোবর ২০২৬-এর মধ্যে')}</small>
    <button type="button" class="btn btn-teal btn-sm" ${p2('Online fee payment', 'অনলাইনে ফি পরিশোধ')}>${t('Pay now', 'এখনই দিন')}</button></li>
  <li class="g-glance-card tone-neutral"><span>${t('Semester 3 result', 'সেমিস্টার ৩ ফলাফল')}</span><b class="g-glance-txt">${tt(STATUS.pending)}</b><small>${t('Expected in November', 'নভেম্বরে প্রত্যাশিত')}</small></li>
</ul>

<div class="g-two">
  ${panel(t('My requests', 'আমার আবেদন'), `<ul class="g-req">${each(STU.requests, (r) => `<li>
      <div class="g-req-top"><b>${tt(r.s)}</b>${st(r.st)}</div>
      <ol class="g-req-steps s-${r.st}" aria-label="${r.ref}">${[['Submitted', 'জমা'], ['Review', 'পর্যালোচনা'], ['Decision', 'সিদ্ধান্ত'], ['Ready', 'প্রস্তুত']].map((l, i) => `<li class="${i < steps[r.st] ? 'done' : i === steps[r.st] ? 'now' : ''}">${tt(l)}</li>`).join('')}</ol>
      <small>${r.ref} · ${d(r.date)} · ${tt(r.note)}</small>
      ${r.st === 'done' ? `<button type="button" class="btn btn-outline btn-sm" ${toast('Admit card download starts in the full prototype.', 'পূর্ণ প্রোটোটাইপে প্রবেশপত্র ডাউনলোড হবে।')}>${icon('download', 'ico ico-sm')}${t('Download', 'ডাউনলোড')}</button>` : ''}
    </li>`)}</ul>`, `<button type="button" class="link" ${p2('Request tracking', 'আবেদন ট্র্যাকিং')}>${t('All requests', 'সব আবেদন')}</button>`)}
  <div class="g-stack">
    ${panel(t('Today’s classes', 'আজকের ক্লাস'), `<ol class="g-timeline g-timeline-sm">${each(STU.classes, (c) => `<li><span class="g-tl-time tnum">${n(c.time)}</span><div><b>${tt(c.sub)}</b><small>${c.who} · ${tt(c.room)}</small></div></li>`)}</ol>`)}
    ${panel(t('Notices', 'নোটিশ'), noticeMini([NOTICES[2], NOTICES[6], NOTICES[10]]))}
  </div>
</div>

<section class="g-block" aria-labelledby="g-svc2-t">
  <div class="g-block-head"><h2 id="g-svc2-t">${t('Apply online', 'অনলাইনে আবেদন')}</h2><span class="muted">${t('15 services · each has its own approval steps', '১৫টি সেবা · প্রতিটির আলাদা অনুমোদন ধাপ')}</span></div>
  <ul class="g-svc-chips">${each(STU.services, (s) => `<li><button type="button" ${p2(s[0], s[1])}>${icon('file-text', 'ico ico-sm')}${tt(s)}</button></li>`)}</ul>
</section>`;
  const body = appShell({ role: 'student', user: STU.user, scope: PRIN.inst.n, crumbs: [['Student', 'শিক্ষার্থী'], ['Home', 'হোম']], content });
  return page({ v: V, screen: '07-student-dashboard', title: ['Student dashboard', 'শিক্ষার্থী ড্যাশবোর্ড'], body, bodyClass: 'g-app' });
}

export default {
  '01-landing': landing, '02-notices': notices, '03-login': login,
  '04-ministry-dashboard': ministry, '05-principal-dashboard': principal,
  '06-teacher-dashboard': teacher, '07-student-dashboard': student,
};
