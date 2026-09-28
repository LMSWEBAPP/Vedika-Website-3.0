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
  ICON_TOP_Y: 120,
  /** Icon badge radius = badge size (36px) / 2 */
  BADGE_R: 18,
  /** Gap in px between icon edge and card edge */
  CARD_GAP: 10,
  /** Card width in px */
  CARD_W: 215,
  /** Approximate card height in px (used for vertical centering) */
  CARD_H: 54,
  /**
   * Y offsets from stage center for each row (0–3), 80px apart.
   * Perfectly symmetric: [-120, -40, +40, +120].
   * Robot at Y=0 is the exact center of the full icon grid.
   */
  ROW_Y: [-120, -40, 40, 120] as readonly number[],
} as const;

/** Auto-advance interval in ms — also drives ring animation duration */
export const STEP_MS = 2500;

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
 * Clockwise from top (270°), exact 40° per step (360° / 9 = 40°).
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

/** Progress ring radius (100px) and canvas dimensions */
export const PROGRESS_R = 100;
export const ORBIT_SIZE = 300;
export const ORBIT_CENTER = 150;

export interface OrbitSegmentData {
  segmentIndex: number;
  fromFeatureIndex: number; // 1-based (1..9)
  toFeatureIndex: number;   // 1-based (1..9)
  startAngleDeg: number;
  endAngleDeg: number;
  spanDeg: number;
  arcLength: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  pathD: string;
  fromColor: string;
  toColor: string;
  fromRgb: [number, number, number];
  toRgb: [number, number, number];
  gradientId: string;
}

function parseRgbString(rgbStr: string): [number, number, number] {
  const parts = rgbStr.split(',').map((s) => parseInt(s.trim(), 10));
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
}

/**
 * Pre-computes the 9 continuous arc segments on the progress ring (R=100).
 * Every segment has an identical 40° span and identical arc length (69.81px).
 * Node 1 is at 270° (top), progressing clockwise in exact 40° increments.
 */
export function buildOrbitSegments(): OrbitSegmentData[] {
  const R = PROGRESS_R;
  const C = ORBIT_CENTER;
  const count = STUDENT_ORBIT_FEATURES.length; // 9

  const featureAngles = [270, 310, 350, 30, 70, 110, 150, 190, 230];

  const segments: OrbitSegmentData[] = [];

  for (let i = 0; i < count; i++) {
    const nextI = (i + 1) % count;
    const a1 = featureAngles[i];
    let a2 = featureAngles[nextI];
    let span = a2 - a1;
    if (span <= 0) span += 360;

    // Identical arc length for all segments: (40 / 360) * 2 * PI * 100 = 69.81px
    const arcLength = parseFloat(((span / 360) * 2 * Math.PI * R).toFixed(2));

    const rad1 = (a1 * Math.PI) / 180;
    const rad2 = (a2 * Math.PI) / 180;

    const startX = parseFloat((C + R * Math.cos(rad1)).toFixed(2));
    const startY = parseFloat((C + R * Math.sin(rad1)).toFixed(2));
    const endX = parseFloat((C + R * Math.cos(rad2)).toFixed(2));
    const endY = parseFloat((C + R * Math.sin(rad2)).toFixed(2));

    const pathD = `M ${startX} ${startY} A ${R} ${R} 0 0 1 ${endX} ${endY}`;
    const featFrom = STUDENT_ORBIT_FEATURES[i];
    const featTo = STUDENT_ORBIT_FEATURES[nextI];

    segments.push({
      segmentIndex: i,
      fromFeatureIndex: featFrom.index,
      toFeatureIndex: featTo.index,
      startAngleDeg: a1,
      endAngleDeg: a2,
      spanDeg: span,
      arcLength,
      startX,
      startY,
      endX,
      endY,
      pathD,
      fromColor: featFrom.color,
      toColor: featTo.color,
      fromRgb: parseRgbString(featFrom.rgb),
      toRgb: parseRgbString(featTo.rgb),
      gradientId: `orbitSegGrad_${i}`,
    });
  }

  return segments;
}

export const ORBIT_SEGMENTS: OrbitSegmentData[] = buildOrbitSegments();

export interface NodePositionData {
  iconCx: number;
  iconCy: number;
  cardCss: React.CSSProperties;
}

/**
 * Precomputed 360-degree circular positions for all 9 orbital nodes and cards.
 * Exact 40° intervals centered around Vedika with clean spacing.
 */
export const NODE_POSITIONS: Record<number, NodePositionData> = {
  1: {
    iconCx: 0,
    iconCy: -100,
    cardCss: {
      left: 'calc(50% - 105px)',
      bottom: 'calc(50% + 128px)',
    },
  },
  2: {
    iconCx: 64,
    iconCy: -77,
    cardCss: {
      left: 'calc(50% + 92px)',
      top: 'calc(50% - 100px)',
    },
  },
  3: {
    iconCx: 98,
    iconCy: -17,
    cardCss: {
      left: 'calc(50% + 126px)',
      top: 'calc(50% - 42px)',
    },
  },
  4: {
    iconCx: 87,
    iconCy: 50,
    cardCss: {
      left: 'calc(50% + 115px)',
      top: 'calc(50% + 28px)',
    },
  },
  5: {
    iconCx: 34,
    iconCy: 94,
    cardCss: {
      left: 'calc(50% + 62px)',
      top: 'calc(50% + 88px)',
    },
  },
  6: {
    iconCx: -34,
    iconCy: 94,
    cardCss: {
      right: 'calc(50% + 62px)',
      top: 'calc(50% + 88px)',
    },
  },
  7: {
    iconCx: -87,
    iconCy: 50,
    cardCss: {
      right: 'calc(50% + 115px)',
      top: 'calc(50% + 28px)',
    },
  },
  8: {
    iconCx: -98,
    iconCy: -17,
    cardCss: {
      right: 'calc(50% + 126px)',
      top: 'calc(50% - 42px)',
    },
  },
  9: {
    iconCx: -64,
    iconCy: -77,
    cardCss: {
      right: 'calc(50% + 92px)',
      top: 'calc(50% - 100px)',
    },
  },
};

/** Initial bead position (Node 1, top center, 270°) */
export const BEAD_START_X = ORBIT_CENTER;
export const BEAD_START_Y = ORBIT_CENTER - PROGRESS_R; // 150 - 95 = 55

/** Recommended cinematic timeline timings (in ms) */
export const ORBIT_TIMINGS = {
  CARD_EXPAND: 500,
  CARD_READ: 2400,
  CARD_COLLAPSE: 400,
  SEGMENT_TRAVEL: 1100,
  FINAL_CLOSING_TRAVEL: 1200,
} as const;

