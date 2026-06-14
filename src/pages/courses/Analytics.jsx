import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./Analytics.css";

function Analytics() {
  const userGrowthData = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 180 },
    { month: "Mar", users: 250 },
    { month: "Apr", users: 320 },
    { month: "May", users: 410 },
    { month: "Jun", users: 520 },
  ];

  const courseData = [
    { course: "Python", enrollments: 350 },
    { course: "Data Science", enrollments: 280 },
    { course: "Java", enrollments: 220 },
    { course: "MERN", enrollments: 180 },
    { course: "AI", enrollments: 140 },
  ];

  const enrollmentData = [
  { month: "Jan", paid: 120, free: 200 },
  { month: "Feb", paid: 150, free: 230 },
  { month: "Mar", paid: 180, free: 250 },
  { month: "Apr", paid: 210, free: 270 },
  { month: "May", paid: 260, free: 300 },
  { month: "Jun", paid: 300, free: 320 },
];
const sentimentByMonth = [
  { month: "Jan", positive: 45, neutral: 30, negative: 25 },
  { month: "Feb", positive: 52, neutral: 28, negative: 20 },
  { month: "Mar", positive: 60, neutral: 25, negative: 15 },
  { month: "Apr", positive: 65, neutral: 22, negative: 13 },
  { month: "May", positive: 70, neutral: 20, negative: 10 },
  { month: "Jun", positive: 78, neutral: 15, negative: 7 },
];

  const completionData = [
    { name: "Completed", value: 75 },
    { name: "In Progress", value: 20 },
    { name: "Dropped", value: 5 },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="analytics">

      <h2>Analytics Dashboard</h2>

      <div className="charts-grid">

        {/* User Growth */}
        <div className="chart-card">
          <h3>User Growth</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#f97316"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Enrollments */}
        <div className="chart-card">
          <h3>Course Enrollments</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="enrollments"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Completion Analytics */}
        <div className="chart-card">
          <h3>Course Completion</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={completionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {completionData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* PAID VS FREE ENROLLMENTS */}
<div className="chart-card">
  <h3>Paid vs Free Course Enrollments</h3>

  <ResponsiveContainer width="100%" height={320}>
    <BarChart data={enrollmentData}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />

      {/* Free Enrollments */}
      <Bar
        dataKey="free"
        fill="#3b82f6"
        radius={[6, 6, 0, 0]}
      />

      {/* Paid Enrollments */}
      <Bar
        dataKey="paid"
        fill="#22c55e"
        radius={[6, 6, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
</div>
        

        {/* Recent Activity */}
        <div className="chart-card">
          <h3>Recent Activity</h3>

          <ul className="activity-list">
            <li>👨‍🎓 Rishika enrolled in AI Course</li>
            <li>📚 Dithu completed Python</li>
            <li>➕ New Course Added: Deep Learning</li>
            <li>👥 15 New Registrations Today</li>
            <li>⭐ Data Science received 5-star review</li>
          </ul>
        </div>
{/* SENTIMENT SIDE-BY-SIDE BARS */}
<div className="chart-card">
  <h3>Sentiment Analysis (Monthly)</h3>

  <ResponsiveContainer width="100%" height={320}>
    <BarChart data={sentimentByMonth}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />

      {/* Each bar is separate (GROUPED / SIDE-BY-SIDE) */}
      <Bar dataKey="positive" fill="#22c55e" radius={[6, 6, 0, 0]} />
      <Bar dataKey="neutral" fill="#f59e0b" radius={[6, 6, 0, 0]} />
      <Bar dataKey="negative" fill="#ef4444" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>

      </div>
    </div>
  );
}

export default Analytics;