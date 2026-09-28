'use client';

import React from 'react';
import {
  ORBIT_SEGMENTS,
  ORBIT_SIZE,
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
        {/* Vibrant multi-pass neon glow filter for the loading ring and energy bead */}
        <filter
          id="vOrbitNeonGlow"
          filterUnits="userSpaceOnUse"
          x="-40"
          y="-40"
          width={ORBIT_SIZE + 80}
          height={ORBIT_SIZE + 80}
        >
          <feGaussianBlur stdDeviation="5.0" result="wideGlow" />
          <feGaussianBlur stdDeviation="2.2" result="tightGlow" />
          <feMerge>
            <feMergeNode in="wideGlow" />
            <feMergeNode in="tightGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Individual linear gradients for each of the 9 segments */}
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

      {/* ── 9 Progressive Arc Segments with vibrant neon glow ── */}
      {ORBIT_SEGMENTS.map((seg, i) => (
        <path
          key={`arc-${seg.gradientId}`}
          ref={(el) => {
            segmentRefs.current[i] = el;
          }}
          d={seg.pathD}
          fill="none"
          stroke={`url(#${seg.gradientId})`}
          strokeWidth={4.0}
          strokeLinecap="round"
          strokeDasharray={`${seg.arcLength} ${seg.arcLength}`}
          strokeDashoffset={seg.arcLength}
          style={{
            strokeDasharray: `${seg.arcLength}px ${seg.arcLength}px`,
            strokeDashoffset: `${seg.arcLength}px`,
            opacity: 0,
            visibility: 'hidden',
          }}
          filter="url(#vOrbitNeonGlow)"
          className="orbit-segment-arc"
        />
      ))}

      {/* ── Moving Energy Bead Particle with radiant outer aura ── */}
      <g
        ref={beadGroupRef}
        transform={`translate(${BEAD_START_X}, ${BEAD_START_Y})`}
        className="orbit-energy-bead"
      >
        {/* Diffuse glowing halo */}
        <circle
          ref={beadHaloRef}
          r="12"
          cx="0"
          cy="0"
          fill={initialColor}
          opacity={0.85}
          filter="url(#vOrbitNeonGlow)"
        />
        {/* Vibrant core bead */}
        <circle
          ref={beadCoreRef}
          r="5.2"
          cx="0"
          cy="0"
          fill={initialColor}
        />
        {/* Bright white energetic center spark */}
        <circle r="2.6" cx="0" cy="0" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
