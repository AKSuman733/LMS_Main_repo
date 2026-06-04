import { motion } from 'motion/react';
import Sidebar from '../components/Sidebar';

import { Clock, BrainCircuit, Sparkles } from 'lucide-react';

/* DESIGN TOKENS */
import { colors, shadows } from '../styles/designTokens';

export default function AITutorPage() {
  const studentName =
    localStorage.getItem('studentName') || 'Divya';

  const tutors = [
    {
      id: 1,
      name: 'Vijay',
      usage: '12 Hours Learned',
      popularity: '98%',
      status: 'Most Used Tutor',
      image:
        'https://a10.gaanacdn.com/gn_img/artists/NOXWVgbkqL/NOXWVmz3kq/size_m_1737701179.jpg',
    },
    {
      id: 2,
      name: 'Surya',
      usage: '8 Hours Learned',
      popularity: '92%',
      status: 'Recommended Tutor',
      image:
        'https://i.pinimg.com/236x/5f/ea/fb/5feafb1359161923142adf03f123141b.jpg',
    },
    {
      id: 3,
      name: 'Sai Pallavi',
      usage: '5 Hours Learned',
      popularity: '88%',
      status: 'Trending Tutor',
      image:
        'https://media.themoviedb.org/t/p/w235_and_h235_face/qAPdGKUIUEzLibdgVCey7oKvvME.jpg',
    },
    {
      id: 4,
      name: 'Deepika',
      usage: '3 Hours Learned',
      popularity: '85%',
      status: 'Top Rated',
      image:
        'https://www.hindustantimes.com/ht-img/img/2024/02/15/original/Deepika_Padukone_Hilton_1707982914236.jpg',
    },
    {
      id: 5,
      name: 'Ranveer Singh',
      usage: '2 Hours Learned',
      popularity: '81%',
      status: 'Popular Choice',
      image:
        'https://artistbookingcompany.com/wp-content/uploads/2024/03/ranveer-singh-680x680.jpg',
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >
      <Sidebar role="student" />

      <main className="md:ml-64 p-4 md:p-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: colors.textPrimary }}
            >
              Your AI Tutors
            </h1>

            <p style={{ color: colors.textSecondary }}>
              Personalized tutors based on your learning activity.
            </p>
          </div>

          {/* MATCHING TAG */}
          <div
            className="
              px-4 py-3
              rounded-2xl
              border
              flex
              items-center
              gap-3
              w-full md:w-auto
              justify-center
            "
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: shadows.sm,
            }}
          >
            <Sparkles
              className="w-5 h-5"
              style={{ color: colors.secondary }}
            />
            <span
              className="text-sm font-semibold"
              style={{ color: colors.textPrimary }}
            >
              Personalized AI Matching
            </span>
          </div>
        </div>

        {/* BANNER */}
        <div
          className="relative overflow-hidden rounded-[2.5rem] p-8 mb-10 border"
          style={{
            borderColor: `${colors.secondary}30`,
            background: `linear-gradient(
              to right,
              ${colors.primary}20,
              ${colors.secondary}15
            )`,
          }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400')] bg-cover bg-center opacity-10" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-5">
            <div
              className="w-16 h-16 rounded-2xl border flex items-center justify-center"
              style={{
                backgroundColor: `${colors.secondary}15`,
                borderColor: `${colors.secondary}30`,
              }}
            >
              <BrainCircuit
                className="w-8 h-8"
                style={{ color: colors.secondary }}
              />
            </div>

            <div>
              <h2
                className="text-xl md:text-2xl font-bold mb-2"
                style={{ color: colors.textPrimary }}
              >
                Welcome back, {studentName}
              </h2>

              <p style={{ color: colors.textSecondary }}>
                Vijay AI continues to be your most used tutor this week.
              </p>
            </div>
          </div>
        </div>

        {/* TUTOR LIST */}
        <div className="space-y-5">
          {tutors.map((tutor, i) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="
                border
                rounded-3xl
                p-4 md:p-5
                flex
                flex-col md:flex-row
                items-start md:items-center
                gap-5
                transition-all
              "
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(255,255,255,0.08)',
                boxShadow: shadows.md,
              }}
            >
              {/* IMAGE */}
              <img
                src={tutor.image}
                alt={tutor.name}
                className="
                  w-full
                  md:w-28
                  h-56
                  md:h-28
                  rounded-2xl
                  object-cover
                "
              />

              {/* CONTENT */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: colors.textPrimary }}
                    >
                      {tutor.name}
                    </h3>

                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${colors.secondary}15`,
                        color: colors.secondary,
                      }}
                    >
                      {tutor.status}
                    </span>
                  </div>

                  <p
                    className="font-medium text-sm mb-3 sm:mb-0"
                    style={{ color: colors.secondary }}
                  >
                    {tutor.popularity} Popularity
                  </p>
                </div>

                {/* DESCRIPTION */}
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: colors.textSecondary }}
                >
                  Personalized lessons and AI-generated
                  explanations optimized for your learning
                  speed and understanding.
                </p>

                {/* BOTTOM */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: colors.textSecondary }}
                  >
                    <Clock className="w-4 h-4" style={{ color: colors.secondary }} />
                    {tutor.usage}
                  </div>


                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

