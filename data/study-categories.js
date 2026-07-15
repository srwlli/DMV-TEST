/**
 * Study Mode Categories — definition-driven registry (source of truth)
 *
 * These 9 topic-based categories are the canonical Study Mode taxonomy. Study
 * Mode, Progress, and Weak Areas all read THIS list. Membership is DERIVED from
 * each question's data via match(q) — questions are never hand-assigned here.
 *
 * Fields:
 *   id          stable key (kebab-case)
 *   name        display label
 *   icon        Lucide icon name (rendered via <i data-lucide="...">)
 *   description short blurb for the category card
 *   manualPages page numbers in the official Ohio Driver Manual (hsy7607.pdf)
 *               that cover this topic. Filled from research — the source
 *               principle: nothing shown without a manual page behind it.
 *               Empty [] until research lands.
 *   match       predicate: does this question belong to this category?
 *
 * Orphan-fold (operator 2026-07-14): headlights, following-distance, passing,
 * turn-signals, pedestrians have no dedicated category — they fold into
 * 'right-of-way' (broadened to "Right-of-Way & Safe Driving").
 */

const STUDY_CATEGORIES = [
  {
    id: 'road-signs',
    name: 'Road Signs',
    icon: 'signpost',
    description: 'Regulatory, warning, guide, and work-zone signs',
    manualPages: [],
    match: (q) => q.category === 'road-signs',
  },
  {
    id: 'right-of-way',
    name: 'Right-of-Way & Safe Driving',
    icon: 'git-fork',
    description: 'Yielding, passing, following distance, signaling, pedestrians, headlights',
    manualPages: [],
    match: (q) =>
      ['right-of-way', 'passing', 'following-distance', 'turn-signals', 'pedestrians', 'headlights']
        .includes(q.subcategory),
  },
  {
    id: 'speed-limits',
    name: 'Speed Limits',
    icon: 'gauge',
    description: 'Posted limits, residential, and school zones',
    manualPages: [],
    match: (q) => ['speed-limits', 'school-zones'].includes(q.subcategory),
  },
  {
    id: 'pavement-markings',
    name: 'Pavement Markings',
    icon: 'road',
    description: 'Lines, lanes, and road surface markings',
    manualPages: [],
    match: (q) => q.subcategory === 'pavement-markings',
  },
  {
    id: 'intersections',
    name: 'Intersections',
    icon: 'traffic-cone',
    description: 'Four-way stops, turns, and crossing rules',
    manualPages: [],
    match: (q) => q.subcategory === 'intersections',
  },
  {
    id: 'alcohol-drugs',
    name: 'Alcohol & Drugs',
    icon: 'wine',
    description: 'BAC limits, impairment, and zero tolerance',
    manualPages: [],
    match: (q) => q.subcategory === 'impaired-driving',
  },
  {
    id: 'parking',
    name: 'Parking Rules',
    icon: 'circle-parking',
    description: 'Where you may and may not park',
    manualPages: [],
    match: (q) => q.subcategory === 'parking',
  },
  {
    id: 'child-seatbelt',
    name: 'Child & Seatbelt Safety',
    icon: 'baby',
    description: 'Restraint requirements and seatbelt law',
    manualPages: [],
    match: (q) => ['child-safety', 'seatbelt'].includes(q.subcategory),
  },
  {
    id: 'emergency-vehicles',
    name: 'Emergency Vehicles',
    icon: 'siren',
    description: 'Responding to sirens and lights',
    manualPages: [],
    match: (q) => q.subcategory === 'emergency-vehicles',
  },
];

/**
 * Group a question set into the 9 study categories.
 * Returns [{ ...category, questions: [...] }] preserving registry order.
 * Every category is returned even if it has 0 questions (renders as a disabled
 * shell) so the Study Mode grid always shows the full taxonomy.
 */
function groupByStudyCategory(allQuestions) {
  return STUDY_CATEGORIES.map((cat) => ({
    ...cat,
    questions: (allQuestions || []).filter(cat.match),
  }));
}
