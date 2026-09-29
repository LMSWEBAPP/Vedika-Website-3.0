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
          marginBottom: '1.5rem',
          letterSpacing: '0.22em',
          fontSize: '0.78125rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          color: '#E5C378',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#E5C378',
            boxShadow: '0 0 10px rgba(229, 195, 120, 0.6)',
          }}
        />
        <span>Personalized Learning</span>
      </div>

      {/* Main Editorial Hero Heading */}
      <h1
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: '1.75rem',
          fontFamily: "var(--font-serif), 'Newsreader', 'Playfair Display', Georgia, serif",
        }}
      >
        <span
          style={{
            fontSize: 'clamp(2.75rem, 5.2vw, 5.25rem)',
            fontWeight: 600,
            lineHeight: 1.0,
            letterSpacing: '0.01em',
            color: '#FFFFFF',
            textShadow: '0 2px 24px rgba(255, 255, 255, 0.12)',
          }}
        >
          VEDIKA
        </span>
        <span
          style={{
            fontSize: 'clamp(1.75rem, 3.2vw, 3.125rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: '#E5C378',
            marginTop: '0.2rem',
            marginBottom: '0.15rem',
            textShadow: '0 2px 20px rgba(229, 195, 120, 0.18)',
          }}
        >
          your Personal
        </span>
        <span
          style={{
            fontSize: 'clamp(2.5rem, 4.6vw, 4.625rem)',
            fontWeight: 600,
            lineHeight: 1.02,
            letterSpacing: '0.02em',
            color: '#FDE19F',
            textShadow: '0 0 30px rgba(253, 225, 159, 0.28)',
          }}
        >
          AI TUTOR
        </span>
      </h1>

      {/* Supporting Text */}
      <p
        style={{
          fontSize: 'clamp(1.0625rem, 1.2vw, 1.2rem)',
          lineHeight: 1.65,
          fontWeight: 400,
          color: 'rgba(225, 235, 245, 0.78)',
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
        <Sparkles size={14} color="#E5C378" />
        <span>Built around the way you learn.</span>
      </div>

      {/* Action / Call to Explore */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={onExploreClick}
          aria-label="Explore Vedika interactive tutor"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '13px 26px',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #FDE19F 0%, #ECC97E 55%, #D4A853 100%)',
            color: '#081017',
            fontSize: '0.9375rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 4px 20px rgba(236, 201, 126, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 28px rgba(236, 201, 126, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(236, 201, 126, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
          }}
        >
          <span>Explore Vedika</span>
          <ArrowDown size={15} color="#081017" style={{ animation: 'bounceSubtle 2s infinite ease-in-out' }} />
        </button>

        <span
          style={{
            fontSize: '0.8125rem',
            color: 'rgba(236, 201, 126, 0.75)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Interactive Experience
        </span>
      </div>
    </div>
  );
}
