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
        return <Clock size={16} strokeWidth={2.4} />;
      case 'non-judgmental':
        return <Heart size={16} strokeWidth={2.4} fill="currentColor" fillOpacity={0.3} />;
      case 'own-pace':
        return <Compass size={16} strokeWidth={2.4} />;
      case 'concept-clarity':
        return <Lightbulb size={16} strokeWidth={2.4} />;
      case 'personalized-support':
        return <Sliders size={16} strokeWidth={2.4} />;
      case 'build-confidence':
        return <ShieldCheck size={16} strokeWidth={2.4} />;
      case 'practice-exam':
        return <CheckCircle2 size={16} strokeWidth={2.4} />;
      case 'interactive-learning':
        return <Atom size={16} strokeWidth={2.4} />;
      case 'unlimited-questions':
        return <Sparkles size={16} strokeWidth={2.4} />;
      default:
        return <Sparkles size={16} strokeWidth={2.4} />;
    }
  };

  return (
    <div
      className={`glass-orbit-card ${feature.positionClass} ${isActive ? 'is-active' : ''} ${
        isRevealed ? 'is-revealed' : 'is-unrevealed'
      }`}
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
      aria-label={`Capability 0${feature.index}: ${feature.title}. ${feature.shortLabel}.`}
      aria-selected={isActive}
      style={{
        '--card-accent': feature.color,
        '--card-accent-rgb': feature.rgb,
      } as React.CSSProperties}
    >
      {/* 1. Left Icon Container (appears first) */}
      <div className="card-icon-container">
        <div className="card-icon-inner">{getIcon(feature.id)}</div>
      </div>

      {/* 2. Right Text Container (comes to the right side of the icon) */}
      <div className="card-text-container">
        <div className="card-tag-row">
          <span className="card-short-label">{feature.shortLabel}</span>
          <span className="card-step-badge">0{feature.index}</span>
        </div>
        <div className="card-title-text">{feature.title}</div>
        <p className="card-desc-text">{feature.desc}</p>
      </div>

      {/* 3. Neon Bloom Halo */}
      {isActive && <div className="card-neon-bloom-halo" aria-hidden="true" />}
    </div>
  );
}
