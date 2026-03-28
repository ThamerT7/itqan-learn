import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { BookOpen, BarChart3, Headphones, Calendar, PenTool, Target, Repeat, BookText, Brain, FileCheck, Type, BookOpenCheck, PenLine, Sparkles, Languages } from "lucide-react";

const FEATURES = [
  {
    href: "daily",
    emoji: "\uD83D\uDCC5",
    icon: Calendar,
    label: "Daily Challenge",
    description: "Test yourself with 5 new questions every day",
    color: "#ffc800",
  },
  {
    href: "tracing",
    emoji: "\u270D\uFE0F",
    icon: PenTool,
    label: "Letter Tracing",
    description: "Practice writing Arabic letters with your finger",
    color: "#1cb0f6",
  },
  {
    href: "makhraj",
    emoji: "\uD83C\uDFAF",
    icon: Target,
    label: "Makhraj Map",
    description: "Interactive map of letter articulation points",
    color: "#ff4b4b",
  },
  {
    href: "compare",
    emoji: "\uD83D\uDD04",
    icon: Repeat,
    label: "Similar Letters",
    description: "Learn to distinguish confusing letter pairs",
    color: "#ce82ff",
  },
  {
    href: "listening",
    emoji: "\uD83C\uDFA7",
    icon: Headphones,
    label: "Listening Mode",
    description: "Train your ear to recognize Arabic sounds",
    color: "#58cc02",
  },
  {
    href: "stories",
    emoji: "\uD83D\uDCD6",
    icon: BookText,
    label: "Letter Stories",
    description: "Fun stories to remember each letter",
    color: "#ff86d0",
  },
  {
    href: "review",
    emoji: "\uD83E\uDDE0",
    icon: Brain,
    label: "Smart Review",
    description: "AI-powered spaced repetition for optimal learning",
    color: "#1cb0f6",
  },
  {
    href: "exam",
    emoji: "\uD83D\uDCDD",
    icon: FileCheck,
    label: "Final Exam",
    description: "Comprehensive test with certificate of completion",
    color: "#58cc02",
  },
  {
    href: "spelling",
    emoji: "🔤",
    icon: Type,
    label: "Syllable Building",
    description: "Learn to connect letters and build syllables",
    color: "#1cb0f6",
  },
  {
    href: "reading",
    emoji: "📖",
    icon: BookOpenCheck,
    label: "Graded Reading",
    description: "Read Arabic texts from words to paragraphs",
    color: "#58cc02",
  },
  {
    href: "dictation",
    emoji: "✏️",
    icon: PenLine,
    label: "Dictation",
    description: "Listen and write - train your ear and hand",
    color: "#1cb0f6",
  },
  {
    href: "tajweed",
    emoji: "🕌",
    icon: Sparkles,
    label: "Tajweed Rules",
    description: "Learn Quran recitation rules with examples",
    color: "#ffc800",
  },
  {
    href: "vocabulary",
    emoji: "📚",
    icon: Languages,
    label: "Quranic Vocabulary",
    description: "Master the most common words in the Quran",
    color: "#ff4b4b",
  },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-[family-name:var(--font-arabic)] text-7xl md:text-8xl text-[#58cc02] font-extrabold mb-4">
            {tc("appNameAr")}
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-[#4b4b4b] mb-4">
            {t("heroTitle")}
          </h2>
          <p className="text-lg text-[#777] mb-10 max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href={`/${locale}/units`}
              className="px-10 py-3 bg-[#58cc02] text-white rounded-2xl font-bold text-base uppercase tracking-wider hover:bg-[#4caf00] transition-colors shadow-[0_4px_0_#4caf00] hover:shadow-[0_4px_0_#3d9000] active:shadow-none active:translate-y-[4px]"
            >
              {t("startLearning")}
            </Link>
            <Link
              href={`/${locale}/progress`}
              className="px-10 py-3 border-2 border-[#e5e5e5] text-[#1cb0f6] rounded-2xl font-bold text-base uppercase tracking-wider hover:bg-[#f7f7f7] transition-colors"
            >
              {t("viewProgress")}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: BookOpen, label: t("totalLetters"), color: "#58cc02" },
              { icon: BarChart3, label: t("totalUnits"), color: "#ffc800" },
              { icon: Headphones, label: t("features"), color: "#1cb0f6" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center border-2 border-[#e5e5e5] hover:border-[#d0d0d0] transition-colors"
              >
                <item.icon className="mx-auto mb-3" size={36} style={{ color: item.color }} />
                <div className="text-lg font-bold text-[#4b4b4b]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#4b4b4b] text-center mb-2">
            Explore All Features
          </h2>
          <p className="text-[#afafaf] text-center mb-10 font-bold">
            Everything you need to master Arabic letters and pronunciation
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature) => (
              <Link
                key={feature.href}
                href={`/${locale}/${feature.href}`}
                className="group bg-white rounded-2xl p-6 border-2 border-[#e5e5e5] hover:border-[#d0d0d0] transition-all duration-200 hover:shadow-md"
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-white mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon size={22} />
                </div>
                <h3 className="font-bold text-[#4b4b4b] mb-1 text-lg">
                  {feature.label}
                </h3>
                <p className="text-sm text-[#777] leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Letters */}
      <section className="py-16 bg-[#f7f7f7]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-[#4b4b4b] mb-8">
            Arabic Alphabet
          </h2>
          <div className="flex justify-center gap-3 flex-wrap font-[family-name:var(--font-arabic)] text-4xl text-[#4b4b4b]">
            {"أبتثجحخدذرزسشصضطظعغفقكلمنهوي".split("").map((l, i) => (
              <span
                key={i}
                className="w-14 h-14 rounded-2xl bg-white border-2 border-[#e5e5e5] flex items-center justify-center hover:border-[#58cc02] hover:text-[#58cc02] hover:shadow-[0_2px_0_#58cc02] hover:scale-110 transition-all cursor-default font-bold"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#58cc02] mb-6">
            Start Learning Arabic Today
          </h2>
          <Link
            href={`/${locale}/units`}
            className="inline-block px-12 py-4 bg-[#58cc02] text-white rounded-2xl font-bold text-lg uppercase tracking-wider hover:bg-[#4caf00] transition-colors shadow-[0_4px_0_#4caf00] hover:shadow-[0_4px_0_#3d9000] active:shadow-none active:translate-y-[4px]"
          >
            GET STARTED
          </Link>
        </div>
      </section>
    </div>
  );
}
