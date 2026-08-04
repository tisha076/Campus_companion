import React, { useState } from 'react';
import { PageView, UserProfile } from '../types';
import { initialUserProfile } from '../data/mockData';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigate: (view: PageView) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both your university email and password.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        ...initialUserProfile,
        email: email
      });
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setEmail('alex.morgan@university.edu');
    setPassword('Campus@2026!');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(initialUserProfile);
    }, 300);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail) {
      setForgotSubmitted(true);
      setTimeout(() => {
        setForgotSubmitted(false);
        setShowForgotModal(false);
        setForgotEmail('');
      }, 2000);
    }
  };

  return (
    <div className="container max-w-7xl py-5 position-relative d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="w-100 max-w-md mx-auto">
        <div className="mb-3 text-center text-sm-start">
          <button
            onClick={() => onNavigate('landing')}
            className="btn btn-link text-body text-decoration-none p-0 d-inline-flex align-items-center gap-1.5 small fw-semibold"
          >
            <i className="bi bi-arrow-left text-primary fs-5"></i>
            <span>Back to Home</span>
          </button>
        </div>

        <div className="glass-card p-4 p-sm-5 rounded-4 shadow-lg border">
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-4 bg-gradient-accent text-white p-3 mb-3 shadow-sm" style={{ width: '56px', height: '56px' }}>
              <i className="bi bi-shield-lock-fill fs-3"></i>
            </div>
            <h2 className="fw-extrabold text-body tracking-tight mb-1 fs-3">Welcome Back</h2>
            <p className="text-secondary small mb-0">Sign in to your Campus Companion student portal</p>
          </div>

          <div className="alert alert-primary bg-primary-subtle border-primary-subtle rounded-3 p-2.5 mb-4 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2 small">
              <i className="bi bi-person-fill-check text-primary fs-5"></i>
              <div>
                <span className="fw-bold d-block text-body">Demo Login</span>
                <span className="text-muted xsmall" style={{ fontSize: '0.75rem' }}>One-click login for evaluation</span>
              </div>
            </div>
            <button
              onClick={handleQuickDemoLogin}
              className="btn btn-primary btn-sm rounded-pill px-3 py-1 bg-gradient-accent border-0 fw-semibold shadow-sm"
              disabled={isLoading}
            >
              Demo Fill
            </button>
          </div>

          {errorMessage && (
            <div className="alert alert-danger rounded-3 p-3 mb-4 small d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill fs-5"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingEmail">
                <i className="bi bi-envelope me-2"></i>University Email
              </label>
            </div>

            <div className="form-floating mb-3 position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control pe-5"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingPassword">
                <i className="bi bi-lock me-2"></i>Password
              </label>
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-link text-secondary position-absolute top-50 end-0 translate-middle-y me-2 p-1 text-decoration-none z-3"
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} fs-5`}></i>
              </button>
            </div>

            <div className="d-flex align-items-center justify-content-between mb-4 small">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberCheck"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label text-secondary" htmlFor="rememberCheck">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="btn btn-link text-primary p-0 text-decoration-none fw-semibold small"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-lg rounded-pill w-100 fw-bold bg-gradient-accent border-0 py-3 mb-4 shadow-md d-flex align-items-center justify-content-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <i className="bi bi-box-arrow-in-right fs-5"></i>
                </>
              )}
            </button>
          </form>

          <div className="text-center text-secondary small">
            <span>Don't have an account yet? </span>
            <button
              onClick={() => onNavigate('register')}
              className="btn btn-link text-primary p-0 text-decoration-none fw-bold ms-1"
            >
              Register Here
            </button>
          </div>
        </div>
      </div>

      {showForgotModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered max-w-md">
            <div className="modal-content glass-modal border-0 p-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-body">Reset Password</h5>
                <button type="button" className="btn-close" onClick={() => setShowForgotModal(false)}></button>
              </div>
              <div className="modal-body py-3">
                <p className="text-secondary small mb-3">
                  Enter your university email address below to receive password reset instructions.
                </p>

                {forgotSubmitted ? (
                  <div className="alert alert-success rounded-3 p-3 small d-flex align-items-center gap-2 mb-0">
                    <i className="bi bi-check-circle-fill fs-4"></i>
                    <span>Reset instructions sent to {forgotEmail}!</span>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="forgotEmail"
                        placeholder="name@university.edu"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                      />
                      <label htmlFor="forgotEmail">University Email</label>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                      <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setShowForgotModal(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary rounded-pill bg-gradient-accent border-0 px-4 fw-semibold">
                        Send Link
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
