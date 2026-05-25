import { useState } from "react";
import { motion } from "motion/react";

import Sidebar from "../../components/Sidebar";
import { colors } from "../../styles/designTokens";

import {
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  Flame,
  Star,
  ChevronDown,
} from "lucide-react";

export default function ManageStudents() {

  // STUDENTS
  const initialStudents = [
    {
      id: 1,
      name: "Ananya Patel",
      email: "ananyapatel@gmail.com",
      course: "Artificial Intelligence",
      progress: 39,
      badge: "Bronze",
      streak: 9,
      joined: 2026,
    },

    {
      id: 2,
      name: "Arjun Kumar",
      email: "arjunkumar@gmail.com",
      course: "Full Stack Development",
      progress: 82,
      badge: "Gold",
      streak: 42,
      joined: 2024,
    },

    {
      id: 3,
      name: "Karthik Iyer",
      email: "karthikiyer@gmail.com",
      course: "Java",
      progress: 72,
      badge: "Silver",
      streak: 35,
      joined: 2025,
    },

    {
      id: 4,
      name: "Meera Nair",
      email: "meeranair@gmail.com",
      course: "Data Structures",
      progress: 84,
      badge: "Gold",
      streak: 51,
      joined: 2023,
    },

    {
      id: 5,
      name: "Priya Sharma",
      email: "priyasharma@gmail.com",
      course: "Machine Learning",
      progress: 65,
      badge: "Silver",
      streak: 28,
      joined: 2025,
    },

    {
      id: 6,
      name: "Rahul Verma",
      email: "rahulverma@gmail.com",
      course: "Python",
      progress: 48,
      badge: "Bronze",
      streak: 12,
      joined: 2026,
    },

    {
      id: 7,
      name: "Sneha Reddy",
      email: "snehareddy@gmail.com",
      course: "UI/UX Design",
      progress: 91,
      badge: "Diamond",
      streak: 76,
      joined: 2022,
    },

    {
      id: 8,
      name: "Vikram Singh",
      email: "vikramsingh@gmail.com",
      course: "C++ Programming",
      progress: 58,
      badge: "Silver",
      streak: 31,
      joined: 2024,
    },
  ];

  const [students, setStudents] =
    useState(initialStudents);

  const [search, setSearch] = useState("");

  const [filter, setFilter] =
    useState("A-Z");

  // DELETE
  const deleteStudent = (id) => {
    setStudents(
      students.filter(
        (student) => student.id !== id
      )
    );
  };

  // FILTERED STUDENTS
  const filteredStudents = [...students]
    .filter(
      (student) =>
        student.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.course
          .toLowerCase()
          .includes(search.toLowerCase())
    )
    .sort((a, b) => {

      if (filter === "A-Z") {
        return a.name.localeCompare(b.name);
      }

      if (filter === "Z-A") {
        return b.name.localeCompare(a.name);
      }

      if (filter === "New Student") {
        return b.joined - a.joined;
      }

      if (filter === "Old Student") {
        return a.joined - b.joined;
      }

      return 0;
    });

  return (

    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >

      {/* SIDEBAR */}
      <Sidebar role="admin" />

      {/* MAIN */}
      <main className="flex-1 ml-64 p-7">

        {/* HEADER */}
        <header className="mb-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5">

          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
          >

            <h1 className="text-4xl font-bold mb-2">
              Manage Students
            </h1>

            <p
              className="text-sm"
              style={{
                color: colors.textSecondary,
              }}
            >
              Track student progress and activity.
            </p>

          </motion.div>

          {/* FILTER */}
          <div className="flex gap-3 flex-wrap">

            {/* SEARCH */}
            <div
              className="px-4 h-11 flex items-center gap-3 min-w-[280px] rounded-xl"
              style={{
                backgroundColor: colors.surface,
                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >

              <Search
                className="w-4 h-4"
                style={{
                  color: colors.textSecondary,
                }}
              />

              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="bg-transparent outline-none text-sm flex-1"
                style={{
                  color: colors.textPrimary,
                }}
              />

            </div>

            {/* FILTER */}
            <div className="relative">

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
                className="appearance-none px-4 pr-10 h-11 text-sm outline-none cursor-pointer rounded-xl"
                style={{
                  backgroundColor: colors.surface,
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  color: colors.textPrimary,
                }}
              >

                <option>A-Z</option>

                <option>Z-A</option>

                <option>New Student</option>

                <option>Old Student</option>

              </select>

              <ChevronDown
                className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  color: colors.textSecondary,
                }}
              />

            </div>

          </div>

        </header>

        {/* TABLE */}
        <div
          className="overflow-hidden rounded-3xl"
          style={{
            backgroundColor: colors.surface,
            border:
              "1px solid rgba(255,255,255,0.08)",
          }}
        >

          {/* TABLE HEAD */}
          <div
            className="grid grid-cols-[2fr_1.4fr_1.2fr_1fr_1fr_110px] gap-6 px-6 py-4 border-b text-xs uppercase tracking-wider font-bold"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              borderColor:
                "rgba(255,255,255,0.08)",
              color: colors.textSecondary,
            }}
          >

            <div>Student</div>

            <div>Course</div>

            <div>Progress</div>

            <div>Badge</div>

            <div>Streak</div>

            <div className="text-center">
              Actions
            </div>

          </div>

          {/* STUDENTS */}
          {filteredStudents.map((student, i) => (

            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="grid grid-cols-[2fr_1.4fr_1.2fr_1fr_1fr_110px] gap-6 items-center px-6 py-5 border-b transition-all"
              style={{
                borderColor:
                  "rgba(255,255,255,0.05)",
              }}
            >

              {/* STUDENT */}
              <div className="min-w-0">

                <h3 className="font-semibold text-[17px] truncate">
                  {student.name}
                </h3>

                <p
                  className="text-xs mt-1 truncate"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  {student.email}
                </p>

              </div>

              {/* COURSE */}
              <div>

                <span
                  className="px-3 py-1 text-xs font-semibold whitespace-nowrap rounded-lg"
                  style={{
                    backgroundColor:
                      "rgba(0,181,165,0.12)",
                    border:
                      "1px solid rgba(0,181,165,0.20)",
                    color: colors.secondary,
                  }}
                >
                  {student.course}
                </span>

              </div>

              {/* PROGRESS */}
              <div className="flex items-center gap-3">

                <div
                  className="w-full max-w-[110px] h-2 overflow-hidden rounded-full"
                  style={{
                    backgroundColor:
                      "rgba(255,255,255,0.08)",
                  }}
                >

                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${student.progress}%`,
                      backgroundColor:
                        colors.primary,
                    }}
                  />

                </div>

                <span className="text-sm font-bold min-w-[40px]">
                  {student.progress}%
                </span>

              </div>

              {/* BADGE */}
              <div>

                <span
                  className={`px-3 py-1 text-xs font-bold flex items-center gap-2 w-fit whitespace-nowrap rounded-lg ${
                    student.badge === "Diamond"
                      ? ""
                      : student.badge === "Gold"
                      ? ""
                      : student.badge === "Silver"
                      ? ""
                      : ""
                  }`}
                  style={{
                    backgroundColor:
                      student.badge === "Diamond"
                        ? "rgba(0,181,165,0.12)"
                        : student.badge === "Gold"
                        ? "rgba(245,158,11,0.12)"
                        : student.badge === "Silver"
                        ? "rgba(148,163,184,0.12)"
                        : "rgba(255,107,53,0.12)",

                    border:
                      student.badge === "Diamond"
                        ? "1px solid rgba(0,181,165,0.20)"
                        : student.badge === "Gold"
                        ? "1px solid rgba(245,158,11,0.20)"
                        : student.badge === "Silver"
                        ? "1px solid rgba(148,163,184,0.20)"
                        : "1px solid rgba(255,107,53,0.20)",

                    color:
                      student.badge === "Diamond"
                        ? colors.secondary
                        : student.badge === "Gold"
                        ? "#F59E0B"
                        : student.badge === "Silver"
                        ? "#CBD5E1"
                        : colors.primary,
                  }}
                >

                  <Star className="w-3 h-3" />

                  {student.badge}

                </span>

              </div>

              {/* STREAK */}
              <div>

                <span
                  className="flex items-center gap-2 font-bold whitespace-nowrap"
                  style={{
                    color: colors.primary,
                  }}
                >

                  <Flame className="w-4 h-4" />

                  {student.streak} Days

                </span>

              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-center gap-1">

                {/* EDIT */}
                <button
                  className="w-9 h-9 flex items-center justify-center transition-all rounded-lg"
                  style={{
                    color: colors.textSecondary,
                  }}
                >

                  <Edit2 className="w-4 h-4" />

                </button>

                {/* DELETE */}
                <button
                  onClick={() =>
                    deleteStudent(student.id)
                  }
                  className="w-9 h-9 flex items-center justify-center transition-all rounded-lg"
                  style={{
                    color: colors.error,
                  }}
                >

                  <Trash2 className="w-4 h-4" />

                </button>

                {/* MORE */}
                <button
                  className="w-9 h-9 flex items-center justify-center transition-all rounded-lg"
                  style={{
                    color: colors.textSecondary,
                  }}
                >

                  <MoreVertical className="w-4 h-4" />

                </button>

              </div>

            </motion.div>

          ))}

          {/* FOOTER */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{
              backgroundColor:
                "rgba(255,255,255,0.02)",
            }}
          >

            <p
              className="text-sm"
              style={{
                color: colors.textSecondary,
              }}
            >
              Showing {filteredStudents.length} students
            </p>

            <div className="flex gap-2">

              <button
                disabled
                className="px-4 py-2 text-xs rounded-lg opacity-40"
                style={{
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Previous
              </button>

              <button
                className="px-4 py-2 text-xs rounded-lg transition-all"
                style={{
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Next
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}