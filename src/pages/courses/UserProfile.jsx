import { useState } from "react";
import {
  FaCamera,
  FaEdit,
  FaMedal,
  FaCertificate,
  FaBookOpen,
  FaFire,
} from "react-icons/fa";

import "./UserProfile.css";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  const user = {
    name: "Rishika",
    role: "AI & Data Science Student",
    email: "rishika@gmail.com",
    streak: 24,
    courses: 12,
    certificates: 5,
    completion: 85,
  };

  return (
    <div className="profile-container">

      {/* Banner */}

      <div className="profile-banner">
        <button className="banner-edit">
          <FaCamera />
        </button>
      </div>

      {/* User Section */}

      <div className="profile-user-section">

        <div className="profile-avatar-wrapper">
          <img
            src="https://ui-avatars.com/api/?name=Rishika"
            alt=""
          />
          <button className="avatar-edit">
            <FaCamera />
          </button>
        </div>

        <div className="profile-user-info">
          <h1>{user.name}</h1>
          <p>{user.role}</p>

          <div className="profile-meta">
            <span>
              <FaFire /> {user.streak} Day Streak
            </span>

            <span>
              <FaBookOpen /> {user.courses} Courses
            </span>

            <span>
              <FaCertificate /> {user.certificates} Certificates
            </span>
          </div>
        </div>

        <button className="edit-profile-btn">
          <FaEdit />
          Edit Profile
        </button>

      </div>

      {/* Tabs */}

      <div className="profile-tabs">

        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          className={activeTab === "courses" ? "active" : ""}
          onClick={() => setActiveTab("courses")}
        >
          Courses
        </button>

        <button
          className={activeTab === "certificates" ? "active" : ""}
          onClick={() => setActiveTab("certificates")}
        >
          Certificates
        </button>

        <button
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>

      </div>

      {/* OVERVIEW */}

      {activeTab === "overview" && (
        <>
          <div className="stats-grid">

            <div className="stat-card">
              <h2>12</h2>
              <p>Courses Enrolled</p>
            </div>

            <div className="stat-card">
              <h2>85%</h2>
              <p>Completion Rate</p>
            </div>

            <div className="stat-card">
              <h2>5</h2>
              <p>Certificates</p>
            </div>

            <div className="stat-card">
              <h2>24</h2>
              <p>Learning Streak</p>
            </div>

          </div>

          <div className="profile-card">
            <h3>Learning Progress</h3>

            <div className="progress-bar">
              <div style={{ width: "85%" }}></div>
            </div>

            <span>85% Completed</span>
          </div>

          <div className="profile-card">
            <h3>Recent Activity</h3>

            <ul>
              <li>Completed React Hooks Module</li>
              <li>Earned Python Certificate</li>
              <li>Started Machine Learning Course</li>
            </ul>
          </div>

          <div className="profile-card">
            <h3>Achievements</h3>
          </div>
        </>
      )}

      {/* COURSES */}

      {activeTab === "courses" && (
        <div className="profile-card">
          <h3>My Courses</h3>

          <div className="course-item">
            React Development - 90%
          </div>

          <div className="course-item">
            Python Programming - 100%
          </div>

          <div className="course-item">
            AI & ML - 65%
          </div>
        </div>
      )}

      {/* CERTIFICATES */}

      {activeTab === "certificates" && (
        <div className="profile-card">
          <h3>Certificates</h3>

          <div className="certificate-item">
            Python Programming Certificate
          </div>

          <div className="certificate-item">
            React Development Certificate
          </div>
        </div>
      )}

      {/* SETTINGS */}

      {activeTab === "settings" && (
        <div className="profile-card">
          <h3>Account Settings</h3>

          <button>Edit Profile</button>
          <button>Change Password</button>
          <button>Notification Settings</button>
        </div>
      )}

    </div>
  );
}

export default UserProfile;