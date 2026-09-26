'use client';

import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

export type InteractionMode = 'STT' | 'TTS';
export type InteractionState = 'IDLE' | 'LISTENING' | 'PROCESSING' | 'SPEAKING' | 'ERROR';

interface InteractionContextType {
  activeMode: InteractionMode;
  setActiveMode: (mode: InteractionMode) => void;
  interactionState: InteractionState;
  setInteractionState: (state: InteractionState) => void;
  scrollProgress: number; // 0 = Page 1, 1 = Page 2
  setScrollProgress: (progress: number) => void;
  transcript: string;
  setTranscript: (text: string) => void;
  interimTranscript: string;
  setInterimTranscript: (text: string) => void;
  ttsInput: string;
  setTtsInput: (text: string) => void;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
}

const InteractionContext = createContext<InteractionContextType | undefined>(undefined);

export function InteractionProvider({ children }: { children: ReactNode }) {
  const [activeMode, setActiveMode] = useState<InteractionMode>('STT');
  const [interactionState, setInteractionState] = useState<InteractionState>('IDLE');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [ttsInput, setTtsInput] = useState(
    'Hello, I am Vedika. What would you like to explore together today?'
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <InteractionContext.Provider
      value={{
        activeMode,
        setActiveMode,
        interactionState,
        setInteractionState,
        scrollProgress,
        setScrollProgress,
        transcript,
        setTranscript,
        interimTranscript,
        setInterimTranscript,
        ttsInput,
        setTtsInput,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </InteractionContext.Provider>
  );
}

export function useInteraction() {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error('useInteraction must be used within an InteractionProvider');
  }
  return context;
}
