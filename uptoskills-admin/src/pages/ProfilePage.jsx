import { motion } from "framer-motion";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

import {
  Mail,
  BookOpen,
  Clock,
  Award,
  Edit,
  TrendingUp,
} from "lucide-react";

import { useAuth } from "../AuthContext";

/* DESIGN TOKENS */
import {
  colors,
  shadows,
} from "../styles/designTokens";

export default function ProfilePage() {

  const { user } = useAuth();

  // USER DATA
  const studentName =
    user?.fullName ||
    user?.name ||
    user?.username ||
    "Divya";

  const displayName =
    studentName === "Student User"
      ? "Divya"
      : studentName;

  const email =
    user?.email ||
    "divyabala291@gmail.com";

  // EDIT STATES
  const [isEditing, setIsEditing] =
    useState(false);

  const [name, setName] =
    useState(displayName);

  const [userEmail, setUserEmail] =
    useState(email);

  return (

    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >

      {/* SIDEBAR */}
      <Sidebar role="student" />

      {/* MAIN */}
      <main className="flex-1 ml-64 p-10">

        {/* HEADER */}
        <div className="mb-10">

          <h1
            className="text-5xl font-bold mb-3"
            style={{
              color: colors.textPrimary,
            }}
          >
            My Profile
          </h1>

          <p
            className="text-lg"
            style={{
              color: colors.textSecondary,
            }}
          >
            Manage your account and track your learning journey.
          </p>

        </div>

        {/* PROFILE CARD */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="overflow-hidden mb-10 border rounded-[2rem]"
          style={{
            backgroundColor:
              "rgba(255,255,255,0.04)",

            borderColor:
              `${colors.secondary}25`,

            boxShadow: shadows.lg,
          }}
        >

          {/* BANNER */}
          <div className="h-52 relative">

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400"
              alt="banner"
              className="w-full h-full object-cover opacity-30"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  `linear-gradient(to right,
                  ${colors.primary}40,
                  ${colors.secondary}30)`,
              }}
            />

          </div>

          {/* CONTENT */}
          <div className="px-12 pb-12 relative">

            {/* AVATAR */}
            <div className="-mt-16 mb-6">

              <div
                className="w-32 h-32 border-4 flex items-center justify-center rounded-full shadow-2xl"
                style={{
                  background:
                    `linear-gradient(to bottom right,
                    ${colors.secondary},
                    ${colors.primary})`,

                  borderColor:
                    colors.background,
                }}
              >

                <span
                  className="text-5xl font-black"
                  style={{
                    color: colors.background,
                  }}
                >
                  {name
                    .charAt(0)
                    .toUpperCase()}
                </span>

              </div>

            </div>

            {/* USER INFO */}
            <div className="flex items-start justify-between flex-wrap gap-6">

              <div>

                {/* NAME */}
                <h2
                  className="text-5xl font-bold mb-3"
                  style={{
                    color: colors.textPrimary,
                  }}
                >
                  {name}
                </h2>

                {/* EMAIL */}
                <div
                  className="flex items-center gap-2 mb-6"
                  style={{
                    color: colors.textSecondary,
                  }}
                >

                  <Mail className="w-5 h-5" />

                  <span className="text-lg">
                    {userEmail}
                  </span>

                </div>

                {/* SKILLS */}
                <div className="flex gap-3 flex-wrap">

                  <span
                    className="px-5 py-2 border text-sm font-semibold rounded-xl"
                    style={{
                      backgroundColor:
                        `${colors.secondary}10`,

                      color:
                        colors.secondary,

                      borderColor:
                        `${colors.secondary}25`,
                    }}
                  >
                    Full Stack
                  </span>

                  <span
                    className="px-5 py-2 border text-sm font-semibold rounded-xl"
                    style={{
                      backgroundColor:
                        `${colors.primary}10`,

                      color:
                        colors.primary,

                      borderColor:
                        `${colors.primary}25`,
                    }}
                  >
                    AI & ML
                  </span>

                  <span
                    className="px-5 py-2 border text-sm font-semibold rounded-xl"
                    style={{
                      backgroundColor:
                        "#22C55E10",

                      color:
                        "#22C55E",

                      borderColor:
                        "#22C55E25",
                    }}
                  >
                    Cybersecurity
                  </span>

                </div>

              </div>

              {/* EDIT BUTTON */}
              <button
                onClick={() =>
                  setIsEditing(true)
                }
                className="px-7 py-4 font-bold hover:scale-105 transition-all flex items-center gap-2 rounded-2xl"
                style={{
                  backgroundColor:
                    colors.secondary,

                  color:
                    colors.background,

                  boxShadow:
                    "0 0 25px rgba(0,181,165,0.35)",
                }}
              >

                <Edit className="w-5 h-5" />

                Edit Profile

              </button>

            </div>

          </div>

        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mb-10">

          {/* CARD 1 */}
          <div
            className="border p-7 rounded-3xl"
            style={{
              backgroundColor:
                "rgba(255,255,255,0.04)",

              borderColor:
                "rgba(255,255,255,0.08)",

              boxShadow: shadows.md,
            }}
          >

            <BookOpen
              className="w-9 h-9 mb-4"
              style={{
                color: colors.secondary,
              }}
            />

            <p
              className="text-4xl font-bold mb-2"
              style={{
                color: colors.textPrimary,
              }}
            >
              2
            </p>

            <p
              style={{
                color: colors.textSecondary,
              }}
            >
              Enrolled Courses
            </p>

          </div>

          {/* CARD 2 */}
          <div
            className="border p-7 rounded-3xl"
            style={{
              backgroundColor:
                "rgba(255,255,255,0.04)",

              borderColor:
                "rgba(255,255,255,0.08)",

              boxShadow: shadows.md,
            }}
          >

            <Clock
              className="w-9 h-9 mb-4"
              style={{
                color: colors.secondary,
              }}
            />

            <p
              className="text-4xl font-bold mb-2"
              style={{
                color: colors.textPrimary,
              }}
            >
              24.5h
            </p>

            <p
              style={{
                color: colors.textSecondary,
              }}
            >
              Learning Hours
            </p>

          </div>

          {/* CARD 3 */}
          <div
            className="border p-7 rounded-3xl"
            style={{
              backgroundColor:
                "rgba(255,255,255,0.04)",

              borderColor:
                "rgba(255,255,255,0.08)",

              boxShadow: shadows.md,
            }}
          >

            <Award
              className="w-9 h-9 mb-4"
              style={{
                color: colors.secondary,
              }}
            />

            <p
              className="text-4xl font-bold mb-2"
              style={{
                color: colors.textPrimary,
              }}
            >
              1
            </p>

            <p
              style={{
                color: colors.textSecondary,
              }}
            >
              Certificates
            </p>

          </div>

          {/* CARD 4 */}
          <div
            className="border p-7 rounded-3xl"
            style={{
              backgroundColor:
                "rgba(255,255,255,0.04)",

              borderColor:
                "rgba(255,255,255,0.08)",

              boxShadow: shadows.md,
            }}
          >

            <TrendingUp
              className="w-9 h-9 mb-4"
              style={{
                color: colors.secondary,
              }}
            />

            <p
              className="text-4xl font-bold mb-2"
              style={{
                color: colors.textPrimary,
              }}
            >
              85%
            </p>

            <p
              style={{
                color: colors.textSecondary,
              }}
            >
              Weekly Goal
            </p>

          </div>

        </div>

        {/* PROGRESS */}
        <div
          className="border p-10 rounded-[2rem]"
          style={{
            backgroundColor:
              "rgba(255,255,255,0.04)",

            borderColor:
              "rgba(255,255,255,0.08)",

            boxShadow: shadows.lg,
          }}
        >

          <h3
            className="text-3xl font-bold mb-8"
            style={{
              color: colors.textPrimary,
            }}
          >
            Learning Progress
          </h3>

          <div className="space-y-7">

            {/* FULL STACK */}
            <div>

              <div className="flex justify-between mb-3">

                <span
                  className="font-medium text-lg"
                  style={{
                    color:
                      colors.textPrimary,
                  }}
                >
                  Full Stack Development
                </span>

                <span
                  style={{
                    color:
                      colors.secondary,
                  }}
                >
                  82%
                </span>

              </div>

              <div
                className="h-3 overflow-hidden rounded-full"
                style={{
                  backgroundColor:
                    colors.surface,
                }}
              >

                <div
                  className="h-full w-[82%]"
                  style={{
                    backgroundColor:
                      colors.secondary,
                  }}
                />

              </div>

            </div>

            {/* AI */}
            <div>

              <div className="flex justify-between mb-3">

                <span
                  className="font-medium text-lg"
                  style={{
                    color:
                      colors.textPrimary,
                  }}
                >
                  Machine Learning
                </span>

                <span
                  style={{
                    color:
                      colors.primary,
                  }}
                >
                  82%
                </span>

              </div>

              <div
                className="h-3 overflow-hidden rounded-full"
                style={{
                  backgroundColor:
                    colors.surface,
                }}
              >

                <div
                  className="h-full w-[82%]"
                  style={{
                    backgroundColor:
                      colors.primary,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

        {/* EDIT MODAL */}
        {isEditing && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div
              className="border p-8 w-[450px] rounded-[2rem]"
              style={{
                backgroundColor:
                  colors.surface,

                borderColor:
                  `${colors.secondary}25`,

                boxShadow:
                  shadows.lg,
              }}
            >

              <h2
                className="text-3xl font-bold mb-6"
                style={{
                  color:
                    colors.textPrimary,
                }}
              >
                Edit Profile
              </h2>

              {/* NAME */}
              <div className="mb-5">

                <label
                  className="block mb-2"
                  style={{
                    color:
                      colors.textSecondary,
                  }}
                >
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  className="w-full border px-4 py-3 rounded-xl outline-none"
                  style={{
                    backgroundColor:
                      colors.background,

                    borderColor:
                      "rgba(255,255,255,0.08)",

                    color:
                      colors.textPrimary,
                  }}
                />

              </div>

              {/* EMAIL */}
              <div className="mb-7">

                <label
                  className="block mb-2"
                  style={{
                    color:
                      colors.textSecondary,
                  }}
                >
                  Email
                </label>

                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) =>
                    setUserEmail(
                      e.target.value
                    )
                  }
                  className="w-full border px-4 py-3 rounded-xl outline-none"
                  style={{
                    backgroundColor:
                      colors.background,

                    borderColor:
                      "rgba(255,255,255,0.08)",

                    color:
                      colors.textPrimary,
                  }}
                />

              </div>

              {/* BUTTONS */}
              <div className="flex gap-4">

                <button
                  onClick={() =>
                    setIsEditing(false)
                  }
                  className="flex-1 py-3 font-bold rounded-xl"
                  style={{
                    backgroundColor:
                      colors.secondary,

                    color:
                      colors.background,
                  }}
                >
                  Save
                </button>

                <button
                  onClick={() =>
                    setIsEditing(false)
                  }
                  className="flex-1 py-3 border rounded-xl"
                  style={{
                    borderColor:
                      "rgba(255,255,255,0.08)",

                    color:
                      colors.textPrimary,
                  }}
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}