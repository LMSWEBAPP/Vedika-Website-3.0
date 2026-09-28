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
} from './studentOrbitData';
import '@/styles/student-orbit.css';

const {
  ICON_SIDE_X,  // 130
  ICON_TOP_Y,   // 128
  BADGE_R,      // 18
  CARD_GAP,     // 10
  CARD_W,       // 215
  CARD_H,       // 54
  ROW_Y,        // [-111, -37, 37, 111]
} = LAYOUT;

/**
 * Distance from stage center to the near edge of each card.
 * = icon center X + badge radius + gap
 * = 130 + 18 + 10 = 158px
 */
const ICON_TO_CARD_EDGE = ICON_SIDE_X + BADGE_R + CARD_GAP;

/**
 * Compute exact pixel-positions for icon badge center and card slot.
 *
 * Key alignment rule:
 *   iconCy === card vertical center Y for all left/right cards.
 *   This ensures the card is perfectly horizontally aligned with its icon.
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
        // Card left edge = icon right edge + gap → grows RIGHT from icon
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
        // Card right edge = icon left edge - gap → grows LEFT from icon
        // Using CSS `right` so the card's right edge is the anchor.
        // right: calc(50% + 158px) means right edge is 158px left of center.
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
      // Horizontally centered
      left: `calc(50% - ${Math.floor(CARD_W / 2)}px)`,
      // bottom: slot's bottom edge is just above the icon's top edge
      // bottom = ICON_TOP_Y + BADGE_R + CARD_GAP = 128+18+10 = 156px above center
      // Using CSS `bottom` so the slot grows UPWARD from the icon as max-height increases.
      bottom: `calc(50% + ${ICON_TOP_Y + BADGE_R + CARD_GAP}px)`,
    },
  };
}

export default function VedikaOrbitStage() {
  const [revealedCount, setRevealedCount] = useState<number>(1);
  const [activeStep, setActiveStep] = useState<number>(1);
  const isHoveredRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeFeature = STUDENT_ORBIT_FEATURES[activeStep - 1] ?? STUDENT_ORBIT_FEATURES[0];

  const advance = useCallback(() => {
    setRevealedCount((prev) => {
      if (prev < 9) {
        const next = prev + 1;
        setActiveStep(next);
        return next;
      }
      setActiveStep((a) => (a >= 9 ? 1 : a + 1));
      return 9;
    });
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) advance();
    }, 2500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [revealedCount, activeStep, advance]);

  const handleCardClick = (index: number) => {
    setActiveStep(index);
    if (index > revealedCount) setRevealedCount(index);
  };

  return (
    <div
      className="vedika-orbit-stage-clean"
      role="region"
      aria-label="Student Learning Ecosystem 360-Degree Circular Orbit"
    >
      {/* ── CENTER: 3D BOT + PROGRESS RING ─────────────────────────────── */}
      <div className="vedika-center-pod-clean">
        {/* Ambient radial aura that changes color with active step */}
        <div
          className="vedika-ambient-aura"
          style={{
            background: `radial-gradient(circle, ${activeFeature.color}1E 0%, rgba(56,189,248,0.04) 55%, transparent 75%)`,
          }}
          aria-hidden="true"
        />

        {/* SVG progress ring with energy bead */}
        <div className="vedika-ring-wrap">
          <OrbitProgressRing
            currentStep={activeStep}
            activeColor={activeFeature.color}
            beadAngleDeg={BEAD_ANGLES[activeStep] ?? 270}
          />
        </div>

        {/* Central 3D Vedika Robot */}
        <div className="vedika-robot-canvas-box">
          <CentralVedika3D />
        </div>
      </div>

      {/* ── 9 ORBITAL NODES ─────────────────────────────────────────────── */}
      <div className="vedika-orbit-nodes-layer">
        {STUDENT_ORBIT_FEATURES.map((feat: StudentOrbitFeature) => {
          const { iconCx, iconCy, cardCss } = getPositions(feat);
          return (
            <OrbitFeatureNode
              key={feat.id}
              feature={feat}
              isActive={feat.index === activeStep}
              isRevealed={feat.index <= revealedCount}
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
