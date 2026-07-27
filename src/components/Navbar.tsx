import React, { useState } from 'react';
import { PageView } from '../types';
import { RippleButton } from './RippleButton';

interface NavbarProps {
  activeView: PageView;
  setActiveView: (view: PageView) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  isDarkMode,
  setIsDarkMode,
  isLoggedIn,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: PageView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleNav('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-900/10 backdrop-blur-md rounded-[10px] flex items-center justify-center text-white">
              <i className="bi bi-mortarboard-fill text-xl" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-heading tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 dark:from-white dark:via-slate-100 dark:to-indigo-300">
              Campus Companion
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-indigo-600 dark:text-indigo-400">
              Student Experience Portal
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-white/60 dark:border-white/10 backdrop-blur-md">
          <button
            onClick={() => handleNav('landing')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeView === 'landing'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white'
            }`}
          >
            <i className="bi bi-house-door me-1.5" />
            Home
          </button>

          <button
            onClick={() => {
              handleNav('landing');
              setTimeout(() => {
                document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-all cursor-pointer"
          >
            <i className="bi bi-grid-fill me-1.5" />
            Features
          </button>

          <button
            onClick={() => {
              handleNav('landing');
              setTimeout(() => {
                document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-all cursor-pointer"
          >
            <i className="bi bi-bar-chart-line-fill me-1.5" />
            Stats & Testimonials
          </button>

          {isLoggedIn && (
            <button
              onClick={() => handleNav('portal')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeView === 'portal'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 font-semibold'
                  : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10'
              }`}
            >
              <i className="bi bi-speedometer me-1.5" />
              Student Portal
            </button>
          )}
        </nav>

        {/* Right Action Controls: Dark Mode Toggle & Login / Portal Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark Mode Switcher */}
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            aria-label="Toggle Dark Mode"
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-700 dark:text-amber-300 hover:scale-110 active:scale-95 transition-all cursor-pointer"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <i className="bi bi-sun-fill text-lg animate-spin" style={{ animationDuration: '10s' }} />
            ) : (
              <i className="bi bi-moon-stars-fill text-lg" />
            )}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNav('portal')}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl glass-card hover:border-indigo-500/40 cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Alex Rivera"
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/40"
                />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">Alex Rivera</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">ID: 2026-8849</p>
                </div>
              </button>

              <button
                onClick={onLogout}
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-500 hover:text-rose-500 hover:border-rose-500/30 transition-colors cursor-pointer"
                title="Logout Demo Student"
              >
                <i className="bi bi-box-arrow-right text-lg" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('login')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeView === 'login'
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                    : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-white'
                }`}
              >
                Log In
              </button>

              <RippleButton
                onClick={() => handleNav('register')}
                variant="primary"
                className="py-2.5 px-5 text-sm"
              >
                Register
                <i className="bi bi-arrow-right text-xs" />
              </RippleButton>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Control */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            aria-label="Toggle Dark Mode"
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-700 dark:text-amber-300"
          >
            {isDarkMode ? <i className="bi bi-sun-fill" /> : <i className="bi bi-moon-stars-fill" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Open Navigation Menu"
            className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-800 dark:text-slate-100"
          >
            <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'} text-xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel mx-4 mb-4 p-4 border border-white/40 dark:border-white/10 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <button
            onClick={() => handleNav('landing')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 ${
              activeView === 'landing' ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            <i className="bi bi-house-door-fill text-lg" />
            Home
          </button>

          <button
            onClick={() => {
              handleNav('landing');
              setTimeout(() => {
                document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-3"
          >
            <i className="bi bi-grid-fill text-lg text-indigo-500" />
            Features Section
          </button>

          {isLoggedIn ? (
            <>
              <button
                onClick={() => handleNav('portal')}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 ${
                  activeView === 'portal' ? 'bg-indigo-600 text-white' : 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                }`}
              >
                <i className="bi bi-speedometer text-lg" />
                Student Portal Dashboard
              </button>

              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-3"
              >
                <i className="bi bi-box-arrow-right text-lg" />
                Log Out (Alex Rivera)
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => handleNav('login')}
                className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold text-center text-slate-800 dark:text-slate-100"
              >
                Log In
              </button>
              <button
                onClick={() => handleNav('register')}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold text-center shadow-md shadow-indigo-500/20"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
