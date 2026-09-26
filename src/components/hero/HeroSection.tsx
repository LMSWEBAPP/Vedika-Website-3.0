'use client';

import React from 'react';
import { HeroScene } from './HeroScene';
import { HeroContent } from './HeroContent';
import { useModelTuner } from '@/hooks/useModelTuner';

export function HeroSection() {
  const { setIsOpen } = useModelTuner();

  const handleExploreClick = () => {
    // Opens the tuner or invites the user to interact with Vedika
    setIsOpen(true);
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Fullscreen 3D Scene Layer (Vedika Model, Lighting, & 3D Atmosphere) */}
      <HeroScene />

      {/* Hero Content Container (Positioned on the Right Column on Desktop) */}
      <div
        className="hero-grid-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 4.5rem)',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1.25fr 1fr',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Left Column: Negative space occupied physically by Vedika */}
        <div aria-hidden="true" className="hero-left-spacer" />

        {/* Right Column: Editorial Introduction */}
        <div
          className="hero-right-content"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <HeroContent onExploreClick={handleExploreClick} />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.hero-grid-container) {
            grid-template-columns: 1fr !important;
            padding-top: 5rem;
          }
          :global(.hero-left-spacer) {
            display: none !important;
          }
          :global(.hero-right-content) {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 1rem 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
