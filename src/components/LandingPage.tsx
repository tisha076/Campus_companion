import React, { useEffect } from 'react';
import { PageView } from '../types';
import { mockFeatures, mockStats, mockTestimonials } from '../data/mockData';
import { HeroIllustration } from './HeroIllustration';
import { RippleButton } from './RippleButton';

interface LandingPageProps {
  setActiveView: (view: PageView) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveView, showToast }) => {
  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full space-y-24 py-8">
      
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wide shadow-sm animate-pulse">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Apple-Inspired University Student Experience</span>
              <i className="bi bi-sparkles text-amber-400 ms-1" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Empowering Your <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500">
                Academic Journey
              </span>{' '}
              Effortlessly
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Campus Companion is your all-in-one digital academic ecosystem. Track real-time GPA predictions, class schedules, contactless library passes, and campus notices in a stunning glassmorphic UI.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <RippleButton
                onClick={() => {
                  setActiveView('register');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                variant="primary"
                className="w-full sm:w-auto text-base py-3.5 px-8 shadow-xl shadow-indigo-500/25"
              >
                <span>Get Started Now</span>
                <i className="bi bi-arrow-right text-lg" />
              </RippleButton>

              <RippleButton
                onClick={() => {
                  setActiveView('portal');
                  showToast('Entered Demo Student Portal for Alex Rivera', 'info');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                variant="glass"
                className="w-full sm:w-auto text-base py-3.5 px-7"
              >
                <i className="bi bi-speedometer2 text-indigo-500 text-lg" />
                <span>Explore Demo Portal</span>
              </RippleButton>
            </div>

            {/* Quick Highlights Row */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <i className="bi bi-shield-check text-emerald-500 text-base" />
                <span>Zero Backend Needed</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="bi bi-moon-stars text-indigo-500 text-base" />
                <span>Adaptive Dark Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="bi bi-phone-vibrate text-purple-500 text-base" />
                <span>100% Mobile Responsive</span>
              </div>
            </div>
          </div>

          {/* Right Hero Illustration Placeholder */}
          <div className="lg:col-span-5">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            Next-Gen Academic Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Designed for the Modern University Scholar
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base font-light">
            Every tool is engineered to remove friction from student life, combining high performance with effortless Apple-inspired aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockFeatures.map((feature) => (
            <div
              key={feature.id}
              className="glass-card p-8 flex flex-col justify-between group cursor-pointer border border-white/60 dark:border-white/10"
              onClick={() => showToast(`Module preview clicked: ${feature.title}`, 'info')}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${feature.color}`}>
                    <i className={`bi ${feature.icon}`} />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1.5 transition-transform">
                <span>Explore Module</span>
                <i className="bi bi-chevron-right ms-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STUDENT STATISTICS CARDS */}
      <section id="stats-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        <div className="glass-panel p-8 sm:p-12 border border-white/80 dark:border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockStats.map((stat, idx) => (
              <div key={idx} className="text-center sm:text-left space-y-2 p-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl mx-auto sm:mx-0 mb-3">
                  <i className={`bi ${stat.icon}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                  {stat.number}
                </div>
                <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {stat.label}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Student Feedback
          </span>
          <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white">
            Loved by Students & Faculty Alike
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-light">
            Here is what our scholars say about their daily experience with Campus Companion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockTestimonials.map((t) => (
            <div key={t.id} className="glass-card p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  {[...Array(t.rating)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill" />
                  ))}
                </div>
                <p className="text-sm italic text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{t.department}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        <div className="glass-panel p-10 sm:p-16 text-center space-y-8 bg-gradient-to-r from-indigo-900/90 via-slate-900/90 to-purple-900/90 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-mesh-gradient opacity-20 pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
              Ready to Upgrade Your Academic Companion?
            </h2>
            <p className="text-slate-300 text-base font-light">
              Join thousands of students experiencing seamless schedule management, GPA analytics, and contactless campus access today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <RippleButton
              onClick={() => {
                setActiveView('register');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              variant="primary"
              className="w-full sm:w-auto py-3.5 px-8 text-base shadow-xl"
            >
              Create Free Account
              <i className="bi bi-person-plus-fill" />
            </RippleButton>

            <RippleButton
              onClick={() => {
                setActiveView('login');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              variant="glass"
              className="w-full sm:w-auto py-3.5 px-8 text-base text-white border-white/20 hover:bg-white/10"
            >
              Log In as Student
              <i className="bi bi-box-arrow-in-right" />
            </RippleButton>
          </div>
        </div>
      </section>

    </div>
  );
};
