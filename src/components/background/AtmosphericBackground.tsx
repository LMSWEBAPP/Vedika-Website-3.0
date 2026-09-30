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

  // Pure White Stage: Page 2 (peaks at scrollProgress = 1.0) AND Page 4 (peaks at scrollProgress = 3.0)
  let whiteOpacity = 0;
  if (scrollProgress <= 1.0) {
    whiteOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.15) * 1.35));
  } else if (scrollProgress <= 2.15) {
    whiteOpacity = Math.max(0, 1 - (scrollProgress - 1.0) * 2.2);
  } else if (scrollProgress <= 3.30) {
    // Page 4: Smoothly reaches 100% pure white
    whiteOpacity = Math.min(1, Math.max(0, (scrollProgress - 2.15) / 0.45));
  } else {
    // Fade out white as user moves to Page 5 (pitch black)
    whiteOpacity = Math.max(0, 1 - (scrollProgress - 3.30) / 0.40);
  }

  // Pitch Black Stage: Page 3 (scrollProgress ~ 2.0) AND Page 5 (scrollProgress ~ 4.0)
  let blackOpacity = 0;
  if (scrollProgress <= 1.05) {
    blackOpacity = 0;
  } else if (scrollProgress <= 2.15) {
    blackOpacity = Math.min(1, Math.max(0, (scrollProgress - 1.05) * 2.5));
  } else if (scrollProgress <= 3.30) {
    // Fade out black as user moves to Page 4 (white)
    blackOpacity = Math.max(0, 1 - (scrollProgress - 2.15) / 0.45);
  } else {
    // Page 5: Smoothly reaches 100% complete solid pitch black
    blackOpacity = Math.min(1, Math.max(0, (scrollProgress - 3.30) / 0.40));
  }

  const isSolidBlack =
    (scrollProgress >= 1.4 && scrollProgress <= 2.2) || scrollProgress >= 3.7;

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
        backgroundColor: isSolidBlack ? '#000000' : theme.colors.backgroundDeepest,
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

      {/* Layer 7: Warm Luminous Ivory / Champagne Cream Stage for Page 2 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 28%, rgba(254, 243, 199, 0.48) 0%, rgba(253, 242, 248, 0.22) 42%, transparent 75%), radial-gradient(circle at 18% 52%, rgba(192, 132, 252, 0.16) 0%, transparent 48%), radial-gradient(circle at 82% 52%, rgba(245, 158, 11, 0.16) 0%, transparent 48%), #FAF8F5',
          opacity: whiteOpacity,
          zIndex: 8,
          pointerEvents: 'none',
          transition: 'opacity 0.25s ease-out',
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
