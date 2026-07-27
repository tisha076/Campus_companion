import React, { useState } from 'react';
import { Course } from '../types';
import { mockStudentProfile, mockCourses, mockNotices } from '../data/mockData';
import { RippleButton } from './RippleButton';

interface StudentPortalProps {
  studentName?: string;
  showToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  studentName = 'Alex Rivera',
  showToast,
}) => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('Wed');
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'simulator' | 'idpass'>('overview');
  const [idCardFlipped, setIdCardFlipped] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Simulation scores adjustment
  const [simulatedScores, setSimulatedScores] = useState<Record<string, number>>({
    cs401: 95,
    cs420: 91,
    ds310: 98,
    se450: 92,
  });

  // Recalculate projected GPA based on simulated scores
  const calculateSimulatedGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const score = simulatedScores[course.id] ?? course.percentage;
      let gradePoint = 4.0;
      if (score >= 93) gradePoint = 4.0;
      else if (score >= 90) gradePoint = 3.7;
      else if (score >= 87) gradePoint = 3.3;
      else if (score >= 83) gradePoint = 3.0;
      else if (score >= 80) gradePoint = 2.7;
      else gradePoint = 2.0;

      totalPoints += gradePoint * course.credits;
      totalCredits += course.credits;
    });

    return (totalPoints / totalCredits).toFixed(2);
  };

  const projectedGPA = calculateSimulatedGPA();

  const handleTaskToggle = (id: string) => {
    setCompletedTasks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        showToast('Assignment marked as completed!', 'success');
      }
      return next;
    });
  };

  const handleSimScoreChange = (courseId: string, val: number) => {
    setSimulatedScores((prev) => ({ ...prev, [courseId]: val }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setUploadedFiles((prev) => [...prev, fileName]);
      showToast(`Uploaded ${fileName} to Course Portal`, 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* PROFILE WELCOME HEADER BANNER */}
      <div className="glass-panel p-6 sm:p-8 border border-white/80 dark:border-white/10 relative overflow-hidden bg-gradient-to-r from-indigo-900/40 via-slate-900/60 to-purple-900/40">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={mockStudentProfile.avatarUrl}
                alt={studentName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-indigo-500/40 shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] text-white">
                <i className="bi bi-check" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                  Welcome back, {studentName}!
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30">
                  {mockStudentProfile.yearLevel}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {mockStudentProfile.major} • ID: <span className="font-mono font-semibold">{mockStudentProfile.studentId}</span>
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {mockStudentProfile.department}
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 sm:gap-6 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            <div className="glass-card px-4 py-3 border border-indigo-500/20 text-center min-w-[100px]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Current GPA</p>
              <p className="text-2xl font-extrabold font-heading text-indigo-600 dark:text-indigo-400">{mockStudentProfile.gpa}</p>
            </div>

            <div className="glass-card px-4 py-3 border border-emerald-500/20 text-center min-w-[100px]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Attendance</p>
              <p className="text-2xl font-extrabold font-heading text-emerald-600 dark:text-emerald-400">{mockStudentProfile.attendanceRate}%</p>
            </div>

            <div className="glass-card px-4 py-3 border border-purple-500/20 text-center min-w-[100px]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Credits Passed</p>
              <p className="text-2xl font-extrabold font-heading text-purple-600 dark:text-purple-400">{mockStudentProfile.credits}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PORTAL VIEW SWITCHER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200/80 dark:border-slate-800/80">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:text-indigo-600'
          }`}
        >
          <i className="bi bi-grid-1x2-fill" />
          Dashboard Overview
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'courses'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:text-indigo-600'
          }`}
        >
          <i className="bi bi-journal-check" />
          Enrolled Courses ({courses.length})
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'simulator'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:text-indigo-600'
          }`}
        >
          <i className="bi bi-calculator-fill text-amber-300" />
          GPA Grade Simulator
        </button>

        <button
          onClick={() => setActiveTab('idpass')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'idpass'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:text-indigo-600'
          }`}
        >
          <i className="bi bi-qr-code-scan" />
          Digital Student ID Pass
        </button>
      </div>

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (8 cols): Schedule & Tasks */}
          <div className="lg:col-span-8 space-y-8">

            {/* FROSTED GLASS METRIC CARDS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* GPA Conic Ring Card */}
              <div className="glass-card rounded-3xl p-6 flex flex-col items-center text-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 gpa-ring rounded-full opacity-90" />
                  <div className="absolute inset-2 bg-slate-900 dark:bg-[#0a0c14] rounded-full flex items-center justify-center">
                    <span className="text-2xl font-extrabold font-heading text-white">{mockStudentProfile.gpa}</span>
                  </div>
                </div>
                <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Current GPA</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 uppercase font-bold tracking-tight">+0.2 Semester Avg</span>
              </div>

              {/* Course Credits Card */}
              <div className="glass-card rounded-3xl p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">18</span>
                  <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <i className="bi bi-book-fill text-lg" />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Course Credits</span>
                  <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[70%]" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">70% of Degree Req. Completed</p>
                </div>
              </div>

              {/* Campus Credits Card */}
              <div className="glass-card rounded-3xl p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl font-extrabold font-heading text-slate-900 dark:text-white">420</span>
                  <div className="p-2.5 bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400">
                    <i className="bi bi-coin text-lg" />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Campus Credits</span>
                  <button
                    onClick={() => showToast('Redeemed 50 Campus Credits for Library Express Pass!', 'success')}
                    className="mt-3 w-full py-2 bg-indigo-500/10 dark:bg-white/5 border border-indigo-500/20 dark:border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-500/20 dark:hover:bg-white/10 transition-all cursor-pointer text-indigo-600 dark:text-indigo-300"
                  >
                    Redeem Rewards
                  </button>
                </div>
              </div>
            </div>
            
            {/* WEEKLY TIMETABLE SCHEDULE */}
            <div className="glass-panel p-6 border border-white/80 dark:border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <i className="bi bi-calendar-week text-indigo-500" />
                    Interactive Class Schedule
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Select a day to inspect lecture locations, times and professors
                  </p>
                </div>

                {/* Day selector pills */}
                <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800/60 p-1 rounded-xl">
                  {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const).map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        selectedDay === day
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule Item List */}
              <div className="space-y-3 pt-2">
                {courses
                  .filter((c) => c.schedule.includes(selectedDay) || selectedDay === 'Wed')
                  .map((course) => (
                    <div
                      key={course.id}
                      className="glass-card p-4 border border-white/60 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-indigo-500/40 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${course.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                          {course.code.replace(' ', '')}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {course.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3 mt-0.5">
                            <span><i className="bi bi-person-fill text-indigo-500 me-1" />{course.instructor}</span>
                            <span><i className="bi bi-geo-alt-fill text-rose-500 me-1" />{course.room}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/50 dark:border-slate-800/50">
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 block">
                          <i className="bi bi-clock me-1" />
                          {course.schedule.split('•')[1] || '10:00 AM - 11:30 AM'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {course.credits} Credits
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* ASSIGNMENT CHECKLIST & SUBMISSION SIMULATOR */}
            <div className="glass-panel p-6 border border-white/80 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                    <i className="bi bi-check2-square text-indigo-500" />
                    Pending Academic Assignments
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Track upcoming homework, lab reports, and upload submission drafts
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      completedTasks[course.id]
                        ? 'bg-emerald-500/10 border-emerald-500/30 line-through text-slate-400'
                        : 'glass-card border-white/60 dark:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!completedTasks[course.id]}
                        onChange={() => handleTaskToggle(course.id)}
                        className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 cursor-pointer"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          [{course.code}] {course.nextAssignment}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Due: <strong className="text-indigo-600 dark:text-indigo-400">{course.dueDate}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 rounded-lg glass-card hover:bg-white dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 cursor-pointer flex items-center gap-1.5">
                        <i className="bi bi-cloud-arrow-up-fill text-indigo-500" />
                        <span>Upload File</span>
                        <input type="file" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                ))}

                {uploadedFiles.length > 0 && (
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-slate-700 dark:text-slate-300">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">Uploaded Drafts in Session:</p>
                    <ul className="list-disc list-inside space-y-0.5 font-mono text-[11px]">
                      {uploadedFiles.map((file, idx) => (
                        <li key={idx}>{file}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column (4 cols): Campus Notices & Quick Actions */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* CAMPUS NOTICES FEED */}
            <div className="glass-panel p-6 border border-white/80 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                  <i className="bi bi-bell-fill text-amber-500" />
                  Campus Announcements
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  LIVE
                </span>
              </div>

              <div className="space-y-3">
                {mockNotices.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-3 rounded-xl glass-card border border-slate-200/60 dark:border-slate-800/60 hover:border-indigo-500/40 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                        notice.urgent ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
                      }`}>
                        {notice.category}
                      </span>
                      <span className="text-[10px] text-slate-400">{notice.date}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      {notice.title}
                    </h4>

                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      From: {notice.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK LINK ACTION TILES */}
            <div className="glass-panel p-6 border border-white/80 dark:border-white/10 space-y-3">
              <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-white mb-2">
                Student Resources
              </h3>

              <button
                onClick={() => showToast('University Digital Library Catalog opened in new tab', 'info')}
                className="w-full p-3 rounded-xl glass-card border border-slate-200/60 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <i className="bi bi-journal-bookmark-fill text-indigo-500" />
                  Library E-Books Catalog
                </span>
                <i className="bi bi-box-arrow-up-right text-slate-400" />
              </button>

              <button
                onClick={() => showToast('Tuition fee receipt PDF generated', 'success')}
                className="w-full p-3 rounded-xl glass-card border border-slate-200/60 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <i className="bi bi-file-earmark-pdf-fill text-rose-500" />
                  Download Tuition Receipt
                </span>
                <i className="bi bi-download text-slate-400" />
              </button>

              <button
                onClick={() => showToast('Campus Wi-Fi credentials copied to clipboard', 'info')}
                className="w-full p-3 rounded-xl glass-card border border-slate-200/60 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <i className="bi bi-wifi text-emerald-500" />
                  High-Speed Campus Wi-Fi Key
                </span>
                <i className="bi bi-copy text-slate-400" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: ENROLLED COURSES */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="glass-card p-6 border border-white/80 dark:border-white/10 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${course.color} flex items-center justify-center text-white font-bold text-base shadow-lg`}>
                    {course.code.replace(' ', '')}
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Instructor: {course.instructor}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                  Grade: {course.grade} ({course.percentage}%)
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-800/50">
                  <span className="text-slate-400">Lecture Time:</span>
                  <span className="font-semibold">{course.schedule}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-800/50">
                  <span className="text-slate-400">Classroom Location:</span>
                  <span className="font-semibold">{course.room}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Next Deliverable:</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">{course.nextAssignment}</span>
                </div>
              </div>

              <div className="pt-2">
                <RippleButton
                  onClick={() => showToast(`Course syllabus notebook downloaded for ${course.code}`, 'info')}
                  variant="outline"
                  className="w-full py-2 text-xs"
                >
                  <i className="bi bi-file-earmark-text" />
                  View Course Syllabus & Materials
                </RippleButton>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: GPA GRADE SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="glass-panel p-8 border border-white/80 dark:border-white/10 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
            <div>
              <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                <i className="bi bi-calculator-fill text-amber-500" />
                Predictive GPA & Honors Simulator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adjust slider targets for upcoming final exams to calculate your projected end-of-semester honors GPA!
              </p>
            </div>

            <div className="glass-card px-6 py-4 border border-indigo-500/30 text-center bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Projected Honors GPA
              </span>
              <p className="text-3xl font-extrabold font-heading text-indigo-600 dark:text-indigo-400">
                {projectedGPA} <span className="text-xs text-slate-400 font-normal">/ 4.00</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => {
              const currentVal = simulatedScores[course.id] ?? course.percentage;
              return (
                <div key={course.id} className="glass-card p-6 border border-white/60 dark:border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                      {course.code}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                      Target Score: {currentVal}%
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {course.title}
                  </h4>

                  <input
                    type="range"
                    min="60"
                    max="100"
                    value={currentVal}
                    onChange={(e) => handleSimScoreChange(course.id, parseInt(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>60% (Pass)</span>
                    <span>80% (B)</span>
                    <span>100% (A+)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: DIGITAL STUDENT ID PASS */}
      {activeTab === 'idpass' && (
        <div className="max-w-md mx-auto py-8">
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
              Contactless Digital Student ID
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click pass card to flip between contactless NFC credentials and Emergency Info
            </p>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIdCardFlipped(!idCardFlipped)}
            className="w-full aspect-[1.58/1] cursor-pointer perspective-1000 group"
          >
            <div
              className={`relative w-full h-full duration-500 transition-transform transform-style-3d ${
                idCardFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* CARD FRONT */}
              <div className="absolute inset-0 glass-panel p-6 border border-white/80 dark:border-white/20 shadow-2xl bg-gradient-to-br from-indigo-900/90 via-slate-900/95 to-purple-900/90 text-white flex flex-col justify-between rounded-2xl backface-hidden overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <div className="flex items-center gap-2">
                    <i className="bi bi-mortarboard-fill text-xl text-indigo-400" />
                    <span className="text-xs font-bold font-heading tracking-tight">CAMPUS COMPANION</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    NFC ACTIVE
                  </span>
                </div>

                {/* Main Student Pass Info */}
                <div className="flex items-center gap-4 my-auto">
                  <img
                    src={mockStudentProfile.avatarUrl}
                    alt={studentName}
                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-indigo-400/50"
                  />
                  <div>
                    <h3 className="text-base font-extrabold tracking-tight">{studentName}</h3>
                    <p className="text-xs text-indigo-300">{mockStudentProfile.major}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {mockStudentProfile.studentId}</p>
                  </div>
                </div>

                {/* Barcode & Footer */}
                <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                  <div className="font-mono text-[9px] tracking-widest text-slate-400">
                    ||||||| | ||||| |||| |||||
                  </div>
                  <span className="text-[9px] text-indigo-300 flex items-center gap-1">
                    <i className="bi bi-arrow-repeat" />
                    Click to flip
                  </span>
                </div>
              </div>

              {/* CARD BACK */}
              <div className="absolute inset-0 glass-panel p-6 border border-white/80 dark:border-white/20 shadow-2xl bg-slate-900 text-white flex flex-col justify-between rounded-2xl backface-hidden rotate-y-180 overflow-hidden">
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-white/20 pb-2">
                    <span className="text-xs font-bold text-indigo-400">SECURITY & EMERGENCY CONTACT</span>
                    <i className="bi bi-shield-check text-emerald-400 text-base" />
                  </div>
                  <p className="text-[11px] text-slate-300">
                    If found, please return to Campus Central Security Hub or call: <strong className="text-indigo-300">+1 (800) 555-STUDENT</strong>
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    VALID THRU: 06/2028 • CAMPUS ACCESS LEVEL: ALLFACILITIES
                  </p>
                </div>

                <div className="text-center pt-2 border-t border-white/20">
                  <span className="text-[10px] text-indigo-300">
                    <i className="bi bi-hand-index-thumb me-1" />
                    Tap to flip card back
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
