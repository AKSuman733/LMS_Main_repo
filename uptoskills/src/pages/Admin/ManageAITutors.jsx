import { useMemo, useState } from "react";
import { motion } from "motion/react";

import Sidebar from "../../components/Sidebar";
import { colors } from "../../styles/designTokens";

import {
  Search,
  BrainCircuit,
  Clock,
  Star,
  Users,
  ShieldCheck,
  TrendingUp,
  MoreVertical,
} from "lucide-react";

export default function ManageAITutors() {
  const [search, setSearch] = useState("");

  // Modal + form state
  const [showModal, setShowModal] = useState(false);
  const [newTutor, setNewTutor] = useState({
    name: "",
    students: "",
    hours: "",
    rating: "",
  });

  // Tutors are stateful so the button works.
  const [tutors, setTutors] = useState([
    {
      id: 1,
      name: "Vijay",
      students: 4821,
      hours: "12.4k",
      rating: "4.9",
      popularity: "96%",
      status: "Active",
      image:
        "https://a10.gaanacdn.com/gn_img/artists/NOXWVgbkqL/NOXWVmz3kq/size_m_1737701179.jpg",
    },
    {
      id: 2,
      name: "Surya",
      students: 3980,
      hours: "9.2k",
      rating: "4.8",
      popularity: "91%",
      status: "Active",
      image:
        "https://i.pinimg.com/236x/5f/ea/fb/5feafb1359161923142adf03f123141b.jpg",
    },
    {
      id: 3,
      name: "Sai Pallavi",
      students: 2870,
      hours: "6.1k",
      rating: "4.7",
      popularity: "87%",
      status: "Trending",
      image:
        "https://media.themoviedb.org/t/p/w235_and_h235_face/qAPdGKUIUEzLibdgVCey7oKvvME.jpg",
    },
    {
      id: 4,
      name: "Deepika",
      students: 2110,
      hours: "4.5k",
      rating: "4.6",
      popularity: "82%",
      status: "Active",
      image:
        "https://www.hindustantimes.com/ht-img/img/2024/02/15/original/Deepika_Padukone_Hilton_1707982914236.jpg",
    },
    {
      id: 5,
      name: "Ranveer",
      students: 1890,
      hours: "3.9k",
      rating: "4.5",
      popularity: "78%",
      status: "New",
      image:
        "https://artistbookingcompany.com/wp-content/uploads/2024/03/ranveer-singh-680x680.jpg",
    },
  ]);

  const filteredTutors = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tutors;
    return tutors.filter((tutor) => tutor.name.toLowerCase().includes(q));
  }, [search, tutors]);

  const handleAddTutor = () => {
    const name = newTutor.name.trim();
    if (!name) return;

    const tutor = {
      id: Date.now(),
      name,
      students: Number(newTutor.students || 0),
      hours: (newTutor.hours || "0").toString(),
      rating: (newTutor.rating || "0").toString(),
      popularity: "70%",
      status: "New Tutor",
      image: "https://ui-avatars.com/api/?name=" + encodeURIComponent(name),
    };

    setTutors((prev) => [...prev, tutor]);
    setShowModal(false);
    setNewTutor({ name: "", students: "", hours: "", rating: "" });
  };

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >
      <Sidebar role="admin" />

      <main className="flex-1 md:ml-64 p-4 md:p-7">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">AI Teachers</h1>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Monitor AI tutor activity and performance.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 min-h-[44px] font-bold hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2"
            style={{
              backgroundColor: colors.primary,
              color: "#fff",
            }}
          >
            + Add Tutor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-5 rounded-2xl"
            style={{
              backgroundColor: colors.surface,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <BrainCircuit className="w-6 h-6" style={{ color: colors.secondary }} />
              <span className="text-xs" style={{ color: colors.textSecondary }}>
                Tutors
              </span>
            </div>
            <h2 className="text-3xl font-bold">{tutors.length}</h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-5 rounded-2xl"
            style={{
              backgroundColor: colors.surface,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-6 h-6" style={{ color: colors.secondary }} />
              <span className="text-xs" style={{ color: colors.textSecondary }}>
                Students
              </span>
            </div>
            <h2 className="text-3xl font-bold">{tutors.reduce((a, t) => a + Number(t.students || 0), 0)}</h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-5 rounded-2xl"
            style={{
              backgroundColor: colors.surface,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-6 h-6" style={{ color: colors.secondary }} />
              <span className="text-xs" style={{ color: colors.textSecondary }}>
                Popularity
              </span>
            </div>
            <h2 className="text-3xl font-bold">88%</h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-5 rounded-2xl"
            style={{
              backgroundColor: colors.surface,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <ShieldCheck className="w-6 h-6" style={{ color: colors.secondary }} />
              <span className="text-xs" style={{ color: colors.textSecondary }}>
                Accuracy
              </span>
            </div>
            <h2 className="text-3xl font-bold">97%</h2>
          </motion.div>
        </div>

        <div
          className="px-5 py-4 mb-6 rounded-2xl flex items-center gap-3"
          style={{
            backgroundColor: colors.surface,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Search className="w-5 h-5" style={{ color: colors.textSecondary }} />
          <input
            type="text"
            placeholder="Search AI teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none flex-1 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 rounded-lg"
            style={{ color: colors.textPrimary }}
          />
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: colors.surface,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="overflow-x-auto">
            <div
              className="grid grid-cols-6 gap-3 px-5 py-4 border-b text-sm font-semibold"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                color: colors.textSecondary,
              }}
            >
              <p>Tutor</p>
              <p>Students</p>
              <p>Hours</p>
              <p>Rating</p>
              <p>Popularity</p>
              <p className="text-center">Actions</p>
            </div>

            {filteredTutors.map((tutor, i) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-6 gap-3 px-5 py-4 border-b transition-all items-center hover:bg-[#FFF5F0]/5"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-14 h-14 object-cover rounded-2xl"
                  />
                  <div>
                    <h3 className="font-bold text-xl leading-tight">{tutor.name}</h3>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      {tutor.status}
                    </p>
                  </div>
                </div>

                <div className="font-semibold text-2xl">{tutor.students}</div>

                <div
                  className="flex items-center gap-2 text-lg"
                  style={{ color: colors.textSecondary }}
                >
                  <Clock className="w-4 h-4" style={{ color: colors.secondary }} />
                  {tutor.hours}
                </div>

                <div className="flex items-center gap-2 text-lg">
                  <Star className="w-4 h-4 fill-current" style={{ color: colors.primary }} />
                  {tutor.rating}
                </div>

                <div>
                  <p className="font-bold text-lg mb-2" style={{ color: colors.secondary }}>
                    {tutor.popularity}
                  </p>
                  <div
                    className="w-24 h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: tutor.popularity, backgroundColor: colors.primary }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    className="px-5 py-2 min-h-[44px] font-bold rounded-xl hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2"
                    style={{ backgroundColor: colors.secondary, color: "#fff" }}
                  >
                    View
                  </button>

                  <button
                    className="p-2 transition-all rounded-xl hover:bg-white/5 hover:scale-105 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2"
                    style={{ color: colors.textSecondary }}
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Simple modal so the button has a working effect */}
        {showModal && (
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 50 }}
            onClick={() => setShowModal(false)}
          >
            <div
              className="w-full max-w-md rounded-2xl"
              style={{ backgroundColor: colors.surface, border: "1px solid rgba(255,255,255,0.08)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5">
                <h2 className="text-2xl font-bold mb-4">Add Tutor</h2>

                <div className="grid gap-3">
                  <input
                    className="bg-transparent outline-none rounded-lg border border-white/10 px-3 py-2"
                    placeholder="Tutor name"
                    value={newTutor.name}
                    onChange={(e) => setNewTutor((p) => ({ ...p, name: e.target.value }))}
                    style={{ color: colors.textPrimary }}
                  />
                  <input
                    className="bg-transparent outline-none rounded-lg border border-white/10 px-3 py-2"
                    placeholder="Students"
                    value={newTutor.students}
                    onChange={(e) => setNewTutor((p) => ({ ...p, students: e.target.value }))}
                    style={{ color: colors.textPrimary }}
                  />
                  <input
                    className="bg-transparent outline-none rounded-lg border border-white/10 px-3 py-2"
                    placeholder="Hours"
                    value={newTutor.hours}
                    onChange={(e) => setNewTutor((p) => ({ ...p, hours: e.target.value }))}
                    style={{ color: colors.textPrimary }}
                  />
                  <input
                    className="bg-transparent outline-none rounded-lg border border-white/10 px-3 py-2"
                    placeholder="Rating"
                    value={newTutor.rating}
                    onChange={(e) => setNewTutor((p) => ({ ...p, rating: e.target.value }))}
                    style={{ color: colors.textPrimary }}
                  />
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    className="px-4 py-2 font-bold rounded-xl min-h-[44px] transition-all"
                    style={{ backgroundColor: colors.surface, color: colors.textPrimary, border: "1px solid rgba(255,255,255,0.08)" }}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 font-bold rounded-xl min-h-[44px] hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2"
                    style={{ backgroundColor: colors.primary, color: "#fff" }}
                    onClick={handleAddTutor}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

