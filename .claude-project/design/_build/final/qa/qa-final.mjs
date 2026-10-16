// Light QA for the final prototype (Variation H): flows A–J, page errors, overflow at 1440/390, Bangla screenshots.
// Run (Node 18+, playwright-core and a Chromium build available):
//   cd .claude-project/design && python3 -m http.server 8765 --bind 127.0.0.1 &
//   CHROME=/path/to/chrome node _build/final/qa/qa-final.mjs /tmp/qa-final-out
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PROTO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'prototype');
const BASE = process.env.BASE || 'http://127.0.0.1:8765/prototype/';
const OUT = process.argv[2] || './qa-final-out';
fs.mkdirSync(OUT, { recursive: true });
const TINY = path.join(OUT, 'tiny.pdf'); fs.writeFileSync(TINY, '%PDF-1.4\n%demo\n');
const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(`${page.url().split('/').pop()}: ${e.message}`));
page.on('console', (m) => { if (m.type() === 'error') errors.push(`${page.url().split('/').pop()}: console ${m.text()}`); });

const log = []; let fails = 0;
const ok = (c, msg) => { log.push(`${c ? 'PASS' : 'FAIL'}  ${msg}`); if (!c) fails++; };
const go = async (f) => { await page.goto(BASE + f); await page.waitForFunction(() => document.documentElement.classList.contains('ts-ready')); };
const state = () => page.evaluate(() => window.timsState.get());
const reset = async () => { await go('prototype-index.html'); await page.evaluate(() => window.timsState.reset()); };

async function fillAndSubmit(form) {
  for (const inp of await form.locator('input[type=file]').all()) await inp.setInputFiles(TINY);
  for (const cb of await form.locator('input[type=checkbox][required]').all()) await cb.evaluate((n) => { n.checked = true; });
  for (const inp of await form.locator('input[required]:not([type=file]):not([type=checkbox])').all()) if (!(await inp.inputValue())) await inp.evaluate((n) => { n.value = '60'; });
  if (await form.getAttribute('data-stepper') !== null) {
    for (let i = 0; i < 8; i++) {
      const nx = form.locator('[data-step-next] >> visible=true');
      if (!(await nx.count())) break;
      await nx.first().click(); await page.waitForTimeout(80);
    }
  }
  await form.locator('[type=submit] >> visible=true').first().click();
}

/** Perform the UI action that sets key=val on the current page, then check state. */
async function doSet(file, kv, { confirm = true } = {}) {
  if (file) await go(file);
  const el = page.locator(`[data-set="${kv}"] >> visible=true`).first();
  if (!(await el.count())) { ok(false, `${file || page.url().split('/').pop()}: control for ${kv} not visible`); return; }
  const tag = await el.evaluate((n) => n.tagName);
  if (tag === 'FORM') await fillAndSubmit(el); else await el.click();
  if (confirm && (await page.locator('#dlg-confirm[open]').count())) await page.locator('[data-confirm-ok]').click();
  await page.waitForTimeout(900);
  const [k, v] = kv.split('=');
  const s = await state();
  ok(s[k] === v, `${file || ''} → ${kv} (state ${k}=${s[k]})`);
}
async function visibleText(file, text) {
  if (file) await go(file);
  const n = await page.locator(`text=${text} >> visible=true`).count();
  ok(n > 0, `${file || page.url().split('/').pop()}: shows “${text}”`);
}

// ---------- flows ----------
await reset();
// A
await doSet('apply.html', 'cand=submitted'); await doSet('candidate.html', 'cand=paid'); await doSet(null, 'cand=selected'); await doSet(null, 'cand=admitted');
await visibleText('student.html?new=1', 'KTI-2026-0153');
// B
await doSet('teacher-attendance.html', 'att=submitted');
for (const f of ['inst-attendance.html', 'district.html', 'division.html', 'ministry-attendance.html']) { await go(f); ok(true, `B: opened ${f}`); }
// C
await doSet('teacher-results.html', 'res=submitted'); await doSet('inst-results.html', 'res=published'); await go('student-results.html'); ok(true, 'C: opened student-results.html');
// D
await doSet('student-services.html', 'req=submitted'); await doSet('inst-requests.html', 'req=returned'); await doSet('student-request.html', 'req=resubmitted');
await doSet('inst-requests.html', 'req=approved'); await doSet(null, 'req=completed');
// E
await doSet('ministry-budget.html', 'bud=allocated'); await doSet('inst-finance.html', 'exp=recorded'); await go('ministry-budget.html#utilisation'); ok(true, 'E: opened utilisation');
// F
await doSet('ministry-assets.html', 'asset=received'); await doSet('inst-assets.html', 'asset=assigned'); await doSet(null, 'asset=transferred');
// G
await doSet('inst-procurement.html', 'proc=submitted'); await doSet('district-approvals.html', 'proc=dforward');
await doSet('division-approvals.html', 'proc=drec'); await doSet('ministry-approvals.html', 'proc=approved');
await doSet('inst-procurement.html', 'proc=po'); await doSet(null, 'proc=lc'); await doSet(null, 'proc=received'); await doSet(null, 'proc=gatepass');
// H
await doSet('teacher-leave.html', 'leave=pending'); await doSet('inst-leave.html', 'leave=approved'); await go('teacher-leave.html'); ok(true, 'H: opened teacher-leave.html');
// I
await doSet('student-certificate.html', 'cert=applied'); await doSet('inst-certificates.html', 'cert=issued'); await doSet(null, 'cert=alumni'); await go('alumni.html'); ok(true, 'I: opened alumni.html');

// Login page: Student and Teacher tabs, Government Portals, header button
await go('index.html'); ok((await page.locator('.f-login-btn').innerText()).trim().startsWith('Login') && (await page.locator('.f-login-btn').getAttribute('href')) === 'login.html', 'header button reads "Login" and opens login.html');
await go('login.html'); await page.locator('#pan-student form [type=submit]').click(); await page.waitForURL('**/student.html'); ok(true, 'Login → Student signs in to student.html');
await go('login.html#teacher'); await page.waitForTimeout(150); ok(await page.locator('#tab-teacher[aria-selected="true"]').count() === 1, 'login.html#teacher opens the Teacher tab');
await page.fill('#pan-teacher input[name=p]', 'wrong'); await page.locator('#pan-teacher form [type=submit]').click(); await page.waitForTimeout(150);
ok(await page.locator('#pan-teacher [data-login-error]').isVisible(), 'Teacher login: wrong password shows the error');
await page.fill('#pan-teacher input[name=p]', 'demo-pass'); await page.locator('#pan-teacher form [type=submit]').click(); await page.waitForURL('**/teacher.html'); ok(true, 'Login → Teacher signs in to teacher.html');
await go('login.html'); ok(await page.locator('#portals .f-gp').count() === 4, 'login page lists the 4 Government Portals');
// Division / District: own pages in their own portal shell
for (const lvl of ['division', 'district']) {
  for (const f of ['admissions', 'resources', 'approvals', 'reports']) {
    await go(`${lvl}-${f}.html`);
    ok((await page.locator('.h-side-brand small').innerText()).includes(lvl === 'division' ? 'Division Portal' : 'District Portal'), `${lvl}-${f}.html opens in the ${lvl} portal`);
  }
  await go(`${lvl}.html`); ok((await page.locator(`.h-side a[href="${lvl}-reports.html"]`).count()) === 1, `${lvl} menu "Reports" opens ${lvl}-reports.html`);
}
await doSet('district-reports.html', 'rrep=ready'); await visibleText(null, 'Attendance summary — Chattogram District');

// J — happy path
await doSet('license-apply.html', 'lic=submitted');
ok(page.url().endsWith('license-track.html'), `J: after submit lands on license-track (${page.url().split('/').pop()})`);
await visibleText(null, 'Document and eligibility check');
await go('ministry-licenses.html'); await page.screenshot({ path: `${OUT}/J-ministry-review-1440.png`, fullPage: true });
await doSet(null, 'lic=issued');
await visibleText('license-track.html', 'TX-LIC-2026-000418');
await go('verifier.html'); ok(await page.locator('text=Register your organisation to verify licences >> visible=true').count() > 0, 'J: verifier asks to register when org=none');
await doSet('verifier-register.html', 'org=registered');
ok(page.url().endsWith('verifier.html'), 'J: registration lands on verifier.html');
await page.locator('#lv-box button[type=submit]').click();
ok(await page.locator('[data-lookup-res="locked"]').isVisible(), 'J: search locked before payment');
await doSet(null, 'orgpaid=failed'); await visibleText(null, 'Payment failed');
await doSet(null, 'orgpaid=yes');
await page.locator('#lv-box button[type=submit]').click(); await page.waitForTimeout(200);
ok(await page.locator('[data-lookup-res="v418"] >> text=Valid licence').isVisible(), 'J: TX-LIC-2026-000418 verifies as valid after issue');
for (const [num, res, txt] of [['TX-LIC-2024-000102', 'expired', 'Licence expired'], ['TX-LIC-2023-000057', 'revoked', 'Licence revoked'], ['XX-123', 'none', 'No record found'], ['cert-2025-00481', 'cert', 'Valid certificate']]) {
  await page.fill('#lv-box input[name=q]', num); await page.locator('#lv-box button[type=submit]').click(); await page.waitForTimeout(150);
  ok(await page.locator(`[data-lookup-res="${res}"] >> text=${txt}`).isVisible(), `J: ${num} → ${txt}`);
}
ok((await state()).orgchk === '1', 'J: usage history row recorded after a search');
await page.screenshot({ path: `${OUT}/J-verifier-1440.png`, fullPage: true });

// J — edge cases
await reset();
await go('license-track.html'); await page.locator('#lt-box button[type=submit]').click(); await page.waitForTimeout(150);
ok(await page.locator('[data-lookup-res="mine"] >> text=No submitted application').isVisible(), 'J edge: tracking before submit says no submitted application');
await page.fill('#lt-box input[name=ref]', 'LIC-APP-2026-99999'); await page.locator('#lt-box button[type=submit]').click(); await page.waitForTimeout(150);
ok(await page.locator('[data-lookup-res="none"]').isVisible(), 'J edge: unknown reference → not found');
await go('license-apply.html'); await page.fill('input[name=nid]', '1990123456789'); await page.locator('[data-step-next] >> visible=true').first().click(); await page.waitForTimeout(100);
ok(await page.locator('text=If this NID already has a licence application >> visible=true').count() > 0, 'J edge: duplicate NID blocks step 1');
await page.fill('input[name=nid]', '19921512345678901'); await page.locator('[data-step-next] >> visible=true').first().click();
await page.locator('[data-step-next] >> visible=true').first().click(); await page.waitForTimeout(100);
await page.locator('[data-step-next] >> visible=true').first().click(); await page.waitForTimeout(100);
ok(await page.locator('fieldset[data-step="2"]').isVisible(), 'J edge: missing documents keep the user on the documents step');
await go('verifier-register.html'); await page.fill('input[name=trade]', 'TRAD/DNCC/2019/004512'); await page.locator('form[data-flow] .btn-teal[type=submit]').click(); await page.waitForTimeout(150);
ok(await page.locator('text=may already be registered >> visible=true').count() > 0, 'J edge: duplicate trade licence is rejected');
await doSet('license-apply.html', 'lic=submitted'); await doSet('ministry-licenses.html', 'lic=returned');
await go('license-track.html'); await page.screenshot({ path: `${OUT}/J-track-returned-1440.png`, fullPage: true });
await doSet(null, 'lic=submitted');
await doSet('ministry-licenses.html', 'lic=rejected'); await visibleText('license-track.html', 'Your application was rejected.');
await visibleText('license-apply.html', 'Your previous application was rejected.');
await page.evaluate(() => window.timsState.set('lic=issued')); await visibleText('license-apply.html', 'You have already submitted a licence application');

// ---------- Fix round 1 (FINAL_E2E_QA_REPORT QA-01 … QA-20): one check per fix ----------
const setS = async (kv) => { await go('prototype-index.html'); await page.evaluate((x) => { window.timsState.reset(); if (x) window.timsState.set(x); }, kv); };
const vis = async (sel) => page.locator(`${sel} >> visible=true`).count();
const h = async (sel) => page.locator(sel).first().evaluate((el) => el.getBoundingClientRect().height);
// QA-01 CERT-2026-00512 verifiable after issue (public + organisation search), not before
await setS('cert=none'); await go('verify.html'); await page.fill('form[data-lookup="cert-verify"] input[name=c]', 'CERT-2026-00512'); await page.locator('form[data-lookup="cert-verify"] [type=submit]').click(); await page.waitForTimeout(150);
ok(await vis('[data-lookup-res="c512"] >> text=No record found') > 0, 'QA-01 verify.html: CERT-2026-00512 not found before issue');
await setS('cert=issued'); await go('verify.html'); await page.fill('form[data-lookup="cert-verify"] input[name=c]', 'CERT-2026-00512'); await page.locator('form[data-lookup="cert-verify"] [type=submit]').click(); await page.waitForTimeout(150);
ok(await vis('[data-lookup-res="c512"] >> text=Valid certificate') > 0, 'QA-01 verify.html: CERT-2026-00512 valid after the Principal issues it');
await setS('cert=alumni;org=registered;orgpaid=yes'); await go('verifier.html'); await page.fill('#lv-box input[name=q]', 'CERT-2026-00512'); await page.locator('#lv-box button[type=submit]').click(); await page.waitForTimeout(150);
ok(await vis('[data-lookup-res="c512"] >> text=Valid certificate') > 0, 'QA-01 verifier.html: CERT-2026-00512 valid for a paid organisation');
// QA-02 budgets in crore
for (const lvl of ['division', 'district']) { await go(`${lvl}-resources.html`); const k = await page.locator('.f-kpis').first().innerText(); ok(/cr\b/.test(k) && !/lakh/i.test(k), `QA-02 ${lvl}-resources: KPIs in ৳ crore`); }
// QA-03 demo label in every workspace
await setS('');
const noDemo = [];
for (const f of fs.readdirSync(PROTO).filter((x) => x.endsWith('.html'))) { await page.goto(BASE + f); if (await page.locator('.h-side').count() && !(await page.locator('[data-demo-label]').count())) noDemo.push(f); }
ok(noDemo.length === 0, `QA-03 every workspace page carries the Demo / Illustrative Data label (${noDemo.join(', ') || 'all'})`);
// QA-04 request history follows the req state; dashboard rows open their tracking views
await setS('req=returned'); await go('student-services.html');
ok(await vis('#my-req tr[data-req-row]') === 1 && (await page.locator('#my-req tr[data-req-row] >> visible=true').innerText()).includes('Correction required'), 'QA-04 Online services: SR-2026-01512 shows "Correction required" when returned');
ok((await page.locator('[data-table-count="my-req"] .l-en').innerText()).trim() === String(await vis('#my-req tbody tr')), 'QA-04 record count matches the rows shown for the current state');
await page.selectOption('select[data-table-status="my-req"]', 'completed'); await page.waitForTimeout(100);
ok(await vis('#my-req tbody tr') === 1, 'QA-04 status filter: Completed shows only SR-2026-01310');
await go('student.html'); ok(await page.locator('.f-req-links a[href="student-request.html?id=01467"]').count() === 1 && await page.locator('.f-req-links a[href="student-request.html"]').count() === 1, 'QA-04 dashboard "My requests" rows link to tracking');
await go('student-request.html?id=01467'); ok((await page.locator('h1 >> visible=true').first().innerText()).includes('SR-2026-01467') && await page.locator('.h-side a[aria-current="page"][href="student-services.html"]').count() === 1, 'QA-04 student-request.html?id=01467 opens its view with Online services active');
// QA-05 dashboards show waiting items by flow state
await setS('proc=submitted'); await visibleText('district.html', 'is waiting for your review');
await setS('proc=dforward'); await visibleText('division.html', 'waiting for your recommendation');
await setS('lic=submitted'); await visibleText('ministry.html', 'LIC-APP-2026-00071');
await setS(''); await go('district.html'); ok(await vis('text=is waiting for your review') === 0, 'QA-05 district.html: no waiting item before the institution submits');
// QA-06 MG-2026-221 follows the Ministry decision
for (const lvl of ['division', 'district']) {
  await setS('mig=pending'); await go(`${lvl}-admissions.html`); const btnN = await vis(`#${lvl}-mig button.btn-teal`);
  await setS('mig=approved'); await go(`${lvl}-admissions.html`);
  ok(btnN === 1 && await vis(`#${lvl}-mig button.btn-teal`) === 0 && (await page.locator(`#${lvl}-mig tbody tr`).first().innerText()).includes('Approved by the Ministry'), `QA-06 ${lvl}-admissions: MG-2026-221 shows the Ministry approval`);
}
// QA-07 Approvals badge = rows shown
for (const [kv, lvl, nExp] of [['', 'division', 2], ['proc=dforward', 'division', 3], ['', 'district', 2], ['proc=submitted', 'district', 3], ['mig=approved', 'district', 1]]) {
  await setS(kv); await go(`${lvl}-approvals.html`);
  const badge = (await page.locator(`.h-side a[href="${lvl}-approvals.html"] .h-side-count`).innerText()).trim();
  const rows = await vis(`#${lvl}-appr tbody tr`);
  ok(badge === String(nExp) && rows === nExp, `QA-07 ${lvl} (${kv || 'default'}): badge ${badge} = ${rows} rows`);
}
// QA-08 Teacher breadcrumb matches the menu (D-1)
await setS(''); await go('teacher.html'); ok((await page.locator('.h-crumb-app').innerText()).trim().startsWith('Teacher workspace'), 'QA-08 teacher breadcrumb starts with "Teacher workspace"');
// QA-09 alumni locked before marking
await setS('cert=issued'); await go('alumni.html'); ok(await vis('.f-alumni-locked') === 1 && await vis('form[data-flow]') === 0, 'QA-09 alumni.html: locked before the Principal marks alumni');
await setS('cert=alumni'); await go('alumni.html'); ok(await vis('.f-alumni-locked') === 0 && await vis('form[data-flow]') === 1, 'QA-09 alumni.html: profile form after marking');
// QA-10 verifier heading
await setS(''); await go('verifier.html'); ok(await vis('h1') === 1 && (await page.locator('h1 >> visible=true').innerText()).includes('Register your organisation'), 'QA-10 verifier.html (org=none): one visible h1');
// QA-11 duplicate ids
await go('student-payment.html'); const dup = await page.evaluate(() => { const c = {}; document.querySelectorAll('[id]').forEach((e) => { c[e.id] = (c[e.id] || 0) + 1; }); return Object.keys(c).filter((k) => c[k] > 1); });
ok(dup.length === 0, `QA-11 student-payment.html: no duplicate ids (${dup.join(', ') || 'none'})`);
// QA-12 touch targets
await go('index.html'); ok(await h('.f-lang button') >= 44, 'QA-12 public language switch ≥ 44 px'); ok(await h('.f-hero-ctl .h-dot') >= 24, 'QA-12 hero dots ≥ 24 px');
await go('portal-ministry.html'); ok(await h('.h-lang-dark button') >= 44, 'QA-12 portal sign-in language switch ≥ 44 px');
await go('login.html'); ok(await h('#pan-student button.link') >= 24, 'QA-12 "Forgot password?" ≥ 24 px');
await go('teacher-attendance.html'); ok(await h('[data-att-all]') >= 24, 'QA-12 "Mark all present" ≥ 24 px');
// QA-13 new admissions count
await setS('cand=admitted'); await go('inst-students.html'); ok((await page.locator('#tab-new .f-count >> visible=true').innerText()).trim() === '1', 'QA-13 inst-students: "New admissions" tab shows 1 when admitted');
await setS(''); await go('inst-students.html'); ok(await vis('#tab-new .f-count') === 0, 'QA-13 inst-students: no count before admission');
// QA-14 teacher library + assign students
await go('teacher.html'); ok(await page.locator('.h-side a[href="teacher-classes.html#library"]').count() === 1, 'QA-14a teacher menu links the library catalogue');
await go('teacher-classes.html'); ok(await page.locator('#tc-lib tbody tr').count() > 0, 'QA-14a teacher-classes: library catalogue table');
ok(await vis('#tc-cls button >> text=Assign students') === 3 && await page.locator('.h-card:has(#tc-cls) .f-tbd').count() > 0, 'QA-14b teacher-classes: "Assign students" with TBD approval note');
// QA-15 / QA-16 / QA-17 responsive
await page.setViewportSize({ width: 390, height: 900 });
await go('institutions.html'); ok(await page.locator('#inst-dir').evaluate((tb) => { const w = tb.closest('.f-table-wrap'); return w.scrollWidth - w.clientWidth; }) <= 1, 'QA-15 institutions.html @390: directory fits without sideways scroll');
await go('index.html'); ok(await page.locator('.f-band-in > div:last-child').evaluate((el) => el.getBoundingClientRect().width > el.previousElementSibling.getBoundingClientRect().width * 1.5), 'QA-17 index.html @390: fifth count spans the row');
await page.setViewportSize({ width: 1440, height: 900 });
for (const lvl of ['division', 'district']) { await go(`${lvl}-resources.html`); ok(await page.locator('.f-kpis li b').evaluateAll((bs) => bs.every((el) => el.getBoundingClientRect().height <= parseFloat(getComputedStyle(el).lineHeight) * 1.4)), `QA-16 ${lvl}-resources @1440: KPI values on one line`); }
// QA-18 TBD / proposal labels
await go('ministry.html'); ok(await page.locator('#dlg-widgets .f-tbd').count() === 1, 'QA-18 ministry.html Customise dialog: widgets per role TBD');
await go('inst-library.html'); await visibleText(null, 'Proposed — for client sign-off');
await go('student-academics.html'); await visibleText(null, 'Course Advising Table');
await go('ministry-users.html'); ok(await page.locator('#pan-roles .f-tbd').count() >= 1 && await page.locator('#pan-assign .f-tbd').count() === 2, 'QA-18 ministry-users: Institution Admin / Principal labelled TBD (D-2)');
// QA-19 / QA-20 optional polish
await go('notices.html'); ok(await page.locator('.h-rows li[data-urgent="1"]').first().evaluate((li) => getComputedStyle(li).boxShadow !== 'none'), 'QA-19 notices.html: urgent rows have a red accent');
await visibleText('officials.html', 'to be published by the Department of Textiles');
// Changed pages: screenshots at 1440 / 1024 / 390 (default state + flow states)
fs.mkdirSync(`${OUT}/fix1`, { recursive: true });
const CHANGED = ['verify', 'verifier', 'division', 'district', 'ministry', 'division-resources', 'district-resources', 'division-admissions', 'district-admissions', 'division-approvals', 'district-approvals', 'student', 'student-services', 'student-request', 'student-payment', 'student-academics', 'alumni', 'teacher', 'teacher-classes', 'teacher-attendance', 'inst-students', 'inst-library', 'ministry-users', 'institutions', 'index', 'login', 'candidate-login', 'notices', 'officials'];
const fixOverflow = [];
for (const [tag, kv] of [['default', ''], ['flow', 'proc=submitted;lic=submitted;cert=alumni;cand=admitted;req=returned;mig=approved']]) {
  await setS(kv);
  for (const w of [1440, 1024, 390]) {
    await page.setViewportSize({ width: w, height: 900 });
    for (const f of CHANGED) {
      await page.goto(BASE + f + '.html'); await page.waitForTimeout(80);
      const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (o > 1) fixOverflow.push(`${tag} ${w}px ${f}: +${o}px`);
      await page.screenshot({ path: `${OUT}/fix1/${f}-${tag}-${w}.png`, fullPage: true });
    }
  }
}
ok(fixOverflow.length === 0, `Fix round 1: changed pages have no sideways overflow at 1440/1024/390 (${fixOverflow.join('; ') || 'none'})`);
await page.setViewportSize({ width: 1440, height: 900 });
await setS('');

// ---------- every page: errors + overflow at 1440 and 390 ----------
const files = fs.readdirSync(PROTO).filter((f) => f.endsWith('.html'));
const overflow = [];
for (const w of [1440, 390]) {
  await page.setViewportSize({ width: w, height: 900 });
  for (const f of files) {
    await page.goto(BASE + f); await page.waitForTimeout(60);
    const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (o > 1) overflow.push(`${w}px ${f}: +${o}px`);
  }
}
ok(overflow.length === 0, `no horizontal page overflow at 1440/390 (${overflow.length} issues)`);

// ---------- screenshots: licence pages at 1440 + 390, Bangla on a few pages ----------
await page.evaluate(() => { window.timsState.reset(); window.timsState.set('lic=issued;org=registered;orgpaid=yes'); });
for (const w of [1440, 390]) {
  await page.setViewportSize({ width: w, height: 900 });
  for (const f of ['login', 'license', 'license-apply', 'license-track', 'ministry-licenses', 'verifier-register', 'verifier', 'prototype-index', 'index', 'division-approvals', 'district-resources', 'division-admissions']) {
    await page.goto(BASE + f + '.html'); await page.waitForTimeout(120);
    await page.screenshot({ path: `${OUT}/${f}-${w}.png`, fullPage: w === 390 ? false : true });
  }
}
await page.setViewportSize({ width: 1440, height: 900 });
for (const f of ['index', 'login', 'license', 'ministry-licenses', 'verifier', 'student', 'principal', 'division-approvals', 'district-reports', 'division', 'district', 'ministry', 'student-services', 'student-request', 'student-academics', 'alumni', 'teacher', 'teacher-classes', 'inst-students', 'inst-library', 'ministry-users', 'institutions', 'notices', 'officials', 'verify', 'division-resources', 'division-admissions']) {
  await page.goto(BASE + f + '.html?lang=bn'); await page.waitForTimeout(150);
  const leak = await page.evaluate(() => [...document.querySelectorAll('.l-en')].filter((e) => e.textContent.trim() && e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden').length);
  ok(leak === 0, `bn ${f}: no visible English spans (${leak})`);
  await page.screenshot({ path: `${OUT}/bn-${f}-1440.png` });
}
await page.evaluate(() => localStorage.setItem('tims-lang', 'en'));

fs.writeFileSync(`${OUT}/report.txt`, [...log, '', 'overflow:', ...overflow, '', 'errors:', ...errors].join('\n'));
console.log(log.join('\n')); console.log('\noverflow:', overflow.join('\n') || 'none'); console.log('errors:', errors.join('\n') || 'none'); console.log(`\n${fails} failing checks`);
await b.close();
