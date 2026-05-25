import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="premium-footer">
      <div className="footer-glow"></div>
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <img src="/logo.png" alt="UptoSkills Logo" style={{ height: '40px', objectFit: 'contain', marginBottom: '16px' }} />
            <p className="footer-description">
              Empowering the next generation of tech leaders with world-class education and industry-recognized skills.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><Facebook size={20} /></a>
              <a href="#" className="social-link"><Twitter size={20} /></a>
              <a href="#" className="social-link"><Instagram size={20} /></a>
              <a href="#" className="social-link"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">All Courses</Link></li>
              <li><Link to="/celebrities">Celebrities</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/login/student">Student Login</Link></li>
              <li><Link to="/register">Create Account</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h3>Popular Categories</h3>
            <ul className="footer-links">
              <li><Link to="/courses?category=AI">Artificial Intelligence</Link></li>
              <li><Link to="/courses?category=Full Stack Development">Web Development</Link></li>
              <li><Link to="/courses?category=Cloud Computing">Cloud Computing</Link></li>
              <li><Link to="/courses?category=Data Science">Data Science</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col contact-col">
            <h3>Contact Us</h3>
            <ul className="contact-info">
              <li>
                <Mail size={18} />
                <span>support@uptoskills.com</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li>
                <MapPin size={18} />
                <span>Tech Park, Sector 62, Noida, UP, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} UptoSkills Learning Platform. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
