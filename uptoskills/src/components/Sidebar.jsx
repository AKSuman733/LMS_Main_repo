import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Award,
  Bot,
  BarChart3,
  BrainCircuit,
  Flame,
  Menu,
  X,
} from "lucide-react";

import { colors } from "../styles/designTokens";
import logo from "../assets/logo.png";

export default function Sidebar({ role }) {
  const location = useLocation();
  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const studentLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Courses",
      path: "/courses",
      icon: BookOpen,
    },
    {
      name: "AI Tutor",
      path: "/dashboard/ai-tutor",
      icon: Bot,
    },
    {
      name: "Streaks",
      path: "/dashboard/streaks",
      icon: Flame,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: Users,
    },
    
  ];

  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Manage Courses",
      path: "/admin/courses",
      icon: BookOpen,
    },
    {
      name: "Manage Students",
      path: "/admin/students",
      icon: Users,
    },
    {
      name: "AI Teachers",
      path: "/admin/ai-teachers",
      icon: BrainCircuit,
    },
    {
      name: "Performance",
      path: "/admin/performance",
      icon: BarChart3,
    },
    {
      name: "Certificates",
      path: "/admin/certificates",
      icon: Award,
    },
  ];

  const links =
    role === "admin"
      ? adminLinks
      : studentLinks;

  return (
    <>
      {/* MOBILE HAMBURGER */}

      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[100] p-3 rounded-xl bg-[#0f172a] border border-white/10 shadow-lg"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* MOBILE OVERLAY */}

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-[90]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 flex flex-col border-r z-[95]
          transform transition-all duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
        style={{
          backgroundColor: colors.surface,
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        {/* CLOSE BUTTON MOBILE */}

        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* LOGO */}

        <div
          className="p-6 flex items-center justify-center border-b"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <img
            src={logo}
            alt="UpToSkills"
            className="h-12 object-contain"
          />
        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 px-4 py-6 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            const isActive =
              location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="
                  group
                  flex
                  items-center
                  gap-4
                  px-4
                  py-3
                  min-h-[48px]
                  rounded-2xl

                  transition-all
                  duration-200

                  hover:shadow-lg
                  hover:scale-[1.01]

                  active:scale-[0.98]

                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#FF6B35]
                  focus:ring-offset-2
                "
                style={{
                  backgroundColor: isActive
                    ? "#FF6B35"
                    : "transparent",

                  border: isActive
                    ? "1px solid rgba(255,107,53,0.4)"
                    : "1px solid transparent",

                  color: isActive
                    ? "#fff"
                    : colors.textSecondary,

                  boxShadow: isActive
                    ? "0 0 24px rgba(255,107,53,0.25)"
                    : "none",
                }}
              >
                <div
                  className={`transition-all ${
                    isActive
                      ? "scale-110"
                      : "group-hover:scale-105"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span className="font-semibold text-sm tracking-wide">
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}

        <div
          className="p-4 border-t"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <button
            onClick={logout}
            className="
              w-full
              flex
              items-center
              gap-4
              px-4
              py-3
              min-h-[48px]
              rounded-2xl

              transition-all
              duration-200

              hover:bg-white/5
              hover:shadow-lg

              active:scale-[0.98]

              focus:outline-none
              focus:ring-2
              focus:ring-[#FF6B35]
              focus:ring-offset-2
            "
            style={{
              color: colors.textSecondary,
            }}
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />

            <span className="text-sm font-semibold">
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}