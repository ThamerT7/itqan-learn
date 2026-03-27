import { QuizQuestion } from '@/types';
import { generateQuiz } from '@/data/quiz-banks';
import { LETTERS } from '@/data/letters';

const DAILY_CHALLENGE_KEY = 'itqan-daily-challenge';
const DAILY_QUESTIONS_COUNT = 5;

type DailyChallengeData = {
  date: string;
  questions: QuizQuestion[];
  completed: boolean;
  score: number;
  total: number;
};

type DailyChallengeStore = {
  current: DailyChallengeData;
  streak: number;
  lastCompletedDate: string;
};

function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

function getStore(): DailyChallengeStore | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(DAILY_CHALLENGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DailyChallengeStore;
  } catch {
    return null;
  }
}

function saveStore(store: DailyChallengeStore): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DAILY_CHALLENGE_KEY, JSON.stringify(store));
}

/**
 * Seed-based pseudo-random number generator for deterministic daily questions.
 * Uses a simple mulberry32 algorithm seeded from the date string.
 */
function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return function () {
    h |= 0;
    h = h + 0x6D2B79F5 | 0;
    let t = Math.imul(h ^ h >>> 15, 1 | h);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function generateDailyQuestions(date: string): QuizQuestion[] {
  // Generate a large pool of questions from all letters
  const allQuestions = generateQuiz(LETTERS);

  // Use seeded shuffle so the same date always yields the same questions
  const rng = seededRandom(date);
  const shuffled = [...allQuestions].sort(() => rng() - 0.5);

  return shuffled.slice(0, DAILY_QUESTIONS_COUNT);
}

function isYesterday(dateStr: string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0] === dateStr;
}

/**
 * Get the daily challenge for today.
 * Generates new questions if today's challenge doesn't exist yet.
 */
export function getDailyChallenge(): {
  date: string;
  questions: QuizQuestion[];
  completed: boolean;
  score: number;
} {
  const today = todayStr();
  const store = getStore();

  // If we already have today's challenge, return it
  if (store && store.current.date === today) {
    return {
      date: store.current.date,
      questions: store.current.questions,
      completed: store.current.completed,
      score: store.current.score,
    };
  }

  // Generate new challenge for today
  const questions = generateDailyQuestions(today);

  const newCurrent: DailyChallengeData = {
    date: today,
    questions,
    completed: false,
    score: 0,
    total: DAILY_QUESTIONS_COUNT,
  };

  // Preserve streak info from previous store
  const streak = store ? store.streak : 0;
  const lastCompletedDate = store ? store.lastCompletedDate : '';

  const newStore: DailyChallengeStore = {
    current: newCurrent,
    streak,
    lastCompletedDate,
  };

  saveStore(newStore);

  return {
    date: newCurrent.date,
    questions: newCurrent.questions,
    completed: newCurrent.completed,
    score: newCurrent.score,
  };
}

/**
 * Mark today's daily challenge as completed and update streak.
 *
 * @param score - Number of correct answers
 * @param total - Total number of questions
 */
export function completeDailyChallenge(score: number, total: number): void {
  if (typeof window === 'undefined') return;

  const today = todayStr();
  const store = getStore();

  if (!store) return;

  // Don't allow completing twice
  if (store.current.completed && store.current.date === today) return;

  // Update streak
  let newStreak: number;
  if (isYesterday(store.lastCompletedDate)) {
    // Consecutive day — increment streak
    newStreak = store.streak + 1;
  } else if (store.lastCompletedDate === today) {
    // Already completed today (shouldn't happen due to guard above)
    newStreak = store.streak;
  } else {
    // Streak broken — start fresh
    newStreak = 1;
  }

  store.current.completed = true;
  store.current.score = score;
  store.current.total = total;
  store.streak = newStreak;
  store.lastCompletedDate = today;

  saveStore(store);
}

/**
 * Get the current daily streak (consecutive days of completed challenges).
 */
export function getDailyStreak(): number {
  const store = getStore();
  if (!store) return 0;

  const today = todayStr();
  const { lastCompletedDate, streak } = store;

  // If last completed was today or yesterday, streak is still active
  if (lastCompletedDate === today || isYesterday(lastCompletedDate)) {
    return streak;
  }

  // Streak has been broken
  return 0;
}

/**
 * Check if today's daily challenge has been completed.
 */
export function isDailyChallengeCompleted(): boolean {
  const store = getStore();
  if (!store) return false;

  const today = todayStr();
  return store.current.date === today && store.current.completed;
}
