import React, { useState } from 'react';
import { PageView, UserProfile } from '../types';

interface NavbarProps {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProfile | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  darkMode,
  setDarkMode,
  user,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: PageView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top glass-nav py-2 px-3 px-md-4">
      <div className="container-fluid max-w-7xl">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('landing')}
          className="navbar-brand d-flex align-items-center gap-2 border-0 bg-transparent p-0 text-start"
        >
          <div className="d-flex align-items-center justify-content-center rounded-3 bg-gradient-accent text-white shadow-sm" style={{ width: '38px', height: '38px' }}>
            <i className="bi bi-mortarboard-fill fs-5"></i>
          </div>
          <div>
            <span className="fw-extrabold fs-5 tracking-tight d-block text-body lh-1">Campus Companion</span>
            <span className="text-muted xsmall" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>STUDENT PORTAL</span>
          </div>
        </button>

        {/* Dark Mode & User Profile Actions */}
        <div className="d-flex align-items-center gap-2 order-lg-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center border-0 shadow-none"
            style={{ width: '40px', height: '40px', backgroundColor: 'rgba(148, 163, 184, 0.12)' }}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            <i className={`bi ${darkMode ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'} fs-5`}></i>
          </button>

          {user ? (
            <div className="dropdown">
              <button
                className="btn btn-light rounded-pill border-0 d-flex align-items-center gap-2 px-3 py-1 shadow-sm glass-card"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={user.avatarUrl} alt={user.name} className="rounded-circle" style={{ width: '28px', height: '28px', objectFit: 'cover' }} />
                <span className="fw-semibold d-none d-sm-inline small text-body">{user.name.split(' ')[0]}</span>
                <i className="bi bi-chevron-down small text-muted"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end glass-modal shadow-lg border-0 rounded-4 p-2 mt-2">
                <li className="px-3 py-2 border-bottom border-subtle">
                  <div className="fw-bold small">{user.name}</div>
                  <div className="text-muted xsmall" style={{ fontSize: '0.75rem' }}>{user.email}</div>
                  <span className="badge bg-primary-subtle text-primary mt-1 rounded-pill">{user.studentId}</span>
                </li>
                <li>
                  <button className="dropdown-item rounded-3 mt-1 d-flex align-items-center gap-2 py-2" onClick={() => handleNavClick('dashboard')}>
                    <i className="bi bi-speedometer2 text-primary"></i> Dashboard
                  </button>
                </li>
                <li>
                  <button className="dropdown-item rounded-3 d-flex align-items-center gap-2 py-2" onClick={() => handleNavClick('profile')}>
                    <i className="bi bi-person-badge text-primary"></i> Student Profile
                  </button>
                </li>
                <li>
                  <button className="dropdown-item rounded-3 d-flex align-items-center gap-2 py-2 text-danger" onClick={onLogout}>
                    <i className="bi bi-box-arrow-right"></i> Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-none d-sm-flex align-items-center gap-2">
              <button
                onClick={() => handleNavClick('login')}
                className={`btn btn-link text-decoration-none fw-semibold rounded-pill px-3 py-2 ${currentView === 'login' ? 'text-primary fw-bold' : 'text-body'}`}
              >
                Log In
              </button>
              <button
                onClick={() => handleNavClick('register')}
                className="btn btn-primary rounded-pill fw-semibold px-4 py-2 shadow-sm bg-gradient-accent border-0"
              >
                Register
              </button>
            </div>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="navbar-toggler border-0 shadow-none p-2 rounded-circle d-lg-none"
            type="button"
            aria-label="Toggle navigation"
          >
            <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'} fs-3 text-body`}></i>
          </button>
        </div>

        {/* Main Nav Links */}
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show mt-3 p-3 rounded-4 glass-card' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto align-items-lg-center gap-1 gap-lg-1 fw-medium small">
            <li className="nav-item">
              <button
                onClick={() => handleNavClick('landing')}
                className={`nav-link border-0 bg-transparent py-1.5 px-2.5 rounded-pill text-start w-100 ${currentView === 'landing' || currentView === 'home' ? 'active fw-bold text-primary bg-primary-subtle' : 'text-body-secondary'}`}
              >
                Home
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`nav-link border-0 bg-transparent py-1.5 px-2.5 rounded-pill text-start w-100 ${currentView === 'dashboard' ? 'active fw-bold text-primary bg-primary-subtle' : 'text-body-secondary'}`}
              >
                Dashboard
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => handleNavClick('routine')}
                className={`nav-link border-0 bg-transparent py-1.5 px-2.5 rounded-pill text-start w-100 ${currentView === 'routine' ? 'active fw-bold text-primary bg-primary-subtle' : 'text-body-secondary'}`}
              >
                Routine
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => handleNavClick('assignments')}
                className={`nav-link border-0 bg-transparent py-1.5 px-2.5 rounded-pill text-start w-100 ${currentView === 'assignments' ? 'active fw-bold text-primary bg-primary-subtle' : 'text-body-secondary'}`}
              >
                Assignments
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => handleNavClick('attendance')}
                className={`nav-link border-0 bg-transparent py-1.5 px-2.5 rounded-pill text-start w-100 ${currentView === 'attendance' ? 'active fw-bold text-primary bg-primary-subtle' : 'text-body-secondary'}`}
              >
                Attendance
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => handleNavClick('cgpa')}
                className={`nav-link border-0 bg-transparent py-1.5 px-2.5 rounded-pill text-start w-100 ${currentView === 'cgpa' ? 'active fw-bold text-primary bg-primary-subtle' : 'text-body-secondary'}`}
              >
                CGPA
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => handleNavClick('notes')}
                className={`nav-link border-0 bg-transparent py-1.5 px-2.5 rounded-pill text-start w-100 ${currentView === 'notes' ? 'active fw-bold text-primary bg-primary-subtle' : 'text-body-secondary'}`}
              >
                Notes
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => handleNavClick('about')}
                className={`nav-link border-0 bg-transparent py-1.5 px-2.5 rounded-pill text-start w-100 ${currentView === 'about' ? 'active fw-bold text-primary bg-primary-subtle' : 'text-body-secondary'}`}
              >
                About
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => handleNavClick('contact')}
                className={`nav-link border-0 bg-transparent py-1.5 px-2.5 rounded-pill text-start w-100 ${currentView === 'contact' ? 'active fw-bold text-primary bg-primary-subtle' : 'text-body-secondary'}`}
              >
                Contact
              </button>
            </li>
          </ul>

          {!user && (
            <div className="d-flex d-sm-none flex-column gap-2 mt-3 pt-3 border-top border-subtle">
              <button
                onClick={() => handleNavClick('login')}
                className="btn btn-outline-secondary rounded-pill w-100 py-2 fw-semibold"
              >
                Log In
              </button>
              <button
                onClick={() => handleNavClick('register')}
                className="btn btn-primary bg-gradient-accent border-0 rounded-pill w-100 py-2 fw-semibold shadow-sm"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
