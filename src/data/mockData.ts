import { Student, Course, Faculty, TimetableEntry, PlacementInfo } from '../types';

export const currentStudent: Student = {
  id: 'STU1001',
  name: 'Priyanka',
  email: 'priyanka@student.krmu.edu.in',
  role: 'student',
  rollNumber: '2401010116',
  course: 'B.Tech Computer Science',
  semester: 5,
  attendance: 85.4,
  cgpa: 8.8
};

export const courses: Course[] = [
  { id: 'C1', code: 'CSE301', name: 'Artificial Intelligence', credits: 4, professor: 'Dr. Vivek Singh', schedule: 'Mon/Wed 10:00 AM' },
  { id: 'C2', code: 'CSE302', name: 'Database Management Systems', credits: 4, professor: 'Dr. Neha Gupta', schedule: 'Tue/Thu 11:30 AM' },
  { id: 'C3', code: 'CSE303', name: 'Computer Networks', credits: 3, professor: 'Prof. Anil Kumar', schedule: 'Fri 9:00 AM' },
  { id: 'C4', code: 'ENG301', name: 'Professional Ethics', credits: 2, professor: 'Dr. Meera Reddy', schedule: 'Wed 2:00 PM' }
];

export const facultyMembers: Faculty[] = [
  { id: 'F1', name: 'Dr. Vivek Singh', department: 'Computer Science', designation: 'Associate Professor', email: 'vivek.singh@krmu.edu.in', phone: '+91 9876543210', officeHours: 'Mon/Wed 2-4 PM' },
  { id: 'F2', name: 'Dr. Neha Gupta', department: 'Computer Science', designation: 'Assistant Professor', email: 'neha.gupta@krmu.edu.in', phone: '+91 9876543211', officeHours: 'Tue/Thu 10-12 AM' },
  { id: 'F3', name: 'Prof. Anil Kumar', department: 'Information Technology', designation: 'Professor', email: 'anil.kumar@krmu.edu.in', phone: '+91 9876543212', officeHours: 'Fri 11 AM-1 PM' }
];

export const timetable: TimetableEntry[] = [
  { day: 'Monday', time: '10:00 - 11:30 AM', course: 'Artificial Intelligence', room: 'Block A - 204', professor: 'Dr. Vivek Singh' },
  { day: 'Monday', time: '11:45 - 01:15 PM', course: 'Database Management Systems', room: 'Block A - 205', professor: 'Dr. Neha Gupta' },
  { day: 'Tuesday', time: '09:00 - 10:30 AM', course: 'Computer Networks', room: 'Block B - 101', professor: 'Prof. Anil Kumar' },
  { day: 'Wednesday', time: '10:00 - 11:30 AM', course: 'Artificial Intelligence', room: 'Block A - 204', professor: 'Dr. Vivek Singh' },
  { day: 'Thursday', time: '11:45 - 01:15 PM', course: 'Database Management Systems', room: 'Block A - 205', professor: 'Dr. Neha Gupta' },
  { day: 'Friday', time: '09:00 - 10:30 AM', course: 'Computer Networks', room: 'Block B - 101', professor: 'Prof. Anil Kumar' },
];

export const placements: PlacementInfo[] = [
  { id: 'P1', companyName: 'Google', role: 'Software Engineer', package: '24 LPA', deadline: '2026-08-15', eligibleCourses: ['B.Tech CSE', 'B.Tech IT'] },
  { id: 'P2', companyName: 'Microsoft', role: 'SDE-1', package: '22 LPA', deadline: '2026-08-20', eligibleCourses: ['B.Tech CSE'] },
  { id: 'P3', companyName: 'TCS', role: 'System Engineer', package: '7 LPA', deadline: '2026-07-30', eligibleCourses: ['B.Tech All Branches', 'BCA', 'MCA'] },
  { id: 'P4', companyName: 'Deloitte', role: 'Analyst', package: '8.5 LPA', deadline: '2026-08-05', eligibleCourses: ['B.Tech CSE', 'BBA', 'MBA'] }
];
