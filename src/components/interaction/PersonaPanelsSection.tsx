'use client';

import React, { useState } from 'react';
import PersonaParticleBot from './PersonaParticleBot';
import CentralVedika3D from './CentralVedika3D';
import '@/styles/persona-panels.css';

export type PersonaRole = 'student' | 'teacher' | 'admin';

const studentFeatures = [
  {
    id: 'top-center',
    title: 'Non-Judgemental Space',
    desc: 'Ask anything without fear. Mistakes are part of learning.',
    color: '#EC4899',
    rgb: '236, 72, 153',
    positionClass: 'pos-top-center',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
  },
  {
    id: 'top-left',
    title: '24/7 Study Companion',
    desc: 'Get help anytime, anywhere. Never feel stuck again.',
    color: '#F59E0B',
    rgb: '245, 158, 11',
    positionClass: 'pos-top-left',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: 'top-right',
    title: 'Learn at Your Own Pace',
    desc: 'Take your time, revisit topics, and learn comfortably.',
    color: '#3B82F6',
    rgb: '59, 130, 246',
    positionClass: 'pos-top-right',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'mid-left',
    title: 'Ask Unlimited Questions',
    desc: 'Ask at any point of time, as many times as you want.',
    color: '#A855F7',
    rgb: '168, 85, 247',
    positionClass: 'pos-mid-left',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'mid-right',
    title: 'Concept Clarity',
    desc: 'Get simple, step-by-step explanations with examples.',
    color: '#10B981',
    rgb: '16, 185, 129',
    positionClass: 'pos-mid-right',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    id: 'lower-left',
    title: 'Interactive Learning',
    desc: 'Explore 3D labs, simulations and real-world examples.',
    color: '#06B6D4',
    rgb: '6, 182, 212',
    positionClass: 'pos-lower-left',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
        <line x1="8.5" x2="15.5" y1="2" y2="2" />
      </svg>
    ),
  },
  {
    id: 'lower-right',
    title: 'Personalized Support',
    desc: 'Adapts to your learning style and focuses on your weak areas.',
    color: '#F43F5E',
    rgb: '244, 63, 94',
    positionClass: 'pos-lower-right',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: 'bottom-left',
    title: 'Exam & Practice Ready',
    desc: 'Get quizzes, practice sets and instant feedback.',
    color: '#0284C7',
    rgb: '2, 132, 199',
    positionClass: 'pos-bottom-left',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
      </svg>
    ),
  },
  {
    id: 'bottom-right',
    title: 'Build Confidence',
    desc: 'Turn doubts into strengths and enjoy the learning journey.',
    color: '#8B5CF6',
    rgb: '139, 92, 246',
    positionClass: 'pos-bottom-right',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
      </svg>
    ),
  },
];

export default function PersonaPanelsSection() {
  const [activeRole, setActiveRole] = useState<PersonaRole>('student');

  // Carousel slide indexes for teacher & admin roles
  const [teacherSlide, setTeacherSlide] = useState(0);
  const [adminSlide, setAdminSlide] = useState(0);

  const teacherDilemmas = [
    {
      dilemmaTitle: 'Repetitive Doubts Drainage',
      dilemmaDesc: 'Answering the same fundamental question 40 times a day drains mental energy and leaves zero time for deep classroom discussions.',
      rectTitle: '24/7 Tier-1 Socratic Assistant',
      rectDesc: 'Vedika instantly resolves foundational doubts around the clock, escalating only novel, high-leverage inquiries to the teacher.',
      impact: '⏱️ 15+ Hours Saved Weekly',
    },
    {
      dilemmaTitle: 'Crushing Weekend Grading Load',
      dilemmaDesc: 'Spending 12–15 hours every weekend grading handwritten derivations, lab reports, and subjective assignments.',
      rectTitle: 'Instant Multi-Modal Rubric Grading',
      rectDesc: 'Snap or upload handwritten student papers. Vedika grades against customized rubrics in seconds with step-by-step diagnostic feedback.',
      impact: '⚡ 5-Second Multi-Modal Grading',
    },
    {
      dilemmaTitle: 'Silent Student Struggles',
      dilemmaDesc: 'Quiet students fall behind silently in 50-student classrooms without the teacher realizing until mid-term exam failure.',
      rectTitle: 'Real-Time Class Comprehension Radar',
      rectDesc: 'Live comprehension telemetry and heatmaps surface class-wide misconceptions before you step into the next lecture.',
      impact: '🎯 100% Comprehension Visibility',
    },
    {
      dilemmaTitle: 'Fragmented Lesson Prep & Worksheets',
      dilemmaDesc: 'Hunting for diagrams, slides, and differentiated quiz questions across disparate portals and outdated textbooks.',
      rectTitle: '1-Click Curriculum Lesson Generator',
      rectDesc: 'Generate rich interactive presentation slides, 3D lab simulations, and multi-tier difficulty worksheets aligned to your board.',
      impact: '📚 1-Click Board Alignment',
    },
  ];

  // Role Switcher Tabs (Aligned with the 30% partition column)
  const renderRoleTabs = () => (
    <nav className="role-tabs-pill-bar" aria-label="Select Persona Role">
      <button
        type="button"
        className={`role-tab-btn ${activeRole === 'student' ? 'active student' : ''}`}
        onClick={() => setActiveRole('student')}
        aria-selected={activeRole === 'student'}
      >
        <span>🎓</span>
        <span>Student</span>
      </button>

      <button
        type="button"
        className={`role-tab-btn ${activeRole === 'teacher' ? 'active teacher' : ''}`}
        onClick={() => setActiveRole('teacher')}
        aria-selected={activeRole === 'teacher'}
      >
        <span>👩‍🏫</span>
        <span>Teacher</span>
      </button>

      <button
        type="button"
        className={`role-tab-btn ${activeRole === 'admin' ? 'active admin' : ''}`}
        onClick={() => setActiveRole('admin')}
        aria-selected={activeRole === 'admin'}
      >
        <span>🏛️</span>
        <span>Admin</span>
      </button>
    </nav>
  );

  return (
    <div className="persona-panels-wrapper" aria-label="Vedika 3-Panel Platform Ecosystem">
      {/* Main Sliding Asymmetric Split Screen (Zero Vertical Scroll) */}
      <main className={`persona-split-container mode-${activeRole}`}>
        
        {/* ============================================================== */}
        {/* 1. STUDENT CONTENT PANEL (70% Left when active)                 */}
        {/* ============================================================== */}
        <section className="panel-section-slot student-content" aria-label="Student Learning Experience">
          <div className="student-header-box">
            <div className="student-eyebrow">
              STUDENT EXPERIENCE • INFINITE 1-ON-1 AI MENTORSHIP
            </div>
            <h1 className="student-main-title">
              Learning Without Limits, <br />
              at <span style={{ color: '#F43F5E' }}>Your</span>{' '}
              <span style={{ color: '#06B6D4' }}>Own Pace</span>
            </h1>
          </div>

          {/* Symmetrical Constellation / Orbital Stage */}
          <div className="student-orbital-stage">
            {/* SVG Connecting Circuits & Radial Orbital Paths */}
            <svg
              className="orbital-circuits-svg"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* 1. Top-Center (Pink) */}
              <path d="M 500 195 L 500 36" stroke="rgba(236, 72, 153, 0.50)" strokeWidth="1.6" strokeDasharray="3 3" fill="none" />
              <circle cx="500" cy="195" r="7" fill="#EC4899" opacity="0.25" />
              <circle cx="500" cy="195" r="3.5" fill="#EC4899" />

              {/* 2. Top-Left (Amber) */}
              <path d="M 420 225 C 320 160, 220 85, 135 36" stroke="rgba(245, 158, 11, 0.50)" strokeWidth="1.6" strokeDasharray="3 3" fill="none" />
              <circle cx="420" cy="225" r="7" fill="#F59E0B" opacity="0.25" />
              <circle cx="420" cy="225" r="3.5" fill="#F59E0B" />

              {/* 3. Top-Right (Blue) */}
              <path d="M 580 225 C 680 160, 780 85, 865 36" stroke="rgba(59, 130, 246, 0.50)" strokeWidth="1.6" strokeDasharray="3 3" fill="none" />
              <circle cx="580" cy="225" r="7" fill="#3B82F6" opacity="0.25" />
              <circle cx="580" cy="225" r="3.5" fill="#3B82F6" />

              {/* 4. Mid-Left (Purple) */}
              <path d="M 375 270 L 85 180" stroke="rgba(168, 85, 247, 0.50)" strokeWidth="1.6" strokeDasharray="3 3" fill="none" />
              <circle cx="375" cy="270" r="7" fill="#A855F7" opacity="0.25" />
              <circle cx="375" cy="270" r="3.5" fill="#A855F7" />

              {/* 5. Mid-Right (Emerald) */}
              <path d="M 625 270 L 915 180" stroke="rgba(16, 185, 129, 0.50)" strokeWidth="1.6" strokeDasharray="3 3" fill="none" />
              <circle cx="625" cy="270" r="7" fill="#10B981" opacity="0.25" />
              <circle cx="625" cy="270" r="3.5" fill="#10B981" />

              {/* 6. Lower-Left (Cyan) */}
              <path d="M 385 340 L 85 325" stroke="rgba(6, 182, 212, 0.50)" strokeWidth="1.6" strokeDasharray="3 3" fill="none" />
              <circle cx="385" cy="340" r="7" fill="#06B6D4" opacity="0.25" />
              <circle cx="385" cy="340" r="3.5" fill="#06B6D4" />

              {/* 7. Lower-Right (Rose) */}
              <path d="M 615 340 L 915 325" stroke="rgba(244, 63, 94, 0.50)" strokeWidth="1.6" strokeDasharray="3 3" fill="none" />
              <circle cx="615" cy="340" r="7" fill="#F43F5E" opacity="0.25" />
              <circle cx="615" cy="340" r="3.5" fill="#F43F5E" />

              {/* 8. Bottom-Left (Sky Blue) */}
              <path d="M 440 395 C 380 445, 315 490, 255 535" stroke="rgba(2, 132, 199, 0.50)" strokeWidth="1.6" strokeDasharray="3 3" fill="none" />
              <circle cx="440" cy="395" r="7" fill="#0284C7" opacity="0.25" />
              <circle cx="440" cy="395" r="3.5" fill="#0284C7" />

              {/* 9. Bottom-Right (Violet) */}
              <path d="M 560 395 C 620 445, 685 490, 745 535" stroke="rgba(139, 92, 246, 0.50)" strokeWidth="1.6" strokeDasharray="3 3" fill="none" />
              <circle cx="560" cy="395" r="7" fill="#8B5CF6" opacity="0.25" />
              <circle cx="560" cy="395" r="3.5" fill="#8B5CF6" />
            </svg>

            {/* Central 3D Vedika Pod (Perfect Concentric Circular Framing) */}
            <div className="orbital-center-pod">
              {/* Outer Dashed Concentric Ring */}
              <div className="concentric-ring outer-ring" />

              {/* Inner Solid Concentric Ring with Radial Vignette */}
              <div className="concentric-ring inner-ring" />

              {/* Holographic Glowing Elliptical Platform under Vedika */}
              <div className="orbital-hologram-base" />

              {/* 3D Vedika Canvas (Dead Centered Inside Ring) */}
              <div className="orbital-center-canvas">
                <CentralVedika3D />
              </div>

              {/* Central Brand Identification */}
              <div className="orbital-brand-pill">
                <div className="orbital-brand-title">VEDIKA</div>
                <div className="orbital-brand-sub">Your 24/7 Learning Companion</div>
              </div>
            </div>

            {/* 9 Symmetrical Orbital Feature Capsules */}
            {studentFeatures.map((feat) => (
              <div
                key={feat.id}
                className={`student-capsule-card ${feat.positionClass}`}
                style={{
                  borderColor: `${feat.color}77`,
                  boxShadow: `0 8px 24px rgba(0, 0, 0, 0.55), 0 0 16px ${feat.color}25`,
                }}
              >
                {/* Circular Icon Badge */}
                <div
                  className="capsule-icon-badge"
                  style={{
                    backgroundColor: '#090E1A',
                    borderColor: feat.color,
                    color: feat.color,
                    boxShadow: `0 0 12px ${feat.color}66, 0 4px 8px rgba(0, 0, 0, 0.7)`,
                  }}
                >
                  {feat.icon}
                </div>

                <div className="capsule-title">{feat.title}</div>
                <p className="capsule-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* 2. STUDENT SIDEBAR (30% Right: Student Bot & Role Tabs)         */}
        {/* ============================================================== */}
        <aside className="panel-section-slot student-side" aria-label="Student AI Companion Persona">
          <div className="persona-sidebar-inner">
            {/* Role Switcher Pill Bar aligned directly with this partition */}
            {renderRoleTabs()}

            {/* Normal 3D Human Kid Particle Bot (Gapless, Prominent Colors, Stable) */}
            <div className="persona-bot-halo-wrapper">
              <div className="persona-ambient-halo student" />
              <PersonaParticleBot
                src="/assets/human-student.png"
                width={270}
                height={335}
              />
            </div>

            <div className="persona-action-group">
              <button
                type="button"
                className="persona-primary-btn student-btn"
                onClick={() => setActiveRole('teacher')}
              >
                <span>Explore Teacher Experience</span>
                <span>➔</span>
              </button>

              <div className="persona-chips-row">
                <span>📚 Socratic AI</span>
                <span>•</span>
                <span>🎙️ Viva Defense</span>
                <span>•</span>
                <span>🧪 3D Labs</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ============================================================== */}
        {/* 3. TEACHER SIDEBAR (30% Left: Normal 3D Teacher Particle Bot)  */}
        {/* ============================================================== */}
        <aside className="panel-section-slot teacher-side" aria-label="Teacher Co-Pilot Persona">
          <div className="persona-sidebar-inner">
            {/* Role Switcher Pill Bar aligned directly with this partition */}
            {renderRoleTabs()}

            {/* Normal 3D Human Teacher Particle Bot */}
            <div className="persona-bot-halo-wrapper">
              <div className="persona-ambient-halo teacher" />
              <PersonaParticleBot
                src="/assets/human-teacher.png"
                width={270}
                height={335}
              />
            </div>

            <div className="persona-action-group">
              <button
                type="button"
                className="persona-primary-btn teacher-btn"
                onClick={() => setActiveRole('admin')}
              >
                <span>Explore Admin Experience</span>
                <span>➔</span>
              </button>

              <button
                type="button"
                className="persona-secondary-btn"
                onClick={() => setActiveRole('student')}
              >
                <span>← Back to Student</span>
              </button>

              <div className="persona-chips-row">
                <span>⚡ Auto Grading</span>
                <span>•</span>
                <span>⏱️ 15h Saved/Wk</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ============================================================== */}
        {/* 4. TEACHER CONTENT (70% Right: Dilemmas vs Solutions Carousel)  */}
        {/* ============================================================== */}
        <section className="panel-section-slot teacher-content" aria-label="Teacher Dilemmas and Vedika Rectifications">
          <div className="content-header-bar">
            <div className="content-eyebrow" style={{ color: '#FBBF24' }}>
              Teacher Empowerment • AI Co-Pilot
            </div>
            <h1 className="content-title">
              Eliminate Burnout. Reclaim the Joy of Teaching.
            </h1>
            <p className="content-subtitle">
              Traditional teaching is weighed down by repetitive administrative drudgery, midnight grading, and fragmented resources. Vedika handles the routine friction so you can focus on inspiring your students.
            </p>
          </div>

          {/* Zero-Scroll Dilemma Carousel */}
          <div className="persona-carousel-wrapper">
            <div className="persona-carousel-viewport">
              <div
                className="persona-carousel-track"
                style={{ transform: `translateX(-${teacherSlide * 100}%)` }}
              >
                {teacherDilemmas.map((item, idx) => (
                  <div key={idx} className="persona-carousel-slide">
                    <div className="teacher-slide-container">
                      <div className="comparison-duo-panel">
                        <div className="dilemma-block">
                          <span className="dilemma-label">⚠️ Traditional Friction</span>
                          <h3 className="dilemma-title">{item.dilemmaTitle}</h3>
                          <p className="dilemma-desc">{item.dilemmaDesc}</p>
                        </div>

                        <div className="comparison-arrow">➔</div>

                        <div className="rectification-block">
                          <span className="rectification-label">✨ Vedika AI Resolution</span>
                          <h3 className="rectification-title">{item.rectTitle}</h3>
                          <p className="rectification-desc">{item.rectDesc}</p>
                          <span className="impact-pill">{item.impact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="carousel-controls-bar">
              <div className="carousel-dots-group">
                {teacherDilemmas.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`carousel-dot ${teacherSlide === idx ? 'active teacher' : ''}`}
                    onClick={() => setTeacherSlide(idx)}
                    aria-label={`Go to dilemma slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="carousel-nav-btn"
                  onClick={() => setTeacherSlide((prev) => Math.max(0, prev - 1))}
                  disabled={teacherSlide === 0}
                >
                  ‹ Prev Dilemma
                </button>
                <button
                  type="button"
                  className="carousel-nav-btn"
                  onClick={() => setTeacherSlide((prev) => Math.min(teacherDilemmas.length - 1, prev + 1))}
                  disabled={teacherSlide === teacherDilemmas.length - 1}
                >
                  Next Dilemma ›
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. ADMIN CONTENT (70% Left: Institutional Intel Carousel)       */}
        {/* ============================================================== */}
        <section className="panel-section-slot admin-content" aria-label="Administrator and Institutional Oversight">
          <div className="content-header-bar">
            <div className="content-eyebrow" style={{ color: '#34D399' }}>
              Institution & Governance • Campus Intelligence
            </div>
            <h1 className="content-title">
              Campus-Wide Academic Telemetry & Governance
            </h1>
            <p className="content-subtitle">
              Equip academic leaders, principals, and deans with real-time analytics across classes, syllabus pacing SLA trackers, and enterprise compliance tools.
            </p>
          </div>

          {/* Zero-Scroll Horizontal Feature Carousel */}
          <div className="persona-carousel-wrapper">
            <div className="persona-carousel-viewport">
              <div
                className="persona-carousel-track"
                style={{ transform: `translateX(-${adminSlide * 100}%)` }}
              >
                {/* Slide 1 */}
                <div className="persona-carousel-slide">
                  <div className="slide-cards-duo">
                    <div className="persona-feature-card admin">
                      <div>
                        <div className="card-icon-pill admin">📊</div>
                        <h2 className="card-headline">Campus-Wide Academic Pulse</h2>
                        <p className="card-desc">
                          Live department-level learning velocity, subject comprehension indices, and comparative cohort benchmarks on one unified screen.
                        </p>
                      </div>
                      <span className="card-badge-tag">Macro telemetry</span>
                    </div>

                    <div className="persona-feature-card admin">
                      <div>
                        <div className="card-icon-pill admin">⏱️</div>
                        <h2 className="card-headline">Curriculum Pacing SLA Alerts</h2>
                        <p className="card-desc">
                          Automated syllabus trackers flag lagging sections weeks before terminal exams, allowing proactive instructional adjustments.
                        </p>
                      </div>
                      <span className="card-badge-tag">Zero syllabus slip</span>
                    </div>
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="persona-carousel-slide">
                  <div className="slide-cards-duo">
                    <div className="persona-feature-card admin">
                      <div>
                        <div className="card-icon-pill admin">🧘</div>
                        <h2 className="card-headline">Teacher Workload & Burnout Guard</h2>
                        <p className="card-desc">
                          Quantitative tracking of faculty grading hours saved, doubt volume deflected, and teacher well-being indicators.
                        </p>
                      </div>
                      <span className="card-badge-tag">Faculty retention</span>
                    </div>

                    <div className="persona-feature-card admin">
                      <div>
                        <div className="card-icon-pill admin">🚨</div>
                        <h2 className="card-headline">Student At-Risk Early Warning</h2>
                        <p className="card-desc">
                          Predictive AI models detect subtle drops in engagement and practice consistency, triggering timely counselor outreach.
                        </p>
                      </div>
                      <span className="card-badge-tag">Retention protection</span>
                    </div>
                  </div>
                </div>

                {/* Slide 3 */}
                <div className="persona-carousel-slide">
                  <div className="slide-cards-duo">
                    <div className="persona-feature-card admin">
                      <div>
                        <div className="card-icon-pill admin">🔄</div>
                        <h2 className="card-headline">Bidirectional LMS Sync</h2>
                        <p className="card-desc">
                          Native integrations with Canvas, Moodle, Google Classroom, and PowerSchool for automated gradebook and roster syncing.
                        </p>
                      </div>
                      <span className="card-badge-tag">Zero duplicate entry</span>
                    </div>

                    <div className="persona-feature-card admin">
                      <div>
                        <div className="card-icon-pill admin">🔒</div>
                        <h2 className="card-headline">Enterprise Security & FERPA</h2>
                        <p className="card-desc">
                          SOC2 Type II certified infrastructure, FERPA & GDPR compliance, role-based access control, and complete data privacy isolation.
                        </p>
                      </div>
                      <span className="card-badge-tag">Campus-grade trust</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="carousel-controls-bar">
              <div className="carousel-dots-group">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`carousel-dot ${adminSlide === idx ? 'active admin' : ''}`}
                    onClick={() => setAdminSlide(idx)}
                    aria-label={`Go to admin slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="carousel-nav-btn"
                  onClick={() => setAdminSlide((prev) => Math.max(0, prev - 1))}
                  disabled={adminSlide === 0}
                >
                  ‹ Prev
                </button>
                <button
                  type="button"
                  className="carousel-nav-btn"
                  onClick={() => setAdminSlide((prev) => Math.min(2, prev + 1))}
                  disabled={adminSlide === 2}
                >
                  Next ›
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. ADMIN SIDEBAR (30% Right: Normal 3D Admin Particle Bot)     */}
        {/* ============================================================== */}
        <aside className="panel-section-slot admin-side" aria-label="Administrator and Governance Persona">
          <div className="persona-sidebar-inner">
            {/* Role Switcher Pill Bar aligned directly with this partition */}
            {renderRoleTabs()}

            {/* Normal 3D Human Admin Particle Bot */}
            <div className="persona-bot-halo-wrapper">
              <div className="persona-ambient-halo admin" />
              <PersonaParticleBot
                src="/assets/human-admin.png"
                width={270}
                height={335}
              />
            </div>

            <div className="persona-action-group">
              <button
                type="button"
                className="persona-primary-btn admin-btn"
                onClick={() => setActiveRole('student')}
              >
                <span>Back to Student Experience</span>
                <span>➔</span>
              </button>

              <button
                type="button"
                className="persona-secondary-btn"
                onClick={() => setActiveRole('teacher')}
              >
                <span>← Back to Teacher</span>
              </button>

              <div className="persona-chips-row">
                <span>🏛️ Campus Analytics</span>
                <span>•</span>
                <span>🔒 FERPA Compliant</span>
              </div>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
}
