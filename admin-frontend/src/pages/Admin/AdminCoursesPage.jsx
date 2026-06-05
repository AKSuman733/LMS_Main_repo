import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Edit3,
  FileQuestion,
  GraduationCap,
  Layers,
  Plus,
  RefreshCcw,
  Search,
  Sparkles,
  Trash2,
  Upload,
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
  content: "",
  duration: "",
  videoUrl: "",
  resourceUrl: "",
  xp: 20,
  order: 1,
  subTopics: [],
};

const emptySubTopic = {
  title: "",
  description: "",
  content: "",
  duration: "",
  videoUrl: "",
  resourceUrl: "",
  xp: 10,
  order: 1,
};

const emptyResource = {
  title: "",
  type: "Link",
  url: "",
};

const emptyQuizQuestion = {
  question: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  marks: 1,
};

const emptyForm = {
  title: "",
  shortDescription: "",
  description: "",
  category: "",
  tags: [],
  language: "English",
  level: "Beginner",
  duration: "",
  isFree: true,
  price: "0",
  discountPrice: "",
  mentorId: "",
  mentorName: "",
  learningOutcomes: [],
  requirements: [],
  resources: [],
  certificateIncluded: true,
  certificateRules: {
    passingPercentage: 70,
    minimumProgress: 100,
    quizRequired: true,
    assignmentRequired: true,
  },
  status: "Active",
  videoUrl: "",
  thumbnailUrl: "",
  bannerUrl: "",
  curriculum: [],
  quizQuestions: [],
  assignment: {
    title: "",
    question: "",
    instructions: "",
    allowedFileTypes: ["PDF", "DOC", "ZIP", "Image", "Link"],
    maxMarks: 100,
  },
};

const formSteps = [
  { id: "basic", label: "Basic Details", icon: BookOpen },
  { id: "content", label: "Curriculum", icon: Layers },
  { id: "quiz", label: "Quiz", icon: FileQuestion },
  { id: "assignment", label: "Assignment", icon: Upload },
  { id: "certificate", label: "Certificate", icon: GraduationCap },
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState("basic");
  const [editingCourse, setEditingCourse] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [tagInput, setTagInput] = useState("");
  const [outcomeInput, setOutcomeInput] = useState("");
  const [requirementInput, setRequirementInput] = useState("");

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
      typeof mentorId === "object" && mentorId !== null
        ? mentorId._id
        : mentorId;

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
      content: topic.content || "",
      duration: topic.duration || "",
      videoUrl: topic.videoUrl || "",
      resourceUrl: topic.resourceUrl || "",
      xp: Number(topic.xp || 20),
      order: Number(topic.order || topicIndex + 1),
      subTopics: Array.isArray(topic.subTopics)
        ? topic.subTopics.map((subTopic, subTopicIndex) => ({
            title: subTopic.title || "",
            description: subTopic.description || "",
            content: subTopic.content || "",
            duration: subTopic.duration || "",
            videoUrl: subTopic.videoUrl || "",
            resourceUrl: subTopic.resourceUrl || "",
            xp: Number(subTopic.xp || 10),
            order: Number(subTopic.order || subTopicIndex + 1),
          }))
        : [],
    }));
  };

  const openAddModal = () => {
    setEditingCourse(null);
    setForm(JSON.parse(JSON.stringify(emptyForm)));
    setActiveStep("basic");
    setTagInput("");
    setOutcomeInput("");
    setRequirementInput("");
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
      shortDescription: course.shortDescription || "",
      description: course.description || "",
      category: course.category || "",
      tags: Array.isArray(course.tags) ? course.tags : [],
      language: course.language || "English",
      level: course.level || "Beginner",
      duration: course.duration || "",
      isFree: Boolean(course.isFree),
      price: course.price || "0",
      discountPrice: course.discountPrice || "",
      mentorId,
      mentorName: course.mentorName || "",
      learningOutcomes: Array.isArray(course.learningOutcomes)
        ? course.learningOutcomes
        : [],
      requirements: Array.isArray(course.requirements)
        ? course.requirements
        : [],
      resources: Array.isArray(course.resources) ? course.resources : [],
      certificateIncluded:
        course.certificateIncluded === undefined
          ? true
          : Boolean(course.certificateIncluded),
      certificateRules: {
        passingPercentage: Number(
          course.certificateRules?.passingPercentage || 70
        ),
        minimumProgress: Number(course.certificateRules?.minimumProgress || 100),
        quizRequired:
          course.certificateRules?.quizRequired === undefined
            ? true
            : Boolean(course.certificateRules.quizRequired),
        assignmentRequired:
          course.certificateRules?.assignmentRequired === undefined
            ? true
            : Boolean(course.certificateRules.assignmentRequired),
      },
      status: course.status || "Active",
      videoUrl: course.videoUrl || "",
      thumbnailUrl: course.thumbnailUrl || "",
      bannerUrl: course.bannerUrl || "",
      curriculum: normalizeCurriculumForForm(course.curriculum),
      quizQuestions: Array.isArray(course.quizQuestions)
        ? course.quizQuestions.map((item) => ({
            question: item.question || "",
            options:
              Array.isArray(item.options) && item.options.length === 4
                ? item.options
                : ["", "", "", ""],
            correctAnswer: item.correctAnswer || "",
            marks: Number(item.marks || 1),
          }))
        : [],
      assignment: {
        title: course.assignment?.title || "",
        question: course.assignment?.question || "",
        instructions: course.assignment?.instructions || "",
        allowedFileTypes: Array.isArray(course.assignment?.allowedFileTypes)
          ? course.assignment.allowedFileTypes
          : ["PDF", "DOC", "ZIP", "Image", "Link"],
        maxMarks: Number(course.assignment?.maxMarks || 100),
      },
    });

    setActiveStep("basic");
    setError("");
    setSuccess("");
    setModalOpen(true);
  };

  const updateFormValue = (key, value) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };

      if (key === "isFree" && value === true) {
        updated.price = "0";
        updated.discountPrice = "";
      }

      if (key === "mentorId") {
        const selectedMentor = mentors.find((mentor) => mentor._id === value);
        updated.mentorName = selectedMentor ? selectedMentor.name : "";
      }

      return updated;
    });
  };

  const updateNestedValue = (section, key, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const addArrayItem = (field, value, clearFn) => {
    const finalValue = String(value || "").trim();

    if (!finalValue) return;

    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], finalValue],
    }));

    clearFn("");
  };

  const removeArrayItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const addResource = () => {
    setForm((prev) => ({
      ...prev,
      resources: [...prev.resources, { ...emptyResource }],
    }));
  };

  const updateResource = (index, key, value) => {
    setForm((prev) => ({
      ...prev,
      resources: prev.resources.map((resource, resourceIndex) =>
        resourceIndex === index ? { ...resource, [key]: value } : resource
      ),
    }));
  };

  const removeResource = (index) => {
    setForm((prev) => ({
      ...prev,
      resources: prev.resources.filter(
        (_, resourceIndex) => resourceIndex !== index
      ),
    }));
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

  const addQuizQuestion = () => {
    setForm((prev) => ({
      ...prev,
      quizQuestions: [...prev.quizQuestions, { ...emptyQuizQuestion }],
    }));
  };

  const removeQuizQuestion = (index) => {
    setForm((prev) => ({
      ...prev,
      quizQuestions: prev.quizQuestions.filter(
        (_, questionIndex) => questionIndex !== index
      ),
    }));
  };

  const updateQuizQuestion = (questionIndex, key, value) => {
    setForm((prev) => ({
      ...prev,
      quizQuestions: prev.quizQuestions.map((question, index) =>
        index === questionIndex ? { ...question, [key]: value } : question
      ),
    }));
  };

  const updateQuizOption = (questionIndex, optionIndex, value) => {
    setForm((prev) => ({
      ...prev,
      quizQuestions: prev.quizQuestions.map((question, index) => {
        if (index !== questionIndex) return question;

        return {
          ...question,
          options: question.options.map((option, currentOptionIndex) =>
            currentOptionIndex === optionIndex ? value : option
          ),
        };
      }),
    }));
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Course title is required.";
    if (!form.shortDescription.trim()) return "Short description is required.";
    if (!form.description.trim()) return "Full course description is required.";
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

    const invalidQuiz = form.quizQuestions.find((question) => {
      const filledOptions = question.options.filter((option) => option.trim());

      return (
        question.question.trim() &&
        (filledOptions.length < 2 || !question.correctAnswer.trim())
      );
    });

    if (invalidQuiz) {
      return "Every quiz question must have at least 2 options and correct answer.";
    }

    return "";
  };

  const buildPayload = () => {
    return {
      ...form,
      price: form.isFree ? "0" : String(form.price),
      discountPrice: form.isFree ? "" : String(form.discountPrice || ""),
      mentorId: form.mentorId || null,
      mentorName:
        mentors.find((mentor) => mentor._id === form.mentorId)?.name ||
        form.mentorName ||
        "",
      tags: form.tags.filter(Boolean),
      learningOutcomes: form.learningOutcomes.filter(Boolean),
      requirements: form.requirements.filter(Boolean),
      resources: form.resources.filter(
        (resource) => resource.title.trim() || resource.url.trim()
      ),
      curriculum: form.curriculum.map((topic, topicIndex) => ({
        title: topic.title,
        description: topic.description,
        content: topic.content,
        duration: topic.duration,
        videoUrl: topic.videoUrl,
        resourceUrl: topic.resourceUrl,
        xp: Number(topic.xp || 20),
        order: Number(topic.order || topicIndex + 1),
        subTopics: (topic.subTopics || []).map((subTopic, subTopicIndex) => ({
          title: subTopic.title,
          description: subTopic.description,
          content: subTopic.content,
          duration: subTopic.duration,
          videoUrl: subTopic.videoUrl,
          resourceUrl: subTopic.resourceUrl,
          xp: Number(subTopic.xp || 10),
          order: Number(subTopic.order || subTopicIndex + 1),
        })),
      })),
      quizQuestions: form.quizQuestions
        .filter((question) => question.question.trim())
        .map((question) => ({
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          marks: Number(question.marks || 1),
        })),
      assignment: {
        title: form.assignment.title,
        question: form.assignment.question,
        instructions: form.assignment.instructions,
        allowedFileTypes: form.assignment.allowedFileTypes,
        maxMarks: Number(form.assignment.maxMarks || 100),
      },
      certificateRules: {
        passingPercentage: Number(form.certificateRules.passingPercentage || 70),
        minimumProgress: Number(form.certificateRules.minimumProgress || 100),
        quizRequired: Boolean(form.certificateRules.quizRequired),
        assignmentRequired: Boolean(form.certificateRules.assignmentRequired),
      },
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
      setForm(JSON.parse(JSON.stringify(emptyForm)));
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
              Create complete courses with content, quiz, assignment and certificate rules.
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
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          updateFormValue={updateFormValue}
          updateNestedValue={updateNestedValue}
          saveCourse={saveCourse}
          saving={saving}
          editingCourse={editingCourse}
          closeModal={() => setModalOpen(false)}
          error={error}
          mentors={mentors}
          tagInput={tagInput}
          setTagInput={setTagInput}
          outcomeInput={outcomeInput}
          setOutcomeInput={setOutcomeInput}
          requirementInput={requirementInput}
          setRequirementInput={setRequirementInput}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
          addResource={addResource}
          updateResource={updateResource}
          removeResource={removeResource}
          addTopic={addTopic}
          removeTopic={removeTopic}
          updateTopicValue={updateTopicValue}
          addSubTopic={addSubTopic}
          removeSubTopic={removeSubTopic}
          updateSubTopicValue={updateSubTopicValue}
          addQuizQuestion={addQuizQuestion}
          removeQuizQuestion={removeQuizQuestion}
          updateQuizQuestion={updateQuizQuestion}
          updateQuizOption={updateQuizOption}
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

  const quizCount = (course.quizQuestions || []).length;

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
          {course.shortDescription || course.description}
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
          <Info label="Quiz Qs" value={quizCount} />
          <Info label="Lessons" value={course.totalLessons || 0} />
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

function CourseFormModal(props) {
  const {
    form,
    activeStep,
    setActiveStep,
    updateFormValue,
    updateNestedValue,
    saveCourse,
    saving,
    editingCourse,
    closeModal,
    error,
    mentors,
  } = props;

  const activeIndex = formSteps.findIndex((step) => step.id === activeStep);

  const goNext = () => {
    const nextStep = formSteps[activeIndex + 1];
    if (nextStep) setActiveStep(nextStep.id);
  };

  const goBack = () => {
    const previousStep = formSteps[activeIndex - 1];
    if (previousStep) setActiveStep(previousStep.id);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/75 p-2 backdrop-blur-md sm:p-4">
      <form
        onSubmit={saveCourse}
        className="mx-auto flex h-[96vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 p-4 sm:p-6">
          <div>
            <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
              {editingCourse ? "Edit Advanced Course" : "Add Advanced Course"}
            </h2>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Add complete course data for student learning player.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-400 sm:h-14 sm:w-14"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[250px_1fr]">
          <aside className="shrink-0 border-b border-white/10 bg-slate-900/60 p-3 lg:border-b-0 lg:border-r lg:p-5">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-3 lg:overflow-visible lg:pb-0">
              {formSteps.map((step) => {
                const Icon = step.icon;
                const active = activeStep === step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(step.id)}
                    className={`flex min-w-max items-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition lg:w-full lg:min-w-0 lg:gap-3 lg:px-4 lg:py-4 lg:text-left lg:text-base ${
                      active
                        ? "bg-cyan-400 text-slate-950"
                        : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-cyan-300"
                    }`}
                  >
                    <Icon size={20} />
                    {step.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 hidden rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 lg:block">
              <Sparkles className="text-cyan-300" />
              <p className="mt-3 text-sm font-bold text-cyan-200">
                This form controls the student Continue Learning page content.
              </p>
            </div>
          </aside>

          <main className="min-h-0 overflow-y-auto p-4 sm:p-6">
            {error && (
              <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
                {error}
              </div>
            )}

            {activeStep === "basic" && (
              <BasicDetailsStep
                form={form}
                updateFormValue={updateFormValue}
                mentors={mentors}
                {...props}
              />
            )}

            {activeStep === "content" && (
              <CurriculumStep form={form} {...props} />
            )}

            {activeStep === "quiz" && <QuizStep form={form} {...props} />}

            {activeStep === "assignment" && (
              <AssignmentStep
                form={form}
                updateNestedValue={updateNestedValue}
              />
            )}

            {activeStep === "certificate" && (
              <CertificateStep
                form={form}
                updateFormValue={updateFormValue}
                updateNestedValue={updateNestedValue}
              />
            )}
          </main>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-slate-950 p-4 sm:p-5">
          <button
            type="button"
            onClick={goBack}
            disabled={activeIndex === 0}
            className="rounded-xl border border-white/10 px-5 py-3 font-bold text-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-xl border border-white/10 px-5 py-3 font-bold text-slate-300"
            >
              Cancel
            </button>

            {activeIndex < formSteps.length - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="rounded-xl bg-cyan-400 px-6 py-3 font-black text-slate-950"
              >
                Next
              </button>
            ) : (
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
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function BasicDetailsStep({
  form,
  updateFormValue,
  mentors,
  tagInput,
  setTagInput,
  outcomeInput,
  setOutcomeInput,
  requirementInput,
  setRequirementInput,
  addArrayItem,
  removeArrayItem,
  addResource,
  updateResource,
  removeResource,
}) {
  return (
    <section>
      <SectionTitle
        icon={BookOpen}
        title="Basic Course Details"
        text="Add all main details shown on course cards, payment page and learning page."
      />

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <Input
          label="Course Title"
          value={form.title}
          onChange={(v) => updateFormValue("title", v)}
          placeholder="Full Stack Web Development"
        />

        <Input
          label="Category"
          value={form.category}
          onChange={(v) => updateFormValue("category", v)}
          placeholder="Web Development"
        />

        <Input
          label="Short Description"
          value={form.shortDescription}
          onChange={(v) => updateFormValue("shortDescription", v)}
          placeholder="Short card description"
        />

        <Input
          label="Language"
          value={form.language}
          onChange={(v) => updateFormValue("language", v)}
          placeholder="English / Hindi"
        />

        <label className="block">
          <span className="text-sm font-bold text-slate-300">
            Select Mentor
          </span>

          <select
            value={form.mentorId}
            onChange={(event) => updateFormValue("mentorId", event.target.value)}
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
          placeholder="8 Weeks / 20 Hours"
        />

        <Input
          label="Main Video URL"
          value={form.videoUrl}
          onChange={(v) => updateFormValue("videoUrl", v)}
          placeholder="https://youtube.com/..."
        />

        <Input
          label="Thumbnail URL"
          value={form.thumbnailUrl}
          onChange={(v) => updateFormValue("thumbnailUrl", v)}
          placeholder="Course card image URL"
        />

        <Input
          label="Banner URL"
          value={form.bannerUrl}
          onChange={(v) => updateFormValue("bannerUrl", v)}
          placeholder="Large banner image URL"
        />

        <label className="block">
          <span className="text-sm font-bold text-slate-300">Course Type</span>
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

        <Input
          label="Discount Price"
          value={form.discountPrice}
          disabled={form.isFree}
          onChange={(v) => updateFormValue("discountPrice", v)}
          placeholder="299"
        />

        <label className="block">
          <span className="text-sm font-bold text-slate-300">Status</span>
          <select
            value={form.status}
            onChange={(event) => updateFormValue("status", event.target.value)}
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
        <span className="text-sm font-bold text-slate-300">
          Full Description
        </span>
        <textarea
          value={form.description}
          onChange={(event) => updateFormValue("description", event.target.value)}
          rows={5}
          placeholder="Write full course description..."
          className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
        />
      </label>

      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <ChipInput
          title="Tags"
          value={tagInput}
          setValue={setTagInput}
          items={form.tags}
          placeholder="React"
          onAdd={() => addArrayItem("tags", tagInput, setTagInput)}
          onRemove={(index) => removeArrayItem("tags", index)}
        />

        <ChipInput
          title="Learning Outcomes"
          value={outcomeInput}
          setValue={setOutcomeInput}
          items={form.learningOutcomes}
          placeholder="Build real projects"
          onAdd={() =>
            addArrayItem("learningOutcomes", outcomeInput, setOutcomeInput)
          }
          onRemove={(index) => removeArrayItem("learningOutcomes", index)}
        />

        <ChipInput
          title="Requirements"
          value={requirementInput}
          setValue={setRequirementInput}
          items={form.requirements}
          placeholder="Basic computer knowledge"
          onAdd={() =>
            addArrayItem("requirements", requirementInput, setRequirementInput)
          }
          onRemove={(index) => removeArrayItem("requirements", index)}
        />
      </div>

      <ResourcesBuilder
        resources={form.resources}
        addResource={addResource}
        updateResource={updateResource}
        removeResource={removeResource}
      />
    </section>
  );
}

function CurriculumStep({
  form,
  addTopic,
  removeTopic,
  updateTopicValue,
  addSubTopic,
  removeSubTopic,
  updateSubTopicValue,
}) {
  return (
    <section>
      <SectionTitle
        icon={Layers}
        title="Course Curriculum"
        text="Add modules, lessons, explanation content, video links, resources and XP."
      />

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={addTopic}
          className="flex items-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-black text-slate-950 transition hover:bg-cyan-300"
        >
          <Plus size={18} />
          Add Topic
        </button>
      </div>

      {form.curriculum.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-orange-400/30 bg-orange-400/10 p-4 text-orange-300">
          No topics added yet. Click “Add Topic” to create course content.
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          {form.curriculum.map((topic, topicIndex) => (
            <div
              key={topicIndex}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="text-xl font-black text-cyan-300">
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

              <div className="mt-4 grid gap-4 xl:grid-cols-2">
                <Input
                  label="Topic Title"
                  value={topic.title}
                  onChange={(v) => updateTopicValue(topicIndex, "title", v)}
                  placeholder="Introduction to React"
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
                  label="Topic Resource URL"
                  value={topic.resourceUrl}
                  onChange={(v) =>
                    updateTopicValue(topicIndex, "resourceUrl", v)
                  }
                  placeholder="PDF / notes / docs link"
                />

                <Input
                  label="Topic XP"
                  value={String(topic.xp || 20)}
                  onChange={(v) => updateTopicValue(topicIndex, "xp", v)}
                  placeholder="20"
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
                  placeholder="Short intro for this topic..."
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                />
              </label>

              <label className="mt-4 block">
                <span className="text-sm font-bold text-slate-300">
                  Topic Full Content
                </span>
                <textarea
                  value={topic.content}
                  onChange={(event) =>
                    updateTopicValue(topicIndex, "content", event.target.value)
                  }
                  rows={5}
                  placeholder="Full lesson explanation that will show on Continue Learning page..."
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                />
              </label>

              <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
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
                    itself will be counted as one lesson.
                  </p>
                ) : (
                  <div className="mt-4 space-y-4">
                    {(topic.subTopics || []).map((subTopic, subTopicIndex) => (
                      <div
                        key={subTopicIndex}
                        className="rounded-xl border border-white/10 bg-slate-900 p-4"
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

                        <div className="mt-4 grid gap-4 xl:grid-cols-2">
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
                            placeholder="What is React?"
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
                            label="Subtopic Resource URL"
                            value={subTopic.resourceUrl}
                            onChange={(v) =>
                              updateSubTopicValue(
                                topicIndex,
                                subTopicIndex,
                                "resourceUrl",
                                v
                              )
                            }
                            placeholder="PDF / notes / docs link"
                          />

                          <Input
                            label="Subtopic XP"
                            value={String(subTopic.xp || 10)}
                            onChange={(v) =>
                              updateSubTopicValue(
                                topicIndex,
                                subTopicIndex,
                                "xp",
                                v
                              )
                            }
                            placeholder="10"
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
                            placeholder="Short description..."
                            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                          />
                        </label>

                        <label className="mt-4 block">
                          <span className="text-sm font-bold text-slate-300">
                            Subtopic Full Content
                          </span>
                          <textarea
                            value={subTopic.content}
                            onChange={(event) =>
                              updateSubTopicValue(
                                topicIndex,
                                subTopicIndex,
                                "content",
                                event.target.value
                              )
                            }
                            rows={4}
                            placeholder="Full explanation for this subtopic..."
                            className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
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

function QuizStep({
  form,
  addQuizQuestion,
  removeQuizQuestion,
  updateQuizQuestion,
  updateQuizOption,
}) {
  return (
    <section>
      <SectionTitle
        icon={FileQuestion}
        title="Quiz Questions"
        text="Create quiz questions that students can attempt after learning."
      />

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={addQuizQuestion}
          className="flex items-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-black text-slate-950 transition hover:bg-cyan-300"
        >
          <Plus size={18} />
          Add Question
        </button>
      </div>

      {form.quizQuestions.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-orange-400/30 bg-orange-400/10 p-4 text-orange-300">
          No quiz questions added yet.
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          {form.quizQuestions.map((question, questionIndex) => (
            <div
              key={questionIndex}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="text-xl font-black text-cyan-300">
                  Question {questionIndex + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => removeQuizQuestion(questionIndex)}
                  className="rounded-xl bg-red-500/10 px-3 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                  Remove
                </button>
              </div>

              <label className="mt-4 block">
                <span className="text-sm font-bold text-slate-300">
                  Question
                </span>
                <textarea
                  value={question.question}
                  onChange={(event) =>
                    updateQuizQuestion(
                      questionIndex,
                      "question",
                      event.target.value
                    )
                  }
                  rows={2}
                  placeholder="Write question..."
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                />
              </label>

              <div className="mt-4 grid gap-4 xl:grid-cols-2">
                {question.options.map((option, optionIndex) => (
                  <Input
                    key={optionIndex}
                    label={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(v) =>
                      updateQuizOption(questionIndex, optionIndex, v)
                    }
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                ))}

                <Input
                  label="Correct Answer"
                  value={question.correctAnswer}
                  onChange={(v) =>
                    updateQuizQuestion(questionIndex, "correctAnswer", v)
                  }
                  placeholder="Exact correct option text"
                />

                <Input
                  label="Marks"
                  value={String(question.marks || 1)}
                  onChange={(v) =>
                    updateQuizQuestion(questionIndex, "marks", v)
                  }
                  placeholder="1"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function AssignmentStep({ form, updateNestedValue }) {
  return (
    <section>
      <SectionTitle
        icon={Upload}
        title="Assignment Details"
        text="Add assignment question and submission instructions."
      />

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <Input
          label="Assignment Title"
          value={form.assignment.title}
          onChange={(v) => updateNestedValue("assignment", "title", v)}
          placeholder="Final Project Assignment"
        />

        <Input
          label="Max Marks"
          value={String(form.assignment.maxMarks || 100)}
          onChange={(v) => updateNestedValue("assignment", "maxMarks", v)}
          placeholder="100"
        />
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-bold text-slate-300">
          Assignment Question
        </span>
        <textarea
          value={form.assignment.question}
          onChange={(event) =>
            updateNestedValue("assignment", "question", event.target.value)
          }
          rows={4}
          placeholder="Write assignment question..."
          className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
        />
      </label>

      <label className="mt-4 block">
        <span className="text-sm font-bold text-slate-300">
          Submission Instructions
        </span>
        <textarea
          value={form.assignment.instructions}
          onChange={(event) =>
            updateNestedValue("assignment", "instructions", event.target.value)
          }
          rows={4}
          placeholder="Explain what student needs to upload..."
          className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
        />
      </label>
    </section>
  );
}

function CertificateStep({ form, updateFormValue, updateNestedValue }) {
  return (
    <section>
      <SectionTitle
        icon={GraduationCap}
        title="Certificate Rules"
        text="Control certificate eligibility and course completion rules."
      />

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
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

        <Input
          label="Passing Percentage"
          value={String(form.certificateRules.passingPercentage || 70)}
          onChange={(v) =>
            updateNestedValue("certificateRules", "passingPercentage", v)
          }
          placeholder="70"
        />

        <Input
          label="Minimum Progress Required"
          value={String(form.certificateRules.minimumProgress || 100)}
          onChange={(v) =>
            updateNestedValue("certificateRules", "minimumProgress", v)
          }
          placeholder="100"
        />

        <label className="block">
          <span className="text-sm font-bold text-slate-300">
            Quiz Required
          </span>
          <select
            value={form.certificateRules.quizRequired ? "Yes" : "No"}
            onChange={(event) =>
              updateNestedValue(
                "certificateRules",
                "quizRequired",
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
          <span className="text-sm font-bold text-slate-300">
            Assignment Required
          </span>
          <select
            value={form.certificateRules.assignmentRequired ? "Yes" : "No"}
            onChange={(event) =>
              updateNestedValue(
                "certificateRules",
                "assignmentRequired",
                event.target.value === "Yes"
              )
            }
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
          >
            <option className="bg-slate-950">Yes</option>
            <option className="bg-slate-950">No</option>
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-emerald-300">
        These values will be used later to control automatic certificate
        eligibility.
      </div>
    </section>
  );
}

function ResourcesBuilder({
  resources,
  addResource,
  updateResource,
  removeResource,
}) {
  return (
    <section className="mt-6 rounded-[2rem] border border-white/10 bg-slate-900/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-black">Course Resources</h3>
          <p className="mt-1 text-sm text-slate-400">
            Add PDFs, notes, docs, GitHub links or other material.
          </p>
        </div>

        <button
          type="button"
          onClick={addResource}
          className="rounded-xl bg-cyan-400 px-4 py-3 font-black text-slate-950"
        >
          Add Resource
        </button>
      </div>

      {resources.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No resources added yet.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-2xl border border-white/10 bg-slate-950 p-4 xl:grid-cols-[1fr_180px_1fr_auto]"
            >
              <Input
                label="Title"
                value={resource.title}
                onChange={(v) => updateResource(index, "title", v)}
                placeholder="React Notes PDF"
              />

              <label className="block">
                <span className="text-sm font-bold text-slate-300">Type</span>
                <select
                  value={resource.type}
                  onChange={(event) =>
                    updateResource(index, "type", event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
                >
                  <option className="bg-slate-950">PDF</option>
                  <option className="bg-slate-950">Video</option>
                  <option className="bg-slate-950">Link</option>
                  <option className="bg-slate-950">Image</option>
                  <option className="bg-slate-950">Code</option>
                  <option className="bg-slate-950">Other</option>
                </select>
              </label>

              <Input
                label="URL"
                value={resource.url}
                onChange={(v) => updateResource(index, "url", v)}
                placeholder="https://..."
              />

              <button
                type="button"
                onClick={() => removeResource(index)}
                className="rounded-xl bg-red-500/10 px-4 py-3 text-red-400 hover:bg-red-500 hover:text-white xl:mt-7"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ChipInput({
  title,
  value,
  setValue,
  items,
  placeholder,
  onAdd,
  onRemove,
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-5">
      <h3 className="font-black">{title}</h3>

      <div className="mt-4 flex gap-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
        />

        <button
          type="button"
          onClick={onAdd}
          className="rounded-xl bg-cyan-400 px-4 py-3 font-black text-slate-950"
        >
          Add
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-slate-200"
          >
            {item}
            <button type="button" onClick={() => onRemove(index)}>
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, text }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-4 sm:rounded-[2rem] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
          <Icon size={28} />
        </div>

        <div>
          <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-400 sm:text-base">{text}</p>
        </div>
      </div>
    </div>
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