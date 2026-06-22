import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Star, Clock, BookOpen, Calendar, Play, Lock, Check, Share2, Linkedin, Twitter, Link as LinkIcon, X } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { mockCourses } from '../../utils/mockCourses';
import { useAuth } from '../../contexts/AuthContext';
import { getEnrollments, addEnrollment } from '../../utils/enrollmentStore';

interface Mentor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

const defaultMentors: Mentor[] = [
  {
    id: 'm-1',
    name: 'Virat Kohli',
    role: 'Elite Athletic Mentor & Leadership Coach',
    avatar: '/virat.png',
    bio: 'Virat Kohli is one of the greatest cricketers of all time. As a mentor, he brings world-class expertise in mental toughness, peak performance leadership, and high-performance team building.'
  },
  {
    id: 'm-2',
    name: 'Sachin Tendulkar',
    role: 'Master Performance Mentor',
    avatar: '/sachin.jpg',
    bio: 'Sachin Tendulkar, the "God of Cricket," is a global sporting icon. He teaches focus, long-term discipline, dealing with pressure, and mastering core fundamentals under high-stress conditions.'
  },
  {
    id: 'm-3',
    name: 'Arijit Singh',
    role: 'Creative Expression & Focus Mentor',
    avatar: '/arijit.png',
    bio: 'Arijit Singh is one of India\'s most celebrated playback singers. He mentors students on creative execution, consistency, vocal and performance control, and workflow focusing strategies.'
  },
  {
    id: 'm-4',
    name: 'Shah Rukh Khan',
    role: 'Cinema & Charisma Mentor',
    avatar: '/shahrukh.jpg',
    bio: 'Shah Rukh Khan, the "King of Bollywood," is a global film superstar. He mentors students on charisma, screen presence, public speaking, storytelling, and building a world-class personal brand.'
  },
  {
    id: 'm-5',
    name: 'Salman Khan',
    role: 'Fitness & Screen Presence Mentor',
    avatar: '/salman.jpg',
    bio: 'Salman Khan is an iconic actor and philanthropist. He provides coaching on physical fitness, screen authority, action execution, confidence, and mass-market audience engagement.'
  },
  {
    id: 'm-6',
    name: 'Amitabh Bachchan',
    role: 'Legendary Voice & Character Mentor',
    avatar: '/amitabh.jpg',
    bio: 'Amitabh Bachchan is a legendary film superstar with a career spanning five decades. He mentors on voice modulation, character acting, professional discipline, longevity, and deep focus.'
  },
  {
    id: 'm-7',
    name: 'Deepika Padukone',
    role: 'Global Brand & Acting Mentor',
    avatar: '/deepika.jpg',
    bio: 'Deepika Padukone is a global icon and critically acclaimed actor. She coaches on cinematic versatility, dealing with global media, emotional depth in performance, and mental well-being.'
  },
  {
    id: 'm-8',
    name: 'Ranbir Kapoor',
    role: 'Method Acting & Screenplay Expert',
    avatar: '/ranbir.jpg',
    bio: 'Ranbir Kapoor is one of modern Hindi cinema\'s most versatile actors. He teaches character immersion, method acting, working with directors, and emotional authenticity on screen.'
  }
];

export function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (user && id) {
      const enrollments = getEnrollments();
      const enrolled = enrollments.some(e => e.studentId === user.id && e.courseId === id);
      setIsEnrolled(enrolled);
    }
  }, [user, id]);

  const course = mockCourses.find(c => c.id === id);

  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);

  const [mentorsList, setMentorsList] = useState<Mentor[]>(() => {
    const saved = localStorage.getItem('learnify_mentors');
    if (saved) {
      try {
        const parsed: Mentor[] = JSON.parse(saved);
        return parsed.map(p => {
          const def = defaultMentors.find(d => d.id === p.id);
          return def ? { ...p, avatar: def.avatar } : p;
        });
      } catch (e) {
        return defaultMentors;
      }
    }
    return defaultMentors;
  });

  const [courseMentorId, setCourseMentorId] = useState<string>(() => {
    const saved = localStorage.getItem(`course_mentor_${id}`);
    if (saved) return saved;
    const match = defaultMentors.find(m => m.name.toLowerCase() === course?.instructor?.toLowerCase());
    return match ? match.id : 'm-1';
  });

  const currentMentor = mentorsList.find(m => m.id === courseMentorId) || mentorsList[0];

  useEffect(() => {
    localStorage.setItem('learnify_mentors', JSON.stringify(mentorsList));
  }, [mentorsList]);

  useEffect(() => {
    if (id) {
      localStorage.setItem(`course_mentor_${id}`, courseMentorId);
    }
  }, [courseMentorId, id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-[68px]">
          <h1 className="text-[32px] font-bold text-[#1A1A2E] mb-4">Course not found</h1>
          <p className="text-[#6B6B80] mb-8">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses" className="px-6 py-3 bg-[#2D1B69] text-white rounded-[10px] font-medium">
            ← Back to courses
          </Link>
        </main>
        <Footer />
      </div>
    );
  }  if (course.type === 'learning-path' && isEnrolled) {
    return <LearningPathRoadmap course={course} user={user} navigate={navigate} />;
  }

  const toggleModule = (index: number) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const courseData = {
    ...course,
    category: course.type === 'learning-path' ? 'Learning Path' : 'Course',
    updated: 'Jan 2025',
    instructor: {
      name: course.instructor,
      role: 'AI Expert',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    whatYouLearn: [
      'Understand the fundamentals of ' + course.topics[0],
      'Build and train models using ' + (course.tools[0] || 'various tools'),
      'Apply advanced techniques to improve performance',
      'Deploy solutions to production environments',
    ],
    prerequisites: [
      'Basic programming knowledge',
      'Understanding of core concepts',
    ],
    modules: [
      {
        title: 'Introduction to ' + course.topics[0],
        lessons: [
          { title: 'What is it?', duration: '12:34', locked: false },
          { title: 'Setting Up Your Environment', duration: '15:47', locked: false },
        ],
      },
      {
        title: 'Advanced Concepts',
        lessons: [
          { title: 'Core Mechanisms', duration: '22:15', locked: false },
          { title: 'Best Practices', duration: '19:08', locked: true },
        ],
      },
    ],
  };

  const reviews = [
    {
      id: 1,
      author: 'John Smith',
      avatar: 'https://i.pravatar.cc/150?img=10',
      rating: 5,
      date: 'Jan 15, 2025',
      text: 'Excellent course! Dr. Chen explains complex concepts in a very clear and accessible way. The hands-on projects really helped solidify my understanding.',
    },
    {
      id: 2,
      author: 'Maria Garcia',
      avatar: 'https://i.pravatar.cc/150?img=11',
      rating: 5,
      date: 'Jan 10, 2025',
      text: 'Best ML course I\'ve taken. The curriculum is well-structured and the examples are practical and relevant.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-[68px]">
        {/* Hero Section */}
        <section className="bg-[#F7F6F3] py-12 px-6">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
              {/* Left Column */}
              <div>
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-[13px] mb-4">
                  <Link to="/courses" className="text-[#6B6B80] hover:text-[#2D1B69]">
                    Courses
                  </Link>
                  <span className="text-[#6B6B80]">/</span>
                  <span className="text-[#2D1B69] font-medium">{courseData.category}</span>
                </div>

                {/* Category Tag */}
                <div className="inline-block px-3 py-1 bg-[#2D1B69]/10 text-[#2D1B69] rounded-full text-[13px] font-medium mb-3">
                  {courseData.category}
                </div>

                {/* Title */}
                <h1 className="text-[40px] font-bold text-[#1A1A2E] mb-4 leading-tight">
                  {courseData.title}
                </h1>

                {/* Description */}
                <p className="text-[17px] text-[#6B6B80] mb-6 leading-relaxed">
                  {courseData.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 text-[14px] mb-6">
                  <div className="flex items-center gap-1">
                    <Star size={16} fill="#F59E0B" stroke="#F59E0B" />
                    <span className="font-bold text-[#1A1A2E]">{courseData.rating}</span>
                  </div>
                  <span className="text-[#6B6B80]">•</span>
                  <span className="text-[#6B6B80]">{courseData.enrolled.toLocaleString()} learners</span>
                  <span className="text-[#6B6B80]">•</span>
                  <span className="text-[#6B6B80]">{courseData.duration}</span>
                  <span className="text-[#6B6B80]">•</span>
                  <span className="text-[#6B6B80]">{courseData.lessons} lessons</span>
                  <span className="text-[#6B6B80]">•</span>
                  <span className="text-[#6B6B80]">Updated {courseData.updated}</span>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => setActiveTab('instructor')}>
                  <img
                    src={currentMentor.avatar}
                    alt={currentMentor.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#E2E1F0]"
                    onError={(e) => {
                      e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${currentMentor.name}`;
                    }}
                  />
                  <div>
                    <div className="text-[15px] font-bold text-[#1A1A2E] hover:text-[#2D1B69] transition-colors flex items-center gap-1.5">
                      {currentMentor.name}
                      <span className="text-[10px] font-medium bg-[#2D1B69]/5 text-[#2D1B69] px-2 py-0.5 rounded-full border border-[#2D1B69]/10">Course Mentor</span>
                    </div>
                    <div className="text-[13px] text-[#6B6B80]">{currentMentor.role}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {isEnrolled ? (
                    <Button 
                      onClick={() => navigate(`/course/${id}/learn`)}
                      className="h-[52px] text-[16px] px-8 bg-[#BBFF00] text-[#2D1B69] hover:bg-[#a3df00]"
                    >
                      Resume Learning
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => {
                        if (!user) {
                          navigate('/login');
                          return;
                        }
                        addEnrollment(user, course);
                        setIsEnrolled(true);
                        navigate(`/course/${id}/learn`);
                      }}
                      className="h-[52px] text-[16px] px-8"
                    >
                      Enroll for free
                    </Button>
                  )}
                  <Button variant="secondary" className="h-[52px] text-[16px] px-6">
                    Save for later
                  </Button>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="rounded-[20px] overflow-hidden shadow-[0_2px_16px_rgba(45,27,105,0.06)]">
                  <div className="relative">
                    <img
                      src={courseData.thumbnail}
                      alt={courseData.title}
                      className="w-full aspect-video object-cover"
                    />
                    <button 
                      onClick={() => {
                        if (isEnrolled) {
                          navigate(`/course/${id}/learn`);
                        } else {
                          if (!user) {
                            navigate('/login');
                            return;
                          }
                          addEnrollment(user, course);
                          setIsEnrolled(true);
                          navigate(`/course/${id}/learn`);
                        }
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#2D1B69] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={24} fill="white" stroke="white" className="ml-1" />
                      </div>
                    </button>
                  </div>

                  <div className="p-4 bg-white">
                    <div className="flex gap-2">
                      <div className="flex-1 text-center py-2 px-3 bg-white border border-[#E2E1F0] rounded-[8px] text-[13px] font-medium text-[#6B6B80]">
                        {courseData.duration}
                      </div>
                      <div className="flex-1 text-center py-2 px-3 bg-white border border-[#E2E1F0] rounded-[8px] text-[13px] font-medium text-[#6B6B80]">
                        {courseData.lessons} lessons
                      </div>
                      <div className="flex-1 text-center py-2 px-3 bg-white border border-[#E2E1F0] rounded-[8px] text-[13px] font-medium text-[#6B6B80]">
                        {courseData.level}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-6">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
              {/* Left Content */}
              <div>
                {/* Tabs */}
                <div className="flex gap-8 border-b border-[#E2E1F0] mb-8">
                  {['Overview', 'Curriculum', 'Instructor', 'Reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`text-[15px] font-medium pb-3 relative ${
                        activeTab === tab.toLowerCase()
                          ? 'text-[#2D1B69]'
                          : 'text-[#6B6B80] hover:text-[#2D1B69]'
                      }`}
                    >
                      {tab}
                      {activeTab === tab.toLowerCase() && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#BBFF00]"></div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-[20px] font-bold text-[#1A1A2E] mb-4">
                        What you'll learn
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {courseData.whatYouLearn.map((item, index) => (
                          <div key={index} className="flex gap-3">
                            <Check size={20} className="text-[#2D1B69] flex-shrink-0 mt-0.5" />
                            <span className="text-[15px] text-[#1A1A2E]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[20px] font-bold text-[#1A1A2E] mb-4">Prerequisites</h3>
                      <ul className="space-y-2">
                        {courseData.prerequisites.map((item, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="text-[#2D1B69]">•</span>
                            <span className="text-[15px] text-[#6B6B80]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-[20px] font-bold text-[#1A1A2E] mb-4">Who this is for</h3>
                      <p className="text-[15px] text-[#6B6B80]">
                        This course is perfect for beginners who want to break into machine learning, data scientists looking to strengthen their foundation, and developers interested in adding ML capabilities to their applications.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="space-y-3">
                    {courseData.modules.map((module, moduleIndex) => (
                      <div
                        key={moduleIndex}
                        className="border border-[#E2E1F0] rounded-[12px] overflow-hidden"
                      >
                        <button
                          onClick={() => toggleModule(moduleIndex)}
                          className="w-full flex items-center justify-between p-4 bg-white hover:bg-[#F7F6F3] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[14px] font-bold text-[#2D1B69]">
                              {String(moduleIndex + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[16px] font-bold text-[#1A1A2E]">
                              {module.title}
                            </span>
                          </div>
                          <span className="text-[13px] text-[#6B6B80]">
                            {module.lessons.length} lessons
                          </span>
                        </button>

                        {expandedModules.includes(moduleIndex) && (
                          <div className="border-t border-[#E2E1F0] bg-[#FAFAFA]">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lessonIndex}
                                className="flex items-center justify-between p-4 hover:bg-white transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-7 h-7 rounded-full bg-[#2D1B69]/10 flex items-center justify-center">
                                    {lesson.locked ? (
                                      <Lock size={14} className="text-[#6B6B80]" />
                                    ) : (
                                      <Play size={14} className="text-[#2D1B69]" />
                                    )}
                                  </div>
                                  <span className={`text-[14px] ${lesson.locked ? 'text-[#6B6B80]' : 'text-[#1A1A2E]'}`}>
                                    {lesson.title}
                                  </span>
                                </div>
                                <span className="text-[13px] text-[#6B6B80]">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div className="bg-[#F7F6F3] border border-[#E2E1F0] rounded-[16px] p-6 text-left">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={currentMentor.avatar}
                          alt={currentMentor.name}
                          className="w-16 h-16 rounded-full object-cover border border-[#E2E1F0]"
                          onError={(e) => {
                            e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${currentMentor.name}`;
                          }}
                        />
                        <div>
                          <h3 className="text-[20px] font-bold text-[#1A1A2E]">{currentMentor.name}</h3>
                          <p className="text-[14px] text-[#6B6B80] font-semibold">{currentMentor.role}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsMentorModalOpen(true)}
                        className="h-10 px-4 bg-[#2D1B69] hover:bg-[#1E124A] text-white text-[13px] font-bold rounded-[8px] transition-all cursor-pointer border-none shadow-sm flex items-center gap-2"
                      >
                        Change / Add Mentor
                      </button>
                    </div>
                    <div className="border-t border-[#E2E1F0] pt-4">
                      <h4 className="text-[14px] font-bold text-[#1A1A2E] mb-2">About the Mentor</h4>
                      <p className="text-[14px] text-[#6B6B80] leading-relaxed">
                        {currentMentor.bio || `${currentMentor.name} is a leading industry professional dedicated to sharing domain knowledge, teaching best practices, and building robust scalable frameworks.`}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    {/* Rating Breakdown */}
                    <div className="mb-8">
                      <h3 className="text-[20px] font-bold text-[#1A1A2E] mb-4">Student Reviews</h3>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center gap-3">
                            <span className="text-[13px] text-[#6B6B80] w-8">{stars}★</span>
                            <div className="flex-1 h-2 bg-[#E2E1F0] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#F59E0B]"
                                style={{ width: `${stars === 5 ? 85 : stars === 4 ? 12 : 3}%` }}
                              ></div>
                            </div>
                            <span className="text-[13px] text-[#6B6B80] w-12 text-right">
                              {stars === 5 ? '85%' : stars === 4 ? '12%' : '3%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reviews */}
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-[#E2E1F0] pb-6 last:border-0">
                          <div className="flex items-start gap-3 mb-3">
                            <img
                              src={review.avatar}
                              alt={review.author}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[15px] font-bold text-[#1A1A2E]">
                                  {review.author}
                                </span>
                                <span className="text-[13px] text-[#6B6B80]">{review.date}</span>
                              </div>
                              <div className="flex gap-1 mb-2">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} size={14} fill="#F59E0B" stroke="#F59E0B" />
                                ))}
                              </div>
                              <p className="text-[14px] text-[#6B6B80]">{review.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sticky Panel */}
              <div>
                <div className="sticky top-24 bg-white rounded-[20px] border border-[#E2E1F0] border-t-[4px] border-t-[#2D1B69] p-6 shadow-[0_2px_16px_rgba(45,27,105,0.06)]">
                  <div className="mb-6">
                    <img
                      src={courseData.thumbnail}
                      alt={courseData.title}
                      className="w-full aspect-video object-cover rounded-[12px] mb-4"
                    />
                    <div className="text-[28px] font-bold text-[#2D1B69] mb-4">Free</div>
                    <Button fullWidth className="h-[52px] text-[16px] mb-4">
                      Enroll now
                    </Button>
                  </div>

                  <div className="border-t border-[#E2E1F0] pt-6">
                    <h4 className="text-[14px] font-bold text-[#1A1A2E] mb-4">What's included</h4>
                    <ul className="space-y-3">
                      {[
                        { icon: BookOpen, text: '5 hours of video content' },
                        { icon: Clock, text: 'Lifetime access' },
                        { icon: Check, text: 'Certificate of completion' },
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-3 text-[14px] text-[#6B6B80]">
                          <item.icon size={18} className="text-[#2D1B69]" />
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-[#E2E1F0] pt-6 mt-6">
                    <h4 className="text-[14px] font-bold text-[#1A1A2E] mb-4">Share</h4>
                    <div className="flex gap-2">
                      <button className="flex-1 h-10 flex items-center justify-center border border-[#E2E1F0] rounded-[8px] hover:bg-[#F7F6F3] transition-colors">
                        <LinkIcon size={18} className="text-[#6B6B80]" />
                      </button>
                      <button className="flex-1 h-10 flex items-center justify-center border border-[#E2E1F0] rounded-[8px] hover:bg-[#F7F6F3] transition-colors">
                        <Linkedin size={18} className="text-[#6B6B80]" />
                      </button>
                      <button className="flex-1 h-10 flex items-center justify-center border border-[#E2E1F0] rounded-[8px] hover:bg-[#F7F6F3] transition-colors">
                        <Twitter size={18} className="text-[#6B6B80]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* 🪟 MENTORS MANAGEMENT MODAL */}
      {isMentorModalOpen && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMentorModalOpen(false)}
        >
          <div 
            className="bg-white border border-[#E2E1F0] rounded-[20px] w-full max-w-[500px] p-6 relative shadow-[0_10px_32px_rgba(45,27,105,0.12)] text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 text-[#6B6B80] hover:text-[#2D1B69] p-1.5 rounded-full hover:bg-[#F7F6F3] transition-colors border-none bg-transparent cursor-pointer"
              onClick={() => setIsMentorModalOpen(false)}
            >
              <X size={18} />
            </button>

            <div className="mb-5">
              <h3 className="text-[20px] font-bold text-[#1A1A2E] mb-1 font-sans">Select Course Mentor</h3>
              <p className="text-[13px] text-[#6B6B80]">Assign an existing mentor profile for this course.</p>
            </div>

            {/* Content: Select Mentor */}
            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
              {mentorsList.map((mentor) => {
                const isSelected = mentor.id === courseMentorId;
                return (
                  <div 
                    key={mentor.id}
                    onClick={() => {
                      setCourseMentorId(mentor.id);
                      setIsMentorModalOpen(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-[12px] border cursor-pointer transition-all hover:bg-[#F7F6F3] ${
                      isSelected ? 'border-[#2D1B69] bg-[#2D1B69]/5 font-semibold' : 'border-[#E2E1F0]'
                    }`}
                  >
                    <img 
                      src={mentor.avatar} 
                      alt={mentor.name} 
                      className="w-11 h-11 rounded-full object-cover border border-[#E2E1F0]"
                      onError={(e) => {
                        e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${mentor.name}`;
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="text-[14px] text-[#1A1A2E]">{mentor.name}</h4>
                      <p className="text-[12px] text-[#6B6B80] font-normal">{mentor.role}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#2D1B69] flex items-center justify-center text-white text-[11px]">
                        ✓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

const PATH_COURSES: Record<string, string[]> = {
  'course-5': ['sub-rag-1', 'sub-rag-2', 'sub-rag-3', 'sub-rag-4', 'sub-rag-5'],
  'course-7': ['course-2', 'course-11', 'course-1', 'course-9'],
  'course-6': ['course-4', 'course-2', 'course-3'],
  'course-8': ['course-2', 'course-11', 'course-12'],
  'course-13': ['sub-rag-1', 'sub-rag-4'],
  'course-14': ['sub-rag-5', 'sub-rag-2'],
  'course-15': ['sub-rag-2', 'sub-rag-3'],
  'course-16': ['sub-rag-1', 'sub-rag-5'],
};

function LearningPathRoadmap({ course, user, navigate }: { course: any; user: any; navigate: any }) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'inprogress' | 'yet'>('all');
  
  // Get all sub-courses
  const subCourseIds = PATH_COURSES[course.id] || ['sub-rag-1', 'sub-rag-2'];
  const allEnrollments = getEnrollments();
  const userEnrollments = allEnrollments.filter(e => e.studentId === user?.id);

  // Map sub-courses to their progress
  const roadmapCourses = subCourseIds.map(subId => {
    const subCourse = mockCourses.find(c => c.id === subId);
    if (!subCourse) return null;
    const enr = userEnrollments.find(e => e.courseId === subId);
    const progress = enr ? enr.progress : 0;
    return {
      ...subCourse,
      progress,
      status: progress === 100 ? 'Completed' : progress > 0 ? 'In progress' : 'Yet to start'
    };
  }).filter(Boolean) as any[];

  // Filter courses based on activeFilter
  const filteredSubCourses = roadmapCourses.filter(c => {
    if (activeFilter === 'completed') return c.progress === 100;
    if (activeFilter === 'inprogress') return c.progress > 0 && c.progress < 100;
    if (activeFilter === 'yet') return c.progress === 0;
    return true;
  });

  // Active course (first course that is in-progress, or first yet-to-start, or first course)
  const activeCourse = roadmapCourses.find(c => c.progress > 0 && c.progress < 100) ||
                       roadmapCourses.find(c => c.progress === 0) ||
                       roadmapCourses[0];

  return (
    <div className="min-h-screen bg-[#0F0E17] text-white flex flex-col font-sans">
      <Navbar />
      <main className="pt-[100px] pb-16 px-6 max-w-[1000px] mx-auto w-full flex-grow">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-[#A0A0B0] mb-6">
          <Link to="/dashboard/courses" className="hover:text-white transition-colors">Enrolled Programs</Link>
          <span>&gt;</span>
          <span className="text-[#BBFF00]">Course Listing</span>
        </div>

        {/* Start Learning */}
        <h1 className="text-[28px] font-black tracking-tight mb-6 text-left">Start Learning</h1>

        {/* Main active course card */}
        {activeCourse && (
          <div className="bg-[#1A1A24] border border-[#2D2D3A] rounded-[20px] p-6 mb-8 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#BBFF00]/5 rounded-full blur-[80px] pointer-events-none"></div>
            <h2 className="text-[18px] sm:text-[20px] font-bold mb-4 pr-12 leading-snug">
              {activeCourse.title}
            </h2>
            <div className="border-t border-[#2D2D3A] my-4 w-full"></div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
              <div className="flex-1">
                <div className="text-[11px] text-[#A0A0B0] mb-1.5 font-bold uppercase tracking-wider">
                  {activeCourse.progress}% completed
                </div>
                <div className="h-[4px] bg-[#2D2D3A] rounded-full overflow-hidden w-full max-w-[320px]">
                  <div className="h-full bg-[#BBFF00] rounded-full" style={{ width: `${activeCourse.progress}%` }}></div>
                </div>
              </div>
              <button 
                onClick={() => navigate(`/course/${activeCourse.id}/learn`)}
                className="h-[42px] px-6 bg-[#BBFF00] text-[#1A1A2E] hover:bg-[#a3df00] font-black text-[13px] rounded-[10px] active:scale-[0.98] transition-all cursor-pointer shadow-md select-none"
              >
                {activeCourse.progress > 0 ? 'Continue' : 'Start now'}
              </button>
            </div>
          </div>
        )}

        {/* Filter Tab bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#2D2D3A] pb-4">
          <div className="text-[18px] font-extrabold tracking-tight text-[#BBFF00] text-left">
            {course.title}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All courses' },
              { id: 'completed', label: 'Completed' },
              { id: 'inprogress', label: 'In progress' },
              { id: 'yet', label: 'Yet to start' }
            ].map(tab => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`h-[32px] px-4 rounded-[8px] text-[12px] font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#2D1B69] to-[#7C3AED] text-white shadow-md border-0' 
                      : 'bg-[#1A1A24] border border-[#2D2D3A] text-[#A0A0B0] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Your Roadmap */}
        <h3 className="text-[14px] font-black uppercase tracking-wider text-[#A0A0B0] mb-6 text-left">Your Roadmap</h3>

        <div className="space-y-4 text-left">
          {filteredSubCourses.length > 0 ? (
            filteredSubCourses.map((sub, index) => (
              <div 
                key={sub.id}
                className="bg-[#1A1A24] border border-[#2D2D3A] rounded-[16px] p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#BBFF00]/40 hover:shadow-[0_4px_20px_rgba(187,255,0,0.02)] transition-all duration-200"
              >
                <div className="flex-grow min-w-0">
                  <h4 className="text-[15px] sm:text-[16px] font-bold mb-3 leading-snug hover:text-[#BBFF00] transition-colors">
                    {sub.title}
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="h-[4px] bg-[#2D2D3A] rounded-full overflow-hidden w-[100px] flex-shrink-0">
                      <div className="h-full bg-[#BBFF00] rounded-full" style={{ width: `${sub.progress}%` }}></div>
                    </div>
                    <span className="text-[12px] text-[#A0A0B0] font-bold">{sub.progress}% completed</span>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate(`/course/${sub.id}/learn`)}
                  className="h-[40px] px-5 bg-[#2D2D3A] hover:bg-[#3D3D4E] text-white border border-[#3D3D4E] hover:border-white/20 text-[12px] font-bold rounded-[8px] flex items-center justify-center cursor-pointer transition-all active:scale-[0.98] whitespace-nowrap self-start md:self-auto"
                >
                  {sub.progress === 100 ? 'Review' : sub.progress > 0 ? 'Continue' : 'Start now'}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-[#A0A0B0] border border-dashed border-[#2D2D3A] rounded-[16px] bg-[#1A1A24]/30">
              No courses matching the selected filter.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
