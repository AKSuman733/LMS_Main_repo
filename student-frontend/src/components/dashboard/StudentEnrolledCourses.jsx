import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  FileBadge,
  PlayCircle,
  RefreshCcw,
  Search,
  Trophy,
} from "lucide-react";

const STUDENTS_API_URL = "http://localhost:5000/api/students";
const ENROLLMENTS_API_URL = "http://localhost:5000/api/course-enrollments";

export default function StudentEnrolledCourses() {
  const user = JSON.parse(localStorage.getItem("studentUser") || "{}");
  const studentEmail = user.email || "charvraj2006@gmail.com";

  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const safeJson = async (response) => {
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch {
      return {
        success: false,
        data: [],
        message: "Backend did not return JSON.",
      };
    }
  };

  const fetchFromCourseEnrollments = async () => {
    try {
      const response = await fetch(
        `${ENROLLMENTS_API_URL}/student/${encodeURIComponent(studentEmail)}`
      );

      const result = await safeJson(response);

      if (!response.ok || !result.success) {
        return [];
      }

      return (result.data || []).map((item) => ({
        _id: item._id,
        studentName: item.studentName,
        email: item.email,
        phone: item.phone || "",
        courseTitle: item.courseTitle,
        progress: Number(item.progress || 0),
        spent: item.spent || item.price || 0,
        status: item.status || "Enrolled",
        certificateEligible: item.certificateEligible || false,
        certificateNumber: item.certificateNumber || "",
        enrolledDate: item.enrolledDate || item.createdAt || "",
        source: "course-enrollments",
      }));
    } catch {
      return [];
    }
  };

  const fetchFromAdminStudents = async () => {
    try {
      const response = await fetch(STUDENTS_API_URL);
      const result = await safeJson(response);

      if (!response.ok || !result.success) {
        return [];
      }

      const allStudents = result.data || [];

      const matchedStudents = allStudents.filter((student) => {
        const email =
          student.email ||
          student.studentEmail ||
          student.gmail ||
          student.contactEmail ||
          "";

        return email.toLowerCase() === studentEmail.toLowerCase();
      });

      return matchedStudents.map((student) => {
        const progress = Number(student.progress || student.courseProgress || 0);

        return {
          _id: student._id,
          studentName: student.name || student.studentName || "Student",
          email: student.email || student.studentEmail || studentEmail,
          phone: student.phone || student.contact || "",
          courseTitle:
            student.course ||
            student.courseName ||
            student.courseTitle ||
            student.enrolledCourse ||
            "Enrolled Course",
          progress,
          spent: student.spent || student.totalSpent || student.amount || 0,
          status:
            student.status ||
            (progress >= 100 ? "Completed" : progress > 0 ? "Ongoing" : "Enrolled"),
          certificateEligible:
            student.certificateEligible ||
            student.certificate === "Yes" ||
            progress >= 100,
          certificateNumber: student.certificateNumber || "",
          enrolledDate: student.joinedDate || student.createdAt || "",
          source: "students",
        };
      });
    } catch {
      return [];
    }
  };

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      setError("");

      const realEnrollments = await fetchFromCourseEnrollments();
      const adminStudentEnrollments = await fetchFromAdminStudents();

      const merged = [...realEnrollments, ...adminStudentEnrollments];

      const unique = merged.filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (course) =>
              course.email === item.email &&
              course.courseTitle === item.courseTitle
          )
      );

      setEnrollments(unique);
    } catch (err) {
      setError(err.message || "Failed to load enrolled courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((item) => {
      const text = `${item.courseTitle} ${item.status} ${item.email}`.toLowerCase();

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

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 text-white shadow-2xl shadow-cyan-500/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-300">Dashboard / My Courses</p>

            <h1 className="mt-2 text-4xl font-black">My Enrolled Courses</h1>

            <p className="mt-2 text-slate-400">
              Courses enrolled by your login email will appear here.
            </p>

            <p className="mt-3 text-sm text-slate-300">{studentEmail}</p>
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
            <option className="bg-slate-950">Active</option>
          </select>
        </div>

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
            <AlertCircle />
            <p className="font-semibold">{error}</p>
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
            No course enrollment found for this email.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredEnrollments.map((enrollment) => (
            <EnrollmentCard key={enrollment._id} enrollment={enrollment} />
          ))}
        </section>
      )}
    </div>
  );
}

function EnrollmentCard({ enrollment }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 text-white transition hover:-translate-y-2 hover:border-cyan-400/40">
      <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-6">
        <div className="flex items-start justify-between">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">
            <BookOpen size={34} />
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              enrollment.status === "Completed"
                ? "bg-emerald-400/20 text-emerald-100"
                : enrollment.status === "Ongoing" || enrollment.status === "Active"
                ? "bg-orange-400/20 text-orange-100"
                : "bg-white/20 text-white"
            }`}
          >
            {enrollment.status}
          </span>
        </div>

        <h2 className="mt-6 text-2xl font-black">
          {enrollment.courseTitle}
        </h2>

        <p className="mt-2 text-sm font-semibold text-white/80">
          Enrolled on {formatDate(enrollment.enrolledDate)}
        </p>
      </div>

      <div className="p-6">
        <Info label="Student" value={enrollment.studentName} />
        <Info label="Email" value={enrollment.email} />
        <Info label="Spent" value={`₹${enrollment.spent || 0}`} />

        <div className="mt-5">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Progress</span>
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
            <p className="font-bold">Certificate Eligible</p>
          </div>
        )}

        <button
          onClick={() => alert("Course player/video section will connect later.")}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-300"
        >
          <PlayCircle size={18} />
          Continue Learning
        </button>
      </div>
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

function Info({ label, value }) {
  return (
    <div className="mt-3 rounded-2xl bg-slate-950/70 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 truncate font-bold text-slate-200">
        {value || "N/A"}
      </p>
    </div>
  );
}

function formatDate(dateValue) {
  if (!dateValue) return "N/A";

  try {
    return new Date(dateValue).toLocaleDateString("en-IN");
  } catch {
    return dateValue;
  }
}