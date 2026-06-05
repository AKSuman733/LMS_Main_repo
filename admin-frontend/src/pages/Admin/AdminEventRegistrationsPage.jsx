import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Award,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Edit3,
  Mail,
  Phone,
  Plus,
  RefreshCcw,
  Search,
  Trash2,
  UserCheck,
  Users,
  X,
} from "lucide-react";

import { getEvents } from "../../services/eventApi";
import {
  createEventRegistration,
  deleteEventRegistration,
  getEventRegistrations,
  updateEventRegistration,
} from "../../services/eventRegistrationApi";

const emptyForm = {
  eventId: "",
  studentName: "",
  email: "",
  phone: "",
  attendance: "Pending",
  status: "Registered",
};

export default function AdminEventRegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRegistration, setEditingRegistration] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEventRegistrations();
      setRegistrations(data);
    } catch (err) {
      setError(err.message || "Failed to load registrations.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  useEffect(() => {
    fetchRegistrations();
    fetchEvents();
  }, []);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((registration) => {
      const searchArea = `${registration.studentName} ${registration.email} ${registration.phone} ${registration.eventTitle}`.toLowerCase();

      const matchesSearch = searchArea.includes(search.toLowerCase());

      const matchesAttendance =
        attendanceFilter === "All" || registration.attendance === attendanceFilter;

      return matchesSearch && matchesAttendance;
    });
  }, [registrations, search, attendanceFilter]);

  const totalRegistrations = registrations.length;
  const presentCount = registrations.filter((item) => item.attendance === "Present").length;
  const pendingCount = registrations.filter((item) => item.attendance === "Pending").length;
  const eligibleCount = registrations.filter((item) => item.certificateEligible).length;

  const openAddModal = () => {
    setEditingRegistration(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const openEditModal = (registration) => {
    setEditingRegistration(registration);

    setForm({
      eventId: registration.eventId || "",
      studentName: registration.studentName || "",
      email: registration.email || "",
      phone: registration.phone || "",
      attendance: registration.attendance || "Pending",
      status: registration.status || "Registered",
    });

    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const updateFormValue = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    if (!form.eventId.trim()) return "Please select an event.";
    if (!form.studentName.trim()) return "Student name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!form.phone.trim()) return "Phone number is required.";

    return "";
  };

  const saveRegistration = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingRegistration) {
        const updatedRegistration = await updateEventRegistration(
          editingRegistration._id,
          form
        );

        setRegistrations((prev) =>
          prev.map((item) =>
            item._id === editingRegistration._id ? updatedRegistration : item
          )
        );

        setSuccess("Registration updated successfully.");
      } else {
        const newRegistration = await createEventRegistration(form);

        setRegistrations((prev) => [newRegistration, ...prev]);
        setSuccess("Student registered successfully.");

        await fetchEvents();
      }

      setModalOpen(false);
      setEditingRegistration(null);
      setForm(emptyForm);
    } catch (err) {
      setError(err.message || "Failed to save registration.");
    } finally {
      setSaving(false);
    }
  };

  const markAttendance = async (registration, attendance) => {
    try {
      setError("");

      const updatedRegistration = await updateEventRegistration(registration._id, {
        attendance,
      });

      setRegistrations((prev) =>
        prev.map((item) =>
          item._id === registration._id ? updatedRegistration : item
        )
      );

      setSuccess(
        attendance === "Present"
          ? "Attendance marked Present and certificate eligibility updated."
          : "Attendance marked Absent."
      );
    } catch (err) {
      setError(err.message || "Failed to update attendance.");
    }
  };

  const handleDeleteRegistration = async (registration) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete registration of "${registration.studentName}"?`
    );

    if (!confirmDelete) return;

    try {
      setError("");
      await deleteEventRegistration(registration._id);

      setRegistrations((prev) =>
        prev.filter((item) => item._id !== registration._id)
      );

      setSuccess("Registration deleted successfully.");
      await fetchEvents();
    } catch (err) {
      setError(err.message || "Failed to delete registration.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-500/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-300">Admin / Event Registrations</p>
            <h1 className="mt-2 text-4xl font-black">
              Registrations & Attendance
            </h1>
            <p className="mt-2 text-slate-400">
              Register students, mark attendance, and auto-generate certificate eligibility.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                fetchRegistrations();
                fetchEvents();
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
              Register Student
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard title="Total Registrations" value={totalRegistrations} icon={Users} />
          <StatCard title="Present" value={presentCount} icon={UserCheck} />
          <StatCard title="Pending" value={pendingCount} icon={ClipboardCheck} />
          <StatCard title="Certificate Eligible" value={eligibleCount} icon={Award} />
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
              placeholder="Search by student, email, phone or event..."
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <select
            value={attendanceFilter}
            onChange={(event) => setAttendanceFilter(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option className="bg-slate-950">All</option>
            <option className="bg-slate-950">Pending</option>
            <option className="bg-slate-950">Present</option>
            <option className="bg-slate-950">Absent</option>
          </select>
        </div>
      </section>

      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
          <p className="mt-4 font-bold text-slate-300">Loading registrations...</p>
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <CalendarDays className="mx-auto text-slate-500" size={52} />
          <h2 className="mt-4 text-2xl font-black">No registrations found</h2>
          <p className="mt-2 text-slate-400">
            Register a student for an event or change filters.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="bg-white/5 text-sm text-slate-400">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Event</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Attendance</th>
                  <th className="p-4">Certificate</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRegistrations.map((registration) => (
                  <tr
                    key={registration._id}
                    className="border-t border-white/10 transition hover:bg-white/5"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 font-black text-slate-950">
                          {registration.studentName
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-black">{registration.studentName}</p>
                          <p className="text-xs text-slate-500">
                            ID: {registration._id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <p className="font-bold text-cyan-300">
                        {registration.eventTitle}
                      </p>
                    </td>

                    <td className="p-4">
                      <p className="flex items-center gap-2 text-sm text-slate-300">
                        <Mail size={14} className="text-cyan-300" />
                        {registration.email}
                      </p>

                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                        <Phone size={14} className="text-emerald-300" />
                        {registration.phone}
                      </p>
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          registration.attendance === "Present"
                            ? "bg-emerald-400/10 text-emerald-300"
                            : registration.attendance === "Absent"
                            ? "bg-red-400/10 text-red-300"
                            : "bg-orange-400/10 text-orange-300"
                        }`}
                      >
                        {registration.attendance}
                      </span>
                    </td>

                    <td className="p-4">
                      {registration.certificateEligible ? (
                        <div>
                          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                            Eligible
                          </span>
                          <p className="mt-2 text-xs text-slate-400">
                            {registration.certificateNumber}
                          </p>
                        </div>
                      ) : (
                        <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-bold text-slate-300">
                          Not Eligible
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          registration.status === "Registered"
                            ? "bg-cyan-400/10 text-cyan-300"
                            : "bg-red-400/10 text-red-300"
                        }`}
                      >
                        {registration.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => markAttendance(registration, "Present")}
                          className="rounded-xl bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-300 transition hover:bg-emerald-400 hover:text-slate-950"
                        >
                          Present
                        </button>

                        <button
                          onClick={() => markAttendance(registration, "Absent")}
                          className="rounded-xl bg-red-400/10 px-3 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500 hover:text-white"
                        >
                          Absent
                        </button>

                        <button
                          onClick={() => openEditModal(registration)}
                          className="rounded-xl bg-orange-400/10 p-3 text-orange-300 transition hover:bg-orange-400 hover:text-slate-950"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          onClick={() => handleDeleteRegistration(registration)}
                          className="rounded-xl bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={16} />
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
        <RegistrationFormModal
          form={form}
          events={events}
          updateFormValue={updateFormValue}
          saveRegistration={saveRegistration}
          saving={saving}
          editingRegistration={editingRegistration}
          closeModal={() => setModalOpen(false)}
          error={error}
        />
      )}
    </div>
  );
}

function RegistrationFormModal({
  form,
  events,
  updateFormValue,
  saveRegistration,
  saving,
  editingRegistration,
  closeModal,
  error,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      <form
        onSubmit={saveRegistration}
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950 p-7 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">
              {editingRegistration ? "Edit Registration" : "Register Student"}
            </h2>
            <p className="mt-2 text-slate-400">
              Select event and add student details.
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
          <label className="block md:col-span-2">
            <span className="text-sm font-bold text-slate-300">Select Event</span>

            <select
              value={form.eventId}
              disabled={Boolean(editingRegistration)}
              onChange={(event) => updateFormValue("eventId", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" className="bg-slate-950">
                Choose event
              </option>

              {events.map((event) => (
                <option key={event._id} value={event._id} className="bg-slate-950">
                  {event.title} — {event.eventDate} — {event.status}
                </option>
              ))}
            </select>
          </label>

          <Input
            label="Student Name"
            value={form.studentName}
            onChange={(v) => updateFormValue("studentName", v)}
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

          <label className="block">
            <span className="text-sm font-bold text-slate-300">Attendance</span>

            <select
              value={form.attendance}
              onChange={(event) => updateFormValue("attendance", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Pending</option>
              <option className="bg-slate-950">Present</option>
              <option className="bg-slate-950">Absent</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-300">Status</span>

            <select
              value={form.status}
              onChange={(event) => updateFormValue("status", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Registered</option>
              <option className="bg-slate-950">Cancelled</option>
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
              : editingRegistration
              ? "Update Registration"
              : "Save Registration"}
          </button>
        </div>
      </form>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <Icon className="text-cyan-300" size={24} />
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