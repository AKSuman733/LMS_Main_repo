import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Award, BookOpen, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight,
  FileText, Loader2, MessageCircle, NotebookPen, Play, Send, Target,
  Trophy, Upload, X,
} from "lucide-react";
import {
  addEnrollmentComment,
  getCourseEnrollmentById,
  saveEnrollmentNotes,
  updateAssignmentStatus,
  updateLearningProgress,
  updateQuizStatus,
  uploadAssignmentFile,
} from "../../services/courseEnrollmentApi";

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");

export default function CourseLearningPage() {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();

  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState("");
  const [activeMode, setActiveMode] = useState("journey");
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [commentText, setCommentText] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [assignmentUrl, setAssignmentUrl] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [actionMessage, setActionMessage] = useState("");

  const fetchEnrollment = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCourseEnrollmentById(enrollmentId);
      setEnrollment(data);
      setNotes(data.notes || "");
      setAssignmentUrl(data.assignment?.submissionUrl || "");
    } catch (err) {
      setError(err.message || "Failed to load course player.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEnrollment(); }, [enrollmentId]);

  const course = enrollment?.courseId || {};
  const curriculum = Array.isArray(course.curriculum) ? [...course.curriculum].sort((a, b) => (a.order || 0) - (b.order || 0)) : [];
  const quizQuestions = Array.isArray(course.quizQuestions) ? course.quizQuestions : [];
  const assignmentConfig = course.assignment || {};
  const topics = enrollment?.learningTopics || [];

  const activeTopicProgress = topics[activeTopicIndex];
  const activeTopic = curriculum.find((t) => String(t._id) === activeTopicProgress?.topicId) || curriculum[activeTopicIndex];
  const subtopicProgress = (enrollment?.learningSubTopics || []).filter((s) => s.topicId === String(activeTopic?._id));
  const activeSubTopicProgress = subtopicProgress[activeLessonIndex];
  const activeSubTopic = (activeTopic?.subTopics || []).find((s) => String(s._id) === activeSubTopicProgress?.subTopicId) || activeTopic?.subTopics?.[activeLessonIndex];
  const currentLesson = activeSubTopic || activeTopic;
  const currentProgressItem = activeSubTopic ? activeSubTopicProgress : activeTopicProgress;

  const progress = Number(enrollment?.progress || 0);
  const completedLessons = useMemo(() => {
    const leafTopics = curriculum.filter((t) => !t.subTopics?.length).filter((t) =>
      enrollment?.learningTopics?.some((p) => p.topicId === String(t._id) && p.isCompleted)
    ).length;
    const doneSubs = (enrollment?.learningSubTopics || []).filter((s) => s.isCompleted).length;
    return leafTopics + doneSubs;
  }, [curriculum, enrollment]);
  const totalLessons = curriculum.reduce((sum, t) => sum + (t.subTopics?.length || 1), 0);

  const updateProgress = async (item, complete) => {
    if (!item) return;
    try {
      setSavingId(item.subTopicId || item.topicId);
      const updated = await updateLearningProgress(enrollmentId, item.subTopicId ? {
        type: "subTopic", topicId: item.topicId, subTopicId: item.subTopicId, isCompleted: complete,
      } : {
        type: "topic", topicId: item.topicId, isCompleted: complete,
      });
      setEnrollment(updated);
      setActionMessage(complete ? "Lesson completed." : "Lesson marked incomplete.");
    } catch (err) {
      setActionMessage(err.message);
    } finally { setSavingId(""); }
  };

  const handleContinue = async () => {
    if (currentProgressItem && !currentProgressItem.isCompleted) {
      await updateProgress(currentProgressItem, true);
    }
    if (activeSubTopic && activeLessonIndex < (activeTopic?.subTopics?.length || 0) - 1) {
      setActiveLessonIndex((i) => i + 1);
    } else if (activeTopicIndex < curriculum.length - 1) {
      setActiveTopicIndex((i) => i + 1);
      setActiveLessonIndex(0);
    } else {
      setActiveMode("quiz");
    }
  };

  const handlePrevious = () => {
    if (activeLessonIndex > 0) setActiveLessonIndex((i) => i - 1);
    else if (activeTopicIndex > 0) {
      const previousTopic = curriculum[activeTopicIndex - 1];
      setActiveTopicIndex((i) => i - 1);
      setActiveLessonIndex(Math.max(0, (previousTopic?.subTopics?.length || 1) - 1));
    }
  };

  const saveNotes = async () => {
    try {
      await saveEnrollmentNotes(enrollmentId, notes);
      setActionMessage("Notes saved to backend.");
    } catch (err) { setActionMessage(err.message); }
  };

  const addComment = async () => {
    if (!commentText.trim()) return;
    const user = JSON.parse(localStorage.getItem("studentUser") || "{}");
    try {
      const comments = await addEnrollmentComment(enrollmentId, {
        name: user.name || enrollment.studentName || "Student",
        email: user.email || enrollment.email || "",
        message: commentText,
      });
      setEnrollment((prev) => ({ ...prev, comments }));
      setCommentText("");
    } catch (err) { setActionMessage(err.message); }
  };

  const startQuiz = async () => {
    try {
      const updated = await updateQuizStatus(enrollmentId, { status: "In Progress" });
      setEnrollment(updated);
      setQuizStarted(true);
      setQuizAnswers({});
    } catch (err) { setActionMessage(err.message); }
  };

  const submitQuiz = async () => {
    if (!quizQuestions.length) return;
    const unanswered = quizQuestions.some((q) => !quizAnswers[String(q._id)]);
    if (unanswered) return setActionMessage("Please answer every quiz question.");

    let score = 0;
    let totalMarks = 0;
    quizQuestions.forEach((q) => {
      const marks = Number(q.marks || 1);
      totalMarks += marks;
      if (quizAnswers[String(q._id)] === q.correctAnswer) score += marks;
    });

    try {
      const updated = await updateQuizStatus(enrollmentId, { status: "Completed", score, totalMarks });
      setEnrollment(updated);
      setQuizStarted(false);
      setActionMessage(`Quiz submitted. Score: ${score}/${totalMarks}`);
    } catch (err) { setActionMessage(err.message); }
  };

  const submitAssignment = async () => {
    try {
      let updated;
      if (assignmentFile) updated = await uploadAssignmentFile(enrollmentId, assignmentFile);
      else if (assignmentUrl.trim()) updated = await updateAssignmentStatus(enrollmentId, {
        status: "Submitted", title: assignmentConfig.title || `${course.title} Assignment`, submissionUrl: assignmentUrl.trim(),
      });
      else return setActionMessage("Select a file or paste a submission link.");
      setEnrollment(updated);
      setAssignmentFile(null);
      setActionMessage("Assignment submitted successfully.");
    } catch (err) { setActionMessage(err.message); }
  };

  if (loading) return <Centered><Loader2 className="animate-spin text-cyan-400" size={52} /><p>Loading course player...</p></Centered>;
  if (error || !enrollment) return <Centered><h1 className="text-3xl font-black">Course Player Not Found</h1><p>{error}</p><Link className="rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950" to="/courses">Back to Courses</Link></Centered>;

  return (
    <div className="min-h-screen bg-[#101827] text-white">
      <header className="sticky top-0 z-40 border-b border-slate-700 bg-[#1d2938]">
        <div className="flex min-h-[74px] items-center justify-between gap-3 px-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <button onClick={() => navigate("/courses")} className="rounded-full p-2 hover:bg-slate-700"><X size={21} /></button>
            <button onClick={() => setSidebarOpen(true)} className="rounded-full p-2 lg:hidden"><BookOpen size={21} /></button>
            <div className="min-w-0"><h1 className="truncate font-black">{course.title || enrollment.courseTitle}</h1><p className="truncate text-xs text-slate-400">by {enrollment.mentorName || "UptoSkills Mentor"}</p></div>
          </div>
          <div className="text-right"><p className="text-sm font-black text-emerald-400">{progress}%</p><p className="hidden text-xs text-slate-400 sm:block">{completedLessons}/{totalLessons} lessons</p></div>
        </div>
        <div className="h-1 bg-slate-800"><div className="h-full bg-emerald-400" style={{ width: `${progress}%` }} /></div>
      </header>

      <div className="grid min-h-[calc(100vh-75px)] lg:grid-cols-[320px_1fr]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} curriculum={curriculum} enrollment={enrollment} activeTopicIndex={activeTopicIndex} activeLessonIndex={activeLessonIndex} onSelect={(ti, li) => { setActiveTopicIndex(ti); setActiveLessonIndex(li); setActiveMode("journey"); setSidebarOpen(false); }} setMode={setActiveMode} />

        <main className="flex min-w-0 flex-col">
          <div className="border-b border-slate-700 bg-[#1d2938] px-4 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><h2 className="font-black">{activeMode === "journey" ? currentLesson?.title || "Lesson" : modeTitle(activeMode)}</h2><p className="text-xs text-slate-400">Module {activeTopicIndex + 1} of {Math.max(curriculum.length, 1)}</p></div>
              <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
                <Mode text="Journey" active={activeMode === "journey"} onClick={() => setActiveMode("journey")} />
                <Mode text="Quiz" active={activeMode === "quiz"} onClick={() => setActiveMode("quiz")} />
                <Mode text="Assignment" active={activeMode === "assignment"} onClick={() => setActiveMode("assignment")} />
                <Mode text="Notes" active={activeMode === "notes"} onClick={() => setActiveMode("notes")} />
                <Mode text="Community" active={activeMode === "comments"} onClick={() => setActiveMode("comments")} />
                <Mode text="Certificate" active={activeMode === "certificate"} onClick={() => setActiveMode("certificate")} />
              </div>
            </div>
          </div>

          {actionMessage && <div className="mx-4 mt-4 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200 sm:mx-6">{actionMessage}</div>}

          <section className="flex-1 overflow-y-auto p-4 sm:p-6">
            {activeMode === "journey" && <Journey lesson={currentLesson} progressItem={currentProgressItem} saving={savingId} onToggle={updateProgress} />}
            {activeMode === "quiz" && <Quiz questions={quizQuestions} enrollment={enrollment} started={quizStarted} answers={quizAnswers} setAnswers={setQuizAnswers} onStart={startQuiz} onSubmit={submitQuiz} />}
            {activeMode === "assignment" && <Assignment config={assignmentConfig} enrollment={enrollment} url={assignmentUrl} setUrl={setAssignmentUrl} file={assignmentFile} setFile={setAssignmentFile} onSubmit={submitAssignment} />}
            {activeMode === "notes" && <Notes value={notes} setValue={setNotes} onSave={saveNotes} />}
            {activeMode === "comments" && <Comments enrollment={enrollment} value={commentText} setValue={setCommentText} onAdd={addComment} />}
            {activeMode === "certificate" && <Certificate enrollment={enrollment} course={course} />}
          </section>

          {activeMode === "journey" && <footer className="sticky bottom-0 border-t border-slate-700 bg-[#1d2938] p-3 sm:p-4"><div className="flex items-center justify-between gap-3"><button onClick={handlePrevious} disabled={activeTopicIndex === 0 && activeLessonIndex === 0} className="flex items-center gap-1 rounded-xl bg-slate-700 px-4 py-3 font-black disabled:opacity-40"><ChevronLeft />Previous</button><button onClick={handleContinue} className="flex items-center gap-1 rounded-xl bg-violet-600 px-5 py-3 font-black">Continue<ChevronRight /></button></div></footer>}
        </main>
      </div>
    </div>
  );
}

function Sidebar({ open, onClose, curriculum, enrollment, activeTopicIndex, activeLessonIndex, onSelect, setMode }) {
  const content = <aside className="h-full overflow-y-auto border-r border-slate-700 bg-[#1d2938] p-4"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black">Course Content</h2><button className="lg:hidden" onClick={onClose}><X /></button></div><div className="space-y-3">{curriculum.map((topic, ti) => { const selected = ti === activeTopicIndex; return <div key={topic._id} className="overflow-hidden rounded-xl border border-slate-700"><button onClick={() => onSelect(ti, 0)} className={`flex w-full items-center justify-between px-4 py-3 text-left font-black ${selected ? "bg-blue-500/20 text-blue-300" : "bg-slate-900"}`}><span>{ti + 1}. {topic.title}</span>{selected ? <ChevronDown /> : <ChevronRight />}</button>{selected && <div>{(topic.subTopics?.length ? topic.subTopics : [topic]).map((lesson, li) => { const pid = String(topic._id); const sid = topic.subTopics?.length ? String(lesson._id) : null; const done = sid ? enrollment.learningSubTopics?.some(s => s.topicId === pid && s.subTopicId === sid && s.isCompleted) : enrollment.learningTopics?.some(t => t.topicId === pid && t.isCompleted); return <button key={lesson._id} onClick={() => onSelect(ti, li)} className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm ${li === activeLessonIndex ? "bg-blue-500/10 text-blue-300" : "text-slate-400"}`}>{done ? <CheckCircle2 className="text-emerald-400" size={17} /> : <Play size={17} />}<span className="truncate">{lesson.title}</span></button> })}</div>}</div> })}</div><div className="mt-5 grid gap-2"><button onClick={() => setMode("quiz")} className="rounded-xl bg-amber-500/10 p-3 text-left font-black text-amber-300">Quiz</button><button onClick={() => setMode("assignment")} className="rounded-xl bg-cyan-500/10 p-3 text-left font-black text-cyan-300">Assignment</button></div></aside>;
  return <>{open && <div className="fixed inset-0 z-50 bg-black/60 lg:hidden" onClick={onClose}><div className="h-full w-[88%] max-w-[340px]" onClick={e => e.stopPropagation()}>{content}</div></div>}<div className="hidden lg:block">{content}</div></>;
}

function Journey({ lesson, progressItem, saving, onToggle }) {
  if (!lesson) return <Panel><h2 className="text-2xl font-black">No curriculum added</h2><p className="mt-2 text-slate-400">Add topics from the admin course form.</p></Panel>;
  const content = lesson.content || lesson.description || "Lesson content has not been added yet.";
  return <Panel><div className="text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-500/20 text-3xl">🎯</div><h1 className="mt-5 text-3xl font-black sm:text-5xl">{lesson.title}</h1><p className="mx-auto mt-5 max-w-3xl whitespace-pre-line text-left text-base leading-8 text-slate-200 sm:text-lg">{content}</p>{lesson.videoUrl && <div className="mt-6 aspect-video overflow-hidden rounded-2xl bg-black"><iframe className="h-full w-full" src={youtubeEmbed(lesson.videoUrl)} title={lesson.title} allowFullScreen /></div>}{lesson.resourceUrl && <a href={lesson.resourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-xl border border-cyan-400 px-5 py-3 font-black text-cyan-300">Open Resource</a>}<div><button disabled={!progressItem || saving} onClick={() => onToggle(progressItem, !progressItem?.isCompleted)} className={`mt-6 rounded-xl px-6 py-3 font-black ${progressItem?.isCompleted ? "bg-emerald-400 text-slate-950" : "bg-cyan-400 text-slate-950"}`}>{saving ? "Saving..." : progressItem?.isCompleted ? "Completed ✓" : "Mark Complete"}</button></div></div></Panel>;
}

function Quiz({ questions, enrollment, started, answers, setAnswers, onStart, onSubmit }) { return <Panel><div className="flex items-center gap-3"><Trophy className="text-amber-400" /><h1 className="text-3xl font-black">Quiz Challenge</h1></div>{!questions.length ? <p className="mt-5 text-slate-400">Admin has not added quiz questions.</p> : !started ? <><p className="mt-4 text-slate-400">Status: {enrollment.quiz?.status}</p>{enrollment.quiz?.status === "Completed" && <p className="mt-4 rounded-xl bg-emerald-400/10 p-4 text-emerald-300">Score: {enrollment.quiz.score}/{enrollment.quiz.totalMarks} ({enrollment.quiz.percentage}%)</p>}<button onClick={onStart} className="mt-6 rounded-xl bg-amber-500 px-6 py-3 font-black">Start Quiz</button></> : <div className="mt-6 space-y-5">{questions.map((q, qi) => <div key={q._id} className="rounded-2xl border border-slate-700 bg-slate-900 p-5"><h3 className="font-black">{qi + 1}. {q.question}</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{q.options.map(opt => <button key={opt} onClick={() => setAnswers(p => ({ ...p, [String(q._id)]: opt }))} className={`rounded-xl border p-3 text-left ${answers[String(q._id)] === opt ? "border-cyan-400 bg-cyan-400/10" : "border-slate-700"}`}>{opt}</button>)}</div></div>)}<button onClick={onSubmit} className="rounded-xl bg-cyan-400 px-6 py-3 font-black text-slate-950">Submit Quiz</button></div>}</Panel>; }

function Assignment({ config, enrollment, url, setUrl, file, setFile, onSubmit }) { const uploaded = enrollment.assignment?.uploadedFileUrl; return <Panel><div className="flex items-center gap-3"><FileText className="text-cyan-300" /><h1 className="text-3xl font-black">Assignment</h1></div><div className="mt-5 rounded-2xl bg-amber-400/10 p-5"><h2 className="text-xl font-black text-amber-300">{config.title || "Course Assignment"}</h2><p className="mt-3 whitespace-pre-line text-slate-200">{config.question || "Admin has not added an assignment question."}</p>{config.instructions && <p className="mt-3 text-sm text-slate-400">{config.instructions}</p>}</div><div className="mt-5 grid gap-4 md:grid-cols-2"><input value={url} onChange={e => setUrl(e.target.value)} placeholder="GitHub / Drive link" className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3" /><label className="cursor-pointer rounded-xl border border-dashed border-cyan-400/50 bg-cyan-400/10 p-5 text-center"><Upload className="mx-auto text-cyan-300" /><span className="mt-2 block font-black">{file ? file.name : "Choose file"}</span><input type="file" className="hidden" accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg" onChange={e => setFile(e.target.files?.[0] || null)} /></label></div>{uploaded && <a className="mt-4 block text-cyan-300" href={`${API_ORIGIN}${uploaded}`} target="_blank" rel="noreferrer">View uploaded file: {enrollment.assignment.originalFileName}</a>}<button onClick={onSubmit} className="mt-5 rounded-xl bg-cyan-400 px-6 py-3 font-black text-slate-950">Submit Assignment</button></Panel>; }

function Notes({ value, setValue, onSave }) { return <Panel><div className="flex items-center gap-3"><NotebookPen className="text-cyan-300" /><h1 className="text-3xl font-black">Learning Notepad</h1></div><textarea value={value} onChange={e => setValue(e.target.value)} className="mt-5 min-h-[420px] w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 outline-none" placeholder="Write notes..." /><button onClick={onSave} className="mt-4 rounded-xl bg-cyan-400 px-6 py-3 font-black text-slate-950">Save Notes</button></Panel>; }

function Comments({ enrollment, value, setValue, onAdd }) { return <Panel><div className="flex items-center gap-3"><MessageCircle className="text-cyan-300" /><h1 className="text-3xl font-black">Community</h1></div><div className="mt-5 flex flex-col gap-3 sm:flex-row"><input value={value} onChange={e => setValue(e.target.value)} className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3" placeholder="Ask a doubt..." /><button onClick={onAdd} className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950"><Send size={17} />Send</button></div><div className="mt-5 space-y-3">{(enrollment.comments || []).map(c => <div key={c._id} className="rounded-xl bg-slate-900 p-4"><div className="flex justify-between gap-3"><b className="text-cyan-300">{c.name}</b><span className="text-xs text-slate-500">{new Date(c.createdAt).toLocaleString()}</span></div><p className="mt-2 text-slate-300">{c.message}</p></div>)}</div></Panel>; }

function Certificate({ enrollment, course }) { const rules = course.certificateRules || {}; return <Panel><div className="text-center"><Award className="mx-auto text-emerald-400" size={64} /><h1 className="mt-4 text-3xl font-black">Certificate Progress</h1><div className={`mt-6 rounded-2xl p-6 ${enrollment.certificateEligible ? "bg-emerald-400/10 text-emerald-300" : "bg-slate-900 text-slate-400"}`}><h2 className="text-2xl font-black">{enrollment.certificateEligible ? "Certificate Eligible" : "Not Eligible Yet"}</h2><p className="mt-3">Progress required: {rules.minimumProgress ?? 100}%</p><p>Quiz passing: {rules.passingPercentage ?? 70}%</p><p>Assignment required: {rules.assignmentRequired === false ? "No" : "Yes"}</p></div></div></Panel>; }

function Mode({ text, active, onClick }) { return <button onClick={onClick} className={`whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-black ${active ? "border-violet-500 bg-violet-500/20 text-violet-300" : "border-slate-600"}`}>{text}</button>; }
function Panel({ children }) { return <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-700 bg-[#1d2938] p-4 sm:p-7">{children}</div>; }
function Centered({ children }) { return <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#101827] px-5 text-center text-white">{children}</div>; }
function modeTitle(mode) { return ({ quiz: "Quiz Challenge", assignment: "Assignment", notes: "Learning Notepad", comments: "Community", certificate: "Certificate" })[mode] || "Learning"; }
function youtubeEmbed(url = "") { const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/); return m ? `https://www.youtube.com/embed/${m[1]}` : url; }
