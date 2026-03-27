export type Locale = "en" | "tr" | "fr" | "ur" | "id";

export type LocalizedText = Record<Locale, string>;

export type ArabicLetter = {
  id: string;
  letter: string;
  forms: {
    isolated: string;
    initial: string;
    medial: string;
    final: string;
  };
  name: string;
  phonetic: LocalizedText;
  example: string;
  exampleMeaning: LocalizedText;
  makhraj: LocalizedText;
  tips: LocalizedText;
  audioFile: string;
  order: number;
};

export type Unit = {
  id: string;
  titleAr: string;
  order: number;
  letterIds: string[];
  type: "letters" | "tashkeel" | "review";
};

export type QuizQuestion = {
  type: "identify" | "makhraj" | "match";
  questionKey: string;
  question: LocalizedText;
  options: string[] | LocalizedText[];
  localizedOptions?: Record<Locale, string[]>;
  correct: number;
};

export type UserProgress = {
  flashcardsViewed: Record<string, string[]>;
  quizScores: Record<string, QuizScore[]>;
  unitsCompleted: Record<string, boolean>;
  streakDays: number;
  lastActiveDate: string;
  totalPoints: number;
};

export type QuizScore = {
  date: string;
  score: number;
  total: number;
};
