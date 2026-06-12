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
  AlertCircle,
  CheckCircle,
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
import MetricCard from "../components/dashboard/MetricCard";
import QuickActionButtons from "../components/dashboard/QuickActionButtons";

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

  // KPI Metrics for dashboard
  const kpiMetrics = [
    {
      id: "total-users",
      title: "Total Active Users",
      value: "1,245",
      status: "success",
      trend: "+12%",
      icon: Users,
      onClick: () => navigate("/admin/students"),
    },
    {
      id: "total-courses",
      title: "Total Courses",
      value: "36",
      status: "secondary",
      trend: "+5%",
      icon: BookOpen,
      onClick: () => navigate("/admin/courses"),
    },
    {
      id: "enrollments-week",
      title: "Enrollments This Week",
      value: "142",
      status: "primary",
      trend: "+8%",
      icon: TrendingUp,
      onClick: () => navigate("/admin/courses"),
    },
    {
      id: "completion-rate",
      title: "Course Completion Rate %",
      value: "68%",
      status: "success",
      trend: "↑ 4%",
      icon: CheckCircle,
      onClick: () => navigate("/admin/courses"),
    },
    {
      id: "pending-approvals",
      title: "Pending Approvals",
      value: "12",
      status: "error",
      trend: "⚠️ Action needed",
      icon: AlertCircle,
      onClick: () => navigate("/admin/students"),
    },
    {
      id: "system-health",
      title: "System Health",
      value: "98%",
      status: "success",
      trend: "✓ All good",
      icon: CheckCircle,
      onClick: () => navigate("/admin/dashboard"),
    },
  ];

  const handleQuickAction = (action) => {
    switch (action) {
      case "create-course":
        navigate("/admin/courses");
        break;
      case "create-intern":
        navigate("/admin/mentors");
        break;
      case "approve-pending":
        navigate("/admin/students");
        break;
      case "view-reports":
        navigate("/admin/dashboard");
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
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

      {/* ============================================================================ */}
      {/* SECTION 3.2: DASHBOARD METRIC CARDS (6 KPI Cards) */}
      {/* ============================================================================ */}

      <section>
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-slate-100">Key Metrics at a Glance</h3>
          <p className="text-slate-400 text-sm mt-1">
            Real-time KPI dashboard showing critical system metrics
          </p>
        </div>

        {/* 6 KPI Cards in 2x3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiMetrics.map((metric) => (
            <MetricCard
              key={metric.id}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              status={metric.status}
              trend={metric.trend}
              onClick={metric.onClick}
            />
          ))}
        </div>
      </section>

      {/* ============================================================================ */}
      {/* SECTION 3.3: QUICK ACTION BUTTONS */}
      {/* ============================================================================ */}

      <section className="space-y-3">
        <div className="mb-2">
          <h3 className="text-2xl font-bold text-slate-100">Quick Actions</h3>
          <p className="text-slate-400 text-sm mt-1">
            Fast access to your most frequently used admin tasks
          </p>
        </div>

        <QuickActionButtons onActionClick={handleQuickAction} />
      </section>

      {/* ============================================================================ */}
      {/* Legacy sections (kept for reference) */}
      {/* ============================================================================ */}

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
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <div>
            <h3 className="text-2xl font-black">Learner Status</h3>

            <div className="mt-6 h-64 min-h-[256px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      background: "#020617",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "16px",
                      color: "#fff",
                    }}
                  />

                  <Pie
                    data={learnerStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#f59e0b" />
                    <Cell fill="#6366f1" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
        <h3 className="text-2xl font-black">Course Performance</h3>

        <p className="mt-1 text-sm text-slate-400">
          Enrollment and completion rate by course.
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

              <Bar dataKey="enrollments" stackId="a" fill="#22d3ee" />
              <Bar dataKey="completion" stackId="a" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid gap-4 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 md:gap-6">
        <h3 className="text-2xl font-black">Summary</h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {summaryItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-left transition hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-cyan-400/5 md:p-6"
              >
                <Icon className="text-cyan-300" size={28} />

                <div>
                  <p className="text-2xl font-black md:text-3xl">{item.value}</p>

                  <p className="text-sm text-slate-400">{item.label}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black">Recent Activities</h3>

          <button
            onClick={() => navigate("/admin/students")}
            className="text-sm font-bold text-cyan-300 transition hover:text-cyan-200"
          >
            View All
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {activities.map((activity, idx) => {
            const colors = {
              Course: "border-l-4 border-l-cyan-400 bg-cyan-400/10",
              Certificate: "border-l-4 border-l-emerald-400 bg-emerald-400/10",
              Student: "border-l-4 border-l-purple-400 bg-purple-400/10",
              Event: "border-l-4 border-l-orange-400 bg-orange-400/10",
            };

            return (
              <button
                key={idx}
                onClick={() => navigate(activity.path)}
                className={`w-full rounded-xl p-4 text-left transition hover:scale-102 ${
                  colors[activity.type]
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">{activity.title}</p>

                    <p className="mt-1 text-sm text-slate-400">
                      {activity.desc}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-xs text-slate-500">
                    {activity.time}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
