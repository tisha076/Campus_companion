import React, { useState } from 'react';
import { PageView } from '../types';
import { RippleButton } from './RippleButton';

interface FooterProps {
  setActiveView: (view: PageView) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView, showToast }) => {
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSubmitted(true);
    showToast('Thank you! Your feedback has been recorded for the course project.', 'success');
    setTimeout(() => {
      setFeedbackText('');
      setFeedbackEmail('');
      setFeedbackSubmitted(false);
    }, 3000);
  };

  return (
    <footer className="w-full mt-20 border-t border-white/50 dark:border-white/10 glass-panel rounded-t-3xl rounded-b-none relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <i className="bi bi-mortarboard-fill text-xl" />
              </div>
              <span className="text-xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
                Campus Companion
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-light max-w-sm leading-relaxed">
              A premium, Apple-inspired frontend student portal developed for university Web Programming. Engineered with modern Glassmorphism, smooth animations, and realistic dummy academic engines.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#github"
                onClick={(e) => { e.preventDefault(); showToast('GitHub repository view demo link clicked', 'info'); }}
                className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                title="GitHub Repository"
              >
                <i className="bi bi-github text-lg" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => { e.preventDefault(); showToast('Campus Twitter link clicked', 'info'); }}
                className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                title="Campus Twitter"
              >
                <i className="bi bi-twitter-x text-lg" />
              </a>
              <a
                href="#linkedin"
                onClick={(e) => { e.preventDefault(); showToast('Student Network link clicked', 'info'); }}
                className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                title="LinkedIn Network"
              >
                <i className="bi bi-linkedin text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-heading">
              Quick Views
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => { setActiveView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Landing Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('login'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Student Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('register'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
                >
                  New Student Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveView('portal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-indigo-600 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Interactive Portal Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-heading">
              Portal Modules
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <i className="bi bi-check2 text-indigo-500" />
                Course Timetable Matrix
              </li>
              <li className="flex items-center gap-2">
                <i className="bi bi-check2 text-indigo-500" />
                Predictive GPA Simulator
              </li>
              <li className="flex items-center gap-2">
                <i className="bi bi-check2 text-indigo-500" />
                Contactless Digital Pass
              </li>
              <li className="flex items-center gap-2">
                <i className="bi bi-check2 text-indigo-500" />
                Multi-Column Registration
              </li>
            </ul>
          </div>

          {/* Quick Course Feedback Form */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-heading">
              Project Feedback
            </h4>
            {feedbackSubmitted ? (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
                <i className="bi bi-check-circle-fill text-base" />
                Feedback recorded! Thank you.
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-2">
                <input
                  type="email"
                  placeholder="Your university email..."
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl glass-input"
                />
                <textarea
                  rows={2}
                  placeholder="Course project notes..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl glass-input resize-none"
                  required
                />
                <RippleButton type="submit" variant="primary" className="w-full py-2 text-xs font-semibold">
                  Send Feedback
                </RippleButton>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Campus Companion • University Web Programming Course Project.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              100% Frontend Client-Side
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
