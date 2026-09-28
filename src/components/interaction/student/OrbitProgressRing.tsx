'use client';

import React from 'react';

interface OrbitProgressRingProps {
  currentStep: number;    // 1–9
  activeColor: string;    // hex color of active feature
  beadAngleDeg: number;   // where the energy bead sits on the ring
}

export default function OrbitProgressRing({
  currentStep,
  activeColor,
  beadAngleDeg,
}: OrbitProgressRingProps) {
  // Inner progress ring radius (wraps around the Vedika bot)
  const PROGRESS_R = 95;
  // Outer guide circle radius (decorative dashed, near where icons sit)
  const GUIDE_R = 130;

  const SIZE = (GUIDE_R + 20) * 2; // 300px SVG canvas
  const C = SIZE / 2;               // center = 150
  const SW = 3;
  const circ = 2 * Math.PI * PROGRESS_R;

  // Progress ratio: 1/9 → 9/9
  const ratio = Math.max(0.01, Math.min(1.0, currentStep / 9));
  const dashOffset = circ * (1 - ratio);

  // Bead position on progress ring
  const beadRad = (beadAngleDeg * Math.PI) / 180;
  const beadX = C + PROGRESS_R * Math.cos(beadRad);
  const beadY = C + PROGRESS_R * Math.sin(beadRad);

  return (
    <svg
      className="vedika-central-progress-svg"
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="vOrbitGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blr" />
          <feMerge>
            <feMergeNode in="blr" />
            <feMergeNode in="blr" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="vOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#38BDF8" stopOpacity="0.85" />
          <stop offset="60%"  stopColor={activeColor} stopOpacity="1" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Outer guide circle — decorative dashed ring near icon positions */}
      <circle
        cx={C} cy={C} r={GUIDE_R}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="1"
        strokeDasharray="3 7"
      />

      {/* Progress track background (full circle) */}
      <circle
        cx={C} cy={C} r={PROGRESS_R}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={SW}
      />

      {/* Glow aura behind active arc */}
      <circle
        cx={C} cy={C} r={PROGRESS_R}
        fill="none"
        stroke={activeColor}
        strokeWidth={SW + 5}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={dashOffset}
        transform={`rotate(270 ${C} ${C})`}
        opacity={0.28}
        filter="url(#vOrbitGlow)"
        style={{
          transition: 'stroke-dashoffset 0.65s cubic-bezier(0.16,1,0.3,1), stroke 0.4s ease',
        }}
      />

      {/* Active neon arc */}
      <circle
        cx={C} cy={C} r={PROGRESS_R}
        fill="none"
        stroke="url(#vOrbitGrad)"
        strokeWidth={SW}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={dashOffset}
        transform={`rotate(270 ${C} ${C})`}
        filter="url(#vOrbitGlow)"
        style={{
          transition: 'stroke-dashoffset 0.65s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Energy bead at the leading edge of the arc */}
      <g style={{ transition: 'cx 0.65s cubic-bezier(0.16,1,0.3,1), cy 0.65s cubic-bezier(0.16,1,0.3,1)' }}>
        <circle cx={beadX} cy={beadY} r="7.5" fill={activeColor} opacity={0.38} filter="url(#vOrbitGlow)" />
        <circle cx={beadX} cy={beadY} r="4.5" fill={activeColor} />
        <circle cx={beadX} cy={beadY} r="2.2" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
