'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import CentralVedika3D from '../CentralVedika3D';
import OrbitProgressRing from './OrbitProgressRing';
import OrbitFeatureNode from './OrbitFeatureNode';
import {
  STUDENT_ORBIT_FEATURES,
  StudentOrbitFeature,
  LAYOUT,
  ORBIT_SEGMENTS,
  PROGRESS_R,
  ORBIT_CENTER,
  BEAD_START_X,
  BEAD_START_Y,
  ORBIT_TIMINGS,
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
        right: `calc(50% + ${ICON_TO_CARD_EDGE}px)`,
        top: `calc(50% + ${iconCy - Math.ceil(CARD_H / 2)}px)`,
      },
    };
  }

  // TOP card (Feature 01: Non-Judgmental Space)
  return {
    iconCx: 0,
    iconCy: -ICON_TOP_Y,
    cardCss: {
      left: `calc(50% - ${Math.floor(CARD_W / 2)}px)`,
      bottom: `calc(50% + ${TOP_CARD_BOTTOM_ANCHOR}px)`,
    },
  };
}

export default function VedikaOrbitStage() {
  // Active feature spotlight (1..9, starts on Feature 01)
  const [activeStep, setActiveStep] = useState<number>(1);
  // Which feature card is currently expanded (starts NULL — completely collapsed at start!)
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  // Feature nodes that have been completed by the ring (starts empty!)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(() => new Set());
  // Tracks if the sequential animation has permanently finished
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // SVG animated element refs
  const segmentRefs = useRef<(SVGPathElement | null)[]>(new Array(9).fill(null));
  const auraRefs = useRef<(SVGPathElement | null)[]>(new Array(9).fill(null));
  const beadGroupRef = useRef<SVGGElement | null>(null);
  const beadHaloRef = useRef<SVGCircleElement | null>(null);
  const beadCoreRef = useRef<SVGCircleElement | null>(null);

  // Helper to update bead position and color dynamically on GSAP frames
  const updateBead = useCallback((angleDeg: number, r: number, g: number, b: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    const bx = ORBIT_CENTER + PROGRESS_R * Math.cos(rad);
    const by = ORBIT_CENTER + PROGRESS_R * Math.sin(rad);

    if (beadGroupRef.current) {
      beadGroupRef.current.setAttribute('transform', `translate(${bx.toFixed(2)}, ${by.toFixed(2)})`);
    }

    const rgbColor = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    if (beadCoreRef.current) {
      beadCoreRef.current.setAttribute('fill', rgbColor);
    }
    if (beadHaloRef.current) {
      beadHaloRef.current.setAttribute('fill', rgbColor);
    }
  }, []);

  // Construct master GSAP timeline
  const buildTimeline = useCallback(() => {
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setIsAnimationFinished(true);
        // Ensure all 9 segments and auras remain permanently visible as a full spectrum
        segmentRefs.current.forEach((el, idx) => {
          if (el) {
            el.style.strokeDashoffset = '0px';
            el.style.opacity = '1';
            el.style.visibility = 'visible';
          }
          const aura = auraRefs.current[idx];
          if (aura) {
            aura.style.strokeDashoffset = '0px';
            aura.style.opacity = '0.55';
            aura.style.visibility = 'visible';
          }
        });
        // All 9 icons remain illuminated in their completed colors
        setCompletedSteps(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        setActiveStep(0);
        setExpandedStep(null);
        // Softly settle the energy bead into the ring
        if (beadGroupRef.current) {
          gsap.to(beadGroupRef.current, { opacity: 0, duration: 0.6 });
        }
      },
    });

    const C_EXPAND = ORBIT_TIMINGS.CARD_EXPAND / 1000;     // 0.5s
    const C_READ = ORBIT_TIMINGS.CARD_READ / 1000;         // 2.2s
    const C_COLLAPSE = ORBIT_TIMINGS.CARD_COLLAPSE / 1000; // 0.38s
    const S_TRAVEL = ORBIT_TIMINGS.SEGMENT_TRAVEL / 1000;   // 1.2s
    const F_TRAVEL = ORBIT_TIMINGS.FINAL_CLOSING_TRAVEL / 1000; // 1.3s

    // ──────────────────────────────────────────────────────────────────────────
    // STEP 0: First node (Feature 01: Pink, Non-Judgmental Space)
    // ──────────────────────────────────────────────────────────────────────────
    tl.call(() => {
      setActiveStep(1);
      setExpandedStep(1);
      // Touched node immediately remains illuminated
      setCompletedSteps((prev) => new Set(prev).add(1));
    });
    // Expansion & reading pause for first card
    tl.to({}, { duration: C_EXPAND + C_READ });
    // Collapse first card smoothly
    tl.call(() => {
      setExpandedStep(null);
    });
    tl.to({}, { duration: C_COLLAPSE });

    // ──────────────────────────────────────────────────────────────────────────
    // STEPS 1 through 7: Segments connecting Node 1 → 2 → 3 → ... → 9
    // As the energy point travels, the ring segment paints dynamically behind it!
    // ──────────────────────────────────────────────────────────────────────────
    for (let i = 0; i < 8; i++) {
      const seg = ORBIT_SEGMENTS[i];
      const targetFeatureIndex = i + 2; // 1-based index of arriving node (2..9)
      const travelLabel = `seg-travel-${i}`;

      const beadState = {
        angle: seg.startAngleDeg,
        r: seg.fromRgb[0],
        g: seg.fromRgb[1],
        b: seg.fromRgb[2],
      };

      tl.addLabel(travelLabel);

      // Move energy bead along the circular path while simultaneously painting the stroke
      tl.to(
        beadState,
        {
          angle: seg.startAngleDeg + seg.spanDeg,
          r: seg.toRgb[0],
          g: seg.toRgb[1],
          b: seg.toRgb[2],
          duration: S_TRAVEL,
          ease: 'power2.inOut',
          onStart: () => {
            const pathEl = segmentRefs.current[i];
            const auraEl = auraRefs.current[i];
            if (pathEl) {
              pathEl.style.visibility = 'visible';
              pathEl.style.opacity = '1';
            }
            if (auraEl) {
              auraEl.style.visibility = 'visible';
              auraEl.style.opacity = '0.55';
            }
          },
          onUpdate: () => {
            // Update bead coordinates and color on this frame
            updateBead(beadState.angle, beadState.r, beadState.g, beadState.b);
            // Synchronously paint the segment stroke with the moving point
            const p = (beadState.angle - seg.startAngleDeg) / seg.spanDeg;
            const progress = Math.max(0, Math.min(1, p));
            const currentOffset = seg.arcLength * (1 - progress);
            const pathEl = segmentRefs.current[i];
            const auraEl = auraRefs.current[i];
            if (pathEl) {
              pathEl.style.strokeDashoffset = `${currentOffset.toFixed(2)}px`;
            }
            if (auraEl) {
              auraEl.style.strokeDashoffset = `${currentOffset.toFixed(2)}px`;
            }
          },
          onComplete: () => {
            // Lock completed segment at 100% drawn
            const pathEl = segmentRefs.current[i];
            const auraEl = auraRefs.current[i];
            if (pathEl) {
              pathEl.style.strokeDashoffset = '0px';
            }
            if (auraEl) {
              auraEl.style.strokeDashoffset = '0px';
            }
          },
        },
        travelLabel
      );

      // Energy point arrives at next node! Node activates, card unfolds, node stays illuminated
      tl.call(() => {
        setActiveStep(targetFeatureIndex);
        setExpandedStep(targetFeatureIndex);
        setCompletedSteps((prev) => new Set(prev).add(targetFeatureIndex));
      });

      // Card reading duration
      tl.to({}, { duration: C_EXPAND + C_READ });

      // Collapse card smoothly before next segment starts drawing
      tl.call(() => {
        setExpandedStep(null);
      });
      tl.to({}, { duration: C_COLLAPSE });
    }

    // ──────────────────────────────────────────────────────────────────────────
    // STEP 8: Final Closing Segment (Node 9 back to Node 1, completing 360°)
    // ──────────────────────────────────────────────────────────────────────────
    const finalSeg = ORBIT_SEGMENTS[8];
    const finalLabel = 'seg-travel-final';

    const finalBeadState = {
      angle: finalSeg.startAngleDeg,
      r: finalSeg.fromRgb[0],
      g: finalSeg.fromRgb[1],
      b: finalSeg.fromRgb[2],
    };

    tl.addLabel(finalLabel);

    tl.to(
      finalBeadState,
      {
        angle: finalSeg.startAngleDeg + finalSeg.spanDeg,
        r: finalSeg.toRgb[0],
        g: finalSeg.toRgb[1],
        b: finalSeg.toRgb[2],
        duration: F_TRAVEL,
        ease: 'power2.inOut',
        onStart: () => {
          const pathEl = segmentRefs.current[8];
          const auraEl = auraRefs.current[8];
          if (pathEl) {
            pathEl.style.visibility = 'visible';
            pathEl.style.opacity = '1';
          }
          if (auraEl) {
            auraEl.style.visibility = 'visible';
            auraEl.style.opacity = '0.55';
          }
        },
        onUpdate: () => {
          updateBead(finalBeadState.angle, finalBeadState.r, finalBeadState.g, finalBeadState.b);
          const p = (finalBeadState.angle - finalSeg.startAngleDeg) / finalSeg.spanDeg;
          const progress = Math.max(0, Math.min(1, p));
          const currentOffset = finalSeg.arcLength * (1 - progress);
          const pathEl = segmentRefs.current[8];
          const auraEl = auraRefs.current[8];
          if (pathEl) {
            pathEl.style.strokeDashoffset = `${currentOffset.toFixed(2)}px`;
          }
          if (auraEl) {
            auraEl.style.strokeDashoffset = `${currentOffset.toFixed(2)}px`;
          }
        },
        onComplete: () => {
          const pathEl = segmentRefs.current[8];
          const auraEl = auraRefs.current[8];
          if (pathEl) {
            pathEl.style.strokeDashoffset = '0px';
          }
          if (auraEl) {
            auraEl.style.strokeDashoffset = '0px';
          }
        },
      },
      finalLabel
    );

    return tl;
  }, [updateBead]);

  // Clean initialization & playback lifecycle (StrictMode safe)
  useEffect(() => {
    let isDisposed = false;

    // Reset all 9 segments to empty initial state
    segmentRefs.current.forEach((el, idx) => {
      const seg = ORBIT_SEGMENTS[idx];
      if (el && seg) {
        el.style.strokeDasharray = `${seg.arcLength}px ${seg.arcLength}px`;
        el.style.strokeDashoffset = `${seg.arcLength}px`;
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
      }
    });
    auraRefs.current.forEach((el, idx) => {
      const seg = ORBIT_SEGMENTS[idx];
      if (el && seg) {
        el.style.strokeDasharray = `${seg.arcLength}px ${seg.arcLength}px`;
        el.style.strokeDashoffset = `${seg.arcLength}px`;
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
      }
    });

    // Reset bead to starting position (Node 1 Pink)
    const firstSeg = ORBIT_SEGMENTS[0];
    updateBead(firstSeg.startAngleDeg, firstSeg.fromRgb[0], firstSeg.fromRgb[1], firstSeg.fromRgb[2]);
    if (beadGroupRef.current) {
      beadGroupRef.current.style.opacity = '1';
    }

    const tl = buildTimeline();
    timelineRef.current = tl;

    // Start playing after a 250ms initialization pause
    const startTimer = setTimeout(() => {
      if (!isDisposed) {
        tl.play();
      }
    }, 250);

    return () => {
      isDisposed = true;
      clearTimeout(startTimer);
      tl.kill();
    };
  }, [buildTimeline, updateBead]);

  // Click handler: user can inspect any feature card at leisure
  const handleCardClick = (stepIndex: number) => {
    if (!isAnimationFinished) {
      // If user clicks an icon during autoplay, finish ring drawing and let user inspect
      timelineRef.current?.pause();
      setIsAnimationFinished(true);
      segmentRefs.current.forEach((el) => {
        if (el) {
          el.style.strokeDashoffset = '0px';
          el.style.opacity = '1';
          el.style.visibility = 'visible';
        }
      });
      auraRefs.current.forEach((el) => {
        if (el) {
          el.style.strokeDashoffset = '0px';
          el.style.opacity = '0.55';
          el.style.visibility = 'visible';
        }
      });
      setCompletedSteps(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
      if (beadGroupRef.current) {
        beadGroupRef.current.style.opacity = '0';
      }
    }

    setActiveStep(stepIndex);
    // Toggle expand: if clicked again, collapses; if new, expands
    setExpandedStep((prev) => (prev === stepIndex ? null : stepIndex));
  };

  const handleCardMouseEnter = (stepIndex: number) => {
    if (isAnimationFinished) {
      setActiveStep(stepIndex);
      setExpandedStep(stepIndex);
    }
  };

  return (
    <div
      ref={stageRef}
      className="vedika-orbit-stage-clean"
      role="region"
      aria-label="Student Learning Ecosystem 360-Degree Circular Orbit"
    >
      {/* ── CENTER: 3D BOT + PROGRESSIVE MULTICOLOR RING ───────────────── */}
      <div className="vedika-center-pod-clean">
        {/* SVG Progress Ring with 9 individual multicolor arc segments + energy bead */}
        <div className="vedika-ring-wrap">
          <OrbitProgressRing
            segmentRefs={segmentRefs}
            auraRefs={auraRefs}
            beadGroupRef={beadGroupRef}
            beadHaloRef={beadHaloRef}
            beadCoreRef={beadCoreRef}
          />
        </div>

        {/* Central 3D Vedika Robot Canvas */}
        <div className="vedika-robot-canvas-box">
          <CentralVedika3D />
        </div>
      </div>

      {/* ── 9 ORBITAL NODES (Pins & Cards) ──────────────────────────────── */}
      <div className="vedika-orbit-nodes-layer">
        {STUDENT_ORBIT_FEATURES.map((feat: StudentOrbitFeature) => {
          const { iconCx, iconCy, cardCss } = getPositions(feat);
          const isCurrentActive = feat.index === activeStep;
          const isCurrentlyExpanded = feat.index === expandedStep;
          const isAlreadyCompleted = completedSteps.has(feat.index);

          return (
            <OrbitFeatureNode
              key={feat.id}
              feature={feat}
              isActive={isCurrentActive}
              isExpanded={isCurrentlyExpanded}
              isCompleted={isAlreadyCompleted}
              iconCx={iconCx}
              iconCy={iconCy}
              cardCss={cardCss}
              onClick={() => handleCardClick(feat.index)}
              onMouseEnter={() => handleCardMouseEnter(feat.index)}
              onMouseLeave={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
}
