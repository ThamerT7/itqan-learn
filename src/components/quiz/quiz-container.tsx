"use client";

import { useState, useMemo } from "react";
import { ArabicLetter, Locale } from "@/types";
import { generateQuiz } from "@/data/quiz-banks";
import { useLocale, useTranslations } from "next-intl";
import { useProgress } from "@/providers/progress-provider";
import { CheckCircle2, XCircle, RotateCcw, BookOpen } from "lucide-react";
import Link from "next/link";

export function QuizContainer({
  letters,
  unitId,
}: {
  letters: ArabicLetter[];
  unitId: string;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("quiz");
  const tc = useTranslations("common");
  const { recordQuizScore, completeUnit } = useProgress();

  const [questions] = useState(() => generateQuiz(letters));
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const q = questions[qIdx];
  const isCorrect = selected === q?.correct;

  const score = useMemo(() => {
    return Object.entries(answers).filter(
      ([k, v]) => v === questions[Number(k)]?.correct
    ).length;
  }, [answers, questions]);

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
      setShowResult(true);
      const finalScore = Object.entries({ ...answers, [qIdx]: selected! }).filter(
        ([k, v]) => v === questions[Number(k)]?.correct
      ).length;
      recordQuizScore(unitId, {
        date: new Date().toISOString(),
        score: finalScore,
        total: questions.length,
      });
      if (finalScore / questions.length >= 0.7) {
        completeUnit(unitId);
      }
    }
  }

  function restart() {
    setQIdx(0);
    setSelected(null);
    setChecked(false);
    setAnswers({});
    setShowResult(false);
  }

  const getOptions = (): string[] => {
    if (q.localizedOptions) {
      return q.localizedOptions[locale] || q.options as string[];
    }
    return q.options as string[];
  };

  if (showResult) {
    const pct = Math.round((score / questions.length) * 100);
    const color =
      pct >= 80 ? "text-green-800" : pct >= 50 ? "text-orange-600" : "text-red-600";
    const strokeColor =
      pct >= 80 ? "#4CAF50" : pct >= 50 ? "#FF9800" : "#f44336";

    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
        <div className="text-6xl mb-4">
          {pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📖"}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("score")}</h2>
        <div className={`text-5xl font-bold ${color} mb-4`}>
          {score} / {questions.length}
        </div>

        {/* Circle chart */}
        <div className="w-48 h-48 mx-auto relative mb-6">
          <svg viewBox="0 0 100 100" className="-rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42" fill="none" stroke={strokeColor}
              strokeWidth="8"
              strokeDasharray={`${(score / questions.length) * 264} 264`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-700">
            {pct}%
          </div>
        </div>

        <p className="text-gray-500 mb-6" dir={locale === "ur" ? "rtl" : "ltr"}>
          {pct >= 80 ? t("excellent") : pct >= 50 ? t("good") : t("needsPractice")}
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={restart}
            className="flex items-center gap-2 px-5 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-500 transition-colors"
          >
            <RotateCcw size={18} /> {t("restart")}
          </button>
          <Link
            href={`/${locale}/units/${unitId}/flashcards`}
            className="flex items-center gap-2 px-5 py-3 bg-green-800 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            <BookOpen size={18} /> {t("backToCards")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="text-center text-sm text-gray-500 mb-3">
        {t("question")} {qIdx + 1} {tc("of")} {questions.length}
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-600 to-yellow-500 rounded-full transition-all"
          style={{ width: `${((qIdx + 1) / questions.length) * 100}%`, transitionDuration: "0.4s" }}
        />
      </div>

      <div className="bg-white rounded-2xl p-7 shadow-sm">
        {/* Question */}
        <h2
          className="text-lg font-semibold text-gray-800 mb-6"
          dir={locale === "ur" ? "rtl" : "ltr"}
        >
          {q.question[locale]}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {getOptions().map((opt, i) => {
            const isSel = selected === i;
            const isCorr = i === q.correct;
            let bg = "bg-gray-50";
            let border = "border-transparent";
            let text = "text-gray-700";

            if (checked && isSel && isCorr) {
              bg = "bg-green-50"; border = "border-green-500"; text = "text-green-800";
            } else if (checked && isSel && !isCorr) {
              bg = "bg-red-50"; border = "border-red-400"; text = "text-red-700";
            } else if (checked && isCorr) {
              bg = "bg-green-50"; border = "border-green-500";
            } else if (isSel) {
              bg = "bg-blue-50"; border = "border-blue-500";
            }

            return (
              <button
                key={i}
                onClick={() => !checked && setSelected(i)}
                className={`p-4 rounded-xl border-2 ${border} ${bg} ${text} text-center text-lg transition-all ${
                  checked ? "cursor-default" : "cursor-pointer hover:bg-gray-100"
                } ${isSel && !checked ? "font-semibold" : ""} ${
                  (opt as string).length <= 2 ? "font-[family-name:var(--font-arabic)] text-2xl" : ""
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
              isCorrect ? "bg-green-50 text-green-800" : "bg-orange-50 text-orange-700"
            }`}
          >
            {isCorrect ? `✅ ${t("correct")}` : `⚠️ ${t("incorrect")}`}
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
              {t("checkAnswer")}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl font-semibold text-white bg-green-800 hover:bg-green-700 transition-colors"
            >
              {qIdx < questions.length - 1 ? t("nextQuestion") : `📊 ${t("score")}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
