import React from 'react';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] max-w-xl mx-auto flex items-center justify-center p-4">
      {/* Background Soft Glow Orbs behind canvas */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl filter blur-3xl" />

      {/* Main Glassmorphic Central Window Frame */}
      <div className="relative w-full h-full glass-panel p-6 border border-white/60 dark:border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden group">
        
        {/* Apple Window Header Dots */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <i className="bi bi-shield-check text-emerald-500" />
            <span>portal.campus-companion.edu</span>
          </div>
          <div className="w-4 h-4 rounded-full bg-slate-300/30 dark:bg-slate-700/30 flex items-center justify-center">
            <i className="bi bi-gear-fill text-[10px] text-slate-400" />
          </div>
        </div>

        {/* Inner Glass Display Grid */}
        <div className="grid grid-cols-12 gap-3 my-auto py-2">
          {/* Widget 1: Live GPA Card */}
          <div className="col-span-7 glass-card p-4 border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent hero-widget-float">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <i className="bi bi-trophy-fill text-amber-500" />
                Semester GPA
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                Honors
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">3.88</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">/ 4.00 Scale</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full w-[94%]" />
            </div>
          </div>

          {/* Widget 2: Attendance Dial */}
          <div className="col-span-5 glass-card p-4 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent hero-widget-float-delayed flex flex-col justify-between">
            <div className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <i className="bi bi-person-check-fill text-emerald-500" />
              Attendance
            </div>
            <div className="text-2xl font-extrabold font-heading text-emerald-600 dark:text-emerald-400">
              96%
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              28 of 29 lectures
            </p>
          </div>

          {/* Widget 3: Live Upcoming Lecture Card */}
          <div className="col-span-12 glass-card p-4 border border-blue-500/20 bg-slate-900/5 dark:bg-slate-900/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                CS401
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Advanced Web Programming
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <i className="bi bi-geo-alt-fill text-rose-500" />
                  Tech Hub • Room 302
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-300">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                In 18 mins
              </span>
            </div>
          </div>
        </div>

        {/* Floating Decorative Glass Pass Badge */}
        <div className="absolute -bottom-3 -right-3 glass-card p-3 shadow-2xl border border-white/80 dark:border-white/20 bg-white/90 dark:bg-slate-900/90 flex items-center gap-3 rounded-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white">
            <i className="bi bi-qr-code text-lg" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-100">Digital Student ID</p>
            <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">PASS ACTIVE • NFC</p>
          </div>
        </div>
      </div>
    </div>
  );
};
