import React, { useState, useEffect, useRef } from 'react';
import { createRipple } from '../utils/ripple';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface TimerSettings {
  focusDuration: number; // minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  soundEnabled: boolean;
  autoStartNext: boolean;
  longBreakInterval: number; // e.g. every 4 sessions
}

interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  reqText: string;
}

const DEFAULT_SETTINGS: TimerSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  soundEnabled: true,
  autoStartNext: false,
  longBreakInterval: 4,
};

const MOTIVATIONAL_QUOTES = {
  focus: [
    "Stay focused! You're making real progress.",
    "Eliminate distractions and enter deep flow.",
    "One session closer to mastering your goal.",
    "Consistency is the key to academic excellence.",
    "Keep pushing! Great minds focus with intent."
  ],
  shortBreak: [
    "Great job! Time for a quick breath and stretch.",
    "Step away from the screen for a moment.",
    "Hydrate and let your eyes rest.",
    "Short breaks keep your focus sharp!"
  ],
  longBreak: [
    "Awesome milestone reached! Take a well-deserved rest.",
    "Unwind completely before your next study sprint.",
    "Refuel your energy with a walk or healthy snack."
  ]
};

export const FocusTimerWidget: React.FC = () => {
  // Today date string key (YYYY-MM-DD)
  const getTodayKey = () => new Date().toISOString().split('T')[0];

  // Load Settings from LocalStorage
  const [settings, setSettings] = useState<TimerSettings>(() => {
    try {
      const saved = localStorage.getItem('cc_pomodoro_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Load Stats from LocalStorage
  const [todayKey] = useState<string>(getTodayKey());
  const [sessionsCompletedToday, setSessionsCompletedToday] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`cc_pomodoro_sessions_${todayKey}`);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [totalFocusMinutesToday, setTotalFocusMinutesToday] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`cc_pomodoro_focus_mins_${todayKey}`);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const savedStats = localStorage.getItem('cc_pomodoro_streak_info');
      if (savedStats) {
        const parsed = JSON.parse(savedStats);
        const lastDate = parsed.lastDate;
        const currentStreak = parsed.streak || 1;

        if (lastDate === getTodayKey()) {
          return currentStreak;
        } else {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayKey = yesterday.toISOString().split('T')[0];
          if (lastDate === yesterdayKey) {
            return currentStreak;
          } else {
            return 1; // Streak reset if missed a day
          }
        }
      }
      return 3; // Default realistic starting streak for sample user
    } catch {
      return 3;
    }
  });

  // Active Timer state
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(settings.focusDuration * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  // Sound Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synchronize time left when duration settings change (if timer not running)
  useEffect(() => {
    if (!isRunning) {
      if (mode === 'focus') setTimeLeft(settings.focusDuration * 60);
      else if (mode === 'shortBreak') setTimeLeft(settings.shortBreakDuration * 60);
      else if (mode === 'longBreak') setTimeLeft(settings.longBreakDuration * 60);
    }
  }, [settings, mode, isRunning]);

  // Save Settings to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('cc_pomodoro_settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Save Daily Stats to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(`cc_pomodoro_sessions_${todayKey}`, sessionsCompletedToday.toString());
      localStorage.setItem(`cc_pomodoro_focus_mins_${todayKey}`, totalFocusMinutesToday.toString());
      localStorage.setItem('cc_pomodoro_streak_info', JSON.stringify({
        lastDate: todayKey,
        streak: streakDays
      }));
    } catch (e) {
      console.error(e);
    }
  }, [sessionsCompletedToday, totalFocusMinutesToday, streakDays, todayKey]);

  // Rotate quotes every 45s or when mode changes
  useEffect(() => {
    const list = MOTIVATIONAL_QUOTES[mode];
    setQuoteIndex(Math.floor(Math.random() * list.length));
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % list.length);
    }, 45000);
    return () => clearInterval(interval);
  }, [mode]);

  // Web Audio API Synthesizer Chime
  const playChimeSound = () => {
    if (!settings.soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      // Synthesize a pleasant dual-tone chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.3); // E5
      osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.6); // G5

      osc2.frequency.setValueAtTime(1046.50, now); // C6
      osc2.frequency.exponentialRampToValueAtTime(1318.51, now + 0.6); // E6

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.2);
      osc2.stop(now + 1.2);
    } catch (e) {
      console.warn('Audio chime playback failed', e);
    }
  };

  // Toast Trigger Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  // Timer Tick Interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Session finished!
      playChimeSound();

      if (mode === 'focus') {
        const newCount = sessionsCompletedToday + 1;
        const newMinutes = totalFocusMinutesToday + settings.focusDuration;
        setSessionsCompletedToday(newCount);
        setTotalFocusMinutesToday(newMinutes);

        // Determine next break mode
        if (newCount % settings.longBreakInterval === 0) {
          setMode('longBreak');
          setTimeLeft(settings.longBreakDuration * 60);
          showToast(`🎉 Focus Session completed! Time for a ${settings.longBreakDuration}-min Long Break.`);
        } else {
          setMode('shortBreak');
          setTimeLeft(settings.shortBreakDuration * 60);
          showToast(`🎉 Focus Session completed! Time for a ${settings.shortBreakDuration}-min Short Break.`);
        }
      } else {
        // Break finished
        setMode('focus');
        setTimeLeft(settings.focusDuration * 60);
        showToast('⚡ Break finished! Ready for your next Focus Session?');
      }

      if (!settings.autoStartNext) {
        setIsRunning(false);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, settings, sessionsCompletedToday, totalFocusMinutesToday]);

  // Mode change handler
  const handleModeSwitch = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === 'focus') setTimeLeft(settings.focusDuration * 60);
    else if (newMode === 'shortBreak') setTimeLeft(settings.shortBreakDuration * 60);
    else if (newMode === 'longBreak') setTimeLeft(settings.longBreakDuration * 60);
  };

  // Toggle Start / Pause
  const toggleStartPause = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    setIsRunning(!isRunning);
  };

  // Reset Timer
  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    setIsRunning(false);
    if (mode === 'focus') setTimeLeft(settings.focusDuration * 60);
    else if (mode === 'shortBreak') setTimeLeft(settings.shortBreakDuration * 60);
    else if (mode === 'longBreak') setTimeLeft(settings.longBreakDuration * 60);
  };

  // Skip Session
  const handleSkip = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    setIsRunning(false);
    if (mode === 'focus') {
      setMode('shortBreak');
      setTimeLeft(settings.shortBreakDuration * 60);
    } else {
      setMode('focus');
      setTimeLeft(settings.focusDuration * 60);
    }
  };

  // Total duration for current mode
  const getTotalModeDuration = () => {
    if (mode === 'focus') return settings.focusDuration * 60;
    if (mode === 'shortBreak') return settings.shortBreakDuration * 60;
    return settings.longBreakDuration * 60;
  };

  const totalDuration = getTotalModeDuration();
  const progressRatio = totalDuration > 0 ? timeLeft / totalDuration : 0;

  // Format Time MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate Badges
  const badges: AchievementBadge[] = [
    {
      id: 'b1',
      title: 'Focus Beginner',
      description: 'Complete 1 focus session',
      icon: 'bi-seedling-fill',
      unlocked: sessionsCompletedToday >= 1,
      reqText: '1 Session'
    },
    {
      id: 'b2',
      title: 'Deep Worker',
      description: 'Complete 4 focus sessions today',
      icon: 'bi-lightning-charge-fill',
      unlocked: sessionsCompletedToday >= 4,
      reqText: '4 Sessions'
    },
    {
      id: 'b3',
      title: 'Study Master',
      description: 'Complete 8 focus sessions today',
      icon: 'bi-trophy-fill',
      unlocked: sessionsCompletedToday >= 8,
      reqText: '8 Sessions'
    },
    {
      id: 'b4',
      title: 'Streak Champion',
      description: 'Maintain a 3+ day study streak',
      icon: 'bi-fire',
      unlocked: streakDays >= 3,
      reqText: '3 Day Streak'
    }
  ];

  // Colors based on current timer mode
  const getModeColorClass = () => {
    if (mode === 'focus') return 'text-primary';
    if (mode === 'shortBreak') return 'text-success';
    return 'text-warning';
  };

  const getModeBgGradient = () => {
    if (mode === 'focus') return 'bg-gradient-accent';
    if (mode === 'shortBreak') return 'bg-success text-white';
    return 'bg-warning text-dark';
  };

  // SVG Circular Progress Constants
  const circleSize = 220;
  const strokeWidth = 10;
  const center = circleSize / 2;
  const radius = center - strokeWidth * 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="glass-card p-4 rounded-4 border mb-4 position-relative overflow-hidden shadow-lg transition-all">

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div 
          className="position-absolute top-0 start-50 translate-middle-x mt-3 z-3 bg-dark text-white px-4 py-2.5 rounded-pill shadow-lg d-flex align-items-center gap-2 border border-secondary transition-all animate-bounce"
          style={{ minWidth: '280px', maxWidth: '90%' }}
        >
          <i className="bi bi-bell-fill text-warning fs-5"></i>
          <span className="small fw-semibold flex-grow-1">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="btn-close btn-close-white btn-sm ms-2"
          ></button>
        </div>
      )}

      {/* Header Bar */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
        <div className="d-flex align-items-center gap-3">
          <div 
            className={`p-3 rounded-3 shadow-sm d-flex align-items-center justify-content-center transition-all ${getModeBgGradient()}`}
            style={{ width: '48px', height: '48px' }}
          >
            <i className={`bi ${mode === 'focus' ? 'bi-clock-history' : 'bi-cup-hot-fill'} fs-4`}></i>
          </div>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h2 className="h5 fw-extrabold text-body mb-0">Focus Timer & Pomodoro</h2>
              <span className={`badge rounded-pill px-2.5 py-0.5 fw-bold xsmall border ${
                mode === 'focus' ? 'bg-primary-subtle text-primary border-primary-subtle' :
                mode === 'shortBreak' ? 'bg-success-subtle text-success border-success-subtle' :
                'bg-warning-subtle text-warning border-warning-subtle'
              }`}>
                {mode === 'focus' ? 'Focus Session' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
              </span>
            </div>
            <span className="text-muted xsmall">
              Boost study productivity with structured deep-focus sprints
            </span>
          </div>
        </div>

        {/* Quick Action Controls */}
        <div className="d-flex align-items-center gap-2 align-self-start align-self-md-auto">
          {/* Mute/Unmute Toggle */}
          <button
            onClick={() => setSettings(s => ({ ...s, soundEnabled: !s.soundEnabled }))}
            className={`btn btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center border ${
              settings.soundEnabled ? 'btn-outline-primary' : 'btn-outline-secondary'
            }`}
            title={settings.soundEnabled ? 'Mute Chime Sound' : 'Unmute Chime Sound'}
            style={{ width: '38px', height: '38px' }}
          >
            <i className={`bi ${settings.soundEnabled ? 'bi-volume-up-fill' : 'bi-volume-mute-fill'} fs-6`}></i>
          </button>

          {/* Settings Modal Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-2 transition-all border ${
              showSettings ? 'btn-primary' : 'btn-outline-secondary'
            }`}
          >
            <i className="bi bi-gear-fill fs-6"></i>
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Settings Configuration Drawer / Card */}
      {showSettings && (
        <div className="p-3.5 rounded-4 bg-body-tertiary border border-subtle mb-4 shadow-sm animate-fade-in">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h3 className="h6 fw-extrabold text-body mb-0 d-flex align-items-center gap-2">
              <i className="bi bi-sliders text-primary"></i>
              Timer Preferences
            </h3>
            <button 
              onClick={() => setShowSettings(false)}
              className="btn-close btn-sm"
              aria-label="Close"
            ></button>
          </div>

          <div className="row g-3 text-start">
            <div className="col-12 col-sm-4">
              <label className="form-label xsmall text-muted fw-bold mb-1">Focus Duration (mins)</label>
              <input 
                type="number"
                min="1"
                max="60"
                className="form-range"
                value={settings.focusDuration}
                onChange={(e) => setSettings(s => ({ ...s, focusDuration: Math.max(1, parseInt(e.target.value) || 25) }))}
              />
              <div className="d-flex justify-content-between xsmall font-monospace fw-bold text-primary">
                <span>{settings.focusDuration} mins</span>
              </div>
            </div>

            <div className="col-12 col-sm-4">
              <label className="form-label xsmall text-muted fw-bold mb-1">Short Break (mins)</label>
              <input 
                type="number"
                min="1"
                max="30"
                className="form-range"
                value={settings.shortBreakDuration}
                onChange={(e) => setSettings(s => ({ ...s, shortBreakDuration: Math.max(1, parseInt(e.target.value) || 5) }))}
              />
              <div className="d-flex justify-content-between xsmall font-monospace fw-bold text-success">
                <span>{settings.shortBreakDuration} mins</span>
              </div>
            </div>

            <div className="col-12 col-sm-4">
              <label className="form-label xsmall text-muted fw-bold mb-1">Long Break (mins)</label>
              <input 
                type="number"
                min="1"
                max="45"
                className="form-range"
                value={settings.longBreakDuration}
                onChange={(e) => setSettings(s => ({ ...s, longBreakDuration: Math.max(1, parseInt(e.target.value) || 15) }))}
              />
              <div className="d-flex justify-content-between xsmall font-monospace fw-bold text-warning">
                <span>{settings.longBreakDuration} mins</span>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-1 pt-2 border-top border-subtle">
            <div className="col-12 col-sm-6">
              <div className="form-check form-switch">
                <input 
                  className="form-check-input"
                  type="checkbox"
                  id="autoStartSwitch"
                  checked={settings.autoStartNext}
                  onChange={(e) => setSettings(s => ({ ...s, autoStartNext: e.target.checked }))}
                />
                <label className="form-check-input-label xsmall text-body fw-semibold ms-2" htmlFor="autoStartSwitch">
                  Auto-start next session
                </label>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="form-check form-switch">
                <input 
                  className="form-check-input"
                  type="checkbox"
                  id="soundSwitch"
                  checked={settings.soundEnabled}
                  onChange={(e) => setSettings(s => ({ ...s, soundEnabled: e.target.checked }))}
                />
                <label className="form-check-input-label xsmall text-body fw-semibold ms-2" htmlFor="soundSwitch">
                  Notification audio sound
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Timer Body */}
      <div className="row g-4 align-items-center">
        
        {/* Left Circular Ring Timer Display */}
        <div className="col-12 col-lg-6 d-flex flex-column align-items-center justify-content-center">
          
          {/* Mode Switcher Tabs */}
          <div className="btn-group btn-group-sm rounded-pill p-1 bg-body-tertiary border border-subtle mb-4 shadow-sm w-auto">
            <button
              onClick={() => handleModeSwitch('focus')}
              className={`btn rounded-pill px-3 py-1.5 fw-bold xsmall transition-all ${
                mode === 'focus' ? 'btn-primary text-white shadow-sm' : 'btn-link text-body border-0'
              }`}
            >
              <i className="bi bi-clock-fill me-1"></i>
              Focus ({settings.focusDuration}m)
            </button>
            <button
              onClick={() => handleModeSwitch('shortBreak')}
              className={`btn rounded-pill px-3 py-1.5 fw-bold xsmall transition-all ${
                mode === 'shortBreak' ? 'btn-success text-white shadow-sm' : 'btn-link text-body border-0'
              }`}
            >
              <i className="bi bi-cup-hot-fill me-1"></i>
              Short Break ({settings.shortBreakDuration}m)
            </button>
            <button
              onClick={() => handleModeSwitch('longBreak')}
              className={`btn rounded-pill px-3 py-1.5 fw-bold xsmall transition-all ${
                mode === 'longBreak' ? 'btn-warning text-dark shadow-sm' : 'btn-link text-body border-0'
              }`}
            >
              <i className="bi bi-battery-charging me-1"></i>
              Long Break ({settings.longBreakDuration}m)
            </button>
          </div>

          {/* SVG Animated Circular Timer */}
          <div className="position-relative d-inline-flex align-items-center justify-content-center my-2">
            <svg width={circleSize} height={circleSize} className="transform -rotate-90">
              {/* Background Circle */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                className="stroke-body-tertiary"
                strokeWidth={strokeWidth}
                fill="transparent"
                style={{ stroke: 'var(--bs-border-color)' }}
              />
              {/* Animated Progress Circle */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  stroke: mode === 'focus' ? 'var(--bs-primary)' : mode === 'shortBreak' ? 'var(--bs-success)' : 'var(--bs-warning)',
                  transition: 'stroke-dashoffset 0.8s ease-in-out, stroke 0.3s ease'
                }}
              />
            </svg>

            {/* Prominent Countdown Text Overlay */}
            <div className="position-absolute text-center d-flex flex-column align-items-center justify-content-center">
              <div className={`display-4 fw-extrabold font-monospace tracking-tight ${getModeColorClass()}`}>
                {formatTime(timeLeft)}
              </div>
              <div className="text-muted xsmall fw-bold text-uppercase tracking-wider mt-1">
                {isRunning ? (
                  <span className="d-inline-flex align-items-center gap-1.5 text-success">
                    <span className="spinner-grow spinner-grow-sm" role="status" style={{ width: '8px', height: '8px' }}></span>
                    In Progress
                  </span>
                ) : (
                  'Paused'
                )}
              </div>
            </div>
          </div>

          {/* Controls Bar: Start / Pause / Reset / Skip */}
          <div className="d-flex align-items-center justify-content-center gap-2 mt-4">
            {/* Start / Pause Button */}
            <button
              onClick={toggleStartPause}
              className={`btn rounded-pill px-4 py-2.5 fw-extrabold shadow d-inline-flex align-items-center gap-2 transition-all ${
                isRunning ? 'btn-warning text-dark' : 'btn-primary text-white scale-105'
              }`}
              style={{ minWidth: '130px' }}
            >
              <i className={`bi ${isRunning ? 'bi-pause-fill' : 'bi-play-fill'} fs-5`}></i>
              <span>{isRunning ? 'Pause' : 'Start'}</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="btn btn-outline-secondary rounded-circle p-2.5 d-flex align-items-center justify-content-center"
              title="Reset Timer"
              style={{ width: '44px', height: '44px' }}
            >
              <i className="bi bi-arrow-counterclockwise fs-5"></i>
            </button>

            {/* Skip Button */}
            <button
              onClick={handleSkip}
              className="btn btn-outline-secondary rounded-circle p-2.5 d-flex align-items-center justify-content-center"
              title="Skip to Next Session"
              style={{ width: '44px', height: '44px' }}
            >
              <i className="bi bi-skip-end-fill fs-5"></i>
            </button>
          </div>

        </div>

        {/* Right Productivity Stats & Achievement Badges Column */}
        <div className="col-12 col-lg-6 border-start-lg">
          
          {/* Motivational Message Banner */}
          <div className="p-3 rounded-3 bg-body-tertiary border border-subtle mb-3 shadow-sm d-flex align-items-center gap-3">
            <div className="p-2.5 rounded-2 bg-primary-subtle text-primary">
              <i className="bi bi-quote fs-4"></i>
            </div>
            <div className="flex-grow-1">
              <div className="text-muted xsmall fw-bold text-uppercase">Mindset & Motivation</div>
              <div className="text-body fw-semibold italic xsmall mt-0.5">
                "{MOTIVATIONAL_QUOTES[mode][quoteIndex] || MOTIVATIONAL_QUOTES[mode][0]}"
              </div>
            </div>
          </div>

          {/* Today's KPI Metrics Grid */}
          <div className="row g-2 mb-3">
            
            {/* Sessions Completed Today */}
            <div className="col-4">
              <div className="p-3 rounded-3 bg-body-tertiary border border-subtle text-center h-100">
                <div className="p-1.5 rounded-circle bg-primary-subtle text-primary d-inline-flex mb-1">
                  <i className="bi bi-check-circle-fill fs-6"></i>
                </div>
                <div className="fs-4 fw-extrabold text-body">{sessionsCompletedToday}</div>
                <div className="text-muted xsmall fw-medium" style={{ fontSize: '0.68rem' }}>Sessions Today</div>
              </div>
            </div>

            {/* Total Focus Time */}
            <div className="col-4">
              <div className="p-3 rounded-3 bg-body-tertiary border border-subtle text-center h-100">
                <div className="p-1.5 rounded-circle bg-success-subtle text-success d-inline-flex mb-1">
                  <i className="bi bi-hourglass-split fs-6"></i>
                </div>
                <div className="fs-4 fw-extrabold text-body">{totalFocusMinutesToday}m</div>
                <div className="text-muted xsmall fw-medium" style={{ fontSize: '0.68rem' }}>Focus Time</div>
              </div>
            </div>

            {/* Daily Streak */}
            <div className="col-4">
              <div className="p-3 rounded-3 bg-body-tertiary border border-subtle text-center h-100">
                <div className="p-1.5 rounded-circle bg-warning-subtle text-warning d-inline-flex mb-1">
                  <i className="bi bi-fire fs-6"></i>
                </div>
                <div className="fs-4 fw-extrabold text-body">{streakDays} Days</div>
                <div className="text-muted xsmall fw-medium" style={{ fontSize: '0.68rem' }}>Study Streak</div>
              </div>
            </div>

          </div>

          {/* Achievement Badges Section */}
          <div className="p-3 rounded-3 bg-body-tertiary border border-subtle">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="xsmall text-muted fw-bold text-uppercase tracking-wider">
                <i className="bi bi-award-fill text-warning me-1"></i>
                Pomodoro Achievements
              </span>
              <span className="badge bg-secondary-subtle text-body border rounded-pill xsmall">
                {badges.filter(b => b.unlocked).length} / {badges.length} Unlocked
              </span>
            </div>

            <div className="row g-2">
              {badges.map((badge) => (
                <div key={badge.id} className="col-6">
                  <div className={`p-2 rounded-3 border d-flex align-items-center gap-2 transition-all ${
                    badge.unlocked 
                      ? 'bg-success-subtle border-success-subtle text-body' 
                      : 'bg-body border-subtle opacity-50 text-muted'
                  }`}>
                    <div className={`p-2 rounded-2 ${badge.unlocked ? 'bg-success text-white' : 'bg-secondary-subtle text-secondary'}`}>
                      <i className={`bi ${badge.icon} fs-6`}></i>
                    </div>
                    <div className="overflow-hidden">
                      <div className="fw-bold xsmall text-truncate" title={badge.title}>
                        {badge.title}
                      </div>
                      <div className="xsmall text-muted text-truncate" style={{ fontSize: '0.65rem' }}>
                        {badge.reqText}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Footer Note */}
      <div className="d-flex align-items-center justify-content-between pt-3 mt-4 border-top border-subtle text-muted xsmall">
        <div className="d-flex align-items-center gap-1.5">
          <i className="bi bi-shield-check text-success"></i>
          <span>Pomodoro Technique • Auto-saved locally</span>
        </div>
        <div className="fw-medium">
          Interval: Every {settings.longBreakInterval} sessions = Long Break
        </div>
      </div>

    </div>
  );
};
