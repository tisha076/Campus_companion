import React from 'react';
import { mockStats } from '../data/mockData';

export const StatsSection: React.FC = () => {
  return (
    <section id="stats" className="py-5 position-relative">
      <div className="container max-w-7xl py-lg-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-3 py-1.5 fw-semibold mb-2">
            Campus Impact & Metrics
          </span>
          <h2 className="display-6 fw-bold text-body tracking-tight mb-3">
            Trusted by <span className="text-gradient">Thousands of Scholars</span>
          </h2>
          <p className="text-secondary fs-6">
            Real-time university statistics reflecting student satisfaction, academic rigor, and campus community engagement.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="row g-4">
          {mockStats.map((stat) => (
            <div key={stat.id} className="col-sm-6 col-lg-3">
              <div className="glass-card p-4 text-center h-100 position-relative overflow-hidden">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary p-3 mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className={`bi ${stat.icon} fs-3`}></i>
                </div>

                <div className="display-5 fw-extrabold text-body tracking-tight mb-1">
                  {stat.value}<span className="text-primary">{stat.suffix}</span>
                </div>

                <div className="fw-bold text-body mb-1">{stat.label}</div>
                <div className="text-muted xsmall" style={{ fontSize: '0.8rem' }}>{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
