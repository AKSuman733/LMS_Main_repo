import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  BarChart2, 
  Activity, 
  GraduationCap, 
  Star, 
  Layers, 
  Clock, 
  ChevronRight, 
  FileText,
  AlertCircle
} from "lucide-react";
import "../../styles/AdminReports.css";

const AdminReports = () => {
    const [reportsData, setReportsData] = useState({
        enrollmentsCount: 0,
        enrollmentGrowth: 0,
        studentsCount: 0,
        studentGrowth: 0,
        completionRate: 0,
        weeklyTrends: [],
        monthlyTrends: [],
        topCourses: [],
        recentActivity: [],
        topicDistribution: []
    });
    const [trendType, setTrendType] = useState('monthly');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/admin/reports");
            setReportsData(res.data);
            setError("");
        } catch (err) {
            console.error("Error loading analytics reports:", err);
            setError("Failed to synchronize reporting aggregates with database.");
        } finally {
            setLoading(false);
        }
    };

    const currentData = trendType === 'monthly' 
        ? (reportsData.monthlyTrends || []) 
        : (reportsData.weeklyTrends || []);

    const maxVal = Math.max(...currentData.map(d => d.value), 5);
    const coordinates = currentData.map((d, i) => {
        const x = (i * 1000) / (currentData.length - 1 || 1);
        const height = 220;
        const y = 260 - (d.value / maxVal) * height;
        return { x, y, label: d.label, value: d.value };
    });

    const pathD = coordinates.length > 0 
        ? `M ${coordinates.map(c => `${c.x} ${c.y}`).join(' L ')}` 
        : '';

    const areaD = coordinates.length > 0 
        ? `M 0 300 L ${coordinates.map(c => `${c.x} ${c.y}`).join(' L ')} L 1000 300 Z` 
        : '';

    const handleExportCSV = () => {
        const now = new Date();
        const csvContent = [];
        
        csvContent.push("==================================================");
        csvContent.push("UPTOSKILLS ACADEMIC MANAGEMENT PERFORMANCE REPORT");
        csvContent.push(`Generated Chronology: ${now.toLocaleString()}`);
        csvContent.push("Platform Status: Live Operational");
        csvContent.push("==================================================");
        csvContent.push("");

        csvContent.push("1. CORE REACH PERFORMANCE METRICS");
        csvContent.push("Metric Name,Cumulative Total,Weekly Acquisition Rate");
        csvContent.push(`Global Course Reach,${reportsData.enrollmentsCount} enrollments,${reportsData.enrollmentGrowth >= 0 ? "+" : ""}${reportsData.enrollmentGrowth}%`);
        csvContent.push(`Total Platform Students,${reportsData.studentsCount} active,${reportsData.studentGrowth >= 0 ? "+" : ""}${reportsData.studentGrowth}%`);
        csvContent.push(`Overall Completion rate,${reportsData.completionRate}%,N/A`);
        csvContent.push("");

        csvContent.push("2. ENROLLMENT TREND TIME VECTORS");
        csvContent.push("Frequency Category,Interval Label,Enrollment Counts");
        (reportsData.weeklyTrends || []).forEach(item => {
            csvContent.push(`Weekly Trend,${item.label},${item.value}`);
        });
        (reportsData.monthlyTrends || []).forEach(item => {
            csvContent.push(`Monthly Trend,${item.label},${item.value}`);
        });
        csvContent.push("");

        csvContent.push("3. CURRICULUM MARKET DEMAND PROFILE");
        csvContent.push("Course Title,Active Enrollments Count");
        (reportsData.topCourses || []).forEach(course => {
            csvContent.push(`"${course.title.replace(/"/g, '""')}",${course.enrollment_count}`);
        });
        csvContent.push("");

        csvContent.push("4. TIMELINE AUDIT FEED");
        csvContent.push("Student Name,Enrolled Course Name,Module Progress,Completion Status,Enrollment Time");
        (reportsData.recentActivity || []).forEach(activity => {
            const completedStr = activity.completed ? "Completed" : "In Progress";
            const dateStr = new Date(activity.enrolled_at).toLocaleDateString();
            csvContent.push(`"${activity.full_name.replace(/"/g, '""')}","${activity.title.replace(/"/g, '""')}",${activity.progress}%,${completedStr},${dateStr}`);
        });
        csvContent.push("");

        csvContent.push("5. CURRICULUM DOMAIN PERFORMANCE DIAGNOSTICS");
        csvContent.push("Category Topic,Distinct Courses Count,Enrollments Count,Average Student Progress");
        (reportsData.topicDistribution || []).forEach(item => {
            csvContent.push(`"${item.topic.replace(/"/g, '""')}",${item.course_count},${item.enrollment_count},${item.avg_progress}%`);
        });

        const blob = new Blob([csvContent.join("\n")], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `UptoSkills_Platform_Performance_Report_${now.toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="admin-reports-page">
            <header className="page-header admin-reports-header">
                <div className="header-text">
                    <h2>Growth Analytics Dashboard</h2>
                    <p>Real-time telemetry and database aggregates auditing platform reach and student acquisitions.</p>
                </div>
                <button
                    onClick={handleExportCSV}
                    disabled={loading || error}
                    className="add-course-btn admin-reports-btn-export"
                >
                    <Download size={18} /> Export Analytics Sheet
                </button>
            </header>

            {error && (
                <div className="admin-reports-error-banner">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            <div className="metrics-row">
                <div className="report-card-premium">
                    <div className="admin-reports-metric-header">
                        <div className="metric-icon-box admin-reports-metric-icon-box-blue">
                            <TrendingUp size={22} />
                        </div>
                        {loading ? (
                            <span className="admin-reports-skeleton-pill" />
                        ) : (
                            <span className={`growth-badge ${reportsData.enrollmentGrowth >= 0 ? 'positive' : 'negative'}`}>
                                {reportsData.enrollmentGrowth >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {reportsData.enrollmentGrowth >= 0 ? "+" : ""}{reportsData.enrollmentGrowth}%
                            </span>
                        )}
                    </div>
                    <h4 className="metric-label">Global Reach</h4>
                    <h3 className="metric-value">
                        {loading ? "..." : reportsData.enrollmentsCount} 
                        <span>enrolls</span>
                    </h3>
                </div>

                <div className="report-card-premium">
                    <div className="admin-reports-metric-header">
                        <div className="metric-icon-box admin-reports-metric-icon-box-orange">
                            <Users size={22} />
                        </div>
                        {loading ? (
                            <span className="admin-reports-skeleton-pill" />
                        ) : (
                            <span className={`growth-badge ${reportsData.studentGrowth >= 0 ? 'positive' : 'negative'}`}>
                                {reportsData.studentGrowth >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {reportsData.studentGrowth >= 0 ? "+" : ""}{reportsData.studentGrowth}%
                            </span>
                        )}
                    </div>
                    <h4 className="metric-label">Active Students</h4>
                    <h3 className="metric-value">
                        {loading ? "..." : reportsData.studentsCount} 
                        <span>students</span>
                    </h3>
                </div>

                <div className="report-card-premium">
                    <div className="admin-reports-metric-header">
                        <div className="metric-icon-box admin-reports-metric-icon-box-green">
                            <GraduationCap size={22} />
                        </div>
                        <span className="growth-badge positive admin-reports-yield-badge">
                            High Yield
                        </span>
                    </div>
                    <h4 className="metric-label">Completion Rate</h4>
                    <h3 className="metric-value">
                        {loading ? "..." : reportsData.completionRate}
                        <span>% ratio</span>
                    </h3>
                </div>
            </div>

            <div className="analytics-dashboard-grid">
                <div className="admin-reports-main-col">
                    <div className="analytics-main-panel">
                        <div className="chart-header">
                            <h3 className="chart-title">
                                <Activity size={20} color="var(--color-primary)" /> 
                                Acquisition & Enrollment Graphs
                            </h3>
                            <div className="trend-toggle-group">
                                <button
                                    onClick={() => setTrendType('monthly')}
                                    className={`trend-toggle-btn ${trendType === 'monthly' ? 'active' : ''}`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setTrendType('weekly')}
                                    className={`trend-toggle-btn ${trendType === 'weekly' ? 'active' : ''}`}
                                >
                                    Weekly
                                </button>
                            </div>
                        </div>

                        <div className="admin-reports-chart-container">
                            {loading ? (
                                <div className="admin-reports-chart-loading-overlay">
                                    <span className="spinner-inline admin-reports-chart-loading-spinner"></span>
                                </div>
                            ) : currentData.length === 0 ? (
                                <div className="admin-reports-chart-empty-overlay">
                                    <Layers size={40} className="admin-reports-chart-empty-icon" />
                                    <span className="admin-reports-chart-empty-text">Insufficient telemetry data points found in range.</span>
                                </div>
                            ) : (
                                <svg key={trendType} viewBox="0 0 1000 300" className="svg-chart-wrapper admin-reports-svg-chart">
                                    {[40, 105, 170, 235, 300].map((y, idx) => (
                                        <line key={idx} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                                    ))}

                                    <motion.path
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 1 }}
                                        d={areaD}
                                        fill="url(#areaGradient)"
                                    />

                                    <motion.path
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1.2, ease: "easeInOut" }}
                                        d={pathD}
                                        fill="none"
                                        stroke="url(#lineGradient)"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    {coordinates.map((pt, i) => (
                                        <g key={i}>
                                            <circle
                                                cx={pt.x}
                                                cy={pt.y}
                                                r="10"
                                                fill="transparent"
                                                className="admin-reports-svg-circle-hover"
                                            />
                                            <circle
                                                cx={pt.x}
                                                cy={pt.y}
                                                className="svg-data-circle"
                                                r="5.5"
                                                fill="#1e293b"
                                                stroke="var(--color-primary)"
                                                strokeWidth="3.5"
                                            />
                                            <text
                                                x={pt.x}
                                                y={pt.y - 15}
                                                fill="white"
                                                fontSize="11"
                                                fontWeight="800"
                                                textAnchor="middle"
                                                className="admin-reports-svg-tooltip"
                                            >
                                                {pt.value}
                                            </text>
                                        </g>
                                    ))}

                                    <defs>
                                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="var(--color-primary)" />
                                            <stop offset="100%" stopColor="var(--color-secondary)" />
                                        </linearGradient>
                                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
                                            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            )}

                            {!loading && currentData.length > 0 && (
                                <div className="admin-reports-chart-labels-row">
                                    {currentData.map((d, idx) => (
                                        <span key={idx} className="admin-reports-chart-label-item">
                                            {d.label}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="analytics-main-panel">
                        <h3 className="chart-title admin-reports-title-margin">
                            <Layers size={20} color="var(--color-secondary)" /> 
                            Curriculum Domain Diagnostics & Engagement
                        </h3>

                        {loading ? (
                            <div className="admin-reports-diagnostics-skeleton-container">
                                {[1, 2, 3].map(n => (
                                    <div key={n} className="admin-reports-diagnostics-skeleton-item" />
                                ))}
                            </div>
                        ) : !reportsData.topicDistribution || reportsData.topicDistribution.length === 0 ? (
                            <p className="admin-reports-diagnostics-empty">No academic category logs captured yet.</p>
                        ) : (
                            <div className="admin-reports-diagnostics-list">
                                {reportsData.topicDistribution.map((item, idx) => (
                                    <div key={idx} className="admin-reports-diagnostics-item">
                                        <div className="admin-reports-diagnostics-info">
                                            <span className="admin-reports-diagnostics-name">{item.topic}</span>
                                            <span className="admin-reports-diagnostics-count">{item.course_count} active courses</span>
                                        </div>
                                        
                                        <div className="admin-reports-diagnostics-metrics">
                                            <span className="admin-reports-diagnostics-metrics-value">{item.enrollment_count}</span>
                                            <span className="admin-reports-diagnostics-metrics-label">Enrollments</span>
                                        </div>

                                        <div className="admin-reports-diagnostics-progress-col">
                                            <div className="admin-reports-diagnostics-progress-label-row">
                                                <span>Average Progress</span>
                                                <span className="admin-reports-diagnostics-progress-value">{item.avg_progress}%</span>
                                            </div>
                                            <div className="admin-reports-diagnostics-progress-bar-bg">
                                                <div 
                                                    className="admin-reports-diagnostics-progress-bar-fill-static"
                                                    style={{ 
                                                        width: `${item.avg_progress}%` 
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="analytics-side-panel">
                    <div className="side-widget">
                        <h4 className="widget-title">
                            <Star size={18} color="var(--color-primary)" />
                            Popular Course Demand
                        </h4>
                        
                        {loading ? (
                            <div className="admin-reports-widget-skeleton-container">
                                {[1, 2, 3].map(n => (
                                    <div key={n} className="admin-reports-widget-skeleton-item" />
                                ))}
                            </div>
                        ) : reportsData.topCourses.length === 0 ? (
                            <p className="admin-reports-widget-empty">No academic course metrics captured yet.</p>
                        ) : (
                            <div className="admin-reports-widget-list">
                                {reportsData.topCourses.map((c, idx) => {
                                    const peakCount = Math.max(...reportsData.topCourses.map(tc => parseInt(tc.enrollment_count)), 1);
                                    const widthPercent = (parseInt(c.enrollment_count) / peakCount) * 100;
                                    return (
                                        <div key={idx} className="popular-course-item">
                                            <div className="popular-course-info">
                                                <span className="popular-course-name" title={c.title}>{c.title}</span>
                                                <span className="popular-course-count">{c.enrollment_count} enrolls</span>
                                            </div>
                                            <div className="popular-progress-bar-bg">
                                                <div 
                                                    className="popular-progress-bar-fill" 
                                                    style={{ width: `${widthPercent}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="side-widget">
                        <h4 className="widget-title">
                            <Clock size={18} color="var(--color-secondary)" />
                            Live Learning Chronology
                        </h4>

                        {loading ? (
                            <div className="admin-reports-widget-timeline-skeleton-container">
                                {[1, 2, 3].map(n => (
                                    <div key={n} className="admin-reports-widget-timeline-skeleton-item" />
                                ))}
                            </div>
                        ) : reportsData.recentActivity.length === 0 ? (
                            <p className="admin-reports-widget-empty">Chronicle logging is currently empty.</p>
                        ) : (
                            <div className="timeline-feed">
                                {reportsData.recentActivity.map((activity, idx) => {
                                    const elapsed = Math.round((new Date().getTime() - new Date(activity.enrolled_at).getTime()) / (60 * 60 * 1000));
                                    const timeStr = elapsed <= 0 ? "Just Now" : (elapsed >= 24 ? `${Math.round(elapsed/24)}d ago` : `${elapsed}h ago`);
                                    return (
                                        <div key={activity.id || idx} className="timeline-item">
                                            <div className="timeline-dot" />
                                            <span className="timeline-time">{timeStr}</span>
                                            <span className="timeline-desc">
                                                <strong>{activity.full_name}</strong> started <strong>{activity.title}</strong>
                                            </span>
                                            <span className={`timeline-badge ${activity.completed ? 'completed-badge' : 'progress-badge'}`}>
                                                {activity.completed ? "Graduated Course" : `${activity.progress}% Complete`}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
