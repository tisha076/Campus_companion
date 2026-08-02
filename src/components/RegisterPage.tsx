import React, { useState } from 'react';
import { PageView, UserProfile } from '../types';
import { createRipple } from '../utils/ripple';

interface RegisterPageProps {
  onRegisterSuccess: (user: UserProfile) => void;
  onNavigate: (view: PageView) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: 'Computer Science & Software Engineering',
    year: 'Freshman (Year 1)',
    semester: 'Fall 2026',
    studentId: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<UserProfile | null>(null);

  // Email format regex
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Student ID regex (allows alphanumeric formats like STU-2026-1029 or 8+ digit numbers)
  const validateStudentId = (id: string) => {
    return id.trim().length >= 4;
  };

  // Password Security Calculations
  const getPasswordMetrics = (pass: string) => {
    const hasMinLength = pass.length >= 8;
    const hasUppercase = /[A-Z]/.test(pass);
    const hasLowercase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[^A-Za-z0-9]/.test(pass);

    let score = 0;
    if (hasMinLength) score += 20;
    if (hasUppercase) score += 20;
    if (hasLowercase) score += 20;
    if (hasNumber) score += 20;
    if (hasSpecial) score += 20;

    let label = 'Weak';
    let color = '#ef4444'; // Red
    if (score >= 80) {
      label = 'Strong & Secure';
      color = '#10b981'; // Green
    } else if (score >= 60) {
      label = 'Good';
      color = '#3b82f6'; // Blue
    } else if (score >= 40) {
      label = 'Fair';
      color = '#f59e0b'; // Amber
    }

    return {
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial,
      score,
      label,
      color,
    };
  };

  const passMetrics = getPasswordMetrics(formData.password);

  // Validate Step 1
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().split(' ').length < 2) {
      newErrors.fullName = 'Please enter both first and last name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'University email address is required.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid university email address (e.g. name@university.edu).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.department) {
      newErrors.department = 'Please select your department / major.';
    }

    if (!formData.year) {
      newErrors.year = 'Please select your academic year.';
    }

    if (!formData.semester) {
      newErrors.semester = 'Please select your current semester.';
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required.';
    } else if (!validateStudentId(formData.studentId)) {
      newErrors.studentId = 'Please enter a valid Student ID format (e.g. STU-2026-1029).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 3
  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else {
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters.';
      } else if (!passMetrics.hasUppercase || !passMetrics.hasLowercase || !passMetrics.hasNumber || !passMetrics.hasSpecial) {
        newErrors.password = 'Password must meet all security requirements listed below.';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.termsAccepted) {
      newErrors.terms = 'You must accept the student terms & conditions to proceed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Step Advancement
  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
      }
    }
  };

  // Handle Step Backwards
  const handlePrevStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    setErrors({});
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle Registration Final Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep !== 3) return;

    if (!validateStep3()) return;

    const newUser: UserProfile = {
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      studentId: formData.studentId.trim(),
      major: formData.department,
      year: `${formData.year} (${formData.semester})`,
      gpa: 4.00,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80`,
      creditsEarned: 0
    };

    setRegisteredUser(newUser);
    setShowSuccessModal(true);
  };

  // Progress Bar Percentage
  const progressPercent = currentStep === 1 ? 33.3 : currentStep === 2 ? 66.6 : 100;

  return (
    <div className="container max-w-7xl py-5 position-relative d-flex align-items-center justify-content-center" style={{ minHeight: '85vh' }}>
      <div className="w-100 max-w-2xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-3 text-center text-sm-start d-flex justify-content-between align-items-center">
          <button
            onClick={() => onNavigate('landing')}
            className="btn btn-link text-body text-decoration-none p-0 d-inline-flex align-items-center gap-1.5 small fw-semibold"
          >
            <i className="bi bi-arrow-left text-primary fs-5"></i>
            <span>Back to Home</span>
          </button>
          
          <div className="xsmall text-muted fw-bold">
            Step {currentStep} of 3
          </div>
        </div>

        {/* Glass Card Registration Wizard Container */}
        <div className="glass-card p-4 p-sm-5 rounded-4 shadow-lg border position-relative overflow-hidden">
          
          {/* Header Bar */}
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-4 bg-gradient-accent text-white p-3 mb-3 shadow-sm floating-element" style={{ width: '56px', height: '56px' }}>
              <i className="bi bi-person-badge-fill fs-3"></i>
            </div>
            <h2 className="fw-extrabold text-body tracking-tight mb-1 fs-3">Student Registration Wizard</h2>
            <p className="text-secondary small mb-0">Join Campus Companion in 3 quick, structured steps</p>
          </div>

          {/* Step Progress Indicators & Bar */}
          <div className="mb-4">
            {/* Top Progress Track */}
            <div className="progress rounded-pill bg-body-tertiary mb-3 border border-subtle" style={{ height: '8px' }}>
              <div 
                className="progress-bar bg-gradient-accent rounded-pill transition-all"
                style={{ width: `${progressPercent}%`, transition: 'width 0.4s ease-in-out' }}
              ></div>
            </div>

            {/* Numbered Step Circles */}
            <div className="d-flex align-items-center justify-content-between px-2 position-relative">
              
              {/* Step 1 Indicator */}
              <div className="d-flex flex-column align-items-center text-center z-1">
                <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold transition-all ${
                  currentStep > 1 
                    ? 'bg-success text-white shadow-sm' 
                    : currentStep === 1 
                    ? 'bg-gradient-accent text-white shadow-md scale-110' 
                    : 'bg-body-tertiary text-muted border border-subtle'
                }`} style={{ width: '38px', height: '38px', fontSize: '0.9rem' }}>
                  {currentStep > 1 ? <i className="bi bi-check-lg fs-5"></i> : '1'}
                </div>
                <span className={`xsmall mt-1.5 fw-bold ${currentStep === 1 ? 'text-primary' : currentStep > 1 ? 'text-success' : 'text-muted'}`}>
                  Basic Info
                </span>
              </div>

              {/* Step 2 Indicator */}
              <div className="d-flex flex-column align-items-center text-center z-1">
                <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold transition-all ${
                  currentStep > 2 
                    ? 'bg-success text-white shadow-sm' 
                    : currentStep === 2 
                    ? 'bg-gradient-accent text-white shadow-md scale-110' 
                    : 'bg-body-tertiary text-muted border border-subtle'
                }`} style={{ width: '38px', height: '38px', fontSize: '0.9rem' }}>
                  {currentStep > 2 ? <i className="bi bi-check-lg fs-5"></i> : '2'}
                </div>
                <span className={`xsmall mt-1.5 fw-bold ${currentStep === 2 ? 'text-primary' : currentStep > 2 ? 'text-success' : 'text-muted'}`}>
                  Academic Info
                </span>
              </div>

              {/* Step 3 Indicator */}
              <div className="d-flex flex-column align-items-center text-center z-1">
                <div className={`rounded-circle d-flex align-items-center justify-content-center fw-bold transition-all ${
                  currentStep === 3 
                    ? 'bg-gradient-accent text-white shadow-md scale-110' 
                    : 'bg-body-tertiary text-muted border border-subtle'
                }`} style={{ width: '38px', height: '38px', fontSize: '0.9rem' }}>
                  3
                </div>
                <span className={`xsmall mt-1.5 fw-bold ${currentStep === 3 ? 'text-primary' : 'text-muted'}`}>
                  Security
                </span>
              </div>

            </div>
          </div>

          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: Basic Credentials */}
            {currentStep === 1 && (
              <div className="animate-fade-in" key="step-1">
                <div className="p-3 mb-4 rounded-3 bg-primary-subtle border border-primary-subtle text-body d-flex align-items-center gap-2">
                  <i className="bi bi-info-circle-fill text-primary fs-5"></i>
                  <span className="xsmall fw-medium">Step 1: Enter your official full name and active university email address.</span>
                </div>

                {/* Full Name Input */}
                <div className="mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                      id="fullName"
                      placeholder="e.g. Alex Johnson"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                    />
                    <label htmlFor="fullName">Full Name (First & Last Name)</label>
                    {errors.fullName && <div className="invalid-feedback xsmall">{errors.fullName}</div>}
                  </div>
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <div className="form-floating">
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="universityEmail"
                      placeholder="alex.johnson@university.edu"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                    />
                    <label htmlFor="universityEmail">University Email Address</label>
                    {errors.email && <div className="invalid-feedback xsmall">{errors.email}</div>}
                  </div>
                  <div className="form-text xsmall text-muted mt-1">
                    Must be your assigned campus email ending in .edu or university domain.
                  </div>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn btn-primary btn-lg rounded-pill w-100 fw-bold bg-gradient-accent border-0 py-3 btn-ripple shadow-md d-flex align-items-center justify-content-center gap-2"
                >
                  <span>Continue to Academic Info</span>
                  <i className="bi bi-arrow-right-circle-fill fs-5"></i>
                </button>
              </div>
            )}

            {/* STEP 2: Academic Information */}
            {currentStep === 2 && (
              <div className="animate-fade-in" key="step-2">
                <div className="p-3 mb-4 rounded-3 bg-primary-subtle border border-primary-subtle text-body d-flex align-items-center gap-2">
                  <i className="bi bi-mortarboard-fill text-primary fs-5"></i>
                  <span className="xsmall fw-medium">Step 2: Select your academic department, current standing, and student ID.</span>
                </div>

                {/* Department / Major Dropdown */}
                <div className="mb-3">
                  <div className="form-floating">
                    <select
                      className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                      id="departmentSelect"
                      value={formData.department}
                      onChange={(e) => {
                        setFormData({ ...formData, department: e.target.value });
                        if (errors.department) setErrors({ ...errors, department: '' });
                      }}
                    >
                      <option value="Computer Science & Software Engineering">Computer Science & Software Engineering</option>
                      <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                      <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
                      <option value="Business Administration & Finance">Business Administration & Finance</option>
                      <option value="Biomedical Sciences & Biotechnology">Biomedical Sciences & Biotechnology</option>
                      <option value="Mechanical & Aerospace Engineering">Mechanical & Aerospace Engineering</option>
                    </select>
                    <label htmlFor="departmentSelect">Department / Major</label>
                    {errors.department && <div className="invalid-feedback xsmall">{errors.department}</div>}
                  </div>
                </div>

                {/* Year & Semester Grid */}
                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <select
                        className={`form-select ${errors.year ? 'is-invalid' : ''}`}
                        id="yearSelect"
                        value={formData.year}
                        onChange={(e) => {
                          setFormData({ ...formData, year: e.target.value });
                          if (errors.year) setErrors({ ...errors, year: '' });
                        }}
                      >
                        <option value="Freshman (Year 1)">Freshman (Year 1)</option>
                        <option value="Sophomore (Year 2)">Sophomore (Year 2)</option>
                        <option value="Junior (Year 3)">Junior (Year 3)</option>
                        <option value="Senior (Year 4)">Senior (Year 4)</option>
                        <option value="Graduate / Master's">Graduate / Master's</option>
                      </select>
                      <label htmlFor="yearSelect">Academic Standing</label>
                      {errors.year && <div className="invalid-feedback xsmall">{errors.year}</div>}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-floating">
                      <select
                        className={`form-select ${errors.semester ? 'is-invalid' : ''}`}
                        id="semesterSelect"
                        value={formData.semester}
                        onChange={(e) => {
                          setFormData({ ...formData, semester: e.target.value });
                          if (errors.semester) setErrors({ ...errors, semester: '' });
                        }}
                      >
                        <option value="Fall 2026">Fall 2026</option>
                        <option value="Spring 2026">Spring 2026</option>
                        <option value="Summer 2026">Summer 2026</option>
                        <option value="Fall 2025">Fall 2025</option>
                      </select>
                      <label htmlFor="semesterSelect">Current Semester</label>
                      {errors.semester && <div className="invalid-feedback xsmall">{errors.semester}</div>}
                    </div>
                  </div>
                </div>

                {/* Student ID */}
                <div className="mb-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${errors.studentId ? 'is-invalid' : ''}`}
                      id="studentId"
                      placeholder="STU-2026-1029"
                      value={formData.studentId}
                      onChange={(e) => {
                        setFormData({ ...formData, studentId: e.target.value });
                        if (errors.studentId) setErrors({ ...errors, studentId: '' });
                      }}
                    />
                    <label htmlFor="studentId">Student ID Number</label>
                    {errors.studentId && <div className="invalid-feedback xsmall">{errors.studentId}</div>}
                  </div>
                  <div className="form-text xsmall text-muted mt-1">
                    Provided on your student ID badge (e.g. STU-2026-1029)
                  </div>
                </div>

                {/* Button Action Bar */}
                <div className="d-flex align-items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn btn-outline-secondary btn-lg rounded-pill px-4 fw-bold py-3"
                  >
                    <i className="bi bi-arrow-left me-1"></i>
                    <span>Previous</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn btn-primary btn-lg rounded-pill flex-grow-1 fw-bold bg-gradient-accent border-0 py-3 btn-ripple shadow-md d-flex align-items-center justify-content-center gap-2"
                  >
                    <span>Continue to Security</span>
                    <i className="bi bi-arrow-right-circle-fill fs-5"></i>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Password & Security */}
            {currentStep === 3 && (
              <div className="animate-fade-in" key="step-3">
                <div className="p-3 mb-4 rounded-3 bg-primary-subtle border border-primary-subtle text-body d-flex align-items-center gap-2">
                  <i className="bi bi-shield-lock-fill text-primary fs-5"></i>
                  <span className="xsmall fw-medium">Step 3: Create a secure password and accept portal terms to finalize.</span>
                </div>

                {/* Password Input with Show/Hide Toggle */}
                <div className="mb-3 position-relative">
                  <div className="form-floating">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control pe-5 ${errors.password ? 'is-invalid' : ''}`}
                      id="wizardPassword"
                      placeholder="Create Password"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        if (errors.password) setErrors({ ...errors, password: '' });
                      }}
                    />
                    <label htmlFor="wizardPassword">Create Password</label>
                    {errors.password && <div className="invalid-feedback xsmall">{errors.password}</div>}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-link text-secondary position-absolute top-50 end-0 translate-middle-y me-3 text-decoration-none z-3"
                    style={{ marginTop: errors.password ? '-10px' : '0' }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} fs-5`}></i>
                  </button>
                </div>

                {/* Confirm Password Input with Show/Hide Toggle */}
                <div className="mb-3 position-relative">
                  <div className="form-floating">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`form-control pe-5 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id="wizardConfirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        setFormData({ ...formData, confirmPassword: e.target.value });
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                      }}
                    />
                    <label htmlFor="wizardConfirmPassword">Confirm Password</label>
                    {errors.confirmPassword && <div className="invalid-feedback xsmall">{errors.confirmPassword}</div>}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="btn btn-link text-secondary position-absolute top-50 end-0 translate-middle-y me-3 text-decoration-none z-3"
                    style={{ marginTop: errors.confirmPassword ? '-10px' : '0' }}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    <i className={`bi ${showConfirmPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} fs-5`}></i>
                  </button>
                </div>

                {/* Interactive Password Strength Meter & Requirement Checklist */}
                {formData.password && (
                  <div className="p-3 mb-3 rounded-3 bg-body-tertiary border border-subtle">
                    <div className="d-flex justify-content-between align-items-center mb-1.5 xsmall">
                      <span className="fw-semibold text-body">Password Security Index:</span>
                      <span className="fw-bold" style={{ color: passMetrics.color }}>{passMetrics.label}</span>
                    </div>
                    
                    {/* Animated Progress Bar */}
                    <div className="progress rounded-pill bg-body mb-2" style={{ height: '6px' }}>
                      <div
                        className="progress-bar rounded-pill"
                        style={{ width: `${passMetrics.score}%`, backgroundColor: passMetrics.color, transition: 'all 0.3s ease' }}
                      ></div>
                    </div>

                    {/* Requirements Checklist */}
                    <div className="row g-1 text-muted xsmall" style={{ fontSize: '0.73rem' }}>
                      <div className={`col-6 ${passMetrics.hasMinLength ? 'text-success fw-bold' : ''}`}>
                        <i className={`bi ${passMetrics.hasMinLength ? 'bi-check-circle-fill' : 'bi-circle'} me-1`}></i> Min. 8 Characters
                      </div>
                      <div className={`col-6 ${passMetrics.hasUppercase ? 'text-success fw-bold' : ''}`}>
                        <i className={`bi ${passMetrics.hasUppercase ? 'bi-check-circle-fill' : 'bi-circle'} me-1`}></i> Uppercase Letter
                      </div>
                      <div className={`col-6 ${passMetrics.hasLowercase ? 'text-success fw-bold' : ''}`}>
                        <i className={`bi ${passMetrics.hasLowercase ? 'bi-check-circle-fill' : 'bi-circle'} me-1`}></i> Lowercase Letter
                      </div>
                      <div className={`col-6 ${passMetrics.hasNumber ? 'text-success fw-bold' : ''}`}>
                        <i className={`bi ${passMetrics.hasNumber ? 'bi-check-circle-fill' : 'bi-circle'} me-1`}></i> Number Included
                      </div>
                      <div className={`col-12 ${passMetrics.hasSpecial ? 'text-success fw-bold' : ''}`}>
                        <i className={`bi ${passMetrics.hasSpecial ? 'bi-check-circle-fill' : 'bi-circle'} me-1`}></i> Special Character (!@#$%^&*)
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms & Conditions Checkbox */}
                <div className="form-check mb-4 small mt-3">
                  <input
                    className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                    type="checkbox"
                    id="termsCheck"
                    checked={formData.termsAccepted}
                    onChange={(e) => {
                      setFormData({ ...formData, termsAccepted: e.target.checked });
                      if (errors.terms) setErrors({ ...errors, terms: '' });
                    }}
                  />
                  <label className="form-check-label text-secondary" htmlFor="termsCheck">
                    I accept the <a href="#" className="text-primary text-decoration-none fw-semibold">Student Honor Code</a> and <a href="#" className="text-primary text-decoration-none fw-semibold">Campus Portal Terms of Service</a>.
                  </label>
                  {errors.terms && <div className="invalid-feedback d-block xsmall mt-1">{errors.terms}</div>}
                </div>

                {/* Final Action Bar */}
                <div className="d-flex align-items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn btn-outline-secondary btn-lg rounded-pill px-4 fw-bold py-3"
                  >
                    <i className="bi bi-arrow-left me-1"></i>
                    <span>Previous</span>
                  </button>

                  <button
                    type="submit"
                    onClick={(e) => createRipple(e)}
                    className="btn btn-primary btn-lg rounded-pill flex-grow-1 fw-bold bg-gradient-accent border-0 py-3 btn-ripple shadow-md d-flex align-items-center justify-content-center gap-2"
                  >
                    <span>Create Account</span>
                    <i className="bi bi-patch-check-fill fs-5"></i>
                  </button>
                </div>
              </div>
            )}

          </form>

          {/* Login Option */}
          <div className="text-center text-secondary small mt-4 pt-3 border-top border-subtle">
            <span>Already have a campus account? </span>
            <button
              onClick={() => onNavigate('login')}
              className="btn btn-link text-primary p-0 text-decoration-none fw-bold ms-1"
            >
              Sign In Here
            </button>
          </div>
        </div>
      </div>

      {/* Animated Success Modal / Celebration Popup */}
      {showSuccessModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(10px)' }}>
          <div className="modal-dialog modal-dialog-centered max-w-md">
            <div className="modal-content glass-modal border-0 p-4 text-center">
              <div className="modal-body py-4">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success-subtle text-success p-3 mb-3 floating-element" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-patch-check-fill display-4"></i>
                </div>
                <h3 className="fw-extrabold text-body mb-2">Registration Complete!</h3>
                <p className="text-secondary small mb-4">
                  Welcome to Campus Companion, <strong className="text-body">{registeredUser?.name}</strong>. Your student account has been generated with ID <span className="badge bg-primary-subtle text-primary border border-primary-subtle">{registeredUser?.studentId}</span>.
                </p>

                <div className="d-flex flex-column gap-2">
                  <button
                    onClick={() => {
                      if (registeredUser) onRegisterSuccess(registeredUser);
                    }}
                    className="btn btn-primary btn-lg rounded-pill bg-gradient-accent border-0 fw-bold py-2.5 btn-ripple shadow-sm"
                  >
                    Go to Portal Dashboard
                  </button>
                  <button
                    onClick={() => onNavigate('login')}
                    className="btn btn-light rounded-pill py-2 text-secondary small"
                  >
                    Go to Login Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
