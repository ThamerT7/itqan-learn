"use client";

import { useRef, useCallback } from "react";

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new Audio(src);
    audioRef.current.play().catch(() => {
      // Audio not available - use Web Speech API fallback
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.lang = "ar-SA";
        // Extract letter from src path for fallback
        utterance.text = "ا"; // fallback
        window.speechSynthesis.speak(utterance);
      }
    });
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
}
