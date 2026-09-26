'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { AudioAnalyzer } from '@/audio/AudioAnalyzer';

export function useAudioAnalyzer() {
  const analyzerRef = useRef<AudioAnalyzer | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzer = new AudioAnalyzer();
    analyzerRef.current = analyzer;

    return () => {
      analyzer.stop();
      analyzerRef.current = null;
    };
  }, []);

  const startAnalyzing = useCallback(async () => {
    if (!analyzerRef.current) return false;
    setError(null);

    try {
      await analyzerRef.current.start();
      setIsAnalyzing(true);
      return true;
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.name === 'NotAllowedError'
            ? 'Microphone access was denied. Please allow microphone permissions in your browser.'
            : err.message
          : 'Unable to access microphone audio.';
      setError(errorMsg);
      setIsAnalyzing(false);
      return false;
    }
  }, []);

  const stopAnalyzing = useCallback(() => {
    if (analyzerRef.current) {
      analyzerRef.current.stop();
    }
    setIsAnalyzing(false);
  }, []);

  return {
    analyzerRef,
    isAnalyzing,
    error,
    startAnalyzing,
    stopAnalyzing,
  };
}
