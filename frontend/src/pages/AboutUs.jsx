import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Award, Zap, Compass, Users, ArrowRight, Star, Heart } from 'lucide-react';

const AboutUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const milestones = [
    { year: '2023', title: 'The Spark', desc: 'UptoSkills is established with a vision to make high-quality programming tracks accessible to aspiring developers across the country.' },
    { year: '2024', title: 'Slick Scaling', desc: 'Introduced hands-on interactive code labs and expanded our active student community, reaching 500K+ total enrollments.' },
    { year: '2025', title: 'Legendary Masterclasses', desc: 'Pioneered our signature Celebrity Masterclass modules, combining cinematic Indian superstar narration with systems engineering.' },
    { year: '2026', title: 'Global Recognition', desc: 'Exceeded 1.3 million active enrollments, partnering with top technology companies to offer globally recognized placement certifications.' }
  ];

  return (
    <div className="about-us-page" style={{
      background: 'transparent',
      color: 'var(--text-primary)',
      minHeight: '100vh',
      paddingBottom: '100px'
    }}>
      {/* Hero Banner */}
      <div className="about-hero" style={{
        position: 'relative',
        padding: '120px 20px 80px',
        background: 'radial-gradient(circle at 50% 30%, rgba(236, 72, 153, 0.08), transparent 60%)',
        textAlign: 'center',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(236, 72, 153, 0.1)',
          color: 'var(--secondary-color)',
          padding: '6px 16px',
          borderRadius: '30px',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          border: '1px solid var(--border-color)'
        }}>
          <Heart size={16} fill="currentColor" /> OUR STORY & VISION
        </div>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          background: 'linear-gradient(to right, var(--text-primary), var(--secondary-color), var(--primary-color))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px',
          letterSpacing: '-1px'
        }}>
          Empowering Next-Gen Innovators
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          maxWidth: '750px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          UptoSkills is a state-of-the-art interactive platform engineered to deliver premium foundations and advanced software learning paths, guided by industry giants and cinematic masterclass presenters.
        </p>
      </div>

      {/* Main Container */}
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '60px auto 0',
        padding: '0 20px'
      }}>
        
        {/* Core Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '30px',
          marginBottom: '80px'
        }}>
          {[
            { value: '1.3M+', label: 'Global Enrollments', icon: <Users size={24} style={{ color: 'var(--secondary-color)' }} /> },
            { value: '4.9/5', label: 'Average Learning Score', icon: <Star size={24} style={{ color: '#fbbf24' }} /> },
            { value: '120+', label: 'Interactive Code Tracks', icon: <Zap size={24} style={{ color: 'var(--primary-color)' }} /> },
            { value: '98%', label: 'Career Success Rate', icon: <Award size={24} style={{ color: 'var(--success-color)' }} /> }
          ].map((stat, idx) => (
            <div key={idx} className="card glass" style={{
              background: 'var(--surface-color)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
            }}>
              <div style={{ display: 'inline-flex', marginBottom: '12px' }}>{stat.icon}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Statement Block */}
        <div className="card glass" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '50px',
          background: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          borderRadius: '28px',
          padding: '50px',
          marginBottom: '80px',
          alignItems: 'center',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
        }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Our Noble Mission
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem', marginBottom: '20px' }}>
              At UptoSkills, we believe that learning technology shouldn't feel dry, tedious, or standard. High-quality code architecture, systems logic, and web foundations should be exciting, interactive, and deeply memorable.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
              By merging pristine technical curriculums designed by industry veterans with cinematic lectures guided by iconic legends, we bridge the gap between technical complexity and artistic understanding, helping students acquire real-world expertise effortlessly.
            </p>
          </div>
          <div style={{
            background: 'var(--surface-color-light)',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '16px', color: 'var(--secondary-color)' }}>Why We Stand Out</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: 0, listStyle: 'none', margin: 0 }}>
              {[
                { title: 'Legendary Storytelling', desc: 'Superstars explaining foundations for unforgettable retention.' },
                { title: 'Interactive Lesson Milestones', desc: 'Track progress at detailed code and video levels.' },
                { title: 'Industry-Standard Certifications', desc: 'Resume-boosting certificates recognized worldwide.' }
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '12px' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--success-color)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '0.95rem' }}>{item.title}</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', textAlign: 'center', marginBottom: '50px', color: 'var(--text-primary)' }}>
            The Road to 1.3M+ Learners
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {milestones.map((m, idx) => (
              <div key={idx} className="card glass" style={{
                background: 'var(--surface-color-light)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                padding: '30px',
                position: 'relative'
              }}>
                <span style={{
                  fontSize: '2.5rem',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, var(--secondary-color), var(--primary-color))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'block',
                  marginBottom: '10px'
                }}>
                  {m.year}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>{m.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="card glass text-center" style={{
          background: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '50px 30px',
          textAlign: 'center',
          boxShadow: '0 20px 45px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px' }}>
            Ready to Begin Your Premium Journey?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 24px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Join over 1.3 million students building advanced software engineering careers. Enroll in exclusive tracks today!
          </p>
          <button 
            onClick={() => navigate('/courses')}
            className="btn btn-primary"
            style={{
              padding: '14px 36px',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              border: 'none',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.2)'
            }}
          >
            Explore Interactive Courses <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
