import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onLoaded, 600);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 10;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Soft Ambient Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-2xl animate-ping" style={{ animationDuration: '3s' }} />

      <div className="relative z-10 flex flex-col items-center text-center p-8 max-w-sm">
        {/* Apple-style Glass Logo Emblem */}
        <div className="w-20 h-20 mb-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl shadow-indigo-500/30 animate-bounce" style={{ animationDuration: '2s' }}>
          <i className="bi bi-mortarboard-fill text-4xl text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 via-blue-400 to-teal-300" />
        </div>

        <h1 className="text-2xl font-bold font-heading tracking-tight text-white mb-1">
          Campus Companion
        </h1>
        <p className="text-sm text-slate-400 font-light mb-8">
          Initialising Student Experience Portal...
        </p>

        {/* Apple-style Slim Progress Bar */}
        <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3 border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs font-mono text-slate-500">{progress}%</span>
      </div>
    </div>
  );
};
