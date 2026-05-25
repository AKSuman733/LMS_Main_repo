import { motion } from 'motion/react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../AuthContext';

import {
  Clock,
  Zap,
  Target,
  BookOpen,
  ChevronRight,
  Search,
  FileText,
  Play,
  Star,
} from 'lucide-react';

import { INITIAL_COURSES } from '../constants';
import { Link } from 'react-router-dom';

/* DESIGN TOKENS */
import {
  colors,
  shadows,
} from '../styles/designTokens';

export default function StudentDashboard() {

  const { user } = useAuth();

  const studentName =
    localStorage.getItem('studentName') ||
    user?.name ||
    'Student';

  const stats = [
    {
      label: 'Hours Studied',
      value: '24.5',
      trend: '+20%',
    },

    {
      label: 'Learning Streak',
      value: '12 Days 🔥',
    },

    {
      label: 'Completed Courses',
      value: '6',
    },

    {
      label: 'Weekly Goal',
      value: '85%',
      showProgress: true,
    },
  ];

  const tutors = [
    {
      id: 1,
      name: 'Vijay',
      subject: 'Machine Learning',
      popularity: '94%',
      badge: '🔥 Most Popular',
      image:
        'https://a10.gaanacdn.com/gn_img/artists/NOXWVgbkqL/NOXWVmz3kq/size_m_1737701179.jpg',
    },

    {
      id: 2,
      name: 'Sai Pallavi',
      subject: 'Full Stack Development',
      popularity: '91%',
      badge: '⭐ Beginner Friendly',
      image:
        'https://media.themoviedb.org/t/p/w235_and_h235_face/qAPdGKUIUEzLibdgVCey7oKvvME.jpg',
    },

    {
      id: 3,
      name: 'Deepika',
      subject: 'Cybersecurity',
      popularity: '89%',
      badge: '🚀 Fast Learning',
      image:
        'https://www.hindustantimes.com/ht-img/img/2024/02/15/original/Deepika_Padukone_Hilton_1707982914236.jpg',
    },
  ];

  const enrolledCourses =
    INITIAL_COURSES.slice(0, 2);

  return (

    <div
      className="min-h-screen pl-64"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >

      <Sidebar role="student" />

      {/* HEADER */}
      <header
        className="h-20 px-8 border-b border-white/5 flex items-center justify-between sticky top-0 backdrop-blur-md z-40"
        style={{
          backgroundColor: 'rgba(6,8,22,0.7)',
        }}
      >

        {/* SEARCH */}
        <div className="relative w-96">

          <input
            type="text"
            placeholder="Search courses, skills..."
            className="w-full border rounded-full py-3 px-12 text-sm focus:outline-none"
            style={{
              backgroundColor: colors.surface,
              borderColor: 'rgba(255,255,255,0.08)',
              color: colors.textPrimary,
            }}
          />

          <Search
            className="w-4 h-4 absolute left-4 top-4"
            style={{
              color: colors.textSecondary,
            }}
          />

        </div>

        {/* USER */}
        <div className="flex items-center gap-4">

          <div className="text-right">

            <p
              className="text-sm font-bold"
              style={{
                color: colors.textPrimary,
              }}
            >
              {studentName}
            </p>

            <p
              className="text-[10px] uppercase tracking-widest"
              style={{
                color: colors.secondary,
              }}
            >
              Student
            </p>

          </div>

          {/* AVATAR */}
          <div
            className="w-11 h-11 rounded-full border-2 p-0.5"
            style={{
              borderColor: colors.secondary,
            }}
          >

            <div
              className="w-full h-full rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                backgroundColor: colors.surface,
                color: colors.textPrimary,
              }}
            >
              {studentName
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>

          </div>

        </div>

      </header>

      {/* MAIN */}
      <main className="p-8 space-y-8">

        {/* HERO */}
        <section
          className="relative overflow-hidden rounded-[2.5rem] p-10 border"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',

            background: `linear-gradient(
              to right,
              ${colors.primary}25,
              ${colors.secondary}20
            )`,
          }}
        >

          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400')] bg-cover bg-center opacity-10" />

          <div className="relative z-10">

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-4"
              style={{
                color: colors.textPrimary,
              }}
            >
              Welcome back, {studentName}! 👋
            </motion.h1>

            <p
              className="max-w-2xl text-lg leading-relaxed"
              style={{
                color: colors.textSecondary,
              }}
            >
              Continue mastering Full Stack Development,
              AI, and Cybersecurity with personalized
              AI-powered learning.
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex gap-4">

              <Link
                to="/courses"
                className="px-8 py-3 font-bold rounded-2xl hover:scale-105 transition-all"
                style={{
                  backgroundColor: colors.secondary,
                  color: colors.background,
                  boxShadow:
                    '0 0 25px rgba(0,181,165,0.45)',
                }}
              >
                Continue Learning
              </Link>

              <button
                className="px-8 py-3 border rounded-2xl transition-all"
                style={{
                  backgroundColor:
                    'rgba(255,255,255,0.04)',

                  borderColor:
                    'rgba(255,255,255,0.08)',

                  color: colors.textPrimary,
                }}
              >
                Explore Courses
              </button>

            </div>

          </div>

        </section>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6">

          {stats.map((stat, i) => (

            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl p-6 border"
              style={{
                backgroundColor:
                  'rgba(255,255,255,0.04)',

                borderColor:
                  'rgba(255,255,255,0.08)',

                boxShadow: shadows.md,
              }}
            >

              <p
                className="text-[10px] uppercase tracking-widest font-bold mb-3"
                style={{
                  color: colors.textSecondary,
                }}
              >
                {stat.label}
              </p>

              {stat.showProgress ? (
                <>

                  <div
                    className="h-2 rounded-full overflow-hidden mb-3"
                    style={{
                      backgroundColor: colors.surface,
                    }}
                  >

                    <div
                      className="h-full w-[85%] rounded-full"
                      style={{
                        backgroundColor:
                          colors.secondary,
                      }}
                    />

                  </div>

                  <div
                    className="text-2xl font-bold"
                    style={{
                      color: colors.textPrimary,
                    }}
                  >
                    {stat.value}
                  </div>

                </>
              ) : (

                <div
                  className="text-3xl font-bold"
                  style={{
                    color: colors.textPrimary,
                  }}
                >
                  {stat.value}
                </div>

              )}

              {stat.trend && (

                <div
                  className="mt-2 text-xs font-semibold"
                  style={{
                    color: colors.secondary,
                  }}
                >
                  {stat.trend}
                </div>

              )}

            </motion.div>

          ))}

        </div>

        {/* AI TUTORS */}
        <section className="space-y-6">

          <div className="flex items-center justify-between">

            <div>

              <h2
                className="text-2xl font-bold"
                style={{
                  color: colors.textPrimary,
                }}
              >
                Recommended AI Tutors
              </h2>

              <p
                className="text-sm mt-1"
                style={{
                  color: colors.textSecondary,
                }}
              >
                Best matches for {studentName}'s learning style
              </p>

            </div>

          </div>

          <div className="grid grid-cols-3 gap-8">

            {tutors.map((tutor) => (

              <motion.div
                key={tutor.id}
                whileHover={{ y: -6 }}
                className="rounded-[2rem] overflow-hidden border transition-all"
                style={{
                  backgroundColor:
                    'rgba(255,255,255,0.04)',

                  borderColor:
                    'rgba(255,255,255,0.08)',

                  boxShadow: shadows.md,
                }}
              >

                <div className="relative h-56 overflow-hidden">

                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div
                    className="absolute top-4 left-4 text-[10px] px-3 py-1 rounded-full uppercase font-bold backdrop-blur-md"
                    style={{
                      backgroundColor: `${colors.secondary}20`,
                      border: `1px solid ${colors.secondary}40`,
                      color: colors.secondary,
                    }}
                  >
                    {tutor.badge}
                  </div>

                </div>

                <div className="p-6">

                  <h3
                    className="text-xl font-bold mb-1"
                    style={{
                      color: colors.textPrimary,
                    }}
                  >
                    {tutor.name}
                  </h3>

                  <p
                    className="text-sm mb-4"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    {tutor.subject}
                  </p>

                  <div className="flex items-center gap-2 mb-5">

                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />

                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: colors.textPrimary,
                      }}
                    >
                      {tutor.popularity} students prefer this tutor
                    </span>

                  </div>

                  <button
                    className="w-full py-3 rounded-2xl font-bold hover:scale-[1.02] transition-all"
                    style={{
                      backgroundColor: colors.secondary,
                      color: colors.background,
                    }}
                  >
                    Start Session
                  </button>

                </div>

              </motion.div>

            ))}

          </div>

        </section>

        {/* ENROLLED COURSES */}
        <section className="space-y-6">

          <div className="flex justify-between items-center">

            <h2
              className="text-2xl font-bold"
              style={{
                color: colors.textPrimary,
              }}
            >
              Enrolled Courses
            </h2>

            <Link
              to="/courses"
              className="text-sm font-semibold flex items-center gap-1"
              style={{
                color: colors.secondary,
              }}
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>

          </div>

          <div className="grid grid-cols-2 gap-8">

            {enrolledCourses.map((course) => (

              <motion.div
                key={course.id}
                whileHover={{ y: -6 }}
                className="rounded-[2rem] overflow-hidden border"
                style={{
                  backgroundColor:
                    'rgba(255,255,255,0.04)',

                  borderColor:
                    'rgba(255,255,255,0.08)',

                  boxShadow: shadows.md,
                }}
              >

                <div className="relative h-52">

                  <img
                    src={course.image}
                    className="w-full h-full object-cover opacity-40"
                    alt=""
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                </div>

                <div className="p-6">

                  <h3
                    className="text-xl font-bold mb-3"
                    style={{
                      color: colors.textPrimary,
                    }}
                  >
                    {course.title}
                  </h3>

                  <div
                    className="flex items-center gap-5 text-sm mb-6"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      12h 40m
                    </span>

                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      24 Lessons
                    </span>

                  </div>

                  <div
                    className="h-2 rounded-full overflow-hidden mb-4"
                    style={{
                      backgroundColor: colors.surface,
                    }}
                  >

                    <div
                      className="h-full w-[100%] rounded-full"
                      style={{
                        backgroundColor:
                          colors.secondary,
                      }}
                    />

                  </div>

                  <div className="flex items-center justify-between">

                    <span
                      className="text-sm font-semibold"
                      style={{
                        color: colors.secondary,
                      }}
                    >
                      100% Completed
                    </span>

                    <Link
                      to={`/course/${course.id}`}
                      className="p-3 rounded-xl transition-all"
                      style={{
                        backgroundColor:
                          `${colors.secondary}15`,

                        color: colors.secondary,
                      }}
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </Link>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}