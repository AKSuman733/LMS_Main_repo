import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Award, BookOpen, Flame, Compass, ChevronRight } from 'lucide-react';

const getCelebStyling = (name) => {
  const n = (name || '').toLowerCase();
  if (n.includes('shahrukh') || n.includes('srk')) {
    return {
      border: '2.5px solid #fbbf24',
      boxShadow: '0 0 30px rgba(245, 158, 11, 0.45), 0 15px 35px rgba(0,0,0,0.25)',
      filter: 'contrast(1.08) brightness(1.03) saturate(1.05)'
    };
  }
  if (n.includes('salman')) {
    return {
      border: '2.5px solid #3b82f6',
      boxShadow: '0 0 30px rgba(59, 130, 246, 0.45), 0 15px 35px rgba(0,0,0,0.25)',
      filter: 'contrast(1.06) brightness(1.03) saturate(1.05)'
    };
  }
  if (n.includes('amir') || n.includes('aamir')) {
    return {
      border: '2.5px solid #10b981',
      boxShadow: '0 0 30px rgba(16, 185, 129, 0.45), 0 15px 35px rgba(0,0,0,0.25)',
      filter: 'contrast(1.08) brightness(1.02) saturate(1.03)'
    };
  }
  if (n.includes('amitabh') || n.includes('bachan')) {
    return {
      border: '2.5px solid #8b5cf6',
      boxShadow: '0 0 30px rgba(139, 92, 246, 0.45), 0 15px 35px rgba(0,0,0,0.25)',
      filter: 'contrast(1.08) brightness(1.03) saturate(1.05)'
    };
  }
  return {
    border: '1px solid var(--border-color)',
    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
    filter: 'none'
  };
};

const Celebrities = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const celebs = [
    {
      name: 'Shahrukh Khan',
      avatar: '/srk_avatar.jpg',
      role: 'King Khan Style Lectures',
      quote: '"Learn technical structures with premium, high-energy charisma!"',
      topic: 'Java & Foundations',
      description: 'Unlock Java and core object-oriented structures with the legendary charisma of King Khan. This exclusive masterclass merges professional engineering principles with absolute style, making complex code memorable and engaging.',
      stats: { lessons: 10, rating: '4.9', students: '12K+' },
      badge: 'Bestseller',
      color: 'linear-gradient(135deg, #f59e0b, #d97706)'
    },
    {
      name: 'Salman Khan',
      avatar: '/salman_avatar.jpg',
      role: 'Bhaijaan Style Masterclass',
      quote: '"Crush complex algorithms with absolute power and simple logic!"',
      topic: 'Data Structures (DSA)',
      description: 'Tackle the absolute toughest backend concepts. Salman Khan brings the power of action-style instruction, breaking down complex data structures and algorithmic complexity into muscle-memory logic that anyone can master.',
      stats: { lessons: 10, rating: '4.8', students: '9.4K+' },
      badge: 'Trending',
      color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    },
    {
      name: 'Amir Khan',
      avatar: '/amir_avatar.jpg',
      role: 'Mr. Perfectionist Learning',
      quote: '"No shortcuts. Master variables, classes, and logic with ultimate perfection."',
      topic: 'Python Programming',
      description: 'For those who strive for pure mastery. Amir Khan brings his signature detail-oriented, flawless execution style to Python, teaching syntax, logic models, and scripting with meticulous attention to absolute excellence.',
      stats: { lessons: 10, rating: '5.0', students: '8.1K+' },
      badge: 'High Rated',
      color: 'linear-gradient(135deg, #10b981, #047857)'
    },
    {
      name: 'Amitabh Bachan',
      avatar: '/amitabh_avatar.jpg',
      role: 'Big B Legendary Guidance',
      quote: '"Build persistent foundations and rule the modern software universe!"',
      topic: 'C & Systems Engineering',
      description: 'Begin your legacy under the guidance of the ultimate icon. Amitabh Bachchan shares system engineering and core C-language logic with a majestic, commanding methodology, cementing your absolute fundamentals.',
      stats: { lessons: 10, rating: '4.9', students: '15K+' },
      badge: 'Legendary',
      color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)'
    }
  ];

  return (
    <div className="celebrities-page" style={{
      background: 'transparent',
      color: 'var(--text-primary)',
      minHeight: '100vh',
      paddingBottom: '100px'
    }}>
      {/* Hero Header */}
      <div className="celeb-hero" style={{
        position: 'relative',
        padding: '120px 20px 80px',
        background: 'radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.12), transparent 60%)',
        textAlign: 'center',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(139, 92, 246, 0.1)',
          color: 'var(--primary-color)',
          padding: '6px 16px',
          borderRadius: '30px',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          border: '1px solid var(--border-color)'
        }}>
          <Flame size={16} /> EXCLUSIVE MASTERCLASSES
        </div>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          background: 'linear-gradient(to right, var(--text-primary), var(--primary-color), var(--secondary-color))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px',
          letterSpacing: '-1px'
        }}>
          Learn From The Legends
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Accelerate your software engineering path with exclusive masterclasses. Enjoy foundation topics explained in the iconic storytelling style of legendary Indian superstars.
        </p>
      </div>

      {/* Grid Showcase */}
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '60px auto 0',
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px'
      }}>
        {celebs.map((celeb, idx) => (
          <div 
            key={idx} 
            className="celeb-showcase-card card glass" 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px',
              background: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              alignItems: 'center'
            }}
          >
            {/* Left Column: Image & Badge */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '-10px',
                background: celeb.color,
                color: '#000',
                padding: '4px 14px',
                borderRadius: '8px',
                fontWeight: '800',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                zIndex: 2
              }}>
                {celeb.badge}
              </div>
              <div style={{ position: 'relative' }}>
                <img 
                  src={celeb.avatar} 
                  alt={celeb.name} 
                  style={{
                    width: '280px',
                    height: '280px',
                    borderRadius: '20px',
                    objectFit: 'cover',
                    ...getCelebStyling(celeb.name),
                    transition: 'all 0.3s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  background: 'var(--surface-color-light)',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  color: '#fbbf24',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                  <Star size={14} fill="#fbbf24" /> {celeb.stats.rating} Instructor Rating
                </div>
              </div>
            </div>

            {/* Right Column: Information & CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>{celeb.name}</h2>
                <Award size={24} style={{ color: '#fbbf24' }} />
              </div>
              
              <span style={{
                color: 'var(--primary-color)',
                fontWeight: '700',
                fontSize: '1rem',
                letterSpacing: '0.5px',
                marginBottom: '16px',
                display: 'block'
              }}>
                {celeb.role}
              </span>

              <p style={{
                background: 'var(--surface-color-light)',
                borderLeft: '4px solid var(--primary-color)',
                padding: '12px 18px',
                borderRadius: '0 12px 12px 0',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                marginBottom: '20px',
                lineHeight: '1.5'
              }}>
                {celeb.quote}
              </p>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: '1.7',
                marginBottom: '24px'
              }}>
                {celeb.description}
              </p>

              {/* Specs Grid */}
              <div style={{
                display: 'flex',
                gap: '30px',
                marginBottom: '30px',
                background: 'var(--surface-color-light)',
                padding: '16px 24px',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                width: 'fit-content'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={16} style={{ color: 'var(--primary-color)' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <strong>{celeb.stats.lessons}</strong> HD Lectures
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Compass size={16} style={{ color: 'var(--primary-color)' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Topic: <strong>{celeb.topic}</strong>
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => navigate(`/courses?celebrity=${encodeURIComponent(celeb.name)}`)}
                className="btn btn-primary"
                style={{
                  width: 'fit-content',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 28px',
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginTop: 'auto'
                }}
              >
                Explore {celeb.topic} Masterclasses <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Celebrities;
