// Demo / Illustrative data shared by Variations G, H and I.
// Institution and person names are fictional; divisions and districts are real.
// Figures match the earlier rounds (59 institutions, 38,420 students, 2,146 teachers).

export const TODAY = ['Thursday, 15 Oct 2026', 'বৃহস্পতিবার, ১৫ অক্টোবর ২০২৬'];
export const UPDATED = '15 Oct 2026, 09:30';

export const ORG = {
  gov: ["Government of the People's Republic of Bangladesh", 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার'],
  ministry: ['Ministry of Textiles and Jute', 'বস্ত্র ও পাট মন্ত্রণালয়'],
  dept: ['Department of Textiles', 'বস্ত্র অধিদপ্তর'],
  product: ['Textile Institution Management System', 'টেক্সটাইল প্রতিষ্ঠান ব্যবস্থাপনা সিস্টেম'],
  short: ['TIMS', 'টিআইএমএস'],
  helpline: '16xxx',
  email: 'help@tims.gov.bd',
};

export const PUBLIC_NAV = [
  { key: 'home', label: ['Home', 'হোম'], href: '01-landing' },
  { key: 'about', label: ['About Us', 'আমাদের সম্পর্কে'], p2: 'About Us' },
  { key: 'admissions', label: ['Admissions', 'ভর্তি'], anchor: 'admissions' },
  { key: 'notice', label: ['Notice', 'নোটিশ'], href: '02-notices' },
  { key: 'help', label: ['Help', 'সহায়তা'], anchor: 'help' },
];

export const STATS = [
  { v: '59', l: ['Textile institutions', 'টেক্সটাইল প্রতিষ্ঠান'], s: ['8 divisions · 47 districts', '৮ বিভাগ · ৪৭ জেলা'], icon: 'school' },
  { v: '38,420', l: ['Students enrolled', 'অধ্যয়নরত শিক্ষার্থী'], s: ['Diploma and vocational', 'ডিপ্লোমা ও ভোকেশনাল'], icon: 'graduation-cap' },
  { v: '2,146', l: ['Teachers and instructors', 'শিক্ষক ও প্রশিক্ষক'], s: ['In 59 institutions', '৫৯টি প্রতিষ্ঠানে'], icon: 'users' },
  { v: '6,815', l: ['Graduates in 2025', '২০২৫ সালে উত্তীর্ণ'], s: ['Certificates issued online', 'অনলাইনে সনদ ইস্যু'], icon: 'award' },
  { v: '6', l: ['Programmes offered', 'চালু প্রোগ্রাম'], s: ['Engineering to vocational', 'ইঞ্জিনিয়ারিং থেকে ভোকেশনাল'], icon: 'book-open' },
];

export const CATEGORIES = [
  { v: 8, l: ['Textile Engineering Colleges', 'টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'] },
  { v: 10, l: ['Textile Institutes', 'টেক্সটাইল ইনস্টিটিউট'] },
  { v: 41, l: ['Textile Vocational Institutes', 'টেক্সটাইল ভোকেশনাল ইনস্টিটিউট'] },
];

export const DIVISIONS = [
  { id: 'dhaka', n: ['Dhaka', 'ঢাকা'], inst: 13, students: '9,840', att: 88.4, rep: '13/13', alerts: 1 },
  { id: 'chattogram', n: ['Chattogram', 'চট্টগ্রাম'], inst: 9, students: '6,120', att: 79.2, rep: '9/9', alerts: 3,
    districts: [
      { n: ['Chattogram', 'চট্টগ্রাম'], inst: 3, att: 76.8, rep: '3/3', alerts: 2 },
      { n: ['Noakhali', 'নোয়াখালী'], inst: 2, att: 81.9, rep: '1/2', alerts: 1 },
      { n: ['Cumilla', 'কুমিল্লা'], inst: 2, att: 83.4, rep: '2/2', alerts: 0 },
      { n: ['Feni', 'ফেনী'], inst: 1, att: 80.6, rep: '1/1', alerts: 0 },
      { n: ['Cox\'s Bazar', 'কক্সবাজার'], inst: 1, att: 78.1, rep: '1/1', alerts: 0 },
    ] },
  { id: 'rajshahi', n: ['Rajshahi', 'রাজশাহী'], inst: 8, students: '5,210', att: 86.1, rep: '8/8', alerts: 0 },
  { id: 'khulna', n: ['Khulna', 'খুলনা'], inst: 7, students: '4,380', att: 84.0, rep: '7/7', alerts: 1 },
  { id: 'barishal', n: ['Barishal', 'বরিশাল'], inst: 5, students: '2,960', att: 81.5, rep: '4/5', alerts: 1 },
  { id: 'sylhet', n: ['Sylhet', 'সিলেট'], inst: 4, students: '2,140', att: 77.8, rep: '4/4', alerts: 1 },
  { id: 'rangpur', n: ['Rangpur', 'রংপুর'], inst: 8, students: '4,650', att: 87.3, rep: '8/8', alerts: 0 },
  { id: 'mymensingh', n: ['Mymensingh', 'ময়মনসিংহ'], inst: 5, students: '3,120', att: 85.6, rep: '5/5', alerts: 0 },
];

export const ADMISSION = {
  cycle: ['Diploma in Textile Engineering 2026–27', 'ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং ২০২৬–২৭'],
  steps: [
    { l: ['Online application', 'অনলাইন আবেদন'], date: '01–31 Aug 2026', st: 'done' },
    { l: ['Application fee', 'আবেদন ফি'], date: 'By 31 Aug 2026', st: 'done' },
    { l: ['Entrance test', 'ভর্তি পরীক্ষা'], date: '20 Sep 2026', st: 'done' },
    { l: ['Result publication', 'ফলাফল প্রকাশ'], date: '30 Oct 2026', st: 'next' },
    { l: ['Institution allocation', 'প্রতিষ্ঠান বরাদ্দ'], date: '05 Nov 2026', st: 'todo' },
    { l: ['Final admission', 'চূড়ান্ত ভর্তি'], date: '10–20 Nov 2026', st: 'todo' },
    { l: ['Student ID issued', 'শিক্ষার্থী আইডি প্রদান'], date: 'Nov 2026', st: 'todo' },
  ],
  streams: [
    { name: ['Diploma in Textile Engineering', 'ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং'], session: '2026–27', seats: '6,240',
      status: ['Result on 30 Oct', 'ফল ৩০ অক্টোবর'], tone: 'info', cta: ['Check result', 'ফলাফল দেখুন'], apps: '41,260' },
    { name: ['Textile Vocational (SSC Vocational)', 'টেক্সটাইল ভোকেশনাল (এসএসসি ভোকেশনাল)'], session: '2027', seats: '3,620',
      status: ['Applications open until 15 Nov', '১৫ নভেম্বর পর্যন্ত আবেদন চলছে'], tone: 'ok', cta: ['Apply now', 'এখনই আবেদন করুন'], apps: '8,914' },
  ],
};

export const NOTICE_CATS = [
  { k: 'admission', l: ['Admission', 'ভর্তি'] },
  { k: 'academic', l: ['Academic', 'একাডেমিক'] },
  { k: 'exam', l: ['Examination & Result', 'পরীক্ষা ও ফলাফল'] },
  { k: 'institution', l: ['Institution', 'প্রতিষ্ঠান'] },
  { k: 'staff', l: ['Teacher / Staff', 'শিক্ষক / কর্মচারী'] },
  { k: 'circular', l: ['Circular / General', 'পরিপত্র / সাধারণ'] },
  { k: 'tender', l: ['Tender / Procurement', 'দরপত্র / ক্রয়'] },
];
export const catLabel = (k) => NOTICE_CATS.find((c) => c.k === k).l;

export const NOTICES = [
  { id: 'N-2026-0412', cat: 'admission', pinned: true, urgent: true, date: '14 Oct 2026', by: 'dept', size: '245 KB',
    t: ['Diploma admission 2026–27: entrance test result will be published on 30 October', 'ডিপ্লোমা ভর্তি ২০২৬–২৭: প্রবেশিকা পরীক্ষার ফল ৩০ অক্টোবর প্রকাশিত হবে'],
    s: ['Results will be available on this website and by SMS. Candidates selected must complete admission between 10 and 20 November.', 'ফলাফল এই ওয়েবসাইটে ও এসএমএসে পাওয়া যাবে। নির্বাচিত প্রার্থীদের ১০–২০ নভেম্বরের মধ্যে ভর্তি সম্পন্ন করতে হবে।'] },
  { id: 'N-2026-0409', cat: 'admission', date: '13 Oct 2026', by: 'dept', size: '312 KB',
    t: ['Online applications open for Textile Vocational (SSC Vocational) 2027', 'টেক্সটাইল ভোকেশনাল (এসএসসি ভোকেশনাল) ২০২৭-এ অনলাইন আবেদন শুরু'],
    s: ['Apply online until 15 November 2026. Application fee: ৳ 300.', '১৫ নভেম্বর ২০২৬ পর্যন্ত অনলাইনে আবেদন করা যাবে। আবেদন ফি: ৳ ৩০০।'] },
  { id: 'N-2026-0405', cat: 'exam', date: '12 Oct 2026', by: 'dept', size: '188 KB',
    t: ['Diploma semester final examination routine — January 2027', 'ডিপ্লোমা সেমিস্টার সমাপনী পরীক্ষার রুটিন — জানুয়ারি ২০২৭'],
    s: ['Routine for semesters 1, 3, 5 and 7. Institutions must display it on their notice boards.', '১ম, ৩য়, ৫ম ও ৭ম সেমিস্টারের রুটিন। প্রতিষ্ঠানগুলো নোটিশ বোর্ডে প্রদর্শন করবে।'] },
  { id: 'N-2026-0401', cat: 'academic', date: '10 Oct 2026', by: 'dept', size: '420 KB',
    t: ['Academic calendar 2027 for all textile institutes', 'সকল টেক্সটাইল ইনস্টিটিউটের একাডেমিক ক্যালেন্ডার ২০২৭'],
    s: ['Class start, holidays, examination windows and result dates for 2027.', '২০২৭ সালের ক্লাস শুরু, ছুটি, পরীক্ষা ও ফল প্রকাশের তারিখ।'] },
  { id: 'N-2026-0398', cat: 'staff', date: '09 Oct 2026', by: 'ministry', size: '156 KB',
    t: ['Teacher training on the live attendance system — schedule by division', 'লাইভ হাজিরা সিস্টেমে শিক্ষক প্রশিক্ষণ — বিভাগভিত্তিক সময়সূচি'],
    s: ['Two-day hands-on sessions from 21 October in all eight divisions.', '২১ অক্টোবর থেকে আট বিভাগে দুই দিনের হাতে-কলমে প্রশিক্ষণ।'] },
  { id: 'N-2026-0396', cat: 'institution', date: '08 Oct 2026', by: 'dept', size: '204 KB',
    t: ['Annual asset verification: institutions must submit by 31 October', 'বার্ষিক সম্পদ যাচাই: ৩১ অক্টোবরের মধ্যে প্রতিষ্ঠানগুলোকে জমা দিতে হবে'],
    s: ['Submit through the institution portal under Resources → Assets.', 'প্রতিষ্ঠান পোর্টালের রিসোর্স → সম্পদ অংশ থেকে জমা দিন।'] },
  { id: 'N-2026-0391', cat: 'circular', urgent: true, date: '07 Oct 2026', by: 'ministry', size: '98 KB',
    t: ['Durga Puja holidays: all institutions closed 19–22 October', 'দুর্গাপূজার ছুটি: ১৯–২২ অক্টোবর সকল প্রতিষ্ঠান বন্ধ থাকবে'],
    s: ['Classes resume on 25 October. Offices follow the government holiday order.', '২৫ অক্টোবর থেকে ক্লাস চলবে। অফিস সরকারি ছুটির আদেশ অনুযায়ী চলবে।'] },
  { id: 'N-2026-0388', cat: 'tender', date: '06 Oct 2026', by: 'dept', size: '1.2 MB',
    t: ['Tender: supply of 24 rapier looms for four textile institutes', 'দরপত্র: চারটি টেক্সটাইল ইনস্টিটিউটের জন্য ২৪টি র‍্যাপিয়ার লুম সরবরাহ'],
    s: ['e-GP tender. Last date of submission: 05 November 2026.', 'ই-জিপি দরপত্র। দাখিলের শেষ তারিখ: ০৫ নভেম্বর ২০২৬।'] },
  { id: 'N-2026-0380', cat: 'exam', date: '02 Oct 2026', by: 'dept', size: '640 KB',
    t: ['Semester 2 results published — Diploma in Textile Engineering', 'সেমিস্টার ২-এর ফল প্রকাশ — ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং'],
    s: ['Students can view results in the student portal.', 'শিক্ষার্থীরা স্টুডেন্ট পোর্টালে ফল দেখতে পারবে।'] },
  { id: 'N-2026-0372', cat: 'staff', date: '30 Sep 2026', by: 'ministry', size: '132 KB',
    t: ['Transfer and posting order — instructors (Weaving)', 'বদলি ও পদায়ন আদেশ — ইন্সট্রাক্টর (উইভিং)'],
    s: ['Joining within 7 working days of the order.', 'আদেশের ৭ কর্মদিবসের মধ্যে যোগদান করতে হবে।'] },
  { id: 'N-2026-0365', cat: 'academic', date: '28 Sep 2026', by: 'dept', size: '176 KB',
    t: ['Certificate applications open for 2025 graduates', '২০২৫ সালের উত্তীর্ণদের সনদের আবেদন শুরু'],
    s: ['Apply from the student portal. Certificates are verifiable online.', 'স্টুডেন্ট পোর্টাল থেকে আবেদন করুন। সনদ অনলাইনে যাচাই করা যাবে।'] },
  { id: 'N-2026-0358', cat: 'institution', date: '25 Sep 2026', by: 'ministry', size: '210 KB',
    t: ['Five textile vocational institutes approved for upgrade', 'পাঁচটি টেক্সটাইল ভোকেশনাল ইনস্টিটিউট উন্নীতকরণ অনুমোদিত'],
    s: ['Upgrade includes new labs and an apparel programme from 2027.', '২০২৭ থেকে নতুন ল্যাব ও অ্যাপারেল প্রোগ্রাম চালু হবে।'] },
];
export const AUTH = { dept: ['Department of Textiles', 'বস্ত্র অধিদপ্তর'], ministry: ['Ministry of Textiles and Jute', 'বস্ত্র ও পাট মন্ত্রণালয়'] };

// Public services (shortcuts). `to` = built screen, otherwise a Phase 2 placeholder.
export const SERVICES = [
  { k: 'apply', icon: 'clipboard-list', l: ['Apply for admission', 'ভর্তির আবেদন'], s: ['Vocational 2027 is open', 'ভোকেশনাল ২০২৭ চলছে'], who: 'candidate' },
  { k: 'result', icon: 'list-checks', l: ['Admission result', 'ভর্তির ফলাফল'], s: ['Diploma 2026–27 · 30 Oct', 'ডিপ্লোমা ২০২৬–২৭ · ৩০ অক্টোবর'], who: 'candidate' },
  { k: 'track', icon: 'route', l: ['Track application', 'আবেদনের অবস্থা'], s: ['Use your application ID', 'আবেদন আইডি দিয়ে দেখুন'], who: 'candidate', to: '03-login' },
  { k: 'verify', icon: 'shield-check', l: ['Verify a certificate', 'সনদ যাচাই'], s: ['Certificate or license number', 'সনদ বা লাইসেন্স নম্বর'], who: 'public' },
  { k: 'find', icon: 'scan-search', l: ['Find an institution', 'প্রতিষ্ঠান খুঁজুন'], s: ['59 institutions', '৫৯টি প্রতিষ্ঠান'], who: 'public' },
  { k: 'forms', icon: 'file-down', l: ['Forms and guides', 'ফরম ও নির্দেশিকা'], s: ['Download PDFs', 'পিডিএফ ডাউনলোড'], who: 'public' },
  { k: 'student', icon: 'id-card', l: ['Student services', 'শিক্ষার্থী সেবা'], s: ['Certificates, transcripts, fees', 'সনদ, ট্রান্সক্রিপ্ট, ফি'], who: 'student', to: '03-login' },
  { k: 'license', icon: 'badge-check', l: ['Professional license', 'পেশাগত লাইসেন্স'], s: ['Phase 2 · apply and verify', 'দ্বিতীয় পর্যায় · আবেদন ও যাচাই'], who: 'public' },
];

export const GALLERY = [
  { f: 'fabric-day.jpg', c: ['Fabric Day exhibition by textile engineering students', 'টেক্সটাইল ইঞ্জিনিয়ারিং শিক্ষার্থীদের ফেব্রিক ডে প্রদর্শনী'] },
  { f: 'loom-workshop.jpg', c: ['Weaving practical in a loom workshop', 'লুম ওয়ার্কশপে বয়ন ব্যবহারিক'] },
  { f: 'quality-check.jpg', c: ['Industry attachment: garment quality inspection', 'শিল্প সংযুক্তি: পোশাকের মান যাচাই'] },
  { f: 'museum.jpg', c: ['Textile museum and learning resource centre', 'টেক্সটাইল জাদুঘর ও শিখন সম্পদ কেন্দ্র'] },
  { f: 'printing.jpg', c: ['Screen-printing training for apparel students', 'অ্যাপারেল শিক্ষার্থীদের স্ক্রিন প্রিন্টিং প্রশিক্ষণ'] },
  { f: 'handloom.jpg', c: ['Handloom heritage workshop', 'তাঁত ঐতিহ্য কর্মশালা'] },
  { f: 'sewing-class.jpg', c: ['Vocational sewing class', 'ভোকেশনাল সেলাই ক্লাস'] },
  { f: 'jamdani-hands.jpg', c: ['Jamdani weaving demonstration', 'জামদানি বয়ন প্রদর্শনী'] },
];

export const FAQ = [
  { q: ['How do I apply for admission?', 'কীভাবে ভর্তির আবেদন করব?'], a: ['Open Admissions, choose your programme and fill in the online form. You will receive an application ID by SMS.', 'ভর্তি অংশে গিয়ে প্রোগ্রাম বেছে অনলাইন ফরম পূরণ করুন। এসএমএসে একটি আবেদন আইডি পাবেন।'] },
  { q: ['I lost my application ID. What should I do?', 'আবেদন আইডি হারিয়ে ফেলেছি। কী করব?'], a: ['Use "Forgot application ID" on the candidate sign-in page with your mobile number and date of birth.', 'প্রার্থী লগইন পাতায় "আবেদন আইডি ভুলে গেছি" থেকে মোবাইল নম্বর ও জন্মতারিখ দিয়ে উদ্ধার করুন।'] },
  { q: ['When does my candidate ID become a student ID?', 'প্রার্থী আইডি কখন শিক্ষার্থী আইডি হবে?'], a: ['After final admission is complete at the allocated institution. Your account moves to the student portal automatically.', 'বরাদ্দকৃত প্রতিষ্ঠানে চূড়ান্ত ভর্তি সম্পন্ন হলে। আপনার অ্যাকাউন্ট স্বয়ংক্রিয়ভাবে স্টুডেন্ট পোর্টালে যাবে।'] },
  { q: ['How can an employer verify a certificate?', 'নিয়োগকর্তা কীভাবে সনদ যাচাই করবেন?'], a: ['Enter the certificate number in "Verify a certificate". Paid verification for organisations is planned for Phase 2.', '"সনদ যাচাই" অংশে সনদ নম্বর দিন। প্রতিষ্ঠানের জন্য ফি-ভিত্তিক যাচাই দ্বিতীয় পর্যায়ে আসবে।'] },
];

export const HELP = [
  { icon: 'book-open', l: ['User guides', 'ব্যবহার নির্দেশিকা'], s: ['Step-by-step PDFs for every role', 'প্রতিটি ভূমিকার জন্য ধাপে ধাপে পিডিএফ'] },
  { icon: 'circle-play', l: ['Video tutorials', 'ভিডিও টিউটোরিয়াল'], s: ['Short videos in Bangla', 'বাংলায় ছোট ভিডিও'] },
  { icon: 'circle-help', l: ['Frequently asked questions', 'সাধারণ জিজ্ঞাসা'], s: ['Answers to common questions', 'সাধারণ প্রশ্নের উত্তর'] },
  { icon: 'headset', l: ['Help desk', 'হেল্প ডেস্ক'], s: ['Sun–Thu, 9:00–17:00', 'রবি–বৃহস্পতি, ৯:০০–১৭:০০'] },
];

export const PORTALS = [
  { k: 'ministry', icon: 'landmark', l: ['Ministry portal', 'মন্ত্রণালয় পোর্টাল'], dom: 'ministry.tims.gov.bd', who: ['Ministry and Department officials', 'মন্ত্রণালয় ও অধিদপ্তরের কর্মকর্তা'], to: '04-ministry-dashboard' },
  { k: 'division', icon: 'map', l: ['Division portal', 'বিভাগীয় পোর্টাল'], dom: 'division.tims.gov.bd', who: ['Division administrators', 'বিভাগীয় প্রশাসক'] },
  { k: 'district', icon: 'map-pin', l: ['District portal', 'জেলা পোর্টাল'], dom: 'district.tims.gov.bd', who: ['District administrators', 'জেলা প্রশাসক'] },
  { k: 'institution', icon: 'building-2', l: ['Institution portal', 'প্রতিষ্ঠান পোর্টাল'], dom: 'institution.tims.gov.bd', who: ['Principals and institution admins', 'অধ্যক্ষ ও প্রতিষ্ঠান অ্যাডমিন'], to: '05-principal-dashboard' },
];

// ---------------- Ministry ----------------
export const MIN = {
  user: { name: 'Farhana Ahmed', role: ['Ministry Super Admin', 'মন্ত্রণালয় সুপার অ্যাডমিন'], initials: 'FA' },
  kpis: [
    { k: 'reporting', v: '57 / 59', l: ['Institutions reporting today', 'আজ রিপোর্ট করেছে'], s: ['2 not yet reported', '২টি এখনও করেনি'], tone: 'warn' },
    { k: 'satt', v: '85.1%', l: ['Student attendance today', 'আজ শিক্ষার্থী উপস্থিতি'], s: ['Target 80% · 3 below', 'লক্ষ্য ৮০% · ৩টি নিচে'], tone: 'ok', trend: [83.2, 84.0, 82.9, 85.6, 84.8, 86.0, 85.1] },
    { k: 'tatt', v: '92.4%', l: ['Teacher attendance today', 'আজ শিক্ষক উপস্থিতি'], s: ['1,983 of 2,146 present', '২,১৪৬ জনের ১,৯৮৩ জন উপস্থিত'], tone: 'ok', trend: [91.8, 92.6, 91.2, 93.0, 92.1, 92.8, 92.4] },
    { k: 'approvals', v: '31', l: ['Pending approvals', 'অনুমোদনের অপেক্ষায়'], s: ['9 with you · 4 overdue', 'আপনার কাছে ৯ · ৪টি মেয়াদোত্তীর্ণ'], tone: 'warn' },
    { k: 'budget', v: '61%', l: ['Budget used, FY 2026–27', 'বাজেট ব্যবহার, অর্থবছর ২০২৬–২৭'], s: ['৳ 90.6 of 148.6 crore', '৳ ১৪৮.৬ কোটির ৯০.৬'], tone: 'ok' },
  ],
  approvals: [
    { ref: 'BR-2026-118', type: ['Budget re-allocation', 'বাজেট পুনর্বরাদ্দ'], t: ['Move ৳ 45 lakh to lab equipment', 'ল্যাব সরঞ্জামে ৳ ৪৫ লাখ স্থানান্তর'], where: ['Chattogram Division', 'চট্টগ্রাম বিভাগ'], age: '5', sla: '3', overdue: true, from: ['Division Admin', 'বিভাগীয় অ্যাডমিন'] },
    { ref: 'PR-2026-064', type: ['Procurement above threshold', 'সীমার বেশি ক্রয়'], t: ['24 rapier looms · ৳ 3.2 crore', '২৪টি র‍্যাপিয়ার লুম · ৳ ৩.২ কোটি'], where: ['4 institutes', '৪টি ইনস্টিটিউট'], age: '4', sla: '5', overdue: false, from: ['Department of Textiles', 'বস্ত্র অধিদপ্তর'] },
    { ref: 'MG-2026-221', type: ['Student migration', 'শিক্ষার্থী স্থানান্তর'], t: ['12 inter-division transfers', '১২টি আন্তঃবিভাগ স্থানান্তর'], where: ['Dhaka → Rajshahi, Khulna', 'ঢাকা → রাজশাহী, খুলনা'], age: '3', sla: '5', overdue: false, from: ['District Admins', 'জেলা অ্যাডমিন'] },
    { ref: 'US-2026-037', type: ['Role request', 'ভূমিকা অনুরোধ'], t: ['4 new District Admin accounts', '৪টি নতুন জেলা অ্যাডমিন অ্যাকাউন্ট'], where: ['Barishal, Sylhet', 'বরিশাল, সিলেট'], age: '6', sla: '2', overdue: true, from: ['Division Admins', 'বিভাগীয় অ্যাডমিন'] },
  ],
  exceptions: [
    { sev: 'danger', type: ['Low attendance', 'কম উপস্থিতি'], t: ['Student attendance below 80% for 3 days', 'টানা ৩ দিন শিক্ষার্থী উপস্থিতি ৮০%-এর নিচে'], where: ['Surma Textile Vocational Institute · Sylhet', 'সুরমা টেক্সটাইল ভোকেশনাল ইনস্টিটিউট · সিলেট'], v: '68.9%', age: ['3 days', '৩ দিন'] },
    { sev: 'danger', type: ['Low attendance', 'কম উপস্থিতি'], t: ['Institution attendance today', 'আজকের প্রতিষ্ঠান উপস্থিতি'], where: ['Karnaphuli Textile Institute · Chattogram', 'কর্ণফুলী টেক্সটাইল ইনস্টিটিউট · চট্টগ্রাম'], v: '72.4%', age: ['Today', 'আজ'] },
    { sev: 'warn', type: ['Not reported', 'রিপোর্ট হয়নি'], t: ['Daily attendance not submitted', 'দৈনিক হাজিরা জমা হয়নি'], where: ['Bamni Textile Institute · Noakhali', 'বামনী টেক্সটাইল ইনস্টিটিউট · নোয়াখালী'], v: '—', age: ['Today', 'আজ'] },
    { sev: 'warn', type: ['Result delayed', 'ফল প্রকাশে বিলম্ব'], t: ['Semester 3 results not published 21 days after exams', 'পরীক্ষার ২১ দিন পরও সেমিস্টার ৩-এর ফল প্রকাশ হয়নি'], where: ['Kirtankhola Textile Vocational Institute · Barishal', 'কীর্তনখোলা টেক্সটাইল ভোকেশনাল ইনস্টিটিউট · বরিশাল'], v: '21d', age: ['3 days', '৩ দিন'] },
    { sev: 'warn', type: ['Assets', 'সম্পদ'], t: ['6 damaged assets with no action recorded', '৬টি ক্ষতিগ্রস্ত সম্পদে কোনো ব্যবস্থা নেওয়া হয়নি'], where: ['Rupsha Textile Institute · Khulna', 'রূপসা টেক্সটাইল ইনস্টিটিউট · খুলনা'], v: '6', age: ['6 days', '৬ দিন'] },
  ],
  att30: [84.1, 83.6, 85.2, 86.0, 84.4, 82.1, 83.9, 85.5, 86.2, 85.0, 84.7, 83.2, 84.0, 82.9, 85.6, 84.8, 86.0, 85.7, 86.4, 85.2, 84.1, 83.8, 85.9, 86.3, 85.4, 84.6, 85.0, 86.1, 85.8, 85.1],
  funnel: [
    { l: ['Applications', 'আবেদন'], v: 41260 },
    { l: ['Fee paid', 'ফি পরিশোধ'], v: 38904 },
    { l: ['Sat the test', 'পরীক্ষায় অংশ'], v: 36118 },
    { l: ['Seats', 'আসন'], v: 6240 },
  ],
  reports: [
    { icon: 'user-check', l: ['Attendance — September 2026', 'হাজিরা — সেপ্টেম্বর ২০২৬'], s: ['All institutions · PDF, Excel', 'সকল প্রতিষ্ঠান · পিডিএফ, এক্সেল'] },
    { icon: 'clipboard-list', l: ['Admission 2026–27 — application summary', 'ভর্তি ২০২৬–২৭ — আবেদন সারসংক্ষেপ'], s: ['By division and programme', 'বিভাগ ও প্রোগ্রাম অনুযায়ী'] },
    { icon: 'wallet', l: ['Budget utilisation — Q1 FY 2026–27', 'বাজেট ব্যবহার — ১ম প্রান্তিক ২০২৬–২৭'], s: ['By institution', 'প্রতিষ্ঠান অনুযায়ী'] },
    { icon: 'package', l: ['Asset register — damaged and lost', 'সম্পদ রেজিস্টার — ক্ষতিগ্রস্ত ও হারানো'], s: ['Updated weekly', 'সাপ্তাহিক হালনাগাদ'] },
  ],
};

// ---------------- Principal ----------------
export const PRIN = {
  user: { name: 'Md. Saiful Islam', role: ['Principal', 'অধ্যক্ষ'], initials: 'SI' },
  inst: { n: ['Karnaphuli Textile Institute', 'কর্ণফুলী টেক্সটাইল ইনস্টিটিউট'], code: 'TI-CTG-014', place: ['Chattogram, Chattogram Division', 'চট্টগ্রাম, চট্টগ্রাম বিভাগ'] },
  kpis: [
    { v: '812', l: ['Students', 'শিক্ষার্থী'], s: ['6 programmes · 18 sections', '৬ প্রোগ্রাম · ১৮ সেকশন'] },
    { v: '46 / 48', l: ['Teachers present', 'উপস্থিত শিক্ষক'], s: ['2 on leave', '২ জন ছুটিতে'] },
    { v: '72.4%', l: ['Student attendance today', 'আজ শিক্ষার্থী উপস্থিতি'], s: ['Below 80% threshold', '৮০% সীমার নিচে'], tone: 'danger' },
    { v: '14', l: ['Pending approvals', 'অনুমোদনের অপেক্ষায়'], s: ['2 overdue', '২টি মেয়াদোত্তীর্ণ'], tone: 'warn' },
  ],
  approvals: [
    { ref: 'SR-2026-01467', type: ['Course drop', 'কোর্স ড্রপ'], who: 'Mim Akter', meta: ['Diploma Y2 · Sec B', 'ডিপ্লোমা ২য় বর্ষ · সেকশন বি'], age: '4', sla: '3', overdue: true },
    { ref: 'SR-2026-01431', type: ['Fee waiver', 'ফি মওকুফ'], who: 'Lamia Chowdhury', meta: ['Diploma Y1 · Sec A', 'ডিপ্লোমা ১ম বর্ষ · সেকশন এ'], age: '5', sla: '3', overdue: true },
    { ref: 'LV-2026-0212', type: ['Casual leave · 2 days', 'নৈমিত্তিক ছুটি · ২ দিন'], who: 'Kamrul Hasan', meta: ['Instructor, Spinning · balance 6', 'ইন্সট্রাক্টর, স্পিনিং · অবশিষ্ট ৬'], age: '1', sla: '2', overdue: false },
    { ref: 'SR-2026-01482', type: ['Testimonial', 'প্রশংসাপত্র'], who: 'Rafiul Alam', meta: ['Diploma Y4 · Sec A', 'ডিপ্লোমা ৪র্থ বর্ষ · সেকশন এ'], age: '1', sla: '3', overdue: false },
  ],
  elsewhere: [
    { t: ['Procurement: 6 sewing machines (৳ 4.8 lakh)', 'ক্রয়: ৬টি সেলাই মেশিন (৳ ৪.৮ লাখ)'], who: ['Waiting for District Admin', 'জেলা অ্যাডমিনের অপেক্ষায়'], age: ['3 days', '৩ দিন'] },
    { t: ['Student migration: Tanvir Ahmed → Dhaka', 'শিক্ষার্থী স্থানান্তর: তানভীর আহমেদ → ঢাকা'], who: ['Waiting for Ministry', 'মন্ত্রণালয়ের অপেক্ষায়'], age: ['6 days', '৬ দিন'] },
  ],
  classes: [
    { c: ['Diploma Y1 · Sec A', 'ডিপ্লোমা ১ম বর্ষ · সেকশন এ'], teacher: 'Nusrat Jahan', p: 58, t: 64, st: 'done' },
    { c: ['Diploma Y1 · Sec B', 'ডিপ্লোমা ১ম বর্ষ · সেকশন বি'], teacher: 'Arif Hossain', p: 41, t: 62, st: 'done' },
    { c: ['Diploma Y2 · Sec A', 'ডিপ্লোমা ২য় বর্ষ · সেকশন এ'], teacher: 'Tahmina Akter', p: null, t: 60, st: 'missing' },
    { c: ['Diploma Y2 · Sec B', 'ডিপ্লোমা ২য় বর্ষ · সেকশন বি'], teacher: 'Arif Hossain', p: null, t: 60, st: 'due' },
    { c: ['Diploma Y3 · Sec A', 'ডিপ্লোমা ৩য় বর্ষ · সেকশন এ'], teacher: 'Shahidul Karim', p: 49, t: 55, st: 'done' },
    { c: ['Vocational · Batch 2026', 'ভোকেশনাল · ব্যাচ ২০২৬'], teacher: 'Rokeya Sultana', p: 36, t: 40, st: 'done' },
  ],
  quick: [
    { icon: 'user-check', l: ['Attendance', 'হাজিরা'] }, { icon: 'clipboard-check', l: ['Publish result', 'ফল প্রকাশ'] },
    { icon: 'users', l: ['Add student', 'শিক্ষার্থী যোগ'] }, { icon: 'layers', l: ['Create class', 'ক্লাস তৈরি'] },
    { icon: 'wallet', l: ['Record expense', 'ব্যয় লিপিবদ্ধ'] }, { icon: 'truck', l: ['Gate pass', 'গেট পাস'] },
    { icon: 'package', l: ['Assign asset', 'সম্পদ বরাদ্দ'] }, { icon: 'megaphone', l: ['Post notice', 'নোটিশ দিন'] },
  ],
};

// ---------------- Teacher ----------------
export const TEACH = {
  user: { name: 'Arif Hossain', role: ['Instructor, Weaving', 'ইন্সট্রাক্টর, উইভিং'], initials: 'AH' },
  classes: [
    { time: '09:00', end: '10:30', c: ['Diploma Y1 · Sec B', 'ডিপ্লোমা ১ম বর্ষ · সেকশন বি'], sub: ['Weaving I', 'উইভিং ১'], room: ['Weaving Lab 2', 'উইভিং ল্যাব ২'], st: 'done', p: 41, t: 62 },
    { time: '11:00', end: '12:30', c: ['Diploma Y2 · Sec B', 'ডিপ্লোমা ২য় বর্ষ · সেকশন বি'], sub: ['Fabric Structure', 'ফেব্রিক স্ট্রাকচার'], room: ['Room 204', 'কক্ষ ২০৪'], st: 'now', p: null, t: 60 },
    { time: '14:00', end: '16:00', c: ['Diploma Y1 · Sec A', 'ডিপ্লোমা ১ম বর্ষ · সেকশন এ'], sub: ['Weaving I (Lab)', 'উইভিং ১ (ল্যাব)'], room: ['Weaving Lab 2', 'উইভিং ল্যাব ২'], st: 'later', p: null, t: 64 },
  ],
  roster: [
    { roll: '2401', name: 'Mim Akter', s: 'P' }, { roll: '2402', name: 'Rafiul Alam', s: 'P' }, { roll: '2403', name: 'Sajid Rahman', s: 'A' },
    { roll: '2404', name: 'Lamia Chowdhury', s: 'P' }, { roll: '2405', name: 'Tanvir Ahmed', s: 'L' }, { roll: '2406', name: 'Nadia Islam', s: 'P' },
    { roll: '2407', name: 'Habibur Rahman', s: 'P' }, { roll: '2408', name: 'Sumaiya Khatun', s: 'P' },
  ],
  tasks: [
    { icon: 'clipboard-check', t: ['Enter Semester 3 marks — Fabric Structure', 'সেমিস্টার ৩-এর নম্বর দিন — ফেব্রিক স্ট্রাকচার'], s: ['58 of 60 entered · due 20 Oct', '৬০ জনের ৫৮ জন সম্পন্ন · শেষ তারিখ ২০ অক্টোবর'], pct: 97, btn: ['Continue', 'চালিয়ে যান'] },
    { icon: 'upload', t: ['Upload Week 7 material — Weaving I', 'সপ্তাহ ৭-এর উপকরণ আপলোড — উইভিং ১'], s: ['Students see it in their portal', 'শিক্ষার্থীরা পোর্টালে দেখবে'], pct: 0, btn: ['Upload', 'আপলোড'] },
    { icon: 'circle-alert', t: ['Result returned for correction — Weaving I (Sem 1)', 'সংশোধনের জন্য ফেরত — উইভিং ১ (সেম ১)'], s: ['Principal: 2 marks exceed the maximum', 'অধ্যক্ষ: ২টি নম্বর সর্বোচ্চের বেশি'], pct: null, btn: ['Fix now', 'এখনই ঠিক করুন'], warn: true },
  ],
  leave: [
    { l: ['Casual', 'নৈমিত্তিক'], used: 4, total: 10 }, { l: ['Sick', 'অসুস্থতা'], used: 5, total: 14 }, { l: ['Earned', 'অর্জিত'], used: 8, total: 30 },
  ],
};

// ---------------- Student ----------------
export const STU = {
  user: { name: 'Mim Akter', role: ['Student', 'শিক্ষার্থী'], initials: 'MA' },
  id: 'KTI-2024-2401',
  prog: ['Diploma in Textile Engineering', 'ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং'],
  year: ['Year 2 · Semester 3 · Section B', '২য় বর্ষ · সেমিস্টার ৩ · সেকশন বি'],
  att: 78, cgpa: '3.30', fees: '3,500',
  classes: [
    { time: '11:00', sub: ['Fabric Structure', 'ফেব্রিক স্ট্রাকচার'], who: 'Arif Hossain', room: ['Room 204', 'কক্ষ ২০৪'] },
    { time: '13:00', sub: ['Yarn Manufacturing II', 'ইয়ার্ন ম্যানুফ্যাকচারিং ২'], who: 'Nusrat Jahan', room: ['Spinning Lab', 'স্পিনিং ল্যাব'] },
    { time: '15:00', sub: ['Textile Mathematics', 'টেক্সটাইল গণিত'], who: 'Shahidul Karim', room: ['Room 112', 'কক্ষ ১১২'] },
  ],
  requests: [
    { ref: 'SR-2026-01398', s: ['Testimonial', 'প্রশংসাপত্র'], st: 'returned', date: '08 Oct 2026', note: ['Photo is not clear — upload a new passport-size photo', 'ছবি অস্পষ্ট — নতুন পাসপোর্ট সাইজের ছবি দিন'] },
    { ref: 'SR-2026-01467', s: ['Course drop', 'কোর্স ড্রপ'], st: 'review', date: '11 Oct 2026', note: ['With the Principal\'s office since 12 Oct', '১২ অক্টোবর থেকে অধ্যক্ষের দপ্তরে'] },
    { ref: 'SR-2026-01310', s: ['Admit card — Semester 3', 'প্রবেশপত্র — সেমিস্টার ৩'], st: 'done', date: '29 Sep 2026', note: ['Ready to download', 'ডাউনলোডের জন্য প্রস্তুত'] },
  ],
  results: [
    { sem: ['Semester 3', 'সেমিস্টার ৩'], gpa: null, st: 'pending' },
    { sem: ['Semester 2', 'সেমিস্টার ২'], gpa: '3.42', st: 'published' },
    { sem: ['Semester 1', 'সেমিস্টার ১'], gpa: '3.18', st: 'published' },
  ],
  courses: [
    { c: ['Fabric Structure', 'ফেব্রিক স্ট্রাকচার'], a: 82 }, { c: ['Yarn Manufacturing II', 'ইয়ার্ন ম্যানুফ্যাকচারিং ২'], a: 74 },
    { c: ['Textile Mathematics', 'টেক্সটাইল গণিত'], a: 71 }, { c: ['Weaving Practical', 'বয়ন ব্যবহারিক'], a: 86 },
  ],
  services: [
    ['Admit card', 'প্রবেশপত্র'], ['Fee payment', 'ফি পরিশোধ'], ['Waiver', 'মওকুফ'], ['Re-admission', 'পুনঃভর্তি'],
    ['Course drop', 'কোর্স ড্রপ'], ['Semester drop', 'সেমিস্টার ড্রপ'], ['Testimonial', 'প্রশংসাপত্র'], ['Incomplete transcript', 'অসম্পূর্ণ ট্রান্সক্রিপ্ট'],
    ['PVC & transcript', 'পিভিসি ও ট্রান্সক্রিপ্ট'], ['Certificate & transcript', 'সনদ ও ট্রান্সক্রিপ্ট'], ['Duplicate certificate', 'সনদের অনুলিপি'], ['Medium of instruction', 'শিক্ষার মাধ্যম সনদ'],
    ['Transfer programme', 'প্রোগ্রাম পরিবর্তন'], ['Cancel studentship', 'ছাত্রত্ব বাতিল'], ['Convocation', 'সমাবর্তন'],
  ],
};

// Status vocabulary shared by all variations.
export const STATUS = {
  done: ['Completed', 'সম্পন্ন'], review: ['Under review', 'পর্যালোচনাধীন'], returned: ['Returned for correction', 'সংশোধনের জন্য ফেরত'],
  approved: ['Approved', 'অনুমোদিত'], rejected: ['Rejected', 'প্রত্যাখ্যাত'], pending: ['Pending publication', 'প্রকাশের অপেক্ষায়'],
  published: ['Published', 'প্রকাশিত'], overdue: ['Overdue', 'মেয়াদোত্তীর্ণ'], submitted: ['Submitted', 'জমা হয়েছে'],
  missing: ['Not submitted', 'জমা হয়নি'], due: ['Due now', 'এখন করণীয়'], recorded: ['Recorded', 'লিপিবদ্ধ'], later: ['Later today', 'আজ পরে'],
};
