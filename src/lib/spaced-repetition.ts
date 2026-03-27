const SR_STORAGE_KEY = 'itqan-sr-data';

export type SRState = {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: string; // ISO date string
  lastScore: number;
};

function getStorage(): Record<string, SRState> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SR_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, SRState>;
  } catch {
    return {};
  }
}

function setStorage(data: Record<string, SRState>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SR_STORAGE_KEY, JSON.stringify(data));
}

function defaultSRState(): SRState {
  return {
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: new Date().toISOString().split('T')[0],
    lastScore: 0,
  };
}

function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get the spaced repetition state for a specific letter.
 * Returns the default state if no data exists yet.
 */
export function getLetterSRState(letterId: string): SRState {
  const data = getStorage();
  if (!data) return defaultSRState();
  return data[letterId] ?? defaultSRState();
}

/**
 * Update the spaced repetition state for a letter after a review.
 * Uses the SM-2 algorithm variant.
 *
 * @param letterId - The letter identifier
 * @param quality - Rating from 0 to 5 (0 = complete failure, 5 = perfect)
 * @returns The updated SRState
 */
export function updateLetterSR(letterId: string, quality: number): SRState {
  const q = Math.max(0, Math.min(5, Math.round(quality)));
  const data = getStorage() ?? {};
  const prev = data[letterId] ?? defaultSRState();

  let { easeFactor, interval, repetitions } = prev;

  if (q >= 3) {
    // Successful recall
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Failed recall — reset
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor using SM-2 formula
  easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  const updated: SRState = {
    easeFactor,
    interval,
    repetitions,
    nextReview: nextReview.toISOString().split('T')[0],
    lastScore: q,
  };

  data[letterId] = updated;
  setStorage(data);

  return updated;
}

/**
 * Get all letter IDs that are due for review today or earlier.
 */
export function getDueLetters(): string[] {
  const data = getStorage();
  if (!data) return [];

  const today = todayStr();

  return Object.entries(data)
    .filter(([, state]) => state.nextReview <= today)
    .sort((a, b) => a[1].nextReview.localeCompare(b[1].nextReview))
    .map(([letterId]) => letterId);
}

/**
 * Get the weakest letters sorted by ease factor (lowest first).
 * Only includes letters that have been reviewed at least once.
 *
 * @param limit - Maximum number of letters to return (default: 10)
 */
export function getWeakLetters(limit: number = 10): string[] {
  const data = getStorage();
  if (!data) return [];

  return Object.entries(data)
    .filter(([, state]) => state.repetitions > 0)
    .sort((a, b) => a[1].easeFactor - b[1].easeFactor)
    .slice(0, limit)
    .map(([letterId]) => letterId);
}

/**
 * Get all stored spaced repetition states.
 */
export function getAllSRStates(): Record<string, SRState> {
  return getStorage() ?? {};
}

/**
 * Reset all spaced repetition data.
 */
export function resetSR(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SR_STORAGE_KEY);
}
