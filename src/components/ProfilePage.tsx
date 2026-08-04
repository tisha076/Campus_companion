import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfilePageProps {
  user: UserProfile;
  onUpdateUser?: (updated: UserProfile) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [major, setMajor] = useState(user.major);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        name: name.trim(),
        email: email.trim(),
        major: major.trim()
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="container max-w-7xl py-4 py-lg-5">
      {/* Header Banner */}
      <div className="glass-card p-4 rounded-4 border mb-4">
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold mb-2 d-inline-block">
          Official Student Records
        </span>
        <h1 className="h3 fw-extrabold text-body mb-1">Student Profile</h1>
        <p className="text-secondary small mb-0">View and update your personal university profile and enrollment credentials.</p>
      </div>

      <div className="row g-4">
        {/* Left Column: Digital Student Pass & Photo */}
        <div className="col-lg-4">
          <div className="glass-card p-4 rounded-4 border text-center mb-4">
            <div className="position-relative d-inline-block mb-3">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="rounded-circle shadow-md border border-3 border-primary"
                style={{ width: '110px', height: '110px', objectFit: 'cover' }}
              />
              <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-2" title="Enrolled Active"></span>
            </div>

            <h2 className="h5 fw-bold text-body mb-1">{user.name}</h2>
            <p className="text-muted small mb-2">{user.major}</p>

            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold font-monospace">
              {user.studentId}
            </span>

            <hr className="border-subtle my-3" />

            <div className="row text-center g-2">
              <div className="col-6">
                <div className="p-2 rounded-3 bg-body-tertiary">
                  <div className="xsmall text-muted">Cumulative GPA</div>
                  <div className="fs-5 fw-extrabold text-primary">{user.gpa.toFixed(2)}</div>
                </div>
              </div>
              <div className="col-6">
                <div className="p-2 rounded-3 bg-body-tertiary">
                  <div className="xsmall text-muted">Credits Earned</div>
                  <div className="fs-5 fw-extrabold text-body">{user.creditsEarned}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info Form */}
        <div className="col-lg-8">
          <div className="glass-card p-4 rounded-4 border">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="h5 fw-extrabold text-body mb-0">Academic & Personal Details</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold"
                >
                  <i className="bi bi-pencil me-1"></i> Edit Profile
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-light btn-sm rounded-pill px-3"
                >
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={handleSave}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label xsmall text-muted mb-1">Full Student Name</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label xsmall text-muted mb-1">University Email Address</label>
                  <input
                    type="email"
                    className="form-control rounded-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label xsmall text-muted mb-1">Student ID Number</label>
                  <input
                    type="text"
                    className="form-control rounded-3 bg-body-tertiary"
                    value={user.studentId}
                    disabled
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label xsmall text-muted mb-1">Academic Year / Standing</label>
                  <input
                    type="text"
                    className="form-control rounded-3 bg-body-tertiary"
                    value={user.year}
                    disabled
                  />
                </div>

                <div className="col-12">
                  <label className="form-label xsmall text-muted mb-1">Department / Enrolled Major</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-4 text-end">
                  <button type="submit" className="btn btn-primary rounded-pill bg-gradient-accent border-0 px-4 fw-semibold">
                    Save Profile Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
