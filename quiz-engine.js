/**
 * Quiz Engine - Core logic for spaced repetition, scoring, progress tracking
 */

class QuizEngine {
  constructor() {
    this.db = null;
    this.isInitialized = false;
    this._initPromise = null;
    this.init();
  }

  /**
   * Initialize IndexedDB. Idempotent — repeated calls return the SAME in-flight
   * (or resolved) promise instead of opening the database again, which could
   * otherwise block/throw and abort the app's startup sequence.
   */
  async init() {
    if (this._initPromise) return this._initPromise;
    this._initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open('dmv-test', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        this.isInitialized = true;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Store for sessions
        if (!db.objectStoreNames.contains('sessions')) {
          db.createObjectStore('sessions', { keyPath: 'session_id' });
        }

        // Store for question attempts (for spaced repetition)
        if (!db.objectStoreNames.contains('attempts')) {
          const attemptStore = db.createObjectStore('attempts', { keyPath: 'attempt_id' });
          attemptStore.createIndex('question_id', 'question_id', { unique: false });
          attemptStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // Store for user progress
        if (!db.objectStoreNames.contains('progress')) {
          db.createObjectStore('progress', { keyPath: 'user_id' });
        }

        // Store for settings
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };
    });
    return this._initPromise;
  }

  /**
   * Save a study session
   */
  async saveSession(session) {
    if (!this.isInitialized) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['sessions'], 'readwrite');
      const store = tx.objectStore('sessions');
      const request = store.add(session);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  /**
   * Save a question attempt
   */
  async saveAttempt(attempt) {
    if (!this.isInitialized) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['attempts'], 'readwrite');
      const store = tx.objectStore('attempts');
      const request = store.add(attempt);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  /**
   * Get all sessions
   */
  async getSessions() {
    if (!this.isInitialized) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['sessions'], 'readonly');
      const store = tx.objectStore('sessions');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  /**
   * Get attempts for a question
   */
  async getAttempts(questionId) {
    if (!this.isInitialized) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['attempts'], 'readonly');
      const store = tx.objectStore('attempts');
      const index = store.index('question_id');
      const request = index.getAll(questionId);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  /**
   * Calculate question state (NEW, LEARNING, REVIEW, MASTERED)
   */
  getQuestionState(attempts) {
    if (attempts.length === 0) return 'NEW';

    const correctCount = attempts.filter(a => a.correct).length;
    const wrongCount = attempts.filter(a => !a.correct).length;

    // MASTERED: 3+ correct answers with no wrong in last 14 days
    if (correctCount >= 3 && wrongCount === 0) {
      const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
      const recentWrong = attempts.filter(a => !a.correct && a.timestamp > twoWeeksAgo);
      if (recentWrong.length === 0) return 'MASTERED';
    }

    // REVIEW: 2+ correct answers
    if (correctCount >= 2) return 'REVIEW';

    // LEARNING: 1+ attempt
    return 'LEARNING';
  }

  /**
   * Get next review date for spaced repetition
   */
  getNextReviewDate(attempts) {
    const state = this.getQuestionState(attempts);
    const lastAttempt = attempts[attempts.length - 1];
    const lastCorrect = attempts.filter(a => a.correct).length;

    const now = Date.now();
    let daysUntilReview = 0;

    switch (state) {
      case 'NEW':
        return null; // Show immediately
      case 'LEARNING':
        daysUntilReview = lastCorrect === 0 ? 0 : 1; // 1 hour later
        break;
      case 'REVIEW':
        daysUntilReview = lastCorrect === 2 ? 1 : (lastCorrect === 3 ? 3 : 7);
        break;
      case 'MASTERED':
        daysUntilReview = 30; // Optional monthly check-in
        break;
    }

    return new Date(now + daysUntilReview * 24 * 60 * 60 * 1000);
  }

  /**
   * Calculate overall progress/readiness
   */
  async calculateReadiness(allQuestions) {
    const sessions = await this.getSessions();
    if (sessions.length === 0) {
      return {
        score: 0,
        confidence: 0,
        coverage: 0,
        consistency: 0,
        overall: 0,
        readyForTest: false,
        message: 'Not started. Begin studying to build your readiness.',
      };
    }

    // Overall accuracy
    const totalAttempts = sessions.reduce((sum, s) => sum + (s.questions_attempted || 0), 0);
    const totalCorrect = sessions.reduce((sum, s) => sum + (s.correct || 0), 0);
    const score = totalAttempts > 0 ? totalCorrect / totalAttempts : 0;

    // Confidence: accuracy on questions they're sure about
    const confidence = score; // Simplified

    // Coverage: % of all questions seen
    const questionsAttempted = new Set(
      sessions.flatMap(s => (s.answered_questions || []).map(q => q.id))
    );
    const coverage = allQuestions.length > 0 ? questionsAttempted.size / allQuestions.length : 0;

    // Consistency: std dev of recent 5 sessions
    const recent = sessions.slice(-5);
    const recentScores = recent.map(s => (s.correct || 0) / (s.questions_attempted || 1));
    const mean = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    const variance = recentScores.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / recentScores.length;
    const stdDev = Math.sqrt(variance);
    const consistency = 1 - Math.min(stdDev * 2, 1); // Normalize

    const overall = score * 0.4 + confidence * 0.3 + coverage * 0.2 + consistency * 0.1;

    return {
      score: Math.round(score * 100),
      confidence: Math.round(confidence * 100),
      coverage: Math.round(coverage * 100),
      consistency: Math.round(consistency * 100),
      overall: Math.round(overall * 100),
      readyForTest: overall >= 0.85,
      message:
        overall >= 0.85
          ? 'Ready! You can take the real test now.'
          : `Focus on weak areas to improve. Current: ${Math.round(overall * 100)}%`,
    };
  }

  /**
   * Identify weak areas (questions with high miss rate)
   */
  async getWeakAreas(allQuestions) {
    const sessions = await this.getSessions();
    const weakAreas = [];

    for (const question of allQuestions) {
      const attempts = await this.getAttempts(question.id);
      if (attempts.length < 2) continue; // Need at least 2 attempts

      const wrongCount = attempts.filter(a => !a.correct).length;
      const missRate = wrongCount / attempts.length;

      if (missRate > 0.33) {
        weakAreas.push({
          question_id: question.id,
          category: question.category,
          subcategory: question.subcategory,
          missRate,
          wrongCount,
          totalAttempts: attempts.length,
        });
      }
    }

    // Sort by priority: (miss_count * days_since_attempt)
    weakAreas.sort((a, b) => b.wrongCount - a.wrongCount);
    return weakAreas;
  }

  /**
   * Get streak (consecutive days of study)
   */
  async getStreak() {
    const sessions = await this.getSessions();
    if (sessions.length === 0) return 0;

    // Group by date
    const dates = new Set();
    sessions.forEach(s => {
      const date = new Date(s.completed_at).toISOString().split('T')[0];
      dates.add(date);
    });

    const sortedDates = Array.from(dates).sort();
    let streak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currDate = new Date(sortedDates[i]);
      const daysDiff = (currDate - prevDate) / (1000 * 60 * 60 * 24);

      if (daysDiff === 1) {
        currentStreak++;
        streak = Math.max(streak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return streak;
  }

  /**
   * Create a new quiz session
   */
  createQuizSession(questions, mode = 'quiz') {
    return {
      session_id: `SES-${Date.now()}`,
      created_at: new Date().toISOString(),
      mode,
      questions: mode === 'quiz' ? this.selectRandomQuestions(questions, 40) : questions,
      currentIndex: 0,
      answers: [],
    };
  }

  /**
   * Select questions for a test. Aims for `count` (default 40) with a balanced
   * signs/rules split, but ADAPTS to the pool: if one category is short, it
   * backfills from the other so the test always has exactly min(count, pool)
   * questions — never a phantom "40" the pool can't fill.
   */
  selectRandomQuestions(allQuestions, count = 40) {
    const signs = this.shuffleArray(allQuestions.filter(q => q.category === 'road-signs'));
    const rules = this.shuffleArray(allQuestions.filter(q => q.category === 'traffic-rules'));

    // Ideal balanced split, capped by what each category actually has.
    const half = Math.floor(count / 2);
    let takeSigns = Math.min(half, signs.length);
    let takeRules = Math.min(count - takeSigns, rules.length);
    // If rules were the limiter, try to backfill from remaining signs.
    takeSigns = Math.min(signs.length, count - takeRules);

    const selected = [...signs.slice(0, takeSigns), ...rules.slice(0, takeRules)];
    return this.shuffleArray(selected);
  }

  /**
   * Shuffle array (Fisher-Yates)
   */
  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Submit an answer
   */
  async submitAnswer(session, questionIndex, answerId) {
    const question = session.questions[questionIndex];
    const correct = question.options.find(o => o.correct).id === answerId;

    const attempt = {
      attempt_id: `ATT-${question.id}-${Date.now()}`,
      question_id: question.id,
      session_id: session.session_id,
      timestamp: Date.now(),
      user_answer_id: answerId,
      correct_answer_id: question.options.find(o => o.correct).id,
      correct,
    };

    await this.saveAttempt(attempt);

    session.answers.push({
      question_id: question.id,
      category: question.category,
      correct,
      time_ms: session.startTime ? Date.now() - session.startTime : 0,
    });

    return { correct, attempt };
  }

  /**
   * Complete a quiz session
   */
  async completeQuizSession(session) {
    const correct = session.answers.filter(a => a.correct).length;
    const total = session.answers.length;
    const percent = Math.round((correct / total) * 100);

    const byCategory = {};
    session.answers.forEach(a => {
      if (!byCategory[a.category]) {
        byCategory[a.category] = { correct: 0, total: 0 };
      }
      byCategory[a.category].total++;
      if (a.correct) byCategory[a.category].correct++;
    });

    const sessionData = {
      session_id: session.session_id,
      created_at: session.created_at,
      completed_at: new Date().toISOString(),
      mode: session.mode,
      questions_attempted: total,
      correct,
      incorrect: total - correct,
      score_percent: percent,
      passing: percent >= 75,
      by_category: byCategory,
      answered_questions: session.answers,
      duration_seconds: session.endTime ? (session.endTime - new Date(session.created_at).getTime()) / 1000 : 0,
    };

    await this.saveSession(sessionData);
    return sessionData;
  }

  /**
   * Clear all data (for testing)
   */
  async clearAll() {
    if (!this.isInitialized) await this.init();

    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(['sessions', 'attempts', 'progress', 'settings'], 'readwrite');
      tx.objectStore('sessions').clear();
      tx.objectStore('attempts').clear();
      tx.objectStore('progress').clear();
      tx.objectStore('settings').clear();

      tx.onerror = () => reject(tx.error);
      tx.oncomplete = () => resolve();
    });
  }
}

// Create global instance
const quizEngine = new QuizEngine();
