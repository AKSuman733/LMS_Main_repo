import { useNavigate } from "react-router-dom";
import MetricCard from "../../components/MetricCard";
import QuickActions from "../../components/QuickActions";
import AdminLayout from "../../components/AdminLayout";
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
    <AdminLayout title="Dashboard" subtitle="Welcome to your admin workspace.">
      <div className="space-y-10">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map((m, idx) => (
            <MetricCard key={idx} label={m.label} value={m.value} accent={m.accent} />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <QuickActions
            onNewCourse={() => navigate('/admin/add-course')}
            onNewIntern={() => navigate('/admin/new-intern')}
            onApprove={() => navigate('/admin/approvals')}
            onReports={() => navigate('/admin/reports')}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

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

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 transition hover:-translate-y-0.5 hover:bg-white/10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Recent Activity</h2>
              <p className="text-gray-400 mt-2">Monitor key admin updates and user actions at a glance.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-3xl bg-slate-900/80 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300">
              View all activity
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'New Course Added',
                description: 'MERN Stack Mastery course published',
                time: '2 hours ago',
              },
              {
                title: 'New Student Enrolled',
                description: '12 students joined DSA course',
                time: '5 hours ago',
              },
              {
                title: 'Revenue Updated',
                description: '₹24,000 earned today',
                time: 'Today',
              },
            ].map((item) => (
              <div key={item.title} className="group rounded-3xl border border-white/10 bg-slate-950/50 p-6 transition hover:border-orange-500/40 hover:bg-white/10">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-400 mt-1">{item.description}</p>
                  </div>
                  <span className="text-sm text-gray-500">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;