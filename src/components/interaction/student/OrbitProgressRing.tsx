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
        {/* Subtle multi-pass glow filter for the ring and energy bead */}
        <filter
          id="vOrbitNeonGlow"
          filterUnits="userSpaceOnUse"
          x="-60"
          y="-60"
          width={ORBIT_SIZE + 120}
          height={ORBIT_SIZE + 120}
        >
          <feGaussianBlur stdDeviation="3.5" result="wideGlow" />
          <feGaussianBlur stdDeviation="1.5" result="tightGlow" />
          <feMerge>
            <feMergeNode in="wideGlow" />
            <feMergeNode in="tightGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Continuous Smooth Gold, Black, Mixed Gradient for the Ring of Vedika */}
        <linearGradient id="vGoldBlackRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
          <stop offset="14%" stopColor="#FDE68A" stopOpacity="1.0" />
          <stop offset="28%" stopColor="#D4AF37" stopOpacity="0.92" />
          <stop offset="42%" stopColor="#2A1E0C" stopOpacity="0.88" />
          <stop offset="56%" stopColor="#080C14" stopOpacity="0.96" />
          <stop offset="70%" stopColor="#1E1508" stopOpacity="0.90" />
          <stop offset="84%" stopColor="#B45309" stopOpacity="0.88" />
          <stop offset="93%" stopColor="#D4AF37" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.95" />
        </linearGradient>

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
            <stop offset="0%" stopColor={seg.fromColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={seg.toColor} stopOpacity="0.95" />
          </linearGradient>
        ))}

        {/* Dedicated linear gradients for each connector line: gold ring anchor -> card accent */}
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
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
              <stop offset="35%" stopColor={feat.color} stopOpacity="0.75" />
              <stop offset="100%" stopColor={feat.color} stopOpacity="0.25" />
            </linearGradient>
          );
        })}
      </defs>

      {/* ── 0. Golden & Black Smooth Mixed Gradient Orbit Ring of Vedika ── */}
      {/* Main Solid Gold-Black Mixed Gradient Ring */}
      <circle
        cx={300}
        cy={300}
        r={PROGRESS_R}
        fill="none"
        stroke="url(#vGoldBlackRingGrad)"
        strokeWidth={2.4}
        filter="url(#vOrbitNeonGlow)"
      />

      {/* Inner subtle concentric metallic hairline ring */}
      <circle
        cx={300}
        cy={300}
        r={PROGRESS_R - 6}
        fill="none"
        stroke="url(#vGoldBlackRingGrad)"
        strokeWidth={0.8}
        opacity={0.45}
      />

      {/* ── 1. Connectors from Orbit Nodes to Cards (with subtle gradient & Progressive Reveal) ── */}
      {STUDENT_ORBIT_FEATURES.map((feat) => {
        const pos = NODE_POSITIONS[feat.index];
        if (!pos?.connectorD) return null;
        const isDrawn = revealedSteps.has(feat.index);
        return (
          <path
            key={`conn-${feat.id}`}
            d={pos.connectorD}
            stroke={`url(#connGrad_${feat.id})`}
            strokeWidth={1.5}
            fill="none"
            className={`orbit-connector-line ${isDrawn ? 'is-drawn' : ''}`}
          />
        );
      })}

      {/* ── 2. 9 Progressive Arc Segments tracking progress ── */}
      {ORBIT_SEGMENTS.map((seg, i) => (
        <path
          key={`arc-${seg.gradientId}`}
          ref={(el) => {
            segmentRefs.current[i] = el;
          }}
          d={seg.pathD}
          fill="none"
          stroke={`url(#${seg.gradientId})`}
          strokeWidth={3.0}
          strokeLinecap="round"
          strokeDasharray={`${seg.arcLength} ${seg.arcLength}`}
          strokeDashoffset={seg.arcLength}
          style={{
            strokeDasharray: `${seg.arcLength}px ${seg.arcLength}px`,
            strokeDashoffset: `${seg.arcLength}px`,
            opacity: 0,
            visibility: 'hidden',
          }}
          className="orbit-segment-arc"
        />
      ))}

      {/* ── 3. 9 Orbit Nodes on the Ring (Progressive Reveal) ── */}
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
            <circle r={7} fill={feat.color} opacity={0.25} />
            <circle r={3.8} fill={feat.color} />
            <circle r={1.6} fill="#FFFFFF" />
          </g>
        );
      })}

      {/* ── Moving Energy Bead Particle with radiant outer aura ── */}
      <g
        ref={beadGroupRef}
        transform={`translate(${BEAD_START_X}, ${BEAD_START_Y})`}
        className="orbit-energy-bead"
      >
        {/* Soft glowing halo */}
        <circle
          ref={beadHaloRef}
          r="9.5"
          cx="0"
          cy="0"
          fill={initialColor}
          opacity={0.6}
        />
        {/* Core bead */}
        <circle
          ref={beadCoreRef}
          r="4.6"
          cx="0"
          cy="0"
          fill={initialColor}
        />
        {/* Bright white center spark */}
        <circle r="2.0" cx="0" cy="0" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
