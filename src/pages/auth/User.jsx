import "./User.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function User() {

  const navigate = useNavigate();

  // STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN FUNCTION
  const handleLogin = () => {

    // ADMIN CREDENTIALS
    const userEmail = "user@gmail.com";
    const userPassword = "12345";

    if (email === userEmail && password === userPassword) {

      alert("User Login Successful");

      navigate("/udashboard");

    } else {

      alert("Invalid user Email or Password");

    }
  };

  return (
    <div className="main">

      <div className="container1">

        <h2>User Login Page</h2>

        <h5>Sign in with Google</h5>

        <button className="google">
          Continue with Google
        </button>

        <nav>OR</nav>
          <div className="sample">
          Sample Email to be used:
          Email:"user@gmail.com"
          Password:"12345"
        </div>

        {/* EMAIL */}
        <div className="form-group">

          <label>Email</label>

          <input
            type="text"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* PASSWORD */}
        <div className="form-group">

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        {/* LOGIN BUTTON */}
        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default User;