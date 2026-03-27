"use client";

import { useTranslations, useLocale } from "next-intl";
import { useProgress } from "@/providers/progress-provider";
import { UNITS } from "@/data/units";
import { Flame, Star, BookOpen, Trophy, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProgressPage() {
  const t = useTranslations("progress");
  const locale = useLocale();
  const { progress, resetProgress } = useProgress();
  const [showConfirm, setShowConfirm] = useState(false);

  const totalLettersViewed = Object.values(progress.flashcardsViewed).flat().length;
  const completedCount = Object.values(progress.unitsCompleted).filter(Boolean).length;

  function getBestScore(unitId: string) {
    const scores = progress.quizScores[unitId];
    if (!scores?.length) return null;
    return scores.reduce((best, s) =>
      s.score / s.total > best.score / best.total ? s : best
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t("title")}</h1>
        <p className="text-gray-500">{t("subtitle")}</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Flame, label: t("streak"), value: progress.streakDays, color: "text-orange-600", bg: "bg-orange-50" },
          { icon: Star, label: t("totalPoints"), value: progress.totalPoints, color: "text-yellow-600", bg: "bg-yellow-50" },
          { icon: BookOpen, label: t("lettersLearned"), value: totalLettersViewed, color: "text-green-700", bg: "bg-green-50" },
          { icon: Trophy, label: t("unitsCompleted"), value: `${completedCount}/${UNITS.length}`, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} rounded-2xl p-5 text-center`}>
            <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={28} />
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Unit progress */}
      <div className="space-y-4 mb-8">
        {UNITS.map((unit) => {
          const viewed = progress.flashcardsViewed[unit.id]?.length || 0;
          const total = unit.letterIds.length;
          const completed = progress.unitsCompleted[unit.id];
          const best = getBestScore(unit.id);

          return (
            <div key={unit.id} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 font-[family-name:var(--font-arabic)]">
                  {unit.titleAr}
                </h3>
                {completed && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                    ✓ {t("unitsCompleted")}
                  </span>
                )}
              </div>

              {/* Cards progress */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{t("lettersLearned")}</span>
                  <span>{viewed}/{total}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${(viewed / total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Best quiz score */}
              <div className="text-xs text-gray-500">
                {t("bestScore")}:{" "}
                {best ? (
                  <span className="font-semibold text-orange-600">
                    {best.score}/{best.total} ({Math.round((best.score / best.total) * 100)}%)
                  </span>
                ) : (
                  t("noQuizYet")
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                <Link
                  href={`/${locale}/units/${unit.id}/flashcards`}
                  className="text-xs px-3 py-1.5 bg-green-50 text-green-800 rounded-lg hover:bg-green-100 transition-colors"
                >
                  📚 Flashcards
                </Link>
                <Link
                  href={`/${locale}/units/${unit.id}/quiz`}
                  className="text-xs px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  ✍️ Quiz
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset */}
      <div className="text-center">
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            <RotateCcw size={14} className="inline mr-1" />
            {t("resetProgress")}
          </button>
        ) : (
          <div className="bg-red-50 rounded-xl p-4 inline-block">
            <p className="text-sm text-red-700 mb-3">{t("resetConfirm")}</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => { resetProgress(); setShowConfirm(false); }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold"
              >
                {t("resetProgress")}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
