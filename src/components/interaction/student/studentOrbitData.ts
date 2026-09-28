export interface StudentOrbitFeature {
  id: string;
  index: number;
  title: string;
  desc: string;
  shortLabel: string;
  accentName: string;
  color: string;
  rgb: string;
  positionClass: string;
}

export const STUDENT_ORBIT_FEATURES: StudentOrbitFeature[] = [
  {
    id: 'study-companion',
    index: 1,
    title: '24/7 Study Companion',
    desc: 'Get help whenever you need it — morning, evening, or late at night.',
    shortLabel: 'Always available',
    accentName: 'Amber',
    color: '#F59E0B',
    rgb: '245, 158, 11',
    positionClass: 'orbit-pos-top-left',
  },
  {
    id: 'non-judgmental',
    index: 2,
    title: 'Non-Judgmental Space',
    desc: 'Ask questions freely, make mistakes, and learn without embarrassment.',
    shortLabel: 'Learn without fear',
    accentName: 'Pink / Rose',
    color: '#EC4899',
    rgb: '236, 72, 153',
    positionClass: 'orbit-pos-top-center',
  },
  {
    id: 'own-pace',
    index: 3,
    title: 'Learn at Your Own Pace',
    desc: 'Take your time, revisit difficult topics, and learn comfortably.',
    shortLabel: 'Your pace',
    accentName: 'Electric Blue',
    color: '#3B82F6',
    rgb: '59, 130, 246',
    positionClass: 'orbit-pos-top-right',
  },
  {
    id: 'concept-clarity',
    index: 4,
    title: 'Concept Clarity',
    desc: 'Simple step-by-step explanations with relatable everyday examples.',
    shortLabel: 'Understand deeply',
    accentName: 'Emerald Green',
    color: '#10B981',
    rgb: '16, 185, 129',
    positionClass: 'orbit-pos-upper-right',
  },
  {
    id: 'personalized-support',
    index: 5,
    title: 'Personalized Support',
    desc: 'Adapts to your learning style and focuses directly on weak areas.',
    shortLabel: 'Made for you',
    accentName: 'Coral Rose',
    color: '#F43F5E',
    rgb: '244, 63, 94',
    positionClass: 'orbit-pos-lower-right',
  },
  {
    id: 'build-confidence',
    index: 6,
    title: 'Build Confidence',
    desc: 'Turn doubts into strengths and enjoy every step of learning.',
    shortLabel: 'Confidence first',
    accentName: 'Violet',
    color: '#8B5CF6',
    rgb: '139, 92, 246',
    positionClass: 'orbit-pos-bottom-right',
  },
  {
    id: 'practice-exam',
    index: 7,
    title: 'Practice & Exam Ready',
    desc: 'Instant quizzes, practice problems, and instant diagnostic feedback.',
    shortLabel: 'Exam ready',
    accentName: 'Sky Blue',
    color: '#0284C7',
    rgb: '2, 132, 199',
    positionClass: 'orbit-pos-bottom-left',
  },
  {
    id: 'interactive-learning',
    index: 8,
    title: 'Interactive Learning',
    desc: 'Explore 3D simulations, visual explanations, and virtual experiments.',
    shortLabel: 'Learn by exploring',
    accentName: 'Cyan',
    color: '#06B6D4',
    rgb: '6, 182, 212',
    positionClass: 'orbit-pos-lower-left',
  },
  {
    id: 'unlimited-questions',
    index: 9,
    title: 'Ask Unlimited Questions',
    desc: 'Ask anything, at any time, as many times as you need without limit.',
    shortLabel: 'No limits',
    accentName: 'Purple',
    color: '#A855F7',
    rgb: '168, 85, 247',
    positionClass: 'orbit-pos-upper-left',
  },
];
