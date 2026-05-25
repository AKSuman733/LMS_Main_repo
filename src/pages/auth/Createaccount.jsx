import "./Createaccount.css";
import { useNavigate } from "react-router-dom";

function Createaccount() {

  const navigate = useNavigate();

  return (
    <div className="main">

      <div className="container3">

        <h2>Create an Account</h2>

        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Create password" />
        </div>

        <div className="form-group">
          <label>Confirm</label>
          <input type="password" placeholder="Confirm password" />
        </div>

        {/* Create account button */}
        <button
          className="Createaccount-btn"
          onClick={() => navigate("/user")}
        >
          Create Account
        </button>

        {/* Login link */}
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/user")}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Createaccount;