import React from 'react';
import { mockTestimonials } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-5 position-relative">
      <div className="container max-w-7xl py-lg-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge rounded-pill bg-purple-subtle text-purple border border-purple-subtle px-3 py-1.5 fw-semibold mb-2" style={{ color: '#7c3aed', backgroundColor: 'rgba(124, 58, 237, 0.1)' }}>
            Student Experiences
          </span>
          <h2 className="display-6 fw-bold text-body tracking-tight mb-3">
            What Our <span className="text-gradient">Scholars Say</span>
          </h2>
          <p className="text-secondary fs-6">
            Hear directly from students across engineering, business, and sciences about Campus Companion.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="row g-4">
          {mockTestimonials.map((t) => (
            <div key={t.id} className="col-md-4">
              <div className="glass-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  {/* Star Rating */}
                  <div className="d-flex gap-1 text-warning mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill fs-6"></i>
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-body fst-italic mb-4 small lh-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="d-flex align-items-center gap-3 pt-3 border-top border-subtle">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="rounded-circle shadow-sm"
                    style={{ width: '44px', height: '44px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="fw-bold text-body mb-0 small">{t.name}</h6>
                    <div className="text-muted xsmall" style={{ fontSize: '0.75rem' }}>{t.role}</div>
                    <div className="text-primary xsmall fw-semibold" style={{ fontSize: '0.7rem' }}>{t.major}</div>
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
