import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Edit3,
  Eye,
  Mail,
  Phone,
  Plus,
  RefreshCcw,
  Search,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import DataTable from "../../components/ui/DataTable";
import { ConfirmModal } from "../../components/ui/Modal";
import { showSuccess, showError } from "../../components/ui/Toasts";

import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from "../../services/studentApi";

import { getCourses } from "../../services/courseApi";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  courseId: "",
  courseName: "",
  status: "Active",
  progress: 0,
  totalSpent: 0,
  certificateEarned: false,
  joinedDate: "",
};

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmBulkAction, setConfirmBulkAction] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message || "Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchArea = `${student.name} ${student.email} ${student.phone} ${student.courseName}`.toLowerCase();

      const matchesSearch = searchArea.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [students, search, statusFilter]);

  const totalStudents = students.length;
  const activeStudents = students.filter((student) => student.status === "Active").length;
  const pendingStudents = students.filter((student) => student.status === "Pending").length;
  const completedStudents = students.filter((student) => Number(student.progress) >= 100).length;

  const openAddModal = () => {
    setEditingStudent(null);
    setForm({
      ...emptyForm,
      joinedDate: new Date().toLocaleDateString("en-IN"),
    });
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);

    setForm({
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      courseId: student.courseId || "",
      courseName: student.courseName || "",
      status: student.status || "Active",
      progress: student.progress || 0,
      totalSpent: student.totalSpent || 0,
      certificateEarned: Boolean(student.certificateEarned),
      joinedDate: student.joinedDate || "",
    });

    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const updateFormValue = (key, value) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };

      if (key === "courseId") {
        const course = courses.find((item) => item._id === value);
        updated.courseName = course ? course.title : "";
        updated.totalSpent = course && !course.isFree ? Number(course.price || 0) : 0;
      }

      if (key === "progress") {
        const numericProgress = Number(value);
        updated.certificateEarned = numericProgress >= 100;
      }

      return updated;
    });
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Student name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!form.phone.trim()) return "Phone number is required.";
    if (!form.courseId.trim()) return "Please select enrolled course.";
    if (Number(form.progress) < 0 || Number(form.progress) > 100) {
      return "Progress must be between 0 and 100.";
    }

    return "";
  };

  const saveStudent = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...form,
        progress: Number(form.progress),
        totalSpent: Number(form.totalSpent),
      };

      if (editingStudent) {
        const updatedStudent = await updateStudent(editingStudent._id, payload);

        setStudents((prev) =>
          prev.map((student) =>
            student._id === editingStudent._id ? updatedStudent : student
          )
        );

        setSuccess("Student updated successfully.");
      } else {
        const newStudent = await createStudent(payload);
        setStudents((prev) => [newStudent, ...prev]);
        setSuccess("Student added successfully.");
      }

      setModalOpen(false);
      setEditingStudent(null);
      setForm(emptyForm);
    } catch (err) {
      setError(err.message || "Failed to save student.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStudent = async (student) => {
    // Use confirm modal instead of window.confirm
    setConfirmTarget(student);
    setConfirmAction(() => async () => {
      try {
        setError("");
        await deleteStudent(student._id);

        setStudents((prev) => prev.filter((item) => item._id !== student._id));
        setSuccess("Student deleted successfully.");
        showSuccess("Student deleted successfully.");
      } catch (err) {
        const msg = err.message || "Failed to delete student.";
        setError(msg);
        showError(msg);
      } finally {
        setConfirmTarget(null);
        setConfirmAction(null);
      }
    });
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    try {
      for (const id of selectedIds) {
        await deleteStudent(id);
      }
      setStudents((prev) => prev.filter((s) => !selectedIds.includes(s._id)));
      setSelectedIds([]);
      showSuccess(`${selectedIds.length} students deleted`);
    } catch (err) {
      const msg = err.message || "Failed to delete selected students.";
      setError(msg);
      showError(msg);
    } finally {
      setConfirmBulkAction(null);
    }
  };

  const handleArchiveStudents = async (ids) => {
    try {
      const updated = await Promise.all(
        ids.map((id) => updateStudent(id, { status: "Blocked" }))
      );
      setStudents((prev) =>
        prev.map((student) =>
          updated.find((item) => item._id === student._id) || student
        )
      );
      setSelectedIds([]);
      showSuccess(`${ids.length} student${ids.length === 1 ? "" : "s"} archived.`);
    } catch (err) {
      const msg = err.message || "Failed to archive students.";
      setError(msg);
      showError(msg);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-500/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-300">Admin / Students</p>
            <h1 className="mt-2 text-4xl font-black">Manage Students</h1>
            <p className="mt-2 text-slate-400">
              Add, edit and manage students with enrolled course and progress.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                fetchStudents();
                fetchCourses();
              }}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              <RefreshCcw size={18} />
              Refresh
            </button>

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-300"
            >
              <Plus size={20} />
              Add Student
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard title="Total Students" value={totalStudents} />
          <StatCard title="Active Students" value={activeStudents} />
          <StatCard title="Pending Students" value={pendingStudents} />
          <StatCard title="Completed" value={completedStudents} />
        </div>

        {(error || success) && (
          <div
            className={`mt-6 flex items-start gap-3 rounded-2xl border p-4 ${
              error
                ? "border-red-400/30 bg-red-400/10 text-red-300"
                : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            }`}
          >
            {error ? <AlertCircle /> : <CheckCircle2 />}
            <p className="font-semibold">{error || success}</p>
          </div>
        )}

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3">
            <Search size={18} className="text-cyan-300" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search students by name, email, phone or course..."
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option className="bg-slate-950">All</option>
            <option className="bg-slate-950">Active</option>
            <option className="bg-slate-950">Pending</option>
            <option className="bg-slate-950">Blocked</option>
          </select>
        </div>
      </section>

      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
          <p className="mt-4 font-bold text-slate-300">Loading students...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <Users className="mx-auto text-slate-500" size={52} />
          <h2 className="mt-4 text-2xl font-black">No students found</h2>
          <p className="mt-2 text-slate-400">Add your first student or change filters.</p>
        </div>
      ) : (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => { if (selectedIds.length) setConfirmBulkAction('delete'); }} disabled={!selectedIds.length} className="px-3 py-2 rounded bg-red-600 text-white disabled:opacity-40">Delete Selected</button>
            </div>
            <div className="text-sm text-gray-400">{selectedIds.length} selected</div>
          </div>

          <DataTable
            columns={[
              { key: 'name', label: 'Student', accessor: 'name', sortable: true, render: (r) => r.name },
              { key: 'contact', label: 'Contact', accessor: 'email' , render: (r) => (<div><div>{r.email}</div><div className="text-xs text-gray-400">{r.phone}</div></div>)},
              { key: 'course', label: 'Course', accessor: 'courseName' },
              { key: 'progress', label: 'Progress', accessor: 'progress', sortable: true, render: (r)=>(<div className="w-44"><div className="flex justify-between text-xs"><span className="text-gray-400">Progress</span><span className="font-bold text-cyan-300">{r.progress}%</span></div><div className="mt-2 h-2 rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{width: `${r.progress}%`}}/></div></div>)},
              { key: 'spent', label: 'Spent', accessor: 'totalSpent', render: (r) => `₹${r.totalSpent || 0}` },
              { key: 'certificate', label: 'Certificate', accessor: 'certificateEarned', render: (r) => r.certificateEarned ? 'Earned' : 'Not Yet' },
              { key: 'status', label: 'Status', accessor: 'status' },
            ]}
            data={filteredStudents}
            rowKey="_id"
            onEdit={(r)=> openEditModal(r)}
            onDelete={(r)=> handleDeleteStudent(r)}
            onBulkDelete={() => setConfirmBulkAction('delete')}
            onArchive={handleArchiveStudents}
            onSelectionChange={(ids)=> setSelectedIds(ids)}
          />
        </div>
      )}

      {modalOpen && (
        <StudentFormModal
          form={form}
          courses={courses}
          updateFormValue={updateFormValue}
          saveStudent={saveStudent}
          saving={saving}
          editingStudent={editingStudent}
          closeModal={() => setModalOpen(false)}
          error={error}
        />
      )}
      {confirmTarget && (
        <ConfirmModal
          open={!!confirmTarget}
          title="Delete Student"
          message={`Are you sure you want to delete "${confirmTarget.name}"?`}
          onConfirm={() => confirmAction && confirmAction()}
          onCancel={() => { setConfirmTarget(null); setConfirmAction(null); }}
        />
      )}

      {confirmBulkAction && (
        <ConfirmModal
          open={!!confirmBulkAction}
          title="Delete Selected"
          message={`Are you sure you want to delete ${selectedIds.length} selected students?`}
          onConfirm={handleBulkDelete}
          onCancel={() => setConfirmBulkAction(null)}
        />
      )}
    </div>
  );
}

function StudentFormModal({
  form,
  courses,
  updateFormValue,
  saveStudent,
  saving,
  editingStudent,
  closeModal,
  error,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      <form
        onSubmit={saveStudent}
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950 p-7 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">
              {editingStudent ? "Edit Student" : "Add New Student"}
            </h2>
            <p className="mt-2 text-slate-400">
              Select course, set progress and manage certificate status.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="rounded-full bg-red-500 p-3 text-white"
          >
            <X />
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
            {error}
          </div>
        )}

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <Input
            label="Student Name"
            value={form.name}
            onChange={(v) => updateFormValue("name", v)}
            placeholder="Charv Raj"
          />

          <Input
            label="Email"
            value={form.email}
            onChange={(v) => updateFormValue("email", v)}
            placeholder="student@example.com"
          />

          <Input
            label="Phone"
            value={form.phone}
            onChange={(v) => updateFormValue("phone", v)}
            placeholder="+91 9876543210"
          />

          <Input
            label="Joined Date"
            value={form.joinedDate}
            onChange={(v) => updateFormValue("joinedDate", v)}
            placeholder="28 May 2026"
          />

          <label className="block">
            <span className="text-sm font-bold text-slate-300">
              Enrolled Course
            </span>

            <select
              value={form.courseId}
              onChange={(event) => updateFormValue("courseId", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="" className="bg-slate-950">
                Select course
              </option>

              {courses.map((course) => (
                <option key={course._id} value={course._id} className="bg-slate-950">
                  {course.title} — {course.isFree ? "Free" : `₹${course.price}`}
                </option>
              ))}
            </select>
          </label>

          <Input
            label="Total Spent"
            value={form.totalSpent}
            onChange={(v) => updateFormValue("totalSpent", v)}
            placeholder="499"
          />

          <Input
            label="Progress %"
            value={form.progress}
            onChange={(v) => updateFormValue("progress", v)}
            placeholder="65"
          />

          <label className="block">
            <span className="text-sm font-bold text-slate-300">Status</span>

            <select
              value={form.status}
              onChange={(event) => updateFormValue("status", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Active</option>
              <option className="bg-slate-950">Pending</option>
              <option className="bg-slate-950">Blocked</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-300">
              Certificate Earned
            </span>

            <select
              value={form.certificateEarned ? "Yes" : "No"}
              onChange={(event) =>
                updateFormValue("certificateEarned", event.target.value === "Yes")
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">No</option>
              <option className="bg-slate-950">Yes</option>
            </select>
          </label>
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-xl border border-white/10 px-6 py-3 font-bold text-slate-300"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            className="rounded-xl bg-cyan-400 px-6 py-3 font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : editingStudent
              ? "Update Student"
              : "Save Student"}
          </button>
        </div>
      </form>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <Users className="text-cyan-300" size={24} />
      <h3 className="mt-3 text-2xl font-black">{value}</h3>
      <p className="text-sm text-slate-400">{title}</p>
    </div>
  );
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-300">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
      />
    </label>
  );
}
