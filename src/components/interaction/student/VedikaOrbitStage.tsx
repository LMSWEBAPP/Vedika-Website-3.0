'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import CentralVedika3D from '../CentralVedika3D';
import OrbitProgressRing from './OrbitProgressRing';
import OrbitFeatureNode from './OrbitFeatureNode';
import { STUDENT_ORBIT_FEATURES, StudentOrbitFeature } from './studentOrbitData';
import '@/styles/student-orbit.css';

export default function VedikaOrbitStage() {
  const [revealedCount, setRevealedCount] = useState<number>(1);
  const [activeStep, setActiveStep] = useState<number>(1);
  const isHoveredRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeFeature = STUDENT_ORBIT_FEATURES[activeStep - 1] || STUDENT_ORBIT_FEATURES[0];

  // Advance sequence smoothly
  const advance = useCallback(() => {
    setRevealedCount((prevRevealed) => {
      if (prevRevealed < 9) {
        const next = prevRevealed + 1;
        setActiveStep(next);
        return next;
      } else {
        // Once all 9 are revealed, cycle active spotlight through the cards
        setActiveStep((prevActive) => (prevActive >= 9 ? 1 : prevActive + 1));
        return 9;
      }
    });
  }, []);

  // Sequential Timer (smooth ~2.3s pacing)
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        advance();
      }
    }, 2300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [revealedCount, activeStep, advance]);

  // Handle direct click on any card
  const handleCardClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
    if (stepIndex > revealedCount) {
      setRevealedCount(stepIndex);
    }
  };

  return (
    <div
      className="vedika-orbit-stage-clean"
      role="region"
      aria-label="Student Learning Ecosystem 360-Degree Circular Orbit"
    >
      {/* ============================================================== */}
      {/* 1. CENTER VEDIKA BOT (CLEAN: ONLY BOT & PROGRESS RING)        */}
      {/* ============================================================== */}
      <div className="vedika-center-pod-clean">
        {/* Soft Ambient Radial Aura */}
        <div
          className="vedika-ambient-aura"
          style={{
            background: `radial-gradient(circle, ${activeFeature.color}25 0%, rgba(56, 189, 248, 0.04) 55%, transparent 75%)`,
          }}
          aria-hidden="true"
        />

        {/* Circular SVG Progress Ring (Passing Underneath Icons on Orbit) */}
        <div className="vedika-ring-wrap">
          <OrbitProgressRing
            currentStep={activeStep}
            activeColor={activeFeature.color}
            activeRgb={activeFeature.rgb}
            radius={130}
          />
        </div>

        {/* Central 3D Vedika Robot Canvas */}
        <div className="vedika-robot-canvas-box">
          <CentralVedika3D />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. 9 ORBITAL NODES (ICONS ON CIRCLE, TEXT EXPANDING OUTWARD)  */}
      {/* ============================================================== */}
      <div className="vedika-orbit-nodes-layer">
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
