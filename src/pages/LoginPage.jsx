import React, { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { motion } from "motion/react";

import { useAuth } from "../AuthContext";

import {
  Mail,
  Lock,
  User,
} from "lucide-react";

import {
  colors,
  shadows,
} from "../styles/designTokens";

/* LOGO */
import logo from "../assets/logo.png";

export default function LoginPage() {

  const [isAdmin, setIsAdmin] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();

    // SAVE USER NAME
    localStorage.setItem(
      "studentName",
      name
    );

    // LOGIN
    login(
      email,
      isAdmin
        ? "admin"
        : "student"
    );

    // REDIRECT
    navigate(
      isAdmin
        ? "/admin"
        : "/dashboard"
    );
  };

  return (

    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >

      {/* BACKGROUND GLOW */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px]"
        style={{
          backgroundColor: `${colors.secondary}20`,
        }}
      />

      <div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]"
        style={{
          backgroundColor: `${colors.primary}20`,
        }}
      />

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:55px_55px]" />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="w-full max-w-md relative z-10"
      >

        {/* CARD */}
        <div
          className="rounded-[2.5rem] p-10 border relative overflow-hidden backdrop-blur-2xl"
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
          <div className="flex justify-end mb-4">

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

          {/* LOGO */}
          <div className="text-center mb-10">

            <Link
              to="/"
              className="inline-flex flex-col items-center justify-center mb-6"
            >

              <img
                src={logo}
                alt="UpToSkills"
                className="h-20 object-contain mb-2"
              />

            </Link>

            <h1 className="text-3xl font-black mb-3">
              Welcome Back
            </h1>

            <p
              style={{
                color: colors.textSecondary,
              }}
            >
              Login to continue your learning journey.
            </p>

          </div>

          {/* ROLE SWITCH */}
          <div
            className="flex gap-2 p-1 rounded-2xl mb-8 border"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.05)",
            }}
          >

            {/* STUDENT */}
            <button
              onClick={() => setIsAdmin(false)}
              className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
              style={{
                backgroundColor: !isAdmin
                  ? colors.secondary
                  : "transparent",

                color: !isAdmin
                  ? colors.background
                  : colors.textSecondary,
              }}
            >
              Student Portal
            </button>

            {/* ADMIN */}
            <button
              onClick={() => setIsAdmin(true)}
              className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
              style={{
                backgroundColor: isAdmin
                  ? colors.primary
                  : "transparent",

                color: isAdmin
                  ? "#fff"
                  : colors.textSecondary,
              }}
            >
              Admin Access
            </button>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}
            <div className="space-y-2">

              <label
                className="text-[11px] font-bold uppercase tracking-widest ml-1"
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
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your name"
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
                className="text-[11px] font-bold uppercase tracking-widest ml-1"
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
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
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
                className="text-[11px] font-bold uppercase tracking-widest ml-1"
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
                    color: colors.textSecondary,
                  }}
                />

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter password"
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
              className="w-full py-4 rounded-2xl font-black text-lg transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: isAdmin
                  ? colors.primary
                  : colors.secondary,

                color: colors.background,

                boxShadow: isAdmin
                  ? "0 0 30px rgba(255,107,53,0.35)"
                  : "0 0 30px rgba(0,181,165,0.35)",
              }}
            >
              {isAdmin
                ? "Login as Admin"
                : "Login as Student"}
            </button>

          </form>

          {/* FOOTER */}
          <p
            className="mt-8 text-center text-sm"
            style={{
              color: colors.textSecondary,
            }}
          >
            New user?{" "}

            <Link
              to="/register"
              className="font-bold hover:underline"
              style={{
                color: colors.secondary,
              }}
            >
              Create Account
            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
}