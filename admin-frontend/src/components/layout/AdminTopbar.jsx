import { Bell, Menu, PanelLeftClose, PanelLeftOpen, ShieldCheck } from "lucide-react";

export default function AdminTopbar({ sidebarCollapsed, setSidebarCollapsed }) {
  const adminUser = JSON.parse(
    localStorage.getItem("uptoskills_admin_user") || "{}"
  );

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 px-5 py-4 backdrop-blur-2xl md:px-8">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            title={sidebarCollapsed ? "Expand sidebar" : "Minimize sidebar"}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen size={22} />
            ) : (
              <PanelLeftClose size={22} />
            )}
          </button>

          <div>
            <h1 className="text-xl font-black md:text-2xl">
              Admin Dashboard
            </h1>
            <p className="text-sm text-slate-400">
              Welcome back, {adminUser.name || "UptoSkills Admin"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-white/10 bg-white/5 p-3 text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-400/10">
            <Bell size={20} />
          </button>

          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-slate-950">
              <ShieldCheck size={22} />
            </div>

            <div className="hidden text-left md:block">
              <p className="text-sm font-black">
                {adminUser.name || "UptoSkills Admin"}
              </p>
              <p className="max-w-[180px] truncate text-xs text-slate-500">
                {adminUser.email || "admin@uptoskills.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}