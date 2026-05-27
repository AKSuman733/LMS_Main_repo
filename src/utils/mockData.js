import maheshImg from '../assets/mahesh.jpg';
import alluArjunImg from '../assets/allu_arjun.jpg';
import prabhasImg from '../assets/prabhas.jpg';
import ramCharanImg from '../assets/ram_charan.jpg';

export const MOCK_METRICS = {
  totalStudents: 3,
  totalCourses: 8,
  totalEnrollments: 6,
  completedCourses: 3
};

export const HERO_AVATARS = [
  {
    name: "Mass Hero Style (Mahesh Babu)",
    image: maheshImg
  },
  {
    name: "Stylish Star Style (Allu Arjun)",
    image: alluArjunImg
  },
  {
    name: "Classic Rebel Style (Prabhas)",
    image: prabhasImg
  },
  {
    name: "Young Energetic Style (Ram Charan)",
    image: ramCharanImg
  }
];

export const MOCK_COURSES = [
  {
    id: 1,
    title: 'Web Development Bootcamp',
    description: 'Learn HTML, CSS, JS, and React from scratch.',
    category: 'Web Development',
    level: 'Beginner',
    duration: '40 hours',
    image: HERO_AVATARS[0].image,
    lessons: [
      { id: 101, title: 'Introduction to HTML', content: 'HTML is the standard markup language for Web pages.' },
      { id: 102, title: 'CSS Basics', content: 'CSS is the language we use to style an HTML document.' },
      { id: 103, title: 'JavaScript Fundamentals', content: 'JavaScript is the programming language of the Web.' }
    ]
  },
  {
    id: 2,
    title: 'Mastering Node.js',
    description: 'Build scalable backend services with Express and Node.',
    category: 'Backend',
    level: 'Intermediate',
    duration: '20 hours',
    image: HERO_AVATARS[1].image,
    lessons: [
      { id: 201, title: 'Node.js Basics', content: 'Node.js is an open-source, cross-platform JavaScript runtime environment.' },
      { id: 202, title: 'Express Routing', content: 'Routing refers to how an applications endpoints (URIs) respond to client requests.' }
    ]
  },
  {
    id: 3,
    title: 'React for Beginners',
    description: 'Master modern React components, hooks, and routing.',
    category: 'Frontend',
    level: 'Beginner',
    duration: '15 hours',
    image: HERO_AVATARS[2].image,
    lessons: [
      { id: 301, title: 'What is React?', content: 'React is a library for building user interfaces.' },
      { id: 302, title: 'State and Props', content: 'State is local to a component, while props are passed in.' }
    ]
  },
  {
    id: 4,
    title: 'Java Masterclass',
    description: 'Learn Java from basics to advanced concepts like Multithreading.',
    category: 'Programming',
    level: 'Intermediate',
    duration: '60 hours',
    image: HERO_AVATARS[3].image,
    lessons: [
      { id: 401, title: 'Introduction to Java', content: 'Java is a high-level, class-based, object-oriented programming language.' },
      { id: 402, title: 'OOP Concepts', content: 'Learn about Inheritance, Polymorphism, Encapsulation, and Abstraction.' }
    ]
  },
  {
    id: 5,
    title: 'Python for Data Science',
    description: 'Master Python programming and libraries like Pandas and NumPy.',
    category: 'Data Science',
    level: 'Beginner',
    duration: '45 hours',
    image: HERO_AVATARS[0].image,
    lessons: [
      { id: 501, title: 'Python Basics', content: 'Variables, loops, and functions in Python.' },
      { id: 502, title: 'Data Analysis with Pandas', content: 'Pandas is a fast, powerful, flexible and easy to use open source data analysis tool.' }
    ]
  },
  {
    id: 6,
    title: 'HTML & CSS Mastery',
    description: 'Create beautiful, responsive websites using modern HTML and CSS.',
    category: 'Frontend',
    level: 'Beginner',
    duration: '25 hours',
    image: HERO_AVATARS[1].image,
    lessons: [
      { id: 601, title: 'Semantic HTML', content: 'Using the right tags for the right content.' },
      { id: 602, title: 'CSS Grid & Flexbox', content: 'Modern layout modules in CSS.' }
    ]
  },
  {
    id: 7,
    title: 'Data Structures & Algorithms (DSA)',
    description: 'Cracking the coding interview with essential DSA concepts.',
    category: 'Computer Science',
    level: 'Advanced',
    duration: '50 hours',
    image: HERO_AVATARS[2].image,
    lessons: [
      { id: 701, title: 'Arrays and Linked Lists', content: 'Fundamental linear data structures.' },
      { id: 702, title: 'Trees and Graphs', content: 'Non-linear data structures used for hierarchical data.' }
    ]
  }
];

export const MOCK_STUDENTS = [
  { 
    id: 1, 
    name: 'John Student', 
    email: 'student@example.com', 
    enrolled_count: 2, 
    completed_count: 1,
    last_active: '2026-05-22',
    status: 'Active',
    courses: [
      { id: 101, title: 'Web Development Bootcamp', progress: 100, status: 'Completed', quiz_score: 95, remarks: 'Excellent performance' },
      { id: 102, title: 'Mastering Node.js', progress: 45, status: 'In Progress', quiz_score: 80, remarks: 'Good grasp of concepts' },
      { id: 103, title: 'React for Beginners', progress: 10, status: 'Just Started', quiz_score: null, remarks: 'Needs more practice' }
    ]
  },
  { 
    id: 2, 
    name: 'Alice Smith', 
    email: 'alice@example.com', 
    enrolled_count: 1, 
    completed_count: 0,
    last_active: '2026-05-20',
    status: 'Inactive',
    courses: [
      { id: 104, title: 'Java Masterclass', progress: 20, status: 'In Progress', quiz_score: 65, remarks: 'Struggling with OOP' }
    ]
  },
  { 
    id: 3, 
    name: 'Bob Jones', 
    email: 'bob@example.com', 
    enrolled_count: 3, 
    completed_count: 2,
    last_active: '2026-05-23',
    status: 'Active',
    courses: [
      { id: 105, title: 'Python for Data Science', progress: 100, status: 'Completed', quiz_score: 98, remarks: 'Top of the class' },
      { id: 106, title: 'HTML & CSS Mastery', progress: 100, status: 'Completed', quiz_score: 92, remarks: 'Great design skills' },
      { id: 107, title: 'Data Structures & Algorithms', progress: 85, status: 'In Progress', quiz_score: 88, remarks: 'Very consistent' }
    ]
  },
];

export const MOCK_ADMIN_ENROLLMENTS = [
  { id: 1, studentName: 'John Student', courseName: 'Web Development Bootcamp', date: '2026-05-01', status: 'Completed', progress: 100 },
  { id: 2, studentName: 'John Student', courseName: 'Mastering Node.js', date: '2026-05-15', status: 'Active', progress: 45 },
  { id: 3, studentName: 'John Student', courseName: 'React for Beginners', date: '2026-05-20', status: 'Active', progress: 10 },
  { id: 4, studentName: 'Alice Smith', courseName: 'Java Masterclass', date: '2026-04-10', status: 'Inactive', progress: 20 },
  { id: 5, studentName: 'Bob Jones', courseName: 'Python for Data Science', date: '2026-03-05', status: 'Completed', progress: 100 },
  { id: 6, studentName: 'Bob Jones', courseName: 'HTML & CSS Mastery', date: '2026-04-20', status: 'Completed', progress: 100 },
];

export const MOCK_ADMIN_COMPLETED_COURSES = [
  { id: 1, studentName: 'John Student', courseName: 'Web Development Bootcamp', completionDate: '2026-05-10', score: '95%', certificateId: 'CERT-1001' },
  { id: 2, studentName: 'Bob Jones', courseName: 'Python for Data Science', completionDate: '2026-04-15', score: '98%', certificateId: 'CERT-1002' },
  { id: 3, studentName: 'Bob Jones', courseName: 'HTML & CSS Mastery', completionDate: '2026-05-18', score: '92%', certificateId: 'CERT-1003' },
];

// Helper for local storage simulation
export const getLocalEnrollments = () => {
  const stored = localStorage.getItem('mock_enrollments');
  return stored ? JSON.parse(stored) : [];
};

export const saveLocalEnrollment = (courseId, style) => {
  const enrollments = getLocalEnrollments();
  const course = MOCK_COURSES.find(c => c.id === parseInt(courseId));
  
  if (!enrollments.find(e => e.course_id === parseInt(courseId))) {
    enrollments.push({
      id: Date.now(),
      course_id: parseInt(courseId),
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      duration: course.duration,
      image: course.image,
      instructor_style: style,
      progress_percentage: 0,
      completed: false,
      completed_lessons: [],
      enrolled_at: new Date().toISOString()
    });
    localStorage.setItem('mock_enrollments', JSON.stringify(enrollments));
  }
};

export const markLessonCompleteLocal = (enrollmentId, lessonId, courseId) => {
  const enrollments = getLocalEnrollments();
  const idx = enrollments.findIndex(e => e.id === parseInt(enrollmentId));
  
  if (idx > -1) {
    const enrollment = enrollments[idx];
    if (!enrollment.completed_lessons.includes(lessonId)) {
      enrollment.completed_lessons.push(lessonId);
    }
    
    const course = MOCK_COURSES.find(c => c.id === parseInt(courseId));
    const totalLessons = course.lessons.length;
    const completedCount = enrollment.completed_lessons.length;
    
    enrollment.progress_percentage = Math.round((completedCount / totalLessons) * 100);
    if (enrollment.progress_percentage === 100) {
      enrollment.completed = true;
      enrollment.certificate_code = `CERT-${enrollmentId}-${Date.now()}`;
      enrollment.issued_at = new Date().toISOString();
    }
    
    localStorage.setItem('mock_enrollments', JSON.stringify(enrollments));
    return enrollment;
  }
  return null;
};
