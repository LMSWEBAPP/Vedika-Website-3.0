'use client';

import React, { useState } from 'react';
import PersonaParticleBot from './PersonaParticleBot';
import '@/styles/persona-panels.css';

export type PersonaRole = 'student' | 'teacher' | 'admin';

export default function PersonaPanelsSection() {
  const [activeRole, setActiveRole] = useState<PersonaRole>('student');

  // Carousel slide indexes for each role
  const [studentSlide, setStudentSlide] = useState(0);
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

  return (
    <div className="persona-panels-wrapper" aria-label="Vedika 3-Panel Platform Ecosystem">
      {/* Top Header Row: Clean left space for global VEDIKA logo + Right-aligned role pills */}
      <header className="persona-top-navbar">
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
      </header>

      {/* Main Sliding Asymmetric Split Screen (Zero Vertical Scroll) */}
      <main className={`persona-split-container mode-${activeRole}`}>
        
        {/* ============================================================== */}
        {/* 1. STUDENT CONTENT PANEL (70% Left when active)                 */}
        {/* ============================================================== */}
        <section className="panel-section-slot student-content" aria-label="Student Learning Experience">
          <div className="content-header-bar">
            <div className="content-eyebrow" style={{ color: '#C084FC' }}>
              Student Experience • Infinite 1-on-1 AI Mentorship
            </div>
            <h1 className="content-title">
              Master Every Concept at Your Own Pace
            </h1>
            <p className="content-subtitle">
              Vedika guides you socratically through difficult problems, prepares you for oral viva exams, and brings science to life with interactive labs.
            </p>
          </div>

          {/* Zero-Scroll Horizontal Feature Carousel */}
          <div className="persona-carousel-wrapper">
            <div className="persona-carousel-viewport">
              <div
                className="persona-carousel-track"
                style={{ transform: `translateX(-${studentSlide * 100}%)` }}
              >
                {/* Slide 1 */}
                <div className="persona-carousel-slide">
                  <div className="slide-cards-duo">
                    <div className="persona-feature-card student">
                      <div>
                        <div className="card-icon-pill student">💡</div>
                        <h2 className="card-headline">24/7 Socratic Doubt Solver</h2>
                        <p className="card-desc">
                          Ask doubts in voice or text. Instead of giving flat answers, Vedika asks guided questions that build genuine intuition and critical thinking.
                        </p>
                      </div>
                      <span className="card-badge-tag">No judgment • Unlimited Qs</span>
                    </div>

                    <div className="persona-feature-card student">
                      <div>
                        <div className="card-icon-pill student">🎙️</div>
                        <h2 className="card-headline">Interactive Oral Viva Defense</h2>
                        <p className="card-desc">
                          Speak answers aloud into your microphone. Receive immediate diagnostic evaluation on technical clarity, terminology, and reasoning.
                        </p>
                      </div>
                      <span className="card-badge-tag">Speech-to-concept AI</span>
                    </div>
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="persona-carousel-slide">
                  <div className="slide-cards-duo">
                    <div className="persona-feature-card student">
                      <div>
                        <div className="card-icon-pill student">🧪</div>
                        <h2 className="card-headline">3D Celestial Virtual Labs</h2>
                        <p className="card-desc">
                          Manipulate 3D physics pendulums, chemical molecular bonds, biological cell structures, and run Python code in real-time.
                        </p>
                      </div>
                      <span className="card-badge-tag">Hands-on experimentation</span>
                    </div>

                    <div className="persona-feature-card student">
                      <div>
                        <div className="card-icon-pill student">📈</div>
                        <h2 className="card-headline">Adaptive Knowledge Graph</h2>
                        <p className="card-desc">
                          Continuous mastery mapping detects sub-concept weaknesses and automatically prescribes targeted practice sets.
                        </p>
                      </div>
                      <span className="card-badge-tag">Personalized pacing</span>
                    </div>
                  </div>
                </div>

                {/* Slide 3 */}
                <div className="persona-carousel-slide">
                  <div className="slide-cards-duo">
                    <div className="persona-feature-card student">
                      <div>
                        <div className="card-icon-pill student">📝</div>
                        <h2 className="card-headline">Smart Formula & Memory Cards</h2>
                        <p className="card-desc">
                          AI extracts core derivations, theorems, and definitions into interactive active-recall flashcards before examinations.
                        </p>
                      </div>
                      <span className="card-badge-tag">Spaced repetition</span>
                    </div>

                    <div className="persona-feature-card student">
                      <div>
                        <div className="card-icon-pill student">🎯</div>
                        <h2 className="card-headline">Exam Readiness Score</h2>
                        <p className="card-desc">
                          Predictive score indexing benchmarked against school boards and competitive exam standards.
                        </p>
                      </div>
                      <span className="card-badge-tag">Real-time confidence</span>
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
                    className={`carousel-dot ${studentSlide === idx ? 'active student' : ''}`}
                    onClick={() => setStudentSlide(idx)}
                    aria-label={`Go to student slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="carousel-nav-btn"
                  onClick={() => setStudentSlide((prev) => Math.max(0, prev - 1))}
                  disabled={studentSlide === 0}
                >
                  ‹ Prev
                </button>
                <button
                  type="button"
                  className="carousel-nav-btn"
                  onClick={() => setStudentSlide((prev) => Math.min(2, prev + 1))}
                  disabled={studentSlide === 2}
                >
                  Next ›
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 2. STUDENT SIDEBAR (30% Right: Normal 3D Kid Particle Bot)     */}
        {/* ============================================================== */}
        <aside className="panel-section-slot student-side" aria-label="Student AI Companion Persona">
          <div className="persona-sidebar-inner">
            <div className="persona-status-badge student">
              <span className="persona-pulse-dot student" />
              <span>Student Experience</span>
            </div>

            {/* Normal 3D Human Kid Particle Bot */}
            <div className="persona-bot-halo-wrapper">
              <div className="persona-ambient-halo student" />
              <PersonaParticleBot
                src="/assets/human-student.png"
                colorMode="vibrant"
                width={240}
                height={290}
                particleStep={2}
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
            <div className="persona-status-badge teacher">
              <span className="persona-pulse-dot teacher" />
              <span>Teacher Co-Pilot</span>
            </div>

            {/* Normal 3D Human Teacher Particle Bot */}
            <div className="persona-bot-halo-wrapper">
              <div className="persona-ambient-halo teacher" />
              <PersonaParticleBot
                src="/assets/human-teacher.png"
                colorMode="vibrant"
                width={240}
                height={290}
                particleStep={2}
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
            <div className="persona-status-badge admin">
              <span className="persona-pulse-dot admin" />
              <span>Institution & Admin</span>
            </div>

            {/* Normal 3D Human Admin Particle Bot */}
            <div className="persona-bot-halo-wrapper">
              <div className="persona-ambient-halo admin" />
              <PersonaParticleBot
                src="/assets/human-admin.png"
                colorMode="vibrant"
                width={240}
                height={290}
                particleStep={2}
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
