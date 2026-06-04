import { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    { title: "Total Students", value: "12,450" },
    { title: "Total Courses", value: "480+" },
    { title: "Active Mentors", value: "32" },
    { title: "Revenue", value: "$24K" },
  ];

  const courses = [
    {
      title: "Machine Learning",
      mentor: "Elon Musk",
      students: "2.1k",
      status: "Active",
    },
    {
      title: "Deep Learning",
      mentor: "Cristiano Ronaldo",
      students: "1.8k",
      status: "Active",
    },
    {
      title: "AI & Neural Networks",
      mentor: "Shah Rukh Khan",
      students: "980",
      status: "Pending",
    },
  ];

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Segoe UI',sans-serif;
        }

        html,body,#root{
          width:100%;
          min-height:100vh;
          background:#0f0f1a;
          color:white;
        }

        .dashboard{
          display:flex;
          min-height:100vh;
        }

        .sidebar{
          width:240px;
          background:#1a1a2e;
          border-right:1px solid #2a2a3e;
          padding:24px 18px;
        }

        .logo{
          font-size:28px;
          font-weight:700;
          color:#e94560;
          margin-bottom:40px;
        }

        .menu{
          display:flex;
          flex-direction:column;
          gap:14px;
        }

        .menu button{
          background:transparent;
          border:none;
          color:#ccc;
          text-align:left;
          padding:12px 14px;
          border-radius:8px;
          cursor:pointer;
          font-size:14px;
          transition:0.2s;
        }

        .menu button:hover{
          background:#e94560;
          color:white;
        }

        .main{
          flex:1;
          padding:28px;
        }

        .topbar{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:28px;
        }

        .topbar h1{
          font-size:28px;
        }

        .logout{
          background:#e94560;
          border:none;
          color:white;
          padding:10px 18px;
          border-radius:8px;
          cursor:pointer;
          font-weight:600;
        }

        .stats{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:18px;
          margin-bottom:32px;
        }

        .card{
          background:#1a1a2e;
          border:1px solid #2a2a3e;
          border-radius:12px;
          padding:22px;
        }

        .card h3{
          font-size:14px;
          color:#aaa;
          margin-bottom:12px;
        }

        .card p{
          font-size:28px;
          font-weight:700;
          color:#e94560;
        }

        .table-wrap{
          background:#1a1a2e;
          border:1px solid #2a2a3e;
          border-radius:12px;
          padding:22px;
        }

        .table-wrap h2{
          margin-bottom:20px;
          font-size:20px;
          color : white;
        }

        table{
          width:100%;
          border-collapse:collapse;
        }

        th,td{
          padding:14px;
          text-align:left;
          border-bottom:1px solid #2a2a3e;
          font-size:14px;
        }

        th{
          color:#aaa;
        }

        .status{
          padding:6px 12px;
          border-radius:20px;
          font-size:12px;
          font-weight:600;
        }

        .active{
          background:#123524;
          color:#4ade80;
        }

        .pending{
          background:#3b1d1d;
          color:#f87171;
        }
      `}</style>

      <div className="dashboard">

        <div className="sidebar">
          <div className="logo">🎓 UpToSkills</div>

          <div className="menu">
            <button onClick={() => alert("Dashboard Overview Opened")}>
              📊 Dashboard
            </button>

            <button onClick={() => alert("Courses Management Opened")}>
              📚 Courses
            </button>

            <button onClick={() => alert("Mentors Section Opened")}>
              🎤 Mentors
            </button>

            <button onClick={() => alert("Students Records Opened")}>
              👨‍🎓 Students
            </button>

            <button onClick={() => alert("Analytics Opened")}>
              📈 Analytics
            </button>

            <button onClick={() => window.location.href="http://localhost:5173/login"}>
              🚪 Logout
            </button>
          </div>
        </div>

        <div className="main">

          <div className="topbar">
            <h1>Admin Dashboard</h1>

            <button
              className="logout"
              onClick={() => alert("Welcome Admin 👋")}
            >
              Welcome Admin 👋
            </button>
          </div>

          <div className="stats">
            {stats.map((item,index)=>(
              <div className="card" key={index}>
                <h3>{item.title}</h3>
                <p>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="table-wrap">
            <h2>Recent Courses</h2>

            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Mentor</th>
                  <th>Students</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course,index)=>(
                  <tr key={index}>
                    <td>{course.title}</td>
                    <td>{course.mentor}</td>
                    <td>{course.students}</td>
                    <td>
                      <span className={`status ${course.status.toLowerCase()}`}>
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </>
  );
}