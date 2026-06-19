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

import DataTable from "../../components/ui/DataTable";
import { ConfirmModal } from "../../components/ui/Modal";
import { showSuccess, showError } from "../../components/ui/Toasts";

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
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmBulkAction, setConfirmBulkAction] = useState(null);

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
    setConfirmTarget(registration);
    setConfirmAction(() => async () => {
      try {
        setError("");
        await deleteEventRegistration(registration._id);

        setRegistrations((prev) => prev.filter((item) => item._id !== registration._id));

        setSuccess("Registration deleted successfully.");
        showSuccess("Registration deleted successfully.");
        await fetchEvents();
      } catch (err) {
        const msg = err.message || "Failed to delete registration.";
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
        await deleteEventRegistration(id);
      }
      setRegistrations((prev) => prev.filter((r) => !selectedIds.includes(r._id)));
      showSuccess(`${selectedIds.length} registrations deleted`);
      setSelectedIds([]);
      await fetchEvents();
    } catch (err) {
      const msg = err.message || "Failed to delete selected registrations.";
      setError(msg);
      showError(msg);
    } finally {
      setConfirmBulkAction(null);
    }
  };

  const handleArchiveRegistrations = async (ids) => {
    try {
      const updated = await Promise.all(
        ids.map((id) => updateEventRegistration(id, { status: "Cancelled" }))
      );
      setRegistrations((prev) =>
        prev.map((registration) =>
          updated.find((item) => item._id === registration._id) || registration
        )
      );
      setSelectedIds([]);
      showSuccess(`${ids.length} registration${ids.length === 1 ? "" : "s"} archived.`);
    } catch (err) {
      const msg = err.message || "Failed to archive registrations.";
      setError(msg);
      showError(msg);
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
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => { if (selectedIds.length) setConfirmBulkAction('delete'); }} disabled={!selectedIds.length} className="px-3 py-2 rounded bg-red-600 text-white disabled:opacity-40">Delete Selected</button>
            </div>
            <div className="text-sm text-gray-400">{selectedIds.length} selected</div>
          </div>

          <DataTable
            columns={[
              { key: 'student', label: 'Student', accessor: 'studentName', render: (r) => r.studentName },
              { key: 'event', label: 'Event', accessor: 'eventTitle' },
              { key: 'contact', label: 'Contact', accessor: 'email', render: (r)=>(<div><div>{r.email}</div><div className="text-xs text-gray-400">{r.phone}</div></div>)},
              { key: 'attendance', label: 'Attendance', accessor: 'attendance' },
              { key: 'certificate', label: 'Certificate', accessor: 'certificateEligible', render: (r)=> r.certificateEligible ? 'Eligible' : 'Not Eligible' },
              { key: 'status', label: 'Status', accessor: 'status' },
            ]}
            data={filteredRegistrations}
            rowKey="_id"
            onEdit={(r)=> openEditModal(r)}
            onDelete={(r)=> handleDeleteRegistration(r)}
            onBulkDelete={() => setConfirmBulkAction('delete')}
            onArchive={handleArchiveRegistrations}
            onSelectionChange={(ids)=> setSelectedIds(ids)}
            actions={{
              markPresent: (r) => markAttendance(r, 'Present'),
              markAbsent: (r) => markAttendance(r, 'Absent'),
            }}
          />
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
      {confirmTarget && (
        <ConfirmModal
          open={!!confirmTarget}
          title="Delete Registration"
          message={`Are you sure you want to delete registration of "${confirmTarget.studentName}"?`}
          onConfirm={() => confirmAction && confirmAction()}
          onCancel={() => { setConfirmTarget(null); setConfirmAction(null); }}
        />
      )}

      {confirmBulkAction && (
        <ConfirmModal
          open={!!confirmBulkAction}
          title="Delete Selected"
          message={`Are you sure you want to delete ${selectedIds.length} selected registrations?`}
          onConfirm={handleBulkDelete}
          onCancel={() => setConfirmBulkAction(null)}
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
