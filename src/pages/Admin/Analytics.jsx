import {
  TrendingUp,
  Users,
  IndianRupee,
  Activity,
  ArrowUpRight,
  BarChart3,
  PieChart,
  BrainCircuit,
  Trophy,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { motion } from "framer-motion";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import allMentors from "../../data/allMentors";

const enrolledCourses =
  JSON.parse(
    localStorage.getItem("enrolledCourses")
  ) || [];

/* ===================================================== */
/* KPI STATS */
/* ===================================================== */

const analyticsStats = [
  {
    title: "Active Learners",

    value: `${enrolledCourses.length * 124 + 1200}`,

    growth: "+18.1%",

    icon: Users,

    border: "border-green-500",

    iconBg: "bg-green-500/10",

    iconColor: "text-green-400",

    lightBg: "bg-green-500/5",
  },

  {
    title: "Revenue",

    value: `₹${(
      enrolledCourses.length * 4999
    ).toLocaleString()}`,

    growth: "+22.4%",

    icon: IndianRupee,

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

    value: "84%",

    growth: "+9.2%",

    icon: CheckCircle2,

    border: "border-green-500",

    iconBg: "bg-green-500/10",

    iconColor: "text-green-400",

    lightBg: "bg-green-500/5",
  },

  {
    title: "AI Engagement",

    value: "92%",

    growth: "+12.6%",

    icon: BrainCircuit,

    border:
      "border-[var(--color-secondary)]",

    iconBg:
      "bg-[var(--color-secondary)]/10",

    iconColor:
      "text-[var(--color-secondary)]",

    lightBg:
      "bg-[var(--color-secondary)]/5",
  },
];

/* ===================================================== */
/* CHART DATA */
/* ===================================================== */

const chartData = [
  45,
  65,
  55,
  80,
  70,
  95,
  85,
];

const glass =
  `
    rounded-2xl

    border border-[var(--color-border)]

    bg-[var(--color-card)]

    backdrop-blur-xl
  `;

const sectionTitle =
  `
    text-xl
    font-bold
    text-white
  `;

/* ===================================================== */
/* PDF REPORT */
/* ===================================================== */

const generateReport = () => {

  const doc = new jsPDF();

  doc.setFontSize(22);

  doc.text(
    "UpToSkills Analytics Report",
    20,
    20
  );

  doc.setFontSize(11);

  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    20,
    30
  );

  autoTable(doc, {

    startY: 45,

    head: [["Metric", "Value"]],

    body: analyticsStats.map(
      (item) => [

        item.title,

        item.value,
      ]
    ),
  });

  doc.text(
    "Top Mentor Courses",
    20,
    doc.lastAutoTable.finalY + 20
  );

  autoTable(doc, {

    startY:
      doc.lastAutoTable.finalY + 30,

    head: [
      [
        "Mentor",
        "Course",
        "Category",
      ],
    ],

    body: enrolledCourses.map(
      (courseId) => {

        const course =
          allMentors.find(
            (m) =>
              m.id === courseId
          );

        return [

          course?.mentor,

          course?.course,

          course?.category,
        ];
      }
    ),
  });

  doc.save(
    "UpToSkills-Analytics.pdf"
  );
};

/* ===================================================== */
/* KPI CARD */
/* ===================================================== */

function StatCard({
  item,
  index,
}) {

  const Icon = item.icon;

  return (

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
        delay:
          index * 0.05,
      }}

      className={`
        ${glass}

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

        {/* LEFT */}

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
              mb-4

              text-2xl
              font-black

              text-white
            "
          >
            {item.value}
          </h2>

          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border border-green-500/20

              bg-green-500/10

              px-3 py-1.5

              text-xs
              font-medium

              text-green-400
            "
          >

            <TrendingUp size={14} />

            {item.growth}

          </div>

        </div>

        {/* ICON */}

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

/* ===================================================== */
/* ANALYTICS */
/* ===================================================== */

function Analytics() {

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

      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          -left-20
          top-0

          h-[280px]
          w-[280px]

          rounded-full

          bg-[var(--color-secondary)]/10

          blur-[60px]
        "
      />

      <div
        className="
          absolute
          -right-20
          bottom-0

          h-[280px]
          w-[280px]

          rounded-full

          bg-[var(--color-primary)]/10

          blur-[60px]
        "
      />

      {/* ===================================================== */}
      {/* MAIN */}
      {/* ===================================================== */}

      <div className="relative z-10">

        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

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

            {/* BADGE */}

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
                size={14}

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
                AI Platform Analytics
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
                Analytics
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

            {/* DESCRIPTION */}

            <p
              className="
                max-w-2xl

                text-sm
                leading-7

                text-slate-400
              "
            >

              Monitor learner engagement,
              revenue growth, course
              performance, and AI activity
              in real time.

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

            Export Report

            <ArrowUpRight size={16} />

          </button>

        </div>

        {/* ===================================================== */}
        {/* KPI CARDS */}
        {/* ===================================================== */}

        <div
          className="
            mb-8

            grid gap-4

            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          {analyticsStats.map(
            (item, index) => (

              <StatCard
                key={item.title}

                item={item}

                index={index}
              />
            )
          )}

        </div>

        {/* ===================================================== */}
        {/* CHARTS */}
        {/* ===================================================== */}

        <div
          className="
            mb-8

            grid gap-4

            xl:grid-cols-3
          "
        >

          {/* ===================================================== */}
          {/* BAR GRAPH */}
          {/* ===================================================== */}

          <div
            className={`
              ${glass}

              xl:col-span-2

              p-5
            `}
          >

            <div
              className="
                mb-6

                flex items-center
                justify-between
              "
            >

              <div>

                <h3
                  className={
                    sectionTitle
                  }
                >
                  Revenue Growth
                </h3>

                <p
                  className="
                    mt-1

                    text-xs

                    text-slate-400
                  "
                >
                  Monthly platform performance
                </p>

              </div>

              <BarChart3
                size={20}

                className="
                  text-[var(--color-secondary)]
                "
              />

            </div>

            {/* GRAPH */}

            <div
              className="
                flex h-[280px]
                items-end
                gap-3

                rounded-2xl

                border border-[var(--color-border)]

                bg-gradient-to-b

                from-[var(--color-secondary)]/5
                to-transparent

                p-5
              "
            >

              {chartData.map(
                (height, index) => (

                  <div
                    key={index}

                    className="
                      flex-1

                      rounded-t-xl

                      bg-gradient-to-t

                      from-[var(--color-primary)]
                      to-[var(--color-secondary)]

                      transition-all
                      duration-300

                      hover:scale-105
                    "

                    style={{
                      height:
                        `${height}%`,
                    }}
                  />
                )
              )}

            </div>

          </div>

          {/* ===================================================== */}
          {/* ENGAGEMENT */}
          {/* ===================================================== */}

          <div
            className={`
              ${glass}

              p-5
            `}
          >

            <div
              className="
                mb-6

                flex items-center
                justify-between
              "
            >

              <div>

                <h3
                  className={
                    sectionTitle
                  }
                >
                  Engagement
                </h3>

                <p
                  className="
                    mt-1

                    text-xs

                    text-slate-400
                  "
                >
                  AI interaction metrics
                </p>

              </div>

              <PieChart
                size={20}

                className="
                  text-pink-400
                "
              />

            </div>

            {/* CIRCLE */}

            <div
              className="
                flex h-[280px]
                items-center
                justify-center
              "
            >

              <div
                className="
                  relative

                  flex h-48 w-48
                  items-center
                  justify-center

                  rounded-full

                  border-[14px]

                  border-[var(--color-secondary)]

                  shadow-[var(--shadow-teal)]
                "
              >

                <div className="text-center">

                  <h2
                    className="
                      text-4xl
                      font-black

                      text-white
                    "
                  >
                    92%
                  </h2>

                  <p
                    className="
                      mt-2

                      text-xs

                      text-slate-400
                    "
                  >
                    Engagement Rate
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================== */}
        {/* TABLE */}
        {/* ===================================================== */}

        <div
          className={`
            ${glass}

            p-5
          `}
        >

          {/* HEADER */}

          <div
            className="
              mb-6

              flex items-center
              justify-between
            "
          >

            <div>

              <h3
                className={
                  sectionTitle
                }
              >
                Enrolled Mentor Courses
              </h3>

              <p
                className="
                  mt-1

                  text-xs

                  text-slate-400
                "
              >
                Most active celebrity mentor
                programs
              </p>

            </div>

            <Trophy
              size={20}

              className="
                text-yellow-400
              "
            />

          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr
                  className="
                    border-b border-[var(--color-border)]
                  "
                >

                  {[
                    "Mentor",
                    "Course",
                    "Category",
                  ].map((head) => (

                    <th
                      key={head}

                      className="
                        py-4

                        text-left

                        text-xs
                        font-medium

                        uppercase
                        tracking-wider

                        text-slate-400
                      "
                    >
                      {head}
                    </th>
                  ))}

                </tr>

              </thead>

              <tbody>

                {enrolledCourses.map(
                  (courseId) => {

                    const course =
                      allMentors.find(
                        (m) =>
                          m.id ===
                          courseId
                      );

                    if (!course)
                      return null;

                    return (

                      <tr
                        key={course.id}

                        className="
                          border-b border-white/5

                          transition-all
                          duration-300

                          hover:bg-[var(--color-card)]
                        "
                      >

                        <td
                          className="
                            py-5

                            text-sm
                            font-medium

                            text-white
                          "
                        >
                          {course.mentor}
                        </td>

                        <td
                          className="
                            py-5

                            text-sm

                            text-slate-300
                          "
                        >
                          {course.course}
                        </td>

                        <td
                          className="
                            py-5

                            text-sm

                            text-[var(--color-secondary)]
                          "
                        >
                          {course.category}
                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;