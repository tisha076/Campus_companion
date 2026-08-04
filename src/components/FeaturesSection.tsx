import React from 'react';
import { mockFeatures } from '../data/mockData';
import { PageView } from '../types';

interface FeaturesSectionProps {
  onNavigate?: (view: PageView) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onNavigate }) => {
  return (
    <section id="features" className="py-5 position-relative">
      <div className="container max-w-7xl py-lg-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle px-3 py-1.5 fw-semibold mb-2">
            Portal Navigation & Modules
          </span>
          <h2 className="display-6 fw-bold text-body tracking-tight mb-3">
            Explore <span className="text-gradient">Campus Companion Modules</span>
          </h2>
          <p className="text-secondary fs-6">
            Direct access to all active student modules: schedule, task manager, calculators, study notes, and personal student record.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="row g-4">
          {mockFeatures.map((feature) => (
            <div key={feature.id} className="col-12 col-md-6 col-lg-4">
              <div 
                className="glass-card p-4 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden cursor-pointer hover-lift transition-all"
                onClick={() => onNavigate && onNavigate(feature.targetView)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && onNavigate) {
                    e.preventDefault();
                    onNavigate(feature.targetView);
                  }
                }}
              >
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-inline-flex align-items-center justify-content-center rounded-3 bg-gradient-accent text-white p-3 shadow-sm" style={{ width: '52px', height: '52px' }}>
                      <i className={`bi ${feature.icon} fs-4`}></i>
                    </div>
                    {feature.badge && (
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1 text-uppercase fw-bold" style={{ fontSize: '0.65rem' }}>
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="h5 fw-bold text-body mb-2">{feature.title}</h3>
                  <p className="text-secondary small mb-0 lh-relaxed">{feature.description}</p>
                </div>

                <div className="pt-3 mt-4 border-top border-subtle d-flex align-items-center justify-content-between text-primary fw-semibold small">
                  <span>{feature.buttonText || 'Explore Module'}</span>
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle p-1.5 ms-2">
                    <i className="bi bi-arrow-right fs-6"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
