import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Code2,
  Database,
  Filter,
  Heart,
  Home,
  Laptop,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Sun,
  Trophy,
  User,
  X,
} from "lucide-react";

import uptoskillsLogo from "../assets/logo/UptoSkills.webp";

import { getCourses } from "../services/courseApi";
import {
  createCourseEnrollment,
  getEnrollmentsByStudentEmail,
} from "../services/courseEnrollmentApi";

const fallbackCourses = [
  {
    id: 1,
    title: "Java Full Course",
    mentor: "Education Mentor",
    category: "Programming",
    level: "Beginner",
    price: "Free",
    duration: "20 Hours",
    rating: 4.8,
    icon: Code2,
    banner: "from-orange-500 via-red-500 to-pink-600",
    description:
      "Learn Java from basics to OOP, exception handling, file handling and interview-ready concepts.",
  },
  {
    id: 2,
    title: "Python Basics",
    mentor: "Innovation Mentor",
    category: "Programming",
    level: "Beginner",
    price: "₹499",
    duration: "18 Hours",
    rating: 4.7,
    icon: Laptop,
    banner: "from-cyan-400 via-blue-500 to-purple-600",
    description:
      "Start Python with syntax, loops, functions, data structures and mini projects.",
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    mentor: "Business Mentor",
    category: "AI/ML",
    level: "Advanced",
    price: "₹999",
    duration: "30 Hours",
    rating: 4.9,
    icon: Database,
    banner: "from-purple-500 via-fuchsia-500 to-orange-500",
    description:
      "Learn supervised learning, model evaluation, ML workflow and project implementation.",
  },
  {
    id: 4,
    title: "React JS Mastery",
    mentor: "Frontend Mentor",
    category: "Web Development",
    level: "Intermediate",
    price: "₹799",
    duration: "24 Hours",
    rating: 4.8,
    icon: Code2,
    banner: "from-blue-500 via-cyan-500 to-emerald-500",
    description:
      "Master React components, hooks, routing, state management and build real projects.",
  },
];

const companies = [
  "TCS",
  "Infosys",
  "Wipro",
  "Accenture",
  "IBM",
  "Microsoft",
  "Google",
  "Amazon",
  "Deloitte",
  "Capgemini",
  "HCL",
  "Cognizant",
];

const benefits = [
  {
    title: "Verified Certificate",
    text: "Earn course completion certificates after finishing all topics.",
    icon: BadgeCheck,
  },
  {
    title: "Job Ready Skills",
    text: "Learn practical skills with project-based learning.",
    icon: Trophy,
  },
  {
    title: "Mentor Guided",
    text: "Courses include mentor details and guided learning paths.",
    icon: User,
  },
];

export default function CoursesPage() {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Top Rated");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [wishlisted, setWishlisted] = useState([]);
  const [enrollingCourseId, setEnrollingCourseId] = useState("");

  const isLoggedIn = Boolean(localStorage.getItem("studentToken"));
  const userData = JSON.parse(localStorage.getItem("studentUser") || "{}");

  const getCourseIcon = (category = "") => {
    const lower = category.toLowerCase();

    if (lower.includes("program")) return Code2;
    if (lower.includes("web")) return Code2;
    if (lower.includes("ai") || lower.includes("ml")) return Database;
    if (lower.includes("data")) return Database;

    return Laptop;
  };

  const getCourseBanner = (index) => {
    const banners = [
      "from-orange-500 via-red-500 to-pink-600",
      "from-cyan-400 via-blue-500 to-purple-600",
      "from-purple-500 via-fuchsia-500 to-orange-500",
      "from-emerald-400 via-cyan-500 to-blue-600",
      "from-blue-500 via-indigo-500 to-purple-600",
    ];

    return banners[index % banners.length];
  };

  const normalizeCourse = (course, index) => {
    return {
      id: course._id,
      _id: course._id,
      title: course.title || "Untitled Course",
      mentor: course.mentorName || course.mentor || "UptoSkills Mentor",
      category: course.category || "General",
      level: course.level || "Beginner",
      price: course.isFree ? "Free" : `₹${course.price || 0}`,
      duration: course.duration || "N/A",
      rating: course.rating || 4.8,
      icon: getCourseIcon(course.category),
      banner: getCourseBanner(index),
      description: course.description || "No description added.",
      certificateIncluded: course.certificateIncluded,
      raw: course,
    };
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await getCourses();

      const formatted = (data || []).map((course, index) =>
        normalizeCourse(course, index)
      );

      setCourses(formatted);
    } catch (error) {
      console.log("Courses fetch failed:", error.message);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    const latestUser = JSON.parse(localStorage.getItem("studentUser") || "{}");

    if (!latestUser.email) {
      setEnrollments([]);
      return;
    }

    try {
      const data = await getEnrollmentsByStudentEmail(latestUser.email);
      setEnrollments(data || []);
    } catch {
      setEnrollments([]);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();

    const timer = setInterval(() => {
      fetchEnrollments();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const displayCourses = courses.length > 0 ? courses : fallbackCourses;

  const categories = useMemo(() => {
    const unique = [
      ...new Set(displayCourses.map((course) => course.category).filter(Boolean)),
    ];

    return ["All", ...unique];
  }, [displayCourses]);

  const isPaidCourse = (course) => {
    if (!course) return false;

    const priceText = String(course.price || "").toLowerCase();

    if (priceText === "free" || priceText === "₹0" || priceText === "0") {
      return false;
    }

    const rawPrice = course.raw?.price ?? course.price ?? 0;
    const numericPrice = Number(String(rawPrice).replace(/[^\d.]/g, ""));

    return numericPrice > 0;
  };

  const filteredCourses = useMemo(() => {
    let result = displayCourses.filter((course) => {
      const searchable = `${course.title} ${course.category} ${course.mentor} ${course.level}`.toLowerCase();

      const matchesSearch = searchable.includes(searchText.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || course.category === categoryFilter;

      const matchesLevel = levelFilter === "All" || course.level === levelFilter;

      const matchesPrice =
        priceFilter === "All" ||
        (priceFilter === "Free" && !isPaidCourse(course)) ||
        (priceFilter === "Paid" && isPaidCourse(course));

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });

    if (sortBy === "Top Rated") {
      result = [...result].sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    if (sortBy === "Newest") {
      result = [...result].reverse();
    }

    if (sortBy === "Price Low to High") {
      result = [...result].sort((a, b) => {
        const aPrice = Number(String(a.price).replace(/[^\d.]/g, "")) || 0;
        const bPrice = Number(String(b.price).replace(/[^\d.]/g, "")) || 0;

        return aPrice - bPrice;
      });
    }

    return result;
  }, [
    displayCourses,
    searchText,
    categoryFilter,
    levelFilter,
    priceFilter,
    sortBy,
  ]);

  const isCourseEnrolled = (courseId) => {
    return enrollments.some((item) => String(item.courseId) === String(courseId));
  };

  const handleEnroll = async (course) => {
    const latestUser = JSON.parse(localStorage.getItem("studentUser") || "{}");

    if (!localStorage.getItem("studentToken") || !latestUser.email) {
      navigate("/login", {
        state: {
          redirectAfterLogin: "/courses",
          selectedCourseId: course._id || course.id,
        },
      });
      return;
    }

    if (!course._id) {
      setMessageType("error");
      setMessage("This course is not connected with backend yet.");
      return;
    }

    if (isCourseEnrolled(course._id)) {
      setMessageType("success");
      setMessage(`You are already enrolled in ${course.title}.`);
      return;
    }

    if (isPaidCourse(course)) {
      navigate(`/payment/${course._id}`, {
        state: {
          course: {
            id: course._id,
            title: course.title,
            description: course.description,
            category: course.category,
            level: course.level,
            duration: course.duration,
            mentor: course.mentor,
            price: course.price,
            rating: course.rating,
            certificateIncluded: course.certificateIncluded,
          },
        },
      });
      return;
    }

    try {
      setMessage("");
      setMessageType("success");
      setEnrollingCourseId(course._id);

      await createCourseEnrollment({
        courseId: course._id,
        studentName: latestUser.name || "Student",
        email: latestUser.email,
        phone: latestUser.phone || "",
        paymentStatus: "Free",
        amountPaid: 0,
      });

      setMessage(`${course.title} enrolled successfully.`);
      await fetchEnrollments();
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "Enrollment failed.");
    } finally {
      setEnrollingCourseId("");
    }
  };

  const toggleWishlist = (courseId) => {
    setWishlisted((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentUser");
    setProfileMenuOpen(false);
    setEnrollments([]);
    navigate("/");
  };

  const pageBg = isDark ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950";

  const cardBg = isDark
    ? "bg-slate-900/75 border-white/10"
    : "bg-white/90 border-slate-200 shadow-xl shadow-slate-300/30";

  const mutedText = isDark ? "text-slate-300" : "text-slate-600";

  return (
    <div className={`min-h-screen overflow-hidden ${pageBg}`}>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @keyframes floatCourse {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-16px); }
          }

          .course-glow-text {
            background: linear-gradient(90deg, #22d3ee, #a78bfa, #fb923c, #22d3ee);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: gradientMove 5s ease infinite;
          }

          @keyframes gradientMove {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}
      </style>

      <div className="fixed inset-0 -z-10">
        <div className="absolute left-[-5%] top-[-8%] h-[420px] w-[420px] rounded-full bg-orange-400/20 blur-[130px]" />
        <div className="absolute right-[-5%] top-[5%] h-[520px] w-[520px] rounded-full bg-purple-500/25 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[35%] h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-[140px]" />
        {isDark && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[length:36px_36px]" />
        )}
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between rounded-[1.6rem] border border-white/10 bg-white/5 px-5 py-3 shadow-2xl shadow-cyan-500/5">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 transition hover:scale-105"
                title="Go to Home"
              >
                <Home size={24} />
              </Link>

              <Link to="/" className="hidden items-center md:flex">
                <img
                  src={uptoskillsLogo}
                  alt="UptoSkills Logo"
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>

            <div className="hidden items-center gap-7 lg:flex">
              <Link to="/" className="text-slate-300 transition hover:text-cyan-300">
                Home
              </Link>

              <a href="#courses-grid" className="text-slate-300 transition hover:text-cyan-300">
                Courses
              </a>

              <a href="#placement-strip" className="text-slate-300 transition hover:text-cyan-300">
                Placement
              </a>

              <a href="#footer" className="text-slate-300 transition hover:text-cyan-300">
                Contact
              </a>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <button
                onClick={() => setIsDark((prev) => !prev)}
                className="rounded-full border border-white/10 bg-white/5 p-3 text-orange-300 transition hover:bg-white/10"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {isLoggedIn ? (
                <div
                  className="relative"
                  onMouseEnter={() => setProfileMenuOpen(true)}
                  onMouseLeave={() => setProfileMenuOpen(false)}
                >
                  <button className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10">
                    <User size={18} />
                  </button>

                  {profileMenuOpen && (
                    <div className="absolute right-0 top-14 z-[999] w-72 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl">
                      <div className="border-b border-white/10 p-5">
                        <h3 className="font-black">
                          {userData.name || "Student"}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          {userData.email || "Student Account"}
                        </p>
                      </div>

                      <div className="p-3">
                        <button
                          onClick={() => navigate("/dashboard")}
                          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-bold text-slate-300 transition hover:bg-white/10 hover:text-cyan-300"
                        >
                          <LayoutDashboard size={18} />
                          Dashboard
                        </button>

                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-black text-red-400 transition hover:bg-red-500/10"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-black text-slate-950 transition hover:scale-105 hover:bg-cyan-300"
                >
                  <LogIn size={18} />
                  Login
                </Link>
              )}
            </div>

            <button
              onClick={() => setMobileFilterOpen((prev) => !prev)}
              className="rounded-full border border-white/10 bg-white/5 p-3 text-white lg:hidden"
            >
              {mobileFilterOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      <header className="mx-auto max-w-7xl px-6 py-12">
        <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-pink-300 via-purple-400 to-blue-500 p-8 shadow-2xl shadow-purple-500/30 md:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.22)_1px,transparent_0)] bg-[length:30px_30px] opacity-30" />
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-orange-300/40 blur-[120px]" />
          <div className="absolute right-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-purple-700/30 blur-[140px]" />
          <div className="absolute bottom-[-15%] right-[15%] text-[190px] font-black text-white/15 rotate-[-20deg]">
            COURSE
          </div>

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/40 px-5 py-3 text-white backdrop-blur-xl">
                <Sparkles size={18} />
                UptoSkills Course Platform
              </div>

              <h1 className="mt-8 max-w-2xl text-5xl font-black uppercase leading-tight text-white md:text-7xl">
                UptoSkills
                <br />
                <span className="text-slate-950">Courses</span>
              </h1>

              <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/90">
                Explore premium skill courses, learn from mentors, complete
                tasks, earn certificates and move one step closer to your dream
                career.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#courses-grid"
                  className="flex items-center gap-3 rounded-full bg-slate-950 px-8 py-4 font-black text-white shadow-xl transition hover:scale-105"
                >
                  Explore Courses <ArrowRight />
                </a>

                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-black text-white backdrop-blur-xl transition hover:bg-white hover:text-slate-950"
                >
                  <Home size={20} />
                  Home
                </Link>
              </div>
            </div>

            <div className="relative flex min-h-[420px] items-center justify-center">
              <div className="absolute h-80 w-80 rounded-full border border-white/30" />
              <div className="absolute h-56 w-56 rounded-full border border-white/25" />
              <div className="absolute h-96 w-96 animate-[spin_26s_linear_infinite] rounded-full">
                {["UI", "UX", "JAVA", "PY", "AI", "WEB"].map((item, index) => {
                  const angle = (index / 6) * 360;
                  const radius = 185;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <div
                      key={item}
                      className="absolute left-1/2 top-1/2 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white shadow-2xl shadow-blue-700/30"
                      style={{
                        transform: `translate(${x - 32}px, ${y - 32}px) rotate(${-angle}deg)`,
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>

              <div className="relative z-10 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 text-center shadow-2xl backdrop-blur-xl">
                <Laptop className="mx-auto text-cyan-300" size={72} />
                <h2 className="mt-5 text-4xl font-black">50+ Courses</h2>
                <p className="mt-2 text-slate-300">Available for learners</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="placement-strip" className="mx-auto max-w-7xl px-6 pb-12">
        <div className={`overflow-hidden rounded-[2rem] border p-7 ${cardBg}`}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-cyan-400">Career Support</p>
              <h2 className="text-3xl font-black">
                Get Placed In These Companies
              </h2>
            </div>

            <span className="rounded-full bg-cyan-400/10 px-5 py-2 font-bold text-cyan-300">
              Placement Focused Learning
            </span>
          </div>

          <div className="overflow-hidden">
            <div className="flex w-max gap-5" style={{ animation: "marquee 24s linear infinite" }}>
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={`${company}-${index}`}
                  className="flex h-20 min-w-[190px] items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70 px-8 text-xl font-black text-slate-200 shadow-xl"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main id="courses-grid" className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-semibold text-cyan-400">Course Library</p>
            <h2 className="mt-2 text-4xl font-black md:text-5xl">
              Browse Top Rated Courses
            </h2>
            <p className={`mt-4 max-w-2xl text-sm leading-6 ${mutedText}`}>
              Search, filter and enroll in courses. Paid courses will open a
              payment page, and free courses will be enrolled directly.
            </p>
          </div>

          <button
            onClick={() => setMobileFilterOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full border border-cyan-400/40 px-6 py-3 font-bold text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950 lg:hidden"
          >
            <Filter size={18} />
            Filters
          </button>
        </div>

        {message && (
          <div
            className={`mt-6 rounded-2xl border p-4 font-bold ${
              messageType === "error"
                ? "border-red-400/30 bg-red-400/10 text-red-300"
                : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-[310px_1fr]">
          <aside
            className={`${
              mobileFilterOpen ? "block" : "hidden"
            } rounded-[2rem] border p-5 lg:block ${cardBg}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-xl font-black">
                <SlidersHorizontal className="text-cyan-400" />
                Filters
              </h3>

              <button
                onClick={() => {
                  setSearchText("");
                  setCategoryFilter("All");
                  setLevelFilter("All");
                  setPriceFilter("All");
                  setSortBy("Top Rated");
                }}
                className="text-sm font-bold text-orange-400"
              >
                Reset
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-bold text-slate-400">Search Course</label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                  <Search size={18} className="text-cyan-400" />
                  <input
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search course..."
                    className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <FilterSelect
                label="Category"
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={categories}
              />

              <FilterSelect
                label="Level"
                value={levelFilter}
                onChange={setLevelFilter}
                options={["All", "Beginner", "Intermediate", "Advanced"]}
              />

              <FilterSelect
                label="Price"
                value={priceFilter}
                onChange={setPriceFilter}
                options={["All", "Free", "Paid"]}
              />

              <FilterSelect
                label="Sort By"
                value={sortBy}
                onChange={setSortBy}
                options={["Top Rated", "Newest", "Price Low to High"]}
              />
            </div>

            <div className="mt-7 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
              <h4 className="font-black text-cyan-300">Need help?</h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Select a course based on your goal. Start with beginner courses
                if you are new.
              </p>
            </div>
          </aside>

          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <p className={mutedText}>
                Showing{" "}
                <span className="font-black text-cyan-400">
                  {filteredCourses.length}
                </span>{" "}
                courses
              </p>

              {loading && (
                <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                  Loading latest courses...
                </span>
              )}
            </div>

            {filteredCourses.length === 0 ? (
              <div className={`rounded-[2rem] border p-10 text-center ${cardBg}`}>
                <BookOpen className="mx-auto text-slate-500" size={60} />
                <h3 className="mt-4 text-3xl font-black">No courses found</h3>
                <p className={`mt-2 ${mutedText}`}>
                  Try changing search or filter options.
                </p>
              </div>
            ) : (
              <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => {
                  const Icon = course.icon;
                  const isWishlisted = wishlisted.includes(course.id);
                  const enrolled = isCourseEnrolled(course._id);
                  const loadingThisCourse = enrollingCourseId === course._id;

                  return (
                    <article
                      key={course.id}
                      className={`group overflow-hidden rounded-[2rem] border transition duration-300 hover:-translate-y-3 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10 ${cardBg}`}
                    >
                      <div className={`relative h-44 bg-gradient-to-br ${course.banner} p-6`}>
                        <div className="absolute right-5 top-5 rounded-full bg-black/25 px-3 py-1 text-sm font-bold text-white backdrop-blur-md">
                          {course.price}
                        </div>

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                          <Icon size={34} className="text-white" />
                        </div>

                        <div className="absolute bottom-5 left-6 right-6">
                          <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-black">{course.title}</h3>

                            <p className="mt-1 text-sm font-semibold text-cyan-400">
                              Mentor: {course.mentor}
                            </p>
                          </div>

                          <button
                            onClick={() => toggleWishlist(course.id)}
                            className={`rounded-full border p-3 transition ${
                              isWishlisted
                                ? "border-pink-400 bg-pink-400/10 text-pink-400"
                                : "border-white/10 bg-white/5 text-slate-300 hover:text-pink-400"
                            }`}
                          >
                            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                          </button>
                        </div>

                        <p className={`mt-4 min-h-[72px] text-sm leading-6 ${mutedText}`}>
                          {course.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
                          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-400">
                            {course.level}
                          </span>

                          <span className="rounded-full bg-purple-400/10 px-3 py-1 text-purple-400">
                            {course.duration}
                          </span>

                          <span className="rounded-full bg-orange-400/10 px-3 py-1 text-orange-400">
                            ⭐ {course.rating}
                          </span>
                        </div>

                        <div className="mt-7 flex gap-3">
                          <button
                            onClick={() => alert(`${course.title}\n\n${course.description}`)}
                            className="flex-1 rounded-full border border-slate-600 px-4 py-3 text-sm font-bold transition hover:border-cyan-400 hover:text-cyan-400"
                          >
                            Details
                          </button>

                          <button
                            onClick={() => handleEnroll(course)}
                            disabled={enrolled || loadingThisCourse}
                            className={`flex-1 rounded-full px-4 py-3 text-sm font-black transition ${
                              enrolled
                                ? "cursor-not-allowed bg-emerald-400/20 text-emerald-300"
                                : "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                            }`}
                          >
                            {loadingThisCourse
                              ? "Enrolling..."
                              : enrolled
                              ? "Enrolled"
                              : "Enroll Now"}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className={`rounded-[2rem] border p-7 transition hover:-translate-y-2 ${cardBg}`}
              >
                <Icon className="text-cyan-400" size={36} />
                <h3 className="mt-5 text-2xl font-black">{benefit.title}</h3>
                <p className={`mt-3 text-sm leading-6 ${mutedText}`}>
                  {benefit.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <footer
        id="footer"
        className={`mt-10 border-t px-6 py-12 backdrop-blur-xl ${
          isDark
            ? "border-white/10 bg-slate-950/70"
            : "border-slate-200 bg-white/70"
        }`}
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div>
            <img src={uptoskillsLogo} alt="UptoSkills Logo" className="h-16 w-auto object-contain" />
            <p className={`mt-4 text-sm leading-6 ${mutedText}`}>
              UptoSkills LMS helps students learn skills, complete tasks, track
              progress and grow career.
            </p>
          </div>

          <div>
            <h3 className="font-black">Quick Links</h3>

            <div className={`mt-4 space-y-3 text-sm ${mutedText}`}>
              <Link to="/" className="block hover:text-cyan-400">
                Home
              </Link>
              <a href="#courses-grid" className="block hover:text-cyan-400">
                Courses
              </a>
              <Link to="/login" className="block hover:text-cyan-400">
                Login
              </Link>
              <Link to="/dashboard" className="block hover:text-cyan-400">
                Dashboard
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-black">Course Categories</h3>

            <div className={`mt-4 space-y-3 text-sm ${mutedText}`}>
              <p>Programming</p>
              <p>AI & Machine Learning</p>
              <p>Web Development</p>
              <p>Data Science</p>
            </div>
          </div>

          <div>
            <h3 className="font-black">Contact Details</h3>

            <div className={`mt-4 space-y-4 text-sm ${mutedText}`}>
              <p className="flex items-center gap-3">
                <MapPin size={18} className="text-cyan-400" />
                Jaipur, Rajasthan, India
              </p>

              <p className="flex items-center gap-3">
                <Phone size={18} className="text-cyan-400" />
                +91 9887196182
              </p>

              <p className="flex items-center gap-3">
                <Mail size={18} className="text-cyan-400" />
                support@uptoskills.com
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© 2026 UptoSkills LMS. All rights reserved.</p>
          <p>Privacy Policy • Terms & Conditions • Support</p>
        </div>
      </footer>

      <button className="fixed bottom-24 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-white shadow-2xl shadow-purple-500/30 transition hover:scale-110">
        <MessageCircle />
      </button>

      <button
        onClick={() =>
          window.open(
            "https://wa.me/919887196182?text=Hello%20UptoSkills%2C%20I%20need%20help%20regarding%20LMS%20courses.",
            "_blank"
          )
        }
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/30 transition hover:scale-110"
      >
        <CheckCircle2 />
      </button>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-400">{label}</span>

      <div className="relative mt-2">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 font-bold text-white outline-none focus:border-cyan-400"
        >
          {options.map((option) => (
            <option key={option} className="bg-slate-950">
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </label>
  );
}