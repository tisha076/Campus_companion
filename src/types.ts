export type PageView = 'landing' | 'login' | 'register' | 'dashboard';

export interface UserProfile {
  name: string;
  email: string;
  studentId: string;
  major: string;
  year: string;
  gpa: number;
  avatarUrl: string;
  creditsEarned: number;
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
  progress: number;
  color: string;
}

export interface ScheduleItem {
  id: string;
  courseCode: string;
  title: string;
  time: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  room: string;
  instructor: string;
  type: 'Lecture' | 'Lab' | 'Seminar';
}

export interface Assignment {
  id: string;
  title: string;
  courseCode: string;
  dueDate: string;
  dueTime: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Academic' | 'Event' | 'Campus Life' | 'Urgent';
  date: string;
  summary: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  major: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge?: string;
}

export interface StatItem {
  id: string;
  icon: string;
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  description: string;
}
