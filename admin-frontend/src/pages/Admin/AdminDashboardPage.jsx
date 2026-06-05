import { useNavigate } from "react-router-dom";
import {
  Award,
  BookOpen,
  CalendarDays,
  Crown,
  FileBadge,
  GraduationCap,
  IndianRupee,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const stats = [
  {
    title: "Total Students",
    value: "1,245",
    change: "+12%",
    sub: "152 new this month",
    icon: Users,
    color: "from-cyan-400 to-blue-500",
    path: "/admin/students",
  },
  {
    title: "Active Courses",
    value: "36",
    change: "+5%",
    sub: "8 courses updated",
    icon: BookOpen,
    color: "from-purple-400 to-pink-500",
    path: "/admin/courses",
  },
  {
    title: "Total Revenue",
    value: "₹82,500",
    change: "+18%",
    sub: "₹12,400 this week",
    icon: IndianRupee,
    color: "from-orange-400 to-red-500",
    path: "/admin/courses",
  },
  {
    title: "Certificates Issued",
    value: "420",
    change: "+9%",
    sub: "38 issued this month",
    icon: FileBadge,
    color: "from-emerald-400 to-teal-500",
    path: "/admin/certificates",
  },
];

const monthlyRevenue = [
  { month: "Jan", revenue: 12000, students: 80 },
  { month: "Feb", revenue: 18000, students: 130 },
  { month: "Mar", revenue: 24000, students: 170 },
  { month: "Apr", revenue: 33000, students: 220 },
  { month: "May", revenue: 82500, students: 310 },
  { month: "Jun", revenue: 74000, students: 280 },
];

const coursePerformance = [
  { course: "Java", enrollments: 260, completion: 68 },
  { course: "Python", enrollments: 340, completion: 82 },
  { course: "AI/ML", enrollments: 210, completion: 45 },
  { course: "React", enrollments: 180, completion: 54 },
  { course: "DSA", enrollments: 150, completion: 38 },
];

const learnerStatus = [
  { name: "Active", value: 980 },
  { name: "Pending", value: 165 },
  { name: "Completed", value: 420 },
];

const activities = [
  {
    title: "New course added",
    desc: "React JS Mastery added by admin",
    time: "10 min ago",
    type: "Course",
    path: "/admin/courses",
  },
  {
    title: "Certificate issued",
    desc: "Python Basics certificate generated",
    time: "22 min ago",
    type: "Certificate",
    path: "/admin/certificates",
  },
  {
    title: "New student joined",
    desc: "Charv Raj registered for Java Full Course",
    time: "1 hour ago",
    type: "Student",
    path: "/admin/students",
  },
  {
    title: "Event registration",
    desc: "AI Career Webinar received 24 registrations",
    time: "2 hours ago",
    type: "Event",
    path: "/admin/event-registrations",
  },
];

const quickActions = [
  {
    title: "Add Course",
    desc: "Create course, video, price and mentor.",
    icon: BookOpen,
    path: "/admin/courses",
  },
  {
    title: "Create Event",
    desc: "Create webinar, workshop or competition.",
    icon: CalendarDays,
    path: "/admin/events",
  },
  {
    title: "Issue Certificate",
    desc: "Generate certificate for student/event.",
    icon: FileBadge,
    path: "/admin/certificates",
  },
  {
    title: "Manage Mentors",
    desc: "Add or update mentor details.",
    icon: GraduationCap,
    path: "/admin/mentors",
  },
];

const summaryItems = [
  {
    label: "Events",
    value: "12",
    icon: CalendarDays,
    path: "/admin/events",
  },
  {
    label: "Mentors",
    value: "18",
    icon: GraduationCap,
    path: "/admin/mentors",
  },
  {
    label: "Awards",
    value: "24",
    icon: Award,
    path: "/admin/certificates",
  },
  {
    label: "Referrals",
    value: "80",
    icon: Share2,
    path: "/admin/students",
  },
  {
    label: "Subscriptions",
    value: "156",
    icon: Crown,
    path: "/admin/courses",
  },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 p-8 shadow-2xl shadow-cyan-500/10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="font-bold text-cyan-300">Admin Overview</p>

            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Control UptoSkills LMS
            </h2>

            <p className="mt-4 max-w-2xl text-slate-300">
              Manage courses, students, events, certificates, mentors,
              referrals, subscriptions and reports from one advanced admin
              dashboard.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/students")}
            className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 text-center transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-emerald-400/10"
          >
            <TrendingUp className="mx-auto text-emerald-300" size={42} />

            <h3 className="mt-3 text-3xl font-black">92%</h3>

            <p className="text-sm text-slate-400">Platform Growth</p>
          </button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <button
              key={stat.title}
              onClick={() => navigate(stat.path)}
              className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 text-left backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-cyan-400/5"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color}`}
                >
                  <Icon size={28} />
                </div>

                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-bold text-emerald-300">
                  {stat.change}
                </span>
              </div>

              <h3 className="mt-5 text-3xl font-black">{stat.value}</h3>

              <p className="mt-1 text-sm text-slate-400">{stat.title}</p>

              <p className="mt-3 text-xs text-slate-500">{stat.sub}</p>
            </button>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black">
                Revenue & Student Growth
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Monthly revenue and enrollment trend.
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/courses")}
              className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
            >
              2026 Analytics
            </button>
          </div>

          <div className="mt-6 h-80 min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />

                <Tooltip
                  contentStyle={{
                    background: "#020617",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22d3ee"
                  fill="url(#revenueGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <h3 className="text-2xl font-black">Learner Status</h3>

          <p className="mt-1 text-sm text-slate-400">
            Current student distribution.
          </p>

          <div className="mt-6 h-80 min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={learnerStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={105}
                  label
                >
                  {learnerStatus.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={["#22d3ee", "#fb923c", "#34d399"][index]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#020617",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <h3 className="text-2xl font-black">Quick Actions</h3>

          <p className="mt-1 text-sm text-slate-400">
            Open important admin modules quickly.
          </p>

          <div className="mt-6 grid gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.title}
                  onClick={() => navigate(action.path)}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-left transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                      <Icon size={28} />
                    </div>

                    <div>
                      <h4 className="text-lg font-black">{action.title}</h4>

                      <p className="mt-1 text-sm text-slate-400">
                        {action.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <h3 className="text-2xl font-black">Course Performance</h3>

          <p className="mt-1 text-sm text-slate-400">
            Enrollment and completion comparison.
          </p>

          <div className="mt-6 h-80 min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="course" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />

                <Tooltip
                  contentStyle={{
                    background: "#020617",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                />

                <Bar
                  dataKey="enrollments"
                  fill="#22d3ee"
                  radius={[10, 10, 0, 0]}
                />

                <Bar
                  dataKey="completion"
                  fill="#a78bfa"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <h3 className="text-2xl font-black">Recent Activity</h3>

          <div className="mt-6 space-y-4">
            {activities.map((activity, index) => (
              <button
                key={activity.title}
                onClick={() => navigate(activity.path)}
                className="flex w-full gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 font-black text-slate-950">
                  {index + 1}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-black">{activity.title}</h4>

                    <span className="rounded-full bg-purple-400/10 px-3 py-1 text-xs font-bold text-purple-300">
                      {activity.type}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-400">
                    {activity.desc}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {activity.time}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <h3 className="text-2xl font-black">Management Summary</h3>

          <div className="mt-6 grid gap-4">
            {summaryItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                      <Icon size={22} />
                    </div>

                    <span className="font-bold text-slate-300">
                      {item.label}
                    </span>
                  </div>

                  <span className="text-2xl font-black">{item.value}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}