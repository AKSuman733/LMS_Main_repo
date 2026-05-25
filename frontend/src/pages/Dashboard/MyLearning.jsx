import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BookOpen, 
  Clock, 
  ChevronRight, 
  Search,
  PlayCircle,
  CheckCircle,
  Trophy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/CourseList.css'; // Reuse some styles

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
};

const formatImageUrl = (url) => {
  if (!url) return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600';
  if (url.includes('unsplash.com') && !url.includes('?')) {
    return `${url}?auto=format&fit=crop&q=80&w=600`;
  }
  return url;
};

const MyLearning = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching enrollments with token:', token ? 'Present' : 'Missing');
      const response = await axios.get('http://localhost:5001/api/courses/my-enrollments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Enrollments response:', response.data);
      setEnrollments(response.data);
    } catch (err) {
      console.error('Error fetching enrollments', err);
      const errorMsg = err.response?.data?.error || err.message || 'Failed to load courses';
      toast.error(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredEnrollments = enrollments.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-learning-page container">
      <div className="course-list-header">
        <div className="header-text">
          <h1>My Learning</h1>
          <p>Keep track of your progress and continue where you left off</p>
          <div className="text-xs text-gray-500 mt-2">
            Debug: User ID {user?.id} | Enrollments: {enrollments.length}
            <button onClick={fetchEnrollments} className="ml-4 underline">Refresh</button>
          </div>
        </div>
        <div className="header-search">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search my courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state py-20">
          <div className="spinner"></div>
          <p className="mt-4">Loading your journey...</p>
        </div>
      ) : enrollments.length === 0 ? (
        <div className="empty-state py-20">
          <BookOpen size={64} className="text-gray-600 mb-6" />
          <h2>You haven't enrolled in any courses yet</h2>
          <p className="mb-8">Explore our catalog and start your learning journey today!</p>
          <Link to="/student/explore" className="btn btn-primary">Browse Courses</Link>
        </div>
      ) : (
        <div className="course-grid mt-10">
          {filteredEnrollments.map((course) => (
            <div key={course.id} className="course-card card glass overflow-hidden">
              <div className="course-thumbnail relative">
                <img src={formatImageUrl(course.thumbnail)} alt={course.title} />
                <div className="course-badge">{course.category}</div>
                {course.celebrity && (
                  <div 
                    className="course-badge" 
                    style={{
                      top: '10px', 
                      left: '10px', 
                      right: 'auto', 
                      background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', 
                      color: '#000', 
                      fontWeight: 'bold', 
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '3px 8px 3px 3px',
                      borderRadius: '20px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                      zIndex: 2,
                      textTransform: 'none'
                    }}
                  >
                    {getCelebrityImage(course.celebrity) && (
                      <img 
                        src={getCelebrityImage(course.celebrity)} 
                        alt={course.celebrity} 
                        style={{
                          width: '22px', 
                          height: '22px', 
                          borderRadius: '50%', 
                          objectFit: 'cover', 
                          border: (course.celebrity?.toLowerCase().includes('shahrukh') || course.celebrity?.toLowerCase().includes('srk')) ? '1.5px solid #fbbf24' :
                                  course.celebrity?.toLowerCase().includes('salman') ? '1.5px solid #3b82f6' :
                                  (course.celebrity?.toLowerCase().includes('amir') || course.celebrity?.toLowerCase().includes('aamir')) ? '1.5px solid #10b981' :
                                  (course.celebrity?.toLowerCase().includes('amitabh') || course.celebrity?.toLowerCase().includes('bachan')) ? '1.5px solid #8b5cf6' :
                                  '1.5px solid #000',
                          boxShadow: (course.celebrity?.toLowerCase().includes('shahrukh') || course.celebrity?.toLowerCase().includes('srk')) ? '0 0 8px #fbbf24' :
                                     course.celebrity?.toLowerCase().includes('salman') ? '0 0 8px #3b82f6' :
                                     (course.celebrity?.toLowerCase().includes('amir') || course.celebrity?.toLowerCase().includes('aamir')) ? '0 0 8px #10b981' :
                                     (course.celebrity?.toLowerCase().includes('amitabh') || course.celebrity?.toLowerCase().includes('bachan')) ? '0 0 8px #8b5cf6' :
                                     'none'
                        }} 
                      />
                    )}
                    <span style={{fontSize: '0.65rem', letterSpacing: '0.5px'}}>{course.celebrity}</span>
                  </div>
                )}
                {course.progress === 100 && (
                  <div className="completed-badge">
                    <CheckCircle size={16} /> Completed
                  </div>
                )}
              </div>
              
              <div className="course-info p-6">
                <div className="course-meta mb-3">
                  <span className={`course-level ${course.level?.toLowerCase()}`}>{course.level}</span>
                  <span className="course-duration">
                    <Clock size={14} /> {course.duration || 'Self-paced'}
                  </span>
                </div>
                
                <h3 className="mb-4">{course.title}</h3>
                
                <div className="progress-container-premium mb-6">
                  <div className="progress-info mb-2">
                    <span className="text-sm font-medium text-gray-400">Course Progress</span>
                    <span className="text-sm font-bold text-primary-color">{course.progress}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${course.progress}%`,
                        background: course.progress === 100 ? '#10b981' : 'var(--primary-gradient)'
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="course-footer">
                  <Link to={`/student/course/${course.id}`} className="btn-continue">
                    {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLearning;
