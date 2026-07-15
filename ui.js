/**
 * UI Renderer - Handles all DOM updates and interactive elements
 */

class UIRenderer {
  constructor() {
    this.currentSession = null;
    this.currentMode = 'quiz';
  }

  /**
   * Render a question card
   */
  renderQuestion(session, questionIndex) {
    const question = session.questions[questionIndex];
    const qNumber = document.getElementById('qNumber');
    const qCategory = document.getElementById('qCategory');
    const qImageContainer = document.getElementById('qImageContainer');
    const qImage = document.getElementById('qImage');
    const qText = document.getElementById('qText');
    const optionsGroup = document.getElementById('optionsGroup');

    qNumber.textContent = questionIndex + 1;
    const qTotal = document.getElementById('qTotal');
    if (qTotal) qTotal.textContent = session.questions.length;
    qCategory.textContent = question.category === 'road-signs' ? 'Road Sign' : 'Traffic Rules';

    // Show/hide image based on question type
    if (question.image_url) {
      qImageContainer.classList.remove('hidden');
      qImage.src = question.image_url;
      qImage.alt = question.text;
    } else {
      qImageContainer.classList.add('hidden');
    }

    qText.textContent = question.text;

    // Clear previous options
    optionsGroup.innerHTML = '';

    // Render options. Tapping an option SELECTS it (highlight only) — it does
    // not lock in the answer. The user commits by pressing Next/Submit.
    const alreadyAnswered = session.answers.some(a => a.question_index === questionIndex);
    question.options.forEach((option, index) => {
      const optionBtn = document.createElement('button');
      optionBtn.className = 'option-button';
      optionBtn.dataset.answerId = option.id;
      optionBtn.dataset.questionIndex = questionIndex;

      optionBtn.innerHTML = `
        <span class="option-label">${String.fromCharCode(65 + index)}.</span>
        <span class="option-text">${option.text}</span>
      `;

      optionBtn.addEventListener('click', () => this.selectOption(session, questionIndex, option.id));

      optionsGroup.appendChild(optionBtn);
    });

    // If this question was already answered (navigating back), restore the
    // committed selection + feedback; otherwise reflect any pending selection.
    if (alreadyAnswered) {
      this.showCommittedState(session, questionIndex);
    } else {
      this.reflectSelection(session, questionIndex);
    }

    this.updateProgressRing(questionIndex + 1, session.questions.length);
    this.updateNavigationButtons(session, questionIndex);
  }

  /**
   * Select (not commit) an option — highlight it and enable Next/Submit.
   */
  selectOption(session, questionIndex, answerId) {
    // A committed question is locked; ignore further taps.
    if (session.answers.some(a => a.question_index === questionIndex)) return;

    session.pendingSelection = session.pendingSelection || {};
    session.pendingSelection[questionIndex] = answerId;
    this.reflectSelection(session, questionIndex);

    // Enable the commit (Next/Submit) button now that something is selected.
    document.getElementById('nextBtn').disabled = false;
  }

  /**
   * Visually mark the currently-selected (pending) option.
   */
  reflectSelection(session, questionIndex) {
    const pending = session.pendingSelection && session.pendingSelection[questionIndex];
    document.querySelectorAll('.option-button').forEach(btn => {
      btn.classList.toggle('selected', pending != null && btn.dataset.answerId === pending);
    });
    // Enable Next/Submit only if there is a selection for this question.
    document.getElementById('nextBtn').disabled = pending == null;
  }

  /**
   * Commit the pending selection for a question: record the attempt and show
   * correct/incorrect feedback. Called by the Next/Submit handler.
   * Returns true if committed, false if there was nothing to commit.
   */
  async commitSelection(session, questionIndex) {
    // Already committed → nothing to do.
    if (session.answers.some(a => a.question_index === questionIndex)) return true;

    const answerId = session.pendingSelection && session.pendingSelection[questionIndex];
    if (answerId == null) return false;

    const { correct } = await quizEngine.submitAnswer(session, questionIndex, answerId);
    // Tag the answer with its index so we can detect answered questions on back-nav.
    session.answers[session.answers.length - 1].question_index = questionIndex;
    session.answers[session.answers.length - 1].user_answer_id = answerId;

    this.showCommittedState(session, questionIndex);
    return true;
  }

  /**
   * Render the locked correct/incorrect state + feedback for an answered
   * question (used after commit and when navigating back to it).
   */
  showCommittedState(session, questionIndex) {
    const question = session.questions[questionIndex];
    const answer = session.answers.find(a => a.question_index === questionIndex);
    const correctOptionId = question.options.find(o => o.correct).id;
    const userAnswerId = answer ? answer.user_answer_id : null;

    document.querySelectorAll('.option-button').forEach(btn => {
      btn.classList.remove('selected');
      btn.style.pointerEvents = 'none';
      const id = btn.dataset.answerId;
      if (id === correctOptionId) btn.classList.add('correct');
      if (id === userAnswerId && userAnswerId !== correctOptionId) btn.classList.add('incorrect');
    });

    const correct = userAnswerId === correctOptionId;
    this.showFeedback(question, correct);
    document.getElementById('nextBtn').disabled = false;
  }

  /**
   * Show feedback modal
   */
  showFeedback(question, correct, attempt) {
    const feedbackContainer = document.getElementById('feedbackContainer');
    const correctOption = question.options.find(o => o.correct);

    feedbackContainer.innerHTML = `
      <div class="feedback-card ${correct ? 'feedback-correct' : 'feedback-incorrect'}">
        <div class="feedback-header">
          <span class="feedback-status">
            <i data-lucide="${correct ? 'check-circle' : 'x-circle'}"></i>
            ${correct ? 'Correct!' : 'Incorrect'}
          </span>
        </div>
        <div class="feedback-body">
          <div class="feedback-explanation">
            <strong>Explanation:</strong>
            <p>${question.explanation}</p>
          </div>
          <div class="feedback-correct-answer">
            <strong>Correct Answer:</strong>
            <p>${correctOption.text}</p>
          </div>
          ${this.renderSource(question.source)}
        </div>
      </div>
    `;

    feedbackContainer.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();

    // Trigger animation
    feedbackContainer.style.animation = 'none';
    setTimeout(() => {
      feedbackContainer.style.animation = correct ? 'slideUp 0.4s ease' : 'shake 0.4s ease';
    }, 10);
  }

  /**
   * Render the source citation for a question — a deep-link to the official
   * source. Every question carries one (manual page or BMV sample test).
   */
  renderSource(source) {
    if (!source || !source.url) return '';
    let label;
    if (source.badge === 'bmv-official-sample') {
      label = 'Official Ohio BMV Sample Test';
    } else if (source.pdf_page) {
      label = `Ohio Driver Manual, p.${source.pdf_page}` +
        (source.section ? ` — ${source.section}` : '');
    } else {
      label = source.document || 'Official source';
    }
    return `
      <div class="feedback-source">
        <i data-lucide="book-open"></i>
        <a href="${source.url}" target="_blank" rel="noopener noreferrer">Source: ${label}</a>
      </div>
    `;
  }

  /**
   * Clear feedback
   */
  clearFeedback() {
    const feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.classList.add('hidden');
    feedbackContainer.innerHTML = '';

    // Re-enable navigation
    document.querySelectorAll('.option-button').forEach(btn => {
      btn.style.pointerEvents = 'auto';
      btn.style.opacity = '1';
      btn.classList.remove('correct', 'incorrect', 'selected');
    });
  }

  /**
   * Update progress ring
   */
  updateProgressRing(current, total) {
    const percent = Math.round((current / total) * 100);
    const progressRing = document.getElementById('progressRing');
    const questionCounter = document.getElementById('questionCounter');

    progressRing.style.setProperty('--progress', percent);
    questionCounter.textContent = `${current}/${total}`;
  }

  /**
   * Update navigation buttons for the current question.
   * - Header prev (quizPrevBtn) enabled unless on the first question.
   * - Next/Submit label reflects last-question; disabled until the question
   *   has a selection or is already committed (set by reflect/commit helpers).
   */
  updateNavigationButtons(session, index) {
    const total = session.questions.length;
    const prevBtn = document.getElementById('quizPrevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const isLast = index === total - 1;

    if (prevBtn) prevBtn.disabled = index === 0;

    if (isLast) {
      nextBtn.innerHTML = 'Submit Quiz <i data-lucide="check"></i>';
      nextBtn.classList.add('btn-success');
    } else {
      nextBtn.innerHTML = 'Next <i data-lucide="arrow-right"></i>';
      nextBtn.classList.remove('btn-success');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * Render quiz results modal
   */
  async renderQuizResults(sessionData) {
    const modal = document.getElementById('quizResultsModal');
    const body = document.getElementById('quizResultsBody');

    const passed = sessionData.passing
      ? '<i data-lucide="check-circle"></i> PASSED'
      : '<i data-lucide="x-circle"></i> Did not pass';
    const passClass = sessionData.passing ? 'result-pass' : 'result-fail';

    let categoryBreakdown = '';
    Object.entries(sessionData.by_category).forEach(([category, stats]) => {
      const categoryPercent = Math.round((stats.correct / stats.total) * 100);
      categoryBreakdown += `
        <div class="category-score-item">
          <div class="category-name">${category}</div>
          <div class="category-stats">${stats.correct}/${stats.total} (${categoryPercent}%)</div>
          <div class="category-score-bar">
            <div class="score-fill" style="width: ${categoryPercent}%"></div>
          </div>
        </div>
      `;
    });

    body.innerHTML = `
      <div class="results-container">
        <h2 class="results-title">Quiz Complete!</h2>
        <div class="results-score ${passClass}">
          <div class="score-large">${sessionData.score_percent}%</div>
          <div class="score-label">${passed}</div>
          <div class="score-detail">${sessionData.correct} / ${sessionData.questions_attempted} correct</div>
        </div>

        <div class="results-stats">
          <div class="stat-row">
            <span>Time:</span>
            <span>${this.formatSeconds(sessionData.duration_seconds)}</span>
          </div>
          <div class="stat-row">
            <span>Passing Score:</span>
            <span>${Math.ceil(sessionData.questions_attempted * 0.75)} / ${sessionData.questions_attempted} (75%)</span>
          </div>
        </div>

        <div class="category-scores">
          <h3>Category Breakdown</h3>
          ${categoryBreakdown}
        </div>

        <div class="results-actions">
          <button class="btn btn-primary" id="retakeBtn">Retake Quiz</button>
          <button class="btn btn-secondary" id="reviewBtn">Review Answers</button>
          <button class="btn btn-ghost" id="homeBtn">Back to Home</button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();

    // Attach event listeners
    document.getElementById('retakeBtn').addEventListener('click', () => {
      modal.classList.add('hidden');
      window.location.hash = '#quiz';
      window.location.reload();
    });

    document.getElementById('reviewBtn').addEventListener('click', () => {
      modal.classList.add('hidden');
      this.renderReviewMode(sessionData);
    });

    document.getElementById('homeBtn').addEventListener('click', () => {
      modal.classList.add('hidden');
      this.showView('home');
    });

    document.getElementById('quizResultsClose').addEventListener('click', () => {
      modal.classList.add('hidden');
      this.showView('home');
    });
  }

  /**
   * Render review mode
   */
  renderReviewMode(sessionData) {
    const reviewContainer = document.createElement('div');
    reviewContainer.className = 'review-container';

    sessionData.answered_questions.forEach((answer, index) => {
      const question = sessionData.answered_questions[index];
      const cardClass = answer.correct ? 'review-correct' : 'review-incorrect';

      const reviewCard = document.createElement('div');
      reviewCard.className = `review-card ${cardClass}`;
      reviewCard.innerHTML = `
        <div class="review-number">Question ${index + 1}</div>
        <div class="review-status">${answer.correct ? '<i data-lucide="check"></i> Correct' : '<i data-lucide="x"></i> Incorrect'}</div>
      `;

      reviewContainer.appendChild(reviewCard);
    });

    this.showView('review');
  }

  /**
   * Render home screen stats
   */
  async renderHomeStats() {
    const sessions = await quizEngine.getSessions();
    const bestScoreEl = document.getElementById('bestScore');
    const lastSessionEl = document.getElementById('lastSession');
    const streakEl = document.getElementById('streak');

    if (sessions.length === 0) {
      bestScoreEl.textContent = '—';
      lastSessionEl.textContent = '—';
      streakEl.textContent = '0';
      return;
    }

    const bestScore = Math.max(...sessions.map(s => s.score_percent));
    const lastSession = new Date(sessions[sessions.length - 1].completed_at);
    const streak = await quizEngine.getStreak();

    bestScoreEl.textContent = `${bestScore}%`;
    lastSessionEl.textContent = this.formatDate(lastSession);
    streakEl.textContent = streak;
  }

  /**
   * Render progress screen
   */
  async renderProgress(allQuestions) {
    const readiness = await quizEngine.calculateReadiness(allQuestions);
    const readinessPercent = document.getElementById('readinessPercent');
    const readinessLabel = document.getElementById('readinessLabel');
    const readinessRing = document.getElementById('readinessRing');

    readinessPercent.textContent = readiness.overall;
    readinessLabel.innerHTML = readiness.readyForTest
      ? '<i data-lucide="check-circle"></i> Ready for Test!'
      : 'Keep practicing';
    readinessRing.style.setProperty('--progress', readiness.overall);

    // Stats
    const sessions = await quizEngine.getSessions();
    document.getElementById('statSessions').textContent = sessions.length;
    document.getElementById('statAccuracy').textContent = `${readiness.score}%`;

    // Mastered count
    let masteredCount = 0;
    for (const q of allQuestions) {
      const attempts = await quizEngine.getAttempts(q.id);
      if (quizEngine.getQuestionState(attempts) === 'MASTERED') {
        masteredCount++;
      }
    }
    document.getElementById('statMastered').textContent = masteredCount;

    // Category scores
    const categoryScoresEl = document.getElementById('categoryScores');
    const categoryMap = {};

    sessions.forEach(session => {
      Object.entries(session.by_category || {}).forEach(([cat, stats]) => {
        if (!categoryMap[cat]) categoryMap[cat] = { correct: 0, total: 0 };
        categoryMap[cat].correct += stats.correct;
        categoryMap[cat].total += stats.total;
      });
    });

    categoryScoresEl.innerHTML = '<h3>Category Breakdown</h3>';
    Object.entries(categoryMap).forEach(([category, stats]) => {
      const percent = Math.round((stats.correct / stats.total) * 100);
      const item = document.createElement('div');
      item.className = 'category-score-item';
      item.innerHTML = `
        <div class="category-name">${category}</div>
        <div class="category-stats">${stats.correct}/${stats.total} (${percent}%)</div>
        <div class="category-score-bar">
          <div class="score-fill" style="width: ${percent}%"></div>
        </div>
      `;
      categoryScoresEl.appendChild(item);
    });

    // Weak areas
    const weakAreas = await quizEngine.getWeakAreas(allQuestions);
    const weakAreasEl = document.getElementById('weakAreas');

    if (weakAreas.length > 0) {
      weakAreasEl.innerHTML = '<h3 class="weak-areas-title"><i data-lucide="flame"></i> Weak Areas</h3>';
      weakAreas.slice(0, 5).forEach(area => {
        const item = document.createElement('div');
        item.className = 'weak-area-item';
        item.innerHTML = `
          <div class="weak-area-name">${area.category}</div>
          <div class="weak-area-stats">${area.wrongCount} misses out of ${area.totalAttempts}</div>
        `;
        weakAreasEl.appendChild(item);
      });

      const practiceBtn = document.getElementById('practiceWeakBtn');
      practiceBtn.disabled = false;
      practiceBtn.addEventListener('click', () => this.practiceWeakAreas(weakAreas, allQuestions));
    } else {
      weakAreasEl.innerHTML = '<div class="no-weak-areas"><i data-lucide="check-circle"></i> No weak areas detected!</div>';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * Practice weak areas
   */
  async practiceWeakAreas(weakAreas, allQuestions) {
    const weakQuestionIds = new Set(weakAreas.map(a => a.question_id));
    const weakQuestions = allQuestions.filter(q => weakQuestionIds.has(q.id));

    const session = quizEngine.createQuizSession(weakQuestions, 'weak-areas');
    this.showView('quiz');
    this.renderQuestion(session, 0);
  }

  /**
   * Render study mode categories from the STUDY_CATEGORIES registry
   * (data/study-categories.js). Renders all 9 topic-based categories; a
   * category with 0 matching questions renders as a disabled shell so the
   * taxonomy is always visible.
   */
  async renderStudyCategories(allQuestions) {
    const categoryList = document.getElementById('categoryList');
    const groups = groupByStudyCategory(allQuestions);

    categoryList.innerHTML = '';
    groups.forEach(group => {
      const count = group.questions.length;
      const empty = count === 0;

      const card = document.createElement('button');
      card.className = 'category-card' + (empty ? ' category-card-empty' : '');
      card.disabled = empty;
      card.innerHTML = `
        <div class="card-icon"><i data-lucide="${group.icon}"></i></div>
        <div class="card-title">${group.name}</div>
        <div class="card-desc">${group.description}</div>
        <div class="card-count">${empty ? 'Coming soon' : count + ' question' + (count === 1 ? '' : 's')}</div>
      `;

      if (!empty) {
        card.addEventListener('click', () => {
          const session = quizEngine.createQuizSession(group.questions, 'study');
          session.startTime = Date.now();
          this.showView('quiz');
          this.renderQuestion(session, 0);
        });
      }
      categoryList.appendChild(card);
    });

    // Re-render Lucide icons for the newly injected cards.
    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * Render road signs gallery
   */
  renderSignsGallery(roadSigns) {
    const signsGrid = document.getElementById('signsGrid');
    signsGrid.innerHTML = '';

    roadSigns.forEach(sign => {
      const tile = document.createElement('div');
      tile.className = 'sign-tile';
      const visual = sign.image_url
        ? `<img src="${sign.image_url}" alt="${sign.name}" class="sign-img">`
        : `<i data-lucide="signpost"></i>`;
      tile.innerHTML = `
        <div class="sign-image-small">${visual}</div>
        <div class="sign-name">${sign.name}</div>
        <div class="sign-type">${sign.type}</div>
      `;
      tile.addEventListener('click', () => this.showSignDetail(sign));
      signsGrid.appendChild(tile);
    });
    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * Show sign detail modal
   */
  showSignDetail(sign) {
    const modal = document.getElementById('signModal');
    const body = document.getElementById('signModalBody');

    const visual = sign.image_url
      ? `<img src="${sign.image_url}" alt="${sign.name}" class="sign-img-large">`
      : `<i data-lucide="signpost"></i>`;
    body.innerHTML = `
      <div class="sign-detail">
        <h2>${sign.name}</h2>
        <div class="sign-emoji">${visual}</div>
        <div class="sign-type">Type: ${sign.type}</div>
        <p class="sign-description">${sign.description}</p>
        <p class="sign-meaning"><strong>Meaning:</strong> ${sign.meaning}</p>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  /**
   * Switch views
   */
  showView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`${viewName}View`).classList.add('active');

    // Close the mobile dropdown menu if open (shown via .visible).
    const menu = document.getElementById('menu');
    if (menu) menu.classList.remove('visible');
  }

  /**
   * Format seconds to MM:SS
   */
  formatSeconds(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Format date (relative or absolute)
   */
  formatDate(date) {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  }

  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideUp 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Create global instance
const uiRenderer = new UIRenderer();
