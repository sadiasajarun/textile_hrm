// Sign-in pages, portal sign-ins, access states and the prototype review index.
import { t, tt, n, d, ta, icon, each, esc, page, photo, logo, alert, field, a, act, PORTALS, ORG } from '../core.mjs';

const loginErr = () => `<div class="f-alert is-danger" data-login-error hidden role="alert">${icon('circle-alert', 'ico')}<div><b>${t('The ID or password is incorrect.', 'আইডি বা পাসওয়ার্ড সঠিক নয়।')}</b><p>${t('Check and try again. After 5 failed attempts the account is locked for 30 minutes.', 'যাচাই করে আবার চেষ্টা করুন। ৫ বার ব্যর্থ হলে অ্যাকাউন্ট ৩০ মিনিটের জন্য বন্ধ থাকবে।')}</p></div></div>`;
const demoHint = () => `<p class="proto-note">${t('Prototype: details are filled in. Password "demo-pass" signs in; any other password shows the error state.', 'প্রোটোটাইপ: তথ্য পূরণ করা আছে। পাসওয়ার্ড "demo-pass" দিলে লগইন হবে; অন্য পাসওয়ার্ডে ত্রুটি দেখাবে।')}</p>`;

// ---------- Student login (public) ----------
function studentLogin() {
  const body = `<div class="container f-sec f-login-wrap">
  <section class="h-card f-login-card" aria-labelledby="sl-t">
    <p class="h-eyebrow">${t('Public website', 'পাবলিক ওয়েবসাইট')}</p>
    <h1 id="sl-t" class="h-h2">${t('Student Login', 'শিক্ষার্থী লগইন')}</h1>
    <p class="muted">${t('For enrolled students and alumni of government textile institutions.', 'সরকারি টেক্সটাইল প্রতিষ্ঠানের অধ্যয়নরত শিক্ষার্থী ও প্রাক্তন শিক্ষার্থীদের জন্য।')}</p>
    <form class="h-form" data-flow data-login data-after-go="student.html" novalidate>
      ${loginErr()}
      ${field({ l: ['Student ID', 'শিক্ষার্থী আইডি'], name: 'u', req: true, value: 'KTI-2024-2401', attrs: 'autocomplete="username"', hint: ['As printed on your ID card, e.g. KTI-2024-2401', 'আইডি কার্ডে মুদ্রিত, যেমন KTI-2024-2401'] })}
      ${field({ l: ['Password', 'পাসওয়ার্ড'], name: 'p', type: 'password', req: true, value: 'demo-pass', attrs: 'autocomplete="current-password"' })}
      <div class="h-form-row"><label class="h-check"><input type="checkbox">${t('Keep me signed in on this device', 'এই ডিভাইসে লগইন থাকুক')}</label><button type="button" class="link" ${act({ set: '_=1', toast: ['A reset link is sent to your registered mobile in production.', 'প্রোডাকশনে নিবন্ধিত মোবাইলে রিসেট লিংক পাঠানো হবে।'] })}>${t('Forgot password?', 'পাসওয়ার্ড ভুলে গেছেন?')}</button></div>
      <button type="submit" class="btn btn-teal btn-lg">${icon('log-in', 'ico ico-sm')}${t('Sign in', 'লগইন')}</button>
    </form>
    ${demoHint()}
    <p class="f-note">${icon('graduation-cap', 'ico ico-sm')}${t('Alumni sign in with the same student ID and see the alumni menu only.', 'প্রাক্তন শিক্ষার্থীরা একই শিক্ষার্থী আইডি দিয়ে লগইন করে শুধু প্রাক্তন শিক্ষার্থী মেনু দেখেন।')} <a class="link" href="alumni.html">${t('Demo: sign in as alumnus', 'ডেমো: প্রাক্তন শিক্ষার্থী হিসেবে লগইন')}</a></p>
  </section>
  <aside class="f-login-side">
    <section class="h-aside-card">${icon('clipboard-list', 'ico ico-lg')}<h2 class="h-h4">${t('Applying for admission?', 'ভর্তির আবেদন করছেন?')}</h2><p>${t('Candidates sign in from the Admissions page with their application ID.', 'প্রার্থীরা আবেদন আইডি দিয়ে ভর্তি পাতা থেকে লগইন করেন।')}</p>${a('candidate-login.html', t('Candidate login', 'প্রার্থী লগইন'), 'btn btn-outline btn-sm')}</section>
    <section class="h-aside-card">${icon('building-2', 'ico ico-lg')}<h2 class="h-h4">${t('Teacher or official?', 'শিক্ষক বা কর্মকর্তা?')}</h2><p>${t('Teachers sign in through the Institution Portal. Officials use their government portal.', 'শিক্ষকরা প্রতিষ্ঠান পোর্টাল থেকে লগইন করেন। কর্মকর্তারা সরকারি পোর্টাল ব্যবহার করেন।')}</p>${a('portals.html', t('Government Portals', 'সরকারি পোর্টাল'), 'btn btn-outline btn-sm')}</section>
    <section class="h-aside-card">${icon('headset', 'ico ico-lg')}<h2 class="h-h4">${t('Help desk', 'হেল্প ডেস্ক')}</h2><p>${n(ORG.helpline)} · ${ORG.email}</p></section>
  </aside>
</div>`;
  return page({ file: 'student-login', title: ['Student Login', 'শিক্ষার্থী লগইন'], body });
}

// ---------- Portal sign-ins (separate addresses) ----------
function portalLogin(p) {
  const accounts = {
    ministry: [[['Ministry Super Admin — Farhana Ahmed', 'মন্ত্রণালয় সুপার অ্যাডমিন — ফারহানা আহমেদ'], 'ministry.html']],
    division: [[['Division Admin, Chattogram — Sharmin Akter', 'বিভাগীয় অ্যাডমিন, চট্টগ্রাম — শারমিন আক্তার'], 'division.html']],
    district: [[['District Admin, Chattogram — Mahmudul Hasan', 'জেলা অ্যাডমিন, চট্টগ্রাম — মাহমুদুল হাসান'], 'district.html']],
    institution: [[['Principal — Md. Saiful Islam', 'অধ্যক্ষ — মোঃ সাইফুল ইসলাম'], 'principal.html'], [['Teacher — Arif Hossain', 'শিক্ষক — আরিফ হোসেন'], 'teacher.html'], [['Librarian — Rokeya Sultana', 'লাইব্রেরিয়ান — রোকেয়া সুলতানা'], 'inst-library.html']],
  }[p.k];
  const body = `<div class="h-signin f-portal-login">
  <section class="h-login-art">${photo(p.k === 'institution' ? 'campus-gtec-residential.jpg' : 'campus-gtec-academic.jpg', ['Gopalganj Textile Engineering College', 'গোপালগঞ্জ টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], 'h-login-img', 'loading="eager"')}
    <div class="h-login-art-in"><a class="h-brand h-brand-inv" href="index.html">${logo()}<span><small>${tt(ORG.ministry)}</small><b>${tt(ORG.product)}</b></span></a>
    <blockquote class="h-display h-display-sm">${tt(p.l)}</blockquote><p>${tt(p.who)}</p></div></section>
  <section class="h-login-panel">
    <div class="f-urlbar">${icon('lock', 'ico ico-sm')}<span>https://</span><b>${p.dom}</b><em>${t('Proposed secure address — prototype only', 'প্রস্তাবিত নিরাপদ ঠিকানা — শুধু প্রোটোটাইপ')}</em></div>
    <div class="h-login-top"><a class="h-back" href="portals.html">${icon('arrow-left', 'ico ico-sm')}${t('Government Portals', 'সরকারি পোর্টাল')}</a><span class="lang h-lang-dark" role="group" aria-label="Language / ভাষা"><button type="button" data-set-lang="bn" lang="bn">বাংলা</button><button type="button" data-set-lang="en" lang="en">English</button></span></div>
    <div class="h-login-box">
      <h1 class="h-h2">${t('Sign in', 'লগইন')}</h1><p class="muted">${t('Authorised users only. Accounts are issued by the', 'শুধু অনুমোদিত ব্যবহারকারী। অ্যাকাউন্ট ইস্যু করে')} ${p.k === 'institution' ? t('Principal / Institution Admin.', 'অধ্যক্ষ / প্রতিষ্ঠান অ্যাডমিন।') : t('Ministry system administrator.', 'মন্ত্রণালয়ের সিস্টেম অ্যাডমিনিস্ট্রেটর।')}</p>
      <form class="h-form" data-flow data-login data-after-go="${accounts[0][1]}" id="pl-form" novalidate>${loginErr()}
        ${field({ l: ['Official ID or email', 'অফিসিয়াল আইডি বা ইমেইল'], name: 'u', req: true, value: p.k === 'institution' ? 'principal@kti.edu.bd' : `admin@${p.k}.dot.gov.bd`, attrs: 'autocomplete="username"' })}
        ${field({ l: ['Password', 'পাসওয়ার্ড'], name: 'p', type: 'password', req: true, value: 'demo-pass', attrs: 'autocomplete="current-password"' })}
        <p class="f-note">${icon('shield-check', 'ico ico-sm')}${t('A one-time code is sent to the registered mobile after the password (two-step verification).', 'পাসওয়ার্ডের পর নিবন্ধিত মোবাইলে একটি ওটিপি পাঠানো হয় (দুই ধাপের যাচাই)।')}</p>
        <button type="submit" class="btn btn-primary btn-lg">${t('Sign in', 'লগইন')}</button></form>
      ${demoHint()}
      <section class="f-demo-acc"><h2>${t('Prototype: demo accounts', 'প্রোটোটাইপ: ডেমো অ্যাকাউন্ট')}</h2>
        <p>${p.k === 'institution' ? t('The Institution Portal opens the workspace that matches the account’s role.', 'প্রতিষ্ঠান পোর্টাল অ্যাকাউন্টের ভূমিকা অনুযায়ী ওয়ার্কস্পেস খোলে।') : t('Signs in with the scope assigned to the account.', 'অ্যাকাউন্টে নির্ধারিত পরিধি নিয়ে লগইন হয়।')}</p>
        <ul>${each(accounts, ([l, h]) => `<li><a href="${h}">${icon('user', 'ico ico-sm')}${tt(l)}${icon('arrow-right', 'ico ico-sm')}</a></li>`)}
        <li><a href="access-denied.html?reason=noassign">${icon('user-x', 'ico ico-sm')}${t('Account with no assignment (edge case)', 'নির্ধারণবিহীন অ্যাকাউন্ট (ব্যতিক্রম)')}${icon('arrow-right', 'ico ico-sm')}</a></li></ul></section>
    </div>
  </section>
</div>`;
  return page({ file: `portal-${p.k}`, title: [`${p.l[0]} sign-in`, `${p.l[1]} লগইন`], kind: 'bare', body });
}

function accessDenied() {
  const reasons = [
    ['permission', 'ban', ['You do not have permission to view this page', 'এই পাতা দেখার অনুমতি আপনার নেই'], ['Your role (District Admin, Chattogram District) cannot open records of other districts. Request access from your Division Administrator if needed.', 'আপনার ভূমিকা (জেলা অ্যাডমিন, চট্টগ্রাম জেলা) অন্য জেলার রেকর্ড খুলতে পারে না। প্রয়োজনে বিভাগীয় প্রশাসকের কাছে অনুমতি চান।']],
    ['noassign', 'user-x', ['Your account has no assigned institution or office', 'আপনার অ্যাকাউন্টে কোনো প্রতিষ্ঠান বা দপ্তর নির্ধারিত নেই'], ['The account tanzila.rahman@dot.gov.bd is active but has no role or scope. The Ministry system administrator must assign one before you can continue.', 'tanzila.rahman@dot.gov.bd অ্যাকাউন্টটি সক্রিয়, কিন্তু কোনো ভূমিকা বা পরিধি নেই। এগোনোর আগে মন্ত্রণালয়ের সিস্টেম অ্যাডমিনিস্ট্রেটরকে তা নির্ধারণ করতে হবে।']],
    ['session', 'timer-off', ['Your session has expired', 'আপনার সেশনের মেয়াদ শেষ'], ['For security, you were signed out after 30 minutes of inactivity. Unsaved changes in open forms were kept as drafts.', 'নিরাপত্তার জন্য ৩০ মিনিট নিষ্ক্রিয় থাকায় আপনাকে লগআউট করা হয়েছে। খোলা ফরমের অসংরক্ষিত পরিবর্তন খসড়া হিসেবে রাখা হয়েছে।']],
    ['locked', 'lock', ['Account temporarily locked', 'অ্যাকাউন্ট সাময়িকভাবে বন্ধ'], ['Five incorrect password attempts. Try again after 30 minutes or reset your password.', 'পাঁচবার ভুল পাসওয়ার্ড। ৩০ মিনিট পর চেষ্টা করুন বা পাসওয়ার্ড রিসেট করুন।']],
  ];
  const body = `<div class="f-denied">${logo()}
  ${each(reasons, ([k, ic, h, p]) => `<section data-reason="${k}" class="h-card f-denied-card" hidden>${icon(ic, 'ico ico-xl')}<h1 class="h-h2">${tt(h)}</h1><p>${tt(p)}</p>
    <div class="f-btnrow">${a('portals.html', t('Back to Government Portals', 'সরকারি পোর্টালে ফিরুন'), 'btn btn-primary')}${a('help.html#contact', t('Contact help desk', 'হেল্প ডেস্কে যোগাযোগ'), 'btn btn-outline')}</div></section>`)}
  <p class="proto-note">${t('Prototype: other states of this page —', 'প্রোটোটাইপ: এই পাতার অন্যান্য অবস্থা —')} ${each(reasons, ([k]) => `<a class="link" href="access-denied.html?reason=${k}">${k}</a> `)}</p></div>`;
  return page({ file: 'access-denied', title: ['Access not available', 'প্রবেশাধিকার নেই'], kind: 'bare', body });
}

// ---------- Prototype review index ----------
function index() {
  const groups = [
    [['Public website', 'পাবলিক ওয়েবসাইট'], [['index', ['Home', 'হোম']], ['about', ['About Us', 'আমাদের সম্পর্কে']], ['officials', ['Responsible officials', 'দায়িত্বপ্রাপ্ত কর্মকর্তা']], ['academic', ['Academic', 'একাডেমিক']], ['institutions', ['Institution directory', 'প্রতিষ্ঠান ডিরেক্টরি']], ['institution-profile', ['Institution profile', 'প্রতিষ্ঠান প্রোফাইল']], ['notices', ['Notices', 'নোটিশ']], ['notice-detail', ['Notice detail', 'নোটিশ বিস্তারিত']], ['public-dashboard', ['Public dashboard', 'পাবলিক ড্যাশবোর্ড']], ['gallery', ['Photo gallery', 'ফটো গ্যালারি']], ['help', ['Help desk', 'হেল্প ডেস্ক']], ['verify', ['Results / Verification', 'ফলাফল / যাচাই']]]],
    [['Admissions / Candidate', 'ভর্তি / প্রার্থী'], [['admissions', ['Admissions', 'ভর্তি']], ['apply', ['Apply online', 'অনলাইনে আবেদন']], ['candidate-login', ['Candidate login', 'প্রার্থী লগইন']], ['candidate', ['Candidate workspace', 'প্রার্থী ওয়ার্কস্পেস']], ['admission-result', ['Admission result', 'ভর্তির ফলাফল']]]],
    [['Student Login & Government Portals', 'শিক্ষার্থী লগইন ও সরকারি পোর্টাল'], [['student-login', ['Student Login', 'শিক্ষার্থী লগইন']], ['portals', ['Government Portals', 'সরকারি পোর্টাল']], ['portal-ministry', ['Ministry Portal sign-in', 'মন্ত্রণালয় পোর্টাল লগইন']], ['portal-division', ['Division Portal sign-in', 'বিভাগীয় পোর্টাল লগইন']], ['portal-district', ['District Portal sign-in', 'জেলা পোর্টাল লগইন']], ['portal-institution', ['Institution Portal sign-in', 'প্রতিষ্ঠান পোর্টাল লগইন']], ['access-denied', ['Access states', 'প্রবেশাধিকারের অবস্থা']]]],
    [['Ministry', 'মন্ত্রণালয়'], [['ministry', ['Dashboard', 'ড্যাশবোর্ড']], ['ministry-institutions', ['Institutions & categories', 'প্রতিষ্ঠান ও ধরন']], ['ministry-admissions', ['Admission setup & oversight', 'ভর্তি সেটআপ ও তদারকি']], ['ministry-attendance', ['Live attendance', 'লাইভ হাজিরা']], ['ministry-budget', ['Budget', 'বাজেট']], ['ministry-assets', ['Assets', 'সম্পদ']], ['ministry-approvals', ['Approvals', 'অনুমোদন']], ['ministry-reports', ['Reports', 'প্রতিবেদন']], ['ministry-users', ['Users & roles', 'ব্যবহারকারী ও ভূমিকা']], ['ministry-integrations', ['Integrations (MY GOV)', 'ইন্টিগ্রেশন (মাইগভ)']]]],
    [['Division & District', 'বিভাগ ও জেলা'], [['division', ['Division dashboard', 'বিভাগ ড্যাশবোর্ড']], ['district', ['District dashboard', 'জেলা ড্যাশবোর্ড']]]],
    [['Institution (Principal)', 'প্রতিষ্ঠান (অধ্যক্ষ)'], [['principal', ['Dashboard', 'ড্যাশবোর্ড']], ['inst-students', ['Students', 'শিক্ষার্থী']], ['inst-teachers', ['Teachers', 'শিক্ষক']], ['inst-classes', ['Classes', 'ক্লাস']], ['inst-attendance', ['Attendance', 'হাজিরা']], ['inst-results', ['Results', 'ফলাফল']], ['inst-requests', ['Student requests', 'শিক্ষার্থী আবেদন']], ['inst-leave', ['Leave', 'ছুটি']], ['inst-certificates', ['Certificates & alumni', 'সনদ ও প্রাক্তন শিক্ষার্থী']], ['inst-finance', ['Finance', 'অর্থ']], ['inst-assets', ['Assets', 'সম্পদ']], ['inst-procurement', ['Procurement', 'ক্রয়']], ['inst-library', ['Library', 'লাইব্রেরি']], ['inst-access', ['Menu access', 'মেনু অ্যাক্সেস']]]],
    [['Teacher', 'শিক্ষক'], [['teacher', ['Dashboard', 'ড্যাশবোর্ড']], ['teacher-classes', ['Classes & materials', 'ক্লাস ও উপকরণ']], ['teacher-attendance', ['Take attendance', 'হাজিরা নিন']], ['teacher-results', ['Result entry', 'ফলাফল এন্ট্রি']], ['teacher-leave', ['Leave', 'ছুটি']]]],
    [['Student & Alumni', 'শিক্ষার্থী ও প্রাক্তন শিক্ষার্থী'], [['student', ['Student dashboard', 'শিক্ষার্থী ড্যাশবোর্ড']], ['student-academics', ['Academics', 'একাডেমিক']], ['student-results', ['Results & attendance', 'ফলাফল ও উপস্থিতি']], ['student-services', ['Online services', 'অনলাইন সেবা']], ['student-request', ['Request tracking', 'আবেদন ট্র্যাকিং']], ['student-payment', ['Payments & ledger', 'পরিশোধ ও লেজার']], ['student-certificate', ['Certificate (graduate)', 'সনদ (উত্তীর্ণ)']], ['student-profile', ['Profile', 'প্রোফাইল']], ['alumni', ['Alumni', 'প্রাক্তন শিক্ষার্থী']]]],
    [['Phase 2 — Professional licence', '২য় পর্যায় — পেশাগত লাইসেন্স'], [['license', ['Licence overview', 'লাইসেন্স পরিচিতি']], ['license-apply', ['Licence application', 'লাইসেন্সের আবেদন']], ['license-track', ['Track application', 'আবেদন ট্র্যাক']], ['ministry-licenses', ['Ministry review & issue', 'মন্ত্রণালয়ের পর্যালোচনা ও ইস্যু']], ['verifier-register', ['Organisation registration', 'প্রতিষ্ঠানের নিবন্ধন']], ['verifier', ['Third-party verification', 'তৃতীয় পক্ষের যাচাই']]]],
  ];
  const flows = [
    ['A', ['Candidate → Student', 'প্রার্থী → শিক্ষার্থী'], [['admissions', 'Admissions'], ['apply', 'Apply'], ['candidate', 'Pay fee → result → final admission'], ['student.html?new=1', 'Student ID & dashboard']]],
    ['B', ['Attendance → aggregate views', 'হাজিরা → সমষ্টিগত দৃশ্য'], [['teacher-attendance', 'Teacher submits'], ['inst-attendance', 'Institution'], ['district', 'District'], ['division', 'Division'], ['ministry-attendance', 'Ministry']]],
    ['C', ['Result entry → publish → student', 'ফলাফল এন্ট্রি → প্রকাশ → শিক্ষার্থী'], [['teacher-results', 'Teacher enters'], ['inst-results', 'Principal validates & publishes'], ['student-results', 'Student sees result']]],
    ['D', ['Service request lifecycle', 'সেবা আবেদনের ধাপ'], [['student-services', 'Student submits'], ['inst-requests', 'Principal returns'], ['student-request', 'Student corrects'], ['inst-requests', 'Approve → complete']]],
    ['E', ['Budget → expenses → utilisation', 'বাজেট → ব্যয় → ব্যবহার'], [['ministry-budget', 'Ministry allocates'], ['inst-finance', 'Institution records expense'], ['ministry-budget#utilisation', 'Utilisation report']]],
    ['F', ['Asset lifecycle', 'সম্পদের ধাপ'], [['ministry-assets', 'Ministry allocates'], ['inst-assets', 'Assign → transfer/return → damaged/lost → history']]],
    ['G', ['Procurement → gate pass', 'ক্রয় → গেট পাস'], [['inst-procurement', 'Request'], ['ministry-approvals', 'Approve'], ['inst-procurement', 'PO → LC → receive → gate pass']]],
    ['H', ['Teacher leave', 'শিক্ষকের ছুটি'], [['teacher-leave', 'Apply'], ['inst-leave', 'Principal approves'], ['teacher-leave', 'Balance updated']]],
    ['I', ['Certificate → alumni', 'সনদ → প্রাক্তন শিক্ষার্থী'], [['student-certificate', 'Graduate applies'], ['inst-certificates', 'Issue & mark alumni'], ['alumni', 'Alumni portal']]],
    ['J', ['Professional licence → verification', 'পেশাগত লাইসেন্স → যাচাই'], [['license-apply', 'Apply'], ['ministry-licenses', 'Review & issue'], ['verifier-register', 'Organisation registers'], ['verifier', 'Pay & verify']]],
  ];
  const href = (h) => (h.includes('.html') ? h : h.includes('#') ? `${h.split('#')[0]}.html#${h.split('#')[1]}` : `${h}.html`);
  const body = `<div class="f-index">
  <header class="f-index-head"><div class="container">${logo()}<div><p class="h-eyebrow h-eyebrow-inv">${t('Prototype review index — not part of the public website', 'প্রোটোটাইপ পর্যালোচনা সূচি — পাবলিক ওয়েবসাইটের অংশ নয়')}</p>
    <h1 class="h-display h-display-sm">${tt(ORG.product)}</h1><p>${t('Final end-to-end prototype · Variation H · Phase 1 and Phase 2 · English / বাংলা', 'চূড়ান্ত এন্ড-টু-এন্ড প্রোটোটাইপ · ভ্যারিয়েশন H · ১ম ও ২য় পর্যায় · English / বাংলা')}</p>
    <div class="f-btnrow">${a('index.html', t('Open public website', 'পাবলিক ওয়েবসাইট খুলুন'), 'btn btn-white btn-lg', 'globe')}${a('portals.html', t('Government Portals', 'সরকারি পোর্টাল'), 'btn btn-onimg btn-lg', 'landmark')}<button type="button" class="btn btn-onimg btn-lg" data-reset-state>${icon('rotate-ccw', 'ico ico-sm')}${t('Reset demo data', 'ডেমো তথ্য রিসেট')}</button>
    <span class="lang f-lang" role="group" aria-label="Language / ভাষা"><button type="button" data-set-lang="bn" lang="bn">বাংলা</button><button type="button" data-set-lang="en" lang="en">English</button></span></div></div></div></header>
  <div class="container f-sec">
    <h2 class="h-h3">${t('End-to-end flows (A–J)', 'এন্ড-টু-এন্ড ফ্লো (A–J)')}</h2>
    <p class="muted">${t('Each flow keeps its progress across pages. Use “Reset demo data” to start again.', 'প্রতিটি ফ্লো পাতা জুড়ে অগ্রগতি সংরক্ষণ করে। নতুন করে শুরু করতে “ডেমো তথ্য রিসেট” ব্যবহার করুন।')}</p>
    <ol class="f-flows">${each(flows, ([k, l, steps]) => `<li><span class="f-flow-k">${k}</span><div><b>${tt(l)}</b><p>${steps.map(([h, s], i) => `<a href="${href(h)}">${i + 1}. ${esc(s)}</a>`).join(' → ')}</p></div></li>`)}</ol>
    <h2 class="h-h3 f-mt">${t('All screens', 'সকল স্ক্রিন')}</h2>
    <div class="f-index-grid">${each(groups, ([g, items]) => `<section class="h-card"><h3>${tt(g)}</h3><ul>${each(items, ([f, l]) => `<li><a href="${f}.html">${tt(l)}<code>${f}.html</code></a></li>`)}</ul></section>`)}</div>
    <h2 class="h-h3 f-mt">${t('Documentation', 'ডকুমেন্টেশন')}</h2>
    <p class="muted">FINAL_SCOPE_COVERAGE.md · FINAL_ROUTE_MAP.md · FINAL_WORKFLOW_MAP.md · FINAL_EDGE_CASE_MATRIX.md · FINAL_DESIGN_SYSTEM.md · FINAL_QA_REPORT.md · assets/images/IMAGE_SOURCES.md · assets/data/OFFICIALS_SOURCES.md (${t('in', 'ফোল্ডার')} .claude-project/design/)</p>
  </div></div>`;
  return page({ file: 'prototype-index', title: ['Prototype review index', 'প্রোটোটাইপ পর্যালোচনা সূচি'], kind: 'bare', body });
}

export default {
  'student-login': studentLogin, 'access-denied': accessDenied, 'prototype-index': index,
  ...Object.fromEntries(PORTALS.map((p) => [`portal-${p.k}`, () => portalLogin(p)])),
};
