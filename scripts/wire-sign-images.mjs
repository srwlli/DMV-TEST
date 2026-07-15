#!/usr/bin/env node
/**
 * Wire manual-cropped sign images into the TEST questions (data/questions.js).
 *
 * Only questions that SHOW a specific sign and ask the student to identify/act
 * on it get an image. Conceptual questions (e.g. "what color are warning
 * signs?") are left imageless so the picture doesn't give away the answer.
 *
 * Signs page (road-signs.js) is untouched — it stays on the Wikimedia SVGs.
 */
import fs from 'node:fs';

const FILE = 'data/questions.js';
const IMG = (name) => `assets/signs/manual/${name}.png`;

// question id -> crop file (manual sign graphic). Absent ids stay image_url: null.
const MAP = {
  'sign-001': 'reg-stop',              // STOP octagon
  'sign-004': 'warn-roundabout',       // circular arrows -> roundabout
  'sign-005': 'warn-railroad',         // X + RR
  'sign-007': 'reg-yield',             // Yield
  'sign-008': 'warn-two-way',          // two opposite arrows
  'sign-019': 'warn-downhill',         // downhill grade
  'sign-020': 'warn-bicycle-crossing', // bicycle symbol (warning)
  'sign-021': 'warn-sharp-right',      // sharp right turn
  'sign-022': 'warn-limited-clearance',// limited clearance 12'-6"
  'sign-023': 'warn-road-branches',    // road branches (Y)
  'sign-025': 'reg-one-way',           // one-way road
  'sign-026': 'proh-no-bicycles',      // bicycle in red circle/slash
  'sign-027': 'proh-no-u-turn',        // No U-Turn
  'sign-028': 'warn-intersection-t',   // intersection ahead turn L/R (T)
  'sign-029': 'warn-no-passing',       // passing prohibited
  'sign-030': 'warn-narrow-bridge',    // vehicle nearest bridge (one-lane bridge)
  'sign-034': 'reg-school-speed',      // school-zone speed
  'sign-035': 'warn-railroad',         // railroad crossing
  'sign-036': 'warn-ped-crossing',     // pedestrian symbol
  'sign-037': 'warn-roundabout',       // roundabout symbol
  'sign-038': 'proh-no-left-turn',     // No Left Turn
  'sign-039': 'warn-road-curves',      // road curving ahead
};
// sign-002 (do-not-enter is the DESCRIBED answer? no: asks shape/color of a
// prohibitory sign -> conceptual, skip), sign-026 uses no-bicycles.
// Add Do Not Enter to a question that shows it: none asks it directly, so it
// remains catalog-only.

let src = fs.readFileSync(FILE, 'utf8');
let changed = 0;
const missing = [];

for (const [id, crop] of Object.entries(MAP)) {
  const cropPath = IMG(crop);
  if (!fs.existsSync(cropPath)) { missing.push(`${id} -> ${cropPath} (crop missing)`); continue; }
  // Find the block for this id and replace its image_url: null with the crop.
  const idRe = new RegExp(`(id: '${id}',[\\s\\S]*?)image_url: null`, 'm');
  if (!idRe.test(src)) { missing.push(`${id} (block or image_url: null not found)`); continue; }
  src = src.replace(idRe, `$1image_url: '${cropPath}'`);
  changed++;
}

fs.writeFileSync(FILE, src);
console.log(`Wired ${changed} sign images into ${FILE}`);
if (missing.length) { console.log('SKIPPED:'); missing.forEach(m => console.log('  ' + m)); }
