# Question Bank — In-House Authoring Worklist

We author every question ourselves, verifying each fact against official sources
before it lands in `data/questions.js`. No third-party question generators.

**Sources of truth (in priority order):**
1. Ohio Driver Manual HSY 7607 — `manual/hsy7607.pdf` (text: `manual/pages/`, images: `manual/render/`)
2. Official BMV Sample Test — https://www.bmv.ohio.gov/dl-sample-test.aspx (10 Qs, captured)
3. Ohio Revised Code Title 45 — for exact legal thresholds not in the manual

**Page rule:** printed manual page + 3 = PDF page. Deep-link: `manual/hsy7607.pdf#page=<PDF>`.

**Authenticity badges:**
- `bmv-official-sample` — one of the 10 official BMV questions (highest)
- `manual-verified` — fact confirmed in the manual, page cited
- `orc-verified` — fact confirmed in the Ohio Revised Code
- (nothing ships unsourced)

---

## Category worklist (work top-to-bottom, check the box when done)

| # | Category | Manual section | Printed→PDF pp. | Qs | Status |
|---|----------|----------------|-----------------|-----|--------|
| 1 | Road Signs | §4 Traffic Signs | 11→14 | 8 | ✅ done |
| 2 | Right-of-Way & Safe Driving | §4/§5 | 10→13, 16→19, 21 | 6 | ✅ done |
| 3 | Speed Limits | §4 Speed Limits | 9→12 | 5 | ✅ done |
| 4 | Pavement Markings | §4 Lane/Pavement Markings | 13→16 | 4 | ✅ done |
| 5 | Intersections | §5 Intersections/Turning | 16→19, 21 | (in RoW) | ✅ done |
| 6 | Alcohol & Drugs | §3 Alcohol, Drugs & Driving | 8→11, 25→28 | 4 | ✅ done |
| 7 | Parking Rules | §6 / ORC 4511.68 | 23→26 | 3 | ✅ done |
| 8 | Child & Seatbelt Safety | §6 Restraints | 27→30 | 4 | ✅ done |
| 9 | Emergency Vehicles | §10 Emergency/Move Over | 38→41 | 3 | ✅ done |
| — | Traffic Signals | §4 Traffic Signals | 10→13 | 4 | ✅ done |
| — | Special Conditions | §3/§7 (winter/work-zones/distracted) | 8→11, 29→32 | 4 | ✅ done |

**DONE: 45 verified questions** (42 manual-verified + 3 bmv-official-sample).
Every question source-cited & deep-linked. Corrections caught vs. old data:
school-zone speed 15→**20**, fire-hydrant distance 15ft→**10ft**, under-21 BAC
0.00→**0.02**.

---

## VERIFIED FACTS (the reference we author from)

### Speed limits (read from rendered manual p.12 / printed p.9, ORC 4511.21)
| mph | Road type |
|-----|-----------|
| 15 | Alleys within a municipal corporation |
| 20 | **School zones** (recess / children arriving-leaving) |
| 25 | Streets within a municipal corporation (residential default) |
| 35 | State routes/through highways in municipal corps outside business districts |
| 50 | State routes within municipal corps outside urban districts |
| 55 | Freeways with paved shoulders inside municipal corporations |
| 70 | Rural freeways |

⚠️ CORRECTION: school zone = **20 mph** (our old data said 15 — WRONG, fix it).

### Right-of-Way (manual p.13 / printed 10)
- Two vehicles same time at four-way / uncontrolled → **driver on the RIGHT** goes first.
- Roundabout (manual p.21 / printed 18) → **yield to traffic already circulating**; enter counterclockwise.
- Left turn → yield to oncoming/cross traffic until a safe gap.
- No stop line/crosswalk → stop at the point **before entering the roadway** where you can see.

### Traffic Signals (manual p.18 / printed 15)
- Flashing red → **treat as a stop sign**, stop + yield.
- Red → stop before the intersection / behind stop line/crosswalk.

### Alcohol (official sample test + §3)
- Only **TIME** overcomes alcohol's influence (not coffee/food/air).
- (BAC exact numbers → confirm in ORC before use.)

### Child restraints (official sample test / §6, manual p.30 / printed 27)
- Under 4 AND under 40 lb → approved safety seat.
- 4–8 yrs → booster seat unless 4'9" (57") or taller.

### Other official sample facts
- Test = 40 Q, 75% to pass.
- Parent/guardian signature required if applicant under **18**.
- Right on red → permitted after full stop + check it won't interfere with traffic/pedestrians.
- School bus on 4-lane DIVIDED highway → only vehicles behind it (same direction) must stop.

---

## Batch 01 disposition (already verified, ready to encode)
See `docs/VERIFICATION-BATCH-01.md` — 9 verified + 1 fixed (Q7 sources to sample
test) + 1 dropped (Q8 business-district number). These feed categories 2 & 3.
