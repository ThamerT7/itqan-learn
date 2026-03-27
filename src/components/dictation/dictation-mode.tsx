"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  HEAR_WRITE_EXERCISES,
  SIMILAR_SOUNDS_EXERCISES,
  TASHKEEL_LISTEN_EXERCISES,
  type HearWriteExercise,
  type SimilarSoundsExercise,
  type TashkeelListenExercise,
} from "@/data/dictation";

// ─── Arabic letters for the keyboard ─────────────────────

const ARABIC_LETTERS = [
  "ا", "ب", "ت", "ث", "ج", "ح", "خ",
  "د", "ذ", "ر", "ز", "س", "ش", "ص",
  "ض", "ط", "ظ", "ع", "غ", "ف", "ق",
  "ك", "ل", "م", "ن", "ه", "و", "ي",
];

const TASHKEEL_MARKS = ["َ", "ُ", "ِ", "ْ", "ً", "ٌ", "ٍ", "ّ"];

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

// ─── Utility ─────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function stripTashkeel(text: string): string {
  return text.replace(/[\u064B-\u0652\u0670]/g, "");
}

// ─── Mode tabs ─────────────────────

type ModeTab = "hear-write" | "similar-sounds" | "tashkeel-listen";

const MODE_LABELS: Record<ModeTab, Record<string, string>> = {
  "hear-write": {
    en: "Hear & Write",
    tr: "Duy & Yaz",
    fr: "Ecouter & Ecrire",
    ur: "سنیں اور لکھیں",
    id: "Dengar & Tulis",
  },
  "similar-sounds": {
    en: "Similar Sounds",
    tr: "Benzer Sesler",
    fr: "Sons Similaires",
    ur: "ملتی جلتی آوازیں",
    id: "Suara Mirip",
  },
  "tashkeel-listen": {
    en: "Tashkeel by Ear",
    tr: "Kulakla Hareke",
    fr: "Tashkeel a l'oreille",
    ur: "کان سے تشکیل",
    id: "Tashkeel dari Telinga",
  },
};

const UI_TEXT: Record<string, Record<string, string>> = {
  en: {
    score: "Score",
    round: "Round",
    playAudio: "Play Audio",
    playAgain: "Play Again",
    check: "Check",
    next: "Next",
    correct: "Correct!",
    incorrect: "Incorrect",
    theAnswer: "The correct answer:",
    buildWord: "Type what you hear:",
    pickCorrect: "Pick the word you hear:",
    pickTashkeel: "Which tashkeel matches?",
    backspace: "Backspace",
    clear: "Clear",
    results: "Results",
    tryAgain: "Try Again",
    excellent: "Excellent!",
    good: "Good job!",
    keepPracticing: "Keep practicing!",
    difference: "Difference",
    listenWord: "Listen to the word",
    bareWord: "Word without tashkeel:",
  },
  tr: {
    score: "Puan",
    round: "Tur",
    playAudio: "Sesi Cal",
    playAgain: "Tekrar Cal",
    check: "Kontrol",
    next: "Sonraki",
    correct: "Dogru!",
    incorrect: "Yanlis",
    theAnswer: "Dogru cevap:",
    buildWord: "Duydugunuzu yazin:",
    pickCorrect: "Duydugunuz kelimeyi secin:",
    pickTashkeel: "Hangi hareke uyuyor?",
    backspace: "Sil",
    clear: "Temizle",
    results: "Sonuclar",
    tryAgain: "Tekrar Dene",
    excellent: "Mukemmel!",
    good: "Iyi is!",
    keepPracticing: "Pratik yapmaya devam!",
    difference: "Fark",
    listenWord: "Kelimeyi dinleyin",
    bareWord: "Harekesiz kelime:",
  },
  fr: {
    score: "Score",
    round: "Tour",
    playAudio: "Jouer",
    playAgain: "Rejouer",
    check: "Verifier",
    next: "Suivant",
    correct: "Correct!",
    incorrect: "Incorrect",
    theAnswer: "La bonne reponse:",
    buildWord: "Ecrivez ce que vous entendez:",
    pickCorrect: "Choisissez le mot entendu:",
    pickTashkeel: "Quel tashkeel correspond?",
    backspace: "Effacer",
    clear: "Vider",
    results: "Resultats",
    tryAgain: "Reessayer",
    excellent: "Excellent!",
    good: "Bien!",
    keepPracticing: "Continuez!",
    difference: "Difference",
    listenWord: "Ecoutez le mot",
    bareWord: "Mot sans tashkeel:",
  },
  ur: {
    score: "سکور",
    round: "دور",
    playAudio: "آواز چلائیں",
    playAgain: "دوبارہ چلائیں",
    check: "جانچیں",
    next: "اگلا",
    correct: "صحیح!",
    incorrect: "غلط",
    theAnswer: "صحیح جواب:",
    buildWord: "جو سنیں وہ لکھیں:",
    pickCorrect: "سنی ہوئی آواز چنیں:",
    pickTashkeel: "کون سی تشکیل مناسب ہے؟",
    backspace: "مٹائیں",
    clear: "صاف",
    results: "نتائج",
    tryAgain: "دوبارہ کوشش",
    excellent: "شاندار!",
    good: "اچھا!",
    keepPracticing: "مشق جاری رکھیں!",
    difference: "فرق",
    listenWord: "لفظ سنیں",
    bareWord: "بغیر تشکیل:",
  },
  id: {
    score: "Skor",
    round: "Ronde",
    playAudio: "Putar Audio",
    playAgain: "Putar Ulang",
    check: "Periksa",
    next: "Berikutnya",
    correct: "Benar!",
    incorrect: "Salah",
    theAnswer: "Jawaban yang benar:",
    buildWord: "Tulis apa yang Anda dengar:",
    pickCorrect: "Pilih kata yang Anda dengar:",
    pickTashkeel: "Tashkeel mana yang cocok?",
    backspace: "Hapus",
    clear: "Bersihkan",
    results: "Hasil",
    tryAgain: "Coba Lagi",
    excellent: "Luar biasa!",
    good: "Bagus!",
    keepPracticing: "Terus berlatih!",
    difference: "Perbedaan",
    listenWord: "Dengarkan kata",
    bareWord: "Kata tanpa tashkeel:",
  },
};

// ─── Progress Bar ─────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-green-800 to-green-600 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Results Screen ─────────────────────

function ResultsScreen({
  score,
  total,
  locale,
  onRetry,
}: {
  score: number;
  total: number;
  locale: string;
  onRetry: () => void;
}) {
  const t = UI_TEXT[locale] || UI_TEXT.en;
  const pct = Math.round((score / total) * 100);

  let message = t.keepPracticing;
  let color = "text-orange-600";
  if (pct >= 80) {
    message = t.excellent;
    color = "text-green-700";
  } else if (pct >= 50) {
    message = t.good;
    color = "text-green-800";
  }

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.results}</h2>
      <p className={`text-lg font-semibold ${color} mb-4`}>{message}</p>
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-5xl font-bold text-green-800">{score}</span>
        <span className="text-2xl text-gray-400">/</span>
        <span className="text-5xl font-bold text-gray-400">{total}</span>
      </div>
      <div className="w-48 mx-auto mb-8">
        <ProgressBar current={score} total={total} />
      </div>
      <button
        onClick={onRetry}
        className="px-8 py-3 rounded-xl bg-green-800 text-white font-semibold hover:bg-green-900 transition-colors shadow-md"
      >
        {t.tryAgain}
      </button>
    </div>
  );
}

// ─── Hear & Write Mode ─────────────────────

function HearWriteMode({
  locale,
  onFinish,
}: {
  locale: string;
  onFinish: (score: number, total: number) => void;
}) {
  const t = UI_TEXT[locale] || UI_TEXT.en;
  const exercises = useMemo(() => shuffleArray(HEAR_WRITE_EXERCISES).slice(0, 10), []);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const current = exercises[index] as HearWriteExercise;

  useEffect(() => {
    const timer = setTimeout(() => speakArabic(current.ttsText), 400);
    return () => clearTimeout(timer);
  }, [current.ttsText]);

  const handleLetterTap = (letter: string) => {
    if (showResult) return;
    setInput((prev) => prev + letter);
  };

  const handleBackspace = () => {
    if (showResult) return;
    // Remove last character, handling tashkeel properly
    if (input.length === 0) return;
    const last = input.charCodeAt(input.length - 1);
    // If last char is a tashkeel mark, remove it
    if (last >= 0x064B && last <= 0x0652) {
      setInput((prev) => prev.slice(0, -1));
    } else {
      setInput((prev) => prev.slice(0, -1));
    }
  };

  const handleCheck = () => {
    const strippedInput = stripTashkeel(input.trim());
    const strippedTarget = stripTashkeel(current.arabic.replace(/\s/g, " ").trim());
    const correct = strippedInput === strippedTarget;
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (index + 1 >= exercises.length) {
      onFinish(isCorrect ? score : score, exercises.length);
    } else {
      setIndex((i) => i + 1);
      setInput("");
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  return (
    <div>
      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
        <span>
          {t.round} {index + 1}/{exercises.length}
        </span>
        <span>
          {t.score}: {score}
        </span>
      </div>
      <ProgressBar current={index + 1} total={exercises.length} />

      {/* Play button */}
      <div className="text-center mt-6 mb-4">
        <p className="text-sm font-medium text-gray-600 mb-3">{t.buildWord}</p>
        <button
          onClick={() => speakArabic(current.ttsText)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
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
          {showResult ? t.playAgain : t.playAudio}
        </button>
      </div>

      {/* Input display */}
      <div
        className="bg-white border-2 border-gray-200 rounded-2xl p-4 min-h-[60px] flex items-center justify-center mb-4"
        dir="rtl"
      >
        <span className="text-3xl font-[family-name:var(--font-arabic)] text-gray-900 tracking-wide">
          {input || <span className="text-gray-300">...</span>}
        </span>
      </div>

      {/* Feedback */}
      {showResult && (
        <div
          className={`rounded-xl p-4 mb-4 text-center ${
            isCorrect
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <p
            className={`font-bold text-lg ${
              isCorrect ? "text-green-700" : "text-red-700"
            }`}
          >
            {isCorrect ? t.correct : t.incorrect}
          </p>
          {!isCorrect && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">{t.theAnswer}</p>
              <p
                className="text-2xl font-[family-name:var(--font-arabic)] text-gray-900 mt-1"
                dir="rtl"
              >
                {current.arabic}
              </p>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-2">
            {current.meaning[locale as keyof typeof current.meaning] ||
              current.meaning.en}
          </p>
        </div>
      )}

      {/* Arabic keyboard */}
      {!showResult && (
        <div className="space-y-2">
          {/* Letters grid */}
          <div className="grid grid-cols-7 gap-1.5" dir="rtl">
            {ARABIC_LETTERS.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterTap(letter)}
                className="py-2.5 rounded-lg bg-white border border-gray-200 text-xl font-[family-name:var(--font-arabic)] text-gray-800 hover:bg-green-50 hover:border-green-300 active:bg-green-100 transition-colors shadow-sm"
              >
                {letter}
              </button>
            ))}
          </div>
          {/* Tashkeel row */}
          <div className="flex gap-1.5 justify-center" dir="rtl">
            {TASHKEEL_MARKS.map((mark) => (
              <button
                key={mark}
                onClick={() => handleLetterTap(mark)}
                className="w-10 py-2 rounded-lg bg-amber-50 border border-amber-200 text-lg font-[family-name:var(--font-arabic)] text-amber-800 hover:bg-amber-100 active:bg-amber-200 transition-colors"
              >
                <span>{"ـ" + mark}</span>
              </button>
            ))}
          </div>
          {/* Control buttons */}
          <div className="flex gap-2 justify-center mt-2">
            <button
              onClick={handleBackspace}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              {t.backspace}
            </button>
            <button
              onClick={() => setInput("")}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              {t.clear}
            </button>
            <button
              onClick={() => setInput((prev) => prev + " ")}
              className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Space
            </button>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-center mt-4">
        {!showResult ? (
          <button
            onClick={handleCheck}
            disabled={input.length === 0}
            className="px-8 py-3 rounded-xl bg-green-800 text-white font-semibold hover:bg-green-900 transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t.check}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-green-800 text-white font-semibold hover:bg-green-900 transition-colors shadow-md"
          >
            {t.next}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Similar Sounds Mode ─────────────────────

function SimilarSoundsMode({
  locale,
  onFinish,
}: {
  locale: string;
  onFinish: (score: number, total: number) => void;
}) {
  const t = UI_TEXT[locale] || UI_TEXT.en;
  const exercises = useMemo(() => shuffleArray(SIMILAR_SOUNDS_EXERCISES).slice(0, 10), []);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const current = exercises[index] as SimilarSoundsExercise;

  useEffect(() => {
    const timer = setTimeout(() => speakArabic(current.ttsText), 400);
    return () => clearTimeout(timer);
  }, [current.ttsText]);

  const handleSelect = (optIndex: number) => {
    if (showResult) return;
    setSelected(optIndex);
    const correct = optIndex === current.correctIndex;
    if (correct) setScore((s) => s + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (index + 1 >= exercises.length) {
      onFinish(score, exercises.length);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  // Find the differing letters between the two options
  const getDifference = (a: string, b: string) => {
    const strippedA = stripTashkeel(a);
    const strippedB = stripTashkeel(b);
    for (let i = 0; i < Math.max(strippedA.length, strippedB.length); i++) {
      if (strippedA[i] !== strippedB[i]) {
        return { letterA: strippedA[i] || "", letterB: strippedB[i] || "" };
      }
    }
    return null;
  };

  const diff = getDifference(current.options[0], current.options[1]);

  return (
    <div>
      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
        <span>
          {t.round} {index + 1}/{exercises.length}
        </span>
        <span>
          {t.score}: {score}
        </span>
      </div>
      <ProgressBar current={index + 1} total={exercises.length} />

      {/* Play button */}
      <div className="text-center mt-6 mb-6">
        <p className="text-sm font-medium text-gray-600 mb-3">{t.pickCorrect}</p>
        <button
          onClick={() => speakArabic(current.ttsText)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
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
          {showResult ? t.playAgain : t.playAudio}
        </button>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-4">
        {current.options.map((option, optIdx) => {
          let borderClass =
            "border-gray-200 bg-white hover:border-green-400 hover:bg-green-50";
          if (showResult) {
            if (optIdx === current.correctIndex) {
              borderClass = "border-green-500 bg-green-50 ring-2 ring-green-200";
            } else if (optIdx === selected) {
              borderClass = "border-red-500 bg-red-50 ring-2 ring-red-200";
            } else {
              borderClass = "border-gray-200 bg-gray-50 opacity-50";
            }
          }
          return (
            <button
              key={optIdx}
              onClick={() => handleSelect(optIdx)}
              disabled={showResult}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 ${borderClass}`}
            >
              <span
                className="text-3xl font-[family-name:var(--font-arabic)] text-gray-900"
                dir="rtl"
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback with difference highlight */}
      {showResult && (
        <div className="text-center mb-4">
          <p
            className={`font-bold text-lg mb-2 ${
              selected === current.correctIndex ? "text-green-700" : "text-red-700"
            }`}
          >
            {selected === current.correctIndex ? t.correct : t.incorrect}
          </p>
          <p className="text-sm text-gray-500">
            {current.meaning[locale as keyof typeof current.meaning] ||
              current.meaning.en}
          </p>
          {diff && (
            <div className="mt-3 inline-flex items-center gap-3 px-4 py-2 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-xs text-amber-700 font-medium">{t.difference}:</span>
              <span className="text-2xl font-[family-name:var(--font-arabic)] text-amber-800">
                {diff.letterA}
              </span>
              <span className="text-gray-400">vs</span>
              <span className="text-2xl font-[family-name:var(--font-arabic)] text-amber-800">
                {diff.letterB}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Next button */}
      {showResult && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-green-800 text-white font-semibold hover:bg-green-900 transition-colors shadow-md"
          >
            {t.next}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Tashkeel Listen Mode ─────────────────────

function TashkeelListenMode({
  locale,
  onFinish,
}: {
  locale: string;
  onFinish: (score: number, total: number) => void;
}) {
  const t = UI_TEXT[locale] || UI_TEXT.en;
  const exercises = useMemo(
    () => shuffleArray(TASHKEEL_LISTEN_EXERCISES).slice(0, 10),
    []
  );
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const current = exercises[index] as TashkeelListenExercise;

  useEffect(() => {
    const timer = setTimeout(() => speakArabic(current.ttsText), 400);
    return () => clearTimeout(timer);
  }, [current.ttsText]);

  const handleSelect = (optIndex: number) => {
    if (showResult) return;
    setSelected(optIndex);
    const correct = optIndex === current.correctIndex;
    if (correct) setScore((s) => s + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (index + 1 >= exercises.length) {
      onFinish(score, exercises.length);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  return (
    <div>
      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
        <span>
          {t.round} {index + 1}/{exercises.length}
        </span>
        <span>
          {t.score}: {score}
        </span>
      </div>
      <ProgressBar current={index + 1} total={exercises.length} />

      {/* Play + bare word */}
      <div className="text-center mt-6 mb-4">
        <p className="text-sm font-medium text-gray-600 mb-3">{t.pickTashkeel}</p>
        <button
          onClick={() => speakArabic(current.ttsText)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors shadow-md mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
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
          {showResult ? t.playAgain : t.playAudio}
        </button>
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">{t.bareWord}</p>
          <span
            className="text-4xl font-[family-name:var(--font-arabic)] text-gray-800"
            dir="rtl"
          >
            {current.bare}
          </span>
        </div>
      </div>

      {/* Tashkeel options */}
      <div className="flex flex-col gap-3 max-w-md mx-auto mb-4">
        {current.options.map((option, optIdx) => {
          let cls =
            "border-gray-200 bg-white hover:border-green-400 hover:bg-green-50";
          if (showResult) {
            if (optIdx === current.correctIndex) {
              cls = "border-green-500 bg-green-50 ring-2 ring-green-200";
            } else if (optIdx === selected) {
              cls = "border-red-500 bg-red-50 ring-2 ring-red-200";
            } else {
              cls = "border-gray-200 bg-gray-50 opacity-50";
            }
          }
          return (
            <button
              key={optIdx}
              onClick={() => handleSelect(optIdx)}
              disabled={showResult}
              className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${cls}`}
              dir="rtl"
            >
              <span className="text-2xl font-[family-name:var(--font-arabic)] text-gray-900">
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showResult && (
        <div className="text-center mb-4">
          <p
            className={`font-bold text-lg ${
              selected === current.correctIndex ? "text-green-700" : "text-red-700"
            }`}
          >
            {selected === current.correctIndex ? t.correct : t.incorrect}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {current.meaning[locale as keyof typeof current.meaning] ||
              current.meaning.en}
          </p>
        </div>
      )}

      {/* Next button */}
      {showResult && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-green-800 text-white font-semibold hover:bg-green-900 transition-colors shadow-md"
          >
            {t.next}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Dictation Mode Component ─────────────────────

export function DictationMode({ locale = "en" }: { locale?: string }) {
  const [activeTab, setActiveTab] = useState<ModeTab>("hear-write");
  const [gameState, setGameState] = useState<"playing" | "results">("playing");
  const [finalScore, setFinalScore] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [sessionKey, setSessionKey] = useState(0);

  const isRtl = locale === "ur";

  const handleFinish = useCallback((score: number, total: number) => {
    setFinalScore(score);
    setFinalTotal(total);
    setGameState("results");
  }, []);

  const handleRetry = () => {
    setGameState("playing");
    setFinalScore(0);
    setFinalTotal(0);
    setSessionKey((k) => k + 1);
  };

  const switchTab = (tab: ModeTab) => {
    setActiveTab(tab);
    setGameState("playing");
    setFinalScore(0);
    setFinalTotal(0);
    setSessionKey((k) => k + 1);
  };

  return (
    <div className="max-w-2xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800 mb-4">
          {locale === "ar"
            ? "الإملاء"
            : locale === "tr"
            ? "Dikte"
            : locale === "fr"
            ? "Dictee"
            : locale === "ur"
            ? "املا"
            : locale === "id"
            ? "Dikte"
            : "Dictation"}
        </h1>

        {/* Mode tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
          {(["hear-write", "similar-sounds", "tashkeel-listen"] as ModeTab[]).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className={`flex-1 py-2.5 px-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-green-800 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {MODE_LABELS[tab][locale] || MODE_LABELS[tab].en}
              </button>
            )
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
        {gameState === "results" ? (
          <ResultsScreen
            score={finalScore}
            total={finalTotal}
            locale={locale}
            onRetry={handleRetry}
          />
        ) : activeTab === "hear-write" ? (
          <HearWriteMode
            key={`hw-${sessionKey}`}
            locale={locale}
            onFinish={handleFinish}
          />
        ) : activeTab === "similar-sounds" ? (
          <SimilarSoundsMode
            key={`ss-${sessionKey}`}
            locale={locale}
            onFinish={handleFinish}
          />
        ) : (
          <TashkeelListenMode
            key={`tl-${sessionKey}`}
            locale={locale}
            onFinish={handleFinish}
          />
        )}
      </div>
    </div>
  );
}
