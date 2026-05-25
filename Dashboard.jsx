import React, { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Activity,
  Leaf,
  Zap,
  Database,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  FileText,
  BarChart3,
  Plus,
} from 'lucide-react';
import AdminActionForm from './AdminActionForm';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard({ analytics, history }) {
  const [activeAction, setActiveAction] = useState(null);

  const metrics = useMemo(() => {
    const accuracy = analytics?.ml_metrics?.accuracy ?? 0.85;
    const healthOk = accuracy >= 0.88;

    return [
      {
        title: 'Total Active Users',
        value: analytics?.active_users ?? 1424,
        accent: 'border-primary bg-primary/10 text-primary',
        icon: <Database size={20} className="text-primary" />,
      },
      {
        title: 'Total Courses',
        value: analytics?.total_courses ?? 86,
        accent: 'border-secondary bg-secondary/10 text-secondary',
        icon: <BarChart3 size={20} className="text-secondary" />,
      },
      {
        title: 'Enrollments This Week',
        value: analytics?.weekly_enrollments ?? 312,
        accent: 'border-primary bg-primary/10 text-primary',
        icon: <Plus size={20} className="text-primary" />,
      },
      {
        title: 'Course Completion Rate',
        value: `${Math.round((analytics?.course_completion_rate ?? 0.82) * 100)}%`, 
        accent: 'border-success bg-success/10 text-success',
        icon: <CheckCircle2 size={20} className="text-success" />,
      },
      {
        title: 'Pending Approvals',
        value: analytics?.pending_approvals ?? 7,
        accent: 'border-error bg-error/10 text-error',
        icon: <AlertTriangle size={20} className="text-error" />,
      },
      {
        title: 'System Health',
        value: healthOk ? 'Healthy' : 'Attention',
        accent: healthOk ? 'border-success bg-success/10 text-success' : 'border-warning bg-warning/10 text-warning',
        icon: healthOk ? <ShieldCheck size={20} className="text-success" /> : <AlertTriangle size={20} className="text-warning" />,
      },
    ];
  }, [analytics]);

  if (!analytics) return <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div></div>;

  const categories = Object.keys(analytics.category_counts || {});
  const counts = Object.values(analytics.category_counts || {});

  const barData = {
    labels: categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)),
    datasets: [
      {
        label: 'Items Sorted',
        data: counts,
        backgroundColor: 'rgba(0, 181, 165, 0.85)',
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: categories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)),
    datasets: [
      {
        data: counts,
        backgroundColor: ['#00B5A5', '#FF6B35', '#F59E0B', '#16A34A', '#3B82F6', '#64748B'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900">Admin Dashboard</h2>
          <p className="text-sm text-slate-500 mt-1">Visual KPI cards, quick actions, and real-time validation for faster admin workflows.</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          Live analytics ready
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div key={metric.title} className={`rounded-3xl border-l-4 p-5 shadow-card ${metric.accent}`}>
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-medium text-slate-500">{metric.title}</div>
              <div className="rounded-2xl bg-white/90 p-2 shadow-sm">{metric.icon}</div>
            </div>
            <p className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setActiveAction('course')}
          className="h-12 rounded-3xl bg-primary text-white text-sm font-semibold shadow-sm transition duration-200 hover:shadow-xl active:scale-95"
        >
          + New Course
        </button>
        <button
          type="button"
          onClick={() => setActiveAction('intern')}
          className="h-12 rounded-3xl bg-primary text-white text-sm font-semibold shadow-sm transition duration-200 hover:shadow-xl active:scale-95"
        >
          + New Intern
        </button>
        <button
          type="button"
          onClick={() => setActiveAction('approvals')}
          className="h-12 rounded-3xl border border-secondary bg-white text-secondary text-sm font-semibold shadow-sm transition duration-200 hover:bg-secondary/10 active:scale-95"
        >
          Approve Pending
        </button>
        <button
          type="button"
          onClick={() => setActiveAction('reports')}
          className="h-12 rounded-3xl border border-secondary bg-white text-secondary text-sm font-semibold shadow-sm transition duration-200 hover:bg-secondary/10 active:scale-95"
        >
          View Reports
        </button>
      </div>

      {activeAction === 'course' || activeAction === 'intern' ? (
        <AdminActionForm action={activeAction} onClose={() => setActiveAction(null)} />
      ) : activeAction === 'approvals' ? (
        <div className="rounded-3xl border border-warning/20 bg-warning/10 p-6 text-sm text-warning shadow-card">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} />
            <div>
              <p className="font-semibold">Pending approvals ready for review</p>
              <p className="text-slate-600">Use the admin backend to approve new course or intern requests in one click.</p>
            </div>
          </div>
        </div>
      ) : activeAction === 'reports' ? (
        <div className="rounded-3xl border border-secondary/20 bg-secondary/10 p-6 text-sm text-slate-700 shadow-card">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-secondary" />
            <div>
              <p className="font-semibold">Report summary</p>
              <p className="text-slate-600">Generate usage and health reports from the admin console or export data for stakeholders.</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card h-[420px]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Waste Categories Breakdown</h3>
              <p className="text-sm text-slate-500">Activity by category over the latest dataset.</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
              <Leaf size={20} />
            </div>
          </div>
          <div className="h-[320px]"><Bar data={barData} options={chartOptions} /></div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card h-[420px]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Distribution</h3>
              <p className="text-sm text-slate-500">How the current dataset is distributed across categories.</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-600">
              <BarChart3 size={20} />
            </div>
          </div>
          <div className="h-[320px]"><Doughnut data={doughnutData} options={chartOptions} /></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
          <h3 className="text-xl font-semibold text-slate-900">Recent Predictions History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Confidence</th>
                <th className="px-6 py-4">Carbon Saved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history && history.length > 0 ? (
                history.slice(0, 10).map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 text-slate-600">{new Date(item.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4"><span className="font-medium text-slate-900 capitalize">{item.category}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full bg-success" style={{ width: `${item.confidence * 100}%` }} />
                        </div>
                        <span className="text-slate-600">{(item.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-success">+{item.environmental_impact.carbon_footprint_saved_kg} kg</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-slate-500">No prediction history available yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
