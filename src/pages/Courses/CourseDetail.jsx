import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import demoVideo from "../../assets/videos/demo.mp4";

const coursesData = [
  { id: 1, title: "Machine Learning Basics", mentor: "Elon Musk", level: "Beginner", duration: "4 hrs", rating: "4.8", students: "2.1k", img: "/src/assets/elon.jpg",
    about: "This course covers all the fundamentals of Machine Learning from scratch. You will learn supervised, unsupervised learning and model evaluation.",
    outcomes: ["Understand ML algorithms", "Build predictive models", "Work with real datasets", "Evaluate model performance"],
    curriculum: ["Introduction to ML", "Linear Regression", "Classification", "Clustering", "Model Evaluation"]
  },
  { id: 2, title: "Deep Learning A-Z", mentor: "Cristiano Ronaldo", level: "Intermediate", duration: "6 hrs", rating: "4.7", students: "1.8k", img: "/src/assets/ronaldo.jpg",
    about: "Master deep learning concepts including neural networks, CNNs and RNNs with hands-on projects.",
    outcomes: ["Build neural networks", "Implement CNNs", "Work with RNNs", "Deploy deep learning models"],
    curriculum: ["Neural Networks", "CNNs", "RNNs", "Transfer Learning", "Model Deployment"]
  },
  { id: 3, title: "Python for Data Science", mentor: "Virat Kohli", level: "Beginner", duration: "3 hrs", rating: "4.9", students: "3.2k", img: "/src/assets/virat.jpg",
    about: "Learn Python programming for data science including pandas, numpy and matplotlib.",
    outcomes: ["Python basics", "Data manipulation", "Data visualization", "Statistical analysis"],
    curriculum: ["Python Basics", "Pandas", "Numpy", "Matplotlib", "Data Cleaning"]
  },
  { id: 4, title: "AI & Neural Networks", mentor: "Shah Rukh Khan", level: "Advanced", duration: "8 hrs", rating: "4.6", students: "980", img: "/src/assets/srk.jpg",
    about: "Advanced course on Artificial Intelligence and Neural Networks for experienced developers.",
    outcomes: ["Advanced AI concepts", "Build complex networks", "Optimize models", "Real world AI applications"],
    curriculum: ["AI Foundations", "Advanced Neural Networks", "Optimization", "AI Ethics", "Projects"]
  },
  { id: 5, title: "Data Visualization", mentor: "Priyanka Chopra", level: "Beginner", duration: "2 hrs", rating: "4.5", students: "1.5k", img: "/src/assets/priyanka.jpg",
    about: "Learn to create stunning data visualizations using modern tools and techniques.",
    outcomes: ["Create charts and graphs", "Use visualization tools", "Tell stories with data", "Build dashboards"],
    curriculum: ["Intro to Visualization", "Charts & Graphs", "Dashboards", "Storytelling with Data", "Tools"]
  },
  { id: 6, title: "NLP Fundamentals", mentor: "Lionel Messi", level: "Intermediate", duration: "5 hrs", rating: "4.7", students: "2.4k", img: "/src/assets/messi.jpg",
    about: "Master Natural Language Processing concepts and build real world NLP applications.",
    outcomes: ["Text preprocessing", "Sentiment analysis", "Build chatbots", "Language models"],
    curriculum: ["Text Processing", "Sentiment Analysis", "Named Entity Recognition", "Chatbots", "Language Models"]
  },
];

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = () => setIsLoggedIn(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [showModal, setShowModal] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [modalPassword, setModalPassword] = useState("");
  const [modalError, setModalError] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const scrollRef = useRef(null);
  const course = coursesData.find(c => c.id === parseInt(id));

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const sections = ["about", "outcomes", "curriculum", "instructor"];
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && container.scrollTop >= el.offsetTop - 120) {
        setActiveTab(sections[i]);
        break;
      }
    }
  };

  const scrollTo = (sectionId) => {
    setActiveTab(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      scrollRef.current.scrollTo({
        top: el.offsetTop - 60,
        behavior: "smooth"
      });
    }
  };

 const handleEnrollClick = () => {
  setEnrolled(true);
};

  const handleModalLogin = () => {
    if (!modalEmail || !modalPassword) {
      setModalError("Please enter email and password!");
      return;
    }
    login();
    setShowModal(false);
    setEnrolled(true);
    setModalEmail("");
    setModalPassword("");
    setModalError("");
  };

  if (!course) return <div style={{color:"white",padding:"40px"}}>Course not found!</div>;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; height: 100%; margin: 0; padding: 0; overflow-x: hidden; background: #0f0f1a; }

        .navbar {
          background: #1a1a2e;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #2a2a3e;
          height: 70px;
          z-index: 100;
          position: sticky;
          top: 0;
        }
        .logo { font-size: 22px; font-weight: 700; color: #e94560; cursor: pointer; }

        .detail-wrap {
          display: flex;
          height: calc(100vh - 70px);
          overflow: hidden;
          gap: 0;
        }

        /* LEFT - scrollable */
        .detail-left {
          flex: 1;
          height: 100%;
          overflow-y: auto;
          padding: 100px 32px 32px 24px;
          scrollbar-width: none;
        }
        .detail-left::-webkit-scrollbar { display: none; }

        .detail-left h1 {
          font-size: 34px; font-weight: 700;
          margin-bottom: 32px; margin-top: 16px;
          color: white; text-align: center;
        }

        .meta-row { display: flex; gap: 32px; margin-bottom: 24px; justify-content: center; }
        .meta-item h3 { font-size: 28px; font-weight: 700; color: white; }
        .meta-item p { font-size: 14px; color: #aaa; margin-top: 4px; }

        .enroll-btn {
          padding: 14px 40px;
          background: linear-gradient(90deg, #e94560, #f97316);
          color: white; border: none; border-radius: 8px;
          font-size: 17px; font-weight: 600; cursor: pointer;
          display: block; margin: 0 auto 24px auto;
        }
        .enroll-btn:hover { opacity: 0.9; transform: scale(1.02); transition: 0.2s; }

        .enrolled-badge {
          padding: 14px 40px; background: #16a34a;
          color: white; border: none; border-radius: 8px;
          font-size: 17px; font-weight: 600;
          display: block; margin: 0 auto 24px auto;
          text-align: center;
        }

        /* Sticky tabs inside scrollable div */
        .tabs {
          display: flex; 
          gap: 24px;
          border-bottom: 1px solid #2a2a3e;
          margin-bottom: 32px;
          background: #0f0f1a; 
          z-index: 99;
          padding-top: 8px;
        }
        .tab { padding: 12px 0; font-size: 15px; color: #aaa; cursor: pointer; border-bottom: 2px solid transparent; }
        .tab.active { color: white; border-bottom: 2px solid #e94560; }

        .section-title { font-size: 26px; font-weight: 700; margin-bottom: 16px; margin-top: 8px; color: white; }
        .about-text { font-size: 16px; color: #aaa; line-height: 1.8; margin-bottom: 36px; }

        .outcomes-list { list-style: none; margin-bottom: 36px; }
        .outcomes-list li {
          padding: 10px 0; font-size: 16px; color: #ccc;
          display: flex; align-items: center; gap: 12px;
        }
        .outcomes-list li::before { content: "✅"; }

        .curriculum-item {
          background: #1a1a2e; border-radius: 8px;
          margin-bottom: 10px; border: 1px solid #2a2a3e; overflow: hidden;
        }
        .curriculum-header {
          padding: 16px 20px; cursor: pointer;
          display: flex; justify-content: space-between;
          align-items: center; font-size: 18px; color: #ccc;
        }
        .curriculum-body {
          padding: 14px 28px; font-size: 16px;
          color: #aaa; line-height: 2.4; border-top: 1px solid #2a2a3e;
        }

        /* RIGHT - fixed */
        .detail-right {
          width: 300px;
          flex-shrink: 0;
          height: 100%;
          overflow-y: auto;
          padding: 32px 24px 32px 0;
          scrollbar-width: none;
          border-left: 1px solid #2a2a3e;
          padding-left: 24px;
        }
        .detail-right::-webkit-scrollbar { display: none; }

        .mentor-card {
          background: #1a1a2e; border: 1px solid #2a2a3e;
          border-radius: 12px; overflow: hidden; margin-bottom: 16px;
        }
        .mentor-card img { width: 100%; height: 200px; object-fit: cover; object-position: center center; }
        .mentor-info { padding: 16px; }
        .mentor-name { font-size: 16px; font-weight: 700; margin-bottom: 4px; color: white; }
        .mentor-title { font-size: 13px; color: #aaa; }

        .take-first-step {
          background: #1a1a2e; border: 1px solid #2a2a3e;
          border-radius: 12px; padding: 24px;
        }
        .take-first-step h3 { font-size: 20px; font-weight: 700; margin-bottom: 4px; color: white; }
        .take-first-step .sub { font-size: 13px; color: #aaa; margin-bottom: 20px; }

        .step-item {
          display: flex; flex-direction: row;
          align-items: center; justify-content: flex-start;
          gap: 14px; margin-bottom: 16px;
        }
        .step-icon { font-size: 22px; flex-shrink: 0; }
        .step-info { display: flex; flex-direction: column; align-items: flex-start; }
        .step-info h4 { font-size: 20px; font-weight: 700; color: white; }
        .step-info p { font-size: 13px; color: #aaa; margin-top: 4px; }

        .enroll-btn-right {
          width: 100%; padding: 14px;
          background: linear-gradient(90deg, #e94560, #f97316);
          color: white; border: none; border-radius: 8px;
          font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 20px;
        }
        .enrolled-badge-right {
          width: 100%; padding: 14px; background: #16a34a;
          color: white; border: none; border-radius: 8px;
          font-size: 16px; font-weight: 600; margin-top: 20px; text-align: center;
        }

        /* MODAL */
        .modal-overlay {
          position: fixed; top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.75);
          display: flex; align-items: center; justify-content: center;
          z-index: 999; backdrop-filter: blur(4px);
        }
        .modal-box {
          background: #1a1a2e; border: 1px solid #2a2a3e;
          border-radius: 16px; padding: 40px 36px;
          width: 380px; position: relative;
          text-align: center; animation: popIn 0.25s ease;
        }
        @keyframes popIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .modal-close {
          position: absolute; top: 16px; right: 20px;
          font-size: 22px; cursor: pointer; color: #aaa;
          background: none; border: none;
        }
        .modal-logo { font-size: 26px; font-weight: 700; color: #e94560; margin-bottom: 8px; }
        .modal-title { font-size: 22px; font-weight: 700; margin-bottom: 6px; color: white; }
        .modal-sub { font-size: 14px; color: #aaa; margin-bottom: 24px; }
        .modal-input {
          width: 100%; padding: 12px 14px;
          background: #0f0f1a; border: 1px solid #2a2a3e;
          border-radius: 8px; color: white;
          font-size: 14px; outline: none; margin-bottom: 12px;
        }
        .modal-input:focus { border-color: #e94560; }
        .modal-input::placeholder { color: #666; }
        .modal-error { font-size: 13px; color: #e94560; margin-bottom: 12px; }
        .modal-btn-login {
          width: 100%; padding: 14px;
          background: linear-gradient(90deg, #e94560, #f97316);
          color: white; border: none; border-radius: 8px;
          font-size: 16px; font-weight: 600; cursor: pointer; margin-bottom: 12px;
        }
        .modal-divider { font-size: 13px; color: #aaa; margin: 12px 0; }
        .modal-btn-signup {
          width: 100%; padding: 14px; background: transparent;
          color: white; border: 1px solid #e94560;
          border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;
        }
      `}</style>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            <div className="modal-logo">🎓 Uptoskills</div>
            <div className="modal-title">Login to Continue</div>
            <div className="modal-sub">Enter your details to enroll in this course</div>
            <input className="modal-input" type="email" placeholder="Email Address"
              value={modalEmail} onChange={e => setModalEmail(e.target.value)} />
            <input className="modal-input" type="password" placeholder="Password"
              value={modalPassword} onChange={e => setModalPassword(e.target.value)} />
            {modalError && <div className="modal-error">{modalError}</div>}
            <button className="modal-btn-login" onClick={handleModalLogin}>Login & Enroll</button>
            <div className="modal-divider">Don't have an account?</div>
            <button className="modal-btn-signup" onClick={() => navigate("/register")}>Sign Up for Free</button>
          </div>
        </div>
      )}

      <div className="navbar">
        <div className="logo" onClick={() => navigate("/home")}>🎓 Uptoskills</div>
      </div>

      <div className="detail-wrap">
        {/* LEFT SCROLLABLE */}
        <div className="detail-left" ref={scrollRef} onScroll={handleScroll}>
          <h1>{course.title}</h1>
          <div className="meta-row">
            <div className="meta-item"><h3>{course.level}</h3><p>Level</p></div>
            <div className="meta-item"><h3>{course.students}+</h3><p>Students Enrolled</p></div>
            <div className="meta-item"><h3>{course.duration}</h3><p>Duration</p></div>
            <div className="meta-item"><h3>⭐ {course.rating}</h3><p>Average Rating</p></div>
          </div>
          {enrolled
            ? <div className="enrolled-badge">✅ Enrolled Successfully!</div>
            : <button className="enroll-btn" onClick={handleEnrollClick}>Enroll for Free</button>
          }
          <div className="tabs">
            <div className={`tab ${activeTab === "about" ? "active" : ""}`} onClick={() => scrollTo("about")}>About</div>
            <div className={`tab ${activeTab === "outcomes" ? "active" : ""}`} onClick={() => scrollTo("outcomes")}>Learning Outcomes</div>
            <div className={`tab ${activeTab === "curriculum" ? "active" : ""}`} onClick={() => scrollTo("curriculum")}>Curriculum</div>
            <div className={`tab ${activeTab === "instructor" ? "active" : ""}`} onClick={() => scrollTo("instructor")}>Instructor</div>
          </div>
          <div id="about">
            <div className="section-title">About this Course</div>
            <p className="about-text">{course.about}</p>
          </div>
          <div id="outcomes">
            <div className="section-title">Learning Outcomes</div>
            <ul className="outcomes-list">
              {course.outcomes.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </div>
          <div id="curriculum">
            <div className="section-title">Curriculum</div>
            {course.curriculum.map((c, i) => (
              <div className="curriculum-item" key={i}>
                <div className="curriculum-header" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                  <span>📖 {i + 1}. {c}</span>
                  <span>{openIndex === i ? "▲" : "▼"}</span>
                </div>
                {openIndex === i && (
                  <div className="curriculum-body">
                    <p>• Introduction to {c}</p>
                    <p>• Hands-on practice with {c}</p>
                    <p>• Quiz and assignments</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div id="instructor" style={{marginTop:"32px"}}>
            <div className="section-title">About the Instructor</div>
            <p className="about-text">{course.mentor} is a world-renowned celebrity mentor on Uptoskills, bringing real-world expertise and inspiration to thousands of students.</p>
          </div>
        </div>

        {/* RIGHT FIXED */}
        <div className="detail-right">
          <div className="mentor-card">
            <div style={{ position: "relative" }}>
  {!showVideo ? (
    <>
      <img
        src={course.img}
        alt={course.mentor}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          objectPosition: "center center"
        }}
      />

      <button
        onClick={() => setShowVideo(true)}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(0,0,0,0.7)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "70px",
          height: "70px",
          fontSize: "28px",
          cursor: "pointer"
        }}
      >
        ▶
      </button>
    </>
  ) : (
    <video
      width="100%"
      height="200"
      controls
      autoPlay
      style={{
        objectFit: "cover"
      }}
    >
      <source src={demoVideo} type="video/mp4" />
    </video>
  )}
</div>
            <div className="mentor-info">
              <div className="mentor-name">🎤 {course.mentor}</div>
              <div className="mentor-title">Celebrity Mentor</div>
            </div>
          </div>
          <div className="take-first-step">
            <h3>Take a first step</h3>
            <p className="sub">Get this Learning Path</p>
            <div className="step-item">
              <div className="step-icon">⏱️</div>
              <div className="step-info"><h4>{course.duration}</h4><p>Duration</p></div>
            </div>
            <div className="step-item">
              <div className="step-icon">📚</div>
              <div className="step-info"><h4>{course.curriculum.length}</h4><p>Number of Lessons</p></div>
            </div>
            <div className="step-item">
              <div className="step-icon">📊</div>
              <div className="step-info"><h4>{course.level}</h4><p>Level</p></div>
            </div>
            {enrolled
              ? <div className="enrolled-badge-right">✅ Enrolled Successfully!</div>
              : <button className="enroll-btn-right" onClick={handleEnrollClick}>Enroll for Free</button>
            }
          </div>
        </div>
      </div>
    </>
  );
}