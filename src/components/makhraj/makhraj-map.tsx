"use client";

import React, { useState, useCallback } from "react";
import { makhrajRegions, type MakhrajRegion } from "@/data/makhraj-regions";

interface MakhrajMapProps {
  locale: string;
  onLetterClick?: (letter: string) => void;
}

const uiText: Record<
  string,
  {
    title: string;
    subtitle: string;
    clickToExplore: string;
    letters: string;
    description: string;
  }
> = {
  en: {
    title: "Makhraj Map",
    subtitle: "Points of Articulation",
    clickToExplore: "Click a region to explore",
    letters: "Letters",
    description: "Description",
  },
  tr: {
    title: "Mahre\u00e7 Haritas\u0131",
    subtitle: "Artik\u00fclasyon Noktalar\u0131",
    clickToExplore: "Ke\u015ffetmek i\u00e7in bir b\u00f6lgeye t\u0131klay\u0131n",
    letters: "Harfler",
    description: "A\u00e7\u0131klama",
  },
  fr: {
    title: "Carte des Makhraj",
    subtitle: "Points d\u2019articulation",
    clickToExplore: "Cliquez sur une r\u00e9gion",
    letters: "Lettres",
    description: "Description",
  },
  ur: {
    title: "\u0645\u062e\u0627\u0631\u062c \u06a9\u0627 \u0646\u0642\u0634\u06c1",
    subtitle:
      "\u062a\u0644\u0641\u0638 \u06a9\u06d2 \u0645\u0642\u0627\u0645\u0627\u062a",
    clickToExplore:
      "\u062c\u0627\u0646\u0646\u06d2 \u06a9\u06d2 \u0644\u06cc\u06d2 \u06a9\u0633\u06cc \u062d\u0635\u06d2 \u067e\u0631 \u06a9\u0644\u06a9 \u06a9\u0631\u06cc\u06ba",
    letters: "\u062d\u0631\u0648\u0641",
    description: "\u062a\u0641\u0635\u06cc\u0644",
  },
  id: {
    title: "Peta Makhraj",
    subtitle: "Titik Artikulasi",
    clickToExplore: "Klik area untuk menjelajahi",
    letters: "Huruf",
    description: "Deskripsi",
  },
};

const isRtl = (locale: string) => locale === "ur" || locale === "ar";

export default function MakhrajMap({ locale, onLetterClick }: MakhrajMapProps) {
  const [activeRegion, setActiveRegion] = useState<MakhrajRegion | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const t = uiText[locale] || uiText.en;
  const rtl = isRtl(locale);

  const handleRegionClick = useCallback((region: MakhrajRegion) => {
    setActiveRegion((prev) => (prev?.id === region.id ? null : region));
  }, []);

  const handleLetterClick = useCallback(
    (letter: string) => {
      onLetterClick?.(letter);
    },
    [onLetterClick]
  );

  const getName = (region: MakhrajRegion) =>
    region.name[locale] || region.name.en;
  const getDescription = (region: MakhrajRegion) =>
    region.description[locale] || region.description.en;

  return (
    <div className={`w-full max-w-5xl mx-auto ${rtl ? "dir-rtl" : ""}`} dir={rtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {t.subtitle}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* SVG Diagram */}
        <div className="relative flex-shrink-0 w-full lg:w-auto">
          <svg
            viewBox="0 0 400 500"
            className="w-full max-w-[400px] mx-auto lg:mx-0 h-auto"
            role="img"
            aria-label={t.title}
          >
            <defs>
              {/* Gradient for head fill */}
              <linearGradient id="headGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>
              <linearGradient id="cavityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fecaca" />
                <stop offset="100%" stopColor="#fca5a5" />
              </linearGradient>
              {/* Drop shadow */}
              <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
              </filter>
              {/* Glow for active region */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background */}
            <rect width="400" height="500" fill="#f8fafc" rx="12" className="dark:fill-gray-900" />

            {/* ===== Anatomical Drawing ===== */}
            {/* Head outline - side profile */}
            <path
              d="M 200,40
                 Q 280,40 310,80
                 Q 340,120 335,160
                 Q 330,175 320,185
                 L 315,190
                 Q 325,195 330,205
                 Q 332,215 320,220
                 L 305,225
                 Q 315,230 315,240
                 Q 312,250 300,250
                 L 285,248
                 Q 275,260 260,268
                 Q 240,280 220,290
                 Q 200,300 180,310
                 Q 160,325 150,350
                 Q 140,380 135,420
                 Q 132,450 130,480
                 L 120,480
                 Q 115,420 120,370
                 Q 125,330 130,310
                 Q 135,285 130,260
                 Q 125,240 120,220
                 Q 115,200 115,175
                 Q 115,140 125,110
                 Q 140,65 200,40 Z"
              fill="url(#headGrad)"
              stroke="#d4a574"
              strokeWidth="2"
              filter="url(#shadow)"
              className="dark:fill-amber-900/30 dark:stroke-amber-700"
            />

            {/* Ear */}
            <path
              d="M 118,155 Q 105,160 102,175 Q 100,190 108,200 Q 112,195 115,185 Q 117,175 118,155 Z"
              fill="#f5d5b0"
              stroke="#d4a574"
              strokeWidth="1.5"
              className="dark:fill-amber-800/40 dark:stroke-amber-700"
            />

            {/* Hair line */}
            <path
              d="M 200,40 Q 160,42 140,55 Q 125,68 120,90 Q 118,105 118,120"
              fill="none"
              stroke="#8B7355"
              strokeWidth="2"
              className="dark:stroke-amber-600"
            />

            {/* Eye */}
            <ellipse cx="260" cy="110" rx="18" ry="8" fill="white" stroke="#8B7355" strokeWidth="1.5" className="dark:fill-gray-700 dark:stroke-amber-600" />
            <circle cx="262" cy="110" r="5" fill="#5D4E37" className="dark:fill-amber-400" />
            {/* Eyebrow */}
            <path d="M 242,96 Q 260,88 280,94" fill="none" stroke="#8B7355" strokeWidth="2" className="dark:stroke-amber-600" />

            {/* Nose bridge and external nose */}
            <path
              d="M 300,120 Q 310,135 318,155 Q 325,168 330,175 Q 335,182 335,188 Q 330,192 322,188 Q 318,185 315,190"
              fill="none"
              stroke="#c9956b"
              strokeWidth="2"
              className="dark:stroke-amber-600"
            />

            {/* Nasal passage interior */}
            <path
              d="M 200,110 Q 220,108 245,115 Q 265,120 280,130 Q 290,138 295,150 Q 280,148 260,145 Q 240,142 220,140 Q 205,138 200,135 Z"
              fill="#fecdd3"
              stroke="#e8a0a0"
              strokeWidth="1"
              opacity="0.5"
              className="dark:fill-rose-900/30 dark:stroke-rose-700"
            />

            {/* Hard palate */}
            <path
              d="M 200,140 Q 230,135 260,140 Q 275,148 280,155 Q 265,150 245,148 Q 225,146 200,148 Z"
              fill="#f0a0a0"
              stroke="#d48080"
              strokeWidth="1.5"
              className="dark:fill-rose-800/40 dark:stroke-rose-600"
            />

            {/* Soft palate / uvula */}
            <path
              d="M 195,148 Q 200,155 200,165 Q 198,175 192,180 Q 188,175 186,165 Q 186,155 195,148 Z"
              fill="#e88080"
              stroke="#d06060"
              strokeWidth="1"
              className="dark:fill-rose-700/50 dark:stroke-rose-500"
            />

            {/* Mouth cavity interior */}
            <path
              d="M 200,155 Q 230,148 260,155 Q 275,165 280,175 Q 275,190 265,200 Q 250,208 235,210 Q 215,212 200,208 Q 190,200 188,190 Q 186,175 200,155 Z"
              fill="url(#cavityGrad)"
              stroke="#e8a0a0"
              strokeWidth="1"
              opacity="0.4"
              className="dark:fill-rose-900/20 dark:stroke-rose-700"
            />

            {/* Upper teeth */}
            <path
              d="M 265,155 L 275,158 L 285,160 L 293,163 L 300,168 L 305,175"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M 265,155 L 275,158 L 285,160 L 293,163 L 300,168 L 305,175"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Lower teeth */}
            <path
              d="M 265,205 L 275,208 L 285,210 L 290,215 L 295,222"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M 265,205 L 275,208 L 285,210 L 290,215 L 295,222"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Lips */}
            <path
              d="M 305,175 Q 315,168 320,172 Q 325,178 325,185 Q 325,192 320,198 Q 315,202 305,205 Q 298,200 295,192 Q 293,182 305,175 Z"
              fill="#e88080"
              stroke="#c06060"
              strokeWidth="1.5"
              className="dark:fill-rose-700/60 dark:stroke-rose-500"
            />

            {/* Tongue */}
            <path
              d="M 190,240 Q 195,225 205,215 Q 220,205 240,200 Q 260,198 275,205 Q 282,210 278,218 Q 270,225 255,228 Q 235,232 215,235 Q 200,240 195,248 Q 190,255 185,260 Q 178,258 180,248 Z"
              fill="#e07070"
              stroke="#c05050"
              strokeWidth="1.5"
              className="dark:fill-red-800/50 dark:stroke-red-600"
            />

            {/* Throat / pharynx */}
            <path
              d="M 155,250 Q 160,240 170,238 Q 180,240 185,250 Q 188,265 185,285 Q 183,310 180,340 Q 178,360 175,380 Q 170,380 165,360 Q 160,340 158,310 Q 155,285 155,265 Z"
              fill="#f0b0b0"
              stroke="#d09090"
              strokeWidth="1"
              opacity="0.5"
              className="dark:fill-rose-900/30 dark:stroke-rose-700"
            />

            {/* Vocal cords indication */}
            <path
              d="M 160,340 Q 170,335 180,340"
              fill="none"
              stroke="#c06060"
              strokeWidth="1.5"
              className="dark:stroke-rose-500"
            />
            <path
              d="M 162,348 Q 170,343 178,348"
              fill="none"
              stroke="#c06060"
              strokeWidth="1.5"
              className="dark:stroke-rose-500"
            />

            {/* Lower jaw line */}
            <path
              d="M 190,260 Q 210,275 235,275 Q 260,270 275,260 Q 285,250 295,240 Q 300,235 300,250 Q 295,268 280,278 Q 260,290 240,295 Q 220,298 200,295 Q 185,290 178,280 Q 175,270 180,260 Z"
              fill="url(#headGrad)"
              stroke="#d4a574"
              strokeWidth="1.5"
              opacity="0.7"
              className="dark:fill-amber-900/20 dark:stroke-amber-700"
            />

            {/* ===== Makhraj Region Overlays ===== */}
            {makhrajRegions.map((region) => {
              const isActive = activeRegion?.id === region.id;
              const isHovered = hoveredRegion === region.id;

              return (
                <g key={region.id}>
                  <path
                    d={region.svgPath}
                    fill={region.color}
                    fillOpacity={isActive ? 0.7 : isHovered ? 0.55 : 0.35}
                    stroke={region.color}
                    strokeWidth={isActive ? 2.5 : isHovered ? 2 : 1}
                    filter={isActive ? "url(#glow)" : undefined}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => handleRegionClick(region)}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={getName(region)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleRegionClick(region);
                      }
                    }}
                  />
                  {/* Region label tooltip on hover */}
                  {isHovered && !isActive && (
                    <g className="pointer-events-none">
                      <rect
                        x={getRegionCenter(region.svgPath).x - 40}
                        y={getRegionCenter(region.svgPath).y - 28}
                        width="80"
                        height="22"
                        rx="4"
                        fill="rgba(0,0,0,0.8)"
                      />
                      <text
                        x={getRegionCenter(region.svgPath).x}
                        y={getRegionCenter(region.svgPath).y - 14}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        fontWeight="500"
                      >
                        {region.nameAr}
                      </text>
                    </g>
                  )}
                  {/* Dot marker for active */}
                  {isActive && (
                    <circle
                      cx={getRegionCenter(region.svgPath).x}
                      cy={getRegionCenter(region.svgPath).y}
                      r="4"
                      fill="white"
                      stroke={region.color}
                      strokeWidth="2"
                      className="pointer-events-none animate-pulse"
                    />
                  )}
                </g>
              );
            })}

            {/* Instructional text if nothing active */}
            {!activeRegion && (
              <text
                x="200"
                y="475"
                textAnchor="middle"
                fill="#9ca3af"
                fontSize="12"
                className="dark:fill-gray-500"
              >
                {t.clickToExplore}
              </text>
            )}
          </svg>
        </div>

        {/* Side Panel */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          {/* Detail Card */}
          <div
            className={`rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm overflow-hidden transition-all duration-300 ${
              activeRegion
                ? "opacity-100 translate-y-0"
                : "opacity-60 translate-y-1"
            }`}
          >
            {activeRegion ? (
              <div>
                {/* Header with color bar */}
                <div
                  className="px-5 py-4"
                  style={{ backgroundColor: activeRegion.color + "18" }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: activeRegion.color }}
                    />
                    <div>
                      <h3
                        className="text-lg font-bold text-gray-900 dark:text-gray-100"
                        style={{ fontFamily: "'Amiri', 'Noto Naskh Arabic', serif" }}
                      >
                        {activeRegion.nameAr}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getName(activeRegion)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Letters */}
                <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                    {t.letters}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeRegion.letters.map((letter) => (
                      <button
                        key={letter}
                        onClick={() => handleLetterClick(letter)}
                        className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold text-white hover:scale-110 active:scale-95 transition-transform duration-150 shadow-md hover:shadow-lg"
                        style={{
                          backgroundColor: activeRegion.color,
                          fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
                        }}
                        aria-label={`Letter ${letter}`}
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    {t.description}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {getDescription(activeRegion)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="px-5 py-10 text-center">
                <div className="text-4xl mb-3 opacity-30">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {t.clickToExplore}
                </p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm px-4 py-3">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {makhrajRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => handleRegionClick(region)}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    activeRegion?.id === region.id
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: region.color }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
                    {region.nameAr}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Compute a rough center point from an SVG path string
 * by averaging all numeric coordinate pairs found in it.
 */
function getRegionCenter(svgPath: string): { x: number; y: number } {
  const nums: number[] = [];
  const regex = /[-+]?\d+(?:\.\d+)?/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(svgPath)) !== null) {
    nums.push(parseFloat(match[0]));
  }
  let sumX = 0;
  let sumY = 0;
  let count = 0;
  for (let i = 0; i < nums.length - 1; i += 2) {
    sumX += nums[i];
    sumY += nums[i + 1];
    count++;
  }
  return count > 0
    ? { x: Math.round(sumX / count), y: Math.round(sumY / count) }
    : { x: 200, y: 250 };
}
