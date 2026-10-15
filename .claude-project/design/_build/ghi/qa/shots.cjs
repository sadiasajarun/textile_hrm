// Screenshot G/H/I pages.
//   PWC=<path to playwright-core> CHROME=<chrome.exe> node shots.cjs <variations dir> <out dir> [regex] [--full] [--w=1440] [--h=900] [--lang=bn] [--scale=1] [--y=0]
const { chromium } = require(process.env.PWC || 'playwright-core');
const fs = require('fs');
const path = require('path');

(async () => {
  const [dir, out, re] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const flag = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=')[1] : d; };
  const full = process.argv.includes('--full');
  const w = +flag('w', 1440), h = +flag('h', 900), lang = flag('lang', 'en'), scale = +flag('scale', 1), y = +flag('y', 0);
  const files = fs.readdirSync(dir).filter((f) => /^[GHI]-0\d-.*\.html$/.test(f) && (!re || new RegExp(re).test(f)));
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  for (const f of files) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
    const errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    await page.goto('file:///' + path.resolve(dir, f).replace(/\\/g, '/') + (lang === 'bn' ? '?lang=bn' : '?lang=en'));
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
      for (let yy = 0; yy < document.body.scrollHeight; yy += 600) { window.scrollTo(0, yy); await new Promise((r) => setTimeout(r, 40)); }
      window.scrollTo(0, 0);
    });
    await page.waitForFunction(() => Array.from(document.images).every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
    await page.addStyleTag({ content: '.var-nav-bar{display:none!important}' });
    await page.evaluate(() => document.fonts.ready);
    if (y) await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(600);
    const name = f.replace('.html', '') + (lang === 'bn' ? '-bn' : '') + (full ? '-full' : '') + (y ? `-y${y}` : '') + '.jpg';
    await page.screenshot({ path: path.join(out, name), fullPage: full, quality: 72, type: 'jpeg' });
    console.log(name, errs.length ? 'ERRORS: ' + errs.join(' | ') : 'ok');
    await page.close();
  }
  await browser.close();
})();
