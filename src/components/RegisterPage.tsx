import React, { useState } from 'react';
import { PageView, PasswordStrength } from '../types';
import { RippleButton } from './RippleButton';

interface RegisterPageProps {
  setActiveView: (view: PageView) => void;
  onRegisterSuccess: (name: string, email: string) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  setActiveView,
  onRegisterSuccess,
  showToast,
}) => {
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    email: '',
    department: 'School of Computing & Data Science',
    major: 'B.Sc. Software Engineering',
    yearLevel: 'Senior (Year 4)',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [assignedStudentId, setAssignedStudentId] = useState('');

  // Password Strength Calculator
  const getPasswordStrength = (pass: string): PasswordStrength => {
    if (!pass) {
      return { score: 0, label: 'Very Weak', color: 'bg-slate-300 dark:bg-slate-700', percent: 0 };
    }
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', color: 'bg-rose-500', percent: 25 };
      case 2:
        return { score: 2, label: 'Fair', color: 'bg-amber-500', percent: 50 };
      case 3:
        return { score: 3, label: 'Strong', color: 'bg-blue-500', percent: 75 };
      case 4:
        return { score: 4, label: 'Extremely Secure', color: 'bg-emerald-500', percent: 100 };
      default:
        return { score: 0, label: 'Very Weak', color: 'bg-rose-400', percent: 15 };
    }
  };

  const strength = getPasswordStrength(formData.password);

  // Field validation checks
  const isFirstNameValid = formData.firstName.trim().length >= 2;
  const isLastNameValid = formData.lastName.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isStudentIdValid = /^\d{4}-\d{4}$/.test(formData.studentId) || formData.studentId.length >= 6;
  const isPasswordValid = strength.score >= 2;
  const isConfirmMatch = formData.confirmPassword === formData.password && formData.confirmPassword.length > 0;
  const isFormValid =
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isStudentIdValid &&
    isPasswordValid &&
    isConfirmMatch &&
    formData.agreeTerms;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      showToast('Please correct form errors before submitting.', 'warning');
      return;
    }

    const tempId = `2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setAssignedStudentId(tempId);
    setShowSuccessModal(true);
    showToast('Account creation verified successfully!', 'success');
  };

  const handleProceedToPortal = () => {
    onRegisterSuccess(`${formData.firstName} ${formData.lastName}`, formData.email);
    setShowSuccessModal(false);
    setActiveView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Container Glass Panel */}
      <div className="glass-panel p-8 sm:p-12 border border-white/80 dark:border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Top Mesh Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

        {/* Page Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 mx-auto flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-500/20 mb-3">
            <i className="bi bi-person-plus-fill" />
          </div>
          <h2 className="text-3xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Student Portal Registration
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
            Create your unified Campus Companion profile. Fast, secure, and instant authentication.
          </p>
        </div>

        {/* Form Body - Multi Column Grid */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECTION 1: PERSONAL & ACADEMIC DETAILS */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
              <i className="bi bi-person-vcard text-base" />
              1. Personal & Academic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* First Name */}
              <div className="floating-label-group mb-0">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder=" "
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('firstName')}
                  className={`glass-input floating-input ${
                    touched.firstName && !isFirstNameValid ? 'border-rose-500 focus:border-rose-500' : ''
                  }`}
                  required
                />
                <label htmlFor="firstName" className="floating-label">First Name</label>
                {touched.firstName && !isFirstNameValid && (
                  <p className="text-[10px] text-rose-500 font-medium mt-1">First name requires at least 2 characters.</p>
                )}
              </div>

              {/* Last Name */}
              <div className="floating-label-group mb-0">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder=" "
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('lastName')}
                  className={`glass-input floating-input ${
                    touched.lastName && !isLastNameValid ? 'border-rose-500 focus:border-rose-500' : ''
                  }`}
                  required
                />
                <label htmlFor="lastName" className="floating-label">Last Name</label>
                {touched.lastName && !isLastNameValid && (
                  <p className="text-[10px] text-rose-500 font-medium mt-1">Last name requires at least 2 characters.</p>
                )}
              </div>

              {/* Student ID */}
              <div className="floating-label-group mb-0">
                <input
                  type="text"
                  name="studentId"
                  id="studentId"
                  placeholder=" "
                  value={formData.studentId}
                  onChange={handleChange}
                  onBlur={() => handleBlur('studentId')}
                  className="glass-input floating-input"
                  required
                />
                <label htmlFor="studentId" className="floating-label">Student ID (e.g. 2026-8849)</label>
              </div>

              {/* University Email */}
              <div className="floating-label-group mb-0">
                <input
                  type="email"
                  name="email"
                  id="regEmail"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  className={`glass-input floating-input ${
                    touched.email && !isEmailValid ? 'border-rose-500 focus:border-rose-500' : ''
                  }`}
                  required
                />
                <label htmlFor="regEmail" className="floating-label">University Email</label>
                {touched.email && !isEmailValid && (
                  <p className="text-[10px] text-rose-500 font-medium mt-1">Enter a valid email address.</p>
                )}
              </div>

              {/* Academic Faculty / Department */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Academic Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full py-2.5 px-3 rounded-xl glass-input text-xs font-medium"
                >
                  <option value="School of Computing & Data Science">School of Computing & Data Science</option>
                  <option value="Faculty of Engineering & Robotics">Faculty of Engineering & Robotics</option>
                  <option value="Business School & Economics">Business School & Economics</option>
                  <option value="College of Biological & Health Sciences">College of Biological & Health Sciences</option>
                  <option value="School of Architecture & Design">School of Architecture & Design</option>
                </select>
              </div>

              {/* Year Level */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Academic Standing</label>
                <select
                  name="yearLevel"
                  value={formData.yearLevel}
                  onChange={handleChange}
                  className="w-full py-2.5 px-3 rounded-xl glass-input text-xs font-medium"
                >
                  <option value="Freshman (Year 1)">Freshman (Year 1)</option>
                  <option value="Sophomore (Year 2)">Sophomore (Year 2)</option>
                  <option value="Junior (Year 3)">Junior (Year 3)</option>
                  <option value="Senior (Year 4)">Senior (Year 4)</option>
                  <option value="Postgraduate / Master">Postgraduate / Master</option>
                </select>
              </div>

            </div>
          </div>

          {/* SECTION 2: SECURITY & PASSWORDS */}
          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
              <i className="bi bi-shield-lock text-base" />
              2. Account Security & Password
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Password */}
              <div className="space-y-1">
                <div className="floating-label-group mb-1">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="regPassword"
                    placeholder=" "
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur('password')}
                    className="glass-input floating-input pr-10"
                    required
                  />
                  <label htmlFor="regPassword" className="floating-label">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`} />
                  </button>
                </div>

                {/* Password Strength Meter */}
                {formData.password && (
                  <div className="space-y-1.5 p-2 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Strength:</span>
                      <span className={`font-bold ${
                        strength.score >= 3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                      }`}>
                        {strength.label}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full strength-bar-fill ${strength.color}`}
                        style={{ width: `${strength.percent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="floating-label-group mb-0">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder=" "
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  className={`glass-input floating-input pr-10 ${
                    touched.confirmPassword && !isConfirmMatch ? 'border-rose-500 focus:border-rose-500' : ''
                  }`}
                  required
                />
                <label htmlFor="confirmPassword" className="floating-label">Confirm Password</label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide Password' : 'Show Password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  <i className={`bi ${showConfirmPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`} />
                </button>
                {touched.confirmPassword && !isConfirmMatch && (
                  <p className="text-[10px] text-rose-500 font-medium mt-1">Passwords do not match.</p>
                )}
              </div>

            </div>
          </div>

          {/* SECTION 3: TERMS & CONSENT */}
          <div className="pt-2">
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 cursor-pointer select-none">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-0.5 w-4 h-4 text-indigo-600 rounded border-slate-300 dark:border-slate-700 cursor-pointer"
                required
              />
              <span className="text-xs text-slate-600 dark:text-slate-300 font-light leading-snug">
                I agree to the <strong className="text-indigo-600 dark:text-indigo-400">Campus Companion Academic Code of Conduct</strong> and consent to store local session dummy credentials for this web programming demonstration.
              </span>
            </label>
          </div>

          {/* Submit Registration Button */}
          <RippleButton
            type="submit"
            variant="primary"
            disabled={!isFormValid}
            className="w-full py-4 text-base font-bold shadow-xl shadow-indigo-500/25"
          >
            Complete Registration
            <i className="bi bi-arrow-right-circle-fill text-lg" />
          </RippleButton>
        </form>

        {/* Link back to login */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-600 dark:text-slate-400">
          Already registered as a student?{' '}
          <button
            type="button"
            onClick={() => {
              setActiveView('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Log In Here
          </button>
        </div>
      </div>

      {/* ANIMATED SUCCESS CELEBRATION MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-md glass-card p-8 border border-emerald-500/40 shadow-2xl text-center space-y-6 relative overflow-hidden">
            
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center text-4xl shadow-inner animate-bounce">
              <i className="bi bi-check-circle-fill" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                Registration Successful!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Welcome aboard, <strong className="text-indigo-600 dark:text-indigo-400">{formData.firstName} {formData.lastName}</strong>! Your student account is now fully provisioned.
              </p>
            </div>

            {/* Temporary ID Pass Badge */}
            <div className="glass-panel p-4 border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-transparent text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Assigned Student Badge
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{formData.firstName} {formData.lastName}</p>
                  <p className="text-xs text-slate-500 font-mono">ID: {assignedStudentId}</p>
                </div>
              </div>
            </div>

            <RippleButton
              onClick={handleProceedToPortal}
              variant="primary"
              className="w-full py-3.5 font-bold shadow-lg"
            >
              Enter Student Portal Now
              <i className="bi bi-speedometer2" />
            </RippleButton>
          </div>
        </div>
      )}
    </div>
  );
};
