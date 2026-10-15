// QA for the Phase 1 G/H/I prototypes.
//   PWC=<playwright-core> node qa-ghi.cjs <variations dir> [--only=regex] [--flows]
// Checks per page at 1440 / 1024 / 390: console + page errors, failed requests, broken links, href="#",
// buttons without an action, horizontal overflow, touch targets < 24px, Latin text left in Bangla mode,
// and clicks every tab, filter, dialog trigger and Phase 2 placeholder. --flows runs the key journeys.
const { chromium } = require(process.env.PWC || 'playwright-core');
const fs = require('fs');
const path = require('path');

const dir = path.resolve(process.argv[2]);
const only = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);
const runFlows = process.argv.includes('--flows');
const url = (f, q = '') => 'file:///' + path.join(dir, f).replace(/\\/g, '/') + q;
const ACTION = ['data-p2', 'data-toast', 'data-open', 'data-close', 'data-set-lang', 'data-toggle-lang', 'data-textsize', 'data-filter', 'data-expand',
  'data-row-action', 'data-att-all', 'data-att-submit', 'data-slide-prev', 'data-slide-next', 'data-slide-dot', 'data-slide-pause', 'data-scroll',
  'data-lightbox', 'data-portal', 'data-menu', 'data-vnb-toggle', 'data-go', 'data-confirm-ok', 'data-att-all'];
// Latin words that legitimately stay in Bangla mode: people, codes, units, domains, licence text.
const LATIN_OK = /^(Farhana Ahmed|Md\. Saiful Islam|Arif Hossain|Mim Akter|Nusrat Jahan( Ria)?|Lamia Chowdhury|Rafiul Alam|Kamrul Hasan|Tahmina Akter|Shahidul Karim|Rokeya Sultana|Sajid Rahman|Tanvir Ahmed|Nadia Islam|Habibur Rahman|Sumaiya Khatun|Karnaphuli Textile Institute|Diploma in Textile Engineering · 2025 · Karnaphuli Textile Institute|English|EN|PDF|SLA|GPA.*|.*\.tims\.gov\.bd|help@tims\.gov\.bd|.*\.pdf|Boundaries: geoBoundaries.*|Prototype.*|Screen \d\/7|Compare|Showcase|Landing|Notices|Login|Ministry|Principal|Teacher|Student|https:\/\/|[A-Z]{1,4}[- ]?[0-9][-0-9A-Z…]*|.*TX-YY-0000000.*|CERT-2025-00481.*)$/;

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const files = fs.readdirSync(dir).filter((f) => /^[GHI]-0\d-.*\.html$/.test(f) && (!only || new RegExp(only).test(f)));
  let issues = 0;
  const report = (f, w, msg) => { issues++; console.log(`  ✗ ${f} @${w}: ${msg}`); };

  for (const f of files) {
    for (const w of [1440, 1024, 390]) {
      const page = await browser.newPage({ viewport: { width: w, height: 900 } });
      const errs = [];
      page.on('pageerror', (e) => errs.push('pageerror ' + e.message));
      page.on('console', (m) => { if (m.type() === 'error') errs.push('console ' + m.text()); });
      page.on('requestfailed', (r) => errs.push('failed ' + r.url()));
      await page.goto(url(f, '?lang=en'));
      await page.waitForTimeout(250);
      const res = await page.evaluate(({ ACTION }) => {
        const out = { links: [], hash: 0, dead: [], overflow: 0, small: [] };
        document.querySelectorAll('a[href]').forEach((a) => {
          const h = a.getAttribute('href');
          if (h === '#') out.hash++;
          else if (!/^(#|tel:|mailto:|https?:)/.test(h)) out.links.push(h);
          else if (h.startsWith('#') && h.length > 1 && !document.getElementById(h.slice(1))) out.dead.push('missing anchor ' + h);
        });
        document.querySelectorAll('button').forEach((b) => {
          const ok = ACTION.some((a) => b.hasAttribute(a)) || b.getAttribute('role') === 'tab' || (b.type === 'submit' && b.closest('form'));
          if (!ok) out.dead.push('button without action: ' + (b.textContent.trim().slice(0, 40) || b.outerHTML.slice(0, 80)));
        });
        out.overflow = document.documentElement.scrollWidth - window.innerWidth;
        document.querySelectorAll('button, a.btn, nav a, .var-nav-bar a').forEach((el) => {
          const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
          if (r.width && r.height && cs.visibility !== 'hidden' && r.height < 24 && !el.closest('.var-nav-bar') && !el.closest('p, li > small')) out.small.push(`${el.textContent.trim().slice(0, 30)} (${Math.round(r.height)}px)`);
        });
        return out;
      }, { ACTION });
      for (const l of new Set(res.links)) {
        const [p, anchor] = l.split('#');
        const target = path.resolve(dir, p);
        if (!fs.existsSync(target)) report(f, w, 'broken link ' + l);
        else if (anchor && p.endsWith('.html') && !fs.readFileSync(target, 'utf8').includes(`id="${anchor}"`)) report(f, w, 'missing anchor ' + l);
      }
      if (res.hash) report(f, w, `${res.hash} href="#"`);
      res.dead.forEach((d) => report(f, w, d));
      if (res.overflow > 1) report(f, w, `horizontal overflow ${res.overflow}px`);
      if (res.small.length) report(f, w, 'small targets: ' + res.small.slice(0, 5).join(', '));

      if (w === 1440) {
        // Bangla: list visible Latin text
        await page.evaluate(() => { document.querySelector('[data-set-lang="bn"]') ? document.querySelector('[data-set-lang="bn"]').click() : document.querySelector('[data-toggle-lang]').click(); });
        const latin = await page.evaluate(() => {
          const out = new Set(); const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          let n; while ((n = walker.nextNode())) {
            const t = n.textContent.trim(); if (!/[A-Za-z]{3,}/.test(t)) continue;
            const el = n.parentElement; if (!el || el.closest('script, .var-nav-bar, dialog:not([open]), code, .mono, [hidden], .sr-only')) continue;
            const r = el.getBoundingClientRect(); if (!r.width || getComputedStyle(el).display === 'none' || el.closest('[style*="display: none"]')) continue;
            let p = el, vis = true; while (p) { if (getComputedStyle(p).display === 'none') { vis = false; break; } p = p.parentElement; }
            if (vis) out.add(t.replace(/\s+/g, ' '));
          }
          return [...out];
        });
        const bad = latin.filter((x) => !(new RegExp(String.raw`^(?:${LATIN_OK.source.slice(2, -2)})$`)).test(x));
        if (bad.length) report(f, 'bn', 'Latin text: ' + bad.slice(0, 12).map((x) => JSON.stringify(x.slice(0, 50))).join(', '));
        await page.evaluate(() => { const b = document.querySelector('[data-set-lang="en"]'); if (b) b.click(); else document.querySelector('[data-toggle-lang]').click(); });

        // click-through
        const sel = '[role="tab"], [data-filter], [data-open], [data-p2], [data-expand], [data-slide-next], [data-lightbox], [data-portal], [data-toast]';
        const n = await page.locator(sel).count();
        for (let i = 0; i < n; i++) {
          const el = page.locator(sel).nth(i);
          if (!(await el.isVisible())) continue;
          await el.click({ timeout: 2000 }).catch((e) => errs.push('click ' + i + ' ' + e.message.split('\n')[0]));
          await page.evaluate(() => { document.querySelectorAll('dialog[open]').forEach((d) => d.close()); });
        }
      }
      errs.forEach((e) => report(f, w, e));
      await page.close();
    }
    console.log(`checked ${f}`);
  }

  if (runFlows) {
    const flows = [];
    const flow = async (name, fn) => {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      const errs = []; page.on('pageerror', (e) => errs.push(e.message));
      try { await fn(page); flows.push([name, errs.length ? 'FAIL ' + errs.join('|') : 'PASS']); } catch (e) { flows.push([name, 'FAIL ' + e.message.split('\n')[0]]); }
      await page.close();
    };
    for (const V of ['G', 'H', 'I']) {
      const pre = V === 'H' ? 'h' : V === 'G' ? 'tab' : 'it';
      await flow(`${V} student sign-in → student dashboard`, async (p) => {
        await p.goto(url(`${V}-03-login.html`)); await p.click(`[id$="-student"][role="tab"]`).catch(() => {});
        await p.locator('[role="tabpanel"]:not([hidden]) form button[type="submit"]').click(); await p.waitForURL(/07-student/, { timeout: 3000 });
      });
      await flow(`${V} teacher sign-in → teacher dashboard`, async (p) => {
        await p.goto(url(`${V}-03-login.html`)); await p.click(`[id$="-teacher"][role="tab"]`);
        await p.locator('[role="tabpanel"]:not([hidden]) form button[type="submit"]').click(); await p.waitForURL(/06-teacher/, { timeout: 3000 });
      });
      await flow(`${V} empty field shows error`, async (p) => {
        await p.goto(url(`${V}-03-login.html`)); await p.click(`[id$="-teacher"][role="tab"]`);
        await p.locator('[role="tabpanel"]:not([hidden]) input').first().fill('');
        await p.locator('[role="tabpanel"]:not([hidden]) form button[type="submit"]').click();
        if (!(await p.locator('[role="tabpanel"]:not([hidden]) .err:not([hidden])').count())) throw new Error('no field error');
        if (/06-teacher/.test(p.url())) throw new Error('navigated');
      });
      await flow(`${V} candidate status (candidate → student lifecycle)`, async (p) => {
        await p.goto(url(`${V}-03-login.html`)); await p.click(`[id$="-candidate"][role="tab"]`);
        await p.locator('[role="tabpanel"]:not([hidden]) form button[type="submit"]').click();
        await p.locator('[role="tabpanel"]:not([hidden]) [data-candidate] ~ [tabindex="-1"]:not([hidden]), #cand-result:not([hidden]), #h-cand:not([hidden]), #i-cand:not([hidden])').first().waitFor({ timeout: 2000 });
      });
      await flow(`${V} ministry portal (separate domain) → ministry dashboard`, async (p) => {
        await p.goto(url(`${V}-03-login.html`)); await p.click('[data-portal="ministry"]');
        if ((await p.textContent('[data-portal-dom]')) !== 'ministry.tims.gov.bd') throw new Error('domain not shown');
        await p.click('#dlg-portal button[type="submit"]'); await p.waitForURL(/04-ministry/, { timeout: 3000 });
      });
      await flow(`${V} division portal → Phase 2 note`, async (p) => {
        await p.goto(url(`${V}-03-login.html`)); await p.click('[data-portal="division"]'); await p.click('#dlg-portal button[type="submit"]');
        if (!(await p.locator('#dlg-p2[open]').count())) throw new Error('no p2 dialog');
      });
      await flow(`${V} approve a request updates status and count`, async (p) => {
        await p.goto(url(`${V}-04-ministry-dashboard.html`));
        const before = await p.locator('[data-count]').first().getAttribute('data-live-num');
        await p.locator('[data-row-action="approve"]').first().click(); await p.click('[data-confirm-ok]');
        if (!(await p.locator('[data-row-status] .tag-ok').count())) throw new Error('status not updated');
        const after = await p.locator('[data-count]').first().getAttribute('data-live-num');
        if (+after !== +before - 1) throw new Error(`count ${before}→${after}`);
      });
      await flow(`${V} return for correction asks for a reason`, async (p) => {
        await p.goto(url(`${V}-05-principal-dashboard.html`));
        await p.locator('[data-row-action="return"]').first().click();
        if (await p.locator('[data-confirm-note]').isHidden()) throw new Error('no reason field');
        await p.click('[data-confirm-ok]'); if (!(await p.locator('[data-row-status] .tag-warn').count())) throw new Error('not returned');
      });
      await flow(`${V} teacher submits attendance`, async (p) => {
        await p.goto(url(`${V}-06-teacher-dashboard.html`));
        if (await p.locator('[data-open="dlg-att"]').count()) await p.click('[data-open="dlg-att"]');
        await p.click('[data-att-all]'); await p.click('[data-att-submit]');
        if (!(await p.locator('[data-att-state].tag-ok').count())) throw new Error('state not recorded');
      });
      await flow(`${V} notices: year 2025 shows empty state`, async (p) => {
        await p.goto(url(`${V}-02-notices.html`)); await p.selectOption('[data-filter-year]', '2025');
        if (!(await p.locator('[data-filter-empty]:not([hidden])').count())) throw new Error('no empty state');
      });
      await flow(`${V} notices: category filter`, async (p) => {
        await p.goto(url(`${V}-02-notices.html`));
        const btn = p.locator('[data-filter="tender"]'); if (await btn.count()) await btn.first().click(); else await p.selectOption('[data-filter-select]', 'tender');
        const vis = await p.locator('[data-cat]:not([hidden])').count(); if (vis !== 1) throw new Error(`${vis} rows`);
      });
      await flow(`${V} language persists across pages`, async (p) => {
        await p.goto(url(`${V}-01-landing.html`)); await p.evaluate(() => localStorage.clear());
        await p.locator('[data-set-lang="bn"]').first().click(); await p.goto(url(`${V}-02-notices.html`));
        if ((await p.getAttribute('html', 'data-lang')) !== 'bn') throw new Error('not persisted');
        await p.evaluate(() => localStorage.clear());
      });
    }
    await flow('I verify certificate: found and not found', async (p) => {
      await p.goto(url('I-01-landing.html')); await p.click('[data-verify] button[type="submit"]');
      if (await p.locator('[data-verify-found]').isHidden()) throw new Error('not found shown for valid');
      await p.fill('[data-verify] input', 'CERT-1999-1'); await p.click('[data-verify] button[type="submit"]');
      if (await p.locator('[data-verify-none]').isHidden()) throw new Error('none hidden');
    });
    await flow('H map selects a division', async (p) => {
      await p.goto(url('H-04-ministry-dashboard.html')); await p.click('[data-map-div="sylhet"]');
      if (!(await p.textContent('[data-div-field="name"]')).includes('Sylhet')) throw new Error('panel not updated');
    });
    await flow('G ministry drill-down opens districts', async (p) => {
      await p.goto(url('G-04-ministry-dashboard.html')); await p.click('[data-expand="dist-chattogram"]');
      if (await p.locator('#dist-chattogram').isHidden()) throw new Error('districts hidden');
    });
    await flow('I ministry tree expands districts', async (p) => {
      await p.goto(url('I-04-ministry-dashboard.html')); await p.click('[data-expand="dd-chattogram"]');
      if (await p.locator('tr.lvl-2[data-expand-group="dd-chattogram"]').first().isHidden()) throw new Error('rows hidden');
    });
    console.log('\nFlows:'); flows.forEach(([n, r]) => { if (!r.startsWith('PASS')) issues++; console.log(`  ${r.startsWith('PASS') ? '✓' : '✗'} ${n}${r === 'PASS' ? '' : ' — ' + r}`); });
  }
  console.log(`\n${files.length} pages, ${issues} issue(s).`);
  await browser.close();
  process.exit(issues ? 1 : 0);
})();
