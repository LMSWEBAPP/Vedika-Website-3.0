'use client';

import React, { useState } from 'react';
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

  const getCardCoverflowClass = (idx: number) => {
    const diff = (idx - activeTeacherIndex + teacherDilemmas.length) % teacherDilemmas.length;
    if (diff === 0) return 'active-center';
    if (diff === 1) return 'next-right';
    if (diff === teacherDilemmas.length - 1) return 'prev-left';
    return 'far-back';
  };

  const teacherDilemmas = [
    {
      icon: '💬',
      dilemmaTitle: 'Repetitive Doubts Drainage',
      dilemmaDesc: 'Answering the same fundamental question 40 times a day drains mental energy and leaves zero time for deep classroom discussions.',
      rectTitle: '24/7 Tier-1 Socratic Assistant',
      rectDesc: 'Vedika instantly resolves foundational doubts around the clock, escalating only novel, high-leverage inquiries to the teacher.',
      impact: '⏱️ 15+ Hours Saved Weekly',
    },
    {
      icon: '📝',
      dilemmaTitle: 'Crushing Weekend Grading Load',
      dilemmaDesc: 'Spending 12–15 hours every weekend grading handwritten derivations, lab reports, and subjective assignments.',
      rectTitle: 'Instant Multi-Modal Rubric Grading',
      rectDesc: 'Snap or upload handwritten student papers. Vedika grades against customized rubrics in seconds with step-by-step diagnostic feedback.',
      impact: '⚡ 5-Second Multi-Modal Grading',
    },
    {
      icon: '📊',
      dilemmaTitle: 'Silent Student Struggles',
      dilemmaDesc: 'Quiet students fall behind silently in 50-student classrooms without the teacher realizing until mid-term exam failure.',
      rectTitle: 'Real-Time Class Comprehension Radar',
      rectDesc: 'Live comprehension telemetry and heatmaps surface class-wide misconceptions before you step into the next lecture.',
      impact: '🎯 100% Comprehension Visibility',
    },
    {
      icon: '⚡',
      dilemmaTitle: 'Fragmented Lesson Prep',
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
                    className={`teacher-slide-card ${coverflowClass}`}
                    onClick={() => {
                      if (!isCenter) setActiveTeacherIndex(idx);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={item.dilemmaTitle}
                  >
                    {/* SLIDE 1: Traditional Friction (Top Outer Card) */}
                    <div className="slide slide1">
                      <div className="content">
                        <div className="icon">
                          <span className="friction-icon">{item.icon}</span>
                        </div>
                        <span className="friction-tag">Traditional Friction</span>
                        <h3 className="friction-title">{item.dilemmaTitle}</h3>
                      </div>
                    </div>

                    {/* SLIDE 2: Vedika AI Resolution (Inner Card Smoothly Unfolding Downward) */}
                    <div className="slide slide2">
                      <div className="content">
                        <div className="bot-and-badge-row">
                          <img
                            src="/assets/vedika-bot.png"
                            alt="Happy Vedika AI Bot"
                            className="tiny-vedika-avatar"
                          />
                          <div className="resolution-badge-pill">
                            <span>✨ Vedika AI Resolution</span>
                          </div>
                        </div>

                        <h3 className="resolution-title">{item.rectTitle}</h3>
                        <p className="resolution-desc">{item.rectDesc}</p>
                        <div className="resolution-impact-badge">{item.impact}</div>
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
