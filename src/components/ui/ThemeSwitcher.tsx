'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { ThemeId } from '@/themes';
import { Palette, ChevronDown } from 'lucide-react';

export function ThemeSwitcher() {
  const { themeId, theme, setThemeId, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Current theme: ${theme.name}. Select theme`}
        aria-expanded={isOpen}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: `1px solid ${theme.colors.border}`,
          color: theme.colors.textSecondary,
          fontSize: '0.8125rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          backdropFilter: 'blur(10px)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = theme.colors.accent;
          e.currentTarget.style.color = theme.colors.textPrimary;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = theme.colors.border;
          e.currentTarget.style.color = theme.colors.textSecondary;
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: theme.colors.accent,
            boxShadow: `0 0 8px ${theme.colors.glow}`,
          }}
        />
        <span>{theme.name}</span>
        <ChevronDown
          size={13}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '210px',
            backgroundColor: 'rgba(10, 10, 14, 0.85)',
            border: `1px solid ${theme.colors.border}`,
            borderRadius: '12px',
            padding: '6px',
            backdropFilter: 'blur(20px)',
            boxShadow: `0 16px 36px rgba(0, 0, 0, 0.6), 0 0 20px ${theme.colors.glow}`,
            zIndex: 50,
          }}
        >
          {availableThemes.map((item) => {
            const isSelected = item.id === themeId;
            return (
              <button
                key={item.id}
                role="menuitem"
                onClick={() => {
                  setThemeId(item.id as ThemeId);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                  color: isSelected ? theme.colors.textPrimary : theme.colors.textSecondary,
                  fontSize: '0.8125rem',
                  fontWeight: isSelected ? 600 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = theme.colors.textPrimary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = theme.colors.textSecondary;
                  }
                }}
              >
                <span>{item.name}</span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: item.colors.accent,
                    }}
                  />
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: item.colors.backgroundPrimary,
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
