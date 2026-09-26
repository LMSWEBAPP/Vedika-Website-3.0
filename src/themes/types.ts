export type ThemeId = 'midnight-cyan' | 'warm-espresso' | 'maroon-ivory';

export interface ThemeColors {
  backgroundDeepest: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  deepAccent?: string;
  accent: string;
  accentBright?: string;
  accentWarm?: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textDark?: string;
  border: string;
  glow: string;
  gradient: string;
}

export interface ThemeLighting {
  keyColor: string;
  keyIntensity: number;
  keyPosition: [number, number, number];
  fillColor: string;
  fillIntensity: number;
  fillPosition: [number, number, number];
  rimColor: string;
  rimIntensity: number;
  rimPosition: [number, number, number];
  ambientColor: string;
  ambientIntensity: number;
  envGlowColor: string;
  envGlowIntensity: number;
}

export interface ThemeParticles {
  color: string;
  secondaryColor: string;
  count: number;
  size: number;
  speed: number;
  opacity: number;
}

export interface VedikaTheme {
  id: ThemeId;
  name: string;
  tagline: string;
  colors: ThemeColors;
  lighting: ThemeLighting;
  particles: ThemeParticles;
}
