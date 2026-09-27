'use client';

import React, { useState } from 'react';
import { useInteraction } from '@/hooks/useInteraction';
import {
  HelpCircle,
  FileCheck2,
  BrainCircuit,
  Sparkles,
  Clock,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

export function TeacherDilemmaSection() {
  const { scrollProgress } = useInteraction();

  // Active during Page 5 (The Problem) and Page 6 (Vedika Arrives & Solves It)
  const isSectionActive = scrollProgress >= 3.4;

  // STRICT TIMING CONSTRAINT:
  // Vedika moves from background between scrollProgress 4.20 -> 4.80.
  // Until Vedika has fully arrived (scrollProgress >= 4.80), the teacher MUST stay sad!
  // Only AFTER Vedika has arrived fully behind the teacher (4.80 -> 5.00), the teacher changes expression to happy!
  const rawExpression = Math.max(0, Math.min(1, (scrollProgress - 4.80) / 0.20));
  const expressionEase = rawExpression * rawExpression * (3 - 2 * rawExpression); // Smooth cubic ease
  const isSolutionStage = expressionEase > 0.45;

  // Hover and Click state for interactive card drawer expansion
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);
  const [leftClicked, setLeftClicked] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);

  const isLeftOpen = leftHovered || leftClicked;
  const isRightOpen = rightHovered || rightClicked;

  if (!isSectionActive) return null;

  return (
    <section
      aria-label="Teacher Empowerment Journey"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* BACKGROUND ATMOSPHERIC RADIAL GLOW */}
      <div
        style={{
          position: 'absolute',
          top: '46%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: isSolutionStage
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.20) 0%, rgba(59, 130, 246, 0.14) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(239, 68, 68, 0.16) 0%, rgba(245, 158, 11, 0.08) 40%, transparent 70%)',
          filter: 'blur(80px)',
          transition: 'background 0.8s ease',
          pointerEvents: 'none',
          zIndex: 8,
        }}
      />

      {/* TOP NARRATIVE STATUS PILL */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(5.0rem, 10vh, 6.5rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '6px 18px',
          borderRadius: '20px',
          background: isSolutionStage
            ? 'rgba(16, 185, 129, 0.12)'
            : 'rgba(239, 68, 68, 0.12)',
          border: isSolutionStage
            ? '1px solid rgba(16, 185, 129, 0.35)'
            : '1px solid rgba(239, 68, 68, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 25,
          pointerEvents: 'none',
          transition: 'all 0.5s ease',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: isSolutionStage ? '#10B981' : '#EF4444',
            boxShadow: isSolutionStage
              ? '0 0 10px #10B981'
              : '0 0 10px #EF4444',
          }}
        />
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: isSolutionStage ? '#34D399' : '#FCA5A5',
          }}
        >
          {isSolutionStage ? 'Vedika Solves The Dilemma' : 'The Educator’s Daily Burden'}
        </span>
      </div>

      {/* ===================================================================== */}
      {/* 1. LEFT CARD: OUTER BOX -> INNER BOX SLIDES OUT SEAMLESSLY FROM BELOW */}
      {/* ===================================================================== */}
      <div
        className="card-dock left-dock"
        onMouseEnter={() => setLeftHovered(true)}
        onMouseLeave={() => setLeftHovered(false)}
        onClick={() => setLeftClicked((prev) => !prev)}
        style={{
          position: 'absolute',
          left: 'clamp(2rem, 7.5vw, 8.5rem)',
          top: '48%',
          transform: 'translateY(-50%)',
          pointerEvents: 'auto',
          zIndex: 20,
          cursor: 'pointer',
        }}
      >
        <div className={`card-shell ${isLeftOpen ? 'is-open' : ''}`}>
          {/* A. OUTER BOX (TOP PRIMARY CARD) */}
          <div
            className="outer-box"
            style={{
              background: isSolutionStage
                ? 'linear-gradient(135deg, #064E3B 0%, #047857 100%)'
                : 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)',
              border: isSolutionStage
                ? '1px solid rgba(52, 211, 153, 0.45)'
                : '1px solid rgba(248, 113, 113, 0.45)',
              borderBottomLeftRadius: isLeftOpen ? '0px' : '20px',
              borderBottomRightRadius: isLeftOpen ? '0px' : '20px',
              boxShadow: isSolutionStage
                ? '0 15px 35px rgba(6, 78, 59, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                : '0 15px 35px rgba(127, 29, 29, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              transition: 'background 0.5s ease, border-color 0.5s ease, border-radius 0.35s ease, box-shadow 0.5s ease',
            }}
          >
            <div className="icon-badge" style={{ background: isSolutionStage ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)' }}>
              {isSolutionStage ? (
                <BrainCircuit size={36} color="#6EE7B7" />
              ) : (
                <HelpCircle size={36} color="#FCA5A5" />
              )}
            </div>
            <h4 className="box-title">
              {isSolutionStage ? 'AI Socratic Mentor' : 'Repetitive Inquiries'}
            </h4>
            <span className="box-sub">
              {isSolutionStage ? 'Instant 1-on-1 Guidance' : 'Hours of Same Doubts'}
            </span>
            <div className="reveal-hint">
              <span>{isLeftOpen ? 'Click to collapse' : 'Hover to reveal details'}</span>
              <ChevronDown size={13} style={{ transform: isLeftOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.35s ease' }} />
            </div>
          </div>

          {/* B. INNER DRAWER: SLIDES OUT SMOOTHLY FROM THE BOTTOM OF OUTER CARD */}
          <div
            className="drawer-wrapper"
            style={{
              maxHeight: isLeftOpen ? '260px' : '0px',
              opacity: isLeftOpen ? 1 : 0,
              transform: isLeftOpen ? 'translateY(0)' : 'translateY(-12px)',
              transition: 'max-height 0.60s cubic-bezier(0.16, 1, 0.3, 1), transform 0.60s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.40s ease',
            }}
          >
            <div
              className="inner-drawer"
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                border: isSolutionStage
                  ? '1px solid rgba(52, 211, 153, 0.35)'
                  : '1px solid rgba(248, 113, 113, 0.35)',
                borderTop: 'none', // Seamless junction with outer box!
                borderTopLeftRadius: '0px', // Straight junction corners!
                borderTopRightRadius: '0px', // Straight junction corners!
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8), 0 10px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              <h5
                style={{
                  margin: '0 0 6px 0',
                  fontSize: '0.90rem',
                  fontWeight: 700,
                  color: isSolutionStage ? '#34D399' : '#F87171',
                }}
              >
                {isSolutionStage
                  ? 'Vedika Answers 24/7'
                  : 'Constant Repetition Burnout'}
              </h5>
              <p style={{ margin: 0, fontSize: '0.78rem', lineHeight: 1.45, color: '#CBD5E1' }}>
                {isSolutionStage
                  ? 'Vedika resolves repetitive student queries in real time with step-by-step Socratic voice guidance, freeing teachers to focus on classroom excellence.'
                  : 'Teachers lose up to 3 hours every day answering identical foundational doubts to 50+ students, causing deep mental exhaustion.'}
              </p>
              <div
                className="stat-pill"
                style={{
                  background: isSolutionStage
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(239, 68, 68, 0.15)',
                  color: isSolutionStage ? '#6EE7B7' : '#FCA5A5',
                }}
              >
                {isSolutionStage ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                <span>
                  {isSolutionStage
                    ? 'Zero teacher burnout • 100% doubt coverage'
                    : '85% of queries are repeated concepts'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. CENTER STAGE: TEACHER (SAD UNTIL VEDIKA FULLY ARRIVES)             */}
      {/* ===================================================================== */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '0',
          transform: 'translateX(-50%)',
          width: 'clamp(290px, 32vw, 440px)',
          height: 'clamp(390px, 58vh, 620px)',
          pointerEvents: 'none',
          zIndex: 12, // In front of 3D WebGL Vedika (zIndex 5)
        }}
      >
        {/* SAD TEACHER: Stays 100% visible until Vedika has arrived fully (scrollProgress >= 4.80) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/teacher-sad.png"
          alt="Teacher overwhelmed with repetitive questions and evaluation"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            opacity: 1 - expressionEase,
            filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.9))',
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* HAPPY TEACHER: Fades in only AFTER Vedika is fully behind her */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/teacher-happy.png"
          alt="Teacher happy and empowered by Vedika AI"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom center',
            opacity: expressionEase,
            filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.9))',
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>

      {/* ===================================================================== */}
      {/* 3. RIGHT CARD: OUTER BOX -> INNER BOX SLIDES OUT SEAMLESSLY FROM BELOW */}
      {/* ===================================================================== */}
      <div
        className="card-dock right-dock"
        onMouseEnter={() => setRightHovered(true)}
        onMouseLeave={() => setRightHovered(false)}
        onClick={() => setRightClicked((prev) => !prev)}
        style={{
          position: 'absolute',
          right: 'clamp(2rem, 7.5vw, 8.5rem)',
          top: '48%',
          transform: 'translateY(-50%)',
          pointerEvents: 'auto',
          zIndex: 20,
          cursor: 'pointer',
        }}
      >
        <div className={`card-shell ${isRightOpen ? 'is-open' : ''}`}>
          {/* A. OUTER BOX (TOP PRIMARY CARD) */}
          <div
            className="outer-box"
            style={{
              background: isSolutionStage
                ? 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)'
                : 'linear-gradient(135deg, #831843 0%, #9D174D 100%)',
              border: isSolutionStage
                ? '1px solid rgba(96, 165, 250, 0.45)'
                : '1px solid rgba(244, 114, 182, 0.45)',
              borderBottomLeftRadius: isRightOpen ? '0px' : '20px',
              borderBottomRightRadius: isRightOpen ? '0px' : '20px',
              boxShadow: isSolutionStage
                ? '0 15px 35px rgba(30, 58, 138, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                : '0 15px 35px rgba(131, 24, 67, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              transition: 'background 0.5s ease, border-color 0.5s ease, border-radius 0.35s ease, box-shadow 0.5s ease',
            }}
          >
            <div className="icon-badge" style={{ background: isSolutionStage ? 'rgba(59, 130, 246, 0.25)' : 'rgba(236, 72, 153, 0.25)' }}>
              {isSolutionStage ? (
                <Sparkles size={36} color="#93C5FD" />
              ) : (
                <FileCheck2 size={36} color="#F9A8D4" />
              )}
            </div>
            <h4 className="box-title">
              {isSolutionStage ? 'Instant Evaluation' : 'Grading Burden'}
            </h4>
            <span className="box-sub">
              {isSolutionStage ? 'Automated Rubric & Feedback' : 'Late Nights Correcting Piles'}
            </span>
            <div className="reveal-hint">
              <span>{isRightOpen ? 'Click to collapse' : 'Hover to reveal details'}</span>
              <ChevronDown size={13} style={{ transform: isRightOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.35s ease' }} />
            </div>
          </div>

          {/* B. INNER DRAWER: SLIDES OUT SMOOTHLY FROM THE BOTTOM OF OUTER CARD */}
          <div
            className="drawer-wrapper"
            style={{
              maxHeight: isRightOpen ? '260px' : '0px',
              opacity: isRightOpen ? 1 : 0,
              transform: isRightOpen ? 'translateY(0)' : 'translateY(-12px)',
              transition: 'max-height 0.60s cubic-bezier(0.16, 1, 0.3, 1), transform 0.60s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.40s ease',
            }}
          >
            <div
              className="inner-drawer"
              style={{
                background: 'rgba(15, 23, 42, 0.96)',
                border: isSolutionStage
                  ? '1px solid rgba(96, 165, 250, 0.35)'
                  : '1px solid rgba(244, 114, 182, 0.35)',
                borderTop: 'none', // Seamless junction with outer box!
                borderTopLeftRadius: '0px', // Straight junction corners!
                borderTopRightRadius: '0px', // Straight junction corners!
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8), 0 10px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              <h5
                style={{
                  margin: '0 0 6px 0',
                  fontSize: '0.90rem',
                  fontWeight: 700,
                  color: isSolutionStage ? '#60A5FA' : '#F472B6',
                }}
              >
                {isSolutionStage
                  ? 'Intelligent Rubric Analysis'
                  : 'Endless Manual Grading'}
              </h5>
              <p style={{ margin: 0, fontSize: '0.78rem', lineHeight: 1.45, color: '#CBD5E1' }}>
                {isSolutionStage
                  ? 'Vedika instantly evaluates student assignments with rubrics, misconception detection, and actionable performance dashboards ready for the teacher.'
                  : 'Correcting 60+ assignments every week demands 12+ evening hours of manual red-inking, leaving no time for meaningful feedback.'}
              </p>
              <div
                className="stat-pill"
                style={{
                  background: isSolutionStage
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'rgba(236, 72, 153, 0.15)',
                  color: isSolutionStage ? '#93C5FD' : '#F9A8D4',
                }}
              >
                {isSolutionStage ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                <span>
                  {isSolutionStage
                    ? 'Instant rubrics • Deep performance insights'
                    : '12+ hours weekly spent grading by hand'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD DRAWER STYLES */}
      <style jsx>{`
        .card-dock {
          width: 320px;
        }

        .card-shell {
          position: relative;
          width: 320px;
          display: flex;
          flex-direction: column;
        }

        /* OUTER BOX: Top primary card */
        .outer-box {
          position: relative;
          width: 320px;
          height: 185px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
          z-index: 5;
          backdrop-filter: blur(16px);
        }

        /* DRAWER WRAPPER: Handles the smooth sliding out from the outer box */
        .drawer-wrapper {
          width: 320px;
          overflow: hidden;
          z-index: 4;
        }

        /* INNER DRAWER: Bottom revealed content with matching straight top corners */
        .inner-drawer {
          width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px 22px 22px 22px;
          box-sizing: border-box;
          backdrop-filter: blur(20px);
        }

        .icon-badge {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          backdrop-filter: blur(8px);
        }

        .box-title {
          margin: 4px 0 2px 0;
          font-size: 1.05rem;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 0.02em;
        }

        .box-sub {
          font-size: 0.74rem;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 0.04em;
        }

        .reveal-hint {
          margin-top: 10px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.68rem;
          color: rgba(255, 255, 255, 0.65);
          letter-spacing: 0.03em;
        }

        .stat-pill {
          margin-top: 10px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.71rem;
          font-weight: 600;
        }

        @media (max-width: 1100px) {
          .card-dock,
          .card-shell,
          .outer-box,
          .drawer-wrapper,
          .inner-drawer {
            width: 260px;
          }
          .outer-box {
            height: 175px;
          }
          .card-dock.left-dock {
            left: 1rem !important;
          }
          .card-dock.right-dock {
            right: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
