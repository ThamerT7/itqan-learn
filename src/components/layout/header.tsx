"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { LANGUAGES } from "@/lib/constants";
import Link from "next/link";
import {
  BookOpen,
  BarChart3,
  Menu,
  X,
  ChevronDown,
  Calendar,
  PenTool,
  Target,
  Repeat,
  Headphones,
  BookText,
  Brain,
  FileCheck,
  Type,
  BookOpenCheck,
  PenLine,
  Sparkles,
  Languages,
} from "lucide-react";

const MORE_LINKS = [
  { href: "daily", label: "Daily Challenge", icon: Calendar, emoji: "\uD83D\uDCC5" },
  { href: "tracing", label: "Letter Tracing", icon: PenTool, emoji: "\u270D\uFE0F" },
  { href: "makhraj", label: "Makhraj Map", icon: Target, emoji: "\uD83C\uDFAF" },
  { href: "compare", label: "Similar Letters", icon: Repeat, emoji: "\uD83D\uDD04" },
  { href: "listening", label: "Listening Mode", icon: Headphones, emoji: "\uD83C\uDFA7" },
  { href: "stories", label: "Letter Stories", icon: BookText, emoji: "\uD83D\uDCD6" },
  { href: "review", label: "Smart Review", icon: Brain, emoji: "\uD83E\uDDE0" },
  { href: "exam", label: "Final Exam", icon: FileCheck, emoji: "\uD83D\uDCDD" },
  { href: "spelling", label: "Syllable Building", icon: Type, emoji: "🔤" },
  { href: "reading", label: "Graded Reading", icon: BookOpenCheck, emoji: "📖" },
  { href: "dictation", label: "Dictation", icon: PenLine, emoji: "✏️" },
  { href: "tajweed", label: "Tajweed Rules", icon: Sparkles, emoji: "🕌" },
  { href: "vocabulary", label: "Quranic Vocabulary", icon: Languages, emoji: "📚" },
];

export function Header() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDesktopDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass =
    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm hover:bg-white/10 transition-colors";

  return (
    <header className="bg-gradient-to-r from-green-900 via-green-800 to-orange-700 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold font-[family-name:var(--font-arabic)]">
                {t("appNameAr")}
              </h1>
              <p className="text-xs opacity-80">{t("subtitle")}</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href={`/${locale}/units`} className={navLinkClass}>
              <BookOpen size={16} />
              <span>{t("appName")}</span>
            </Link>
            <Link href={`/${locale}/daily`} className={navLinkClass}>
              <Calendar size={16} />
              <span>Daily</span>
            </Link>
            <Link href={`/${locale}/progress`} className={navLinkClass}>
              <BarChart3 size={16} />
              <span>Progress</span>
            </Link>

            {/* More dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDesktopDropdownOpen((prev) => !prev)}
                className={`${navLinkClass} ${desktopDropdownOpen ? "bg-white/10" : ""}`}
              >
                <span>More</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${desktopDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {desktopDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {MORE_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={`/${locale}/${item.href}`}
                      onClick={() => setDesktopDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-green-50 transition-colors text-sm"
                    >
                      <item.icon size={16} className="text-green-700" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Language switcher */}
          <div className="hidden md:flex gap-1.5 flex-wrap">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                  locale === lang.code
                    ? "bg-white/25 border-2 border-white font-bold"
                    : "bg-white/10 border-2 border-transparent hover:bg-white/15"
                }`}
              >
                {lang.flag} {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 border-t border-white/20 pt-4 space-y-1">
            <Link
              href={`/${locale}/units`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              <BookOpen size={16} />
              <span>{t("appName")}</span>
            </Link>
            <Link
              href={`/${locale}/daily`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              <Calendar size={16} />
              <span>Daily Challenge</span>
            </Link>
            <Link
              href={`/${locale}/progress`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              <BarChart3 size={16} />
              <span>Progress</span>
            </Link>

            <div className="border-t border-white/10 my-2" />

            {MORE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}/${item.href}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="border-t border-white/10 my-2" />

            {/* Language switcher in mobile menu */}
            <div className="flex gap-1.5 flex-wrap px-3 py-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    switchLocale(lang.code);
                    setMobileOpen(false);
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                    locale === lang.code
                      ? "bg-white/25 border-2 border-white font-bold"
                      : "bg-white/10 border-2 border-transparent hover:bg-white/15"
                  }`}
                >
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
