import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Star, Award, BookOpen, Flame, Compass, ChevronRight } from 'lucide-react';

const Celebrities = () => {
  const navigate = useNavigate();

  const [celebs, setCelebs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCelebrities();
  }, []);

  const fetchCelebrities = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/celebrities/public');
      setCelebs(res.data);
    } catch (err) {
      console.error('Error fetching celebrities:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="celebrities-page" style={{ background: 'transparent', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--primary-color)' }}>Loading masterclasses...</div>
      </div>
    );
  }

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
        {celebs.map((celeb, idx) => {
          const themes = [
            { border: '#fbbf24', shadow: 'rgba(245, 158, 11, 0.45)', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' }, // Orange
            { border: '#3b82f6', shadow: 'rgba(59, 130, 246, 0.45)', gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }, // Blue
            { border: '#10b981', shadow: 'rgba(16, 185, 129, 0.45)', gradient: 'linear-gradient(135deg, #10b981, #047857)' }, // Green
            { border: '#8b5cf6', shadow: 'rgba(139, 92, 246, 0.45)', gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }, // Purple
            { border: '#ec4899', shadow: 'rgba(236, 72, 153, 0.45)', gradient: 'linear-gradient(135deg, #ec4899, #be185d)' }, // Pink
            { border: '#06b6d4', shadow: 'rgba(6, 182, 212, 0.45)', gradient: 'linear-gradient(135deg, #06b6d4, #0e7490)' }, // Cyan
          ];
          const theme = themes[idx % themes.length];
          const badgeBackground = celeb.color || theme.gradient;

          return (
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
                background: badgeBackground,
                color: '#fff',
                padding: '4px 14px',
                borderRadius: '8px',
                fontWeight: '800',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                zIndex: 2
              }}>
                {celeb.badge || 'New'}
              </div>
              <div style={{ position: 'relative' }}>
                <img 
                  src={celeb.image_url || '/placeholder_avatar.jpg'} 
                  alt={celeb.name} 
                  style={{
                    width: '280px',
                    height: '280px',
                    borderRadius: '20px',
                    objectFit: 'cover',
                    border: `2.5px solid ${theme.border}`,
                    boxShadow: `0 0 30px ${theme.shadow}, 0 15px 35px rgba(0,0,0,0.25)`,
                    filter: 'contrast(1.08) brightness(1.03) saturate(1.05)',
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
                  <Star size={14} fill="#fbbf24" /> {celeb.stats?.rating || 'New'} Instructor Rating
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
        );})}
      </div>
    </div>
  );
};

export default Celebrities;
