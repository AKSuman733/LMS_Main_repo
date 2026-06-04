import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Directly go to dashboard
    navigate("/admin/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#0f172a",
          borderRadius: "24px",
          padding: "40px",
          border: "1px solid #1e293b",
          boxShadow: "0 0 40px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              color: "white",
              marginBottom: "10px",
            }}
          >
            UpToSkills Admin
          </h1>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "30px",
            }}
          >
            Sign in to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                color: "#cbd5e1",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #334155",
                background: "#020617",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                color: "#cbd5e1",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #334155",
                background: "#020617",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background: "#ff6b35",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#22d3ee",
              textDecoration: "none",
            }}
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}