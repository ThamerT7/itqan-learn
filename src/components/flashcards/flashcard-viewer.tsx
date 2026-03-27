"use client";

import { useState, useEffect } from "react";
import { ArabicLetter } from "@/types";
import { FlashcardFlip } from "./flashcard-flip";
import { useTranslations } from "next-intl";
import { useProgress } from "@/providers/progress-provider";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FlashcardViewer({
  letters,
  unitId,
}: {
  letters: ArabicLetter[];
  unitId: string;
}) {
  const [idx, setIdx] = useState(0);
  const t = useTranslations("flashcards");
  const tc = useTranslations("common");
  const { markLetterViewed } = useProgress();

  useEffect(() => {
    if (letters[idx]) {
      markLetterViewed(unitId, letters[idx].id);
    }
  }, [idx, unitId, letters, markLetterViewed]);

  const canPrev = idx > 0;
  const canNext = idx < letters.length - 1;

  return (
    <div>
      {/* Progress */}
      <div className="text-center text-sm text-gray-500 mb-3">
        {t("card")} {idx + 1} {tc("of")} {letters.length}
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-800 to-green-500 rounded-full transition-all duration-400"
          style={{ width: `${((idx + 1) / letters.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="mb-6" key={letters[idx].id}>
        <FlashcardFlip letter={letters[idx]} />
      </div>

      {/* Nav */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setIdx(Math.max(0, idx - 1))}
          disabled={!canPrev}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            canPrev
              ? "bg-white text-gray-700 shadow-sm hover:shadow-md"
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          <ChevronLeft size={18} /> {tc("previous")}
        </button>
        <button
          onClick={() => setIdx(Math.min(letters.length - 1, idx + 1))}
          disabled={!canNext}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            canNext
              ? "bg-green-800 text-white shadow-sm hover:bg-green-700"
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          {tc("next")} <ChevronRight size={18} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {letters.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === idx ? "bg-green-800 scale-125" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
