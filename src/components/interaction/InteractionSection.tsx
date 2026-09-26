'use client';

import React, { useEffect, useState } from 'react';
import { Mic } from 'lucide-react';
import { useInteraction } from '@/hooks/useInteraction';
import { getStreamAnchors, StreamAnchors } from './streamLayout';

export function InteractionSection() {
  const { activeMode, setActiveMode } = useInteraction();
  const isSTT = activeMode === 'STT';

  const [anchors, setAnchors] = useState<StreamAnchors | null>(null);

  useEffect(() => {
    const update = () => {
      setAnchors(getStreamAnchors(window.innerWidth, window.innerHeight));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const toggleMode = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveMode(isSTT ? 'TTS' : 'STT');
  };

  return (
    <section
      aria-label="Vedika Multimodal Speech and Text Stream Interface"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* 1. LEFT GLOWING MICROPHONE ORB - Placed directly at the left wave head */}
      {anchors && (
        <div
          onClick={() => setActiveMode('STT')}
          style={{
            position: 'absolute',
            left: `${anchors.leftOrbX}px`,
            top: `${anchors.centerY}px`,
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto',
            zIndex: 20,
            transition: 'transform 0.25s ease',
          }}
          title="Switch to Speech to Text"
        >
          {/* Outer Radiant Glowing Wave Rings */}
          <div
            style={{
              position: 'absolute',
              width: '115px',
              height: '115px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(147, 51, 234, 0.12) 55%, transparent 75%)',
              animation: 'orbPulsePurple 3s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '95px',
              height: '95px',
              borderRadius: '50%',
              border: '1.5px solid rgba(192, 132, 252, 0.55)',
              boxShadow: '0 0 24px rgba(168, 85, 247, 0.5), inset 0 0 16px rgba(147, 51, 234, 0.3)',
              animation: 'ringExpand 4s linear infinite',
            }}
          />

          {/* Central Glowing Orb Button */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 50%, #4C1D95 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isSTT
                ? '0 0 32px rgba(168, 85, 247, 0.85), 0 4px 16px rgba(0, 0, 0, 0.25)'
                : '0 0 16px rgba(168, 85, 247, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)',
              position: 'relative',
              zIndex: 2,
              transform: isSTT ? 'scale(1.05)' : 'scale(0.96)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <Mic size={26} color="#FFFFFF" />
          </div>
        </div>
      )}

      {/* 2. RIGHT GLOWING GOLDEN DOCUMENT ORB - Placed directly at the right wave end */}
      {anchors && (
        <div
          onClick={() => setActiveMode('TTS')}
          style={{
            position: 'absolute',
            left: `${anchors.rightOrbX}px`,
            top: `${anchors.centerY}px`,
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto',
            zIndex: 20,
            transition: 'transform 0.25s ease',
          }}
          title="Switch to Text to Speech"
        >
          {/* Outer Radiant Glowing Wave Rings */}
          <div
            style={{
              position: 'absolute',
              width: '115px',
              height: '115px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(217, 119, 6, 0.12) 55%, transparent 75%)',
              animation: 'orbPulseGold 3s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '95px',
              height: '95px',
              borderRadius: '50%',
              border: '1.5px solid rgba(251, 191, 36, 0.55)',
              boxShadow: '0 0 24px rgba(245, 158, 11, 0.5), inset 0 0 16px rgba(217, 119, 6, 0.3)',
              animation: 'ringExpandGold 4s linear infinite',
            }}
          />

          {/* Central Glowing Golden Orb Button with Document Graphic */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: !isSTT
                ? '0 0 32px rgba(245, 158, 11, 0.85), 0 4px 16px rgba(0, 0, 0, 0.25)'
                : '0 0 16px rgba(245, 158, 11, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)',
              position: 'relative',
              zIndex: 2,
              transform: !isSTT ? 'scale(1.05)' : 'scale(0.96)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.2))' }}
            >
              <path
                d="M7 6C7 4.89543 7.89543 4 9 4H19L25 10V26C25 27.1046 24.1046 28 23 28H9C7.89543 28 7 27.1046 7 26V6Z"
                fill="#FFFFFF"
              />
              <path
                d="M19 4V9C19 9.55228 19.4477 10 20 10H25L19 4Z"
                fill="#FDE68A"
              />
              <text
                x="10.5"
                y="18"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="10"
                fontWeight="900"
                fill="#D97706"
              >
                T
              </text>
              <line x1="18" y1="13.5" x2="22.5" y2="13.5" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="18" y1="17.5" x2="22.5" y2="17.5" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="11" y1="22" x2="22.5" y2="22" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      )}

      {/* 3. 3D FLIP BUTTON - Placed below Vedika 3D model */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(2.5rem, 5vh, 4rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <a
          href="#toggle-mode"
          onClick={toggleMode}
          className="btn-flip"
          data-front={isSTT ? 'SPEECH TO TEXT' : 'TEXT TO SPEECH'}
          data-back={isSTT ? 'TEXT TO SPEECH' : 'SPEECH TO TEXT'}
          role="button"
          aria-label={`Current mode: ${isSTT ? 'Speech to Text' : 'Text to Speech'}. Click to toggle flow.`}
        />
      </div>

      {/* STYLES: CSS 3D FLIP BUTTON & KEYFRAME PULSES */}
      <style jsx>{`
        :global(.btn-flip) {
          opacity: 1;
          outline: 0;
          color: #fff;
          line-height: 40px;
          position: relative;
          text-align: center;
          letter-spacing: 1px;
          display: inline-block;
          text-decoration: none;
          font-family: 'Open Sans', system-ui, -apple-system, sans-serif;
          font-size: 0.8125rem;
          font-weight: 700;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          user-select: none;
        }

        :global(.btn-flip:hover:after) {
          opacity: 1;
          transform: translateY(0) rotateX(0);
        }

        :global(.btn-flip:hover:before) {
          opacity: 0;
          transform: translateY(50%) rotateX(90deg);
        }

        :global(.btn-flip:after) {
          top: 0;
          left: 0;
          opacity: 0;
          width: 100%;
          color: #323237;
          display: block;
          transition: 0.5s ease;
          position: absolute;
          background: #adadaf;
          content: attr(data-back);
          transform: translateY(-50%) rotateX(90deg);
          line-height: 40px;
          padding: 0 30px;
          box-sizing: border-box;
          white-space: nowrap;
        }

        :global(.btn-flip:before) {
          top: 0;
          left: 0;
          opacity: 1;
          color: #adadaf;
          display: block;
          padding: 0 30px;
          line-height: 40px;
          transition: 0.5s ease;
          position: relative;
          background: #323237;
          content: attr(data-front);
          transform: translateY(0) rotateX(0);
          box-sizing: border-box;
          white-space: nowrap;
        }

        @keyframes orbPulsePurple {
          0%, 100% {
            transform: scale(0.95);
            opacity: 0.75;
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
          }
        }

        @keyframes ringExpand {
          0% {
            transform: rotate(0deg) scale(0.95);
          }
          50% {
            transform: rotate(180deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) scale(0.95);
          }
        }

        @keyframes orbPulseGold {
          0%, 100% {
            transform: scale(0.95);
            opacity: 0.75;
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
          }
        }

        @keyframes ringExpandGold {
          0% {
            transform: rotate(0deg) scale(0.95);
          }
          50% {
            transform: rotate(180deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) scale(0.95);
          }
        }
      `}</style>
    </section>
  );
}
