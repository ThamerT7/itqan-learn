"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  SYLLABLE_LESSONS,
  TASHKEEL_COLORS,
  TASHKEEL_BG_COLORS,
  type SyllableLesson,
  type ExerciseItem,
  type PracticeGridItem,
} from "@/data/syllables";
import {
  Volume2,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  RotateCcw,
  BookOpen,
  GraduationCap,
  Grid3X3,
  Trophy,
} from "lucide-react";

// ─── TTS helper ──────────────────────────────────────────

function speak(text: string, rate = 0.7) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ar-SA";
  utter.rate = rate;
  utter.pitch = 1;
  window.speechSynthesis.speak(utter);
}

// ─── Color mapping by lesson ─────────────────────────────

const LESSON_COLOR_KEY: Record<string, string> = {
  harakat: "fathah",
  madd: "dammah",
  sukoon: "sukoon",
  shaddah: "shaddah",
  tanween: "tanween",
  combining: "fathah",
};

function getLessonColor(lessonId: string) {
  return TASHKEEL_COLORS[LESSON_COLOR_KEY[lessonId] ?? "fathah"];
}

function getLessonBg(lessonId: string) {
  return TASHKEEL_BG_COLORS[LESSON_COLOR_KEY[lessonId] ?? "fathah"];
}

// ─── Sub-components ──────────────────────────────────────

function AudioButton({ text, size = "md" }: { text: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };
  const iconSizes = { sm: 14, md: 18, lg: 22 };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      className={`${sizeClasses[size]} rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors flex items-center justify-center shrink-0`}
      aria-label="Play audio"
    >
      <Volume2 size={iconSizes[size]} />
    </button>
  );
}

function LessonTabs({
  lessons,
  activeIndex,
  onSelect,
  completedLessons,
}: {
  lessons: SyllableLesson[];
  activeIndex: number;
  onSelect: (i: number) => void;
  completedLessons: Set<string>;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-8">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      >
        {lessons.map((lesson, i) => {
          const isActive = i === activeIndex;
          const isCompleted = completedLessons.has(lesson.id);

          return (
            <button
              key={lesson.id}
              onClick={() => onSelect(i)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all duration-300 shrink-0
                ${isActive
                  ? "bg-green-800 text-white shadow-lg shadow-green-800/25 scale-105"
                  : isCompleted
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }
              `}
            >
              {isCompleted && !isActive && (
                <Check size={14} className="text-green-600" />
              )}
              <span className="font-[family-name:var(--font-arabic)] text-base">
                {lesson.order}
              </span>
              <span className="hidden sm:inline">{lesson.titleAr}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ConceptSection({ lesson }: { lesson: SyllableLesson }) {
  return (
    <div className={`rounded-2xl p-6 mb-6 ${getLessonBg(lesson.id)} border border-white/50`}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shrink-0">
          <BookOpen size={20} className="text-green-700" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{lesson.title.en}</h3>
          <p className="font-[family-name:var(--font-arabic)] text-xl text-green-900 mt-1">
            {lesson.titleAr}
          </p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">{lesson.concept.en}</p>

      {/* Large examples display */}
      <div className="flex flex-wrap gap-3 mt-4">
        {lesson.examples.slice(0, 6).map((ex, i) => (
          <button
            key={i}
            onClick={() => speak(ex.arabic)}
            className="group flex flex-col items-center gap-1 bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <span className="font-[family-name:var(--font-arabic)] text-3xl text-green-900 group-hover:text-green-700 transition-colors">
              {ex.arabic}
            </span>
            <span className="text-xs text-gray-500">{ex.transliteration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PracticeGrid({ grid, lessonId }: { grid: PracticeGridItem[]; lessonId: string }) {
  const [expanded, setExpanded] = useState(false);
  const displayGrid = expanded ? grid : grid.slice(0, 6);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Grid3X3 size={18} className="text-gray-500" />
        <h4 className="font-semibold text-gray-700">Practice Grid</h4>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 gap-px bg-gray-100">
          <div className="bg-gray-50 px-3 py-2 text-center text-xs font-medium text-gray-500">
            Letter
          </div>
          <div className="bg-green-50 px-3 py-2 text-center text-xs font-medium text-green-700">
            فَتْحَة
          </div>
          <div className="bg-blue-50 px-3 py-2 text-center text-xs font-medium text-blue-700">
            ضَمَّة
          </div>
          <div className="bg-orange-50 px-3 py-2 text-center text-xs font-medium text-orange-700">
            كَسْرَة
          </div>
        </div>
        {/* Rows */}
        <div className="divide-y divide-gray-50">
          {displayGrid.map((item, i) => (
            <div key={i} className="grid grid-cols-4 gap-px">
              <div className="px-3 py-3 text-center font-[family-name:var(--font-arabic)] text-2xl text-gray-800 bg-gray-50/50">
                {item.letter}
              </div>
              <button
                onClick={() => speak(item.withFathah)}
                className="px-3 py-3 text-center font-[family-name:var(--font-arabic)] text-2xl text-green-700 hover:bg-green-50 transition-colors"
              >
                {item.withFathah}
              </button>
              <button
                onClick={() => speak(item.withDammah)}
                className="px-3 py-3 text-center font-[family-name:var(--font-arabic)] text-2xl text-blue-700 hover:bg-blue-50 transition-colors"
              >
                {item.withDammah}
              </button>
              <button
                onClick={() => speak(item.withKasrah)}
                className="px-3 py-3 text-center font-[family-name:var(--font-arabic)] text-2xl text-orange-600 hover:bg-orange-50 transition-colors"
              >
                {item.withKasrah}
              </button>
            </div>
          ))}
        </div>
      </div>
      {grid.length > 6 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm text-green-700 hover:text-green-800 font-medium transition-colors"
        >
          {expanded ? "Show less" : `Show all ${grid.length} letters`}
        </button>
      )}
    </div>
  );
}

function ExerciseSection({
  lesson,
  onComplete,
}: {
  lesson: SyllableLesson;
  onComplete: () => void;
}) {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [finished, setFinished] = useState(false);

  const exercise = lesson.exercises[exerciseIndex];
  const item = exercise?.items[currentItem];
  const totalItems = lesson.exercises.reduce((acc, ex) => acc + ex.items.length, 0);

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (showResult || !item) return;
      setSelected(optionIndex);
      setShowResult(true);
      if (optionIndex === item.correct) {
        setScore((s) => s + 1);
      }
      setTotalAnswered((t) => t + 1);

      // Auto-advance after delay
      setTimeout(() => {
        if (currentItem < exercise.items.length - 1) {
          setCurrentItem((c) => c + 1);
        } else if (exerciseIndex < lesson.exercises.length - 1) {
          setExerciseIndex((e) => e + 1);
          setCurrentItem(0);
        } else {
          setFinished(true);
          onComplete();
        }
        setSelected(null);
        setShowResult(false);
      }, 1200);
    },
    [showResult, item, currentItem, exercise, exerciseIndex, lesson.exercises.length, onComplete]
  );

  const reset = () => {
    setExerciseIndex(0);
    setCurrentItem(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setTotalAnswered(0);
    setFinished(false);
  };

  if (finished) {
    const percent = Math.round((score / totalAnswered) * 100);
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Trophy size={32} className="text-green-700" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Exercise Complete!</h3>
        <p className="text-gray-600 mb-4">
          You scored <span className="font-bold text-green-700">{score}</span> out of{" "}
          <span className="font-bold">{totalAnswered}</span> ({percent}%)
        </p>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percent >= 80 ? "bg-green-500" : percent >= 50 ? "bg-orange-500" : "bg-red-500"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-800 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          <RotateCcw size={18} />
          Try Again
        </button>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <GraduationCap size={18} className="text-gray-500" />
        <h4 className="font-semibold text-gray-700">Exercises</h4>
        <span className="text-xs text-gray-400 ml-auto">
          {totalAnswered + 1} / {totalItems}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-800 to-green-500 rounded-full transition-all duration-400"
          style={{ width: `${(totalAnswered / totalItems) * 100}%` }}
        />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-gray-500 mb-4">{exercise.instruction.en}</p>

        {/* Prompt with audio */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="font-[family-name:var(--font-arabic)] text-4xl text-green-900">
            {item.prompt}
          </span>
          <AudioButton text={item.prompt} size="lg" />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {item.options.map((option, oi) => {
            const isSelected = selected === oi;
            const isCorrect = oi === item.correct;
            let optionClass = "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800";

            if (showResult) {
              if (isCorrect) {
                optionClass = "bg-green-100 border-green-500 text-green-800 ring-2 ring-green-500/30";
              } else if (isSelected && !isCorrect) {
                optionClass = "bg-red-100 border-red-400 text-red-800 ring-2 ring-red-400/30";
              } else {
                optionClass = "bg-gray-50 border-gray-200 text-gray-400";
              }
            }

            return (
              <button
                key={oi}
                onClick={() => handleSelect(oi)}
                disabled={showResult}
                className={`
                  relative px-4 py-4 rounded-xl border-2 font-[family-name:var(--font-arabic)] text-2xl
                  transition-all duration-300 ${optionClass}
                  ${!showResult ? "hover:scale-[1.02] active:scale-[0.98]" : ""}
                `}
              >
                {option}
                {showResult && isCorrect && (
                  <Check size={18} className="absolute top-2 right-2 text-green-600" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <X size={18} className="absolute top-2 right-2 text-red-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────

type TabView = "learn" | "practice" | "exercise";

export function SyllableBuilder() {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabView>("learn");
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const lesson = SYLLABLE_LESSONS[activeLessonIndex];

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("itqan-spelling-progress");
      if (saved) {
        setCompletedLessons(new Set(JSON.parse(saved)));
      }
    } catch {
      // ignore
    }
  }, []);

  const markComplete = useCallback(
    (lessonId: string) => {
      setCompletedLessons((prev) => {
        const next = new Set(prev);
        next.add(lessonId);
        try {
          localStorage.setItem("itqan-spelling-progress", JSON.stringify([...next]));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const goNext = () => {
    if (activeLessonIndex < SYLLABLE_LESSONS.length - 1) {
      setActiveLessonIndex((i) => i + 1);
      setActiveTab("learn");
    }
  };

  const goPrev = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex((i) => i - 1);
      setActiveTab("learn");
    }
  };

  const viewTabs: { id: TabView; label: string; icon: typeof BookOpen }[] = [
    { id: "learn", label: "Learn", icon: BookOpen },
    { id: "practice", label: "Practice", icon: Grid3X3 },
    { id: "exercise", label: "Exercise", icon: GraduationCap },
  ];

  return (
    <div>
      {/* Page header */}
      <div className="text-center mb-8">
        <h1 className="font-[family-name:var(--font-arabic)] text-4xl md:text-5xl text-green-900 mb-2">
          التَّهَجِّي وَرَبْطُ الحُرُوف
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          Spelling &amp; Syllable Building
        </h2>
        <p className="text-gray-500">
          Master Arabic syllables from short vowels to complete words
        </p>
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-800 to-green-600 flex items-center justify-center text-white font-bold text-sm">
          {completedLessons.size}/{SYLLABLE_LESSONS.length}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-700 mb-1">Overall Progress</div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-800 to-green-500 rounded-full transition-all duration-500"
              style={{
                width: `${(completedLessons.size / SYLLABLE_LESSONS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Lesson tabs */}
      <LessonTabs
        lessons={SYLLABLE_LESSONS}
        activeIndex={activeLessonIndex}
        onSelect={(i) => {
          setActiveLessonIndex(i);
          setActiveTab("learn");
        }}
        completedLessons={completedLessons}
      />

      {/* View tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
        {viewTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
              ${activeTab === tab.id
                ? "bg-white text-green-800 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
              }
            `}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="transition-all duration-300">
        {activeTab === "learn" && <ConceptSection lesson={lesson} />}
        {activeTab === "practice" && (
          <PracticeGrid grid={lesson.practiceGrid} lessonId={lesson.id} />
        )}
        {activeTab === "exercise" && (
          <ExerciseSection
            key={lesson.id}
            lesson={lesson}
            onComplete={() => markComplete(lesson.id)}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={goPrev}
          disabled={activeLessonIndex === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <span className="text-sm text-gray-400">
          Lesson {activeLessonIndex + 1} of {SYLLABLE_LESSONS.length}
        </span>

        <button
          onClick={goNext}
          disabled={activeLessonIndex === SYLLABLE_LESSONS.length - 1}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-green-800 text-white hover:bg-green-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
