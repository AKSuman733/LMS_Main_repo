import {
  Users,
  BookOpen,
  GraduationCap,
  ArrowUpRight,
  Activity,
  BrainCircuit,
  Sparkles,
  Trophy,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Plus,
  FileText,
} from "lucide-react";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import { motion } from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import allMentors from "../../data/allMentors";

const glassCard =
  `
    rounded-2xl

    border border-[var(--color-border)]

    bg-[var(--color-card)]

    backdrop-blur-xl
  `;

const metricCards = [
  {
    title: "Active Users",
    value: "52,489",
    icon: Users,
    border: "border-green-500",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
    lightBg: "bg-green-500/5",
  },

  {
    title: "Total Courses",
    value: "148",
    icon: BookOpen,
    border: "border-[var(--color-secondary)]",
    iconBg:
      "bg-[var(--color-secondary)]/10",
    iconColor:
      "text-[var(--color-secondary)]",
    lightBg:
      "bg-[var(--color-secondary)]/5",
  },

  {
    title: "Enrollments",
    value: "1,284",
    icon: GraduationCap,
    border:
      "border-[var(--color-primary)]",
    iconBg:
      "bg-[var(--color-primary)]/10",
    iconColor:
      "text-[var(--color-primary)]",
    lightBg:
      "bg-[var(--color-primary)]/5",
  },

  {
    title: "Completion Rate",
    value: "94%",
    icon: CheckCircle2,
    border: "border-green-500",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
    lightBg: "bg-green-500/5",
  },

  {
    title: "Pending Approval",
    value: "12",
    icon: AlertTriangle,
    border: "border-red-500",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    lightBg: "bg-red-500/5",
  },

  {
    title: "System Health",
    value: "Healthy",
    icon: Activity,
    border: "border-emerald-500",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    lightBg: "bg-emerald-500/5",
  },
];

function AdminDashboard() {

  const [activities, setActivities] =
    useState([]);

  /* ========================================= */
  /* PDF REPORT */
  /* ========================================= */

  const generateReport = () => {

    const doc = new jsPDF();

    doc.setFontSize(24);

    doc.text(
      "UpToSkills Admin Report",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      20,
      30
    );

    autoTable(doc, {

      startY: 45,

      head: [["Metric", "Value"]],

      body: metricCards.map(
        (item) => [

          item.title,

          item.value,
        ]
      ),
    });

    doc.setFontSize(18);

    doc.text(
      "Recent Activity",
      20,
      doc.lastAutoTable.finalY + 20
    );

    let y =
      doc.lastAutoTable.finalY + 35;

    activities.forEach((activity) => {

      doc.setFontSize(12);

      doc.text(
        `• ${activity}`,
        25,
        y
      );

      y += 10;
    });

    doc.save(
      `UpToSkills-Report-${Date.now()}.pdf`
    );
  };

  /* ========================================= */
  /* LOAD DATA */
  /* ========================================= */

  useEffect(() => {

    const mentorsArray =
      Array.isArray(allMentors)

        ? allMentors

        : Object.keys(allMentors).map(
            (key) => ({
              id: Number(key),
              ...allMentors[key],
            })
          );

    const enrolledCourses =
      JSON.parse(
        localStorage.getItem(
          "enrolledCourses"
        )
      ) || [];

    let completedModules = 0;

    mentorsArray.forEach((course) => {

      const progress =
        JSON.parse(
          localStorage.getItem(
            `course-progress-${course.id}`
          )
        ) || [];

      completedModules +=
        progress.length;
    });

    setActivities([
      `${mentorsArray.length} AI mentor courses active`,

      `${enrolledCourses.length} total enrollments`,

      `${completedModules} modules completed by learners`,

      "AI learning analytics updated",

      "12 pending instructor approvals",

      "System performance stable",
    ]);

  }, []);

  return (

    <div
      className="
        relative

        min-h-screen

        overflow-hidden

        bg-[var(--color-background)]

        px-5 py-6

        lg:px-8
      "
    >

      {/* ========================================= */}
      {/* BACKGROUND GLOW */}
      {/* ========================================= */}

      <div
        className="
          absolute
          -left-20
          top-0

          h-[320px]
          w-[320px]

          rounded-full

          bg-[var(--color-secondary)]/10

          blur-[90px]
        "
      />

      <div
        className="
          absolute
          -right-20
          bottom-0

          h-[320px]
          w-[320px]

          rounded-full

          bg-[var(--color-primary)]/10

          blur-[90px]
        "
      />

      {/* ========================================= */}
      {/* MAIN */}
      {/* ========================================= */}

      <div className="relative z-10">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div
          className="
            mb-8

            flex flex-col
            justify-between

            gap-5

            lg:flex-row
            lg:items-center
          "
        >

          {/* LEFT */}

          <div>

            <div
              className="
                mb-4

                inline-flex
                items-center
                gap-2

                rounded-full

                border border-[var(--color-border)]

                bg-[var(--color-card)]

                px-4 py-2
              "
            >

              <Sparkles
                size={15}

                className="
                  text-[var(--color-secondary)]
                "
              />

              <span
                className="
                  text-sm
                  font-medium

                  text-[var(--color-secondary)]
                "
              >
                Platform Analytics
              </span>

            </div>

            {/* TITLE */}

            <h1
              className="
                mb-3

                text-4xl
                font-black

                tracking-tight

                md:text-5xl
              "
            >

              <span className="text-white">
                Admin
              </span>

              <span
                className="
                  bg-gradient-to-r

                  from-[var(--color-primary)]
                  via-pink-500
                  to-[var(--color-secondary)]

                  bg-clip-text

                  text-transparent
                "
              >
                {" "}
                Dashboard
              </span>

            </h1>

            {/* SUBTITLE */}

            <p
              className="
                max-w-2xl

                text-sm
                leading-7

                text-slate-400
              "
            >

              Monitor platform growth,
              student engagement,
              enrollments, approvals,
              and AI learning analytics.

            </p>

          </div>

          {/* BUTTON */}

          <button
            onClick={generateReport}

            className="
              flex items-center
              gap-2

              rounded-xl

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

              hover:scale-[1.03]

              active:scale-[0.98]
            "
          >

            <FileText size={16} />

            Generate Report

            <ArrowUpRight size={16} />

          </button>

        </div>

        {/* ========================================= */}
        {/* KPI CARDS */}
        {/* ========================================= */}

        <div
          className="
            mb-8

            grid gap-4

            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {metricCards.map(
            (item, index) => {

              const Icon =
                item.icon;

              return (

                <motion.div
                  key={item.title}

                  initial={{
                    opacity: 0,
                    y: 20,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay:
                      index * 0.05,
                  }}

                  className={`
                    ${glassCard}

                    ${item.border}

                    ${item.lightBg}

                    border-l-4

                    p-5

                    transition-all
                    duration-300

                    hover:-translate-y-1
                  `}
                >

                  <div
                    className="
                      flex items-start
                      justify-between
                    "
                  >

                    <div>

                      <p
                        className="
                          mb-2

                          text-[11px]
                          font-medium

                          uppercase
                          tracking-wider

                          text-slate-400
                        "
                      >
                        {item.title}
                      </p>

                      <h2
                        className="
                          text-2xl
                          font-black

                          text-white
                        "
                      >
                        {item.value}
                      </h2>

                    </div>

                    <div
                      className={`
                        ${item.iconBg}

                        flex h-11 w-11
                        items-center
                        justify-center

                        rounded-xl
                      `}
                    >

                      <Icon
                        size={18}

                        className={
                          item.iconColor
                        }
                      />

                    </div>

                  </div>

                </motion.div>
              );
            }
          )}

        </div>

        {/* ========================================= */}
        {/* QUICK ACTIONS */}
        {/* ========================================= */}

        <div className="mb-8">

          <div
            className="
              mb-4

              flex items-center
              gap-2
            "
          >

            <BrainCircuit
              size={18}

              className="
                text-[var(--color-secondary)]
              "
            />

            <h2
              className="
                text-lg
                font-bold

                text-white
              "
            >
              Quick Actions
            </h2>

          </div>

          <div
            className="
              grid gap-4

              md:grid-cols-2
            "
          >

            {/* NEW COURSE */}

            <button
              className="
                flex items-center
                justify-center
                gap-2

                rounded-xl

                bg-[var(--color-primary)]

                px-5 py-4

                text-sm
                font-semibold

                text-white

                transition-all
                duration-300

                hover:shadow-lg
                hover:brightness-110

                active:scale-[0.98]
              "
            >

              <Plus size={18} />

              New Course

            </button>

            {/* NEW INTERN */}

            <button
              className="
                flex items-center
                justify-center
                gap-2

                rounded-xl

                bg-[var(--color-primary)]

                px-5 py-4

                text-sm
                font-semibold

                text-white

                transition-all
                duration-300

                hover:shadow-lg
                hover:brightness-110

                active:scale-[0.98]
              "
            >

              <Plus size={18} />

              New Intern

            </button>

            {/* APPROVAL */}

            <button
              className="
                flex items-center
                justify-center
                gap-2

                rounded-xl

                border border-[var(--color-secondary)]

                bg-transparent

                px-5 py-4

                text-sm
                font-semibold

                text-[var(--color-secondary)]

                transition-all
                duration-300

                hover:bg-[var(--color-secondary)]/10

                active:scale-[0.98]
              "
            >

              <CheckCircle2 size={18} />

              Approve Pending

            </button>

            {/* REPORTS */}

            <button
              onClick={generateReport}

              className="
                flex items-center
                justify-center
                gap-2

                rounded-xl

                border border-[var(--color-secondary)]

                bg-transparent

                px-5 py-4

                text-sm
                font-semibold

                text-[var(--color-secondary)]

                transition-all
                duration-300

                hover:bg-[var(--color-secondary)]/10

                active:scale-[0.98]
              "
            >

              <FileText size={18} />

              View Reports

            </button>

          </div>

        </div>

        {/* ========================================= */}
        {/* EXTRA STATS */}
        {/* ========================================= */}

        <div
          className="
            mb-8

            grid gap-4

            md:grid-cols-3
          "
        >

          {/* CERTIFICATIONS */}

          <div
            className={`
              ${glassCard}

              p-5
            `}
          >

            <div
              className="
                flex items-center
                gap-4
              "
            >

              <div
                className="
                  flex h-11 w-11
                  items-center
                  justify-center

                  rounded-xl

                  bg-yellow-500/10
                "
              >

                <Trophy
                  size={18}

                  className="
                    text-yellow-400
                  "
                />

              </div>

              <div>

                <p
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  Certifications
                </p>

                <h3
                  className="
                    text-2xl
                    font-bold

                    text-white
                  "
                >
                  2,450
                </h3>

              </div>

            </div>

          </div>

          {/* AI GROWTH */}

          <div
            className={`
              ${glassCard}

              p-5
            `}
          >

            <div
              className="
                flex items-center
                gap-4
              "
            >

              <div
                className="
                  flex h-11 w-11
                  items-center
                  justify-center

                  rounded-xl

                  bg-pink-500/10
                "
              >

                <BrainCircuit
                  size={18}

                  className="
                    text-pink-400
                  "
                />

              </div>

              <div>

                <p
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  AI Skill Growth
                </p>

                <h3
                  className="
                    text-2xl
                    font-bold

                    text-white
                  "
                >
                  94%
                </h3>

              </div>

            </div>

          </div>

          {/* SESSION */}

          <div
            className={`
              ${glassCard}

              p-5
            `}
          >

            <div
              className="
                flex items-center
                gap-4
              "
            >

              <div
                className="
                  flex h-11 w-11
                  items-center
                  justify-center

                  rounded-xl

                  bg-cyan-500/10
                "
              >

                <Clock3
                  size={18}

                  className="
                    text-cyan-400
                  "
                />

              </div>

              <div>

                <p
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  Avg Session
                </p>

                <h3
                  className="
                    text-2xl
                    font-bold

                    text-white
                  "
                >
                  4.8 hrs
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* ========================================= */}
        {/* RECENT ACTIVITY */}
        {/* ========================================= */}

        <div
          className={`
            ${glassCard}

            p-6
          `}
        >

          <div
            className="
              mb-5

              flex items-center
              gap-2
            "
          >

            <Sparkles
              size={18}

              className="
                text-[var(--color-secondary)]
              "
            />

            <h2
              className="
                text-lg
                font-bold

                text-white
              "
            >
              Recent Activity
            </h2>

          </div>

          <div className="space-y-3">

            {activities.map(
              (item, index) => (

                <motion.div
                  key={index}

                  initial={{
                    opacity: 0,
                    x: 15,
                  }}

                  animate={{
                    opacity: 1,
                    x: 0,
                  }}

                  transition={{
                    delay:
                      index * 0.05,
                  }}

                  className="
                    flex items-start
                    gap-3

                    rounded-xl

                    border border-[var(--color-border)]

                    bg-[var(--color-card)]

                    p-4
                  "
                >

                  <div
                    className="
                      mt-2

                      h-2.5
                      w-2.5

                      rounded-full

                      bg-[var(--color-secondary)]
                    "
                  />

                  <p
                    className="
                      text-sm
                      leading-6

                      text-slate-300
                    "
                  >
                    {item}
                  </p>

                </motion.div>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;