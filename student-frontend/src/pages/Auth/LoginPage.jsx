import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

import uptoskillsLogo from "../../assets/logo/UptoSkills.webp";
import { sendStudentOtp, verifyStudentOtp } from "../../services/studentApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectAfterLogin = location.state?.redirectAfterLogin || "/dashboard";

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      showMessage("Please enter your email address.", "error");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await sendStudentOtp({
        email: email.trim(),
      });

      showMessage("OTP sent successfully. Please check your email.", "success");
      setStep("otp");
    } catch (error) {
      showMessage(error.message || "Failed to send OTP.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    if (!otp.trim()) {
      showMessage("Please enter OTP.", "error");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await verifyStudentOtp({
        email: email.trim(),
        otp: otp.trim(),
      });

      showMessage("Login successful.", "success");

      setTimeout(() => {
        navigate(redirectAfterLogin, { replace: true });
      }, 500);
    } catch (error) {
      showMessage(error.message || "Invalid OTP.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = () => {
    setStep("email");
    setOtp("");
    setMessage("");
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
          <section className="relative hidden min-h-[720px] overflow-hidden bg-gradient-to-br from-blue-700 via-blue-900 to-slate-950 p-10 lg:block">
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

              <h2 className="mt-8 text-4xl font-black">Student Portal</h2>

              <p className="mt-5 text-xl font-semibold leading-8 text-slate-200">
                Login with OTP, enroll in courses, track progress and earn
                certificates with UptoSkills LMS.
              </p>
            </div>

            <div className="relative z-10 mt-10 rounded-2xl border border-white/10 bg-slate-950/80 p-5 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-400 p-2">
                  <ShieldCheck className="text-slate-950" />
                </div>

                <div>
                  <h3 className="font-black italic text-white">
                    Secure OTP Login
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-slate-300">
                    No password needed. Verify your email and continue learning.
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
              className="absolute left-8 top-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft size={17} />
              Home
            </Link>

            <div className="w-full max-w-xl">
              <div className="mb-8 flex justify-center lg:hidden">
                <img
                  src={uptoskillsLogo}
                  alt="UptoSkills Logo"
                  className="h-20 w-auto rounded-2xl bg-slate-950/60 px-4 py-2 object-contain shadow-xl"
                />
              </div>

              <div className="text-center">
                <h1 className="text-5xl font-black tracking-tight text-orange-200">
                  Student Login
                </h1>

                <p className="mt-5 text-xl font-semibold text-slate-200">
                  {step === "email"
                    ? "Enter your email to receive OTP."
                    : "Enter OTP sent to your email."}
                </p>
              </div>

              {step === "email" ? (
                <form onSubmit={handleSendOtp} className="mt-10">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-300">
                      Email Address
                    </span>

                    <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-950/70 px-5 py-4 transition focus-within:border-cyan-400">
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-transparent text-lg text-white outline-none placeholder:text-slate-400"
                      />

                      <Mail className="text-white" />
                    </div>
                  </label>

                  {message && (
                    <AlertMessage type={messageType} message={message} />
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 text-xl font-black text-white shadow-xl shadow-orange-500/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Lock />}
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="mt-10">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm font-bold text-cyan-200">
                    OTP sent to: <span className="text-white">{email}</span>
                  </div>

                  <label className="mt-5 block">
                    <span className="mb-2 block text-sm font-bold text-slate-300">
                      6 Digit OTP
                    </span>

                    <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-950/70 px-5 py-4 transition focus-within:border-cyan-400">
                      <input
                        type="text"
                        value={otp}
                        onChange={(event) => setOtp(event.target.value)}
                        placeholder="Enter OTP"
                        maxLength={6}
                        className="w-full bg-transparent text-center text-2xl font-black tracking-[0.35em] text-white outline-none placeholder:text-slate-500"
                      />

                      <CheckCircle2 className="text-white" />
                    </div>
                  </label>

                  {message && (
                    <AlertMessage type={messageType} message={message} />
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 text-xl font-black text-white shadow-xl shadow-orange-500/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>

                  <button
                    type="button"
                    onClick={handleChangeEmail}
                    className="mt-4 w-full rounded-2xl border border-white/10 px-6 py-4 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    Change Email
                  </button>
                </form>
              )}

              <p className="mt-8 text-center text-sm text-slate-400">
                New student?{" "}
                <Link
                  to="/register"
                  className="font-black text-cyan-300 hover:text-cyan-200"
                >
                  Create account
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function AlertMessage({ type, message }) {
  return (
    <div
      className={`mt-5 rounded-2xl border p-4 text-sm font-semibold ${
        type === "error"
          ? "border-red-400/30 bg-red-400/10 text-red-300"
          : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
      }`}
    >
      {message}
    </div>
  );
}