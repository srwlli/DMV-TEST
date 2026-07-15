# Ohio DMV Driver's Permit Test Prep App

A mobile-first, interactive study tool for students preparing for the Ohio BMV knowledge test.

## Features

- **Mobile-First Design** — Optimized for smartphones and tablets
- **Dark Mode** — OLED-friendly dark theme with light mode alternative
- **Interactive Quiz** — 40-question practice tests mirroring the official exam
- **Road Signs Gallery** — Visual reference library for all regulatory, warning, guide, and work zone signs
- **Spaced Repetition** — Learn by category, focus on weak areas, track progress
- **Micro-Interactions** — Smooth animations and visual feedback for engagement
- **Offline Capable** — Study material cached for offline access

## Test Format

- **40 Questions** — 20 road signs + 20 traffic rules/safe driving
- **Passing Score** — 30 correct (75% minimum)
- **Section Pass** — 15/20 on each section independently
- **Test Preparation** — Official Ohio BMV material based on driver handbook

## Project Structure

```
DMV-TEST/
├── docs/                   # Documentation & specifications
│   ├── RESEARCH.md        # Ohio BMV official requirements & findings
│   ├── DESIGN.md          # UI/UX design specs & component library
│   ├── LEARNING-METHODS.md # Pedagogical approach & quiz design
│   └── API.md             # Data structure & quiz bank schema
├── src/
│   ├── index.html         # Main app shell
│   ├── app.js             # Core application logic
│   ├── quiz-engine.js     # Quiz logic, scoring, progress tracking
│   ├── ui.js              # UI component rendering
│   └── styles/
│       ├── main.css       # Core styles
│       └── dark-mode.css  # Dark mode theme
├── data/
│   ├── questions.json     # 40+ verified test questions
│   ├── road-signs.json    # Road sign catalog (100+ signs)
│   └── topics.json        # Learning topic structure
├── tests/
│   └── quiz.test.js       # Quiz engine tests
└── .gitignore

```

## Development Roadmap

**Phase 1: MVP** — Core quiz, road signs gallery, mobile UI (this workorder)
**Phase 2: Polish** — Performance, offline support, analytics
**Phase 3: Features** — Social sharing, study schedules, tutoring mode

## Getting Started

```bash
git clone https://github.com/your-username/DMV-TEST.git
cd DMV-TEST
npm install
npm start
# Open http://localhost:3000
```

---

**Status:** Research complete. Ready for Phase 1 implementation.
