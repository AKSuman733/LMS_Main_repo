import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Eye,
  FileBadge,
  Heart,
  PlayCircle,
  RefreshCcw,
  Search,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getCourses } from "../../services/courseApi";
import {
  createCourseEnrollment,
  getEnrollmentsByStudentEmail,
} from "../../services/courseEnrollmentApi";

export default function StudentCourses() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("studentUser") || "{}");

  const studentName = user.name || "Student";
  const studentEmail = user.email || "";
  const studentPhone = user.phone || "";

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [loading, setLoading] = useState(false);
  const [enrollingCourseId, setEnrollingCourseId] = useState("");
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

  const fetchEnrollments = async () => {
    if (!studentEmail) {
      setEnrollments([]);
      return;
    }

    try {
      const data = await getEnrollmentsByStudentEmail(studentEmail);
      setEnrollments(data || []);
    } catch {
      setEnrollments([]);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();

    const interval = setInterval(() => {
      fetchEnrollments();
    }, 5000);

    return () => clearInterval(interval);
  }, [studentEmail]);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(courses.map((course) => course.category).filter(Boolean)),
    ];

    return ["All", ...uniqueCategories];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const searchText = `${course.title || ""} ${course.description || ""} ${
        course.category || ""
      } ${course.level || ""}`.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || course.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [courses, search, categoryFilter]);

  const isCourseEnrolled = (courseId) => {
    return enrollments.some(
      (item) => String(item.courseId) === String(courseId)
    );
  };

  const handleEnroll = async (course) => {
    if (!studentEmail) {
      alert("Please login first to enroll.");
      navigate("/login");
      return;
    }

    try {
      setError("");
      setSuccess("");
      setEnrollingCourseId(course._id);

      await createCourseEnrollment({
        courseId: course._id,
        studentName,
        email: studentEmail,
        phone: studentPhone,
      });

      setSuccess(`${course.title} enrolled successfully.`);
      await fetchEnrollments();
    } catch (err) {
      setError(err.message || "Enrollment failed.");
    } finally {
      setEnrollingCourseId("");
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 text-white shadow-2xl shadow-cyan-500/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-cyan-300">Courses</p>

            <h1 className="mt-2 text-4xl font-black">Available Courses</h1>

            <p className="mt-2 text-slate-400">
              Explore courses and enroll using your login account.
            </p>
          </div>

          <button
            onClick={() => {
              fetchCourses();
              fetchEnrollments();
            }}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            <RefreshCcw size={18} />
            Refresh
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Courses"
            value={courses.length}
            icon={BookOpen}
          />

          <StatCard
            title="Free Courses"
            value={courses.filter((course) => course.isFree).length}
            icon={Star}
          />

          <StatCard
            title="With Certificate"
            value={courses.filter((course) => course.certificateIncluded).length}
            icon={FileBadge}
          />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3">
            <Search size={18} className="text-cyan-300" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses..."
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-slate-950">
                {category}
              </option>
            ))}
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

          <p className="mt-4 font-bold text-slate-300">Loading courses...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center text-white">
          <BookOpen className="mx-auto text-slate-500" size={56} />

          <h2 className="mt-4 text-2xl font-black">No courses found</h2>

          <p className="mt-2 text-slate-400">
            Admin has not added courses yet.
          </p>
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              isEnrolled={isCourseEnrolled(course._id)}
              isLoading={enrollingCourseId === course._id}
              handleEnroll={handleEnroll}
            />
          ))}
        </section>
      )}
    </div>
  );
}

function CourseCard({ course, isEnrolled, isLoading, handleEnroll }) {
  const handleViewDetails = () => {
    alert(
      `${course.title}\n\n${course.description}\n\nCategory: ${
        course.category || "General"
      }\nLevel: ${course.level || "Beginner"}\nDuration: ${
        course.duration || "N/A"
      }`
    );
  };

  const handleContinue = () => {
    if (course.videoUrl) {
      window.open(course.videoUrl, "_blank");
      return;
    }

    alert("Video not added by admin yet.");
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 text-white transition hover:-translate-y-2 hover:border-cyan-400/40">
      <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-6">
        <div className="flex items-start justify-between">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-xl">
            <BookOpen size={34} />
          </div>

          <button className="rounded-full bg-white/20 p-3 backdrop-blur-xl transition hover:bg-white/30">
            <Heart size={18} />
          </button>
        </div>

        <h2 className="mt-6 text-2xl font-black">{course.title}</h2>

        <p className="mt-2 text-sm font-semibold text-white/80">
          {course.category || "General"} • {course.level || "Beginner"}
        </p>
      </div>

      <div className="p-6">
        <p className="min-h-[72px] text-sm leading-6 text-slate-400">
          {course.description || "No description added."}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Info label="Duration" value={course.duration || "N/A"} />

          <Info
            label="Price"
            value={course.isFree ? "Free" : `₹${course.price || 0}`}
          />

          <Info
            label="Certificate"
            value={course.certificateIncluded ? "Yes" : "No"}
          />

          <Info label="Status" value={course.status || "Active"} />
        </div>

        <div className="mt-6 grid gap-3">
          <button
            onClick={() => handleEnroll(course)}
            disabled={isEnrolled || isLoading}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-black transition ${
              isEnrolled
                ? "cursor-not-allowed bg-emerald-400/20 text-emerald-300"
                : "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
            }`}
          >
            <CheckCircle2 size={18} />
            {isLoading
              ? "Enrolling..."
              : isEnrolled
              ? "Already Enrolled"
              : "Enroll Now"}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleViewDetails}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              <Eye size={17} />
              Details
            </button>

            <button
              onClick={handleContinue}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              <PlayCircle size={17} />
              Continue
            </button>
          </div>
        </div>
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
    <div className="rounded-2xl bg-slate-950/70 p-3">
      <p className="text-xs text-slate-500">{label}</p>

      <p className="mt-1 truncate font-bold text-slate-200">
        {value || "N/A"}
      </p>
    </div>
  );
}