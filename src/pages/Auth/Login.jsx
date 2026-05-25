import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  Loader2,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  googleProvider,
  githubProvider,
} from "../../firebase/firebase";

/* ====================================================== */
/* STYLES */
/* ====================================================== */

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

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

function Login() {

  const navigate =
    useNavigate();

  /* ====================================================== */
  /* STATES */
  /* ====================================================== */

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

  /* ====================================================== */
  /* VALIDATION */
  /* ====================================================== */

  const validateEmail = (
    value
  ) => {

    setEmail(value);

    const valid =
      /\S+@\S+\.\S+/.test(
        value
      );

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

  /* ====================================================== */
  /* CLEAR SESSION */
  /* ====================================================== */

  const clearSession = () => {

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "userEmail"
    );

    localStorage.removeItem(
      "currentUser"
    );
  };

  /* ====================================================== */
  /* SAVE USER */
  /* ====================================================== */

  const saveUserSession = (
    user
  ) => {

    localStorage.setItem(
      "role",
      user.role
    );

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "userEmail",
      user.email
    );

    localStorage.setItem(
      "currentUser",

      JSON.stringify({

        name:
          user.name ||

          user.email?.split("@")[0] ||

          "Student",

        email:
          user.email,

        role:
          user.role,

        photo:
          user.photo ||

          "https://i.pravatar.cc/150",
      })
    );
  };

  /* ====================================================== */
  /* NORMAL LOGIN */
  /* ====================================================== */

  const handleLogin =
    async (e) => {

      e.preventDefault();

      setError("");

      if (
        !email ||
        !password
      ) {

        setError(
          "Please fill all fields"
        );

        return;
      }

      if (!emailValid) {

        setError(
          "Please enter valid email"
        );

        return;
      }

      if (
        !passwordValid
      ) {

        setError(
          "Password must be at least 6 characters"
        );

        return;
      }

      setLoading(true);

      /* ====================================================== */
      /* DEMO USERS */
      /* ====================================================== */

      const demoUsers = [

        {
          name:
            "Student",

          email:
            "student@uptoskills.com",

          password:
            "123456",

          role:
            "student",

          redirect:
            "/dashboard",
        },

        {
          name:
            "Admin",

          email:
            "admin@uptoskills.com",

          password:
            "123456",

          role:
            "admin",

          redirect:
            "/admin",

          photo:
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        },

        {
          name:
            "Instructor",

          email:
            "instructor@uptoskills.com",

          password:
            "123456",

          role:
            "instructor",

          redirect:
            "/instructor",

          photo:
            "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
        },
      ];

      /* ====================================================== */
      /* REGISTERED USERS */
      /* ====================================================== */

      const registeredUsers =
        JSON.parse(
          localStorage.getItem(
            "users"
          )
        ) || [];

      const allUsers = [

        ...demoUsers,

        ...registeredUsers.map(
          (user) => ({
            ...user,

            role:
              "student",

            redirect:
              "/dashboard",
          })
        ),
      ];

      const matchedUser =
        allUsers.find(

          (user) =>

            user.email ===
              email &&

            user.password ===
              password
        );

      setLoading(false);

      if (!matchedUser) {

        setError(
          "Invalid email or password"
        );

        return;
      }

      /* ====================================================== */
      /* CLEAR OLD SESSION */
      /* ====================================================== */

      clearSession();

      /* ====================================================== */
      /* SAVE NEW SESSION */
      /* ====================================================== */

      saveUserSession(
        matchedUser
      );

      navigate(
        matchedUser.redirect
      );
    };

  /* ====================================================== */
  /* GOOGLE LOGIN */
  /* ====================================================== */

  const handleGoogleLogin =
    async () => {

      try {

        setLoading(true);

        clearSession();

        const result =
          await signInWithPopup(
            auth,
            googleProvider
          );

        const user =
          result.user;

        const googleUser = {

          name:
            user.displayName ||

            "Student",

          email:
            user.email ||

            "No Email",

          photo:
            user.photoURL ||

            "https://i.pravatar.cc/150",

          role:
            "student",
        };

        saveUserSession(
          googleUser
        );

        setLoading(false);

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        setLoading(false);

        setError(
          "Google authentication failed"
        );
      }
    };

  /* ====================================================== */
  /* GITHUB LOGIN */
  /* ====================================================== */

  const handleGithubLogin =
    async () => {

      try {

        setLoading(true);

        clearSession();

        const result =
          await signInWithPopup(
            auth,
            githubProvider
          );

        const user =
          result.user;

        const githubUser = {

          name:
            user.displayName ||

            "GitHub User",

          email:
            user.email ||

            "No Email",

          photo:
            user.photoURL ||

            "https://i.pravatar.cc/150",

          role:
            "student",
        };

        saveUserSession(
          githubUser
        );

        setLoading(false);

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        setLoading(false);

        setError(
          "GitHub authentication failed"
        );
      }
    };

  /* ====================================================== */
  /* COMPONENT */
  /* ====================================================== */

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

      {/* GLOWS */}

      <div
        className="
          absolute -left-20 -top-20
          h-[180px] w-[180px]
          rounded-full
          bg-cyan-500/10
          blur-[80px]
        "
      />

      <div
        className="
          absolute -bottom-20 -right-20
          h-[180px] w-[180px]
          rounded-full
          bg-pink-500/10
          blur-[80px]
        "
      />

      {/* CARD */}

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
          duration: 0.4,
        }}

        className={`
          ${glass}
          relative z-10
          w-full
          max-w-[360px]
          overflow-hidden
          rounded-[24px]
        `}
      >

        {/* TOP BAR */}

        <div
          className="
            h-1
            bg-gradient-to-r
            from-[var(--color-primary)]
            via-pink-500
            to-[var(--color-secondary)]
          "
        />

        {/* CONTENT */}

        <div className="p-5">

          {/* BADGE */}

          <div
            className={`
              ${glass}
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              px-3 py-1.5
            `}
          >

            <Sparkles
              size={13}
              className="
                text-cyan-400
              "
            />

            <span
              className="
                text-[11px]
                font-medium
                text-cyan-300
              "
            >

              Student Learning Portal

            </span>

          </div>

          {/* TITLE */}

          <h1
            className="
              mb-2
              text-lg
              font-bold
            "
          >

            <span className="text-white">
              Student
            </span>

            <span
              className={
                gradientText
              }
            >
              {" "}
              Login
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mb-4
              text-xs
              leading-6
              text-slate-400
            "
          >

            Continue your AI learning journey.

          </p>

          {/* ERROR */}

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

          {/* FORM */}

          <form
            onSubmit={
              handleLogin
            }

            className="
              space-y-3
            "
          >

            {/* EMAIL */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-xs
                  text-slate-400
                "
              >
                Email Address
              </label>

              <div
                className={`
                  flex items-center
                  gap-3
                  rounded-xl
                  border
                  bg-[var(--color-card)]
                  px-3 py-2.5

                  ${
                    email.length > 0

                      ? emailValid

                        ? "border-green-500"

                        : "border-red-500"

                      : "border-[var(--color-border)]"
                  }
                `}
              >

                <Mail
                  size={15}
                  className="
                    text-cyan-400
                  "
                />

                <input
                  type="email"

                  placeholder="Enter your email"

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

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <div
                className="
                  mb-2
                  flex items-center
                  justify-between
                "
              >

                <label
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"

                  className="
                    text-[11px]
                    text-cyan-400
                  "
                >

                  Forgot Password?

                </Link>

              </div>

              <div
                className={`
                  flex items-center
                  gap-3
                  rounded-xl
                  border
                  bg-[var(--color-card)]
                  px-3 py-2.5

                  ${
                    password.length > 0

                      ? passwordValid

                        ? "border-green-500"

                        : "border-red-500"

                      : "border-[var(--color-border)]"
                  }
                `}
              >

                <Lock
                  size={15}
                  className="
                    text-cyan-400
                  "
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  placeholder="Enter your password"

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

            </div>

            {/* LOGIN BUTTON */}

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
                  Login as Student

                  <ArrowRight
                    size={15}
                  />

                </>
              )}

            </button>

            {/* ROLE BUTTONS */}

            <div
              className="
                grid grid-cols-2
                gap-2
              "
            >

              <Link
                to="/admin-login"

                className="
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  border border-cyan-500/20
                  bg-cyan-500/10
                  py-2.5
                  text-[11px]
                  font-semibold
                  text-cyan-300
                "
              >

                Admin Login

              </Link>

              <Link
                to="/instructor-login"

                className="
                  flex
                  items-center
                  justify-center
                  rounded-xl
                  border border-purple-500/20
                  bg-purple-500/10
                  py-2.5
                  text-[11px]
                  font-semibold
                  text-purple-300
                "
              >

                Instructor Login

              </Link>

            </div>

            {/* DIVIDER */}

            <div
              className="
                relative py-2
              "
            >

              <div
                className="
                  absolute left-0 top-1/2
                  h-px w-full
                  bg-[var(--color-border)]
                "
              />

              <span
                className="
                  relative
                  mx-auto
                  block
                  w-fit
                  bg-[var(--color-background)]
                  px-3
                  text-[11px]
                  text-slate-500
                "
              >

                OR CONTINUE WITH

              </span>

            </div>

            {/* GOOGLE */}

            <button
              type="button"

              onClick={
                handleGoogleLogin
              }

              className="
                flex w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                border border-[var(--color-border)]
                bg-white
                py-2.5
                text-xs
                font-semibold
                text-black
              "
            >

              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"

                alt="google"

                className="
                  h-4 w-4
                "
              />

              Continue with Google

            </button>

            {/* GITHUB */}

            <button
              type="button"

              onClick={
                handleGithubLogin
              }

              className="
                flex w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                border border-[var(--color-border)]
                bg-[#111827]
                py-2.5
                text-xs
                font-semibold
                text-white
              "
            >

              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"

                alt="github"

                className="
                  h-4 w-4
                  rounded-full
                "
              />

              Continue with GitHub

            </button>

          </form>
           {/* REGISTER */}

<div
  className="
    mt-4

    text-center
  "
>

  <p
    className="
      text-xs
      text-slate-400
    "
  >

    Don’t have an account?{" "}

    <Link
      to="/register"

      className="
        font-semibold

        text-cyan-400

        transition-all
        duration-300

        hover:text-pink-400
      "
    >

      Create Account

    </Link>

  </p>

</div>
          {/* SECURITY */}

          <div
            className="
              mt-4
              flex items-start
              gap-2
              rounded-xl
              border border-green-500/20
              bg-green-500/5
              p-3
            "
          >

            <ShieldCheck
              size={15}
              className="
                mt-0.5
                text-green-400
              "
            />

            <p
              className="
                text-[11px]
                leading-5
                text-slate-400
              "
            >

              Secure Firebase authentication with protected sessions.

            </p>

          </div>

        </div>

      </motion.div>

    </div>
  );
}

export default Login;