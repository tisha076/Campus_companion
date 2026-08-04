import React, { useState } from 'react';
import { PageView, UserProfile } from '../types';

interface RegisterPageProps {
  onRegisterSuccess: (user: UserProfile) => void;
  onNavigate: (view: PageView) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: 'Computer Science & Software Engineering',
    studentId: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'University email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid university email address.';
    }

    if (!formData.department) {
      newErrors.department = 'Department selection is required.';
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.termsAccepted) {
      newErrors.terms = 'You must accept the terms & conditions.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const newUser: UserProfile = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        studentId: formData.studentId.trim(),
        major: formData.department,
        year: 'Freshman (Year 1)',
        gpa: 3.90,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        creditsEarned: 16
      };
      onRegisterSuccess(newUser);
    }
  };

  return (
    <div className="container max-w-7xl py-5 position-relative d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="w-100 max-w-lg mx-auto">
        <div className="mb-3 text-center text-sm-start">
          <button
            onClick={() => onNavigate('landing')}
            className="btn btn-link text-body text-decoration-none p-0 d-inline-flex align-items-center gap-1.5 small fw-semibold"
          >
            <i className="bi bi-arrow-left text-primary fs-5"></i>
            <span>Back to Home</span>
          </button>
        </div>

        <div className="glass-card p-4 p-sm-5 rounded-4 shadow-lg border">
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-4 bg-gradient-accent text-white p-3 mb-3 shadow-sm" style={{ width: '56px', height: '56px' }}>
              <i className="bi bi-person-plus-fill fs-3"></i>
            </div>
            <h2 className="fw-extrabold text-body tracking-tight mb-1 fs-3">Student Registration</h2>
            <p className="text-secondary small mb-0">Create your Campus Companion student portal account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                id="regFullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              <label htmlFor="regFullName">Full Name</label>
              {errors.fullName && <div className="invalid-feedback xsmall">{errors.fullName}</div>}
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="regEmail"
                placeholder="name@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <label htmlFor="regEmail">University Email</label>
              {errors.email && <div className="invalid-feedback xsmall">{errors.email}</div>}
            </div>

            <div className="form-floating mb-3">
              <select
                className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                id="regDept"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <option value="Computer Science & Software Engineering">Computer Science & Software Engineering</option>
                <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
                <option value="Business Administration & Finance">Business Administration & Finance</option>
                <option value="Biomedical Sciences & Biotechnology">Biomedical Sciences & Biotechnology</option>
              </select>
              <label htmlFor="regDept">Department / Major</label>
              {errors.department && <div className="invalid-feedback xsmall">{errors.department}</div>}
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${errors.studentId ? 'is-invalid' : ''}`}
                id="regStudentId"
                placeholder="Student ID"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              />
              <label htmlFor="regStudentId">Student ID Number</label>
              {errors.studentId && <div className="invalid-feedback xsmall">{errors.studentId}</div>}
            </div>

            <div className="row g-2 mb-3">
              <div className="col-12 col-sm-6">
                <div className="form-floating position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control pe-5 ${errors.password ? 'is-invalid' : ''}`}
                    id="regPassword"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <label htmlFor="regPassword">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-link text-secondary position-absolute top-50 end-0 translate-middle-y me-2 p-1 text-decoration-none z-3"
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                  </button>
                  {errors.password && <div className="invalid-feedback xsmall">{errors.password}</div>}
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="form-floating position-relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`form-control pe-5 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="regConfirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  <label htmlFor="regConfirmPassword">Confirm Password</label>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="btn btn-link text-secondary position-absolute top-50 end-0 translate-middle-y me-2 p-1 text-decoration-none z-3"
                  >
                    <i className={`bi ${showConfirmPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                  </button>
                  {errors.confirmPassword && <div className="invalid-feedback xsmall">{errors.confirmPassword}</div>}
                </div>
              </div>
            </div>

            <div className="form-check mb-4 small">
              <input
                className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                type="checkbox"
                id="termsAccepted"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
              />
              <label className="form-check-label text-secondary" htmlFor="termsAccepted">
                I accept the university student terms and portal policy
              </label>
              {errors.terms && <div className="invalid-feedback d-block xsmall">{errors.terms}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg rounded-pill w-100 fw-bold bg-gradient-accent border-0 py-3 mb-3 shadow-md"
            >
              Create Account
            </button>
          </form>

          <div className="text-center text-secondary small">
            <span>Already registered? </span>
            <button
              onClick={() => onNavigate('login')}
              className="btn btn-link text-primary p-0 text-decoration-none fw-bold ms-1"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
