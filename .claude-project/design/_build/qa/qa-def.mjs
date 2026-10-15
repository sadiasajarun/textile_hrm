// D/E/F prototype QA: screenshots at 1440/1024/390, console errors, broken links, overflow, buttons without an action,
// small touch targets, untranslated labels after switching to Bangla, and interaction smoke tests.
// Usage: node qa-def.mjs <htmlDir> <shotsDir> <reviewDir> [--thumbs] [--only=<regex on file name>] [--flows]
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const [htmlDir, shotsDir, reviewDir] = process.argv.slice(2);
const thumbs = process.argv.includes('--thumbs');
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);
const exe = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
fs.mkdirSync(reviewDir, { recursive: true });
if (thumbs) fs.mkdirSync(shotsDir, { recursive: true });

const ACTIONS = ['data-placeholder', 'data-open', 'data-close', 'data-dropdown', 'data-drill', 'data-denied', 'data-mark', 'data-show',
  'data-hide', 'data-set-filter', 'data-profile', 'data-contrast', 'data-toast', 'data-lang', 'data-size', 'data-nav-toggle', 'data-reveal'];
const files = fs.readdirSync(htmlDir).filter((f) => /^[DEF]-\d\d-.*\.html$|^showcase-DEF\.html$/.test(f) && (!only || new RegExp(only).test(f))).sort();
const browser = await chromium.launch({ executablePath: exe });
const report = [];
const notes = [];

for (const file of files) {
  const abs = path.resolve(htmlDir, file);
  const url = pathToFileURL(abs).href;
  const issues = [];
  for (const vp of [{ w: 1440, h: 900, tag: 'desktop' }, { w: 1024, h: 768, tag: 'tablet' }, { w: 390, h: 844, tag: 'mobile' }]) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    page.on('console', (m) => { if (m.type() === 'error') issues.push(`[${vp.tag}] console: ${m.text()}`); });
    page.on('pageerror', (e) => issues.push(`[${vp.tag}] pageerror: ${e.message}`));
    page.on('requestfailed', (r) => issues.push(`[${vp.tag}] requestfailed: ${r.url()}`));
    await page.goto(url, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) {
      const culprits = await page.evaluate(() => Array.from(document.querySelectorAll('body *')).filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1 && !el.closest('.var-nav-bar') && getComputedStyle(el).position !== 'fixed').slice(0, 4).map((el) => el.tagName + '.' + String(el.className).slice(0, 60)));
      issues.push(`[${vp.tag}] horizontal overflow ${overflow}px: ${culprits.join(' | ')}`);
    }
    if (vp.tag === 'desktop') {
      const links = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
      for (const href of links) {
        if (href === '#' || href === '') { issues.push(`dead link href="${href}"`); continue; }
        if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
        const target = path.resolve(path.dirname(abs), href.split('#')[0].split('?')[0]);
        if (!fs.existsSync(target)) issues.push(`broken link: ${href}`);
      }
      const dead = await page.$$eval('button', (bs, acts) => bs.filter((b) => !acts.some((a) => b.hasAttribute(a)) && b.getAttribute('role') !== 'tab' && b.type !== 'submit' && b.type !== 'reset').map((b) => b.textContent.trim().replace(/\s+/g, ' ').slice(0, 40)), ACTIONS);
      for (const b of dead) issues.push(`button without action: "${b}"`);
      if (/^[DEF]-/.test(file) && !(await page.$('.var-nav-bar'))) issues.push('missing var-nav-bar');
      if (thumbs && /^[DEF]-/.test(file)) {
        const m = file.match(/^([DEF])-(\d+)/);
        await page.evaluate(() => { const n = document.querySelector('.var-nav-bar'); if (n) n.style.display = 'none'; });
        await page.screenshot({ path: path.join(shotsDir, `${m[1]}-${m[2]}.jpg`), type: 'jpeg', quality: 80 });
        await page.evaluate(() => { const n = document.querySelector('.var-nav-bar'); if (n) n.style.display = ''; });
      }
    }
    if (vp.tag === 'mobile') {
      const small = await page.evaluate(() => Array.from(document.querySelectorAll('button, [role="tab"], input:not([type="hidden"]), select, a.btn, .chip')).filter((el) => {
        const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && !el.closest('.var-nav-bar,[hidden],dialog:not([open]),.menu') && (r.height < 24 || r.width < 24);
      }).slice(0, 5).map((el) => `${el.tagName}"${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 20)}" ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`));
      for (const s of small) issues.push(`[mobile] target under 24px: ${s}`);
    }
    await page.screenshot({ path: path.join(reviewDir, `${file.replace('.html', '')}-${vp.tag}.png`), fullPage: true });

    if (vp.tag === 'desktop' && /^[DEF]-/.test(file)) {
      // Bangla: switch and list visible headings / nav / buttons / table heads still in Latin script
      await page.locator('[data-lang="bn"]:visible').first().click({ timeout: 2000 }).catch(() => {});
      const latin = await page.evaluate(() => Array.from(document.querySelectorAll('h1, h2, h3, th, nav a, nav button, .btn, .tab, .tag, .label')).filter((el) => {
        const r = el.getBoundingClientRect(); if (!r.width || el.closest('.var-nav-bar,[hidden],dialog:not([open]),.menu,.crumbs')) return false;
        const txt = (el.innerText || '').replace(/[\d.,%৳·/()+—–:\-\s]/g, '');
        return /[A-Za-z]{3,}/.test(txt) && !/[ঀ-৿]/.test(txt);
      }).map((el) => (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 50)));
      if (latin.length) notes.push(`${file}: ${latin.length} labels still Latin in Bangla mode: ${[...new Set(latin)].slice(0, 12).join(' | ')}`);
      await page.screenshot({ path: path.join(reviewDir, `${file.replace('.html', '')}-bn.png`), fullPage: false });
      await page.locator('[data-lang="en"]:visible').first().click({ timeout: 2000 }).catch(() => {});
      await page.evaluate(() => { try { localStorage.removeItem('tims-lang'); } catch (e) {} });

      // interaction smoke test: open every dialog / tab / drill / dropdown trigger that is visible
      const sel = '[data-open], [role="tab"], [data-drill], [data-dropdown], [data-set-filter], [data-placeholder], [data-profile], [data-denied]';
      const count = await page.$$eval(sel, (els) => els.length);
      let clicked = 0;
      for (let i = 0; i < count && clicked < 24; i++) {
        const el = (await page.$$(sel))[i];
        if (!el || !(await el.isVisible())) continue;
        await el.click({ timeout: 600 }).catch(() => {});
        clicked++;
        const open = await page.$('dialog[open]');
        if (open) {
          const close = await open.$('[data-close]');
          if (close && await close.isVisible()) await close.click().catch(() => {}); else await page.keyboard.press('Escape');
          await page.evaluate(() => document.querySelectorAll('dialog[open]').forEach((d) => d.close()));
        }
        await page.keyboard.press('Escape');
      }
    }
    await page.close();
  }
  report.push({ file, issues });
  const u0 = [...new Set(issues)];
  console.error(`[progress] ${u0.length ? 'FAIL' : 'PASS'} ${file}${u0.length ? '\n  - ' + u0.join('\n  - ') : ''}`);
}

// flow checks
async function flow(name, fn) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  try { const r = await fn(page); notes.push(`flow ${name}: ${r}${errs.length ? ' · errors: ' + errs.join('; ') : ''}`); } catch (e) { notes.push(`flow ${name}: FAILED ${e.message}`); }
  await page.close();
}
const fileUrl = (f) => pathToFileURL(path.resolve(htmlDir, f)).href;
for (const v of process.argv.includes('--flows') ? ['D', 'E', 'F'] : []) {
  await flow(`${v} login routes ministry.admin`, async (p) => {
    await p.goto(fileUrl(`${v}-03-login.html`)); await p.fill('#uid', 'ministry.admin'); await p.fill('#pw', 'demo1234');
    await Promise.all([p.waitForURL(/-04-ministry-dashboard\.html/), p.click('#login-form button[type="submit"]')]); return 'ok → ' + path.basename(new URL(p.url()).pathname);
  });
  await flow(`${v} login wrong password`, async (p) => {
    await p.goto(fileUrl(`${v}-03-login.html`)); await p.fill('#uid', 'ministry.admin'); await p.fill('#pw', 'x'); await p.click('#login-form button[type="submit"]');
    return (await p.isVisible('#login-error')) ? 'ok, error shown' : 'NO ERROR SHOWN';
  });
  await flow(`${v} login multi-role`, async (p) => {
    await p.goto(fileUrl(`${v}-03-login.html`)); await p.fill('#uid', 'saiful.islam'); await p.fill('#pw', 'demo1234'); await p.click('#login-form button[type="submit"]');
    return (await p.isVisible('#workspace-dialog')) ? 'ok, workspace chooser' : 'NO CHOOSER';
  });
  await flow(`${v} login empty`, async (p) => {
    await p.goto(fileUrl(`${v}-03-login.html`)); await p.click('#login-form button[type="submit"]');
    return (await p.$$eval('.field.invalid', (e) => e.length)) === 2 ? 'ok, 2 field errors' : 'NO FIELD ERRORS';
  });
  await flow(`${v} directory ?division=chattogram`, async (p) => {
    await p.goto(fileUrl(`${v}-02-public-services.html`) + '?division=chattogram');
    const n = await p.$$eval('[data-item][data-division]', (els) => els.filter((e) => !e.hidden && e.dataset.division).length);
    return `${n} rows visible`;
  });
  await flow(`${v} verify lookup`, async (p) => {
    await p.goto(fileUrl(`${v}-02-public-services.html`) + '#verify');
    const f = await p.$('#verify form'); await (await f.$('input')).fill('CERT-2025-KTI-0412'); await (await f.$('button[type="submit"]')).click();
    const ok = await p.isVisible('#verify [id$="-found"]');
    await (await f.$('input')).fill('BAD-1'); await (await f.$('button[type="submit"]')).click();
    return `found=${ok} notfound=${await p.isVisible('#verify [id$="-nf"]')}`;
  });
  if (v !== 'F') await flow(`${v} ministry drill deep link`, async (p) => {
    await p.goto(fileUrl(`${v}-04-ministry-dashboard.html`) + '#drill=ctg-district');
    return (await p.isVisible('[data-drill-panel="ctg-district"]')) ? 'ok, district panel visible' : 'PANEL HIDDEN';
  });
}
await browser.close();
let total = 0;
for (const r of report) {
  const u = [...new Set(r.issues)];
  total += u.length;
  console.log(`${u.length ? 'FAIL' : 'PASS'} ${r.file}${u.length ? '\n  - ' + u.join('\n  - ') : ''}`);
}
console.log('\n' + notes.join('\n'));
console.log(`\n${report.length} pages, ${total} issues`);
process.exit(total ? 1 : 0);
