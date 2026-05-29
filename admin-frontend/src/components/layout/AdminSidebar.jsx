import { NavLink, useNavigate } from "react-router-dom";
import {
  Award,
  BookOpen,
  CalendarDays,
  FileBadge,
  LayoutDashboard,
  LogOut,
  Mail,
  Megaphone,
  UserRound,
  Users,
} from "lucide-react";

import uptoskillsLogo from "../../assets/logo/UptoSkills.webp";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Courses",
    path: "/admin/courses",
    icon: BookOpen,
  },
  {
    label: "Students",
    path: "/admin/students",
    icon: Users,
  },
  {
    label: "Mentors",
    path: "/admin/mentors",
    icon: UserRound,
  },
  {
    label: "Events",
    path: "/admin/events",
    icon: CalendarDays,
  },
  {
    label: "Event Registrations",
    path: "/admin/event-registrations",
    icon: Megaphone,
  },
  {
    label: "Certificates",
    path: "/admin/certificates",
    icon: FileBadge,
  },
  {
    label: "Messages",
    path: "/admin/messages",
    icon: Mail,
  },
];

export default function AdminSidebar({ collapsed }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("uptoskills_admin_token");
    localStorage.removeItem("uptoskills_admin_user");
    navigate("/admin-login");
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/10 bg-slate-950/95 text-white shadow-2xl shadow-cyan-500/5 backdrop-blur-2xl transition-all duration-300 ${
        collapsed ? "w-24 p-3" : "w-80 p-5"
      }`}
    >
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
        <div className="flex justify-center">
          {collapsed ? (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 text-2xl font-black text-slate-950">
              U
            </div>
          ) : (
            <img
              src={uptoskillsLogo}
              alt="UptoSkills Logo"
              className="h-16 w-auto object-contain"
            />
          )}
        </div>

        {!collapsed && (
          <p className="mt-3 text-center text-sm font-semibold text-slate-400">
            Admin Panel
          </p>
        )}
      </div>

      <nav className="mt-6 flex-1 space-y-2 overflow-y-auto pr-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              title={collapsed ? item.label : ""}
              className={({ isActive }) =>
                `group flex items-center rounded-2xl font-black transition ${
                  collapsed ? "justify-center px-3 py-4" : "gap-4 px-5 py-4"
                } ${
                  isActive
                    ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20"
                    : "text-slate-300 hover:bg-white/5 hover:text-cyan-300"
                }`
              }
            >
              <Icon size={collapsed ? 25 : 23} />

              {!collapsed && <span className="text-base">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/5 p-4">
        <div
          className={`mb-4 flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">
            <Award size={25} />
          </div>

          {!collapsed && (
            <div>
              <p className="text-sm font-black">Super Admin</p>
              <p className="text-xs text-slate-400">Full LMS Access</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : ""}
          className={`flex w-full items-center justify-center rounded-2xl bg-red-500/10 px-4 py-3 font-black text-red-400 transition hover:bg-red-500 hover:text-white ${
            collapsed ? "" : "gap-3"
          }`}
        >
          <LogOut size={20} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}