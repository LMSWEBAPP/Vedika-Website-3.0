'use client';

import React from 'react';
import { useInteraction } from '@/hooks/useInteraction';
import { useTheme } from '@/hooks/useTheme';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { AudioVisualizer } from '@/components/audio/AudioVisualizer';
import { Volume2, VolumeX, Play, Square, MessageSquare } from 'lucide-react';

const QUICK_PROMPTS = [
  'Tell me about yourself, Vedika.',
  'How do neural networks learn?',
  'Explain relativity in simple terms.',
];

export function TextToSpeech() {
  const { activeMode, setInteractionState, ttsInput, setTtsInput } = useInteraction();
  const { theme } = useTheme();

  const handleSpeakingChange = (speaking: boolean) => {
    setInteractionState(speaking ? 'SPEAKING' : 'IDLE');
  };

  const { isSpeaking, speechEnergy, speak, stop } = useTextToSpeech(handleSpeakingChange);

  const isSelected = activeMode === 'TTS';

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(ttsInput);
    }
  };

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
        border: `1px solid ${isSelected ? '#8B5CF640' : theme.colors.border}`,
        backdropFilter: 'blur(20px)',
        boxShadow: isSelected
          ? '0 20px 48px rgba(0, 0, 0, 0.5), 0 0 32px rgba(139, 92, 246, 0.25)'
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
              color: '#A78BFA',
            }}
          >
            T &rarr; S
          </span>
          <span style={{ color: theme.colors.textMuted }}>&bull;</span>
          <span
            style={{
              fontSize: '0.8125rem',
              color: theme.colors.textSecondary,
              fontWeight: 500,
            }}
          >
            Text to Speech
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
            backgroundColor: isSpeaking ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.04)',
            border: `1px solid ${isSpeaking ? '#8B5CF6' : theme.colors.border}`,
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: isSpeaking ? '#C4B5FD' : theme.colors.textMuted,
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: isSpeaking ? '#A78BFA' : theme.colors.textMuted,
              animation: isSpeaking ? 'pulseSpeaker 1.2s infinite ease-in-out' : 'none',
            }}
          />
          <span>{isSpeaking ? 'Speaking' : 'Standby'}</span>
        </div>
      </div>

      {/* Voice Cadence Waveform Visualizer */}
      <div
        style={{
          padding: '0.75rem 0',
          marginBottom: '0.75rem',
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        <AudioVisualizer
          active={isSpeaking}
          simulatedEnergy={speechEnergy}
          mode="tts"
          height={75}
          barCount={28}
        />
      </div>

      {/* Text Area Input */}
      <div
        style={{
          position: 'relative',
          marginBottom: '0.75rem',
        }}
      >
        <textarea
          value={ttsInput}
          onChange={(e) => setTtsInput(e.target.value)}
          placeholder="Enter text for Vedika to vocalize..."
          rows={3}
          aria-label="Text to be spoken by Vedika"
          style={{
            width: '100%',
            minHeight: '75px',
            maxHeight: '100px',
            padding: '10px 12px',
            borderRadius: '12px',
            backgroundColor: 'rgba(5, 7, 10, 0.45)',
            border: `1px solid ${theme.colors.border}`,
            color: theme.colors.textPrimary,
            fontFamily: 'inherit',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            resize: 'none',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#8B5CF6';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = theme.colors.border;
          }}
        />
      </div>

      {/* Quick Prompt Pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '1rem',
        }}
      >
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => setTtsInput(prompt)}
            style={{
              padding: '4px 9px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${theme.colors.border}`,
              color: theme.colors.textMuted,
              fontSize: '0.6875rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = theme.colors.textPrimary;
              e.currentTarget.style.borderColor = '#8B5CF680';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = theme.colors.textMuted;
              e.currentTarget.style.borderColor = theme.colors.border;
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Controls Bar: Big Speak / Stop Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: 'auto',
        }}
      >
        <button
          onClick={handleSpeak}
          disabled={!ttsInput.trim()}
          aria-label={isSpeaking ? 'Stop vocalization' : 'Speak text aloud with Vedika'}
          style={{
            flex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '12px 20px',
            borderRadius: '12px',
            backgroundColor: isSpeaking ? 'rgba(239, 68, 68, 0.2)' : 'rgba(139, 92, 246, 0.16)',
            border: `1px solid ${isSpeaking ? '#EF4444' : '#8B5CF6'}`,
            color: isSpeaking ? '#FCA5A5' : theme.colors.textPrimary,
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: !ttsInput.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isSpeaking
              ? '0 0 20px rgba(239, 68, 68, 0.4)'
              : '0 0 16px rgba(139, 92, 246, 0.3)',
            opacity: !ttsInput.trim() ? 0.5 : 1,
          }}
        >
          {isSpeaking ? <Square size={15} /> : <Play size={15} fill="#A78BFA" color="#A78BFA" />}
          <span>{isSpeaking ? 'Stop Speaking' : 'Speak Message'}</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes pulseSpeaker {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.3);
          }
        }
      `}</style>
    </div>
  );
}
