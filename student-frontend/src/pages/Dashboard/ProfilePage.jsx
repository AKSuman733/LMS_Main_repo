import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  BookOpen,
  Edit3,
  LogOut,
  Mail,
  Phone,
  User,
} from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("studentUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentUser");
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[130px]" />
        <div className="absolute right-[-10%] top-[10%] h-[520px] w-[520px] rounded-full bg-purple-500/20 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[35%] h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft size={18} />
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-5 py-3 font-bold text-red-300 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <section className="mt-8 overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-orange-500/20 p-8 shadow-2xl shadow-cyan-500/10">
          <div className="flex flex-wrap items-center gap-6">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="h-28 w-28 rounded-[2rem] object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-cyan-400 to-purple-500 text-4xl font-black text-slate-950">
                {(user.name || "Student")
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            )}

            <div className="flex-1">
              <p className="font-bold text-cyan-300">Student Profile</p>
              <h1 className="mt-2 text-4xl font-black">
                {user.name || "Student"}
              </h1>
              <p className="mt-2 text-slate-300">
                {user.email || "No email found"}
              </p>
            </div>

            <button
              onClick={() => alert("Edit profile feature will be added next.")}
              className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-300"
            >
              <Edit3 size={18} />
              Edit Profile
            </button>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <StatCard icon={BookOpen} title="Enrolled Courses" value="My Courses" />
          <StatCard icon={Award} title="Certificates" value="My Certificates" />
          <StatCard icon={BadgeCheck} title="Status" value="Active Learner" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-2xl font-black">Contact Information</h2>

            <div className="mt-6 space-y-4">
              <InfoRow icon={User} label="Name" value={user.name || "Student"} />
              <InfoRow
                icon={Mail}
                label="Email"
                value={user.email || "Not available"}
              />
              <InfoRow
                icon={Phone}
                label="Phone"
                value={user.phone || "Not added"}
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-2xl font-black">Learning Summary</h2>

            <p className="mt-3 leading-7 text-slate-400">
              This profile page is connected with your current student login
              data. Next we can connect it with MongoDB student profile update,
              course progress and certificates.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                to="/dashboard"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 font-black text-cyan-300 transition hover:border-cyan-400"
              >
                Go to Dashboard
              </Link>

              <Link
                to="/courses"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 font-black text-orange-300 transition hover:border-orange-400"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
      <Icon className="text-cyan-300" size={34} />
      <h3 className="mt-5 text-2xl font-black">{value}</h3>
      <p className="mt-1 text-sm text-slate-400">{title}</p>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
      <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
        <Icon size={22} />
      </div>

      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-bold text-slate-200">{value}</p>
      </div>
    </div>
  );
}