import React, { useState } from 'react';
import { PageView, UserProfile } from '../types';
import { initialUserProfile } from '../data/mockData';
import { createRipple } from '../utils/ripple';

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
    }, 800);
  };

  const handleQuickDemoLogin = (e: React.MouseEvent<HTMLElement>) => {
    createRipple(e);
    setEmail('alex.morgan@university.edu');
    setPassword('Campus@2026!');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(initialUserProfile);
    }, 600);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail) {
      setForgotSubmitted(true);
      setTimeout(() => {
        setForgotSubmitted(false);
        setShowForgotModal(false);
        setForgotEmail('');
      }, 3000);
    }
  };

  return (
    <div className="container max-w-7xl py-5 position-relative d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="w-100 max-w-md mx-auto">
        
        {/* Navigation Breadcrumb back */}
        <div className="mb-3 text-center text-sm-start">
          <button
            onClick={() => onNavigate('landing')}
            className="btn btn-link text-body text-decoration-none p-0 d-inline-flex align-items-center gap-1.5 small fw-semibold"
          >
            <i className="bi bi-arrow-left text-primary fs-5"></i>
            <span>Back to Home</span>
          </button>
        </div>

        {/* Glass Card Container */}
        <div className="glass-card p-4 p-sm-5 rounded-4 shadow-lg border position-relative overflow-hidden">
          
          {/* Card Header */}
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-4 bg-gradient-accent text-white p-3 mb-3 shadow-sm floating-element" style={{ width: '56px', height: '56px' }}>
              <i className="bi bi-shield-lock-fill fs-3"></i>
            </div>
            <h2 className="fw-extrabold text-body tracking-tight mb-1 fs-3">Welcome Back</h2>
            <p className="text-secondary small mb-0">Access your Campus Companion portal account</p>
          </div>

          {/* Quick Demo Fill Alert */}
          <div className="alert alert-primary bg-primary-subtle border-primary-subtle rounded-3 p-2.5 mb-4 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2 small">
              <i className="bi bi-person-fill-check text-primary fs-5"></i>
              <div>
                <span className="fw-bold d-block text-body">Demo Mode Active</span>
                <span className="text-muted xsmall" style={{ fontSize: '0.75rem' }}>One-click login for evaluator</span>
              </div>
            </div>
            <button
              onClick={handleQuickDemoLogin}
              className="btn btn-primary btn-sm rounded-pill px-3 py-1 bg-gradient-accent border-0 fw-semibold btn-ripple shadow-sm"
              disabled={isLoading}
            >
              Demo Login
            </button>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="alert alert-danger rounded-3 p-3 mb-4 small d-flex align-items-center gap-2">
              <i className="bi bi-exclamation-triangle-fill fs-5"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit}>
            {/* Floating Label Email */}
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
                <i className="bi bi-envelope me-2"></i>University Email / Student ID
              </label>
            </div>

            {/* Floating Label Password with Eye Toggle */}
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
                className="btn btn-link text-secondary position-absolute top-50 end-0 translate-middle-y me-2 p-1 text-decoration-none"
                style={{ zIndex: 10 }}
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} fs-5`}></i>
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="d-flex align-items-center justify-content-between mb-4 small">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberCheck"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-input-label text-secondary" htmlFor="rememberCheck">
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

            {/* Login Submit Button */}
            <button
              type="submit"
              onClick={(e) => createRipple(e)}
              disabled={isLoading}
              className="btn btn-primary btn-lg rounded-pill w-100 fw-bold bg-gradient-accent border-0 py-3 mb-4 btn-ripple shadow-md d-flex align-items-center justify-content-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <i className="bi bi-box-arrow-in-right fs-5"></i>
                </>
              )}
            </button>
          </form>

          {/* Social Login UI Divider */}
          <div className="position-relative text-center mb-4">
            <hr className="border-subtle my-0" />
            <span className="position-absolute top-50 start-50 translate-middle px-3 text-muted xsmall bg-body" style={{ fontSize: '0.75rem' }}>
              OR CONTINUE WITH
            </span>
          </div>

          {/* Social Buttons (UI Only) */}
          <div className="row g-2 mb-4">
            <div className="col-4">
              <button
                type="button"
                onClick={(e) => createRipple(e)}
                className="btn btn-outline-secondary w-100 rounded-3 py-2 btn-ripple glass-card border-subtle d-flex align-items-center justify-content-center gap-1 text-body"
                title="Sign in with Google"
              >
                <i className="bi bi-google text-danger"></i>
                <span className="d-none d-sm-inline xsmall fw-semibold ms-1">Google</span>
              </button>
            </div>
            <div className="col-4">
              <button
                type="button"
                onClick={(e) => createRipple(e)}
                className="btn btn-outline-secondary w-100 rounded-3 py-2 btn-ripple glass-card border-subtle d-flex align-items-center justify-content-center gap-1 text-body"
                title="Sign in with Apple"
              >
                <i className="bi bi-apple text-body"></i>
                <span className="d-none d-sm-inline xsmall fw-semibold ms-1">Apple</span>
              </button>
            </div>
            <div className="col-4">
              <button
                type="button"
                onClick={(e) => createRipple(e)}
                className="btn btn-outline-secondary w-100 rounded-3 py-2 btn-ripple glass-card border-subtle d-flex align-items-center justify-content-center gap-1 text-body"
                title="Sign in with Microsoft"
              >
                <i className="bi bi-microsoft text-primary"></i>
                <span className="d-none d-sm-inline xsmall fw-semibold ms-1">Office</span>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center text-secondary small">
            <span>Don't have an account yet? </span>
            <button
              onClick={() => onNavigate('register')}
              className="btn btn-link text-primary p-0 text-decoration-none fw-bold ms-1"
            >
              Register Account
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(8px)' }}>
          <div className="modal-dialog modal-dialog-centered max-w-md">
            <div className="modal-content glass-modal border-0 p-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-body">Reset Portal Password</h5>
                <button type="button" className="btn-close" onClick={() => setShowForgotModal(false)}></button>
              </div>
              <div className="modal-body py-3">
                <p className="text-secondary small mb-3">
                  Enter your university email address below. We will send you a secure password reset link.
                </p>

                {forgotSubmitted ? (
                  <div className="alert alert-success rounded-3 p-3 small d-flex align-items-center gap-2 mb-0">
                    <i className="bi bi-check-circle-fill fs-4"></i>
                    <span>Password reset instructions sent to {forgotEmail}!</span>
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
                        Send Reset Link
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
