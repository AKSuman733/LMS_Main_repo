import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Sidebar from "../../components/Sidebar";

// ─── Skeleton Components ────────────────────────────────────────────────────

function SkeletonPulse({ className = "", style = {} }) {
  return (
    <div
      className={`rounded ${className}`}
      style={{
        background: "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 75%)",
        backgroundSize: "200% 100%",
        animation: "skeleton-shimmer 1.6s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

function TableSkeletonRow({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.08, duration: 0.2 }}
      className="grid gap-6 items-center px-6 py-5 border-b"
      style={{
        gridTemplateColumns: "2fr 1.4fr 1.2fr 1fr 1fr 120px",
        borderColor: "rgba(255,255,255,0.05)",
        backgroundColor: index % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
      }}
    >
      <div className="flex items-center gap-4">
        <SkeletonPulse style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0 }} />
        <SkeletonPulse style={{ width: 48, height: 48, borderRadius: "50%", flexShrink: 0 }} />
        <div className="flex flex-col gap-2 flex-1">
          <SkeletonPulse style={{ height: 14, width: "70%" }} />
          <SkeletonPulse style={{ height: 11, width: "50%" }} />
        </div>
      </div>
      <SkeletonPulse style={{ height: 32, width: "80%", borderRadius: 12 }} />
      <div className="flex flex-col gap-2">
        <SkeletonPulse style={{ height: 12, width: "30%" }} />
        <SkeletonPulse style={{ height: 8, width: "100%", borderRadius: 4 }} />
      </div>
      <SkeletonPulse style={{ height: 32, width: "75%", borderRadius: 12 }} />
      <SkeletonPulse style={{ height: 32, width: "80%", borderRadius: 12 }} />
      <div className="flex justify-center">
        <SkeletonPulse style={{ width: 40, height: 40, borderRadius: 12 }} />
      </div>
    </motion.div>
  );
}

function StatCardSkeleton({ index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.2 }}
      className="p-6 rounded-[2rem] border"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <SkeletonPulse style={{ width: 56, height: 56, borderRadius: 16 }} />
      </div>
      <SkeletonPulse style={{ height: 40, width: "50%", marginBottom: 12 }} />
      <SkeletonPulse style={{ height: 14, width: "70%" }} />
    </motion.div>
  );
}

// ─── Highlight matching text ─────────────────────────────────────────────────

function HighlightText({ text, query }) {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark style={{ background: "rgba(20,184,166,0.4)", color: "#fff", borderRadius: 3, padding: "0 2px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </span>
  );
}

// ─── Filter Dropdown ──────────────────────────────────────────────────────────

function FilterDropdown({ label, options, selected, onChange, onClear }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (val) => {
    if (selected.includes(val)) onChange(selected.filter((v) => v !== val));
    else onChange([...selected, val]);
  };

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: 4, fontSize: 13,
          color: selected.length > 0 ? "#14b8a6" : "#9ca3af",
          background: "none", border: "none", cursor: "pointer", padding: "2px 0",
        }}
      >
        {label}
        {selected.length > 0 && (
          <span style={{ background: "#14b8a6", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {selected.length}
          </span>
        )}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 8L2 4h8L6 8z"/></svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 9999,
          background: "#0f172a", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 16, minWidth: 180, boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}>
          {options.map((opt) => (
            <label key={opt} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 16px",
              cursor: "pointer", fontSize: 13, color: "#e2e8f0",
              background: selected.includes(opt) ? "rgba(20,184,166,0.1)" : "transparent",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = selected.includes(opt) ? "rgba(20,184,166,0.15)" : "rgba(255,255,255,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = selected.includes(opt) ? "rgba(20,184,166,0.1)" : "transparent"}
            >
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} style={{ accentColor: "#14b8a6" }} />
              {opt}
            </label>
          ))}
          {selected.length > 0 && (
            <button onClick={() => { onClear(); setOpen(false); }} style={{
              width: "100%", padding: "10px 16px", textAlign: "left", fontSize: 12,
              color: "#f87171", background: "rgba(248,113,113,0.08)", border: "none",
              borderTop: "1px solid rgba(255,255,255,0.06)", cursor: "pointer",
            }}>
              Clear filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────

function SortIcon({ direction, active }) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", gap: 1, marginLeft: 4 }}>
      <svg width="8" height="5" viewBox="0 0 8 5" fill={active && direction === "asc" ? "#14b8a6" : "rgba(255,255,255,0.3)"}><path d="M4 0L8 5H0L4 0z"/></svg>
      <svg width="8" height="5" viewBox="0 0 8 5" fill={active && direction === "desc" ? "#14b8a6" : "rgba(255,255,255,0.3)"}><path d="M4 5L0 0H8L4 5z"/></svg>
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const INITIAL_STUDENTS = [
  { id: 1, name: "Ananya Patel", email: "ananyapatel@gmail.com", course: "Artificial Intelligence", progress: 39, badge: "Bronze", streak: 9, joined: 2026, status: "Active" },
  { id: 2, name: "Arjun Kumar", email: "arjunkumar@gmail.com", course: "Full Stack Development", progress: 82, badge: "Gold", streak: 42, joined: 2024, status: "Top Performer" },
  { id: 3, name: "Karthik Iyer", email: "karthikiyer@gmail.com", course: "Java", progress: 72, badge: "Silver", streak: 35, joined: 2025, status: "Active" },
  { id: 4, name: "Meera Nair", email: "meeranair@gmail.com", course: "Data Structures", progress: 84, badge: "Gold", streak: 51, joined: 2023, status: "Top Performer" },
  { id: 5, name: "Priya Sharma", email: "priyasharma@gmail.com", course: "Machine Learning", progress: 65, badge: "Silver", streak: 28, joined: 2025, status: "Active" },
  { id: 6, name: "Rahul Verma", email: "rahulverma@gmail.com", course: "Python", progress: 48, badge: "Bronze", streak: 12, joined: 2026, status: "Learning" },
  { id: 7, name: "Sneha Reddy", email: "snehareddy@gmail.com", course: "UI/UX Design", progress: 91, badge: "Diamond", streak: 76, joined: 2022, status: "Top Performer" },
  { id: 8, name: "Vikram Singh", email: "vikramsingh@gmail.com", course: "C++ Programming", progress: 58, badge: "Silver", streak: 31, joined: 2024, status: "Active" },
];

const BADGE_OPTIONS = ["Bronze", "Silver", "Gold", "Diamond"];
const STATUS_OPTIONS = ["Active", "Top Performer", "Learning"];
const COURSE_OPTIONS = [...new Set(INITIAL_STUDENTS.map((s) => s.course))];

export default function ManageStudents() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [jumpPage, setJumpPage] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toast, setToast] = useState(null);

  // Filters
  const [filterBadge, setFilterBadge] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterCourse, setFilterCourse] = useState([]);

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = () => setActiveMenu(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const showToast = useCallback(
  (message, type = "success") => {

    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, type === "error" ? 5000 : type === "warning" ? 4000 : 3000);

  },
  []
);

  // Sort handler
  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setCurrentPage(1);
  };

  // Filtered + sorted
  const processed = [...students]
    .filter((s) => {
      const q = search.toLowerCase();
      const matchSearch = !q || s.name.toLowerCase().includes(q) || s.course.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
      const matchBadge = filterBadge.length === 0 || filterBadge.includes(s.badge);
      const matchStatus = filterStatus.length === 0 || filterStatus.includes(s.status);
      const matchCourse = filterCourse.length === 0 || filterCourse.includes(s.course);
      return matchSearch && matchBadge && matchStatus && matchCourse;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "progress") cmp = a.progress - b.progress;
      else if (sortKey === "streak") cmp = a.streak - b.streak;
      else if (sortKey === "course") cmp = a.course.localeCompare(b.course);
      else if (sortKey === "badge") cmp = a.badge.localeCompare(b.badge);
      else if (sortKey === "status") cmp = a.status.localeCompare(b.status);
      return sortDir === "asc" ? cmp : -cmp;
    });

  const totalPages = Math.max(1, Math.ceil(processed.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = processed.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);
  const showFrom = processed.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
  const showTo = Math.min(safePage * rowsPerPage, processed.length);

  const toggleSelectAll = () => {
    if (selectedRows.length === paginated.length && paginated.length > 0)
      setSelectedRows([]);
    else setSelectedRows(paginated.map((s) => s.id));
  };

  const toggleRow = (id) =>
    setSelectedRows((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]);

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setSelectedRows((prev) => prev.filter((r) => r !== id));
    setActiveMenu(null);
    showToast("Student deleted successfully");
  };

  const deleteSelected = () => {
    setStudents((prev) => prev.filter((s) => !selectedRows.includes(s.id)));
    setSelectedRows([]);
    showToast(`${selectedRows.length} students deleted`);
  };

  const archiveSelected = () => {
    showToast(`${selectedRows.length} students archived`);
    setSelectedRows([]);
  };

  const exportSelected = () => showToast("PDF exported successfully");
  const exportStudent = (student) => { setActiveMenu(null); showToast(`${student.name}'s record exported`); };

  const clearAllFilters = () => { setFilterBadge([]); setFilterStatus([]); setFilterCourse([]); setSearch(""); setCurrentPage(1); };
  const hasActiveFilters = filterBadge.length > 0 || filterStatus.length > 0 || filterCourse.length > 0 || search;

  const badgeColor = (b) => ({ Bronze: "#f97316", Silver: "#94a3b8", Gold: "#eab308", Diamond: "#22d3ee" }[b] || "#fff");

  const SortableHeader = ({ label, sortK, children }) => (
    <button onClick={() => handleSort(sortK)} style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 600, fontSize: 13, color: sortKey === sortK ? "#14b8a6" : "#e2e8f0", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
      {label || children}
      <SortIcon direction={sortDir} active={sortKey === sortK} />
    </button>
  );

  // Stats
  const topPerformers = students.filter((s) => s.status === "Top Performer").length;

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(to bottom,#050816,#0b1023)", color: "#fff" }}>
      <style>{`
        @keyframes skeleton-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .row-hover:hover { background: rgba(255,245,240,0.06) !important; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
      `}</style>

      {/* SIDEBAR placeholder */}
      {/* SIDEBAR */}
<Sidebar role="admin" />

      <main style={{ flex: 1, marginLeft: "16rem" , padding: "2rem", overflowX: "auto" }}>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8" style={{ flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 8 }}>Student Management</h1>
            <p style={{ color: "#94a3b8" }}>Manage learners, exports and analytics.</p>
          </div>

          {/* SEARCH */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(18px)", borderRadius: 16, padding: "0 16px", height: 48, minWidth: 320 }}>
            <svg width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="text"
              placeholder="Search by name, course, email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              style={{ background: "transparent", border: "none", outline: "none", flex: 1, color: "#fff", fontSize: 14 }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 2 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 5.586 2.707 1.293 1.293 2.707 5.586 7l-4.293 4.293 1.414 1.414L7 8.414l4.293 4.293 1.414-1.414L8.414 7l4.293-4.293-1.414-1.414L7 5.586z"/></svg>
              </button>
            )}
          </div>
        </div>

        {/* STAT CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 32 }}>
          {loading ? (
            [0,1,2,3].map(i => <StatCardSkeleton key={i} index={i} />)
          ) : (
            [
              { title: "Total Students", value: students.length, color: "#3b82f6", icon: "👥" },
              { title: "Top Performers", value: topPerformers, color: "#22c55e", icon: "📈" },
              { title: "Courses", value: new Set(students.map(s => s.course)).size, color: "#f97316", icon: "🎓" },
              { title: "Verified", value: "100%", color: "#a855f7", icon: "✅" },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -6, scale: 1.02 }} style={{ padding: 24, borderRadius: 32, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: item.color, opacity: 0.15, filter: "blur(40px)" }} />
                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${item.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 32 }}>{item.icon}</div>
                <div style={{ fontSize: 40, fontWeight: 800, marginBottom: 6 }}>{item.value}</div>
                <div style={{ color: "#94a3b8", fontSize: 14 }}>{item.title}</div>
              </motion.div>
            ))
          )}
        </div>

        {/* BULK ACTIONS BAR */}
        <AnimatePresence>
          {selectedRows.length > 0 && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ marginBottom: 24, padding: "16px 24px", borderRadius: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontWeight: 600, color: "#14b8a6" }}>{selectedRows.length} student{selectedRows.length > 1 ? "s" : ""} selected</span>
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { label: "Export PDF", icon: "⬇", action: exportSelected, color: "linear-gradient(135deg,#14b8a6,#06b6d4)" },
                  { label: "Archive", icon: "📦", action: archiveSelected, color: "linear-gradient(135deg,#f97316,#fb923c)" },
                  { label: "Delete Selected", icon: "🗑", action: deleteSelected, color: "linear-gradient(135deg,#ef4444,#dc2626)" },
                ].map((btn) => (
                  <button key={btn.label} onClick={btn.action} style={{ padding: "10px 20px", borderRadius: 14, border: "none", cursor: "pointer", background: btn.color, color: "#fff", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                    <span>{btn.icon}</span>{btn.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TABLE */}
        <div style={{ borderRadius: 32, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", overflow: "visible" }}>

          {/* TABLE HEADER */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.4fr 1.2fr 1fr 1fr 120px",
            gap: 24,
            padding: "16px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(15,23,42,0.95)",
            borderRadius: "32px 32px 0 0",
            alignItems: "center",
          }}>
            {/* Student col */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input
                type="checkbox"
                checked={paginated.length > 0 && selectedRows.length === paginated.length}
                onChange={toggleSelectAll}
                style={{ accentColor: "#14b8a6", width: 16, height: 16 }}
              />
              <SortableHeader label="Student" sortK="name" />
            </div>

            {/* Course */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <SortableHeader label="Course" sortK="course" />
              <FilterDropdown label="Filter" options={COURSE_OPTIONS} selected={filterCourse} onChange={(v) => { setFilterCourse(v); setCurrentPage(1); }} onClear={() => { setFilterCourse([]); setCurrentPage(1); }} />
            </div>

            {/* Progress */}
            <div><SortableHeader label="Progress" sortK="progress" /></div>

            {/* Badge */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <SortableHeader label="Badge" sortK="badge" />
              <FilterDropdown label="Filter" options={BADGE_OPTIONS} selected={filterBadge} onChange={(v) => { setFilterBadge(v); setCurrentPage(1); }} onClear={() => { setFilterBadge([]); setCurrentPage(1); }} />
            </div>

            {/* Status */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <SortableHeader label="Status" sortK="status" />
              <FilterDropdown label="Filter" options={STATUS_OPTIONS} selected={filterStatus} onChange={(v) => { setFilterStatus(v); setCurrentPage(1); }} onClear={() => { setFilterStatus([]); setCurrentPage(1); }} />
            </div>

            <div style={{ textAlign: "center", fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>Actions</div>
          </div>

          {/* Clear all filters row */}
          {hasActiveFilters && !loading && (
            <div style={{ padding: "8px 24px", background: "rgba(20,184,166,0.06)", borderBottom: "1px solid rgba(20,184,166,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "#14b8a6" }}>
                {processed.length} result{processed.length !== 1 ? "s" : ""} with active filters
              </span>
              <button onClick={clearAllFilters} style={{ fontSize: 12, color: "#f87171", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                ✕ Clear all filters
              </button>
            </div>
          )}

          {/* TABLE ROWS */}
          {loading ? (
            [0,1,2,3,4].map((i) => <TableSkeletonRow key={i} index={i} />)
          ) : paginated.length === 0 ? (
            <div style={{ padding: "60px 24px", textAlign: "center", color: "#64748b" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>No students found</div>
              <div style={{ fontSize: 13, marginTop: 6 }}>Try adjusting your search or filters</div>
            </div>
          ) : (
            paginated.map((student, i) => (
              <motion.div
                key={student.id}
                whileHover={{ backgroundColor: "rgba(255,245,240,0.04)" }}
                className="row-hover"
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.4fr 1.2fr 1fr 1fr 120px",
                  gap: 24,
                  alignItems: "center",
                  padding: "18px 24px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(249,248,246,0.025)",
                  position: "relative",
                  overflow: "visible",
                  cursor: "default",
                }}
              >
                {/* Student */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(student.id)}
                    onChange={() => toggleRow(student.id)}
                    style={{ accentColor: "#14b8a6", width: 16, height: 16, flexShrink: 0 }}
                  />
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#14b8a6,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
                    {student.name.charAt(0)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      <HighlightText text={student.name} query={search} />
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{student.email}</div>
                  </div>
                </div>

                {/* Course */}
                <div>
                  <span style={{ padding: "6px 14px", borderRadius: 12, fontSize: 13, background: "rgba(20,184,166,0.15)", color: "#14b8a6", display: "inline-block" }}>
                    <HighlightText text={student.course} query={search} />
                  </span>
                </div>

                {/* Progress */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13 }}>{student.progress}%</span>
                  </div>
                  <div style={{ width: "100%", height: 6, borderRadius: 3, background: "#1e293b", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${student.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg,#14b8a6,#8b5cf6)" }}
                    />
                  </div>
                </div>

                {/* Badge */}
                <div>
                  <span style={{ padding: "6px 14px", borderRadius: 12, fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, background: `${badgeColor(student.badge)}18`, color: badgeColor(student.badge) }}>
                    ★ {student.badge}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <span style={{
                    padding: "6px 14px", borderRadius: 12, fontSize: 13,
                    background: student.status === "Top Performer" ? "rgba(34,197,94,0.15)" : student.status === "Learning" ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.08)",
                    color: student.status === "Top Performer" ? "#22c55e" : student.status === "Learning" ? "#fbbf24" : "#e2e8f0",
                  }}>
                    {student.status}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", justifyContent: "center", position: "relative", overflow: "visible" }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === student.id ? null : student.id); }}
                    style={{ width: 40, height: 40, borderRadius: 12, background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    ⋮
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {activeMenu === student.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{ position: "absolute", top: 48, right: 0, zIndex: 9999, width: 220, background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, boxShadow: "0 25px 50px rgba(0,0,0,0.7)", overflow: "hidden" }}
                      >
                        {[
                          { label: "View Profile", icon: "👁", action: () => { setSelectedStudent(student); setActiveMenu(null); } },
                          { label: "Edit Student", icon: "✏️", action: () => { showToast("Edit coming soon"); setActiveMenu(null); } },
                          { label: "Export Record", icon: "⬇", action: () => exportStudent(student) },
                          { label: "Archive", icon: "📦", action: () => { showToast(`${student.name} archived`); setActiveMenu(null); } },
                        ].map((item) => (
                          <button key={item.label} onClick={item.action} style={{ width: "100%", padding: "12px 18px", background: "none", border: "none", cursor: "pointer", color: "#e2e8f0", fontSize: 13, display: "flex", alignItems: "center", gap: 10, textAlign: "left", transition: "background 0.15s" }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                            onMouseLeave={e => e.currentTarget.style.background = "none"}
                          >
                            <span>{item.icon}</span>{item.label}
                          </button>
                        ))}
                        <button onClick={() => deleteStudent(student.id)} style={{ width: "100%", padding: "12px 18px", background: "none", border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", color: "#f87171", fontSize: 13, display: "flex", alignItems: "center", gap: 10, transition: "background 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.background = "rgba(248,113,113,0.1)"}
                          onMouseLeave={e => e.currentTarget.style.background = "none"}
                        >
                          🗑 Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          )}

          {/* PAGINATION */}
          {!loading && processed.length > 0 && (
            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>

              {/* Showing X-Y of Z */}
              <span style={{ fontSize: 13, color: "#64748b" }}>
                Showing <strong style={{ color: "#e2e8f0" }}>{showFrom}–{showTo}</strong> of <strong style={{ color: "#e2e8f0" }}>{processed.length}</strong> results
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>

                {/* Rows per page */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#94a3b8" }}>
                  Rows per page:
                  <select
                    value={rowsPerPage}
                    onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "4px 8px", color: "#e2e8f0", fontSize: 13, cursor: "pointer" }}
                  >
                    {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>

                {/* Page buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button onClick={() => setCurrentPage(1)} disabled={safePage === 1} style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: safePage === 1 ? "#334155" : "#e2e8f0", cursor: safePage === 1 ? "default" : "pointer", fontSize: 13 }}>«</button>
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={safePage === 1} style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: safePage === 1 ? "#334155" : "#e2e8f0", cursor: safePage === 1 ? "default" : "pointer", fontSize: 13 }}>‹</button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                    .reduce((acc, p, idx, arr) => {
                      if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                      acc.push(p); return acc;
                    }, [])
                    .map((p, idx) => p === "..." ? (
                      <span key={`ellipsis-${idx}`} style={{ color: "#475569", fontSize: 13, padding: "0 4px" }}>…</span>
                    ) : (
                      <button key={p} onClick={() => setCurrentPage(p)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: p === safePage ? "linear-gradient(135deg,#14b8a6,#06b6d4)" : "rgba(255,255,255,0.05)", color: "#fff", cursor: "pointer", fontWeight: p === safePage ? 700 : 400, fontSize: 13 }}>{p}</button>
                    ))
                  }

                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: safePage === totalPages ? "#334155" : "#e2e8f0", cursor: safePage === totalPages ? "default" : "pointer", fontSize: 13 }}>›</button>
                  <button onClick={() => setCurrentPage(totalPages)} disabled={safePage === totalPages} style={{ padding: "6px 10px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: safePage === totalPages ? "#334155" : "#e2e8f0", cursor: safePage === totalPages ? "default" : "pointer", fontSize: 13 }}>»</button>
                </div>

                {/* Jump to page */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#94a3b8" }}>
                  Go to:
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={jumpPage}
                    onChange={(e) => setJumpPage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const p = Math.max(1, Math.min(totalPages, Number(jumpPage)));
                        setCurrentPage(p);
                        setJumpPage("");
                      }
                    }}
                    placeholder={safePage}
                    style={{ width: 52, background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "4px 8px", color: "#e2e8f0", fontSize: 13, textAlign: "center" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* PROFILE MODAL */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }} onClick={() => setSelectedStudent(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}
              style={{ width: 520, borderRadius: 32, padding: 36, background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 40px 80px rgba(0,0,0,0.7)", position: "relative" }}
            >
              <button onClick={() => setSelectedStudent(null)} style={{ position: "absolute", top: 20, right: 20, width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#14b8a6,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800 }}>
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>{selectedStudent.name}</h2>
                  <p style={{ color: "#64748b", fontSize: 14 }}>{selectedStudent.email}</p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  ["Course", selectedStudent.course],
                  ["Status", selectedStudent.status],
                  ["Badge", selectedStudent.badge],
                  ["Streak", `${selectedStudent.streak} days`],
                  ["Progress", `${selectedStudent.progress}%`],
                  ["Joined", selectedStudent.joined],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: "14px 18px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: 11, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{k}</div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "#94a3b8" }}>
                  <span>Course Progress</span><span>{selectedStudent.progress}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: "#1e293b", overflow: "hidden" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${selectedStudent.progress}%` }} transition={{ duration: 1, ease: "easeOut" }} style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg,#14b8a6,#8b5cf6)" }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      {/* TOAST */}
<AnimatePresence>
  {toast && (
    <motion.div
      initial={{
        opacity: 0,
        y: -30,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -30,
        scale: 0.9,
      }}
      transition={{
        duration: 0.25,
      }}
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 999999,

        padding: "16px 22px",
        borderRadius: 18,

        background:
          toast.type === "success"
            ? "linear-gradient(135deg,#10b981,#059669)"
            : toast.type === "error"
            ? "linear-gradient(135deg,#ef4444,#dc2626)"
            : "linear-gradient(135deg,#f59e0b,#d97706)",

        color: "#fff",

        fontWeight: 700,
        fontSize: 14,

        display: "flex",
        alignItems: "center",
        gap: 10,

        boxShadow:
          "0 20px 40px rgba(0,0,0,0.45)",

        border:
          "1px solid rgba(255,255,255,0.12)",

        backdropFilter: "blur(14px)",
      }}
    >
      <span style={{ fontSize: 18 }}>
        {toast.type === "success"
          ? "✓"
          : toast.type === "error"
          ? "✕"
          : "⚠"}
      </span>

      {toast.message}
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}
