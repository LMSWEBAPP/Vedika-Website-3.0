'use client';

import React from 'react';

interface OrbitProgressRingProps {
  currentStep: number; // 1 to 9
  activeColor: string;
  activeRgb: string;
  size?: number; // default 260
}

export default function OrbitProgressRing({
  currentStep,
  activeColor,
  activeRgb,
  size = 260,
}: OrbitProgressRingProps) {
  const center = size / 2;
  const strokeWidth = 3.5;
  const radius = center - strokeWidth * 2 - 2;
  const circumference = 2 * Math.PI * radius;

  // Fraction 1/9 to 9/9
  const progressRatio = Math.max(0.01, Math.min(1.0, currentStep / 9));
  const strokeDashoffset = circumference * (1 - progressRatio);

  // Starting angle: Top-Left at 225 deg (aligned with Card 1: 24/7 Study Companion)
  const startAngleDeg = 225;
  const currentAngleDeg = startAngleDeg + progressRatio * 360;
  const currentAngleRad = (currentAngleDeg * Math.PI) / 180;

  const beadX = center + radius * Math.cos(currentAngleRad);
  const beadY = center + radius * Math.sin(currentAngleRad);

  return (
    <svg
      className="vedika-central-progress-svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label={`Learning ecosystem progress: ${currentStep} of 9 complete`}
    >
      <defs>
        {/* Soft Neon Glow Filter */}
        <filter id="vedikaRingGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="vedikaRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
          <stop offset="50%" stopColor={activeColor} stopOpacity="1" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* 1. Subtle Dark Base Track */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth={strokeWidth}
      />

      {/* Subtle Step Pips along track */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const tickAngleRad = ((startAngleDeg + (i + 1) * 40) * Math.PI) / 180;
        const tx = center + radius * Math.cos(tickAngleRad);
        const ty = center + radius * Math.sin(tickAngleRad);
        const isPassed = i + 1 <= currentStep;
        return (
          <circle
            key={`tick-${i}`}
            cx={tx}
            cy={ty}
            r={isPassed ? 2.5 : 1.5}
            fill={isPassed ? activeColor : 'rgba(255, 255, 255, 0.22)'}
            opacity={isPassed ? 0.95 : 0.4}
            style={{ transition: 'all 0.35s ease' }}
          />
        );
      })}

      {/* 2. Soft Outer Glow Aura of Active Arc */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={activeColor}
        strokeWidth={strokeWidth + 3.5}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(${startAngleDeg} ${center} ${center})`}
        opacity={0.35}
        filter="url(#vedikaRingGlow)"
        style={{
          transition: 'stroke-dashoffset 0.65s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s ease',
        }}
      />

      {/* 3. Bright Active Neon Progress Stroke */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="url(#vedikaRingGrad)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(${startAngleDeg} ${center} ${center})`}
        filter="url(#vedikaRingGlow)"
        style={{
          transition: 'stroke-dashoffset 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* 4. Glowing Leading Energy Point (Pulse Bead) */}
      <g
        className="leading-energy-bead"
        style={{ transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <circle
          cx={beadX}
          cy={beadY}
          r="7"
          fill={activeColor}
          opacity={0.45}
          filter="url(#vedikaRingGlow)"
        />
        <circle
          cx={beadX}
          cy={beadY}
          r="4.2"
          fill={activeColor}
        />
        <circle
          cx={beadX}
          cy={beadY}
          r="2.2"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
}
