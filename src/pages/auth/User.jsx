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

function User() {
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
      toast.error("Please fix errors");
      return;
    }

    setLoading(true);

    const userEmail = "user@gmail.com";
    const userPassword = "U12345";

    setTimeout(() => {
      setLoading(false);

      if (email === userEmail && password === userPassword) {
        toast.success("Welcome back!");
        navigate("/udashboard");
      } else {
        toast.error("Invalid credentials");
      }
    }, 1200);
  };

  return (
    <div className="auth-page">

      {/* LEFT PANEL */}
      <div className="auth-left">

        <h1>Learn. Grow. Succeed 🚀</h1>

        <p>
          Join thousands of learners upgrading their skills through expert-led courses.
        </p>

        <ul>
          <li>✔ Industry-level courses</li>
          <li>✔ Track your progress</li>
          <li>✔ Earn certificates</li>
        </ul>

      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">

        <div className="auth-card">

          <h2>Welcome Back 👋</h2>
          <p className="subtext">Login to continue your learning journey</p>

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
            text="Login"
            onClick={handleLogin}
          />

          {/* DEMO */}
          <div className="demo-box">
            <span>Demo User Credentials</span>
            <p>user@gmail.com</p>
            <p>U12345</p>
          </div>

          {/* NEW LINKS SECTION */}
          <div className="auth-links">

            <p>
              Don’t have an account?{" "}
              <span onClick={() => navigate("/createaccount")}>
                Create Account
              </span>
            </p>

            <p
              className="forgot"
            >
              Forgot Password?
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default User;