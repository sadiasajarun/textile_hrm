// Phase 2 — professional licence and third-party verification (Flow J).
// Shared demo state: lic (none | submitted | returned | issued | rejected), org (none | registered), orgpaid (no | pending | failed | yes).
import { t, tt, n, d, icon, each, page, demo, tbd, st, a, btn, act, dl, field, alert, empty, table, tabs, card, kpis, pageHead, pageHero, stepper, when, timeline, pager, ORG } from '../core.mjs';
import { LICENSE_APPS } from '../data.mjs';
import { flowBanner } from './ministry.mjs';

const REF = 'LIC-APP-2026-00071';
const LIC = 'TX-LIC-2026-000418';
const ORG_NAME = 'Rupsha Knitwear Ltd.';
const GENERIC_ERR = t('Please complete this field correctly.', 'ঘরটি সঠিকভাবে পূরণ করুন।');
/** Field with a specific error message instead of the generic one. */
const withErr = (html, en, bn) => html.replace(GENERIC_ERR, t(en, bn));
const mono = (v) => `<span class="mono">${v}</span>`;
/** Status tag that follows the lic state. */
const licTag = () => ['submitted', 'returned', 'issued', 'rejected'].map((k) => when(`lic=${k}`, st(k), 'span')).join('');
const crumb = (list) => `<nav class="h-crumb f-crumb-dark"><a href="index.html">${t('Home', 'হোম')}</a>${list.map(([l, href]) => `<span>/</span>${href ? `<a href="${href}">${tt(l)}</a>` : `<span aria-current="page">${tt(l)}</span>`}`).join('')}</nav>`;

// ================= PUBLIC: LICENCE OVERVIEW =================
function license() {
  const how = [
    [['Apply online', 'অনলাইনে আবেদন করুন'], ['Enter personal and qualification details and upload the documents.', 'ব্যক্তিগত ও শিক্ষাগত তথ্য দিন এবং কাগজপত্র আপলোড করুন।']],
    [['Head Office review', 'প্রধান কার্যালয়ের যাচাই'], ['The Head Office checks the application against the validation criteria. It may approve, return it for correction, or reject it with a reason.', 'প্রধান কার্যালয় যাচাইয়ের মানদণ্ড অনুযায়ী আবেদন পরীক্ষা করে। অনুমোদন, সংশোধনের জন্য ফেরত বা কারণসহ প্রত্যাখ্যান করতে পারে।']],
    [['Licence number issued', 'লাইসেন্স নম্বর ইস্যু'], ['An approved application receives a unique licence number. You are notified by SMS and email.', 'অনুমোদিত আবেদনে একটি অনন্য লাইসেন্স নম্বর দেওয়া হয়। এসএমএস ও ইমেইলে জানানো হবে।']],
    [['Employers verify the number', 'নিয়োগকর্তা নম্বর যাচাই করেন'], ['Registered organisations search the licence number after paying for verification access.', 'নিবন্ধিত প্রতিষ্ঠান যাচাই সুবিধার অর্থ পরিশোধের পর লাইসেন্স নম্বর অনুসন্ধান করে।']],
  ];
  const body = `${pageHero('dot-office.jpg', ['Department of Textiles', 'বস্ত্র অধিদপ্তর'], [[['Professional licence', 'পেশাগত লাইসেন্স']]], t('Professional licence for textile professionals', 'টেক্সটাইল পেশাজীবীদের পেশাগত লাইসেন্স'), t('Apply for a professional licence, track your application, and let employers verify your licence number.', 'পেশাগত লাইসেন্সের আবেদন করুন, আবেদনের অবস্থা দেখুন এবং নিয়োগকর্তাকে আপনার লাইসেন্স নম্বর যাচাই করতে দিন।'))}
<div class="container f-sec f-adm-layout">
  <div>
    ${alert('info', t('Phase 2 module — proposed design for review', '২য় পর্যায়ের মডিউল — পর্যালোচনার জন্য প্রস্তাবিত নকশা'), t('Licence application, Head Office approval and paid verification are delivered in Phase 2. Items marked TBD will be confirmed by the Ministry before development.', 'লাইসেন্স আবেদন, প্রধান কার্যালয়ের অনুমোদন ও অর্থের বিনিময়ে যাচাই ২য় পর্যায়ে চালু হবে। "নির্ধারিত হবে" চিহ্নিত বিষয়গুলো উন্নয়নের আগে মন্ত্রণালয় নিশ্চিত করবে।'))}
    <section class="f-sec-sm" aria-labelledby="lc-who"><h2 id="lc-who" class="h-h3">${t('Who can apply', 'কারা আবেদন করতে পারবেন')}</h2>
      <ul class="f-list"><li>${t('Individual textile professionals apply in their own name through the public application form.', 'টেক্সটাইল পেশাজীবীরা পাবলিক আবেদন ফরমের মাধ্যমে নিজ নামে আবেদন করবেন।')}</li><li>${t('One application per person. The NID number is checked for an existing application.', 'প্রতি ব্যক্তির একটি আবেদন। বিদ্যমান আবেদন আছে কি না তা এনআইডি নম্বর দিয়ে যাচাই করা হয়।')}</li></ul>
      <p class="f-chart-meta">${t('Eligibility and validation criteria (qualification, experience and other conditions)', 'যোগ্যতা ও যাচাইয়ের মানদণ্ড (শিক্ষাগত যোগ্যতা, অভিজ্ঞতা ও অন্যান্য শর্ত)')} — ${tbd()}</p></section>
    <section class="f-sec-sm" aria-labelledby="lc-how"><h2 id="lc-how" class="h-h3">${t('How it works', 'যেভাবে কাজ করে')}</h2>
      <ol class="f-howto">${each(how, ([h, s], i) => `<li><span>${n(i + 1)}</span><div><b>${tt(h)}</b><p>${tt(s)}</p></div></li>`)}</ol></section>
    <section class="f-sec-sm" aria-labelledby="lc-docs"><h2 id="lc-docs" class="h-h3">${t('Documents to prepare', 'যেসব কাগজপত্র প্রস্তুত রাখবেন')}</h2>
      <ul class="f-list"><li>${t('National ID card (NID)', 'জাতীয় পরিচয়পত্র (এনআইডি)')}</li><li>${t('Academic certificate in textile engineering or technology', 'টেক্সটাইল ইঞ্জিনিয়ারিং বা প্রযুক্তিতে শিক্ষাগত সনদ')}</li><li>${t('Recent passport-size photograph', 'সাম্প্রতিক পাসপোর্ট সাইজের ছবি')}</li><li>${t('Experience certificate (if any)', 'অভিজ্ঞতার সনদ (যদি থাকে)')}</li></ul>
      <p class="f-chart-meta">${t('Final list of required documents', 'প্রয়োজনীয় কাগজপত্রের চূড়ান্ত তালিকা')} — ${tbd()}</p></section>
    <section class="f-sec-sm" aria-labelledby="lc-fee"><h2 id="lc-fee" class="h-h3">${t('Fees and validity', 'ফি ও মেয়াদ')}</h2>
      <dl class="f-dl"><div><dt>${t('Application fee', 'আবেদন ফি')}</dt><dd>${tbd()}</dd></div><div><dt>${t('Licence validity and renewal', 'লাইসেন্সের মেয়াদ ও নবায়ন')}</dt><dd>${tbd()}</dd></div><div><dt>${t('Verification fee for organisations (per check or subscription)', 'প্রতিষ্ঠানের যাচাই ফি (প্রতি যাচাই বা সাবস্ক্রিপশন)')}</dt><dd>${tbd()}</dd></div></dl></section>
    <section class="f-sec-sm" aria-labelledby="lc-link"><h2 id="lc-link" class="h-h3">${t('Institution certificates (Phase 1)', 'প্রতিষ্ঠানের সনদ (১ম পর্যায়)')}</h2>
      <p>${t('Graduates of institutions in this system receive certificates through the student portal. Whether a Phase 1 certificate is attached to the licence application automatically has not been decided.', 'এই সিস্টেমের প্রতিষ্ঠানের স্নাতকরা স্টুডেন্ট পোর্টালের মাধ্যমে সনদ পান। ১ম পর্যায়ের সনদ লাইসেন্স আবেদনে স্বয়ংক্রিয়ভাবে যুক্ত হবে কি না, তা এখনও নির্ধারিত হয়নি।')} ${tbd()}</p></section>
  </div>
  <aside class="f-adm-side">
    <section class="f-adm-box"><h2 class="h-h3">${t('Apply or track', 'আবেদন বা ট্র্যাক')}</h2>
      ${a('license-apply.html', t('Apply for a licence', 'লাইসেন্সের আবেদন'), 'btn btn-teal btn-lg', 'clipboard-list')}
      ${a('license-track.html', t('Track application', 'আবেদনের অবস্থা'), 'btn btn-outline btn-lg', 'route')}
      ${when('lic=submitted|returned|issued|rejected', `${icon('file-text', 'ico ico-sm')}<span>${t('Your application', 'আপনার আবেদন')} ${mono(REF)}</span> ${licTag()}`, 'p', 'f-note')}</section>
    <section class="h-aside-card">${icon('building-2', 'ico ico-lg')}<h2 class="h-h4">${t('For employers and organisations', 'নিয়োগকর্তা ও প্রতিষ্ঠানের জন্য')}</h2><p>${t('Registered organisations verify a licence or certificate by its number after paying for verification access.', 'নিবন্ধিত প্রতিষ্ঠান যাচাই সুবিধার অর্থ পরিশোধের পর নম্বর দিয়ে লাইসেন্স বা সনদ যাচাই করে।')}</p>
      ${a('verifier-register.html', t('Register organisation', 'প্রতিষ্ঠান নিবন্ধন'), 'btn btn-outline btn-sm')} <a class="link" href="verifier.html">${t('Verification workspace', 'যাচাই ওয়ার্কস্পেস')}</a></section>
    <section class="h-aside-card">${icon('headset', 'ico ico-lg')}<h2 class="h-h4">${t('Need help?', 'সহায়তা প্রয়োজন?')}</h2><p>${t('Help desk', 'হেল্প ডেস্ক')}: ${n(ORG.helpline)}</p><a class="link" href="help.html">${t('Help and FAQ', 'সহায়তা ও সাধারণ জিজ্ঞাসা')}</a></section>
  </aside>
</div>`;
  return page({ file: 'license', title: ['Professional licence', 'পেশাগত লাইসেন্স'], body });
}

// ================= PUBLIC: LICENCE APPLICATION =================
function licenseApply() {
  const nid = withErr(field({ l: ['NID number', 'এনআইডি নম্বর'], name: 'nid', req: true, value: '19921512345678901', attrs: 'inputmode="numeric" data-pattern="^(?!1990123456789$)(\\d{10}|\\d{13}|\\d{17})$"', hint: ['10, 13 or 17 digits. Prototype: NID 1990123456789 already has an application (duplicate check).', '১০, ১৩ বা ১৭ সংখ্যা। প্রোটোটাইপ: এনআইডি 1990123456789-এ আগে থেকেই একটি আবেদন আছে (ডুপ্লিকেট যাচাই)।'] }),
    'Enter a valid NID number. If this NID already has a licence application, a second application is not accepted — track the existing application instead.', 'সঠিক এনআইডি নম্বর দিন। এই এনআইডিতে আগে থেকে লাইসেন্স আবেদন থাকলে দ্বিতীয় আবেদন গ্রহণযোগ্য নয় — বিদ্যমান আবেদনটি ট্র্যাক করুন।');
  const steps = [
    { l: ['Personal details', 'ব্যক্তিগত তথ্য'], content: `<h2 class="h-h3">${t('Personal details', 'ব্যক্তিগত তথ্য')}</h2><div class="f-grid2">
      ${field({ l: ['Full name (as in NID)', 'পূর্ণ নাম (এনআইডি অনুযায়ী)'], name: 'name', req: true, value: 'Sabbir Hossain' })}${nid}
      ${field({ l: ['Date of birth', 'জন্মতারিখ'], name: 'dob', type: 'date', req: true, value: '1996-07-02' })}${field({ l: ['Mobile number', 'মোবাইল নম্বর'], name: 'mob', req: true, value: '01819000000', attrs: 'inputmode="tel" data-pattern="^01[3-9]\\d{8}$"', hint: ['11 digits, e.g. 01711000000', '১১ সংখ্যা, যেমন 01711000000'] })}
      ${field({ l: ['Email', 'ইমেইল'], name: 'email', type: 'email', req: true, value: 'sabbir.hossain@example.com', attrs: 'data-pattern="^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"' })}${field({ l: ['Present address', 'বর্তমান ঠিকানা'], name: 'addr', rows: 2, req: true, value: 'House 12, Road 4, Agrabad, Chattogram' })}</div>
      <p class="f-note">${icon('plug', 'ico ico-sm')}${t('In production, the NID can be checked with the national identity service. Integration', 'প্রোডাকশনে জাতীয় পরিচয় সেবার সাথে এনআইডি যাচাই করা যেতে পারে। ইন্টিগ্রেশন')} — ${tbd()}</p>` },
    { l: ['Qualification', 'শিক্ষাগত যোগ্যতা'], content: `<h2 class="h-h3">${t('Textile qualification and experience', 'টেক্সটাইল শিক্ষাগত যোগ্যতা ও অভিজ্ঞতা')}</h2><div class="f-grid2">
      ${field({ l: ['Highest textile qualification', 'সর্বোচ্চ টেক্সটাইল শিক্ষাগত যোগ্যতা'], name: 'qual', req: true, opts: [['', '— Select —', '— নির্বাচন করুন —'], ['dip', 'Diploma in Textile Engineering', 'ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং'], ['bsc', 'B.Sc. in Textile Engineering', 'বি.এসসি ইন টেক্সটাইল ইঞ্জিনিয়ারিং', true], ['msc', 'M.Sc. in Textile Engineering', 'এম.এসসি ইন টেক্সটাইল ইঞ্জিনিয়ারিং'], ['oth', 'Other textile qualification', 'অন্যান্য টেক্সটাইল যোগ্যতা']] })}
      ${field({ l: ['Institution', 'প্রতিষ্ঠান'], name: 'inst', req: true, value: 'Textile Engineering College, Noakhali' })}
      ${field({ l: ['Passing year', 'পাসের সাল'], name: 'year', req: true, value: '2019', attrs: 'inputmode="numeric" data-min="1960" data-max="2026"', hint: ['Between 1960 and 2026.', '১৯৬০ থেকে ২০২৬-এর মধ্যে।'] })}
      ${field({ l: ['Years of professional experience', 'পেশাগত অভিজ্ঞতা (বছর)'], name: 'exp', req: true, value: '6', attrs: 'inputmode="numeric" data-min="0" data-max="60"' })}
      ${field({ l: ['Current employer (optional)', 'বর্তমান নিয়োগকর্তা (ঐচ্ছিক)'], name: 'emp', value: '' })}
      ${field({ l: ['Certificate number from this system (if any)', 'এই সিস্টেমের সনদ নম্বর (যদি থাকে)'], name: 'cno', value: '', attrs: 'data-pattern="^CERT-\\d{4}-\\d{5}$"', hint: ['Format CERT-2025-00481. Automatic retrieval of Phase 1 certificates is TBD.', 'ফরম্যাট CERT-2025-00481। ১ম পর্যায়ের সনদ স্বয়ংক্রিয়ভাবে আনা হবে কি না — নির্ধারিত হবে।'] })}</div>
      <p class="f-chart-meta">${t('Licence categories (if any) and minimum qualification or experience', 'লাইসেন্সের শ্রেণি (যদি থাকে) ও ন্যূনতম যোগ্যতা বা অভিজ্ঞতা')} — ${tbd()}</p>` },
    { l: ['Documents', 'কাগজপত্র'], content: `<h2 class="h-h3">${t('Upload documents', 'কাগজপত্র আপলোড')}</h2>
      ${field({ l: ['NID copy, both sides (PDF or JPG, max 2 MB)', 'এনআইডির কপি, উভয় পৃষ্ঠা (পিডিএফ বা জেপিজি, সর্বোচ্চ ২ এমবি)'], name: 'fnid', type: 'file', req: true, attrs: 'accept=".pdf,.jpg,.jpeg" data-max-kb="2048"' })}
      ${field({ l: ['Academic certificate (PDF or JPG, max 2 MB)', 'শিক্ষাগত সনদ (পিডিএফ বা জেপিজি, সর্বোচ্চ ২ এমবি)'], name: 'fcert', type: 'file', req: true, attrs: 'accept=".pdf,.jpg,.jpeg" data-max-kb="2048"' })}
      ${field({ l: ['Photograph (JPG, max 300 KB)', 'ছবি (জেপিজি, সর্বোচ্চ ৩০০ কেবি)'], name: 'fphoto', type: 'file', req: true, attrs: 'accept=".jpg,.jpeg,.png" data-max-kb="300"' })}
      ${field({ l: ['Experience certificate (optional)', 'অভিজ্ঞতার সনদ (ঐচ্ছিক)'], name: 'fexp', type: 'file', attrs: 'accept=".pdf,.jpg,.jpeg" data-max-kb="2048"' })}
      ${alert('info', t('Missing documents', 'কাগজপত্র অসম্পূর্ণ'), t('You cannot continue until the NID copy, academic certificate and photograph are uploaded. Choose any small file from your computer to test the prototype.', 'এনআইডির কপি, শিক্ষাগত সনদ ও ছবি আপলোড না করা পর্যন্ত এগোনো যাবে না। প্রোটোটাইপ পরীক্ষার জন্য আপনার কম্পিউটার থেকে যেকোনো ছোট ফাইল বেছে নিন।'))}` },
    { l: ['Review and submit', 'যাচাই ও জমা'], content: `<h2 class="h-h3">${t('Review your application', 'আবেদন যাচাই করুন')}</h2>
      <dl class="f-review">${each([['name', ['Name', 'নাম'], 0], ['nid', ['NID number', 'এনআইডি নম্বর'], 0], ['mob', ['Mobile', 'মোবাইল'], 0], ['email', ['Email', 'ইমেইল'], 0], ['qual', ['Qualification', 'শিক্ষাগত যোগ্যতা'], 1], ['inst', ['Institution', 'প্রতিষ্ঠান'], 1], ['year', ['Passing year', 'পাসের সাল'], 1], ['fnid', ['NID copy', 'এনআইডির কপি'], 2], ['fcert', ['Academic certificate', 'শিক্ষাগত সনদ'], 2], ['fphoto', ['Photograph', 'ছবি'], 2]], ([k, l, s]) => `<div><dt>${tt(l)}</dt><dd data-review="${k}">—</dd><button type="button" class="link" data-step-goto="${s}">${t('Edit', 'সম্পাদনা')}</button></div>`)}</dl>
      <label class="fld f-check"><span><input type="checkbox" required> ${t('I declare that the information and documents are correct. False information will cancel the application and any licence issued.', 'আমি ঘোষণা করছি যে তথ্য ও কাগজপত্র সঠিক। মিথ্যা তথ্যে আবেদন ও ইস্যুকৃত লাইসেন্স বাতিল হবে।')}</span><span class="err" hidden>${t('Please confirm the declaration.', 'অনুগ্রহ করে ঘোষণা নিশ্চিত করুন।')}</span></label>
      <p class="f-note">${icon('wallet', 'ico ico-sm')}${t('Application fee and payment step, if any', 'আবেদন ফি ও পরিশোধের ধাপ, যদি থাকে')} — ${tbd()}</p>` },
  ];
  const body = `<div class="container f-sec f-narrow">
  ${crumb([[['Professional licence', 'পেশাগত লাইসেন্স'], 'license.html'], [['Apply', 'আবেদন']]])}
  <h1 class="h-h2">${t('Professional licence application', 'পেশাগত লাইসেন্সের আবেদন')}</h1>
  <p class="muted">${t('Fields marked * are required. You can save a draft at any step.', '* চিহ্নিত ঘর আবশ্যক। যেকোনো ধাপে খসড়া সংরক্ষণ করতে পারেন।')}</p>
  ${when('lic=submitted|issued', alert('info', t(`You have already submitted a licence application (${REF}).`, `আপনি ইতিমধ্যে একটি লাইসেন্স আবেদন জমা দিয়েছেন (${REF})।`), t('A second application is not accepted while an application is in progress or a licence is active.', 'একটি আবেদন প্রক্রিয়াধীন থাকলে বা লাইসেন্স সক্রিয় থাকলে দ্বিতীয় আবেদন গ্রহণযোগ্য নয়।'), a('license-track.html', t('Track my application', 'আমার আবেদন ট্র্যাক করুন'), 'btn btn-primary btn-sm')))}
  ${when('lic=returned', alert('warn', t('The Head Office returned your application for correction.', 'প্রধান কার্যালয় আপনার আবেদন সংশোধনের জন্য ফেরত পাঠিয়েছে।'), t('Upload the corrected document from the tracking page. You do not need to apply again.', 'ট্র্যাকিং পাতা থেকে সংশোধিত কাগজ আপলোড করুন। নতুন করে আবেদন করতে হবে না।'), a('license-track.html', t('Open tracking page', 'ট্র্যাকিং পাতা খুলুন'), 'btn btn-primary btn-sm')))}
  ${when('lic=rejected', alert('info', t('Your previous application was rejected.', 'আপনার আগের আবেদন প্রত্যাখ্যাত হয়েছে।'), t('You may submit a new application after addressing the reason given by the Head Office. Waiting period, if any', 'প্রধান কার্যালয়ের দেওয়া কারণ সমাধানের পর নতুন আবেদন করতে পারবেন। অপেক্ষার সময়, যদি থাকে') + ` — ${tbd()}`))}
  ${stepper({ id: 'lic-form', steps, form: `data-flow ${act({ set: 'lic=submitted', toast: [`Application submitted. Reference ${REF} sent by SMS and email.`, `আবেদন জমা হয়েছে। রেফারেন্স ${REF} এসএমএস ও ইমেইলে পাঠানো হয়েছে।`], go: 'license-track.html' })}`, submitLabel: t('Submit application', 'আবেদন জমা দিন') })}
</div>`;
  return page({ file: 'license-apply', title: ['Licence application', 'লাইসেন্স আবেদন'], body });
}

// ================= PUBLIC: TRACK APPLICATION =================
function licenseTrack() {
  const sub = { l: ['Application submitted', 'আবেদন জমা'], who: ['Sabbir Hossain', 'সাব্বির হোসেন'], at: '15 Oct 2026', st: 'done' };
  const body = `<div class="container f-sec f-narrow">
  ${crumb([[['Professional licence', 'পেশাগত লাইসেন্স'], 'license.html'], [['Track application', 'আবেদনের অবস্থা']]])}
  <h1 class="h-h2">${t('Track your licence application', 'লাইসেন্স আবেদনের অবস্থা দেখুন')}</h1>
  <section class="h-card" id="lt-box"><h2 class="h-h3">${t('Find an application', 'আবেদন খুঁজুন')}</h2>
    <form class="h-form f-grid2" data-lookup="lt-box" data-lookup-map='{"${REF}":"mine"}' novalidate>
      ${field({ l: ['Application reference', 'আবেদনের রেফারেন্স'], name: 'ref', req: true, value: REF, hint: [`Try ${REF} or any other reference.`, `${REF} বা অন্য যেকোনো রেফারেন্স দিয়ে দেখুন।`] })}
      ${field({ l: ['Registered mobile number', 'নিবন্ধিত মোবাইল নম্বর'], name: 'mob', req: true, value: '01819000000', attrs: 'inputmode="tel" data-pattern="^01[3-9]\\d{8}$"' })}
      <div class="f-btnrow"><button type="submit" class="btn btn-primary">${icon('search', 'ico ico-sm')}${t('Find application', 'আবেদন খুঁজুন')}</button></div></form>
    <div data-lookup-res="mine" hidden>${when('lic=none', alert('warn', t('No submitted application with this reference yet.', 'এই রেফারেন্সে এখনও কোনো জমাকৃত আবেদন নেই।'), t('Submit the application first. The reference is sent by SMS after submission.', 'আগে আবেদন জমা দিন। জমা দেওয়ার পর এসএমএসে রেফারেন্স পাঠানো হয়।'), a('license-apply.html', t('Apply for a licence', 'লাইসেন্সের আবেদন'), 'btn btn-teal btn-sm')))}${when('lic=submitted|returned|issued|rejected', alert('ok', t('Application found. Its current status is shown below.', 'আবেদন পাওয়া গেছে। বর্তমান অবস্থা নিচে দেখানো হয়েছে।')))}</div>
    <div data-lookup-res="none" hidden>${alert('danger', t('No application found', 'কোনো আবেদন পাওয়া যায়নি'), t('Check the reference and the mobile number used in the application, then try again.', 'রেফারেন্স ও আবেদনে ব্যবহৃত মোবাইল নম্বর যাচাই করে আবার চেষ্টা করুন।'))}</div></section>

  ${when('lic=none', empty(t('You have no licence application yet', 'আপনার এখনও কোনো লাইসেন্স আবেদন নেই'), t('Applications submitted from this device appear here with each review step.', 'এই ডিভাইস থেকে জমা দেওয়া আবেদন প্রতিটি যাচাই-ধাপসহ এখানে দেখা যাবে।'), a('license-apply.html', t('Apply for a licence', 'লাইসেন্সের আবেদন'), 'btn btn-teal'), 'file-text'))}

  ${when('lic=submitted|returned|issued|rejected', `<section class="h-card"><header class="h-card-head"><h2>${t('Application', 'আবেদন')} ${mono(REF)}</h2>${licTag()}</header>
    <dl class="f-dl f-dl-4"><div><dt>${t('Applicant', 'আবেদনকারী')}</dt><dd>${t('Sabbir Hossain', 'সাব্বির হোসেন')}</dd></div><div><dt>${t('Qualification', 'শিক্ষাগত যোগ্যতা')}</dt><dd>${tt(LICENSE_APPS[0].q)}</dd></div><div><dt>${t('Submitted', 'জমার তারিখ')}</dt><dd>${d('15 Oct 2026')}</dd></div><div><dt>${t('Reviewing office', 'যাচাইকারী দপ্তর')}</dt><dd>${t('Head Office', 'প্রধান কার্যালয়')}</dd></div></dl>
    ${when('lic=submitted', timeline([sub, { l: ['Document and eligibility check', 'কাগজপত্র ও যোগ্যতা যাচাই'], who: ['Head Office', 'প্রধান কার্যালয়'], st: 'now', note: ['Your application is waiting for review. Service time', 'আপনার আবেদন যাচাইয়ের অপেক্ষায়। সেবা প্রদানের সময়'] }, { l: ['Decision', 'সিদ্ধান্ত'], st: 'todo' }, { l: ['Licence number issued', 'লাইসেন্স নম্বর ইস্যু'], st: 'todo' }]))}
    ${when('lic=submitted', `<p class="f-chart-meta">${t('Review service time (days)', 'যাচাইয়ের সেবা-সময় (দিন)')} — ${tbd()}</p>`)}
    ${when('lic=returned', `${timeline([sub, { l: ['Returned for correction', 'সংশোধনের জন্য ফেরত'], who: ['Head Office', 'প্রধান কার্যালয়'], at: '15 Oct 2026', st: 'warn', note: ['The academic certificate copy is not legible. Upload a clear copy of the full certificate.', 'শিক্ষাগত সনদের কপি অস্পষ্ট। পুরো সনদের একটি পরিষ্কার কপি আপলোড করুন।'] }, { l: ['Resubmit the corrected document', 'সংশোধিত কাগজ পুনরায় জমা'], st: 'now' }, { l: ['Decision', 'সিদ্ধান্ত'], st: 'todo' }])}
      <form class="h-form f-card-form" data-flow ${act({ set: 'lic=submitted', toast: ['Corrected document submitted. The application returns to the Head Office queue.', 'সংশোধিত কাগজ জমা হয়েছে। আবেদনটি আবার প্রধান কার্যালয়ের তালিকায় গেছে।'] })} novalidate><h3>${t('Upload the corrected document', 'সংশোধিত কাগজ আপলোড করুন')}</h3>
        ${field({ l: ['Academic certificate (PDF or JPG, max 2 MB)', 'শিক্ষাগত সনদ (পিডিএফ বা জেপিজি, সর্বোচ্চ ২ এমবি)'], name: 'fix', type: 'file', req: true, attrs: 'accept=".pdf,.jpg,.jpeg" data-max-kb="2048"' })}
        <button type="submit" class="btn btn-teal">${icon('upload', 'ico ico-sm')}${t('Resubmit', 'পুনরায় জমা দিন')}</button></form>`)}
    ${when('lic=issued', `${timeline([sub, { l: ['Document and eligibility check', 'কাগজপত্র ও যোগ্যতা যাচাই'], who: ['Head Office', 'প্রধান কার্যালয়'], at: '15 Oct 2026', st: 'done' }, { l: ['Approved', 'অনুমোদিত'], who: ['Head Office', 'প্রধান কার্যালয়'], at: '15 Oct 2026', st: 'done' }, { l: ['Licence number issued', 'লাইসেন্স নম্বর ইস্যু'], at: '15 Oct 2026', st: 'done' }])}
      ${alert('ok', t('Your licence has been issued.', 'আপনার লাইসেন্স ইস্যু হয়েছে।'), t('Share the licence number with employers. Registered organisations can verify it online.', 'লাইসেন্স নম্বরটি নিয়োগকর্তাকে দিন। নিবন্ধিত প্রতিষ্ঠান অনলাইনে তা যাচাই করতে পারবে।'))}
      <dl class="f-dl f-dl-4"><div><dt>${t('Licence number', 'লাইসেন্স নম্বর')}</dt><dd class="mono"><b>${LIC}</b></dd></div><div><dt>${t('Issued on', 'ইস্যুর তারিখ')}</dt><dd>${d('15 Oct 2026')}</dd></div><div><dt>${t('Valid until', 'মেয়াদ')}</dt><dd>${tbd()}</dd></div><div><dt>${t('Issued by', 'ইস্যুকারী')}</dt><dd>${t('Head Office', 'প্রধান কার্যালয়')}</dd></div></dl>
      <div class="f-btnrow">${btn(t('Download licence (PDF)', 'লাইসেন্স ডাউনলোড (পিডিএফ)'), dl(), 'btn-primary', 'download')}${a('verifier.html', t('How employers verify it', 'নিয়োগকর্তা যেভাবে যাচাই করেন'), 'btn btn-outline', 'shield-check')}</div>
      <p class="f-chart-meta">${t('Licence document layout, QR code and digital signature', 'লাইসেন্স নথির বিন্যাস, কিউআর কোড ও ডিজিটাল স্বাক্ষর')} — ${tbd()}</p>`)}
    ${when('lic=rejected', `${timeline([sub, { l: ['Document and eligibility check', 'কাগজপত্র ও যোগ্যতা যাচাই'], who: ['Head Office', 'প্রধান কার্যালয়'], at: '15 Oct 2026', st: 'done' }, { l: ['Rejected', 'প্রত্যাখ্যাত'], who: ['Head Office', 'প্রধান কার্যালয়'], at: '15 Oct 2026', st: 'fail', note: ['The qualification could not be confirmed with the issuing institution.', 'ইস্যুকারী প্রতিষ্ঠানের সাথে শিক্ষাগত যোগ্যতা নিশ্চিত করা যায়নি।'] }])}
      ${alert('danger', t('Your application was rejected.', 'আপনার আবেদন প্রত্যাখ্যাত হয়েছে।'), `${t('Read the reason above. Appeal or re-application process', 'উপরের কারণ পড়ুন। আপিল বা পুনরায় আবেদনের প্রক্রিয়া')} — ${tbd()}`)}`)}
  </section>`)}
  <div class="f-proto-ctl"><span>${t('Prototype: the Head Office decides in the Ministry Portal', 'প্রোটোটাইপ: প্রধান কার্যালয় মন্ত্রণালয় পোর্টালে সিদ্ধান্ত নেয়')}</span>${a('ministry-licenses.html', t('Open Head Office review', 'প্রধান কার্যালয়ের যাচাই খুলুন'), 'btn btn-outline btn-sm', 'arrow-right')}</div>
</div>`;
  return page({ file: 'license-track', title: ['Track licence application', 'লাইসেন্স আবেদনের অবস্থা'], body });
}

// ================= MINISTRY (HEAD OFFICE): LICENCES =================
function ministryLicenses() {
  const decide = (sm = '') => `<span class="f-acts">
    <button type="button" class="btn btn-teal ${sm}" ${act({ set: 'lic=issued', confirm: [`Approve ${REF} and issue a licence number?`, `${REF} অনুমোদন করে লাইসেন্স নম্বর ইস্যু করবেন?`], ctext: [`Licence ${LIC} will be issued to Sabbir Hossain. The applicant is notified by SMS and email.`, `সাব্বির হোসেনকে লাইসেন্স ${LIC} ইস্যু হবে। আবেদনকারীকে এসএমএস ও ইমেইলে জানানো হবে।`], toast: [`Licence ${LIC} issued.`, `লাইসেন্স ${LIC} ইস্যু হয়েছে।`] })}>${icon('badge-check', 'ico ico-sm')}${t('Approve and issue number', 'অনুমোদন ও নম্বর ইস্যু')}</button>
    <button type="button" class="btn btn-outline ${sm}" ${act({ set: 'lic=returned', confirm: [`Return ${REF} for correction?`, `${REF} সংশোধনের জন্য ফেরত পাঠাবেন?`], reason: true, toast: ['Returned to the applicant with your note.', 'আপনার মন্তব্যসহ আবেদনকারীকে ফেরত পাঠানো হয়েছে।'] })}>${t('Return for correction', 'সংশোধনের জন্য ফেরত')}</button>
    <button type="button" class="btn btn-danger ${sm}" ${act({ set: 'lic=rejected', confirm: [`Reject ${REF}?`, `${REF} প্রত্যাখ্যান করবেন?`], reason: true, toast: ['Application rejected. The applicant is notified with the reason.', 'আবেদন প্রত্যাখ্যাত। আবেদনকারীকে কারণসহ জানানো হয়েছে।'] })}>${t('Reject with reason', 'কারণসহ প্রত্যাখ্যান')}</button></span>`;
  const [mine, ret, appr] = LICENSE_APPS;
  const rows = [
    { attrs: 'data-when="lic=submitted|returned|issued|rejected"', status: 'review', cells: [mono(mine.ref), `<b>${mine.n}</b><small>${tt(mine.q)}</small>`, d('15 Oct 2026'), licTag(), `${when('lic=submitted', `<a class="btn btn-outline btn-sm" href="#lic-review">${t('Review', 'যাচাই')}</a>`, 'span')}${when('lic=issued', mono(LIC), 'span')}${when('lic=returned', t('Waiting for applicant', 'আবেদনকারীর অপেক্ষায়'), 'span')}${when('lic=rejected', t('Closed', 'বন্ধ'), 'span')}`] },
    { status: 'returned', cells: [mono(ret.ref), `<b>${ret.n}</b><small>${tt(ret.q)}</small>`, d(ret.d), st('returned'), t('Waiting for applicant', 'আবেদনকারীর অপেক্ষায়')] },
    { status: 'approved', cells: [mono(appr.ref), `<b>${appr.n}</b><small>${tt(appr.q)}</small>`, d(appr.d), st('approved'), mono('TX-LIC-2026-000402')] },
  ];
  const register = [
    { attrs: 'data-when="lic=issued"', status: 'valid', cells: [mono(LIC), 'Sabbir Hossain', d('15 Oct 2026'), tbd(), st('valid')] },
    { status: 'valid', cells: [mono('TX-LIC-2026-000402'), 'Kazi Anwar Hossain', d('06 Oct 2026'), tbd(), st('valid')] },
    { status: 'expired', cells: [mono('TX-LIC-2024-000102'), 'Md. Rashedul Karim', d('03 Jul 2024'), d('30 Jun 2026'), st('expired')] },
    { status: 'revoked', cells: [mono('TX-LIC-2023-000057'), 'Shahana Parvin', d('18 May 2023'), '—', st('revoked')] },
  ];
  const orgs = [
    { attrs: 'data-when="org=registered"', status: 'active', cells: [`<b>${ORG_NAME}</b><small>TRAD/DNCC/2021/018734</small>`, t('Employer', 'নিয়োগকর্তা'), d('15 Oct 2026'), `${when('orgpaid=yes', st('paid'), 'span')}${when('orgpaid=no|pending', st('unpaid'), 'span')}${when('orgpaid=failed', st('failed'), 'span')}`] },
    { status: 'active', cells: [`<b>Meghdoot Apparels Ltd.</b><small>TRAD/DNCC/2019/004512</small>`, t('Employer', 'নিয়োগকর্তা'), d('12 Aug 2026'), st('paid')] },
  ];
  const rules = [['Validation criteria used in the review', 'যাচাইয়ে ব্যবহৃত মানদণ্ড'], ['Licence categories, validity period and renewal', 'লাইসেন্সের শ্রেণি, মেয়াদ ও নবায়ন'], ['Licence number format', 'লাইসেন্স নম্বরের ফরম্যাট'], ['Application fee', 'আবেদন ফি'], ['Verification pricing model (per check or subscription) and amount', 'যাচাই মূল্য-কাঠামো (প্রতি যাচাই বা সাবস্ক্রিপশন) ও পরিমাণ'], ['Payment gateway and invoicing', 'পেমেন্ট গেটওয়ে ও ইনভয়েস'], ['Approval of organisation accounts before activation', 'সক্রিয় করার আগে প্রতিষ্ঠানের অ্যাকাউন্ট অনুমোদন'], ['Link between Phase 1 certificates and licence applications', '১ম পর্যায়ের সনদ ও লাইসেন্স আবেদনের সংযোগ']];
  const body = `${pageHead({ eyebrow: ['Phase 2', '২য় পর্যায়'], title: t('Professional licences', 'পেশাগত লাইসেন্স'), sub: t('Review applications against the validation criteria, then approve and issue a licence number, return for correction, or reject with a reason.', 'যাচাইয়ের মানদণ্ড অনুযায়ী আবেদন পর্যালোচনা করুন; তারপর অনুমোদন করে লাইসেন্স নম্বর ইস্যু করুন, সংশোধনের জন্য ফেরত দিন বা কারণসহ প্রত্যাখ্যান করুন।') })}
  ${kpis([{ l: ['Waiting for review', 'যাচাইয়ের অপেক্ষায়'], raw: `${when('lic=submitted', n(1), 'span')}${when('lic=none|returned|issued|rejected', n(0), 'span')}`, s: ['Applications', 'আবেদন'] }, { l: ['Returned for correction', 'সংশোধনের জন্য ফেরত'], raw: `${when('lic=returned', n(2), 'span')}${when('lic=none|submitted|issued|rejected', n(1), 'span')}`, s: ['Waiting for applicant', 'আবেদনকারীর অপেক্ষায়'] }, { l: ['Licences issued in 2026', '২০২৬ সালে ইস্যুকৃত লাইসেন্স'], raw: `${when('lic=issued', n(2), 'span')}${when('lic=none|submitted|returned|rejected', n(1), 'span')}`, s: ['Demo / Illustrative Data', 'ডেমো / উদাহরণমূলক তথ্য'] }, { l: ['Registered organisations', 'নিবন্ধিত প্রতিষ্ঠান'], raw: `${when('org=registered', n(2), 'span')}${when('org=none', n(1), 'span')}`, s: ['Demo / Illustrative Data', 'ডেমো / উদাহরণমূলক তথ্য'] }])}
  ${when('lic=none', alert('info', t('Flow J: no new application from the public form yet.', 'ফ্লো জে: পাবলিক ফরম থেকে এখনও কোনো নতুন আবেদন আসেনি।'), t('Submit a licence application to see it in this queue.', 'এই তালিকায় দেখতে একটি লাইসেন্স আবেদন জমা দিন।'), a('license-apply.html', t('Open licence application', 'লাইসেন্স আবেদন খুলুন'), 'btn btn-outline btn-sm')))}
  ${when('lic=returned', flowBanner('J', t(`${REF} returned for correction. The applicant resubmits from the tracking page.`, `${REF} সংশোধনের জন্য ফেরত গেছে। আবেদনকারী ট্র্যাকিং পাতা থেকে পুনরায় জমা দেবেন।`), a('license-track.html', t('Applicant view', 'আবেদনকারীর দৃশ্য'), 'btn btn-outline btn-sm')))}
  ${when('lic=issued', flowBanner('J', t(`Licence ${LIC} issued to Sabbir Hossain. Next: an organisation registers and verifies the number.`, `সাব্বির হোসেনকে লাইসেন্স ${LIC} ইস্যু হয়েছে। পরবর্তী ধাপ: একটি প্রতিষ্ঠান নিবন্ধন করে নম্বরটি যাচাই করবে।`), a('verifier-register.html', t('Organisation registration', 'প্রতিষ্ঠান নিবন্ধন'), 'btn btn-outline btn-sm')))}
  ${when('lic=rejected', flowBanner('J', t(`${REF} rejected. The applicant sees the reason on the tracking page.`, `${REF} প্রত্যাখ্যাত। আবেদনকারী ট্র্যাকিং পাতায় কারণ দেখবেন।`), a('license-track.html', t('Applicant view', 'আবেদনকারীর দৃশ্য'), 'btn btn-outline btn-sm')))}
  ${tabs('ml', [
    { id: 'queue', l: ['Applications', 'আবেদন'], content: `${table({ id: 'lic-q', search: ['Reference or applicant name', 'রেফারেন্স বা আবেদনকারীর নাম'], statusFilter: ['review', 'returned', 'approved'], cols: [{ l: ['Ref.', 'রেফারেন্স'] }, { l: ['Applicant and qualification', 'আবেদনকারী ও যোগ্যতা'] }, { l: ['Submitted', 'জমার তারিখ'] }, { l: ['Status', 'অবস্থা'] }, { l: ['Action / licence no.', 'কাজ / লাইসেন্স নম্বর'] }], rows, foot: pager(3, 3) })}
      ${when('lic=submitted', `<section class="h-card" id="lic-review"><header class="h-card-head"><h2>${t('Review', 'যাচাই')} ${mono(REF)} — ${t('Sabbir Hossain', 'সাব্বির হোসেন')}</h2>${st('review')}</header>
        <div class="f-grid2"><dl class="f-dl"><div><dt>${t('NID number', 'এনআইডি নম্বর')}</dt><dd class="mono">1992••••••••78901</dd></div><div><dt>${t('Qualification', 'শিক্ষাগত যোগ্যতা')}</dt><dd>${tt(mine.q)}</dd></div><div><dt>${t('Institution', 'প্রতিষ্ঠান')}</dt><dd>${t('Textile Engineering College, Noakhali', 'টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ, নোয়াখালী')}</dd></div><div><dt>${t('Experience', 'অভিজ্ঞতা')}</dt><dd>${n(6)} ${t('years', 'বছর')}</dd></div></dl>
        <ul class="f-docs">${each([['NID copy', 'এনআইডির কপি'], ['Academic certificate', 'শিক্ষাগত সনদ'], ['Photograph', 'ছবি']], (x) => `<li>${icon('paperclip', 'ico')}<span><b>${tt(x)}</b><small>${t('Uploaded 15 Oct 2026', 'আপলোড ১৫ অক্টোবর ২০২৬')}</small></span><button type="button" class="btn btn-outline btn-sm" ${act({ set: '_=1', toast: ['The document viewer opens here in production.', 'প্রোডাকশনে এখানে নথি দেখার উইন্ডো খুলবে।'] })}>${icon('eye', 'ico ico-sm')}${t('View', 'দেখুন')}</button></li>`)}</ul></div>
        <fieldset class="f-checklist"><legend class="h-h4">${t('Validation checklist', 'যাচাই তালিকা')}</legend>
          ${each([['NID details match the applicant', 'এনআইডির তথ্য আবেদনকারীর সাথে মিলেছে'], ['Qualification certificate checked with the issuing institution', 'ইস্যুকারী প্রতিষ্ঠানের সাথে শিক্ষাগত সনদ যাচাই করা হয়েছে'], ['No existing application or licence for this NID', 'এই এনআইডিতে বিদ্যমান আবেদন বা লাইসেন্স নেই']], (x) => `<label class="fld f-check"><span><input type="checkbox" checked> ${tt(x)}</span></label>`)}
          <p class="f-chart-meta">${t('Full validation criteria', 'যাচাইয়ের পূর্ণ মানদণ্ড')} — ${tbd()}</p></fieldset>
        <div class="f-btnrow">${decide()}</div></section>`)}` },
    { id: 'issued', l: ['Issued licences', 'ইস্যুকৃত লাইসেন্স'], content: `${table({ id: 'lic-reg', search: ['Licence number or holder', 'লাইসেন্স নম্বর বা ধারক'], statusFilter: ['valid', 'expired', 'revoked'], cols: [{ l: ['Licence no.', 'লাইসেন্স নম্বর'] }, { l: ['Holder', 'ধারক'] }, { l: ['Issued', 'ইস্যু'] }, { l: ['Valid until', 'মেয়াদ'] }, { l: ['Status', 'অবস্থা'] }], rows: register })}
      <p class="f-chart-meta">${demo()} · ${t('Revocation and renewal procedures', 'বাতিল ও নবায়নের প্রক্রিয়া')} — ${tbd()}</p>` },
    { id: 'orgs', l: ['Verifier organisations', 'যাচাইকারী প্রতিষ্ঠান'], content: `${table({ id: 'lic-org', search: ['Organisation or trade licence no.', 'প্রতিষ্ঠান বা ট্রেড লাইসেন্স নম্বর'], cols: [{ l: ['Organisation', 'প্রতিষ্ঠান'] }, { l: ['Type', 'ধরন'] }, { l: ['Registered', 'নিবন্ধন'] }, { l: ['Verification access', 'যাচাই সুবিধা'] }], rows: orgs })}
      <p class="f-chart-meta">${demo()}</p>` },
    { id: 'rules', l: ['Rules and fees', 'নিয়ম ও ফি'], content: `${alert('warn', t('These rules are not yet confirmed.', 'এই নিয়মগুলো এখনও নিশ্চিত হয়নি।'), t('The Ministry will set them before Phase 2 development. The system will let authorised users configure them here.', '২য় পর্যায়ের উন্নয়নের আগে মন্ত্রণালয় এগুলো নির্ধারণ করবে। অনুমোদিত ব্যবহারকারী এখান থেকে সেগুলো কনফিগার করতে পারবেন।'))}
      <dl class="f-dl">${each(rules, (r) => `<div><dt>${tt(r)}</dt><dd>${tbd()}</dd></div>`)}</dl>` },
  ])}`;
  return page({ file: 'ministry-licenses', title: ['Licences (Phase 2)', 'লাইসেন্স (২য় পর্যায়)'], kind: 'ministry', active: 'ministry-licenses', crumbs: [['Ministry Portal', 'মন্ত্রণালয় পোর্টাল'], ['Licences (Phase 2)', 'লাইসেন্স (২য় পর্যায়)']], body });
}

// ================= PUBLIC: ORGANISATION REGISTRATION =================
function verifierRegister() {
  const trade = withErr(field({ l: ['Trade licence number', 'ট্রেড লাইসেন্স নম্বর'], name: 'trade', req: true, value: 'TRAD/DNCC/2021/018734', attrs: 'data-pattern="^(?!TRAD/DNCC/2019/004512$).{6,}$"', hint: ['Prototype: TRAD/DNCC/2019/004512 is already registered (duplicate check).', 'প্রোটোটাইপ: TRAD/DNCC/2019/004512 আগে থেকেই নিবন্ধিত (ডুপ্লিকেট যাচাই)।'] }),
    'Enter a valid trade licence number. This trade licence number may already be registered — sign in with the existing account or contact the help desk.', 'সঠিক ট্রেড লাইসেন্স নম্বর দিন। এই নম্বর আগে থেকেই নিবন্ধিত থাকতে পারে — বিদ্যমান অ্যাকাউন্ট ব্যবহার করুন বা হেল্প ডেস্কে যোগাযোগ করুন।');
  const body = `<div class="container f-sec f-narrow">
  ${crumb([[['Results / Verification', 'ফলাফল / যাচাই'], 'verify.html'], [['Organisation registration', 'প্রতিষ্ঠান নিবন্ধন']]])}
  <h1 class="h-h2">${t('Register your organisation for licence verification', 'লাইসেন্স যাচাইয়ের জন্য আপনার প্রতিষ্ঠান নিবন্ধন করুন')}</h1>
  <p class="muted">${t('Employers and other organisations register once. After paying for verification access, they can check a licence or certificate by its number.', 'নিয়োগকর্তা ও অন্যান্য প্রতিষ্ঠান একবার নিবন্ধন করে। যাচাই সুবিধার অর্থ পরিশোধের পর তারা নম্বর দিয়ে লাইসেন্স বা সনদ যাচাই করতে পারে।')}</p>
  ${when('org=registered', alert('info', t(`${ORG_NAME} is already registered.`, `${ORG_NAME} ইতিমধ্যে নিবন্ধিত।`), t('One account per trade licence. Use the existing verification workspace.', 'প্রতি ট্রেড লাইসেন্সে একটি অ্যাকাউন্ট। বিদ্যমান যাচাই ওয়ার্কস্পেস ব্যবহার করুন।'), a('verifier.html', t('Open verification workspace', 'যাচাই ওয়ার্কস্পেস খুলুন'), 'btn btn-primary btn-sm')))}
  <form class="h-card h-form" data-flow ${act({ set: 'org=registered', toast: ['Organisation registered. Account ORG-2026-0142 created; details sent by email.', 'প্রতিষ্ঠান নিবন্ধিত হয়েছে। অ্যাকাউন্ট ORG-2026-0142 তৈরি হয়েছে; বিস্তারিত ইমেইলে পাঠানো হয়েছে।'], go: 'verifier.html' })} novalidate>
    <div class="f-alert is-danger" data-form-error hidden role="alert">${icon('circle-alert', 'ico')}<div><b>${t('Some fields need attention.', 'কিছু ঘর সংশোধন প্রয়োজন।')}</b><p>${t('Correct the highlighted fields and submit again.', 'চিহ্নিত ঘরগুলো সংশোধন করে আবার জমা দিন।')}</p></div></div>
    <h2 class="h-h3">${t('Organisation', 'প্রতিষ্ঠান')}</h2><div class="f-grid2">
      ${field({ l: ['Organisation name', 'প্রতিষ্ঠানের নাম'], name: 'on', req: true, value: ORG_NAME })}
      ${field({ l: ['Organisation type', 'প্রতিষ্ঠানের ধরন'], name: 'ot', req: true, opts: [['emp', 'Employer (textile, garment or related industry)', 'নিয়োগকর্তা (টেক্সটাইল, পোশাক বা সংশ্লিষ্ট শিল্প)', true], ['rec', 'Recruitment agency', 'নিয়োগ সংস্থা'], ['edu', 'Educational institution', 'শিক্ষাপ্রতিষ্ঠান'], ['gov', 'Government or regulatory body', 'সরকারি বা নিয়ন্ত্রক সংস্থা'], ['oth', 'Other', 'অন্যান্য']] })}
      ${trade}
      ${field({ l: ['Trade licence copy (PDF, max 2 MB)', 'ট্রেড লাইসেন্সের কপি (পিডিএফ, সর্বোচ্চ ২ এমবি)'], name: 'tf', type: 'file', req: true, attrs: 'accept=".pdf" data-max-kb="2048"' })}
      ${field({ l: ['Office address', 'অফিসের ঠিকানা'], name: 'oa', rows: 2, req: true, value: 'Plot 22, BSCIC Industrial Area, Kalurghat, Chattogram' })}</div>
    <h2 class="h-h3 f-mt">${t('Contact person', 'যোগাযোগকারী ব্যক্তি')}</h2><div class="f-grid2">
      ${field({ l: ['Name', 'নাম'], name: 'cn', req: true, value: 'Nasrin Sultana' })}${field({ l: ['Designation', 'পদবি'], name: 'cd', req: true, value: 'Manager, Human Resources' })}
      ${field({ l: ['Mobile number', 'মোবাইল নম্বর'], name: 'cm', req: true, value: '01712000000', attrs: 'inputmode="tel" data-pattern="^01[3-9]\\d{8}$"', hint: ['11 digits, e.g. 01711000000', '১১ সংখ্যা, যেমন 01711000000'] })}
      ${field({ l: ['Official email', 'অফিসিয়াল ইমেইল'], name: 'ce', type: 'email', req: true, value: 'hr@rupsha-knitwear.example', attrs: 'data-pattern="^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"', hint: ['Account details and receipts are sent to this address.', 'অ্যাকাউন্টের তথ্য ও রসিদ এই ঠিকানায় পাঠানো হবে।'] })}
      ${field({ l: ['Create password (at least 8 characters)', 'পাসওয়ার্ড তৈরি করুন (কমপক্ষে ৮ অক্ষর)'], name: 'pw', type: 'password', req: true, value: 'demo-pass', attrs: 'data-pattern="^.{8,}$" autocomplete="new-password"' })}</div>
    <label class="fld f-check"><span><input type="checkbox" required> ${t('I confirm that this organisation will use verification results only to check a person’s licence or certificate, and that each search is recorded.', 'আমি নিশ্চিত করছি যে এই প্রতিষ্ঠান যাচাইয়ের ফলাফল শুধু কোনো ব্যক্তির লাইসেন্স বা সনদ যাচাইয়ে ব্যবহার করবে এবং প্রতিটি অনুসন্ধান রেকর্ড করা হবে।')}</span><span class="err" hidden>${t('Please accept the terms of use.', 'অনুগ্রহ করে ব্যবহারের শর্ত গ্রহণ করুন।')}</span></label>
    <p class="f-chart-meta">${t('Terms of use, data protection wording and approval of organisation accounts', 'ব্যবহারের শর্ত, তথ্য সুরক্ষার ভাষা ও প্রতিষ্ঠানের অ্যাকাউন্ট অনুমোদন')} — ${tbd()}</p>
    <div class="f-btnrow"><button type="submit" class="btn btn-teal">${t('Register organisation', 'প্রতিষ্ঠান নিবন্ধন করুন')}</button>${a('verifier.html', t('Already registered? Open workspace', 'আগে নিবন্ধিত? ওয়ার্কস্পেস খুলুন'), 'btn btn-ghost')}</div>
  </form>
</div>`;
  return page({ file: 'verifier-register', title: ['Organisation registration', 'প্রতিষ্ঠান নিবন্ধন'], body });
}

// ================= ORGANISATION: VERIFICATION WORKSPACE =================
function verifier() {
  const prog = (now) => `<ol class="f-prog">${each([['Organisation registered', 'প্রতিষ্ঠান নিবন্ধিত'], ['Pay for verification access', 'যাচাই সুবিধার অর্থ পরিশোধ'], ['Search by number', 'নম্বর দিয়ে অনুসন্ধান']], (l, i) => `<li class="${i < now ? 'done' : i === now ? 'now' : ''}">${tt(l)}</li>`)}</ol>`;
  const valid = (name, q, issued) => alert('ok', t('Valid licence', 'বৈধ লাইসেন্স'), `${name} · ${tt(q)} · ${t('Issued', 'ইস্যু')} ${d(issued)} · ${t('Valid until', 'মেয়াদ')}: ${t('TBD — Requires Client Confirmation', 'নির্ধারিত হবে — ক্লায়েন্টের নিশ্চিতকরণ প্রয়োজন')}`);
  const notFound = alert('warn', t('No record found', 'কোনো রেকর্ড পাওয়া যায়নি'), t('No licence or certificate matches this number. Check the number and try again.', 'এই নম্বরের সাথে কোনো লাইসেন্স বা সনদ মেলেনি। নম্বরটি যাচাই করে আবার চেষ্টা করুন।'));
  const map = JSON.stringify({ [LIC]: 'v418', 'TX-LIC-2026-000402': 'v402', 'TX-LIC-2024-000102': 'expired', 'TX-LIC-2023-000057': 'revoked', 'CERT-2025-00481': 'cert', 'CERT-2024-00113': 'certrev' });
  const body = `<div class="container f-sec">
  ${when('org=none', `${crumb([[['Results / Verification', 'ফলাফল / যাচাই'], 'verify.html'], [['Organisation verification', 'প্রতিষ্ঠানের যাচাই']]])}
    ${empty(t('Register your organisation to verify licences', 'লাইসেন্স যাচাই করতে আপনার প্রতিষ্ঠান নিবন্ধন করুন'), t('Licence and certificate checks are available to registered organisations after payment.', 'নিবন্ধিত প্রতিষ্ঠান অর্থ পরিশোধের পর লাইসেন্স ও সনদ যাচাই করতে পারে।'), a('verifier-register.html', t('Register organisation', 'প্রতিষ্ঠান নিবন্ধন'), 'btn btn-teal'), 'building-2')}
    <p class="f-note">${icon('info', 'ico ico-sm')}${t('Individuals can check a certificate issued by an institution on the', 'ব্যক্তি পর্যায়ে প্রতিষ্ঠানের ইস্যুকৃত সনদ যাচাই করা যায়')} <a class="link" href="verify.html">${t('Results / Verification page', 'ফলাফল / যাচাই পাতায়')}</a>.</p>`)}
  ${when('org=registered', `<div class="f-cand-head"><div><p class="h-eyebrow">${t('Organisation verification workspace', 'প্রতিষ্ঠানের যাচাই ওয়ার্কস্পেস')}</p><h1 class="h-h2">${ORG_NAME}</h1>
      <p class="muted">${t('Account', 'অ্যাকাউন্ট')} <b class="mono">ORG-2026-0142</b> · ${t('Signed in as Nasrin Sultana (Manager, Human Resources)', 'নাসরিন সুলতানা (ম্যানেজার, মানবসম্পদ) হিসেবে লগইন')}</p></div>
      <div class="f-btnrow">${a('license.html', t('About licences', 'লাইসেন্স সম্পর্কে'), 'btn btn-outline btn-sm', 'badge-check')}${a('index.html', t('Sign out', 'লগআউট'), 'btn btn-ghost btn-sm', 'log-out')}</div></div>
    ${when('orgpaid=no|pending|failed', prog(1))}${when('orgpaid=yes', prog(2))}
    <div class="f-cand-grid">
    ${card(t('Verification access', 'যাচাই সুবিধা'), `
      <dl class="f-dl"><div><dt>${t('Pricing model (per check or subscription)', 'মূল্য-কাঠামো (প্রতি যাচাই বা সাবস্ক্রিপশন)')}</dt><dd>${tbd()}</dd></div><div><dt>${t('Amount', 'পরিমাণ')}</dt><dd>${tbd()}</dd></div>
        <div><dt>${t('Status', 'অবস্থা')}</dt><dd>${when('orgpaid=no', st('unpaid'), 'span')}${when('orgpaid=pending', st('pending'), 'span')}${when('orgpaid=failed', st('failed'), 'span')}${when('orgpaid=yes', st('paid'), 'span')}</dd></div></dl>
      ${when('orgpaid=failed', alert('danger', t('Payment failed', 'পরিশোধ ব্যর্থ'), t('The payment gateway declined the transaction (reference PG-90217). No money was deducted. Try again or use another method.', 'পেমেন্ট গেটওয়ে লেনদেনটি প্রত্যাখ্যান করেছে (রেফারেন্স PG-90217)। কোনো টাকা কাটা হয়নি। আবার চেষ্টা করুন বা অন্য পদ্ধতি ব্যবহার করুন।')))}
      ${when('orgpaid=pending', alert('warn', t('Payment is being confirmed', 'পরিশোধ নিশ্চিত করা হচ্ছে'), t('The gateway has not confirmed the payment yet. Searches unlock as soon as it is confirmed. Do not pay twice.', 'গেটওয়ে এখনও পরিশোধ নিশ্চিত করেনি। নিশ্চিত হলেই অনুসন্ধান চালু হবে। দুবার পরিশোধ করবেন না।')))}
      ${when('orgpaid=yes', `${alert('ok', t('Verification access is active.', 'যাচাই সুবিধা সক্রিয়।'), t('Receipt RCPT-LV-2026-00318 sent to hr@rupsha-knitwear.example.', 'রসিদ RCPT-LV-2026-00318 hr@rupsha-knitwear.example-এ পাঠানো হয়েছে।'))}${btn(t('Download receipt', 'রসিদ ডাউনলোড'), dl(), 'btn-outline btn-sm', 'download')}`)}
      ${when('orgpaid=no|pending|failed', `<fieldset class="f-paymethods"><legend>${t('Payment method', 'পরিশোধ পদ্ধতি')}</legend>${each([['bKash', 'বিকাশ'], ['Nagad', 'নগদ'], ['Rocket', 'রকেট'], ['Bank card', 'ব্যাংক কার্ড']], (m, i) => `<label><input type="radio" name="pm" ${i ? '' : 'checked'}><span>${t(m[0], m[1])}</span></label>`)}</fieldset>
      <p class="f-chart-meta">${t('Payment gateway and invoicing', 'পেমেন্ট গেটওয়ে ও ইনভয়েস')} — ${tbd()}</p>
      <div class="f-proto-ctl"><span>${t('Prototype: simulate the gateway response', 'প্রোটোটাইপ: গেটওয়ের সাড়া অনুকরণ')}</span>
        <button type="button" class="btn btn-teal" ${act({ set: 'orgpaid=yes', toast: ['Payment received. Receipt RCPT-LV-2026-00318.', 'পরিশোধ গৃহীত হয়েছে। রসিদ RCPT-LV-2026-00318।'] })}>${t('Pay — success', 'পরিশোধ — সফল')}</button>
        <button type="button" class="btn btn-outline" ${act({ set: 'orgpaid=pending' })}>${t('Simulate pending confirmation', 'অপেক্ষমাণ নিশ্চিতকরণ অনুকরণ')}</button>
        <button type="button" class="btn btn-outline" ${act({ set: 'orgpaid=failed' })}>${t('Simulate failed payment', 'ব্যর্থ পরিশোধ অনুকরণ')}</button></div>`)}`)}
    <section class="h-card" id="lv-box"><header class="h-card-head"><h2>${t('Verify a licence or certificate', 'লাইসেন্স বা সনদ যাচাই')}</h2>${when('orgpaid=no|pending|failed', `${icon('lock', 'ico ico-sm')}${t('Locked until payment', 'পরিশোধ না হওয়া পর্যন্ত বন্ধ')}`, 'span', 'f-note')}</header>
      <form class="h-form" data-lookup="lv-box" data-lookup-require="orgpaid=yes" data-lookup-map='${map}' ${act({ set: 'orgchk=1' })} novalidate>
        ${field({ l: ['Licence or certificate number', 'লাইসেন্স বা সনদ নম্বর'], name: 'q', req: true, value: LIC, hint: [`Try ${LIC} (issued in Flow J), TX-LIC-2024-000102 (expired), TX-LIC-2023-000057 (revoked), CERT-2025-00481 (certificate) or any other number.`, `${LIC} (ফ্লো জে-তে ইস্যুকৃত), TX-LIC-2024-000102 (মেয়াদোত্তীর্ণ), TX-LIC-2023-000057 (বাতিল), CERT-2025-00481 (সনদ) বা অন্য যেকোনো নম্বর দিয়ে দেখুন।`] })}
        <button type="submit" class="btn btn-primary">${icon('shield-check', 'ico ico-sm')}${t('Verify', 'যাচাই করুন')}</button></form>
      <div data-lookup-res="locked" hidden>${alert('warn', t('Payment required before verification', 'যাচাইয়ের আগে অর্থ পরিশোধ প্রয়োজন'), t('Complete the verification payment first. Searches are not available until the payment is confirmed.', 'আগে যাচাইয়ের অর্থ পরিশোধ সম্পন্ন করুন। পরিশোধ নিশ্চিত না হওয়া পর্যন্ত অনুসন্ধান করা যাবে না।'))}</div>
      <div data-lookup-res="v418" hidden>${when('lic=issued', valid('Sabbir Hossain', LICENSE_APPS[0].q, '15 Oct 2026'))}${when('lic=none|submitted|returned|rejected', `${notFound}<p class="f-note">${icon('route', 'ico ico-sm')}${t('Prototype: this number becomes valid after the Head Office issues it in Flow J.', 'প্রোটোটাইপ: প্রধান কার্যালয় ফ্লো জে-তে ইস্যু করার পর এই নম্বর বৈধ হবে।')} <a class="link" href="ministry-licenses.html">${t('Head Office review', 'প্রধান কার্যালয়ের যাচাই')}</a></p>`)}</div>
      <div data-lookup-res="v402" hidden>${valid('Kazi Anwar Hossain', LICENSE_APPS[2].q, '06 Oct 2026')}</div>
      <div data-lookup-res="expired" hidden>${alert('warn', t('Licence expired', 'লাইসেন্সের মেয়াদ শেষ'), t('TX-LIC-2024-000102 · Md. Rashedul Karim · expired on 30 Jun 2026. The holder must renew before practising under this licence. Renewal rules — TBD.', 'TX-LIC-2024-000102 · মোঃ রাশেদুল করিম · মেয়াদ শেষ ৩০ জুন ২০২৬। এই লাইসেন্সে কাজ করার আগে ধারককে নবায়ন করতে হবে। নবায়নের নিয়ম — নির্ধারিত হবে।'))}</div>
      <div data-lookup-res="revoked" hidden>${alert('danger', t('Licence revoked', 'লাইসেন্স বাতিল'), t('TX-LIC-2023-000057 was revoked by the Head Office on 12 Feb 2025. It is not valid.', 'TX-LIC-2023-000057 প্রধান কার্যালয় ১২ ফেব্রুয়ারি ২০২৫ তারিখে বাতিল করেছে। এটি বৈধ নয়।'))}</div>
      <div data-lookup-res="cert" hidden>${alert('ok', t('Valid certificate', 'বৈধ সনদ'), t('Rafiul Alam · Diploma in Textile Engineering · Karnaphuli Textile Institute · Issued 12 Mar 2026', 'রাফিউল আলম · ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং · কর্ণফুলী টেক্সটাইল ইনস্টিটিউট · ইস্যু ১২ মার্চ ২০২৬'))}</div>
      <div data-lookup-res="certrev" hidden>${alert('danger', t('Certificate revoked', 'সনদ বাতিল'), t('This certificate was revoked on 03 Feb 2025 and replaced by a duplicate certificate. Contact the issuing institution.', 'এই সনদ ০৩ ফেব্রুয়ারি ২০২৫ তারিখে বাতিল হয়ে অনুলিপি দ্বারা প্রতিস্থাপিত হয়েছে। ইস্যুকারী প্রতিষ্ঠানে যোগাযোগ করুন।'))}</div>
      <div data-lookup-res="none" hidden>${notFound}</div></section>
    </div>
    ${card(t('Usage history', 'ব্যবহারের ইতিহাস'), `${when('orgpaid=no|pending|failed', empty(t('No payments or checks yet', 'এখনও কোনো পরিশোধ বা যাচাই নেই'), t('Payments and each search made by your organisation are listed here with date, time and user.', 'আপনার প্রতিষ্ঠানের পরিশোধ ও প্রতিটি অনুসন্ধান তারিখ, সময় ও ব্যবহারকারীসহ এখানে দেখা যাবে।'), '', 'history'))}
      ${when('orgpaid=yes', table({ id: 'lv-hist', compact: true, cols: [{ l: ['Date and time', 'তারিখ ও সময়'] }, { l: ['Activity', 'কার্যক্রম'] }, { l: ['Reference', 'রেফারেন্স'] }, { l: ['User', 'ব্যবহারকারী'] }, { l: ['Status', 'অবস্থা'] }], rows: [
        { attrs: 'data-when="orgchk=1"', cells: [`${d('15 Oct 2026')}, ${n('11:42')}`, t('Licence / certificate search', 'লাইসেন্স / সনদ অনুসন্ধান'), t('Result shown above', 'ফলাফল উপরে দেখানো হয়েছে'), 'Nasrin Sultana', st('recorded')] },
        { cells: [`${d('15 Oct 2026')}, ${n('11:30')}`, t('Verification access payment', 'যাচাই সুবিধার পরিশোধ'), mono('RCPT-LV-2026-00318'), 'Nasrin Sultana', st('paid')] }] }))}`)}`)}
</div>`;
  return page({ file: 'verifier', title: ['Organisation verification', 'প্রতিষ্ঠানের যাচাই'], body });
}

export default {
  license, 'license-apply': licenseApply, 'license-track': licenseTrack, 'ministry-licenses': ministryLicenses, 'verifier-register': verifierRegister, verifier,
};
