import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Filter,
  Search,
  Grid,
  List,
  ChevronRight,
  Clock,
  IndianRupee,
  BookOpen
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../styles/CourseList.css';

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
  if (!url) return 'https://images.unsplash.com/photo-1620712943543-bcc4638d9980?auto=format&fit=crop&q=80&w=600';
  if (url.includes('unsplash.com') && !url.includes('?')) {
    return `${url}?auto=format&fit=crop&q=80&w=600`;
  }
  return url;
};

const CourseList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [durationFilter, setDurationFilter] = useState('All');
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [userEnrollments, setUserEnrollments] = useState(new Set());
<<<<<<< HEAD
  const [viewMode, setViewMode] = useState('grid');
=======
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLevelChange = (level) => {
    setSelectedLevels(prev => {
      if (prev.includes(level)) {
        return prev.filter(l => l !== level);
      } else {
        return [...prev, level];
      }
    });
  };

  const categories = [
    'All',
    'Java Programming',
    'Python',
    'Full Stack Development',
    'Cloud Computing',
    'Data Science',
    'DSA',
    'AI'
  ];

  useEffect(() => {
    fetchCourses();
    if (user) {
      fetchUserEnrollments();
    }
  }, [searchTerm, selectedCategory, durationFilter, selectedLevels]);

  const fetchUserEnrollments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/courses/my-enrollments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const enrolledIds = new Set(res.data.map(c => c.id));
      setUserEnrollments(enrolledIds);
    } catch (err) {
      console.error('Error fetching enrollments', err);
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const levelQuery = selectedLevels.length > 0 ? selectedLevels.join(',') : 'All';
      const res = await axios.get(`http://localhost:5001/api/courses?search=${searchTerm}&category=${selectedCategory}&duration=${durationFilter}&level=${levelQuery}`);
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-list-page container">
      <div className="course-list-header">
        <div className="header-text">
          <h1>Explore Courses</h1>
          <p>Join thousands of students learning world-class technical skills at UptoSkills</p>
        </div>
        <div className="header-search">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="What do you want to learn today?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="course-list-layout">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-card">
            <div className="filter-group">
<<<<<<< HEAD
              <h2>Categories</h2>
=======
<<<<<<< HEAD
              <h2>Categories</h2>
=======
              <h3>Categories</h3>
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
              <div className="category-list">
                {categories.map(cat => (
                  <label key={cat} className={`category-item ${selectedCategory === cat ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group border-t pt-6">
<<<<<<< HEAD
              <h2>Difficulty Level</h2>
=======
<<<<<<< HEAD
              <h2>Difficulty Level</h2>
=======
              <h3>Difficulty Level</h3>
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
              <div className="checkbox-list">
                <label className={`checkbox-item ${selectedLevels.includes('Beginner') ? 'active' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={selectedLevels.includes('Beginner')}
                    onChange={() => handleLevelChange('Beginner')}
                  /> 
                  <span>Beginner</span>
                </label>
                <label className={`checkbox-item ${selectedLevels.includes('Intermediate') ? 'active' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={selectedLevels.includes('Intermediate')}
                    onChange={() => handleLevelChange('Intermediate')}
                  /> 
                  <span>Intermediate</span>
                </label>
                <label className={`checkbox-item ${selectedLevels.includes('Advanced') ? 'active' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={selectedLevels.includes('Advanced')}
                    onChange={() => handleLevelChange('Advanced')}
                  /> 
                  <span>Advanced</span>
                </label>
              </div>
            </div>

            <div className="filter-group border-t pt-6">
<<<<<<< HEAD
              <h2>Course Duration</h2>
=======
<<<<<<< HEAD
              <h2>Course Duration</h2>
=======
              <h3>Course Duration</h3>
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
              <div className="checkbox-list">
                <label className={`checkbox-item ${durationFilter === 'All' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="duration"
                    checked={durationFilter === 'All'}
                    onChange={() => setDurationFilter('All')}
                  />
                  <span>All Durations</span>
                </label>
                <label className={`checkbox-item ${durationFilter === 'short' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="duration"
                    checked={durationFilter === 'short'}
                    onChange={() => setDurationFilter('short')}
                  />
                  <span>Short (&lt; 1 hour)</span>
                </label>
                <label className={`checkbox-item ${durationFilter === 'medium' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="duration"
                    checked={durationFilter === 'medium'}
                    onChange={() => setDurationFilter('medium')}
                  />
                  <span>Medium (1–4 hours)</span>
                </label>
                <label className={`checkbox-item ${durationFilter === 'long' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="duration"
                    checked={durationFilter === 'long'}
                    onChange={() => setDurationFilter('long')}
                  />
                  <span>Long (&gt; 4 hours)</span>
                </label>
              </div>
            </div>


          </div>
        </aside>

        {/* Course Grid */}
        <div className="course-results">
          <div className="results-toolbar">
            <span className="results-count">Showing <strong>{courses.length}</strong> courses</span>
            <div className="view-toggle">
<<<<<<< HEAD
              <button 
                className={viewMode === 'grid' ? 'active' : ''} 
                onClick={() => setViewMode('grid')}
                title="Grid View" 
                aria-label="Grid View"
              >
                <Grid size={18} aria-hidden="true" />
              </button>
              <button 
                className={viewMode === 'list' ? 'active' : ''} 
                onClick={() => setViewMode('list')}
                title="List View" 
                aria-label="List View"
              >
                <List size={18} aria-hidden="true" />
              </button>
=======
<<<<<<< HEAD
              <button className="active" title="Grid View" aria-label="Grid View"><Grid size={18} aria-hidden="true" /></button>
              <button title="List View" aria-label="List View"><List size={18} aria-hidden="true" /></button>
=======
              <button className="active" title="Grid View"><Grid size={18} /></button>
              <button title="List View"><List size={18} /></button>
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Fetching world-class content...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="empty-state">
<<<<<<< HEAD
              <BookOpen size={48} aria-hidden="true" />
              <h2>No courses found</h2>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "course-grid animate-fade-in" : "course-list-view animate-fade-in"}>
=======
<<<<<<< HEAD
              <BookOpen size={48} aria-hidden="true" />
              <h2>No courses found</h2>
=======
              <BookOpen size={48} />
              <h3>No courses found</h3>
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="course-grid animate-fade-in">
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
              {courses.map((course) => {
                // Determine the correct detail link based on the current path
                const isStudentPath = window.location.pathname.startsWith('/student');
                const isAdminPath = window.location.pathname.startsWith('/admin');
                let detailLink = `/course/${course.id}`;
                if (isStudentPath) detailLink = `/student/course/${course.id}`;
                if (isAdminPath) detailLink = `/admin/course/${course.id}`;

                return (
                  <Link to={detailLink} key={course.id} className="course-card card">
                    <div className="course-thumbnail">
<<<<<<< HEAD
                      <img src={formatImageUrl(course.thumbnail)} alt={course.title || 'Course thumbnail'} />
=======
<<<<<<< HEAD
                      <img src={formatImageUrl(course.thumbnail)} alt={course.title || 'Course thumbnail'} />
=======
                      <img src={formatImageUrl(course.thumbnail)} alt={course.title} />
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                      <div className="course-badge">{course.category}</div>
                      {(() => {
                        const celeb = localStorage.getItem(`course_${course.id}_celebrity`);
                        return celeb ? (
                          <div
                            className="course-badge"
                            style={{
                              top: userEnrollments.has(course.id) ? '48px' : '10px',
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
                            {getCelebrityImage(celeb) && (
                              <img
                                src={getCelebrityImage(celeb)}
<<<<<<< HEAD
                                alt={`Presenter ${celeb}`}
=======
<<<<<<< HEAD
                                alt={`Presenter ${celeb}`}
=======
                                alt={celeb}
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                                style={{
                                  width: '22px',
                                  height: '22px',
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                  border: (celeb?.toLowerCase().includes('shahrukh') || celeb?.toLowerCase().includes('srk')) ? '1.5px solid #fbbf24' :
                                          celeb?.toLowerCase().includes('salman') ? '1.5px solid #3b82f6' :
                                          (celeb?.toLowerCase().includes('amir') || celeb?.toLowerCase().includes('aamir')) ? '1.5px solid #10b981' :
<<<<<<< HEAD
                                          (celeb?.toLowerCase().includes('amitabh') || celeb?.toLowerCase().includes('bachan')) ? '1.5px solid #FF6B35' :
=======
                                          (celeb?.toLowerCase().includes('amitabh') || celeb?.toLowerCase().includes('bachan')) ? '1.5px solid #8b5cf6' :
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                                          '1.5px solid #000',
                                  boxShadow: (celeb?.toLowerCase().includes('shahrukh') || celeb?.toLowerCase().includes('srk')) ? '0 0 8px #fbbf24' :
                                             celeb?.toLowerCase().includes('salman') ? '0 0 8px #3b82f6' :
                                             (celeb?.toLowerCase().includes('amir') || celeb?.toLowerCase().includes('aamir')) ? '0 0 8px #10b981' :
<<<<<<< HEAD
                                             (celeb?.toLowerCase().includes('amitabh') || celeb?.toLowerCase().includes('bachan')) ? '0 0 8px #FF6B35' :
=======
                                             (celeb?.toLowerCase().includes('amitabh') || celeb?.toLowerCase().includes('bachan')) ? '0 0 8px #8b5cf6' :
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                                             'none'
                                }}
                              />
                            )}
                            <span style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>{celeb}</span>
                          </div>
                        ) : null;
                      })()}
                      {userEnrollments.has(course.id) && (
                        <div className="enrolled-label">Already Enrolled</div>
                      )}
                    </div>
                    <div className="course-info">
                      <div className="course-meta">
                        <span className={`course-level ${course.level?.toLowerCase()}`}>{course.level}</span>
                        <span className="course-duration">
                          <Clock size={14} /> {course.duration || 'Self-paced'}
                        </span>
                      </div>
                      <h3>{course.title}</h3>
                      <p className="course-desc">{course.description?.substring(0, 100)}...</p>
                      <div className="course-footer">
                        <div className="price-container">
                          {course.price === "0.00" ? (
                            <span className="price free">Free</span>
                          ) : (
                            <span className="price">
                              <IndianRupee size={16} />{course.price}
                            </span>
                          )}
                        </div>
                        <div className="btn-explore">
                          Explore <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
