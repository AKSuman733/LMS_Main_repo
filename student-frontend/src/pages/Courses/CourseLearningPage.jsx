import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Heart,
  Loader2,
  Lock,
  MessageCircle,
  NotebookPen,
  Play,
  Settings,
  Star,
  Target,
  Trophy,
  Upload,
  User,
  X,
  Zap,
} from "lucide-react";

import {
  getCourseEnrollmentById,
  updateAssignmentStatus,
  updateLearningProgress,
  updateQuizStatus,
} from "../../services/courseEnrollmentApi";

const fallbackLessons = [
  "Introduction and Course Overview",
  "Core Concepts and Fundamentals",
  "Practical Implementation",
  "Real World Example",
  "Practice Task",
  "Quiz",
  "Assignment",
];

const demoQuizQuestions = [
  {
    id: "q1",
    question: "What is the main goal of this lesson?",
    options: [
      "Only watching content",
      "Learning with practice",
      "Skipping assignment",
      "Finishing without quiz",
    ],
    answer: "Learning with practice",
  },
  {
    id: "q2",
    question: "What increases your learning progress?",
    options: ["Completing topics", "Completing lessons", "Practice", "All of these"],
    answer: "All of these",
  },
  {
    id: "q3",
    question: "What is required for certificate eligibility?",
    options: [
      "Open course once",
      "Complete course progress",
      "Only login",
      "Only payment",
    ],
    answer: "Complete course progress",
  },
];

export default function CourseLearningPage() {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();

  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");

  const [activeMode, setActiveMode] = useState("journey");
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const [notes, setNotes] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const [assignmentUrl, setAssignmentUrl] = useState("");
  const [assignmentFileName, setAssignmentFileName] = useState("");

  const [quizStarted, setQuizStarted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const notesKey = `uptoskills-notes-${enrollmentId}`;
  const commentsKey = `uptoskills-comments-${enrollmentId}`;

  const progress = Number(enrollment?.progress || 0);

  const courseTitle = enrollment?.courseTitle || "Course Learning";

  const fetchEnrollment = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCourseEnrollmentById(enrollmentId);

      setEnrollment(data);
      setAssignmentUrl(data?.assignment?.submissionUrl || "");
      setNotes(localStorage.getItem(notesKey) || "");
      setComments(JSON.parse(localStorage.getItem(commentsKey) || "[]"));
    } catch (err) {
      setError(err.message || "Failed to load course learning page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollment();
  }, [enrollmentId]);

  const topics = useMemo(() => {
    if (enrollment?.learningTopics?.length > 0) {
      return enrollment.learningTopics;
    }

    return fallbackLessons.map((title, index) => ({
      topicId: `fallback-topic-${index + 1}`,
      title,
      isCompleted: false,
    }));
  }, [enrollment]);

  const activeTopic = topics[activeTopicIndex] || topics[0];

  const activeSubtopics = useMemo(() => {
    if (!activeTopic) return [];

    const realSubtopics = (enrollment?.learningSubTopics || []).filter(
      (item) => item.topicId === activeTopic.topicId
    );

    if (realSubtopics.length > 0) return realSubtopics;

    return [
      {
        subTopicId: `${activeTopic.topicId}-lesson-1`,
        topicId: activeTopic.topicId,
        title: "Concept Explanation",
        isCompleted: activeTopic.isCompleted,
      },
      {
        subTopicId: `${activeTopic.topicId}-lesson-2`,
        topicId: activeTopic.topicId,
        title: "Practical Example",
        isCompleted: false,
      },
      {
        subTopicId: `${activeTopic.topicId}-lesson-3`,
        topicId: activeTopic.topicId,
        title: "Practice Check",
        isCompleted: false,
      },
    ];
  }, [enrollment, activeTopic]);

  const currentLesson =
    activeSubtopics[activeLessonIndex] || activeSubtopics[0] || activeTopic;

  const totalLessons = topics.length + Number(enrollment?.learningSubTopics?.length || 0);

  const completedLessons = useMemo(() => {
    const completedTopics = (enrollment?.learningTopics || []).filter(
      (item) => item.isCompleted
    ).length;

    const completedSubtopics = (enrollment?.learningSubTopics || []).filter(
      (item) => item.isCompleted
    ).length;

    return completedTopics + completedSubtopics;
  }, [enrollment]);

  const handleToggleTopic = async (topic) => {
    if (String(topic.topicId).startsWith("fallback")) {
      alert("This demo topic is not connected to backend. Add real topics from admin course form.");
      return;
    }

    try {
      setSavingId(topic.topicId);

      const updated = await updateLearningProgress(enrollmentId, {
        type: "topic",
        topicId: topic.topicId,
        isCompleted: !topic.isCompleted,
      });

      setEnrollment(updated);
    } catch (err) {
      alert(err.message || "Failed to update topic.");
    } finally {
      setSavingId("");
    }
  };

  const handleToggleSubtopic = async (subtopic) => {
    if (String(subtopic.subTopicId).includes("fallback")) {
      alert("This demo lesson is not connected to backend. Add real subtopics from admin course form.");
      return;
    }

    try {
      setSavingId(subtopic.subTopicId);

      const updated = await updateLearningProgress(enrollmentId, {
        type: "subTopic",
        topicId: subtopic.topicId,
        subTopicId: subtopic.subTopicId,
        isCompleted: !subtopic.isCompleted,
      });

      setEnrollment(updated);
    } catch (err) {
      alert(err.message || "Failed to update lesson.");
    } finally {
      setSavingId("");
    }
  };

  const handlePrevious = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex((prev) => prev - 1);
      return;
    }

    if (activeTopicIndex > 0) {
      setActiveTopicIndex((prev) => prev - 1);
      setActiveLessonIndex(0);
    }
  };

  const handleContinue = async () => {
    if (currentLesson?.subTopicId) {
      await handleToggleSubtopic(currentLesson);
    } else if (activeTopic) {
      await handleToggleTopic(activeTopic);
    }

    if (activeLessonIndex < activeSubtopics.length - 1) {
      setActiveLessonIndex((prev) => prev + 1);
      return;
    }

    if (activeTopicIndex < topics.length - 1) {
      setActiveTopicIndex((prev) => prev + 1);
      setActiveLessonIndex(0);
    }
  };

  const handleSaveNotes = () => {
    localStorage.setItem(notesKey, notes);
    alert("Notes saved successfully.");
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const user = JSON.parse(localStorage.getItem("studentUser") || "{}");

    const newComment = {
      id: Date.now(),
      name: user.name || "Student",
      message: commentText.trim(),
      time: new Date().toLocaleString(),
    };

    const updatedComments = [newComment, ...comments];

    setComments(updatedComments);
    setCommentText("");
    localStorage.setItem(commentsKey, JSON.stringify(updatedComments));
  };

  const handleStartQuiz = async () => {
    try {
      setQuizStarted(true);
      setQuizResult(null);

      const updated = await updateQuizStatus(enrollmentId, {
        status: "In Progress",
      });

      setEnrollment(updated);
    } catch (err) {
      alert(err.message || "Failed to start quiz.");
    }
  };

  const handleSubmitQuiz = async () => {
    let score = 0;

    demoQuizQuestions.forEach((question) => {
      if (quizAnswers[question.id] === question.answer) {
        score += 1;
      }
    });

    try {
      const updated = await updateQuizStatus(enrollmentId, {
        status: "Completed",
        score,
        totalMarks: demoQuizQuestions.length,
      });

      setEnrollment(updated);
      setQuizResult({
        score,
        totalMarks: demoQuizQuestions.length,
      });
      setQuizStarted(false);
    } catch (err) {
      alert(err.message || "Failed to submit quiz.");
    }
  };

  const handleAssignmentFile = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setAssignmentFileName(file.name);
    setAssignmentUrl(`Uploaded file: ${file.name}`);
  };

  const handleSubmitAssignment = async () => {
    if (!assignmentUrl.trim()) {
      alert("Please paste assignment link or upload a file.");
      return;
    }

    try {
      const updated = await updateAssignmentStatus(enrollmentId, {
        status: "Submitted",
        title: `${courseTitle} Assignment`,
        submissionUrl: assignmentUrl.trim(),
      });

      setEnrollment(updated);
      alert("Assignment submitted successfully.");
    } catch (err) {
      alert(err.message || "Failed to submit assignment.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101827] text-white">
        <div className="text-center">
          <Loader2 className="mx-auto animate-spin text-emerald-400" size={52} />
          <p className="mt-4 font-bold text-slate-300">Loading course player...</p>
        </div>
      </div>
    );
  }

  if (error || !enrollment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101827] px-6 text-white">
        <div className="max-w-lg rounded-3xl border border-slate-700 bg-[#1d2938] p-8 text-center">
          <h1 className="text-3xl font-black">Course Player Not Found</h1>
          <p className="mt-3 text-slate-400">{error || "Enrollment not found."}</p>
          <Link
            to="/courses"
            className="mt-6 inline-flex rounded-2xl bg-emerald-400 px-6 py-3 font-black text-slate-950"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const isFirstLesson = activeTopicIndex === 0 && activeLessonIndex === 0;
  const isLastLesson =
    activeTopicIndex === topics.length - 1 &&
    activeLessonIndex === activeSubtopics.length - 1;

  return (
    <div className="min-h-screen bg-[#101827] text-white">
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-[#1d2938]">
        <div className="flex h-[74px] items-center justify-between px-5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/courses")}
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
            >
              <X size={22} />
            </button>

            <button
              onClick={() => navigate("/courses")}
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
            >
              <ChevronLeft size={24} />
            </button>

            <div>
              <h1 className="font-black text-white">{courseTitle}</h1>
              <p className="text-sm text-slate-400">
                by {enrollment.mentorName || "UptoSkills Mentor"}
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2 rounded-full bg-rose-500/10 px-4 py-2 font-black text-rose-400">
              <Heart size={17} fill="currentColor" />
              5
            </div>

            <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-slate-300">
              <span className="text-pink-400">🎒 lvl 4</span>{" "}
              <span className="ml-2">1594 xp</span>
            </div>

            <div className="text-sm font-black text-emerald-400">
              Progress: {progress}%{" "}
              <span className="text-slate-400">
                ({completedLessons}/{totalLessons || topics.length} lessons)
              </span>
            </div>

            <Settings className="text-slate-400" size={21} />
          </div>
        </div>

        <div className="h-[3px] bg-slate-800">
          <div
            className="h-full bg-emerald-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-74px)] grid-cols-1 lg:grid-cols-[335px_1fr]">
        <aside className="border-r border-slate-700 bg-[#1d2938] p-4">
          <h2 className="mb-5 text-xl font-black">League Content</h2>

          <div className="space-y-3">
            {topics.map((topic, topicIndex) => {
              const selected = activeTopicIndex === topicIndex;
              const subtopics = (enrollment.learningSubTopics || []).filter(
                (item) => item.topicId === topic.topicId
              );

              const displaySubtopics =
                subtopics.length > 0
                  ? subtopics
                  : [
                      {
                        subTopicId: `${topic.topicId}-demo-1`,
                        title: "Lesson Overview",
                        isCompleted: topic.isCompleted,
                        topicId: topic.topicId,
                      },
                      {
                        subTopicId: `${topic.topicId}-demo-2`,
                        title: "Practice Content",
                        isCompleted: false,
                        topicId: topic.topicId,
                      },
                    ];

              return (
                <div
                  key={topic.topicId}
                  className={`overflow-hidden rounded-lg border ${
                    selected
                      ? "border-blue-500/40 bg-blue-500/10"
                      : "border-slate-600 bg-slate-900/40"
                  }`}
                >
                  <button
                    onClick={() => {
                      setActiveTopicIndex(topicIndex);
                      setActiveLessonIndex(0);
                      setActiveMode("journey");
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left font-black ${
                      selected
                        ? "bg-blue-600/20 text-blue-300"
                        : "text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <span>
                      {topicIndex + 1}. {topic.title}
                    </span>
                    {selected ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </button>

                  {selected && (
                    <div className="border-t border-slate-700 py-2">
                      {displaySubtopics.map((lesson, lessonIndex) => {
                        const lessonSelected = activeLessonIndex === lessonIndex;

                        return (
                          <button
                            key={lesson.subTopicId}
                            onClick={() => {
                              setActiveLessonIndex(lessonIndex);
                              setActiveMode("journey");
                            }}
                            className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-bold ${
                              lessonSelected
                                ? "border-r-2 border-blue-400 bg-blue-500/20 text-blue-300"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                          >
                            {lesson.isCompleted ? (
                              <CheckCircle2 size={18} className="text-emerald-400" />
                            ) : lessonSelected ? (
                              <Play size={18} className="text-slate-300" fill="currentColor" />
                            ) : (
                              <Play size={18} className="text-slate-500" fill="currentColor" />
                            )}

                            <span className="truncate">{lesson.title}</span>
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setActiveMode("quiz")}
                        className="flex w-full items-center gap-3 px-8 py-3 text-left text-sm font-black text-amber-400 hover:bg-slate-800"
                      >
                        <Trophy size={17} />
                        Quiz
                      </button>

                      <button
                        onClick={() => setActiveMode("assignment")}
                        className="flex w-full items-center gap-3 px-8 py-3 text-left text-sm font-black text-cyan-300 hover:bg-slate-800"
                      >
                        <FileText size={17} />
                        Assignment
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => setActiveMode("certificate")}
              className="mt-5 flex w-full items-center justify-between rounded-lg border border-slate-600 bg-slate-900/50 px-4 py-4 font-black text-slate-200 hover:bg-slate-800"
            >
              <span className="flex items-center gap-2">
                <Play size={18} fill="currentColor" />
                Complete League
              </span>

              <span className="rounded-md bg-amber-500/20 px-3 py-1 text-xs text-amber-300">
                Final
              </span>
            </button>
          </div>
        </aside>

        <main className="flex min-h-[calc(100vh-74px)] flex-col">
          <div className="border-b border-slate-700 bg-[#1d2938] px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">
                  {activeMode === "journey" && (currentLesson?.title || activeTopic?.title)}
                  {activeMode === "quiz" && "Quiz Challenge"}
                  {activeMode === "assignment" && "Assignment Submission"}
                  {activeMode === "notes" && "Learning Notepad"}
                  {activeMode === "comments" && "Community Discussion"}
                  {activeMode === "certificate" && "Certificate Progress"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  <span className="font-black text-amber-400">🏆 35 XP</span>{" "}
                  Mission {activeTopicIndex + 1} of {topics.length}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <ModeButton
                  active={activeMode === "journey"}
                  onClick={() => setActiveMode("journey")}
                  icon={BookOpen}
                  text="Journey"
                />

                <ModeButton
                  active={activeMode === "quiz"}
                  onClick={() => setActiveMode("quiz")}
                  icon={Target}
                  text="Challenges"
                />

                <ModeButton
                  active={activeMode === "comments"}
                  onClick={() => setActiveMode("comments")}
                  icon={MessageCircle}
                  text="Community"
                  badge="2"
                />

                <button
                  onClick={() => setActiveMode("notes")}
                  className="rounded-xl border border-slate-600 px-5 py-3 font-black text-slate-200 hover:bg-slate-800"
                >
                  Notes
                </button>

                <button className="rounded-xl bg-rose-500 px-5 py-3 font-black text-white hover:bg-rose-400">
                  Upgrade Pro
                </button>
              </div>
            </div>
          </div>

          <section className="flex flex-1 items-center justify-center bg-[#111827] p-6">
            {activeMode === "journey" && (
              <JourneyScreen
                courseTitle={courseTitle}
                activeTopic={activeTopic}
                currentLesson={currentLesson}
                savingId={savingId}
                handleToggleTopic={handleToggleTopic}
                handleToggleSubtopic={handleToggleSubtopic}
              />
            )}

            {activeMode === "quiz" && (
              <QuizScreen
                enrollment={enrollment}
                quizStarted={quizStarted}
                quizAnswers={quizAnswers}
                setQuizAnswers={setQuizAnswers}
                quizResult={quizResult}
                handleStartQuiz={handleStartQuiz}
                handleSubmitQuiz={handleSubmitQuiz}
              />
            )}

            {activeMode === "assignment" && (
              <AssignmentScreen
                enrollment={enrollment}
                assignmentUrl={assignmentUrl}
                setAssignmentUrl={setAssignmentUrl}
                assignmentFileName={assignmentFileName}
                handleAssignmentFile={handleAssignmentFile}
                handleSubmitAssignment={handleSubmitAssignment}
              />
            )}

            {activeMode === "notes" && (
              <NotesScreen notes={notes} setNotes={setNotes} handleSaveNotes={handleSaveNotes} />
            )}

            {activeMode === "comments" && (
              <CommentsScreen
                commentText={commentText}
                setCommentText={setCommentText}
                comments={comments}
                handleAddComment={handleAddComment}
              />
            )}

            {activeMode === "certificate" && (
              <CertificateScreen enrollment={enrollment} progress={progress} />
            )}
          </section>

          <footer className="border-t border-slate-700 bg-[#1d2938] px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrevious}
                disabled={isFirstLesson}
                className="flex items-center gap-2 rounded-lg bg-slate-700 px-8 py-4 font-black text-slate-300 transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft />
                Previous
              </button>

              <div className="hidden items-center gap-3 sm:flex">
                <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-violet-500"
                    style={{
                      width: `${Math.min(
                        100,
                        ((activeTopicIndex + 1) / topics.length) * 100
                      )}%`,
                    }}
                  />
                </div>

                <span className="font-black text-slate-300">
                  <Zap className="inline text-violet-400" size={22} />{" "}
                  {activeTopicIndex + 1} of {topics.length}
                </span>
              </div>

              <button
                onClick={handleContinue}
                disabled={isLastLesson && progress >= 100}
                className="flex items-center gap-2 rounded-lg bg-violet-600 px-8 py-4 font-black text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
                <ChevronRight />
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

function JourneyScreen({
  courseTitle,
  activeTopic,
  currentLesson,
  savingId,
  handleToggleTopic,
  handleToggleSubtopic,
}) {
  const title = currentLesson?.title || activeTopic?.title || "Lesson";

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-500/20 text-5xl">
        🎯
      </div>

      <h1 className="mt-8 text-4xl font-black md:text-5xl">
        Welcome to {title}!
      </h1>

      <p className="mt-8 text-xl leading-9 text-slate-200">
        🎉 Woohoo! Time for your lesson in{" "}
        <span className="font-black text-cyan-300">{courseTitle}</span>. This
        section explains the topic clearly, helps you understand concepts, and
        prepares you for practice, quiz and assignment.
      </p>

      <div className="mt-8 rounded-3xl border border-slate-700 bg-[#1d2938] p-6 text-left">
        <h2 className="text-2xl font-black">What you will learn</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <LearningPoint text="Concept clarity" />
          <LearningPoint text="Practical example" />
          <LearningPoint text="Practice task" />
        </div>
      </div>

      <button
        onClick={() =>
          currentLesson?.subTopicId
            ? handleToggleSubtopic(currentLesson)
            : handleToggleTopic(activeTopic)
        }
        className="mt-8 rounded-xl bg-emerald-400 px-7 py-4 font-black text-slate-950"
      >
        {savingId ? "Saving..." : "Mark This Lesson Complete"}
      </button>
    </div>
  );
}

function QuizScreen({
  enrollment,
  quizStarted,
  quizAnswers,
  setQuizAnswers,
  quizResult,
  handleStartQuiz,
  handleSubmitQuiz,
}) {
  return (
    <div className="w-full max-w-4xl">
      <div className="rounded-3xl border border-slate-700 bg-[#1d2938] p-8">
        <div className="flex items-center gap-3">
          <Trophy className="text-amber-400" size={32} />
          <h1 className="text-4xl font-black">Quiz Challenge</h1>
        </div>

        <p className="mt-4 text-slate-400">
          Status:{" "}
          <span className="font-black text-white">
            {enrollment.quiz?.status || "Not Started"}
          </span>
        </p>

        {enrollment.quiz?.status === "Completed" && (
          <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-emerald-300">
            Score: {enrollment.quiz.score}/{enrollment.quiz.totalMarks}
          </div>
        )}

        {!quizStarted ? (
          <button
            onClick={handleStartQuiz}
            className="mt-8 rounded-xl bg-amber-500 px-7 py-4 font-black text-white"
          >
            Start Quiz
          </button>
        ) : (
          <div className="mt-8 space-y-6">
            {demoQuizQuestions.map((question, index) => (
              <div
                key={question.id}
                className="rounded-2xl border border-slate-700 bg-slate-900 p-5"
              >
                <h2 className="text-xl font-black">
                  {index + 1}. {question.question}
                </h2>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      onClick={() =>
                        setQuizAnswers((prev) => ({
                          ...prev,
                          [question.id]: option,
                        }))
                      }
                      className={`rounded-xl border p-4 text-left font-bold ${
                        quizAnswers[question.id] === option
                          ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                          : "border-slate-700 bg-slate-800 text-slate-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmitQuiz}
              className="rounded-xl bg-cyan-400 px-7 py-4 font-black text-slate-950"
            >
              Submit Quiz
            </button>
          </div>
        )}

        {quizResult && (
          <div className="mt-5 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-5 text-cyan-300">
            Your score: {quizResult.score}/{quizResult.totalMarks}
          </div>
        )}
      </div>
    </div>
  );
}

function AssignmentScreen({
  enrollment,
  assignmentUrl,
  setAssignmentUrl,
  assignmentFileName,
  handleAssignmentFile,
  handleSubmitAssignment,
}) {
  return (
    <div className="w-full max-w-4xl">
      <div className="rounded-3xl border border-slate-700 bg-[#1d2938] p-8">
        <div className="flex items-center gap-3">
          <FileText className="text-cyan-300" size={32} />
          <h1 className="text-4xl font-black">Assignment</h1>
        </div>

        <p className="mt-4 text-slate-400">
          Status:{" "}
          <span className="font-black text-white">
            {enrollment.assignment?.status || "Not Submitted"}
          </span>
        </p>

        <div className="mt-7 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5">
          <h2 className="text-2xl font-black text-amber-300">
            Assignment Question
          </h2>

          <p className="mt-4 leading-8 text-slate-200">
            Create a practical project or report based on this course lesson.
            Include your learning points, screenshots, code/output and submit
            your GitHub, Drive link or upload a file.
          </p>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <h3 className="font-black">Paste Assignment Link</h3>

            <input
              value={assignmentUrl}
              onChange={(event) => setAssignmentUrl(event.target.value)}
              placeholder="Paste GitHub / Drive / project link"
              className="mt-4 w-full rounded-xl border border-slate-700 bg-[#111827] px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <h3 className="font-black">Upload Assignment File</h3>

            <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-cyan-400/50 bg-cyan-400/10 p-8 text-center">
              <Upload className="text-cyan-300" size={36} />
              <span className="mt-3 font-black text-cyan-300">
                Choose File
              </span>
              <span className="mt-1 text-xs text-slate-400">
                PDF, DOC, ZIP, PNG, JPG
              </span>

              <input type="file" className="hidden" onChange={handleAssignmentFile} />
            </label>

            {assignmentFileName && (
              <p className="mt-3 text-sm font-bold text-emerald-300">
                Selected: {assignmentFileName}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmitAssignment}
          className="mt-7 rounded-xl bg-cyan-400 px-7 py-4 font-black text-slate-950"
        >
          Submit Assignment
        </button>
      </div>
    </div>
  );
}

function NotesScreen({ notes, setNotes, handleSaveNotes }) {
  return (
    <div className="w-full max-w-4xl">
      <div className="rounded-3xl border border-slate-700 bg-[#1d2938] p-8">
        <div className="flex items-center gap-3">
          <NotebookPen className="text-cyan-300" size={32} />
          <h1 className="text-4xl font-black">Learning Notepad</h1>
        </div>

        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Write your notes here..."
          className="mt-7 min-h-[430px] w-full rounded-2xl border border-slate-700 bg-[#111827] p-5 text-white outline-none focus:border-cyan-400"
        />

        <button
          onClick={handleSaveNotes}
          className="mt-5 rounded-xl bg-cyan-400 px-7 py-4 font-black text-slate-950"
        >
          Save Notes
        </button>
      </div>
    </div>
  );
}

function CommentsScreen({
  commentText,
  setCommentText,
  comments,
  handleAddComment,
}) {
  return (
    <div className="w-full max-w-4xl">
      <div className="rounded-3xl border border-slate-700 bg-[#1d2938] p-8">
        <div className="flex items-center gap-3">
          <MessageCircle className="text-cyan-300" size={32} />
          <h1 className="text-4xl font-black">Community Discussion</h1>
        </div>

        <div className="mt-7 flex gap-3">
          <input
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Ask doubt or add comment..."
            className="w-full rounded-xl border border-slate-700 bg-[#111827] px-5 py-4 text-white outline-none focus:border-cyan-400"
          />

          <button
            onClick={handleAddComment}
            className="rounded-xl bg-cyan-400 px-6 py-4 font-black text-slate-950"
          >
            Send
          </button>
        </div>

        <div className="mt-7 space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-2xl border border-slate-700 bg-slate-900 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-cyan-300">{comment.name}</h3>
                  <span className="text-xs text-slate-500">{comment.time}</span>
                </div>

                <p className="mt-3 text-slate-300">{comment.message}</p>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-center text-slate-400">
              No comments yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CertificateScreen({ enrollment, progress }) {
  return (
    <div className="w-full max-w-3xl text-center">
      <div className="rounded-3xl border border-slate-700 bg-[#1d2938] p-10">
        <Award className="mx-auto text-emerald-400" size={70} />

        <h1 className="mt-6 text-4xl font-black">Certificate Progress</h1>

        <p className="mt-4 text-slate-300">
          Complete all lessons, quiz and assignment to unlock certificate.
        </p>

        <div
          className={`mt-8 rounded-2xl border p-6 ${
            enrollment.certificateEligible || progress >= 100
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
              : "border-slate-700 bg-slate-900 text-slate-400"
          }`}
        >
          <h2 className="text-2xl font-black">
            {enrollment.certificateEligible || progress >= 100
              ? "Certificate Eligible"
              : "Not Eligible Yet"}
          </h2>

          <p className="mt-2">Current Progress: {progress}%</p>
        </div>
      </div>
    </div>
  );
}

function ModeButton({ active, onClick, icon: Icon, text, badge }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 rounded-xl border px-5 py-3 font-black transition ${
        active
          ? "border-violet-500 bg-violet-500/20 text-violet-300"
          : "border-slate-600 bg-slate-900 text-slate-200 hover:bg-slate-800"
      }`}
    >
      {badge && (
        <span className="absolute -left-2 -top-2 rounded-full bg-violet-600 px-2 py-1 text-xs text-white">
          {badge}
        </span>
      )}
      <Icon size={18} />
      {text}
    </button>
  );
}

function LearningPoint({ text }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
      <CheckCircle2 className="text-emerald-400" />
      <p className="mt-3 font-bold text-slate-200">{text}</p>
    </div>
  );
}