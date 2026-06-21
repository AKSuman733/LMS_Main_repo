import { useNavigate, useLocation } from "react-router-dom";

import {
  FaHome,
  FaBookOpen,
  FaGraduationCap,
  FaCertificate,
  FaUserAlt,
  FaBars,
} from "react-icons/fa";

import "./Sidebar.css";

function Usidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/udashboard",
      icon: <FaHome />,
    },
    {
      label: "Courses",
      path: "/course",
      icon: <FaBookOpen />,
    },
    {
      label: "My Courses",
      path: "/mycourses",
      icon: <FaGraduationCap />,
    },
    {
      label: "My Certificates",
      path: "/mycertificates",
      icon: <FaCertificate />,
    },
    {
      label: "Profile",
      path: "/userprofile",
      icon: <FaUserAlt />,
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
            User Panel
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

export default Usidebar;