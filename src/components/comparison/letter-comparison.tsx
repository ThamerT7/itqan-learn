"use client";

import React, { useState, useMemo, useCallback } from "react";
import { similarLetterGroups, SimilarGroup } from "@/data/similar-letters";
import { LETTERS } from "@/data/letters";
import type { ArabicLetter } from "@/types";

interface LetterComparisonProps {
  locale: string;
}

const uiText: Record<string, Record<string, string>> = {
  en: { title: "Similar Letters", subtitle: "Learn to distinguish confusing letters", difficulty: "Difficulty", easy: "Easy", medium: "Medium", hard: "Hard", differences: "Key Differences", tips: "How to Distinguish", back: "Back", makhraj: "Makhraj", vs: "vs" },
  tr: { title: "Benzer Harfler", subtitle: "Kar\u0131\u015Fan harfleri ay\u0131rt etmeyi \u00F6\u011Frenin", difficulty: "Zorluk", easy: "Kolay", medium: "Orta", hard: "Zor", differences: "Temel Farklar", tips: "Nas\u0131l Ay\u0131rt Edilir", back: "Geri", makhraj: "Mahre\u00E7", vs: "ve" },
  fr: { title: "Lettres Similaires", subtitle: "Apprenez \u00E0 distinguer les lettres", difficulty: "Difficult\u00E9", easy: "Facile", medium: "Moyen", hard: "Difficile", differences: "Diff\u00E9rences Cl\u00E9s", tips: "Comment Distinguer", back: "Retour", makhraj: "Makhraj", vs: "vs" },
  ur: { title: "\u0645\u0644\u062A\u06D2 \u062C\u0644\u062A\u06D2 \u062D\u0631\u0648\u0641", subtitle: "\u0645\u0634\u0627\u0628\u06C1 \u062D\u0631\u0648\u0641 \u0645\u06CC\u06BA \u0641\u0631\u0642 \u0633\u06CC\u06A9\u06BE\u06CC\u06BA", difficulty: "\u0645\u0634\u06A9\u0644", easy: "\u0622\u0633\u0627\u0646", medium: "\u062F\u0631\u0645\u06CC\u0627\u0646\u06C1", hard: "\u0645\u0634\u06A9\u0644", differences: "\u0627\u06C1\u0645 \u0641\u0631\u0642", tips: "\u06A9\u06CC\u0633\u06D2 \u067E\u06C1\u0686\u0627\u0646\u06CC\u06BA", back: "\u0648\u0627\u067E\u0633", makhraj: "\u0645\u062E\u0631\u062C", vs: "\u0627\u0648\u0631" },
  id: { title: "Huruf Mirip", subtitle: "Belajar membedakan huruf yang mirip", difficulty: "Kesulitan", easy: "Mudah", medium: "Sedang", hard: "Sulit", differences: "Perbedaan Utama", tips: "Cara Membedakan", back: "Kembali", makhraj: "Makhraj", vs: "vs" },
};

function getLetterData(arabicLetter: string): ArabicLetter | undefined {
  return LETTERS.find((l) => l.letter === arabicLetter);
}

function DifficultyBadge({ difficulty, locale }: { difficulty: string; locale: string }) {
  const t = uiText[locale] || uiText.en;
  const config: Record<string, { label: string; bg: string; text: string }> = {
    easy: { label: t.easy, bg: "bg-green-100", text: "text-green-800" },
    medium: { label: t.medium, bg: "bg-orange-100", text: "text-orange-800" },
    hard: { label: t.hard, bg: "bg-red-100", text: "text-red-800" },
  };
  const c = config[difficulty] || config.medium;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

function GroupCard({
  group,
  locale,
  onClick,
}: {
  group: SimilarGroup;
  locale: string;
  onClick: () => void;
}) {
  const t = uiText[locale] || uiText.en;
  const isRtl = locale === "ur";

  return (
    <button
      onClick={onClick}
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full text-left bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-[#1B5E20]/30 transition-all duration-200 group"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">
          {group.title[locale] || group.title.en}
        </h3>
        <DifficultyBadge difficulty={group.difficulty} locale={locale} />
      </div>
      <div className="flex items-center justify-center gap-3 py-4">
        {group.letters.map((letter, idx) => (
          <React.Fragment key={letter}>
            {idx > 0 && (
              <span className="text-sm text-gray-400 font-medium">{t.vs}</span>
            )}
            <span className="text-4xl font-arabic text-[#1B5E20] group-hover:scale-110 transition-transform duration-200">
              {letter}
            </span>
          </React.Fragment>
        ))}
      </div>
      <p className="text-xs text-gray-500 text-center mt-1">{group.titleAr}</p>
    </button>
  );
}

function MiniQuiz({
  letters,
  locale,
}: {
  letters: string[];
  locale: string;
}) {
  const [quizLetter, setQuizLetter] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const startQuiz = useCallback(() => {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    setQuizLetter(randomLetter);
    setSelected(null);
    setShowResult(false);

    const letterData = getLetterData(randomLetter);
    if (letterData) {
      try {
        const utterance = new SpeechSynthesisUtterance(randomLetter);
        utterance.lang = "ar-SA";
        utterance.rate = 0.7;
        speechSynthesis.speak(utterance);
      } catch {
        // Speech synthesis not available
      }
    }
  }, [letters]);

  const handleSelect = (letter: string) => {
    setSelected(letter);
    setShowResult(true);
  };

  const isRtl = locale === "ur";

  if (!quizLetter) {
    return (
      <div className="mt-6 pt-5 border-t border-gray-200">
        <button
          onClick={startQuiz}
          className="w-full py-3 rounded-lg bg-[#E65100] text-white font-medium hover:bg-[#BF360C] transition-colors"
        >
          {locale === "ur" ? "\u06A9\u0648\u0626\u0632 \u0634\u0631\u0648\u0639 \u06A9\u0631\u06CC\u06BA" :
           locale === "tr" ? "Mini Quiz Ba\u015Flat" :
           locale === "fr" ? "Commencer le Quiz" :
           locale === "id" ? "Mulai Kuis" :
           "Start Mini Quiz: Which letter is this?"}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 pt-5 border-t border-gray-200" dir={isRtl ? "rtl" : "ltr"}>
      <p className="text-sm font-medium text-gray-700 mb-3 text-center">
        {locale === "ur" ? "\u06CC\u06C1 \u06A9\u0648\u0646 \u0633\u0627 \u062D\u0631\u0641 \u06C1\u06D2\u061F" :
         locale === "tr" ? "Bu hangi harf?" :
         locale === "fr" ? "Quelle est cette lettre ?" :
         locale === "id" ? "Huruf apa ini?" :
         "Which letter is this?"}
      </p>
      <div className="flex justify-center gap-3 mb-3">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => handleSelect(letter)}
            disabled={showResult}
            className={`w-16 h-16 rounded-xl text-2xl font-arabic border-2 transition-all duration-200 ${
              showResult
                ? letter === quizLetter
                  ? "border-green-500 bg-green-50 text-green-700"
                  : letter === selected
                  ? "border-red-500 bg-red-50 text-red-700"
                  : "border-gray-200 bg-white text-gray-400"
                : "border-gray-200 bg-white text-gray-800 hover:border-[#1B5E20] hover:bg-green-50"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
      {showResult && (
        <div className="text-center">
          <p className={`text-sm font-medium mb-2 ${selected === quizLetter ? "text-green-600" : "text-red-600"}`}>
            {selected === quizLetter
              ? (locale === "ur" ? "\u0635\u062D\u06CC\u062D!" : locale === "tr" ? "Do\u011Fru!" : locale === "fr" ? "Correct !" : locale === "id" ? "Benar!" : "Correct!")
              : (locale === "ur" ? "\u063A\u0644\u0637\u060C \u062F\u0648\u0628\u0627\u0631\u06C1 \u06A9\u0648\u0634\u0634 \u06A9\u0631\u06CC\u06BA" : locale === "tr" ? "Yanl\u0131\u015F, tekrar deneyin" : locale === "fr" ? "Incorrect, r\u00E9essayez" : locale === "id" ? "Salah, coba lagi" : "Incorrect, try again")}
          </p>
          <button
            onClick={startQuiz}
            className="text-sm text-[#E65100] hover:text-[#BF360C] font-medium underline"
          >
            {locale === "ur" ? "\u0627\u06AF\u0644\u0627" : locale === "tr" ? "Sonraki" : locale === "fr" ? "Suivant" : locale === "id" ? "Berikutnya" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}

function DetailView({
  group,
  locale,
  onBack,
}: {
  group: SimilarGroup;
  locale: string;
  onBack: () => void;
}) {
  const t = uiText[locale] || uiText.en;
  const isRtl = locale === "ur";
  const letterDataList = group.letters.map((l) => getLetterData(l));

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-[#1B5E20] hover:text-[#2E7D32] font-medium mb-5 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {t.back}
      </button>

      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {group.title[locale] || group.title.en}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">{group.titleAr}</p>
        </div>
        <DifficultyBadge difficulty={group.difficulty} locale={locale} />
      </div>

      {/* Letters side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {letterDataList.map((data, idx) => {
          if (!data) return null;
          return (
            <div
              key={data.id}
              className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm"
            >
              <div className="text-6xl font-arabic text-[#1B5E20] mb-3">{data.letter}</div>
              <p className="text-lg font-semibold text-gray-800 mb-1">{data.name}</p>
              <p className="text-xs text-gray-500 mb-3">
                {data.phonetic[locale as keyof typeof data.phonetic] || data.phonetic.en}
              </p>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs font-medium text-[#1B5E20] mb-1">{t.makhraj}</p>
                <p className="text-sm text-gray-700">
                  {data.makhraj[locale as keyof typeof data.makhraj] || data.makhraj.en}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Differences */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#E65100]/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#E65100]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-900">{t.differences}</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          {group.differences[locale] || group.differences.en}
        </p>
      </div>

      {/* Tips */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#1B5E20]/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#1B5E20]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-900">{t.tips}</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          {group.tips[locale] || group.tips.en}
        </p>
      </div>

      {/* Mini Quiz */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <MiniQuiz letters={group.letters} locale={locale} />
      </div>
    </div>
  );
}

export default function LetterComparison({ locale }: LetterComparisonProps) {
  const [selectedGroup, setSelectedGroup] = useState<SimilarGroup | null>(null);
  const t = uiText[locale] || uiText.en;
  const isRtl = locale === "ur";

  if (selectedGroup) {
    return (
      <div className="max-w-4xl mx-auto">
        <DetailView group={selectedGroup} locale={locale} onBack={() => setSelectedGroup(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B5E20]">{t.title}</h1>
        <p className="text-sm text-gray-600 mt-1">{t.subtitle}</p>
      </div>

      {/* Grid of groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {similarLetterGroups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            locale={locale}
            onClick={() => setSelectedGroup(group)}
          />
        ))}
      </div>
    </div>
  );
}
