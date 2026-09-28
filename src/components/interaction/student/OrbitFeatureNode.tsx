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
} from 'lucide-react';
import { StudentOrbitFeature } from './studentOrbitData';

interface OrbitFeatureNodeProps {
  feature: StudentOrbitFeature;
  isActive: boolean;
  isRevealed: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function OrbitFeatureNode({
  feature,
  isActive,
  isRevealed,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: OrbitFeatureNodeProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'study-companion':
        return <Clock size={14} strokeWidth={2.4} />;
      case 'non-judgmental':
        return <Heart size={14} strokeWidth={2.4} fill="currentColor" fillOpacity={0.25} />;
      case 'unlimited-questions':
        return <Sparkles size={14} strokeWidth={2.4} />;
      case 'own-pace':
        return <Compass size={14} strokeWidth={2.4} />;
      case 'concept-clarity':
        return <Lightbulb size={14} strokeWidth={2.4} />;
      case 'interactive-learning':
        return <Atom size={14} strokeWidth={2.4} />;
      case 'practice-exam':
        return <CheckCircle2 size={14} strokeWidth={2.4} />;
      case 'personalized-support':
        return <Sliders size={14} strokeWidth={2.4} />;
      default:
        return <Sparkles size={14} strokeWidth={2.4} />;
    }
  };

  return (
    <button
      type="button"
      className={`orbit-node-card ${feature.positionClass} ${isActive ? 'is-active' : ''} ${
        isRevealed ? 'is-revealed' : 'is-dim'
      } ${isHovered ? 'is-hovered' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={`Capability 0${feature.index}: ${feature.title}. ${feature.shortLabel}.`}
      aria-selected={isActive}
      role="tab"
      style={{
        '--node-color': feature.color,
        '--node-rgb': feature.rgb,
      } as React.CSSProperties}
    >
      {/* Orbital Anchor Pip */}
      <span className="node-orbital-pip" aria-hidden="true" />

      {/* Top Floating Badge with Icon & Step Index */}
      <div className="node-icon-badge">
        {getIcon(feature.id)}
        <span className="node-step-num">0{feature.index}</span>
      </div>

      {/* Node Content Header */}
      <div className="node-text-wrap">
        <div className="node-header-row">
          <span className="node-short-tag">{feature.shortLabel}</span>
          {isActive && <span className="node-live-pulse" title="Active capability" />}
        </div>
        <div className="node-title">{feature.title}</div>
        <p className="node-desc">{feature.desc}</p>
      </div>

      {/* Active Accent Glow Underlay */}
      {isActive && <span className="node-active-glow-aura" aria-hidden="true" />}
    </button>
  );
}
