import React, { useState, useEffect } from 'react';
import { PageView, ToastMessage } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { ToastContainer } from './components/Toast';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { StudentPortal } from './components/StudentPortal';

export default function App() {
  const [activeView, setActiveView] = useState<PageView>('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [studentName, setStudentName] = useState('Alex Rivera');
  const [studentEmail, setStudentEmail] = useState('alex.rivera@university.edu');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply dark/light theme class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const newToast: ToastMessage = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLoginSuccess = (email: string) => {
    setIsLoggedIn(true);
    setStudentEmail(email);
    if (email.includes('alex')) {
      setStudentName('Alex Rivera');
    } else {
      const nameFromEmail = email.split('@')[0].replace('.', ' ');
      setStudentName(nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));
    }
  };

  const handleRegisterSuccess = (name: string, email: string) => {
    setIsLoggedIn(true);
    setStudentName(name);
    setStudentEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showToast('Logged out of demo student session.', 'info');
    setActiveView('landing');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-indigo-500 selection:text-white">
      
      {/* Loading Screen Overlay */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      {/* Background Soft Mesh Gradient Orbs */}
      <div className="bg-mesh-gradient" aria-hidden="true">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
      </div>

      {/* Sticky Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Main Page View Renderer */}
      <main className="flex-1 w-full">
        {activeView === 'landing' && (
          <LandingPage setActiveView={setActiveView} showToast={showToast} />
        )}

        {activeView === 'login' && (
          <LoginPage
            setActiveView={setActiveView}
            onLoginSuccess={handleLoginSuccess}
            showToast={showToast}
          />
        )}

        {activeView === 'register' && (
          <RegisterPage
            setActiveView={setActiveView}
            onRegisterSuccess={handleRegisterSuccess}
            showToast={showToast}
          />
        )}

        {activeView === 'portal' && (
          <StudentPortal
            studentName={studentName}
            showToast={showToast}
          />
        )}
      </main>

      {/* Glassmorphic Footer */}
      <Footer setActiveView={setActiveView} showToast={showToast} />

      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
