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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
            <div className="social-links" aria-label="Social Media">
              <a href="#" className="social-link" aria-label="Facebook"><Facebook size={20} aria-hidden="true" /></a>
              <a href="#" className="social-link" aria-label="Twitter"><Twitter size={20} aria-hidden="true" /></a>
              <a href="#" className="social-link" aria-label="Instagram"><Instagram size={20} aria-hidden="true" /></a>
              <a href="#" className="social-link" aria-label="LinkedIn"><Linkedin size={20} aria-hidden="true" /></a>
<<<<<<< HEAD
=======
=======
            <div className="social-links">
              <a href="#" className="social-link"><Facebook size={20} /></a>
              <a href="#" className="social-link"><Twitter size={20} /></a>
              <a href="#" className="social-link"><Instagram size={20} /></a>
              <a href="#" className="social-link"><Linkedin size={20} /></a>
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
            </div>
          </div>

          {/* Quick Links */}
<<<<<<< HEAD
          <nav className="footer-col" aria-label="Quick Links">
=======
<<<<<<< HEAD
          <nav className="footer-col" aria-label="Quick Links">
=======
          <div className="footer-col">
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">All Courses</Link></li>
              <li><Link to="/celebrities">Celebrities</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/login/student">Student Login</Link></li>
              <li><Link to="/register">Create Account</Link></li>
            </ul>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
          </nav>

          {/* Categories */}
          <nav className="footer-col" aria-label="Popular Categories">
<<<<<<< HEAD
=======
=======
          </div>

          {/* Categories */}
          <div className="footer-col">
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
            <h3>Popular Categories</h3>
            <ul className="footer-links">
              <li><Link to="/courses?category=AI">Artificial Intelligence</Link></li>
              <li><Link to="/courses?category=Full Stack Development">Web Development</Link></li>
              <li><Link to="/courses?category=Cloud Computing">Cloud Computing</Link></li>
              <li><Link to="/courses?category=Data Science">Data Science</Link></li>
            </ul>
<<<<<<< HEAD
          </nav>
=======
<<<<<<< HEAD
          </nav>
=======
          </div>
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383

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
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
            <nav className="footer-legal" aria-label="Legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </nav>
<<<<<<< HEAD
=======
=======
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
