import React, { useState } from 'react';
import { UserProfile, Course, ScheduleItem, Assignment, Announcement, PageView } from '../types';
import { mockCourses, mockSchedule, mockAssignments, mockAnnouncements } from '../data/mockData';

interface DashboardPageProps {
  user: UserProfile;
  onNavigate?: (view: PageView) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, onNavigate }) => {
  const [courses] = useState<Course[]>(mockCourses);
  const [schedule] = useState<ScheduleItem[]>(mockSchedule);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [announcements] = useState<Announcement[]>(mockAnnouncements);
  
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('Mon');
  const [showStudentPass, setShowStudentPass] = useState(false);

  // Toggle assignment status
  const handleToggleAssignmentStatus = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  // Schedule items for selected day
  const daySchedule = schedule.filter((s) => s.day === selectedDay);

  return (
    <div className="container max-w-7xl py-4 py-lg-5">
      {/* Top Welcome Banner */}
      <div className="glass-card p-4 p-md-5 rounded-4 border mb-4 position-relative overflow-hidden">
        <div className="row align-items-center gy-3">
          <div className="col-md-8">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold">
                Fall Semester 2026
              </span>
              <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1 fw-semibold">
                Active Enrolled Status
              </span>
            </div>

            <h1 className="display-6 fw-extrabold text-body tracking-tight mb-2">
              Welcome back, <span className="text-gradient">{user.name}</span>! 🎓
            </h1>

            <p className="text-secondary small mb-0 pe-md-4">
              {user.major} • {user.year} • Student ID: <strong className="text-body">{user.studentId}</strong>
            </p>
          </div>

          <div className="col-md-4 text-md-end">
            <button
              onClick={() => setShowStudentPass(true)}
              className="btn btn-primary rounded-pill px-4 py-2.5 bg-gradient-accent border-0 fw-bold shadow-sm d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-qr-code-scan fs-5"></i>
              <span>Digital Student Pass</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="glass-card p-3.5 rounded-4 h-100 d-flex align-items-center gap-3">
            <div className="p-3 rounded-3 bg-primary-subtle text-primary">
              <i className="bi bi-award-fill fs-3"></i>
            </div>
            <div>
              <div className="text-muted xsmall fw-semibold text-uppercase" style={{ fontSize: '0.72rem' }}>Cumulative GPA</div>
              <div className="fs-3 fw-extrabold text-body">{user.gpa.toFixed(2)}</div>
              <div className="text-success xsmall fw-medium" style={{ fontSize: '0.7rem' }}>Faculty Honor Standing</div>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="glass-card p-3.5 rounded-4 h-100 d-flex align-items-center gap-3">
            <div className="p-3 rounded-3 bg-purple-subtle text-purple" style={{ color: '#7c3aed', backgroundColor: 'rgba(124, 58, 237, 0.1)' }}>
              <i className="bi bi-journal-bookmark-fill fs-3"></i>
            </div>
            <div>
              <div className="text-muted xsmall fw-semibold text-uppercase" style={{ fontSize: '0.72rem' }}>Active Courses</div>
              <div className="fs-3 fw-extrabold text-body">{courses.length}</div>
              <div className="text-muted xsmall" style={{ fontSize: '0.7rem' }}>14 Enrolled Credits</div>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="glass-card p-3.5 rounded-4 h-100 d-flex align-items-center gap-3">
            <div className="p-3 rounded-3 bg-warning-subtle text-warning">
              <i className="bi bi-clock-history fs-3"></i>
            </div>
            <div>
              <div className="text-muted xsmall fw-semibold text-uppercase" style={{ fontSize: '0.72rem' }}>Pending Tasks</div>
              <div className="fs-3 fw-extrabold text-body">
                {assignments.filter(a => a.status !== 'Completed').length}
              </div>
              <div className="text-warning xsmall fw-medium" style={{ fontSize: '0.7rem' }}>Due this week</div>
            </div>
          </div>
        </div>

        <div className="col-6 col-lg-3">
          <div className="glass-card p-3.5 rounded-4 h-100 d-flex align-items-center gap-3">
            <div className="p-3 rounded-3 bg-success-subtle text-success">
              <i className="bi bi-graph-up-arrow fs-3"></i>
            </div>
            <div>
              <div className="text-muted xsmall fw-semibold text-uppercase" style={{ fontSize: '0.72rem' }}>Attendance Rate</div>
              <div className="fs-3 fw-extrabold text-body">96%</div>
              <div className="text-success xsmall fw-medium" style={{ fontSize: '0.7rem' }}>Exam Eligible</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Portal Shortcuts */}
      <div className="glass-card p-4 rounded-4 border mb-4">
        <h2 className="h6 fw-extrabold text-body mb-3">Portal Quick Utilities</h2>
        <div className="row g-2">
          <div className="col-6 col-md-4 col-lg-2">
            <button
              onClick={() => onNavigate && onNavigate('routine')}
              className="btn btn-outline-secondary w-100 p-2.5 rounded-3 text-start d-flex flex-column gap-1 glass-card border-subtle"
            >
              <i className="bi bi-calendar-week text-primary fs-4"></i>
              <span className="fw-bold xsmall text-body">Class Routine</span>
            </button>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <button
              onClick={() => onNavigate && onNavigate('assignments')}
              className="btn btn-outline-secondary w-100 p-2.5 rounded-3 text-start d-flex flex-column gap-1 glass-card border-subtle"
            >
              <i className="bi bi-check2-square text-warning fs-4"></i>
              <span className="fw-bold xsmall text-body">Assignments</span>
            </button>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <button
              onClick={() => onNavigate && onNavigate('attendance')}
              className="btn btn-outline-secondary w-100 p-2.5 rounded-3 text-start d-flex flex-column gap-1 glass-card border-subtle"
            >
              <i className="bi bi-percent text-success fs-4"></i>
              <span className="fw-bold xsmall text-body">Attendance Calc</span>
            </button>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <button
              onClick={() => onNavigate && onNavigate('cgpa')}
              className="btn btn-outline-secondary w-100 p-2.5 rounded-3 text-start d-flex flex-column gap-1 glass-card border-subtle"
            >
              <i className="bi bi-calculator text-info fs-4"></i>
              <span className="fw-bold xsmall text-body">CGPA Calc</span>
            </button>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <button
              onClick={() => onNavigate && onNavigate('notes')}
              className="btn btn-outline-secondary w-100 p-2.5 rounded-3 text-start d-flex flex-column gap-1 glass-card border-subtle"
            >
              <i className="bi bi-journal-text text-danger fs-4"></i>
              <span className="fw-bold xsmall text-body">Study Notes</span>
            </button>
          </div>

          <div className="col-6 col-md-4 col-lg-2">
            <button
              onClick={() => onNavigate && onNavigate('profile')}
              className="btn btn-outline-secondary w-100 p-2.5 rounded-3 text-start d-flex flex-column gap-1 glass-card border-subtle"
            >
              <i className="bi bi-person-badge text-primary fs-4"></i>
              <span className="fw-bold xsmall text-body">Student Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="row g-4">
        {/* Left Column */}
        <div className="col-lg-7">
          {/* Interactive Class Schedule */}
          <div className="glass-card p-4 rounded-4 mb-4 border">
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-3 gap-2">
              <div>
                <h2 className="h5 fw-extrabold text-body mb-0">Today's Class Schedule</h2>
                <span className="text-muted xsmall">Daily timetable overview</span>
              </div>

              <div className="btn-group btn-group-sm rounded-pill p-1 bg-body-tertiary border border-subtle">
                {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`btn rounded-pill px-2.5 py-1 fw-bold text-uppercase ${
                      selectedDay === day ? 'btn-primary bg-gradient-accent text-white shadow-sm' : 'btn-light border-0 text-secondary'
                    }`}
                    style={{ fontSize: '0.75rem' }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Day Schedule List */}
            {daySchedule.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {daySchedule.map((item) => (
                  <div key={item.id} className="p-3 rounded-3 bg-body-tertiary border border-subtle d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="p-2.5 rounded-3 bg-primary text-white text-center" style={{ minWidth: '45px' }}>
                        <i className="bi bi-clock fs-5"></i>
                      </div>
                      <div>
                        <div className="fw-bold small text-body">{item.courseCode} — {item.title}</div>
                        <div className="text-muted xsmall">{item.time} • Room {item.room}</div>
                        <div className="text-primary xsmall fw-medium">{item.instructor}</div>
                      </div>
                    </div>

                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold small">
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted rounded-3 bg-body-tertiary border border-subtle small">
                <i className="bi bi-calendar-check fs-2 text-primary d-block mb-1"></i>
                No scheduled lectures for {selectedDay}.
              </div>
            )}
          </div>

          {/* Enrolled Courses */}
          <div className="glass-card p-4 rounded-4 border">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h2 className="h5 fw-extrabold text-body mb-0">Enrolled Courses</h2>
                <span className="text-muted xsmall">Syllabus completion & current grade</span>
              </div>
              <span className="badge bg-primary rounded-pill px-3 py-1 fw-semibold">
                {courses.length} Courses
              </span>
            </div>

            <div className="row g-3">
              {courses.map((course) => (
                <div key={course.id} className="col-12 col-md-6">
                  <div className="p-3 rounded-3 bg-body-tertiary border border-subtle h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="badge rounded-pill text-white px-2.5 py-1 font-monospace fw-bold" style={{ backgroundColor: course.color, fontSize: '0.7rem' }}>
                          {course.code}
                        </span>
                        <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2.5 py-0.5 fw-bold">
                          Grade: {course.grade}
                        </span>
                      </div>

                      <h3 className="fw-bold text-body mb-1 fs-6">{course.title}</h3>
                      <div className="text-muted xsmall mb-3">{course.instructor} • {course.room}</div>
                    </div>

                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-1 xsmall">
                        <span className="text-muted">Syllabus Progress</span>
                        <span className="fw-bold text-body">{course.progress}%</span>
                      </div>
                      <div className="progress rounded-pill bg-body" style={{ height: '6px' }}>
                        <div
                          className="progress-bar rounded-pill"
                          style={{ width: `${course.progress}%`, backgroundColor: course.color }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Assignments & Announcements */}
        <div className="col-lg-5">
          {/* Recent Tasks */}
          <div className="glass-card p-4 rounded-4 border mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="h5 fw-extrabold text-body mb-0">Upcoming Assignments</h2>
              <button
                onClick={() => onNavigate && onNavigate('assignments')}
                className="btn btn-link text-primary p-0 text-decoration-none xsmall fw-bold"
              >
                View All
              </button>
            </div>

            <div className="d-flex flex-column gap-2.5">
              {assignments.slice(0, 3).map((assignment) => (
                <div key={assignment.id} className="p-3 rounded-3 bg-body-tertiary border border-subtle d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2.5">
                    <input
                      type="checkbox"
                      className="form-check-input cursor-pointer"
                      checked={assignment.status === 'Completed'}
                      onChange={() => handleToggleAssignmentStatus(assignment.id)}
                    />
                    <div>
                      <div className={`fw-bold small text-body ${assignment.status === 'Completed' ? 'text-decoration-line-through text-muted' : ''}`}>
                        {assignment.title}
                      </div>
                      <div className="text-muted xsmall">
                        {assignment.courseCode} • Due {assignment.dueDate}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`badge rounded-pill px-2.5 py-1 xsmall fw-semibold ${
                      assignment.priority === 'High'
                        ? 'bg-danger-subtle text-danger border border-danger-subtle'
                        : 'bg-warning-subtle text-warning border border-warning-subtle'
                    }`}
                  >
                    {assignment.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Announcements */}
          <div className="glass-card p-4 rounded-4 border">
            <h2 className="h5 fw-extrabold text-body mb-3">Campus Announcements</h2>
            <div className="d-flex flex-column gap-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-3 rounded-3 bg-body-tertiary border border-subtle">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="badge bg-primary-subtle text-primary rounded-pill px-2.5 py-0.5 xsmall fw-bold">
                      {ann.category}
                    </span>
                    <span className="text-muted xsmall">{ann.date}</span>
                  </div>
                  <h3 className="fw-bold text-body fs-6 mb-1">{ann.title}</h3>
                  <p className="text-secondary xsmall mb-2">{ann.summary}</p>
                  <div className="text-muted xsmall fw-semibold">{ann.author}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Digital Student Pass Modal */}
      {showStudentPass && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered max-w-sm">
            <div className="modal-content glass-modal border-0 p-4 text-center">
              <div className="modal-header border-0 pb-0 justify-content-end">
                <button type="button" className="btn-close" onClick={() => setShowStudentPass(false)}></button>
              </div>

              <div className="modal-body py-2">
                <div className="p-4 rounded-4 bg-gradient-accent text-white shadow-lg position-relative overflow-hidden mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-extrabold small tracking-wider text-uppercase">CAMPUS PORTAL ID</span>
                    <i className="bi bi-mortarboard-fill fs-4"></i>
                  </div>

                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="rounded-circle border border-2 border-white shadow-sm mb-2"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />

                  <h3 className="h5 fw-bold mb-0">{user.name}</h3>
                  <p className="xsmall text-white-50 mb-2">{user.major}</p>

                  <div className="badge bg-white text-dark font-monospace fw-bold px-3 py-1 mb-3">
                    {user.studentId}
                  </div>

                  <div className="p-2 bg-white rounded-3 d-inline-block shadow-sm">
                    {/* Simulated Clean QR Code */}
                    <div className="d-flex flex-wrap align-items-center justify-content-center gap-1 p-1" style={{ width: '100px', height: '100px', background: '#000' }}>
                      <div className="w-100 h-100 bg-white d-flex align-items-center justify-content-center text-dark font-monospace fw-bold xsmall">
                        [QR PASS]
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={() => setShowStudentPass(false)} className="btn btn-light rounded-pill w-100 text-secondary">
                  Close Student ID
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
