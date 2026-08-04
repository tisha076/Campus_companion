import React, { useState } from 'react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Computer Science & Software Engineering',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'University email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message content is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="container max-w-7xl py-4 py-lg-5">
      {/* Banner */}
      <div className="glass-card p-4 rounded-4 border mb-4">
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold mb-2 d-inline-block">
          Student Support & Helpdesk
        </span>
        <h1 className="h3 fw-extrabold text-body mb-1">Contact Campus Support</h1>
        <p className="text-secondary small mb-0">Have questions about registration, grades, or portal access? Send an inquiry below.</p>
      </div>

      <div className="row g-4">
        {/* Contact Form */}
        <div className="col-lg-7">
          <div className="glass-card p-4 rounded-4 border">
            {submitted ? (
              <div className="p-4 text-center">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success-subtle text-success p-3 mb-3">
                  <i className="bi bi-check-circle-fill display-5"></i>
                </div>
                <h3 className="h5 fw-bold text-body mb-2">Message Sent Successfully!</h3>
                <p className="text-secondary small mb-4">
                  Thank you for contacting student support. A representative will respond to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', department: 'Computer Science & Software Engineering', subject: '', message: '' });
                  }}
                  className="btn btn-outline-primary rounded-pill px-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="h5 fw-bold text-body mb-3">Send an Inquiry</h2>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label xsmall text-muted mb-1">Your Name</label>
                    <input
                      type="text"
                      className={`form-control rounded-3 ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <div className="invalid-feedback xsmall">{errors.name}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label xsmall text-muted mb-1">University Email</label>
                    <input
                      type="email"
                      className={`form-control rounded-3 ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="alex@university.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <div className="invalid-feedback xsmall">{errors.email}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label xsmall text-muted mb-1">Department</label>
                  <select
                    className="form-select rounded-3"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option value="Computer Science & Software Engineering">Computer Science & Software Engineering</option>
                    <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
                    <option value="Business Administration & Finance">Business Administration & Finance</option>
                    <option value="General University Registrar">General University Registrar</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label xsmall text-muted mb-1">Subject</label>
                  <input
                    type="text"
                    className={`form-control rounded-3 ${errors.subject ? 'is-invalid' : ''}`}
                    placeholder="e.g. Course Add/Drop Query"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                  {errors.subject && <div className="invalid-feedback xsmall">{errors.subject}</div>}
                </div>

                <div className="mb-4">
                  <label className="form-label xsmall text-muted mb-1">Message Details</label>
                  <textarea
                    className={`form-control rounded-3 ${errors.message ? 'is-invalid' : ''}`}
                    rows={4}
                    placeholder="Please explain your question or issue in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                  {errors.message && <div className="invalid-feedback xsmall">{errors.message}</div>}
                </div>

                <button type="submit" className="btn btn-primary rounded-pill bg-gradient-accent border-0 px-4 fw-bold">
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Information Sidebar */}
        <div className="col-lg-5">
          <div className="glass-card p-4 rounded-4 border">
            <h2 className="h5 fw-bold text-body mb-3">Campus Helpdesk Info</h2>

            <div className="d-flex align-items-start gap-3 mb-3">
              <div className="p-2.5 rounded-3 bg-primary-subtle text-primary">
                <i className="bi bi-geo-alt-fill fs-5"></i>
              </div>
              <div>
                <strong className="d-block small text-body">Student Services Center</strong>
                <span className="text-secondary xsmall">Building 4, Room 102, Main Campus</span>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3 mb-3">
              <div className="p-2.5 rounded-3 bg-success-subtle text-success">
                <i className="bi bi-telephone-fill fs-5"></i>
              </div>
              <div>
                <strong className="d-block small text-body">Support Line</strong>
                <span className="text-secondary xsmall">+1 (800) 555-CAMPUS</span>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3">
              <div className="p-2.5 rounded-3 bg-info-subtle text-info">
                <i className="bi bi-clock-fill fs-5"></i>
              </div>
              <div>
                <strong className="d-block small text-body">Operating Hours</strong>
                <span className="text-secondary xsmall">Monday – Friday: 8:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
