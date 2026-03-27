"use client";

import { useState, useEffect, useRef } from "react";
import { LETTER_STORIES, LetterStory } from "@/data/stories";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Volume2,
  BookOpen,
} from "lucide-react";

interface LetterStoriesProps {
  locale: string;
  letterId?: string;
}

const UI_TEXT: Record<string, Record<string, string>> = {
  en: {
    title: "Letter Stories",
    subtitle: "Learn Arabic letters through beautiful stories",
    readStory: "Read Story",
    keywords: "Keywords",
    translation: "Translation",
    back: "Back to Stories",
    next: "Next Story",
    previous: "Previous Story",
    readAloud: "Read Aloud",
  },
  tr: {
    title: "Harf Hikayeleri",
    subtitle: "Güzel hikayelerle Arapça harfleri öğrenin",
    readStory: "Hikayeyi Oku",
    keywords: "Anahtar Kelimeler",
    translation: "Çeviri",
    back: "Hikayelere Dön",
    next: "Sonraki Hikaye",
    previous: "Önceki Hikaye",
    readAloud: "Sesli Oku",
  },
  fr: {
    title: "Histoires des Lettres",
    subtitle: "Apprenez les lettres arabes à travers de belles histoires",
    readStory: "Lire l'histoire",
    keywords: "Mots-clés",
    translation: "Traduction",
    back: "Retour aux histoires",
    next: "Histoire suivante",
    previous: "Histoire précédente",
    readAloud: "Lire à voix haute",
  },
  ur: {
    title: "حروف کی کہانیاں",
    subtitle: "خوبصورت کہانیوں کے ذریعے عربی حروف سیکھیں",
    readStory: "کہانی پڑھیں",
    keywords: "کلیدی الفاظ",
    translation: "ترجمہ",
    back: "کہانیوں پر واپس",
    next: "اگلی کہانی",
    previous: "پچھلی کہانی",
    readAloud: "بلند آواز سے پڑھیں",
  },
  id: {
    title: "Cerita Huruf",
    subtitle: "Belajar huruf Arab melalui cerita indah",
    readStory: "Baca Cerita",
    keywords: "Kata Kunci",
    translation: "Terjemahan",
    back: "Kembali ke Cerita",
    next: "Cerita Berikutnya",
    previous: "Cerita Sebelumnya",
    readAloud: "Baca Nyaring",
  },
};

// Card colors for variety
const CARD_GRADIENTS = [
  "from-emerald-500 to-green-600",
  "from-teal-500 to-cyan-600",
  "from-orange-500 to-amber-600",
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-violet-600",
  "from-rose-500 to-pink-600",
  "from-green-600 to-emerald-700",
  "from-cyan-500 to-blue-600",
];

export function LetterStories({ locale, letterId }: LetterStoriesProps) {
  const t = UI_TEXT[locale] || UI_TEXT.en;
  const isRtl = locale === "ur";

  const [selectedStory, setSelectedStory] = useState<LetterStory | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isReading, setIsReading] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (letterId) {
      const idx = LETTER_STORIES.findIndex((s) => s.letterId === letterId);
      if (idx >= 0) {
        setSelectedStory(LETTER_STORIES[idx]);
        setSelectedIndex(idx);
      }
    }
  }, [letterId]);

  useEffect(() => {
    if (selectedStory) {
      setAnimateIn(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
    }
  }, [selectedStory]);

  function openStory(story: LetterStory, index: number) {
    setSelectedStory(story);
    setSelectedIndex(index);
    stopReading();
  }

  function goBack() {
    setSelectedStory(null);
    setSelectedIndex(-1);
    stopReading();
  }

  function goNext() {
    if (selectedIndex < LETTER_STORIES.length - 1) {
      const next = selectedIndex + 1;
      setSelectedStory(LETTER_STORIES[next]);
      setSelectedIndex(next);
      stopReading();
    }
  }

  function goPrevious() {
    if (selectedIndex > 0) {
      const prev = selectedIndex - 1;
      setSelectedStory(LETTER_STORIES[prev]);
      setSelectedIndex(prev);
      stopReading();
    }
  }

  function readAloud() {
    if (!selectedStory) return;

    if (isReading) {
      stopReading();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(selectedStory.storyAr);
    utterance.lang = "ar";
    utterance.rate = 0.8;
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    speechRef.current = utterance;
    setIsReading(true);
    window.speechSynthesis.speak(utterance);
  }

  function stopReading() {
    window.speechSynthesis.cancel();
    setIsReading(false);
  }

  // Full story view
  if (selectedStory) {
    const story = selectedStory;
    return (
      <div
        className={`max-w-2xl mx-auto transition-all duration-500 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Back button */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-green-800 hover:text-green-600 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          {t.back}
        </button>

        {/* Story card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Header with letter and emoji */}
          <div className="bg-gradient-to-br from-green-800 to-green-900 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-8 text-8xl">✦</div>
              <div className="absolute bottom-4 right-8 text-6xl">✦</div>
            </div>
            <div className="text-8xl mb-3">{story.illustration}</div>
            <div className="text-7xl font-[family-name:var(--font-arabic)] text-white mb-2">
              {story.letter}
            </div>
            <h2 className="text-xl font-bold text-green-100">
              {story.title[locale] || story.title.en}
            </h2>
          </div>

          {/* Arabic story text */}
          <div className="p-8">
            <div className="bg-amber-50 rounded-2xl p-6 mb-6 border border-amber-100">
              <p
                className="text-2xl leading-loose text-gray-800 font-[family-name:var(--font-arabic)] text-center"
                dir="rtl"
              >
                {story.storyAr}
              </p>
            </div>

            {/* Read aloud button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={readAloud}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all ${
                  isReading
                    ? "bg-orange-600 text-white shadow-lg scale-105"
                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                }`}
              >
                <Volume2 size={18} className={isReading ? "animate-pulse" : ""} />
                {t.readAloud}
              </button>
            </div>

            {/* Translation */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                {t.translation}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {story.storyTranslation[locale] || story.storyTranslation.en}
              </p>
            </div>

            {/* Keywords */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                {t.keywords}
              </h3>
              <div className="flex flex-wrap gap-2">
                {story.keywords.map((kw, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 transition-all hover:bg-green-100 hover:shadow-sm"
                  >
                    <span
                      className="font-[family-name:var(--font-arabic)] text-lg font-bold text-green-800"
                      dir="rtl"
                    >
                      {kw.word}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 text-sm">
                      {kw.meaning[locale] || kw.meaning.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between p-6 bg-gray-50 border-t">
            <button
              onClick={goPrevious}
              disabled={selectedIndex <= 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                selectedIndex > 0
                  ? "text-green-800 hover:bg-green-100"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={18} />
              {t.previous}
            </button>
            <span className="text-sm text-gray-400">
              {selectedIndex + 1} / {LETTER_STORIES.length}
            </span>
            <button
              onClick={goNext}
              disabled={selectedIndex >= LETTER_STORIES.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                selectedIndex < LETTER_STORIES.length - 1
                  ? "text-green-800 hover:bg-green-100"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              {t.next}
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view of all stories
  return (
    <div className="max-w-4xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <BookOpen size={16} />
          {LETTER_STORIES.length} stories
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
        <p className="text-gray-500">{t.subtitle}</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {LETTER_STORIES.map((story, index) => (
          <button
            key={story.letterId}
            onClick={() => openStory(story, index)}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            {/* Gradient header */}
            <div
              className={`bg-gradient-to-br ${
                CARD_GRADIENTS[index % CARD_GRADIENTS.length]
              } p-4 text-center`}
            >
              <div className="text-3xl mb-1">{story.illustration}</div>
              <div className="text-4xl font-[family-name:var(--font-arabic)] text-white drop-shadow-lg">
                {story.letter}
              </div>
            </div>

            {/* Card body */}
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-700 leading-tight line-clamp-2">
                {story.title[locale] || story.title.en}
              </h3>
              <p className="text-xs text-green-600 mt-1.5 font-medium group-hover:text-green-500 transition-colors">
                {t.readStory} →
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
