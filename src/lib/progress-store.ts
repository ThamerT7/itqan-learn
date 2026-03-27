import { UserProgress } from "@/types";

const STORAGE_KEY = "itqan-progress";

export const defaultProgress: UserProgress = {
  flashcardsViewed: {},
  quizScores: {},
  unitsCompleted: {},
  streakDays: 0,
  lastActiveDate: "",
  totalPoints: 0,
};

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(stored) };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage full or unavailable
  }
}

export function updateStreak(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split("T")[0];
  if (progress.lastActiveDate === today) return progress;

  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const streakDays =
    progress.lastActiveDate === yesterday ? progress.streakDays + 1 : 1;

  return { ...progress, streakDays, lastActiveDate: today };
}
