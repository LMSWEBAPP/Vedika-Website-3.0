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

interface OrbitProgressRingProps {
  segmentRefs: React.MutableRefObject<(SVGPathElement | null)[]>;
  beadGroupRef: React.RefObject<SVGGElement | null>;
  beadHaloRef: React.RefObject<SVGCircleElement | null>;
  beadCoreRef: React.RefObject<SVGCircleElement | null>;
}

export default function OrbitProgressRing({
  segmentRefs,
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
        {/* Subtle, crisp filter: keeps the neon arc clean and vibrant without washed-out haze */}
        <filter
          id="vOrbitGlow"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={ORBIT_SIZE}
          height={ORBIT_SIZE}
        >
          <feGaussianBlur stdDeviation="1.2" result="blur1" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Individual linear gradients for each of the 9 segments.
            Using userSpaceOnUse ensures the colors transition smoothly along the curved path. */}
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

      {/* Zero background circles: removed all background track/guide circles to eliminate any visual clutter */}

      {/* ── 9 Progressive Arc Segments: true mathematical circular arcs with no straight edges ── */}
      {ORBIT_SEGMENTS.map((seg, i) => (
        <path
          key={`arc-${seg.gradientId}`}
          ref={(el) => {
            segmentRefs.current[i] = el;
          }}
          d={seg.pathD}
          fill="none"
          stroke={`url(#${seg.gradientId})`}
          strokeWidth={3.8}
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

      {/* ── Moving Energy Bead Particle (glowing pen / pulse leading the line) ──
          Positioned exactly on the circular path (R=95), starts at Feature 01 (150, 55).
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
          opacity={0.6}
          filter="url(#vOrbitGlow)"
        />
        {/* Vibrant core bead */}
        <circle
          ref={beadCoreRef}
          r="4.8"
          cx="0"
          cy="0"
          fill={initialColor}
        />
        {/* Bright white focal spark */}
        <circle r="2.4" cx="0" cy="0" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
