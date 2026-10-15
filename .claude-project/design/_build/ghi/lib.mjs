// Shared helpers for the G/H/I prototype build.
// Every user-facing string goes through t(en, bn) so the language toggle switches it.
import fs from 'node:fs';
import path from 'node:path';

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
const MONTHS = {
  Jan: 'জানুয়ারি', Feb: 'ফেব্রুয়ারি', Mar: 'মার্চ', Apr: 'এপ্রিল', May: 'মে', Jun: 'জুন',
  Jul: 'জুলাই', Aug: 'আগস্ট', Sep: 'সেপ্টেম্বর', Oct: 'অক্টোবর', Nov: 'নভেম্বর', Dec: 'ডিসেম্বর',
};

export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const bnDigits = (s) => String(s).replace(/[0-9]/g, (d) => BN_DIGITS[d]);

/** English months/day-names and digits to Bangla, for dates and figures. */
export const bnDate = (s) => bnDigits(String(s).replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, (m) => MONTHS[m]));

const missing = [];
export const missingTranslations = () => missing;

/** Bilingual inline text. Both spans are rendered; CSS shows the active language. */
export function t(en, bn) {
  if (bn === undefined || bn === null || bn === '') missing.push(en);
  return `<span class="l-en">${en}</span><span class="l-bn" lang="bn">${bn ?? en}</span>`;
}
/** Same as t() for a {en, bn} or [en, bn] value. */
export const tt = (v) => (Array.isArray(v) ? t(v[0], v[1]) : t(v.en, v.bn));
/** Figure: digits switch to Bangla numerals. */
export const n = (v) => t(esc(v), esc(bnDigits(v)));
/** Date: month names and digits switch. */
export const d = (v) => t(esc(v), esc(bnDate(v)));

/** Bilingual attribute (placeholder, aria-label, title, alt). JS swaps the value. */
export function ta(name, en, bn) {
  if (!bn) missing.push(`[attr ${name}] ${en}`);
  return `${name}="${esc(en)}" data-i18n-${name}="${esc(bn ?? en)}"`;
}

let ICON_DIRS = [];
const iconCache = new Map();
const usedIcons = new Set();
export function setIconDirs(dirs) { ICON_DIRS = dirs; }
export const iconsUsed = () => [...usedIcons];

/** Inline Lucide icon (decorative by default). */
export function icon(name, cls = 'ico') {
  usedIcons.add(name);
  if (!iconCache.has(name)) {
    const file = ICON_DIRS.map((dir) => path.join(dir, `${name}.svg`)).find((f) => fs.existsSync(f));
    if (!file) throw new Error(`Icon not found: ${name}`);
    const svg = fs.readFileSync(file, 'utf8')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<svg[^>]*>/, (tag) => tag.replace(/\s(width|height|class)="[^"]*"/g, ''))
      .replace(/\r?\n\s*/g, '')
      .trim();
    iconCache.set(name, svg);
  }
  return iconCache.get(name).replace('<svg', `<svg class="${cls}" aria-hidden="true" focusable="false"`);
}

/** Photo with bilingual alt text; images live in assets/ghi/img/. */
export const img = (file, alt, cls = '', extra = '') =>
  `<img src="../assets/ghi/img/${file}" ${ta('alt', alt[0], alt[1])} class="${cls}" ${extra.includes('loading=') ? '' : 'loading="lazy" '}decoding="async" ${extra}>`;

/** Join helper for arrays of HTML. */
export const each = (arr, fn) => arr.map(fn).join('');

/** <option> with bilingual text (swapped by JS). */
export const opt = (value, en, bn, sel = false) => `<option value="${esc(value)}" data-i18n-text="${esc(bn ?? bnDigits(en))}"${sel ? ' selected' : ''}>${esc(en)}</option>`;
