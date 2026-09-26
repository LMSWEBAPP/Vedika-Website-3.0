'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { ScrollState } from '@/hooks/useHeroScroll';
import { Sparkles, ArrowDown } from 'lucide-react';

interface HeroContentProps {
  scrollRef?: React.RefObject<ScrollState>;
  onExploreClick?: () => void;
}

export function HeroContent({ scrollRef, onExploreClick }: HeroContentProps) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        maxWidth: '510px',
        marginLeft: 'auto',
        paddingLeft: 'clamp(1rem, 2vw, 2rem)',
        paddingRight: 'clamp(1rem, 3vw, 3rem)',
        pointerEvents: 'auto',
      }}
    >
      {/* Editorial Label */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '1.75rem',
          letterSpacing: '0.22em',
          fontSize: '0.8125rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          color: theme.colors.accentBright || theme.colors.accent,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: theme.colors.accentBright || theme.colors.accent,
            boxShadow: `0 0 10px ${theme.colors.accent}`,
          }}
        />
        <span>AI TUTOR</span>
      </div>

      {/* Main Editorial Hero Heading */}
      <h1
        style={{
          fontSize: 'clamp(2.75rem, 5.2vw, 5.25rem)',
          fontWeight: 550,
          lineHeight: 1.04,
          letterSpacing: '-0.035em',
          color: theme.colors.textPrimary,
          marginBottom: '1.75rem',
          textWrap: 'balance',
        }}
      >
        Learning,
        <br />
        <span
          style={{
            color: theme.colors.textSecondary,
            fontWeight: 450,
          }}
        >
          but more human.
        </span>
      </h1>

      {/* Supporting Text */}
      <p
        style={{
          fontSize: 'clamp(1.0625rem, 1.25vw, 1.25rem)',
          lineHeight: 1.6,
          fontWeight: 400,
          color: theme.colors.textSecondary,
          marginBottom: '1.25rem',
          maxWidth: '460px',
        }}
      >
        Vedika brings intelligent guidance, personalized explanations, and a
        more natural learning experience into one place.
      </p>

      {/* Subtle Supporting Line */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.875rem',
          color: theme.colors.textMuted,
          marginBottom: '2.5rem',
          letterSpacing: '0.01em',
        }}
      >
        <Sparkles size={14} color={theme.colors.accentBright || theme.colors.accent} />
        <span>Built around the way you learn.</span>
      </div>

      {/* Action / Call to Explore */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button
          onClick={onExploreClick}
          aria-label="Explore Vedika interactive tutor"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 24px',
            borderRadius: '9999px',
            border: `1px solid ${theme.colors.border}`,
            color: theme.colors.textPrimary,
            fontSize: '0.9375rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = theme.colors.accent;
            e.currentTarget.style.boxShadow = `0 0 20px ${theme.colors.glow}`;
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = theme.colors.border;
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>Explore Vedika</span>
          <ArrowDown size={15} style={{ animation: 'bounceSubtle 2s infinite ease-in-out' }} />
        </button>

        <span
          style={{
            fontSize: '0.8125rem',
            color: theme.colors.textMuted,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Interactive Experience
        </span>
      </div>
    </div>
  );
}
