import { mockCourses } from './mockCourses';

// Mock initial enrollments (pre-existing data)
export const generateMockEnrollments = () => {
  const students = [
    { id: 'u1', name: 'Priya Sharma', email: 'priya@example.com', avatar: 'PS' },
    { id: 'u2', name: 'Rahul Gupta', email: 'rahul@example.com', avatar: 'RG' },
    { id: 'u3', name: 'Aisha Khan', email: 'aisha@example.com', avatar: 'AK' },
    { id: 'u4', name: 'Vikram Patel', email: 'vikram@example.com', avatar: 'VP' },
    { id: 'u5', name: 'Sara Johnson', email: 'sara@example.com', avatar: 'SJ' },
    { id: 'u6', name: 'Chen Wei', email: 'chen@example.com', avatar: 'CW' },
    { id: 'u7', name: 'James Wilson', email: 'james@example.com', avatar: 'JW' },
    { id: 'u8', name: 'Fatima Al-Rashid', email: 'fatima@example.com', avatar: 'FA' },
  ];
  const enrollments: any[] = [];
  let id = 1;
  mockCourses.forEach((course) => {
    // Generate between 2 to 6 random enrollments per course
    const count = Math.floor(Math.random() * 5) + 2;
    students.slice(0, count).forEach((student) => {
      const progress = Math.floor(Math.random() * 100);
      enrollments.push({
        id: `enr-${id++}`,
        studentId: student.id,
        studentName: student.name,
        studentEmail: student.email,
        studentAvatar: student.avatar,
        courseId: course.id,
        courseTitle: course.title,
        courseType: course.type,
        instructorName: course.instructor,
        enrolledAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress,
        status: progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'enrolled',
        lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        certificateIssued: progress === 100,
      });
    });
  });
  return enrollments;
};

// Initialize from localStorage or generate fresh
export const getEnrollments = (): any[] => {
  const stored = localStorage.getItem('enrollments');
  if (stored) return JSON.parse(stored);
  const fresh = generateMockEnrollments();
  localStorage.setItem('enrollments', JSON.stringify(fresh));
  return fresh;
};

export const addEnrollment = (studentData: any, course: any): boolean => {
  const enrollments = getEnrollments();
  const exists = enrollments.find(
    (e) => e.studentId === studentData.id && e.courseId === course.id
  );
  if (exists) return false;
  const newEnrollment = {
    id: `enr-${Date.now()}`,
    studentId: studentData.id,
    studentName: studentData.name,
    studentEmail: studentData.email,
    studentAvatar: studentData.name?.slice(0, 2).toUpperCase() || 'ST',
    courseId: course.id,
    courseTitle: course.title,
    courseType: course.type,
    instructorName: course.instructor,
    enrolledAt: new Date().toISOString().split('T')[0],
    progress: 0,
    status: 'enrolled',
    lastActive: new Date().toISOString().split('T')[0],
    certificateIssued: false,
  };
  const updated = [newEnrollment, ...enrollments];
  localStorage.setItem('enrollments', JSON.stringify(updated));
  return true;
};
