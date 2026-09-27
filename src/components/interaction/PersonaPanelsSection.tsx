'use client';

import React, { useState } from 'react';
import PersonaParticleBot from './PersonaParticleBot';
import '@/styles/persona-panels.css';

export type PersonaRole = 'student' | 'teacher' | 'admin';

export default function PersonaPanelsSection() {
  const [activeRole, setActiveRole] = useState<PersonaRole>('student');

  return (
    <div className="persona-panels-wrapper" aria-label="Vedika 3-Panel Platform Ecosystem">
      {/* Top Role Selector Header */}
      <header className="persona-top-navbar">
        <div className="persona-logo-group">
          <span className="persona-logo-badge">VEDIKA AI</span>
          <span className="persona-logo-sub">Unified Educational Ecosystem</span>
        </div>

        {/* 3-Role Interactive Pill Tabs */}
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

      {/* Main Sliding Asymmetric Split Screen */}
      <main className={`persona-split-container mode-${activeRole}`}>
        
        {/* ============================================================== */}
        {/* 1. STUDENT CONTENT PANEL (70% Flex on Left when active)         */}
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
              Vedika acts as a tireless, 24/7 personal tutor that guides you socratically through difficult problems, prepares you for oral viva exams, and brings science to life with interactive labs.
            </p>
          </div>

          <div className="persona-feature-grid">
            <div className="persona-feature-card student">
              <div className="card-icon-pill student">💡</div>
              <h2 className="card-headline">24/7 Socratic Doubt Solver</h2>
              <p className="card-desc">
                Ask doubts in voice or text. Instead of giving flat answers, Vedika asks guided questions that build genuine intuition.
              </p>
              <span className="card-badge-tag">No judgment • Unlimited Qs</span>
            </div>

            <div className="persona-feature-card student">
              <div className="card-icon-pill student">🎙️</div>
              <h2 className="card-headline">Interactive Oral Viva Defense</h2>
              <p className="card-desc">
                Speak answers aloud into your microphone. Receive immediate diagnostic evaluation on technical clarity, terminology, and reasoning.
              </p>
              <span className="card-badge-tag">Speech-to-concept AI</span>
            </div>

            <div className="persona-feature-card student">
              <div className="card-icon-pill student">🧪</div>
              <h2 className="card-headline">3D Celestial Virtual Labs</h2>
              <p className="card-desc">
                Manipulate 3D physics pendulums, chemical molecular bonds, biological cell structures, and run Python code in real-time.
              </p>
              <span className="card-badge-tag">Hands-on experimentation</span>
            </div>

            <div className="persona-feature-card student">
              <div className="card-icon-pill student">📈</div>
              <h2 className="card-headline">Adaptive Knowledge Graph</h2>
              <p className="card-desc">
                Continuous mastery mapping detects sub-concept weaknesses and automatically prescribes targeted practice sets.
              </p>
              <span className="card-badge-tag">Personalized pacing</span>
            </div>

            <div className="persona-feature-card student">
              <div className="card-icon-pill student">📝</div>
              <h2 className="card-headline">Smart Formula & Memory Cards</h2>
              <p className="card-desc">
                AI extracts core derivations, theorems, and definitions into interactive active-recall flashcards before tests.
              </p>
              <span className="card-badge-tag">Spaced repetition</span>
            </div>

            <div className="persona-feature-card student">
              <div className="card-icon-pill student">🎯</div>
              <h2 className="card-headline">Exam Readiness Score</h2>
              <p className="card-desc">
                Predictive score indexing benchmarked against school boards and competitive exam standards.
              </p>
              <span className="card-badge-tag">Real-time confidence</span>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 2. STUDENT SIDEBAR (30% Flex on Right: School Kid Particle Bot) */}
        {/* ============================================================== */}
        <aside className="panel-section-slot student-side" aria-label="Student AI Companion Persona">
          <div className="persona-sidebar-inner">
            <div className="persona-status-badge student">
              <span className="persona-pulse-dot student" />
              <span>Student Experience</span>
            </div>

            {/* Kid in school uniform interactive particle bot */}
            <div className="persona-bot-halo-wrapper">
              <div className="persona-ambient-halo student" />
              <PersonaParticleBot
                src="/assets/vedika-bot-school.png"
                colorMode="cosmic-purple"
                width={250}
                height={310}
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
        {/* 3. TEACHER SIDEBAR (30% Flex on Left: Teacher Particle Bot)     */}
        {/* ============================================================== */}
        <aside className="panel-section-slot teacher-side" aria-label="Teacher Co-Pilot Persona">
          <div className="persona-sidebar-inner">
            <div className="persona-status-badge teacher">
              <span className="persona-pulse-dot teacher" />
              <span>Teacher Co-Pilot</span>
            </div>

            {/* Teacher in cardigan & tablet interactive particle bot */}
            <div className="persona-bot-halo-wrapper">
              <div className="persona-ambient-halo teacher" />
              <PersonaParticleBot
                src="/assets/vedika-bot-teacher.png"
                colorMode="golden"
                width={250}
                height={310}
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
        {/* 4. TEACHER CONTENT (70% Flex on Right: Dilemmas vs Solutions)   */}
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

          <div className="teacher-comparison-flow">
            {/* Pair 1 */}
            <div className="comparison-row-card">
              <div className="dilemma-block">
                <span className="dilemma-label">⚠️ Traditional Dilemma</span>
                <h3 className="dilemma-title">Repetitive Doubts Drainage</h3>
                <p className="dilemma-desc">
                  Answering the same fundamental question 40 times a day drains mental energy and leaves zero time for deep discussions.
                </p>
              </div>

              <div className="comparison-arrow">➔</div>

              <div className="rectification-block">
                <span className="rectification-label">✨ Vedika AI Rectification</span>
                <h3 className="rectification-title">24/7 Tier-1 Doubt Assistant</h3>
                <p className="rectification-desc">
                  Vedika instantly resolves foundational doubts around the clock, escalating only novel, high-leverage inquiries to the teacher.
                </p>
              </div>
            </div>

            {/* Pair 2 */}
            <div className="comparison-row-card">
              <div className="dilemma-block">
                <span className="dilemma-label">⚠️ Traditional Dilemma</span>
                <h3 className="dilemma-title">Crushing Weekend Grading Load</h3>
                <p className="dilemma-desc">
                  Spending 12–15 hours every weekend grading handwritten derivations, lab reports, and assignments.
                </p>
              </div>

              <div className="comparison-arrow">➔</div>

              <div className="rectification-block">
                <span className="rectification-label">✨ Vedika AI Rectification</span>
                <h3 className="rectification-title">Instant Multi-Modal Rubric Grading</h3>
                <p className="rectification-desc">
                  Snap or upload handwritten student papers. Vedika grades against customized rubrics in seconds with line-by-line feedback.
                </p>
              </div>
            </div>

            {/* Pair 3 */}
            <div className="comparison-row-card">
              <div className="dilemma-block">
                <span className="dilemma-label">⚠️ Traditional Dilemma</span>
                <h3 className="dilemma-title">Silent Student Struggles</h3>
                <p className="dilemma-desc">
                  Shy students fall behind silently in 50-student classrooms without the teacher realizing until mid-term exam failure.
                </p>
              </div>

              <div className="comparison-arrow">➔</div>

              <div className="rectification-block">
                <span className="rectification-label">✨ Vedika AI Rectification</span>
                <h3 className="rectification-title">Real-Time Class Comprehension Radar</h3>
                <p className="rectification-desc">
                  Live comprehension telemetry and heatmaps surface class-wide misconceptions before you step into the next lecture.
                </p>
              </div>
            </div>

            {/* Pair 4 */}
            <div className="comparison-row-card">
              <div className="dilemma-block">
                <span className="dilemma-label">⚠️ Traditional Dilemma</span>
                <h3 className="dilemma-title">Scattered Lesson Prep & Worksheets</h3>
                <p className="dilemma-desc">
                  Hunting for diagrams, slides, and differentiated quiz questions across disparate portals and outdated textbooks.
                </p>
              </div>

              <div className="comparison-arrow">➔</div>

              <div className="rectification-block">
                <span className="rectification-label">✨ Vedika AI Rectification</span>
                <h3 className="rectification-title">1-Click Curriculum Lesson Generator</h3>
                <p className="rectification-desc">
                  Generate rich interactive presentation slides, 3D lab simulations, and multi-tier difficulty worksheets aligned to your board.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. ADMIN CONTENT (70% Flex on Left: Institutional Intel)        */}
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

          <div className="persona-feature-grid">
            <div className="persona-feature-card admin">
              <div className="card-icon-pill admin">📊</div>
              <h2 className="card-headline">Campus-Wide Academic Pulse</h2>
              <p className="card-desc">
                Live department-level learning velocity, subject comprehension indices, and comparative cohort benchmarks on one unified screen.
              </p>
              <span className="card-badge-tag">Macro telemetry</span>
            </div>

            <div className="persona-feature-card admin">
              <div className="card-icon-pill admin">⏱️</div>
              <h2 className="card-headline">Curriculum Pacing SLA Alerts</h2>
              <p className="card-desc">
                Automated syllabus trackers flag lagging sections weeks before terminal exams, allowing proactive instructional adjustments.
              </p>
              <span className="card-badge-tag">Zero syllabus slip</span>
            </div>

            <div className="persona-feature-card admin">
              <div className="card-icon-pill admin">🧘</div>
              <h2 className="card-headline">Teacher Workload & Burnout Guard</h2>
              <p className="card-desc">
                Quantitative tracking of faculty grading hours saved, doubt volume deflected, and teacher well-being indicators.
              </p>
              <span className="card-badge-tag">Faculty retention</span>
            </div>

            <div className="persona-feature-card admin">
              <div className="card-icon-pill admin">🚨</div>
              <h2 className="card-headline">Student At-Risk Early Warning</h2>
              <p className="card-desc">
                Predictive AI models detect subtle drops in engagement and practice consistency, triggering timely counselor outreach.
              </p>
              <span className="card-badge-tag">Retention protection</span>
            </div>

            <div className="persona-feature-card admin">
              <div className="card-icon-pill admin">🔄</div>
              <h2 className="card-headline">Bidirectional LMS Sync</h2>
              <p className="card-desc">
                Native integrations with Canvas, Moodle, Google Classroom, and PowerSchool for automated gradebook and roster syncing.
              </p>
              <span className="card-badge-tag">Zero duplicate entry</span>
            </div>

            <div className="persona-feature-card admin">
              <div className="card-icon-pill admin">🔒</div>
              <h2 className="card-headline">Enterprise Security & FERPA</h2>
              <p className="card-desc">
                SOC2 Type II certified infrastructure, FERPA & GDPR compliance, role-based access control, and complete data privacy isolation.
              </p>
              <span className="card-badge-tag">Campus-grade trust</span>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. ADMIN SIDEBAR (30% Flex on Right: Admin Particle Bot)        */}
        {/* ============================================================== */}
        <aside className="panel-section-slot admin-side" aria-label="Administrator and Governance Persona">
          <div className="persona-sidebar-inner">
            <div className="persona-status-badge admin">
              <span className="persona-pulse-dot admin" />
              <span>Institution & Admin</span>
            </div>

            {/* Admin in suit & data tablet interactive particle bot */}
            <div className="persona-bot-halo-wrapper">
              <div className="persona-ambient-halo admin" />
              <PersonaParticleBot
                src="/assets/vedika-bot-admin.png"
                colorMode="emerald-green"
                width={250}
                height={310}
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
