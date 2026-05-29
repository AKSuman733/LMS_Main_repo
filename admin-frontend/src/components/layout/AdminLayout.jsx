import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-20 top-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute right-20 top-40 h-96 w-96 rounded-full bg-purple-500/15 blur-[120px]" />
        <div className="absolute bottom-20 left-1/3 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />
      </div>

      <AdminSidebar collapsed={sidebarCollapsed} />

      <main
        className={`min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "pl-24" : "pl-80"
        }`}
      >
        <AdminTopbar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        <div className="p-5 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}