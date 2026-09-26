'use client';

import React from 'react';

/**
 * Subtle viewport vignette to focus eyes toward the center-left composition.
 */
export function Vignette() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 4,
        background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 45%, rgba(0, 0, 0, 0.45) 100%)',
      }}
    />
  );
}
