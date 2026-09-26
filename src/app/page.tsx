'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroScene } from '@/components/hero/HeroScene';
import { HeroContent } from '@/components/hero/HeroContent';
import { InteractionSection } from '@/components/interaction/InteractionSection';
import { MultimodalWaveStream } from '@/components/interaction/MultimodalWaveStream';
import { TubesWaveStream } from '@/components/interaction/TubesWaveStream';
import { ExplorationSection } from '@/components/interaction/ExplorationSection';
// ModelTuner removed
import { useInteraction } from '@/hooks/useInteraction';

export default function HomePage() {
  const { scrollProgress, setScrollProgress } = useInteraction();
  const currentPageRef = useRef(0);
  const isLockedRef = useRef(false);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);

  // =========================================================================
  // PAGE SCROLL ENGINE: Clear Step Thresholds + Anti-Skip Lock + Smooth Damping
  // =========================================================================
  useEffect(() => {
    let animId: number;
    let accumulatedDelta = 0;
    let deltaResetTimer: NodeJS.Timeout;

    // 1. Raw Scroll Tracker: calculates target normalized progress (0 = P1, 1 = P2, 2 = P3)
    const handleScroll = () => {
      const pageHeight = window.innerHeight || 800;
      const currentScroll = window.scrollY || window.pageYOffset || 0;
      const rawProgress = Math.min(2, Math.max(0, currentScroll / pageHeight));
      targetProgressRef.current = rawProgress;

      // Update current page anchor based on closest scroll position
      currentPageRef.current = Math.round(rawProgress);
    };

    // 2. Smooth 60fps Dampening Loop: glides scrollProgress like silk with momentum
    const animate = () => {
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;

      // Smooth exponential lerp (0.09) gives cinematic weight and liquid transitions
      const next = THREE.MathUtils.lerp(current, target, 0.09);
      if (Math.abs(next - target) < 0.0005) {
        smoothProgressRef.current = target;
      } else {
        smoothProgressRef.current = next;
      }

      setScrollProgress(smoothProgressRef.current);
      animId = requestAnimationFrame(animate);
    };

    // 3. Wheel Threshold Controller: Prevents fast flick from skipping Page 2 straight to Page 3
    const handleWheel = (e: WheelEvent) => {
      accumulatedDelta += e.deltaY;
      clearTimeout(deltaResetTimer);
      deltaResetTimer = setTimeout(() => {
        accumulatedDelta = 0;
      }, 200);

      // If transition cooldown is active, prevent subsequent rapid wheel events from jumping
      if (isLockedRef.current) return;

      const threshold = 35; // Deliberate scroll threshold
      const pageHeight = window.innerHeight || 800;

      if (accumulatedDelta > threshold) {
        // Scrolling DOWN
        if (currentPageRef.current < 2) {
          const nextPage = currentPageRef.current + 1;
          currentPageRef.current = nextPage;
          isLockedRef.current = true;
          accumulatedDelta = 0;

          window.scrollTo({
            top: nextPage * pageHeight,
            behavior: 'smooth',
          });

          // 700ms cooldown ensures fast scrolling cannot jump more than one page per gesture
          setTimeout(() => {
            isLockedRef.current = false;
          }, 700);
        }
      } else if (accumulatedDelta < -threshold) {
        // Scrolling UP
        if (currentPageRef.current > 0) {
          const prevPage = currentPageRef.current - 1;
          currentPageRef.current = prevPage;
          isLockedRef.current = true;
          accumulatedDelta = 0;

          window.scrollTo({
            top: prevPage * pageHeight,
            behavior: 'smooth',
          });

          setTimeout(() => {
            isLockedRef.current = false;
          }, 700);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    handleScroll();
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animId);
      clearTimeout(deltaResetTimer);
    };
  }, [setScrollProgress]);

  const handleExploreClick = () => {
    currentPageRef.current = 1;
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  // =========================================================================
  // LAYER OPACITIES & TIMING
  // =========================================================================
  // Page 2: Peaks at scrollProgress = 1.0, cleanly clears out by 1.25
  const p2WaveOpacity =
    scrollProgress <= 1.0
      ? Math.max(0, (scrollProgress - 0.25) * 1.4)
      : Math.max(0, 1 - (scrollProgress - 1.0) * 4.0);

  const p2UiOpacity =
    scrollProgress <= 1.0
      ? Math.max(0, (scrollProgress - 0.3) * 1.5)
      : Math.max(0, 1 - (scrollProgress - 1.0) * 4.5);

  // Page 3: Strictly ZERO waves and ZERO text until Vedika finishes transit at scrollProgress >= 1.65
  const p3Reveal = Math.max(0, Math.min(1, (scrollProgress - 1.65) / 0.30));
  const p3Ease = p3Reveal * p3Reveal * (3 - 2 * p3Reveal); // Smooth cubic ease

  const p3WaveOpacity = p3Ease;
  const p3UiOpacity = p3Ease;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '300vh',
        backgroundColor: scrollProgress >= 1.4 ? '#000000' : 'transparent',
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* Scroll Snap Track for native browser physics protection */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '300vh',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div style={{ height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
        <div style={{ height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
        <div style={{ height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
      </div>

      {/* Persistent Minimal Navbar with adaptive color contrast */}
      <Navbar />

      {/* PAGE 2 WAVES LAYER: Fluid ribbons & particles flowing BEHIND Vedika */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 3,
          pointerEvents: 'none',
          opacity: p2WaveOpacity,
          transition: 'opacity 0.2s ease-out',
        }}
      >
        <MultimodalWaveStream />
      </div>

      {/* PAGE 3 WAVES LAYER: Distinct Multi-Amplitude Volumetric Ribbons */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 4,
          pointerEvents: 'none',
          opacity: p3WaveOpacity,
          transition: 'opacity 0.2s ease-out',
        }}
      >
        <TubesWaveStream />
      </div>

      {/* Persistent Single 3D WebGL Canvas Layer (Vedika & Lighting) */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      >
        <HeroScene />
      </div>

      {/* Fixed Viewport Container for UI Overlays */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 10,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* PAGE 1: Editorial Introduction */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: '1.25fr 1fr',
            alignItems: 'center',
            padding: '0 clamp(1.5rem, 5vw, 4.5rem)',
            maxWidth: '1440px',
            margin: '0 auto',
            opacity: Math.max(0, 1 - scrollProgress * 2.2),
            transform: `translate3d(0, ${-scrollProgress * 50}px, 0)`,
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            pointerEvents: scrollProgress < 0.4 ? 'auto' : 'none',
          }}
        >
          <div aria-hidden="true" className="page1-spacer" />
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <HeroContent onExploreClick={handleExploreClick} />
          </div>
        </div>

        {/* PAGE 2: Multimodal Interaction Interface (White Stage) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: p2UiOpacity,
            transform: `translate3d(0, ${(1 - scrollProgress) * 35}px, 0)`,
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            pointerEvents: scrollProgress >= 0.4 && scrollProgress <= 1.45 ? 'auto' : 'none',
          }}
        >
          <InteractionSection />
        </div>

        {/* PAGE 3: Ask Anything to Vedika (Revealed once Vedika finishes transit) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: p3UiOpacity,
            transform: `translate3d(0, ${(1 - p3Ease) * 28}px, 0)`,
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
            pointerEvents: scrollProgress >= 1.8 ? 'auto' : 'none',
          }}
        >
          <ExplorationSection />
        </div>
      </div>

      {/* Interactive Tuner for Vedika Bot and Waves */}
      {/* ModelTuner removed */}

      <style jsx global>{`
        html {
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }
        @media (max-width: 900px) {
          .page1-spacer {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
