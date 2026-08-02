import React, { useState } from 'react';
import { UserProfile, Course, ScheduleItem, Assignment, Announcement } from '../types';
import { mockCourses, mockSchedule, mockAssignments, mockAnnouncements } from '../data/mockData';
import { createRipple } from '../utils/ripple';
import { GpaSimulatorWidget } from './GpaSimulatorWidget';
import { FocusTimerWidget } from './FocusTimerWidget';

interface DashboardPageProps {
  user: UserProfile;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [courses] = useState<Course[]>(mockCourses);
  const [schedule] = useState<ScheduleItem[]>(mockSchedule);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [announcements] = useState<Announcement[]>(mockAnnouncements);
  
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('Mon');
  const [assignmentFilter, setAssignmentFilter] = useState<'All' | 'Pending' | 'In Progress' | 'Completed'>('All');
  const [showStudentPass, setShowStudentPass] = useState(false);

  // Filter assignments
  const filteredAssignments = assignments.filter((a) => {
    if (assignmentFilter === 'All') return true;
    return a.status === assignmentFilter;
  });

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
        <div className="position-absolute top-0 end-0 p-3 opacity-10 d-none d-md-block">
          <i className="bi bi-mortarboard-fill display-1 text-primary"></i>
        </div>

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
              onClick={(e) => { createRipple(e); setShowStudentPass(true); }}
              className="btn btn-primary rounded-pill px-4 py-2.5 bg-gradient-accent border-0 fw-bold btn-ripple shadow-sm d-inline-flex align-items-center gap-2"
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
              <div className="text-success xsmall fw-medium" style={{ fontSize: '0.7rem' }}>Top 5% of Faculty</div>
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
              <div className="text-muted xsmall" style={{ fontSize: '0.7rem' }}>14 Total Credits</div>
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
              <div className="text-success xsmall fw-medium" style={{ fontSize: '0.7rem' }}>Excellent standing</div>
            </div>
          </div>
        </div>
      </div>

      {/* What-If GPA Simulator Widget */}
      <GpaSimulatorWidget user={user} />

      {/* Focus Timer Pomodoro Widget */}
      <FocusTimerWidget />

      {/* Main Content Layout: Left Schedule & Courses, Right Assignments & News */}
      <div className="row g-4">
        
        {/* Left Column */}
        <div className="col-lg-7">
          
          {/* Interactive Class Schedule */}
          <div className="glass-card p-4 rounded-4 mb-4">
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-3 gap-2">
              <div>
                <h2 className="h5 fw-extrabold text-body mb-0">Class Schedule & Timetable</h2>
                <span className="text-muted xsmall">Weekly interactive lecture agenda</span>
              </div>

              {/* Day Selector Tabs */}
              <div className="btn-group btn-group-sm rounded-pill p-1 bg-body-tertiary border border-subtle">
                {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const).map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`btn rounded-pill px-2.5 py-1 fw-bold text-uppercase ${selectedDay === day ? 'btn-primary bg-gradient-accent text-white shadow-sm' : 'btn-light border-0 text-secondary'}`}
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
                No scheduled lectures or labs for {selectedDay}. Enjoy your study time!
              </div>
            )}
          </div>

          {/* Enrolled Courses & Progress */}
          <div className="glass-card p-4 rounded-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h2 className="h5 fw-extrabold text-body mb-0">Enrolled Courses & Progress</h2>
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
                        <span className="text-muted">Syllabus Completed</span>
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

        {/* Right Column */}
        <div className="col-lg-5">
          
          {/* Assignment Tracker */}
          <div className="glass-card p-4 rounded-4 mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h2 className="h5 fw-extrabold text-body mb-0">Assignment Tracker</h2>
                <span className="text-muted xsmall">Interactive deadline management</span>
              </div>

              {/* Status Filter Dropdown */}
              <select
                className="form-select form-select-sm rounded-pill border-subtle bg-body-tertiary w-auto text-body fw-semibold"
                value={assignmentFilter}
                onChange={(e) => setAssignmentFilter(e.target.value as any)}
                style={{ fontSize: '0.78rem' }}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Assignments List */}
            <div className="d-flex flex-column gap-2.5">
              {filteredAssignments.map((a) => (
                <div key={a.id} className="p-3 rounded-3 bg-body-tertiary border border-subtle d-flex align-items-start justify-content-between gap-2">
                  <div className="d-flex align-items-start gap-2.5">
                    <button
                      onClick={() => handleToggleAssignmentStatus(a.id)}
                      className={`btn btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center border-0 flex-shrink-0 mt-0.5 ${a.status === 'Completed' ? 'bg-success text-white' : 'bg-secondary-subtle text-secondary'}`}
                      style={{ width: '24px', height: '24px' }}
                      title="Toggle completed state"
                    >
                      <i className={`bi ${a.status === 'Completed' ? 'bi-check-lg' : 'bi-circle'}`}></i>
                    </button>

                    <div>
                      <div className={`fw-bold small text-body ${a.status === 'Completed' ? 'text-decoration-line-through text-muted' : ''}`}>
                        {a.title}
                      </div>
                      <div className="text-muted xsmall">
                        {a.courseCode} • Due {a.dueDate} ({a.dueTime})
                      </div>
                    </div>
                  </div>

                  <span className={`badge rounded-pill px-2.5 py-1 text-uppercase fw-semibold ${
                    a.status === 'Completed' ? 'bg-success-subtle text-success border border-success-subtle' :
                    a.status === 'In Progress' ? 'bg-primary-subtle text-primary border border-primary-subtle' :
                    'bg-warning-subtle text-warning border border-warning-subtle'
                  }`} style={{ fontSize: '0.68rem' }}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Campus News & Announcements */}
          <div className="glass-card p-4 rounded-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h2 className="h5 fw-extrabold text-body mb-0">Campus Bulletin</h2>
                <span className="text-muted xsmall">Official university updates</span>
              </div>
              <i className="bi bi-bell-fill text-primary fs-5"></i>
            </div>

            <div className="d-flex flex-column gap-3">
              {announcements.map((an) => (
                <div key={an.id} className="p-3 rounded-3 bg-body-tertiary border border-subtle">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-0.5 fw-semibold" style={{ fontSize: '0.68rem' }}>
                      {an.category}
                    </span>
                    <span className="text-muted xsmall" style={{ fontSize: '0.72rem' }}>{an.date}</span>
                  </div>

                  <h3 className="fw-bold text-body mb-1 fs-6">{an.title}</h3>
                  <p className="text-secondary xsmall mb-2 lh-relaxed" style={{ fontSize: '0.8rem' }}>{an.summary}</p>
                  
                  <div className="text-muted xsmall fw-medium" style={{ fontSize: '0.72rem' }}>
                    Posted by: {an.author}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Digital Student Pass Modal */}
      {showStudentPass && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(12px)' }}>
          <div className="modal-dialog modal-dialog-centered max-w-sm">
            <div className="modal-content glass-modal border-0 p-4 position-relative overflow-hidden text-center">
              
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-3"
                onClick={() => setShowStudentPass(false)}
              ></button>

              <div className="py-2">
                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                  <div className="d-flex align-items-center justify-content-center rounded-3 bg-gradient-accent text-white p-2 shadow-sm" style={{ width: '32px', height: '32px' }}>
                    <i className="bi bi-mortarboard-fill fs-6"></i>
                  </div>
                  <span className="fw-extrabold text-body small tracking-tight">CAMPUS COMPANION PASS</span>
                </div>

                {/* Avatar */}
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="rounded-circle shadow-md mb-3 border border-3 border-primary"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />

                <h4 className="fw-extrabold text-body mb-0">{user.name}</h4>
                <div className="text-primary fw-bold small mb-2">{user.studentId}</div>
                
                <div className="p-3 rounded-3 bg-body-tertiary border border-subtle mb-3 text-start xsmall">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Faculty:</span>
                    <span className="fw-semibold text-body">Engineering & Tech</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Major:</span>
                    <span className="fw-semibold text-body">{user.major.split('&')[0]}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Validity:</span>
                    <span className="fw-semibold text-success">Valid thru 2027</span>
                  </div>
                </div>

                {/* Simulated Barcode */}
                <div className="p-3 rounded-3 bg-white text-dark d-flex flex-column align-items-center justify-content-center border shadow-inner">
                  <div className="d-flex gap-1 mb-1" style={{ height: '38px' }}>
                    {[...Array(24)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-dark h-100"
                        style={{ width: i % 3 === 0 ? '4px' : '2px', opacity: i % 4 === 0 ? 0.4 : 1 }}
                      ></div>
                    ))}
                  </div>
                  <div className="font-monospace xsmall fw-bold text-muted" style={{ letterSpacing: '0.15em', fontSize: '0.68rem' }}>
                    *{user.studentId}*
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
