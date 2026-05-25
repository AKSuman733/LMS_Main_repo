import { useState, useEffect } from 'react';
import { ArrowRight, Play, Star, Users, BookOpen, ShieldCheck, Zap, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';
import heroImage from '../assets/online_learning_path.png';
import featuresImage from '../assets/features.png';

const formatImageUrl = (url) => {
  if (!url) return 'https://images.unsplash.com/photo-1620712943543-bcc4638d9980?auto=format&fit=crop&q=80&w=600';
  if (url.includes('unsplash.com') && !url.includes('?')) {
    return `${url}?auto=format&fit=crop&q=80&w=600`;
  }
  return url;
};

const Home = () => {
  const navigate = useNavigate();
  const [freeCourses, setFreeCourses] = useState([]);

  useEffect(() => {
    const fetchFreeCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/courses');
        const free = res.data.filter(c => parseFloat(c.price) === 0 || c.price === 'Free');
        setFreeCourses(free.slice(0, 3));
      } catch (err) {
        console.error('Error fetching free courses', err);
      }
    };
    fetchFreeCourses();
  }, []);

  const displayCourses = freeCourses.length > 0 ? freeCourses : [
    {
      id: 1,
      title: 'Real World Projects on RAG',
      category: 'AI',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600&h=400',
      duration: '5 Hours',
      lessons_count: 5,
      rating: 4.6
    },
    {
      id: 2,
      title: 'Real World Projects on AI Agents',
      category: 'AI',
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4638d9980?auto=format&fit=crop&q=80&w=600&h=400',
      duration: '5 Hours',
      lessons_count: 5,
      rating: 4.7
    },
    {
      id: 3,
      title: 'Strands Agent Learning Path',
      category: 'AI',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600&h=400',
      duration: '6 Hours',
      lessons_count: 4,
      rating: 4.7
    }
  ];
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-glow"></div>
        <div className="container hero-content">
          <div className="hero-text animate-fade-in">
            <h1 className="gradient-text">Elevate Your Career with UptoSkills</h1>
            <p className="hero-subtitle">
              Kickstart your career with foundational tracks and skill-specific short courses, 
              all taught by leading experts in the field.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">1.3M+</span>
                <span className="stat-label">Enrollments</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">4.5+</span>
                <span className="stat-label">Average Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">120+</span>
                <span className="stat-label">Courses</span>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/courses" className="btn btn-primary btn-lg">
                Explore Courses <ArrowRight size={20} />
              </Link>
              <button className="btn btn-outline btn-lg">
                Watch Demo <Play size={20} />
              </button>
            </div>
          </div>
          <div className="hero-main-image animate-float">
            <img src={heroImage} alt="Online Learning Path" className="hero-img" />
          </div>
        </div>
      </section>

      {/* Skills Marquee */}
      <section className="marquee-section">
        <div className="marquee-container">
          <div className="marquee-content">
            {['Artificial Intelligence', 'Data Science', 'Full Stack Development', 'Cloud Computing', 'Cyber Security', 'Machine Learning', 'UI/UX Design', 'Blockchain', 'Digital Marketing', 'Mobile App Development'].map((skill, idx) => (
              <div key={idx} className="marquee-item">
                <Zap size={18} className="text-primary-color" />
                <span>{skill}</span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {['Artificial Intelligence', 'Data Science', 'Full Stack Development', 'Cloud Computing', 'Cyber Security', 'Machine Learning', 'UI/UX Design', 'Blockchain', 'Digital Marketing', 'Mobile App Development'].map((skill, idx) => (
              <div key={`dup-${idx}`} className="marquee-item">
                <Zap size={18} className="text-primary-color" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Celebrities Section */}
      <section id="celebrities" className="celebrities-showcase-section py-20" style={{background: 'var(--surface-color-light)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)'}}>
        <div className="container">
          <div className="section-header text-center mb-16" style={{textAlign: 'center', marginBottom: '60px'}}>
            <span className="text-primary-color font-bold tracking-wider text-sm uppercase block mb-3" style={{color: 'var(--primary-color)', fontWeight: 'bold', letterSpacing: '2px', display: 'block', marginBottom: '12px'}}>⭐ Masterclass Presenters ⭐</span>
            <h2 className="section-title text-4xl font-extrabold text-white" style={{fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)'}}>Learn from the Legends</h2>
            <p className="section-subtitle text-gray-400 max-w-2xl mx-auto mt-4" style={{color: 'var(--text-secondary)', maxWidth: '650px', margin: '16px auto 0'}}>
              Get inspired by exclusive, cinematic masterclasses presenting foundational programming and technology tracks, explained in the signature style of your favorite icons!
            </p>
          </div>

          <div className="celebrity-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}>
            {[
              {
                name: 'Shahrukh Khan',
                avatar: '/srk_avatar.jpg',
                role: 'King Khan Style Lectures',
                quote: '"Learn technical structures with premium, high-energy charisma!"',
                topic: 'Java & Foundations',
                color: 'linear-gradient(135deg, #f59e0b, #d97706)'
              },
              {
                name: 'Salman Khan',
                avatar: '/salman_avatar.jpg',
                role: 'Bhaijaan Style Masterclass',
                quote: '"Crush complex algorithms with absolute power and simple logic!"',
                topic: 'Data Structures (DSA)',
                color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
              },
              {
                name: 'Amir Khan',
                avatar: '/amir_avatar.jpg',
                role: 'Mr. Perfectionist Learning',
                quote: '"No shortcuts. Master variables, classes, and logic with ultimate perfection."',
                topic: 'Python Programming',
                color: 'linear-gradient(135deg, #10b981, #047857)'
              },
              {
                name: 'Amitabh Bachan',
                avatar: '/amitabh_avatar.jpg',
                role: 'Big B Legendary Guidance',
                quote: '"Build persistent foundations and rule the modern software universe!"',
                topic: 'C & Systems Engineering',
                color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)'
              }
            ].map((celeb, idx) => (
              <div 
                key={idx} 
                className="celebrity-card card glass p-6 text-center animate-fade-in"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: '24px',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'var(--surface-color)',
                  padding: '30px 24px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                }}
                onClick={() => navigate(`/courses?celebrity=${encodeURIComponent(celeb.name)}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                }}
              >
                <div className="avatar-wrapper mb-6" style={{position: 'relative', marginBottom: '24px'}}>
                  <img 
                    src={celeb.avatar} 
                    alt={celeb.name} 
                    style={{
                      width: '110px',
                      height: '110px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: celeb.name === 'Shahrukh Khan' ? '3px solid #fbbf24' :
                              celeb.name === 'Salman Khan' ? '3px solid #3b82f6' :
                              celeb.name === 'Amir Khan' ? '3px solid #10b981' :
                              (celeb.name.includes('Amitabh') || celeb.name.includes('Bachan')) ? '3px solid #8b5cf6' :
                              '3px solid var(--border-color)',
                      boxShadow: celeb.name === 'Shahrukh Khan' ? '0 0 20px rgba(245, 158, 11, 0.6), 0 8px 24px rgba(0,0,0,0.2)' :
                                 celeb.name === 'Salman Khan' ? '0 0 20px rgba(59, 130, 246, 0.6), 0 8px 24px rgba(0,0,0,0.2)' :
                                 celeb.name === 'Amir Khan' ? '0 0 20px rgba(16, 185, 129, 0.6), 0 8px 24px rgba(0,0,0,0.2)' :
                                 (celeb.name.includes('Amitabh') || celeb.name.includes('Bachan')) ? '0 0 20px rgba(139, 92, 246, 0.6), 0 8px 24px rgba(0,0,0,0.2)' :
                                 '0 8px 24px rgba(0,0,0,0.2)',
                      filter: celeb.name === 'Shahrukh Khan' ? 'contrast(1.08) brightness(1.03) saturate(1.05)' :
                              celeb.name === 'Salman Khan' ? 'contrast(1.06) brightness(1.03) saturate(1.05)' :
                              celeb.name === 'Amir Khan' ? 'contrast(1.08) brightness(1.02) saturate(1.03)' :
                              (celeb.name.includes('Amitabh') || celeb.name.includes('Bachan')) ? 'contrast(1.08) brightness(1.03) saturate(1.05)' :
                              'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center text-white" style={{
                    background: celeb.color, 
                    position: 'absolute', 
                    bottom: '0', 
                    right: '8px', 
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem'
                  }}>
                    ⭐
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2" style={{fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px'}}>{celeb.name}</h3>
                <span className="text-sm font-semibold mb-4 px-3 py-1 rounded-full" style={{
                  background: 'rgba(139, 92, 246, 0.1)', 
                  color: 'var(--primary-color)', 
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  marginBottom: '16px',
                  display: 'inline-block'
                }}>
                  {celeb.role}
                </span>
                
                <p className="text-gray-400 italic text-xs leading-relaxed mb-6" style={{color: 'var(--text-secondary)', fontSize: '0.75rem', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '24px', minHeight: '36px'}}>{celeb.quote}</p>
                
                <div className="w-full pt-4 mt-auto" style={{borderTop: '1px solid var(--border-color)', width: '100%', paddingTop: '16px'}}>
                  <span className="text-xs text-gray-500 uppercase block mb-1" style={{fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px', letterSpacing: '1px'}}>Featured Topic</span>
                  <span className="text-sm font-bold text-white block" style={{fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)'}}>{celeb.topic}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Choose UptoSkills?</h2>
            <p className="section-subtitle">Unlock your potential with our industry-leading features</p>
          </div>

          <div className="features-grid">
            <div className="feature-card animate-fade-in">
              <div className="feature-icon-wrapper">
                <BookOpen className="feature-icon" size={32} />
              </div>
              <h3>Curated Content</h3>
              <p>Learn from high-quality courses designed by industry veterans and experts.</p>
            </div>

            <div className="feature-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="feature-icon-wrapper">
                <ShieldCheck className="feature-icon" size={32} />
              </div>
              <h3>Verified Certificates</h3>
              <p>Earn industry-recognized certificates to boost your professional portfolio.</p>
            </div>

            <div className="feature-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="feature-icon-wrapper">
                <Zap className="feature-icon" size={32} />
              </div>
              <h3>Hands-on Learning</h3>
              <p>Work on real-world projects and interactive labs to solidify your skills.</p>
            </div>

            <div className="feature-card animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="feature-icon-wrapper">
                <Globe className="feature-icon" size={32} />
              </div>
              <h3>Global Community</h3>
              <p>Connect with millions of learners worldwide and share your journey.</p>
            </div>
          </div>

          <div className="features-showcase mt-16 animate-fade-in">
            <div className="showcase-content">
              <h2>Master the Skills that Matter</h2>
              <p>From foundational basics to advanced AI and Data Science, UptoSkills provides the path you need to succeed in the modern job market.</p>
              <ul className="showcase-list">
                <li><ArrowRight size={16} /> 24/7 Access to all materials</li>
                <li><ArrowRight size={16} /> Industry-relevant project work</li>
                <li><ArrowRight size={16} /> Personalized learning tracks</li>
              </ul>
            </div>
            <div className="showcase-image">
              <img src={featuresImage} alt="Features Showcase" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Preview */}
      <section className="featured-courses" style={{ padding: '60px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 className="section-title" style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Free Courses</h2>
            <Link to="/courses" className="view-all" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.95rem' }}>View All <ArrowRight size={16} /></Link>
          </div>
          
          <div className="course-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {displayCourses.map((course) => (
              <div key={course.id} className="course-card card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden', transition: 'var(--transition)' }}>
                <div className="course-thumbnail" style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img 
                    src={formatImageUrl(course.thumbnail)} 
                    alt={course.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  />
                  <span className="badge" style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(139, 92, 246, 0.95)', color: 'white', padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {course.category || 'AI'}
                  </span>
                </div>
                <div className="course-info" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span className="course-meta" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                    {course.duration} • {course.lessons_count} Lessons
                  </span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px', lineHeight: '1.4', minHeight: '52px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {course.title}
                  </h3>
                  <div className="course-stats" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                    <div className="course-stat" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <Users size={14} /> {course.students_count || 1200 + course.id * 150} Students
                    </div>
                    <div className="course-stat" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#ffb800', fontWeight: '600' }}>
                      <Star size={14} fill="#ffb800" color="#ffb800" /> {course.rating}
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary w-full" 
                    style={{ padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', transition: 'var(--transition)' }}
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    Enroll for Free
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
