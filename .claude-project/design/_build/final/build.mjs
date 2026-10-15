// Build the final prototype (Variation H baseline).
//   node build.mjs [--lucide <lucide-static/icons dir>]
// Output: ../../prototype/*.html, ../../assets/final/{final.css,final.js}
// Reuses ../ghi (helpers, base.css, h.css, ghi.js). Fails if any string lacks a Bangla translation.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setIconDirs, iconsUsed, missingTranslations } from '../ghi/lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const design = path.resolve(here, '../..');
const out = path.join(design, 'prototype');
const assets = path.join(design, 'assets', 'final');
const lucideArg = process.argv.indexOf('--lucide');
const lucide = lucideArg > -1 ? process.argv[lucideArg + 1] : null;
const vendored = path.join(here, '..', 'ghi', 'icons');
setIconDirs([path.join(here, '..', 'icons'), vendored, ...(lucide ? [lucide] : [])]);

const modules = ['public', 'access', 'admission', 'ministry', 'regional', 'institution', 'teacher', 'student', 'license'];
const pages = {};
for (const m of modules) {
  const f = path.join(here, 'pages', `${m}.mjs`);
  if (!fs.existsSync(f)) continue;
  Object.assign(pages, (await import(`./pages/${m}.mjs`)).default);
}
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(assets, { recursive: true });
for (const [file, render] of Object.entries(pages)) fs.writeFileSync(path.join(out, `${file}.html`), render());
fs.copyFileSync(path.join(here, 'css', 'final.css'), path.join(assets, 'final.css'));
fs.copyFileSync(path.join(here, 'js', 'final.js'), path.join(assets, 'final.js'));
for (const f of ['base.css', 'h.css']) fs.copyFileSync(path.join(here, '..', 'ghi', 'css', f), path.join(design, 'assets', 'ghi', f));
fs.copyFileSync(path.join(here, '..', 'ghi', 'js', 'ghi.js'), path.join(design, 'assets', 'ghi', 'ghi.js'));
if (lucide) {
  for (const name of iconsUsed()) {
    const known = [path.join(here, '..', 'icons', `${name}.svg`), path.join(vendored, `${name}.svg`)].some((x) => fs.existsSync(x));
    if (!known) fs.copyFileSync(path.join(lucide, `${name}.svg`), path.join(vendored, `${name}.svg`));
  }
}
const missing = [...new Set(missingTranslations())];
if (missing.length) { console.error(`Missing Bangla for ${missing.length} strings:\n  ${missing.slice(0, 40).join('\n  ')}`); process.exit(1); }
console.log(`Built ${Object.keys(pages).length} pages, ${iconsUsed().length} icons.`);
