import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Play, CheckCircle2, Circle, ArrowLeft, BookOpen, Clock, FileText, Search, X, Maximize2, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockCourses } from '../../utils/mockCourses';
import { getEnrollments } from '../../utils/enrollmentStore';

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

interface Lesson {
  title: string;
  type: 'video' | 'lab';
  durationLabel: string;
  videoUrl?: string;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

export function CoursePlayer() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const [enrollment, setEnrollment] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  
  // Search state for lessons in sidebar
  const [searchQuery, setSearchQuery] = useState('');
  const [colabLoading, setColabLoading] = useState(false);
  const [colabExecuted, setColabExecuted] = useState(false);

  // Dynamic modules mapping based on RAG or general course content
  const modules: Module[] = course?.id.startsWith('sub-rag-') || course?.id === 'course-1' || course?.id === 'course-5' ? [
    {
      title: 'End to End RAG Application Development',
      lessons: [
        { title: 'End to End RAG Application Development', type: 'video', durationLabel: 'VIDEO • 27 MIN', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { title: 'Course Handouts', type: 'lab', durationLabel: 'DOWNLOADS' }
      ]
    },
    {
      title: 'LangChain & Vector Store Orchestration',
      lessons: [
        { title: 'ChromaDB Indexing & Query Routing', type: 'video', durationLabel: 'VIDEO • 18 MIN', videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
        { title: 'Hands-on RAG Agent Lab', type: 'lab', durationLabel: 'CODING LAB' }
      ]
    }
  ] : [
    {
      title: 'Module 1: Getting Started',
      lessons: [
        { title: 'Course Introduction', type: 'video', durationLabel: 'VIDEO • 12 MIN', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { title: 'Environment Setup and Verification', type: 'lab', durationLabel: 'LAB EXERCISE' }
      ]
    },
    {
      title: 'Module 2: Core Concepts',
      lessons: [
        { title: 'Theoretical Framework', type: 'video', durationLabel: 'VIDEO • 20 MIN', videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
        { title: 'Interactive Handouts', type: 'lab', durationLabel: 'HANDOUTS' }
      ]
    }
  ];

  const totalLessonsCount = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!course) return;

    const allEnrollments = getEnrollments();
    const found = allEnrollments.find(e => e.studentId === user.id && e.courseId === course.id);
    
    if (!found) {
      // Auto enroll
      const newEnrollment = {
        id: `enr-${Date.now()}`,
        studentId: user.id,
        studentName: user.name,
        studentEmail: user.email,
        studentAvatar: user.name?.slice(0, 2).toUpperCase() || 'ST',
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
      const updated = [newEnrollment, ...allEnrollments];
      localStorage.setItem('enrollments', JSON.stringify(updated));
      setEnrollment(newEnrollment);
    } else {
      setEnrollment(found);
    }

    const savedCompleted = localStorage.getItem(`completed_lessons_${user.id}_${course.id}`);
    if (savedCompleted) {
      setCompletedLessons(JSON.parse(savedCompleted));
    }
  }, [id, user, course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center p-6 text-slate-800">
        <h1 className="text-[28px] font-bold mb-2">Course not found</h1>
        <Link to="/courses" className="text-[#2D1B69] font-semibold hover:underline">
          Back to Courses
        </Link>
      </div>
    );
  }

  const activeLesson = modules[activeModuleIndex]?.lessons[activeLessonIndex];

  const handleLessonClick = (moduleIdx: number, lessonIdx: number) => {
    setActiveModuleIndex(moduleIdx);
    setActiveLessonIndex(lessonIdx);
    setColabExecuted(false);
  };

  const handleCompleteAndContinue = () => {
    if (!user) return;
    const lessonKey = `${activeModuleIndex}-${activeLessonIndex}`;
    let updatedCompleted = [...completedLessons];
    
    if (!completedLessons.includes(lessonKey)) {
      updatedCompleted.push(lessonKey);
      setCompletedLessons(updatedCompleted);
      localStorage.setItem(`completed_lessons_${user.id}_${course.id}`, JSON.stringify(updatedCompleted));
    }

    const newProgress = Math.round((updatedCompleted.length / totalLessonsCount) * 100);
    const allEnrollments = getEnrollments();
    const index = allEnrollments.findIndex(e => e.studentId === user.id && e.courseId === course.id);
    
    if (index !== -1) {
      allEnrollments[index].progress = newProgress;
      allEnrollments[index].status = newProgress === 100 ? 'completed' : 'in-progress';
      allEnrollments[index].lastActive = new Date().toISOString().split('T')[0];
      allEnrollments[index].certificateIssued = newProgress === 100;
      localStorage.setItem('enrollments', JSON.stringify(allEnrollments));
      
      if (enrollment) {
        setEnrollment({
          ...enrollment,
          progress: newProgress,
          status: allEnrollments[index].status,
        });
      }
    }

    // Move to next lesson
    let nextLessonIdx = activeLessonIndex + 1;
    let nextModuleIdx = activeModuleIndex;

    if (nextLessonIdx >= modules[activeModuleIndex].lessons.length) {
      nextLessonIdx = 0;
      nextModuleIdx = activeModuleIndex + 1;
    }

    if (nextModuleIdx < modules.length) {
      setActiveModuleIndex(nextModuleIdx);
      setActiveLessonIndex(nextLessonIdx);
      setColabExecuted(false);
    } else {
      // Completed last lesson
      alert(`Congratulations! You have completed "${course.title}". Check your dashboard for the certificate!`);
      navigate('/dashboard/courses');
    }
  };

  const runColabCode = () => {
    setColabLoading(true);
    setTimeout(() => {
      setColabLoading(false);
      setColabExecuted(true);
    }, 2000);
  };

  // Filter modules/lessons based on search query
  const filteredModules = modules.map((mod, modIdx) => {
    const matchingLessons = mod.lessons.map((les, lesIdx) => ({
      ...les,
      originalModIdx: modIdx,
      originalLesIdx: lesIdx
    })).filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return {
      ...mod,
      lessons: matchingLessons,
      originalModIdx: modIdx
    };
  }).filter(m => m.lessons.length > 0);

  const currentProgress = enrollment ? enrollment.progress : 0;

  return (
    <div className="min-h-screen bg-white flex font-sans h-screen overflow-hidden text-slate-800">
      
      {/* LEFT SIDEBAR - Light blue-grey theme */}
      <aside className="w-[320px] bg-[#EDF2F7] border-r border-[#CBD5E0] flex flex-col h-full flex-shrink-0">
        
        {/* Brand Header */}
        <div className="h-[64px] bg-[#1A365D] px-5 flex items-center justify-between text-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[18px] font-black tracking-tight text-[#BBFF00]">Learnify</span>
            <div className="w-[5px] h-[5px] rounded-full bg-[#BBFF00]"></div>
          </div>
          <Link to="/courses" className="text-[12px] text-slate-300 hover:text-white flex items-center gap-1 font-semibold">
            <ArrowLeft size={12} /> Exit
          </Link>
        </div>

        {/* Course Info Summary */}
        <div className="p-5 border-b border-[#CBD5E0] flex-shrink-0 bg-white text-left">
          <h2 className="text-[14px] font-extrabold text-[#2D3748] leading-snug mb-3">
            {course.title}
          </h2>
          <div className="flex items-center justify-between text-[13px] text-[#4A5568] font-bold">
            <span>{currentProgress}% complete</span>
            <span className="text-[#1A365D]">
              {completedLessons.length}/{totalLessonsCount} lessons
            </span>
          </div>
          <div className="h-[5px] bg-[#E2E8F0] rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${currentProgress}%` }}></div>
          </div>

          {/* Dynamic Course Mentor Display */}
          <div className="flex items-center gap-2 border-t border-[#EDF2F7] pt-3 mt-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-all" onClick={() => setIsMentorModalOpen(true)}>
            <img 
              src={currentMentor.avatar} 
              alt={currentMentor.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
              onError={(e) => {
                e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${currentMentor.name}`;
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-[#718096] font-bold uppercase tracking-wider leading-none">Course Mentor</div>
              <div className="text-[13px] text-[#2D3748] font-extrabold truncate hover:text-blue-600 flex items-center gap-1 mt-0.5">
                {currentMentor.name}
              </div>
            </div>
            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 flex-shrink-0">Change</span>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="p-3 border-b border-[#CBD5E0] flex-shrink-0 bg-white">
          <div className="relative flex items-center rounded-lg border border-[#CBD5E0] bg-[#F7FAFC]">
            <Search size={16} className="absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by lesson title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[36px] pl-9 pr-8 bg-transparent text-[13px] outline-none text-[#2D3748] placeholder-slate-400 font-medium"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 text-slate-400 hover:text-slate-700">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Syllabus List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredModules.map((mod, index) => {
            const moduleKey = mod.originalModIdx;
            const completedInMod = mod.lessons.filter(l => completedLessons.includes(`${moduleKey}-${l.originalLesIdx}`)).length;
            const totalInMod = mod.lessons.length;

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-[12px] font-black uppercase text-[#4A5568] tracking-wider px-1">
                  <span className="truncate">{mod.title}</span>
                  <span className="ml-2 text-slate-500 font-bold whitespace-nowrap">{completedInMod}/{totalInMod}</span>
                </div>
                <div className="space-y-1">
                  {mod.lessons.map((les, lesIdx) => {
                    const originalModuleIdx = les.originalModIdx;
                    const originalLessonIdx = les.originalLesIdx;
                    const lessonKey = `${originalModuleIdx}-${originalLessonIdx}`;
                    const isCompleted = completedLessons.includes(lessonKey);
                    const isActive = activeModuleIndex === originalModuleIdx && activeLessonIndex === originalLessonIdx;

                    return (
                      <button
                        key={lesIdx}
                        onClick={() => handleLessonClick(originalModuleIdx, originalLessonIdx)}
                        className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                          isActive 
                            ? 'bg-white border-[#3182CE] shadow-xs text-[#2B6CB0]' 
                            : 'bg-transparent border-transparent hover:bg-slate-200 text-[#4A5568]'
                        }`}
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 size={16} className="text-[#3182CE]" />
                          ) : (
                            <Circle size={16} className="text-slate-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className={`text-[13px] leading-snug font-bold ${isActive ? 'text-[#2D3748]' : 'text-[#4A5568]'}`}>
                            {les.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-bold uppercase mt-1">
                            {les.durationLabel}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* RIGHT CONTENT PANEL */}
      <main className="flex-grow flex flex-col h-full bg-[#F7FAFC] overflow-hidden relative">
        
        {/* Header bar */}
        <header className="h-[64px] bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between flex-shrink-0">
          <h2 className="text-[16px] font-extrabold text-[#1A365D]">
            {activeLesson ? activeLesson.title : 'Overview'}
          </h2>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800" title="Full Screen">
              <Maximize2 size={18} />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-grow overflow-y-auto p-6 pb-[100px]">
          {activeLesson ? (
            activeLesson.type === 'video' ? (
              /* VIDEO LESSON SCREEN */
              <div className="max-w-[800px] mx-auto">
                <div className="bg-black aspect-video rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0] mb-6">
                  <video 
                    key={activeLesson.title}
                    src={activeLesson.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs text-left">
                  <h3 className="text-[16px] font-black text-[#1A365D] mb-3">About this Video</h3>
                  <p className="text-[14px] text-[#4A5568] leading-relaxed">
                    Watch the instructional lesson on {activeLesson.title}. Follow along with your workbook or open the Colab notebook in the next lesson to verify installation and start coding.
                  </p>
                </div>
              </div>
            ) : (
              /* LAB / INTERACTIVE GOOGLE COLAB SCREEN - Matches 2nd screenshot exactly */
              <div className="max-w-[900px] mx-auto border border-[#E2E8F0] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                
                {/* Colab Top Bar Menu */}
                <div className="bg-[#FFF8F0] border-b border-[#FEEBC8] px-4 py-2 flex items-center justify-between text-slate-700 select-none">
                  <div className="flex items-center gap-4 text-[12px] font-bold text-[#7B341E]">
                    {/* Orange Colab logo */}
                    <div className="flex items-center gap-1">
                      <span className="w-5 h-5 rounded-full bg-[#E65100] flex items-center justify-center text-white text-[10px] font-black">CO</span>
                      <span className="text-[13px] font-black text-slate-800">Colab</span>
                    </div>
                    <span>File</span>
                    <span>Edit</span>
                    <span>View</span>
                    <span>Insert</span>
                    <span>Runtime</span>
                    <span>Tools</span>
                    <span>Help</span>
                    <span className="text-slate-400 font-normal">Saving...</span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] font-extrabold text-[#7B341E]">
                    <button className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 border border-amber-200 rounded text-[#7B341E] flex items-center gap-1 cursor-pointer">
                      💬 Comment
                    </button>
                    <button className="px-2.5 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded flex items-center gap-1 cursor-pointer shadow-xs border-0">
                      👥 Share
                    </button>
                    <span className="w-[1px] h-4 bg-amber-200"></span>
                    {/* RAM/Disk status indicators */}
                    <div className="flex gap-1.5 bg-amber-50 border border-amber-100 rounded px-2 py-0.5 text-[10px] text-amber-700 font-mono">
                      <span>RAM</span>
                      <span className="w-2.5 h-1 bg-green-500 rounded-full mt-1.5"></span>
                      <span className="ml-1">DISK</span>
                      <span className="w-2.5 h-1 bg-green-500 rounded-full mt-1.5"></span>
                    </div>
                  </div>
                </div>

                {/* Colab Document Body */}
                <div className="p-6 space-y-6 text-left font-sans bg-[#FAFAFA]">
                  
                  {/* Markdown Cell */}
                  <div className="border-l-4 border-orange-500 pl-4 bg-white p-5 rounded-r-xl border border-l-0 border-[#E2E8F0] shadow-2xs">
                    <h1 className="text-[20px] font-extrabold text-[#1A202C] mb-4">
                      File QA RAG Chatbot App with ChatGPT, LangChain and Streamlit
                    </h1>
                    <p className="text-[14px] text-slate-600 mb-4 leading-relaxed font-medium">
                      Here we will implement an advanced RAG System with ChatGPT, LangChain and Streamlit to build a File QA UI-based chatbot with the following features:
                    </p>
                    <ul className="list-disc pl-5 text-[13.5px] text-slate-600 space-y-2 font-medium">
                      <li><strong>PDF Document Upload and Indexing:</strong> Allows files to be uploaded and parsed dynamically.</li>
                      <li><strong>RAG System for query analysis and response:</strong> Integrates context windows.</li>
                      <li><strong>Result streaming capabilities:</strong> Real-time output streaming.</li>
                      <li><strong>Show document sources of the answer:</strong> Highlights file citations from RAG database vector chunks.</li>
                    </ul>
                  </div>

                  {/* Code Cell 1 */}
                  <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden shadow-2xs">
                    
                    {/* Play button run code box */}
                    <div className="flex items-stretch bg-slate-50 p-4 border-b border-[#E2E8F0]">
                      <button 
                        onClick={runColabCode}
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all self-center mr-4 flex-shrink-0 ${
                          colabLoading 
                            ? 'bg-[#E2E8F0] text-slate-400' 
                            : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md active:scale-95'
                        }`}
                        title="Run Cell (Ctrl+Enter)"
                      >
                        {colabLoading ? (
                          <svg className="animate-spin h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <Play size={18} fill="white" stroke="white" className="ml-0.5" />
                        )}
                      </button>
                      <div className="flex-1 font-mono text-[13px] bg-[#F8FAFC] border border-[#CBD5E0] rounded-lg p-3 select-all overflow-x-auto text-[#0F172A]">
                        <div><span className="text-red-500">!pip</span> install langchain==0.1.12</div>
                        <div><span className="text-red-500">!pip</span> install langchain-openai==0.0.8</div>
                      </div>
                    </div>

                    {/* Output cell */}
                    {(colabLoading || colabExecuted) && (
                      <div className="bg-slate-900 p-4 font-mono text-[11px] text-slate-300 overflow-x-auto border-t border-slate-900 select-all">
                        {colabLoading ? (
                          <div className="text-slate-400 animate-pulse">Running pip installation script...</div>
                        ) : (
                          <div className="space-y-1">
                            <div className="text-[#38BDF8]">Executing (1m 6s) &gt; cell line: 6 &gt; system() &gt; _system_compat() &gt; _run_command() &gt; _monitor_process() &gt; _poll_process()</div>
                            <div className="text-green-400">Requirement already satisfied: langchain==0.1.12 in /usr/local/lib/python3.10/dist-packages (0.1.12)</div>
                            <div className="text-green-400">Requirement already satisfied: langchain-openai==0.0.8 in /usr/local/lib/python3.10/dist-packages (0.0.8)</div>
                            <div className="text-slate-400">Successfully completed install verification metrics logs.</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Markdown Helper Alert */}
                  <div className="flex gap-3 bg-[#EBF8FF] border border-[#BEE3F8] rounded-xl p-4 text-[#2B6CB0]">
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-extrabold text-[14px]">Colab Lab Exercise Directions</div>
                      <p className="text-[13px] text-[#2C5282] mt-1 leading-normal">
                        Click the run play button on the cell above to mock-run the dependencies download. Verify package dependencies outputs are successfully matching the code block environment before clicking continue.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )
          ) : (
            <div className="text-center py-20 text-slate-400">
              Select a lesson from the sidebar to continue.
            </div>
          )}
        </div>

        {/* BOTTOM STICKY BAR - COMPLETE & CONTINUE */}
        <footer className="h-[76px] bg-white border-t border-[#E2E8F0] flex items-center justify-center absolute bottom-0 left-0 right-0 z-30 shadow-md">
          <button
            onClick={handleCompleteAndContinue}
            className="h-[46px] px-8 bg-[#0099FF] hover:bg-[#0080FF] active:scale-[0.98] text-white font-extrabold text-[14px] rounded-lg tracking-wider flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer border-0"
          >
            COMPLETE & CONTINUE →
          </button>
        </footer>

      </main>

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
            type="button"
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
export default CoursePlayer;
