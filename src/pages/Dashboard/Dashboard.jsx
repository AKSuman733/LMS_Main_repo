import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import group1Img from "../../assets/group1.png";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="main-content page-fade">

      {/* ================= HERO SECTION ================= */}
      <div id="home" className="hero-section">

        <div className="hero-left">
          <h1>Learn Skills That Build Careers</h1>

          <p>
            Master industry-ready skills through practical learning,
            real projects, and expert mentorship.
          </p>

          <div className="hero-buttons">
            <button
              className="secondary-btn"
              onClick={() => navigate("/createaccount")}
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="hero-right">
          <img src={group1Img}
          alt="learning"
           width="500"
           height="333"
          fetchPriority="high"
          loading="eager"
          decoding="async"/>
    
        </div>

      </div>

      {/* ================= STATS ================= */}
      <div className="stats-grid">

        <div className="stats-card">
          <h3>10+</h3>
          <p>Courses</p>
        </div>

        <div className="stats-card">
          <h3>5+</h3>
          <p>Mentors</p>
        </div>

        <div className="stats-card">
          <h3>100%</h3>
          <p>Skill Learning</p>
        </div>

        <div className="stats-card">
          <h3>24/7</h3>
          <p>Support</p>
        </div>

      </div>

      {/* ================= CONTENT GRID ================= */}
      <div className="dashboard-grid">

        {/* ABOUT */}
        <div className="card about-card">
          <h2 id="about">About UptoSkills</h2>

          <p>
            UptoSkills is a modern learning platform designed to help
            students and professionals gain practical, industry-relevant
            skills through structured learning paths.
          </p>

          <p>
            Our mission is to make education practical, accessible,
            and career-focused so learners can confidently achieve
            their goals.
          </p>
        </div>
        {/*course*/}
        <div id="courses" className="card">
  <h2>Popular Courses</h2>

  <div className="course-grid">
    <div>
      <h3>React Development</h3>
      <p>Build modern web applications.</p>
    </div>

    <div>
      <h3>Java Full Stack</h3>
      <p>Frontend + Backend development.</p>
    </div>

    <div>
      <h3>Python Programming</h3>
      <p>Programming fundamentals to advanced.</p>
    </div>
  </div>
</div>




{/*how it works*/}
<div className="card">
  <h2>How It Works</h2>

  <div className="journey-grid">
    <div>1️⃣ Create Account</div>
    <div>2️⃣ Choose Course</div>
    <div>3️⃣ Learn & Practice</div>
    <div>4️⃣ Complete Challenges</div>
    <div>5️⃣ Earn Certificate</div>
  </div>
</div>



{/*reviews*/}

<div className="card">
  <h2>Student Success Stories</h2>

  <div className="testimonial">
    ⭐⭐⭐⭐⭐
    <p>
      UptoSkills helped me learn React and land my
      first internship.
    </p>
    <h4>- Student</h4>
      ⭐⭐⭐⭐
    <p>
      UptoSkills helped me learning python.
    </p>
    <h4>- Student</h4>
  </div>
</div>

        {/* CONTACT */}
       <section className="contact-section">
  <h2 id="contact">Contact Us</h2>

  <div className="contact-item">
    📧 support@uptoskills.com
  </div>

  <div className="contact-item">
    📞 +91 98765 43210
  </div>

  <div className="contact-item">
    🌐 www.uptoskills.com
  </div>

  <div className="contact-item">
    📍 Delhi, India
  </div>
</section>

      </div>

    </div>
  );
}

export default Dashboard;