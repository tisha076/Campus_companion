
import React, { useState } from "react";
import { UserProfile } from "../types";
import { registerUser, loginUser } from "../services/api";

interface RegisterPageProps {
  onRegisterSuccess: (user: UserProfile) => void;
  onNavigate: (view: "login" | "landing") => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegisterSuccess,
  onNavigate,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "Computer Science & Software Engineering",
    studentId: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.studentId.trim() ||
      !formData.department
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.termsAccepted) {
      setError("Please accept the terms and conditions.");
      return;
    }

    try {
      setIsLoading(true);

      // Register student in MySQL
      await registerUser(
        formData.fullName.trim(),
        formData.email.trim(),
        formData.password,
        formData.studentId.trim(),
        formData.department
      );

      // Automatically log in after registration
      const loginResponse = await loginUser(
        formData.email.trim(),
        formData.password
      );

      const { token, user } = loginResponse;

      if (!token || !user) {
        throw new Error("Registration succeeded, but automatic login failed. Please log in manually.");
      }

      localStorage.setItem("token", token);

      const newUser: UserProfile = {
        name: user.full_name,
        email: user.email,
        studentId: user.student_id || formData.studentId,
        major: user.department || formData.department,
        year: "New Student",
        gpa: 0,
        avatarUrl: "",
        creditsEarned: 0,
      };

      setSuccess("Account created successfully!");

      onRegisterSuccess(newUser);

    } catch (err: any) {
      const message = err.response?.data?.message || err.message;
      setError(message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Create Your Account
          </h1>

          <p className="text-slate-400 mt-2">
            Join Campus Companion and manage your academic life.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-3 mb-5 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg p-3 mb-5 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Student ID
            </label>

            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Enter your student ID"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Department
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              required
            >
              <option value="Computer Science & Software Engineering">
                Computer Science & Software Engineering
              </option>
              <option value="Electrical & Electronic Engineering">
                Electrical & Electronic Engineering
              </option>
              <option value="Business Administration">
                Business Administration
              </option>
              <option value="English">
                English
              </option>
              <option value="Economics">
                Economics
              </option>
              <option value="Law">
                Law
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              required
              minLength={8}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mt-1 accent-blue-500"
            />

            <label className="text-sm text-slate-400">
              I agree to the Terms and Conditions and Privacy Policy.
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg py-3 transition"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => onNavigate("login")}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;

