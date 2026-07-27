import React from 'react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-2xl glass-card border shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300 ${
            toast.type === 'success'
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200'
              : toast.type === 'warning'
              ? 'border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-200'
              : 'border-indigo-500/40 bg-indigo-500/10 text-indigo-950 dark:text-indigo-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ${
              toast.type === 'success' ? 'bg-emerald-500' : toast.type === 'warning' ? 'bg-amber-500' : 'bg-indigo-600'
            }`}>
              {toast.type === 'success' && <i className="bi bi-check-lg" />}
              {toast.type === 'warning' && <i className="bi bi-exclamation-triangle" />}
              {toast.type === 'info' && <i className="bi bi-info-circle" />}
            </div>
            <p className="text-xs font-semibold leading-snug">{toast.text}</p>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
          >
            <i className="bi bi-x-lg text-sm" />
          </button>
        </div>
      ))}
    </div>
  );
};
