import { useNavigate } from "react-router-dom";
import "./Udashboard.css";

import uptoskillsImg from "../../assets/uptoskills.jpg";
import group1Img from "../../assets/group1.png";

function Udashboard() {

  const navigate = useNavigate();

  return (

    <div className="dashboard-container">

      {/* HEADER */}
      <div className="headerbar">

        <img
          src={uptoskillsImg}
          alt="uptoskills"
        />

        <span onClick={() => navigate("/admin")}>
          Admin
        </span>

      </div>

      {/* SIDEBAR */}
      <div className="sidebar">

        <ul>

          <li onClick={() => navigate("/udashboard")}>
            Dashboard
          </li>

          <li onClick={() => navigate("/course")}>
            Courses
          </li>

          <li onClick={() => navigate("/mycourses")}>
            My Courses
          </li>

          <li onClick={() => navigate("/mycertificates")}>
            My Certificates
          </li>

        </ul>

      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">

        <h1 className="welcome-text">
          Welcome to Uptoskills
        </h1>

        <h3 className="sub-text">
          Learning through famous personalities
        </h3>

        {/* GROUP IMAGE */}
        <img
          className="group1"
          src={group1Img}
          alt="group1"
        />

        {/* ABOUT SECTION */}
        <div className="about-section">

          <h3>About the Platform</h3>

          <p>
            This platform is an advanced learning ecosystem that connects
            learners with courses delivered by renowned personalities and
            industry experts.
          </p>

          <p>
            It is designed to provide a structured, high-quality educational
            experience focused on real-world skills and growth.
          </p>

          <p>
            Users can explore and enroll in courses, select mentors based on
            their preferences, and follow a guided, flexible learning path
            tailored for self-paced education.
          </p>

          <p>
            The platform integrates AI-powered video learning to enhance
            understanding through intelligent explanations and interactive
            support, ensuring a more personalized learning experience.
          </p>

          <p>
            Our mission is to make expert-led, technology-driven education
            accessible, engaging, and outcome-oriented for every learner.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Udashboard;