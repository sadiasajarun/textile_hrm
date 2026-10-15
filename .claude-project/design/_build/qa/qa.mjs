// Prototype QA: screenshots, console errors, broken local links, horizontal overflow, missing review bar.
// Usage: node qa.mjs <htmlDir> <shotsDir> <reviewDir> [--thumbs]
// Requires playwright-core (resolved from _build/node_modules) and Chromium at /opt/pw-browsers.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const [htmlDir, shotsDir, reviewDir] = process.argv.slice(2);
const thumbs = process.argv.includes('--thumbs');
const exe = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
fs.mkdirSync(reviewDir, { recursive: true });
if (thumbs) fs.mkdirSync(shotsDir, { recursive: true });

const files = fs.readdirSync(htmlDir).filter((f) => f.endsWith('.html')).sort();
const browser = await chromium.launch({ executablePath: exe });
const report = [];

for (const file of files) {
  const abs = path.resolve(htmlDir, file);
  const url = pathToFileURL(abs).href;
  const issues = [];
  for (const vp of [{ w: 1440, h: 900, tag: 'desktop' }, { w: 375, h: 812, tag: 'mobile' }]) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    page.on('console', (m) => { if (m.type() === 'error') issues.push(`[${vp.tag}] console: ${m.text()}`); });
    page.on('pageerror', (e) => issues.push(`[${vp.tag}] pageerror: ${e.message}`));
    page.on('requestfailed', (r) => issues.push(`[${vp.tag}] requestfailed: ${r.url()}`));
    await page.goto(url, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) issues.push(`[${vp.tag}] horizontal overflow ${overflow}px`);
    if (vp.tag === 'desktop') {
      const links = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
      for (const href of links) {
        if (href === '#') { issues.push(`dead link href="#"`); continue; }
        if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
        const target = path.resolve(path.dirname(abs), href.split('#')[0]);
        if (!fs.existsSync(target)) issues.push(`broken link: ${href}`);
      }
      const buttons = await page.$$eval('button', (bs) => bs.filter((b) => !b.hasAttribute('data-toast') && !b.hasAttribute('data-lang') && !b.hasAttribute('data-size') && !b.hasAttribute('data-nav-toggle') && b.getAttribute('role') !== 'tab' && b.type !== 'submit').map((b) => b.textContent.trim().slice(0, 40)));
      for (const b of buttons) issues.push(`button without action: "${b}"`);
      if (/^[A-Z]-0/.test(file) && !(await page.$('.var-nav-bar'))) issues.push('missing var-nav-bar');
      if (thumbs && /^[A-Z]-0/.test(file)) {
        const m = file.match(/^([A-Z])-(\d+)/);
        await page.evaluate(() => { const n = document.querySelector('.var-nav-bar'); if (n) n.style.display = 'none'; });
        await page.screenshot({ path: path.join(shotsDir, `${m[1]}-${m[2]}.jpg`), type: 'jpeg', quality: 78 });
        await page.evaluate(() => { const n = document.querySelector('.var-nav-bar'); if (n) n.style.display = ''; });
      }
    }
    await page.screenshot({ path: path.join(reviewDir, `${file.replace('.html', '')}-${vp.tag}.png`), fullPage: true });
    await page.close();
  }
  report.push({ file, issues });
}
await browser.close();
let total = 0;
for (const r of report) {
  total += r.issues.length;
  console.log(`${r.issues.length ? 'FAIL' : 'PASS'} ${r.file}${r.issues.length ? '\n  - ' + [...new Set(r.issues)].join('\n  - ') : ''}`);
}
console.log(`\n${report.length} pages, ${total} issues`);
process.exit(total ? 1 : 0);
