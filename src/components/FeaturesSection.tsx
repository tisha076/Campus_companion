import React from 'react';
import { mockFeatures } from '../data/mockData';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-5 position-relative">
      <div className="container max-w-7xl py-lg-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle px-3 py-1.5 fw-semibold mb-2">
            Features & Capabilities
          </span>
          <h2 className="display-6 fw-bold text-body tracking-tight mb-3">
            Designed for the <span className="text-gradient">Modern Student Workflow</span>
          </h2>
          <p className="text-secondary fs-6">
            Everything you need to navigate your university lifecycle with confidence, precision, and Apple-grade elegance.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="row g-4">
          {mockFeatures.map((feature) => (
            <div key={feature.id} className="col-md-6 col-lg-4">
              <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden">
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

                <div className="pt-3 mt-3 border-top border-subtle d-flex align-items-center gap-2 text-primary fw-semibold small">
                  <span>Explore module</span>
                  <i className="bi bi-chevron-right small"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
