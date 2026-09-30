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
      {/* Adjusts seamlessly within the available space on the left     */}
      {/* ============================================================ */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            left: 'clamp(2.5rem, 5.2vw, 6rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            maxWidth: 'min(390px, 28vw)',
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
              fontSize: '0.80rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#3B82F6',
              marginBottom: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Interactive Labs
          </div>

          {/* Main Headline */}
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 4.4vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: '#0F172A',
              margin: '0 0 1.25rem 0',
            }}
          >
            Explore
            <br />
            Subjects
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 60%, #B45309 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Differently.
            </span>
          </h2>

          {/* Supporting Copy */}
          <p
            style={{
              fontSize: 'clamp(0.92rem, 1.05vw, 1.02rem)',
              lineHeight: 1.62,
              color: '#475569',
              margin: '0 0 2rem 0',
              fontWeight: 450,
            }}
          >
            Step into interactive labs powered by AI. Ask questions, run experiments, visualize concepts and learn at your own pace — with Vedika by your side.
          </p>

          {/* Explore Labs CTA Pill Button */}
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
              background: 'linear-gradient(135deg, #FDE68A 0%, #FBBF24 50%, #F59E0B 100%)',
              color: '#451A03',
              fontWeight: 700,
              fontSize: '0.94rem',
              letterSpacing: '0.01em',
              border: '1px solid rgba(245, 158, 11, 0.45)',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.28), 0 2px 6px rgba(0, 0, 0, 0.04)',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(245, 158, 11, 0.38)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.28), 0 2px 6px rgba(0, 0, 0, 0.04)';
            }}
            aria-label="Explore Labs"
          >
            <span>Explore Labs</span>
            <ArrowRight size={17} strokeWidth={2.4} />
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. INVISIBLE CENTRAL CLICK TRIGGER OVER VEDIKA               */}
      {/* ============================================================ */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsLabsExpanded((prev) => !prev);
        }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
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
      {/* 3. 5 LAB NAME LABELS (Centered neatly beneath each bubble)   */}
      {/* Matches reference design without intruding on the left text  */}
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
        {/* Math Lab: Below Top Sphere */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 'calc(50% - 170px)',
            transform: 'translate(-50%, 0)',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.03em',
            color: '#0F172A',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#D97706', display: 'inline-block', boxShadow: '0 0 8px rgba(217, 119, 6, 0.6)' }} />
          Math Lab
        </div>

        {/* Computer Lab: Below Upper Left Sphere */}
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% - 290px)',
            top: 'calc(50% + 20px)',
            transform: 'translate(-50%, 0)',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.03em',
            color: '#0F172A',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#1D4ED8', display: 'inline-block', boxShadow: '0 0 8px rgba(29, 78, 216, 0.6)' }} />
          Computer Lab
        </div>

        {/* Biology Lab: Below Lower Left Sphere */}
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% - 180px)',
            top: 'calc(50% + 340px)',
            transform: 'translate(-50%, 0)',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.03em',
            color: '#0F172A',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#7C3AED', display: 'inline-block', boxShadow: '0 0 8px rgba(124, 58, 237, 0.6)' }} />
          Biology Lab
        </div>

        {/* Physics Lab: Below Upper Right Sphere */}
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% + 290px)',
            top: 'calc(50% + 20px)',
            transform: 'translate(-50%, 0)',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.03em',
            color: '#0F172A',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#0284C7', display: 'inline-block', boxShadow: '0 0 8px rgba(2, 132, 199, 0.6)' }} />
          Physics Lab
        </div>

        {/* Chemistry Lab: Below Lower Right Sphere */}
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% + 180px)',
            top: 'calc(50% + 340px)',
            transform: 'translate(-50%, 0)',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.03em',
            color: '#0F172A',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#BE123C', display: 'inline-block', boxShadow: '0 0 8px rgba(190, 18, 60, 0.6)' }} />
          Chemistry Lab
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. SUBTLE BOTTOM TOGGLE PILL (Close Labs)                    */}
      {/* ============================================================ */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsLabsExpanded((prev) => !prev);
        }}
        style={{
          position: 'absolute',
          bottom: 'clamp(2.0rem, 4.5vh, 3.2rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 22px',
          borderRadius: '24px',
          background: isLabsExpanded
            ? 'rgba(239, 68, 68, 0.08)'
            : 'rgba(15, 23, 42, 0.90)',
          border: isLabsExpanded
            ? '1px solid rgba(239, 68, 68, 0.35)'
            : '1px solid rgba(15, 23, 42, 0.20)',
          boxShadow: isLabsExpanded
            ? '0 8px 25px rgba(239, 68, 68, 0.12)'
            : '0 8px 30px rgba(15, 23, 42, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(12px)',
          cursor: 'pointer',
          pointerEvents: 'auto',
          zIndex: 40,
          transition: 'all 0.25s ease',
        }}
      >
        {isLabsExpanded ? (
          <>
            <X size={14} color="#E11D48" />
            <span
              style={{
                fontSize: '0.80rem',
                fontWeight: 600,
                color: '#BE123C',
                letterSpacing: '0.03em',
              }}
            >
              Close Labs
            </span>
          </>
        ) : (
          <>
            <Sparkles size={14} color="#A855F7" />
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
