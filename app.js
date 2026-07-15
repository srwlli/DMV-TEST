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

    // Toggle mobile dropdown menu
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    // Persistent navbar links + mobile menu items + home cards all route
    // through the same navigateTo() so every view renders its content.
    navLinks.forEach(link =>
      link.addEventListener('click', () => this.navigateTo(link.dataset.view)));

    menuItems.forEach(item =>
      item.addEventListener('click', () => {
        this.navigateTo(item.dataset.view);
        menu.classList.add('hidden');
      }));

    homeCards.forEach(card =>
      card.addEventListener('click', () => this.navigateTo(card.dataset.view)));

    // Back buttons
    document.getElementById('quizBackBtn').addEventListener('click', () => {
      uiRenderer.clearFeedback();
      this.navigateTo('home');
    });
    document.getElementById('studyBackBtn').addEventListener('click', () => this.navigateTo('home'));
    document.getElementById('signsBackBtn').addEventListener('click', () => this.navigateTo('home'));
    document.getElementById('progressBackBtn').addEventListener('click', () => this.navigateTo('home'));
    document.getElementById('aboutBackBtn').addEventListener('click', () => this.navigateTo('home'));

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
    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * Start a quiz session in the given mode:
   *   'rules' (40 rules) | 'signs' (40 signs) | 'combined' (20+20 state test)
   */
  startQuiz(mode = 'combined') {
    document.getElementById('quizModeModal').classList.add('hidden');
    this.currentSession = quizEngine.createQuizSession(this.allQuestions, mode);
    this.currentSession.startTime = Date.now();
    uiRenderer.showView('quiz');
    uiRenderer.renderQuestion(this.currentSession, 0);
  }

  /**
   * Quiz controls (prev, next, skip, submit)
   */
  setupQuizControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const skipBtn = document.getElementById('skipBtn');

    prevBtn.addEventListener('click', () => {
      if (this.currentSession && this.currentSession.currentIndex > 0) {
        this.currentSession.currentIndex--;
        uiRenderer.clearFeedback();
        uiRenderer.renderQuestion(this.currentSession, this.currentSession.currentIndex);
      }
    });

    nextBtn.addEventListener('click', async () => {
      if (!this.currentSession) return;

      // Check if this is the last question
      if (this.currentSession.currentIndex === this.currentSession.questions.length - 1) {
        // Submit quiz
        this.currentSession.endTime = Date.now();
        const results = await quizEngine.completeQuizSession(this.currentSession);
        await uiRenderer.renderQuizResults(results);
      } else {
        // Move to next question
        this.currentSession.currentIndex++;
        uiRenderer.clearFeedback();
        uiRenderer.renderQuestion(this.currentSession, this.currentSession.currentIndex);
      }
    });

    skipBtn.addEventListener('click', () => {
      if (this.currentSession && this.currentSession.currentIndex < this.currentSession.questions.length - 1) {
        this.currentSession.currentIndex++;
        uiRenderer.clearFeedback();
        uiRenderer.renderQuestion(this.currentSession, this.currentSession.currentIndex);
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
   * Handle quiz menu (pause/exit)
   */
  setupQuizMenu() {
    const quizMenuBtn = document.getElementById('quizMenuBtn');

    quizMenuBtn.addEventListener('click', () => {
      const menu = document.createElement('div');
      menu.className = 'quiz-menu-dropdown';
      menu.innerHTML = `
        <button class="menu-option">Resume</button>
        <button class="menu-option">Quit Quiz</button>
      `;

      menu.querySelector('.menu-option:nth-child(2)').addEventListener('click', () => {
        this.currentSession = null;
        uiRenderer.showView('home');
        menu.remove();
      });

      document.body.appendChild(menu);
    });
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
