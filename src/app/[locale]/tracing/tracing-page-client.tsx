"use client";

import { useState } from "react";
import { LetterTracing } from "@/components/tracing/letter-tracing";
import { LETTERS } from "@/data/letters";

export function TracingPageClient({ locale }: { locale: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedLetter = LETTERS[selectedIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Letter grid selector */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {LETTERS.map((letter, i) => (
            <button
              key={letter.id}
              onClick={() => setSelectedIndex(i)}
              className={`w-12 h-12 rounded-xl text-2xl font-[family-name:var(--font-arabic)] transition-all ${
                i === selectedIndex
                  ? "bg-green-800 text-white shadow-lg scale-110"
                  : "bg-white text-green-900 hover:bg-green-50 shadow-sm"
              }`}
            >
              {letter.letter}
            </button>
          ))}
        </div>
      </div>

      {/* Tracing area */}
      <LetterTracing
        key={selectedLetter.id}
        letter={selectedLetter.letter}
        letterName={selectedLetter.name}
        locale={locale}
        onComplete={() => {
          if (selectedIndex < LETTERS.length - 1) {
            setSelectedIndex(selectedIndex + 1);
          }
        }}
      />
    </div>
  );
}
