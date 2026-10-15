// Student portal (public Login → Student) and alumni portal.
import { t, tt, n, d, ta, icon, each, page, demo, tbd, st, a, act, dl, field, alert, empty, table, tabs, card, kpis, pageHead, when, timeline, hbars, chartMeta } from '../core.mjs';
import { STU, NOTICES, BOOKS, TODAY } from '../data.mjs';
import { flowBanner, noticeMini } from './ministry.mjs';

const P = (file, title, crumbs, body, kind = 'student') => page({ file, title, kind, active: file, crumbs: [[kind === 'alumni' ? 'Alumni portal' : 'Student portal', kind === 'alumni' ? 'প্রাক্তন শিক্ষার্থী পোর্টাল' : 'স্টুডেন্ট পোর্টাল'], ...crumbs], body });
const btnAct = (label, o, cls = 'btn-primary', ic = '') => `<button type="button" class="btn ${cls}" ${act(o)}>${ic ? icon(ic, 'ico ico-sm') : ''}${label}</button>`;
const SERV = STU.services;

function dashboard() {
  const body = `
<div data-param="new=1">
  <section class="f-welcome">${icon('id-card', 'ico ico-xl')}<div><p class="h-eyebrow h-eyebrow-inv">${t('Candidate → Student', 'প্রার্থী → শিক্ষার্থী')}</p><h1 class="h-h3">${t('Welcome, Nusrat Jahan Ria', 'স্বাগতম, নুসরাত জাহান রিয়া')}</h1><p>${t('Student ID KTI-2026-0153 · Diploma in Textile Engineering (Textile Technology) · Karnaphuli Textile Institute', 'শিক্ষার্থী আইডি KTI-2026-0153 · ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং (টেক্সটাইল টেকনোলজি) · কর্ণফুলী টেক্সটাইল ইনস্টিটিউট')}</p></div></section>
  ${kpis([{ l: ['Classes begin', 'ক্লাস শুরু'], v: '05 Jan 2027', raw: d('05 Jan 2027'), s: ['Semester 1', 'সেমিস্টার ১'] }, { l: ['Section', 'সেকশন'], v: '—', s: ['Assigned in December', 'ডিসেম্বরে নির্ধারিত হবে'] }, { l: ['Fees due', 'বকেয়া ফি'], v: '0', raw: `৳ ${n(0)}`, s: ['Admission fee paid', 'ভর্তি ফি পরিশোধিত'] }])}
  ${card(t('Before classes begin', 'ক্লাস শুরুর আগে'), `<ul class="f-actions-list"><li><div><b>${t('Complete your profile (guardian, address, photo)', 'প্রোফাইল সম্পূর্ণ করুন (অভিভাবক, ঠিকানা, ছবি)')}</b><small>${t('Required for your ID card', 'আইডি কার্ডের জন্য প্রয়োজন')}</small></div>${a('student-profile.html', t('Open profile', 'প্রোফাইল খুলুন'), 'btn btn-teal btn-sm')}</li><li><div><b>${t('Read the code of conduct', 'আচরণবিধি পড়ুন')}</b><small>${t('Acknowledge by 31 Dec', '৩১ ডিসেম্বরের মধ্যে স্বীকৃতি দিন')}</small></div>${a('student-academics.html#conduct', t('Read', 'পড়ুন'), 'btn btn-outline btn-sm')}</li><li><div><b>${t('Academic calendar 2027', 'একাডেমিক ক্যালেন্ডার ২০২৭')}</b><small>${t('Holidays and examination periods', 'ছুটি ও পরীক্ষার সময়')}</small></div>${a('student-academics.html#calendar', t('View', 'দেখুন'), 'btn btn-outline btn-sm')}</li></ul>
    <p class="f-chart-meta">${t('Prototype: other pages of the student portal show the sample student (Mim Akter).', 'প্রোটোটাইপ: স্টুডেন্ট পোর্টালের অন্য পাতাগুলো নমুনা শিক্ষার্থী (মীম আক্তার) দেখায়।')} <a class="link" href="student.html">${t('Open sample student dashboard', 'নমুনা শিক্ষার্থীর ড্যাশবোর্ড খুলুন')}</a></p>`)}
</div>
<div data-param-not="new=1">
  ${pageHead({ eyebrow: TODAY, title: t('Hello, Mim', 'হ্যালো, মীম'), sub: `${STU.id} · ${tt(STU.prog)} · ${tt(STU.year)}` })}
  ${when('req=returned', alert('warn', t('Action needed: your Testimonial request was returned for correction', 'করণীয়: আপনার প্রশংসাপত্রের আবেদন সংশোধনের জন্য ফেরত এসেছে'), t('Photo is not clear. Upload a recent passport-size photo.', 'ছবি অস্পষ্ট। সাম্প্রতিক পাসপোর্ট সাইজের ছবি আপলোড করুন।'), a('student-request.html', t('Fix and resubmit', 'ঠিক করে আবার জমা দিন'), 'btn btn-teal btn-sm')))}
  ${alert('warn', t('Your attendance is 78%. You need 80% to sit the Semester 3 examination.', 'আপনার উপস্থিতি ৭৮%। সেমিস্টার ৩ পরীক্ষায় বসতে ৮০% প্রয়োজন।'), '', a('student-results.html#attendance', t('See by course', 'কোর্সভিত্তিক দেখুন'), 'btn btn-outline btn-sm'))}
  ${kpis([{ l: ['Attendance', 'উপস্থিতি'], v: '78%', s: ['80% required', '৮০% প্রয়োজন'], tone: 'warn' }, { l: ['CGPA', 'সিজিপিএ'], v: STU.cgpa, s: ['After 2 semesters', '২ সেমিস্টার শেষে'] }, { l: ['Semester 3 result', 'সেমিস্টার ৩ ফল'], raw: `${when('res=entry|submitted', t('Pending', 'অপেক্ষমাণ'), 'span')}${when('res=published|corrected', t('1 course published', '১টি কোর্স প্রকাশিত'), 'span')}`, s: ['Fabric Structure first', 'প্রথমে ফেব্রিক স্ট্রাকচার'] }, { l: ['Fees due', 'বকেয়া ফি'], raw: `${when('pay=due|failed', `৳ ${n('3,500')}`, 'span')}${when('pay=paid', `৳ ${n(0)}`, 'span')}`, s: ['Semester 3 tuition · by 31 Oct', 'সেমিস্টার ৩ টিউশন · ৩১ অক্টোবরের মধ্যে'], tone: 'warn' }])}
  <div class="f-grid">
    ${card(t('Today’s classes', 'আজকের ক্লাস'), table({ id: 'sd-cls', compact: true, cols: [{ l: ['Time', 'সময়'] }, { l: ['Subject', 'বিষয়'] }, { l: ['Teacher / room', 'শিক্ষক / কক্ষ'] }], rows: STU.classes.map((c) => ({ cells: [`<b>${n(c.time)}</b>`, tt(c.sub), `${c.who}<small>${tt(c.room)}</small>`] })) }) + a('student-academics.html', t('Classes and content', 'ক্লাস ও কনটেন্ট'), 'h-arrow-link'), '', 'f-c6')}
    ${card(t('My requests', 'আমার আবেদন'), `<ul class="f-actions-list">
      <li data-when="req=submitted|resubmitted|returned|approved|completed|rejected"><div><b>${t('Testimonial', 'প্রশংসাপত্র')} · SR-2026-01512</b><small>${t('Submitted 15 Oct 2026', 'জমা ১৫ অক্টোবর ২০২৬')}</small></div><span>${when('req=submitted|resubmitted', st('review'), 'span')}${when('req=returned', st('returned'), 'span')}${when('req=approved', st('approved'), 'span')}${when('req=completed', st('completed'), 'span')}${when('req=rejected', st('rejected'), 'span')}</span></li>
      <li><div><b>${t('Course drop', 'কোর্স ড্রপ')} · SR-2026-01467</b><small>${t('With the Principal’s office', 'অধ্যক্ষের দপ্তরে')}</small></div>${st('review')}</li>
      <li><div><b>${t('Admit card — Semester 3', 'প্রবেশপত্র — সেমিস্টার ৩')} · SR-2026-01310</b><small>${t('Ready to download', 'ডাউনলোডের জন্য প্রস্তুত')}</small></div>${st('completed')}</li></ul>${a('student-services.html', t('Online services', 'অনলাইন সেবা'), 'h-arrow-link')}`, '', 'f-c6')}
  </div>
  <div class="h-grid-3">
    ${card(t('Notices', 'নোটিশ'), noticeMini([NOTICES[2], NOTICES[6], NOTICES[10]]))}
    ${card(t('Payments', 'পরিশোধ'), `${when('pay=due|failed', `<p>${t('Semester 3 tuition fee: ৳ 3,500 due by 31 Oct 2026.', 'সেমিস্টার ৩ টিউশন ফি: ৩১ অক্টোবর ২০২৬-এর মধ্যে ৳ ৩,৫০০।')}</p>${a('student-payment.html', t('Pay now', 'এখনই দিন'), 'btn btn-teal')}`)}${when('pay=paid', alert('ok', t('All fees paid.', 'সব ফি পরিশোধিত।')))}`)}
    ${card(t('Shortcuts', 'শর্টকাট'), `<div class="f-quick">${each([['student-services', 'file-text', ['Apply for a service', 'সেবার আবেদন']], ['student-results', 'chart-column', ['Grade table', 'গ্রেড টেবিল']], ['student-payment', 'wallet', ['Ledger', 'লেজার']], ['student-profile', 'user', ['Profile', 'প্রোফাইল']]], ([h, ic, l]) => `<a href="${h}.html">${icon(ic, 'ico ico-sm')}${tt(l)}</a>`)}</div>`)}
  </div>
</div>`;
  return P('student', ['Student dashboard', 'শিক্ষার্থী ড্যাশবোর্ড'], [['Home', 'হোম']], body);
}

function academics() {
  const body = `${pageHead({ title: t('Academics', 'একাডেমিক'), sub: `${tt(STU.prog)} · ${tt(STU.year)}` })}
  ${tabs('sa', [
    { id: 'content', l: ['Classes & content', 'ক্লাস ও কনটেন্ট'], content: table({ id: 'sa-mat', cols: [{ l: ['Course', 'কোর্স'] }, { l: ['Latest material', 'সর্বশেষ উপকরণ'] }, { l: ['Teacher', 'শিক্ষক'] }, {}], rows: [[['Fabric Structure', 'ফেব্রিক স্ট্রাকচার'], ['Week 6 — Twill derivatives (PDF)', 'সপ্তাহ ৬ — টুইল ডেরিভেটিভ (পিডিএফ)'], 'Arif Hossain'], [['Yarn Manufacturing II', 'ইয়ার্ন ম্যানুফ্যাকচারিং ২'], ['Ring frame drafting (slides)', 'রিং ফ্রেম ড্রাফটিং (স্লাইড)'], 'Nusrat Jahan'], [['Textile Mathematics', 'টেক্সটাইল গণিত'], ['Assignment 3 (due 22 Oct)', 'অ্যাসাইনমেন্ট ৩ (শেষ তারিখ ২২ অক্টোবর)'], 'Shahidul Karim']].map((r) => ({ cells: [`<b>${tt(r[0])}</b>`, tt(r[1]), r[2], `<button type="button" class="btn btn-outline btn-sm" ${dl()}>${icon('download', 'ico ico-sm')}${t('Open', 'খুলুন')}</button>`] })) }) },
    { id: 'calendar', l: ['Academic calendar', 'একাডেমিক ক্যালেন্ডার'], content: `<ul class="h-keydates f-cal">${each([['19–22 Oct 2026', ['Durga Puja holidays', 'দুর্গাপূজার ছুটি']], ['10–14 Nov 2026', ['Mid-semester examinations', 'মধ্য-সেমিস্টার পরীক্ষা']], ['05–25 Jan 2027', ['Semester final examinations', 'সেমিস্টার সমাপনী পরীক্ষা']], ['28 Feb 2027', ['Result publication', 'ফলাফল প্রকাশ']]], ([dt, l]) => `<li><time>${d(dt)}</time><span>${tt(l)}</span></li>`)}</ul>` },
    { id: 'curriculum', l: ['Curriculum analysis', 'কারিকুলাম বিশ্লেষণ'], content: `${card(t('Credits completed', 'সম্পন্ন ক্রেডিট'), hbars([{ l: ['Core textile courses', 'মূল টেক্সটাইল কোর্স'], v: 41 }, { l: ['Science & mathematics', 'বিজ্ঞান ও গণিত'], v: 22 }, { l: ['General & language', 'সাধারণ ও ভাষা'], v: 12 }], { max: 60 }) + chartMeta(['credits (of 160 total)', 'ক্রেডিট (মোট ১৬০)'], ['To Semester 2', 'সেমিস্টার ২ পর্যন্ত'], false))}<p class="f-chart-meta">${t('Exact content of “curriculum analysis” to be confirmed', '“কারিকুলাম বিশ্লেষণ”-এর সঠিক বিষয়বস্তু নিশ্চিত করতে হবে')} — ${tbd()}</p>` },
    { id: 'advising', l: ['Advising', 'অ্যাডভাইজিং'], content: `<dl class="f-kv"><dt>${t('Advisor', 'অ্যাডভাইজার')}</dt><dd>Nusrat Jahan</dd><dt>${t('Last meeting', 'সর্বশেষ সভা')}</dt><dd>${d('24 Sep 2026')}</dd><dt>${t('Note', 'নোট')}</dt><dd>${t('Improve attendance in Textile Mathematics; consider the remedial class on Saturdays.', 'টেক্সটাইল গণিতে উপস্থিতি বাড়াও; শনিবারের সহায়ক ক্লাসে যোগ দেওয়ার কথা ভাবো।')}</dd></dl>${btnAct(t('Request a meeting', 'সভার অনুরোধ'), { set: '_=1', toast: ['Meeting request sent to your advisor.', 'অ্যাডভাইজারের কাছে সভার অনুরোধ পাঠানো হয়েছে।'] }, 'btn-outline')}` },
    { id: 'evaluation', l: ['Teaching evaluation', 'শিক্ষক মূল্যায়ন'], content: `${when('eval=open', `<form class="h-card h-form" data-flow ${act({ set: 'eval=done', toast: ['Thank you. Your evaluation is anonymous.', 'ধন্যবাদ। আপনার মূল্যায়ন বেনামি।'] })} novalidate><h2 class="h-h3">${t('Fabric Structure — Arif Hossain', 'ফেব্রিক স্ট্রাকচার — আরিফ হোসেন')}</h2>${each([['Explains clearly', 'স্পষ্টভাবে ব্যাখ্যা করেন'], ['Uses class time well', 'ক্লাসের সময় ভালোভাবে ব্যবহার করেন'], ['Practical sessions are useful', 'ব্যবহারিক ক্লাস উপকারী']], (q, i) => field({ l: q, name: `q${i}`, req: true, opts: [['', '— Rate —', '— মান দিন —'], ['5', '5 — Strongly agree', '৫ — সম্পূর্ণ একমত'], ['4', '4 — Agree', '৪ — একমত'], ['3', '3 — Neutral', '৩ — নিরপেক্ষ'], ['2', '2 — Disagree', '২ — দ্বিমত']] }))}<p class="f-note">${icon('shield-check', 'ico ico-sm')}${t('Responses are anonymous. Window closes on 31 Oct.', 'উত্তর বেনামি। ৩১ অক্টোবর শেষ হবে।')}</p><button type="submit" class="btn btn-primary">${t('Submit evaluation', 'মূল্যায়ন জমা দিন')}</button></form>`)}${when('eval=done', alert('ok', t('Evaluation submitted. The evaluation window for this course is now closed for you.', 'মূল্যায়ন জমা হয়েছে। এই কোর্সের মূল্যায়ন আপনার জন্য বন্ধ।')))}` },
    { id: 'conduct', l: ['Code of conduct', 'আচরণবিধি'], content: `<div class="f-prose"><p>${t('Students shall attend at least 80% of classes, respect teachers and staff, follow laboratory safety rules and avoid unfair means in examinations.', 'শিক্ষার্থীরা কমপক্ষে ৮০% ক্লাসে উপস্থিত থাকবে, শিক্ষক ও কর্মচারীদের সম্মান করবে, ল্যাবরেটরির নিরাপত্তা বিধি মানবে এবং পরীক্ষায় অসদুপায় থেকে বিরত থাকবে।')}</p><button type="button" class="btn btn-outline" ${dl()}>${icon('download', 'ico ico-sm')}${t('Full code of conduct (PDF)', 'সম্পূর্ণ আচরণবিধি (পিডিএফ)')}</button></div>` },
    { id: 'library', l: ['Library', 'লাইব্রেরি'], content: table({ id: 'sa-lib', search: ['Search the catalogue', 'ক্যাটালগে খুঁজুন'], cols: [{ l: ['Title / author', 'শিরোনাম / লেখক'] }, { l: ['Available', 'সহজলভ্য'] }, {}], rows: BOOKS.map((b) => ({ cells: [`<b>${b.t}</b><small>${b.a}</small>`, b.avail ? `${n(b.avail)} ${t('of', '/')} ${n(b.copies)}` : st('unavailable'), b.avail ? '' : btnAct(t('Reserve', 'সংরক্ষণ'), { set: '_=1', toast: ['Reserved. You will be notified.', 'সংরক্ষিত। আপনাকে জানানো হবে।'] }, 'btn-ghost btn-sm')] })) }) + `<p class="f-chart-meta">${t('You have 1 book: Principles of Weaving, due 22 Oct.', 'আপনার কাছে ১টি বই: প্রিন্সিপলস অব উইভিং, ফেরত ২২ অক্টোবর।')}</p>` },
  ])}`;
  return P('student-academics', ['Academics', 'একাডেমিক'], [['Academics', 'একাডেমিক']], body);
}

function results() {
  const body = `${pageHead({ title: t('Results and attendance', 'ফলাফল ও উপস্থিতি'), sub: `${STU.id} · ${tt(STU.year)}` })}
  ${when('res=published|corrected', flowBanner('C', t('New result published: Fabric Structure (Semester 3).', 'নতুন ফল প্রকাশিত: ফেব্রিক স্ট্রাকচার (সেমিস্টার ৩)।')))}
  ${tabs('sr', [
    { id: 'grades', l: ['Grade table', 'গ্রেড টেবিল'], content: `${table({ id: 'gr-tbl', cols: [{ l: ['Semester', 'সেমিস্টার'] }, { l: ['Course', 'কোর্স'] }, { l: ['Mark', 'নম্বর'], cls: 'num' }, { l: ['Grade', 'গ্রেড'] }, { l: ['Status', 'অবস্থা'] }], rows: [
      { attrs: 'data-when="res=published|corrected" class="is-hl"', cells: [n(3), t('Fabric Structure', 'ফেব্রিক স্ট্রাকচার'), n(74), 'A−', st('published')] },
      { attrs: 'data-when="res=entry|submitted"', cells: [n(3), t('Fabric Structure', 'ফেব্রিক স্ট্রাকচার'), '—', '—', `<span class="tag tag-neutral">${t('Not published yet', 'এখনও প্রকাশিত হয়নি')}</span>`] },
      { cells: [n(2), t('Yarn Manufacturing I', 'ইয়ার্ন ম্যানুফ্যাকচারিং ১'), n(79), 'A', st('published')] }, { cells: [n(2), t('Weaving I', 'উইভিং ১'), n(71), 'A−', st('published')] }, { cells: [n(1), t('Textile Raw Materials', 'টেক্সটাইল কাঁচামাল'), n(66), 'B+', st('published')] }] })}
      <dl class="f-dl f-dl-4"><div><dt>GPA ${t('Sem 1', 'সেম ১')}</dt><dd>${n('3.18')}</dd></div><div><dt>GPA ${t('Sem 2', 'সেম ২')}</dt><dd>${n('3.42')}</dd></div><div><dt>CGPA</dt><dd>${n('3.30')}</dd></div><div><dt>${t('Credits', 'ক্রেডিট')}</dt><dd>${n('41')}</dd></div></dl>` },
    { id: 'attendance', l: ['Attendance by course', 'কোর্সভিত্তিক উপস্থিতি'], content: card(t('Attendance this semester', 'এই সেমিস্টারের উপস্থিতি'), hbars(STU.courses.map((c) => ({ l: c.c, v: c.a })), { max: 100, unit: '%', threshold: 80 }) + chartMeta(['percent; marker = 80% required', 'শতাংশ; চিহ্ন = ৮০% প্রয়োজন'], ['Semester 3 to date', 'সেমিস্টার ৩ এ পর্যন্ত'], false)) },
  ])}`;
  return P('student-results', ['Results and attendance', 'ফলাফল ও উপস্থিতি'], [['Results & attendance', 'ফলাফল ও উপস্থিতি']], body);
}

function services() {
  const body = `${pageHead({ title: t('Online services', 'অনলাইন সেবা'), sub: t('Apply online. Every request follows the same steps and can be tracked.', 'অনলাইনে আবেদন করুন। প্রতিটি আবেদন একই ধাপ অনুসরণ করে এবং ট্র্যাক করা যায়।') })}
  ${timeline([{ l: ['Submitted', 'জমা'], st: 'done' }, { l: ['Under review by the institution', 'প্রতিষ্ঠানের পর্যালোচনাধীন'], st: 'now' }, { l: ['Correction required (if any) → resubmit', 'সংশোধন প্রয়োজন (যদি থাকে) → পুনরায় জমা'], st: 'todo' }, { l: ['Approved or rejected', 'অনুমোদিত বা প্রত্যাখ্যাত'], st: 'todo' }, { l: ['Completed — document ready', 'সম্পন্ন — ডকুমেন্ট প্রস্তুত'], st: 'todo' }]).replace('class="f-tl"', 'class="f-tl f-tl-row"')}
  <div class="f-grid">
    ${card(t('All services', 'সকল সেবা'), `<ul class="f-svc-list">${each(SERV, (s, i) => `<li><span>${tt(s)}</span>${i === 6 ? `<a class="btn btn-teal btn-sm" href="#new">${t('Apply', 'আবেদন')}</a>` : i === 1 ? a('student-payment.html', t('Pay', 'পরিশোধ'), 'btn btn-outline btn-sm') : `<button type="button" class="btn btn-outline btn-sm" ${act({ set: '_=1', toast: ['Prototype: the Testimonial form shows the shared request form.', 'প্রোটোটাইপ: প্রশংসাপত্রের ফরমে সাধারণ আবেদন ফরম দেখানো হয়েছে।'] })}>${t('Apply', 'আবেদন')}</button>`}</li>`)}</ul>`, '', 'f-c6')}
    <div class="f-c6" id="new">
      ${when('req=none|rejected|completed', `<form class="h-card h-form" data-flow ${act({ set: 'req=submitted', toast: ['Request SR-2026-01512 submitted.', 'আবেদন SR-2026-01512 জমা হয়েছে।'], go: 'student-request.html' })} novalidate><h2 class="h-h3">${t('Apply: Testimonial', 'আবেদন: প্রশংসাপত্র')}</h2>
        ${field({ l: ['Purpose', 'উদ্দেশ্য'], name: 'pp', req: true, opts: [['', '— Select —', '— নির্বাচন —'], ['job', 'Job application', 'চাকরির আবেদন', true], ['study', 'Higher study', 'উচ্চশিক্ষা']] })}${field({ l: ['Copies', 'কপি'], name: 'cp', value: '2', attrs: 'data-min="1" data-max="5"' })}
        ${field({ l: ['Passport-size photo (JPG)', 'পাসপোর্ট সাইজের ছবি (জেপিজি)'], name: 'ph', type: 'file', req: true, attrs: 'accept=".jpg,.jpeg,.png"' })}
        <p class="f-note">${icon('wallet', 'ico ico-sm')}${t('Fee ৳ 200 is added to your ledger after approval.', 'অনুমোদনের পর ৳ ২০০ ফি আপনার লেজারে যোগ হবে।')}</p><button type="submit" class="btn btn-primary">${t('Submit request', 'আবেদন জমা দিন')}</button></form>`)}
      ${when('req=submitted|returned|resubmitted|approved', `${alert('info', t('You have an open Testimonial request (SR-2026-01512).', 'আপনার একটি চলমান প্রশংসাপত্রের আবেদন আছে (SR-2026-01512)।'), t('A second request for the same service is not allowed while one is open.', 'একটি চলমান থাকা অবস্থায় একই সেবার দ্বিতীয় আবেদন করা যায় না।'), a('student-request.html', t('Track request', 'আবেদন ট্র্যাক'), 'btn btn-primary btn-sm'))}`)}
    </div>
  </div>`;
  return P('student-services', ['Online services', 'অনলাইন সেবা'], [['Online services', 'অনলাইন সেবা']], body);
}

function request() {
  const body = `${pageHead({ title: t('Request SR-2026-01512 — Testimonial', 'আবেদন SR-2026-01512 — প্রশংসাপত্র'), sub: t('Mim Akter · Karnaphuli Textile Institute', 'মীম আক্তার · কর্ণফুলী টেক্সটাইল ইনস্টিটিউট') })}
  ${when('req=none', empty(t('No request to track', 'ট্র্যাক করার মতো কোনো আবেদন নেই'), t('Submit a Testimonial request first.', 'প্রথমে প্রশংসাপত্রের আবেদন জমা দিন।'), a('student-services.html', t('Online services', 'অনলাইন সেবা'), 'btn btn-primary btn-sm')))}
  <div data-when="req=submitted|returned|resubmitted|approved|completed|rejected" class="f-grid">
    ${card(t('Progress', 'অগ্রগতি'), timeline([
      { l: ['Submitted', 'জমা'], who: ['Mim Akter', 'মীম আক্তার'], st: 'done' },
      { l: ['Under review', 'পর্যালোচনাধীন'], who: ['Principal’s office', 'অধ্যক্ষের দপ্তর'], st: 'now', when_: 'req=submitted' },
      { l: ['Returned for correction: photo is not clear', 'সংশোধনের জন্য ফেরত: ছবি অস্পষ্ট'], who: ['Md. Saiful Islam', 'মোঃ সাইফুল ইসলাম'], st: 'warn', when_: 'req=returned|resubmitted|approved|completed' },
      { l: ['Resubmitted with a new photo', 'নতুন ছবিসহ পুনরায় জমা'], who: ['Mim Akter', 'মীম আক্তার'], st: 'done', when_: 'req=resubmitted|approved|completed' },
      { l: ['Under review again', 'আবার পর্যালোচনাধীন'], who: ['Principal’s office', 'অধ্যক্ষের দপ্তর'], st: 'now', when_: 'req=resubmitted' },
      { l: ['Approved', 'অনুমোদিত'], who: ['Md. Saiful Islam', 'মোঃ সাইফুল ইসলাম'], st: 'done', when_: 'req=approved|completed' },
      { l: ['Completed — testimonial issued', 'সম্পন্ন — প্রশংসাপত্র ইস্যু'], who: ['Office', 'দপ্তর'], st: 'done', when_: 'req=completed' },
      { l: ['Rejected', 'প্রত্যাখ্যাত'], who: ['Md. Saiful Islam', 'মোঃ সাইফুল ইসলাম'], st: 'fail', when_: 'req=rejected' }]), '', 'f-c6')}
    <div class="f-c6">
      ${when('req=submitted|resubmitted', `${alert('info', t('Your request is under review.', 'আপনার আবেদন পর্যালোচনাধীন।'), t('Usual time: 3 working days.', 'সাধারণ সময়: ৩ কর্মদিবস।'))}${a('inst-requests.html', t('Open as Principal (prototype)', 'অধ্যক্ষ হিসেবে খুলুন (প্রোটোটাইপ)'), 'btn btn-outline')}`)}
      ${when('req=returned', `<form class="h-card h-form" data-flow ${act({ set: 'req=resubmitted', toast: ['Resubmitted. The Principal’s office is notified.', 'পুনরায় জমা হয়েছে। অধ্যক্ষের দপ্তরকে জানানো হয়েছে।'] })} novalidate>${alert('warn', t('Correction required', 'সংশোধন প্রয়োজন'), t('Instruction from the Principal: “Photo is not clear. Upload a recent passport-size photo.”', 'অধ্যক্ষের নির্দেশনা: “ছবি অস্পষ্ট। সাম্প্রতিক পাসপোর্ট সাইজের ছবি আপলোড করুন।”'))}${field({ l: ['New photo (JPG)', 'নতুন ছবি (জেপিজি)'], name: 'np', type: 'file', req: true, attrs: 'accept=".jpg,.jpeg,.png"' })}<button type="submit" class="btn btn-teal">${t('Resubmit', 'পুনরায় জমা দিন')}</button></form>`)}
      ${when('req=approved', alert('ok', t('Approved. The office is preparing your testimonial.', 'অনুমোদিত। দপ্তর আপনার প্রশংসাপত্র প্রস্তুত করছে।'), '', a('inst-requests.html', t('Open as Principal (prototype)', 'অধ্যক্ষ হিসেবে খুলুন (প্রোটোটাইপ)'), 'btn btn-outline btn-sm')))}
      ${when('req=completed', `${alert('ok', t('Completed. Your testimonial is ready.', 'সম্পন্ন। আপনার প্রশংসাপত্র প্রস্তুত।'), t('Collect the signed copies from the office or download the digital copy.', 'দপ্তর থেকে স্বাক্ষরিত কপি সংগ্রহ করুন বা ডিজিটাল কপি ডাউনলোড করুন।'))}<button type="button" class="btn btn-primary" ${dl()}>${icon('download', 'ico ico-sm')}${t('Download testimonial', 'প্রশংসাপত্র ডাউনলোড')}</button>`)}
      ${when('req=rejected', `${alert('danger', t('Rejected', 'প্রত্যাখ্যাত'), t('Reason given by the Principal is shown here. You can submit a new request.', 'অধ্যক্ষের দেওয়া কারণ এখানে দেখানো হয়। আপনি নতুন আবেদন করতে পারেন।'))}${a('student-services.html', t('New request', 'নতুন আবেদন'), 'btn btn-outline')}`)}
    </div>
  </div>`;
  return P('student-request', ['Request tracking', 'আবেদন ট্র্যাকিং'], [['Online services', 'অনলাইন সেবা'], ['SR-2026-01512', 'SR-2026-01512']], body);
}

function payment() {
  const body = `${pageHead({ title: t('Payments and ledger', 'পরিশোধ ও লেজার'), sub: STU.id })}
  ${when('pay=due|failed', card(t('Due: Semester 3 tuition fee — ৳ 3,500 (by 31 Oct 2026)', 'বকেয়া: সেমিস্টার ৩ টিউশন ফি — ৳ ৩,৫০০ (৩১ অক্টোবর ২০২৬-এর মধ্যে)'), `${when('pay=failed', alert('danger', t('Payment failed', 'পরিশোধ ব্যর্থ'), t('The gateway did not confirm the payment (PG-90127). You were not charged. Try again.', 'গেটওয়ে পরিশোধ নিশ্চিত করেনি (PG-90127)। আপনার টাকা কাটা হয়নি। আবার চেষ্টা করুন।')))}
    <fieldset class="f-paymethods"><legend>${t('Payment method', 'পরিশোধ পদ্ধতি')}</legend>${each([['bKash', 'বিকাশ'], ['Nagad', 'নগদ'], ['Bank card', 'ব্যাংক কার্ড']], (m, i) => `<label><input type="radio" name="spm" ${i ? '' : 'checked'}><span>${t(m[0], m[1])}</span></label>`)}</fieldset>
    <div class="f-proto-ctl"><span>${t('Prototype: simulate the gateway response', 'প্রোটোটাইপ: গেটওয়ের সাড়া অনুকরণ')}</span>${btnAct(t('Pay ৳ 3,500 — success', '৳ ৩,৫০০ পরিশোধ — সফল'), { set: 'pay=paid', toast: ['Payment received. Receipt RCPT-2026-0101934.', 'পরিশোধ গৃহীত। রসিদ RCPT-2026-0101934।'] }, 'btn-teal')}${btnAct(t('Simulate failed payment', 'ব্যর্থ পরিশোধ অনুকরণ'), { set: 'pay=failed' }, 'btn-outline')}</div>`))}
  ${when('pay=paid', alert('ok', t('Semester 3 tuition fee paid on 15 Oct 2026 (RCPT-2026-0101934).', '১৫ অক্টোবর ২০২৬ সেমিস্টার ৩ টিউশন ফি পরিশোধিত (RCPT-2026-0101934)।'), '', `<button type="button" class="btn btn-outline btn-sm" ${dl()}>${t('Receipt', 'রসিদ')}</button>`))}
  <section id="ledger">${card(t('Student ledger', 'শিক্ষার্থী লেজার'), table({ id: 'ledger', compact: true, cols: [{ l: ['Date', 'তারিখ'] }, { l: ['Description', 'বিবরণ'] }, { l: ['Charge (৳)', 'চার্জ (৳)'], cls: 'num' }, { l: ['Paid (৳)', 'পরিশোধ (৳)'], cls: 'num' }, { l: ['Balance (৳)', 'ব্যালান্স (৳)'], cls: 'num' }], rows: [
    { attrs: 'data-when="pay=paid" class="is-hl"', cells: [d('15 Oct 2026'), t('Payment — Semester 3 tuition', 'পরিশোধ — সেমিস্টার ৩ টিউশন'), '—', n('3,500'), n(0)] },
    { cells: [d('01 Oct 2026'), t('Semester 3 tuition fee', 'সেমিস্টার ৩ টিউশন ফি'), n('3,500'), '—', n('3,500')] }, { cells: [d('25 Sep 2026'), t('Admit card fee — Semester 3', 'প্রবেশপত্র ফি — সেমিস্টার ৩'), n(200), n(200), n(0)] }, { cells: [d('12 Mar 2026'), t('Semester 2 tuition fee', 'সেমিস্টার ২ টিউশন ফি'), n('3,500'), n('3,500'), n(0)] }] }))}</section>`;
  return P('student-payment', ['Payments and ledger', 'পরিশোধ ও লেজার'], [['Payments & ledger', 'পরিশোধ ও লেজার']], body);
}

function certificate() {
  const body = `${pageHead({ title: t('Certificate', 'সনদ'), sub: t('Apply for your certificate after the final result is published.', 'চূড়ান্ত ফল প্রকাশের পর সনদের আবেদন করুন।') })}
  ${alert('info', t('Prototype: this page shows two students.', 'প্রোটোটাইপ: এই পাতায় দুজন শিক্ষার্থী দেখানো হয়েছে।'), t('Mim Akter (current student) is not yet eligible. Rafiul Alam (graduate 2025) continues Flow I.', 'মীম আক্তার (অধ্যয়নরত) এখনও যোগ্য নন। রাফিউল আলম (২০২৫ সালে উত্তীর্ণ) ফ্লো আই চালিয়ে যাবেন।'))}
  <div class="f-grid">
    ${card(t('Mim Akter — not eligible', 'মীম আক্তার — যোগ্য নন'), `${alert('warn', t('Certificate application is not available yet.', 'সনদের আবেদন এখনও করা যাবে না।'), t('You can apply after your final semester result is published (expected 2028).', 'চূড়ান্ত সেমিস্টারের ফল প্রকাশের পর আবেদন করতে পারবেন (প্রত্যাশিত ২০২৮)।'))}`, '', 'f-c5')}
    ${card(t('Rafiul Alam — graduate 2025 (KTI-2022-1187)', 'রাফিউল আলম — ২০২৫ সালে উত্তীর্ণ (KTI-2022-1187)'), `
      ${when('cert=none', `<form class="h-form" data-flow ${act({ set: 'cert=applied', toast: ['Certificate application CA-2026-0088 submitted.', 'সনদের আবেদন CA-2026-0088 জমা হয়েছে।'] })} novalidate>
        <dl class="f-kv"><dt>${t('Final result', 'চূড়ান্ত ফল')}</dt><dd>${t('CGPA 3.48 — published 28 Feb 2026', 'সিজিপিএ ৩.৪৮ — প্রকাশিত ২৮ ফেব্রুয়ারি ২০২৬')}</dd><dt>${t('Name on certificate', 'সনদে নাম')}</dt><dd>RAFIUL ALAM</dd></dl>
        ${field({ l: ['Certificate type', 'সনদের ধরন'], name: 'ct', opts: [['cert', 'Certificate & transcript', 'সনদ ও ট্রান্সক্রিপ্ট', true], ['dup', 'Duplicate certificate (original lost)', 'সনদের অনুলিপি (মূল হারানো)']] })}
        <label class="fld f-check"><span><input type="checkbox" required> ${t('The name and date of birth above match my SSC certificate.', 'উপরের নাম ও জন্মতারিখ আমার এসএসসি সনদের সাথে মেলে।')}</span><span class="err" hidden>${t('Confirm, or request a data correction first.', 'নিশ্চিত করুন, অথবা আগে তথ্য সংশোধনের অনুরোধ করুন।')}</span></label>
        <div class="f-btnrow"><button type="submit" class="btn btn-primary">${t('Apply for certificate', 'সনদের আবেদন')}</button>${a('student-profile.html', t('Data mismatch? Request correction', 'তথ্য অমিল? সংশোধনের অনুরোধ'), 'btn btn-ghost')}</div></form>`)}
      ${when('cert=applied', `${timeline([{ l: ['Applied', 'আবেদন'], who: ['Rafiul Alam', 'রাফিউল আলম'], st: 'done' }, { l: ['Eligibility check and issue', 'যোগ্যতা যাচাই ও ইস্যু'], who: ['Principal', 'অধ্যক্ষ'], st: 'now' }])}${a('inst-certificates.html', t('Open as Principal (prototype)', 'অধ্যক্ষ হিসেবে খুলুন (প্রোটোটাইপ)'), 'btn btn-outline')}`)}
      ${when('cert=issued|alumni', `${alert('ok', t('Certificate CERT-2026-00512 issued.', 'সনদ CERT-2026-00512 ইস্যু হয়েছে।'), t('Anyone can verify it on the Results / Verification page.', 'যে কেউ ফলাফল / যাচাই পাতায় যাচাই করতে পারবেন।'))}<div class="f-btnrow"><button type="button" class="btn btn-primary" ${dl()}>${icon('download', 'ico ico-sm')}${t('Download certificate', 'সনদ ডাউনলোড')}</button>${a('verify.html', t('Verify online', 'অনলাইনে যাচাই'), 'btn btn-outline')}</div>`)}
      ${when('cert=alumni', `<p class="f-note">${icon('graduation-cap', 'ico ico-sm')}${t('You are now alumni. Sign in again to use the alumni portal.', 'আপনি এখন প্রাক্তন শিক্ষার্থী। প্রাক্তন শিক্ষার্থী পোর্টাল ব্যবহার করতে আবার লগইন করুন।')} <a class="link" href="alumni.html">${t('Alumni portal', 'প্রাক্তন শিক্ষার্থী পোর্টাল')}</a></p>`)}`, '', 'f-c7')}
  </div>`;
  return P('student-certificate', ['Certificate', 'সনদ'], [['Certificate', 'সনদ']], body);
}

function profile() {
  const body = `${pageHead({ title: t('Profile', 'প্রোফাইল'), sub: STU.id })}
  <form class="h-card h-form" data-flow ${act({ set: '_=1', toast: ['Profile updated. Changes to official fields need office approval.', 'প্রোফাইল হালনাগাদ। অফিসিয়াল ঘরের পরিবর্তনে দপ্তরের অনুমোদন প্রয়োজন।'] })} novalidate>
    <div class="f-grid2">${field({ l: ['Name (as in SSC certificate)', 'নাম (এসএসসি সনদ অনুযায়ী)'], name: 'n', value: 'Mim Akter', attrs: 'readonly', hint: ['Locked. Request a correction through the office.', 'লক করা। দপ্তরের মাধ্যমে সংশোধনের অনুরোধ করুন।'] })}${field({ l: ['Date of birth', 'জন্মতারিখ'], name: 'b', type: 'date', value: '2008-06-02', attrs: 'readonly' })}
    ${field({ l: ['Mobile', 'মোবাইল'], name: 'm', req: true, value: '01812000000', attrs: 'data-pattern="^01[3-9]\\d{8}$"' })}${field({ l: ['Email', 'ইমেইল'], name: 'e', type: 'email', value: 'mim.akter@student.kti.edu.bd' })}
    ${field({ l: ['Present address', 'বর্তমান ঠিকানা'], name: 'a', rows: 2, value: 'Halishahar, Chattogram' })}${field({ l: ['Guardian mobile', 'অভিভাবকের মোবাইল'], name: 'g', value: '01711222333' })}</div>
    <p class="f-note">${icon('info', 'ico ico-sm')}${t('Whether profile data stays locked or updates the certificate after it is issued', 'সনদ ইস্যুর পর প্রোফাইলের তথ্য লক থাকবে নাকি সনদ হালনাগাদ করবে')} — ${tbd()}</p>
    <button type="submit" class="btn btn-primary">${t('Save changes', 'পরিবর্তন সংরক্ষণ')}</button></form>`;
  return P('student-profile', ['Profile', 'প্রোফাইল'], [['Profile', 'প্রোফাইল']], body);
}

function alumni() {
  const body = `${pageHead({ title: t('Alumni profile', 'প্রাক্তন শিক্ষার্থী প্রোফাইল'), sub: t('Rafiul Alam · Diploma in Textile Engineering, 2025 · Karnaphuli Textile Institute', 'রাফিউল আলম · ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং, ২০২৫ · কর্ণফুলী টেক্সটাইল ইনস্টিটিউট') })}
  ${when('cert=none|applied|issued', alert('info', t('Prototype: alumni access opens after the Principal marks the graduate as alumni (Flow I).', 'প্রোটোটাইপ: অধ্যক্ষ উত্তীর্ণকে প্রাক্তন শিক্ষার্থী হিসেবে চিহ্নিত করার পর প্রবেশাধিকার খোলে (ফ্লো আই)।'), '', a('inst-certificates.html', t('Principal view', 'অধ্যক্ষের দৃশ্য'), 'btn btn-outline btn-sm')))}
  ${alert('info', t('Alumni accounts show this menu only.', 'প্রাক্তন শিক্ষার্থী অ্যাকাউন্টে শুধু এই মেনু দেখা যায়।'), t('Academic records stay read-only. Keep your career information up to date.', 'একাডেমিক রেকর্ড শুধু দেখা যায়। আপনার পেশাগত তথ্য হালনাগাদ রাখুন।'))}
  <div class="f-grid"><form class="h-card h-form f-c7" data-flow ${act({ set: '_=1', toast: ['Career information saved.', 'পেশাগত তথ্য সংরক্ষিত।'] })} novalidate><h2 class="h-h3">${t('Current professional information', 'বর্তমান পেশাগত তথ্য')}</h2>
    <div class="f-grid2">${field({ l: ['Current employer', 'বর্তমান প্রতিষ্ঠান'], name: 'ce', value: 'A knit composite factory, Gazipur' })}${field({ l: ['Position', 'পদ'], name: 'cp', value: 'Junior Production Officer' })}${field({ l: ['LinkedIn profile', 'লিংকডইন প্রোফাইল'], name: 'li', value: 'https://www.linkedin.com/in/rafiul-alam', attrs: 'data-pattern="^https://(www\\.)?linkedin\\.com/.+"', hint: ['Must be a linkedin.com address.', 'linkedin.com ঠিকানা হতে হবে।'] })}${field({ l: ['Show in alumni directory', 'প্রাক্তন শিক্ষার্থী তালিকায় দেখান'], name: 'sd', opts: [['y', 'Yes', 'হ্যাঁ', true], ['n', 'No', 'না']] })}</div>
    <button type="submit" class="btn btn-primary">${t('Save', 'সংরক্ষণ')}</button></form>
  ${card(t('Certificates', 'সনদ'), `<dl class="f-kv"><dt>${t('Certificate', 'সনদ')}</dt><dd>${when('cert=issued|alumni', 'CERT-2026-00512', 'span')}${when('cert=none|applied', t('Not issued yet', 'এখনও ইস্যু হয়নি'), 'span')}</dd><dt>CGPA</dt><dd>${n('3.48')}</dd></dl><button type="button" class="btn btn-outline" ${dl()}>${icon('download', 'ico ico-sm')}${t('Transcript', 'ট্রান্সক্রিপ্ট')}</button>`, '', 'f-c5')}</div>`;
  return P('alumni', ['Alumni', 'প্রাক্তন শিক্ষার্থী'], [['Alumni profile', 'প্রাক্তন শিক্ষার্থী প্রোফাইল']], body, 'alumni');
}

export default { student: dashboard, 'student-academics': academics, 'student-results': results, 'student-services': services, 'student-request': request, 'student-payment': payment, 'student-certificate': certificate, 'student-profile': profile, alumni };
