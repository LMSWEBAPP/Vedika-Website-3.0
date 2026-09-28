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
  /**
   * X distance (px) from center to the near edge of the card column lane.
   * Positive = right side, icons/cards mirror for left side.
   */
  cardColumnX: number;
  /**
   * Y position (px) from center for this card's vertical slot.
   */
  cardY: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function getIcon(id: string) {
  switch (id) {
    case 'study-companion':
      return <Clock size={16} strokeWidth={2.4} />;
    case 'non-judgmental':
      return <Heart size={16} strokeWidth={2.4} fill="currentColor" fillOpacity={0.35} />;
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
}

export default function OrbitFeatureNode({
  feature,
  isActive,
  isRevealed,
  cardColumnX,
  cardY,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: OrbitFeatureNodeProps) {
  const isLeft = feature.direction === 'left';
  const isTop = feature.direction === 'top';

  // ── Icon badge: positioned on the orbit ring (iconDx, iconDy from center)
  // The icon badge uses absolute positioning from the stage center
  const iconLeft = `calc(50% + ${feature.iconDx}px - 18px)`; // -18 = half badge width
  const iconTop = `calc(50% + ${feature.iconDy}px - 18px)`; // -18 = half badge height

  // ── Card: positioned in column lane
  // For right cards: card left edge is at cardColumnX from center
  // For left cards: card right edge is at -cardColumnX from center (card left = -cardColumnX - 215px)
  // For top card: card center-X = 0, card bottom = -cardColumnX (use cardColumnX as top spacing)
  const CARD_WIDTH = 215;
  let cardLeft: string;
  let cardTop: string;

  if (isTop) {
    // Center above the orbit ring
    cardLeft = `calc(50% - ${CARD_WIDTH / 2}px)`;
    cardTop = `calc(50% + ${cardY}px - 18px)`;
  } else if (isLeft) {
    // Card extends to the left: right edge at -cardColumnX from center
    cardLeft = `calc(50% - ${cardColumnX}px - ${CARD_WIDTH}px)`;
    cardTop = `calc(50% + ${cardY}px - 24px)`;
  } else {
    // Right cards: left edge at +cardColumnX from center
    cardLeft = `calc(50% + ${cardColumnX}px)`;
    cardTop = `calc(50% + ${cardY}px - 24px)`;
  }

  const stateClass = isActive ? 'is-active' : isRevealed ? 'is-revealed' : 'is-unrevealed';

  return (
    <>
      {/* ── 1. ICON BADGE on the orbit ring ── */}
      <div
        className={`orbit-icon-pin dir-${feature.direction} ${stateClass}`}
        style={
          {
            left: iconLeft,
            top: iconTop,
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
        title={`0${feature.index} • ${feature.title}`}
      >
        <div className="orbit-circle-icon-badge">
          {getIcon(feature.id)}
        </div>
      </div>

      {/* ── 2. CARD in column lane ── */}
      <div
        className={`orbit-card-slot dir-${feature.direction} ${stateClass}`}
        style={
          {
            left: cardLeft,
            top: cardTop,
            '--card-accent': feature.color,
            '--card-accent-rgb': feature.rgb,
          } as React.CSSProperties
        }
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="button"
        tabIndex={-1}
        aria-hidden={!isRevealed}
      >
        {/* Fluid reveal wrapper */}
        <div className="orbit-drawer-track">
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
      </div>
    </>
  );
}
