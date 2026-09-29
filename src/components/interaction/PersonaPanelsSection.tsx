'use client';

import React, { useState, useRef, useCallback } from 'react';
import PersonaParticleBot from './PersonaParticleBot';
import VedikaOrbitStage from './student/VedikaOrbitStage';
import '@/styles/persona-panels.css';

export type PersonaRole = 'student' | 'teacher' | 'admin';

export default function PersonaPanelsSection() {
  const [activeRole, setActiveRole] = useState<PersonaRole>('student');

  // Carousel slide index for admin role
  const [adminSlide, setAdminSlide] = useState(0);

  // Carousel active index for teacher dilemmas
  const [activeTeacherIndex, setActiveTeacherIndex] = useState(0);
  const [isCenterHovered, setIsCenterHovered] = useState(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCenterMouseEnter = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsCenterHovered(true);
  }, []);

  const handleCenterMouseLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => {
      setIsCenterHovered(false);
      leaveTimerRef.current = null;
    }, 80);
  }, []);



  const getCardCoverflowClass = (idx: number) => {
    const diff = (idx - activeTeacherIndex + teacherDilemmas.length) % teacherDilemmas.length;
    if (diff === 0) return 'active-center';
    if (diff === 1) return 'next-right';
    if (diff === teacherDilemmas.length - 1) return 'prev-left';
    return 'far-back';
  };

  const teacherDilemmas = [
    {
      icon: '🔁',
      dilemmaTitle: 'Repetitive Doubts Drainage',
      dilemmaDesc: 'Same questions again and again, consuming valuable teaching time.',
      rectTitle: '24/7 Tier-1 Socratic Assistant',
      bullets: [
        { icon: '💬', text: 'Instantly answers foundational doubts' },
        { icon: '📤', text: 'Escalates only complex, high-value questions' },
        { icon: '🎓', text: 'Students get immediate, accurate responses' },
      ],
    },
    {
      icon: '📃',
      dilemmaTitle: 'Crushing Weekend Grading',
      dilemmaDesc: 'Hours lost grading handwritten papers with no time left for lesson planning.',
      rectTitle: 'Instant Multi-Modal Rubric Grading',
      bullets: [
        { icon: '📸', text: 'Grades handwritten papers in seconds' },
        { icon: '📋', text: 'Customizable rubrics per assignment type' },
        { icon: '🔍', text: 'Step-by-step diagnostic feedback per student' },
      ],
    },
    {
      icon: '🔇',
      dilemmaTitle: 'Silent Student Struggles',
      dilemmaDesc: 'Quiet students fall behind undetected in large classrooms.',
      rectTitle: 'Real-Time Comprehension Radar',
      bullets: [
        { icon: '🗺️', text: 'Live comprehension heatmaps per concept' },
        { icon: '⚡', text: 'Surfaces misconceptions before next lecture' },
        { icon: '🚨', text: 'At-risk student flags for early intervention' },
      ],
    },
    {
      icon: '🧩',
      dilemmaTitle: 'Fragmented Lesson Preparation',
      dilemmaDesc: 'Hunting across portals for slides, quizzes, and materials wastes hours.',
      rectTitle: '1-Click Curriculum Generator',
      bullets: [
        { icon: '📑', text: 'Board-aligned slide decks generated instantly' },
        { icon: '🎚️', text: 'Multi-difficulty worksheets on demand' },
        { icon: '🧪', text: '3D lab simulations ready to deploy' },
      ],
    },
  ];

  const adminSlides = [
    {
      eyebrow: 'INSTITUTION & GOVERNANCE • ADMIN COMMAND CENTRE',
      titlePrefix: 'Manage Everything.',
      titleHighlight: 'Effortlessly.',
      subtitle: '',
      cards: [
        {
          id: 'card-course',
          num: '01',
          icon: '📖',
          title: 'Course Curriculum Studio',
          desc: 'Design structured syllabi, video lectures, reading modules, and resource libraries.',
          themeColor: '#F59E0B',
          themeBg: '#17130B',
          themeBorder: '#4D3A14',
          themeBadgeBg: '#2A200E',
          tags: ['Syllabus Builder', 'Multimedia Content', 'Module Sequencing'],
          connectorPosition: 'top-left' as const,
        },
        {
          id: 'card-batch',
          num: '02',
          icon: '👥',
          title: 'Batches & Cohort Manager',
          desc: 'Group students into neat sections, assign courses, manage faculty and control semester timetables.',
          themeColor: '#10B981',
          themeBg: '#0B1713',
          themeBorder: '#1A4535',
          themeBadgeBg: '#112E23',
          tags: ['Class Cohorts', 'Faculty Assignment', 'Roster Access'],
          connectorPosition: 'top-right' as const,
        },
        {
          id: 'card-assessment',
          num: '03',
          icon: '📄',
          title: 'Assessments & Evaluation',
          desc: 'Deploy problem sets, term exams and viva briefs with automated cutoff timers and AI grading.',
          themeColor: '#E11D48',
          themeBg: '#1C0D12',
          themeBorder: '#4E1724',
          themeBadgeBg: '#310E18',
          tags: ['Create Quiz', 'AI Grading', 'Admin Approvals'],
          connectorPosition: 'bottom-left' as const,
        },
        {
          id: 'card-analytics',
          num: '04',
          icon: '📊',
          title: 'Analytics & Certifications',
          desc: 'Track progress, identify at-risk students and issue completion certificates with QR verification.',
          themeColor: '#0EA5E9',
          themeBg: '#0A1522',
          themeBorder: '#16395A',
          themeBadgeBg: '#0F263D',
          tags: ['Progress Reports', 'At-Risk Alerts', 'Issue Certificates'],
          connectorPosition: 'bottom-right' as const,
        },
      ],
    },
    {
      eyebrow: 'AI CO-PILOT GOVERNANCE • EVALUATION & COMPLIANCE',
      titlePrefix: 'Automate Operations.',
      titleHighlight: 'Intelligently.',
      subtitle: '',
      cards: [
        {
          id: 'card-rubric',
          num: '05',
          icon: '📐',
          title: 'Rubric & Scoring Engine',
          desc: 'Define precision marking schemes, multi-criteria weightings, and model answer keys.',
          themeColor: '#E11D48',
          themeBg: '#1C0D12',
          themeBorder: '#4E1724',
          themeBadgeBg: '#310E18',
          tags: ['Rubric Weights', 'Scoring Schemes', 'Answer Benchmarks'],
          connectorPosition: 'top-left' as const,
        },
        {
          id: 'card-ai-eval',
          num: '06',
          icon: '🤖',
          title: 'Vedika AI Auto-Grading',
          desc: 'Evaluates submitted student answers against your defined rubrics in seconds with step rationale.',
          themeColor: '#10B981',
          themeBg: '#0B1713',
          themeBorder: '#1A4535',
          themeBadgeBg: '#112E23',
          tags: ['Criteria Alignment', 'Instant Pre-Grade', 'Step Diagnostics'],
          connectorPosition: 'top-right' as const,
        },
        {
          id: 'card-audit',
          num: '07',
          icon: '🛡️',
          title: 'Audit & 1-Click Approvals',
          desc: 'Inspect AI evaluations, adjust scores when desired, and approve final grades with full audit logs.',
          themeColor: '#F59E0B',
          themeBg: '#17130B',
          themeBorder: '#4D3A14',
          themeBadgeBg: '#2A200E',
          tags: ['Audit Inspection', 'Score Adjustments', '1-Click Approve'],
          connectorPosition: 'bottom-left' as const,
        },
        {
          id: 'card-cert',
          num: '08',
          icon: '🏆',
          title: 'Verifiable Certifications',
          desc: 'Issue authenticated graduation and course certificates with encrypted QR verification.',
          themeColor: '#0EA5E9',
          themeBg: '#0A1522',
          themeBorder: '#16395A',
          themeBadgeBg: '#0F263D',
          tags: ['Issue Certificates', 'Digital Seal', 'Instant QR Check'],
          connectorPosition: 'bottom-right' as const,
        },
      ],
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

  // Helper to render relevant, crisp SVG vector icons for each Admin card (no box around icons)
  const getAdminCardIcon = (id: string) => {
    switch (id) {
      case 'card-course':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10" />
            <path d="M6 10h10" />
            <path d="M6 14h6" />
          </svg>
        );
      case 'card-batch':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'card-assessment':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        );
      case 'card-analytics':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
            <line x1="2" y1="20" x2="22" y2="20" />
          </svg>
        );
      case 'card-rubric':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        );
      case 'card-ai-eval':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          </svg>
        );
      case 'card-audit':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        );
      case 'card-cert':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="persona-panels-wrapper" aria-label="Vedika 3-Panel Platform Ecosystem">
      {/* Main Sliding Asymmetric Split Screen (Zero Vertical Scroll) */}
      <main className={`persona-split-container mode-${activeRole}`}>
        
        {/* ============================================================== */}
        {/* 1. STUDENT CONTENT PANEL (70% Left when active)                 */}
        {/* ============================================================== */}
        <section className="panel-section-slot student-content" aria-label="Student Learning Experience">


          {/* Circular Orbit AI Learning Ecosystem */}
          <VedikaOrbitStage />
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
        {/* 4. TEACHER CONTENT (70% Right: 4 Dilemma vs Resolution Cards)  */}
        {/* ============================================================== */}
        <section className="panel-section-slot teacher-content" aria-label="Teacher Dilemmas and Vedika Rectifications">
          <div className="content-header-bar">
            <div className="content-eyebrow" style={{ color: '#FBBF24' }}>
              Teacher Empowerment • AI Co-Pilot
            </div>
            <h1 className="content-title">
              Eliminate Burnout. Reclaim the Joy of Teaching.
            </h1>
          </div>

          {/* 3D CoverFlow Stage with Left/Right Arrows on Either Side of Cards */}
          <div className="teacher-dilemmas-stage">
            {/* Left Carousel Arrow */}
            <button
              type="button"
              className="teacher-stage-arrow prev"
              onClick={() =>
                setActiveTeacherIndex(
                  (prev) => (prev - 1 + teacherDilemmas.length) % teacherDilemmas.length
                )
              }
              aria-label="Previous Dilemma"
            >
              ‹
            </button>

            {/* Centered CoverFlow Deck */}
            <div className="teacher-coverflow-deck">
              {teacherDilemmas.map((item, idx) => {
                const coverflowClass = getCardCoverflowClass(idx);
                const isCenter = coverflowClass === 'active-center';

                return (
                  <div
                    key={idx}
                    className={`teacher-slide-card ${coverflowClass}${isCenter && isCenterHovered ? ' is-hovered' : ''}`}
                    onClick={() => {
                      if (!isCenter) setActiveTeacherIndex(idx);
                    }}
                    onMouseEnter={() => {
                      if (!isCenter) return;
                      handleCenterMouseEnter();
                    }}
                    onMouseLeave={() => {
                      if (!isCenter) return;
                      handleCenterMouseLeave();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={item.dilemmaTitle}
                  >
                    <div className={`teacher-unfold-wrapper${isCenter && isCenterHovered ? ' is-open' : ''}`}>
                      {/* SLIDE 1: Traditional Friction */}
                      <div className="slide slide1">
                        <div className="content">
                          <div className="sl1-icon-col">
                            <div className="icon">
                              <span className="friction-icon">{item.icon}</span>
                            </div>
                          </div>
                          <div className="sl1-divider" />
                          <div className="sl1-body">
                            <span className="friction-tag">Traditional Friction</span>
                            <h3 className="friction-title">{item.dilemmaTitle}</h3>
                            <p className="friction-desc">{item.dilemmaDesc}</p>
                          </div>
                        </div>
                      </div>

                      {/* SLIDE 2: Vedika AI Resolution */}
                      <div className="slide slide2">
                        <div className="content">
                          <div className="sl2-bot-col">
                            <img
                              src="/assets/vedika-bot.png"
                              alt="Vedika AI"
                              className="vedika-resolution-bot"
                            />
                          </div>
                          <div className="sl2-body">
                            <div className="resolution-badge-pill">
                              <span>Vedika AI Resolution</span>
                            </div>
                            <h3 className="resolution-title">{item.rectTitle}</h3>
                            <ul className="resolution-bullet-list">
                              {item.bullets.map((b, bi) => (
                                <li key={bi} className="resolution-bullet-item">
                                  <span className="bullet-icon-circle">{b.icon}</span>
                                  <span>{b.text}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Carousel Arrow */}
            <button
              type="button"
              className="teacher-stage-arrow next"
              onClick={() =>
                setActiveTeacherIndex((prev) => (prev + 1) % teacherDilemmas.length)
              }
              aria-label="Next Dilemma"
            >
              ›
            </button>
          </div>

          {/* Indicator Dots Below Cards */}
          <div className="teacher-coverflow-dots">
            {teacherDilemmas.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`teacher-nav-dot ${i === activeTeacherIndex ? 'active' : ''}`}
                onClick={() => setActiveTeacherIndex(i)}
                aria-label={`Select dilemma ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. ADMIN SIDEBAR (Left Column: 3D Admin Character + Navigation) */}
        {/* ============================================================== */}
        <aside className="panel-section-slot admin-side" aria-label="Administrator and Governance Persona">
          <div className="persona-sidebar-inner">
            {/* 3D Human Admin Particle Bot in Perfect Circular Frame */}
            <div className="admin-character-circle-frame">
              <PersonaParticleBot
                src="/assets/human-admin.png"
                width={250}
                height={250}
              />
            </div>

            <div className="persona-action-group">
              <button
                type="button"
                className="persona-primary-btn admin-btn"
                onClick={() => setActiveRole('student')}
              >
                <span>Explore Student Experience</span>
                <span>➔</span>
              </button>

              <button
                type="button"
                className="persona-secondary-btn"
                onClick={() => setActiveRole('teacher')}
              >
                <span>← Back to Teacher</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ============================================================== */}
        {/* 6. ADMIN CONTENT (Right: Constellation Around Central Vedika)  */}
        {/* ============================================================== */}
        <section className="panel-section-slot admin-content" aria-label="Administrator Command Centre">
          {(() => {
            const currentAdminSlide = adminSlides[adminSlide] || adminSlides[0];

            return (
              <>
                {/* Header Row: Left Titles & Right Role Switcher Tabs */}
                <div className="admin-content-header-row">
                  <div className="admin-header-titles">
                    <div className="content-eyebrow" style={{ color: '#D4AF37' }}>
                      {currentAdminSlide.eyebrow}
                    </div>
                    <h1 className="admin-headline-title">
                      {currentAdminSlide.titlePrefix}{' '}
                      <span className="admin-highlight-word">{currentAdminSlide.titleHighlight}</span>
                    </h1>
                  </div>

                  <div className="admin-header-tabs-wrap">
                    {renderRoleTabs()}
                  </div>
                </div>

                {/* Central Constellation Stage with Vedika in the middle */}
                <div className="admin-constellation-stage">
                  {/* FIXED CENTRAL VEDIKA ANCHOR (Locked in position, golden gradient background rings & orbiting number badges) */}
                  <div className="admin-vedika-center-anchor">
                    {/* Concentric Golden Gradient Background Rings matching reference image */}
                    <svg className="admin-vedika-bg-rings-svg" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="vedikaMainRingGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.95" />
                          <stop offset="26%" stopColor="#F59E0B" stopOpacity="0.85" />
                          <stop offset="62%" stopColor="#D97706" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#78350F" stopOpacity="0.1" />
                        </linearGradient>

                        <linearGradient id="vedikaInnerRingGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.55" />
                          <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.32" />
                          <stop offset="100%" stopColor="#B45309" stopOpacity="0.08" />
                        </linearGradient>

                        <linearGradient id="vedikaOuterRingGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.38" />
                          <stop offset="50%" stopColor="#D97706" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#78350F" stopOpacity="0.04" />
                        </linearGradient>

                        <filter id="vedikaRingGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="2.2" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      {/* Outer subtle solid ring */}
                      <circle cx="160" cy="160" r="128" stroke="url(#vedikaOuterRingGrad)" strokeWidth="1" />

                      {/* Main Golden Gradient Ring (aligned through orbit number badges) */}
                      <circle cx="160" cy="160" r="98" stroke="url(#vedikaMainRingGrad)" strokeWidth="1.6" filter="url(#vedikaRingGlow)" />

                      {/* Inner subtle solid ring */}
                      <circle cx="160" cy="160" r="68" stroke="url(#vedikaInnerRingGrad)" strokeWidth="1" />

                      {/* Golden orbit dots on outer ring */}
                      <circle cx="160" cy="32" r="1.8" fill="#FDE68A" opacity="0.75" />
                      <circle cx="288" cy="160" r="1.8" fill="#F59E0B" opacity="0.65" />
                      <circle cx="32" cy="160" r="1.8" fill="#F59E0B" opacity="0.65" />
                      <circle cx="160" cy="288" r="1.8" fill="#B45309" opacity="0.4" />
                    </svg>

                    {/* Orbiting Number Badges around the Golden Ring, positioned for each respective card box */}
                    <div className="admin-orbit-badges-wrap">
                      {currentAdminSlide.cards.map((card) => (
                        <div
                          key={`orbit-${card.id}`}
                          className={`admin-orbit-badge badge-pos-${card.connectorPosition}`}
                          style={{
                            '--badge-color': card.themeColor,
                            '--badge-border': card.themeBorder,
                            '--badge-glow': `${card.themeColor}50`,
                          } as React.CSSProperties}
                        >
                          <span>{card.num}</span>
                        </div>
                      ))}
                    </div>

                    <div className="admin-vedika-pod">
                      <img
                        src="/assets/vedika-bot.png"
                        alt="Vedika"
                        className="admin-vedika-bot-img"
                      />
                    </div>
                  </div>

                  {/* 4 CARDS GRID (Identical equal box sizes, generous spacing, no spill) */}
                  <div key={adminSlide} className="admin-constellation-cards-grid">
                    {currentAdminSlide.cards.map((card, cIdx) => (
                      <div
                        key={card.id}
                        className={`admin-constellation-card card-pos-${card.connectorPosition}`}
                        style={{
                          '--card-theme': card.themeColor,
                          '--card-bg': card.themeBg,
                          '--card-border': card.themeBorder,
                          '--card-badge-bg': card.themeBadgeBg,
                          animationDelay: `${cIdx * 45}ms`,
                        } as React.CSSProperties}
                      >
                        <div className="admin-card-inner">
                          <div className="admin-card-top-row">
                            <div className="admin-card-icon" style={{ color: card.themeColor }}>
                              {getAdminCardIcon(card.id)}
                            </div>
                          </div>
                          <h3 className="admin-card-title">{card.title}</h3>
                          <p className="admin-card-desc">{card.desc}</p>
                          <div className="admin-card-tags-row">
                            {card.tags.map((tag, ti) => (
                              <span key={ti} className="admin-card-tag-pill">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Tagline & Carousel Navigation Controls */}
                <div className="admin-footer-bar">
                  <span className="admin-footer-tagline">
                    Institution Control • Smarter Operations • Better Outcomes
                  </span>

                  <div className="admin-footer-controls">
                    <div className="admin-dots-group">
                      {adminSlides.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`admin-nav-dot ${adminSlide === idx ? 'active' : ''}`}
                          onClick={() => setAdminSlide(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="admin-carousel-btn-group">
                      <button
                        type="button"
                        className="admin-carousel-btn prev"
                        onClick={() => setAdminSlide((prev) => (prev - 1 + adminSlides.length) % adminSlides.length)}
                        aria-label="Previous Slide"
                      >
                        ‹ Prev
                      </button>

                      <button
                        type="button"
                        className="admin-carousel-btn next"
                        onClick={() => setAdminSlide((prev) => (prev + 1) % adminSlides.length)}
                        aria-label="Next Slide"
                      >
                        Next ›
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </section>

      </main>
    </div>
  );
}
