# Ohio DMV Driver's Permit Test Prep App

A mobile-first, interactive study tool for students preparing for the Ohio BMV knowledge test.

🎯 **[Live App](https://srwlli.github.io/DMV-TEST/)** — Study now on your phone or computer

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

The app is served from the repo root so GitHub Pages (branch source) can host it directly.

```
DMV-TEST/
├── index.html         # Main app shell (served at site root)
├── app.js             # Core application logic
├── quiz-engine.js     # Quiz logic, scoring, progress tracking
├── ui.js              # UI component rendering
├── styles/
│   ├── main.css       # Core styles
│   └── dark-mode.css  # Dark mode theme
├── data/
│   ├── questions.js   # 40 verified test questions
│   └── road-signs.js  # Road sign catalog (107 signs)
├── docs/              # Documentation & specifications
│   ├── RESEARCH.md    # Ohio BMV official requirements & findings
│   ├── DESIGN.md      # UI/UX design specs & component library
│   ├── LEARNING-METHODS.md # Pedagogical approach & quiz design
│   └── API.md         # Data structure & quiz bank schema
├── serve.js           # Local dev server (node serve.js)
├── .nojekyll          # Tell Pages to serve raw static files
└── README.md
```

## Development Roadmap

**Phase 1: MVP** — Core quiz, road signs gallery, mobile UI (this workorder)
**Phase 2: Polish** — Performance, offline support, analytics
**Phase 3: Features** — Social sharing, study schedules, tutoring mode

## Getting Started

### Online (No Installation)
Visit [https://srwlli.github.io/DMV-TEST/](https://srwlli.github.io/DMV-TEST/) and start studying immediately. The app works on any browser and stores your progress locally on your device.

### Local Development
```bash
git clone https://github.com/srwlli/DMV-TEST.git
cd DMV-TEST
node serve.js                 # then open http://localhost:3000
# Or any static server, e.g.:  python -m http.server 3000
```

## Official Resources

📘 **[Ohio Driver Manual PDF](https://dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/hsy7607.pdf)** — Official BMV Handbook (HSY 7607)

The app is built from verified material from the official Ohio Department of Public Safety driver handbook and state traffic laws.

---

**Status:** MVP complete with 40 verified questions, 107 road signs, and full UI/UX. Live on GitHub Pages.
