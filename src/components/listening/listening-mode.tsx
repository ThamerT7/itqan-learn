"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";

interface LetterItem {
  id: string;
  letter: string;
  name: string;
  audioFile: string;
  phonetic: Record<string, string>;
}

interface ListeningModeProps {
  letters: LetterItem[];
  locale: string;
  onComplete?: (score: number, total: number) => void;
}

const uiText: Record<string, Record<string, string>> = {
  en: { title: "Listening Mode", listen: "Listen & Pick", seeSpeak: "See & Speak", playSound: "Play Sound", playAgain: "Play Again", whichLetter: "Which letter did you hear?", canYouPronounce: "Can you pronounce this letter?", yes: "Yes, I can!", no: "Need practice", round: "Round", score: "Score", results: "Results", tryAgain: "Try Again", excellent: "Excellent hearing!", good: "Good job!", needsPractice: "Keep practicing!" },
  tr: { title: "Dinleme Modu", listen: "Dinle & Se\u00E7", seeSpeak: "G\u00F6r & S\u00F6yle", playSound: "Sesi \u00C7al", playAgain: "Tekrar \u00C7al", whichLetter: "Hangi harfi duydunuz?", canYouPronounce: "Bu harfi telaffuz edebilir misiniz?", yes: "Evet!", no: "Pratik gerekli", round: "Tur", score: "Puan", results: "Sonu\u00E7lar", tryAgain: "Tekrar Dene", excellent: "Harika duyma!", good: "\u0130yi i\u015F!", needsPractice: "Pratik yapmaya devam!" },
  fr: { title: "Mode \u00C9coute", listen: "\u00C9couter & Choisir", seeSpeak: "Voir & Prononcer", playSound: "Jouer le son", playAgain: "Rejouer", whichLetter: "Quelle lettre avez-vous entendue?", canYouPronounce: "Pouvez-vous prononcer cette lettre?", yes: "Oui!", no: "Besoin de pratique", round: "Tour", score: "Score", results: "R\u00E9sultats", tryAgain: "R\u00E9essayer", excellent: "Excellente \u00E9coute!", good: "Bien!", needsPractice: "Continuez!" },
  ur: { title: "\u0633\u0646\u0646\u06D2 \u06A9\u0627 \u0645\u0648\u0688", listen: "\u0633\u0646\u06CC\u06BA \u0627\u0648\u0631 \u0686\u0646\u06CC\u06BA", seeSpeak: "\u062F\u06CC\u06A9\u06BE\u06CC\u06BA \u0627\u0648\u0631 \u0628\u0648\u0644\u06CC\u06BA", playSound: "\u0622\u0648\u0627\u0632 \u0686\u0644\u0627\u0626\u06CC\u06BA", playAgain: "\u062F\u0648\u0628\u0627\u0631\u06C1 \u0686\u0644\u0627\u0626\u06CC\u06BA", whichLetter: "\u0622\u067E \u0646\u06D2 \u06A9\u0648\u0646 \u0633\u0627 \u062D\u0631\u0641 \u0633\u0646\u0627\u061F", canYouPronounce: "\u06A9\u06CC\u0627 \u0622\u067E \u06CC\u06C1 \u062D\u0631\u0641 \u0627\u062F\u0627 \u06A9\u0631 \u0633\u06A9\u062A\u06D2 \u06C1\u06CC\u06BA\u061F", yes: "\u06C1\u0627\u06BA!", no: "\u0645\u0634\u0642 \u0686\u0627\u06C1\u06CC\u06D2", round: "\u062F\u0648\u0631", score: "\u0633\u06A9\u0648\u0631", results: "\u0646\u062A\u0627\u0626\u062C", tryAgain: "\u062F\u0648\u0628\u0627\u0631\u06C1 \u06A9\u0648\u0634\u0634", excellent: "\u0634\u0627\u0646\u062F\u0627\u0631 \u0633\u0645\u0627\u0639\u062A!", good: "\u0627\u0686\u06BE\u0627!", needsPractice: "\u0645\u0634\u0642 \u062C\u0627\u0631\u06CC \u0631\u06A9\u06BE\u06CC\u06BA!" },
  id: { title: "Mode Mendengar", listen: "Dengar & Pilih", seeSpeak: "Lihat & Ucapkan", playSound: "Putar Suara", playAgain: "Putar Ulang", whichLetter: "Huruf mana yang Anda dengar?", canYouPronounce: "Bisakah Anda mengucapkan huruf ini?", yes: "Ya!", no: "Perlu latihan", round: "Ronde", score: "Skor", results: "Hasil", tryAgain: "Coba Lagi", excellent: "Pendengaran luar biasa!", good: "Bagus!", needsPractice: "Terus berlatih!" },
};

const TOTAL_ROUNDS = 10;

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickOptions(letters: LetterItem[], correct: LetterItem): LetterItem[] {
  const others = letters.filter((l) => l.id !== correct.id);
  const shuffled = shuffleArray(others).slice(0, 3);
  const options = shuffleArray([...shuffled, correct]);
  return options;
}

function playLetterAudio(letter: string) {
  try {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = "ar-SA";
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  } catch {
    // Speech synthesis not available
  }
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] rounded-full transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

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
  const t = uiText[locale] || uiText.en;
  const pct = (score / total) * 100;
  const isRtl = locale === "ur";

  let message = t.needsPractice;
  let emoji = "";
  let color = "text-orange-600";
  if (pct >= 80) {
    message = t.excellent;
    emoji = "";
    color = "text-green-600";
  } else if (pct >= 50) {
    message = t.good;
    emoji = "";
    color = "text-[#1B5E20]";
  }

  return (
    <div className="text-center py-10" dir={isRtl ? "rtl" : "ltr"}>
      <div className="text-7xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.results}</h2>
      <p className={`text-lg font-semibold ${color} mb-1`}>{message}</p>
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-5xl font-bold text-[#1B5E20]">{score}</span>
        <span className="text-2xl text-gray-400">/</span>
        <span className="text-5xl font-bold text-gray-400">{total}</span>
      </div>
      <div className="w-48 mx-auto mb-8">
        <ProgressBar current={score} total={total} />
      </div>
      <button
        onClick={onRetry}
        className="px-8 py-3 rounded-xl bg-[#1B5E20] text-white font-semibold hover:bg-[#2E7D32] transition-colors shadow-md"
      >
        {t.tryAgain}
      </button>
    </div>
  );
}

function ListenPickMode({
  letters,
  locale,
  onFinish,
}: {
  letters: LetterItem[];
  locale: string;
  onFinish: (score: number) => void;
}) {
  const t = uiText[locale] || uiText.en;
  const isRtl = locale === "ur";

  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const rounds = useMemo(() => {
    const shuffled = shuffleArray(letters);
    const picked: LetterItem[] = [];
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      picked.push(shuffled[i % shuffled.length]);
    }
    return picked.map((correct) => ({
      correct,
      options: pickOptions(letters, correct),
    }));
  }, [letters]);

  const currentData = rounds[currentRound];

  const handlePlay = useCallback(() => {
    if (currentData) {
      playLetterAudio(currentData.correct.letter);
    }
  }, [currentData]);

  useEffect(() => {
    if (currentData) {
      const timer = setTimeout(() => {
        playLetterAudio(currentData.correct.letter);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentRound, currentData]);

  const handleSelect = (letterId: string) => {
    if (showFeedback) return;
    setSelected(letterId);
    setShowFeedback(true);
    const isCorrect = letterId === currentData.correct.id;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentRound + 1 >= TOTAL_ROUNDS) {
        onFinish(isCorrect ? score + 1 : score);
      } else {
        setCurrentRound((r) => r + 1);
        setSelected(null);
        setShowFeedback(false);
      }
    }, 1200);
  };

  if (!currentData) return null;

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
        <span>{t.round} {currentRound + 1}/{TOTAL_ROUNDS}</span>
        <span>{t.score}: {score}</span>
      </div>
      <ProgressBar current={currentRound + 1} total={TOTAL_ROUNDS} />

      {/* Prompt */}
      <div className="text-center mt-8 mb-6">
        <p className="text-base font-medium text-gray-700 mb-4">{t.whichLetter}</p>
        <button
          onClick={handlePlay}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E65100] text-white font-semibold hover:bg-[#BF360C] transition-colors shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6.253v11.494m0 0A5.978 5.978 0 018.464 15.536M12 17.747A5.978 5.978 0 0015.536 15.536M5.636 5.636a9 9 0 1012.728 0" />
          </svg>
          {showFeedback ? t.playAgain : t.playSound}
        </button>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {currentData.options.map((option) => {
          let borderClass = "border-gray-200 bg-white hover:border-[#1B5E20] hover:bg-green-50";
          if (showFeedback) {
            if (option.id === currentData.correct.id) {
              borderClass = "border-green-500 bg-green-50 ring-2 ring-green-200";
            } else if (option.id === selected) {
              borderClass = "border-red-500 bg-red-50 ring-2 ring-red-200";
            } else {
              borderClass = "border-gray-200 bg-gray-50 opacity-50";
            }
          }
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={showFeedback}
              className={`flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all duration-200 ${borderClass}`}
            >
              <span className="text-4xl font-arabic mb-1">{option.letter}</span>
              <span className="text-xs text-gray-500">{option.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SeeSpeakMode({
  letters,
  locale,
  onFinish,
}: {
  letters: LetterItem[];
  locale: string;
  onFinish: (score: number) => void;
}) {
  const t = uiText[locale] || uiText.en;
  const isRtl = locale === "ur";

  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);

  const roundLetters = useMemo(() => {
    const shuffled = shuffleArray(letters);
    const picked: LetterItem[] = [];
    for (let i = 0; i < TOTAL_ROUNDS; i++) {
      picked.push(shuffled[i % shuffled.length]);
    }
    return picked;
  }, [letters]);

  const currentLetter = roundLetters[currentRound];

  const handlePlay = useCallback(() => {
    if (currentLetter) {
      playLetterAudio(currentLetter.letter);
    }
  }, [currentLetter]);

  const handleRate = (canPronounce: boolean) => {
    const newScore = canPronounce ? score + 1 : score;
    if (canPronounce) setScore((s) => s + 1);

    if (currentRound + 1 >= TOTAL_ROUNDS) {
      onFinish(newScore);
    } else {
      setCurrentRound((r) => r + 1);
    }
  };

  if (!currentLetter) return null;

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
        <span>{t.round} {currentRound + 1}/{TOTAL_ROUNDS}</span>
        <span>{t.score}: {score}</span>
      </div>
      <ProgressBar current={currentRound + 1} total={TOTAL_ROUNDS} />

      {/* Letter display */}
      <div className="text-center mt-8 mb-6">
        <p className="text-base font-medium text-gray-700 mb-4">{t.canYouPronounce}</p>
        <div className="inline-flex flex-col items-center bg-white border-2 border-[#1B5E20]/20 rounded-2xl px-12 py-8 shadow-sm mb-4">
          <span className="text-8xl font-arabic text-[#1B5E20] mb-2">{currentLetter.letter}</span>
          <span className="text-base font-medium text-gray-600">{currentLetter.name}</span>
          <span className="text-xs text-gray-400 mt-1">
            {currentLetter.phonetic[locale] || currentLetter.phonetic.en || ""}
          </span>
        </div>
        <div>
          <button
            onClick={handlePlay}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6.253v11.494m0 0A5.978 5.978 0 018.464 15.536M12 17.747A5.978 5.978 0 0015.536 15.536M5.636 5.636a9 9 0 1012.728 0" />
            </svg>
            {t.playSound}
          </button>
        </div>
      </div>

      {/* Rating buttons */}
      <div className="flex gap-4 max-w-sm mx-auto">
        <button
          onClick={() => handleRate(true)}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-green-50 border-2 border-green-200 text-green-700 font-semibold hover:bg-green-100 hover:border-green-300 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span className="text-sm">{t.yes}</span>
        </button>
        <button
          onClick={() => handleRate(false)}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-orange-50 border-2 border-orange-200 text-orange-700 font-semibold hover:bg-orange-100 hover:border-orange-300 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
          </svg>
          <span className="text-sm">{t.no}</span>
        </button>
      </div>
    </div>
  );
}

export default function ListeningMode({ letters, locale, onComplete }: ListeningModeProps) {
  const t = uiText[locale] || uiText.en;
  const isRtl = locale === "ur";

  const [mode, setMode] = useState<"listen" | "seeSpeak">("listen");
  const [gameState, setGameState] = useState<"playing" | "results">("playing");
  const [finalScore, setFinalScore] = useState(0);
  const [sessionKey, setSessionKey] = useState(0);

  const handleFinish = useCallback(
    (score: number) => {
      setFinalScore(score);
      setGameState("results");
      onComplete?.(score, TOTAL_ROUNDS);
    },
    [onComplete]
  );

  const handleRetry = () => {
    setGameState("playing");
    setFinalScore(0);
    setSessionKey((k) => k + 1);
  };

  const switchMode = (newMode: "listen" | "seeSpeak") => {
    setMode(newMode);
    setGameState("playing");
    setFinalScore(0);
    setSessionKey((k) => k + 1);
  };

  if (letters.length < 4) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>Not enough letters for this exercise. At least 4 are needed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B5E20] mb-4">{t.title}</h1>

        {/* Mode toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => switchMode("listen")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
              mode === "listen"
                ? "bg-white text-[#1B5E20] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.listen}
          </button>
          <button
            onClick={() => switchMode("seeSpeak")}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
              mode === "seeSpeak"
                ? "bg-white text-[#1B5E20] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.seeSpeak}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        {gameState === "results" ? (
          <ResultsScreen
            score={finalScore}
            total={TOTAL_ROUNDS}
            locale={locale}
            onRetry={handleRetry}
          />
        ) : mode === "listen" ? (
          <ListenPickMode
            key={`listen-${sessionKey}`}
            letters={letters}
            locale={locale}
            onFinish={handleFinish}
          />
        ) : (
          <SeeSpeakMode
            key={`speak-${sessionKey}`}
            letters={letters}
            locale={locale}
            onFinish={handleFinish}
          />
        )}
      </div>
    </div>
  );
}
