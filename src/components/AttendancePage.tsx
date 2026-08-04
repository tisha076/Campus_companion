import React, { useState } from 'react';
import { AttendanceRecord } from '../types';
import { mockAttendance } from '../data/mockData';

export const AttendancePage: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>(mockAttendance);

  // Standalone Quick Calculator state
  const [quickHeld, setQuickHeld] = useState<number>(24);
  const [quickAttended, setQuickAttended] = useState<number>(20);
  const [targetPercent, setTargetPercent] = useState<number>(75);

  // Quick calc results
  const currentQuickPercent = quickHeld > 0 ? (quickAttended / quickHeld) * 100 : 0;
  
  // How many classes needed or can be missed
  const calculateMargin = (attended: number, held: number, target: number) => {
    if (held === 0) return { status: 'none', count: 0 };
    const currentPct = (attended / held) * 100;
    
    if (currentPct >= target) {
      // How many classes can be missed: (attended - target*held/100) / (target/100)
      const maxHeldForAttended = attended / (target / 100);
      const safeMisses = Math.floor(maxHeldForAttended - held);
      return { status: 'safe', count: Math.max(0, safeMisses) };
    } else {
      // How many consecutive classes needed: (target*held - 100*attended) / (100 - target)
      const needed = Math.ceil((target * held - 100 * attended) / (100 - target));
      return { status: 'needed', count: Math.max(0, needed) };
    }
  };

  const handleUpdateRecord = (id: string, field: 'totalClasses' | 'attendedClasses', value: number) => {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updated = { ...r, [field]: Math.max(0, value) };
          if (updated.attendedClasses > updated.totalClasses) {
            updated.attendedClasses = updated.totalClasses;
          }
          return updated;
        }
        return r;
      })
    );
  };

  const quickMargin = calculateMargin(quickAttended, quickHeld, targetPercent);

  return (
    <div className="container max-w-7xl py-4 py-lg-5">
      {/* Header Banner */}
      <div className="glass-card p-4 rounded-4 border mb-4">
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold mb-2 d-inline-block">
          Academic Eligibility Tracker
        </span>
        <h1 className="h3 fw-extrabold text-body mb-1">Attendance Calculator</h1>
        <p className="text-secondary small mb-0">
          Ensure you satisfy university minimum attendance requirements (e.g. 75% or 85%) for midterm and final exams.
        </p>
      </div>

      <div className="row g-4 mb-4">
        {/* Left Column: Course Attendance Cards */}
        <div className="col-lg-8">
          <h2 className="h5 fw-extrabold text-body mb-3">Enrolled Course Attendance</h2>

          <div className="d-flex flex-column gap-3">
            {records.map((item) => {
              const pct = item.totalClasses > 0 ? (item.attendedClasses / item.totalClasses) * 100 : 0;
              const margin = calculateMargin(item.attendedClasses, item.totalClasses, 75);
              const isEligible = pct >= 75;

              return (
                <div key={item.id} className="glass-card p-4 rounded-4 border">
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
                    <div>
                      <span className="badge bg-primary text-white font-monospace rounded-pill px-2.5 py-0.5 fw-bold me-2">
                        {item.courseCode}
                      </span>
                      <strong className="text-body small">{item.courseTitle}</strong>
                    </div>

                    <span
                      className={`badge rounded-pill px-3 py-1.5 fw-bold ${
                        isEligible
                          ? 'bg-success-subtle text-success border border-success-subtle'
                          : 'bg-danger-subtle text-danger border border-danger-subtle'
                      }`}
                    >
                      {pct.toFixed(1)}% Attendance
                    </span>
                  </div>

                  {/* Inputs and Progress Bar */}
                  <div className="row align-items-center g-3 mb-3">
                    <div className="col-6 col-sm-4">
                      <label className="form-label xsmall text-muted mb-1">Attended Classes</label>
                      <input
                        type="number"
                        className="form-control form-control-sm rounded-3"
                        value={item.attendedClasses}
                        onChange={(e) => handleUpdateRecord(item.id, 'attendedClasses', parseInt(e.target.value) || 0)}
                        min={0}
                      />
                    </div>

                    <div className="col-6 col-sm-4">
                      <label className="form-label xsmall text-muted mb-1">Total Classes Held</label>
                      <input
                        type="number"
                        className="form-control form-control-sm rounded-3"
                        value={item.totalClasses}
                        onChange={(e) => handleUpdateRecord(item.id, 'totalClasses', parseInt(e.target.value) || 0)}
                        min={1}
                      />
                    </div>

                    <div className="col-12 col-sm-4">
                      <label className="form-label xsmall text-muted mb-1">Status</label>
                      <div className="fw-bold xsmall text-body">
                        {isEligible ? (
                          <span className="text-success">
                            <i className="bi bi-check-circle-fill me-1"></i> Exam Eligible
                          </span>
                        ) : (
                          <span className="text-danger">
                            <i className="bi bi-exclamation-octagon-fill me-1"></i> Shortage Warning
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress track */}
                  <div className="progress rounded-pill bg-body-tertiary mb-2" style={{ height: '8px' }}>
                    <div
                      className={`progress-bar rounded-pill ${isEligible ? 'bg-success' : 'bg-danger'}`}
                      style={{ width: `${Math.min(100, pct)}%` }}
                    ></div>
                  </div>

                  {/* Safe margin note */}
                  <div className="xsmall text-secondary">
                    {margin.status === 'safe' ? (
                      <span className="text-success fw-semibold">
                        <i className="bi bi-shield-check me-1"></i> You can safely miss {margin.count} more classes and maintain 75% attendance.
                      </span>
                    ) : (
                      <span className="text-danger fw-semibold">
                        <i className="bi bi-exclamation-triangle me-1"></i> You must attend the next {margin.count} consecutive classes to reach 75%.
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Quick Single-Course Calculator */}
        <div className="col-lg-4">
          <div className="glass-card p-4 rounded-4 border sticky-top" style={{ top: '90px' }}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-calculator-fill text-primary fs-4"></i>
              <h2 className="h6 fw-extrabold text-body mb-0">Quick Calculator</h2>
            </div>
            <p className="text-secondary xsmall mb-3">Test any custom course attendance scenario instantly.</p>

            <div className="mb-3">
              <label className="form-label xsmall text-muted mb-1">Classes Attended</label>
              <input
                type="number"
                className="form-control rounded-3"
                value={quickAttended}
                onChange={(e) => setQuickAttended(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>

            <div className="mb-3">
              <label className="form-label xsmall text-muted mb-1">Total Classes Held</label>
              <input
                type="number"
                className="form-control rounded-3"
                value={quickHeld}
                onChange={(e) => setQuickHeld(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>

            <div className="mb-4">
              <label className="form-label xsmall text-muted mb-1">Target Threshold (%)</label>
              <select
                className="form-select rounded-3"
                value={targetPercent}
                onChange={(e) => setTargetPercent(parseInt(e.target.value))}
              >
                <option value={75}>75% (Standard Exam Cutoff)</option>
                <option value={80}>80% (Honors Requirement)</option>
                <option value={85}>85% (Scholarship Threshold)</option>
              </select>
            </div>

            <div className="p-3 rounded-3 bg-body-tertiary border text-center">
              <div className="xsmall text-muted text-uppercase fw-semibold mb-1">Calculated Percentage</div>
              <div className="display-6 fw-extrabold text-primary mb-1">
                {currentQuickPercent.toFixed(1)}%
              </div>

              {quickMargin.status === 'safe' ? (
                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1 xsmall fw-semibold">
                  Safe to miss {quickMargin.count} class(es)
                </span>
              ) : (
                <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-1 xsmall fw-semibold">
                  Must attend {quickMargin.count} class(es)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
