import { useState } from "react";
import MetricCard from "../../components/dashboard/MetricCard";
import QuickActionButtonsEnhanced from "../../components/dashboard/QuickActionButtonsEnhanced";
import { useNavigate } from "react-router-dom";
import {
  Users,
  BookOpen,
  UserCheck,
  CheckCircle,
  TrendingUp,
  Activity,
} from "lucide-react";
import { colors } from "../../styles/designTokens";

/**
 * AdminDashboardPageEnhanced
 * Premium admin dashboard featuring:
 * - 6 KPI metric cards with status indicators
 * - Enhanced quick action buttons below metrics
 * - Full navigation integration
 * - Responsive grid layouts
 * - Color-coded status indicators
 */

export default function AdminDashboardPageEnhanced() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([
    {
      id: 1,
      title: "Active Users",
      value: "1,245",
      status: "success",
      trend: "+12%",
      icon: Users,
    },
    {
      id: 2,
      title: "Total Courses",
      value: "36",
      status: "primary",
      trend: "+3",
      icon: BookOpen,
    },
    {
      id: 3,
      title: "Enrollments",
      value: "2,847",
      status: "info",
      trend: "+8%",
      icon: UserCheck,
    },
    {
      id: 4,
      title: "Approvals Pending",
      value: "12",
      status: "warning",
      trend: "urgent",
      icon: CheckCircle,
    },
    {
      id: 5,
      title: "Completion Rate",
      value: "68%",
      status: "success",
      trend: "+5%",
      icon: TrendingUp,
    },
    {
      id: 6,
      title: "System Health",
      value: "98%",
      status: "success",
      trend: "optimal",
      icon: Activity,
    },
  ]);

  const handleQuickAction = (action) => {
    console.log("Quick action clicked:", action);
    switch (action) {
      case "create-course":
        navigate("/admin/courses/new");
        break;
      case "create-intern":
        navigate("/admin/mentors/new");
        break;
      case "approve-pending":
        navigate("/admin/approvals");
        break;
      case "view-reports":
        navigate("/admin/reports");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome back! Here's your system overview for today.
          </p>
        </div>

        {/* ===== SECTION 3.2: METRIC CARDS ===== */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Key Metrics</h2>
            <p className="text-gray-600 text-sm mt-1">6 critical KPIs for system health</p>
          </div>

          {/* Responsive 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                status={metric.status}
                icon={metric.icon}
                trend={metric.trend}
                onClick={() => console.log(`Clicked: ${metric.title}`)}
              />
            ))}
          </div>
        </div>

        {/* ===== SECTION 3.3: QUICK ACTION BUTTONS (ENHANCED) ===== */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <QuickActionButtonsEnhanced onActionClick={handleQuickAction} />
        </div>

        {/* Additional Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              This Month
            </div>
            <div className="mt-3">
              <div className="text-3xl font-bold text-gray-900">342</div>
              <div className="text-sm text-gray-600 mt-1">New enrollments</div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-6 shadow-sm border-2"
            style={{ borderColor: colors.primary.main }}
          >
            <div
              className="text-sm font-semibold uppercase tracking-wide"
              style={{ color: colors.primary.main }}
            >
              Revenue
            </div>
            <div className="mt-3">
              <div className="text-3xl font-bold text-gray-900">₹2,34,500</div>
              <div className="text-sm text-gray-600 mt-1">+8% vs last month</div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-6 shadow-sm border-2"
            style={{ borderColor: colors.secondary.main }}
          >
            <div
              className="text-sm font-semibold uppercase tracking-wide"
              style={{ color: colors.secondary.main }}
            >
              Engagement
            </div>
            <div className="mt-3">
              <div className="text-3xl font-bold text-gray-900">94%</div>
              <div className="text-sm text-gray-600 mt-1">Course completion</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Users Online
            </div>
            <div className="mt-3">
              <div className="text-3xl font-bold text-gray-900">567</div>
              <div className="text-sm text-gray-600 mt-1">Right now</div>
            </div>
          </div>
        </div>

        {/* Implementation Guide */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            💡 Enhanced Dashboard Features
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✅ Metric Cards (3.2)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 6 KPI cards with color-coded status</li>
                <li>• Left border accent (3px)</li>
                <li>• Trend indicators (+12%, optimal, etc)</li>
                <li>• Hover animations & responsive grid</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🚀 Quick Actions (3.3)</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 4 prominent action buttons</li>
                <li>• Large 50-60px height with full width</li>
                <li>• Icon + label + description</li>
                <li>• Gradient hover effects & glow</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-12 bg-gray-900 text-gray-100 rounded-xl p-6 overflow-x-auto border border-gray-700">
          <p className="text-sm font-semibold text-orange-400 mb-3">Import & Use Enhanced Buttons:</p>
          <pre className="text-xs">
{`import QuickActionButtonsEnhanced from '@/components/dashboard/QuickActionButtonsEnhanced';
import { useNavigate } from 'react-router-dom';

export default function MyDashboard() {
  const navigate = useNavigate();

  const handleQuickAction = (action) => {
    if (action === 'create-course') {
      navigate('/admin/courses/new');
    }
  };

  return (
    <>
      {/* Your metric cards here */}
      
      {/* Enhanced quick action buttons */}
      <QuickActionButtonsEnhanced onActionClick={handleQuickAction} />
    </>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
