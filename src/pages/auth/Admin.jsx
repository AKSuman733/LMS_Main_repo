import { useState } from "react";
import "./User.css";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import EmailField from "../../components/FormInput/EmailField";
import PasswordField from "../../components/FormInput/PasswordField";
import SubmitButton from "../../components/FormInput/SubmitButton";

import {
  validateEmail,
  validatePassword,
} from "../../utils/validation";

function Admin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (emailError || passwordError) {
      toast.error("Fix validation errors");
      return;
    }

    setLoading(true);

    const adminEmail = "admin@gmail.com";
    const adminPassword = "A12345";

    setTimeout(() => {
      setLoading(false);

      if (email === adminEmail && password === adminPassword) {
        toast.success("Welcome Admin 👋");
        navigate("/adashboard");
      } else {
        toast.error("Invalid credentials");
      }
    }, 1200);
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-left admin">

        <h1>Admin Control Center ⚙️</h1>

        <p>
          Manage users, courses, mentors, and platform analytics from one powerful dashboard.
        </p>

        <ul>
          <li>✔ Course Management</li>
          <li>✔ User Analytics</li>
          <li>✔ System Control</li>
        </ul>

      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">

        <div className="auth-card">

          <h2>Admin Sign In</h2>

          <p className="subtext">
            Secure access to admin dashboard
          </p>

          <EmailField
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(validateEmail(e.target.value));
            }}
            error={emailError}
            isValid={email && !emailError}
          />

          <PasswordField
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(validatePassword(e.target.value));
            }}
            error={passwordError}
          />

          <SubmitButton
            loading={loading}
            text="Login as Admin"
            onClick={handleLogin}
          />

          <div className="demo-box admin-demo">
            <span>Admin Credentials</span>
            <p>admin@gmail.com</p>
            <p>A12345</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Admin;