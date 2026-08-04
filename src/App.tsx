import React, { useState, useEffect } from 'react';
import { PageView, UserProfile } from './types';
import { initialUserProfile } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { StatsSection } from './components/StatsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardPage } from './components/DashboardPage';
import { RoutinePage } from './components/RoutinePage';
import { AssignmentsPage } from './components/AssignmentsPage';
import { AttendancePage } from './components/AttendancePage';
import { CgpaPage } from './components/CgpaPage';
import { NotesPage } from './components/NotesPage';
import { ProfilePage } from './components/ProfilePage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('landing');
  const [user, setUser] = useState<UserProfile | null>(initialUserProfile);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply Dark Mode Theme attribute
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.setAttribute('data-bs-theme', 'light');
    }
  }, [darkMode]);

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterSuccess = (newUser: UserProfile) => {
    setUser(newUser);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-vh-100 d-flex flex-column position-relative">
      {/* Sticky Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-grow-1">
        {(currentView === 'landing' || currentView === 'home') && (
          <>
            <HeroSection onNavigate={setCurrentView} />
            <FeaturesSection onNavigate={setCurrentView} />
            <StatsSection />
            <TestimonialsSection />
          </>
        )}

        {currentView === 'login' && (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'register' && (
          <RegisterPage
            onRegisterSuccess={handleRegisterSuccess}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'dashboard' && (
          user ? (
            <DashboardPage user={user} onNavigate={setCurrentView} />
          ) : (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onNavigate={setCurrentView}
            />
          )
        )}

        {currentView === 'routine' && <RoutinePage />}

        {currentView === 'assignments' && <AssignmentsPage />}

        {currentView === 'attendance' && <AttendancePage />}

        {currentView === 'cgpa' && <CgpaPage />}

        {currentView === 'notes' && <NotesPage />}

        {currentView === 'profile' && (
          user ? (
            <ProfilePage user={user} onUpdateUser={(updated) => setUser(updated)} />
          ) : (
            <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={setCurrentView} />
          )
        )}

        {currentView === 'about' && <AboutPage />}

        {currentView === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentView} />
    </div>
  );
}
