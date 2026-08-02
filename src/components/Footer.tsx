import React, { useState } from 'react';
import { PageView } from '../types';
import { createRipple } from '../utils/ripple';

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
              The premier student portal engineered for university excellence. Experience glassmorphic design, instant schedule tracking, and academic organization.
            </p>
            <div className="d-flex gap-2">
              <a href="#" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0 text-body" style={{ width: '36px', height: '36px' }} aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0 text-body" style={{ width: '36px', height: '36px' }} aria-label="GitHub">
                <i className="bi bi-github"></i>
              </a>
              <a href="#" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0 text-body" style={{ width: '36px', height: '36px' }} aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0 text-body" style={{ width: '36px', height: '36px' }} aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold text-body mb-3 small text-uppercase tracking-wider">Quick Navigation</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><button onClick={() => onNavigate('landing')} className="btn btn-link p-0 text-decoration-none text-secondary">Home</button></li>
              <li><a href="#features" className="text-decoration-none text-secondary">Features</a></li>
              <li><a href="#stats" className="text-decoration-none text-secondary">Statistics</a></li>
              <li><a href="#testimonials" className="text-decoration-none text-secondary">Testimonials</a></li>
              <li><button onClick={() => onNavigate('dashboard')} className="btn btn-link p-0 text-decoration-none text-primary fw-semibold">Student Portal</button></li>
            </ul>
          </div>

          {/* Student Services */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-bold text-body mb-3 small text-uppercase tracking-wider">Student Resources</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary">
              <li>Course Directory</li>
              <li>Academic Calendar</li>
              <li>Library Commons</li>
              <li>Financial Aid Office</li>
              <li>IT Support Services</li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold text-body mb-3 small text-uppercase tracking-wider">Campus News Bulletin</h6>
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
                  onClick={(e) => createRipple(e)}
                  className="btn btn-primary rounded-pill bg-gradient-accent border-0 fw-semibold px-3 py-2 btn-ripple flex-shrink-0"
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
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
