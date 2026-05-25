import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserCog, GraduationCap, Presentation, ArrowRight, ArrowLeft } from 'lucide-react';
import '../../styles/Auth.css';
import adminImg from '../../assets/roles/admin.png';
import studentImg from '../../assets/roles/student.png';
import instructorImg from '../../assets/roles/instructor.png';

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container role-selection-page">
      <div className="selection-overlay"></div>
      
      <div style={{ position: 'absolute', top: '30px', left: '30px', zIndex: 20 }}>
        <Link to="/">
          <img src="/logo.png" alt="UptoSkills Logo" style={{ height: '40px', objectFit: 'contain' }} />
        </Link>
      </div>
      <Link to="/" className="back-btn" style={{ zIndex: 10, right: '30px', left: 'auto', top: '30px' }}>
        <ArrowLeft size={18} /> Back to Home
      </Link>

      <div className="selection-content">
        <div className="selection-header">
          <h1>Choose Your Path</h1>
          <p>Select your role to access your personalized learning environment</p>
        </div>

        <div className="role-cards-container">
          {/* Admin Card */}
          <div className="role-card admin" onClick={() => navigate('/login/admin')}>
            <div className="role-image-wrapper">
              <img src={adminImg} alt="Admin" />
              <div className="role-icon-badge">
                <UserCog size={24} />
              </div>
            </div>
            <div className="role-info">
              <h2>Admin Portal</h2>
              <p>Manage courses, users, and oversee the platform's growth.</p>
              <button className="role-btn">
                Login as Admin <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Student Card */}
          <div className="role-card student" onClick={() => navigate('/login/student')}>
            <div className="role-image-wrapper">
              <img src={studentImg} alt="Student" />
              <div className="role-icon-badge">
                <GraduationCap size={24} />
              </div>
            </div>
            <div className="role-info">
              <h2>Student Hub</h2>
              <p>Access your courses, track progress, and learn new skills.</p>
              <button className="role-btn">
                Login as Student <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .role-selection-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-gradient);
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .selection-header {
          text-align: center;
          margin-bottom: 50px;
          animation: fadeInDown 0.8s ease-out;
        }

        .selection-header h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 16px;
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .selection-header p {
          color: var(--text-secondary);
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .role-cards-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          max-width: 800px;
          width: 100%;
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .role-card {
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: 30px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .role-card:hover {
          transform: translateY(-15px);
          border-color: var(--primary-color);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }

        .role-image-wrapper {
          height: 280px;
          position: relative;
          overflow: hidden;
        }

        .role-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .role-card:hover .role-image-wrapper img {
          transform: scale(1.1);
        }

        .role-icon-badge {
          position: absolute;
          bottom: -20px;
          right: 30px;
          width: 60px;
          height: 60px;
          background: var(--primary-gradient);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
          border: 4px solid var(--surface-color);
        }

        .role-info {
          padding: 40px 30px;
        }

        .role-info h2 {
          font-size: 1.8rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .role-info p {
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .role-btn {
          background: var(--surface-color-light);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .role-card:hover .role-btn {
          background: var(--primary-gradient);
          color: white;
          border-color: transparent;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .role-cards-container {
            grid-template-columns: 1fr;
          }
          .selection-header h1 {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginSelection;
