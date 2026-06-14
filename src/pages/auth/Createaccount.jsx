import "./Createaccount.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Createaccount() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Empty fields validation
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      alert("Enter a valid email");
      return;
    }

    // Password match validation
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Get existing users
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    // Check existing email
    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() ===
        form.email.toLowerCase()
    );

    if (existingUser) {
      alert("Account already exists");
      return;
    }

    // Save new user
    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Account Created Successfully!");

    // Clear form
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Redirect to Login Page
    navigate("/user");
  };

  return (
    <div className="auth-page">
      {/* Left Section */}
      <div className="auth-left signup">
        <h1>Join Uptoskills 🚀</h1>

        <p>
          Create your account and start learning
          from expert-led courses.
        </p>

        <ul>
          <li>✔ Access premium courses</li>
          <li>✔ Track your learning</li>
          <li>✔ Earn certificates</li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>Create Account</h2>

          <p className="subtext">
            Start your learning journey today
          </p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button
            className="primary-btn"
            onClick={handleSubmit}
          >
            Create Account
          </button>

          <p className="bottom-text">
            Already have an account?{" "}
            <span
              style={{
                cursor: "pointer",
                color: "#2563eb",
                fontWeight: "600",
              }}
              onClick={() => navigate("/user")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Createaccount;