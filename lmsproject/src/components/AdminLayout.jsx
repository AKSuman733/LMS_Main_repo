import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Users, ClipboardList, PlusCircle, Sparkles, CheckCircle2, BarChart3, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: Home },
  { to: '/admin/courses', label: 'Courses', icon: BookOpen },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/enrollments', label: 'Enrollments', icon: ClipboardList },
  { to: '/admin/add-course', label: 'Add Course', icon: PlusCircle },
  { to: '/admin/new-intern', label: 'Add Intern', icon: Sparkles },
  { to: '/admin/approvals', label: 'Approvals', icon: CheckCircle2 },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { to: '/', label: 'Website', icon: Globe },
];

function AdminLayout({ title, subtitle, children }) {
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <div className="h-full">
      <div className="mb-10 flex items-center justify-between md:hidden">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Admin</h1>
          <p className="text-sm text-gray-400">LMS Project</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar navigation"
          className="rounded-2xl border border-white/10 bg-slate-950/80 p-3 text-slate-200 transition hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          <X size={20} />
        </button>
      </div>

      <div className="hidden md:block">
        <h1 className="text-3xl font-black mb-10">
          LMS<span className="text-orange-400">Project</span>
        </h1>
      </div>

      <div className="space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-3xl px-4 py-4 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-orange-500/20 text-orange-100 shadow-lg shadow-orange-500/10'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      <div className="md:flex md:min-h-screen">
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-slate-950/70 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
              />
              <motion.aside
                id="admin-sidebar-mobile"
                className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-white/10 bg-[#070B14] p-6 shadow-2xl"
                initial={{ x: -280, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -280, opacity: 0 }}
                transition={{ duration: 0.25 }}
                role="navigation"
                aria-label="Admin sidebar"
              >
                {sidebarContent}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <aside id="admin-sidebar" className="hidden md:block md:w-72 md:overflow-y-auto md:border-r md:border-white/10 md:bg-[#070B14] md:p-6" role="navigation" aria-label="Admin sidebar">
          {sidebarContent}
        </aside>

        <div className="flex-1 md:min-h-screen">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-[#070B14]/95 px-4 py-4 backdrop-blur md:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Open admin navigation"
                  aria-controls="admin-sidebar-mobile"
                  aria-expanded={open}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70 text-slate-200 transition hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 md:hidden"
                >
                  <Menu size={20} />
                </button>
                <div>
                  <p className="text-orange-400 text-sm font-semibold uppercase tracking-[0.2em]">Admin Panel</p>
                  <h1 className="text-2xl font-black tracking-tight">{title}</h1>
                  {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
