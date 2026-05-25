import {
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  LockKeyhole,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { motion } from "framer-motion";

import { useState } from "react";

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

function ForgotPassword() {

  /* ================= STATES ================= */

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  const [emailValid, setEmailValid] =
    useState(false);

  /* ================= VALIDATION ================= */

  const validateEmail = (value) => {

    setEmail(value);

    const valid =
      /\S+@\S+\.\S+/.test(value);

    setEmailValid(valid);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      setSuccess(false);

      if (!email) {

        setError(
          "Email address is required"
        );

        return;
      }

      if (!emailValid) {

        setError(
          "Please enter a valid email"
        );

        return;
      }

      setLoading(true);

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            1500
          )
      );

      setLoading(false);

      setSuccess(true);
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

      {/* ================= CARD ================= */}

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
          max-w-[380px]

          overflow-hidden

          rounded-[28px]

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

        <div className="p-6">

          {/* ================= BADGE ================= */}

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
              size={14}

              className="
                text-[var(--color-secondary)]
              "
            />

            <span
              className="
                text-xs
                font-medium

                text-[var(--color-secondary)]
              "
            >
              Secure Recovery
            </span>

          </div>

          {/* ================= ICON ================= */}

          <div
            className="
              mb-5

              flex h-16 w-16
              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-r

              from-[var(--color-primary)]
              to-pink-500

              shadow-[var(--shadow-orange)]
            "
          >

            <LockKeyhole
              size={28}

              className="text-white"
            />

          </div>

          {/* ================= TITLE ================= */}

          <h1
            className="
              mb-3

              text-2xl
              font-bold
              leading-tight
            "
          >

            <span className="text-white">
              Forgot
            </span>

            <span
              className={
                gradientText
              }
            >
              {" "}
              Password
            </span>

          </h1>

          {/* ================= DESCRIPTION ================= */}

          <p
            className="
              mb-5

              text-sm
              leading-7

              text-slate-400
            "
          >

            Enter your registered
            email address and we’ll
            send secure password
            reset instructions instantly.

          </p>

          {/* ================= ERROR ================= */}

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

          {/* ================= SUCCESS ================= */}

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

              Password reset link sent successfully!

            </div>
          )}

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit}

            className="space-y-4"
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
                Email Address
              </label>

              <div
                className={`
                  flex items-center
                  gap-3

                  rounded-xl

                  border

                  bg-[var(--color-card)]

                  px-3 py-3

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
                  size={16}

                  className="
                    text-[var(--color-secondary)]
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

                    text-sm
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

              <p
                className="
                  mt-2

                  text-[11px]

                  text-slate-500
                "
              >
                Enter your registered email address
              </p>

            </div>

            {/* ================= BUTTON ================= */}

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

                py-3

                text-sm
                font-semibold

                text-white

                shadow-[var(--shadow-orange)]

                transition-all
                duration-300

                hover:scale-[1.01]

                active:scale-[0.98]

                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >

              {loading ? (

                <>
                  <Loader2
                    size={16}

                    className="
                      animate-spin
                    "
                  />

                  Sending Link...
                </>

              ) : (

                <>
                  Send Reset Link

                  <ArrowRight
                    size={16}
                  />
                </>
              )}

            </button>

          </form>

          {/* ================= SECURITY NOTE ================= */}

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
              size={18}

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
                Secure Password Reset
              </h4>

              <p
                className="
                  text-xs
                  leading-6

                  text-slate-400
                "
              >

                Your account is protected
                with encrypted recovery
                and secure email verification.

              </p>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
}

export default ForgotPassword;