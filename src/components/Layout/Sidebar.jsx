import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaBookOpen,
  FaStar,
  FaRobot,
  FaChartBar,
  FaBars,
  FaTrophy,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/adashboard",
      icon: <FaHome />,
    },
    {
      label: "Enrollments",
      path: "/stud",
      icon: <FaUserGraduate />,
    },
    {
      label: "Courses",
      path: "/acourse",
      icon: <FaBookOpen />,
    },
    //  {
    //   label: "Manage Challenges",
    //   path: "/managechallenges",
    //   icon: <FaTrophy />,
    // },
    {
      label: "AI Mentors",
      path: "/mentors",
      icon: <FaRobot />,
    },
      {
      label: "Reviews",
      path: "/reviews",
      icon: <FaStar/>,
    },
    {
      label: "Analytics",
      path: "/analytics",
      icon: <FaChartBar />,
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);

    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`sidebar ${
        sidebarOpen ? "open" : "closed"
      }`}
    >
      <div className="sidebar-header">
        {sidebarOpen && (
          <h2 className="sidebar-title">
            Admin Panel
          </h2>
        )}

        <button
          className="sidebar-toggle"
           aria-label="Open Sidebar"
          onClick={() =>
            setSidebarOpen((prev) => !prev)
          }
        >
          <FaBars />
        </button>
      </div>

      <ul className="sidebar-list">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`sidebar-item ${
              location.pathname === item.path
                ? "active"
                : ""
            }`}
            onClick={() => handleNavigate(item.path)}
          >
            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span className="sidebar-label">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;