'use client';

import React from 'react';
import {
  ORBIT_SEGMENTS,
  ORBIT_SIZE,
  PROGRESS_R,
  BEAD_START_X,
  BEAD_START_Y,
  STUDENT_ORBIT_FEATURES,
  NODE_POSITIONS,
} from './studentOrbitData';

interface OrbitProgressRingProps {
  segmentRefs: React.MutableRefObject<(SVGPathElement | null)[]>;
  beadGroupRef: React.RefObject<SVGGElement | null>;
  beadHaloRef: React.RefObject<SVGCircleElement | null>;
  beadCoreRef: React.RefObject<SVGCircleElement | null>;
  revealedSteps: Set<number>;
}

export default function OrbitProgressRing({
  segmentRefs,
  beadGroupRef,
  beadHaloRef,
  beadCoreRef,
  revealedSteps,
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
          x="-60"
          y="-60"
          width={ORBIT_SIZE + 120}
          height={ORBIT_SIZE + 120}
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

        {/* Dedicated linear gradients for each connector line: vibrant ring glow -> card accent */}
        {STUDENT_ORBIT_FEATURES.map((feat) => {
          const pos = NODE_POSITIONS[feat.index];
          if (!pos) return null;
          return (
            <linearGradient
              key={`grad-conn-${feat.id}`}
              id={`connGrad_${feat.id}`}
              gradientUnits="userSpaceOnUse"
              x1={pos.x1}
              y1={pos.y1}
              x2={pos.x2}
              y2={pos.y2}
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="30%" stopColor={feat.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={feat.color} stopOpacity="0.3" />
            </linearGradient>
          );
        })}
      </defs>

      {/* ── 0. Connectors from Orbit Nodes to Cards (with Gradient & Progressive Reveal) ── */}
      {STUDENT_ORBIT_FEATURES.map((feat) => {
        const pos = NODE_POSITIONS[feat.index];
        if (!pos?.connectorD) return null;
        const isDrawn = revealedSteps.has(feat.index);
        return (
          <path
            key={`conn-${feat.id}`}
            d={pos.connectorD}
            stroke={`url(#connGrad_${feat.id})`}
            strokeWidth={2.0}
            fill="none"
            filter="url(#vOrbitNeonGlow)"
            className={`orbit-connector-line ${isDrawn ? 'is-drawn' : ''}`}
          />
        );
      })}


      {/* ── 2. 9 Progressive Arc Segments with vibrant active neon glow ── */}
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

      {/* ── 3. 9 Glowing Colored Orbit Nodes on the Ring (Progressive Reveal) ── */}
      {STUDENT_ORBIT_FEATURES.map((feat) => {
        const pos = NODE_POSITIONS[feat.index];
        const rad = (pos.nodeAngleDeg * Math.PI) / 180;
        const nx = 300 + 125 * Math.cos(rad);
        const ny = 300 + 125 * Math.sin(rad);
        const isDrawn = revealedSteps.has(feat.index);
        return (
          <g
            key={`orbit-node-dot-${feat.id}`}
            transform={`translate(${nx.toFixed(2)}, ${ny.toFixed(2)})`}
            className={`orbit-node-dot ${isDrawn ? 'is-drawn' : ''}`}
          >
            <circle r={8} fill={feat.color} opacity={0.45} filter="url(#vOrbitNeonGlow)" />
            <circle r={4.5} fill={feat.color} />
            <circle r={2} fill="#FFFFFF" />
          </g>
        );
      })}

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
