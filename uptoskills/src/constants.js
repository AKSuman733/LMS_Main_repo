export const INITIAL_COURSES = [
  {
    id: 'full-stack',
    title: 'Full Stack Development',
    description: 'Master the entire web stack from frontend to backend with modern technologies.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    lessonsCount: 42,
    duration: '12 Weeks',
    difficulty: 'Advanced',
    hasCertificate: true,
    modules: [
      {
        id: 'fs-m1',
        title: 'Frontend Fundamentals',
        lessons: [
          { id: 'fs-l1', title: 'Modern React Patterns', type: 'video', duration: '15m', courseId: 'full-stack' },
          { id: 'fs-l2', title: 'Tailwind CSS Mastery', type: 'video', duration: '20m', courseId: 'full-stack' },
        ]
      }
    ]
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    description: 'Learn to build and deploy intelligent models using Python and TensorFlow.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    lessonsCount: 35,
    duration: '10 Weeks',
    difficulty: 'Intermediate',
    hasCertificate: true,
    modules: []
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Create stunning user interfaces and research-backed user experiences.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?auto=format&fit=crop&q=80&w=800',
    lessonsCount: 28,
    duration: '8 Weeks',
    difficulty: 'Beginner',
    hasCertificate: true,
    modules: []
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    description: 'The foundation for data science, AI, and automation.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    lessonsCount: 50,
    duration: '6 Weeks',
    difficulty: 'Beginner',
    hasCertificate: true,
    modules: [
       {
        id: 'py-m1',
        title: 'Python Basics',
        lessons: [
          { id: 'py-l1', title: 'Variables and Data Types', type: 'video', duration: '10m', courseId: 'python-programming' },
          { id: 'py-l2', title: 'Control Structures', type: 'video', duration: '12m', courseId: 'python-programming' },
        ]
      }
    ]
  },
  {
    id: 'java-programming',
    title: 'Java Programming',
    description: 'Enterprise-grade programming with Java and Spring Boot.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    lessonsCount: 45,
    duration: '10 Weeks',
    difficulty: 'Intermediate',
    hasCertificate: true,
    modules: []
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    description: 'Common algorithms and data structures for interview prep.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
    lessonsCount: 30,
    duration: '8 Weeks',
    difficulty: 'Advanced',
    hasCertificate: true,
    modules: []
  }
];

export const INITIAL_STUDENTS = [
  { id: '1', name: 'Alex Rivera', email: 'alex@example.com', course: 'Full Stack Development', progress: 85, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', course: 'Machine Learning', progress: 40, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'James Wilson', email: 'james@example.com', course: 'UI/UX Design', progress: 10, avatar: 'https://i.pravatar.cc/150?u=3' },
];
