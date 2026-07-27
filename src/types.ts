export type PageView = 'landing' | 'login' | 'register' | 'portal';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  major: string;
  yearLevel: string;
  gpa: number;
  attendanceRate: number;
  credits: number;
  avatarUrl: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  schedule: string;
  room: string;
  credits: number;
  grade: string;
  percentage: number;
  color: string;
  nextAssignment: string;
  dueDate: string;
}

export interface StatItem {
  number: string;
  label: string;
  icon: string;
  description: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface CampusNotice {
  id: string;
  title: string;
  category: 'Academic' | 'Event' | 'Notice' | 'Exam';
  date: string;
  author: string;
  urgent?: boolean;
}

export interface PasswordStrength {
  score: number; // 0 - 4
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Extremely Secure';
  color: string;
  percent: number;
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'warning';
}
