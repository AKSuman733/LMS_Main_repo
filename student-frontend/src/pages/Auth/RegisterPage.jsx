import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

import uptoskillsLogo from "../../assets/logo/UptoSkills.webp";
import { loginWithGoogle } from "../../services/firebase";
import { sendStudentOtp, verifyStudentOtp } from "../../services/studentApi";

const roles = [
  {
    id: "student",
    title: "Candidate/Student",
    desc: "Explore courses, leagues, jobs, and competitions for your future.",
    icon: GraduationCap,
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: "corporate",
    title: "Corporate/HR",
    desc: "Speed up hiring with AI tools, ATS and talent access.",
    icon: Briefcase,
    color: "from-orange-400 to-red-500",
  },
  {
    id: "faculty",
    title: "Campus/Faculty",
    desc: "Organise competitions, manage placements and students.",
    icon: Users,
    color: "from-emerald-400 to-teal-500",
  },
];

const fieldOptions = [
  "Java Development",
  "Python Programming",
  "AI & Machine Learning",
  "Web Development",
  "Data Science",
  "Digital Marketing",
  "Interview Preparation",
];

const mentorOptions = [
  "Sports Mentor",
  "CEO / Business Mentor",
  "Women Inspiration Mentor",
  "Education Mentor",
  "Innovation Mentor",
];

function getPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", width: "35%", color: "bg-red-500" };
  if (score === 3 || score === 4) {
    return { label: "Medium", width: "70%", color: "bg-orange-400" };
  }

  return { label: "Strong", width: "100%", color: "bg-emerald-400" };
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("student");
  const [activeSlide, setActiveSlide] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSentTo, setOtpSentTo] = useState("email");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timer, setTimer] = useState(30);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    fieldOfInterest: "",
    skills: "",
    preferredMentor: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const currentRole = roles.find((role) => role.id === selectedRole) || roles[0];
  const strength = useMemo(() => getPasswordStrength(form.password), [form.password]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step !== 4 || timer <= 0) return;

    const countdown = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown);
  }, [timer, step]);

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!form.phone.trim()) return "Please enter your phone number.";
    if (!form.fieldOfInterest) return "Please select your field of interest.";
    if (!form.skills.trim()) return "Please enter your skills.";
    if (!form.preferredMentor) return "Please select your preferred mentor.";
    if (form.password.length < 8) return "Password must be at least 8 characters.";
    if (form.password !== form.confirmPassword) {
      return "Password and confirm password do not match.";
    }
    if (!form.terms) return "Please accept terms and conditions.";
    return "";
  };

  const handleGoogleSignup = async () => {
    try {
      setGoogleLoading(true);
      setError("");
      setSuccess("");

      const user = await loginWithGoogle();
      const token = await user.getIdToken();

      const userData = {
        name: user.displayName || "Student",
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        role: selectedRole,
        provider: "google",
        fieldOfInterest: "",
        skills: "",
        preferredMentor: "",
      };

      localStorage.setItem("studentToken", token);
      localStorage.setItem("studentUser", JSON.stringify(userData));

      navigate("/dashboard");
    } catch (err) {
      console.error("Google signup error:", err);
      setError(err.message || "Google signup failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (otpSentTo !== "email") {
      setError("Mobile OTP is not active yet. Please use Email OTP.");
      return;
    }

    try {
      setOtpLoading(true);

      await sendStudentOtp({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });

      setSuccess("OTP sent successfully. Please check your email.");
      setStep(4);
      setTimer(30);
    } catch (err) {
      setError(err.message || "Failed to send OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");

    if (!otp.trim()) {
      setError("Please enter OTP.");
      return;
    }

    try {
      setVerifyLoading(true);

      await verifyStudentOtp({
        email: form.email.trim(),
        otp: otp.trim(),
      });

      const storedUser = JSON.parse(localStorage.getItem("studentUser") || "{}");

      localStorage.setItem(
        "studentUser",
        JSON.stringify({
          ...storedUser,
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: selectedRole,
          fieldOfInterest: form.fieldOfInterest,
          skills: form.skills,
          preferredMentor: form.preferredMentor,
          provider: "otp",
        })
      );

      setSuccess("Account verified successfully.");

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtp("");
    setError("");
    setSuccess("");

    try {
      setOtpLoading(true);

      await sendStudentOtp({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });

      setSuccess("OTP resent successfully. Please check your email.");
      setTimer(30);
    } catch (err) {
      setError(err.message || "Failed to resend OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-orange-500/20 blur-[130px]" />
        <div className="absolute right-[-10%] top-[10%] h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[35%] h-[520px] w-[520px] rounded-full bg-purple-500/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[length:38px_38px]" />
      </div>

      <Link
        to="/"
        className="fixed left-6 top-6 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 backdrop-blur-xl transition hover:border-cyan-400 hover:text-cyan-300"
      >
        <ArrowLeft size={17} />
        Back
      </Link>

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
        <div className="grid w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/60 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl lg:grid-cols-[1fr_1.05fr]">
          <div className="relative hidden min-h-[760px] overflow-hidden bg-gradient-to-br from-blue-700 via-teal-800 to-slate-950 p-10 lg:block">
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

            <div className="relative z-10 mt-10 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 rounded-[2.2rem] bg-cyan-300/20 blur-2xl" />

                <div className="relative min-h-[400px] rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 text-center shadow-2xl backdrop-blur-xl">
                  <div
                    className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${roles[activeSlide].color} shadow-xl`}
                  >
                    {(() => {
                      const Icon = roles[activeSlide].icon;
                      return <Icon size={50} className="text-white" />;
                    })()}
                  </div>

                  <h2 className="mt-8 text-4xl font-black tracking-tight">
                    {roles[activeSlide].title}
                  </h2>

                  <p className="mx-auto mt-5 max-w-xs text-xl font-semibold leading-8 text-slate-200">
                    {roles[activeSlide].desc}
                  </p>

                  {selectedRole === roles[activeSlide].id && (
                    <p className="mt-6 text-xl font-black text-emerald-400">
                      ✓ Selected
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 flex justify-center gap-3">
              {roles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    activeSlide === index ? "w-10 bg-white" : "w-3 bg-white/40"
                  }`}
                />
              ))}
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
                    Build skills, compete, get hired and earn rewards.
                  </p>
                </div>
              </div>

              <div className="absolute right-5 top-5 flex flex-col gap-2">
                <span className="h-3 w-3 rounded-full bg-orange-500" />
                <span className="h-3 w-3 rounded-full bg-orange-500/60" />
                <span className="h-3 w-3 rounded-full bg-orange-500/40" />
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[760px] items-center justify-center bg-slate-950/80 px-6 py-12">
            <Link
              to="/"
              className="absolute right-8 top-8 text-3xl font-bold text-slate-400 transition hover:text-white"
            >
              ×
            </Link>

            <div className="w-full max-w-2xl">
              {step === 1 && (
                <div>
                  <h1 className="text-center text-5xl font-black">Register</h1>
                  <h2 className="mt-4 text-center text-4xl font-black text-orange-400">
                    Choose Your Account
                  </h2>
                  <p className="mt-5 text-center text-xl text-slate-200">
                    Select your role to access role-specific features and benefits.
                  </p>

                  <div className="mt-10 space-y-5">
                    {roles.map((role) => {
                      const Icon = role.icon;

                      return (
                        <button
                          key={role.id}
                          onClick={() => {
                            setSelectedRole(role.id);
                            setActiveSlide(roles.findIndex((item) => item.id === role.id));
                          }}
                          className={`flex w-full items-center gap-6 rounded-3xl border-2 p-6 text-left transition hover:scale-[1.01] ${
                            selectedRole === role.id
                              ? "border-orange-500 bg-orange-500/10"
                              : "border-slate-300 bg-slate-900/50 hover:border-cyan-400"
                          }`}
                        >
                          <div
                            className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${role.color}`}
                          >
                            <Icon size={38} />
                          </div>

                          <div>
                            <h3 className="text-2xl font-black">{role.title}</h3>
                            <p className="mt-2 text-lg text-slate-300">{role.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => {
                      setError("");
                      setSuccess("");
                      setStep(2);
                    }}
                    className="mt-8 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 text-2xl font-black text-white shadow-xl shadow-orange-500/25 transition hover:scale-[1.02]"
                  >
                    Continue
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <button
                    onClick={() => setStep(1)}
                    className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl text-white transition hover:bg-white/10"
                  >
                    ←
                  </button>

                  <h1 className="text-center text-5xl font-black text-orange-200">
                    Choose Registration Method
                  </h1>

                  <p className="mt-5 text-center text-xl font-semibold text-slate-200">
                    Sign up as{" "}
                    <span className="font-black text-orange-400">
                      {currentRole.title}
                    </span>
                  </p>

                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    disabled={googleLoading}
                    className="mt-10 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white p-4 transition hover:scale-[1.01] hover:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <GoogleIcon />
                      <div>
                        <p className="font-bold text-slate-950">
                          {googleLoading ? "Connecting..." : "Sign up with Google"}
                        </p>
                        <p className="text-sm text-slate-500">
                          Use your Google account
                        </p>
                      </div>
                    </div>

                    <span className="text-sm font-bold text-slate-500">Google</span>
                  </button>

                  <div className="my-9 flex items-center gap-4">
                    <div className="h-px flex-1 bg-slate-600" />
                    <span className="text-lg font-semibold text-slate-300">OR</span>
                    <div className="h-px flex-1 bg-slate-600" />
                  </div>

                  <button
                    onClick={() => {
                      setError("");
                      setSuccess("");
                      setStep(3);
                    }}
                    className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 text-2xl font-black text-white shadow-xl shadow-orange-500/25 transition hover:scale-[1.02]"
                  >
                    Sign up with Email
                  </button>

                  <Link
                    to="/login"
                    className="mt-8 block w-full rounded-2xl border border-white/20 px-6 py-5 text-center text-xl font-black text-white transition hover:border-orange-400 hover:text-orange-300"
                  >
                    Already have an account?{" "}
                    <span className="text-orange-400">Sign in</span>
                  </Link>

                  {error && <ErrorBox message={error} />}
                  {success && <SuccessBox message={success} />}
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSignupSubmit}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-xl text-white transition hover:bg-white/10"
                  >
                    ←
                  </button>

                  <h1 className="text-center text-5xl font-black">Create Account</h1>
                  <p className="mt-4 text-center text-lg text-slate-300">
                    Fill your details to create your UptoSkills account.
                  </p>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <InputBox
                      icon={User}
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                    />

                    <InputBox
                      icon={Phone}
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                    />

                    <InputBox
                      icon={Mail}
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                    />

                    <select
                      value={form.fieldOfInterest}
                      onChange={(e) => updateForm("fieldOfInterest", e.target.value)}
                      className="rounded-2xl border border-slate-700 bg-slate-950/70 px-5 py-4 text-slate-200 outline-none transition focus:border-cyan-400"
                    >
                      <option value="">Field of Interest</option>
                      {fieldOptions.map((item) => (
                        <option key={item} value={item} className="bg-slate-950">
                          {item}
                        </option>
                      ))}
                    </select>

                    <input
                      value={form.skills}
                      onChange={(e) => updateForm("skills", e.target.value)}
                      placeholder="Skills e.g. Java, HTML, Python"
                      className="rounded-2xl border border-slate-700 bg-slate-950/70 px-5 py-4 text-slate-200 outline-none transition focus:border-cyan-400 md:col-span-2"
                    />

                    <select
                      value={form.preferredMentor}
                      onChange={(e) => updateForm("preferredMentor", e.target.value)}
                      className="rounded-2xl border border-slate-700 bg-slate-950/70 px-5 py-4 text-slate-200 outline-none transition focus:border-cyan-400 md:col-span-2"
                    >
                      <option value="">Preferred Mentor Type</option>
                      {mentorOptions.map((item) => (
                        <option key={item} value={item} className="bg-slate-950">
                          {item}
                        </option>
                      ))}
                    </select>

                    <PasswordBox
                      placeholder="Password"
                      value={form.password}
                      show={showPassword}
                      setShow={setShowPassword}
                      onChange={(e) => updateForm("password", e.target.value)}
                    />

                    <PasswordBox
                      placeholder="Confirm Password"
                      value={form.confirmPassword}
                      show={showConfirmPassword}
                      setShow={setShowConfirmPassword}
                      onChange={(e) => updateForm("confirmPassword", e.target.value)}
                    />
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Password Strength</span>
                      <span className="font-bold text-cyan-300">{strength.label}</span>
                    </div>

                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full ${strength.color} transition-all`}
                        style={{ width: strength.width }}
                      />
                    </div>

                    <ul className="mt-3 grid gap-1 text-xs text-slate-400 sm:grid-cols-2">
                      <li>✓ Minimum 8 characters</li>
                      <li>✓ Uppercase and lowercase</li>
                      <li>✓ Number required</li>
                      <li>✓ Special symbol recommended</li>
                    </ul>
                  </div>

                  <label className="mt-5 flex items-start gap-3 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={form.terms}
                      onChange={(e) => updateForm("terms", e.target.checked)}
                      className="mt-1 accent-orange-500"
                    />
                    I agree to UptoSkills Terms & Conditions and Privacy Policy.
                  </label>

                  {error && <ErrorBox message={error} />}
                  {success && <SuccessBox message={success} />}

                  <button
                    type="submit"
                    disabled={otpLoading}
                    className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 text-2xl font-black text-white shadow-xl shadow-orange-500/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {otpLoading && <Loader2 className="animate-spin" />}
                    {otpLoading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </form>
              )}

              {step === 4 && (
                <div>
                  <button
                    onClick={() => setStep(3)}
                    className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-xl text-white transition hover:bg-white/10"
                  >
                    ←
                  </button>

                  <h1 className="text-center text-5xl font-black text-orange-200">
                    Verify OTP
                  </h1>

                  <p className="mt-5 text-center text-lg text-slate-300">
                    Enter the OTP sent to your{" "}
                    <span className="font-black text-cyan-300">{form.email}</span>.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setOtpSentTo("email")}
                      className={`rounded-2xl border px-5 py-4 font-bold ${
                        otpSentTo === "email"
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                          : "border-slate-700 text-slate-300"
                      }`}
                    >
                      OTP on Email
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setOtpSentTo("mobile");
                        setError("Mobile OTP is not active yet. Please use Email OTP.");
                      }}
                      className={`rounded-2xl border px-5 py-4 font-bold ${
                        otpSentTo === "mobile"
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                          : "border-slate-700 text-slate-300"
                      }`}
                    >
                      OTP on Mobile
                    </button>
                  </div>

                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6 digit OTP"
                    maxLength={6}
                    className="mt-8 w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-5 py-5 text-center text-3xl font-black tracking-[0.5em] text-white outline-none transition focus:border-cyan-400"
                  />

                  {error && <ErrorBox message={error} />}
                  {success && <SuccessBox message={success} />}

                  <button
                    onClick={handleVerifyOtp}
                    disabled={verifyLoading}
                    className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 text-2xl font-black text-white shadow-xl shadow-orange-500/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {verifyLoading && <Loader2 className="animate-spin" />}
                    {verifyLoading ? "Verifying..." : "Verify & Create Account"}
                  </button>

                  <button
                    onClick={handleResendOtp}
                    disabled={timer > 0 || otpLoading}
                    className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/20 px-6 py-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {otpLoading && <Loader2 className="animate-spin" />}
                    {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputBox({ icon: Icon, placeholder, value, onChange }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-950/70 px-5 py-4 transition focus-within:border-cyan-400">
      <Icon className="text-cyan-300" />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
      />
    </div>
  );
}

function PasswordBox({ placeholder, value, show, setShow, onChange }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-950/70 px-5 py-4 transition focus-within:border-cyan-400">
      <Lock className="text-cyan-300" />
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="text-slate-300"
      >
        {show ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
}

function ErrorBox({ message }) {
  return (
    <div className="mt-5 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm font-semibold text-red-300">
      {message}
    </div>
  );
}

function SuccessBox({ message }) {
  return (
    <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm font-semibold text-emerald-300">
      {message}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.3C29.3 35 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.4l6.3 5.3C39.5 36.9 44 32 44 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}