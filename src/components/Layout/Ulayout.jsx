import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

import Uheader from "./Uheader";
import Usidebar from "./Usidebar";

import "./Layout.css";

function Ulayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="layout">

      {/* HEADER */}
      <Uheader />

      {/* SIDEBAR */}
      <Usidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main
        className={`layout-content ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <Outlet />
      </main>

      {/* =========================
          FLOATING AI BUBBLE
      ========================= */}

      {/* CHAT POPUP */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: "20px",
            bottom: "90px",
            width: "320px",
            height: "400px",
            background: "#1c1d1f",
            borderRadius: "14px",
            boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: "12px",
              background: "#111",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaRobot color="#a435f0" />
              AI Assistant
            </span>

            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
          </div>

          {/* BODY */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              color: "#cbd5e1",
              fontSize: "13px"
            }}
          >
            👋 Hi! I'm your AI Mentor. Ask anything about your course.
          </div>

          {/* INPUT */}
          <div
            style={{
              display: "flex",
              padding: "10px",
              gap: "8px",
              borderTop: "1px solid #333"
            }}
          >
            <input
              placeholder="Ask something..."
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "6px",
                border: "none",
                outline: "none"
              }}
            />

            <button
              style={{
                background: "#a435f0",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* FLOATING BUBBLE BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: "#a435f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          zIndex: 9999,
          transition: "0.3s ease"
        }}
      >
        <FaRobot size={22} color="white" />
      </div>

    </div>
  );
}

export default Ulayout;