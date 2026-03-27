import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { BookOpen, BarChart3, Headphones, Calendar, PenTool, Target, Repeat, BookText, Brain, FileCheck, Type, BookOpenCheck, PenLine, Sparkles, Languages } from "lucide-react";

// TODO: i18n - move these labels and descriptions to translation files
const FEATURES = [
  {
    href: "daily",
    emoji: "\uD83D\uDCC5",
    icon: Calendar,
    label: "Daily Challenge",
    description: "Test yourself with 5 new questions every day",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
  },
  {
    href: "tracing",
    emoji: "\u270D\uFE0F",
    icon: PenTool,
    label: "Letter Tracing",
    description: "Practice writing Arabic letters with your finger",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
  },
  {
    href: "makhraj",
    emoji: "\uD83C\uDFAF",
    icon: Target,
    label: "Makhraj Map",
    description: "Interactive map of letter articulation points",
    color: "from-red-500 to-pink-500",
    bg: "bg-red-50",
  },
  {
    href: "compare",
    emoji: "\uD83D\uDD04",
    icon: Repeat,
    label: "Similar Letters",
    description: "Learn to distinguish confusing letter pairs",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
  },
  {
    href: "listening",
    emoji: "\uD83C\uDFA7",
    icon: Headphones,
    label: "Listening Mode",
    description: "Train your ear to recognize Arabic sounds",
    color: "from-teal-500 to-emerald-500",
    bg: "bg-teal-50",
  },
  {
    href: "stories",
    emoji: "\uD83D\uDCD6",
    icon: BookText,
    label: "Letter Stories",
    description: "Fun stories to remember each letter",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
  },
  {
    href: "review",
    emoji: "\uD83E\uDDE0",
    icon: Brain,
    label: "Smart Review",
    description: "AI-powered spaced repetition for optimal learning",
    color: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-50",
  },
  {
    href: "exam",
    emoji: "\uD83D\uDCDD",
    icon: FileCheck,
    label: "Final Exam",
    description: "Comprehensive test with certificate of completion",
    color: "from-green-600 to-emerald-600",
    bg: "bg-green-50",
  },
  {
    href: "spelling",
    emoji: "🔤",
    icon: Type,
    label: "Syllable Building",
    description: "Learn to connect letters and build syllables",
    color: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-50",
  },
  {
    href: "reading",
    emoji: "📖",
    icon: BookOpenCheck,
    label: "Graded Reading",
    description: "Read Arabic texts from words to paragraphs",
    color: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50",
  },
  {
    href: "dictation",
    emoji: "✏️",
    icon: PenLine,
    label: "Dictation",
    description: "Listen and write - train your ear and hand",
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
  },
  {
    href: "tajweed",
    emoji: "🕌",
    icon: Sparkles,
    label: "Tajweed Rules",
    description: "Learn Quran recitation rules with examples",
    color: "from-yellow-500 to-amber-600",
    bg: "bg-yellow-50",
  },
  {
    href: "vocabulary",
    emoji: "📚",
    icon: Languages,
    label: "Quranic Vocabulary",
    description: "Master the most common words in the Quran",
    color: "from-rose-500 to-red-600",
    bg: "bg-rose-50",
  },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="font-[family-name:var(--font-arabic)] text-6xl text-green-900 mb-2">
          {tc("appNameAr")}
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("heroTitle")}</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {t("heroSubtitle")}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href={`/${locale}/units`}
            className="px-8 py-3 bg-green-800 text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-800/25"
          >
            {t("startLearning")}
          </Link>
          <Link
            href={`/${locale}/progress`}
            className="px-8 py-3 bg-white text-green-800 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-md border border-green-100"
          >
            {t("viewProgress")}
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: BookOpen, label: t("totalLetters"), color: "green" },
          { icon: BarChart3, label: t("totalUnits"), color: "orange" },
          { icon: Headphones, label: t("features"), color: "purple" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <item.icon className="mx-auto mb-3 text-green-700" size={36} />
            <div className="text-lg font-semibold text-gray-800">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Features - TODO: i18n */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Explore All Features
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Everything you need to master Arabic letters and pronunciation
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            <Link
              key={feature.href}
              href={`/${locale}/${feature.href}`}
              className={`group relative ${feature.bg} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-200`}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 shadow-sm group-hover:scale-110 transition-transform`}
              >
                <feature.icon size={22} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 text-lg">
                {feature.emoji} {feature.label}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Preview letters */}
      <div className="text-center">
        <div className="flex justify-center gap-4 flex-wrap font-[family-name:var(--font-arabic)] text-5xl text-green-800">
          {"أبتثجحخدذرزسشصضطظعغفقكلمنهوي".split("").map((l, i) => (
            <span
              key={i}
              className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center hover:shadow-md hover:scale-110 transition-all cursor-default"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
