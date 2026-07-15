/**
 * Main App Controller - Orchestrates views, events, and quiz flow
 */

class DMVTestApp {
  constructor() {
    this.currentSession = null;
    this.allQuestions = [];
    this.roadSigns = [];
    this.init();
  }

  /**
   * Initialize app on page load
   */
  async init() {
    // Load data (synchronous globals from data/*.js)
    if (typeof QUESTIONS !== 'undefined') {
      this.allQuestions = QUESTIONS;
    }
    if (typeof ROAD_SIGNS !== 'undefined') {
      this.roadSigns = ROAD_SIGNS;
    }

    // Wire up the UI FIRST — navigation must work even if IndexedDB is
    // unavailable (private mode, storage disabled, etc.). Never gate event
    // listeners behind an async DB call.
    this.setupThemeToggle();
    this.setupNavigation();
    this.setupQuizControls();
    this.setupStudyMode();
    this.setupRoadSigns();
    this.setupProgress();
    uiRenderer.showView('home');

    // Render all static Lucide icons in the initial markup
    if (window.lucide) window.lucide.createIcons();

    // Now bring up persistence + stats. If the DB fails, the app still works
    // (quizzes just won't persist) — swallow so it can't break the UI.
    try {
      await quizEngine.init();
      await uiRenderer.renderHomeStats();
    } catch (err) {
      console.warn('Persistence unavailable; quiz history disabled.', err);
    }
  }

  /**
   * Theme toggle
   */
  setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', savedTheme);

    // Show a moon in light mode (tap to go dark), a sun in dark mode.
    const setThemeIcon = (theme) => {
      const iconEl = themeToggle.querySelector('.theme-icon');
      if (!iconEl) return;
      iconEl.innerHTML = `<i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
      if (window.lucide) window.lucide.createIcons();
    };
    setThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      setThemeIcon(newTheme);
    });
  }

  /**
   * Navigation setup
   */
  setupNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuItems = document.querySelectorAll('.menu-item');
    const homeCards = document.querySelectorAll('.home-card[data-view]');

    // Toggle the header nav dropdown. Hidden by default (.hidden); clicking the
    // hamburger reveals it anchored under the button. We register the
    // outside-click closer with capture and skip any click on the toggle, so
    // the opening click can't immediately close the menu.
    menuToggle.addEventListener('click', () => {
      const open = menu.classList.toggle('hidden') === false;
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    // Close the dropdown when clicking anywhere outside it or the toggle.
    document.addEventListener('click', (e) => {
      if (menu.classList.contains('hidden')) return;
      if (menuToggle.contains(e.target) || menu.contains(e.target)) return;
      menu.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
    });

    // Navbar links were removed in favor of the dropdown; navLinks is empty now
    // but the forEach stays harmless. Menu items + home cards route through
    // the same navigateTo() so every view renders its content.
    navLinks.forEach(link =>
      link.addEventListener('click', () => this.navigateTo(link.dataset.view)));

    menuItems.forEach(item =>
      item.addEventListener('click', () => {
        this.navigateTo(item.dataset.view);
        menu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
      }));

    homeCards.forEach(card =>
      card.addEventListener('click', () => this.navigateTo(card.dataset.view)));

    // Footer links with data-view (e.g. About) route through navigateTo too.
    document.querySelectorAll('.footer-link-btn[data-view]').forEach(btn =>
      btn.addEventListener('click', () => this.navigateTo(btn.dataset.view)));

    // In-page back buttons on study/signs/progress/about were removed — users
    // navigate via the navbar/menu or swipe back. The quiz header has its own
    // "previous question" control (wired in setupQuizControls).

    // Sign modal close
    document.getElementById('signModalClose').addEventListener('click', () => {
      document.getElementById('signModal').classList.add('hidden');
    });

    // Quiz mode picker: each option starts that mode; close/backdrop dismiss.
    const quizModeModal = document.getElementById('quizModeModal');
    document.querySelectorAll('.mode-option').forEach(btn =>
      btn.addEventListener('click', () => this.startQuiz(btn.dataset.mode)));
    document.getElementById('quizModeClose').addEventListener('click', () =>
      quizModeModal.classList.add('hidden'));
    quizModeModal.addEventListener('click', (e) => {
      if (e.target === quizModeModal) quizModeModal.classList.add('hidden');
    });
  }

  /**
   * Central view router: renders the target view's content, switches to it,
   * and syncs the navbar active state. Every nav entry point calls this.
   */
  navigateTo(viewName) {
    switch (viewName) {
      case 'quiz':
        this.openQuizModePicker();
        break;
      case 'study':
        uiRenderer.renderStudyCategories(this.allQuestions);
        uiRenderer.showView('study');
        break;
      case 'signs':
        uiRenderer.renderSignsGallery(this.roadSigns);
        uiRenderer.showView('signs');
        break;
      case 'progress':
        uiRenderer.renderProgress(this.allQuestions);
        uiRenderer.showView('progress');
        break;
      case 'about':
        uiRenderer.showView('about');
        break;
      case 'home':
      default:
        uiRenderer.renderHomeStats();
        uiRenderer.showView('home');
        viewName = 'home';
        break;
    }
    // Sync navbar active state
    document.querySelectorAll('.nav-link').forEach(link =>
      link.classList.toggle('active', link.dataset.view === viewName));
  }

  /**
   * Open the quiz mode-picker modal (Rules / Signs / State Test).
   */
  openQuizModePicker() {
    const modal = document.getElementById('quizModeModal');
    // Highlight the user's last-used mode (persisted across sessions).
    const lastMode = localStorage.getItem('lastQuizMode') || 'combined';
    document.querySelectorAll('.mode-option').forEach(btn =>
      btn.classList.toggle('mode-last', btn.dataset.mode === lastMode));
    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * Start a quiz session in the given mode:
   *   'rules' (40 rules) | 'signs' (40 signs) | 'combined' (20+20 state test)
   */
  startQuiz(mode = 'combined') {
    localStorage.setItem('lastQuizMode', mode);
    document.getElementById('quizModeModal').classList.add('hidden');
    this.currentSession = quizEngine.createQuizSession(this.allQuestions, mode);
    this.currentSession.startTime = Date.now();
    uiRenderer.showView('quiz');
    uiRenderer.renderQuestion(this.currentSession, 0);
  }

  /**
   * Quiz controls. Two-stage flow per question:
   *   1. Tap an option to SELECT it (highlight only — nothing is locked).
   *   2. Press SUBMIT to commit: the answer locks and feedback appears in place.
   *   3. Press NEXT to advance (or FINISH on the last question).
   * The same button carries the label for the current stage. The header chevron
   * goes to the previous question; the header X exits the quiz.
   */
  setupQuizControls() {
    const nextBtn = document.getElementById('nextBtn');
    const skipBtn = document.getElementById('skipBtn');
    const prevBtn = document.getElementById('quizPrevBtn');
    const exitBtn = document.getElementById('quizExitBtn');

    // Header: previous question
    prevBtn.addEventListener('click', () => {
      if (this.currentSession && this.currentSession.currentIndex > 0) {
        this.currentSession.currentIndex--;
        uiRenderer.clearFeedback();
        uiRenderer.renderQuestion(this.currentSession, this.currentSession.currentIndex);
      }
    });

    // Header: exit the quiz back to home
    exitBtn.addEventListener('click', () => {
      this.currentSession = null;
      uiRenderer.clearFeedback();
      this.navigateTo('home');
    });

    // Submit / Next / Finish — one button, two stages.
    nextBtn.addEventListener('click', async () => {
      const s = this.currentSession;
      if (!s) return;
      const index = s.currentIndex;
      const answered = s.answers.some(a => a.question_index === index);

      if (!answered) {
        // Stage 1 — SUBMIT: commit the selection and reveal feedback in place.
        // Do NOT advance; the button flips to Next/Finish for the second press.
        const committed = await uiRenderer.commitSelection(s, index);
        if (!committed) return; // nothing selected — button was gated, ignore
        uiRenderer.updateNavigationButtons(s, index);
        return;
      }

      // Stage 2 — NEXT / FINISH: this question is already answered.
      if (index === s.questions.length - 1) {
        s.endTime = Date.now();
        const results = await quizEngine.completeQuizSession(s);
        await uiRenderer.renderQuizResults(results);
      } else {
        s.currentIndex++;
        uiRenderer.clearFeedback();
        uiRenderer.renderQuestion(s, s.currentIndex);
      }
    });

    // Skip: move on without committing an answer.
    skipBtn.addEventListener('click', () => {
      const s = this.currentSession;
      if (s && s.currentIndex < s.questions.length - 1) {
        s.currentIndex++;
        uiRenderer.clearFeedback();
        uiRenderer.renderQuestion(s, s.currentIndex);
      }
    });
  }

  /**
   * Study mode setup
   */
  setupStudyMode() {
    // Category selection handled in renderStudyCategories
    // Study sessions work similarly to quiz but are not timed
  }

  /**
   * Road signs setup
   */
  setupRoadSigns() {
    const signsSearch = document.getElementById('signsSearch');
    const signsFilter = document.getElementById('signsFilter');

    signsSearch.addEventListener('input', () => this.filterSigns());
    signsFilter.addEventListener('change', () => this.filterSigns());
  }

  /**
   * Filter road signs by search and type
   */
  filterSigns() {
    const searchTerm = document.getElementById('signsSearch').value.toLowerCase();
    const filterType = document.getElementById('signsFilter').value;

    let filtered = this.roadSigns;

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm) ||
        s.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filterType) {
      filtered = filtered.filter(s => s.type === filterType);
    }

    uiRenderer.renderSignsGallery(filtered);
  }

  /**
   * Progress screen setup
   */
  setupProgress() {
    // Progress rendering handled in renderProgress
  }


  /**
   * Utility: Load question data from file
   */
  async loadQuestions() {
    try {
      const response = await fetch('data/questions.json');
      this.allQuestions = await response.json();
    } catch (error) {
      console.error('Error loading questions:', error);
      uiRenderer.showToast('Failed to load questions', 'error');
    }
  }

  /**
   * Utility: Load road signs data from file
   */
  async loadRoadSigns() {
    try {
      const response = await fetch('data/road-signs.json');
      this.roadSigns = await response.json();
    } catch (error) {
      console.error('Error loading road signs:', error);
      uiRenderer.showToast('Failed to load road signs', 'error');
    }
  }

  /**
   * Clear all data (for testing)
   */
  async clearAllData() {
    if (confirm('Are you sure you want to delete all saved data? This cannot be undone.')) {
      await quizEngine.clearAll();
      uiRenderer.showToast('All data cleared', 'success');
      location.reload();
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.dmvApp = new DMVTestApp();
});

// Listen for visibility changes to update stats
document.addEventListener('visibilitychange', async () => {
  if (!document.hidden) {
    await uiRenderer.renderHomeStats();
  }
});
