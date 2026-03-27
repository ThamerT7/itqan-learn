"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  TAJWEED_CATEGORIES,
  type TajweedCategory,
  type TajweedRule,
  type QuranicExample,
} from "@/data/tajweed";

// ─── TTS helper ─────────────────────

function speakArabic(text: string) {
  try {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  } catch {
    // Speech synthesis not available
  }
}

// ─── UI Strings ─────────────────────

const UI: Record<string, Record<string, string>> = {
  en: {
    title: "Tajweed Explorer",
    lettersInvolved: "Letters Involved",
    quranicExamples: "Quranic Examples",
    playAudio: "Play",
    surah: "Surah",
    ayah: "Ayah",
    miniQuiz: "Mini Quiz",
    findTheRule: "Tap the word that contains this tajweed rule:",
    correct: "Correct!",
    tryAgain: "Try again!",
    selectRule: "Select a rule to explore",
    categories: "Categories",
    noLetters: "General rule (applies contextually)",
  },
  tr: {
    title: "Tecvid Kesfet",
    lettersInvolved: "Ilgili Harfler",
    quranicExamples: "Kuran'dan Ornekler",
    playAudio: "Cal",
    surah: "Sure",
    ayah: "Ayet",
    miniQuiz: "Mini Quiz",
    findTheRule: "Bu tecvid kuralini iceren kelimeye dokunun:",
    correct: "Dogru!",
    tryAgain: "Tekrar deneyin!",
    selectRule: "Kesfetmek icin bir kural secin",
    categories: "Kategoriler",
    noLetters: "Genel kural (baglamsal olarak uygulanir)",
  },
  fr: {
    title: "Explorateur de Tajweed",
    lettersInvolved: "Lettres Concernees",
    quranicExamples: "Exemples Coraniques",
    playAudio: "Jouer",
    surah: "Sourate",
    ayah: "Verset",
    miniQuiz: "Mini Quiz",
    findTheRule: "Touchez le mot qui contient cette regle:",
    correct: "Correct!",
    tryAgain: "Reessayez!",
    selectRule: "Selectionnez une regle a explorer",
    categories: "Categories",
    noLetters: "Regle generale (s'applique contextuellement)",
  },
  ur: {
    title: "تجوید ایکسپلورر",
    lettersInvolved: "متعلقہ حروف",
    quranicExamples: "قرآنی مثالیں",
    playAudio: "چلائیں",
    surah: "سورۃ",
    ayah: "آیت",
    miniQuiz: "مختصر کوئز",
    findTheRule: "اس تجوید کے قاعدے والا لفظ تھپتھپائیں:",
    correct: "صحیح!",
    tryAgain: "دوبارہ کوشش کریں!",
    selectRule: "دریافت کرنے کے لیے کوئی قاعدہ منتخب کریں",
    categories: "زمرے",
    noLetters: "عمومی قاعدہ (سیاق کے مطابق لاگو ہوتا ہے)",
  },
  id: {
    title: "Penjelajah Tajwid",
    lettersInvolved: "Huruf Terkait",
    quranicExamples: "Contoh Al-Quran",
    playAudio: "Putar",
    surah: "Surah",
    ayah: "Ayat",
    miniQuiz: "Kuis Mini",
    findTheRule: "Ketuk kata yang mengandung hukum tajwid ini:",
    correct: "Benar!",
    tryAgain: "Coba lagi!",
    selectRule: "Pilih hukum untuk dijelajahi",
    categories: "Kategori",
    noLetters: "Hukum umum (berlaku secara kontekstual)",
  },
};

// ─── Example Card ─────────────────────

function ExampleCard({
  example,
  rule,
  locale,
}: {
  example: QuranicExample;
  rule: TajweedRule;
  locale: string;
}) {
  const t = UI[locale] || UI.en;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      {/* Quranic text */}
      <div className="text-center mb-3" dir="rtl">
        <p className="text-2xl font-[family-name:var(--font-arabic)] leading-loose text-gray-900">
          {example.text}
        </p>
      </div>
      {/* Surah info + play */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {t.surah}: {example.surah} ({example.surahEn}) - {t.ayah} {example.ayah}
        </span>
        <button
          onClick={() => speakArabic(example.ttsText)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-800 text-xs font-medium hover:bg-green-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0112 5.586v12.828a1 1 0 01-1.707.707L5.586 15z"
            />
          </svg>
          {t.playAudio}
        </button>
      </div>
    </div>
  );
}

// ─── Mini Quiz ─────────────────────

function MiniQuiz({
  rule,
  locale,
}: {
  rule: TajweedRule;
  locale: string;
}) {
  const t = UI[locale] || UI.en;
  const [quizExample] = useState(() => {
    const idx = Math.floor(Math.random() * rule.examples.length);
    return rule.examples[idx];
  });
  const [tapped, setTapped] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  // Split text into words
  const words = useMemo(() => {
    if (!quizExample) return [];
    return quizExample.text.split(/\s+/);
  }, [quizExample]);

  // Determine which word index contains the highlight
  const correctWordIndex = useMemo(() => {
    if (!quizExample) return 0;
    let charCount = 0;
    for (let i = 0; i < words.length; i++) {
      const wordStart = charCount;
      const wordEnd = charCount + words[i].length;
      if (
        (quizExample.highlightStart >= wordStart && quizExample.highlightStart < wordEnd) ||
        (quizExample.highlightEnd > wordStart && quizExample.highlightEnd <= wordEnd)
      ) {
        return i;
      }
      charCount = wordEnd + 1; // +1 for space
    }
    return 0;
  }, [quizExample, words]);

  const handleWordTap = (idx: number) => {
    if (feedback === "correct") return;
    setTapped(idx);
    if (idx === correctWordIndex) {
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }
  };

  if (!quizExample) return null;

  return (
    <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl border border-green-200 p-5">
      <h4 className="text-sm font-bold text-green-800 mb-1">{t.miniQuiz}</h4>
      <p className="text-xs text-gray-600 mb-4">{t.findTheRule}</p>
      <div className="flex flex-wrap gap-2 justify-center mb-3" dir="rtl">
        {words.map((word, idx) => {
          let cls =
            "px-3 py-2 rounded-lg text-xl font-[family-name:var(--font-arabic)] cursor-pointer transition-all duration-200 border-2 ";
          if (feedback === "correct" && idx === correctWordIndex) {
            cls += "border-green-500 bg-green-100 text-green-900";
          } else if (feedback === "wrong" && idx === tapped) {
            cls += "border-red-400 bg-red-50 text-red-800";
          } else {
            cls +=
              "border-gray-200 bg-white text-gray-900 hover:border-green-300 hover:bg-green-50";
          }
          return (
            <button key={idx} onClick={() => handleWordTap(idx)} className={cls}>
              {word}
            </button>
          );
        })}
      </div>
      {feedback && (
        <p
          className={`text-center text-sm font-semibold ${
            feedback === "correct" ? "text-green-700" : "text-red-600"
          }`}
        >
          {feedback === "correct" ? t.correct : t.tryAgain}
        </p>
      )}
    </div>
  );
}

// ─── Rule Detail ─────────────────────

function RuleDetail({
  rule,
  locale,
}: {
  rule: TajweedRule;
  locale: string;
}) {
  const t = UI[locale] || UI.en;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2
          className="text-4xl font-[family-name:var(--font-arabic)] text-gray-900 mb-2"
          dir="rtl"
        >
          {rule.nameAr}
        </h2>
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${rule.colorBg} ${rule.colorText}`}
        >
          {rule.name[locale as keyof typeof rule.name] || rule.name.en}
        </span>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <p className="text-gray-700 leading-relaxed text-sm">
          {rule.description[locale as keyof typeof rule.description] ||
            rule.description.en}
        </p>
      </div>

      {/* Letters involved */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-3">{t.lettersInvolved}</h3>
        {rule.letters.length > 0 ? (
          <div className="flex flex-wrap gap-2 justify-center" dir="rtl">
            {rule.letters.map((letter) => (
              <button
                key={letter}
                onClick={() => speakArabic(letter)}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border-2 text-2xl font-[family-name:var(--font-arabic)] transition-all hover:scale-110 shadow-sm"
                style={{ borderColor: rule.colorCode, color: rule.colorCode }}
              >
                {letter}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center">{t.noLetters}</p>
        )}
      </div>

      {/* Quranic examples */}
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-3">{t.quranicExamples}</h3>
        <div className="space-y-3">
          {rule.examples.map((example) => (
            <ExampleCard
              key={example.id}
              example={example}
              rule={rule}
              locale={locale}
            />
          ))}
        </div>
      </div>

      {/* Mini quiz */}
      <MiniQuiz rule={rule} locale={locale} />
    </div>
  );
}

// ─── Category Sidebar Item ─────────────────────

function CategoryItem({
  category,
  locale,
  selectedRuleId,
  onSelectRule,
  isExpanded,
  onToggle,
}: {
  category: TajweedCategory;
  locale: string;
  selectedRuleId: string | null;
  onSelectRule: (rule: TajweedRule) => void;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 ${
          isExpanded
            ? "bg-green-50 border border-green-200"
            : "bg-white border border-gray-200 hover:border-green-200 hover:bg-green-50/50"
        }`}
      >
        <div className="min-w-0">
          <p
            className="text-base font-[family-name:var(--font-arabic)] text-gray-900 truncate"
            dir="rtl"
          >
            {category.nameAr}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {category.name[locale as keyof typeof category.name] || category.name.en}
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="mt-1 ml-3 space-y-1">
          {category.rules.map((rule) => (
            <button
              key={rule.id}
              onClick={() => onSelectRule(rule)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all duration-150 ${
                selectedRuleId === rule.id
                  ? "bg-green-100 border border-green-300"
                  : "bg-gray-50 border border-transparent hover:bg-gray-100"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: rule.colorCode }}
              />
              <div className="min-w-0">
                <p
                  className="text-sm font-[family-name:var(--font-arabic)] text-gray-800 truncate"
                  dir="rtl"
                >
                  {rule.nameAr}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {rule.name[locale as keyof typeof rule.name] || rule.name.en}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main TajweedExplorer Component ─────────────────────

export function TajweedExplorer({ locale = "en" }: { locale?: string }) {
  const t = UI[locale] || UI.en;
  const isRtl = locale === "ur";

  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    TAJWEED_CATEGORIES[0]?.id ?? null
  );
  const [selectedRule, setSelectedRule] = useState<TajweedRule | null>(null);
  const [mobileView, setMobileView] = useState<"sidebar" | "detail">("sidebar");

  const handleToggleCategory = useCallback(
    (categoryId: string) => {
      setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
    },
    []
  );

  const handleSelectRule = useCallback((rule: TajweedRule) => {
    setSelectedRule(rule);
    setMobileView("detail");
  }, []);

  const handleBackToSidebar = useCallback(() => {
    setMobileView("sidebar");
  }, []);

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800">{t.title}</h1>
      </div>

      {/* Layout: sidebar + detail */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar / Mobile tabs */}
        <div
          className={`lg:w-80 flex-shrink-0 ${
            mobileView === "detail" ? "hidden lg:block" : "block"
          }`}
        >
          <div className="lg:sticky lg:top-4">
            <h2 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              {t.categories}
            </h2>
            {TAJWEED_CATEGORIES.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                locale={locale}
                selectedRuleId={selectedRule?.id ?? null}
                onSelectRule={handleSelectRule}
                isExpanded={expandedCategory === category.id}
                onToggle={() => handleToggleCategory(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div
          className={`flex-1 min-w-0 ${
            mobileView === "sidebar" ? "hidden lg:block" : "block"
          }`}
        >
          {/* Mobile back button */}
          <button
            onClick={handleBackToSidebar}
            className="lg:hidden flex items-center gap-1 text-sm text-green-800 font-medium mb-4 hover:text-green-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.categories}
          </button>

          {selectedRule ? (
            <RuleDetail rule={selectedRule} locale={locale} />
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-green-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">{t.selectRule}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
