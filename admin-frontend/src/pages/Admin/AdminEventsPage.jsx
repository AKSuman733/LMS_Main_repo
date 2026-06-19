import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Edit3,
  Link as LinkIcon,
  MapPin,
  Plus,
  RefreshCcw,
  Search,
  Trash2,
  Users,
  Video,
  X,
} from "lucide-react";

import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../../services/eventApi";

const emptyForm = {
  title: "",
  description: "",
  category: "",
  eventDate: "",
  eventTime: "",
  mode: "Online",
  location: "",
  speaker: "",
  maxSeats: 100,
  registeredCount: 0,
  certificateIncluded: true,
  attendanceRequired: true,
  status: "Upcoming",
  bannerUrl: "",
  meetingLink: "",
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setError(err.message || "Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const searchArea = `${event.title} ${event.description} ${event.category} ${event.speaker} ${event.location}`.toLowerCase();

      const matchesSearch = searchArea.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || event.status === statusFilter;

      const matchesMode = modeFilter === "All" || event.mode === modeFilter;

      return matchesSearch && matchesStatus && matchesMode;
    });
  }, [events, search, statusFilter, modeFilter]);

  const totalEvents = events.length;
  const upcomingEvents = events.filter((event) => event.status === "Upcoming").length;
  const completedEvents = events.filter((event) => event.status === "Completed").length;
  const totalRegistrations = events.reduce(
    (sum, event) => sum + Number(event.registeredCount || 0),
    0
  );

  const openAddModal = () => {
    setEditingEvent(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);

    setForm({
      title: event.title || "",
      description: event.description || "",
      category: event.category || "",
      eventDate: event.eventDate || "",
      eventTime: event.eventTime || "",
      mode: event.mode || "Online",
      location: event.location || "",
      speaker: event.speaker || "",
      maxSeats: event.maxSeats || 100,
      registeredCount: event.registeredCount || 0,
      certificateIncluded: Boolean(event.certificateIncluded),
      attendanceRequired: Boolean(event.attendanceRequired),
      status: event.status || "Upcoming",
      bannerUrl: event.bannerUrl || "",
      meetingLink: event.meetingLink || "",
    });

    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const updateFormValue = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Event title is required.";
    if (!form.description.trim()) return "Event description is required.";
    if (!form.category.trim()) return "Event category is required.";
    if (!form.eventDate.trim()) return "Event date is required.";
    if (!form.eventTime.trim()) return "Event time is required.";
    if (Number(form.maxSeats) <= 0) return "Max seats must be greater than 0.";
    if (Number(form.registeredCount) < 0) {
      return "Registered count cannot be negative.";
    }
    if (Number(form.registeredCount) > Number(form.maxSeats)) {
      return "Registered count cannot be greater than max seats.";
    }

    return "";
  };

  const saveEvent = async (event) => {
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
        maxSeats: Number(form.maxSeats),
        registeredCount: Number(form.registeredCount),
      };

      if (editingEvent) {
        const updatedEvent = await updateEvent(editingEvent._id, payload);

        setEvents((prev) =>
          prev.map((item) =>
            item._id === editingEvent._id ? updatedEvent : item
          )
        );

        setSuccess("Event updated successfully.");
      } else {
        const newEvent = await createEvent(payload);

        setEvents((prev) => [newEvent, ...prev]);
        setSuccess("Event created successfully.");
      }

      setModalOpen(false);
      setEditingEvent(null);
      setForm(emptyForm);
    } catch (err) {
      setError(err.message || "Failed to save event.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEvent = async (event) => {
    setConfirmTarget(event);
    setConfirmAction(() => async () => {
      try {
        setError("");
        await deleteEvent(event._id);

        setEvents((prev) => prev.filter((item) => item._id !== event._id));
        setSuccess("Event deleted successfully.");
        showSuccess("Event deleted successfully.");
      } catch (err) {
        const msg = err.message || "Failed to delete event.";
        setError(msg);
        showError(msg);
      } finally {
        setConfirmTarget(null);
        setConfirmAction(null);
      }
    });
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-500/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-300">Admin / Events</p>
            <h1 className="mt-2 text-4xl font-black">Manage Events</h1>
            <p className="mt-2 text-slate-400">
              Create workshops, webinars, competitions and certificate-based events.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchEvents}
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
              Create Event
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard title="Total Events" value={totalEvents} />
          <StatCard title="Upcoming" value={upcomingEvents} />
          <StatCard title="Completed" value={completedEvents} />
          <StatCard title="Registrations" value={totalRegistrations} />
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

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px_220px]">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3">
            <Search size={18} className="text-cyan-300" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, speaker, category or location..."
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option className="bg-slate-950">All</option>
            <option className="bg-slate-950">Upcoming</option>
            <option className="bg-slate-950">Ongoing</option>
            <option className="bg-slate-950">Completed</option>
            <option className="bg-slate-950">Cancelled</option>
          </select>

          <select
            value={modeFilter}
            onChange={(event) => setModeFilter(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option className="bg-slate-950">All</option>
            <option className="bg-slate-950">Online</option>
            <option className="bg-slate-950">Offline</option>
            <option className="bg-slate-950">Hybrid</option>
          </select>
        </div>
      </section>

      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
          <p className="mt-4 font-bold text-slate-300">Loading events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <CalendarDays className="mx-auto text-slate-500" size={52} />
          <h2 className="mt-4 text-2xl font-black">No events found</h2>
          <p className="mt-2 text-slate-400">
            Create your first event or change filters.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onEdit={() => openEditModal(event)}
              onDelete={() => handleDeleteEvent(event)}
            />
          ))}
        </section>
      )}

      {modalOpen && (
        <EventFormModal
          form={form}
          updateFormValue={updateFormValue}
          saveEvent={saveEvent}
          saving={saving}
          editingEvent={editingEvent}
          closeModal={() => setModalOpen(false)}
          error={error}
        />
      )}
    </div>
  );
}

function EventCard({ event, onEdit, onDelete }) {
  const seatPercent =
    Number(event.maxSeats) > 0
      ? Math.min(
          100,
          Math.round((Number(event.registeredCount || 0) / Number(event.maxSeats)) * 100)
        )
      : 0;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 transition hover:-translate-y-2 hover:border-cyan-400/40">
      {event.bannerUrl ? (
        <img
          src={event.bannerUrl}
          alt={event.title}
          className="h-40 w-full object-cover"
        />
      ) : (
        <div className="h-40 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-6">
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">
              <CalendarDays size={30} />
            </div>

            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-xl">
              {event.mode}
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black">{event.title}</h2>
            <p className="mt-2 text-sm text-cyan-300">
              {event.category} • {event.speaker || "Speaker TBA"}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
              event.status === "Upcoming"
                ? "bg-cyan-400/10 text-cyan-300"
                : event.status === "Ongoing"
                ? "bg-emerald-400/10 text-emerald-300"
                : event.status === "Completed"
                ? "bg-purple-400/10 text-purple-300"
                : "bg-red-400/10 text-red-300"
            }`}
          >
            {event.status}
          </span>
        </div>

        <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">
          {event.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Info label="Date" value={event.eventDate} />
          <Info label="Time" value={event.eventTime} />
          <Info label="Certificate" value={event.certificateIncluded ? "Yes" : "No"} />
          <Info label="Attendance" value={event.attendanceRequired ? "Required" : "Optional"} />
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Seats Filled</span>
            <span className="font-bold text-cyan-300">
              {event.registeredCount}/{event.maxSeats}
            </span>
          </div>

          <div className="mt-2 h-2 rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{ width: `${seatPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
          <MapPin size={16} className="text-cyan-300" />
          {event.mode === "Online"
            ? "Online Event"
            : event.location || "Location not added"}
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => {
              if (!event.meetingLink) {
                alert("Meeting link not added.");
                return;
              }

              window.open(event.meetingLink, "_blank");
            }}
            className="flex-1 rounded-xl bg-cyan-400/10 px-4 py-3 font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
          >
            <Video size={18} className="mx-auto" />
          </button>

          <button
            onClick={onEdit}
            className="flex-1 rounded-xl bg-orange-400/10 px-4 py-3 font-bold text-orange-300 transition hover:bg-orange-400 hover:text-slate-950"
          >
            <Edit3 size={18} className="mx-auto" />
          </button>

          <button
            onClick={onDelete}
            className="flex-1 rounded-xl bg-red-500/10 px-4 py-3 font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={18} className="mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}

function EventFormModal({
  form,
  updateFormValue,
  saveEvent,
  saving,
  editingEvent,
  closeModal,
  error,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      <form
        onSubmit={saveEvent}
        className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950 p-7 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">
              {editingEvent ? "Edit Event" : "Create New Event"}
            </h2>
            <p className="mt-2 text-slate-400">
              Manage event details, seats, attendance and certificate settings.
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
            label="Event Title"
            value={form.title}
            onChange={(v) => updateFormValue("title", v)}
            placeholder="AI Career Webinar"
          />

          <Input
            label="Category"
            value={form.category}
            onChange={(v) => updateFormValue("category", v)}
            placeholder="Webinar / Workshop / Competition"
          />

          <Input
            label="Event Date"
            value={form.eventDate}
            onChange={(v) => updateFormValue("eventDate", v)}
            placeholder="28 May 2026"
          />

          <Input
            label="Event Time"
            value={form.eventTime}
            onChange={(v) => updateFormValue("eventTime", v)}
            placeholder="8:00 PM"
          />

          <Input
            label="Speaker"
            value={form.speaker}
            onChange={(v) => updateFormValue("speaker", v)}
            placeholder="Speaker name"
          />

          <label className="block">
            <span className="text-sm font-bold text-slate-300">Mode</span>

            <select
              value={form.mode}
              onChange={(event) => updateFormValue("mode", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Online</option>
              <option className="bg-slate-950">Offline</option>
              <option className="bg-slate-950">Hybrid</option>
            </select>
          </label>

          <Input
            label="Location"
            value={form.location}
            onChange={(v) => updateFormValue("location", v)}
            placeholder="JNU Jaipur / Online"
          />

          <Input
            label="Meeting Link"
            value={form.meetingLink}
            onChange={(v) => updateFormValue("meetingLink", v)}
            placeholder="https://meet.google.com/..."
          />

          <Input
            label="Max Seats"
            value={form.maxSeats}
            onChange={(v) => updateFormValue("maxSeats", v)}
            placeholder="100"
          />

          <Input
            label="Registered Count"
            value={form.registeredCount}
            onChange={(v) => updateFormValue("registeredCount", v)}
            placeholder="0"
          />

          <label className="block">
            <span className="text-sm font-bold text-slate-300">
              Certificate Included
            </span>

            <select
              value={form.certificateIncluded ? "Yes" : "No"}
              onChange={(event) =>
                updateFormValue("certificateIncluded", event.target.value === "Yes")
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Yes</option>
              <option className="bg-slate-950">No</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-300">
              Attendance Required
            </span>

            <select
              value={form.attendanceRequired ? "Yes" : "No"}
              onChange={(event) =>
                updateFormValue("attendanceRequired", event.target.value === "Yes")
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Yes</option>
              <option className="bg-slate-950">No</option>
            </select>
          </label>

          <Input
            label="Banner Image URL"
            value={form.bannerUrl}
            onChange={(v) => updateFormValue("bannerUrl", v)}
            placeholder="https://example.com/banner.jpg"
          />

          <label className="block">
            <span className="text-sm font-bold text-slate-300">Status</span>

            <select
              value={form.status}
              onChange={(event) => updateFormValue("status", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Upcoming</option>
              <option className="bg-slate-950">Ongoing</option>
              <option className="bg-slate-950">Completed</option>
              <option className="bg-slate-950">Cancelled</option>
            </select>
          </label>
        </div>

        <label className="mt-4 block">
          <span className="text-sm font-bold text-slate-300">Description</span>

          <textarea
            value={form.description}
            onChange={(event) => updateFormValue("description", event.target.value)}
            rows={4}
            placeholder="Write event description..."
            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
          />
        </label>

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
              : editingEvent
              ? "Update Event"
              : "Save Event"}
          </button>
        </div>
      </form>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <CalendarDays className="text-cyan-300" size={24} />
      <h3 className="mt-3 text-2xl font-black">{value}</h3>
      <p className="text-sm text-slate-400">{title}</p>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-950/70 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 truncate font-bold text-slate-200">{value}</p>
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