'use client';

import React from 'react';
import {
  ORBIT_SEGMENTS,
  ORBIT_SIZE,
  ORBIT_CENTER,
  PROGRESS_R,
  BEAD_START_X,
  BEAD_START_Y,
  STUDENT_ORBIT_FEATURES,
} from './studentOrbitData';

const GUIDE_R = 130; // Outer decorative dashed positioning guide

interface OrbitProgressRingProps {
  segmentRefs: React.MutableRefObject<(SVGPathElement | null)[]>;
  auraRefs: React.MutableRefObject<(SVGPathElement | null)[]>;
  beadGroupRef: React.RefObject<SVGGElement | null>;
  beadHaloRef: React.RefObject<SVGCircleElement | null>;
  beadCoreRef: React.RefObject<SVGCircleElement | null>;
}

export default function OrbitProgressRing({
  segmentRefs,
  auraRefs,
  beadGroupRef,
  beadHaloRef,
  beadCoreRef,
}: OrbitProgressRingProps) {
  const initialColor = STUDENT_ORBIT_FEATURES[0].color; // Pink (#EC4899)

  return (
    <svg
      className="vedika-central-progress-svg"
      width={ORBIT_SIZE}
      height={ORBIT_SIZE}
      viewBox={`0 0 ${ORBIT_SIZE} ${ORBIT_SIZE}`}
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Glow filter for progressive arcs, aura, and energy head */}
        <filter id="vOrbitGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur1" />
          <feGaussianBlur stdDeviation="7" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Individual linear gradients for each of the 9 segments.
            Using userSpaceOnUse with exact start and end coordinates guarantees
            that each segment transitions smoothly from its node color to the next node color. */}
        {ORBIT_SEGMENTS.map((seg) => (
          <linearGradient
            key={seg.gradientId}
            id={seg.gradientId}
            gradientUnits="userSpaceOnUse"
            x1={seg.startX}
            y1={seg.startY}
            x2={seg.endX}
            y2={seg.endY}
          >
            <stop offset="0%" stopColor={seg.fromColor} stopOpacity="1" />
            <stop offset="100%" stopColor={seg.toColor} stopOpacity="1" />
          </linearGradient>
        ))}
      </defs>

      {/* ── Extremely subtle positioning guide circle (opacity: 0.05, whisper-quiet) ── */}
      <circle
        cx={ORBIT_CENTER}
        cy={ORBIT_CENTER}
        r={PROGRESS_R}
        fill="none"
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth="1.5"
      />

      {/* ── Decorative outer orbit guide (faint dashed, communicates orbit layout) ── */}
      <circle
        cx={ORBIT_CENTER}
        cy={ORBIT_CENTER}
        r={GUIDE_R}
        fill="none"
        stroke="rgba(255, 255, 255, 0.04)"
        strokeWidth="1"
        strokeDasharray="3 8"
      />

      {/* ── 9 Glow Aura Segments (strokeWidth=7, 0% progress at start, completely invisible) ── */}
      {ORBIT_SEGMENTS.map((seg, i) => (
        <path
          key={`aura-${seg.gradientId}`}
          ref={(el) => {
            auraRefs.current[i] = el;
          }}
          d={seg.pathD}
          fill="none"
          stroke={`url(#${seg.gradientId})`}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={`${seg.arcLength} ${seg.arcLength}`}
          strokeDashoffset={seg.arcLength}
          style={{
            strokeDasharray: `${seg.arcLength}px ${seg.arcLength}px`,
            strokeDashoffset: `${seg.arcLength}px`,
            opacity: 0,
            visibility: 'hidden',
          }}
          filter="url(#vOrbitGlow)"
          className="orbit-segment-aura"
        />
      ))}

      {/* ── 9 Progressive Arc Segments (strokeWidth=3.5, 0% progress at start, completely invisible) ── */}
      {ORBIT_SEGMENTS.map((seg, i) => (
        <path
          key={`arc-${seg.gradientId}`}
          ref={(el) => {
            segmentRefs.current[i] = el;
          }}
          d={seg.pathD}
          fill="none"
          stroke={`url(#${seg.gradientId})`}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeDasharray={`${seg.arcLength} ${seg.arcLength}`}
          strokeDashoffset={seg.arcLength}
          style={{
            strokeDasharray: `${seg.arcLength}px ${seg.arcLength}px`,
            strokeDashoffset: `${seg.arcLength}px`,
            opacity: 0,
            visibility: 'hidden',
          }}
          filter="url(#vOrbitGlow)"
          className="orbit-segment-arc"
        />
      ))}

      {/* ── Moving Energy Bead Particle (glowing pen / pulse at front of the line) ──
          Positioned exactly on the circular path (R=95), starts at Feature 01 (150, 55).
          Driven in lockstep with the drawing segment by GSAP.
      */}
      <g
        ref={beadGroupRef}
        transform={`translate(${BEAD_START_X}, ${BEAD_START_Y})`}
        className="orbit-energy-bead"
      >
        {/* Soft outer glow halo */}
        <circle
          ref={beadHaloRef}
          r="9"
          cx="0"
          cy="0"
          fill={initialColor}
          opacity={0.55}
          filter="url(#vOrbitGlow)"
        />
        {/* Intense core bead */}
        <circle
          ref={beadCoreRef}
          r="4.8"
          cx="0"
          cy="0"
          fill={initialColor}
        />
        {/* Bright white focal point */}
        <circle r="2.2" cx="0" cy="0" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
