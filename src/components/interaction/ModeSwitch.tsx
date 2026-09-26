'use client';

import React from 'react';
import { useInteraction, InteractionMode } from '@/hooks/useInteraction';
import { useTheme } from '@/hooks/useTheme';
import { Mic, Volume2, ArrowLeftRight } from 'lucide-react';

export function ModeSwitch() {
  const { activeMode, setActiveMode } = useInteraction();
  const { theme } = useTheme();

  const handleToggle = () => {
    setActiveMode(activeMode === 'STT' ? 'TTS' : 'STT');
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        perspective: '800px',
      }}
    >
      {/* 3D Flip Interactive Capsule */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: `1px solid ${theme.colors.border}`,
          borderRadius: '9999px',
          padding: '4px',
          backdropFilter: 'blur(16px)',
          boxShadow: `0 8px 24px rgba(0, 0, 0, 0.4), 0 0 16px ${theme.colors.glow}`,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* S -> T Option */}
        <button
          onClick={() => setActiveMode('STT')}
          aria-pressed={activeMode === 'STT'}
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 18px',
            borderRadius: '9999px',
            backgroundColor: activeMode === 'STT' ? 'rgba(39, 217, 232, 0.15)' : 'transparent',
            border: activeMode === 'STT' ? `1px solid ${theme.colors.accent}` : '1px solid transparent',
            color: activeMode === 'STT' ? theme.colors.textPrimary : theme.colors.textMuted,
            fontSize: '0.8125rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: activeMode === 'STT' ? 'translateZ(10px)' : 'none',
          }}
        >
          <Mic
            size={14}
            color={activeMode === 'STT' ? theme.colors.accent : theme.colors.textMuted}
          />
          <span>S &rarr; T</span>
        </button>

        {/* 3D Flip Quick Switch Button */}
        <button
          onClick={handleToggle}
          title="Switch Active Mode (S→T ↔ T→S)"
          aria-label="Toggle interaction mode"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${theme.colors.border}`,
            color: theme.colors.accent,
            cursor: 'pointer',
            transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: activeMode === 'TTS' ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <ArrowLeftRight size={12} />
        </button>

        {/* T -> S Option */}
        <button
          onClick={() => setActiveMode('TTS')}
          aria-pressed={activeMode === 'TTS'}
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 18px',
            borderRadius: '9999px',
            backgroundColor: activeMode === 'TTS' ? 'rgba(139, 92, 246, 0.18)' : 'transparent',
            border: activeMode === 'TTS' ? `1px solid #8B5CF6` : '1px solid transparent',
            color: activeMode === 'TTS' ? theme.colors.textPrimary : theme.colors.textMuted,
            fontSize: '0.8125rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: activeMode === 'TTS' ? 'translateZ(10px)' : 'none',
          }}
        >
          <Volume2
            size={14}
            color={activeMode === 'TTS' ? '#A78BFA' : theme.colors.textMuted}
          />
          <span>T &rarr; S</span>
        </button>
      </div>
    </div>
  );
}
