import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Clock,
  CreditCard,
  GraduationCap,
  IndianRupee,
  ShieldCheck,
  Star,
} from "lucide-react";

import { createCourseEnrollment } from "../services/courseEnrollmentApi";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const course = location.state?.course;

  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem("studentUser") || "{}");
  }, []);

  const priceNumber = useMemo(() => {
    const raw = course?.price || "0";
    return Number(String(raw).replace(/[^\d.]/g, "")) || 0;
  }, [course]);

  const handlePayment = async () => {
    setError("");

    if (!localStorage.getItem("studentToken") || !user.email) {
      navigate("/login");
      return;
    }

    if (!courseId || !course) {
      setError("Course details not found. Please select course again.");
      return;
    }

    try {
      setLoading(true);

      await createCourseEnrollment({
        courseId,
        studentName: user.name || "Student",
        email: user.email,
        phone: user.phone || "",
        paymentStatus: "Paid",
        amountPaid: priceNumber,
      });

      navigate("/dashboard", {
        state: {
          message: `${course.title} enrolled successfully.`,
        },
      });
    } catch (err) {
      setError(err.message || "Payment or enrollment failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="max-w-lg rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 text-center">
          <BookOpen className="mx-auto text-cyan-300" size={52} />

          <h1 className="mt-5 text-3xl font-black">Course Not Found</h1>

          <p className="mt-3 text-slate-400">
            Please go back and select a course again.
          </p>

          <Link
            to="/courses"
            className="mt-6 inline-flex rounded-2xl bg-cyan-400 px-6 py-3 font-black text-slate-950"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[130px]" />
        <div className="absolute right-[-10%] top-[10%] h-[520px] w-[520px] rounded-full bg-purple-500/20 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[35%] h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft size={18} />
          Back to Courses
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.8fr]">
          <section className="rounded-[2.5rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
              <Star size={16} />
              Secure Course Checkout
            </div>

            <h1 className="mt-6 text-4xl font-black md:text-5xl">
              {course.title}
            </h1>

            <p className="mt-4 text-lg leading-8 text-slate-300">
              {course.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoCard icon={GraduationCap} label="Mentor" value={course.mentor} />
              <InfoCard icon={Clock} label="Duration" value={course.duration} />
              <InfoCard icon={BookOpen} label="Level" value={course.level} />
              <InfoCard
                icon={BadgeCheck}
                label="Certificate"
                value={course.certificateIncluded ? "Included" : "Included"}
              />
            </div>

            <div className="mt-8 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-5">
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-emerald-300" size={30} />

                <div>
                  <h3 className="font-black text-emerald-200">
                    What happens after payment?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Your course will be added to your dashboard. You can track
                    progress, complete lessons and earn certificate after course
                    completion.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-[2.5rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-orange-500/10">
            <h2 className="text-3xl font-black">Payment Summary</h2>

            <div className="mt-6 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm text-slate-400">Course Fee</p>

              <div className="mt-3 flex items-center gap-2 text-5xl font-black text-orange-300">
                <IndianRupee size={42} />
                {priceNumber}
              </div>

              <p className="mt-2 text-sm text-slate-500">
                One-time payment. Lifetime course access.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <SummaryRow label="Course" value={course.title} />
              <SummaryRow label="Category" value={course.category} />
              <SummaryRow label="Duration" value={course.duration} />
              <SummaryRow label="Rating" value={`⭐ ${course.rating || 4.8}`} />
              <SummaryRow label="Student" value={user.name || "Student"} />
              <SummaryRow label="Email" value={user.email || "Not found"} />
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm font-bold text-red-300">
                {error}
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 text-xl font-black text-white shadow-xl shadow-orange-500/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CreditCard />
              {loading ? "Processing..." : "Pay & Enroll"}
            </button>

            <button
              onClick={() => navigate("/courses")}
              className="mt-4 w-full rounded-2xl border border-white/10 px-6 py-4 font-bold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Cancel
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <Icon className="text-cyan-300" size={28} />

      <p className="mt-4 text-sm text-slate-500">{label}</p>

      <p className="mt-1 font-black text-slate-100">{value || "N/A"}</p>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="max-w-[220px] truncate text-right text-sm font-bold text-white">
        {value || "N/A"}
      </span>
    </div>
  );
}