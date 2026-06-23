import maheshImg from '../assets/mahesh.jpg';
import alluArjunImg from '../assets/allu_arjun.jpg';
import prabhasImg from '../assets/prabhas.jpg';
import ramCharanImg from '../assets/ram_charan.jpg';
import pawanKalyanImg from '../assets/pawan_kalyan.jpg';
import naniImg from '../assets/nani.png';
import vijayDeverakondaImg from '../assets/vijay_deverakonda.jpg';
import raviTejaImg from '../assets/ravi_teja.png';
import jrNtrImg from '../assets/jr_ntr.jpg';

export const MOCK_METRICS = {
  totalStudents: 142,
  totalCourses: 12,
  totalEnrollments: 256,
  completedCourses: 89,
  activeHeroes: 4,
  revenue: 15400,
  pendingTasks: 4,
  trends: {
    students: '+12%',
    enrollments: '+8%',
    revenue: '+15%'
  }
};

export const HERO_AVATARS = [
  {
    id: "mahesh-babu",
    name: "Mass Hero Style (Mahesh Babu)",
    title: "Action Star",
    bio: "Superstar known for intense action and dialogue delivery.",
    image: maheshImg,
    tags: ["Action", "Mass", "Telugu"],
    status: "Active"
  },
  {
    id: "allu-arjun",
    name: "Stylish Star Style (Allu Arjun)",
    title: "Dance & Style Icon",
    bio: "Known for his incredible dancing skills and unique style.",
    image: alluArjunImg,
    tags: ["Style", "Dance", "Pan-India"],
    status: "Active"
  },
  {
    id: "prabhas",
    name: "Classic Rebel Style (Prabhas)",
    title: "Pan-India Rebel",
    bio: "The Baahubali star with a massive global following.",
    image: prabhasImg,
    tags: ["Rebel", "Action", "Pan-India"],
    status: "Active"
  },
  {
    id: "ram-charan",
    name: "Young Energetic Style (Ram Charan)",
    title: "Mega Power Star",
    bio: "Energetic performer known for intense roles.",
    image: ramCharanImg,
    tags: ["Energetic", "Action", "Global"],
    status: "Active"
  },
  {
    id: "pawan-kalyan",
    name: "Power Star Style (Pawan Kalyan)",
    title: "Power Star",
    bio: "Iconic actor with a massive cult following.",
    image: pawanKalyanImg,
    tags: ["Power", "Action", "Telugu"],
    status: "Active"
  },
  {
    id: "nani",
    name: "Natural Star Style (Nani)",
    title: "Natural Star",
    bio: "Known for his natural acting and relatable characters.",
    image: naniImg,
    tags: ["Natural", "Drama", "Telugu"],
    status: "Active"
  },
  {
    id: "vijay-deverakonda",
    name: "Rowdy Boy Style (Vijay Deverakonda)",
    title: "Youth Icon",
    bio: "Trendsetting actor with a raw and intense persona.",
    image: vijayDeverakondaImg,
    tags: ["Intense", "Youth", "Pan-India"],
    status: "Active"
  },
  {
    id: "ravi-teja",
    name: "Mass Maharaja Style (Ravi Teja)",
    title: "Mass Maharaja",
    bio: "Energetic star known for his comedic timing and action.",
    image: raviTejaImg,
    tags: ["Comedy", "Action", "Mass"],
    status: "Active"
  },
  {
    id: "jr-ntr",
    name: "Young Tiger Style (Jr. NTR)",
    title: "Young Tiger",
    bio: "Powerhouse performer known for acting, dancing, and dialogue delivery.",
    image: jrNtrImg,
    tags: ["Versatile", "Dance", "Global"],
    status: "Active"
  }
];

const LOCAL_HEROES_KEY = 'mock_heroes_v2';

export const getLocalHeroes = () => {
  try {
    const stored = localStorage.getItem(LOCAL_HEROES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse heroes", e);
  }
  return HERO_AVATARS;
};

export const saveLocalHero = (heroData) => {
  const heroes = getLocalHeroes();
  const newHero = {
    id: "hero_" + Date.now(),
    created_at: new Date().toISOString(),
    ...heroData
  };
  localStorage.setItem(LOCAL_HEROES_KEY, JSON.stringify([newHero, ...heroes]));
  return newHero;
};

export const updateLocalHero = (updatedHero) => {
  const heroes = getLocalHeroes();
  const updated = heroes.map(h => h.id === updatedHero.id ? { ...h, ...updatedHero } : h);
  localStorage.setItem(LOCAL_HEROES_KEY, JSON.stringify(updated));
  return updatedHero;
};

export const deleteLocalHero = (id) => {
  const heroes = getLocalHeroes();
  const filtered = heroes.filter(h => h.id !== id);
  localStorage.setItem(LOCAL_HEROES_KEY, JSON.stringify(filtered));
};

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

const LOCAL_COURSES_KEY = 'mock_courses_v2';

const parseStoredCourses = () => {
  try {
    const stored = localStorage.getItem(LOCAL_COURSES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const getLocalCourses = () => {
  const localCourses = parseStoredCourses();
  const localIds = new Set(localCourses.map(course => course.id));
  return [
    ...localCourses,
    ...MOCK_COURSES.filter(course => !localIds.has(course.id))
  ];
};

export const saveLocalCourse = (course) => {
  const localCourses = parseStoredCourses();
  const allHeroes = getLocalHeroes();
  const randomHero = allHeroes[Math.floor(Math.random() * allHeroes.length)];
  const newCourse = {
    id: Date.now() + Math.random().toString(36).substring(2),
    image: randomHero.image,
    lessons: [
      {
        id: Date.now() + 1,
        title: 'Introduction',
        content: course.description || 'Start learning the basics of this course.'
      }
    ],
    ...course
  };

  localStorage.setItem(LOCAL_COURSES_KEY, JSON.stringify([newCourse, ...localCourses]));
  return newCourse;
};

export const updateLocalCourse = (updatedCourse) => {
  const localCourses = parseStoredCourses();
  const updatedCourses = localCourses.map(c => 
    c.id === updatedCourse.id ? { ...c, ...updatedCourse } : c
  );
  localStorage.setItem(LOCAL_COURSES_KEY, JSON.stringify(updatedCourses));
};

export const deleteLocalCourse = (id) => {
  const localCourses = parseStoredCourses();
  const filtered = localCourses.filter(c => c.id !== id);
  localStorage.setItem(LOCAL_COURSES_KEY, JSON.stringify(filtered));
};

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
  const stored = localStorage.getItem('mock_enrollments_v2');
  return stored ? JSON.parse(stored) : [];
};

export const saveLocalEnrollment = (courseId, styleOrHeroId) => {
  const enrollments = getLocalEnrollments();
  const course = getLocalCourses().find(c => c.id === parseInt(courseId));
  
  const allHeroes = getLocalHeroes();
  // Support both old style (name based) and new style (ID based)
  let selectedHero = allHeroes.find(h => h.id === styleOrHeroId || h.name === styleOrHeroId);
  if (!selectedHero) {
    selectedHero = allHeroes[0]; // fallback
  }
  
  if (!enrollments.find(e => e.course_id === parseInt(courseId))) {
    enrollments.push({
      id: Date.now(),
      course_id: parseInt(courseId),
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      duration: course.duration,
      image: selectedHero ? selectedHero.image : course.image,
      instructor_style: selectedHero ? selectedHero.name : 'Default',
      activeHeroId: selectedHero ? selectedHero.id : null,
      progress_percentage: 0,
      completed: false,
      completed_lessons: [],
      enrolled_at: new Date().toISOString()
    });
    localStorage.setItem('mock_enrollments_v2', JSON.stringify(enrollments));
  }
};

export const changeEnrollmentHero = (enrollmentId, heroId) => {
  const enrollments = getLocalEnrollments();
  const idx = enrollments.findIndex(e => e.id === parseInt(enrollmentId));
  if (idx > -1) {
    const allHeroes = getLocalHeroes();
    const hero = allHeroes.find(h => h.id === heroId);
    if (hero) {
      enrollments[idx].activeHeroId = hero.id;
      enrollments[idx].instructor_style = hero.name;
      enrollments[idx].image = hero.image;
      localStorage.setItem('mock_enrollments_v2', JSON.stringify(enrollments));
      return enrollments[idx];
    }
  }
  return null;
};

export const markLessonCompleteLocal = (enrollmentId, lessonId, courseId) => {
  const enrollments = getLocalEnrollments();
  const idx = enrollments.findIndex(e => e.id === parseInt(enrollmentId));
  
  if (idx > -1) {
    const enrollment = enrollments[idx];
    if (!enrollment.completed_lessons.includes(lessonId)) {
      enrollment.completed_lessons.push(lessonId);
    }
    
    const course = getLocalCourses().find(c => c.id === parseInt(courseId));
    const totalLessons = course.lessons.length;
    const completedCount = enrollment.completed_lessons.length;
    
    enrollment.progress_percentage = Math.round((completedCount / totalLessons) * 100);
    if (enrollment.progress_percentage === 100) {
      enrollment.completed = true;
      enrollment.certificate_code = `CERT-${enrollmentId}-${Date.now()}`;
      enrollment.issued_at = new Date().toISOString();
    }
    
    localStorage.setItem('mock_enrollments_v2', JSON.stringify(enrollments));
    return enrollment;
  }
  return null;
};

export const restartCourseLocal = (enrollmentId) => {
  const enrollments = getLocalEnrollments();
  const idx = enrollments.findIndex(e => e.id === parseInt(enrollmentId));
  
  if (idx > -1) {
    enrollments[idx].completed_lessons = [];
    enrollments[idx].progress_percentage = 0;
    enrollments[idx].completed = false;
    delete enrollments[idx].certificate_code;
    delete enrollments[idx].issued_at;
    
    localStorage.setItem('mock_enrollments_v2', JSON.stringify(enrollments));
    return enrollments[idx];
  }
  return null;
};

export const MOCK_ACTIVITY_FEED = [
  { id: 1, type: 'enrollment', text: 'John Student enrolled in Web Development', time: '10 minutes ago' },
  { id: 2, type: 'hero', text: 'New Celebrity Hero "Thalapathy" added', time: '1 hour ago' },
  { id: 3, type: 'course', text: 'Course "React Native" was published', time: '3 hours ago' },
  { id: 4, type: 'update', text: 'Alice Smith changed instructor to Allu Arjun', time: '5 hours ago' },
  { id: 5, type: 'admin', text: 'Admin updated global theme settings', time: '1 day ago' },
];

export const MOCK_PENDING_TASKS = [
  { id: 1, text: 'Review new course "Advanced Python"', priority: 'High', status: 'Pending' },
  { id: 2, text: 'Approve Celebrity Profile for "NTR Jr"', priority: 'Medium', status: 'Pending' },
  { id: 3, text: 'Verify 5 course completion reports', priority: 'High', status: 'Action Required' },
  { id: 4, text: 'Check inactive student accounts', priority: 'Low', status: 'Pending' },
];

export const MOCK_TOP_COURSES = [
  { id: 1, title: 'Web Development Bootcamp', progress: 85, students: 120 },
  { id: 2, title: 'Python for Data Science', progress: 70, students: 95 },
  { id: 3, title: 'Data Structures & Algorithms', progress: 55, students: 80 },
];

export const MOCK_TOP_HEROES = [
  { id: 1, name: 'Stylish Star Style (Allu Arjun)', count: 150, image: alluArjunImg },
  { id: 2, name: 'Power Star Style (Pawan Kalyan)', count: 120, image: pawanKalyanImg },
  { id: 3, name: 'Rowdy Boy Style (Vijay Deverakonda)', count: 90, image: vijayDeverakondaImg },
];

export const MOCK_STUDENT_GROWTH = [
  { month: 'Jan', count: 40 },
  { month: 'Feb', count: 65 },
  { month: 'Mar', count: 90 },
  { month: 'Apr', count: 110 },
  { month: 'May', count: 125 },
  { month: 'Jun', count: 142 },
];

export const getCourseStatusAndAction = (course) => {
  const progress = course.progress_percentage || 0;
  const isCompleted = course.completed || progress === 100;
  
  if (isCompleted) {
    return {
      statusBadge: 'Completed',
      badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
      actionLabel: course.certificate_code ? 'View Certificate' : 'Review Course',
      actionLink: course.certificate_code ? `/student/certificate/${course.id}` : `/student/learn/${course.id}`,
      actionColor: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700',
      actionVariant: 'outline'
    };
  } else if (progress > 0) {
    return {
      statusBadge: 'In Progress',
      badgeColor: 'bg-orange-100 text-brand-orange-dark dark:bg-orange-900/50 dark:text-brand-orange-light',
      actionLabel: 'Continue',
      actionLink: `/student/learn/${course.id}`,
      actionColor: 'bg-brand-orange text-white hover:bg-brand-orange-dark',
      actionVariant: 'primary'
    };
  } else {
    return {
      statusBadge: 'Not Started',
      badgeColor: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      actionLabel: 'Start Course',
      actionLink: `/student/learn/${course.id}`,
      actionColor: 'bg-brand-orange text-white hover:bg-brand-orange-dark',
      actionVariant: 'primary'
    };
  }
};

export const MOCK_STUDENT_METRICS = {
  learningStreak: 12,
  learningHours: 48,
  achievementsCount: 5,
};

export const MOCK_ACHIEVEMENTS = [
  { id: 1, title: 'Fast Learner', description: 'Completed a course in under 3 days.', icon: 'Zap', color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { id: 2, title: 'Dedicated Student', description: 'Maintained a 10-day learning streak.', icon: 'Flame', color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400' },
  { id: 3, title: 'Hero Follower', description: 'Tried 3 different Celebrity Instructors.', icon: 'Star', color: 'text-brand-teal bg-teal-100 dark:bg-purple-900/30 dark:text-brand-teal-light' },
];

