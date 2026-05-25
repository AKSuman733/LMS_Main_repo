import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Bot,
  Settings,
  User,
  LayoutDashboard,
} from "lucide-react";

function NewDashboard() {

  const navigate = useNavigate();

  // REAL USER DATA
  const user =
    JSON.parse(localStorage.getItem("newUser")) || {};

  return (
    <div className="min-h-screen bg-[#050816] text-white flex overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-[220px] bg-[#0d1323] border-r border-white/10 px-5 py-6 flex flex-col justify-between">

        <div>

          {/* LOGO */}
          <h1 className="text-3xl font-black mb-10 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            UpToSkills
          </h1>

          {/* MENU */}
          <div className="space-y-2">

            {/* DASHBOARD */}
            <button
              onClick={() => navigate("/new-dashboard")}
              className="w-full flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-4 py-3 rounded-xl text-sm font-semibold"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </button>

            {/* COURSES */}
            <button
              onClick={() => navigate("/my-courses")}
              className="w-full flex items-center gap-3 hover:bg-[#1a2236] px-4 py-3 rounded-xl text-sm transition"
            >
              <BookOpen size={19} />
              My Courses
            </button>

            {/* AI TUTOR */}
            <button
              onClick={() => navigate("/new-ai-tutor")}
              className="w-full flex items-center gap-3 hover:bg-[#1a2236] px-4 py-3 rounded-xl text-sm transition"
            >
              <Bot size={19} />
              AI Tutor
            </button>

            {/* PROFILE */}
            <button
              onClick={() => navigate("/dashboard/profile")}
              className="w-full flex items-center gap-3 hover:bg-[#1a2236] px-4 py-3 rounded-xl text-sm transition"
            >
              <User size={19} />
              Profile
            </button>

            {/* SETTINGS */}
            <button className="w-full flex items-center gap-3 hover:bg-[#1a2236] px-4 py-3 rounded-xl text-sm transition">
              <Settings size={19} />
              Settings
            </button>

          </div>

        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 overflow-y-auto">

        {/* TOP RIGHT USER */}
        <div className="flex justify-end mb-5">

          <div className="flex items-center gap-3">

            <div className="text-right">

              <h2 className="text-sm font-semibold">
                {user?.name || "Student"}
              </h2>

              <p className="text-cyan-400 text-[10px] tracking-[4px] uppercase">
                Student
              </p>

            </div>

            {/* PROFILE ICON */}
            <div className="w-12 h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center">

              <div className="relative w-5 h-5">

                {/* HEAD */}
                <div className="w-2 h-2 rounded-full border-2 border-cyan-400 absolute top-0 left-1/2 -translate-x-1/2" />

                {/* BODY */}
                <div className="w-4 h-2 border-2 border-cyan-400 border-t-0 rounded-b-full absolute bottom-0 left-1/2 -translate-x-1/2" />

              </div>

            </div>

          </div>

        </div>

        {/* HERO */}
        <div
          className="rounded-[26px] overflow-hidden border border-white/10 px-9 py-10 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.82), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop')",
          }}
        >

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5" />

          <div className="relative z-10 max-w-[650px]">

            <p className="text-cyan-400 uppercase tracking-[4px] text-[11px] font-semibold mb-3">
              Welcome Back
            </p>

            <h1 className="text-5xl font-black leading-tight mb-4">

              {user?.name || "Student"} 👋

            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-7">
              Your internship journey starts here. Build projects,
              improve your skills, and grow with real-world learning.
            </p>

            <button
              onClick={() => navigate("/courses")}
              className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-3 rounded-2xl text-base font-bold transition-all duration-300 hover:scale-105"
            >
              Start Learning 🚀
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mt-7">

          {/* CARD 1 */}
          <div className="bg-[#0d1323] border border-cyan-500/30 rounded-2xl p-5">

            <p className="text-gray-400 text-xs mb-2">
              Hours Studied
            </p>

            <h1 className="text-4xl font-black text-cyan-400">
              0h
            </h1>

          </div>

          {/* CARD 2 */}
          <div className="bg-[#0d1323] border border-orange-500/30 rounded-2xl p-5">

            <p className="text-gray-400 text-xs mb-2">
              Learning Streak
            </p>

            <h1 className="text-4xl font-black text-orange-400">
              0
            </h1>

          </div>

          {/* CARD 3 */}
          <div className="bg-[#0d1323] border border-green-500/30 rounded-2xl p-5">

            <p className="text-gray-400 text-xs mb-2">
              Completed
            </p>

            <h1 className="text-4xl font-black text-green-400">
              0
            </h1>

          </div>

          {/* CARD 4 */}
          <div className="bg-[#0d1323] border border-pink-500/30 rounded-2xl p-5">

            <p className="text-gray-400 text-xs mb-2">
              Weekly Goal
            </p>

            <h1 className="text-4xl font-black text-pink-400">
              0%
            </h1>

          </div>

        </div>

      </div>

    </div>
  );
}

export default NewDashboard;