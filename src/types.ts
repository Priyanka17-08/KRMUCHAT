export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'faculty';
}

export interface Student extends User {
  role: 'student';
  rollNumber: string;
  course: string;
  semester: number;
  attendance: number;
  cgpa: number;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  department: string;
  content: string;
  priority: 'high' | 'normal' | 'low';
}

export interface Faculty {
  id: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  officeHours: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  professor: string;
  schedule: string;
}

export interface TimetableEntry {
  day: string;
  time: string;
  course: string;
  room: string;
  professor: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface PlacementInfo {
  id: string;
  companyName: string;
  role: string;
  package: string;
  deadline: string;
  eligibleCourses: string[];
}
