import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Edit3,
  Plus,
  RefreshCcw,
  Search,
  Trash2,
  Video,
  X,
} from "lucide-react";

import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../../services/courseApi";

import { getMentors } from "../../services/mentorApi";

const emptyTopic = {
  title: "",
  description: "",
  duration: "",
  videoUrl: "",
  order: 1,
  subTopics: [],
};

const emptySubTopic = {
  title: "",
  description: "",
  duration: "",
  videoUrl: "",
  order: 1,
};

const emptyForm = {
  title: "",
  description: "",
  category: "",
  level: "Beginner",
  duration: "",
  isFree: true,
  price: "0",
  mentorId: "",
  mentorName: "",
  certificateIncluded: true,
  status: "Active",
  videoUrl: "",
  thumbnailUrl: "",
  curriculum: [],
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCourses();
      setCourses(data || []);
    } catch (err) {
      setError(err.message || "Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMentors = async () => {
    try {
      const data = await getMentors();
      setMentors(data || []);
    } catch (err) {
      console.error("Failed to load mentors:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchMentors();
  }, []);

  const categories = useMemo(() => {
    const unique = [
      ...new Set(courses.map((course) => course.category).filter(Boolean)),
    ];

    return ["All", ...unique];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const searchArea = `${course.title || ""} ${course.description || ""} ${
        course.category || ""
      } ${course.level || ""}`.toLowerCase();

      const matchesSearch = searchArea.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || course.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" || course.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [courses, search, statusFilter, categoryFilter]);

  const getMentorName = (mentorId, mentorName = "") => {
    if (mentorName) return mentorName;

    const id =
      typeof mentorId === "object" && mentorId !== null ? mentorId._id : mentorId;

    const mentor = mentors.find((item) => item._id === id);

    if (mentor) return mentor.name;

    if (typeof mentorId === "object" && mentorId !== null && mentorId.name) {
      return mentorId.name;
    }

    return "Mentor not found";
  };

  const normalizeCurriculumForForm = (curriculum = []) => {
    if (!Array.isArray(curriculum)) return [];

    return curriculum.map((topic, topicIndex) => ({
      title: topic.title || "",
      description: topic.description || "",
      duration: topic.duration || "",
      videoUrl: topic.videoUrl || "",
      order: Number(topic.order || topicIndex + 1),
      subTopics: Array.isArray(topic.subTopics)
        ? topic.subTopics.map((subTopic, subTopicIndex) => ({
            title: subTopic.title || "",
            description: subTopic.description || "",
            duration: subTopic.duration || "",
            videoUrl: subTopic.videoUrl || "",
            order: Number(subTopic.order || subTopicIndex + 1),
          }))
        : [],
    }));
  };

  const openAddModal = () => {
    setEditingCourse(null);
    setForm({
      ...emptyForm,
      curriculum: [],
    });
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);

    const mentorId =
      typeof course.mentorId === "object" && course.mentorId !== null
        ? course.mentorId._id
        : course.mentorId || "";

    setForm({
      title: course.title || "",
      description: course.description || "",
      category: course.category || "",
      level: course.level || "Beginner",
      duration: course.duration || "",
      isFree: Boolean(course.isFree),
      price: course.price || "0",
      mentorId,
      mentorName: course.mentorName || "",
      certificateIncluded:
        course.certificateIncluded === undefined
          ? true
          : Boolean(course.certificateIncluded),
      status: course.status || "Active",
      videoUrl: course.videoUrl || "",
      thumbnailUrl: course.thumbnailUrl || "",
      curriculum: normalizeCurriculumForForm(course.curriculum),
    });

    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const updateFormValue = (key, value) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };

      if (key === "isFree" && value === true) {
        updated.price = "0";
      }

      if (key === "mentorId") {
        const selectedMentor = mentors.find((mentor) => mentor._id === value);
        updated.mentorName = selectedMentor ? selectedMentor.name : "";
      }

      return updated;
    });
  };

  const addTopic = () => {
    setForm((prev) => ({
      ...prev,
      curriculum: [
        ...prev.curriculum,
        {
          ...emptyTopic,
          order: prev.curriculum.length + 1,
          subTopics: [],
        },
      ],
    }));
  };

  const removeTopic = (topicIndex) => {
    setForm((prev) => ({
      ...prev,
      curriculum: prev.curriculum
        .filter((_, index) => index !== topicIndex)
        .map((topic, index) => ({
          ...topic,
          order: index + 1,
        })),
    }));
  };

  const updateTopicValue = (topicIndex, key, value) => {
    setForm((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((topic, index) =>
        index === topicIndex
          ? {
              ...topic,
              [key]: value,
            }
          : topic
      ),
    }));
  };

  const addSubTopic = (topicIndex) => {
    setForm((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((topic, index) => {
        if (index !== topicIndex) return topic;

        return {
          ...topic,
          subTopics: [
            ...(topic.subTopics || []),
            {
              ...emptySubTopic,
              order: (topic.subTopics || []).length + 1,
            },
          ],
        };
      }),
    }));
  };

  const removeSubTopic = (topicIndex, subTopicIndex) => {
    setForm((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((topic, index) => {
        if (index !== topicIndex) return topic;

        return {
          ...topic,
          subTopics: (topic.subTopics || [])
            .filter((_, subIndex) => subIndex !== subTopicIndex)
            .map((subTopic, newIndex) => ({
              ...subTopic,
              order: newIndex + 1,
            })),
        };
      }),
    }));
  };

  const updateSubTopicValue = (topicIndex, subTopicIndex, key, value) => {
    setForm((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((topic, index) => {
        if (index !== topicIndex) return topic;

        return {
          ...topic,
          subTopics: (topic.subTopics || []).map((subTopic, subIndex) =>
            subIndex === subTopicIndex
              ? {
                  ...subTopic,
                  [key]: value,
                }
              : subTopic
          ),
        };
      }),
    }));
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Course title is required.";
    if (!form.description.trim()) return "Course description is required.";
    if (!form.category.trim()) return "Course category is required.";
    if (!form.duration.trim()) return "Course duration is required.";
    if (!form.mentorId.trim()) return "Please select a mentor.";

    if (!form.isFree && (!form.price || Number(form.price) <= 0)) {
      return "Paid course price must be greater than 0.";
    }

    const invalidTopic = form.curriculum.find(
      (topic) =>
        topic.title.trim() === "" ||
        (topic.subTopics || []).some((subTopic) => subTopic.title.trim() === "")
    );

    if (invalidTopic) {
      return "Every topic and subtopic must have a title.";
    }

    return "";
  };

  const buildPayload = () => {
    return {
      ...form,
      price: form.isFree ? "0" : String(form.price),
      mentorId: form.mentorId || null,
      mentorName:
        mentors.find((mentor) => mentor._id === form.mentorId)?.name ||
        form.mentorName ||
        "",
      curriculum: form.curriculum.map((topic, topicIndex) => ({
        title: topic.title,
        description: topic.description,
        duration: topic.duration,
        videoUrl: topic.videoUrl,
        order: Number(topic.order || topicIndex + 1),
        subTopics: (topic.subTopics || []).map((subTopic, subTopicIndex) => ({
          title: subTopic.title,
          description: subTopic.description,
          duration: subTopic.duration,
          videoUrl: subTopic.videoUrl,
          order: Number(subTopic.order || subTopicIndex + 1),
        })),
      })),
    };
  };

  const saveCourse = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = buildPayload();

      if (editingCourse) {
        const updatedCourse = await updateCourse(editingCourse._id, payload);

        setCourses((prev) =>
          prev.map((course) =>
            course._id === editingCourse._id ? updatedCourse : course
          )
        );

        setSuccess("Course updated successfully.");
      } else {
        const newCourse = await createCourse(payload);

        setCourses((prev) => [newCourse, ...prev]);
        setSuccess("Course created successfully.");
      }

      setModalOpen(false);
      setEditingCourse(null);
      setForm({
        ...emptyForm,
        curriculum: [],
      });
    } catch (err) {
      setError(err.message || "Failed to save course.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCourse = async (course) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${course.title}"?`
    );

    if (!confirmDelete) return;

    try {
      setError("");
      await deleteCourse(course._id);

      setCourses((prev) => prev.filter((item) => item._id !== course._id));
      setSuccess("Course deleted successfully.");
    } catch (err) {
      setError(err.message || "Failed to delete course.");
    }
  };

  const totalCourses = courses.length;
  const activeCourses = courses.filter(
    (course) => course.status === "Active"
  ).length;
  const paidCourses = courses.filter((course) => !course.isFree).length;
  const certificateCourses = courses.filter(
    (course) => course.certificateIncluded
  ).length;
  const totalTopics = courses.reduce(
    (sum, course) => sum + (course.curriculum || []).length,
    0
  );

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-500/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-300">Admin / Courses</p>
            <h1 className="mt-2 text-4xl font-black">Manage Courses</h1>
            <p className="mt-2 text-slate-400">
              Backend connected course management with topics, subtopics,
              MongoDB and mentor dropdown.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                fetchCourses();
                fetchMentors();
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
              Add Course
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-5">
          <StatCard title="Total Courses" value={totalCourses} />
          <StatCard title="Active Courses" value={activeCourses} />
          <StatCard title="Paid Courses" value={paidCourses} />
          <StatCard title="Certificate Courses" value={certificateCourses} />
          <StatCard title="Topics Added" value={totalTopics} />
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
              placeholder="Search by title, category, level..."
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
            <option className="bg-slate-950">Draft</option>
            <option className="bg-slate-950">Archived</option>
            <option className="bg-slate-950">Coming Soon</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            {categories.map((category) => (
              <option key={category} className="bg-slate-950">
                {category}
              </option>
            ))}
          </select>
        </div>
      </section>

      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
          <p className="mt-4 font-bold text-slate-300">Loading courses...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
          <BookOpen className="mx-auto text-slate-500" size={52} />
          <h2 className="mt-4 text-2xl font-black">No courses found</h2>
          <p className="mt-2 text-slate-400">
            Add your first course or change filters.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              mentorName={getMentorName(course.mentorId, course.mentorName)}
              onEdit={() => openEditModal(course)}
              onDelete={() => handleDeleteCourse(course)}
            />
          ))}
        </section>
      )}

      {modalOpen && (
        <CourseFormModal
          form={form}
          updateFormValue={updateFormValue}
          saveCourse={saveCourse}
          saving={saving}
          editingCourse={editingCourse}
          closeModal={() => setModalOpen(false)}
          error={error}
          mentors={mentors}
          addTopic={addTopic}
          removeTopic={removeTopic}
          updateTopicValue={updateTopicValue}
          addSubTopic={addSubTopic}
          removeSubTopic={removeSubTopic}
          updateSubTopicValue={updateSubTopicValue}
        />
      )}
    </div>
  );
}

function CourseCard({ course, mentorName, onEdit, onDelete }) {
  const topicsCount = (course.curriculum || []).length;

  const subTopicsCount = (course.curriculum || []).reduce(
    (sum, topic) => sum + (topic.subTopics || []).length,
    0
  );

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 transition hover:-translate-y-2 hover:border-cyan-400/40">
      <div className="h-36 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-6">
        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">
            <BookOpen size={30} />
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              course.status === "Active"
                ? "bg-emerald-400/20 text-emerald-100"
                : course.status === "Draft" || course.status === "Coming Soon"
                ? "bg-orange-400/20 text-orange-100"
                : "bg-red-400/20 text-red-100"
            }`}
          >
            {course.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-black">{course.title}</h2>

        <p className="mt-2 text-sm text-cyan-300">
          {course.category} • {course.level || "Beginner"}
        </p>

        <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">
          {course.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <Info label="Duration" value={course.duration || "N/A"} />
          <Info
            label="Price"
            value={course.isFree ? "Free" : `₹${course.price}`}
          />
          <Info
            label="Certificate"
            value={course.certificateIncluded ? "Yes" : "No"}
          />
          <Info label="Mentor" value={mentorName} />
          <Info label="Topics" value={topicsCount} />
          <Info label="Subtopics" value={subTopicsCount} />
        </div>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() => {
              if (!course.videoUrl) {
                alert("Video URL not added.");
                return;
              }

              window.open(course.videoUrl, "_blank");
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

function CourseFormModal({
  form,
  updateFormValue,
  saveCourse,
  saving,
  editingCourse,
  closeModal,
  error,
  mentors,
  addTopic,
  removeTopic,
  updateTopicValue,
  addSubTopic,
  removeSubTopic,
  updateSubTopicValue,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
      <form
        onSubmit={saveCourse}
        className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-slate-950 p-7 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black">
              {editingCourse ? "Edit Course" : "Add New Course"}
            </h2>
            <p className="mt-2 text-slate-400">
              Add course details, mentor, topics and subtopics. Topics will be
              used for student checkbox progress.
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
            label="Course Title"
            value={form.title}
            onChange={(v) => updateFormValue("title", v)}
            placeholder="Java Full Course"
          />

          <Input
            label="Category"
            value={form.category}
            onChange={(v) => updateFormValue("category", v)}
            placeholder="Programming"
          />

          <label className="block">
            <span className="text-sm font-bold text-slate-300">
              Select Mentor
            </span>

            <select
              value={form.mentorId}
              onChange={(event) =>
                updateFormValue("mentorId", event.target.value)
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="" className="bg-slate-950">
                Choose mentor
              </option>

              {mentors.map((mentor) => (
                <option
                  key={mentor._id}
                  value={mentor._id}
                  className="bg-slate-950"
                >
                  {mentor.name} — {mentor.expertise}
                </option>
              ))}
            </select>

            {mentors.length === 0 && (
              <p className="mt-2 text-xs text-orange-300">
                No mentors found. Add mentor first from Manage Mentors.
              </p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-300">Level</span>
            <select
              value={form.level}
              onChange={(event) => updateFormValue("level", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Beginner</option>
              <option className="bg-slate-950">Intermediate</option>
              <option className="bg-slate-950">Advanced</option>
            </select>
          </label>

          <Input
            label="Duration"
            value={form.duration}
            onChange={(v) => updateFormValue("duration", v)}
            placeholder="20 Hours"
          />

          <Input
            label="Main Video URL"
            value={form.videoUrl}
            onChange={(v) => updateFormValue("videoUrl", v)}
            placeholder="https://www.youtube.com/..."
          />

          <Input
            label="Thumbnail URL"
            value={form.thumbnailUrl}
            onChange={(v) => updateFormValue("thumbnailUrl", v)}
            placeholder="https://image-url..."
          />

          <label className="block">
            <span className="text-sm font-bold text-slate-300">
              Course Type
            </span>
            <select
              value={form.isFree ? "Free" : "Paid"}
              onChange={(event) =>
                updateFormValue("isFree", event.target.value === "Free")
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Free</option>
              <option className="bg-slate-950">Paid</option>
            </select>
          </label>

          <Input
            label="Price"
            value={form.price}
            disabled={form.isFree}
            onChange={(v) => updateFormValue("price", v)}
            placeholder="499"
          />

          <label className="block">
            <span className="text-sm font-bold text-slate-300">
              Certificate Included
            </span>
            <select
              value={form.certificateIncluded ? "Yes" : "No"}
              onChange={(event) =>
                updateFormValue(
                  "certificateIncluded",
                  event.target.value === "Yes"
                )
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Yes</option>
              <option className="bg-slate-950">No</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-300">Status</span>
            <select
              value={form.status}
              onChange={(event) =>
                updateFormValue("status", event.target.value)
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option className="bg-slate-950">Active</option>
              <option className="bg-slate-950">Draft</option>
              <option className="bg-slate-950">Archived</option>
              <option className="bg-slate-950">Coming Soon</option>
            </select>
          </label>
        </div>

        <label className="mt-4 block">
          <span className="text-sm font-bold text-slate-300">Description</span>
          <textarea
            value={form.description}
            onChange={(event) =>
              updateFormValue("description", event.target.value)
            }
            rows={4}
            placeholder="Write course description..."
            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
          />
        </label>

        <CurriculumBuilder
          curriculum={form.curriculum}
          addTopic={addTopic}
          removeTopic={removeTopic}
          updateTopicValue={updateTopicValue}
          addSubTopic={addSubTopic}
          removeSubTopic={removeSubTopic}
          updateSubTopicValue={updateSubTopicValue}
        />

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
              : editingCourse
              ? "Update Course"
              : "Save Course"}
          </button>
        </div>
      </form>
    </div>
  );
}

function CurriculumBuilder({
  curriculum,
  addTopic,
  removeTopic,
  updateTopicValue,
  addSubTopic,
  removeSubTopic,
  updateSubTopicValue,
}) {
  return (
    <section className="mt-7 rounded-[2rem] border border-white/10 bg-slate-900/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-2xl font-black">Course Curriculum</h3>
          <p className="mt-1 text-sm text-slate-400">
            Add topics and subtopics. Students will complete these using
            checkboxes.
          </p>
        </div>

        <button
          type="button"
          onClick={addTopic}
          className="flex items-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-black text-slate-950 transition hover:bg-cyan-300"
        >
          <Plus size={18} />
          Add Topic
        </button>
      </div>

      {curriculum.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-orange-400/30 bg-orange-400/10 p-4 text-orange-300">
          No topics added yet. Click “Add Topic” to create course content.
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          {curriculum.map((topic, topicIndex) => (
            <div
              key={topicIndex}
              className="rounded-2xl border border-white/10 bg-slate-950/80 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="text-lg font-black text-cyan-300">
                  Topic {topicIndex + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => removeTopic(topicIndex)}
                  className="flex items-center gap-2 rounded-xl bg-red-500/10 px-3 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={16} />
                  Remove Topic
                </button>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Input
                  label="Topic Title"
                  value={topic.title}
                  onChange={(v) => updateTopicValue(topicIndex, "title", v)}
                  placeholder="Introduction to Java"
                />

                <Input
                  label="Topic Duration"
                  value={topic.duration}
                  onChange={(v) => updateTopicValue(topicIndex, "duration", v)}
                  placeholder="30 min"
                />

                <Input
                  label="Topic Video URL"
                  value={topic.videoUrl}
                  onChange={(v) => updateTopicValue(topicIndex, "videoUrl", v)}
                  placeholder="https://youtube.com/..."
                />

                <Input
                  label="Topic Order"
                  value={String(topic.order || topicIndex + 1)}
                  onChange={(v) => updateTopicValue(topicIndex, "order", v)}
                  placeholder="1"
                />
              </div>

              <label className="mt-4 block">
                <span className="text-sm font-bold text-slate-300">
                  Topic Description
                </span>
                <textarea
                  value={topic.description}
                  onChange={(event) =>
                    updateTopicValue(
                      topicIndex,
                      "description",
                      event.target.value
                    )
                  }
                  rows={2}
                  placeholder="What will student learn in this topic?"
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                />
              </label>

              <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h5 className="font-black text-purple-300">Subtopics</h5>
                    <p className="mt-1 text-xs text-slate-400">
                      Add smaller lessons inside this topic.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => addSubTopic(topicIndex)}
                    className="flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-400/10 px-3 py-2 text-sm font-bold text-purple-300 transition hover:bg-purple-400 hover:text-slate-950"
                  >
                    <Plus size={16} />
                    Add Subtopic
                  </button>
                </div>

                {(topic.subTopics || []).length === 0 ? (
                  <p className="mt-4 text-sm text-slate-500">
                    No subtopics added. If no subtopics are added, this topic
                    itself will be counted as one checkbox item.
                  </p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {(topic.subTopics || []).map((subTopic, subTopicIndex) => (
                      <div
                        key={subTopicIndex}
                        className="rounded-xl border border-white/10 bg-slate-950/80 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h6 className="font-black text-slate-200">
                            Subtopic {subTopicIndex + 1}
                          </h6>

                          <button
                            type="button"
                            onClick={() =>
                              removeSubTopic(topicIndex, subTopicIndex)
                            }
                            className="flex items-center gap-2 rounded-xl bg-red-500/10 px-3 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={15} />
                            Remove
                          </button>
                        </div>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <Input
                            label="Subtopic Title"
                            value={subTopic.title}
                            onChange={(v) =>
                              updateSubTopicValue(
                                topicIndex,
                                subTopicIndex,
                                "title",
                                v
                              )
                            }
                            placeholder="What is Java?"
                          />

                          <Input
                            label="Subtopic Duration"
                            value={subTopic.duration}
                            onChange={(v) =>
                              updateSubTopicValue(
                                topicIndex,
                                subTopicIndex,
                                "duration",
                                v
                              )
                            }
                            placeholder="10 min"
                          />

                          <Input
                            label="Subtopic Video URL"
                            value={subTopic.videoUrl}
                            onChange={(v) =>
                              updateSubTopicValue(
                                topicIndex,
                                subTopicIndex,
                                "videoUrl",
                                v
                              )
                            }
                            placeholder="https://youtube.com/..."
                          />

                          <Input
                            label="Subtopic Order"
                            value={String(subTopic.order || subTopicIndex + 1)}
                            onChange={(v) =>
                              updateSubTopicValue(
                                topicIndex,
                                subTopicIndex,
                                "order",
                                v
                              )
                            }
                            placeholder="1"
                          />
                        </div>

                        <label className="mt-4 block">
                          <span className="text-sm font-bold text-slate-300">
                            Subtopic Description
                          </span>

                          <textarea
                            value={subTopic.description}
                            onChange={(event) =>
                              updateSubTopicValue(
                                topicIndex,
                                subTopicIndex,
                                "description",
                                event.target.value
                              )
                            }
                            rows={2}
                            placeholder="Short description for this subtopic..."
                            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <BookOpen className="text-cyan-300" size={24} />
      <h3 className="mt-3 text-2xl font-black">{value}</h3>
      <p className="text-sm text-slate-400">{title}</p>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-950/70 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 truncate font-bold text-slate-200">{value || "N/A"}</p>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, disabled = false }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-300">{label}</span>
      <input
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
      />
    </label>
  );
}