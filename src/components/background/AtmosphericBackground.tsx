'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useInteraction } from '@/hooks/useInteraction';
import { NoiseOverlay } from './NoiseOverlay';
import { Vignette } from './Vignette';
import { Particles } from './Particles';

export function AtmosphericBackground() {
  const { theme } = useTheme();
  const { scrollProgress } = useInteraction();

  // Page 2: Pure White Stage (Peaks at scrollProgress = 1.0, fades out smoothly toward Page 3)
  let whiteOpacity = 0;
  if (scrollProgress <= 1) {
    whiteOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.15) * 1.35));
  } else {
    whiteOpacity = Math.max(0, 1 - (scrollProgress - 1.0) * 2.2);
  }

  // Page 3: Complete Solid Pitch Black Stage (Reaches 1.0 by scrollProgress = 1.45)
  const blackOpacity = Math.min(1, Math.max(0, (scrollProgress - 1.05) * 2.5));

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: scrollProgress >= 1.4 ? '#000000' : theme.colors.backgroundDeepest,
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* Layer 1: Base & Theme Gradients for Page 1 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: theme.colors.gradient,
          opacity: 0.95,
          transition: 'background-image 0.7s ease, opacity 0.5s ease',
        }}
      />

      {/* Layer 2: Primary Radial Atmospheric Glow (Upper Right) */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.colors.glow} 0%, transparent 70%)`,
          filter: 'blur(70px)',
          opacity: 0.65,
          transform: 'translate3d(0, 0, 0)',
          transition: 'background 0.7s ease',
        }}
      />

      {/* Layer 3: Secondary Atmospheric Glow (Lower Left near Vedika base) */}
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${
            theme.colors.accentWarm ? theme.colors.accentWarm + '26' : theme.colors.glow
          } 0%, transparent 65%)`,
          filter: 'blur(80px)',
          opacity: 0.45,
          transform: 'translate3d(0, 0, 0)',
          transition: 'background 0.7s ease',
        }}
      />

      {/* Layer 4: Subtle Film Grain Noise */}
      <NoiseOverlay />

      {/* Layer 5: Viewport Vignette */}
      <Vignette />

      {/* Layer 6: Atmospheric Particles */}
      <Particles />

      {/* Layer 7: Pure Studio White Stage for Page 2 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#FFFFFF',
          opacity: whiteOpacity,
          zIndex: 8,
          pointerEvents: 'none',
          transition: 'opacity 0.2s ease-out',
        }}
      />

      {/* Layer 8: 100% Solid Pure Pitch Black Canvas for Page 3 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          opacity: blackOpacity,
          zIndex: 9,
          pointerEvents: 'none',
          transition: 'opacity 0.25s ease-out',
        }}
      />
    </div>
  );
}
