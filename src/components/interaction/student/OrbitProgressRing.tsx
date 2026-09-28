'use client';

import React from 'react';

interface OrbitProgressRingProps {
  currentStep: number; // 1 to 9
  activeColor: string;
  activeRgb: string;
  radius?: number; // default 130
}

export default function OrbitProgressRing({
  currentStep,
  activeColor,
  activeRgb,
  radius = 130,
}: OrbitProgressRingProps) {
  const size = (radius + 20) * 2;
  const center = size / 2;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;

  // Fraction 1/9 to 9/9
  const progressRatio = Math.max(0.01, Math.min(1.0, currentStep / 9));
  const strokeDashoffset = circumference * (1 - progressRatio);

  // Card 1 is at 320 deg. Start angle is 280 deg so step 1 lands at 320 deg.
  const startAngleDeg = 280;
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
      aria-hidden="true"
    >
      <defs>
        <filter id="vedikaOrbitGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="orbitArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
          <stop offset="60%" stopColor={activeColor} stopOpacity="1" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* 1. Subtle Dark Base Track Passing Under All Icons */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.10)"
        strokeWidth={strokeWidth}
      />

      {/* 2. Soft Outer Glow Aura of Active Arc */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={activeColor}
        strokeWidth={strokeWidth + 3}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(${startAngleDeg} ${center} ${center})`}
        opacity={0.35}
        filter="url(#vedikaOrbitGlow)"
        style={{
          transition: 'stroke-dashoffset 0.65s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s ease',
        }}
      />

      {/* 3. Bright Active Neon Stroke */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="url(#orbitArcGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(${startAngleDeg} ${center} ${center})`}
        filter="url(#vedikaOrbitGlow)"
        style={{
          transition: 'stroke-dashoffset 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* 4. Glowing Energy Bead At Leading Edge */}
      <g
        className="leading-energy-bead"
        style={{ transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <circle
          cx={beadX}
          cy={beadY}
          r="6.5"
          fill={activeColor}
          opacity={0.5}
          filter="url(#vedikaOrbitGlow)"
        />
        <circle
          cx={beadX}
          cy={beadY}
          r="3.8"
          fill={activeColor}
        />
        <circle
          cx={beadX}
          cy={beadY}
          r="2.0"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
}
