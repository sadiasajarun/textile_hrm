// Build the Phase 1 design-direction prototypes G / H / I.
//   node build.mjs [--lucide <path to lucide-static/icons>]
// Output: ../../variations/{G,H,I}-0N-*.html, ../../variations/showcase-GHI.html, ../../assets/ghi/*
// Icons resolve from ../icons (vendored, shared with earlier rounds) and then ./icons (vendored for G/H/I).
// With --lucide, icons missing from both folders are copied into ./icons so later builds need no download.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setIconDirs, iconsUsed, missingTranslations } from './lib.mjs';
import { VARIANTS, SCREENS, file } from './shared.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const design = path.resolve(here, '../..');
const outDir = path.join(design, 'variations');
const assetDir = path.join(design, 'assets', 'ghi');
const vendored = path.join(here, 'icons');
const lucideArg = process.argv.indexOf('--lucide');
const lucide = lucideArg > -1 ? process.argv[lucideArg + 1] : null;

fs.mkdirSync(vendored, { recursive: true });
setIconDirs([path.join(here, '..', 'icons'), vendored, ...(lucide ? [lucide] : [])]);

const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : ['g', 'h', 'i'];
const mods = {};
for (const v of only) mods[v] = (await import(`./${v}.mjs`)).default;

let count = 0;
for (const v of only) {
  for (const s of SCREENS) {
    const render = mods[v][s.id];
    if (!render) throw new Error(`Missing screen ${v}/${s.id}`);
    fs.writeFileSync(path.join(outDir, file(v, s.id)), render());
    count++;
  }
}
if (only.length === 3) {
  const showcase = (await import('./showcase.mjs')).default;
  fs.writeFileSync(path.join(outDir, 'showcase-GHI.html'), showcase());
}

// assets
fs.mkdirSync(assetDir, { recursive: true });
for (const f of ['base.css', 'g.css', 'h.css', 'i.css']) {
  if (fs.existsSync(path.join(here, 'css', f))) fs.copyFileSync(path.join(here, 'css', f), path.join(assetDir, f));
}
fs.copyFileSync(path.join(here, 'js', 'ghi.js'), path.join(assetDir, 'ghi.js'));

// vendor icons that came from the lucide package
if (lucide) {
  for (const name of iconsUsed()) {
    const shared = path.join(here, '..', 'icons', `${name}.svg`);
    const mine = path.join(vendored, `${name}.svg`);
    if (!fs.existsSync(shared) && !fs.existsSync(mine)) fs.copyFileSync(path.join(lucide, `${name}.svg`), mine);
  }
}

const missing = [...new Set(missingTranslations())];
if (missing.length) {
  console.error(`Missing Bangla for ${missing.length} strings:\n  ${missing.slice(0, 40).join('\n  ')}`);
  process.exit(1);
}
console.log(`Built ${count} pages (${only.join(', ').toUpperCase()}), ${iconsUsed().length} icons.`);
