import {
  Camera,
  Mail,
  Phone,
  User,
  Lock,
  Globe,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  Trophy,
  BookOpen,
  Save,
  CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";

import { useState } from "react";

/* ====================================================== */
/* ================= STATS ============================== */
/* ====================================================== */

const stats = [
  {
    icon: BookOpen,

    value: "12",

    label: "Courses",

    color:
      "text-[var(--color-secondary)]",
  },

  {
    icon: Trophy,

    value: "6",

    label: "Awards",

    color: "text-yellow-400",
  },

  {
    icon: BrainCircuit,

    value: "18",

    label: "Skills",

    color: "text-pink-400",
  },
];

/* ====================================================== */
/* ================= STYLES ============================= */
/* ====================================================== */

const glass =
  `
    border border-[var(--color-border)]

    bg-[var(--color-card)]

    backdrop-blur-xl
  `;

const inputStyle =
  `
    w-full

    bg-transparent

    text-sm
    text-white

    outline-none

    placeholder:text-slate-500
  `;

const inputWrapper =
  `
    flex items-center
    gap-3

    rounded-2xl

    border border-[var(--color-border)]

    bg-black/10

    px-4 py-3

    transition-all
    duration-300

    focus-within:border-[var(--color-secondary)]
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
/* ================= COMPONENT ========================== */
/* ====================================================== */

function Profile() {

  const [saved, setSaved] =
    useState(false);

  /* ====================================================== */
  /* SAVE */
  /* ====================================================== */

  const handleSave = () => {

    setSaved(true);

    setTimeout(() => {

      setSaved(false);

    }, 2000);
  };

  /* ====================================================== */

  return (

    <div
      className="
        relative

        min-h-screen

        overflow-hidden

        bg-[var(--color-background)]

        px-5 pb-16 pt-24

        lg:px-8
      "
    >

      {/* ====================================================== */}
      {/* GLOWS */}
      {/* ====================================================== */}

      <div
        className="
          absolute
          -left-24
          top-0

          h-[280px]
          w-[280px]

          rounded-full

          bg-[var(--color-secondary)]/10

          blur-[120px]
        "
      />

      <div
        className="
          absolute
          -right-24
          bottom-0

          h-[280px]
          w-[280px]

          rounded-full

          bg-[var(--color-primary)]/10

          blur-[120px]
        "
      />

      {/* ====================================================== */}

      <div
        className="
          relative z-10

          mx-auto

          max-w-7xl
        "
      >

        {/* ====================================================== */}
        {/* HEADER */}
        {/* ====================================================== */}

        <div
          className="
            mb-8

            flex flex-col
            gap-5

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* LEFT */}

          <div>

            {/* BADGE */}

            <div
              className={`
                ${glass}

                mb-4

                inline-flex
                items-center
                gap-2

                rounded-full

                px-4 py-2
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
                AI Learner Profile
              </span>

            </div>

            {/* TITLE */}

            <h1
              className="
                text-4xl
                font-black
                leading-tight

                md:text-5xl
              "
            >

              <span className="text-white">
                My
              </span>{" "}

              <span
                className={
                  gradientText
                }
              >
                Profile
              </span>

            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-4

                max-w-3xl

                text-sm
                leading-8

                text-slate-400

                md:text-base
              "
            >

              Manage your AI learning
              identity, certifications,
              skills, and futuristic
              profile settings.

            </p>

          </div>

          {/* SAVE BUTTON */}

          <button
            onClick={
              handleSave
            }

            className="
              flex items-center
              gap-2

              rounded-2xl

              bg-gradient-to-r

              from-[var(--color-primary)]
              to-pink-500

              px-6 py-3

              text-sm
              font-semibold

              text-white

              shadow-[var(--shadow-orange)]

              transition-all
              duration-300

              hover:scale-[1.02]
            "
          >

            {saved ? (

              <>
                <CheckCircle2
                  size={16}
                />

                Saved
              </>

            ) : (

              <>
                <Save
                  size={16}
                />

                Save Changes
              </>
            )}

          </button>

        </div>

        {/* ====================================================== */}
        {/* GRID */}
        {/* ====================================================== */}

        <div
          className="
            grid gap-5

            xl:grid-cols-[320px_1fr]
          "
        >

          {/* ====================================================== */}
          {/* SIDEBAR */}
          {/* ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            className={`
              ${glass}

              overflow-hidden

              rounded-[28px]

              h-fit
            `}
          >

            {/* COVER */}

            <div
              className="
                h-28

                bg-gradient-to-r

                from-[var(--color-primary)]
                via-pink-500
                to-[var(--color-secondary)]
              "
            />

            {/* CONTENT */}

            <div className="px-5 pb-6">

              {/* AVATAR */}

              <div
                className="
                  relative

                  -mt-12

                  mb-5
                "
              >

                <img
                  src="https://i.pravatar.cc/300"

                  alt="profile"

                  className="
                    h-24 w-24

                    rounded-[24px]

                    border-[4px]

                    border-[var(--color-background)]

                    object-cover
                  "
                />

                {/* CAMERA */}

                <button
                  className="
                    absolute
                    bottom-1
                    right-1

                    flex h-9 w-9
                    items-center
                    justify-center

                    rounded-xl

                    bg-gradient-to-r

                    from-[var(--color-primary)]
                    to-pink-500
                  "
                >

                  <Camera
                    size={14}
                  />

                </button>

              </div>

              {/* USER */}

              <h2
                className="
                  text-xl
                  font-bold

                  text-white
                "
              >
                John Doe
              </h2>

              <p
                className="
                  mt-1

                  text-sm

                  text-[var(--color-secondary)]
                "
              >
                AI Engineer & ML Researcher
              </p>

              {/* STATS */}

              <div
                className="
                  mt-6

                  grid grid-cols-3
                  gap-3
                "
              >

                {stats.map(
                  (item) => {

                    const Icon =
                      item.icon;

                    return (

                      <div
                        key={
                          item.label
                        }

                        className={`
                          ${glass}

                          rounded-2xl

                          p-3

                          text-center
                        `}
                      >

                        <Icon
                          size={18}

                          className={`
                            mx-auto mb-2

                            ${item.color}
                          `}
                        />

                        <h4
                          className="
                            text-lg
                            font-black

                            text-white
                          "
                        >
                          {
                            item.value
                          }
                        </h4>

                        <p
                          className="
                            text-[11px]

                            text-slate-500
                          "
                        >
                          {
                            item.label
                          }
                        </p>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

          </motion.div>

          {/* ====================================================== */}
          {/* FORM SECTION */}
          {/* ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            className={`
              ${glass}

              rounded-[28px]

              p-5

              lg:p-7
            `}
          >

            {/* HEADER */}

            <div className="mb-6">

              <h3
                className="
                  text-2xl
                  font-black

                  text-white
                "
              >

                Personal Information

              </h3>

              <p
                className="
                  mt-2

                  text-sm

                  text-slate-400
                "
              >

                Update your account details and learner identity.

              </p>

            </div>

            {/* FORM */}

            <form className="space-y-5">

              {/* ROW 1 */}

              <div
                className="
                  grid gap-5

                  md:grid-cols-2
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
                    className={
                      inputWrapper
                    }
                  >

                    <User
                      size={16}

                      className="
                        text-[var(--color-secondary)]
                      "
                    />

                    <input
                      type="text"

                      defaultValue="John Doe"

                      className={
                        inputStyle
                      }
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
                    className={
                      inputWrapper
                    }
                  >

                    <Mail
                      size={16}

                      className="
                        text-[var(--color-secondary)]
                      "
                    />

                    <input
                      type="email"

                      defaultValue="john@gmail.com"

                      className={
                        inputStyle
                      }
                    />

                  </div>

                </div>

              </div>

              {/* ROW 2 */}

              <div
                className="
                  grid gap-5

                  md:grid-cols-2
                "
              >

                {/* PHONE */}

                <div>

                  <label
                    className="
                      mb-2

                      block

                      text-xs

                      text-slate-400
                    "
                  >
                    Phone Number
                  </label>

                  <div
                    className={
                      inputWrapper
                    }
                  >

                    <Phone
                      size={16}

                      className="
                        text-[var(--color-secondary)]
                      "
                    />

                    <input
                      type="text"

                      placeholder="+91 9876543210"

                      className={
                        inputStyle
                      }
                    />

                  </div>

                </div>

                {/* WEBSITE */}

                <div>

                  <label
                    className="
                      mb-2

                      block

                      text-xs

                      text-slate-400
                    "
                  >
                    Portfolio Website
                  </label>

                  <div
                    className={
                      inputWrapper
                    }
                  >

                    <Globe
                      size={16}

                      className="
                        text-[var(--color-secondary)]
                      "
                    />

                    <input
                      type="text"

                      placeholder="yourwebsite.com"

                      className={
                        inputStyle
                      }
                    />

                  </div>

                </div>

              </div>

              {/* BIO */}

              <div>

                <label
                  className="
                    mb-2

                    block

                    text-xs

                    text-slate-400
                  "
                >
                  Bio
                </label>

                <textarea
                  rows="5"

                  placeholder="Tell us about yourself..."

                  className="
                    w-full

                    resize-none

                    rounded-2xl

                    border border-[var(--color-border)]

                    bg-black/10

                    px-4 py-4

                    text-sm
                    text-white

                    outline-none

                    placeholder:text-slate-500
                  "
                />

              </div>

              {/* PASSWORD */}

              <div
                className="
                  rounded-[24px]

                  border border-[var(--color-border)]

                  bg-black/10

                  p-5
                "
              >

                {/* HEADER */}

                <div
                  className="
                    mb-5

                    flex items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      flex h-11 w-11
                      items-center
                      justify-center

                      rounded-2xl

                      bg-[var(--color-secondary)]/10
                    "
                  >

                    <Lock
                      size={18}

                      className="
                        text-[var(--color-secondary)]
                      "
                    />

                  </div>

                  <div>

                    <h3
                      className="
                        text-lg
                        font-bold

                        text-white
                      "
                    >
                      Change Password
                    </h3>

                    <p
                      className="
                        text-xs

                        text-slate-500
                      "
                    >
                      Keep your account secure
                    </p>

                  </div>

                </div>

                {/* INPUTS */}

                <div
                  className="
                    grid gap-4

                    md:grid-cols-2
                  "
                >

                  <input
                    type="password"

                    placeholder="New Password"

                    className="
                      rounded-2xl

                      border border-[var(--color-border)]

                      bg-black/10

                      px-4 py-3

                      text-sm
                      text-white

                      outline-none

                      placeholder:text-slate-500
                    "
                  />

                  <input
                    type="password"

                    placeholder="Confirm Password"

                    className="
                      rounded-2xl

                      border border-[var(--color-border)]

                      bg-black/10

                      px-4 py-3

                      text-sm
                      text-white

                      outline-none

                      placeholder:text-slate-500
                    "
                  />

                </div>

              </div>

              {/* SECURITY */}

              <div
                className="
                  flex items-start
                  gap-3

                  rounded-2xl

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

                    Secure Profile Management

                  </h4>

                  <p
                    className="
                      text-xs
                      leading-6

                      text-slate-400
                    "
                  >

                    Your profile information is encrypted and securely protected.

                  </p>

                </div>

              </div>

            </form>

          </motion.div>

        </div>

      </div>

    </div>
  );
}

export default Profile;