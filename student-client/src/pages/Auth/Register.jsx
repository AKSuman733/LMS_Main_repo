import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Rocket,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  auth,
  googleProvider,
  githubProvider,
} from "../../firebase/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

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

const socialButton =
  `
    flex items-center
    justify-center
    gap-2

    rounded-xl

    border border-[var(--color-border)]

    bg-[var(--color-card)]

    py-2.5

    text-xs
    font-medium

    text-white

    transition-all
    duration-300

    hover:bg-white/10
  `;

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

function Register() {

  const navigate =
    useNavigate();

  /* ====================================================== */
  /* STATES */
  /* ====================================================== */

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* ====================================================== */
  /* VALIDATION */
  /* ====================================================== */

  const emailValid =
    /\S+@\S+\.\S+/.test(email);

  const passwordValid =
    password.length >= 6;

  const passwordsMatch =
    password === confirmPassword &&
    confirmPassword.length > 0;

  /* ====================================================== */
  /* PASSWORD STRENGTH */
  /* ====================================================== */

  const getPasswordStrength =
    () => {

      if (password.length < 6)
        return {
          text: "Weak",
          color: "bg-red-500",
        };

      if (password.length < 10)
        return {
          text: "Medium",
          color: "bg-yellow-500",
        };

      return {
        text: "Strong",
        color: "bg-green-500",
      };
    };

  const passwordStrength =
    getPasswordStrength();

  /* ====================================================== */
  /* SAVE USER SESSION */
  /* ====================================================== */

  const saveUserSession = (
    userData
  ) => {

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "role",
      "student"
    );

    localStorage.setItem(
      "userEmail",
      userData.email
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(userData)
    );
  };

  /* ====================================================== */
  /* EMAIL REGISTER */
  /* ====================================================== */

  const handleRegister =
    async (e) => {

      e.preventDefault();

      setError("");

      setSuccess("");

      /* ====================================================== */
      /* VALIDATION */
      /* ====================================================== */

      if (
        !fullName ||
        !email ||
        !password ||
        !confirmPassword
      ) {

        setError(
          "Please fill all fields"
        );

        return;
      }

      if (!emailValid) {

        setError(
          "Please enter a valid email"
        );

        return;
      }

      if (!passwordValid) {

        setError(
          "Password must be at least 6 characters"
        );

        return;
      }

      if (!passwordsMatch) {

        setError(
          "Passwords do not match"
        );

        return;
      }

      if (!acceptedTerms) {

        setError(
          "Please accept Terms & Conditions"
        );

        return;
      }

      try {

        setLoading(true);

        /* ====================================================== */
        /* FIREBASE REGISTER */
        /* ====================================================== */

        const userCredential =

          await createUserWithEmailAndPassword(

            auth,
            email,
            password
          );

        const user =
          userCredential.user;

        /* ====================================================== */
        /* UPDATE DISPLAY NAME */
        /* ====================================================== */

        await updateProfile(
          user,
          {
            displayName:
              fullName,
          }
        );

        /* ====================================================== */
        /* USER DATA */
        /* ====================================================== */

        const newUser = {

          id:
            user.uid,

          fullName,

          email:
            user.email || "",

          role:
            "student",

          photo:
            user.photoURL ||

            "https://i.pravatar.cc/150",
        };

        /* ====================================================== */
        /* SAVE SESSION */
        /* ====================================================== */

        saveUserSession(
          newUser
        );

        setLoading(false);

        setSuccess(
          "Registration successful!"
        );

        setTimeout(() => {

          navigate(
            "/dashboard"
          );

        }, 1200);

      } catch (error) {

        console.log(error);

        setLoading(false);

        if (
          error.code ===
          "auth/email-already-in-use"
        ) {

          setError(
            "Email already registered"
          );

        } else {

          setError(
            error.message
          );
        }
      }
    };

  /* ====================================================== */
  /* GOOGLE REGISTER */
  /* ====================================================== */

  const handleGoogleRegister =
    async () => {

      try {

        setLoading(true);

        const result =
          await signInWithPopup(
            auth,
            googleProvider
          );

        const user =
          result.user;

        const newUser = {

          id:
            user.uid,

          fullName:
            user.displayName ||

            "Student",

          email:
            user.email || "",

          role:
            "student",

          photo:
            user.photoURL ||

            "https://i.pravatar.cc/150",
        };

        saveUserSession(
          newUser
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
  /* GITHUB REGISTER */
  /* ====================================================== */

  const handleGithubRegister =
    async () => {

      try {

        setLoading(true);

        const result =
          await signInWithPopup(
            auth,
            githubProvider
          );

        const user =
          result.user;

        const newUser = {

          id:
            user.uid,

          fullName:
            user.displayName ||

            "Github User",

          email:
            user.email || "",

          role:
            "student",

          photo:
            user.photoURL ||

            "https://i.pravatar.cc/150",
        };

        saveUserSession(
          newUser
        );

        setLoading(false);

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        setLoading(false);

        setError(
          "Github authentication failed"
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
          absolute
          -left-20
          -top-20

          h-[220px]
          w-[220px]

          rounded-full

          bg-[var(--color-secondary)]/10

          blur-[90px]
        "
      />

      <div
        className="
          absolute
          -bottom-20
          -right-20

          h-[220px]
          w-[220px]

          rounded-full

          bg-[var(--color-primary)]/10

          blur-[90px]
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
          duration: 0.5,
        }}

        className={`
          ${glass}
          relative z-10
          w-full
          max-w-[400px]
          overflow-hidden
          rounded-[28px]
          shadow-[var(--shadow-lg)]
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

        <div className="p-6">

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
              AI Career Platform
            </span>

          </div>

          {/* TITLE */}

          <h1
            className="
              mb-2
              text-2xl
              font-bold
              leading-tight
            "
          >

            <span className="text-white">
              Create
            </span>

            <span
              className={
                gradientText
              }
            >
              {" "}
              Account
            </span>

          </h1>

          {/* SUBTITLE */}

          <p
            className="
              mb-4
              text-xs
              leading-6
              text-slate-400
            "
          >

            Join futuristic AI learning
            experiences and immersive
            mentor-led courses.

          </p>

          {/* ERROR */}

          {error && (

            <div
              className="
                mb-4
                flex items-center
                gap-2
                rounded-xl
                border border-red-500/20
                bg-red-500/5
                px-3 py-2.5
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

          {/* SUCCESS */}

          {success && (

            <div
              className="
                mb-4
                flex items-center
                gap-2
                rounded-xl
                border border-green-500/20
                bg-green-500/10
                px-3 py-2.5
                text-xs
                text-green-300
              "
            >

              <CheckCircle2
                size={14}
              />

              {success}

            </div>
          )}

          {/* SOCIAL BUTTONS */}

          <div
            className="
              mb-4
              grid grid-cols-2
              gap-3
            "
          >

            <button
              type="button"

              onClick={
                handleGoogleRegister
              }

              className={
                socialButton
              }
            >

              Google

            </button>

            <button
              type="button"

              onClick={
                handleGithubRegister
              }

              className={
                socialButton
              }
            >

              Github

            </button>

          </div>

         {/* FORM */}

<form
  onSubmit={
    handleRegister
  }

  className="
    space-y-3
  "
>

  {/* FULL NAME */}

  <div>

    <label
      className="
        mb-2
        block
        text-xs
        text-slate-400
      "
    >
      Full Name
    </label>

    <div
      className="
        flex items-center
        gap-3

        rounded-xl

        border border-[var(--color-border)]

        bg-[var(--color-card)]

        px-3 py-2.5
      "
    >

      <User
        size={15}
        className="
          text-cyan-400
        "
      />

      <input
        type="text"

        placeholder="Enter your full name"

        value={fullName}

        onChange={(e) =>
          setFullName(
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
          setEmail(
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

        placeholder="Create password"

        value={password}

        onChange={(e) =>
          setPassword(
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

    {/* PASSWORD STRENGTH */}

    <div
      className="
        mt-2
      "
    >

      <div
        className="
          mb-1
          flex items-center
          justify-between
        "
      >

        <span
          className="
            text-[10px]
            text-slate-500
          "
        >

          Password Strength

        </span>

        <span
          className="
            text-[10px]
            text-slate-400
          "
        >

          {
            passwordStrength.text
          }

        </span>

      </div>

      <div
        className="
          h-1.5
          overflow-hidden
          rounded-full
          bg-slate-700
        "
      >

        <div
          className={`
            h-full

            ${passwordStrength.color}
          `}
          style={{
            width:
              password.length < 6
                ? "33%"
                : password.length < 10
                ? "66%"
                : "100%",
          }}
        />

      </div>

    </div>

  </div>

  {/* CONFIRM PASSWORD */}

  <div>

    <label
      className="
        mb-2
        block
        text-xs
        text-slate-400
      "
    >
      Confirm Password
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
          confirmPassword.length > 0

            ? passwordsMatch

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
          showConfirmPassword
            ? "text"
            : "password"
        }

        placeholder="Confirm password"

        value={confirmPassword}

        onChange={(e) =>
          setConfirmPassword(
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
          setShowConfirmPassword(
            !showConfirmPassword
          )
        }
      >

        {showConfirmPassword ? (

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

  {/* TERMS */}

  <label
    className="
      flex items-start
      gap-3
      pt-1
    "
  >

    <input
      type="checkbox"

      checked={
        acceptedTerms
      }

      onChange={(e) =>
        setAcceptedTerms(
          e.target.checked
        )
      }

      className="
        mt-1
      "
    />

    <span
      className="
        text-[11px]
        leading-6
        text-slate-400
      "
    >

      I agree to the{" "}

      <span
        className="
          text-cyan-400
        "
      >

        Terms &
        Conditions

      </span>

    </span>

  </label>

  {/* REGISTER BUTTON */}

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

      transition-all
      duration-300

      hover:scale-[1.02]
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

        Creating Account...

      </>

    ) : (

      <>
        Create Account

        <ArrowRight
          size={15}
        />

      </>
    )}

  </button>

</form>

          {/* FOOTER */}

          <div
            className="
              mt-5
              text-center
              text-xs
            "
          >

            <p
              className="
                text-slate-400
              "
            >

              Already have an account?{" "}

              <Link
                to="/login"

                className="
                  font-semibold
                  text-[var(--color-secondary)]
                  transition
                  hover:opacity-80
                "
              >

                Login

              </Link>

            </p>

          </div>

          {/* SECURITY */}

          <div
            className="
              mt-5
              flex items-start
              gap-3
              rounded-xl
              border border-green-500/20
              bg-green-500/10
              p-4
            "
          >

            <ShieldCheck
              size={17}
              className="
                mt-0.5
                text-green-400
              "
            />

            <div>

              <h4
                className="
                  mb-1
                  text-sm
                  font-semibold
                  text-white
                "
              >

                Secure Registration

              </h4>

              <p
                className="
                  text-[11px]
                  leading-6
                  text-slate-400
                "
              >

                Protected with encrypted
                Firebase authentication.

              </p>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
}

export default Register;