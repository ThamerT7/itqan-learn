"use client";

import { createContext, useContext, useCallback, useEffect, useReducer } from "react";
import { UserProgress, QuizScore } from "@/types";
import { defaultProgress, loadProgress, saveProgress, updateStreak } from "@/lib/progress-store";

type Action =
  | { type: "INIT"; payload: UserProgress }
  | { type: "VIEW_LETTER"; unitId: string; letterId: string }
  | { type: "RECORD_QUIZ"; unitId: string; score: QuizScore }
  | { type: "COMPLETE_UNIT"; unitId: string }
  | { type: "RESET" };

function reducer(state: UserProgress, action: Action): UserProgress {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "VIEW_LETTER": {
      const viewed = state.flashcardsViewed[action.unitId] || [];
      if (viewed.includes(action.letterId)) return state;
      return updateStreak({
        ...state,
        flashcardsViewed: {
          ...state.flashcardsViewed,
          [action.unitId]: [...viewed, action.letterId],
        },
      });
    }
    case "RECORD_QUIZ": {
      const scores = state.quizScores[action.unitId] || [];
      const points = action.score.score * 10;
      return updateStreak({
        ...state,
        quizScores: {
          ...state.quizScores,
          [action.unitId]: [...scores, action.score],
        },
        totalPoints: state.totalPoints + points,
      });
    }
    case "COMPLETE_UNIT":
      return {
        ...state,
        unitsCompleted: { ...state.unitsCompleted, [action.unitId]: true },
        totalPoints: state.totalPoints + 50,
      };
    case "RESET":
      return defaultProgress;
    default:
      return state;
  }
}

type ProgressContextType = {
  progress: UserProgress;
  markLetterViewed: (unitId: string, letterId: string) => void;
  recordQuizScore: (unitId: string, score: QuizScore) => void;
  completeUnit: (unitId: string) => void;
  resetProgress: () => void;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, dispatch] = useReducer(reducer, defaultProgress);

  useEffect(() => {
    dispatch({ type: "INIT", payload: loadProgress() });
  }, []);

  useEffect(() => {
    if (progress.lastActiveDate || progress.totalPoints > 0) {
      saveProgress(progress);
    }
  }, [progress]);

  const markLetterViewed = useCallback((unitId: string, letterId: string) => {
    dispatch({ type: "VIEW_LETTER", unitId, letterId });
  }, []);

  const recordQuizScore = useCallback((unitId: string, score: QuizScore) => {
    dispatch({ type: "RECORD_QUIZ", unitId, score });
  }, []);

  const completeUnit = useCallback((unitId: string) => {
    dispatch({ type: "COMPLETE_UNIT", unitId });
  }, []);

  const resetProgress = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return (
    <ProgressContext.Provider
      value={{ progress, markLetterViewed, recordQuizScore, completeUnit, resetProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
