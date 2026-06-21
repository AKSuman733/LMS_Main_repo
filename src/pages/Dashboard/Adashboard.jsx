import { useNavigate } from "react-router-dom";
import "./Adashboard.css";

function Adashboard() {
  const navigate = useNavigate();

  const kpis = [
    { value: 120, label: "Total Active Users", color: "#22c55e" },
    { value: 15, label: "Total Courses", color: "#3b82f6" },
    { value: 90, label: "Enrollments this week", color: "#f59e0b" },
    { value: 87, label: "Course Completion Rate", color: "#22c55e" },
    { value: 12, label: "Pending Approvals", color: "#ef4444" },
    { value: "Good", label: "System Health", color: "#22c55e" },
  ];

  const actions = [
    { label: "+ New Course", type: "primary", path: "/Acourse" },
    { label: "+ New Student", type: "primary",path:"/Addstudent" },
    { label: "Approve Pending", type: "secondary" },
    { label: "View Reports", type: "secondary",path:"/Analytics" },
  ];

  return (
    <div className="dashboard">

      <div className="content page-fade">

        <div className="content-header">
          <h1>Welcome Admin</h1>
          <p>Monitor performance, manage users & courses efficiently</p>
        </div>

        <div className="kpi-grid">
          {kpis.map((item, index) => (
            <div
              key={index}
              className="kpi-card"
              style={{ borderLeft: `4px solid ${item.color}` }}
            >
              <h2>{item.value}</h2>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
        <div className="actions">
          {actions.map((btn, index) => (
            <button
              key={index}
              className={`action-btn ${btn.type}`}
              onClick={() => {
                if (btn.path) navigate(btn.path);
                else alert(btn.label);
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="insights">
          <div className="insight-card">
            <h3>Growth</h3>
            <p>User engagement increased this week</p>
          </div>

          <div className="insight-card">
            <h3>Performance</h3>
            <p>System running smoothly</p>
          </div>

          <div className="insight-card">
            <h3>Focus</h3>
            <p>Improve course completion rate</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Adashboard;