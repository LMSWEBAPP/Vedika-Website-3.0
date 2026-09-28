'use client';

import React from 'react';
import { STUDENT_ORBIT_FEATURES, StudentOrbitFeature } from './studentOrbitData';

interface OrbitConnectorLinesProps {
  activeStep: number;
  hoveredStep: number | null;
}

export default function OrbitConnectorLines({
  activeStep,
  hoveredStep,
}: OrbitConnectorLinesProps) {
  return (
    <svg
      className="orbit-connectors-svg"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="connectorGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {STUDENT_ORBIT_FEATURES.map((feat: StudentOrbitFeature) => {
        const isActive = feat.index === activeStep;
        const isHovered = feat.index === hoveredStep;
        const isRevealed = feat.index <= activeStep;

        const pathD = `M ${feat.nodeAnchor.x} ${feat.nodeAnchor.y} L ${feat.orbitAnchor.x} ${feat.orbitAnchor.y}`;

        let strokeOpacity = 0.18;
        let strokeWidth = 1.3;
        let strokeDash = '3 3';
        let strokeColor = 'rgba(255, 255, 255, 0.25)';

        if (isActive) {
          strokeOpacity = 1.0;
          strokeWidth = 2.4;
          strokeDash = 'none';
          strokeColor = feat.color;
        } else if (isHovered) {
          strokeOpacity = 0.85;
          strokeWidth = 1.8;
          strokeDash = '4 2';
          strokeColor = feat.color;
        } else if (isRevealed) {
          strokeOpacity = 0.42;
          strokeWidth = 1.4;
          strokeDash = '3 3';
          strokeColor = feat.color;
        }

        return (
          <g key={`connector-${feat.id}`} className="connector-group">
            {/* Base Connector Line */}
            <path
              d={pathD}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDash}
              strokeOpacity={strokeOpacity}
              fill="none"
              filter={isActive ? 'url(#connectorGlow)' : undefined}
              style={{
                transition: 'all 0.35s ease',
              }}
            />

            {/* Orbit Anchor Node Dot */}
            <circle
              cx={feat.orbitAnchor.x}
              cy={feat.orbitAnchor.y}
              r={isActive ? 6 : isRevealed ? 4.5 : 3.5}
              fill={feat.color}
              opacity={isActive ? 0.35 : isRevealed ? 0.2 : 0.1}
            />
            <circle
              cx={feat.orbitAnchor.x}
              cy={feat.orbitAnchor.y}
              r={isActive ? 3.2 : isRevealed ? 2.2 : 1.8}
              fill={feat.color}
              opacity={isActive ? 1.0 : isRevealed ? 0.75 : 0.3}
            />

            {/* Feature Anchor Dot */}
            <circle
              cx={feat.nodeAnchor.x}
              cy={feat.nodeAnchor.y}
              r={isActive ? 3.5 : 2}
              fill={feat.color}
              opacity={isActive ? 0.9 : 0.3}
            />

            {/* Animated Energy Pulse Particle Travelling Along Active Connector toward Center */}
            {isActive && (
              <circle r="3" fill="#FFFFFF" filter="url(#connectorGlow)">
                <animateMotion
                  path={pathD}
                  dur="1.8s"
                  repeatCount="indefinite"
                  keyPoints="0;1"
                  keyTimes="0;1"
                />
              </circle>
            )}
            {isActive && (
              <circle r="5" fill={feat.color} opacity="0.45" filter="url(#connectorGlow)">
                <animateMotion
                  path={pathD}
                  dur="1.8s"
                  repeatCount="indefinite"
                  keyPoints="0;1"
                  keyTimes="0;1"
                />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}
