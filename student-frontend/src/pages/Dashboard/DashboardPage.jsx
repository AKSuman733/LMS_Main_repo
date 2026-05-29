import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Crown,
  FileBadge,
  Gift,
  Home,
  LogOut,
  Menu,
  Moon,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  User,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import StudentEnrolledCourses from "./StudentEnrolledCourses";
import StudentCertificates from "../../components/dashboard/StudentCertificates";

import { getEnrollmentsByStudentEmail } from "../../services/courseEnrollmentApi";
import { getCertificatesByStudentEmail } from "../../services/certificateApi";

const dashboardMenu = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "statistics", label: "My Statistics", icon: BarChart3 },
  { id: "certificates", label: "My Certificates", icon: FileBadge },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "awards", label: "Awards", icon: Trophy },
  { id: "subscription", label: "Subscription", icon: Crown },
  { id: "refer", label: "Refer & Earn", icon: Share2 },
  { id: "profile", label: "Edit Profile", icon: User },
];

const demoEvents = [
  {
    id: 1,
    title: "AI Career Webinar",
    date: "28 May 2026",
    status: "Registered",
    certificate: "Available after attendance",
  },
  {
    id: 2,
    title: "Web Development Workshop",
    date: "02 June 2026",
    status: "Upcoming",
    certificate: "Certificate included",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [dashboardStats, setDashboardStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    certificates: 0,
    rewards: "₹0",
  });

  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem("studentUser") || "{}");
  }, []);

  const profileCompletion = useMemo(() => {
    const fields = [
      user.name,
      user.email,
      user.phone,
      user.skills,
      user.interest,
    ];

    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      if (!user.email) {
        setDashboardStats({
          enrolledCourses: 0,
          completedCourses: 0,
          certificates: 0,
          rewards: "₹0",
        });
        return;
      }

      const enrollments = await getEnrollmentsByStudentEmail(user.email);
      const certificates = await getCertificatesByStudentEmail(user.email);

      const completedCourses = (enrollments || []).filter(
        (item) => item.status === "Completed"
      ).length;

      setDashboardStats({
        enrolledCourses: enrollments?.length || 0,
        completedCourses,
        certificates: certificates?.length || 0,
        rewards: "₹0",
      });
    } catch (error) {
      console.log("Dashboard stats fetch failed:", error.message);
    }
  };

  useEffect(() => {
    fetchDashboardStats();

    const interval = setInterval(() => {
      fetchDashboardStats();
    }, 5000);

    return () => clearInterval(interval);
  }, [user.email]);

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentUser");
    navigate("/login");
  };

  const renderContent = () => {
    if (activeTab === "overview") {
      return (
        <OverviewSection
          user={user}
          profileCompletion={profileCompletion}
          setActiveTab={setActiveTab}
          dashboardStats={dashboardStats}
        />
      );
    }

    if (activeTab === "courses") {
      return <StudentEnrolledCourses />;
    }

    if (activeTab === "statistics") {
      return <StatisticsSection dashboardStats={dashboardStats} />;
    }

    if (activeTab === "certificates") {
      return <StudentCertificates />;
    }

    if (activeTab === "events") {
      return <EventsSection />;
    }

    if (activeTab === "awards") {
      return <AwardsSection />;
    }

    if (activeTab === "subscription") {
      return <SubscriptionSection />;
    }

    if (activeTab === "refer") {
      return <ReferSection />;
    }

    if (activeTab === "profile") {
      return (
        <ProfileSection user={user} profileCompletion={profileCompletion} />
      );
    }

    return (
      <OverviewSection
        user={user}
        profileCompletion={profileCompletion}
        setActiveTab={setActiveTab}
        dashboardStats={dashboardStats}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-10 top-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="absolute right-20 top-40 h-96 w-96 rounded-full bg-purple-500/15 blur-[120px]" />
        <div className="absolute bottom-10 left-1/3 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />
      </div>

      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-5 top-5 z-[80] rounded-2xl bg-cyan-400 p-3 text-slate-950 shadow-xl lg:hidden"
      >
        <Menu />
      </button>

      {sidebarOpen && (
        <div className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm lg:hidden">
          <div className="h-full w-80 bg-slate-950 p-4">
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-full bg-red-500 p-3"
              >
                <X />
              </button>
            </div>

            <SidebarContent
              activeTab={activeTab}
              setActiveTab={(id) => {
                setActiveTab(id);
                setSidebarOpen(false);
              }}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      )}

      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 border-r border-white/10 bg-slate-950/90 p-4 backdrop-blur-2xl lg:block">
        <SidebarContent
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
        />
      </aside>

      <main className="min-h-screen lg:pl-72">
        <Topbar user={user} handleLogout={handleLogout} />
        <div className="p-5 md:p-8">{renderContent()}</div>
      </main>
    </div>
  );
}

function SidebarContent({ activeTab, setActiveTab, handleLogout }) {
  return (
    <div className="flex h-full flex-col">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 text-slate-950">
            <Sparkles size={30} />
          </div>

          <div>
            <h2 className="font-black">Student Panel</h2>
            <p className="text-sm text-slate-400">UptoSkills LMS</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 flex-1 space-y-2 overflow-y-auto pr-1">
        {dashboardMenu.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left font-bold transition ${
                isActive
                  ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20"
                  : "text-slate-300 hover:bg-white/5 hover:text-cyan-300"
              }`}
            >
              <Icon size={21} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-5 flex w-full items-center gap-4 rounded-2xl bg-red-500/10 px-4 py-3 font-black text-red-400 transition hover:bg-red-500 hover:text-white"
      >
        <LogOut size={21} />
        Logout
      </button>
    </div>
  );
}

function Topbar({ user, handleLogout }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 px-5 py-4 backdrop-blur-2xl md:px-8">
      <div className="flex items-center justify-between gap-5">
        <div className="pl-12 lg:pl-0">
          <h1 className="text-xl font-black md:text-2xl">Student Dashboard</h1>
          <p className="text-sm text-slate-400">
            Welcome back, {user.name || "Student"} 👋
          </p>
        </div>

        <div className="hidden min-w-[340px] items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 lg:flex">
          <Search size={18} className="text-cyan-300" />
          <input
            placeholder="Search courses, events, certificates..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-white/10 bg-white/5 p-3 text-cyan-300">
            <Bell size={20} />
          </button>

          <button className="rounded-full border border-white/10 bg-white/5 p-3 text-yellow-300">
            <Moon size={20} />
          </button>

          <div className="group relative">
            <button className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 font-black text-slate-950">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name || "Student"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  (user.name || "S")
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                )}
              </div>

              <div className="hidden text-left md:block">
                <p className="text-sm font-black">{user.name || "Student"}</p>
                <p className="max-w-[150px] truncate text-xs text-slate-500">
                  {user.email || "student@example.com"}
                </p>
              </div>
            </button>

            <div className="absolute right-0 top-14 hidden w-52 rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-2xl group-hover:block">
              <button className="w-full rounded-xl px-4 py-2 text-left text-sm font-bold text-slate-300 hover:bg-white/5">
                View Profile
              </button>

              <button className="w-full rounded-xl px-4 py-2 text-left text-sm font-bold text-slate-300 hover:bg-white/5">
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full rounded-xl px-4 py-2 text-left text-sm font-bold text-red-400 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function OverviewSection({
  user,
  profileCompletion,
  setActiveTab,
  dashboardStats,
}) {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 p-8 shadow-2xl shadow-cyan-500/10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="font-bold text-cyan-300">Learning Overview</p>

            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Keep learning, {user.name || "Student"}!
            </h2>

            <p className="mt-4 max-w-2xl text-slate-300">
              Track your enrolled courses, completion, certificates, progress and
              rewards from one dashboard.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab("courses")}
                className="rounded-2xl bg-cyan-400 px-5 py-3 font-black text-slate-950"
              >
                Open My Courses
              </button>

              <button
                onClick={() => setActiveTab("certificates")}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
              >
                View Certificates
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 text-center">
            <ShieldCheck className="mx-auto text-emerald-300" size={42} />
            <h3 className="mt-3 text-3xl font-black">{profileCompletion}%</h3>
            <p className="text-sm text-slate-400">Profile Complete</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStat
          title="Enrolled Courses"
          value={dashboardStats.enrolledCourses}
          icon={BookOpen}
        />

        <DashboardStat
          title="Completed"
          value={dashboardStats.completedCourses}
          icon={ShieldCheck}
        />

        <DashboardStat
          title="Certificates"
          value={dashboardStats.certificates}
          icon={FileBadge}
        />

        <DashboardStat
          title="Rewards"
          value={dashboardStats.rewards}
          icon={Gift}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <h3 className="text-2xl font-black">Quick Actions</h3>

          <div className="mt-6 grid gap-3">
            <button
              onClick={() => setActiveTab("courses")}
              className="rounded-2xl bg-cyan-400 px-5 py-3 font-black text-slate-950"
            >
              View My Enrolled Courses
            </button>

            <button
              onClick={() => setActiveTab("certificates")}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-300 hover:text-cyan-300"
            >
              View My Certificates
            </button>

            <button
              onClick={() => setActiveTab("statistics")}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-slate-300 hover:text-cyan-300"
            >
              View My Statistics
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <h3 className="text-2xl font-black">Upcoming Events</h3>

          <div className="mt-6 space-y-4">
            {demoEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="font-black text-cyan-300">{event.title}</p>
                <p className="mt-1 text-sm text-slate-400">{event.date}</p>
                <p className="mt-2 text-xs font-bold text-emerald-300">
                  {event.certificate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StudentCertificates />
    </div>
  );
}

function StatisticsSection({ dashboardStats }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="My Statistics"
        subtitle="Your learning performance and activity report."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStat
          title="Enrolled Courses"
          value={dashboardStats.enrolledCourses}
          icon={BookOpen}
        />

        <DashboardStat
          title="Completed Courses"
          value={dashboardStats.completedCourses}
          icon={ShieldCheck}
        />

        <DashboardStat
          title="Certificates"
          value={dashboardStats.certificates}
          icon={FileBadge}
        />

        <DashboardStat title="Rewards" value={dashboardStats.rewards} icon={Crown} />
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 text-center">
        <BarChart3 className="mx-auto text-cyan-300" size={54} />

        <h3 className="mt-4 text-2xl font-black">Analytics Connected</h3>

        <p className="mt-2 text-slate-400">
          Overview statistics are connected with enrolled courses and certificates.
          Detailed charts can be added in the next step.
        </p>
      </div>
    </div>
  );
}

function EventsSection() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="My Events"
        subtitle="Registered events, attendance and certificates."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {demoEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6"
          >
            <CalendarDays className="text-cyan-300" size={36} />
            <h2 className="mt-4 text-2xl font-black">{event.title}</h2>
            <p className="mt-2 text-slate-400">{event.date}</p>
            <p className="mt-3 font-bold text-emerald-300">{event.status}</p>
            <p className="mt-1 text-sm text-slate-500">{event.certificate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AwardsSection() {
  const awards = [
    "Complete 1 course to unlock Bronze Learner Badge",
    "Complete 5 courses to unlock Skill Champion Trophy",
    "Attend 3 events to unlock Community Star Badge",
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Awards"
        subtitle="Unlock badges and rewards by completing learning tasks."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {awards.map((award, index) => (
          <div
            key={award}
            className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6"
          >
            <Trophy className="text-yellow-300" size={42} />
            <h3 className="mt-4 text-xl font-black">Award {index + 1}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{award}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubscriptionSection() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Subscription"
        subtitle="Manage your plan and premium learning access."
      />

      <div className="rounded-[2rem] border border-cyan-400/30 bg-cyan-400/10 p-8">
        <Crown className="text-yellow-300" size={50} />
        <h2 className="mt-5 text-3xl font-black">Free Plan Active</h2>
        <p className="mt-3 text-slate-300">
          Upgrade options can be connected later with payment system.
        </p>
      </div>
    </div>
  );
}

function ReferSection() {
  const referralCode = "UPTO-CHARV-2026";

  const copyReferral = async () => {
    await navigator.clipboard.writeText(referralCode);
    alert("Referral code copied!");
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Refer & Earn"
        subtitle="Invite friends and earn rewards."
      />

      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
        <Share2 className="text-cyan-300" size={46} />
        <h2 className="mt-5 text-3xl font-black">Your Referral Code</h2>

        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950 p-5 text-center text-2xl font-black text-cyan-300">
          {referralCode}
        </div>

        <button
          onClick={copyReferral}
          className="mt-5 rounded-2xl bg-cyan-400 px-6 py-3 font-black text-slate-950"
        >
          Copy Code
        </button>
      </div>
    </div>
  );
}

function ProfileSection({ user, profileCompletion }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Edit Profile"
        subtitle="Profile completion is calculated from your saved details."
      />

      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
        <User className="text-cyan-300" size={48} />

        <h2 className="mt-5 text-3xl font-black">{user.name || "Student"}</h2>

        <p className="mt-2 text-slate-400">
          {user.email || "student@example.com"}
        </p>

        <div className="mt-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Profile Completion</span>
            <span className="font-bold text-cyan-300">
              {profileCompletion}%
            </span>
          </div>

          <div className="mt-2 h-3 rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <ProfileInfo label="Name" value={user.name || "Not added"} />
          <ProfileInfo label="Email" value={user.email || "Not added"} />
          <ProfileInfo label="Phone" value={user.phone || "Not added"} />
          <ProfileInfo label="Skills" value={user.skills || "Not added"} />
          <ProfileInfo label="Interest" value={user.interest || "Not added"} />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
      <p className="font-bold text-cyan-300">Student Dashboard</p>
      <h1 className="mt-2 text-4xl font-black">{title}</h1>
      <p className="mt-2 text-slate-400">{subtitle}</p>
    </section>
  );
}

function DashboardStat({ title, value, icon: Icon }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
      <Icon className="text-cyan-300" size={30} />
      <h3 className="mt-4 text-3xl font-black">{value}</h3>
      <p className="text-sm text-slate-400">{title}</p>
    </div>
  );
}

function ProfileInfo({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 font-bold text-slate-200">{value}</p>
    </div>
  );
}