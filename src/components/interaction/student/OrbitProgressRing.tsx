'use client';

import React from 'react';

/**
 * Progress ring constants — must stay in sync with LAYOUT in studentOrbitData.ts
 */
const PROGRESS_R = 95;   // inner arc radius (wraps the bot)
const GUIDE_R    = 130;  // outer guide circle radius (decorative dashed ring)
const STEP_MS    = 2500; // must match STEP_MS in studentOrbitData.ts
const NUM_STEPS  = 9;
const LOOP_MS    = STEP_MS * NUM_STEPS; // 22 500ms per full revolution

// Circumference of the progress ring (used as stroke-dasharray)
const CIRC = parseFloat((2 * Math.PI * PROGRESS_R).toFixed(2)); // ≈ 596.90

const SIZE = (GUIDE_R + 20) * 2; // 300 — SVG canvas size in px
const C    = SIZE / 2;            // 150 — SVG center
const SW   = 3;                   // stroke-width for the arc

interface OrbitProgressRingProps {
  activeColor: string;   // hex color of the currently active feature
  beadAngleDeg: number;  // angle (degrees) where the energy bead sits on the ring
}

export default function OrbitProgressRing({
  activeColor,
  beadAngleDeg,
}: OrbitProgressRingProps) {
  // Bead center coordinates computed from angle
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
        {/* Glow filter for arc and bead */}
        <filter id="vOrbitGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blr" />
          <feMerge>
            <feMergeNode in="blr" />
            <feMergeNode in="blr" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient for the active arc */}
        <linearGradient id="vOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#38BDF8" stopOpacity="0.85" />
          <stop offset="60%"  stopColor={activeColor} stopOpacity="1" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* ── Decorative outer guide ring (dashed) ── */}
      <circle
        cx={C} cy={C} r={GUIDE_R}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="1"
        strokeDasharray="3 7"
      />

      {/* ── Progress track background (full circle, dim) ── */}
      <circle
        cx={C} cy={C} r={PROGRESS_R}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={SW}
      />

      {/*
        ── Continuously flowing arc (CSS animation — NO JS-driven dashOffset) ──
        Starts at 270° (12 o'clock) and sweeps clockwise.
        Uses a CSS @keyframes animation (see student-orbit.css: .orbit-ring-aura, .orbit-ring-arc).
        Duration = STEP_MS × 9 = 22 500ms for one full revolution.
        This NEVER resets mid-animation so there is no backward jump.
      */}

      {/* Glow aura behind the arc */}
      <circle
        cx={C} cy={C} r={PROGRESS_R}
        fill="none"
        stroke={activeColor}
        strokeWidth={SW + 5}
        strokeLinecap="round"
        strokeDasharray={CIRC}
        transform={`rotate(270 ${C} ${C})`}
        opacity={0.28}
        filter="url(#vOrbitGlow)"
        className="orbit-ring-aura"
        style={{
          animationDuration: `${LOOP_MS}ms`,
          transition: 'stroke 0.5s ease',
        }}
      />

      {/* Main bright arc */}
      <circle
        cx={C} cy={C} r={PROGRESS_R}
        fill="none"
        stroke="url(#vOrbitGrad)"
        strokeWidth={SW}
        strokeLinecap="round"
        strokeDasharray={CIRC}
        transform={`rotate(270 ${C} ${C})`}
        filter="url(#vOrbitGlow)"
        className="orbit-ring-arc"
        style={{ animationDuration: `${LOOP_MS}ms` }}
      />

      {/*
        ── Energy bead ──
        Position is driven by beadAngleDeg (JS state, changes per step).
        Uses CSS `transform: translate` for smooth CSS transition between steps.
        The bead moves along the ring arc in sync with the active feature.
      */}
      <g
        style={{
          transform: `translate(${beadX}px, ${beadY}px)`,
          transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Outer glow halo */}
        <circle r="7.5" cx={0} cy={0} fill={activeColor} opacity={0.38} filter="url(#vOrbitGlow)" />
        {/* Main bead */}
        <circle r="4.5" cx={0} cy={0} fill={activeColor} style={{ transition: 'fill 0.4s ease' }} />
        {/* Bright center dot */}
        <circle r="2.2" cx={0} cy={0} fill="#FFFFFF" />
      </g>
    </svg>
  );
}
