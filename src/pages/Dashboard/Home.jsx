import { useState } from "react";

export default function Home() {
  const allCourses = [
    { id: 1, title: "Machine Learning", mentor: "Elon Musk", level: "Beginner", duration: "4 hrs", rating: "4.8", students: "2.1k", img: "/src/assets/elon.jpg", tag: "trending" },
    { id: 2, title: "Deep Learning", mentor: "Cristiano Ronaldo", level: "Intermediate", duration: "6 hrs", rating: "4.7", students: "1.8k", img: "/src/assets/ronaldo.jpg", tag: "popular" },
    { id: 3, title: "Python for Data Science", mentor: "Virat Kohli", level: "Beginner", duration: "3 hrs", rating: "4.9", students: "3.2k", img: "/src/assets/virat.jpg", tag: "trending" },
    { id: 4, title: "AI & Neural Networks", mentor: "Shah Rukh Khan", level: "Advanced", duration: "8 hrs", rating: "4.6", students: "980", img: "/src/assets/srk.jpg", tag: "popular" },
    { id: 5, title: "Data Visualization", mentor: "Priyanka Chopra", level: "Beginner", duration: "2 hrs", rating: "4.5", students: "1.5k", img: "/src/assets/priyanka.jpg", tag: "popular" },
    { id: 6, title: "NLP Fundamentals", mentor: "Lionel Messi", level: "Intermediate", duration: "5 hrs", rating: "4.7", students: "2.4k", img: "/src/assets/messi.jpg", tag: "trending" },
  ];

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [sortBy, setSortBy] = useState("All");
  const [topics, setTopics] = useState([]);
  const [showExplore, setShowExplore] = useState(false);

  const filtered = allCourses.filter(c => {
  const matchSearch =
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.mentor.toLowerCase().includes(search.toLowerCase());

  const matchLevel =
    level === "All" ||
    c.level.toLowerCase() === level.toLowerCase();

  const matchTopic =
    topics.length === 0 ||
    topics.some(t =>
      c.title.toLowerCase().includes(t.toLowerCase())
    );

  const matchSort =
    sortBy === "All" ||
    c.tag.toLowerCase() === sortBy.toLowerCase();

  return matchSearch && matchLevel && matchTopic && matchSort;
});

  return (
    <div onClick={() => setShowExplore(false)}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #0f0f1a; color: white; }
        #root { width: 100%; }

        .navbar {
          background: #1a1a2e;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #2a2a3e;
          position: sticky;
          top: 0;
          z-index: 999;
        }
        .logo { font-size: 22px; font-weight: 700; color: #e94560; }
        .nav-links { display: flex; gap: 24px; align-items: center; position: relative; }
        .nav-links a { color: #ccc; text-decoration: none; font-size: 14px; }
        .btn-logout { padding: 8px 18px; background: #e94560; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600; }

        /* EXPLORE DROPDOWN */
        .explore-wrap { position: relative; }
        .explore-link {
          color: #ccc; text-decoration: none; font-size: 14px;
          cursor: pointer; display: flex; align-items: center; gap: 4px;
          background: none; border: none; padding: 0;
        }
        .explore-link:hover { color: white; }
        .explore-dropdown {
          position: absolute;
          top: 36px;
          right: -100px;
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 12px;
          padding: 24px;
          width: 480px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          z-index: 9999;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          animation: fadeIn 0.15s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .explore-col-title {
          font-size: 11px; font-weight: 700;
          color: #aaa; letter-spacing: 1px;
          margin-bottom: 14px; text-transform: uppercase;
        }
        .explore-item {
          margin-bottom: 14px; cursor: pointer;
          padding: 8px; border-radius: 8px;
          transition: background 0.15s;
        }
        .explore-item:hover { background: #0f0f1a; }
        .explore-item-title {
          font-size: 14px; font-weight: 600;
          color: white; margin-bottom: 3px;
        }
        .explore-item-sub { font-size: 12px; color: #aaa; }

        .hero { background: #1a1a2e; padding: 48px 24px; text-align: center; border-bottom: 1px solid #2a2a3e; }
        .hero h1 { font-size: 32px; font-weight: 700; margin-bottom: 10px; color: white; }
        .hero h1 span { color: #e94560; }
        .hero p { font-size: 15px; color: #aaa; margin-bottom: 24px; }

        .stats { display: flex; justify-content: center; gap: 48px; margin-bottom: 24px; }
        .stat h3 { font-size: 22px; font-weight: 700; color: #e94560; }
        .stat p { font-size: 12px; color: #aaa; margin-top: 2px; }

        .search-wrap { display: flex; align-items: center; background: #0f0f1a; border-radius: 8px; padding: 10px 16px; max-width: 400px; margin: 0 auto; gap: 8px; border: 1px solid #2a2a3e; }
        .search-wrap input { background: transparent; border: none; outline: none; color: white; font-size: 14px; width: 100%; }
        .search-wrap input::placeholder { color: #666; }

        .body-wrap { display: flex; min-height: calc(100vh - 200px); }

        .sidebar { width: 200px; background: #1a1a2e; border-right: 1px solid #2a2a3e; padding: 20px 16px; flex-shrink: 0; }
        .sidebar-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .sidebar-top h3 { font-size: 15px; font-weight: 700; }
        .clear-btn { font-size: 12px; color: #e94560; background: none; border: none; cursor: pointer; }
        .filter-group { margin-bottom: 20px; }
        .filter-group h4 { font-size: 13px; font-weight: 700; margin-bottom: 10px; color: white; }
        .filter-item { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 13px; color: #aaa; cursor: pointer; }
        .filter-item input { accent-color: #e94560; }

        .main-content { flex: 1; padding: 20px; }
        .top-filters { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .top-filters h2 { font-size: 18px; font-weight: 700; margin-right: 8px; }
        .filter-btn { padding: 6px 14px; border-radius: 20px; border: 1px solid #2a2a3e; background: transparent; color: #aaa; font-size: 13px; cursor: pointer; }
        .filter-btn.active { background: #e94560; color: white; border-color: #e94560; }

        .courses-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

        .course-card { background: #1a1a2e; border-radius: 10px; overflow: hidden; border: 1px solid #2a2a3e; cursor: pointer; transition: transform 0.2s; display: flex; flex-direction: column; }
        .course-card:hover { transform: translateY(-4px); border-color: #e94560; }
        .course-card img { width: 100%; height: 160px; object-fit: cover; object-position: center; }
        .card-body { padding: 14px; display: flex; flex-direction: column; flex: 1; }
        .card-body h3 { font-size: 14px; font-weight: 600; margin-bottom: 6px; }
        .card-body .mentor { font-size: 13px; color: #e94560; margin-bottom: 8px; }
        .tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
        .tag { padding: 2px 6px; border-radius: 20px; font-size: 10px; background: #2a2a3e; color: #aaa; white-space: nowrap; }
        .tag.beginner { color: #10b981; }
        .tag.intermediate { color: #f59e0b; }
        .tag.advanced { color: #e94560; }
        .enroll-btn { width: 100%; padding: 9px; background: transparent; color: white; border: 1px solid #444; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; margin-top: auto; }
        .enroll-btn:hover { background: #e94560; border-color: #e94560; }
        .no-results { text-align: center; color: #aaa; padding: 60px; }
      `}</style>

      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">🎓 UpToSkills</div>
        <div className="nav-links">

          {/* EXPLORE DROPDOWN */}
          <div className="explore-wrap" onClick={e => e.stopPropagation()}>
            <button className="explore-link" onClick={() => setShowExplore(!showExplore)}>
              Explore {showExplore ? "▴" : "▾"}
            </button>
            {showExplore && (
              <div className="explore-dropdown">
                <div>
                  <div className="explore-col-title">Learn</div>
                  <div className="explore-item" onClick={() => { setShowExplore(false); document.querySelector('.body-wrap').scrollIntoView({behavior:'smooth'}); }}>
                    <div className="explore-item-title">📚 Learning Paths →</div>
                    <div className="explore-item-sub">Expert-curated paths for every goal</div>
                  </div>
                  <div className="explore-item" onClick={() => { setShowExplore(false); document.querySelector('.body-wrap').scrollIntoView({behavior:'smooth'}); }}>
                    <div className="explore-item-title">🎓 All Courses →</div>
                    <div className="explore-item-sub">Browse 480+ celebrity mentor courses</div>
                  </div>
                  <div className="explore-item" onClick={() => { setShowExplore(false); window.location.href='/dashboard'; }}>
                    <div className="explore-item-title">🏆 My Achievements →</div>
                    <div className="explore-item-sub">Track your learning milestones</div>
                  </div>
                </div>
                <div>
                  <div className="explore-col-title">Discover</div>
                  <div className="explore-item" onClick={() => setShowExplore(false)}>
                    <div className="explore-item-title">🌟 Expert Sessions →</div>
                    <div className="explore-item-sub">Live sessions with celebrity mentors</div>
                  </div>
                  <div className="explore-item" onClick={() => setShowExplore(false)}>
                    <div className="explore-item-title">📖 In-depth Blogs →</div>
                    <div className="explore-item-sub">Latest trends in AI & technology</div>
                  </div>
                  <div className="explore-item" onClick={() => setShowExplore(false)}>
                    <div className="explore-item-title">📋 Comprehensive Guides →</div>
                    <div className="explore-item-sub">Step-by-step resources for every topic</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="/dashboard">Dashboard</a>
          <button className="btn-logout" onClick={() => window.location.href="/login"}>Logout</button>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <h1>Learn from your <span>Favourite Celebrity</span> Mentor</h1>
        <p>Access 480+ courses taught by AI-powered celebrity mentors. Learn your way, at your pace.</p>
        <div className="stats">
          <div className="stat"><h3>12k+</h3><p>Students</p></div>
          <div className="stat"><h3>480+</h3><p>Courses</p></div>
          <div className="stat"><h3>98%</h3><p>Satisfaction</p></div>
        </div>
        <div className="search-wrap">
          <span>🔍</span>
          <input type="text" placeholder="Search courses or mentors..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* BODY */}
      <div className="body-wrap">
        <div className="sidebar">
          <div className="sidebar-top">
            <h3>All Filters</h3>
            <button className="clear-btn" onClick={() => { setLevel("All"); setSortBy("All"); setTopics([]); }}>Clear All</button>
          </div>

          <div className="filter-group">
            <h4>Sort By</h4>
            {["All", "Trending", "Popular"].map(s => (
              <label key={s} className="filter-item">
                <input type="radio" name="sort" checked={sortBy === s} onChange={() => setSortBy(s)} />
                {s}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Level</h4>
            {["All", "Beginner", "Intermediate", "Advanced"].map(l => (
              <label key={l} className="filter-item">
                <input type="radio" name="level" checked={level === l} onChange={() => setLevel(l)} />
                {l}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Topics</h4>
            {["Machine Learning", "Deep Learning", "Python", "AI", "Data Science", "NLP"].map(t => (
              <label key={t} className="filter-item">
                <input type="checkbox"
                  checked={topics.includes(t)}
                  onChange={(e) => {
                    if (e.target.checked) setTopics([...topics, t]);
                    else setTopics(topics.filter(x => x !== t));
                  }}
                />
                {t}
              </label>
            ))}
          </div>
        </div>

        <div className="main-content">
          <div className="top-filters">
            <h2>Popular Courses</h2>
            {["All", "Beginner", "Intermediate", "Advanced"].map(l => (
              <button key={l} className={`filter-btn ${level === l ? "active" : ""}`}
                onClick={() => setLevel(l)}>{l}</button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="no-results">No courses found! 😕</div>
          ) : (
            <div className="courses-grid">
              {filtered.map(course => (
                <div className="course-card" key={course.id}>
                  <img src={course.img} alt={course.mentor} />
                  <div className="card-body">
                    <h3>{course.title}</h3>
                    <div className="mentor">🎤 {course.mentor}</div>
                    <div className="tags">
                      <span className={`tag ${course.level.toLowerCase()}`}>{course.level}</span>
                      <span className="tag">⏱ {course.duration}</span>
                      <span className="tag">⭐ {course.rating}</span>
                      <span className="tag">👥 {course.students}</span>
                    </div>
                    <button className="enroll-btn" onClick={() => window.location.href=`/course/${course.id}`}>Enroll for Free</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}