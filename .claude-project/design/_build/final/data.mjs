// Final prototype data. Institution, person (except published officials) and all figures are
// Demo / Illustrative Data. Divisions and districts are real. Today = 15 Oct 2026.
export { DIVISIONS, MIN, PRIN, TEACH, STU, FAQ, CATEGORIES } from '../ghi/data.mjs';

export const TODAY = ['Thursday, 15 Oct 2026', 'বৃহস্পতিবার, ১৫ অক্টোবর ২০২৬'];

export const STATS = [
  { v: '59', l: ['Textile Institutions', 'টেক্সটাইল প্রতিষ্ঠান'], s: ['Connected to the system', 'সিস্টেমে সংযুক্ত'], icon: 'school' },
  { v: '38,420', l: ['Students Enrolled', 'অধ্যয়নরত শিক্ষার্থী'], s: ['Session 2026–27', 'সেশন ২০২৬–২৭'], icon: 'graduation-cap' },
  { v: '2,146', l: ['Teachers / Instructors', 'শিক্ষক / ইন্সট্রাক্টর'], s: ['Using the system', 'সিস্টেম ব্যবহার করছেন'], icon: 'users' },
  { v: '6,815', l: ['Graduates (2025)', 'উত্তীর্ণ (২০২৫)'], s: ['Certificates verifiable online', 'সনদ অনলাইনে যাচাইযোগ্য'], icon: 'award' },
];

export const ADMISSION = {
  cycle: ['Diploma in Textile Engineering — Session 2026–27', 'ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং — সেশন ২০২৬–২৭'],
  steps: [
    { l: ['Online application and fee', 'অনলাইন আবেদন ও ফি'], date: '01 Sep – 20 Oct 2026', st: 'now' },
    { l: ['Admission test', 'ভর্তি পরীক্ষা'], date: '08 Nov 2026', st: 'todo' },
    { l: ['Result publication', 'ফলাফল প্রকাশ'], date: '25 Nov 2026', st: 'todo' },
    { l: ['Institution allocation', 'প্রতিষ্ঠান বরাদ্দ'], date: '01 Dec 2026', st: 'todo' },
    { l: ['Final admission', 'চূড়ান্ত ভর্তি'], date: '05–15 Dec 2026', st: 'todo' },
    { l: ['Classes begin', 'ক্লাস শুরু'], date: '05 Jan 2027', st: 'todo' },
  ],
  seats: [
    { l: ['Textile Engineering Colleges (B.Sc.)', 'টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ (বি.এসসি)'], v: '1,120', note: ['Admission through the affiliated university system', 'অধিভুক্ত বিশ্ববিদ্যালয়ের মাধ্যমে ভর্তি'] },
    { l: ['Textile Institutes (Diploma)', 'টেক্সটাইল ইনস্টিটিউট (ডিপ্লোমা)'], v: '6,240', note: ['This cycle — apply here', 'এই চক্র — এখানে আবেদন করুন'] },
    { l: ['Textile Vocational Institutes (SSC Vocational)', 'টেক্সটাইল ভোকেশনাল ইনস্টিটিউট (এসএসসি ভোকেশনাল)'], v: '3,620', note: ['Applications open 01 Nov 2026', 'আবেদন শুরু ০১ নভেম্বর ২০২৬'] },
  ],
  quota: [
    [['General merit', 'সাধারণ মেধা'], '85%'], [['Freedom fighter descendants', 'মুক্তিযোদ্ধার বংশধর'], '5%'], [['Ethnic minorities', 'ক্ষুদ্র নৃগোষ্ঠী'], '5%'], [['Persons with disabilities', 'প্রতিবন্ধী ব্যক্তি'], '1%'], [['Wards of DoT employees', 'বস্ত্র অধিদপ্তরের কর্মচারীর সন্তান'], '4%'],
  ],
  docs: [['SSC/equivalent certificate and mark sheet', 'এসএসসি/সমমান সনদ ও নম্বরপত্র'], ['Recent passport-size photo (300×300 px, max 100 KB)', 'সাম্প্রতিক পাসপোর্ট সাইজ ছবি (৩০০×৩০০ পিক্সেল, সর্বোচ্চ ১০০ কেবি)'], ['Birth registration or NID number', 'জন্ম নিবন্ধন বা এনআইডি নম্বর'], ['Quota certificate (if claimed)', 'কোটা সনদ (প্রযোজ্য হলে)']],
};

export const NOTICE_CATS = [
  { k: 'admission', l: ['Admission', 'ভর্তি'] }, { k: 'academic', l: ['Academic', 'একাডেমিক'] }, { k: 'exam', l: ['Examination', 'পরীক্ষা'] },
  { k: 'result', l: ['Result', 'ফলাফল'] }, { k: 'institution', l: ['Institution', 'প্রতিষ্ঠান'] }, { k: 'staff', l: ['Teacher / Staff', 'শিক্ষক / কর্মচারী'] },
  { k: 'circular', l: ['Circular / General', 'পরিপত্র / সাধারণ'] }, { k: 'tender', l: ['Tender / Procurement', 'দরপত্র / ক্রয়'] },
];
export const catLabel = (k) => NOTICE_CATS.find((c) => c.k === k).l;
export const AUTH = { dept: ['Department of Textiles', 'বস্ত্র অধিদপ্তর'], ministry: ['Ministry of Textiles and Jute', 'বস্ত্র ও পাট মন্ত্রণালয়'] };
export const NOTICES = [
  { id: 'DOT/ADM/2026/412', cat: 'admission', pinned: true, urgent: true, date: '14 Oct 2026', by: 'dept', size: '245 KB',
    t: ['Diploma in Textile Engineering admission 2026–27: online application closes on 20 October 2026', 'ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং ভর্তি ২০২৬–২৭: অনলাইন আবেদন ২০ অক্টোবর ২০২৬ তারিখে শেষ হবে'],
    s: ['Candidates must complete the application and pay the application fee of ৳ 500 by 23:59 on 20 October 2026. Incomplete applications will not be considered for the admission test.', 'প্রার্থীদের ২০ অক্টোবর ২০২৬ রাত ১১:৫৯-এর মধ্যে আবেদন সম্পন্ন করে ৳ ৫০০ আবেদন ফি পরিশোধ করতে হবে। অসম্পূর্ণ আবেদন ভর্তি পরীক্ষার জন্য বিবেচিত হবে না।'] },
  { id: 'DOT/ADM/2026/409', cat: 'admission', date: '13 Oct 2026', by: 'dept', size: '312 KB',
    t: ['Admission test centres and seat plan for Diploma 2026–27', 'ডিপ্লোমা ২০২৬–২৭ ভর্তি পরীক্ষার কেন্দ্র ও আসন বিন্যাস'], s: ['The admission test will be held on 08 November 2026 at 59 centres.', '০৮ নভেম্বর ২০২৬ তারিখে ৫৯টি কেন্দ্রে ভর্তি পরীক্ষা অনুষ্ঠিত হবে।'] },
  { id: 'DOT/EXM/2026/405', cat: 'exam', date: '12 Oct 2026', by: 'dept', size: '188 KB',
    t: ['Diploma semester final examination routine — January 2027', 'ডিপ্লোমা সেমিস্টার সমাপনী পরীক্ষার রুটিন — জানুয়ারি ২০২৭'], s: ['Routine for semesters 1, 3, 5 and 7. Institutions shall display the routine on their notice boards.', '১ম, ৩য়, ৫ম ও ৭ম সেমিস্টারের রুটিন। প্রতিষ্ঠানসমূহ নোটিশ বোর্ডে রুটিন প্রদর্শন করবে।'] },
  { id: 'DOT/ACD/2026/401', cat: 'academic', date: '10 Oct 2026', by: 'dept', size: '420 KB',
    t: ['Academic calendar 2027 for all textile institutes', 'সকল টেক্সটাইল ইনস্টিটিউটের একাডেমিক ক্যালেন্ডার ২০২৭'], s: ['Class schedule, holidays, examination periods and result dates for 2027.', '২০২৭ সালের ক্লাস, ছুটি, পরীক্ষা ও ফল প্রকাশের তারিখ।'] },
  { id: 'MOTJ/ADM/2026/398', cat: 'staff', date: '09 Oct 2026', by: 'ministry', size: '156 KB',
    t: ['Training of teachers on the live attendance system — division-wise schedule', 'লাইভ হাজিরা সিস্টেম বিষয়ে শিক্ষক প্রশিক্ষণ — বিভাগভিত্তিক সময়সূচি'], s: ['Two-day practical sessions from 21 October 2026 in all eight divisions.', '২১ অক্টোবর ২০২৬ থেকে আট বিভাগে দুই দিনের ব্যবহারিক প্রশিক্ষণ।'] },
  { id: 'DOT/INS/2026/396', cat: 'institution', date: '08 Oct 2026', by: 'dept', size: '204 KB',
    t: ['Annual asset verification: institutions shall submit by 31 October 2026', 'বার্ষিক সম্পদ যাচাই: প্রতিষ্ঠানসমূহ ৩১ অক্টোবর ২০২৬-এর মধ্যে জমা দেবে'], s: ['Submit through the Institution Portal under Resources → Assets.', 'প্রতিষ্ঠান পোর্টালের সম্পদ → সম্পদ অংশ থেকে জমা দিন।'] },
  { id: 'MOTJ/GEN/2026/391', cat: 'circular', urgent: true, date: '07 Oct 2026', by: 'ministry', size: '98 KB',
    t: ['Durga Puja holidays: all institutions remain closed from 19 to 22 October 2026', 'দুর্গাপূজার ছুটি: ১৯ থেকে ২২ অক্টোবর ২০২৬ সকল প্রতিষ্ঠান বন্ধ থাকবে'], s: ['Classes resume on 25 October 2026. Offices follow the government holiday order.', '২৫ অক্টোবর ২০২৬ থেকে ক্লাস চলবে। অফিস সরকারি ছুটির আদেশ অনুযায়ী চলবে।'] },
  { id: 'DOT/PRC/2026/388', cat: 'tender', date: '06 Oct 2026', by: 'dept', size: '1.2 MB',
    t: ['Tender notice: supply of 24 rapier looms for four textile institutes', 'দরপত্র বিজ্ঞপ্তি: চারটি টেক্সটাইল ইনস্টিটিউটের জন্য ২৪টি র‍্যাপিয়ার লুম সরবরাহ'], s: ['e-GP tender. Last date of submission: 05 November 2026.', 'ই-জিপি দরপত্র। দাখিলের শেষ তারিখ: ০৫ নভেম্বর ২০২৬।'] },
  { id: 'DOT/RES/2026/380', cat: 'result', date: '02 Oct 2026', by: 'dept', size: '640 KB',
    t: ['Semester 2 results published — Diploma in Textile Engineering', 'সেমিস্টার ২-এর ফলাফল প্রকাশ — ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং'], s: ['Students can view results in the student portal.', 'শিক্ষার্থীরা স্টুডেন্ট পোর্টালে ফলাফল দেখতে পারবে।'] },
  { id: 'MOTJ/ADM/2026/372', cat: 'staff', date: '30 Sep 2026', by: 'ministry', size: '132 KB',
    t: ['Transfer and posting order — instructors (Weaving)', 'বদলি ও পদায়ন আদেশ — ইন্সট্রাক্টর (উইভিং)'], s: ['Joining within seven working days of the order.', 'আদেশের সাত কর্মদিবসের মধ্যে যোগদান করতে হবে।'] },
  { id: 'DOT/ACD/2026/365', cat: 'academic', date: '28 Sep 2026', by: 'dept', size: '176 KB',
    t: ['Certificate applications open for 2025 graduates', '২০২৫ সালের উত্তীর্ণদের সনদের আবেদন শুরু'], s: ['Apply from the student portal. Issued certificates are verifiable online.', 'স্টুডেন্ট পোর্টাল থেকে আবেদন করুন। ইস্যুকৃত সনদ অনলাইনে যাচাইযোগ্য।'] },
  { id: 'MOTJ/INS/2026/358', cat: 'institution', date: '25 Sep 2026', by: 'ministry', size: '210 KB',
    t: ['Five textile vocational institutes approved for upgrade', 'পাঁচটি টেক্সটাইল ভোকেশনাল ইনস্টিটিউট উন্নীতকরণ অনুমোদিত'], s: ['The upgrade includes new laboratories from 2027.', '২০২৭ থেকে নতুন ল্যাবরেটরি স্থাপন করা হবে।'] },
];

export const OFFICIALS = [
  { img: 'minister.jpg', n: ['Khandaker Abdul Muktadir', 'খন্দকার আব্দুল মুক্তাদির'], r: ['Minister', 'মন্ত্রী'], o: ['Ministry of Textiles and Jute', 'বস্ত্র ও পাট মন্ত্রণালয়'], src: 'https://motj.gov.bd/' },
  { img: 'state-minister.jpg', n: ['Md. Shariful Alam', 'জনাব মোঃ শরীফুল আলম'], r: ['State Minister', 'প্রতিমন্ত্রী'], o: ['Ministry of Textiles and Jute', 'বস্ত্র ও পাট মন্ত্রণালয়'], src: 'https://motj.gov.bd/' },
  { img: 'secretary.jpg', n: ['Sharf Uddin Ahmed Chowdhury', 'জনাব শরফ উদ্দিন আহমদ চৌধুরী'], r: ['Secretary', 'সচিব'], o: ['Ministry of Textiles and Jute', 'বস্ত্র ও পাট মন্ত্রণালয়'], src: 'https://motj.gov.bd/' },
  { img: 'dg-dot.jpg', n: ['Dr. Md. Abdus Sabur', 'ড. মোঃ আব্দুস সবুর'], r: ['Director General (Secretary)', 'মহাপরিচালক (সচিব)'], o: ['Department of Textiles', 'বস্ত্র অধিদপ্তর'], src: 'https://dot.gov.bd/' },
];

export const GALLERY = [
  { f: 'campus-gtec-grounds.jpg', c: ['Campus, Gopalganj Textile Engineering College', 'ক্যাম্পাস, গোপালগঞ্জ টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], src: 'tec.gopalganj.gov.bd' },
  { f: 'ev-dti-orientation.jpg', c: ['Orientation class, Dinajpur Textile Institute', 'ওরিয়েন্টেশন ক্লাস, দিনাজপুর টেক্সটাইল ইনস্টিটিউট'], src: 'dti.edu.bd' },
  { f: 'tecn-museum.jpg', c: ['Textile museum, Textile Engineering College, Noakhali', 'টেক্সটাইল জাদুঘর, টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ, নোয়াখালী'], src: 'Wikimedia Commons (CC BY-SA 4.0)' },
  { f: 'lab-dti-computer.jpg', c: ['Computer laboratory, Dinajpur Textile Institute', 'কম্পিউটার ল্যাবরেটরি, দিনাজপুর টেক্সটাইল ইনস্টিটিউট'], src: 'dti.edu.bd' },
  { f: 'tecn-fabric-day.jpg', c: ['Fabric Day exhibition, Textile Engineering College, Noakhali', 'ফেব্রিক ডে প্রদর্শনী, টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ, নোয়াখালী'], src: 'Wikimedia Commons (CC BY-SA 4.0)' },
  { f: 'ev-gtec-seminar.jpg', c: ['Seminar, Gopalganj Textile Engineering College', 'সেমিনার, গোপালগঞ্জ টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], src: 'tec.gopalganj.gov.bd' },
  { f: 'ev-tecn-awards.jpg', c: ['Prize-giving ceremony, Textile Engineering College, Noakhali', 'পুরস্কার বিতরণী, টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ, নোয়াখালী'], src: 'tecn.edu.bd' },
  { f: 'campus-tecn.jpg', c: ['Campus, Textile Engineering College, Noakhali', 'ক্যাম্পাস, টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ, নোয়াখালী'], src: 'tecn.edu.bd' },
  { f: 'ev-dti-assembly.jpg', c: ['Students’ assembly, Dinajpur Textile Institute', 'শিক্ষার্থী সমাবেশ, দিনাজপুর টেক্সটাইল ইনস্টিটিউট'], src: 'dti.edu.bd' },
  { f: 'campus-gtec-blocks.jpg', c: ['Academic and residential blocks, Gopalganj TEC', 'একাডেমিক ও আবাসিক ভবন, গোপালগঞ্জ টিইসি'], src: 'tec.gopalganj.gov.bd' },
  { f: 'ev-dti-boishakh.jpg', c: ['Pohela Boishakh rally, Dinajpur Textile Institute', 'পহেলা বৈশাখ শোভাযাত্রা, দিনাজপুর টেক্সটাইল ইনস্টিটিউট'], src: 'dti.edu.bd' },
];

export const PROGRAMMES = [
  { k: 'bsc', l: ['B.Sc. in Textile Engineering', 'বি.এসসি ইন টেক্সটাইল ইঞ্জিনিয়ারিং'], dur: ['4 years', '৪ বছর'], where: ['Textile Engineering Colleges (8)', 'টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ (৮)'], entry: ['HSC (Science)', 'এইচএসসি (বিজ্ঞান)'],
    tech: [['Yarn Engineering', 'ইয়ার্ন ইঞ্জিনিয়ারিং'], ['Fabric Engineering', 'ফেব্রিক ইঞ্জিনিয়ারিং'], ['Wet Process Engineering', 'ওয়েট প্রসেস ইঞ্জিনিয়ারিং'], ['Apparel Engineering', 'অ্যাপারেল ইঞ্জিনিয়ারিং']] },
  { k: 'dip', l: ['Diploma in Textile Engineering', 'ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং'], dur: ['4 years (8 semesters)', '৪ বছর (৮ সেমিস্টার)'], where: ['Textile Institutes (10)', 'টেক্সটাইল ইনস্টিটিউট (১০)'], entry: ['SSC or equivalent', 'এসএসসি বা সমমান'],
    tech: [['Textile Technology', 'টেক্সটাইল টেকনোলজি'], ['Garments Design & Pattern Making', 'গার্মেন্টস ডিজাইন অ্যান্ড প্যাটার্ন মেকিং'], ['Dyeing, Printing & Finishing', 'ডাইং, প্রিন্টিং অ্যান্ড ফিনিশিং']] },
  { k: 'voc', l: ['SSC (Vocational) — Textile trades', 'এসএসসি (ভোকেশনাল) — টেক্সটাইল ট্রেড'], dur: ['2 years', '২ বছর'], where: ['Textile Vocational Institutes (41)', 'টেক্সটাইল ভোকেশনাল ইনস্টিটিউট (৪১)'], entry: ['Class 8 pass', '৮ম শ্রেণি পাস'],
    tech: [['Weaving', 'উইভিং'], ['Knitting', 'নিটিং'], ['Dyeing, Printing & Finishing', 'ডাইং, প্রিন্টিং অ্যান্ড ফিনিশিং'], ['Dress Making', 'ড্রেস মেকিং']] },
];

export const INSTITUTIONS = [
  { id: 'karnaphuli', n: ['Karnaphuli Textile Institute', 'কর্ণফুলী টেক্সটাইল ইনস্টিটিউট'], type: 'ti', code: 'TI-CTG-014', dist: ['Chattogram', 'চট্টগ্রাম'], div: ['Chattogram', 'চট্টগ্রাম'], students: '812', teachers: '48', att: 72.4 },
  { id: 'bamni', n: ['Bamni Textile Institute', 'বামনী টেক্সটাইল ইনস্টিটিউট'], type: 'ti', code: 'TI-NOA-022', dist: ['Noakhali', 'নোয়াখালী'], div: ['Chattogram', 'চট্টগ্রাম'], students: '640', teachers: '37', att: 81.9 },
  { id: 'meghna', n: ['Meghna Textile Vocational Institute', 'মেঘনা টেক্সটাইল ভোকেশনাল ইনস্টিটিউট'], type: 'tvi', code: 'TVI-CUM-041', dist: ['Cumilla', 'কুমিল্লা'], div: ['Chattogram', 'চট্টগ্রাম'], students: '388', teachers: '21', att: 83.4 },
  { id: 'buriganga', n: ['Buriganga Textile Engineering College', 'বুড়িগঙ্গা টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], type: 'tec', code: 'TEC-DHA-003', dist: ['Dhaka', 'ঢাকা'], div: ['Dhaka', 'ঢাকা'], students: '1,024', teachers: '71', att: 90.2 },
  { id: 'madhumati', n: ['Madhumati Textile Engineering College', 'মধুমতি টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], type: 'tec', code: 'TEC-GOP-006', dist: ['Gopalganj', 'গোপালগঞ্জ'], div: ['Dhaka', 'ঢাকা'], students: '702', teachers: '52', att: 88.1 },
  { id: 'padma', n: ['Padma Textile Engineering College', 'পদ্মা টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], type: 'tec', code: 'TEC-RAJ-004', dist: ['Rajshahi', 'রাজশাহী'], div: ['Rajshahi', 'রাজশাহী'], students: '880', teachers: '60', att: 87.0 },
  { id: 'rupsha', n: ['Rupsha Textile Institute', 'রূপসা টেক্সটাইল ইনস্টিটিউট'], type: 'ti', code: 'TI-KHU-018', dist: ['Khulna', 'খুলনা'], div: ['Khulna', 'খুলনা'], students: '590', teachers: '34', att: 84.6 },
  { id: 'kirtankhola', n: ['Kirtankhola Textile Vocational Institute', 'কীর্তনখোলা টেক্সটাইল ভোকেশনাল ইনস্টিটিউট'], type: 'tvi', code: 'TVI-BAR-052', dist: ['Barishal', 'বরিশাল'], div: ['Barishal', 'বরিশাল'], students: '312', teachers: '19', att: 80.3 },
  { id: 'surma', n: ['Surma Textile Vocational Institute', 'সুরমা টেক্সটাইল ভোকেশনাল ইনস্টিটিউট'], type: 'tvi', code: 'TVI-SYL-031', dist: ['Sylhet', 'সিলেট'], div: ['Sylhet', 'সিলেট'], students: '386', teachers: '21', att: 68.9 },
  { id: 'teesta', n: ['Teesta Textile Vocational Institute', 'তিস্তা টেক্সটাইল ভোকেশনাল ইনস্টিটিউট'], type: 'tvi', code: 'TVI-RAN-047', dist: ['Rangpur', 'রংপুর'], div: ['Rangpur', 'রংপুর'], students: '402', teachers: '24', att: 87.9 },
  { id: 'brahmaputra', n: ['Brahmaputra Textile Institute', 'ব্রহ্মপুত্র টেক্সটাইল ইনস্টিটিউট'], type: 'ti', code: 'TI-MYM-025', dist: ['Mymensingh', 'ময়মনসিংহ'], div: ['Mymensingh', 'ময়মনসিংহ'], students: '655', teachers: '39', att: 85.8 },
  { id: 'shitalakshya', n: ['Shitalakshya Textile Institute', 'শীতলক্ষ্যা টেক্সটাইল ইনস্টিটিউট'], type: 'ti', code: 'TI-NAR-011', dist: ['Narayanganj', 'নারায়ণগঞ্জ'], div: ['Dhaka', 'ঢাকা'], students: '730', teachers: '44', att: 89.4 },
];
export const TYPES = { tec: ['Textile Engineering College', 'টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], ti: ['Textile Institute', 'টেক্সটাইল ইনস্টিটিউট'], tvi: ['Textile Vocational Institute', 'টেক্সটাইল ভোকেশনাল ইনস্টিটিউট'] };

export const SERVICES = [
  { icon: 'clipboard-list', l: ['Apply for admission', 'ভর্তির আবেদন'], s: ['Diploma 2026–27 · closes 20 Oct', 'ডিপ্লোমা ২০২৬–২৭ · শেষ ২০ অক্টোবর'], href: 'apply.html' },
  { icon: 'list-checks', l: ['Admission result', 'ভর্তির ফলাফল'], s: ['Published on 25 Nov 2026', '২৫ নভেম্বর ২০২৬ প্রকাশিত হবে'], href: 'admission-result.html' },
  { icon: 'route', l: ['Track application', 'আবেদনের অবস্থা'], s: ['With your application ID', 'আবেদন আইডি দিয়ে'], href: 'candidate-login.html' },
  { icon: 'shield-check', l: ['Verify a certificate', 'সনদ যাচাই'], s: ['By certificate number', 'সনদ নম্বর দিয়ে'], href: 'verify.html' },
  { icon: 'scan-search', l: ['Find an institution', 'প্রতিষ্ঠান খুঁজুন'], s: ['59 government institutions', '৫৯টি সরকারি প্রতিষ্ঠান'], href: 'institutions.html' },
  { icon: 'file-down', l: ['Forms and downloads', 'ফরম ও ডাউনলোড'], s: ['Guidelines, forms, circulars', 'নির্দেশিকা, ফরম, পরিপত্র'], href: 'help.html#downloads' },
  { icon: 'badge-check', l: ['Professional licence', 'পেশাগত লাইসেন্স'], s: ['Apply and track', 'আবেদন ও ট্র্যাক'], href: 'license.html' },
  { icon: 'building-2', l: ['Organisation verification', 'প্রতিষ্ঠানের যাচাই'], s: ['For employers (registration)', 'নিয়োগকর্তার জন্য (নিবন্ধন)'], href: 'verifier.html' },
];

export const BUDGET = [
  { inst: ['Karnaphuli Textile Institute', 'কর্ণফুলী টেক্সটাইল ইনস্টিটিউট'], alloc: 3.40, used: 2.18 },
  { inst: ['Bamni Textile Institute', 'বামনী টেক্সটাইল ইনস্টিটিউট'], alloc: 2.85, used: 1.92 },
  { inst: ['Buriganga Textile Engineering College', 'বুড়িগঙ্গা টেক্সটাইল ইঞ্জিনিয়ারিং কলেজ'], alloc: 6.20, used: 4.03 },
  { inst: ['Surma Textile Vocational Institute', 'সুরমা টেক্সটাইল ভোকেশনাল ইনস্টিটিউট'], alloc: 1.40, used: 0.71 },
  { inst: ['Rupsha Textile Institute', 'রূপসা টেক্সটাইল ইনস্টিটিউট'], alloc: 2.60, used: 1.74 },
];
export const EXPENSES = [
  { ref: 'EXP-2026-0311', d: '12 Oct 2026', head: ['Laboratory consumables', 'ল্যাবরেটরি ভোগ্যপণ্য'], amt: '86,400', by: ['Accounts section', 'হিসাব শাখা'] },
  { ref: 'EXP-2026-0306', d: '08 Oct 2026', head: ['Electricity bill — September', 'বিদ্যুৎ বিল — সেপ্টেম্বর'], amt: '1,42,850', by: ['Accounts section', 'হিসাব শাখা'] },
  { ref: 'EXP-2026-0298', d: '01 Oct 2026', head: ['Repair: ring frame RF-131', 'মেরামত: রিং ফ্রেম RF-131'], amt: '38,000', by: ['Workshop', 'ওয়ার্কশপ'] },
  { ref: 'EXP-2026-0287', d: '24 Sep 2026', head: ['Library books (120 titles)', 'লাইব্রেরি বই (১২০টি শিরোনাম)'], amt: '2,10,000', by: ['Library', 'লাইব্রেরি'] },
];
export const ASSETS = [
  { tag: 'KTI-LAB-0412', n: ['Rapier loom (demo unit)', 'র‍্যাপিয়ার লুম (ডেমো ইউনিট)'], loc: ['Weaving Lab 2', 'উইভিং ল্যাব ২'], holder: 'Arif Hossain', st: 'inuse' },
  { tag: 'KTI-LAB-0388', n: ['Ring frame RF-131', 'রিং ফ্রেম RF-131'], loc: ['Spinning Lab', 'স্পিনিং ল্যাব'], holder: 'Nusrat Jahan', st: 'inuse' },
  { tag: 'KTI-ICT-0217', n: ['Laptop (Dell Latitude)', 'ল্যাপটপ (ডেল ল্যাটিটিউড)'], loc: ['Accounts section', 'হিসাব শাখা'], holder: '—', st: 'available' },
  { tag: 'KTI-LAB-0251', n: ['GSM cutter', 'জিএসএম কাটার'], loc: ['Testing Lab', 'টেস্টিং ল্যাব'], holder: '—', st: 'damaged' },
  { tag: 'KTI-ICT-0198', n: ['Multimedia projector', 'মাল্টিমিডিয়া প্রজেক্টর'], loc: ['Room 204', 'কক্ষ ২০৪'], holder: '—', st: 'lost' },
];
export const BOOKS = [
  { id: 'LIB-00412', t: 'Principles of Weaving', a: 'R. Marks, A.T.C. Robinson', copies: 6, avail: 2 },
  { id: 'LIB-00388', t: 'Yarn Manufacturing Technology', a: 'Dr. M. A. Hossain', copies: 8, avail: 0 },
  { id: 'LIB-00517', t: 'Textile Testing and Analysis', a: 'B. J. Collier', copies: 4, avail: 3 },
  { id: 'LIB-00209', t: 'Dyeing and Chemical Technology of Textile Fibres', a: 'E. R. Trotman', copies: 5, avail: 1 },
];
export const USERS = [
  { n: 'Farhana Ahmed', e: 'farhana.ahmed@dot.gov.bd', roles: [['Ministry Super Admin', 'মন্ত্রণালয় সুপার অ্যাডমিন']], scope: ['National', 'জাতীয়'], st: 'active' },
  { n: 'Sharmin Akter', e: 'sharmin.akter@dot.gov.bd', roles: [['Division Admin', 'বিভাগীয় অ্যাডমিন']], scope: ['Chattogram Division', 'চট্টগ্রাম বিভাগ'], st: 'active' },
  { n: 'Mahmudul Hasan', e: 'mahmudul.hasan@dot.gov.bd', roles: [['District Admin', 'জেলা অ্যাডমিন']], scope: ['Chattogram District', 'চট্টগ্রাম জেলা'], st: 'active' },
  { n: 'Md. Saiful Islam', e: 'principal@kti.edu.bd', roles: [['Institution Admin', 'প্রতিষ্ঠান অ্যাডমিন'], ['Principal', 'অধ্যক্ষ']], scope: ['Karnaphuli Textile Institute', 'কর্ণফুলী টেক্সটাইল ইনস্টিটিউট'], st: 'active' },
  { n: 'Tanzila Rahman', e: 'tanzila.rahman@dot.gov.bd', roles: [], scope: ['— not assigned —', '— নির্ধারিত হয়নি —'], st: 'inactive' },
];
export const LICENSE_APPS = [
  { ref: 'LIC-APP-2026-00071', n: 'Sabbir Hossain', q: ['B.Sc. in Textile Engineering (2019)', 'বি.এসসি ইন টেক্সটাইল ইঞ্জিনিয়ারিং (২০১৯)'], d: '11 Oct 2026', st: 'review', flow: true },
  { ref: 'LIC-APP-2026-00068', n: 'Taslima Begum', q: ['Diploma in Textile Engineering (2016)', 'ডিপ্লোমা ইন টেক্সটাইল ইঞ্জিনিয়ারিং (২০১৬)'], d: '07 Oct 2026', st: 'returned' },
  { ref: 'LIC-APP-2026-00064', n: 'Kazi Anwar Hossain', q: ['B.Sc. in Textile Engineering (2012)', 'বি.এসসি ইন টেক্সটাইল ইঞ্জিনিয়ারিং (২০১২)'], d: '02 Oct 2026', st: 'approved' },
];
