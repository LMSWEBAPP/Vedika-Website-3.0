'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import CentralVedika3D from '../CentralVedika3D';
import OrbitProgressRing from './OrbitProgressRing';
import OrbitConnectorLines from './OrbitConnectorLines';
import OrbitFeatureNode from './OrbitFeatureNode';
import OrbitControlsBar from './OrbitControlsBar';
import { STUDENT_ORBIT_FEATURES, StudentOrbitFeature } from './studentOrbitData';
import '@/styles/student-orbit.css';

export default function VedikaOrbitStage() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef<boolean>(false);

  const activeFeature = STUDENT_ORBIT_FEATURES[activeStep - 1] || STUDENT_ORBIT_FEATURES[0];

  // Advance to next feature in sequential story flow
  const advanceStep = useCallback(() => {
    setActiveStep((prev) => {
      if (prev >= 8) {
        // Complete circle pause, then restart loop
        return 1;
      }
      return prev + 1;
    });
  }, []);

  // Step back
  const prevStep = useCallback(() => {
    setActiveStep((prev) => (prev <= 1 ? 8 : prev - 1));
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Jump to specific step
  const handleSelectStep = useCallback((step: number) => {
    setActiveStep(step);
    // Pause auto-advance when user deliberately clicks so they can comfortably read
    setIsPlaying(false);
  }, []);

  // Reset to step 1 and play
  const handleReset = useCallback(() => {
    setActiveStep(1);
    setIsPlaying(true);
  }, []);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setIsPlaying(false);
      }
    }
  }, []);

  // Automatic Storytelling Timer Engine
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // Step 8 has a slightly longer 4.2s celebration pause, steps 1-7 have ~3.2s
    const readingPauseMs = activeStep === 8 ? 4200 : 3200;

    timerRef.current = setTimeout(() => {
      // Don't auto-advance if user is actively hovering over a feature node
      if (!isHoveredRef.current) {
        advanceStep();
      }
    }, readingPauseMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeStep, isPlaying, advanceStep]);

  // Keyboard navigation for full accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        advanceStep();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevStep();
      } else if (e.key === ' ' && e.target === e.currentTarget) {
        e.preventDefault();
        togglePlay();
      }
    },
    [advanceStep, prevStep, togglePlay]
  );

  return (
    <div
      className="vedika-orbit-system-stage"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Vedika 360-degree Circular AI Orbit Learning Ecosystem"
    >
      {/* 1. SVG Dynamic Circuit & Connector Lines */}
      <OrbitConnectorLines activeStep={activeStep} hoveredStep={hoveredStep} />

      {/* 2. Central Vedika Circular Pod System */}
      <div className="orbit-central-pod">
        {/* Dynamic SVG Circular Neon Progress Ring */}
        <div className="orbit-progress-ring-container">
          <OrbitProgressRing
            currentStep={activeStep}
            activeColor={activeFeature.color}
            activeRgb={activeFeature.rgb}
            size={280}
          />
        </div>

        {/* Outer Concentric Dashed Ring */}
        <div className="concentric-ring outer-ring" aria-hidden="true" />

        {/* Inner Solid Concentric Ring with Radial Vignette */}
        <div
          className="concentric-ring inner-ring"
          style={{
            borderColor: `${activeFeature.color}45`,
            boxShadow: `0 0 25px ${activeFeature.color}25, inset 0 0 18px ${activeFeature.color}15`,
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          }}
          aria-hidden="true"
        />

        {/* Holographic Glowing Elliptical Platform under Vedika */}
        <div
          className="orbital-hologram-base"
          style={{
            borderColor: `${activeFeature.color}66`,
            background: `radial-gradient(ellipse, ${activeFeature.color}66 0%, ${activeFeature.color}18 50%, transparent 75%)`,
            boxShadow: `0 0 22px ${activeFeature.color}50`,
            transition: 'all 0.4s ease',
          }}
          aria-hidden="true"
        />

        {/* 3D Vedika WebGL Canvas (Dead Centered Inside Ring) */}
        <div className="orbital-center-canvas">
          <CentralVedika3D />
        </div>

        {/* Central Brand Status Pill with Dynamic Capability Label */}
        <div className="orbital-brand-pill">
          <div className="orbital-brand-title">VEDIKA</div>
          <div className="orbital-brand-badge">AI STUDY COMPANION</div>
          <div
            className="orbital-brand-sub"
            style={{
              color: activeFeature.color,
              textShadow: `0 0 10px ${activeFeature.color}88`,
            }}
          >
            {activeStep === 8 ? '✨ 360° Complete Ecosystem' : `✨ ${activeFeature.shortLabel}`}
          </div>
        </div>
      </div>

      {/* 3. 8 Orbital Feature Nodes Arranged Clockwise on the Circle */}
      <div className="orbit-nodes-layer" role="tablist" aria-label="Student ecosystem nodes">
        {STUDENT_ORBIT_FEATURES.map((feat: StudentOrbitFeature) => {
          const isActive = feat.index === activeStep;
          const isRevealed = feat.index <= activeStep;
          const isHovered = feat.index === hoveredStep;

          return (
            <OrbitFeatureNode
              key={feat.id}
              feature={feat}
              isActive={isActive}
              isRevealed={isRevealed}
              isHovered={isHovered}
              onClick={() => handleSelectStep(feat.index)}
              onMouseEnter={() => {
                isHoveredRef.current = true;
                setHoveredStep(feat.index);
              }}
              onMouseLeave={() => {
                isHoveredRef.current = false;
                setHoveredStep(null);
              }}
            />
          );
        })}
      </div>

      {/* 4. Bottom Orbit Controls Bar */}
      <div className="orbit-controls-dock">
        <OrbitControlsBar
          currentStep={activeStep}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onSelectStep={handleSelectStep}
          onPrev={prevStep}
          onNext={advanceStep}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
