export interface StudentOrbitFeature {
  id: string;
  index: number;
  title: string;
  desc: string;
  shortLabel: string;
  color: string;
  rgb: string;
  direction: 'left' | 'right' | 'top';
  /**
   * Vertical row slot index within its column (0 = topmost).
   * For 'top' direction always 0.
   */
  cardRow: number;
}

/**
 * Single source-of-truth layout constants.
 * All position calculations in VedikaOrbitStage derive from here.
 */
export const LAYOUT = {
  /** Horizontal distance from stage center to icon badge center (left & right sides) */
  ICON_SIDE_X: 130,
  /** Vertical distance from stage center to top icon badge center (upward) */
  ICON_TOP_Y: 128,
  /** Icon badge radius = badge size (36px) / 2 */
  BADGE_R: 18,
  /** Gap in px between icon edge and card edge */
  CARD_GAP: 10,
  /** Card width in px */
  CARD_W: 215,
  /** Approximate card height in px (used for vertical centering) */
  CARD_H: 54,
  /**
   * Y offsets from stage center for each row (0–3), 74px apart.
   * Symmetrically centered: [-111, -37, +37, +111]
   */
  ROW_Y: [-111, -37, 37, 111] as readonly number[],
} as const;

/**
 * 9 student capabilities.
 *
 * Reveal sequence (clockwise from top):
 *   1. Top center
 *   2–5. Right column, rows 0→3 (top to bottom)
 *   6–9. Left column, rows 3→0 (bottom to top)
 *
 * This creates a smooth clockwise reveal starting from 12 o'clock.
 */
export const STUDENT_ORBIT_FEATURES: StudentOrbitFeature[] = [
  // ── TOP ──────────────────────────────────────────────────────────────────
  {
    id: 'non-judgmental',
    index: 1,
    title: 'Non-Judgmental Space',
    desc: 'Ask freely and make mistakes without fear.',
    shortLabel: 'Learn without fear',
    color: '#EC4899',
    rgb: '236, 72, 153',
    direction: 'top',
    cardRow: 0,
  },

  // ── RIGHT COLUMN (rows 0 → 3, top → bottom) ──────────────────────────────
  {
    id: 'own-pace',
    index: 2,
    title: 'Learn at Your Own Pace',
    desc: 'Take your time, revisit difficult topics comfortably.',
    shortLabel: 'Your pace',
    color: '#3B82F6',
    rgb: '59, 130, 246',
    direction: 'right',
    cardRow: 0,
  },
  {
    id: 'concept-clarity',
    index: 3,
    title: 'Concept Clarity',
    desc: 'Step-by-step simple explanations with examples.',
    shortLabel: 'Understand deeply',
    color: '#10B981',
    rgb: '16, 185, 129',
    direction: 'right',
    cardRow: 1,
  },
  {
    id: 'personalized-support',
    index: 4,
    title: 'Personalized Support',
    desc: 'Adapts to your style and targets weak areas.',
    shortLabel: 'Made for you',
    color: '#F43F5E',
    rgb: '244, 63, 94',
    direction: 'right',
    cardRow: 2,
  },
  {
    id: 'build-confidence',
    index: 5,
    title: 'Build Confidence',
    desc: 'Turn doubts into lasting mastery and curiosity.',
    shortLabel: 'Confidence first',
    color: '#8B5CF6',
    rgb: '139, 92, 246',
    direction: 'right',
    cardRow: 3,
  },

  // ── LEFT COLUMN (rows 3 → 0, bottom → top) ───────────────────────────────
  {
    id: 'practice-exam',
    index: 6,
    title: 'Practice & Exam Ready',
    desc: 'Instant quizzes, mock tests and instant feedback.',
    shortLabel: 'Exam ready',
    color: '#0284C7',
    rgb: '2, 132, 199',
    direction: 'left',
    cardRow: 3,
  },
  {
    id: 'interactive-learning',
    index: 7,
    title: 'Interactive Learning',
    desc: '3D visual simulations and active experiments.',
    shortLabel: 'Learn by doing',
    color: '#06B6D4',
    rgb: '6, 182, 212',
    direction: 'left',
    cardRow: 2,
  },
  {
    id: 'unlimited-questions',
    index: 8,
    title: 'Ask Unlimited Questions',
    desc: 'Ask anything anytime, as often as needed.',
    shortLabel: 'Zero limits',
    color: '#A855F7',
    rgb: '168, 85, 247',
    direction: 'left',
    cardRow: 1,
  },
  {
    id: 'study-companion',
    index: 9,
    title: '24/7 Study Companion',
    desc: 'Get help whenever you need it — day or night.',
    shortLabel: 'Always available',
    color: '#F59E0B',
    rgb: '245, 158, 11',
    direction: 'left',
    cardRow: 0,
  },
];

/**
 * Progress ring bead angle (degrees) for each active step.
 * Clockwise from top (270°), 40° per step.
 */
export const BEAD_ANGLES: Record<number, number> = {
  1: 270,
  2: 310,
  3: 350,
  4: 30,
  5: 70,
  6: 110,
  7: 150,
  8: 190,
  9: 230,
};
