import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';

interface SimulatedCourse {
  id: string;
  code: string;
  title: string;
  credits: number;
  initialGrade: string;
  simulatedGrade: string;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D': 1.0,
  'F': 0.0,
};

const GRADE_OPTIONS = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];

const INITIAL_SIMULATED_COURSES: SimulatedCourse[] = [
  { id: 'sim-1', code: 'CS 302', title: 'Web Programming', credits: 4, initialGrade: 'B+', simulatedGrade: 'B+' },
  { id: 'sim-2', code: 'CS 401', title: 'Machine Learning', credits: 4, initialGrade: 'A-', simulatedGrade: 'A-' },
  { id: 'sim-3', code: 'CS 310', title: 'Algorithm Design', credits: 3, initialGrade: 'B', simulatedGrade: 'B' },
  { id: 'sim-4', code: 'CS 320', title: 'Theory of Computation', credits: 3, initialGrade: 'C+', simulatedGrade: 'C+' },
  { id: 'sim-5', code: 'CS 350', title: 'Software Engineering', credits: 4, initialGrade: 'A', simulatedGrade: 'A' },
];

interface GpaSimulatorProps {
  user: UserProfile;
}

export const GpaSimulatorWidget: React.FC<GpaSimulatorProps> = ({ user }) => {
  const [courses, setCourses] = useState<SimulatedCourse[]>(INITIAL_SIMULATED_COURSES);
  const [highlight, setHighlight] = useState<'up' | 'down' | 'none'>('none');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const priorCredits = user.creditsEarned || 104;
  const priorGpa = user.gpa || 3.88;
  const priorPoints = priorCredits * priorGpa;

  // Calculate current baseline semester GPA & cumulative GPA
  const calculateGpa = (courseList: { credits: number; gradeKey: 'initialGrade' | 'simulatedGrade' }[]) => {
    let totalSemPoints = 0;
    let totalSemCredits = 0;

    courseList.forEach((c) => {
      const g = c[courseList[0].gradeKey === 'initialGrade' ? 'initialGrade' : 'simulatedGrade'];
      const pts = GRADE_POINTS[g] ?? 0;
      totalSemPoints += pts * c.credits;
      totalSemCredits += c.credits;
    });

    const cumGpa = (priorPoints + totalSemPoints) / (priorCredits + totalSemCredits);
    return {
      semGpa: totalSemCredits > 0 ? totalSemPoints / totalSemCredits : 0,
      cumGpa: Number(cumGpa.toFixed(2)),
    };
  };

  // Baseline Current GPA
  const currentSemesterList = courses.map((c) => ({ ...c, gradeKey: 'initialGrade' as const }));
  const { cumGpa: currentGpa } = calculateGpa(currentSemesterList);

  // Simulated Predicted GPA
  const simulatedSemesterList = courses.map((c) => ({ ...c, gradeKey: 'simulatedGrade' as const }));
  const { cumGpa: predictedGpa } = calculateGpa(simulatedSemesterList);

  const diff = Number((predictedGpa - currentGpa).toFixed(2));

  // Store previous predicted GPA to trigger pulse animations
  const prevPredictedRef = useRef(predictedGpa);

  useEffect(() => {
    if (prevPredictedRef.current !== predictedGpa) {
      if (predictedGpa > prevPredictedRef.current) {
        setHighlight('up');
      } else if (predictedGpa < prevPredictedRef.current) {
        setHighlight('down');
      }
      setIsAnimating(true);
      prevPredictedRef.current = predictedGpa;

      const timer = setTimeout(() => {
        setHighlight('none');
        setIsAnimating(false);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [predictedGpa]);

  const handleGradeChange = (id: string, newGrade: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, simulatedGrade: newGrade } : c))
    );
  };

  const handleReset = () => {
    setCourses((prev) =>
      prev.map((c) => ({ ...c, simulatedGrade: c.initialGrade }))
    );
  };

  return (
    <div className="glass-card p-4 rounded-4 border mb-4 position-relative overflow-hidden shadow-lg">
      
      {/* Background Decorative Gradient */}
      <div 
        className="position-absolute top-0 end-0 p-5 rounded-circle opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--bs-primary) 0%, transparent 70%)',
          width: '300px',
          height: '300px',
          transform: 'translate(30%, -30%)'
        }}
      ></div>

      {/* Header Bar */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
        <div className="d-flex align-items-center gap-3">
          <div 
            className="p-3 rounded-3 bg-gradient-accent text-white shadow-sm d-flex align-items-center justify-content-center"
            style={{ width: '48px', height: '48px' }}
          >
            <i className="bi bi-calculator-fill fs-4"></i>
          </div>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h2 className="h5 fw-extrabold text-body mb-0">What-If GPA Simulator</h2>
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-0.5 fw-bold xsmall">
                Interactive
              </span>
            </div>
            <span className="text-muted xsmall">
              Adjust hypothetical course grades to project live cumulative GPA updates
            </span>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1.5 fw-semibold d-inline-flex align-items-center gap-2 align-self-start align-self-md-auto transition-all"
        >
          <i className="bi bi-arrow-counterclockwise fs-6"></i>
          <span>Reset Simulation</span>
        </button>
      </div>

      {/* Main KPI Comparison Row */}
      <div className="p-3.5 rounded-4 bg-body-tertiary border border-subtle mb-4 shadow-sm">
        <div className="row g-3 align-items-center text-center text-md-start">
          
          {/* Current GPA */}
          <div className="col-12 col-sm-4 border-end-md">
            <div className="text-muted xsmall fw-semibold text-uppercase tracking-wider">Current GPA</div>
            <div className="display-6 fw-extrabold text-body">{currentGpa.toFixed(2)}</div>
            <div className="text-muted xsmall">Baseline Score</div>
          </div>

          {/* Predicted GPA with Live Pulse Highlight */}
          <div className="col-12 col-sm-4 border-end-md">
            <div className="text-muted xsmall fw-semibold text-uppercase tracking-wider">Predicted GPA</div>
            <div 
              className={`display-6 fw-extrabold transition-all duration-300 rounded-3 px-2 py-0.5 d-inline-block ${
                highlight === 'up'
                  ? 'bg-success text-white shadow-sm scale-105'
                  : highlight === 'down'
                  ? 'bg-danger text-white shadow-sm scale-105'
                  : 'text-primary'
              }`}
            >
              {predictedGpa.toFixed(2)}
            </div>
            <div className="text-muted xsmall">Live Projection</div>
          </div>

          {/* Difference Indicator */}
          <div className="col-12 col-sm-4">
            <div className="text-muted xsmall fw-semibold text-uppercase tracking-wider">GPA Impact</div>
            <div className="fs-3 fw-extrabold d-flex align-items-center justify-content-center justify-content-md-start gap-1">
              {diff > 0 ? (
                <span className="text-success d-inline-flex align-items-center gap-1">
                  <i className="bi bi-triangle-fill fs-6"></i>
                  +{diff.toFixed(2)}
                </span>
              ) : diff < 0 ? (
                <span className="text-danger d-inline-flex align-items-center gap-1">
                  <i className="bi bi-triangle-fill fs-6" style={{ transform: 'rotate(180deg)' }}></i>
                  {diff.toFixed(2)}
                </span>
              ) : (
                <span className="text-secondary d-inline-flex align-items-center gap-1">
                  <i className="bi bi-dash-lg fs-6"></i>
                  0.00
                </span>
              )}
            </div>
            <div className="xsmall text-muted">
              {diff > 0 ? 'Positive Academic Boost' : diff < 0 ? 'Below Current Standing' : 'No Change'}
            </div>
          </div>

        </div>
      </div>

      {/* Course Grade Sliders / Dropdowns List */}
      <div className="d-flex flex-column gap-3 mb-3">
        {courses.map((course) => {
          const courseGradePts = GRADE_POINTS[course.simulatedGrade] ?? 0;
          const initialPts = GRADE_POINTS[course.initialGrade] ?? 0;
          const isModified = course.simulatedGrade !== course.initialGrade;
          const gradeIndex = GRADE_OPTIONS.indexOf(course.simulatedGrade);

          return (
            <div
              key={course.id}
              className={`p-3 rounded-3 border transition-all ${
                isModified
                  ? 'bg-primary-subtle border-primary-subtle shadow-sm'
                  : 'bg-body-tertiary border-subtle'
              }`}
            >
              <div className="row g-2 align-items-center">
                
                {/* Course Details */}
                <div className="col-12 col-md-4">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="badge bg-secondary-subtle text-body border border-secondary-subtle font-monospace fw-bold xsmall">
                      {course.code}
                    </span>
                    <span className="badge bg-body text-muted border rounded-pill xsmall">
                      {course.credits} Credits
                    </span>
                  </div>
                  <h3 className="fw-bold text-body fs-6 mb-0">{course.title}</h3>
                </div>

                {/* Grade Slider & Quick Buttons */}
                <div className="col-12 col-md-5">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="xsmall text-muted fw-semibold">Hypothetical Grade Slider:</span>
                    <span className="fw-bold font-monospace xsmall text-primary">{course.simulatedGrade} ({courseGradePts.toFixed(1)} pts)</span>
                  </div>

                  {/* Range Slider for Grades */}
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max={GRADE_OPTIONS.length - 1}
                    step="1"
                    value={gradeIndex !== -1 ? gradeIndex : 0}
                    onChange={(e) => {
                      const idx = parseInt(e.target.value, 10);
                      handleGradeChange(course.id, GRADE_OPTIONS[idx]);
                    }}
                    style={{ cursor: 'pointer' }}
                  />

                  {/* Range Labels */}
                  <div className="d-flex justify-content-between xsmall text-muted font-monospace" style={{ fontSize: '0.68rem' }}>
                    <span>A+</span>
                    <span>B</span>
                    <span>F</span>
                  </div>
                </div>

                {/* Dropdown Selector & Baseline Badge */}
                <div className="col-12 col-md-3 d-flex align-items-center justify-content-md-end gap-2">
                  <div className="text-end">
                    <div className="xsmall text-muted">Baseline:</div>
                    <span className="badge bg-body border text-body fw-bold">{course.initialGrade} ({initialPts.toFixed(1)})</span>
                  </div>

                  <select
                    className="form-select form-select-sm rounded-3 border-subtle bg-body text-body fw-bold shadow-sm w-auto"
                    value={course.simulatedGrade}
                    onChange={(e) => handleGradeChange(course.id, e.target.value)}
                    style={{ minWidth: '85px', fontSize: '0.85rem' }}
                  >
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g} ({GRADE_POINTS[g].toFixed(1)})
                      </option>
                    ))}
                  </select>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Disclaimer Note */}
      <div className="d-flex align-items-center justify-content-between pt-2 border-top border-subtle text-muted xsmall">
        <div className="d-flex align-items-center gap-1.5">
          <i className="bi bi-info-circle-fill text-primary"></i>
          <span>Simulation only. Changes are not saved.</span>
        </div>
        <div className="fw-medium text-end d-none d-sm-block">
          Standard 4.00 Scale • Calculated in Realtime
        </div>
      </div>

    </div>
  );
};
