import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Star, Clock, BookOpen, Calendar, Play, Lock, Check, Share2, Linkedin, Twitter, Link as LinkIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { mockCourses } from '../../utils/mockCourses';

export function CourseDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);

  const course = mockCourses.find(c => c.id === id);

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
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={courseData.instructor.avatar}
                    alt={courseData.instructor.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="text-[15px] font-bold text-[#1A1A2E]">
                      {courseData.instructor.name}
                    </div>
                    <div className="text-[13px] text-[#6B6B80]">{courseData.instructor.role}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="h-[52px] text-[16px] px-8">
                    Enroll for free
                  </Button>
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
                    <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group">
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
    </div>
  );
}
