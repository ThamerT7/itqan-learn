"use client";

import { useState, useEffect, useCallback } from "react";
import { Locale, QuizQuestion } from "@/types";
import {
  getDailyChallenge,
  completeDailyChallenge,
  getDailyStreak,
  isDailyChallengeCompleted,
} from "@/lib/daily-challenge";
import { CheckCircle2, XCircle, Share2, Trophy, Flame } from "lucide-react";

interface DailyChallengeProps {
  locale: string;
}

const UI_TEXT: Record<
  string,
  Record<string, string>
> = {
  en: {
    title: "Daily Challenge",
    streak: "Streak",
    completed: "Completed!",
    comeBackTomorrow: "Come back tomorrow for a new challenge!",
    question: "Question",
    of: "of",
    checkAnswer: "Check Answer",
    correct: "Correct!",
    incorrect: "Incorrect",
    results: "Results",
    score: "Score",
    shareScore: "Share Score",
    day: "day",
    days: "days",
    newRecord: "New Record!",
  },
  tr: {
    title: "Günlük Meydan Okuma",
    streak: "Seri",
    completed: "Tamamlandı!",
    comeBackTomorrow: "Yeni bir meydan okuma için yarın gelin!",
    question: "Soru",
    of: "/",
    checkAnswer: "Cevabı Kontrol Et",
    correct: "Doğru!",
    incorrect: "Yanlış",
    results: "Sonuçlar",
    score: "Puan",
    shareScore: "Puanı Paylaş",
    day: "gün",
    days: "gün",
    newRecord: "Yeni Rekor!",
  },
  fr: {
    title: "Défi Quotidien",
    streak: "Série",
    completed: "Terminé !",
    comeBackTomorrow: "Revenez demain pour un nouveau défi !",
    question: "Question",
    of: "sur",
    checkAnswer: "Vérifier",
    correct: "Correct !",
    incorrect: "Incorrect",
    results: "Résultats",
    score: "Score",
    shareScore: "Partager le score",
    day: "jour",
    days: "jours",
    newRecord: "Nouveau record !",
  },
  ur: {
    title: "روزانہ چیلنج",
    streak: "سلسلہ",
    completed: "مکمل!",
    comeBackTomorrow: "نئے چیلنج کے لیے کل واپس آئیں!",
    question: "سوال",
    of: "میں سے",
    checkAnswer: "جواب چیک کریں",
    correct: "درست!",
    incorrect: "غلط",
    results: "نتائج",
    score: "اسکور",
    shareScore: "اسکور شیئر کریں",
    day: "دن",
    days: "دن",
    newRecord: "نیا ریکارڈ!",
  },
  id: {
    title: "Tantangan Harian",
    streak: "Seri",
    completed: "Selesai!",
    comeBackTomorrow: "Kembali besok untuk tantangan baru!",
    question: "Pertanyaan",
    of: "dari",
    checkAnswer: "Periksa Jawaban",
    correct: "Benar!",
    incorrect: "Salah",
    results: "Hasil",
    score: "Skor",
    shareScore: "Bagikan Skor",
    day: "hari",
    days: "hari",
    newRecord: "Rekor Baru!",
  },
};

export function DailyChallenge({ locale }: DailyChallengeProps) {
  const t = UI_TEXT[locale] || UI_TEXT.en;
  const isRtl = locale === "ur";

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [completed, setCompleted] = useState(false);
  const [previousScore, setPreviousScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [todayDate, setTodayDate] = useState("");

  // Quiz state
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const challenge = getDailyChallenge();
    setQuestions(challenge.questions);
    setCompleted(challenge.completed);
    setPreviousScore(challenge.score);
    setStreak(getDailyStreak());
    setTodayDate(challenge.date);
  }, []);

  const q = questions[qIdx];

  const score = useCallback(() => {
    return Object.entries(answers).filter(
      ([k, v]) => v === questions[Number(k)]?.correct
    ).length;
  }, [answers, questions]);

  const getOptions = (question: QuizQuestion): string[] => {
    if (question.localizedOptions) {
      return (
        question.localizedOptions[locale as Locale] ||
        (question.options as string[])
      );
    }
    return question.options as string[];
  };

  function handleCheck() {
    if (selected === null) return;
    setChecked(true);
    setAnswers((prev) => ({ ...prev, [qIdx]: selected }));
  }

  function handleNext() {
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setSelected(null);
      setChecked(false);
    } else {
      const finalAnswers = { ...answers, [qIdx]: selected! };
      const finalScore = Object.entries(finalAnswers).filter(
        ([k, v]) => v === questions[Number(k)]?.correct
      ).length;
      completeDailyChallenge(finalScore, questions.length);
      setStreak(getDailyStreak());
      setShowResults(true);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }

  function handleShare() {
    const finalScore = score();
    const text = `🔥 Itqan Learn - ${t.title}\n📅 ${todayDate}\n🏆 ${t.score}: ${finalScore}/${questions.length}\n🔥 ${t.streak}: ${streak} ${streak === 1 ? t.day : t.days}\n\nhttps://itqan-learn.com`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const formattedDate = todayDate
    ? new Date(todayDate + "T00:00:00").toLocaleDateString(
        locale === "ur" ? "ur-PK" : locale === "tr" ? "tr-TR" : locale === "fr" ? "fr-FR" : locale === "id" ? "id-ID" : "en-US",
        { weekday: "long", year: "numeric", month: "long", day: "numeric" }
      )
    : "";

  // Already completed today
  if (completed && !showResults) {
    return (
      <div className="max-w-lg mx-auto" dir={isRtl ? "rtl" : "ltr"}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
            <Flame size={18} />
            {streak} {streak === 1 ? t.day : t.days} {t.streak}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">{t.title}</h1>
          <p className="text-gray-500 text-sm">{formattedDate}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            {t.completed}
          </h2>
          <div className="text-4xl font-bold text-gray-700 mb-4">
            {previousScore} / {questions.length}
          </div>
          <div className="bg-amber-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-amber-700 font-semibold">
              <span className="text-2xl">🔥</span>
              <span>
                {streak} {streak === 1 ? t.day : t.days} {t.streak}!
              </span>
            </div>
          </div>
          <p className="text-gray-500 text-lg">{t.comeBackTomorrow}</p>
        </div>
      </div>
    );
  }

  // Show results after completing
  if (showResults) {
    const finalScore = score();
    const pct = Math.round((finalScore / questions.length) * 100);

    return (
      <div className="max-w-lg mx-auto" dir={isRtl ? "rtl" : "ltr"}>
        {/* Celebration overlay */}
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="text-8xl animate-bounce">🎉</div>
            <div className="absolute top-1/4 left-1/4 text-5xl animate-ping">⭐</div>
            <div className="absolute top-1/3 right-1/4 text-5xl animate-ping delay-100">🌟</div>
            <div className="absolute bottom-1/3 left-1/3 text-4xl animate-ping delay-200">✨</div>
          </div>
        )}

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{t.results}</h1>
        </div>

        <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
          <div className="text-6xl mb-4">
            {pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📖"}
          </div>

          <h2 className="text-xl font-bold text-gray-700 mb-2">{t.score}</h2>
          <div
            className={`text-5xl font-bold mb-6 ${
              pct >= 80
                ? "text-green-700"
                : pct >= 60
                ? "text-orange-600"
                : "text-red-600"
            }`}
          >
            {finalScore} / {questions.length}
          </div>

          {/* Circle progress */}
          <div className="w-40 h-40 mx-auto relative mb-6">
            <svg viewBox="0 0 100 100" className="-rotate-90">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={pct >= 80 ? "#4CAF50" : pct >= 60 ? "#FF9800" : "#f44336"}
                strokeWidth="8"
                strokeDasharray={`${(finalScore / questions.length) * 264} 264`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-700">
              {pct}%
            </div>
          </div>

          {/* Streak */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-6 border border-amber-200">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">🔥</span>
              <div>
                <div className="text-2xl font-bold text-amber-700">
                  {streak} {streak === 1 ? t.day : t.days}
                </div>
                <div className="text-sm text-amber-600">{t.streak}</div>
              </div>
            </div>
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md"
          >
            <Share2 size={18} />
            {copied ? "✓ Copied!" : t.shareScore}
          </button>
        </div>
      </div>
    );
  }

  // Quiz in progress
  if (!q) {
    return (
      <div className="max-w-lg mx-auto text-center p-8">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  const isCorrect = selected === q.correct;

  return (
    <div className="max-w-lg mx-auto" dir={isRtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
          <p className="text-gray-500 text-sm">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
          <Flame size={16} />
          {streak}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {questions.map((_, i) => {
          let dotClass = "w-3 h-3 rounded-full transition-all duration-300";
          if (i < qIdx) {
            // Answered
            const wasCorrect = answers[i] === questions[i]?.correct;
            dotClass += wasCorrect
              ? " bg-green-500 scale-110"
              : " bg-red-400 scale-110";
          } else if (i === qIdx) {
            dotClass += " bg-orange-500 scale-125 ring-4 ring-orange-200";
          } else {
            dotClass += " bg-gray-300";
          }
          return <div key={i} className={dotClass} />;
        })}
      </div>

      {/* Question counter */}
      <div className="text-center text-sm text-gray-500 mb-3">
        {t.question} {qIdx + 1} {t.of} {questions.length}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-600 to-yellow-500 rounded-full transition-all"
          style={{
            width: `${((qIdx + 1) / questions.length) * 100}%`,
            transitionDuration: "0.4s",
          }}
        />
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl p-7 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          {q.question[locale as Locale]}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {getOptions(q).map((opt, i) => {
            const isSel = selected === i;
            const isCorr = i === q.correct;
            let bg = "bg-gray-50";
            let border = "border-transparent";
            let text = "text-gray-700";

            if (checked && isSel && isCorr) {
              bg = "bg-green-50";
              border = "border-green-500";
              text = "text-green-800";
            } else if (checked && isSel && !isCorr) {
              bg = "bg-red-50";
              border = "border-red-400";
              text = "text-red-700";
            } else if (checked && isCorr) {
              bg = "bg-green-50";
              border = "border-green-500";
            } else if (isSel) {
              bg = "bg-blue-50";
              border = "border-blue-500";
            }

            return (
              <button
                key={i}
                onClick={() => !checked && setSelected(i)}
                className={`p-4 rounded-xl border-2 ${border} ${bg} ${text} text-center text-lg transition-all ${
                  checked ? "cursor-default" : "cursor-pointer hover:bg-gray-100"
                } ${isSel && !checked ? "font-semibold" : ""} ${
                  (opt as string).length <= 2
                    ? "font-[family-name:var(--font-arabic)] text-2xl"
                    : ""
                }`}
              >
                {opt}
                {checked && isCorr && (
                  <CheckCircle2 className="inline ml-2 text-green-600" size={20} />
                )}
                {checked && isSel && !isCorr && (
                  <XCircle className="inline ml-2 text-red-500" size={20} />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {checked && (
          <div
            className={`mt-4 p-3 rounded-xl text-center font-semibold ${
              isCorrect
                ? "bg-green-50 text-green-800"
                : "bg-orange-50 text-orange-700"
            }`}
          >
            {isCorrect ? `✅ ${t.correct}` : `⚠️ ${t.incorrect}`}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center mt-6">
          {!checked ? (
            <button
              onClick={handleCheck}
              disabled={selected === null}
              className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                selected !== null
                  ? "bg-orange-600 hover:bg-orange-500 cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {t.checkAnswer}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl font-semibold text-white bg-green-800 hover:bg-green-700 transition-colors"
            >
              {qIdx < questions.length - 1
                ? `→ ${t.question} ${qIdx + 2}`
                : `📊 ${t.results}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
