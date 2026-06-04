import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { motion } from "motion/react";

import {
  User,
  Mail,
  Lock,
} from "lucide-react";

/* AUTH */
import { useAuth } from "../AuthContext";

/* DESIGN TOKENS */
import {
  colors,
  shadows,
} from "../styles/designTokens";

/* LOGO */
import logo from "../assets/logo.png";

export default function RegisterPage() {

  const navigate = useNavigate();

  const { login } = useAuth();

  // STATES
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // REGISTER
  const handleRegister = (e) => {

    e.preventDefault();

    // CREATE USER
    const newUser = {
      name,
      email,
      password,
      role: "student",
    };

    // SAVE USER
    localStorage.setItem(
      "newUser",
      JSON.stringify(newUser)
    );

    // SAVE NAME
    localStorage.setItem(
      "studentName",
      name
    );

    // LOGIN USER
    login(email, "student");

    // REDIRECT
    navigate("/new-dashboard");
  };

  return (

    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >

      {/* GLOW LEFT */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] left-[-120px] top-[80px]"
        style={{
          backgroundColor: `${colors.secondary}20`,
        }}
      />

      {/* GLOW RIGHT */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] right-[-120px] bottom-[40px]"
        style={{
          backgroundColor: `${colors.primary}20`,
        }}
      />

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:55px_55px]" />

      {/* CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative z-10 w-full max-w-md rounded-[36px] border overflow-hidden backdrop-blur-2xl"
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: shadows.lg,
        }}
      >

        {/* TOP BAR */}
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{
            background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
          }}
        />

        {/* RETURN HOME BUTTON */}
        <div className="flex justify-end px-8 pt-6">

          <Link
            to="/"
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: colors.textSecondary,
            }}
          >
            ← Return Home
          </Link>

        </div>

        {/* HEADER */}
        <div className="px-8 pt-4 pb-6 text-center">

          {/* LOGO */}
          <div className="flex justify-center mb-5">

            <img
              src={logo}
              alt="UpToSkills"
              className="h-20 object-contain"
            />

          </div>

          {/* TITLE */}
          <h1 className="text-4xl font-black mb-3">
            Create Account
          </h1>

          {/* SUBTITLE */}
          <p
            className="text-base"
            style={{
              color: colors.textSecondary,
            }}
          >
            Start your journey with UpToSkills today.
          </p>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleRegister}
          className="px-8 pb-8 space-y-6"
        >

          {/* NAME */}
          <div className="space-y-2">

            <label
              className="text-[11px] uppercase tracking-[0.2em] font-bold ml-1"
              style={{
                color: colors.textSecondary,
              }}
            >
              Full Name
            </label>

            <div className="relative">

              <User
                className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2"
                style={{
                  color: colors.textSecondary,
                }}
              />

              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full py-4 pl-12 pr-4 rounded-2xl border outline-none transition-all"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: "rgba(255,255,255,0.08)",
                  color: colors.textPrimary,
                }}
              />

            </div>

          </div>

          {/* EMAIL */}
          <div className="space-y-2">

            <label
              className="text-[11px] uppercase tracking-[0.2em] font-bold ml-1"
              style={{
                color: colors.textSecondary,
              }}
            >
              Email Address
            </label>

            <div className="relative">

              <Mail
                className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2"
                style={{
                  color: colors.textSecondary,
                }}
              />

              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full py-4 pl-12 pr-4 rounded-2xl border outline-none transition-all"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: "rgba(255,255,255,0.08)",
                  color: colors.textPrimary,
                }}
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div className="space-y-2">

            <label
              className="text-[11px] uppercase tracking-[0.2em] font-bold ml-1"
              style={{
                color: colors.textSecondary,
              }}
            >
              Password
            </label>

            <div className="relative">

              <Lock
                className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2"
                style={{
                  color: colors.primary,
                }}
              />

              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full py-4 pl-12 pr-4 rounded-2xl border outline-none transition-all"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: "rgba(255,255,255,0.08)",
                  color: colors.textPrimary,
                }}
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl text-lg font-black hover:scale-[1.02] transition-all duration-300"
            style={{
              backgroundColor: colors.primary,
              color: colors.textPrimary,
              boxShadow: "0 0 30px rgba(255,107,53,0.35)",
            }}
          >
            Create Account
          </button>

          {/* LOGIN */}
          <p
            className="text-center text-sm pt-2"
            style={{
              color: colors.textSecondary,
            }}
          >

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-bold hover:underline"
              style={{
                color: colors.secondary,
              }}
            >
              Sign In
            </Link>

          </p>

        </form>

      </motion.div>

    </div>
  );
}