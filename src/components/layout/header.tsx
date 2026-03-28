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
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDesktopDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass =
    "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-[#4b4b4b] hover:bg-[#f0f0f0] transition-colors";

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      } border-b-2 border-[#e5e5e5]`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-[#58cc02] text-2xl font-extrabold font-[family-name:var(--font-arabic)]">
              {t("appNameAr")}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href={`/${locale}/units`} className={navLinkClass}>
              <BookOpen size={16} className="text-[#58cc02]" />
              <span>{t("appName")}</span>
            </Link>
            <Link href={`/${locale}/daily`} className={navLinkClass}>
              <Calendar size={16} className="text-[#ffc800]" />
              <span>Daily</span>
            </Link>
            <Link href={`/${locale}/progress`} className={navLinkClass}>
              <BarChart3 size={16} className="text-[#1cb0f6]" />
              <span>Progress</span>
            </Link>

            {/* More dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDesktopDropdownOpen((prev) => !prev)}
                className={`${navLinkClass} ${desktopDropdownOpen ? "bg-[#f0f0f0]" : ""}`}
              >
                <span>More</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${desktopDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {desktopDropdownOpen && (
                <div className="absolute end-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-xl border-2 border-[#e5e5e5] py-2 z-50">
                  {MORE_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={`/${locale}/${item.href}`}
                      onClick={() => setDesktopDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#f7f7f7] transition-colors text-sm font-bold text-[#4b4b4b]"
                    >
                      <item.icon size={18} className="text-[#58cc02]" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="hidden md:flex gap-1.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLocale(lang.code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    locale === lang.code
                      ? "bg-[#ddf4ff] text-[#1cb0f6] border-2 border-[#84d8ff]"
                      : "text-[#afafaf] border-2 border-transparent hover:bg-[#f7f7f7]"
                  }`}
                >
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-[#f0f0f0] transition-colors text-[#4b4b4b]"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t-2 border-[#e5e5e5] py-4 space-y-1">
            <Link
              href={`/${locale}/units`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f7f7f7] transition-colors text-sm font-bold text-[#4b4b4b]"
            >
              <BookOpen size={18} className="text-[#58cc02]" />
              <span>{t("appName")}</span>
            </Link>
            <Link
              href={`/${locale}/daily`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f7f7f7] transition-colors text-sm font-bold text-[#4b4b4b]"
            >
              <Calendar size={18} className="text-[#ffc800]" />
              <span>Daily Challenge</span>
            </Link>
            <Link
              href={`/${locale}/progress`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f7f7f7] transition-colors text-sm font-bold text-[#4b4b4b]"
            >
              <BarChart3 size={18} className="text-[#1cb0f6]" />
              <span>Progress</span>
            </Link>

            <div className="border-t-2 border-[#e5e5e5] my-3" />

            {MORE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}/${item.href}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f7f7f7] transition-colors text-sm font-bold text-[#4b4b4b]"
              >
                <item.icon size={18} className="text-[#58cc02]" />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="border-t-2 border-[#e5e5e5] my-3" />

            <div className="flex gap-2 flex-wrap px-4 py-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    switchLocale(lang.code);
                    setMobileOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    locale === lang.code
                      ? "bg-[#ddf4ff] text-[#1cb0f6] border-2 border-[#84d8ff]"
                      : "text-[#afafaf] border-2 border-[#e5e5e5] hover:bg-[#f7f7f7]"
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
