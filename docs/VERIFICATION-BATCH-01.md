# Verification — Batch 01 (Right-of-Way + Speed Limits)

12 questions from Perplexity, checked against the local manual (`manual/pages/`).
Offset: printed page + 3 = PDF page. Verdict per question below.

**Legend:** ✅ VERIFIED (fact found in manual, page assigned) · ⚠️ FIX (true but
wording/source needs adjustment) · ❌ DROP (can't verify from manual).

## Right-of-Way (6)

| # | Question | Verdict | Real source | Note |
|---|----------|---------|-------------|------|
| 1 | Uncontrolled intersection, same time → driver on right | ✅ | PDF p.13 (printed 10) | Manual p.13: "driver on your right at a four-way intersection if both arrive at the same time." Exact match. |
| 2 | Four-way stop, same time → driver on right | ✅ | PDF p.13 | Same rule as Q1. NOTE: near-duplicate of Q1 — keep one, or differentiate framing. |
| 3 | Roundabout → yield to traffic already in circle | ✅ | PDF p.21 (printed 18) | Manual p.21: "yielding the right-of-way to circulating traffic." Verified. Section is §5 (Roundabouts), NOT §4 — Perplexity's section was wrong. |
| 4 | No stop line/crosswalk → stop at edge of intersecting roadway | ✅ | PDF p.18 (printed 15) | Manual p.18: stop "a point prior to entering the roadway." Matches. This is also official sample Q10. |
| 5 | Left turn with oncoming → turn when safe gap | ✅ | PDF p.19 (printed 16) | Manual p.19 covers oncoming/cross traffic before turning. Verified. |
| 6 | Flashing red → treat as stop + yield | ✅ | PDF p.18 (printed 15) | Manual p.18: "At a flashing red traffic signal, yielding to all..." Verified. This overlaps official sample Q2. |

## Speed Limits (6)

| # | Question | Verdict | Real source | Note |
|---|----------|---------|-------------|------|
| 7 | Residential default → 25 mph | ⚠️ FIX | BMV Sample Test Q4 (not manual body) | The manual's speed VALUES are rendered as GRAPHICS — pdftotext recovers no digits, and the manual never says "residential = 25 mph" in text. The 25-mph-residential fact is confirmed by the OFFICIAL SAMPLE TEST, so cite THAT as source, not a manual page. |
| 8 | Business district default → 25 mph | ❌ DROP | unverified | Manual lists "business district" as a legal category but the mph value is in the graphic table, unreadable. No official-text confirmation of the specific number. Drop unless we read the value off the PDF image manually. |
| 9 | School zone → follow posted school-zone limit | ✅ | PDF p.12 (printed 9) | Manual p.12 lists "School Zones during recess and while children are arriving/leaving." Concept verified (posted reduced limit); exact mph is graphic. Keep as concept question (no specific number needed). |
| 10 | Freeway, lower posted sign → follow the sign | ✅ | PDF p.12 + general | Posted-limit-overrides principle is manual-supported. Verified as concept. |
| 11 | Multilane, none posted → follow posted limit for road type | ✅ | PDF p.12 | "Reasonable speed / posted limit" principle, manual p.12. Verified as concept. |
| 12 | Work zone → reduce speed, watch for workers | ✅ | PDF p.32 (printed 29) | Manual p.32 "WORK ZONES... dangerous places... approaching a Work Zone." Verified. Section is §7 (Perplexity got this one right). This is a work-zone Q, not really "speed limits" — recategorize. |

## Summary
- **VERIFIED (keep): 9** — Q1, Q2, Q3, Q4, Q5, Q6, Q9, Q10, Q11 (+ Q12 recategorized to work-zone/special-conditions).
- **FIX (keep, change source): 1** — Q7 (cite BMV Sample Test, not a manual page).
- **DROP: 1** — Q8 (business-district mph unverifiable from text).
- **Dedup:** Q1≈Q2 (same rule); Q4/Q6 overlap official sample Qs — keep but don't double-count.

## Key learnings for future batches
1. **Speed mph VALUES are graphics in the manual** — cannot text-verify specific
   numbers from the speed table. For exact-number speed questions, source the
   BMV Sample Test or read the value off the rendered PDF page image.
2. **Perplexity's "Manual Section" is unreliable** — it put roundabouts in §4
   (really §5) and mislabeled a work-zone Q as speed limits. I re-map sections
   myself.
3. **The concept questions verify cleanly** — "posted limit overrides,"
   "yield to circulating traffic," "flashing red = stop" are all in manual text.
   Favor concept/scenario questions over exact-mph questions for reliability.
