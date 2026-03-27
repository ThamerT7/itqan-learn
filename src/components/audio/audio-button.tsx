"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { useAudio } from "@/hooks/use-audio";

export function AudioButton({
  src,
  letter,
  size = "md",
}: {
  src: string;
  letter: string;
  size?: "sm" | "md" | "lg";
}) {
  const { play } = useAudio();
  const [playing, setPlaying] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const iconSize = { sm: 14, md: 18, lg: 24 };

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    setPlaying(true);

    // Try audio file first, fallback to speech synthesis
    const audio = new Audio(src);
    audio.play().catch(() => {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(letter);
        utterance.lang = "ar-SA";
        utterance.rate = 0.7;
        window.speechSynthesis.speak(utterance);
      }
    });

    setTimeout(() => setPlaying(false), 1000);
  }

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all ${
        playing
          ? "bg-orange-500 text-white scale-110"
          : "bg-white/20 text-white hover:bg-white/30"
      }`}
      title="Play pronunciation"
    >
      <Volume2 size={iconSize[size]} className={playing ? "animate-pulse" : ""} />
    </button>
  );
}
