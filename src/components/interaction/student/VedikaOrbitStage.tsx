'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import CentralVedika3D from '../CentralVedika3D';
import OrbitProgressRing from './OrbitProgressRing';
import OrbitFeatureNode from './OrbitFeatureNode';
import { STUDENT_ORBIT_FEATURES, StudentOrbitFeature } from './studentOrbitData';
import '@/styles/student-orbit.css';

export default function VedikaOrbitStage() {
  // Number of cards revealed so far (starts at 1 and increases to 9)
  const [revealedCount, setRevealedCount] = useState<number>(1);
  // Currently highlighted active card index (1 to 9)
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeFeature = STUDENT_ORBIT_FEATURES[activeStep - 1] || STUDENT_ORBIT_FEATURES[0];

  // Advance sequence
  const advance = useCallback(() => {
    setRevealedCount((prevRevealed) => {
      if (prevRevealed < 9) {
        const next = prevRevealed + 1;
        setActiveStep(next);
        return next;
      } else {
        // All 9 revealed: smoothly cycle active card
        setActiveStep((prevActive) => (prevActive >= 9 ? 1 : prevActive + 1));
        return 9;
      }
    });
  }, []);

  // Sequential Storytelling Timer (smooth ~2.2s pacing)
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        advance();
      }
    }, 2200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [revealedCount, activeStep, isPaused, advance]);

  // Handle direct click on any card
  const handleCardClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
    // Ensure card is marked revealed if clicked
    if (stepIndex > revealedCount) {
      setRevealedCount(stepIndex);
    }
  };

  return (
    <div
      className="vedika-orbit-stage-clean"
      role="region"
      aria-label="Student Learning Ecosystem"
    >
      {/* ============================================================== */}
      {/* 1. CENTRAL VEDIKA BOT (CLEAN: ONLY BOT & PROGRESS RING)        */}
      {/* ============================================================== */}
      <div className="vedika-center-pod-clean">
        {/* Ambient Subtle Radial Aura behind bot */}
        <div
          className="vedika-ambient-aura"
          style={{
            background: `radial-gradient(circle, ${activeFeature.color}25 0%, rgba(56, 189, 248, 0.05) 55%, transparent 75%)`,
          }}
          aria-hidden="true"
        />

        {/* Circular SVG Progress Ring Encircling Bot */}
        <div className="vedika-ring-wrap">
          <OrbitProgressRing
            currentStep={activeStep}
            activeColor={activeFeature.color}
            activeRgb={activeFeature.rgb}
            size={265}
          />
        </div>

        {/* Central 3D Vedika Robot Canvas */}
        <div className="vedika-robot-canvas-box">
          <CentralVedika3D />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. 9 HORIZONTAL GLASSMORPHIC FEATURE CARDS                      */}
      {/* ============================================================== */}
      <div className="vedika-cards-constellation">
        {STUDENT_ORBIT_FEATURES.map((feat: StudentOrbitFeature) => {
          const isRevealed = feat.index <= revealedCount;
          const isActive = feat.index === activeStep;

          return (
            <OrbitFeatureNode
              key={feat.id}
              feature={feat}
              isActive={isActive}
              isRevealed={isRevealed}
              onClick={() => handleCardClick(feat.index)}
              onMouseEnter={() => {
                isHoveredRef.current = true;
                setActiveStep(feat.index);
              }}
              onMouseLeave={() => {
                isHoveredRef.current = false;
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
