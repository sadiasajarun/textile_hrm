// Screenshot final prototype pages: node fshots.cjs <prototype dir> <out> <regex> [--full] [--w=] [--lang=bn] [--scale=]
const { chromium } = require(process.env.PWC || 'playwright-core');
const fs = require('fs'); const path = require('path');
(async () => {
  const [dir, out, re] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const flag = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=')[1] : d; };
  const full = process.argv.includes('--full'); const w = +flag('w', 1440); const lang = flag('lang', 'en'); const scale = +flag('scale', 1); const qs = flag('qs', '');
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ executablePath: process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.html') && new RegExp(re).test(x))) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: scale }); const errs = [];
    p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    p.on('requestfailed', (r) => errs.push('failed ' + r.url()));
    await p.goto('file:///' + path.resolve(dir, f).split(path.sep).join('/') + `?lang=${lang}${qs ? '&' + qs : ''}`);
    await p.evaluate(async () => { document.documentElement.style.scrollBehavior = 'auto'; document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; }); for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); });
    await p.waitForFunction(() => Array.from(document.images).every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
    await p.addStyleTag({ content: '.var-nav-bar{display:none!important}' }); await p.waitForTimeout(500);
    await p.screenshot({ path: path.join(out, f.replace('.html', '') + (lang === 'bn' ? '-bn' : '') + (full ? '-full' : '') + '.jpg'), fullPage: full, quality: 70, type: 'jpeg' });
    console.log(f, errs.length ? 'ERR ' + errs.join(' | ').slice(0, 300) : 'ok'); await p.close();
  }
  await b.close();
})();
