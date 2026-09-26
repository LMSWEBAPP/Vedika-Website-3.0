'use client';

import React, { useState } from 'react';
import { useInteraction } from '@/hooks/useInteraction';
import { useTheme } from '@/hooks/useTheme';
import { useAudioAnalyzer } from '@/hooks/useAudioAnalyzer';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { AudioVisualizer } from '@/components/audio/AudioVisualizer';
import { Mic, MicOff, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';

export function SpeechToText() {
  const { activeMode, setInteractionState, transcript, setTranscript, interimTranscript, setInterimTranscript } = useInteraction();
  const { theme } = useTheme();

  const { analyzerRef, isAnalyzing, error: audioError, startAnalyzing, stopAnalyzing } = useAudioAnalyzer();

  const handleResult = (finalText: string) => {
    setTranscript(finalText);
  };

  const {
    isSupported,
    isListening,
    error: speechError,
    startListening,
    stopListening,
    clearTranscript,
  } = useSpeechRecognition(handleResult);

  const isActive = isAnalyzing || isListening;
  const isSelected = activeMode === 'STT';

  const toggleRecording = async () => {
    if (isActive) {
      stopListening();
      stopAnalyzing();
      setInteractionState('IDLE');
    } else {
      setInteractionState('LISTENING');
      const granted = await startAnalyzing();
      if (granted) {
        startListening();
      } else {
        setInteractionState('ERROR');
      }
    }
  };

  const errorMessage = audioError || speechError;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: '420px',
        width: '100%',
        padding: '1.75rem',
        borderRadius: '24px',
        backgroundColor: isSelected ? 'rgba(8, 16, 23, 0.65)' : 'rgba(8, 16, 23, 0.35)',
        border: `1px solid ${isSelected ? theme.colors.accent + '40' : theme.colors.border}`,
        backdropFilter: 'blur(20px)',
        boxShadow: isSelected
          ? `0 20px 48px rgba(0, 0, 0, 0.5), 0 0 32px ${theme.colors.glow}`
          : '0 12px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isSelected ? 1 : 0.82,
        pointerEvents: 'auto',
      }}
    >
      {/* Header Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: theme.colors.accentBright || theme.colors.accent,
            }}
          >
            S &rarr; T
          </span>
          <span style={{ color: theme.colors.textMuted }}>&bull;</span>
          <span
            style={{
              fontSize: '0.8125rem',
              color: theme.colors.textSecondary,
              fontWeight: 500,
            }}
          >
            Speech to Text
          </span>
        </div>

        {/* Live Status Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: isActive ? 'rgba(39, 217, 232, 0.15)' : 'rgba(255, 255, 255, 0.04)',
            border: `1px solid ${isActive ? theme.colors.accent : theme.colors.border}`,
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: isActive ? theme.colors.accentBright || theme.colors.accent : theme.colors.textMuted,
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: isActive ? theme.colors.accent : theme.colors.textMuted,
              animation: isActive ? 'pulseDot 1.5s infinite ease-in-out' : 'none',
            }}
          />
          <span>{isActive ? 'Listening' : 'Ready'}</span>
        </div>
      </div>

      {/* Real-time Multi-Color Audio Visualizer */}
      <div
        style={{
          padding: '0.75rem 0',
          marginBottom: '0.75rem',
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        <AudioVisualizer
          analyzerRef={analyzerRef}
          active={isActive}
          mode="mic"
          height={75}
          barCount={28}
        />
      </div>

      {/* Live Transcription Box */}
      <div
        style={{
          flex: 1,
          minHeight: '110px',
          maxHeight: '140px',
          overflowY: 'auto',
          backgroundColor: 'rgba(5, 7, 10, 0.45)',
          borderRadius: '12px',
          padding: '12px 14px',
          border: `1px solid ${theme.colors.border}`,
          marginBottom: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {transcript || interimTranscript ? (
          <p
            style={{
              fontSize: '0.875rem',
              lineHeight: 1.55,
              color: theme.colors.textPrimary,
              margin: 0,
            }}
          >
            {transcript}
            {interimTranscript && (
              <span
                style={{
                  color: theme.colors.accentBright || theme.colors.accent,
                  fontStyle: 'italic',
                  opacity: 0.9,
                }}
              >
                {' ' + interimTranscript}
              </span>
            )}
          </p>
        ) : (
          <div
            style={{
              margin: 'auto 0',
              textAlign: 'center',
              color: theme.colors.textMuted,
              fontSize: '0.8125rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Sparkles size={14} color={theme.colors.accent} />
            <span>Click microphone to speak to Vedika</span>
          </div>
        )}
      </div>

      {/* Error Message if any */}
      {errorMessage && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            borderRadius: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#F87171',
            fontSize: '0.75rem',
            marginBottom: '0.75rem',
          }}
        >
          <AlertCircle size={14} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Controls Bar: Big Glowing Mic Button & Clear Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginTop: 'auto',
        }}
      >
        <button
          onClick={toggleRecording}
          aria-label={isActive ? 'Stop recording microphone' : 'Start microphone speech input'}
          style={{
            flex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '12px 20px',
            borderRadius: '12px',
            backgroundColor: isActive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(39, 217, 232, 0.12)',
            border: `1px solid ${isActive ? '#EF4444' : theme.colors.accent}`,
            color: isActive ? '#FCA5A5' : theme.colors.textPrimary,
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isActive ? '0 0 20px rgba(239, 68, 68, 0.4)' : `0 0 16px ${theme.colors.glow}`,
          }}
        >
          {isActive ? <MicOff size={16} /> : <Mic size={16} color={theme.colors.accent} />}
          <span>{isActive ? 'Stop Listening' : 'Start Speaking'}</span>
        </button>

        {transcript && (
          <button
            onClick={() => {
              clearTranscript();
              setTranscript('');
            }}
            title="Clear transcription"
            aria-label="Clear transcription text"
            style={{
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${theme.colors.border}`,
              color: theme.colors.textMuted,
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={14} />
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes pulseDot {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.3);
          }
        }
      `}</style>
    </div>
  );
}
