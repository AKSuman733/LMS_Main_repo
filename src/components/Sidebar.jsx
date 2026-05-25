import { Link, useLocation } from 'react-router-dom';
import { Flame } from "lucide-react";

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
} from 'lucide-react';

import { useAuth } from '../AuthContext';

import { colors } from '../styles/designTokens';

/* LOGO */
import logo from "../assets/logo.png";

export default function Sidebar({ role }) {

  const location = useLocation();

  const { logout } = useAuth();

  // STUDENT LINKS
  const studentLinks = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },

    {
      name: 'My Courses',
      path: '/courses',
      icon: BookOpen,
    },

    {
      name: 'AI Tutor',
      path: '/dashboard/ai-tutor',
      icon: Bot,
    },

    {
      name: "Streaks",
      icon: Flame,
      path: "/dashboard/streaks",
    },

    {
      name: 'Profile',
      path: '/dashboard/profile',
      icon: Users,
    },

    {
      name: 'Settings',
      path: '/dashboard/settings',
      icon: Settings,
    },
  ];

  // ADMIN LINKS
  const adminLinks = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
    },

    {
      name: 'Manage Courses',
      path: '/admin/courses',
      icon: BookOpen,
    },

    {
      name: 'Manage Students',
      path: '/admin/students',
      icon: Users,
    },

    {
      name: 'AI Teachers',
      path: '/admin/ai-teachers',
      icon: BrainCircuit,
    },

    {
      name: 'Performance',
      path: '/admin/performance',
      icon: BarChart3,
    },

    {
      name: 'Certificates',
      path: '/admin/certificates',
      icon: Award,
    },
  ];

  const links =
    role === 'admin'
      ? adminLinks
      : studentLinks;

  return (

    <aside
      className="w-64 h-screen fixed left-0 top-0 flex flex-col z-50 border-r"
      style={{
        backgroundColor: colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >

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
              className="group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300"
              style={{
                backgroundColor: isActive
                  ? "rgba(0,181,165,0.12)"
                  : "transparent",

                border: isActive
                  ? `1px solid rgba(0,181,165,0.25)`
                  : "1px solid transparent",

                color: isActive
                  ? colors.secondary
                  : colors.textSecondary,

                boxShadow: isActive
                  ? "0 0 20px rgba(0,181,165,0.12)"
                  : "none",
              }}
            >

              {/* ICON */}
              <div
                className={`transition-all ${
                  isActive
                    ? 'scale-110'
                    : 'group-hover:scale-105'
                }`}
              >

                <Icon className="w-5 h-5" />

              </div>

              {/* TEXT */}
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
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group"
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
  );
}