// Admissions (public) and the candidate journey — Flow A.
import { t, tt, n, d, ta, icon, each, page, photo, demo, tbd, st, a, btn, act, dl, field, alert, table, card, secHead, pageHero, stepper, when, timeline } from '../core.mjs';
import { ADMISSION, NOTICES, catLabel } from '../data.mjs';

function admissions() {
  const body = `${pageHero('ev-gtec-orientation.jpg', ['Orientation ceremony for new students, Gopalganj Textile Engineering College', 'নবীন শিক্ষার্থীদের ওরিয়েন্টেশন, গোপালগঞ্জ টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], [[['Admissions', 'ভর্তি']]], t('Admissions 2026–27', 'ভর্তি ২০২৬–২৭'), tt(ADMISSION.cycle))}
<div class="container f-sec f-adm-layout">
  <div>
    ${alert('warn', t('Online application closes on 20 October 2026 at 23:59.', 'অনলাইন আবেদন ২০ অক্টোবর ২০২৬ রাত ১১:৫৯-এ শেষ হবে।'), t('The application fee (৳ 500) must be paid by the same deadline. Unpaid applications are not considered.', 'একই সময়ের মধ্যে আবেদন ফি (৳ ৫০০) পরিশোধ করতে হবে। অপরিশোধিত আবেদন বিবেচিত হবে না।'))}
    <section class="f-sec-sm" aria-labelledby="ad-dates"><h2 id="ad-dates" class="h-h3">${t('Key dates', 'গুরুত্বপূর্ণ তারিখ')}</h2>
      <ol class="h-dates f-dates">${each(ADMISSION.steps, (s) => `<li class="is-${s.st === 'now' ? 'next' : s.st}"><span>${d(s.date)}</span><b>${tt(s.l)}</b>${s.st === 'now' ? `<em>${t('Open', 'চলছে')}</em>` : ''}</li>`)}</ol></section>
    <section class="f-sec-sm" aria-labelledby="ad-elig"><h2 id="ad-elig" class="h-h3">${t('Eligibility', 'যোগ্যতা')}</h2>
      <ul class="f-list"><li>${t('SSC or equivalent, passed in 2024, 2025 or 2026.', '২০২৪, ২০২৫ বা ২০২৬ সালে এসএসসি বা সমমান পাস।')}</li><li>${t('Minimum GPA 3.50 with at least GPA 3.00 in Mathematics and Science (or as notified).', 'ন্যূনতম জিপিএ ৩.৫০ এবং গণিত ও বিজ্ঞানে কমপক্ষে জিপিএ ৩.০০ (বা বিজ্ঞপ্তি অনুযায়ী)।')}</li><li>${t('Candidates with SSC (Vocational) apply under the vocational quota.', 'এসএসসি (ভোকেশনাল) উত্তীর্ণরা ভোকেশনাল কোটায় আবেদন করবে।')}</li></ul>
      <p class="f-chart-meta">${t('Eligibility rules are configured by the Ministry for each cycle', 'প্রতিটি চক্রের যোগ্যতার নিয়ম মন্ত্রণালয় নির্ধারণ করে')} — ${tbd()}</p></section>
    <section class="f-sec-sm" aria-labelledby="ad-seats"><h2 id="ad-seats" class="h-h3">${t('Seats and quota', 'আসন ও কোটা')}</h2>
      ${table({ id: 'seats', compact: true, cols: [{ l: ['Institution type', 'প্রতিষ্ঠানের ধরন'] }, { l: ['Seats', 'আসন'], cls: 'num' }, { l: ['Admission route', 'ভর্তির পদ্ধতি'] }], rows: ADMISSION.seats.map((s, i) => ({ cells: [tt(s.l), n(s.v), `${tt(s.note)} ${i === 2 ? st('closed') : i === 1 ? st('open') : ''}`] })) })}
      ${table({ id: 'quota', compact: true, cols: [{ l: ['Quota', 'কোটা'] }, { l: ['Share of seats', 'আসনের অংশ'], cls: 'num' }], rows: ADMISSION.quota.map(([l, v]) => ({ cells: [tt(l), n(v)] })) })}
      <p class="f-chart-meta">${demo()} ${t('Quota percentages', 'কোটার শতাংশ')} — ${tbd()}</p></section>
    <section class="f-sec-sm" aria-labelledby="ad-docs"><h2 id="ad-docs" class="h-h3">${t('Required documents', 'প্রয়োজনীয় কাগজপত্র')}</h2><ul class="f-list">${each(ADMISSION.docs, (x) => `<li>${tt(x)}</li>`)}</ul></section>
    <section class="f-sec-sm" aria-labelledby="ad-how"><h2 id="ad-how" class="h-h3">${t('How to apply', 'কীভাবে আবেদন করবেন')}</h2>
      <ol class="f-howto">${each([[['Fill in the online form', 'অনলাইন ফরম পূরণ করুন'], ['Choose programme and test centre; enter SSC details.', 'প্রোগ্রাম ও পরীক্ষাকেন্দ্র নির্বাচন করুন; এসএসসির তথ্য দিন।']], [['Upload documents', 'কাগজপত্র আপলোড করুন'], ['Photo and SSC certificate (PDF/JPG).', 'ছবি ও এসএসসি সনদ (পিডিএফ/জেপিজি)।']], [['Pay the application fee', 'আবেদন ফি দিন'], ['৳ 500 online. You receive an application ID by SMS.', 'অনলাইনে ৳ ৫০০। এসএমএসে আবেদন আইডি পাবেন।']], [['Sit the admission test and check the result', 'ভর্তি পরীক্ষা দিন ও ফলাফল দেখুন'], ['Sign in as a candidate to download the admit card and see the result.', 'প্রবেশপত্র ডাউনলোড ও ফলাফল দেখতে প্রার্থী হিসেবে লগইন করুন।']], [['Complete final admission', 'চূড়ান্ত ভর্তি সম্পন্ন করুন'], ['Pay the admission fee at the allocated institution. Your student ID is issued.', 'বরাদ্দকৃত প্রতিষ্ঠানে ভর্তি ফি দিন। শিক্ষার্থী আইডি ইস্যু হবে।']]], ([h, s], i) => `<li><span>${n(i + 1)}</span><div><b>${tt(h)}</b><p>${tt(s)}</p></div></li>`)}</ol></section>
    <section class="f-sec-sm" aria-labelledby="ad-mig"><h2 id="ad-mig" class="h-h3">${t('Migration (transfer between institutions)', 'মাইগ্রেশন (প্রতিষ্ঠান পরিবর্তন)')}</h2>
      <p>${t('Admitted students may apply for migration through their institution after classes begin. Migration depends on seat availability and is approved by the Ministry.', 'ক্লাস শুরুর পর ভর্তিকৃত শিক্ষার্থীরা নিজ প্রতিষ্ঠানের মাধ্যমে মাইগ্রেশনের আবেদন করতে পারে। মাইগ্রেশন আসন প্রাপ্যতার ওপর নির্ভর করে এবং মন্ত্রণালয় অনুমোদন করে।')}</p></section>
  </div>
  <aside class="f-adm-side">
    <section class="f-adm-box"><h2 class="h-h3">${t('Apply or track', 'আবেদন বা ট্র্যাক')}</h2>
      ${a('apply.html', t('Apply online', 'অনলাইনে আবেদন'), 'btn btn-teal btn-lg', 'clipboard-list')}
      ${a('candidate-login.html', t('Candidate login', 'প্রার্থী লগইন'), 'btn btn-primary btn-lg', 'log-in')}
      ${a('candidate-login.html', t('Track application', 'আবেদনের অবস্থা'), 'btn btn-outline btn-lg', 'route')}
      ${a('admission-result.html', t('Admission result', 'ভর্তির ফলাফল'), 'btn btn-outline btn-lg', 'list-checks')}
      <p class="f-note">${icon('id-card', 'ico ico-sm')}${t('Your temporary application ID becomes your student ID after final admission.', 'চূড়ান্ত ভর্তির পর অস্থায়ী আবেদন আইডি শিক্ষার্থী আইডিতে রূপান্তরিত হয়।')}</p></section>
    <section class="h-aside-card">${icon('clipboard-list', 'ico ico-lg')}<h2 class="h-h4">${t('SSC (Vocational) 2027', 'এসএসসি (ভোকেশনাল) ২০২৭')}</h2><p>${t('Applications are not open yet. They open on 01 November 2026.', 'আবেদন এখনও শুরু হয়নি। ০১ নভেম্বর ২০২৬ থেকে শুরু হবে।')}</p>${st('closed')}</section>
    <section class="h-aside-card">${icon('megaphone', 'ico ico-lg')}<h2 class="h-h4">${t('Admission notices', 'ভর্তি নোটিশ')}</h2><ul class="h-nlist">${each(NOTICES.filter((x) => x.cat === 'admission'), (x) => `<li><a href="notice-detail.html"><time>${d(x.date.slice(0, 6))}</time><span>${tt(x.t)}</span></a></li>`)}</ul><a class="link" href="notices.html">${t('All notices', 'সকল নোটিশ')}</a></section>
    <section class="h-aside-card">${icon('file-down', 'ico ico-lg')}<h2 class="h-h4">${t('Admission guideline', 'ভর্তি নির্দেশিকা')}</h2><button type="button" class="btn btn-outline btn-sm" ${dl()}>${t('Download PDF', 'পিডিএফ ডাউনলোড')}</button></section>
  </aside>
</div>`;
  return page({ file: 'admissions', title: ['Admissions', 'ভর্তি'], active: 'admissions', body });
}

function apply() {
  const centres = [['ctg', 'Chattogram', 'চট্টগ্রাম'], ['dha', 'Dhaka', 'ঢাকা'], ['raj', 'Rajshahi', 'রাজশাহী'], ['khu', 'Khulna', 'খুলনা']];
  const steps = [
    { l: ['Programme', 'প্রোগ্রাম'], content: `<h2 class="h-h3">${t('Programme and test centre', 'প্রোগ্রাম ও পরীক্ষাকেন্দ্র')}</h2>
      ${field({ l: ['Programme', 'প্রোগ্রাম'], name: 'prog', req: true, opts: [['', '— Select —', '— নির্বাচন করুন —'], ['dip', 'Diploma in Textile Engineering (2026–27)', 'ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং (২০২৬–২৭)', true], ['voc', 'SSC (Vocational) 2027 — opens 01 Nov', 'এসএসসি (ভোকেশনাল) ২০২৭ — শুরু ০১ নভেম্বর']], attrs: 'data-pattern="^dip$"' })}
      <p class="f-note">${icon('info', 'ico ico-sm')}${t('SSC (Vocational) 2027 cannot be selected until applications open (edge case: application closed).', 'আবেদন শুরু না হওয়া পর্যন্ত এসএসসি (ভোকেশনাল) ২০২৭ নির্বাচন করা যাবে না (ব্যতিক্রম: আবেদন বন্ধ)।')}</p>
      ${field({ l: ['Preferred test centre', 'পছন্দের পরীক্ষাকেন্দ্র'], name: 'centre', req: true, opts: centres.map((c, i) => [c[0], c[1], c[2], i === 0]) })}
      ${field({ l: ['Quota (if any)', 'কোটা (যদি থাকে)'], name: 'quota', opts: [['none', 'Not applicable', 'প্রযোজ্য নয়', true], ['ff', 'Freedom fighter descendant', 'মুক্তিযোদ্ধার বংশধর'], ['pwd', 'Person with disability', 'প্রতিবন্ধী ব্যক্তি']] })}` },
    { l: ['Personal details', 'ব্যক্তিগত তথ্য'], content: `<h2 class="h-h3">${t('Personal details', 'ব্যক্তিগত তথ্য')}</h2><div class="f-grid2">
      ${field({ l: ['Full name (as in SSC certificate)', 'পূর্ণ নাম (এসএসসি সনদ অনুযায়ী)'], name: 'name', req: true, value: 'Nusrat Jahan Ria' })}${field({ l: ['Date of birth', 'জন্মতারিখ'], name: 'dob', type: 'date', req: true, value: '2009-03-14' })}
      ${field({ l: ["Father's name", 'পিতার নাম'], name: 'fa', req: true, value: 'Md. Jahangir Alam' })}${field({ l: ["Mother's name", 'মাতার নাম'], name: 'mo', req: true, value: 'Rokeya Begum' })}
      ${field({ l: ['Mobile number (for SMS)', 'মোবাইল নম্বর (এসএমএসের জন্য)'], name: 'mob', req: true, value: '01711000000', attrs: 'inputmode="tel" data-pattern="^01[3-9]\\d{8}$"', hint: ['Application ID and results are sent to this number.', 'আবেদন আইডি ও ফলাফল এই নম্বরে পাঠানো হবে।'] })}${field({ l: ['Birth registration / NID number', 'জন্ম নিবন্ধন / এনআইডি নম্বর'], name: 'brn', req: true, value: '20091512345678901' })}</div>` },
    { l: ['Academic details', 'শিক্ষাগত তথ্য'], content: `<h2 class="h-h3">${t('SSC / equivalent result', 'এসএসসি / সমমান ফলাফল')}</h2><div class="f-grid2">
      ${field({ l: ['Education board', 'শিক্ষা বোর্ড'], name: 'board', req: true, opts: [['ctg', 'Chattogram', 'চট্টগ্রাম', true], ['dha', 'Dhaka', 'ঢাকা'], ['tec', 'Technical', 'কারিগরি']] })}${field({ l: ['Passing year', 'পাসের সাল'], name: 'year', req: true, opts: [['2026', '2026', '২০২৬', true], ['2025', '2025', '২০২৫'], ['2024', '2024', '২০২৪']] })}
      ${field({ l: ['Roll number', 'রোল নম্বর'], name: 'roll', req: true, value: '204811' })}${field({ l: ['GPA (out of 5.00)', 'জিপিএ (৫.০০-এর মধ্যে)'], name: 'gpa', req: true, value: '4.61', attrs: 'data-min="3.5" data-max="5" inputmode="decimal"', hint: ['Minimum 3.50. Values below 3.50 or above 5.00 are rejected.', 'ন্যূনতম ৩.৫০। ৩.৫০-এর কম বা ৫.০০-এর বেশি গ্রহণযোগ্য নয়।'] })}</div>
      <p class="f-note">${icon('plug', 'ico ico-sm')}${t('In production, SSC data is fetched from the education board. Integration', 'প্রোডাকশনে শিক্ষা বোর্ড থেকে এসএসসির তথ্য আনা হবে। ইন্টিগ্রেশন')} — ${tbd()}</p>` },
    { l: ['Documents', 'কাগজপত্র'], content: `<h2 class="h-h3">${t('Upload documents', 'কাগজপত্র আপলোড')}</h2>
      ${field({ l: ['Photograph (JPG, 300×300 px, max 100 KB)', 'ছবি (জেপিজি, ৩০০×৩০০ পিক্সেল, সর্বোচ্চ ১০০ কেবি)'], name: 'photo', type: 'file', req: true, attrs: 'accept=".jpg,.jpeg,.png" data-max-kb="100"' })}
      ${field({ l: ['SSC certificate / mark sheet (PDF or JPG, max 2 MB)', 'এসএসসি সনদ / নম্বরপত্র (পিডিএফ বা জেপিজি, সর্বোচ্চ ২ এমবি)'], name: 'cert', type: 'file', req: true, attrs: 'accept=".pdf,.jpg,.jpeg" data-max-kb="2048"' })}
      ${alert('info', t('Missing documents', 'কাগজপত্র অসম্পূর্ণ'), t('You cannot continue without both documents. Choose any small file from your computer to test the prototype.', 'দুটি কাগজ ছাড়া এগোনো যাবে না। প্রোটোটাইপ পরীক্ষার জন্য আপনার কম্পিউটার থেকে যেকোনো ছোট ফাইল বেছে নিন।'))}` },
    { l: ['Review and submit', 'যাচাই ও জমা'], content: `<h2 class="h-h3">${t('Review your application', 'আবেদন যাচাই করুন')}</h2>
      <dl class="f-review">${each([['prog', ['Programme', 'প্রোগ্রাম'], 0], ['centre', ['Test centre', 'পরীক্ষাকেন্দ্র'], 0], ['name', ['Name', 'নাম'], 1], ['dob', ['Date of birth', 'জন্মতারিখ'], 1], ['mob', ['Mobile', 'মোবাইল'], 1], ['gpa', ['SSC GPA', 'এসএসসি জিপিএ'], 2], ['photo', ['Photograph', 'ছবি'], 3], ['cert', ['SSC certificate', 'এসএসসি সনদ'], 3]], ([k, l, s]) => `<div><dt>${tt(l)}</dt><dd data-review="${k}">—</dd><button type="button" class="link" data-step-goto="${s}">${t('Edit', 'সম্পাদনা')}</button></div>`)}</dl>
      <label class="fld f-check"><span><input type="checkbox" required> ${t('I declare that the information is correct. False information will cancel the application.', 'আমি ঘোষণা করছি যে তথ্য সঠিক। মিথ্যা তথ্যে আবেদন বাতিল হবে।')}</span><span class="err" hidden>${t('Please confirm the declaration.', 'অনুগ্রহ করে ঘোষণা নিশ্চিত করুন।')}</span></label>
      <p class="f-note">${icon('wallet', 'ico ico-sm')}${t('After submission you will pay the application fee of ৳ 500.', 'জমা দেওয়ার পর ৳ ৫০০ আবেদন ফি পরিশোধ করবেন।')}</p>` },
  ];
  const body = `<div class="container f-sec f-narrow">
  <nav class="h-crumb f-crumb-dark"><a href="index.html">${t('Home', 'হোম')}</a><span>/</span><a href="admissions.html">${t('Admissions', 'ভর্তি')}</a><span>/</span><span aria-current="page">${t('Apply online', 'অনলাইনে আবেদন')}</span></nav>
  <h1 class="h-h2">${t('Online application — Diploma in Textile Engineering 2026–27', 'অনলাইন আবেদন — ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং ২০২৬–২৭')}</h1>
  <p class="muted">${t('Fields marked * are required. You can save a draft at any step.', '* চিহ্নিত ঘর আবশ্যক। যেকোনো ধাপে খসড়া সংরক্ষণ করতে পারেন।')}</p>
  ${when('cand=submitted|paid|payfail|selected|notselected|admitted', alert('info', t('You have already submitted an application (TX-26-0048213).', 'আপনি ইতিমধ্যে একটি আবেদন জমা দিয়েছেন (TX-26-0048213)।'), t('A second application for the same programme is not accepted.', 'একই প্রোগ্রামে দ্বিতীয় আবেদন গ্রহণযোগ্য নয়।'), a('candidate.html', t('Open my application', 'আমার আবেদন খুলুন'), 'btn btn-primary btn-sm')))}
  ${stepper({ id: 'apply-form', steps, form: `data-flow ${act({ set: 'cand=submitted', toast: ['Application submitted. Application ID TX-26-0048213 sent by SMS.', 'আবেদন জমা হয়েছে। আবেদন আইডি TX-26-0048213 এসএমএসে পাঠানো হয়েছে।'], go: 'candidate.html' })}`, submitLabel: t('Submit application', 'আবেদন জমা দিন') })}
</div>`;
  return page({ file: 'apply', title: ['Apply online', 'অনলাইনে আবেদন'], active: 'admissions', body });
}

function candidateLogin() {
  const body = `<div class="container f-sec f-login-wrap">
  <section class="h-card f-login-card" aria-labelledby="cl-t">
    <p class="h-eyebrow">${t('Admissions', 'ভর্তি')}</p><h1 id="cl-t" class="h-h2">${t('Candidate login', 'প্রার্থী লগইন')}</h1>
    <p class="muted">${t('Track your application, pay fees, download the admit card and see your result.', 'আবেদন ট্র্যাক, ফি পরিশোধ, প্রবেশপত্র ডাউনলোড ও ফলাফল দেখুন।')}</p>
    <form class="h-form" data-flow data-after-go="candidate.html" novalidate>
      ${field({ l: ['Application ID', 'আবেদন আইডি'], name: 'u', req: true, value: 'TX-26-0048213', attrs: 'data-pattern="^TX-26-\\d{7}$"', hint: ['Sent by SMS after you applied. Format TX-26-0000000.', 'আবেদনের পর এসএমএসে পাঠানো। ফরম্যাট TX-26-0000000।'] })}
      ${field({ l: ['Date of birth', 'জন্মতারিখ'], name: 'dob', type: 'date', req: true, value: '2009-03-14' })}
      <button type="submit" class="btn btn-primary btn-lg">${t('Sign in', 'লগইন')}</button>
      <button type="button" class="link" ${act({ set: '_=1', toast: ['Your application ID is resent by SMS in production.', 'প্রোডাকশনে এসএমএসে আবেদন আইডি পুনরায় পাঠানো হবে।'] })}>${t('Forgot application ID?', 'আবেদন আইডি ভুলে গেছেন?')}</button></form>
    <p class="proto-note">${t('Prototype: an ID in a different format shows the validation error.', 'প্রোটোটাইপ: ভিন্ন ফরম্যাটের আইডি দিলে ত্রুটি দেখাবে।')}</p></section>
  <aside class="f-login-side"><section class="h-aside-card">${icon('clipboard-list', 'ico ico-lg')}<h2 class="h-h4">${t('Not applied yet?', 'এখনও আবেদন করেননি?')}</h2><p>${t('Diploma 2026–27 applications close on 20 October 2026.', 'ডিপ্লোমা ২০২৬–২৭-এর আবেদন ২০ অক্টোবর ২০২৬ শেষ হবে।')}</p>${a('apply.html', t('Apply online', 'অনলাইনে আবেদন'), 'btn btn-teal btn-sm')}</section>
    <section class="h-aside-card">${icon('graduation-cap', 'ico ico-lg')}<h2 class="h-h4">${t('Already admitted?', 'ইতিমধ্যে ভর্তি হয়েছেন?')}</h2><p>${t('Use Login → Student with your student ID.', 'শিক্ষার্থী আইডি দিয়ে লগইন → শিক্ষার্থী ব্যবহার করুন।')}</p>${a('login.html', t('Login', 'লগইন'), 'btn btn-outline btn-sm')}</section></aside>
</div>`;
  return page({ file: 'candidate-login', title: ['Candidate login', 'প্রার্থী লগইন'], active: 'admissions', body });
}

function candidate() {
  const prog = (cur) => {
    const steps = [['Application submitted', 'আবেদন জমা'], ['Fee paid', 'ফি পরিশোধ'], ['Admission test (08 Nov)', 'ভর্তি পরীক্ষা (০৮ নভেম্বর)'], ['Result', 'ফলাফল'], ['Final admission', 'চূড়ান্ত ভর্তি'], ['Student ID', 'শিক্ষার্থী আইডি']];
    const now = { submitted: 1, paid: 3, selected: 4, admitted: 6 }[cur];
    return `<ol class="f-prog">${each(steps, (l, i) => `<li class="${i < now ? 'done' : i === now ? 'now' : ''}">${tt(l)}</li>`)}</ol>`;
  };
  const body = `<div class="container f-sec">
  <div class="f-cand-head"><div><p class="h-eyebrow">${t('Candidate workspace', 'প্রার্থী ওয়ার্কস্পেস')}</p><h1 class="h-h2">Nusrat Jahan Ria</h1>
    <p class="muted">${t('Application ID', 'আবেদন আইডি')} <b class="mono">TX-26-0048213</b> · ${tt(ADMISSION.cycle)}</p></div>
    <div class="f-btnrow">${a('notices.html', t('Admission notices', 'ভর্তি নোটিশ'), 'btn btn-outline btn-sm', 'megaphone')}${a('index.html', t('Sign out', 'লগআউট'), 'btn btn-ghost btn-sm', 'log-out')}</div></div>

  ${when('cand=none|draft', `${alert('warn', t('No submitted application found for this ID.', 'এই আইডিতে কোনো জমাকৃত আবেদন পাওয়া যায়নি।'), t('Your application may still be a draft. Complete and submit it before 20 October 2026.', 'আপনার আবেদন এখনও খসড়া থাকতে পারে। ২০ অক্টোবর ২০২৬-এর আগে সম্পূর্ণ করে জমা দিন।'), a('apply.html', t('Continue application', 'আবেদন চালিয়ে যান'), 'btn btn-teal btn-sm'))}`)}

  ${when('cand=submitted|payfail', `${prog('submitted')}<div class="f-cand-grid">
    ${card(t('Next step: pay the application fee', 'পরবর্তী ধাপ: আবেদন ফি পরিশোধ'), `
      ${when('cand=payfail', alert('danger', t('Payment failed', 'পরিশোধ ব্যর্থ'), t('The payment gateway declined the transaction (reference PG-88412). No money was deducted. Try again or use another method.', 'পেমেন্ট গেটওয়ে লেনদেনটি প্রত্যাখ্যান করেছে (রেফারেন্স PG-88412)। কোনো টাকা কাটা হয়নি। আবার চেষ্টা করুন বা অন্য পদ্ধতি ব্যবহার করুন।')))}
      <dl class="f-dl"><div><dt>${t('Amount', 'পরিমাণ')}</dt><dd>৳ ${n(500)}</dd></div><div><dt>${t('Due by', 'শেষ সময়')}</dt><dd>${d('20 Oct 2026')}, ${n('23:59')}</dd></div><div><dt>${t('Status', 'অবস্থা')}</dt><dd>${when('cand=submitted', st('unpaid'), 'span')}${when('cand=payfail', st('failed'), 'span')}</dd></div></dl>
      <fieldset class="f-paymethods"><legend>${t('Payment method', 'পরিশোধ পদ্ধতি')}</legend>${each([['bKash', 'বিকাশ'], ['Nagad', 'নগদ'], ['Rocket', 'রকেট'], ['Bank card', 'ব্যাংক কার্ড']], (m, i) => `<label><input type="radio" name="pm" ${i ? '' : 'checked'}><span>${t(m[0], m[1])}</span></label>`)}</fieldset>
      <p class="f-chart-meta">${t('Payment gateway (e.g. ekPay / SSLCommerz)', 'পেমেন্ট গেটওয়ে (যেমন একপে / এসএসএলকমার্জ)')} — ${tbd()}</p>
      <div class="f-proto-ctl"><span>${t('Prototype: simulate the gateway response', 'প্রোটোটাইপ: গেটওয়ের সাড়া অনুকরণ')}</span>
        <button type="button" class="btn btn-teal" ${act({ set: 'cand=paid', toast: ['Payment received. Receipt RCPT-2026-0094471.', 'পরিশোধ গৃহীত হয়েছে। রসিদ RCPT-2026-0094471।'] })}>${t('Pay ৳ 500 — success', '৳ ৫০০ পরিশোধ — সফল')}</button>
        <button type="button" class="btn btn-outline" ${act({ set: 'cand=payfail' })}>${t('Simulate failed payment', 'ব্যর্থ পরিশোধ অনুকরণ')}</button></div>`)}
    ${card(t('Application summary', 'আবেদনের সারাংশ'), `<dl class="f-dl"><div><dt>${t('Programme', 'প্রোগ্রাম')}</dt><dd>${t('Diploma in Textile Engineering', 'ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং')}</dd></div><div><dt>${t('Test centre', 'পরীক্ষাকেন্দ্র')}</dt><dd>${t('Chattogram', 'চট্টগ্রাম')}</dd></div><div><dt>${t('Documents', 'কাগজপত্র')}</dt><dd>${st('submitted')}</dd></div></dl>`)}
  </div>`)}

  ${when('cand=paid', `${prog('paid')}<div class="f-cand-grid">
    ${card(t('Application complete', 'আবেদন সম্পূর্ণ'), `${alert('ok', t('Fee paid on 15 Oct 2026. Receipt RCPT-2026-0094471.', '১৫ অক্টোবর ২০২৬ ফি পরিশোধিত। রসিদ RCPT-2026-0094471।'))}
      <dl class="f-dl"><div><dt>${t('Admission test', 'ভর্তি পরীক্ষা')}</dt><dd>${d('08 Nov 2026')}, ${n('10:00')}</dd></div><div><dt>${t('Centre', 'কেন্দ্র')}</dt><dd>${t('Chattogram Polytechnic Institute (demo)', 'চট্টগ্রাম পলিটেকনিক ইনস্টিটিউট (ডেমো)')}</dd></div><div><dt>${t('Result', 'ফলাফল')}</dt><dd>${d('25 Nov 2026')}</dd></div></dl>
      <button type="button" class="btn btn-primary" ${dl('Admit card is available from 01 Nov 2026. Prototype only.', 'প্রবেশপত্র ০১ নভেম্বর ২০২৬ থেকে পাওয়া যাবে। শুধু প্রোটোটাইপ।')}>${icon('download', 'ico ico-sm')}${t('Admit card', 'প্রবেশপত্র')}</button>`)}
    ${card(t('Prototype: simulate result publication', 'প্রোটোটাইপ: ফলাফল প্রকাশ অনুকরণ'), `<p class="muted">${t('The result is published on 25 Nov 2026. Choose an outcome to continue the flow.', 'ফলাফল ২৫ নভেম্বর ২০২৬ প্রকাশিত হবে। ফ্লো চালিয়ে যেতে একটি ফলাফল বেছে নিন।')}</p>
      <div class="f-btnrow"><button type="button" class="btn btn-teal" ${act({ set: 'cand=selected' })}>${t('Selected', 'নির্বাচিত')}</button><button type="button" class="btn btn-outline" ${act({ set: 'cand=notselected' })}>${t('Not selected', 'নির্বাচিত হয়নি')}</button></div>`, '', 'f-proto-card')}
  </div>`)}

  ${when('cand=selected', `${prog('selected')}<div class="f-cand-grid">
    ${card(t('Result: selected', 'ফলাফল: নির্বাচিত'), `${alert('ok', t('Congratulations. You are selected for Diploma in Textile Engineering.', 'অভিনন্দন। আপনি ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং-এ নির্বাচিত হয়েছেন।'), t('Test score 71/100 · merit position 1,284 · allocated institution: Karnaphuli Textile Institute (Textile Technology).', 'পরীক্ষার নম্বর ৭১/১০০ · মেধাক্রম ১,২৮৪ · বরাদ্দকৃত প্রতিষ্ঠান: কর্ণফুলী টেক্সটাইল ইনস্টিটিউট (টেক্সটাইল টেকনোলজি)।'))}
      <h3>${t('Complete final admission by 15 Dec 2026', '১৫ ডিসেম্বর ২০২৬-এর মধ্যে চূড়ান্ত ভর্তি সম্পন্ন করুন')}</h3>
      <form class="h-form" data-flow ${act({ set: 'cand=admitted', toast: ['Final admission completed. Student ID KTI-2026-0153 issued.', 'চূড়ান্ত ভর্তি সম্পন্ন। শিক্ষার্থী আইডি KTI-2026-0153 ইস্যু হয়েছে।'] })} novalidate>
        ${field({ l: ['Original SSC certificate (scan, PDF)', 'মূল এসএসসি সনদ (স্ক্যান, পিডিএফ)'], name: 'oc', type: 'file', req: true, attrs: 'accept=".pdf,.jpg"' })}
        <label class="fld f-check"><span><input type="checkbox" required> ${t('I will pay the admission fee of ৳ 4,250 now (online).', 'আমি এখন অনলাইনে ৳ ৪,২৫০ ভর্তি ফি পরিশোধ করব।')}</span><span class="err" hidden>${t('Admission fee payment is required.', 'ভর্তি ফি পরিশোধ আবশ্যক।')}</span></label>
        <button type="submit" class="btn btn-teal">${t('Pay ৳ 4,250 and confirm admission', '৳ ৪,২৫০ দিয়ে ভর্তি নিশ্চিত করুন')}</button></form>`)}
    ${card(t('Migration', 'মাইগ্রেশন'), `<p>${t('After admission you may request migration to another institution through your institution, subject to seats.', 'ভর্তির পর আসন সাপেক্ষে নিজ প্রতিষ্ঠানের মাধ্যমে অন্য প্রতিষ্ঠানে মাইগ্রেশনের আবেদন করতে পারবেন।')}</p>`)}
  </div>`)}

  ${when('cand=notselected', `${prog('selected')}${card(t('Result: not selected', 'ফলাফল: নির্বাচিত হননি'), `${alert('info', t('You were not selected in the first merit list.', 'আপনি প্রথম মেধা তালিকায় নির্বাচিত হননি।'), t('Test score 48/100. Your waiting-list position is 2,904. Vacant seats are filled from the waiting list on 18 Dec 2026; you will receive an SMS.', 'পরীক্ষার নম্বর ৪৮/১০০। অপেক্ষমাণ তালিকায় আপনার অবস্থান ২,৯০৪। ১৮ ডিসেম্বর ২০২৬ অপেক্ষমাণ তালিকা থেকে শূন্য আসন পূরণ করা হবে; এসএমএস পাবেন।'))}
    <div class="f-btnrow">${a('admissions.html', t('Other admission options', 'ভর্তির অন্যান্য সুযোগ'), 'btn btn-outline')}<button type="button" class="btn btn-ghost" ${act({ set: 'cand=paid' })}>${t('Prototype: back to before result', 'প্রোটোটাইপ: ফলাফলের আগে ফিরুন')}</button></div>`)}`)}

  ${when('cand=admitted', `${prog('admitted')}<section class="f-transition">${icon('id-card', 'ico ico-xl')}<div>
    <p class="h-eyebrow">${t('Candidate → Student', 'প্রার্থী → শিক্ষার্থী')}</p><h2 class="h-h2">${t('Your admission is complete', 'আপনার ভর্তি সম্পন্ন হয়েছে')}</h2>
    <dl class="f-dl f-dl-4"><div><dt>${t('Former application ID', 'পূর্বের আবেদন আইডি')}</dt><dd class="mono"><s>TX-26-0048213</s></dd></div><div><dt>${t('Student ID', 'শিক্ষার্থী আইডি')}</dt><dd class="mono"><b>KTI-2026-0153</b></dd></div><div><dt>${t('Institution', 'প্রতিষ্ঠান')}</dt><dd>${t('Karnaphuli Textile Institute', 'কর্ণফুলী টেক্সটাইল ইনস্টিটিউট')}</dd></div><div><dt>${t('Classes begin', 'ক্লাস শুরু')}</dt><dd>${d('05 Jan 2027')}</dd></div></dl>
    <p>${t('Your candidate account has been converted to a student account. From now on, sign in with Login → Student.', 'আপনার প্রার্থী অ্যাকাউন্ট শিক্ষার্থী অ্যাকাউন্টে রূপান্তরিত হয়েছে। এখন থেকে লগইন → শিক্ষার্থী ব্যবহার করুন।')}</p>
    ${a('student.html?new=1', t('Go to the student portal', 'স্টুডেন্ট পোর্টালে যান'), 'btn btn-white btn-lg', 'arrow-right')}</div></section>`)}

  ${card(t('Admission notices', 'ভর্তি নোটিশ'), `<ul class="h-nlist">${each(NOTICES.filter((x) => x.cat === 'admission'), (x) => `<li><a href="notice-detail.html"><time>${d(x.date.slice(0, 6))}</time><span>${tt(x.t)}</span></a></li>`)}</ul>`)}
</div>`;
  return page({ file: 'candidate', title: ['Candidate workspace', 'প্রার্থী ওয়ার্কস্পেস'], active: 'admissions', body });
}

function result() {
  const body = `<div class="container f-sec f-narrow">
  <nav class="h-crumb f-crumb-dark"><a href="index.html">${t('Home', 'হোম')}</a><span>/</span><a href="admissions.html">${t('Admissions', 'ভর্তি')}</a><span>/</span><span aria-current="page">${t('Admission result', 'ভর্তির ফলাফল')}</span></nav>
  <h1 class="h-h2">${t('Admission result', 'ভর্তির ফলাফল')}</h1>
  ${alert('info', t('Diploma 2026–27 results will be published on 25 November 2026.', 'ডিপ্লোমা ২০২৬–২৭-এর ফলাফল ২৫ নভেম্বর ২০২৬ প্রকাশিত হবে।'), t('Prototype: sample application IDs return each result state now.', 'প্রোটোটাইপ: নমুনা আবেদন আইডি দিয়ে এখনই প্রতিটি ফলাফলের অবস্থা দেখা যাবে।'))}
  <section class="h-card" id="res-box"><form class="h-form" data-lookup="res-box" data-lookup-map='{"TX-26-0048213":"sel","TX-26-0051177":"wait","TX-26-0049002":"not"}' novalidate>
    ${field({ l: ['Application ID', 'আবেদন আইডি'], name: 'r', req: true, value: 'TX-26-0048213', hint: ['Samples: TX-26-0048213 (selected), TX-26-0051177 (waiting list), TX-26-0049002 (not selected)', 'নমুনা: TX-26-0048213 (নির্বাচিত), TX-26-0051177 (অপেক্ষমাণ), TX-26-0049002 (নির্বাচিত হয়নি)'] })}
    <button type="submit" class="btn btn-primary">${t('View result', 'ফলাফল দেখুন')}</button></form>
    <div data-lookup-res="sel" hidden>${alert('ok', t('Selected — merit position 1,284', 'নির্বাচিত — মেধাক্রম ১,২৮৪'), t('Allocated: Karnaphuli Textile Institute. Sign in as a candidate to complete final admission.', 'বরাদ্দ: কর্ণফুলী টেক্সটাইল ইনস্টিটিউট। চূড়ান্ত ভর্তির জন্য প্রার্থী হিসেবে লগইন করুন।'), a('candidate-login.html', t('Candidate login', 'প্রার্থী লগইন'), 'btn btn-primary btn-sm'))}</div>
    <div data-lookup-res="wait" hidden>${alert('warn', t('Waiting list — position 312', 'অপেক্ষমাণ তালিকা — অবস্থান ৩১২'), t('You will be notified by SMS if a seat becomes available.', 'আসন শূন্য হলে এসএমএসে জানানো হবে।'))}</div>
    <div data-lookup-res="not" hidden>${alert('info', t('Not selected', 'নির্বাচিত হননি'), t('You were not selected in this cycle.', 'এই চক্রে আপনি নির্বাচিত হননি।'))}</div>
    <div data-lookup-res="none" hidden>${alert('danger', t('No result found', 'কোনো ফলাফল পাওয়া যায়নি'), t('Check your application ID. Applications without paid fees do not appear in the result.', 'আবেদন আইডি যাচাই করুন। ফি অপরিশোধিত আবেদন ফলাফলে আসে না।'))}</div></section>
</div>`;
  return page({ file: 'admission-result', title: ['Admission result', 'ভর্তির ফলাফল'], active: 'admissions', body });
}

export default { admissions, apply, 'candidate-login': candidateLogin, candidate, 'admission-result': result };
