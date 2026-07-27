import React, { useState } from 'react';
import { PageView } from '../types';
import { RippleButton } from './RippleButton';

interface LoginPageProps {
  setActiveView: (view: PageView) => void;
  onLoginSuccess: (email: string) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  setActiveView,
  onLoginSuccess,
  showToast,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter your university email/ID and password.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(email);
      showToast('Login successful! Welcome back to Campus Companion.', 'success');
      setActiveView('portal');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  const handleAutofillDemo = () => {
    setEmail('alex.rivera@university.edu');
    setPassword('student2026!');
    showToast('Demo student credentials populated!', 'info');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      showToast(`Password reset link dispatched to ${forgotEmail}`, 'success');
      setShowForgotPasswordModal(false);
      setForgotSent(false);
      setForgotEmail('');
    }, 1200);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative">
      {/* Glassmorphic Central Card Container */}
      <div className="w-full max-w-md glass-card p-8 sm:p-10 border border-white/80 dark:border-white/10 shadow-2xl relative overflow-hidden my-auto">
        
        {/* Top Decorative Gradient Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 mx-auto flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-500/20 mb-3">
            <i className="bi bi-person-lock" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Student Login
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter your university credentials to access your portal
          </p>
        </div>

        {/* Demo Quick Autofill Banner */}
        <div className="mb-6 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-indigo-700 dark:text-indigo-300">
            <i className="bi bi-lightning-charge-fill text-amber-500" />
            <span className="font-medium">Testing as Demo Student?</span>
          </div>
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors cursor-pointer"
          >
            Autofill
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          {/* Floating Label: Email / Student ID */}
          <div className="floating-label-group">
            <input
              type="text"
              id="loginEmail"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input floating-input"
              required
            />
            <label htmlFor="loginEmail" className="floating-label flex items-center gap-1.5">
              <i className="bi bi-envelope-fill text-xs" />
              University Email or Student ID
            </label>
          </div>

          {/* Floating Label: Password */}
          <div className="floating-label-group">
            <input
              type={showPassword ? 'text' : 'password'}
              id="loginPassword"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input floating-input pr-10"
              required
            />
            <label htmlFor="loginPassword" className="floating-label flex items-center gap-1.5">
              <i className="bi bi-key-fill text-xs" />
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide Password' : 'Show Password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} text-lg`} />
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 cursor-pointer"
              />
              Remember me
            </label>

            <button
              type="button"
              onClick={() => setShowForgotPasswordModal(true)}
              className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <RippleButton
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-2 font-bold shadow-lg shadow-indigo-500/25"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <i className="bi bi-arrow-repeat animate-spin" />
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Log In to Portal
                <i className="bi bi-arrow-right" />
              </span>
            )}
          </RippleButton>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <span className="relative px-3 bg-white/70 dark:bg-slate-900/70 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Or sign in with SSO
          </span>
        </div>

        {/* Social / University SSO Login Buttons UI */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => showToast('Google Workspace SSO simulation triggered', 'info')}
            className="py-2.5 px-3 rounded-xl glass-card hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            title="Sign in with Google Workspace"
          >
            <i className="bi bi-google text-lg text-rose-500" />
          </button>
          <button
            type="button"
            onClick={() => showToast('University Central SSO authentication initiated', 'info')}
            className="py-2.5 px-3 rounded-xl glass-card hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            title="University Central SSO Pass"
          >
            <i className="bi bi-building text-lg text-indigo-500" />
          </button>
          <button
            type="button"
            onClick={() => showToast('Apple ID Authentication simulated', 'info')}
            className="py-2.5 px-3 rounded-xl glass-card hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            title="Sign in with Apple ID"
          >
            <i className="bi bi-apple text-lg text-slate-900 dark:text-white" />
          </button>
        </div>

        {/* Switch to Register */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-600 dark:text-slate-400">
          Don't have a student account yet?{' '}
          <button
            type="button"
            onClick={() => {
              setActiveView('register');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Register New Account
          </button>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm glass-card p-6 border border-white/80 dark:border-white/10 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <i className="bi bi-shield-lock-fill text-indigo-500" />
                Reset Student Password
              </h3>
              <button
                onClick={() => setShowForgotPasswordModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Enter your registered university email address to receive password recovery instructions.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="floating-label-group">
                <input
                  type="email"
                  id="forgotEmail"
                  placeholder=" "
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="glass-input floating-input"
                  required
                />
                <label htmlFor="forgotEmail" className="floating-label">
                  University Email Address
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <RippleButton type="submit" variant="primary" className="py-2 px-4 text-xs font-bold">
                  {forgotSent ? 'Sending...' : 'Send Reset Link'}
                </RippleButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
