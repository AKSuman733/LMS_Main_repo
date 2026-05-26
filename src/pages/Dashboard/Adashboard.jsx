import { useNavigate } from "react-router-dom";
import "./Adashboard.css";
import uptoskillsImg from "../../assets/uptoskills.jpg";
import {
  colors,
  spacing,
  typography,
  shadows,
} from "../../styles/designtokens";
import Kpicard from "../../components/Kpicard";
//import buttons from "../../components/Buttons";

function Adashboard() {
  const navigate = useNavigate();

  const kpis = [
    { value: 120, label: "Total Active Users", color: colors.success },
    { value: 15, label: "Total Courses", color: colors.secondary },
    { value: 90, label: "Enrollments this week", color: colors.warning },
    { value: 87, label: "Course Completion Rate", color: colors.success },
    { value: 87, label: "Pending Approvals", color: colors.error },
    { value: 87, label: "System Health", color: colors.success },
  ];

  const actions = [
    {
      label: "+ New Course",
      type: "primary",
      path: "/Acourse",
    },
    {
      label: "+ New Intern",
      type: "primary",
    },
    {
      label: "Approve Pending",
      type: "secondary",
    },
    {
      label: "View Reports",
      type: "secondary",
    },
  ];

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="headerbar">
        <img src={uptoskillsImg} alt="uptoskills" />

        <span onClick={() => navigate("/admin")}>
          Logout
        </span>
      </div>

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Admin Panel</h2>

        <ul>
          <li>Dashboard</li>

          <li onClick={() => navigate("/Stud")}>
            Students
          </li>

          <li onClick={() => navigate("/Acourse")}>
            Courses
          </li>

          <li onClick={() => navigate("/Mentors")}>
            Mentors
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="content">
        <h1>Welcome Admin 👋</h1>

        {/* KPI CARDS */}
        <div className="cards">
          {kpis.map((item, index) => (
            <div
              key={index}
              className="card"
              style={{
                borderLeft: `4px solid ${item.color}`,
                background: colors.gray200,
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {item.value}
              </h2>

              <p
                style={{
                  fontSize: "11px",
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="actions">
          {actions.map((btn, index) => (
            <button
              key={index}
              className={`action-btn ${btn.type}`}
              onClick={() => {
                if (btn.path) {
                  navigate(btn.path);
                } else {
                  alert(btn.label);
                }
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Adashboard;