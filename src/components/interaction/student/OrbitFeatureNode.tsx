'use client';

import React from 'react';
import {
  Clock, Heart, Sparkles, Compass, Lightbulb,
  Atom, CheckCircle2, Sliders, ShieldCheck,
} from 'lucide-react';
import { StudentOrbitFeature } from './studentOrbitData';

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
  const p = { size: 17, strokeWidth: 2.3 } as const;
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

export default function OrbitFeatureNode({
  feature,
  isActive,
  isIconVisible,
  isExpanded,
  isCompleted,
  iconCx,
  iconCy,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: OrbitFeatureNodeProps) {
  const cssVars = {
    '--card-accent': feature.color,
    '--card-accent-rgb': feature.rgb,
  } as React.CSSProperties;

  const isLeftSide = feature.direction === 'left'; // Points 6, 7, 8, 9

  const nodeStateClasses = [
    `dir-${feature.direction}`,
    isLeftSide ? 'align-right' : 'align-left',
    isIconVisible ? 'is-visible' : 'is-hidden',
    isExpanded ? 'is-expanded' : 'is-compact',
    isActive ? 'is-active' : '',
    isCompleted ? 'is-completed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: `calc(50% + ${iconCx}px)`,
    top: `calc(50% + ${iconCy}px)`,
    ...cssVars,
  };

  return (
    <div
      className={`orbit-unified-bar ${nodeStateClasses}`}
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`${feature.title}: ${feature.shortLabel}`}
      aria-expanded={isExpanded}
      title={feature.title}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* ── ICON ON LEFT FOR RIGHT & TOP ORIENTED BARS (Points 1, 2, 3, 4, 5) ── */}
      {!isLeftSide && (
        <div className="bar-icon-box">
          {getIcon(feature.id)}
        </div>
      )}

      {/* ── EXPANDING CONTENT BOX (Tag, Title, Description — NO numbers) ── */}
      <div className={`bar-content-box ${isLeftSide ? 'text-align-right' : 'text-align-left'}`}>
        <div className="drawer-header-row">
          <span className="drawer-short-tag">{feature.shortLabel}</span>
        </div>
        <div className="drawer-title-text">{feature.title}</div>
        <p className="drawer-desc-text">{feature.desc}</p>
      </div>

      {/* ── ICON ON RIGHT FOR LEFT ORIENTED BARS (Points 6, 7, 8, 9) ── */}
      {isLeftSide && (
        <div className="bar-icon-box">
          {getIcon(feature.id)}
        </div>
      )}

      {/* Dynamic shimmer sweep across active bar */}
      <div className="drawer-shimmer-sweep" aria-hidden="true" />
    </div>
  );
}
