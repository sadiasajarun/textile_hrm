// Teacher workspace (signed in through the Institution Portal).
import { t, tt, n, d, ta, icon, each, page, demo, tbd, st, a, act, field, alert, table, tabs, card, kpis, pageHead, when, timeline } from '../core.mjs';
import { TEACH, NOTICES, TODAY } from '../data.mjs';
import { flowBanner, noticeMini } from './ministry.mjs';

const P = (file, title, crumbs, body) => page({ file, title, kind: 'teacher', active: file, crumbs: [['Institution Portal', 'প্রতিষ্ঠান পোর্টাল'], ['Teacher', 'শিক্ষক'], ...crumbs], body });
const btnAct = (label, o, cls = 'btn-primary', ic = '') => `<button type="button" class="btn ${cls}" ${act(o)}>${ic ? icon(ic, 'ico ico-sm') : ''}${label}</button>`;
const now = TEACH.classes[1];

function dashboard() {
  const body = `${pageHead({ eyebrow: TODAY, title: t('Today, Arif', 'আজ, আরিফ'), sub: t('Karnaphuli Textile Institute · 3 classes today', 'কর্ণফুলী টেক্সটাইল ইনস্টিটিউট · আজ ৩টি ক্লাস') })}
  ${when('att=due', `<section class="f-welcome">${icon('user-check', 'ico ico-xl')}<div><p class="h-eyebrow h-eyebrow-inv">${t('Now · 11:00–12:30 · Room 204', 'এখন · ১১:০০–১২:৩০ · কক্ষ ২০৪')}</p><h2 class="h-h3">${t('Fabric Structure — Diploma Y2 · Sec B', 'ফেব্রিক স্ট্রাকচার — ডিপ্লোমা ২য় বর্ষ · সেকশন বি')}</h2><p>${t('Attendance is not taken yet for this class.', 'এই ক্লাসের হাজিরা এখনও নেওয়া হয়নি।')}</p></div>${a('teacher-attendance.html', t('Take attendance', 'হাজিরা নিন'), 'btn btn-white btn-lg')}</section>`)}
  ${when('att=submitted|correction|corrected', alert('ok', t('Attendance submitted for Diploma Y2 · Sec B at 11:05 (55 of 60 present).', 'ডিপ্লোমা ২য় বর্ষ · সেকশন বি-এর হাজিরা ১১:০৫-এ জমা হয়েছে (৬০ জনের ৫৫ জন উপস্থিত)।')))}
  <div class="f-grid">
    ${card(t('Today’s schedule', 'আজকের সময়সূচি'), table({ id: 'td-cls', compact: true, cols: [{ l: ['Time', 'সময়'] }, { l: ['Class / subject', 'ক্লাস / বিষয়'] }, { l: ['Room', 'কক্ষ'] }, { l: ['Attendance', 'হাজিরা'] }], rows: TEACH.classes.map((c) => ({ cells: [`<b>${n(c.time)}</b>–${n(c.end)}`, `<b>${tt(c.sub)}</b><small>${tt(c.c)}</small>`, tt(c.room), c.st === 'done' ? `${st('recorded')}<small>${n(`${c.p}/${c.t}`)}</small>` : c.st === 'now' ? `${when('att=due', a('teacher-attendance.html', t('Take now', 'এখন নিন'), 'btn btn-teal btn-sm'), 'span')}${when('att=submitted|correction|corrected', st('recorded'), 'span')}` : `<span class="tag tag-neutral">${t('Later today', 'আজ পরে')}</span>`] })) }), '', 'f-c7')}
    ${card(t('Tasks', 'কাজ'), `<ul class="f-actions-list">
      <li data-when="res=entry"><div><b>${t('Enter Semester 3 marks — Fabric Structure', 'সেমিস্টার ৩-এর নম্বর দিন — ফেব্রিক স্ট্রাকচার')}</b><small>${t('58 of 60 entered · due 20 Oct', '৬০ জনের ৫৮ জন · শেষ তারিখ ২০ অক্টোবর')}</small></div>${a('teacher-results.html', t('Continue', 'চালিয়ে যান'), 'btn btn-teal btn-sm')}</li>
      <li data-when="res=submitted"><div><b>${t('Marks submitted — waiting for the Principal', 'নম্বর জমা — অধ্যক্ষের অপেক্ষায়')}</b><small>${t('Fabric Structure · Semester 3', 'ফেব্রিক স্ট্রাকচার · সেমিস্টার ৩')}</small></div>${st('submitted')}</li>
      <li data-when="res=published|corrected"><div><b>${t('Results published — Fabric Structure', 'ফল প্রকাশিত — ফেব্রিক স্ট্রাকচার')}</b><small>${t('Semester 3', 'সেমিস্টার ৩')}</small></div>${st('published')}</li>
      <li><div><b>${t('Upload Week 7 material — Weaving I', 'সপ্তাহ ৭-এর উপকরণ আপলোড — উইভিং ১')}</b><small>${t('Students see it in their portal', 'শিক্ষার্থীরা পোর্টালে দেখবে')}</small></div>${a('teacher-classes.html', t('Upload', 'আপলোড'), 'btn btn-outline btn-sm')}</li></ul>`, '', 'f-c5')}
  </div>
  <div class="h-grid-3">
    ${card(t('Notices', 'নোটিশ'), noticeMini([NOTICES[4], NOTICES[2], NOTICES[6]]))}
    ${card(t('Leave balance', 'ছুটির হিসাব'), `<ul class="f-actions-list">${each(TEACH.leave, (l, i) => `<li><span>${tt(l.l)}</span><b>${i === 0 ? `${when('leave=approved', n(4), 'span')}${when('leave=none|pending|rejected|withdrawn', n(6), 'span')}` : n(l.total - l.used)} / ${n(l.total)}</b></li>`)}</ul>${a('teacher-leave.html', t('Apply for leave', 'ছুটির আবেদন'), 'h-arrow-link')}`)}
    ${card(t('Shortcuts', 'শর্টকাট'), `<div class="f-quick">${each([['teacher-attendance', 'user-check', ['Attendance', 'হাজিরা']], ['teacher-results', 'clipboard-check', ['Results', 'ফলাফল']], ['teacher-classes', 'upload', ['Materials', 'উপকরণ']], ['teacher-leave', 'calendar-plus', ['Leave', 'ছুটি']]], ([h, ic, l]) => `<a href="${h}.html">${icon(ic, 'ico ico-sm')}${tt(l)}</a>`)}</div>`)}
  </div>`;
  return P('teacher', ['Teacher dashboard', 'শিক্ষক ড্যাশবোর্ড'], [['Home', 'হোম']], body);
}

// ================= TAKE ATTENDANCE (Flow B start) =================
function attendance() {
  const body = `${pageHead({ eyebrow: TODAY, title: t('Take attendance', 'হাজিরা নিন'), sub: `${tt(now.sub)} · ${tt(now.c)} · ${n(now.time)}–${n(now.end)} · ${tt(now.room)}` })}
  ${when('att=due', `${alert('info', t('Attendance window: 11:00–12:45. Submissions after 11:30 are marked late.', 'হাজিরার সময়: ১১:০০–১২:৪৫। ১১:৩০-এর পরে জমা বিলম্বিত হিসেবে চিহ্নিত হবে।'))}
  <section class="h-card" data-att-scope data-total="60">
    <div class="h-reg-head"><b>${t('Register — 8 of 60 students shown', 'রেজিস্টার — ৬০ জনের ৮ জন দেখানো হয়েছে')}</b><span>${t('Present', 'উপস্থিত')} <b data-att-p>${n(5)}</b> · ${t('Absent', 'অনুপস্থিত')} <b data-att-a>${n(1)}</b> · ${t('Leave', 'ছুটি')} <b data-att-l>${n(1)}</b></span><button type="button" class="link" data-att-all>${t('Mark all present', 'সবাইকে উপস্থিত')}</button></div>
    <div class="f-table-wrap"><table class="f-table"><thead><tr><th>${t('Roll', 'রোল')}</th><th>${t('Student', 'শিক্ষার্থী')}</th><th>${t('Status', 'অবস্থা')}</th></tr></thead><tbody>
    ${each(TEACH.roster, (r) => `<tr data-att-row><td class="mono">${r.roll}</td><td>${r.name}</td><td><span class="h-pal" role="radiogroup" aria-label="${r.name}">${['P', 'A', 'L'].map((k) => `<label><input type="radio" name="t${r.roll}" value="${k}" ${r.s === k ? 'checked' : ''}><span>${k === 'P' ? t('P', 'উ') : k === 'A' ? t('A', 'অ') : t('L', 'ছু')}</span></label>`).join('')}</span></td></tr>`)}</tbody></table></div>
    <p class="f-chart-meta">${t('P = present, A = absent, L = leave. Absent students’ guardians receive an SMS.', 'উ = উপস্থিত, অ = অনুপস্থিত, ছু = ছুটি। অনুপস্থিত শিক্ষার্থীর অভিভাবক এসএমএস পাবেন।')}</p>
    <div class="f-btnrow"><button type="button" class="btn btn-primary btn-lg" data-att-submit ${act({ set: 'att=submitted' })}>${t('Submit attendance', 'হাজিরা জমা দিন')}</button>${btnAct(t('Save without submitting', 'জমা না দিয়ে সংরক্ষণ'), { set: '_=1', toast: ['Saved as draft. Not visible to the Principal yet.', 'খসড়া হিসেবে সংরক্ষিত। অধ্যক্ষ এখনও দেখতে পাবেন না।'] }, 'btn-outline')}</div>
  </section>`)}
  ${when('att=submitted|correction|corrected', `${flowBanner('B', t('Submitted at 11:05. The Principal, District, Division and Ministry views now include this class.', '১১:০৫-এ জমা হয়েছে। অধ্যক্ষ, জেলা, বিভাগ ও মন্ত্রণালয়ের দৃশ্যে এই ক্লাস যুক্ত হয়েছে।'), a('inst-attendance.html', t('Institution view', 'প্রতিষ্ঠানের দৃশ্য'), 'btn btn-outline btn-sm'))}
    ${card(t('Submitted register', 'জমাকৃত রেজিস্টার'), `<dl class="f-dl f-dl-4"><div><dt>${t('Present', 'উপস্থিত')}</dt><dd>${n(55)}</dd></div><div><dt>${t('Absent', 'অনুপস্থিত')}</dt><dd>${n(4)}</dd></div><div><dt>${t('Leave', 'ছুটি')}</dt><dd>${n(1)}</dd></div><div><dt>${t('Submitted', 'জমা')}</dt><dd>${n('11:05')} ${st('recorded')}</dd></div></dl>
      ${when('att=submitted', `<form class="h-form" data-flow ${act({ set: 'att=correction', toast: ['Correction request sent to the Principal.', 'অধ্যক্ষের কাছে সংশোধনের অনুরোধ পাঠানো হয়েছে।'] })} novalidate><h3>${t('Request a correction', 'সংশোধনের অনুরোধ')}</h3><div class="f-grid2">${field({ l: ['Student', 'শিক্ষার্থী'], name: 'cs', opts: [['2405', '2405 Tanvir Ahmed: Absent → Leave', '২৪০৫ তানভীর আহমেদ: অনুপস্থিত → ছুটি', true]] })}${field({ l: ['Reason', 'কারণ'], name: 'cr', req: true, value: 'Medical certificate submitted' })}</div><button type="submit" class="btn btn-outline">${t('Send correction request', 'সংশোধনের অনুরোধ পাঠান')}</button></form>`)}
      ${when('att=correction', alert('warn', t('Correction requested — waiting for the Principal.', 'সংশোধনের অনুরোধ — অধ্যক্ষের অপেক্ষায়।'), '', a('inst-attendance.html', t('Principal view', 'অধ্যক্ষের দৃশ্য'), 'btn btn-outline btn-sm')))}
      ${when('att=corrected', alert('ok', t('Correction approved at 11:40. Roll 2405 is now marked as leave.', '১১:৪০-এ সংশোধন অনুমোদিত। রোল ২৪০৫ এখন ছুটি হিসেবে চিহ্নিত।')))}`)}`)}
  ${card(t('My attendance', 'আমার হাজিরা'), `<dl class="f-kv"><dt>${t('Check-in', 'উপস্থিতি')}</dt><dd>${n('08:52')} ${st('recorded')}</dd><dt>${t('This month', 'এই মাস')}</dt><dd>${n('11 / 11')} ${t('working days', 'কর্মদিবস')}</dd></dl>`)}`;
  return P('teacher-attendance', ['Take attendance', 'হাজিরা নিন'], [['Attendance', 'হাজিরা']], body);
}

// ================= RESULT ENTRY (Flow C start) =================
function results() {
  const marks = [['2401', 'Mim Akter', '74'], ['2402', 'Rafiul Alam', '81'], ['2403', 'Sajid Rahman', ''], ['2404', 'Lamia Chowdhury', '68'], ['2405', 'Tanvir Ahmed', '59'], ['2417', 'Rakib Hasan', '']];
  const body = `${pageHead({ title: t('Result entry', 'ফলাফল এন্ট্রি'), sub: t('Fabric Structure · Diploma Y2 · Sec B · Semester 3 · maximum 100', 'ফেব্রিক স্ট্রাকচার · ডিপ্লোমা ২য় বর্ষ · সেকশন বি · সেমিস্টার ৩ · সর্বোচ্চ ১০০') })}
  ${when('res=entry', `<form class="h-card" data-flow ${act({ set: 'res=submitted', toast: ['Marks submitted to the Principal for validation.', 'যাচাইয়ের জন্য অধ্যক্ষের কাছে নম্বর জমা হয়েছে।'] })} novalidate>
    ${alert('info', t('58 of 60 marks entered. Enter the missing marks and submit.', '৬০ জনের ৫৮ জনের নম্বর দেওয়া হয়েছে। বাকি নম্বর দিয়ে জমা দিন।'), t('A mark above 100 or an empty mark blocks submission.', '১০০-এর বেশি বা ফাঁকা নম্বর থাকলে জমা দেওয়া যাবে না।'))}
    <div class="f-alert is-danger" data-form-error hidden role="alert">${icon('circle-alert', 'ico')}<div><b>${t('Fix the highlighted marks before submitting.', 'জমা দেওয়ার আগে চিহ্নিত নম্বর ঠিক করুন।')}</b></div></div>
    <div class="f-table-wrap"><table class="f-table"><thead><tr><th>${t('Roll', 'রোল')}</th><th>${t('Student', 'শিক্ষার্থী')}</th><th>${t('Mark (0–100)', 'নম্বর (০–১০০)')}</th></tr></thead><tbody>
    ${each(marks, ([r, nm, m]) => `<tr><td class="mono">${r}</td><td>${nm}</td><td><label class="fld f-mark"><span class="sr-only">${nm}</span><input name="m${r}" value="${m}" required inputmode="numeric" data-min="0" data-max="100" ${r === '2417' ? 'placeholder="—"' : ''}><span class="err" hidden>${t('Enter 0–100', '০–১০০ লিখুন')}</span></label></td></tr>`)}</tbody></table></div>
    <p class="f-chart-meta">${t('Showing 6 of 60 · Prototype: type 105 to see the validation error.', '৬০ জনের ৬ জন · প্রোটোটাইপ: ত্রুটি দেখতে ১০৫ লিখুন।')}</p>
    <div class="f-btnrow"><button type="submit" class="btn btn-primary">${t('Submit to Principal', 'অধ্যক্ষের কাছে জমা দিন')}</button>${btnAct(t('Save draft', 'খসড়া সংরক্ষণ'), { set: '_=1', toast: ['Draft saved.', 'খসড়া সংরক্ষিত।'] }, 'btn-outline')}</div></form>`)}
  ${when('res=submitted', `${flowBanner('C', t('Submitted. Waiting for the Principal to validate and publish.', 'জমা হয়েছে। অধ্যক্ষের যাচাই ও প্রকাশের অপেক্ষায়।'), a('inst-results.html', t('Principal view', 'অধ্যক্ষের দৃশ্য'), 'btn btn-outline btn-sm'))}`)}
  ${when('res=published|corrected', flowBanner('C', t('Published by the Principal. Students can see their results.', 'অধ্যক্ষ প্রকাশ করেছেন। শিক্ষার্থীরা ফল দেখতে পাচ্ছে।'), a('student-results.html', t('Student view', 'শিক্ষার্থীর দৃশ্য'), 'btn btn-outline btn-sm')))}
  ${card(t('Returned for correction', 'সংশোধনের জন্য ফেরত'), alert('warn', t('Weaving I (Semester 1): 2 marks exceed the maximum', 'উইভিং ১ (সেমিস্টার ১): ২টি নম্বর সর্বোচ্চের বেশি'), t('Returned by the Principal on 13 Oct. Correct rolls 2409 and 2412 (practical maximum 50).', '১৩ অক্টোবর অধ্যক্ষ ফেরত পাঠিয়েছেন। রোল ২৪০৯ ও ২৪১২ সংশোধন করুন (ব্যবহারিকের সর্বোচ্চ ৫০)।'), btnAct(t('Fix now', 'এখনই ঠিক করুন'), { set: '_=1', toast: ['Correction form for Weaving I opens here in production.', 'প্রোডাকশনে এখানে উইভিং ১-এর সংশোধন ফরম খুলবে।'] }, 'btn-outline btn-sm')))}`;
  return P('teacher-results', ['Result entry', 'ফলাফল এন্ট্রি'], [['Results', 'ফলাফল']], body);
}

function classes() {
  const body = `${pageHead({ title: t('My classes and materials', 'আমার ক্লাস ও উপকরণ'), sub: t('Classes assigned by the Principal. Materials appear in students’ portals.', 'অধ্যক্ষ কর্তৃক নির্ধারিত ক্লাস। উপকরণ শিক্ষার্থীদের পোর্টালে দেখা যায়।') })}
  <div class="f-grid">
    ${card(t('Assigned classes', 'নির্ধারিত ক্লাস'), table({ id: 'tc-cls', compact: true, cols: [{ l: ['Class', 'ক্লাস'] }, { l: ['Subject', 'বিষয়'] }, { l: ['Students', 'শিক্ষার্থী'], cls: 'num' }, { l: ['Materials', 'উপকরণ'], cls: 'num' }], rows: [[['Diploma Y2 · Sec B', 'ডিপ্লোমা ২য় বর্ষ · সেকশন বি'], ['Fabric Structure', 'ফেব্রিক স্ট্রাকচার'], 60, 12], [['Diploma Y1 · Sec B', 'ডিপ্লোমা ১ম বর্ষ · সেকশন বি'], ['Weaving I', 'উইভিং ১'], 62, 9], [['Diploma Y1 · Sec A', 'ডিপ্লোমা ১ম বর্ষ · সেকশন এ'], ['Weaving I (Lab)', 'উইভিং ১ (ল্যাব)'], 64, 6]].map((r) => ({ cells: [tt(r[0]), tt(r[1]), n(r[2]), n(r[3])] })) }), '', 'f-c7')}
    <form class="h-card h-form f-c5" data-flow ${act({ set: '_=1', toast: ['Material uploaded. 62 students notified.', 'উপকরণ আপলোড হয়েছে। ৬২ জন শিক্ষার্থীকে জানানো হয়েছে।'] })} novalidate><h2 class="h-h3">${t('Upload class material', 'ক্লাসের উপকরণ আপলোড')}</h2>
      ${field({ l: ['Class', 'ক্লাস'], name: 'mc', opts: [['y1b', 'Diploma Y1 · Sec B — Weaving I', 'ডিপ্লোমা ১ম বর্ষ · সেকশন বি — উইভিং ১', true], ['y2b', 'Diploma Y2 · Sec B — Fabric Structure', 'ডিপ্লোমা ২য় বর্ষ · সেকশন বি — ফেব্রিক স্ট্রাকচার']] })}${field({ l: ['Title', 'শিরোনাম'], name: 'mt', req: true, value: 'Week 7 — Dobby shedding (lecture notes)' })}
      ${field({ l: ['File (PDF, PPT or video link; max 20 MB)', 'ফাইল (পিডিএফ, পিপিটি বা ভিডিও লিংক; সর্বোচ্চ ২০ এমবি)'], name: 'mf', type: 'file', req: true, attrs: 'accept=".pdf,.ppt,.pptx" data-max-kb="20480"' })}
      <button type="submit" class="btn btn-primary">${t('Upload', 'আপলোড')}</button></form>
  </div>`;
  return P('teacher-classes', ['My classes', 'আমার ক্লাস'], [['My classes', 'আমার ক্লাস']], body);
}

// ================= LEAVE (Flow H start) =================
function leave() {
  const body = `${pageHead({ title: t('Leave', 'ছুটি'), sub: t('Apply for leave and track approval. The Principal approves.', 'ছুটির আবেদন ও অনুমোদন ট্র্যাক করুন। অধ্যক্ষ অনুমোদন দেন।') })}
  ${kpis(TEACH.leave.map((l, i) => ({ l: l.l, raw: i === 0 ? `${when('leave=approved', n(4), 'span')}${when('leave=none|pending|rejected|withdrawn', n(6), 'span')}` : n(l.total - l.used), s: [`days left of ${l.total}`, `${l.total} দিনের মধ্যে বাকি`] })))}
  ${when('leave=none|rejected|withdrawn', `<form class="h-card h-form" data-flow ${act({ set: 'leave=pending', toast: ['Leave application LV-2026-0231 sent to the Principal.', 'ছুটির আবেদন LV-2026-0231 অধ্যক্ষের কাছে পাঠানো হয়েছে।'] })} novalidate><h2 class="h-h3">${t('Apply for leave', 'ছুটির আবেদন')}</h2>
    ${when('leave=rejected', alert('danger', t('Your previous application was rejected.', 'আপনার আগের আবেদন প্রত্যাখ্যাত হয়েছে।'), t('Reason: classes cannot be covered on those dates. You can apply for other dates.', 'কারণ: ওই তারিখে ক্লাস নেওয়ার বিকল্প নেই। অন্য তারিখে আবেদন করতে পারেন।')))}
    <div class="f-grid2">${field({ l: ['Leave type', 'ছুটির ধরন'], name: 'lt', opts: [['cl', 'Casual leave (6 days left)', 'নৈমিত্তিক ছুটি (৬ দিন বাকি)', true], ['sl', 'Sick leave (9 days left)', 'অসুস্থতাজনিত ছুটি (৯ দিন বাকি)'], ['el', 'Earned leave (22 days left)', 'অর্জিত ছুটি (২২ দিন বাকি)']] })}${field({ l: ['Number of days', 'দিনের সংখ্যা'], name: 'ln', req: true, value: '2', attrs: 'data-min="1" data-max="6" inputmode="numeric"', hint: ['More than the balance (6) is not allowed.', 'হিসাবের (৬) বেশি অনুমোদিত নয়।'] })}
    ${field({ l: ['From', 'থেকে'], name: 'lf', type: 'date', req: true, value: '2026-10-27', attrs: 'data-pattern="^(?!2026-10-17$).+"', hint: ['17 Oct overlaps your approved leave — choose another date to see the overlap check.', '১৭ অক্টোবর আপনার অনুমোদিত ছুটির সাথে মিলে যায় — ওভারল্যাপ যাচাই দেখতে এটি বাছুন।'] })}${field({ l: ['Classes covered by', 'বিকল্প শিক্ষক'], name: 'lc', opts: [['nj', 'Nusrat Jahan', 'নুসরাত জাহান', true], ['sk', 'Shahidul Karim', 'শহিদুল করিম']] })}</div>
    ${field({ l: ['Reason', 'কারণ'], name: 'lr', rows: 2, req: true, value: 'Family programme' })}<button type="submit" class="btn btn-primary">${t('Submit application', 'আবেদন জমা দিন')}</button></form>`)}
  ${when('leave=pending|approved', card(t('LV-2026-0231 — Casual leave, 27–28 Oct 2026 (2 days)', 'LV-2026-0231 — নৈমিত্তিক ছুটি, ২৭–২৮ অক্টোবর ২০২৬ (২ দিন)'), `${timeline([{ l: ['Applied', 'আবেদন'], who: ['Arif Hossain', 'আরিফ হোসেন'], st: 'done' }, { l: ['Principal review', 'অধ্যক্ষের পর্যালোচনা'], who: ['Md. Saiful Islam', 'মোঃ সাইফুল ইসলাম'], st: 'now', when_: 'leave=pending' }, { l: ['Approved — balance updated (CL 4 left)', 'অনুমোদিত — হিসাব হালনাগাদ (নৈমিত্তিক ৪ দিন বাকি)'], who: ['Md. Saiful Islam', 'মোঃ সাইফুল ইসলাম'], st: 'done', when_: 'leave=approved' }])}
    ${when('leave=pending', `<div class="f-btnrow">${a('inst-leave.html', t('Open as Principal (prototype)', 'অধ্যক্ষ হিসেবে খুলুন (প্রোটোটাইপ)'), 'btn btn-outline')}${btnAct(t('Withdraw application', 'আবেদন প্রত্যাহার'), { set: 'leave=withdrawn', confirm: ['Withdraw LV-2026-0231?', 'LV-2026-0231 প্রত্যাহার করবেন?'], toast: ['Application withdrawn.', 'আবেদন প্রত্যাহার করা হয়েছে।'] }, 'btn-ghost')}</div>`)}
    ${when('leave=approved', flowBanner('H', t('Approved. Casual leave balance is now 4 days.', 'অনুমোদিত। নৈমিত্তিক ছুটির হিসাব এখন ৪ দিন।')))}`))}
  ${card(t('Leave history', 'ছুটির ইতিহাস'), table({ id: 'tl-h', compact: true, cols: [{ l: ['Dates', 'তারিখ'] }, { l: ['Type', 'ধরন'] }, { l: ['Days', 'দিন'], cls: 'num' }, { l: ['Status', 'অবস্থা'] }], rows: [['17 Oct 2026', ['Casual leave', 'নৈমিত্তিক ছুটি'], 1, 'approved'], ['02–06 Jul 2026', ['Sick leave', 'অসুস্থতাজনিত ছুটি'], 5, 'approved']].map((r) => ({ cells: [d(r[0]), tt(r[1]), n(r[2]), st(r[3])] })) }))}`;
  return P('teacher-leave', ['Leave', 'ছুটি'], [['Leave', 'ছুটি']], body);
}

export default { teacher: dashboard, 'teacher-attendance': attendance, 'teacher-results': results, 'teacher-classes': classes, 'teacher-leave': leave };
