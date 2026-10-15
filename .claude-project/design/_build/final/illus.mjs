// Small line-art illustrations (64×64) for the homepage statistics band.
// Two-tone: strokes use currentColor; .il-a / .il-b / .il-w set the fills (see .f-ill in final.css).
const svg = (inner) => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;

const ART = {
  // Engineering college: classical building with a graduation cap above the pediment.
  college: svg(`<path class="il-a" d="M10 27 32 15l22 12z"/><path d="M12 30h40"/>
    <path d="M17 31v15M25 31v15M39 31v15M47 31v15"/><path d="M30 46v-8h4v8"/>
    <path class="il-a" d="M9 46h46v4H9z"/><path d="M6 54h52"/>
    <path class="il-b" d="M32 4l10 4.5-10 4.5-10-4.5z"/><path d="M26.5 10.5v3.2c3.5 2.2 7.5 2.2 11 0v-3.2"/><path d="M42 8.5v5"/>`),
  // Textile institute: school building beside a spool of thread.
  institute: svg(`<path class="il-a" d="M8 31h30v21H8z"/><path d="M5 32 23 19l18 13"/>
    <path class="il-w" d="M12 35h6v5h-6zM28 35h6v5h-6z"/><path d="M20 52v-8h6v8"/>
    <path class="il-b" d="M47 30h8v18h-8z"/><path d="M47 35l8-2M47 40l8-2M47 45l8-2"/>
    <rect class="il-w" x="44" y="26" width="14" height="4" rx="1"/><rect class="il-w" x="44" y="48" width="14" height="4" rx="1"/>
    <path d="M3 52h58"/>`),
  // Vocational institute: sewing machine with spool and stitch line.
  vocational: svg(`<path class="il-a" d="M14 46V21a5 5 0 0 1 5-5h28a5 5 0 0 1 5 5v13h-7v-8H22v20z"/>
    <rect class="il-b" x="27" y="8" width="8" height="8" rx="1.5"/><path d="M31 8v-2"/>
    <circle class="il-w" cx="18" cy="23" r="2.5"/><path d="M48.5 34v7M45 41h7"/>
    <rect class="il-w" x="7" y="46" width="50" height="7" rx="2"/><path d="M12 49.5h34" stroke-dasharray="3 3"/>`),
  // Divisions: folded map with a location pin.
  divisions: svg(`<path class="il-a" d="M7 16l15-5 20 6 15-5v37l-15 5-20-6-15 5z"/><path d="M22 11v37M42 17v37"/>
    <path class="il-b" d="M32 19a7.5 7.5 0 0 1 7.5 7.5c0 6.5-7.5 13-7.5 13s-7.5-6.5-7.5-13A7.5 7.5 0 0 1 32 19z"/>
    <circle class="il-w" cx="32" cy="26.5" r="2.6"/>`),
  // Districts: several location pins on the ground.
  districts: svg(`<ellipse class="il-a" cx="32" cy="50" rx="25" ry="6.5"/>
    <path class="il-b" d="M32 8a10 10 0 0 1 10 10c0 9-10 21-10 21S22 27 22 18A10 10 0 0 1 32 8z"/><circle class="il-w" cx="32" cy="18" r="3.6"/>
    <path class="il-w" d="M13 29a5.5 5.5 0 0 1 5.5 5.5c0 4.5-5.5 10-5.5 10s-5.5-5.5-5.5-10A5.5 5.5 0 0 1 13 29z"/>
    <path class="il-w" d="M51 29a5.5 5.5 0 0 1 5.5 5.5c0 4.5-5.5 10-5.5 10s-5.5-5.5-5.5-10A5.5 5.5 0 0 1 51 29z"/>`),
};

/** Illustration in a soft circle. */
export const illus = (name) => `<span class="f-ill">${ART[name]}</span>`;
