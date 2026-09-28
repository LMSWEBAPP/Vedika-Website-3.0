'use client';

import React from 'react';
import {
  Clock,
  Heart,
  Sparkles,
  Compass,
  Lightbulb,
  Atom,
  CheckCircle2,
  Sliders,
  ShieldCheck,
} from 'lucide-react';
import { StudentOrbitFeature } from './studentOrbitData';

interface OrbitFeatureNodeProps {
  feature: StudentOrbitFeature;
  isActive: boolean;
  isRevealed: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function OrbitFeatureNode({
  feature,
  isActive,
  isRevealed,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: OrbitFeatureNodeProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'study-companion':
        return <Clock size={15} strokeWidth={2.4} />;
      case 'non-judgmental':
        return <Heart size={15} strokeWidth={2.4} fill="currentColor" fillOpacity={0.35} />;
      case 'own-pace':
        return <Compass size={15} strokeWidth={2.4} />;
      case 'concept-clarity':
        return <Lightbulb size={15} strokeWidth={2.4} />;
      case 'personalized-support':
        return <Sliders size={15} strokeWidth={2.4} />;
      case 'build-confidence':
        return <ShieldCheck size={15} strokeWidth={2.4} />;
      case 'practice-exam':
        return <CheckCircle2 size={15} strokeWidth={2.4} />;
      case 'interactive-learning':
        return <Atom size={15} strokeWidth={2.4} />;
      case 'unlimited-questions':
        return <Sparkles size={15} strokeWidth={2.4} />;
      default:
        return <Sparkles size={15} strokeWidth={2.4} />;
    }
  };

  return (
    <div
      className={`orbital-node-anchor dir-${feature.direction} ${
        isActive ? 'is-active' : ''
      } ${isRevealed ? 'is-revealed' : 'is-unrevealed'}`}
      style={
        {
          left: `calc(50% + ${feature.dx}px)`,
          top: `calc(50% + ${feature.dy}px)`,
          '--card-accent': feature.color,
          '--card-accent-rgb': feature.rgb,
        } as React.CSSProperties
      }
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
    >
      {/* 1. Icon Badge (Anchored on the circular orbit ring) */}
      <div className="orbit-circle-icon-badge" title={`0${feature.index} • ${feature.title}`}>
        {getIcon(feature.id)}
      </div>

      {/* 2. Text Content Drawer (Flows outward from the icon) */}
      <div className="orbit-drawer-card">
        <div className="drawer-header-row">
          <span className="drawer-short-tag">{feature.shortLabel}</span>
          <span className="drawer-step-num">0{feature.index}</span>
        </div>
        <div className="drawer-title-text">{feature.title}</div>
        <p className="drawer-desc-text">{feature.desc}</p>

        {/* Fluid Neon Sweep Wave on Reveal */}
        <div className="drawer-shimmer-sweep" aria-hidden="true" />
      </div>
    </div>
  );
}
