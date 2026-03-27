"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const translations: Record<string, Record<string, string>> = {
  en: {
    trace: "Trace the letter",
    clear: "Clear",
    check: "Check",
    tryAgain: "Try Again",
    next: "Next",
    excellent: "Excellent!",
    good: "Good job!",
    keepPracticing: "Keep practicing!",
    score: "Score",
  },
  tr: {
    trace: "Harfi \u00e7izin",
    clear: "Temizle",
    check: "Kontrol Et",
    tryAgain: "Tekrar Dene",
    next: "Sonraki",
    excellent: "M\u00fckemmel!",
    good: "\u0130yi i\u015f!",
    keepPracticing: "Pratik yapmaya devam!",
    score: "Puan",
  },
  fr: {
    trace: "Tracez la lettre",
    clear: "Effacer",
    check: "V\u00e9rifier",
    tryAgain: "R\u00e9essayer",
    next: "Suivant",
    excellent: "Excellent!",
    good: "Bien!",
    keepPracticing: "Continuez!",
    score: "Score",
  },
  ur: {
    trace: "\u062d\u0631\u0641 \u0644\u06a9\u06be\u06cc\u06ba",
    clear: "\u0635\u0627\u0641 \u06a9\u0631\u06cc\u06ba",
    check: "\u0686\u06cc\u06a9 \u06a9\u0631\u06cc\u06ba",
    tryAgain: "\u062f\u0648\u0628\u0627\u0631\u06c1 \u06a9\u0648\u0634\u0634",
    next: "\u0627\u06af\u0644\u0627",
    excellent: "\u0634\u0627\u0646\u062f\u0627\u0631!",
    good: "\u0627\u0686\u06be\u0627!",
    keepPracticing: "\u0645\u0634\u0642 \u062c\u0627\u0631\u06cc \u0631\u06a9\u06be\u06cc\u06ba!",
    score: "\u0633\u06a9\u0648\u0631",
  },
  id: {
    trace: "Telusuri huruf",
    clear: "Hapus",
    check: "Periksa",
    tryAgain: "Coba Lagi",
    next: "Selanjutnya",
    excellent: "Luar biasa!",
    good: "Bagus!",
    keepPracticing: "Terus berlatih!",
    score: "Skor",
  },
};

interface LetterTracingProps {
  letter: string;
  letterName: string;
  onComplete?: (score: number) => void;
  locale: string;
}

export function LetterTracing({
  letter,
  letterName,
  onComplete,
  locale,
}: LetterTracingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const guideCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const [score, setScore] = useState<number | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [canvasSize, setCanvasSize] = useState(360);

  const t = translations[locale] ?? translations.en;
  const isRtl = locale === "ur";

  // Responsive canvas sizing
  useEffect(() => {
    function handleResize() {
      const width = Math.min(window.innerWidth - 48, 400);
      setCanvasSize(Math.max(width, 240));
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Draw the guide letter on the background canvas
  const drawGuide = useCallback(() => {
    const canvas = guideCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw guide letter centered
    ctx.fillStyle = "rgba(180, 180, 180, 0.35)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const fontSize = Math.floor(canvasSize * 0.7);
    ctx.font = `${fontSize}px var(--font-arabic), "Amiri", "Noto Sans Arabic", serif`;
    ctx.fillText(letter, canvas.width / 2, canvas.height / 2 + fontSize * 0.05);
  }, [letter, canvasSize]);

  // Redraw guide when letter or size changes
  useEffect(() => {
    drawGuide();
  }, [drawGuide]);

  // Clear the drawing canvas
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setScore(null);
    setHasDrawn(false);
    lastPoint.current = null;
  }, []);

  // Reset when letter changes
  useEffect(() => {
    clearCanvas();
  }, [letter, clearCanvas]);

  function getPoint(
    e: React.MouseEvent | React.TouchEvent
  ): { x: number; y: number } | null {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      if (!touch) return null;
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    isDrawing.current = true;
    lastPoint.current = getPoint(e);
    setHasDrawn(true);
    if (score !== null) setScore(null);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const point = getPoint(e);
    if (!point || !lastPoint.current) {
      lastPoint.current = point;
      return;
    }

    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    lastPoint.current = point;
  }

  function endDraw() {
    isDrawing.current = false;
    lastPoint.current = null;
  }

  function checkScore() {
    const guideCanvas = guideCanvasRef.current;
    const drawCanvas = canvasRef.current;
    if (!guideCanvas || !drawCanvas) return;

    const guideCtx = guideCanvas.getContext("2d");
    const drawCtx = drawCanvas.getContext("2d");
    if (!guideCtx || !drawCtx) return;

    const size = canvasSize;
    const guideData = guideCtx.getImageData(0, 0, size, size).data;
    const drawData = drawCtx.getImageData(0, 0, size, size).data;

    let guidePixels = 0;
    let coveredPixels = 0;
    let drawnOutside = 0;
    let totalDrawn = 0;

    for (let i = 3; i < guideData.length; i += 4) {
      const guideAlpha = guideData[i];
      const drawAlpha = drawData[i];
      const isGuide = guideAlpha > 20;
      const isDrawn = drawAlpha > 20;

      if (isGuide) guidePixels++;
      if (isDrawn) totalDrawn++;
      if (isGuide && isDrawn) coveredPixels++;
      if (!isGuide && isDrawn) drawnOutside++;
    }

    if (guidePixels === 0) {
      setScore(0);
      return;
    }

    // Coverage: how much of the guide was traced
    const coverage = coveredPixels / guidePixels;
    // Precision: penalize drawing far outside the letter
    const precision =
      totalDrawn > 0 ? coveredPixels / totalDrawn : 0;
    // Weighted score: coverage matters more, but precision prevents random scribbles
    const raw = coverage * 0.65 + precision * 0.35;
    const finalScore = Math.min(100, Math.round(raw * 100));

    setScore(finalScore);
    onComplete?.(finalScore);
  }

  function getMessage(): string {
    if (score === null) return "";
    if (score >= 80) return t.excellent;
    if (score >= 50) return t.good;
    return t.keepPracticing;
  }

  function getScoreColor(): string {
    if (score === null) return "";
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-500";
  }

  return (
    <div
      className="flex flex-col items-center gap-4 w-full max-w-md mx-auto"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold text-gray-700">{t.trace}</h2>
        <div className="flex items-center justify-center gap-3">
          <span className="text-5xl font-[family-name:var(--font-arabic)] text-green-800 leading-none">
            {letter}
          </span>
          <span className="text-xl text-gray-600">{letterName}</span>
        </div>
      </div>

      {/* Canvas area */}
      <div
        className="relative rounded-2xl border-2 border-dashed border-green-300 bg-white shadow-inner overflow-hidden touch-none"
        style={{ width: canvasSize, height: canvasSize }}
      >
        {/* Guide canvas (background) */}
        <canvas
          ref={guideCanvasRef}
          width={canvasSize}
          height={canvasSize}
          className="absolute inset-0"
        />
        {/* Drawing canvas (foreground) */}
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="absolute inset-0 cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>

      {/* Score display */}
      {score !== null && (
        <div className="text-center space-y-1 animate-in fade-in">
          <p className={`text-2xl font-bold ${getScoreColor()}`}>
            {getMessage()}
          </p>
          <p className="text-gray-500">
            {t.score}: <span className="font-semibold">{score}%</span>
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <button
          onClick={clearCanvas}
          className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium text-sm"
        >
          {score !== null ? t.tryAgain : t.clear}
        </button>

        {hasDrawn && score === null && (
          <button
            onClick={checkScore}
            className="px-5 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-colors font-medium text-sm shadow-sm"
          >
            {t.check}
          </button>
        )}

        {score !== null && (
          <button
            onClick={() => onComplete?.(score)}
            className="px-5 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-colors font-medium text-sm shadow-sm"
          >
            {t.next}
          </button>
        )}
      </div>
    </div>
  );
}
