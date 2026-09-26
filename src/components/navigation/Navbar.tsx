'use client';

import React from 'react';
import { useInteraction } from '@/hooks/useInteraction';
import { useTheme } from '@/hooks/useTheme';

export function Navbar() {
  const { theme } = useTheme();
  const { scrollProgress } = useInteraction();

  // On Page 2 (0.5 <= scrollProgress <= 1.45), background is white, so text must be dark slate.
  // On Page 1 (< 0.5) and Page 3 (> 1.45), background is dark/black, so text is light.
  const isLight = scrollProgress >= 0.5 && scrollProgress <= 1.45;

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 40,
        pointerEvents: 'auto',
      }}
    >
      <nav
        aria-label="Main Navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '1.75rem clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        {/* Only VEDIKA in the place of logo */}
        <a
          href="/"
          aria-label="Vedika AI Tutor Home"
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: isLight ? '#0F172A' : theme.colors.textPrimary,
            textDecoration: 'none',
            transition: 'color 0.35s ease',
          }}
        >
          VEDIKA
        </a>
      </nav>
    </header>
  );
}
