# DMV-TEST — Enhancements

Personal project planning doc (`enhancements.md`), organized by category. Not a
stub, not in the CodeRef ecosystem registry. This is the source of truth for
planned work on the Ohio DMV Test Prep app.

**Core principle (operator directive):** Nothing enters the app without a source.
Everything cited or displayed traces to the official Ohio Driver Manual
(`hsy7607.pdf`, "Ohio Digest of Motor Vehicle Laws", 55 pages) or another
official source.

---

## Category A — Icons (remove all emoji)

**Goal:** Zero emoji anywhere. Replace UI glyphs with a real icon library.

- **Library:** Lucide via CDN (`<script src="https://unpkg.com/lucide@latest">`,
  then `<i data-lucide="name">` + `lucide.createIcons()`). No build step — fits
  the static site.
- **Files to strip + rewire:** `index.html`, `ui.js`, `app.js`,
  `data/questions.js`, `data/road-signs.js`.
- **UI touchpoints:** header menu/theme toggle, 4 home cards, quiz nav
  (prev/next/skip), feedback states (correct/incorrect), study category icons,
  progress stats, resource link.

---

## Category B — Question authenticity + source citations

**Goal:** Maximize authentic questions AND cite every one to the manual.

- **Authenticity (operator directive):** Identify as many ACTUAL Ohio test
  questions as possible, or get as close as we can in FORMAT, LANGUAGE, and
  PRESENTATION to the real BMV exam. Prefer real BMV sample-test questions and
  manual-verbatim phrasing over paraphrase.
- **Pool decision (operator):** Verify + keep 40. Map each existing question to
  its exact manual page; rewrite any that can't be sourced. (Pool expansion to
  100+ deferred.)
- **Citation:** Add `source: { page: N, url: "manual/hsy7607.pdf#page=N" }` to
  every question. Render "Source: Ohio Driver Manual, p.N" under each explanation.
- **Foundation ready:** Manual text extracted to `manual/hsy7607.txt` with page
  breaks — enables building the question→page map.

### Official sources — what Ohio actually publishes (verified 2026-07-14)

Ohio publishes NO standalone study guide. There are exactly TWO official study
resources, and the manual IS the study guide:

1. **Ohio Driver Manual (HSY 7607)** — the one official study document. ✅ have it.
2. **Official BMV Sample Knowledge Test** — an interactive 10-question practice
   test at https://www.bmv.ohio.gov/dl-sample-test.aspx. These 10 are the ONLY
   real, BMV-authored questions published publicly. ✅ captured verbatim below.

**Authenticity hierarchy (how "official" a question can be):**
1. `bmv-official-sample` — the BMV's own 10 sample questions (most authentic).
2. `manual-derived` — written from verified manual facts (Perplexity's set).
3. `unsourced` — the original 40 I wrote (must verify/fix or drop).

**The 10 official BMV sample questions (verbatim, to encode first):**
1. Most important technique to avoid crashes on ice/snow → *reduce speed & increase following distance*
2. Flashing red signal = same as → *a stop sign*
3. License application needs parent/guardian signature when applicant under → *18*
4. Residential speed limit unless posted otherwise → *25 mph*
5. Child restraints required for → *infants/children under 4 & under 40 lb in safety seats; 4–8 yr in boosters unless 4'9"+*
6. On a 4-lane divided highway, who stops for a stopped school bus → *only vehicles approaching from the rear (same direction)*
7. Two vehicles arrive simultaneously, no controls → *vehicle approaching from the right*
8. What overcomes alcohol's influence → *time*
9. When may a driver turn right on red → *after stopping and checking the turn won't interfere with traffic/pedestrians*
10. Where to stop with no marked stop line/crosswalk → *at the point nearest the intersecting roadway with a view of traffic*

Source for all 10: https://www.bmv.ohio.gov/dl-sample-test.aspx (official BMV).
These become the seed of the verified pool; merge + verify the 40 + Perplexity's
10 around them.

---

## Category C — Road-sign images (crop from the manual)

**Goal:** Replace emoji sign placeholders with official sign images.

- **Source (operator directive):** CROP signs directly from `hsy7607.pdf` — the
  exact official Ohio images, most authoritative source possible. Tools ready:
  Poppler `pdftoppm` (render pages to PNG) + image crop.
- **Output:** `assets/signs/*.png`, referenced by `data/road-signs.js`
  (`image_url` field, currently null/emoji).
- **Citation:** Each sign records the manual page it was cropped from.

---

## Category D — Study Mode categories (identify only)

**Goal:** Study Mode renders empty — define the category list, don't populate.

**Current-state finding:** Study Mode was not just empty, it was BROKEN.
`ui.js renderStudyCategories()` had an undeclared `categoryMap = {}` (missing
`const`) and grouped by the 2 top-level `category` values — so it could only ever
show 2 buckets, never the 9 topics. This enhancement replaces that with a
definition-driven registry.

**Structure decision: category registry (definition-driven).** A single
`STUDY_CATEGORIES` array is the source of truth. Each entry declares `id`,
display `name`, Lucide `icon`, `manualPages` (filled from research — source
principle), and a `match(q)` predicate mapping questions into it. Study Mode,
Progress, and Weak Areas all read this one registry. Categories with 0 matching
questions still render (disabled shell), so the grid never looks broken.

**The 9 categories (operator granularity), with data mapping:**

| # | Category | Lucide icon | Owns subcategories |
|---|----------|-------------|--------------------|
| 1 | Road Signs | `signpost` | all `category==='road-signs'` (regulatory/warning/guide/work-zone signs) |
| 2 | Right-of-Way & Safe Driving | `git-fork` | right-of-way, passing, following-distance, turn-signals, pedestrians, headlights |
| 3 | Speed Limits | `gauge` | speed-limits, school-zones |
| 4 | Pavement Markings | `road` | pavement-markings |
| 5 | Intersections | `traffic-cone` | intersections |
| 6 | Alcohol & Drugs | `wine` | impaired-driving |
| 7 | Parking Rules | `circle-parking` | parking |
| 8 | Child & Seatbelt Safety | `baby` | child-safety, seatbelt |
| 9 | Emergency Vehicles | `siren` | emergency-vehicles |

**Orphan-fold decision (operator, 2026-07-14):** 5 data subcategories that fit
none of the 9 (headlights, following-distance, passing, turn-signals,
pedestrians) are FOLDED into category 2, which broadens from "Right-of-Way" to
"Right-of-Way & Safe Driving". Stays at 9; nothing lost.

- **Scope:** Identify + wire the registry + render the 9 category shells in Study
  Mode. Do NOT hand-assign questions — the `match(q)` predicates derive
  membership from existing data. `manualPages` stays empty until research lands.
- **Composes with Category A:** the `icon` field feeds Lucide directly.

---

## Sequencing

1. **Read the manual** (done — text extracted) → build question→page + sign→page maps.
2. **Category B** — verify/cite/rewrite the 40 questions (depends on the map).
3. **Category C** — crop sign PNGs from the manual, wire `image_url`.
4. **Category A** — strip emoji, wire Lucide across all files.
5. **Category D** — identify Study Mode categories.
6. **Verify** — serve locally, confirm zero emoji, icons + sign images render,
   source links resolve.
7. **Commit + push** — Pages auto-republishes (branch source, no Actions).

---

## Reference
- Official manual (local): `manual/hsy7607.pdf` · text: `manual/hsy7607.txt`
- Official manual (web): https://dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/hsy7607.pdf
- Deployment: static site, GitHub Pages branch-source. See `DEPLOYMENT.md`.
