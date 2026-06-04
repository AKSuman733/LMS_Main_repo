import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import logo from "../assets/logo.png";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
  ];

  return (
    <nav
      style={{
        background: "#05080f",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="UpToSkills"
              style={{
                height: "55px",
                objectFit: "contain",
              }}
            />
          </Link>

          {/* Desktop Menu */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color:
                    location.pathname === link.path
                      ? "#22d3ee"
                      : "#94a3b8",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/login"
              style={{
                background: "#ff6b35",
                color: "#fff",
                padding: "12px 22px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              Login
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: "none",
            }}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
}