import { Link } from "react-router-dom";
import Logo from "./Logo/Logo";
import { Linkedin, Instagram, Youtube, Twitter } from "lucide-react";
import "../styles/Footer.css";

const Footer = () => {

    return (
        <footer className="premium-footer">
            <div className="footer-max-width">
                <div className="footer-main-grid">
                    <div className="footer-brand-col">
                        <Logo size="medium" />
                        <p className="brand-pitch">
                            The world's first AI-powered learning platform featuring courses taught by AI-synthesized celebrities and tech visionaries.
                        </p>
                        <div className="social-links-footer">
                            <a href="https://linkedin.com/company/uptoskills" target="_blank" rel="noreferrer" className="social-icon-btn"><Linkedin size={18} /></a>
                            <a href="https://instagram.com/uptoskills" target="_blank" rel="noreferrer" className="social-icon-btn"><Instagram size={18} /></a>
                            <a href="https://youtube.com/@uptoskills9101" target="_blank" rel="noreferrer" className="social-icon-btn"><Youtube size={18} /></a>
                            <a href="https://twitter.com/uptoskills" target="_blank" rel="noreferrer" className="social-icon-btn"><Twitter size={18} /></a>
                        </div>
                    </div>

                    <div className="footer-links-col">
                        <h4>Platform</h4>
                        <Link to="/courses">Browse Courses</Link>
                        <Link to="/dashboard">My Learning</Link>
                        <Link to="/about">How it Works</Link>
                        <Link to="/courses">Career Paths</Link>
                    </div>

                    <div className="footer-links-col">
                        <h4>Support</h4>
                        <Link to="/contact">Help Center</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/dashboard">Refer a Friend</Link>
                    </div>

                    <div className="footer-newsletter-col">
                        <h4>Stay Updated</h4>
                        <p>Get the latest course releases directly in your inbox.</p>
                        <form className="footer-news-form">
                            <input type="email" placeholder="Email Address" required />
                            <button type="submit">Join</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom-bar">
                    <p>© 2026 UptoSkills AI Learn. All rights reserved.</p>
                    <div className="footer-legal-links">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;