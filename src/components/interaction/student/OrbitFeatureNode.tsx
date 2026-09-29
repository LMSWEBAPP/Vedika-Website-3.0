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

function getWatermarkIcon(id: string) {
  switch (id) {
    case 'non-judgmental':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.22">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      );
    case 'own-pace':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.22">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      );
    case 'concept-clarity':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.22">
          <path d="m12 2 10 6.5-10 6.5-10-6.5L12 2z"/>
          <path d="m2 14 10 6.5 10-6.5"/>
        </svg>
      );
    case 'personalized-support':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.22">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      );
    case 'build-confidence':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
      );
    case 'practice-exam':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.22">
          <rect x="3" y="14" width="4" height="8" rx="1"/>
          <rect x="10" y="8" width="4" height="14" rx="1"/>
          <rect x="17" y="3" width="4" height="19" rx="1"/>
        </svg>
      );
    case 'interactive-learning':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.22">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 12 12 17 22 12"/>
          <polyline points="2 17 12 22 22 17"/>
        </svg>
      );
    case 'unlimited-questions':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.22">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      );
    case 'study-companion':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.22">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      );
    default:
      return null;
  }
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

      {/* ── 3. Faint Watermark Illustration on Right ── */}
      <div className="card-watermark" aria-hidden="true">
        {getWatermarkIcon(feature.id)}
      </div>

      {/* Dynamic shimmer sweep across active card */}
      <div className="card-shimmer-sweep" aria-hidden="true" />
    </div>
  );
}
