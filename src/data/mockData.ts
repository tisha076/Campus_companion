import { Course, ScheduleItem, Assignment, Announcement, Testimonial, Feature, StatItem, UserProfile, NoteItem, AttendanceRecord } from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@university.edu',
  studentId: 'STU-2024-8892',
  major: 'Computer Science & Software Engineering',
  year: 'Senior (Year 4)',
  gpa: 3.88,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  creditsEarned: 104,
};

export const mockCourses: Course[] = [
  {
    id: 'c1',
    code: 'CS 302',
    title: 'Web Programming & Modern Frameworks',
    instructor: 'Dr. Sarah Jenkins',
    schedule: 'Mon & Wed • 10:00 AM - 11:30 AM',
    room: 'Tech Hub 402',
    credits: 4,
    grade: 'A',
    progress: 92,
    color: '#2563eb'
  },
  {
    id: 'c2',
    code: 'CS 401',
    title: 'Artificial Intelligence & Neural Networks',
    instructor: 'Prof. Robert Chen',
    schedule: 'Tue & Thu • 01:00 PM - 02:30 PM',
    room: 'Science Bld 108',
    credits: 4,
    grade: 'A-',
    progress: 88,
    color: '#7c3aed'
  },
  {
    id: 'c3',
    code: 'MA 201',
    title: 'Linear Algebra & Optimization',
    instructor: 'Dr. Elena Rostova',
    schedule: 'Mon & Wed • 02:00 PM - 03:30 PM',
    room: 'Math Annex 204',
    credits: 3,
    grade: 'B+',
    progress: 81,
    color: '#059669'
  },
  {
    id: 'c4',
    code: 'EN 110',
    title: 'Technical Communication & Rhetoric',
    instructor: 'Prof. Marcus Vance',
    schedule: 'Fri • 09:00 AM - 12:00 PM',
    room: 'Humanities 312',
    credits: 3,
    grade: 'A',
    progress: 95,
    color: '#d97706'
  }
];

export const mockSchedule: ScheduleItem[] = [
  { id: 's1', courseCode: 'CS 302', title: 'Web Programming Lecture', time: '10:00 AM - 11:30 AM', day: 'Mon', room: 'Tech Hub 402', instructor: 'Dr. Sarah Jenkins', type: 'Lecture' },
  { id: 's2', courseCode: 'MA 201', title: 'Linear Algebra Recitation', time: '02:00 PM - 03:30 PM', day: 'Mon', room: 'Math Annex 204', instructor: 'Dr. Elena Rostova', type: 'Seminar' },
  { id: 's3', courseCode: 'CS 401', title: 'AI Lab & Machine Learning', time: '01:00 PM - 02:30 PM', day: 'Tue', room: 'Science Bld 108', instructor: 'Prof. Robert Chen', type: 'Lab' },
  { id: 's4', courseCode: 'CS 302', title: 'Web Dev Workshop', time: '10:00 AM - 11:30 AM', day: 'Wed', room: 'Tech Hub 402', instructor: 'Dr. Sarah Jenkins', type: 'Lab' },
  { id: 's5', courseCode: 'MA 201', title: 'Linear Algebra', time: '02:00 PM - 03:30 PM', day: 'Wed', room: 'Math Annex 204', instructor: 'Dr. Elena Rostova', type: 'Lecture' },
  { id: 's6', courseCode: 'CS 401', title: 'Neural Networks Theory', time: '01:00 PM - 02:30 PM', day: 'Thu', room: 'Science Bld 108', instructor: 'Prof. Robert Chen', type: 'Lecture' },
  { id: 's7', courseCode: 'EN 110', title: 'Technical Writing Seminar', time: '09:00 AM - 12:00 PM', day: 'Fri', room: 'Humanities 312', instructor: 'Prof. Marcus Vance', type: 'Seminar' },
];

export const mockAssignments: Assignment[] = [
  {
    id: 'a1',
    title: 'Frontend Web Portal Project Submission',
    courseCode: 'CS 302',
    dueDate: '2026-08-05',
    dueTime: '11:59 PM',
    status: 'In Progress',
    priority: 'High'
  },
  {
    id: 'a2',
    title: 'Neural Network Model Hyperparameter Tuning',
    courseCode: 'CS 401',
    dueDate: '2026-08-08',
    dueTime: '05:00 PM',
    status: 'Pending',
    priority: 'High'
  },
  {
    id: 'a3',
    title: 'Matrix Eigenvalues Problem Set 4',
    courseCode: 'MA 201',
    dueDate: '2026-08-10',
    dueTime: '11:59 PM',
    status: 'Pending',
    priority: 'Medium'
  },
  {
    id: 'a4',
    title: 'Draft Technical Proposal for Software Project',
    courseCode: 'EN 110',
    dueDate: '2026-08-02',
    dueTime: '08:00 PM',
    status: 'Completed',
    priority: 'Low'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'an1',
    title: 'Fall 2026 Course Registration Window Opens Next Week',
    category: 'Academic',
    date: 'August 1, 2026',
    summary: 'Check your student advisor portal to clear any holds before priority enrollment starts on August 10.',
    author: 'Office of the Registrar'
  },
  {
    id: 'an2',
    title: 'Annual Campus Hackathon & Tech Expo 2026',
    category: 'Event',
    date: 'July 29, 2026',
    summary: 'Join over 500 student developers, designers, and innovators for 36 hours of creation and over $15,000 in prizes.',
    author: 'Computer Science Department'
  },
  {
    id: 'an3',
    title: 'Library Hours Extended for Midterm Study Weeks',
    category: 'Campus Life',
    date: 'July 25, 2026',
    summary: 'The Main University Library and 24/7 Study Commons will offer complimentary coffee and quiet zones through midnight.',
    author: 'University Libraries'
  }
];

export const mockFeatures: Feature[] = [
  {
    id: 'f1',
    icon: 'bi-speedometer2',
    title: 'Student Dashboard',
    description: 'Central academic hub with course progress, stats summary, daily timetable preview, and upcoming deadlines.',
    badge: 'Core Hub',
    targetView: 'dashboard',
    buttonText: 'Explore Dashboard'
  },
  {
    id: 'f2',
    icon: 'bi-calendar-week',
    title: 'Class Routine & Schedule',
    description: 'Weekly lecture timetable with room locations, instructor details, time slots, and day-by-day filter.',
    badge: 'Timetable',
    targetView: 'routine',
    buttonText: 'View Class Routine'
  },
  {
    id: 'f3',
    icon: 'bi-check2-square',
    title: 'Assignment Tracker',
    description: 'Manage assignment deadlines, track submission status, set priorities, and add new academic tasks.',
    badge: 'Task Manager',
    targetView: 'assignments',
    buttonText: 'Track Assignments'
  },
  {
    id: 'f4',
    icon: 'bi-percent',
    title: 'Attendance Calculator',
    description: 'Monitor course attendance percentages, check exam eligibility thresholds, and calculate safe miss margins.',
    badge: 'Eligibility Tool',
    targetView: 'attendance',
    buttonText: 'Calculate Attendance'
  },
  {
    id: 'f5',
    icon: 'bi-calculator',
    title: 'CGPA Calculator',
    description: 'Calculate semester GPA and cumulative CGPA on a 4.0 academic scale with instant letter grade points.',
    badge: 'Grade Tool',
    targetView: 'cgpa',
    buttonText: 'Calculate CGPA'
  },
  {
    id: 'f6',
    icon: 'bi-journal-text',
    title: 'Digital Study Notes',
    description: 'Organize lecture summaries, exam preparation guides, and revision materials with category tags.',
    badge: 'Study Hub',
    targetView: 'notes',
    buttonText: 'View Study Notes'
  },
  {
    id: 'f7',
    icon: 'bi-person-badge',
    title: 'Student Profile',
    description: 'Manage student records, view major details, track earned credit totals, and view digital student pass.',
    badge: 'Records',
    targetView: 'profile',
    buttonText: 'View Student Profile'
  }
];

export const mockStats: StatItem[] = [
  {
    id: 's1',
    icon: 'bi-people',
    value: '18,500',
    numericValue: 18500,
    suffix: '+',
    label: 'Active Students',
    description: 'Empowered across 12 academic faculties'
  },
  {
    id: 's2',
    icon: 'bi-mortarboard',
    value: '98.4',
    numericValue: 98.4,
    suffix: '%',
    label: 'Graduation Rate',
    description: 'Consistently ranked in national top 5%'
  },
  {
    id: 's3',
    icon: 'bi-journal-check',
    value: '420',
    numericValue: 420,
    suffix: '+',
    label: 'Courses Offered',
    description: 'Comprehensive undergraduate & master tracks'
  },
  {
    id: 's4',
    icon: 'bi-award',
    value: '3.82',
    numericValue: 3.82,
    suffix: '',
    label: 'Avg Student GPA',
    description: 'Demonstrating academic excellence'
  }
];

export const mockNotes: NoteItem[] = [
  {
    id: 'n1',
    title: 'DOM Manipulation & Event Listeners in JavaScript',
    courseCode: 'CS 302',
    content: 'Key concepts: addEventListener, event bubbling vs capturing, querySelectorAll, modifying style properties, and form validation techniques.',
    date: 'Aug 02, 2026',
    category: 'Lecture Note'
  },
  {
    id: 'n2',
    title: 'Supervised vs Unsupervised Learning Summary',
    courseCode: 'CS 401',
    content: 'Supervised learning uses labeled training data (classification, regression). Unsupervised uses unlabeled data (clustering, PCA). Exam focus on backpropagation.',
    date: 'Jul 28, 2026',
    category: 'Exam Prep'
  },
  {
    id: 'n3',
    title: 'Matrix Diagonalization Formulas',
    courseCode: 'MA 201',
    content: 'A = PDP^-1 where P consists of eigenvectors and D is diagonal matrix of corresponding eigenvalues.',
    date: 'Jul 24, 2026',
    category: 'Lecture Note'
  }
];

export const mockAttendance: AttendanceRecord[] = [
  { id: 'att1', courseCode: 'CS 302', courseTitle: 'Web Programming & Modern Frameworks', totalClasses: 20, attendedClasses: 19 },
  { id: 'att2', courseCode: 'CS 401', courseTitle: 'Artificial Intelligence & Neural Networks', totalClasses: 18, attendedClasses: 16 },
  { id: 'att3', courseCode: 'MA 201', courseTitle: 'Linear Algebra & Optimization', totalClasses: 16, attendedClasses: 14 },
  { id: 'att4', courseCode: 'EN 110', courseTitle: 'Technical Communication & Rhetoric', totalClasses: 12, attendedClasses: 12 }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sophia Martinez',
    role: 'Computer Science Major',
    major: 'Class of 2026',
    comment: 'Campus Companion transformed how I manage my coursework. The glassmorphism UI is stunning, and having my schedule and assignments in one place saved my semester!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't2',
    name: 'David K. Chen',
    role: 'Biomedical Engineering',
    major: 'Class of 2025',
    comment: 'The password security meter and multi-step registration feel so premium! It feels like an official Apple product for university students.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 't3',
    name: 'Emily Watson',
    role: 'Business & Finance',
    major: 'Class of 2027',
    comment: 'Dark mode is a lifesaver during 2:00 AM study sessions in the library. The assignment status filters keep me completely organized.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  }
];
