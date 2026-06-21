import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaMoon,
  FaSun,
  FaSignInAlt,
} from "react-icons/fa";

import uptoskillsImg from "../../assets/uptoskills.jpg";
import "./Header.css";

function Dheader() {
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
    setTheme((prevTheme) =>
      prevTheme === "light" ? "dark" : "light"
    );
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

      {/* CENTER NAVIGATION */}

      <nav className="header-nav">
      <button
  type="button"
  className="nav-link"
  onClick={() =>
    document.getElementById("home")
      ?.scrollIntoView({ behavior: "smooth" })
  }
>
  Home
</button>

<button
  type="button"
  className="nav-link"
  onClick={() =>
    document.getElementById("courses")
      ?.scrollIntoView({ behavior: "smooth" })
  }
>
  Courses
</button>

<button
  type="button"
  className="nav-link"
  onClick={() =>
    document.getElementById("about")
      ?.scrollIntoView({ behavior: "smooth" })
  }
>
  About
</button>

<button
  type="button"
  className="nav-link"
  onClick={() =>
    document.getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" })
  }
>
  Contact
</button>
</nav>

      {/* RIGHT */}
      <div className="header-right">
        {/* Notifications */}
        <button className="icon-btn"
        aria-label="Notifications">
          <FaBell />
        </button>

        {/* Theme Toggle */}
        <button
          className="mode"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === "light" ? (
            <FaMoon />
          ) : (
            <FaSun />
          )}
        </button>

        {/* Login */}
        <button
          className="login-btn"
          onClick={() => navigate("/user")}
        >
          <FaSignInAlt />
          <span>Login</span>
        </button>

        {/* Get Started */}
        <button
          className="getstarted-btn"
          onClick={() => navigate("/createaccount")}
        >
          Get Started
        </button>
      </div>
    </header>
  );
}

export default Dheader;