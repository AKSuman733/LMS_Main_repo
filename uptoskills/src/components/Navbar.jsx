import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../AuthContext";
import { colors } from "../styles/designTokens";

import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

/* IMPORT YOUR LOGO */
import logo from "../assets/logo.png";

export default function Navbar() {

  const { user, logout } = useAuth();

  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
  ];

  return (

    <nav
      className="sticky top-0 z-50 w-full border-b backdrop-blur-xl"
      style={{
        backgroundColor: `${colors.surface}ee`,
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-[78px] flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center"
          >

            <img
              src={logo}
              alt="UpToSkills"
              className="h-14 object-contain bg-transparent hover:scale-105 transition duration-300"
            />

          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-10">

            {navLinks.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                className="relative text-[15px] font-semibold transition-all duration-300"
                style={{
                  color:
                    location.pathname === link.path
                      ? colors.secondary
                      : colors.textSecondary,
                }}
              >

                <span className="hover:text-white transition-all">
                  {link.name}
                </span>

                {location.pathname === link.path && (

                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full"
                    style={{
                      backgroundColor: colors.secondary,
                    }}
                  />

                )}

              </Link>

            ))}

            {/* USER */}
            {user ? (

              <div
                className="flex items-center gap-4 pl-8"
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.08)",
                }}
              >

                {/* DASHBOARD */}
                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >

                  <LayoutDashboard
                    className="w-5 h-5 group-hover:scale-110 transition"
                    style={{
                      color: colors.secondary,
                    }}
                  />

                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: colors.textPrimary,
                    }}
                  >
                    Dashboard
                  </span>

                </Link>

                {/* LOGOUT */}
                <button
                  onClick={logout}
                  className="w-11 h-11 rounded-2xl border flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.08)",
                    color: colors.textSecondary,
                  }}
                >

                  <LogOut className="w-5 h-5" />

                </button>

              </div>

            ) : (

              <div
                className="flex items-center gap-4 pl-8"
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.08)",
                }}
              >

                {/* LOGIN */}
                <Link
                  to="/login"
                  className="text-sm font-semibold transition-all"
                  style={{
                    color: colors.textSecondary,
                  }}
                >

                  Log In

                </Link>

                {/* REGISTER */}
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-2xl font-bold transition-all duration-300"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.textPrimary,
                    boxShadow: "0 0 25px rgba(255,107,53,0.25)",
                  }}
                >

                  Get Started

                </Link>

              </div>

            )}

          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden w-11 h-11 rounded-2xl border flex items-center justify-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >

            {isMenuOpen ? (

              <X
                className="w-5 h-5"
                style={{
                  color: colors.textPrimary,
                }}
              />

            ) : (

              <Menu
                className="w-5 h-5"
                style={{
                  color: colors.textPrimary,
                }}
              />

            )}

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>

        {isMenuOpen && (

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-[90px] left-4 right-4 rounded-[2rem] p-8 flex flex-col gap-6 shadow-2xl border"
            style={{
              backgroundColor: `${colors.surface}f5`,
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >

            {navLinks.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-semibold transition"
                style={{
                  color: colors.textSecondary,
                }}
              >

                {link.name}

              </Link>

            ))}

            <div
              className="h-px"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            />

            {user ? (

              <div className="flex flex-col gap-4">

                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 p-4 rounded-2xl border font-semibold"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.08)",
                    color: colors.textPrimary,
                  }}
                >

                  <LayoutDashboard
                    className="w-5 h-5"
                    style={{
                      color: colors.secondary,
                    }}
                  />

                  <span>
                    Dashboard
                  </span>

                </Link>

                <button
                  onClick={logout}
                  className="w-full py-4 rounded-2xl font-semibold"
                  style={{
                    backgroundColor: "rgba(239,68,68,0.12)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: colors.error,
                  }}
                >

                  Logout

                </button>

              </div>

            ) : (

              <div className="flex flex-col gap-4">

                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-4 text-center rounded-2xl border font-semibold"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.08)",
                    color: colors.textPrimary,
                  }}
                >

                  Login

                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-4 text-center rounded-2xl font-bold"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.textPrimary,
                  }}
                >

                  Join for Free

                </Link>

              </div>

            )}

          </motion.div>

        )}

      </AnimatePresence>

    </nav>
  );
}