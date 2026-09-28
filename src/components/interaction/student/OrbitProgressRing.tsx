'use client';

import React from 'react';

interface OrbitProgressRingProps {
  currentStep: number; // 1 to 8
  activeColor: string;
  activeRgb: string;
  size?: number; // default 270
}

export default function OrbitProgressRing({
  currentStep,
  activeColor,
  activeRgb,
  size = 270,
}: OrbitProgressRingProps) {
  const center = size / 2;
  const strokeWidth = 3.5;
  const radius = center - strokeWidth * 2;
  const circumference = 2 * Math.PI * radius;

  // Fraction 1/8 to 8/8 (0.125 to 1.0)
  const progressRatio = Math.max(0.01, Math.min(1.0, currentStep / 8));
  const strokeDashoffset = circumference * (1 - progressRatio);

  // Calculate coordinates for the leading glowing energy bead
  // Base circle starts at 180 deg (mid-left / top-left boundary)
  // Step 1: 180 + 45 = 225 deg (pointing to Feature 1)
  // Step 8: 180 + 360 = 540 deg (full circle)
  const startAngleDeg = 180;
  const currentAngleDeg = startAngleDeg + progressRatio * 360;
  const currentAngleRad = (currentAngleDeg * Math.PI) / 180;

  const beadX = center + radius * Math.cos(currentAngleRad);
  const beadY = center + radius * Math.sin(currentAngleRad);

  // Trail particle 1 & 2 slightly behind the leading bead
  const trail1AngleRad = ((currentAngleDeg - 8) * Math.PI) / 180;
  const trail1X = center + radius * Math.cos(trail1AngleRad);
  const trail1Y = center + radius * Math.sin(trail1AngleRad);

  const trail2AngleRad = ((currentAngleDeg - 16) * Math.PI) / 180;
  const trail2X = center + radius * Math.cos(trail2AngleRad);
  const trail2Y = center + radius * Math.sin(trail2AngleRad);

  const isComplete = currentStep === 8;

  return (
    <svg
      className="orbit-progress-ring-svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label={`Student ecosystem progress: ${currentStep} of 8 capabilities complete (${Math.round(progressRatio * 360)} degrees)`}
    >
      <defs>
        {/* Neon Glow Filter */}
        <filter id="neonGlowRing" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Dynamic Gradient for Arc */}
        <linearGradient id="ringActiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="50%" stopColor={activeColor} stopOpacity="1" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* 1. Subtle Dark Base Track */}
      <circle
        className="progress-track"
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth={strokeWidth}
      />

      {/* Subtle tick markers for 8 steps */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const tickAngleRad = ((180 + (i + 1) * 45) * Math.PI) / 180;
        const tx = center + radius * Math.cos(tickAngleRad);
        const ty = center + radius * Math.sin(tickAngleRad);
        const isPassed = i + 1 <= currentStep;
        return (
          <circle
            key={`tick-${i}`}
            cx={tx}
            cy={ty}
            r={isPassed ? 2.5 : 1.5}
            fill={isPassed ? activeColor : 'rgba(255, 255, 255, 0.2)'}
            opacity={isPassed ? 0.9 : 0.4}
            style={{ transition: 'all 0.3s ease' }}
          />
        );
      })}

      {/* 2. Soft Outer Glow Aura of Active Arc */}
      <circle
        className="progress-aura"
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={activeColor}
        strokeWidth={strokeWidth + 4}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(180 ${center} ${center})`}
        opacity={0.35}
        filter="url(#neonGlowRing)"
        style={{
          transition: 'stroke-dashoffset 0.65s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s ease',
        }}
      />

      {/* 3. Bright Active Neon Stroke */}
      <circle
        className="progress-value"
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="url(#ringActiveGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(180 ${center} ${center})`}
        filter="url(#neonGlowRing)"
        style={{
          transition: 'stroke-dashoffset 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* 4. Small Trail Particles Following the Leading Energy Bead */}
      <circle
        cx={trail2X}
        cy={trail2Y}
        r="1.4"
        fill={activeColor}
        opacity={0.4}
        style={{ transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
      <circle
        cx={trail1X}
        cy={trail1Y}
        r="2.2"
        fill="#FFFFFF"
        opacity={0.65}
        style={{ transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />

      {/* 5. Glowing Leading Energy Point (Pulse Bead) */}
      <g
        className="leading-energy-bead"
        style={{ transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Outer Halo */}
        <circle
          cx={beadX}
          cy={beadY}
          r="7"
          fill={activeColor}
          opacity={0.45}
          filter="url(#neonGlowRing)"
        />
        {/* Bright Core */}
        <circle
          cx={beadX}
          cy={beadY}
          r="4.2"
          fill={activeColor}
        />
        {/* White Center Hotspot */}
        <circle
          cx={beadX}
          cy={beadY}
          r="2.2"
          fill="#FFFFFF"
        />
      </g>

      {/* 6. Complete 360 Shimmer Burst if all 8 steps completed */}
      {isComplete && (
        <circle
          cx={center}
          cy={center}
          r={radius + 3}
          fill="none"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          className="orbit-complete-shimmer"
        />
      )}
    </svg>
  );
}
