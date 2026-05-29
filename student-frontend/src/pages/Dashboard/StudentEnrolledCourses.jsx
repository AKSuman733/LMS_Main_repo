import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileBadge,
  PlayCircle,
  RefreshCcw,
  Search,
  Trophy,
} from "lucide-react";

import {
  getEnrollmentsByStudentEmail,
  toggleCourseTopicCompletion,
} from "../../services/courseEnrollmentApi";

export default function StudentEnrolledCourses() {
  const user = JSON.parse(localStorage.getItem("studentUser") || "{}");

  const studentEmail = user.email || "";
  const studentName = user.name || "Student";

  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedCourseId, setExpandedCourseId] = useState("");

  const [loading, setLoading] = useState(false);
  const [updatingTopicKey, setUpdatingTopicKey] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchEnrollments = async () => {
    if (!studentEmail) {
      setError("Please login again. Student email not found.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const data = await getEnrollmentsByStudentEmail(studentEmail);
      setEnrollments(data || []);
    } catch (err) {
      setError(err.message || "Failed to load enrolled courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();

    const interval = setInterval(() => {
      fetchEnrollments();
    }, 5000);

    return () => clearInterval(interval);
  }, [studentEmail]);

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((item) => {
      const text = `${item.courseTitle || ""} ${item.status || ""} ${
        item.email || ""
      }`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enrollments, search, statusFilter]);

  const completedCount = enrollments.filter(
    (item) => item.status === "Completed"
  ).length;

  const certificateEligibleCount = enrollments.filter(
    (item) => item.certificateEligible
  ).length;

  const getTopicKey = (topicId, subTopicId = "") => {
    return subTopicId ? `${topicId}:${subTopicId}` : `${topicId}`;
  };

  const isTopicCompleted = (enrollment, topicId, subTopicId = "") => {
    const topicKey = getTopicKey(topicId, subTopicId);

    return (enrollment.completedTopics || []).some(
      (item) => item.topicKey === topicKey
    );
  };

  const handleToggleTopic = async (enrollment, topicId, subTopicId = "") => {
    const topicKey = getTopicKey(topicId, subTopicId);

    try {
      setError("");
      setSuccess("");
      setUpdatingTopicKey(`${enrollment._id}-${topicKey}`);

      const updatedEnrollment = await toggleCourseTopicCompletion(
        enrollment._id,
        {
          topicId,
          subTopicId,
        }
      );

      setEnrollments((prev) =>
        prev.map((item) =>
          item._id === enrollment._id ? updatedEnrollment : item
        )
      );

      if (updatedEnrollment.progress >= 100) {
        setSuccess(
          "Course completed successfully. Certificate has been generated automatically."
        );
      } else {
        setSuccess(`Progress updated to ${updatedEnrollment.progress}%.`);
      }
    } catch (err) {
      setError(err.message || "Failed to update topic progress.");
    } finally {
      setUpdatingTopicKey("");
    }
  };

  const handleContinueLearning = (enrollment) => {
    const courseDetails = enrollment.courseId || {};
    const curriculum = courseDetails.curriculum || [];

    const firstUncompletedTopic = curriculum.find((topic) => {
      if (topic.subTopics && topic.subTopics.length > 0) {
        return topic.subTopics.some(
          (subTopic) =>
            !isTopicCompleted(enrollment, String(topic._id), String(subTopic._id))
        );
      }

      return !isTopicCompleted(enrollment, String(topic._id));
    });

    if (!firstUncompletedTopic) {
      alert("All topics are completed. Check your certificate section.");
      return;
    }

    if (
      firstUncompletedTopic.subTopics &&
      firstUncompletedTopic.subTopics.length > 0
    ) {
      const firstSubTopic = firstUncompletedTopic.subTopics.find(
        (subTopic) =>
          !isTopicCompleted(
            enrollment,
            String(firstUncompletedTopic._id),
            String(subTopic._id)
          )
      );

      if (firstSubTopic?.videoUrl) {
        window.open(firstSubTopic.videoUrl, "_blank");
        return;
      }

      alert(`Continue from: ${firstUncompletedTopic.title} → ${firstSubTopic?.title}`);
      return;
    }

    if (firstUncompletedTopic.videoUrl) {
      window.open(firstUncompletedTopic.videoUrl, "_blank");
      return;
    }

    alert(`Continue from: ${firstUncompletedTopic.title}`);
  };

  if (!studentEmail) {
    return (
      <div className="rounded-[2rem] border border-red-400/30 bg-red-400/10 p-8 text-red-300">
        Please login again. Student email not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 text-white shadow-2xl shadow-cyan-500/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-300">Dashboard / My Courses</p>

            <h1 className="mt-2 text-4xl font-black">My Enrolled Courses</h1>

            <p className="mt-2 text-slate-400">
              Complete topics and subtopics using checkboxes. Progress will be
              calculated automatically.
            </p>

            <div className="mt-3 text-sm text-slate-300">
              <p>{studentName}</p>
              <p>{studentEmail}</p>
            </div>
          </div>

          <button
            onClick={fetchEnrollments}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            <RefreshCcw size={18} />
            Refresh
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Enrolled"
            value={enrollments.length}
            icon={BookOpen}
          />

          <StatCard
            title="Completed"
            value={completedCount}
            icon={CheckCircle2}
          />

          <StatCard
            title="Certificate Eligible"
            value={certificateEligibleCount}
            icon={FileBadge}
          />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3">
            <Search size={18} className="text-cyan-300" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search enrolled courses..."
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            <option className="bg-slate-950">All</option>
            <option className="bg-slate-950">Enrolled</option>
            <option className="bg-slate-950">Ongoing</option>
            <option className="bg-slate-950">Completed</option>
          </select>
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
      </section>

      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center text-white">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />

          <p className="mt-4 font-bold text-slate-300">
            Loading enrolled courses...
          </p>
        </div>
      ) : filteredEnrollments.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center text-white">
          <BookOpen className="mx-auto text-slate-500" size={56} />

          <h2 className="mt-4 text-2xl font-black">No enrolled courses yet</h2>

          <p className="mt-2 text-slate-400">
            Go to landing page courses section and enroll in a course.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 xl:grid-cols-2">
          {filteredEnrollments.map((enrollment) => (
            <EnrollmentCard
              key={enrollment._id}
              enrollment={enrollment}
              expandedCourseId={expandedCourseId}
              setExpandedCourseId={setExpandedCourseId}
              isTopicCompleted={isTopicCompleted}
              handleToggleTopic={handleToggleTopic}
              handleContinueLearning={handleContinueLearning}
              updatingTopicKey={updatingTopicKey}
            />
          ))}
        </section>
      )}
    </div>
  );
}

function EnrollmentCard({
  enrollment,
  expandedCourseId,
  setExpandedCourseId,
  isTopicCompleted,
  handleToggleTopic,
  handleContinueLearning,
  updatingTopicKey,
}) {
  const courseDetails = enrollment.courseId || {};
  const curriculum = courseDetails.curriculum || [];

  const isExpanded = expandedCourseId === enrollment._id;

  const toggleExpand = () => {
    setExpandedCourseId(isExpanded ? "" : enrollment._id);
  };

  const totalItems = getTotalCourseItems(curriculum);
  const completedItems = enrollment.completedTopics?.length || 0;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 text-white transition hover:border-cyan-400/40">
      <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">
            <BookOpen size={34} />
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              enrollment.status === "Completed"
                ? "bg-emerald-400/20 text-emerald-100"
                : enrollment.status === "Ongoing"
                ? "bg-orange-400/20 text-orange-100"
                : "bg-white/20 text-white"
            }`}
          >
            {enrollment.status}
          </span>
        </div>

        <h2 className="mt-6 text-2xl font-black">{enrollment.courseTitle}</h2>

        <p className="mt-2 text-sm font-semibold text-white/80">
          Enrolled on {enrollment.enrolledDate || "N/A"}
        </p>
      </div>

      <div className="p-6">
        <div className="grid gap-3 md:grid-cols-3">
          <Info label="Category" value={courseDetails.category || "N/A"} />
          <Info label="Level" value={courseDetails.level || "N/A"} />
          <Info label="Duration" value={courseDetails.duration || "N/A"} />
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">
              Progress ({completedItems}/{totalItems} items)
            </span>

            <span className="font-bold text-cyan-300">
              {enrollment.progress || 0}%
            </span>
          </div>

          <div className="mt-2 h-3 rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{ width: `${enrollment.progress || 0}%` }}
            />
          </div>
        </div>

        {enrollment.certificateEligible && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-300">
            <Trophy size={22} />

            <div>
              <p className="font-bold">Certificate Generated</p>

              <p className="text-xs text-emerald-200">
                {enrollment.certificateNumber || "Check My Certificates"}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <button
            onClick={() => handleContinueLearning(enrollment)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-300"
          >
            <PlayCircle size={18} />
            Continue Learning
          </button>

          <button
            onClick={toggleExpand}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-black text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            {isExpanded ? "Hide Topics" : "Show Topics"}
          </button>
        </div>

        {isExpanded && (
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
            <h3 className="text-xl font-black">Course Content</h3>

            {curriculum.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-orange-400/30 bg-orange-400/10 p-4 text-orange-300">
                Admin has not added topics for this course yet.
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {curriculum.map((topic, topicIndex) => (
                  <TopicBlock
                    key={topic._id}
                    topic={topic}
                    topicIndex={topicIndex}
                    enrollment={enrollment}
                    isTopicCompleted={isTopicCompleted}
                    handleToggleTopic={handleToggleTopic}
                    updatingTopicKey={updatingTopicKey}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TopicBlock({
  topic,
  topicIndex,
  enrollment,
  isTopicCompleted,
  handleToggleTopic,
  updatingTopicKey,
}) {
  const subTopics = topic.subTopics || [];

  const topicId = String(topic._id);
  const topicCompleted = isTopicCompleted(enrollment, topicId);
  const topicKey = `${enrollment._id}-${topicId}`;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
      <div className="flex items-start gap-3">
        {subTopics.length === 0 ? (
          <input
            type="checkbox"
            checked={topicCompleted}
            disabled={updatingTopicKey === topicKey}
            onChange={() => handleToggleTopic(enrollment, topicId)}
            className="mt-1 h-5 w-5 cursor-pointer accent-cyan-400"
          />
        ) : (
          <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-md border border-cyan-400/40 text-xs font-bold text-cyan-300">
            {topicIndex + 1}
          </div>
        )}

        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4
                className={`font-black ${
                  topicCompleted ? "text-emerald-300 line-through" : "text-white"
                }`}
              >
                {topic.title}
              </h4>

              {topic.description && (
                <p className="mt-1 text-sm text-slate-400">
                  {topic.description}
                </p>
              )}
            </div>

            {topic.duration && (
              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                {topic.duration}
              </span>
            )}
          </div>

          {topic.videoUrl && (
            <button
              onClick={() => window.open(topic.videoUrl, "_blank")}
              className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Watch Topic Video
            </button>
          )}

          {subTopics.length > 0 && (
            <div className="mt-4 space-y-3 border-l border-white/10 pl-4">
              {subTopics.map((subTopic) => {
                const subTopicId = String(subTopic._id);
                const subTopicCompleted = isTopicCompleted(
                  enrollment,
                  topicId,
                  subTopicId
                );
                const subTopicKey = `${enrollment._id}-${topicId}:${subTopicId}`;

                return (
                  <div
                    key={subTopic._id}
                    className="rounded-xl border border-white/10 bg-slate-950/70 p-3"
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={subTopicCompleted}
                        disabled={updatingTopicKey === subTopicKey}
                        onChange={() =>
                          handleToggleTopic(enrollment, topicId, subTopicId)
                        }
                        className="mt-1 h-5 w-5 cursor-pointer accent-cyan-400"
                      />

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <h5
                              className={`font-bold ${
                                subTopicCompleted
                                  ? "text-emerald-300 line-through"
                                  : "text-slate-200"
                              }`}
                            >
                              {subTopic.title}
                            </h5>

                            {subTopic.description && (
                              <p className="mt-1 text-sm text-slate-500">
                                {subTopic.description}
                              </p>
                            )}
                          </div>

                          {subTopic.duration && (
                            <span className="rounded-full bg-purple-400/10 px-3 py-1 text-xs font-bold text-purple-300">
                              {subTopic.duration}
                            </span>
                          )}
                        </div>

                        {subTopic.videoUrl && (
                          <button
                            onClick={() => window.open(subTopic.videoUrl, "_blank")}
                            className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                          >
                            Watch Subtopic Video
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getTotalCourseItems(curriculum = []) {
  let total = 0;

  curriculum.forEach((topic) => {
    if (topic.subTopics && topic.subTopics.length > 0) {
      total += topic.subTopics.length;
    } else {
      total += 1;
    }
  });

  return total;
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

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-950/70 p-3">
      <p className="text-xs text-slate-500">{label}</p>

      <p className="mt-1 truncate font-bold text-slate-200">
        {value || "N/A"}
      </p>
    </div>
  );
}