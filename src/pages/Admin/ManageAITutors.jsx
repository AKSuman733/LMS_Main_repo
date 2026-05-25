import { useState } from "react";
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

  const tutors = [
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
  ];

  const filteredTutors = tutors.filter((tutor) =>
    tutor.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >

      {/* SIDEBAR */}
      <Sidebar role="admin" />

      {/* MAIN */}
      <main className="flex-1 ml-64 p-7">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">

          <div>

            <h1 className="text-4xl font-bold mb-2">
              AI Teachers
            </h1>

            <p
              className="text-sm"
              style={{
                color: colors.textSecondary,
              }}
            >
              Monitor AI tutor activity and performance.
            </p>

          </div>

          <button
            className="px-6 py-3 font-bold hover:scale-105 transition-all rounded-xl"
            style={{
              backgroundColor: colors.primary,
              color: "#fff",
            }}
          >
            + Add Tutor
          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          {/* CARD */}
          <div
            className="p-5 rounded-2xl"
            style={{
              backgroundColor: colors.surface,
              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >

            <div className="flex items-center justify-between mb-4">

              <BrainCircuit
                className="w-6 h-6"
                style={{
                  color: colors.secondary,
                }}
              />

              <span
                className="text-xs"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Tutors
              </span>

            </div>

            <h2 className="text-3xl font-bold">
              6
            </h2>

          </div>

          {/* CARD */}
          <div
            className="p-5 rounded-2xl"
            style={{
              backgroundColor: colors.surface,
              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >

            <div className="flex items-center justify-between mb-4">

              <Users
                className="w-6 h-6"
                style={{
                  color: colors.secondary,
                }}
              />

              <span
                className="text-xs"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Students
              </span>

            </div>

            <h2 className="text-3xl font-bold">
              19k+
            </h2>

          </div>

          {/* CARD */}
          <div
            className="p-5 rounded-2xl"
            style={{
              backgroundColor: colors.surface,
              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >

            <div className="flex items-center justify-between mb-4">

              <TrendingUp
                className="w-6 h-6"
                style={{
                  color: colors.secondary,
                }}
              />

              <span
                className="text-xs"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Popularity
              </span>

            </div>

            <h2 className="text-3xl font-bold">
              88%
            </h2>

          </div>

          {/* CARD */}
          <div
            className="p-5 rounded-2xl"
            style={{
              backgroundColor: colors.surface,
              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >

            <div className="flex items-center justify-between mb-4">

              <ShieldCheck
                className="w-6 h-6"
                style={{
                  color: colors.secondary,
                }}
              />

              <span
                className="text-xs"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Accuracy
              </span>

            </div>

            <h2 className="text-3xl font-bold">
              97%
            </h2>

          </div>

        </div>

        {/* SEARCH */}
        <div
          className="px-5 py-4 mb-6 rounded-2xl flex items-center gap-3"
          style={{
            backgroundColor: colors.surface,
            border:
              "1px solid rgba(255,255,255,0.08)",
          }}
        >

          <Search
            className="w-5 h-5"
            style={{
              color: colors.textSecondary,
            }}
          />

          <input
            type="text"
            placeholder="Search AI teachers..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-transparent outline-none flex-1"
            style={{
              color: colors.textPrimary,
            }}
          />

        </div>

        {/* TABLE */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: colors.surface,
            border:
              "1px solid rgba(255,255,255,0.08)",
          }}
        >

          {/* HEADER */}
          <div
            className="grid grid-cols-6 gap-3 px-5 py-4 border-b text-sm font-semibold"
            style={{
              borderColor:
                "rgba(255,255,255,0.08)",
              color: colors.textSecondary,
            }}
          >

            <p>Tutor</p>

            <p>Students</p>

            <p>Hours</p>

            <p>Rating</p>

            <p>Popularity</p>

            <p className="text-center">
              Actions
            </p>

          </div>

          {/* BODY */}
          {filteredTutors.map((tutor, i) => (

            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-6 gap-3 px-5 py-4 border-b transition-all items-center"
              style={{
                borderColor:
                  "rgba(255,255,255,0.05)",
              }}
            >

              {/* TUTOR */}
              <div className="flex items-center gap-3 min-w-0">

                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-14 h-14 object-cover rounded-2xl"
                />

                <div>

                  <h3 className="font-bold text-xl leading-tight">
                    {tutor.name}
                  </h3>

                  <p
                    className="text-sm"
                    style={{
                      color:
                        colors.textSecondary,
                    }}
                  >
                    {tutor.status}
                  </p>

                </div>

              </div>

              {/* STUDENTS */}
              <div className="font-semibold text-2xl">
                {tutor.students}
              </div>

              {/* HOURS */}
              <div
                className="flex items-center gap-2 text-lg"
                style={{
                  color: colors.textSecondary,
                }}
              >

                <Clock
                  className="w-4 h-4"
                  style={{
                    color: colors.secondary,
                  }}
                />

                {tutor.hours}

              </div>

              {/* RATING */}
              <div className="flex items-center gap-2 text-lg">

                <Star
                  className="w-4 h-4 fill-current"
                  style={{
                    color: colors.primary,
                  }}
                />

                {tutor.rating}

              </div>

              {/* POPULARITY */}
              <div>

                <p
                  className="font-bold text-lg mb-2"
                  style={{
                    color: colors.secondary,
                  }}
                >
                  {tutor.popularity}
                </p>

                <div
                  className="w-24 h-2 rounded-full overflow-hidden"
                  style={{
                    backgroundColor:
                      "rgba(255,255,255,0.08)",
                  }}
                >

                  <div
                    className="h-full rounded-full"
                    style={{
                      width: tutor.popularity,
                      backgroundColor:
                        colors.primary,
                    }}
                  />

                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-center gap-2">

                <button
                  className="px-5 py-2 font-bold rounded-xl hover:scale-105 transition-all"
                  style={{
                    backgroundColor:
                      colors.secondary,
                    color: "#fff",
                  }}
                >
                  View
                </button>

                <button
                  className="p-2 transition-all rounded-xl"
                  style={{
                    color:
                      colors.textSecondary,
                  }}
                >

                  <MoreVertical className="w-5 h-5" />

                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </main>

    </div>
  );
}