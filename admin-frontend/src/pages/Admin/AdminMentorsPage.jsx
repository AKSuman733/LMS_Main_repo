import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Edit3,
  GraduationCap,
  Mail,
  Phone,
  Plus,
  RefreshCcw,
  Search,
  Star,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

import {
  createMentor,
  deleteMentor,
  getMentors,
  updateMentor,
} from "../../services/mentorApi";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  expertise: "",
  bio: "",
  rating: 4.5,
  status: "Active",
  imageUrl: "",
};

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchMentors = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMentors();
      setMentors(data);
    } catch (err) {
      setError(err.message || "Failed to load mentors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const searchArea = `${mentor.name} ${mentor.email} ${mentor.expertise} ${mentor.bio}`.toLowerCase();

      const matchesSearch = searchArea.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || mentor.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [mentors, search, statusFilter]);

  const totalMentors = mentors.length;
  const activeMentors = mentors.filter((mentor) => mentor.status === "Active").length;
  const inactiveMentors = mentors.filter((mentor) => mentor.status === "Inactive").length;
  const avgRating =
    mentors.length > 0
      ? (
          mentors.reduce((sum, mentor) => sum + Number(mentor.rating || 0), 0) /
          mentors.length
        ).toFixed(1)
      : "0.0";

  const openAddModal = () => {
    setEditingMentor(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const openEditModal = (mentor) => {
    setEditingMentor(mentor);
    setForm({
      name: mentor.name || "",
      email: mentor.email || "",
      phone: mentor.phone || "",
      expertise: mentor.expertise || "",
      bio: mentor.bio || "",
      rating: mentor.rating || 4.5,
      status: mentor.status || "Active",
      imageUrl: mentor.imageUrl || "",
    });
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const updateFormValue = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Mentor name is required.";
    if (!form.email.trim()) return "Mentor email is required.";
    if (!form.expertise.trim()) return "Expertise is required.";
    if (Number(form.rating) < 1 || Number(form.rating) > 5) {
      return "Rating must be between 1 and 5.";
    }

    return "";
  };

  const saveMentor = async (event) => {
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
        rating: Number(form.rating),
      };

      if (editingMentor) {
        const updatedMentor = await updateMentor(editingMentor._id, payload);

        setMentors((prev) =>
          prev.map((mentor) =>
            mentor._id === editingMentor._id ? updatedMentor : mentor
          )
        );

        setSuccess("Mentor updated successfully.");
      } else {
        const newMentor = await createMentor(payload);
        setMentors((prev) => [newMentor, ...prev]);
        setSuccess("Mentor created successfully.");
      }

      setModalOpen(false);
      setEditingMentor(null);
      setForm(emptyForm);
    } catch (err) {
      setError(err.message || "Failed to save mentor.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMentor = async (mentor) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${mentor.name}"?`
    );

    if (!confirmDelete) return;

    try {
      setError("");
      await deleteMentor(mentor._id);

      setMentors((prev) => prev.filter((item) => item._id !== mentor._id));
      setSuccess("Mentor deleted successfully.");
    } catch (err) {
      setError(err.message || "Failed to delete mentor.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-500/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-300">Admin / Mentors</p>
            <h1 className="mt-2 text-4xl font-black">Manage Mentors</h1>
            <p className="mt-2 text-slate-400">
              Add, edit, delete and manage LMS mentors from MongoDB.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchMentors}
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
              Add Mentor
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <StatCard title="Total Mentors" value={totalMentors} />
          <StatCard title="Active Mentors" value={activeMentors} />
          <StatCard title="Inactive Mentors" value={inactiveMentors} />
          <StatCard title="Average Rating" value={avgRating} />
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
              placeholder="Search mentor by name, email or expertise..."
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
            <option className="bg-slate-950">Inactive</option>
          </select>
        </div>
      </section>

      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
          <p className="mt-4 font-bold text-slate-300">Loading mentors...</p>
        </div>
      ) : filteredMentors.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <GraduationCap className="mx-auto text-slate-500" size={52} />
          <h2 className="mt-4 text-2xl font-black">No mentors found</h2>
          <p className="mt-2 text-slate-400">
            Add your first mentor or change filters.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor._id}
              mentor={mentor}
              onEdit={() => openEditModal(mentor)}
              onDelete={() => handleDeleteMentor(mentor)}
            />
          ))}
        </section>
      )}

      {modalOpen && (
        <MentorFormModal
          form={form}
          updateFormValue={updateFormValue}
          saveMentor={saveMentor}
          saving={saving}
          editingMentor={editingMentor}
          closeModal={() => setModalOpen(false)}
          error={error}
        />
      )}
    </div>
  );
}

function MentorCard({ mentor, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 transition hover:-translate-y-2 hover:border-cyan-400/40">
      <div className="relative h-36 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-6">
        <div className="flex items-start justify-between">
          {mentor.imageUrl ? (
            <img
              src={mentor.imageUrl}
              alt={mentor.name}
              className="h-20 w-20 rounded-3xl border-4 border-white/30 object-cover shadow-xl"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-4 border-white/30 bg-slate-950/40 shadow-xl backdrop-blur-xl">
              <UserRound size={38} />
            </div>
          )}

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              mentor.status === "Active"
                ? "bg-emerald-400/20 text-emerald-100"
                : "bg-red-400/20 text-red-100"
            }`}
          >
            {mentor.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-black">{mentor.name}</h2>
        <p className="mt-2 text-sm text-cyan-300">{mentor.expertise}</p>

        <p className="mt-3 min-h-[66px] text-sm leading-6 text-slate-400">
          {mentor.bio || "Mentor bio will be updated soon."}
        </p>

        <div className="mt-4 space-y-2">
          <p className="flex items-center gap-2 text-sm text-slate-300">
            <Mail size={15} className="text-cyan-300" />
            {mentor.email}
          </p>

          <p className="flex items-center gap-2 text-sm text-slate-400">
            <Phone size={15} className="text-emerald-300" />
            {mentor.phone || "Not added"}
          </p>

          <p className="flex items-center gap-2 text-sm font-bold text-yellow-300">
            <Star size={15} />
            {mentor.rating || 4.5} Rating
          </p>
        </div>

        <div className="mt-6 flex gap-2">
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

function MentorFormModal({
  form,
  updateFormValue,
  saveMentor,
  saving,
  editingMentor,
  closeModal,
  error,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      <form
        onSubmit={saveMentor}
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950 p-7 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">
              {editingMentor ? "Edit Mentor" : "Add New Mentor"}
            </h2>
            <p className="mt-2 text-slate-400">
              This form saves mentor data directly into MongoDB.
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
            label="Mentor Name"
            value={form.name}
            onChange={(v) => updateFormValue("name", v)}
            placeholder="Education Mentor"
          />

          <Input
            label="Email"
            value={form.email}
            onChange={(v) => updateFormValue("email", v)}
            placeholder="mentor@uptoskills.com"
          />

          <Input
            label="Phone"
            value={form.phone}
            onChange={(v) => updateFormValue("phone", v)}
            placeholder="+91 9876543210"
          />

          <Input
            label="Expertise"
            value={form.expertise}
            onChange={(v) => updateFormValue("expertise", v)}
            placeholder="Java, Python, AI/ML"
          />

          <Input
            label="Rating"
            value={form.rating}
            onChange={(v) => updateFormValue("rating", v)}
            placeholder="4.8"
          />

          <label className="block">
            <span className="text-sm font-bold text-slate-300">Status</span>
            <select
              value={form.status}
              onChange={(event) => updateFormValue("status", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Active</option>
              <option className="bg-slate-950">Inactive</option>
            </select>
          </label>

          <Input
            label="Image URL"
            value={form.imageUrl}
            onChange={(v) => updateFormValue("imageUrl", v)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <label className="mt-4 block">
          <span className="text-sm font-bold text-slate-300">Bio</span>
          <textarea
            value={form.bio}
            onChange={(event) => updateFormValue("bio", event.target.value)}
            rows={4}
            placeholder="Write mentor bio..."
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
              : editingMentor
              ? "Update Mentor"
              : "Save Mentor"}
          </button>
        </div>
      </form>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <GraduationCap className="text-cyan-300" size={24} />
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