'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeId, VedikaTheme, themes, ACTIVE_THEME, getTheme } from '@/themes';

interface ThemeContextType {
  themeId: ThemeId;
  theme: VedikaTheme;
  setThemeId: (id: ThemeId) => void;
  availableThemes: VedikaTheme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(ACTIVE_THEME);
  const theme = getTheme(themeId);

  useEffect(() => {
    // Synchronize CSS custom properties with active theme
    const root = document.documentElement;
    const colors = theme.colors;

    root.style.setProperty('--bg-deepest', colors.backgroundDeepest);
    root.style.setProperty('--bg-primary', colors.backgroundPrimary);
    root.style.setProperty('--bg-secondary', colors.backgroundSecondary);
    root.style.setProperty('--text-primary', colors.textPrimary);
    root.style.setProperty('--text-secondary', colors.textSecondary);
    root.style.setProperty('--text-muted', colors.textMuted);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--accent-bright', colors.accentBright || colors.accent);
    root.style.setProperty('--accent-warm', colors.accentWarm || colors.accent);
    root.style.setProperty('--border-subtle', colors.border);
    root.style.setProperty('--glow-subtle', colors.glow);
    root.style.setProperty('--bg-gradient', colors.gradient);
    root.setAttribute('data-theme', themeId);
  }, [theme, themeId]);

  const availableThemes = Object.values(themes);

  return (
    <ThemeContext.Provider value={{ themeId, theme, setThemeId, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
