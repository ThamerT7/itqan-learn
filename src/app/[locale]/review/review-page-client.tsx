"use client";

import { useState, useEffect, useCallback } from "react";
import { getDueLetters, getWeakLetters, updateLetterSR, getLetterSRState, type SRState } from "@/lib/spaced-repetition";
import { FlashcardFlip } from "@/components/flashcards/flashcard-flip";
import { LETTERS } from "@/data/letters";
import type { ArabicLetter } from "@/types";

const translations: Record<string, Record<string, string>> = {
  en: {
    title: "Spaced Repetition Review",
    dueCount: "Letters due for review",
    weakLetters: "Weak letters",
    allCaughtUp: "All caught up!",
    allCaughtUpDesc: "No letters due for review. Come back later!",
    ratePrompt: "How well did you remember this letter?",
    again: "Again",
    hard: "Hard",
    good: "Good",
    easy: "Easy",
    perfect: "Perfect",
    fail: "Forgot",
    remaining: "remaining",
    completed: "Review Complete!",
    completedDesc: "Great job! You reviewed all due letters.",
    nextReview: "Next review",
    interval: "Interval",
    days: "days",
    day: "day",
  },
  tr: {
    title: "Aralıklı Tekrar",
    dueCount: "Tekrar edilecek harfler",
    weakLetters: "Zayıf harfler",
    allCaughtUp: "Hepsi tamam!",
    allCaughtUpDesc: "Tekrar edilecek harf yok. Daha sonra gelin!",
    ratePrompt: "Bu harfi ne kadar iyi hatırladınız?",
    again: "Tekrar",
    hard: "Zor",
    good: "İyi",
    easy: "Kolay",
    perfect: "Mükemmel",
    fail: "Unuttum",
    remaining: "kalan",
    completed: "Tekrar Tamamlandı!",
    completedDesc: "Harika! Tüm harfleri tekrar ettiniz.",
    nextReview: "Sonraki tekrar",
    interval: "Aralık",
    days: "gün",
    day: "gün",
  },
  fr: {
    title: "Révision espacée",
    dueCount: "Lettres à réviser",
    weakLetters: "Lettres faibles",
    allCaughtUp: "Tout est à jour !",
    allCaughtUpDesc: "Aucune lettre à réviser. Revenez plus tard !",
    ratePrompt: "Comment avez-vous retenu cette lettre ?",
    again: "Encore",
    hard: "Difficile",
    good: "Bien",
    easy: "Facile",
    perfect: "Parfait",
    fail: "Oublié",
    remaining: "restantes",
    completed: "Révision terminée !",
    completedDesc: "Bravo ! Vous avez révisé toutes les lettres.",
    nextReview: "Prochaine révision",
    interval: "Intervalle",
    days: "jours",
    day: "jour",
  },
  ur: {
    title: "وقفے وقفے سے مراجعہ",
    dueCount: "مراجعے کے لیے حروف",
    weakLetters: "کمزور حروف",
    allCaughtUp: "سب مکمل!",
    allCaughtUpDesc: "مراجعے کے لیے کوئی حرف نہیں۔ بعد میں آئیں!",
    ratePrompt: "یہ حرف کتنا یاد تھا؟",
    again: "دوبارہ",
    hard: "مشکل",
    good: "اچھا",
    easy: "آسان",
    perfect: "بہترین",
    fail: "بھول گیا",
    remaining: "باقی",
    completed: "مراجعہ مکمل!",
    completedDesc: "شاباش! آپ نے تمام حروف کا مراجعہ کیا۔",
    nextReview: "اگلا مراجعہ",
    interval: "وقفہ",
    days: "دن",
    day: "دن",
  },
  id: {
    title: "Ulasan Berkala",
    dueCount: "Huruf yang perlu diulas",
    weakLetters: "Huruf lemah",
    allCaughtUp: "Semua sudah selesai!",
    allCaughtUpDesc: "Tidak ada huruf yang perlu diulas. Kembali nanti!",
    ratePrompt: "Seberapa baik Anda mengingat huruf ini?",
    again: "Lagi",
    hard: "Sulit",
    good: "Baik",
    easy: "Mudah",
    perfect: "Sempurna",
    fail: "Lupa",
    remaining: "tersisa",
    completed: "Ulasan Selesai!",
    completedDesc: "Hebat! Anda telah mengulas semua huruf.",
    nextReview: "Ulasan berikutnya",
    interval: "Interval",
    days: "hari",
    day: "hari",
  },
};

function getLetterById(id: string): ArabicLetter | undefined {
  return LETTERS.find((l) => l.id === id);
}

export function ReviewPageClient({ locale }: { locale: string }) {
  const t = translations[locale] ?? translations.en;

  const [dueLetterIds, setDueLetterIds] = useState<string[]>([]);
  const [weakLetterIds, setWeakLetterIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDueLetterIds(getDueLetters());
    setWeakLetterIds(getWeakLetters(5));
    setMounted(true);
  }, []);

  const handleRate = useCallback(
    (quality: number) => {
      const letterId = dueLetterIds[currentIndex];
      updateLetterSR(letterId, quality);

      if (currentIndex < dueLetterIds.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setShowRating(false);
      } else {
        setIsComplete(true);
        setWeakLetterIds(getWeakLetters(5));
      }
    },
    [dueLetterIds, currentIndex]
  );

  if (!mounted) {
    return null;
  }

  const currentLetterId = dueLetterIds[currentIndex];
  const currentLetter = currentLetterId ? getLetterById(currentLetterId) : undefined;

  // No letters due
  if (dueLetterIds.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t.title}</h1>
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <div className="text-6xl mb-4">&#10003;</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">{t.allCaughtUp}</h2>
          <p className="text-gray-600">{t.allCaughtUpDesc}</p>
        </div>

        {weakLetterIds.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">{t.weakLetters}</h3>
            <div className="flex flex-wrap gap-2">
              {weakLetterIds.map((id) => {
                const letter = getLetterById(id);
                if (!letter) return null;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-orange-50 text-orange-800 rounded-lg text-lg font-[family-name:var(--font-arabic)]"
                  >
                    {letter.letter}
                    <span className="text-sm text-orange-600">{letter.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Review complete
  if (isComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t.title}</h1>
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <div className="text-6xl mb-4">&#127881;</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">{t.completed}</h2>
          <p className="text-gray-600">{t.completedDesc}</p>
        </div>

        {weakLetterIds.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">{t.weakLetters}</h3>
            <div className="flex flex-wrap gap-2">
              {weakLetterIds.map((id) => {
                const letter = getLetterById(id);
                if (!letter) return null;
                const srState = getLetterSRState(id);
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-orange-50 text-orange-800 rounded-lg"
                  >
                    <span className="text-lg font-[family-name:var(--font-arabic)]">{letter.letter}</span>
                    <span className="text-sm text-orange-600">
                      {t.nextReview}: {srState.nextReview}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Active review
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
        <span className="text-sm text-gray-500">
          {dueLetterIds.length - currentIndex} {t.remaining}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentIndex / dueLetterIds.length) * 100}%` }}
        />
      </div>

      {/* Stats bar */}
      <div className="flex gap-4 mb-6">
        <div className="bg-white rounded-xl px-4 py-2 shadow-sm">
          <span className="text-sm text-gray-500">{t.dueCount}</span>
          <span className="ml-2 font-bold text-green-800">{dueLetterIds.length}</span>
        </div>
        {weakLetterIds.length > 0 && (
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm">
            <span className="text-sm text-gray-500">{t.weakLetters}</span>
            <span className="ml-2 font-bold text-orange-600">{weakLetterIds.length}</span>
          </div>
        )}
      </div>

      {/* Flashcard */}
      {currentLetter && (
        <div
          className="mb-8"
          onClick={() => {
            if (!showRating) setShowRating(true);
          }}
        >
          <FlashcardFlip letter={currentLetter} />
        </div>
      )}

      {/* Rating buttons */}
      {showRating && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-center text-gray-600 mb-4">{t.ratePrompt}</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              { quality: 0, label: t.fail, color: "bg-red-100 text-red-700 hover:bg-red-200" },
              { quality: 1, label: t.again, color: "bg-orange-100 text-orange-700 hover:bg-orange-200" },
              { quality: 2, label: t.hard, color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" },
              { quality: 3, label: t.good, color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
              { quality: 4, label: t.easy, color: "bg-green-100 text-green-700 hover:bg-green-200" },
              { quality: 5, label: t.perfect, color: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" },
            ].map(({ quality, label, color }) => (
              <button
                key={quality}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRate(quality);
                }}
                className={`px-3 py-3 rounded-xl font-medium transition-colors ${color}`}
              >
                <div className="text-lg">{quality}</div>
                <div className="text-xs">{label}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
