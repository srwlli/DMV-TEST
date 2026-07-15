/**
 * Ohio DMV Test Questions — verified, source-cited pool.
 *
 * Every question is checked against an official source before inclusion:
 *   - Ohio Driver Manual HSY 7607 (manual/hsy7607.pdf) — page = PDF page index
 *   - Official BMV Sample Test (https://www.bmv.ohio.gov/dl-sample-test.aspx)
 *   - Ohio Revised Code (ORC) where cited in the manual
 *
 * Page rule: printed manual page + 3 = PDF page. Deep-link uses the PDF page.
 *
 * source.badge:
 *   bmv-official-sample  one of the 10 official BMV sample questions
 *   manual-verified      fact confirmed in the manual text, page cited
 *   orc-verified         fact confirmed via Ohio Revised Code
 *
 * Authoring reference: docs/QUESTION-BANK-WORKLIST.md
 */

const MANUAL_URL = 'https://dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/hsy7607.pdf';

// Helper: build a manual source object with a deep-link to the PDF page.
function manualSrc(pdfPage, section, badge) {
  return {
    document: 'Ohio Driver Manual (HSY 7607)',
    pdf_page: pdfPage,
    section: section,
    badge: badge || 'manual-verified',
    url: `${MANUAL_URL}#page=${pdfPage}`,
  };
}

const QUESTIONS = [
  // ─────────────────────────── ROAD SIGNS (8) ───────────────────────────
  {
    id: 'sign-001', category: 'road-signs', subcategory: 'regulatory-signs', difficulty: 'easy',
    text: 'What must you do at a red octagonal STOP sign?',
    image_url: null,
    options: [
      { id: 'a', text: 'Slow down and proceed if the way looks clear', correct: false },
      { id: 'b', text: 'Come to a complete stop, then proceed when safe', correct: true },
      { id: 'c', text: 'Stop only if other traffic is present', correct: false },
      { id: 'd', text: 'Yield without stopping', correct: false },
    ],
    explanation: 'A STOP sign requires a complete stop behind the stop line, crosswalk, or intersection before proceeding when it is safe.',
    source: manualSrc(14, 'Section 4 — Traffic Signs'),
  },
  {
    id: 'sign-002', category: 'road-signs', subcategory: 'regulatory-signs', difficulty: 'easy',
    text: 'What is the shape and color of a regulatory sign that prohibits an action (like "No Left Turn")?',
    image_url: null,
    options: [
      { id: 'a', text: 'A red circle with a slash over the prohibited action', correct: true },
      { id: 'b', text: 'A yellow diamond', correct: false },
      { id: 'c', text: 'A green rectangle', correct: false },
      { id: 'd', text: 'A blue square', correct: false },
    ],
    explanation: 'On prohibitory signs, a red circle with a slash means "NO." Wherever this symbol appears, the illustrated action is prohibited.',
    source: manualSrc(14, 'Section 4 — Traffic Signs'),
  },
  {
    id: 'sign-003', category: 'road-signs', subcategory: 'warning-signs', difficulty: 'easy',
    text: 'A yellow, diamond-shaped sign with black symbols tells you what?',
    image_url: null,
    options: [
      { id: 'a', text: 'A traffic law you must obey', correct: false },
      { id: 'b', text: 'Possible danger that might be ahead', correct: true },
      { id: 'c', text: 'Directions to services', correct: false },
      { id: 'd', text: 'An action is prohibited', correct: false },
    ],
    explanation: 'Warning signs tell a driver of possible danger ahead. They are usually yellow with black lettering or symbols and are diamond shaped.',
    source: manualSrc(14, 'Section 4 — Traffic Signs'),
  },
  {
    id: 'sign-004', category: 'road-signs', subcategory: 'warning-signs', difficulty: 'medium',
    text: 'You see a yellow diamond sign showing a circular arrangement of arrows. What does it warn of?',
    image_url: null,
    options: [
      { id: 'a', text: 'A roundabout ahead', correct: true },
      { id: 'b', text: 'A dead end', correct: false },
      { id: 'c', text: 'A U-turn is required', correct: false },
      { id: 'd', text: 'A parking area', correct: false },
    ],
    explanation: 'A "Roundabout Ahead" warning sign is a yellow diamond alerting drivers that a circular intersection is ahead.',
    source: manualSrc(14, 'Section 4 — Traffic Signs'),
  },
  {
    id: 'sign-005', category: 'road-signs', subcategory: 'warning-signs', difficulty: 'medium',
    text: 'What does a yellow diamond sign with an "X" and the letters "RR" indicate?',
    image_url: null,
    options: [
      { id: 'a', text: 'Rest area ahead', correct: false },
      { id: 'b', text: 'Railroad crossing ahead', correct: true },
      { id: 'c', text: 'Road repair ahead', correct: false },
      { id: 'd', text: 'Right turn required', correct: false },
    ],
    explanation: 'A railroad-crossing warning sign (yellow diamond) tells drivers a railroad crossing is ahead; be prepared to stop for trains.',
    source: manualSrc(14, 'Section 4 — Traffic Signs'),
  },
  {
    id: 'sign-006', category: 'road-signs', subcategory: 'warning-signs', difficulty: 'medium',
    text: 'A yellow diamond warning sign shows a pedestrian symbol. What should you do?',
    image_url: null,
    options: [
      { id: 'a', text: 'Speed up to clear the area', correct: false },
      { id: 'b', text: 'Watch for pedestrians crossing ahead and be ready to yield', correct: true },
      { id: 'c', text: 'Sound your horn continuously', correct: false },
      { id: 'd', text: 'Ignore it unless it is a school day', correct: false },
    ],
    explanation: 'A pedestrian-crossing warning sign indicates pedestrians may be crossing ahead; slow down and be prepared to yield.',
    source: manualSrc(14, 'Section 4 — Traffic Signs'),
  },
  {
    id: 'sign-007', category: 'road-signs', subcategory: 'regulatory-signs', difficulty: 'medium',
    text: 'What does a "Yield" sign require you to do?',
    image_url: null,
    options: [
      { id: 'a', text: 'Always come to a complete stop', correct: false },
      { id: 'b', text: 'Stop only if a police officer is present', correct: false },
      { id: 'c', text: 'Slow down and give the right-of-way to other traffic before proceeding', correct: true },
      { id: 'd', text: 'Merge without slowing', correct: false },
    ],
    explanation: 'A Yield sign means to let other traffic go first; slow down and be ready to stop, giving the right-of-way before proceeding.',
    source: manualSrc(14, 'Section 4 — Traffic Signs'),
  },
  {
    id: 'sign-008', category: 'road-signs', subcategory: 'warning-signs', difficulty: 'medium',
    text: 'A yellow diamond sign shows two arrows pointing in opposite directions. What does it mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'The road ahead is one way', correct: false },
      { id: 'b', text: 'Traffic travels in opposite directions (two-way traffic)', correct: true },
      { id: 'c', text: 'You must make a U-turn', correct: false },
      { id: 'd', text: 'Passing is allowed', correct: false },
    ],
    explanation: 'This warning sign indicates traffic travels in opposite directions ahead — a two-way roadway.',
    source: manualSrc(14, 'Section 4 — Traffic Signs'),
  },

  // ─────────────── RIGHT-OF-WAY & SAFE DRIVING (6) ───────────────
  {
    id: 'row-001', category: 'traffic-rules', subcategory: 'right-of-way', difficulty: 'medium',
    text: 'Two vehicles reach an uncontrolled intersection at the same time. Which driver should yield?',
    image_url: null,
    options: [
      { id: 'a', text: 'The driver on the left yields to the driver on the right', correct: true },
      { id: 'b', text: 'The driver on the right yields to the driver on the left', correct: false },
      { id: 'c', text: 'The faster vehicle has the right-of-way', correct: false },
      { id: 'd', text: 'Whoever honks first may go', correct: false },
    ],
    explanation: 'When two vehicles arrive at a four-way/uncontrolled intersection at the same time, yield to the driver on your right.',
    source: manualSrc(13, 'Section 4 — Right-of-Way'),
  },
  {
    id: 'row-002', category: 'traffic-rules', subcategory: 'intersections', difficulty: 'medium',
    text: 'You are entering a roundabout and a vehicle is already circulating in it. What should you do?',
    image_url: null,
    options: [
      { id: 'a', text: 'Enter quickly and match the circulating speed', correct: false },
      { id: 'b', text: 'Yield to the traffic already in the roundabout, then enter when clear', correct: true },
      { id: 'c', text: 'Stop only if there is a stop sign', correct: false },
      { id: 'd', text: 'Sound your horn and merge', correct: false },
    ],
    explanation: 'At a roundabout, entering traffic yields the right-of-way to circulating traffic. Look left and enter when the lane is clear.',
    source: manualSrc(21, 'Section 5 — Roundabouts or Traffic Circles'),
  },
  {
    id: 'row-003', category: 'traffic-rules', subcategory: 'right-of-way', difficulty: 'medium',
    text: 'You are turning left at an intersection with oncoming traffic. When may you complete the turn?',
    image_url: null,
    options: [
      { id: 'a', text: 'Immediately, since left turns have priority', correct: false },
      { id: 'b', text: 'Only after the first oncoming car passes', correct: false },
      { id: 'c', text: 'When there is a safe gap and you can clear the turn', correct: true },
      { id: 'd', text: 'Anytime you signal', correct: false },
    ],
    explanation: 'When turning, search for oncoming and cross traffic and complete the turn only when there is a safe gap.',
    source: manualSrc(19, 'Section 5 — Intersections and Turning'),
  },
  {
    id: 'row-004', category: 'traffic-rules', subcategory: 'intersections', difficulty: 'medium',
    text: 'At an intersection with no marked stop line or crosswalk, where should you stop?',
    image_url: null,
    options: [
      { id: 'a', text: 'At the point nearest the intersecting roadway where you can see approaching traffic', correct: true },
      { id: 'b', text: 'At least 50 feet before the intersection', correct: false },
      { id: 'c', text: 'Wherever you can see best, even out in the lane', correct: false },
      { id: 'd', text: 'Stopping is not required', correct: false },
    ],
    explanation: 'With no stop line or crosswalk, stop before entering the roadway at the point where you can see approaching traffic.',
    source: manualSrc(18, 'Section 4 — Traffic Signals / Stopping'),
  },
  {
    id: 'row-005', category: 'traffic-rules', subcategory: 'right-of-way', difficulty: 'easy',
    text: 'On which half of the roadway must you normally drive?',
    image_url: null,
    options: [
      { id: 'a', text: 'The left half', correct: false },
      { id: 'b', text: 'The right half, except when passing or otherwise directed', correct: true },
      { id: 'c', text: 'Either half, as long as it is clear', correct: false },
      { id: 'd', text: 'The center of the road', correct: false },
    ],
    explanation: 'Drive on the right half of the roadway except when overtaking, on a road with three or more lanes, on a one-way road, or when directed otherwise.',
    source: manualSrc(21, 'Section 5 — Lane Travel'),
  },
  {
    id: 'row-006', category: 'traffic-rules', subcategory: 'right-of-way', difficulty: 'easy',
    text: 'When two vehicles arrive at an intersection at the same time and no signs or signals control it, who has the right-of-way?',
    image_url: null,
    options: [
      { id: 'a', text: 'The vehicle approaching from the left', correct: false },
      { id: 'b', text: 'The vehicle approaching from the right', correct: true },
      { id: 'c', text: 'The vehicle that sounds its horn first', correct: false },
      { id: 'd', text: 'The faster vehicle', correct: false },
    ],
    explanation: 'With no traffic controls and simultaneous arrival, the vehicle on the right has the right-of-way.',
    source: { document: 'Ohio BMV Sample Knowledge Test', badge: 'bmv-official-sample', url: 'https://www.bmv.ohio.gov/dl-sample-test.aspx' },
  },

  // ─────────────────────────── SPEED LIMITS (5) ───────────────────────────
  {
    id: 'spd-001', category: 'traffic-rules', subcategory: 'speed-limits', difficulty: 'easy',
    text: 'Unless posted otherwise, what is the speed limit on a street within a municipal corporation (residential street)?',
    image_url: null,
    options: [
      { id: 'a', text: '15 mph', correct: false },
      { id: 'b', text: '20 mph', correct: false },
      { id: 'c', text: '25 mph', correct: true },
      { id: 'd', text: '35 mph', correct: false },
    ],
    explanation: 'Ohio law sets 25 mph for streets within a municipal corporation unless a sign posts a different limit.',
    source: manualSrc(12, 'Section 4 — Speed Limits (ORC 4511.21)'),
  },
  {
    id: 'spd-002', category: 'traffic-rules', subcategory: 'school-zones', difficulty: 'medium',
    text: 'What is the speed limit in a school zone during recess or while children are arriving or leaving school?',
    image_url: null,
    options: [
      { id: 'a', text: '15 mph', correct: false },
      { id: 'b', text: '20 mph', correct: true },
      { id: 'c', text: '25 mph', correct: false },
      { id: 'd', text: '35 mph', correct: false },
    ],
    explanation: 'Ohio sets a 20 mph limit in school zones during recess and while children are arriving or leaving during normal hours.',
    source: manualSrc(12, 'Section 4 — Speed Limits (ORC 4511.21)'),
  },
  {
    id: 'spd-003', category: 'traffic-rules', subcategory: 'speed-limits', difficulty: 'easy',
    text: 'What is the speed limit in an alley within a municipal corporation?',
    image_url: null,
    options: [
      { id: 'a', text: '15 mph', correct: true },
      { id: 'b', text: '20 mph', correct: false },
      { id: 'c', text: '25 mph', correct: false },
      { id: 'd', text: '10 mph', correct: false },
    ],
    explanation: 'Ohio law sets a 15 mph limit for alleys within a municipal corporation.',
    source: manualSrc(12, 'Section 4 — Speed Limits (ORC 4511.21)'),
  },
  {
    id: 'spd-004', category: 'traffic-rules', subcategory: 'speed-limits', difficulty: 'easy',
    text: 'What is the speed limit on a rural freeway in Ohio unless otherwise posted?',
    image_url: null,
    options: [
      { id: 'a', text: '55 mph', correct: false },
      { id: 'b', text: '65 mph', correct: false },
      { id: 'c', text: '70 mph', correct: true },
      { id: 'd', text: '75 mph', correct: false },
    ],
    explanation: 'Ohio sets 70 mph as the limit for rural freeways unless a different limit is posted.',
    source: manualSrc(12, 'Section 4 — Speed Limits (ORC 4511.21)'),
  },
  {
    id: 'spd-005', category: 'traffic-rules', subcategory: 'speed-limits', difficulty: 'medium',
    text: 'What does Ohio law say a "reasonable" speed is?',
    image_url: null,
    options: [
      { id: 'a', text: 'Always exactly the posted speed limit', correct: false },
      { id: 'b', text: 'A speed based on road design, conditions, and traffic — which may be slower than the posted limit', correct: true },
      { id: 'c', text: 'Any speed up to 10 mph over the posted limit', correct: false },
      { id: 'd', text: 'The speed of surrounding traffic', correct: false },
    ],
    explanation: 'Speed limits are based on the road type; in poor conditions a reasonable speed may be slower than the posted limit.',
    source: manualSrc(12, 'Section 4 — Speed Limits'),
  },

  // ─────────────────────── PAVEMENT MARKINGS (4) ───────────────────────
  {
    id: 'pav-001', category: 'traffic-rules', subcategory: 'pavement-markings', difficulty: 'medium',
    text: 'What does a solid yellow line separating traffic mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'It separates traffic traveling in opposite directions', correct: true },
      { id: 'b', text: 'It separates traffic traveling in the same direction', correct: false },
      { id: 'c', text: 'It marks the edge of the road', correct: false },
      { id: 'd', text: 'It marks a bike lane', correct: false },
    ],
    explanation: 'A yellow solid line separates traffic traveling in opposite directions.',
    source: manualSrc(16, 'Section 4 — Lane Pavement Markings'),
  },
  {
    id: 'pav-002', category: 'traffic-rules', subcategory: 'pavement-markings', difficulty: 'medium',
    text: 'What do white lines on the roadway separate?',
    image_url: null,
    options: [
      { id: 'a', text: 'Traffic traveling in opposite directions', correct: false },
      { id: 'b', text: 'Traffic traveling in the same direction', correct: true },
      { id: 'c', text: 'The road from the shoulder only', correct: false },
      { id: 'd', text: 'Parking spaces only', correct: false },
    ],
    explanation: 'White lines separate lanes of traffic traveling in the same direction. They may be solid or broken (dashed).',
    source: manualSrc(16, 'Section 4 — Lane Pavement Markings'),
  },
  {
    id: 'pav-003', category: 'traffic-rules', subcategory: 'pavement-markings', difficulty: 'hard',
    text: 'On a road with a solid yellow double line, when may you drive left of the center line?',
    image_url: null,
    options: [
      { id: 'a', text: 'Whenever traffic is light', correct: false },
      { id: 'b', text: 'Only to turn left, or to pass a slow-moving vehicle such as a bicycle', correct: true },
      { id: 'c', text: 'Never, under any circumstance', correct: false },
      { id: 'd', text: 'Anytime you signal first', correct: false },
    ],
    explanation: 'Do not drive left of a solid yellow double line unless you must cross to turn left or to pass a slow-moving vehicle (e.g., a bicycle).',
    source: manualSrc(16, 'Section 4 — Lane Pavement Markings'),
  },
  {
    id: 'pav-004', category: 'traffic-rules', subcategory: 'pavement-markings', difficulty: 'hard',
    text: 'The center of the road is marked with a yellow solid line next to a yellow broken (dashed) line. Who may pass?',
    image_url: null,
    options: [
      { id: 'a', text: 'Only drivers in the lane next to the broken line may pass when safe', correct: true },
      { id: 'b', text: 'Only drivers in the lane next to the solid line may pass', correct: false },
      { id: 'c', text: 'Both directions may always pass', correct: false },
      { id: 'd', text: 'Neither direction may ever pass', correct: false },
    ],
    explanation: 'Passing is allowed for the driver on the broken-line side and prohibited for the driver on the solid-line side.',
    source: manualSrc(16, 'Section 4 — Lane Pavement Markings'),
  },

  // ─────────────────────── TRAFFIC SIGNALS (4) ───────────────────────
  {
    id: 'sig-001', category: 'traffic-rules', subcategory: 'traffic-signals', difficulty: 'medium',
    text: 'What must you do at a flashing red traffic signal?',
    image_url: null,
    options: [
      { id: 'a', text: 'Slow down and continue without stopping', correct: false },
      { id: 'b', text: 'Come to a complete stop and proceed only when no traffic crosses your path', correct: true },
      { id: 'c', text: 'Treat it as a green light', correct: false },
      { id: 'd', text: 'Proceed if no one is coming, without stopping', correct: false },
    ],
    explanation: 'A flashing red signal requires a complete stop behind the stop line/crosswalk; proceed only when your path is clear — the same as a stop sign.',
    source: manualSrc(13, 'Section 4 — Traffic Signals'),
  },
  {
    id: 'sig-002', category: 'traffic-rules', subcategory: 'traffic-signals', difficulty: 'medium',
    text: 'What does a flashing yellow traffic signal mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'Stop and wait for green', correct: false },
      { id: 'b', text: 'Slow down and proceed with caution, prepared to stop', correct: true },
      { id: 'c', text: 'The light is broken; treat it as a stop sign', correct: false },
      { id: 'd', text: 'Make a right turn only', correct: false },
    ],
    explanation: 'A flashing yellow signal means slow down and proceed with caution, being prepared to stop for traffic that may be entering the intersection.',
    source: manualSrc(13, 'Section 4 — Traffic Signals'),
  },
  {
    id: 'sig-003', category: 'traffic-rules', subcategory: 'traffic-signals', difficulty: 'medium',
    text: 'A traffic light is completely dark (inoperable) at an intersection. How should you treat it?',
    image_url: null,
    options: [
      { id: 'a', text: 'Proceed as if you have a green light', correct: false },
      { id: 'b', text: 'The same as a stop sign — yield the right-of-way and use caution', correct: true },
      { id: 'c', text: 'Speed through quickly', correct: false },
      { id: 'd', text: 'Follow the car ahead without stopping', correct: false },
    ],
    explanation: 'Inoperable traffic lights are treated the same as a stop sign: yield the right-of-way and use caution while entering the intersection.',
    source: manualSrc(13, 'Section 4 — Traffic Signals'),
  },
  {
    id: 'sig-004', category: 'traffic-rules', subcategory: 'traffic-signals', difficulty: 'easy',
    text: 'What does a green arrow shown with a traffic light mean?',
    image_url: null,
    options: [
      { id: 'a', text: 'You must stop before turning', correct: false },
      { id: 'b', text: 'You may turn in the direction of the arrow without stopping', correct: true },
      { id: 'c', text: 'The arrow is a warning only', correct: false },
      { id: 'd', text: 'Yield to pedestrians only', correct: false },
    ],
    explanation: 'A green arrow means you may travel in the direction of the arrow without stopping (when clear).',
    source: manualSrc(13, 'Section 4 — Traffic Signals'),
  },

  // ─────────────────────── ALCOHOL & DRUGS (4) ───────────────────────
  {
    id: 'alc-001', category: 'traffic-rules', subcategory: 'impaired-driving', difficulty: 'easy',
    text: 'If someone has been drinking alcohol, what actually helps them overcome its influence?',
    image_url: null,
    options: [
      { id: 'a', text: 'Drinking hot coffee', correct: false },
      { id: 'b', text: 'Getting fresh air', correct: false },
      { id: 'c', text: 'Only time', correct: true },
      { id: 'd', text: 'Eating a large meal', correct: false },
    ],
    explanation: 'Only the passage of time allows the body to eliminate alcohol; coffee, food, and fresh air do not speed it up.',
    source: { document: 'Ohio BMV Sample Knowledge Test', badge: 'bmv-official-sample', url: 'https://www.bmv.ohio.gov/dl-sample-test.aspx' },
  },
  {
    id: 'alc-002', category: 'traffic-rules', subcategory: 'impaired-driving', difficulty: 'medium',
    text: 'What is the illegal blood-alcohol concentration (BAC) for a driver age 21 or older in Ohio?',
    image_url: null,
    options: [
      { id: 'a', text: '0.05% or higher', correct: false },
      { id: 'b', text: '0.08% or higher', correct: true },
      { id: 'c', text: '0.10% or higher', correct: false },
      { id: 'd', text: '0.02% or higher', correct: false },
    ],
    explanation: 'In Ohio it is illegal to operate a vehicle with a BAC of 0.08% or higher if you are 21 or older.',
    source: manualSrc(28, 'Section 3 — Alcohol, Drugs, and Driving'),
  },
  {
    id: 'alc-003', category: 'traffic-rules', subcategory: 'impaired-driving', difficulty: 'medium',
    text: 'What is the illegal BAC for a driver under age 21 in Ohio?',
    image_url: null,
    options: [
      { id: 'a', text: '0.08% or higher', correct: false },
      { id: 'b', text: '0.05% or higher', correct: false },
      { id: 'c', text: '0.02% or higher', correct: true },
      { id: 'd', text: 'Any amount is automatically a felony', correct: false },
    ],
    explanation: 'For drivers under 21, it is illegal to operate a vehicle with a BAC of 0.02% or higher.',
    source: manualSrc(28, 'Section 3 — Alcohol, Drugs, and Driving'),
  },
  {
    id: 'alc-004', category: 'traffic-rules', subcategory: 'impaired-driving', difficulty: 'medium',
    text: 'How can alcohol and drugs affect your driving?',
    image_url: null,
    options: [
      { id: 'a', text: 'They improve reaction time', correct: false },
      { id: 'b', text: 'They impair vision, slow reaction time, and reduce judgment', correct: true },
      { id: 'c', text: 'They only affect you if you feel drunk', correct: false },
      { id: 'd', text: 'Prescription medication never affects driving', correct: false },
    ],
    explanation: 'Alcohol and drugs can blur vision, slow reaction time, and reduce judgment. Even prescription or over-the-counter medication may affect driving ability.',
    source: manualSrc(11, 'Section 3 — Alcohol, Drugs, and Driving'),
  },

  // ─────────────────── CHILD & SEATBELT SAFETY (4) ───────────────────
  {
    id: 'chd-001', category: 'traffic-rules', subcategory: 'child-safety', difficulty: 'medium',
    text: 'A child who is under age 4 or weighs less than 40 pounds must be restrained how?',
    image_url: null,
    options: [
      { id: 'a', text: 'In a child safety seat meeting federal safety standards', correct: true },
      { id: 'b', text: 'With only a lap belt', correct: false },
      { id: 'c', text: 'In a booster seat', correct: false },
      { id: 'd', text: 'Held by an adult passenger', correct: false },
    ],
    explanation: 'Children under age 4 or under 40 pounds must be properly restrained in a federally approved child safety seat.',
    source: manualSrc(30, 'Section 6 — Child Passenger Restraints (ORC 4511.81)'),
  },
  {
    id: 'chd-002', category: 'traffic-rules', subcategory: 'child-safety', difficulty: 'medium',
    text: 'When must a child at least age 4 but under age 8 ride in a booster seat?',
    image_url: null,
    options: [
      { id: 'a', text: 'Always, with no exceptions', correct: false },
      { id: 'b', text: 'Unless the child is 4 feet 9 inches tall or taller', correct: true },
      { id: 'c', text: 'Only on the highway', correct: false },
      { id: 'd', text: 'Only if under 30 pounds', correct: false },
    ],
    explanation: 'A child at least 4 but under 8 must ride in a booster seat unless the child is 4 feet 9 inches (57 inches) or taller.',
    source: manualSrc(30, 'Section 6 — Child Passenger Restraints (ORC 4511.81)'),
  },
  {
    id: 'chd-003', category: 'traffic-rules', subcategory: 'child-safety', difficulty: 'easy',
    text: 'How must a child at least age 8 but not older than 15 be restrained?',
    image_url: null,
    options: [
      { id: 'a', text: 'In a rear-facing child seat', correct: false },
      { id: 'b', text: 'With a safety belt', correct: true },
      { id: 'c', text: 'No restraint is required', correct: false },
      { id: 'd', text: 'Only a booster seat', correct: false },
    ],
    explanation: 'A child at least 8 but not older than 15 must be properly restrained with a safety belt.',
    source: manualSrc(30, 'Section 6 — Child Passenger Restraints (ORC 4511.81)'),
  },
  {
    id: 'chd-004', category: 'traffic-rules', subcategory: 'child-safety', difficulty: 'easy',
    text: 'Where should children age 12 and younger sit, and why?',
    image_url: null,
    options: [
      { id: 'a', text: 'In the front seat for better supervision', correct: false },
      { id: 'b', text: 'In the back seat, to avoid injury from an air bag', correct: true },
      { id: 'c', text: 'Anywhere, as long as belted', correct: false },
      { id: 'd', text: 'On an adult’s lap', correct: false },
    ],
    explanation: 'Children 12 and younger should sit in the rear seat to avoid injury from an air bag; a rear-facing seat is never placed in front of an active airbag.',
    source: manualSrc(30, 'Section 6 — Child Passenger Restraints'),
  },

  // ─────────────────── EMERGENCY VEHICLES (3) ───────────────────
  {
    id: 'emg-001', category: 'traffic-rules', subcategory: 'emergency-vehicles', difficulty: 'easy',
    text: 'An emergency vehicle with flashing lights and a siren is approaching through traffic. What must you do?',
    image_url: null,
    options: [
      { id: 'a', text: 'Speed up to get out of the way', correct: false },
      { id: 'b', text: 'Quickly and safely pull to the right side of the road and stop', correct: true },
      { id: 'c', text: 'Stop immediately in your lane', correct: false },
      { id: 'd', text: 'Turn left to make room', correct: false },
    ],
    explanation: 'When an emergency vehicle approaches with lights and siren, pull to the right side of the road and stop, avoiding blocking intersections, until it passes.',
    source: manualSrc(41, 'Section 10 — Emergency Vehicles'),
  },
  {
    id: 'emg-002', category: 'traffic-rules', subcategory: 'emergency-vehicles', difficulty: 'medium',
    text: 'Under Ohio’s "Move Over" law, what must you do when approaching a stopped police car, emergency vehicle, or road-service vehicle with warning lights on?',
    image_url: null,
    options: [
      { id: 'a', text: 'Maintain speed and stay in your lane', correct: false },
      { id: 'b', text: 'Move to an adjacent lane if possible, and/or slow down', correct: true },
      { id: 'c', text: 'Stop completely in your lane', correct: false },
      { id: 'd', text: 'Sound your horn as a warning', correct: false },
    ],
    explanation: 'The Move Over law requires drivers to move to an adjacent lane and/or slow down when approaching a stopped emergency or service vehicle with activated warning lights.',
    source: manualSrc(41, 'Section 10 — Move Over Laws'),
  },
  {
    id: 'emg-003', category: 'traffic-rules', subcategory: 'emergency-vehicles', difficulty: 'medium',
    text: 'After pulling over for a passing emergency vehicle, when may you move back into traffic?',
    image_url: null,
    options: [
      { id: 'a', text: 'Immediately, even before it passes', correct: false },
      { id: 'b', text: 'Only after the emergency vehicle has passed', correct: true },
      { id: 'c', text: 'As soon as you hear the siren', correct: false },
      { id: 'd', text: 'Whenever the lane looks clear behind you', correct: false },
    ],
    explanation: 'All vehicles must remain pulled to the right until the emergency vehicle has passed.',
    source: manualSrc(41, 'Section 10 — Emergency Vehicles'),
  },

  // ─────────────────── SPECIAL CONDITIONS (4) ───────────────────
  {
    id: 'con-001', category: 'traffic-rules', subcategory: 'winter-driving', difficulty: 'easy',
    text: 'What is the most important driving technique to avoid crashes on icy or snowy roads?',
    image_url: null,
    options: [
      { id: 'a', text: 'Add extra weight to the vehicle', correct: false },
      { id: 'b', text: 'Reduce speed and increase following distance', correct: true },
      { id: 'c', text: 'Engage four-wheel drive and keep normal speed', correct: false },
      { id: 'd', text: 'Get off the highway as fast as possible', correct: false },
    ],
    explanation: 'In icy or snowy conditions, reduce your speed and increase your following distance to avoid crashes.',
    source: { document: 'Ohio BMV Sample Knowledge Test', badge: 'bmv-official-sample', url: 'https://www.bmv.ohio.gov/dl-sample-test.aspx' },
  },
  {
    id: 'con-002', category: 'traffic-rules', subcategory: 'work-zones', difficulty: 'easy',
    text: 'What is the safest approach when driving through a work zone?',
    image_url: null,
    options: [
      { id: 'a', text: 'Keep your normal cruising speed', correct: false },
      { id: 'b', text: 'Reduce speed and watch for workers and equipment', correct: true },
      { id: 'c', text: 'Speed up to clear it faster', correct: false },
      { id: 'd', text: 'Slow down only if a flagger is present', correct: false },
    ],
    explanation: 'Work zones are dangerous for workers and drivers; reduce speed, stay alert for workers and equipment, and be ready for changing conditions.',
    source: manualSrc(32, 'Section 7 — Work Zones'),
  },
  {
    id: 'con-003', category: 'traffic-rules', subcategory: 'distracted-driving', difficulty: 'medium',
    text: 'For a driver age 18 or older, what does Ohio’s distracted-driving law generally allow?',
    image_url: null,
    options: [
      { id: 'a', text: 'Holding a phone to text at red lights', correct: false },
      { id: 'b', text: 'Making calls using hands-free technology without holding the device', correct: true },
      { id: 'c', text: 'Typing messages while driving', correct: false },
      { id: 'd', text: 'Using any device freely', correct: false },
    ],
    explanation: 'Drivers 18+ may use hands-free technology as long as they do not hold or support the device or manually enter text; devices may only be activated with a single touch or swipe.',
    source: manualSrc(11, 'Section 3 — Distracted Driving'),
  },
  {
    id: 'con-004', category: 'traffic-rules', subcategory: 'distracted-driving', difficulty: 'medium',
    text: 'What does Ohio law say about drivers under age 18 using electronic devices while driving?',
    image_url: null,
    options: [
      { id: 'a', text: 'They may use hands-free devices freely', correct: false },
      { id: 'b', text: 'It is illegal to use any electronic device, even hands-free', correct: true },
      { id: 'c', text: 'They may text at stop lights', correct: false },
      { id: 'd', text: 'There are no restrictions', correct: false },
    ],
    explanation: 'Drivers under 18 may not use any electronic device while driving — even hands-free — with narrow exceptions such as navigation or emergency calls.',
    source: manualSrc(11, 'Section 3 — Distracted Driving'),
  },

  // ─────────────────────── PARKING RULES (3) ───────────────────────
  {
    id: 'prk-001', category: 'traffic-rules', subcategory: 'parking', difficulty: 'medium',
    text: 'How close to a fire hydrant may you legally park?',
    image_url: null,
    options: [
      { id: 'a', text: 'No closer than 10 feet', correct: true },
      { id: 'b', text: 'No closer than 5 feet', correct: false },
      { id: 'c', text: 'No closer than 15 feet', correct: false },
      { id: 'd', text: 'No closer than 25 feet', correct: false },
    ],
    explanation: 'Ohio law prohibits stopping, parking, or standing within 10 feet of a fire hydrant.',
    source: manualSrc(26, 'Section 6 — Stopping, Parking, or Standing Prohibited (ORC 4511.68)'),
  },
  {
    id: 'prk-002', category: 'traffic-rules', subcategory: 'parking', difficulty: 'medium',
    text: 'How far from an intersection or crosswalk must you stay when parking?',
    image_url: null,
    options: [
      { id: 'a', text: 'At least 10 feet', correct: false },
      { id: 'b', text: 'At least 20 feet', correct: true },
      { id: 'c', text: 'At least 30 feet', correct: false },
      { id: 'd', text: 'There is no distance requirement', correct: false },
    ],
    explanation: 'You may not stop, park, or stand in or within 20 feet of an intersection or crosswalk.',
    source: manualSrc(26, 'Section 6 — Stopping, Parking, or Standing Prohibited (ORC 4511.68)'),
  },
  {
    id: 'prk-003', category: 'traffic-rules', subcategory: 'parking', difficulty: 'easy',
    text: 'When parking parallel next to a curb, how far from the curb may your vehicle be?',
    image_url: null,
    options: [
      { id: 'a', text: 'Not more than 12 inches', correct: true },
      { id: 'b', text: 'Not more than 24 inches', correct: false },
      { id: 'c', text: 'Not more than 6 inches', correct: false },
      { id: 'd', text: 'Any distance, as long as traffic can pass', correct: false },
    ],
    explanation: 'Vehicles must be parked parallel to and not more than 12 inches from the curb, facing the direction of traffic on that side.',
    source: manualSrc(26, 'Section 6 — Parking'),
  },
];
