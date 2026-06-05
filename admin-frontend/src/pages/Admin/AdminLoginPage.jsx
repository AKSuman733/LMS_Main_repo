import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Award,
  BookOpen,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import uptoskillsLogo from "../../assets/logo/UptoSkills.webp";

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter admin email and password.");
      return;
    }

    if (email === "admin@uptoskills.com" && password === "admin@123") {
      localStorage.setItem("uptoskills_admin_token", "demo-admin-token");

      localStorage.setItem(
        "uptoskills_admin_user",
        JSON.stringify({
          name: "UptoSkills Admin",
          email,
          role: "Super Admin",
        })
      );

      navigate("/admin");
      return;
    }

    setError("Invalid admin credentials.");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-orange-500/20 blur-[130px]" />
        <div className="absolute right-[-10%] top-[10%] h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[35%] h-[520px] w-[520px] rounded-full bg-purple-500/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[length:38px_38px]" />
      </div>


      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
        <div className="grid w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/60 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl lg:grid-cols-2">
          <section className="relative min-h-[720px] overflow-hidden bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] bg-[length:30px_30px] opacity-40" />
            <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-cyan-400/30 blur-[100px]" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/25 blur-[120px]" />

            <div className="relative z-10 flex justify-center">
              <img
                src={uptoskillsLogo}
                alt="UptoSkills Logo"
                className="h-20 w-auto rounded-2xl bg-slate-950/60 px-4 py-2 object-contain shadow-xl"
              />
            </div>

            <div className="relative z-10 mx-auto mt-16 max-w-md rounded-[2rem] border border-white/10 bg-slate-950/75 p-10 text-center shadow-2xl backdrop-blur-xl">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 shadow-xl">
                <GraduationCap size={52} />
              </div>

              <h2 className="mt-8 text-4xl font-black">Admin Portal</h2>

              <p className="mt-5 text-xl font-semibold leading-8 text-slate-200">
                Manage courses, students, certificates, events, mentors and
                reports from one secure dashboard.
              </p>
            </div>

            <div className="relative z-10 mt-10 rounded-2xl border border-white/10 bg-slate-950/80 p-5 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-400 p-2">
                  <ShieldCheck className="text-slate-950" />
                </div>

                <div>
                  <h3 className="font-black italic text-white">
                    Why Choose UptoSkills?
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-slate-300">
                    Control learning, certificates and student growth in one
                    place.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute right-14 top-1/3 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/30 text-emerald-200">
              <BookOpen size={34} />
            </div>

            <div className="absolute bottom-24 left-16 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-400/30 text-orange-200">
              <Award size={34} />
            </div>
          </section>

          <section className="relative flex min-h-[720px] items-center justify-center bg-slate-950/80 px-6 py-12">
            <Link
              to="/"
              className="absolute right-8 top-8 text-3xl font-bold text-slate-400 transition hover:text-white"
            >
              ×
            </Link>

            <div className="w-full max-w-xl">
              <div className="text-center">
                <h1 className="text-5xl font-black tracking-tight text-orange-200">
                  Admin Sign In
                </h1>

                <p className="mt-5 text-xl font-semibold text-slate-200">
                  Welcome back! Sign in to continue.
                </p>
              </div>

              <form onSubmit={handleLogin} className="mt-10">
                <label className="block">
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-950/70 px-5 py-4 transition focus-within:border-cyan-400">
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Admin email"
                      className="w-full bg-transparent text-lg text-white outline-none placeholder:text-slate-400"
                    />

                    <Mail className="text-white" />
                  </div>
                </label>

                <label className="mt-5 block">
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-950/70 px-5 py-4 transition focus-within:border-cyan-400">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Password"
                      className="w-full bg-transparent text-lg text-white outline-none placeholder:text-slate-400"
                    />

                    <Lock className="text-white" />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-white"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </label>

                <div className="mt-5 flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-orange-400 transition hover:text-orange-300"
                  >
                    🔐 Forgot Password?
                  </Link>
                </div>

                {error && (
                  <div className="mt-5 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm font-semibold text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="mt-7 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 text-xl font-black text-white shadow-xl shadow-orange-500/25 transition hover:scale-[1.02] hover:from-orange-400 hover:to-orange-500"
                >
                  Login
                </button>

                <div className="mt-6 block w-full rounded-2xl border border-white/20 px-6 py-5 text-center text-xl font-black text-white">
                  Secure access for{" "}
                  <span className="text-orange-400">UptoSkills Admin</span>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}