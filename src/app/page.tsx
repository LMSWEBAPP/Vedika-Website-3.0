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
import { ParticleSphereSection } from '@/components/interaction/ParticleSphereSection';
import { ProblemSolutionSection } from '@/components/interaction/ProblemSolutionSection';
// ModelTuner removed
import { useInteraction } from '@/hooks/useInteraction';

export default function HomePage() {
  const { scrollProgress, setScrollProgress } = useInteraction();
  const currentPageRef = useRef(0);
  const isLockedRef = useRef(false);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);

  // =========================================================================
  // =========================================================================
  // PAGE SCROLL ENGINE: Precision 1-Step-Per-Gesture Engine with Inertia Lock
  // =========================================================================
  useEffect(() => {
    let animId: number;
    let accumulatedDelta = 0;
    let deltaResetTimer: NodeJS.Timeout;
    let wheelSilenceTimer: NodeJS.Timeout;
    let transitionStartTime = 0;

    const pageCount = 5; // Pages 0 to 4 (5 pages total)

    // Navigate to a specific page safely
    const goToPage = (pageIdx: number) => {
      const pageHeight = window.innerHeight || 800;
      const targetPage = Math.min(pageCount - 1, Math.max(0, pageIdx));
      if (targetPage === currentPageRef.current && isLockedRef.current) return;

      currentPageRef.current = targetPage;
      targetProgressRef.current = targetPage;
      isLockedRef.current = true;
      transitionStartTime = Date.now();
      accumulatedDelta = 0;

      window.scrollTo({
        top: targetPage * pageHeight,
        behavior: 'smooth',
      });
    };

    // 1. Raw Scroll Tracker: calculates normalized progress (0 = P1 ... 5 = P6)
    const handleScroll = () => {
      const pageHeight = window.innerHeight || 800;
      const currentScroll = window.scrollY || window.pageYOffset || 0;
      const rawProgress = Math.min(pageCount - 1, Math.max(0, currentScroll / pageHeight));
      targetProgressRef.current = rawProgress;

      // Only update current page anchor when NOT in an active programmatic transition
      if (!isLockedRef.current) {
        currentPageRef.current = Math.round(rawProgress);
      }
    };

    // 2. Smooth 60fps Dampening Loop: glides scrollProgress like silk with momentum
    const animate = () => {
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;

      const next = THREE.MathUtils.lerp(current, target, 0.09);
      if (Math.abs(next - target) < 0.0005) {
        smoothProgressRef.current = target;
      } else {
        smoothProgressRef.current = next;
      }

      setScrollProgress(smoothProgressRef.current);
      animId = requestAnimationFrame(animate);
    };

    // 3. Wheel Controller: Strictly 1 page transition per deliberate gesture
    const handleWheel = (e: WheelEvent) => {
      // Prevent uncontrolled browser native scroll to guarantee exact 1-page stepping
      e.preventDefault();

      // If transition lock is active:
      if (isLockedRef.current) {
        // Any incoming trackpad inertia/momentum keeps the lock active
        clearTimeout(wheelSilenceTimer);
        wheelSilenceTimer = setTimeout(() => {
          // Only unlock when wheel has been completely silent for 180ms AND at least 750ms have elapsed
          if (Date.now() - transitionStartTime > 750) {
            isLockedRef.current = false;
            accumulatedDelta = 0;
          }
        }, 180);
        return;
      }

      accumulatedDelta += e.deltaY;
      clearTimeout(deltaResetTimer);
      deltaResetTimer = setTimeout(() => {
        accumulatedDelta = 0;
      }, 150);

      const threshold = 35; // Deliberate threshold for both trackpads and mouse wheels

      if (accumulatedDelta >= threshold) {
        goToPage(currentPageRef.current + 1);
      } else if (accumulatedDelta <= -threshold) {
        goToPage(currentPageRef.current - 1);
      }
    };

    // 4. Keyboard Arrow / Page Keys Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        goToPage(currentPageRef.current + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        goToPage(currentPageRef.current - 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    handleScroll();
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animId);
      clearTimeout(deltaResetTimer);
      clearTimeout(wheelSilenceTimer);
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
  // In reverse also, waves and UI stay ZERO until Vedika arrives at scrollProgress <= 2.08
  const p3Reveal = Math.max(0, Math.min(1, (scrollProgress - 1.65) / 0.30));
  const p3Ease = p3Reveal * p3Reveal * (3 - 2 * p3Reveal); // Smooth cubic ease
  const p3Exit = Math.max(0, Math.min(1, (scrollProgress - 2.05) / 0.10));
  const p3FadeOut = 1 - (p3Exit * p3Exit * (3 - 2 * p3Exit));

  const p3WaveOpacity = p3Ease * p3FadeOut;
  const p3UiOpacity = p3Ease * p3FadeOut;

  // Page 4: Celestial Particle Sphere Section UI
  const p4Reveal = Math.max(0, Math.min(1, (scrollProgress - 2.50) / 0.40));
  const p4Exit = Math.max(0, Math.min(1, (scrollProgress - 3.25) / 0.40));
  const p4Ease =
    p4Reveal *
    p4Reveal *
    (3 - 2 * p4Reveal) *
    (1 - p4Exit * p4Exit * (3 - 2 * p4Exit));
  const p4UiOpacity = p4Ease;

  // Page 5: From Challenges to Confident Teaching (Solid Black Canvas)
  const p5Reveal = Math.max(0, Math.min(1, (scrollProgress - 3.25) / 0.50));
  const p5Ease = p5Reveal * p5Reveal * (3 - 2 * p5Reveal);
  const p5UiOpacity = p5Ease;

  // Background transition: Page 1 transparent, Page 2 white, Page 3 black, Page 4 pure white, Page 5 pitch black
  let bgStyle = 'transparent';
  if (scrollProgress >= 1.4 && scrollProgress <= 2.15) {
    bgStyle = '#000000';
  } else if (scrollProgress > 2.15 && scrollProgress < 2.50) {
    const blackAlpha = Math.max(0, 1 - (scrollProgress - 2.15) / 0.35);
    bgStyle = `rgba(0, 0, 0, ${blackAlpha.toFixed(3)})`;
  } else if (scrollProgress >= 2.50 && scrollProgress <= 3.30) {
    bgStyle = '#FFFFFF';
  } else if (scrollProgress > 3.30 && scrollProgress < 3.70) {
    const blackAlpha = Math.min(1, Math.max(0, (scrollProgress - 3.30) / 0.40));
    bgStyle = blackAlpha > 0.5 ? '#000000' : '#FFFFFF';
  } else if (scrollProgress >= 3.70) {
    bgStyle = '#000000';
  } else {
    bgStyle = 'transparent';
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '500vh',
        backgroundColor: bgStyle,
        transition: 'background-color 0.3s ease',
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
          height: '500vh',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div style={{ height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
        <div style={{ height: '100vh', scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
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
            pointerEvents: scrollProgress >= 1.8 && scrollProgress <= 2.2 ? 'auto' : 'none',
          }}
        >
          <ExplorationSection />
        </div>

        {/* PAGE 4: Celestial Particle Sphere Section */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: p4UiOpacity,
            transform: `translate3d(0, ${(1 - p4Ease) * 28}px, 0)`,
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
            pointerEvents: scrollProgress >= 2.7 && scrollProgress <= 3.3 ? 'auto' : 'none',
          }}
        >
          <ParticleSphereSection />
        </div>

        {/* PAGE 5: From Challenges to Confident Teaching (Solid Black Canvas) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: p5UiOpacity,
            transform: `translate3d(0, ${(1 - p5Ease) * 28}px, 0)`,
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
            pointerEvents: scrollProgress >= 3.45 ? 'auto' : 'none',
          }}
        >
          <ProblemSolutionSection />
        </div>
      </div>

      {/* Interactive Tuner for Vedika Bot and Waves */}
      {/* ModelTuner removed */}

      <style jsx global>{`
        html {
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
