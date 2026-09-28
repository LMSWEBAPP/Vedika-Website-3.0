'use client';

import React from 'react';

interface OrbitProgressRingProps {
  currentStep: number; // 1 to 9
  activeColor: string;
  activeRgb: string;
}

export default function OrbitProgressRing({
  currentStep,
  activeColor,
}: OrbitProgressRingProps) {
  // Inner progress ring radius (wraps tightly around Vedika bot)
  const progressRadius = 95;
  // Outer guide circle where icon badges sit (30px gap from progress ring)
  const iconOrbitRadius = 130;

  const size = (iconOrbitRadius + 20) * 2; // 300px total SVG canvas
  const center = size / 2;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * progressRadius;

  // Progress: 1/9 to 9/9
  const progressRatio = Math.max(0.01, Math.min(1.0, currentStep / 9));
  const strokeDashoffset = circumference * (1 - progressRatio);

  // Start at top (270°) and sweep clockwise
  const startAngleDeg = 270;
  const currentAngleDeg = startAngleDeg + progressRatio * 360;
  const currentAngleRad = (currentAngleDeg * Math.PI) / 180;

  const beadX = center + progressRadius * Math.cos(currentAngleRad);
  const beadY = center + progressRadius * Math.sin(currentAngleRad);

  return (
    <svg
      className="vedika-central-progress-svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="vedikaOrbitGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="orbitArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
          <stop offset="60%" stopColor={activeColor} stopOpacity="1" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* 1. Outer guide circle — where icon badges sit */}
      <circle
        cx={center}
        cy={center}
        r={iconOrbitRadius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.07)"
        strokeWidth="1"
        strokeDasharray="3 6"
      />

      {/* 2. Inner progress track (background) */}
      <circle
        cx={center}
        cy={center}
        r={progressRadius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth={strokeWidth}
      />

      {/* 3. Soft glow aura behind active arc */}
      <circle
        cx={center}
        cy={center}
        r={progressRadius}
        fill="none"
        stroke={activeColor}
        strokeWidth={strokeWidth + 4}
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

      {/* 4. Bright active neon progress stroke */}
      <circle
        cx={center}
        cy={center}
        r={progressRadius}
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

      {/* 5. Glowing energy bead at leading edge of progress */}
      <g style={{ transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <circle cx={beadX} cy={beadY} r="7" fill={activeColor} opacity={0.45} filter="url(#vedikaOrbitGlow)" />
        <circle cx={beadX} cy={beadY} r="4" fill={activeColor} />
        <circle cx={beadX} cy={beadY} r="2" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
