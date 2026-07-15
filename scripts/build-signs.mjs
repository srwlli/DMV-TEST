/**
 * build-signs.mjs — download the core set of official MUTCD road-sign images
 * (public domain, US DOT) from Wikimedia Commons into assets/signs/, then
 * regenerate data/road-signs.js so every sign carries a local image_url that
 * traces to a real MUTCD sign code.
 *
 * Source discipline: each entry names its MUTCD code and the exact Wikimedia
 * Commons file it came from. Nothing is shown without a verifiable source.
 *
 * Run:  node scripts/build-signs.mjs
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ASSET_DIR = path.join(ROOT, 'assets', 'signs');
const UA = 'Mozilla/5.0 (DMV-TEST study app; +https://srwlli.github.io/DMV-TEST)';

// Core set — the most common / most-tested Ohio signs. Every `wiki` value is a
// Wikimedia Commons filename for a public-domain MUTCD sign produced by US DOT.
// `file` is the local basename we save it as (image_url = assets/signs/<file>).
const SIGNS = [
  // ── Regulatory ──────────────────────────────────────────────────────────
  { id: 'reg-stop', name: 'Stop', type: 'regulatory', mutcd: 'R1-1', wiki: 'MUTCD_R1-1.svg',
    description: 'Red octagon with white STOP legend.',
    meaning: 'Come to a complete stop. Yield to all traffic and pedestrians before proceeding.' },
  { id: 'reg-yield', name: 'Yield', type: 'regulatory', mutcd: 'R1-2', wiki: 'MUTCD_R1-2.svg',
    description: 'Downward-pointing red-and-white triangle.',
    meaning: 'Slow down and give the right-of-way to traffic and pedestrians; stop if necessary.' },
  { id: 'reg-4way', name: 'All-Way Stop', type: 'regulatory', mutcd: 'R1-3P', wiki: 'MUTCD_R1-3P.svg',
    description: 'ALL WAY plaque mounted below a STOP sign.',
    meaning: 'Every approach to the intersection must stop. The first to stop goes first.' },
  { id: 'reg-do-not-enter', name: 'Do Not Enter', type: 'regulatory', mutcd: 'R5-1', wiki: 'MUTCD_R5-1.svg',
    description: 'Red circle with a white horizontal bar.',
    meaning: 'Do not enter the roadway from your direction — traffic flows the opposite way.' },
  { id: 'reg-wrong-way', name: 'Wrong Way', type: 'regulatory', mutcd: 'R5-1a', wiki: 'MUTCD_R5-1a.svg',
    description: 'Red rectangle reading WRONG WAY.',
    meaning: 'You are going against traffic. Stop and turn around.' },
  { id: 'reg-one-way', name: 'One Way', type: 'regulatory', mutcd: 'R6-1R', wiki: 'MUTCD_R6-1R.svg',
    description: 'Black-and-white ONE WAY arrow sign.',
    meaning: 'Traffic flows only in the direction of the arrow.' },
  { id: 'reg-no-uturn', name: 'No U-Turn', type: 'regulatory', mutcd: 'R3-4', wiki: 'MUTCD_R3-4.svg',
    description: 'U-turn arrow with a red slash.',
    meaning: 'U-turns are prohibited here.' },
  { id: 'reg-no-left', name: 'No Left Turn', type: 'regulatory', mutcd: 'R3-2', wiki: 'MUTCD_R3-2.svg',
    description: 'Left-turn arrow with a red slash.',
    meaning: 'Left turns are prohibited here.' },
  { id: 'reg-no-right', name: 'No Right Turn', type: 'regulatory', mutcd: 'R3-1', wiki: 'MUTCD_R3-1.svg',
    description: 'Right-turn arrow with a red slash.',
    meaning: 'Right turns are prohibited here.' },
  { id: 'reg-no-turn-on-red', name: 'No Turn on Red', type: 'regulatory', mutcd: 'R10-11', wiki: 'MUTCD_R10-11.svg',
    description: 'NO TURN ON RED legend sign.',
    meaning: 'You may not turn while the signal is red at this intersection.' },
  { id: 'reg-keep-right', name: 'Keep Right', type: 'regulatory', mutcd: 'R4-7', wiki: 'MUTCD_R4-7.svg',
    description: 'Diagonal arrow directing traffic to the right.',
    meaning: 'Keep to the right of a divider or obstruction.' },
  { id: 'reg-no-passing', name: 'Do Not Pass', type: 'regulatory', mutcd: 'R4-1', wiki: 'MUTCD_R4-1.svg',
    description: 'DO NOT PASS legend sign.',
    meaning: 'Passing is prohibited in this zone.' },
  { id: 'reg-speed-25', name: 'Speed Limit 25', type: 'regulatory', mutcd: 'R2-1', wiki: 'Speed_Limit_25_sign.svg',
    description: 'White rectangle: SPEED LIMIT 25.',
    meaning: 'Maximum legal speed is 25 mph (the default on municipal streets unless posted otherwise).' },
  { id: 'reg-speed-35', name: 'Speed Limit 35', type: 'regulatory', mutcd: 'R2-1', wiki: 'Speed_Limit_35_sign.svg',
    description: 'White rectangle: SPEED LIMIT 35.',
    meaning: 'Maximum legal speed is 35 mph.' },
  { id: 'reg-speed-55', name: 'Speed Limit 55', type: 'regulatory', mutcd: 'R2-1', wiki: 'Speed_Limit_55_sign.svg',
    description: 'White rectangle: SPEED LIMIT 55.',
    meaning: 'Maximum legal speed is 55 mph.' },
  { id: 'reg-speed-70', name: 'Speed Limit 70', type: 'regulatory', mutcd: 'R2-1', wiki: 'Speed_Limit_70_sign.svg',
    description: 'White rectangle: SPEED LIMIT 70.',
    meaning: 'Maximum legal speed is 70 mph (Ohio rural freeways).' },
  { id: 'reg-no-parking', name: 'No Parking', type: 'regulatory', mutcd: 'R7-1', wiki: 'MUTCD_R7-1.svg',
    description: 'NO PARKING ANY TIME legend sign.',
    meaning: 'Parking is prohibited here.' },
  { id: 'reg-no-bikes', name: 'No Bicycles', type: 'regulatory', mutcd: 'R5-6', wiki: 'MUTCD_R5-6.svg',
    description: 'Bicycle symbol with a red slash.',
    meaning: 'Bicycles are prohibited on this roadway.' },
  { id: 'reg-no-trucks', name: 'No Trucks', type: 'regulatory', mutcd: 'R5-2', wiki: 'MUTCD_R5-2.svg',
    description: 'Truck symbol with a red slash.',
    meaning: 'Trucks are prohibited on this roadway.' },
  { id: 'reg-no-peds', name: 'No Pedestrians', type: 'regulatory', mutcd: 'R9-3', wiki: 'MUTCD_R9-3.svg',
    description: 'Pedestrian symbol with a red slash.',
    meaning: 'Pedestrians are prohibited here.' },
  { id: 'reg-hov', name: 'HOV Lane', type: 'regulatory', mutcd: 'R3-10', wiki: 'MUTCD_R3-10.svg',
    description: 'Diamond symbol reserving a lane for high-occupancy vehicles.',
    meaning: 'This lane is reserved for high-occupancy vehicles during posted hours.' },

  // ── Warning ─────────────────────────────────────────────────────────────
  { id: 'warn-ped', name: 'Pedestrian Crossing', type: 'warning', mutcd: 'W11-2', wiki: 'MUTCD_W11-2.svg',
    description: 'Yellow diamond with a pedestrian symbol.',
    meaning: 'Watch for pedestrians crossing ahead.' },
  { id: 'warn-school', name: 'School Crossing', type: 'warning', mutcd: 'S1-1', wiki: 'MUTCD_S1-1.svg',
    description: 'Fluorescent yellow-green pentagon with two walking figures.',
    meaning: 'School zone or crossing ahead — watch for children.' },
  { id: 'warn-curve-right', name: 'Curve Right', type: 'warning', mutcd: 'W1-2R', wiki: 'MUTCD_W1-2R.svg',
    description: 'Yellow diamond with a curving arrow to the right.',
    meaning: 'The road curves to the right ahead; reduce speed.' },
  { id: 'warn-turn-left', name: 'Turn Left', type: 'warning', mutcd: 'W1-1L', wiki: 'MUTCD_W1-1L.svg',
    description: 'Yellow diamond with a sharp arrow to the left.',
    meaning: 'A sharp turn to the left is ahead; slow down.' },
  { id: 'warn-winding', name: 'Winding Road', type: 'warning', mutcd: 'W1-5R', wiki: 'MUTCD_W1-5R.svg',
    description: 'Yellow diamond with a winding-road arrow.',
    meaning: 'A series of curves is ahead; reduce speed.' },
  { id: 'warn-signal', name: 'Signal Ahead', type: 'warning', mutcd: 'W3-3', wiki: 'MUTCD_W3-3.svg',
    description: 'Yellow diamond with a traffic-signal symbol.',
    meaning: 'A traffic signal is ahead; be prepared to stop.' },
  { id: 'warn-stop-ahead', name: 'Stop Ahead', type: 'warning', mutcd: 'W3-1', wiki: 'MUTCD_W3-1.svg',
    description: 'Yellow diamond with a red stop-sign symbol.',
    meaning: 'A stop sign is ahead; prepare to stop.' },
  { id: 'warn-yield-ahead', name: 'Yield Ahead', type: 'warning', mutcd: 'W3-2', wiki: 'MUTCD_W3-2.svg',
    description: 'Yellow diamond with a yield-sign symbol.',
    meaning: 'A yield sign is ahead; prepare to yield.' },
  { id: 'warn-slippery', name: 'Slippery When Wet', type: 'warning', mutcd: 'W8-5', wiki: 'MUTCD_W8-5.svg',
    description: 'Yellow diamond with a car and skid marks.',
    meaning: 'The road is slippery when wet; slow down.' },
  { id: 'warn-merge', name: 'Merge', type: 'warning', mutcd: 'W4-1R', wiki: 'MUTCD_W4-1R.svg',
    description: 'Yellow diamond with two lines merging.',
    meaning: 'Traffic merges ahead; adjust speed and position.' },
  { id: 'warn-divided-begins', name: 'Divided Highway Begins', type: 'warning', mutcd: 'W6-1', wiki: 'MUTCD_W6-1.svg',
    description: 'Yellow diamond showing a roadway splitting around a median.',
    meaning: 'A divided highway begins ahead; keep right of the median.' },
  { id: 'warn-divided-ends', name: 'Divided Highway Ends', type: 'warning', mutcd: 'W6-2', wiki: 'MUTCD_W6-2.svg',
    description: 'Yellow diamond showing a divided roadway rejoining.',
    meaning: 'The divided highway ends ahead; two-way traffic resumes.' },
  { id: 'warn-two-way', name: 'Two-Way Traffic', type: 'warning', mutcd: 'W6-3', wiki: 'MUTCD_W6-3.svg',
    description: 'Yellow diamond with two opposing vertical arrows.',
    meaning: 'You are entering or continuing on a two-way road.' },
  { id: 'warn-lane-ends', name: 'Right Lane Ends', type: 'warning', mutcd: 'W9-1', wiki: 'MUTCD_W9-1.svg',
    description: 'Yellow diamond showing the right lane tapering.',
    meaning: 'The right lane ends ahead; merge left.' },
  { id: 'warn-rr', name: 'Railroad Crossing Ahead', type: 'warning', mutcd: 'W10-1', wiki: 'MUTCD_W10-1.svg',
    description: 'Yellow circle with an X and RR.',
    meaning: 'A railroad crossing is ahead; be prepared to stop for trains.' },
  { id: 'warn-bike', name: 'Bicycle Crossing', type: 'warning', mutcd: 'W11-1', wiki: 'MUTCD_W11-1.svg',
    description: 'Yellow diamond with a bicycle symbol.',
    meaning: 'Watch for bicyclists crossing or sharing the road.' },
  { id: 'warn-deer', name: 'Deer Crossing', type: 'warning', mutcd: 'W11-3', wiki: 'MUTCD_W11-3.svg',
    description: 'Yellow diamond with a leaping-deer symbol.',
    meaning: 'Watch for deer and other animals crossing.' },
  { id: 'warn-hill', name: 'Hill / Steep Grade', type: 'warning', mutcd: 'W7-1', wiki: 'MUTCD_W7-1.svg',
    description: 'Yellow diamond with a truck on a downgrade.',
    meaning: 'A steep downgrade is ahead; check your brakes and speed.' },
  { id: 'warn-narrow', name: 'Road Narrows', type: 'warning', mutcd: 'W5-1', wiki: 'MUTCD_W5-1.svg',
    description: 'Yellow diamond showing the road narrowing.',
    meaning: 'The road narrows ahead.' },
  { id: 'warn-cross', name: 'Cross Road', type: 'warning', mutcd: 'W2-1', wiki: 'MUTCD_W2-1.svg',
    description: 'Yellow diamond with a plus-shaped intersection symbol.',
    meaning: 'A crossroad intersection is ahead.' },
  { id: 'warn-side', name: 'Side Road', type: 'warning', mutcd: 'W2-2R', wiki: 'MUTCD_W2-2R.svg',
    description: 'Yellow diamond with a T/side-road symbol.',
    meaning: 'A side road enters from the right ahead.' },

  // ── Guide / Work Zone ────────────────────────────────────────────────────
  { id: 'work-workers', name: 'Road Work / Workers', type: 'work-zone', mutcd: 'W21-1a', wiki: 'MUTCD_W21-1a.svg',
    description: 'Orange diamond with a worker-with-shovel symbol.',
    meaning: 'Workers are on or near the roadway; slow down and use caution.' },
  { id: 'work-ahead', name: 'Road Work Ahead', type: 'work-zone', mutcd: 'W20-1', wiki: 'MUTCD_W20-1.svg',
    description: 'Orange diamond reading ROAD WORK AHEAD.',
    meaning: 'A work zone is ahead; be prepared for changes.' },
  { id: 'work-flagger', name: 'Flagger Ahead', type: 'work-zone', mutcd: 'CW20-7', wiki: 'MUTCD_CW20-7.svg',
    description: 'Orange diamond with a flagger symbol.',
    meaning: 'A flagger controls traffic ahead; obey their signals.' },
  { id: 'work-detour', name: 'Detour', type: 'work-zone', mutcd: 'M4-9R', wiki: 'MUTCD_M4-9R.svg',
    description: 'Orange DETOUR sign with a directional arrow.',
    meaning: 'Follow the detour route in the direction of the arrow.' },
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// Fetch with polite retry/backoff so Wikimedia doesn't rate-limit (HTTP 429).
async function download(wiki, dest, attempt = 0) {
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(wiki)}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (res.status === 429 && attempt < 5) {
    const wait = 2000 * (attempt + 1);
    console.log(`  429 rate-limited, backing off ${wait}ms (attempt ${attempt + 1})`);
    await sleep(wait);
    return download(wiki, dest, attempt + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const ct = res.headers.get('content-type') || '';
  const buf = Buffer.from(await res.arrayBuffer());
  if (!ct.includes('svg') && !ct.includes('image') || buf.length < 200) {
    throw new Error(`unexpected content-type ${ct} / size ${buf.length}`);
  }
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  if (!existsSync(ASSET_DIR)) await mkdir(ASSET_DIR, { recursive: true });

  const ok = [];
  const failed = [];
  for (const s of SIGNS) {
    const file = `${s.id}.svg`;
    const dest = path.join(ASSET_DIR, file);
    // Resume: skip files already downloaded so re-runs only fetch what's missing.
    if (existsSync(dest)) {
      s.file = file;
      ok.push({ id: s.id, size: 0 });
      console.log(`skip ${s.id.padEnd(24)} (already present)`);
      continue;
    }
    try {
      const size = await download(s.wiki, dest);
      s.file = file;
      ok.push({ id: s.id, size });
      console.log(`ok   ${s.id.padEnd(24)} ${s.wiki} (${size}b)`);
      await sleep(400); // be polite between requests
    } catch (err) {
      failed.push({ id: s.id, wiki: s.wiki, err: String(err.message || err) });
      console.log(`FAIL ${s.id.padEnd(24)} ${s.wiki} — ${err.message || err}`);
    }
  }

  // Emit data/road-signs.js from the signs that downloaded successfully.
  const kept = SIGNS.filter(s => s.file);
  const body = kept.map(s => `  {
    id: 'sign-${s.id}',
    name: ${JSON.stringify(s.name)},
    type: ${JSON.stringify(s.type)},
    mutcd: ${JSON.stringify(s.mutcd)},
    image_url: 'assets/signs/${s.file}',
    description: ${JSON.stringify(s.description)},
    meaning: ${JSON.stringify(s.meaning)},
  }`).join(',\n');

  const out = `/**
 * Ohio Road Signs — core reference.
 *
 * Every sign here is an official MUTCD sign (US DOT, public domain). The image
 * is a local copy of the Wikimedia Commons MUTCD file named by \`mutcd\`, saved
 * under assets/signs/. Regenerate with: node scripts/build-signs.mjs
 */

const ROAD_SIGNS = [
${body}
];

if (typeof module !== 'undefined') module.exports = ROAD_SIGNS;
`;
  await writeFile(path.join(ROOT, 'data', 'road-signs.js'), out, 'utf8');

  console.log(`\n${ok.length} downloaded, ${failed.length} failed, ${kept.length} written to data/road-signs.js`);
  if (failed.length) {
    console.log('Failed (left out of the catalog):');
    failed.forEach(f => console.log(`  - ${f.id} (${f.wiki}): ${f.err}`));
  }
}

main().catch(err => { console.error(err); process.exit(1); });
