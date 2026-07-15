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
    // Wait for quiz engine to be ready
    await quizEngine.init();

    // Load data
    if (typeof QUESTIONS !== 'undefined') {
      this.allQuestions = QUESTIONS;
    }
    if (typeof ROAD_SIGNS !== 'undefined') {
      this.roadSigns = ROAD_SIGNS;
    }

    // Setup UI
    this.setupThemeToggle();
    this.setupNavigation();
    this.setupQuizControls();
    this.setupStudyMode();
    this.setupRoadSigns();
    this.setupProgress();

    // Render initial home screen
    await uiRenderer.renderHomeStats();
    uiRenderer.showView('home');
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

    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  /**
   * Navigation setup
   */
  setupNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('.menu-item');
    const homeCards = document.querySelectorAll('[data-view]');

    // Toggle menu
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    // Menu item clicks
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        const viewName = item.dataset.view;
        uiRenderer.showView(viewName);
        menu.classList.add('hidden');
      });
    });

    // Home card clicks
    homeCards.forEach(card => {
      if (card.dataset.view) {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.home-card')) {
            const viewName = card.dataset.view;
            if (viewName === 'quiz') {
              this.startQuiz();
            } else if (viewName === 'study') {
              uiRenderer.renderStudyCategories(this.allQuestions);
              uiRenderer.showView('study');
            } else if (viewName === 'signs') {
              uiRenderer.renderSignsGallery(this.roadSigns);
              uiRenderer.showView('signs');
            } else if (viewName === 'progress') {
              uiRenderer.renderProgress(this.allQuestions);
              uiRenderer.showView('progress');
            }
          }
        });
      }
    });

    // Back buttons
    document.getElementById('quizBackBtn').addEventListener('click', () => {
      uiRenderer.showView('home');
      uiRenderer.clearFeedback();
    });
    document.getElementById('studyBackBtn').addEventListener('click', () => uiRenderer.showView('home'));
    document.getElementById('signsBackBtn').addEventListener('click', () => uiRenderer.showView('home'));
    document.getElementById('progressBackBtn').addEventListener('click', () => uiRenderer.showView('home'));

    // Sign modal close
    document.getElementById('signModalClose').addEventListener('click', () => {
      document.getElementById('signModal').classList.add('hidden');
    });
  }

  /**
   * Start a quiz session
   */
  startQuiz() {
    this.currentSession = quizEngine.createQuizSession(this.allQuestions, 'quiz');
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
