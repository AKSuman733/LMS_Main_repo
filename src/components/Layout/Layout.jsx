import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

import "./Layout.css";

function Layout() {
  // Sidebar open by default on desktop
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="layout">
      {/* HEADER */}
      <Header />

      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main
        className={`layout-content ${
          sidebarOpen
            ? "sidebar-open"
            : "sidebar-closed"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;