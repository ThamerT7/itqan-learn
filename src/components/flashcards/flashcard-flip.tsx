"use client";

import { useState } from "react";
import { ArabicLetter, Locale } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import { AudioButton } from "@/components/audio/audio-button";

export function FlashcardFlip({ letter }: { letter: ArabicLetter }) {
  const [flipped, setFlipped] = useState(false);
  const locale = useLocale() as Locale;
  const t = useTranslations("flashcards");

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <div
        className="relative min-h-[420px] transition-transform duration-600"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
          transitionDuration: "0.6s",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-900 to-green-700 text-white flex flex-col items-center justify-center p-8 shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-4 right-4">
            <AudioButton src={letter.audioFile} letter={letter.letter} size="lg" />
          </div>

          <div className="text-[140px] font-[family-name:var(--font-arabic)] leading-none mb-4">
            {letter.letter}
          </div>
          <div className="text-3xl font-bold mb-2">{letter.name}</div>
          <div className="text-base opacity-80" dir={locale === "ur" ? "rtl" : "ltr"}>
            {letter.phonetic[locale]}
          </div>

          {/* Letter forms */}
          <div className="flex gap-4 mt-6">
            {(["isolated", "initial", "medial", "final"] as const).map((form) => (
              <div key={form} className="text-center">
                <div className="text-2xl font-[family-name:var(--font-arabic)]">
                  {letter.forms[form]}
                </div>
                <div className="text-[10px] opacity-60 mt-1">{t(form)}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-sm opacity-50">
            ↻ {t("flipToSee")}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-white p-7 shadow-xl overflow-auto"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-center mb-5">
            <span className="text-6xl font-[family-name:var(--font-arabic)] text-green-800">
              {letter.letter}
            </span>
            <span className="ml-3 text-xl font-semibold text-gray-600">{letter.name}</span>
          </div>

          {/* Makhraj */}
          <div className="bg-green-50 rounded-xl p-4 mb-3" dir={locale === "ur" ? "rtl" : "ltr"}>
            <div className="text-xs font-bold text-green-800 uppercase tracking-wide mb-1">
              🎯 {t("makhraj")}
            </div>
            <div className="text-sm text-gray-700">{letter.makhraj[locale]}</div>
          </div>

          {/* Tip */}
          <div className="bg-orange-50 rounded-xl p-4 mb-3" dir={locale === "ur" ? "rtl" : "ltr"}>
            <div className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-1">
              💡 {t("tip")}
            </div>
            <div className="text-sm text-gray-700">{letter.tips[locale]}</div>
          </div>

          {/* Example */}
          <div className="bg-purple-50 rounded-xl p-4 text-center" dir="rtl">
            <div className="text-xs font-bold text-purple-700 mb-1">📖 {t("example")}</div>
            <div className="text-4xl font-[family-name:var(--font-arabic)] text-purple-900">
              {letter.example}
            </div>
            <div
              className="text-sm text-gray-500 mt-1"
              dir={locale === "ur" ? "rtl" : "ltr"}
            >
              {letter.exampleMeaning[locale]}
            </div>
          </div>

          <div className="text-center mt-4 text-sm text-gray-400">
            ↻ {t("flipToSee")}
          </div>
        </div>
      </div>
    </div>
  );
}
