'use client';

import React from 'react';
import {
  Clock, Heart, Sparkles, Compass, Lightbulb,
  Atom, CheckCircle2, Sliders, ShieldCheck,
} from 'lucide-react';
import { StudentOrbitFeature } from './studentOrbitData';

const BADGE_R = 18; // 36px badge / 2

interface OrbitFeatureNodeProps {
  feature: StudentOrbitFeature;
  isActive: boolean;
  isExpanded: boolean;
  isCompleted: boolean;
  /**
   * Icon badge center offset (px) from stage center (50%, 50%).
   * iconCx > 0 = right, iconCy < 0 = up.
   */
  iconCx: number;
  iconCy: number;
  /**
   * CSS style object for the card slot element.
   * Includes positional properties (`left`/`right`, `top`/`bottom`)
   * computed in VedikaOrbitStage so the card aligns perfectly with its icon.
   */
  cardCss: React.CSSProperties;
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
  isExpanded,
  isCompleted,
  iconCx,
  iconCy,
  cardCss,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: OrbitFeatureNodeProps) {
  const iconStateClass = isActive
    ? 'is-active'
    : isCompleted
    ? 'is-completed'
    : 'is-unvisited';

  const slotStateClass = isExpanded
    ? isActive
      ? 'is-expanded is-active'
      : 'is-expanded is-revealed'
    : 'is-collapsed';

  const cssVars = {
    '--card-accent': feature.color,
    '--card-accent-rgb': feature.rgb,
  } as React.CSSProperties;

  // Icon positioned at its center offset from stage center
  const iconStyle: React.CSSProperties = {
    left: `calc(50% + ${iconCx - BADGE_R}px)`,
    top: `calc(50% + ${iconCy - BADGE_R}px)`,
    ...cssVars,
  };

  // Card slot: uses pre-computed cardCss (left/right + top/bottom)
  const slotStyle: React.CSSProperties = {
    position: 'absolute',
    ...cardCss,
    ...cssVars,
  };

  return (
    <>
      {/* ── 1. ICON BADGE on the orbit ring ────────────────────────────── */}
      <div
        className={`orbit-icon-pin dir-${feature.direction} ${iconStateClass}`}
        style={iconStyle}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        aria-label={`${feature.title}: ${feature.shortLabel}`}
        aria-expanded={isExpanded}
        title={`0${feature.index} • ${feature.title}`}
      >
        <div className="orbit-circle-icon-badge">
          {getIcon(feature.id)}
        </div>
      </div>

      {/* ── 2. GLASSMORPHIC CARD aligned with icon ─────────────────────── */}
      <div
        className={`orbit-card-slot dir-${feature.direction} ${slotStateClass}`}
        style={slotStyle}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="region"
        aria-label={`${feature.title} details`}
      >
        <div className="orbit-drawer-card">
          <div className="drawer-header-row">
            <span className="drawer-short-tag">{feature.shortLabel}</span>
            <span className="drawer-step-num">0{feature.index}</span>
          </div>
          <div className="drawer-title-text">{feature.title}</div>
          <p className="drawer-desc-text">{feature.desc}</p>
          <div className="drawer-shimmer-sweep" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
