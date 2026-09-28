export interface StudentOrbitFeature {
  id: string;
  index: number;
  title: string;
  desc: string;
  shortLabel: string;
  color: string;
  rgb: string;
  angleDeg: number; // angle on orbit ring (0 = right, 90 = bottom, 270 = top)
  direction: 'left' | 'right' | 'top';
  // Icon badge center offset from stage center (placed on orbit ring R=130)
  iconDx: number;
  iconDy: number;
  // Card slot: which vertical row in its column (0 = topmost)
  cardRow: number;
}

// Radius where icon badges are centered (must match OrbitProgressRing outerOrbitRadius)
export const ORBIT_ICON_RADIUS = 130;

// Column layout constants (used in VedikaOrbitStage to compute card positions)
export const CARD_COLUMN_X = 162;   // px from center to the near edge of card column
export const CARD_ROW_START_Y = -148; // px from center for row 0 (topmost card)
export const CARD_ROW_STEP_Y = 74;   // px between consecutive card rows

function iconPos(angleDeg: number): { iconDx: number; iconDy: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    iconDx: Math.round(ORBIT_ICON_RADIUS * Math.cos(rad)),
    iconDy: Math.round(ORBIT_ICON_RADIUS * Math.sin(rad)),
  };
}

/**
 * 9 Student Capabilities arranged as:
 *   - 1 card at top center  (direction: 'top', cardRow: 0)
 *   - 4 cards on right side (direction: 'right', cardRow: 0–3)
 *   - 4 cards on left side  (direction: 'left',  cardRow: 0–3)
 *
 * Icon angles (clock positions):
 *   Top   = 270° (12 o'clock)
 *   Right = 330°, 30°, 90°, 150° (~1, 2, 3, 5 o'clock)
 *   Left  = 210°, 240°, 180°, 225° (~7, 8, 9, ~10 o'clock)
 *
 * Cards are in explicit row slots so there is ZERO overlap regardless of card width.
 */
export const STUDENT_ORBIT_FEATURES: StudentOrbitFeature[] = [
  // ── TOP CARD (1 card, flows upward) ──────────────────────────────────────
  {
    id: 'non-judgmental',
    index: 1,
    title: 'Non-Judgmental Space',
    desc: 'Ask freely and make mistakes without fear.',
    shortLabel: 'Learn without fear',
    color: '#EC4899',
    rgb: '236, 72, 153',
    angleDeg: 270,         // 12 o'clock
    direction: 'top',
    ...iconPos(270),
    cardRow: 0,
  },

  // ── RIGHT COLUMN (4 cards, flow left→right) ───────────────────────────────
  {
    id: 'own-pace',
    index: 2,
    title: 'Learn at Your Own Pace',
    desc: 'Take your time, revisit difficult topics comfortably.',
    shortLabel: 'Your pace',
    color: '#3B82F6',
    rgb: '59, 130, 246',
    angleDeg: 330,         // ~11 o'clock on right side (upper-right)
    direction: 'right',
    ...iconPos(330),
    cardRow: 0,            // topmost right card
  },
  {
    id: 'concept-clarity',
    index: 3,
    title: 'Concept Clarity',
    desc: 'Step-by-step simple explanations with examples.',
    shortLabel: 'Understand deeply',
    color: '#10B981',
    rgb: '16, 185, 129',
    angleDeg: 30,          // ~1 o'clock (right, upper-mid)
    direction: 'right',
    ...iconPos(30),
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
    angleDeg: 90,          // 3 o'clock (right)
    direction: 'right',
    ...iconPos(90),
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
    angleDeg: 150,         // ~5 o'clock (right, lower)
    direction: 'right',
    ...iconPos(150),
    cardRow: 3,            // bottommost right card
  },

  // ── LEFT COLUMN (4 cards, flow right→left) ────────────────────────────────
  {
    id: 'practice-exam',
    index: 6,
    title: 'Practice & Exam Ready',
    desc: 'Instant quizzes, mock tests and instant feedback.',
    shortLabel: 'Exam ready',
    color: '#0284C7',
    rgb: '2, 132, 199',
    angleDeg: 210,         // ~7 o'clock (left, lower)
    direction: 'left',
    ...iconPos(210),
    cardRow: 3,            // bottommost left card
  },
  {
    id: 'interactive-learning',
    index: 7,
    title: 'Interactive Learning',
    desc: '3D visual simulations and active experiments.',
    shortLabel: 'Learn by doing',
    color: '#06B6D4',
    rgb: '6, 182, 212',
    angleDeg: 240,         // ~8 o'clock (left, lower-mid)
    direction: 'left',
    ...iconPos(240),
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
    angleDeg: 180,         // 9 o'clock (left)
    direction: 'left',
    ...iconPos(180),
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
    angleDeg: 225,         // ~10–11 o'clock (left, upper)
    direction: 'left',
    ...iconPos(225),
    cardRow: 0,            // topmost left card
  },
];
