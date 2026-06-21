import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaBell, FaMoon, FaSun } from "react-icons/fa";

import uptoskillsImg from "../../assets/uptoskills.jpg";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    navigate("/admin");
  };

  return (
    <header className="headerbar">

      {/* LEFT */}
      <div className="header-left">
        <img
          src={uptoskillsImg}
          alt="UptoSkills"
          className="logo"
          fetchPriority="high"
        />
      </div>

      {/* RIGHT */}
      <div className="header-right">

        {/* 🔔 Notification */}
        <button className="icon-btn"
        aria-label="Notifications">
          <div className="bell">
          <FaBell />
          </div>
        </button>

        {/* 🌙 Theme Toggle */}
        <div>
        <button className="mode" onClick={toggleTheme}
        aria-label="Toggle Dark Mode">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        </div>

        {/* 🚪 Logout */}
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </header>
  );
}

export default Header;