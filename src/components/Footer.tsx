import React, { useState } from 'react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="pt-5 pb-4 mt-5 position-relative border-top border-subtle glass-nav">
      <div className="container max-w-7xl">
        <div className="row gy-4 mb-5">
          {/* Brand Col */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="d-flex align-items-center justify-content-center rounded-3 bg-gradient-accent text-white p-2 shadow-sm" style={{ width: '36px', height: '36px' }}>
                <i className="bi bi-mortarboard-fill fs-5"></i>
              </div>
              <span className="fw-extrabold fs-5 tracking-tight text-body">Campus Companion</span>
            </div>
            <p className="text-secondary small mb-3 max-w-sm">
              The clean, responsive student portal designed for university course management, class routine scheduling, and academic calculators.
            </p>
            <div className="d-flex gap-2">
              <button onClick={() => onNavigate('contact')} className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0 text-body" style={{ width: '36px', height: '36px' }} title="Contact Support">
                <i className="bi bi-envelope"></i>
              </button>
              <button onClick={() => onNavigate('about')} className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0 text-body" style={{ width: '36px', height: '36px' }} title="About Project">
                <i className="bi bi-info-circle"></i>
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold text-body mb-3 small text-uppercase tracking-wider">Navigation</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><button onClick={() => onNavigate('landing')} className="btn btn-link p-0 text-decoration-none text-secondary">Home</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="btn btn-link p-0 text-decoration-none text-secondary">Dashboard</button></li>
              <li><button onClick={() => onNavigate('routine')} className="btn btn-link p-0 text-decoration-none text-secondary">Routine</button></li>
              <li><button onClick={() => onNavigate('assignments')} className="btn btn-link p-0 text-decoration-none text-secondary">Assignments</button></li>
              <li><button onClick={() => onNavigate('about')} className="btn btn-link p-0 text-decoration-none text-secondary">About</button></li>
            </ul>
          </div>

          {/* Student Utilities */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold text-body mb-3 small text-uppercase tracking-wider">Calculators & Tools</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><button onClick={() => onNavigate('attendance')} className="btn btn-link p-0 text-decoration-none text-secondary">Attendance Calculator</button></li>
              <li><button onClick={() => onNavigate('cgpa')} className="btn btn-link p-0 text-decoration-none text-secondary">CGPA Calculator</button></li>
              <li><button onClick={() => onNavigate('notes')} className="btn btn-link p-0 text-decoration-none text-secondary">Notes Manager</button></li>
              <li><button onClick={() => onNavigate('profile')} className="btn btn-link p-0 text-decoration-none text-secondary">Student Profile</button></li>
              <li><button onClick={() => onNavigate('contact')} className="btn btn-link p-0 text-decoration-none text-secondary">Helpdesk Contact</button></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold text-body mb-3 small text-uppercase tracking-wider">Campus Bulletin</h6>
            <p className="text-secondary small mb-3">Subscribe to receive weekly campus announcements and academic deadlines directly.</p>
            
            {subscribed ? (
              <div className="alert alert-success rounded-3 p-2.5 small d-flex align-items-center gap-2 mb-0">
                <i className="bi bi-check-circle-fill fs-5"></i>
                <span>Subscribed! You will receive campus news updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="d-flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter university email..."
                  className="form-control rounded-pill bg-body-tertiary border-subtle px-3 py-2 small"
                />
                <button 
                  type="submit" 
                  className="btn btn-primary rounded-pill bg-gradient-accent border-0 fw-semibold px-3 py-2 flex-shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-top border-subtle d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 text-muted xsmall" style={{ fontSize: '0.8rem' }}>
          <div>© {new Date().getFullYear()} Campus Companion. University Web Programming Final Project.</div>
          <div className="d-flex gap-3">
            <span>Responsive Bootstrap 5 UI</span>
            <span>•</span>
            <span>Frontend Web Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
