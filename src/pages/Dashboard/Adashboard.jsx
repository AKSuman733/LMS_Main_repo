import { useNavigate } from "react-router-dom";
import "./Adashboard.css";
import uptoskillsImg from "../../assets/uptoskills.jpg";

function Adashboard() {

  const navigate = useNavigate();

  return (

    <div className="dashboard">

      {/* HEADER */}
      <div className="headerbar">

        <img src={uptoskillsImg} alt="uptoskills" />

        <span onClick={() => navigate("/admin")}>
          Admin
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
            Courses</li>

          <li  onClick={() => navigate("/Mentors")}>Mentors</li>

        </ul>

      </div>

      {/* MAIN CONTENT */}
      <div className="content">

        <h1>Welcome Admin 👋</h1>

        <div className="cards">

          <div className="card">
            <h2>120</h2>
            <p>Total Students</p>
          </div>

          <div className="card">
            <h2>15</h2>
            <p>Total Courses</p>
          </div>

          <div className="card">
            <h2>8</h2>
            <p>Total Mentors</p>
          </div>
          <div className="card">
             <h2>90</h2>
             <p>Total Enrollments</p>
             </div>

        </div>

      </div>

    </div>
  );
}

export default Adashboard;