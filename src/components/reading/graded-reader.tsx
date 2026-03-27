"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  READING_WORDS,
  READING_SENTENCES,
  READING_PARAGRAPHS,
  type ReadingLevel,
  type ReadingWord,
  type ReadingSentence,
  type ReadingParagraph,
  type ComprehensionQuestion,
} from "@/data/reading-texts";
import {
  Volume2,
  BookOpen,
  MessageSquareText,
  FileText,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Timer,
  Eye,
  EyeOff,
  Play,
  Pause,
  RotateCcw,
  Trophy,
} from "lucide-react";

// ─── TTS helper ──────────────────────────────────────────

function speak(text: string, rate = 0.7, onEnd?: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  utter.rate = rate;
  utter.pitch = 1;
  if (onEnd) utter.onend = onEnd;
  window.speechSynthesis.speak(utter);
}

function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// ─── Audio Button ────────────────────────────────────────

function AudioButton({
  text,
  size = "md",
  rate = 0.7,
}: {
  text: string;
  size?: "sm" | "md" | "lg";
  rate?: number;
}) {
  const sizeClasses = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" };
  const iconSizes = { sm: 14, md: 18, lg: 22 };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        speak(text, rate);
      }}
      className={`${sizeClasses[size]} rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors flex items-center justify-center shrink-0`}
      aria-label="Play audio"
    >
      <Volume2 size={iconSizes[size]} />
    </button>
  );
}

// ─── Level Tabs ──────────────────────────────────────────

function LevelTabs({
  activeLevel,
  onSelect,
}: {
  activeLevel: ReadingLevel;
  onSelect: (level: ReadingLevel) => void;
}) {
  const levels: { level: ReadingLevel; label: string; labelAr: string; icon: typeof BookOpen }[] = [
    { level: 1, label: "Words", labelAr: "كَلِمَات", icon: BookOpen },
    { level: 2, label: "Sentences", labelAr: "جُمَل", icon: MessageSquareText },
    { level: 3, label: "Paragraphs", labelAr: "فِقْرَات", icon: FileText },
  ];

  return (
    <div className="flex gap-2 mb-8">
      {levels.map(({ level, label, labelAr, icon: Icon }) => (
        <button
          key={level}
          onClick={() => onSelect(level)}
          className={`
            flex-1 flex flex-col items-center gap-1 py-4 rounded-2xl transition-all duration-300 border-2
            ${activeLevel === level
              ? "bg-green-800 text-white border-green-800 shadow-lg shadow-green-800/25"
              : "bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:bg-green-50"
            }
          `}
        >
          <Icon size={22} />
          <span className="font-[family-name:var(--font-arabic)] text-lg">{labelAr}</span>
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Word Card ───────────────────────────────────────────

function WordCard({ word }: { word: ReadingWord }) {
  const [showMeaning, setShowMeaning] = useState(false);

  return (
    <button
      onClick={() => {
        if (!showMeaning) {
          speak(word.arabic);
        }
        setShowMeaning(!showMeaning);
      }}
      className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100 text-center"
    >
      <div className="font-[family-name:var(--font-arabic)] text-3xl text-green-900 mb-2 group-hover:text-green-700 transition-colors">
        {word.arabic}
      </div>
      <div className="text-xs text-gray-400 mb-2">{word.transliteration}</div>
      <div
        className={`text-sm font-medium transition-all duration-300 ${
          showMeaning ? "text-orange-600 opacity-100" : "text-transparent opacity-0"
        }`}
      >
        {word.meaning.en}
      </div>
      <div className="mt-2 flex items-center justify-center gap-1">
        {showMeaning ? (
          <EyeOff size={12} className="text-gray-400" />
        ) : (
          <Eye size={12} className="text-gray-400" />
        )}
        <span className="text-[10px] text-gray-400">
          {showMeaning ? "Tap to hide" : "Tap to reveal"}
        </span>
      </div>
    </button>
  );
}

// ─── Words Level ─────────────────────────────────────────

function WordsLevel() {
  const [filter, setFilter] = useState<string>("all");
  const categories = ["all", ...new Set(READING_WORDS.map((w) => w.category))];
  const filtered = filter === "all" ? READING_WORDS : READING_WORDS.filter((w) => w.category === filter);

  return (
    <div>
      {/* Category filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              filter === cat
                ? "bg-green-800 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((word) => (
          <WordCard key={word.id} word={word} />
        ))}
      </div>
    </div>
  );
}

// ─── Sentences Level ─────────────────────────────────────

function SentenceCard({ sentence }: { sentence: ReadingSentence }) {
  const [activeWord, setActiveWord] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [karaokeIndex, setKaraokeIndex] = useState(-1);
  const karaokeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startKaraoke = useCallback(() => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      setKaraokeIndex(-1);
      if (karaokeRef.current) clearTimeout(karaokeRef.current);
      return;
    }

    setIsPlaying(true);
    setKaraokeIndex(0);

    // Speak full sentence
    speak(sentence.arabic, 0.6, () => {
      setIsPlaying(false);
      setKaraokeIndex(-1);
    });

    // Animate word highlights
    const wordCount = sentence.words.length;
    const avgDuration = 800; // ms per word at slow rate

    for (let i = 0; i < wordCount; i++) {
      karaokeRef.current = setTimeout(() => {
        setKaraokeIndex(i);
      }, i * avgDuration);
    }
  }, [isPlaying, sentence]);

  useEffect(() => {
    return () => {
      if (karaokeRef.current) clearTimeout(karaokeRef.current);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
      {/* Arabic text with word-level interaction */}
      <div className="flex flex-wrap gap-2 justify-center mb-4" dir="rtl">
        {sentence.words.map((word, i) => (
          <button
            key={i}
            onClick={() => {
              speak(word.arabic);
              setActiveWord(activeWord === i ? null : i);
            }}
            className={`
              font-[family-name:var(--font-arabic)] text-2xl md:text-3xl px-2 py-1 rounded-lg transition-all duration-300
              ${karaokeIndex === i
                ? "bg-orange-100 text-orange-700 scale-110"
                : activeWord === i
                  ? "bg-green-100 text-green-800"
                  : "text-green-900 hover:bg-gray-50"
              }
            `}
          >
            {word.arabic}
          </button>
        ))}
      </div>

      {/* Word meaning tooltip */}
      {activeWord !== null && (
        <div className="text-center mb-3 py-2 px-4 bg-green-50 rounded-xl animate-in fade-in">
          <span className="font-[family-name:var(--font-arabic)] text-lg text-green-800">
            {sentence.words[activeWord].arabic}
          </span>
          <span className="mx-2 text-gray-400">=</span>
          <span className="text-green-700 font-medium">
            {sentence.words[activeWord].meaning.en}
          </span>
        </div>
      )}

      {/* Translation */}
      <p className="text-sm text-gray-500 text-center mb-3">{sentence.translation.en}</p>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={startKaraoke}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            isPlaying
              ? "bg-orange-100 text-orange-700"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          {isPlaying ? "Stop" : "Karaoke Read"}
        </button>
        <AudioButton text={sentence.arabic} />
      </div>
    </div>
  );
}

function SentencesLevel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sentence = READING_SENTENCES[currentIndex];

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {READING_SENTENCES.length}
        </span>
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-800 to-green-500 rounded-full transition-all duration-400"
            style={{ width: `${((currentIndex + 1) / READING_SENTENCES.length) * 100}%` }}
          />
        </div>
      </div>

      <SentenceCard key={sentence.id} sentence={sentence} />

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <button
          onClick={() => setCurrentIndex((i) => Math.min(READING_SENTENCES.length - 1, i + 1))}
          disabled={currentIndex === READING_SENTENCES.length - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm bg-green-800 text-white hover:bg-green-700 transition-colors disabled:opacity-30"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Paragraphs Level ────────────────────────────────────

function ComprehensionQuiz({
  questions,
  onComplete,
}: {
  questions: ComprehensionQuestion[];
  onComplete: (score: number) => void;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQ];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const correct = idx === question.correct;
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        setFinished(true);
        onComplete(score + (correct ? 1 : 0));
      }
      setSelected(null);
      setShowResult(false);
    }, 1500);
  };

  if (finished) {
    return (
      <div className="bg-green-50 rounded-xl p-6 text-center">
        <Trophy size={32} className="text-green-700 mx-auto mb-2" />
        <p className="font-semibold text-green-800">
          Quiz Complete! {score}/{questions.length}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl p-5">
      <p className="text-sm font-medium text-gray-700 mb-3">{question.question.en}</p>
      <div className="space-y-2">
        {question.options.map((opt, i) => {
          let cls = "bg-white border-gray-200 text-gray-700 hover:border-green-300";
          if (showResult) {
            if (i === question.correct) cls = "bg-green-100 border-green-500 text-green-800";
            else if (i === selected) cls = "bg-red-100 border-red-400 text-red-700";
            else cls = "bg-white border-gray-200 text-gray-400";
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${cls}`}
            >
              <span className="flex items-center gap-2">
                {showResult && i === question.correct && <Check size={14} className="text-green-600" />}
                {showResult && i === selected && i !== question.correct && <X size={14} className="text-red-500" />}
                {opt.en}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ParagraphCard({ paragraph }: { paragraph: ReadingParagraph }) {
  const [activeWord, setActiveWord] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [readingStartTime, setReadingStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);

  // Start timer on mount
  useEffect(() => {
    setReadingStartTime(Date.now());
    return () => stopSpeaking();
  }, []);

  const markRead = () => {
    if (readingStartTime) {
      const elapsed = (Date.now() - readingStartTime) / 1000 / 60; // minutes
      const wordCount = paragraph.words.length;
      if (elapsed > 0.05) {
        setWpm(Math.round(wordCount / elapsed));
      }
    }
    setShowQuiz(true);
  };

  // Split Arabic text into displayable words
  const arabicWords = paragraph.arabic.split(/\s+/).filter((w) => w !== "۝");

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Source */}
      <div className="text-xs text-orange-600 font-medium mb-3 bg-orange-50 inline-block px-3 py-1 rounded-full">
        {paragraph.source}
      </div>

      {/* Arabic text */}
      <div className="flex flex-wrap gap-2 justify-center mb-4 leading-loose" dir="rtl">
        {arabicWords.map((word, i) => {
          const wordData = paragraph.words.find(
            (w) => word.includes(w.arabic) || w.arabic.includes(word)
          );
          return (
            <button
              key={i}
              onClick={() => {
                speak(word);
                if (wordData) {
                  setActiveWord(activeWord === i ? null : i);
                }
              }}
              className={`
                font-[family-name:var(--font-arabic)] text-2xl md:text-3xl px-1 py-0.5 rounded-lg transition-all duration-200
                ${activeWord === i && wordData
                  ? "bg-green-100 text-green-800 scale-105"
                  : "text-green-900 hover:bg-gray-50"
                }
              `}
            >
              {word}
            </button>
          );
        })}
      </div>

      {/* Active word tooltip */}
      {activeWord !== null && (() => {
        const word = arabicWords[activeWord];
        const wordData = paragraph.words.find(
          (w) => word.includes(w.arabic) || w.arabic.includes(word)
        );
        if (!wordData) return null;
        return (
          <div className="text-center mb-3 py-2 px-4 bg-green-50 rounded-xl">
            <span className="font-[family-name:var(--font-arabic)] text-lg text-green-800">
              {wordData.arabic}
            </span>
            <span className="mx-2 text-gray-400">=</span>
            <span className="text-green-700 font-medium">{wordData.meaning.en}</span>
          </div>
        );
      })()}

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <AudioButton text={paragraph.arabic} size="lg" rate={0.5} />
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          {showTranslation ? <EyeOff size={14} /> : <Eye size={14} />}
          {showTranslation ? "Hide Translation" : "Show Translation"}
        </button>
      </div>

      {/* Translation */}
      {showTranslation && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm text-gray-600 leading-relaxed">
          {paragraph.translation.en}
        </div>
      )}

      {/* Reading speed */}
      {wpm !== null && (
        <div className="flex items-center justify-center gap-2 mb-3 text-sm text-gray-500">
          <Timer size={14} />
          <span>Reading speed: {wpm} wpm</span>
        </div>
      )}

      {/* Quiz section */}
      {!showQuiz ? (
        <button
          onClick={markRead}
          className="w-full py-3 rounded-xl text-sm font-semibold bg-green-800 text-white hover:bg-green-700 transition-colors"
        >
          I&apos;ve finished reading - Take Quiz
        </button>
      ) : (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Comprehension Check</h4>
          <ComprehensionQuiz
            questions={paragraph.questions}
            onComplete={() => setQuizDone(true)}
          />
        </div>
      )}
    </div>
  );
}

function ParagraphsLevel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const paragraph = READING_PARAGRAPHS[currentIndex];

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {READING_PARAGRAPHS.length}
        </span>
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-800 to-green-500 rounded-full transition-all duration-400"
            style={{ width: `${((currentIndex + 1) / READING_PARAGRAPHS.length) * 100}%` }}
          />
        </div>
      </div>

      <ParagraphCard key={paragraph.id} paragraph={paragraph} />

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => {
            stopSpeaking();
            setCurrentIndex((i) => Math.max(0, i - 1));
          }}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <button
          onClick={() => {
            stopSpeaking();
            setCurrentIndex((i) => Math.min(READING_PARAGRAPHS.length - 1, i + 1));
          }}
          disabled={currentIndex === READING_PARAGRAPHS.length - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm bg-green-800 text-white hover:bg-green-700 transition-colors disabled:opacity-30"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────

export function GradedReader() {
  const [activeLevel, setActiveLevel] = useState<ReadingLevel>(1);
  const [readWords, setReadWords] = useState<Set<string>>(new Set());

  // Load progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem("itqan-reading-progress");
      if (saved) setReadWords(new Set(JSON.parse(saved)));
    } catch {
      // ignore
    }
  }, []);

  return (
    <div>
      {/* Page header */}
      <div className="text-center mb-8">
        <h1 className="font-[family-name:var(--font-arabic)] text-4xl md:text-5xl text-green-900 mb-2">
          القِرَاءَةُ المُتَدَرِّجَة
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          Graded Reading
        </h2>
        <p className="text-gray-500">
          Progress from words to sentences to full paragraphs
        </p>
      </div>

      {/* Stats bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-green-800">{READING_WORDS.length}</div>
          <div className="text-xs text-gray-500">Words</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-800">{READING_SENTENCES.length}</div>
          <div className="text-xs text-gray-500">Sentences</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-800">{READING_PARAGRAPHS.length}</div>
          <div className="text-xs text-gray-500">Paragraphs</div>
        </div>
      </div>

      {/* Level tabs */}
      <LevelTabs activeLevel={activeLevel} onSelect={setActiveLevel} />

      {/* Content */}
      <div className="transition-all duration-300">
        {activeLevel === 1 && <WordsLevel />}
        {activeLevel === 2 && <SentencesLevel />}
        {activeLevel === 3 && <ParagraphsLevel />}
      </div>
    </div>
  );
}
