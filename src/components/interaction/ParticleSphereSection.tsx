'use client';

import React, { useState, useEffect } from 'react';
import { useInteraction } from '@/hooks/useInteraction';
import { Sparkles, X, ArrowRight } from 'lucide-react';

export function ParticleSphereSection() {
  const { scrollProgress, isLabsExpanded, setIsLabsExpanded } = useInteraction();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isPage4Active = scrollProgress >= 2.45 && scrollProgress <= 3.55;

  // Auto collapse if user scrolls back to previous pages or forward to Page 5
  useEffect(() => {
    if ((scrollProgress < 2.25 || scrollProgress > 3.65) && isLabsExpanded) {
      setIsLabsExpanded(false);
    }
  }, [scrollProgress, isLabsExpanded, setIsLabsExpanded]);

  if (!isPage4Active) return null;

  return (
    <section
      aria-label="Vedika Labs - Interactive Core"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 30,
      }}
    >
      {/* ============================================================ */}
      {/* 1. LEFT-SIDE HERO TEXT BLOCK (Interactive Labs Headline & CTA) */}
      {/* Premium dark cosmic styling with golden glow matching Image 1  */}
      {/* ============================================================ */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            left: 'clamp(2.5rem, 5.5vw, 6.5rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: 'min(440px, 34vw)',
            pointerEvents: 'auto',
            zIndex: 36,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            opacity: 1,
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {/* Eyebrow Accent Badge */}
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#38BDF8',
              marginBottom: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 14px',
              borderRadius: '9999px',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.30)',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.20)',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#38BDF8', boxShadow: '0 0 8px #38BDF8' }} />
            Interactive Labs
          </div>

          {/* Main Headline */}
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: '#FFFFFF',
              margin: '0 0 1.25rem 0',
              textShadow: '0 2px 24px rgba(0, 0, 0, 0.6)',
            }}
          >
            Explore
            <br />
            Subjects
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                filter: 'drop-shadow(0 0 24px rgba(245, 158, 11, 0.45))',
              }}
            >
              Differently.
            </span>
          </h2>

          {/* Supporting Copy */}
          <p
            style={{
              fontSize: 'clamp(0.92rem, 1.05vw, 1.02rem)',
              lineHeight: 1.65,
              color: '#94A3B8',
              margin: '0 0 2rem 0',
              fontWeight: 400,
            }}
          >
            Step into interactive labs powered by AI. Ask questions, run experiments, visualize concepts and learn at your own pace — with Vedika by your side.
          </p>

          {/* Explore Labs CTA Pill Button (Luminous Amber / Gold Glass) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isLabsExpanded) {
                setIsLabsExpanded(true);
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '13px 28px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.35) 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.94rem',
              letterSpacing: '0.01em',
              border: '1px solid rgba(245, 158, 11, 0.65)',
              boxShadow: '0 0 24px rgba(245, 158, 11, 0.30), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 0 35px rgba(245, 158, 11, 0.50), inset 0 1px 2px rgba(255, 255, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 0 24px rgba(245, 158, 11, 0.30), inset 0 1px 1px rgba(255, 255, 255, 0.3)';
            }}
            aria-label="Explore Labs"
          >
            <span>Explore Labs</span>
            <ArrowRight size={17} strokeWidth={2.4} color="#FBBF24" />
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. INVISIBLE CENTRAL CLICK TRIGGER OVER VEDIKA (RIGHT PART)  */}
      {/* ============================================================ */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsLabsExpanded((prev) => !prev);
        }}
        style={{
          position: 'absolute',
          left: isMobile ? '50%' : 'calc(50% + 27.2vh)',
          top: isMobile ? '50%' : 'calc(50% + 1.8vh)',
          transform: 'translate(-50%, -50%)',
          width: '270px',
          height: '340px',
          borderRadius: '50%',
          cursor: 'pointer',
          pointerEvents: 'auto',
          zIndex: 35,
        }}
        title={isLabsExpanded ? 'Click to close Labs' : 'Click Vedika to open Labs'}
        aria-label="Toggle Vedika Labs"
      />

      {/* ============================================================ */}
      {/* 3. 5 LAB NAME LABELS (Image 1 Style Glowing Glass Capsules)  */}
      {/* Left labs on left, right labs on right, Math on right        */}
      {/* ============================================================ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: isLabsExpanded ? 1 : 0,
          transition: 'opacity 0.35s ease 0.12s',
          zIndex: 32,
        }}
      >
        {/* Math Lab: Right side of Top Sphere (Amber Gold Capsule) */}
        <div
          style={{
            position: 'absolute',
            left: isMobile ? 'calc(50% + 75px)' : 'calc(50% + 27.2vh + 13.5vh)',
            top: isMobile ? 'calc(50% - 170px)' : 'calc(50% - 37.5vh)',
            transform: 'translate(0, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '7px 18px',
            borderRadius: '24px',
            background: 'rgba(10, 15, 28, 0.85)',
            border: '1px solid rgba(245, 158, 11, 0.55)',
            boxShadow: '0 0 18px rgba(245, 158, 11, 0.28), 0 4px 12px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(16px)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.03em',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#F59E0B', display: 'inline-block', boxShadow: '0 0 10px #F59E0B' }} />
          <span>Math Lab</span>
        </div>

        {/* Computer Lab: Left side of Upper Left Sphere (Electric Blue Capsule) */}
        <div
          style={{
            position: 'absolute',
            left: isMobile ? 'calc(50% - 290px - 75px)' : 'calc(50% + 27.2vh - 37.5vh - 13.5vh)',
            top: isMobile ? 'calc(50% + 20px)' : 'calc(50% - 10.3vh)',
            transform: 'translate(-100%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '7px 18px',
            borderRadius: '24px',
            background: 'rgba(10, 15, 28, 0.85)',
            border: '1px solid rgba(59, 130, 246, 0.55)',
            boxShadow: '0 0 18px rgba(59, 130, 246, 0.28), 0 4px 12px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(16px)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.03em',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
          }}
        >
          <span>Computer Lab</span>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#3B82F6', display: 'inline-block', boxShadow: '0 0 10px #3B82F6' }} />
        </div>

        {/* Biology Lab: Left side of Lower Left Sphere (Radiant Orchid Capsule) */}
        <div
          style={{
            position: 'absolute',
            left: isMobile ? 'calc(50% - 180px - 75px)' : 'calc(50% + 27.2vh - 23vh - 13.5vh)',
            top: isMobile ? 'calc(50% + 340px)' : 'calc(50% + 33.7vh)',
            transform: 'translate(-100%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '7px 18px',
            borderRadius: '24px',
            background: 'rgba(10, 15, 28, 0.85)',
            border: '1px solid rgba(168, 85, 247, 0.55)',
            boxShadow: '0 0 18px rgba(168, 85, 247, 0.28), 0 4px 12px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(16px)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.03em',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
          }}
        >
          <span>Biology Lab</span>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#A855F7', display: 'inline-block', boxShadow: '0 0 10px #A855F7' }} />
        </div>

        {/* Physics Lab: Right side of Upper Right Sphere (Sapphire / Cyan Capsule) */}
        <div
          style={{
            position: 'absolute',
            left: isMobile ? 'calc(50% + 290px + 75px)' : 'calc(50% + 27.2vh + 37.5vh + 13.5vh)',
            top: isMobile ? 'calc(50% + 20px)' : 'calc(50% - 10.3vh)',
            transform: 'translate(0, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '7px 18px',
            borderRadius: '24px',
            background: 'rgba(10, 15, 28, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.55)',
            boxShadow: '0 0 18px rgba(56, 189, 248, 0.28), 0 4px 12px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(16px)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.03em',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#38BDF8', display: 'inline-block', boxShadow: '0 0 10px #38BDF8' }} />
          <span>Physics Lab</span>
        </div>

        {/* Chemistry Lab: Right side of Lower Right Sphere (Cosmic Ruby Capsule) */}
        <div
          style={{
            position: 'absolute',
            left: isMobile ? 'calc(50% + 180px + 75px)' : 'calc(50% + 27.2vh + 23vh + 13.5vh)',
            top: isMobile ? 'calc(50% + 340px)' : 'calc(50% + 33.7vh)',
            transform: 'translate(0, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '7px 18px',
            borderRadius: '24px',
            background: 'rgba(10, 15, 28, 0.85)',
            border: '1px solid rgba(244, 63, 94, 0.55)',
            boxShadow: '0 0 18px rgba(244, 63, 94, 0.28), 0 4px 12px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(16px)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.03em',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#F43F5E', display: 'inline-block', boxShadow: '0 0 10px #F43F5E' }} />
          <span>Chemistry Lab</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. SUBTLE BOTTOM TOGGLE PILL (Close Labs)                    */}
      {/* Aligned neatly in the right partition underneath Vedika      */}
      {/* ============================================================ */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsLabsExpanded((prev) => !prev);
        }}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3.5vh, 2.5rem)',
          left: isMobile ? '50%' : 'calc(50% + 27.2vh)',
          transform: 'translateX(-50%)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 24px',
          borderRadius: '24px',
          background: isLabsExpanded
            ? 'rgba(239, 68, 68, 0.16)'
            : 'rgba(15, 23, 42, 0.85)',
          border: isLabsExpanded
            ? '1px solid rgba(239, 68, 68, 0.55)'
            : '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: isLabsExpanded
            ? '0 0 25px rgba(239, 68, 68, 0.35)'
            : '0 0 25px rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(16px)',
          cursor: 'pointer',
          pointerEvents: 'auto',
          zIndex: 40,
          transition: 'all 0.25s ease',
        }}
      >
        {isLabsExpanded ? (
          <>
            <X size={14} color="#FB7185" />
            <span
              style={{
                fontSize: '0.80rem',
                fontWeight: 600,
                color: '#FDA4AF',
                letterSpacing: '0.03em',
              }}
            >
              Close Labs
            </span>
          </>
        ) : (
          <>
            <Sparkles size={14} color="#FBBF24" />
            <span
              style={{
                fontSize: '0.80rem',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '0.03em',
              }}
            >
              Click Vedika to explore Labs
            </span>
          </>
        )}
      </div>
    </section>
  );
}
