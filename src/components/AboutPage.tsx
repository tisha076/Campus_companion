import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container max-w-7xl py-4 py-lg-5">
      {/* Banner */}
      <div className="glass-card p-4 p-md-5 rounded-4 border mb-4 text-center">
        <div className="d-inline-flex align-items-center justify-content-center rounded-4 bg-gradient-accent text-white p-3 mb-3 shadow-sm" style={{ width: '64px', height: '64px' }}>
          <i className="bi bi-mortarboard-fill fs-2"></i>
        </div>
        <h1 className="display-6 fw-extrabold text-body tracking-tight mb-2">About Campus Companion</h1>
        <p className="text-secondary max-w-2xl mx-auto small">
          Campus Companion is a comprehensive, modern student portal designed to simplify university life.
          Built as a frontend Web Programming project using HTML, CSS, Bootstrap 5, TypeScript, and React.
        </p>
      </div>

      {/* Project Objectives Grid */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="glass-card p-4 rounded-4 border h-100">
            <div className="p-3 rounded-3 bg-primary-subtle text-primary mb-3 d-inline-block">
              <i className="bi bi-speedometer2 fs-4"></i>
            </div>
            <h2 className="h5 fw-bold text-body mb-2">Student Dashboard</h2>
            <p className="text-secondary small mb-0">
              Provides an intuitive overview of enrolled courses, daily class routines, pending tasks, and academic standing.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="glass-card p-4 rounded-4 border h-100">
            <div className="p-3 rounded-3 bg-success-subtle text-success mb-3 d-inline-block">
              <i className="bi bi-calculator fs-4"></i>
            </div>
            <h2 className="h5 fw-bold text-body mb-2">Academic Calculators</h2>
            <p className="text-secondary small mb-0">
              Includes CGPA Calculator and Attendance Calculator to help students maintain eligibility and track grades.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="glass-card p-4 rounded-4 border h-100">
            <div className="p-3 rounded-3 bg-warning-subtle text-warning mb-3 d-inline-block">
              <i className="bi bi-check2-square fs-4"></i>
            </div>
            <h2 className="h5 fw-bold text-body mb-2">Task & Notes Management</h2>
            <p className="text-secondary small mb-0">
              Allows students to track assignment deadlines, filter by course priority, and save study notes cleanly.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack for Viva Presentation */}
      <div className="glass-card p-4 rounded-4 border">
        <h2 className="h5 fw-extrabold text-body mb-3">Project Technical Stack</h2>
        <div className="row g-3">
          <div className="col-6 col-md-3">
            <div className="p-3 rounded-3 bg-body-tertiary border text-center">
              <i className="bi bi-filetype-html display-6 text-danger mb-2 d-block"></i>
              <strong className="d-block small text-body">HTML5 & DOM</strong>
              <span className="text-muted xsmall">Semantic structure</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 rounded-3 bg-body-tertiary border text-center">
              <i className="bi bi-bootstrap-fill display-6 text-primary mb-2 d-block"></i>
              <strong className="d-block small text-body">Bootstrap 5 & CSS</strong>
              <span className="text-muted xsmall">Responsive grid & cards</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 rounded-3 bg-body-tertiary border text-center">
              <i className="bi bi-filetype-js display-6 text-warning mb-2 d-block"></i>
              <strong className="d-block small text-body">TypeScript</strong>
              <span className="text-muted xsmall">Strongly typed logic</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 rounded-3 bg-body-tertiary border text-center">
              <i className="bi bi-code-slash display-6 text-info mb-2 d-block"></i>
              <strong className="d-block small text-body">React 18</strong>
              <span className="text-muted xsmall">Component architecture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
