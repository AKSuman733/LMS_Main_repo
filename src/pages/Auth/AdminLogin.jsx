import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Activity,
  Database,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { motion } from "framer-motion";

const glass =
  `
    border border-[var(--color-border)]

    bg-[var(--color-card)]

    backdrop-blur-xl
  `;

const gradientText =
  `
    bg-gradient-to-r

    from-[var(--color-primary)]
    via-pink-500
    to-[var(--color-secondary)]

    bg-clip-text

    text-transparent
  `;

function AdminLogin() {

  const navigate = useNavigate();

  /* ================= STATES ================= */

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [emailValid, setEmailValid] =
    useState(false);

  const [passwordValid, setPasswordValid] =
    useState(false);

  /* ================= VALIDATION ================= */

  const validateEmail = (value) => {

    const valid =
      /\S+@\S+\.\S+/.test(value);

    setEmail(value);

    setEmailValid(valid);
  };

  const validatePassword = (
    value
  ) => {

    setPassword(value);

    setPasswordValid(
      value.length >= 6
    );
  };

  /* ================= LOGIN ================= */

  const handleLogin = async (
    e
  ) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {

      setError(
        "Please fill all fields"
      );

      return;
    }

    if (!emailValid) {

      setError(
        "Enter a valid email"
      );

      return;
    }

    if (!passwordValid) {

      setError(
        "Password must be at least 6 characters"
      );

      return;
    }

    setLoading(true);

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          1200
        )
    );

    if (
      email ===
        "admin@uptoskills.com" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "role",
        "admin"
      );

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "userEmail",
        email
      );

      navigate(
        "/admin-dashboard"
      );

    } else {

      setError(
        "Invalid Admin Credentials"
      );
    }

    setLoading(false);
  };

  return (

    <div
      className="
        relative

        flex min-h-screen
        items-center
        justify-center

        overflow-hidden

        bg-[var(--color-background)]

        px-4 py-6
      "
    >

      {/* ================= BACKGROUND GLOWS ================= */}

      <div
        className="
          absolute
          -left-20
          top-0

          h-[180px]
          w-[180px]

          rounded-full

          bg-[var(--color-secondary)]/10

          blur-[80px]
        "
      />

      <div
        className="
          absolute
          -bottom-20
          right-0

          h-[180px]
          w-[180px]

          rounded-full

          bg-[var(--color-primary)]/10

          blur-[80px]
        "
      />

      {/* ================= LOGIN CARD ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.5,
        }}

        className={`
          ${glass}

          relative z-10

          w-full
          max-w-[360px]

          overflow-hidden

          rounded-[24px]

          shadow-[var(--shadow-lg)]
        `}
      >

        {/* ================= TOP BAR ================= */}

        <div
          className="
            h-1

            bg-gradient-to-r

            from-[var(--color-primary)]
            via-pink-500
            to-[var(--color-secondary)]
          "
        />

        {/* ================= CONTENT ================= */}

        <div className="p-5">

          {/* ================= BADGE ================= */}

          <div
            className={`
              ${glass}

              mb-3

              inline-flex
              items-center
              gap-2

              rounded-full

              px-3 py-1.5
            `}
          >

            <ShieldCheck
              size={13}

              className="
                text-[var(--color-secondary)]
              "
            />

            <span
              className="
                text-[11px]
                font-medium

                text-[var(--color-secondary)]
              "
            >
              Secure Admin Portal
            </span>

          </div>

          {/* ================= HEADING ================= */}

          <h1
            className="
              mb-2

              text-lg
              font-bold
              leading-tight
            "
          >

            <span className="text-white">
              Admin
            </span>

            <span
              className={
                gradientText
              }
            >
              {" "}
              Control Hub
            </span>

          </h1>

          {/* ================= DESCRIPTION ================= */}

          <p
            className="
              mb-3

              text-xs
              leading-6

              text-slate-400
            "
          >

            Monitor analytics,
            manage instructors,
            and control the AI
            learning ecosystem.

          </p>

          {/* ================= ERROR ================= */}

          {error && (

            <div
              className="
                mb-3

                flex items-center
                gap-2

                rounded-xl

                border border-red-500/20

                bg-red-500/5

                px-3 py-2

                text-xs

                text-red-300
              "
            >

              <AlertTriangle
                size={14}
              />

              {error}

            </div>
          )}

          {/* ================= FEATURE CARDS ================= */}

          <div
            className="
              mb-3

              grid grid-cols-2
              gap-3
            "
          >

            {/* CARD 1 */}

            <div
              className={`
                ${glass}

                rounded-xl

                p-2.5
              `}
            >

              <div
                className="
                  mb-2

                  flex h-8 w-8
                  items-center
                  justify-center

                  rounded-lg

                  bg-[var(--color-secondary)]/10
                "
              >

                <Activity
                  className="
                    text-[var(--color-secondary)]
                  "

                  size={15}
                />

              </div>

              <h3
                className="
                  mb-1

                  text-xs
                  font-semibold

                  text-white
                "
              >
                Live Analytics
              </h3>

              <p
                className="
                  text-[11px]
                  leading-5

                  text-slate-400
                "
              >
                Real-time platform insights.
              </p>

            </div>

            {/* CARD 2 */}

            <div
              className={`
                ${glass}

                rounded-xl

                p-2.5
              `}
            >

              <div
                className="
                  mb-2

                  flex h-8 w-8
                  items-center
                  justify-center

                  rounded-lg

                  bg-[var(--color-primary)]/10
                "
              >

                <Database
                  className="
                    text-[var(--color-primary)]
                  "

                  size={15}
                />

              </div>

              <h3
                className="
                  mb-1

                  text-xs
                  font-semibold

                  text-white
                "
              >
                Course Control
              </h3>

              <p
                className="
                  text-[11px]
                  leading-5

                  text-slate-400
                "
              >
                Manage mentors and courses.
              </p>

            </div>

          </div>

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleLogin}

            className="space-y-3"
          >

            {/* ================= EMAIL ================= */}

            <div>

              <label
                className="
                  mb-2

                  block

                  text-xs

                  text-slate-400
                "
              >
                Admin Email
              </label>

              <div
                className={`
                  flex items-center
                  gap-3

                  rounded-xl

                  border

                  bg-[var(--color-card)]

                  px-3 py-2.5

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  ${
                    email.length > 0

                      ? emailValid

                        ? "border-green-500"

                        : "border-red-500"

                      : "border-[var(--color-border)]"
                  }

                  focus-within:border-[var(--color-secondary)]
                `}
              >

                <Mail
                  size={15}

                  className="
                    text-[var(--color-secondary)]
                  "
                />

                <input
                  type="email"

                  placeholder="Enter admin email"

                  value={email}

                  onChange={(e) =>
                    validateEmail(
                      e.target.value
                    )
                  }

                  className="
                    w-full

                    bg-transparent

                    text-xs
                    text-white

                    outline-none

                    placeholder:text-slate-500
                  "
                />

                {email.length >
                  0 &&
                  emailValid && (

                    <CheckCircle2
                      size={15}

                      className="
                        text-green-400
                      "
                    />
                  )}

              </div>

            </div>

            {/* ================= PASSWORD ================= */}

            <div>

              <label
                className="
                  mb-2

                  block

                  text-xs

                  text-slate-400
                "
              >
                Password
              </label>

              <div
                className={`
                  flex items-center
                  gap-3

                  rounded-xl

                  border

                  bg-[var(--color-card)]

                  px-3 py-2.5

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  ${
                    password.length > 0

                      ? passwordValid

                        ? "border-green-500"

                        : "border-red-500"

                      : "border-[var(--color-border)]"
                  }

                  focus-within:border-[var(--color-secondary)]
                `}
              >

                <Lock
                  size={15}

                  className="
                    text-[var(--color-secondary)]
                  "
                />

                <input
                  type={
                    showPassword

                      ? "text"

                      : "password"
                  }

                  placeholder="Enter password"

                  value={password}

                  onChange={(e) =>
                    validatePassword(
                      e.target.value
                    )
                  }

                  className="
                    w-full

                    bg-transparent

                    text-xs
                    text-white

                    outline-none

                    placeholder:text-slate-500
                  "
                />

                <button
                  type="button"

                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword ? (

                    <EyeOff
                      size={15}

                      className="
                        text-slate-500
                      "
                    />

                  ) : (

                    <Eye
                      size={15}

                      className="
                        text-slate-500
                      "
                    />
                  )}

                </button>

              </div>

              <p
                className="
                  mt-2

                  text-[11px]

                  text-slate-500
                "
              >
                Minimum 6 characters
              </p>

            </div>

            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="submit"

              disabled={loading}

              className="
                flex w-full
                items-center
                justify-center
                gap-2

                rounded-xl

                bg-gradient-to-r

                from-[var(--color-primary)]
                to-pink-500

                py-2.5

                text-xs
                font-semibold

                text-white

                shadow-[var(--shadow-orange)]

                transition-all
                duration-300

                hover:scale-[1.01]

                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >

              {loading ? (

                <>
                  <Loader2
                    size={15}

                    className="
                      animate-spin
                    "
                  />

                  Authenticating...
                </>

              ) : (

                <>
                  Access Dashboard

                  <ArrowRight
                    size={15}
                  />
                </>
              )}

            </button>

          </form>

          {/* ================= DEMO ================= */}

          <div
            className="
              mt-3

              rounded-xl

              border border-[var(--color-secondary)]/20

              bg-[var(--color-secondary)]/10

              p-3
            "
          >

            <h4
              className="
                mb-2

                text-sm
                font-semibold

                text-white
              "
            >
              Demo Credentials
            </h4>

            <div
              className="
                space-y-1

                text-xs

                text-slate-300
              "
            >

              <p>

                <span
                  className="
                    font-semibold

                    text-[var(--color-secondary)]
                  "
                >
                  Email:
                </span>{" "}

                admin@uptoskills.com

              </p>

              <p>

                <span
                  className="
                    font-semibold

                    text-[var(--color-secondary)]
                  "
                >
                  Password:
                </span>{" "}

                admin123

              </p>

            </div>

          </div>

          {/* ================= FOOTER ================= */}

          <div
            className="
              mt-4

              text-center

              text-xs
            "
          >

            <p
              className="
                text-slate-400
              "
            >

              Student Login?{" "}

              <Link
                to="/login"

                className="
                  font-semibold

                  text-[var(--color-secondary)]

                  transition

                  hover:opacity-80
                "
              >
                Go to Student Portal
              </Link>

            </p>

          </div>

        </div>

      </motion.div>

    </div>
  );
}

export default AdminLogin;