export interface StudentOrbitFeature {
  id: string;
  index: number;
  title: string;
  desc: string;
  shortLabel: string;
  color: string;
  rgb: string;
  angleDeg: number;
  direction: 'left' | 'right' | 'top';
  // (dx, dy) relative to orbit center in pixels
  dx: number;
  dy: number;
}

export const STUDENT_ORBIT_FEATURES: StudentOrbitFeature[] = [
  {
    id: 'study-companion',
    index: 1,
    title: '24/7 Study Companion',
    desc: 'Get help whenever you need it — day or night.',
    shortLabel: 'Always available',
    color: '#F59E0B',
    rgb: '245, 158, 11',
    angleDeg: 322,
    direction: 'left',
    dx: -78,
    dy: -99,
  },
  {
    id: 'non-judgmental',
    index: 2,
    title: 'Non-Judgmental Space',
    desc: 'Ask freely and make mistakes without fear.',
    shortLabel: 'Learn without fear',
    color: '#EC4899',
    rgb: '236, 72, 153',
    angleDeg: 0,
    direction: 'top',
    dx: 0,
    dy: -126,
  },
  {
    id: 'own-pace',
    index: 3,
    title: 'Learn at Your Own Pace',
    desc: 'Take your time, revisit difficult topics comfortably.',
    shortLabel: 'Your pace',
    color: '#3B82F6',
    rgb: '59, 130, 246',
    angleDeg: 38,
    direction: 'right',
    dx: 78,
    dy: -99,
  },
  {
    id: 'concept-clarity',
    index: 4,
    title: 'Concept Clarity',
    desc: 'Step-by-step simple explanations with examples.',
    shortLabel: 'Understand deeply',
    color: '#10B981',
    rgb: '16, 185, 129',
    angleDeg: 80,
    direction: 'right',
    dx: 124,
    dy: -22,
  },
  {
    id: 'personalized-support',
    index: 5,
    title: 'Personalized Support',
    desc: 'Adapts to your style and targets weak areas.',
    shortLabel: 'Made for you',
    color: '#F43F5E',
    rgb: '244, 63, 94',
    angleDeg: 120,
    direction: 'right',
    dx: 109,
    dy: 63,
  },
  {
    id: 'build-confidence',
    index: 6,
    title: 'Build Confidence',
    desc: 'Turn doubts into lasting mastery and curiosity.',
    shortLabel: 'Confidence first',
    color: '#8B5CF6',
    rgb: '139, 92, 246',
    angleDeg: 155,
    direction: 'right',
    dx: 53,
    dy: 135,
  },
  {
    id: 'practice-exam',
    index: 7,
    title: 'Practice & Exam Ready',
    desc: 'Instant quizzes, mock tests and instant feedback.',
    shortLabel: 'Exam ready',
    color: '#0284C7',
    rgb: '2, 132, 199',
    angleDeg: 205,
    direction: 'left',
    dx: -53,
    dy: 135,
  },
  {
    id: 'interactive-learning',
    index: 8,
    title: 'Interactive Learning',
    desc: '3D visual simulations and active experiments.',
    shortLabel: 'Learn by doing',
    color: '#06B6D4',
    rgb: '6, 182, 212',
    angleDeg: 240,
    direction: 'left',
    dx: -109,
    dy: 63,
  },
  {
    id: 'unlimited-questions',
    index: 9,
    title: 'Ask Unlimited Questions',
    desc: 'Ask anything anytime, as often as needed.',
    shortLabel: 'Zero limits',
    color: '#A855F7',
    rgb: '168, 85, 247',
    angleDeg: 280,
    direction: 'left',
    dx: -124,
    dy: -22,
  },
];
