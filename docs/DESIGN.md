# Ohio DMV Test Prep App — Design Specification

**Version:** 1.0  
**Focus:** Mobile-first, dark mode capable, interactive micro-interactions  
**Target Devices:** iOS 12+, Android 6+, tablet (iPad Air+), desktop browsers

---

## Design System

### Color Palette

#### Light Mode
- **Primary** — `#0366d6` (GitHub Blue) — CTAs, highlights, active states
- **Background** — `#ffffff` (White) — App background
- **Surface** — `#f5f5f5` (Light Gray) — Cards, containers
- **Text** — `#333333` (Dark Gray) — Primary text
- **Text Secondary** — `#666666` (Medium Gray) — Helper text, descriptions
- **Border** — `#ddd` (Light Border) — Dividers, outlines
- **Success** — `#28a745` (Green) — Correct answers, pass state
- **Danger** — `#cb2431` (Red) — Incorrect answers, errors
- **Warning** — `#ffc107` (Amber) — Tips, important notes

#### Dark Mode
- **Primary** — `#58a6ff` (GitHub Light Blue) — CTAs, highlights
- **Background** — `#0d1117` (Near Black) — OLED-friendly app background
- **Surface** — `#161b22` (Dark Gray) — Cards, containers
- **Text** — `#e1e4e8` (Off-White) — Primary text
- **Text Secondary** — `#8b949e` (Light Gray) — Helper text
- **Border** — `#30363d` (Dark Border) — Dividers
- **Success** — `#3fb950` (Green) — Correct answers
- **Danger** — `#f85149` (Red) — Incorrect answers
- **Warning** — `#d29922` (Amber) — Tips

### Typography

- **Font Family:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Base Size:** `16px` (prevents iOS auto-zoom)
- **Heading 1:** `28px` bold (light) / `24px` bold (dark)
- **Heading 2:** `20px` bold
- **Body:** `16px` regular / `14px` on mobile
- **Small:** `13px` (helper text, captions)
- **Monospace:** `'SF Mono', Monaco, monospace` (for code, debug info)

### Spacing Scale
- **xs:** `4px`
- **sm:** `8px`
- **md:** `12px`
- **lg:** `16px`
- **xl:** `20px`
- **2xl:** `24px`
- **3xl:** `32px`

### Border Radius
- **Buttons/Inputs:** `4px`
- **Cards:** `8px`
- **Large containers:** `12px`

### Shadows (Light Mode)
- **Subtle:** `0 1px 3px rgba(0,0,0,0.1)`
- **Card:** `0 2px 8px rgba(0,0,0,0.1)`
- **Elevated:** `0 4px 16px rgba(0,0,0,0.15)`

### Shadows (Dark Mode)
- **Subtle:** `0 1px 3px rgba(0,0,0,0.3)`
- **Card:** `0 2px 8px rgba(0,0,0,0.5)`
- **Elevated:** `0 4px 16px rgba(0,0,0,0.7)`

---

## Component Library

### 1. Button

**States:** default, hover, active, disabled, loading

**Variants:**
- **Primary** — `background: #0366d6` (light), `#58a6ff` (dark)
- **Secondary** — `background: #6c757d` (gray)
- **Success** — `background: #28a745` (green)
- **Danger** — `background: #cb2431` (red)

**Mobile Considerations:**
```css
button {
  padding: 12px 20px;
  font-size: 16px;           /* Prevents auto-zoom */
  min-height: 48px;          /* Touch-friendly */
  border-radius: 4px;
  white-space: nowrap;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  touch-action: manipulation; /* Disables 300ms tap delay */
}

button:active {
  transform: scale(0.98);    /* Micro-feedback */
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### 2. Card (Question Container)

**Structure:**
```
┌─────────────────────────────────────┐
│ Question #X / Category              │  ← Header
├─────────────────────────────────────┤
│ QUESTION TEXT                       │
│ (Large, left-aligned)               │
│                                     │
│ [🖼 IMAGE if road sign]            │
│                                     │
├─────────────────────────────────────┤
│ ◯ A) Option text                   │  ← Radio button (tap area)
│ ◯ B) Option text                   │
│ ◯ C) Option text                   │
│ ◯ D) Option text                   │
├─────────────────────────────────────┤
│ [SUBMIT] or [SKIP]                  │  ← Action buttons
└─────────────────────────────────────┘
```

**Mobile Breakpoints:**
- **320px (small phone):** Full width, 16px padding, stacked buttons
- **640px (large phone/tablet):** Max-width 90%, centered
- **Desktop:** Max-width 600px, centered

**CSS:**
```css
.question-card {
  background: white;              /* Light mode */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 24px 20px;             /* Responsive padding */
  margin: 16px;
  width: 100%;
  max-width: 600px;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #333;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 24px 0;
}

.option-button {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 2px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.option-button:hover {
  border-color: #0366d6;
  background: #f0f6ff;
}

.option-button.selected {
  border-color: #0366d6;
  background: #e7f2ff;
}

.option-button.correct {
  border-color: #28a745;
  background: #f0f9f5;
}

.option-button.incorrect {
  border-color: #cb2431;
  background: #fff5f5;
}
```

### 3. Progress Indicators

**Progress Ring** (Mobile Header):
```
        ╭───────╮
       /   12    \
      |  of 40   |
       \         /
        ╰───────╯
```

**Linear Progress Bar** (Desktop):
```
[████████░░░░░░░░░░░░] 30%
```

**CSS:**
```css
.progress-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
}

.progress-ring {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(
    #0366d6 0deg,
    #0366d6 calc(var(--progress) * 3.6deg),
    #ddd calc(var(--progress) * 3.6deg)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.progress-text {
  font-size: 14px;
  color: #666;
}
```

### 4. Road Sign Display

**Visual Card:**
```
┌──────────────────┐
│                  │
│    [STOP SIGN]   │  ← Large centered image (200x200px)
│                  │
├──────────────────┤
│ Stop Sign        │  ← Title
│ Regulatory       │  ← Category badge
├──────────────────┤
│ You must come to │
│ a complete stop  │
│ at this sign.    │
│ Check for cross  │
│ traffic before   │
│ proceeding.      │
├──────────────────┤
│ [Learn More ↗]   │
└──────────────────┘
```

**CSS:**
```css
.sign-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
  text-align: center;
}

.sign-image {
  width: 200px;
  height: 200px;
  margin: 0 auto 16px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #e7f2ff;
  color: #0366d6;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  margin: 8px 0;
}
```

### 5. Header / Navigation

**Mobile Header:**
```
╔════════════════════════════════════╗
║ ←  Ohio DMV Test          ☰        ║  ← Hamburger (optional)
╚════════════════════════════════════╝
```

**Desktop Header:**
```
╔════════════════════════════════════╗
║  Ohio DMV Test  │ Quiz │ Signs │ 📊 │
╚════════════════════════════════════╝
```

---

## Screen Layouts

### 1. Home Screen

**Mobile:**
```
┌─────────────────────────────────┐
│ Ohio DMV Test Prep              │
│ Study for your permit exam       │
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────────┐  │
│  │ 📝 Start Quiz             │  │
│  │ Take full 40-question test│  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 📚 Study Mode             │  │
│  │ Learn by category          │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 🚦 Road Signs             │  │
│  │ Visual reference library    │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 📊 My Progress            │  │
│  │ Scores & weak areas        │  │
│  └───────────────────────────┘  │
│                                 │
│ Your best score: 92% (37/40)    │
│ Last session: 2 days ago        │
│                                 │
└─────────────────────────────────┘
```

**Desktop:**
```
┌──────────────────────────────────────────────┐
│ Ohio DMV Test Prep                      ☀️/🌙 │
├──────────────────────────────────────────────┤
│  Quiz    Study    Road Signs    Progress     │
├──────────────────────────────────────────────┤
│                                              │
│         ┌────────────────────────┐           │
│         │ 📝 Start Full Quiz     │           │
│         │ 40-question exam       │           │
│         └────────────────────────┘           │
│                                              │
│  ┌──────────────┐  ┌──────────────────┐     │
│  │ 📚 Study     │  │ 🚦 Road Signs    │     │
│  │ By category  │  │ 100+ visual ref. │     │
│  └──────────────┘  └──────────────────┘     │
│                                              │
│  Best Score: 92% (37/40)  │  Last: 2d ago  │
│                                              │
└──────────────────────────────────────────────┘
```

### 2. Quiz Screen

**Question Display:**
```
┌─────────────────────────────────┐
│ Question 12 of 40               │ [████░░░░░░░░░░░ 30%]
├─────────────────────────────────┤
│                                 │
│  When you see a flashing red    │
│  traffic signal, you must:      │
│                                 │
├─────────────────────────────────┤
│ ◯ Proceed with caution          │
│ ◯ Stop and wait for green       │
│ ◉ Stop completely, then proceed │  ← Selected
│   when safe (like a stop sign)  │
│ ◯ Honk to alert other drivers   │
├─────────────────────────────────┤
│ [PREVIOUS]  [SUBMIT]  [SKIP]    │
└─────────────────────────────────┘
```

**Feedback After Submit:**
```
┌─────────────────────────────────┐
│ Question 12 of 40               │
├─────────────────────────────────┤
│ When you see a flashing red...  │
│                                 │
│ ✓ Stop completely, then proceed │  ← Green, checkmark
│                                 │
│ Explanation:                    │
│ A flashing red signal means the │
│ same as a stop sign. You MUST   │
│ stop completely before checking │
│ for cross traffic.              │
│                                 │
│ [NEXT QUESTION]                 │
└─────────────────────────────────┘
```

### 3. Road Signs Gallery

**Grid View (Mobile):**
```
┌─────────────────────────────────┐
│ 🚦 Road Signs Gallery           │ 🔍
├─────────────────────────────────┤
│ [Filters: All | Regulatory ▼]   │
│                                 │
│  ┌───────────┐  ┌───────────┐   │
│  │ [STOP]    │  │ [YIELD]   │   │
│  │ Stop Sign │  │ Yield     │   │
│  └───────────┘  └───────────┘   │
│                                 │
│  ┌───────────┐  ┌───────────┐   │
│  │  [<->]    │  │   [↑]     │   │
│  │ Two-way   │  │ One-way   │   │
│  └───────────┘  └───────────┘   │
│                                 │
│            ... more signs ...    │
│                                 │
└─────────────────────────────────┘
```

**Tap on Sign → Detail:**
```
┌─────────────────────────────────┐
│ ← Stop Sign                     │
├─────────────────────────────────┤
│                                 │
│         ┌─────────────┐         │
│         │   STOP      │         │
│         │             │         │
│         │    SIGN     │         │
│         └─────────────┘         │
│                                 │
│  Type: Regulatory Sign          │
│  Color: Red & White             │
│  Shape: Octagon                 │
│                                 │
│  When you see this sign, you    │
│  MUST come to a complete stop   │
│  before proceeding.             │
│                                 │
│  Key Point: Check for cross     │
│  traffic before going.          │
│                                 │
│  🔗 Practice Questions          │
│                                 │
└─────────────────────────────────┘
```

### 4. Progress / Stats Screen

```
┌─────────────────────────────────┐
│ 📊 My Progress                  │
├─────────────────────────────────┤
│                                 │
│  Overall Score                  │
│     ╭───────╮                   │
│    /   82%   \       ← 82/100   │
│   |  READY!  |                  │
│    \         /                  │
│     ╰───────╯                   │
│                                 │
│  By Category                    │
│  Road Signs      ▓▓▓▓▓░░ 85%   │
│  Speed & Safety  ▓▓▓▓░░░ 75%   │
│  Right-of-Way    ▓▓▓▓▓▓░ 90%   │
│  Alcohol & Drugs ▓▓▓░░░░ 65% ⚠️ │
│                                 │
│  Weak Areas                     │
│  • Pavement markings: 2/5       │
│  • Intersection rules: 3/5      │
│                                 │
│  [Practice Weak Areas]          │
│                                 │
└─────────────────────────────────┘
```

---

## Micro-Interactions

### 1. Card Reveal Animation

```javascript
/* When question loads */
.question-card {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 2. Correct Answer Feedback

```javascript
/* When correct answer selected */
.option-button.correct {
  animation: pulse 0.6s ease-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(40, 167, 69, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
  }
}

/* Plus checkmark animation */
::after {
  content: "✓";
  animation: checkmark 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes checkmark {
  0% { transform: scale(0) rotate(-45deg); }
  100% { transform: scale(1) rotate(0deg); }
}
```

### 3. Incorrect Answer Feedback

```javascript
/* When incorrect answer selected */
.option-button.incorrect {
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}
```

### 4. Progress Update

```javascript
/* When score increments */
.progress-ring {
  animation: spin 0.8s ease-out;
}

@keyframes spin {
  from { transform: rotate(-360deg); }
  to { transform: rotate(0deg); }
}
```

### 5. Button Press Feedback

```javascript
button:active {
  transform: scale(0.98);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}
```

---

## Accessibility

- **Focus Indicators:** Clear 3px blue outline on all interactive elements
- **ARIA Labels:** `aria-label`, `aria-describedby`, `role="radio"` for options
- **Keyboard Navigation:** Tab through options, Enter/Space to select, Arrow keys between cards
- **Color Contrast:** WCAG AA minimum (4.5:1 for text, 3:1 for graphics)
- **Text Alternatives:** All images have alt text or aria-label

---

## Mobile-Specific Guidelines

1. **Touch Targets:** Minimum 48x48px (12mm) for fingers
2. **No Hover-Only:** Critical info must work on tap
3. **Performance:** LCP < 2s, FCP < 1s (mobile 3G)
4. **Keyboard Input:** 16px font size prevents auto-zoom
5. **Safe Area:** Account for notches (viewport-fit=cover)
6. **No Double-Tap Zoom:** `touch-action: manipulation` on buttons
7. **Haptic Feedback:** Subtle vibration on answer selection (iOS/Android)

---

## Dark Mode Implementation

Toggle via theme provider context:
```javascript
const [theme, setTheme] = useState('light');

<html data-theme={theme}>
  <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
    {theme === 'light' ? '🌙' : '☀️'}
  </button>
</html>
```

CSS variables approach:
```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #333333;
  /* ... */
}

html[data-theme="dark"] {
  --bg-primary: #0d1117;
  --text-primary: #e1e4e8;
  /* ... */
}

body { background: var(--bg-primary); }
```

---

**Next Step:** See LEARNING-METHODS.md for quiz engine design and pedagogy.
