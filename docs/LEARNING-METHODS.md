# Learning Methods & Quiz Engine Design

**Pedagogy:** Evidence-based learning science applied to DMV test prep  
**Target:** 75% passing score with confidence and retention

---

## Learning Theory Foundation

### Spaced Repetition (Ebbinghaus)
- Questions resurface at optimal intervals (1d, 3d, 1w, 2w)
- Combats natural forgetting curve
- 3+ correct answers = "Mastered" badge

### Active Recall (Retrieval Practice)
- Quiz format forces retrieval from memory
- Immediate feedback strengthens neural pathways
- Better than passive re-reading

### Elaboration
- Rich explanations connect new info to prior knowledge
- "When you see X, you must do Y" structures
- Visual + textual encoding (dual coding theory)

### Interleaving
- Study mode mixes categories (not blocked by topic)
- Improves discrimination between concepts
- Prevents illusion of fluency

### Metacognition
- Progress tracking increases self-awareness
- Weak area identification enables targeted study
- Confidence score helps calibrate prep strategy

---

## Quiz Modes

### Mode 1: Quiz Mode (Full Test Simulation)

**Purpose:** Mimic real exam conditions. Build test confidence.

**Structure:**
- 40 questions (20 signs + 20 rules)
- Timed: 40 minutes (60 seconds/question avg)
- No skips, no hints, no review mid-test
- Final score + breakdown after completion

**Question Selection:**
```javascript
const selection = {
  road_signs: [
    // Random 20 from regulatory, warning, guide, work-zone
    // Proportional to frequency (e.g., 40% regulatory)
  ],
  traffic_rules: [
    // Random 20 from 7 subtopics
    // Include 1-2 high-miss topics (pavement, intersections)
  ]
};
```

**Feedback Flow:**
1. User submits answer
2. 200ms delay for UI refresh
3. Answer highlights (green/red)
4. 1s pause before revealing explanation
5. Explanation displays
6. [NEXT QUESTION] becomes available
7. Progress bar advances with checkmark animation

**Results Screen:**
```
Quiz Complete! 🎉

Your Score: 37/40 (92.5%)

Road Signs:   18/20 (90%)
Traffic Rules: 19/20 (95%)

Status: ✓ READY FOR TEST

Your questions to review:
• Question 7: Pavement marking (wrong)
• Question 23: Right-of-way (wrong)

[Practice These Topics]  [Start New Quiz]
```

---

### Mode 2: Study Mode (Category Learning)

**Purpose:** Learn concepts without pressure. Build foundation.

**Structure:**
- Choose category (Road Signs, Speed & Safety, etc.)
- Questions presented in random order
- Unlimited attempts per question
- Instant feedback + detailed explanation
- No timer, no score tracking

**Category List:**
```
Road Signs:
  ├─ Regulatory Signs (Stop, Yield, Speed Limit, etc.)
  ├─ Warning Signs (Curve, Pedestrian, School, etc.)
  ├─ Pavement Markings (Yellow lines, white lines, center turning)
  ├─ Guide & Work Zone Signs
  
Traffic Rules:
  ├─ Speed & Following Distance
  ├─ Right-of-Way (Most critical)
  ├─ Turning & Lanes
  ├─ Child Safety & Restraints
  ├─ Alcohol & Drug Effects (Young driver focus)
  ├─ Special Situations (Buses, emergency, studded tires)
  └─ Parking & Stopping
```

**Flow:**
1. User selects category
2. Category overview: "X questions in this topic. You'll learn..."
3. First question appears (full card)
4. User taps answer
5. Immediately shows: ✓ Correct! or ✗ Incorrect (try again)
6. Rich explanation appears below
7. Optional: [See More] expands additional context
8. [Next Question] or [Mastered - Skip Rest]

**Explanation Template:**
```
Question: When you see a yellow line on your side, what must you do?

Answer: You may not pass.

Explanation:
• A SOLID yellow line on YOUR SIDE = no passing zone
• A DASHED yellow line = you MAY pass (when safe)
• Yellow lines = center line markings (two-way traffic)
• White lines = lane dividers (same direction)

Real-world example:
You're driving on a rural 2-lane road. The line in the
middle is solid yellow on your side. You see a slow
tractor ahead. You CANNOT pass it — it's illegal and
unsafe until the line becomes dashed.

Related question:
[Q] "A dashed yellow line on your side means..."
[Test yourself →]
```

**Progress Per Category:**
```
Regulatory Signs

Question 1/6
You have 0/6 mastered in this category

Recent results:
✓ Q1: Stop sign (just now)
✓ Q2: Yield sign (just now)
✗ Q3: Speed limit (failed 1x, try again)

[Continue where you left off]
```

---

### Mode 3: Weak Areas Drill

**Purpose:** Fix knowledge gaps through targeted repetition.

**Algorithm:**
1. Scan session history for questions answered incorrectly
2. Rank by: (missed count) × (days since last attempt)
3. Prioritize topics with 30%+ miss rate: pavement markings, intersections
4. Auto-surface questions until user scores 3 consecutive correct

**Weak Area Detection:**
```javascript
const weakAreas = questions.filter(q => {
  const attempts = history.filter(h => h.question_id === q.id);
  const wrongCount = attempts.filter(a => !a.correct).length;
  const missRate = wrongCount / attempts.length;
  return missRate > 0.33 || wrongCount >= 2;
});

// Sort by priority
weakAreas.sort((a, b) => {
  const daysSinceA = (now - a.lastAttempt) / (1000 * 3600 * 24);
  const daysSinceB = (now - b.lastAttempt) / (1000 * 3600 * 24);
  return (b.wrongCount * daysSinceA) - (a.wrongCount * daysSinceB);
});
```

**Session Example:**
```
🔥 Weak Areas Drill

You've missed these topics. Let's fix them!

• Pavement Markings (32% miss rate) — 4 questions
• Intersection Right-of-Way (31% miss rate) — 3 questions

Starting with: Pavement Markings

Question 1/4 — Streak: 0/3 ✓ needed

[Pavement Marking Question]

[SUBMIT]
```

**Mastery Progression:**
```
Pavement Markings — 1/3 ✓
You're on your way! Correct answer.

Pavement Markings — 2/3 ✓
Almost there! One more correct answer.

Pavement Markings — 3/3 ✓ 🎉
Mastered! You can skip these for now.
```

---

### Mode 4: Road Signs Gallery (Visual Reference)

**Purpose:** Build visual memory. Learn sign shapes, colors, meanings.

**Structure:**
- 100+ signs organized by type
- Filterable by category (Regulatory, Warning, Guide, Work Zone)
- Searchable by name or key word
- Tap any sign for detail view
- Offline-cached for study without internet

**Gallery Grid View:**
```
Road Signs Gallery

Filter: [All ▼]  [Search 🔍]

Regulatory Signs (45)
┌─────────┐ ┌─────────┐ ┌─────────┐
│ STOP    │ │ YIELD   │ │ SPEED   │
│         │ │         │ │  LIMIT  │
│ 8-sided │ │Triangle │ │ Rectangle
└─────────┘ └─────────┘ └─────────┘

[More signs...]

Warning Signs (51)
┌─────────┐ ┌─────────┐
│  /\    │ │  ?  │
│ CURVE  │ │PEDS │
│ Yellow │ │Yellow│
└─────────┘ └─────────┘

[More signs...]
```

**Sign Detail View:**
```
Stop Sign

Type: Regulatory (enforcement sign)
Color: Red & White
Shape: Octagon (8-sided)

What it means:
You MUST come to a complete stop
at this sign. Check for crossing
traffic before proceeding.

Key points:
✓ Complete stop required
✓ Look both ways
✓ Yield to crossing traffic
✓ Proceed only when safe

When you see this on the test:
"When you see a stop sign, you must:"
→ "Stop completely, check for traffic, proceed when safe"

Practice questions:
[? How far from the sign must you stop?]
[? What if there's no crossing traffic?]

[Take Quiz on Regulatory Signs]
```

**Search / Filter:**
- Filter by: Regulatory | Warning | Guide | Work Zone
- Search: "stop", "yield", "speed", "curve", etc.
- Recently studied
- Frequently missed on tests

---

## Spaced Repetition Schedule

**Card State Machine:**
```
NEW (0 attempts)
  ↓ (wrong) → LEARNING
  ↓ (correct) → REVIEW
  
LEARNING (1-2 correct)
  ↓ (wrong) → LEARNING (reset)
  ↓ (correct) → REVIEW
  
REVIEW (3+ correct)
  ↓ (wrong) → LEARNING (resets to 1)
  ↓ (correct) → resurface at interval
  
MASTERED (3 correct in row, no wrong for 2 weeks)
  ↓ (wrong) → REVIEW (keep alive with monthly checks)
  ↓ (optional) → remove from active study
```

**Interval Schedule:**
```javascript
const intervals = {
  new: 0,           // Now
  learning_1: 1,    // 1 hour later
  learning_2: 1,    // Same session
  review_1: 1,      // 1 day later
  review_2: 3,      // 3 days later
  review_3: 7,      // 1 week later
  review_4: 14,     // 2 weeks later
  mastered: 30,     // 1 month (optional check-in)
};
```

**Example Timeline for One Question:**

```
Day 1 (Session A)
  12:00 PM: Q7 appears (NEW)
  12:05 PM: User answers WRONG
  Status: LEARNING (1 wrong)
  Next: 1 hour (same day)

  1:00 PM: Q7 resurfaces (same session B)
  1:02 PM: User answers CORRECT
  Status: LEARNING (1 correct, 1 wrong)
  Next: Tomorrow

Day 2 (Session C)
  3:00 PM: Q7 appears (LEARNING)
  3:01 PM: User answers CORRECT
  Status: REVIEW (2 correct, 1 wrong)
  Next: 3 days

Day 5 (Session D)
  4:00 PM: Q7 appears (REVIEW)
  4:02 PM: User answers CORRECT
  Status: REVIEW (3 correct, 1 wrong)
  Next: 7 days

Day 12 (Session E)
  2:00 PM: Q7 appears (REVIEW)
  2:03 PM: User answers CORRECT
  Status: REVIEW (4 correct, 1 wrong)
  Next: 14 days

Day 26 (Session F)
  5:00 PM: Q7 appears (REVIEW)
  5:05 PM: User answers CORRECT
  Status: MASTERED (5 correct, 1 wrong, spread over 25 days)
  Next: Optional 30-day check-in

[User can now optionally remove Q7 from active study]
```

---

## Progress Tracking & Metrics

### Session History
```javascript
{
  session_id: "SES-20260714-001",
  start_time: "2026-07-14T12:00:00Z",
  end_time: "2026-07-14T12:45:00Z",
  mode: "quiz",
  questions_attempted: 40,
  correct: 37,
  incorrect: 3,
  score_percent: 92.5,
  time_per_question_avg: 67.5,
  
  by_category: {
    road_signs: { correct: 18, total: 20, percent: 90 },
    traffic_rules: { correct: 19, total: 20, percent: 95 },
  },
  
  answered_questions: [
    { id: "Q001", category: "stop-sign", correct: true, time_ms: 3200 },
    { id: "Q007", category: "pavement", correct: false, time_ms: 8500 },
    // ... 38 more
  ]
}
```

### Aggregate Stats
```
Overall Progress

Sessions completed: 12
Total questions attempted: 480
Current accuracy: 82%

By category:
  Road Signs: 88% (average across all sessions)
  Speed & Safety: 75%
  Right-of-Way: 92%
  Alcohol & Drugs: 68% ⚠️ (weak)

Mastered questions: 15/40
Learning: 20/40
New: 5/40

Estimated readiness: 82%
  (85% = ready for test; 75% = passing threshold)
```

### Readiness Calculation
```javascript
const readiness = {
  score: 0.82,
  confidence: 0.88,   // How often user is correct when they "know"
  coverage: 0.92,     // % of all possible questions seen
  consistency: 0.85,  // Std dev of recent 5 sessions (higher = more consistent)
  
  overall: (score * 0.4) + (confidence * 0.3) + (coverage * 0.2) + (consistency * 0.1),
  
  readyForTest: overall >= 0.85,
  message: overall >= 0.85 
    ? "✓ You're ready! Consider taking the real test."
    : `✗ Not quite ready. Focus on ${weakAreas[0].name} to improve.`
};
```

---

## Gamification (Light Touch)

### Streaks
```
🔥 7-day study streak
Last studied: Today at 3:45 PM
Longest streak: 14 days
```

### Badges
```
🎓 Speed Demon — Answer 10 questions in under 30s each
📚 Knowledge Seeker — Study 5 different categories
✓ Perfect Score — Get 40/40 on a full quiz
🏆 Mastery — Reach "Mastered" on 10+ questions
⏰ Early Bird — Study before 8 AM (3 times)
🌙 Night Owl — Study after 9 PM (5 times)
```

### Celebrations
- Confetti on first perfect 40/40
- "READY FOR TEST" badge when readiness ≥ 85%
- Level-up animation on category completion
- Streak milestones (7 days, 14 days, 30 days)

---

## Performance Optimization

### Question Bank Caching
```javascript
// Load all 40+ questions on app init (minimal: 50KB)
// IndexedDB for offline access
const db = await openDatabase('dmv-test');
await db.store('questions', questionBank);
```

### Session Resumption
```javascript
// User closes mid-quiz → auto-save state
// Reopen app → resume from last question
{
  quiz_state: {
    session_id: "SES-...",
    current_question: 12,
    answers_so_far: [1,0,1,0,...],
    start_time: "...",
    can_resume: true
  }
}
```

### Lazy Image Loading
```html
<img 
  src="signs/stop.svg"
  loading="lazy"
  alt="Stop Sign - octagon, red background"
/>
```

---

## Accessibility in Quiz Engine

### Keyboard Navigation
- `Tab` → cycle through options
- `Enter` / `Space` → select option
- `Arrow Up/Down` → previous/next option
- `ESC` → pause quiz

### Screen Reader Support
```html
<div role="radiogroup" aria-label="Select your answer">
  <label>
    <input type="radio" name="answer" value="A" />
    <span>A) Stop completely</span>
  </label>
  <!-- ... -->
</div>
```

### Color Blind Friendly
- Don't rely on red/green alone
- Use: ✓/✗, text labels, icons
- Sufficient contrast ratios (WCAG AA)

---

## Data Persistence

### Local Storage (Session-only)
```javascript
// Current quiz state (lost on page close)
sessionStorage.setItem('current_quiz', JSON.stringify(state));
```

### IndexedDB (Persistent)
```javascript
// Full history, settings, progress
db.store('sessions', sessionData);
db.store('questions_attempted', attemptHistory);
db.store('settings', { theme, notifications, etc });
```

### Optional: Cloud Sync
```javascript
// Future: sync progress to server
// Enable cross-device study
// Track long-term trends
POST /api/sync { userId, sessions, progress }
```

---

**Next Step:** See API.md for data schema and question bank structure.
