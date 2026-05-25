import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, BookOpen, Star, PlayCircle, Lock, ChevronRight, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import '../../styles/CourseDetail.css';

const getCelebrityImage = (name) => {
  const n = (name || '').toLowerCase();
  if (n.includes('shahrukh') || n.includes('srk')) {
    // Premium AI-style Shahrukh Khan avatar
    return '/srk_avatar.jpg';
  }
  if (n.includes('salman')) {
    // Powerful, action-styled cyber warrior avatar
    return '/salman_avatar.jpg';
  }
  if (n.includes('amir') || n.includes('aamir')) {
    // High-tech neon digital genius avatar
    return '/amir_avatar.jpg';
  }
  if (n.includes('amitabh') || n.includes('bachan')) {
    // Majestic silver wise AI grand master avatar
    return '/amitabh_avatar.jpg';
  }
  return null;
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/courses/${id}`);
      setCourse(res.data);
      if (res.data.lessons && res.data.lessons.length > 0) {
        setActiveLesson(res.data.lessons[0]);
      }
      if (user) {
        fetchProgress();
      }
    } catch (err) {
      console.error('Error fetching course details', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5001/api/courses/progress/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProgress(res.data);
    } catch (err) {
      console.error('Error fetching progress', err);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5001/api/courses/enroll', 
        { course_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Successfully enrolled!');
      fetchCourse(); // Refresh to show progress
    } catch (err) {
      toast.error(err.response?.data?.error || 'Enrollment failed');
    }
  };

  const toggleLesson = async (lessonId) => {
    const isCompleted = progress?.completed_lessons?.includes(lessonId);
    const newStatus = isCompleted ? 'in_progress' : 'completed';
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5001/api/courses/update-progress',
        { lesson_id: lessonId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProgress();
      toast.success(isCompleted ? 'Marked as unread' : 'Marked as completed!');
    } catch (err) {
      console.error('Error updating progress', err);
    }
  };

  if (loading) return <div className="loading">Loading course details...</div>;
  if (!course) return <div className="container">Course not found</div>;

  return (
    <div className="course-detail-page">
      <div className="course-hero">
        <div className="container">
          <div className="course-hero-content">
            <div className="course-hero-text">
              <span className="course-category">{course.category} • {course.level}</span>
              <h1>{course.title}</h1>
              <p className="course-tagline">{course.description}</p>
              {course.celebrity && (
                <div className="celebrity-hero-badge" style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  padding: '6px 14px',
                  borderRadius: '30px',
                  width: 'fit-content',
                  color: '#fbbf24',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '16px',
                  marginBottom: '20px'
                }}>
                  {getCelebrityImage(course.celebrity) && (
                    <img 
                      src={getCelebrityImage(course.celebrity)} 
                      alt={course.celebrity} 
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1.5px solid #fbbf24',
                        boxShadow: (course.celebrity?.toLowerCase().includes('shahrukh') || course.celebrity?.toLowerCase().includes('srk')) ? '0 0 10px #fbbf24' : 'none'
                      }}
                    />
                  )}
                  <span style={{fontSize: '0.85rem', letterSpacing: '0.5px'}}>Presented by {course.celebrity}</span>
                </div>
              )}
              <div className="course-meta-row">
                <div className="meta-item"><Star size={18} fill="#ffc107" color="#ffc107" /> <span>{course.rating} Rating</span></div>
                <div className="meta-item"><Clock size={18} /> <span>{course.duration}</span></div>
                <div className="meta-item"><BookOpen size={18} /> <span>{course.lessons_count} Lessons</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container course-main-content">
        <style>{`
          .active-lesson-highlight {
            background: rgba(139, 92, 246, 0.15) !important;
            border-left: 4px solid #8b5cf6 !important;
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.1) !important;
          }
          .lesson-interactive-item {
            transition: all 0.3s ease;
          }
          .lesson-interactive-item:hover {
            transform: translateX(4px);
            background: var(--surface-color-light);
          }
          .video-player-section {
            background: var(--surface-color);
            backdrop-filter: blur(12px);
            border: 1px solid var(--border-color);
          }
        `}</style>

        <div className="course-left">
          {progress && progress.isEnrolled && activeLesson && (
            <div className="video-player-section card mb-8 p-6 rounded-2xl shadow-2xl">
              <div className="video-wrapper mb-4" style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)'}}>
                <iframe
                  style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0}}
                  src={activeLesson.video_url}
                  title={activeLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6">
                <div style={{flex: 1}}>
                  <h3 className="text-xl font-bold text-white mb-2">{activeLesson.title}</h3>
                  <p className="text-gray-400 text-sm">{activeLesson.content || 'Enjoy this lecture video.'}</p>
                </div>
                <button
                  onClick={() => toggleLesson(activeLesson.id)}
                  className={`btn py-3 px-6 rounded-xl font-bold transition-all text-sm shadow-md whitespace-nowrap`}
                  style={progress.completed_lessons?.includes(activeLesson.id) 
                    ? {background: '#10b981', color: 'white', border: 'none'} 
                    : {background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: 'white', border: 'none'}
                  }
                >
                  {progress.completed_lessons?.includes(activeLesson.id) ? '✓ Completed' : 'Mark as Read / Completed'}
                </button>
              </div>
            </div>
          )}

          <section className="course-section">
            <div className="section-header-row">
              <h2>Course Content</h2>
              {progress && progress.isEnrolled && (
                <div className="course-progress-badge">
                  <div className="progress-bar-mini"><div className="fill" style={{width: `${progress.percentage}%`}}></div></div>
                  <span>{progress.percentage}% Complete</span>
                </div>
              )}
            </div>
            <div className="lessons-list">
              {course.lessons && course.lessons.length > 0 ? (
                course.lessons.map((lesson, index) => {
                  const isCompleted = progress?.completed_lessons?.includes(lesson.id);
                  const isActive = activeLesson?.id === lesson.id;
                  return (
                    <div 
                      key={lesson.id} 
                      className={`lesson-item lesson-interactive-item ${isActive ? 'active-lesson-highlight' : ''}`}
                      onClick={() => progress && progress.isEnrolled && setActiveLesson(lesson)}
                      style={{cursor: progress && progress.isEnrolled ? 'pointer' : 'default'}}
                    >
                      <div className="lesson-index">{index + 1}</div>
                      <div className="lesson-info" style={{flex: 1}}>
                        <h4 className={isActive ? 'text-primary-color font-bold' : ''} style={isActive ? {color: '#8b5cf6'} : {}}>{lesson.title}</h4>
                        <span className="text-xs text-gray-500">Video Lecture</span>
                      </div>
                      {progress && progress.isEnrolled ? (
                        <button 
                          className={`btn-complete ${isCompleted ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLesson(lesson.id);
                          }}
                          style={{
                            background: isCompleted ? 'rgba(16, 185, 129, 0.15)' : 'var(--surface-color-light)',
                            color: isCompleted ? '#10b981' : 'var(--text-primary)',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          {isCompleted ? <CheckCircle size={20} /> : <PlayCircle size={20} />}
                        </button>
                      ) : (
                        <PlayCircle size={20} className="play-icon" />
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="empty-lessons">
                  <p>Lessons will be available soon.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="course-right">
          <div className="enroll-card card">
            <div className="price-tag">
              {course.price === "0.00" ? 'Free' : `$${course.price}`}
            </div>
            <button 
              onClick={progress && progress.isEnrolled ? () => navigate(`/student/course/${id}`) : handleEnroll} 
              className={`btn ${progress && progress.isEnrolled ? 'btn-secondary' : 'btn-primary'} w-full btn-lg flex items-center justify-center gap-2`}
              style={progress && progress.isEnrolled ? { background: '#10b981', color: 'white' } : {}}
            >
              {progress && progress.isEnrolled ? <><CheckCircle size={20} /> Already Enrolled</> : 'Enroll Now'}
            </button>
            <p className="enroll-note">Get instant access to all materials</p>
            <div className="course-includes">
              <h4>This course includes:</h4>
              <ul>
                <li><PlayCircle size={16} /> 5 hours on-demand video</li>
                <li><BookOpen size={16} /> 12 downloadable resources</li>
                <li><Star size={16} /> Certificate of completion</li>
                <li><Lock size={16} /> Full lifetime access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
