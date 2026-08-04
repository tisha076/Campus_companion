import React, { useState } from 'react';

interface CourseEntry {
  id: string;
  name: string;
  credits: number;
  grade: string;
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
  'D': 1.0,
  'F': 0.0
};

export const CgpaPage: React.FC = () => {
  const [courses, setCourses] = useState<CourseEntry[]>([
    { id: '1', name: 'Web Programming & Frameworks', credits: 4, grade: 'A' },
    { id: '2', name: 'Artificial Intelligence & Neural Nets', credits: 4, grade: 'A-' },
    { id: '3', name: 'Linear Algebra & Optimization', credits: 3, grade: 'B+' },
    { id: '4', name: 'Technical Communication', credits: 3, grade: 'A' }
  ]);

  // Previous Cumulative state
  const [prevGpa, setPrevGpa] = useState<number>(3.85);
  const [prevCredits, setPrevCredits] = useState<number>(90);

  const handleAddCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now().toString(), name: `Course ${courses.length + 1}`, credits: 3, grade: 'A' }
    ]);
  };

  const handleRemoveCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const handleUpdateCourse = (id: string, field: keyof CourseEntry, value: any) => {
    setCourses(
      courses.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  // Semester Calculations
  const currentSemesterCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0);
  const currentSemesterPoints = courses.reduce(
    (sum, c) => sum + (c.credits || 0) * (GRADE_POINTS[c.grade] ?? 0),
    0
  );
  const semesterGpa = currentSemesterCredits > 0 ? currentSemesterPoints / currentSemesterCredits : 0;

  // Cumulative CGPA Calculations
  const totalCombinedCredits = prevCredits + currentSemesterCredits;
  const totalCombinedPoints = prevGpa * prevCredits + currentSemesterPoints;
  const overallCgpa = totalCombinedCredits > 0 ? totalCombinedPoints / totalCombinedCredits : 0;

  return (
    <div className="container max-w-7xl py-4 py-lg-5">
      {/* Header */}
      <div className="glass-card p-4 rounded-4 border mb-4">
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold mb-2 d-inline-block">
          Academic Standing Tool
        </span>
        <h1 className="h3 fw-extrabold text-body mb-1">CGPA Calculator</h1>
        <p className="text-secondary small mb-0">
          Calculate your semester GPA and overall cumulative GPA on standard 4.0 grading scale.
        </p>
      </div>

      <div className="row g-4">
        {/* Left Column: Course Grade Inputs */}
        <div className="col-lg-8">
          <div className="glass-card p-4 rounded-4 border">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="h5 fw-extrabold text-body mb-0">Semester Course Grades</h2>
              <button onClick={handleAddCourse} className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold">
                <i className="bi bi-plus-lg me-1"></i> Add Course
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-borderless align-middle mb-0">
                <thead>
                  <tr className="text-muted xsmall border-bottom">
                    <th style={{ width: '45%' }}>Course Name</th>
                    <th style={{ width: '25%' }}>Credit Hours</th>
                    <th style={{ width: '25%' }}>Grade</th>
                    <th style={{ width: '5%' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm rounded-3"
                          value={course.name}
                          onChange={(e) => handleUpdateCourse(course.id, 'name', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm rounded-3"
                          value={course.credits}
                          min={1}
                          max={6}
                          onChange={(e) => handleUpdateCourse(course.id, 'credits', parseInt(e.target.value) || 1)}
                        />
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm rounded-3 fw-bold"
                          value={course.grade}
                          onChange={(e) => handleUpdateCourse(course.id, 'grade', e.target.value)}
                        >
                          {Object.keys(GRADE_POINTS).map((g) => (
                            <option key={g} value={g}>
                              {g} ({GRADE_POINTS[g].toFixed(1)})
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemoveCourse(course.id)}
                          className="btn btn-link text-danger p-0 text-decoration-none"
                          title="Remove Course"
                        >
                          <i className="bi bi-x-circle-fill fs-5"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: GPA Summary Card & Scale Reference */}
        <div className="col-lg-4">
          <div className="glass-card p-4 rounded-4 border mb-4">
            <h2 className="h6 fw-extrabold text-body mb-3">GPA Calculation Results</h2>

            <div className="p-3 rounded-3 bg-primary-subtle text-primary mb-3">
              <div className="xsmall text-uppercase fw-semibold mb-1">Current Semester GPA</div>
              <div className="display-6 fw-extrabold mb-0">{semesterGpa.toFixed(2)}</div>
              <div className="xsmall">{currentSemesterCredits} Total Semester Credits</div>
            </div>

            <div className="p-3 rounded-3 bg-body-tertiary border mb-3">
              <div className="row g-2 mb-2">
                <div className="col-6">
                  <label className="form-label xsmall text-muted mb-1">Previous GPA</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control form-control-sm rounded-3"
                    value={prevGpa}
                    onChange={(e) => setPrevGpa(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label xsmall text-muted mb-1">Previous Credits</label>
                  <input
                    type="number"
                    className="form-control form-control-sm rounded-3"
                    value={prevCredits}
                    onChange={(e) => setPrevCredits(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="pt-2 border-top border-subtle d-flex justify-content-between align-items-center">
                <span className="fw-bold xsmall text-body">Overall Cumulative CGPA:</span>
                <span className="fs-4 fw-extrabold text-success">{overallCgpa.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-3.5 rounded-4 border xsmall">
            <h3 className="fw-bold text-body mb-2 fs-6">Standard 4.0 Grading Scale</h3>
            <div className="row g-1 text-muted">
              <div className="col-6">A / A+ : 4.00</div>
              <div className="col-6">A- : 3.70</div>
              <div className="col-6">B+ : 3.30</div>
              <div className="col-6">B : 3.00</div>
              <div className="col-6">B- : 2.70</div>
              <div className="col-6">C+ : 2.30</div>
              <div className="col-6">C : 2.00</div>
              <div className="col-6">D : 1.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
