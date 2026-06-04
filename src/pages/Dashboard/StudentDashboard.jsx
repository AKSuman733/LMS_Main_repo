import { useNavigate } from "react-router-dom";


export default function StudentDashboard() {
  const navigate = useNavigate();
  

  const enrolledCourses = [
    { id: 1, title: "Machine Learning Basics", mentor: "Elon Musk", progress: 65, img: "/src/assets/elon.jpg" },
    { id: 2, title: "Python for Data Science", mentor: "Virat Kohli", progress: 30, img: "/src/assets/virat.jpg" },
    { id: 3, title: "Data Visualization", mentor: "Priyanka Chopra", progress: 90, img: "/src/assets/priyanka.jpg" },
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; margin: 0; padding: 0; overflow-x: hidden; }
        body { font-family: 'Segoe UI', sans-serif; background: #0f0f1a; color: white; width: 100%; overflow-x: hidden; }
        
        .navbar {
          background: #1a1a2e;
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #2a2a3e;
          width: 100%;
        }
        .logo { font-size: 22px; font-weight: 700; color: #e94560; }
        .nav-links { display: flex; gap: 24px; align-items: center; }
        .nav-links a { color: #ccc; text-decoration: none; font-size: 14px; }
        .nav-links a:hover { color: white; }
        .btn-logout {
          padding: 8px 18px; background: #e94560;
          color: white; border: none; border-radius: 6px;
          cursor: pointer; font-size: 14px; font-weight: 600;
        }

        /* ✅ FIX: Full width, no side borders */
        .page {
          padding: 32px 40px;
          width: 100%;
          max-width:100%
          min-height: 100vh;
        }

        /* ✅ FIX: Welcome text white, full width */
        .welcome {
          background: linear-gradient(135deg, #1a1a2e, #2d1a3e);
          border-radius: 16px;
          padding: 36px 40px;
          margin-bottom: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .welcome h1 {
          font-size: 30px;
          font-weight: 700;
          margin-bottom: 10px;
          color: white;        
        }
        .welcome h1 span { color: #f97316; }
        .welcome p { color: #ccc; font-size: 15px; }
        .welcome-btn {
          padding: 13px 32px;
          background: linear-gradient(90deg, #e94560, #f97316);
          color: white; border: none; border-radius: 8px;
          font-size: 15px; font-weight: 600; cursor: pointer;
          white-space: nowrap;
        }
        .welcome-btn:hover { opacity: 0.9; }

        /* STATS */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 36px;
          width: 100%;
        }
        .stat-card {
          background: #1a1a2e;
          border-radius: 12px;
          padding: 24px 20px;
          border: 1px solid #2a2a3e;
          text-align: center;
          transition: transform 0.2s;
        }
        .stat-card:hover { transform: translateY(-4px); }
        .stat-card .icon { font-size: 30px; margin-bottom: 10px; }
        .stat-card h3 { font-size: 28px; font-weight: 700; color: #e94560; }
        .stat-card p { font-size: 13px; color: #aaa; margin-top: 6px; }

        /* SECTION */
        .section-title {
          font-size: 20px; font-weight: 700;
          margin-bottom: 20px; color: white;
        }

        /* COURSES */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
          width: 100%;
        }
        .course-card {
          background: #1a1a2e;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #2a2a3e;
          transition: transform 0.2s, border-color 0.2s;
        }
        .course-card:hover { transform: translateY(-4px); border-color: #e94560; }
        .course-card img {
          width: 100%; height: 150px;
          object-fit: cover; object-position: top;
        }
        .course-info { padding: 18px; }
        .course-info h3 { font-size: 15px; font-weight: 600; margin-bottom: 6px; color: white; }
        .course-info .mentor { font-size: 13px; color: #e94560; margin-bottom: 14px; }

        .progress-bar {
          background: #2a2a3e; border-radius: 10px;
          height: 8px; margin-bottom: 6px; overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #e94560, #f97316);
          border-radius: 10px;
        }
        .progress-text { font-size: 12px; color: #aaa; }

        .continue-btn {
          width: 100%; margin-top: 14px; padding: 10px;
          background: linear-gradient(90deg, #e94560, #f97316);
          color: white; border: none; border-radius: 8px;
          font-size: 13px; font-weight: 600; cursor: pointer;
        }
        .continue-btn:hover { opacity: 0.9; }

        /* MENTORS */
        .mentor-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
          width: 100%;
        }
        .mentor-card {
          background: #1a1a2e;
          border-radius: 12px;
          padding: 24px 20px;
          border: 1px solid #2a2a3e;
          text-align: center;
          transition: transform 0.2s;
        }
        .mentor-card:hover { transform: translateY(-4px); }
        .mentor-card img {
          width: 80px; height: 80px;
          border-radius: 50%;
          object-fit: cover; object-position: top;
          margin-bottom: 12px;
          border: 3px solid #e94560;
        }
        .mentor-card h3 { font-size: 15px; font-weight: 600; color: white; margin-bottom: 4px; }
        .mentor-card p { font-size: 13px; color: #aaa; }
      `}</style>

      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">🎓 UpToSkills</div>
        <div className="nav-links">
          <a href="/home">Home</a>
          <a href="/home">Courses</a>
          <button className="btn-logout" onClick={() => {navigate("/login"); }}>
            Logout
          </button>
        </div>
      </div>

      {/* PAGE */}
      <div className="page">

        {/* WELCOME */}
        <div className="welcome">
          <div>
            <h1>Welcome back, <span>Student!</span> 👋</h1>
            <p>Continue your learning journey with your favourite celebrity mentors.</p>
          </div>
          <button className="welcome-btn" onClick={() => navigate("/home")}>
            Browse Courses
          </button>
        </div>

        {/* STATS */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="icon">📚</div>
            <h3>3</h3>
            <p>Enrolled Courses</p>
          </div>
          <div className="stat-card">
            <div className="icon">✅</div>
            <h3>1</h3>
            <p>Completed</p>
          </div>
          <div className="stat-card">
            <div className="icon">⏱️</div>
            <h3>12</h3>
            <p>Hours Learned</p>
          </div>
          <div className="stat-card">
            <div className="icon">🏆</div>
            <h3>2</h3>
            <p>Certificates</p>
          </div>
        </div>

        {/* MY COURSES */}
        <div className="section-title">📚 My Courses</div>
        <div className="courses-grid">
          {enrolledCourses.map(course => (
            <div className="course-card" key={course.id} onClick={() => navigate(`/course/${course.id}`)}>
              <img src={course.img} alt={course.mentor} />
              <div className="course-info">
                <h3>{course.title}</h3>
                <div className="mentor">🎤 {course.mentor}</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: `${course.progress}%`}}></div>
                </div>
                <div className="progress-text">{course.progress}% completed</div>
                <button className="continue-btn">
                  {course.progress === 100 ? "✅ Completed" : "▶ Continue Learning"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MY MENTORS */}
        <div className="section-title">🎤 My Mentors</div>
        <div className="mentor-grid">
          {enrolledCourses.map(course => (
            <div className="mentor-card" key={course.id}>
              <img src={course.img} alt={course.mentor} />
              <h3>{course.mentor}</h3>
              <p>Celebrity Mentor</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}