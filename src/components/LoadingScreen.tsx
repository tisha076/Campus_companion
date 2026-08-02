import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsHidden(true);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${isHidden ? 'hidden-loader' : ''}`}>
      <div className="text-center px-4 max-w-sm w-full">
        <div className="d-inline-flex align-items-center justify-content-center mb-4 p-3 rounded-4 bg-gradient-accent text-white shadow-lg floating-element" style={{ width: '70px', height: '70px' }}>
          <i className="bi bi-mortarboard-fill fs-1"></i>
        </div>
        <h2 className="fw-bold mb-1 tracking-tight fs-3">Campus Companion</h2>
        <p className="text-muted small mb-4">Initializing Apple-Inspired Student Experience...</p>
        
        <div className="progress rounded-pill bg-body-tertiary mb-2" style={{ height: '6px' }}>
          <div 
            className="progress-bar rounded-pill bg-gradient-accent" 
            role="progressbar" 
            style={{ width: `${progress}%`, transition: 'width 0.2s ease' }}
            aria-valuenow={progress} 
            aria-valuemin={0} 
            aria-valuemax={100}
          ></div>
        </div>
        
        <div className="d-flex justify-content-between align-items-center text-muted xsmall" style={{ fontSize: '0.75rem' }}>
          <span>Loading assets</span>
          <span className="fw-semibold">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
