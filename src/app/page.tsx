'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroScene } from '@/components/hero/HeroScene';
import { HeroContent } from '@/components/hero/HeroContent';
import { InteractionSection } from '@/components/interaction/InteractionSection';
import { MultimodalWaveStream } from '@/components/interaction/MultimodalWaveStream';
import { ExplorationSection } from '@/components/interaction/ExplorationSection';
import { ParticleSphereSection } from '@/components/interaction/ParticleSphereSection';
import { ProblemSolutionSection } from '@/components/interaction/ProblemSolutionSection';
// ModelTuner removed
import { useInteraction, globalScrollRef } from '@/hooks/useInteraction';

export default function HomePage() {
  const { scrollProgress, setScrollProgress } = useInteraction();
  const currentPageRef = useRef(0);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);

  // =========================================================================
  // =========================================================================
  // PAGE SCROLL ENGINE: Single-Page Intentional Navigation Controller
  // =========================================================================
  useEffect(() => {
    let animId: number;
    let accumulatedDelta = 0;
    let deltaResetTimer: NodeJS.Timeout | null = null;
    let wheelSilenceTimer: NodeJS.Timeout | null = null;
    let isTransitioning = false;
    let transitionStartTime = 0;
    let lastWheelTime = 0;
    let lastReactProgress = 0;

    const pageCount = 5; // Pages 0 to 4 (5 pages total)

    // Navigate to a specific page safely — strictly 1 page at a time
    const goToPage = (pageIdx: number) => {
      const targetPage = Math.min(pageCount - 1, Math.max(0, pageIdx));
      if (targetPage === currentPageRef.current && targetProgressRef.current === targetPage) return;

      currentPageRef.current = targetPage;
      targetProgressRef.current = targetPage;
      isTransitioning = true;
      transitionStartTime = Date.now();
      lastWheelTime = Date.now();
      accumulatedDelta = 0;
    };

    // 1. Smooth Dampening Loop: glides scrollProgress swiftly and seamlessly
    const animate = () => {
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.0008) {
        smoothProgressRef.current = target;
        // Check if transition lock can be released:
        // Requires: animation reached target, minimum 650ms elapsed, AND wheel silent for > 200ms
        if (
          isTransitioning &&
          Date.now() - transitionStartTime > 650 &&
          Date.now() - lastWheelTime > 200
        ) {
          isTransitioning = false;
          accumulatedDelta = 0;
        }
      } else {
        // Natural silky ease: smooth 0.09 factor gives fluid, elegant transit with no jerk
        smoothProgressRef.current = current + diff * 0.09;
      }

      // High-frequency WebGL sync for 60/120fps model motion
      globalScrollRef.current = smoothProgressRef.current;

      // Throttle React DOM re-renders to only significant visual changes (>= 0.015 or settled)
      const diffFromLast = Math.abs(smoothProgressRef.current - lastReactProgress);
      if (diffFromLast >= 0.015 || Math.abs(diff) < 0.0008) {
        lastReactProgress = smoothProgressRef.current;
        setScrollProgress(smoothProgressRef.current);
      }

      animId = requestAnimationFrame(animate);
    };

    // 2. Wheel / Touchpad Controller: Strictly 1 page per deliberate gesture (absorbs inertia)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      lastWheelTime = now;

      // If a transition is in progress, ABSORB all decaying inertia events from the mousepad!
      if (isTransitioning) {
        if (wheelSilenceTimer) clearTimeout(wheelSilenceTimer);
        wheelSilenceTimer = setTimeout(() => {
          // Only unlock when trackpad momentum is 100% silent and minimum page duration elapsed
          if (
            Date.now() - transitionStartTime > 650 &&
            Math.abs(targetProgressRef.current - smoothProgressRef.current) < 0.01
          ) {
            isTransitioning = false;
            accumulatedDelta = 0;
          }
        }, 220);
        return;
      }

      accumulatedDelta += e.deltaY;

      if (deltaResetTimer) clearTimeout(deltaResetTimer);
      deltaResetTimer = setTimeout(() => {
        accumulatedDelta = 0;
      }, 140);

      // Deliberate intent threshold: 50px
      const threshold = 50;

      if (accumulatedDelta >= threshold) {
        accumulatedDelta = 0;
        goToPage(currentPageRef.current + 1);
      } else if (accumulatedDelta <= -threshold) {
        accumulatedDelta = 0;
        goToPage(currentPageRef.current - 1);
      }
    };

    // 3. Keyboard Arrow / Page Keys Navigation: strictly 1 page per keypress
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        if (isTransitioning) return;
        goToPage(currentPageRef.current + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        if (isTransitioning) return;
        goToPage(currentPageRef.current - 1);
      }
    };

    // 4. Touch Navigation for mobile / touchpads
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning || e.changedTouches.length === 0) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      const deltaTime = Date.now() - touchStartTime;

      if (Math.abs(deltaY) > 50 && deltaTime < 600) {
        if (deltaY > 0) {
          goToPage(currentPageRef.current + 1);
        } else {
          goToPage(currentPageRef.current - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animId);
      if (deltaResetTimer) clearTimeout(deltaResetTimer);
      if (wheelSilenceTimer) clearTimeout(wheelSilenceTimer);
    };
  }, [setScrollProgress]);

  const handleExploreClick = () => {
    currentPageRef.current = 1;
    targetProgressRef.current = 1;
  };

  // =========================================================================
  // LAYER OPACITIES & TIMING
  // =========================================================================
  // Page 2: Peaks when Vedika arrives in the middle at scrollProgress = 1.0
  const p2WaveOpacity =
    scrollProgress <= 1.0
      ? Math.max(0, (scrollProgress - 0.65) * 2.85)
      : Math.max(0, 1 - (scrollProgress - 1.05) * 4.0);

  const p2UiOpacity =
    scrollProgress <= 1.0
      ? Math.max(0, (scrollProgress - 0.55) * 2.25)
      : Math.max(0, 1 - (scrollProgress - 1.05) * 4.5);

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
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: bgStyle,
        transition: 'background-color 0.3s ease',
      }}
    >
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
            visibility: scrollProgress < 0.6 ? 'visible' : 'hidden',
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
            visibility: scrollProgress >= 0.3 && scrollProgress <= 1.5 ? 'visible' : 'hidden',
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
            pointerEvents: scrollProgress >= 1.65 && scrollProgress <= 2.25 ? 'auto' : 'none',
            visibility: scrollProgress >= 1.6 && scrollProgress <= 2.35 ? 'visible' : 'hidden',
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
            pointerEvents: scrollProgress >= 2.45 && scrollProgress <= 3.55 ? 'auto' : 'none',
            visibility: scrollProgress >= 2.45 && scrollProgress <= 3.55 ? 'visible' : 'hidden',
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
            visibility: scrollProgress >= 3.35 ? 'visible' : 'hidden',
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
