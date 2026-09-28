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
  const p = { size: 16, strokeWidth: 2.4 } as const;
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

  const nodeStateClasses = [
    `dir-${feature.direction}`,
    isIconVisible ? 'is-icon-visible' : 'is-icon-hidden',
    isExpanded ? 'is-bar-expanded' : 'is-bar-collapsed',
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
      className={`orbit-combined-node ${nodeStateClasses}`}
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`${feature.title}: ${feature.shortLabel}`}
      aria-expanded={isExpanded}
      title={`0${feature.index} • ${feature.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* ── 1. UNIFIED ICON BADGE (centered at node origin) ── */}
      <div className="orbit-combined-badge">
        {getIcon(feature.id)}
      </div>

      {/* ── 2. ATTACHED EXTENDING BAR (grows directly outward from the badge) ── */}
      <div className="orbit-combined-bar">
        <div className="orbit-bar-content">
          <div className="drawer-header-row">
            <span className="drawer-short-tag">{feature.shortLabel}</span>
            <span className="drawer-step-num">0{feature.index}</span>
          </div>
          <div className="drawer-title-text">{feature.title}</div>
          <p className="drawer-desc-text">{feature.desc}</p>
          <div className="drawer-shimmer-sweep" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
