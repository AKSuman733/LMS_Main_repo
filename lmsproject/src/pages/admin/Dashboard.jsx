import { Link, useNavigate } from "react-router-dom";
import MetricCard from "../../components/MetricCard";
import QuickActions from "../../components/QuickActions";
import { tokens } from '../../designTokens';

function Dashboard() {
  const navigate = useNavigate();
  const metrics = [
    { label: 'Total Active Users', value: '4.2K', accent: tokens.colors.success },
    { label: 'Total Courses', value: '12', accent: tokens.colors.secondary },
    { label: 'Enrollments This Week', value: '348', accent: tokens.colors.primary },
    { label: 'Course Completion Rate', value: '82%', accent: tokens.colors.success },
    { label: 'Pending Approvals', value: '6', accent: tokens.colors.error },
    { label: 'System Health', value: 'Good', accent: tokens.colors.success }
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex">

      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 p-6">

        {/* Logo */}
        <h1 className="text-3xl font-black mb-10">
          LMS<span className="text-orange-400">Project</span>
        </h1>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-4">

  <Link
    to="/admin"
    className="bg-orange-600 px-5 py-4 rounded-2xl text-left font-semibold"
  >
    Dashboard
  </Link>

  <Link
    to="/admin/courses"
    className="hover:bg-white/5 px-5 py-4 rounded-2xl text-left transition"
  >
    Courses
  </Link>

  <Link
    to="/admin/users"
    className="hover:bg-white/5 px-5 py-4 rounded-2xl text-left transition"
  >
    Users
  </Link>

  <Link
    to="/admin/enrollments"
    className="hover:bg-white/5 px-5 py-4 rounded-2xl text-left transition"
  >
    Enrollments
  </Link>

  <Link
    to="/admin/add-course"
    className="hover:bg-white/5 px-5 py-4 rounded-2xl text-left transition"
  >
    Add Course
  </Link>

  <Link
    to="/admin/new-intern"
    className="hover:bg-white/5 px-5 py-4 rounded-2xl text-left transition"
  >
    Add Intern
  </Link>

  <Link
    to="/admin/approvals"
    className="hover:bg-white/5 px-5 py-4 rounded-2xl text-left transition"
  >
    Approvals
  </Link>

  <Link
    to="/admin/reports"
    className="hover:bg-white/5 px-5 py-4 rounded-2xl text-left transition"
  >
    Reports
  </Link>

  <Link
    to="/"
    className="hover:bg-white/5 px-5 py-4 rounded-2xl text-left transition"
  >
    Website
  </Link>

</div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">

          <div>
            <p className="text-orange-400 font-semibold mb-2">
              Admin Dashboard
            </p>

            <h1 className="text-5xl font-black">
              Welcome Back 👋
            </h1>
          </div>


        </div>

        {/* Metrics + Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {metrics.map((m, idx) => (
            <MetricCard key={idx} label={m.label} value={m.value} accent={m.accent} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <QuickActions
            onNewCourse={() => navigate('/admin/add-course')}
            onNewIntern={() => navigate('/admin/new-intern')}
            onApprove={() => navigate('/admin/approvals')}
            onReports={() => navigate('/admin/reports')}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Total Courses */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <p className="text-gray-400 mb-3">
              Total Courses
            </p>

            <h2 className="text-4xl font-black">
              12
            </h2>
          </div>

          {/* Students */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <p className="text-gray-400 mb-3">
              Students
            </p>

            <h2 className="text-4xl font-black">
              4.2K
            </h2>
          </div>

          {/* Revenue */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <p className="text-gray-400 mb-3">
              Revenue
            </p>

            <h2 className="text-4xl font-black">
              ₹1.2L
            </h2>
          </div>

          {/* Active Users */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <p className="text-gray-400 mb-3">
              Active Users
            </p>

            <h2 className="text-4xl font-black">
              892
            </h2>
          </div>

        </div>

        {/* Recent Activity */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8">
            Recent Activity
          </h2>

          <div className="space-y-6">

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-semibold">
                  New Course Added
                </h3>

                <p className="text-gray-400 text-sm">
                  MERN Stack Mastery course published
                </p>
              </div>

              <span className="text-gray-500 text-sm">
                2 hours ago
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-semibold">
                  New Student Enrolled
                </h3>

                <p className="text-gray-400 text-sm">
                  12 students joined DSA course
                </p>
              </div>

              <span className="text-gray-500 text-sm">
                5 hours ago
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">
                  Revenue Updated
                </h3>

                <p className="text-gray-400 text-sm">
                  ₹24,000 earned today
                </p>
              </div>

              <span className="text-gray-500 text-sm">
                Today
              </span>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;