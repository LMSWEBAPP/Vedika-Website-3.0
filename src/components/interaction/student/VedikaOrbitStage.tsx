'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import CentralVedika3D from '../CentralVedika3D';
import OrbitProgressRing from './OrbitProgressRing';
import OrbitFeatureNode from './OrbitFeatureNode';
import {
  STUDENT_ORBIT_FEATURES,
  StudentOrbitFeature,
  LAYOUT,
  BEAD_ANGLES,
  STEP_MS,
} from './studentOrbitData';
import '@/styles/student-orbit.css';

const {
  ICON_SIDE_X,  // 130
  ICON_TOP_Y,   // 120
  BADGE_R,      // 18
  CARD_GAP,     // 10
  CARD_W,       // 215
  CARD_H,       // 54
  ROW_Y,        // [-120, -40, 40, 120]
} = LAYOUT;

// Distance from stage center to near edge of card (icon center + badge radius + gap)
const ICON_TO_CARD_EDGE = ICON_SIDE_X + BADGE_R + CARD_GAP; // 130 + 18 + 10 = 158px

// Top card bottom-anchor distance from stage center (icon center + badge radius + gap)
const TOP_CARD_BOTTOM_ANCHOR = ICON_TOP_Y + BADGE_R + CARD_GAP; // 120 + 18 + 10 = 148px

/**
 * Compute exact pixel-positions for icon badge and card slot.
 *
 * Alignment guarantee:
 *   For left/right cards: iconCy === cardCenterY === ROW_Y[cardRow].
 *   Icon and card are always at the same vertical position.
 *
 * Animation direction (via CSS anchor):
 *   dir-right → slot left-anchored  → max-width grows RIGHTWARD from icon ✓
 *   dir-left  → slot right-anchored → max-width grows LEFTWARD  from icon ✓
 *   dir-top   → slot bottom-anchored → max-height grows UPWARD   from icon ✓
 */
function getPositions(feat: StudentOrbitFeature): {
  iconCx: number;
  iconCy: number;
  cardCss: React.CSSProperties;
} {
  if (feat.direction === 'right') {
    const iconCy = ROW_Y[feat.cardRow];
    return {
      iconCx: ICON_SIDE_X,
      iconCy,
      cardCss: {
        left: `calc(50% + ${ICON_TO_CARD_EDGE}px)`,
        top: `calc(50% + ${iconCy - Math.ceil(CARD_H / 2)}px)`,
      },
    };
  }

  if (feat.direction === 'left') {
    const iconCy = ROW_Y[feat.cardRow];
    return {
      iconCx: -ICON_SIDE_X,
      iconCy,
      cardCss: {
        // right-anchor: card right edge is fixed at icon left edge − gap
        // growing max-width expands the card leftward (away from icon) ✓
        right: `calc(50% + ${ICON_TO_CARD_EDGE}px)`,
        top: `calc(50% + ${iconCy - Math.ceil(CARD_H / 2)}px)`,
      },
    };
  }

  // TOP card
  return {
    iconCx: 0,
    iconCy: -ICON_TOP_Y,
    cardCss: {
      left: `calc(50% - ${Math.floor(CARD_W / 2)}px)`,
      // bottom-anchor: card bottom edge is fixed just above icon top edge
      // growing max-height expands the card upward (away from icon) ✓
      bottom: `calc(50% + ${TOP_CARD_BOTTOM_ANCHOR}px)`,
    },
  };
}

export default function VedikaOrbitStage() {
  // All 9 cards are visible from the start — only the active spotlight cycles.
  // This creates a single smooth loop (not a reveal loop then a cycling loop).
  const [activeStep, setActiveStep] = useState<number>(1);
  const isHoveredRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeFeature = STUDENT_ORBIT_FEATURES[activeStep - 1] ?? STUDENT_ORBIT_FEATURES[0];

  // Advance active spotlight one step forward, wrapping 9 → 1
  const advance = useCallback(() => {
    setActiveStep((a) => (a >= 9 ? 1 : a + 1));
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) advance();
    }, STEP_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeStep, advance]);

  const handleCardClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <div
      className="vedika-orbit-stage-clean"
      role="region"
      aria-label="Student Learning Ecosystem 360-Degree Circular Orbit"
    >
      {/* ── CENTER: 3D BOT + PROGRESS RING ─────────────────────────────── */}
      <div className="vedika-center-pod-clean">
        {/* Ambient aura that breathes with the active feature color */}
        <div
          className="vedika-ambient-aura"
          style={{
            background: `radial-gradient(circle, ${activeFeature.color}1E 0%, rgba(56,189,248,0.04) 55%, transparent 75%)`,
          }}
          aria-hidden="true"
        />

        {/* SVG progress ring — continuously sweeping arc + energy bead */}
        <div className="vedika-ring-wrap">
          <OrbitProgressRing
            activeColor={activeFeature.color}
            beadAngleDeg={BEAD_ANGLES[activeStep] ?? 270}
          />
        </div>

        {/* Central 3D Vedika Robot */}
        <div className="vedika-robot-canvas-box">
          <CentralVedika3D />
        </div>
      </div>

      {/* ── 9 ORBITAL NODES (all always visible, active spotlight cycles) ─ */}
      <div className="vedika-orbit-nodes-layer">
        {STUDENT_ORBIT_FEATURES.map((feat: StudentOrbitFeature) => {
          const { iconCx, iconCy, cardCss } = getPositions(feat);
          return (
            <OrbitFeatureNode
              key={feat.id}
              feature={feat}
              isActive={feat.index === activeStep}
              isRevealed={true}         // all cards always revealed (single loop)
              iconCx={iconCx}
              iconCy={iconCy}
              cardCss={cardCss}
              onClick={() => handleCardClick(feat.index)}
              onMouseEnter={() => {
                isHoveredRef.current = true;
                setActiveStep(feat.index);
              }}
              onMouseLeave={() => {
                isHoveredRef.current = false;
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
