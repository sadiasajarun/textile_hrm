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
await doSet('inst-procurement.html', 'proc=submitted'); await doSet('ministry-approvals.html', 'proc=approved');
await doSet('inst-procurement.html', 'proc=po'); await doSet(null, 'proc=lc'); await doSet(null, 'proc=received'); await doSet(null, 'proc=gatepass');
// H
await doSet('teacher-leave.html', 'leave=pending'); await doSet('inst-leave.html', 'leave=approved'); await go('teacher-leave.html'); ok(true, 'H: opened teacher-leave.html');
// I
await doSet('student-certificate.html', 'cert=applied'); await doSet('inst-certificates.html', 'cert=issued'); await doSet(null, 'cert=alumni'); await go('alumni.html'); ok(true, 'I: opened alumni.html');

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
  for (const f of ['license', 'license-apply', 'license-track', 'ministry-licenses', 'verifier-register', 'verifier', 'prototype-index', 'index', 'student-services', 'teacher-results']) {
    await page.goto(BASE + f + '.html'); await page.waitForTimeout(120);
    await page.screenshot({ path: `${OUT}/${f}-${w}.png`, fullPage: w === 390 ? false : true });
  }
}
await page.setViewportSize({ width: 1440, height: 900 });
for (const f of ['index', 'license', 'ministry-licenses', 'verifier', 'student', 'principal']) {
  await page.goto(BASE + f + '.html?lang=bn'); await page.waitForTimeout(150);
  const leak = await page.evaluate(() => [...document.querySelectorAll('.l-en')].filter((e) => e.offsetParent !== null && e.textContent.trim()).length);
  ok(leak === 0, `bn ${f}: no visible English spans (${leak})`);
  await page.screenshot({ path: `${OUT}/bn-${f}-1440.png` });
}
await page.evaluate(() => localStorage.setItem('tims-lang', 'en'));

fs.writeFileSync(`${OUT}/report.txt`, [...log, '', 'overflow:', ...overflow, '', 'errors:', ...errors].join('\n'));
console.log(log.join('\n')); console.log('\noverflow:', overflow.join('\n') || 'none'); console.log('errors:', errors.join('\n') || 'none'); console.log(`\n${fails} failing checks`);
await b.close();
