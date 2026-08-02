import React from 'react';
import { PageView } from '../types';
import { createRipple } from '../utils/ripple';

interface HeroSectionProps {
  onNavigate: (view: PageView) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="position-relative py-5 overflow-hidden">
      {/* Background Soft Glow Circles */}
      <div 
        className="position-absolute top-0 start-50 translate-middle-x rounded-circle pointer-events-none opacity-50 blur-3xl"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(124,58,237,0.1) 60%, transparent 100%)',
          zIndex: -1,
          filter: 'blur(80px)'
        }}
      ></div>

      <div className="container max-w-7xl py-lg-4">
        <div className="row align-items-center gy-5">
          {/* Hero Left Content */}
          <div className="col-lg-6 text-center text-lg-start">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill glass-pill border mb-3 shadow-sm">
              <span className="badge rounded-pill bg-gradient-accent px-2 py-1">2026 Academic Edition</span>
              <span className="small text-body fw-medium d-flex align-items-center gap-1">
                <i className="bi bi-stars text-warning"></i> Next-Gen Student Portal
              </span>
            </div>

            <h1 className="display-4 fw-extrabold tracking-tight mb-3 text-body lh-sm">
              Empowering Student Success with <span className="text-gradient">Seamless Simplicity.</span>
            </h1>

            <p className="lead text-secondary mb-4 fs-5 fw-normal pe-lg-4">
              An all-in-one Apple-inspired university portal. Streamline your class schedules, track assignment deadlines, monitor GPA metrics, and stay connected with campus life.
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-lg-start gap-3 mb-4">
              <button
                onClick={(e) => { createRipple(e); onNavigate('dashboard'); }}
                className="btn btn-primary btn-lg rounded-pill fw-semibold px-4 py-3 bg-gradient-accent border-0 shadow-lg btn-ripple d-flex align-items-center gap-2 w-100 w-sm-auto justify-content-center"
              >
                <span>Launch Portal Dashboard</span>
                <i className="bi bi-arrow-right fs-5"></i>
              </button>

              <button
                onClick={(e) => { createRipple(e); onNavigate('register'); }}
                className="btn btn-outline-secondary btn-lg rounded-pill fw-semibold px-4 py-3 glass-card border-subtle btn-ripple d-flex align-items-center gap-2 text-body w-100 w-sm-auto justify-content-center"
              >
                <i className="bi bi-person-plus text-primary"></i>
                <span>Create Free Student Account</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-4 pt-2 text-muted xsmall">
              <div className="d-flex align-items-center gap-1.5">
                <i className="bi bi-check-circle-fill text-success"></i>
                <span>No Database Required</span>
              </div>
              <div className="d-flex align-items-center gap-1.5">
                <i className="bi bi-check-circle-fill text-success"></i>
                <span>Responsive Apple Design</span>
              </div>
              <div className="d-flex align-items-center gap-1.5">
                <i className="bi bi-check-circle-fill text-success"></i>
                <span>Instant Access</span>
              </div>
            </div>
          </div>

          {/* Hero Right Animated Illustration Placeholder */}
          <div className="col-lg-6">
            <div className="position-relative mx-auto max-w-md max-w-lg-none">
              {/* Main Floating Glass Dashboard Mockup */}
              <div className="glass-card p-4 rounded-4 shadow-lg border position-relative overflow-hidden">
                {/* Mock Card Top Header */}
                <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom border-subtle">
                  <div className="d-flex align-items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                      alt="Student Avatar" 
                      className="rounded-circle shadow-sm"
                      style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="fw-bold mb-0 text-body">Alex Morgan</h6>
                      <span className="text-muted small">Computer Science • Senior</span>
                    </div>
                  </div>
                  <span className="badge bg-success-subtle text-success rounded-pill px-3 py-1.5 fw-semibold border border-success-subtle">
                    GPA: 3.88
                  </span>
                </div>

                {/* Mock Progress Bars & Course Pills */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1 small">
                    <span className="fw-semibold text-body">CS 302: Web Programming</span>
                    <span className="text-primary fw-bold">92%</span>
                  </div>
                  <div className="progress rounded-pill bg-body-tertiary" style={{ height: '8px' }}>
                    <div className="progress-bar rounded-pill bg-gradient-accent" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1 small">
                    <span className="fw-semibold text-body">CS 401: Artificial Intelligence</span>
                    <span className="text-purple fw-bold" style={{ color: '#7c3aed' }}>88%</span>
                  </div>
                  <div className="progress rounded-pill bg-body-tertiary" style={{ height: '8px' }}>
                    <div className="progress-bar rounded-pill" style={{ width: '88%', backgroundColor: '#7c3aed' }}></div>
                  </div>
                </div>

                {/* Schedule Snippet */}
                <div className="p-3 rounded-3 bg-body-tertiary border border-subtle d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-2 rounded-3 bg-primary text-white">
                      <i className="bi bi-clock-history fs-5"></i>
                    </div>
                    <div>
                      <div className="fw-bold small text-body">Next Class: MA 201</div>
                      <div className="text-muted xsmall">10:00 AM • Math Annex 204</div>
                    </div>
                  </div>
                  <span className="badge bg-primary rounded-pill px-2.5 py-1">In 30m</span>
                </div>
              </div>

              {/* Floating Orbiting Badges */}
              <div 
                className="position-absolute glass-card p-3 rounded-4 shadow-lg border d-flex align-items-center gap-2 floating-element"
                style={{ top: '-20px', right: '-10px', zIndex: 10, maxWidth: '210px' }}
              >
                <div className="p-2 rounded-circle bg-success text-white">
                  <i className="bi bi-check2-circle fs-5"></i>
                </div>
                <div>
                  <div className="fw-bold xsmall text-body">Assignment Saved</div>
                  <div className="text-muted xsmall">Web Portal • 100% Valid</div>
                </div>
              </div>

              <div 
                className="position-absolute glass-card p-3 rounded-4 shadow-lg border d-flex align-items-center gap-3 floating-element-delayed"
                style={{ bottom: '-25px', left: '-15px', zIndex: 10, maxWidth: '230px' }}
              >
                <div className="p-2 rounded-circle bg-gradient-accent text-white">
                  <i className="bi bi-bell-fill fs-5"></i>
                </div>
                <div>
                  <div className="fw-bold xsmall text-body">Exam Reminder</div>
                  <div className="text-muted xsmall">CS 302 Midterm • Aug 12</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
