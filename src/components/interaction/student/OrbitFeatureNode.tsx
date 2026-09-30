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
        {/* Half-fade, half-visible linear gradient: visible on left, fading to transparent on right */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.75" />
          <stop offset="35%" stopColor={color} stopOpacity="0.45" />
          <stop offset="65%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>

        {/* Luminous stroke gradient with half-fade transition */}
        <linearGradient id={strokeGradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="30%" stopColor={color} stopOpacity="0.55" />
          <stop offset="65%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Unique alive, half-faded emblems WITHOUT enclosing circles */}
      {id === 'non-judgmental' && (
        <g>
          {/* Sacred geometry heart with half-faded resonance wings */}
          <path
            d="M20 33.5l-2.1-1.9C10.5 24.8 5 19.8 5 13.5 5 8.4 9 4.4 14.1 4.4c2.9 0 5.7 1.3 7.4 3.4 1.7-2.1 4.5-3.4 7.4-3.4 5.1 0 9.1 4 9.1 9.1 0 6.3-5.5 11.3-12.9 18.1L20 33.5z"
            fill={`url(#${gradId})`}
            stroke={`url(#${strokeGradId})`}
            strokeWidth="1.2"
          />
          <path
            d="M20 12l2.5 4 4 2.5-4 2.5-2.5 4-2.5-4-4-2.5 4-2.5z"
            fill={color}
            opacity="0.55"
          />
          <circle cx="16" cy="17" r="1.5" fill="#FFFFFF" opacity="0.8" />
        </g>
      )}

      {id === 'own-pace' && (
        <g>
          {/* 8-Point Compass Star with directional ticks (NO enclosing circle) */}
          <path
            d="M20 4v32M4 20h32M8.7 8.7l22.6 22.6M8.7 31.3L31.3 8.7"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <polygon
            points="20,8 23,17 32,20 23,23 20,32 17,23 8,20 17,17"
            fill={`url(#${gradId})`}
            stroke={`url(#${strokeGradId})`}
            strokeWidth="0.8"
          />
          <circle cx="20" cy="20" r="2.2" fill="#FFFFFF" />
        </g>
      )}

      {id === 'concept-clarity' && (
        <g>
          {/* Multi-layered Prism Crystal with refraction facet rays (NO circle) */}
          <path
            d="M20 4l14 8v16l-14 8-14-8V12z"
            fill={`url(#${gradId})`}
            stroke={`url(#${strokeGradId})`}
            strokeWidth="1.2"
          />
          <path
            d="M20 4v32M6 12l14 8 14-8M6 28l14-8 14 8"
            stroke={`url(#${strokeGradId})`}
            strokeWidth="0.9"
            strokeOpacity="0.75"
          />
          <circle cx="17" cy="19" r="2.5" fill="#FFFFFF" opacity="0.85" />
        </g>
      )}

      {id === 'personalized-support' && (
        <g>
          {/* Biometric Resonance Wave & Equalizer Pillars (NO circle) */}
          <rect x="6" y="15" width="3.5" height="10" rx="1.75" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.8" />
          <rect x="12" y="10" width="3.5" height="20" rx="1.75" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.8" />
          <rect x="18" y="5" width="3.5" height="30" rx="1.75" fill={`url(#${gradId})`} stroke={`url(#${strokeGradId})`} strokeWidth="1.2" />
          <rect x="24" y="10" width="3.5" height="20" rx="1.75" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.8" />
          <rect x="30" y="15" width="3.5" height="10" rx="1.75" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.8" />
          <circle cx="19.75" cy="11" r="2.0" fill="#FFFFFF" />
        </g>
      )}

      {id === 'build-confidence' && (
        <g>
          {/* Ascending Victory Trajectory with layered energy shields (NO circle) */}
          <path
            d="M20 5l13 6v10c0 8.5-5.5 14.5-13 17C12.5 35.5 7 29.5 7 21V11z"
            fill={`url(#${gradId})`}
            stroke={`url(#${strokeGradId})`}
            strokeWidth="1.2"
          />
          <path
            d="M12 26l6-6 4 4 8-10M25 14h5v5"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="14" r="1.8" fill="#FFFFFF" />
        </g>
      )}

      {id === 'practice-exam' && (
        <g>
          {/* Precision Target Crosshairs & Metric Status (NO enclosing circle) */}
          <line x1="20" y1="4" x2="20" y2="36" stroke={`url(#${strokeGradId})`} strokeWidth="1.2" />
          <line x1="4" y1="20" x2="36" y2="20" stroke={`url(#${strokeGradId})`} strokeWidth="1.2" />
          <rect x="8" y="14" width="4" height="12" rx="1" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.8" />
          <rect x="14" y="9" width="4" height="17" rx="1" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.8" />
          <rect x="20" y="5" width="4" height="21" rx="1" fill={`url(#${gradId})`} stroke={`url(#${strokeGradId})`} strokeWidth="1.0" />
          <rect x="26" y="12" width="4" height="14" rx="1" fill={`url(#${gradId})`} stroke={color} strokeWidth="0.8" />
          {/* Verified target check */}
          <path d="M15 22l3 3 6-6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {id === 'interactive-learning' && (
        <g>
          {/* Quantum Gyroscopic Ellipses with nucleus (NO outer circle) */}
          <ellipse cx="20" cy="20" rx="16" ry="6" transform="rotate(-30 20 20)" stroke={`url(#${strokeGradId})`} strokeWidth="1.1" />
          <ellipse cx="20" cy="20" rx="16" ry="6" transform="rotate(30 20 20)" stroke={`url(#${strokeGradId})`} strokeWidth="1.1" />
          <ellipse cx="20" cy="20" rx="16" ry="6" transform="rotate(90 20 20)" stroke={color} strokeWidth="0.9" strokeOpacity="0.6" />
          <circle cx="20" cy="20" r="3.2" fill={`url(#${gradId})`} stroke="#FFFFFF" strokeWidth="1.0" />
          <circle cx="16" cy="18" r="1.4" fill="#FFFFFF" />
        </g>
      )}

      {id === 'unlimited-questions' && (
        <g>
          {/* Dual Neural Thought Waveforms with acoustic ripples (NO circle) */}
          <path
            d="M6 18c0-7 6-12 14-12s14 5 14 12c0 3.5-1.5 6.5-4 8.5l2 5.5-6.5-2C23.5 30.7 21.8 31 20 31c-8 0-14-5-14-12z"
            fill={`url(#${gradId})`}
            stroke={`url(#${strokeGradId})`}
            strokeWidth="1.2"
          />
          <path d="M14 18h12M14 14h8M14 22h6" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
        </g>
      )}

      {id === 'study-companion' && (
        <g>
          {/* Chronometer Hour Rays & Solar Flare (NO enclosing circle) */}
          <line x1="20" y1="4" x2="20" y2="10" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="20" y1="30" x2="20" y2="36" stroke={color} strokeWidth="1.0" />
          <line x1="4" y1="20" x2="10" y2="20" stroke={color} strokeWidth="1.0" />
          <line x1="30" y1="20" x2="36" y2="20" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="9" y1="9" x2="13" y2="13" stroke={color} strokeWidth="1.0" />
          <line x1="27" y1="27" x2="31" y2="31" stroke={color} strokeWidth="1.0" />
          {/* Clock hands */}
          <line x1="20" y1="20" x2="20" y2="11" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="20" y1="20" x2="27" y2="20" stroke={`url(#${strokeGradId})`} strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="20" cy="20" r="2.0" fill="#FFFFFF" />
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
      {/* ── 1. Clean Floating Icon (NO circle badge, per user request) ── */}
      <div className="card-icon-bare">
        {getIcon(feature.id)}
      </div>

      {/* ── 2. Text Column: Eyebrow + Bold Title ── */}
      <div className="card-text-col">
        <span className="card-eyebrow">{feature.shortLabel}</span>
        <span className="card-title">{feature.title}</span>
      </div>

      {/* ── 3. Half-faded, Half-visible Holographic Watermark on Right ── */}
      <div className="card-watermark" aria-hidden="true">
        {getWatermarkIcon(feature)}
      </div>

      {/* Dynamic shimmer sweep across active card */}
      <div className="card-shimmer-sweep" aria-hidden="true" />
    </div>
  );
}
