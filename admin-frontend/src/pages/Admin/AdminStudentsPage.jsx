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
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${student.name}"?`
    );

    if (!confirmDelete) return;

    try {
      setError("");
      await deleteStudent(student._id);

      setStudents((prev) => prev.filter((item) => item._id !== student._id));
      setSuccess("Student deleted successfully.");
    } catch (err) {
      setError(err.message || "Failed to delete student.");
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
          <p className="mt-2 text-slate-400">
            Add your first student or change filters.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-white/5 text-sm text-slate-400">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4">Spent</th>
                  <th className="p-4">Certificate</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="border-t border-white/10 transition hover:bg-white/5"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 font-black text-slate-950">
                          {student.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-black">{student.name}</p>
                          <p className="text-xs text-slate-500">
                            Joined: {student.joinedDate || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <p className="flex items-center gap-2 text-sm text-slate-300">
                        <Mail size={14} className="text-cyan-300" />
                        {student.email}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                        <Phone size={14} className="text-emerald-300" />
                        {student.phone}
                      </p>
                    </td>

                    <td className="p-4">
                      <p className="flex items-center gap-2 font-bold text-cyan-300">
                        <BookOpen size={16} />
                        {student.courseName || "No course"}
                      </p>
                    </td>

                    <td className="p-4">
                      <div className="w-44">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Progress</span>
                          <span className="font-bold text-cyan-300">
                            {student.progress}%
                          </span>
                        </div>

                        <div className="mt-2 h-2 rounded-full bg-slate-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-bold text-emerald-300">
                      ₹{student.totalSpent || 0}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          student.certificateEarned
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {student.certificateEarned ? "Earned" : "Not Yet"}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          student.status === "Active"
                            ? "bg-emerald-400/10 text-emerald-300"
                            : student.status === "Pending"
                            ? "bg-orange-400/10 text-orange-300"
                            : "bg-red-400/10 text-red-300"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            alert(
                              `${student.name}\n${student.email}\n${student.courseName}\nProgress: ${student.progress}%`
                            )
                          }
                          className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => openEditModal(student)}
                          className="rounded-xl bg-orange-400/10 p-3 text-orange-300 transition hover:bg-orange-400 hover:text-slate-950"
                        >
                          <Edit3 size={17} />
                        </button>

                        <button
                          onClick={() => handleDeleteStudent(student)}
                          className="rounded-xl bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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