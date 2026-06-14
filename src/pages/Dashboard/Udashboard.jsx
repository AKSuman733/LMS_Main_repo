// import { useNavigate } from "react-router-dom";

// import "./Udashboard.css";

// import group1Img from "../../assets/group1.png";

// function Udashboard() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <div className="main-content page-fade">
//         {/* WELCOME SECTION */}
//         <div className="welcome-section">
//           <div>
//             <h1 className="welcome-text">
//               Welcome to Uptoskills
//             </h1>

//             <p className="sub-text">
//               Learn from experts, build real-world skills, and grow your career
//             </p>

//             <button
//               className="explore-btn"
//               onClick={() => navigate("/course")}
//             >
//               Explore Courses
//             </button>
//           </div>

//           <img
//             className="group1"
//             src={group1Img}
//             alt="learning"
//           />
//         </div>

//         {/* STATS */}
//         <div className="stats-grid">
//           <div className="stats-card">
//             <h3>10+</h3>
//             <p>Courses</p>
//           </div>

//           <div className="stats-card">
//             <h3>5+</h3>
//             <p>Expert Mentors</p>
//           </div>

//           <div className="stats-card">
//             <h3>100%</h3>
//             <p>Skill Based Learning</p>
//           </div>
//         </div>

//         {/* ABOUT */}
//         <div className="about-section">
//           <h2>About the Platform</h2>
//           <p>
//             Uptoskills is a modern learning platform that connects learners
//             with industry experts and structured courses.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Udashboard;



import { useNavigate } from "react-router-dom";
import "./Udashboard.css";
import group1Img from "../../assets/group1.png";

function Udashboard() {
  const navigate = useNavigate();

  return (
    <div className="main-content page-fade">

      {/* HERO SECTION */}
      <div className="welcome-section">
        <div>
          <h1 className="welcome-text">
            Welcome Back 👋
          </h1>

          <p className="sub-text">
            Continue your learning journey and stay consistent with your goals.
          </p>

          <button
            className="explore-btn"
            onClick={() => navigate("/mycourses")}
          >
            Continue Learning
          </button>
        </div>

        <img
          className="group1"
          src={group1Img}
          alt="learning"
        />
      </div>

      {/* LEARNING STATS */}
      <div className="stats-grid">
        <div className="stats-card">
          <h3>5</h3>
          <p>Enrolled Courses</p>
        </div>

        <div className="stats-card">
          <h3>2</h3>
          <p>Completed Courses</p>
        </div>

        <div className="stats-card">
          <h3>12</h3>
          <p>Day Streak 🔥</p>
        </div>

        <div className="stats-card">
          <h3>3</h3>
          <p>Certificates</p>
        </div>
      </div>

      {/* CONTINUE LEARNING */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2>Continue Learning</h2>
          <button onClick={() => navigate("/mycourses")}>
            View All
          </button>
        </div>

        <div className="course-progress">
          <h3>Data Science Using Python</h3>
          <p>Module 8 of 12 completed</p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: "70%" }}
            ></div>
          </div>

          <span>70% Complete</span>
        </div>
      </div>


      {/* RECOMMENDED COURSES */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2>Recommended Courses</h2>
          <button onClick={() => navigate("/course")}>
            Browse More
          </button>
        </div>

        <div className="recommended-grid">
          <div className="recommend-card">
            <h3>Java</h3>
            <p>Take your Java skills to the next level.</p>
          </div>

          <div className="recommend-card">
            <h3>node.js</h3>
            <p>Learn backend development from scratch.</p>
          </div>

          <div className="recommend-card">
            <h3>React</h3>
            <p>Take your React skills to the next level.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Udashboard;