# API & Data Schema Specification

**Version:** 1.0  
**Format:** JSON  
**Storage:** IndexedDB (local) + optional cloud sync  

---

## Questions Schema

### Individual Question Object

```json
{
  "id": "Q001",
  "type": "multiple-choice",
  "category": "road-signs",
  "subcategory": "regulatory",
  "difficulty": "easy",
  "question_text": "This road sign means:",
  "image_url": "data/images/stop-sign.svg",
  "image_alt": "Octagonal red and white stop sign",
  
  "options": [
    {
      "id": "Q001-A",
      "label": "A",
      "text": "Yield to traffic",
      "correct": false
    },
    {
      "id": "Q001-B",
      "label": "B",
      "text": "Stop completely, check for traffic, proceed when safe",
      "correct": true
    },
    {
      "id": "Q001-C",
      "label": "C",
      "text": "Slow down and proceed with caution",
      "correct": false
    },
    {
      "id": "Q001-D",
      "label": "D",
      "text": "Turn right when safe",
      "correct": false
    }
  ],
  
  "explanation": {
    "short": "A stop sign requires a complete stop before proceeding.",
    "long": "The stop sign is an octagonal red and white regulatory sign. When you encounter a stop sign, you must:\n1. Come to a complete stop\n2. Check for cross traffic in all directions\n3. Proceed only when safe\n\nThis is different from a yield sign, which allows you to proceed if no traffic is approaching.",
    "real_world_example": "You're driving through a residential neighborhood and see a stop sign at an intersection. You must stop completely, look both ways, and then proceed if no cars or pedestrians are crossing.",
    "related_concept": "Yield signs (triangular) and Stop signs (octagonal) are different. Stop requires a complete halt; yield allows passing if clear."
  },
  
  "tags": [
    "regulatory-sign",
    "safety-critical",
    "common-test-question",
    "intersection-control"
  ],
  
  "metadata": {
    "source": "official",
    "source_url": "https://www.bmv.ohio.gov/dl-sample-test.aspx",
    "miss_rate": 0.08,
    "time_limit_seconds": 60,
    "created_date": "2026-07-01",
    "last_updated": "2026-07-14"
  }
}
```

### Complete Questions Bank (questions.json)

```json
{
  "version": "1.0",
  "updated_at": "2026-07-14T00:00:00Z",
  "total_questions": 45,
  "by_category": {
    "road-signs": 25,
    "traffic-rules": 20
  },
  "questions": [
    { /* Q001 */ },
    { /* Q002 */ },
    // ... all questions
  ],
  "metadata": {
    "source": "Ohio BMV Official",
    "based_on": "Ohio Driver Handbook 2026",
    "compliance": "Reflects actual test format and content"
  }
}
```

---

## Road Signs Catalog

### Individual Sign Object

```json
{
  "id": "SIGN-STOP-001",
  "name": "Stop Sign",
  "type": "regulatory",
  "
  "color": "red",
  "shape": "octagon",
  "image_url": "data/images/signs/stop.svg",
  
  "meaning": "You must come to a complete stop at this sign and check for crossing traffic before proceeding.",
  
  "rules": [
    "Complete stop is mandatory",
    "Must stop at the stop line or crosswalk",
    "If no markings, stop near intersecting roadway",
    "Check for all cross traffic before proceeding",
    "Do not roll through or do a 'California stop'"
  ],
  
  "variations": [
    {
      "description": "4-way stop",
      "rule": "When all directions have stop signs, yield to the right if arriving simultaneously"
    },
    {
      "description": "2-way stop",
      "rule": "Only certain directions stop; others have the right-of-way"
    }
  ],
  
  "common_mistakes": [
    "Failing to stop completely (rolling stop)",
    "Not checking all directions for traffic",
    "Pulling into the intersection before confirming it's safe"
  ],
  
  "quick_tip": "STOP means STOP. Not slow down, not roll, but stop completely.",
  
  "related_questions": ["Q001", "Q015", "Q028"],
  
  "test_frequency": "high"
}
```

### Road Signs Catalog (signs.json)

```json
{
  "version": "1.0",
  "updated_at": "2026-07-14T00:00:00Z",
  "total_signs": 107,
  "by_type": {
    "regulatory": 45,
    "warning": 51,
    "guide": 5,
    "work-zone": 6
  },
  "signs": [
    { /* SIGN-STOP-001 */ },
    { /* SIGN-YIELD-001 */ },
    // ... all signs
  ]
}
```

---

## Topics & Learning Paths

### Topics.json Structure

```json
{
  "version": "1.0",
  "topics": [
    {
      "id": "TOPIC-REGULATORY",
      "name": "Regulatory Signs",
      "description": "Black and white enforcement signs",
      "category": "road-signs",
      "order": 1,
      "question_count": 12,
      "questions": ["Q001", "Q002", "Q003", /* ... */],
      "related_signs": ["SIGN-STOP-001", "SIGN-YIELD-001", /* ... */],
      "learning_objectives": [
        "Identify common regulatory signs",
        "Understand what each sign requires",
        "Know penalties for ignoring"
      ],
      "estimated_time_minutes": 15
    },
    {
      "id": "TOPIC-WARNINGS",
      "name": "Warning Signs",
      "description": "Yellow diamond-shaped hazard alerts",
      "category": "road-signs",
      "order": 2,
      "question_count": 8,
      "questions": ["Q010", /* ... */],
      "related_signs": ["SIGN-CURVE-001", "SIGN-PEDESTRIAN-001", /* ... */],
      "learning_objectives": [
        "Recognize warning sign colors and shapes",
        "Understand hazards they alert to",
        "Know appropriate responses"
      ],
      "estimated_time_minutes": 12
    },
    {
      "id": "TOPIC-PAVEMENT",
      "name": "Pavement Markings",
      "description": "Yellow and white line meanings (HIGH MISS RATE)",
      "category": "road-signs",
      "order": 3,
      "difficulty": "hard",
      "question_count": 5,
      "questions": ["Q007", "Q012", "Q020", /* ... */],
      "miss_rate": 0.322,
      "learning_objectives": [
        "Distinguish yellow vs white lines",
        "Understand solid vs dashed lines",
        "Know passing rules"
      ],
      "estimated_time_minutes": 10,
      "tips": "Yellow = center line (opposing traffic). White = lane dividers (same direction)."
    },
    {
      "id": "TOPIC-ROW",
      "name": "Right-of-Way Rules",
      "description": "Priority at intersections and special situations (HIGH MISS RATE)",
      "category": "traffic-rules",
      "order": 5,
      "difficulty": "hard",
      "question_count": 6,
      "questions": ["Q015", "Q018", "Q023", /* ... */],
      "miss_rate": 0.315,
      "learning_objectives": [
        "Understand 4-way stop rules",
        "Know pedestrian priorities",
        "Handle emergency vehicles"
      ],
      "estimated_time_minutes": 12
    },
    {
      "id": "TOPIC-ALCOHOL",
      "name": "Alcohol & Drugs (Young Driver)",
      "description": "BAC limits, effects, penalties for under-21",
      "category": "traffic-rules",
      "order": 8,
      "question_count": 4,
      "questions": ["Q032", "Q035", "Q038", "Q040"],
      "learning_objectives": [
        "Know under-21 BAC limit (0.02%)",
        "Understand alcohol effects on driving",
        "Know penalties for violations"
      ],
      "estimated_time_minutes": 8
    }
  ]
}
```

---

## Session/History Schema

### Session Object (Stored after each study session)

```json
{
  "session_id": "SES-20260714-001",
  "user_id": "optional-anonymous-or-uuid",
  "created_at": "2026-07-14T12:00:00Z",
  "completed_at": "2026-07-14T12:45:00Z",
  "duration_seconds": 2700,
  
  "mode": "quiz",
  "category_filter": null,
  
  "questions_attempted": 40,
  "correct": 37,
  "incorrect": 3,
  "skipped": 0,
  
  "score_percent": 92.5,
  "passing": true,
  
  "time_stats": {
    "total_time_seconds": 2700,
    "avg_time_per_question": 67.5,
    "fastest_question": 8.2,
    "slowest_question": 120.5
  },
  
  "by_category": {
    "road-signs": {
      "total": 20,
      "correct": 18,
      "incorrect": 2,
      "percent": 90.0
    },
    "traffic-rules": {
      "total": 20,
      "correct": 19,
      "incorrect": 1,
      "percent": 95.0
    }
  },
  
  "answers": [
    {
      "question_id": "Q001",
      "question_category": "road-signs",
      "question_subcategory": "regulatory",
      "user_answer_id": "Q001-B",
      "correct_answer_id": "Q001-B",
      "correct": true,
      "time_to_answer_seconds": 12.5
    },
    {
      "question_id": "Q007",
      "question_category": "road-signs",
      "question_subcategory": "pavement",
      "user_answer_id": "Q007-A",
      "correct_answer_id": "Q007-C",
      "correct": false,
      "time_to_answer_seconds": 45.2
    },
    // ... 38 more answers
  ],
  
  "weak_topics": [
    "pavement-markings",
    "intersection-priority"
  ]
}
```

### Question Attempt (Granular history for spaced repetition)

```json
{
  "attempt_id": "ATT-Q007-20260714",
  "question_id": "Q007",
  "session_id": "SES-20260714-001",
  "timestamp": "2026-07-14T12:15:30Z",
  "user_answer": "Q007-A",
  "correct": false,
  "time_to_answer_seconds": 45.2,
  
  "spaced_repetition": {
    "attempt_number": 2,
    "previous_attempts": [
      {
        "timestamp": "2026-07-13T14:00:00Z",
        "correct": false
      }
    ],
    "current_state": "LEARNING",
    "next_review_date": "2026-07-15T12:15:30Z"
  }
}
```

---

## Progress Tracking

### User Progress Object

```json
{
  "user_id": "optional",
  "last_updated": "2026-07-14T12:45:00Z",
  
  "overall_stats": {
    "sessions_completed": 12,
    "total_questions_attempted": 480,
    "total_correct": 393,
    "overall_accuracy_percent": 81.875,
    "estimated_readiness_percent": 82
  },
  
  "by_category": {
    "road-signs": {
      "sessions": 5,
      "attempts": 100,
      "correct": 88,
      "accuracy_percent": 88.0,
      "topics_mastered": 3,
      "topics_learning": 2,
      "topics_new": 0
    },
    "traffic-rules": {
      "sessions": 7,
      "attempts": 140,
      "correct": 105,
      "accuracy_percent": 75.0,
      "topics_mastered": 2,
      "topics_learning": 4,
      "topics_new": 1
    }
  },
  
  "question_states": {
    "new": 5,
    "learning": 20,
    "review": 15,
    "mastered": 5
  },
  
  "weak_areas": [
    {
      "topic_id": "TOPIC-PAVEMENT",
      "name": "Pavement Markings",
      "accuracy_percent": 60.0,
      "miss_count": 4,
      "priority": "high"
    },
    {
      "topic_id": "TOPIC-ALCOHOL",
      "name": "Alcohol & Drugs",
      "accuracy_percent": 70.0,
      "miss_count": 3,
      "priority": "medium"
    }
  ],
  
  "streaks": {
    "current_days": 7,
    "longest_days": 14,
    "last_study_date": "2026-07-14"
  },
  
  "badges_earned": [
    "knowledge-seeker",
    "speed-demon"
  ]
}
```

---

## Settings & Preferences

### User Settings Object

```json
{
  "user_id": "optional",
  "last_updated": "2026-07-14T10:00:00Z",
  
  "theme": "dark",
  "language": "en-US",
  "accessibility": {
    "high_contrast": false,
    "text_size": "normal",
    "animations_enabled": true,
    "haptic_feedback": true
  },
  
  "study_preferences": {
    "quiz_time_limit_minutes": 40,
    "show_explanations_immediately": true,
    "show_hints": false,
    "auto_advance_delay_seconds": 0,
    "shuffle_categories": true
  },
  
  "notifications": {
    "streak_reminders": true,
    "daily_goal_reminders": true,
    "study_time": "18:00"
  },
  
  "privacy": {
    "allow_analytics": false,
    "allow_crash_reports": true,
    "sync_to_cloud": false
  }
}
```

---

## API Endpoints (Future Cloud Integration)

### GET /api/questions
Fetch question bank
```
GET /api/questions?category=road-signs&limit=40
Response: { questions: [...], total: 45 }
```

### POST /api/sessions
Save session data
```
POST /api/sessions
Body: { session: {...} }
Response: { session_id: "SES-..." }
```

### GET /api/progress
Fetch user progress
```
GET /api/progress?user_id=UUID
Response: { overall_stats: {...}, by_category: {...} }
```

### GET /api/weak-areas
Fetch recommended topics to study
```
GET /api/weak-areas?user_id=UUID
Response: { weak_areas: [...], recommended: "TOPIC-PAVEMENT" }
```

---

## Error Handling

### Error Response Format

```json
{
  "error": true,
  "code": "QUESTIONS_LOAD_FAILED",
  "message": "Failed to load questions from storage",
  "details": {
    "reason": "IndexedDB unavailable",
    "fallback": "Using cached version from last session"
  }
}
```

### Common Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| `DATA_LOAD_FAILED` | Cannot load from IndexedDB | Retry or use backup |
| `SYNC_FAILED` | Cloud sync error (non-blocking) | Log & continue locally |
| `INVALID_QUESTION` | Malformed question object | Skip & report |
| `STORAGE_QUOTA_EXCEEDED` | Device storage full | Warn user, cleanup old sessions |

---

## Performance Notes

- **Questions.json**: ~50KB (45 questions × 1.1KB avg)
- **Signs.json**: ~30KB (107 signs × 280B avg)
- **Topics.json**: ~5KB
- **One Session**: ~15KB average
- **Total IndexedDB needed**: ~500KB (for 100+ sessions + all reference data)

---

**Next Step:** Proceed to component implementation in `src/` directory.
