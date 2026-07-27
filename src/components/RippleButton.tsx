import React, { useState } from 'react';

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline' | 'danger';
}

export const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; size: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) {
      onClick(e);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30';
      case 'secondary':
        return 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200 shadow-md';
      case 'glass':
        return 'glass-card hover:bg-white/90 dark:hover:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-white/50 dark:border-white/10 shadow-sm';
      case 'outline':
        return 'bg-transparent border-2 border-indigo-500/40 dark:border-indigo-400/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30';
      case 'danger':
        return 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20';
      default:
        return 'bg-indigo-600 text-white';
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`ripple-btn relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${getVariantStyles()} ${className}`}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-span"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
          }}
        />
      ))}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
