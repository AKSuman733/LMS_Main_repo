import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  GraduationCap,
  RefreshCcw,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import MetricCard from "../../components/dashboard/MetricCard";
import QuickActionButtons from "../../components/dashboard/QuickActionButtons";
import { ErrorState, LoadingTableSkeleton } from "../../components/ui/States";
import { showError } from "../../components/ui/Toasts";
import { getCourses } from "../../services/courseApi";
import { getCourseEnrollments } from "../../services/courseEnrollmentApi";
import { getStudents } from "../../services/studentApi";

const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value || 0);

const isThisWeek = (dateValue) => {
  if (!dateValue) return false;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return false;

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  return date >= weekStart && date <= now;
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    students: [],
    courses: [],
    enrollments: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchDashboardData = async ({ silent = false } = {}) => {
    try {
      if (!silent) setLoading(true);
      setError("");

      const [students, courses, enrollments] = await Promise.all([
        getStudents(),
        getCourses(),
        getCourseEnrollments().catch(() => []),
      ]);

      setDashboardData({
        students: students || [],
        courses: courses || [],
        enrollments: enrollments || [],
      });
      setLastUpdated(new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }));
    } catch (err) {
      const message = err.message || "Unable to load dashboard data.";
      setError(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = window.setInterval(
      () => fetchDashboardData({ silent: true }),
      15000
    );

    return () => window.clearInterval(interval);
  }, []);

  const metrics = useMemo(() => {
    const { students, courses, enrollments } = dashboardData;
    const activeUsers =
      students.filter((student) => student.status === "Active").length ||
      students.length;
    const activeCourses =
      courses.filter((course) => course.status === "Active").length ||
      courses.length;
    const enrollmentsThisWeek = enrollments.filter((item) =>
      isThisWeek(item.enrolledAt || item.createdAt)
    ).length;
    const completedEnrollments = enrollments.filter(
      (item) =>
        item.enrollmentStatus === "Completed" ||
        Number(item.progress || 0) >= 100
    ).length;
    const completionRate = enrollments.length
      ? Math.round((completedEnrollments / enrollments.length) * 100)
      : 0;
    const pendingApprovals =
      students.filter((student) => student.status === "Pending").length +
      enrollments.filter(
        (item) =>
          item.paymentStatus === "Pending" ||
          item.assignment?.status === "Submitted"
      ).length;
    const systemHealth = error ? 65 : pendingApprovals > 0 ? 92 : 100;

    return [
      {
        id: "total-users",
        title: "Total Active Users",
        value: formatNumber(activeUsers),
        status: "success",
        trend: "Live",
        icon: Users,
        onClick: () => navigate("/admin/students"),
      },
      {
        id: "total-courses",
        title: "Total Courses",
        value: formatNumber(activeCourses),
        status: "secondary",
        trend: `${courses.length} all`,
        icon: BookOpen,
        onClick: () => navigate("/admin/courses"),
      },
      {
        id: "enrollments-week",
        title: "Enrollments This Week",
        value: formatNumber(enrollmentsThisWeek),
        status: "primary",
        trend: `${formatNumber(enrollments.length)} total`,
        icon: TrendingUp,
        onClick: () => navigate("/admin/students"),
      },
      {
        id: "completion-rate",
        title: "Course Completion Rate %",
        value: `${completionRate}%`,
        status: "success",
        trend: "Checked",
        icon: CheckCircle,
        onClick: () => navigate("/admin/students"),
      },
      {
        id: "pending-approvals",
        title: "Pending Approvals",
        value: formatNumber(pendingApprovals),
        status: pendingApprovals ? "error" : "success",
        trend: pendingApprovals ? "Review" : "Clear",
        icon: AlertCircle,
        onClick: () => navigate("/admin/students"),
      },
      {
        id: "system-health",
        title: "System Health",
        value: `${systemHealth}%`,
        status: systemHealth >= 95 ? "success" : "warning",
        trend: systemHealth >= 95 ? "All good" : "Watch",
        icon: systemHealth >= 95 ? CheckCircle : AlertCircle,
      },
    ];
  }, [dashboardData, error, navigate]);

  const coursePerformance = useMemo(() => {
    const { courses, enrollments } = dashboardData;

    return courses.slice(0, 6).map((course) => {
      const courseEnrollments = enrollments.filter(
        (item) =>
          item.courseId === course._id ||
          item.courseId?._id === course._id ||
          item.courseTitle === course.title
      );
      const completed = courseEnrollments.filter(
        (item) => Number(item.progress || 0) >= 100
      ).length;

      return {
        course: course.title,
        enrollments: courseEnrollments.length,
        completion: courseEnrollments.length
          ? Math.round((completed / courseEnrollments.length) * 100)
          : 0,
      };
    });
  }, [dashboardData]);

  const handleQuickAction = (action) => {
    const routes = {
      "create-course": "/admin/courses",
      "create-intern": "/admin/mentors",
      "approve-pending": "/admin/students",
      "view-reports": "/admin/event-registrations",
    };

    navigate(routes[action] || "/admin");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingTableSkeleton rows={6} cols={6} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-500/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-300">Admin Overview</p>
            <h1 className="mt-2 text-4xl font-black">Admin Dashboard</h1>
            <p className="mt-2 text-slate-400">
              Backend-connected LMS metrics refresh automatically.
            </p>
            {lastUpdated && (
              <p className="mt-2 text-xs text-slate-500">
                Last updated {lastUpdated}
              </p>
            )}
          </div>

          <button
            onClick={() => fetchDashboardData()}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            <RefreshCcw size={18} />
            Refresh
          </button>
        </div>
      </section>

      {error && (
        <ErrorState
          title="Unable to Load Dashboard"
          message={error}
          onRetry={() => fetchDashboardData()}
        />
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-black">Quick Actions</h2>
        <QuickActionButtons onActionClick={handleQuickAction} />
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="text-cyan-300" />
          <div>
            <h2 className="text-2xl font-black">Course Performance</h2>
            <p className="text-sm text-slate-400">
              Enrollment count and completion rate by course.
            </p>
          </div>
        </div>

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
              <Bar dataKey="enrollments" fill="#00B5A5" radius={[8, 8, 0, 0]} />
              <Bar dataKey="completion" fill="#FF6B35" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
