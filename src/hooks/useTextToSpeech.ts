'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export function useTextToSpeech(onSpeakingChange?: (speaking: boolean) => void) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [speechEnergy, setSpeechEnergy] = useState(0); // 0 to 1 for visualizer driving
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Animate simulated speech energy waveform during TTS speech
  useEffect(() => {
    if (!isSpeaking) {
      setSpeechEnergy(0);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    let start = performance.now();

    const loop = () => {
      const now = performance.now();
      const elapsed = (now - start) / 1000;
      // Multi-frequency wave mimicking speech cadence
      const wave =
        Math.abs(Math.sin(elapsed * 9)) * 0.4 +
        Math.abs(Math.sin(elapsed * 17)) * 0.35 +
        Math.abs(Math.cos(elapsed * 5)) * 0.25;

      setSpeechEnergy(Math.min(1, wave));
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isSpeaking]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || typeof window === 'undefined' || !text.trim()) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      // Select natural English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) =>
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Victoria')) &&
          v.lang.startsWith('en')
      );
      if (preferred) {
        utterance.voice = preferred;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        onSpeakingChange?.(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        onSpeakingChange?.(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        onSpeakingChange?.(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [isSupported, onSpeakingChange]
  );

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    onSpeakingChange?.(false);
  }, [onSpeakingChange]);

  return {
    isSupported,
    isSpeaking,
    speechEnergy,
    speak,
    stop,
  };
}
