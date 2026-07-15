# Reverse-Engineering the Ohio Knowledge Test

What the 10 official BMV sample questions + the manual's own structure reveal
about the real test — and how to build more realistic, sourced questions.

**Sources (all official):**
- Ohio Driver Manual HSY 7607 (`manual/hsy7607.pdf`, 55 PDF pages)
- Official BMV Sample Test: https://www.bmv.ohio.gov/dl-sample-test.aspx
- **Ohio Administrative Code Rule 4501:1-1-08** (the test-structure regulation):
  https://codes.ohio.gov/ohio-administrative-code/rule-4501:1-1-08

## ⚠️ CORRECTION (2026-07-15): the 20/20 split IS official

An earlier version of this doc called the "20 signs / 20 rules" split a
third-party myth. **That was wrong.** OAC Rule 4501:1-1-08 defines the written
test in two parts:
- **Part Two — Traffic laws / rules of the road:** minimum **20** questions,
  equally weighted; must answer **75%** correctly.
- **Part Three — Highway warnings & traffic signs:** minimum **20** questions,
  equally weighted; must answer **75%** correctly.

So the real test is **20 rules + 20 signs = 40**, and each part must be passed
INDEPENDENTLY at 75% (15/20 each) — not merely 75% overall. The manual and the
10-question sample don't state this; the Administrative Code does.

**Implications for the app:**
1. Need **20 road-sign questions** (currently only 8 → author 12 more).
2. Quiz selection should enforce a true 20/20 split.
3. Scoring should report per-section pass (15/20 each), not just overall 75%.

**Key mechanical fact:** printed manual page + 3 = PDF page. So a fact on printed
p.10 deep-links as `manual/hsy7607.pdf#page=13`. Verified against 3 anchors
(Right-of-Way 10→13, Traffic Signs 11→14, Speed Limits 9→12).

---

## 1. Category breakdown of the 10 official questions

| # | Official question topic | Manual section | Printed p. | PDF p. |
|---|------------------------|----------------|-----------|--------|
| 1 | Ice/snow driving technique | S7 Winter Driving | 29 | 32 |
| 2 | Flashing red = stop sign | S4 Traffic Signals | 10 | 13 |
| 3 | Parent signature under 18 | S1 Getting Your License | 2–3 | 5–6 |
| 4 | Residential speed limit (25) | S4 Speed Limits | 9 | 12 |
| 5 | Child restraints / boosters | S6 Child Passenger Restraints | 27 | 30 |
| 6 | School bus stop, 4-lane divided | S9 Sharing the Road (buses) | ~35 | ~38 |
| 7 | Right-of-way, simultaneous arrival | S4 Right-of-Way | 10 | 13 |
| 8 | Alcohol — only *time* sobers you | S3 Alcohol, Drugs & Driving | 8 | 11 |
| 9 | Right turn on red | S5 Intersections/Turning | 16–18 | 19–21 |
| 10 | Where to stop, no stop line/crosswalk | S4 Traffic Signals / S5 Stopping | 10–15 | 13–18 |

### What the distribution tells us

- **Only 1 of 10 is a pure road-sign question** (Q2, arguably signals not signs).
  The much-repeated "20 signs / 20 rules" split is a **third-party claim, NOT in
  the manual** — and the official sample skews heavily toward **rules/behavior**,
  not sign identification. Our app's 20/20 assumption is unverified.
- **The test spans the WHOLE manual**, not just "Rules of the Road." Winter
  driving (S7), alcohol (S3), child restraints (S6), licensing procedure (S1)
  all appear. The manual itself says the test covers "all materials in this
  manual."
- **Heavy on numbers/thresholds**: 25 mph, under-18, 40 lb / 4'9", "only time."
  These exact-value facts are the test's favorite question shape.
- **Scenario framing**: "when two vehicles arrive at the same time…", "when
  traveling on a four-lane divided highway…". Real questions set a SITUATION,
  not "define X."

---

## 2. Ohio's official topic taxonomy (from the manual TOC)

This is the authoritative list of what the test can cover — use it to source new
questions. (printed page → PDF page = +3)

| Section | Topic | Printed p. |
|---------|-------|-----------|
| S3 | Alcohol, Drugs, and Driving | 8 |
| S3 | Distracted / Aggressive Driving, Fatigue, Vision | 7 |
| S4 | Speed Limits | 9 |
| S4 | Right-of-Way | 10 |
| S4 | Traffic Signals | 10 |
| S4 | Traffic Signs | 11 |
| S4 | Lane / Pavement Markings | 13 |
| S4 | Two-Way Left Turn Only Lane | 14 |
| S4 | Crosswalks | 14 |
| S5 | Intersections and Turning | 16 |
| S5 | Roundabouts / Traffic Circles | 18 |
| S6 | Child Passenger Restraints / Safety Laws | 27 |
| S6 | Safety Restraints (seatbelts) | 6 |
| S7 | Headlights, Night, Fog, Winter Driving | 28–29 |
| S7 | Work Zones | 29 |
| S8 | Speed / Space Management, Visual Search | 30–31 |
| S9 | Pedestrians, Motorcyclists, Bicyclists | 34–35 |
| S9 | Emergency/Commercial Vehicles, Move Over | 36–38 |
| S10 | Avoiding Crashes, Crash Procedure | 39–41 |

### Maps cleanly onto our 9 Study Mode categories
Our topic-based categories (Road Signs, Right-of-Way & Safe Driving, Speed
Limits, Pavement Markings, Intersections, Alcohol & Drugs, Parking, Child &
Seatbelt Safety, Emergency Vehicles) all trace to real manual sections above.
Every study category now has a sourced home + page range.

---

## 3. How to build more realistic questions (the recipe)

Match the official style, sourced to the manual:

1. **Pull a specific fact** from a manual section (e.g. "school zone speed is
   20 mph when children are present" — verify exact value in the PDF).
2. **Frame as a scenario or threshold**, mirroring official phrasing
   ("Unless posted otherwise…", "When two vehicles…", "…which is required").
3. **Cite the PDF page** (printed + 3) so every question deep-links to proof.
4. **Badge honestly**: `bmv-official-sample` (the 10) vs `manual-verified`
   (ours, with a confirmed page) vs never-unsourced.
5. **Weight the pool like the sample**: majority rules/behavior/scenarios,
   a minority pure sign-ID — not a forced 50/50.

---

## 4. Additional official sources to pull from

Beyond the manual + sample test, still official (Ohio.gov / federal):
- **Ohio Revised Code (ORC) Title 45** — the actual traffic statutes the manual
  summarizes (codes.ohio.gov). Authoritative for exact legal thresholds.
- **Ohio BMV GDL page** — https://www.bmv.ohio.gov/dl-gdl.aspx (permit rules).
- **NOT official / do not source from**: dmv.org, driving-tests.org, and other
  third-party practice sites. They're where the unverified "20/20 split" and
  fabricated questions come from.

---

## Bottom line
The 10 official questions confirm: the test is **manual-wide, rules-heavy,
scenario-and-threshold framed**. We can't get more than 10 truly-official
questions, but we can author `manual-verified` ones in the exact official style,
each deep-linked to its page — a legitimately realistic, fully-sourced pool.
