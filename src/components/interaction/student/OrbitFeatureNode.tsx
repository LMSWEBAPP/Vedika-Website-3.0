'use client';

import React from 'react';
import {
  Clock, Heart, Sparkles, Compass, Lightbulb,
  Atom, CheckCircle2, Sliders, ShieldCheck,
} from 'lucide-react';
import { StudentOrbitFeature, NODE_POSITIONS } from './studentOrbitData';

interface OrbitFeatureNodeProps {
  feature: StudentOrbitFeature;
  isActive: boolean;
  isIconVisible: boolean;
  isExpanded: boolean;
  isCompleted: boolean;
  iconCx: number;
  iconCy: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function getIcon(id: string) {
  const p = { size: 19, strokeWidth: 2.2 } as const;
  switch (id) {
    case 'study-companion':      return <Clock {...p} />;
    case 'non-judgmental':       return <Heart {...p} fill="currentColor" fillOpacity={0.4} />;
    case 'own-pace':             return <Compass {...p} />;
    case 'concept-clarity':      return <Lightbulb {...p} />;
    case 'personalized-support': return <Sliders {...p} />;
    case 'build-confidence':     return <ShieldCheck {...p} />;
    case 'practice-exam':        return <CheckCircle2 {...p} />;
    case 'interactive-learning': return <Atom {...p} />;
    case 'unlimited-questions':  return <Sparkles {...p} />;
    default:                     return <Sparkles {...p} />;
  }
}

function getWatermarkIcon(feature: StudentOrbitFeature) {
  const { id, color } = feature;
  const gradId = `wmGrad_${id}`;
  const strokeGradId = `wmStrokeGrad_${id}`;

  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="watermark-svg-alive"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Soft fading linear gradient from card accent to transparent */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.85" />
          <stop offset="50%" stopColor={color} stopOpacity="0.30" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>

        {/* Luminous accent stroke gradient */}
        <linearGradient id={strokeGradId} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.90" />
          <stop offset="45%" stopColor={color} stopOpacity="0.65" />
          <stop offset="100%" stopColor={color} stopOpacity="0.10" />
        </linearGradient>
      </defs>

      {/* Unique alive holographic emblem per feature */}
      {id === 'non-judgmental' && (
        <g>
          {/* Sacred geometry heart with radiant concentric resonance arcs */}
          <path
            d="M20 33.5l-2.1-1.9C10.5 24.8 5 19.8 5 13.5 5 8.4 9 4.4 14.1 4.4c2.9 0 5.7 1.3 7.4 3.4 1.7-2.1 4.5-3.4 7.4-3.4 5.1 0 9.1 4 9.1 9.1 0 6.3-5.5 11.3-12.9 18.1L20 33.5z"
            fill={`url(#${gradId})`}
            stroke={`url(#${strokeGradId})`}
            strokeWidth="1.2"
          />
          {/* Inner pulsating diamond core */}
          <path
            d="M20 12l2.5 4 4 2.5-4 2.5-2.5 4-2.5-4-4-2.5 4-2.5z"
            fill={color}
            opacity="0.6"
          />
          {/* Radiant spark nodes */}
          <circle cx="20" cy="18.5" r="1.8" fill="#FFFFFF" />
          <circle cx="10" cy="11" r="1.0" fill={color} opacity="0.8" />
          <circle cx="30" cy="11" r="1.0" fill={color} opacity="0.8" />
        </g>
      )}

      {id === 'own-pace' && (
        <g>
          {/* Celestial Astrolabe & Gyro-Compass with orbital track */}
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <circle
            cx="20"
            cy="20"
            r="11"
            fill={`url(#${gradId})`}
            stroke={color}
            strokeWidth="0.8"
            strokeOpacity="0.5"
          />
          {/* 8-Point Compass Star */}
          <path
            d="M20 5v30M5 20h30M9.4 9.4l21.2 21.2M9.4 30.6L30.6 9.4"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="1.0"
            strokeLinecap="round"
          />
          {/* Luminous North Polaris Spark */}
          <circle cx="20" cy="20" r="2.5" fill="#FFFFFF" />
          <circle cx="20" cy="5" r="1.6" fill={color} />
        </g>
      )}

      {id === 'concept-clarity' && (
        <g>
          {/* Multi-layered Prism Crystal with refraction facet rays */}
          <path
            d="M20 4l14 8v16l-14 8-14-8V12z"
            fill={`url(#${gradId})`}
            stroke={`url(#${strokeGradId})`}
            strokeWidth="1.2"
          />
          {/* Facet refraction lines */}
          <path
            d="M20 4v32M6 12l14 8 14-8M6 28l14-8 14 8"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="0.9"
            strokeOpacity="0.75"
          />
          {/* Glowing central enlightenment core */}
          <circle cx="20" cy="20" r="3.0" fill="#FFFFFF" opacity="0.85" />
          <circle cx="20" cy="4" r="1.2" fill={color} />
          <circle cx="34" cy="20" r="1.2" fill={color} />
        </g>
      )}

      {id === 'personalized-support' && (
        <g>
          {/* Biometric Resonance Wave & Equalizer Pillars */}
          <rect x="7" y="15" width="3.5" height="10" rx="1.75" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.8" />
          <rect x="13" y="10" width="3.5" height="20" rx="1.75" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.8" />
          <rect x="19" y="5" width="3.5" height="30" rx="1.75" fill={`url(#${gradId})`} stroke={`url(#${strokeGradId})`} strokeWidth="1.2" />
          <rect x="25" y="10" width="3.5" height="20" rx="1.75" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.8" />
          <rect x="31" y="15" width="3.5" height="10" rx="1.75" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.8" />
          {/* Orbiting biometric user node */}
          <circle cx="20.75" cy="11" r="2.2" fill="#FFFFFF" />
          <circle cx="8.75" cy="15" r="1.0" fill={color} />
          <circle cx="32.75" cy="15" r="1.0" fill={color} />
        </g>
      )}

      {id === 'build-confidence' && (
        <g>
          {/* Ascending Victory Trajectory with layered energy shields */}
          <path
            d="M20 5l13 6v10c0 8.5-5.5 14.5-13 17C12.5 35.5 7 29.5 7 21V11z"
            fill={`url(#${gradId})`}
            stroke={`url(#${strokeGradId})`}
            strokeWidth="1.2"
          />
          {/* Ascending exponential vector */}
          <path
            d="M12 26l6-6 4 4 8-10M25 14h5v5"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Apex stardust spark */}
          <circle cx="30" cy="14" r="2.0" fill="#FFFFFF" />
          <circle cx="20" cy="38" r="1.0" fill={color} />
        </g>
      )}

      {id === 'practice-exam' && (
        <g>
          {/* Tactical Radar Target with calibrated reticles & check glyph */}
          <circle cx="20" cy="20" r="16" stroke={`url(#${strokeGradId})`} strokeWidth="1.0" strokeDasharray="4 3" />
          <circle cx="20" cy="20" r="11" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
          <circle cx="20" cy="20" r="6" stroke={`url(#${strokeGradId})`} strokeWidth="0.9" />
          {/* Precision crosshairs */}
          <line x1="20" y1="4" x2="20" y2="36" stroke={`url(#${strokeGradId})`} strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="4" y1="20" x2="36" y2="20" stroke={`url(#${strokeGradId})`} strokeWidth="0.8" strokeDasharray="2 2" />
          {/* Verified target check */}
          <path d="M16 20l3 3 6-6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {id === 'interactive-learning' && (
        <g>
          {/* Quantum Gyroscopic Atom with 3 interlocking 3D orbital rings */}
          <ellipse cx="20" cy="20" rx="16" ry="6" transform="rotate(-30 20 20)" stroke={`url(#${strokeGradId})`} strokeWidth="1.1" />
          <ellipse cx="20" cy="20" rx="16" ry="6" transform="rotate(30 20 20)" stroke={`url(#${strokeGradId})`} strokeWidth="1.1" />
          <ellipse cx="20" cy="20" rx="16" ry="6" transform="rotate(90 20 20)" stroke={color} strokeWidth="0.9" strokeOpacity="0.6" />
          {/* Glowing quantum nucleus core */}
          <circle cx="20" cy="20" r="3.8" fill={`url(#${gradId})`} stroke="#FFFFFF" strokeWidth="1.2" />
          <circle cx="20" cy="20" r="1.8" fill="#FFFFFF" />
          {/* Orbiting quantum particles */}
          <circle cx="33" cy="13" r="1.6" fill={color} />
          <circle cx="8" cy="14" r="1.4" fill="#FFFFFF" />
          <circle cx="20" cy="35" r="1.4" fill={color} />
        </g>
      )}

      {id === 'unlimited-questions' && (
        <g>
          {/* Dual Neural Resonance Thought-Waves with acoustic ripples */}
          <path
            d="M6 18c0-7 6-12 14-12s14 5 14 12c0 3.5-1.5 6.5-4 8.5l2 5.5-6.5-2C23.5 30.7 21.8 31 20 31c-8 0-14-5-14-12z"
            fill={`url(#${gradId})`}
            stroke={`url(#${strokeGradId})`}
            strokeWidth="1.2"
          />
          {/* Inner sonic resonance rings */}
          <circle cx="20" cy="18" r="6" stroke={`url(#${strokeGradId})`} strokeWidth="0.9" strokeDasharray="2 3" />
          <circle cx="20" cy="18" r="2.4" fill="#FFFFFF" />
          {/* Synaptic spark nodes */}
          <circle cx="14" cy="15" r="1.2" fill={color} />
          <circle cx="26" cy="15" r="1.2" fill={color} />
          <circle cx="20" cy="24" r="1.0" fill={color} />
        </g>
      )}

      {id === 'study-companion' && (
        <g>
          {/* Celestial Chronometer / Astronomical Dial with solar flare */}
          <circle cx="20" cy="20" r="16" stroke={`url(#${strokeGradId})`} strokeWidth="1.1" />
          <circle cx="20" cy="20" r="11" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
          {/* 12-hour tick marks */}
          <line x1="20" y1="5" x2="20" y2="8" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="20" y1="32" x2="20" y2="35" stroke={color} strokeWidth="1.0" />
          <line x1="5" y1="20" x2="8" y2="20" stroke={color} strokeWidth="1.0" />
          <line x1="32" y1="20" x2="35" y2="20" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          {/* Clock hands pointing towards continuous 24/7 learning */}
          <line x1="20" y1="20" x2="20" y2="10" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="20" y1="20" x2="28" y2="20" stroke={`url(#${strokeGradId})`} strokeWidth="1.4" strokeLinecap="round" />
          {/* Central sunburst bead */}
          <circle cx="20" cy="20" r="2.2" fill="#FFFFFF" />
          <circle cx="29" cy="11" r="1.4" fill={color} />
        </g>
      )}
    </svg>
  );
}

export default function OrbitFeatureNode({
  feature,
  isActive,
  isIconVisible,
  isExpanded,
  isCompleted,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: OrbitFeatureNodeProps) {
  const cssVars = {
    '--card-accent': feature.color,
    '--card-accent-rgb': feature.rgb,
  } as React.CSSProperties;

  const pos = NODE_POSITIONS[feature.index] || { cardX: 0, cardY: 0 };

  const isCardVisible = isExpanded || isCompleted;

  const nodeStateClasses = [
    `dir-${feature.direction}`,
    isCardVisible ? 'is-visible' : 'is-hidden',
    isActive ? 'is-active' : '',
    isCompleted ? 'is-completed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: `calc(50% + ${pos.cardX}px)`,
    top: `calc(50% + ${pos.cardY}px)`,
    transform: 'translate(-50%, -50%)',
    ...cssVars,
  };

  return (
    <div
      className={`orbit-capsule-card ${nodeStateClasses}`}
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`${feature.title}: ${feature.shortLabel}`}
      title={feature.title}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* ── 1. Circular Glowing Icon Pill Badge on Left (for ALL cards) ── */}
      <div className="card-icon-badge">
        {getIcon(feature.id)}
      </div>

      {/* ── 2. Text Column: Eyebrow + Bold Title ── */}
      <div className="card-text-col">
        <span className="card-eyebrow">{feature.shortLabel}</span>
        <span className="card-title">{feature.title}</span>
      </div>

      {/* ── 3. Gradient-faded, Alive Holographic Watermark on Right ── */}
      <div className="card-watermark" aria-hidden="true">
        {getWatermarkIcon(feature)}
      </div>

      {/* Dynamic shimmer sweep across active card */}
      <div className="card-shimmer-sweep" aria-hidden="true" />
    </div>
  );
}
