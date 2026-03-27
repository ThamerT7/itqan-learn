"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Volume2,
  Star,
  Trophy,
  BookOpen,
  Shuffle,
  Check,
  X,
  TreePine,
  ArrowLeft,
} from "lucide-react";
import {
  VOCAB_CATEGORIES,
  ALL_VOCAB_WORDS,
  getWordOfTheDay,
  type VocabWord,
  type VocabCategory,
} from "@/data/vocabulary";

// ─── Types ────────────────────────────────────────────

type ViewMode = "categories" | "cards" | "root-explorer" | "practice";
type PracticeType = "ar-to-meaning" | "meaning-to-ar" | "fill-blank";

interface PracticeState {
  type: PracticeType;
  currentIndex: number;
  words: VocabWord[];
  score: number;
  total: number;
  answered: boolean;
  selectedOption: number | null;
  options: string[];
  correctIndex: number;
}

// ─── Helpers ──────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speak(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ar-SA";
  u.rate = 0.8;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

// ─── Word of the Day Banner ──────────────────────────

function WordOfTheDay({ onExploreRoot }: { onExploreRoot: (root: string) => void }) {
  const word = getWordOfTheDay();

  return (
    <div className="bg-gradient-to-r from-green-800 to-green-900 text-white rounded-2xl p-6 mb-8 shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <Star className="text-yellow-400" size={20} />
        <span className="text-sm font-medium text-green-200">Word of the Day</span>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="font-[family-name:var(--font-arabic)] text-4xl mb-1">{word.arabic}</p>
          <p className="text-green-200 text-sm">Root: {word.root}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">{word.meaning.en}</p>
          <p className="text-green-200 text-sm">Appears {word.frequency}x in the Quran</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => speak(word.arabic)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Listen to pronunciation"
          >
            <Volume2 size={20} />
          </button>
          <button
            onClick={() => onExploreRoot(word.root)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Explore root"
          >
            <TreePine size={20} />
          </button>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-white/20">
        <p className="font-[family-name:var(--font-arabic)] text-lg text-green-100 leading-relaxed" dir="rtl">
          {word.example.ayah}
        </p>
        <p className="text-green-300 text-xs mt-1">
          {word.example.surah} : {word.example.ayahNum}
        </p>
      </div>
    </div>
  );
}

// ─── Search Bar ───────────────────────────────────────

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        placeholder="Search Arabic words, roots, or meanings..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-sm transition-all"
      />
    </div>
  );
}

// ─── Category Grid ────────────────────────────────────

function CategoryGrid({
  onSelect,
  onPractice,
}: {
  onSelect: (cat: VocabCategory) => void;
  onPractice: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Categories</h2>
        <button
          onClick={onPractice}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl font-medium text-sm hover:bg-orange-600 transition-colors shadow-sm"
        >
          <Trophy size={16} />
          Practice All
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {VOCAB_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat)}
            className="bg-white rounded-2xl p-5 text-left hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 group"
          >
            <span className="text-3xl mb-3 block">{cat.icon}</span>
            <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-green-700 transition-colors">
              {cat.label.en}
            </h3>
            <p className="text-xs text-gray-400">{cat.words.length} words</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Flashcard View ───────────────────────────────────

function FlashcardView({
  category,
  onBack,
  onExploreRoot,
}: {
  category: VocabCategory;
  onBack: () => void;
  onExploreRoot: (root: string) => void;
}) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const word = category.words[index];

  const next = useCallback(() => {
    setFlipped(false);
    setIndex((i) => (i + 1) % category.words.length);
  }, [category.words.length]);

  const prev = useCallback(() => {
    setFlipped(false);
    setIndex((i) => (i - 1 + category.words.length) % category.words.length);
  }, [category.words.length]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " ") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch swipe
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to categories
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{category.icon}</span>
          <h2 className="text-lg font-bold text-gray-800">{category.label.en}</h2>
        </div>
        <span className="text-sm text-gray-400">
          {index + 1} / {category.words.length}
        </span>
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => setFlipped((f) => !f)}
        className="relative w-full max-w-lg mx-auto aspect-[3/2] cursor-pointer perspective-1000 mb-6"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="font-[family-name:var(--font-arabic)] text-6xl text-green-900 mb-4">
              {word.arabic}
            </p>
            <p className="text-gray-400 text-sm mb-2">Root: <span className="font-[family-name:var(--font-arabic)] text-lg text-gray-600">{word.root}</span></p>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
              <BookOpen size={12} />
              {word.frequency}x in Quran
            </span>
            <p className="text-xs text-gray-300 mt-4">Tap to flip</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-green-50 rounded-2xl shadow-xl border border-green-100 p-6 flex flex-col justify-between"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">{word.meaning.en}</h3>
              <div className="grid grid-cols-2 gap-1 text-xs text-gray-500 mb-4">
                <span>TR: {word.meaning.tr}</span>
                <span>FR: {word.meaning.fr}</span>
                <span>UR: {word.meaning.ur}</span>
                <span>ID: {word.meaning.id}</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-3">
              <p className="font-[family-name:var(--font-arabic)] text-xl text-green-800 leading-relaxed mb-1" dir="rtl">
                {word.example.ayah}
              </p>
              <p className="text-xs text-gray-400">
                {word.example.surah} : {word.example.ayahNum}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1 font-medium">Derivatives:</p>
              <div className="flex gap-2 flex-wrap">
                {word.derivatives.map((d, i) => (
                  <span
                    key={i}
                    className="font-[family-name:var(--font-arabic)] text-lg px-3 py-1 bg-green-100 text-green-800 rounded-lg"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:bg-gray-50"
          aria-label="Previous"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); speak(word.arabic); }}
          className="p-3 rounded-full bg-green-100 shadow-md hover:shadow-lg transition-all hover:bg-green-200"
          aria-label="Listen"
        >
          <Volume2 size={20} className="text-green-700" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onExploreRoot(word.root); }}
          className="p-3 rounded-full bg-orange-100 shadow-md hover:shadow-lg transition-all hover:bg-orange-200"
          aria-label="Explore root"
        >
          <TreePine size={20} className="text-orange-700" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:bg-gray-50"
          aria-label="Next"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}

// ─── Root Explorer ────────────────────────────────────

function RootExplorer({ root, onBack }: { root: string; onBack: () => void }) {
  const relatedWords = useMemo(
    () => ALL_VOCAB_WORDS.filter((w) => w.root === root),
    [root]
  );

  const allDerivatives = useMemo(() => {
    const derivs = new Set<string>();
    relatedWords.forEach((w) => {
      w.derivatives.forEach((d) => derivs.add(d));
      derivs.add(w.arabic);
    });
    return Array.from(derivs);
  }, [relatedWords]);

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700 transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="text-center mb-8">
        <p className="text-sm text-gray-400 mb-2">Root Explorer</p>
        <p className="font-[family-name:var(--font-arabic)] text-6xl text-green-900 mb-2">{root}</p>
        <p className="text-gray-500 text-sm">{allDerivatives.length} words from this root</p>
      </div>

      {/* Tree visualization */}
      <div className="relative max-w-2xl mx-auto">
        {/* Root node */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-800 text-white px-6 py-3 rounded-xl font-[family-name:var(--font-arabic)] text-2xl shadow-lg">
            {root}
          </div>
        </div>

        {/* Connector line */}
        <div className="flex justify-center mb-4">
          <div className="w-px h-8 bg-green-300" />
        </div>

        {/* Word nodes */}
        <div className="flex justify-center gap-3 flex-wrap mb-6">
          {relatedWords.map((w) => (
            <button
              key={w.id}
              onClick={() => speak(w.arabic)}
              className="bg-white border-2 border-green-200 rounded-xl p-4 hover:border-green-500 hover:shadow-md transition-all group"
            >
              <p className="font-[family-name:var(--font-arabic)] text-2xl text-green-800 mb-1">
                {w.arabic}
              </p>
              <p className="text-xs text-gray-500">{w.meaning.en}</p>
              <span className="text-[10px] text-orange-500">{w.frequency}x</span>
            </button>
          ))}
        </div>

        {/* Connector */}
        {relatedWords.length > 0 && (
          <>
            <div className="flex justify-center mb-4">
              <div className="w-px h-6 bg-orange-300" />
            </div>

            {/* Derivative nodes */}
            <div className="text-center mb-2">
              <p className="text-xs text-gray-400 font-medium mb-3">All Derivatives</p>
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              {allDerivatives.map((d, i) => (
                <button
                  key={i}
                  onClick={() => speak(d)}
                  className="font-[family-name:var(--font-arabic)] text-lg px-4 py-2 bg-orange-50 border border-orange-200 text-orange-800 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  {d}
                </button>
              ))}
            </div>
          </>
        )}

        {relatedWords.length === 0 && (
          <p className="text-center text-gray-400">No vocabulary words found for this root.</p>
        )}
      </div>
    </div>
  );
}

// ─── Practice Mode ────────────────────────────────────

function PracticeMode({
  words,
  onBack,
}: {
  words: VocabWord[];
  onBack: () => void;
}) {
  const [practiceType, setPracticeType] = useState<PracticeType | null>(null);
  const [state, setState] = useState<PracticeState | null>(null);

  function startPractice(type: PracticeType) {
    const shuffled = shuffleArray(words).slice(0, 10);
    const first = generateQuestion(type, shuffled, 0);
    setPracticeType(type);
    setState({
      type,
      currentIndex: 0,
      words: shuffled,
      score: 0,
      total: shuffled.length,
      answered: false,
      selectedOption: null,
      ...first,
    });
  }

  function generateQuestion(type: PracticeType, wordList: VocabWord[], idx: number) {
    const word = wordList[idx];
    const otherWords = shuffleArray(ALL_VOCAB_WORDS.filter((w) => w.id !== word.id)).slice(0, 3);

    if (type === "ar-to-meaning") {
      const options = shuffleArray([word.meaning.en, ...otherWords.map((w) => w.meaning.en)]);
      return { options, correctIndex: options.indexOf(word.meaning.en) };
    } else if (type === "meaning-to-ar") {
      const options = shuffleArray([word.arabic, ...otherWords.map((w) => w.arabic)]);
      return { options, correctIndex: options.indexOf(word.arabic) };
    } else {
      // fill-blank: Show ayah with blank
      const options = shuffleArray([word.arabic, ...otherWords.map((w) => w.arabic)]);
      return { options, correctIndex: options.indexOf(word.arabic) };
    }
  }

  function handleAnswer(optIdx: number) {
    if (!state || state.answered) return;
    const correct = optIdx === state.correctIndex;
    setState({
      ...state,
      answered: true,
      selectedOption: optIdx,
      score: correct ? state.score + 1 : state.score,
    });
  }

  function handleNext() {
    if (!state || !practiceType) return;
    const nextIdx = state.currentIndex + 1;
    if (nextIdx >= state.total) {
      // Show results
      setState({ ...state, currentIndex: nextIdx });
      return;
    }
    const q = generateQuestion(practiceType, state.words, nextIdx);
    setState({
      ...state,
      currentIndex: nextIdx,
      answered: false,
      selectedOption: null,
      ...q,
    });
  }

  // Type selection
  if (!practiceType || !state) {
    return (
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">Choose Practice Type</h2>
        <div className="grid gap-4 max-w-md mx-auto">
          {[
            { type: "ar-to-meaning" as PracticeType, label: "Arabic to Meaning", desc: "See Arabic word, pick the meaning", emoji: "🇸🇦" },
            { type: "meaning-to-ar" as PracticeType, label: "Meaning to Arabic", desc: "See meaning, pick the Arabic word", emoji: "🔤" },
            { type: "fill-blank" as PracticeType, label: "Fill in the Blank", desc: "Complete the Quranic ayah", emoji: "✏️" },
          ].map((opt) => (
            <button
              key={opt.type}
              onClick={() => startPractice(opt.type)}
              className="bg-white rounded-xl p-5 text-left hover:shadow-md transition-all border border-gray-100 hover:border-green-300"
            >
              <span className="text-2xl mb-2 block">{opt.emoji}</span>
              <h3 className="font-semibold text-gray-800">{opt.label}</h3>
              <p className="text-sm text-gray-400">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Results screen
  if (state.currentIndex >= state.total) {
    const pct = Math.round((state.score / state.total) * 100);
    return (
      <div className="text-center">
        <div className="mb-6">
          <Trophy size={48} className={`mx-auto mb-3 ${pct >= 70 ? "text-yellow-500" : "text-gray-400"}`} />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Practice Complete!</h2>
          <p className="text-gray-500">
            You scored <span className="font-bold text-green-700">{state.score}</span> out of{" "}
            <span className="font-bold">{state.total}</span> ({pct}%)
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => { setPracticeType(null); setState(null); }}
            className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={14} className="inline mr-1.5" />
            Try Again
          </button>
          <button
            onClick={onBack}
            className="px-5 py-2.5 bg-green-800 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  const word = state.words[state.currentIndex];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <span className="text-sm text-gray-400">
          {state.currentIndex + 1} / {state.total}
        </span>
        <span className="text-sm font-medium text-green-700">
          Score: {state.score}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full mb-8">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${((state.currentIndex + 1) / state.total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        {state.type === "ar-to-meaning" && (
          <>
            <p className="text-sm text-gray-400 mb-3">What does this word mean?</p>
            <p className="font-[family-name:var(--font-arabic)] text-5xl text-green-900 mb-2">{word.arabic}</p>
            <button onClick={() => speak(word.arabic)} className="text-green-600 hover:text-green-800">
              <Volume2 size={18} />
            </button>
          </>
        )}
        {state.type === "meaning-to-ar" && (
          <>
            <p className="text-sm text-gray-400 mb-3">Find the Arabic word for:</p>
            <p className="text-3xl font-bold text-gray-800">{word.meaning.en}</p>
          </>
        )}
        {state.type === "fill-blank" && (
          <>
            <p className="text-sm text-gray-400 mb-3">Which word completes this ayah?</p>
            <div className="bg-green-50 rounded-xl p-4 mb-2">
              <p className="font-[family-name:var(--font-arabic)] text-2xl text-green-800 leading-relaxed" dir="rtl">
                {word.example.ayah.replace(word.arabic, "______")}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {word.example.surah} : {word.example.ayahNum}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-6">
        {state.options.map((opt, i) => {
          let cls = "bg-white border-2 border-gray-200 hover:border-green-400";
          if (state.answered) {
            if (i === state.correctIndex) cls = "bg-green-100 border-2 border-green-500";
            else if (i === state.selectedOption) cls = "bg-red-100 border-2 border-red-400";
            else cls = "bg-gray-50 border-2 border-gray-100 opacity-60";
          }
          const isArabic = state.type === "meaning-to-ar" || state.type === "fill-blank";
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={state.answered}
              className={`${cls} rounded-xl p-4 text-left transition-all ${
                isArabic ? "font-[family-name:var(--font-arabic)] text-2xl text-right" : "text-sm"
              }`}
              dir={isArabic ? "rtl" : "ltr"}
            >
              <span className="flex items-center justify-between">
                <span>{opt}</span>
                {state.answered && i === state.correctIndex && (
                  <Check size={18} className="text-green-600 shrink-0" />
                )}
                {state.answered && i === state.selectedOption && i !== state.correctIndex && (
                  <X size={18} className="text-red-500 shrink-0" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {state.answered && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-green-800 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
          >
            {state.currentIndex + 1 < state.total ? "Next Question" : "See Results"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Search Results ───────────────────────────────────

function SearchResults({
  query,
  onExploreRoot,
}: {
  query: string;
  onExploreRoot: (root: string) => void;
}) {
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return ALL_VOCAB_WORDS.filter(
      (w) =>
        w.arabic.includes(q) ||
        w.root.includes(q) ||
        w.meaning.en.toLowerCase().includes(q) ||
        w.meaning.tr.toLowerCase().includes(q) ||
        w.meaning.fr.toLowerCase().includes(q) ||
        w.meaning.ur.includes(q) ||
        w.meaning.id.toLowerCase().includes(q)
    );
  }, [query]);

  if (!query.trim()) return null;

  return (
    <div className="mb-8">
      <p className="text-sm text-gray-400 mb-3">{results.length} results found</p>
      {results.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No words found matching your search.</p>
      ) : (
        <div className="grid gap-3">
          {results.map((w) => (
            <div
              key={w.id}
              className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between gap-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => speak(w.arabic)}
                  className="shrink-0 p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                >
                  <Volume2 size={16} className="text-green-700" />
                </button>
                <div>
                  <p className="font-[family-name:var(--font-arabic)] text-2xl text-green-900">{w.arabic}</p>
                  <p className="text-sm text-gray-600">{w.meaning.en}</p>
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={() => onExploreRoot(w.root)}
                  className="text-xs text-orange-600 hover:text-orange-800 font-medium"
                >
                  Root: {w.root}
                </button>
                <p className="text-[10px] text-gray-400">{w.frequency}x</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────

export function VocabTrainer() {
  const [view, setView] = useState<ViewMode>("categories");
  const [selectedCategory, setSelectedCategory] = useState<VocabCategory | null>(null);
  const [exploredRoot, setExploredRoot] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [practiceWords, setPracticeWords] = useState<VocabWord[]>([]);

  function handleSelectCategory(cat: VocabCategory) {
    setSelectedCategory(cat);
    setView("cards");
    setSearchQuery("");
  }

  function handleExploreRoot(root: string) {
    setExploredRoot(root);
    setView("root-explorer");
    setSearchQuery("");
  }

  function handlePracticeAll() {
    setPracticeWords(ALL_VOCAB_WORDS);
    setView("practice");
    setSearchQuery("");
  }

  function handleBack() {
    setView("categories");
    setSelectedCategory(null);
    setExploredRoot("");
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Quranic Vocabulary</h1>
        <p className="text-gray-500">Master the most common words in the Quran</p>
      </div>

      <WordOfTheDay onExploreRoot={handleExploreRoot} />

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {searchQuery.trim() ? (
        <SearchResults query={searchQuery} onExploreRoot={handleExploreRoot} />
      ) : (
        <>
          {view === "categories" && (
            <CategoryGrid
              onSelect={handleSelectCategory}
              onPractice={handlePracticeAll}
            />
          )}

          {view === "cards" && selectedCategory && (
            <FlashcardView
              category={selectedCategory}
              onBack={handleBack}
              onExploreRoot={handleExploreRoot}
            />
          )}

          {view === "root-explorer" && (
            <RootExplorer root={exploredRoot} onBack={handleBack} />
          )}

          {view === "practice" && (
            <PracticeMode words={practiceWords} onBack={handleBack} />
          )}
        </>
      )}
    </div>
  );
}
