'use client';

import React, { useEffect, useState } from 'react';
import {
  Mic,
  FileText,
  MessageSquare,
  ArrowRight,
  Zap,
  Globe,
  Lightbulb,
} from 'lucide-react';
import { useInteraction } from '@/hooks/useInteraction';
import { getStreamAnchors, StreamAnchors } from './streamLayout';

// Animated audio waveform equalizer bars
function AudioWaveEqualizer({ color = '#6366F1' }: { color?: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', height: '13px' }}>
      <span className="wave-bar wave-bar-1" style={{ backgroundColor: color }} />
      <span className="wave-bar wave-bar-2" style={{ backgroundColor: color }} />
      <span className="wave-bar wave-bar-3" style={{ backgroundColor: color }} />
      <span className="wave-bar wave-bar-4" style={{ backgroundColor: color }} />
      <span className="wave-bar wave-bar-5" style={{ backgroundColor: color }} />
    </div>
  );
}

export function InteractionSection() {
  const { activeMode, setActiveMode, scrollProgress } = useInteraction();
  const isSTT = activeMode === 'STT';

  const [anchors, setAnchors] = useState<StreamAnchors | null>(null);
  const [textOrbVisible, setTextOrbVisible] = useState(false);

  useEffect(() => {
    const handleEvent = (e: Event) => {
      const custom = e as CustomEvent<{ visible: boolean }>;
      if (custom.detail !== undefined) {
        setTextOrbVisible(custom.detail.visible);
      }
    };
    window.addEventListener('vedika_wave_text_orb', handleEvent);
    return () => window.removeEventListener('vedika_wave_text_orb', handleEvent);
  }, []);

  useEffect(() => {
    if ((scrollProgress < 0.65 || scrollProgress > 1.35) && textOrbVisible) {
      setTextOrbVisible(false);
    }
  }, [scrollProgress, textOrbVisible]);

  useEffect(() => {
    const update = () => {
      setAnchors(getStreamAnchors(window.innerWidth, window.innerHeight));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const toggleMode = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveMode(isSTT ? 'TTS' : 'STT');
  };

  const featurePills = [
    {
      icon: <Mic size={15} color="#4F46E5" />,
      bg: '#EEF2FF',
      title: 'Voice Input',
      sub: 'Speak naturally',
    },
    {
      icon: <Zap size={15} color="#EA580C" />,
      bg: '#FFF7ED',
      title: 'Instant Understanding',
      sub: 'Understands your intent',
    },
    {
      icon: <Globe size={15} color="#9333EA" />,
      bg: '#FAF5FF',
      title: 'Multilingual',
      sub: 'Learn in your language',
    },
    {
      icon: <Lightbulb size={15} color="#CA8A04" />,
      bg: '#FEFCE8',
      title: 'Clear Explanations',
      sub: 'Simple, contextual answers',
    },
  ];

  return (
    <section
      aria-label="Vedika Multimodal Natural AI Conversation Interface"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* 1. TOP EDITORIAL HEADER SECTION - Compact, elevated above Vedika's head */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(3.25rem, 5vh, 4.25rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '620px',
          textAlign: 'center',
          pointerEvents: 'auto',
          zIndex: 25,
        }}
      >
        {/* Eyebrow Label */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '0.71875rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#B45309',
            marginBottom: '0.35rem',
          }}
        >
          <span style={{ width: '18px', height: '1px', backgroundColor: '#D97706', opacity: 0.5 }} />
          <span>NATURAL AI CONVERSATION</span>
          <span style={{ width: '18px', height: '1px', backgroundColor: '#D97706', opacity: 0.5 }} />
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--font-serif), 'Newsreader', Georgia, serif",
            fontSize: 'clamp(1.75rem, 2.7vw, 2.5rem)',
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            marginBottom: '0.35rem',
          }}
        >
          <span style={{ color: '#0F172A' }}>Speak naturally. </span>
          <span style={{ color: '#C28E3A' }}>Learn instantly.</span>
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(0.8125rem, 0.95vw, 0.90625rem)',
            lineHeight: 1.45,
            color: '#4B5563',
            maxWidth: '520px',
            margin: '0 auto',
          }}
        >
          Ask questions in your own words. Vedika listens, understands your intent, and turns your
          voice into clear explanations.
        </p>
      </div>

      {/* 2. LEFT VOICE INPUT CARD ("SPEAK") - Moved down in harmony with chest waves */}
      <div
        className="card-float-left"
        style={{
          position: 'absolute',
          left: 'clamp(1.25rem, 3.2vw, 4rem)',
          top: 'clamp(20%, 25vh, 29%)',
          width: 'clamp(230px, 18vw, 275px)',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '18px',
          border: '1px solid rgba(224, 231, 255, 0.9)',
          padding: '14px 16px',
          boxShadow:
            '0 10px 30px rgba(99, 102, 241, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
          pointerEvents: 'auto',
          zIndex: 25,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(79, 70, 229, 0.35)',
              flexShrink: 0,
            }}
          >
            <Mic size={16} color="#FFFFFF" />
          </div>
          <div>
            <div
              style={{
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#4F46E5',
              }}
            >
              SPEAK
            </div>
            <div style={{ fontSize: '0.90625rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.25 }}>
              Your voice, your way.
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.75rem', lineHeight: 1.45, color: '#64748B', margin: 0 }}>
          Ask a question naturally — no typing, no perfect wording required.
        </p>
      </div>

      {/* 3. RIGHT SMART RESPONSE CARD ("UNDERSTAND") - Appears smoothly when wave reaches text icon */}
      <div
        className="card-float-right"
        style={{
          position: 'absolute',
          right: 'clamp(1.25rem, 3.2vw, 4rem)',
          top: 'clamp(20%, 25vh, 29%)',
          width: 'clamp(230px, 18vw, 275px)',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '18px',
          border: '1px solid rgba(254, 243, 199, 0.9)',
          padding: '14px 16px',
          boxShadow:
            '0 10px 30px rgba(245, 158, 11, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
          pointerEvents: textOrbVisible ? 'auto' : 'none',
          zIndex: 25,
          opacity: textOrbVisible ? 1 : 0,
          transform: textOrbVisible ? 'translateX(0)' : 'translateX(32px)',
          filter: textOrbVisible ? 'blur(0px)' : 'blur(4px)',
          transition:
            'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, filter 0.65s ease 0.1s, box-shadow 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(245, 158, 11, 0.35)',
              flexShrink: 0,
            }}
          >
            <FileText size={16} color="#FFFFFF" />
          </div>
          <div>
            <div
              style={{
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#D97706',
              }}
            >
              UNDERSTAND
            </div>
            <div style={{ fontSize: '0.90625rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.25 }}>
              Ideas become clear.
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.75rem', lineHeight: 1.45, color: '#64748B', margin: 0 }}>
          Vedika converts your question into an explanation you can actually understand.
        </p>
      </div>

      {/* 4. LEFT GLOWING MICROPHONE ORB & LABELS */}
      {anchors && (
        <>
          <div
            onClick={() => setActiveMode('STT')}
            style={{
              position: 'absolute',
              left: `${anchors.leftOrbX}px`,
              top: `${anchors.centerY}px`,
              transform: 'translate(-50%, -50%)',
              width: '74px',
              height: '74px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              pointerEvents: 'auto',
              zIndex: 20,
              transition: 'transform 0.25s ease',
            }}
            title="Speech to Text (Voice Input)"
          >
            {/* Outer Radiant Glowing Wave Rings */}
            <div
              style={{
                position: 'absolute',
                width: '105px',
                height: '105px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(147, 51, 234, 0.12) 55%, transparent 75%)',
                animation: 'orbPulsePurple 3s ease-in-out infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                border: '1.5px solid rgba(192, 132, 252, 0.55)',
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.45)',
                animation: 'ringExpand 4s linear infinite',
              }}
            />

            {/* Central Glowing Orb Button */}
            <div
              style={{
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 50%, #4C1D95 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isSTT
                  ? '0 0 28px rgba(168, 85, 247, 0.85), 0 4px 14px rgba(0, 0, 0, 0.25)'
                  : '0 0 14px rgba(168, 85, 247, 0.4), 0 4px 10px rgba(0, 0, 0, 0.15)',
                position: 'relative',
                zIndex: 2,
                transform: isSTT ? 'scale(1.05)' : 'scale(0.96)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <Mic size={24} color="#FFFFFF" />
            </div>
          </div>

          {/* Left Orb Description Label */}
          <div
            style={{
              position: 'absolute',
              left: `${anchors.leftOrbX}px`,
              top: `${anchors.centerY + 45}px`,
              transform: 'translateX(-50%)',
              textAlign: 'center',
              pointerEvents: 'none',
              zIndex: 20,
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.01em' }}>
              Voice Input
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '1px' }}>
              Speech &rarr; Understanding
            </div>
          </div>
        </>
      )}

      {/* 5. RIGHT GLOWING GOLDEN DOCUMENT ORB & LABELS - Blooms into appearance when reached by wave */}
      {anchors && (
        <>
          <div
            onClick={() => setActiveMode('TTS')}
            style={{
              position: 'absolute',
              left: `${anchors.rightOrbX}px`,
              top: `${anchors.centerY}px`,
              transform: textOrbVisible
                ? 'translate(-50%, -50%) scale(1)'
                : 'translate(-50%, -50%) scale(0.25)',
              opacity: textOrbVisible ? 1 : 0,
              filter: textOrbVisible ? 'blur(0px)' : 'blur(8px)',
              width: '74px',
              height: '74px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              pointerEvents: textOrbVisible ? 'auto' : 'none',
              zIndex: 20,
              transition:
                'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.55s ease, filter 0.55s ease',
            }}
            title="Text to Speech (Smart Response)"
          >
            {/* Outer Radiant Glowing Wave Rings */}
            <div
              style={{
                position: 'absolute',
                width: '105px',
                height: '105px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(217, 119, 6, 0.12) 55%, transparent 75%)',
                animation: textOrbVisible ? 'orbPulseGold 3s ease-in-out infinite' : 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                border: '1.5px solid rgba(251, 191, 36, 0.55)',
                boxShadow: '0 0 20px rgba(245, 158, 11, 0.45)',
                animation: textOrbVisible ? 'ringExpandGold 4s linear infinite' : 'none',
              }}
            />

            {/* Central Glowing Golden Orb Button with Document Graphic */}
            <div
              style={{
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: !isSTT
                  ? '0 0 28px rgba(245, 158, 11, 0.85), 0 4px 14px rgba(0, 0, 0, 0.25)'
                  : '0 0 14px rgba(245, 158, 11, 0.4), 0 4px 10px rgba(0, 0, 0, 0.15)',
                position: 'relative',
                zIndex: 2,
                transform: !isSTT ? 'scale(1.05)' : 'scale(0.96)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <FileText size={24} color="#FFFFFF" />
            </div>
          </div>

          {/* Right Orb Description Label */}
          <div
            style={{
              position: 'absolute',
              left: `${anchors.rightOrbX}px`,
              top: `${anchors.centerY + 45}px`,
              transform: textOrbVisible
                ? 'translateX(-50%) translateY(0)'
                : 'translateX(-50%) translateY(12px)',
              opacity: textOrbVisible ? 1 : 0,
              textAlign: 'center',
              pointerEvents: 'none',
              zIndex: 20,
              whiteSpace: 'nowrap',
              transition:
                'opacity 0.55s ease 0.15s, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
          >
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.01em' }}>
              Smart Response
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '1px' }}>
              Understanding &rarr; Explanation
            </div>
          </div>
        </>
      )}

      {/* 6. CENTER CONTROLS UNDER VEDIKA 3D BOT - 3D FLIP MODE TOGGLE */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 'clamp(74%, 76vh, 79%)',
          transform: textOrbVisible
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(14px)',
          opacity: textOrbVisible ? 1 : 0,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 30,
          pointerEvents: textOrbVisible ? 'auto' : 'none',
          transition:
            'opacity 0.6s ease 0.25s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
        }}
      >
        <a
          href="#toggle-mode"
          onClick={toggleMode}
          className="btn-flip-gold"
          data-front={isSTT ? 'SPEECH TO TEXT' : 'TEXT TO SPEECH'}
          data-back={isSTT ? 'TEXT TO SPEECH' : 'SPEECH TO TEXT'}
          role="button"
          aria-label={`Current mode: ${isSTT ? 'Speech to Text' : 'Text to Speech'}. Click to toggle flow.`}
        />

        <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '7px', fontWeight: 500 }}>
          Speak naturally. Vedika handles the rest.
        </div>
      </div>

      {/* 7. BOTTOM DOCK: 4 FEATURE PILLS BAR - Slim, fitted inside screen */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(0.75rem, 1.8vh, 1.25rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(0.5rem, 1vw, 1rem)',
          width: '94%',
          maxWidth: '1200px',
          pointerEvents: 'auto',
          zIndex: 30,
        }}
      >
        {featurePills.map((pill) => (
          <div
            key={pill.title}
            style={{
              flex: '1 1 0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '7px 14px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.90)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(226, 232, 240, 0.85)',
              boxShadow: '0 3px 12px rgba(0, 0, 0, 0.03)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1.5px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 3px 12px rgba(0, 0, 0, 0.03)';
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: pill.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {pill.icon}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div
                style={{
                  fontSize: '0.78125rem',
                  fontWeight: 700,
                  color: '#0F172A',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {pill.title}
              </div>
              <div
                style={{
                  fontSize: '0.6875rem',
                  color: '#64748B',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {pill.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* KEYFRAME ANIMATIONS & 3D FLIP BUTTON */}
      <style jsx>{`
        :global(.btn-flip-gold) {
          opacity: 1;
          outline: 0;
          color: #fff;
          line-height: 42px;
          height: 42px;
          position: relative;
          text-align: center;
          letter-spacing: 0.12em;
          display: inline-block;
          text-decoration: none;
          font-family: inherit;
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 9999px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.18), 0 0 16px rgba(245, 158, 11, 0.22);
          border: 1.5px solid rgba(245, 158, 11, 0.45);
          user-select: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease;
        }

        :global(.btn-flip-gold:hover) {
          border-color: #F59E0B;
          box-shadow: 0 8px 26px rgba(245, 158, 11, 0.4), 0 0 24px rgba(245, 158, 11, 0.3);
          transform: translateY(-2px);
        }

        :global(.btn-flip-gold:hover:after) {
          opacity: 1;
          transform: translateY(0) rotateX(0);
        }

        :global(.btn-flip-gold:hover:before) {
          opacity: 0;
          transform: translateY(50%) rotateX(90deg);
        }

        :global(.btn-flip-gold:after) {
          top: 0;
          left: 0;
          opacity: 0;
          width: 100%;
          color: #081017;
          display: flex;
          align-items: center;
          justifyContent: center;
          transition: 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          position: absolute;
          background: linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%);
          content: attr(data-back);
          transform: translateY(-50%) rotateX(90deg);
          line-height: 42px;
          padding: 0 28px;
          box-sizing: border-box;
          white-space: nowrap;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        :global(.btn-flip-gold:before) {
          top: 0;
          left: 0;
          opacity: 1;
          color: #ECC97E;
          display: flex;
          align-items: center;
          justifyContent: center;
          padding: 0 28px;
          line-height: 42px;
          transition: 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          background: #18181B;
          content: attr(data-front);
          transform: translateY(0) rotateX(0);
          box-sizing: border-box;
          white-space: nowrap;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .wave-bar {
          display: inline-block;
          width: 2.2px;
          border-radius: 2px;
          animation: waveBarBounce 1.2s ease-in-out infinite alternate;
        }
        .wave-bar-1 {
          height: 5px;
          animation-delay: 0.1s;
        }
        .wave-bar-2 {
          height: 10px;
          animation-delay: 0.3s;
        }
        .wave-bar-3 {
          height: 13px;
          animation-delay: 0.5s;
        }
        .wave-bar-4 {
          height: 8px;
          animation-delay: 0.2s;
        }
        .wave-bar-5 {
          height: 6px;
          animation-delay: 0.4s;
        }

        @keyframes waveBarBounce {
          0% {
            transform: scaleY(0.4);
          }
          100% {
            transform: scaleY(1.2);
          }
        }

        @keyframes orbPulsePurple {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.65;
          }
          50% {
            transform: scale(1.18);
            opacity: 0.25;
          }
        }

        @keyframes ringExpand {
          0% {
            transform: scale(0.92);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.14);
            opacity: 0.2;
          }
          100% {
            transform: scale(0.92);
            opacity: 0.6;
          }
        }

        @keyframes orbPulseGold {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.65;
          }
          50% {
            transform: scale(1.18);
            opacity: 0.25;
          }
        }

        @keyframes ringExpandGold {
          0% {
            transform: scale(0.92);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.14);
            opacity: 0.2;
          }
          100% {
            transform: scale(0.92);
            opacity: 0.6;
          }
        }

        @media (max-width: 1024px) {
          .card-float-left,
          .card-float-right {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
